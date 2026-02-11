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
import { isAnalysisError } from "./types";
import type { AnalysisResult } from "./types";

export default function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [_preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [showKeyModal, setShowKeyModal] = useState(false);

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

        {/* Divider before upload */}
        <div className="mx-auto max-w-[1400px] px-8">
          <div className="editorial-divider" />
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
