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

type CredibilityStat = {
  value: number;
  label: string;
  suffix?: string;
};

const credibilityStats: CredibilityStat[] = [
  { value: 107893, suffix: "+", label: "Children Reached" },
  { value: 25, label: "Years Humanitarian Experience" },
  { value: 200, suffix: "+", label: "Schools Engaged" },
];

const formatNumber = (value: number) => value.toLocaleString("en-US");

const useCountUp = (target: number, duration: number = 3200) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    let animationFrame = 0;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrentValue(Math.round(target * eased));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step);
      }
    };

    setCurrentValue(0);
    animationFrame = window.requestAnimationFrame(step);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return currentValue;
};

const CredibilityCounter = ({ value, suffix, label }: CredibilityStat) => {
  const currentValue = useCountUp(value);

  return (
    <div className="rounded-2xl border border-black/5 bg-[#FCEADE] p-2 md:p-5 text-center shadow-sm flex-1 flex flex-col items-center justify-start min-h-[85px] md:min-h-[125px] overflow-hidden pt-4 md:pt-7">
      <div className="font-display text-lg sm:text-2xl md:text-4xl font-extrabold text-black leading-none tracking-tight whitespace-nowrap w-full tabular-nums">
        {formatNumber(currentValue)}{suffix ?? ""}
      </div>
      <p className="mt-2 md:mt-3 text-[9px] sm:text-[11px] md:text-sm font-medium text-black/80 leading-tight">
        {label}
      </p>
    </div>
  );
};

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
        <div className="w-full px-4 lg:pl-0 lg:pr-6">
          <div className="flex gap-6 md:gap-8 pb-12 md:pb-20 lg:pb-28 items-center lg:items-start justify-center lg:justify-start flex-col">
          <div data-hero-glow-target className="flex gap-3 md:gap-4 flex-col">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter text-center lg:text-left font-regular text-foreground leading-tight">
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
              <span className="relative flex w-full justify-center lg:justify-start overflow-hidden text-center lg:text-left md:pb-4 md:pt-1 min-h-[1.2em]">
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
            <p className="relative text-sm md:text-lg md:text-xl leading-relaxed tracking-tight text-foreground max-w-3xl text-center lg:text-left">
              Discover your Ikigai - the intersection where your passion, mission, vocation, and profession align to create a life of meaning and fulfillment.
              <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={localizedGlowStyle}>
                Discover your Ikigai - the intersection where your passion, mission, vocation, and profession align to create a life of meaning and fulfillment.
              </span>
            </p>
            <div className="grid grid-cols-3 gap-3 md:gap-6 w-full max-w-3xl mt-6">
              {credibilityStats.map((stat) => (
                <CredibilityCounter
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              ))}
            </div>
            {/* Quote for Desktop - Aligned with Video Window */}
            <div className="hidden lg:block mt-20 max-w-2xl">
              <p className="text-white italic text-base md:text-lg leading-relaxed opacity-90">
                "Teen years are the foundation of a nation's future - what we guide today becomes the character of society tomorrow."
              </p>
              <p className="text-[#FCEADE] font-semibold mt-3 text-sm md:text-base">
                - Irene Arathi Pais
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
