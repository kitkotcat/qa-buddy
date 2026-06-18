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

const API_BASE_URL = "http://127.0.0.1:8000";

export async function generateBugReportApi(
  payload: BugReportRequest
): Promise<BugReportResponse> {
  const response = await fetch(`${API_BASE_URL}/api/bug-reports/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to generate bug report");
  }

  return response.json();
}
