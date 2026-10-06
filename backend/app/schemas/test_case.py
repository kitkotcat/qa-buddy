from typing import Literal

from pydantic import BaseModel, Field


TestType = Literal["Smoke", "Functional", "Regression", "Negative", "UI", "API"]
Priority = Literal["High", "Medium", "Low"]


class TestCaseRequest(BaseModel):
    __test__ = False

    feature_name: str = Field(..., min_length=1)
    requirement: str = Field(..., min_length=1)
    preconditions: str | None = None
    steps: list[str] = Field(..., min_length=1)
    expected_result: str = Field(..., min_length=1)
    test_type: TestType = "Functional"
    priority: Priority = "Medium"


class TestCaseResponse(BaseModel):
    __test__ = False

    formatted_test_case: str
    test_case_id: str
    feature_name: str
    test_type: TestType
    priority: Priority
