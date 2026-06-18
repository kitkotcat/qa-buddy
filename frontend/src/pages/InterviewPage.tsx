import { useEffect, useMemo, useState } from "react";
import {
  getInterviewQuestionByIdApi,
  getInterviewQuestionsApi,
  getRandomInterviewQuestionApi,
} from "../api/interview";
import type { InterviewQuestion } from "../api/interview";

function InterviewPage() {
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [selectedQuestion, setSelectedQuestion] =
    useState<InterviewQuestion | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [answerMode, setAnswerMode] = useState<"short" | "detailed">("short");
  const [isLoading, setIsLoading] = useState(true);
  const [isQuestionLoading, setIsQuestionLoading] = useState(false);
  const [error, setError] = useState("");
  const [copyMessage, setCopyMessage] = useState("");

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    setIsLoading(true);
    setError("");

    try {
      const data = await getInterviewQuestionsApi();
      setQuestions(data);

      if (data.length > 0) {
        setSelectedQuestion(data[0]);
      }
    } catch {
      setError(
        "Could not load interview questions. Please check that backend is running."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(questions.map((question) => question.category))
    );

    return ["All", ...uniqueCategories];
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    if (selectedCategory === "All") {
      return questions;
    }

    return questions.filter(
      (question) => question.category === selectedCategory
    );
  }, [questions, selectedCategory]);

  const selectQuestion = async (id: number) => {
    setIsQuestionLoading(true);
    setError("");
    setCopyMessage("");
    setAnswerMode("short");

    try {
      const data = await getInterviewQuestionByIdApi(id);
      setSelectedQuestion(data);
    } catch {
      setError("Could not load selected interview question.");
    } finally {
      setIsQuestionLoading(false);
    }
  };

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    setCopyMessage("");

    const firstQuestion =
      category === "All"
        ? questions[0]
        : questions.find((question) => question.category === category);

    if (firstQuestion) {
      setSelectedQuestion(firstQuestion);
      setAnswerMode("short");
    }
  };

  const loadRandomQuestion = async () => {
    setIsQuestionLoading(true);
    setError("");
    setCopyMessage("");
    setAnswerMode("short");

    try {
      const data = await getRandomInterviewQuestionApi();
      setSelectedQuestion(data);
      setSelectedCategory("All");
    } catch {
      setError("Could not load random interview question.");
    } finally {
      setIsQuestionLoading(false);
    }
  };

  const copyAnswer = async () => {
    if (!selectedQuestion) {
      return;
    }

    const answer =
      answerMode === "short"
        ? selectedQuestion.short_answer
        : selectedQuestion.detailed_answer;

    const formattedAnswer = `Question: ${selectedQuestion.question}

Category: ${selectedQuestion.category}

Answer:
${answer}`;

    try {
      await navigator.clipboard.writeText(formattedAnswer);
      setCopyMessage("Answer copied to clipboard.");
    } catch {
      setCopyMessage("Could not copy answer. Please copy it manually.");
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
          QA Buddy Tool
        </p>

        <h1 className="mb-4 text-4xl font-bold">Interview Trainer</h1>

        <p className="max-w-3xl leading-8 text-slate-300">
          Practice QA interview questions by category. Learn short answers for
          quick interviews and detailed answers for deeper preparation.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-red-200">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 text-slate-300">
          Loading interview questions...
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
                Training library
              </p>
              <h2 className="mt-2 text-2xl font-bold">Questions</h2>
            </div>

            <div className="mb-6 flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => selectCategory(category)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    selectedCategory === category
                      ? "bg-cyan-400 text-slate-950"
                      : "border border-slate-700 text-slate-300 hover:border-cyan-400"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={loadRandomQuestion}
              className="mb-6 w-full rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Random question
            </button>

            <div className="grid max-h-[620px] gap-4 overflow-auto pr-1">
              {filteredQuestions.map((question) => {
                const isActive = selectedQuestion?.id === question.id;

                return (
                  <button
                    key={question.id}
                    type="button"
                    onClick={() => selectQuestion(question.id)}
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
              })}
            </div>
          </aside>

          <main className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            {isQuestionLoading || !selectedQuestion ? (
              <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-dashed border-slate-700 p-6 text-slate-500">
                Loading selected question...
              </div>
            ) : (
              <>
                <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
                      Selected question
                    </p>

                    <h2 className="mb-4 text-3xl font-bold leading-tight">
                      {selectedQuestion.question}
                    </h2>

                    <p className="text-slate-400">
                      Category: {selectedQuestion.category}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={copyAnswer}
                    className="rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-300"
                  >
                    Copy answer
                  </button>
                </div>

                <div className="mb-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setAnswerMode("short");
                      setCopyMessage("");
                    }}
                    className={`rounded-xl px-4 py-2 font-semibold transition ${
                      answerMode === "short"
                        ? "bg-cyan-400 text-slate-950"
                        : "border border-slate-700 text-slate-300 hover:border-cyan-400"
                    }`}
                  >
                    Short answer
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAnswerMode("detailed");
                      setCopyMessage("");
                    }}
                    className={`rounded-xl px-4 py-2 font-semibold transition ${
                      answerMode === "detailed"
                        ? "bg-cyan-400 text-slate-950"
                        : "border border-slate-700 text-slate-300 hover:border-cyan-400"
                    }`}
                  >
                    Detailed answer
                  </button>
                </div>

                {copyMessage && (
                  <div className="mb-5 rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-4 py-3 text-cyan-200">
                    {copyMessage}
                  </div>
                )}

                <article className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
                    {answerMode === "short" ? "Short answer" : "Detailed answer"}
                  </p>

                  <p className="whitespace-pre-wrap text-lg leading-9 text-slate-200">
                    {currentAnswer}
                  </p>
                </article>

                <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-5">
                  <h3 className="mb-3 text-lg font-semibold">Practice tip</h3>

                  <p className="leading-8 text-slate-400">
                    First, try to answer the question yourself. Then open the
                    short answer. Use the detailed answer only after your first
                    attempt.
                  </p>
                </div>
              </>
            )}
          </main>
        </div>
      )}
    </section>
  );
}

export default InterviewPage;
