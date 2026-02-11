import type { AnalysisResult, HistoryEntry } from "../types";

const HISTORY_KEY = "nutrilens_history";
const MAX_ENTRIES = 20;

/** Get all history entries, newest first */
export function getHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as HistoryEntry[];
  } catch (error) {
    console.error("Failed to load history from localStorage:", error);
    return [];
  }
}

/** Save a new analysis result to history */
export function saveToHistory(result: AnalysisResult, imageDataUrl: string): HistoryEntry {
  const entry: HistoryEntry = {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    imageUrl: imageDataUrl,
    result,
  };

  const history = getHistory();
  history.unshift(entry);

  // Keep only last N entries
  const trimmed = history.slice(0, MAX_ENTRIES);
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
  } catch (error) {
    console.error("Failed to save history to localStorage:", error);
  }

  return entry;
}

/** Delete a single history entry */
export function deleteHistoryEntry(id: string): void {
  try {
    const history = getHistory().filter((e) => e.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error("Failed to delete history entry:", error);
  }
}

/** Clear all history */
export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error("Failed to clear history:", error);
  }
}

/** Convert a File to a data URL for storage */
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => {
      console.error("Failed to convert file to data URL:", error);
      reject(error);
    };
    reader.readAsDataURL(file);
  });
}
