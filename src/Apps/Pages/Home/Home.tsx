import { motion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Zap,
  Building2,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  Award,
  ChevronRight,
  Wrench,
  DoorOpen,
  RectangleHorizontal,
  Warehouse,
  Hammer,
  Users,
  MapPin,
  Star,
  ArrowUpRight,
} from "lucide-react";

/* ---------------- DATA ---------------- */
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

const services = [
  {
    title: "Metal Fabrication",
    desc: "Custom-built metal structures with precision finishing.",
    icon: Shield,
    features: ["Custom Designs", "Precision Cutting", "Assembly"],
  },
  {
    title: "Welding Services",
    desc: "High-strength industrial and structural welding.",
    icon: Zap,
    features: ["MIG / TIG Welding", "Structural Welding", "QA Tested"],
  },
  {
    title: "Industrial Sheds",
    desc: "Durable steel sheds for industrial applications.",
    icon: Building2,
    features: ["Heavy Steel", "Weatherproof", "Custom Sizes"],
  },
];

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "500+", label: "Projects Completed" },
  { value: "300+", label: "Happy Clients" },
];

// SEO-rich service sections data
const weldingServicesGurgaon = {
  title: "Our Welding Services in Gurgaon",
  subtitle: "Professional Welding Solutions Across Gurgaon & NCR Region",
  description: "Malik Fabrication offers top-notch welding services in Gurgaon, delivering exceptional quality for industrial, commercial, and residential projects. Our skilled welders specialize in MIG, TIG, and arc welding techniques, ensuring strong and durable joints for all your metal fabrication needs. Whether you need structural welding, pipeline work, or custom fabrication, we bring expertise and precision to every project. Serving Gurgaon, Faridabad, Manesar, and all NCR areas with on-time delivery and competitive pricing.",
  features: [
    "MIG & TIG Welding Experts",
    "Structural & Industrial Welding",
    "Site Welding Services Available",
    "All Types of Metal Welding",
    "Quality Inspection & Testing",
    "Emergency Welding Repairs"
  ],
  cta: "Get Welding Quote",
  image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80"
};

const ironGateSection = {
  title: "Iron Gate Fabrication",
  subtitle: "Elegant & Secure Gate Solutions",
  description: "Transform your property with our premium iron gate fabrication services in Gurgaon. We design and manufacture stunning fancy gates, main gates, and entrance gates that combine aesthetic appeal with robust security. Our expert craftsmen create unique designs tailored to your preferences, from traditional ornamental gates to modern minimalist styles. Every gate is fabricated using high-grade iron with anti-corrosion treatment ensuring longevity. We serve residential complexes, commercial buildings, and industrial facilities across Gurgaon with professional installation services.",
  features: [
    "Custom Design Solutions",
    "Anti-Corrosion Treatment",
    "Automated Gate Systems",
    "Ornamental & Modern Designs",
    "Professional Installation",
    "Maintenance Services"
  ],
  cta: "Request Gate Quote",
  image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
};

const steelRailingSection = {
  title: "Steel Railing Work",
  subtitle: "Safety Meets Style",
  description: "Enhance safety and aesthetics with our professional steel railing work in Gurgaon. We specialize in balcony railings, staircase railings, terrace railings, and safety grills for both indoor and outdoor applications. Our railings are manufactured using premium-grade stainless steel and MS materials with precision welding and finishing. Available in various designs including glass panels, vertical bars, and contemporary patterns. Perfect for apartments, villas, commercial buildings, and industrial complexes throughout Gurgaon and nearby areas.",
  features: [
    "SS & MS Railing Systems",
    "Balcony & Staircase Railings",
    "Glass Panel Railings",
    "Safety Grill Installation",
    "Custom Design Options",
    "Durable Powder Coating"
  ],
  cta: "Get Railing Quote",
  image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
};

const metalShedSection = {
  title: "Metal Shed Construction",
  subtitle: "Industrial Strength Structures",
  description: "Build robust and reliable metal sheds with Malik Fabrication, your trusted partner for industrial shed construction in Gurgaon. We design and fabricate high-quality steel sheds, warehouse structures, factory buildings, and agricultural sheds tailored to your specific requirements. Our engineering team ensures structural integrity using premium-grade steel and proper Load calculations. From small storage sheds to large industrial complexes, we deliver turnkey solutions with roofing, siding, and ventilation systems. Serving manufacturing units, logistics companies, and farmers across Gurgaon NCR region.",
  features: [
    "Industrial Steel Sheds",
    "Warehouse Construction",
    "Factory Buildings",
    "Agricultural Sheds",
    "Pre-Engineered Buildings",
    "Turnkey Solutions"
  ],
  cta: "Discuss Your Project",
  image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
};

const repairWeldingSection = {
  title: "Repair Welding Services",
  subtitle: "Quick & Reliable Repairs",
  description: "When your metal structures need repairs, trust Malik Fabrication for fast and efficient repair welding services in Gurgaon. We offer comprehensive welding repair solutions including gate repairs, railing fixes, structural repairs, machinery maintenance, and emergency welding services. Our experienced technicians can handle on-site repairs at your location, minimizing downtime and inconvenience. We service all types of metal structures, from household items to industrial equipment. Available for urgent repairs across Gurgaon, providing quality workmanship and lasting solutions.",
  features: [
    "On-Site Repair Services",
    "Gate & Railing Repairs",
    "Structural Welding Repairs",
    "Machinery Maintenance",
    "24/7 Emergency Service",
    "Mobile Welding Unit"
  ],
  cta: "Call for Repair",
  image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&q=80"
};

/* ---------------- COMPONENT ---------------- */

export default function Home() {
  return (
    <div className="bg-[#0b0f14] text-white">
      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center">
        <img
          src="https://aaizahenterprises.in/default/1717409013.webp"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Fabrication Background"
        />
        <div className="absolute inset-0 bg-black/80" />

        <div className="relative z-10 md:max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-7xl w-full font-semibold leading-tight">
              <span className="text-amber-400">Malik</span>{" "}
              <span className="text-gray-200">Fabrication</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-gray-300">
              Precision Metal Fabrication & Welding Solutions for
              Residential, Commercial & Industrial Needs.
              All kinds of Fancy Gates & Grills,
              Security Railings,
              Rolling Shutters,
              Channel Gates,
              Section Windows,
              Industrial Sheds,
              Structural Fabrication,
              Custom Metal Artwork
            </p>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-6 mt-10">
              <a href="tel:+917838170214">
                <div className="flex items-center gap-3 text-gray-300 cursor-pointer">
                  <Phone className="w-5 h-5 text-amber-400" />
                  +91 7838170214
                </div>
              </a>
            </div>

            <h1 className="text-md w-full text-amber-400 mt-1">Best Welding & Fabrication Shop in Gurgaon</h1>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-6 mt-16 max-w-xl">
              {stats.map((s, i) => (
                <div key={i} className="border border-gray-800 rounded-xl p-4 text-center bg-white/5">
                  <p className="text-3xl font-bold text-amber-400">{s.value}</p>
                  <p className="text-sm text-gray-400 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="py-24 bg-gradient-to-b from-[#0b0f14] to-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              Our <span className="text-amber-400">Services</span>
            </h2>
            <p className="mt-4 text-gray-400">
              Reliable fabrication solutions built to last
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -8 }}
                  className="bg-white/5 border border-gray-800 rounded-2xl p-8 hover:border-amber-500/40 transition"
                >
                  <div className="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-amber-400" />
                  </div>

                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-400 mb-6">{service.desc}</p>

                  <ul className="space-y-2">
                    {service.features.map((f, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-amber-400" />
                        <span className="text-gray-300">{f}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= SEO SECTION: WELDING SERVICES GURGAON ================= */}
      <section className="py-24 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 text-amber-400 mb-4">
                <MapPin className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-wider">Gurgaon & NCR</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {weldingServicesGurgaon.title}
              </h2>
              <p className="text-lg text-amber-400 font-medium mb-6">
                {weldingServicesGurgaon.subtitle}
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                {weldingServicesGurgaon.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {weldingServicesGurgaon.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <a href="tel:+917838170214">
                <button className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-8 py-4 rounded-xl flex items-center gap-3 transition-all duration-300 hover:gap-4">
                  {weldingServicesGurgaon.cta}
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-amber-500/10 rounded-3xl blur-2xl"></div>
              <img
                src={weldingServicesGurgaon.image}
                alt="Welding Services in Gurgaon"
                className="relative rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-amber-500 text-black px-6 py-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <Wrench className="w-6 h-6" />
                  <div>
                    <p className="font-bold">15+ Years</p>
                    <p className="text-sm">Experience</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= SEO SECTION: IRON GATE FABRICATION ================= */}
      <section className="py-24 bg-gradient-to-b from-black to-[#0b0f14]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="absolute -inset-4 bg-blue-500/10 rounded-3xl blur-2xl"></div>
              <img
                src={ironGateSection.image}
                alt="Iron Gate Fabrication in Gurgaon"
                className="relative rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-blue-500 text-white px-6 py-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <DoorOpen className="w-6 h-6" />
                  <div>
                    <p className="font-bold">500+ Gates</p>
                    <p className="text-sm">Installed</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="flex items-center gap-2 text-blue-400 mb-4">
                <Star className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-wider">Premium Quality</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {ironGateSection.title}
              </h2>
              <p className="text-lg text-blue-400 font-medium mb-6">
                {ironGateSection.subtitle}
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                {ironGateSection.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {ironGateSection.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <a href="tel:+917838170214">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-4 rounded-xl flex items-center gap-3 transition-all duration-300 hover:gap-4">
                  {ironGateSection.cta}
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= SEO SECTION: STEEL RAILING WORK ================= */}
      <section className="py-24 bg-[#0b0f14]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 text-emerald-400 mb-4">
                <RectangleHorizontal className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-wider">Safety First</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {steelRailingSection.title}
              </h2>
              <p className="text-lg text-emerald-400 font-medium mb-6">
                {steelRailingSection.subtitle}
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                {steelRailingSection.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {steelRailingSection.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <a href="tel:+917838170214">
                <button className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold px-8 py-4 rounded-xl flex items-center gap-3 transition-all duration-300 hover:gap-4">
                  {steelRailingSection.cta}
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-emerald-500/10 rounded-3xl blur-2xl"></div>
              <img
                src={steelRailingSection.image}
                alt="Steel Railing Work in Gurgaon"
                className="relative rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-emerald-500 text-black px-6 py-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6" />
                  <div>
                    <p className="font-bold">100%</p>
                    <p className="text-sm">Safety Tested</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= SEO SECTION: METAL SHED CONSTRUCTION ================= */}
      <section className="py-24 bg-gradient-to-b from-[#0b0f14] to-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="absolute -inset-4 bg-orange-500/10 rounded-3xl blur-2xl"></div>
              <img
                src={metalShedSection.image}
                alt="Metal Shed Construction in Gurgaon"
                className="relative rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white px-6 py-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <Warehouse className="w-6 h-6" />
                  <div>
                    <p className="font-bold">200+</p>
                    <p className="text-sm">Projects Done</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="flex items-center gap-2 text-orange-400 mb-4">
                <Building2 className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-wider">Industrial Solutions</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {metalShedSection.title}
              </h2>
              <p className="text-lg text-orange-400 font-medium mb-6">
                {metalShedSection.subtitle}
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                {metalShedSection.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {metalShedSection.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-400 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <a href="tel:+917838170214">
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl flex items-center gap-3 transition-all duration-300 hover:gap-4">
                  {metalShedSection.cta}
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= SEO SECTION: REPAIR WELDING SERVICES ================= */}
      <section className="py-24 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 text-rose-400 mb-4">
                <Hammer className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-wider">Fast Repairs</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {repairWeldingSection.title}
              </h2>
              <p className="text-lg text-rose-400 font-medium mb-6">
                {repairWeldingSection.subtitle}
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                {repairWeldingSection.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {repairWeldingSection.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <a href="tel:+917838170214">
                <button className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-8 py-4 rounded-xl flex items-center gap-3 transition-all duration-300 hover:gap-4">
                  {repairWeldingSection.cta}
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-rose-500/10 rounded-3xl blur-2xl"></div>
              <img
                src={repairWeldingSection.image}
                alt="Repair Welding Services in Gurgaon"
                className="relative rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-rose-500 text-white px-6 py-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6" />
                  <div>
                    <p className="font-bold">24/7</p>
                    <p className="text-sm">Emergency Service</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= TRUST STRIP ================= */}
      <section className="py-16 bg-black border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <Award className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <p className="font-semibold">Quality Assured Work</p>
            <p className="text-sm text-gray-400 mt-1">Built to industry standards</p>
          </div>

          <div>
            <Clock className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <p className="font-semibold">On-Time Delivery</p>
            <p className="text-sm text-gray-400 mt-1">We respect your deadlines</p>
          </div>

          <div>
            <Mail className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <p className="font-semibold">Reliable Support</p>
            <p className="text-sm text-gray-400 mt-1">Clear communication always</p>
          </div>
        </div>
      </section>

      <section className="pb-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-center mb-8">Our Specializations</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {specializations.map((item, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 text-center border border-gray-800 hover:border-amber-500/30 transition-colors group"
              >
                <ChevronRight className="w-4 h-4 text-amber-500 inline-block mr-2 group-hover:translate-x-1 transition-transform" />
                <span className="text-sm text-gray-300 group-hover:text-amber-400 transition-colors">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
