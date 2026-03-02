import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Flame, Wrench, Shield, Building2, Hammer, DoorOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: Flame,
    title: 'Custom Fabrication',
    description: 'From raw steel to finished structure — we build exactly what your project demands with zero compromise on quality.',
    features: ['Structural steel fabrication', 'Custom brackets & mounts', 'Prototype to production runs'],
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600',
  },
  {
    icon: Wrench,
    title: 'MIG & TIG Welding',
    description: 'Precision arc welding for every material and application. Clean beads, full penetration, every pass certified.',
    features: ['Stainless, aluminum, carbon steel', 'Certified welders on staff', 'Pressure vessel rated'],
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600',
  },
  {
    icon: Building2,
    title: 'Industrial Sheds',
    description: 'Durable steel sheds for industrial applications. Built to last with quality materials and expert craftsmanship.',
    features: ['Heavy steel construction', 'Weatherproof designs', 'Custom sizes available'],
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600',
  },
  {
    icon: DoorOpen,
    title: 'Gates & Grills',
    description: 'Elegant and secure gates, rolling shutters, and security grills for residential and commercial properties.',
    features: ['Fancy gates & grills', 'Channel gates', 'Security railings'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
  },
  {
    icon: Shield,
    title: 'Repair & Restoration',
    description: 'Professional repair services for damaged metal structures, equipment, and machinery.',
    features: ['Heavy equipment repair', 'Farm & ag machinery', 'Emergency turnaround'],
    image: 'https://images.unsplash.com/photo-1535963231606-77a38f58abf4?w=600',
  },
  {
    icon: Hammer,
    title: 'Structural Fabrication',
    description: 'Complete structural steel solutions for buildings, warehouses, and industrial facilities.',
    features: ['Steel structures', 'Steel balconies', 'Custom metal artwork'],
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600',
  },
];

const whyChooseUs = [
  '15+ Years of Experience',
  'Certified Professional Welders',
  'Quality Assurance Guaranteed',
  'On-Time Project Delivery',
  'Competitive Pricing',
  '24/7 Customer Support',
];

export default function Services() {
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
              Professional Fabrication Services
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="text-[#e05a00]">Services</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              We offer comprehensive metal fabrication and welding services tailored to meet
              your specific requirements. From custom fabrication to industrial installations.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#e05a00] hover:bg-[#f97316] text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Get Free Quote
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
              >
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-[#e05a00] rounded-xl flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-[#e05a00] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose <span className="text-[#1e40af]">Malik Fabrication</span>
              </h2>
              <p className="text-gray-600 mb-8">
                With over 15 years of experience in the fabrication industry, we have built
                a reputation for excellence, quality, and reliability. Our commitment to
                customer satisfaction sets us apart from the competition.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {whyChooseUs.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#e05a00] flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{item}</span>
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
                alt="Quality Fabrication"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#1e40af] text-white p-6 rounded-xl shadow-xl">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-blue-200">Years of Excellence</div>
              </div>
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
              Need a Custom Fabrication Solution?
            </h2>
            <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your project requirements. Our team will provide
              you with a competitive quote and timeline.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="bg-[#e05a00] hover:bg-[#f97316] text-white px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Get Free Quote
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

