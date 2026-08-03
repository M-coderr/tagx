"use client";

import { useRef, useEffect, useState, useCallback, useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

const DRIVE_API = "https://script.google.com/macros/s/AKfycbzP0gZoa8GhW_ql_9pQZY4q8_y_oXVluj-eoMF7zsQZiexrcF4VaFJE_AIarBJtxvkD/exec";

const FALLBACK_CARDS: Card[] = [
  { label: "Kraft Hang Tags", brand: "Klass 7", desc: "Die-cut kraft with foil stamping", image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=500&h=300&fit=crop" },
  { label: "Woven Damask", brand: "Madmonkey", desc: "High-density weave, intricate detail", image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=500&h=300&fit=crop" },
  { label: "Satin Labels", brand: "Oddy Boy", desc: "Soft-touch printed neck labels", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&h=300&fit=crop" },
  { label: "PU Rubber Labels", brand: "Smoke", desc: "Flexible waterproof sportswear labels", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=300&fit=crop" },
  { label: "Art Board Tags", brand: "Urban Loft", desc: "Embossed logo, luxury matte finish", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=300&fit=crop" },
  { label: "Recycled Tags", brand: "Thread Republic", desc: "Eco-friendly soy-based ink", image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&h=300&fit=crop" },
  { label: "Embossed PU", brand: "Bold Label", desc: "3D embossed with rich texture", image: "https://images.unsplash.com/photo-1590874103328-eac38ef68248?w=500&h=300&fit=crop" },
  { label: "Care Labels", brand: "Cotton House", desc: "Durable care instruction labels", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=300&fit=crop" },
  { label: "Premium Tags", brand: "Noir Studio", desc: "Spot UV and gold foil accents", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop" },
  { label: "Debossed PU", brand: "Raw Denim", desc: "Subtle minimalist expression", image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=500&h=300&fit=crop" },
  { label: "Size Labels", brand: "Vibe Co.", desc: "Precision typography labels", image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&h=300&fit=crop" },
  { label: "Waterproof PU", brand: "Street Culture", desc: "Outdoor activewear durability", image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=500&h=300&fit=crop" },
];

interface DriveImage { name: string; category: string; image: string; full: string; }
interface Card { label: string; brand: string; desc: string; image: string; }

function optimizeThumb(url: string): string {
  if (!url) return url;
  if (url.includes("drive.google.com/thumbnail")) {
    return url.replace(/sz=w?\d+/, "sz=w400");
  }
  if (url.includes("drive.google.com")) {
    const idMatch = url.match(/[?&]id=([^&]+)/);
    if (idMatch) return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w400`;
  }
  return url;
}

function mapDriveToCards(images: DriveImage[]): Card[] {
  return images.map((img) => ({
    label: img.category.trim(),
    brand: img.name || img.category.trim(),
    desc: img.category.trim(),
    image: optimizeThumb(img.image || ""),
  }));
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const ITEM_WIDTH = 460;
const ITEM_HEIGHT = 300;
const SIDE_W = 320;
const SIDE_H = 260;
const GAP = 64;
const MAX_ROT = 35;
const PERSPECTIVE = 500;
const RADIUS = 14;

const M_ITEM_W = 260;
const M_ITEM_H = 180;
const M_SIDE_W = 180;
const M_SIDE_H = 140;
const M_GAP = 24;

function buildPool(source: Card[]): Card[] {
  const s = shuffle(source);
  const pool = [...s, ...s];
  return pool.length < 12 ? [...pool, ...s] : pool;
}

const INIT_POOL = buildPool(FALLBACK_CARDS);

export default function DepthBlurCarousel() {
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [allCards, setAllCards] = useState<Card[]>(FALLBACK_CARDS);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [poolVersion, setPoolVersion] = useState(0);
  const [loadedMap, setLoadedMap] = useState<Record<string, boolean>>({});

  const [pool, setPool] = useState<Card[]>(INIT_POOL);
  const poolDataRef = useRef<Card[]>(INIT_POOL);
  const totalRef = useRef(INIT_POOL.length);
  const scrollRef = useRef(0);
  const smoothRef = useRef(0);
  const cardsElRef = useRef<HTMLDivElement[]>([]);
  const dragRef = useRef({ active: false, startX: 0, scrollStart: 0 });
  const versionRef = useRef(0);
  const rafRef = useRef(0);
  const userInteractedRef = useRef(false);
  const loadedRef = useRef<Set<string>>(new Set());

  const preloadImage = useCallback((src: string) => {
    if (!src || loadedRef.current.has(src)) return;
    loadedRef.current.add(src);
    const img = new window.Image();
    img.src = src;
    img.onload = () => setLoadedMap((p) => ({ ...p, [src]: true }));
  }, []);

  const preloadBatch = useCallback((cards: Card[]) => {
    cards.forEach((c) => preloadImage(c.image));
  }, [preloadImage]);

  useEffect(() => {
    fetch(DRIVE_API)
      .then((r) => r.json())
      .then((data: DriveImage[]) => {
        if (Array.isArray(data) && data.length > 0) {
          const cards = mapDriveToCards(data);
          setAllCards(cards);
          setCategories([...new Set(cards.map((c) => c.label))].sort());
          preloadBatch(cards);
        }
      })
      .catch(() => {});
  }, [preloadBatch]);

  useEffect(() => {
    if (!mounted || allCards.length === 0 || userInteractedRef.current) return;
    const newPool = buildPool(allCards);
    poolDataRef.current = newPool;
    setPool(newPool);
    totalRef.current = newPool.length;
    cardsElRef.current = [];
    versionRef.current += 1;
    setPoolVersion((v) => v + 1);
    preloadBatch(newPool);
  }, [mounted, allCards, preloadBatch]);

  const switchCategory = useCallback((cat: string) => {
    userInteractedRef.current = true;
    const source = cat === "All" ? allCards : allCards.filter((c) => c.label === cat);
    const newPool = buildPool(source);
    poolDataRef.current = newPool;
    setPool(newPool);
    totalRef.current = newPool.length;
    scrollRef.current = 0;
    smoothRef.current = 0;
    cardsElRef.current = [];
    versionRef.current += 1;
    setPoolVersion((v) => v + 1);
    setActiveCategory(cat);
    preloadBatch(newPool);
  }, [allCards, preloadBatch]);

  useEffect(() => {
    if (!mounted) return;

    let running = true;
    const myVersion = versionRef.current;

    const tick = () => {
      if (!running) return;

      const v = versionRef.current;
      if (v !== myVersion) return;

      const pool = poolDataRef.current;
      const total = totalRef.current;
      if (total === 0 || pool.length === 0) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      if (!dragRef.current.active) {
        scrollRef.current += 0.003;
      }

      const diff = scrollRef.current - smoothRef.current;
      smoothRef.current += diff * 0.12;

      const mobile = window.innerWidth < 768;
      const IW = mobile ? M_ITEM_W : ITEM_WIDTH;
      const IH = mobile ? M_ITEM_H : ITEM_HEIGHT;
      const SW = mobile ? M_SIDE_W : SIDE_W;
      const SH = mobile ? M_SIDE_H : SIDE_H;
      const G = mobile ? M_GAP : GAP;
      const els = cardsElRef.current;

      for (let i = 0; i < pool.length; i++) {
        const el = els[i];
        if (!el) continue;

        const linearBase = i - smoothRef.current;
        let mapped = ((linearBase % total) + total) % total;
        if (mapped > total / 2) mapped -= total;

        const absOffset = Math.abs(mapped);
        const t = Math.min(absOffset, 1);
        const w = absOffset <= 1 ? IW + (SW - IW) * t : SW;
        const h = absOffset <= 1 ? IH + (SH - IH) * t : SH;

        const centerToNext = IW / 2 + G + SW / 2;
        const sideToSide = SW + G;
        let x: number;
        if (absOffset === 0) {
          x = 0;
        } else if (absOffset <= 1) {
          x = Math.sign(mapped) * centerToNext * absOffset;
        } else {
          x = Math.sign(mapped) * (centerToNext + (absOffset - 1) * sideToSide * 0.85);
        }

        const z = -absOffset * 200;
        const rotateY = Math.sign(mapped) * Math.min(absOffset * 35, MAX_ROT);
        const zIndex = 1000 - Math.round(absOffset * 10);
        const opacity = absOffset > 5 ? 0 : absOffset > 3.5 ? 1 - (absOffset - 3.5) / 1.5 : 1;

        el.style.transform = `translateX(${x - w / 2}px) translateY(${-h / 2}px) translateZ(${z}px) rotateY(${rotateY}deg)`;
        el.style.width = `${w}px`;
        el.style.height = `${h}px`;
        el.style.zIndex = String(zIndex);
        el.style.opacity = String(opacity);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { running = false; cancelAnimationFrame(rafRef.current); };
  }, [mounted, poolVersion]);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragRef.current = { active: true, startX: e.clientX, scrollStart: scrollRef.current };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    scrollRef.current = dragRef.current.scrollStart - (e.clientX - dragRef.current.startX) * 0.005;
  };

  const handlePointerUp = () => {
    dragRef.current.active = false;
    scrollRef.current = Math.round(scrollRef.current);
  };

  if (!mounted) {
    return <div style={{ width: "100%", height: 380, minHeight: 380 }} />;
  }

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div>
      {categories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => switchCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border ${
                activeCategory === cat
                  ? "copper-grad text-[var(--color-cream)] border-transparent shadow-[0_0_15px_rgba(74,93,78,0.25)]"
                  : "bg-transparent text-[var(--color-ink)]/50 border-[var(--color-ink)]/10 hover:border-[var(--color-copper)]/40 hover:text-[var(--color-copper)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{
          width: "100%",
          height: isMobile ? 250 : ITEM_HEIGHT + 80,
          minHeight: isMobile ? 220 : 380,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          perspective: PERSPECTIVE,
          overflow: "hidden",
          position: "relative",
          cursor: "grab",
          touchAction: "pan-y",
        }}
      >
        <div style={{ position: "absolute", inset: 0, zIndex: 9999, cursor: "grab", touchAction: "pan-y" }} />

        <div key={poolVersion} style={{ position: "relative", width: 0, height: 0, transformStyle: "preserve-3d" }}>
          {pool.map((card, i) => {
            const isImgLoaded = !!loadedMap[card.image];
            return (
              <div
                key={i}
                ref={(el) => { if (el) cardsElRef.current[i] = el; }}
                style={{
                  position: "absolute", left: 0, top: 0,
                  width: isMobile ? M_ITEM_W : ITEM_WIDTH,
                  height: isMobile ? M_ITEM_H : ITEM_HEIGHT,
                  borderRadius: RADIUS,
                  overflow: "hidden",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  willChange: "transform",
                  background: "linear-gradient(135deg, #d4cfc7 0%, #c8c2b8 50%, #b8b2a8 100%)",
                }}
              >
                {!isImgLoaded && (
                  <div style={{
                    position: "absolute", inset: 0, borderRadius: RADIUS,
                    background: "linear-gradient(110deg, #d4cfc7 0%, #c8c2b8 40%, #e0dbd3 50%, #c8c2b8 60%, #d4cfc7 100%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.5s ease-in-out infinite",
                  }} />
                )}
                <img
                  src={card.image}
                  alt={card.label}
                  draggable={false}
                  referrerPolicy="no-referrer"
                  loading={i < 3 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={i < 3 ? "high" : "low"}
                  style={{
                    position: "absolute", inset: 0, width: "100%", height: "100%",
                    objectFit: "cover", borderRadius: RADIUS,
                    opacity: isImgLoaded ? 1 : 0,
                    transition: "opacity 0.3s ease",
                  }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.1) 50%, transparent)", borderRadius: RADIUS }} />
                <div style={{
                  position: "absolute", top: 14, left: 14, padding: "5px 10px",
                  borderRadius: 99, background: "rgba(0,0,0,0.4)",
                  fontSize: 10, fontWeight: 600, letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.85)", textTransform: "uppercase",
                }}>{card.brand}</div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: isMobile ? "12px 14px" : "20px 22px" }}>
                  <h4 style={{ fontSize: isMobile ? 13 : 17, fontWeight: 700, color: "#fff", marginBottom: 3 }}>{card.label}</h4>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: "15%",
          maskImage: "linear-gradient(to right, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, black 0%, transparent 100%)",
          background: "linear-gradient(to right, var(--color-cream), transparent)",
          pointerEvents: "none", zIndex: 10001,
        }} />
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: "15%",
          maskImage: "linear-gradient(to left, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to left, black 0%, transparent 100%)",
          background: "linear-gradient(to left, var(--color-cream), transparent)",
          pointerEvents: "none", zIndex: 10001,
        }} />
      </div>
    </div>
  );
}
