// src/components/Navbar.jsx
import { useState } from 'react';

const Navbar = () => {
  const [active, setActive] = useState('Home');
  const navItems = ['Home', 'Services', 'Projects', 'About', 'Contact'];
  
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      padding: '1rem 5%',
      background: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
        Royal<span style={{ color: '#e11d48' }}>Interiors</span>
      </div>
      
      <div style={{ display: 'flex', gap: '2rem' }}>
        {navItems.map(item => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={() => setActive(item)}
            style={{
              textDecoration: 'none',
              color: active === item ? '#e11d48' : 'white',
              fontWeight: '500',
              transition: '0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={e => e.target.style.color = '#e11d48'}
            onMouseLeave={e => e.target.style.color = active === item ? '#e11d48' : 'white'}
          >
            {item}
          </a>
        ))}
      </div>
      
      <button style={{
        background: '#e11d48',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1.5rem',
        borderRadius: '40px',
        cursor: 'pointer',
        fontWeight: '500'
      }}>
        Get Quote
      </button>
    </nav>
  );
};

export default Navbar;