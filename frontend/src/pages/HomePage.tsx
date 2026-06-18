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
      <div className="mb-12 rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          {t("home.badge")}
        </p>

        <h1 className="mb-5 max-w-4xl text-5xl font-black leading-tight">
          {t("home.title")}
        </h1>

        <p className="max-w-3xl text-xl leading-9 text-slate-300">
          {t("home.description")}
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-3xl font-bold">{t("home.featuresTitle")}</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {tools.map((tool) => (
          <Link
            key={tool.path}
            to={tool.path}
            className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 transition hover:border-cyan-400 hover:bg-slate-900"
          >
            <h3 className="mb-3 text-2xl font-bold">{tool.title}</h3>

            <p className="mb-6 leading-8 text-slate-400">{tool.description}</p>

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
