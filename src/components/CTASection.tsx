import { motion } from "framer-motion";
import teensCommunity from "@/assets/teen-community.jpg";

const CTASection = () => {
  return (
    <section className="relative py-0">
      <div className="grid md:grid-cols-2 min-h-[500px]">
        <div className="relative overflow-hidden">
          <img
            src={teensCommunity}
            alt="Join Ikigai Teen"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            width={800}
            height={1000}
          />
          <div className="absolute inset-0 bg-background/40" />
        </div>

        <div className="flex items-center bg-card p-12 md:p-16">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Join the Ikigai Teen Movement
            </h2>
            <p className="text-muted-foreground font-body mb-8 leading-relaxed">
              Be part of a growing community dedicated to helping teenagers discover their purpose, 
              build meaningful connections, and create a future aligned with their passions and values.
            </p>
            <a
              href="#"
              className="inline-flex px-8 py-3.5 bg-primary text-primary-foreground rounded-full font-body font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Get Involved
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
