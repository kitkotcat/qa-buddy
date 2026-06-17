from app.schemas.test_case import TestCaseRequest


def format_steps(steps: list[str]) -> str:
    cleaned_steps = [step.strip() for step in steps if step.strip()]

    return "\n".join(
        f"{index + 1}. {step}" for index, step in enumerate(cleaned_steps)
    )


def generate_test_case(data: TestCaseRequest) -> str:
    test_case_id = "TC-001"
    title = f"Verify {data.feature_name}"

    preconditions = data.preconditions or "No preconditions"

    return f"""## Test Case

**Test Case ID:** {test_case_id}

**Title:** {title}

**Feature:** {data.feature_name}

**Requirement:**
{data.requirement}

**Preconditions:**
{preconditions}

**Steps:**
{format_steps(data.steps)}

**Expected Result:**
{data.expected_result}

**Type:** {data.test_type}

**Priority:** {data.priority}"""
