import { Link } from "react-router-dom";
import QAThemeBackground from "../components/QAThemeBackground";
import LearningGoalBanner from "../components/LearningGoalBanner";
import { useLanguage } from "../i18n/LanguageContext";
import { quizQuestions } from "../features/quiz/quizQuestions";
import { loadQuizProgress } from "../features/quiz/quizProgressService";

function HomePage() {
  const { language, t } = useLanguage();
  const quizProgress = loadQuizProgress();

  const studiedCount =
    quizProgress.studiedQuestionIds.length;

  const learningPercentage =
    quizQuestions.length === 0
      ? 0
      : Math.round(
          (studiedCount / quizQuestions.length) * 100
        );

  const labels =
    language === "ru"
      ? {
          progressTitle: "Твой учебный прогресс",
          progressDescription:
            "Продолжай обучение, повторяй ошибки и улучшай результат.",
          studied: "Изучено вопросов",
          best: "Лучший результат",
          attempts: "Попыток",
          mistakes: "Нужно повторить",
          continueLearning: "Продолжить обучение",
          quizTitle: "Тест знаний QA",
          quizDescription:
            "Проверяй знания, изучай объяснения, сохраняй прогресс и повторяй ошибки вместе с QA Cat.",
          quizButton: "Пройти тест знаний",
        }
      : {
          progressTitle: "Your learning progress",
          progressDescription:
            "Continue learning, review mistakes and improve your result.",
          studied: "Questions studied",
          best: "Best result",
          attempts: "Attempts",
          mistakes: "To review",
          continueLearning: "Continue learning",
          quizTitle: "QA Knowledge Quiz",
          quizDescription:
            "Test your knowledge, study explanations, save progress and review mistakes with QA Cat.",
          quizButton: "Start knowledge quiz",
        };

  const tools = [
    {
      title: t("home.bugReportsTitle"),
      description: t("home.bugReportsDescription"),
      path: "/bug-reports",
    },
    {
      title: t("home.testCasesTitle"),
      description: t("home.testCasesDescription"),
      path: "/test-cases",
    },
    {
      title: t("home.checklistsTitle"),
      description: t("home.checklistsDescription"),
      path: "/checklists",
    },
    {
      title: t("home.interviewTitle"),
      description: t("home.interviewDescription"),
      path: "/interview",
    },
    {
      title: labels.quizTitle,
      description: labels.quizDescription,
      path: "/quiz",
    },
  ];

  return (
    <section>
      <div className="relative mb-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:mb-12 sm:rounded-3xl sm:p-8">
        <QAThemeBackground />

        <div className="relative z-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400 sm:text-sm sm:tracking-[0.3em]">
            {t("home.badge")}
          </p>

          <h1 className="mb-5 max-w-4xl text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
            {t("home.title")}
          </h1>

          <p className="max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8 lg:text-xl lg:leading-9">
            {t("home.description")}
          </p>

          <Link
            to="/quiz"
            className="mt-6 inline-flex rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            {labels.quizButton}
          </Link>
        </div>
      </div>

      <LearningGoalBanner />

      <article className="mb-8 rounded-2xl border border-cyan-400/30 bg-cyan-400/5 p-5 sm:mb-12 sm:rounded-3xl sm:p-7">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
              QA Buddy Progress
            </p>

            <h2 className="text-2xl font-bold sm:text-3xl">
              {labels.progressTitle}
            </h2>

            <p className="mt-2 text-slate-400">
              {labels.progressDescription}
            </p>
          </div>

          <Link
            to="/quiz"
            className="inline-flex justify-center rounded-xl border border-cyan-400 px-5 py-3 font-bold text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950"
          >
            {labels.continueLearning}
          </Link>
        </div>

        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between gap-4">
            <span className="text-sm text-slate-300">
              {labels.studied}
            </span>

            <span className="font-bold text-cyan-300">
              {studiedCount} / {quizQuestions.length}
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-cyan-400 transition-all"
              style={{
                width: `${learningPercentage}%`,
              }}
            />
          </div>

          <p className="mt-2 text-right text-sm text-slate-500">
            {learningPercentage}%
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <div className="rounded-2xl bg-slate-950 p-4">
            <p className="text-sm text-slate-400">
              {labels.best}
            </p>
            <p className="mt-2 text-2xl font-black text-cyan-400">
              {quizProgress.bestPercentage}%
            </p>
          </div>

          <div className="rounded-2xl bg-slate-950 p-4">
            <p className="text-sm text-slate-400">
              {labels.attempts}
            </p>
            <p className="mt-2 text-2xl font-bold">
              {quizProgress.totalAttempts}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-950 p-4">
            <p className="text-sm text-slate-400">
              {labels.studied}
            </p>
            <p className="mt-2 text-2xl font-bold">
              {studiedCount}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-950 p-4">
            <p className="text-sm text-slate-400">
              {labels.mistakes}
            </p>
            <p className="mt-2 text-2xl font-bold">
              {quizProgress.wrongQuestionIds.length}
            </p>
          </div>
        </div>
      </article>

      <div className="mb-5 sm:mb-6">
        <h2 className="text-2xl font-bold sm:text-3xl">
          {t("home.featuresTitle")}
        </h2>
      </div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        {tools.map((tool) => (
          <Link
            key={tool.path}
            to={tool.path}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition hover:border-cyan-400 hover:bg-slate-900 sm:rounded-3xl sm:p-6"
          >
            <h3 className="mb-3 text-xl font-bold sm:text-2xl">
              {tool.title}
            </h3>

            <p className="mb-5 leading-7 text-slate-400 sm:mb-6 sm:leading-8">
              {tool.description}
            </p>

            <span className="font-semibold text-cyan-400">
              {t("home.openTool")} →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default HomePage;
