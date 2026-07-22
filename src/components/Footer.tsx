"use client";

import Link from "next/link";

const footerLinks = {
  Products: ["Hang Tags", "Satin Labels", "Woven Labels", "PU Labels"],
  Services: ["Custom Design", "Foil Stamping", "Embossing", "Debossing", "UV Coating", "Lamination"],
  Company: ["About", "Capabilities", "Catalogue", "Testimonials", "Contact"],
};

export default function Footer() {
  return (
    <footer className="relative pt-16 pb-6" style={{ background: "var(--color-ink)", borderTop: "1px solid rgba(74,93,78,0.15)" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group">
              <img src="/TagXLogo.svg" alt="TagX" className="h-7 w-auto" />
              <span className="text-lg font-bold text-[var(--color-cream)]">TagX</span>
            </Link>
            <p className="text-sm text-[var(--color-cream)]/40 leading-relaxed max-w-sm">
              Premium garment accessories manufactured in-house in Ahmedabad, Gujarat. Serving clothing brands across India.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold tracking-[0.15em] text-[var(--color-cream)]/60 uppercase mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-[var(--color-cream)]/35 hover:text-[var(--color-copper-light)] transition-colors duration-300">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[var(--color-cream)]/8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-cream)]/25">&copy; {new Date().getFullYear()} TagX. All rights reserved.</p>
          <p className="text-xs text-[var(--color-cream)]/20">Ahmedabad, Gujarat, India</p>
        </div>
      </div>
    </footer>
  );
}
