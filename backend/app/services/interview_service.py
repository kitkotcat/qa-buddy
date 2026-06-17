import json
import random
from pathlib import Path

from app.schemas.interview import InterviewQuestion


DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "interview_questions.json"


def get_all_questions() -> list[InterviewQuestion]:
    with DATA_PATH.open("r", encoding="utf-8") as file:
        data = json.load(file)

    return [InterviewQuestion(**item) for item in data]


def get_question_by_id(question_id: int) -> InterviewQuestion | None:
    questions = get_all_questions()

    for question in questions:
        if question.id == question_id:
            return question

    return None


def get_random_question() -> InterviewQuestion:
    questions = get_all_questions()

    return random.choice(questions)
