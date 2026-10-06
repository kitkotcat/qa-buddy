# QA Buddy Frontend

Frontend web-интерфейс QA Buddy на React + TypeScript + Vite.

## Основные разделы

- Bug Report Generator;
- Test Case Generator;
- Checklist Library;
- Interview Trainer;
- QA Knowledge Quiz;
- RU/EN interface;
- localStorage для пользовательского прогресса и сохранённых QA-артефактов.

## Запуск

```bash
npm ci
npm run dev
```

По умолчанию frontend использует backend на `http://127.0.0.1:8000`. Другой адрес можно передать через `VITE_API_BASE_URL`.

## Quality gate

```bash
npm audit --audit-level=high
npm run lint
npm run build
```

## Android

`frontend/android` — Capacitor/Gradle-проект Android offline MVP. Для release-аудита используется `../scripts/release_audit.sh`.
