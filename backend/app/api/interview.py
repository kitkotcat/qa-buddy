from fastapi import APIRouter, HTTPException, Query

from app.schemas.interview import InterviewQuestionResponse
from app.services.interview_service import (
    get_all_questions,
    get_question_by_id,
    get_random_question,
)

router = APIRouter(prefix="/api/interview", tags=["Interview"])


@router.get("/questions", response_model=list[InterviewQuestionResponse])
def read_questions(lang: str = Query(default="en")):
    return get_all_questions(lang)


@router.get("/questions/{question_id}", response_model=InterviewQuestionResponse)
def read_question(question_id: int, lang: str = Query(default="en")):
    question = get_question_by_id(question_id, lang)

    if question is None:
        raise HTTPException(status_code=404, detail="Interview question not found")

    return question


@router.get("/random", response_model=InterviewQuestionResponse)
def read_random_question(lang: str = Query(default="en")):
    return get_random_question(lang)
