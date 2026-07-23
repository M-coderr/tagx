"use client";

import { useState, useCallback } from "react";
import { useInView } from "@/lib/useInView";

const products = [
  {
    name: "Hang Tags",
    description: "Custom die-cut paper tags with premium finishes for clothing and fashion brands.",
    features: ["Kraft", "Art Board", "Recycled Stock", "Foil Finish", "Die Cut"],
    bg: "#6B5D4E",
    textColor: "#FFF8F0",
    texture: "kraft",
  },
  {
    name: "Satin Labels",
    description: "Soft printed labels for inner garments, care instructions, and brand placement.",
    features: ["Soft Touch", "Printed", "Care Labels", "Size Labels", "Branding"],
    bg: "#B85C35",
    textColor: "#FFF8F0",
    texture: "satin",
  },
  {
    name: "Woven Labels",
    description: "High-density woven fabric labels with intricate detail and durability.",
    features: ["Damask", "High Thread Density", "Jacquard", "Color Matched"],
    bg: "#5B3A8C",
    textColor: "#F4F0EA",
    texture: "woven",
  },
  {
    name: "PU Labels",
    description: "Durable polyurethane labels for sportswear, denim, and outerwear.",
    features: ["Durable", "Flexible", "Waterproof", "Custom Shapes"],
    bg: "#1E3A28",
    textColor: "#F4F0EA",
    texture: "pu",
  },
];

function getTextureStyle(texture: string): React.CSSProperties {
  switch (texture) {
    case "kraft":
      return {
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(60,40,15,0.12) 1px, rgba(60,40,15,0.12) 2px),
          repeating-linear-gradient(90deg, transparent, transparent 1.5px, rgba(60,40,15,0.09) 1.5px, rgba(60,40,15,0.09) 2.5px),
          repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(50,30,10,0.06) 5px, rgba(50,30,10,0.06) 6px),
          repeating-linear-gradient(90deg, transparent, transparent 7px, rgba(50,30,10,0.04) 7px, rgba(50,30,10,0.04) 8px),
          repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(80,50,20,0.03) 3px, rgba(80,50,20,0.03) 3.5px),
          repeating-linear-gradient(-30deg, transparent, transparent 4px, rgba(70,45,15,0.025) 4px, rgba(70,45,15,0.025) 4.5px),
          radial-gradient(ellipse at 15% 85%, rgba(100,70,25,0.35) 0%, transparent 40%),
          radial-gradient(ellipse at 85% 15%, rgba(140,100,45,0.25) 0%, transparent 45%),
          radial-gradient(ellipse at 50% 50%, rgba(120,85,35,0.15) 0%, transparent 55%),
          radial-gradient(circle at 30% 40%, rgba(90,60,20,0.08) 0%, transparent 3%),
          radial-gradient(circle at 70% 25%, rgba(110,75,30,0.06) 0%, transparent 2%),
          radial-gradient(circle at 45% 70%, rgba(85,55,18,0.07) 0%, transparent 2.5%)
        `,
      };
    case "satin":
      return {
        backgroundImage: `
          linear-gradient(160deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 20%, transparent 40%, rgba(255,255,255,0.25) 60%, transparent 80%, rgba(255,255,255,0.1) 100%),
          linear-gradient(135deg, transparent 10%, rgba(255,255,255,0.15) 30%, transparent 50%),
          linear-gradient(45deg, transparent 20%, rgba(255,255,255,0.08) 40%, transparent 60%),
          radial-gradient(ellipse at 65% 20%, rgba(255,255,255,0.35) 0%, transparent 30%),
          radial-gradient(ellipse at 25% 75%, rgba(255,255,255,0.12) 0%, transparent 35%),
          radial-gradient(ellipse at 80% 60%, rgba(255,255,255,0.18) 0%, transparent 25%),
          linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%),
          linear-gradient(0deg, rgba(0,0,0,0.02) 0%, transparent 50%, rgba(255,255,255,0.04) 100%)
        `,
      };
    case "woven":
      return {
        backgroundImage: `
          repeating-linear-gradient(0deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px),
          repeating-linear-gradient(90deg, rgba(255,255,255,0.10) 0px, rgba(255,255,255,0.10) 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px),
          repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 4px),
          repeating-linear-gradient(90deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 4px),
          repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 3px),
          repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 3px),
          radial-gradient(ellipse at 25% 75%, rgba(80,60,120,0.4) 0%, transparent 45%),
          radial-gradient(ellipse at 75% 25%, rgba(100,80,150,0.3) 0%, transparent 40%),
          radial-gradient(ellipse at 50% 50%, rgba(90,70,135,0.15) 0%, transparent 50%),
          linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 30%, rgba(0,0,0,0.06) 100%)
        `,
      };
    case "pu":
      return {
        backgroundImage: `
          radial-gradient(circle at 25% 30%, rgba(255,255,255,0.08) 0%, transparent 2%),
          radial-gradient(circle at 50% 20%, rgba(255,255,255,0.06) 0%, transparent 1.5%),
          radial-gradient(circle at 75% 40%, rgba(255,255,255,0.07) 0%, transparent 1.8%),
          radial-gradient(circle at 35% 60%, rgba(255,255,255,0.09) 0%, transparent 2.2%),
          radial-gradient(circle at 60% 70%, rgba(255,255,255,0.06) 0%, transparent 1.3%),
          radial-gradient(circle at 80% 65%, rgba(255,255,255,0.07) 0%, transparent 1.6%),
          radial-gradient(circle at 20% 80%, rgba(255,255,255,0.05) 0%, transparent 1.2%),
          radial-gradient(circle at 55% 50%, rgba(255,255,255,0.08) 0%, transparent 2%),
          repeating-linear-gradient(0deg, transparent, transparent 2.5px, rgba(255,255,255,0.04) 2.5px, rgba(255,255,255,0.04) 3px),
          repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(255,255,255,0.03) 4px, rgba(255,255,255,0.03) 4.5px),
          repeating-linear-gradient(20deg, transparent, transparent 3px, rgba(255,255,255,0.025) 3px, rgba(255,255,255,0.025) 3.5px),
          radial-gradient(ellipse at 40% 55%, rgba(255,255,255,0.12) 0%, transparent 45%),
          radial-gradient(ellipse at 65% 35%, rgba(255,255,255,0.1) 0%, transparent 40%),
          linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 40%, rgba(0,0,0,0.15) 100%)
        `,
      };
    default:
      return {};
  }
}

function TagCard({ product, index, inView }: { product: typeof products[0]; index: number; inView: boolean }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -15, y: x * 15 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  const isMobile =
  typeof window !== "undefined" && window.innerWidth < 768;

const baseTiltX = isMobile ? 2 : 5;

const baseTiltY = isMobile
  ? index % 2 === 0
    ? -4
    : 4
  : index % 2 === 0
    ? -10
    : 10;
  const shadowDir = index % 2 === 0 ? 1 : -1;

  return (
    <div
      className="flex justify-center"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(30px)",
        transition: `all 0.7s ease ${0.15 + index * 0.1}s`,
      }}
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(900px) rotateX(${isHovered ? tilt.x : baseTiltX}deg) rotateY(${isHovered ? tilt.y : baseTiltY}deg) translateZ(${isHovered ? 15 : 0}px)`,
          transformStyle: "preserve-3d",
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
          cursor: "default",
        }}
      >
        {/* String */}
        <div className="absolute left-1/2 -translate-x-1/2 w-[1px] h-6 md:h-8 bg-gradient-to-b from-[#8C8275]/15 to-[#8C8275]/50" style={{ top: "-30px" }} />
        {/* Eyelet hole */}
        <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-[#8C8275]/40 bg-[var(--color-cream-dark)] shadow-sm" style={{ top: "-8px", zIndex: 10 }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#8C8275]/25" />
        </div>

        {/* Tag body */}
        <div
          className="
relative
rounded-2xl
overflow-hidden
w-[82vw]
max-w-[330px]
md:w-auto
md:max-w-none
"
          style={{
            background: product.bg,
            boxShadow: isHovered
  ? `${shadowDir * 14}px 18px 32px rgba(0,0,0,0.25),
     ${shadowDir * 4}px 8px 14px rgba(0,0,0,0.18)`
  : `${shadowDir * 8}px 10px 20px rgba(0,0,0,0.18),
     ${shadowDir * 3}px 5px 10px rgba(0,0,0,0.12)`,
            transition: "box-shadow 0.4s ease",
          }}
        >
          {/* Material texture */}
          <div className="absolute inset-0" style={getTextureStyle(product.texture)} />

          {/* Content */}
          <div className="relative z-10 p-4 sm:p-5 md:p-7">
            <h3 className="
text-base
sm:text-lg
md:text-2xl
font-bold
mb-2
" style={{ color: product.textColor }}>
              {product.name}
            </h3>
            <p className="
text-xs
sm:text-sm
leading-relaxed
mb-4
opacity-65
" style={{ color: product.textColor }}>
              {product.description}
            </p>

            {/* Features */}
            <div className="mb-4">
              <p className="text-[10px] tracking-[0.2em] uppercase mb-2 opacity-40" style={{ color: product.textColor }}>Features</p>
              <div className="flex flex-wrap gap-1.5">
                {product.features.map((f) => (
                  <span key={f} className="
px-2
py-0.5
text-[10px]
md:px-2.5
md:py-1
md:text-[11px]
rounded-full
border
" style={{ color: product.textColor, borderColor: `${product.textColor}25`, background: `${product.textColor}10` }}>
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Dashed stitch line */}
            <div className="border-b border-dashed mb-3" style={{ borderColor: `${product.textColor}20` }} />
          </div>

          {/* Reflection highlight — follows hover */}
          <div className="absolute inset-0 pointer-events-none z-20" style={{
            background: isHovered
              ? `radial-gradient(circle at ${(tilt.y / 15 + 0.5) * 100}% ${(tilt.x / -15 + 0.5) * 100}%, rgba(255,255,255,0.25) 0%, transparent 50%)`
              : "linear-gradient(145deg, rgba(255,255,255,0.14) 0%, transparent 35%, transparent 65%, rgba(255,255,255,0.04) 100%)",
            transition: "background 0.3s ease",
          }} />
        </div>
      </div>
    </div>
  );
}

export default function ProductFeatures() {
  const [ref, inView] = useInView(0.1);

  return (
    <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: "var(--color-cream-dark)" }}>
      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        <div className="text-center mb-16">
          <span className="inline-block text-[11px] tracking-[0.15em] text-[var(--color-copper)] uppercase mb-5" style={{ opacity: inView ? 1 : 0, transition: "all 0.5s ease" }}>What We Manufacture</span>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-5 text-[var(--color-ink)]" style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(15px)", transition: "all 0.6s ease 0.1s" }}>
            Every product, <span className="copper-text">your specifications</span>.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-14" style={{ perspective: "1200px" }}>
          {products.map((p, i) => (
            <TagCard key={p.name} product={p} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
