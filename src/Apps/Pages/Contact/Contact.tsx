import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ArrowRight } from 'lucide-react';
import { supabase } from './supabase';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Workshop Location',
    details: ['663/25 Arjun Nagar, Street No. 8', 'Near Police Chowki', 'Gurugram, Haryana'],
    action: { text: 'Get Directions', href: 'https://maps.google.com' },
    accent: true,
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+91 78381 70214', '+91 83839 28255', '+91 92893 77069'],
    action: { text: 'Call Now', href: 'tel:+917838170214' },
    accent: false,
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['info@mkfabrication.com', 'sales@mkfabrication.com'],
    action: { text: 'Send Email', href: 'mailto:info@mkfabrication.com' },
    accent: false,
  },
  {
    icon: Clock,
    title: 'Working Hours',
    details: ['Monday – Saturday', '8:00 AM – 6:00 PM', 'Sunday: Closed'],
    action: null,
    accent: false,
  },
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

  .ct-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .ct-root { font-family: 'DM Sans', sans-serif; color: var(--text); background: var(--white); }
  .ct-root h1, .ct-root h2, .ct-root h3, .ct-root h4 { font-family: 'Barlow Condensed', sans-serif; }

  /* ── HERO ── */
  .ct-hero {
    position: relative;
    padding: 120px 0 80px;
    background: var(--white);
    overflow: hidden;
  }
  .ct-hero-bar {
    position: absolute; left: 0; top: 0;
    width: 5px; height: 100%;
    background: linear-gradient(to bottom, var(--accent), var(--blue));
  }
  .ct-hero-stripe {
    position: absolute; top: 0; right: 0;
    width: 44%; height: 100%;
    background: var(--steel);
    clip-path: polygon(12% 0, 100% 0, 100% 100%, 0% 100%);
  }
  .ct-hero-dots {
    position: absolute; top: 0; right: 0;
    width: 44%; height: 100%;
    background-image: radial-gradient(circle, #c0cde8 1px, transparent 1px);
    background-size: 26px 26px;
    opacity: 0.42;
    clip-path: polygon(12% 0, 100% 0, 100% 100%, 0% 100%);
  }
  .ct-hero-inner {
    position: relative; z-index: 1;
    max-width: 1200px; margin: 0 auto; padding: 0 24px;
  }
  .ct-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    background: #fff8f4; border: 1px solid #fdd0b0;
    color: var(--accent); font-size: 11px; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase;
    padding: 6px 14px; border-radius: 4px; margin-bottom: 20px;
  }
  .ct-eyebrow-dot {
    width: 6px; height: 6px; background: var(--accent);
    border-radius: 50%; animation: ct-pulse 1.5s infinite;
  }
  @keyframes ct-pulse {
    0%,100%{ opacity:1; transform:scale(1); }
    50%{ opacity:0.5; transform:scale(1.3); }
  }
  .ct-hero-title {
    font-size: clamp(50px, 6vw, 82px);
    font-weight: 800; color: var(--navy);
    text-transform: uppercase; line-height: 1.0;
    letter-spacing: -0.01em; margin-bottom: 18px;
  }
  .ct-title-solid { color: var(--blue); }
  .ct-title-outline { color: transparent; -webkit-text-stroke: 2.5px var(--navy); }
  .ct-hero-sub {
    font-size: 15.5px; color: var(--muted);
    line-height: 1.7; max-width: 500px;
  }

  /* ── MAIN SECTION ── */
  .ct-section { padding: 92px 0; }
  .ct-section-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
  .ct-main-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 52px;
    align-items: start;
  }

  /* ── FORM PANEL ── */
  .ct-form-panel {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 40px;
    box-shadow: 0 4px 24px rgba(15,31,61,0.07);
  }
  .ct-panel-tag {
    font-size: 10.5px; font-weight: 700;
    letter-spacing: 0.13em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 10px; display: block;
  }
  .ct-panel-title {
    font-size: 32px; font-weight: 800; color: var(--navy);
    text-transform: uppercase; line-height: 1.05;
    letter-spacing: -0.01em; margin-bottom: 6px;
  }
  .ct-panel-sub { font-size: 13.5px; color: var(--muted); margin-bottom: 32px; line-height: 1.6; }
  .ct-divider { width: 40px; height: 4px; background: var(--accent); border-radius: 2px; margin-bottom: 28px; }

  /* Form rows */
  .ct-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 18px; }
  .ct-form-row-full { margin-bottom: 18px; }
  .ct-field { display: flex; flex-direction: column; gap: 6px; }
  .ct-label {
    font-size: 11.5px; font-weight: 600; color: var(--navy);
    text-transform: uppercase; letter-spacing: 0.06em;
  }
  .ct-input, .ct-select, .ct-textarea {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; color: var(--text);
    background: var(--steel);
    border: 1.5px solid var(--border);
    border-radius: 7px;
    padding: 12px 14px;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
    width: 100%;
  }
  .ct-input::placeholder, .ct-textarea::placeholder { color: #a0aec0; }
  .ct-input:focus, .ct-select:focus, .ct-textarea:focus {
    border-color: var(--blue);
    background: var(--white);
    box-shadow: 0 0 0 3px rgba(26,58,107,0.08);
  }
  .ct-select { appearance: none; cursor: pointer; }
  .ct-textarea { resize: none; min-height: 120px; }

  .ct-submit {
    width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px;
    background: var(--accent); color: white;
    padding: 14px 20px; border-radius: 7px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px; font-weight: 600;
    border: none; cursor: pointer;
    transition: background 0.2s, transform 0.2s;
    margin-top: 8px;
  }
  .ct-submit:hover:not(:disabled) { background: var(--accent-light); transform: translateY(-1px); }
  .ct-submit:disabled { opacity: 0.65; cursor: not-allowed; }

  .ct-spinner {
    width: 18px; height: 18px;
    border: 2px solid rgba(255,255,255,0.4);
    border-top-color: white;
    border-radius: 50%;
    animation: ct-spin 0.7s linear infinite;
  }
  @keyframes ct-spin { to { transform: rotate(360deg); } }

  /* Success */
  .ct-success {
    display: flex; flex-direction: column; align-items: center;
    justify-content: center; text-align: center;
    padding: 48px 24px; gap: 14px;
  }
  .ct-success-ico { color: #16a34a; width: 56px; height: 56px; }
  .ct-success-title { font-family: 'Barlow Condensed', sans-serif; font-size: 28px; font-weight: 800; color: var(--navy); text-transform: uppercase; }
  .ct-success-sub { font-size: 14px; color: var(--muted); }

  /* ── INFO CARDS ── */
  .ct-info-stack { display: flex; flex-direction: column; gap: 16px; }

  .ct-info-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 22px 24px;
    display: flex; align-items: flex-start; gap: 16px;
    transition: box-shadow 0.22s, border-color 0.22s;
    position: relative; overflow: hidden;
  }
  .ct-info-card::before {
    content: ''; position: absolute; top: 0; left: 0;
    width: 4px; height: 100%;
    background: var(--accent);
    transform: scaleY(0); transform-origin: top;
    transition: transform 0.28s;
  }
  .ct-info-card:hover { box-shadow: 0 8px 28px rgba(15,31,61,0.09); border-color: #c8d3ea; }
  .ct-info-card:hover::before { transform: scaleY(1); }

  .ct-info-ico-wrap {
    width: 46px; height: 46px; border-radius: 9px;
    background: #e8eef9; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.22s;
  }
  .ct-info-card:hover .ct-info-ico-wrap { background: var(--accent); }
  .ct-info-ico-wrap svg { width: 20px; height: 20px; color: var(--blue); transition: color 0.22s; }
  .ct-info-card:hover .ct-info-ico-wrap svg { color: white; }

  .ct-info-body { flex: 1; }
  .ct-info-title { font-family: 'Barlow Condensed', sans-serif; font-size: 17px; font-weight: 700; color: var(--navy); text-transform: uppercase; letter-spacing: 0.03em; margin-bottom: 6px; }
  .ct-info-detail { font-size: 13.5px; color: var(--muted); line-height: 1.65; }
  .ct-info-action {
    display: inline-flex; align-items: center; gap: 5px;
    margin-top: 10px; color: var(--accent);
    font-size: 13px; font-weight: 600; text-decoration: none;
    transition: gap 0.18s;
  }
  .ct-info-action:hover { gap: 9px; }

  /* ── MAP ── */
  .ct-map-section { padding: 0 0 80px; }
  .ct-map-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
  .ct-map-hd { margin-bottom: 28px; }
  .ct-map-tag { font-size: 10.5px; font-weight: 700; letter-spacing: 0.13em; text-transform: uppercase; color: var(--accent); display: block; margin-bottom: 8px; }
  .ct-map-title { font-size: clamp(26px, 3vw, 38px); font-weight: 800; color: var(--navy); text-transform: uppercase; }
  .ct-map-wrap {
    border: 1px solid var(--border);
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 4px 24px rgba(15,31,61,0.08);
  }
  .ct-map-wrap iframe { display: block; width: 100%; height: 420px; border: none; }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .ct-main-grid { grid-template-columns: 1fr; gap: 40px; }
    .ct-hero-stripe, .ct-hero-dots { display: none; }
  }
  @media (max-width: 640px) {
    .ct-form-row { grid-template-columns: 1fr; }
    .ct-form-panel { padding: 26px 20px; }
    .ct-section { padding: 56px 0; }
    .ct-hero { padding: 100px 0 60px; }
    .ct-hero-title { font-size: 44px; }
    .ct-map-wrap iframe { height: 300px; }
  }
`;

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase
      .from("contact_requests")
      .insert([
        {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          project_details: formData.message || null,
        },
      ]);

    setIsLoading(false);

    if (error) {
      console.error("Insert error:", error);
      alert("Failed to send message");
      return;
    }

    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 3500);
  };;

  const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <>
      <style>{CSS}</style>
      <div className="ct-root">

        {/* ── HERO ── */}
        <section className="ct-hero">
          <div className="ct-hero-bar" />
          <div className="ct-hero-stripe" />
          <div className="ct-hero-dots" />
          <div className="ct-hero-inner">
            <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.52 }}>
              <div className="ct-eyebrow">
                <span className="ct-eyebrow-dot" />
                Get In Touch
              </div>
              <h1 className="ct-hero-title">
                Let's Talk<br />
                <span className="ct-title-solid">Your</span>{' '}
                <span className="ct-title-outline">Project</span>
              </h1>
              <p className="ct-hero-sub">
                Have a project in mind? Send us a message and we'll respond as soon as possible —
                typically within a few hours during business days.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── CONTACT MAIN ── */}
        <section className="ct-section">
          <div className="ct-section-inner">
            <div className="ct-main-grid">

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.52 }}
                viewport={{ once: true }}
              >
                <div className="ct-form-panel">
                  <span className="ct-panel-tag">Free Quote</span>
                  <h2 className="ct-panel-title">Send a Message</h2>
                  <div className="ct-divider" />

                  {isSubmitted ? (
                    <motion.div
                      className="ct-success"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <CheckCircle className="ct-success-ico" />
                      <div className="ct-success-title">Message Sent!</div>
                      <p className="ct-success-sub">Thank you for reaching out. We'll get back to you shortly.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="ct-form-row">
                        <div className="ct-field">
                          <label className="ct-label" htmlFor="name">Full Name *</label>
                          <input className="ct-input" type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Rahul Sharma" />
                        </div>
                        <div className="ct-field">
                          <label className="ct-label" htmlFor="email">Email Address *</label>
                          <input className="ct-input" type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="rahul@example.com" />
                        </div>
                      </div>

                      <div className="ct-form-row">
                        <div className="ct-field">
                          <label className="ct-label" htmlFor="phone">Phone Number</label>
                          <input className="ct-input" type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                        </div>
                        <div className="ct-field">
                          <label className="ct-label" htmlFor="service">Service Required</label>
                          <select className="ct-select" id="service" name="service" value={formData.service} onChange={handleChange}>
                            <option value="">Select a service</option>
                            <option value="fabrication">Metal Fabrication</option>
                            <option value="welding">Welding Services</option>
                            <option value="sheds">Industrial Sheds</option>
                            <option value="gates">Gates &amp; Grills</option>
                            <option value="repair">Repair &amp; Restoration</option>
                            <option value="structural">Structural Fabrication</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="ct-form-row-full ct-field">
                        <label className="ct-label" htmlFor="message">Project Details *</label>
                        <textarea className="ct-textarea" id="message" name="message" value={formData.message} onChange={handleChange} required placeholder="Tell us about your project — dimensions, materials, timeline, quantity..." />
                      </div>

                      <button type="submit" className="ct-submit" disabled={isLoading}>
                        {isLoading ? (
                          <><div className="ct-spinner" /> Sending…</>
                        ) : (
                          <><Send size={16} /> Send Message</>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>

              {/* Info Cards */}
              <motion.div
                className="ct-info-stack"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.52, delay: 0.12 }}
                viewport={{ once: true }}
              >
                {contactInfo.map((info, i) => (
                  <motion.div
                    className="ct-info-card"
                    key={i}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.38, delay: i * 0.07 }}
                    viewport={{ once: true }}
                  >
                    <div className="ct-info-ico-wrap">
                      <info.icon />
                    </div>
                    <div className="ct-info-body">
                      <div className="ct-info-title">{info.title}</div>
                      {info.details.map((d, di) => (
                        <div className="ct-info-detail" key={di}>{d}</div>
                      ))}
                      {info.action && (
                        <a href={info.action.href} className="ct-info-action">
                          {info.action.text} <ArrowRight size={13} />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── MAP ── */}
        <section className="ct-map-section">
          <div className="ct-map-inner">
            <div className="ct-map-hd">
              <span className="ct-map-tag">Find Us</span>
              <h2 className="ct-map-title">Our <span style={{ color: 'var(--accent)' }}>Workshop</span></h2>
              <div style={{ width: 44, height: 4, background: 'var(--accent)', borderRadius: 2, marginTop: 12 }} />
            </div>
            <div className="ct-map-wrap">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14012.566329!2d77.0188646!3d28.4580417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d194c86532c79%3A0x28811e37fa0d0a36!2sMalik%20Fabrication!5e0!3m2!1sen!2sin!4v1733740000000"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Malik Fabrication Location"
              />
            </div>
          </div>
        </section>

      </div>
    </>
  );
}