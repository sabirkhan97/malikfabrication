import { useState, useRef, forwardRef, useEffect, useCallback } from 'react';
import type { Ref } from 'react';
import { Menu, Phone, X } from 'lucide-react';

interface HeaderProps {
  homeRef: Ref<HTMLDivElement>;
  servicesRef: Ref<HTMLDivElement>;
  aboutRef: Ref<HTMLDivElement>;
  contactRef: Ref<HTMLDivElement>;
  weldingServiceRef: Ref<HTMLDivElement>;
  seoRef: Ref<HTMLDivElement>;
  weldingSpecializationsRef: Ref<HTMLDivElement>;
}

const navItems = [
  { name: 'Home', id: 'home' },
  { name: 'Services', id: 'services' },
  { name: 'About', id: 'about' },
  { name: 'Welding', id: 'weldingServices' },
  { name: 'Specializations', id: 'weldingSpecializations' },
  { name: 'Contact', id: 'contact' },
];

const Header = forwardRef<HTMLDivElement, HeaderProps>(
  ({ homeRef, servicesRef, aboutRef, contactRef, weldingServiceRef, seoRef, weldingSpecializationsRef }, ref) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const refMap: Record<string, Ref<HTMLDivElement>> = {
      home: homeRef,
      services: servicesRef,
      about: aboutRef,
      contact: contactRef,
      weldingServices: weldingServiceRef,
      weldingSpecializations: weldingSpecializationsRef,
      seo: seoRef,
    };

    useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 10);
      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
      const handleOutside = (e: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
          setIsMenuOpen(false);
        }
      };
      if (isMenuOpen) document.addEventListener('mousedown', handleOutside);
      return () => document.removeEventListener('mousedown', handleOutside);
    }, [isMenuOpen]);

    useEffect(() => {
      if (isMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen]);

    const scrollTo = useCallback((id: string) => {
      setActiveLink(id);
      setIsMenuOpen(false);
      const r = refMap[id];
      if (r && 'current' in r && r.current) {
        r.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, []);

    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500&display=swap');

          @keyframes pulse-nav {
            0%,100%{opacity:1;transform:scale(1);}
            50%{opacity:0.3;transform:scale(0.5);}
          }

          .nav-link {
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: #444;
            background: none;
            border: none;
            cursor: pointer;
            padding: 6px 0;
            position: relative;
            transition: color 0.2s;
            white-space: nowrap;
          }
          .nav-link::after {
            content: '';
            position: absolute;
            bottom: 0; left: 0;
            height: 1px; width: 0;
            background: #e05a00;
            box-shadow: 0 0 6px #e05a00;
            transition: width 0.25s ease;
          }
          .nav-link:hover { color: #f0f0f0; }
          .nav-link:hover::after { width: 100%; }
          .nav-link.active { color: #e05a00; }
          .nav-link.active::after { width: 100%; }

          .quote-btn {
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 12px; font-weight: 900;
            letter-spacing: 0.2em; text-transform: uppercase;
            padding: 9px 20px;
            background: #e05a00; color: #000;
            border: none; cursor: pointer;
            clip-path: polygon(0 0,calc(100% - 7px) 0,100% 7px,100% 100%,7px 100%,0 calc(100% - 7px));
            transition: opacity 0.2s;
            text-decoration: none;
            display: inline-block;
            white-space: nowrap;
          }
          .quote-btn:hover { opacity: 0.85; }

          /* Mobile drawer */
          .mobile-drawer {
            position: fixed;
            top: 0; right: 0; bottom: 0;
            width: min(320px, 85vw);
            background: #080808;
            border-left: 1px solid #1a1a1a;
            z-index: 200;
            transform: translateX(100%);
            transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
            display: flex; flex-direction: column;
            overflow: hidden;
          }
          .mobile-drawer.open { transform: translateX(0); }

          .drawer-overlay {
            position: fixed; inset: 0;
            background: rgba(0,0,0,0.7);
            backdrop-filter: blur(4px);
            z-index: 199;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s;
          }
          .drawer-overlay.open { opacity: 1; pointer-events: auto; }

          .mobile-nav-link {
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 15px; font-weight: 700;
            letter-spacing: 0.15em; text-transform: uppercase;
            color: #444;
            background: none; border: none; cursor: pointer;
            padding: 18px 28px;
            text-align: left; width: 100%;
            border-bottom: 1px solid #141414;
            position: relative; overflow: hidden;
            transition: color 0.2s, background 0.2s;
            display: flex; align-items: center; gap: 12px;
          }
          .mobile-nav-link:hover { color: #f0f0f0; background: #0e0e0e; }
          .mobile-nav-link.active { color: #e05a00; background: #0e0e0e; }
          .mobile-nav-link.active::before {
            content: '';
            position: absolute; left: 0; top: 0; bottom: 0;
            width: 3px;
            background: #e05a00;
            box-shadow: 0 0 8px #e05a00;
          }

          .mobile-nav-num {
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 10px; font-weight: 700;
            letter-spacing: 0.1em;
            color: #2a2a2a;
            flex-shrink: 0;
            transition: color 0.2s;
          }
          .mobile-nav-link.active .mobile-nav-num,
          .mobile-nav-link:hover .mobile-nav-num { color: #e05a00; }

          /* Weld bead */
          .weld-strip { display:flex; height:3px; overflow:hidden; flex-shrink:0; }
          .wbead {
            flex:1;
            clip-path:ellipse(45% 60% at 50% 50%);
            margin:0 0.5px;
          }
        `}</style>

        {/* Drawer overlay */}
        <div
          className={`drawer-overlay ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* ── HEADER ── */}
        <header
          ref={ref}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0,
            zIndex: 100,
            fontFamily: "'Barlow Condensed', sans-serif",
            transition: 'background 0.3s, border-color 0.3s',
            background: scrolled ? 'rgba(6,6,6,0.96)' : 'rgba(6,6,6,0.85)',
            backdropFilter: 'blur(12px)',
            borderBottom: `1px solid ${scrolled ? '#1e1e1e' : '#141414'}`,
          }}
        >
          {/* Weld bead top accent */}
          <div className="weld-strip">
            {Array.from({ length: 120 }).map((_, i) => (
              <div key={i} className="wbead" style={{
                background: i % 4 === 0 ? '#ff6a00' : '#e05a00',
                opacity: 0.5 + (i % 3) * 0.15,
              }} />
            ))}
          </div>

          <div style={{
            maxWidth: 1100,
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 60,
            gap: 24,
          }}>

            {/* ── LOGO ── */}
            <button
              onClick={() => scrollTo('home')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}
            >
              <div style={{
                width: 36, height: 36,
                background: '#e05a00',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Barlow Condensed',sans-serif",
                fontSize: 17, fontWeight: 900, color: '#000',
                clipPath: 'polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))',
                flexShrink: 0,
              }}>MK</div>
              <div>
                <div style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontSize: 17, fontWeight: 900,
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                  color: '#f0f0f0', lineHeight: 1,
                }}>Malik Fabrication</div>
                <div style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontSize: 10, fontWeight: 600,
                  textTransform: 'uppercase', letterSpacing: '0.2em',
                  color: '#333', lineHeight: 1, marginTop: 2,
                }}>Gurugram · Est. 2008</div>
              </div>
            </button>

            {/* ── DESKTOP NAV ── */}
            <nav style={{
              display: 'flex', alignItems: 'center', gap: 28,
              flex: 1, justifyContent: 'center',
            }} className="desktop-nav">
              <style>{`
                @media (max-width: 768px) { .desktop-nav { display: none !important; } }
              `}</style>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`nav-link ${activeLink === item.id ? 'active' : ''}`}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* ── RIGHT: phone + CTA + hamburger ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>

              {/* Phone — hidden on small mobile */}
              <a
                href="tel:+917838170214"
                style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontSize: 13, fontWeight: 700, letterSpacing: '0.08em',
                  color: '#555', textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                className="phone-link"
              >
                <style>{`
                  .phone-link { }
                  @media (max-width: 520px) { .phone-link { display: none !important; } }
                `}</style>
                <Phone size={13} style={{ color: '#e05a00', flexShrink: 0 }} />
                +91 78381 70214
              </a>

              {/* Quote CTA — hidden on mobile */}
              <a href="tel:+917838170214" className="quote-btn desktop-cta">
                <style>{`@media (max-width: 768px){.desktop-cta{display:none!important;}}`}</style>
                Get Quote →
              </a>

              {/* Hamburger — mobile only */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="hamburger-btn"
                aria-label="Toggle menu"
                style={{
                  background: 'none', border: '1px solid #1e1e1e',
                  cursor: 'pointer', padding: '7px 9px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#888',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
              >
                <style>{`
                  .hamburger-btn { }
                  @media (min-width: 769px) { .hamburger-btn { display: none !important; } }
                  .hamburger-btn:hover { border-color: #e05a00 !important; color: #e05a00 !important; }
                `}</style>
                {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </header>

        {/* ── MOBILE DRAWER ── */}
        <div ref={menuRef} className={`mobile-drawer ${isMenuOpen ? 'open' : ''}`}>

          {/* Drawer header */}
          <div style={{
            padding: '20px 24px',
            borderBottom: '1px solid #141414',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 32, height: 32,
                background: '#e05a00',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Barlow Condensed',sans-serif",
                fontSize: 15, fontWeight: 900, color: '#000',
                clipPath: 'polygon(0 0,calc(100% - 7px) 0,100% 7px,100% 100%,7px 100%,0 calc(100% - 7px))',
              }}>MK</div>
              <div>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:14, fontWeight:900, textTransform:'uppercase', letterSpacing:'0.05em', color:'#f0f0f0', lineHeight:1 }}>Malik Fab</div>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:9, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.2em', color:'#333', lineHeight:1, marginTop:2 }}>Est. 2008</div>
              </div>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              style={{ background:'none', border:'1px solid #1e1e1e', cursor:'pointer', padding:'6px 8px', color:'#555', transition:'border-color 0.2s' }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Weld bead separator */}
          <div className="weld-strip">
            {Array.from({ length: 60 }).map((_, i) => (
              <div key={i} className="wbead" style={{ background: i % 4 === 0 ? '#ff6a00' : '#e05a00', opacity: 0.5 + (i % 3) * 0.15 }} />
            ))}
          </div>

          {/* Nav links */}
          <nav style={{ flex: 1, overflowY: 'auto' }}>
            {navItems.map((item, i) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`mobile-nav-link ${activeLink === item.id ? 'active' : ''}`}
              >
                <span className="mobile-nav-num">{String(i + 1).padStart(2, '0')}</span>
                {item.name}
              </button>
            ))}
          </nav>

          {/* Bottom CTA */}
          <div style={{ padding: '20px 24px', borderTop: '1px solid #141414' }}>
            <a
              href="tel:+917838170214"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                width: '100%', padding: '14px',
                background: '#e05a00', color: '#000',
                fontFamily: "'Barlow Condensed',sans-serif",
                fontSize: 13, fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase',
                textDecoration: 'none',
                clipPath: 'polygon(0 0,calc(100% - 9px) 0,100% 9px,100% 100%,9px 100%,0 calc(100% - 9px))',
              }}
            >
              <Phone size={14} />
              Call the Shop
            </a>
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:'#e05a00', boxShadow:'0 0 6px #e05a00', animation:'pulse-nav 1.6s ease-in-out infinite' }} />
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:10, fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', color:'#333' }}>
                Mon–Sat · 8AM – 6PM
              </span>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div style={{ height: 63 }} />
      </>
    );
  }
);

Header.displayName = 'Header';
export default Header;