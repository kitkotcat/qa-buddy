from fastapi import APIRouter

from app.schemas.test_case import TestCaseRequest, TestCaseResponse
from app.services.test_case_service import generate_test_case


router = APIRouter(
    prefix="/api/test-cases",
    tags=["Test Cases"],
)


@router.post("/generate", response_model=TestCaseResponse)
def create_test_case(data: TestCaseRequest) -> TestCaseResponse:
    formatted_test_case = generate_test_case(data)

    return TestCaseResponse(
        formatted_test_case=formatted_test_case,
        test_case_id="TC-001",
        feature_name=data.feature_name,
        test_type=data.test_type,
        priority=data.priority,
    )
