import { Palette, X } from "lucide-react";

interface ColorThemeModalProps {
  open: boolean;
  onClose: () => void;
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const colorThemes = [
  {
    name: "Forest Green",
    value: "forest",
    primary: "#006110",
    description: "Original forest green"
  },
  {
    name: "Ocean Blue",
    value: "ocean",
    primary: "#0066cc",
    description: "Deep ocean blue"
  },
  {
    name: "Royal Purple",
    value: "royal",
    primary: "#6b21a8",
    description: "Rich royal purple"
  },
  {
    name: "Crimson Red",
    value: "crimson",
    primary: "#dc2626",
    description: "Bold crimson red"
  },
  {
    name: "Sunset Orange",
    value: "sunset",
    primary: "#ea580c",
    description: "Vibrant sunset orange"
  },
  {
    name: "Dark Slate",
    value: "slate",
    primary: "#374151",
    description: "Modern dark slate"
  }
];

export default function ColorThemeModal({ 
  open, 
  onClose, 
  currentTheme, 
  onThemeChange 
}: ColorThemeModalProps) {
  if (!open) return null;

  const handleThemeSelect = (themeValue: string) => {
    onThemeChange(themeValue);
    onClose();
  };

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
        className="animate-fade-in-up relative w-full max-w-lg p-6 shadow-xl"
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
          <Palette size={22} />
        </div>

        <h3 className="font-condensed mt-4" style={{ fontSize: "1.5rem" }}>
          CHOOSE YOUR THEME
        </h3>
        <p
          className="font-mono-editorial mt-2"
          style={{ fontSize: "0.75rem", lineHeight: 1.6, opacity: 0.7 }}
        >
          Select a primary color theme for the website. Your preference will be
          saved in your browser.
        </p>

        {/* Color Options */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {colorThemes.map((theme) => (
            <button
              key={theme.value}
              onClick={() => handleThemeSelect(theme.value)}
              className={`group relative overflow-hidden p-4 text-left transition-all hover:scale-105 ${
                currentTheme === theme.value 
                  ? 'shadow-lg' 
                  : 'hover:shadow-lg'
              }`}
              style={{
                border: currentTheme === theme.value 
                  ? `2px solid ${theme.primary}` 
                  : "1px solid var(--border-color)",
                background: currentTheme === theme.value 
                  ? `${theme.primary}15` 
                  : "transparent"
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-6 w-6 rounded-full border"
                  style={{
                    backgroundColor: theme.primary,
                    borderColor: "var(--border-color)"
                  }}
                />
                <div>
                  <div 
                    className="font-condensed text-sm"
                    style={{ color: theme.primary }}
                  >
                    {theme.name}
                  </div>
                  <div
                    className="font-mono-editorial text-xs"
                    style={{ fontSize: "0.65rem", opacity: 0.6 }}
                  >
                    {theme.description}
                  </div>
                </div>
              </div>
              
              {currentTheme === theme.value && (
                <div
                  className="absolute right-2 top-2 h-2 w-2 rounded-full"
                  style={{ backgroundColor: theme.primary }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="nav-pill flex-1 justify-center"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="nav-pill flex-1 justify-center"
            style={{ 
              background: "var(--text-color)", 
              color: "var(--bg-color)" 
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}