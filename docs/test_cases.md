# QA Buddy — Test Cases

## Smoke Test Cases

| ID | Title | Preconditions | Steps | Expected Result | Status |
|---|---|---|---|---|---|
| SMK-001 | Open Home page | Frontend is running | Open frontend URL | Home page is displayed | Passed |
| SMK-002 | Open Swagger | Backend is running | Open /docs | Swagger page is displayed | Passed |
| SMK-003 | Check backend health | Backend is running | Open /api/health | Status ok is returned | Passed |
| SMK-004 | Open Bug Report Generator | Frontend is running | Click Bug Reports | Bug Report Generator page is displayed | Passed |
| SMK-005 | Open Test Case Generator | Frontend is running | Click Test Cases | Test Case Generator page is displayed | Passed |
| SMK-006 | Open Checklist Library | Frontend is running | Click Checklists | Checklist Library page is displayed | Passed |
| SMK-007 | Open Interview Trainer | Frontend is running | Click Interview | Interview Trainer page is displayed | Passed |

## Bug Report Generator

| ID | Title | Preconditions | Steps | Expected Result | Status |
|---|---|---|---|---|---|
| BR-001 | Generate bug report with valid data | User is on Bug Report page | Fill required fields and click Generate | Structured bug report is displayed | Passed |
| BR-002 | Required fields validation | User is on Bug Report page | Click Generate with empty form | Validation error is displayed | Passed |
| BR-003 | Copy generated bug report | Generated report is displayed | Click Copy | Copy success message is displayed | Passed |
| BR-004 | Clear bug report form | Form contains data | Click Clear form | Form and result are cleared | Passed |

## Test Case Generator

| ID | Title | Preconditions | Steps | Expected Result | Status |
|---|---|---|---|---|---|
| TC-001 | Generate test case with valid data | User is on Test Case page | Fill required fields and click Generate | Structured test case is displayed | Passed |
| TC-002 | Required fields validation | User is on Test Case page | Click Generate with empty form | Validation error is displayed | Passed |
| TC-003 | Copy generated test case | Generated test case is displayed | Click Copy | Copy success message is displayed | Passed |
| TC-004 | Clear test case form | Form contains data | Click Clear form | Form and result are cleared | Passed |

## Checklist Library

| ID | Title | Preconditions | Steps | Expected Result | Status |
|---|---|---|---|---|---|
| CL-001 | Load checklist list | Backend and frontend are running | Open Checklist Library | List of checklists is displayed | Passed |
| CL-002 | Select checklist | Checklist list is displayed | Click Search Checklist | Selected checklist is displayed | Passed |
| CL-003 | Mark checklist item | Checklist is opened | Click checkbox | Item is checked and progress updates | Passed |
| CL-004 | Reset checklist progress | Some items are checked | Click Reset checks | All items are unchecked | Passed |
| CL-005 | Copy checklist | Checklist is opened | Click Copy checklist | Copy success message is displayed | Passed |

## Interview Trainer

| ID | Title | Preconditions | Steps | Expected Result | Status |
|---|---|---|---|---|---|
| INT-001 | Load interview questions | Backend and frontend are running | Open Interview Trainer | Questions are displayed | Passed |
| INT-002 | Filter questions by category | Questions are displayed | Click category | Questions are filtered | Passed |
| INT-003 | Select question | Questions are displayed | Click question card | Selected question is displayed | Passed |
| INT-004 | Switch answer mode | Question is selected | Click Detailed answer | Detailed answer is displayed | Passed |
| INT-005 | Load random question | Interview page is opened | Click Random question | Random question is displayed | Passed |
| INT-006 | Copy answer | Question is selected | Click Copy answer | Copy success message is displayed | Passed |
