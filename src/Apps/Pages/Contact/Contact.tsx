import { motion } from "framer-motion";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";

const contactItems = [
  {
    icon: FiMapPin,
    label: "Workshop Location",
    lines: [
      "663/25 Arjun Nagar, Street No. 8",
      "Near Police Chowki, Gurugram, Haryana",
    ],
    action: { text: "Get Directions →", href: "https://maps.google.com" },
  },
  {
    icon: FiPhone,
    label: "Call the Shop",
    lines: ["+91 78381 70214", "+91 83839 28255", "+91 92893 77069"],
    action: { text: "Call Now →", href: "tel:+917838170214" },
  },
  {
    icon: FiMail,
    label: "Email Us",
    lines: ["info@mkfabrication.com", "sales@mkfabrication.com"],
    action: { text: "Send Email →", href: "mailto:info@mkfabrication.com" },
  },
  {
    icon: FiClock,
    label: "Working Hours",
    lines: ["Mon – Sat", "8:00 AM – 6:00 PM"],
    action: null,
  },
];

export default function ContactPage() {
  return (
    <section style={{
      background: "#080808",
      color: "#f0f0f0",
      padding: "88px 0 0",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Barlow Condensed', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;600;700;800;900&family=Barlow:wght@300;400;500&display=swap');

        .contact-grid-bg {
          position: absolute; inset: 0;
          opacity: 0.018;
          background-image:
            repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 56px),
            repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 56px);
          pointer-events: none;
        }

        /* Info card */
        .info-card {
          background: #0e0e0e;
          border: 1px solid #1a1a1a;
          padding: 28px 28px 24px;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: border-color 0.3s;
          clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
        }
        .info-card:hover { border-color: #e05a0055; }
        .info-card::before {
          content:'';
          position:absolute; inset:0;
          background: linear-gradient(135deg, #e05a0010 0%, transparent 50%);
          opacity:0; transition:opacity 0.3s;
        }
        .info-card:hover::before { opacity:1; }

        /* Spark bottom line */
        .card-spark {
          position:absolute; bottom:0; left:0;
          height:2px; width:0;
          background:#e05a00;
          box-shadow:0 0 8px #e05a00;
          transition: width 0.4s ease;
        }
        .info-card:hover .card-spark { width:100%; }

        .card-icon-wrap {
          width: 42px; height: 42px;
          background: #181818;
          display: flex; align-items:center; justify-content:center;
          flex-shrink:0;
          transition: background 0.25s;
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
        }
        .info-card:hover .card-icon-wrap { background: #e05a00; }
        .card-icon-wrap svg {
          color: #e05a00;
          transition: color 0.25s;
          font-size: 17px;
        }
        .info-card:hover .card-icon-wrap svg { color: #000; }

        .card-label {
          font-family:'Barlow Condensed',sans-serif;
          font-size:11px; font-weight:700;
          letter-spacing:0.22em; text-transform:uppercase;
          color:#444; display:block; margin-bottom:4px;
        }
        .card-line {
          font-family:'Barlow',sans-serif;
          font-size:14px; font-weight:400;
          color:#888; line-height:1.65;
          display:block;
        }
        .card-action {
          display:inline-block;
          font-family:'Barlow Condensed',sans-serif;
          font-size:12px; font-weight:700;
          letter-spacing:0.15em; text-transform:uppercase;
          color:#e05a00;
          text-decoration:none;
          margin-top:4px;
          transition:opacity 0.2s;
          position:relative;
          z-index:1;
        }
        .card-action:hover { opacity:0.7; }

        /* Map container */
        .map-wrap {
          position:relative;
          overflow:hidden;
          border:1px solid #1a1a1a;
        }
        .map-wrap::before {
          content:'';
          position:absolute; inset:0;
          border:2px solid transparent;
          background: linear-gradient(#0e0e0e,#0e0e0e) padding-box,
                      linear-gradient(135deg,#e05a00,transparent,transparent) border-box;
          pointer-events:none; z-index:2;
        }
        .map-overlay-label {
          position:absolute; top:16px; left:16px;
          background:#080808cc;
          backdrop-filter:blur(6px);
          border:1px solid #e05a00;
          padding:8px 14px;
          font-family:'Barlow Condensed',sans-serif;
          font-size:12px; font-weight:700;
          letter-spacing:0.18em; text-transform:uppercase;
          color:#e05a00;
          z-index:3;
          clip-path:polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px));
          display:flex; align-items:center; gap:7px;
        }
        .map-live-dot {
          width:6px; height:6px; border-radius:50%;
          background:#e05a00; box-shadow:0 0 6px #e05a00;
          animation:pulse-map 1.6s ease-in-out infinite;
        }
        @keyframes pulse-map {
          0%,100%{opacity:1;transform:scale(1);}
          50%{opacity:0.3;transform:scale(0.5);}
        }

        /* H rule */
        .h-rule { height:1px; background:linear-gradient(90deg,#e05a00,#1a1a1a); opacity:0.45; }

        /* Live dot header */
        .live-dot {
          width:7px;height:7px;border-radius:50%;
          background:#e05a00;box-shadow:0 0 7px #e05a00;
          animation:pulse-map 1.6s ease-in-out infinite;
          flex-shrink:0;
        }

        /* Bottom weld bead */
        .weld-strip { display:flex; height:8px; overflow:hidden; }
        .weld-bead {
          flex:1;
          clip-path:ellipse(45% 60% at 50% 50%);
          margin:0 1px;
        }
      `}</style>

      <div className="contact-grid-bg" />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 52 }}
        >
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
            <div className="live-dot" />
            <span style={{
              fontFamily:"'Barlow Condensed',sans-serif",
              fontSize:11, fontWeight:700,
              letterSpacing:"0.25em", textTransform:"uppercase",
              color:"#e05a00",
            }}>MK Fabrication · Gurugram</span>
          </div>

          <h1 style={{
            fontFamily:"'Barlow Condensed',sans-serif",
            fontSize:"clamp(52px,11vw,96px)",
            fontWeight:900,
            textTransform:"uppercase",
            lineHeight:0.9,
            letterSpacing:"-0.01em",
            margin:"0 0 20px",
          }}>
            Get In<br />
            <span style={{ color:"transparent", WebkitTextStroke:"2px #e05a00" }}>Touch</span>
            <span style={{ color:"#e05a00" }}>.</span>
          </h1>

          <p style={{
            fontFamily:"'Barlow',sans-serif",
            fontSize:"clamp(14px,2vw,16px)",
            color:"#555",
            maxWidth:440,
            lineHeight:1.75,
            margin:0,
          }}>
            Come by the shop, call us, or send a message. We'll give you a straight answer and a fair quote.
          </p>
        </motion.div>

        {/* ── MAIN GRID ── */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",
          gap:2,
          marginBottom:2,
        }}>
          {contactItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                className="info-card"
                initial={{ opacity:0, y:20 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.4, delay:i*0.08 }}
              >
                <div className="card-spark" />
                <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                  <div className="card-icon-wrap">
                    <Icon />
                  </div>
                  <span className="card-label">{item.label}</span>
                </div>
                <div>
                  {item.lines.map((line, j) => (
                    <span key={j} className="card-line">{line}</span>
                  ))}
                </div>
                {item.action && (
                  <a href={item.action.href} className="card-action">
                    {item.action.text}
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* ── MAP — full row ── */}
        <motion.div
          initial={{ opacity:0, y:16 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.5, delay:0.2 }}
          className="map-wrap"
          style={{ height: 360 }}
        >
          <div className="map-overlay-label">
            <div className="map-live-dot" />
            MK Fabrication Workshop
          </div>
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            style={{ border:"none", display:"block", filter:"grayscale(100%) brightness(0.5) contrast(1.2)" }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14012.566329!2d77.0188646!3d28.4580417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d194c86532c79%3A0x28811e37fa0d0a36!2sMalik%20Fabrication!5e0!3m2!1sen!2sin!4v1733740000000"
          />
        </motion.div>

      </div>

      {/* ── BOTTOM CTA STRIP ── */}
      <motion.div
        initial={{ opacity:0 }}
        whileInView={{ opacity:1 }}
        viewport={{ once:true }}
        transition={{ duration:0.4, delay:0.3 }}
        style={{
          marginTop:2,
          background:"#e05a00",
          padding:"24px 32px",
          display:"flex",
          alignItems:"center",
          justifyContent:"space-between",
          flexWrap:"wrap",
          gap:16,
        }}
      >
        <div>
          <p style={{
            fontFamily:"'Barlow Condensed',sans-serif",
            fontSize:"clamp(18px,4vw,24px)",
            fontWeight:900,
            textTransform:"uppercase",
            letterSpacing:"0.06em",
            color:"#000",
            margin:0,
          }}>
            Ready to start a project?
          </p>
          <p style={{
            fontFamily:"'Barlow',sans-serif",
            fontSize:13,
            color:"rgba(0,0,0,0.6)",
            margin:"4px 0 0",
          }}>
            Walk in Mon–Sat · 8 AM to 6 PM
          </p>
        </div>
        <a
          href="tel:+917838170214"
          style={{
            fontFamily:"'Barlow Condensed',sans-serif",
            fontSize:14,
            fontWeight:900,
            letterSpacing:"0.18em",
            textTransform:"uppercase",
            padding:"14px 28px",
            background:"#000",
            color:"#fff",
            textDecoration:"none",
            display:"inline-block",
            clipPath:"polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))",
            transition:"opacity 0.2s",
          }}
        >
          Call the Shop →
        </a>
      </motion.div>

      {/* Weld bead strip */}
      <div className="weld-strip">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="weld-bead"
            style={{
              background: i % 4 === 0 ? "#ff6a00" : "#e05a00",
              opacity: 0.45 + (i % 3) * 0.18,
            }}
          />
        ))}
      </div>
    </section>
  );
}