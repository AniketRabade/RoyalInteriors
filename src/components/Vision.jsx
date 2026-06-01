// src/components/Vision.jsx
import { motion, useMotionValue, useSpring, useTransform, useScroll, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const locations = ["PUNE","SURAT","RAIPUR","HYDERABAD","HOSUR","BANGALORE","UDAIPUR","BHOPAL"];

/* ── Animated counter ── */
const Counter = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = parseInt(target);
    const duration = 1800;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

/* ── 3D Tilt Card ── */
const TiltCard = ({ children, style = {} }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 22 });
  const sy = useSpring(y, { stiffness: 200, damping: 22 });
  const rotateX = useTransform(sy, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(sx, [-0.5, 0.5], ["-10deg", "10deg"]);
  const [hovered, setHovered] = useState(false);

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { x.set(0); y.set(0); setHovered(false); }}
      style={{
        perspective: "800px",
        transformStyle: "preserve-3d",
        cursor: "default",
        ...style
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          boxShadow: hovered
            ? "0 32px 70px rgba(196,122,66,0.22), 0 0 0 1.5px rgba(196,122,66,0.3)"
            : "0 15px 40px rgba(0,0,0,0.08)",
          transition: "box-shadow 0.3s ease",
          borderRadius: "20px",
          background: "white",
          overflow: "hidden"
        }}
      >
        {children}

        {/* Shimmer top border */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.32,0.72,0,1] }}
          style={{
            position: "absolute", top: 0, left: 0, right: 0,
            height: "3px", transformOrigin: "left",
            background: "linear-gradient(90deg, transparent, #c47a42, #e8a96a, transparent)",
            borderRadius: "2px", boxShadow: "0 0 10px rgba(196,122,66,0.6)"
          }}
        />

        {/* Inner glow on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute", inset: 0, borderRadius: "20px", pointerEvents: "none",
            background: "radial-gradient(ellipse at top left, rgba(196,122,66,0.06), transparent 60%)"
          }}
        />
      </motion.div>
    </motion.div>
  );
};

/* ── Floating image showcase ── */
const ImageShowcase = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-20, 40]);
  const y3 = useTransform(scrollYProgress, [0, 1], [60, -20]);

  return (
    <motion.div
      ref={ref}
      className="image-showcase"
      initial={{ opacity: 0, scale: 0.88, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      style={{ position: "relative", height: 420 }}
    >
      {/* img 1 */}
      <motion.div style={{ y: y1, position: "absolute", top: 0, left: 20, width: 260, height: 180, borderRadius: 18, overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.14)", zIndex: 2 }}
        whileHover={{ scale: 1.04, zIndex: 10, transition: { duration: 0.3 } }}>
        <motion.img src="/vision/vision1.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}
          whileHover={{ scale: 1.08 }} transition={{ duration: 0.4 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(196,122,66,0.3), transparent)", borderRadius: 18 }} />
      </motion.div>

      {/* img 2 — center hero */}
      <motion.div style={{ y: y2, position: "absolute", top: 90, left: 90, width: 320, height: 220, borderRadius: 18, overflow: "hidden", boxShadow: "0 30px 70px rgba(0,0,0,0.18)", zIndex: 3 }}
        whileHover={{ scale: 1.04, zIndex: 10 }} transition={{ duration: 0.3 }}>
        <motion.img src="/vision/vision2.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}
          whileHover={{ scale: 1.08 }} transition={{ duration: 0.4 }} />
        {/* Gold badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 260 }}
          viewport={{ once: true }}
          style={{
            position: "absolute", top: 14, right: 14,
            background: "#c47a42", color: "white",
            fontSize: "0.6rem", letterSpacing: "2px", fontWeight: 700,
            padding: "5px 10px", borderRadius: 30,
            boxShadow: "0 4px 14px rgba(196,122,66,0.5)"
          }}
        >
          SINCE 2015
        </motion.div>
      </motion.div>

      {/* img 3 */}
      <motion.div style={{ y: y3, position: "absolute", bottom: 0, left: 0, width: 240, height: 170, borderRadius: 18, overflow: "hidden", boxShadow: "0 16px 40px rgba(0,0,0,0.12)", zIndex: 1 }}
        whileHover={{ scale: 1.04, zIndex: 10 }} transition={{ duration: 0.3 }}>
        <motion.img src="/vision/vision3.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}
          whileHover={{ scale: 1.08 }} transition={{ duration: 0.4 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent, rgba(23,57,45,0.3))", borderRadius: 18 }} />
      </motion.div>

      {/* Floating orb behind */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", top: "30%", left: "30%",
          width: 220, height: 220, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,122,66,0.18), transparent 70%)",
          filter: "blur(40px)", zIndex: 0, pointerEvents: "none"
        }}
      />

      {/* Decorative ring */}
      <motion.div
        initial={{ scale: 0, opacity: 0, rotate: -30 }}
        whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        animate={{ rotate: [0, 360] }}
        style={{
          position: "absolute", bottom: 10, right: -10, zIndex: 0,
          width: 80, height: 80, borderRadius: "50%",
          border: "1.5px dashed rgba(196,122,66,0.35)",
          animationDuration: "18s"
        }}
      />
    </motion.div>
  );
};

/* ── City chip ── */
const CityChip = ({ city, index }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.span
      key={city}
      initial={{ opacity: 0, scale: 0.7, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "10px 18px",
        border: `1.5px solid ${hovered ? "#c47a42" : "rgba(196,122,66,0.4)"}`,
        borderRadius: 999,
        color: hovered ? "#c47a42" : "#17392d",
        fontWeight: 700,
        background: hovered ? "rgba(196,122,66,0.08)" : "white",
        cursor: "default",
        fontSize: "0.8rem",
        letterSpacing: "2px",
        transition: "all 0.25s ease",
        boxShadow: hovered ? "0 4px 18px rgba(196,122,66,0.2)" : "0 2px 8px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)"
      }}
    >
      {city}
    </motion.span>
  );
};

/* ── Main ── */
const Vision = () => {
  return (
    <section className="vision-section">

      {/* Noise grain */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.025, pointerEvents: "none", zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "180px 180px"
      }} />

      {/* Ambient glow blobs */}
      <motion.div
        animate={{ scale: [1,1.3,1], opacity: [0.5,0.9,0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position:"absolute", top:"-5%", left:"-5%",
          width:400, height:400, borderRadius:"50%",
          background:"radial-gradient(circle, rgba(196,122,66,0.1), transparent 70%)",
          filter:"blur(70px)", zIndex:0, pointerEvents:"none"
        }}
      />
      <motion.div
        animate={{ scale: [1,1.2,1], opacity: [0.4,0.8,0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{
          position:"absolute", bottom:"0%", right:"-5%",
          width:500, height:500, borderRadius:"50%",
          background:"radial-gradient(circle, rgba(23,57,45,0.07), transparent 70%)",
          filter:"blur(80px)", zIndex:0, pointerEvents:"none"
        }}
      />

      {/* Watermark */}
      <div className="watermark">VISION</div>

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
        viewport={{ once: true }}
        style={{ textAlign: "center", marginBottom: 64, position: "relative", zIndex: 2 }}
      >
        {/* Pill */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(196,122,66,0.1)",
            border: "1px solid rgba(196,122,66,0.3)",
            borderRadius: 40, padding: "6px 18px", marginBottom: 20
          }}
        >
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "#c47a42", boxShadow: "0 0 8px rgba(196,122,66,0.8)",
            display: "inline-block",
            animation: "pulse 2s infinite"
          }} />
          <span style={{ color: "#c47a42", fontSize: "0.68rem", letterSpacing: "4px", fontWeight: 700 }}>
            ROYAL INTERIOR & DÉCOR
          </span>
        </motion.div>

        <h2 className="vision-title">
          OUR <span style={{
            background: "linear-gradient(135deg, #c47a42, #e8a96a)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>VISION</span> & MISSION
        </h2>

        {/* Animated underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16,1,0.3,1] }}
          viewport={{ once: true }}
          style={{
            width: 72, height: 2, margin: "16px auto 0", transformOrigin: "center",
            background: "linear-gradient(90deg, transparent, #c47a42, transparent)",
            boxShadow: "0 0 10px rgba(196,122,66,0.6)", borderRadius: 2
          }}
        />
      </motion.div>

      {/* ── Main Grid ── */}
      <div className="vision-grid" style={{ position: "relative", zIndex: 2 }}>

        {/* Vision Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
          viewport={{ once: true }}
        >
          <TiltCard>
            <div className="info-card">
              {/* Number badge */}
              <motion.div
                className="number"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                01
              </motion.div>

              {/* Decorative line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                style={{
                  height: 1, background: "linear-gradient(90deg, #c47a42, transparent)",
                  marginBottom: 20, transformOrigin: "left", borderRadius: 1
                }}
              />

              <h3 style={{ color: "#17392d", fontSize: "2rem", marginBottom: 14, fontFamily: "'Playfair Display', serif", letterSpacing: "-0.5px" }}>
                Vision
              </h3>

              <p style={{ color: "#555", lineHeight: 1.85, fontSize: "0.92rem" }}>
                Our vision at Royal Interior & Décor is to become a leading name
                in commercial interior design by setting new standards of excellence,
                fostering long-term relationships, and transforming workplaces into
                inspiring environments where businesses thrive.
              </p>

              {/* Bottom accent */}
              <div style={{
                marginTop: 24, display: "flex", alignItems: "center", gap: 10
              }}>
                <div style={{ width: 28, height: 2, background: "#c47a42", borderRadius: 1 }} />
                <span style={{ color: "#c47a42", fontSize: "0.68rem", letterSpacing: "3px", fontWeight: 700 }}>
                  EXCELLENCE FIRST
                </span>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* Center Image Showcase */}
        <ImageShowcase />

        {/* Mission Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16,1,0.3,1], delay: 0.1 }}
          viewport={{ once: true }}
        >
          <TiltCard>
            <div className="info-card">
              <motion.div
                className="number"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                02
              </motion.div>

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                style={{
                  height: 1, background: "linear-gradient(90deg, #c47a42, transparent)",
                  marginBottom: 20, transformOrigin: "left", borderRadius: 1
                }}
              />

              <h3 style={{ color: "#17392d", fontSize: "2rem", marginBottom: 14, fontFamily: "'Playfair Display', serif", letterSpacing: "-0.5px" }}>
                Mission
              </h3>

              <p style={{ color: "#555", lineHeight: 1.85, fontSize: "0.92rem" }}>
                Our mission is to design and deliver innovative, functional,
                and aesthetically pleasing commercial interiors that enhance
                productivity, reflect client identity, and are built on a
                foundation of trust and integrity.
              </p>

              <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 28, height: 2, background: "#c47a42", borderRadius: 1 }} />
                <span style={{ color: "#c47a42", fontSize: "0.68rem", letterSpacing: "3px", fontWeight: 700 }}>
                  TRUST & INTEGRITY
                </span>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>

      {/* ── Stats Section ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
        viewport={{ once: true }}
        className="stats-section"
        style={{ position: "relative", zIndex: 2 }}
      >
        {/* Turnover */}
        <motion.div
          className="turnover-box"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 260 }}
        >
          <div style={{
            background: "white", borderRadius: 20, padding: "30px 44px",
            boxShadow: "0 15px 40px rgba(196,122,66,0.12)",
            border: "1px solid rgba(196,122,66,0.15)",
            textAlign: "center", position: "relative", overflow: "hidden"
          }}>
            {/* Glow behind number */}
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(circle at 50% 50%, rgba(196,122,66,0.06), transparent 70%)",
              pointerEvents: "none"
            }} />
            <span style={{
              display: "block", fontSize: "3.8rem", color: "#c47a42",
              fontWeight: 800, lineHeight: 1, fontFamily: "'Playfair Display', serif",
              textShadow: "0 4px 20px rgba(196,122,66,0.3)"
            }}>
              <Counter target={40} suffix="Cr+" />
            </span>
            <p style={{ color: "#17392d", fontSize: "1rem", marginTop: 8, fontWeight: 600, letterSpacing: "1px" }}>
              Annual Turnover
            </p>
            <div style={{
              width: 40, height: 2, background: "#c47a42",
              borderRadius: 1, margin: "10px auto 0",
              boxShadow: "0 0 8px rgba(196,122,66,0.5)"
            }} />
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          style={{
            width: 1, height: 60,
            background: "linear-gradient(to bottom, transparent, #c47a42, transparent)",
            transformOrigin: "top", opacity: 0.5
          }}
        />

        {/* Cities */}
        <div className="cities-box">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}
          >
            <div style={{ width: 4, height: 28, background: "#c47a42", borderRadius: 2, boxShadow: "0 0 8px rgba(196,122,66,0.5)" }} />
            <h4 style={{ color: "#17392d", fontSize: "1.3rem", fontWeight: 700, letterSpacing: "1px" }}>
              Served Locations
            </h4>
          </motion.div>

          <div className="chips" style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {locations.map((city, i) => (
              <CityChip key={city} city={city} index={i} />
            ))}
          </div>
        </div>
      </motion.div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');

        .vision-section {
          position: relative;
          background: #f4f1eb;
          padding: 90px 5%;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        .watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 160px;
          font-weight: 900;
          opacity: 0.03;
          letter-spacing: 14px;
          pointer-events: none;
          user-select: none;
          font-family: 'Playfair Display', serif;
          white-space: nowrap;
        }

        .vision-title {
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-family: 'Playfair Display', serif;
          color: #17392d;
          font-weight: 900;
          margin: 0;
          letter-spacing: -1px;
        }

        .vision-grid {
          max-width: 1300px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1.2fr 1fr;
          gap: 40px;
          align-items: center;
        }

        .info-card {
          padding: 36px;
          position: relative;
        }

        .number {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: linear-gradient(135deg, #c47a42, #e8a96a);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          font-weight: 800;
          margin-bottom: 20px;
          box-shadow: 0 6px 20px rgba(196,122,66,0.35);
          letter-spacing: 1px;
        }

        .image-showcase {
          position: relative;
          height: 420px;
        }

        .stats-section {
          max-width: 1200px;
          margin: 72px auto 0;
          display: flex;
          justify-content: space-between;
          gap: 40px;
          align-items: center;
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 8px rgba(196,122,66,0.8); }
          50% { box-shadow: 0 0 16px rgba(196,122,66,1), 0 0 24px rgba(196,122,66,0.4); }
        }

        @media (max-width: 1000px) {
          .vision-grid {
            grid-template-columns: 1fr;
          }
          .image-showcase {
            height: 350px;
          }
          .stats-section {
            flex-direction: column;
            text-align: center;
          }
          .chips {
            justify-content: center;
          }
          .watermark {
            font-size: 80px;
          }
        }
      `}</style>
    </section>
  );
};

export default Vision;