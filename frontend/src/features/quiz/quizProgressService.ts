import {
  getStorageItem,
  setStorageItem,
} from "../../storage/localStorageService";

const QUIZ_PROGRESS_KEY = "qa-buddy-quiz-progress-v1";

export type QuizAnswerResult = {
  questionId: number;
  category: string;
  isCorrect: boolean;
};

export type QuizCategoryProgress = {
  correct: number;
  total: number;
};

export type QuizProgress = {
  totalAttempts: number;
  bestPercentage: number;
  lastScore: number;
  lastTotal: number;
  studiedQuestionIds: number[];
  wrongQuestionIds: number[];
  categoryProgress: Record<string, QuizCategoryProgress>;
  lastCompletedAt: string | null;
};

export type SaveQuizResultOptions = {
  countAttempt?: boolean;
  updateBestResult?: boolean;
};

export const initialQuizProgress: QuizProgress = {
  totalAttempts: 0,
  bestPercentage: 0,
  lastScore: 0,
  lastTotal: 0,
  studiedQuestionIds: [],
  wrongQuestionIds: [],
  categoryProgress: {},
  lastCompletedAt: null,
};

export function loadQuizProgress(): QuizProgress {
  const storedProgress = getStorageItem<Partial<QuizProgress>>(
    QUIZ_PROGRESS_KEY,
    initialQuizProgress
  );

  return {
    ...initialQuizProgress,
    ...storedProgress,
    studiedQuestionIds:
      storedProgress.studiedQuestionIds ?? [],
    wrongQuestionIds:
      storedProgress.wrongQuestionIds ?? [],
    categoryProgress:
      storedProgress.categoryProgress ?? {},
  };
}

export function saveQuizResult(
  answers: QuizAnswerResult[],
  options: SaveQuizResultOptions = {}
): QuizProgress {
  const {
    countAttempt = true,
    updateBestResult = true,
  } = options;

  const currentProgress = loadQuizProgress();

  const score = answers.filter(
    (answer) => answer.isCorrect
  ).length;

  const total = answers.length;

  const percentage =
    total === 0 ? 0 : Math.round((score / total) * 100);

  const studiedQuestionIds = new Set(
    currentProgress.studiedQuestionIds
  );

  const wrongQuestionIds = new Set(
    currentProgress.wrongQuestionIds
  );

  const categoryProgress = {
    ...currentProgress.categoryProgress,
  };

  answers.forEach((answer) => {
    studiedQuestionIds.add(answer.questionId);

    if (answer.isCorrect) {
      wrongQuestionIds.delete(answer.questionId);
    } else {
      wrongQuestionIds.add(answer.questionId);
    }

    const currentCategory = categoryProgress[
      answer.category
    ] ?? {
      correct: 0,
      total: 0,
    };

    categoryProgress[answer.category] = {
      correct:
        currentCategory.correct +
        (answer.isCorrect ? 1 : 0),
      total: currentCategory.total + 1,
    };
  });

  const nextProgress: QuizProgress = {
    totalAttempts:
      currentProgress.totalAttempts +
      (countAttempt ? 1 : 0),

    bestPercentage: updateBestResult
      ? Math.max(
          currentProgress.bestPercentage,
          percentage
        )
      : currentProgress.bestPercentage,

    lastScore: score,
    lastTotal: total,
    studiedQuestionIds: Array.from(
      studiedQuestionIds
    ),
    wrongQuestionIds: Array.from(
      wrongQuestionIds
    ),
    categoryProgress,
    lastCompletedAt: new Date().toISOString(),
  };

  setStorageItem(QUIZ_PROGRESS_KEY, nextProgress);

  return nextProgress;
}
