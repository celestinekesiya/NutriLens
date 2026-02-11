import { useState, useEffect, useCallback } from "react";
import { Clock, Trash2, ChevronRight, History, X } from "lucide-react";
import type { AnalysisResult, HistoryEntry } from "../../types";
import { getHistory, deleteHistoryEntry, clearHistory } from "../../services/history";

interface HistoryPanelProps {
  onSelectEntry: (result: AnalysisResult) => void;
}

export default function HistoryPanel({ onSelectEntry }: HistoryPanelProps) {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [open, setOpen] = useState(false);

  const refresh = useCallback(() => {
    setEntries(getHistory());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Also refresh when panel opens
  useEffect(() => {
    if (open) refresh();
  }, [open, refresh]);

  const handleDelete = useCallback(
    (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      deleteHistoryEntry(id);
      refresh();
    },
    [refresh],
  );

  const handleClearAll = useCallback(() => {
    clearHistory();
    refresh();
  }, [refresh]);

  if (entries.length === 0 && !open) return null;

  return (
    <>
      {/* Toggle button */}
      <div className="mx-auto max-w-[1400px] px-8">
        <button
          onClick={() => setOpen(!open)}
          className="nav-pill"
        >
          <History size={16} />
          Past Analyses
          {entries.length > 0 && (
            <span
              className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold"
              style={{ background: "var(--accent-red)", color: "white" }}
            >
              {entries.length}
            </span>
          )}
          <ChevronRight
            size={14}
            className={`transition-transform duration-200 ${open ? "rotate-90" : ""}`}
          />
        </button>
      </div>

      {/* Panel */}
      {open && (
        <div className="mx-auto mt-4 max-w-[1400px] px-8 animate-fade-in-up">
          <div
          className="animate-fade-in-up"
          style={{ border: "1px solid var(--border-color)" }}
        >
            {/* Panel header */}
            <div className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: "rgba(0,0,0,0.1)" }}>
              <h3 className="font-mono-editorial" style={{ fontSize: "0.75rem" }}>
                ANALYSIS HISTORY
              </h3>
              <div className="flex items-center gap-2">
                {entries.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-500 transition-colors hover:bg-red-50"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                  aria-label="Close history"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Entries list */}
            {entries.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <Clock size={24} className="mx-auto text-slate-300" />
                <p className="mt-2 text-sm text-slate-400">
                  No past analyses yet
                </p>
              </div>
            ) : (
              <div className="max-h-80 overflow-y-auto">
                {entries.map((entry) => (
                  <button
                    key={entry.id}
                    onClick={() => {
                      onSelectEntry(entry.result);
                      setOpen(false);
                    }}
                    className="group flex w-full items-center gap-4 border-b border-slate-50 px-5 py-3 text-left transition-colors last:border-0 hover:bg-slate-50"
                  >
                    {/* Thumbnail */}
                    <img
                      src={entry.imageUrl}
                      alt="Food"
                      className="h-12 w-12 shrink-0 rounded-lg object-cover"
                    />

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-800">
                        {entry.result.foods.map((f) => f.name).join(", ")}
                      </p>
                      <div className="mt-0.5 flex items-center gap-3 text-xs text-slate-400">
                        <span>
                          {entry.result.total_nutrition.calories} kcal
                        </span>
                        <span>•</span>
                        <span>
                          {new Date(entry.timestamp).toLocaleDateString(
                            undefined,
                            { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" },
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={(e) => handleDelete(entry.id, e)}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-300 opacity-0 transition-all hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
                      aria-label="Delete entry"
                    >
                      <Trash2 size={14} />
                    </button>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
