import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { TotalNutrition } from "../../types";

interface MacroChartProps {
  nutrition: TotalNutrition;
}

const COLORS = [
  { key: "Protein", color: "#3B82F6" },   // blue-500
  { key: "Carbs", color: "#F59E0B" },      // amber-500
  { key: "Fat", color: "#F43F5E" },         // rose-500
  { key: "Fiber", color: "#10B981" },       // emerald-500
];

export default function MacroChart({ nutrition }: MacroChartProps) {
  const data = [
    { name: "Protein", value: nutrition.protein_g },
    { name: "Carbs", value: nutrition.carbs_g },
    { name: "Fat", value: nutrition.fat_g },
    { name: "Fiber", value: nutrition.fiber_g },
  ].filter((d) => d.value > 0);

  const total = data.reduce((s, d) => s + d.value, 0);

  if (total === 0) return null;

  return (
    <div
      className="animate-fade-in-up-delay-1 p-6"
      style={{ border: "1px solid var(--border-color)" }}
    >
      <p
        className="font-mono-editorial"
        style={{ color: "var(--accent-red)", fontSize: "0.75rem" }}
      >
        <span className="red-paren">(</span> MACRO DISTRIBUTION{" "}
        <span className="red-paren">)</span>
      </p>

      <div className="mt-4 flex flex-col items-center gap-6 sm:flex-row">
        {/* Pie chart */}
        <div className="h-52 w-52 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
                animationBegin={200}
                animationDuration={1000}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length].color}
                  />
                ))}
              </Pie>
              <Tooltip
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={((value: any, name: any) => [
                  `${Number(value ?? 0).toFixed(1)}g (${((Number(value ?? 0) / total) * 100).toFixed(0)}%)`,
                  String(name ?? ""),
                ]) as never}
                contentStyle={{
                  background: "var(--bg-color)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "0",
                  padding: "8px 12px",
                  fontSize: "13px",
                  fontFamily: "'Roboto Mono', monospace",
                  boxShadow: "none",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-1 flex-col gap-3">
          {data.map((entry, index) => {
            const pct = ((entry.value / total) * 100).toFixed(0);
            return (
              <div key={entry.name} className="flex items-center gap-3">
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length].color }}
                />
                <span className="font-mono-editorial flex-1" style={{ fontSize: "0.75rem" }}>
                  {entry.name}
                </span>
                <span className="font-mono-editorial" style={{ fontSize: "0.75rem", fontWeight: 700 }}>
                  {entry.value.toFixed(1)}g
                </span>
                <span className="font-mono-editorial w-10 text-right" style={{ fontSize: "0.65rem", opacity: 0.5 }}>
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
