export type InterviewQuestion = {
  id: number;
  category: string;
  question: string;
  short_answer: string;
  detailed_answer: string;
};

const API_BASE_URL = "http://127.0.0.1:8000";

export async function getInterviewQuestionsApi(): Promise<InterviewQuestion[]> {
  const response = await fetch(`${API_BASE_URL}/api/interview/questions`);

  if (!response.ok) {
    throw new Error("Failed to load interview questions");
  }

  return response.json();
}

export async function getInterviewQuestionByIdApi(
  id: number
): Promise<InterviewQuestion> {
  const response = await fetch(`${API_BASE_URL}/api/interview/questions/${id}`);

  if (!response.ok) {
    throw new Error("Failed to load interview question");
  }

  return response.json();
}

export async function getRandomInterviewQuestionApi(): Promise<InterviewQuestion> {
  const response = await fetch(`${API_BASE_URL}/api/interview/random`);

  if (!response.ok) {
    throw new Error("Failed to load random interview question");
  }

  return response.json();
}
