from pydantic import BaseModel


class InterviewQuestionResponse(BaseModel):
    id: int
    category: str
    question: str
    short_answer: str
    detailed_answer: str
