"use client";

import { useInView } from "@/lib/useInView";
import DepthBlurCarousel from "./DepthBlurCarousel";

export default function ProductShowcase() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="products" className="relative py-28" style={{ background: "var(--color-cream)" }}>
      <div className="section-line-light mb-20" />
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-[11px] tracking-[0.15em] text-[var(--color-copper)] uppercase mb-5" style={{ opacity: inView ? 1 : 0, transition: "all 0.5s ease" }}>Our Work</span>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-5 text-[var(--color-ink)]" style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(15px)", transition: "all 0.6s ease 0.1s" }}>
            Crafted for <span className="copper-text">leading brands</span>.
          </h2>
          <p className="text-[var(--color-ink)]/40 max-w-lg mx-auto" style={{ opacity: inView ? 1 : 0, transition: "all 0.6s ease 0.2s" }}>
            Auto-scrolling showcase. Drag to explore.
          </p>
        </div>

        <div className="w-full" style={{ opacity: inView ? 1 : 0, transition: "all 0.8s ease 0.3s" }}>
          <DepthBlurCarousel />
        </div>
      </div>
    </section>
  );
}
