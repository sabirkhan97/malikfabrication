import { motion } from "framer-motion";
import {
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
    </div>
  );
}
