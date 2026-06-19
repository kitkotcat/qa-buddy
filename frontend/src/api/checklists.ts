import { offlineChecklistsByLanguage } from "../data/offline/offlineChecklists";
import { isNativeApp } from "../utils/platform";

export interface Checklist {
  id: number;
  category: string;
  title: string;
  items: string[];
}

type SupportedLanguage = "en" | "ru";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

function normalizeLanguage(language: string): SupportedLanguage {
  return language === "ru" ? "ru" : "en";
}

function getOfflineChecklists(language: string): Checklist[] {
  const normalizedLanguage = normalizeLanguage(language);
  const source = offlineChecklistsByLanguage[normalizedLanguage];

  return source.map((checklist) => ({
    id: checklist.id,
    category: checklist.category,
    title: checklist.title,
    items: [...checklist.items],
  }));
}

export async function getChecklistsApi(
  language = "en"
): Promise<Checklist[]> {
  if (isNativeApp()) {
    return getOfflineChecklists(language);
  }

  const response = await fetch(
    `${API_BASE_URL}/api/checklists?lang=${normalizeLanguage(language)}`
  );

  if (!response.ok) {
    throw new Error(`Failed to load checklists: ${response.status}`);
  }

  return (await response.json()) as Checklist[];
}

export async function getChecklistByIdApi(
  id: number,
  language = "en"
): Promise<Checklist> {
  if (isNativeApp()) {
    const checklist = getOfflineChecklists(language).find(
      (item) => item.id === id
    );

    if (!checklist) {
      throw new Error(`Checklist with id ${id} was not found`);
    }

    return checklist;
  }

  const response = await fetch(
    `${API_BASE_URL}/api/checklists/${id}?lang=${normalizeLanguage(language)}`
  );

  if (!response.ok) {
    throw new Error(`Failed to load checklist: ${response.status}`);
  }

  return (await response.json()) as Checklist;
}
