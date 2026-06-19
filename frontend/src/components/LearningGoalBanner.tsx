import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";
import {
  loadOnboardingProfile,
  resetOnboarding,
  type LearningGoal,
} from "../features/onboarding/onboardingService";

type GoalContent = {
  title: string;
  description: string;
  button: string;
  path: string;
};

function LearningGoalBanner() {
  const { language } = useLanguage();
  const profile = loadOnboardingProfile();

  if (!profile.goal) {
    return null;
  }

  const content: Record<
    LearningGoal,
    GoalContent
  > =
    language === "ru"
      ? {
          beginner: {
            title: "Начни с основ QA",
            description:
              "Пройди короткий тест на 5 вопросов и изучи объяснения.",
            button: "Начать тест",
            path: "/quiz",
          },
          learning: {
            title: "Продолжай практиковаться",
            description:
              "Используй чек-листы и проверь знания API, SQL и тест-дизайна.",
            button: "Открыть чек-листы",
            path: "/checklists",
          },
          interview: {
            title: "Подготовка к собеседованию",
            description:
              "Повтори вопросы интервью и затем пройди тест на 20 вопросов.",
            button: "Открыть интервью",
            path: "/interview",
          },
        }
      : {
          beginner: {
            title: "Start with QA basics",
            description:
              "Take a short 5-question quiz and study the explanations.",
            button: "Start quiz",
            path: "/quiz",
          },
          learning: {
            title: "Continue practising",
            description:
              "Use checklists and test your API, SQL and test design knowledge.",
            button: "Open checklists",
            path: "/checklists",
          },
          interview: {
            title: "Prepare for interviews",
            description:
              "Review interview questions and then take a 20-question quiz.",
            button: "Open interview trainer",
            path: "/interview",
          },
        };

  const selectedContent = content[profile.goal];

  const changeGoal =
    language === "ru"
      ? "Изменить цель"
      : "Change goal";

  const handleChangeGoal = () => {
    resetOnboarding();
    window.location.reload();
  };

  return (
    <article className="mb-8 rounded-2xl border border-cyan-400/30 bg-cyan-400/5 p-5 sm:rounded-3xl sm:p-6">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
        QA Cat Recommendation
      </p>

      <h2 className="text-xl font-bold sm:text-2xl">
        {selectedContent.title}
      </h2>

      <p className="mt-2 leading-7 text-slate-400">
        {selectedContent.description}
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Link
          to={selectedContent.path}
          className="inline-flex justify-center rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
        >
          {selectedContent.button}
        </Link>

        <button
          type="button"
          onClick={handleChangeGoal}
          className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
        >
          {changeGoal}
        </button>
      </div>
    </article>
  );
}

export default LearningGoalBanner;
