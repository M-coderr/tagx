"use client";

import { useInView } from "@/lib/useInView";
import { useEffect, useState } from "react";
import InteractiveDots from "./InteractiveDots";

const stats = [
  { value: 700, suffix: "+", label: "Brands Served", desc: "Across India" },
  { value: 10000, suffix: "+", label: "Orders Delivered", desc: "On time, every time" },
  { value: 48, suffix: "Hrs", label: "Sample Turnaround", desc: "From design to sample" },
  { value: 500, suffix: " pcs", label: "Minimum Order", desc: "Low MOQ for startups" },
];

function Counter({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const duration = 2000;
    const steps = 60;
    const inc = target / steps;
    let cur = 0;
    const t = setInterval(() => {
      cur += inc;
      if (cur >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(cur));
    }, duration / steps);
    return () => clearInterval(t);
  }, [active, target]);
  return <span className="tabular-nums">{count.toLocaleString()}{suffix}</span>;
}

export default function Stats() {
  const [ref, inView] = useInView(0.2);

  return (
    <section className="relative py-20 md:py-24 overflow-hidden" style={{ background: "var(--color-cream)" }}>
      <InteractiveDots opacity={0.12} />
      <div className="section-line-light mb-20 relative z-10" />
      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center group"
              style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)", transition: `all 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.12}s` }}
            >
              <div className="relative inline-block">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold copper-text mb-3">
                  <Counter target={stat.value} suffix={stat.suffix} active={inView} />
                </div>
                <div className="w-8 h-[1px] bg-[var(--color-copper)]/30 mx-auto mb-4 group-hover:w-14 transition-all duration-500" />
                <p className="text-sm md:text-base font-semibold text-[var(--color-ink)] mb-1">{stat.label}</p>
                <p className="text-xs text-[var(--color-ink)]/40">{stat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="section-line-light mt-20" />
    </section>
  );
}
