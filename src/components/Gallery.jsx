import { useState, useEffect, useRef, useCallback } from "react";

// ─── IMAGE PATHS ───────────────────────────────────────────────────────────────
// Replace these with your actual image paths / imports
const IMAGES = [
  { src: "/about/about1.png", label: "Living Spaces",   sub: "Luxury Redefined"      },
  { src: "/about/about2.png", label: "Master Bedroom",  sub: "Serene Elegance"        },
  { src: "/vision/vision3.png", label: "Modern Kitchen",  sub: "Where Art Meets Function"},
  { src: "/vision/vision1.png", label: "Dining Rooms",    sub: "Curated Gatherings"     },
  { src: "/vision/vision1.png", label: "Home Office",     sub: "Inspired Productivity"  },
  { src: "/whychoose/innovative.png", label: "Bathrooms",       sub: "Spa-Like Retreats"      },
  { src: "/whychoose/integrity.png", label: "Outdoor Decks",   sub: "Beyond Four Walls"      },
  { src: "/whychoose/quality.png", label: "Kids Rooms",      sub: "Playful Perfection"     },
];

// ─── STYLES ────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@200;300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --gold: #C9A84C;
  --gold2: #E8C97A;
  --gold3: #f5e0a0;
  --bg: #080808;
  --card: #0f0f0f;
  --border: rgba(201,168,76,0.15);
}

.gl-root {
  background: var(--bg);
  font-family: 'Montserrat', sans-serif;
  color: #fff;
  overflow: hidden;
  position: relative;
}

/* ── Ambient noise grain ─────────────────────────────── */
.gl-root::before {
  content: '';
  position: fixed; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  background-size: 200px 200px;
  pointer-events: none; z-index: 9999; opacity: 0.35;
}

/* ── Section header ──────────────────────────────────── */
.gl-header {
  text-align: center;
  padding: 80px 24px 56px;
  position: relative;
}

.gl-eyebrow {
  font-size: 10px; font-weight: 600; letter-spacing: 5px;
  text-transform: uppercase; color: var(--gold); opacity: 0.8;
  margin-bottom: 18px;
  display: flex; align-items: center; justify-content: center; gap: 14px;
}
.gl-eyebrow::before, .gl-eyebrow::after {
  content: ''; display: block; width: 50px; height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold));
}
.gl-eyebrow::after { transform: scaleX(-1); }

.gl-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(52px, 9vw, 96px);
  font-weight: 300; line-height: 1;
  letter-spacing: -2px;
  color: #fff;
}
.gl-title em { font-style: italic; color: var(--gold); }

.gl-sub {
  font-size: 11px; font-weight: 300; letter-spacing: 2px;
  color: rgba(255,255,255,0.3); margin-top: 18px;
}

/* ── Horizontal scroll track ─────────────────────────── */
.gl-track-wrap {
  position: relative;
  padding: 20px 0 50px;
  cursor: grab;
  user-select: none;
}
.gl-track-wrap.dragging { cursor: grabbing; }

.gl-track {
  display: flex;
  gap: 24px;
  padding: 40px 80px 40px;
  width: max-content;
  will-change: transform;
}

/* ── Individual card ─────────────────────────────────── */
.gl-card {
  position: relative;
  flex-shrink: 0;
  border-radius: 3px;
  overflow: hidden;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: box-shadow 0.5s;
}

/* alternating heights for rhythm */
.gl-card:nth-child(odd)  { width: 340px; height: 480px; margin-top: 0;   }
.gl-card:nth-child(even) { width: 280px; height: 400px; margin-top: 60px; }

.gl-card img {
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.8s cubic-bezier(.22,1,.36,1), filter 0.5s;
  filter: brightness(0.75) saturate(0.9);
  pointer-events: none;
}
.gl-card:hover img {
  transform: scale(1.08);
  filter: brightness(0.5) saturate(0.7);
}

/* gold border reveal on hover */
.gl-card::before {
  content: '';
  position: absolute; inset: 0;
  border: 1px solid var(--gold);
  opacity: 0;
  transition: opacity 0.4s;
  z-index: 2; border-radius: 3px;
  pointer-events: none;
}
.gl-card:hover::before { opacity: 0.5; }

/* corner accents */
.gl-card::after {
  content: '';
  position: absolute;
  top: 12px; left: 12px;
  width: 28px; height: 28px;
  border-top: 1px solid var(--gold);
  border-left: 1px solid var(--gold);
  opacity: 0;
  transform: translate(-4px,-4px);
  transition: opacity 0.4s 0.05s, transform 0.4s 0.05s;
  z-index: 3; pointer-events: none;
}
.gl-card:hover::after {
  opacity: 0.8; transform: translate(0,0);
}

/* bottom-right corner accent via child span */
.gl-corner-br {
  position: absolute;
  bottom: 12px; right: 12px;
  width: 28px; height: 28px;
  border-bottom: 1px solid var(--gold);
  border-right: 1px solid var(--gold);
  opacity: 0;
  transform: translate(4px,4px);
  transition: opacity 0.4s 0.05s, transform 0.4s 0.05s;
  z-index: 3; pointer-events: none;
}
.gl-card:hover .gl-corner-br { opacity: 0.8; transform: translate(0,0); }

/* overlay panel */
.gl-card-info {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 60px 24px 28px;
  background: linear-gradient(0deg, rgba(0,0,0,0.88) 0%, transparent 100%);
  transform: translateY(16px);
  opacity: 0;
  transition: opacity 0.45s, transform 0.45s cubic-bezier(.22,1,.36,1);
  z-index: 2;
}
.gl-card:hover .gl-card-info { opacity: 1; transform: translateY(0); }

.gl-card-num {
  font-size: 9px; font-weight: 600; letter-spacing: 4px;
  color: var(--gold); opacity: 0.7; margin-bottom: 8px;
}
.gl-card-label {
  font-family: 'Cormorant Garamond', serif;
  font-size: 24px; font-weight: 400;
  color: #fff; line-height: 1.1; margin-bottom: 4px;
}
.gl-card-sub {
  font-size: 10px; font-weight: 300; letter-spacing: 2px;
  color: rgba(255,255,255,0.5);
}

/* index number top-right */
.gl-card-idx {
  position: absolute; top: 18px; right: 20px;
  font-family: 'Cormorant Garamond', serif;
  font-size: 52px; font-weight: 300;
  color: rgba(201,168,76,0.08);
  line-height: 1; z-index: 1; pointer-events: none;
  transition: color 0.4s;
}
.gl-card:hover .gl-card-idx { color: rgba(201,168,76,0.18); }

/* ── Scroll progress bar ─────────────────────────────── */
.gl-progress-wrap {
  display: flex; align-items: center; justify-content: center;
  gap: 16px; padding: 0 80px 48px;
}
.gl-progress-bar {
  flex: 1; max-width: 600px; height: 1px;
  background: rgba(255,255,255,0.06);
  position: relative; overflow: hidden;
  border-radius: 1px;
}
.gl-progress-fill {
  position: absolute; top: 0; left: 0;
  height: 100%; background: var(--gold);
  transition: width 0.1s linear;
  box-shadow: 0 0 12px var(--gold);
}
.gl-progress-count {
  font-size: 10px; letter-spacing: 3px;
  color: rgba(255,255,255,0.25);
  font-weight: 300; white-space: nowrap;
}
.gl-progress-count span { color: var(--gold); }

/* ── View All CTA ────────────────────────────────────── */
.gl-cta {
  display: flex; justify-content: center;
  padding-bottom: 80px;
}
.gl-cta-btn {
  display: flex; align-items: center; gap: 14px;
  padding: 16px 44px;
  border: 1px solid var(--gold);
  background: transparent;
  color: var(--gold);
  font-family: 'Montserrat', sans-serif;
  font-size: 10px; font-weight: 600; letter-spacing: 5px;
  text-transform: uppercase;
  cursor: pointer; border-radius: 2px;
  position: relative; overflow: hidden;
  transition: color 0.4s, box-shadow 0.3s;
}
.gl-cta-btn::before {
  content: '';
  position: absolute; inset: 0;
  background: var(--gold);
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.45s cubic-bezier(.22,1,.36,1);
  z-index: 0;
}
.gl-cta-btn:hover::before { transform: scaleX(1); }
.gl-cta-btn:hover { color: #000; box-shadow: 0 10px 40px rgba(201,168,76,0.25); }
.gl-cta-btn span { position: relative; z-index: 1; }
.gl-cta-arrow {
  position: relative; z-index: 1;
  transition: transform 0.3s;
}
.gl-cta-btn:hover .gl-cta-arrow { transform: translateX(5px); }

/* ── Lightbox ────────────────────────────────────────── */
.gl-lb-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.96);
  z-index: 1000;
  display: flex; align-items: center; justify-content: center;
  animation: lbIn 0.4s cubic-bezier(.22,1,.36,1) both;
  backdrop-filter: blur(12px);
}
@keyframes lbIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.gl-lb-inner {
  position: relative;
  max-width: 90vw; max-height: 88vh;
  display: flex; flex-direction: column; align-items: center;
  animation: lbScale 0.45s cubic-bezier(.22,1,.36,1) both;
}
@keyframes lbScale {
  from { transform: scale(0.88) translateY(20px); opacity: 0; }
  to   { transform: scale(1) translateY(0); opacity: 1; }
}

.gl-lb-img-wrap {
  position: relative;
  border: 1px solid rgba(201,168,76,0.2);
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(201,168,76,0.06);
}

.gl-lb-img {
  display: block;
  max-width: 80vw; max-height: 72vh;
  object-fit: contain;
}

.gl-lb-caption {
  margin-top: 24px;
  text-align: center;
}
.gl-lb-label {
  font-family: 'Cormorant Garamond', serif;
  font-size: 28px; font-weight: 300;
  color: #fff; margin-bottom: 6px;
}
.gl-lb-sub {
  font-size: 10px; letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(201,168,76,0.6);
}

/* nav arrows */
.gl-lb-nav {
  position: absolute; top: 50%;
  transform: translateY(-50%);
  width: 48px; height: 48px;
  border: 1px solid rgba(201,168,76,0.25);
  background: rgba(0,0,0,0.6);
  color: var(--gold);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; border-radius: 50%;
  font-size: 18px;
  transition: border-color 0.3s, background 0.3s, transform 0.3s;
  z-index: 10;
}
.gl-lb-nav:hover {
  border-color: var(--gold);
  background: rgba(201,168,76,0.12);
  transform: translateY(-50%) scale(1.08);
}
.gl-lb-prev { left: -72px; }
.gl-lb-next { right: -72px; }

@media (max-width: 600px) {
  .gl-lb-prev { left: 10px; top: auto; bottom: -60px; transform: none; }
  .gl-lb-next { right: 10px; top: auto; bottom: -60px; transform: none; }
}

.gl-lb-close {
  position: absolute; top: -52px; right: 0;
  width: 40px; height: 40px;
  border: 1px solid rgba(255,255,255,0.1);
  background: transparent; color: rgba(255,255,255,0.5);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; border-radius: 50%; font-size: 16px;
  transition: border-color 0.3s, color 0.3s;
}
.gl-lb-close:hover { border-color: var(--gold); color: var(--gold); }

.gl-lb-count {
  position: absolute; bottom: -44px; left: 50%; transform: translateX(-50%);
  font-size: 10px; letter-spacing: 4px;
  color: rgba(255,255,255,0.2); white-space: nowrap;
}
.gl-lb-count strong { color: var(--gold); font-weight: 400; }

/* ── Fade-in for cards on mount ──────────────────────── */
.gl-card {
  opacity: 0;
  animation: cardReveal 0.7s cubic-bezier(.22,1,.36,1) forwards;
}
@keyframes cardReveal {
  from { opacity: 0; transform: translateY(30px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
`;

// ─── COMPONENT ─────────────────────────────────────────────────────────────────
export default function Gallery() {
  const trackRef   = useRef(null);
  const wrapRef    = useRef(null);
  const dragRef    = useRef({ active: false, startX: 0, scrollLeft: 0 });
  const animRef    = useRef(null);
  const velRef     = useRef(0);
  const lastXRef   = useRef(0);

  const [scrollPct, setScrollPct]   = useState(0);
  const [lightbox, setLightbox]     = useState(null); // index | null
  const [dragging, setDragging]     = useState(false);

  // ── update progress bar
  const updateProgress = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const max = wrap.scrollWidth - wrap.clientWidth;
    setScrollPct(max ? (wrap.scrollLeft / max) * 100 : 0);
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    wrap.addEventListener("scroll", updateProgress, { passive: true });
    return () => wrap.removeEventListener("scroll", updateProgress);
  }, [updateProgress]);

  // ── drag-to-scroll
  const onMouseDown = (e) => {
    const wrap = wrapRef.current;
    dragRef.current = { active: true, startX: e.pageX - wrap.offsetLeft, scrollLeft: wrap.scrollLeft };
    lastXRef.current = e.pageX;
    velRef.current = 0;
    setDragging(true);
    cancelAnimationFrame(animRef.current);
  };

  const onMouseMove = (e) => {
    if (!dragRef.current.active) return;
    const wrap = wrapRef.current;
    const x = e.pageX - wrap.offsetLeft;
    const walk = (x - dragRef.current.startX) * 1.4;
    velRef.current = e.pageX - lastXRef.current;
    lastXRef.current = e.pageX;
    wrap.scrollLeft = dragRef.current.scrollLeft - walk;
  };

  const onMouseUp = () => {
    dragRef.current.active = false;
    setDragging(false);
    // momentum
    let v = velRef.current;
    const momentum = () => {
      if (Math.abs(v) < 0.5) return;
      wrapRef.current.scrollLeft -= v * 1.5;
      v *= 0.92;
      animRef.current = requestAnimationFrame(momentum);
    };
    momentum();
  };

  // ── keyboard for lightbox
  useEffect(() => {
    const handler = (e) => {
      if (lightbox === null) return;
      if (e.key === "ArrowRight") setLightbox(i => (i + 1) % IMAGES.length);
      if (e.key === "ArrowLeft")  setLightbox(i => (i - 1 + IMAGES.length) % IMAGES.length);
      if (e.key === "Escape")     setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  return (
    <>
      <style>{CSS}</style>

      <section className="gl-root">

        {/* ── Header ── */}
        <div className="gl-header">
          <div className="gl-eyebrow">Portfolio</div>
          <h2 className="gl-title">Our <em>Work</em></h2>
          <p className="gl-sub">Drag to explore · Click to immerse</p>
        </div>

        {/* ── Scroll Track ── */}
        <div
          className={`gl-track-wrap${dragging ? " dragging" : ""}`}
          ref={wrapRef}
          style={{ overflowX: "auto", overflowY: "visible",
                   scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          <div className="gl-track" ref={trackRef}>
            {IMAGES.map((img, i) => (
              <div
                key={i}
                className="gl-card"
                style={{ animationDelay: `${i * 0.09}s` }}
                onClick={() => !dragging && setLightbox(i)}
              >
                {/* big faded index number */}
                <div className="gl-card-idx">0{i + 1}</div>

                <img src={img.src} alt={img.label} draggable={false} />

                {/* corner accents */}
                <span className="gl-corner-br" />

                {/* bottom info */}
                <div className="gl-card-info">
                  <div className="gl-card-num">0{i + 1} / 0{IMAGES.length}</div>
                  <div className="gl-card-label">{img.label}</div>
                  <div className="gl-card-sub">{img.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Progress bar ── */}
        <div className="gl-progress-wrap">
          <span className="gl-progress-count">
            <span>01</span>
          </span>
          <div className="gl-progress-bar">
            <div className="gl-progress-fill" style={{ width: `${scrollPct}%` }} />
          </div>
          <span className="gl-progress-count">
            <span>0{IMAGES.length}</span>
          </span>
        </div>

        {/* ── CTA ── */}
        <div className="gl-cta">
          <button className="gl-cta-btn">
            <span>View All Projects</span>
            <span className="gl-cta-arrow">→</span>
          </button>
        </div>

      </section>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div
          className="gl-lb-overlay"
          onClick={(e) => e.target === e.currentTarget && setLightbox(null)}
        >
          <div className="gl-lb-inner">
            {/* close */}
            <button className="gl-lb-close" onClick={() => setLightbox(null)}>✕</button>

            {/* prev */}
            <button
              className="gl-lb-nav gl-lb-prev"
              onClick={() => setLightbox((lightbox - 1 + IMAGES.length) % IMAGES.length)}
            >‹</button>

            {/* image */}
            <div className="gl-lb-img-wrap">
              <img
                key={lightbox}
                className="gl-lb-img"
                src={IMAGES[lightbox].src}
                alt={IMAGES[lightbox].label}
              />
            </div>

            {/* next */}
            <button
              className="gl-lb-nav gl-lb-next"
              onClick={() => setLightbox((lightbox + 1) % IMAGES.length)}
            >›</button>

            {/* caption */}
            <div className="gl-lb-caption">
              <div className="gl-lb-label">{IMAGES[lightbox].label}</div>
              <div className="gl-lb-sub">{IMAGES[lightbox].sub}</div>
            </div>

            {/* count */}
            <div className="gl-lb-count">
              <strong>0{lightbox + 1}</strong> / 0{IMAGES.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}