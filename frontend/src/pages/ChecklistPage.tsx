import { useEffect, useState } from "react";
import type { Checklist } from "../api/checklists";
import { getChecklistByIdApi, getChecklistsApi } from "../api/checklists";

function ChecklistPage() {
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [selectedChecklist, setSelectedChecklist] = useState<Checklist | null>(
    null
  );
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isChecklistLoading, setIsChecklistLoading] = useState(false);
  const [error, setError] = useState("");
  const [copyMessage, setCopyMessage] = useState("");

  useEffect(() => {
    loadChecklists();
  }, []);

  const loadChecklists = async () => {
    setIsLoading(true);
    setError("");

    try {
      const data = await getChecklistsApi();
      setChecklists(data);

      if (data.length > 0) {
        setSelectedChecklist(data[0]);
      }
    } catch {
      setError("Could not load checklists. Please check that backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  const selectChecklist = async (id: number) => {
    setIsChecklistLoading(true);
    setError("");
    setCopyMessage("");
    setCheckedItems(new Set());

    try {
      const data = await getChecklistByIdApi(id);
      setSelectedChecklist(data);
    } catch {
      setError("Could not load selected checklist.");
    } finally {
      setIsChecklistLoading(false);
    }
  };

  const toggleItem = (index: number) => {
    setCheckedItems((prevCheckedItems) => {
      const updatedItems = new Set(prevCheckedItems);

      if (updatedItems.has(index)) {
        updatedItems.delete(index);
      } else {
        updatedItems.add(index);
      }

      return updatedItems;
    });

    setCopyMessage("");
  };

  const resetChecks = () => {
    setCheckedItems(new Set());
    setCopyMessage("");
  };

  const copyChecklist = async () => {
    if (!selectedChecklist) {
      return;
    }

    const formattedChecklist = `## ${selectedChecklist.title}

**Category:** ${selectedChecklist.category}

${selectedChecklist.items
  .map((item, index) => {
    const status = checkedItems.has(index) ? "x" : " ";
    return `- [${status}] ${item}`;
  })
  .join("\n")}
`;

    try {
      await navigator.clipboard.writeText(formattedChecklist);
      setCopyMessage("Checklist copied to clipboard.");
    } catch {
      setCopyMessage("Could not copy checklist. Please copy it manually.");
    }
  };

  const completedCount = checkedItems.size;
  const totalCount = selectedChecklist?.items.length || 0;
  const progressPercent =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <section>
      <div className="mb-10">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          QA Buddy Tool
        </p>

        <h1 className="mb-4 text-4xl font-bold">Checklist Library</h1>

        <p className="max-w-3xl leading-8 text-slate-300">
          Use ready-made QA checklists for authentication, search, cart,
          checkout, API testing, forms validation and mobile apps.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-red-200">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 text-slate-300">
          Loading checklists...
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <div className="mb-5">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
                Library
              </p>
              <h2 className="mt-2 text-2xl font-bold">Available checklists</h2>
            </div>

            <div className="grid gap-4">
              {checklists.map((checklist) => {
                const isActive = selectedChecklist?.id === checklist.id;

                return (
                  <button
                    key={checklist.id}
                    type="button"
                    onClick={() => selectChecklist(checklist.id)}
                    className={`rounded-2xl border p-5 text-left transition ${
                      isActive
                        ? "border-cyan-400 bg-cyan-400/10"
                        : "border-slate-800 bg-slate-950 hover:border-cyan-400"
                    }`}
                  >
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <h3 className="text-xl font-semibold">
                        {checklist.title}
                      </h3>

                      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-cyan-300">
                        {checklist.items.length} items
                      </span>
                    </div>

                    <p className="text-sm text-slate-400">
                      {checklist.category}
                    </p>
                  </button>
                );
              })}
            </div>
          </aside>

          <main className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            {isChecklistLoading || !selectedChecklist ? (
              <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-dashed border-slate-700 p-6 text-slate-500">
                Loading selected checklist...
              </div>
            ) : (
              <>
                <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
                      Selected checklist
                    </p>

                    <h2 className="mb-2 text-3xl font-bold">
                      {selectedChecklist.title}
                    </h2>

                    <p className="text-slate-400">
                      Category: {selectedChecklist.category}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={resetChecks}
                      className="rounded-xl border border-slate-700 px-4 py-2 font-semibold text-slate-200 transition hover:border-cyan-400"
                    >
                      Reset checks
                    </button>

                    <button
                      type="button"
                      onClick={copyChecklist}
                      className="rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-300"
                    >
                      Copy checklist
                    </button>
                  </div>
                </div>

                <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-950 p-5">
                  <div className="mb-3 flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-300">
                      Progress
                    </span>
                    <span className="text-cyan-300">
                      {completedCount}/{totalCount} completed ·{" "}
                      {progressPercent}%
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-cyan-400 transition-all"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {copyMessage && (
                  <div className="mb-5 rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-4 py-3 text-cyan-200">
                    {copyMessage}
                  </div>
                )}

                <div className="grid gap-3">
                  {selectedChecklist.items.map((item, index) => {
                    const inputId = `checklist-${selectedChecklist.id}-${index}`;
                    const isChecked = checkedItems.has(index);

                    return (
                      <label
                        key={item}
                        htmlFor={inputId}
                        className={`flex cursor-pointer gap-4 rounded-2xl border p-4 transition ${
                          isChecked
                            ? "border-cyan-400 bg-cyan-400/10"
                            : "border-slate-800 bg-slate-950 hover:border-slate-600"
                        }`}
                      >
                        <input
                          id={inputId}
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleItem(index)}
                          className="mt-1 h-5 w-5 accent-cyan-400"
                        />

                        <span
                          className={`leading-7 ${
                            isChecked
                              ? "text-slate-400 line-through"
                              : "text-slate-200"
                          }`}
                        >
                          {item}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </>
            )}
          </main>
        </div>
      )}
    </section>
  );
}

export default ChecklistPage;
