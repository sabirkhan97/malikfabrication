import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, MapPin, Phone, Mail, Clock, Award, Users, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

const timeline = [
  { year: '2008', event: 'Founded', description: 'Started as a small fabrication workshop with two welders.' },
  { year: '2012', event: 'First Major Contract', description: 'Completed first large-scale industrial shed project.' },
  { year: '2018', event: 'Going Global', description: 'Expanded operations to serve international clients.' },
  { year: '2023', event: '25,000+ Projects', description: 'Hit major milestone with same commitment to quality.' },
];

const stats = [
  { value: '15+', label: 'Years in Business', icon: Clock },
  { value: '500+', label: 'Projects Done', icon: Wrench },
  { value: '300+', label: 'Happy Clients', icon: Users },
  { value: '100%', label: 'Client Satisfaction', icon: Award },
];

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-[#1e40af] px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-[#e05a00] rounded-full animate-pulse" />
              About Malik Fabrication
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Built on <span className="text-[#1e40af]">Steel</span> & <span className="text-[#e05a00]">Skill</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Since 2008, MK Fabrication has delivered precision metal work that holds up under
              real-world conditions — no corners cut, no compromises made.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#e05a00] hover:bg-[#f97316] text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Contact Us
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg text-center"
              >
                <stat.icon className="w-8 h-8 mx-auto text-[#e05a00] mb-4" />
                <div className="text-4xl font-bold text-[#1e40af] mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our <span className="text-[#e05a00]">Mission</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  We combine traditional craftsmanship with modern engineering to build metal
                  structures that last decades, not years. Every weld is laid with intent.
                </p>
                <p>
                  Every project gets the same attention — whether it's a single bracket or a
                  full structural build. Transparency, quality, and your satisfaction aren't
                  slogans here. They're how we operate.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Quality Craftsmanship',
                  'Modern Equipment',
                  'Skilled Workforce',
                  'Timely Delivery',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#1e40af]" />
                    <span className="font-medium text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600"
                alt="Our Workshop"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute bottom-6 right-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-[#1e40af]">Est. 2008</div>
                <div className="text-gray-600">Gurugram, Haryana</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-[#1e40af]">Journey</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From humble beginnings to becoming a trusted name in fabrication
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#1e40af] via-[#e05a00] to-[#1e40af]" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg inline-block">
                      <div className="text-3xl font-bold text-[#e05a00] mb-2">{item.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.event}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:block w-4 h-4 bg-[#e05a00] rounded-full shadow-lg z-10" />
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
            >
              <MapPin className="w-10 h-10 text-[#e05a00] mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Workshop Location</h3>
              <p className="text-gray-600">
                663/25 Arjun Nagar, Street No. 8<br />
                Near Police Chowki<br />
                Gurugram, Haryana
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
            >
              <Phone className="w-10 h-10 text-[#e05a00] mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600">
                +91 78381 70214<br />
                +91 83839 28255<br />
                +91 92893 77069
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
            >
              <Clock className="w-10 h-10 text-[#e05a00] mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Working Hours</h3>
              <p className="text-gray-600">
                Monday - Saturday<br />
                8:00 AM - 6:00 PM<br />
                Sunday: Closed
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1e40af]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Let's Work Together
            </h2>
            <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
              Ready to start your project? Get in touch with us today for a free consultation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="bg-[#e05a00] hover:bg-[#f97316] text-white px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Get In Touch
              </Link>
              <a
                href="tel:+917838170214"
                className="bg-white text-[#1e40af] hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Call: +91 78381 70214
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

