import { useLanguage } from "../i18n/LanguageContext";
import QACat from "../components/QACat";

function RecorderPage() {
  const { language } = useLanguage();

  const labels =
    language === "ru"
      ? {
          badge: "QA Buddy Ecosystem",
          title: "QA Buddy Recorder",
          description:
            "Браузерное расширение для записи шагов воспроизведения, технических доказательств и подготовки баг-репортов.",
          whatItDoes: "Что уже умеет",
          items: [
            "Запускать, ставить на паузу и завершать QA-сессию.",
            "Записывать переходы по страницам и клики.",
            "Фиксировать изменение полей без сохранения введённых значений.",
            "Показывать плавающую панель QA Buddy во время записи.",
          ],
          note: "Recorder живёт в отдельном репозитории, но является частью QA Buddy.",
          openRepo: "Открыть QA Buddy Recorder",
        }
      : {
          badge: "QA Buddy Ecosystem",
          title: "QA Buddy Recorder",
          description:
            "A browser extension for recording reproduction steps, technical evidence and preparing bug reports.",
          whatItDoes: "What it already does",
          items: [
            "Start, pause, resume and stop a QA session.",
            "Record page navigation and clicks.",
            "Track field changes without storing typed values.",
            "Show a floating QA Buddy toolbar while recording.",
          ],
          note: "Recorder lives in a separate repository but is part of QA Buddy.",
          openRepo: "Open QA Buddy Recorder",
        };

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-cyan-400/30 bg-cyan-400/5 p-6 sm:p-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
          {labels.badge}
        </p>

        <h1 className="mb-4 text-3xl font-black sm:text-4xl">
          {labels.title}
        </h1>

        <p className="max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
          {labels.description}
        </p>
      </div>

      <QACat mood="thinking" message={labels.note} />

      <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
        <h2 className="mb-5 text-2xl font-bold">{labels.whatItDoes}</h2>

        <ul className="space-y-3 text-slate-300">
          {labels.items.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-1 text-cyan-400">●</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <a
          href="https://github.com/kitkotcat/qa-buddy-recorder"
          target="_blank"
          rel="noreferrer"
          className="mt-7 inline-flex rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
        >
          {labels.openRepo} ↗
        </a>
      </article>
    </section>
  );
}

export default RecorderPage;
