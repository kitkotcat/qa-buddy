import { useState } from "react";
import { generateBugReportApi } from "../api/bugReports";

type BugReportForm = {
  projectName: string;
  environment: string;
  summary: string;
  preconditions: string;
  stepsToReproduce: string;
  actualResult: string;
  expectedResult: string;
  severity: string;
  priority: string;
  attachmentLink: string;
};

const initialForm: BugReportForm = {
  projectName: "",
  environment: "",
  summary: "",
  preconditions: "",
  stepsToReproduce: "",
  actualResult: "",
  expectedResult: "",
  severity: "Major",
  priority: "Medium",
  attachmentLink: "",
};

const severityOptions = ["Blocker", "Critical", "Major", "Minor", "Trivial"];
const priorityOptions = ["High", "Medium", "Low"];

function BugReportPage() {
  const [form, setForm] = useState<BugReportForm>(initialForm);
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
      form.projectName,
      form.environment,
      form.summary,
      form.stepsToReproduce,
      form.actualResult,
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

  const generateBugReport = async () => {
    if (!validateForm()) {
      setError(
        "Please fill in all required fields: Project name, Environment, Summary, Steps, Actual result and Expected result."
      );
      setResult("");
      return;
    }

    setIsLoading(true);
    setError("");
    setCopyMessage("");

    try {
      const response = await generateBugReportApi({
        project_name: form.projectName,
        environment: form.environment,
        summary: form.summary,
        preconditions: form.preconditions || null,
        steps_to_reproduce: getStepsArray(form.stepsToReproduce),
        actual_result: form.actualResult,
        expected_result: form.expectedResult,
        severity: form.severity,
        priority: form.priority,
        attachment_link: form.attachmentLink || null,
      });

      setResult(response.formatted_report);
    } catch {
      setError(
        "Could not generate bug report. Please check that backend is running."
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
      setCopyMessage("Bug report copied to clipboard.");
    } catch {
      setCopyMessage("Could not copy bug report. Please copy it manually.");
    }
  };

  return (
    <section>
      <div className="mb-10">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          QA Buddy Tool
        </p>

        <h1 className="mb-4 text-4xl font-bold">Bug Report Generator</h1>

        <p className="max-w-3xl leading-8 text-slate-300">
          Fill in the form and generate a structured bug report through the
          FastAPI backend.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form
          className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6"
          onSubmit={(event) => {
            event.preventDefault();
            generateBugReport();
          }}
        >
          <div className="mb-6 grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block font-semibold text-slate-200">
                Project name *
              </span>
              <input
                name="projectName"
                value={form.projectName}
                onChange={handleChange}
                placeholder="QA Buddy"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
              />
            </label>

            <label className="block">
              <span className="mb-2 block font-semibold text-slate-200">
                Environment *
              </span>
              <input
                name="environment"
                value={form.environment}
                onChange={handleChange}
                placeholder="Chrome 125, macOS"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
              />
            </label>
          </div>

          <label className="mb-5 block">
            <span className="mb-2 block font-semibold text-slate-200">
              Summary *
            </span>
            <input
              name="summary"
              value={form.summary}
              onChange={handleChange}
              placeholder="Login button does not respond after click"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
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
              placeholder="User is on the login page"
              rows={3}
              className="w-full resize-y rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
            />
          </label>

          <label className="mb-5 block">
            <span className="mb-2 block font-semibold text-slate-200">
              Steps to reproduce *
            </span>
            <textarea
              name="stepsToReproduce"
              value={form.stepsToReproduce}
              onChange={handleChange}
              placeholder={`Open the login page\nEnter valid email and password\nClick Login button`}
              rows={5}
              className="w-full resize-y rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
            />
            <span className="mt-2 block text-sm text-slate-500">
              Write each step from a new line.
            </span>
          </label>

          <div className="mb-5 grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block font-semibold text-slate-200">
                Actual result *
              </span>
              <textarea
                name="actualResult"
                value={form.actualResult}
                onChange={handleChange}
                placeholder="Nothing happens after clicking the button"
                rows={4}
                className="w-full resize-y rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
              />
            </label>

            <label className="block">
              <span className="mb-2 block font-semibold text-slate-200">
                Expected result *
              </span>
              <textarea
                name="expectedResult"
                value={form.expectedResult}
                onChange={handleChange}
                placeholder="User should be redirected to the account page"
                rows={4}
                className="w-full resize-y rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
              />
            </label>
          </div>

          <div className="mb-6 grid gap-5 md:grid-cols-3">
            <label className="block">
              <span className="mb-2 block font-semibold text-slate-200">
                Severity
              </span>
              <select
                name="severity"
                value={form.severity}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              >
                {severityOptions.map((severity) => (
                  <option key={severity} value={severity}>
                    {severity}
                  </option>
                ))}
              </select>
            </label>

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

            <label className="block">
              <span className="mb-2 block font-semibold text-slate-200">
                Attachment link
              </span>
              <input
                name="attachmentLink"
                value={form.attachmentLink}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
              />
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
              {isLoading ? "Generating..." : "Generate bug report"}
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
              <h2 className="mt-2 text-2xl font-bold">Generated report</h2>
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
              Generated bug report will appear here.
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}

export default BugReportPage;
