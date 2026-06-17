from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_generate_test_case_success():
    payload = {
        "feature_name": "Login",
        "requirement": "User should be able to log in with valid email and password.",
        "preconditions": "User is registered and located on the login page.",
        "steps": [
            "Open login page",
            "Enter valid email",
            "Enter valid password",
            "Click Login button",
        ],
        "expected_result": "User is redirected to the account page.",
        "test_type": "Functional",
        "priority": "High",
    }

    response = client.post("/api/test-cases/generate", json=payload)

    assert response.status_code == 200

    data = response.json()

    assert data["test_case_id"] == "TC-001"
    assert data["feature_name"] == "Login"
    assert data["test_type"] == "Functional"
    assert data["priority"] == "High"
    assert "## Test Case" in data["formatted_test_case"]
    assert "**Feature:** Login" in data["formatted_test_case"]
    assert "1. Open login page" in data["formatted_test_case"]


def test_generate_test_case_validation_error_for_empty_payload():
    response = client.post("/api/test-cases/generate", json={})

    assert response.status_code == 422
