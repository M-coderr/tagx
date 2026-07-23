"use client";

import { useState, useEffect } from "react";

export default function Preloader() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2200),
      setTimeout(() => setPhase(4), 3400),
      setTimeout(() => setPhase(5), 4500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  if (phase >= 5) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        background: "#D8D3C9",
        opacity: phase >= 4 ? 0 : 1,
        transition: "opacity 1s ease",
        pointerEvents: phase >= 4 ? "none" : "auto",
      }}
    >
      {/* Background texture */}
      <div className="absolute inset-0" style={{
        backgroundImage: "radial-gradient(circle, rgba(74,93,78,0.12) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      <div className="relative" style={{ perspective: "900px" }}>
        <div
          className="relative w-52 h-72"
          style={{
            transformStyle: "preserve-3d",
            transform: phase >= 1 ? "rotateX(0deg) rotateY(0deg)" : "rotateX(-25deg) rotateY(15deg)",
            transition: "transform 1.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {/* Tag body - front */}
          <div
            className="absolute inset-0 rounded-xl overflow-hidden"
            style={{
              background: "linear-gradient(155deg, #f5f0e8, #ebe4d8, #e0d8ca)",
              boxShadow: phase >= 2
                ? "0 25px 70px rgba(0,0,0,0.15), 0 0 40px rgba(74,93,78,0.08), inset 0 1px 0 rgba(255,255,255,0.5)"
                : "0 5px 20px rgba(0,0,0,0.08)",
              transition: "box-shadow 1s ease 0.3s",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Paper texture */}
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.06' numOctaves='4' seed='5'/%3E%3FeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)'/%3E%3C/svg%3E\")",
              backgroundSize: "150px 150px",
            }} />

            {/* Top green border */}
            <div className="absolute top-0 left-0 right-0 h-[3px] copper-grad"
              style={{ opacity: phase >= 2 ? 1 : 0, transition: "opacity 0.6s ease 0.3s" }}
            />

            {/* Tag hole */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2">
              <div className="w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-[var(--color-copper)]/40"
                style={{
                  opacity: phase >= 2 ? 1 : 0,
                  transform: phase >= 2 ? "scale(1)" : "scale(0)",
                  transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s",
                  background: "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.4), transparent)",
                }}
              />
              <svg className="absolute -top-7 left-1/2 -translate-x-1/2 w-10 h-10" viewBox="0 0 36 36">
                <path d="M18,30 Q18,6 24,2" fill="none" stroke="var(--color-copper)" strokeWidth="1.2" strokeLinecap="round"
                  style={{ strokeDasharray: 35, strokeDashoffset: phase >= 2 ? 0 : 35, opacity: phase >= 2 ? 0.5 : 0, transition: "all 1s ease 0.4s" }}
                />
              </svg>
            </div>

            {/* Logo area */}
            <div className="absolute top-14 left-0 right-0 text-center"
              style={{ opacity: phase >= 3 ? 1 : 0, transform: phase >= 3 ? "translateY(0)" : "translateY(8px)", transition: "all 0.7s ease 0.4s" }}
            >
              <div className="inline-flex items-center gap-2">
                <div className="w-6 h-[1px] bg-[var(--color-copper)]/50" />
                <span className="text-sm font-bold text-[var(--color-ink)]/85">TagX</span>
                <div className="w-6 h-[1px] bg-[var(--color-copper)]/50" />
              </div>
              <p className="text-[7px] tracking-[0.2em] text-[var(--color-ink)]/40 uppercase mt-1">Premium Garment Trims</p>
            </div>

            {/* Diamond pattern */}
            <div className="absolute top-[72px] left-0 right-0 flex justify-center"
              style={{ opacity: phase >= 3 ? 1 : 0, transition: "opacity 0.6s ease 0.5s" }}
            >
              <svg width="80" height="12" viewBox="0 0 80 12">
                <path d="M0,6 L10,0 L20,6 L10,12 Z" fill="none" stroke="rgba(74,93,78,0.2)" strokeWidth="0.6" />
                <path d="M20,6 L30,0 L40,6 L30,12 Z" fill="none" stroke="rgba(74,93,78,0.15)" strokeWidth="0.6" />
                <path d="M40,6 L50,0 L60,6 L50,12 Z" fill="none" stroke="rgba(74,93,78,0.2)" strokeWidth="0.6" />
                <path d="M60,6 L70,0 L80,6 L70,12 Z" fill="none" stroke="rgba(74,93,78,0.15)" strokeWidth="0.6" />
                <circle cx="40" cy="6" r="2" fill="rgba(74,93,78,0.25)" />
              </svg>
            </div>

            {/* Content lines */}
            <div className="absolute top-[90px] left-7 right-7 space-y-3">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="h-[1px] rounded-full"
                  style={{
                    background: `linear-gradient(90deg, transparent, rgba(74,93,78,${0.12 + i * 0.02}), transparent)`,
                    width: i === 4 ? "55%" : i === 2 ? "90%" : "100%",
                    opacity: phase >= 3 ? 1 : 0,
                    transform: phase >= 3 ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                    transition: `all 0.7s ease ${0.5 + i * 0.1}s`,
                  }}
                />
              ))}
            </div>

            {/* Mini icons */}
            <div className="absolute top-[145px] left-7 right-7 flex justify-between"
              style={{ opacity: phase >= 3 ? 1 : 0, transition: "opacity 0.6s ease 0.7s" }}
            >
              <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
                <rect x="1" y="3" width="16" height="18" rx="2" stroke="rgba(74,93,78,0.2)" strokeWidth="0.8" />
                <circle cx="9" cy="7" r="1.5" stroke="rgba(74,93,78,0.2)" strokeWidth="0.6" />
                <line x1="4" y1="12" x2="14" y2="12" stroke="rgba(74,93,78,0.12)" strokeWidth="0.6" />
                <line x1="4" y1="15" x2="11" y2="15" stroke="rgba(74,93,78,0.1)" strokeWidth="0.6" />
              </svg>
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                <rect x="1" y="1" width="18" height="14" rx="2" stroke="rgba(74,93,78,0.2)" strokeWidth="0.8" />
                <line x1="4" y1="5" x2="16" y2="5" stroke="rgba(74,93,78,0.12)" strokeWidth="0.6" />
                <line x1="4" y1="8" x2="13" y2="8" stroke="rgba(74,93,78,0.1)" strokeWidth="0.6" />
                <line x1="4" y1="11" x2="10" y2="11" stroke="rgba(74,93,78,0.08)" strokeWidth="0.6" />
              </svg>
              <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
                <rect x="2" y="4" width="16" height="13" rx="1.5" stroke="rgba(74,93,78,0.2)" strokeWidth="0.8" />
                <path d="M2,8 L10,4 L18,8" stroke="rgba(74,93,78,0.15)" strokeWidth="0.6" fill="none" />
                <line x1="10" y1="8" x2="10" y2="17" stroke="rgba(74,93,78,0.1)" strokeWidth="0.6" />
              </svg>
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-7 left-7 right-7"
              style={{ opacity: phase >= 3 ? 1 : 0, transition: "opacity 0.6s ease 0.8s" }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[6px] tracking-[0.15em] text-[var(--color-copper)]/50 uppercase">Ahmedabad</p>
                  <p className="text-[6px] tracking-[0.2em] text-[var(--color-ink)]/30">Gujarat, India</p>
                </div>
                <div className="w-8 h-8 rounded-full border border-[var(--color-copper)]/20 flex items-center justify-center">
                  <span className="text-[8px] font-bold text-[var(--color-copper)]/55">TX</span>
                </div>
                <div className="text-right">
                  <p className="text-[6px] tracking-[0.15em] text-[var(--color-copper)]/50 uppercase">Since</p>
                  <p className="text-[6px] tracking-[0.2em] text-[var(--color-ink)]/30">2020</p>
                </div>
              </div>
            </div>

            {/* Bottom green accent */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px] copper-grad"
              style={{ opacity: phase >= 3 ? 1 : 0, transition: "opacity 0.6s ease 0.6s" }}
            />

            {/* Corner fold */}
            <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden"
              style={{ opacity: phase >= 2 ? 0.3 : 0, transition: "opacity 0.7s ease 0.3s" }}
            >
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#d4cfc5] rotate-45" />
            </div>
          </div>

          {/* Back face */}
          <div className="absolute inset-0 rounded-xl"
            style={{ background: "linear-gradient(145deg, #ebe4d8, #ddd5c8)", transform: "rotateY(180deg)", backfaceVisibility: "hidden", boxShadow: "0 25px 60px rgba(0,0,0,0.15)" }}
          >
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.06' numOctaves='4' seed='5'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)'/%3E%3C/svg%3E\")",
              backgroundSize: "150px 150px",
            }} />
          </div>

          {/* Fold shadow */}
          <div className="absolute inset-0 rounded-xl"
            style={{
              background: "linear-gradient(90deg, transparent 48%, rgba(0,0,0,0.04) 50%, transparent 52%)",
              opacity: phase >= 1 && phase < 2 ? 1 : 0,
              transition: "opacity 0.6s ease",
              backfaceVisibility: "hidden",
            }}
          />
        </div>

        {/* Brand text */}
        <div className="text-center mt-12"
          style={{ opacity: phase >= 3 ? 1 : 0, transform: phase >= 3 ? "translateY(0)" : "translateY(15px)", transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s" }}
        >
          <h1 className="text-3xl font-bold copper-text">TagX</h1>
          <p className="text-[10px] tracking-[0.2em] text-[var(--color-ink)]/30 uppercase mt-2">Premium Garment Trims</p>
        </div>
      </div>

      {/* Progress line */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-24">
        <div className="h-[1px] w-full bg-[var(--color-copper)]/10 overflow-hidden rounded-full">
          <div className="h-full copper-grad rounded-full"
            style={{ width: `${Math.min((phase / 4) * 100, 100)}%`, transition: "width 0.8s ease" }}
          />
        </div>
      </div>

      {/* Floating dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 rounded-full bg-[var(--color-copper)]"
            style={{
              top: `${15 + i * 12}%`, left: `${10 + i * 14}%`,
              opacity: phase >= 1 ? 0.12 : 0,
              animation: phase >= 1 ? `float ${3 + i * 0.5}s ease-in-out infinite ${i * 0.2}s` : "none",
              transition: "opacity 1.2s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
