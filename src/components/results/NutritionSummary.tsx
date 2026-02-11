import { Flame, Beef, Wheat, Droplets, Leaf } from "lucide-react";
import { useAnimatedCounter } from "../../hooks/useAnimatedCounter";
import type { TotalNutrition } from "../../types";
import clsx from "clsx";

interface NutritionSummaryProps {
  nutrition: TotalNutrition;
  confidence: number;
  summary: string;
  foodCount: number;
}

const MACRO_CONFIG = [
  {
    key: "protein_g" as const,
    label: "Protein",
    color: "bg-blue-500",
    trackColor: "bg-blue-100",
    textColor: "text-blue-600",
    icon: Beef,
    unit: "g",
    dailyTarget: 50,
  },
  {
    key: "carbs_g" as const,
    label: "Carbs",
    color: "bg-amber-500",
    trackColor: "bg-amber-100",
    textColor: "text-amber-600",
    icon: Wheat,
    unit: "g",
    dailyTarget: 300,
  },
  {
    key: "fat_g" as const,
    label: "Fat",
    color: "bg-rose-500",
    trackColor: "bg-rose-100",
    textColor: "text-rose-600",
    icon: Droplets,
    unit: "g",
    dailyTarget: 65,
  },
  {
    key: "fiber_g" as const,
    label: "Fiber",
    color: "bg-emerald-500",
    trackColor: "bg-emerald-100",
    textColor: "text-emerald-600",
    icon: Leaf,
    unit: "g",
    dailyTarget: 25,
  },
];

export default function NutritionSummary({
  nutrition,
  confidence,
  summary,
  foodCount,
}: NutritionSummaryProps) {
  const animatedCalories = useAnimatedCounter(nutrition.calories, 1400);
  const confidencePct = Math.round(confidence * 100);

  return (
    <div
      className="animate-fade-in-up p-6 sm:p-8"
      style={{ border: "1px solid var(--border-color)" }}
    >
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p
            className="font-mono-editorial"
            style={{ color: "var(--accent-red)", fontSize: "0.75rem" }}
          >
            <span className="red-paren">(</span> NUTRITION SUMMARY{" "}
            <span className="red-paren">)</span>
          </p>
          <p
            className="font-mono-editorial mt-1"
            style={{ fontSize: "0.7rem", opacity: 0.6 }}
          >
            {foodCount} FOOD ITEM{foodCount !== 1 ? "S" : ""} DETECTED
          </p>
        </div>

        {/* Confidence badge */}
        <div
          className={clsx(
            "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
            confidencePct >= 80
              ? "bg-emerald-50 text-emerald-700"
              : confidencePct >= 50
                ? "bg-amber-50 text-amber-700"
                : "bg-red-50 text-red-700",
          )}
        >
          <span
            className={clsx(
              "h-1.5 w-1.5 rounded-full",
              confidencePct >= 80
                ? "bg-emerald-500"
                : confidencePct >= 50
                  ? "bg-amber-500"
                  : "bg-red-500",
            )}
          />
          {confidencePct}% confidence
        </div>
      </div>

      {/* Big calorie number */}
      <div className="mt-6 flex items-baseline gap-2">
        <Flame size={28} className="text-orange-500" />
        <span className="font-condensed" style={{ fontSize: "clamp(3rem, 6vw, 4rem)" }}>
          {animatedCalories.toLocaleString()}
        </span>
        <span
          className="font-mono-editorial"
          style={{ fontSize: "0.8rem", opacity: 0.5 }}
        >
          KCAL
        </span>
      </div>

      {/* Summary text */}
      <p
        className="font-mono-editorial mt-3"
        style={{ fontSize: "0.75rem", lineHeight: 1.6, opacity: 0.7, textTransform: "none" }}
      >
        {summary}
      </p>

      {/* Macro progress bars */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {MACRO_CONFIG.map((macro) => {
          const value = nutrition[macro.key];
          const pct = Math.min((value / macro.dailyTarget) * 100, 100);
          return (
            <MacroBar
              key={macro.key}
              label={macro.label}
              value={value}
              unit={macro.unit}
              percentage={pct}
              color={macro.color}
              trackColor={macro.trackColor}
              textColor={macro.textColor}
              icon={macro.icon}
              dailyTarget={macro.dailyTarget}
            />
          );
        })}
      </div>
    </div>
  );
}

function MacroBar({
  label,
  value,
  unit,
  percentage,
  color,
  trackColor,
  textColor,
  icon: Icon,
  dailyTarget,
}: {
  label: string;
  value: number;
  unit: string;
  percentage: number;
  color: string;
  trackColor: string;
  textColor: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  dailyTarget: number;
}) {
  const animatedValue = useAnimatedCounter(value, 1000, 1);

  return (
    <div
      className="p-4"
      style={{ border: "1px solid rgba(0,0,0,0.1)" }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon size={16} className={textColor} />
          <span className="font-mono-editorial" style={{ fontSize: "0.75rem" }}>
            {label}
          </span>
        </div>
        <span className="font-mono-editorial" style={{ fontSize: "0.75rem", fontWeight: 700 }}>
          {animatedValue}
          <span style={{ marginLeft: 2, opacity: 0.5, fontWeight: 400 }}>
            {unit}
          </span>
        </span>
      </div>

      {/* Progress bar */}
      <div className={clsx("mt-3 h-2 w-full overflow-hidden rounded-full", trackColor)}>
        <div
          className={clsx("h-full rounded-full transition-all duration-1000 ease-out", color)}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="font-mono-editorial mt-1.5" style={{ fontSize: "0.65rem", opacity: 0.5 }}>
        {Math.round(percentage)}% OF {dailyTarget}
        {unit} DAILY TARGET
      </p>
    </div>
  );
}
