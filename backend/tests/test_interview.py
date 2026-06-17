from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_get_all_interview_questions_success():
    response = client.get("/api/interview/questions")

    assert response.status_code == 200

    data = response.json()

    assert isinstance(data, list)
    assert len(data) >= 14
    assert data[0]["id"] == 1
    assert "category" in data[0]
    assert "question" in data[0]
    assert "short_answer" in data[0]
    assert "detailed_answer" in data[0]


def test_get_interview_question_by_id_success():
    response = client.get("/api/interview/questions/1")

    assert response.status_code == 200

    data = response.json()

    assert data["id"] == 1
    assert data["category"] == "Theory QA"
    assert data["question"] == "What is software testing?"
    assert len(data["short_answer"]) > 0
    assert len(data["detailed_answer"]) > 0


def test_get_interview_question_by_id_not_found():
    response = client.get("/api/interview/questions/999")

    assert response.status_code == 404
    assert response.json() == {"detail": "Interview question not found"}


def test_get_random_interview_question_success():
    response = client.get("/api/interview/random")

    assert response.status_code == 200

    data = response.json()

    assert "id" in data
    assert "category" in data
    assert "question" in data
    assert "short_answer" in data
    assert "detailed_answer" in data
