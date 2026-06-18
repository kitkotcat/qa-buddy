export const translations = {
  en: {
    nav: {
      home: "Home",
      bugReports: "Bug Reports",
      testCases: "Test Cases",
      checklists: "Checklists",
      interview: "Interview",
      about: "About",
    },
    language: {
      label: "Language",
      en: "EN",
      ru: "RU",
    },
    common: {
      copy: "Copy",
      copied: "Copied to clipboard.",
      clear: "Clear",
      generate: "Generate",
      loading: "Loading...",
      error: "Something went wrong.",
      backendError: "Please check that backend is running.",
      requiredError: "Please fill in all required fields.",
      result: "Result",
      status: "Status",
      category: "Category",
      priority: "Priority",
      severity: "Severity",
      preconditions: "Preconditions",
      steps: "Steps",
      expectedResult: "Expected result",
      actualResult: "Actual result",
    },
    home: {
      badge: "QA Buddy MVP",
      title: "Your personal QA practice assistant",
      description:
        "Generate bug reports, create test cases, use QA checklists and prepare for interviews in one place.",
      featuresTitle: "Main Tools",
      bugReportsTitle: "Bug Report Generator",
      bugReportsDescription:
        "Create structured bug reports with severity, priority, steps and expected result.",
      testCasesTitle: "Test Case Generator",
      testCasesDescription:
        "Generate clear test cases for features, requirements and user flows.",
      checklistsTitle: "Checklist Library",
      checklistsDescription:
        "Use ready-made QA checklists for web, API, forms and e-commerce testing.",
      interviewTitle: "Interview Trainer",
      interviewDescription:
        "Practice QA interview questions with short and detailed answers.",
      openTool: "Open tool",
    },
    bugReports: {
      badge: "QA Buddy Tool",
      title: "Bug Report Generator",
      description:
        "Create a structured bug report for manual testing. Fill in the fields and generate a clean report.",
      projectName: "Project name",
      environment: "Environment",
      summary: "Summary",
      attachmentLink: "Attachment link",
      generateButton: "Generate bug report",
      clearButton: "Clear form",
      copyButton: "Copy report",
      resultTitle: "Generated bug report",
      projectNamePlaceholder: "QA Buddy",
      environmentPlaceholder: "Chrome, macOS, local environment",
      summaryPlaceholder: "Short description of the issue",
      preconditionsPlaceholder: "User is logged in and opened the page",
      stepsPlaceholder: "Open page\nClick button\nCheck result",
      actualResultPlaceholder: "What happens now",
      expectedResultPlaceholder: "What should happen",
      attachmentPlaceholder: "Screenshot or video link",
      success: "Bug report generated successfully.",
    },
    testCases: {
      badge: "QA Buddy Tool",
      title: "Test Case Generator",
      description:
        "Create structured test cases for features and requirements.",
      featureName: "Feature name",
      requirement: "Requirement",
      testType: "Test type",
      generateButton: "Generate test case",
      clearButton: "Clear form",
      copyButton: "Copy test case",
      resultTitle: "Generated test case",
      featureNamePlaceholder: "Login",
      requirementPlaceholder:
        "User should be able to log in with valid email and password.",
      preconditionsPlaceholder:
        "User is registered and located on the login page.",
      stepsPlaceholder: "Open login page\nEnter email\nEnter password\nClick Login",
      expectedResultPlaceholder:
        "User is redirected to the account page.",
      success: "Test case generated successfully.",
    },
    checklists: {
      badge: "QA Buddy Tool",
      title: "Checklist Library",
      description:
        "Use QA checklists for common testing areas. Mark completed items and copy checklist content.",
      libraryTitle: "Checklist library",
      selectedTitle: "Selected checklist",
      progress: "Progress",
      completed: "completed",
      reset: "Reset checks",
      copy: "Copy checklist",
      noChecklist: "No checklist selected.",
      loading: "Loading checklists...",
      loadError:
        "Could not load checklists. Please check that backend is running.",
      practiceTipTitle: "Practice tip",
      practiceTipText:
        "Use checklists during smoke testing, regression testing and feature testing. They help avoid missing important checks.",
    },
    interview: {
      badge: "QA Buddy Tool",
      title: "Interview Trainer",
      description:
        "Practice QA interview questions by category. Learn short answers for quick interviews and detailed answers for deeper preparation.",
      libraryTitle: "Training library",
      questions: "Questions",
      randomQuestion: "Random question",
      selectedQuestion: "Selected question",
      shortAnswer: "Short answer",
      detailedAnswer: "Detailed answer",
      copyAnswer: "Copy answer",
      loadingQuestions: "Loading interview questions...",
      loadingSelected: "Loading selected question...",
      loadError:
        "Could not load interview questions. Please check that backend is running.",
      loadSelectedError: "Could not load selected interview question.",
      loadRandomError: "Could not load random interview question.",
      practiceTipTitle: "Practice tip",
      practiceTipText:
        "First, try to answer the question yourself. Then open the short answer. Use the detailed answer only after your first attempt.",
    },
    about: {
      badge: "About Project",
      title: "About QA Buddy",
      description:
        "QA Buddy is a fullstack portfolio project for beginner QA engineers.",
      goalTitle: "Project goal",
      goalText:
        "The goal of the project is to demonstrate practical skills in manual QA, API testing, frontend development, backend development, automated backend testing and GitHub workflow.",
      stackTitle: "Tech stack",
      featuresTitle: "Implemented features",
      docsTitle: "Documentation",
      docsText:
        "The repository contains requirements, test plan, API testing notes, test cases, bug reports, release notes and screenshots.",
      roadmapTitle: "Roadmap",
      roadmapText:
        "Next steps: add bilingual backend data, localStorage, search, database, export features and deployment.",
    },
  },

  ru: {
    nav: {
      home: "Главная",
      bugReports: "Баг-репорты",
      testCases: "Тест-кейсы",
      checklists: "Чек-листы",
      interview: "Интервью",
      about: "О проекте",
    },
    language: {
      label: "Язык",
      en: "EN",
      ru: "RU",
    },
    common: {
      copy: "Скопировать",
      copied: "Скопировано в буфер обмена.",
      clear: "Очистить",
      generate: "Сгенерировать",
      loading: "Загрузка...",
      error: "Что-то пошло не так.",
      backendError: "Проверь, что backend запущен.",
      requiredError: "Заполни все обязательные поля.",
      result: "Результат",
      status: "Статус",
      category: "Категория",
      priority: "Приоритет",
      severity: "Критичность",
      preconditions: "Предусловия",
      steps: "Шаги",
      expectedResult: "Ожидаемый результат",
      actualResult: "Фактический результат",
    },
    home: {
      badge: "QA Buddy MVP",
      title: "Твой личный помощник для практики QA",
      description:
        "Создавай баг-репорты, тест-кейсы, используй QA чек-листы и готовься к интервью в одном приложении.",
      featuresTitle: "Основные инструменты",
      bugReportsTitle: "Генератор баг-репортов",
      bugReportsDescription:
        "Создавай структурированные баг-репорты с criticality, priority, шагами и ожидаемым результатом.",
      testCasesTitle: "Генератор тест-кейсов",
      testCasesDescription:
        "Формируй понятные тест-кейсы для фич, требований и пользовательских сценариев.",
      checklistsTitle: "Библиотека чек-листов",
      checklistsDescription:
        "Используй готовые QA чек-листы для web, API, форм и e-commerce тестирования.",
      interviewTitle: "Тренажёр интервью",
      interviewDescription:
        "Тренируй QA-вопросы с короткими и подробными ответами.",
      openTool: "Открыть инструмент",
    },
    bugReports: {
      badge: "QA Buddy Tool",
      title: "Генератор баг-репортов",
      description:
        "Создай структурированный баг-репорт для ручного тестирования. Заполни поля и получи аккуратный отчёт.",
      projectName: "Название проекта",
      environment: "Окружение",
      summary: "Краткое описание",
      attachmentLink: "Ссылка на вложение",
      generateButton: "Сгенерировать баг-репорт",
      clearButton: "Очистить форму",
      copyButton: "Скопировать отчёт",
      resultTitle: "Сгенерированный баг-репорт",
      projectNamePlaceholder: "QA Buddy",
      environmentPlaceholder: "Chrome, macOS, local environment",
      summaryPlaceholder: "Краткое описание проблемы",
      preconditionsPlaceholder: "Пользователь авторизован и открыл страницу",
      stepsPlaceholder: "Открыть страницу\nНажать кнопку\nПроверить результат",
      actualResultPlaceholder: "Что происходит сейчас",
      expectedResultPlaceholder: "Что должно происходить",
      attachmentPlaceholder: "Ссылка на скриншот или видео",
      success: "Баг-репорт успешно сгенерирован.",
    },
    testCases: {
      badge: "QA Buddy Tool",
      title: "Генератор тест-кейсов",
      description:
        "Создавай структурированные тест-кейсы для фич и требований.",
      featureName: "Название фичи",
      requirement: "Требование",
      testType: "Тип теста",
      generateButton: "Сгенерировать тест-кейс",
      clearButton: "Очистить форму",
      copyButton: "Скопировать тест-кейс",
      resultTitle: "Сгенерированный тест-кейс",
      featureNamePlaceholder: "Login",
      requirementPlaceholder:
        "Пользователь должен иметь возможность войти с валидным email и паролем.",
      preconditionsPlaceholder:
        "Пользователь зарегистрирован и находится на странице логина.",
      stepsPlaceholder:
        "Открыть страницу логина\nВвести email\nВвести пароль\nНажать Login",
      expectedResultPlaceholder:
        "Пользователь перенаправлен на страницу аккаунта.",
      success: "Тест-кейс успешно сгенерирован.",
    },
    checklists: {
      badge: "QA Buddy Tool",
      title: "Библиотека чек-листов",
      description:
        "Используй QA чек-листы для популярных областей тестирования. Отмечай выполненные пункты и копируй чек-лист.",
      libraryTitle: "Библиотека чек-листов",
      selectedTitle: "Выбранный чек-лист",
      progress: "Прогресс",
      completed: "выполнено",
      reset: "Сбросить отметки",
      copy: "Скопировать чек-лист",
      noChecklist: "Чек-лист не выбран.",
      loading: "Загрузка чек-листов...",
      loadError: "Не удалось загрузить чек-листы. Проверь, что backend запущен.",
      practiceTipTitle: "Совет для практики",
      practiceTipText:
        "Используй чек-листы во время smoke, regression и feature testing. Они помогают не пропустить важные проверки.",
    },
    interview: {
      badge: "QA Buddy Tool",
      title: "Тренажёр интервью",
      description:
        "Тренируй QA-вопросы по категориям. Используй короткие ответы для быстрых интервью и подробные ответы для глубокой подготовки.",
      libraryTitle: "Библиотека тренировки",
      questions: "Вопросы",
      randomQuestion: "Случайный вопрос",
      selectedQuestion: "Выбранный вопрос",
      shortAnswer: "Короткий ответ",
      detailedAnswer: "Подробный ответ",
      copyAnswer: "Скопировать ответ",
      loadingQuestions: "Загрузка вопросов...",
      loadingSelected: "Загрузка выбранного вопроса...",
      loadError: "Не удалось загрузить вопросы. Проверь, что backend запущен.",
      loadSelectedError: "Не удалось загрузить выбранный вопрос.",
      loadRandomError: "Не удалось загрузить случайный вопрос.",
      practiceTipTitle: "Совет для практики",
      practiceTipText:
        "Сначала попробуй ответить сама. Потом открой короткий ответ. Подробный ответ используй после первой попытки.",
    },
    about: {
      badge: "О проекте",
      title: "О QA Buddy",
      description:
        "QA Buddy — fullstack-проект для портфолио начинающего QA-инженера.",
      goalTitle: "Цель проекта",
      goalText:
        "Цель проекта — показать практические навыки в manual QA, API testing, frontend-разработке, backend-разработке, автоматизированном backend-тестировании и работе с GitHub.",
      stackTitle: "Технологический стек",
      featuresTitle: "Реализованные функции",
      docsTitle: "Документация",
      docsText:
        "В репозитории есть requirements, test plan, API testing notes, test cases, bug reports, release notes и screenshots.",
      roadmapTitle: "Roadmap",
      roadmapText:
        "Следующие шаги: добавить bilingual backend data, localStorage, поиск, базу данных, export-функции и deployment.",
    },
  },
} as const;

export type Language = keyof typeof translations;
