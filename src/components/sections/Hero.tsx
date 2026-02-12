import { useEffect, useRef } from "react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax mouse-tracking effect for floating elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const floaters = sectionRef.current.querySelectorAll<HTMLElement>(
        ".floating-stat, .card-floater"
      );
      const speed = 15;
      const xOffset = (window.innerWidth / 2 - e.clientX) / speed;
      const yOffset = (window.innerHeight / 2 - e.clientY) / speed;

      floaters.forEach((floater) => {
        floater.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section ref={sectionRef} className="hero-section">
      <div className="mx-auto max-w-[1400px] px-8 relative">
        {/* Floating stats */}
        {/* Main headline */}
        <div className="hero-headline font-condensed">
          <div className="hero-line-block">
            <span>VISUAL</span>
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"
              className="hero-inline-img"
              alt="Salad Bowl"
            />
            <span>FOOD</span>
          </div>
          <div className="hero-line-block">
            <img
              src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop"
              className="hero-inline-img"
              alt="Burger"
            />
            <span>INTELLIGENCE</span>
          </div>
          <div className="hero-tagline">
            UPLOAD AN IMAGE — GET MACROS INSTANTLY — AI-POWERED NUTRITION ANALYSIS
          </div>
        </div>



        {/* CTA – bottom right, overlapping */}
        {/* <div className="hero-cta-bottom">
          <a href="#upload" className="cta-button">
            Upload Image
          </a>
          <p
            className="font-mono-editorial"
            style={{
              fontSize: "0.65rem",
              marginTop: "1rem",
              color: "var(--accent-red)",
            }}
          >
            <span className="red-paren">(</span> DRAG &amp; DROP SUPPORTED{" "}
            <span className="red-paren">)</span>
          </p>
        </div> */}

      </div>
    </section>
  );
}