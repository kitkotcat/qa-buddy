# QA Buddy — QA Portfolio Project

QA Buddy — учебно-практический проект, в котором я отрабатываю полный цикл QA для web, API и Android-приложения: от требований и тест-дизайна до API/backend-проверок, регресса, smoke и документации.

Проект включает web-версию, FastAPI backend, Android offline MVP и отдельный Recorder MVP для фиксации шагов воспроизведения.

## Что этот проект показывает как QA-портфолио

- функциональное тестирование web-приложения;
- REST API / backend testing;
- positive / negative scenarios;
- validation и error handling;
- test design;
- smoke / regression / retest;
- проверку локального хранения данных;
- bilingual RU/EN checks;
- Android smoke и offline testing;
- работу с Swagger / OpenAPI и Chrome DevTools;
- backend autotests на Python + Pytest;
- подготовку QA-документации.

## QA coverage

Backend покрыт Pytest-тестами с использованием FastAPI TestClient.

Проверяются:

- health endpoint;
- генерация bug reports;
- генерация test cases;
- checklist endpoints;
- interview endpoints;
- bilingual backend data;
- validation errors;
- not found / 404 scenarios.

Тесты находятся в [`backend/tests`](backend/tests).

### Android / Offline QA Gate

Для Android offline MVP были выполнены:

- frontend production build;
- Android Gradle build;
- установка APK;
- Android smoke testing;
- offline testing.

Подробнее: [`RELEASE_NOTES_v0.3.0.md`](RELEASE_NOTES_v0.3.0.md).

## QA-документация

В репозитории есть отдельные QA-артефакты:

- [Requirements](docs/requirements_v1.md)
- [Test Plan](docs/test_plan.md)
- [API Testing](docs/api_testing.md)
- [Test Cases](docs/test_cases.md)
- [Bug Reports](docs/bug_reports.md)
- [Release Notes](docs/release_notes.md)

## Функциональность приложения

### Bug Report Generator

Позволяет сформировать структурированный bug report с environment, summary, preconditions, steps to reproduce, actual/expected result, severity и priority.

Поддерживаются сохранение результатов и экспорт в Markdown.

### Test Case Generator

Формирует test case с requirement, preconditions, steps, expected result, test type и priority.

Поддерживаются сохранение результатов и экспорт в Markdown.

### Checklist Library

Библиотека QA-чек-листов с сохранением прогресса, сбросом состояния и поиском.

Примеры категорий:

- Login / Registration;
- Search;
- Cart;
- Checkout;
- API Testing;
- Forms Validation;
- Mobile App.

### Interview Trainer

Тренажёр вопросов для QA-собеседований с короткими и подробными ответами, категориями и RU/EN интерфейсом.

### QA Knowledge Quiz

В Android offline версии есть квиз по QA с режимами на 5, 10 и 20 вопросов, статистикой по категориям и разбором ошибок.

## QA Buddy Recorder — MVP

В репозитории также есть ранний MVP Chrome/Edge Manifest V3 расширения для фиксации ручных шагов воспроизведения.

Текущий MVP умеет:

- start / pause / resume / stop recording;
- фиксировать стартовую страницу;
- записывать клики по интерактивным элементам;
- отмечать изменение form fields без сохранения введённых значений;
- определять URL changes, включая базовую SPA-навигацию;
- хранить текущую сессию в `chrome.storage.local`;
- сохранять до 500 шагов за сессию.

Подробнее: [`extension/README.md`](extension/README.md).

## API endpoints

Основные backend endpoints:

```text
GET  /api/health
POST /api/bug-reports/generate
POST /api/test-cases/generate
GET  /api/checklists
GET  /api/checklists/{checklist_id}
GET  /api/interview/questions
GET  /api/interview/questions/{question_id}
GET  /api/interview/random
```

Swagger доступен локально после запуска backend:

```text
http://127.0.0.1:8000/docs
```

## System under test

| Часть | Технологии |
|---|---|
| Frontend | React, TypeScript, Vite |
| Backend | Python, FastAPI, Pydantic, Uvicorn |
| Backend tests | Pytest, FastAPI TestClient |
| Android | Capacitor, Gradle |
| Local data | localStorage, offline data |
| API documentation | Swagger / OpenAPI |
| Recorder MVP | Chrome/Edge Manifest V3, TypeScript |

Технологический стек здесь рассматривается прежде всего как **система под тестированием и среда для QA-практики**.

## Как запустить backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --reload-dir app
```

Backend:

```text
http://127.0.0.1:8000
```

## Как запустить frontend

```bash
cd frontend
npm install
npm run dev
```

## Как запустить backend tests

```bash
cd backend
source .venv/bin/activate
pytest
```

## Структура проекта

```text
qa-buddy/
├── backend/       # FastAPI backend + Pytest tests
├── frontend/      # Web UI + Android/Capacitor project
├── extension/     # QA Buddy Recorder MVP
├── docs/          # QA documentation
├── screenshots/   # UI, Swagger and Pytest evidence
└── README.md
```

## Screenshots

### Home Page

![Home Page](screenshots/home-page.png)

### Bug Report Generator

![Bug Report Generator](screenshots/bug-report-generator.png)

### Test Case Generator

![Test Case Generator](screenshots/test-case-generator.png)

### Checklist Library

![Checklist Library](screenshots/checklist-library.png)

### Interview Trainer

![Interview Trainer](screenshots/interview-trainer.png)

### Swagger API Documentation

![Swagger API Documentation](screenshots/swagger-api.png)

### Pytest Result

![Pytest Result](screenshots/pytest-result.png)

## Текущее состояние

В `main` находятся:

- web-приложение;
- FastAPI backend;
- QA-документация;
- backend Pytest tests;
- Android offline MVP;
- Recorder MVP;
- CI build check для extension.

Проект продолжает использоваться как практическая площадка для развития QA-навыков и дальнейшей автоматизации тестирования.

## Автор

Екатерина Пешкун  
GitHub: [@kitkotcat](https://github.com/kitkotcat)
