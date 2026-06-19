import { isNativeApp } from "../utils/platform";

export type BugReportRequest = {
  project_name: string;
  environment: string;
  summary: string;
  preconditions: string;
  steps_to_reproduce: string[];
  actual_result: string;
  expected_result: string;
  severity: string;
  priority: string;
  attachment_link: string;
};

export type BugReportResponse = {
  formatted_report: string;
  project_name: string;
  severity: string;
  priority: string;
};

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

function buildOfflineBugReport(payload: BugReportRequest): string {
  const steps =
    payload.steps_to_reproduce.length > 0
      ? payload.steps_to_reproduce
          .map((step, index) => `${index + 1}. ${step}`)
          .join("\n")
      : "1. No steps provided";

  const attachment = payload.attachment_link.trim()
    ? payload.attachment_link
    : "Not provided";

  return `# Bug Report

## Project
${payload.project_name}

## Environment
${payload.environment}

## Summary
${payload.summary}

## Preconditions
${payload.preconditions}

## Steps to Reproduce
${steps}

## Actual Result
${payload.actual_result}

## Expected Result
${payload.expected_result}

## Severity
${payload.severity}

## Priority
${payload.priority}

## Attachment
${attachment}`;
}

export async function generateBugReportApi(
  payload: BugReportRequest
): Promise<BugReportResponse> {
  if (isNativeApp()) {
    return {
      formatted_report: buildOfflineBugReport(payload),
      project_name: payload.project_name,
      severity: payload.severity,
      priority: payload.priority,
    };
  }

  const response = await fetch(`${API_BASE_URL}/api/bug-reports/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to generate bug report: ${response.status}`
    );
  }

  return (await response.json()) as BugReportResponse;
}
