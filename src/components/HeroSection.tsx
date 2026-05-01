import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/ikigai-logo-white.jpeg";
import { Hero } from "@/components/ui/animated-hero";
import { LetterSwapForward } from "@/components/ui/letter-swap";
import { TestimonialCarousel } from "@/components/ui/profile-card-testimonial-carousel";
import RecentVideosCarousel from "@/components/ui/recent-videos-carousel";

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [contentTab, setContentTab] = useState<"articles" | "videos">("articles");
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
      className="hero-theme-legacy relative min-h-screen flex items-center overflow-hidden bg-background"
    >
      <motion.img
        src={logo}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 m-auto w-[min(72vw,560px)] h-[min(72vw,560px)] object-contain opacity-[0.12]"
        style={{ y: textY }}
      />
      <div className="absolute inset-0 hero-gradient" />

      <motion.div
        className="relative z-10 container mx-auto px-4 md:px-6 pt-12 md:pt-20"
        style={{
          y: textY,
          opacity,
        }}
      >
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_360px] gap-6 md:gap-8 items-start">
          <Hero />

          <aside className="hidden xl:block pt-3">
            <div className="mb-4">
              <h2>
                <LetterSwapForward
                  label="Recent Resources"
                  className="justify-start text-lg md:text-xl font-display font-semibold text-foreground"
                />
              </h2>
            </div>

            <div className="inline-flex rounded-full border border-border/60 bg-card/70 p-1 mb-4">
              <button
                type="button"
                onClick={() => setContentTab("articles")}
                className={`px-3 md:px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors ${
                  contentTab === "articles" ? "bg-primary text-primary-foreground" : "text-foreground/75 hover:text-foreground"
                }`}
              >
                Articles
              </button>
              <button
                type="button"
                onClick={() => setContentTab("videos")}
                className={`px-3 md:px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors ${
                  contentTab === "videos" ? "bg-primary text-primary-foreground" : "text-foreground/75 hover:text-foreground"
                }`}
              >
                Videos
              </button>
            </div>

            <div className="h-[446px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={contentTab}
                  className="h-full"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                >
                  {contentTab === "articles" ? <TestimonialCarousel /> : <RecentVideosCarousel />}
                </motion.div>
              </AnimatePresence>
            </div>
          </aside>
        </div>
      </motion.div>


    </section>
  );
};

export default HeroSection;
