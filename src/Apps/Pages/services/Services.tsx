import { motion } from "framer-motion";
import { Flame, Wrench, Shield } from "lucide-react";

const services = [
  {
    icon: Flame,
    label: "01",
    title: "Custom Fabrication",
    desc: "From raw steel to finished structure — we build exactly what your project demands, with zero compromise on weld quality.",
    features: [
      "Structural steel fabrication",
      "Custom brackets & mounts",
      "Prototype to production runs",
    ],
    tag: "CUSTOM BUILD",
  },
  {
    icon: Wrench,
    label: "02",
    title: "MIG & TIG Welding",
    desc: "Precision arc welding for every material and application. Clean beads, full penetration, every pass certified.",
    features: [
      "Stainless, aluminum, carbon steel",
      "Certified welders on staff",
      "Pressure vessel rated",
    ],
    tag: "PRECISION WELD",
  },
  {
    icon: Shield,
    label: "03",
    title: "Repair & Restoration",
    desc: "Cracked frame, worn equipment, structural damage — we diagnose, cut out the bad, and lay down welds that last.",
    features: [
      "Heavy equipment repair",
      "Farm & ag machinery",
      "Emergency turnaround",
    ],
    tag: "FIELD PROVEN",
  },
];

export default function WeldingServices() {
  return (
    <section className="relative bg-[#0a0a0a] overflow-hidden py-24">

      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Ambient glow */}
      <div className="absolute top-[10%] -left-[10%] w-[400px] h-[400px] bg-[radial-gradient(circle,_#e05a0015_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8">

        {/* Header */}
        <div className="mb-20">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-[2px] bg-[#e05a00] shadow-[0_0_8px_#e05a00aa]" />
            <span className="text-xs tracking-[0.2em] font-bold text-[#e05a00] uppercase">
              What We Do
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative text-[clamp(52px,8vw,88px)] font-black uppercase leading-[0.95] text-white max-w-3xl mb-6"
          >
            Built with{" "}

            {/* Fake stroke heat */}
            <span className="relative inline-block">
              <span className="absolute inset-0 text-transparent [-webkit-text-stroke:2px_#e05a00]">
                heat
              </span>
              <span className="text-transparent">heat</span>
            </span>

            {" & "}
            <span className="text-[#e05a00]">steel.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-[#666] text-base max-w-md leading-relaxed"
          >
            Every job gets the same treatment — proper prep, full penetration,
            and work that holds under pressure. No shortcuts.
          </motion.p>
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px]">

          {services.map((service, i) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="group relative bg-[#111] border border-[#222] p-10 pb-12 overflow-hidden transition-all duration-300 hover:border-[#e05a00]"
              >

                {/* Ghost Number */}
                <div className="absolute -top-6 right-6 text-[100px] font-black select-none pointer-events-none text-transparent [-webkit-text-stroke:1px_#2a2a2a] transition-all duration-300 group-hover:[-webkit-text-stroke:1px_#e05a00]">
                  {service.label}
                </div>

                {/* Top */}
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-12 bg-[#1e1e1e] flex items-center justify-center transition-all duration-300 group-hover:bg-[#e05a00]">
                    <Icon
                      size={22}
                      className="text-[#e05a00] transition-colors duration-300 group-hover:text-white"
                    />
                  </div>

                  <span className="text-[11px] tracking-[0.15em] font-bold px-3 py-1 border border-[#2a2a2a] bg-[#1e1e1e] text-[#888] transition-all duration-300 group-hover:bg-[#e05a00] group-hover:text-white">
                    {service.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-extrabold uppercase tracking-wide text-[#f0f0f0] mb-3 leading-tight">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#555] leading-relaxed mb-8">
                  {service.desc}
                </p>

                <div className="h-px bg-gradient-to-r from-[#2a2a2a] to-transparent mb-6" />

                {/* Features */}
                <ul className="space-y-3">
                  {service.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-[#888]">
                      <div className="w-[5px] h-[5px] bg-[#e05a00] rotate-45" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Bottom spark line */}
                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-[#e05a00] via-[#ffb347] to-[#e05a00] shadow-[0_0_12px_#e05a00] transition-all duration-500 group-hover:w-full" />
              </motion.div>
            );
          })}

        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-[2px] bg-[#e05a00] px-10 py-7 flex flex-wrap items-center justify-between gap-4"
        >
          <div>
            <p className="text-xl font-extrabold uppercase tracking-wider text-white">
              Need something welded?
            </p>
            <p className="text-sm text-white/70 mt-1">
              Call us or stop by the shop — we'll give you a straight answer.
            </p>
          </div>

          <button className="bg-black hover:bg-[#1a1a1a] text-white text-sm font-extrabold uppercase tracking-[0.15em] px-8 py-3 transition-all duration-200">
            Get a Quote →
          </button>
        </motion.div>

      </div>
    </section>
  );
}