from fastapi import APIRouter, HTTPException

from app.schemas.checklist import Checklist
from app.services.checklist_service import get_all_checklists, get_checklist_by_id


router = APIRouter(
    prefix="/api/checklists",
    tags=["Checklists"],
)


@router.get("", response_model=list[Checklist])
def read_checklists() -> list[Checklist]:
    return get_all_checklists()


@router.get("/{checklist_id}", response_model=Checklist)
def read_checklist(checklist_id: int) -> Checklist:
    checklist = get_checklist_by_id(checklist_id)

    if checklist is None:
        raise HTTPException(status_code=404, detail="Checklist not found")

    return checklist
