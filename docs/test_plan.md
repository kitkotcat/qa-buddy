# QA Buddy — Test Plan

## Purpose

The purpose of this test plan is to describe testing scope and approach for QA Buddy MVP.

## Scope

In scope:

- Bug Report Generator
- Test Case Generator
- Checklist Library
- Interview Trainer
- API endpoints
- form validation
- copy buttons
- clear buttons
- navigation

Out of scope:

- authentication
- database testing
- payment testing
- load testing
- mobile app testing

## Test Types

### Smoke Testing

Smoke testing checks that the main application flow works.

Main smoke checks:

- frontend starts
- backend starts
- Swagger opens
- Home page opens
- all main pages open
- API health check works

### Functional Testing

Functional testing checks each feature according to requirements.

Areas:

- bug report generation
- test case generation
- checklist selection and progress
- interview question filtering
- random question loading

### API Testing

API testing is performed with:

- Swagger
- Pytest
- FastAPI TestClient

### UI Testing

UI testing includes:

- layout check
- navigation check
- forms check
- error messages check
- active menu state check
- responsive behavior check

## Test Environment

Local environment:

- macOS
- Chrome
- VS Code
- Python 3.13
- Node.js
- FastAPI
- React
- Vite

Backend URL:

    http://127.0.0.1:8000

Frontend URL example:

    http://localhost:5173

## Entry Criteria

Testing can start when:

- backend is running
- frontend is running
- Swagger is available
- test data is prepared

## Exit Criteria

Testing can be completed when:

- smoke checks pass
- main functional checks pass
- backend tests pass
- no blocker or critical defects remain
