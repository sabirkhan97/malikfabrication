
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white border-t border-amber-500/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              <span className="text-amber-400">Malik</span> Fabrication
            </h3>
            <p className="text-gray-400">
              Providing premium industrial fabrication solutions with precision and excellence.
            </p>
            {/* <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-400 transition">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition">
                <FaLinkedin className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition">
                <FaInstagram className="text-xl" />
              </a>
            </div> */}
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-amber-400">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition">Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition">Projects</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-amber-400">Our Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition">Metal Fabrication</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition">Welding Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition">CNC Machining</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition">Industrial Maintenance</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition">Custom Solutions</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-amber-400">Contact Us</h4>
            <address className="text-gray-400 not-italic">
              <p className="mb-2">663/25 Arjun Nagar</p>
              <p className="mb-2">Near police Chowki street No.8</p>
              <p className="mb-2">Haryana Gururam, India</p>
              <p className="mb-2">Phone: +91 7838170214</p>
              <p className="mb-2">Email: info@mkfabrication.com</p>
            </address>
          </div>
        </div>

        <div className="border-t border-amber-500/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Malik Fabrication. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-amber-400 text-sm transition">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-amber-400 text-sm transition">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-amber-400 text-sm transition">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;