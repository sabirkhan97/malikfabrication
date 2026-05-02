import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ShoppingCart, X, Plus, Minus, Trash2, CheckCircle, Phone, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  tag: string;
  description: string;
  startingPrice: string;
  unit: string;
  features: string[];
}

interface CartItem extends Product {
  qty: number;
  note: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Custom Steel Gates',
    image: 'https://www.mrmtech.in/wp-content/uploads/2022/12/WPC-Stainless-Steel-Gates-1.jpeg',
    category: 'Gates & Entrances',
    tag: 'Popular',
    description: 'Heavy-duty custom steel gates for homes, factories, and commercial spaces. Available in sliding or swing configurations with powder-coated finish.',
    startingPrice: '₹39,500',
    unit: 'per unit',
    features: ['Powder-coated', 'Rust-resistant', 'Custom sizing', 'Sliding or swing'],
  },
  {
    id: 2,
    name: 'Rolling Shutters',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGO198vroOjje1iwMuTj38hiCWA_qcRaQ1-Q&s',
    category: 'Security',
    tag: 'Bestseller',
    description: 'Industrial-grade rolling shutters for shops, warehouses, and garages. Manual or motorised options with galvanised steel slats.',
    startingPrice: '₹18,000',
    unit: 'per unit',
    features: ['Manual & motorised', 'Galvanised steel', 'Weather-resistant', 'Low maintenance'],
  },
  {
    id: 3,
    name: 'Industrial Steel Sheds',
    image: 'https://t4.ftcdn.net/jpg/10/01/49/33/360_F_1001493386_3dlUaVAqCcjJusmsjwyzPbB9KGqnh7Ey.jpg',
    category: 'Structures',
    tag: 'Structural',
    description: 'Pre-engineered or custom-built steel sheds for factories, parking lots, and storage. Fast installation with long-lasting structural integrity.',
    startingPrice: 'Price on Request',
    unit: '',
    features: ['Custom span & height', 'Pre-engineered option', 'Fast erection', 'Corrosion-proof'],
  },
  {
    id: 4,
    name: 'Security Grills',
    image: 'https://5.imimg.com/data5/FF/QK/MY-36936508/window-safety-grills-500x500.jpg',
    category: 'Security',
    tag: 'Custom',
    description: 'Window and door security grills in various patterns — flat bar, twisted, or designer. MS or SS options available.',
    startingPrice: '₹550',
    unit: 'per sq. ft.',
    features: ['MS & SS available', 'Custom patterns', 'Powder-coated', 'Window & door fit'],
  },
  {
    id: 5,
    name: 'Steel Railings',
    image: 'https://newzelindustries.com/wp-content/uploads/2022/12/steel-in-railings.png',
    category: 'Railings',
    tag: 'Certified',
    description: 'Staircase, balcony, and terrace railings crafted with precision. MS, SS, or mixed-material options with modern or classic profiles.',
    startingPrice: '₹450',
    unit: 'per linear ft.',
    features: ['Staircase & balcony', 'MS / SS / Mixed', 'Modern & classic', 'Site measurement'],
  },
  {
    id: 6,
    name: 'Custom Fabrication',
    image: 'https://static.rivexa.com/_next/static/media/Fabrication.7e047f33.webp',
    category: 'Custom Work',
    tag: 'Custom',
    description: 'Got a unique requirement? Our workshop handles one-off structural, architectural, or industrial fabrication from concept to installation.',
    startingPrice: 'Price on Request',
    unit: '',
    features: ['Blueprint-based', 'Structural & architectural', 'On-site install', 'All materials'],
  },
];

const CATEGORIES = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

// ─── CSS (mirrors Home.tsx variables, animations, patterns exactly) ───────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=DM+Sans:ital,wght@0,400;0,500;0,600&display=swap');

  :root {
    --navy:        #0f1f3d;
    --blue:        #1a3a6b;
    --accent:      #e85d04;
    --accent-light:#ff7b2c;
    --steel:       #f4f6fa;
    --border:      #dde3ef;
    --text:        #1a1f2e;
    --muted:       #6b7280;
    --white:       #ffffff;
  }

  .sh-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .sh-root { font-family: 'DM Sans', sans-serif; color: var(--text); background: var(--white); }
  .sh-root h1, .sh-root h2, .sh-root h3 { font-family: 'Barlow Condensed', sans-serif; }

  /* ── Keyframes (same easing as Home) ── */
  @keyframes sh-slide-up    { from { opacity:0; transform:translateY(36px); } to { opacity:1; transform:translateY(0); } }
  @keyframes sh-bar-grow    { from { transform:scaleX(0); } to { transform:scaleX(1); } }
  @keyframes sh-bar-vert    { from { transform:scaleY(0); } to { transform:scaleY(1); } }
  @keyframes sh-stripe-in   { from { clip-path:polygon(100% 0,100% 0,100% 100%,100% 100%); } to { clip-path:polygon(9% 0,100% 0,100% 100%,0% 100%); } }
  @keyframes sh-fade-up     { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
  @keyframes sh-scale-in    { from { opacity:0; transform:scale(0.9); } to { opacity:1; transform:scale(1); } }
  @keyframes sh-slide-left  { from { opacity:0; transform:translateX(32px); } to { opacity:1; transform:translateX(0); } }
  @keyframes sh-slide-right { from { opacity:0; transform:translateX(-32px); } to { opacity:1; transform:translateX(0); } }
  @keyframes sh-dots-drift  { 0% { background-position:0 0; } 100% { background-position:26px 26px; } }
  @keyframes sh-glow-drift  { 0%,100% { transform:translate(0,0) scale(1); } 50% { transform:translate(-20px,15px) scale(1.08); } }
  @keyframes sh-shimmer     { from { background-position:200% center; } to { background-position:-200% center; } }
  @keyframes sh-eyebrow-in  { from { opacity:0; transform:translateX(-14px); } to { opacity:1; transform:translateX(0); } }
  @keyframes sh-pulse-ring  { 0% { transform:scale(1); opacity:.6; } 100% { transform:scale(1.6); opacity:0; } }
  @keyframes sh-drawer-in   { from { transform:translateX(100%); } to { transform:translateX(0); } }
  @keyframes sh-backdrop-in { from { opacity:0; } to { opacity:1; } }
  @keyframes sh-toast-up    { from { opacity:0; transform:translateX(-50%) translateY(16px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }
  @keyframes sh-img-reveal  { from { opacity:0; transform:translateY(24px) scale(0.96); } to { opacity:1; transform:translateY(0) scale(1); } }

  /* ══ HERO (identical structure to Home) ══ */
  .sh-hero {
    position:relative; min-height:12vh; background:var(--white);
    display:flex; align-items:center; overflow:hidden; padding-top:80px;
  }
  .sh-hero-stripe {
    position:absolute; top:0; right:0; width:50%; height:100%;
    background:var(--steel);
    clip-path:polygon(9% 0,100% 0,100% 100%,0% 100%);
    animation:sh-stripe-in 0.9s cubic-bezier(0.77,0,0.175,1) 0.1s both;
  }
  .sh-hero-dots {
    position:absolute; top:0; right:0; width:50%; height:100%;
    background-image:radial-gradient(circle,#c0cde8 1px,transparent 1px);
    background-size:26px 26px; opacity:0.45;
    clip-path:polygon(9% 0,100% 0,100% 100%,0% 100%);
    animation:sh-dots-drift 8s linear infinite;
  }
  .sh-hero-bar {
    position:absolute; left:0; top:0; width:5px; height:100%;
    background:linear-gradient(to bottom,var(--accent),var(--blue));
    transform-origin:top;
    animation:sh-bar-vert 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s both;
  }
  .sh-hero-inner {
    position:relative; z-index:1; max-width:1200px; margin:0 auto;
    padding:60px 24px; display:grid; grid-template-columns:1fr 1fr;
    gap:60px; align-items:center; width:100%;
  }

  .sh-eyebrow {
    display:inline-flex; align-items:center; gap:8px;
    background:#fff8f4; border:1px solid #fdd0b0;
    color:var(--accent); font-size:11px; font-weight:600;
    letter-spacing:0.08em; text-transform:uppercase;
    padding:6px 14px; border-radius:4px; margin-bottom:22px;
    opacity:0; animation:sh-eyebrow-in 0.55s ease 0.35s forwards;
  }
  .sh-eyebrow-dot {
    width:6px; height:6px; background:var(--accent); border-radius:50%; position:relative;
  }
  .sh-eyebrow-dot::after {
    content:''; position:absolute; inset:-4px; border-radius:50%;
    border:2px solid var(--accent); opacity:0;
    animation:sh-pulse-ring 1.4s ease-out 1.2s infinite;
  }

  .sh-hero-title {
    font-size:clamp(46px,5.5vw,76px); font-weight:800; line-height:1.0;
    color:var(--navy); letter-spacing:-0.01em; text-transform:uppercase; opacity:0;
  }
  .sh-hero-title.t1 { animation:sh-slide-up 0.65s cubic-bezier(0.22,1,0.36,1) 0.5s  forwards; }
  .sh-hero-title.t2 { animation:sh-slide-up 0.65s cubic-bezier(0.22,1,0.36,1) 0.62s forwards; }
  .sh-hero-title.t3 { animation:sh-slide-up 0.65s cubic-bezier(0.22,1,0.36,1) 0.74s forwards; margin-bottom:18px; }

  .sh-title-solid   { color:var(--blue); }
  .sh-title-outline {
    color:transparent; -webkit-text-stroke:2.5px var(--navy);
    background:linear-gradient(90deg,transparent 0%,rgba(232,93,4,.18) 50%,transparent 100%);
    background-size:200% auto; -webkit-background-clip:text;
    animation:sh-shimmer 3.5s linear 1.5s infinite;
  }

  .sh-hero-sub {
    font-size:15px; color:var(--muted); line-height:1.7; max-width:460px; margin-bottom:32px;
    opacity:0; animation:sh-fade-up 0.6s ease 0.88s forwards;
  }
  .sh-hero-actions {
    display:flex; gap:12px; flex-wrap:wrap;
    opacity:0; animation:sh-fade-up 0.6s ease 1s forwards;
  }

  /* Hero image grid */
  .sh-img-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; position:relative; }
  .sh-img-col  { display:flex; flex-direction:column; gap:14px; }
  .sh-img-col:nth-child(2) { margin-top:36px; }
  .sh-img-grid img {
    width:100%; border-radius:10px; object-fit:cover; display:block;
    box-shadow:0 8px 32px rgba(15,31,61,.12);
    transition:transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s;
    opacity:0;
  }
  .sh-img-col:nth-child(1) img:nth-child(1) { animation:sh-img-reveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.55s forwards; }
  .sh-img-col:nth-child(1) img:nth-child(2) { animation:sh-img-reveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.75s forwards; }
  .sh-img-col:nth-child(2) img:nth-child(1) { animation:sh-img-reveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.65s forwards; }
  .sh-img-col:nth-child(2) img:nth-child(2) { animation:sh-img-reveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.85s forwards; }
  .sh-img-grid img:hover { transform:scale(1.05) translateY(-4px); box-shadow:0 20px 48px rgba(15,31,61,.2); }
  .sh-img-badge {
    position:absolute; bottom:16px; left:-16px;
    background:var(--accent); color:white; padding:11px 16px; border-radius:7px;
    font-family:'Barlow Condensed',sans-serif; font-size:14px; font-weight:700;
    letter-spacing:0.04em; box-shadow:0 8px 24px rgba(232,93,4,.3); z-index:2;
  }

  /* ── Buttons (identical to Home) ── */
  .sh-btn-primary {
    display:inline-flex; align-items:center; gap:8px;
    background:var(--accent); color:#fff;
    padding:13px 26px; border-radius:6px; border:none; cursor:pointer;
    font-weight:600; font-size:14.5px; font-family:'DM Sans',sans-serif;
    position:relative; overflow:hidden;
    transition:background .22s, transform .22s, box-shadow .22s;
  }
  .sh-btn-primary::after { content:''; position:absolute; inset:0; background:linear-gradient(120deg,transparent 30%,rgba(255,255,255,.22) 50%,transparent 70%); transform:translateX(-100%); transition:transform .5s ease; }
  .sh-btn-primary:hover::after { transform:translateX(100%); }
  .sh-btn-primary:hover { background:var(--accent-light); transform:translateY(-3px); box-shadow:0 10px 28px rgba(232,93,4,.35); }

  .sh-btn-secondary {
    display:inline-flex; align-items:center; gap:8px;
    border:2px solid var(--navy); color:var(--navy);
    padding:13px 26px; border-radius:6px; background:transparent; cursor:pointer;
    font-weight:600; font-size:14.5px; font-family:'DM Sans',sans-serif;
    text-decoration:none;
    transition:background .22s, color .22s, transform .22s;
  }
  .sh-btn-secondary:hover { background:var(--navy); color:#fff; transform:translateY(-3px); }

  /* ── Scroll reveal ── */
  .sh-reveal { opacity:0; }
  .sh-reveal.is-visible.dir-up    { animation:sh-fade-up    0.65s cubic-bezier(0.22,1,0.36,1) both; }
  .sh-reveal.is-visible.dir-left  { animation:sh-slide-right 0.65s cubic-bezier(0.22,1,0.36,1) both; }
  .sh-reveal.is-visible.dir-right { animation:sh-slide-left  0.65s cubic-bezier(0.22,1,0.36,1) both; }
  .sh-reveal.is-visible.dir-scale { animation:sh-scale-in   0.6s  cubic-bezier(0.22,1,0.36,1) both; }

  /* ── Section structure ── */
  .sh-section       { padding:92px 0; }
  .sh-section-steel { background:var(--steel); }
  .sh-section-inner { max-width:1200px; margin:0 auto; padding:0 24px; }
  .sh-tag           { display:inline-block; font-size:10.5px; font-weight:700; letter-spacing:.13em; text-transform:uppercase; color:var(--accent); margin-bottom:12px; }
  .sh-section-title { font-size:clamp(30px,3.8vw,50px); font-weight:800; color:var(--navy); text-transform:uppercase; line-height:1.05; letter-spacing:-.01em; }
  .sh-title-orange  { color:var(--accent); }
  .sh-divider       { width:44px; height:4px; background:var(--accent); border-radius:2px; margin-top:14px; transform-origin:left; }
  .sh-divider.animated { animation:sh-bar-grow 0.6s cubic-bezier(0.22,1,0.36,1) .3s both; }

  /* ── Sticky filter bar ── */
  .sh-filter-bar {
    position:sticky; top:0; z-index:80;
    background:rgba(255,255,255,0.95); backdrop-filter:blur(14px);
    border-bottom:1px solid var(--border); padding:0 24px;
  }
  .sh-filter-inner {
    max-width:1200px; margin:0 auto;
    display:flex; align-items:center; justify-content:space-between;
    gap:12px; flex-wrap:wrap; padding:14px 0;
  }
  .sh-filter-pills { display:flex; gap:8px; flex-wrap:wrap; }
  .sh-pill {
    padding:7px 16px; border-radius:5px;
    font-family:'DM Sans',sans-serif; font-size:13px; font-weight:600;
    border:1.5px solid var(--border); background:transparent; color:var(--muted);
    cursor:pointer; transition:all .2s;
  }
  .sh-pill:hover   { border-color:var(--navy); color:var(--navy); }
  .sh-pill.active  { background:var(--navy); color:#fff; border-color:var(--navy); }

  .sh-cart-btn {
    display:inline-flex; align-items:center; gap:8px;
    padding:9px 20px; border-radius:6px; border:none; cursor:pointer;
    font-family:'DM Sans',sans-serif; font-size:13.5px; font-weight:600;
    transition:all .22s;
  }
  .sh-cart-btn.empty     { background:var(--steel); color:var(--muted); border:1.5px solid var(--border); }
  .sh-cart-btn.has-items { background:var(--accent); color:#fff; box-shadow:0 6px 20px rgba(232,93,4,.3); }
  .sh-cart-btn.has-items:hover { background:var(--accent-light); transform:translateY(-2px); }
  .sh-cart-count {
    background:white; color:var(--accent); border-radius:50%;
    width:20px; height:20px; display:flex; align-items:center; justify-content:center;
    font-size:11px; font-weight:700;
  }

  /* ── Product grid ── */
  .sh-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }

  /* ── Product card (same hover pattern as .mf-svc-card) ── */
  .sh-card {
    background:var(--white); border:1px solid var(--border); border-radius:12px;
    overflow:hidden; display:flex; flex-direction:column;
    transition:box-shadow .35s, transform .35s, border-color .3s;
    cursor:default; position:relative;
  }
  .sh-card:hover { box-shadow:0 20px 56px rgba(15,31,61,.13); transform:translateY(-6px); border-color:transparent; }
  .sh-card::before {
    content:''; position:absolute; top:0; left:0; width:4px; height:100%;
    background:var(--accent); transform:scaleY(0); transform-origin:top;
    transition:transform .35s cubic-bezier(0.22,1,0.36,1);
  }
  .sh-card:hover::before { transform:scaleY(1); }

  .sh-card-img { position:relative; height:210px; overflow:hidden; }
  .sh-card-img img { width:100%; height:100%; object-fit:cover; transition:transform .5s cubic-bezier(0.22,1,0.36,1); }
  .sh-card:hover .sh-card-img img { transform:scale(1.08); }
  .sh-card-img::after { content:''; position:absolute; bottom:0; left:0; width:0; height:3px; background:var(--accent); transition:width .4s ease; }
  .sh-card:hover .sh-card-img::after { width:100%; }

  .sh-card-tag {
    position:absolute; top:11px; left:11px;
    background:var(--accent); color:white;
    font-size:10px; font-weight:700; letter-spacing:.1em; text-transform:uppercase;
    padding:4px 9px; border-radius:4px;
  }
  .sh-card-body     { padding:22px; flex:1; display:flex; flex-direction:column; gap:10px; }
  .sh-card-cat      { font-size:10.5px; font-weight:600; color:var(--accent); letter-spacing:.1em; text-transform:uppercase; }
  .sh-card-name     { font-family:'Barlow Condensed',sans-serif; font-size:22px; font-weight:700; color:var(--navy); text-transform:uppercase; letter-spacing:.02em; line-height:1.1; }
  .sh-card-desc     { font-size:13px; color:var(--muted); line-height:1.65; }
  .sh-card-features { display:flex; flex-wrap:wrap; gap:6px; }
  .sh-card-feat     { font-size:10px; font-weight:600; letter-spacing:.06em; text-transform:uppercase; color:var(--muted); border:1px solid var(--border); padding:3px 9px; border-radius:3px; background:var(--steel); }
  .sh-card-footer   { display:flex; justify-content:space-between; align-items:center; padding-top:14px; border-top:1px solid var(--border); margin-top:auto; }
  .sh-card-price    { font-family:'Barlow Condensed',sans-serif; font-size:24px; font-weight:800; color:var(--navy); line-height:1; }
  .sh-card-unit     { font-size:11px; color:var(--muted); margin-top:2px; }

  .sh-add-btn {
    display:inline-flex; align-items:center; gap:7px;
    background:var(--accent); color:white; border:none; cursor:pointer;
    padding:10px 18px; border-radius:6px;
    font-family:'DM Sans',sans-serif; font-weight:600; font-size:13px;
    position:relative; overflow:hidden;
    transition:background .22s, transform .22s, box-shadow .22s;
  }
  .sh-add-btn::after { content:''; position:absolute; inset:0; background:linear-gradient(120deg,transparent 30%,rgba(255,255,255,.22) 50%,transparent 70%); transform:translateX(-100%); transition:transform .5s ease; }
  .sh-add-btn:hover::after { transform:translateX(100%); }
  .sh-add-btn:hover { background:var(--accent-light); transform:translateY(-2px); box-shadow:0 8px 20px rgba(232,93,4,.3); }

  /* ── Cart Drawer ── */
  .sh-backdrop { position:fixed; inset:0; background:rgba(15,31,61,.55); z-index:200; animation:sh-backdrop-in .25s ease; }
  .sh-drawer {
    position:fixed; top:0; right:0; bottom:0; width:min(480px,100vw);
    background:var(--white); border-left:1px solid var(--border); z-index:201;
    display:flex; flex-direction:column;
    animation:sh-drawer-in .35s cubic-bezier(0.22,1,0.36,1);
    box-shadow:-20px 0 60px rgba(15,31,61,.12);
  }
  .sh-drawer-head {
    padding:22px 24px; border-bottom:1px solid var(--border);
    display:flex; justify-content:space-between; align-items:center;
    position:sticky; top:0; background:var(--white); z-index:1;
  }
  .sh-drawer-title { font-family:'Barlow Condensed',sans-serif; font-size:22px; font-weight:800; text-transform:uppercase; letter-spacing:.04em; color:var(--navy); }
  .sh-drawer-close { background:var(--steel); border:1px solid var(--border); width:34px; height:34px; border-radius:6px; cursor:pointer; display:flex; align-items:center; justify-content:center; color:var(--muted); transition:background .2s, color .2s; }
  .sh-drawer-close:hover { background:var(--navy); color:white; }
  .sh-drawer-body { flex:1; overflow-y:auto; padding:20px 24px; display:flex; flex-direction:column; gap:14px; }

  .sh-cart-item { border:1px solid var(--border); border-radius:10px; padding:14px; background:var(--white); transition:border-color .2s; }
  .sh-cart-item:hover { border-color:#c0cde8; }
  .sh-ci-top   { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px; }
  .sh-ci-name  { font-family:'Barlow Condensed',sans-serif; font-size:17px; font-weight:700; text-transform:uppercase; color:var(--navy); letter-spacing:.02em; }
  .sh-ci-price { font-size:12px; color:var(--accent); font-weight:600; margin-top:3px; }
  .sh-ci-remove { background:none; border:none; cursor:pointer; color:var(--muted); transition:color .2s; padding:2px; }
  .sh-ci-remove:hover { color:var(--accent); }
  .sh-ci-mid   { display:flex; align-items:center; gap:10px; margin-bottom:10px; }
  .sh-qty-label { font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:.06em; color:var(--muted); }
  .sh-qty-btn  { background:var(--steel); border:1px solid var(--border); width:28px; height:28px; border-radius:5px; cursor:pointer; display:flex; align-items:center; justify-content:center; color:var(--navy); transition:background .2s; }
  .sh-qty-btn:hover { background:#e8eef9; }
  .sh-qty-val  { font-family:'Barlow Condensed',sans-serif; font-size:18px; font-weight:700; color:var(--navy); min-width:22px; text-align:center; }
  .sh-ci-note  { width:100%; border:1px solid var(--border); border-radius:6px; padding:9px 12px; font-family:'DM Sans',sans-serif; font-size:13px; color:var(--text); background:var(--steel); resize:vertical; outline:none; transition:border-color .2s; }
  .sh-ci-note:focus { border-color:var(--blue); background:white; }

  .sh-drawer-foot { padding:20px 24px; border-top:1px solid var(--border); display:flex; flex-direction:column; gap:10px; }
  .sh-form-label { font-size:10.5px; font-weight:700; text-transform:uppercase; letter-spacing:.1em; color:var(--muted); }
  .sh-input {
    display:block; width:100%; border:1.5px solid var(--border); border-radius:6px;
    padding:11px 14px; font-family:'DM Sans',sans-serif; font-size:14px; color:var(--text);
    background:var(--steel); outline:none; transition:border-color .2s, background .2s;
  }
  .sh-input:focus { border-color:var(--blue); background:white; }

  .sh-send-btn {
    width:100%; background:var(--accent); color:white; border:none; cursor:pointer;
    padding:14px; border-radius:6px; font-family:'DM Sans',sans-serif; font-weight:600; font-size:15px;
    position:relative; overflow:hidden;
    transition:background .22s, transform .22s, box-shadow .22s;
  }
  .sh-send-btn::after { content:''; position:absolute; inset:0; background:linear-gradient(120deg,transparent 30%,rgba(255,255,255,.22) 50%,transparent 70%); transform:translateX(-100%); transition:transform .5s ease; }
  .sh-send-btn:hover::after { transform:translateX(100%); }
  .sh-send-btn:hover { background:var(--accent-light); transform:translateY(-2px); box-shadow:0 10px 24px rgba(232,93,4,.35); }
  .sh-send-btn:disabled { background:#ccc; cursor:not-allowed; transform:none; box-shadow:none; }

  .sh-success { text-align:center; padding:44px 24px; border:1px solid #d1fae5; background:#f0fdf4; border-radius:10px; }
  .sh-success-check { font-size:48px; color:#16a34a; margin-bottom:12px; }
  .sh-success h3 { font-family:'Barlow Condensed',sans-serif; font-size:24px; font-weight:800; text-transform:uppercase; color:var(--navy); margin-bottom:8px; }
  .sh-success p  { font-size:14px; color:var(--muted); }

  /* ── CTA (same as Home .mf-cta) ── */
  .sh-cta       { background:var(--navy); position:relative; overflow:hidden; padding:96px 0; }
  .sh-cta-lines { position:absolute; inset:0; background-image:repeating-linear-gradient(-45deg,transparent,transparent 40px,rgba(255,255,255,.018) 40px,rgba(255,255,255,.018) 41px); }
  .sh-cta-glow  { position:absolute; right:-80px; top:-80px; width:380px; height:380px; border-radius:50%; background:radial-gradient(circle,rgba(232,93,4,.18),transparent 70%); animation:sh-glow-drift 8s ease-in-out infinite; }
  .sh-cta-glow2 { position:absolute; left:-60px; bottom:-60px; width:280px; height:280px; border-radius:50%; background:radial-gradient(circle,rgba(26,58,107,.4),transparent 70%); animation:sh-glow-drift 10s ease-in-out 2s infinite reverse; }
  .sh-cta-inner { position:relative; z-index:1; max-width:800px; margin:0 auto; padding:0 24px; text-align:center; }
  .sh-cta-title { font-size:clamp(36px,5vw,62px); font-weight:800; color:white; text-transform:uppercase; line-height:1.05; margin-bottom:16px; letter-spacing:-.01em; }
  .sh-cta-sub   { color:rgba(255,255,255,.58); font-size:15.5px; line-height:1.65; margin-bottom:38px; max-width:540px; margin-left:auto; margin-right:auto; }
  .sh-cta-btns  { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }
  .sh-cta-btn1  { display:inline-flex; align-items:center; gap:8px; background:var(--accent); color:white; padding:14px 30px; border-radius:6px; font-weight:600; font-size:14.5px; text-decoration:none; position:relative; overflow:hidden; transition:background .22s, transform .22s, box-shadow .22s; }
  .sh-cta-btn1::after { content:''; position:absolute; inset:0; background:linear-gradient(120deg,transparent 30%,rgba(255,255,255,.22) 50%,transparent 70%); transform:translateX(-100%); transition:transform .5s ease; }
  .sh-cta-btn1:hover::after { transform:translateX(100%); }
  .sh-cta-btn1:hover { background:var(--accent-light); transform:translateY(-3px); box-shadow:0 10px 28px rgba(232,93,4,.38); }
  .sh-cta-btn2  { display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.2); color:white; padding:14px 30px; border-radius:6px; font-weight:600; font-size:14.5px; text-decoration:none; transition:background .22s, transform .22s; }
  .sh-cta-btn2:hover { background:rgba(255,255,255,.14); transform:translateY(-3px); }

  /* ── Trust (same as Home .mf-trust) ── */
  .sh-trust      { padding:44px 0; background:var(--white); border-top:1px solid var(--border); }
  .sh-trust-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
  .sh-trust-item { display:flex; align-items:center; gap:10px; padding:16px 18px; border:1px solid var(--border); border-radius:8px; background:var(--steel); transition:border-color .25s, transform .25s, box-shadow .25s, background .25s; cursor:default; }
  .sh-trust-item:hover { border-color:var(--accent); transform:translateY(-3px) scale(1.02); box-shadow:0 8px 24px rgba(232,93,4,.12); background:#fff8f4; }
  .sh-trust-item svg  { width:18px; height:18px; color:var(--accent); flex-shrink:0; transition:transform .3s; }
  .sh-trust-item:hover svg { transform:scale(1.25) rotate(10deg); }
  .sh-trust-item span { font-size:13px; font-weight:600; color:var(--navy); }

  /* ── View all ── */
  .sh-view-all { display:inline-flex; align-items:center; gap:6px; color:var(--blue); font-weight:600; font-size:13.5px; text-decoration:none; white-space:nowrap; transition:gap .2s, color .2s; }
  .sh-view-all:hover { gap:10px; color:var(--accent); }

  /* ── Empty state ── */
  .sh-empty { text-align:center; padding:80px 24px; }
  .sh-empty-icon { font-size:52px; margin-bottom:16px; opacity:.35; }
  .sh-empty h3 { font-family:'Barlow Condensed',sans-serif; font-size:24px; font-weight:700; color:var(--navy); text-transform:uppercase; margin-bottom:8px; }
  .sh-empty p  { font-size:14px; color:var(--muted); }

  /* ── Toast ── */
  .sh-toast {
    position:fixed; bottom:28px; left:50%; transform:translateX(-50%);
    background:var(--navy); color:white;
    padding:12px 22px; border-radius:8px;
    font-family:'DM Sans',sans-serif; font-weight:600; font-size:13.5px;
    z-index:999; white-space:nowrap;
    display:flex; align-items:center; gap:8px;
    box-shadow:0 8px 28px rgba(15,31,61,.25);
    animation:sh-toast-up .3s cubic-bezier(0.22,1,0.36,1);
  }
  .sh-toast-dot { width:8px; height:8px; background:var(--accent); border-radius:50%; flex-shrink:0; }

  /* ── Responsive ── */
  @media (max-width:1024px) {
    .sh-grid { grid-template-columns:repeat(2,1fr); }
    .sh-trust-grid { grid-template-columns:repeat(2,1fr); }
  }
  @media (max-width:768px) {
    .sh-hero-stripe { width:100%; clip-path:none; opacity:.3; animation:none; }
    .sh-hero-dots   { display:none; }
    .sh-hero-inner  { grid-template-columns:1fr; gap:44px; padding:40px 20px 56px; }
    .sh-img-grid    { display:none; }
    .sh-grid        { grid-template-columns:1fr; }
    .sh-section     { padding:60px 0; }
    .sh-hero-title  { font-size:42px !important; }
    .sh-filter-inner { flex-direction:column; align-items:flex-start; }
  }
  @media (max-width:480px) {
    .sh-trust-grid { grid-template-columns:1fr; }
    .sh-cta-title  { font-size:34px; }
  }
`;

// ─── Scroll reveal ────────────────────────────────────────────────────────────
function Reveal({ children, className = '', direction = 'up', delay = 0 }: {
  children: React.ReactNode; className?: string;
  direction?: 'up' | 'left' | 'right' | 'scale'; delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`sh-reveal dir-${direction} ${visible ? 'is-visible' : ''} ${className}`}
      style={{ animationDelay: visible ? `${delay}ms` : undefined }}>
      {children}
    </div>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionHead({ tag, title }: { tag: string; title: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref}>
      <span className="sh-tag">{tag}</span>
      <h2 className="sh-section-title">{title}</h2>
      <div className={`sh-divider${inView ? ' animated' : ''}`} />
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product, onAdd }: { product: Product; onAdd: (p: Product) => void }) {
  return (
    <div className="sh-card">
      <div className="sh-card-img">
        <img src={product.image} alt={product.name}
          onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/f4f6fa/1a3a6b?text=Malik+Fabrication'; }} />
        <span className="sh-card-tag">{product.tag}</span>
      </div>
      <div className="sh-card-body">
        <div className="sh-card-cat">{product.category}</div>
        <div className="sh-card-name">{product.name}</div>
        <p className="sh-card-desc">{product.description}</p>
        <div className="sh-card-features">
          {product.features.map(f => <span key={f} className="sh-card-feat">{f}</span>)}
        </div>
        <div className="sh-card-footer">
          <div>
            <div className="sh-card-price">{product.startingPrice}</div>
            {product.unit && <div className="sh-card-unit">{product.unit}</div>}
          </div>
          <button className="sh-add-btn" onClick={() => onAdd(product)}>
            <ShoppingCart size={15} /> Request Quote
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Cart Drawer ──────────────────────────────────────────────────────────────
function CartDrawer({ cart, onClose, onRemove, onQtyChange, onNoteChange }: {
  cart: CartItem[]; onClose: () => void;
  onRemove: (id: number) => void; onQtyChange: (id: number, qty: number) => void; onNoteChange: (id: number, note: string) => void;
}) {
  const [form, setForm] = useState({ fullName: '', phone: '', email: '', details: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const canSubmit = form.fullName.trim() && form.phone.trim() && cart.length > 0;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setStatus('sending');
    const orderLines = cart.map(c => `• ${c.name} × ${c.qty}${c.note ? ` (Note: ${c.note})` : ''}`).join('\n');
    const details = `ORDER REQUEST:\n${orderLines}\n\n${form.details}`.trim();
    try {
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: form.fullName, phone: form.phone, email: form.email, service: cart.map(c => c.name).join(', '), details }),
      });
      const data = await res.json();
      setStatus(data.success ? 'sent' : 'error');
    } catch { setStatus('error'); }
  };

  return (
    <>
      <div className="sh-backdrop" onClick={onClose} />
      <div className="sh-drawer">
        {/* Head */}
        <div className="sh-drawer-head">
          <div className="sh-drawer-title">Quote List {cart.length > 0 && `(${cart.reduce((a, c) => a + c.qty, 0)})`}</div>
          <button className="sh-drawer-close" onClick={onClose}><X size={16} /></button>
        </div>

        {/* Items */}
        <div className="sh-drawer-body">
          {cart.length === 0 ? (
            <div className="sh-empty" style={{ padding: '60px 0' }}>
              <div className="sh-empty-icon">🛒</div>
              <h3>No items yet</h3>
              <p>Click "Request Quote" on any product to add it here.</p>
            </div>
          ) : cart.map(item => (
            <div key={item.id} className="sh-cart-item">
              <div className="sh-ci-top">
                <div>
                  <div className="sh-ci-name">{item.name}</div>
                  <div className="sh-ci-price">{item.startingPrice}{item.unit ? ` · ${item.unit}` : ''}</div>
                </div>
                <button className="sh-ci-remove" onClick={() => onRemove(item.id)}><Trash2 size={15} /></button>
              </div>
              <div className="sh-ci-mid">
                <span className="sh-qty-label">Qty</span>
                <button className="sh-qty-btn" onClick={() => onQtyChange(item.id, Math.max(1, item.qty - 1))}><Minus size={12} /></button>
                <span className="sh-qty-val">{item.qty}</span>
                <button className="sh-qty-btn" onClick={() => onQtyChange(item.id, item.qty + 1)}><Plus size={12} /></button>
              </div>
              <textarea className="sh-ci-note" rows={2} placeholder="Add note — size, colour, location, etc."
                value={item.note} onChange={e => onNoteChange(item.id, e.target.value)} />
            </div>
          ))}
        </div>

        {/* Form footer */}
        {cart.length > 0 && status !== 'sent' && (
          <div className="sh-drawer-foot">
            <div className="sh-form-label">Your Details</div>
            <input className="sh-input" type="text"  placeholder="Full Name *"       value={form.fullName} onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} />
            <input className="sh-input" type="tel"   placeholder="Phone Number *"    value={form.phone}    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
            <input className="sh-input" type="email" placeholder="Email (optional)"  value={form.email}    onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            <textarea className="sh-ci-note" rows={2} placeholder="Extra details? (optional)" value={form.details} onChange={e => setForm(f => ({ ...f, details: e.target.value }))} />
            {status === 'error' && <p style={{ color: '#dc2626', fontSize: 13 }}>Something went wrong. Please call us directly.</p>}
            <button className="sh-send-btn" onClick={handleSubmit} disabled={!canSubmit || status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send Quote Request →'}
            </button>
          </div>
        )}

        {status === 'sent' && (
          <div style={{ padding: '20px 24px' }}>
            <div className="sh-success">
              <div className="sh-success-check">✓</div>
              <h3>Request Sent!</h3>
              <p>We'll get back to you shortly with pricing and next steps.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const filtered = activeCategory === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCategory);
  const totalItems = cart.reduce((a, c) => a + c.qty, 0);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const ex = prev.find(c => c.id === product.id);
      if (ex) return prev.map(c => c.id === product.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...product, qty: 1, note: '' }];
    });
    setToast(product.name);
    setTimeout(() => setToast(null), 2400);
  };

  useEffect(() => {
    document.body.style.overflow = cartOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [cartOpen]);

  return (
    <>
      <style>{CSS}</style>
      <div className="sh-root">

        {/* ══ HERO ══ */}
        <section className="sh-hero">
         
        </section>

        {/* ══ STICKY FILTER BAR ══ */}
        <div className="sh-filter-bar">
          <div className="sh-filter-inner">
            <div className="sh-filter-pills">
              {CATEGORIES.map(cat => (
                <button key={cat} className={`sh-pill${activeCategory === cat ? ' active' : ''}`}
                  onClick={() => setActiveCategory(cat)}>{cat}</button>
              ))}
            </div>
            <button className={`sh-cart-btn ${totalItems > 0 ? 'has-items' : 'empty'}`} onClick={() => setCartOpen(true)}>
              <ShoppingCart size={16} /> Quote List
              {totalItems > 0 && <span className="sh-cart-count">{totalItems}</span>}
            </button>
          </div>
        </div>

        {/* ══ PRODUCT CATALOGUE ══ */}
        <section className="sh-section sh-section-steel" id="sh-catalog">
          <div className="sh-section-inner">
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:48, gap:24, flexWrap:'wrap' }}>
              <Reveal direction="left">
                <SectionHead tag="Our Products" title={<>Fabrication <span className="sh-title-orange">Catalogue</span></>} />
              </Reveal>
              <Reveal direction="right">
                <Link to="/services" className="sh-view-all">All Services <ArrowRight size={15} /></Link>
              </Reveal>
            </div>
            <div className="sh-grid">
              {filtered.map((product, i) => (
                <Reveal key={product.id} direction="up" delay={i * 80}>
                  <ProductCard product={product} onAdd={addToCart} />
                </Reveal>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="sh-empty">
                <div className="sh-empty-icon">🔧</div>
                <h3>No products in this category</h3>
                <p>Try selecting a different category above.</p>
              </div>
            )}
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section className="sh-cta">
          <div className="sh-cta-lines" /><div className="sh-cta-glow" /><div className="sh-cta-glow2" />
          <div className="sh-cta-inner">
            <Reveal direction="up"><h2 className="sh-cta-title">Need Something<br />Custom Built?</h2></Reveal>
            <Reveal direction="up" delay={120}>
              <p className="sh-cta-sub">Can't find what you're looking for? Our workshop handles structural, architectural, and industrial fabrication from concept to installation.</p>
            </Reveal>
            <Reveal direction="up" delay={220}>
              <div className="sh-cta-btns">
                <Link to="/contact" className="sh-cta-btn1">Get Free Quote <ArrowRight size={16} /></Link>
                <a href="tel:+917838170214" className="sh-cta-btn2"><Phone size={16} /> +91 78381 70214</a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ TRUST ══ */}
        <section className="sh-trust">
          <div className="sh-section-inner">
            <div className="sh-trust-grid">
              {['ISO 9001 Certified', '15+ Years Experience', '500+ Projects', '100% Satisfaction'].map((badge, i) => (
                <Reveal key={i} direction="left" delay={i * 70}>
                  <div className="sh-trust-item"><CheckCircle /><span>{badge}</span></div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CART DRAWER ══ */}
        {cartOpen && (
          <CartDrawer cart={cart} onClose={() => setCartOpen(false)}
            onRemove={id => setCart(p => p.filter(c => c.id !== id))}
            onQtyChange={(id, qty) => setCart(p => p.map(c => c.id === id ? { ...c, qty } : c))}
            onNoteChange={(id, note) => setCart(p => p.map(c => c.id === id ? { ...c, note } : c))}
          />
        )}

        {/* ══ TOAST ══ */}
        {toast && (
          <div className="sh-toast">
            <span className="sh-toast-dot" />{toast} added to quote list ✓
          </div>
        )}

      </div>
    </>
  );
}