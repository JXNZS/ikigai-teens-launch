import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import teensCollab from "@/assets/teens-collab.jpg";
import teenPurpose from "@/assets/teen-purpose.jpg";
import teenCommunity from "@/assets/teen-community.jpg";

const images = [
  { src: teensCollab, alt: "Teens collaborating" },
  { src: teenPurpose, alt: "Finding purpose" },
  { src: teenCommunity, alt: "Teen community" },
];

const GallerySection = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-display font-bold text-center text-foreground mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          The Ikigai Teen Journey
        </motion.h2>

        <div className="relative max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <button onClick={prev} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="w-8 h-8" />
            </button>

            <div className="flex-1 grid grid-cols-3 gap-4">
              {images.map((img, i) => {
                const offset = (i - current + images.length) % images.length;
                return (
                  <motion.div
                    key={img.alt}
                    className={`aspect-[3/4] rounded-lg overflow-hidden ${offset === 0 ? "col-span-1" : "col-span-1"}`}
                    animate={{
                      scale: offset === 1 ? 1.05 : 0.95,
                      opacity: 1,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width={800}
                      height={1000}
                    />
                  </motion.div>
                );
              })}
            </div>

            <button onClick={next} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
