"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    let mx = 0, my = 0, cx = 0, cy = 0;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const tick = () => {
      cx += (mx - cx) * 0.15;
      cy += (my - cy) * 0.15;
      glow.style.transform = `translate(${cx - 150}px, ${cy - 150}px)`;
      requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    requestAnimationFrame(tick);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-[300px] h-[300px] pointer-events-none z-[9998] hidden md:block"
      style={{
        background: "radial-gradient(circle, rgba(74,93,78,0.12) 0%, rgba(74,93,78,0.04) 40%, transparent 70%)",
        borderRadius: "50%",
        filter: "blur(20px)",
        willChange: "transform",
      }}
    />
  );
}
