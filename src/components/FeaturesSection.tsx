import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LetterSwapForward } from "@/components/ui/letter-swap";
import TextToSpeechButton from "@/components/TextToSpeechButton";
import { useLanguage } from "@/context/LanguageContext";

const renderNumberText = (text: string): ReactNode => {
  const numberPattern = /\d[\d,-]*/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(numberPattern)) {
    const matchIndex = match.index ?? 0;

    if (matchIndex > lastIndex) {
      nodes.push(text.slice(lastIndex, matchIndex));
    }

    nodes.push(
      <span key={`${text}-${matchIndex}-${match[0]}`} className="number-font">
        {match[0]}
      </span>,
    );
    lastIndex = matchIndex + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length === 1 ? nodes[0] : nodes;
};

const FeaturesSection = () => {
  const ref = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const headingColor = useTransform(scrollYProgress, [0, 0.45], ["hsl(195 10% 70%)", "hsl(var(--foreground))"]);

  return (
    <section ref={ref} className="pt-12 pb-6 md:pt-20 md:pb-10 bg-[hsl(25_83%_93%_/_0.8)] overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={cardRef}
          className="relative max-w-4xl mx-auto text-center rounded-lg md:rounded-2xl border border-border/60 bg-card p-6 md:p-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <TextToSpeechButton targetRef={cardRef} />
          <motion.h2 style={{ color: headingColor }}>
            <LetterSwapForward
              label={language === "kn" ? "ಇಕಿಗೈ ಟೀನ್ನ ಹುಟ್ಟು" : "Origin Of Ikigai Teen"}
              className="justify-center text-2xl sm:text-3xl md:text-4xl font-display font-bold text-current mb-2 md:mb-3"
            />
          </motion.h2>
          <p className="text-base sm:text-lg md:text-xl font-display text-black mb-4 md:mb-6 px-2">
            {language === "kn"
              ? renderNumberText("ಮಾನವೀಯ ಸೇವೆಯ ಪಯಣದಿಂದ ತರುಣರ ಮನೋವಿಕಾಸದ ಆಂದೋಲನದವರೆಗೆ")
              : renderNumberText("From Humanitarian Field Work to a Teen Mindset Movement")}
          </p>
          <div className="space-y-3 md:space-y-4 text-xs sm:text-sm md:text-base text-muted-foreground font-body leading-relaxed text-left md:text-center px-2 md:px-0">
            <p>
              {language === "kn"
                ? renderNumberText("ಎರಡು ದಶಕಗಳಿಗೂ ಹೆಚ್ಚು ಕಾಲ ಭಾರತದಾದ್ಯಂತ ಮಾನವೀಯ ಸೇವಾ ಕಾರ್ಯಕ್ರಮಗಳು, ಶಿಕ್ಷಣ ಉಪಕ್ರಮಗಳು ಹಾಗೂ ತರುಣರ ಬೆಳವಣಿಗೆಯ ಯೋಜನೆಗಳ ಮೂಲಕ ಮಕ್ಕಳೊಂದಿಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸಿರುವ ಐರೀನ್ ಆರತಿ ಅವರು, ಜೀವನ ಕೌಶಲ್ಯ ಶಿಕ್ಷಣ, ವಿಪತ್ತು ಸನ್ನದ್ಧತಾ ತರಬೇತಿ ಮತ್ತು ಶಾಲಾ ಆಧಾರಿತ ಕಾರ್ಯಕ್ರಮಗಳ ಮೂಲಕ 1,07,893ಕ್ಕೂ ಹೆಚ್ಚು ಮಕ್ಕಳಿಗೆ ತರಬೇತಿ ಮತ್ತು ಮಾರ್ಗದರ್ಶನ ನೀಡಿದ್ದಾರೆ.")
                : (
                  <>
                    After two decades of working with children through humanitarian programs, education initiatives, and youth
                    development projects across India, Irene Arathi has reached over {renderNumberText("107,893")} children through life-skills
                    education, disaster preparedness training, and school-based programs.
                  </>
                )}
            </p>
            <p>
              {language === "kn"
                ? "ಇಂದು, ಆ ಸಮೃದ್ಧ ಅನುಭವವೇ ಇಕಿಗೈ ಟೀನ್ ರೂಪದಲ್ಲಿ ಅರಳಿದೆ—ವೇಗವಾಗಿ ಬದಲಾಗುತ್ತಿರುವ ಜಗತ್ತಿನಲ್ಲಿ ತರುಣರು ಸ್ಪಷ್ಟತೆ, ಸ್ಥೈರ್ಯ, ಸದೃಢ ವ್ಯಕ್ತಿತ್ವ ಮತ್ತು ಬದುಕಿನ ಉದ್ದೇಶವನ್ನು ಬೆಳೆಸಿಕೊಳ್ಳಲು ನೆರವಾಗುವ ಒಂದು ಮೌಲ್ಯಾಧಾರಿತ ವೇದಿಕೆಯಾಗಿ."
                : "Today, that experience is being transformed into Ikigai Teen - a platform dedicated to helping teenagers develop clarity, resilience, character, and purpose in a rapidly changing world."}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
