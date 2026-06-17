import ToolCard from "../components/ToolCard";
import { tools } from "../data/tools";

function HomePage() {
  return (
    <div>
      <section className="mb-12 py-10">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          QA Buddy
        </p>

        <h1 className="mb-6 max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
          Smart assistant for beginner QA engineers
        </h1>

        <p className="max-w-3xl text-lg leading-8 text-slate-300">
          QA Buddy helps junior QA engineers create bug reports, test cases,
          checklists and prepare for interviews. This pet-project is built with
          React, TypeScript, Tailwind CSS and FastAPI.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="http://127.0.0.1:8000/docs"
            target="_blank"
            className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Open API Docs
          </a>

          <a
            href="http://127.0.0.1:8000/api/health"
            target="_blank"
            className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-200 transition hover:border-cyan-400"
          >
            Check Backend Health
          </a>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        {tools.map((tool) => (
          <ToolCard
            key={tool.title}
            title={tool.title}
            description={tool.description}
            path={tool.path}
            status={tool.status}
          />
        ))}
      </section>
    </div>
  );
}

export default HomePage;
