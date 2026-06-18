import json
import random
from pathlib import Path
from typing import Any

DATA_FILE = Path(__file__).resolve().parents[1] / "data" / "interview_questions.json"


def _normalize_language(lang: str) -> str:
    return lang if lang in ("en", "ru") else "en"


def _localized_value(value: Any, lang: str):
    if isinstance(value, dict):
        return value.get(lang) or value.get("en") or ""
    return value


def _load_questions() -> list[dict]:
    with DATA_FILE.open(encoding="utf-8") as file:
        return json.load(file)


def _localize_question(question: dict, lang: str) -> dict:
    language = _normalize_language(lang)

    return {
        "id": question["id"],
        "category": _localized_value(question["category"], language),
        "question": _localized_value(question["question"], language),
        "short_answer": _localized_value(question["short_answer"], language),
        "detailed_answer": _localized_value(question["detailed_answer"], language),
    }


def get_all_questions(lang: str = "en") -> list[dict]:
    questions = _load_questions()
    return [_localize_question(question, lang) for question in questions]


def get_question_by_id(question_id: int, lang: str = "en") -> dict | None:
    questions = _load_questions()

    for question in questions:
        if question["id"] == question_id:
            return _localize_question(question, lang)

    return None


def get_random_question(lang: str = "en") -> dict:
    questions = get_all_questions(lang)
    return random.choice(questions)
