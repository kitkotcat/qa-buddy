import { useState } from "react";
import { generateBugReportApi } from "../api/bugReports";
import { useLanguage } from "../i18n/LanguageContext";

const initialForm = {
  project_name: "",
  environment: "",
  summary: "",
  preconditions: "",
  steps_to_reproduce: "",
  actual_result: "",
  expected_result: "",
  severity: "Major",
  priority: "High",
  attachment_link: "",
};

function BugReportPage() {
  const { language, t } = useLanguage();
  const [form, setForm] = useState(initialForm);
  const [generatedReport, setGeneratedReport] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const severityOptions = ["Blocker", "Critical", "Major", "Minor", "Trivial"];
  const priorityOptions = ["High", "Medium", "Low"];

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
    setMessage("");
  };

  const buildLocalizedReport = () => {
    const steps = form.steps_to_reproduce
      .split("\n")
      .filter((step) => step.trim())
      .map((step, index) => `${index + 1}. ${step.trim()}`)
      .join("\n");

    if (language === "ru") {
      return `БАГ-РЕПОРТ

Проект: ${form.project_name}
Окружение: ${form.environment}

Summary:
${form.summary}

Предусловия:
${form.preconditions || "Не указаны"}

Шаги воспроизведения:
${steps}

Фактический результат:
${form.actual_result}

Ожидаемый результат:
${form.expected_result}

Severity: ${form.severity}
Priority: ${form.priority}

Attachment:
${form.attachment_link || "Не указано"}`;
    }

    return `BUG REPORT

Project: ${form.project_name}
Environment: ${form.environment}

Summary:
${form.summary}

Preconditions:
${form.preconditions || "Not specified"}

Steps to Reproduce:
${steps}

Actual Result:
${form.actual_result}

Expected Result:
${form.expected_result}

Severity: ${form.severity}
Priority: ${form.priority}

Attachment:
${form.attachment_link || "Not specified"}`;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !form.project_name ||
      !form.environment ||
      !form.summary ||
      !form.steps_to_reproduce ||
      !form.actual_result ||
      !form.expected_result
    ) {
      setMessage(t("common.requiredError"));
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      await generateBugReportApi({
        ...form,
        steps_to_reproduce: form.steps_to_reproduce
          .split("\n")
          .filter((step) => step.trim()),
      });

      setGeneratedReport(buildLocalizedReport());
      setMessage(t("bugReports.success"));
    } catch {
      setMessage(`${t("common.error")} ${t("common.backendError")}`);
    } finally {
      setIsLoading(false);
    }
  };

  const clearForm = () => {
    setForm(initialForm);
    setGeneratedReport("");
    setMessage("");
  };

  const copyReport = async () => {
    if (!generatedReport) {
      return;
    }

    await navigator.clipboard.writeText(generatedReport);
    setMessage(t("common.copied"));
  };

  return (
    <section>
      <div className="mb-10">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          {t("bugReports.badge")}
        </p>

        <h1 className="mb-4 text-4xl font-bold">{t("bugReports.title")}</h1>

        <p className="max-w-3xl leading-8 text-slate-300">
          {t("bugReports.description")}
        </p>
      </div>

      {message && (
        <div className="mb-6 rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-4 py-3 text-cyan-200">
          {message}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6"
        >
          <div className="grid gap-5">
            <label className="grid gap-2">
              <span className="font-semibold">{t("bugReports.projectName")}</span>
              <input
                value={form.project_name}
                onChange={(event) =>
                  updateField("project_name", event.target.value)
                }
                placeholder={t("bugReports.projectNamePlaceholder")}
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
              />
            </label>

            <label className="grid gap-2">
              <span className="font-semibold">{t("bugReports.environment")}</span>
              <input
                value={form.environment}
                onChange={(event) =>
                  updateField("environment", event.target.value)
                }
                placeholder={t("bugReports.environmentPlaceholder")}
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
              />
            </label>

            <label className="grid gap-2">
              <span className="font-semibold">{t("bugReports.summary")}</span>
              <input
                value={form.summary}
                onChange={(event) => updateField("summary", event.target.value)}
                placeholder={t("bugReports.summaryPlaceholder")}
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
              />
            </label>

            <label className="grid gap-2">
              <span className="font-semibold">{t("common.preconditions")}</span>
              <textarea
                value={form.preconditions}
                onChange={(event) =>
                  updateField("preconditions", event.target.value)
                }
                placeholder={t("bugReports.preconditionsPlaceholder")}
                rows={3}
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
              />
            </label>

            <label className="grid gap-2">
              <span className="font-semibold">{t("common.steps")}</span>
              <textarea
                value={form.steps_to_reproduce}
                onChange={(event) =>
                  updateField("steps_to_reproduce", event.target.value)
                }
                placeholder={t("bugReports.stepsPlaceholder")}
                rows={5}
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
              />
            </label>

            <label className="grid gap-2">
              <span className="font-semibold">{t("common.actualResult")}</span>
              <textarea
                value={form.actual_result}
                onChange={(event) =>
                  updateField("actual_result", event.target.value)
                }
                placeholder={t("bugReports.actualResultPlaceholder")}
                rows={3}
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
              />
            </label>

            <label className="grid gap-2">
              <span className="font-semibold">{t("common.expectedResult")}</span>
              <textarea
                value={form.expected_result}
                onChange={(event) =>
                  updateField("expected_result", event.target.value)
                }
                placeholder={t("bugReports.expectedResultPlaceholder")}
                rows={3}
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
              />
            </label>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="font-semibold">{t("common.severity")}</span>
                <select
                  value={form.severity}
                  onChange={(event) =>
                    updateField("severity", event.target.value)
                  }
                  className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
                >
                  {severityOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2">
                <span className="font-semibold">{t("common.priority")}</span>
                <select
                  value={form.priority}
                  onChange={(event) =>
                    updateField("priority", event.target.value)
                  }
                  className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
                >
                  {priorityOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="grid gap-2">
              <span className="font-semibold">
                {t("bugReports.attachmentLink")}
              </span>
              <input
                value={form.attachment_link}
                onChange={(event) =>
                  updateField("attachment_link", event.target.value)
                }
                placeholder={t("bugReports.attachmentPlaceholder")}
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
              />
            </label>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-60"
              >
                {isLoading ? t("common.loading") : t("bugReports.generateButton")}
              </button>

              <button
                type="button"
                onClick={clearForm}
                className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-300 transition hover:border-cyan-400"
              >
                {t("bugReports.clearButton")}
              </button>
            </div>
          </div>
        </form>

        <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold">{t("bugReports.resultTitle")}</h2>

            <button
              type="button"
              onClick={copyReport}
              className="rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              {t("bugReports.copyButton")}
            </button>
          </div>

          <pre className="min-h-[500px] whitespace-pre-wrap rounded-2xl border border-slate-800 bg-slate-950 p-5 leading-8 text-slate-200">
            {generatedReport || t("common.result")}
          </pre>
        </article>
      </div>
    </section>
  );
}

export default BugReportPage;
