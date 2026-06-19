import { offlineInterviewQuestionsByLanguage } from "../data/offline/offlineInterviewQuestions";
import { isNativeApp } from "../utils/platform";

export interface InterviewQuestion {
  id: number;
  category: string;
  question: string;
  short_answer: string;
  detailed_answer: string;
}

type SupportedLanguage = "en" | "ru";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

function normalizeLanguage(language: string): SupportedLanguage {
  return language === "ru" ? "ru" : "en";
}

function getOfflineInterviewQuestions(
  language: string
): InterviewQuestion[] {
  const normalizedLanguage = normalizeLanguage(language);
  const source =
    offlineInterviewQuestionsByLanguage[normalizedLanguage];

  return source.map((question) => ({
    id: question.id,
    category: question.category,
    question: question.question,
    short_answer: question.short_answer,
    detailed_answer: question.detailed_answer,
  }));
}

export async function getInterviewQuestionsApi(
  language = "en"
): Promise<InterviewQuestion[]> {
  if (isNativeApp()) {
    return getOfflineInterviewQuestions(language);
  }

  const response = await fetch(
    `${API_BASE_URL}/api/interview/questions?lang=${normalizeLanguage(language)}`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to load interview questions: ${response.status}`
    );
  }

  return (await response.json()) as InterviewQuestion[];
}


export async function getRandomInterviewQuestionApi(
  language = "en"
): Promise<InterviewQuestion> {
  if (isNativeApp()) {
    const questions = getOfflineInterviewQuestions(language);

    if (questions.length === 0) {
      throw new Error("Offline interview questions are empty");
    }

    const randomIndex = Math.floor(Math.random() * questions.length);
    const question = questions[randomIndex];

    if (!question) {
      throw new Error("Failed to select a random interview question");
    }

    return question;
  }

  const response = await fetch(
    `${API_BASE_URL}/api/interview/random?lang=${normalizeLanguage(language)}`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to load random interview question: ${response.status}`
    );
  }

  return (await response.json()) as InterviewQuestion;
}

export async function getInterviewQuestionByIdApi(
  id: number,
  language = "en"
): Promise<InterviewQuestion> {
  if (isNativeApp()) {
    const question = getOfflineInterviewQuestions(language).find(
      (item) => item.id === id
    );

    if (!question) {
      throw new Error(`Interview question with id ${id} was not found`);
    }

    return question;
  }

  const response = await fetch(
    `${API_BASE_URL}/api/interview/questions/${id}?lang=${normalizeLanguage(
      language
    )}`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to load interview question: ${response.status}`
    );
  }

  return (await response.json()) as InterviewQuestion;
}
