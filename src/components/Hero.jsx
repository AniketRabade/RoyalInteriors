// src/components/Hero.jsx
import { useState, useEffect, useRef } from 'react';

const Hero = () => {
  const [currentFrame, setCurrentFrame] = useState(1);
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const rafRef = useRef(null);
  const lastScrollRef = useRef(0);

  const frameCount = 300;
  const framesPath = '/interior';

  const getFramePath = () => {
    const frameNum = String(currentFrame).padStart(3, '0');
    return `${framesPath}/ezgif-frame-${frameNum}.jpg`;
  };

  /* ── Scroll handler ── */
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));

      const framePercent = Math.min(1, percent * 2.5);
      const easedPercent = Math.pow(framePercent, 0.4);
      const frame = Math.floor(easedPercent * (frameCount - 1)) + 1;

      setScrollProgress(percent);
      setCurrentFrame(Math.min(frame, frameCount));
      setHasScrolled(percent > 0.02);
      lastScrollRef.current = percent;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [frameCount]);

  /* ── Mouse parallax ── */
  useEffect(() => {
    const onMove = (e) => {
      rafRef.current && cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setMousePos({
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        });
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => { window.removeEventListener('mousemove', onMove); rafRef.current && cancelAnimationFrame(rafRef.current); };
  }, []);

  const mx = (mousePos.x - 0.5) * 18; // -9 to +9 px
  const my = (mousePos.y - 0.5) * 12;

  const imgScale = 1 + scrollProgress * 0.08;
  const contentOpacity = hasScrolled ? 0 : 1;
  const contentY = hasScrolled ? 50 : 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Jost:wght@200;300;400;500&display=swap');

        * { scrollbar-width: none; -ms-overflow-style: none; }
        *::-webkit-scrollbar { display: none; }
        body { overflow-x: hidden; margin: 0; padding: 0; }

        @keyframes float3d {
          0%,100% { transform: translateY(0px) translateZ(0); }
          50%      { transform: translateY(-14px) translateZ(6px); }
        }
        @keyframes glowPulse {
          0%,100% { opacity:.4; transform:scale(1); }
          50%      { opacity:.7; transform:scale(1.08); }
        }
        @keyframes scrollDot {
          0%   { transform:translateY(0); opacity:1; }
          100% { transform:translateY(22px); opacity:0; }
        }
        @keyframes scanLine {
          0%   { transform:translateY(-100%); }
          100% { transform:translateY(100vh); }
        }
        @keyframes textReveal {
          from { opacity:0; transform:translateY(40px) skewY(2deg); }
          to   { opacity:1; transform:translateY(0) skewY(0deg); }
        }
        @keyframes badgeIn {
          from { opacity:0; transform:translateX(-30px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes cardIn {
          from { opacity:0; transform:translateY(40px) scale(.95); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes particleDrift {
          0%   { transform:translate(0,0) scale(1);   opacity:0; }
          20%  { opacity:1; }
          80%  { opacity:.5; }
          100% { transform:translate(var(--dx),var(--dy)) scale(0); opacity:0; }
        }
        @keyframes cornerExpand {
          from { width:0; height:0; }
          to   { width:50px; height:50px; }
        }

        .hero-card {
          background: rgba(255,255,255,.09);
          border: 1px solid rgba(255,255,255,.2);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-radius: 18px;
          padding: 18px 22px;
          cursor: pointer;
          min-width: 160px;
          text-align: center;
          transition: all .4s cubic-bezier(.2,.8,.4,1);
          animation: cardIn .8s cubic-bezier(.16,1,.3,1) both;
          position: relative;
          overflow: hidden;
        }
        .hero-card.active {
          background: rgba(255,255,255,.92);
          border-color: #c47a42;
          box-shadow: 0 20px 50px -10px rgba(196,122,66,.5);
        }
        .hero-card::before {
          content:'';
          position:absolute;
          inset:0;
          background:linear-gradient(135deg,rgba(196,122,66,.15),transparent);
          opacity:0;
          transition:opacity .4s;
        }
        .hero-card:hover::before { opacity:1; }
        .hero-card:hover { transform: translateY(-10px) scale(1.04) !important; }

        .cta-btn {
          background: linear-gradient(135deg,#c47a42,#a85e2a);
          border: none;
          padding: 1rem 2.8rem;
          border-radius: 60px;
          color: white;
          font-family: 'Jost',sans-serif;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          letter-spacing: 1.5px;
          box-shadow: 0 10px 40px rgba(196,122,66,.45);
          transition: all .35s ease;
          position: relative;
          overflow: hidden;
        }
        .cta-btn::before {
          content:'';
          position:absolute;
          inset:0;
          background:linear-gradient(135deg,rgba(255,255,255,.15),transparent);
          transform:translateX(-100%);
          transition:transform .4s ease;
        }
        .cta-btn:hover::before { transform:translateX(0); }
        .cta-btn:hover { transform:translateY(-3px); box-shadow:0 18px 50px rgba(196,122,66,.55); }
        .cta-btn:active { transform:scale(.97); }
      `}</style>

      <div ref={containerRef} style={{ height: '800vh', position: 'relative' }}>
        <div style={{ height: '100vh', position: 'sticky', top: 0, overflow: 'hidden' }}>

          {/* ── Scan-line cinematic overlay ── */}
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '4px',
            background: 'linear-gradient(180deg, rgba(255,255,255,.06), transparent)',
            zIndex: 5, pointerEvents: 'none',
            animation: 'scanLine 8s linear infinite',
          }} />

          {/* ── Main background frame (mouse parallax) ── */}
          <img
            src={getFramePath()}
            style={{
              width: '105%', height: '105vh',
              objectFit: 'cover',
              position: 'absolute', top: '-2.5%', left: '-2.5%',
              zIndex: 0,
              transform: `scale(${imgScale}) translate(${mx}px, ${my}px)`,
              transition: 'transform .12s ease-out',
              willChange: 'transform',
            }}
            alt="Royal Interiors"
          />

          {/* ── Multi-layer gradient ── */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
            background: `
              linear-gradient(180deg, rgba(10,8,5,.55) 0%, transparent 35%),
              linear-gradient(0deg,   rgba(10,8,5,.7)  0%, transparent 40%),
              linear-gradient(90deg,  rgba(10,8,5,.45) 0%, transparent 55%)
            `,
          }} />

          {/* ── Vignette ── */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,.55) 100%)',
          }} />

          {/* ── Gold progress bar ── */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, height: '2px',
            width: `${scrollProgress * 100}%`,
            background: 'linear-gradient(90deg, #7a3e10, #c47a42, #e8b06a, #c47a42)',
            backgroundSize: '200% 100%',
            zIndex: 10, transition: 'width .05s linear',
            boxShadow: '0 0 12px rgba(196,122,66,.7)',
          }} />

          {/* ── Floating dust particles ── */}
          {Array.from({ length: 16 }).map((_, i) => {
            const size = Math.random() * 3 + 1.5;
            const dur = 6 + Math.random() * 10;
            const del = Math.random() * 8;
            const dx = (Math.random() - .5) * 120;
            const dy = -(50 + Math.random() * 100);
            return (
              <div key={i} style={{
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: size, height: size,
                borderRadius: '50%',
                background: `rgba(196,122,66,${.3 + Math.random() * .5})`,
                zIndex: 2, pointerEvents: 'none',
                '--dx': `${dx}px`, '--dy': `${dy}px`,
                animation: `particleDrift ${dur}s ease-in-out ${del}s infinite`,
                boxShadow: `0 0 ${size * 2}px rgba(196,122,66,.4)`,
              }} />
            );
          })}

          {/* ── Corner ornaments ── */}
          {[
            { top: 24, left: 24, borderTop: '1.5px solid rgba(196,122,66,.7)', borderLeft: '1.5px solid rgba(196,122,66,.7)' },
            { top: 24, right: 24, borderTop: '1.5px solid rgba(196,122,66,.7)', borderRight: '1.5px solid rgba(196,122,66,.7)' },
            { bottom: 24, left: 24, borderBottom: '1.5px solid rgba(196,122,66,.7)', borderLeft: '1.5px solid rgba(196,122,66,.7)' },
            { bottom: 24, right: 24, borderBottom: '1.5px solid rgba(196,122,66,.7)', borderRight: '1.5px solid rgba(196,122,66,.7)' },
          ].map((s, i) => (
            <div key={i} style={{
              position: 'absolute', ...s, zIndex: 4, pointerEvents: 'none',
              animation: `cornerExpand .8s cubic-bezier(.16,1,.3,1) ${.5 + i * .1}s both`,
            }} />
          ))}

          {/* ── Main text content ── */}
          <div style={{
            position: 'absolute', bottom: '18%', left: 0, right: 0,
            zIndex: 6, padding: '0 7%',
            opacity: contentOpacity, transform: `translateY(${contentY}px)`,
            transition: 'opacity .5s ease, transform .5s ease',
            pointerEvents: hasScrolled ? 'none' : 'auto',
          }}>
            <div style={{ maxWidth: 680 }}>

              {/* Badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: 'rgba(196,122,66,.12)',
                border: '1px solid rgba(196,122,66,.35)',
                backdropFilter: 'blur(8px)', borderRadius: 60,
                padding: '6px 18px', marginBottom: '1.8rem',
                animation: 'badgeIn .8s cubic-bezier(.16,1,.3,1) .3s both',
              }}>
                <span style={{ color: '#c47a42', fontSize: 10 }}>◆</span>
                <span style={{ fontFamily: "'Jost',sans-serif", fontSize: '.68rem', letterSpacing: '3px', color: 'rgba(255,255,255,.85)', fontWeight: 300 }}>
                  EST. 2002 · PREMIUM INTERIORS
                </span>
                <span style={{ color: '#c47a42', fontSize: 10 }}>◆</span>
              </div>

              {/* Headline */}
              <div style={{ overflow: 'hidden', marginBottom: '0.4rem' }}>
                <h1 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                  fontWeight: 700, color: '#f5ebd8',
                  lineHeight: 1.05, margin: 0,
                  textShadow: '0 4px 30px rgba(0,0,0,.35)',
                  letterSpacing: '-0.01em',
                  animation: 'textReveal .9s cubic-bezier(.16,1,.3,1) .5s both',
                }}>
                  Royal{' '}
                  <em style={{
                    fontStyle: 'italic', fontWeight: 400,
                    background: 'linear-gradient(135deg, #e8b06a, #c47a42)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>Interiors</em>
                </h1>
              </div>

              {/* Sub line */}
              <div style={{ overflow: 'hidden', marginBottom: '2.2rem' }}>
                <p style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
                  color: 'rgba(255,255,255,.7)',
                  margin: 0, fontWeight: 300, letterSpacing: '.5px',
                  animation: 'textReveal .9s cubic-bezier(.16,1,.3,1) .7s both',
                }}>
                  Shaping workspaces with integrity &amp; timeless style
                </p>
              </div>

              {/* CTA */}
              <div style={{ animation: 'textReveal .9s cubic-bezier(.16,1,.3,1) .9s both' }}>
                <button className="cta-btn">
                  Explore Portfolio &nbsp;→
                </button>
              </div>
            </div>
          </div>

          {/* ── Style selector cards ── */}
          <div style={{
            position: 'absolute', bottom: '4%',
            left: '50%', transform: 'translateX(-50%)',
            display: 'flex', gap: '1.2rem', zIndex: 6,
            flexWrap: 'wrap', justifyContent: 'center',
            opacity: contentOpacity,
            transition: 'opacity .5s ease',
            pointerEvents: hasScrolled ? 'none' : 'auto',
          }}>
           
          </div>

          {/* ── Scroll indicator ── */}
          <div style={{
            position: 'absolute', bottom: '5%', right: '5%', zIndex: 6,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
            opacity: hasScrolled ? 0 : 1, transition: 'opacity .4s ease',
          }}>
            <div style={{
              width: 1, height: 60,
              background: 'linear-gradient(180deg, transparent, rgba(196,122,66,.8))',
            }} />
            <div style={{
              width: 30, height: 50,
              border: '1px solid rgba(196,122,66,.5)',
              borderRadius: 30, position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                width: 3, height: 8, borderRadius: 2,
                background: '#c47a42', margin: '8px auto 0',
                animation: 'scrollDot 1.6s ease-in-out infinite',
              }} />
            </div>
            <p style={{
              fontFamily: "'Jost',sans-serif",
              fontSize: '.6rem', color: 'rgba(196,122,66,.6)',
              letterSpacing: '3px', textTransform: 'uppercase',
              writingMode: 'vertical-rl', margin: 0,
            }}>Scroll</p>
          </div>

        </div>
      </div>
    </>
  );
};

export default Hero;