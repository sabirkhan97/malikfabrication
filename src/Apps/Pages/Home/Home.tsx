import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Shield, Zap, Award, Clock, Users, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Shield,
    title: 'Quality Assurance',
    description: 'Every project undergoes rigorous quality checks to ensure precision and durability.',
  },
  {
    icon: Zap,
    title: 'Fast Turnaround',
    description: 'On-time delivery with efficient project management and skilled workforce.',
  },
  {
    icon: Award,
    title: 'Expert Craftsmanship',
    description: '15+ years of experience in metal fabrication and welding services.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock customer support for all your fabrication needs.',
  },
];

const services = [
  {
    title: 'Metal Fabrication',
    description: 'Custom-built metal structures with precision finishing for industrial and commercial applications.',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600',
  },
  {
    title: 'Welding Services',
    description: 'Professional MIG & TIG welding with certified welders and quality assurance.',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600',
  },
  {
    title: 'Industrial Sheds',
    description: 'Durable steel sheds designed and fabricated to meet your specifications.',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600',
  },
  {
    title: 'Gates & Railings',
    description: 'Elegant and secure gates, grills, and railings for residential and commercial.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
  },
];

const stats = [
  { value: '15+', label: 'Years Experience', icon: Clock },
  { value: '500+', label: 'Projects Completed', icon: Wrench },
  { value: '300+', label: 'Happy Clients', icon: Users },
  { value: '100%', label: 'Quality Guaranteed', icon: Award },
];

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-10 w-96 h-96 bg-blue-100 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-orange-100 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 text-[#1e40af] px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-[#e05a00] rounded-full animate-pulse" />
                Best Fabrication Services in Gurgaon
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Precision Metal{' '}
                <span className="text-[#1e40af]">Fabrication</span>{' '}
                & Welding Solutions
              </h1>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Malik Fabrication - Your trusted partner for professional metal fabrication,
                welding, and structural steel work. Quality craftsmanship since 2008.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-[#e05a00] hover:bg-[#f97316] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Get Free Quote
                  <ArrowRight size={20} />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 border-2 border-[#1e40af] text-[#1e40af] hover:bg-[#1e40af] hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Our Services
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-200">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="text-center"
                  >
                    <stat.icon className="w-6 h-6 mx-auto text-[#e05a00] mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - Image Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&h=300&fit=crop"
                    alt="Metal Fabrication"
                    className="rounded-2xl shadow-xl w-full h-48 object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=250&fit=crop"
                    alt="Welding"
                    className="rounded-2xl shadow-xl w-full h-40 object-cover"
                  />
                </div>
                <div className="space-y-4 pt-8">
                  <img
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop"
                    alt="Gates"
                    className="rounded-2xl shadow-xl w-full h-40 object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop"
                    alt="Industrial"
                    className="rounded-2xl shadow-xl w-full h-48 object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-[#1e40af]">Malik Fabrication</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We combine traditional craftsmanship with modern engineering to deliver
              exceptional fabrication services that stand the test of time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-[#1e40af]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Our <span className="text-[#e05a00]">Services</span>
              </h2>
              <p className="text-gray-600">
                Comprehensive fabrication solutions for every need
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-[#1e40af] font-semibold hover:gap-3 transition-all"
            >
              View All Services
              <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1 text-[#e05a00] font-medium text-sm hover:gap-2 transition-all"
                  >
                    Learn More <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
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
              Ready to Start Your Project?
            </h2>
            <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and quote. Our team is ready
              to bring your vision to life with quality craftsmanship.
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

      {/* Trust Badges */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              'ISO 9001 Certified',
              '15+ Years Experience',
              '500+ Projects',
              '100% Satisfaction',
            ].map((badge, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-3 bg-white px-6 py-4 rounded-xl shadow"
              >
                <CheckCircle className="w-6 h-6 text-[#e05a00]" />
                <span className="font-semibold text-gray-800">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

