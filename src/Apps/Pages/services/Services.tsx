import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Flame, Wrench, Shield, Building2, Hammer, DoorOpen, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: Flame,
    title: 'Custom Fabrication',
    description: 'From raw steel to finished structure — we build exactly what your project demands with zero compromise on quality.',
    features: ['Structural steel fabrication', 'Custom brackets & mounts', 'Prototype to production runs'],
    image: 'https://static.rivexa.com/_next/static/media/Fabrication.7e047f33.webp',
    tag: 'Core Service',
  },
  {
    icon: Wrench,
    title: 'MIG & TIG Welding',
    description: 'Precision arc welding for every material and application. Clean beads, full penetration, every pass certified.',
    features: ['Stainless, aluminum, carbon steel', 'Certified welders on staff', 'Pressure vessel rated'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReeBWJuXjocoGZGcjT06ZZlcRjchWbjeLbiA&s',
    tag: 'Certified',
  },
  {
    icon: Building2,
    title: 'Industrial Sheds',
    description: 'Durable steel sheds for industrial applications. Built to last with quality materials and expert craftsmanship.',
    features: ['Heavy steel construction', 'Weatherproof designs', 'Custom sizes available'],
    image: 'https://internal-assets.jswonemsme.com/Industrialshedssteel3_1736772173760_9ee78666a4/Industrialshedssteel3_1736772173760_9ee78666a4.jpeg',
    tag: 'Structural',
  },
  {
    icon: DoorOpen,
    title: 'Gates & Grills',
    description: 'Elegant and secure gates, rolling shutters, and security grills for residential and commercial properties.',
    features: ['Fancy gates & grills', 'Channel gates', 'Security railings'],
    image: 'https://image.made-in-china.com/2f0j00cktoYIVBHebP/Latest-House-Main-Gate-Grill-Designs-Garden-Door-Wrought-Iron-Gate.jpg',
    tag: 'Custom',
  },
  {
    icon: Shield,
    title: 'Repair & Restoration',
    description: 'Professional repair services for damaged metal structures, equipment, and machinery.',
    features: ['Heavy equipment repair', 'Farm & ag machinery', 'Emergency turnaround'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvjd63IrV6CyNqmNZ7e9NDqx9U7YMhE0dIFQ&s',
    tag: 'Repair',
  },
  {
    icon: Hammer,
    title: 'Structural Fabrication',
    description: 'Complete structural steel solutions for buildings, warehouses, and industrial facilities.',
    features: ['Steel structures', 'Steel balconies', 'Custom metal artwork'],
    image: 'https://eminencemetal.com/wp-content/uploads/2021/10/Structural-Steel-Fabrication.jpg',
    tag: 'Industrial',
  },
];

const whyChooseUs = [
  '15+ Years of Experience',
  'Certified Professional Welders',
  'Quality Assurance Guaranteed',
  'On-Time Project Delivery',
  'Competitive Pricing',
  '24/7 Customer Support',
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

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

  .sv-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .sv-root { font-family: 'DM Sans', sans-serif; color: var(--text); background: var(--white); }
  .sv-root h1, .sv-root h2, .sv-root h3, .sv-root h4 { font-family: 'Barlow Condensed', sans-serif; }

  /* ── HERO ── */
  .sv-hero {
    position: relative;
    padding: 120px 0 80px;
    background: var(--white);
    overflow: hidden;
  }
  .sv-hero-bar {
    position: absolute; left: 0; top: 0;
    width: 5px; height: 100%;
    background: linear-gradient(to bottom, var(--accent), var(--blue));
  }
  .sv-hero-stripe {
    position: absolute; top: 0; right: 0;
    width: 42%; height: 100%;
    background: var(--steel);
    clip-path: polygon(12% 0, 100% 0, 100% 100%, 0% 100%);
  }
  .sv-hero-dots {
    position: absolute; top: 0; right: 0;
    width: 42%; height: 100%;
    background-image: radial-gradient(circle, #c0cde8 1px, transparent 1px);
    background-size: 26px 26px;
    opacity: 0.42;
    clip-path: polygon(12% 0, 100% 0, 100% 100%, 0% 100%);
  }
  .sv-hero-inner {
    position: relative; z-index: 1;
    max-width: 1200px; margin: 0 auto; padding: 0 24px;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 48px;
  }
  .sv-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    background: #fff8f4; border: 1px solid #fdd0b0;
    color: var(--accent); font-size: 11px; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase;
    padding: 6px 14px; border-radius: 4px; margin-bottom: 20px;
  }
  .sv-eyebrow-dot {
    width: 6px; height: 6px; background: var(--accent);
    border-radius: 50%; animation: sv-pulse 1.5s infinite;
  }
  @keyframes sv-pulse {
    0%,100%{ opacity:1; transform:scale(1); }
    50%{ opacity:0.5; transform:scale(1.3); }
  }
  .sv-hero-title {
    font-size: clamp(52px, 6vw, 84px);
    font-weight: 800; color: var(--navy);
    text-transform: uppercase; line-height: 1.0;
    letter-spacing: -0.01em; margin-bottom: 18px;
  }
  .sv-title-solid { color: var(--blue); }
  .sv-title-outline { color: transparent; -webkit-text-stroke: 2.5px var(--navy); }
  .sv-hero-sub {
    font-size: 15.5px; color: var(--muted);
    line-height: 1.7; max-width: 520px; margin-bottom: 32px;
  }
  .sv-hero-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--accent); color: #fff;
    padding: 13px 26px; border-radius: 6px;
    font-weight: 600; font-size: 14.5px; text-decoration: none;
    transition: background 0.2s, transform 0.2s;
  }
  .sv-hero-btn:hover { background: var(--accent-light); transform: translateY(-2px); }

  /* Count badge in hero right */
  .sv-hero-badge {
    display: flex; flex-direction: column; align-items: center;
    justify-content: center;
    background: var(--navy); color: white;
    width: 140px; height: 140px; border-radius: 50%;
    text-align: center; flex-shrink: 0;
    box-shadow: 0 8px 32px rgba(15,31,61,0.2);
  }
  .sv-hero-badge-val {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 44px; font-weight: 800; line-height: 1;
    color: var(--accent);
  }
  .sv-hero-badge-lbl {
    font-size: 11px; font-weight: 600; letter-spacing: 0.05em;
    text-transform: uppercase; color: rgba(255,255,255,0.7);
    margin-top: 4px;
  }

  /* ── SECTION SHARED ── */
  .sv-section { padding: 92px 0; }
  .sv-section-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
  .sv-section-steel { background: var(--steel); }
  .sv-tag {
    display: inline-block; font-size: 10.5px; font-weight: 700;
    letter-spacing: 0.13em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 12px;
  }
  .sv-section-title {
    font-size: clamp(30px, 3.8vw, 50px); font-weight: 800;
    color: var(--navy); text-transform: uppercase;
    line-height: 1.05; letter-spacing: -0.01em;
  }
  .sv-title-orange { color: var(--accent); }
  .sv-title-blue { color: var(--blue); }
  .sv-divider { width: 44px; height: 4px; background: var(--accent); border-radius: 2px; margin-top: 14px; }

  /* ── SERVICES GRID ── */
  .sv-grid-hd { margin-bottom: 52px; }
  .sv-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }

  .sv-card {
    background: var(--white); border: 1px solid var(--border);
    border-radius: 12px; overflow: hidden;
    transition: box-shadow 0.25s, transform 0.25s;
    display: flex; flex-direction: column;
  }
  .sv-card:hover { box-shadow: 0 16px 48px rgba(15,31,61,0.12); transform: translateY(-5px); }

  .sv-card-img {
    position: relative; height: 210px; overflow: hidden;
  }
  .sv-card-img img {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.5s;
  }
  .sv-card:hover .sv-card-img img { transform: scale(1.07); }
  .sv-card-img-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(15,31,61,0.55) 0%, transparent 60%);
  }
  .sv-card-tag {
    position: absolute; top: 12px; left: 12px;
    background: var(--accent); color: white;
    font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; padding: 4px 9px; border-radius: 4px;
  }
  .sv-card-ico {
    position: absolute; bottom: 14px; left: 14px;
    width: 44px; height: 44px; border-radius: 8px;
    background: var(--accent);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 14px rgba(232,93,4,0.35);
  }
  .sv-card-ico svg { width: 20px; height: 20px; color: white; }

  .sv-card-body { padding: 24px; flex: 1; display: flex; flex-direction: column; }
  .sv-card-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 20px; font-weight: 700; color: var(--navy);
    text-transform: uppercase; letter-spacing: 0.02em; margin-bottom: 8px;
  }
  .sv-card-desc { font-size: 13.5px; color: var(--muted); line-height: 1.62; margin-bottom: 18px; }
  .sv-card-feats { display: flex; flex-direction: column; gap: 7px; margin-top: auto; }
  .sv-card-feat {
    display: flex; align-items: center; gap: 8px;
    font-size: 12.5px; color: var(--text);
  }
  .sv-card-feat svg { width: 14px; height: 14px; color: var(--accent); flex-shrink: 0; }

  /* ── WHY CHOOSE US ── */
  .sv-why-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center;
  }
  .sv-why-title { margin-bottom: 16px; }
  .sv-why-body {
    font-size: 15px; color: var(--muted); line-height: 1.72; margin-bottom: 32px;
  }
  .sv-why-list { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .sv-why-item { display: flex; align-items: center; gap: 10px; }
  .sv-why-item svg { width: 18px; height: 18px; color: var(--accent); flex-shrink: 0; }
  .sv-why-item span { font-size: 14px; font-weight: 500; color: var(--navy); }

  /* Image right */
  .sv-why-img-wrap { position: relative; }
  .sv-why-img-wrap img {
    width: 100%; border-radius: 12px;
    box-shadow: 0 16px 48px rgba(15,31,61,0.14); display: block;
  }
  .sv-why-badge {
    position: absolute; bottom: -20px; left: -20px;
    background: var(--navy); color: white;
    padding: 20px 24px; border-radius: 10px;
    box-shadow: 0 8px 28px rgba(15,31,61,0.22);
  }
  .sv-why-badge-val {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 40px; font-weight: 800; color: var(--accent); line-height: 1;
  }
  .sv-why-badge-lbl { font-size: 12px; color: rgba(255,255,255,0.65); margin-top: 4px; font-weight: 500; }

  /* ── CTA ── */
  .sv-cta {
    background: var(--navy); position: relative;
    overflow: hidden; padding: 96px 0;
  }
  .sv-cta-lines {
    position: absolute; inset: 0;
    background-image: repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(255,255,255,0.018) 40px, rgba(255,255,255,0.018) 41px);
  }
  .sv-cta-glow {
    position: absolute; left: -80px; bottom: -80px;
    width: 380px; height: 380px; border-radius: 50%;
    background: radial-gradient(circle, rgba(232,93,4,0.14), transparent 70%);
  }
  .sv-cta-inner { position: relative; z-index: 1; max-width: 800px; margin: 0 auto; padding: 0 24px; text-align: center; }
  .sv-cta-title {
    font-size: clamp(34px, 5vw, 60px); font-weight: 800; color: white;
    text-transform: uppercase; line-height: 1.05;
    margin-bottom: 16px; letter-spacing: -0.01em;
  }
  .sv-cta-sub { color: rgba(255,255,255,0.58); font-size: 15.5px; line-height: 1.65; margin-bottom: 38px; max-width: 540px; margin-left: auto; margin-right: auto; }
  .sv-cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .sv-cta-btn1 {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--accent); color: white;
    padding: 14px 30px; border-radius: 6px;
    font-weight: 600; font-size: 14.5px; text-decoration: none;
    transition: background 0.2s, transform 0.2s;
  }
  .sv-cta-btn1:hover { background: var(--accent-light); transform: translateY(-2px); }
  .sv-cta-btn2 {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.2);
    color: white; padding: 14px 30px; border-radius: 6px;
    font-weight: 600; font-size: 14.5px; text-decoration: none;
    transition: background 0.2s;
  }
  .sv-cta-btn2:hover { background: rgba(255,255,255,0.14); }

  /* ── RESPONSIVE ── */
  @media (max-width: 1024px) {
    .sv-grid { grid-template-columns: repeat(2, 1fr); }
    .sv-why-grid { gap: 48px; }
    .sv-why-list { grid-template-columns: 1fr; }
  }
  @media (max-width: 768px) {
    .sv-hero-stripe, .sv-hero-dots { display: none; }
    .sv-hero-inner { grid-template-columns: 1fr; gap: 32px; }
    .sv-hero-badge { width: 110px; height: 110px; }
    .sv-hero-badge-val { font-size: 34px; }
    .sv-grid { grid-template-columns: 1fr; }
    .sv-why-grid { grid-template-columns: 1fr; gap: 48px; }
    .sv-why-badge { bottom: -16px; left: -12px; }
    .sv-section { padding: 60px 0; }
    .sv-why-list { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 480px) {
    .sv-hero-title { font-size: 44px; }
    .sv-why-list { grid-template-columns: 1fr; }
  }
`;

export default function Services() {
  return (
    <>
      <style>{CSS}</style>
      <div className="sv-root">

        {/* ── HERO ── */}
        <section className="sv-hero">
          <div className="sv-hero-bar" />
          <div className="sv-hero-stripe" />
          <div className="sv-hero-dots" />

          <div className="sv-hero-inner">
            <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <div className="sv-eyebrow">
                <span className="sv-eyebrow-dot" />
                Professional Fabrication Services
              </div>
              <h1 className="sv-hero-title">
                What We<br />
                <span className="sv-title-solid">Build</span>{' '}
                <span className="sv-title-outline">&amp; Weld</span>
              </h1>
              <p className="sv-hero-sub">
                Comprehensive metal fabrication and welding services tailored to your exact requirements.
                From one-off custom jobs to large-scale industrial installations — done right, on time.
              </p>
              <Link to="/contact" className="sv-hero-btn">
                Get Free Quote <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              className="sv-hero-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <div className="sv-hero-badge-val">6+</div>
              <div className="sv-hero-badge-lbl">Service<br />Categories</div>
            </motion.div>
          </div>
        </section>

        {/* ── SERVICES GRID ── */}
        <section className="sv-section">
          <div className="sv-section-inner">
            <div className="sv-grid-hd">
              <span className="sv-tag">What We Offer</span>
              <h2 className="sv-section-title">
                Our <span className="sv-title-orange">Services</span>
              </h2>
              <div className="sv-divider" />
            </div>

            <div className="sv-grid">
              {services.map((s, i) => (
                <motion.div
                  className="sv-card"
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.42, delay: i * 0.07 }}
                  viewport={{ once: true }}
                >
                  <div className="sv-card-img">
                    <img src={s.image} alt={s.title} />
                    <div className="sv-card-img-overlay" />
                    <span className="sv-card-tag">{s.tag}</span>
                    <div className="sv-card-ico"><s.icon /></div>
                  </div>
                  <div className="sv-card-body">
                    <div className="sv-card-title">{s.title}</div>
                    <p className="sv-card-desc">{s.description}</p>
                    <ul className="sv-card-feats">
                      {s.features.map((f, fi) => (
                        <li className="sv-card-feat" key={fi}>
                          <CheckCircle />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE US ── */}
        <section className="sv-section sv-section-steel">
          <div className="sv-section-inner">
            <div className="sv-why-grid">
              {/* Left */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55 }}
                viewport={{ once: true }}
              >
                <span className="sv-tag">Our Strengths</span>
                <h2 className="sv-section-title sv-why-title">
                  Why Choose{' '}
                  <span className="sv-title-blue">Malik</span>{' '}
                  <span className="sv-title-orange">Fabrication</span>
                </h2>
                <div className="sv-divider" style={{ marginBottom: 24 }} />
                <p className="sv-why-body">
                  With over 15 years of experience in the fabrication industry, we have built
                  a reputation for excellence, quality, and reliability. Our commitment to
                  customer satisfaction sets us apart from the competition.
                </p>
                <div className="sv-why-list">
                  {whyChooseUs.map((item, i) => (
                    <motion.div
                      className="sv-why-item"
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.06 }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right */}
              <motion.div
                className="sv-why-img-wrap"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 0.15 }}
                viewport={{ once: true }}
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7KZAcNgLr6ieEYQ1wyVJv_mnBtmmLdBS7Wg&s"
                  alt="Quality Fabrication"
                />
                <div className="sv-why-badge">
                  <div className="sv-why-badge-val">15+</div>
                  <div className="sv-why-badge-lbl">Years of Excellence</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="sv-cta">
          <div className="sv-cta-lines" />
          <div className="sv-cta-glow" />
          <div className="sv-cta-inner">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="sv-cta-title">
                Need a Custom<br />Fabrication Solution?
              </h2>
              <p className="sv-cta-sub">
                Contact us today to discuss your project requirements. Our team will provide
                you with a competitive quote and timeline.
              </p>
              <div className="sv-cta-btns">
                <Link to="/contact" className="sv-cta-btn1">
                  Get Free Quote <ArrowRight size={16} />
                </Link>
                <a href="tel:+917838170214" className="sv-cta-btn2">
                  <Phone size={16} /> +91 78381 70214
                </a>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
}