import { useCallback, useRef, useState } from "react";
import { Upload, ImagePlus, X, AlertCircle, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  onImageSelected: (file: File, preview: string) => void;
  isAnalyzing: boolean;
}

const MAX_SIZE_MB = 10;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic"];

export default function ImageUploader({
  onImageSelected,
  isAnalyzing,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = useCallback((file: File): boolean => {
    setError(null);
    if (!ALLOWED_TYPES.includes(file.type)) {
      const errorMsg = `Unsupported file type: ${file.type}. Allowed: ${ALLOWED_TYPES.join(", ")}`;
      console.error(errorMsg);
      setError("Unsupported file type. Please upload a JPG, PNG, or WebP image.");
      return false;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      const errorMsg = `File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB. Maximum: ${MAX_SIZE_MB}MB`;
      console.error(errorMsg);
      setError(`File is too large. Maximum size is ${MAX_SIZE_MB} MB.`);
      return false;
    }
    return true;
  }, []);

  const handleFile = useCallback(
    (file: File) => {
      if (!validate(file)) return;
      const url = URL.createObjectURL(file);
      setPreview(url);
      onImageSelected(file, url);
    },
    [validate, onImageSelected],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const clear = useCallback(() => {
    setPreview(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  return (
    <section id="upload" className="py-16 sm:py-20">
      <div className="mx-auto max-w-[1400px] px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="font-mono-editorial"
            style={{ color: "var(--accent-red)", marginBottom: "0.5rem" }}
          >
            <span className="red-paren">(</span> ANALYZE{" "}
            <span className="red-paren">)</span>
          </p>
          <h2
            className="font-condensed"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            UPLOAD YOUR FOOD IMAGE
          </h2>
          <p
            className="font-mono-editorial mt-4"
            style={{ fontSize: "0.75rem", opacity: 0.7 }}
          >
            DRAG &amp; DROP OR CLICK TO UPLOAD — WE'LL HANDLE THE REST.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-xl">
          {/* Drop zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            onClick={() => !isAnalyzing && !preview && inputRef.current?.click()}
            className={`upload-zone relative flex min-h-[260px] flex-col items-center justify-center rounded-none ${
              isAnalyzing ? "pointer-events-none opacity-60" : ""
            } ${dragActive ? "upload-zone--drag-active" : ""} ${
              preview ? "upload-zone--has-preview" : ""
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept={ALLOWED_TYPES.join(",")}
              className="hidden"
              onChange={handleChange}
              disabled={isAnalyzing}
            />

            {/* Analyzing overlay */}
            {isAnalyzing && (
              <div
                className="absolute inset-0 z-10 flex flex-col items-center justify-center backdrop-blur-sm"
                style={{ background: "rgba(230, 230, 230, 0.8)" }}
              >
                <Loader2
                  size={36}
                  className="animate-spin"
                  style={{ color: "var(--accent-red)" }}
                />
                <p className="font-mono-editorial mt-3" style={{ fontSize: "0.75rem" }}>
                  ANALYZING YOUR FOOD IMAGE…
                </p>
              </div>
            )}

            {preview ? (
              /* Preview state */
              <div className="relative w-full p-4">
                <img
                  src={preview}
                  alt="Food preview"
                  className="mx-auto max-h-64 object-contain"
                />
                {!isAnalyzing && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      clear();
                    }}
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full transition-colors"
                    style={{
                      background: "var(--text-color)",
                      color: "var(--bg-color)",
                    }}
                    aria-label="Remove image"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ) : (
              /* Empty state */
              <div className="flex flex-col items-center px-6 py-10 text-center">
                <div
                  className="flex h-14 w-14 items-center justify-center"
                  style={{
                    border: "1px solid var(--border-color)",
                    borderRadius: "50%",
                    color: "var(--text-color)",
                  }}
                >
                  {dragActive ? <ImagePlus size={24} /> : <Upload size={24} />}
                </div>
                <p className="font-condensed mt-4" style={{ fontSize: "1.2rem" }}>
                  {dragActive
                    ? "DROP YOUR IMAGE HERE"
                    : "DRAG & DROP YOUR FOOD IMAGE"}
                </p>
                <p className="font-mono-editorial mt-2" style={{ fontSize: "0.7rem", opacity: 0.5 }}>
                  OR{" "}
                  <span
                    style={{
                      color: "var(--accent-red)",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    BROWSE FILES
                  </span>
                </p>
                <p className="font-mono-editorial mt-3" style={{ fontSize: "0.65rem", opacity: 0.4 }}>
                  JPG, PNG, WEBP UP TO {MAX_SIZE_MB}MB
                </p>
              </div>
            )}
          </div>

          {/* Error message */}
          {error && (
            <div
              className="mt-3 flex items-center gap-2 px-4 py-3 text-sm"
              style={{
                border: "1px solid var(--accent-red)",
                color: "var(--accent-red)",
              }}
            >
              <AlertCircle size={16} className="shrink-0" />
              <span className="font-mono-editorial" style={{ fontSize: "0.75rem" }}>
                {error}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
