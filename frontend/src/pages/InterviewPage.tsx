import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  getInterviewQuestionByIdApi,
  getInterviewQuestionsApi,
  getRandomInterviewQuestionApi,
} from "../api/interview";
import type { InterviewQuestion } from "../api/interview";
import { useLanguage } from "../i18n/LanguageContext";

function InterviewPage() {
  const { language, t } = useLanguage();

  const [questions, setQuestions] = useState<
    InterviewQuestion[]
  >([]);

  const [selectedQuestion, setSelectedQuestion] =
    useState<InterviewQuestion | null>(null);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [searchQuery, setSearchQuery] =
    useState("");

  const [answerMode, setAnswerMode] = useState<
    "short" | "detailed"
  >("short");

  const [isAnswerVisible, setIsAnswerVisible] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isQuestionLoading, setIsQuestionLoading] =
    useState(false);

  const [error, setError] = useState("");
  const [copyMessage, setCopyMessage] =
    useState("");

  const questionRef =
    useRef<HTMLElement | null>(null);

  const answerRef =
    useRef<HTMLDivElement | null>(null);

  const labels =
    language === "ru"
      ? {
          tryFirst:
            "Попробуй ответить самостоятельно, затем открой правильный ответ.",
          showAnswer: "Показать ответ",
          hideAnswer: "Скрыть ответ",
          nextQuestion: "Следующий вопрос",
        }
      : {
          tryFirst:
            "Try to answer by yourself, then open the suggested answer.",
          showAnswer: "Show answer",
          hideAnswer: "Hide answer",
          nextQuestion: "Next question",
        };

  const scrollToQuestion = () => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        questionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
  };

  const scrollToAnswer = () => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        answerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
  };

  const isMobileScreen = () =>
    window.matchMedia("(max-width: 1023px)")
      .matches;

  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true);
      setError("");
      setCopyMessage("");
      setIsAnswerVisible(false);

      try {
        const data =
          await getInterviewQuestionsApi(language);

        setQuestions(data);

        if (data.length > 0) {
          setSelectedQuestion(data[0]);
          setSelectedCategory("All");
          setAnswerMode("short");
        } else {
          setSelectedQuestion(null);
        }
      } catch {
        setError(t("interview.loadError"));
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, [language, t]);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(
        questions.map(
          (question) => question.category
        )
      )
    );

    return ["All", ...uniqueCategories];
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    const normalizedSearchQuery = searchQuery
      .trim()
      .toLowerCase();

    return questions.filter((question) => {
      const matchesCategory =
        selectedCategory === "All" ||
        question.category === selectedCategory;

      if (!matchesCategory) {
        return false;
      }

      if (!normalizedSearchQuery) {
        return true;
      }

      const searchableText = [
        question.category,
        question.question,
        question.short_answer,
        question.detailed_answer,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(
        normalizedSearchQuery
      );
    });
  }, [
    questions,
    searchQuery,
    selectedCategory,
  ]);

  const selectQuestion = async (
    id: number,
    shouldScroll = true
  ) => {
    setIsQuestionLoading(true);
    setError("");
    setCopyMessage("");
    setAnswerMode("short");
    setIsAnswerVisible(false);

    try {
      const data =
        await getInterviewQuestionByIdApi(
          id,
          language
        );

      setSelectedQuestion(data);
    } catch {
      setError(
        t("interview.loadSelectedError")
      );
    } finally {
      setIsQuestionLoading(false);

      if (shouldScroll && isMobileScreen()) {
        scrollToQuestion();
      }
    }
  };

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    setCopyMessage("");
    setAnswerMode("short");
    setIsAnswerVisible(false);

    const firstQuestion =
      category === "All"
        ? questions[0]
        : questions.find(
            (question) =>
              question.category === category
          );

    if (firstQuestion) {
      setSelectedQuestion(firstQuestion);
    }
  };

  const loadRandomQuestion = async () => {
    setIsQuestionLoading(true);
    setError("");
    setCopyMessage("");
    setAnswerMode("short");
    setIsAnswerVisible(false);

    try {
      const data =
        await getRandomInterviewQuestionApi(
          language
        );

      setSelectedQuestion(data);
      setSelectedCategory("All");
      setSearchQuery("");
    } catch {
      setError(
        t("interview.loadRandomError")
      );
    } finally {
      setIsQuestionLoading(false);

      if (isMobileScreen()) {
        scrollToQuestion();
      }
    }
  };

  const showAnswer = () => {
    setIsAnswerVisible(true);
    setCopyMessage("");
    scrollToAnswer();
  };

  const hideAnswer = () => {
    setIsAnswerVisible(false);
    setCopyMessage("");
    scrollToQuestion();
  };

  const selectNextQuestion = async () => {
    if (!selectedQuestion) {
      return;
    }

    const availableQuestions =
      filteredQuestions.length > 0
        ? filteredQuestions
        : questions;

    if (availableQuestions.length === 0) {
      return;
    }

    const currentIndex =
      availableQuestions.findIndex(
        (question) =>
          question.id === selectedQuestion.id
      );

    const nextIndex =
      currentIndex >= 0
        ? (currentIndex + 1) %
          availableQuestions.length
        : 0;

    const nextQuestion =
      availableQuestions[nextIndex];

    if (!nextQuestion) {
      return;
    }

    await selectQuestion(
      nextQuestion.id,
      false
    );

    scrollToQuestion();
  };

  const copyAnswer = async () => {
    if (!selectedQuestion) {
      return;
    }

    const answer =
      answerMode === "short"
        ? selectedQuestion.short_answer
        : selectedQuestion.detailed_answer;

    const answerTitle =
      answerMode === "short"
        ? t("interview.shortAnswer")
        : t("interview.detailedAnswer");

    const formattedAnswer = `${t(
      "interview.selectedQuestion"
    )}: ${selectedQuestion.question}

${t("common.category")}: ${
      selectedQuestion.category
    }

${answerTitle}:
${answer}`;

    try {
      await navigator.clipboard.writeText(
        formattedAnswer
      );

      setCopyMessage(t("common.copied"));
    } catch {
      setCopyMessage(t("common.error"));
    }
  };

  const currentAnswer =
    answerMode === "short"
      ? selectedQuestion?.short_answer
      : selectedQuestion?.detailed_answer;

  return (
    <section>
      <div className="mb-10">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          {t("interview.badge")}
        </p>

        <h1 className="mb-4 text-3xl font-bold sm:text-4xl">
          {t("interview.title")}
        </h1>

        <p className="max-w-3xl leading-8 text-slate-300">
          {t("interview.description")}
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-red-200">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 text-slate-300">
          {t("interview.loadingQuestions")}
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4 sm:p-6">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
                {t("interview.libraryTitle")}
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                {t("interview.questions")}
              </h2>
            </div>

            <label className="mb-5 grid gap-2">
              <span className="font-semibold">
                {t("common.search")}
              </span>

              <input
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(
                    event.target.value
                  )
                }
                placeholder={t(
                  "interview.searchPlaceholder"
                )}
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
              />
            </label>

            <div className="mb-6 flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    selectCategory(category)
                  }
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    selectedCategory === category
                      ? "bg-cyan-400 text-slate-950"
                      : "border border-slate-700 text-slate-300 hover:border-cyan-400"
                  }`}
                >
                  {category === "All"
                    ? language === "ru"
                      ? "Все"
                      : "All"
                    : category}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={loadRandomQuestion}
              className="mb-6 w-full rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              {t("interview.randomQuestion")}
            </button>

            <div className="grid max-h-[620px] gap-4 overflow-auto pr-1">
              {filteredQuestions.length ===
              0 ? (
                <div className="rounded-2xl border border-dashed border-slate-700 p-5 text-slate-400">
                  {t("interview.noResults")}
                </div>
              ) : (
                filteredQuestions.map(
                  (question) => {
                    const isActive =
                      selectedQuestion?.id ===
                      question.id;

                    return (
                      <button
                        key={question.id}
                        type="button"
                        onClick={() =>
                          selectQuestion(
                            question.id
                          )
                        }
                        className={`rounded-2xl border p-5 text-left transition ${
                          isActive
                            ? "border-cyan-400 bg-cyan-400/10"
                            : "border-slate-800 bg-slate-950 hover:border-cyan-400"
                        }`}
                      >
                        <div className="mb-3 flex items-center justify-between gap-4">
                          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-cyan-300">
                            {question.category}
                          </span>

                          <span className="text-sm text-slate-500">
                            #{question.id}
                          </span>
                        </div>

                        <h3 className="text-lg font-semibold leading-7">
                          {question.question}
                        </h3>
                      </button>
                    );
                  }
                )
              )}
            </div>
          </aside>

          <main
            ref={questionRef}
            className="scroll-mt-24 rounded-3xl border border-slate-800 bg-slate-900/70 p-4 sm:p-6"
          >
            {isQuestionLoading ||
            !selectedQuestion ? (
              <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-dashed border-slate-700 p-6 text-slate-500">
                {t(
                  "interview.loadingSelected"
                )}
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
                    {t(
                      "interview.selectedQuestion"
                    )}
                  </p>

                  <h2 className="mb-4 text-2xl font-bold leading-tight sm:text-3xl">
                    {
                      selectedQuestion.question
                    }
                  </h2>

                  <p className="text-slate-400">
                    {t("common.category")}:{" "}
                    {
                      selectedQuestion.category
                    }
                  </p>
                </div>

                {!isAnswerVisible ? (
                  <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/5 p-5">
                    <p className="leading-7 text-slate-300">
                      {labels.tryFirst}
                    </p>

                    <button
                      type="button"
                      onClick={showAnswer}
                      aria-expanded={false}
                      className="mt-5 w-full rounded-xl bg-cyan-400 px-5 py-4 text-base font-bold text-slate-950 transition hover:bg-cyan-300"
                    >
                      {labels.showAnswer} ↓
                    </button>
                  </div>
                ) : (
                  <div
                    ref={answerRef}
                    className="scroll-mt-24"
                  >
                    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      <button
                        type="button"
                        onClick={() => {
                          setAnswerMode(
                            "short"
                          );
                          setCopyMessage("");
                        }}
                        className={`rounded-xl px-4 py-3 font-semibold transition ${
                          answerMode === "short"
                            ? "bg-cyan-400 text-slate-950"
                            : "border border-slate-700 text-slate-300 hover:border-cyan-400"
                        }`}
                      >
                        {t(
                          "interview.shortAnswer"
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setAnswerMode(
                            "detailed"
                          );
                          setCopyMessage("");
                        }}
                        className={`rounded-xl px-4 py-3 font-semibold transition ${
                          answerMode ===
                          "detailed"
                            ? "bg-cyan-400 text-slate-950"
                            : "border border-slate-700 text-slate-300 hover:border-cyan-400"
                        }`}
                      >
                        {t(
                          "interview.detailedAnswer"
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={copyAnswer}
                        className="rounded-xl border border-cyan-400 px-4 py-3 font-semibold text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950 sm:ml-auto"
                      >
                        {t(
                          "interview.copyAnswer"
                        )}
                      </button>
                    </div>

                    {copyMessage && (
                      <div className="mb-5 rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-4 py-3 text-cyan-200">
                        {copyMessage}
                      </div>
                    )}

                    <article className="rounded-2xl border border-slate-800 bg-slate-950 p-5 sm:p-6">
                      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
                        {answerMode === "short"
                          ? t(
                              "interview.shortAnswer"
                            )
                          : t(
                              "interview.detailedAnswer"
                            )}
                      </p>

                      <p className="whitespace-pre-wrap text-base leading-8 text-slate-200 sm:text-lg sm:leading-9">
                        {currentAnswer}
                      </p>
                    </article>

                    <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-5">
                      <h3 className="mb-3 text-lg font-semibold">
                        {t(
                          "interview.practiceTipTitle"
                        )}
                      </h3>

                      <p className="leading-8 text-slate-400">
                        {t(
                          "interview.practiceTipText"
                        )}
                      </p>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={hideAnswer}
                        className="rounded-xl border border-slate-700 px-5 py-4 font-semibold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
                      >
                        ↑ {labels.hideAnswer}
                      </button>

                      <button
                        type="button"
                        onClick={
                          selectNextQuestion
                        }
                        className="rounded-xl bg-cyan-400 px-5 py-4 font-bold text-slate-950 transition hover:bg-cyan-300"
                      >
                        {labels.nextQuestion} →
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      )}
    </section>
  );
}

export default InterviewPage;
