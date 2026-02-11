/**
 * Skeleton / shimmer loaders shown during AI analysis.
 * Matches the layout of the real ResultsDashboard – editorial theme.
 */

export function ResultsSkeleton() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-[1400px] px-8">
        {/* Header skeleton */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="h-8 w-48 animate-shimmer" />
            <div className="mt-2 h-4 w-64 animate-shimmer" />
          </div>
          <div className="h-10 w-40 animate-shimmer" />
        </div>

        {/* Dashboard grid skeleton */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Nutrition summary skeleton */}
          <div
            className="p-6 sm:p-8"
            style={{ border: "1px solid var(--border-color)" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 w-32 animate-shimmer" />
                <div className="mt-2 h-3 w-24 animate-shimmer" />
              </div>
              <div className="h-7 w-28 animate-shimmer" />
            </div>

            {/* Big calorie */}
            <div className="mt-6 flex items-baseline gap-2">
              <div className="h-12 w-8 animate-shimmer" />
              <div className="h-14 w-40 animate-shimmer" />
              <div className="h-5 w-10 animate-shimmer" />
            </div>

            {/* Summary text */}
            <div className="mt-3 space-y-2">
              <div className="h-3 w-full animate-shimmer" />
              <div className="h-3 w-3/4 animate-shimmer" />
            </div>

            {/* Macro bars */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="p-4"
                  style={{
                    border: "1px solid rgba(0,0,0,0.1)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-20 animate-shimmer" />
                    <div className="h-4 w-12 animate-shimmer" />
                  </div>
                  <div className="mt-3 h-2 w-full animate-shimmer" />
                  <div className="mt-1.5 h-3 w-28 animate-shimmer" />
                </div>
              ))}
            </div>
          </div>

          {/* Chart skeleton */}
          <div
            className="p-6"
            style={{ border: "1px solid var(--border-color)" }}
          >
            <div className="h-4 w-36 animate-shimmer" />
            <div className="mt-4 flex flex-col items-center gap-6 sm:flex-row">
              <div className="h-52 w-52 shrink-0 rounded-full animate-shimmer" />
              <div className="flex flex-1 flex-col gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-3 w-3 shrink-0 rounded-full animate-shimmer" />
                    <div className="h-3 flex-1 animate-shimmer" />
                    <div className="h-3 w-10 animate-shimmer" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Food cards skeleton */}
        <div className="mt-10">
          <div className="h-4 w-32 animate-shimmer" />
          <div className="mt-1 h-3 w-52 animate-shimmer" />

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="p-5"
                style={{ border: "1px solid var(--border-color)" }}
              >
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 shrink-0 animate-shimmer" />
                  <div className="flex-1">
                    <div className="h-5 w-32 animate-shimmer" />
                    <div className="mt-1 h-3 w-20 animate-shimmer" />
                  </div>
                  <div className="h-6 w-16 animate-shimmer" />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="h-7 w-20 animate-shimmer" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
