import { useState, useCallback, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import Features from "./components/sections/Features";
import ImageUploader from "./components/upload/ImageUploader";
import ResultsDashboard from "./components/results/ResultsDashboard";
import { ResultsSkeleton } from "./components/ui/Skeleton";
import HistoryPanel from "./components/history/HistoryPanel";
import ApiKeyModal from "./components/ui/ApiKeyModal";
import { ToastContainer, toast } from "./components/ui/Toast";
import { analyzeImage, getStoredApiKey } from "./services/gemini";
import { saveToHistory, fileToDataUrl } from "./services/history";
import { useColorTheme } from "./hooks/useColorTheme";
import { isAnalysisError } from "./types";
import type { AnalysisResult } from "./types";

export default function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [_preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [showKeyModal, setShowKeyModal] = useState(false);

  // Initialize color theme
  useColorTheme();

  // Load stored API key on mount
  useEffect(() => {
    setApiKey(getStoredApiKey());
  }, []);

  const handleImageSelected = useCallback(
    async (file: File, previewUrl: string) => {
      setSelectedFile(file);
      setPreview(previewUrl);
      setResult(null);

      // Check for API key
      const key = getStoredApiKey();
      if (!key) {
        setShowKeyModal(true);
        return;
      }

      // Start analysis immediately
      runAnalysis(file, key);
    },
    [],
  );

  const runAnalysis = useCallback(async (file: File, key: string) => {
    setIsAnalyzing(true);
    setResult(null);

    try {
      const response = await analyzeImage(file, key);

      if (isAnalysisError(response)) {
        toast.error(response.error);
        setResult(null);
      } else {
        setResult(response);
        toast.success("Analysis complete!");

        // Save to history
        try {
          const dataUrl = await fileToDataUrl(file);
          saveToHistory(response, dataUrl);
        } catch (error) {
          console.error("Failed to save to history:", error);
          // History save failure is non-critical
        }
      }
    } catch (err) {
      console.error("Analysis error:", err);
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      toast.error(message);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const handleKeySaved = useCallback(
    (key: string) => {
      setApiKey(key);
      toast.success("API key saved!");

      // If user had already selected a file, auto-trigger analysis
      if (selectedFile) {
        runAnalysis(selectedFile, key);
      }
    },
    [selectedFile, runAnalysis],
  );

  // Allow retry
  const handleRetry = useCallback(() => {
    if (selectedFile && apiKey) {
      runAnalysis(selectedFile, apiKey);
    }
  }, [selectedFile, apiKey, runAnalysis]);

  // Reset & analyze another image
  const handleReset = useCallback(() => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
  }, []);

  // Load a past analysis from history
  const handleHistorySelect = useCallback((historyResult: AnalysisResult) => {
    setResult(historyResult);
    setSelectedFile(null);
    setPreview(null);
    toast.info("Loaded from history");
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar onApiKeyClick={() => setShowKeyModal(true)} hasApiKey={!!apiKey} />

      <main className="flex-1">
        <Hero />

        {/* Chef character peeking from top-right, visually outside sec 2 but part of it */}
        <div className="chef-peek">
          <svg
            width="72"
            height="88"
            viewBox="0 0 72 88"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Chef toque (hat) */}
            <ellipse cx="36" cy="14" rx="18" ry="12" fill="var(--bg-color)" stroke="var(--text-color)" strokeWidth="1.5" />
            <ellipse cx="28" cy="10" rx="8" ry="9" fill="var(--bg-color)" stroke="var(--text-color)" strokeWidth="1.5" />
            <ellipse cx="44" cy="10" rx="8" ry="9" fill="var(--bg-color)" stroke="var(--text-color)" strokeWidth="1.5" />
            <ellipse cx="36" cy="8" rx="7" ry="8" fill="var(--bg-color)" stroke="var(--text-color)" strokeWidth="1.5" />
            {/* Hat band */}
            <rect x="20" y="18" width="32" height="6" rx="1" fill="var(--accent-red)" />
            {/* Face */}
            <rect x="20" y="24" width="32" height="28" rx="5" fill="var(--bg-color)" stroke="var(--text-color)" strokeWidth="1.5" />
            {/* Eyes */}
            <circle cx="30" cy="36" r="2.5" fill="var(--text-color)">
              <animate attributeName="cy" values="36;34;36" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="42" cy="36" r="2.5" fill="var(--text-color)">
              <animate attributeName="cy" values="36;34;36" dur="3s" repeatCount="indefinite" />
            </circle>
            {/* Cheeks */}
            <circle cx="25" cy="42" r="3" fill="var(--accent-red)" opacity="0.3" />
            <circle cx="47" cy="42" r="3" fill="var(--accent-red)" opacity="0.3" />
            {/* Smile */}
            <path d="M31 44 Q36 49 41 44" stroke="var(--text-color)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* Body / apron */}
            <rect x="22" y="52" width="28" height="36" rx="3" fill="var(--bg-color)" stroke="var(--text-color)" strokeWidth="1.5" />
            {/* Apron pocket */}
            <rect x="29" y="62" width="14" height="8" rx="2" fill="none" stroke="var(--accent-red)" strokeWidth="1" />
            {/* Fork arm (waving) */}
            <g className="chef-wave">
              <line x1="20" y1="58" x2="6" y2="40" stroke="var(--text-color)" strokeWidth="2" strokeLinecap="round" />
              {/* Fork */}
              <line x1="6" y1="40" x2="6" y2="24" stroke="var(--text-color)" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="3" y1="28" x2="3" y2="24" stroke="var(--text-color)" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="6" y1="28" x2="6" y2="24" stroke="var(--text-color)" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="9" y1="28" x2="9" y2="24" stroke="var(--text-color)" strokeWidth="1.5" strokeLinecap="round" />
            </g>
            {/* Other arm */}
            <line x1="50" y1="58" x2="60" y2="66" stroke="var(--text-color)" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="chef-label font-mono-editorial">BON APPÉTIT!</span>
        </div>

        <ImageUploader
          onImageSelected={handleImageSelected}
          isAnalyzing={isAnalyzing}
        />

        {/* Skeleton loader during analysis */}
        {isAnalyzing && <ResultsSkeleton />}

        {/* Results Dashboard */}
        {result && !isAnalyzing && (
          <ResultsDashboard result={result} onReset={handleReset} />
        )}

        {/* Show retry button on failure when no result */}
        {!result && !isAnalyzing && selectedFile && (
          <div className="pb-8 text-center">
            <button
              onClick={handleRetry}
              className="cta-button"
            >
              Retry Analysis
            </button>
          </div>
        )}

        {/* History panel */}
        <div className="py-8">
          <HistoryPanel onSelectEntry={handleHistorySelect} />
        </div>

        <Features />
      </main>

      <Footer />

      {/* Modals & overlays */}
      <ApiKeyModal
        open={showKeyModal}
        onClose={() => setShowKeyModal(false)}
        onKeySaved={handleKeySaved}
      />
      <ToastContainer />
    </div>
  );
}
