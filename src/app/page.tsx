"use client";

import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeText from "@/components/MarqueeText";
import Stats from "@/components/Stats";
import WhyChoose from "@/components/WhyChoose";
import ProductShowcase from "@/components/ProductShowcase";
import ProductFeatures from "@/components/ProductFeatures";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";

export default function Home() {
  return (
    <>
      <Preloader />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <MarqueeText />
        <Stats />
        <ProductFeatures />
        <WhyChoose />
        <ProductShowcase />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
