// src/components/Services.jsx
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';

const services = [
  {
    id: 1,
    title: 'Space Planning',
    description: 'Optimized layouts that enhance workflow and maximize every square foot of your workspace.',
    image: '/services/service-1.png',
    accent: '#e11d48',
    glow: 'rgba(225,29,72,0.35)',
    tag: 'LAYOUT & FLOW',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 36, height: 36 }}>
        <rect x="4" y="4" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="22" y="4" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="4" y="22" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="22" y="22" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    )
  },
  {
    id: 2,
    title: 'Color Consultation',
    description: 'Expert color psychology and material selection to reflect your brand identity perfectly.',
    accent: '#f59e0b',
    glow: 'rgba(245,158,11,0.35)',
    image: '/services/service-2.png',
    tag: 'PALETTE & MOOD',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 36, height: 36 }}>
        <circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M20 5 A15 15 0 0 1 35 20" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="20" cy="20" r="5" fill="currentColor" opacity="0.4"/>
        <path d="M12 12 L20 20 M28 12 L20 20 M20 28 L20 20" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    )
  },
  {
    id: 3,
    title: 'Custom Furniture',
    description: 'Bespoke furniture and fixtures designed specifically for your space and unique needs.',
    accent: '#10b981',
    glow: 'rgba(16,185,129,0.35)',
    image: '/services/service-3.png',
    tag: 'CRAFT & FORM',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 36, height: 36 }}>
        <path d="M6 28 H34 V32 H6 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M10 28 V24 H30 V28" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 32 V36 M32 32 V36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="14" y="16" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    )
  },
  {
    id: 4,
    title: 'Project Management',
    description: 'End-to-end execution with full transparency, on-time delivery, and quality craftsmanship.',
    accent: '#8b5cf6',
    glow: 'rgba(139,92,246,0.35)',
    image: '/services/service-4.png',
    tag: 'DELIVERY & CARE',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 36, height: 36 }}>
        <circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M20 10 V20 L27 27" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="20" cy="20" r="2" fill="currentColor"/>
      </svg>
    )
  }
];

/* ── 3D Tilt Card ─────────────────────────────── */
const TiltCard = ({ service, index }) => {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 180, damping: 20 });
  const springY = useSpring(y, { stiffness: 180, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-12deg', '12deg']);
  const glowX = useTransform(springX, [-0.5, 0.5], ['0%', '100%']);
  const glowY = useTransform(springY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(nx);
    y.set(ny);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
    setRevealed(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { setHovered(true); setTimeout(() => setRevealed(true), 80); }}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '800px',
        transformStyle: 'preserve-3d',
        cursor: 'pointer',
        position: 'relative',
        zIndex: hovered ? 10 : 1
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          borderRadius: '24px',
          overflow: 'hidden',
          height: '440px',
          position: 'relative',
          background: '#0e0e0e',
          border: `1px solid rgba(255,255,255,0.06)`,
          boxShadow: hovered
            ? `0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px ${service.accent}55, 0 0 60px ${service.glow}`
            : '0 8px 32px rgba(0,0,0,0.4)'
        }}
        transition={{ boxShadow: { duration: 0.3 } }}
      >
        {/* Background image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${service.image})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: hovered ? 0.18 : 0.25,
          transition: 'opacity 0.5s ease',
          zIndex: 0
        }} />

        {/* Static dark gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(160deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%)`,
          zIndex: 1
        }} />

        {/* Dynamic mouse-follow glow */}
        <motion.div
          style={{
            position: 'absolute', inset: 0, zIndex: 2,
            backgroundImage: `radial-gradient(circle at ${glowX} ${glowY}, ${service.glow} 0%, transparent 65%)`,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.4s ease'
          }}
        />

        {/* Reveal overlay: slides from bottom */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: revealed ? '0%' : '100%' }}
          transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
          style={{
            position: 'absolute', inset: 0, zIndex: 3,
            background: `linear-gradient(170deg, rgba(0,0,0,0.92) 0%, ${service.accent}22 60%, ${service.accent}44 100%)`,
          }}
        />

        {/* Shimmering top border */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: '2px', transformOrigin: 'left',
            background: `linear-gradient(90deg, transparent, ${service.accent}, ${service.accent}88, transparent)`,
            zIndex: 10,
            boxShadow: `0 0 12px ${service.accent}`
          }}
        />

        {/* Card inner content */}
        <div style={{
          position: 'relative', zIndex: 5,
          height: '100%', display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between', padding: '32px 28px'
        }}>
          {/* Top: Tag + Icon */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <motion.span
              animate={{ opacity: hovered ? 1 : 0.4, x: hovered ? 0 : -6 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              style={{
                fontSize: '0.62rem', letterSpacing: '4px',
                color: service.accent, fontWeight: '700',
                background: `${service.accent}18`,
                padding: '5px 10px', borderRadius: '4px',
                border: `1px solid ${service.accent}33`
              }}
            >
              {service.tag}
            </motion.span>

            <motion.div
              animate={{
                rotateY: hovered ? 360 : 0,
                color: hovered ? service.accent : 'rgba(255,255,255,0.3)'
              }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              {service.icon}
            </motion.div>
          </div>

          {/* Number badge */}
          <motion.div
            animate={{
              opacity: hovered ? 0 : 1,
              scale: hovered ? 0.6 : 1
            }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'absolute',
              bottom: 90, left: 28,
              fontSize: '5.5rem',
              fontWeight: '900',
              color: 'rgba(255,255,255,0.03)',
              lineHeight: 1,
              userSelect: 'none',
              fontFamily: '"Playfair Display", serif',
              letterSpacing: '-4px'
            }}
          >
            0{index + 1}
          </motion.div>

          {/* Bottom content */}
          <div>
            {/* Static title */}
            <motion.div
              animate={{ opacity: revealed ? 0 : 1, y: revealed ? 8 : 0 }}
              transition={{ duration: 0.2 }}
              style={{ position: 'absolute', bottom: 32, left: 28, right: 28 }}
            >
              <div style={{
                fontSize: '0.65rem', letterSpacing: '3px',
                color: 'rgba(255,255,255,0.35)', marginBottom: '8px'
              }}>
                / 0{index + 1}
              </div>
              <h3 style={{
                fontSize: '1.5rem', color: 'white',
                fontWeight: '700', margin: 0,
                fontFamily: '"Playfair Display", serif',
                letterSpacing: '-0.3px'
              }}>
                {service.title}
              </h3>
            </motion.div>

            {/* Hover-revealed content */}
            <motion.div
              animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 24 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              style={{ position: 'absolute', bottom: 28, left: 28, right: 28 }}
            >
              <div style={{
                fontSize: '0.62rem', letterSpacing: '3px',
                color: service.accent, marginBottom: '10px', fontWeight: '600'
              }}>
                / 0{index + 1}
              </div>
              <h3 style={{
                fontSize: '1.5rem', color: 'white',
                fontWeight: '700', marginBottom: '10px',
                fontFamily: '"Playfair Display", serif',
                letterSpacing: '-0.3px'
              }}>
                {service.title}
              </h3>
              <p style={{
                fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.65, marginBottom: '18px', margin: '0 0 18px'
              }}>
                {service.description}
              </p>

              {/* CTA pill */}
              <motion.div
                animate={{ x: revealed ? 0 : -10, opacity: revealed ? 1 : 0 }}
                transition={{ duration: 0.35, delay: 0.22 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: `${service.accent}22`,
                  border: `1px solid ${service.accent}55`,
                  borderRadius: '30px', padding: '7px 16px'
                }}
              >
                <span style={{
                  color: service.accent, fontSize: '0.68rem',
                  fontWeight: '700', letterSpacing: '1.5px'
                }}>
                  DISCOVER MORE
                </span>
                <motion.span
                  animate={{ x: revealed ? [0, 4, 0] : 0 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ color: service.accent, fontSize: '0.9rem' }}
                >
                  →
                </motion.span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* 3D floating depth layer on card corner */}
        <motion.div
          style={{
            position: 'absolute', top: 20, right: 20,
            width: 60, height: 60, borderRadius: '50%',
            background: `radial-gradient(circle, ${service.accent}22, transparent 70%)`,
            transform: 'translateZ(30px)',
            filter: 'blur(10px)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.4s ease',
            zIndex: 4
          }}
        />
      </motion.div>

      {/* Reflection / shadow blob underneath */}
      <motion.div
        animate={{
          scaleX: hovered ? 0.8 : 0.6,
          opacity: hovered ? 0.25 : 0.1
        }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute',
          bottom: -24, left: '10%', right: '10%',
          height: 40, borderRadius: '50%',
          background: service.accent,
          filter: 'blur(22px)',
          zIndex: 0
        }}
      />
    </motion.div>
  );
};

/* ── Main Section ─────────────────────────────── */
const Services = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .services-section * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;
          max-width: 1440px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
          perspective: 1200px;
        }
        @media (max-width: 1200px) { .services-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 680px)  { .services-grid { grid-template-columns: 1fr; } }
      `}</style>

      <section
        className="services-section"
        style={{
          padding: '120px 5%',
          background: '#070707',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Noise grain overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat', backgroundSize: '200px 200px'
        }} />

        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '44px 44px'
        }} />

        {/* Large ambient glow – left */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '0%', left: '-10%',
            width: 500, height: 500, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.07), transparent 70%)',
            filter: 'blur(80px)', zIndex: 0
          }}
        />

        {/* Large ambient glow – right */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{
            position: 'absolute', bottom: '0%', right: '-5%',
            width: 600, height: 600, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(225,29,72,0.08), transparent 70%)',
            filter: 'blur(90px)', zIndex: 0
          }}
        />

        {/* ── Section Header ── */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', marginBottom: '72px' }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            {/* Pill badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'rgba(225,29,72,0.1)',
                border: '1px solid rgba(225,29,72,0.3)',
                borderRadius: '40px', padding: '6px 18px',
                marginBottom: '24px'
              }}
            >
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: '#e11d48',
                boxShadow: '0 0 8px #e11d48',
                display: 'inline-block'
              }} />
              <span style={{
                color: '#e11d48', fontSize: '0.68rem',
                letterSpacing: '4px', fontWeight: '600'
              }}>
                OUR EXPERTISE
              </span>
            </motion.div>

            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontFamily: '"Playfair Display", serif',
              color: 'white', margin: '0 0 12px',
              fontWeight: '900', letterSpacing: '-1px', lineHeight: 1.1
            }}>
              Premium{' '}
              <span style={{
                background: 'linear-gradient(135deg, #e11d48, #ff6b6b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Services
              </span>
            </h2>

            <p style={{
              color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem',
              maxWidth: 420, margin: '12px auto 0', lineHeight: 1.7
            }}>
              Thoughtful design, meticulous execution — every project crafted to exceed expectations.
            </p>

            {/* Animated underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              style={{
                width: 64, height: 2, margin: '24px auto 0',
                background: 'linear-gradient(90deg, transparent, #e11d48, transparent)',
                borderRadius: 2, transformOrigin: 'center',
                boxShadow: '0 0 10px #e11d48'
              }}
            />
          </motion.div>
        </div>

        {/* ── Cards Grid ── */}
        <div className="services-grid">
          {services.map((service, i) => (
            <TiltCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* Bottom label row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            gap: '32px', marginTop: '60px',
            position: 'relative', zIndex: 2, flexWrap: 'wrap'
          }}
        >
          {['10+ Years Experience', '500+ Projects', '98% Client Satisfaction', 'Award Winning'].map((label, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                width: 5, height: 5, borderRadius: '50%',
                background: '#e11d48', display: 'inline-block',
                boxShadow: '0 0 6px #e11d48'
              }} />
              <span style={{
                color: 'rgba(255,255,255,0.35)',
                fontSize: '0.72rem', letterSpacing: '2px', fontWeight: '500'
              }}>
                {label}
              </span>
            </div>
          ))}
        </motion.div>

      </section>
    </>
  );
};

export default Services;