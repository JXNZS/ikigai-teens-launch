import { useRef } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { LetterSwapForward } from "@/components/ui/letter-swap";
import TextToSpeechButton from "@/components/TextToSpeechButton";
import { useLanguage } from "@/context/LanguageContext";

const ValuesVisionMission = () => {
  const articleRef = useRef<HTMLElement>(null);
  const { language, t } = useLanguage();

  const visionStatement = t(
    "values.strings.To nurture a generation of self-aware, resilient and value-driven teens who grow into responsible leaders for their families, communities and the world."
  );

  const missionStatement = t(
    "values.strings.To equip teens with the mindset, values, and practical life skills needed to navigate modern challenges, discover who they are, and grow into emotionally strong, responsible individuals - through structured coaching, practical tools, and a supportive ecosystem of parents, educators, and mentors."
  );

  const introParagraphs = [
    t(
      "values.strings.At Ikigai Teen, we believe that the strength of a young person's future is shaped by the values they build early in life. In a world filled with distraction, pressure, and rapid change, values act as an inner compass - helping teens make wise decisions, develop strong character, and contribute positively to the world around them."
    ),
    t(
      "values.strings.Our work with teens is guided by nine core values, organised into three essential areas of growth:"
    ),
    <span key="intro-focus-line" className="font-semibold text-foreground">
      {t("values.strings.Who I Am - How I Live - How I Engage With the World")}
    </span>,
    t(
      "values.strings.Together, these values form the foundation of the Ikigai Teen approach to developing grounded, responsible, and purposeful young individuals."
    ),
  ];

  const sections = [
    {
      title: t("values.strings.Inner Character"),
      subtitle: language === "kn" ? (
        <>
          <span className="font-semibold text-foreground">ನಾನು ಯಾರು?</span> ದೃಢವಾದ ಜೀವನವು ಸದೃಢವಾದ ಆಂತರಿಕ ವ್ಯಕ್ತಿತ್ವದಿಂದ ಆರಂಭವಾಗುತ್ತದೆ. ಈ ಮೌಲ್ಯಗಳು ತರುಣರು ತಮ್ಮನ್ನು ತಾವು ಅರಿತುಕೊಳ್ಳಲು ಹಾಗೂ ತಮ್ಮ ನಿಜವಾದ ವ್ಯಕ್ತಿತ್ವಕ್ಕೆ ಪ್ರಾಮಾಣಿಕರಾಗಿ ಬದುಕುವ ಧೈರ್ಯವನ್ನು ಬೆಳೆಸಿಕೊಳ್ಳಲು ನೆರವಾಗುತ್ತವೆ.
        </>
      ) : (
        <>
          <span className="font-semibold text-foreground">Who I Am:</span> A strong life begins with a strong inner foundation. These values help teens understand themselves and develop the courage to live authentically.
        </>
      ),
      values: [
        language === "kn" ? (
          <>
            <span className="font-semibold text-primary">ಪ್ರಾಮಾಣಿಕತೆ (Integrity)</span> – ಕಷ್ಟದ ಸಂದರ್ಭದಲ್ಲಿಯೂ ಅಥವಾ ಯಾರೂ ನೋಡದಿದ್ದಾಗಲೂ ಸರಿಯಾದದ್ದನ್ನೇ ಮಾಡುವ ಮನೋಭಾವ.
          </>
        ) : (
          <>
            <span className="font-semibold text-primary">Integrity</span> - Doing what is right even when it is difficult or when no one is watching.
          </>
        ),
        language === "kn" ? (
          <>
            <span className="font-semibold text-primary">ನೈಜತೆ (Authenticity)</span> – ತಾವು ಯಾರು, ಏನು ಭಾವಿಸುತ್ತೇವೆ ಮತ್ತು ಯಾವ ಮೌಲ್ಯಗಳಿಗಾಗಿ ನಿಲ್ಲುತ್ತೇವೆ ಎಂಬುದರ ಬಗ್ಗೆ ಪ್ರಾಮಾಣಿಕವಾಗಿರುವುದು.
          </>
        ) : (
          <>
            <span className="font-semibold text-primary">Authenticity</span> - Being honest about who you are, what you feel, and what you stand for.
          </>
        ),
        language === "kn" ? (
          <>
            <span className="font-semibold text-primary">ಆತ್ಮಗೌರವ (Self-Respect)</span> – ತನ್ನ ಘನತೆ, ಮೌಲ್ಯ ಮತ್ತು ವೈಯಕ್ತಿಕ ಮಿತಿಗಳನ್ನು ಗೌರವಿಸುವುದು.
          </>
        ) : (
          <>
            <span className="font-semibold text-primary">Self-Respect</span> - Valuing your own dignity, worth, and boundaries.
          </>
        ),
      ],
    },
    {
      title: t("values.strings.Self-Mastery"),
      subtitle: language === "kn" ? (
        <>
          <span className="font-semibold text-foreground">ನಾನು ಹೇಗೆ ಬದುಕುತ್ತೇನೆ?</span> ಉತ್ತಮ ವ್ಯಕ್ತಿತ್ವವು ನಮ್ಮ ದೈನಂದಿನ ಆಯ್ಕೆಗಳು ಮತ್ತು ಅಭ್ಯಾಸಗಳಲ್ಲಿ ಪ್ರತಿಫಲಿಸಿದಾಗ ಮಾತ್ರ ಅದರ ನಿಜವಾದ ಅರ್ಥ ಮೂಡುತ್ತದೆ. ಈ ಮೌಲ್ಯಗಳು ತರುಣರಲ್ಲಿ ಶಿಸ್ತು, ಜವಾಬ್ದಾರಿಯುತ ನಡೆ ಹಾಗೂ ಸ್ವಯಂ ನಿಯಂತ್ರಣವನ್ನು ಬೆಳೆಸಲು ನೆರವಾಗುತ್ತವೆ.
        </>
      ) : (
        <>
          <span className="font-semibold text-foreground">How I Live:</span> Character becomes meaningful when it shapes daily choices and habits. These values help teens develop discipline, responsibility, and self-control.
        </>
      ),
      values: [
        language === "kn" ? (
          <>
            <span className="font-semibold text-primary">ಜವಾಬ್ದಾರಿ (Responsibility)</span> – ತನ್ನ ಆಯ್ಕೆಗಳು, ನಡೆ-ನುಡಿ ಹಾಗೂ ಅದರ ಪರಿಣಾಮಗಳ ಹೊಣೆಗಾರಿಕೆಯನ್ನು ಸ್ವೀಕರಿಸುವುದು.
          </>
        ) : (
          <>
            <span className="font-semibold text-primary">Responsibility</span> - Taking ownership of one's choices, actions, and their consequences.
          </>
        ),
        language === "kn" ? (
          <>
            <span className="font-semibold text-primary">ಶಿಸ್ತು (Discipline)</span> – ಬೆಳವಣಿಗೆ ಮತ್ತು ದೀರ್ಘಕಾಲೀನ ಯಶಸ್ಸಿಗೆ ನೆರವಾಗುವ ಉತ್ತಮ ಅಭ್ಯಾಸಗಳನ್ನು ನಿರಂತರವಾಗಿ ರೂಢಿಸಿಕೊಳ್ಳುವುದು.
          </>
        ) : (
          <>
            <span className="font-semibold text-primary">Discipline</span> - Building consistent habits that support growth and long-term success.
          </>
        ),
        language === "kn" ? (
          <>
            <span className="font-semibold text-primary">ಸಂಯಮ (Temperance)</span> – ವಿಶೇಷವಾಗಿ ಏಕಾಗ್ರತೆ ಮತ್ತು ಆಕರ್ಷಣೆಗಳಿಂದ ತುಂಬಿರುವ ಇಂದಿನ ಜಗತ್ತಿನಲ್ಲಿ, ಸ್ವಯಂ ನಿಯಂತ್ರಣ ಮತ್ತು ಜೀವನದಲ್ಲಿ ಸಮತೋಲನವನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳುವುದು.
          </>
        ) : (
          <>
            <span className="font-semibold text-primary">Temperance</span> - Practicing self-control and balance, especially in a world full of distractions and impulses.
          </>
        ),
      ],
    },
    {
      title: t("values.strings.Impact"),
      subtitle: language === "kn" ? (
        <>
          <span className="font-semibold text-foreground">ನಾನು ಜಗತ್ತಿನೊಂದಿಗೆ ಹೇಗೆ ಬೆರೆಯುತ್ತೇನೆ?</span> ನಮ್ಮ ನಿಜವಾದ ಬೆಳವಣಿಗೆ, ನಾವು ಇತರರೊಂದಿಗೆ ಹೇಗೆ ನಡೆದುಕೊಳ್ಳುತ್ತೇವೆ ಮತ್ತು ಸಮಾಜಕ್ಕೆ ಹೇಗೆ ಕೊಡುಗೆ ನೀಡುತ್ತೇವೆ ಎಂಬುದರಲ್ಲಿ ಪ್ರತಿಫಲಿಸುತ್ತದೆ. ಈ ಮೌಲ್ಯಗಳು ತರುಣರಲ್ಲಿ ಸಹಾನುಭೂತಿ, ಸಾಮಾಜಿಕ ಪ್ರಜ್ಞೆ ಹಾಗೂ ತಮ್ಮನ್ನು ಮೀರಿದ ಜೀವನದ ಉದ್ದೇಶವನ್ನು ಬೆಳೆಸಲು ನೆರವಾಗುತ್ತವೆ.
        </>
      ) : (
        <>
          <span className="font-semibold text-foreground">How I Engage With the World:</span> True growth is reflected in how we relate to others and contribute to society. These values help teens develop empathy and purpose beyond themselves.
        </>
      ),
      values: [
        language === "kn" ? (
          <>
            <span className="font-semibold text-primary">ಕುತೂಹಲ (Curiosity)</span> – ಹೊಸ ವಿಷಯಗಳನ್ನು ಕಲಿಯುವ, ಪ್ರಶ್ನಿಸುವ ಹಾಗೂ ಹೊಸ ಆಲೋಚನೆಗಳನ್ನು ಅನ್ವೇಷಿಸುವ ಆಸಕ್ತಿಯನ್ನು ಸದಾ ಜೀವಂತವಾಗಿರಿಸಿಕೊಳ್ಳುವುದು.
          </>
        ) : (
          <>
            <span className="font-semibold text-primary">Curiosity</span> - Maintaining a love for learning, questioning, and discovering new ideas.
          </>
        ),
        language === "kn" ? (
          <>
            <span className="font-semibold text-primary">ಸಹಾನುಭೂತಿ (Empathy)</span> – ಇತರರ ಅನುಭವಗಳು, ಭಾವನೆಗಳು ಮತ್ತು ಪರಿಸ್ಥಿತಿಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಂಡು ಕಾಳಜಿಯಿಂದ ಸ್ಪಂದಿಸುವುದು.
          </>
        ) : (
          <>
            <span className="font-semibold text-primary">Empathy</span> - Understanding and caring about the experiences and feelings of others.
          </>
        ),
        language === "kn" ? (
          <>
            <span className="font-semibold text-primary">ಕೊಡುಗೆ (Contribution)</span> – ತನ್ನ ಪ್ರತಿಭೆ, ಕೌಶಲ್ಯ ಮತ್ತು ಸಾಮರ್ಥ್ಯಗಳನ್ನು ಬಳಸಿಕೊಂಡು ಸಮಾಜ ಮತ್ತು ಜಗತ್ತಿನಲ್ಲಿ ಸಕಾರಾತ್ಮಕ ಬದಲಾವಣೆಯನ್ನು ಮೂಡಿಸುವುದು.
          </>
        ) : (
          <>
            <span className="font-semibold text-primary">Contribution</span> - Using one's talents, skills, and strengths to make a positive difference in the world.
          </>
        ),
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-16 bg-background min-h-screen">
        <section className="footer-theme-legacy py-20 bg-card border-b border-border/50">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h1>
              <LetterSwapForward
                label={t("values.title")}
                className="justify-center text-2xl sm:text-4xl md:text-5xl font-display font-bold mb-4 leading-tight"
                style={{ color: '#FCEADE' }}
              />
            </h1>
            <p className="text-lg text-white font-body">
              {t("values.strings.Our shared foundation for raising grounded, responsible, and purposeful young individuals.")}
            </p>
          </div>
        </section>

        <section className="py-14 bg-background">
          <div className="container mx-auto px-6 max-w-4xl">
            <article ref={articleRef} className="relative rounded-xl border border-border/60 bg-white [--foreground:0_0%_0%] [--muted-foreground:0_0%_0%] [--border:152_20%_86%] p-6 md:p-8 space-y-8">
              <TextToSpeechButton targetRef={articleRef} />
              <section className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-display font-semibold text-primary">
                    {t("values.vision")}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-body">{visionStatement}</p>
                </div>
                <div className="space-y-2 border-t border-border/50 pt-6">
                  <h3 className="text-xl md:text-2xl font-display font-semibold text-primary">
                    {t("values.mission")}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-body">{missionStatement}</p>
                </div>
              </section>

              <section className="space-y-4 border-t border-border/50 pt-6">
                <h3 className="text-xl md:text-2xl font-display font-semibold text-primary">
                  {t("values.valuesTitle")}
                </h3>
                <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed font-body">
                  {introParagraphs.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex}>{paragraph}</p>
                  ))}
                </div>

                <div className="space-y-8">
                  {sections.map((section) => (
                    <section key={section.title} className="space-y-4 border-t border-border/50 pt-6">
                      <h3 className="text-xl md:text-2xl font-display font-semibold text-primary">{section.title}</h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-body">{section.subtitle}</p>
                      <div className="space-y-3">
                        {section.values.map((value, valueIndex) => (
                          <p key={valueIndex} className="text-sm md:text-base text-muted-foreground leading-relaxed font-body">
                            {value}
                          </p>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </section>

              <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed font-body border-t border-border/50 pt-6">
                <p>
                  {t("values.strings.These values shape the culture of Ikigai Teen - guiding our coaching programs, our learning tools, and the community we build with teens, parents, educators, and mentors.")}
                </p>
                <p>
                  {t("values.strings.Our aim is not perfection, but the steady development of self-aware, responsible, and compassionate individuals who can lead meaningful lives.")}
                </p>
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ValuesVisionMission;
