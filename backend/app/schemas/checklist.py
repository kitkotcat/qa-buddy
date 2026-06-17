from pydantic import BaseModel


class Checklist(BaseModel):
    id: int
    title: str
    category: str
    items: list[str]
