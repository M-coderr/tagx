"use client";

import { useState, useEffect, useCallback } from "react";

const tags = [
  { id: 0, label: "Kraft Hang Tags", image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=400&h=280&fit=crop" },
  { id: 1, label: "Woven Labels", image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=280&fit=crop" },
  { id: 2, label: "Satin Labels", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=280&fit=crop" },
  { id: 3, label: "PU Labels", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=280&fit=crop" },
  { id: 4, label: "Premium Tags", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=280&fit=crop" },
  { id: 5, label: "Embossed PU", image: "https://images.unsplash.com/photo-1590874103328-eac38ef68248?w=400&h=280&fit=crop" },
  { id: 6, label: "and more", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=280&fit=crop" },
];

const CARD_W = 320;
const CARD_H = 220;
const STACK_GAP = 40; // horizontal gap between stacked cards
const TOTAL = tags.length;

export default function MotionTiles() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [autoDir, setAutoDir] = useState(1); // 1 = forward, -1 = backward

  // Auto-animate: cycle through cards back and forth
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => {
        let next = prev + autoDir;
        if (next >= TOTAL) {
          setAutoDir(-1);
          next = prev - 1;
        } else if (next < 0) {
          setAutoDir(1);
          next = prev + 1;
        }
        return next;
      });
    }, 2200);
    return () => clearInterval(interval);
  }, [autoDir]);

  const handleTagClick = useCallback((id: number) => {
    setActive(id);
    setAutoDir(id >= TOTAL - 1 ? -1 : id <= 0 ? 1 : autoDir);
  }, [autoDir]);

  const handleTagHover = useCallback((id: number) => {
    setHovered(id);
    setActive(id);
  }, []);

  const getCardTransform = (index: number) => {
    const diff = index - active;
    const absDiff = Math.abs(diff);

    // Horizontal offset: cards fan out to the right
    const x = diff * STACK_GAP;
    // Slight vertical offset for depth feel
    const y = absDiff * 3;
    // Scale: active card is full size, others shrink
    const scale = absDiff === 0 ? 1 : absDiff === 1 ? 0.95 : absDiff === 2 ? 0.9 : 0.85;
    // Opacity: fade distant cards
    const opacity = absDiff > 3 ? 0 : absDiff === 0 ? 1 : absDiff === 1 ? 0.9 : absDiff === 2 ? 0.7 : 0.4;
    // Z-index: active on top
    const zIndex = 100 - absDiff;

    return {
      transform: `translateX(${x}px) translateY(${y}px) scale(${scale})`,
      opacity,
      zIndex,
      transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
    };
  };

  return (
    <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: "linear-gradient(160deg, #1E3A28, #264432)" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Desktop */}
        <div className="hidden md:flex items-center justify-between gap-12" style={{ minHeight: 435 }}>
          {/* Left: Tags list */}
          <div className="flex flex-col gap-2.5" style={{ maxWidth: 400 }}>
            <p className="text-white text-lg font-medium leading-relaxed mb-3">
              Everything you need in one place, like:
            </p>
            <div className="flex flex-col gap-1">
              {tags.map((tag) => {
                const isActive = active === tag.id;
                const isHov = hovered === tag.id;
                return (
                  <button
                    key={tag.id}
                    onClick={() => handleTagClick(tag.id)}
                    onMouseEnter={() => handleTagHover(tag.id)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      textAlign: "left", fontSize: 15, fontFamily: "Inter, sans-serif",
                      lineHeight: "1.6", background: "none", border: "none",
                      padding: "2px 0", cursor: "pointer",
                      color: isActive ? "#fff" : isHov ? "#ccc" : "#616161",
                      transform: isActive ? "translateX(8px)" : "translateX(0)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {tag.label}{tag.id < 5 ? "," : ""}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Card stack */}
          <div className="relative flex-shrink-0" style={{ width: CARD_W + 180, height: CARD_H + 40 }}>
            {tags.map((tag, i) => {
              const style = getCardTransform(i);
              const isActive = active === tag.id;
              return (
                <div
                  key={tag.id}
                  onMouseEnter={() => handleTagHover(tag.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    position: "absolute",
                    width: CARD_W, height: CARD_H,
                    left: `calc(50% - ${CARD_W / 2}px)`,
                    top: `calc(50% - ${CARD_H / 2}px)`,
                    borderRadius: 12, overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: isActive ? "0 20px 50px rgba(0,0,0,0.5)" : "0 8px 25px rgba(0,0,0,0.3)",
                    ...style,
                  }}
                >
                  <img
                    src={tag.image}
                    alt={tag.label}
                    loading="lazy"
                    draggable={false}
                    style={{ width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }}
                  />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.1) 50%, transparent)",
                  }} />
                  <div style={{
                    position: "absolute", bottom: 14, left: 14,
                    color: "#fff", fontSize: 13, fontWeight: 600,
                  }}>
                    {tag.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex flex-col gap-5">
          <p className="text-white text-base font-medium">Everything you need in one place, like:</p>
          <div className="flex flex-col gap-1">
            {tags.map((tag) => (
              <button key={tag.id} onClick={() => handleTagClick(tag.id)}
                style={{
                  textAlign: "left", fontSize: 15, fontFamily: "Inter, sans-serif",
                  lineHeight: "1.6", background: "none", border: "none",
                  padding: "2px 0", cursor: "pointer",
                  color: active === tag.id ? "#fff" : "#616161",
                  order: active === tag.id ? -1 : 0,
                  transition: "all 0.3s ease",
                }}
              >{tag.label}{tag.id < 5 ? "," : ""}</button>
            ))}
          </div>
          <div className="w-full rounded-xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
            <img src={tags[active].image} alt={tags[active].label}
              style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
