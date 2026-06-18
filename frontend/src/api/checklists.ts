export type Checklist = {
  id: number;
  category: string;
  title: string;
  items: string[];
};

const API_BASE_URL = "http://127.0.0.1:8000";

export async function getChecklistsApi(language = "en"): Promise<Checklist[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/checklists?lang=${language}`
  );

  if (!response.ok) {
    throw new Error("Failed to load checklists");
  }

  return response.json();
}

export async function getChecklistByIdApi(
  id: number,
  language = "en"
): Promise<Checklist> {
  const response = await fetch(
    `${API_BASE_URL}/api/checklists/${id}?lang=${language}`
  );

  if (!response.ok) {
    throw new Error("Failed to load checklist");
  }

  return response.json();
}
