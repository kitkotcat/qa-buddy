function AboutPage() {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
        About Project
      </p>

      <h1 className="mb-4 text-4xl font-bold">About QA Buddy</h1>

      <p className="mb-4 max-w-3xl leading-8 text-slate-300">
        QA Buddy is a pet-project created for a Junior QA / QA Automation
        portfolio. The project demonstrates frontend, backend, API,
        documentation and testing skills.
      </p>

      <p className="max-w-3xl leading-8 text-slate-300">
        The MVP includes a bug report generator, test case generator, checklist
        library and interview trainer.
      </p>
    </section>
  );
}

export default AboutPage;
