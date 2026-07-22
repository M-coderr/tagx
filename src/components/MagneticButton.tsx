"use client";

import { useRef, useCallback } from "react";

export default function MagneticButton({ children, className = "", href, ...props }: { children: React.ReactNode; className?: string; href?: string; [key: string]: any }) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  }, []);

  const Tag = href ? "a" : "button";

  return (
    <Tag
      ref={ref as any}
      href={href}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)", display: "inline-flex" }}
      {...props}
    >
      {children}
    </Tag>
  );
}
