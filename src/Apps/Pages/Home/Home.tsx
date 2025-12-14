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

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="text-amber-400">Malik</span>{" "}
              <span className="text-gray-200">Fabrication</span>
            </h1>

            <p className="mt-6 max-w-2xl text-xl text-gray-300">
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
              <button className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-8 py-4 rounded-xl flex items-center gap-3 transition">
                Get Free Quote
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-5 h-5 text-amber-400" />
                +91 7838170214
              </div>
            </div>

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
