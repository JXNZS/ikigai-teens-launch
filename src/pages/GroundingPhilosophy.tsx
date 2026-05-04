import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { LetterSwapForward } from "@/components/ui/letter-swap";
import { motion } from "framer-motion";
import { useState } from "react";

const philosophyParagraphs = [
  "At Ikigai Teen, our philosophy is inspired by timeless Japanese principles that emphasize purposeful living, steady growth, and mindful action. These ideas are simple yet powerful - and when applied early in life, they help young people build strong foundations for the future.",
  "We believe that adolescence is not merely a stage to get through, but a critical period where identity, habits, and character take shape. When teens are guided with the right tools and values, they can develop the clarity and resilience needed to navigate a complex world.",
  "Several Japanese concepts guide our approach. Together, these principles shape the way we design our coaching programs, tools, and learning experiences. We encourage teens to grow step by step, develop emotional strength, manage distractions, and build habits that support a meaningful life.",
  "Our goal is not to create perfection, but to help teens become self-aware, grounded, and responsible individuals who can navigate life with clarity and purpose.",
];

const principleData = [
  {
    title: "Ikigai",
    desc: "Discovering meaning and direction in life by aligning one’s strengths, interests, values, and contribution to the world.",
    color: "#2ec27e",
  },
  {
    title: "Kaizen",
    desc: "The practice of small, consistent improvements that lead to lasting personal growth.",
    color: "#3b82f6",
  },
  {
    title: "Shoshin",
    desc: "The beginner’s mind, encouraging curiosity, openness, and the willingness to learn without ego.",
    color: "#f59e42",
  },
  {
    title: "Hansei",
    desc: "Thoughtful reflection and self-awareness, helping teens learn from experiences and make wiser decisions.",
    color: "#a855f7",
  },
  {
    title: "Kintsugi",
    desc: "The idea that imperfections and setbacks can strengthen character and become part of one’s unique story.",
    color: "#fbbf24",
  },
];

interface CircleButtonProps {
  index: number;
  principleData: typeof principleData;
  hovered: number | null;
  setHovered: (index: number | null) => void;
  descriptionPosition?: 'top' | 'bottom';
}

const CircleButton = ({ index, principleData, hovered, setHovered, descriptionPosition = 'bottom' }: CircleButtonProps) => {
  const isHovered = hovered === index;
  const isBottom = descriptionPosition === 'bottom';
  
  return (
    <motion.div
      className="relative flex flex-col items-center justify-center"
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
    >
      {/* Glow background ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "140%",
          height: "140%",
          background: `radial-gradient(circle, ${principleData[index].color}20, transparent)`,
          zIndex: 0,
        }}
        animate={isHovered ? { opacity: 1, scale: 1.2 } : { opacity: 0.5, scale: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Main circle */}
      <motion.div
        animate={
          isHovered
            ? { 
                scale: 1.22,
                boxShadow: `0 0 0 3px ${principleData[index].color}40, 0 12px 48px 0 ${principleData[index].color}60`,
              }
            : {
                scale: 1,
                boxShadow: `0 0 0 0px ${principleData[index].color}10, 0 4px 16px 0 rgba(0,0,0,0.12)`,
              }
        }
        transition={{ type: "spring", stiffness: 380, damping: 28, mass: 0.8 }}
        className="relative w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center cursor-pointer bg-white border-4 font-display font-bold text-xl md:text-2xl text-center select-none transition-colors duration-200"
        style={{
          color: principleData[index].color,
          borderColor: principleData[index].color,
          zIndex: isHovered ? 20 : 1,
        }}
      >
        {principleData[index].title}
      </motion.div>

      {/* Description popup */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: isBottom ? 16 : -16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: isBottom ? 16 : -16, scale: 0.95 }}
          transition={{ duration: 0.25, type: "spring", stiffness: 300, damping: 30 }}
          className={`absolute w-64 md:w-72 border-2 rounded-xl shadow-2xl p-4 text-sm md:text-base font-body z-30 ${isBottom ? 'top-full mt-4' : 'bottom-full mb-4'}`}
          style={{
            backgroundColor: `${principleData[index].color}15`,
            borderColor: principleData[index].color,
            color: principleData[index].color,
          }}
        >
          {principleData[index].desc}
        </motion.div>
      )}
    </motion.div>
  );
};

const GroundingPhilosophy = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <>
      <Navbar />
      <main className="pt-16 bg-background min-h-screen">
        <section className="footer-theme-legacy py-12 md:py-20 bg-card border-b border-border/50">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
            <h1>
              <LetterSwapForward
                label="Grounding Philosophy"
                className="justify-center text-4xl md:text-5xl font-display font-bold text-primary mb-4"
              />
            </h1>
            <p className="text-lg text-muted-foreground font-body">The ideas that shape how Ikigai Teen supports purposeful growth.</p>
          </div>
        </section>

        <section className="py-14 bg-background">
          <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row gap-10 md:gap-16 items-stretch">
            {/* Left: Philosophy Box */}
            <article className="flex-1 rounded-xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-6 md:p-8 space-y-6 flex flex-col justify-center min-w-[320px] max-w-xl">
              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-display font-semibold text-primary">Philosophy</h2>
                <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed font-body">
                  {philosophyParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </article>

            {/* Right: Expandable Circles */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="grid grid-rows-3 grid-cols-2 gap-8 h-full place-items-center relative" style={{minHeight:'500px'}}>
                {/* Row 1: Kintsugi (index 4), Kaizen (index 1) */}
                <CircleButton index={4} principleData={principleData} hovered={hovered} setHovered={setHovered} />
                <CircleButton index={1} principleData={principleData} hovered={hovered} setHovered={setHovered} />

                {/* Row 2: Ikigai (index 0) centered */}
                <div style={{ gridColumn: '1 / span 2', justifySelf: 'center' }}>
                  <CircleButton index={0} principleData={principleData} hovered={hovered} setHovered={setHovered} />
                </div>

                {/* Row 3: Shoshin (index 2), Hansei (index 3) */}
                <CircleButton index={2} principleData={principleData} hovered={hovered} setHovered={setHovered} descriptionPosition="top" />
                <CircleButton index={3} principleData={principleData} hovered={hovered} setHovered={setHovered} descriptionPosition="top" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default GroundingPhilosophy;