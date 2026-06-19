import type { QuizQuestion } from "./quizQuestions";

export const additionalQuizQuestions: QuizQuestion[] = [
  {
    id: 11,
    category: "qa-theory",
    categoryLabel: {
      en: "QA Theory",
      ru: "Теория QA",
    },
    difficulty: "easy",
    question: {
      en: "What is the main purpose of smoke testing?",
      ru: "Какова основная цель smoke testing?",
    },
    options: [
      {
        en: "To verify that the main functions work and the build is testable",
        ru: "Проверить, что основные функции работают и сборка пригодна для дальнейшего тестирования",
      },
      {
        en: "To test every possible scenario",
        ru: "Проверить все возможные сценарии",
      },
      {
        en: "To measure database performance",
        ru: "Измерить производительность базы данных",
      },
      {
        en: "To replace regression testing",
        ru: "Заменить regression testing",
      },
    ],
    correctOptionIndex: 0,
    explanation: {
      en: "Smoke testing is a quick check of critical functionality. It helps determine whether a build is stable enough for deeper testing.",
      ru: "Smoke testing — это быстрая проверка критически важной функциональности. Она помогает определить, подходит ли сборка для дальнейшего тестирования.",
    },
  },
  {
    id: 12,
    category: "qa-theory",
    categoryLabel: {
      en: "QA Theory",
      ru: "Теория QA",
    },
    difficulty: "medium",
    question: {
      en: "What is the difference between verification and validation?",
      ru: "В чём разница между verification и validation?",
    },
    options: [
      {
        en: "Verification checks whether the product is built correctly; validation checks whether the correct product is built",
        ru: "Verification проверяет, правильно ли создаётся продукт; validation — тот ли продукт создаётся",
      },
      {
        en: "Verification is manual and validation is always automated",
        ru: "Verification выполняется вручную, а validation всегда автоматизирована",
      },
      {
        en: "Validation is performed only after release",
        ru: "Validation выполняется только после релиза",
      },
      {
        en: "There is no difference",
        ru: "Разницы нет",
      },
    ],
    correctOptionIndex: 0,
    explanation: {
      en: "Verification checks compliance with specifications. Validation checks whether the product satisfies real user needs.",
      ru: "Verification проверяет соответствие спецификациям. Validation проверяет, решает ли продукт реальные задачи пользователя.",
    },
  },
  {
    id: 13,
    category: "test-design",
    categoryLabel: {
      en: "Test Design",
      ru: "Тест-дизайн",
    },
    difficulty: "medium",
    question: {
      en: "What values should be checked for a field that accepts numbers from 1 to 100?",
      ru: "Какие значения нужно проверить для поля, принимающего числа от 1 до 100?",
    },
    options: [
      {
        en: "Only 1 and 100",
        ru: "Только 1 и 100",
      },
      {
        en: "0, 1, 2, 99, 100 and 101",
        ru: "0, 1, 2, 99, 100 и 101",
      },
      {
        en: "Only 50",
        ru: "Только 50",
      },
      {
        en: "Every number from 1 to 100",
        ru: "Все числа от 1 до 100",
      },
    ],
    correctOptionIndex: 1,
    explanation: {
      en: "Boundary value analysis checks values directly on, below and above the boundaries.",
      ru: "Анализ граничных значений проверяет значения на границе, непосредственно ниже и выше неё.",
    },
  },
  {
    id: 14,
    category: "test-design",
    categoryLabel: {
      en: "Test Design",
      ru: "Тест-дизайн",
    },
    difficulty: "medium",
    question: {
      en: "What is equivalence partitioning?",
      ru: "Что такое equivalence partitioning?",
    },
    options: [
      {
        en: "Dividing input data into groups expected to behave similarly",
        ru: "Разделение входных данных на группы с одинаковым ожидаемым поведением",
      },
      {
        en: "Testing only positive scenarios",
        ru: "Проверка только положительных сценариев",
      },
      {
        en: "Testing all possible combinations",
        ru: "Проверка всех возможных комбинаций",
      },
      {
        en: "Dividing testers into teams",
        ru: "Разделение тестировщиков на команды",
      },
    ],
    correctOptionIndex: 0,
    explanation: {
      en: "One representative value can often be selected from each equivalence class instead of testing every possible input.",
      ru: "Из каждого класса эквивалентности можно выбрать одно репрезентативное значение вместо проверки всех возможных данных.",
    },
  },
  {
    id: 15,
    category: "bug-reports",
    categoryLabel: {
      en: "Bug Reports",
      ru: "Баг-репорты",
    },
    difficulty: "easy",
    question: {
      en: "Which bug report summary is the most informative?",
      ru: "Какой Summary баг-репорта наиболее информативен?",
    },
    options: [
      {
        en: "Button does not work",
        ru: "Кнопка не работает",
      },
      {
        en: "An error occurs",
        ru: "Возникает ошибка",
      },
      {
        en: "Checkout button does not open the payment page after adding an available product to the cart",
        ru: "Кнопка оформления заказа не открывает страницу оплаты после добавления доступного товара в корзину",
      },
      {
        en: "There is a bug on the site",
        ru: "На сайте есть баг",
      },
    ],
    correctOptionIndex: 2,
    explanation: {
      en: "A good summary briefly describes the affected element, action, condition and incorrect behavior.",
      ru: "Хороший Summary кратко описывает затронутый элемент, действие, условие и некорректное поведение.",
    },
  },
  {
    id: 16,
    category: "bug-reports",
    categoryLabel: {
      en: "Bug Reports",
      ru: "Баг-репорты",
    },
    difficulty: "medium",
    question: {
      en: "A typo is displayed on the main advertising banner. What is the likely combination?",
      ru: "На главном рекламном баннере отображается опечатка. Какая комбинация наиболее вероятна?",
    },
    options: [
      {
        en: "Low severity and high priority",
        ru: "Low severity и high priority",
      },
      {
        en: "Critical severity and low priority",
        ru: "Critical severity и low priority",
      },
      {
        en: "Blocker severity and high priority",
        ru: "Blocker severity и high priority",
      },
      {
        en: "High severity and no priority",
        ru: "High severity без priority",
      },
    ],
    correctOptionIndex: 0,
    explanation: {
      en: "The typo has little technical impact but may be urgent because it is visible to many users and affects the business image.",
      ru: "Опечатка почти не влияет на работу системы, но может требовать срочного исправления из-за заметности и влияния на имидж.",
    },
  },
  {
    id: 17,
    category: "api",
    categoryLabel: {
      en: "API Testing",
      ru: "API-тестирование",
    },
    difficulty: "easy",
    question: {
      en: "What does HTTP status code 201 usually mean?",
      ru: "Что обычно означает HTTP status code 201?",
    },
    options: [
      {
        en: "The resource was successfully created",
        ru: "Ресурс был успешно создан",
      },
      {
        en: "The resource was not found",
        ru: "Ресурс не найден",
      },
      {
        en: "Authentication failed",
        ru: "Ошибка аутентификации",
      },
      {
        en: "The server encountered an internal error",
        ru: "На сервере произошла внутренняя ошибка",
      },
    ],
    correctOptionIndex: 0,
    explanation: {
      en: "201 Created indicates that the request succeeded and a new resource was created.",
      ru: "201 Created означает, что запрос выполнен успешно и новый ресурс создан.",
    },
  },
  {
    id: 18,
    category: "api",
    categoryLabel: {
      en: "API Testing",
      ru: "API-тестирование",
    },
    difficulty: "medium",
    question: {
      en: "What is the typical difference between PUT and PATCH?",
      ru: "В чём обычно заключается разница между PUT и PATCH?",
    },
    options: [
      {
        en: "PUT normally replaces a resource; PATCH partially updates it",
        ru: "PUT обычно заменяет ресурс, PATCH частично обновляет его",
      },
      {
        en: "PUT reads data and PATCH deletes it",
        ru: "PUT получает данные, PATCH удаляет их",
      },
      {
        en: "PATCH can only be used without authorization",
        ru: "PATCH можно использовать только без авторизации",
      },
      {
        en: "There is always no difference",
        ru: "Разницы никогда нет",
      },
    ],
    correctOptionIndex: 0,
    explanation: {
      en: "PUT commonly sends a complete resource representation, while PATCH sends only fields that should be changed.",
      ru: "PUT обычно отправляет полное представление ресурса, а PATCH — только поля, которые нужно изменить.",
    },
  },
  {
    id: 19,
    category: "api",
    categoryLabel: {
      en: "API Testing",
      ru: "API-тестирование",
    },
    difficulty: "medium",
    question: {
      en: "Which check is important when testing a DELETE request?",
      ru: "Какая проверка важна при тестировании DELETE-запроса?",
    },
    options: [
      {
        en: "Verify that the resource is no longer available after deletion",
        ru: "Убедиться, что после удаления ресурс больше недоступен",
      },
      {
        en: "Verify only the button color",
        ru: "Проверить только цвет кнопки",
      },
      {
        en: "Verify that a new resource was created",
        ru: "Убедиться, что был создан новый ресурс",
      },
      {
        en: "Ignore the response status",
        ru: "Игнорировать статус ответа",
      },
    ],
    correctOptionIndex: 0,
    explanation: {
      en: "The status code alone is not enough. A follow-up GET request can confirm that the resource was actually deleted.",
      ru: "Одного status code недостаточно. Последующий GET-запрос может подтвердить, что ресурс действительно удалён.",
    },
  },
  {
    id: 20,
    category: "api",
    categoryLabel: {
      en: "API Testing",
      ru: "API-тестирование",
    },
    difficulty: "hard",
    question: {
      en: "Which scenario is an example of negative API testing?",
      ru: "Какой сценарий является примером негативного API-тестирования?",
    },
    options: [
      {
        en: "Sending a request with a missing required field",
        ru: "Отправка запроса без обязательного поля",
      },
      {
        en: "Sending a valid request and receiving 200",
        ru: "Отправка валидного запроса и получение 200",
      },
      {
        en: "Opening API documentation",
        ru: "Открытие документации API",
      },
      {
        en: "Saving a valid Postman collection",
        ru: "Сохранение валидной коллекции Postman",
      },
    ],
    correctOptionIndex: 0,
    explanation: {
      en: "Negative testing verifies how the API handles invalid, missing, unauthorized or unexpected input.",
      ru: "Негативное тестирование проверяет обработку невалидных, отсутствующих, неавторизованных или неожиданных данных.",
    },
  },
  {
    id: 21,
    category: "sql",
    categoryLabel: {
      en: "SQL Basics",
      ru: "Основы SQL",
    },
    difficulty: "easy",
    question: {
      en: "Which SQL clause filters rows?",
      ru: "Какой SQL-оператор фильтрует строки?",
    },
    options: [
      { en: "WHERE", ru: "WHERE" },
      { en: "ORDER BY", ru: "ORDER BY" },
      { en: "SELECT", ru: "SELECT" },
      { en: "CREATE", ru: "CREATE" },
    ],
    correctOptionIndex: 0,
    explanation: {
      en: "WHERE specifies conditions that rows must satisfy to be included in the result.",
      ru: "WHERE задаёт условия, которым должны соответствовать строки результата.",
    },
  },
  {
    id: 22,
    category: "sql",
    categoryLabel: {
      en: "SQL Basics",
      ru: "Основы SQL",
    },
    difficulty: "medium",
    question: {
      en: "What is JOIN used for?",
      ru: "Для чего используется JOIN?",
    },
    options: [
      {
        en: "To combine related rows from multiple tables",
        ru: "Для объединения связанных строк из нескольких таблиц",
      },
      {
        en: "To delete a database",
        ru: "Для удаления базы данных",
      },
      {
        en: "To sort one text field",
        ru: "Для сортировки одного текстового поля",
      },
      {
        en: "To create an HTTP request",
        ru: "Для создания HTTP-запроса",
      },
    ],
    correctOptionIndex: 0,
    explanation: {
      en: "JOIN combines data from tables using related columns, such as user_id or product_id.",
      ru: "JOIN объединяет данные таблиц по связанным столбцам, например user_id или product_id.",
    },
  },
  {
    id: 23,
    category: "sql",
    categoryLabel: {
      en: "SQL Basics",
      ru: "Основы SQL",
    },
    difficulty: "easy",
    question: {
      en: "Which SQL function counts rows?",
      ru: "Какая SQL-функция подсчитывает количество строк?",
    },
    options: [
      { en: "COUNT()", ru: "COUNT()" },
      { en: "SUM()", ru: "SUM()" },
      { en: "AVG()", ru: "AVG()" },
      { en: "LOWER()", ru: "LOWER()" },
    ],
    correctOptionIndex: 0,
    explanation: {
      en: "COUNT() returns the number of matching rows.",
      ru: "COUNT() возвращает количество строк, соответствующих условию.",
    },
  },
  {
    id: 24,
    category: "devtools",
    categoryLabel: {
      en: "DevTools",
      ru: "DevTools",
    },
    difficulty: "medium",
    question: {
      en: "Where can you inspect the body sent by a request in DevTools?",
      ru: "Где в DevTools можно посмотреть тело отправленного запроса?",
    },
    options: [
      {
        en: "Network → request → Payload",
        ru: "Network → запрос → Payload",
      },
      {
        en: "Elements → Styles",
        ru: "Elements → Styles",
      },
      {
        en: "Console → Clear console",
        ru: "Console → Clear console",
      },
      {
        en: "Sources → Breakpoints",
        ru: "Sources → Breakpoints",
      },
    ],
    correctOptionIndex: 0,
    explanation: {
      en: "The Payload section displays request body data, form data or query parameters.",
      ru: "Раздел Payload показывает body запроса, form data или query parameters.",
    },
  },
  {
    id: 25,
    category: "postman",
    categoryLabel: {
      en: "Postman",
      ru: "Postman",
    },
    difficulty: "medium",
    question: {
      en: "Why are environment variables useful in Postman?",
      ru: "Для чего полезны environment variables в Postman?",
    },
    options: [
      {
        en: "They allow values such as base URLs and tokens to be reused and switched",
        ru: "Они позволяют переиспользовать и переключать base URL, tokens и другие значения",
      },
      {
        en: "They automatically fix all API defects",
        ru: "Они автоматически исправляют все дефекты API",
      },
      {
        en: "They replace request methods",
        ru: "Они заменяют методы запросов",
      },
      {
        en: "They make authentication unnecessary",
        ru: "Они отменяют необходимость авторизации",
      },
    ],
    correctOptionIndex: 0,
    explanation: {
      en: "Variables help run the same collection in local, test and production-like environments without rewriting every request.",
      ru: "Переменные позволяют запускать одну коллекцию в разных окружениях без изменения каждого запроса.",
    },
  },
  {
    id: 26,
    category: "mobile",
    categoryLabel: {
      en: "Mobile Testing",
      ru: "Мобильное тестирование",
    },
    difficulty: "medium",
    question: {
      en: "What should happen if a user denies an optional application permission?",
      ru: "Что должно произойти, если пользователь отклонил необязательное разрешение приложения?",
    },
    options: [
      {
        en: "The app should continue working and explain limitations where necessary",
        ru: "Приложение должно продолжить работу и при необходимости объяснить ограничения",
      },
      {
        en: "The device should restart",
        ru: "Устройство должно перезагрузиться",
      },
      {
        en: "All user data should be deleted",
        ru: "Все данные пользователя должны быть удалены",
      },
      {
        en: "The app must always crash",
        ru: "Приложение обязательно должно завершиться с ошибкой",
      },
    ],
    correctOptionIndex: 0,
    explanation: {
      en: "Optional permission denial should be handled gracefully. Only related functionality should be limited.",
      ru: "Отказ в необязательном разрешении должен обрабатываться корректно. Ограничиваться должна только связанная функциональность.",
    },
  },
  {
    id: 27,
    category: "mobile",
    categoryLabel: {
      en: "Mobile Testing",
      ru: "Мобильное тестирование",
    },
    difficulty: "medium",
    question: {
      en: "Which scenario should be checked during an application update?",
      ru: "Какой сценарий нужно проверить при обновлении приложения?",
    },
    options: [
      {
        en: "Previously saved user data and settings remain available",
        ru: "Ранее сохранённые данные и настройки пользователя остаются доступными",
      },
      {
        en: "The operating system is automatically deleted",
        ru: "Операционная система автоматически удаляется",
      },
      {
        en: "The app always requests every permission again",
        ru: "Приложение обязательно повторно запрашивает все разрешения",
      },
      {
        en: "Only the application icon is checked",
        ru: "Проверяется только иконка приложения",
      },
    ],
    correctOptionIndex: 0,
    explanation: {
      en: "Upgrade testing should verify installation, launch, data migration, saved settings and backward compatibility.",
      ru: "Тестирование обновления должно включать установку, запуск, миграцию данных, сохранение настроек и совместимость.",
    },
  },
  {
    id: 28,
    category: "git",
    categoryLabel: {
      en: "Git Basics",
      ru: "Основы Git",
    },
    difficulty: "medium",
    question: {
      en: "Why are feature branches useful?",
      ru: "Для чего используются feature branches?",
    },
    options: [
      {
        en: "They isolate work on a feature from the stable main branch",
        ru: "Они изолируют разработку функции от стабильной ветки main",
      },
      {
        en: "They permanently delete commit history",
        ru: "Они навсегда удаляют историю коммитов",
      },
      {
        en: "They replace all automated tests",
        ru: "Они заменяют все автоматизированные тесты",
      },
      {
        en: "They can only store documentation",
        ru: "Они могут хранить только документацию",
      },
    ],
    correctOptionIndex: 0,
    explanation: {
      en: "Feature branches allow changes to be developed, reviewed and tested before merging into the main branch.",
      ru: "Feature branches позволяют разработать, проверить и протестировать изменения до их слияния с main.",
    },
  },
  {
    id: 29,
    category: "git",
    categoryLabel: {
      en: "Git Basics",
      ru: "Основы Git",
    },
    difficulty: "medium",
    question: {
      en: "What does git pull normally do?",
      ru: "Что обычно делает команда git pull?",
    },
    options: [
      {
        en: "Fetches remote changes and integrates them into the current branch",
        ru: "Получает удалённые изменения и интегрирует их в текущую ветку",
      },
      {
        en: "Deletes the remote repository",
        ru: "Удаляет удалённый репозиторий",
      },
      {
        en: "Creates an Android APK",
        ru: "Создаёт Android APK",
      },
      {
        en: "Runs backend tests",
        ru: "Запускает backend-тесты",
      },
    ],
    correctOptionIndex: 0,
    explanation: {
      en: "git pull is commonly equivalent to git fetch followed by merge or rebase, depending on configuration.",
      ru: "git pull обычно получает удалённые изменения, а затем выполняет merge или rebase в зависимости от настроек.",
    },
  },
  {
    id: 30,
    category: "test-cases",
    categoryLabel: {
      en: "Test Cases",
      ru: "Тест-кейсы",
    },
    difficulty: "easy",
    question: {
      en: "What do test case preconditions describe?",
      ru: "Что описывают предусловия тест-кейса?",
    },
    options: [
      {
        en: "The system state required before executing the test steps",
        ru: "Состояние системы, необходимое до выполнения шагов",
      },
      {
        en: "Only the actual result",
        ru: "Только фактический результат",
      },
      {
        en: "The developer's salary",
        ru: "Зарплату разработчика",
      },
      {
        en: "The production release date",
        ru: "Дату production-релиза",
      },
    ],
    correctOptionIndex: 0,
    explanation: {
      en: "Preconditions describe required data, authorization, configuration or system state before the test begins.",
      ru: "Предусловия описывают необходимые данные, авторизацию, настройки или состояние системы до начала теста.",
    },
  },
];
