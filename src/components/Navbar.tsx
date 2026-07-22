"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import MagneticButton from "./MagneticButton";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Catalogue", href: "#products" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-[var(--color-cream)]/80 backdrop-blur-xl py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <img src="/TagXLogo.svg" alt="TagX" className="h-10 w-auto transition-transform duration-300 group-hover:scale-105" />
            <span className="text-xl font-bold text-[var(--color-ink)]">Tag<span className="copper-text" style={{ filter: "drop-shadow(0 0 10px rgba(58,130,80,0.5))" }}>X</span></span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="relative text-sm text-[var(--color-ink)]/50 hover:text-[var(--color-ink)] transition-colors duration-300 py-1 group">
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--color-copper)] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <MagneticButton href="#contact" className="px-5 py-2.5 text-sm font-semibold text-[var(--color-cream)] copper-grad rounded-full hover:shadow-[0_0_25px_rgba(74,93,78,0.25)]">
              Get a Quote
            </MagneticButton>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-[var(--color-ink)]">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden bg-[var(--color-cream)]/95 backdrop-blur-xl border-t border-[var(--color-copper)]/10 px-5 py-6 space-y-4">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block text-sm text-[var(--color-ink)]/60 hover:text-[var(--color-ink)] transition-colors">
                {link.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMobileOpen(false)} className="inline-block px-5 py-2.5 text-sm font-semibold text-[var(--color-cream)] copper-grad rounded-full">
              Get a Quote
            </a>
          </div>
        )}
      </nav>
    </>
  );
}
