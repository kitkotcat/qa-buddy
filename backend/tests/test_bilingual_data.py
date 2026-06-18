from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_get_checklists_in_russian():
    response = client.get("/api/checklists?lang=ru")

    assert response.status_code == 200

    data = response.json()

    assert len(data) > 0
    assert "Чек-лист" in data[0]["title"]
    assert len(data[0]["items"]) > 0


def test_get_interview_questions_in_russian():
    response = client.get("/api/interview/questions?lang=ru")

    assert response.status_code == 200

    data = response.json()

    assert len(data) > 0
    assert "Что" in data[0]["question"] or "В чём" in data[0]["question"]


def test_get_random_interview_question_in_russian():
    response = client.get("/api/interview/random?lang=ru")

    assert response.status_code == 200

    data = response.json()

    assert "category" in data
    assert "question" in data
    assert "short_answer" in data
    assert "detailed_answer" in data
