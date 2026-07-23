"use client";

import { useInView } from "@/lib/useInView";
import { MessageSquare, Palette, FlaskConical, Package, Truck } from "lucide-react";

const steps = [
  { icon: MessageSquare, step: "01", title: "Share Your Brief", description: "Tell us your product, quantity, design preferences, and finish requirements." },
  { icon: Palette, step: "02", title: "Design & Approve", description: "Our team creates digital proofs. Approve or request changes until perfect." },
  { icon: FlaskConical, step: "03", title: "Sample in 48 Hours", description: "Receive a physical sample within 48 hours for quality verification." },
  { icon: Package, step: "04", title: "Manufacture", description: "Full production begins with quality checks at every stage." },
  { icon: Truck, step: "05", title: "Pan India Delivery", description: "Your order ships via reliable logistics nationwide." },
];

export default function Process() {
  const [ref, inView] = useInView(0.1);

  return (
    <section className="relative py-24 md:py-28 overflow-hidden" style={{ background: "var(--color-cream-dark)" }}>
      <div className="section-line-light mb-16" />
      <div ref={ref} className="max-w-7xl mx-auto px-5 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-[11px] tracking-[0.15em] text-[var(--color-copper)] uppercase mb-5" style={{ opacity: inView ? 1 : 0, transition: "all 0.5s ease" }}>How It Works</span>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[var(--color-ink)]" style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(15px)", transition: "all 0.6s ease 0.1s" }}>
            From concept to <span className="copper-text">delivery</span>.
          </h2>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-[42px] left-[12%] right-[12%] h-[1px] bg-gradient-to-r from-transparent via-[var(--color-copper)]/15 to-transparent" />
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-6">
            {steps.map((step, i) => (
              <div key={step.step} className="text-center group" style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: `all 0.6s ease ${0.2 + i * 0.1}s` }}>
                <div className="relative inline-block mb-5">
                  <div className="w-14 h-14 rounded-2xl card-light flex items-center justify-center mx-auto group-hover:border-[var(--color-copper)]/30 group-hover:shadow-[0_0_20px_rgba(74,93,78,0.08)] transition-all duration-300">
                    <step.icon className="w-4 h-4 md:w-5 md:h-5 text-[var(--color-copper)]" />
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 md:w-5 md:h-5 rounded-full copper-grad flex items-center justify-center text-[9px] font-bold text-[var(--color-cream)]">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-[var(--color-ink)] mb-1.5">{step.title}</h3>
                <p className="text-xs text-[var(--color-ink)]/40 leading-relaxed max-w-[180px] mx-auto">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
