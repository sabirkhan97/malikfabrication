import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, ArrowRight } from 'lucide-react';

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

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#e05a00] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">MK</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Malik Fabrication</h3>
                <p className="text-gray-400 text-sm">Est. 2008 • Gurugram</p>
              </div>
            </Link>
            <p className="text-gray-400 mb-6">
              Your trusted partner for professional metal fabrication and welding services in Gurgaon.
              Quality craftsmanship since 2008.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#e05a00] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-[#e05a00] transition-colors flex items-center gap-2"
                  >
                    <ArrowRight size={14} className="text-[#e05a00]" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to="/services"
                    className="text-gray-400 hover:text-[#e05a00] transition-colors flex items-center gap-2"
                  >
                    <ArrowRight size={14} className="text-[#e05a00]" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#e05a00] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  663/25 Arjun Nagar, Street No. 8<br />
                  Near Police Chowki, Gurugram
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#e05a00] flex-shrink-0" />
                <div className="text-gray-400">
                  <a href="tel:+917838170214" className="hover:text-[#e05a00] transition-colors">
                    +91 78381 70214
                  </a>
                  <br />
                  <a href="tel:+918383928255" className="hover:text-[#e05a00] transition-colors">
                    +91 83839 28255
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#e05a00] flex-shrink-0" />
                <a
                  href="mailto:info@mkfabrication.com"
                  className="text-gray-400 hover:text-[#e05a00] transition-colors"
                >
                  info@mkfabrication.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#e05a00] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  Mon - Sat: 8:00 AM - 6:00 PM<br />
                  Sunday: Closed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Malik Fabrication. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-[#e05a00] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-[#e05a00] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-[#e05a00] transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

