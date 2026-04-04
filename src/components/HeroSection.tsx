import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/ikigai-logo-white.jpeg";
import { Hero } from "@/components/ui/animated-hero";
import { TestimonialCarousel } from "@/components/ui/profile-card-testimonial-carousel";
import RecentVideosCarousel from "@/components/ui/recent-videos-carousel";

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lastTapRef = useRef<{ time: number; x: number; y: number } | null>(null);
  const hasUsedDoubleTapRef = useRef(false);
  const [isMouseGlowEnabled, setIsMouseGlowEnabled] = useState(true);
  const [showGlowTip, setShowGlowTip] = useState(true);
  const [contentTab, setContentTab] = useState<"articles" | "videos">("articles");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const glowXPct = useMotionValue(50);
  const glowYPct = useMotionValue(50);
  const smoothX = useSpring(mouseX, { stiffness: 220, damping: 28, mass: 0.3 });
  const smoothY = useSpring(mouseY, { stiffness: 220, damping: 28, mass: 0.3 });
  const textGlow = useMotionValue(0);
  const smoothTextGlow = useSpring(textGlow, { stiffness: 170, damping: 24, mass: 0.4 });
  const glowOpacity = useTransform(smoothTextGlow, [0, 1], [0, 1]);
  const glowRadius = useMotionValue(140);
  const smoothGlowRadius = useSpring(glowRadius, { stiffness: 170, damping: 24, mass: 0.4 });
  const glowXCss = useMotionTemplate`${glowXPct}%`;
  const glowYCss = useMotionTemplate`${glowYPct}%`;
  const glowRadiusCss = useMotionTemplate`${smoothGlowRadius}px`;

  const moveGlowToTextCenter = () => {
    const sectionRect = ref.current?.getBoundingClientRect();
    const targetEl = contentRef.current?.querySelector("[data-hero-glow-target]") as HTMLElement | null;
    const targetRect = targetEl?.getBoundingClientRect();
    if (!sectionRect || !targetRect) return;

    const centerX = targetRect.left + targetRect.width / 2 - sectionRect.left;
    const centerY = targetRect.top + targetRect.height / 2 - sectionRect.top;
    mouseX.set(centerX);
    mouseY.set(centerY);
    glowXPct.set(50);
    glowYPct.set(50);
  };

  const toggleGlowMode = () => {
    setIsMouseGlowEnabled((previous) => {
      const nextEnabled = !previous;

      if (!nextEnabled) {
        moveGlowToTextCenter();
        textGlow.set(1);
        glowRadius.set(1200);
      } else {
        textGlow.set(0);
        glowRadius.set(140);
      }

      return nextEnabled;
    });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    const now = performance.now();
    const lastTap = lastTapRef.current;

    if (lastTap) {
      const elapsed = now - lastTap.time;
      const distance = Math.hypot(event.clientX - lastTap.x, event.clientY - lastTap.y);

      if (elapsed < 320 && distance < 44) {
        toggleGlowMode();
        hasUsedDoubleTapRef.current = true;
        setShowGlowTip(false);
        lastTapRef.current = null;
        return;
      }
    }

    lastTapRef.current = { time: now, x: event.clientX, y: event.clientY };
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!isMouseGlowEnabled) return;

    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);

    const glowTarget = contentRef.current?.querySelector("[data-hero-glow-target]") as HTMLElement | null;
    const targetRect = glowTarget?.getBoundingClientRect();
    if (targetRect) {
      const localX = event.clientX - targetRect.left;
      const localY = event.clientY - targetRect.top;
      const xPct = Math.max(0, Math.min(100, (localX / targetRect.width) * 100));
      const yPct = Math.max(0, Math.min(100, (localY / targetRect.height) * 100));
      glowXPct.set(xPct);
      glowYPct.set(yPct);

      const nearestX = Math.max(targetRect.left, Math.min(event.clientX, targetRect.right));
      const nearestY = Math.max(targetRect.top, Math.min(event.clientY, targetRect.bottom));
      const distance = Math.hypot(event.clientX - nearestX, event.clientY - nearestY);
      const touchRadius = 55;
      textGlow.set(Math.max(0, 1 - distance / touchRadius));
    } else {
      textGlow.set(0);
    }
  };

  const handleMouseLeave = () => {
    if (!isMouseGlowEnabled) return;

    mouseX.set(-200);
    mouseY.set(-200);
    textGlow.set(0);
    glowRadius.set(140);
    glowXPct.set(50);
    glowYPct.set(50);
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onPointerDown={handlePointerDown}
      className="relative min-h-screen flex items-center overflow-hidden bg-background"
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
        className="absolute z-[6] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ left: smoothX, top: smoothY }}
      >
        <div className="relative w-44 h-24">
          <div className="absolute inset-0 rounded-[999px] bg-gradient-to-r from-transparent via-primary/35 to-transparent blur-2xl" />
          <div className="absolute inset-x-10 inset-y-4 rounded-[999px] bg-gradient-to-r from-transparent via-white/45 to-transparent blur-lg" />
        </div>
      </motion.div>

      <motion.div
        ref={contentRef}
        className="relative z-10 container mx-auto px-6 pt-20"
        style={{
          y: textY,
          opacity,
          ["--hero-glow-x" as string]: glowXCss,
          ["--hero-glow-y" as string]: glowYCss,
          ["--hero-glow-opacity" as string]: glowOpacity,
          ["--hero-glow-radius" as string]: glowRadiusCss,
        }}
      >
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_360px] gap-8 items-start">
          <Hero />

          <aside className="hidden xl:block pt-3">
            <div className="mb-4">
              <h2 className="text-xl font-display font-semibold text-foreground">Recent Resources</h2>
            </div>

            <div className="inline-flex rounded-full border border-border/60 bg-card/70 p-1 mb-4">
              <button
                type="button"
                onClick={() => setContentTab("articles")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors ${
                  contentTab === "articles" ? "bg-primary text-primary-foreground" : "text-foreground/75 hover:text-foreground"
                }`}
              >
                Articles
              </button>
              <button
                type="button"
                onClick={() => setContentTab("videos")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors ${
                  contentTab === "videos" ? "bg-primary text-primary-foreground" : "text-foreground/75 hover:text-foreground"
                }`}
              >
                Videos
              </button>
            </div>

            {contentTab === "articles" ? <TestimonialCarousel /> : <RecentVideosCarousel />}
          </aside>
        </div>
      </motion.div>

      {showGlowTip && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-6 left-6 z-20 rounded-full border border-border/60 bg-background/75 px-4 py-2 text-xs font-body text-foreground/80 backdrop-blur"
        >
          Double tap anywhere to see the magic.
        </motion.div>
      )}

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ opacity }}
      >
        <div className="w-5 h-8 rounded-full border-2 border-foreground/30 flex justify-center pt-1.5">
          <motion.div
            className="w-1 h-2 rounded-full bg-primary"
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
