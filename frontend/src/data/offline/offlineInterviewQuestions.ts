export const offlineInterviewQuestionsByLanguage = {
  "en": [
    {
      "id": 1,
      "category": "Theory QA",
      "question": "What is software testing?",
      "short_answer": "Software testing is the process of checking whether a product works according to requirements and user expectations.",
      "detailed_answer": "Software testing helps find defects, reduce risks and improve product quality. A QA engineer checks functionality, usability, API behavior, edge cases and possible negative scenarios."
    },
    {
      "id": 2,
      "category": "Theory QA",
      "question": "What is the difference between verification and validation?",
      "short_answer": "Verification checks whether we build the product right. Validation checks whether we build the right product.",
      "detailed_answer": "Verification is usually related to requirements, documentation, design and implementation checks. Validation is focused on whether the product solves the real user need and works as expected in real scenarios."
    },
    {
      "id": 3,
      "category": "Bug reports",
      "question": "What should a good bug report contain?",
      "short_answer": "A good bug report should contain summary, environment, preconditions, steps, actual result, expected result, severity, priority and attachments if needed.",
      "detailed_answer": "A good bug report should be clear, reproducible and useful for developers. It should explain where the issue happens, how to reproduce it, what actually happens and what should happen instead."
    },
    {
      "id": 4,
      "category": "Bug reports",
      "question": "What is the difference between severity and priority?",
      "short_answer": "Severity shows how serious the bug is for the system. Priority shows how soon it should be fixed.",
      "detailed_answer": "Severity is about technical and business impact. Priority is about planning and urgency. For example, a typo on the main page can have low severity but high priority if it affects brand reputation."
    },
    {
      "id": 5,
      "category": "Test cases",
      "question": "What is a test case?",
      "short_answer": "A test case is a documented scenario with preconditions, steps, expected result and status.",
      "detailed_answer": "A test case helps QA engineers verify specific functionality in a structured way. It usually includes ID, title, preconditions, steps, expected result, actual result, status, priority and related requirement."
    },
    {
      "id": 6,
      "category": "HTTP",
      "question": "What does status code 404 mean?",
      "short_answer": "404 Not Found means that the requested resource was not found on the server.",
      "detailed_answer": "For example, if the client sends a request to an endpoint that does not exist, the server can return 404. In testing, QA should verify both the status code and the error response body."
    },
    {
      "id": 7,
      "category": "API testing",
      "question": "What do you usually check during API testing?",
      "short_answer": "I check status codes, response body, response schema, headers, validation, negative cases and response time.",
      "detailed_answer": "During API testing I check positive and negative scenarios, required fields, invalid data, authorization, error messages, response structure and whether API behavior matches requirements."
    },
    {
      "id": 8,
      "category": "SQL basics",
      "question": "What is SQL used for?",
      "short_answer": "SQL is used to work with relational databases: select, insert, update and delete data.",
      "detailed_answer": "For QA engineers SQL is useful for checking test data, verifying database changes after actions in UI or API, and preparing data for test scenarios."
    },
    {
      "id": 9,
      "category": "DevTools",
      "question": "What do you use DevTools for?",
      "short_answer": "I use DevTools to inspect elements, check console errors, network requests, status codes and response data.",
      "detailed_answer": "DevTools helps QA engineers analyze frontend behavior, reproduce issues, check API requests from the browser, inspect payloads, response bodies, headers and performance problems."
    },
    {
      "id": 10,
      "category": "Postman",
      "question": "What is Postman used for?",
      "short_answer": "Postman is used for sending API requests and checking responses.",
      "detailed_answer": "In Postman QA engineers can create requests, test different methods like GET, POST, PUT, PATCH and DELETE, check status codes, response body, headers and save collections."
    },
    {
      "id": 11,
      "category": "English interview",
      "question": "Tell me about yourself.",
      "short_answer": "I am a beginner QA engineer. I study manual testing, API testing and Python automation. I want to gain real experience on a real product.",
      "detailed_answer": "I have a technical background and I am actively developing my QA skills. I practice test documentation, API testing, DevTools, Postman and Python. I am motivated to grow as a QA engineer and work on real product tasks."
    },
    {
      "id": 12,
      "category": "English interview",
      "question": "Why do you want to become a QA engineer?",
      "short_answer": "I like finding issues, analyzing details and improving product quality.",
      "detailed_answer": "I chose QA because it combines analytical thinking, attention to detail and communication. I enjoy checking how products work, finding bugs and helping the team deliver better quality."
    },
    {
      "id": 13,
      "category": "Test cases",
      "question": "What is the difference between a test case and a checklist?",
      "short_answer": "A test case is more detailed and contains steps and expected result. A checklist is a shorter list of checks.",
      "detailed_answer": "A test case is used when we need a structured scenario with preconditions, exact steps and expected result. A checklist is useful for quick smoke, regression or exploratory testing when we need to remember important areas to check."
    },
    {
      "id": 14,
      "category": "API testing",
      "question": "What is the difference between GET and POST?",
      "short_answer": "GET is used to request data. POST is used to create or send data to the server.",
      "detailed_answer": "GET requests usually do not have a request body and should not change server data. POST requests usually send data in the body and can create new resources or trigger actions on the server."
    }
  ],
  "ru": [
    {
      "id": 1,
      "category": "Теория QA",
      "question": "Что такое тестирование программного обеспечения?",
      "short_answer": "Тестирование ПО — это процесс проверки, работает ли продукт согласно требованиям и ожиданиям пользователя.",
      "detailed_answer": "Тестирование ПО помогает находить дефекты, снижать риски и повышать качество продукта. QA-инженер проверяет функциональность, удобство использования, работу API, граничные значения и негативные сценарии."
    },
    {
      "id": 2,
      "category": "Теория QA",
      "question": "В чём разница между verification и validation?",
      "short_answer": "Verification проверяет, правильно ли мы создаём продукт. Validation проверяет, тот ли продукт мы создаём.",
      "detailed_answer": "Verification чаще относится к проверке требований, документации, дизайна и реализации. Validation фокусируется на том, решает ли продукт реальную задачу пользователя и работает ли ожидаемо в реальных сценариях."
    },
    {
      "id": 3,
      "category": "Баг-репорты",
      "question": "Что должен содержать хороший баг-репорт?",
      "short_answer": "Хороший баг-репорт должен содержать summary, окружение, предусловия, шаги, фактический результат, ожидаемый результат, severity, priority и вложения при необходимости.",
      "detailed_answer": "Хороший баг-репорт должен быть понятным, воспроизводимым и полезным для разработчиков. Он должен объяснять, где возникает проблема, как её воспроизвести, что происходит фактически и что должно происходить."
    },
    {
      "id": 4,
      "category": "Баг-репорты",
      "question": "В чём разница между severity и priority?",
      "short_answer": "Severity показывает, насколько серьёзный баг для системы. Priority показывает, насколько срочно его нужно исправить.",
      "detailed_answer": "Severity — это влияние бага на систему и бизнес. Priority — это срочность исправления. Например, опечатка на главной странице может иметь низкую severity, но высокий priority, если она влияет на репутацию бренда."
    },
    {
      "id": 5,
      "category": "Тест-кейсы",
      "question": "Что такое тест-кейс?",
      "short_answer": "Тест-кейс — это документированный сценарий с предусловиями, шагами, ожидаемым результатом и статусом.",
      "detailed_answer": "Тест-кейс помогает QA-инженеру структурированно проверить конкретную функциональность. Обычно он содержит ID, название, предусловия, шаги, ожидаемый результат, фактический результат, статус, приоритет и связь с требованием."
    },
    {
      "id": 6,
      "category": "HTTP",
      "question": "Что означает статус-код 404?",
      "short_answer": "404 Not Found означает, что запрошенный ресурс не найден на сервере.",
      "detailed_answer": "Например, если клиент отправляет запрос на несуществующий endpoint, сервер может вернуть 404. При тестировании QA должен проверить не только статус-код, но и тело ответа с ошибкой."
    },
    {
      "id": 7,
      "category": "API-тестирование",
      "question": "Что обычно проверяют при API-тестировании?",
      "short_answer": "Я проверяю статус-коды, тело ответа, схему ответа, headers, валидацию, негативные сценарии и время ответа.",
      "detailed_answer": "При API-тестировании я проверяю позитивные и негативные сценарии, обязательные поля, некорректные данные, авторизацию, сообщения об ошибках, структуру ответа и соответствие поведения API требованиям."
    },
    {
      "id": 8,
      "category": "Основы SQL",
      "question": "Для чего используется SQL?",
      "short_answer": "SQL используется для работы с реляционными базами данных: выборки, добавления, обновления и удаления данных.",
      "detailed_answer": "Для QA-инженера SQL полезен для проверки тестовых данных, проверки изменений в базе после действий в UI или API, а также для подготовки данных под тестовые сценарии."
    },
    {
      "id": 9,
      "category": "DevTools",
      "question": "Для чего ты используешь DevTools?",
      "short_answer": "Я использую DevTools для проверки элементов, ошибок в консоли, network-запросов, статус-кодов и данных ответа.",
      "detailed_answer": "DevTools помогает QA-инженеру анализировать поведение frontend, воспроизводить ошибки, проверять API-запросы из браузера, смотреть payload, response body, headers и проблемы производительности."
    },
    {
      "id": 10,
      "category": "Postman",
      "question": "Для чего используется Postman?",
      "short_answer": "Postman используется для отправки API-запросов и проверки ответов.",
      "detailed_answer": "В Postman QA-инженер может создавать запросы, тестировать методы GET, POST, PUT, PATCH и DELETE, проверять статус-коды, тело ответа, headers и сохранять коллекции."
    },
    {
      "id": 11,
      "category": "Интервью на английском",
      "question": "Расскажите о себе.",
      "short_answer": "Я начинающий QA-инженер. Я изучаю ручное тестирование, API-тестирование и автоматизацию на Python. Сейчас моя цель — получить реальный опыт на настоящем продукте.",
      "detailed_answer": "У меня технический бэкграунд, и я активно развиваю навыки QA. Я практикую тестовую документацию, API-тестирование, DevTools, Postman и Python. Я мотивирована развиваться как QA-инженер и работать над реальными продуктовыми задачами."
    },
    {
      "id": 12,
      "category": "Интервью на английском",
      "question": "Почему вы хотите стать QA-инженером?",
      "short_answer": "Мне нравится находить проблемы, анализировать детали и улучшать качество продукта.",
      "detailed_answer": "Я выбрала QA, потому что эта профессия объединяет аналитическое мышление, внимание к деталям и коммуникацию. Мне нравится проверять, как работает продукт, находить баги и помогать команде делать продукт качественнее."
    },
    {
      "id": 13,
      "category": "Тест-кейсы",
      "question": "В чём разница между тест-кейсом и чек-листом?",
      "short_answer": "Тест-кейс более подробный и содержит шаги и ожидаемый результат. Чек-лист — это более короткий список проверок.",
      "detailed_answer": "Тест-кейс используется, когда нужен структурированный сценарий с предусловиями, точными шагами и ожидаемым результатом. Чек-лист удобен для smoke, regression или exploratory testing, когда важно не забыть основные области проверки."
    },
    {
      "id": 14,
      "category": "API-тестирование",
      "question": "В чём разница между GET и POST?",
      "short_answer": "GET используется для получения данных. POST используется для создания или отправки данных на сервер.",
      "detailed_answer": "GET-запросы обычно не имеют тела запроса и не должны изменять данные на сервере. POST-запросы обычно отправляют данные в body и могут создавать новые ресурсы или запускать действия на сервере."
    }
  ]
} as const;
