import type { AnalysisResult } from "../../types";
import NutritionSummary from "./NutritionSummary";
import MacroChart from "./MacroChart";
import FoodBreakdown from "./FoodBreakdown";
import { RotateCcw, Download, FileJson, Share2 } from "lucide-react";
import { exportAsPDF, exportAsJSON, shareResults } from "../../services/export";
import { toast } from "../ui/Toast";
import { useCallback } from "react";

interface ResultsDashboardProps {
  result: AnalysisResult;
  onReset: () => void;
}

export default function ResultsDashboard({ result, onReset }: ResultsDashboardProps) {
  const handleExportPDF = useCallback(() => {
    try {
      exportAsPDF(result);
      toast.success("PDF downloaded!");
    } catch (error) {
      console.error("PDF export failed:", error);
      toast.error("Failed to generate PDF.");
    }
  }, [result]);

  const handleExportJSON = useCallback(() => {
    try {
      exportAsJSON(result);
      toast.success("JSON downloaded!");
    } catch (error) {
      console.error("JSON export failed:", error);
      toast.error("Failed to export JSON.");
    }
  }, [result]);

  const handleShare = useCallback(async () => {
    const ok = await shareResults(result);
    if (ok) {
      toast.success("Copied to clipboard!");
    } else {
      toast.error("Could not share results.");
    }
  }, [result]);

  return (
    <section id="results" className="py-16 sm:py-20">
      <div className="mx-auto max-w-[1400px] px-8">
        {/* Section header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-condensed" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
              YOUR RESULTS
            </h2>
            <p
              className="font-mono-editorial mt-1"
              style={{ fontSize: "0.7rem", opacity: 0.6 }}
            >
              AI-POWERED NUTRITIONAL ANALYSIS OF YOUR MEAL
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <ActionButton onClick={handleExportPDF} icon={<Download size={14} />} label="PDF" />
            <ActionButton onClick={handleExportJSON} icon={<FileJson size={14} />} label="JSON" />
            <ActionButton onClick={handleShare} icon={<Share2 size={14} />} label="Share" />
            <button
              onClick={onReset}
              className="nav-pill"
            >
              <RotateCcw size={14} />
              Analyze Another
            </button>
          </div>
        </div>

        {/* Dashboard grid */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Left column — Nutrition Summary */}
          <NutritionSummary
            nutrition={result.total_nutrition}
            confidence={result.confidence_score}
            summary={result.analysis_summary}
            foodCount={result.foods.length}
          />

          {/* Right column — Macro Chart */}
          <MacroChart nutrition={result.total_nutrition} />
        </div>

        {/* Food breakdown */}
        <div className="mt-10">
          <FoodBreakdown foods={result.foods} />
        </div>
      </div>
    </section>
  );
}

function ActionButton({
  onClick,
  icon,
  label,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className="nav-pill"
      style={{ padding: "0.5rem 1rem", fontSize: "0.7rem" }}
    >
      {icon}
      {label}
    </button>
  );
}
