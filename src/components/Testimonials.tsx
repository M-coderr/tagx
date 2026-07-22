"use client";

import { useInView } from "@/lib/useInView";
import { Quote } from "lucide-react";
import TiltCard from "./TiltCard";

const testimonials = [
  { quote: "Clear communication from quote to delivery. The hang tags elevated our entire product presentation. TagX understands premium branding.", author: "Chandan Singh", role: "Founder", company: "Maharaja Creation" },
  { quote: "TagX has become our go-to for all trims. The woven labels are consistently perfect — high density, crisp detail, every time.", author: "Nirmal Kumar", role: "Managing Director", company: "Saratha Export" },
  { quote: "PU labels held up perfectly through wash testing. The quality and durability are exactly what our activewear line demanded.", author: "Samved", role: "Operations Head", company: "Adinath Exports" },
];

export default function Testimonials() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="testimonials" className="relative py-24 md:py-28" style={{ background: "var(--color-cream-dark)" }}>
      <div className="section-line-light mb-16" />
      <div ref={ref} className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-[11px] tracking-[0.15em] text-[var(--color-copper)] uppercase mb-5" style={{ opacity: inView ? 1 : 0, transition: "all 0.5s ease" }}>Testimonials</span>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[var(--color-ink)]" style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(15px)", transition: "all 0.6s ease 0.1s" }}>
            Trusted by <span className="copper-text">brands</span>.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TiltCard key={t.author} className="rounded-2xl">
              <div className="p-7 rounded-2xl card-light" style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: `all 0.6s ease ${0.1 + i * 0.1}s` }}>
                <Quote className="w-8 h-8 text-[var(--color-copper)]/20 mb-4 transition-colors duration-300" />
                <p className="text-[var(--color-ink)]/60 text-sm leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-ink)]">{t.author}</p>
                  <p className="text-xs text-[var(--color-ink)]/40">{t.role}, {t.company}</p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
