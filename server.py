from __future__ import annotations

import json
import os
import re
import sqlite3
import base64
import threading
import tempfile
import wave
from difflib import SequenceMatcher
from datetime import datetime, timedelta
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError
import xml.etree.ElementTree as ET
import yaml


BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "static"
DB_PATH = BASE_DIR / "data.db"
HOST = "127.0.0.1"
PORT = 8030
MODEL_DIR = BASE_DIR / "models" / "vosk-model-small-ru-0.22"
WHISPER_MODEL_ROOT = BASE_DIR / "models" / "faster-whisper"
WHISPER_MODEL_SIZE = os.environ.get("ICSR_STT_MODEL", "small")
VOICE_NLU_PATH = BASE_DIR / "nlu" / "voice_nlu.yml"
OPENAI_REALTIME_MODEL = os.environ.get("OPENAI_REALTIME_MODEL", "gpt-realtime")
OLLAMA_BASE_URL = os.environ.get("ICSR_OLLAMA_URL", "http://127.0.0.1:11434")
OLLAMA_MODEL = os.environ.get("ICSR_OLLAMA_MODEL", "qwen3:4b")

try:
    from vosk import KaldiRecognizer, Model
except Exception:  # pragma: no cover
    KaldiRecognizer = None
    Model = None

try:
    from faster_whisper import WhisperModel
except Exception:  # pragma: no cover
    WhisperModel = None

_vosk_model = None
_vosk_lock = threading.Lock()
_whisper_model = None
_whisper_lock = threading.Lock()
_voice_nlu = None
_voice_nlu_lock = threading.Lock()


def utc_now() -> str:
    return datetime.utcnow().replace(microsecond=0).isoformat() + "Z"


def get_vosk_model():
    global _vosk_model
    if Model is None:
        raise RuntimeError("Vosk is not installed")
    if _vosk_model is None:
        with _vosk_lock:
            if _vosk_model is None:
                if not MODEL_DIR.exists():
                    raise RuntimeError("Vosk model directory was not found")
                _vosk_model = Model(str(MODEL_DIR))
    return _vosk_model


def get_whisper_model():
    global _whisper_model
    if WhisperModel is None:
        raise RuntimeError("faster-whisper is not installed")
    if _whisper_model is None:
        with _whisper_lock:
            if _whisper_model is None:
                WHISPER_MODEL_ROOT.mkdir(parents=True, exist_ok=True)
                _whisper_model = WhisperModel(
                    WHISPER_MODEL_SIZE,
                    device="cpu",
                    compute_type="int8",
                    download_root=str(WHISPER_MODEL_ROOT),
                )
    return _whisper_model


def transcribe_with_whisper(audio_bytes: bytes, sample_rate: int) -> dict:
    if not audio_bytes:
        return {"text": "", "backend": "whisper"}

    model = get_whisper_model()
    temp_path = None
    try:
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as handle:
            temp_path = handle.name
        with wave.open(temp_path, "wb") as wav_file:
            wav_file.setnchannels(1)
            wav_file.setsampwidth(2)
            wav_file.setframerate(sample_rate)
            wav_file.writeframes(audio_bytes)

        segments, info = model.transcribe(
            temp_path,
            language="ru",
            task="transcribe",
            beam_size=1,
            best_of=1,
            vad_filter=True,
            condition_on_previous_text=False,
            temperature=0.0,
            initial_prompt=(
                "Сайт по фармаконадзору. Команды могут содержать термины: "
                "Case ID, MedDRA, пациент, анамнез, нарратив, серьёзность, "
                "отчёты, серьёзные случаи, настройки."
            ),
        )
        text = " ".join((segment.text or "").strip() for segment in segments).strip()
        return {
            "text": text,
            "backend": "whisper",
            "language": getattr(info, "language", "ru"),
            "languageProbability": getattr(info, "language_probability", None),
        }
    finally:
        if temp_path:
            try:
                os.remove(temp_path)
            except OSError:
                pass


def transcribe_pcm16(audio_bytes: bytes, sample_rate: int) -> dict:
    if not audio_bytes:
        return {"text": "", "backend": "none"}
    whisper_error = None
    if WhisperModel is not None:
        try:
            return transcribe_with_whisper(audio_bytes, sample_rate)
        except Exception as error:  # pragma: no cover
            whisper_error = str(error)
    model = get_vosk_model()
    recognizer = KaldiRecognizer(model, float(sample_rate))
    chunk_size = 4000
    for index in range(0, len(audio_bytes), chunk_size):
        recognizer.AcceptWaveform(audio_bytes[index : index + chunk_size])
    result = json.loads(recognizer.FinalResult() or "{}")
    text = (result.get("text") or "").strip()
    payload = {"text": text, "backend": "vosk"}
    if whisper_error:
        payload["fallbackReason"] = whisper_error
    return payload


def get_openai_api_key() -> str:
    api_key = (os.environ.get("OPENAI_API_KEY") or "").strip()
    if api_key:
        return api_key
    try:
        import winreg
    except Exception:
        winreg = None
    if winreg is not None:
        registry_locations = [
            (winreg.HKEY_CURRENT_USER, r"Environment"),
            (winreg.HKEY_CURRENT_USER, r"Volatile Environment"),
        ]
        for hive, path in registry_locations:
            try:
                with winreg.OpenKey(hive, path) as key:
                    value, _ = winreg.QueryValueEx(key, "OPENAI_API_KEY")
                    if value:
                        return str(value).strip()
            except OSError:
                continue
    return ""


def create_realtime_client_secret() -> dict:
    api_key = get_openai_api_key()
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY was not found on the server")

    payload = {
        "expires_after": {
            "anchor": "created_at",
            "seconds": 600,
        },
        "session": {
            "type": "realtime",
            "model": OPENAI_REALTIME_MODEL,
            "output_modalities": ["text"],
            "audio": {
                "input": {
                    "turn_detection": {
                        "type": "server_vad",
                        "create_response": True,
                        "interrupt_response": True,
                        "silence_duration_ms": 450,
                    },
                    "noise_reduction": {
                        "type": "near_field",
                    },
                    "transcription": {
                        "model": "gpt-4o-mini-transcribe",
                        "language": "ru",
                        "prompt": (
                            "Фармаконадзор, E2B R3, Case ID, MedDRA, пациент, нарратив, "
                            "причинно-следственная связь, анамнез, дозировка."
                        ),
                    },
                },
            },
            "instructions": (
                "You are a voice control assistant for a pharmacovigilance web app. "
                "Listen to Russian voice commands and control the interface through tools. "
                "Prefer calling tools over chat responses. Be robust to partial phrasing, "
                "short phrases, numbers, dates, MedDRA terms, and free-form dictation."
            ),
        },
    }
    request = Request(
        "https://api.openai.com/v1/realtime/client_secrets",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urlopen(request, timeout=30) as response:
            body = response.read().decode("utf-8")
            return json.loads(body)
    except HTTPError as error:
        details = error.read().decode("utf-8", errors="ignore")
        raise RuntimeError(f"OpenAI token request failed: {error.code} {details}") from error
    except URLError as error:
        raise RuntimeError(f"OpenAI network error: {error.reason}") from error


def ollama_request(path: str, payload: dict, timeout: int = 40) -> dict:
    request = Request(
        f"{OLLAMA_BASE_URL}{path}",
        data=json.dumps(payload, ensure_ascii=False).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urlopen(request, timeout=timeout) as response:
            body = response.read().decode("utf-8")
            return json.loads(body or "{}")
    except HTTPError as error:
        details = error.read().decode("utf-8", errors="ignore")
        raise RuntimeError(f"Ollama request failed: {error.code} {details}") from error
    except URLError as error:
        raise RuntimeError(f"Ollama is unavailable: {error.reason}") from error


def is_ollama_available() -> bool:
    request = Request(f"{OLLAMA_BASE_URL}/api/tags", method="GET")
    try:
        with urlopen(request, timeout=3) as response:
            return response.status == 200
    except Exception:
        return False


def get_voice_nlu() -> dict:
    global _voice_nlu
    if _voice_nlu is None:
        with _voice_nlu_lock:
            if _voice_nlu is None:
                if not VOICE_NLU_PATH.exists():
                    raise RuntimeError("Voice NLU configuration file was not found")
                _voice_nlu = yaml.safe_load(VOICE_NLU_PATH.read_text(encoding="utf-8")) or {}
    return _voice_nlu


def normalize_voice_text(value: str | None) -> str:
    text = (value or "").strip().lower().replace("ё", "е")
    text = re.sub(r"[\"'`]+", " ", text)
    text = re.sub(r"[\(\)\[\]\{\},;:!?]+", " ", text)
    text = re.sub(r"[-_/]+", " ", text)
    replacements = {
        "айди": "id",
        "ид ": "id ",
        "и д ": "id ",
        "кейс айди": "case id",
        "кейс id": "case id",
        "caseid": "case id",
        "e mail": "email",
        "e-mail": "email",
        "емейл": "email",
        "имейл": "email",
        "меддра": "meddra",
        "медра": "meddra",
        "пти": "пт",
        "наратив": "нарратив",
        "проведенные": "проверенные",
        "проведенный": "проверенный",
    }
    for source, target in replacements.items():
        text = text.replace(source, target)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def voice_tokens(value: str | None) -> list[str]:
    return [token for token in normalize_voice_text(value).split(" ") if token]


def voice_similarity(left: str, right: str) -> float:
    left_norm = normalize_voice_text(left)
    right_norm = normalize_voice_text(right)
    if not left_norm or not right_norm:
        return 0.0
    if left_norm == right_norm:
        return 1.0
    if left_norm.startswith(right_norm) or right_norm.startswith(left_norm):
        prefix_bonus = min(len(left_norm), len(right_norm)) / max(len(left_norm), len(right_norm))
    else:
        prefix_bonus = 0.0
    left_tokens = voice_tokens(left_norm)
    right_tokens = voice_tokens(right_norm)
    overlap = len([token for token in right_tokens if token in left_tokens])
    token_score = overlap / max(len(right_tokens), 1)
    ratio = SequenceMatcher(None, left_norm, right_norm).ratio()
    return max(ratio, token_score, prefix_bonus)


def extract_case_number(text: str) -> str:
    match = re.search(r"\b(?:ru[\s-]*)?(?:e2b[\s-]*)?\d{4}[\s-]*\d{3,5}\b", normalize_voice_text(text))
    if not match:
        return ""
    value = match.group(0).upper().replace(" ", "-")
    value = re.sub(r"^RU-?", "RU-", value)
    if "E2B" not in value and "RU-" in value:
        return value
    return value


def extract_date_value(text: str) -> str:
    normalized = normalize_voice_text(text)
    match = re.search(r"\b(\d{4})[.\-/ ](\d{2})[.\-/ ](\d{2})\b", normalized)
    if match:
        return f"{match.group(1)}-{match.group(2)}-{match.group(3)}"
    match = re.search(r"\b(\d{2})[.\-/ ](\d{2})[.\-/ ](\d{4})\b", normalized)
    if match:
        return f"{match.group(3)}-{match.group(2)}-{match.group(1)}"
    return ""


def extract_tail_after_alias(text: str, alias: str) -> str:
    normalized_text = normalize_voice_text(text)
    normalized_alias = normalize_voice_text(alias)
    index = normalized_text.find(normalized_alias)
    if index == -1:
        return ""
    tail = normalized_text[index + len(normalized_alias):].strip()
    tail = re.sub(r"^(это|равно|значение|укажи|поставь|впиши)\s+", "", tail)
    return tail.strip()


def best_lookup_match(text: str, definitions: list[dict], threshold: float = 0.58) -> dict | None:
    normalized = normalize_voice_text(text)
    best = None
    for definition in definitions:
        for alias in definition.get("aliases", []):
            score = voice_similarity(normalized, alias)
            if normalized.find(normalize_voice_text(alias)) != -1:
                score = max(score, 0.96)
            if not best or score > best["score"]:
                best = {"definition": definition, "alias": alias, "score": score}
    return best if best and best["score"] >= threshold else None


def build_alias_definitions(raw_map: dict) -> list[dict]:
    return [{"value": key, "aliases": value.get("aliases", [])} for key, value in raw_map.items()]


def parse_voice_command_with_nlu(text: str, context: dict | None = None) -> dict:
    context = context or {}
    normalized = normalize_voice_text(text)
    if not normalized:
        return {"intent": None, "confidence": 0.0}

    config = get_voice_nlu()
    page = context.get("page") or ""
    editor_tab = context.get("editorTab") or ""
    has_current_case = bool(context.get("hasCurrentCase"))

    action_match = best_lookup_match(normalized, build_alias_definitions(config.get("actions", {})), 0.72)
    if action_match:
        action_value = action_match["definition"]["value"]
        mapped = {
            "create_report": {"type": "action", "name": "create_report"},
            "import_xml": {"type": "action", "name": "import_xml"},
            "export_xml": {"type": "action", "name": "export_xml"},
            "validate_case": {"type": "action", "name": "validate_case"},
            "close_case": {"type": "action", "name": "close_case"},
            "save_case": {"type": "action", "name": "save_case"},
            "fill_demo": {"type": "action", "name": "fill_demo"},
            "save_settings": {"type": "action", "name": "save_settings"},
            "change_password": {"type": "action", "name": "change_password"},
            "voice_mode": {"type": "action", "name": "voice_mode"},
            "page_search_focus": {"type": "globalSearchFocus"},
            "reports_search_focus": {"type": "reportsSearchFocus"},
            "open_first_case": {"type": "openFirstVisibleCase"},
        }
        if action_value in mapped:
            return {"intent": mapped[action_value], "confidence": action_match["score"]}

    if normalized in {"русский", "русский язык"}:
        return {"intent": {"type": "language", "value": "ru"}, "confidence": 1.0}
    if normalized in {"английский", "английский язык", "english"}:
        return {"intent": {"type": "language", "value": "en"}, "confidence": 1.0}

    global_search_prefixes = [
        "поиск по базе безопасности",
        "поиск в базе безопасности",
        "поиск по базе данных",
        "search safety database",
        "search database",
    ]
    for prefix in global_search_prefixes:
        if normalized.startswith(prefix):
            query = normalized[len(prefix):].strip()
            return {"intent": {"type": "globalSearch", "value": query}, "confidence": 0.96}

    report_search_prefixes = [
        "поиск по case id",
        "поиск по кейс id",
        "поиск по id",
        "найди кейс",
        "найди случай",
        "search by case id",
    ]
    for prefix in report_search_prefixes:
        if normalized.startswith(prefix):
            query = normalized[len(prefix):].strip()
            return {"intent": {"type": "reportsSearch", "value": query}, "confidence": 0.95}

    case_number = extract_case_number(text)
    if case_number and any(token in normalized for token in ["открой", "открыть", "найди", "покажи", "open"]):
        return {"intent": {"type": "openCaseNumber", "value": case_number}, "confidence": 0.93}

    date_value = extract_date_value(text)
    if date_value and ("дате" in normalized or "дата" in normalized or "date" in normalized):
        return {"intent": {"type": "openDate", "value": date_value}, "confidence": 0.9}

    status_match = best_lookup_match(normalized, build_alias_definitions(config.get("status_filters", {})), 0.68)
    if status_match and (page == "reports" or any(token in normalized for token in ["статус", "статусы", "случаи", "кейсы", "show", "filter"])):
        return {"intent": {"type": "statusFilter", "value": status_match["definition"]["value"]}, "confidence": status_match["score"]}

    page_match = best_lookup_match(normalized, build_alias_definitions(config.get("pages", {})), 0.72)
    if page_match:
        return {"intent": {"type": "page", "value": page_match["definition"]["value"]}, "confidence": page_match["score"]}

    if has_current_case:
        field_match = best_lookup_match(normalized, config.get("fields", []), 0.62)
        if field_match:
            value = extract_tail_after_alias(text, field_match["alias"])
            field_name = field_match["definition"]["field"]
            if value and field_name in {"report.receivedDate", "report.dueDate", "products.0.startDate", "events.0.startDate"}:
                value = extract_date_value(text) or value
            if value and field_name == "report.caseNumber":
                value = extract_case_number(text) or value
            intent_type = "fieldEntry" if value else "fieldFocus"
            intent = {
                "type": intent_type,
                "definition": {
                    "field": field_name,
                    "panel": field_match["definition"]["panel"],
                },
            }
            if value:
                intent["value"] = value
            if editor_tab and field_match["definition"]["panel"] == editor_tab:
                return {"intent": intent, "confidence": max(field_match["score"], 0.88)}
            return {"intent": intent, "confidence": field_match["score"]}

        tab_match = best_lookup_match(normalized, build_alias_definitions(config.get("editor_tabs", {})), 0.72)
        if tab_match:
            return {"intent": {"type": "editorTab", "value": tab_match["definition"]["value"]}, "confidence": tab_match["score"]}

    if page == "settings":
        settings_field_match = best_lookup_match(normalized, config.get("settings_fields", []), 0.66)
        if settings_field_match:
            value = extract_tail_after_alias(text, settings_field_match["alias"])
            intent_type = "settingsFieldEntry" if value else "settingsFieldFocus"
            intent = {"type": intent_type, "definition": {"element": settings_field_match["definition"]["element"], "aliases": settings_field_match["definition"]["aliases"]}}
            if value:
                intent["value"] = value
            return {"intent": intent, "confidence": settings_field_match["score"]}

        settings_toggle_match = best_lookup_match(normalized, config.get("settings_toggles", []), 0.66)
        if settings_toggle_match:
            explicit_value = None
            if any(token in normalized for token in ["выключ", "отключ", "disable", "off"]):
                explicit_value = False
            elif any(token in normalized for token in ["включ", "enable", "on"]):
                explicit_value = True
            return {
                "intent": {
                    "type": "settingsToggle",
                    "definition": {
                        "element": settings_toggle_match["definition"]["element"],
                        "aliases": settings_toggle_match["definition"]["aliases"],
                    },
                    "explicitValue": explicit_value,
                },
                "confidence": settings_toggle_match["score"],
            }

    return {"intent": None, "confidence": 0.0}


def build_ollama_voice_tools() -> list[dict]:
    config = get_voice_nlu()
    case_fields = sorted({item["field"] for item in config.get("fields", [])})
    settings_fields = sorted({item["element"] for item in config.get("settings_fields", [])})
    settings_toggles = sorted({item["element"] for item in config.get("settings_toggles", [])})
    return [
        {
            "type": "function",
            "function": {
                "name": "navigate_page",
                "description": "Open one of the main pages of the site.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "page": {"type": "string", "enum": ["dashboard", "reports", "serious", "nonserious", "settings"]},
                    },
                    "required": ["page"],
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "open_case",
                "description": "Open a case by Case ID or by date.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "caseNumber": {"type": "string"},
                        "date": {"type": "string"},
                    },
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "set_editor_tab",
                "description": "Switch the current case to a specific editor tab.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "tab": {"type": "string", "enum": ["report", "patient", "event", "narrative", "review"]},
                    },
                    "required": ["tab"],
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "focus_case_field",
                "description": "Focus a field in the current case without changing its value.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "field": {"type": "string", "enum": case_fields},
                    },
                    "required": ["field"],
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "set_case_field",
                "description": "Set a value in a field of the current case.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "field": {"type": "string", "enum": case_fields},
                        "value": {"type": "string"},
                    },
                    "required": ["field", "value"],
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "set_global_search",
                "description": "Apply the main search across the safety database.",
                "parameters": {
                    "type": "object",
                    "properties": {"query": {"type": "string"}},
                    "required": ["query"],
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "set_reports_search",
                "description": "Apply the search inside the reports registry.",
                "parameters": {
                    "type": "object",
                    "properties": {"query": {"type": "string"}},
                    "required": ["query"],
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "set_status_filter",
                "description": "Change the reports status filter.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "status": {"type": "string", "enum": ["all", "Проверено", "Требует доработки", "Не проверено"]},
                    },
                    "required": ["status"],
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "trigger_action",
                "description": "Press a high-level action button in the interface.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "action": {
                            "type": "string",
                            "enum": [
                                "create_report",
                                "import_xml",
                                "export_xml",
                                "validate_case",
                                "close_case",
                                "save_case",
                                "fill_demo",
                                "save_settings",
                                "change_password",
                                "voice_mode",
                                "language_ru",
                                "language_en",
                            ],
                        },
                    },
                    "required": ["action"],
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "set_settings_field",
                "description": "Change a text or select field on the settings page.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "field": {"type": "string", "enum": settings_fields},
                        "value": {"type": "string"},
                    },
                    "required": ["field", "value"],
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "toggle_settings_option",
                "description": "Toggle a checkbox option on the settings page.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "field": {"type": "string", "enum": settings_toggles},
                        "enabled": {"type": "boolean"},
                    },
                    "required": ["field", "enabled"],
                },
            },
        },
    ]


def map_ollama_tool_call(tool_call: dict) -> dict:
    function = (tool_call or {}).get("function") or {}
    name = function.get("name") or ""
    arguments = function.get("arguments") or {}
    if isinstance(arguments, str):
        try:
            arguments = json.loads(arguments)
        except Exception:
            arguments = {}

    if name == "navigate_page":
        return {"intent": {"type": "page", "value": arguments.get("page")}, "confidence": 0.92}
    if name == "open_case":
        if arguments.get("caseNumber"):
            return {"intent": {"type": "openCaseNumber", "value": arguments.get("caseNumber")}, "confidence": 0.9}
        if arguments.get("date"):
            return {"intent": {"type": "openDate", "value": arguments.get("date")}, "confidence": 0.88}
    if name == "set_editor_tab":
        return {"intent": {"type": "editorTab", "value": arguments.get("tab")}, "confidence": 0.9}
    if name == "focus_case_field":
        field = arguments.get("field")
        definition = next((item for item in get_voice_nlu().get("fields", []) if item.get("field") == field), None)
        if definition:
            return {"intent": {"type": "fieldFocus", "definition": definition}, "confidence": 0.9}
    if name == "set_case_field":
        field = arguments.get("field")
        value = arguments.get("value")
        definition = next((item for item in get_voice_nlu().get("fields", []) if item.get("field") == field), None)
        if definition and value is not None:
            return {"intent": {"type": "fieldEntry", "definition": definition, "value": str(value)}, "confidence": 0.9}
    if name == "set_global_search":
        return {"intent": {"type": "globalSearch", "value": arguments.get("query", "")}, "confidence": 0.88}
    if name == "set_reports_search":
        return {"intent": {"type": "reportsSearch", "value": arguments.get("query", "")}, "confidence": 0.88}
    if name == "set_status_filter":
        return {"intent": {"type": "statusFilter", "value": arguments.get("status")}, "confidence": 0.88}
    if name == "trigger_action":
        action = arguments.get("action")
        mapped = {
            "language_ru": {"type": "language", "value": "ru"},
            "language_en": {"type": "language", "value": "en"},
        }
        if action in mapped:
            return {"intent": mapped[action], "confidence": 0.9}
        return {"intent": {"type": "action", "name": action}, "confidence": 0.9}
    if name == "set_settings_field":
        field = arguments.get("field")
        value = arguments.get("value")
        definition = next((item for item in get_voice_nlu().get("settings_fields", []) if item.get("element") == field), None)
        if definition and value is not None:
            return {"intent": {"type": "settingsFieldEntry", "definition": definition, "value": str(value)}, "confidence": 0.88}
    if name == "toggle_settings_option":
        field = arguments.get("field")
        enabled = arguments.get("enabled")
        definition = next((item for item in get_voice_nlu().get("settings_toggles", []) if item.get("element") == field), None)
        if definition and enabled is not None:
            return {"intent": {"type": "settingsToggle", "definition": definition, "explicitValue": bool(enabled)}, "confidence": 0.88}
    return {"intent": None, "confidence": 0.0}


def map_ollama_json_intent(payload: dict) -> dict:
    intent_type = (payload.get("intentType") or "").strip()
    confidence = float(payload.get("confidence") or 0.82)
    value = payload.get("value")
    field = payload.get("field")
    page = payload.get("page")
    tab = payload.get("tab")
    action = payload.get("action")

    if intent_type == "page" and page:
        return {"intent": {"type": "page", "value": page}, "confidence": confidence}
    if intent_type == "editorTab" and tab:
        return {"intent": {"type": "editorTab", "value": tab}, "confidence": confidence}
    if intent_type == "openCaseNumber" and value:
        return {"intent": {"type": "openCaseNumber", "value": str(value)}, "confidence": confidence}
    if intent_type == "openDate" and value:
        return {"intent": {"type": "openDate", "value": str(value)}, "confidence": confidence}
    if intent_type == "fieldFocus" and field:
        definition = next((item for item in get_voice_nlu().get("fields", []) if item.get("field") == field), None)
        if definition:
            return {"intent": {"type": "fieldFocus", "definition": definition}, "confidence": confidence}
    if intent_type == "fieldEntry" and field:
        definition = next((item for item in get_voice_nlu().get("fields", []) if item.get("field") == field), None)
        if definition and value is not None:
            value_text = str(value)
            if any(voice_similarity(value_text, alias) >= 0.9 for alias in definition.get("aliases", [])):
                return {"intent": {"type": "fieldFocus", "definition": definition}, "confidence": confidence}
            return {
                "intent": {"type": "fieldEntry", "definition": definition, "value": value_text},
                "confidence": confidence,
            }
    if intent_type == "settingsFieldEntry" and field:
        definition = next((item for item in get_voice_nlu().get("settings_fields", []) if item.get("element") == field), None)
        if definition and value is not None:
            return {
                "intent": {"type": "settingsFieldEntry", "definition": definition, "value": str(value)},
                "confidence": confidence,
            }
    if intent_type == "settingsToggle" and field:
        definition = next((item for item in get_voice_nlu().get("settings_toggles", []) if item.get("element") == field), None)
        if definition:
            explicit_value = payload.get("enabled")
            return {
                "intent": {"type": "settingsToggle", "definition": definition, "explicitValue": explicit_value},
                "confidence": confidence,
            }
    if intent_type == "globalSearch":
        return {"intent": {"type": "globalSearch", "value": str(value or "")}, "confidence": confidence}
    if intent_type == "reportsSearch":
        return {"intent": {"type": "reportsSearch", "value": str(value or "")}, "confidence": confidence}
    if intent_type == "statusFilter":
        return {"intent": {"type": "statusFilter", "value": str(value or "")}, "confidence": confidence}
    if intent_type == "language" and value in {"ru", "en"}:
        return {"intent": {"type": "language", "value": value}, "confidence": confidence}
    if intent_type == "action" and (action or value):
        return {"intent": {"type": "action", "name": str(action or value)}, "confidence": confidence}
    return {"intent": None, "confidence": 0.0}


def extract_first_json_object(raw_text: str) -> dict:
    text = (raw_text or "").strip()
    if not text:
        return {}
    try:
        return json.loads(text)
    except Exception:
        pass
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if not match:
        return {}
    try:
        return json.loads(match.group(0))
    except Exception:
        return {}


def parse_voice_command_with_ollama(text: str, context: dict | None = None) -> dict:
    context = context or {}
    if not is_ollama_available():
        raise RuntimeError("Ollama is unavailable")

    config = get_voice_nlu()
    allowed_fields = sorted({item["field"] for item in config.get("fields", [])})
    allowed_settings_fields = sorted({item["element"] for item in config.get("settings_fields", [])})
    allowed_settings_toggles = sorted({item["element"] for item in config.get("settings_toggles", [])})
    prompt = (
        "Ты анализируешь голосовую команду для русскоязычного интерфейса фармаконадзора.\n"
        "Верни только JSON без пояснений.\n"
        "Допустимые intentType: page, editorTab, openCaseNumber, openDate, fieldFocus, fieldEntry, "
        "settingsFieldEntry, settingsToggle, globalSearch, reportsSearch, statusFilter, language, action, none.\n"
        "Допустимые page: dashboard, reports, serious, nonserious, settings.\n"
        "Допустимые tab: report, patient, event, narrative, review.\n"
        f"Допустимые field: {', '.join(allowed_fields)}.\n"
        f"Допустимые settings field: {', '.join(allowed_settings_fields)}.\n"
        f"Допустимые settings toggles: {', '.join(allowed_settings_toggles)}.\n"
        "Допустимые action: create_report, import_xml, export_xml, validate_case, close_case, "
        "save_case, fill_demo, save_settings, change_password, voice_mode, open_first_case.\n"
        "Если пользователь диктует только значение, используй активное поле из контекста и верни fieldEntry "
        "или settingsFieldEntry. Если команда не распознана, верни {\"intentType\":\"none\",\"confidence\":0}.\n"
        "Формат ответа JSON: "
        "{\"intentType\":\"...\",\"page\":\"...\",\"tab\":\"...\",\"field\":\"...\",\"action\":\"...\","
        "\"value\":\"...\",\"enabled\":true,\"confidence\":0.0}\n"
        f"Контекст: page={context.get('page')}, tab={context.get('editorTab')}, "
        f"hasCurrentCase={context.get('hasCurrentCase')}, "
        f"focusedField={context.get('focusedField') or 'none'}, "
        f"focusedSettingsField={context.get('focusedSettingsField') or 'none'}, "
        f"focusedTarget={context.get('focusedTarget') or 'none'}.\n"
        f"Команда пользователя: {text}"
    )
    payload = {
        "model": OLLAMA_MODEL,
        "stream": False,
        "prompt": prompt,
        "format": "json",
        "keep_alive": "30m",
        "options": {
            "temperature": 0,
            "num_predict": 160,
        },
    }
    response = ollama_request("/api/generate", payload, timeout=20)
    raw = (response.get("response") or "").strip()
    thinking = (response.get("thinking") or "").strip()
    parsed = extract_first_json_object(raw) or extract_first_json_object(thinking)
    if not parsed:
        return {"intent": None, "confidence": 0.0}
    return map_ollama_json_intent(parsed)


def parse_voice_command(text: str, context: dict | None = None) -> dict:
    ollama_error = None
    try:
        parsed = parse_voice_command_with_ollama(text, context)
        if parsed.get("intent"):
            parsed["engine"] = "ollama"
            return parsed
    except Exception as error:
        ollama_error = str(error)

    parsed = parse_voice_command_with_nlu(text, context)
    parsed["engine"] = "nlu"
    if ollama_error:
        parsed["fallbackReason"] = ollama_error
    return parsed


def pretty_date(date_str: str | None) -> str:
    if not date_str:
        return ""
    return date_str


def default_case_payload(index: int) -> dict:
    due_date = (datetime.utcnow() + timedelta(days=7 + index)).date().isoformat()
    return {
        "report": {
            "caseNumber": f"RU-2026-{420 + index:04d}",
            "title": "Анафилактическая реакция" if index == 1 else "Клинический случай",
            "receivedDate": "2026-04-22",
            "reportType": "Spontaneous",
            "primarySource": "Physician",
            "workflowState": "Черновик" if index != 3 else "Проверено",
            "seriousness": "Серьезный" if index != 3 else "Несерьезный",
            "completeness": 0,
            "dueDate": due_date,
            "validationState": "Не проверено",
            "sender": "Специалист по фармаконадзору",
        },
        "patient": {
            "patientId": f"P-{40 + index:03d}",
            "initials": "EX",
            "age": 34 + index,
            "sex": "Женский" if index == 1 else "Мужской",
            "weightKg": 67,
            "medicalHistory": "Аллергический анамнез требует уточнения.",
            "drugHistory": "Постоянная терапия не зафиксирована.",
        },
        "products": [
            {
                "id": "prod-1",
                "name": "Examplemol",
                "role": "Подозреваемый",
                "dose": "500 mg",
                "route": "Перорально",
                "startDate": "2026-04-21",
                "actionTaken": "Отменен",
            }
        ],
        "events": [
            {
                "id": "evt-1",
                "description": "Анафилактическая реакция",
                "meddraPt": "Anaphylactic reaction",
                "startDate": "2026-04-22",
                "outcome": "Выздоровление",
                "serious": "Да",
                "causality": "Возможно связано",
            }
        ],
        "narrative": {
            "summary": "После приема препарата развилась острая реакция, потребовавшая наблюдения.",
            "reviewerComment": "Нужна проверка анамнеза и уточнение временной связи.",
        },
        "review": {
            "blocking": [],
            "warnings": [],
            "ready": False,
            "nextAction": "Проверить анамнез и убедиться, что заполнены ключевые поля.",
        },
    }


def init_db() -> None:
    conn = sqlite3.connect(DB_PATH)
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS cases (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            case_number TEXT NOT NULL UNIQUE,
            title TEXT NOT NULL,
            workflow_state TEXT NOT NULL,
            seriousness TEXT NOT NULL,
            completeness INTEGER NOT NULL DEFAULT 0,
            due_date TEXT,
            validation_state TEXT NOT NULL,
            patient_id TEXT,
            sender TEXT,
            updated_at TEXT NOT NULL,
            payload TEXT NOT NULL
        )
        """
    )
    count = conn.execute("SELECT COUNT(*) FROM cases").fetchone()[0]
    if count == 0:
        for index in range(1, 4):
            payload = default_case_payload(index)
            payload = compute_case_state(payload)
            now = utc_now()
            conn.execute(
                """
                INSERT INTO cases (
                    case_number, title, workflow_state, seriousness, completeness,
                    due_date, validation_state, patient_id, sender, updated_at, payload
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    payload["report"]["caseNumber"],
                    payload["report"]["title"],
                    payload["report"]["workflowState"],
                    payload["report"]["seriousness"],
                    payload["report"]["completeness"],
                    payload["report"]["dueDate"],
                    payload["report"]["validationState"],
                    payload["patient"]["patientId"],
                    payload["report"]["sender"],
                    now,
                    json.dumps(payload, ensure_ascii=False),
                ),
            )
    conn.commit()
    conn.close()


def compute_case_state(case_payload: dict) -> dict:
    payload = json.loads(json.dumps(case_payload, ensure_ascii=False))
    blocking: list[str] = []
    warnings: list[str] = []

    patient = payload.get("patient", {})
    report = payload.get("report", {})
    events = payload.get("events", [])
    products = payload.get("products", [])
    narrative = payload.get("narrative", {})

    if not patient.get("patientId"):
        blocking.append("Не указан идентификатор пациента.")
    if not report.get("receivedDate"):
        blocking.append("Не указана дата получения сообщения.")
    if not events or not events[0].get("description"):
        blocking.append("Не описано нежелательное событие.")
    if events and not events[0].get("meddraPt"):
        blocking.append("Не выбран MedDRA Preferred Term.")
    if not products or not products[0].get("name"):
        blocking.append("Не указан препарат.")
    if products and not products[0].get("role"):
        blocking.append("Не указана роль препарата.")
    if not narrative.get("summary"):
        blocking.append("Не заполнен нарратив кейса.")

    event_date = events[0].get("startDate") if events else None
    drug_date = products[0].get("startDate") if products else None
    if event_date and drug_date and event_date < drug_date:
        warnings.append("Дата события раньше даты начала приема препарата.")
    if patient.get("weightKg") in ("", None):
        warnings.append("Не указан вес пациента.")
    if not patient.get("medicalHistory"):
        warnings.append("Не заполнен анамнез.")

    total_checks = 7
    passed_checks = total_checks - len(blocking)
    completeness = max(0, min(100, int(round((passed_checks / total_checks) * 100))))

    payload.setdefault("review", {})
    payload["review"]["blocking"] = blocking
    payload["review"]["warnings"] = warnings
    payload["review"]["ready"] = len(blocking) == 0
    payload["review"]["nextAction"] = (
        "Кейс готов к сохранению и экспорту."
        if not blocking
        else "Исправить блокирующие замечания на вкладках кейса."
    )

    report["completeness"] = completeness
    report["validationState"] = "Проверено" if not blocking else "Требует доработки"
    report["workflowState"] = report.get("workflowState") or "Черновик"
    payload["report"] = report
    return payload


def get_conn() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def summarize_case(row: sqlite3.Row) -> dict:
    return {
        "id": row["id"],
        "caseNumber": row["case_number"],
        "title": row["title"],
        "workflowState": row["workflow_state"],
        "seriousness": row["seriousness"],
        "completeness": row["completeness"],
        "dueDate": row["due_date"],
        "validationState": row["validation_state"],
        "patientId": row["patient_id"],
        "sender": row["sender"],
        "updatedAt": row["updated_at"],
    }


def fetch_case(case_id: int) -> dict | None:
    conn = get_conn()
    row = conn.execute("SELECT * FROM cases WHERE id = ?", (case_id,)).fetchone()
    conn.close()
    if not row:
        return None
    payload = json.loads(row["payload"])
    return {"summary": summarize_case(row), "case": payload}


def list_cases(search: str = "") -> list[dict]:
    conn = get_conn()
    if search:
        token = f"%{search.lower()}%"
        rows = conn.execute(
            """
            SELECT * FROM cases
            WHERE lower(case_number) LIKE ?
               OR lower(title) LIKE ?
               OR lower(patient_id) LIKE ?
            ORDER BY updated_at DESC, id DESC
            """,
            (token, token, token),
        ).fetchall()
    else:
        rows = conn.execute("SELECT * FROM cases ORDER BY updated_at DESC, id DESC").fetchall()
    conn.close()
    return [summarize_case(row) for row in rows]


def persist_case(case_payload: dict, case_id: int | None = None) -> dict:
    payload = compute_case_state(case_payload)
    report = payload["report"]
    patient = payload["patient"]
    now = utc_now()

    conn = get_conn()
    if case_id is None:
        cursor = conn.execute(
            """
            INSERT INTO cases (
                case_number, title, workflow_state, seriousness, completeness,
                due_date, validation_state, patient_id, sender, updated_at, payload
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                report["caseNumber"],
                report["title"],
                report["workflowState"],
                report["seriousness"],
                report["completeness"],
                report["dueDate"],
                report["validationState"],
                patient.get("patientId", ""),
                report.get("sender", ""),
                now,
                json.dumps(payload, ensure_ascii=False),
            ),
        )
        case_id = int(cursor.lastrowid)
    else:
        conn.execute(
            """
            UPDATE cases
            SET case_number = ?, title = ?, workflow_state = ?, seriousness = ?,
                completeness = ?, due_date = ?, validation_state = ?, patient_id = ?,
                sender = ?, updated_at = ?, payload = ?
            WHERE id = ?
            """,
            (
                report["caseNumber"],
                report["title"],
                report["workflowState"],
                report["seriousness"],
                report["completeness"],
                report["dueDate"],
                report["validationState"],
                patient.get("patientId", ""),
                report.get("sender", ""),
                now,
                json.dumps(payload, ensure_ascii=False),
                case_id,
            ),
        )
    conn.commit()
    conn.close()
    return fetch_case(case_id)


def delete_case(case_id: int) -> bool:
    conn = get_conn()
    cursor = conn.execute("DELETE FROM cases WHERE id = ?", (case_id,))
    conn.commit()
    conn.close()
    return cursor.rowcount > 0


def build_xml(case_payload: dict) -> str:
    root = ET.Element("icsr")
    report = ET.SubElement(root, "report")
    for key, value in case_payload["report"].items():
        child = ET.SubElement(report, key)
        child.text = "" if value is None else str(value)

    patient = ET.SubElement(root, "patient")
    for key, value in case_payload["patient"].items():
        child = ET.SubElement(patient, key)
        child.text = "" if value is None else str(value)

    products_el = ET.SubElement(root, "products")
    for item in case_payload.get("products", []):
        product_el = ET.SubElement(products_el, "product")
        for key, value in item.items():
            child = ET.SubElement(product_el, key)
            child.text = "" if value is None else str(value)

    events_el = ET.SubElement(root, "events")
    for item in case_payload.get("events", []):
        event_el = ET.SubElement(events_el, "event")
        for key, value in item.items():
            child = ET.SubElement(event_el, key)
            child.text = "" if value is None else str(value)

    narrative = ET.SubElement(root, "narrative")
    for key, value in case_payload["narrative"].items():
        child = ET.SubElement(narrative, key)
        child.text = "" if value is None else str(value)

    xml_bytes = ET.tostring(root, encoding="utf-8", xml_declaration=True)
    return xml_bytes.decode("utf-8")


def parse_xml(xml_text: str) -> dict:
    root = ET.fromstring(xml_text)

    def read_object(node: ET.Element) -> dict:
        return {child.tag: (child.text or "") for child in list(node)}

    case_payload = {
        "report": read_object(root.find("report") or ET.Element("report")),
        "patient": read_object(root.find("patient") or ET.Element("patient")),
        "products": [],
        "events": [],
        "narrative": read_object(root.find("narrative") or ET.Element("narrative")),
        "review": {"blocking": [], "warnings": [], "ready": False, "nextAction": ""},
    }

    products_node = root.find("products")
    if products_node is not None:
        case_payload["products"] = [read_object(product) for product in products_node.findall("product")]

    events_node = root.find("events")
    if events_node is not None:
        case_payload["events"] = [read_object(event) for event in events_node.findall("event")]

    report = case_payload["report"]
    report["completeness"] = int(report.get("completeness", 0) or 0)
    return compute_case_state(case_payload)


class AppHandler(BaseHTTPRequestHandler):
    server_version = "ICSRWorkspace/1.0"

    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path.startswith("/api/"):
            self.handle_api_get(parsed)
            return
        self.serve_static(parsed.path)

    def do_POST(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path.startswith("/api/"):
            self.handle_api_post(parsed)
            return
        self.send_error(HTTPStatus.NOT_FOUND)

    def do_PUT(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path.startswith("/api/"):
            self.handle_api_put(parsed)
            return
        self.send_error(HTTPStatus.NOT_FOUND)

    def do_DELETE(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path.startswith("/api/"):
            self.handle_api_delete(parsed)
            return
        self.send_error(HTTPStatus.NOT_FOUND)

    def read_json(self) -> dict:
        length = int(self.headers.get("Content-Length", "0"))
        body = self.rfile.read(length).decode("utf-8") if length else "{}"
        return json.loads(body or "{}")

    def send_json(self, payload: dict | list, status: int = 200) -> None:
        data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def send_text(self, payload: str, content_type: str = "text/plain; charset=utf-8", status: int = 200) -> None:
        data = payload.encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def handle_api_get(self, parsed) -> None:
        if parsed.path == "/api/health":
            self.send_json({"status": "ok", "time": utc_now()})
            return

        if parsed.path == "/api/cases":
            query = parse_qs(parsed.query)
            search = (query.get("q") or [""])[0]
            self.send_json({"items": list_cases(search)})
            return

        match = re.fullmatch(r"/api/cases/(\d+)", parsed.path)
        if match:
            case_data = fetch_case(int(match.group(1)))
            if not case_data:
                self.send_json({"error": "Case not found"}, 404)
                return
            self.send_json(case_data)
            return

        match = re.fullmatch(r"/api/cases/(\d+)/export\.xml", parsed.path)
        if match:
            case_data = fetch_case(int(match.group(1)))
            if not case_data:
                self.send_json({"error": "Case not found"}, 404)
                return
            xml_text = build_xml(case_data["case"])
            self.send_text(xml_text, "application/xml; charset=utf-8")
            return

        self.send_json({"error": "Not found"}, 404)

    def handle_api_post(self, parsed) -> None:
        if parsed.path == "/api/cases":
            body = self.read_json()
            case_payload = body.get("case")
            if not case_payload:
                self.send_json({"error": "Missing case payload"}, 400)
                return
            try:
                saved = persist_case(case_payload)
            except sqlite3.IntegrityError:
                self.send_json({"error": "Case number must be unique"}, 400)
                return
            self.send_json(saved, 201)
            return

        match = re.fullmatch(r"/api/cases/(\d+)/validate", parsed.path)
        if match:
            case_data = fetch_case(int(match.group(1)))
            if not case_data:
                self.send_json({"error": "Case not found"}, 404)
                return
            saved = persist_case(case_data["case"], int(match.group(1)))
            self.send_json(saved)
            return

        if parsed.path == "/api/import/xml":
            body = self.read_json()
            xml_text = body.get("xml", "")
            if not xml_text.strip():
                self.send_json({"error": "XML payload is empty"}, 400)
                return
            try:
                case_payload = parse_xml(xml_text)
                saved = persist_case(case_payload)
            except ET.ParseError:
                self.send_json({"error": "Invalid XML"}, 400)
                return
            except sqlite3.IntegrityError:
                self.send_json({"error": "Imported case number already exists"}, 400)
                return
            self.send_json(saved, 201)
            return

        if parsed.path == "/api/stt/transcribe":
            body = self.read_json()
            audio_base64 = body.get("audioBase64", "")
            sample_rate = int(body.get("sampleRate") or 16000)
            if not audio_base64:
                self.send_json({"error": "Audio payload is empty"}, 400)
                return
            try:
                audio_bytes = base64.b64decode(audio_base64)
                result = transcribe_pcm16(audio_bytes, sample_rate)
            except Exception as error:
                self.send_json({"error": str(error)}, 500)
                return
            self.send_json(result)
            return

        if parsed.path == "/api/nlu/parse":
            body = self.read_json()
            transcript = body.get("transcript", "")
            context = body.get("context", {}) or {}
            if not transcript.strip():
                self.send_json({"error": "Transcript is empty"}, 400)
                return
            try:
                result = parse_voice_command_with_nlu(transcript, context)
            except Exception as error:
                self.send_json({"error": str(error)}, 500)
                return
            self.send_json(result)
            return

        if parsed.path == "/api/voice/interpret":
            body = self.read_json()
            transcript = body.get("transcript", "")
            context = body.get("context", {}) or {}
            if not transcript.strip():
                self.send_json({"error": "Transcript is empty"}, 400)
                return
            try:
                result = parse_voice_command(transcript, context)
            except Exception as error:
                self.send_json({"error": str(error)}, 500)
                return
            self.send_json(result)
            return

        if parsed.path == "/api/voice/status":
            self.send_json({
                "stt": {
                    "whisper": WhisperModel is not None,
                    "vosk": Model is not None and MODEL_DIR.exists(),
                },
                "ollama": {
                    "available": is_ollama_available(),
                    "baseUrl": OLLAMA_BASE_URL,
                    "model": OLLAMA_MODEL,
                },
            })
            return

        if parsed.path == "/api/realtime/client-secret":
            try:
                payload = create_realtime_client_secret()
            except Exception as error:
                self.send_json({"error": str(error)}, 500)
                return
            self.send_json(payload)
            return

        self.send_json({"error": "Not found"}, 404)

    def handle_api_put(self, parsed) -> None:
        match = re.fullmatch(r"/api/cases/(\d+)", parsed.path)
        if not match:
            self.send_json({"error": "Not found"}, 404)
            return
        case_id = int(match.group(1))
        if not fetch_case(case_id):
            self.send_json({"error": "Case not found"}, 404)
            return
        body = self.read_json()
        case_payload = body.get("case")
        if not case_payload:
            self.send_json({"error": "Missing case payload"}, 400)
            return
        try:
            saved = persist_case(case_payload, case_id)
        except sqlite3.IntegrityError:
            self.send_json({"error": "Case number must be unique"}, 400)
            return
        self.send_json(saved)

    def handle_api_delete(self, parsed) -> None:
        match = re.fullmatch(r"/api/cases/(\d+)", parsed.path)
        if not match:
            self.send_json({"error": "Not found"}, 404)
            return
        deleted = delete_case(int(match.group(1)))
        if not deleted:
            self.send_json({"error": "Case not found"}, 404)
            return
        self.send_json({"ok": True})

    def serve_static(self, raw_path: str) -> None:
        path = raw_path or "/"
        if path == "/":
            path = "/index.html"
        fs_path = (STATIC_DIR / path.lstrip("/")).resolve()
        if not str(fs_path).startswith(str(STATIC_DIR.resolve())) or not fs_path.exists() or not fs_path.is_file():
            self.send_error(HTTPStatus.NOT_FOUND)
            return
        content_type = {
            ".html": "text/html; charset=utf-8",
            ".css": "text/css; charset=utf-8",
            ".js": "application/javascript; charset=utf-8",
            ".json": "application/json; charset=utf-8",
        }.get(fs_path.suffix.lower(), "application/octet-stream")
        self.send_text(fs_path.read_text(encoding="utf-8"), content_type)


def main() -> None:
    init_db()
    httpd = ThreadingHTTPServer((HOST, PORT), AppHandler)
    print(f"ICSR Workspace running at http://{HOST}:{PORT}")
    httpd.serve_forever()


if __name__ == "__main__":
    main()
