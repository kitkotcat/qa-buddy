import {
  useState,
  type ReactNode,
} from "react";
import QACat from "./QACat";
import beginnerCat from "../assets/qa-cat/qa-cat-beginner.webp";
import learningCat from "../assets/qa-cat/qa-cat-learning.webp";
import interviewCat from "../assets/qa-cat/qa-cat-interview.webp";
import { useLanguage } from "../i18n/LanguageContext";
import {
  completeOnboarding,
  loadOnboardingProfile,
  type LearningGoal,
} from "../features/onboarding/onboardingService";

type OnboardingGateProps = {
  children: ReactNode;
};

function OnboardingGate({
  children,
}: OnboardingGateProps) {
  const { language } = useLanguage();

  const [isCompleted, setIsCompleted] = useState(
    () => loadOnboardingProfile().completed
  );

  const [selectedGoal, setSelectedGoal] =
    useState<LearningGoal | null>(null);

  const labels =
    language === "ru"
      ? {
          badge: "ДОБРО ПОЖАЛОВАТЬ В QA BUDDY",
          title: "С чего начнём обучение?",
          description:
            "Выбери свою текущую цель. QA Cat предложит подходящий маршрут.",
          beginnerTitle: "Я только начинаю",
          beginnerDescription:
            "Изучу основы QA и начну с коротких тестов.",
          learningTitle: "Я уже изучаю QA",
          learningDescription:
            "Буду практиковать чек-листы, API, SQL и тест-дизайн.",
          interviewTitle: "Готовлюсь к собеседованию",
          interviewDescription:
            "Повторю теорию и потренирую ответы на вопросы.",
          continue: "Продолжить",
          skip: "Пропустить",
          privacy:
            "Выбор хранится только на этом устройстве. Регистрация и интернет не требуются.",
          cat:
            "Привет! Я QA Cat. Помогу выбрать подходящий путь обучения.",
        }
      : {
          badge: "WELCOME TO QA BUDDY",
          title: "Where should we start?",
          description:
            "Choose your current goal. QA Cat will recommend a suitable learning path.",
          beginnerTitle: "I am just starting",
          beginnerDescription:
            "I want to learn QA basics and begin with short quizzes.",
          learningTitle: "I am already studying QA",
          learningDescription:
            "I want to practise checklists, API, SQL and test design.",
          interviewTitle: "I am preparing for interviews",
          interviewDescription:
            "I want to review theory and practise interview questions.",
          continue: "Continue",
          skip: "Skip",
          privacy:
            "Your choice is stored only on this device. No registration or internet connection is required.",
          cat:
            "Hello! I am QA Cat. I will help you choose a suitable learning path.",
        };

  const goals: Array<{
    id: LearningGoal;
    title: string;
    description: string;
    image: string;
  }> = [
    {
      id: "beginner",
      title: labels.beginnerTitle,
      description: labels.beginnerDescription,
      image: beginnerCat,
    },
    {
      id: "learning",
      title: labels.learningTitle,
      description: labels.learningDescription,
      image: learningCat,
    },
    {
      id: "interview",
      title: labels.interviewTitle,
      description: labels.interviewDescription,
      image: interviewCat,
    },
  ];

  const finishOnboarding = (
    goal: LearningGoal | null
  ) => {
    completeOnboarding(goal);
    setIsCompleted(true);
  };

  if (isCompleted) {
    return children;
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 sm:py-12">
      <section className="mx-auto max-w-3xl">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-2xl shadow-cyan-950/20 sm:p-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400 sm:text-sm">
            {labels.badge}
          </p>

          <h1 className="mb-4 text-3xl font-black sm:text-4xl">
            {labels.title}
          </h1>

          <p className="mb-6 leading-7 text-slate-300">
            {labels.description}
          </p>

          <QACat
            mood="idle"
            message={labels.cat}
          />

          <div className="mt-7 grid gap-3">
            {goals.map((goal) => {
              const isSelected =
                selectedGoal === goal.id;

              return (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() =>
                    setSelectedGoal(goal.id)
                  }
                  className={`flex items-start gap-4 rounded-2xl border p-4 text-left transition ${
                    isSelected
                      ? "border-cyan-400 bg-cyan-400/10"
                      : "border-slate-700 bg-slate-950/60 hover:border-cyan-400/70"
                  }`}
                >
                  <span
                    className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border transition ${
                      isSelected
                        ? "border-cyan-400 shadow-lg shadow-cyan-400/20"
                        : "border-slate-700"
                    }`}
                    aria-hidden="true"
                  >
                    <img
                      src={goal.image}
                      alt=""
                      className="h-full w-full object-cover"
                    />

                    {isSelected && (
                      <span className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400 text-sm font-black text-slate-950">
                        ✓
                      </span>
                    )}
                  </span>

                  <span>
                    <span className="block font-bold">
                      {goal.title}
                    </span>

                    <span className="mt-1 block text-sm leading-6 text-slate-400">
                      {goal.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            disabled={!selectedGoal}
            onClick={() =>
              finishOnboarding(selectedGoal)
            }
            className="mt-7 w-full rounded-xl bg-cyan-400 px-5 py-4 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {labels.continue}
          </button>

          <button
            type="button"
            onClick={() => finishOnboarding(null)}
            className="mt-3 w-full rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
          >
            {labels.skip}
          </button>

          <p className="mt-5 text-center text-xs leading-5 text-slate-500">
            {labels.privacy}
          </p>
        </div>
      </section>
    </main>
  );
}

export default OnboardingGate;
