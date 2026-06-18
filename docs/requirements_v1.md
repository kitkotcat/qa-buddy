# QA Buddy — Requirements v1

## Project Overview

QA Buddy is a web application for beginner QA engineers.

The application helps users:

- create bug reports
- generate test cases
- use ready-made QA checklists
- prepare for QA interviews

## Target Audience

- beginner QA engineers
- manual QA trainees
- junior QA engineers
- QA course students
- candidates preparing for interviews

## MVP Scope

MVP includes four main modules:

1. Bug Report Generator
2. Test Case Generator
3. Checklist Library
4. Interview Trainer

## Functional Requirements

### Bug Report Generator

The user should be able to:

- open Bug Report Generator page
- fill in required fields
- choose severity
- choose priority
- generate structured bug report
- copy generated result
- clear the form

Required fields:

- Project name
- Environment
- Summary
- Steps to reproduce
- Actual result
- Expected result

### Test Case Generator

The user should be able to:

- open Test Case Generator page
- fill in required fields
- choose test type
- choose priority
- generate structured test case
- copy generated result
- clear the form

Required fields:

- Feature name
- Requirement
- Steps
- Expected result

### Checklist Library

The user should be able to:

- open Checklist Library page
- view available checklists
- select checklist
- mark checklist items as completed
- see progress
- reset checks
- copy checklist

### Interview Trainer

The user should be able to:

- open Interview Trainer page
- view interview questions
- filter questions by category
- select question
- view short answer
- view detailed answer
- get random question
- copy answer

## Non-Functional Requirements

- responsive UI
- clear navigation
- modular frontend structure
- modular backend structure
- Swagger API documentation
- backend tests with Pytest

## Out of Scope for MVP

- authentication
- database
- PDF export
- AI generation
- deployment
- mobile app

## Definition of Done

MVP v1 is ready when:

- all four main modules work
- frontend communicates with backend
- Swagger contains all endpoints
- backend tests pass
- README and documentation are prepared
- project is pushed to GitHub
