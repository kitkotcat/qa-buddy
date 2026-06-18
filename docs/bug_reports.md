# QA Buddy — Bug Reports

## BUG-001 — Backend is not running

Module: Frontend / API integration

Environment: Chrome, macOS, local environment

Summary: Error message is displayed when backend is stopped and user tries to generate a bug report.

Preconditions:

- Frontend is running
- Backend is stopped
- User is on Bug Report Generator page

Steps to Reproduce:

1. Open Bug Report Generator page
2. Fill in all required fields
3. Click Generate bug report

Actual Result:

Frontend displays an error message:

    Could not generate bug report. Please check that backend is running.

Expected Result:

The error message should be clear for the user.

Severity: Minor  
Priority: Low  
Status: Known behavior

## BUG-002 — Vite port changes if previous server is still running

Module: Frontend local development

Environment: VS Code terminal, Vite, macOS

Summary: Frontend may open on a different port if default Vite ports are already in use.

Steps to Reproduce:

1. Run npm run dev
2. Check terminal output

Actual Result:

Vite may display:

    Port 5173 is in use, trying another one...
    Port 5174 is in use, trying another one...
    Local: http://localhost:5175/

Expected Result:

Developer should open the actual URL shown in terminal.

Severity: Trivial  
Priority: Low  
Status: Known behavior

## BUG-003 — Type-only import caused white screen

Module: Checklist Library frontend

Environment: Chrome, React, Vite

Summary: Checklist Library page displayed a white screen because a TypeScript type was imported as a runtime value.

Steps to Reproduce:

1. Open Checklist Library page
2. Check browser console

Actual Result:

Console error:

    The requested module '/src/api/checklists.ts' does not provide an export named 'Checklist'

Expected Result:

Checklist Library page should load correctly.

Fix:

Changed regular import to type-only import:

    import type { Checklist } from "../api/checklists";

Severity: Major  
Priority: High  
Status: Fixed
