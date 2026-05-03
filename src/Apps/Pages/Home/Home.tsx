import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle, Shield, Zap, Award, Clock, Users, Wrench, Phone, MessageCircle, Star, MapPin, ChevronRight, Play } from 'lucide-react';
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

const serviceAreas = ['Gurgaon', 'Manesar', 'Delhi NCR', 'Noida', 'Faridabad', 'Dwarka'];

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
function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
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
function Reveal({ children, className = '', direction = 'up', delay = 0 }) {
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
  const animMap = {
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

function AnimatedStat({ stat, inView }) {
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

function StarRating({ count }) {
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
}

.mf-root *, .mf-root *::before, .mf-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
.mf-root { font-family: 'Plus Jakarta Sans', sans-serif; color: var(--text); background: var(--white); overflow-x: hidden; }
.mf-root h1, .mf-root h2, .mf-root h3, .mf-root h4 { font-family: 'Syne', sans-serif; }

/* ── Scroll reveal ── */
.mf-reveal { opacity: 0; }
@keyframes mfUp    { from { opacity:0; transform:translateY(36px) } to { opacity:1; transform:none } }
@keyframes mfLeft  { from { opacity:0; transform:translateX(-36px) } to { opacity:1; transform:none } }
@keyframes mfRight { from { opacity:0; transform:translateX(36px) } to { opacity:1; transform:none } }
@keyframes mfScale { from { opacity:0; transform:scale(0.88) } to { opacity:1; transform:none } }
.mf-anim-up    { animation: mfUp    0.7s cubic-bezier(0.22,1,0.36,1) both }
.mf-anim-left  { animation: mfLeft  0.7s cubic-bezier(0.22,1,0.36,1) both }
.mf-anim-right { animation: mfRight 0.7s cubic-bezier(0.22,1,0.36,1) both }
.mf-anim-scale { animation: mfScale 0.6s cubic-bezier(0.22,1,0.36,1) both }

/* ── Floating WhatsApp ── */
@keyframes mfPulse { 0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,0.5)} 50%{box-shadow:0 0 0 10px rgba(37,211,102,0)} }
.mf-wa-float {
  position: fixed; bottom: 28px; right: 28px; z-index: 9999;
  width: 56px; height: 56px; border-radius: 50%;
  background: #25d366; display: flex; align-items: center; justify-content: center;
  text-decoration: none; animation: mfPulse 2.5s ease-in-out infinite;
  transition: transform 0.2s;
}
.mf-wa-float:hover { transform: scale(1.1); }
.mf-wa-float svg { color: white; }

/* ── Layout ── */
.mf-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
.mf-section { padding: 96px 0; }
.mf-section-alt { padding: 96px 0; background: var(--steel); }

/* ── Section heading ── */
.mf-eyebrow { display: inline-flex; align-items: center; gap: 7px; font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); margin-bottom: 14px; }
.mf-eyebrow-dot { width: 5px; height: 5px; background: var(--accent); border-radius: 50%; }
.mf-section-heading { font-size: clamp(28px, 3.5vw, 44px); font-weight: 800; color: var(--navy); line-height: 1.08; letter-spacing: -0.02em; }
.mf-accent-word { color: var(--accent); }
.mf-divider-line { width: 40px; height: 3px; background: var(--accent); border-radius: 2px; margin-top: 16px; }

/* ── Hero ── */
@keyframes mfHeroTitle { from{opacity:0;transform:translateY(44px)} to{opacity:1;transform:none} }
@keyframes mfHeroSub   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:none} }
@keyframes mfHeroImg   { from{opacity:0;transform:translateY(28px) scale(0.95)} to{opacity:1;transform:none} }
@keyframes mfBadgePop  { 0%{opacity:0;transform:scale(0.5)} 70%{transform:scale(1.1)} 100%{opacity:1;transform:scale(1)} }
@keyframes mfBarGrow   { from{transform:scaleY(0)} to{transform:scaleY(1)} }
@keyframes mfDotDrift  { 0%{background-position:0 0} 100%{background-position:28px 28px} }
@keyframes mfStripeIn  { from{clip-path:polygon(100% 0,100% 0,100% 100%,100% 100%)} to{clip-path:polygon(8% 0,100% 0,100% 100%,0 100%)} }

.mf-hero {
  position: relative; min-height: 100vh; background: var(--white);
  display: flex; align-items: center; overflow: hidden; padding-top: 72px;
}
.mf-hero-stripe {
  position: absolute; top: 0; right: 0; width: 50%; height: 100%;
  background: #f0f4fb;
  clip-path: polygon(8% 0,100% 0,100% 100%,0 100%);
  animation: mfStripeIn 0.9s cubic-bezier(0.77,0,0.175,1) 0.1s both;
}
.mf-hero-dots {
  position: absolute; top: 0; right: 0; width: 50%; height: 100%;
  background-image: radial-gradient(circle, #b8c8e8 1.2px, transparent 1.2px);
  background-size: 28px 28px; opacity: 0.5;
  clip-path: polygon(8% 0,100% 0,100% 100%,0 100%);
  animation: mfDotDrift 9s linear infinite;
}
.mf-hero-bar {
  position: absolute; left: 0; top: 0; width: 4px; height: 100%;
  background: linear-gradient(to bottom, var(--accent), #132d52);
  transform-origin: top; animation: mfBarGrow 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s both;
}
.mf-hero-inner {
  position: relative; z-index: 1;
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 56px; align-items: center;
  width: 100%; max-width: 1200px; margin: 0 auto; padding: 60px 24px;
}
.mf-hero-label {
  display: inline-flex; align-items: center; gap: 8px;
  background: #fff5ee; border: 1px solid #fcd4b0; color: var(--accent);
  font-size: 11px; font-weight: 600; letter-spacing: 0.09em; text-transform: uppercase;
  padding: 6px 14px; border-radius: 20px; margin-bottom: 24px;
  opacity: 0; animation: mfHeroSub 0.5s ease 0.3s forwards;
}
.mf-label-dot {
  width: 6px; height: 6px; background: var(--accent); border-radius: 50%;
  position: relative;
}
.mf-label-dot::after {
  content: ''; position: absolute; inset: -3px; border-radius: 50%;
  border: 1.5px solid var(--accent); opacity: 0;
  animation: mfPulse 1.6s ease-out 1s infinite;
}
.mf-hero-h1 {
  font-size: clamp(50px, 6vw, 82px); font-weight: 800;
  color: var(--navy); line-height: 0.95; letter-spacing: -0.03em;
  text-transform: uppercase; opacity: 0;
}
.mf-hero-h1.l1 { animation: mfHeroTitle 0.7s cubic-bezier(0.22,1,0.36,1) 0.45s forwards; }
.mf-hero-h1.l2 { animation: mfHeroTitle 0.7s cubic-bezier(0.22,1,0.36,1) 0.58s forwards; margin-bottom: 4px; }
.mf-hero-h1.l3 { animation: mfHeroTitle 0.7s cubic-bezier(0.22,1,0.36,1) 0.71s forwards; margin-bottom: 28px; }
.mf-stroke-text { color: transparent; -webkit-text-stroke: 2.5px var(--navy); }
.mf-hero-sub {
  font-size: 15px; color: var(--muted); line-height: 1.75; max-width: 440px; margin-bottom: 36px;
  opacity: 0; animation: mfHeroSub 0.65s ease 0.86s forwards;
}
.mf-hero-actions {
  display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 48px;
  opacity: 0; animation: mfHeroSub 0.65s ease 1.0s forwards;
}

/* Buttons */
.mf-btn-main {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--accent); color: #fff; padding: 14px 28px; border-radius: 8px;
  font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; font-size: 14px;
  text-decoration: none; transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  position: relative; overflow: hidden;
}
.mf-btn-main::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%);
  transform: translateX(-100%); transition: transform 0.55s;
}
.mf-btn-main:hover::after { transform: translateX(100%); }
.mf-btn-main:hover { background: var(--accent-2); transform: translateY(-3px); box-shadow: 0 12px 32px rgba(232,93,4,0.32); }

.mf-btn-outline {
  display: inline-flex; align-items: center; gap: 8px;
  border: 2px solid var(--navy); color: var(--navy); padding: 12px 24px; border-radius: 8px;
  font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; font-size: 14px;
  text-decoration: none; background: transparent;
  transition: background 0.2s, color 0.2s, transform 0.2s;
}
.mf-btn-outline:hover { background: var(--navy); color: #fff; transform: translateY(-3px); }

.mf-btn-ghost {
  display: inline-flex; align-items: center; gap: 8px;
  border: 1.5px solid rgba(0,0,0,0.14); color: var(--text); padding: 12px 22px; border-radius: 8px;
  font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; font-size: 14px;
  text-decoration: none; background: rgba(0,0,0,0.03);
  transition: background 0.2s, transform 0.2s;
}
.mf-btn-ghost:hover { background: rgba(0,0,0,0.07); transform: translateY(-3px); }

.mf-wa-btn {
  display: inline-flex; align-items: center; gap: 8px;
  background: #25d366; color: #fff; padding: 14px 28px; border-radius: 8px;
  font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; font-size: 14px;
  text-decoration: none; transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
}
.mf-wa-btn:hover { background: #1da851; transform: translateY(-3px); box-shadow: 0 10px 28px rgba(37,211,102,0.32); }

/* Stats */
.mf-stats-bar {
  display: grid; grid-template-columns: repeat(4, 1fr);
  border: 1px solid var(--border); border-radius: 12px; overflow: hidden;
  background: var(--white); box-shadow: 0 2px 20px rgba(11,24,41,0.06);
  opacity: 0; animation: mfHeroSub 0.65s ease 1.14s forwards;
}
.mf-stat-item {
  padding: 20px 12px; text-align: center; border-right: 1px solid var(--border);
  transition: background 0.25s;
}
.mf-stat-item:last-child { border-right: none; }
.mf-stat-item:hover { background: #fff8f3; }
.mf-stat-icon-wrap { display: flex; justify-content: center; margin-bottom: 6px; color: var(--accent); }
.mf-stat-num { font-family: 'Syne', sans-serif; font-size: 30px; font-weight: 800; color: var(--navy); line-height: 1; }
.mf-stat-label { font-size: 10px; color: var(--muted); margin-top: 4px; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; }

/* Image grid */
.mf-img-grid { position: relative; display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.mf-img-col { display: flex; flex-direction: column; gap: 14px; }
.mf-img-col:nth-child(2) { margin-top: 40px; }
.mf-img-grid img {
  width: 100%; border-radius: 12px; object-fit: cover; display: block;
  box-shadow: 0 8px 32px rgba(11,24,41,0.14);
  transition: transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s;
  opacity: 0;
}
.mf-img-col:nth-child(1) img:nth-child(1) { animation: mfHeroImg 0.7s ease 0.5s forwards; }
.mf-img-col:nth-child(1) img:nth-child(2) { animation: mfHeroImg 0.7s ease 0.7s forwards; }
.mf-img-col:nth-child(2) img:nth-child(1) { animation: mfHeroImg 0.7s ease 0.6s forwards; }
.mf-img-col:nth-child(2) img:nth-child(2) { animation: mfHeroImg 0.7s ease 0.8s forwards; }
.mf-img-grid img:hover { transform: scale(1.05) translateY(-4px); box-shadow: 0 20px 48px rgba(11,24,41,0.2); }
.mf-img-badge {
  position: absolute; bottom: 20px; left: -14px;
  background: var(--accent); color: #fff; padding: 12px 18px; border-radius: 8px;
  font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700;
  letter-spacing: 0.03em; box-shadow: 0 8px 24px rgba(232,93,4,0.3); z-index: 2;
  animation: mfBadgePop 0.6s cubic-bezier(0.34,1.56,0.64,1) 1.1s both;
}
.mf-img-badge span { display: block; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 10px; font-weight: 400; opacity: 0.85; margin-top: 2px; }

/* ── Features ── */
.mf-feat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 52px; }
.mf-feat-card {
  background: var(--white); border: 1px solid var(--border); border-radius: 14px;
  padding: 32px 24px; position: relative; overflow: hidden;
  transition: box-shadow 0.3s, transform 0.3s, border-color 0.3s;
}
.mf-feat-card::before {
  content: ''; position: absolute; top: 0; left: 0; width: 3px; height: 100%;
  background: var(--accent); transform: scaleY(0); transform-origin: top;
  transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
}
.mf-feat-card:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(11,24,41,0.1); border-color: transparent; }
.mf-feat-card:hover::before { transform: scaleY(1); }
.mf-feat-ico {
  width: 50px; height: 50px; background: #e8f0fd; border-radius: 12px;
  display: flex; align-items: center; justify-content: center; margin-bottom: 18px;
  transition: background 0.3s, transform 0.3s;
}
.mf-feat-card:hover .mf-feat-ico { background: var(--accent); transform: rotate(-5deg) scale(1.1); }
.mf-feat-ico svg { width: 20px; height: 20px; color: var(--blue); transition: color 0.3s; }
.mf-feat-card:hover .mf-feat-ico svg { color: #fff; }
.mf-feat-title { font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 700; color: var(--navy); margin-bottom: 8px; }
.mf-feat-desc { font-size: 13px; color: var(--muted); line-height: 1.65; }

/* ── Services ── */
.mf-svc-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 44px; }
.mf-view-all { display: inline-flex; align-items: center; gap: 6px; color: var(--blue); font-weight: 600; font-size: 13px; text-decoration: none; transition: gap 0.2s, color 0.2s; }
.mf-view-all:hover { gap: 10px; color: var(--accent); }
.mf-svc-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.mf-svc-card {
  background: var(--white); border: 1px solid var(--border); border-radius: 14px;
  overflow: hidden; transition: box-shadow 0.35s, transform 0.35s, border-color 0.3s;
  display: flex; flex-direction: column;
}
.mf-svc-card:hover { box-shadow: 0 22px 56px rgba(11,24,41,0.12); transform: translateY(-7px); border-color: transparent; }
.mf-svc-img { position: relative; height: 190px; overflow: hidden; }
.mf-svc-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s cubic-bezier(0.22,1,0.36,1); }
.mf-svc-card:hover .mf-svc-img img { transform: scale(1.08); }
.mf-svc-img::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 3px; background: var(--accent); transition: width 0.4s ease; }
.mf-svc-card:hover .mf-svc-img::after { width: 100%; }
.mf-svc-badge { position: absolute; top: 10px; left: 10px; background: var(--accent); color: #fff; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 4px 8px; border-radius: 5px; }
.mf-svc-body { padding: 22px; flex: 1; display: flex; flex-direction: column; }
.mf-svc-title { font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 700; color: var(--navy); margin-bottom: 6px; }
.mf-svc-desc { font-size: 13px; color: var(--muted); line-height: 1.6; flex: 1; margin-bottom: 14px; }
.mf-svc-price { font-size: 12px; font-weight: 600; color: var(--accent); margin-bottom: 14px; }
.mf-svc-link { display: inline-flex; align-items: center; gap: 5px; color: var(--accent); font-size: 13px; font-weight: 600; text-decoration: none; transition: gap 0.2s; }
.mf-svc-link:hover { gap: 9px; }

/* ── Price section ── */
.mf-price-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 48px; }
.mf-price-card {
  background: var(--white); border: 1.5px solid var(--border); border-radius: 14px;
  padding: 28px 24px; transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
}
.mf-price-card:hover { border-color: var(--accent); box-shadow: 0 12px 36px rgba(232,93,4,0.1); transform: translateY(-4px); }
.mf-price-name { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; color: var(--navy); margin-bottom: 6px; }
.mf-price-range { font-size: 24px; font-weight: 700; color: var(--accent); margin-bottom: 4px; }
.mf-price-unit { font-size: 12px; color: var(--muted); margin-bottom: 16px; }
.mf-price-note { font-size: 12.5px; color: var(--muted); line-height: 1.6; }

/* ── Testimonials ── */
.mf-testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 48px; }
.mf-testi-card {
  background: var(--white); border: 1px solid var(--border); border-radius: 14px;
  padding: 28px; transition: box-shadow 0.3s, transform 0.3s;
}
.mf-testi-card:hover { box-shadow: 0 16px 44px rgba(11,24,41,0.09); transform: translateY(-4px); }
.mf-testi-quote { font-size: 13.5px; color: var(--muted); line-height: 1.7; margin-bottom: 20px; font-style: italic; }
.mf-testi-author { display: flex; align-items: center; gap: 12px; }
.mf-testi-avatar { width: 40px; height: 40px; border-radius: 50%; background: #e8f0fd; display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; color: var(--blue); flex-shrink: 0; }
.mf-testi-name { font-size: 14px; font-weight: 600; color: var(--navy); }
.mf-testi-role { font-size: 11.5px; color: var(--muted); margin-top: 2px; }

/* ── Areas ── */
.mf-areas-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 40px; }
.mf-area-item {
  display: flex; align-items: center; gap: 10px; padding: 16px 18px;
  background: var(--white); border: 1px solid var(--border); border-radius: 10px;
  font-size: 14px; font-weight: 600; color: var(--navy);
  transition: border-color 0.2s, background 0.2s, transform 0.2s;
}
.mf-area-item:hover { border-color: var(--accent); background: #fff8f3; transform: translateY(-2px); }
.mf-area-item svg { color: var(--accent); flex-shrink: 0; }

/* ── CTA ── */
.mf-cta-section {
  background: var(--navy); padding: 96px 0; position: relative; overflow: hidden;
}
.mf-cta-lines {
  position: absolute; inset: 0;
  background-image: repeating-linear-gradient(-45deg, transparent, transparent 38px, rgba(255,255,255,0.015) 38px, rgba(255,255,255,0.015) 39px);
}
.mf-cta-accent {
  position: absolute; right: -100px; top: -100px; width: 400px; height: 400px;
  border-radius: 50%; background: radial-gradient(circle, rgba(232,93,4,0.16), transparent 70%);
}
.mf-cta-accent2 {
  position: absolute; left: -80px; bottom: -80px; width: 300px; height: 300px;
  border-radius: 50%; background: radial-gradient(circle, rgba(26,58,107,0.35), transparent 70%);
}
.mf-cta-inner { position: relative; z-index: 1; text-align: center; max-width: 760px; margin: 0 auto; padding: 0 24px; }
.mf-cta-h2 { font-family: 'Syne', sans-serif; font-size: clamp(34px, 5vw, 60px); font-weight: 800; color: #fff; text-transform: uppercase; line-height: 1.05; margin-bottom: 16px; letter-spacing: -0.02em; }
.mf-cta-sub { color: rgba(255,255,255,0.55); font-size: 15px; line-height: 1.7; margin-bottom: 38px; max-width: 520px; margin-left: auto; margin-right: auto; }
.mf-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
.mf-cta-btn1 {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--accent); color: #fff; padding: 15px 32px; border-radius: 8px;
  font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; font-size: 14px;
  text-decoration: none; transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
}
.mf-cta-btn1:hover { background: var(--accent-2); transform: translateY(-3px); box-shadow: 0 12px 30px rgba(232,93,4,0.36); }
.mf-cta-btn2 {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(255,255,255,0.09); border: 1px solid rgba(255,255,255,0.22);
  color: #fff; padding: 15px 32px; border-radius: 8px;
  font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; font-size: 14px;
  text-decoration: none; transition: background 0.2s, transform 0.2s;
}
.mf-cta-btn2:hover { background: rgba(255,255,255,0.16); transform: translateY(-3px); }

/* ── Trust ── */
.mf-trust-strip { padding: 40px 0; background: var(--white); border-top: 1px solid var(--border); }
.mf-trust-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.mf-trust-item {
  display: flex; align-items: center; gap: 10px; padding: 16px 18px;
  border: 1px solid var(--border); border-radius: 10px; background: var(--steel);
  transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s, background 0.25s;
}
.mf-trust-item:hover { border-color: var(--accent); transform: translateY(-3px); box-shadow: 0 8px 24px rgba(232,93,4,0.1); background: #fff8f3; }
.mf-trust-item svg { color: var(--accent); flex-shrink: 0; transition: transform 0.3s; }
.mf-trust-item:hover svg { transform: scale(1.25) rotate(8deg); }
.mf-trust-item span { font-size: 13px; font-weight: 600; color: var(--navy); }

/* ── Blog ── */
.mf-blog-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 0; }

/* ── Responsive ── */
@media (max-width: 1024px) {
  .mf-feat-grid { grid-template-columns: repeat(2, 1fr); }
  .mf-svc-grid { grid-template-columns: repeat(2, 1fr); }
  .mf-price-grid { grid-template-columns: repeat(3, 1fr); }
  .mf-testi-grid { grid-template-columns: 1fr 1fr; }
  .mf-trust-grid { grid-template-columns: repeat(2, 1fr); }
  .mf-blog-grid { grid-template-columns: repeat(2, 1fr); }
  .mf-areas-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .mf-hero-inner { grid-template-columns: 1fr; gap: 40px; padding: 40px 20px 56px; }
  .mf-img-grid { display: none; }
  .mf-stats-bar { grid-template-columns: repeat(2, 1fr); }
  .mf-stat-item:nth-child(2) { border-right: none; }
  .mf-stat-item:nth-child(3), .mf-stat-item:nth-child(4) { border-top: 1px solid var(--border); }
  .mf-stat-item:nth-child(4) { border-right: none; }
  .mf-feat-grid, .mf-svc-grid, .mf-testi-grid, .mf-blog-grid { grid-template-columns: 1fr; }
  .mf-price-grid { grid-template-columns: 1fr; }
  .mf-svc-header { flex-direction: column; align-items: flex-start; gap: 10px; }
  .mf-section, .mf-section-alt { padding: 60px 0; }
  .mf-trust-grid { grid-template-columns: 1fr 1fr; }
  .mf-areas-grid { grid-template-columns: 1fr; }
}
@media (max-width: 480px) {
  .mf-trust-grid { grid-template-columns: 1fr; }
  .mf-hero-h1 { font-size: 42px; }
  .mf-cta-h2 { font-size: 34px; }
  .mf-price-grid { grid-template-columns: 1fr; }
}
`;

/* ─── MAIN EXPORT ─── */
export default function Home() {
  return (
    <>
      <style>{CSS}</style>
      <div className="mf-root">

        {/* Floating WhatsApp */}
        <a href="https://wa.me/917838170214?text=Hi%2C%20I%20need%20a%20fabrication%20quote" className="mf-wa-float" target="_blank" rel="noreferrer" aria-label="WhatsApp">
          <MessageCircle size={26} />
        </a>

        {/* ══ HERO ══ */}
        <section className="mf-hero">
          <div className="mf-hero-bar" />
          <div className="mf-hero-stripe" />
          <div className="mf-hero-dots" />
          <div className="mf-hero-inner">

            {/* Left */}
            <div>
              <div className="mf-hero-label">
                <span className="mf-label-dot" />
                Best Fabrication in Gurgaon
              </div>

              <h1 className="mf-hero-h1 l1">Precision</h1>
              <h1 className="mf-hero-h1 l2">
                <span style={{ color: 'var(--blue)' }}>Metal</span>{' '}
                <span className="mf-stroke-text">Work</span>
              </h1>
              <h1 className="mf-hero-h1 l3">&amp; Welding</h1>

              <p className="mf-hero-sub">
                Malik Fabrication — Gurgaon's trusted partner for gates, sheds, railings,
                industrial structures & custom steel work. Direct from fabricator, no middlemen.
              </p>

              <div className="mf-hero-actions">
                <a href="https://wa.me/917838170214?text=Hi%2C%20I%20need%20a%20fabrication%20quote" className="mf-wa-btn" target="_blank" rel="noreferrer">
                  <MessageCircle size={16} /> WhatsApp Quote
                </a>
                <Link to="/services" className="mf-btn-outline">
                  Our Services <ChevronRight size={16} />
                </Link>
                <a href="tel:+917838170214" className="mf-btn-ghost">
                  <Phone size={16} /> +91 78381 70214
                </a>
              </div>

              <StatsBar />
            </div>

            {/* Right — image grid */}
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
                <span>Gurgaon's #1 Fabricator</span>
              </div>
            </div>

          </div>
        </section>

        {/* ══ TRUST STRIP ══ */}
        <section className="mf-trust-strip">
          <div className="mf-inner">
            <div className="mf-trust-grid">
              {trustBadges.map((b, i) => (
                <Reveal key={i} direction="left" delay={i * 60}>
                  <div className="mf-trust-item">
                    <b.icon size={17} />
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
                <div className="mf-divider-line" style={{ margin: '16px auto 0' }} />
              </div>
            </Reveal>
            <div className="mf-feat-grid">
              {features.map((f, i) => (
                <Reveal key={i} direction="up" delay={i * 80}>
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
                <Link to="/services" className="mf-view-all">View All Services <ArrowRight size={14} /></Link>
              </Reveal>
            </div>
            <div className="mf-svc-grid">
              {services.map((s, i) => (
                <Reveal key={i} direction="up" delay={i * 80}>
                  <div className="mf-svc-card">
                    <div className="mf-svc-img">
                      <img src={s.image} alt={s.title} />
                      <span className="mf-svc-badge">{s.tag}</span>
                    </div>
                    <div className="mf-svc-body">
                      <div className="mf-svc-title">{s.title}</div>
                      <p className="mf-svc-desc">{s.description}</p>
                      <div className="mf-svc-price">Starting from {s.price}</div>
                      <Link to="/services" className="mf-svc-link">Learn More <ArrowRight size={13} /></Link>
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
                <div className="mf-eyebrow"><span className="mf-eyebrow-dot" />Transparent Pricing</div>
                <h2 className="mf-section-heading">No Hidden <span className="mf-accent-word">Charges</span></h2>
                <div className="mf-divider-line" />
                <p style={{ marginTop: 16, fontSize: 14, color: 'var(--muted)', maxWidth: 500 }}>Send your photo &amp; requirements on WhatsApp — get exact price in 5 minutes.</p>
              </div>
            </Reveal>
            <div className="mf-price-grid">
              {[
                { name: 'Gate Fabrication', range: '₹250–₹600', unit: 'per sq ft', note: 'MS / SS / Iron gates. Custom design available. Rust-resistant finish.' },
                { name: 'Industrial Shed', range: '₹180–₹400', unit: 'per sq ft', note: 'Factory, warehouse & company sheds. Leak-proof & durable structure.' },
                { name: 'Railings & Grills', range: '₹300–₹800', unit: 'per sq ft', note: 'Balcony railings, window grills. Modern & classic designs available.' },
              ].map((p, i) => (
                <Reveal key={i} direction="up" delay={i * 80}>
                  <div className="mf-price-card">
                    <div className="mf-price-name">{p.name}</div>
                    <div className="mf-price-range">{p.range}</div>
                    <div className="mf-price-unit">{p.unit} · Final price on design & material</div>
                    <p className="mf-price-note">{p.note}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal direction="up" delay={240}>
              <div style={{ marginTop: 32, textAlign: 'center' }}>
                <a href="https://wa.me/917838170214?text=Hi%2C%20send%20me%20photo%20for%20exact%20price" className="mf-wa-btn" target="_blank" rel="noreferrer">
                  <MessageCircle size={16} /> Send Photo → Get Exact Price
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ TESTIMONIALS ══ */}
        <section className="mf-section">
          <div className="mf-inner">
            <Reveal direction="up">
              <div style={{ textAlign: 'center' }}>
                <div className="mf-eyebrow"><span className="mf-eyebrow-dot" />Customer Reviews</div>
                <h2 className="mf-section-heading">What Our <span className="mf-accent-word">Clients</span> Say</h2>
                <div className="mf-divider-line" style={{ margin: '16px auto 0' }} />
              </div>
            </Reveal>
            <div className="mf-testi-grid">
              {testimonials.map((t, i) => (
                <Reveal key={i} direction="up" delay={i * 80}>
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
                <Reveal key={i} direction="up" delay={i * 60}>
                  <div className="mf-area-item">
                    <MapPin size={16} />
                    {area}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ BLOGS ══ */}
        <section className="mf-section">
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
                <Link to="/blogs" className="mf-view-all">View All Blogs <ArrowRight size={14} /></Link>
              </Reveal>
            </div>
            <div className="mf-blog-grid">
              {blogsPreview.map((b, i) => (
                <Reveal key={i} direction="scale" delay={i * 70}>
                  <Link to={`/blogs/${i}`} className="mf-svc-card" style={{ textDecoration: 'none' }}>
                    <div className="mf-svc-img" style={{ height: 210 }}>
                      <img src={b.image} alt={b.title} />
                      <span className="mf-svc-badge">{b.tag}</span>
                    </div>
                    <div className="mf-svc-body">
                      <div className="mf-svc-title" style={{ fontSize: 16 }}>{b.title}</div>
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

        {/* ══ CTA ══ */}
        <section className="mf-cta-section">
          <div className="mf-cta-lines" />
          <div className="mf-cta-accent" />
          <div className="mf-cta-accent2" />
          <div className="mf-cta-inner">
            <Reveal direction="up">
              <h2 className="mf-cta-h2">Ready to Start<br />Your Project?</h2>
            </Reveal>
            <Reveal direction="up" delay={100}>
              <p className="mf-cta-sub">
                Send your requirement on WhatsApp and get the best price in 5 minutes.
                Strong material · Proper finishing · Fast delivery.
              </p>
            </Reveal>
            <Reveal direction="up" delay={200}>
              <div className="mf-cta-btns">
                <a href="https://wa.me/917838170214?text=Hi%2C%20I%20need%20fabrication%20work" className="mf-cta-btn1" target="_blank" rel="noreferrer">
                  <MessageCircle size={16} /> WhatsApp Now
                </a>
                <a href="tel:+917838170214" className="mf-cta-btn2">
                  <Phone size={16} /> +91 78381 70214
                </a>
              </div>
            </Reveal>
          </div>
        </section>

      </div>
    </>
  );
}