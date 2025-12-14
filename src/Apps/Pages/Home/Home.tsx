import { motion } from "framer-motion";
import {  useState } from "react";
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Building2, 
  Phone, 
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  Award,
  CheckCircle
} from "lucide-react";

const services = [
  { 
    title: "Metal Fabrication", 
    desc: "Custom metal structures & components",
    icon: Shield,
    features: ["Custom Designs", "Precision Cutting", "Assembly"]
  },
  { 
    title: "Welding Services", 
    desc: "High-strength industrial welding",
    icon: Zap,
    features: ["MIG/TIG Welding", "Structural Welding", "Quality Assurance"]
  },
  { 
    title: "Industrial Sheds", 
    desc: "Heavy-duty shed fabrication",
    icon: Building2,
    features: ["Steel Structures", "Weatherproof", "Custom Sizes"]
  },
];

const projects = [
  {
    title: "Industrial Shed",
    category: "Commercial",
    img: "https://5.imimg.com/data5/XE/CW/MY-3027136/industrial-shed-fabrication-services.jpg",
  },
  {
    title: "Precision Welding",
    category: "Industrial",
    img: "https://thumbs.dreamstime.com/b/welders-were-welding-steel-structural-arc-welding-welders-were-welding-steel-structural-arc-welding-steel-structure-111647567.jpg",
  },
  {
    title: "Custom Metal Works",
    category: "Residential",
    img: "https://www.finisharchitectural.co.uk/wp-content/uploads/2024/02/Untitled-design-2024-02-22T100907.399.png",
  },
];

const specializations = [
  "Fancy Gates & Grills",
  "Security Railings",
  "Rolling Shutters",
  "Channel Gates",
  "Section Windows",
  "Industrial Sheds",
  "Structural Fabrication",
  "Custom Metal Artwork"
];

export default function Home() {
  const [hoveredService, setHoveredService] = useState(null);

  return (
    <div className="bg-gray-900 text-white">
      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <img 
            src="https://www.codinter.com/en/wp-content/uploads/sites/2/2023/03/BLOG-032223-EN-Large-scale-welding-projects-How-to-do-them-efficiently.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-gray-900" />
          {/* Animated Sparks */}
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-[2px] h-8 bg-amber-500/30"
                initial={{ y: -100, x: Math.random() * 100 + "%" }}
                animate={{ 
                  y: "100vh",
                  transition: {
                    duration: 2,
                    delay: i * 0.5,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-6xl mx-auto"
        >
          {/* Logo/Branding */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mb-8"
          >
         
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                Malik
              </span>{" "}
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Fabrication
              </span>
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl font-light text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Precision Metalwork & Industrial Solutions
          </motion.p>

          {/* Main Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-gray-800 shadow-2xl mb-10"
          >
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Left Column */}
              <div className="text-left">
                <div className="flex items-center gap-3 mb-6">
                  <Award className="w-6 h-6 text-amber-500" />
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                    Reliable Fabrication & Welding Solutions
                  </h2>
                </div>
                
                <p className="text-gray-300 mb-6 text-lg">
                  With years of expertise in metal fabrication, we deliver durable, 
                  high-quality solutions for residential, commercial, and industrial needs.
                </p>

                <div className="flex items-center gap-4 text-gray-400 mb-6">
                  <CheckCircle className="w-5 h-5 text-amber-500" />
                  <span className="text-sm">Quality Certified</span>
                  <CheckCircle className="w-5 h-5 text-amber-500" />
                  <span className="text-sm">Timely Delivery</span>
                  <CheckCircle className="w-5 h-5 text-amber-500" />
                  <span className="text-sm">Competitive Pricing</span>
                </div>
              </div>

              {/* Right Column */}
              <div className="text-left">
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="w-6 h-6 text-amber-500" />
                  <h3 className="text-xl font-semibold">Our Specializations</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {specializations.slice(0, 6).map((item, index) => (
                    <div key={index} className="flex items-center gap-2 group">
                      <ChevronRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
                      <span className="text-gray-300 text-sm group-hover:text-amber-400 transition-colors">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
                
                <p className="text-amber-400 font-medium">
                  + Custom Fabrication & All Metal Items
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <button className="group relative bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105">
              <span className="flex items-center gap-3">
                Get Your Free Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 rounded-xl border-2 border-amber-400/50 animate-pulse group-hover:animate-none" />
            </button>
            
            {/* Contact Info */}
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-gray-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+91 7838170214</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@malikfabrication.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Mon-Sat: 9AM-7PM</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Expert</span> Services
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Comprehensive metal fabrication solutions tailored to your specific requirements
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  whileHover={{ y: -10 }}
                  // onMouseEnter={() => setHoveredService(i)}
                  onMouseLeave={() => setHoveredService(null)}
                  className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-amber-500/30 transition-all duration-300"
                >
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center transition-all duration-300 ${
                    hoveredService === i 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600' 
                      : 'bg-gray-800'
                  }`}>
                    <Icon className={`w-8 h-8 transition-colors duration-300 ${
                      hoveredService === i ? 'text-black' : 'text-amber-500'
                    }`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-amber-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-6">
                    {service.desc}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Hover Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Projects</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Showcasing our expertise through quality craftsmanship
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.img}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-amber-500/90 text-black text-sm font-semibold rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-amber-400 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Various Locations</span>
                  </div>
                </div>

                {/* View Project Button */}
                <div className="absolute bottom-6 right-6">
                  <button className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110">
                    <ArrowRight className="w-5 h-5 text-black" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button className="px-8 py-3 border-2 border-gray-800 hover:border-amber-500 rounded-xl text-gray-300 hover:text-amber-400 transition-all duration-300 group">
              <span className="flex items-center gap-2">
                View All Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}