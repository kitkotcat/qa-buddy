import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";

function HomePage() {
  const { t } = useLanguage();

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
  ];

  return (
    <section>
      <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:mb-12 sm:rounded-3xl sm:p-8">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400 sm:text-sm sm:tracking-[0.3em]">
          {t("home.badge")}
        </p>

        <h1 className="mb-5 max-w-4xl text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
          {t("home.title")}
        </h1>

        <p className="max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8 lg:text-xl lg:leading-9">
          {t("home.description")}
        </p>
      </div>

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
