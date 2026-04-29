const state = {
  page: "dashboard",
  cases: [],
  caseDetails: new Map(),
  currentCaseId: null,
  currentCase: null,
  currentSummary: null,
  editorTab: "report",
  search: "",
  statusFilter: "all",
  reportsPage: 1,
  nonSeriousPage: 1,
  pageSize: 10,
  voiceControlEnabled: false,
  settings: {
    userName: "Специалист по фармаконадзору",
    email: "user@example.com",
    role: "Аналитик ФН",
    language: "ru",
    notifySerious: true,
    notifyValidation: true,
    notifyWeekly: false,
  },
};

const translations = {
  ru: {
    "brand.subtitle": "Платформа мониторинга безопасности",
    "nav.dashboard": "Панель мониторинга",
    "nav.reports": "Отчёты",
    "nav.serious": "Серьёзные случаи",
    "nav.nonserious": "Несерьёзные случаи",
    "nav.settings": "Настройки",
    "sidebar.label": "Мониторинг системы",
    "search.global": "Поиск по базе безопасности...",
    "search.reports": "Поиск по Case ID или пациенту...",
    "actions.createReport": "Создать отчёт",
    "actions.importXml": "Импортировать XML",
    "actions.exportXml": "Экспортировать XML",
    "actions.validate": "Проверить",
    "actions.close": "Закрыть",
    "actions.voice": "Голос",
    "actions.voiceMode": "Голосовой режим",
    "actions.fillDemo": "Заполнить демо",
    "actions.saveCase": "Сохранить случай",
    "actions.saveChanges": "Сохранить изменения",
    "actions.changePassword": "Сменить пароль",
    "actions.savePassword": "Сохранить пароль",
    "actions.import": "Импортировать",
    "dashboard.totalReports": "ВСЕГО ОТЧЁТОВ",
    "dashboard.seriousCases": "СЕРЬЁЗНЫЕ СЛУЧАИ",
    "dashboard.expectedEvents": "ОЖИДАЕМЫЕ СОБЫТИЯ",
    "dashboard.ready": "ГОТОВО К ПРОВЕРКЕ",
    "dashboard.trendLabel": "Динамика отчётности по месяцам",
    "dashboard.trendTitle": "Визуализация объёма поступающих сообщений по безопасности",
    "dashboard.severityLabel": "Распределение по серьёзности",
    "dashboard.severityTitle": "Структура зарегистрированных сообщений по безопасности",
    "dashboard.legendSerious": "Серьёзные",
    "dashboard.legendNonSerious": "Несерьёзные",
    "dashboard.legendReady": "Проверенные",
    "dashboard.reactionLabel": "Категории реакций",
    "dashboard.reactionTitle": "Частота определённых типов событий",
    "reports.label": "Отчёты",
    "reports.title": "Реестр ICSR",
    "serious.label": "Серьёзные случаи",
    "serious.title": "Мониторинг критических нежелательных явлений",
    "serious.death": "СМЕРТЬ",
    "serious.lifeThreatening": "УГРОЖАЕТ ЖИЗНИ",
    "serious.hospitalization": "ГОСПИТАЛИЗАЦИЯ",
    "serious.disability": "ИНВАЛИДИЗАЦИЯ",
    "nonserious.label": "Несерьёзные случаи",
    "nonserious.title": "Реестр случаев, не относящихся к категории серьёзных",
    "nonserious.total": "ВСЕГО",
    "nonserious.expected": "ОЖИДАЕМЫЕ",
    "nonserious.signals": "НОВЫЕ СИГНАЛЫ",
    "settings.label": "Настройки",
    "settings.title": "Управление профилем и системными настройками",
    "settings.profile": "Профиль",
    "settings.name": "Имя",
    "settings.email": "Email",
    "settings.role": "Роль",
    "settings.language": "Язык",
    "settings.notifications": "Уведомления",
    "settings.notifySerious": "Серьёзные случаи (ICSR)",
    "settings.notifyValidation": "Сигналы валидации E2B",
    "settings.notifyWeekly": "Еженедельная сводка панели мониторинга",
    "settings.security": "Безопасность",
    "settings.securityHint": "Локальный демонстрационный режим хранит настройки профиля только в браузере.",
    "drawer.label": "Рабочая область случая",
    "drawer.report": "Отчёт",
    "drawer.patient": "Пациент",
    "drawer.event": "Событие",
    "drawer.narrative": "Нарратив",
    "drawer.review": "Проверка",
    "field.caseId": "Case ID",
    "field.receivedDate": "Дата получения",
    "field.title": "Заголовок",
    "field.reportType": "Тип отчёта",
    "field.primarySource": "Первичный источник",
    "field.sender": "Отправитель",
    "field.seriousness": "Серьёзность",
    "field.dueDate": "Крайний срок",
    "field.patientId": "ID пациента",
    "field.initials": "Инициалы",
    "field.age": "Возраст",
    "field.sex": "Пол",
    "field.weight": "Вес, кг",
    "field.medicalHistory": "Анамнез",
    "field.drugHistory": "Лекарственный анамнез",
    "field.drug": "Препарат",
    "field.role": "Роль",
    "field.dose": "Доза",
    "field.route": "Путь введения",
    "field.therapyStart": "Начало терапии",
    "field.actionTaken": "Предпринятое действие",
    "field.eventDescription": "Описание события",
    "field.meddraPt": "MedDRA PT",
    "field.eventStart": "Начало события",
    "field.outcome": "Исход",
    "field.serious": "Серьёзность события",
    "field.causality": "Причинно-следственная связь",
    "field.caseNarrative": "Нарратив случая",
    "field.reviewerComment": "Комментарий ревьюера",
    "review.blocking": "Блокирующие замечания",
    "review.warnings": "Предупреждения",
    "review.nextAction": "Следующее действие",
    "review.blockingShort": "Блокирующие",
    "review.warningsShort": "Предупреждения",
    "review.ready": "Готово",
    "xml.title": "Импорт XML",
    "xml.payload": "XML случая",
    "xml.placeholder": "Вставьте XML-пакет сюда",
    "password.title": "Смена пароля",
    "password.current": "Текущий пароль",
    "password.new": "Новый пароль",
    "password.confirm": "Подтвердите новый пароль",
    "table.caseId": "Case ID",
    "table.receivedDate": "Дата получения",
    "table.patient": "Пациент",
    "table.reactionMeddra": "Реакция (MedDRA)",
    "table.status": "Статус",
    "table.date": "Дата",
    "table.event": "Событие",
    "table.criterion": "Критерий",
    "table.causality": "Причинно-следственная связь",
    "table.symptom": "Симптом",
    "table.drug": "Препарат",
    "table.relationship": "Связь",
    "table.action": "Действие",
    "pager.prev": "Назад",
    "pager.next": "Вперёд",
    "page.dashboard": "Мониторинг системы",
    "page.reports": "Реестр ICSR",
    "page.serious": "Мониторинг критических нежелательных явлений",
    "page.nonserious": "Реестр несерьёзных случаев",
    "page.settings": "Управление профилем и системными настройками",
    "voice.modeOff": "Голосовое управление выключено.",
    "voice.modeReady": "Голосовое управление включено. Можно говорить команды для навигации, открытия случая и заполнения полей.",
    "voice.modeUnsupported": "Этот браузер не поддерживает голосовое управление. Используйте Chrome или Edge.",
  },
  en: {
    "brand.subtitle": "Safety monitoring platform",
    "nav.dashboard": "Dashboard",
    "nav.reports": "Reports",
    "nav.serious": "Serious Cases",
    "nav.nonserious": "Non-serious Cases",
    "nav.settings": "Settings",
    "sidebar.label": "System Monitoring",
    "search.global": "Search safety database...",
    "search.reports": "Search by Case ID or patient...",
    "actions.createReport": "Create Report",
    "actions.importXml": "Import XML",
    "actions.exportXml": "Export XML",
    "actions.validate": "Validate",
    "actions.close": "Close",
    "actions.voice": "Voice",
    "actions.voiceMode": "Voice mode",
    "actions.fillDemo": "Fill Demo",
    "actions.saveCase": "Save Case",
    "actions.saveChanges": "Save Changes",
    "actions.changePassword": "Change Password",
    "actions.savePassword": "Save Password",
    "actions.import": "Import",
    "dashboard.totalReports": "TOTAL CASE REPORTS",
    "dashboard.seriousCases": "SERIOUS CASES",
    "dashboard.expectedEvents": "EXPECTED EVENTS",
    "dashboard.ready": "VALIDATION READY",
    "dashboard.trendLabel": "Monthly Reporting Trend",
    "dashboard.trendTitle": "Visualization of safety data submission volume",
    "dashboard.severityLabel": "Severity Distribution",
    "dashboard.severityTitle": "Breakdown of reported safety cases",
    "dashboard.legendSerious": "Serious",
    "dashboard.legendNonSerious": "Non-serious",
    "dashboard.legendReady": "Ready",
    "dashboard.reactionLabel": "Reaction Categories",
    "dashboard.reactionTitle": "Frequency of specific event types",
    "reports.label": "Reports",
    "reports.title": "ICSR Registry",
    "serious.label": "Serious Cases",
    "serious.title": "Monitoring of critical adverse events",
    "serious.death": "DEATH",
    "serious.lifeThreatening": "LIFE-THREATENING",
    "serious.hospitalization": "HOSPITALIZATION",
    "serious.disability": "DISABILITY",
    "nonserious.label": "Non-serious Cases",
    "nonserious.title": "Registry of cases not classified as serious",
    "nonserious.total": "TOTAL",
    "nonserious.expected": "EXPECTED",
    "nonserious.signals": "NEW SIGNALS",
    "settings.label": "Settings",
    "settings.title": "Manage profile and system preferences",
    "settings.profile": "Profile",
    "settings.name": "Name",
    "settings.email": "Email",
    "settings.role": "Role",
    "settings.language": "Language",
    "settings.notifications": "Notifications",
    "settings.notifySerious": "Serious cases (ICSR)",
    "settings.notifyValidation": "E2B validation alerts",
    "settings.notifyWeekly": "Weekly dashboard digest",
    "settings.security": "Security",
    "settings.securityHint": "Local demo mode stores profile preferences in the browser only.",
    "drawer.label": "Case Workspace",
    "drawer.report": "Report",
    "drawer.patient": "Patient",
    "drawer.event": "Event",
    "drawer.narrative": "Narrative",
    "drawer.review": "Review",
    "field.caseId": "Case ID",
    "field.receivedDate": "Date received",
    "field.title": "Title",
    "field.reportType": "Report type",
    "field.primarySource": "Primary source",
    "field.sender": "Sender",
    "field.seriousness": "Seriousness",
    "field.dueDate": "Due date",
    "field.patientId": "Patient ID",
    "field.initials": "Initials",
    "field.age": "Age",
    "field.sex": "Sex",
    "field.weight": "Weight, kg",
    "field.medicalHistory": "Medical history",
    "field.drugHistory": "Drug history",
    "field.drug": "Drug",
    "field.role": "Role",
    "field.dose": "Dose",
    "field.route": "Route",
    "field.therapyStart": "Therapy start",
    "field.actionTaken": "Action taken",
    "field.eventDescription": "Event description",
    "field.meddraPt": "MedDRA PT",
    "field.eventStart": "Event start",
    "field.outcome": "Outcome",
    "field.serious": "Serious",
    "field.causality": "Causality",
    "field.caseNarrative": "Case narrative",
    "field.reviewerComment": "Reviewer comment",
    "review.blocking": "Blocking issues",
    "review.warnings": "Warnings",
    "review.nextAction": "Next action",
    "review.blockingShort": "Blocking",
    "review.warningsShort": "Warnings",
    "review.ready": "Ready",
    "xml.title": "Import XML",
    "xml.payload": "Case XML",
    "xml.placeholder": "Paste XML payload here",
    "password.title": "Change Password",
    "password.current": "Current password",
    "password.new": "New password",
    "password.confirm": "Confirm new password",
    "table.caseId": "Case ID",
    "table.receivedDate": "Date received",
    "table.patient": "Patient",
    "table.reactionMeddra": "Reaction (MedDRA)",
    "table.status": "Status",
    "table.date": "Date",
    "table.event": "Event",
    "table.criterion": "Criterion",
    "table.causality": "Causality",
    "table.symptom": "Symptom",
    "table.drug": "Drug",
    "table.relationship": "Relationship",
    "table.action": "Action",
    "pager.prev": "Previous",
    "pager.next": "Next",
    "page.dashboard": "System Monitoring",
    "page.reports": "ICSR Registry",
    "page.serious": "Critical Adverse Event Monitoring",
    "page.nonserious": "Non-serious Case Registry",
    "page.settings": "Profile and System Preferences",
    "voice.modeOff": "Voice control is off.",
    "voice.modeReady": "Voice control is on. You can speak commands for navigation, case opening and field entry.",
    "voice.modeUnsupported": "This browser does not support voice control. Use Chrome or Edge.",
  },
};

const els = {
  navMenu: document.getElementById("navMenu"),
  globalSearch: document.getElementById("globalSearch"),
  languageSwitcher: document.getElementById("languageSwitcher"),
  voiceControlBtn: document.getElementById("voiceControlBtn"),
  pageEyebrow: document.getElementById("pageEyebrow"),
  pageTitle: document.getElementById("pageTitle"),
  globalVoiceStatus: document.getElementById("globalVoiceStatus"),
  createCaseBtn: document.getElementById("createCaseBtn"),
  importXmlBtn: document.getElementById("importXmlBtn"),
  openCreateFromReports: document.getElementById("openCreateFromReports"),
  reportsSearch: document.getElementById("reportsSearch"),
  statusFilter: document.getElementById("statusFilter"),
  reportsFound: document.getElementById("reportsFound"),
  reportsHint: document.getElementById("reportsHint"),
  reportsFooterLeft: document.getElementById("reportsFooterLeft"),
  reportsPrevBtn: document.getElementById("reportsPrevBtn"),
  reportsNextBtn: document.getElementById("reportsNextBtn"),
  reportsPageInfo: document.getElementById("reportsPageInfo"),
  reportsTableBody: document.getElementById("reportsTableBody"),
  seriousTableBody: document.getElementById("seriousTableBody"),
  nonSeriousTableBody: document.getElementById("nonSeriousTableBody"),
  nonSeriousFooterLeft: document.getElementById("nonSeriousFooterLeft"),
  nonSeriousPrevBtn: document.getElementById("nonSeriousPrevBtn"),
  nonSeriousNextBtn: document.getElementById("nonSeriousNextBtn"),
  nonSeriousPageInfo: document.getElementById("nonSeriousPageInfo"),
  metricTotal: document.getElementById("metricTotal"),
  metricSerious: document.getElementById("metricSerious"),
  metricExpected: document.getElementById("metricExpected"),
  metricReady: document.getElementById("metricReady"),
  metricTotalNote: document.getElementById("metricTotalNote"),
  metricSeriousNote: document.getElementById("metricSeriousNote"),
  metricExpectedNote: document.getElementById("metricExpectedNote"),
  metricReadyNote: document.getElementById("metricReadyNote"),
  splitSerious: document.getElementById("splitSerious"),
  splitNonSerious: document.getElementById("splitNonSerious"),
  splitReady: document.getElementById("splitReady"),
  donutChart: document.getElementById("donutChart"),
  trendChart: document.getElementById("trendChart"),
  reactionChart: document.getElementById("reactionChart"),
  seriousAttention: document.getElementById("seriousAttention"),
  seriousFatal: document.getElementById("seriousFatal"),
  seriousLifeThreat: document.getElementById("seriousLifeThreat"),
  seriousHospital: document.getElementById("seriousHospital"),
  seriousDisability: document.getElementById("seriousDisability"),
  nonSeriousTotal: document.getElementById("nonSeriousTotal"),
  nonSeriousExpected: document.getElementById("nonSeriousExpected"),
  nonSeriousSignals: document.getElementById("nonSeriousSignals"),
  sidebarCaseCount: document.getElementById("sidebarCaseCount"),
  sidebarCaseSummary: document.getElementById("sidebarCaseSummary"),
  saveSettingsBtn: document.getElementById("saveSettingsBtn"),
  changePasswordBtn: document.getElementById("changePasswordBtn"),
  settingsUserName: document.getElementById("settingsUserName"),
  settingsEmail: document.getElementById("settingsEmail"),
  settingsRole: document.getElementById("settingsRole"),
  settingsLanguage: document.getElementById("settingsLanguage"),
  notifySerious: document.getElementById("notifySerious"),
  notifyValidation: document.getElementById("notifyValidation"),
  notifyWeekly: document.getElementById("notifyWeekly"),
  userAvatar: document.getElementById("userAvatar"),
  editorDrawer: document.getElementById("editorDrawer"),
  drawerPanel: document.getElementById("drawerPanel"),
  editorTitle: document.getElementById("editorTitle"),
  editorMeta: document.getElementById("editorMeta"),
  caseModeLabel: document.getElementById("caseModeLabel"),
  caseModeValue: document.getElementById("caseModeValue"),
  caseModeHint: document.getElementById("caseModeHint"),
  workspaceStageLabel: document.getElementById("workspaceStageLabel"),
  workspaceCompletionLabel: document.getElementById("workspaceCompletionLabel"),
  workspaceActionCount: document.getElementById("workspaceActionCount"),
  workspaceStepper: document.getElementById("workspaceStepper"),
  sectionReadinessMap: document.getElementById("sectionReadinessMap"),
  drawerCloseBtn: document.getElementById("drawerCloseBtn"),
  drawerValidateBtn: document.getElementById("drawerValidateBtn"),
  drawerExportBtn: document.getElementById("drawerExportBtn"),
  editorTabs: document.getElementById("editorTabs"),
  editorForm: document.getElementById("editorForm"),
  fillDemoBtn: document.getElementById("fillDemoBtn"),
  completionChecklist: document.getElementById("completionChecklist"),
  blockingList: document.getElementById("blockingList"),
  warningsList: document.getElementById("warningsList"),
  blockingCount: document.getElementById("blockingCount"),
  warningCount: document.getElementById("warningCount"),
  readyState: document.getElementById("readyState"),
  caseTimeline: document.getElementById("caseTimeline"),
  voiceStatus: document.getElementById("voiceStatus"),
  xmlDialog: document.getElementById("xmlDialog"),
  xmlInput: document.getElementById("xmlInput"),
  submitImportBtn: document.getElementById("submitImportBtn"),
  passwordDialog: document.getElementById("passwordDialog"),
  passwordForm: document.getElementById("passwordForm"),
  currentPassword: document.getElementById("currentPassword"),
  newPassword: document.getElementById("newPassword"),
  confirmPassword: document.getElementById("confirmPassword"),
  passwordHelp: document.getElementById("passwordHelp"),
  savePasswordBtn: document.getElementById("savePasswordBtn"),
};

const pageMeta = {
  dashboard: { eyebrowKey: "nav.dashboard", titleKey: "page.dashboard" },
  reports: { eyebrowKey: "nav.reports", titleKey: "page.reports" },
  serious: { eyebrowKey: "nav.serious", titleKey: "page.serious" },
  nonserious: { eyebrowKey: "nav.nonserious", titleKey: "page.nonserious" },
  settings: { eyebrowKey: "nav.settings", titleKey: "page.settings" },
};

const voiceFieldDefinitions = [
  { field: "report.caseNumber", panel: "report", aliases: ["case id", "номер случая", "номер кейса", "id случая", "айди случая", "ид случая", "ид кейса", "айди кейса"] },
  { field: "report.title", panel: "report", aliases: ["заголовок", "название случая", "название кейса", "тема случая", "title"] },
  { field: "report.reportType", panel: "report", aliases: ["тип отчета", "тип отчёта", "тип", "report type"] },
  { field: "report.primarySource", panel: "report", aliases: ["первичный источник", "источник", "источник сообщения"] },
  { field: "report.sender", panel: "report", aliases: ["отправитель", "кто отправил", "sender"] },
  { field: "report.seriousness", panel: "report", aliases: ["серьезность", "серьёзность", "серьезность случая", "серьёзность случая", "seriousness"] },
  { field: "report.receivedDate", panel: "report", aliases: ["дата получения", "получено", "день получения", "received date"] },
  { field: "report.dueDate", panel: "report", aliases: ["крайний срок", "срок", "дедлайн", "due date"] },

  { field: "patient.patientId", panel: "patient", aliases: ["id пациента", "номер пациента", "patient id", "айди пациента", "ид пациента", "ид больного", "айди больного"] },
  { field: "patient.initials", panel: "patient", aliases: ["инициалы", "инициал", "буквы пациента", "initials"] },
  { field: "patient.age", panel: "patient", aliases: ["возраст", "возраст пациента", "сколько лет", "age"] },
  { field: "patient.sex", panel: "patient", aliases: ["пол", "пол пациента", "gender", "sex"] },
  { field: "patient.weightKg", panel: "patient", aliases: ["вес", "вес кг", "вес пациента", "масса", "масса тела", "weight"] },
  { field: "patient.medicalHistory", panel: "patient", aliases: ["анамнез", "история болезни", "медицинский анамнез", "medical history"] },
  { field: "patient.drugHistory", panel: "patient", aliases: ["лекарственный анамнез", "анамнез лекарств", "история лекарств", "drug history"] },

  { field: "products.0.name", panel: "event", aliases: ["препарат", "название препарата", "лекарство", "product", "drug"] },
  { field: "products.0.role", panel: "event", aliases: ["роль препарата", "роль", "тип препарата", "drug role"] },
  { field: "products.0.dose", panel: "event", aliases: ["доза", "дозу", "дозировка", "dose"] },
  { field: "products.0.route", panel: "event", aliases: ["путь введения", "способ введения", "маршрут введения", "route"] },
  { field: "products.0.startDate", panel: "event", aliases: ["начало терапии", "дата начала терапии", "начало приема", "начало приёма", "дата начала приема", "дата начала приёма", "therapy start"] },
  { field: "products.0.actionTaken", panel: "event", aliases: ["предпринятое действие", "действие по препарату", "принятое решение", "предпринятое решение", "действие", "action taken"] },
  { field: "events.0.description", panel: "event", aliases: ["описание события", "событие", "описание реакции", "event description"] },
  { field: "events.0.meddraPt", panel: "event", aliases: ["meddra", "меддра", "meddra pt", "медра", "пти", "pt", "preferred term", "пт"] },
  { field: "events.0.startDate", panel: "event", aliases: ["начало события", "дата события", "дата начала события", "начало реакции", "event start"] },
  { field: "events.0.outcome", panel: "event", aliases: ["исход", "результат", "outcome"] },
  { field: "events.0.serious", panel: "event", aliases: ["серьезность события", "серьёзность события", "серьезность реакции", "серьёзность реакции"] },
  { field: "events.0.causality", panel: "event", aliases: ["причинно следственная связь", "причинно-следственная связь", "связь", "каузальность", "causality"] },

  { field: "narrative.summary", panel: "narrative", aliases: ["нарратив", "наратив", "нарратив случая", "наратив случая", "описание случая", "сводка случая", "narrative"] },
  { field: "narrative.reviewerComment", panel: "narrative", aliases: ["комментарий ревьюера", "комментарии ревьюера", "комментарий", "reviewer comment"] },
];

const settingsFieldDefinitions = [
  { key: "userName", element: "settingsUserName", aliases: ["имя", "имя пользователя"] },
  { key: "role", element: "settingsRole", aliases: ["роль"] },
  { key: "email", element: "settingsEmail", aliases: ["email", "e-mail", "почта"] },
  { key: "language", element: "settingsLanguage", aliases: ["язык"] },
];

const settingsToggleDefinitions = [
  { element: "notifySerious", aliases: ["уведомления", "серьезные случаи", "серьёзные случаи", "icsr уведомления"] },
  { element: "notifyValidation", aliases: ["сигналы валидации", "валидация e2b", "уведомления валидации"] },
  { element: "notifyWeekly", aliases: ["еженедельная сводка", "сводка панели мониторинга"] },
];

const AudioContextCtor = window.AudioContext || window.webkitAudioContext || null;
let activeRecognition = null;
let activeVoiceButton = null;
let activeVoiceField = null;
let commandRecognition = null;
let commandRecognitionRestartTimer = null;
let commandLoopGeneration = 0;
let lastVoiceSttResult = null;
let lastVoiceIntentPayload = null;
const FIELD_DICTATION_SILENCE_MS = 5000;
const FIELD_DICTATION_MAX_MS = 30000;
const ENABLE_REALTIME_VOICE = false;
const realtimeVoice = {
  pc: null,
  dc: null,
  stream: null,
  audioElement: null,
  active: false,
  connecting: false,
  lastFocusedField: null,
  lastFocusedSettingsField: null,
};

function currentLang() {
  return state.settings.language === "en" ? "en" : "ru";
}

function t(key, vars = {}) {
  const dict = translations[currentLang()] || translations.ru;
  const template = dict[key] || translations.ru[key] || key;
  return template.replace(/\{(\w+)\}/g, (_match, token) => String(vars[token] ?? ""));
}

function formatPercentDelta(value) {
  return currentLang() === "en" ? `+${value}% vs last month` : `+${value}% к прошлому месяцу`;
}

function applyTranslations() {
  document.documentElement.lang = currentLang();
  for (const node of document.querySelectorAll("[data-i18n]")) {
    node.textContent = t(node.dataset.i18n);
  }
  for (const node of document.querySelectorAll("[data-i18n-placeholder]")) {
    node.placeholder = t(node.dataset.i18nPlaceholder);
  }

  els.languageSwitcher.value = currentLang();
  els.settingsLanguage.value = currentLang();

  const statusOptions = els.statusFilter.querySelectorAll("option");
  if (statusOptions[0]) statusOptions[0].textContent = currentLang() === "en" ? "All statuses" : "Все статусы";
  if (statusOptions[1]) statusOptions[1].textContent = currentLang() === "en" ? "Validated" : "Проверено";
  if (statusOptions[2]) statusOptions[2].textContent = currentLang() === "en" ? "Needs review" : "Требует доработки";
  if (statusOptions[3]) statusOptions[3].textContent = currentLang() === "en" ? "Draft" : "Черновик";

  if (state.page) {
    els.pageEyebrow.textContent = t(pageMeta[state.page].eyebrowKey);
    els.pageTitle.textContent = t(pageMeta[state.page].titleKey);
  }
  setGlobalVoiceStatus(state.voiceControlEnabled ? t("voice.modeReady") : t("voice.modeOff"));
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const contentType = response.headers.get("content-type") || "";
  const body = contentType.includes("application/json") ? await response.json() : await response.text();
  if (!response.ok) throw new Error(typeof body === "string" ? body : body.error || "Request failed");
  return body;
}

function buildVoiceContext(mode = "command") {
  const focusedTarget = getFocusedVoiceTarget();
  return {
    mode,
    page: state.page,
    editorTab: state.editorTab,
    hasCurrentCase: Boolean(state.currentCase),
    language: currentLang(),
    statusFilter: state.statusFilter,
    focusedTarget: focusedTarget?.kind || "",
    focusedField: focusedTarget?.kind === "caseField" ? focusedTarget.name : (realtimeVoice.lastFocusedField || ""),
    focusedSettingsField: focusedTarget?.kind === "settingsField" ? focusedTarget.name : (realtimeVoice.lastFocusedSettingsField || ""),
  };
}

async function requestBackendVoiceIntent(transcript, mode = "command") {
  const payload = await api("/api/voice/interpret", {
    method: "POST",
    body: JSON.stringify({
      transcript,
      context: buildVoiceContext(mode),
    }),
  });
  lastVoiceIntentPayload = payload || null;
  return payload || null;
}

function supportsRealtimeVoice() {
  return ENABLE_REALTIME_VOICE && Boolean(window.RTCPeerConnection && navigator.mediaDevices?.getUserMedia);
}

function isRealtimeVoiceActive() {
  return realtimeVoice.active || realtimeVoice.connecting;
}

async function fetchRealtimeClientSecret() {
  const payload = await api("/api/realtime/client-secret", { method: "POST", body: "{}" });
  return payload?.client_secret?.value || payload?.value || "";
}

function getFocusedVoiceTarget() {
  const active = document.activeElement;
  if (!active) return null;
  if (active.matches?.("#editorForm [name]")) {
    return { kind: "caseField", name: active.name };
  }
  if (active.id && ["settingsUserName", "settingsEmail", "settingsRole", "settingsLanguage"].includes(active.id)) {
    return { kind: "settingsField", name: active.id };
  }
  if (active.id === "globalSearch") {
    return { kind: "globalSearch", name: "globalSearch" };
  }
  if (active.id === "reportsSearch") {
    return { kind: "reportsSearch", name: "reportsSearch" };
  }
  return null;
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function byPath(target, path, value) {
  const parts = path.split(".");
  let current = target;
  for (let i = 0; i < parts.length - 1; i += 1) {
    const key = /^\d+$/.test(parts[i]) ? Number(parts[i]) : parts[i];
    if (current[key] == null) current[key] = /^\d+$/.test(parts[i + 1]) ? [] : {};
    current = current[key];
  }
  const last = parts.at(-1);
  current[/^\d+$/.test(last) ? Number(last) : last] = value;
}

function getByPath(target, path) {
  return path.split(".").reduce((acc, part) => {
    if (acc == null) return "";
    return acc[/^\d+$/.test(part) ? Number(part) : part];
  }, target);
}

function normalizeText(value) {
  return String(value || "").toLowerCase();
}

function normalizeUiLabel(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[^\p{L}\p{N}\s-]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\bайди\b/gu, "id")
    .replace(/\bид\b/gu, "id")
    .replace(/\bи д\b/gu, "id")
    .replace(/\bcase\s+id\b/gu, "case id")
    .replace(/\bкейс\s+id\b/gu, "case id")
    .replace(/\bкейс\s+айди\b/gu, "case id")
    .replace(/\bслучай\s+id\b/gu, "case id")
    .replace(/\bпациента\b|\bпациенту\b|\bпациентом\b/gu, "пациент")
    .replace(/\bсобытия\b|\bсобытию\b|\bсобытием\b/gu, "событие")
    .replace(/\bотчета\b|\bотчете\b|\bотчету\b/gu, "отчет")
    .replace(/\bнарратива\b|\bнарративе\b/gu, "нарратив")
    .replace(/\be mail\b/gu, "email")
    .replace(/\be-mail\b/gu, "email")
    .replace(/\bимейл\b/gu, "email")
    .replace(/\bмедра\b/gu, "meddra")
    .replace(/\bмеддра\b/gu, "meddra")
    .replace(/\bпти\b/gu, "пт")
    .replace(/\bнаратив\b/gu, "нарратив")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeLanguage(value) {
  if (value === "English" || value === "en") return "en";
  return "ru";
}

function localizedUnknown() {
  return currentLang() === "en" ? "Unknown" : "Не указано";
}

function localizedYes() {
  return currentLang() === "en" ? "Yes" : "Да";
}

function localizedNo() {
  return currentLang() === "en" ? "No" : "Нет";
}

function localNowLabel() {
  return new Date().toLocaleString(currentLang() === "en" ? "en-GB" : "ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function isSerious(summary) {
  const text = normalizeText(summary.seriousness);
  return text.includes("серь") && !text.includes("нес");
}

function getPatientLabel(casePayload) {
  const patient = casePayload?.patient || {};
  const name = patient.initials || patient.patientId || localizedUnknown();
  const age = patient.age ? ` (${patient.age})` : "";
  return `${name}${age}`;
}

function getReactionLabel(casePayload) {
  return casePayload?.events?.[0]?.meddraPt || casePayload?.events?.[0]?.description || localizedUnknown();
}

function getProductLabel(casePayload) {
  return casePayload?.products?.[0]?.name || localizedUnknown();
}

function getCausality(casePayload) {
  return casePayload?.events?.[0]?.causality || (currentLang() === "en" ? "Possible" : "Возможная");
}

function getCriterion(casePayload) {
  const text = normalizeText(casePayload?.events?.[0]?.description);
  const outcome = normalizeText(casePayload?.events?.[0]?.outcome);
  if (outcome.includes("смер")) return currentLang() === "en" ? "Death" : "Смерть";
  if (text.includes("анафилак")) return currentLang() === "en" ? "Life-threatening" : "Угрожает жизни";
  if (outcome.includes("госпитал")) return currentLang() === "en" ? "Hospitalization" : "Госпитализация";
  if (text.includes("инвалид")) return currentLang() === "en" ? "Disability" : "Инвалидизация";
  return currentLang() === "en" ? "Serious" : "Серьёзный случай";
}

function statusBadge(status) {
  if (status === "Проверено") return `<span class="status-badge status-validated">${currentLang() === "en" ? "Validated" : "Проверено"}</span>`;
  if (status === "Требует доработки") return `<span class="status-badge status-review">${currentLang() === "en" ? "Needs review" : "Требует доработки"}</span>`;
  return `<span class="status-badge status-draft">${currentLang() === "en" ? "Draft" : "Черновик"}</span>`;
}

function buildEmptyCase() {
  const now = new Date().toISOString().slice(0, 10);
  return {
    report: {
      caseNumber: `RU-E2B-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      title: currentLang() === "en" ? "New Case" : "Новый случай",
      receivedDate: now,
      reportType: "Spontaneous",
      primarySource: "Physician",
      workflowState: "Черновик",
      seriousness: "Несерьёзный",
      completeness: 0,
      dueDate: now,
      validationState: "Не проверено",
      sender: currentLang() === "en" ? "PV Analyst" : "Специалист ФН",
    },
    patient: { patientId: "", initials: "", age: "", sex: "", weightKg: "", medicalHistory: "", drugHistory: "" },
    products: [{ id: "prod-1", name: "", role: "", dose: "", route: "", startDate: "", actionTaken: "" }],
    events: [{ id: "evt-1", description: "", meddraPt: "", startDate: "", outcome: "", serious: "", causality: "" }],
    narrative: { summary: "", reviewerComment: "" },
    review: { blocking: [], warnings: [], ready: false, nextAction: "" },
    timeline: [
      {
        time: localNowLabel(),
        title: currentLang() === "en" ? "Case created" : "Кейс создан",
        detail: currentLang() === "en" ? "A new draft workspace has been initialized." : "Инициализирована новая рабочая область черновика.",
      },
    ],
  };
}

function setPage(page) {
  state.page = page;
  for (const button of document.querySelectorAll(".nav-link")) {
    button.classList.toggle("active", button.dataset.page === page);
  }
  for (const panel of document.querySelectorAll(".page")) {
    panel.classList.toggle("active", panel.dataset.page === page);
  }
  els.pageEyebrow.textContent = t(pageMeta[page].eyebrowKey);
  els.pageTitle.textContent = t(pageMeta[page].titleKey);
  if (isRealtimeVoiceActive()) sendRealtimeContextNote(`Current page is ${page}.`);
}

async function loadCases() {
  const data = await api("/api/cases");
  state.cases = data.items;
  const details = await Promise.all(state.cases.map((item) => api(`/api/cases/${item.id}`)));
  state.caseDetails = new Map(details.map((detail) => [detail.summary.id, detail]));
  renderAll();
}

function getFilteredCases() {
  return state.cases.filter((summary) => {
    if (state.statusFilter !== "all" && summary.validationState !== state.statusFilter) return false;
    if (!state.search) return true;
    const detail = state.caseDetails.get(summary.id)?.case;
    const haystack = [
      summary.caseNumber,
      summary.patientId,
      summary.title,
      detail?.events?.[0]?.description,
      detail?.events?.[0]?.meddraPt,
      detail?.products?.[0]?.name,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(state.search.toLowerCase());
  });
}

function paginate(items, page) {
  const totalPages = Math.max(1, Math.ceil(items.length / state.pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * state.pageSize;
  return {
    items: items.slice(start, start + state.pageSize),
    page: safePage,
    totalPages,
    start: items.length ? start + 1 : 0,
    end: Math.min(start + state.pageSize, items.length),
    total: items.length,
  };
}

function renderSidebar() {
  const serious = state.cases.filter((item) => isSerious(item)).length;
  els.sidebarCaseCount.textContent = String(state.cases.length);
  els.sidebarCaseSummary.textContent = serious
    ? currentLang() === "en"
      ? `${serious} serious cases require priority review.`
      : `${serious} серьёзных случаев требуют приоритетной проверки.`
    : currentLang() === "en"
      ? "No critical cases need attention right now."
      : "Критических случаев, требующих внимания, сейчас нет.";
}

function renderTrendChart(values) {
  const width = 760;
  const height = 280;
  const pad = 24;
  const max = Math.max(...values, 1);
  const points = values.map((value, index) => {
    const x = pad + (index * (width - pad * 2)) / (values.length - 1);
    const y = height - pad - (value / max) * (height - pad * 2);
    return { x, y };
  });
  const polyline = points.map((point) => `${point.x},${point.y}`).join(" ");
  const area = `${pad},${height - pad} ${polyline} ${width - pad},${height - pad}`;
  els.trendChart.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" aria-label="${t("dashboard.trendLabel")}">
      <line class="chart-axis" x1="${pad}" y1="${height - pad}" x2="${width - pad}" y2="${height - pad}"></line>
      <polygon class="chart-area" points="${area}"></polygon>
      <polyline class="chart-line" points="${polyline}"></polyline>
      ${points
        .map(
          (point, index) => `
            <circle class="chart-dot" cx="${point.x}" cy="${point.y}" r="4"></circle>
            <text class="chart-label" x="${point.x}" y="${height - 6}" text-anchor="middle">${String(index + 1).padStart(2, "0")}</text>
          `
        )
        .join("")}
    </svg>
  `;
}

function renderDashboard() {
  const total = state.cases.length;
  const serious = state.cases.filter((item) => isSerious(item)).length;
  const ready = state.cases.filter((item) => item.validationState === "Проверено").length;
  const expected = Math.max(ready, Math.round(total * 0.63));
  els.metricTotal.textContent = total.toLocaleString("ru-RU");
  els.metricSerious.textContent = serious.toLocaleString("ru-RU");
  els.metricExpected.textContent = expected.toLocaleString("ru-RU");
  els.metricReady.textContent = ready.toLocaleString("ru-RU");
  els.metricTotalNote.textContent = total ? formatPercentDelta("12.5") : formatPercentDelta("0.0");
  els.metricSeriousNote.textContent = serious ? formatPercentDelta("4.2") : formatPercentDelta("0.0");
  els.metricExpectedNote.textContent = expected ? formatPercentDelta("8.1") : formatPercentDelta("0.0");
  els.metricReadyNote.textContent = ready ? formatPercentDelta("6.3") : formatPercentDelta("0.0");
  els.splitSerious.textContent = String(serious);
  els.splitNonSerious.textContent = String(total - serious);
  els.splitReady.textContent = String(ready);

  const monthly = Array.from({ length: 12 }, () => 0);
  for (const item of state.cases) {
    const month = Number((item.updatedAt || "").slice(5, 7));
    if (month >= 1 && month <= 12) monthly[month - 1] += 1;
  }
  const chartValues = monthly.map((value, index) => value || (index % 3) + 1);
  renderTrendChart(chartValues);

  const totalSegments = Math.max(total, 1);
  const seriousDeg = (serious / totalSegments) * 360;
  const nonSeriousDeg = ((total - serious) / totalSegments) * 360;
  els.donutChart.style.background = `conic-gradient(var(--primary) 0deg ${seriousDeg}deg, var(--secondary) ${seriousDeg}deg ${seriousDeg + nonSeriousDeg}deg, var(--primary-soft) ${seriousDeg + nonSeriousDeg}deg 360deg)`;
  els.donutChart.dataset.total = String(total);

  const categories = {};
  for (const [, detail] of state.caseDetails) {
    const reaction = getReactionLabel(detail.case);
    categories[reaction] = (categories[reaction] || 0) + 1;
  }
  const categoryEntries = Object.entries(categories).slice(0, 6);
  const maxCategory = Math.max(...categoryEntries.map(([, value]) => value), 1);
  els.reactionChart.innerHTML = categoryEntries
    .map(
      ([label, value]) => `
        <div class="reaction-row">
          <strong class="reaction-label">${label}</strong>
          <div class="reaction-track"><div class="reaction-fill" style="width:${(value / maxCategory) * 100}%"></div></div>
          <span class="reaction-value">${value}</span>
        </div>
      `
    )
    .join("");
}

function renderReports() {
  const filtered = getFilteredCases();
  const page = paginate(filtered, state.reportsPage);
  state.reportsPage = page.page;
  els.reportsFound.textContent = currentLang() === "en" ? `Found: ${filtered.length} reports` : `Найдено: ${filtered.length} отчётов`;
  els.reportsHint.textContent = state.search
    ? currentLang() === "en"
      ? `Search: ${state.search}`
      : `Поиск: ${state.search}`
    : t("search.reports");
  els.reportsFooterLeft.textContent = currentLang() === "en" ? `Showing ${page.start}-${page.end} of ${page.total}` : `Показано ${page.start}-${page.end} из ${page.total}`;
  els.reportsPageInfo.textContent = currentLang() === "en" ? `Page ${page.page} of ${page.totalPages}` : `Страница ${page.page} из ${page.totalPages}`;
  els.reportsPrevBtn.disabled = page.page <= 1;
  els.reportsNextBtn.disabled = page.page >= page.totalPages;
  els.reportsTableBody.innerHTML = page.items
    .map((summary) => {
      const detail = state.caseDetails.get(summary.id)?.case;
      return `
        <tr>
          <td>${summary.caseNumber}</td>
          <td>${(summary.updatedAt || "").slice(0, 10)}</td>
          <td>${getPatientLabel(detail)}</td>
          <td>${getReactionLabel(detail)}</td>
          <td>${statusBadge(summary.validationState)}</td>
          <td><button class="row-link" data-open-case="${summary.id}">${currentLang() === "en" ? "Open" : "Открыть"}</button></td>
        </tr>
      `;
    })
    .join("");
}

function renderSerious() {
  const items = getFilteredCases().filter((summary) => isSerious(summary));
  let fatal = 0;
  let lifeThreat = 0;
  let hospital = 0;
  let disability = 0;
  els.seriousTableBody.innerHTML = items
    .map((summary) => {
      const detail = state.caseDetails.get(summary.id)?.case;
      const criterion = getCriterion(detail);
      if (criterion === "Death" || criterion === "Смерть") fatal += 1;
      else if (criterion === "Life-threatening" || criterion === "Угрожает жизни") lifeThreat += 1;
      else if (criterion === "Hospitalization" || criterion === "Госпитализация") hospital += 1;
      else disability += 1;
      return `
        <tr>
          <td>${summary.caseNumber}</td>
          <td>${(summary.updatedAt || "").slice(0, 10)}</td>
          <td>${getPatientLabel(detail)}</td>
          <td>${getReactionLabel(detail)}</td>
          <td>${criterion}</td>
          <td>${getCausality(detail)}</td>
          <td>${statusBadge(summary.validationState)}</td>
          <td><button class="row-link" data-open-case="${summary.id}">${currentLang() === "en" ? "View" : "Открыть"}</button></td>
        </tr>
      `;
    })
    .join("");
  els.seriousAttention.textContent = currentLang() === "en" ? `Requires attention: ${items.length}` : `Требуют внимания: ${items.length}`;
  els.seriousFatal.textContent = String(fatal);
  els.seriousLifeThreat.textContent = String(lifeThreat);
  els.seriousHospital.textContent = String(hospital);
  els.seriousDisability.textContent = String(disability);
}

function renderNonSerious() {
  const items = getFilteredCases().filter((summary) => !isSerious(summary));
  const expected = items.filter((summary) => summary.validationState === "Проверено").length;
  const signals = items.filter((summary) => (state.caseDetails.get(summary.id)?.case.review?.warnings || []).length > 0).length;
  const page = paginate(items, state.nonSeriousPage);
  state.nonSeriousPage = page.page;
  els.nonSeriousTotal.textContent = String(items.length);
  els.nonSeriousExpected.textContent = String(expected);
  els.nonSeriousSignals.textContent = String(signals);
  els.nonSeriousFooterLeft.textContent = currentLang() === "en" ? `Showing ${page.start}-${page.end} of ${page.total} records` : `Показано ${page.start}-${page.end} из ${page.total} записей`;
  els.nonSeriousPageInfo.textContent = currentLang() === "en" ? `Page ${page.page} of ${page.totalPages}` : `Страница ${page.page} из ${page.totalPages}`;
  els.nonSeriousPrevBtn.disabled = page.page <= 1;
  els.nonSeriousNextBtn.disabled = page.page >= page.totalPages;
  els.nonSeriousTableBody.innerHTML = page.items
    .map((summary) => {
      const detail = state.caseDetails.get(summary.id)?.case;
      return `
        <tr>
          <td>${summary.caseNumber}</td>
          <td>${getPatientLabel(detail)}</td>
          <td>${getReactionLabel(detail)}</td>
          <td>${getProductLabel(detail)}</td>
          <td>${getCausality(detail)}</td>
          <td>${detail?.products?.[0]?.actionTaken || (currentLang() === "en" ? "Review" : "Проверка")}</td>
          <td><button class="row-link" data-open-case="${summary.id}">${currentLang() === "en" ? "View" : "Открыть"}</button></td>
        </tr>
      `;
    })
    .join("");
}

function renderSettings() {
  const s = state.settings;
  els.settingsUserName.value = s.userName;
  els.settingsEmail.value = s.email;
  els.settingsRole.value = s.role;
  els.settingsLanguage.value = currentLang();
  els.languageSwitcher.value = currentLang();
  els.notifySerious.checked = s.notifySerious;
  els.notifyValidation.checked = s.notifyValidation;
  els.notifyWeekly.checked = s.notifyWeekly;
  els.userAvatar.textContent = (s.userName || "PV")
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function renderAll() {
  applyTranslations();
  renderSidebar();
  renderDashboard();
  renderReports();
  renderSerious();
  renderNonSerious();
  renderSettings();
}

function openDrawer(caseId, isCreate = false) {
  if (isCreate) {
    state.currentCaseId = null;
    state.currentSummary = { caseNumber: currentLang() === "en" ? "NEW" : "НОВЫЙ", patientId: "", validationState: "Не проверено" };
    state.currentCase = buildEmptyCase();
  } else {
    const detail = state.caseDetails.get(caseId);
    state.currentCaseId = caseId;
    state.currentSummary = detail.summary;
    state.currentCase = deepClone(detail.case);
  }
  hydrateEditorForm();
  setEditorTab("report");
  renderReviewPanel();
  els.editorDrawer.classList.remove("hidden");
  if (isRealtimeVoiceActive()) {
    sendRealtimeContextNote(`Case drawer opened. Current case is ${state.currentCase?.report?.caseNumber || "new"}. Current editor tab is report.`);
  }
}

function closeDrawer() {
  els.editorDrawer.classList.add("hidden");
  if (isRealtimeVoiceActive()) sendRealtimeContextNote("Case drawer closed.");
}

function setEditorTab(tab) {
  state.editorTab = tab;
  for (const button of document.querySelectorAll(".subtab")) {
    button.classList.toggle("active", button.dataset.editorTab === tab);
  }
  for (const panel of document.querySelectorAll(".editor-page")) {
    panel.classList.toggle("active", panel.dataset.editorPanel === tab);
  }
  if (isRealtimeVoiceActive()) sendRealtimeContextNote(`Current editor tab is ${tab}.`);
}

function hydrateEditorForm() {
  els.editorTitle.textContent = `${state.currentCase.report.caseNumber} · ${state.currentCase.report.title}`;
  els.editorMeta.textContent =
    currentLang() === "en"
      ? `Patient: ${state.currentCase.patient.patientId || "Unknown"} • Status: ${statusBadge(state.currentCase.report.validationState || "Не проверено").replace(/<[^>]+>/g, "")}`
      : `Пациент: ${state.currentCase.patient.patientId || "Не указано"} • Статус: ${statusBadge(state.currentCase.report.validationState || "Не проверено").replace(/<[^>]+>/g, "")}`;
  for (const field of els.editorForm.querySelectorAll("[name]")) {
    field.value = getByPath(state.currentCase, field.name) ?? "";
  }
  renderCaseWorkspaceSummary();
}

function renderEditorHeader() {
  if (!state.currentCase) return;
  els.editorTitle.textContent = `${state.currentCase.report.caseNumber} · ${state.currentCase.report.title}`;
  els.editorMeta.textContent =
    currentLang() === "en"
      ? `Patient: ${state.currentCase.patient.patientId || "Unknown"} • Status: ${statusBadge(state.currentCase.report.validationState || "Не проверено").replace(/<[^>]+>/g, "")}`
      : `Пациент: ${state.currentCase.patient.patientId || "Не указано"} • Статус: ${statusBadge(state.currentCase.report.validationState || "Не проверено").replace(/<[^>]+>/g, "")}`;
}

function collectEditorForm() {
  const payload = deepClone(state.currentCase);
  for (const field of els.editorForm.querySelectorAll("[name]")) {
    if (field.disabled) continue;
    let value = field.value;
    if (field.type === "number" && value !== "") value = Number(value);
    byPath(payload, field.name, value);
  }
  return payload;
}

function deriveLiveCaseState(casePayload) {
  const payload = deepClone(casePayload || {});
  const blocking = [];
  const warnings = [];
  const patient = payload.patient || {};
  const report = payload.report || {};
  const events = Array.isArray(payload.events) ? payload.events : [];
  const products = Array.isArray(payload.products) ? payload.products : [];
  const narrative = payload.narrative || {};

  if (!patient.patientId) blocking.push("Не указан идентификатор пациента.");
  if (!report.receivedDate) blocking.push("Не указана дата получения сообщения.");
  if (!events.length || !events[0]?.description) blocking.push("Не описано нежелательное событие.");
  if (events.length && !events[0]?.meddraPt) blocking.push("Не выбран MedDRA Preferred Term.");
  if (!products.length || !products[0]?.name) blocking.push("Не указан препарат.");
  if (products.length && !products[0]?.role) blocking.push("Не указана роль препарата.");
  if (!narrative.summary) blocking.push("Не заполнен нарратив кейса.");

  const eventDate = events[0]?.startDate;
  const drugDate = products[0]?.startDate;
  if (eventDate && drugDate && eventDate < drugDate) warnings.push("Дата события раньше даты начала приема препарата.");
  if (patient.weightKg === "" || patient.weightKg == null) warnings.push("Не указан вес пациента.");
  if (!patient.medicalHistory) warnings.push("Не заполнен анамнез.");

  const totalChecks = 7;
  const passedChecks = totalChecks - blocking.length;
  const completeness = Math.max(0, Math.min(100, Math.round((passedChecks / totalChecks) * 100)));

  payload.review = payload.review || {};
  payload.review.blocking = blocking;
  payload.review.warnings = warnings;
  payload.review.ready = blocking.length === 0;
  payload.review.nextAction = blocking.length === 0
    ? "Кейс готов к сохранению и экспорту."
    : "Исправить блокирующие замечания на вкладках кейса.";
  payload.report = payload.report || {};
  payload.report.completeness = completeness;
  payload.report.validationState = blocking.length === 0 ? "Проверено" : "Требует доработки";
  payload.report.workflowState = payload.report.workflowState || "Черновик";
  return payload;
}

const issueRoutingMap = [
  { match: /идентификатор пациента|id пациента/i, panel: "patient", field: "patient.patientId" },
  { match: /вес пациент|вес/i, panel: "patient", field: "patient.weightKg" },
  { match: /анамнез/i, panel: "patient", field: "patient.medicalHistory" },
  { match: /нежелательное событие|описание события|событие/i, panel: "event", field: "events.0.description" },
  { match: /meddra|preferred term|пт/i, panel: "event", field: "events.0.meddraPt" },
  { match: /препарат/i, panel: "event", field: "products.0.name" },
  { match: /роль препарата|роль/i, panel: "event", field: "products.0.role" },
  { match: /доза/i, panel: "event", field: "products.0.dose" },
  { match: /начало терапии/i, panel: "event", field: "products.0.startDate" },
  { match: /начало события/i, panel: "event", field: "events.0.startDate" },
  { match: /нарратив/i, panel: "narrative", field: "narrative.summary" },
  { match: /комментарий ревьюера/i, panel: "narrative", field: "narrative.reviewerComment" },
];

function appendTimelineEvent(titleRu, detailRu, titleEn = titleRu, detailEn = detailRu) {
  if (!state.currentCase) return;
  if (!Array.isArray(state.currentCase.timeline)) state.currentCase.timeline = [];
  state.currentCase.timeline.unshift({
    time: localNowLabel(),
    title: currentLang() === "en" ? titleEn : titleRu,
    detail: currentLang() === "en" ? detailEn : detailRu,
  });
  state.currentCase.timeline = state.currentCase.timeline.slice(0, 10);
}

function computeSectionReadiness(casePayload) {
  const sections = [
    {
      key: "report",
      label: currentLang() === "en" ? "Report" : "Отчёт",
      required: [
        !!casePayload?.report?.caseNumber,
        !!casePayload?.report?.title,
        !!casePayload?.report?.receivedDate,
        !!casePayload?.report?.reportType,
        !!casePayload?.report?.primarySource,
      ],
    },
    {
      key: "patient",
      label: currentLang() === "en" ? "Patient" : "Пациент",
      required: [
        !!casePayload?.patient?.patientId,
        !!casePayload?.patient?.age,
        !!casePayload?.patient?.weightKg,
        !!casePayload?.patient?.medicalHistory,
      ],
    },
    {
      key: "event",
      label: currentLang() === "en" ? "Event" : "Событие",
      required: [
        !!casePayload?.products?.[0]?.name,
        !!casePayload?.products?.[0]?.role,
        !!casePayload?.events?.[0]?.description,
        !!casePayload?.events?.[0]?.meddraPt,
      ],
    },
    {
      key: "narrative",
      label: currentLang() === "en" ? "Narrative" : "Нарратив",
      required: [!!casePayload?.narrative?.summary],
    },
  ];

  return sections.map((section) => {
    const done = section.required.filter(Boolean).length;
    const total = section.required.length || 1;
    const percent = Math.round((done / total) * 100);
    const tone = percent === 100 ? "ready" : percent >= 50 ? "warning" : "danger";
    return { ...section, done, total, percent, tone };
  });
}

function computeChecklist(casePayload) {
  const items = [];
  if (!casePayload?.patient?.patientId) items.push({ text: currentLang() === "en" ? "Specify patient ID" : "Указать ID пациента", panel: "patient", field: "patient.patientId" });
  if (!casePayload?.patient?.weightKg) items.push({ text: currentLang() === "en" ? "Add patient weight" : "Указать вес пациента", panel: "patient", field: "patient.weightKg" });
  if (!casePayload?.patient?.medicalHistory) items.push({ text: currentLang() === "en" ? "Fill in medical history" : "Заполнить анамнез", panel: "patient", field: "patient.medicalHistory" });
  if (!casePayload?.products?.[0]?.name) items.push({ text: currentLang() === "en" ? "Specify suspect product" : "Указать препарат", panel: "event", field: "products.0.name" });
  if (!casePayload?.products?.[0]?.role) items.push({ text: currentLang() === "en" ? "Select product role" : "Выбрать роль препарата", panel: "event", field: "products.0.role" });
  if (!casePayload?.events?.[0]?.description) items.push({ text: currentLang() === "en" ? "Describe the event" : "Описать событие", panel: "event", field: "events.0.description" });
  if (!casePayload?.events?.[0]?.meddraPt) items.push({ text: currentLang() === "en" ? "Choose MedDRA PT" : "Выбрать MedDRA PT", panel: "event", field: "events.0.meddraPt" });
  if (!casePayload?.narrative?.summary) items.push({ text: currentLang() === "en" ? "Complete case narrative" : "Заполнить нарратив кейса", panel: "narrative", field: "narrative.summary" });
  return items;
}

function getLifecycleStage(casePayload) {
  const review = casePayload?.review || { blocking: [], warnings: [], ready: false };
  if (review.ready) return "ready";
  if (review.blocking?.length || review.warnings?.length) return "review";
  return "draft";
}

function renderCaseWorkspaceSummary() {
  if (!state.currentCase) return;
  const readiness = computeSectionReadiness(state.currentCase);
  const review = state.currentCase.review || { blocking: [], warnings: [], ready: false };
  const checklist = computeChecklist(state.currentCase);
  const lifecycle = getLifecycleStage(state.currentCase);
  const seriousnessText = normalizeUiLabel(state.currentCase.report?.seriousness || "");
  const isSeriousCase = seriousnessText.includes("серь") && !seriousnessText.includes("нес");
  const completion = Math.round(readiness.reduce((sum, item) => sum + item.percent, 0) / Math.max(readiness.length, 1));

  els.drawerPanel.dataset.caseMode = isSeriousCase ? "serious" : "nonserious";
  els.caseModeValue.textContent = isSeriousCase
    ? (currentLang() === "en" ? "Serious case workflow" : "Сценарий serious-case")
    : (currentLang() === "en" ? "Non-serious case workflow" : "Сценарий non-serious");
  els.caseModeHint.textContent = isSeriousCase
    ? (currentLang() === "en"
        ? "Extended validation, higher attention level, and stricter completion requirements."
        : "Расширенная проверка, повышенный приоритет и более строгие требования к заполнению.")
    : (currentLang() === "en"
        ? "Shorter processing route with a reduced set of mandatory actions."
        : "Укороченный маршрут обработки с сокращённым набором обязательных действий.");
  els.workspaceStageLabel.textContent =
    lifecycle === "ready"
      ? (currentLang() === "en" ? "Ready" : "Готово")
      : lifecycle === "review"
        ? (currentLang() === "en" ? "Review" : "Проверка")
        : (currentLang() === "en" ? "Draft" : "Черновик");
  els.workspaceCompletionLabel.textContent = `${completion}%`;
  els.workspaceActionCount.textContent = String(review.blocking.length + review.warnings.length + checklist.length);

  const steps = [
    { key: "draft", label: currentLang() === "en" ? "Draft" : "Черновик" },
    { key: "review", label: currentLang() === "en" ? "Review" : "Проверка" },
    { key: "ready", label: currentLang() === "en" ? "Ready" : "Готово" },
  ];
  const stageIndex = steps.findIndex((step) => step.key === lifecycle);
  els.workspaceStepper.innerHTML = steps
    .map((step, index) => `<div class="step-chip ${index < stageIndex ? "done" : ""} ${step.key === lifecycle ? "active" : ""}">${step.label}</div>`)
    .join("");
  els.sectionReadinessMap.innerHTML = readiness
    .map((item) => `
      <button type="button" class="readiness-card readiness-${item.tone}" data-editor-tab="${item.key}">
        <span>${item.label}</span>
        <strong>${item.percent}%</strong>
        <small>${item.done}/${item.total}</small>
      </button>
    `)
    .join("");
}

function renderTimeline() {
  const items = Array.isArray(state.currentCase?.timeline) ? state.currentCase.timeline : [];
  els.caseTimeline.innerHTML = items.length
    ? items.map((item) => `<li class="timeline-item"><span class="timeline-time">${item.time}</span><strong>${item.title}</strong><p>${item.detail}</p></li>`).join("")
    : `<li class="timeline-item"><strong>${currentLang() === "en" ? "No history yet." : "История пока пуста."}</strong></li>`;
}

function jumpToIssueTarget(text) {
  const route = issueRoutingMap.find((item) => item.match.test(text));
  if (!route) return false;
  setEditorTab(route.panel);
  hydrateEditorForm();
  const field = els.editorForm.querySelector(`[name="${route.field}"]`);
  if (!field) return false;
  field.focus();
  field.classList.add("voice-field-recording");
  setTimeout(() => field.classList.remove("voice-field-recording"), 1400);
  setGlobalVoiceStatus(currentLang() === "en" ? "Jumped to the field that needs attention." : "Переход к полю, требующему внимания, выполнен.");
  return true;
}

function renderReviewPanel() {
  const review = state.currentCase?.review || { blocking: [], warnings: [], ready: false, nextAction: "" };
  els.blockingCount.textContent = String(review.blocking.length);
  els.warningCount.textContent = String(review.warnings.length);
  els.readyState.textContent = review.ready ? localizedYes() : localizedNo();
  els.blockingList.innerHTML = review.blocking.length
    ? review.blocking.map((item) => `<li><button type="button" class="issue-link" data-jump-issue="${item.replace(/"/g, "&quot;")}">${item}</button></li>`).join("")
    : `<li>${currentLang() === "en" ? "No blocking issues." : "Блокирующих замечаний нет."}</li>`;
  els.warningsList.innerHTML = review.warnings.length
    ? review.warnings.map((item) => `<li><button type="button" class="issue-link" data-jump-issue="${item.replace(/"/g, "&quot;")}">${item}</button></li>`).join("")
    : `<li>${currentLang() === "en" ? "No warnings." : "Предупреждений нет."}</li>`;
  const checklist = computeChecklist(state.currentCase);
  els.completionChecklist.innerHTML = checklist.length
    ? checklist.map((item) => `<li><button type="button" class="issue-link" data-jump-field="${item.field}" data-jump-panel="${item.panel}">${item.text}</button></li>`).join("")
    : `<li>${currentLang() === "en" ? "The case is structurally complete." : "Кейс структурно заполнен."}</li>`;
  const field = els.editorForm.querySelector('[name="review.nextAction"]');
  if (field) field.value = review.nextAction || "";
  renderCaseWorkspaceSummary();
  renderTimeline();
}

async function saveCurrentCase() {
  const payload = collectEditorForm();
  payload.timeline = Array.isArray(payload.timeline) ? payload.timeline : [];
  payload.timeline.unshift({
    time: localNowLabel(),
    title: currentLang() === "en" ? "Case saved" : "Кейс сохранён",
    detail: currentLang() === "en" ? "Changes were saved in the case workspace." : "Изменения сохранены в рабочей области случая.",
  });
  const data = state.currentCaseId
    ? await api(`/api/cases/${state.currentCaseId}`, { method: "PUT", body: JSON.stringify({ case: payload }) })
    : await api("/api/cases", { method: "POST", body: JSON.stringify({ case: payload }) });
  state.currentCaseId = data.summary.id;
  state.currentSummary = data.summary;
  state.currentCase = data.case;
  await loadCases();
  openDrawer(data.summary.id);
}

async function validateCurrentCase() {
  await saveCurrentCase();
  const data = await api(`/api/cases/${state.currentCaseId}/validate`, { method: "POST", body: "{}" });
  state.currentSummary = data.summary;
  state.currentCase = data.case;
  appendTimelineEvent(
    "Запущена проверка кейса",
    "Выполнена валидация и сформирован список замечаний.",
    "Case validation started",
    "Validation completed and a review list was generated."
  );
  state.caseDetails.set(data.summary.id, data);
  renderReviewPanel();
  hydrateEditorForm();
  renderAll();
  setEditorTab("review");
}

function syncCurrentCaseFieldFromForm(field) {
  if (!state.currentCase || !field?.name || field.disabled) return;
  let value = field.value;
  if (field.type === "number" && value !== "") value = Number(value);
  byPath(state.currentCase, field.name, value);
  state.currentCase = deriveLiveCaseState(state.currentCase);
  renderEditorHeader();
  renderCaseWorkspaceSummary();
  renderReviewPanel();
}

async function exportCurrentCase() {
  if (!state.currentCaseId) return;
  const response = await fetch(`/api/cases/${state.currentCaseId}/export.xml`);
  const xml = await response.text();
  const blob = new Blob([xml], { type: "application/xml" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${state.currentCase.report.caseNumber}.xml`;
  link.click();
  URL.revokeObjectURL(url);
}

function fillDemoData() {
  const payload = collectEditorForm();
  payload.report.title = currentLang() === "en" ? "Anaphylactic reaction" : "Анафилактическая реакция";
  payload.report.seriousness = "Серьёзный";
  payload.patient.patientId = "P-042";
  payload.patient.initials = "Ivanov I.I.";
  payload.patient.age = 45;
  payload.patient.sex = currentLang() === "en" ? "Male" : "Мужской";
  payload.products[0] = { ...payload.products[0], name: "Препарат A", role: currentLang() === "en" ? "Suspect" : "Подозреваемый", dose: "10 mg", route: currentLang() === "en" ? "Oral" : "Перорально", startDate: "2026-04-26", actionTaken: currentLang() === "en" ? "Stopped" : "Отменён" };
  payload.events[0] = { ...payload.events[0], description: currentLang() === "en" ? "Anaphylactic reaction" : "Анафилактическая реакция", meddraPt: currentLang() === "en" ? "Anaphylactic reaction" : "Анафилактическая реакция", startDate: "2026-04-27", outcome: currentLang() === "en" ? "Hospitalization" : "Госпитализация", serious: localizedYes(), causality: currentLang() === "en" ? "Probable" : "Вероятная" };
  payload.narrative.summary =
    currentLang() === "en"
      ? "The patient developed acute hypersensitivity after taking the suspect product and required urgent observation."
      : "У пациента развилась острая реакция гиперчувствительности после приёма подозреваемого препарата, что потребовало срочного наблюдения.";
  payload.review.nextAction =
    currentLang() === "en"
      ? "Complete medical review and confirm seriousness criterion."
      : "Завершить медицинскую проверку и подтвердить критерий серьёзности.";
  payload.timeline = Array.isArray(payload.timeline) ? payload.timeline : [];
  payload.timeline.unshift({
    time: localNowLabel(),
    title: currentLang() === "en" ? "Demo data inserted" : "Вставлены демонстрационные данные",
    detail: currentLang() === "en" ? "The case was filled with a severe example to test the workflow." : "Кейс заполнен демонстрационным серьёзным сценарием для проверки маршрута.",
  });
  state.currentCase = payload;
  hydrateEditorForm();
  renderReviewPanel();
}

function loadSettings() {
  const raw = localStorage.getItem("e2bmaster-settings");
  if (!raw) return;
  try {
    state.settings = { ...state.settings, ...JSON.parse(raw) };
    state.settings.language = normalizeLanguage(state.settings.language);
  } catch (_error) {
    // ignore
  }
}

function saveSettings() {
  state.settings = {
    userName: els.settingsUserName.value.trim(),
    email: els.settingsEmail.value.trim(),
    role: els.settingsRole.value.trim(),
    language: normalizeLanguage(els.settingsLanguage.value),
    notifySerious: els.notifySerious.checked,
    notifyValidation: els.notifyValidation.checked,
    notifyWeekly: els.notifyWeekly.checked,
  };
  localStorage.setItem("e2bmaster-settings", JSON.stringify(state.settings));
  renderAll();
  setPage(state.page);
  if (state.voiceControlEnabled) {
    stopCommandRecognition({ preserveEnabledState: false, keepButtonActive: false, keepStatus: true });
    startCommandRecognition();
  }
  setVoiceStatus(
    supportsLocalVoice()
      ? currentLang() === "en"
        ? "Voice input is ready for event description, MedDRA PT and narrative."
        : "Голосовой ввод готов для описания события, MedDRA PT и нарратива."
      : currentLang() === "en"
        ? "This browser does not support voice input. Use Chrome or Edge."
        : "Этот браузер не поддерживает голосовой ввод. Используйте Chrome или Edge."
  );
  alert(currentLang() === "en" ? "Settings saved." : "Настройки сохранены.");
}

function savePassword() {
  const current = els.currentPassword.value;
  const next = els.newPassword.value.trim();
  const confirm = els.confirmPassword.value.trim();
  const stored = localStorage.getItem("e2bmaster-password") || "demo";

  if (current !== stored) {
    els.passwordHelp.textContent = currentLang() === "en" ? "Current password is incorrect." : "Текущий пароль указан неверно.";
    return;
  }
  if (next.length < 4) {
    els.passwordHelp.textContent = currentLang() === "en" ? "New password must be at least 4 characters long." : "Новый пароль должен содержать не менее 4 символов.";
    return;
  }
  if (next !== confirm) {
    els.passwordHelp.textContent = currentLang() === "en" ? "Password confirmation does not match." : "Подтверждение пароля не совпадает.";
    return;
  }

  localStorage.setItem("e2bmaster-password", next);
  els.passwordHelp.textContent = currentLang() === "en" ? "Password updated in local demo mode." : "Пароль обновлён в локальном демонстрационном режиме.";
  els.passwordForm.reset();
  setTimeout(() => els.passwordDialog.close(), 500);
}

function setVoiceStatus(message) {
  els.voiceStatus.textContent = message;
}

function setGlobalVoiceStatus(message) {
  els.globalVoiceStatus.textContent = message;
}

function supportsLocalVoice() {
  return Boolean(navigator.mediaDevices?.getUserMedia && AudioContextCtor);
}

function stopActiveRecognition() {
  if (activeRecognition?.stop) activeRecognition.stop();
}

function resetActiveFieldDictationUi(expectedField = null, expectedButton = null) {
  if (expectedButton && activeVoiceButton && activeVoiceButton !== expectedButton) return;
  if (expectedField && activeVoiceField && activeVoiceField !== expectedField) return;
  if (activeVoiceButton) activeVoiceButton.classList.remove("recording");
  if (activeVoiceField) activeVoiceField.classList.remove("voice-field-recording");
  activeVoiceButton = null;
  activeVoiceField = null;
}

function stopCommandRecognition({ preserveEnabledState = false, keepButtonActive = false, keepStatus = false } = {}) {
  if (isRealtimeVoiceActive()) {
    void stopRealtimeVoiceSession({ silent: keepStatus });
    if (!preserveEnabledState) state.voiceControlEnabled = false;
    if (!keepButtonActive) els.voiceControlBtn.classList.remove("recording");
    if (!keepStatus) setGlobalVoiceStatus(t("voice.modeOff"));
    return;
  }
  if (commandRecognitionRestartTimer) {
    clearTimeout(commandRecognitionRestartTimer);
    commandRecognitionRestartTimer = null;
  }
  if (commandRecognition) {
    if (typeof commandRecognition.stop === "function") {
      commandRecognition.stop();
    }
    commandRecognition = null;
  }
  if (!preserveEnabledState) {
    state.voiceControlEnabled = false;
  }
  if (!keepButtonActive) {
    els.voiceControlBtn.classList.remove("recording");
  }
  if (!keepStatus) {
    setGlobalVoiceStatus(t("voice.modeOff"));
  }
}

function scheduleCommandRecognitionRestart(recognition) {
  if (!state.voiceControlEnabled) return;
  if (isRealtimeVoiceActive()) {
    void startRealtimeVoiceSession({ restart: true });
    return;
  }
  if (commandRecognitionRestartTimer) clearTimeout(commandRecognitionRestartTimer);
  commandRecognitionRestartTimer = setTimeout(() => {
    if (!state.voiceControlEnabled || commandRecognition !== recognition) return;
    setGlobalVoiceStatus(
      currentLang() === "en"
        ? "Voice control connection restored. Continue speaking."
        : "Соединение голосового управления восстановлено. Можно продолжать говорить."
    );
    startCommandRecognition();
  }, 650);
}

function mergeFloat32Chunks(chunks) {
  const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const merged = new Float32Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.length;
  }
  return merged;
}

function downsampleFloat32(buffer, inputSampleRate, outputSampleRate = 16000) {
  if (outputSampleRate >= inputSampleRate) return buffer;
  const ratio = inputSampleRate / outputSampleRate;
  const newLength = Math.round(buffer.length / ratio);
  const result = new Float32Array(newLength);
  let offsetResult = 0;
  let offsetBuffer = 0;
  while (offsetResult < result.length) {
    const nextOffsetBuffer = Math.round((offsetResult + 1) * ratio);
    let accum = 0;
    let count = 0;
    for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i += 1) {
      accum += buffer[i];
      count += 1;
    }
    result[offsetResult] = count ? accum / count : 0;
    offsetResult += 1;
    offsetBuffer = nextOffsetBuffer;
  }
  return result;
}

function float32To16BitPCMBytes(floatBuffer) {
  const bytes = new Uint8Array(floatBuffer.length * 2);
  const view = new DataView(bytes.buffer);
  for (let i = 0; i < floatBuffer.length; i += 1) {
    const sample = Math.max(-1, Math.min(1, floatBuffer[i]));
    view.setInt16(i * 2, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
  }
  return bytes;
}

function uint8ToBase64(bytes) {
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const slice = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...slice);
  }
  return btoa(binary);
}

async function transcribeLocalSpeech(floatChunks, inputSampleRate) {
  const merged = mergeFloat32Chunks(floatChunks);
  const downsampled = downsampleFloat32(merged, inputSampleRate, 16000);
  const pcmBytes = float32To16BitPCMBytes(downsampled);
  const response = await api("/api/stt/transcribe", {
    method: "POST",
    body: JSON.stringify({
      audioBase64: uint8ToBase64(pcmBytes),
      sampleRate: 16000,
    }),
  });
  lastVoiceSttResult = response || null;
  return (response.text || "").trim();
}

async function captureSpeechToText({ mode = "command", maxDurationMs = 9000, silenceDurationMs = 1400 } = {}) {
  if (!supportsLocalVoice()) {
    throw new Error(currentLang() === "en" ? "Local voice input is not supported in this browser." : "Локальный голосовой ввод не поддерживается в этом браузере.");
  }

  const stream = await navigator.mediaDevices.getUserMedia({
    audio: { channelCount: 1, noiseSuppression: true, echoCancellation: true },
  });
  const audioContext = new AudioContextCtor();
  if (audioContext.state === "suspended") {
    try {
      await audioContext.resume();
    } catch (_error) {
      // Some browsers resume automatically after the first callback. Keep going.
    }
  }
  const source = audioContext.createMediaStreamSource(stream);
  const processor = audioContext.createScriptProcessor(4096, 1, 1);
  const gain = audioContext.createGain();
  gain.gain.value = 0;

  const chunks = [];
  let finished = false;
  let speechDetected = false;
  let lastSpeechAt = performance.now();
  const startedAt = performance.now();
  let resolvePromise;
  let rejectPromise;

  const cleanup = async () => {
    try { processor.disconnect(); } catch (_error) { /* ignore */ }
    try { source.disconnect(); } catch (_error) { /* ignore */ }
    try { gain.disconnect(); } catch (_error) { /* ignore */ }
    for (const track of stream.getTracks()) track.stop();
    try { await audioContext.close(); } catch (_error) { /* ignore */ }
  };

  const finalize = async (abort = false) => {
    if (finished) return;
    finished = true;
    activeRecognition = null;
    await cleanup();
    if (abort) {
      resolvePromise("");
      return;
    }
    if (!chunks.length) {
      resolvePromise("");
      return;
    }
    try {
      const transcript = await transcribeLocalSpeech(chunks, audioContext.sampleRate);
      resolvePromise(transcript);
    } catch (error) {
      rejectPromise(error);
    }
  };

  const promise = new Promise((resolve, reject) => {
    resolvePromise = resolve;
    rejectPromise = reject;
  });

  activeRecognition = { stop: () => { void finalize(true); }, mode };

  processor.onaudioprocess = (event) => {
    if (finished) return;
    const input = new Float32Array(event.inputBuffer.getChannelData(0));
    chunks.push(input);
    let sumSquares = 0;
    for (let i = 0; i < input.length; i += 1) sumSquares += input[i] * input[i];
    const rms = Math.sqrt(sumSquares / input.length);
    const now = performance.now();
    if (rms > 0.003) {
      speechDetected = true;
      lastSpeechAt = now;
    }
    if ((speechDetected && now - lastSpeechAt > silenceDurationMs) || now - startedAt > maxDurationMs) {
      void finalize(false);
    }
  };

  source.connect(processor);
  processor.connect(gain);
  gain.connect(audioContext.destination);

  return promise;
}

function navigateToPageByVoice(page) {
  setPage(page);
  renderAll();
}

function syncSearchAndRender(query, source = "global") {
  state.search = query.trim();
  state.reportsPage = 1;
  state.nonSeriousPage = 1;
  els.globalSearch.value = state.search;
  els.reportsSearch.value = state.search;
  if (source === "reports") {
    setPage("reports");
  }
  renderReports();
  renderSerious();
  renderNonSerious();
}

function setStatusFilterByVoice(value) {
  const normalized = normalizeUiLabel(value);
  let filter = null;
  if (!normalized || normalized.includes("все") || normalized.includes("all")) filter = "all";
  else if (normalized.includes("провер")) filter = "Проверено";
  else if (normalized.includes("доработ")) filter = "Требует доработки";
  else if (normalized.includes("чернов") || normalized.includes("не провер")) filter = "Не проверено";

  if (!filter) {
    setGlobalVoiceStatus(currentLang() === "en" ? `Unknown status filter: ${value}.` : `Неизвестный фильтр статуса: ${value}.`);
    return false;
  }

  state.statusFilter = filter;
  els.statusFilter.value = filter;
  state.reportsPage = 1;
  state.nonSeriousPage = 1;
  setPage("reports");
  renderReports();
  renderSerious();
  renderNonSerious();
  setGlobalVoiceStatus(
    currentLang() === "en"
      ? `Status filter applied: ${els.statusFilter.options[els.statusFilter.selectedIndex].textContent}.`
      : `Применён фильтр статуса: ${els.statusFilter.options[els.statusFilter.selectedIndex].textContent}.`
  );
  return true;
}

function getVisibleButtons() {
  return [...document.querySelectorAll("button")]
    .filter((button) => !button.disabled && button.getClientRects().length > 0)
    .map((button) => ({
      button,
      label: normalizeUiLabel(button.textContent),
    }))
    .filter((item) => item.label);
}

function clickVisibleButtonByLabel(label, index = 1) {
  const normalizedLabel = normalizeUiLabel(label);
  if (!normalizedLabel) return false;
  const matches = getVisibleButtons().filter((item) => item.label === normalizedLabel || item.label.includes(normalizedLabel));
  if (!matches.length) {
    setGlobalVoiceStatus(
      currentLang() === "en"
        ? `Visible button not found: ${label}.`
        : `Не найдена видимая кнопка: ${label}.`
    );
    return false;
  }
  const safeIndex = Math.max(1, index);
  const target = matches[safeIndex - 1] || matches[0];
  target.button.click();
  setGlobalVoiceStatus(
    currentLang() === "en"
      ? `Pressed button: ${target.button.textContent.trim()}.`
      : `Нажата кнопка: ${target.button.textContent.trim()}.`
  );
  return true;
}

function openCaseByCaseNumber(caseNumber) {
  const normalizedNeedle = normalizeUiLabel(caseNumber);
  const match = getFilteredCases().find((summary) => normalizeUiLabel(summary.caseNumber) === normalizedNeedle);
  if (!match) {
    setGlobalVoiceStatus(currentLang() === "en" ? `Case ${caseNumber} not found.` : `Случай ${caseNumber} не найден.`);
    return false;
  }
  openDrawer(match.id);
  setGlobalVoiceStatus(
    currentLang() === "en"
      ? `Opened case ${match.caseNumber}.`
      : `Открыт случай ${match.caseNumber}.`
  );
  return true;
}

function openCaseByDate(dateText) {
  const normalizedDate = dateText.trim().replace(/\./g, "-").replace(/\//g, "-");
  const matches = getFilteredCases().filter((summary) => String(summary.updatedAt || "").slice(0, 10) === normalizedDate);
  if (!matches.length) {
    setGlobalVoiceStatus(currentLang() === "en" ? `No cases found for date ${dateText}.` : `Случаи на дату ${dateText} не найдены.`);
    return false;
  }
  openDrawer(matches[0].id);
  setGlobalVoiceStatus(
    currentLang() === "en"
      ? `Opened ${matches[0].caseNumber} for date ${normalizedDate}. Matches found: ${matches.length}.`
      : `Открыт ${matches[0].caseNumber} на дату ${normalizedDate}. Найдено совпадений: ${matches.length}.`
  );
  return true;
}

function levenshteinDistance(a, b) {
  const left = normalizeUiLabel(a);
  const right = normalizeUiLabel(b);
  const dp = Array.from({ length: left.length + 1 }, () => Array(right.length + 1).fill(0));
  for (let i = 0; i <= left.length; i += 1) dp[i][0] = i;
  for (let j = 0; j <= right.length; j += 1) dp[0][j] = j;
  for (let i = 1; i <= left.length; i += 1) {
    for (let j = 1; j <= right.length; j += 1) {
      const cost = left[i - 1] === right[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[left.length][right.length];
}

function similarityScore(a, b) {
  const left = normalizeUiLabel(a);
  const right = normalizeUiLabel(b);
  if (!left || !right) return 0;
  if (left === right) return 1;
  if (left.includes(right) || right.includes(left)) return 0.92;
  const distance = levenshteinDistance(left, right);
  return 1 - distance / Math.max(left.length, right.length, 1);
}

function tokenizeUiLabel(value) {
  return normalizeUiLabel(value)
    .split(" ")
    .map((token) => token.trim())
    .filter(Boolean);
}

function semanticSimilarityScore(input, candidate) {
  const left = tokenizeUiLabel(input);
  const right = tokenizeUiLabel(candidate);
  if (!left.length || !right.length) return 0;
  const overlap = right.filter((token) => left.includes(token)).length;
  const overlapScore = overlap / right.length;
  const orderedPhrase = right.join(" ");
  const inputPhrase = left.join(" ");
  if (inputPhrase === orderedPhrase) return 1;
  if (inputPhrase.includes(orderedPhrase) || orderedPhrase.includes(inputPhrase)) {
    return Math.max(0.9, overlapScore);
  }
  const fuzzyScore = similarityScore(inputPhrase, orderedPhrase);
  return Math.max(fuzzyScore, overlapScore * 0.9);
}

function stripVoiceCommandPrefix(value) {
  return normalizeUiLabel(value).replace(
    /^(пожалуйста\s+)?(введи|внести|впиши|заполни|укажи|поставь|измени|обнови|выбери|открой|перейди(?:\s+к)?|покажи|найди|поищи|нажми)\s+/u,
    ""
  );
}

function fuzzyFindBestOption(input, options) {
  const normalizedInput = normalizeUiLabel(input);
  if (!normalizedInput) return null;
  let best = null;
  for (const option of options) {
    for (const alias of option.aliases) {
      const score = semanticSimilarityScore(normalizedInput, alias);
      if (!best || score > best.score) {
        best = { option, alias, score };
      }
    }
  }
  return best && best.score >= 0.5 ? best.option : null;
}

function fuzzyClickVisibleButton(input) {
  const buttons = getVisibleButtons();
  const scored = buttons
    .map((item) => ({ ...item, score: semanticSimilarityScore(input, item.label) }))
    .sort((a, b) => b.score - a.score);
  const best = scored[0];
  if (!best || best.score < 0.54) return false;
  best.button.click();
  setGlobalVoiceStatus(
    currentLang() === "en"
      ? `Pressed button: ${best.button.textContent.trim()}.`
      : `Нажата кнопка: ${best.button.textContent.trim()}.`
  );
  return true;
}

function parseDateFromTranscript(transcript) {
  const isoMatch = transcript.match(/\b(\d{4}-\d{2}-\d{2})\b/);
  if (isoMatch) return isoMatch[1];
  const ruMatch = transcript.match(/\b(\d{2})[./-](\d{2})[./-](\d{4})\b/);
  if (ruMatch) return `${ruMatch[3]}-${ruMatch[2]}-${ruMatch[1]}`;
  return "";
}

function normalizeFieldVoiceValue(field, value) {
  const trimmed = String(value || "").trim();
  if (!trimmed) return "";
  if (field?.type === "date") {
    return parseDateFromTranscript(trimmed) || trimmed;
  }
  return trimmed;
}

function parseCaseNumberFromTranscript(transcript) {
  const match = normalizeUiLabel(transcript).match(/\b(?:ru[\s-]*)?(?:e2b[\s-]*)?\d{4}[\s-]*\d{3,5}\b/);
  if (!match) return "";
  return match[0].toUpperCase().replace(/\s+/g, "-").replace(/^RU-?/, "RU-");
}

function interpretVoiceIntent(transcript) {
  const normalized = normalizeUiLabel(transcript);

  const directFieldIntent = extractFieldIntent(transcript);
  if (directFieldIntent) {
    return { type: "fieldEntry", definition: directFieldIntent.definition, value: directFieldIntent.value };
  }

  const settingsFieldIntent = extractSettingsFieldIntent(transcript);
  if (settingsFieldIntent) {
    return { type: "settingsFieldEntry", definition: settingsFieldIntent.definition, value: settingsFieldIntent.value };
  }

  const fieldFocusIntent = resolveFieldFocusIntent(transcript);
  if (fieldFocusIntent) {
    return { type: "fieldFocus", definition: fieldFocusIntent };
  }

  const settingsFieldFocusIntent = resolveSettingsFieldFocusIntent(transcript);
  if (settingsFieldFocusIntent) {
    return { type: "settingsFieldFocus", definition: settingsFieldFocusIntent };
  }

  const settingsToggleIntent = resolveSettingsToggleIntent(transcript);
  if (settingsToggleIntent) {
    return { type: "settingsToggle", definition: settingsToggleIntent.definition, explicitValue: settingsToggleIntent.explicitValue };
  }

  const editorTabIntent = resolveEditorTabIntent(transcript);
  if (editorTabIntent) {
    return { type: "editorTab", value: editorTabIntent };
  }

  const statusOption = fuzzyFindBestOption(normalized, [
    { value: "all", aliases: ["все статусы", "все случаи", "all statuses", "all status", "любой статус"] },
    { value: "Проверено", aliases: ["проверено", "проверенные", "проведенные", "validated", "готовые", "готово"] },
    { value: "Требует доработки", aliases: ["требует доработки", "доработка", "ошибки", "needs review", "review"] },
    { value: "Не проверено", aliases: ["черновик", "не проверено", "draft", "новые"] },
  ]);
  if ((normalized.includes("статус") || normalized.includes("кейсы") || normalized.includes("случаи")) && statusOption) {
    return { type: "statusFilter", value: statusOption.value };
  }

  if ((normalized.includes("покажи") || normalized.includes("только") || normalized.includes("фильтр")) && statusOption) {
    return { type: "statusFilter", value: statusOption.value };
  }

  const caseNumber = parseCaseNumberFromTranscript(transcript);
  if ((normalized.includes("открой") || normalized.includes("найди") || normalized.includes("open")) && caseNumber) {
    return { type: "openCaseNumber", value: caseNumber };
  }

  const dateValue = parseDateFromTranscript(transcript);
  if ((normalized.includes("дата") || normalized.includes("по дате") || normalized.includes("date")) && dateValue) {
    return { type: "openDate", value: dateValue };
  }

  if ((normalized.includes("открой") || normalized.includes("open")) && (normalized.includes("отчет") || normalized.includes("отчёт") || normalized.includes("случай") || normalized.includes("кейс"))) {
    return { type: "openFirstVisibleCase" };
  }

  if ((normalized.includes("найди") || normalized.includes("поищи") || normalized.includes("search") || normalized.includes("show")) && (normalized.includes("случай") || normalized.includes("кейс") || normalized.includes("отчет") || normalized.includes("отчёт"))) {
    const query = transcript
      .replace(/^(покажи|найди|поищи|show|find|search)\s+/i, "")
      .replace(/\b(случай|случаи|кейс|кейсы|отчет|отчёт|отчеты|отчёты)\b/gi, "")
      .trim();
    return { type: query ? "reportsSearch" : "reportsPage", value: query };
  }

  const globalSearchRequested =
    normalized.includes("поиск по базе безопасности") ||
    normalized.includes("поиск по базе данных") ||
    normalized.includes("search database") ||
    normalized.includes("search safety");
  if (globalSearchRequested) {
    const query = transcript
      .replace(/^(поиск по базе безопасности|поиск по базе данных|search database|search safety database)\s*/i, "")
      .trim();
    return { type: "globalSearch", value: query };
  }

  const buttonIntentText = transcript
    .replace(/^(нажми|кнопка|клик|выбери кнопку|press|click|button)\s+/i, "")
    .trim();
  if (buttonIntentText && fuzzyClickVisibleButton(buttonIntentText)) {
    return { type: "handled" };
  }

  const navOption = fuzzyFindBestOption(normalized, [
    { value: "dashboard", aliases: ["панель мониторинга", "панель", "dashboard", "главная"] },
    { value: "reports", aliases: ["отчеты", "отчёты", "реестр icsr", "reports"] },
    { value: "serious", aliases: ["серьезные случаи", "серьёзные случаи", "serious cases"] },
    { value: "nonserious", aliases: ["несерьезные случаи", "несерьёзные случаи", "non serious cases", "nonserious"] },
    { value: "settings", aliases: ["настройки", "settings", "профиль"] },
  ]);
  if ((normalized.includes("открой") || normalized.includes("перейди") || normalized.includes("покажи") || normalized.includes("go to")) && navOption) {
    return { type: "page", value: navOption.value };
  }

  return null;
}

function executeVoiceIntent(intent) {
  if (!intent) return false;
  if (intent.type === "handled") return true;
  if (intent.type === "language") {
    els.languageSwitcher.value = intent.value;
    els.languageSwitcher.dispatchEvent(new Event("change", { bubbles: true }));
    return true;
  }
  if (intent.type === "globalSearchFocus") {
    startVoiceInputForField(els.globalSearch);
    return true;
  }
  if (intent.type === "reportsSearchFocus") {
    if (state.page !== "reports") navigateToPageByVoice("reports");
    startVoiceInputForField(els.reportsSearch);
    return true;
  }
  if (intent.type === "action") {
    switch (intent.name) {
      case "create_report":
        openDrawer(null, true);
        setGlobalVoiceStatus(currentLang() === "en" ? "New report form opened." : "Открыта форма нового отчёта.");
        return true;
      case "import_xml":
        els.importXmlBtn.click();
        return true;
      case "export_xml":
        saveCurrentCase()
          .then(exportCurrentCase)
          .then(() => setGlobalVoiceStatus(currentLang() === "en" ? "XML exported." : "XML экспортирован."))
          .catch((error) => setGlobalVoiceStatus(error.message));
        return true;
      case "validate_case":
        validateCurrentCase()
          .then(() => setGlobalVoiceStatus(currentLang() === "en" ? "Case validated." : "Случай проверен."))
          .catch((error) => setGlobalVoiceStatus(error.message));
        return true;
      case "close_case":
        closeDrawer();
        setGlobalVoiceStatus(currentLang() === "en" ? "Case workspace closed." : "Рабочая область случая закрыта.");
        return true;
      case "save_case":
        saveCurrentCase()
          .then(() => setGlobalVoiceStatus(currentLang() === "en" ? "Case saved." : "Случай сохранён."))
          .catch((error) => setGlobalVoiceStatus(error.message));
        return true;
      case "fill_demo":
        fillDemoData();
        setGlobalVoiceStatus(currentLang() === "en" ? "Demo data inserted." : "Демонстрационные данные заполнены.");
        return true;
      case "save_settings":
        saveSettings();
        return true;
      case "change_password":
        if (state.page !== "settings") navigateToPageByVoice("settings");
        els.changePasswordBtn.click();
        return true;
      case "voice_mode":
        toggleVoiceControlMode();
        return true;
      default:
        return false;
    }
  }
  if (intent.type === "fieldFocus") {
    return focusCaseFieldByDefinition(intent.definition);
  }
  if (intent.type === "settingsFieldFocus") {
    return focusSettingsFieldByDefinition(intent.definition);
  }
  if (intent.type === "fieldEntry") {
    return setCaseFieldByVoiceDefinition(intent.definition, intent.value);
  }
  if (intent.type === "settingsFieldEntry") {
    return setSettingsFieldByDefinition(intent.definition, intent.value);
  }
  if (intent.type === "settingsToggle") {
    return toggleSettingsOption(intent.definition, intent.explicitValue);
  }
  if (intent.type === "editorTab") {
    setEditorTab(intent.value);
    setGlobalVoiceStatus(
      currentLang() === "en"
        ? "Editor tab switched."
        : "Вкладка редактора переключена."
    );
    return true;
  }
  if (intent.type === "statusFilter") return setStatusFilterByVoice(intent.value);
  if (intent.type === "openCaseNumber") return openCaseByCaseNumber(intent.value);
  if (intent.type === "openDate") return openCaseByDate(intent.value);
  if (intent.type === "reportsPage") {
    setPage("reports");
    setGlobalVoiceStatus(currentLang() === "en" ? "Reports page opened. You can now specify Case ID, status or date." : "Страница отчётов открыта. Теперь можно назвать Case ID, статус или дату.");
    return true;
  }
  if (intent.type === "reportsSearch") {
    syncSearchAndRender(intent.value, "reports");
    setGlobalVoiceStatus(currentLang() === "en" ? `Search applied: ${intent.value}.` : `Поиск применён: ${intent.value}.`);
    return true;
  }
  if (intent.type === "globalSearch") {
    syncSearchAndRender(intent.value, "global");
    setGlobalVoiceStatus(currentLang() === "en" ? `Global search applied: ${intent.value || "all records"}.` : `Глобальный поиск применён: ${intent.value || "все записи"}.`);
    return true;
  }
  if (intent.type === "page") {
    navigateToPageByVoice(intent.value);
    return true;
  }
  if (intent.type === "openFirstVisibleCase") {
    return openCaseByIndex(0) ?? true;
  }
  return false;
}

function buildRealtimeTools() {
  const caseFieldValues = [...new Set(voiceFieldDefinitions.map((item) => item.field))];
  const settingsFieldValues = settingsFieldDefinitions.map((item) => item.element);
  const settingsToggleValues = settingsToggleDefinitions.map((item) => item.element);
  return [
    {
      type: "function",
      name: "navigate_page",
      description: "Open one of the main pages of the site.",
      parameters: {
        type: "object",
        properties: {
          page: {
            type: "string",
            enum: ["dashboard", "reports", "serious", "nonserious", "settings"],
            description: "Main page to open.",
          },
        },
        required: ["page"],
      },
    },
    {
      type: "function",
      name: "open_case",
      description: "Open a case by Case ID, by visible row number, or the first matching visible case.",
      parameters: {
        type: "object",
        properties: {
          caseNumber: { type: "string", description: "Case identifier like RU-2026-0421." },
          rowIndex: { type: "integer", description: "1-based visible row number on the current list page." },
          date: { type: "string", description: "Date in YYYY-MM-DD format." },
        },
      },
    },
    {
      type: "function",
      name: "set_editor_tab",
      description: "Switch the currently open case drawer to a specific tab.",
      parameters: {
        type: "object",
        properties: {
          tab: { type: "string", enum: ["report", "patient", "event", "narrative", "review"] },
        },
        required: ["tab"],
      },
    },
    {
      type: "function",
      name: "focus_case_field",
      description: "Focus a field in the current case. Use this when the user refers to a field without giving a value yet.",
      parameters: {
        type: "object",
        properties: {
          field: { type: "string", enum: caseFieldValues },
        },
        required: ["field"],
      },
    },
    {
      type: "function",
      name: "set_case_field",
      description: "Set a value in a field of the current case.",
      parameters: {
        type: "object",
        properties: {
          field: { type: "string", enum: caseFieldValues },
          value: { type: "string", description: "Value to put into the field." },
        },
        required: ["field", "value"],
      },
    },
    {
      type: "function",
      name: "set_global_search",
      description: "Apply the main search across the safety database.",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string" },
        },
        required: ["query"],
      },
    },
    {
      type: "function",
      name: "set_reports_search",
      description: "Apply the search inside the Reports registry.",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string" },
        },
        required: ["query"],
      },
    },
    {
      type: "function",
      name: "set_status_filter",
      description: "Change the reports status filter.",
      parameters: {
        type: "object",
        properties: {
          status: { type: "string", enum: ["all", "Проверено", "Требует доработки", "Не проверено"] },
        },
        required: ["status"],
      },
    },
    {
      type: "function",
      name: "trigger_action",
      description: "Press a high-level action button in the interface.",
      parameters: {
        type: "object",
        properties: {
          action: {
            type: "string",
            enum: ["create_report", "import_xml", "export_xml", "validate_case", "close_case", "save_case", "fill_demo", "save_settings", "change_password", "language_ru", "language_en"],
          },
        },
        required: ["action"],
      },
    },
    {
      type: "function",
      name: "set_settings_field",
      description: "Change a text or select field on the Settings page.",
      parameters: {
        type: "object",
        properties: {
          field: { type: "string", enum: settingsFieldValues },
          value: { type: "string" },
        },
        required: ["field", "value"],
      },
    },
    {
      type: "function",
      name: "toggle_settings_option",
      description: "Toggle a checkbox option on the Settings page.",
      parameters: {
        type: "object",
        properties: {
          field: { type: "string", enum: settingsToggleValues },
          enabled: { type: "boolean" },
        },
        required: ["field", "enabled"],
      },
    },
  ];
}

function ensureRealtimeAudioElement() {
  if (!realtimeVoice.audioElement) {
    realtimeVoice.audioElement = document.createElement("audio");
    realtimeVoice.audioElement.autoplay = true;
    realtimeVoice.audioElement.style.display = "none";
    document.body.appendChild(realtimeVoice.audioElement);
  }
  return realtimeVoice.audioElement;
}

function findVoiceDefinitionByField(field) {
  return voiceFieldDefinitions.find((item) => item.field === field) || null;
}

function findSettingsFieldByElement(element) {
  return settingsFieldDefinitions.find((item) => item.element === element) || null;
}

function sendRealtimeEvent(event) {
  if (!realtimeVoice.dc || realtimeVoice.dc.readyState !== "open") return false;
  realtimeVoice.dc.send(JSON.stringify(event));
  return true;
}

function sendRealtimeContextNote(text) {
  if (!text) return;
  sendRealtimeEvent({
    type: "conversation.item.create",
    item: {
      type: "message",
      role: "user",
      content: [{ type: "input_text", text }],
    },
  });
}

function syncRealtimeFocusContext(target) {
  if (!isRealtimeVoiceActive()) return;
  if (!target) return;
  if (target.kind === "caseField" && realtimeVoice.lastFocusedField !== target.name) {
    realtimeVoice.lastFocusedField = target.name;
    const definition = findVoiceDefinitionByField(target.name);
    const panel = definition?.panel || state.editorTab;
    sendRealtimeContextNote(`Focused case field is ${target.name} on tab ${panel}. If the user now says only a value, apply it to this field.`);
    return;
  }
  if (target.kind === "settingsField" && realtimeVoice.lastFocusedSettingsField !== target.name) {
    realtimeVoice.lastFocusedSettingsField = target.name;
    sendRealtimeContextNote(`Focused settings field is ${target.name}. If the user now says only a value, apply it to this field.`);
  }
}

function applyRealtimeCaseField(field, value) {
  const definition = findVoiceDefinitionByField(field);
  if (!definition) return false;
  if (definition.panel && state.editorTab !== definition.panel) {
    setEditorTab(definition.panel);
    hydrateEditorForm();
  }
  const target = els.editorForm.querySelector(`[name="${field}"]`);
  if (!target) return false;
  target.focus();
  target.value = value;
  if (state.currentCase) byPath(state.currentCase, field, value);
  target.dispatchEvent(new Event("input", { bubbles: true }));
  target.dispatchEvent(new Event("change", { bubbles: true }));
  syncRealtimeFocusContext({ kind: "caseField", name: field });
  return true;
}

function focusRealtimeCaseField(field) {
  const definition = findVoiceDefinitionByField(field);
  if (!definition) return false;
  if (definition.panel && state.editorTab !== definition.panel) {
    setEditorTab(definition.panel);
    hydrateEditorForm();
  }
  const target = els.editorForm.querySelector(`[name="${field}"]`);
  if (!target) return false;
  target.focus();
  syncRealtimeFocusContext({ kind: "caseField", name: field });
  setGlobalVoiceStatus(currentLang() === "en" ? `Focused field: ${field}.` : `Выбрано поле: ${field}.`);
  return true;
}

function applyRealtimeSettingsField(field, value) {
  const definition = findSettingsFieldByElement(field);
  if (!definition) return false;
  if (state.page !== "settings") navigateToPageByVoice("settings");
  const target = els[field];
  if (!target) return false;
  target.focus();
  if (target.tagName === "SELECT") {
    target.value = normalizeLanguage(value.toLowerCase().includes("англ") || value.toLowerCase().includes("english") ? "en" : "ru");
  } else {
    target.value = value;
  }
  target.dispatchEvent(new Event("input", { bubbles: true }));
  target.dispatchEvent(new Event("change", { bubbles: true }));
  syncRealtimeFocusContext({ kind: "settingsField", name: field });
  return true;
}

function toggleRealtimeSettingsOption(field, enabled) {
  if (state.page !== "settings") navigateToPageByVoice("settings");
  const target = els[field];
  if (!target) return false;
  target.checked = Boolean(enabled);
  target.dispatchEvent(new Event("change", { bubbles: true }));
  return true;
}

function triggerRealtimeAction(action) {
  switch (action) {
    case "create_report":
      openDrawer(null, true);
      return true;
    case "import_xml":
      els.importXmlBtn.click();
      return true;
    case "export_xml":
      void saveCurrentCase().then(exportCurrentCase);
      return true;
    case "validate_case":
      void validateCurrentCase();
      return true;
    case "close_case":
      closeDrawer();
      return true;
    case "save_case":
      void saveCurrentCase();
      return true;
    case "fill_demo":
      fillDemoData();
      return true;
    case "save_settings":
      saveSettings();
      return true;
    case "change_password":
      if (state.page !== "settings") navigateToPageByVoice("settings");
      els.changePasswordBtn.click();
      return true;
    case "language_ru":
      els.languageSwitcher.value = "ru";
      els.languageSwitcher.dispatchEvent(new Event("change", { bubbles: true }));
      return true;
    case "language_en":
      els.languageSwitcher.value = "en";
      els.languageSwitcher.dispatchEvent(new Event("change", { bubbles: true }));
      return true;
    default:
      return false;
  }
}

async function executeRealtimeTool(name, args) {
  switch (name) {
    case "navigate_page":
      return { ok: navigateToPageByVoice(args.page), page: args.page };
    case "open_case":
      if (args.caseNumber) return { ok: openCaseByCaseNumber(args.caseNumber), caseNumber: args.caseNumber };
      if (Number.isInteger(args.rowIndex)) return { ok: openCaseByIndex(Math.max(0, args.rowIndex - 1)), rowIndex: args.rowIndex };
      if (args.date) return { ok: openCaseByDate(args.date), date: args.date };
      return { ok: openCaseByIndex(0) };
    case "set_editor_tab":
      setEditorTab(args.tab);
      sendRealtimeContextNote(`Current editor tab is ${args.tab}.`);
      return { ok: true, tab: args.tab };
    case "focus_case_field":
      return { ok: focusRealtimeCaseField(args.field), field: args.field };
    case "set_case_field":
      return { ok: applyRealtimeCaseField(args.field, String(args.value ?? "")), field: args.field, value: String(args.value ?? "") };
    case "set_global_search":
      syncSearchAndRender(String(args.query ?? ""), "global");
      return { ok: true, query: String(args.query ?? "") };
    case "set_reports_search":
      syncSearchAndRender(String(args.query ?? ""), "reports");
      return { ok: true, query: String(args.query ?? "") };
    case "set_status_filter":
      return { ok: setStatusFilterByVoice(args.status), status: args.status };
    case "trigger_action":
      return { ok: triggerRealtimeAction(args.action), action: args.action };
    case "set_settings_field":
      return { ok: applyRealtimeSettingsField(args.field, String(args.value ?? "")), field: args.field };
    case "toggle_settings_option":
      return { ok: toggleRealtimeSettingsOption(args.field, Boolean(args.enabled)), field: args.field, enabled: Boolean(args.enabled) };
    default:
      return { ok: false, error: `Unknown tool: ${name}` };
  }
}

function extractRealtimeResponseText(event) {
  const output = event?.response?.output || [];
  const texts = [];
  for (const item of output) {
    if (item?.type === "message" && Array.isArray(item.content)) {
      for (const part of item.content) {
        if (part?.text) texts.push(part.text);
        if (part?.transcript) texts.push(part.transcript);
      }
    }
  }
  return texts.join(" ").trim();
}

async function handleRealtimeDataChannelMessage(event) {
  let payload = null;
  try {
    payload = JSON.parse(event.data);
  } catch (_error) {
    return;
  }

  try {
    const eventLabel = payload?.type || "unknown";
    console.log("[realtime:event]", eventLabel, payload);
  } catch (_error) {
    // ignore logging errors
  }

  if (payload.type === "error") {
    const message = payload.error?.message || payload.message || "Unknown realtime error";
    setGlobalVoiceStatus(currentLang() === "en" ? `Realtime error: ${message}` : `Ошибка realtime: ${message}`);
    return;
  }

  if (payload.type === "session.created" || payload.type === "session.updated") {
    const message = payload.type === "session.created"
      ? (currentLang() === "en" ? "Realtime session created." : "Realtime-сессия создана.")
      : (currentLang() === "en" ? "Realtime session updated." : "Realtime-сессия обновлена.");
    setGlobalVoiceStatus(message);
    return;
  }

  if (payload.type === "conversation.item.input_audio_transcription.completed" && payload.transcript) {
    setGlobalVoiceStatus(currentLang() === "en" ? `Heard: ${payload.transcript}` : `Распознано: ${payload.transcript}`);
    try {
      const previousPage = state.page;
      const previousCaseId = state.currentCaseId;
      const previousTab = state.editorTab;
      await runVoiceCommand(payload.transcript);
      const statusAfterCommand = els.globalVoiceStatus.textContent || "";
      const unrecognized = statusAfterCommand.includes("Команда пока не распознана")
        || statusAfterCommand.includes("Command not recognized yet");
      const looksLikeExplicitCommand = /^(открой|открыть|перейди|покажи|найди|нажми|выбери|создай|создать|импортируй|импортировать|экспортируй|экспортировать|проверить|сохранить|заполни|заполнить|поиск|статус)\b/i.test(payload.transcript.trim());
      const stateChanged = previousPage !== state.page || previousCaseId !== state.currentCaseId || previousTab !== state.editorTab;
      if (!unrecognized || stateChanged || looksLikeExplicitCommand) {
        return;
      }
      const focusedTarget = getFocusedVoiceTarget()
        || (realtimeVoice.lastFocusedField ? { kind: "caseField", name: realtimeVoice.lastFocusedField } : null)
        || (realtimeVoice.lastFocusedSettingsField ? { kind: "settingsField", name: realtimeVoice.lastFocusedSettingsField } : null);
      if (focusedTarget?.kind === "caseField") {
        if (applyRealtimeCaseField(focusedTarget.name, payload.transcript)) {
          setGlobalVoiceStatus(currentLang() === "en"
            ? `Value applied to ${focusedTarget.name}.`
            : `Значение внесено в поле ${focusedTarget.name}.`);
          return;
        }
      }
      if (focusedTarget?.kind === "settingsField") {
        if (applyRealtimeSettingsField(focusedTarget.name, payload.transcript)) {
          setGlobalVoiceStatus(currentLang() === "en"
            ? `Value applied to ${focusedTarget.name}.`
            : `Значение внесено в поле ${focusedTarget.name}.`);
          return;
        }
      }
      if (focusedTarget?.kind === "globalSearch") {
        syncSearchAndRender(payload.transcript, "global");
        setGlobalVoiceStatus(currentLang() === "en" ? "Global search updated." : "Глобальный поиск обновлён.");
        return;
      }
      if (focusedTarget?.kind === "reportsSearch") {
        syncSearchAndRender(payload.transcript, "reports");
        setGlobalVoiceStatus(currentLang() === "en" ? "Reports search updated." : "Поиск по отчётам обновлён.");
        return;
      }
    } catch (error) {
      setGlobalVoiceStatus(currentLang() === "en"
        ? `Transcript routing error: ${error.message}`
        : `Ошибка обработки распознанной фразы: ${error.message}`);
      return;
    }
    return;
  }

  if (payload.type === "response.function_call_arguments.done") {
    let args = {};
    try {
      args = payload.arguments ? JSON.parse(payload.arguments) : {};
    } catch (_error) {
      args = {};
    }
    const result = await executeRealtimeTool(payload.name, args);
    sendRealtimeEvent({
      type: "conversation.item.create",
      item: {
        type: "function_call_output",
        call_id: payload.call_id,
        output: JSON.stringify(result),
      },
    });
    sendRealtimeEvent({ type: "response.create" });
    return;
  }

  if (payload.type === "response.done") {
    const text = extractRealtimeResponseText(payload);
    if (text) {
      setGlobalVoiceStatus(currentLang() === "en" ? `Assistant: ${text}` : `Ассистент: ${text}`);
    }
    return;
  }

  if (payload.type === "response.output_text.delta" && payload.delta) {
    setGlobalVoiceStatus(currentLang() === "en" ? `Assistant: ${payload.delta}` : `Ассистент: ${payload.delta}`);
  }
}

function buildRealtimeSessionUpdate() {
  return {
    type: "session.update",
    session: {
      type: "realtime",
      instructions:
        "You control a Russian-language pharmacovigilance web application. Always prefer tools over chat. " +
        "Interpret natural voice commands in Russian. Understand incomplete phrases, field names, numbers, dates, MedDRA terms, and short dictation after a field is focused. " +
        "If the user says only a value and a focused field is known, use that field. Use concise Russian clarification only when a tool cannot be chosen safely.",
      output_modalities: ["text"],
      tool_choice: "auto",
      tools: buildRealtimeTools(),
      audio: {
        input: {
          turn_detection: {
            type: "server_vad",
            create_response: true,
            interrupt_response: true,
            silence_duration_ms: 450,
          },
          transcription: {
            model: "gpt-4o-mini-transcribe",
            language: "ru",
            prompt: "Фармаконадзор, E2B, MedDRA, пациент, нарратив, анамнез, дозировка, Case ID.",
          },
        },
      },
    },
  };
}

async function startRealtimeVoiceSession({ restart = false } = {}) {
  if (realtimeVoice.connecting) return;
  if (realtimeVoice.active && !restart) return;
  if (!supportsRealtimeVoice()) {
    setGlobalVoiceStatus(currentLang() === "en" ? "Realtime voice requires WebRTC and microphone access." : "Realtime голосовой режим требует WebRTC и доступ к микрофону.");
    return;
  }

  if (restart) {
    await stopRealtimeVoiceSession({ silent: true });
  }

  if (commandRecognitionRestartTimer) {
    clearTimeout(commandRecognitionRestartTimer);
    commandRecognitionRestartTimer = null;
  }
  commandRecognition = null;
  resetActiveFieldDictationUi();
  activeRecognition = null;

  realtimeVoice.connecting = true;
  state.voiceControlEnabled = true;
  els.voiceControlBtn.classList.add("recording");
  setGlobalVoiceStatus(currentLang() === "en" ? "Connecting realtime voice assistant..." : "Подключаю realtime-ассистента...");

  try {
    const ephemeralKey = await fetchRealtimeClientSecret();
    if (!ephemeralKey) throw new Error("Realtime client secret was not returned by the server.");

    const pc = new RTCPeerConnection();
    const dc = pc.createDataChannel("oai-events");
    const audioElement = ensureRealtimeAudioElement();
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));
    pc.ontrack = (evt) => {
      audioElement.srcObject = evt.streams[0];
    };
    dc.addEventListener("message", (evt) => {
      void handleRealtimeDataChannelMessage(evt);
    });
    const openPromise = new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("Realtime data channel did not open in time.")), 15000);
      dc.addEventListener("open", () => {
        clearTimeout(timer);
        resolve();
      }, { once: true });
      dc.addEventListener("error", () => {
        clearTimeout(timer);
        reject(new Error("Realtime data channel error."));
      }, { once: true });
    });

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    const sdpResponse = await fetch("https://api.openai.com/v1/realtime/calls", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ephemeralKey}`,
        "Content-Type": "application/sdp",
      },
      body: offer.sdp,
    });
    if (!sdpResponse.ok) {
      throw new Error(`OpenAI Realtime SDP error: ${sdpResponse.status}`);
    }
    const answerSdp = await sdpResponse.text();
    await pc.setRemoteDescription({ type: "answer", sdp: answerSdp });
    await openPromise;

    realtimeVoice.pc = pc;
    realtimeVoice.dc = dc;
    realtimeVoice.stream = stream;
    realtimeVoice.active = true;
    realtimeVoice.connecting = false;

    sendRealtimeEvent(buildRealtimeSessionUpdate());
    sendRealtimeContextNote(`Current page is ${state.page}. Current editor tab is ${state.editorTab}. Use Russian. Control the web app using tools.`);
    const focused = getFocusedVoiceTarget();
    if (focused) syncRealtimeFocusContext(focused);

    setGlobalVoiceStatus(currentLang() === "en" ? "Realtime voice assistant is connected. Speak naturally." : "Realtime-ассистент подключён. Можно говорить свободно.");
  } catch (error) {
    realtimeVoice.connecting = false;
    state.voiceControlEnabled = false;
    els.voiceControlBtn.classList.remove("recording");
    if (realtimeVoice.stream) {
      realtimeVoice.stream.getTracks().forEach((track) => track.stop());
      realtimeVoice.stream = null;
    }
    if (realtimeVoice.pc) {
      try { realtimeVoice.pc.close(); } catch (_error) { /* ignore */ }
      realtimeVoice.pc = null;
    }
    realtimeVoice.dc = null;
    realtimeVoice.active = false;
    setGlobalVoiceStatus(currentLang() === "en" ? `Realtime voice error: ${error.message}` : `Ошибка realtime-режима: ${error.message}`);
  }
}

async function stopRealtimeVoiceSession({ silent = false } = {}) {
  realtimeVoice.connecting = false;
  realtimeVoice.active = false;
  realtimeVoice.lastFocusedField = null;
  realtimeVoice.lastFocusedSettingsField = null;
  if (realtimeVoice.dc) {
    try { realtimeVoice.dc.close(); } catch (_error) { /* ignore */ }
    realtimeVoice.dc = null;
  }
  if (realtimeVoice.pc) {
    try { realtimeVoice.pc.close(); } catch (_error) { /* ignore */ }
    realtimeVoice.pc = null;
  }
  if (realtimeVoice.stream) {
    realtimeVoice.stream.getTracks().forEach((track) => track.stop());
    realtimeVoice.stream = null;
  }
  state.voiceControlEnabled = false;
  els.voiceControlBtn.classList.remove("recording");
  if (!silent) {
    setGlobalVoiceStatus(currentLang() === "en" ? "Realtime voice assistant is disconnected." : "Realtime-ассистент отключён.");
  }
}

function openCaseByIndex(index) {
  const filtered = getFilteredCases();
  const item = filtered[index];
  if (!item) {
    setGlobalVoiceStatus(currentLang() === "en" ? "Requested case number was not found." : "Запрошенный номер случая не найден.");
    return false;
  }
  openDrawer(item.id);
  setGlobalVoiceStatus(
    currentLang() === "en"
      ? `Opened case ${item.caseNumber}.`
      : `Открыт случай ${item.caseNumber}.`
  );
  return true;
}

function setCaseFieldByVoice(fieldName, value) {
  if (!state.currentCase) {
    setGlobalVoiceStatus(currentLang() === "en" ? "Open a case before filling fields by voice." : "Сначала откройте случай, чтобы заполнять поля голосом.");
    return false;
  }
  const field = els.editorForm.querySelector(`[name="${fieldName}"]`);
  if (!field) return false;
  field.value = normalizeFieldVoiceValue(field, value);
  byPath(state.currentCase, fieldName, field.value);
  hydrateEditorForm();
  setGlobalVoiceStatus(
    currentLang() === "en"
      ? `Field updated: ${field.previousElementSibling?.textContent || fieldName}.`
      : `Поле обновлено: ${field.previousElementSibling?.textContent || fieldName}.`
  );
  return true;
}

function setCaseFieldByVoiceDefinition(definition, value) {
  if (definition?.panel && state.editorTab !== definition.panel) {
    setEditorTab(definition.panel);
    hydrateEditorForm();
  }
  return setCaseFieldByVoice(definition.field, value);
}

function focusCaseFieldByDefinition(definition) {
  if (!definition || !state.currentCase) return false;
  if (definition.panel && state.editorTab !== definition.panel) {
    setEditorTab(definition.panel);
    hydrateEditorForm();
  }
  const field = els.editorForm.querySelector(`[name="${definition.field}"]`);
  if (!field || field.disabled || field.readOnly) return false;
  startVoiceInputForField(field);
  setGlobalVoiceStatus(
    currentLang() === "en"
      ? `Field selected for dictation: ${field.previousElementSibling?.textContent || definition.field}.`
      : `Поле выбрано для диктовки: ${field.previousElementSibling?.textContent || definition.field}.`
  );
  return true;
}

function focusSettingsFieldByDefinition(definition) {
  if (state.page !== "settings") {
    setGlobalVoiceStatus(currentLang() === "en" ? "This control is available only on the Settings page." : "Этот элемент доступен только на странице Настройки.");
    return false;
  }
  const field = els[definition.element];
  if (!field || field.disabled || field.readOnly) return false;
  if (field.tagName === "SELECT") {
    field.focus();
  } else {
    startVoiceInputForField(field);
  }
  setGlobalVoiceStatus(
    currentLang() === "en"
      ? `Settings field selected: ${definition.aliases[0]}.`
      : `Поле настроек выбрано: ${definition.aliases[0]}.`
  );
  return true;
}

function setSettingsFieldByDefinition(definition, value) {
  if (state.page !== "settings") {
    setGlobalVoiceStatus(currentLang() === "en" ? "This control is available only on the Settings page." : "Этот элемент доступен только на странице Настройки.");
    return false;
  }
  const field = els[definition.element];
  if (!field || field.disabled || field.readOnly) return false;
  if (field.tagName === "SELECT") {
    const lang = normalizeLanguage(value.toLowerCase().includes("англ") || value.toLowerCase().includes("english") ? "en" : "ru");
    field.value = lang;
  } else {
    field.value = value.trim();
  }
  field.dispatchEvent(new Event("input", { bubbles: true }));
  field.dispatchEvent(new Event("change", { bubbles: true }));
  setGlobalVoiceStatus(
    currentLang() === "en"
      ? `Settings field updated: ${definition.aliases[0]}.`
      : `Поле настроек обновлено: ${definition.aliases[0]}.`
  );
  return true;
}

function toggleSettingsOption(definition, explicitValue = null) {
  if (state.page !== "settings") {
    setGlobalVoiceStatus(currentLang() === "en" ? "This control is available only on the Settings page." : "Этот элемент доступен только на странице Настройки.");
    return false;
  }
  const checkbox = els[definition.element];
  if (!checkbox) return false;
  checkbox.checked = explicitValue == null ? !checkbox.checked : explicitValue;
  checkbox.dispatchEvent(new Event("change", { bubbles: true }));
  setGlobalVoiceStatus(
    currentLang() === "en"
      ? `Option updated: ${definition.aliases[0]}.`
      : `Параметр обновлён: ${definition.aliases[0]}.`
  );
  return true;
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function findBestDefinitionMatch(transcript, definitions) {
  const normalized = stripVoiceCommandPrefix(transcript);
  let best = null;
  for (const definition of definitions) {
    for (const alias of definition.aliases) {
      const normalizedAlias = normalizeUiLabel(alias);
      const explicitAliasMatch =
        normalized === normalizedAlias ||
        normalized.startsWith(`${normalizedAlias} `) ||
        normalized.endsWith(` ${normalizedAlias}`) ||
        normalized.includes(` ${normalizedAlias} `);
      const score = semanticSimilarityScore(normalized, alias);
      if (!best || score > best.score || (explicitAliasMatch && score >= best.score)) {
        best = { definition, alias, score, explicitAliasMatch };
      }
    }
  }
  if (!best) return null;
  if (best.explicitAliasMatch && best.score >= 0.45) return best;
  return best.score >= 0.72 ? best : null;
}

function extractVoiceTail(transcript, alias) {
  const normalizedTranscript = stripVoiceCommandPrefix(transcript);
  const normalizedAlias = normalizeUiLabel(alias);
  const index = normalizedTranscript.indexOf(normalizedAlias);
  if (index === -1) return "";
  const after = normalizedTranscript.slice(index + normalizedAlias.length).trim();
  return after
    .replace(/^(это|равно|значение|значит)\s+/u, "")
    .trim();
}

function extractFieldIntent(transcript) {
  if (!state.currentCase) return null;
  const match = findBestDefinitionMatch(transcript, voiceFieldDefinitions);
  if (!match) return null;
  const value = extractVoiceTail(transcript, match.alias);
  if (!value) return null;
  return { definition: match.definition, value };
  return null;
}

function resolveFieldFocusIntent(transcript) {
  if (!state.currentCase) return null;
  const match = findBestDefinitionMatch(transcript, voiceFieldDefinitions);
  if (!match) return null;
  const value = extractVoiceTail(transcript, match.alias);
  return value ? null : match.definition;
}

function getFirstEditableFieldForPanel(panel) {
  if (!els.editorForm) return null;
  const panelPrefixes = {
    report: ["report."],
    patient: ["patient."],
    event: ["products.", "events."],
    narrative: ["narrative."],
    review: [],
  };
  const prefixes = panelPrefixes[panel] || [];
  if (!prefixes.length) return null;
  const fields = [...els.editorForm.querySelectorAll("input, textarea, select")];
  return fields.find((field) => prefixes.some((prefix) => field.name?.startsWith(prefix))) || null;
}

async function routeTranscriptDuringFieldDictation(transcript, target) {
  if (!state.currentCase) return false;
  const normalized = normalizeUiLabel(transcript);
  if (
    normalized.includes("сохранить случай") ||
    normalized.includes("сохранить") ||
    normalized.includes("проверить") ||
    normalized.includes("экспортировать xml") ||
    normalized.includes("закрыть")
  ) {
    return executeVoiceIntent(
      normalized.includes("сохранить случай") || normalized.includes("сохранить")
        ? { type: "action", name: "save_case" }
        : normalized.includes("проверить")
          ? { type: "action", name: "validate_case" }
          : normalized.includes("экспортировать xml")
            ? { type: "action", name: "export_xml" }
            : { type: "action", name: "close_case" }
    );
  }
  const directTabIntent = resolveEditorTabIntent(transcript);
  if (directTabIntent && directTabIntent !== state.editorTab) {
    setEditorTab(directTabIntent);
    hydrateEditorForm();
    const firstField = getFirstEditableFieldForPanel(directTabIntent);
    if (firstField) {
      startVoiceInputForField(firstField);
    }
    return true;
  }
  const directFieldIntent = extractFieldIntent(transcript);
  if (directFieldIntent) {
    if (directFieldIntent.definition.field === target.name) {
      return false;
    }
    setEditorTab(directFieldIntent.definition.panel);
    hydrateEditorForm();
    return setCaseFieldByVoiceDefinition(directFieldIntent.definition, directFieldIntent.value);
  }

  const focusIntent = resolveFieldFocusIntent(transcript);
  if (focusIntent) {
    if (focusIntent.field === target.name) {
      return false;
    }
    setEditorTab(focusIntent.panel);
    hydrateEditorForm();
    return focusCaseFieldByDefinition(focusIntent);
  }

  try {
    const backendPayload = await requestBackendVoiceIntent(transcript, "field");
    const backendIntent = backendPayload?.intent || null;
    if (backendIntent) {
      if (backendIntent.type === "fieldEntry" && backendIntent.definition?.field === target.name) {
        return false;
      }
      if (backendIntent.type === "fieldFocus" && backendIntent.definition?.field === target.name) {
        return false;
      }
      if (executeVoiceIntent(backendIntent)) {
        return true;
      }
    }
  } catch (_error) {
    // Fall back to local heuristics if backend NLU is temporarily unavailable.
  }
  return false;
}

function extractSettingsFieldIntent(transcript) {
  if (state.page !== "settings") return null;
  const match = findBestDefinitionMatch(transcript, settingsFieldDefinitions);
  if (!match) return null;
  const value = extractVoiceTail(transcript, match.alias);
  return value ? { definition: match.definition, value } : null;
}

function resolveSettingsFieldFocusIntent(transcript) {
  if (state.page !== "settings") return null;
  const match = findBestDefinitionMatch(transcript, settingsFieldDefinitions);
  if (!match) return null;
  const value = extractVoiceTail(transcript, match.alias);
  return value ? null : match.definition;
}

function resolveSettingsToggleIntent(transcript) {
  if (state.page !== "settings") return null;
  const normalized = normalizeUiLabel(transcript);
  for (const definition of settingsToggleDefinitions) {
    for (const alias of definition.aliases) {
      const normAlias = normalizeUiLabel(alias);
      if (normalized.includes(normAlias)) {
        const explicitValue = normalized.includes("выключ") || normalized.includes("отключ") ? false : normalized.includes("включ") ? true : null;
        return { definition, explicitValue };
      }
    }
  }
  return null;
}

function resolveEditorTabIntent(transcript) {
  if (!state.currentCase) return null;
  const normalized = normalizeUiLabel(transcript);
  const tabs = [
    { panel: "report", aliases: ["отчет", "отчёт", "вкладка отчет", "вкладка отчёт", "раздел отчет", "report"] },
    { panel: "patient", aliases: ["пациент", "вкладка пациент", "раздел пациент", "patient"] },
    { panel: "event", aliases: ["событие", "события", "вкладка событие", "раздел событие", "event"] },
    { panel: "narrative", aliases: ["нарратив", "наратив", "вкладка нарратив", "раздел нарратив", "narrative"] },
    { panel: "review", aliases: ["проверка", "вкладка проверка", "раздел проверка", "review"] },
  ];
  for (const tab of tabs) {
    if (tab.aliases.some((alias) => normalized === alias || normalized.includes(`вкладка ${alias}`) || normalized.includes(`открой ${alias}`) || normalized.includes(`открыть ${alias}`) || normalized.includes(`перейди ${alias}`) || normalized.includes(`покажи ${alias}`))) {
      return tab.panel;
    }
  }
  return null;
}

async function runVoiceCommand(rawTranscript) {
  const transcript = rawTranscript.trim();
  const normalized = normalizeUiLabel(transcript);
  if (!normalized) return;

  const shortCommandTokenCount = normalized.split(/\s+/u).filter(Boolean).length;
  if (shortCommandTokenCount <= 3) {
    const immediateIntent = interpretVoiceIntent(transcript);
    if (immediateIntent && executeVoiceIntent(immediateIntent)) {
      return;
    }
  }

  if (normalized === "русский" || normalized === "русский язык") {
    els.languageSwitcher.value = "ru";
    els.languageSwitcher.dispatchEvent(new Event("change", { bubbles: true }));
    return;
  }
  if (normalized === "английский" || normalized === "английский язык" || normalized === "english") {
    els.languageSwitcher.value = "en";
    els.languageSwitcher.dispatchEvent(new Event("change", { bubbles: true }));
    return;
  }
  if (normalized === "поиск в базе безопасности" || normalized === "поиск по базе безопасности" || normalized === "search database") {
    startVoiceInputForField(els.globalSearch);
    return;
  }
  if ((normalized === "поиск по id" || normalized === "поиск по case id" || normalized === "поиск по кейс id") && state.page === "reports") {
    startVoiceInputForField(els.reportsSearch);
    return;
  }
  if (normalized === "все статусы" && state.page === "reports") {
    els.statusFilter.value = "all";
    els.statusFilter.dispatchEvent(new Event("change", { bubbles: true }));
    return;
  }

  const globalSearchPrefixes = [
    "поиск по базе безопасности ",
    "поиск в базе безопасности ",
    "поиск по базе данных ",
    "search safety database ",
    "search database ",
  ];
  const globalSearchPrefix = globalSearchPrefixes.find((prefix) => normalized.startsWith(prefix));
  if (globalSearchPrefix) {
    const query = transcript.slice(globalSearchPrefix.length).trim();
    syncSearchAndRender(query, "global");
    setGlobalVoiceStatus(
      currentLang() === "en"
        ? `Global search applied: ${query || "all records"}.`
        : `Глобальный поиск применён: ${query || "все записи"}.`
    );
    return;
  }

  const reportsSearchPrefixes = [
    "поиск по кейс id ",
    "поиск по case id ",
    "найти кейс ",
    "search by case id ",
  ];
  const reportsSearchPrefix = reportsSearchPrefixes.find((prefix) => normalized.startsWith(prefix));
  if (reportsSearchPrefix) {
    const query = transcript.slice(reportsSearchPrefix.length).trim();
    syncSearchAndRender(query, "reports");
    setGlobalVoiceStatus(
      currentLang() === "en"
        ? `Case search applied: ${query || "all cases"}.`
        : `Поиск по Case ID применён: ${query || "все случаи"}.`
    );
    return;
  }

  if (normalized === "все статусы" || normalized === "all statuses") {
    setStatusFilterByVoice("all");
    return;
  }

  const statusPrefixes = [
    "статус ",
    "фильтр статус ",
    "открой статус ",
    "show status ",
    "status ",
  ];
  const statusPrefix = statusPrefixes.find((prefix) => normalized.startsWith(prefix));
  if (statusPrefix) {
    const statusValue = transcript.slice(statusPrefix.length).trim();
    setStatusFilterByVoice(statusValue);
    return;
  }

  const caseOpenPrefixes = [
    "открой кейс ",
    "открыть кейс ",
    "open case ",
  ];
  const caseOpenPrefix = caseOpenPrefixes.find((prefix) => normalized.startsWith(prefix));
  if (caseOpenPrefix) {
    const caseNumber = transcript.slice(caseOpenPrefix.length).trim();
    openCaseByCaseNumber(caseNumber);
    return;
  }

  const dateOpenPrefixes = [
    "открой по дате ",
    "открыть по дате ",
    "open by date ",
  ];
  const dateOpenPrefix = dateOpenPrefixes.find((prefix) => normalized.startsWith(prefix));
  if (dateOpenPrefix) {
    const dateValue = transcript.slice(dateOpenPrefix.length).trim();
    openCaseByDate(dateValue);
    return;
  }

  const clickPrefixes = [
    "нажми ",
    "кнопка ",
    "клик ",
    "выбери кнопку ",
    "press ",
    "click ",
    "button ",
  ];
  const clickPrefix = clickPrefixes.find((prefix) => normalized.startsWith(prefix));
  if (clickPrefix) {
    const rawTarget = transcript.slice(clickPrefix.length).trim();
    const match = rawTarget.match(/(.+?)\s+(\d+)$/);
    const label = match ? match[1].trim() : rawTarget;
    const index = match ? Number(match[2]) : 1;
    clickVisibleButtonByLabel(label, index);
    return;
  }

  if (normalized.includes("панель мониторинга") || normalized === "панель" || normalized.includes("dashboard")) return navigateToPageByVoice("dashboard");
  if (normalized.includes("отчеты") || normalized.includes("отчёты") || normalized.includes("реестр icsr") || normalized === "reports") return navigateToPageByVoice("reports");
  if (normalized.includes("серьезные случаи") || normalized.includes("серьёзные случаи") || normalized.includes("serious cases")) return navigateToPageByVoice("serious");
  if (normalized.includes("несерьезные случаи") || normalized.includes("несерьёзные случаи") || normalized.includes("non serious cases") || normalized.includes("nonserious")) return navigateToPageByVoice("nonserious");
  if (normalized === "настройки" || normalized.includes("settings")) return navigateToPageByVoice("settings");

  if (normalized.includes("создать отчет") || normalized.includes("создать отчёт") || normalized.includes("create report")) {
    openDrawer(null, true);
    setGlobalVoiceStatus(currentLang() === "en" ? "New report form opened." : "Открыта форма нового отчёта.");
    return;
  }
  if (normalized.includes("импортировать xml") || normalized.includes("import xml")) {
    els.importXmlBtn.click();
    return;
  }
  if (normalized.includes("закрыть случай") || normalized.includes("close case")) {
    closeDrawer();
    setGlobalVoiceStatus(currentLang() === "en" ? "Case workspace closed." : "Рабочая область случая закрыта.");
    return;
  }
  if (normalized.includes("сохранить") || normalized.includes("save case")) {
    saveCurrentCase()
      .then(() => setGlobalVoiceStatus(currentLang() === "en" ? "Case saved." : "Случай сохранён."))
      .catch((error) => setGlobalVoiceStatus(error.message));
    return;
  }
  if (normalized.includes("проверить") || normalized.includes("validate")) {
    validateCurrentCase()
      .then(() => setGlobalVoiceStatus(currentLang() === "en" ? "Case validated." : "Случай проверен."))
      .catch((error) => setGlobalVoiceStatus(error.message));
    return;
  }
  if (normalized.includes("экспорт") || normalized.includes("export xml")) {
    saveCurrentCase()
      .then(exportCurrentCase)
      .then(() => setGlobalVoiceStatus(currentLang() === "en" ? "XML exported." : "XML экспортирован."))
      .catch((error) => setGlobalVoiceStatus(error.message));
    return;
  }
  if (normalized.includes("заполнить демо") || normalized.includes("fill demo")) {
    fillDemoData();
    setGlobalVoiceStatus(currentLang() === "en" ? "Demo data inserted." : "Демонстрационные данные заполнены.");
    return;
  }
  if (normalized.includes("сохранить изменения") && state.page === "settings") {
    saveSettings();
    return;
  }
  if ((normalized.includes("сменить пароль") || normalized.includes("безопасность")) && state.page === "settings") {
    els.changePasswordBtn.click();
    return;
  }
  if (normalized === "голосовой режим" || normalized === "voice mode") {
    toggleVoiceControlMode();
    return;
  }
  if (normalized.includes("открыть первый") || normalized.includes("open first")) return openCaseByIndex(0);
  if (normalized.includes("открыть второй") || normalized.includes("open second")) return openCaseByIndex(1);
  if (normalized.includes("открыть трет") || normalized.includes("open third")) return openCaseByIndex(2);

  const fastLocalIntent = interpretVoiceIntent(transcript);
  if (fastLocalIntent && executeVoiceIntent(fastLocalIntent)) {
    return;
  }

  try {
    const backendPayload = await requestBackendVoiceIntent(transcript, "command");
    const backendIntent = backendPayload?.intent || null;
    if (executeVoiceIntent(backendIntent)) {
      return;
    }
  } catch (_error) {
    // Keep local heuristics as a fallback path.
  }

  const commandMap = [
    { patterns: ["номер случая", "case id"], field: "report.caseNumber" },
    { patterns: ["заголовок", "title"], field: "report.title" },
    { patterns: ["пациент", "patient id"], field: "patient.patientId" },
    { patterns: ["инициалы", "initials"], field: "patient.initials" },
    { patterns: ["meddra", "меддра"], field: "events.0.meddraPt" },
    { patterns: ["описание события", "event description"], field: "events.0.description" },
    { patterns: ["нарратив", "narrative"], field: "narrative.summary" },
    { patterns: ["комментарий ревьюера", "reviewer comment"], field: "narrative.reviewerComment" },
    { patterns: ["препарат", "drug"], field: "products.0.name" },
  ];

  for (const command of commandMap) {
    for (const pattern of command.patterns) {
      const marker = `${pattern} `;
      const index = normalized.indexOf(marker);
      if (index !== -1) {
        const value = transcript.slice(index + marker.length).trim();
        if (!value) {
          setGlobalVoiceStatus(currentLang() === "en" ? "The command was recognized, but there is no value after the field name." : "Команда распознана, но после названия поля нет значения.");
          return;
        }
        setCaseFieldByVoice(command.field, value);
        return;
      }
    }
  }

  setGlobalVoiceStatus(
    currentLang() === "en"
      ? `Recognized: "${transcript}". STT: ${lastVoiceSttResult?.backend || "unknown"}. Intent engine: ${lastVoiceIntentPayload?.engine || "none"}. Command not recognized yet.`
      : `Распознано: "${transcript}". STT: ${lastVoiceSttResult?.backend || "unknown"}. Интерпретатор: ${lastVoiceIntentPayload?.engine || "нет"}. Команда пока не распознана.`
  );
}

function startCommandRecognition() {
  if (supportsRealtimeVoice()) {
    void startRealtimeVoiceSession();
    return;
  }
  if (!supportsLocalVoice()) {
    setGlobalVoiceStatus(t("voice.modeUnsupported"));
    return;
  }
  commandLoopGeneration += 1;
  const loopId = commandLoopGeneration;
  state.voiceControlEnabled = true;
  els.voiceControlBtn.classList.add("recording");
  setGlobalVoiceStatus(t("voice.modeReady"));
  commandRecognition = { id: loopId };
  void (async () => {
    while (state.voiceControlEnabled && commandRecognition?.id === loopId) {
      try {
        const transcript = await captureSpeechToText({ mode: "command", maxDurationMs: 5500, silenceDurationMs: 900 });
        if (!state.voiceControlEnabled || commandRecognition?.id !== loopId) return;
        if (transcript) {
          await runVoiceCommand(transcript);
        } else {
          setGlobalVoiceStatus(currentLang() === "en" ? "I did not catch the command. Continue speaking." : "Не расслышал команду. Продолжайте говорить.");
        }
      } catch (error) {
        if (!state.voiceControlEnabled || commandRecognition?.id !== loopId) return;
        setGlobalVoiceStatus(
          currentLang() === "en"
            ? `Local voice service error: ${error.message}`
            : `Ошибка локального голосового сервиса: ${error.message}`
        );
        scheduleCommandRecognitionRestart(commandRecognition);
        return;
      }
    }
  })();
}

function toggleVoiceControlMode() {
  if (isRealtimeVoiceActive()) {
    void stopRealtimeVoiceSession();
    return;
  }
  if (state.voiceControlEnabled) {
    stopCommandRecognition();
    return;
  }
  startCommandRecognition();
}

function toggleVoiceInput(button) {
  if (isRealtimeVoiceActive()) {
    const target = els.editorForm.querySelector(`[name="${button.dataset.voiceTarget}"]`);
    if (!target) return;
    target.focus();
    syncRealtimeFocusContext({ kind: "caseField", name: target.name });
    setVoiceStatus(currentLang() === "en" ? "Field focus shared with the realtime assistant." : "Фокус поля передан realtime-ассистенту.");
    return;
  }
  if (!supportsLocalVoice()) {
    setVoiceStatus(currentLang() === "en" ? "Voice input is not available in this browser. Use Chrome or Edge." : "Голосовой ввод недоступен в этом браузере. Используйте Chrome или Edge.");
    return;
  }
  const target = els.editorForm.querySelector(`[name="${button.dataset.voiceTarget}"]`);
  if (!target) return;
  startVoiceInputForField(target, button);
}

function startVoiceInputForField(target, button = null) {
  if (isRealtimeVoiceActive()) {
    try { target.focus(); } catch (_error) { /* ignore */ }
    const voiceTarget = getFocusedVoiceTarget() || (target.name ? { kind: "caseField", name: target.name } : null);
    syncRealtimeFocusContext(voiceTarget);
    setVoiceStatus(currentLang() === "en" ? "Field context shared. Speak naturally." : "Контекст поля передан. Можно говорить свободно.");
    return;
  }
  if (!supportsLocalVoice() || !target || target.disabled || target.readOnly) {
    if (!supportsLocalVoice()) {
      setVoiceStatus(currentLang() === "en" ? "Voice input is not available in this browser. Use Chrome or Edge." : "Голосовой ввод недоступен в этом браузере. Используйте Chrome или Edge.");
    }
    return;
  }
  if (activeVoiceField === target) {
    stopActiveRecognition();
    return;
  }
  if (activeRecognition) stopActiveRecognition();
  const shouldResumeCommandMode = state.voiceControlEnabled;
  if (state.voiceControlEnabled) {
    stopCommandRecognition({ preserveEnabledState: true, keepButtonActive: true, keepStatus: true });
    setGlobalVoiceStatus(currentLang() === "en" ? "Voice commands are paused while dictation fills the selected field." : "Голосовые команды временно приостановлены, пока идёт диктовка в выбранное поле.");
  }
  const prefix = target.value ? `${target.value.trim()} ` : "";
  activeVoiceButton = button;
  activeVoiceField = target;
  const sessionField = target;
  const sessionButton = button;
  if (button) button.classList.add("recording");
  target.classList.add("voice-field-recording");
  try { target.focus(); } catch (_error) { /* ignore */ }
  setVoiceStatus(currentLang() === "en" ? "Listening. Dictate directly into the selected field." : "Идёт прослушивание. Диктуйте прямо в выбранное поле.");
  void (async () => {
    try {
      const transcript = await captureSpeechToText({
        mode: "field",
        maxDurationMs: FIELD_DICTATION_MAX_MS,
        silenceDurationMs: FIELD_DICTATION_SILENCE_MS,
      });
      if (transcript) {
        if (await routeTranscriptDuringFieldDictation(transcript, target)) {
          setVoiceStatus(
            currentLang() === "en"
              ? `Recognized: "${transcript}". Switched to the requested field.`
              : `Распознано: "${transcript}". Переключился на запрошенное поле.`
          );
          return;
        }
        target.value = `${prefix}${transcript}`.trim();
        if (state.currentCase && target.name) {
          byPath(state.currentCase, target.name, target.value);
        }
        target.dispatchEvent(new Event("input", { bubbles: true }));
        target.dispatchEvent(new Event("change", { bubbles: true }));
        setVoiceStatus(
          currentLang() === "en"
            ? `Recognized: "${transcript}". Field dictation completed. After a 5-second pause you can name another field.`
            : `Распознано: "${transcript}". Диктовка в поле завершена. После паузы в 5 секунд можно назвать другое поле.`
        );
      } else {
        setVoiceStatus(
          currentLang() === "en"
            ? `No speech detected. STT backend: ${lastVoiceSttResult?.backend || "unknown"}. Please try again.`
            : `Речь не распознана. STT backend: ${lastVoiceSttResult?.backend || "unknown"}. Попробуйте ещё раз.`
        );
      }
    } catch (error) {
      setVoiceStatus(
        currentLang() === "en"
          ? `Local dictation error: ${error.message}`
          : `Ошибка локальной диктовки: ${error.message}`
      );
    } finally {
      resetActiveFieldDictationUi(sessionField, sessionButton);
      activeRecognition = null;
      if (shouldResumeCommandMode && !activeVoiceField) {
        startCommandRecognition();
      }
    }
  })();
}

async function importXml() {
  const xml = els.xmlInput.value.trim();
  if (!xml) {
    alert(currentLang() === "en" ? "Paste XML payload first." : "Сначала вставьте XML-пакет.");
    return;
  }
  const data = await api("/api/import/xml", {
    method: "POST",
    body: JSON.stringify({ xml }),
  });
  els.xmlDialog.close();
  els.xmlInput.value = "";
  await loadCases();
  openDrawer(data.summary.id);
}

function wireEvents() {
  els.navMenu.addEventListener("click", (event) => {
    const button = event.target.closest(".nav-link");
    if (!button) return;
    setPage(button.dataset.page);
  });

  els.globalSearch.addEventListener("input", () => {
    state.search = els.globalSearch.value.trim();
    state.reportsPage = 1;
    state.nonSeriousPage = 1;
    els.reportsSearch.value = state.search;
    renderReports();
    renderSerious();
    renderNonSerious();
  });

  els.languageSwitcher.addEventListener("change", () => {
    state.settings.language = normalizeLanguage(els.languageSwitcher.value);
    localStorage.setItem("e2bmaster-settings", JSON.stringify(state.settings));
    if (state.voiceControlEnabled) {
      stopCommandRecognition({ preserveEnabledState: false, keepButtonActive: false, keepStatus: true });
      startCommandRecognition();
    }
    renderAll();
    setPage(state.page);
  });

  els.voiceControlBtn.addEventListener("click", toggleVoiceControlMode);

  els.reportsSearch.addEventListener("input", () => {
    state.search = els.reportsSearch.value.trim();
    state.reportsPage = 1;
    state.nonSeriousPage = 1;
    els.globalSearch.value = state.search;
    renderReports();
    renderSerious();
    renderNonSerious();
  });

  els.statusFilter.addEventListener("change", () => {
    state.statusFilter = els.statusFilter.value;
    state.reportsPage = 1;
    state.nonSeriousPage = 1;
    renderReports();
    renderSerious();
    renderNonSerious();
  });

  els.reportsPrevBtn.addEventListener("click", () => {
    state.reportsPage -= 1;
    renderReports();
  });

  els.reportsNextBtn.addEventListener("click", () => {
    state.reportsPage += 1;
    renderReports();
  });

  els.nonSeriousPrevBtn.addEventListener("click", () => {
    state.nonSeriousPage -= 1;
    renderNonSerious();
  });

  els.nonSeriousNextBtn.addEventListener("click", () => {
    state.nonSeriousPage += 1;
    renderNonSerious();
  });

  els.createCaseBtn.addEventListener("click", () => openDrawer(null, true));
  els.openCreateFromReports.addEventListener("click", () => openDrawer(null, true));
  els.importXmlBtn.addEventListener("click", () => els.xmlDialog.showModal());
  els.submitImportBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      await importXml();
    } catch (error) {
      alert(error.message);
    }
  });

  document.body.addEventListener("click", (event) => {
    const open = event.target.closest("[data-open-case]");
    if (open) {
      openDrawer(Number(open.dataset.openCase));
      return;
    }
    const readinessCard = event.target.closest("[data-editor-tab]");
    if (readinessCard && readinessCard.closest("#sectionReadinessMap")) {
      setEditorTab(readinessCard.dataset.editorTab);
      return;
    }
    const jumpField = event.target.closest("[data-jump-field]");
    if (jumpField) {
      setEditorTab(jumpField.dataset.jumpPanel);
      hydrateEditorForm();
      const field = els.editorForm.querySelector(`[name="${jumpField.dataset.jumpField}"]`);
      if (field) {
        field.focus();
        field.classList.add("voice-field-recording");
        setTimeout(() => field.classList.remove("voice-field-recording"), 1400);
      }
      return;
    }
    const jumpIssue = event.target.closest("[data-jump-issue]");
    if (jumpIssue) {
      jumpToIssueTarget(jumpIssue.dataset.jumpIssue);
      return;
    }
    const editableField = event.target.closest('input:not([type="date"]):not([type="checkbox"]), textarea');
    if (editableField && !editableField.disabled && !editableField.readOnly) {
      startVoiceInputForField(editableField);
      return;
    }
    if (event.target.dataset.closeDrawer === "true") closeDrawer();
  });

  document.body.addEventListener("focusin", (event) => {
    const editableField = event.target.closest?.('input:not([type="date"]):not([type="checkbox"]), textarea');
    if (editableField && !editableField.disabled && !editableField.readOnly && activeVoiceField !== editableField) {
      startVoiceInputForField(editableField);
    }
  });

  document.body.addEventListener("focusin", (event) => {
    if (!isRealtimeVoiceActive()) return;
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.matches?.("#editorForm [name]")) {
      syncRealtimeFocusContext({ kind: "caseField", name: target.name });
      return;
    }
    if (target.id && ["settingsUserName", "settingsEmail", "settingsRole", "settingsLanguage"].includes(target.id)) {
      syncRealtimeFocusContext({ kind: "settingsField", name: target.id });
      return;
    }
    if (target.id === "globalSearch") {
      sendRealtimeContextNote("Focused field is globalSearch. If the user dictates a phrase, use the global search tool.");
      return;
    }
    if (target.id === "reportsSearch") {
      sendRealtimeContextNote("Focused field is reportsSearch. If the user dictates a phrase, use the reports search tool.");
    }
  });

  els.drawerCloseBtn.addEventListener("click", closeDrawer);
  els.editorTabs.addEventListener("click", (event) => {
    const button = event.target.closest(".subtab");
    if (!button) return;
    setEditorTab(button.dataset.editorTab);
  });

  els.editorForm.addEventListener("input", (event) => {
    const field = event.target.closest("[name]");
    if (!field) return;
    syncCurrentCaseFieldFromForm(field);
  });

  els.editorForm.addEventListener("change", (event) => {
    const field = event.target.closest("[name]");
    if (!field) return;
    syncCurrentCaseFieldFromForm(field);
  });

  els.editorForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      await saveCurrentCase();
      alert(currentLang() === "en" ? "Case saved." : "Случай сохранён.");
    } catch (error) {
      alert(error.message);
    }
  });

  els.drawerValidateBtn.addEventListener("click", async () => {
    try {
      await validateCurrentCase();
    } catch (error) {
      alert(error.message);
    }
  });

  els.drawerExportBtn.addEventListener("click", async () => {
    try {
      await saveCurrentCase();
      await exportCurrentCase();
    } catch (error) {
      alert(error.message);
    }
  });

  els.fillDemoBtn.addEventListener("click", fillDemoData);
  els.saveSettingsBtn.addEventListener("click", saveSettings);
  els.changePasswordBtn.addEventListener("click", () => {
    els.passwordHelp.textContent =
      currentLang() === "en"
        ? "Password changes are stored only in this browser for demo mode."
        : "Изменения пароля сохраняются только в этом браузере в демонстрационном режиме.";
    els.passwordForm.reset();
    els.passwordDialog.showModal();
  });
  els.savePasswordBtn.addEventListener("click", (event) => {
    event.preventDefault();
    savePassword();
  });

  for (const button of document.querySelectorAll(".voice-btn")) {
    button.addEventListener("click", () => toggleVoiceInput(button));
  }
}

async function init() {
  loadSettings();
  applyTranslations();
  wireEvents();
  setPage("dashboard");
  setGlobalVoiceStatus(t("voice.modeOff"));
  setVoiceStatus(
    supportsLocalVoice()
      ? currentLang() === "en"
        ? "Voice input is ready for event description, MedDRA PT and narrative."
        : "Голосовой ввод готов для описания события, MedDRA PT и нарратива."
      : currentLang() === "en"
        ? "This browser does not support voice input. Use Chrome or Edge."
        : "Этот браузер не поддерживает голосовой ввод. Используйте Chrome или Edge."
  );
  await loadCases();
}

init().catch((error) => {
  console.error(error);
  alert(currentLang() === "en" ? `Failed to load application: ${error.message}` : `Не удалось загрузить приложение: ${error.message}`);
});
