type PlaceholderPageProps = {
  title: string;
  description: string;
};

function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
        QA Cat Buddy Tool
      </p>

      <h1 className="mb-4 text-4xl font-bold">{title}</h1>

      <p className="mb-6 max-w-3xl leading-8 text-slate-300">{description}</p>

      <div className="rounded-2xl border border-dashed border-slate-700 p-6 text-slate-400">
        This page will be implemented in the next development step.
      </div>
    </section>
  );
}

export default PlaceholderPage;
