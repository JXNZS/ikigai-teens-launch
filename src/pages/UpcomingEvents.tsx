"use client"

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LetterSwapForward } from "@/components/ui/letter-swap";

// Target date: August 15th of this year (or next year if passed)
function getTargetDate() {
  const now = new Date();
  let target = new Date(now.getFullYear(), 7, 15, 0, 0, 0); // month 7 = August
  if (now > target) {
    target = new Date(now.getFullYear() + 1, 7, 15, 0, 0, 0);
  }
  return target;
}

const TARGET_DATE = getTargetDate();

function getSeason2Date() {
  const now = new Date();
  let target = new Date(now.getFullYear(), 6, 15, 0, 0, 0); // July 15
  if (now > target) {
    target = new Date(now.getFullYear() + 1, 6, 15, 0, 0, 0);
  }
  return target;
}

const TARGET_DATE_SEASON2 = getSeason2Date();

function getTimeLeft() {
  const diff = TARGET_DATE.getTime() - Date.now();
  if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { hours, minutes, seconds };
}

function AnimatedDigit({ value }: { value: number }) {
  return (
    <div className="relative h-[1.4em] w-[2.2em] overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {String(value).padStart(2, "0")}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex items-center justify-center bg-secondary/50 backdrop-blur-sm border border-border/50 rounded-xl px-3 py-3 md:px-8 md:py-6 min-w-[88px] md:min-w-[160px] shadow-sm overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="font-mono text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground">
          <AnimatedDigit value={value} />
        </span>
      </div>
      <span className="text-[10px] md:text-xs font-medium uppercase tracking-[0.14em] md:tracking-[0.2em] text-muted-foreground">{label}</span>
    </div>
  );
}

export default function UpcomingEvents() {
  const [time, setTime] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);
  const [timeSeason2, setTimeSeason2] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(getTimeLeft());
    setTimeSeason2((() => {
      const diff = TARGET_DATE_SEASON2.getTime() - Date.now();
      if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      return { hours, minutes, seconds };
    })());

    const interval = setInterval(() => {
      setTime(getTimeLeft());
      const diff = TARGET_DATE_SEASON2.getTime() - Date.now();
      if (diff <= 0) {
        setTimeSeason2({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeSeason2({
          hours: Math.floor(diff / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Navbar />
      <main className="pt-16 bg-background min-h-screen">
        <section className="relative w-full px-4 py-12 md:py-24 overflow-hidden flex items-center justify-center bg-background">
          <div className="relative w-full max-w-6xl mx-auto">
            <div className="flex flex-col gap-8 w-full">
              {/* Left: Grand Launch */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative rounded-3xl border border-border/50 bg-card/40 backdrop-blur-xl p-8 md:p-16 flex flex-col items-center gap-8 md:gap-12 text-center shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                <h2 className="text-4xl md:text-3xl lg:text-6xl font-semibold tracking-tight text-balance text-primary">Ikigai Teen Initiative</h2>
                <h3 className="text-2xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-balance text-primary">Grand Launch — August 15</h3>
                <p className="text-muted-foreground text-base md:text-lg max-w-xl leading-relaxed">Join us for the official launch of the Ikigai Teen Initiative in Schools. Be among the first to experience our new programs, workshops, and community offerings.</p>

                <div className="grid grid-cols-3 gap-2 md:flex md:items-center md:gap-4 relative z-10 w-full md:w-auto">
                  <TimeUnit value={time?.hours ?? 0} label="Hours" />
                  <div className="hidden md:flex flex-col items-center justify-center pb-6">
                    <span className="text-2xl md:text-4xl font-light text-muted-foreground/50 animate-pulse">:</span>
                  </div>
                  <TimeUnit value={time?.minutes ?? 0} label="Minutes" />
                  <div className="hidden md:flex flex-col items-center justify-center pb-6">
                    <span className="text-2xl md:text-4xl font-light text-muted-foreground/50 animate-pulse">:</span>
                  </div>
                  <TimeUnit value={time?.seconds ?? 0} label="Seconds" />
                </div>
              </motion.div>

              {/* Right: Season 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.06 }}
                className="relative rounded-3xl border border-border/50 bg-card/40 backdrop-blur-xl p-8 md:p-16 flex flex-col items-center gap-8 md:gap-12 text-center shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                <h2 className="text-4xl md:text-3xl lg:text-6xl font-semibold tracking-tight text-balance text-primary">Season 2: Ikigai Teen Conversations</h2>
                <h3 className="text-2xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-balance text-primary">Podcast Releases — July 15</h3>
                <p className="text-muted-foreground text-base md:text-lg max-w-xl leading-relaxed">A new season of podcasts releasing on July 15 — conversations with teens, coaches, and educators offering practical insights and stories.</p>

                <div className="grid grid-cols-3 gap-2 md:flex md:items-center md:gap-4 relative z-10 w-full md:w-auto">
                  <TimeUnit value={timeSeason2?.hours ?? 0} label="Hours" />
                  <div className="hidden md:flex flex-col items-center justify-center pb-6">
                    <span className="text-2xl md:text-4xl font-light text-muted-foreground/50 animate-pulse">:</span>
                  </div>
                  <TimeUnit value={timeSeason2?.minutes ?? 0} label="Minutes" />
                  <div className="hidden md:flex flex-col items-center justify-center pb-6">
                    <span className="text-2xl md:text-4xl font-light text-muted-foreground/50 animate-pulse">:</span>
                  </div>
                  <TimeUnit value={timeSeason2?.seconds ?? 0} label="Seconds" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
