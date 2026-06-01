import { useState, useEffect, useRef } from "react";

export default function ContactUS() {
  const [form, setForm]= useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const formCardRef = useRef(null);

  // 3D tilt effect on form card
  useEffect(() => {
    const card = formCardRef.current;
    if (!card) return;

    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `perspective(1000px) rotateY(${dx * 5}deg) rotateX(${-dy * 4}deg) translateZ(10px)`;
    };

    const handleLeave = () => {
      card.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
      card.style.transition = "transform 0.6s cubic-bezier(0.22,1,0.36,1)";
    };

    const handleEnter = () => {
      card.style.transition = "transform 0.1s linear";
    };

    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", handleLeave);
    card.addEventListener("mouseenter", handleEnter);

    return () => {
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseleave", handleLeave);
      card.removeEventListener("mouseenter", handleEnter);
    };
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setForm({ name: "", phone: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1600);
  };

  const infoCards = [
    {
      icon: "📞",
      label: "Call Us",
      value: <a href="tel:+917020232353">+91 70202 32353</a>,
    },
    {
      icon: "✉️",
      label: "Email Us",
      value: <a href="mailto:interiorroyal4@gmail.com">interiorroyal4@gmail.com</a>,
    },
    {
      icon: "🌐",
      label: "Website",
      value: <a href="https://www.nteriorroyal.in" target="_blank" rel="noreferrer">www.nteriorroyal.in</a>,
    },
    {
      icon: "📍",
      label: "Studio Address",
      value: "705, Ekunj Society, Near Kool Homes,\nBehind Mitcon School, Balewadi,\nPune – 411 045",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden font-['Montserrat',sans-serif]">
      {/* Animated background grid */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid animate-gridMove" />

      {/* Floating orbs */}
      <div className="fixed w-[400px] h-[400px] rounded-full bg-gradient-radial from-[#C9A84C]/12 to-transparent blur-[80px] top-[-100px] right-[-100px] pointer-events-none z-0 animate-orbFloat" />
      <div className="fixed w-[300px] h-[300px] rounded-full bg-gradient-radial from-[#C9A84C]/8 to-transparent blur-[80px] bottom-[100px] left-[-80px] pointer-events-none z-0 animate-orbFloat animation-delay-[-4s]" />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 py-[60px] pb-20">
        {/* Header */}
        <div className="text-center mb-[70px] animate-fadeUp">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-px bg-[#C9A84C]/50" />
            <span className="font-['Montserrat',sans-serif] text-[11px] font-semibold tracking-[4px] uppercase text-[#C9A84C]">
              Interior Royal
            </span>
            <div className="w-10 h-px bg-[#C9A84C]/50" />
          </div>
          <h1 className="font-['Cormorant_Garamond',serif] text-[clamp(48px,8vw,80px)] font-light leading-[1.05] text-white tracking-[-1px]">
            Get In <em className="not-italic text-[#C9A84C]">Touch</em>
          </h1>
          <p className="text-[13px] font-light text-white/40 mt-5 tracking-[1px] max-w-[400px] mx-auto leading-relaxed">
            Crafting extraordinary spaces. Let's create something remarkable together.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Info Column */}
          <div className="flex flex-col gap-4 animate-fadeUp animation-delay-200">
            {infoCards.map((card, i) => (
              <div
                key={i}
                className="group bg-[#111111] border border-[#C9A84C]/15 rounded p-7 flex items-start gap-5 relative overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#C9A84C]/45 hover:shadow-[0_0_40px_rgba(201,168,76,0.1),0_20px_60px_rgba(0,0,0,0.5)]"
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Shine sweep */}
                <div className="absolute top-0 -left-full w-3/5 h-full bg-gradient-to-r from-transparent via-[#C9A84C]/6 to-transparent -skew-x-20 transition-all duration-700 group-hover:left-[150%]" />

                <div className="w-12 h-12 border border-[#C9A84C]/30 rounded bg-[#C9A84C]/5 flex items-center justify-center shrink-0 text-lg transition-all duration-300 group-hover:bg-[#C9A84C]/12 group-hover:border-[#C9A84C] group-hover:rotate-y-15 group-hover:scale-105">
                  {card.icon}
                </div>
                <div className="flex-1 relative z-10">
                  <div className="text-[9px] font-semibold tracking-[3px] uppercase text-[#C9A84C]/70 mb-2">
                    {card.label}
                  </div>
                  <div className="font-['Cormorant_Garamond',serif] text-lg font-normal text-white leading-relaxed whitespace-pre-line">
                    {card.value}
                  </div>
                </div>
              </div>
            ))}

            {/* Map Section */}
            <div className="mt-10 animate-fadeUp animation-delay-500">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[9px] font-semibold tracking-[3px] uppercase text-[#C9A84C]/70">
                  Find Us
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-[#C9A84C]/30 to-transparent" />
              </div>
              <div className="w-full h-[220px] rounded border border-[#C9A84C]/15 overflow-hidden relative">
                <iframe
                  title="InteriorRoyal Location"
                  src="https://maps.google.com/maps?q=Ekunj+Society+Balewadi+Pune&output=embed&z=15"
                  allowFullScreen=""
                  loading="lazy"
                  className="w-full h-full border-0 grayscale invert contrast-[0.85] brightness-70 sepia-20 opacity-85"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-[#C9A84C]/4 to-transparent" />
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="animate-fadeUp animation-delay-350">
            <div
              ref={formCardRef}
              className="bg-[#111111] border border-[#C9A84C]/15 rounded p-11 relative overflow-hidden transition-shadow duration-300"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Top gradient line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

              <div className="font-['Cormorant_Garamond',serif] text-3xl font-light text-white mb-2">
                Send a Message
              </div>
              <div className="text-[11px] text-white/30 tracking-[1px] mb-9">
                We'll respond within 24 hours
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label className="block text-[9px] font-semibold tracking-[3px] uppercase text-[#C9A84C]/70 mb-2.5">
                    Your Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Rahul Sharma"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded text-white font-['Montserrat',sans-serif] text-[13px] font-light p-3.5 outline-none transition-all duration-300 placeholder:text-white/20 placeholder:text-xs focus:border-[#C9A84C]/50 focus:bg-[#C9A84C]/4 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.06)]"
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-[9px] font-semibold tracking-[3px] uppercase text-[#C9A84C]/70 mb-2.5">
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded text-white font-['Montserrat',sans-serif] text-[13px] font-light p-3.5 outline-none transition-all duration-300 placeholder:text-white/20 placeholder:text-xs focus:border-[#C9A84C]/50 focus:bg-[#C9A84C]/4 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.06)]"
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-[9px] font-semibold tracking-[3px] uppercase text-[#C9A84C]/70 mb-2.5">
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded text-white font-['Montserrat',sans-serif] text-[13px] font-light p-3.5 outline-none transition-all duration-300 placeholder:text-white/20 placeholder:text-xs focus:border-[#C9A84C]/50 focus:bg-[#C9A84C]/4 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.06)]"
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-[9px] font-semibold tracking-[3px] uppercase text-[#C9A84C]/70 mb-2.5">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell us about your project or enquiry..."
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full bg-white/5 border border-white/10 rounded text-white font-['Montserrat',sans-serif] text-[13px] font-light p-3.5 outline-none transition-all duration-300 placeholder:text-white/20 placeholder:text-xs focus:border-[#C9A84C]/50 focus:bg-[#C9A84C]/4 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.06)] resize-y min-h-[110px]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 px-8 bg-transparent border border-[#C9A84C] text-[#C9A84C] font-['Montserrat',sans-serif] text-[11px] font-semibold tracking-[4px] uppercase cursor-pointer rounded relative overflow-hidden transition-colors duration-400 hover:text-black hover:shadow-[0_8px_30px_rgba(201,168,76,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">
                    {submitting ? "Sending..." : "Send Message →"}
                  </span>
                  <span className="absolute inset-0 bg-[#C9A84C] -translate-x-full transition-transform duration-400 group-hover:translate-x-0" />
                </button>

                {submitted && (
                  <div className="flex items-center gap-3 p-4 bg-[#C9A84C]/8 border border-[#C9A84C]/30 rounded text-sm text-[#E8C97A] tracking-[1px] mt-4 animate-fadeUp">
                    <span>✓</span>
                    Message sent! We'll be in touch soon.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-[70px] flex items-center justify-center gap-5 animate-fadeUp animation-delay-600">
          <div className="flex-1 h-px bg-[#C9A84C]/10 max-w-[200px]" />
          <div className="text-[10px] tracking-[3px] uppercase text-white/20">
            © 2025 <span className="text-[#C9A84C]/70">Interior Royal</span> · Balewadi, Pune
          </div>
          <div className="flex-1 h-px bg-[#C9A84C]/10 max-w-[200px]" />
        </div>
      </div>

      {/* Add custom animations to Tailwind */}
      <style jsx>{`
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }
        
        @keyframes orbFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-gridMove {
          animation: gridMove 20s linear infinite;
        }
        
        .animate-orbFloat {
          animation: orbFloat 8s ease-in-out infinite;
        }
        
        .animate-fadeUp {
          animation: fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-350 {
          animation-delay: 0.35s;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animation-delay-\\[-4s\\] {
          animation-delay: -4s;
        }
        
        .group-hover\\:rotate-y-15 {
          transform-style: preserve-3d;
        }
        
        .group:hover .group-hover\\:rotate-y-15 {
          transform: rotateY(15deg) scale(1.08);
        }
        
        .bg-grid {
          background-image: 
            linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        
        .group:hover .group-hover\\:scale-105 {
          transform: scale(1.05);
        }
        
        button .absolute {
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        
        button:hover .absolute {
          transform: translateX(0);
        }
      `}</style>
    </div>
  );
}