export type InterviewQuestion = {
  id: number;
  category: string;
  question: string;
  short_answer: string;
  detailed_answer: string;
};

const API_BASE_URL = "http://127.0.0.1:8000";

export async function getInterviewQuestionsApi(
  language = "en"
): Promise<InterviewQuestion[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/interview/questions?lang=${language}`
  );

  if (!response.ok) {
    throw new Error("Failed to load interview questions");
  }

  return response.json();
}

export async function getInterviewQuestionByIdApi(
  id: number,
  language = "en"
): Promise<InterviewQuestion> {
  const response = await fetch(
    `${API_BASE_URL}/api/interview/questions/${id}?lang=${language}`
  );

  if (!response.ok) {
    throw new Error("Failed to load interview question");
  }

  return response.json();
}

export async function getRandomInterviewQuestionApi(
  language = "en"
): Promise<InterviewQuestion> {
  const response = await fetch(
    `${API_BASE_URL}/api/interview/random?lang=${language}`
  );

  if (!response.ok) {
    throw new Error("Failed to load random interview question");
  }

  return response.json();
}
