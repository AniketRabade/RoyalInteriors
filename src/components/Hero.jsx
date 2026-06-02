import { useEffect, useRef, useState } from "react";
import heroVideo from "../assets/hero.mp4";

const Hero = () => {
  const videoRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [videoError, setVideoError] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    
    const handleCanPlay = () => {
      console.log("Video can play");
      setLoaded(true);
      v.play().catch(err => console.log("Play error:", err));
    };
    
    const handleError = (e) => {
      console.error("Video error:", e);
      setVideoError(true);
      setLoaded(true);
    };
    
    v.muted = true;
    v.playsInline = true;
    v.loop = true;
    v.volume = 0;
    
    v.addEventListener("canplay", handleCanPlay);
    v.addEventListener("loadeddata", handleCanPlay);
    v.addEventListener("error", handleError);
    
    if (v.readyState >= 2) {
      handleCanPlay();
    }
    
    const playAttempt = setTimeout(() => {
      if (!loaded) {
        v.play().then(() => {
          setLoaded(true);
        }).catch(err => {
          console.log("Autoplay prevented:", err);
          setLoaded(true);
        });
      }
    }, 100);
    
    return () => {
      v.removeEventListener("canplay", handleCanPlay);
      v.removeEventListener("loadeddata", handleCanPlay);
      v.removeEventListener("error", handleError);
      clearTimeout(playAttempt);
    };
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setMousePos({
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        });
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const mx = (mousePos.x - 0.5) * 24;
  const my = (mousePos.y - 0.5) * 16;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Jost:wght@200;300;400;500&display=swap');

        .hero-root, .hero-root * { box-sizing: border-box; }
        .hero-root { font-family: 'Jost', sans-serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%, 100% { opacity: .55; }
          50%      { opacity: 1; }
        }
        @keyframes lineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes loaderFade {
          to { opacity: 0; visibility: hidden; }
        }
        @keyframes scrollDot {
          0%   { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(22px); opacity: 0; }
        }
        @keyframes grain {
          0%   { transform: translate(0,0); }
          25%  { transform: translate(-2%,1%); }
          50%  { transform: translate(1%,-2%); }
          75%  { transform: translate(-1%,2%); }
          100% { transform: translate(0,0); }
        }

        .hero-video {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform .5s cubic-bezier(.2,.8,.4,1), opacity 1.2s ease;
          will-change: transform, filter;
          filter: contrast(1.12) saturate(1.2) brightness(1.05);
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
          backface-visibility: hidden;
          transform-style: preserve-3d;
          -webkit-transform: translateZ(0);
        }
        @media (min-resolution: 2dppx) {
          .hero-video { filter: contrast(1.14) saturate(1.22) brightness(1.06) unsharp-mask(.5); }
        }

        .gold-text {
          background: linear-gradient(135deg, #d6a256 0%, #f4d99a 45%, #c8862d 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        .cta-btn {
          background: transparent;
          border: 1px solid rgba(214,162,86,.6);
          padding: 1rem 2.6rem;
          color: #f4d99a;
          font-family: 'Jost', sans-serif;
          font-size: .78rem;
          font-weight: 400;
          cursor: pointer;
          letter-spacing: 4px;
          text-transform: uppercase;
          transition: all .4s ease;
          position: relative;
          overflow: hidden;
        }
        .cta-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, #d6a256, #c8862d);
          transform: translateY(101%);
          transition: transform .45s cubic-bezier(.7,.05,.3,1);
          z-index: -1;
        }
        .cta-btn:hover { color: #0a0606; border-color: #d6a256; }
        .cta-btn:hover::before { transform: translateY(0); }

        .grain {
          position: absolute; inset: -50%;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .35 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/></svg>");
          opacity: .12;
          mix-blend-mode: overlay;
          pointer-events: none;
          animation: grain 1.4s steps(4) infinite;
          z-index: 6;
        }
      `}</style>

      <section
        className="hero-root"
        style={{
          position: "relative",
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          background: "#0a0606",
        }}
      >
        <video
          ref={videoRef}
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="hero-video"
          style={{
            transform: `translate3d(${mx}px, ${my}px, 0) scale(1.04)`,
            opacity: loaded ? 1 : 0,
          }}
        />

        {videoError && (
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, #1a1a1a 0%, #0a0606 100%)",
            zIndex: 1,
          }} />
        )}

        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2,
          background: "linear-gradient(180deg, rgba(10,6,6,.55) 0%, rgba(10,6,6,.15) 35%, rgba(10,6,6,.35) 65%, rgba(10,6,6,.9) 100%)",
        }} />
        
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2,
          background: "radial-gradient(ellipse at 50% 55%, transparent 0%, rgba(0,0,0,.7) 100%)",
        }} />

        <div className="grain" />

        {[
          { top: 28, left: 28, borderTop: "1px solid rgba(214,162,86,.55)", borderLeft: "1px solid rgba(214,162,86,.55)" },
          { top: 28, right: 28, borderTop: "1px solid rgba(214,162,86,.55)", borderRight: "1px solid rgba(214,162,86,.55)" },
          { bottom: 28, left: 28, borderBottom: "1px solid rgba(214,162,86,.55)", borderLeft: "1px solid rgba(214,162,86,.55)" },
          { bottom: 28, right: 28, borderBottom: "1px solid rgba(214,162,86,.55)", borderRight: "1px solid rgba(214,162,86,.55)" },
        ].map((s, i) => (
          <div key={i} style={{ position: "absolute", width: 56, height: 56, zIndex: 10, pointerEvents: "none", ...s }} />
        ))}

        {!loaded && (
          <div style={{
            position: "absolute", inset: 0, zIndex: 30,
            background: "#0a0606",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
          }}>
            <h2 className="gold-text" style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              letterSpacing: "12px",
              margin: 0,
            }}>
              ROYAL INTERIORS
            </h2>
            <div style={{
              width: 180, height: 1, marginTop: 18,
              background: "linear-gradient(90deg, transparent, #d6a256, transparent)",
              transformOrigin: "left center",
              animation: "lineGrow 1.4s ease-out forwards",
            }} />
            <p style={{
              marginTop: 16, color: "rgba(244,217,154,.7)",
              fontSize: ".65rem", letterSpacing: "5px",
              animation: "shimmer 1.8s ease-in-out infinite",
            }}>
              PREPARING YOUR EXPERIENCE
            </p>
          </div>
        )}

        <header style={{
          position: "absolute", top: 0, left: 0, right: 0, zIndex: 12,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "1.8rem 3rem",
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s 1.3s ease",
        }}>
          <span className="gold-text" style={{
            fontFamily: "'Cormorant Garamond', serif",
            letterSpacing: "6px", fontSize: ".95rem",
          }}>
            R · I
          </span>
          <nav style={{ display: "flex", gap: 36 }}>
            {["Collection", "Atelier", "Journal", "Contact"].map((l) => (
              <a key={l} href="#" style={{
                color: "rgba(255,255,255,.75)", textDecoration: "none",
                fontSize: ".7rem", letterSpacing: "3px", textTransform: "uppercase",
              }}>{l}</a>
            ))}
          </nav>
        </header>

        <div style={{
          position: "absolute", inset: 0, zIndex: 8,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          textAlign: "center", padding: "0 1.5rem",
        }}>
          <span style={{
            color: "#d6a256",
            fontSize: ".7rem", letterSpacing: "8px",
            textTransform: "uppercase", marginBottom: "2rem",
            opacity: loaded ? 1 : 0,
            animation: loaded ? "fadeUp 1s 1.4s both" : "none",
          }}>
            ◆ &nbsp; Est. 2002 &nbsp; ◆
          </span>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(2.8rem, 9vw, 8rem)",
            lineHeight: .95, margin: 0,
            color: "#fff", letterSpacing: "-1px",
            opacity: loaded ? 1 : 0,
            animation: loaded ? "fadeUp 1.2s 1.6s both" : "none",
          }}>
            Timeless <em className="gold-text" style={{ fontStyle: "italic", fontWeight: 400 }}>Interiors</em>
          </h1>

          <div style={{
            width: 80, height: 1, margin: "2rem 0",
            background: "linear-gradient(90deg, transparent, #d6a256, transparent)",
            opacity: loaded ? 1 : 0,
            transition: "opacity 1s 2s ease",
          }} />

          <p style={{
            fontFamily: "'Jost', sans-serif", fontWeight: 300,
            fontSize: "clamp(.85rem, 1.2vw, 1rem)",
            color: "rgba(255,255,255,.78)",
            maxWidth: 540, letterSpacing: "2px",
            lineHeight: 1.8,
            opacity: loaded ? 1 : 0,
            animation: loaded ? "fadeUp 1s 2.1s both" : "none",
          }}>
            Crafted spaces that honour quiet luxury, heritage craftsmanship,
            and the rituals of refined living.
          </p>

          <button className="cta-btn" style={{
            marginTop: "2.5rem",
            opacity: loaded ? 1 : 0,
            animation: loaded ? "fadeUp 1s 2.4s both" : "none",
          }}>
            Discover the Collection
          </button>
        </div>

        <div style={{
          position: "absolute", bottom: 32, left: "50%",
          transform: "translateX(-50%)", zIndex: 9,
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 10,
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s 2.6s ease",
        }}>
          <span style={{
            fontSize: ".6rem", letterSpacing: "5px",
            color: "rgba(244,217,154,.7)", textTransform: "uppercase",
          }}>Scroll</span>
          <div style={{
            width: 22, height: 36,
            border: "1px solid rgba(244,217,154,.5)",
            borderRadius: 12,
            display: "flex", justifyContent: "center", paddingTop: 6,
          }}>
            <div style={{
              width: 2, height: 8, borderRadius: 2,
              background: "#d6a256",
              animation: "scrollDot 1.6s ease-in-out infinite",
            }} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;