"use client";

import { useInView } from "@/lib/useInView";
import { Gem, Layers, Settings, Shield, Truck, Headphones } from "lucide-react";
import TiltCard from "./TiltCard";

const reasons = [
  { icon: Gem, title: "Luxury Finishes", description: "Foil Stamping, Embossing, Debossing, UV Coating, and Lamination." },
  { icon: Layers, title: "Complete In-House", description: "Full manufacturing under one roof — no outsourcing." },
  { icon: Settings, title: "Fully Customized", description: "Custom sizes, shapes, materials, and designs for your brand." },
  { icon: Shield, title: "Consistent Quality", description: "Rigorous quality checks at every production stage." },
  { icon: Truck, title: "Pan India Delivery", description: "Reliable logistics ensuring timely delivery nationwide." },
  { icon: Headphones, title: "Dedicated Support", description: "Personal account managers for seamless communication." },
];

export default function WhyChoose() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="capabilities" className="relative py-24 md:py-28 overflow-hidden" style={{ background: "var(--color-cream)" }}>
      <div className="section-line-light mb-16" />
      <div className="max-w-7xl mx-auto px-5 md:px-6 relative z-10" ref={ref}>
        <div className="text-center mb-16">
          <span className="inline-block text-[11px] tracking-[0.15em] text-[var(--color-copper)] uppercase mb-5" style={{ opacity: inView ? 1 : 0, transition: "all 0.5s ease" }}>Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[var(--color-ink)]" style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(15px)", transition: "all 0.6s ease 0.1s" }}>
            Every detail, <span className="copper-text">perfected</span>.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r, i) => (
            <TiltCard key={r.title} className="rounded-2xl">
              <div className="relative p-7 rounded-2xl card-light overflow-hidden h-full" style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: `all 0.6s ease ${0.1 + i * 0.08}s` }}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(74,93,78,0.06),transparent)]" />
                <div className="relative z-10">
                  <div className="w-11 h-11 rounded-xl bg-[var(--color-copper)]/10 flex items-center justify-center mb-5 group-hover:bg-[var(--color-copper)]/15 transition-colors duration-300">
                    <r.icon className="w-5 h-5 text-[var(--color-copper)]" />
                  </div>
                  <h3 className="text-base font-semibold text-[var(--color-ink)] mb-2">{r.title}</h3>
                  <p className="text-sm text-[var(--color-ink)]/45 leading-relaxed">{r.description}</p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
