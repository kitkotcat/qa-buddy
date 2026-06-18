export type TestCaseRequest = {
  feature_name: string;
  requirement: string;
  preconditions: string;
  steps: string[];
  expected_result: string;
  test_type: string;
  priority: string;
};

export type TestCaseResponse = {
  formatted_test_case: string;
  test_case_id: string;
  feature_name: string;
  test_type: string;
  priority: string;
};

const API_BASE_URL = "http://127.0.0.1:8000";

export async function generateTestCaseApi(
  payload: TestCaseRequest
): Promise<TestCaseResponse> {
  const response = await fetch(`${API_BASE_URL}/api/test-cases/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to generate test case");
  }

  return response.json();
}
