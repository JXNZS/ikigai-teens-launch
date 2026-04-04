"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { articles } from "@/lib/articles";

export interface TestimonialCarouselProps {
  className?: string;
}

export function TestimonialCarousel({ className }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => setCurrentIndex((index) => (index + 1) % articles.length);
  const handlePrevious = () => setCurrentIndex((index) => (index - 1 + articles.length) % articles.length);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % articles.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const currentArticle = articles[currentIndex];

  return (
    <div className={cn("w-full max-w-sm", className)}>
      <div className="rounded-2xl border border-border/60 bg-card/90 backdrop-blur-md shadow-xl overflow-hidden">
        <div className="relative h-48 bg-secondary/40 border-b border-border/50">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentArticle.pdfUrl}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <iframe
                src={`${currentArticle.pdfUrl}#page=1&toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                title={currentArticle.title}
                className="h-full w-full pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentArticle.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <p className="text-xs uppercase tracking-[0.14em] text-primary font-semibold mb-1.5">{currentArticle.audience}</p>
              <h3 className="text-base font-semibold text-foreground leading-snug mb-2">{currentArticle.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{currentArticle.summary}</p>

              <Link
                to={`/resources/blog/${currentArticle.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Open Article
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={handlePrevious}
          aria-label="Previous article"
          className="h-10 w-10 rounded-full border border-border bg-card/80 text-foreground/80 hover:text-foreground hover:bg-card transition-colors flex items-center justify-center"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-1.5">
          {articles.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to article ${index + 1}`}
              className={cn(
                "h-2.5 rounded-full transition-all",
                index === currentIndex ? "w-6 bg-primary" : "w-2.5 bg-foreground/30 hover:bg-foreground/50",
              )}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="Next article"
          className="h-10 w-10 rounded-full border border-border bg-card/80 text-foreground/80 hover:text-foreground hover:bg-card transition-colors flex items-center justify-center"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
