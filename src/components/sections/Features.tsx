const features = [
  {
    number: "01",
    title: "CALORIC DENSITY MAPPING",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500&auto=format&fit=crop",
    imageAlt: "Vegetables",
  },
  {
    number: "02",
    title: "MACRO NUTRIENT BREAKDOWN",
    image:
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=500&auto=format&fit=crop",
    imageAlt: "Toast",
  },
  {
    number: "03",
    title: "CONFIDENCE SCORING",
    image:
      "https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=500&auto=format&fit=crop",
    imageAlt: "Pancakes",
  },
  {
    number: "04",
    title: "EXPORT PDF & JSON",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=500&auto=format&fit=crop",
    imageAlt: "Meal prep",
  },
  {
    number: "05",
    title: "ALLERGEN DETECTION",
    image:
      "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=500&auto=format&fit=crop",
    imageAlt: "Food platter",
  },
  {
    number: "06",
    title: "ANALYSIS HISTORY",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=500&auto=format&fit=crop",
    imageAlt: "Food spread",
  },
];

export default function Features() {
  return (
    <>
      {/* ── Feature Strip ── */}
      <section id="features" className="mx-auto max-w-[1400px] px-8">
        <div className="feature-strip">
          {/* Left: Title area */}
          <div className="fs-title-area">
            <h2
              className="font-condensed"
              style={{ fontSize: "3rem", lineHeight: 1 }}
            >
              AI
              <br />
              ANALYSIS
              <br />
              ENGINE
            </h2>
            <p
              className="font-mono-editorial"
              style={{ marginTop: "2rem", fontSize: "0.8rem", lineHeight: 1.5 }}
            >
              OUR ENGINE IDENTIFIES INGREDIENTS, ESTIMATES PORTION SIZES, AND
              CALCULATES MACRONUTRIENTS WITH AI-POWERED PRECISION.
            </p>
          </div>

          {/* Right: Feature rows */}
          <div className="fs-content-area">
            {features.map((f) => (
              <div key={f.number} className="feature-row">
                <div className="font-mono-editorial">
                  <span
                    style={{
                      color: "var(--accent-red)",
                      marginRight: "1rem",
                    }}
                  >
                    {f.number}
                  </span>
                  {f.title}
                </div>
                <img
                  src={f.image}
                  alt={f.imageAlt}
                  className="feature-img-strip"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tagline Section ── */}
      <section className="mx-auto max-w-[1400px] px-8 py-16 text-center sm:py-20">
        <h3
          className="font-condensed"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)", marginBottom: "2rem" }}
        >
          MAKE DATA{" "}
          <span
            style={{
              background: "var(--text-color)",
              color: "var(--bg-color)",
              padding: "0 10px",
            }}
          >
            DIGESTIBLE
          </span>
        </h3>

        <div className="mt-8 flex flex-wrap justify-center gap-8" style={{ color: "var(--accent-red)" }}>
          <div className="font-mono-editorial" style={{ fontSize: "0.75rem" }}>
            <span className="red-paren">(</span> PRIVACY FOCUSED{" "}
            <span className="red-paren">)</span>
          </div>
          <div className="font-mono-editorial" style={{ fontSize: "0.75rem" }}>
            <span className="red-paren">(</span> INSTANT ANALYSIS{" "}
            <span className="red-paren">)</span>
          </div>
          <div className="font-mono-editorial" style={{ fontSize: "0.75rem" }}>
            <span className="red-paren">(</span> MOBILE FRIENDLY{" "}
            <span className="red-paren">)</span>
          </div>
        </div>
      </section>
    </>
  );
}
