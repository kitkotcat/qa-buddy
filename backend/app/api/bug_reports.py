from fastapi import APIRouter

from app.schemas.bug_report import BugReportRequest, BugReportResponse
from app.services.bug_report_service import generate_bug_report


router = APIRouter(
    prefix="/api/bug-reports",
    tags=["Bug Reports"],
)


@router.post("/generate", response_model=BugReportResponse)
def create_bug_report(data: BugReportRequest) -> BugReportResponse:
    formatted_report = generate_bug_report(data)

    return BugReportResponse(
        formatted_report=formatted_report,
        project_name=data.project_name,
        severity=data.severity,
        priority=data.priority,
    )
