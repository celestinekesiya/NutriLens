import { useCallback, useEffect, useState } from "react";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";
import clsx from "clsx";

export type ToastType = "success" | "error" | "info";

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

/* ── Global imperative API ── */
type ToastListener = (toast: Toast) => void;
const listeners = new Set<ToastListener>();

function emit(type: ToastType, message: string) {
  const toast: Toast = { id: crypto.randomUUID(), type, message };
  listeners.forEach((fn) => fn(toast));
}

export const toast = {
  success: (msg: string) => emit("success", msg),
  error: (msg: string) => emit("error", msg),
  info: (msg: string) => emit("info", msg),
};

/* ── Toast container component ── */
const AUTO_DISMISS_MS = 4500;

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handler: ToastListener = (t) =>
      setToasts((prev) => [...prev, t]);
    listeners.add(handler);
    return () => { listeners.delete(handler); };
  }, []);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex flex-col-reverse items-end gap-2 sm:bottom-6 sm:right-6">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={remove} />
      ))}
    </div>
  );
}

function ToastItem({
  toast: t,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: (id: string) => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(t.id), AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [t.id, onDismiss]);

  const Icon =
    t.type === "success"
      ? CheckCircle2
      : t.type === "error"
        ? AlertCircle
        : Info;

  return (
    <div
      className={clsx(
        "pointer-events-auto flex w-full max-w-sm items-start gap-3 px-4 py-3 animate-fade-in-up",
        t.type === "success" && "text-emerald-800",
        t.type === "error" && "text-red-800",
        t.type === "info" && "text-blue-800",
      )}
      style={{
        background: "var(--bg-color)",
        border: "1px solid var(--border-color)",
        fontFamily: "'Roboto Mono', monospace",
        fontSize: "0.75rem",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      }}
    >
      <Icon size={18} className="mt-0.5 shrink-0" />
      <p className="flex-1 text-sm font-medium">{t.message}</p>
      <button
        onClick={() => onDismiss(t.id)}
        className="shrink-0 rounded-md p-0.5 opacity-60 transition-opacity hover:opacity-100"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
}
