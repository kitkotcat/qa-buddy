import json
from pathlib import Path
from typing import Any

DATA_FILE = Path(__file__).resolve().parents[1] / "data" / "checklists.json"


def _normalize_language(lang: str) -> str:
    return lang if lang in ("en", "ru") else "en"


def _localized_value(value: Any, lang: str):
    if isinstance(value, dict):
        return value.get(lang) or value.get("en") or ""
    return value


def _load_checklists() -> list[dict]:
    with DATA_FILE.open(encoding="utf-8") as file:
        return json.load(file)


def _localize_checklist(checklist: dict, lang: str) -> dict:
    language = _normalize_language(lang)

    return {
        "id": checklist["id"],
        "category": _localized_value(checklist["category"], language),
        "title": _localized_value(checklist["title"], language),
        "items": _localized_value(checklist["items"], language),
    }


def get_all_checklists(lang: str = "en") -> list[dict]:
    checklists = _load_checklists()
    return [_localize_checklist(checklist, lang) for checklist in checklists]


def get_checklist_by_id(checklist_id: int, lang: str = "en") -> dict | None:
    checklists = _load_checklists()

    for checklist in checklists:
        if checklist["id"] == checklist_id:
            return _localize_checklist(checklist, lang)

    return None
