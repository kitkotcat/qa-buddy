# QA Buddy — Release Notes

## Version 0.1.0 — MVP Development

### Added

- Initial monorepo structure
- React + TypeScript + Tailwind frontend
- FastAPI backend
- Swagger API documentation
- Bug Report Generator frontend
- Bug Report Generator API
- Test Case Generator frontend
- Test Case Generator API
- Checklist Library frontend
- Checklist Library API
- Interview Trainer frontend
- Interview Trainer API
- Pytest backend tests
- Project documentation

### Implemented API Endpoints

- GET /api/health
- POST /api/bug-reports/generate
- POST /api/test-cases/generate
- GET /api/checklists
- GET /api/checklists/{checklist_id}
- GET /api/interview/questions
- GET /api/interview/questions/{question_id}
- GET /api/interview/random

### Testing

Backend tests include:

- health endpoint tests
- bug report generator tests
- test case generator tests
- checklist tests
- interview trainer tests

Current test status:

    12 passed

### Known Limitations

- data is stored in JSON files
- no authentication
- no database
- no PDF export
- no deployed version yet
- no persistent checklist progress

### Next Planned Improvements

- add screenshots to README
- add localStorage for checklist progress
- add search for checklists and interview questions
- add more interview questions
- add SQLite database
- add deployment
