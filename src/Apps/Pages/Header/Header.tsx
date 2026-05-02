import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, ChevronRight } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Shop', path: '/shop' },
  { name: 'Blogs', path: '/blogs' },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

  :root {
    --navy: #0f1f3d;
    --blue: #1a3a6b;
    --accent: #e85d04;
    --accent-light: #ff7b2c;
    --steel: #f4f6fa;
    --border: #dde3ef;
    --muted: #6b7280;
    --white: #ffffff;
  }

  /* ── TOP BAR ── */
  .hd-topbar {
    background: var(--navy);
    padding: 7px 0;
    display: none;
  }
  @media (min-width: 900px) { .hd-topbar { display: block; } }

  .hd-topbar-inner {
    max-width: 1200px; margin: 0 auto; padding: 0 24px;
    display: flex; justify-content: space-between; align-items: center;
  }
  .hd-topbar-left { display: flex; align-items: center; gap: 24px; }
  .hd-topbar-link {
    display: inline-flex; align-items: center; gap: 7px;
    color: rgba(255,255,255,0.72); font-family: 'DM Sans', sans-serif;
    font-size: 12.5px; font-weight: 500; text-decoration: none;
    transition: color 0.18s;
  }
  .hd-topbar-link:hover { color: white; }
  .hd-topbar-link svg { width: 13px; height: 13px; color: var(--accent); }
  .hd-topbar-right {
    font-family: 'DM Sans', sans-serif;
    font-size: 11.5px; color: rgba(255,255,255,0.48);
    letter-spacing: 0.04em; text-transform: uppercase;
  }

  /* ── MAIN NAV ── */
  .hd-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    transition: top 0.25s;
  }
  .hd-nav.hd-has-topbar { top: 0; }

  .hd-nav-bar {
    background: var(--white);
    border-bottom: 1px solid var(--border);
    transition: box-shadow 0.25s, padding 0.25s;
  }
  .hd-nav-bar.hd-scrolled {
    box-shadow: 0 2px 20px rgba(15,31,61,0.1);
  }

  .hd-nav-inner {
    max-width: 1200px; margin: 0 auto; padding: 0 24px;
    display: flex; justify-content: space-between; align-items: center;
    height: 68px;
  }

  /* Logo */
  .hd-logo {
    display: flex; align-items: center; gap: 12px;
    text-decoration: none; flex-shrink: 0;
  }
  .hd-logo-mark {
    width: 44px; height: 44px; border-radius: 8px;
    background: var(--navy);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; position: relative; overflow: hidden;
  }
  .hd-logo-mark::after {
    content: '';
    position: absolute; bottom: 0; left: 0;
    width: 100%; height: 3px;
    background: var(--accent);
  }
  .hd-logo-letters {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 20px; font-weight: 800; color: white;
    letter-spacing: 0.02em; line-height: 1;
  }
  .hd-logo-name {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 20px; font-weight: 800; color: var(--navy);
    text-transform: uppercase; letter-spacing: 0.02em;
    line-height: 1.1;
  }
  .hd-logo-sub {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px; color: var(--muted); font-weight: 500;
    letter-spacing: 0.04em;
  }

  /* Desktop nav links */
  .hd-links {
    display: none; align-items: center; gap: 4px;
  }
  @media (min-width: 900px) { .hd-links { display: flex; } }

  .hd-link {
    position: relative;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 600; color: var(--navy);
    text-decoration: none; padding: 8px 14px; border-radius: 6px;
    transition: color 0.18s, background 0.18s;
    letter-spacing: 0.01em;
  }
  .hd-link:hover { color: var(--accent); background: #fff5f0; }
  .hd-link.hd-active { color: var(--accent); }
  .hd-link-underline {
    position: absolute; bottom: 4px; left: 14px; right: 14px;
    height: 2px; background: var(--accent); border-radius: 1px;
  }

  /* CTA button */
  .hd-cta {
    display: none; align-items: center; gap: 7px;
    background: var(--accent); color: white;
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px; font-weight: 600;
    padding: 9px 18px; border-radius: 6px;
    text-decoration: none; margin-left: 12px;
    transition: background 0.18s, transform 0.18s;
    flex-shrink: 0;
  }
  @media (min-width: 900px) { .hd-cta { display: inline-flex; } }
  .hd-cta:hover { background: var(--accent-light); transform: translateY(-1px); }

  /* Hamburger */
  .hd-hamburger {
    display: flex; align-items: center; justify-content: center;
    width: 40px; height: 40px; border-radius: 7px;
    border: 1.5px solid var(--border);
    background: var(--white); cursor: pointer;
    color: var(--navy); transition: border-color 0.18s, background 0.18s;
  }
  .hd-hamburger:hover { border-color: var(--accent); background: #fff5f0; color: var(--accent); }
  @media (min-width: 900px) { .hd-hamburger { display: none; } }

  /* ── MOBILE MENU ── */
  .hd-mobile {
    position: fixed; inset: 0;
    background: var(--white); z-index: 99;
    display: flex; flex-direction: column;
    padding-top: 68px;
    overflow-y: auto;
  }

  .hd-mobile-top {
    background: var(--navy); padding: 20px 24px;
    display: flex; flex-direction: column; gap: 10px;
  }
  .hd-mobile-contact {
    display: flex; align-items: center; gap: 10px;
    color: rgba(255,255,255,0.75); font-family: 'DM Sans', sans-serif;
    font-size: 13px; text-decoration: none;
    transition: color 0.18s;
  }
  .hd-mobile-contact:hover { color: white; }
  .hd-mobile-contact svg { width: 15px; height: 15px; color: var(--accent); flex-shrink: 0; }

  .hd-mobile-links {
    padding: 20px 24px; display: flex; flex-direction: column; gap: 4px;
  }
  .hd-mobile-link {
    display: flex; align-items: center; justify-content: space-between;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 19px; font-weight: 800; color: var(--navy);
    text-transform: uppercase; letter-spacing: 0.02em;
    text-decoration: none;
    padding: 12px 16px; border-radius: 8px;
    transition: background 0.18s, color 0.18s;
    border-left: 3px solid transparent;
  }
  .hd-mobile-link:hover { background: var(--steel); color: var(--accent); border-left-color: var(--accent); }
  .hd-mobile-link.hd-mobile-active { color: var(--accent); border-left-color: var(--accent); background: #fff5f0; }
  .hd-mobile-link svg { width: 18px; height: 18px; opacity: 0.4; }

  .hd-mobile-footer {
    margin-top: auto; padding: 20px 24px;
    border-top: 1px solid var(--border);
  }
  .hd-mobile-cta {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    background: var(--accent); color: white;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px; font-weight: 600;
    padding: 14px; border-radius: 8px;
    text-decoration: none;
    transition: background 0.18s;
  }
  .hd-mobile-cta:hover { background: var(--accent-light); }
`;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsMobileMenuOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <style>{CSS}</style>


      {/* Main Nav */}
      <header className="hd-nav">
      {/* Top Bar */}
      <div className="hd-topbar" style={{ marginTop: 0 }}>
        <div className="hd-topbar-inner">
          <div className="hd-topbar-left">
            <a href="tel:+917838170214" className="hd-topbar-link">
              <Phone /> +91 78381 70214 
            </a>
            <a href="mailto:malikfabrication.welds@gmail.com" className="hd-topbar-link">
              <Mail /> malikfabrication.welds@gmail.com
            </a>
          </div>
          <div className="hd-topbar-right">Mon – Sat &nbsp;·&nbsp; 8:00 AM – 6:00 PM</div>
        </div>
      </div>
        <div className={`hd-nav-bar${isScrolled ? ' hd-scrolled' : ''}`}>
          <div className="hd-nav-inner">

            {/* Logo */}
            <Link to="/" className="hd-logo">
              <div className="hd-logo-mark">
                <span className="hd-logo-letters">MK</span>
              </div>
              <div>
                <div className="hd-logo-name">Malik Fabrication</div>
                <div className="hd-logo-sub">Est. 2008 &nbsp;·&nbsp; Gurugram</div>
              </div>
            </Link>

            {/* Desktop Links */}
            <nav className="hd-links">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`hd-link${location.pathname === link.path ? ' hd-active' : ''}`}
                >
                  {link.name}
                  {location.pathname === link.path && <span className="hd-link-underline" />}
                </Link>
              ))}
              <a href="tel:+917838170214" className="hd-cta">
                <Phone size={14} /> Get Quote
              </a>
            </nav>

            {/* Hamburger */}
            <button
              className="hd-hamburger"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="hd-mobile">
          {/* Contact strip */}
          <div className="hd-mobile-top">
            <a href="tel:+917838170214" className="hd-mobile-contact">
              <Phone /> +91 78381 70214
            </a>
            <a href="mailto:malikfabrication.welds@gmail.com" className="hd-mobile-contact">
              <Mail /> malikfabrication.welds@gmail.com
            </a>
          </div>

          {/* Nav links */}
          <div className="hd-mobile-links">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`hd-mobile-link${location.pathname === link.path ? ' hd-mobile-active' : ''} ` }
              >
                {link.name}
                <ChevronRight />
              </Link>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="hd-mobile-footer">
            <a href="tel:+917838170214" className="hd-mobile-cta">
              <Phone size={16} /> Call for Free Quote
            </a>
          </div>
        </div>
      )}
    </>
  );
}