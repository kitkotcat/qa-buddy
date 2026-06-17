from app.schemas.bug_report import BugReportRequest


def format_steps(steps: list[str]) -> str:
    cleaned_steps = [step.strip() for step in steps if step.strip()]

    return "\n".join(
        f"{index + 1}. {step}" for index, step in enumerate(cleaned_steps)
    )


def generate_bug_report(data: BugReportRequest) -> str:
    preconditions = data.preconditions or "No preconditions"
    attachment = data.attachment_link or "No attachment"

    return f"""## Bug Report

**Project:** {data.project_name}

**Environment:** {data.environment}

**Summary:** {data.summary}

**Preconditions:**
{preconditions}

**Steps to Reproduce:**
{format_steps(data.steps_to_reproduce)}

**Actual Result:**
{data.actual_result}

**Expected Result:**
{data.expected_result}

**Severity:** {data.severity}

**Priority:** {data.priority}

**Attachment:** {attachment}"""
