"use client";

import { useEffect, useRef } from "react";

export default function InteractiveDots({
  dotColor = "#4A5D4E",
  opacity = 0.15,
}: {
  dotColor?: string;
  opacity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let mx = -9999;
    let my = -9999;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
      // Single DOM write per mouse move — no RAF needed
      el.style.setProperty("--mx", `${mx}px`);
      el.style.setProperty("--my", `${my}px`);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{
        "--dot-color": dotColor,
        "--mx": "-9999px",
        "--my": "-9999px",
      } as React.CSSProperties}
    >
      {/* Static dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, var(--dot-color) 1.5px, transparent 1.5px)`,
          backgroundSize: "32px 32px",
          opacity,
        }}
      />
      {/* Mouse glow — uses CSS variables for position, zero JS re-renders */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 200,
          height: 200,
          background: `radial-gradient(circle, var(--dot-color), transparent 70%)`,
          left: "var(--mx)",
          top: "var(--my)",
          transform: "translate(-50%, -50%)",
          opacity: 0.12,
          transition: "opacity 0.3s",
        }}
      />
    </div>
  );
}
