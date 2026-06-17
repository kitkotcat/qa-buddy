import json
from pathlib import Path

from app.schemas.checklist import Checklist


DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "checklists.json"


def get_all_checklists() -> list[Checklist]:
    with DATA_PATH.open("r", encoding="utf-8") as file:
        data = json.load(file)

    return [Checklist(**item) for item in data]


def get_checklist_by_id(checklist_id: int) -> Checklist | None:
    checklists = get_all_checklists()

    for checklist in checklists:
        if checklist.id == checklist_id:
            return checklist

    return None
