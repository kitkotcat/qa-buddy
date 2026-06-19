import { isNativeApp } from "../utils/platform";

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

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

function createOfflineTestCaseId(): string {
  return `TC-OFFLINE-${Date.now()}`;
}

function buildOfflineTestCase(
  payload: TestCaseRequest,
  testCaseId: string
): string {
  const steps =
    payload.steps.length > 0
      ? payload.steps
          .map((step, index) => `${index + 1}. ${step}`)
          .join("\n")
      : "1. No steps provided";

  return `# Test Case

## Test Case ID
${testCaseId}

## Feature
${payload.feature_name}

## Requirement
${payload.requirement}

## Preconditions
${payload.preconditions}

## Steps
${steps}

## Expected Result
${payload.expected_result}

## Test Type
${payload.test_type}

## Priority
${payload.priority}`;
}

export async function generateTestCaseApi(
  payload: TestCaseRequest
): Promise<TestCaseResponse> {
  if (isNativeApp()) {
    const testCaseId = createOfflineTestCaseId();

    return {
      formatted_test_case: buildOfflineTestCase(payload, testCaseId),
      test_case_id: testCaseId,
      feature_name: payload.feature_name,
      test_type: payload.test_type,
      priority: payload.priority,
    };
  }

  const response = await fetch(`${API_BASE_URL}/api/test-cases/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to generate test case: ${response.status}`
    );
  }

  return (await response.json()) as TestCaseResponse;
}
