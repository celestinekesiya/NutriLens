import { Menu, X, Key, Palette } from "lucide-react";
import { useState } from "react";
import ColorThemeModal from "../ui/ColorThemeModal";
import { useColorTheme } from "../../hooks/useColorTheme";

interface NavbarProps {
  onApiKeyClick: () => void;
  hasApiKey: boolean;
}

export default function Navbar({ onApiKeyClick, hasApiKey }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const { currentTheme, changeTheme } = useColorTheme();

  return (
    <nav className="relative z-50 w-full" style={{ backgroundColor: "var(--bg-color)" }}>
      <div className="mx-auto max-w-[1400px] px-8">
        <div className="flex items-center justify-between py-8">
          {/* Left: nav pills */}
          <div className="hidden items-center gap-4 sm:flex">
            <a href="#features" className="nav-pill">
              Features
            </a>
            <a href="#upload" className="nav-pill">
              Analyze
            </a>
          </div>

          {/* Center: brand */}
          <a
            href="/"
            className="font-condensed text-center"
            style={{ fontSize: "1.5rem", letterSpacing: "0.05em" }}
          >
            NUTRI
            <span style={{ color: "var(--accent-red)" }}>_</span>
            LENS
          </a>

          {/* Right: theme + API key + arrow */}
          <div className="hidden items-center gap-4 sm:flex">
            <button
              onClick={() => setThemeModalOpen(true)}
              className="nav-pill"
              title="Change theme colors"
            >
              <Palette size={12} />
              Theme
            </button>
            <button
              onClick={onApiKeyClick}
              className={`nav-pill ${hasApiKey ? "nav-pill--active" : ""}`}
              title={hasApiKey ? "API key configured" : "Set up API key"}
            >
              <Key size={12} />
              {hasApiKey ? "API ✓" : "API Key"}
            </button>
            <a href="#upload" className="arrow-icon">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="nav-pill flex sm:!hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="editorial-divider" />

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="animate-fade-in-up border-b px-8 pb-6 pt-4 sm:hidden"
          style={{
            borderColor: "var(--border-color)",
            backgroundColor: "var(--bg-color)",
          }}
        >
          <div className="flex flex-col gap-3">
            <a
              href="#features"
              onClick={() => setMobileOpen(false)}
              className="nav-pill w-full justify-center"
            >
              Features
            </a>
            <a
              href="#upload"
              onClick={() => setMobileOpen(false)}
              className="nav-pill w-full justify-center"
            >
              Analyze
            </a>
            <button
              onClick={() => {
                setMobileOpen(false);
                setThemeModalOpen(true);
              }}
              className="nav-pill w-full justify-center"
            >
              <Palette size={12} />
              Theme
            </button>
            <button
              onClick={() => {
                setMobileOpen(false);
                onApiKeyClick();
              }}
              className={`nav-pill w-full justify-center ${hasApiKey ? "nav-pill--active" : ""}`}
            >
              <Key size={12} />
              {hasApiKey ? "API Key ✓" : "Set API Key"}
            </button>
            <a
              href="#upload"
              onClick={() => setMobileOpen(false)}
              className="cta-button w-full text-center"
            >
              Get Started
            </a>
          </div>
        </div>
      )}

      {/* Color Theme Modal */}
      <ColorThemeModal
        open={themeModalOpen}
        onClose={() => setThemeModalOpen(false)}
        currentTheme={currentTheme}
        onThemeChange={changeTheme}
      />
    </nav>
  );
}

