import { Github, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-[1400px] px-8">
        {/* Divider */}
        <div className="editorial-divider" />

        {/* Footer content */}
        <div className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
          <div className="font-mono-editorial" style={{ fontSize: "0.7rem" }}>
            &copy; {new Date().getFullYear()} NUTRILENS LABS
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              aria-label="Twitter"
              className="transition-colors hover:opacity-60"
              style={{ color: "var(--text-color)" }}
            >
              <Twitter size={16} />
            </a>
            <a
              href="#"
              aria-label="GitHub"
              className="transition-colors hover:opacity-60"
              style={{ color: "var(--text-color)" }}
            >
              <Github size={16} />
            </a>
          </div>

          <div className="font-mono-editorial" style={{ fontSize: "0.7rem" }}>
            EST. 2026
          </div>
        </div>
      </div>
    </footer>
  );
}
