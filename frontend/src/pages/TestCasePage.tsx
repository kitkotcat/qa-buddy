import { useState } from "react";
import { generateTestCaseApi } from "../api/testCases";
import { useLanguage } from "../i18n/LanguageContext";
import {
  getStorageItem,
  setStorageItem,
} from "../storage/localStorageService";

const SAVED_TEST_CASES_KEY = "qa-buddy-saved-test-cases";

const initialForm = {
  feature_name: "",
  requirement: "",
  preconditions: "",
  steps: "",
  expected_result: "",
  test_type: "Functional",
  priority: "High",
};

type SavedTestCase = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

function createId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function TestCasePage() {
  const { language, t } = useLanguage();

  const [form, setForm] = useState(initialForm);
  const [generatedTestCase, setGeneratedTestCase] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [savedTestCases, setSavedTestCases] = useState<SavedTestCase[]>(() =>
    getStorageItem<SavedTestCase[]>(SAVED_TEST_CASES_KEY, [])
  );

  const testTypeOptions = ["Functional", "Smoke", "Regression", "Negative", "UI"];
  const priorityOptions = ["High", "Medium", "Low"];

  const labels =
    language === "ru"
      ? {
          save: "Сохранить тест-кейс",
          savedTitle: "Сохранённые тест-кейсы",
          noSaved: "Пока нет сохранённых тест-кейсов.",
          saved: "Тест-кейс сохранён.",
          copySaved: "Скопировать",
          deleteSaved: "Удалить",
          createdAt: "Создано",
        }
      : {
          save: "Save test case",
          savedTitle: "Saved test cases",
          noSaved: "No saved test cases yet.",
          saved: "Test case saved.",
          copySaved: "Copy",
          deleteSaved: "Delete",
          createdAt: "Created",
        };

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

  const saveTestCase = () => {
    if (!generatedTestCase) {
      return;
    }

    const nextTestCase: SavedTestCase = {
      id: createId(),
      title: form.feature_name || "Test case",
      content: generatedTestCase,
      createdAt: new Date().toLocaleString(),
    };

    const nextTestCases = [nextTestCase, ...savedTestCases];

    setSavedTestCases(nextTestCases);
    setStorageItem(SAVED_TEST_CASES_KEY, nextTestCases);
    setMessage(labels.saved);
  };

  const deleteSavedTestCase = (id: string) => {
    const nextTestCases = savedTestCases.filter((testCase) => testCase.id !== id);

    setSavedTestCases(nextTestCases);
    setStorageItem(SAVED_TEST_CASES_KEY, nextTestCases);
  };

  const copySavedTestCase = async (content: string) => {
    await navigator.clipboard.writeText(content);
    setMessage(t("common.copied"));
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
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-bold">{t("testCases.resultTitle")}</h2>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={copyTestCase}
                className="rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                {t("testCases.copyButton")}
              </button>

              <button
                type="button"
                onClick={saveTestCase}
                disabled={!generatedTestCase}
                className="rounded-xl border border-cyan-400 px-4 py-2 font-semibold text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {labels.save}
              </button>
            </div>
          </div>

          <pre className="min-h-[500px] whitespace-pre-wrap rounded-2xl border border-slate-800 bg-slate-950 p-5 leading-8 text-slate-200">
            {generatedTestCase || t("common.result")}
          </pre>
        </article>
      </div>

      <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
        <h2 className="mb-5 text-2xl font-bold">{labels.savedTitle}</h2>

        {savedTestCases.length === 0 ? (
          <p className="text-slate-400">{labels.noSaved}</p>
        ) : (
          <div className="grid gap-4">
            {savedTestCases.map((testCase) => (
              <article
                key={testCase.id}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-5"
              >
                <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold">{testCase.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {labels.createdAt}: {testCase.createdAt}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => copySavedTestCase(testCase.content)}
                      className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                    >
                      {labels.copySaved}
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteSavedTestCase(testCase.id)}
                      className="rounded-xl border border-red-500/60 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/10"
                    >
                      {labels.deleteSaved}
                    </button>
                  </div>
                </div>

                <pre className="max-h-72 overflow-auto whitespace-pre-wrap rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm leading-7 text-slate-300">
                  {testCase.content}
                </pre>
              </article>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}

export default TestCasePage;
