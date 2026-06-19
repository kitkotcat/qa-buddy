import { Link } from "react-router-dom";
import qaCatMain from "../assets/qa-cat/qa-cat-main.webp";
import { useLanguage } from "../i18n/LanguageContext";

function AboutPage() {
  const { language } = useLanguage();

  const content =
    language === "ru"
      ? {
          badge: "О ПРИЛОЖЕНИИ",
          title: "О QA Cat Buddy",
          description:
            "QA Cat Buddy — офлайн-помощник для практики и самопроверки знаний QA.",
          intro:
            "Приложение помогает начинающим тестировщикам составлять QA-документацию, использовать готовые чек-листы, повторять теорию и готовиться к собеседованиям.",

          featuresTitle: "Возможности",
          features: [
            "Создание структурированных баг-репортов",
            "Создание тест-кейсов",
            "Библиотека чек-листов для Web, Mobile и API",
            "Тренажёр вопросов для собеседования",
            "Тесты знаний на 5, 10 и 20 вопросов",
            "Повторение ошибок и отслеживание прогресса",
            "Интерфейс на русском и английском языках",
          ],

          offlineTitle: "Офлайн и конфиденциальность",
          offlineText:
            "Основные функции Android-приложения доступны без подключения к интернету. Регистрация не требуется. Выбранная цель подготовки, прогресс, настройки и сохранённые материалы хранятся локально на устройстве.",

          noticeTitle: "Важно",
          noticeText:
            "Материалы приложения носят справочный и практический характер. QA Cat Buddy не является официальной образовательной программой, не выдаёт документы об образовании и не гарантирует трудоустройство или успешное прохождение собеседования.",

          developmentTitle: "О разработке",
          developmentText:
            "QA Cat Buddy развивается как самостоятельный Web- и Android-продукт. Проект включает frontend, backend, API, автоматизированные тесты и ручное тестирование мобильной версии.",

          stackTitle: "Технологический стек",
          versionTitle: "Текущая версия",
          version: "v0.3.0 — Android Offline MVP",
          status:
            "Приложение находится в активной разработке.",
          privacyLink: "Политика конфиденциальности",
        }
      : {
          badge: "ABOUT THE APP",
          title: "About QA Cat Buddy",
          description:
            "QA Cat Buddy is an offline assistant for QA practice and knowledge self-assessment.",
          intro:
            "The application helps beginner testers create QA documentation, use ready-made checklists, review theory and prepare for interviews.",

          featuresTitle: "Features",
          features: [
            "Structured bug report creation",
            "Test case creation",
            "Checklist library for Web, Mobile and API",
            "Interview question trainer",
            "Knowledge quizzes with 5, 10 and 20 questions",
            "Mistake review and progress tracking",
            "Russian and English interface",
          ],

          offlineTitle: "Offline use and privacy",
          offlineText:
            "The main Android features are available without an internet connection. No registration is required. The selected preparation goal, progress, settings and saved materials are stored locally on the device.",

          noticeTitle: "Important",
          noticeText:
            "The materials are provided for reference and practice purposes. QA Cat Buddy is not an accredited educational programme, does not issue educational certificates and does not guarantee employment or interview success.",

          developmentTitle: "Development",
          developmentText:
            "QA Cat Buddy is being developed as an independent Web and Android product. The project includes a frontend, backend, API, automated tests and manual mobile testing.",

          stackTitle: "Technology stack",
          versionTitle: "Current version",
          version: "v0.3.0 — Android Offline MVP",
          status:
            "The application is under active development.",
          privacyLink: "Privacy Policy",
        };

  const stackItems = [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Vite",
    "FastAPI",
    "Python",
    "Pydantic",
    "Pytest",
    "Capacitor",
    "Android SDK",
    "Gradle",
    "GitHub",
  ];

  return (
    <section>
      <div className="mb-10 grid items-center gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            {content.badge}
          </p>

          <h1 className="mb-5 text-4xl font-black sm:text-5xl">
            {content.title}
          </h1>

          <p className="max-w-3xl text-xl font-semibold leading-9 text-slate-200">
            {content.description}
          </p>

          <p className="mt-4 max-w-3xl leading-8 text-slate-400">
            {content.intro}
          </p>
        </div>

        <img
          src={qaCatMain}
          alt=""
          className="mx-auto hidden w-full max-w-[280px] rounded-full lg:block"
          aria-hidden="true"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
          <h2 className="mb-6 text-3xl font-bold">
            {content.featuresTitle}
          </h2>

          <ul className="grid gap-4">
            {content.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 leading-7 text-slate-300"
              >
                <span
                  className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400 font-black text-slate-950"
                  aria-hidden="true"
                >
                  ✓
                </span>

                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </article>

        <div className="grid gap-6">
          <article className="rounded-3xl border border-cyan-400/30 bg-cyan-400/5 p-6 sm:p-8">
            <h2 className="mb-4 text-2xl font-bold">
              {content.offlineTitle}
            </h2>

            <p className="leading-8 text-slate-300">
              {content.offlineText}
            </p>
          </article>

          <article className="rounded-3xl border border-amber-400/30 bg-amber-400/5 p-6 sm:p-8">
            <h2 className="mb-4 text-2xl font-bold text-amber-200">
              {content.noticeTitle}
            </h2>

            <p className="leading-8 text-slate-300">
              {content.noticeText}
            </p>
          </article>
        </div>

        <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-bold">
            {content.developmentTitle}
          </h2>

          <p className="leading-8 text-slate-300">
            {content.developmentText}
          </p>
        </article>

        <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
          <h2 className="mb-6 text-2xl font-bold">
            {content.stackTitle}
          </h2>

          <div className="flex flex-wrap gap-3">
            {stackItems.map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-700 px-4 py-2 font-semibold text-cyan-300"
              >
                {item}
              </span>
            ))}
          </div>
        </article>
      </div>

      <article className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
          {content.versionTitle}
        </p>

        <h2 className="mt-3 text-2xl font-bold">
          {content.version}
        </h2>

        <p className="mt-2 text-slate-400">
          {content.status}
        </p>

        <Link
          to="/privacy"
          className="mt-5 inline-flex rounded-xl border border-cyan-400 px-5 py-3 font-semibold text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950"
        >
          {content.privacyLink}
        </Link>
      </article>
    </section>
  );
}

export default AboutPage;
