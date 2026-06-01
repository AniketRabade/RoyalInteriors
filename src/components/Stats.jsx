// src/components/Stats.jsx
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(null);
  const [counts, setCounts] = useState({ turnover: 0, area: 0, projects: 0, years: 0 });
  
  const stats = [
    {
      value: 40,
      suffix: 'Cr',
      label: 'Annual Turnover',
      prefix: '₹ ',
      color: '#e11d48',
      description: 'Trusted by industry leaders'
    },
    {
      value: 300000,
      suffix: 'Sq. Ft.',
      label: 'Area Covered',
      prefix: '',
      color: '#f59e0b',
      description: 'Spaces transformed'
    },
    {
      value: 300,
      suffix: '+',
      label: 'Projects',
      prefix: '',
      color: '#10b981',
      description: 'Happy clients worldwide'
    },
    {
      value: 23,
      suffix: 'Years',
      label: 'Legacy',
      prefix: '',
      color: '#8b5cf6',
      description: 'Of design excellence'
    }
  ];
  
  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const interval = 20;
      const steps = duration / interval;
      
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        
        setCounts({
          turnover: Math.min(40, Math.floor(40 * progress)),
          area: Math.min(300000, Math.floor(300000 * progress)),
          projects: Math.min(300, Math.floor(300 * progress)),
          years: Math.min(23, Math.floor(23 * progress))
        });
        
        if (step >= steps) {
          clearInterval(timer);
          setCounts({ turnover: 40, area: 300000, projects: 300, years: 23 });
        }
      }, interval);
      
      return () => clearInterval(timer);
    }
  }, [isInView]);
  
  const formatArea = (num) => {
    if (num >= 100000) return (num / 100000).toFixed(1);
    return num.toString();
  };
  
  return (
    <section ref={ref} style={{
      position: 'relative',
      padding: '100px 5%',
      overflow: 'hidden',
      minHeight: '500px'
    }}>
      
      {/* CLEAR Background Image - No blur */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url('/images/stats-bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'scroll',
        zIndex: 0
      }} />
      
      {/* Minimal Overlay - Only 40% dark for readability */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.4)',
        zIndex: 1
      }} />
      
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <span style={{
            display: 'inline-block',
            fontSize: '0.7rem',
            letterSpacing: '5px',
            textTransform: 'uppercase',
            color: '#e11d48'
          }}>
            Our Impact
          </span>
          <h2 style={{
            fontSize: '2.5rem',
            color: 'white',
            marginTop: '15px',
            fontWeight: '700'
          }}>
            By The <span style={{ color: '#e11d48' }}>Numbers</span>
          </h2>
          <div style={{
            width: '60px',
            height: '2px',
            background: '#e11d48',
            margin: '15px auto 0'
          }} />
        </motion.div>
        
        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '25px',
          maxWidth: '1300px',
          margin: '0 auto'
        }}>
          {stats.map((stat, index) => {
            const currentValue = index === 0 ? counts.turnover : index === 1 ? counts.area : index === 2 ? counts.projects : counts.years;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                style={{
                  background: 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '20px',
                  padding: '40px 20px',
                  textAlign: 'center',
                  border: `1px solid ${stat.color}40`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                whileHover={{ y: -5, background: 'rgba(0,0,0,0.75)', borderColor: stat.color }}
              >
                {/* Number */}
                <div style={{
                  fontSize: '3rem',
                  fontWeight: '800',
                  color: stat.color,
                  marginBottom: '10px',
                  lineHeight: 1
                }}>
                  {stat.prefix}
                  {index === 1 ? formatArea(currentValue) : 
                   index === 2 ? currentValue : 
                   index === 3 ? currentValue : currentValue}
                  <span style={{ fontSize: '1.2rem', fontWeight: '500' }}> {stat.suffix}</span>
                </div>
                
                {/* Label */}
                <div style={{
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  color: 'white',
                  marginBottom: '8px',
                  letterSpacing: '1px'
                }}>
                  {stat.label}
                </div>
                
                {/* Description Line */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: activeIndex === index ? '40px' : '0px' }}
                  transition={{ duration: 0.3 }}
                  style={{
                    height: '2px',
                    background: stat.color,
                    margin: '10px auto 0',
                    borderRadius: '1px'
                  }}
                />
                
              </motion.div>
            );
          })}
        </div>
        
      </div>
      
      {/* Responsive */}
      <style>{`
        @media (max-width: 1000px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      
    </section>
  );
};

export default Stats;