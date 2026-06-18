import { useEffect, useMemo, useState } from "react";
import { getChecklistsApi } from "../api/checklists";
import type { Checklist } from "../api/checklists";
import { useLanguage } from "../i18n/LanguageContext";
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from "../storage/localStorageService";

function getChecklistProgressKey(checklistId: number) {
  return `qa-buddy-checklist-progress-${checklistId}`;
}

function ChecklistPage() {
  const { language, t } = useLanguage();

  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [selectedChecklist, setSelectedChecklist] = useState<Checklist | null>(
    null
  );
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadChecklists();
  }, [language]);

  const loadChecklists = async () => {
    setIsLoading(true);
    setMessage("");

    try {
      const data = await getChecklistsApi(language);
      setChecklists(data);

      if (data.length > 0) {
        const firstChecklist = data[0];
        setSelectedChecklist(firstChecklist);

        const savedProgress = getStorageItem<number[]>(
          getChecklistProgressKey(firstChecklist.id),
          []
        );

        setCheckedItems(savedProgress);
      }
    } catch {
      setMessage(t("checklists.loadError"));
    } finally {
      setIsLoading(false);
    }
  };

  const filteredChecklists = useMemo(() => {
    const normalizedSearchQuery = searchQuery.trim().toLowerCase();

    if (!normalizedSearchQuery) {
      return checklists;
    }

    return checklists.filter((checklist) => {
      const searchableText = [
        checklist.title,
        checklist.category,
        ...checklist.items,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedSearchQuery);
    });
  }, [checklists, searchQuery]);

  const progress = useMemo(() => {
    if (!selectedChecklist || selectedChecklist.items.length === 0) {
      return 0;
    }

    return Math.round((checkedItems.length / selectedChecklist.items.length) * 100);
  }, [checkedItems.length, selectedChecklist]);

  const selectChecklist = (checklist: Checklist) => {
    setSelectedChecklist(checklist);

    const savedProgress = getStorageItem<number[]>(
      getChecklistProgressKey(checklist.id),
      []
    );

    setCheckedItems(savedProgress);
    setMessage("");
  };

  const toggleItem = (index: number) => {
    if (!selectedChecklist) {
      return;
    }

    const nextCheckedItems = checkedItems.includes(index)
      ? checkedItems.filter((item) => item !== index)
      : [...checkedItems, index];

    setCheckedItems(nextCheckedItems);
    setStorageItem(
      getChecklistProgressKey(selectedChecklist.id),
      nextCheckedItems
    );
  };

  const resetChecks = () => {
    if (!selectedChecklist) {
      return;
    }

    setCheckedItems([]);
    removeStorageItem(getChecklistProgressKey(selectedChecklist.id));
    setMessage("");
  };

  const copyChecklist = async () => {
    if (!selectedChecklist) {
      return;
    }

    const content = `${selectedChecklist.title}

${selectedChecklist.items
  .map((item, index) => {
    const checkbox = checkedItems.includes(index) ? "[x]" : "[ ]";
    return `${checkbox} ${index + 1}. ${item}`;
  })
  .join("\n")}`;

    await navigator.clipboard.writeText(content);
    setMessage(t("common.copied"));
  };

  return (
    <section>
      <div className="mb-10">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          {t("checklists.badge")}
        </p>

        <h1 className="mb-4 text-4xl font-bold">{t("checklists.title")}</h1>

        <p className="max-w-3xl leading-8 text-slate-300">
          {t("checklists.description")}
        </p>
      </div>

      {message && (
        <div className="mb-6 rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-4 py-3 text-cyan-200">
          {message}
        </div>
      )}

      {isLoading ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 text-slate-300">
          {t("checklists.loading")}
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              {t("checklists.libraryTitle")}
            </p>

            <label className="mb-5 grid gap-2">
              <span className="font-semibold">{t("common.search")}</span>
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={t("checklists.searchPlaceholder")}
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
              />
            </label>

            <div className="grid gap-4">
              {filteredChecklists.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-700 p-5 text-slate-400">
                  {t("checklists.noResults")}
                </div>
              ) : (
                filteredChecklists.map((checklist) => {
                  const isActive = selectedChecklist?.id === checklist.id;
                  const savedProgress = getStorageItem<number[]>(
                    getChecklistProgressKey(checklist.id),
                    []
                  );

                  return (
                    <button
                      key={checklist.id}
                      type="button"
                      onClick={() => selectChecklist(checklist)}
                      className={`rounded-2xl border p-5 text-left transition ${
                        isActive
                          ? "border-cyan-400 bg-cyan-400/10"
                          : "border-slate-800 bg-slate-950 hover:border-cyan-400"
                      }`}
                    >
                      <div className="mb-3 flex items-center justify-between gap-4">
                        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-cyan-300">
                          {checklist.category}
                        </span>

                        <span className="text-sm text-slate-500">
                          #{checklist.id}
                        </span>
                      </div>

                      <h3 className="mb-3 text-lg font-semibold">
                        {checklist.title}
                      </h3>

                      <p className="text-sm text-slate-400">
                        {savedProgress.length}/{checklist.items.length}{" "}
                        {t("checklists.completed")}
                      </p>
                    </button>
                  );
                })
              )}
            </div>
          </aside>

          <main className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            {!selectedChecklist ? (
              <div className="rounded-2xl border border-dashed border-slate-700 p-8 text-slate-400">
                {t("checklists.noChecklist")}
              </div>
            ) : (
              <>
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
                      {t("checklists.selectedTitle")}
                    </p>

                    <h2 className="mb-3 text-3xl font-bold">
                      {selectedChecklist.title}
                    </h2>

                    <p className="text-slate-400">
                      {t("common.category")}: {selectedChecklist.category}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={copyChecklist}
                    className="rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-300"
                  >
                    {t("checklists.copy")}
                  </button>
                </div>

                <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-950 p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-semibold">
                      {t("checklists.progress")}
                    </span>

                    <span className="text-cyan-300">
                      {checkedItems.length}/{selectedChecklist.items.length}{" "}
                      {t("checklists.completed")} — {progress}%
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-cyan-400 transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="mb-6 grid gap-3">
                  {selectedChecklist.items.map((item, index) => (
                    <label
                      key={`${item}-${index}`}
                      className="flex cursor-pointer gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-4 transition hover:border-cyan-400"
                    >
                      <input
                        type="checkbox"
                        checked={checkedItems.includes(index)}
                        onChange={() => toggleItem(index)}
                        className="mt-1 h-5 w-5"
                      />

                      <span className="leading-7 text-slate-200">{item}</span>
                    </label>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={resetChecks}
                  className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-300 transition hover:border-cyan-400"
                >
                  {t("checklists.reset")}
                </button>

                <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-5">
                  <h3 className="mb-3 text-lg font-semibold">
                    {t("checklists.practiceTipTitle")}
                  </h3>

                  <p className="leading-8 text-slate-400">
                    {t("checklists.practiceTipText")}
                  </p>
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
