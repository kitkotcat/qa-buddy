from typing import Literal

from pydantic import BaseModel, Field


Severity = Literal["Blocker", "Critical", "Major", "Minor", "Trivial"]
Priority = Literal["High", "Medium", "Low"]


class BugReportRequest(BaseModel):
    project_name: str = Field(..., min_length=1)
    environment: str = Field(..., min_length=1)
    summary: str = Field(..., min_length=1)
    preconditions: str | None = None
    steps_to_reproduce: list[str] = Field(..., min_length=1)
    actual_result: str = Field(..., min_length=1)
    expected_result: str = Field(..., min_length=1)
    severity: Severity = "Major"
    priority: Priority = "Medium"
    attachment_link: str | None = None


class BugReportResponse(BaseModel):
    formatted_report: str
    project_name: str
    severity: Severity
    priority: Priority
