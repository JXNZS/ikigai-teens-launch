import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const NAVBAR_OPEN_EVENT = "ikigai:openNavbarDropdown";

const CTASection = () => {
  const ref = useRef<HTMLElement>(null);
  const [activeButton, setActiveButton] = useState<"teens" | "parents" | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 0.5], [40, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  const openNavbarDropdown = (label: "Teen Zone" | "Parent Hub") => {
    window.dispatchEvent(new CustomEvent(NAVBAR_OPEN_EVENT, { detail: { label } }));
  };

  return (
    <section ref={ref} className="relative py-20 bg-card overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div className="max-w-3xl mx-auto text-center" style={{ y: textY, opacity: textOpacity }}>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-muted-foreground font-body mb-8 leading-relaxed">
            Whether you're a teen looking for guidance or a parent seeking support, we're here for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4" onMouseLeave={() => setActiveButton(null)}>
            <motion.div
              animate={{
                scale: activeButton === "teens" ? 1.03 : 1,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.94, rotate: -1 }}
            >
              <button
                type="button"
                onMouseEnter={() => setActiveButton("teens")}
                onClick={() => {
                  setActiveButton("teens");
                  openNavbarDropdown("Teen Zone");
                }}
                className={`inline-flex px-8 py-3.5 bg-primary text-primary-foreground rounded-full font-body font-semibold text-sm transition-all duration-300 ${
                  activeButton === "teens" ? "ring-2 ring-primary/50" : "opacity-80"
                }`}
              >
                For Teens
              </button>
            </motion.div>
            <motion.div
              animate={{
                scale: activeButton === "parents" ? 1.03 : 1,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.94, rotate: 1 }}
            >
              <button
                type="button"
                onMouseEnter={() => setActiveButton("parents")}
                onClick={() => {
                  setActiveButton("parents");
                  openNavbarDropdown("Parent Hub");
                }}
                className={`inline-flex px-8 py-3.5 bg-primary text-primary-foreground rounded-full font-body font-semibold text-sm transition-all duration-300 ${
                  activeButton === "parents" ? "ring-2 ring-primary/50" : "opacity-80"
                }`}
              >
                For Parents
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
