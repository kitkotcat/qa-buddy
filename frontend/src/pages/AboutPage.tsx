import { useLanguage } from "../i18n/LanguageContext";

function AboutPage() {
  const { t } = useLanguage();

  const stackItems = [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "FastAPI",
    "Python",
    "Pytest",
    "Swagger",
    "GitHub",
  ];

  const featureItems = [
    t("home.bugReportsTitle"),
    t("home.testCasesTitle"),
    t("home.checklistsTitle"),
    t("home.interviewTitle"),
  ];

  return (
    <section>
      <div className="mb-10">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          {t("about.badge")}
        </p>

        <h1 className="mb-4 text-4xl font-bold">{t("about.title")}</h1>

        <p className="max-w-3xl text-lg leading-8 text-slate-300">
          {t("about.description")}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="mb-4 text-2xl font-bold">{t("about.goalTitle")}</h2>
          <p className="leading-8 text-slate-300">{t("about.goalText")}</p>
        </article>

        <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="mb-4 text-2xl font-bold">{t("about.stackTitle")}</h2>
          <div className="flex flex-wrap gap-3">
            {stackItems.map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-cyan-300"
              >
                {item}
              </span>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="mb-4 text-2xl font-bold">
            {t("about.featuresTitle")}
          </h2>

          <ul className="space-y-3 text-slate-300">
            {featureItems.map((item) => (
              <li key={item}>✅ {item}</li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="mb-4 text-2xl font-bold">{t("about.docsTitle")}</h2>
          <p className="leading-8 text-slate-300">{t("about.docsText")}</p>
        </article>
      </div>

      <article className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
        <h2 className="mb-4 text-2xl font-bold">{t("about.roadmapTitle")}</h2>
        <p className="leading-8 text-slate-300">{t("about.roadmapText")}</p>
      </article>
    </section>
  );
}

export default AboutPage;
