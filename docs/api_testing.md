# QA Buddy — API Testing

## Base URL

    http://127.0.0.1:8000

Swagger:

    http://127.0.0.1:8000/docs

## Health Check

Endpoint:

    GET /api/health

Expected status:

    200 OK

Expected response:

    {
      "status": "ok",
      "message": "QA Buddy backend is running"
    }

## Generate Bug Report

Endpoint:

    POST /api/bug-reports/generate

Expected status:

    200 OK

Response should contain:

- formatted_report
- project_name
- severity
- priority

Negative checks:

- empty request body should return 422
- invalid severity should return 422
- invalid priority should return 422

## Generate Test Case

Endpoint:

    POST /api/test-cases/generate

Expected status:

    200 OK

Response should contain:

- formatted_test_case
- test_case_id
- feature_name
- test_type
- priority

Negative checks:

- empty request body should return 422
- invalid test type should return 422
- invalid priority should return 422

## Get Checklists

Endpoint:

    GET /api/checklists

Expected status:

    200 OK

Response should contain list of checklists.

## Get Checklist by ID

Endpoint:

    GET /api/checklists/1

Expected status:

    200 OK

Response should contain:

- id
- title
- category
- items

## Checklist Not Found

Endpoint:

    GET /api/checklists/999

Expected status:

    404 Not Found

Expected response:

    {
      "detail": "Checklist not found"
    }

## Get Interview Questions

Endpoint:

    GET /api/interview/questions

Expected status:

    200 OK

Response should contain list of interview questions.

## Get Interview Question by ID

Endpoint:

    GET /api/interview/questions/1

Expected status:

    200 OK

Response should contain:

- id
- category
- question
- short_answer
- detailed_answer

## Get Random Interview Question

Endpoint:

    GET /api/interview/random

Expected status:

    200 OK

Response should contain one interview question.

## Interview Question Not Found

Endpoint:

    GET /api/interview/questions/999

Expected status:

    404 Not Found

Expected response:

    {
      "detail": "Interview question not found"
    }
