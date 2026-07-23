"use client";

import { useInView } from "@/lib/useInView";

const products = [
  {
    name: "Hang Tags",
    desc: "Kraft, Art Board, Embossed, Foil stamped",
    bg: "#8C8275",
    textColor: "#1E3A28",
    tilt: "rotateY(-10deg) rotateX(5deg) translateZ(20px)",
    shadow: "12px 16px 35px rgba(0,0,0,0.25), 4px 6px 12px rgba(0,0,0,0.15)",
  },
  {
    name: "Satin Labels",
    desc: "Printed, Woven, Folded, Cut-edge",
    bg: "#D4845A",
    textColor: "#FFF8F0",
    tilt: "rotateY(10deg) rotateX(5deg) translateZ(20px)",
    shadow: "-12px 16px 35px rgba(0,0,0,0.25), -4px 6px 12px rgba(0,0,0,0.15)",
  },
  {
    name: "Woven Labels",
    desc: "Damask, Satin, Printed, Folded",
    bg: "#5B3A8C",
    textColor: "#F4F0EA",
    tilt: "rotateY(8deg) rotateX(4deg) translateZ(25px)",
    shadow: "-10px 14px 30px rgba(0,0,0,0.25), -3px 5px 10px rgba(0,0,0,0.15)",
  },
  {
    name: "PU Labels",
    desc: "Rubber, Debossed, Embossed, Silicone",
    bg: "#1E3A28",
    textColor: "#F4F0EA",
    tilt: "rotateY(-6deg) rotateX(6deg) translateZ(15px)",
    shadow: "8px 18px 32px rgba(0,0,0,0.3), 2px 4px 10px rgba(0,0,0,0.18)",
  },
];

function LabelTag({ product, index, inView }: { product: typeof products[0]; index: number; inView: boolean }) {
  return (
    <div
      className="group relative cursor-default"
      style={{
        perspective: "900px",
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(25px)",
        transition: `all 0.7s ease ${0.2 + index * 0.1}s`,
      }}
    >
      <div
        className="relative transition-transform duration-500"
        style={{
          transform: product.tilt,
          transformStyle: "preserve-3d",
        }}
      >
        {/* String / Rope */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[1.5px] h-8 bg-gradient-to-b from-[#8C8275]/20 to-[#8C8275]/60 z-10" />
        {/* Hole / Eyelet */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-[#8C8275]/50 bg-[var(--color-cream)] shadow-sm z-10" />
        <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#8C8275]/30 z-10" />

        {/* Label card */}
        <div
          className="relative rounded-xl overflow-hidden"
          style={{
            background: product.bg,
            boxShadow: product.shadow,
          }}
        >
          {/* Texture overlay */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.06) 2px, rgba(255,255,255,0.06) 3px),
              repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.06) 2px, rgba(255,255,255,0.06) 3px)
            `,
          }} />

          {/* Content */}
          <div className="p-6 md:p-8 text-center">
            <h3
              className="text-xl md:text-2xl font-bold mb-2"
              style={{ color: product.textColor }}
            >
              {product.name}
            </h3>
            <p
              className="text-xs md:text-sm opacity-60"
              style={{ color: product.textColor }}
            >
              {product.desc}
            </p>
          </div>

          {/* Bottom stitch line */}
          <div className="mx-4 mb-4 border-b border-dashed" style={{ borderColor: `${product.textColor}25` }} />

          {/* Reflection */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.05) 100%)",
          }} />
        </div>
      </div>
    </div>
  );
}

export default function WhatWeManufacture() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="manufacture" className="relative py-24 md:py-28" style={{ background: "var(--color-cream)" }}>
      <div className="section-line-light mb-20" />
      <div ref={ref} className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-[11px] tracking-[0.15em] text-[var(--color-copper)] uppercase mb-5" style={{ opacity: inView ? 1 : 0, transition: "all 0.5s ease" }}>
            What We Make
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-5 text-[var(--color-ink)]" style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(15px)", transition: "all 0.6s ease 0.1s" }}>
            What we <span className="copper-text">manufacture</span>.
          </h2>
          <p className="text-[var(--color-ink)]/50 max-w-lg mx-auto" style={{ opacity: inView ? 1 : 0, transition: "all 0.6s ease 0.2s" }}>
            Premium garment accessories crafted in-house for clothing brands across India.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {products.map((p, i) => (
            <LabelTag key={p.name} product={p} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
