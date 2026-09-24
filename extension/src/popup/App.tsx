import { useEffect, useMemo, useState } from "react";

type RecorderStatus = "idle" | "recording" | "paused" | "stopped";

type RecorderStep = {
  id: string;
  type: "page" | "click" | "input";
  label: string;
  url: string;
  timestamp: number;
};

type RecorderState = {
  status: RecorderStatus;
  sessionId: string | null;
  targetTabId: number | null;
  startedAt: number | null;
  pausedAt: number | null;
  accumulatedPausedMs: number;
  steps: RecorderStep[];
};

const emptyState: RecorderState = {
  status: "idle",
  sessionId: null,
  targetTabId: null,
  startedAt: null,
  pausedAt: null,
  accumulatedPausedMs: 0,
  steps: [],
};

function formatDuration(state: RecorderState, now: number) {
  if (!state.startedAt) return "00:00";

  const end =
    state.status === "paused" && state.pausedAt
      ? state.pausedAt
      : state.status === "stopped"
        ? state.pausedAt ?? now
        : now;

  const elapsed = Math.max(
    0,
    end - state.startedAt - state.accumulatedPausedMs
  );

  const totalSeconds = Math.floor(elapsed / 1000);
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");

  return `${minutes}:${seconds}`;
}

async function command(type: string): Promise<RecorderState> {
  const response = await chrome.runtime.sendMessage({ type });
  return response?.state ?? emptyState;
}

function App() {
  const [state, setState] = useState<RecorderState>(emptyState);
  const [now, setNow] = useState(Date.now());
  const [error, setError] = useState("");

  useEffect(() => {
    void chrome.runtime
      .sendMessage({ type: "GET_STATE" })
      .then((response) => setState(response?.state ?? emptyState));

    const storageListener = (
      changes: Record<string, chrome.storage.StorageChange>,
      areaName: string
    ) => {
      if (areaName !== "local") return;
      const next = changes.qaBuddyRecorderState?.newValue;
      if (next) setState(next as RecorderState);
    };

    chrome.storage.onChanged.addListener(storageListener);

    return () => {
      chrome.storage.onChanged.removeListener(storageListener);
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const duration = useMemo(() => formatDuration(state, now), [state, now]);
  const isActive = state.status === "recording" || state.status === "paused";
  const recentSteps = state.steps.slice(-3).reverse();

  const run = async (type: string) => {
    try {
      setError("");
      setState(await command(type));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Recorder action failed");
    }
  };

  return (
    <main className="popup-shell">
      <header className="brand">
        <div className="cat-badge" aria-hidden="true">🐱</div>
        <div>
          <p className="eyebrow">QA CAT BUDDY</p>
          <h1>Recorder</h1>
        </div>
        <span className={`status-pill status-${state.status}`}>
          {state.status === "recording"
            ? "● REC"
            : state.status === "paused"
              ? "PAUSED"
              : state.status === "stopped"
                ? "DONE"
                : "READY"}
        </span>
      </header>

      <section className="session-card">
        <div>
          <span className="metric-label">Steps</span>
          <strong>{state.steps.length}</strong>
        </div>
        <div>
          <span className="metric-label">Time</span>
          <strong>{duration}</strong>
        </div>
        <div>
          <span className="metric-label">Mode</span>
          <strong>Bug</strong>
        </div>
      </section>

      <section className="controls">
        {!isActive ? (
          <button className="button button-primary" onClick={() => void run("START_RECORDING")}>
            <span>●</span> Start recording
          </button>
        ) : (
          <>
            <button className="button button-secondary" onClick={() => void run("TOGGLE_PAUSE")}>
              {state.status === "paused" ? "▶ Resume" : "Ⅱ Pause"}
            </button>
            <button className="button button-danger" onClick={() => void run("STOP_RECORDING")}>
              ■ Stop
            </button>
          </>
        )}

        {state.status === "stopped" && (
          <button className="button button-ghost" onClick={() => void run("CLEAR_SESSION")}>
            Clear session
          </button>
        )}
      </section>

      <section className="steps-panel">
        <div className="section-heading">
          <h2>Latest steps</h2>
          <span>{state.steps.length}/500</span>
        </div>

        {recentSteps.length === 0 ? (
          <div className="empty-state">
            Start recording, then reproduce the issue in the current tab.
          </div>
        ) : (
          <ol>
            {recentSteps.map((step) => (
              <li key={step.id}>
                <span className={`step-icon step-${step.type}`}>
                  {step.type === "page" ? "↗" : step.type === "input" ? "⌨" : "↖"}
                </span>
                <div>
                  <strong>{step.label}</strong>
                  <small>{new URL(step.url).hostname}</small>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>

      <aside className="privacy-note">
        <span aria-hidden="true">🛡</span>
        <p>
          <strong>Privacy first.</strong> QA Buddy records field names and actions,
          never typed input values.
        </p>
      </aside>

      {error && <p className="error">{error}</p>}
    </main>
  );
}

export default App;
