(() => {
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

  const STORAGE_KEY = "qaBuddyRecorderState";
  const MAX_STEPS = 500;

  const defaultState = (): RecorderState => ({
    status: "idle",
    sessionId: null,
    targetTabId: null,
    startedAt: null,
    pausedAt: null,
    accumulatedPausedMs: 0,
    steps: [],
  });

  async function loadState(): Promise<RecorderState> {
    const data = await chrome.storage.local.get(STORAGE_KEY);
    return (data[STORAGE_KEY] as RecorderState | undefined) ?? defaultState();
  }

  async function saveState(state: RecorderState): Promise<void> {
    await chrome.storage.local.set({ [STORAGE_KEY]: state });
  }

  function makeStep(
    type: RecorderStep["type"],
    label: string,
    url: string
  ): RecorderStep {
    return {
      id: crypto.randomUUID(),
      type,
      label: label.slice(0, 180),
      url,
      timestamp: Date.now(),
    };
  }

  function pageLabel(url: string): string {
    try {
      const parsed = new URL(url);
      return `Open ${parsed.hostname}${parsed.pathname === "/" ? "" : parsed.pathname}`;
    } catch {
      return "Open page";
    }
  }

  function notifyTarget(state: RecorderState): void {
    if (state.targetTabId === null) return;

    chrome.tabs.sendMessage(
      state.targetTabId,
      { type: "STATE_UPDATED", state },
      () => void chrome.runtime.lastError
    );
  }

  async function startRecording(): Promise<RecorderState> {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!tab?.id || !tab.url || !/^https?:/i.test(tab.url)) {
      throw new Error("Open a regular http/https page before starting the recorder.");
    }

    const now = Date.now();
    const state: RecorderState = {
      status: "recording",
      sessionId: crypto.randomUUID(),
      targetTabId: tab.id,
      startedAt: now,
      pausedAt: null,
      accumulatedPausedMs: 0,
      steps: [makeStep("page", pageLabel(tab.url), tab.url)],
    };

    await saveState(state);
    notifyTarget(state);
    return state;
  }

  async function togglePause(): Promise<RecorderState> {
    const state = await loadState();
    const now = Date.now();

    if (state.status === "recording") {
      state.status = "paused";
      state.pausedAt = now;
    } else if (state.status === "paused") {
      state.accumulatedPausedMs += state.pausedAt ? now - state.pausedAt : 0;
      state.pausedAt = null;
      state.status = "recording";
    }

    await saveState(state);
    notifyTarget(state);
    return state;
  }

  async function stopRecording(): Promise<RecorderState> {
    const state = await loadState();

    if (state.status === "recording" || state.status === "paused") {
      if (state.status === "recording") {
        state.pausedAt = Date.now();
      }
      state.status = "stopped";
      await saveState(state);
      notifyTarget(state);
    }

    return state;
  }

  async function clearSession(): Promise<RecorderState> {
    const state = defaultState();
    await saveState(state);
    return state;
  }

  async function addStep(
    message: { step?: Partial<RecorderStep> },
    sender: chrome.runtime.MessageSender
  ): Promise<RecorderState> {
    const state = await loadState();

    if (
      state.status !== "recording" ||
      !sender.tab?.id ||
      sender.tab.id !== state.targetTabId ||
      !message.step?.type ||
      !message.step.label ||
      !message.step.url
    ) {
      return state;
    }

    const incoming = makeStep(
      message.step.type,
      message.step.label,
      message.step.url
    );

    const previous = state.steps[state.steps.length - 1];
    const isDuplicate =
      previous &&
      previous.type === incoming.type &&
      previous.label === incoming.label &&
      previous.url === incoming.url &&
      incoming.timestamp - previous.timestamp < 600;

    if (!isDuplicate) {
      state.steps = [...state.steps, incoming].slice(-MAX_STEPS);
      await saveState(state);
      notifyTarget(state);
    }

    return state;
  }

  async function handleMessage(
    message: { type?: string; step?: Partial<RecorderStep> },
    sender: chrome.runtime.MessageSender
  ) {
    switch (message.type) {
      case "GET_STATE": {
        const state = await loadState();
        return {
          state,
          isTargetTab:
            !sender.tab?.id || sender.tab.id === state.targetTabId,
        };
      }
      case "START_RECORDING":
        return { state: await startRecording() };
      case "TOGGLE_PAUSE":
        return { state: await togglePause() };
      case "STOP_RECORDING":
        return { state: await stopRecording() };
      case "CLEAR_SESSION":
        return { state: await clearSession() };
      case "RECORDER_EVENT":
        return { state: await addStep(message, sender) };
      default:
        return { state: await loadState() };
    }
  }

  chrome.runtime.onInstalled.addListener(() => {
    void loadState().then((state) => {
      if (!state.sessionId) void saveState(defaultState());
    });
  });

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    void handleMessage(message, sender)
      .then(sendResponse)
      .catch((error: unknown) => {
        sendResponse({
          state: defaultState(),
          error: error instanceof Error ? error.message : "Recorder error",
        });
      });

    return true;
  });
})();
