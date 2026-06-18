import { useState } from "react";
import { generateTestCaseApi } from "../api/testCases";
import { useLanguage } from "../i18n/LanguageContext";

const initialForm = {
  feature_name: "",
  requirement: "",
  preconditions: "",
  steps: "",
  expected_result: "",
  test_type: "Functional",
  priority: "High",
};

function TestCasePage() {
  const { language, t } = useLanguage();
  const [form, setForm] = useState(initialForm);
  const [generatedTestCase, setGeneratedTestCase] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const testTypeOptions = ["Functional", "Smoke", "Regression", "Negative", "UI"];
  const priorityOptions = ["High", "Medium", "Low"];

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
    setMessage("");
  };

  const buildLocalizedTestCase = () => {
    const steps = form.steps
      .split("\n")
      .filter((step) => step.trim())
      .map((step, index) => `${index + 1}. ${step.trim()}`)
      .join("\n");

    if (language === "ru") {
      return `ТЕСТ-КЕЙС

Feature: ${form.feature_name}
Requirement:
${form.requirement}

Предусловия:
${form.preconditions || "Не указаны"}

Шаги:
${steps}

Ожидаемый результат:
${form.expected_result}

Test Type: ${form.test_type}
Priority: ${form.priority}`;
    }

    return `TEST CASE

Feature: ${form.feature_name}
Requirement:
${form.requirement}

Preconditions:
${form.preconditions || "Not specified"}

Steps:
${steps}

Expected Result:
${form.expected_result}

Test Type: ${form.test_type}
Priority: ${form.priority}`;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !form.feature_name ||
      !form.requirement ||
      !form.steps ||
      !form.expected_result
    ) {
      setMessage(t("common.requiredError"));
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      await generateTestCaseApi({
        ...form,
        steps: form.steps.split("\n").filter((step) => step.trim()),
      });

      setGeneratedTestCase(buildLocalizedTestCase());
      setMessage(t("testCases.success"));
    } catch {
      setMessage(`${t("common.error")} ${t("common.backendError")}`);
    } finally {
      setIsLoading(false);
    }
  };

  const clearForm = () => {
    setForm(initialForm);
    setGeneratedTestCase("");
    setMessage("");
  };

  const copyTestCase = async () => {
    if (!generatedTestCase) {
      return;
    }

    await navigator.clipboard.writeText(generatedTestCase);
    setMessage(t("common.copied"));
  };

  return (
    <section>
      <div className="mb-10">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          {t("testCases.badge")}
        </p>

        <h1 className="mb-4 text-4xl font-bold">{t("testCases.title")}</h1>

        <p className="max-w-3xl leading-8 text-slate-300">
          {t("testCases.description")}
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
              <span className="font-semibold">{t("testCases.featureName")}</span>
              <input
                value={form.feature_name}
                onChange={(event) =>
                  updateField("feature_name", event.target.value)
                }
                placeholder={t("testCases.featureNamePlaceholder")}
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
              />
            </label>

            <label className="grid gap-2">
              <span className="font-semibold">{t("testCases.requirement")}</span>
              <textarea
                value={form.requirement}
                onChange={(event) =>
                  updateField("requirement", event.target.value)
                }
                placeholder={t("testCases.requirementPlaceholder")}
                rows={3}
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
                placeholder={t("testCases.preconditionsPlaceholder")}
                rows={3}
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
              />
            </label>

            <label className="grid gap-2">
              <span className="font-semibold">{t("common.steps")}</span>
              <textarea
                value={form.steps}
                onChange={(event) => updateField("steps", event.target.value)}
                placeholder={t("testCases.stepsPlaceholder")}
                rows={5}
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
                placeholder={t("testCases.expectedResultPlaceholder")}
                rows={3}
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
              />
            </label>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="font-semibold">{t("testCases.testType")}</span>
                <select
                  value={form.test_type}
                  onChange={(event) =>
                    updateField("test_type", event.target.value)
                  }
                  className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
                >
                  {testTypeOptions.map((option) => (
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

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-60"
              >
                {isLoading ? t("common.loading") : t("testCases.generateButton")}
              </button>

              <button
                type="button"
                onClick={clearForm}
                className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-300 transition hover:border-cyan-400"
              >
                {t("testCases.clearButton")}
              </button>
            </div>
          </div>
        </form>

        <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold">{t("testCases.resultTitle")}</h2>

            <button
              type="button"
              onClick={copyTestCase}
              className="rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              {t("testCases.copyButton")}
            </button>
          </div>

          <pre className="min-h-[500px] whitespace-pre-wrap rounded-2xl border border-slate-800 bg-slate-950 p-5 leading-8 text-slate-200">
            {generatedTestCase || t("common.result")}
          </pre>
        </article>
      </div>
    </section>
  );
}

export default TestCasePage;
