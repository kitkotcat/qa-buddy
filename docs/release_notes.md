# QA Buddy — Release Notes

## Version 0.1.0 — QA Buddy MVP

### Release Summary

QA Buddy v0.1.0 is the first stable MVP release of the project.

QA Buddy is a fullstack portfolio project for beginner QA engineers.  
The application helps users create bug reports, generate test cases, use QA checklists and prepare for QA interviews.

---

## Implemented Features

### Frontend

- React + TypeScript + Tailwind CSS frontend
- Vite development environment
- React Router navigation
- Responsive dark UI
- Language switcher EN/RU
- Local language persistence with localStorage

### Backend

- FastAPI backend
- Pydantic schemas
- Modular API structure
- JSON-based temporary data storage
- Swagger API documentation

### QA Tools

- Bug Report Generator
- Test Case Generator
- Checklist Library
- Interview Trainer

### Bilingual Support

- English / Russian UI
- English / Russian checklist data
- English / Russian interview questions
- English / Russian interview answers
- Language parameter support in backend API

### Testing

- Pytest backend tests
- FastAPI TestClient tests
- API tests for main endpoints
- Tests for bilingual backend data
- Validation and not found checks

### Documentation

- README.md
- Requirements v1
- Test Plan
- API Testing notes
- Test Cases
- Bug Reports
- Release Notes
- Project screenshots

---

## Implemented API Endpoints

### Health

- GET /api/health

### Bug Reports

- POST /api/bug-reports/generate

### Test Cases

- POST /api/test-cases/generate

### Checklists

- GET /api/checklists
- GET /api/checklists/{checklist_id}

Supports language query parameter:

- ?lang=en
- ?lang=ru

### Interview

- GET /api/interview/questions
- GET /api/interview/questions/{question_id}
- GET /api/interview/random

Supports language query parameter:

- ?lang=en
- ?lang=ru

---

## Test Status

Backend tests are implemented for:

- health endpoint
- bug report generation
- test case generation
- checklist endpoints
- interview endpoints
- bilingual data
- validation errors
- 404 errors

---

## Known Limitations

- No database yet
- No authentication
- No PDF / Markdown export yet
- No deployed production version yet
- Checklist progress is not persisted yet
- Generated bug reports and test cases are not stored yet

---

## Next Planned Improvements

- Add localStorage for checklist progress
- Add search and filters
- Add more checklist categories
- Add more interview questions
- Add SQLite or PostgreSQL
- Add export to Markdown / PDF
- Add deployment
- Add Portfolio Builder module
- Add API Sandbox module
- Add Fake Shop for QA practice
