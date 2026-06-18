from pydantic import BaseModel


class ChecklistResponse(BaseModel):
    id: int
    category: str
    title: str
    items: list[str]
