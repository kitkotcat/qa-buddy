import { useState } from "react";
import QACat, { type QACatMood } from "../components/QACat";
import { useLanguage } from "../i18n/LanguageContext";
import {
  quizQuestions,
  type QuizLanguage,
  type QuizQuestion,
} from "../features/quiz/quizQuestions";
import {
  loadQuizProgress,
  saveQuizResult,
  type QuizAnswerResult,
  type QuizProgress,
} from "../features/quiz/quizProgressService";

type QuizPhase = "setup" | "question" | "result";
type QuizMode = "regular" | "mistakes";

function shuffleQuestions(
  questions: QuizQuestion[]
): QuizQuestion[] {
  const shuffledQuestions = [...questions];

  for (
    let index = shuffledQuestions.length - 1;
    index > 0;
    index -= 1
  ) {
    const randomIndex = Math.floor(
      Math.random() * (index + 1)
    );

    [
      shuffledQuestions[index],
      shuffledQuestions[randomIndex],
    ] = [
      shuffledQuestions[randomIndex],
      shuffledQuestions[index],
    ];
  }

  return shuffledQuestions;
}

function QuizPage() {
  const { language } = useLanguage();
  const quizLanguage: QuizLanguage =
    language === "ru" ? "ru" : "en";

  const labels =
    quizLanguage === "ru"
      ? {
          badge: "QA BUDDY QUIZ",
          title: "Проверь свои знания QA",
          description:
            "Ответь на вопросы, изучи объяснения и найди темы, которые нужно повторить.",
          start: "Начать тест",
          questionsCount: "Количество вопросов",
          question: "Вопрос",
          of: "из",
          next: "Следующий вопрос",
          finish: "Завершить тест",
          correct: "Правильно!",
          incorrect: "Неправильно",
          explanation: "Объяснение",
          result: "Результат",
          restart: "Пройти ещё раз",
          best: "Лучший результат",
          attempts: "Попыток",
          studied: "Изучено вопросов",
          mistakes: "Нужно повторить",
          reviewMistakes: "Повторить ошибки",
          noMistakes: "Ошибок для повторения пока нет",
          categoryProgress: "Прогресс по категориям",
          reviewMode: "Режим повторения ошибок",
          setupCat:
            "Я QA Cat. Выбирай количество вопросов — проверим твои знания!",
          thinkingCat:
            "Не торопись. Сначала внимательно прочитай все варианты.",
          goodResultCat:
            "Отличная работа! Ты уверенно ориентируешься в основах QA.",
          mediumResultCat:
            "Хороший результат. Посмотри объяснения и повтори слабые темы.",
          lowResultCat:
            "Ошибки — часть обучения. Повтори материал и попробуй ещё раз.",
        }
      : {
          badge: "QA BUDDY QUIZ",
          title: "Test your QA knowledge",
          description:
            "Answer questions, study explanations and identify topics to review.",
          start: "Start quiz",
          questionsCount: "Number of questions",
          question: "Question",
          of: "of",
          next: "Next question",
          finish: "Finish quiz",
          correct: "Correct!",
          incorrect: "Incorrect",
          explanation: "Explanation",
          result: "Result",
          restart: "Try again",
          best: "Best result",
          attempts: "Attempts",
          studied: "Questions studied",
          mistakes: "Questions to review",
          reviewMistakes: "Review mistakes",
          noMistakes: "No mistakes to review yet",
          categoryProgress: "Category progress",
          reviewMode: "Mistake review mode",
          setupCat:
            "I am QA Cat. Choose the number of questions and let us test your knowledge!",
          thinkingCat:
            "Take your time. Read every option carefully before answering.",
          goodResultCat:
            "Excellent work! You have a strong understanding of QA basics.",
          mediumResultCat:
            "Good result. Review the explanations and practise weaker topics.",
          lowResultCat:
            "Mistakes are part of learning. Review the material and try again.",
        };

  const [phase, setPhase] = useState<QuizPhase>("setup");
  const [quizMode, setQuizMode] =
    useState<QuizMode>("regular");
  const [questionCount, setQuestionCount] = useState(5);
  const [sessionQuestions, setSessionQuestions] = useState<
    QuizQuestion[]
  >([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<
    number | null
  >(null);
  const [answers, setAnswers] = useState<QuizAnswerResult[]>([]);
  const [progress, setProgress] =
    useState<QuizProgress>(loadQuizProgress());

  const currentQuestion = sessionQuestions[currentIndex];
  const isLastQuestion =
    currentIndex === sessionQuestions.length - 1;

  const categoryStats = Object.entries(
    progress.categoryProgress
  )
    .map(([category, categoryProgress]) => {
      const categoryQuestion = quizQuestions.find(
        (question) => question.category === category
      );

      const percentage =
        categoryProgress.total === 0
          ? 0
          : Math.round(
              (categoryProgress.correct /
                categoryProgress.total) *
                100
            );

      return {
        category,
        title:
          categoryQuestion?.categoryLabel[
            quizLanguage
          ] ?? category,
        percentage,
        correct: categoryProgress.correct,
        total: categoryProgress.total,
      };
    })
    .sort((first, second) =>
      first.title.localeCompare(second.title)
    );

  const startQuiz = (
    mode: QuizMode = "regular"
  ) => {
    const sourceQuestions =
      mode === "mistakes"
        ? quizQuestions.filter((question) =>
            progress.wrongQuestionIds.includes(
              question.id
            )
          )
        : quizQuestions;

    if (sourceQuestions.length === 0) {
      return;
    }

    const nextQuestionCount =
      mode === "mistakes"
        ? Math.min(sourceQuestions.length, 10)
        : questionCount;

    const nextQuestions = shuffleQuestions(
      sourceQuestions
    ).slice(0, nextQuestionCount);

    setQuizMode(mode);
    setSessionQuestions(nextQuestions);
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswers([]);
    setPhase("question");
  };

  const finishCurrentQuestion = () => {
    if (!currentQuestion || selectedOption === null) {
      return;
    }

    const currentAnswer: QuizAnswerResult = {
      questionId: currentQuestion.id,
      category: currentQuestion.category,
      isCorrect:
        selectedOption === currentQuestion.correctOptionIndex,
    };

    const nextAnswers = [...answers, currentAnswer];
    setAnswers(nextAnswers);

    if (isLastQuestion) {
      const nextProgress = saveQuizResult(
        nextAnswers,
        {
          countAttempt: quizMode === "regular",
          updateBestResult:
            quizMode === "regular",
        }
      );

      setProgress(nextProgress);
      setPhase("result");
      return;
    }

    setCurrentIndex((index) => index + 1);
    setSelectedOption(null);
  };

  const score = answers.filter(
    (answer) => answer.isCorrect
  ).length;

  const percentage =
    answers.length === 0
      ? 0
      : Math.round((score / answers.length) * 100);

  let resultMood: QACatMood = "sad";
  let resultMessage = labels.lowResultCat;

  if (percentage >= 80) {
    resultMood = "trophy";
    resultMessage = labels.goodResultCat;
  } else if (percentage >= 50) {
    resultMood = "happy";
    resultMessage = labels.mediumResultCat;
  }

  return (
    <section>
      <div className="mb-8">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          {labels.badge}
        </p>

        <h1 className="mb-4 text-3xl font-black sm:text-4xl">
          {labels.title}
        </h1>

        <p className="max-w-3xl leading-8 text-slate-300">
          {labels.description}
        </p>
      </div>

      {phase === "setup" && (
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 sm:p-7">
            <QACat mood="idle" message={labels.setupCat} />

            <div className="mt-7">
              <p className="mb-3 font-semibold">
                {labels.questionsCount}
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[5, 10].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setQuestionCount(count)}
                    className={`rounded-xl border px-4 py-4 font-bold transition ${
                      questionCount === count
                        ? "border-cyan-400 bg-cyan-400 text-slate-950"
                        : "border-slate-700 text-slate-200 hover:border-cyan-400"
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => startQuiz("regular")}
              className="mt-7 w-full rounded-xl bg-cyan-400 px-5 py-4 font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              {labels.start}
            </button>

            <button
              type="button"
              disabled={
                progress.wrongQuestionIds.length === 0
              }
              onClick={() => startQuiz("mistakes")}
              className="mt-3 w-full rounded-xl border border-cyan-400 px-5 py-4 font-bold text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950 disabled:cursor-not-allowed disabled:border-slate-700 disabled:text-slate-500 disabled:hover:bg-transparent"
            >
              {progress.wrongQuestionIds.length > 0
                ? `${labels.reviewMistakes} (${progress.wrongQuestionIds.length})`
                : labels.noMistakes}
            </button>
          </article>

          <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 sm:p-7">
            <div className="grid gap-4">
              <div className="rounded-2xl bg-slate-950 p-4">
                <p className="text-sm text-slate-400">
                  {labels.best}
                </p>
                <p className="mt-2 text-3xl font-black text-cyan-400">
                  {progress.bestPercentage}%
                </p>
              </div>

              <div className="rounded-2xl bg-slate-950 p-4">
                <p className="text-sm text-slate-400">
                  {labels.attempts}
                </p>
                <p className="mt-2 text-2xl font-bold">
                  {progress.totalAttempts}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-950 p-4">
                <p className="text-sm text-slate-400">
                  {labels.studied}
                </p>
                <p className="mt-2 text-2xl font-bold">
                  {progress.studiedQuestionIds.length} /{" "}
                  {quizQuestions.length}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-950 p-4">
                <p className="text-sm text-slate-400">
                  {labels.mistakes}
                </p>
                <p className="mt-2 text-2xl font-bold">
                  {progress.wrongQuestionIds.length}
                </p>
              </div>

              {categoryStats.length > 0 && (
                <div className="rounded-2xl bg-slate-950 p-4">
                  <p className="mb-4 text-sm font-semibold text-slate-300">
                    {labels.categoryProgress}
                  </p>

                  <div className="grid gap-4">
                    {categoryStats.map((category) => (
                      <div key={category.category}>
                        <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                          <span className="text-slate-300">
                            {category.title}
                          </span>

                          <span className="font-semibold text-cyan-300">
                            {category.percentage}%
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                          <div
                            className="h-full rounded-full bg-cyan-400 transition-all"
                            style={{
                              width: `${category.percentage}%`,
                            }}
                          />
                        </div>

                        <p className="mt-1 text-xs text-slate-500">
                          {category.correct} / {category.total}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>
        </div>
      )}

      {phase === "question" && currentQuestion && (
        <article className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900/70 p-5 sm:p-7">
          <div className="mb-6 flex items-center justify-between gap-3">
            <span className="rounded-full bg-slate-800 px-3 py-2 text-sm text-cyan-300">
              {
                currentQuestion.categoryLabel[
                  quizLanguage
                ]
              }
            </span>

            <span className="text-sm text-slate-400">
              {labels.question} {currentIndex + 1} {labels.of}{" "}
              {sessionQuestions.length}
            </span>
          </div>

          {quizMode === "mistakes" && (
            <p className="mb-4 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm font-semibold text-amber-300">
              {labels.reviewMode}
            </p>
          )}

          <QACat
            mood="thinking"
            message={labels.thinkingCat}
          />

          <h2 className="my-7 text-2xl font-bold leading-9">
            {currentQuestion.question[quizLanguage]}
          </h2>

          <div className="grid gap-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedOption === index;
              const isCorrect =
                index === currentQuestion.correctOptionIndex;

              let optionClass =
                "border-slate-700 hover:border-cyan-400";

              if (selectedOption !== null) {
                if (isCorrect) {
                  optionClass =
                    "border-emerald-400 bg-emerald-400/10";
                } else if (isSelected) {
                  optionClass =
                    "border-rose-400 bg-rose-400/10";
                }
              } else if (isSelected) {
                optionClass =
                  "border-cyan-400 bg-cyan-400/10";
              }

              return (
                <button
                  key={`${currentQuestion.id}-${index}`}
                  type="button"
                  disabled={selectedOption !== null}
                  onClick={() => setSelectedOption(index)}
                  className={`rounded-xl border p-4 text-left leading-7 transition ${optionClass}`}
                >
                  {option[quizLanguage]}
                </button>
              );
            })}
          </div>

          {selectedOption !== null && (
            <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-950 p-5">
              <p
                className={`mb-3 font-bold ${
                  selectedOption ===
                  currentQuestion.correctOptionIndex
                    ? "text-emerald-400"
                    : "text-rose-400"
                }`}
              >
                {selectedOption ===
                currentQuestion.correctOptionIndex
                  ? labels.correct
                  : labels.incorrect}
              </p>

              <p className="mb-2 text-sm font-semibold text-cyan-300">
                {labels.explanation}
              </p>

              <p className="leading-7 text-slate-300">
                {
                  currentQuestion.explanation[
                    quizLanguage
                  ]
                }
              </p>
            </div>
          )}

          <button
            type="button"
            disabled={selectedOption === null}
            onClick={finishCurrentQuestion}
            className="mt-6 w-full rounded-xl bg-cyan-400 px-5 py-4 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isLastQuestion ? labels.finish : labels.next}
          </button>
        </article>
      )}

      {phase === "result" && (
        <article className="mx-auto max-w-2xl rounded-3xl border border-slate-800 bg-slate-900/70 p-5 text-center sm:p-8">
          <QACat mood={resultMood} message={resultMessage} />

          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            {labels.result}
          </p>

          <p className="mt-4 text-6xl font-black">
            {score} / {answers.length}
          </p>

          <p className="mt-3 text-2xl font-bold text-cyan-400">
            {percentage}%
          </p>

          <div className="mt-8 grid gap-3">
            <button
              type="button"
              onClick={() => setPhase("setup")}
              className="w-full rounded-xl bg-cyan-400 px-5 py-4 font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              {labels.restart}
            </button>

            {progress.wrongQuestionIds.length > 0 && (
              <button
                type="button"
                onClick={() => startQuiz("mistakes")}
                className="w-full rounded-xl border border-cyan-400 px-5 py-4 font-bold text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950"
              >
                {labels.reviewMistakes} (
                {progress.wrongQuestionIds.length})
              </button>
            )}
          </div>
        </article>
      )}
    </section>
  );
}

export default QuizPage;
