"use client";

import { useInView } from "@/lib/useInView";
import { Download, FileText, Package, Scissors } from "lucide-react";

const catalogues = [
  { icon: FileText, title: "Hang Tags Catalogue", description: "Complete range of die-cut tags, materials, and finishes.", pages: "24 Pages" },
  { icon: Package, title: "Labels Collection", description: "Satin, woven, and PU label options with customization guide.", pages: "18 Pages" },
  { icon: Scissors, title: "Finishes & Materials", description: "Foil, emboss, deboss, UV coating samples and specifications.", pages: "12 Pages" },
];

export default function Catalogue() {
  const [ref, inView] = useInView(0.1);

  return (
    <section className="relative py-24 lg:py-28" style={{ background: "var(--color-cream)" }}>
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-[11px] tracking-[0.15em] text-[var(--color-copper)] uppercase mb-5" style={{ opacity: inView ? 1 : 0, transition: "all 0.5s ease" }}>Catalogue</span>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-5 text-[var(--color-ink)]" style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(15px)", transition: "all 0.6s ease 0.1s" }}>
            Explore our <span className="copper-text">collection</span>.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {catalogues.map((cat, i) => (
            <div key={cat.title} className="p-7 rounded-2xl card-light hover-lift hover-glow-copper group" style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: `all 0.6s ease ${0.2 + i * 0.1}s` }}>
              <div className="w-12 h-12 rounded-xl bg-[var(--color-copper)]/10 flex items-center justify-center mb-5 group-hover:bg-[var(--color-copper)]/15 transition-colors">
                <cat.icon className="w-5 h-5 text-[var(--color-copper)]" />
              </div>
              <h3 className="text-base font-semibold text-[var(--color-ink)] mb-2">{cat.title}</h3>
              <p className="text-sm text-[var(--color-ink)]/40 leading-relaxed mb-5">{cat.description}</p>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs text-[var(--color-ink)]/30">{cat.pages}</span>
                <span className="w-1 h-1 rounded-full bg-[var(--color-ink)]/20" />
                <span className="text-xs text-[var(--color-ink)]/30">PDF</span>
              </div>
              <button className="w-full py-3 rounded-xl border border-[var(--color-copper)]/20 text-[var(--color-copper)] text-sm font-medium flex items-center justify-center gap-2 group-hover:bg-[var(--color-copper)]/8 transition-all duration-300">
                <Download className="w-4 h-4" />
                Download Catalogue
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center" style={{ opacity: inView ? 1 : 0, transition: "all 0.6s ease 0.5s" }}>
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full card-light">
            <span className="w-2 h-2 rounded-full bg-[var(--color-copper)]" style={{ animation: "pulse-soft 2s ease infinite" }} />
            <span className="text-xs text-[var(--color-ink)]/50">
              MOQ: <span className="text-[var(--color-copper)] font-medium">500 pcs</span> &middot; Free samples on request
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
