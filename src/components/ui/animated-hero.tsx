import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const localizedGlowMask = "radial-gradient(var(--hero-glow-radius, 140px) var(--hero-glow-radius, 140px) at var(--hero-glow-x, 50%) var(--hero-glow-y, 50%), rgba(0,0,0,1) 20%, rgba(0,0,0,0) 76%)";
  const heroAccentColor = "hsl(144 19% 42%)"; // sage primary (#588068)
const localizedGlowStyle = {
  WebkitMaskImage: localizedGlowMask,
  maskImage: localizedGlowMask,
  textShadow: "0 0 24px hsl(144 19% 42% / 0.9), 0 0 10px hsl(0 0% 100% / 0.8)",
  opacity: "var(--hero-glow-opacity, 0)",
} as const;

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["Find Their Purpose", "Navigate Through Life", "Unlock Their Potential", "Stand Out"],
    [],
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
        <div className="w-full pl-0 pr-4 md:pl-0 md:pr-6">
          <div className="flex gap-6 md:gap-8 py-12 md:py-20 lg:py-28 items-start justify-start flex-col">
          <div data-hero-glow-target className="flex gap-3 md:gap-4 flex-col">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter text-left font-regular text-foreground leading-tight">
              <span className="relative inline-block" style={{ color: '#FCEADE' }}>
                Empowering Teens to
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{ ...localizedGlowStyle, color: '#FCEADE' }}
                >
                  Empowering Teens to
                </span>
              </span>
              <span className="relative flex w-full justify-start overflow-hidden text-left md:pb-4 md:pt-1 min-h-[1.2em]">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold whitespace-nowrap text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
                    initial={{ opacity: 0, y: -36 }}
                    transition={{ duration: 0.55, ease: "easeInOut" }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -36 : 36,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                    <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={localizedGlowStyle}>
                      {title}
                    </span>
                  </motion.span>
                ))}
              </span>
            </h1>
            <p className="relative text-sm md:text-lg md:text-xl leading-relaxed tracking-tight text-foreground max-w-3xl text-left">
              Discover your Ikigai - the intersection where your passion, mission, vocation, and profession align to create a life of meaning and fulfillment.
              <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={localizedGlowStyle}>
                Discover your Ikigai - the intersection where your passion, mission, vocation, and profession align to create a life of meaning and fulfillment.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
