"use client";

const brands = ["Klass 7", "Madmonkey", "Oddy Boy", "Smoke", "Urban Loft", "Street Culture", "Noir Studio", "Vibe Co.", "Thread Republic", "Bold Label", "Raw Denim Co.", "Cotton House"];

export default function ClientMarquee() {
  return (
    <section className="relative py-16 overflow-hidden" style={{ background: "var(--color-cream)" }}>
      <p className="text-center text-[10px] tracking-[0.2em] text-[var(--color-ink)]/25 uppercase mb-8">
        Trusted by leading apparel brands
      </p>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--color-cream)] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--color-cream)] to-transparent z-10" />
        <div className="flex overflow-hidden">
          <div className="flex gap-10 shrink-0" style={{ animation: "marquee 50s linear infinite" }}>
            {[...brands, ...brands].map((brand, i) => (
              <span key={`${brand}-${i}`} className="flex items-center gap-10 whitespace-nowrap">
                <span className="text-lg font-semibold text-[var(--color-ink)]/[0.12] select-none hover:text-[var(--color-ink)]/[0.25] transition-colors duration-500">{brand}</span>
                <span className="w-1 h-1 rounded-full bg-[var(--color-copper)]/15" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
