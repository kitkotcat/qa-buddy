from fastapi import APIRouter, HTTPException, Query

from app.schemas.checklist import ChecklistResponse
from app.services.checklist_service import get_all_checklists, get_checklist_by_id

router = APIRouter(prefix="/api/checklists", tags=["Checklists"])


@router.get("", response_model=list[ChecklistResponse])
def read_checklists(lang: str = Query(default="en")):
    return get_all_checklists(lang)


@router.get("/{checklist_id}", response_model=ChecklistResponse)
def read_checklist(checklist_id: int, lang: str = Query(default="en")):
    checklist = get_checklist_by_id(checklist_id, lang)

    if checklist is None:
        raise HTTPException(status_code=404, detail="Checklist not found")

    return checklist
