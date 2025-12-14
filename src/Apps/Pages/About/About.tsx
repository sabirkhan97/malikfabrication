import { motion } from "framer-motion";

const timelineData = [
  { year: "2008", event: "Founded", description: "Started as a small fabrication workshop." },
  { year: "2012", event: "Major Project", description: "Completed first industrial shed project." },
  { year: "2018", event: "Global Expansion", description: "Started serving international clients." },
  { year: "2023", event: "25,000+ Projects", description: "Achieved global project milestone." },
];

const AboutSection = () => {
  return (
    <section className="bg-gray-900 text-white py-20 px-5 md:px-10">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold">
            About <span className="text-emerald-400">MK Fabrication</span>
          </h2>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto text-lg">
            Since 2008, we’ve delivered reliable and high-quality fabrication solutions 
            with a focus on precision, durability, and engineering excellence.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-16">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-emerald-400">15+</h3>
            <p className="text-gray-300 text-sm">Years Experience</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-emerald-400">25K+</h3>
            <p className="text-gray-300 text-sm">Projects</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-emerald-400">12+</h3>
            <p className="text-gray-300 text-sm">Countries</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-emerald-400">100%</h3>
            <p className="text-gray-300 text-sm">Client Trust</p>
          </div>
        </div>

        {/* Mission Block */}
        <div className="bg-gray-800 p-8 rounded-xl mb-16">
          <p className="text-gray-300 text-lg leading-relaxed">
            We combine traditional craftsmanship with modern engineering 
            to create strong, reliable, and long-lasting metal structures.  
            Our team is committed to delivering quality work with transparency 
            and customer satisfaction at the core of everything we do.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-10">Our Journey</h3>

          <div className="space-y-8">
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-gray-800 p-6 rounded-lg border border-gray-700"
              >
                <h4 className="text-emerald-400 font-semibold text-lg">{item.year}</h4>
                <p className="text-white font-medium">{item.event}</p>
                <p className="text-gray-300 text-sm mt-1">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
