// src/components/OurClients.jsx
import { motion } from 'framer-motion';

const clients = [
  { name: 'FEV', tag: 'Engineering' },
  { name: 'SANDVIK', tag: 'Industrial' },
  { name: 'KANTHAL', tag: 'Sandvik Group' },
  { name: 'Herbayu', tag: 'Wellness' },
  { name: 'China Express', tag: 'F&B' },
  { name: 'Leicester Denim', tag: 'Fashion' },
  { name: 'CREDR', tag: 'Automotive' },
  { name: 'Vodlo', tag: 'Tech' },
  { name: 'Grupo Antolin', tag: 'Mobility' },
  { name: "Kapil's Salon", tag: 'Beauty' },
  { name: 'Paa Roti', tag: 'F&B' },
  { name: 'ALARD', tag: 'Education' },
  { name: 'Atlas Copco', tag: 'Industrial' },
  { name: 'Crazy Doughnuts', tag: 'F&B' },
  { name: 'BIGBOX', tag: 'Retail' },
];

/* Duplicate for seamless loop */
const row = [...clients, ...clients, ...clients];

const ClientChip = ({ name, tag }) => (
  <div style={{
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '160px',
    padding: '18px 28px',
    margin: '0 10px',
    borderRadius: '16px',
    background: 'white',
    border: '1px solid rgba(196,122,66,0.15)',
    boxShadow: '0 4px 20px rgba(196,122,66,0.07)',
    flexShrink: 0,
    transition: 'all 0.3s ease',
    cursor: 'default',
    position: 'relative',
    overflow: 'hidden',
  }}>
    {/* Shimmer strip on top */}
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0,
      height: '2px',
      background: 'linear-gradient(90deg, transparent, #c47a42, transparent)',
      opacity: 0.5,
    }} />
    <span style={{
      fontSize: '1rem',
      fontWeight: '800',
      color: '#17392d',
      letterSpacing: '-0.3px',
      fontFamily: '"Playfair Display", serif',
      whiteSpace: 'nowrap',
    }}>
      {name}
    </span>
    <span style={{
      fontSize: '0.6rem',
      fontWeight: '600',
      color: '#c47a42',
      letterSpacing: '2.5px',
      marginTop: '4px',
      textTransform: 'uppercase',
    }}>
      {tag}
    </span>
  </div>
);

const OurClients = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');

        .clients-section * { box-sizing: border-box; font-family: 'DM Sans', sans-serif; }

        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-left 35s linear infinite;
        }
        .marquee-track-reverse {
          display: flex;
          width: max-content;
          animation: marquee-right 40s linear infinite;
        }
        .marquee-track:hover,
        .marquee-track-reverse:hover {
          animation-play-state: paused;
        }

        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }

        .client-chip:hover {
          transform: translateY(-4px) scale(1.03);
          box-shadow: 0 12px 36px rgba(196,122,66,0.18) !important;
          border-color: rgba(196,122,66,0.4) !important;
        }

        @keyframes pulse-dot {
          0%,100% { box-shadow: 0 0 6px rgba(196,122,66,0.8); }
          50%      { box-shadow: 0 0 14px rgba(196,122,66,1), 0 0 22px rgba(196,122,66,0.4); }
        }
      `}</style>

      <section className="clients-section" style={{
        background: '#f4f1eb',
        padding: '100px 0 110px',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* Noise grain */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.025, pointerEvents: 'none', zIndex: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }} />

        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(196,122,66,0.08) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }} />

        {/* Ambient glow blobs */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '-10%', right: '-5%',
            width: 450, height: 450, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(196,122,66,0.1), transparent 70%)',
            filter: 'blur(70px)', zIndex: 0, pointerEvents: 'none',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          style={{
            position: 'absolute', bottom: '-5%', left: '-5%',
            width: 400, height: 400, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(23,57,45,0.08), transparent 70%)',
            filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none',
          }}
        />

        {/* Watermark */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '140px', fontWeight: 900, opacity: 0.025,
          letterSpacing: '14px', pointerEvents: 'none', userSelect: 'none',
          fontFamily: '"Playfair Display", serif', whiteSpace: 'nowrap',
          color: '#17392d', zIndex: 0,
        }}>
          CLIENTS
        </div>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '60px', position: 'relative', zIndex: 2, padding: '0 5%' }}
        >
          {/* Pill badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(196,122,66,0.1)',
              border: '1px solid rgba(196,122,66,0.3)',
              borderRadius: '40px', padding: '6px 18px', marginBottom: '22px',
            }}
          >
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#c47a42', display: 'inline-block',
              animation: 'pulse-dot 2s infinite',
            }} />
            <span style={{ color: '#c47a42', fontSize: '0.68rem', letterSpacing: '4px', fontWeight: '600' }}>
              TRUSTED BY MANY
            </span>
          </motion.div>

          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontFamily: '"Playfair Display", serif',
            color: '#17392d', margin: '0 0 14px',
            fontWeight: '900', letterSpacing: '-1px', lineHeight: 1.1,
          }}>
            Our{' '}
            <span style={{
              background: 'linear-gradient(135deg, #c47a42, #e8a96a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Clients
            </span>
          </h2>

          <p style={{
            color: 'rgba(23,57,45,0.5)', fontSize: '0.92rem',
            maxWidth: 400, margin: '0 auto', lineHeight: 1.7,
            fontStyle: 'italic',
          }}>
            Our premium clients who trusted us.
          </p>

          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            style={{
              width: 64, height: 2, margin: '20px auto 0',
              background: 'linear-gradient(90deg, transparent, #c47a42, transparent)',
              borderRadius: 2, transformOrigin: 'center',
              boxShadow: '0 0 10px rgba(196,122,66,0.6)',
            }}
          />
        </motion.div>

        {/* ── Marquee Row 1 → Left ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          style={{ position: 'relative', zIndex: 2, overflow: 'hidden', marginBottom: '20px' }}
        >
          {/* Left fade */}
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px', zIndex: 3,
            background: 'linear-gradient(to right, #f4f1eb, transparent)',
            pointerEvents: 'none',
          }} />
          {/* Right fade */}
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px', zIndex: 3,
            background: 'linear-gradient(to left, #f4f1eb, transparent)',
            pointerEvents: 'none',
          }} />

          <div className="marquee-track" style={{ padding: '12px 0' }}>
            {row.map((c, i) => (
              <div key={i} className="client-chip" style={{
                display: 'inline-flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                minWidth: '168px', padding: '18px 28px', margin: '0 10px',
                borderRadius: '16px', background: 'white',
                border: '1px solid rgba(196,122,66,0.15)',
                boxShadow: '0 4px 20px rgba(196,122,66,0.07)',
                flexShrink: 0, position: 'relative', overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: 'linear-gradient(90deg, transparent, #c47a42, transparent)',
                  opacity: 0.45,
                }} />
                <span style={{
                  fontSize: '1rem', fontWeight: '800', color: '#17392d',
                  letterSpacing: '-0.3px', fontFamily: '"Playfair Display", serif',
                  whiteSpace: 'nowrap',
                }}>
                  {c.name}
                </span>
                <span style={{
                  fontSize: '0.58rem', fontWeight: '600', color: '#c47a42',
                  letterSpacing: '2.5px', marginTop: '5px', textTransform: 'uppercase',
                }}>
                  {c.tag}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Marquee Row 2 → Right (reverse) ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          viewport={{ once: true }}
          style={{ position: 'relative', zIndex: 2, overflow: 'hidden' }}
        >
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px', zIndex: 3,
            background: 'linear-gradient(to right, #f4f1eb, transparent)', pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px', zIndex: 3,
            background: 'linear-gradient(to left, #f4f1eb, transparent)', pointerEvents: 'none',
          }} />

          <div className="marquee-track-reverse" style={{ padding: '12px 0' }}>
            {[...row].reverse().map((c, i) => (
              <div key={i} className="client-chip" style={{
                display: 'inline-flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                minWidth: '168px', padding: '18px 28px', margin: '0 10px',
                borderRadius: '16px',
                background: i % 3 === 0
                  ? 'linear-gradient(135deg, #17392d, #1f4a38)'
                  : i % 3 === 1
                  ? 'linear-gradient(135deg, #c47a42, #d98c52)'
                  : 'white',
                border: '1px solid rgba(196,122,66,0.12)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                flexShrink: 0, position: 'relative', overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: i % 3 === 0
                    ? 'linear-gradient(90deg, transparent, #c47a42, transparent)'
                    : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                  opacity: 0.6,
                }} />
                <span style={{
                  fontSize: '1rem', fontWeight: '800',
                  color: i % 3 === 2 ? '#17392d' : 'white',
                  letterSpacing: '-0.3px', fontFamily: '"Playfair Display", serif',
                  whiteSpace: 'nowrap',
                }}>
                  {c.name}
                </span>
                <span style={{
                  fontSize: '0.58rem', fontWeight: '600',
                  color: i % 3 === 2 ? '#c47a42' : 'rgba(255,255,255,0.7)',
                  letterSpacing: '2.5px', marginTop: '5px', textTransform: 'uppercase',
                }}>
                  {c.tag}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Bottom count badge ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center', marginTop: '52px',
            position: 'relative', zIndex: 2,
          }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '20px',
            background: 'white', borderRadius: '50px', padding: '14px 32px',
            boxShadow: '0 8px 30px rgba(196,122,66,0.12)',
            border: '1px solid rgba(196,122,66,0.2)',
          }}>
            <span style={{
              fontSize: '1.6rem', fontWeight: '900', color: '#c47a42',
              fontFamily: '"Playfair Display", serif',
              textShadow: '0 2px 10px rgba(196,122,66,0.3)',
            }}>
              15+
            </span>
            <div style={{ width: 1, height: 30, background: 'rgba(196,122,66,0.2)' }} />
            <span style={{
              fontSize: '0.78rem', fontWeight: '600',
              color: 'rgba(23,57,45,0.6)', letterSpacing: '2px',
            }}>
              PREMIUM BRANDS SERVED
            </span>
            <div style={{ width: 1, height: 30, background: 'rgba(196,122,66,0.2)' }} />
            <span style={{
              fontSize: '1.6rem', fontWeight: '900', color: '#17392d',
              fontFamily: '"Playfair Display", serif',
            }}>
              8+
            </span>
            <span style={{
              fontSize: '0.78rem', fontWeight: '600',
              color: 'rgba(23,57,45,0.6)', letterSpacing: '2px',
            }}>
              CITIES
            </span>
          </div>
        </motion.div>

      </section>
    </>
  );
};

export default OurClients;