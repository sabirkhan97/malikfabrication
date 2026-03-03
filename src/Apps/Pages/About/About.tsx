import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle, MapPin, Phone, Clock, Award, Users, Wrench, Flame, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

const timeline = [
  { year: '2008', event: 'Founded', description: 'Started as a small fabrication workshop with two welders in Gurugram.' },
  { year: '2012', event: 'First Major Contract', description: 'Completed first large-scale industrial shed project for a manufacturing unit.' },
  { year: '2018', event: 'Expanding Horizons', description: 'Expanded operations to serve a broader range of industrial and commercial clients.' },
  { year: '2023', event: '500+ Projects', description: 'Hit a major milestone — same commitment to quality, bigger scale.' },
];

const stats = [
  { value: '15+', label: 'Years in Business', icon: Clock },
  { value: '500+', label: 'Projects Done', icon: Wrench },
  { value: '300+', label: 'Happy Clients', icon: Users },
  { value: '100%', label: 'Satisfaction', icon: Award },
];

const values = [
  { icon: Flame, title: 'Precision Welding', desc: 'Every weld laid with intent — MIG, TIG, arc — flawless finish every time.' },
  { icon: Shield, title: 'Structural Integrity', desc: 'Built to last decades. We never cut corners on material or technique.' },
  { icon: Zap, title: 'On-Time Delivery', desc: 'We respect your timeline as much as our own. Commitments are kept.' },
];

const missionPoints = ['Quality Craftsmanship', 'Modern Equipment', 'Skilled Workforce', 'Timely Delivery'];

const contactCards = [
  { icon: MapPin, title: 'Workshop', lines: ['663/25 Arjun Nagar, Street No. 8', 'Near Police Chowki, Gurugram, Haryana'], href: null },
  { icon: Phone, title: 'Call Us', lines: ['+91 78381 70214', '+91 83839 28255', '+91 92893 77069'], href: 'tel:+917838170214' },
  { icon: Clock, title: 'Working Hours', lines: ['Monday – Saturday', '8:00 AM – 6:00 PM', 'Sunday: Closed'], href: null },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;1,700&family=DM+Sans:wght@400;500;600&display=swap');

  :root {
    --navy: #0f1f3d;
    --blue: #1a3a6b;
    --accent: #e85d04;
    --accent-light: #ff7b2c;
    --steel: #f4f6fa;
    --border: #dde3ef;
    --text: #1a1f2e;
    --muted: #6b7280;
    --white: #ffffff;
  }

  .ab-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .ab-root { font-family: 'DM Sans', sans-serif; color: var(--text); background: var(--white); }
  .ab-root h1, .ab-root h2, .ab-root h3, .ab-root h4 { font-family: 'Barlow Condensed', sans-serif; }

  /* ── HERO ── */
  .ab-hero {
    position: relative; min-height: 100vh;
    display: flex; align-items: flex-end;
    overflow: hidden; padding-top: 80px;
  }
  .ab-hero-img { position: absolute; inset: 0; z-index: 0; }
  .ab-hero-img img {
    width: 100%; height: 100%; object-fit: cover; object-position: center;
    filter: brightness(0.28) saturate(0.4);
  }
  .ab-hero-overlay {
    position: absolute; inset: 0; z-index: 1;
    background: linear-gradient(to top, rgba(15,31,61,0.97) 35%, rgba(15,31,61,0.5) 75%, rgba(15,31,61,0.1) 100%);
  }
  .ab-hero-top-bar {
    position: absolute; top: 0; left: 0; right: 0; height: 4px; z-index: 3;
    background: linear-gradient(90deg, var(--accent), var(--blue) 60%, var(--accent));
  }
  .ab-hero-inner {
    position: relative; z-index: 2;
    max-width: 1200px; margin: 0 auto;
    padding: 0 24px 80px; width: 100%;
  }
  .ab-hero-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(232,93,4,0.15); border: 1px solid rgba(232,93,4,0.3);
    color: #ff9a5c; font-size: 11px; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 6px 14px; border-radius: 4px; margin-bottom: 24px;
  }
  .ab-hero-eyebrow span { width: 5px; height: 5px; background: var(--accent); border-radius: 50%; animation: ab-pulse 1.5s infinite; }
  @keyframes ab-pulse { 0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.5;transform:scale(1.3);} }
  .ab-hero-title {
    font-size: clamp(52px, 9vw, 96px); font-weight: 800; line-height: 0.95;
    text-transform: uppercase; letter-spacing: -0.02em; color: var(--white); margin-bottom: 24px;
  }
  .ab-ht-orange { color: var(--accent); }
  .ab-ht-italic { font-style: italic; color: rgba(255,255,255,0.42); font-weight: 700; }
  .ab-hero-sub {
    font-size: 15.5px; color: rgba(255,255,255,0.52);
    line-height: 1.72; max-width: 480px; margin-bottom: 36px;
  }
  .ab-hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }
  .ab-btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--accent); color: white; padding: 13px 26px; border-radius: 6px;
    font-family: 'DM Sans', sans-serif; font-size: 14.5px; font-weight: 600; text-decoration: none;
    transition: background 0.2s, transform 0.2s;
  }
  .ab-btn-primary:hover { background: var(--accent-light); transform: translateY(-2px); }
  .ab-btn-outline {
    display: inline-flex; align-items: center; gap: 8px;
    border: 1.5px solid rgba(255,255,255,0.22); color: rgba(255,255,255,0.78);
    padding: 13px 26px; border-radius: 6px;
    font-family: 'DM Sans', sans-serif; font-size: 14.5px; font-weight: 600; text-decoration: none;
    transition: border-color 0.2s, color 0.2s, background 0.2s;
  }
  .ab-btn-outline:hover { border-color: var(--accent); color: white; background: rgba(232,93,4,0.1); }

  /* ── STATS ── */
  .ab-stats-section { background: var(--navy); padding: 48px 0; }
  .ab-stats-inner {
    max-width: 1200px; margin: 0 auto; padding: 0 24px;
    display: grid; grid-template-columns: repeat(4, 1fr);
  }
  .ab-stat {
    padding: 24px 20px; text-align: center;
    border-right: 1px solid rgba(255,255,255,0.07);
    position: relative;
  }
  .ab-stat:last-child { border-right: none; }
  .ab-stat::before {
    content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%);
    width: 32px; height: 3px; background: var(--accent); border-radius: 0 0 2px 2px;
  }
  .ab-stat svg { width: 22px; height: 22px; color: var(--accent); margin: 0 auto 8px; display: block; }
  .ab-stat-val { font-family: 'Barlow Condensed', sans-serif; font-size: 36px; font-weight: 800; color: white; line-height: 1; }
  .ab-stat-lbl { font-size: 10.5px; color: rgba(255,255,255,0.38); margin-top: 4px; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; }

  /* ── SHARED ── */
  .ab-section { padding: 92px 0; }
  .ab-section-steel { background: var(--steel); }
  .ab-section-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
  .ab-tag { display: inline-block; font-size: 10.5px; font-weight: 700; letter-spacing: 0.13em; text-transform: uppercase; color: var(--accent); margin-bottom: 12px; }
  .ab-section-title { font-size: clamp(30px, 3.8vw, 50px); font-weight: 800; color: var(--navy); text-transform: uppercase; line-height: 1.05; letter-spacing: -0.01em; }
  .ab-title-blue { color: var(--blue); }
  .ab-title-orange { color: var(--accent); }
  .ab-divider { width: 44px; height: 4px; background: var(--accent); border-radius: 2px; margin-top: 14px; }

  /* ── MISSION ── */
  .ab-mission-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
  .ab-mission-quote {
    border-left: 4px solid var(--accent); padding: 14px 20px;
    background: var(--white); border-radius: 0 8px 8px 0;
    font-size: 15px; color: var(--text); line-height: 1.7;
    font-style: italic; margin-bottom: 20px;
    box-shadow: 0 2px 12px rgba(15,31,61,0.06);
  }
  .ab-mission-body { font-size: 14.5px; color: var(--muted); line-height: 1.75; margin-bottom: 24px; }
  .ab-mission-checks { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .ab-mission-check { display: flex; align-items: center; gap: 8px; }
  .ab-mission-check svg { width: 16px; height: 16px; color: var(--accent); flex-shrink: 0; }
  .ab-mission-check span { font-size: 13.5px; font-weight: 500; color: var(--navy); }
  .ab-mission-img-wrap { position: relative; }
  .ab-mission-img-wrap img { width: 100%; border-radius: 12px; display: block; box-shadow: 0 16px 48px rgba(15,31,61,0.14); filter: saturate(0.85); }
  .ab-mission-badge {
    position: absolute; bottom: -20px; right: 20px;
    background: var(--navy); color: white; padding: 18px 22px; border-radius: 10px;
    box-shadow: 0 8px 28px rgba(15,31,61,0.22); text-align: center;
  }
  .ab-mission-badge-val { font-family: 'Barlow Condensed', sans-serif; font-size: 36px; font-weight: 800; color: var(--accent); line-height: 1; }
  .ab-mission-badge-lbl { font-size: 11px; color: rgba(255,255,255,0.5); margin-top: 3px; }

  /* ── VALUES ── */
  .ab-values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; margin-top: 48px; }
  .ab-value-card {
    background: var(--white); border: 1px solid var(--border); border-radius: 12px; padding: 32px 26px;
    transition: box-shadow 0.25s, transform 0.25s; position: relative; overflow: hidden;
  }
  .ab-value-card::before { content: ''; position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: var(--accent); transform: scaleY(0); transform-origin: top; transition: transform 0.3s; }
  .ab-value-card:hover { box-shadow: 0 12px 40px rgba(15,31,61,0.1); transform: translateY(-4px); }
  .ab-value-card:hover::before { transform: scaleY(1); }
  .ab-value-ico { width: 50px; height: 50px; background: #e8eef9; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 18px; transition: background 0.25s; }
  .ab-value-card:hover .ab-value-ico { background: var(--accent); }
  .ab-value-ico svg { width: 22px; height: 22px; color: var(--blue); transition: color 0.25s; }
  .ab-value-card:hover .ab-value-ico svg { color: white; }
  .ab-value-title { font-size: 18px; font-weight: 700; color: var(--navy); text-transform: uppercase; letter-spacing: 0.02em; margin-bottom: 8px; }
  .ab-value-desc { font-size: 13.5px; color: var(--muted); line-height: 1.65; }

  /* ── TIMELINE ── */
  .ab-timeline { display: flex; flex-direction: column; margin-top: 48px; }
  .ab-tl-item { display: grid; grid-template-columns: 120px 1px 1fr; gap: 0 32px; padding-bottom: 44px; }
  .ab-tl-item:last-child { padding-bottom: 0; }
  .ab-tl-year { font-size: clamp(36px, 5vw, 52px); font-weight: 800; color: transparent; -webkit-text-stroke: 2px var(--accent); line-height: 1; letter-spacing: -0.02em; padding-top: 4px; text-align: right; }
  .ab-tl-line { display: flex; flex-direction: column; align-items: center; }
  .ab-tl-dot { width: 14px; height: 14px; border-radius: 50%; background: var(--accent); flex-shrink: 0; margin-top: 8px; box-shadow: 0 0 0 5px rgba(232,93,4,0.12); }
  .ab-tl-connector { flex: 1; width: 2px; background: linear-gradient(to bottom, var(--accent), var(--border)); margin-top: 6px; }
  .ab-tl-item:last-child .ab-tl-connector { display: none; }
  .ab-tl-content { padding-top: 4px; }
  .ab-tl-event { font-size: 19px; font-weight: 700; color: var(--navy); text-transform: uppercase; letter-spacing: 0.02em; margin-bottom: 6px; }
  .ab-tl-desc { font-size: 13.5px; color: var(--muted); line-height: 1.65; }

  /* ── CONTACT CARDS ── */
  .ab-contact-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; margin-top: 48px; }
  .ab-contact-card {
    background: var(--white); border: 1px solid var(--border); border-radius: 12px; padding: 28px;
    transition: box-shadow 0.25s; position: relative; overflow: hidden;
  }
  .ab-contact-card::before { content: ''; position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: var(--accent); transform: scaleY(0); transform-origin: top; transition: transform 0.3s; }
  .ab-contact-card:hover { box-shadow: 0 10px 36px rgba(15,31,61,0.09); }
  .ab-contact-card:hover::before { transform: scaleY(1); }
  .ab-contact-ico { width: 46px; height: 46px; background: #e8eef9; border-radius: 9px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; transition: background 0.25s; }
  .ab-contact-card:hover .ab-contact-ico { background: var(--accent); }
  .ab-contact-ico svg { width: 20px; height: 20px; color: var(--blue); transition: color 0.25s; }
  .ab-contact-card:hover .ab-contact-ico svg { color: white; }
  .ab-contact-title { font-size: 14px; font-weight: 700; color: var(--navy); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px; }
  .ab-contact-line { font-size: 13.5px; color: var(--muted); line-height: 1.72; }
  .ab-contact-link { display: inline-flex; align-items: center; gap: 5px; margin-top: 12px; color: var(--accent); font-size: 13px; font-weight: 600; text-decoration: none; transition: gap 0.18s; }
  .ab-contact-link:hover { gap: 9px; }

  /* ── CTA ── */
  .ab-cta { background: var(--navy); position: relative; overflow: hidden; padding: 96px 0; }
  .ab-cta-lines { position: absolute; inset: 0; background-image: repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(255,255,255,0.018) 40px, rgba(255,255,255,0.018) 41px); }
  .ab-cta-glow { position: absolute; right: -80px; top: -80px; width: 380px; height: 380px; border-radius: 50%; background: radial-gradient(circle, rgba(232,93,4,0.14), transparent 70%); }
  .ab-cta-inner { position: relative; z-index: 1; max-width: 800px; margin: 0 auto; padding: 0 24px; text-align: center; }
  .ab-cta-label { font-size: 10.5px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent); margin-bottom: 16px; }
  .ab-cta-title { font-size: clamp(36px, 5vw, 62px); font-weight: 800; color: white; text-transform: uppercase; line-height: 1.05; margin-bottom: 16px; letter-spacing: -0.01em; }
  .ab-cta-sub { color: rgba(255,255,255,0.52); font-size: 15.5px; line-height: 1.65; margin-bottom: 38px; max-width: 520px; margin-left: auto; margin-right: auto; }
  .ab-cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .ab-cta-btn1 { display: inline-flex; align-items: center; gap: 8px; background: var(--accent); color: white; padding: 14px 30px; border-radius: 6px; font-family: 'DM Sans', sans-serif; font-size: 14.5px; font-weight: 600; text-decoration: none; transition: background 0.2s, transform 0.2s; }
  .ab-cta-btn1:hover { background: var(--accent-light); transform: translateY(-2px); }
  .ab-cta-btn2 { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.2); color: white; padding: 14px 30px; border-radius: 6px; font-family: 'DM Sans', sans-serif; font-size: 14.5px; font-weight: 600; text-decoration: none; transition: background 0.2s; }
  .ab-cta-btn2:hover { background: rgba(255,255,255,0.14); }

  /* ── RESPONSIVE ── */
  @media (max-width: 1024px) {
    .ab-values-grid { grid-template-columns: repeat(2, 1fr); }
    .ab-contact-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 768px) {
    .ab-stats-inner { grid-template-columns: repeat(2, 1fr); }
    .ab-stat:nth-child(2) { border-right: none; }
    .ab-stat:nth-child(3) { border-top: 1px solid rgba(255,255,255,0.07); }
    .ab-stat:nth-child(4) { border-top: 1px solid rgba(255,255,255,0.07); border-right: none; }
    .ab-mission-grid { grid-template-columns: 1fr; gap: 48px; }
    .ab-mission-badge { bottom: 16px; right: 16px; }
    .ab-values-grid { grid-template-columns: 1fr; }
    .ab-contact-grid { grid-template-columns: 1fr; }
    .ab-section { padding: 60px 0; }

    /* Timeline: switch to fully vertical stacked layout */
    .ab-tl-item {
      display: flex;
      flex-direction: column;
      gap: 0;
      padding-bottom: 0;
      border-left: 2px solid var(--border);
      margin-left: 12px;
      padding-left: 22px;
      padding-bottom: 36px;
      position: relative;
    }
    .ab-tl-item:last-child { padding-bottom: 0; border-left-color: transparent; }
    .ab-tl-item::before {
      content: '';
      position: absolute;
      left: -8px; top: 6px;
      width: 14px; height: 14px;
      border-radius: 50%;
      background: var(--accent);
      box-shadow: 0 0 0 4px rgba(232,93,4,0.12);
    }
    .ab-tl-year {
      font-size: 32px; text-align: left;
      margin-bottom: 4px; -webkit-text-stroke: 1.5px var(--accent);
    }
    .ab-tl-line { display: none; }
  }
  @media (max-width: 480px) {
    .ab-mission-checks { grid-template-columns: 1fr; }
    .ab-hero-title { font-size: 44px; }
  }
`;

export default function About() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  return (
    <>
      <style>{CSS}</style>
      <div className="ab-root">

        {/* ── HERO ── */}
        <section className="ab-hero" ref={heroRef}>
          <motion.div className="ab-hero-img" style={{ y: yParallax }}>
            <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1400&q=80" alt="Welding workshop" />
          </motion.div>
          <div className="ab-hero-overlay" />
          <div className="ab-hero-top-bar" />
          <div className="ab-hero-inner">
            <motion.div initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              <div className="ab-hero-eyebrow">
                <span />
                Established 2008 · Gurugram, Haryana
              </div>
              <h1 className="ab-hero-title">
                Built on<br />
                <span className="ab-ht-orange">Steel</span><br />
                <span className="ab-ht-italic">&amp; Skill.</span>
              </h1>
              <p className="ab-hero-sub">
                Since 2008, MK Fabrication has delivered precision metalwork that holds up
                under real-world conditions — no corners cut, no compromises made.
              </p>
              <div className="ab-hero-btns">
                <Link to="/contact" className="ab-btn-primary">Get a Quote <ArrowRight size={16} /></Link>
                <a href="tel:+917838170214" className="ab-btn-outline"><Phone size={15} /> Call Now</a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── STATS ── */}
        <div className="ab-stats-section">
          <div className="ab-stats-inner">
            {stats.map((s, i) => (
              <motion.div className="ab-stat" key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                <s.icon />
                <div className="ab-stat-val">{s.value}</div>
                <div className="ab-stat-lbl">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── MISSION ── */}
        <section className="ab-section">
          <div className="ab-section-inner">
            <div className="ab-mission-grid">
              <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
                <span className="ab-tag">Who We Are</span>
                <h2 className="ab-section-title">Our <span className="ab-title-orange">Mission</span></h2>
                <div className="ab-divider" style={{ marginBottom: 28 }} />
                <div className="ab-mission-quote">
                  We combine traditional craftsmanship with modern engineering to build
                  metal structures that last decades. Every weld is laid with intent.
                </div>
                <p className="ab-mission-body">
                  Transparency, quality, and your satisfaction aren't slogans here.
                  They're how we operate on every project, every day — from a single
                  bracket to a full structural build.
                </p>
                <div className="ab-mission-checks">
                  {missionPoints.map((pt, i) => (
                    <motion.div className="ab-mission-check" key={i}
                      initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }}>
                      <CheckCircle />
                      <span>{pt}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div className="ab-mission-img-wrap"
                initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.15 }}>
                <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80" alt="Workshop" />
                <div className="ab-mission-badge">
                  <div className="ab-mission-badge-val" style={{ fontSize: 18 }}>Est.</div>
                  <div className="ab-mission-badge-val">2008</div>
                  <div className="ab-mission-badge-lbl">Gurugram, Haryana</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="ab-section ab-section-steel">
          <div className="ab-section-inner">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="ab-tag">Why Choose Us</span>
              <h2 className="ab-section-title">What Sets Us <span className="ab-title-blue">Apart</span></h2>
              <div className="ab-divider" />
            </motion.div>
            <div className="ab-values-grid">
              {values.map((v, i) => (
                <motion.div className="ab-value-card" key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.42, delay: i * 0.1 }}>
                  <div className="ab-value-ico"><v.icon /></div>
                  <div className="ab-value-title">{v.title}</div>
                  <p className="ab-value-desc">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section className="ab-section">
          <div className="ab-section-inner">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="ab-tag">Our Story</span>
              <h2 className="ab-section-title">The <span className="ab-title-orange">Journey</span></h2>
              <div className="ab-divider" />
            </motion.div>
            <div className="ab-timeline">
              {timeline.map((item, i) => (
                <motion.div className="ab-tl-item" key={i}
                  initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.42, delay: i * 0.1 }}>
                  <div className="ab-tl-year">{item.year}</div>
                  <div className="ab-tl-line">
                    <div className="ab-tl-dot" />
                    <div className="ab-tl-connector" />
                  </div>
                  <div className="ab-tl-content">
                    <div className="ab-tl-event">{item.event}</div>
                    <p className="ab-tl-desc">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT CARDS ── */}
        <section className="ab-section ab-section-steel">
          <div className="ab-section-inner">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="ab-tag">Find Us</span>
              <h2 className="ab-section-title">Get In <span className="ab-title-blue">Touch</span></h2>
              <div className="ab-divider" />
            </motion.div>
            <div className="ab-contact-grid">
              {contactCards.map((card, i) => (
                <motion.div className="ab-contact-card" key={i}
                  initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.09 }}>
                  <div className="ab-contact-ico"><card.icon /></div>
                  <div className="ab-contact-title">{card.title}</div>
                  {card.lines.map((line, j) => <div className="ab-contact-line" key={j}>{line}</div>)}
                  {card.href && (
                    <a href={card.href} className="ab-contact-link">Call Now <ArrowRight size={13} /></a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="ab-cta">
          <div className="ab-cta-lines" />
          <div className="ab-cta-glow" />
          <div className="ab-cta-inner">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="ab-cta-label">Ready to Build?</div>
              <h2 className="ab-cta-title">Let's Work<br /><span style={{ color: 'var(--accent)' }}>Together</span></h2>
              <p className="ab-cta-sub">Free consultation, honest pricing, quality you can trust. Reach out today and let's discuss your project.</p>
              <div className="ab-cta-btns">
                <Link to="/contact" className="ab-cta-btn1">Get In Touch <ArrowRight size={16} /></Link>
                <a href="tel:+917838170214" className="ab-cta-btn2"><Phone size={16} /> +91 78381 70214</a>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
}