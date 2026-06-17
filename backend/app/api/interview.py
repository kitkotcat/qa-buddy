from fastapi import APIRouter, HTTPException

from app.schemas.interview import InterviewQuestion
from app.services.interview_service import (
    get_all_questions,
    get_question_by_id,
    get_random_question,
)


router = APIRouter(
    prefix="/api/interview",
    tags=["Interview"],
)


@router.get("/questions", response_model=list[InterviewQuestion])
def read_questions() -> list[InterviewQuestion]:
    return get_all_questions()


@router.get("/questions/{question_id}", response_model=InterviewQuestion)
def read_question(question_id: int) -> InterviewQuestion:
    question = get_question_by_id(question_id)

    if question is None:
        raise HTTPException(status_code=404, detail="Interview question not found")

    return question


@router.get("/random", response_model=InterviewQuestion)
def read_random_question() -> InterviewQuestion:
    return get_random_question()
