"use client";

import InteractiveDots from "./InteractiveDots";

const words = ["Hang Tags", "Woven Labels", "PU Labels", "Satin Labels", "Premium Finishes", "Custom Design", "Foil Stamping", "Embossing", "Debossing"];

export default function MarqueeText() {
  return (
    <section className="relative py-14 overflow-hidden" style={{ background: "var(--color-cream-dark)" }}>
      <InteractiveDots opacity={0.08} />
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--color-cream-dark)] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--color-cream-dark)] to-transparent z-10" />
      <div className="flex overflow-hidden relative z-10">
        <div className="flex items-center gap-10 shrink-0" style={{ animation: "marquee 35s linear infinite" }}>
          {[...words, ...words].map((word, i) => (
            <span key={`${word}-${i}`} className="flex items-center gap-10 whitespace-nowrap">
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-ink)]/15 select-none transition-colors duration-500 hover:text-[var(--color-ink)]/25">
                {word}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-copper)]/30" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
