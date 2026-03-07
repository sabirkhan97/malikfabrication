import { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { ArrowRight, CheckCircle, Shield, Zap, Award, Clock, Users, Wrench, Phone, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Animated Counter ───────────────────────────────────────────────
function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const match = value.match(/^(\d+)(.*)$/);
  const num = match ? parseInt(match[1]) : 0;
  const suffix = match ? match[2] : '';

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const ctrl = animate(0, num, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => { el.textContent = Math.round(v) + suffix; },
    });
    return ctrl.stop;
  }, [inView, num, suffix]);

  return <div ref={ref} className="mf-stat-val">{value}</div>;
}

// ─── Reusable fade-up when scrolled into view ───────────────────────
function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Section heading reveal with animated underline ─────────────────
function SectionHead({
  tag,
  title,
  center = false,
  divider = true,
}: {
  tag: string;
  title: React.ReactNode;
  center?: boolean;
  divider?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  return (
    <div ref={ref} style={center ? { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 56 } : { marginBottom: 0 }}>
      <motion.span
        className="mf-tag"
        initial={{ opacity: 0, x: -12 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        {tag}
      </motion.span>

      <motion.h2
        className="mf-section-title"
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </motion.h2>

      {divider && (
        <motion.div
          className={`mf-divider${center ? ' mf-divider-center' : ''}`}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: center ? 'center' : 'left' }}
        />
      )}
    </div>
  );
}

const features = [
  { icon: Shield, title: 'Quality Assurance', description: 'Every project undergoes rigorous quality checks to ensure precision and long-term durability.' },
  { icon: Zap, title: 'Fast Turnaround', description: 'On-time delivery guaranteed through efficient project management and a skilled workforce.' },
  { icon: Award, title: 'Expert Craftsmanship', description: '15+ years of proven experience in metal fabrication and welding services.' },
  { icon: Clock, title: '24/7 Support', description: 'Round-the-clock assistance for quotes, project updates, and after-service support.' },
];

const services = [
  { title: 'Metal Fabrication', description: 'Custom-built metal structures with precision finishing for industrial and commercial applications.', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600', tag: 'Industrial' },
  { title: 'Welding Services', description: 'Professional MIG & TIG welding by certified welders with full quality assurance.', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600', tag: 'Certified' },
  { title: 'Industrial Sheds', description: 'Durable steel sheds designed and fabricated to your exact specifications.', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600', tag: 'Structural' },
  { title: 'Gates & Railings', description: 'Elegant, secure gates, grills, and railings for residential and commercial spaces.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600', tag: 'Custom' },
];

const stats = [
  { value: '15+', label: 'Years Experience', icon: Clock },
  { value: '500+', label: 'Projects Done', icon: Wrench },
  { value: '300+', label: 'Happy Clients', icon: Users },
  { value: '100%', label: 'Quality Guaranteed', icon: Award },
];

const trustBadges = ['ISO 9001 Certified', '15+ Years Experience', '500+ Projects', '100% Satisfaction'];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=DM+Sans:ital,wght@0,400;0,500;0,600&display=swap');

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

  .mf-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .mf-root { font-family: 'DM Sans', sans-serif; color: var(--text); background: var(--white); }
  .mf-root h1, .mf-root h2, .mf-root h3 { font-family: 'Barlow Condensed', sans-serif; }

  .mf-hero {
    position: relative; min-height: 100vh; background: var(--white);
    display: flex; align-items: center; overflow: hidden; padding-top: 80px;
  }
  .mf-hero-stripe {
    position: absolute; top: 0; right: 0; width: 52%; height: 100%;
    background: var(--steel); clip-path: polygon(9% 0, 100% 0, 100% 100%, 0% 100%);
  }
  .mf-hero-dots {
    position: absolute; top: 0; right: 0; width: 52%; height: 100%;
    background-image: radial-gradient(circle, #c0cde8 1px, transparent 1px);
    background-size: 26px 26px; opacity: 0.45;
    clip-path: polygon(9% 0, 100% 0, 100% 100%, 0% 100%);
  }
  .mf-hero-bar {
    position: absolute; left: 0; top: 0; width: 5px; height: 100%;
    background: linear-gradient(to bottom, var(--accent), var(--blue));
  }
  .mf-hero-inner {
    position: relative; z-index: 1; max-width: 1200px; margin: 0 auto;
    padding: 60px 24px; display: grid; grid-template-columns: 1fr 1fr;
    gap: 60px; align-items: center; width: 100%;
  }
  .mf-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    background: #fff8f4; border: 1px solid #fdd0b0;
    color: var(--accent); font-size: 11px; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase;
    padding: 6px 14px; border-radius: 4px; margin-bottom: 22px;
  }
  .mf-eyebrow-dot {
    width: 6px; height: 6px; background: var(--accent); border-radius: 50%;
    animation: mf-pulse 1.5s infinite;
  }
  @keyframes mf-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.3); }
  }
  .mf-hero-title {
    font-size: clamp(48px, 5.5vw, 78px); font-weight: 800; line-height: 1.0;
    color: var(--navy); letter-spacing: -0.01em; margin-bottom: 20px; text-transform: uppercase;
  }
  .mf-title-solid { color: var(--blue); }
  .mf-title-outline { color: transparent; -webkit-text-stroke: 2.5px var(--navy); }
  .mf-hero-sub { font-size: 15.5px; color: var(--muted); line-height: 1.7; max-width: 460px; margin-bottom: 34px; }
  .mf-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 46px; }

  /* ─── BUTTON: Primary — shine sweep + lift + glow ─── */
  .mf-btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--accent); color: #fff;
    padding: 13px 26px; border-radius: 6px;
    font-weight: 600; font-size: 14.5px; text-decoration: none;
    position: relative; overflow: hidden;
    transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
  }
  .mf-btn-primary::before {
    content: '';
    position: absolute; top: 0; left: -75%;
    width: 50%; height: 100%;
    background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%);
    transform: skewX(-20deg);
    transition: left 0.5s ease;
  }
  .mf-btn-primary:hover::before { left: 130%; }
  .mf-btn-primary:hover {
    background: var(--accent-light);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(232,93,4,0.38);
  }
  .mf-btn-primary:active { transform: translateY(0) scale(0.97); box-shadow: none; }

  /* ─── BUTTON: Secondary — fill slide from left ─── */
  .mf-btn-secondary {
    display: inline-flex; align-items: center; gap: 8px;
    border: 2px solid var(--navy); color: var(--navy);
    padding: 13px 26px; border-radius: 6px;
    font-weight: 600; font-size: 14.5px; text-decoration: none;
    position: relative; overflow: hidden; background: transparent;
    transition: color 0.25s, transform 0.2s;
  }
  .mf-btn-secondary::before {
    content: ''; position: absolute; inset: 0;
    background: var(--navy);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.28s ease; z-index: 0;
  }
  .mf-btn-secondary span, .mf-btn-secondary svg { position: relative; z-index: 1; }
  .mf-btn-secondary:hover::before { transform: scaleX(1); }
  .mf-btn-secondary:hover { color: #fff; transform: translateY(-2px); }
  .mf-btn-secondary:active { transform: translateY(0) scale(0.97); }

  /* ─── BUTTON: Phone ─── */
  .ab-cta-btn2 {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(0,0,0,0.04); border: 1px solid rgba(0,0,0,0.12);
    color: #111; padding: 13px 26px; border-radius: 6px;
    font-family: 'DM Sans', sans-serif; font-size: 14.5px; font-weight: 600;
    text-decoration: none;
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  }
  .ab-cta-btn2:hover { background: rgba(0,0,0,0.08); transform: translateY(-2px); box-shadow: 0 4px 14px rgba(0,0,0,0.1); }
  .ab-cta-btn2:active { transform: translateY(0) scale(0.97); }

  /* Stats bar */
  .mf-stats-bar {
    display: grid; grid-template-columns: repeat(4, 1fr);
    border: 1px solid var(--border); border-radius: 10px;
    overflow: hidden; background: var(--white);
    box-shadow: 0 2px 16px rgba(15,31,61,0.07);
  }
  .mf-stat { padding: 18px 14px; text-align: center; border-right: 1px solid var(--border); transition: background 0.2s; }
  .mf-stat:last-child { border-right: none; }
  .mf-stat:hover { background: #fff8f4; }
  .mf-stat svg { width: 24px; height: 24px; color: var(--accent); margin: 0 auto 6px; display: block; }
  .mf-stat-val { font-family: 'Barlow Condensed', sans-serif; font-size: 28px; font-weight: 800; color: var(--navy); line-height: 1; }
  .mf-stat-lbl { font-size: 10px; color: var(--muted); margin-top: 3px; font-weight: 500; letter-spacing: 0.04em; text-transform: uppercase; }

  /* Image grid */
  .mf-img-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; position: relative; }
  .mf-img-col { display: flex; flex-direction: column; gap: 14px; }
  .mf-img-col:nth-child(2) { margin-top: 36px; }
  .mf-img-grid img { width: 100%; border-radius: 10px; object-fit: cover; display: block; box-shadow: 0 8px 32px rgba(15,31,61,0.12); transition: transform 0.4s, box-shadow 0.4s; }
  .mf-img-grid img:hover { transform: scale(1.03); box-shadow: 0 16px 40px rgba(15,31,61,0.18); }
  .mf-img-badge {
    position: absolute; bottom: 16px; left: -16px;
    background: var(--accent); color: white; padding: 11px 16px; border-radius: 7px;
    font-family: 'Barlow Condensed', sans-serif; font-size: 14px; font-weight: 700;
    letter-spacing: 0.04em; box-shadow: 0 8px 24px rgba(232,93,4,0.3); z-index: 2;
    /* gentle float */
    animation: mf-float 3.5s ease-in-out infinite;
  }
  @keyframes mf-float {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-6px); }
  }

  .mf-section { padding: 92px 0; }
  .mf-section-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
  .mf-section-steel { background: var(--steel); }
  .mf-tag { display: inline-block; font-size: 10.5px; font-weight: 700; letter-spacing: 0.13em; text-transform: uppercase; color: var(--accent); margin-bottom: 12px; }
  .mf-section-title { font-size: clamp(30px, 3.8vw, 50px); font-weight: 800; color: var(--navy); text-transform: uppercase; line-height: 1.05; letter-spacing: -0.01em; }
  .mf-title-blue { color: var(--blue); }
  .mf-title-orange { color: var(--accent); }
  .mf-divider { width: 44px; height: 4px; background: var(--accent); border-radius: 2px; margin-top: 14px; }
  .mf-divider-center { margin-left: auto; margin-right: auto; }

  /* Features */
  .mf-feat-hd { display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 56px; }
  .mf-feat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px; }
  .mf-feat-card {
    background: var(--white); border: 1px solid var(--border);
    border-radius: 12px; padding: 34px 26px;
    transition: box-shadow 0.25s, transform 0.25s; position: relative; overflow: hidden;
  }
  .mf-feat-card::before {
    content: ''; position: absolute; top: 0; left: 0;
    width: 4px; height: 100%; background: var(--accent);
    transform: scaleY(0); transform-origin: top; transition: transform 0.3s;
  }
  .mf-feat-card:hover { box-shadow: 0 12px 40px rgba(15,31,61,0.1); transform: translateY(-4px); }
  .mf-feat-card:hover::before { transform: scaleY(1); }
  .mf-feat-ico-wrap {
    width: 50px; height: 50px; background: #e8eef9; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 18px; transition: background 0.25s, transform 0.25s;
  }
  .mf-feat-card:hover .mf-feat-ico-wrap { background: var(--accent); transform: scale(1.1); }
  .mf-feat-ico-wrap svg { width: 22px; height: 22px; color: var(--blue); transition: color 0.25s; }
  .mf-feat-card:hover .mf-feat-ico-wrap svg { color: white; }
  .mf-feat-title { font-family: 'Barlow Condensed', sans-serif; font-size: 19px; font-weight: 700; color: var(--navy); text-transform: uppercase; letter-spacing: 0.02em; margin-bottom: 9px; }
  .mf-feat-desc { font-size: 13.5px; color: var(--muted); line-height: 1.65; }

  /* Services */
  .mf-svc-hd { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 48px; gap: 24px; }
  .mf-view-all { display: inline-flex; align-items: center; gap: 6px; color: var(--blue); font-weight: 600; font-size: 13.5px; text-decoration: none; white-space: nowrap; transition: gap 0.2s, color 0.2s; }
  .mf-view-all:hover { gap: 10px; color: var(--accent); }
  .mf-svc-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px; }
  .mf-svc-card { background: var(--white); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; transition: box-shadow 0.25s, transform 0.25s; }
  .mf-svc-card:hover { box-shadow: 0 16px 48px rgba(15,31,61,0.12); transform: translateY(-5px); }
  .mf-svc-img { position: relative; height: 196px; overflow: hidden; }
  .mf-svc-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
  .mf-svc-card:hover .mf-svc-img img { transform: scale(1.07); }
  .mf-svc-tag { position: absolute; top: 11px; left: 11px; background: var(--accent); color: white; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 4px 9px; border-radius: 4px; }
  .mf-svc-body { padding: 22px; }
  .mf-svc-title { font-family: 'Barlow Condensed', sans-serif; font-size: 19px; font-weight: 700; color: var(--navy); text-transform: uppercase; margin-bottom: 7px; letter-spacing: 0.02em; }
  .mf-svc-desc { font-size: 13px; color: var(--muted); line-height: 1.6; margin-bottom: 16px; }
  .mf-svc-link { display: inline-flex; align-items: center; gap: 5px; color: var(--accent); font-size: 13px; font-weight: 600; text-decoration: none; transition: gap 0.2s; }
  .mf-svc-link:hover { gap: 9px; }

  /* CTA */
  .mf-cta { background: var(--navy); position: relative; overflow: hidden; padding: 96px 0; }
  .mf-cta-lines { position: absolute; inset: 0; background-image: repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(255,255,255,0.018) 40px, rgba(255,255,255,0.018) 41px); }
  .mf-cta-glow {
    position: absolute; right: -80px; top: -80px;
    width: 380px; height: 380px; border-radius: 50%;
    background: radial-gradient(circle, rgba(232,93,4,0.15), transparent 70%);
    /* breathing glow */
    animation: mf-glow-breathe 4s ease-in-out infinite;
  }
  @keyframes mf-glow-breathe {
    0%, 100% { transform: scale(1); opacity: 1; }
    50%       { transform: scale(1.18); opacity: 0.7; }
  }
  .mf-cta-inner { position: relative; z-index: 1; max-width: 800px; margin: 0 auto; padding: 0 24px; text-align: center; }
  .mf-cta-title { font-size: clamp(36px, 5vw, 62px); font-weight: 800; color: white; text-transform: uppercase; line-height: 1.05; margin-bottom: 16px; letter-spacing: -0.01em; }
  .mf-cta-sub { color: rgba(255,255,255,0.58); font-size: 15.5px; line-height: 1.65; margin-bottom: 38px; max-width: 540px; margin-left: auto; margin-right: auto; }
  .mf-cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

  .mf-cta-btn1 {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--accent); color: white; padding: 14px 30px; border-radius: 6px;
    font-weight: 600; font-size: 14.5px; text-decoration: none;
    position: relative; overflow: hidden;
    transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
  }
  .mf-cta-btn1::before {
    content: ''; position: absolute; top: 0; left: -75%;
    width: 50%; height: 100%;
    background: linear-gradient(120deg, transparent, rgba(255,255,255,0.28), transparent);
    transform: skewX(-20deg); transition: left 0.5s ease;
  }
  .mf-cta-btn1:hover::before { left: 130%; }
  .mf-cta-btn1:hover { background: var(--accent-light); transform: translateY(-2px); box-shadow: 0 10px 28px rgba(232,93,4,0.45); }
  .mf-cta-btn1:active { transform: translateY(0) scale(0.97); }

  .mf-cta-btn2 {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.2);
    color: white; padding: 14px 30px; border-radius: 6px;
    font-weight: 600; font-size: 14.5px; text-decoration: none;
    transition: background 0.2s, transform 0.2s, border-color 0.2s;
  }
  .mf-cta-btn2:hover { background: rgba(255,255,255,0.14); border-color: rgba(255,255,255,0.4); transform: translateY(-2px); }
  .mf-cta-btn2:active { transform: translateY(0) scale(0.97); }

  /* Trust */
  .mf-trust { padding: 44px 0; background: var(--white); border-top: 1px solid var(--border); }
  .mf-trust-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
  .mf-trust-item {
    display: flex; align-items: center; gap: 10px;
    padding: 16px 18px; border: 1px solid var(--border); border-radius: 8px;
    background: var(--steel); transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
  }
  .mf-trust-item:hover { border-color: var(--accent); transform: translateY(-2px); box-shadow: 0 4px 16px rgba(232,93,4,0.1); }
  .mf-trust-item svg { width: 18px; height: 18px; color: var(--accent); flex-shrink: 0; }
  .mf-trust-item span { font-size: 13px; font-weight: 600; color: var(--navy); letter-spacing: 0.01em; }

  @media (max-width: 1024px) {
    .mf-feat-grid { grid-template-columns: repeat(2, 1fr); }
    .mf-svc-grid { grid-template-columns: repeat(2, 1fr); }
    .mf-trust-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 768px) {
    .mf-hero-stripe { width: 100%; clip-path: none; opacity: 0.3; }
    .mf-hero-dots { display: none; }
    .mf-hero-inner { grid-template-columns: 1fr; gap: 44px; padding: 40px 20px 56px; }
    .mf-img-grid { display: none; }
    .mf-stats-bar { grid-template-columns: repeat(2, 1fr); }
    .mf-stat:nth-child(2) { border-right: none; }
    .mf-stat:nth-child(3) { border-top: 1px solid var(--border); }
    .mf-stat:nth-child(4) { border-top: 1px solid var(--border); border-right: none; }
    .mf-feat-grid { grid-template-columns: 1fr; }
    .mf-svc-grid { grid-template-columns: 1fr; }
    .mf-svc-hd { flex-direction: column; align-items: flex-start; }
    .mf-section { padding: 60px 0; }
  }
  @media (max-width: 480px) {
    .mf-trust-grid { grid-template-columns: 1fr; }
    .mf-hero-title { font-size: 40px; }
    .mf-cta-title { font-size: 34px; }
  }
`;

export default function Home() {
  return (
    <>
      <style>{CSS}</style>
      <div className="mf-root">

        {/* ── HERO ── */}
        <section className="mf-hero">
          <div className="mf-hero-bar" />
          <div className="mf-hero-stripe" />
          <div className="mf-hero-dots" />

          <div className="mf-hero-inner">

            {/* Left — staggered word-by-word on load */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="mf-eyebrow">
                  <span className="mf-eyebrow-dot" />
                  Best Fabrication Services in Gurgaon
                </div>
              </motion.div>

              {/* Title lines slide up one by one */}
              {['Precision', 'Metal Work', '& Welding'].map((line, i) => (
                <div key={i} style={{ overflow: 'hidden' }}>
                  <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.65, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h1 className="mf-hero-title" style={{ marginBottom: i === 2 ? 20 : 0 }}>
                      {i === 0 && 'Precision'}
                      {i === 1 && <><span className="mf-title-solid">Metal</span>{' '}<span className="mf-title-outline">Work</span></>}
                      {i === 2 && '& Welding'}
                    </h1>
                  </motion.div>
                </div>
              ))}

              <motion.p
                className="mf-hero-sub"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                Malik Fabrication — your trusted partner for professional metal fabrication,
                welding, and structural steel work. Quality craftsmanship since 2008.
              </motion.p>

              {/* Buttons pop in staggered */}
              <motion.div
                className="mf-actions"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.85 }}
              >
                <Link to="/contact" className="mf-btn-primary">
                  Get Free Quote <ArrowRight size={16} />
                </Link>
                <Link to="/services" className="mf-btn-secondary">
                  <span>Our Services</span>
                  <ChevronRight size={16} />
                </Link>
                <a href="tel:+917838170214" className="ab-cta-btn2">
                  <Phone size={16} /> +91 78381 70214
                </a>
              </motion.div>

              {/* Stats bar */}
              <motion.div
                className="mf-stats-bar"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                {stats.map((s, i) => (
                  <div className="mf-stat" key={i}>
                    <s.icon />
                    <AnimatedCounter value={s.value} />
                    <div className="mf-stat-lbl">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — image grid slides in from right */}
            <motion.div
              className="mf-img-grid"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mf-img-col">
                <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&h=280&fit=crop" alt="Metal Fabrication" style={{ height: 198 }} />
                <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=220&fit=crop" alt="Welding" style={{ height: 160 }} />
              </div>
              <div className="mf-img-col">
                <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=220&fit=crop" alt="Gates" style={{ height: 160 }} />
                <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=280&fit=crop" alt="Industrial" style={{ height: 198 }} />
              </div>
              <div className="mf-img-badge">Trusted Since 2008</div>
            </motion.div>

          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="mf-section mf-section-steel">
          <div className="mf-section-inner">

            {/* Heading with animated underline draw */}
            <SectionHead
              tag="Why Choose Us"
              center
              title={<>Built on <span className="mf-title-blue">Trust</span> &amp; <span className="mf-title-orange">Precision</span></>}
            />

            {/* Cards stagger up one by one */}
            <div className="mf-feat-grid">
              {features.map((f, i) => (
                <motion.div
                  className="mf-feat-card"
                  key={i}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <div className="mf-feat-ico-wrap"><f.icon /></div>
                  <div className="mf-feat-title">{f.title}</div>
                  <p className="mf-feat-desc">{f.description}</p>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="mf-section">
          <div className="mf-section-inner">

            <div className="mf-svc-hd">
              <SectionHead
                tag="What We Do"
                title={<>Our <span className="mf-title-orange">Services</span></>}
              />
              {/* "View All" fades in from right */}
              <FadeUp delay={0.2}>
                <Link to="/services" className="mf-view-all">
                  View All Services <ArrowRight size={15} />
                </Link>
              </FadeUp>
            </div>

            {/* Service cards — alternating left/right on scroll */}
            <div className="mf-svc-grid">
              {services.map((s, i) => (
                <motion.div
                  className="mf-svc-card"
                  key={i}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, amount: 0.15 }}
                >
                  <div className="mf-svc-img">
                    <img src={s.image} alt={s.title} />
                    <span className="mf-svc-tag">{s.tag}</span>
                  </div>
                  <div className="mf-svc-body">
                    <div className="mf-svc-title">{s.title}</div>
                    <p className="mf-svc-desc">{s.description}</p>
                    <Link to="/services" className="mf-svc-link">
                      Learn More <ArrowRight size={13} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* ── CTA ── */}
        <section className="mf-cta">
          <div className="mf-cta-lines" />
          <div className="mf-cta-glow" />
          <div className="mf-cta-inner">
            {/* Title + subtitle + buttons each animate separately */}
            <motion.h2
              className="mf-cta-title"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              Ready to Start<br />Your Project?
            </motion.h2>

            <motion.p
              className="mf-cta-sub"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Contact us today for a free consultation and quote. Our team is ready
              to bring your vision to life with quality craftsmanship.
            </motion.p>

            <motion.div
              className="mf-cta-btns"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link to="/contact" className="mf-cta-btn1">
                Get Free Quote <ArrowRight size={16} />
              </Link>
              <a href="tel:+917838170214" className="mf-cta-btn2">
                <Phone size={16} /> +91 78381 70214
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── TRUST ── */}
        <section className="mf-trust">
          <div className="mf-section-inner">
            <div className="mf-trust-grid">
              {trustBadges.map((badge, i) => (
                <motion.div
                  className="mf-trust-item"
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                >
                  <CheckCircle />
                  <span>{badge}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
      </div>
    </>
  );
}