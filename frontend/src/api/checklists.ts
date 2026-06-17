export type Checklist = {
  id: number;
  title: string;
  category: string;
  items: string[];
};

const API_BASE_URL = "http://127.0.0.1:8000";

export async function getChecklistsApi(): Promise<Checklist[]> {
  const response = await fetch(`${API_BASE_URL}/api/checklists`);

  if (!response.ok) {
    throw new Error("Failed to load checklists");
  }

  return response.json();
}

export async function getChecklistByIdApi(id: number): Promise<Checklist> {
  const response = await fetch(`${API_BASE_URL}/api/checklists/${id}`);

  if (!response.ok) {
    throw new Error("Failed to load checklist");
  }

  return response.json();
}
