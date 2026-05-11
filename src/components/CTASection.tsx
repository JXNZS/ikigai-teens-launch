import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LetterSwapForward } from "@/components/ui/letter-swap";

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
    <section ref={ref} className="relative pt-6 pb-12 md:pt-10 md:pb-20 bg-[hsl(25_83%_93%_/_0.8)] overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="cta-card max-w-3xl mx-auto text-center rounded-lg md:rounded-2xl border border-border/60 p-6 md:p-10"
          style={{ y: textY, opacity: textOpacity, backgroundColor: '#2C423F' }}
        >
          <motion.h2>
            <LetterSwapForward
              label="Ready to Start Your Journey?"
              className="justify-center text-2xl sm:text-3xl md:text-4xl font-display font-bold text-current mb-3 md:mb-4"
              style={{ color: '#FCEADE' }}
            />
          </motion.h2>
          <p className="text-white font-body mb-6 md:mb-8 leading-relaxed text-sm md:text-base px-2">
            Whether you're a teen looking for guidance or a parent seeking support, we're here for you.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4" onMouseLeave={() => setActiveButton(null)}>
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
                className={`cta-button parent-cta font-body text-xs md:text-sm transition-all duration-300 ${
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
                className={`cta-button parent-cta font-body text-xs md:text-sm transition-all duration-300 ${
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
