import { useState, useEffect } from "react";
import { Key, Eye, EyeOff, X, ExternalLink } from "lucide-react";
import { getStoredApiKey, storeApiKey } from "../../services/gemini";

interface ApiKeyModalProps {
  open: boolean;
  onClose: () => void;
  onKeySaved: (key: string) => void;
}

export default function ApiKeyModal({ open, onClose, onKeySaved }: ApiKeyModalProps) {
  const [key, setKey] = useState("");
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    if (open) {
      const stored = getStoredApiKey();
      if (stored) setKey(stored);
    }
  }, [open]);

  if (!open) return null;

  function handleSave() {
    const trimmed = key.trim();
    if (!trimmed) return;
    storeApiKey(trimmed);
    onKeySaved(trimmed);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ background: "rgba(17, 17, 17, 0.4)" }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="animate-fade-in-up relative w-full max-w-md p-6 shadow-xl"
        style={{
          background: "var(--bg-color)",
          border: "1px solid var(--border-color)",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div
          className="flex h-12 w-12 items-center justify-center"
          style={{
            border: "1px solid var(--border-color)",
            borderRadius: "50%",
          }}
        >
          <Key size={22} />
        </div>

        <h3 className="font-condensed mt-4" style={{ fontSize: "1.5rem" }}>
          CONNECT YOUR AI
        </h3>
        <p
          className="font-mono-editorial mt-2"
          style={{ fontSize: "0.75rem", lineHeight: 1.6, opacity: 0.7 }}
        >
          Enter your Google AI API key to enable food analysis. Your key is
          stored locally in your browser and never sent to our servers.
        </p>

        {/* Input */}
        <div className="relative mt-5">
          <input
            type={showKey ? "text" : "password"}
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="AIza..."
            className="font-mono-editorial w-full py-2.5 pl-4 pr-12 text-sm outline-none transition-all"
            style={{
              border: "1px solid var(--border-color)",
              background: "transparent",
              color: "var(--text-color)",
            }}
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            aria-label={showKey ? "Hide key" : "Show key"}
          >
            {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <a
          href="https://aistudio.google.com/app/apikey"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono-editorial mt-3 inline-flex items-center gap-1 hover:underline"
          style={{ fontSize: "0.7rem", color: "var(--accent-red)" }}
        >
          Get a free API key from Google AI Studio
          <ExternalLink size={12} />
        </a>

        {/* Actions */}
        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={onClose}
            className="nav-pill flex-1 justify-center"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!key.trim()}
            className="cta-button flex-1 text-center disabled:cursor-not-allowed disabled:opacity-50"
            style={{ padding: "0.6rem 1.5rem", fontSize: "0.75rem" }}
          >
            Save Key
          </button>
        </div>
      </div>
    </div>
  );
}
