import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import logo from "@/assets/ikigai-logo-white.jpeg";
import { Hero } from "@/components/ui/animated-hero";

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      data-home-hero
      className="hero-theme-legacy relative min-h-screen flex items-center overflow-hidden bg-[#2C423F]"
    >
      <motion.img
        src={logo}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 m-auto w-[min(72vw,560px)] h-[min(72vw,560px)] object-contain opacity-[0.12]"
        style={{ y: textY }}
      />
      <div className="absolute inset-0 bg-[#2C423F]" />

      <motion.div
        className="relative z-10 container mx-auto px-4 md:px-6 pt-12 md:pt-20"
        style={{
          y: textY,
          opacity,
        }}
      >
        <div className="grid grid-cols-1 gap-6 md:gap-8 items-start">
          <Hero />
        </div>
      </motion.div>


    </section>
  );
};

export default HeroSection;
