import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { LetterSwapForward } from "@/components/ui/letter-swap";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRef } from "react";
import TextToSpeechButton from "@/components/TextToSpeechButton";
import { useLanguage } from "@/context/LanguageContext";

interface PrincipleItem {
  title: string;
  desc: string;
  color: string;
}

interface CircleButtonProps {
  index: number;
  principleData: PrincipleItem[];
  hovered: number | null;
  setHovered: (index: number | null) => void;
  descriptionPosition?: 'top' | 'bottom';
}

const HoverGreenColor = "#588068"; // Sage primary for circle border and text
const CircleAccent = HoverGreenColor; // Accent color for circle border and text

const CircleButton = ({ index, principleData, hovered, setHovered }: CircleButtonProps) => {
  const isHovered = hovered === index;
  const isMobile = useIsMobile();
  const { language } = useLanguage();
  
  // Determine circle position: 0=center, 4,2=left, 1,3=right
  const isLeftColumn = index === 4 || index === 2;
  const isRightColumn = index === 1 || index === 3;
  const isCenterCircle = index === 0;
  
  // Close expanded card on scroll
  useEffect(() => {
    if (!isHovered || !isMobile) return;
    
    const handleScroll = () => {
      setHovered(null);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHovered, isMobile, setHovered]);
  
  // On mobile, keep expanded side cards anchored to their circles and shift inward.
  const getMobileExpandedStyles = () => {
    if (!isHovered || !isMobile || isCenterCircle) return {};

    // 160 -> 280 means +120 width, so shift by half (60px) to expand inward.
    if (isLeftColumn) {
      return {
        transform: 'translateX(60px)',
        maxWidth: 'calc(100vw - 32px)',
      };
    } else if (isRightColumn) {
      return {
        transform: 'translateX(-60px)',
        maxWidth: 'calc(100vw - 32px)',
      };
    }
    return {};
  };
  
  return (
    <motion.div
      className="relative flex flex-col items-center justify-center"
      onMouseEnter={() => !isMobile && setHovered(index)}
      onMouseLeave={() => !isMobile && setHovered(null)}
      onClick={() => isMobile && setHovered(isHovered ? null : index)}
      style={{ position: 'relative', zIndex: isHovered ? 2147483647 : 1 }}
    >
      {/* Animated circle/rectangle container */}
      <motion.div
        animate={
          isHovered
            ? { 
                width: "280px",
                height: language === "kn" ? "240px" : "160px",
                borderRadius: "16px",
                padding: "20px",
              }
            : {
                width: "160px",
                height: "160px",
                borderRadius: "50%",
                padding: "0px",
              }
        }
        transition={{ type: "spring", stiffness: 320, damping: 30, mass: 0.8 }}
        className="relative flex items-center justify-center cursor-pointer bg-white border-4 font-display font-bold text-xl md:text-2xl text-center select-none overflow-visible"
        style={{
          borderColor: CircleAccent,
          position: 'relative',
          zIndex: isHovered ? 2147483647 : 1,
          backgroundColor: '#ffffff',
          opacity: 1,
          boxShadow: isHovered ? '0 16px 40px rgba(0,0,0,0.08)' : '0 2px 6px rgba(0,0,0,0.02)',
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
          mixBlendMode: 'normal',
          isolation: 'isolate',
          ...getMobileExpandedStyles(),
        }}
      >
        <motion.div
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center"
        >
          {isHovered ? (
            <div className="space-y-2 text-left w-full">
              {isMobile ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setHovered(null);
                  }}
                  aria-label="Close philosophy card"
                  className="absolute right-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-border/60 bg-white text-primary shadow-sm"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              ) : null}
              <h3 
                className="text-sm font-display font-bold"
                style={{ color: CircleAccent }}
              >
                {principleData[index].title}
              </h3>
              <p 
                className="text-xs md:text-sm leading-relaxed font-body text-gray-700"
              >
                {principleData[index].desc}
              </p>
            </div>
          ) : (
            <span style={{ color: CircleAccent }}>
              {principleData[index].title}
            </span>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const GroundingPhilosophy = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const philosophyRef = useRef<HTMLElement>(null);
  const { language, t } = useLanguage();

  const philosophyParagraphs = language === "kn" ? [
    "ನಮ್ಮ ತತ್ವಗಳು ಜಪಾನಿನ ಸಂಸ್ಕೃತಿಯಿಂದ ಪ್ರೇರಿತವಾಗಿವೆ. ಉದ್ದೇಶಪೂರ್ವಕ ಜೀವನ, ನಿರಂತರ ಕಲಿಕೆ ಮತ್ತು ಪ್ರತಿಯೊಂದು ಕೆಲಸದಲ್ಲೂ ಜಾಗರೂಕತೆ ನಮ್ಮ ಮುಖ್ಯ ಗುರಿ. ಈ ಚಿಂತನೆಗಳನ್ನು ಚಿಕ್ಕ ವಯಸ್ಸಿನಲ್ಲೇ ಕಲಿತರೆ, ಭವಿಷ್ಯದ ಬದುಕು ಸುಂದರವಾಗುತ್ತದೆ.",
    "ತರುಣದ ಪ್ರಾಯವು ಪ್ರತಿಯೊಬ್ಬರ ಜೀವನದ ಪ್ರಮುಖ ತಿರುವು. ಇಲ್ಲಿ ಒಳ್ಳೆಯ ಹವ್ಯಾಸಗಳು ಮತ್ತು ಉತ್ತಮ ವ್ಯಕ್ತಿತ್ವ ಮೂಡಿಬರುತ್ತವೆ. ಈ ಹಂತದಲ್ಲಿ ಮಕ್ಕಳಿಗೆ ಸೂಕ್ತ ಮಾರ್ಗದರ್ಶನ ನೀಡಿದರೆ, ಅವರು ಇಂದಿನ ಸಂಕೀರ್ಣ ಜಗತ್ತನ್ನು ಧೈರ್ಯವಾಗಿ ಎದುರಿಸಬಲ್ಲರು.",
    "ನಮ್ಮ ಎಲ್ಲಾ ತರಬೇತಿ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಜಪಾನಿನ ಯಶಸ್ವಿ ಪರಿಕಲ್ಪನೆಗಳ ಆಧಾರದ ಮೇಲೆಯೇ ರೂಪಿಸಲಾಗಿದೆ. ತರುಣರು ಮಾನಸಿಕವಾಗಿ ಸದೃಢರಾಗಲು, ಗೊಂದಲಗಳಿಂದ ದೂರವಿರಲು ಮತ್ತು ಒಳ್ಳೆಯ ಹವ್ಯಾಸಗಳನ್ನು ರೂಢಿಸಿಕೊಳ್ಳಲು ನಾವು ಬೆಂಬಲ ನೀಡುತ್ತೇವೆ. ತರುಣದವರು ತಮ್ಮನ್ನು ತಾವು ಅರಿತುಕೊಂಡು, ಜವಾಬ್ದಾರಿಯುತವಾಗಿ ಮತ್ತು ನಿರ್ದಿಷ್ಟ ಗುರಿಯೊಂದಿಗೆ ಬದುಕುವಂತೆ ಮಾಡುವುದೇ ನಮ್ಮ ಆಶಯ."
  ] : [
    t("philosophy.strings.At Ikigai Teen, our philosophy is inspired by timeless Japanese principles that emphasize purposeful living, steady growth, and mindful action. These ideas are simple yet powerful - and when applied early in life, they help young people build strong foundations for the future."),
    t("philosophy.strings.We believe that adolescence is not merely a stage to get through, but a critical period where identity, habits, and character take shape. When teens are guided with the right tools and values, they can develop the clarity and resilience needed to navigate a complex world."),
    t("philosophy.strings.Several Japanese concepts guide our approach. Together, these principles shape the way we design our coaching programs, tools, and learning experiences. We encourage teens to grow step by step, develop emotional strength, manage distractions, and build habits that support a meaningful life."),
    t("philosophy.strings.Our goal is not to create perfection, but to help teens become self-aware, grounded, and responsible individuals who can navigate life with clarity and purpose.")
  ];

  const localizedPrincipleData: PrincipleItem[] = [
    {
      title: t("philosophy.strings.Ikigai"),
      desc: t("philosophy.strings.Discovering meaning and direction in life by aligning one's strengths, interests, values, and contribution to the world."),
      color: "#a8d5d0",
    },
    {
      title: t("philosophy.strings.Kaizen"),
      desc: t("philosophy.strings.The practice of small, consistent improvements that lead to lasting personal growth."),
      color: "#b8c9e8",
    },
    {
      title: t("philosophy.strings.Shoshin"),
      desc: t("philosophy.strings.The beginner's mind, encouraging curiosity, openness, and the willingness to learn without ego."),
      color: "#e8d4b8",
    },
    {
      title: t("philosophy.strings.Hansei"),
      desc: t("philosophy.strings.Thoughtful reflection and self-awareness, helping teens learn from experiences and make wiser decisions."),
      color: "#d4b8e8",
    },
    {
      title: t("philosophy.strings.Kintsugi"),
      desc: t("philosophy.strings.The idea that imperfections and setbacks can strengthen character and become part of one's unique story."),
      color: "#e8c4b8",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-16 bg-background min-h-screen">
        <section className="footer-theme-legacy py-12 md:py-20 bg-card border-b border-border/50">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
            <h1>
              <LetterSwapForward
                label={t("philosophy.title")}
                className="justify-center text-2xl sm:text-4xl md:text-5xl font-display font-bold mb-4 leading-tight"
                style={{ color: '#FCEADE' }}
              />
            </h1>
            <p className="text-lg text-white font-body">
              {t("philosophy.strings.The ideas that shape how Ikigai Teen supports purposeful growth.")}
            </p>
          </div>
        </section>

        <section className="py-14 bg-background overflow-hidden">
          <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row gap-10 md:gap-16 items-start">
            {/* Left: Philosophy Box */}
            <article ref={philosophyRef} className={`relative flex-1 rounded-xl border border-border/60 bg-white [--foreground:0_0%_0%] [--muted-foreground:0_0%_0%] [--border:152_20%_86%] p-6 md:p-8 space-y-6 flex flex-col justify-start min-w-[320px] transition-all duration-300 ${language === "kn" ? "max-w-2xl min-h-[500px]" : "max-w-xl"}`}>
              <TextToSpeechButton targetRef={philosophyRef} />
              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-display font-semibold text-primary">
                  {t("philosophy.philosophyTitle")}
                </h2>
                <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed font-body">
                  {philosophyParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </article>

            {/* Right: Expandable Circles */}
            <div className="flex-1 flex flex-col justify-center overflow-visible" onClick={() => isMobile && hovered !== null && setHovered(null)}>
              <div className="grid grid-rows-3 grid-cols-2 gap-8 h-full place-items-center relative overflow-visible" style={{minHeight:'500px', position: 'relative'}}>
                {/* Row 1: Kintsugi (index 4), Kaizen (index 1) */}
                <CircleButton index={4} principleData={localizedPrincipleData} hovered={hovered} setHovered={setHovered} />
                <CircleButton index={1} principleData={localizedPrincipleData} hovered={hovered} setHovered={setHovered} />

                {/* Row 2: Ikigai (index 0) centered */}
                <div style={{ gridColumn: '1 / span 2', justifySelf: 'center' }}>
                  <CircleButton index={0} principleData={localizedPrincipleData} hovered={hovered} setHovered={setHovered} />
                </div>

                {/* Row 3: Shoshin (index 2), Hansei (index 3) */}
                <CircleButton index={2} principleData={localizedPrincipleData} hovered={hovered} setHovered={setHovered} descriptionPosition="top" />
                <CircleButton index={3} principleData={localizedPrincipleData} hovered={hovered} setHovered={setHovered} descriptionPosition="top" />
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
