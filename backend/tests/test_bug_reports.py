from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_generate_bug_report_success():
    payload = {
        "project_name": "QA Buddy",
        "environment": "Chrome 125, macOS",
        "summary": "Bug report is not generated",
        "preconditions": "User is on the Bug Report Generator page",
        "steps_to_reproduce": [
            "Open QA Buddy",
            "Go to Bug Reports page",
            "Click Generate bug report button",
        ],
        "actual_result": "Bug report is not displayed",
        "expected_result": "Bug report should be displayed",
        "severity": "Major",
        "priority": "High",
        "attachment_link": "",
    }

    response = client.post("/api/bug-reports/generate", json=payload)

    assert response.status_code == 200

    data = response.json()

    assert data["project_name"] == "QA Buddy"
    assert data["severity"] == "Major"
    assert data["priority"] == "High"
    assert "## Bug Report" in data["formatted_report"]
    assert "1. Open QA Buddy" in data["formatted_report"]


def test_generate_bug_report_validation_error_for_empty_payload():
    response = client.post("/api/bug-reports/generate", json={})

    assert response.status_code == 422
