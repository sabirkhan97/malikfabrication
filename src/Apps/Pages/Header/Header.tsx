import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg py-3'
          : 'bg-white/95 backdrop-blur-sm py-4'
      }`}
    >
      {/* Top Bar */}
      <div className="hidden lg:block bg-[#1e40af] text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <a
                href="tel:+917838170214"
                className="flex items-center gap-2 hover:text-blue-200 transition-colors"
              >
                <Phone size={14} />
                +91 78381 70214
              </a>
              <a
                href="mailto:info@mkfabrication.com"
                className="flex items-center gap-2 hover:text-blue-200 transition-colors"
              >
                <Mail size={14} />
                info@mkfabrication.com
              </a>
            </div>
            <div className="text-blue-200 text-sm">
              Mon - Sat: 8:00 AM - 6:00 PM
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#1e40af] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">MK</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Malik Fabrication</h1>
              <p className="text-xs text-gray-500 -mt-1">Est. 2008 • Gurugram</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors relative ${
                  location.pathname === link.path
                    ? 'text-[#e05a00]'
                    : 'text-gray-700 hover:text-[#e05a00]'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#e05a00] rounded-full" />
                )}
              </Link>
            ))}
            <a
              href="tel:+917838170214"
              className="bg-[#e05a00] hover:bg-[#f97316] text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
            >
              Get Quote
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[120px] bg-white z-40">
          <nav className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg font-medium py-3 px-4 rounded-lg ${
                  location.pathname === link.path
                    ? 'bg-blue-50 text-[#e05a00]'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="tel:+917838170214"
              className="bg-[#e05a00] text-white text-center py-3 px-4 rounded-lg font-medium mt-4"
            >
              Get Quote
            </a>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <a
                href="tel:+917838170214"
                className="flex items-center gap-3 text-gray-600 py-2"
              >
                <Phone size={18} />
                +91 78381 70214
              </a>
              <a
                href="mailto:info@mkfabrication.com"
                className="flex items-center gap-3 text-gray-600 py-2"
              >
                <Mail size={18} />
                info@mkfabrication.com
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

