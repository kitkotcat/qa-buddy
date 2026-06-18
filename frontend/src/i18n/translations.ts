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
      clear: "Clear",
      generate: "Generate",
      loading: "Loading...",
      error: "Something went wrong.",
      backendError: "Please check that backend is running.",
    },
    app: {
      title: "QA Buddy",
      subtitle:
        "A fullstack assistant for beginner QA engineers: bug reports, test cases, checklists and interview training.",
    },
    home: {
      badge: "QA Buddy MVP",
      title: "Your personal QA practice assistant",
      description:
        "Generate bug reports, create test cases, use QA checklists and prepare for interviews in one place.",
      featuresTitle: "Main Tools",
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
      clear: "Очистить",
      generate: "Сгенерировать",
      loading: "Загрузка...",
      error: "Что-то пошло не так.",
      backendError: "Проверь, что backend запущен.",
    },
    app: {
      title: "QA Buddy",
      subtitle:
        "Fullstack-помощник для начинающих QA: баг-репорты, тест-кейсы, чек-листы и подготовка к интервью.",
    },
    home: {
      badge: "QA Buddy MVP",
      title: "Твой личный помощник для практики QA",
      description:
        "Создавай баг-репорты, тест-кейсы, используй QA чек-листы и готовься к интервью в одном приложении.",
      featuresTitle: "Основные инструменты",
    },
  },
} as const;

export type Language = keyof typeof translations;
