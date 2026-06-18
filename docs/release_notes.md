# QA Buddy — Release Notes

## Version 0.2.0 — Persistence & UX

### Release Summary

QA Buddy v0.2.0 improves persistence and user experience.

This version prepares the project for a future offline Android version by adding local storage, saved documents, search and Markdown export.

---

## Added

### Checklist Library

- Persistent checklist progress with localStorage
- Separate progress for each checklist
- Progress is saved after page reload
- Progress remains after language switching
- Reset progress button

### Search

- Search by checklist title
- Search by checklist category
- Search by checklist item
- Search by interview question
- Search by interview category
- Search by short answer
- Search by detailed answer
- Empty search result states

### Bug Report Generator

- Save generated bug reports
- View saved bug reports
- Copy saved bug reports
- Delete saved bug reports
- Export current bug report to Markdown
- Export saved bug report to Markdown

### Test Case Generator

- Save generated test cases
- View saved test cases
- Copy saved test cases
- Delete saved test cases
- Export current test case to Markdown
- Export saved test case to Markdown

---

## Technical Changes

- Added localStorage service
- Added Markdown export utility
- Improved frontend state persistence
- Improved user experience for generated documents
- Added feature branch workflow for v0.2.0

---

## QA Notes

Recommended checks:

- checklist progress persists after reload
- checklist progress is separate for each checklist
- checklist progress remains after EN/RU switch
- search works in EN and RU
- saved bug reports remain after reload
- saved test cases remain after reload
- copy/delete actions work for saved documents
- Markdown export downloads `.md` files
- generated Markdown files contain correct content

---

## Known Limitations

- Data is still stored locally in browser localStorage
- No database yet
- No authentication
- No cloud sync
- No PDF export yet
- No deployed production version yet

---

## Next Planned Improvements

- Prepare frontend offline mode
- Move Android data usage away from backend dependency
- Add Capacitor
- Build Android APK
- Test Android offline MVP
- Prepare RuStore release candidate

---

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
