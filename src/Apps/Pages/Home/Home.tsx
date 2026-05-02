import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle, Shield, Zap, Award, Clock, Users, Wrench, Phone, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  { icon: Shield, title: 'Quality Assurance', description: 'Every project undergoes rigorous quality checks to ensure precision and long-term durability.' },
  { icon: Zap, title: 'Fast Turnaround', description: 'On-time delivery guaranteed through efficient project management and a skilled workforce.' },
  { icon: Award, title: 'Expert Craftsmanship', description: '15+ years of proven experience in metal fabrication and welding services.' },
  { icon: Clock, title: '24/7 Support', description: 'Round-the-clock assistance for quotes, project updates, and after-service support.' },
];

const services = [
  { title: 'Metal Fabrication', description: 'Custom-built metal structures with precision finishing for industrial and commercial applications.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThmT1eTxZGW9qWsRKSxzXsrEL2gMZ0AF8iJQ&s', tag: 'Industrial' },
  { title: 'Welding Services', description: 'Professional MIG & TIG welding by certified welders with full quality assurance.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReeBWJuXjocoGZGcjT06ZZlcRjchWbjeLbiA&s', tag: 'Certified' },
  { title: 'Industrial Sheds', description: 'Durable steel sheds designed and fabricated to your exact specifications.', image: 'https://internal-assets.jswonemsme.com/Industrialshedssteel3_1736772173760_9ee78666a4/Industrialshedssteel3_1736772173760_9ee78666a4.jpeg', tag: 'Structural' },
  { title: 'Gates & Railings', description: 'Elegant, secure gates, grills, and railings for residential and commercial spaces.', image: 'https://image.made-in-china.com/2f0j00cktoYIVBHebP/Latest-House-Main-Gate-Grill-Designs-Garden-Door-Wrought-Iron-Gate.jpg', tag: 'Custom' },
];

const stats = [
  { value: 15, suffix: '+', label: 'Years Experience', icon: Clock },
  { value: 500, suffix: '+', label: 'Projects Done', icon: Wrench },
  { value: 300, suffix: '+', label: 'Happy Clients', icon: Users },
  { value: 100, suffix: '%', label: 'Quality Guaranteed', icon: Award },
];

const trustBadges = ['ISO 9001 Certified', '15+ Years Experience', '500+ Projects', '100% Satisfaction'];

const blogsPreview = [
  {
    image: 'https://img500.exportersindia.com/product_images/bc-500/2023/10/12642786/ss-balcony-grill-1697288793-7131662.jpeg',
    title: 'Top 5 Modern Balcony Grill Designs',
    desc: 'Explore stylish and secure grill designs for modern homes.',
    date: '12 Feb 2026',
    tag: 'Design'
  },
  {
    image: 'https://d91ztqmtx7u1k.cloudfront.net/ClientContent/Images/Catalogue/20221121072312-af4a8af7-1a31-4ff9-9289-f7c75564420b.jpg',
    title: 'How to Choose the Right Roof Shed',
    desc: 'Complete guide to selecting durable and cost-effective sheds.',
    date: '05 Feb 2026',
    tag: 'Guide'
  },
  {
    image: 'https://i.pinimg.com/236x/46/63/7e/46637e4388d60718a317c6480eca7aef.jpg',
    title: 'Boundary Wall Fabrication Tips',
    desc: 'Key things to consider before building a strong boundary wall.',
    date: '28 Jan 2026',
    tag: 'Tips'
  },
  {
    image: 'https://cdn.thefabricator.com/a/the-talent-behind-a-successful-metal-fabricator-1582738639.jpg',
    title: 'Behind the Scenes: Fabrication Process',
    desc: 'See how professional fabrication actually happens step-by-step.',
    date: '20 Jan 2026',
    tag: 'Process'
  },
];

/* ─── Animated counter hook ─── */
function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

/* ─── Intersection observer hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Single animated stat ─── */
function AnimatedStat({ stat, inView }: { stat: typeof stats[0]; inView: boolean }) {
  const count = useCountUp(stat.value, 1800, inView);
  return (
    <div className="mf-stat">
      <stat.icon />
      <div className="mf-stat-val">{count}{stat.suffix}</div>
      <div className="mf-stat-lbl">{stat.label}</div>
    </div>
  );
}

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

  /* ══════════════════════════════════════════
     KEYFRAMES
  ══════════════════════════════════════════ */

  @keyframes mf-hero-slide-up {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes mf-hero-slide-right {
    from { opacity: 0; transform: translateX(-32px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes mf-img-reveal {
    from { opacity: 0; transform: translateY(28px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes mf-badge-pop {
    0%   { opacity: 0; transform: scale(0.6) translateY(12px); }
    70%  { transform: scale(1.08) translateY(-3px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes mf-bar-grow {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes mf-stripe-in {
    from { clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%); }
    to   { clip-path: polygon(9% 0, 100% 0, 100% 100%, 0% 100%); }
  }
  @keyframes mf-fade-up {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes mf-fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes mf-scale-in {
    from { opacity: 0; transform: scale(0.88); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes mf-slide-left {
    from { opacity: 0; transform: translateX(40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes mf-slide-right-in {
    from { opacity: 0; transform: translateX(-40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes mf-float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-10px); }
  }
  @keyframes mf-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes mf-pulse-ring {
    0%   { transform: scale(1);   opacity: 0.6; }
    100% { transform: scale(1.6); opacity: 0; }
  }
  @keyframes mf-bar-vertical {
    from { transform: scaleY(0); }
    to   { transform: scaleY(1); }
  }
  @keyframes mf-dots-drift {
    0%   { background-position: 0 0; }
    100% { background-position: 26px 26px; }
  }
  @keyframes mf-card-border-sweep {
    from { background-position: 0% 50%; }
    to   { background-position: 100% 50%; }
  }
  @keyframes mf-eyebrow-in {
    from { opacity: 0; transform: translateX(-16px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes mf-stat-bar-flash {
    0%   { box-shadow: inset 0 0 0 0 rgba(232,93,4,0); }
    50%  { box-shadow: inset 0 0 0 2px rgba(232,93,4,0.18); }
    100% { box-shadow: inset 0 0 0 0 rgba(232,93,4,0); }
  }
  @keyframes mf-trust-slide {
    from { opacity: 0; transform: translateX(-24px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes mf-cta-text-in {
    from { opacity: 0; transform: translateY(24px) skewY(1.5deg); }
    to   { opacity: 1; transform: translateY(0) skewY(0deg); }
  }
  @keyframes mf-glow-drift {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%       { transform: translate(-30px, 20px) scale(1.1); }
    66%       { transform: translate(20px, -15px) scale(0.95); }
  }

  /* ══════════════════════════════════════════
     HERO
  ══════════════════════════════════════════ */

  .mf-hero {
    position: relative; min-height: 100vh; background: var(--white);
    display: flex; align-items: center; overflow: hidden; padding-top: 80px;
  }

  .mf-hero-stripe {
    position: absolute; top: 0; right: 0; width: 52%; height: 100%;
    background: var(--steel);
    clip-path: polygon(9% 0, 100% 0, 100% 100%, 0% 100%);
    animation: mf-stripe-in 0.9s cubic-bezier(0.77,0,0.175,1) 0.1s both;
  }
  .mf-hero-dots {
    position: absolute; top: 0; right: 0; width: 52%; height: 100%;
    background-image: radial-gradient(circle, #c0cde8 1px, transparent 1px);
    background-size: 26px 26px; opacity: 0.45;
    clip-path: polygon(9% 0, 100% 0, 100% 100%, 0% 100%);
    animation: mf-dots-drift 8s linear infinite;
  }
  .mf-hero-bar {
    position: absolute; left: 0; top: 0; width: 5px; height: 100%;
    background: linear-gradient(to bottom, var(--accent), var(--blue));
    transform-origin: top;
    animation: mf-bar-vertical 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s both;
  }

  .mf-hero-inner {
    position: relative; z-index: 1; max-width: 1200px; margin: 0 auto;
    padding: 60px 24px; display: grid; grid-template-columns: 1fr 1fr;
    gap: 60px; align-items: center; width: 100%;
  }

  /* Hero left text — staggered entrance */
  .mf-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    background: #fff8f4; border: 1px solid #fdd0b0;
    color: var(--accent); font-size: 11px; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase;
    padding: 6px 14px; border-radius: 4px; margin-bottom: 22px;
    opacity: 0; animation: mf-eyebrow-in 0.55s ease 0.35s forwards;
  }
  .mf-eyebrow-dot {
    width: 6px; height: 6px; background: var(--accent); border-radius: 50%;
    animation: mf-pulse-ring 1.4s ease-out 1.2s infinite;
    position: relative;
  }
  .mf-eyebrow-dot::after {
    content: ''; position: absolute; inset: -4px; border-radius: 50%;
    border: 2px solid var(--accent); opacity: 0;
    animation: mf-pulse-ring 1.4s ease-out 1.2s infinite;
  }

  .mf-hero-title {
    font-size: clamp(48px, 5.5vw, 78px); font-weight: 800; line-height: 1.0;
    color: var(--navy); letter-spacing: -0.01em; text-transform: uppercase;
    opacity: 0;
  }
  .mf-hero-title:nth-of-type(1) { animation: mf-hero-slide-up 0.65s cubic-bezier(0.22,1,0.36,1) 0.5s forwards; margin-bottom: 0; }
  .mf-hero-title:nth-of-type(2) { animation: mf-hero-slide-up 0.65s cubic-bezier(0.22,1,0.36,1) 0.62s forwards; margin-bottom: 0; }
  .mf-hero-title:nth-of-type(3) { animation: mf-hero-slide-up 0.65s cubic-bezier(0.22,1,0.36,1) 0.74s forwards; margin-bottom: 20px; }

  .mf-title-solid { color: var(--blue); }
  .mf-title-outline { color: transparent; -webkit-text-stroke: 2.5px var(--navy); }

  /* Shimmer text effect on outline word */
  .mf-title-outline {
    background: linear-gradient(90deg, transparent 0%, rgba(232,93,4,0.18) 50%, transparent 100%);
    background-size: 200% auto; -webkit-background-clip: text;
    animation: mf-shimmer 3.5s linear 1.5s infinite;
  }

  .mf-hero-sub {
    font-size: 15.5px; color: var(--muted); line-height: 1.7; max-width: 460px; margin-bottom: 34px;
    opacity: 0; animation: mf-fade-up 0.6s ease 0.88s forwards;
  }
  .mf-actions {
    display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 46px;
    opacity: 0; animation: mf-fade-up 0.6s ease 1s forwards;
  }

  /* ── Buttons ── */
  .mf-btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--accent); color: #fff;
    padding: 13px 26px; border-radius: 6px;
    font-weight: 600; font-size: 14.5px; text-decoration: none;
    transition: background 0.22s, transform 0.22s, box-shadow 0.22s;
    position: relative; overflow: hidden;
  }
  .mf-btn-primary::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%);
    transform: translateX(-100%); transition: transform 0.5s ease;
  }
  .mf-btn-primary:hover::after { transform: translateX(100%); }
  .mf-btn-primary:hover { background: var(--accent-light); transform: translateY(-3px); box-shadow: 0 10px 28px rgba(232,93,4,0.35); }
  .mf-btn-primary:active { transform: translateY(-1px); }

  .mf-btn-secondary {
    display: inline-flex; align-items: center; gap: 8px;
    border: 2px solid var(--navy); color: var(--navy);
    padding: 13px 26px; border-radius: 6px;
    font-weight: 600; font-size: 14.5px; text-decoration: none;
    background: transparent; transition: background 0.22s, color 0.22s, transform 0.22s;
  }
  .mf-btn-secondary:hover { background: var(--navy); color: #fff; transform: translateY(-3px); }

  .ab-cta-btn2 {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(0,0,0,0.04); border: 1px solid rgba(0,0,0,0.12);
    color: #111; padding: 13px 26px; border-radius: 6px;
    font-family: 'DM Sans', sans-serif; font-size: 14.5px; font-weight: 600;
    text-decoration: none; transition: background 0.22s, transform 0.22s;
  }
  .ab-cta-btn2:hover { background: rgba(0,0,0,0.08); transform: translateY(-3px); }

  /* ── Stats bar ── */
  .mf-stats-bar {
    display: grid; grid-template-columns: repeat(4, 1fr);
    border: 1px solid var(--border); border-radius: 10px; overflow: hidden;
    background: var(--white); box-shadow: 0 2px 16px rgba(15,31,61,0.07);
    opacity: 0; animation: mf-fade-up 0.6s ease 1.12s forwards;
  }
  .mf-stat {
    padding: 18px 14px; text-align: center; border-right: 1px solid var(--border);
    transition: background 0.25s, transform 0.25s; cursor: default;
  }
  .mf-stat:last-child { border-right: none; }
  .mf-stat:hover { background: #fff8f4; transform: translateY(-2px); animation: mf-stat-bar-flash 0.6s ease; }
  .mf-stat svg { width: 24px; height: 24px; color: var(--accent); margin: 0 auto 6px; display: block; transition: transform 0.3s; }
  .mf-stat:hover svg { transform: scale(1.25) rotate(-5deg); }
  .mf-stat-val { font-family: 'Barlow Condensed', sans-serif; font-size: 28px; font-weight: 800; color: var(--navy); line-height: 1; }
  .mf-stat-lbl { font-size: 10px; color: var(--muted); margin-top: 3px; font-weight: 500; letter-spacing: 0.04em; text-transform: uppercase; }

  /* ── Image grid ── */
  .mf-img-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; position: relative; }
  .mf-img-col { display: flex; flex-direction: column; gap: 14px; }
  .mf-img-col:nth-child(2) { margin-top: 36px; }
  .mf-img-grid img {
    width: 100%; border-radius: 10px; object-fit: cover; display: block;
    box-shadow: 0 8px 32px rgba(15,31,61,0.12);
    transition: transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s;
    opacity: 0;
  }
  .mf-img-grid img.img-visible { opacity: 1; }
  .mf-img-col:nth-child(1) img:nth-child(1) { animation: mf-img-reveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.55s forwards; }
  .mf-img-col:nth-child(1) img:nth-child(2) { animation: mf-img-reveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.75s forwards; }
  .mf-img-col:nth-child(2) img:nth-child(1) { animation: mf-img-reveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.65s forwards; }
  .mf-img-col:nth-child(2) img:nth-child(2) { animation: mf-img-reveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.85s forwards; }
  .mf-img-grid img:hover { transform: scale(1.05) translateY(-4px); box-shadow: 0 20px 48px rgba(15,31,61,0.2); }

  .mf-img-badge {
    position: absolute; bottom: 16px; left: -16px;
    background: var(--accent); color: white; padding: 11px 16px; border-radius: 7px;
    font-family: 'Barlow Condensed', sans-serif; font-size: 14px; font-weight: 700;
    letter-spacing: 0.04em; box-shadow: 0 8px 24px rgba(232,93,4,0.3); z-index: 2;
    animation: mf-badge-pop 0.6s cubic-bezier(0.34,1.56,0.64,1) 1.1s both;
  }

  /* ══════════════════════════════════════════
     SCROLL-REVEAL SYSTEM
  ══════════════════════════════════════════ */

  .reveal { opacity: 0; transition: none; }
  .reveal.is-visible { animation-fill-mode: both; }

  .reveal-up        { opacity: 0; }
  .reveal-up.is-visible   { animation: mf-fade-up 0.65s cubic-bezier(0.22,1,0.36,1) both; }

  .reveal-left      { opacity: 0; }
  .reveal-left.is-visible { animation: mf-slide-right-in 0.65s cubic-bezier(0.22,1,0.36,1) both; }

  .reveal-right     { opacity: 0; }
  .reveal-right.is-visible { animation: mf-slide-left 0.65s cubic-bezier(0.22,1,0.36,1) both; }

  .reveal-scale     { opacity: 0; }
  .reveal-scale.is-visible { animation: mf-scale-in 0.6s cubic-bezier(0.22,1,0.36,1) both; }

  /* Stagger delays */
  .d-0  { animation-delay: 0ms !important; }
  .d-1  { animation-delay: 80ms !important; }
  .d-2  { animation-delay: 160ms !important; }
  .d-3  { animation-delay: 240ms !important; }
  .d-4  { animation-delay: 320ms !important; }

  /* ══════════════════════════════════════════
     SECTIONS
  ══════════════════════════════════════════ */

  .mf-section { padding: 92px 0; }
  .mf-section-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
  .mf-section-steel { background: var(--steel); }
  .mf-tag { display: inline-block; font-size: 10.5px; font-weight: 700; letter-spacing: 0.13em; text-transform: uppercase; color: var(--accent); margin-bottom: 12px; }
  .mf-section-title { font-size: clamp(30px, 3.8vw, 50px); font-weight: 800; color: var(--navy); text-transform: uppercase; line-height: 1.05; letter-spacing: -0.01em; }
  .mf-title-blue { color: var(--blue); }
  .mf-title-orange { color: var(--accent); }
  .mf-divider { width: 44px; height: 4px; background: var(--accent); border-radius: 2px; margin-top: 14px; transform-origin: left; }
  .mf-divider-center { margin-left: auto; margin-right: auto; transform-origin: center; }
  .mf-divider.animated { animation: mf-bar-grow 0.6s cubic-bezier(0.22,1,0.36,1) 0.3s both; }

  .mf-sh { margin-bottom: 0; }
  .mf-sh-center { display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 56px; }

  /* ── Feature cards ── */
  .mf-feat-hd { display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 56px; }
  .mf-feat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px; }
  .mf-feat-card {
    background: var(--white); border: 1px solid var(--border);
    border-radius: 12px; padding: 34px 26px;
    transition: box-shadow 0.3s, transform 0.3s, border-color 0.3s;
    position: relative; overflow: hidden; cursor: default;
  }
  .mf-feat-card::before {
    content: ''; position: absolute; top: 0; left: 0;
    width: 4px; height: 100%; background: var(--accent);
    transform: scaleY(0); transform-origin: top; transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
  }
  /* Glossy overlay */
  .mf-feat-card::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%);
    opacity: 0; transition: opacity 0.3s;
  }
  .mf-feat-card:hover { box-shadow: 0 20px 48px rgba(15,31,61,0.12); transform: translateY(-6px); border-color: transparent; }
  .mf-feat-card:hover::before { transform: scaleY(1); }
  .mf-feat-card:hover::after { opacity: 1; }

  .mf-feat-ico-wrap {
    width: 52px; height: 52px; background: #e8eef9; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 18px; transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
  }
  .mf-feat-card:hover .mf-feat-ico-wrap {
    background: var(--accent); transform: scale(1.12) rotate(-4deg);
    box-shadow: 0 8px 20px rgba(232,93,4,0.3);
  }
  .mf-feat-ico-wrap svg { width: 22px; height: 22px; color: var(--blue); transition: color 0.3s, transform 0.3s; }
  .mf-feat-card:hover .mf-feat-ico-wrap svg { color: white; transform: scale(1.1); }
  .mf-feat-title { font-family: 'Barlow Condensed', sans-serif; font-size: 19px; font-weight: 700; color: var(--navy); text-transform: uppercase; letter-spacing: 0.02em; margin-bottom: 9px; }
  .mf-feat-desc { font-size: 13.5px; color: var(--muted); line-height: 1.65; }

  /* ── Service / Blog cards ── */
  .mf-svc-hd { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 48px; gap: 24px; }
  .mf-view-all { display: inline-flex; align-items: center; gap: 6px; color: var(--blue); font-weight: 600; font-size: 13.5px; text-decoration: none; white-space: nowrap; transition: gap 0.2s, color 0.2s; }
  .mf-view-all:hover { gap: 10px; color: var(--accent); }
  .mf-svc-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px; }
  .mf-svc-card {
    background: var(--white); border: 1px solid var(--border); border-radius: 12px;
    overflow: hidden; transition: box-shadow 0.35s, transform 0.35s, border-color 0.3s;
    text-decoration: none; display: block;
  }
  .mf-svc-card:hover { box-shadow: 0 20px 56px rgba(15,31,61,0.14); transform: translateY(-7px); border-color: transparent; }
  .mf-svc-img { position: relative; height: 196px; overflow: hidden; }
  .mf-svc-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s cubic-bezier(0.22,1,0.36,1); }
  .mf-svc-card:hover .mf-svc-img img { transform: scale(1.09); }

  /* Progress bar on image bottom */
  .mf-svc-img::after {
    content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 3px;
    background: var(--accent); transition: width 0.4s ease;
  }
  .mf-svc-card:hover .mf-svc-img::after { width: 100%; }

  .mf-svc-tag { position: absolute; top: 11px; left: 11px; background: var(--accent); color: white; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 4px 9px; border-radius: 4px; }
  .mf-svc-body { padding: 22px; }
  .mf-svc-title { font-family: 'Barlow Condensed', sans-serif; font-size: 19px; font-weight: 700; color: var(--navy); text-transform: uppercase; margin-bottom: 7px; letter-spacing: 0.02em; }
  .mf-svc-desc { font-size: 13px; color: var(--muted); line-height: 1.6; margin-bottom: 16px; }
  .mf-svc-link { display: inline-flex; align-items: center; gap: 5px; color: var(--accent); font-size: 13px; font-weight: 600; text-decoration: none; transition: gap 0.25s, transform 0.25s; }
  .mf-svc-link:hover { gap: 9px; transform: translateX(2px); }

  /* ── CTA Section ── */
  .mf-cta { background: var(--navy); position: relative; overflow: hidden; padding: 96px 0; }
  .mf-cta-lines { position: absolute; inset: 0; background-image: repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(255,255,255,0.018) 40px, rgba(255,255,255,0.018) 41px); }
  .mf-cta-glow {
    position: absolute; right: -80px; top: -80px;
    width: 380px; height: 380px; border-radius: 50%;
    background: radial-gradient(circle, rgba(232,93,4,0.18), transparent 70%);
    animation: mf-glow-drift 8s ease-in-out infinite;
  }
  .mf-cta-glow2 {
    position: absolute; left: -60px; bottom: -60px;
    width: 280px; height: 280px; border-radius: 50%;
    background: radial-gradient(circle, rgba(26,58,107,0.4), transparent 70%);
    animation: mf-glow-drift 10s ease-in-out 2s infinite reverse;
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
    transition: background 0.22s, transform 0.22s, box-shadow 0.22s;
  }
  .mf-cta-btn1::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%);
    transform: translateX(-100%); transition: transform 0.5s ease;
  }
  .mf-cta-btn1:hover::after { transform: translateX(100%); }
  .mf-cta-btn1:hover { background: var(--accent-light); transform: translateY(-3px); box-shadow: 0 10px 28px rgba(232,93,4,0.38); }

  .mf-cta-btn2 {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.2);
    color: white; padding: 14px 30px; border-radius: 6px;
    font-weight: 600; font-size: 14.5px; text-decoration: none;
    transition: background 0.22s, transform 0.22s;
  }
  .mf-cta-btn2:hover { background: rgba(255,255,255,0.14); transform: translateY(-3px); }

  /* ── Trust badges ── */
  .mf-trust { padding: 44px 0; background: var(--white); border-top: 1px solid var(--border); }
  .mf-trust-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
  .mf-trust-item {
    display: flex; align-items: center; gap: 10px;
    padding: 16px 18px; border: 1px solid var(--border); border-radius: 8px;
    background: var(--steel); transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s, background 0.25s;
    cursor: default;
  }
  .mf-trust-item:hover {
    border-color: var(--accent); transform: translateY(-3px) scale(1.02);
    box-shadow: 0 8px 24px rgba(232,93,4,0.12); background: #fff8f4;
  }
  .mf-trust-item svg { width: 18px; height: 18px; color: var(--accent); flex-shrink: 0; transition: transform 0.3s; }
  .mf-trust-item:hover svg { transform: scale(1.25) rotate(10deg); }
  .mf-trust-item span { font-size: 13px; font-weight: 600; color: var(--navy); letter-spacing: 0.01em; }

  /* ══════════════════════════════════════════
     RESPONSIVE
  ══════════════════════════════════════════ */

  @media (max-width: 1024px) {
    .mf-feat-grid { grid-template-columns: repeat(2, 1fr); }
    .mf-svc-grid { grid-template-columns: repeat(2, 1fr); }
    .mf-trust-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 768px) {
    .mf-hero-stripe { width: 100%; clip-path: none; opacity: 0.3; animation: none; }
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

/* ─── Scroll reveal wrapper ─── */
function Reveal({ children, className = '', direction = 'up', delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'scale';
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`reveal reveal-${direction} ${visible ? 'is-visible' : ''} ${className}`}
      style={{ animationDelay: visible ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  );
}

/* ─── Section heading ─── */
function SectionHead({ tag, title, center = false }: { tag: string; title: React.ReactNode; center?: boolean }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={center ? 'mf-sh-center' : 'mf-sh'}>
      <span className="mf-tag">{tag}</span>
      <h2 className="mf-section-title">{title}</h2>
      <div className={`mf-divider${center ? ' mf-divider-center' : ''}${inView ? ' animated' : ''}`} />
    </div>
  );
}

/* ─── Stats bar (with counter) ─── */
function StatsBar() {
  const { ref, inView } = useInView(0.3);
  return (
    <div ref={ref} className="mf-stats-bar">
      {stats.map((s, i) => <AnimatedStat key={i} stat={s} inView={inView} />)}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <style>{CSS}</style>
      <div className="mf-root">

        {/* ══ HERO ══ */}
        <section className="mf-hero">
          <div className="mf-hero-bar" />
          <div className="mf-hero-stripe" />
          <div className="mf-hero-dots" />

          <div className="mf-hero-inner">
            {/* Left */}
            <div>
              <div className="mf-eyebrow">
                <span className="mf-eyebrow-dot" />
                Best Fabrication Services in Gurgaon
              </div>

              <h1 className="mf-hero-title">Precision</h1>
              <h1 className="mf-hero-title">
                <span className="mf-title-solid">Metal</span>{' '}
                <span className="mf-title-outline">Work</span>
              </h1>
              <h1 className="mf-hero-title">&amp; Welding</h1>

              <p className="mf-hero-sub">
                Malik Fabrication — your trusted partner for professional metal fabrication,
                welding, and structural steel work. Quality craftsmanship since 2008.
              </p>

              <div className="mf-actions">
                <Link to="/contact" className="mf-btn-primary">
                  Get Free Quote <ArrowRight size={16} />
                </Link>
                <Link to="/services" className="mf-btn-secondary">
                  Our Services <ChevronRight size={16} />
                </Link>
                <a href="tel:+917838170214" className="ab-cta-btn2">
                  <Phone size={16} /> +91 78381 70214
                </a>
              </div>

              <StatsBar />
            </div>

            {/* Right — image grid */}
            <div className="mf-img-grid">
              <div className="mf-img-col">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGO198vroOjje1iwMuTj38hiCWA_qcRaQ1-Q&s" alt="Metal Fabrication" style={{ height: 198 }} />
                <img src="https://5.imimg.com/data5/SELLER/Default/2025/10/555289903/GW/NK/EB/105348235/truck-body-repairing-fabrication-500x500.png" alt="Welding" style={{ height: 160 }} />
              </div>
              <div className="mf-img-col">
                <img src="https://5.imimg.com/data5/SELLER/Default/2025/8/536038938/LB/MR/XE/18772814/mild-steel-industrial-fabrication.jpg" alt="Gates" style={{ height: 160 }} />
                <img src="https://s.alicdn.com/@sc04/kf/H9504c585d9f545678b83bb9a227fc7acL/Sunnysky-Modern-Steel-Gate-Grill-Design-House-Latest-Main-Swing-Simple-Driveway-Wrought-Iron-Gate-Designs-Simple.jpg" alt="Industrial" style={{ height: 198 }} />
              </div>
              <div className="mf-img-badge">Trusted Since 2008</div>
            </div>
          </div>
        </section>

        {/* ══ FEATURES ══ */}
        <section className="mf-section mf-section-steel">
          <div className="mf-section-inner">
            <Reveal direction="up">
              <SectionHead
                tag="Why Choose Us"
                center
                title={<>Built on <span className="mf-title-blue">Trust</span> &amp; <span className="mf-title-orange">Precision</span></>}
              />
            </Reveal>
            <div className="mf-feat-grid">
              {features.map((f, i) => (
                <Reveal key={i} direction="up" delay={i * 80}>
                  <div className="mf-feat-card">
                    <div className="mf-feat-ico-wrap"><f.icon /></div>
                    <div className="mf-feat-title">{f.title}</div>
                    <p className="mf-feat-desc">{f.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ SERVICES ══ */}
        <section className="mf-section">
          <div className="mf-section-inner">
            <div className="mf-svc-hd">
              <Reveal direction="left">
                <SectionHead tag="What We Do" title={<>Our <span className="mf-title-orange">Services</span></>} />
              </Reveal>
              <Reveal direction="right">
                <Link to="/services" className="mf-view-all">View All Services <ArrowRight size={15} /></Link>
              </Reveal>
            </div>
            <div className="mf-svc-grid">
              {services.map((s, i) => (
                <Reveal key={i} direction="up" delay={i * 90}>
                  <div className="mf-svc-card">
                    <div className="mf-svc-img">
                      <img src={s.image} alt={s.title} />
                      <span className="mf-svc-tag">{s.tag}</span>
                    </div>
                    <div className="mf-svc-body">
                      <div className="mf-svc-title">{s.title}</div>
                      <p className="mf-svc-desc">{s.description}</p>
                      <Link to="/services" className="mf-svc-link">Learn More <ArrowRight size={13} /></Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ BLOGS ══ */}
        <section className="mf-section" style={{ background: 'var(--steel)' }}>
          <div className="mf-section-inner">
            <div className="mf-svc-hd">
              <Reveal direction="left">
                <SectionHead tag="Insights" title={<>Fabrication <span className="mf-title-orange">Blogs</span></>} />
              </Reveal>
              <Reveal direction="right">
                <Link to="/blogs" className="mf-view-all">View All Blogs <ArrowRight size={15} /></Link>
              </Reveal>
            </div>
            <div className="mf-svc-grid">
              {blogsPreview.map((b, i) => (
                <Reveal key={i} direction="scale" delay={i * 80}>
                  <Link to={`/blogs/${i}`} className="mf-svc-card">
                    <div className="mf-svc-img" style={{ height: '220px' }}>
                      <img src={b.image} alt={b.title} />
                      <span className="mf-svc-tag">{b.tag}</span>
                    </div>
                    <div className="mf-svc-body">
                      <div className="mf-svc-title" style={{ fontSize: '17px' }}>{b.title}</div>
                      <p className="mf-svc-desc" style={{ fontSize: '12.5px' }}>{b.desc}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{b.date}</span>
                        <span className="mf-svc-link">Read More <ArrowRight size={12} /></span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section className="mf-cta">
          <div className="mf-cta-lines" />
          <div className="mf-cta-glow" />
          <div className="mf-cta-glow2" />
          <div className="mf-cta-inner">
            <Reveal direction="up">
              <h2 className="mf-cta-title">Ready to Start<br />Your Project?</h2>
            </Reveal>
            <Reveal direction="up" delay={120}>
              <p className="mf-cta-sub">
                Contact us today for a free consultation and quote. Our team is ready
                to bring your vision to life with quality craftsmanship.
              </p>
            </Reveal>
            <Reveal direction="up" delay={220}>
              <div className="mf-cta-btns">
                <Link to="/contact" className="mf-cta-btn1">Get Free Quote <ArrowRight size={16} /></Link>
                <a href="tel:+917838170214" className="mf-cta-btn2"><Phone size={16} /> +91 78381 70214</a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ TRUST ══ */}
        <section className="mf-trust">
          <div className="mf-section-inner">
            <div className="mf-trust-grid">
              {trustBadges.map((badge, i) => (
                <Reveal key={i} direction="left" delay={i * 70}>
                  <div className="mf-trust-item">
                    <CheckCircle />
                    <span>{badge}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}