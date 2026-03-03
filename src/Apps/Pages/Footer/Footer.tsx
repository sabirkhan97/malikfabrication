import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, ArrowRight, ChevronRight } from 'lucide-react';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const services = [
  'Metal Fabrication',
  'Welding Services',
  'Industrial Sheds',
  'Gates & Grills',
  'Repair & Restoration',
  'Structural Fabrication',
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

  :root {
    --accent: #e85d04;
    --accent-light: #ff7b2c;
    --navy: #0f1f3d;
    --ft-bg: #0a1628;
    --ft-surface: #111f38;
    --ft-border: rgba(255,255,255,0.07);
    --ft-text: rgba(255,255,255,0.55);
    --ft-text-hover: rgba(255,255,255,0.9);
    --white: #ffffff;
  }

  .ft-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .ft-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--ft-bg);
    color: var(--ft-text);
  }

  /* ── CTA BAND ── */
  .ft-band {
    background: var(--accent);
    padding: 28px 0;
    position: relative; overflow: hidden;
  }
  .ft-band::before {
    content: '';
    position: absolute; inset: 0;
    background-image: repeating-linear-gradient(
      -55deg, transparent, transparent 30px,
      rgba(255,255,255,0.04) 30px, rgba(255,255,255,0.04) 31px
    );
  }
  .ft-band-inner {
    position: relative; z-index: 1;
    max-width: 1200px; margin: 0 auto; padding: 0 24px;
    display: flex; justify-content: space-between; align-items: center;
    gap: 24px; flex-wrap: wrap;
  }
  .ft-band-left { display: flex; flex-direction: column; gap: 2px; }
  .ft-band-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 22px; font-weight: 800; color: white;
    text-transform: uppercase; letter-spacing: 0.02em;
  }
  .ft-band-sub { font-size: 13px; color: rgba(255,255,255,0.75); }
  .ft-band-btn {
    display: inline-flex; align-items: center; gap: 7px;
    background: var(--navy); color: white;
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px; font-weight: 600;
    padding: 11px 22px; border-radius: 6px;
    text-decoration: none; white-space: nowrap;
    transition: background 0.18s, transform 0.18s;
    flex-shrink: 0;
  }
  .ft-band-btn:hover { background: #0a1628; transform: translateY(-1px); }

  /* ── MAIN FOOTER ── */
  .ft-main { padding: 72px 0 52px; }
  .ft-main-inner {
    max-width: 1200px; margin: 0 auto; padding: 0 24px;
    display: grid;
    grid-template-columns: 1.6fr 1fr 1fr 1.4fr;
    gap: 52px;
  }

  /* Column headers */
  .ft-col-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 14px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.12em;
    color: var(--accent); margin-bottom: 20px;
    display: flex; align-items: center; gap: 8px;
  }
  .ft-col-title::after {
    content: '';
    flex: 1; height: 1px;
    background: var(--ft-border);
  }

  /* Logo col */
  .ft-logo {
    display: flex; align-items: center; gap: 12px;
    text-decoration: none; margin-bottom: 18px;
  }
  .ft-logo-mark {
    width: 46px; height: 46px; border-radius: 8px;
    background: var(--ft-surface);
    border: 1px solid var(--ft-border);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; position: relative; overflow: hidden;
  }
  .ft-logo-mark::after {
    content: '';
    position: absolute; bottom: 0; left: 0;
    width: 100%; height: 3px; background: var(--accent);
  }
  .ft-logo-letters {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 20px; font-weight: 800; color: white; line-height: 1;
  }
  .ft-logo-name {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 19px; font-weight: 800; color: white;
    text-transform: uppercase; letter-spacing: 0.02em; line-height: 1.1;
  }
  .ft-logo-sub { font-size: 11px; color: var(--ft-text); letter-spacing: 0.04em; }

  .ft-about { font-size: 13.5px; line-height: 1.72; margin-bottom: 22px; }

  /* Socials */
  .ft-socials { display: flex; gap: 10px; }
  .ft-social {
    width: 38px; height: 38px; border-radius: 7px;
    background: var(--ft-surface); border: 1px solid var(--ft-border);
    display: flex; align-items: center; justify-content: center;
    color: var(--ft-text); text-decoration: none;
    transition: background 0.18s, color 0.18s, border-color 0.18s;
  }
  .ft-social:hover { background: var(--accent); color: white; border-color: var(--accent); }
  .ft-social svg { width: 16px; height: 16px; }

  /* Link lists */
  .ft-link-list { display: flex; flex-direction: column; gap: 2px; }
  .ft-link {
    display: flex; align-items: center; gap: 8px;
    font-size: 13.5px; color: var(--ft-text);
    text-decoration: none; padding: 5px 0;
    transition: color 0.18s; border-bottom: 1px solid transparent;
  }
  .ft-link:hover { color: var(--ft-text-hover); }
  .ft-link svg { width: 13px; height: 13px; color: var(--accent); flex-shrink: 0; opacity: 0.7; transition: opacity 0.18s; }
  .ft-link:hover svg { opacity: 1; }

  /* Contact items */
  .ft-contact-list { display: flex; flex-direction: column; gap: 16px; }
  .ft-contact-item { display: flex; align-items: flex-start; gap: 12px; }
  .ft-contact-ico {
    width: 32px; height: 32px; border-radius: 6px;
    background: var(--ft-surface); border: 1px solid var(--ft-border);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; margin-top: 1px;
  }
  .ft-contact-ico svg { width: 14px; height: 14px; color: var(--accent); }
  .ft-contact-text { font-size: 13px; line-height: 1.65; }
  .ft-contact-text a { color: var(--ft-text); text-decoration: none; transition: color 0.18s; }
  .ft-contact-text a:hover { color: var(--ft-text-hover); }

  /* ── DIVIDER ── */
  .ft-divider {
    max-width: 1200px; margin: 0 auto;
    height: 1px; background: var(--ft-border);
    margin-left: 24px; margin-right: 24px;
  }

  /* ── BOTTOM BAR ── */
  .ft-bottom { padding: 20px 0; }
  .ft-bottom-inner {
    max-width: 1200px; margin: 0 auto; padding: 0 24px;
    display: flex; justify-content: space-between; align-items: center;
    gap: 16px; flex-wrap: wrap;
  }
  .ft-copy { font-size: 12.5px; color: var(--ft-text); }
  .ft-copy span { color: var(--accent); font-weight: 600; }
  .ft-legal { display: flex; gap: 20px; }
  .ft-legal a {
    font-size: 12px; color: var(--ft-text); text-decoration: none;
    transition: color 0.18s;
  }
  .ft-legal a:hover { color: var(--ft-text-hover); }

  /* ── RESPONSIVE ── */
  @media (max-width: 1024px) {
    .ft-main-inner { grid-template-columns: 1fr 1fr; gap: 40px; }
  }
  @media (max-width: 640px) {
    .ft-main-inner { grid-template-columns: 1fr; gap: 32px; }
    .ft-main { padding: 48px 0 36px; }
    .ft-band-inner { flex-direction: column; align-items: flex-start; }
    .ft-bottom-inner { flex-direction: column; align-items: flex-start; gap: 10px; }
    .ft-band-title { font-size: 18px; }
  }
`;

export default function Footer() {
  return (
    <>
      <style>{CSS}</style>
      <footer className="ft-root">

        {/* ── CTA BAND ── */}
        <div className="ft-band">
          <div className="ft-band-inner">
            <div className="ft-band-left">
              <div className="ft-band-title">Start Your Project Today</div>
              <div className="ft-band-sub">Get a free quote from our expert fabrication team</div>
            </div>
            <Link to="/contact" className="ft-band-btn">
              Get Free Quote <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* ── MAIN ── */}
        <div className="ft-main">
          <div className="ft-main-inner">

            {/* Company */}
            <div>
              <Link to="/" className="ft-logo">
                <div className="ft-logo-mark">
                  <span className="ft-logo-letters">MK</span>
                </div>
                <div>
                  <div className="ft-logo-name">Malik Fabrication</div>
                  <div className="ft-logo-sub">Est. 2008 &nbsp;·&nbsp; Gurugram</div>
                </div>
              </Link>
              <p className="ft-about">
                Your trusted partner for professional metal fabrication and welding services
                in Gurgaon. Precision craftsmanship, on-time delivery, since 2008.
              </p>
              <div className="ft-socials">
                {socialLinks.map((s, i) => (
                  <a key={i} href={s.href} className="ft-social" aria-label={s.label}>
                    <s.icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div className="ft-col-title">Quick Links</div>
              <ul className="ft-link-list">
                {quickLinks.map((link, i) => (
                  <li key={i}>
                    <Link to={link.path} className="ft-link">
                      <ChevronRight /> {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <div className="ft-col-title">Services</div>
              <ul className="ft-link-list">
                {services.map((s, i) => (
                  <li key={i}>
                    <Link to="/services" className="ft-link">
                      <ChevronRight /> {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <div className="ft-col-title">Contact</div>
              <div className="ft-contact-list">
                <div className="ft-contact-item">
                  <div className="ft-contact-ico"><MapPin /></div>
                  <div className="ft-contact-text">
                    663/25 Arjun Nagar, Street No. 8<br />
                    Near Police Chowki, Gurugram
                  </div>
                </div>
                <div className="ft-contact-item">
                  <div className="ft-contact-ico"><Phone /></div>
                  <div className="ft-contact-text">
                    <a href="tel:+917838170214">+91 78381 70214</a><br />
                    <a href="tel:+918383928255">+91 83839 28255</a>
                  </div>
                </div>
                <div className="ft-contact-item">
                  <div className="ft-contact-ico"><Mail /></div>
                  <div className="ft-contact-text">
                    <a href="mailto:info@mkfabrication.com">info@mkfabrication.com</a>
                  </div>
                </div>
                <div className="ft-contact-item">
                  <div className="ft-contact-ico"><Clock /></div>
                  <div className="ft-contact-text">
                    Mon – Sat: 8:00 AM – 6:00 PM<br />
                    Sunday: Closed
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="ft-divider" />
        <div className="ft-bottom">
          <div className="ft-bottom-inner">
            <p className="ft-copy">
              © {new Date().getFullYear()} <span>Malik Fabrication</span>. All rights reserved.
            </p>
            <div className="ft-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Sitemap</a>
            </div>
          </div>
        </div>

      </footer>
    </>
  );
}