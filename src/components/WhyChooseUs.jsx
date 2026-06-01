// src/components/WhyChooseUs.jsx
import { useEffect, useRef, useState } from "react";

const features = [
  {
    title: "INTEGRITY AT OUR CORE",
    description: "We deliver on our promises with transparency and accountability.",
    image: "/whychoose/integrity.png",
    icon: "🛡️",
    num: "01",
  },
  {
    title: "INNOVATIVE DESIGNS",
    description: "We blend creativity with functionality to craft inspiring workspaces.",
    image: "/whychoose/innovative.png",
    icon: "✨",
    num: "02",
  },
  {
    title: "QUALITY CRAFTSMANSHIP",
    description: "We use premium materials and ensure attention to detail in every project.",
    image: "/whychoose/quality.png",
    icon: "💎",
    num: "03",
  },
  {
    title: "TIMELY DELIVERY",
    description: "Your time is valuable, and we ensure projects are completed within agreed timelines.",
    image: "/whychoose/timely.png",
    icon: "⏱️",
    num: "04",
  },
];

/* ─── Particle ─── */
function Particle({ style }) {
  return <div style={style} />;
}

/* ─── 3D Tilt Card ─── */
function Card3D({ feat, index }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (cardRef.current) obs.observe(cardRef.current);
    return () => obs.disconnect();
  }, []);

  const onMouseMove = (e) => {
    const r = cardRef.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = ((y - r.height / 2) / (r.height / 2)) * 8;
    const ry = ((x - r.width / 2) / (r.width / 2)) * -8;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(10px)`;
    cardRef.current.style.boxShadow = `${-ry}px ${rx}px 40px rgba(196,122,66,.18), 0 20px 60px rgba(0,0,0,.5)`;
    if (glowRef.current) {
      glowRef.current.style.setProperty("--mx", `${(x / r.width) * 100}%`);
      glowRef.current.style.setProperty("--my", `${(y / r.height) * 100}%`);
      glowRef.current.style.opacity = "1";
    }
  };

  const onMouseLeave = () => {
    cardRef.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
    cardRef.current.style.boxShadow = "none";
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        ...styles.card3d,
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) rotateX(0deg)"
          : "translateY(60px) rotateX(8deg)",
        transition: `opacity .9s cubic-bezier(.16,1,.3,1) ${index * 0.15}s,
                     transform .9s cubic-bezier(.16,1,.3,1) ${index * 0.15}s,
                     box-shadow .3s ease`,
      }}
    >
      <div style={styles.cardInner} className="card-inner">
        {/* radial glow follows mouse */}
        <div
          ref={glowRef}
          style={styles.cardGlow}
        />

        {/* Big ghost number */}
        <span style={styles.ghostNum}>{feat.num}</span>

        {/* Image / icon */}
        <div style={styles.imgWrap}>
          <div style={styles.imgBorder}>
            <img
              src={feat.image}
              alt={feat.title}
              onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "flex"; }}
              style={styles.cardImg}
            />
            <div style={{ ...styles.fallbackIcon, display: "none" }}>{feat.icon}</div>
          </div>
        </div>

        {/* Text */}
        <div style={styles.cardContent}>
          <div style={styles.numLabel}>
            {feat.num}
            <span style={styles.numLine} />
          </div>
          <h3 style={styles.cardTitle}>{feat.title}</h3>
          <p style={styles.cardDesc}>{feat.description}</p>
        </div>

        {/* Bottom gold bar */}
        <div style={styles.bottomBar} className="bottom-bar" />
      </div>
    </div>
  );
}

/* ─── Main Section ─── */
const WhyChooseUs = () => {
  const particles = Array.from({ length: 28 }, (_, i) => {
    const size = Math.random() * 4 + 2;
    const dur = Math.random() * 12 + 10;
    const delay = Math.random() * 8;
    const colors = ["#c47a42", "#e0a060", "#b89156", "#d4994d"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    return {
      key: i,
      style: {
        position: "absolute",
        width: size,
        height: size,
        left: `${Math.random() * 100}%`,
        borderRadius: "50%",
        background: color,
        boxShadow: `0 0 ${size * 2}px ${color}`,
        pointerEvents: "none",
        animation: `floatUp ${dur}s linear ${delay}s infinite`,
        opacity: 0,
      },
    };
  });

  return (
    <section style={styles.section}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Jost:wght@300;400;500;600&display=swap');

        @keyframes floatUp {
          0%   { transform: translateY(100vh) scale(0); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.4; }
          100% { transform: translateY(-10vh) scale(1.5); opacity: 0; }
        }
        @keyframes breathe {
          0%,100% { opacity:.03; letter-spacing:20px; }
          50%      { opacity:.07; letter-spacing:30px; }
        }
        @keyframes headIn {
          from { opacity:0; transform: translateY(-40px); }
          to   { opacity:1; transform: translateY(0); }
        }
        @keyframes lineGrow {
          from { width:0; opacity:0; }
          to   { width:80px; opacity:1; }
        }
        @keyframes brandFade {
          from { opacity:0; }
          to   { opacity:1; }
        }

        .card-inner:hover .bottom-bar {
          transform: scaleX(1) !important;
        }
        .card-inner:hover {
          border-color: rgba(196,122,66,.65) !important;
          background: linear-gradient(135deg,#221a0a 0%,#2a2010 50%,#1e1509 100%) !important;
        }
        .card-glow {
          background: radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(196,122,66,.13) 0%, transparent 65%);
        }
        @media(max-width:768px){
          .wcu-grid { grid-template-columns: 1fr !important; }
          .wcu-card-inner { flex-direction: column !important; text-align: center !important; height: auto !important; }
        }
      `}</style>

      {/* Floating particles */}
      {particles.map((p) => <Particle key={p.key} style={p.style} />)}

      {/* Ghost BG text */}
      <div style={styles.bgText}>ROYAL</div>

      {/* Corner ornaments */}
      {["tl","tr","bl","br"].map(pos => <div key={pos} style={styles.corner(pos)} />)}

      {/* Header */}
      <div style={styles.header}>
        <p style={styles.eyebrow}>Our Promise To You</p>
        <h2 style={styles.heading}>WHY CHOOSE US</h2>
        <div style={styles.headLine} />
      </div>

      {/* Cards */}
      <div style={styles.grid} className="wcu-grid">
        {features.map((feat, i) => (
          <Card3D key={feat.num} feat={feat} index={i} />
        ))}
      </div>

      {/* Brand */}
      <div style={styles.brand}>
        <span style={{ color: "#c47a42", margin: "0 16px", fontSize: ".6rem", opacity: .7 }}>◆</span>
        Royal Interiors &amp; Décor
        <span style={{ color: "#c47a42", margin: "0 16px", fontSize: ".6rem", opacity: .7 }}>◆</span>
      </div>
    </section>
  );
};

/* ─── Styles ─── */
const styles = {
  section: {
    background: "linear-gradient(160deg,#0e0b07 0%,#1a1208 50%,#0e0b07 100%)",
    padding: "80px 5% 100px",
    position: "relative",
    overflow: "hidden",
    minHeight: "100vh",
    fontFamily: "'Jost', sans-serif",
  },
  bgText: {
    position: "absolute",
    top: "50%", left: "50%",
    transform: "translate(-50%,-50%)",
    fontSize: "200px",
    fontWeight: 900,
    color: "#c47a42",
    opacity: .03,
    pointerEvents: "none",
    letterSpacing: "20px",
    fontFamily: "'Cormorant Garamond', serif",
    whiteSpace: "nowrap",
    animation: "breathe 6s ease-in-out infinite",
  },
  corner: (pos) => {
    const base = { position: "absolute", width: 80, height: 80, opacity: .3 };
    const map = {
      tl: { top: 20, left: 20, borderTop: "2px solid #c47a42", borderLeft: "2px solid #c47a42" },
      tr: { top: 20, right: 20, borderTop: "2px solid #c47a42", borderRight: "2px solid #c47a42" },
      bl: { bottom: 20, left: 20, borderBottom: "2px solid #c47a42", borderLeft: "2px solid #c47a42" },
      br: { bottom: 20, right: 20, borderBottom: "2px solid #c47a42", borderRight: "2px solid #c47a42" },
    };
    return { ...base, ...map[pos] };
  },
  header: {
    textAlign: "center",
    marginBottom: 70,
    position: "relative",
    zIndex: 2,
    animation: "headIn .9s cubic-bezier(.16,1,.3,1) .2s both",
  },
  eyebrow: {
    color: "#c47a42",
    fontSize: ".75rem",
    letterSpacing: "6px",
    textTransform: "uppercase",
    marginBottom: 16,
    fontWeight: 500,
  },
  heading: {
    fontFamily: "'Cormorant Garamond', serif",
    color: "#f0e6d3",
    fontSize: "4.5rem",
    fontWeight: 700,
    letterSpacing: "4px",
    lineHeight: 1,
    marginBottom: 20,
    textShadow: "0 0 60px rgba(196,122,66,.2)",
  },
  headLine: {
    width: 80, height: 2,
    background: "linear-gradient(90deg,transparent,#c47a42,transparent)",
    margin: "0 auto",
    animation: "lineGrow 1s ease .8s both",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: 30,
    maxWidth: 1100,
    margin: "0 auto",
    position: "relative",
    zIndex: 2,
    perspective: "1200px",
  },
  card3d: {
    transformStyle: "preserve-3d",
    cursor: "default",
  },
  cardInner: {
    background: "linear-gradient(135deg,#1c1409 0%,#221808 50%,#1a1208 100%)",
    border: "1px solid rgba(196,122,66,.2)",
    borderRadius: 4,
    padding: "36px 32px",
    display: "flex",
    alignItems: "center",
    gap: 28,
    position: "relative",
    overflow: "hidden",
    height: 180,
    transition: "border-color .4s ease, background .4s ease",
  },
  cardGlow: {
    position: "absolute",
    inset: 0,
    opacity: 0,
    transition: "opacity .4s ease",
    borderRadius: 4,
    pointerEvents: "none",
  },
  ghostNum: {
    position: "absolute",
    top: 16, right: 20,
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "3.5rem",
    fontWeight: 700,
    color: "#c47a42",
    opacity: .08,
    lineHeight: 1,
    transition: "opacity .4s, transform .4s",
  },
  imgWrap: {
    flexShrink: 0,
    width: 100, height: 110,
    transformStyle: "preserve-3d",
    transition: "transform .5s cubic-bezier(.34,1.56,.64,1)",
  },
  imgBorder: {
    width: "100%", height: "100%",
    border: "1px solid rgba(196,122,66,.45)",
    position: "relative",
  },
  cardImg: {
    width: "100%", height: "100%",
    objectFit: "cover",
    display: "block",
    filter: "brightness(.85) saturate(.7) sepia(.3)",
    transition: "filter .4s ease",
  },
  fallbackIcon: {
    position: "absolute", inset: 0,
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2.5rem",
    background: "linear-gradient(135deg,#2a1d0d,#3d2a10)",
  },
  cardContent: { flex: 1, minWidth: 0 },
  numLabel: {
    color: "#c47a42",
    fontSize: ".7rem",
    letterSpacing: "3px",
    fontWeight: 600,
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  numLine: {
    display: "inline-block",
    height: 1,
    width: 40,
    background: "linear-gradient(90deg,rgba(196,122,66,.4),transparent)",
  },
  cardTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    color: "#f0e6d3",
    fontSize: "1.4rem",
    fontWeight: 700,
    lineHeight: 1.2,
    marginBottom: 10,
  },
  cardDesc: {
    color: "#9a8a72",
    fontSize: ".85rem",
    lineHeight: 1.65,
    fontWeight: 300,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0, left: 0, right: 0,
    height: 2,
    background: "linear-gradient(90deg,transparent,#c47a42,transparent)",
    transform: "scaleX(0)",
    transition: "transform .5s cubic-bezier(.16,1,.3,1)",
    transformOrigin: "left",
  },
  brand: {
    textAlign: "center",
    marginTop: 70,
    color: "#5a4530",
    fontSize: ".85rem",
    letterSpacing: "6px",
    textTransform: "uppercase",
    fontWeight: 500,
    position: "relative",
    zIndex: 2,
    animation: "brandFade 1s ease 1.2s both",
  },
};

export default WhyChooseUs;