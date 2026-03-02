import { motion } from "framer-motion";
import { FiMapPin, FiPhone, FiMail, FiArrowUpRight } from "react-icons/fi";

const quickLinks = ["Home", "Services", "About Us", "Projects", "Contact"];
const services = ["Metal Fabrication", "Welding Services", "CNC Machining", "Industrial Maintenance", "Custom Solutions"];

export default function Footer() {
  return (
    <footer style={{
      background: "#060606",
      color: "#f0f0f0",
      fontFamily: "'Barlow Condensed', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;600;700;800;900&family=Barlow:wght@300;400;500&display=swap');

        .footer-grid-bg {
          position: absolute; inset: 0;
          opacity: 0.015;
          background-image:
            repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 56px),
            repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 56px);
          pointer-events: none;
        }

        .footer-link {
          font-family: 'Barlow', sans-serif;
          font-size: 13px;
          font-weight: 400;
          color: #444;
          text-decoration: none;
          letter-spacing: 0.04em;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s;
          padding: 5px 0;
          border-bottom: 1px solid transparent;
          transition: color 0.2s, border-color 0.2s;
        }
        .footer-link:hover {
          color: #f0f0f0;
          border-bottom-color: #e05a0033;
        }
        .footer-link:hover .link-arrow { opacity: 1; transform: translate(2px,-2px); }

        .link-arrow {
          opacity: 0;
          transition: opacity 0.2s, transform 0.2s;
          color: #e05a00;
          font-size: 11px;
          flex-shrink: 0;
        }

        .col-label {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #e05a00;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .col-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, #e05a00, transparent);
          opacity: 0.4;
        }

        .contact-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 14px;
        }
        .contact-icon {
          color: #e05a00;
          flex-shrink: 0;
          margin-top: 2px;
          font-size: 14px;
        }
        .contact-text {
          font-family: 'Barlow', sans-serif;
          font-size: 13px;
          color: #444;
          line-height: 1.65;
        }

        /* bottom bar */
        .footer-bottom {
          background: #0a0a0a;
          border-top: 1px solid #161616;
          padding: 18px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .bottom-legal {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }
        .legal-link {
          font-family: 'Barlow', sans-serif;
          font-size: 11px;
          color: #2a2a2a;
          text-decoration: none;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        .legal-link:hover { color: #e05a00; }

        /* weld bead top border */
        .weld-top {
          display: flex;
          height: 5px;
          overflow: hidden;
        }
        .weld-top-bead {
          flex: 1;
          clip-path: ellipse(45% 60% at 50% 50%);
          margin: 0 1px;
        }

        /* brand logo mark */
        .brand-mark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: #e05a00;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 20px;
          font-weight: 900;
          color: #000;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
          flex-shrink: 0;
        }

        .divider-v {
          width: 1px;
          background: #161616;
          align-self: stretch;
        }
      `}</style>

      {/* Weld bead top strip */}
      <div className="weld-top">
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} className="weld-top-bead" style={{
            background: i % 4 === 0 ? "#ff6a00" : "#e05a00",
            opacity: 0.5 + (i % 3) * 0.15,
          }} />
        ))}
      </div>

      <div className="footer-grid-bg" />

      {/* Main content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px 48px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "48px 40px",
        }}>

          {/* ── BRAND COL ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            style={{ gridColumn: "span 1" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div className="brand-mark">MK</div>
              <div>
                <div style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontSize: 22,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  lineHeight: 1,
                  color: "#f0f0f0",
                }}>
                  Malik
                </div>
                <div style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "#333",
                  lineHeight: 1,
                }}>
                  Fabrication
                </div>
              </div>
            </div>

            <p style={{
              fontFamily: "'Barlow',sans-serif",
              fontSize: 13,
              color: "#3a3a3a",
              lineHeight: 1.8,
              maxWidth: 220,
              margin: "0 0 24px",
            }}>
              Premium industrial fabrication from Gurugram. Built right the first time.
            </p>

            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 14px",
              border: "1px solid #1a1a1a",
              background: "#0e0e0e",
            }}>
              <div style={{
                width: 7, height: 7, borderRadius: "50%",
                background: "#e05a00", boxShadow: "0 0 6px #e05a00",
                animation: "pulse-map 1.6s ease-in-out infinite",
              }} />
              <span style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontSize: 11, fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "#333",
              }}>Est. 2008 · Gurugram</span>
            </div>

            <style>{`
              @keyframes pulse-map {
                0%,100%{opacity:1;transform:scale(1);}
                50%{opacity:0.3;transform:scale(0.5);}
              }
            `}</style>
          </motion.div>

          {/* ── QUICK LINKS ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            <div className="col-label">Quick Links</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a href="#" className="footer-link">
                    <FiArrowUpRight className="link-arrow" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── SERVICES ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.14 }}
          >
            <div className="col-label">Services</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {services.map((s, i) => (
                <li key={i}>
                  <a href="#" className="footer-link">
                    <FiArrowUpRight className="link-arrow" />
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── CONTACT ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="col-label">Contact</div>

            <div className="contact-row">
              <FiMapPin className="contact-icon" />
              <span className="contact-text">
                663/25 Arjun Nagar, Street No. 8<br />
                Near Police Chowki<br />
                Gurugram, Haryana
              </span>
            </div>

            <div className="contact-row">
              <FiPhone className="contact-icon" />
              <span className="contact-text">
                +91 78381 70214<br />
                +91 83839 28255
              </span>
            </div>

            <div className="contact-row">
              <FiMail className="contact-icon" />
              <span className="contact-text">
                info@mkfabrication.com
              </span>
            </div>

            {/* CTA */}
            <a
              href="tel:+917838170214"
              style={{
                display: "inline-block",
                marginTop: 16,
                fontFamily: "'Barlow Condensed',sans-serif",
                fontSize: 12,
                fontWeight: 900,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                padding: "10px 18px",
                background: "#e05a00",
                color: "#000",
                textDecoration: "none",
                clipPath: "polygon(0 0,calc(100% - 7px) 0,100% 7px,100% 100%,7px 100%,0 calc(100% - 7px))",
                transition: "opacity 0.2s",
              }}
            >
              Call the Shop →
            </a>
          </motion.div>

        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="footer-bottom">
        <p style={{
          fontFamily: "'Barlow',sans-serif",
          fontSize: 11,
          color: "#2a2a2a",
          margin: 0,
          letterSpacing: "0.06em",
        }}>
          © {new Date().getFullYear()}{" "}
          <span style={{ color: "#e05a00" }}>Malik Fabrication</span>
          {" "}· All rights reserved.
        </p>

        <div className="bottom-legal">
          <a href="#" className="legal-link">Privacy Policy</a>
          <a href="#" className="legal-link">Terms of Service</a>
          <a href="#" className="legal-link">Sitemap</a>
        </div>
      </div>

    </footer>
  );
}