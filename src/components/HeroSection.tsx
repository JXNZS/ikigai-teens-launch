import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import logo from "@/assets/ikigai-logo-white.jpeg";
import { Hero } from "@/components/ui/animated-hero";
import HeroSlideshow from "@/components/HeroSlideshow";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
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
      className="hero-theme-legacy relative min-h-screen flex items-center overflow-hidden bg-[#2C423F] py-20"
    >
      <motion.img
        src={logo}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 m-auto w-[min(72vw,560px)] h-[min(72vw,560px)] object-contain opacity-[0.12]"
        style={
          isMobile
            ? {
                WebkitMaskImage: "radial-gradient(circle, black 50%, transparent 80%)",
                maskImage: "radial-gradient(circle, black 50%, transparent 80%)",
              }
            : {
                y: textY,
                WebkitMaskImage: "radial-gradient(circle, black 50%, transparent 80%)",
                maskImage: "radial-gradient(circle, black 50%, transparent 80%)",
              }
        }
      />
      <div className="absolute inset-0 bg-[#2C423F]/80" />

      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-8 items-center justify-between h-full pt-20 pb-12"
        style={isMobile ? undefined : { y: textY, opacity }}
      >
        <div className="flex-1 flex flex-col gap-6 w-full text-center lg:text-left justify-center pt-8 md:pt-0 z-20">
          <Hero />
        </div>
        <div className="flex-shrink-0 w-full lg:w-[460px] z-10">
          <HeroSlideshow />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
