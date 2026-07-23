"use client";

import { useInView } from "@/lib/useInView";
import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import InteractiveDots from "./InteractiveDots";

const productOptions = ["Hang Tags", "Satin Labels", "Woven Labels", "PU Labels", "Other"];

export default function Contact() {
  const [ref, inView] = useInView(0.1);
  const [formData, setFormData] = useState({ name: "", company: "", email: "", phone: "", city: "", product: "", details: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("https://formspree.io/f/maqzrzrr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          product: formData.product,
          details: formData.details,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch {
      // silently fail
    }
    setSubmitting(false);
  };

  return (
    <section id="contact" className="relative py-28 overflow-hidden" style={{ background: "var(--color-cream)" }}>
      <InteractiveDots opacity={0.12} />
      <div className="section-line-light mb-20 relative z-10" />
      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-[11px] tracking-[0.15em] text-[var(--color-copper)] uppercase mb-5" style={{ opacity: inView ? 1 : 0, transition: "all 0.5s ease" }}>Get in Touch</span>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-5 text-[var(--color-ink)]" style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(15px)", transition: "all 0.6s ease 0.1s" }}>
            Get a quote in <span className="copper-text">24 hours</span>.
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-4" style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "all 0.6s ease 0.2s" }}>
            <a href="tel:+917203952969" className="flex items-center gap-4 p-4 rounded-xl card-light group">
              <div className="w-11 h-11 rounded-lg bg-[var(--color-copper)]/10 flex items-center justify-center group-hover:bg-[var(--color-copper)]/15 transition-colors shrink-0">
                <Phone className="w-4.5 h-4.5 text-[var(--color-copper)]" />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] text-[var(--color-ink)]/30 uppercase mb-0.5">Phone</p>
                <p className="text-sm text-[var(--color-ink)] font-medium">+91 72039 52969</p>
              </div>
            </a>
            <a href="mailto:info@tagx.co.in" className="flex items-center gap-4 p-4 rounded-xl card-light hover-lift hover-glow-copper group">
              <div className="w-11 h-11 rounded-lg bg-[var(--color-copper)]/10 flex items-center justify-center group-hover:bg-[var(--color-copper)]/15 transition-colors shrink-0">
                <Mail className="w-4.5 h-4.5 text-[var(--color-copper)]" />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] text-[var(--color-ink)]/30 uppercase mb-0.5">Email</p>
                <p className="text-sm text-[var(--color-ink)] font-medium">info@tagx.co.in</p>
              </div>
            </a>
            <div className="flex items-center gap-4 p-4 rounded-xl card-light">
              <div className="w-11 h-11 rounded-lg bg-[var(--color-copper)]/10 flex items-center justify-center shrink-0">
                <MapPin className="w-4.5 h-4.5 text-[var(--color-copper)]" />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] text-[var(--color-ink)]/30 uppercase mb-0.5">Location</p>
                <p className="text-sm text-[var(--color-ink)] font-medium">Ahmedabad, Gujarat, India</p>
              </div>
            </div>
            <a href="https://wa.me/917203952969" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full px-5 py-3.5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/20 transition-all duration-300 mt-2">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Chat on WhatsApp</span>
            </a>
          </div>

          <div className="lg:col-span-3" style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "all 0.6s ease 0.3s" }}>
            {submitted ? (
              <div className="h-full flex items-center justify-center p-10 rounded-2xl card-light">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full copper-grad flex items-center justify-center mx-auto mb-5">
                    <Send className="w-6 h-6 text-[var(--color-cream)]" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--color-ink)] mb-2">Thank you!</h3>
                  <p className="text-[var(--color-ink)]/50">We will get back to you within 24 hours.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-7 rounded-2xl card-light space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] text-[var(--color-ink)]/30 uppercase mb-1.5">Full Name *</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-ink)]/8 rounded-xl text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink)]/25 focus:outline-none focus:border-[var(--color-copper)]/40 focus:ring-1 focus:ring-[var(--color-copper)]/20 transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] text-[var(--color-ink)]/30 uppercase mb-1.5">Company *</label>
                    <input type="text" required value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-ink)]/8 rounded-xl text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink)]/25 focus:outline-none focus:border-[var(--color-copper)]/40 focus:ring-1 focus:ring-[var(--color-copper)]/20 transition-all" placeholder="Your Brand" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] text-[var(--color-ink)]/30 uppercase mb-1.5">Phone</label>
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-ink)]/8 rounded-xl text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink)]/25 focus:outline-none focus:border-[var(--color-copper)]/40 focus:ring-1 focus:ring-[var(--color-copper)]/20 transition-all" placeholder="+91 00000 00000" />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] text-[var(--color-ink)]/30 uppercase mb-1.5">City</label>
                    <input type="text" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-ink)]/8 rounded-xl text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink)]/25 focus:outline-none focus:border-[var(--color-copper)]/40 focus:ring-1 focus:ring-[var(--color-copper)]/20 transition-all" placeholder="Pan India" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.2em] text-[var(--color-ink)]/30 uppercase mb-1.5">Product Required *</label>
                  <select required value={formData.product} onChange={(e) => setFormData({ ...formData, product: e.target.value })} className="w-full px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-ink)]/8 rounded-xl text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-copper)]/40 focus:ring-1 focus:ring-[var(--color-copper)]/20 transition-all appearance-none cursor-pointer">
                    <option value="">Select a product</option>
                    {productOptions.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.2em] text-[var(--color-ink)]/30 uppercase mb-1.5">Order Details</label>
                  <textarea rows={4} value={formData.details} onChange={(e) => setFormData({ ...formData, details: e.target.value })} className="w-full px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-ink)]/8 rounded-xl text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink)]/25 focus:outline-none focus:border-[var(--color-copper)]/40 focus:ring-1 focus:ring-[var(--color-copper)]/20 transition-all resize-none" placeholder="Quantity, size, finish, design preferences..." />
                </div>
                <button type="submit" disabled={submitting} className="w-full py-3.5 rounded-xl copper-grad text-[var(--color-cream)] font-semibold text-sm hover:shadow-[0_0_25px_rgba(74,93,78,0.3)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? "Sending..." : "Request a Quote"} <Send className="w-4 h-4" />
                </button>
                <p className="text-center text-[11px] text-[var(--color-ink)]/30">We typically respond within one business day.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
