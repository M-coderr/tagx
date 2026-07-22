"use client";

import { useState, useEffect } from "react";

const labels = [
  {
    name: "TagX",
    bg: "#F4F5EE",
    textColor: "#1E3A28",
    texture: "none",
    type: "brand" as const,
  },
  {
    name: "Kraft\nPaper",
    bg: "#9B7E5A",
    textColor: "#3D2E1A",
    texture: "kraft",
  },
  {
    name: "Colour\nCards",
    bg: "#E8E4DC",
    textColor: "#1E3A28",
    texture: "none",
    type: "swatch" as const,
  },
  {
    name: "Foil\nStamping",
    bg: "#7A6B4E",
    textColor: "#FFF8E8",
    texture: "foil",
  },
  {
    name: "UV\nCoating",
    bg: "#1A1F2E",
    textColor: "#E8EAF0",
    texture: "uv",
  },
  {
    name: "Satin\nLabels",
    bg: "#B85C35",
    textColor: "#FFF8F0",
    texture: "satin",
  },
  {
    name: "Woven\nLabels",
    bg: "#5B3A8C",
    textColor: "#F4F0EA",
    texture: "woven",
  },
];

const VISIBLE = 4;
const CYCLE_MS = 2800;

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
          radial-gradient(ellipse at 15% 85%, rgba(100,70,25,0.35) 0%, transparent 40%),
          radial-gradient(ellipse at 85% 15%, rgba(140,100,45,0.25) 0%, transparent 45%),
          radial-gradient(ellipse at 50% 50%, rgba(120,85,35,0.15) 0%, transparent 55%),
          radial-gradient(circle at 30% 40%, rgba(90,60,20,0.08) 0%, transparent 3%),
          radial-gradient(circle at 70% 25%, rgba(110,75,30,0.06) 0%, transparent 2%)
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
    case "foil":
      return {
        backgroundImage: `
          linear-gradient(135deg, rgba(255,220,150,0.35) 0%, rgba(200,140,50,0.1) 15%, rgba(255,240,200,0.2) 30%, transparent 45%, rgba(220,160,70,0.25) 60%, rgba(255,210,130,0.1) 75%, rgba(200,150,60,0.15) 90%, transparent 100%),
          linear-gradient(45deg, transparent 10%, rgba(255,230,170,0.15) 25%, transparent 40%, rgba(210,155,65,0.12) 55%, transparent 70%),
          linear-gradient(90deg, rgba(255,240,200,0.06) 0%, rgba(255,255,255,0.1) 50%, rgba(255,240,200,0.06) 100%),
          repeating-linear-gradient(60deg, transparent, transparent 2px, rgba(255,255,255,0.06) 2px, rgba(255,255,255,0.06) 2.5px),
          repeating-linear-gradient(-60deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 2.5px),
          radial-gradient(ellipse at 45% 35%, rgba(255,220,150,0.3) 0%, transparent 40%),
          radial-gradient(ellipse at 70% 65%, rgba(200,150,60,0.2) 0%, transparent 35%),
          linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(180,120,40,0.08) 100%)
        `,
      };
    case "uv":
      return {
        backgroundImage: `
          linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%, rgba(255,255,255,0.12) 100%),
          linear-gradient(45deg, transparent 20%, rgba(255,255,255,0.1) 35%, transparent 50%, rgba(255,255,255,0.06) 65%, transparent 80%),
          radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 40%),
          radial-gradient(ellipse at 70% 70%, rgba(255,255,255,0.15) 0%, transparent 35%),
          radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
          linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 40%, rgba(0,0,0,0.2) 100%)
        `,
      };
    default:
      return {};
  }
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export default function LabelStack() {
  const [active, setActive] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    const timer = setTimeout(() => {
      interval = setInterval(() => {
        setActive((prev) => (prev + 1) % labels.length);
      }, CYCLE_MS);
    }, 4500);
    return () => { clearTimeout(timer); clearInterval(interval); };
  }, []);

  const CARD_W = isMobile ? 180 : 280;
  const CARD_H = isMobile ? 240 : 380;
  const STACK_W = CARD_W + 80;
  const STACK_H = CARD_H + 40;
  const OFFSET = isMobile ? 12 : 18;

  const getCardStyle = (index: number): React.CSSProperties => {
    let diff = index - active;
    if (diff < 0) diff += labels.length;
    if (diff > labels.length / 2) diff -= labels.length;
    const absDiff = Math.abs(diff);

    if (absDiff > VISIBLE) return { opacity: 0, pointerEvents: "none" };

    const x = diff * OFFSET;
    const y = absDiff * 5;
    const rotate = diff * 2.5;
    const scale = absDiff === 0 ? 1 : absDiff === 1 ? 0.96 : absDiff === 2 ? 0.92 : 0.88;
    const zIndex = VISIBLE - absDiff;
    const opacity = absDiff === 0 ? 1 : absDiff === 1 ? 0.85 : absDiff === 2 ? 0.6 : 0.35;

    return {
      position: "absolute",
      left: `calc(50% - ${CARD_W / 2}px)`,
      top: `calc(50% - ${CARD_H / 2}px)`,
      width: CARD_W,
      height: CARD_H,
      transform: `translateX(${x}px) translateY(${y}px) rotate(${rotate}deg) scale(${scale})`,
      zIndex,
      opacity,
      transition: "all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
    };
  };

  return (
    <div className="relative" style={{ width: STACK_W, height: STACK_H, perspective: 800 }}>
      {labels.map((label, i) => {
        const style = getCardStyle(i);
        const isActive = i === active;
        const lines = label.name.split("\n");
        const textureStyle = getTextureStyle(label.texture);

        return (
          <div
            key={label.name}
            style={{
              ...style,
              borderRadius: isMobile ? 10 : 14,
              overflow: "hidden",
              boxShadow: isActive
                ? "0 25px 60px rgba(0,0,0,0.4), 0 8px 20px rgba(0,0,0,0.2)"
                : "0 10px 30px rgba(0,0,0,0.25)",
            }}
          >
            {/* Card background */}
            <div style={{
              position: "absolute", inset: 0,
              background: label.bg,
              borderRadius: isMobile ? 10 : 14,
            }} />

            {label.type === "brand" ? (
              /* Brand card content */
              <div style={{
                position: "relative", zIndex: 1, width: "100%", height: "100%",
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", padding: isMobile ? "20px 16px" : "28px 24px",
              }}>
                {/* Hole punch */}
                <div style={{
                  position: "absolute", top: isMobile ? 10 : 16, left: "50%", transform: "translateX(-50%)",
                  width: isMobile ? 10 : 14, height: isMobile ? 10 : 14, borderRadius: "50%",
                  border: `1.5px solid ${label.textColor}30`,
                  background: "rgba(0,0,0,0.05)",
                }} />
                {/* TagX logo */}
                <div style={{
                  fontSize: isMobile ? 22 : 30, fontWeight: 800, color: label.textColor,
                  letterSpacing: "-0.02em", marginBottom: isMobile ? 14 : 20, marginTop: isMobile ? 10 : 14,
                }}>
                  Tag<span style={{ color: "#2D5A3A" }}>X</span>
                </div>
                {/* Divider */}
                <div style={{
                  width: "60%", height: 1, background: `${label.textColor}20`, marginBottom: isMobile ? 14 : 20,
                }} />
                {/* Product list */}
                <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 8 : 12, width: "100%", paddingLeft: isMobile ? 20 : 32 }}>
                  {[
                    { name: "Hang Tags", color: "#C0392B" },
                    { name: "Woven Labels", color: "#2E6B8A" },
                    { name: "Satin Labels", color: "#D4845A" },
                    { name: "PU Labels", color: "#1E3A28" },
                  ].map((item) => (
                    <div key={item.name} style={{ display: "flex", alignItems: "center", gap: isMobile ? 8 : 12 }}>
                      <div style={{
                        width: isMobile ? 6 : 8, height: isMobile ? 6 : 8, borderRadius: "50%",
                        background: item.color, flexShrink: 0,
                      }} />
                      <span style={{
                        fontSize: isMobile ? 11 : 14, color: label.textColor, fontWeight: 500,
                        letterSpacing: "0.04em", fontFamily: "monospace",
                      }}>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : label.type === "swatch" ? (
              /* Colour Cards swatch content */
              <div style={{
                position: "relative", zIndex: 1, width: "100%", height: "100%",
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", padding: isMobile ? "16px 12px" : "24px 20px",
              }}>
                {/* Hole punch */}
                <div style={{
                  position: "absolute", top: isMobile ? 10 : 16, left: "50%", transform: "translateX(-50%)",
                  width: isMobile ? 10 : 14, height: isMobile ? 10 : 14, borderRadius: "50%",
                  border: `1.5px solid ${label.textColor}30`,
                  background: "rgba(0,0,0,0.05)",
                }} />
                {/* Title */}
                <div style={{
                  fontSize: isMobile ? 12 : 16, fontWeight: 700, color: label.textColor,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  marginBottom: isMobile ? 12 : 18, marginTop: isMobile ? 10 : 14,
                }}>Colour Cards</div>
                {/* Color swatches */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: isMobile ? 6 : 10, width: "100%", padding: isMobile ? "0 16px" : "0 24px" }}>
                  {["#1E3A28", "#5B3A8C", "#B85C35", "#8C8275", "#C0392B", "#2E6B8A", "#6B5D4E", "#D4845A", "#1A1F2E"].map((c) => (
                    <div key={c} style={{
                      aspectRatio: "1", borderRadius: isMobile ? 4 : 6, background: c,
                      boxShadow: "inset 0 1px 2px rgba(255,255,255,0.15), 0 1px 3px rgba(0,0,0,0.1)",
                    }} />
                  ))}
                </div>
              </div>
            ) : (
              /* Regular label card content */
              <>
                {/* Texture overlay */}
                <div style={{
                  position: "absolute", inset: 0, borderRadius: isMobile ? 10 : 14,
                  ...textureStyle,
                }} />

                {/* Sheen / highlight for satin/foil */}
                {(label.texture === "satin" || label.texture === "foil") && (
                  <div style={{
                    position: "absolute", inset: 0, borderRadius: isMobile ? 10 : 14,
                    background: "linear-gradient(115deg, transparent 25%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.04) 50%, transparent 60%)",
                  }} />
                )}

                {/* Hole punch */}
                <div style={{
                  position: "absolute", top: isMobile ? 10 : 16, left: "50%", transform: "translateX(-50%)",
                  width: isMobile ? 10 : 14, height: isMobile ? 10 : 14, borderRadius: "50%",
                  border: `1.5px solid ${label.textColor}30`,
                  background: "rgba(255,255,255,0.08)",
                }} />

                {/* Label text */}
                <div style={{
                  position: "absolute", top: "38%", left: 0, right: 0,
                  textAlign: "center", padding: isMobile ? "0 12px" : "0 20px",
                }}>
                  {lines.map((line, li) => (
                    <div key={li} style={{
                      fontSize: isMobile ? 18 : 26, fontWeight: 700, lineHeight: 1.2,
                      color: label.textColor, letterSpacing: "-0.01em",
                      fontFamily: "Georgia, serif",
                    }}>{line}</div>
                  ))}
                </div>

                {/* Diamond icon */}
                <div style={{
                  position: "absolute", bottom: isMobile ? 40 : 60, left: "50%", transform: "translateX(-50%)",
                }}>
                  <svg width={isMobile ? 18 : 24} height={isMobile ? 18 : 24} viewBox="0 0 20 20" fill="none">
                    <path d="M10 2L18 10L10 18L2 10L10 2Z" stroke={`${label.textColor}40`} strokeWidth="1" />
                  </svg>
                </div>

                {/* Edge accent line */}
                <div style={{
                  position: "absolute", bottom: 0, left: isMobile ? 14 : 20, right: isMobile ? 14 : 20, height: 2,
                  background: `${label.textColor}15`, borderRadius: 1,
                }} />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
