"use client";

import { useInView } from "@/lib/useInView";
import MagneticButton from "./MagneticButton";

export default function About() {
  const [ref, inView] = useInView(0.15);

  return (
    <section id="about" className="relative py-28" style={{ background: "var(--color-cream)" }}>
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight mb-7 text-[var(--color-ink)]" style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(15px)", transition: "all 0.6s ease 0.1s" }}>
              Built for brands that care about <span className="copper-text">every detail</span>.
            </h2>
            <p className="text-[var(--color-ink)]/60 text-lg leading-relaxed mb-5" style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(15px)", transition: "all 0.6s ease 0.2s" }}>
              TagX began with a simple vision: provide apparel brands with premium trims that elevate every product presentation.
            </p>
            <p className="text-[var(--color-ink)]/40 leading-relaxed mb-8" style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(15px)", transition: "all 0.6s ease 0.25s" }}>
              Every product — Hang Tags, Woven Labels, Satin Labels — is manufactured under one roof in Ahmedabad, Gujarat. We serve apparel brands, garment manufacturers, wholesalers, exporters, and startup fashion labels across India.
            </p>
            <div className="flex items-center gap-6" style={{ opacity: inView ? 1 : 0, transition: "all 0.6s ease 0.3s" }}>
              <MagneticButton href="#contact" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[var(--color-cream)] copper-grad rounded-full hover:shadow-[0_0_25px_rgba(74,93,78,0.3)] duration-300">
                Start a Conversation
              </MagneticButton>
              <a href="#products" className="text-sm text-[var(--color-copper)] hover:text-[var(--color-copper-light)] transition-colors group inline-flex items-center gap-1 font-medium">
                View Our Work
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center" style={{ perspective: "800px", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "all 0.7s ease 0.3s" }}>
            <div style={{ transform: "rotateY(-14deg) rotateX(8deg) translateZ(50px)", transformStyle: "preserve-3d" }}>
              <img src="/tag1.jpeg" alt="TagX Hang Tag" className="w-[22rem] md:w-[36rem] h-[30rem] md:h-[42rem] object-contain" style={{ filter: "drop-shadow(20px 25px 50px rgba(0,0,0,0.4)) drop-shadow(8px 12px 20px rgba(0,0,0,0.3)) drop-shadow(0px 4px 8px rgba(0,0,0,0.2))" }} loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
