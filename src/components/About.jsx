// src/components/About.jsx

import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="about-section">
      <div className="about-grid">

        {/* QUADRANT 1 - Text top-left */}
        <motion.div
          className="quad text-1"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <span className="section-tag">ROYAL INTERIORS & DÉCOR</span>
          <h2>About Us</h2>
          <p>
            We, Royal Interiors & Décor, are among the leading service
            providers of Interior & Exterior Design Services.
          </p>
          <p>
            At Royal Interior & Décor, we value delivering on what we
            say we are going to do. When we can't deliver on our promise,
            we notify all interested parties and commit to a new promise.
            Integrity remains at the core of how we operate.
          </p>
        </motion.div>

        {/* QUADRANT 2 - Image top-right (bottom-left corner at grid center) */}
        <motion.div
          className="quad image-box image-top-right"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.img
            src="/about/about1.png"
            alt=""
            whileHover={{ scale: 1.03, y: -10 }}
          />
        </motion.div>

        {/* QUADRANT 3 - Image bottom-left (top-right corner at grid center) */}
        <motion.div
          className="quad image-box image-bottom-left"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.img
            src="/about/about2.png"
            alt=""
            whileHover={{ scale: 1.03, y: -10 }}
          />
        </motion.div>

        {/* QUADRANT 4 - Text bottom-right */}
        <motion.div
          className="quad text-2"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h3>Collaboration</h3>
          <p>
            We collaborate within our team, with our clients,
            and with all trades and suppliers. Everybody's
            ideas count. Everybody has a voice.
          </p>
          <h3>Community</h3>
          <p>
            We serve our clients by empowering them through design.
            By helping achieve their goals, we create meaningful
            spaces that positively impact business, personal growth,
            and the communities around us.
          </p>
        </motion.div>

      </div>

      {/* BOTTOM QUOTE */}
      <motion.div
        className="quote-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
      >
        <h4>We Create Your Dreams</h4>
        <h5>Inspire & Design</h5>
      </motion.div>

      <style>{`

        .about-section {
          background: #0c0c0d;
          padding: 100px 6%;
          overflow: hidden;
          position: relative;
        }

        .about-grid {
          max-width: 1400px;
          margin: auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          /* NO gap — images must touch at center */
          gap: 0;
          align-items: stretch;
        }

        .quad {
          min-height: 380px;
        }

        /* ── TEXT QUADS ── */

        .section-tag {
          color: #c47a42;
          letter-spacing: 3px;
          font-size: .85rem;
          display: block;
          margin-bottom: 15px;
        }

        .text-1 {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 40px 50px 40px 0;
        }

        .text-1 h2 {
          font-size: 4rem;
          color: #c47a42;
          line-height: 1;
          margin-bottom: 25px;
        }

        .text-1 p,
        .text-2 p {
          color: #cfcfcf;
          line-height: 1.9;
          margin-bottom: 18px;
        }

        .text-2 {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 40px 0 40px 50px;
        }

        .text-2 h3 {
          color: #c47a42;
          margin-bottom: 12px;
          font-size: 1.8rem;
        }

        /* ── IMAGE QUADS ── */

        .image-box {
          position: relative;
          display: flex;
        }

        /*
          Image 1 lives in top-right quadrant.
          Its bottom-left corner must sit exactly at the grid center.
          So: align to bottom-left corner of the quadrant cell.
        */
        .image-top-right {
          align-items: flex-end;      /* pin to bottom */
          justify-content: flex-start; /* pin to left   */
          padding: 0;
        }

        /*
          Image 2 lives in bottom-left quadrant.
          Its top-right corner must sit exactly at the grid center.
          So: align to top-right corner of the quadrant cell.
        */
        .image-bottom-left {
          align-items: flex-start;   /* pin to top   */
          justify-content: flex-end; /* pin to right */
          padding: 0;
        }

        /* Both images — identical size */
        .image-top-right img,
        .image-bottom-left img {
          width: 100%;
          max-width: 520px;
          height: 360px;
          object-fit: cover;
          border-radius: 24px;
          border: 2px solid rgba(196, 122, 66, .65);
          box-shadow:
            0 25px 60px rgba(0, 0, 0, .35),
            0 0 0 1px rgba(196, 122, 66, .15);
          transition: .4s;
          display: block;
        }

        /* ── QUOTE ── */

        .quote-section {
          text-align: center;
          margin-top: 90px;
        }

        .quote-section h4 {
          font-size: 4rem;
          color: #c47a42;
          font-weight: 300;
          margin-bottom: 10px;
          font-family: cursive;
        }

        .quote-section h5 {
          font-size: 3rem;
          color: white;
          font-weight: 300;
          font-family: cursive;
        }

        /* ── RESPONSIVE ── */

        @media (max-width: 1000px) {
          .about-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
          }

          /* On mobile, stack normally — overlap effect breaks in 1-col */
          .image-top-right,
          .image-bottom-left {
            justify-content: center;
            align-items: center;
          }

          .text-1 {
            padding: 40px 0;
          }

          .text-2 {
            padding: 40px 0;
          }

          .text-1 h2 {
            font-size: 3rem;
          }

          .quote-section h4 { font-size: 2.5rem; }
          .quote-section h5 { font-size: 2rem; }

          .image-top-right img,
          .image-bottom-left img {
            height: 280px;
          }
        }

        @media (max-width: 768px) {
          .image-top-right img,
          .image-bottom-left img {
            height: 220px;
          }
        }

      `}</style>
    </section>
  );
};

export default About;