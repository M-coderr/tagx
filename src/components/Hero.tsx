"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, FileText, ChevronDown } from "lucide-react";
import LabelStack from "./LabelStack";
import MagneticButton from "./MagneticButton";

const rotatingWords = ["Hang Tags", "Woven Labels", "PU Labels", "Satin Labels"];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    const interval = setInterval(() => setWordIndex((p) => (p + 1) % rotatingWords.length), 2500);
    return () => { clearTimeout(t); clearInterval(interval); };
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    let rafId: number;
    let mx = 0;
    let my = 0;
    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      mx = (e.clientX - rect.left - rect.width / 2) / rect.width;
      my = (e.clientY - rect.top - rect.height / 2) / rect.height;
    };
    const tick = () => {
      if (dotsRef.current) {
        dotsRef.current.style.transform = `translate(${mx * -12}px, ${my * -12}px)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(rafId); };
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0" style={{ background: "var(--color-cream)" }}>
      {/* Visible dot grid texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(74,93,78,0.18) 1.2px, transparent 1.2px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Parallax dot layer */}
      <div
        ref={dotsRef}
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(74,93,78,0.1) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          willChange: "transform",
          transition: "transform 1s ease-out",
        }}
      />
      {/* Subtle green glow */}
      <div className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full pointer-events-none left-[25%] top-[35%] -translate-x-1/2 -translate-y-1/2"
        style={{ background: "radial-gradient(circle, rgba(74,93,78,0.12) 0%, transparent 60%)" }}
      />
      {/* Green glow behind heading */}
      <div className="absolute w-[500px] h-[300px] md:w-[700px] md:h-[400px] pointer-events-none left-[10%] top-[30%] -translate-x-1/2 -translate-y-1/2"
        style={{ background: "radial-gradient(ellipse, rgba(74,93,78,0.15) 0%, transparent 65%)", filter: "blur(40px)" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 pt-24 pb-16 md:pt-0 md:pb-0 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        {/* Left: Text */}
        <div className="flex-1 lg:flex-[1.2] text-center lg:text-left">
          {/* Main heading */}
          <div className={`mb-5 md:mb-6 transition-all duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "2.2s" }}>
            <div className="overflow-hidden">
              <div style={{ transform: loaded ? "translateY(0)" : "translateY(100%)", transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 2.2s" }}>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-[1.2] tracking-tight text-[var(--color-ink)] whitespace-nowrap">
                  Tags that hang right.
                </h1>
              </div>
            </div>
            <div className="overflow-hidden mt-0">
              <div style={{ transform: loaded ? "translateY(0)" : "translateY(100%)", transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 2.4s" }}>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-[1.2] tracking-tight text-[var(--color-ink)] whitespace-nowrap">
                  Labels that <span className="copper-text" style={{ filter: "drop-shadow(0 0 12px rgba(58,130,80,0.4)) drop-shadow(0 0 24px rgba(58,130,80,0.2))" }}>stay on</span>.
                </h1>
              </div>
            </div>
          </div>

          {/* Rotating word */}
          <div className={`mb-5 md:mb-8 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "2.8s" }}>
            <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2 md:py-2.5 rounded-full glass-light">
              <span className="text-[10px] md:text-[11px] text-[var(--color-ink)]/40 uppercase tracking-[0.15em]">We make</span>
              <div className="relative h-5 overflow-hidden min-w-[120px] md:min-w-[140px]">
                {rotatingWords.map((word, i) => (
                  <span
                    key={word}
                    className="absolute inset-0 flex items-center text-xs md:text-sm font-medium text-[var(--color-copper)] whitespace-nowrap"
                    style={{
                      opacity: i === wordIndex ? 1 : 0,
                      transform: i === wordIndex ? "translateY(0)" : "translateY(20px)",
                      transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className={`max-w-lg mx-auto lg:mx-0 text-base md:text-lg text-[var(--color-ink)]/50 leading-relaxed mb-8 md:mb-12 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "2.9s" }}>
            Premium garment trims manufactured in-house with luxury finishes for clothing brands across India.
          </p>

          {/* CTAs */}
          <div className={`flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 md:gap-4 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "3s" }}>
            <MagneticButton href="#contact" className="group flex items-center gap-3 px-7 md:px-8 py-3.5 md:py-4 text-sm md:text-base font-semibold text-[var(--color-cream)] copper-grad rounded-full hover:shadow-[0_0_40px_rgba(74,93,78,0.25)] duration-300">
              Request a Quote
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </MagneticButton>
            <MagneticButton href="#products" className="group flex items-center gap-3 px-7 md:px-8 py-3.5 md:py-4 text-sm md:text-base font-medium text-[var(--color-ink)]/70 border border-[var(--color-ink)]/10 rounded-full hover:border-[var(--color-copper)]/30 hover:bg-[var(--color-copper)]/5 duration-300">
              <FileText className="w-4 h-4" />
              View Catalogue
            </MagneticButton>
          </div>
        </div>

        {/* Right: Label Stack */}
        <div className="flex-1 lg:flex-[0.8] flex justify-center lg:justify-end mt-4 md:mt-0">
          <LabelStack />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 ${loaded ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "3.5s" }}>
        <span className="text-[9px] md:text-[10px] tracking-[0.15em] text-[var(--color-ink)]/25 uppercase">Scroll</span>
        <div style={{ animation: "float 2s ease-in-out infinite" }}>
          <ChevronDown className="w-4 h-4 text-[var(--color-copper)]/60" />
        </div>
      </div>
    </section>
  );
}
