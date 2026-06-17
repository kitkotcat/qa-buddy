import { useState } from "react";
import { generateTestCaseApi } from "../api/testCases";

type TestCaseForm = {
  featureName: string;
  requirement: string;
  preconditions: string;
  steps: string;
  expectedResult: string;
  testType: string;
  priority: string;
};

const initialForm: TestCaseForm = {
  featureName: "",
  requirement: "",
  preconditions: "",
  steps: "",
  expectedResult: "",
  testType: "Functional",
  priority: "Medium",
};

const testTypeOptions = ["Smoke", "Functional", "Regression", "Negative", "UI", "API"];
const priorityOptions = ["High", "Medium", "Low"];

function TestCasePage() {
  const [form, setForm] = useState<TestCaseForm>(initialForm);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [copyMessage, setCopyMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    setError("");
    setCopyMessage("");
  };

  const validateForm = () => {
    const requiredFields = [
      form.featureName,
      form.requirement,
      form.steps,
      form.expectedResult,
    ];

    return requiredFields.every((field) => field.trim().length > 0);
  };

  const getStepsArray = (steps: string) => {
    return steps
      .split("\n")
      .map((step) => step.trim())
      .filter(Boolean);
  };

  const generateTestCase = async () => {
    if (!validateForm()) {
      setError(
        "Please fill in all required fields: Feature name, Requirement, Steps and Expected result."
      );
      setResult("");
      return;
    }

    setIsLoading(true);
    setError("");
    setCopyMessage("");

    try {
      const response = await generateTestCaseApi({
        feature_name: form.featureName,
        requirement: form.requirement,
        preconditions: form.preconditions || null,
        steps: getStepsArray(form.steps),
        expected_result: form.expectedResult,
        test_type: form.testType,
        priority: form.priority,
      });

      setResult(response.formatted_test_case);
    } catch {
      setError(
        "Could not generate test case. Please check that backend is running."
      );
      setResult("");
    } finally {
      setIsLoading(false);
    }
  };

  const clearForm = () => {
    setForm(initialForm);
    setResult("");
    setError("");
    setCopyMessage("");
  };

  const copyResult = async () => {
    if (!result) {
      return;
    }

    try {
      await navigator.clipboard.writeText(result);
      setCopyMessage("Test case copied to clipboard.");
    } catch {
      setCopyMessage("Could not copy test case. Please copy it manually.");
    }
  };

  return (
    <section>
      <div className="mb-10">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          QA Buddy Tool
        </p>

        <h1 className="mb-4 text-4xl font-bold">Test Case Generator</h1>

        <p className="max-w-3xl leading-8 text-slate-300">
          Fill in the form and generate a structured test case through the
          FastAPI backend.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form
          className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6"
          onSubmit={(event) => {
            event.preventDefault();
            generateTestCase();
          }}
        >
          <div className="mb-6 grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block font-semibold text-slate-200">
                Feature name *
              </span>
              <input
                name="featureName"
                value={form.featureName}
                onChange={handleChange}
                placeholder="Login"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
              />
            </label>

            <label className="block">
              <span className="mb-2 block font-semibold text-slate-200">
                Test type
              </span>
              <select
                name="testType"
                value={form.testType}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              >
                {testTypeOptions.map((testType) => (
                  <option key={testType} value={testType}>
                    {testType}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="mb-5 block">
            <span className="mb-2 block font-semibold text-slate-200">
              Requirement *
            </span>
            <textarea
              name="requirement"
              value={form.requirement}
              onChange={handleChange}
              placeholder="User should be able to log in with valid email and password."
              rows={4}
              className="w-full resize-y rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
            />
          </label>

          <label className="mb-5 block">
            <span className="mb-2 block font-semibold text-slate-200">
              Preconditions
            </span>
            <textarea
              name="preconditions"
              value={form.preconditions}
              onChange={handleChange}
              placeholder="User is registered and located on the login page."
              rows={3}
              className="w-full resize-y rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
            />
          </label>

          <label className="mb-5 block">
            <span className="mb-2 block font-semibold text-slate-200">
              Steps *
            </span>
            <textarea
              name="steps"
              value={form.steps}
              onChange={handleChange}
              placeholder={`Open login page\nEnter valid email\nEnter valid password\nClick Login button`}
              rows={5}
              className="w-full resize-y rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
            />
            <span className="mt-2 block text-sm text-slate-500">
              Write each step from a new line.
            </span>
          </label>

          <label className="mb-5 block">
            <span className="mb-2 block font-semibold text-slate-200">
              Expected result *
            </span>
            <textarea
              name="expectedResult"
              value={form.expectedResult}
              onChange={handleChange}
              placeholder="User is redirected to the account page."
              rows={4}
              className="w-full resize-y rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
            />
          </label>

          <div className="mb-6 grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block font-semibold text-slate-200">
                Priority
              </span>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              >
                {priorityOptions.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {error && (
            <div className="mb-5 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-red-200">
              {error}
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Generating..." : "Generate test case"}
            </button>

            <button
              type="button"
              onClick={clearForm}
              className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-200 transition hover:border-cyan-400"
            >
              Clear form
            </button>
          </div>
        </form>

        <aside className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
                Result
              </p>
              <h2 className="mt-2 text-2xl font-bold">Generated test case</h2>
            </div>

            <button
              type="button"
              onClick={copyResult}
              disabled={!result}
              className="rounded-xl border border-slate-700 px-4 py-2 font-semibold text-slate-200 transition hover:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Copy
            </button>
          </div>

          {copyMessage && (
            <div className="mb-4 rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-4 py-3 text-cyan-200">
              {copyMessage}
            </div>
          )}

          {result ? (
            <pre className="min-h-[480px] overflow-auto whitespace-pre-wrap rounded-2xl border border-slate-800 bg-slate-950 p-5 text-sm leading-7 text-slate-200">
              {result}
            </pre>
          ) : (
            <div className="flex min-h-[480px] items-center justify-center rounded-2xl border border-dashed border-slate-700 p-6 text-center text-slate-500">
              Generated test case will appear here.
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}

export default TestCasePage;
