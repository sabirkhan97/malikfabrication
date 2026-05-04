import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle, Shield, Zap, Award, Clock, Users, Wrench, Phone, MessageCircle, Star, MapPin, XCircle, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ─── DATA ─── */
const features = [
  { icon: Shield, title: 'Quality Assurance', description: 'Every project undergoes rigorous quality checks to ensure precision and long-term durability.' },
  { icon: Zap, title: 'Fast Turnaround', description: 'On-time delivery guaranteed through efficient project management and skilled workforce.' },
  { icon: Award, title: 'Expert Craftsmanship', description: '15+ years of proven experience in metal fabrication and welding services.' },
  { icon: Clock, title: '24/7 Support', description: 'Round-the-clock assistance for quotes, project updates, and after-service support.' },
];

const services = [
  {
    title: 'Metal Fabrication',
    description: 'Custom-built metal structures with precision finishing for industrial and commercial applications.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThmT1eTxZGW9qWsRKSxzXsrEL2gMZ0AF8iJQ&s',
    tag: 'Industrial',
    price: '₹180–₹400/sq ft',
  },
  {
    title: 'Welding Services',
    description: 'Professional MIG & TIG welding by certified welders with full quality assurance.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReeBWJuXjocoGZGcjT06ZZlcRjchWbjeLbiA&s',
    tag: 'Certified',
    price: 'Custom quote',
  },
  {
    title: 'Industrial Sheds',
    description: 'Durable steel sheds designed and fabricated to your exact specifications.',
    image: 'https://internal-assets.jswonemsme.com/Industrialshedssteel3_1736772173760_9ee78666a4/Industrialshedssteel3_1736772173760_9ee78666a4.jpeg',
    tag: 'Structural',
    price: '₹180–₹400/sq ft',
  },
  {
    title: 'Gates & Railings',
    description: 'Elegant, secure gates, grills, and railings for residential and commercial spaces.',
    image: 'https://image.made-in-china.com/2f0j00cktoYIVBHebP/Latest-House-Main-Gate-Grill-Designs-Garden-Door-Wrought-Iron-Gate.jpg',
    tag: 'Custom',
    price: '₹250–₹800/sq ft',
  },
];

const stats = [
  { value: 15, suffix: '+', label: 'Years Exp', icon: Clock },
  { value: 500, suffix: '+', label: 'Projects', icon: Wrench },
  { value: 300, suffix: '+', label: 'Clients', icon: Users },
  { value: 100, suffix: '%', label: 'Quality', icon: Award },
];

const testimonials = [
  { name: 'Rajesh Sharma', role: 'Factory Owner, Manesar', text: 'Exceptional quality shed fabrication. Delivered 3 days early and the welding finish is top-notch.', stars: 5 },
  { name: 'Priya Mehta', role: 'Architect, Gurgaon', text: 'We source all our custom railing and gate work from Malik. Consistent quality every single time.', stars: 5 },
  { name: 'Sunil Kumar', role: 'Builder, DLF Phase 2', text: 'Best price in Gurgaon without compromising quality. Highly recommend for bulk orders.', stars: 5 },
];

const serviceAreas = ['Delhi', 'Najafgarh', 'Dwarka', 'Gurgaon', 'Noida'];

const trustBadges = [
  { icon: CheckCircle, label: 'ISO 9001 Certified' },
  { icon: Award, label: '15+ Years Experience' },
  { icon: Wrench, label: '500+ Projects Done' },
  { icon: Users, label: '100% Satisfaction' },
];

const blogsPreview = [
  { image: 'https://img500.exportersindia.com/product_images/bc-500/2023/10/12642786/ss-balcony-grill-1697288793-7131662.jpeg', title: 'Top 5 Modern Balcony Grill Designs', desc: 'Stylish and secure grill designs for modern homes.', date: '12 Feb 2026', tag: 'Design' },
  { image: 'https://d91ztqmtx7u1k.cloudfront.net/ClientContent/Images/Catalogue/20221121072312-af4a8af7-1a31-4ff9-9289-f7c75564420b.jpg', title: 'How to Choose the Right Roof Shed', desc: 'Guide to selecting durable and cost-effective sheds.', date: '05 Feb 2026', tag: 'Guide' },
  { image: 'https://i.pinimg.com/236x/46/63/7e/46637e4388d60718a317c6480eca7aef.jpg', title: 'Boundary Wall Fabrication Tips', desc: 'Key things to consider before building a boundary wall.', date: '28 Jan 2026', tag: 'Tips' },
  { image: 'https://cdn.thefabricator.com/a/the-talent-behind-a-successful-metal-fabricator-1582738639.jpg', title: 'Behind the Scenes: Our Process', desc: 'See how professional fabrication actually happens.', date: '20 Jan 2026', tag: 'Process' },
];

/* ─── HOOKS ─── */
function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

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

/* ─── COMPONENTS ─── */
function Reveal({ children, className = '', direction = 'up', delay = 0 }: {
  children: React.ReactNode; className?: string; direction?: string; delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const animMap: Record<string, string> = {
    up: 'mf-anim-up', left: 'mf-anim-left', right: 'mf-anim-right', scale: 'mf-anim-scale',
  };
  return (
    <div
      ref={ref}
      className={`mf-reveal ${visible ? animMap[direction] : ''} ${className}`}
      style={visible ? { animationDelay: `${delay}ms` } : {}}
    >
      {children}
    </div>
  );
}

function AnimatedStat({ stat, inView }: { stat: typeof stats[0]; inView: boolean }) {
  const count = useCountUp(stat.value, 1800, inView);
  return (
    <div className="mf-stat-item">
      <div className="mf-stat-icon-wrap"><stat.icon size={18} /></div>
      <div className="mf-stat-num">{count}{stat.suffix}</div>
      <div className="mf-stat-label">{stat.label}</div>
    </div>
  );
}

function StatsBar() {
  const { ref, inView } = useInView(0.3);
  return (
    <div ref={ref} className="mf-stats-bar">
      {stats.map((s, i) => <AnimatedStat key={i} stat={s} inView={inView} />)}
    </div>
  );
}

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: 2, marginBottom: 10 }}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} style={{ fill: '#e85d04', color: '#e85d04' }} />
      ))}
    </div>
  );
}

/* ─── STYLES ─── */
const CSS = `

:root {
  --navy: #0b1829;
  --blue: #132d52;
  --accent: #e85d04;
  --accent-2: #ff7b2c;
  --steel: #f2f5fa;
  --border: #e0e7f0;
  --text: #1a2236;
  --muted: #64748b;
  --white: #ffffff;
}

.mf-root *, .mf-root *::before, .mf-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
.mf-root {
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: var(--text);
  background: var(--white);
  overflow-x: hidden;
  -webkit-tap-highlight-color: transparent;
}
.mf-root h1, .mf-root h2, .mf-root h3, .mf-root h4 { font-family: 'Syne', sans-serif; }
img { max-width: 100%; height: auto; display: block; }
.mf-root button, .mf-root a, .mf-root [role="button"] { touch-action: manipulation; }

/* ── Scroll reveal ── */
.mf-reveal { opacity: 0; }
@keyframes mfUp    { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:none } }
@keyframes mfLeft  { from { opacity:0; transform:translateX(-28px) } to { opacity:1; transform:none } }
@keyframes mfRight { from { opacity:0; transform:translateX(28px) } to { opacity:1; transform:none } }
@keyframes mfScale { from { opacity:0; transform:scale(0.9) } to { opacity:1; transform:none } }
.mf-anim-up    { animation: mfUp    0.55s cubic-bezier(0.22,1,0.36,1) both }
.mf-anim-left  { animation: mfLeft  0.55s cubic-bezier(0.22,1,0.36,1) both }
.mf-anim-right { animation: mfRight 0.55s cubic-bezier(0.22,1,0.36,1) both }
.mf-anim-scale { animation: mfScale 0.5s cubic-bezier(0.22,1,0.36,1) both }

/* ── Floating WhatsApp ── */
@keyframes mfPulse { 0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,0.5)} 50%{box-shadow:0 0 0 12px rgba(37,211,102,0)} }
.mf-wa-float {
  position: fixed; bottom: 20px; right: 20px; z-index: 9999;
  width: 56px; height: 56px; border-radius: 50%;
  background: #25d366; display: flex; align-items: center; justify-content: center;
  text-decoration: none; animation: mfPulse 2.5s ease-in-out infinite;
  box-shadow: 0 4px 16px rgba(37,211,102,0.4);
}
.mf-wa-float:active { transform: scale(0.92); }

/* ── Layout ── */
.mf-inner { max-width: 1200px; margin: 0 auto; padding: 0 16px; }
@media (min-width: 640px) { .mf-inner { padding: 0 24px; } }
.mf-section { padding: 56px 0; }
.mf-section-alt { padding: 56px 0; background: var(--steel); }

/* ── Section heading ── */
.mf-eyebrow {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--accent); margin-bottom: 10px;
}
.mf-eyebrow-dot { width: 5px; height: 5px; background: var(--accent); border-radius: 50%; flex-shrink: 0; }
.mf-section-heading { font-size: clamp(24px, 6vw, 44px); font-weight: 800; color: var(--navy); line-height: 1.15; letter-spacing: -0.02em; }
.mf-accent-word { color: var(--accent); }
.mf-divider-line { width: 40px; height: 3px; background: var(--accent); border-radius: 2px; margin-top: 12px; }

/* ══════════════════════════════════
   HERO — mobile-first complete rewrite
══════════════════════════════════ */
@keyframes mfHeroTitle { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:none} }
@keyframes mfHeroSub   { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
@keyframes mfBarGrow   { from{transform:scaleY(0)} to{transform:scaleY(1)} }
@keyframes mfDotDrift  { 0%{background-position:0 0} 100%{background-position:28px 28px} }

.mf-hero {
  position: relative;
  min-height: 100svh;
  background: var(--white);
  display: flex; align-items: center; overflow: hidden;
}
.mf-hero-stripe {
  position: absolute; top: 0; right: 0; width: 55%; height: 100%;
  background: #eef2fa;
  clip-path: polygon(12% 0, 100% 0, 100% 100%, 0 100%);
}
@media (max-width: 767px) {
  .mf-hero-stripe { width: 100%; clip-path: polygon(0 55%, 100% 35%, 100% 100%, 0 100%); opacity: 0.5; }
}
.mf-hero-dots {
  position: absolute; top: 0; right: 0; width: 55%; height: 100%;
  background-image: radial-gradient(circle, #b8c8e8 1px, transparent 1px);
  background-size: 22px 22px; opacity: 0.45;
  animation: mfDotDrift 14s linear infinite;
  pointer-events: none;
  clip-path: polygon(12% 0, 100% 0, 100% 100%, 0 100%);
}
@media (max-width: 767px) { .mf-hero-dots { display: none; } }

.mf-hero-bar {
  position: absolute; left: 0; top: 0; width: 4px; height: 100%;
  background: linear-gradient(to bottom, var(--accent), #132d52);
  transform-origin: top; animation: mfBarGrow 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s both;
}

.mf-hero-inner {
  position: relative; z-index: 1;
  width: 100%; max-width: 1200px; margin: 0 auto;
  padding: 80px 20px 48px;
  display: flex; flex-direction: column; gap: 36px;
}
@media (min-width: 768px) {
  .mf-hero-inner {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 48px; align-items: center; padding: 72px 24px;
  }
}

/* Hero label pill */
.mf-hero-label {
  display: inline-flex; align-items: center; gap: 6px;
  background: #fff5ee; border: 1px solid #fcd4b0; color: var(--accent);
  font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
  padding: 6px 14px; border-radius: 40px; margin-bottom: 16px;
  width: fit-content;
  opacity: 0; animation: mfHeroSub 0.5s ease 0.3s forwards;
}

/* Hero title — fixed ordering & mobile sizes */
.mf-hero-title-block { margin-bottom: 20px; }
.mf-hero-h1 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(38px, 10vw, 82px);
  font-weight: 800;
  color: var(--navy);
  line-height: 0.95;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  opacity: 0;
  display: block;
}
.mf-hero-h1.l1 { animation: mfHeroTitle 0.7s cubic-bezier(0.22,1,0.36,1) 0.4s forwards; }
.mf-hero-h1.l2 { animation: mfHeroTitle 0.7s cubic-bezier(0.22,1,0.36,1) 0.52s forwards; }
.mf-hero-h1.l3 { animation: mfHeroTitle 0.7s cubic-bezier(0.22,1,0.36,1) 0.64s forwards; }
.mf-stroke-text { color: transparent; -webkit-text-stroke: 2.5px var(--navy); }
@media (max-width: 400px) { .mf-hero-h1 { font-size: 34px; } }

/* Hero sub */
.mf-hero-sub {
  font-size: 14px; color: var(--muted); line-height: 1.65; margin-bottom: 24px;
  max-width: 440px;
  opacity: 0; animation: mfHeroSub 0.65s ease 0.8s forwards;
}
.mf-hero-sub strong { color: var(--accent); }

/* CTA buttons — full width on mobile, auto on desktop */
.mf-hero-actions {
  display: flex; gap: 12px; margin-bottom: 20px;
  opacity: 0; animation: mfHeroSub 0.65s ease 0.95s forwards;
}
@media (max-width: 479px) { .mf-hero-actions { flex-direction: column; } }

.mf-btn-wa, .mf-btn-call {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 14px 22px; border-radius: 10px;
  font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 14px;
  text-decoration: none; cursor: pointer; border: none;
  min-height: 50px; transition: transform 0.15s, box-shadow 0.15s;
}
.mf-btn-wa { background: #25d366; color: #fff; width: 100%; }
.mf-btn-call { background: var(--accent); color: #fff; width: 100%; }
@media (min-width: 480px) {
  .mf-btn-wa, .mf-btn-call { width: auto; flex: 1; }
}
@media (hover: hover) {
  .mf-btn-wa:hover { background: #1fbb5a; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(37,211,102,0.35); }
  .mf-btn-call:hover { background: var(--accent-2); transform: translateY(-2px); }
}
.mf-btn-wa:active { transform: scale(0.96); }
.mf-btn-call:active { transform: scale(0.96); }

/* Trust line pills */
.mf-trust-line {
  display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px;
  opacity: 0; animation: mfHeroSub 0.65s ease 1.05s forwards;
}
.mf-trust-line span {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 11px; font-weight: 600; color: var(--navy);
  background: #f0f4fb; padding: 5px 10px; border-radius: 30px;
}
.mf-trust-line svg { color: var(--accent); flex-shrink: 0; }

/* ── Stats bar ── */
.mf-stats-wrap {
  opacity: 0; animation: mfHeroSub 0.65s ease 1.15s forwards;
}
.mf-stats-bar {
  display: grid; grid-template-columns: repeat(4, 1fr);
  border: 1px solid var(--border); border-radius: 16px; overflow: hidden;
  background: var(--white); box-shadow: 0 2px 12px rgba(11,24,41,0.06);
}
.mf-stat-item {
  padding: 14px 6px; text-align: center;
  border-right: 1px solid var(--border);
}
.mf-stat-item:last-child { border-right: none; }
.mf-stat-icon-wrap { display: flex; justify-content: center; margin-bottom: 3px; color: var(--accent); }
.mf-stat-num {
  font-family: 'Syne', sans-serif;
  font-size: clamp(18px, 4vw, 28px);
  font-weight: 800; color: var(--navy); line-height: 1.1;
}
.mf-stat-label {
  font-size: 8px; color: var(--muted); margin-top: 2px;
  font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase;
}
@media (min-width: 480px) { .mf-stat-label { font-size: 9px; } }

/* Mobile image grid */
.mf-mobile-img-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
}
.mf-mobile-img-grid img {
  width: 100%; border-radius: 14px; object-fit: cover;
  aspect-ratio: 4/3; box-shadow: 0 4px 16px rgba(11,24,41,0.1);
}
@media (min-width: 768px) { .mf-mobile-img-grid { display: none; } }

/* Desktop image grid */
.mf-img-grid {
  display: none;
}
@media (min-width: 768px) {
  .mf-img-grid {
    position: relative; display: grid;
    grid-template-columns: 1fr 1fr; gap: 14px;
  }
}
.mf-img-col { display: flex; flex-direction: column; gap: 14px; }
.mf-img-col:nth-child(2) { margin-top: 40px; }
.mf-img-grid img {
  width: 100%; border-radius: 12px; object-fit: cover; display: block;
  box-shadow: 0 8px 28px rgba(11,24,41,0.12);
  opacity: 0; transition: transform 0.4s;
}
.mf-img-col:nth-child(1) img:nth-child(1) { animation: mfHeroTitle 0.7s ease 0.5s forwards; }
.mf-img-col:nth-child(1) img:nth-child(2) { animation: mfHeroTitle 0.7s ease 0.7s forwards; }
.mf-img-col:nth-child(2) img:nth-child(1) { animation: mfHeroTitle 0.7s ease 0.6s forwards; }
.mf-img-col:nth-child(2) img:nth-child(2) { animation: mfHeroTitle 0.7s ease 0.8s forwards; }
.mf-img-badge {
  position: absolute; bottom: 20px; left: -10px;
  background: var(--accent); color: #fff; padding: 10px 16px; border-radius: 12px;
  font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700;
  letter-spacing: 0.03em; box-shadow: 0 8px 20px rgba(232,93,4,0.3); z-index: 2;
  animation: mfBadgePop 0.6s cubic-bezier(0.34,1.56,0.64,1) 1.1s both;
}
@keyframes mfBadgePop { 0%{opacity:0;transform:scale(0.5)} 70%{transform:scale(1.05)} 100%{opacity:1;transform:scale(1)} }

/* ── Trust strip ── */
.mf-trust-strip { padding: 28px 0; background: var(--white); border-top: 1px solid var(--border); }
.mf-trust-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
}
@media (min-width: 640px) { .mf-trust-grid { grid-template-columns: repeat(4, 1fr); } }
.mf-trust-item {
  display: flex; align-items: center; gap: 8px; padding: 11px 12px;
  border: 1px solid var(--border); border-radius: 50px;
  background: var(--steel); transition: all 0.2s;
}
.mf-trust-item svg { width: 15px; height: 15px; color: var(--accent); flex-shrink: 0; }
.mf-trust-item span { font-size: 11px; font-weight: 600; color: var(--navy); line-height: 1.3; }
.mf-trust-item:active { border-color: var(--accent); background: #fff5ee; }

/* ── Feature grid ── */
.mf-feat-grid {
  display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 36px;
}
@media (min-width: 480px) { .mf-feat-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .mf-feat-grid { grid-template-columns: repeat(4, 1fr); } }
.mf-feat-card {
  background: var(--white); border: 1px solid var(--border); border-radius: 18px;
  padding: 24px 18px; position: relative; overflow: hidden;
  transition: box-shadow 0.25s; cursor: pointer;
}
.mf-feat-card::before {
  content: ''; position: absolute; top: 0; left: 0; width: 3px; height: 100%;
  background: var(--accent); transform: scaleY(0); transform-origin: top;
  transition: transform 0.3s;
}
@media (hover: hover) { .mf-feat-card:hover::before { transform: scaleY(1); } }
.mf-feat-ico {
  width: 46px; height: 46px; background: #e8f0fd; border-radius: 12px;
  display: flex; align-items: center; justify-content: center; margin-bottom: 14px;
}
.mf-feat-ico svg { width: 20px; height: 20px; color: var(--blue); }
.mf-feat-title { font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 700; color: var(--navy); margin-bottom: 8px; }
.mf-feat-desc { font-size: 13px; color: var(--muted); line-height: 1.6; }

/* ── Services ── */
.mf-svc-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 32px; flex-wrap: wrap; gap: 10px; }
.mf-view-all { display: inline-flex; align-items: center; gap: 5px; color: var(--accent); font-weight: 700; font-size: 13px; text-decoration: none; padding: 8px 0; }
.mf-svc-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
@media (min-width: 560px) { .mf-svc-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .mf-svc-grid { grid-template-columns: repeat(4, 1fr); } }
.mf-svc-card {
  background: var(--white); border: 1px solid var(--border); border-radius: 18px;
  overflow: hidden; display: flex; flex-direction: column; cursor: pointer;
  text-decoration: none; color: inherit;
  transition: box-shadow 0.25s;
}
.mf-svc-card:active { opacity: 0.95; }
.mf-svc-img { position: relative; height: 190px; overflow: hidden; }
.mf-svc-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
@media (hover: hover) { .mf-svc-card:hover .mf-svc-img img { transform: scale(1.04); } }
.mf-svc-img::after {
  content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 3px;
  background: var(--accent); transition: width 0.3s;
}
.mf-svc-badge {
  position: absolute; top: 10px; left: 10px;
  background: var(--accent); color: #fff; font-size: 9px; font-weight: 800;
  text-transform: uppercase; padding: 4px 10px; border-radius: 30px; letter-spacing: 0.05em;
}
.mf-svc-body { padding: 18px 16px; flex: 1; display: flex; flex-direction: column; }
.mf-svc-title { font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 700; color: var(--navy); margin-bottom: 6px; }
.mf-svc-desc { font-size: 13px; color: var(--muted); line-height: 1.6; margin-bottom: 12px; flex: 1; }
.mf-svc-price { font-size: 12px; font-weight: 800; color: var(--accent); margin-bottom: 12px; }
.mf-svc-link { display: inline-flex; align-items: center; gap: 4px; color: var(--accent); font-size: 13px; font-weight: 700; text-decoration: none; }

/* ── Pricing ── */
.mf-price-grid { display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 36px; }
@media (min-width: 560px) { .mf-price-grid { grid-template-columns: repeat(3, 1fr); } }
.mf-price-card {
  background: var(--white); border: 1.5px solid var(--border); border-radius: 18px;
  padding: 22px 18px; transition: all 0.2s;
}
.mf-price-card:active { border-color: var(--accent); }
.mf-price-name { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; margin-bottom: 6px; color: var(--navy); }
.mf-price-range { font-size: 26px; font-weight: 800; color: var(--accent); margin-bottom: 2px; }
.mf-price-unit { font-size: 11px; color: var(--muted); margin-bottom: 12px; }
.mf-price-note { font-size: 12px; color: var(--muted); line-height: 1.5; }

/* ── Problem–Solution ── */
.mf-problem-solution { display: flex; flex-direction: column; gap: 16px; margin-top: 36px; }
@media (min-width: 768px) { .mf-problem-solution { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; } }
.mf-ps-card { background: var(--white); border-radius: 20px; padding: 24px 20px; box-shadow: 0 4px 16px rgba(0,0,0,0.04); border: 1px solid var(--border); }
.mf-ps-title { font-size: 18px; font-weight: 700; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; color: var(--navy); }
.mf-ps-list { display: flex; flex-direction: column; gap: 14px; }
.mf-ps-item { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text); }

/* ── Recent work ── */
.mf-recent-grid { display: grid; grid-template-columns: 1fr; gap: 20px; margin-top: 36px; }
@media (min-width: 560px) { .mf-recent-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .mf-recent-grid { grid-template-columns: repeat(3, 1fr); } }
.mf-recent-card { border-radius: 18px; overflow: hidden; border: 1px solid var(--border); background: var(--white); }
.mf-recent-img { height: 200px; overflow: hidden; position: relative; }
.mf-recent-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
.mf-recent-card:active .mf-recent-img img { transform: scale(1.02); }
/* ── This was missing! ── */
.mf-before-badge {
  position: absolute; top: 10px; right: 10px;
  background: rgba(11,24,41,0.75); color: #fff;
  font-size: 10px; font-weight: 700; text-transform: uppercase;
  padding: 4px 10px; border-radius: 30px; letter-spacing: 0.04em;
  backdrop-filter: blur(4px);
}
.mf-recent-info { padding: 16px; }
.mf-recent-title { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; color: var(--navy); margin-bottom: 4px; }
.mf-recent-desc { font-size: 12px; color: var(--muted); line-height: 1.5; }

/* ── Testimonials ── */
.mf-testi-grid { display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 36px; }
@media (min-width: 560px) { .mf-testi-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .mf-testi-grid { grid-template-columns: repeat(3, 1fr); } }
.mf-testi-card { background: var(--white); border: 1px solid var(--border); border-radius: 20px; padding: 20px 18px; }
.mf-testi-quote { font-size: 13.5px; color: #2c3e50; line-height: 1.65; margin-bottom: 18px; font-style: italic; }
/* ── These were missing! ── */
.mf-testi-author { display: flex; align-items: center; gap: 10px; }
.mf-testi-avatar {
  width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0;
  background: var(--accent); color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700;
}
.mf-testi-name { font-size: 14px; font-weight: 700; color: var(--navy); }
.mf-testi-role { font-size: 11px; color: var(--muted); margin-top: 1px; }

/* ── Service areas ── */
.mf-areas-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 28px; }
@media (min-width: 480px) { .mf-areas-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 768px) { .mf-areas-grid { grid-template-columns: repeat(5, 1fr); } }
.mf-area-item {
  display: flex; align-items: center; gap: 7px; padding: 12px 14px;
  background: var(--white); border: 1px solid var(--border); border-radius: 50px;
  font-size: 13px; font-weight: 600; color: var(--navy); transition: all 0.2s;
}
.mf-area-item svg { width: 14px; height: 14px; flex-shrink: 0; color: var(--accent); }
.mf-area-item:active { border-color: var(--accent); background: #fff5ee; }

/* ── Urgency banner ── */
.mf-urgency {
  background: #fff6e0; border-left: 4px solid #ffaa00; border-radius: 16px;
  padding: 16px 18px; margin: 28px 0;
  display: flex; align-items: center; justify-content: space-between;
  flex-wrap: wrap; gap: 14px;
}
.mf-urgency-text { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 13px; color: #aa6f00; flex: 1; min-width: 0; }
.mf-urgency-btn {
  background: #ffaa00; color: #2d2d2d; padding: 10px 18px; border-radius: 50px;
  font-weight: 700; text-decoration: none; font-size: 13px; white-space: nowrap;
  min-height: 44px; display: inline-flex; align-items: center;
}
.mf-urgency-btn:active { transform: scale(0.96); }

/* ── Blog grid ── */
.mf-blog-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
@media (min-width: 560px) { .mf-blog-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .mf-blog-grid { grid-template-columns: repeat(4, 1fr); } }

/* ── CTA section ── */
.mf-cta-section { background: var(--navy); padding: 64px 0; position: relative; overflow: hidden; }
.mf-cta-inner { text-align: center; max-width: 760px; margin: 0 auto; padding: 0 20px; }
.mf-cta-h2 { font-size: clamp(28px, 6vw, 52px); font-weight: 800; color: #fff; line-height: 1.1; margin-bottom: 14px; }
.mf-cta-sub { color: rgba(255,255,255,0.6); font-size: 14px; margin-bottom: 28px; line-height: 1.6; }
.mf-cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
.mf-cta-btn1, .mf-cta-btn2 {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 14px 20px; border-radius: 50px;
  font-weight: 700; font-size: 14px; text-decoration: none;
  min-height: 50px; width: 100%; max-width: 300px;
}
@media (min-width: 480px) { .mf-cta-btn1, .mf-cta-btn2 { width: auto; } }
.mf-cta-btn1 { background: var(--accent); color: #fff; }
.mf-cta-btn1:active { background: var(--accent-2); transform: scale(0.97); }
.mf-cta-btn2 { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.25); color: #fff; }
.mf-cta-btn2:active { background: rgba(255,255,255,0.2); transform: scale(0.97); }
`;

/* ─── MAIN EXPORT ─── */
export default function Home() {
  const projects = [
    {
      title: "Modern Gate Fabrication",
      desc: "Old iron gate replaced with heavy-duty powder coated gate",
      img: "https://image.made-in-china.com/2f0j00cktoYIVBHebP/Latest-House-Main-Gate-Grill-Designs-Garden-Door-Wrought-Iron-Gate.jpg",
      badge: "Gate: Installed"
    },
    {
      title: "Industrial Shed Work",
      desc: "25,000 sq ft – from raw steel to leakproof structure",
      img: "https://internal-assets.jswonemsme.com/Industrialshedssteel3_1736772173760_9ee78666a4/Industrialshedssteel3_1736772173760_9ee78666a4.jpeg",
      badge: "Shed: Completed"
    },
    {
      title: "SS Glass Railing",
      desc: "Plain wall transformed to modern SS railing + glass",
      img: "https://img500.exportersindia.com/product_images/bc-500/2023/10/12642786/ss-balcony-grill-1697288793-7131662.jpeg",
      badge: "Railing: Installed"
    },
    {
      title: "Warehouse Shed",
      desc: "Open space converted to sturdy shed with roofing and walls",
      img: "src/Apps/Images/shedimageOmsweets540.jpeg",
      badge: "Completed"
    }
  ];

  return (
    <>
      <style>{CSS}</style>
      <div className="mf-root">

        {/* Floating WhatsApp */}
        <a
          href="https://wa.me/917838170214?text=Hi%2C%20I%20need%20a%20fabrication%20quote"
          className="mf-wa-float"
          target="_blank" rel="noreferrer"
          aria-label="WhatsApp"
        >
          <MessageCircle size={26} color="#fff" />
        </a>

        {/* ══ HERO ══ */}
        <section className="mf-hero">
          <div className="mf-hero-bar" />
          <div className="mf-hero-stripe" />
          <div className="mf-hero-dots" />
          <div className="mf-hero-inner">

            {/* Left: Text */}
            <div>
              <div className="mf-hero-label">
                🔥 Factory Direct Price in Delhi NCR
              </div>

              <div className="mf-hero-title-block">
                <span className="mf-hero-h1 l1">Precision</span>
                <span className="mf-hero-h1 l2">Metal <span className="mf-stroke-text">Work</span></span>
                <span className="mf-hero-h1 l3">&amp; Welding</span>
              </div>

              <p className="mf-hero-sub">
                Get Strong Gates, Sheds &amp; Railings – Direct from Fabricator.
                <br /><strong>📲 Send Photo → Get Price in 10 Minutes</strong>
              </p>

              <div className="mf-hero-actions">
                <a
                  href="https://wa.me/917838170214?text=Hi%2C%20I%20need%20fabrication%20work%20quote"
                  className="mf-btn-wa" target="_blank" rel="noreferrer"
                >
                  <MessageCircle size={16} /> WhatsApp Now
                </a>
                <a href="tel:+917838170214" className="mf-btn-call">
                  <Phone size={16} /> Call Now
                </a>
              </div>

              <div className="mf-trust-line">
                <span><CheckCircle size={12} /> 15+ Years Exp</span>
                <span><CheckCircle size={12} /> 500+ Projects</span>
                <span><CheckCircle size={12} /> Fast Delivery</span>
              </div>

              <div className="mf-stats-wrap">
                <StatsBar />
              </div>
            </div>

            {/* Right: Desktop image grid */}
            <div className="mf-img-grid">
              <div className="mf-img-col">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGO198vroOjje1iwMuTj38hiCWA_qcRaQ1-Q&s" alt="Metal fabrication" style={{ height: 200 }} />
                <img src="https://5.imimg.com/data5/SELLER/Default/2025/10/555289903/GW/NK/EB/105348235/truck-body-repairing-fabrication-500x500.png" alt="Welding" style={{ height: 158 }} />
              </div>
              <div className="mf-img-col">
                <img src="https://5.imimg.com/data5/SELLER/Default/2025/8/536038938/LB/MR/XE/18772814/mild-steel-industrial-fabrication.jpg" alt="Industrial shed" style={{ height: 158 }} />
                <img src="https://s.alicdn.com/@sc04/kf/H9504c585d9f545678b83bb9a227fc7acL/Sunnysky-Modern-Steel-Gate-Grill-Design-House-Latest-Main-Swing-Simple-Driveway-Wrought-Iron-Gate-Designs-Simple.jpg" alt="Gate" style={{ height: 200 }} />
              </div>
              <div className="mf-img-badge">
                Trusted Since 2008
                <br />Delhi NCR's #1 Fabricator
              </div>
            </div>

            {/* Mobile image grid */}
            <div className="mf-mobile-img-grid">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGO198vroOjje1iwMuTj38hiCWA_qcRaQ1-Q&s" alt="Fabrication" loading="lazy" />
              <img src="https://5.imimg.com/data5/SELLER/Default/2025/10/555289903/GW/NK/EB/105348235/truck-body-repairing-fabrication-500x500.png" alt="Welding" loading="lazy" />
              <img src="https://5.imimg.com/data5/SELLER/Default/2025/8/536038938/LB/MR/XE/18772814/mild-steel-industrial-fabrication.jpg" alt="Shed" loading="lazy" />
              <img src="https://s.alicdn.com/@sc04/kf/H9504c585d9f545678b83bb9a227fc7acL/Sunnysky-Modern-Steel-Gate-Grill-Design-House-Latest-Main-Swing-Simple-Driveway-Wrought-Iron-Gate-Designs-Simple.jpg" alt="Gate" loading="lazy" />
            </div>

          </div>
        </section>

        {/* ══ TRUST BADGES ══ */}
        <section className="mf-trust-strip">
          <div className="mf-inner">
            <div className="mf-trust-grid">
              {trustBadges.map((b, i) => (
                <Reveal key={i} direction="scale" delay={i * 50}>
                  <div className="mf-trust-item">
                    <b.icon size={15} />
                    <span>{b.label}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FEATURES ══ */}
        <section className="mf-section-alt">
          <div className="mf-inner">
            <Reveal direction="up">
              <div style={{ textAlign: 'center' }}>
                <div className="mf-eyebrow"><span className="mf-eyebrow-dot" />Why Choose Us</div>
                <h2 className="mf-section-heading">Built on <span className="mf-accent-word">Trust</span> &amp; Precision</h2>
                <div className="mf-divider-line" style={{ margin: '12px auto 0' }} />
              </div>
            </Reveal>
            <div className="mf-feat-grid">
              {features.map((f, i) => (
                <Reveal key={i} direction="up" delay={i * 60}>
                  <div className="mf-feat-card">
                    <div className="mf-feat-ico"><f.icon /></div>
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
          <div className="mf-inner">
            <div className="mf-svc-header">
              <Reveal direction="left">
                <div>
                  <div className="mf-eyebrow"><span className="mf-eyebrow-dot" />What We Do</div>
                  <h2 className="mf-section-heading">Our <span className="mf-accent-word">Services</span></h2>
                  <div className="mf-divider-line" />
                </div>
              </Reveal>
              <Reveal direction="right">
                <Link to="/services" className="mf-view-all">View All <ArrowRight size={13} /></Link>
              </Reveal>
            </div>
            <div className="mf-svc-grid">
              {services.map((s, i) => (
                <Reveal key={i} direction="up" delay={i * 60}>
                  <div className="mf-svc-card">
                    <div className="mf-svc-img">
                      <img src={s.image} alt={s.title} loading="lazy" />
                      <span className="mf-svc-badge">{s.tag}</span>
                    </div>
                    <div className="mf-svc-body">
                      <div className="mf-svc-title">{s.title}</div>
                      <p className="mf-svc-desc">{s.description}</p>
                      <div className="mf-svc-price">From {s.price}</div>
                      <Link to="/services" className="mf-svc-link">Learn More <ArrowRight size={12} /></Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PRICING ══ */}
        <section className="mf-section-alt">
          <div className="mf-inner">
            <Reveal direction="up">
              <div>
                <div className="mf-eyebrow"><span className="mf-eyebrow-dot" />Estimated Pricing</div>
                <h2 className="mf-section-heading">No Hidden <span className="mf-accent-word">Charges</span></h2>
                <div className="mf-divider-line" />
                <p style={{ marginTop: 14, fontSize: 13, color: 'var(--muted)' }}>
                  Send a photo for an exact quote – price depends on design &amp; material.
                </p>
              </div>
            </Reveal>
            <div className="mf-price-grid">
              {[
                { name: 'Gate Work', range: '₹250–₹600', unit: 'per sq ft', note: 'MS / SS gates, custom designs, rust-proof finish.' },
                { name: 'Shed Work', range: '₹180–₹400', unit: 'per sq ft', note: 'Industrial sheds, warehouses, PEB structures.' },
                { name: 'Railings', range: '₹300–₹800', unit: 'per sq ft', note: 'Balcony railings, stair railings, grills.' },
              ].map((p, i) => (
                <Reveal key={i} direction="up" delay={i * 60}>
                  <div className="mf-price-card">
                    <div className="mf-price-name">{p.name}</div>
                    <div className="mf-price-range">{p.range}</div>
                    <div className="mf-price-unit">{p.unit}</div>
                    <p className="mf-price-note">{p.note}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal direction="up" delay={200}>
              <div style={{ marginTop: 28, textAlign: 'center' }}>
                <a
                  href="https://wa.me/917838170214?text=Hi%2C%20send%20me%20photo%20for%20exact%20price"
                  className="mf-btn-wa"
                  target="_blank" rel="noreferrer"
                  style={{ display: 'inline-flex', width: 'auto' }}
                >
                  <MessageCircle size={16} /> Send Photo → Get Exact Price
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ PROBLEM → SOLUTION ══ */}
        <section className="mf-section">
          <div className="mf-inner">
            <Reveal direction="up">
              <div style={{ textAlign: 'center' }}>
                <div className="mf-eyebrow"><span className="mf-eyebrow-dot" />Why Choose Us</div>
                <h2 className="mf-section-heading">Problems? <span className="mf-accent-word">We Solve It</span></h2>
                <div className="mf-divider-line" style={{ margin: '12px auto 0' }} />
              </div>
            </Reveal>
            <div className="mf-problem-solution">
              <div className="mf-ps-card">
                <div className="mf-ps-title"><XCircle size={22} color="#d32f2f" /> Facing These Problems?</div>
                <div className="mf-ps-list">
                  {['High contractor charges', 'Weak welding / poor quality', 'Delay in work'].map((t, i) => (
                    <div key={i} className="mf-ps-item"><XCircle size={16} color="#d32f2f" />{t}</div>
                  ))}
                </div>
              </div>
              <div className="mf-ps-card">
                <div className="mf-ps-title"><CheckCircle size={22} color="#e85d04" /> We Solve It</div>
                <div className="mf-ps-list">
                  {['Direct factory pricing', 'Strong & durable material', 'Fast and reliable work'].map((t, i) => (
                    <div key={i} className="mf-ps-item"><CheckCircle size={16} color="#e85d04" />{t}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ RECENT WORK ══ */}
        <section className="mf-section-alt">
          <div className="mf-inner">
            <Reveal direction="up">
              <div style={{ textAlign: 'center' }}>
                <div className="mf-eyebrow"><span className="mf-eyebrow-dot" />Portfolio</div>
                <h2 className="mf-section-heading">Our <span className="mf-accent-word">Recent Work</span></h2>
                <div className="mf-divider-line" style={{ margin: '12px auto 0' }} />
              </div>
            </Reveal>
            <div className="mf-recent-grid">
              {projects.map((item, index) => (
                <Reveal key={index} direction="up" delay={index * 60}>
                  <div className="mf-recent-card">
                    <div className="mf-recent-img">
                      <img src={item.img} alt={item.title} loading="lazy" />
                      <div className="mf-before-badge">{item.badge}</div>
                    </div>
                    <div className="mf-recent-info">
                      <div className="mf-recent-title">{item.title}</div>
                      <div className="mf-recent-desc">{item.desc}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ TESTIMONIALS ══ */}
        <section className="mf-section">
          <div className="mf-inner">
            <Reveal direction="up">
              <div style={{ textAlign: 'center' }}>
                <div className="mf-eyebrow"><span className="mf-eyebrow-dot" />Customer Reviews</div>
                <h2 className="mf-section-heading">What Our <span className="mf-accent-word">Clients</span> Say</h2>
                <div className="mf-divider-line" style={{ margin: '12px auto 0' }} />
              </div>
            </Reveal>
            <div className="mf-testi-grid">
              {testimonials.map((t, i) => (
                <Reveal key={i} direction="up" delay={i * 70}>
                  <div className="mf-testi-card">
                    <StarRating count={t.stars} />
                    <p className="mf-testi-quote">"{t.text}"</p>
                    <div className="mf-testi-author">
                      <div className="mf-testi-avatar">{t.name.charAt(0)}</div>
                      <div>
                        <div className="mf-testi-name">{t.name}</div>
                        <div className="mf-testi-role">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ SERVICE AREAS ══ */}
        <section className="mf-section-alt">
          <div className="mf-inner">
            <Reveal direction="left">
              <div>
                <div className="mf-eyebrow"><span className="mf-eyebrow-dot" />Where We Work</div>
                <h2 className="mf-section-heading">Service <span className="mf-accent-word">Areas</span></h2>
                <div className="mf-divider-line" />
              </div>
            </Reveal>
            <div className="mf-areas-grid">
              {serviceAreas.map((area, i) => (
                <Reveal key={i} direction="up" delay={i * 50}>
                  <div className="mf-area-item">
                    <MapPin size={14} />{area}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ URGENCY BANNER ══ */}
        <div className="mf-inner">
          <div className="mf-urgency">
            <div className="mf-urgency-text">
              <AlertTriangle size={17} /> Limited Slots Available This Week
            </div>
            <a
              href="https://wa.me/917838170214?text=Book%20my%20slot%20for%20fabrication"
              className="mf-urgency-btn" target="_blank" rel="noreferrer"
            >
              Book Now →
            </a>
          </div>
        </div>

        {/* ══ BLOG PREVIEWS ══ */}
        <section className="mf-section" style={{ paddingTop: 0 }}>
          <div className="mf-inner">
            <div className="mf-svc-header">
              <Reveal direction="left">
                <div>
                  <div className="mf-eyebrow"><span className="mf-eyebrow-dot" />Insights</div>
                  <h2 className="mf-section-heading">Fabrication <span className="mf-accent-word">Blogs</span></h2>
                  <div className="mf-divider-line" />
                </div>
              </Reveal>
              <Reveal direction="right">
                <Link to="/blogs" className="mf-view-all">View All <ArrowRight size={13} /></Link>
              </Reveal>
            </div>
            <div className="mf-blog-grid">
              {blogsPreview.map((b, i) => (
                <Reveal key={i} direction="scale" delay={i * 60}>
                  <Link to={`/blogs/${i}`} className="mf-svc-card" style={{ textDecoration: 'none' }}>
                    <div className="mf-svc-img" style={{ height: 180 }}>
                      <img src={b.image} alt={b.title} loading="lazy" />
                      <span className="mf-svc-badge">{b.tag}</span>
                    </div>
                    <div className="mf-svc-body">
                      <div className="mf-svc-title" style={{ fontSize: 15 }}>{b.title}</div>
                      <p className="mf-svc-desc" style={{ fontSize: 12.5 }}>{b.desc}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 11, color: 'var(--muted)' }}>{b.date}</span>
                        <span className="mf-svc-link" style={{ fontSize: 12 }}>Read More <ArrowRight size={11} /></span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FINAL CTA ══ */}
        <section className="mf-cta-section">
          <div className="mf-cta-inner">
            <Reveal direction="up">
              <h2 className="mf-cta-h2">Need Fabrication Work?</h2>
            </Reveal>
            <Reveal direction="up" delay={80}>
              <p className="mf-cta-sub">Get an instant quote on WhatsApp or call us now. Strong steel, fair price, timely delivery.</p>
            </Reveal>
            <Reveal direction="up" delay={160}>
              <div className="mf-cta-btns">
                <a href="https://wa.me/917838170214?text=Hi%2C%20I%20need%20fabrication%20work" className="mf-cta-btn1" target="_blank" rel="noreferrer">
                  <MessageCircle size={16} /> Get Instant Quote on WhatsApp
                </a>
                <a href="tel:+917838170214" className="mf-cta-btn2">
                  <Phone size={16} /> Call Now
                </a>
              </div>
            </Reveal>
          </div>
        </section>

      </div>
    </>
  );
}