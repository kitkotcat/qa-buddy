from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_get_all_checklists_success():
    response = client.get("/api/checklists")

    assert response.status_code == 200

    data = response.json()

    assert isinstance(data, list)
    assert len(data) >= 7
    assert data[0]["id"] == 1
    assert "title" in data[0]
    assert "category" in data[0]
    assert "items" in data[0]


def test_get_checklist_by_id_success():
    response = client.get("/api/checklists/1")

    assert response.status_code == 200

    data = response.json()

    assert data["id"] == 1
    assert data["title"] == "Login / Registration Checklist"
    assert data["category"] == "Authentication"
    assert isinstance(data["items"], list)
    assert len(data["items"]) > 0


def test_get_checklist_by_id_not_found():
    response = client.get("/api/checklists/999")

    assert response.status_code == 404
    assert response.json() == {"detail": "Checklist not found"}
