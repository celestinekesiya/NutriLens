import { UtensilsCrossed } from "lucide-react";
import type { FoodItem } from "../../types";
import { useAnimatedCounter } from "../../hooks/useAnimatedCounter";

interface FoodBreakdownProps {
  foods: FoodItem[];
}

export default function FoodBreakdown({ foods }: FoodBreakdownProps) {
  return (
    <div className="animate-fade-in-up-delay-2">
      <p
        className="font-mono-editorial"
        style={{ color: "var(--accent-red)", fontSize: "0.75rem" }}
      >
        <span className="red-paren">(</span> FOOD BREAKDOWN{" "}
        <span className="red-paren">)</span>
      </p>
      <p
        className="font-mono-editorial mt-1"
        style={{ fontSize: "0.7rem", opacity: 0.6 }}
      >
        INDIVIDUAL NUTRITION PER DETECTED ITEM
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {foods.map((food, i) => (
          <FoodCard key={`${food.name}-${i}`} food={food} index={i} />
        ))}
      </div>
    </div>
  );
}

function FoodCard({ food, index }: { food: FoodItem; index: number }) {
  const animatedCal = useAnimatedCounter(food.calories, 1000 + index * 100);

  return (
    <div
      className="group p-5 transition-all duration-200"
      style={{ border: "1px solid var(--border-color)" }}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center"
          style={{
            border: "1px solid var(--border-color)",
            borderRadius: "50%",
          }}
        >
          <UtensilsCrossed size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-condensed truncate" style={{ fontSize: "1.1rem" }}>
            {food.name}
          </h4>
          <p className="font-mono-editorial" style={{ fontSize: "0.65rem", opacity: 0.5 }}>
            {food.estimated_portion}
          </p>
        </div>
        <div className="text-right">
          <span className="font-condensed" style={{ fontSize: "1.3rem" }}>
            {animatedCal}
          </span>
          <span className="font-mono-editorial ml-0.5" style={{ fontSize: "0.6rem", opacity: 0.5 }}>
            KCAL
          </span>
        </div>
      </div>

      {/* Macro pills */}
      <div className="mt-4 flex flex-wrap gap-2">
        <MacroPill label="Protein" value={food.protein_g} unit="g" color="bg-blue-50 text-blue-700" />
        <MacroPill label="Carbs" value={food.carbs_g} unit="g" color="bg-amber-50 text-amber-700" />
        <MacroPill label="Fat" value={food.fat_g} unit="g" color="bg-rose-50 text-rose-700" />
        <MacroPill label="Fiber" value={food.fiber_g} unit="g" color="bg-emerald-50 text-emerald-700" />
      </div>
    </div>
  );
}

function MacroPill({
  label,
  value,
  unit,
  color,
}: {
  label: string;
  value: number;
  unit: string;
  color: string;
}) {
  return (
    <span
      className={`font-mono-editorial inline-flex items-center gap-1 px-2.5 py-1 ${color}`}
      style={{ fontSize: "0.65rem", border: "1px solid rgba(0,0,0,0.08)" }}
    >
      {label}
      <strong className="font-bold">
        {value.toFixed(1)}
        {unit}
      </strong>
    </span>
  );
}
