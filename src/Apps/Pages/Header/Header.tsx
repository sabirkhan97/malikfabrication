import { useState, useRef, forwardRef, useEffect, useCallback } from 'react';
import type { Ref } from 'react';
import { Menu, Phone, X } from 'lucide-react';

interface HeaderProps {
  homeRef: Ref<HTMLDivElement>;
  servicesRef: Ref<HTMLDivElement>;
  aboutRef: Ref<HTMLDivElement>;
  contactRef: Ref<HTMLDivElement>;
}

const Header = forwardRef<HTMLDivElement, HeaderProps>(({ homeRef, servicesRef, aboutRef, contactRef }, ref) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const scrollToSection = useCallback((ref: Ref<HTMLDivElement>, section: string) => {
    setActiveLink(section);
    setIsMenuOpen(false);

    if (ref && 'current' in ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  const navItems = [
    { name: 'Home', ref: homeRef, id: 'home' },
    { name: 'Services', ref: servicesRef, id: 'services' },
    { name: 'About', ref: aboutRef, id: 'about' },
    { name: 'Contact', ref: contactRef, id: 'contact' },
  ];

  return (
    <header
      ref={ref}
      className={`fixed top-0 min-w-screen z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-sm'
        : 'bg-white'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollToSection(homeRef, 'home')}
            className="flex items-center space-x-2 group"
          >
            {/* <div className="w-14 h-14 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200"> */}
            {/* <img src='src/Apps/Pages/Header/MkLogo.png' alt='logo' className='rounded-full h-13 ' /> */}
            {/* </div> */}
            <span className="text-xl font-bold text-gray-900">
              Malik <span className="text-amber-600">Fabrication</span>
              <span> <div className="flex items-center gap-2">
                <a href="tel:+917838170214" className='flex items-center gap-3'>
                  <Phone className="w-6 h-6" />
                  <span>+91 7838170214</span>
                </a>
              </div></span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.ref, item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeLink === item.id
                  ? 'text-amber-600 bg-amber-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
              >
                {item.name}
              </button>
            ))}
            <a href="tel:+917838170214">
              <button className="ml-4 px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors duration-200">
                Get Quote
              </button>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200 absolute top-2 right-1"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="md:hidden bg-white border-t border-gray-100 min-w-screen"
        >
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.ref, item.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${activeLink === item.id
                  ? 'text-amber-600 bg-amber-50'
                  : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                {item.name}
              </button>
            ))}
            <a href="tel:+917838170214">
              <button className="w-full mt-2 px-4 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors duration-200">
                Get Quote
              </button>
            </a>

          </div>
        </div>
      )}
    </header>
  );
});

Header.displayName = 'Header';

export default Header;