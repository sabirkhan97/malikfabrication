import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const timelineData = [
  { year: "2008", event: "Founded", description: "Started as a small fabrication workshop with two welders and a dream to build things that last." },
  { year: "2012", event: "First Major Contract", description: "Completed first large-scale industrial shed project — 4,200 sq ft of structural steel." },
  { year: "2018", event: "Going Global", description: "Expanded operations to serve international clients across 12 countries." },
  { year: "2023", event: "25,000+ Projects", description: "Hit a major milestone. Still the same commitment to quality on every single job." },
];

const stats = [
  { value: 15, suffix: "+", label: "Years in Business" },
  { value: 25, suffix: "K+", label: "Projects Done" },
  { value: 12, suffix: "+", label: "Countries Served" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
];

function CountUp({ target, suffix, inView }: any) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = parseInt(target);
    const duration = 1600;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <>{count}{suffix}</>;
}

export default function AboutSection() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

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

        .about-grid-bg {
          position: absolute; inset: 0;
          opacity: 0.016;
          background-image:
            repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 56px),
            repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 56px);
          pointer-events: none;
        }

        /* ── STAT CARD ── */
        .stat-card {
          background: #0e0e0e;
          border: 1px solid #1a1a1a;
          padding: 28px 20px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s;
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
        }
        .stat-card:hover { border-color: #e05a0055; }
        .stat-card::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, #e05a0010 0%, transparent 50%);
          opacity: 0; transition: opacity 0.3s;
        }
        .stat-card:hover::before { opacity: 1; }
        .stat-value {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(42px, 7vw, 60px);
          font-weight: 900;
          line-height: 1;
          color: #f0f0f0;
          letter-spacing: -0.01em;
          display: block;
        }
        .stat-accent {
          color: #e05a00;
          text-shadow: 0 0 20px #e05a0055;
        }
        .stat-label {
          font-family: 'Barlow', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #444;
          margin-top: 6px;
          display: block;
        }
        .stat-number-bg {
          position: absolute;
          right: -4px; bottom: -10px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 90px;
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1px #1a1a1a;
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }

        /* ── MISSION BLOCK ── */
        .mission-block {
          background: #0e0e0e;
          border-left: 3px solid #e05a00;
          padding: 36px 36px 36px 40px;
          position: relative;
          overflow: hidden;
        }
        .mission-block::after {
          content: '"';
          position: absolute;
          right: 20px; top: -10px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 160px;
          font-weight: 900;
          color: #e05a00;
          opacity: 0.04;
          line-height: 1;
          pointer-events: none;
        }
        .mission-text {
          font-family: 'Barlow', sans-serif;
          font-size: clamp(16px, 2.5vw, 19px);
          font-weight: 300;
          line-height: 1.85;
          color: #888;
          margin: 0;
        }
        .mission-text em {
          font-style: normal;
          color: #f0f0f0;
          font-weight: 500;
        }

        /* ── TIMELINE ── */
        .timeline-connector {
          position: absolute;
          left: 32px;
          top: 0; bottom: 0;
          width: 1px;
          background: #1a1a1a;
        }
        .timeline-item {
          position: relative;
          padding-left: 72px;
          padding-bottom: 40px;
        }
        .timeline-item:last-child { padding-bottom: 0; }

        .tl-dot-wrap {
          position: absolute;
          left: 20px;
          top: 2px;
          width: 24px;
          height: 24px;
          display: flex; align-items: center; justify-content: center;
        }
        .tl-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: #1e1e1e;
          border: 1px solid #333;
          position: relative;
          z-index: 1;
          transition: background 0.3s, border-color 0.3s, box-shadow 0.3s;
        }
        .tl-dot.active {
          background: #e05a00;
          border-color: #e05a00;
          box-shadow: 0 0 12px #e05a00;
        }

        .tl-year {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #e05a00;
          display: block;
          margin-bottom: 5px;
        }
        .tl-event {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 26px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: #f0f0f0;
          line-height: 1;
          margin-bottom: 8px;
        }
        .tl-desc {
          font-family: 'Barlow', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #555;
          line-height: 1.7;
          max-width: 420px;
        }

        /* Horizontal rule line */
        .h-rule {
          height: 1px;
          background: linear-gradient(90deg, #e05a00, #1a1a1a);
          opacity: 0.5;
        }
        .live-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #e05a00;
          box-shadow: 0 0 7px #e05a00;
          animation: blink 1.6s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes blink {
          0%,100%{opacity:1;transform:scale(1);}
          50%{opacity:0.3;transform:scale(0.5);}
        }

        /* bottom weld strip */
        .weld-strip {
          display: flex;
          height: 6px;
          overflow: hidden;
        }
        .weld-bead {
          flex: 1;
          background: #e05a00;
          clip-path: ellipse(45% 55% at 50% 50%);
          margin: 0 1px;
          opacity: 0.7;
        }
      `}</style>

      <div className="about-grid-bg" />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: 56 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div className="live-dot" />
            <span style={{
              fontFamily: "'Barlow Condensed',sans-serif",
              fontSize: 11, fontWeight: 700,
              letterSpacing: "0.25em", textTransform: "uppercase",
              color: "#e05a00",
            }}>Est. 2008 · MK Fabrication</span>
          </div>

          <h2 style={{
            fontFamily: "'Barlow Condensed',sans-serif",
            fontSize: "clamp(52px,11vw,96px)",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "-0.01em",
            lineHeight: 0.9,
            margin: "0 0 24px",
          }}>
            Built on<br />
            <span style={{
              color: "transparent",
              WebkitTextStroke: "2px #e05a00",
              display: "inline-block",
            }}>Steel</span>{" "}
            &amp;{" "}
            <span style={{ color: "#e05a00" }}>Skill.</span>
          </h2>

          <p style={{
            fontFamily: "'Barlow',sans-serif",
            fontSize: "clamp(15px,2vw,17px)",
            fontWeight: 400,
            color: "#555",
            maxWidth: 520,
            lineHeight: 1.75,
            margin: 0,
          }}>
            Since 2008, MK Fabrication has delivered precision metal work that holds up under real-world conditions — no corners cut, no compromises made.
          </p>
        </motion.div>

        {/* ── STATS ── */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 2,
            marginBottom: 2,
          }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="stat-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <span className="stat-number-bg">{s.value}</span>
              <span className="stat-value">
                <span className="stat-accent">
                  <CountUp target={s.value} suffix={s.suffix} inView={statsInView} />
                </span>
              </span>
              <span className="stat-label">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── MISSION ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mission-block"
          style={{ marginBottom: 2 }}
        >
          <p className="mission-text">
            We combine <em>traditional craftsmanship</em> with <em>modern engineering</em> to build metal structures that last decades, not years. Every weld is laid with intent. Every project gets the same attention — whether it's a single bracket or a full structural build. <em>Transparency, quality, and your satisfaction</em> aren't slogans here. They're how we operate.
          </p>
        </motion.div>

      </div>

      {/* ── TIMELINE — full bleed strip ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          marginTop: 56,
          borderTop: "1px solid #181818",
          background: "#0a0a0a",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 24px 64px" }}>

          {/* Timeline header */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
            <div style={{
              fontFamily: "'Barlow Condensed',sans-serif",
              fontSize: 11, fontWeight: 700,
              letterSpacing: "0.25em", textTransform: "uppercase",
              color: "#e05a00",
            }}>Our Journey</div>
            <div className="h-rule" style={{ flex: 1 }} />
            <div style={{
              fontFamily: "'Barlow Condensed',sans-serif",
              fontSize: 11, fontWeight: 700,
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: "#2a2a2a",
            }}>2008 — Present</div>
          </div>

          {/* Timeline items */}
          <div style={{ position: "relative" }}>
            <div className="timeline-connector" />
            {timelineData.map((item, i) => (
              <motion.div
                key={i}
                className="timeline-item"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                <div className="tl-dot-wrap">
                  <div className="tl-dot active" />
                </div>
                <span className="tl-year">{item.year}</span>
                <div className="tl-event">{item.event}</div>
                <p className="tl-desc">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── WELD BEAD BOTTOM STRIP ── */}
      <div style={{ display: "flex", height: 8, overflow: "hidden" }}>
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              background: i % 5 === 0 ? "#ff6a00" : "#e05a00",
              clipPath: "ellipse(45% 60% at 50% 50%)",
              margin: "0 1px",
              opacity: 0.5 + (i % 3) * 0.15,
            }}
          />
        ))}
      </div>
    </section>
  );
}