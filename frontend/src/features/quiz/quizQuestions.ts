export type QuizLanguage = "en" | "ru";

export type LocalizedQuizText = {
  en: string;
  ru: string;
};

export type QuizDifficulty = "easy" | "medium" | "hard";

export type QuizQuestion = {
  id: number;
  category: string;
  categoryLabel: LocalizedQuizText;
  difficulty: QuizDifficulty;
  question: LocalizedQuizText;
  options: LocalizedQuizText[];
  correctOptionIndex: number;
  explanation: LocalizedQuizText;
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    category: "qa-theory",
    categoryLabel: {
      en: "QA Theory",
      ru: "Теория QA",
    },
    difficulty: "easy",
    question: {
      en: "What is software testing?",
      ru: "Что такое тестирование программного обеспечения?",
    },
    options: [
      {
        en: "A process of checking software and finding defects",
        ru: "Процесс проверки программного обеспечения и поиска дефектов",
      },
      {
        en: "Only writing automated tests",
        ru: "Только написание автоматизированных тестов",
      },
      {
        en: "Creating the application design",
        ru: "Создание дизайна приложения",
      },
      {
        en: "Deploying an application to production",
        ru: "Развёртывание приложения в production",
      },
    ],
    correctOptionIndex: 0,
    explanation: {
      en: "Testing evaluates software quality, checks requirements and helps find defects.",
      ru: "Тестирование оценивает качество продукта, проверяет требования и помогает находить дефекты.",
    },
  },
  {
    id: 2,
    category: "qa-theory",
    categoryLabel: {
      en: "QA Theory",
      ru: "Теория QA",
    },
    difficulty: "medium",
    question: {
      en: "What is the difference between retesting and regression testing?",
      ru: "В чём разница между retesting и regression testing?",
    },
    options: [
      {
        en: "There is no difference",
        ru: "Разницы нет",
      },
      {
        en: "Retesting checks a fixed defect; regression checks related existing functionality",
        ru: "Retesting проверяет исправленный дефект, regression — связанную существующую функциональность",
      },
      {
        en: "Regression is performed only before development",
        ru: "Regression выполняется только до начала разработки",
      },
      {
        en: "Retesting checks application performance",
        ru: "Retesting проверяет производительность приложения",
      },
    ],
    correctOptionIndex: 1,
    explanation: {
      en: "Retesting confirms that a specific defect is fixed. Regression testing checks that changes did not break existing functionality.",
      ru: "Retesting подтверждает исправление конкретного дефекта. Regression testing проверяет, что изменения не сломали существующую функциональность.",
    },
  },
  {
    id: 3,
    category: "bug-reports",
    categoryLabel: {
      en: "Bug Reports",
      ru: "Баг-репорты",
    },
    difficulty: "easy",
    question: {
      en: "Which field describes what actually happened?",
      ru: "Какое поле описывает то, что произошло фактически?",
    },
    options: [
      {
        en: "Expected result",
        ru: "Expected result",
      },
      {
        en: "Actual result",
        ru: "Actual result",
      },
      {
        en: "Preconditions",
        ru: "Preconditions",
      },
      {
        en: "Priority",
        ru: "Priority",
      },
    ],
    correctOptionIndex: 1,
    explanation: {
      en: "Actual Result describes the observed system behavior.",
      ru: "Actual Result описывает фактически наблюдаемое поведение системы.",
    },
  },
  {
    id: 4,
    category: "bug-reports",
    categoryLabel: {
      en: "Bug Reports",
      ru: "Баг-репорты",
    },
    difficulty: "medium",
    question: {
      en: "What does bug severity describe?",
      ru: "Что описывает severity дефекта?",
    },
    options: [
      {
        en: "How quickly the defect must be fixed",
        ru: "Насколько срочно необходимо исправить дефект",
      },
      {
        en: "The defect's impact on the system and business",
        ru: "Влияние дефекта на систему и бизнес",
      },
      {
        en: "Who found the defect",
        ru: "Кто обнаружил дефект",
      },
      {
        en: "How many test cases failed",
        ru: "Сколько тест-кейсов упало",
      },
    ],
    correctOptionIndex: 1,
    explanation: {
      en: "Severity describes impact. Priority describes the urgency and order of fixing.",
      ru: "Severity описывает влияние дефекта. Priority описывает срочность и порядок исправления.",
    },
  },
  {
    id: 5,
    category: "api",
    categoryLabel: {
      en: "API Testing",
      ru: "API-тестирование",
    },
    difficulty: "easy",
    question: {
      en: "Which HTTP method is normally used to retrieve data?",
      ru: "Какой HTTP-метод обычно используется для получения данных?",
    },
    options: [
      { en: "GET", ru: "GET" },
      { en: "POST", ru: "POST" },
      { en: "DELETE", ru: "DELETE" },
      { en: "PATCH", ru: "PATCH" },
    ],
    correctOptionIndex: 0,
    explanation: {
      en: "GET requests retrieve a resource and normally should not modify server data.",
      ru: "GET-запрос получает ресурс и обычно не должен изменять данные на сервере.",
    },
  },
  {
    id: 6,
    category: "api",
    categoryLabel: {
      en: "API Testing",
      ru: "API-тестирование",
    },
    difficulty: "medium",
    question: {
      en: "What is the difference between HTTP 401 and 403?",
      ru: "В чём разница между HTTP 401 и 403?",
    },
    options: [
      {
        en: "401 means not authenticated; 403 means authenticated but access is forbidden",
        ru: "401 означает отсутствие аутентификации, 403 — доступ запрещён при имеющейся аутентификации",
      },
      {
        en: "401 means server error; 403 means validation error",
        ru: "401 означает ошибку сервера, 403 — ошибку валидации",
      },
      {
        en: "There is no difference",
        ru: "Разницы нет",
      },
      {
        en: "401 means resource not found; 403 means resource deleted",
        ru: "401 означает, что ресурс не найден, 403 — ресурс удалён",
      },
    ],
    correctOptionIndex: 0,
    explanation: {
      en: "401 Unauthorized usually means authentication is required or invalid. 403 Forbidden means the server understood the request but refuses access.",
      ru: "401 Unauthorized обычно означает отсутствие или ошибку аутентификации. 403 Forbidden означает, что сервер понял запрос, но запрещает доступ.",
    },
  },
  {
    id: 7,
    category: "sql",
    categoryLabel: {
      en: "SQL Basics",
      ru: "Основы SQL",
    },
    difficulty: "easy",
    question: {
      en: "Which SQL command retrieves records from a table?",
      ru: "Какая SQL-команда получает записи из таблицы?",
    },
    options: [
      { en: "SELECT", ru: "SELECT" },
      { en: "UPDATE", ru: "UPDATE" },
      { en: "DELETE", ru: "DELETE" },
      { en: "INSERT", ru: "INSERT" },
    ],
    correctOptionIndex: 0,
    explanation: {
      en: "SELECT retrieves data from one or more tables.",
      ru: "SELECT используется для получения данных из одной или нескольких таблиц.",
    },
  },
  {
    id: 8,
    category: "devtools",
    categoryLabel: {
      en: "DevTools",
      ru: "DevTools",
    },
    difficulty: "easy",
    question: {
      en: "Which DevTools tab is primarily used to inspect HTTP requests?",
      ru: "Какая вкладка DevTools используется для просмотра HTTP-запросов?",
    },
    options: [
      { en: "Elements", ru: "Elements" },
      { en: "Network", ru: "Network" },
      { en: "Sources", ru: "Sources" },
      { en: "Application", ru: "Application" },
    ],
    correctOptionIndex: 1,
    explanation: {
      en: "The Network tab displays requests, responses, status codes, headers, payloads and timing.",
      ru: "Вкладка Network показывает запросы, ответы, status codes, headers, payload и время выполнения.",
    },
  },
  {
    id: 9,
    category: "mobile",
    categoryLabel: {
      en: "Mobile Testing",
      ru: "Мобильное тестирование",
    },
    difficulty: "medium",
    question: {
      en: "Which scenario is important for mobile application testing?",
      ru: "Какой сценарий важен при тестировании мобильного приложения?",
    },
    options: [
      {
        en: "Moving the app to background and returning to foreground",
        ru: "Сворачивание приложения и возврат из background",
      },
      {
        en: "Testing only on one screen size",
        ru: "Проверка только на одном размере экрана",
      },
      {
        en: "Ignoring permission requests",
        ru: "Игнорирование запросов разрешений",
      },
      {
        en: "Testing only with a stable internet connection",
        ru: "Проверка только при стабильном интернете",
      },
    ],
    correctOptionIndex: 0,
    explanation: {
      en: "A mobile application must correctly preserve state when it moves between foreground and background.",
      ru: "Мобильное приложение должно корректно сохранять состояние при переходе между foreground и background.",
    },
  },
  {
    id: 10,
    category: "git",
    categoryLabel: {
      en: "Git Basics",
      ru: "Основы Git",
    },
    difficulty: "easy",
    question: {
      en: "What does a Git commit represent?",
      ru: "Что представляет собой Git commit?",
    },
    options: [
      {
        en: "A saved snapshot of project changes",
        ru: "Сохранённый снимок изменений проекта",
      },
      {
        en: "A deleted repository",
        ru: "Удалённый репозиторий",
      },
      {
        en: "An installed dependency",
        ru: "Установленную зависимость",
      },
      {
        en: "A production server",
        ru: "Production-сервер",
      },
    ],
    correctOptionIndex: 0,
    explanation: {
      en: "A commit records a snapshot of staged project changes with a message and identifier.",
      ru: "Commit фиксирует снимок подготовленных изменений проекта с сообщением и уникальным идентификатором.",
    },
  },
];
