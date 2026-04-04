import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import teensCommunity from "@/assets/teen-community.jpg";

const CTASection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.15, 1]);
  const textX = useTransform(scrollYProgress, [0, 0.5], [80, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <section ref={ref} className="relative py-0 overflow-hidden">
      <div className="grid md:grid-cols-2 min-h-[500px]">
        <div className="relative overflow-hidden">
          <motion.img
            src={teensCommunity}
            alt="Join Ikigai Teen"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            width={800}
            height={1000}
            style={{ scale: imgScale }}
          />
          <div className="absolute inset-0 bg-background/40" />
        </div>

        <div className="flex items-center bg-card p-12 md:p-16">
          <motion.div style={{ x: textX, opacity: textOpacity }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Join the Ikigai Teen Movement
            </h2>
            <p className="text-muted-foreground font-body mb-8 leading-relaxed">
              Be part of a growing community dedicated to helping teenagers discover their purpose, 
              build meaningful connections, and create a future aligned with their passions and values.
            </p>
            <motion.a
              href="#"
              className="inline-flex px-8 py-3.5 bg-primary text-primary-foreground rounded-full font-body font-semibold text-sm"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 40px -10px hsl(152 60% 45% / 0.4)" }}
              whileTap={{ scale: 0.97 }}
            >
              Get Involved
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
