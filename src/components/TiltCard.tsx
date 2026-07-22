"use client";

import { useRef, useCallback, useState } from "react";

export default function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    const shadowX = ((x - centerX) / centerX) * 8;
    const shadowY = ((y - centerY) / centerY) * 8;
    el.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px) scale(1.03)`;
    el.style.boxShadow = `${-shadowX}px ${-shadowY}px 30px rgba(74,93,78,0.15), ${-shadowX * 0.5}px ${-shadowY * 0.5}px 15px rgba(0,0,0,0.06)`;
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)";
    el.style.boxShadow = "";
    setIsHovered(false);
  }, []);

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ transition: isHovered ? "none" : "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s ease" }}
    >
      {children}
    </div>
  );
}
