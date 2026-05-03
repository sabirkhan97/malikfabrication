import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle, Shield, Zap, Award, Clock, Users, Wrench, Phone, MessageCircle, Star, MapPin, ChevronRight, XCircle, AlertTriangle } from 'lucide-react';
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
  { value: 15, suffix: '+', label: 'Years Experience', icon: Clock },
  { value: 500, suffix: '+', label: 'Projects Done', icon: Wrench },
  { value: 300, suffix: '+', label: 'Happy Clients', icon: Users },
  { value: 100, suffix: '%', label: 'Quality Guaranteed', icon: Award },
];

const testimonials = [
  { name: 'Rajesh Sharma', role: 'Factory Owner, Manesar', text: 'Exceptional quality shed fabrication. Delivered 3 days early and the welding finish is top-notch.', stars: 5 },
  { name: 'Priya Mehta', role: 'Architect, Gurgaon', text: 'We source all our custom railing and gate work from Malik. Consistent quality every single time.', stars: 5 },
  { name: 'Sunil Kumar', role: 'Builder, DLF Phase 2', text: 'Best price in Gurgaon without compromising quality. Highly recommend for bulk orders.', stars: 5 },
];

// Updated service areas as requested (Delhi, Najafgarh, Dwarka, Gurgaon, Noida)
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
function useCountUp(target: any, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: any = null;
    const step = (timestamp: any) => {
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
  const ref = useRef(null);
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
function Reveal({ children, className = '', direction = 'up', delay = 0 }: any) {
  const ref = useRef(null);
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
  const animMap: any = {
    up: 'mf-anim-up',
    left: 'mf-anim-left',
    right: 'mf-anim-right',
    scale: 'mf-anim-scale',
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

function AnimatedStat({ stat, inView }: any) {
  const count = useCountUp(stat.value, 1800, inView);
  return (
    <div className="mf-stat-item">
      <div className="mf-stat-icon-wrap"><stat.icon size={20} /></div>
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

function StarRating({ count }: any) {
  return (
    <div style={{ display: 'flex', gap: 2, marginBottom: 10 }}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} style={{ fill: '#e85d04', color: '#e85d04' }} />
      ))}
    </div>
  );
}

/* ─── STYLES (ENHANCED FOR MOBILE) ─── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@600;700&family=Inter:wght@400;500&display=swap');
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
  --touch-target: 48px;
}

.mf-root *, .mf-root *::before, .mf-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
.mf-root { font-family: 'Plus Jakarta Sans', sans-serif; color: var(--text); background: var(--white); overflow-x: hidden; -webkit-tap-highlight-color: transparent; }
.mf-root h1, .mf-root h2, .mf-root h3, .mf-root h4 { font-family: 'Syne', sans-serif; }

/* ── Scroll reveal ── */
.mf-reveal { opacity: 0; }
@keyframes mfUp    { from { opacity:0; transform:translateY(36px) } to { opacity:1; transform:none } }
@keyframes mfLeft  { from { opacity:0; transform:translateX(-36px) } to { opacity:1; transform:none } }
@keyframes mfRight { from { opacity:0; transform:translateX(36px) } to { opacity:1; transform:none } }
@keyframes mfScale { from { opacity:0; transform:scale(0.88) } to { opacity:1; transform:none } }
.mf-anim-up    { animation: mfUp    0.6s cubic-bezier(0.22,1,0.36,1) both }
.mf-anim-left  { animation: mfLeft  0.6s cubic-bezier(0.22,1,0.36,1) both }
.mf-anim-right { animation: mfRight 0.6s cubic-bezier(0.22,1,0.36,1) both }
.mf-anim-scale { animation: mfScale 0.5s cubic-bezier(0.22,1,0.36,1) both }

/* ── Floating WhatsApp (touch optimized) ── */
@keyframes mfPulse { 0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,0.5)} 50%{box-shadow:0 0 0 12px rgba(37,211,102,0)} }
.mf-wa-float {
  position: fixed; bottom: 20px; right: 20px; z-index: 9999;
  width: 56px; height: 56px; border-radius: 50%;
  background: #25d366; display: flex; align-items: center; justify-content: center;
  text-decoration: none; animation: mfPulse 2.5s ease-in-out infinite;
  transition: transform 0.2s ease, box-shadow 0.2s;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.mf-wa-float:active { transform: scale(0.94); }
@media (hover: hover) {
  .mf-wa-float:hover { transform: scale(1.08); }
}

/* ── Layout (mobile first padding) ── */
.mf-inner { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
.mf-section { padding: 64px 0; }
.mf-section-alt { padding: 64px 0; background: var(--steel); }

/* ── Section heading (mobile optimized) ── */
.mf-eyebrow { display: inline-flex; align-items: center; gap: 7px; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); margin-bottom: 12px; }
.mf-eyebrow-dot { width: 5px; height: 5px; background: var(--accent); border-radius: 50%; }
.mf-section-heading { font-size: clamp(26px, 5vw, 44px); font-weight: 800; color: var(--navy); line-height: 1.15; letter-spacing: -0.02em; }
.mf-accent-word { color: var(--accent); }
.mf-divider-line { width: 44px; height: 3px; background: var(--accent); border-radius: 2px; margin-top: 14px; }

/* ── Hero (mobile-first redesign) ── */
@keyframes mfHeroTitle { from{opacity:0;transform:translateY(35px)} to{opacity:1;transform:none} }
@keyframes mfHeroSub   { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:none} }
@keyframes mfBarGrow   { from{transform:scaleY(0)} to{transform:scaleY(1)} }
@keyframes mfDotDrift  { 0%{background-position:0 0} 100%{background-position:28px 28px} }

.mf-hero {
  position: relative; min-height: 100vh; background: var(--white);
  display: flex; align-items: center; overflow: hidden; padding-top: 20px;
}
.mf-hero-stripe {
  position: absolute; top: 0; right: 0; width: 100%; height: 100%;
  background: #f0f4fb;
  clip-path: polygon(30% 0,100% 0,100% 100%,0 100%);
  animation: mfStripeIn 0.8s ease-out 0.1s both;
  opacity: 0.6;
}
@media (min-width: 768px) {
  .mf-hero-stripe { width: 50%; clip-path: polygon(8% 0,100% 0,100% 100%,0 100%); opacity: 1; }
}
.mf-hero-dots {
  position: absolute; top: 0; right: 0; width: 100%; height: 100%;
  background-image: radial-gradient(circle, #b8c8e8 1px, transparent 1px);
  background-size: 22px 22px; opacity: 0.4;
  animation: mfDotDrift 12s linear infinite;
  pointer-events: none;
}
@media (min-width: 768px) {
  .mf-hero-dots { width: 50%; clip-path: polygon(8% 0,100% 0,100% 100%,0 100%); opacity: 0.5; }
}
.mf-hero-bar {
  position: absolute; left: 0; top: 0; width: 4px; height: 100%;
  background: linear-gradient(to bottom, var(--accent), #132d52);
  transform-origin: top; animation: mfBarGrow 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s both;
}
.mf-hero-inner {
  position: relative; z-index: 1;
  display: flex; flex-direction: column;
  gap: 32px; width: 100%; max-width: 1200px; margin: 0 auto; padding: 40px 20px;
}
@media (min-width: 768px) {
  .mf-hero-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; padding: 60px 24px; }
}
.mf-hero-label {
  display: inline-flex; align-items: center; gap: 8px;
  background: #fff5ee; border: 1px solid #fcd4b0; color: var(--accent);
  font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
  padding: 6px 14px; border-radius: 40px; margin-bottom: 20px;
  opacity: 0; animation: mfHeroSub 0.5s ease 0.3s forwards;
}
.mf-hero-h1 {
  font-size: clamp(42px, 8vw, 82px); font-weight: 800;
  color: var(--navy); line-height: 0.96; letter-spacing: -0.03em;
  text-transform: uppercase; opacity: 0;
}
.mf-hero-h1.l1 { animation: mfHeroTitle 0.7s cubic-bezier(0.22,1,0.36,1) 0.45s forwards; }
.mf-hero-h1.l2 { animation: mfHeroTitle 0.7s cubic-bezier(0.22,1,0.36,1) 0.58s forwards; margin-bottom: 4px; font-size: clamp(36px, 7vw, 82px); }
.mf-hero-h1.l3 { animation: mfHeroTitle 0.7s cubic-bezier(0.22,1,0.36,1) 0.71s forwards; margin-bottom: 24px; }
.mf-stroke-text { color: transparent; -webkit-text-stroke: 2px var(--navy); }
.mf-hero-sub {
  font-size: 15px; color: var(--muted); line-height: 1.6; max-width: 440px; margin-bottom: 20px;
  opacity: 0; animation: mfHeroSub 0.65s ease 0.86s forwards;
}
.mf-hero-actions {
  display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 24px;
  opacity: 0; animation: mfHeroSub 0.65s ease 1.0s forwards;
}
.mf-trust-line {
  display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 28px;
  opacity: 0; animation: mfHeroSub 0.65s ease 1.12s forwards;
}
.mf-trust-line span {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 12px; font-weight: 600; color: var(--navy);
}
.mf-trust-line svg { color: var(--accent); width: 14px; }

.mf-btn-wa, .mf-btn-call {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 14px 20px; border-radius: 8px;
  font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 14px;
  text-decoration: none; transition: all 0.2s ease;
  min-height: 48px; cursor: pointer;
}
.mf-btn-wa {
  background: #25d366; color: #fff; flex: 1;
}
.mf-btn-wa:active { background: #1da851; transform: scale(0.97); }
.mf-btn-call {
  background: var(--accent); color: #fff; flex: 1;
}
.mf-btn-call:active { background: var(--accent-2); transform: scale(0.97); }
@media (min-width: 480px) {
  .mf-btn-wa, .mf-btn-call { flex: initial; padding: 14px 28px; }
}
@media (hover: hover) {
  .mf-btn-wa:hover { background: #1da851; transform: translateY(-2px); box-shadow: 0 10px 24px rgba(37,211,102,0.3); }
  .mf-btn-call:hover { background: var(--accent-2); transform: translateY(-2px); }
}

/* Stats bar (mobile optimized) */
.mf-stats-bar {
  display: grid; grid-template-columns: repeat(2, 1fr);
  border: 1px solid var(--border); border-radius: 20px; overflow: hidden;
  background: var(--white); box-shadow: 0 2px 16px rgba(11,24,41,0.05);
  opacity: 0; animation: mfHeroSub 0.65s ease 1.14s forwards;
}
@media (min-width: 640px) {
  .mf-stats-bar { grid-template-columns: repeat(4, 1fr); }
}
.mf-stat-item {
  padding: 16px 8px; text-align: center; border-right: 1px solid var(--border);
  transition: background 0.25s;
}
.mf-stat-item:active { background: #fff8f3; }
.mf-stat-item:last-child { border-right: none; }
.mf-stat-icon-wrap { display: flex; justify-content: center; margin-bottom: 4px; color: var(--accent); }
.mf-stat-num { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 800; color: var(--navy); line-height: 1.1; }
@media (min-width: 640px) { .mf-stat-num { font-size: 32px; } }
.mf-stat-label { font-size: 9px; color: var(--muted); margin-top: 4px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; }
@media (min-width: 640px) { .mf-stat-label { font-size: 10px; } }

/* Mobile image showcase (new) */
.mf-mobile-img-grid {
  display: none;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 24px;
}
.mf-mobile-img-grid img {
  width: 100%; border-radius: 16px; object-fit: cover; aspect-ratio: 4/3;
  box-shadow: 0 4px 16px rgba(11,24,41,0.1);
  transition: transform 0.3s ease;
}
.mf-mobile-img-grid img:active { transform: scale(0.98); }
@media (max-width: 767px) {
  .mf-mobile-img-grid { display: grid; }
}
/* hide desktop grid on mobile */
@media (max-width: 767px) {
  .mf-img-grid { display: none; }
}
@media (min-width: 768px) {
  .mf-img-grid { display: grid; }
}

.mf-img-grid {
  position: relative; display: grid; grid-template-columns: 1fr 1fr; gap: 14px;
}
.mf-img-col { display: flex; flex-direction: column; gap: 14px; }
.mf-img-col:nth-child(2) { margin-top: 40px; }
.mf-img-grid img {
  width: 100%; border-radius: 12px; object-fit: cover; display: block;
  box-shadow: 0 8px 28px rgba(11,24,41,0.12);
  transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s;
  opacity: 0;
}
.mf-img-col:nth-child(1) img:nth-child(1) { animation: mfHeroImg 0.7s ease 0.5s forwards; }
.mf-img-col:nth-child(1) img:nth-child(2) { animation: mfHeroImg 0.7s ease 0.7s forwards; }
.mf-img-col:nth-child(2) img:nth-child(1) { animation: mfHeroImg 0.7s ease 0.6s forwards; }
.mf-img-col:nth-child(2) img:nth-child(2) { animation: mfHeroImg 0.7s ease 0.8s forwards; }
@keyframes mfHeroImg { from{opacity:0;transform:translateY(24px) scale(0.96)} to{opacity:1;transform:none} }
.mf-img-badge {
  position: absolute; bottom: 20px; left: -10px;
  background: var(--accent); color: #fff; padding: 10px 16px; border-radius: 12px;
  font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700;
  letter-spacing: 0.03em; box-shadow: 0 8px 20px rgba(232,93,4,0.3); z-index: 2;
  animation: mfBadgePop 0.6s cubic-bezier(0.34,1.56,0.64,1) 1.1s both;
}
@keyframes mfBadgePop { 0%{opacity:0;transform:scale(0.5)} 70%{transform:scale(1.05)} 100%{opacity:1;transform:scale(1)} }

/* Feature grid (mobile first) */
.mf-feat-grid { display: grid; grid-template-columns: 1fr; gap: 20px; margin-top: 44px; }
@media (min-width: 640px) { .mf-feat-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .mf-feat-grid { grid-template-columns: repeat(4, 1fr); } }
.mf-feat-card {
  background: var(--white); border: 1px solid var(--border); border-radius: 20px;
  padding: 28px 20px; position: relative; overflow: hidden;
  transition: box-shadow 0.3s, transform 0.2s, border-color 0.2s;
  cursor: pointer;
}
.mf-feat-card:active { transform: scale(0.98); }
.mf-feat-card::before {
  content: ''; position: absolute; top: 0; left: 0; width: 3px; height: 100%;
  background: var(--accent); transform: scaleY(0); transform-origin: top;
  transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
}
.mf-feat-card:hover::before { transform: scaleY(1); }
.mf-feat-ico {
  width: 50px; height: 50px; background: #e8f0fd; border-radius: 14px;
  display: flex; align-items: center; justify-content: center; margin-bottom: 18px;
}
.mf-feat-ico svg { width: 22px; height: 22px; color: var(--blue); }
.mf-feat-title { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700; color: var(--navy); margin-bottom: 8px; }
.mf-feat-desc { font-size: 13px; color: var(--muted); line-height: 1.6; }

/* Services */
.mf-svc-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 36px; flex-wrap: wrap; gap: 12px; }
.mf-view-all { display: inline-flex; align-items: center; gap: 5px; color: var(--accent); font-weight: 700; font-size: 13px; text-decoration: none; min-height: 44px; padding: 8px 0; }
.mf-svc-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
@media (min-width: 640px) { .mf-svc-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .mf-svc-grid { grid-template-columns: repeat(4, 1fr); } }
.mf-svc-card {
  background: var(--white); border: 1px solid var(--border); border-radius: 20px;
  overflow: hidden; transition: box-shadow 0.3s, transform 0.2s;
  display: flex; flex-direction: column;
  cursor: pointer;
}
.mf-svc-card:active { transform: scale(0.98); }
.mf-svc-img { position: relative; height: 200px; overflow: hidden; }
.mf-svc-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
.mf-svc-img::after {
  content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 3px;
  background: var(--accent); transition: width 0.3s ease;
}
.mf-svc-card:active .mf-svc-img::after { width: 100%; }
.mf-svc-badge {
  position: absolute; top: 12px; left: 12px;
  background: var(--accent); color: #fff; font-size: 10px; font-weight: 800;
  text-transform: uppercase; padding: 5px 10px; border-radius: 30px;
}
.mf-svc-body { padding: 20px; flex: 1; display: flex; flex-direction: column; }
.mf-svc-title { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700; color: var(--navy); margin-bottom: 6px; }
.mf-svc-desc { font-size: 13px; color: var(--muted); line-height: 1.6; margin-bottom: 14px; flex: 1; }
.mf-svc-price { font-size: 13px; font-weight: 800; color: var(--accent); margin-bottom: 14px; }
.mf-svc-link { display: inline-flex; align-items: center; gap: 5px; color: var(--accent); font-size: 13px; font-weight: 700; text-decoration: none; min-height: 40px; }

/* Pricing grid */
.mf-price-grid { display: grid; grid-template-columns: 1fr; gap: 20px; margin-top: 40px; }
@media (min-width: 640px) { .mf-price-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .mf-price-grid { grid-template-columns: repeat(3, 1fr); } }
.mf-price-card {
  background: var(--white); border: 1.5px solid var(--border); border-radius: 20px;
  padding: 24px 20px; transition: all 0.2s;
}
.mf-price-card:active { border-color: var(--accent); transform: translateY(-2px); }
.mf-price-name { font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 700; margin-bottom: 6px; }
.mf-price-range { font-size: 28px; font-weight: 800; color: var(--accent); margin-bottom: 4px; }
.mf-price-unit { font-size: 11px; color: var(--muted); margin-bottom: 14px; }

/* Problem-Solution */
.mf-problem-solution { display: flex; flex-direction: column; gap: 24px; margin-top: 40px; }
@media (min-width: 768px) { .mf-problem-solution { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; } }
.mf-ps-card { background: var(--white); border-radius: 24px; padding: 28px 20px; box-shadow: 0 6px 18px rgba(0,0,0,0.04); border: 1px solid var(--border); }
.mf-ps-title { font-size: 20px; font-weight: 700; margin-bottom: 24px; display: flex; align-items: center; gap: 12px; }
.mf-ps-list { display: flex; flex-direction: column; gap: 16px; }
.mf-ps-item { display: flex; align-items: center; gap: 12px; font-size: 15px; }

/* Recent work */
.mf-recent-grid { display: grid; grid-template-columns: 1fr; gap: 24px; margin-top: 40px; }
@media (min-width: 640px) { .mf-recent-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .mf-recent-grid { grid-template-columns: repeat(3, 1fr); } }
.mf-recent-card { border-radius: 20px; overflow: hidden; border: 1px solid var(--border); background: white; }
.mf-recent-img { height: 200px; overflow: hidden; }
.mf-recent-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
.mf-recent-card:active .mf-recent-img img { transform: scale(1.02); }

/* Testimonials */
.mf-testi-grid { display: grid; grid-template-columns: 1fr; gap: 24px; margin-top: 40px; }
@media (min-width: 640px) { .mf-testi-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .mf-testi-grid { grid-template-columns: repeat(3, 1fr); } }
.mf-testi-card { background: var(--white); border: 1px solid var(--border); border-radius: 24px; padding: 24px 20px; }
.mf-testi-quote { font-size: 14px; color: #2c3e50; line-height: 1.6; margin-bottom: 20px; font-style: italic; }

/* Service areas */
.mf-areas-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 32px; }
@media (min-width: 640px) { .mf-areas-grid { grid-template-columns: repeat(3, 1fr); } }
.mf-area-item {
  display: flex; align-items: center; gap: 8px; padding: 14px 12px;
  background: var(--white); border: 1px solid var(--border); border-radius: 60px;
  font-size: 14px; font-weight: 600; color: var(--navy);
  transition: all 0.2s;
}
.mf-area-item:active { border-color: var(--accent); background: #fff8f3; }

/* Urgency banner */
.mf-urgency {
  background: #fff6e0; border-left: 5px solid #ffaa00; border-radius: 20px;
  padding: 16px 20px; margin: 32px 0;
  display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap;
  gap: 16px;
}
.mf-urgency-text { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 13px; color: #aa6f00; }
.mf-urgency-btn {
  background: #ffaa00; color: #2d2d2d; padding: 10px 20px; border-radius: 60px;
  font-weight: 700; text-decoration: none; font-size: 13px;
  min-height: 44px; display: inline-flex; align-items: center;
}
.mf-urgency-btn:active { transform: scale(0.96); background: #e69500; }

/* Trust strip */
.mf-trust-strip { padding: 32px 0; background: var(--white); border-top: 1px solid var(--border); }
.mf-trust-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
@media (min-width: 640px) { .mf-trust-grid { grid-template-columns: repeat(4, 1fr); } }
.mf-trust-item {
  display: flex; align-items: center; gap: 8px; padding: 12px 12px;
  border: 1px solid var(--border); border-radius: 60px; background: var(--steel);
  transition: all 0.2s;
}
.mf-trust-item:active { border-color: var(--accent); background: #fff8f3; transform: scale(0.97); }
.mf-trust-item span { font-size: 12px; font-weight: 600; color: var(--navy); }

/* Blog grid */
.mf-blog-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
@media (min-width: 640px) { .mf-blog-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .mf-blog-grid { grid-template-columns: repeat(4, 1fr); } }

/* CTA section */
.mf-cta-section {
  background: var(--navy); padding: 64px 0; position: relative; overflow: hidden;
}
.mf-cta-inner { text-align: center; max-width: 760px; margin: 0 auto; padding: 0 20px; }
.mf-cta-h2 { font-size: clamp(30px, 6vw, 52px); font-weight: 800; color: #fff; line-height: 1.1; margin-bottom: 16px; }
.mf-cta-sub { color: rgba(255,255,255,0.65); font-size: 15px; margin-bottom: 32px; }
.mf-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
.mf-cta-btn1, .mf-cta-btn2 {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 14px 22px; border-radius: 60px;
  font-weight: 700; font-size: 14px; text-decoration: none;
  min-height: 48px; min-width: 200px;
}
.mf-cta-btn1 { background: var(--accent); color: #fff; }
.mf-cta-btn1:active { background: var(--accent-2); transform: scale(0.97); }
.mf-cta-btn2 { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #fff; }
.mf-cta-btn2:active { background: rgba(255,255,255,0.2); transform: scale(0.97); }

/* Additional touch & scroll behavior */
.mf-root button, .mf-root a, .mf-root [role="button"] {
  touch-action: manipulation;
}
body { overflow-x: hidden; }
img { max-width: 100%; height: auto; display: block; }
`;

/* ─── MAIN EXPORT (ENHANCED FOR MOBILE) ─── */
export default function Home() {
  return (
    <>
      <style>{CSS}</style>
      <div className="mf-root">

        {/* Floating WhatsApp */}
        <a href="https://wa.me/917838170214?text=Hi%2C%20I%20need%20a%20fabrication%20quote" className="mf-wa-float" target="_blank" rel="noreferrer" aria-label="WhatsApp">
          <MessageCircle size={28} />
        </a>

        {/* ══ HERO SECTION with mobile image grid alternative ══ */}
        <section className="mf-hero">
          <div className="mf-hero-bar" />
          <div className="mf-hero-stripe" />
          <div className="mf-hero-dots" />
          <div className="mf-hero-inner">
            <div>
              <div className="mf-hero-label">
                🔥 Factory Direct Price in Delhi NCR
              </div>
              <h1 className="mf-hero-h1 l1">Precision
                Metal </h1>
              <h1 className="mf-hero-h1 l3">
                <span className="mf-stroke-text">Work</span>
              </h1>
              <h1 className="mf-hero-h1 l2">& Welding
              </h1>
              <p className="mf-hero-sub">
                Get Strong Gates, Sheds & Railings – Direct from Fabricator.
                <br />
                <strong style={{ color: 'var(--accent)' }}>📲 Send Photo on WhatsApp → Get Price in 10 Minutes</strong>
              </p>
              <div className="mf-hero-actions">
                <a href="https://wa.me/917838170214?text=Hi%2C%20I%20need%20fabrication%20work%20quote" className="mf-btn-wa" target="_blank" rel="noreferrer">
                  <MessageCircle size={16} /> WhatsApp Now
                </a>
                <a href="tel:+917838170214" className="mf-btn-call">
                  <Phone size={16} /> Call Now
                </a>
              </div>
              <div className="mf-trust-line">
                <span><CheckCircle size={14} /> 5+ Years Exp</span>
                <span><CheckCircle size={14} /> 100+ Projects</span>
                <span><CheckCircle size={14} /> Fast Delivery</span>
              </div>
              <StatsBar />
            </div>

            {/* Desktop image grid */}
            <div className="mf-img-grid">
              <div className="mf-img-col">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGO198vroOjje1iwMuTj38hiCWA_qcRaQ1-Q&s" alt="Metal fabrication work" style={{ height: 200 }} />
                <img src="https://5.imimg.com/data5/SELLER/Default/2025/10/555289903/GW/NK/EB/105348235/truck-body-repairing-fabrication-500x500.png" alt="Welding service" style={{ height: 158 }} />
              </div>
              <div className="mf-img-col">
                <img src="https://5.imimg.com/data5/SELLER/Default/2025/8/536038938/LB/MR/XE/18772814/mild-steel-industrial-fabrication.jpg" alt="Industrial shed" style={{ height: 158 }} />
                <img src="https://s.alicdn.com/@sc04/kf/H9504c585d9f545678b83bb9a227fc7acL/Sunnysky-Modern-Steel-Gate-Grill-Design-House-Latest-Main-Swing-Simple-Driveway-Wrought-Iron-Gate-Designs-Simple.jpg" alt="Gate fabrication" style={{ height: 200 }} />
              </div>
              <div className="mf-img-badge">
                Trusted Since 2008
                <span>Delhi NCR's #1 Fabricator</span>
              </div>
            </div>

            {/* Mobile image grid (shows on small screens) */}
            <div className="mf-mobile-img-grid">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGO198vroOjje1iwMuTj38hiCWA_qcRaQ1-Q&s" alt="Fabrication work" loading="lazy" />
              <img src="https://5.imimg.com/data5/SELLER/Default/2025/10/555289903/GW/NK/EB/105348235/truck-body-repairing-fabrication-500x500.png" alt="Welding" loading="lazy" />
              <img src="https://5.imimg.com/data5/SELLER/Default/2025/8/536038938/LB/MR/XE/18772814/mild-steel-industrial-fabrication.jpg" alt="Industrial shed" loading="lazy" />
              <img src="https://s.alicdn.com/@sc04/kf/H9504c585d9f545678b83bb9a227fc7acL/Sunnysky-Modern-Steel-Gate-Grill-Design-House-Latest-Main-Swing-Simple-Driveway-Wrought-Iron-Gate-Designs-Simple.jpg" alt="Gate" loading="lazy" />
            </div>
          </div>
        </section>

        {/* ══ TRUST BADGES ══ */}
        <section className="mf-trust-strip">
          <div className="mf-inner">
            <div className="mf-trust-grid">
              {trustBadges.map((b, i) => (
                <Reveal key={i} direction="scale" delay={i * 40}>
                  <div className="mf-trust-item">
                    <b.icon size={16} />
                    <span>{b.label}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FEATURES SECTION ══ */}
        <section className="mf-section-alt">
          <div className="mf-inner">
            <Reveal direction="up">
              <div style={{ textAlign: 'center' }}>
                <div className="mf-eyebrow"><span className="mf-eyebrow-dot" />Why Choose Us</div>
                <h2 className="mf-section-heading">Built on <span className="mf-accent-word">Trust</span> &amp; Precision</h2>
                <div className="mf-divider-line" style={{ margin: '16px auto 0' }} />
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
              <Reveal direction="left"><div><div className="mf-eyebrow"><span className="mf-eyebrow-dot" />What We Do</div><h2 className="mf-section-heading">Our <span className="mf-accent-word">Services</span></h2><div className="mf-divider-line" /></div></Reveal>
              <Reveal direction="right"><Link to="/services" className="mf-view-all">View All Services <ArrowRight size={14} /></Link></Reveal>
            </div>
            <div className="mf-svc-grid">
              {services.map((s, i) => (
                <Reveal key={i} direction="up" delay={i * 60}>
                  <div className="mf-svc-card">
                    <div className="mf-svc-img"><img src={s.image} alt={s.title} loading="lazy" /><span className="mf-svc-badge">{s.tag}</span></div>
                    <div className="mf-svc-body"><div className="mf-svc-title">{s.title}</div><p className="mf-svc-desc">{s.description}</p><div className="mf-svc-price">Starting from {s.price}</div><Link to="/services" className="mf-svc-link">Learn More <ArrowRight size={13} /></Link></div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PRICING SECTION ══ */}
        <section className="mf-section-alt">
          <div className="mf-inner">
            <Reveal direction="up"><div><div className="mf-eyebrow"><span className="mf-eyebrow-dot" />Estimated Pricing</div><h2 className="mf-section-heading">No Hidden <span className="mf-accent-word">Charges</span></h2><div className="mf-divider-line" /><p style={{ marginTop: 16, fontSize: 14, color: 'var(--muted)' }}>Send photo for exact quote – price based on design & material.</p></div></Reveal>
            <div className="mf-price-grid">
              <div className="mf-price-card"><div className="mf-price-name">Gate Work</div><div className="mf-price-range">₹250–₹600</div><div className="mf-price-unit">per sq ft</div><p className="mf-price-note">MS / SS gates, custom designs, rust-proof finish.</p></div>
              <div className="mf-price-card"><div className="mf-price-name">Shed Work</div><div className="mf-price-range">₹180–₹400</div><div className="mf-price-unit">per sq ft</div><p className="mf-price-note">Industrial sheds, warehouses, PEB structures.</p></div>
              <div className="mf-price-card"><div className="mf-price-name">Railings</div><div className="mf-price-range">₹300–₹800</div><div className="mf-price-unit">per sq ft</div><p className="mf-price-note">Balcony railings, stair railings, grills.</p></div>
            </div>
            <Reveal direction="up" delay={200}><div style={{ marginTop: 32, textAlign: 'center' }}><a href="https://wa.me/917838170214?text=Hi%2C%20send%20me%20photo%20for%20exact%20price" className="mf-btn-wa" target="_blank" rel="noreferrer"><MessageCircle size={16} /> Send Photo → Get Exact Price</a></div></Reveal>
          </div>
        </section>

        {/* ══ PROBLEM → SOLUTION ══ */}
        <section className="mf-section">
          <div className="mf-inner">
            <Reveal direction="up"><div style={{ textAlign: 'center' }}><div className="mf-eyebrow"><span className="mf-eyebrow-dot" />Why Choose Us</div><h2 className="mf-section-heading">Problems <span className="mf-accent-word">? We Solve It</span></h2><div className="mf-divider-line" style={{ margin: '16px auto 0' }} /></div></Reveal>
            <div className="mf-problem-solution">
              <div className="mf-ps-card"><div className="mf-ps-title"><XCircle size={24} color="#d32f2f" /> Facing These Problems?</div><div className="mf-ps-list"><div className="mf-ps-item cross"><XCircle size={18} /> High contractor charges</div><div className="mf-ps-item cross"><XCircle size={18} /> Weak welding / poor quality</div><div className="mf-ps-item cross"><XCircle size={18} /> Delay in work</div></div></div>
              <div className="mf-ps-card"><div className="mf-ps-title"><CheckCircle size={24} color="#e85d04" /> We Solve It</div><div className="mf-ps-list"><div className="mf-ps-item check"><CheckCircle size={18} /> Direct factory pricing</div><div className="mf-ps-item check"><CheckCircle size={18} /> Strong & durable material</div><div className="mf-ps-item check"><CheckCircle size={18} /> Fast and reliable work</div></div></div>
            </div>
          </div>
        </section>

        {/* ══ RECENT WORK PORTFOLIO ══ */}
        <section className="mf-section-alt">
          <div className="mf-inner">
            <Reveal direction="up"><div style={{ textAlign: 'center' }}><div className="mf-eyebrow"><span className="mf-eyebrow-dot" />Portfolio</div><h2 className="mf-section-heading">Our <span className="mf-accent-word">Recent Work</span></h2><div className="mf-divider-line" style={{ margin: '16px auto 0' }} /></div></Reveal>
            <div className="mf-recent-grid">
              <div className="mf-recent-card"><div className="mf-recent-img"><img src="https://image.made-in-china.com/2f0j00cktoYIVBHebP/Latest-House-Main-Gate-Grill-Designs-Garden-Door-Wrought-Iron-Gate.jpg" alt="Gate work" loading="lazy" /><div className="mf-before-badge">Gate: Installed</div></div><div className="mf-recent-info"><div className="mf-recent-title">Modern Gate Fabrication</div><div className="mf-recent-desc">Before: old iron gate → After: heavy-duty powder coated gate</div></div></div>
              <div className="mf-recent-card"><div className="mf-recent-img"><img src="https://internal-assets.jswonemsme.com/Industrialshedssteel3_1736772173760_9ee78666a4/Industrialshedssteel3_1736772173760_9ee78666a4.jpeg" alt="Shed" loading="lazy" /><div className="mf-before-badge">Shed: Completed</div></div><div className="mf-recent-info"><div className="mf-recent-title">Industrial Shed Work</div><div className="mf-recent-desc">25,000 sq ft shed – from raw steel to leakproof structure</div></div></div>
              <div className="mf-recent-card"><div className="mf-recent-img"><img src="https://img500.exportersindia.com/product_images/bc-500/2023/10/12642786/ss-balcony-grill-1697288793-7131662.jpeg" alt="Railing" loading="lazy" /><div className="mf-before-badge">Railing: Installed</div></div><div className="mf-recent-info"><div className="mf-recent-title">SS Glass Railing</div><div className="mf-recent-desc">Before: plain wall → After: modern SS railing + glass</div></div></div>
            </div>
          </div>
        </section>

        {/* ══ TESTIMONIALS ══ */}
        <section className="mf-section">
          <div className="mf-inner">
            <Reveal direction="up"><div style={{ textAlign: 'center' }}><div className="mf-eyebrow"><span className="mf-eyebrow-dot" />Customer Reviews</div><h2 className="mf-section-heading">What Our <span className="mf-accent-word">Clients</span> Say</h2><div className="mf-divider-line" style={{ margin: '16px auto 0' }} /></div></Reveal>
            <div className="mf-testi-grid">{testimonials.map((t, i) => (<Reveal key={i} direction="up" delay={i * 60}><div className="mf-testi-card"><StarRating count={t.stars} /><p className="mf-testi-quote">"{t.text}"</p><div className="mf-testi-author"><div className="mf-testi-avatar">{t.name.charAt(0)}</div><div><div className="mf-testi-name">{t.name}</div><div className="mf-testi-role">{t.role}</div></div></div></div></Reveal>))}</div>
          </div>
        </section>

        {/* ══ SERVICE AREAS (SEO) ══ */}
        <section className="mf-section-alt">
          <div className="mf-inner">
            <Reveal direction="left"><div><div className="mf-eyebrow"><span className="mf-eyebrow-dot" />Where We Work</div><h2 className="mf-section-heading">Service <span className="mf-accent-word">Areas</span></h2><div className="mf-divider-line" /></div></Reveal>
            <div className="mf-areas-grid">{serviceAreas.map((area, i) => (<Reveal key={i} direction="up" delay={i * 40}><div className="mf-area-item"><MapPin size={15} />{area}</div></Reveal>))}</div>
          </div>
        </section>

        {/* ══ URGENCY BANNER ══ */}
        <div className="mf-inner">
          <div className="mf-urgency">
            <div className="mf-urgency-text"><AlertTriangle size={18} /> ⚠️ Limited Work Slots Available This Week</div>
            <a href="https://wa.me/917838170214?text=Book%20my%20slot%20for%20fabrication" className="mf-urgency-btn" target="_blank" rel="noreferrer">Book Now →</a>
          </div>
        </div>

        {/* ══ BLOG PREVIEWS ══ */}
        <section className="mf-section" style={{ paddingTop: 0 }}>
          <div className="mf-inner">
            <div className="mf-svc-header"><Reveal direction="left"><div><div className="mf-eyebrow"><span className="mf-eyebrow-dot" />Insights</div><h2 className="mf-section-heading">Fabrication <span className="mf-accent-word">Blogs</span></h2><div className="mf-divider-line" /></div></Reveal><Reveal direction="right"><Link to="/blogs" className="mf-view-all">View All Blogs <ArrowRight size={14} /></Link></Reveal></div>
            <div className="mf-blog-grid">{blogsPreview.map((b, i) => (<Reveal key={i} direction="scale" delay={i * 60}><Link to={`/blogs/${i}`} className="mf-svc-card" style={{ textDecoration: 'none' }}><div className="mf-svc-img" style={{ height: 200 }}><img src={b.image} alt={b.title} loading="lazy" /><span className="mf-svc-badge">{b.tag}</span></div><div className="mf-svc-body"><div className="mf-svc-title" style={{ fontSize: 16 }}>{b.title}</div><p className="mf-svc-desc" style={{ fontSize: 12.5 }}>{b.desc}</p><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontSize: 11, color: 'var(--muted)' }}>{b.date}</span><span className="mf-svc-link" style={{ fontSize: 12 }}>Read More <ArrowRight size={11} /></span></div></div></Link></Reveal>))}</div>
          </div>
        </section>

        {/* ══ FINAL CTA (Mobile optimized) ══ */}
        <section className="mf-cta-section">
          <div className="mf-cta-inner">
            <Reveal direction="up"><h2 className="mf-cta-h2">Need Fabrication Work?</h2></Reveal>
            <Reveal direction="up" delay={80}><p className="mf-cta-sub">Get Instant Quote on WhatsApp or call us now. Strong steel, fair price, timely delivery.</p></Reveal>
            <Reveal direction="up" delay={160}><div className="mf-cta-btns"><a href="https://wa.me/917838170214?text=Hi%2C%20I%20need%20fabrication%20work" className="mf-cta-btn1" target="_blank" rel="noreferrer"><MessageCircle size={16} /> Get Instant Quote on WhatsApp</a><a href="tel:+917838170214" className="mf-cta-btn2"><Phone size={16} /> Call Now</a></div></Reveal>
          </div>
        </section>
      </div>
    </>
  );
}