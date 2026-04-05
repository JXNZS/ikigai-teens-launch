import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { LetterSwapForward } from "@/components/ui/letter-swap";

const introParagraphs = [
  "At Ikigai Teen, we believe that the strength of a young person's future is shaped by the values they build early in life. In a world filled with distraction, pressure, and rapid change, values act as an inner compass - helping teens make wise decisions, develop strong character, and contribute positively to the world around them.",
  "Our work with teens is guided by nine core values, organised into three essential areas of growth:",
  "Who I Am | How I Live | How I Engage With the World",
  "Together, these values form the foundation of the Ikigai Teen approach to developing grounded, responsible, and purposeful young individuals.",
];

const sections = [
  {
    title: "Inner Character",
    subtitle: "Who I Am: A strong life begins with a strong inner foundation. These values help teens understand themselves and develop the courage to live authentically.",
    values: [
      "Integrity - Doing what is right even when it is difficult or when no one is watching.",
      "Self-Awareness - Understanding one's thoughts, emotions, strengths, and limitations.",
      "Courage - The willingness to face challenges, admit mistakes, and stand up for what matters.",
    ],
  },
  {
    title: "Self-Mastery",
    subtitle: "How I Live: Character becomes meaningful when it shapes daily choices and habits. These values help teens develop discipline, responsibility, and self-control.",
    values: [
      "Responsibility - Taking ownership of one's choices, actions, and their consequences.",
      "Discipline - Building consistent habits that support growth and long-term success.",
      "Temperance - Practicing self-control and balance, especially in a world full of distractions and impulses.",
    ],
  },
  {
    title: "Impact",
    subtitle: "How I Engage With the World: True growth is reflected in how we relate to others and contribute to society. These values help teens develop empathy and purpose beyond themselves.",
    values: [
      "Curiosity - Maintaining a love for learning, questioning, and discovering new ideas.",
      "Empathy - Understanding and caring about the experiences and feelings of others.",
      "Contribution - Using one's talents, skills, and strengths to make a positive difference in the world.",
    ],
  },
];

const ValuesVisionMission = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16 bg-background min-h-screen">
        <section className="py-20 bg-card/60 border-b border-border/50">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h1>
              <LetterSwapForward
                label="Values, Vision & Mission"
                className="justify-center text-4xl md:text-5xl font-display font-bold text-primary mb-4"
              />
            </h1>
            <p className="text-lg text-muted-foreground font-body">Our shared foundation for raising grounded, responsible, and purposeful young individuals.</p>
          </div>
        </section>

        <section className="content-theme-legacy py-14 bg-background">
          <div className="container mx-auto px-6 max-w-4xl">
            <article className="rounded-xl border border-border/60 bg-card/70 p-6 md:p-8 space-y-8">
              <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground">Our Core Values</h2>
              <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed font-body">
                {introParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="space-y-8">
                {sections.map((section) => (
                  <section key={section.title} className="space-y-4 border-t border-border/50 pt-6">
                    <h3 className="text-xl md:text-2xl font-display font-semibold text-foreground">{section.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-body">{section.subtitle}</p>
                    <div className="space-y-3">
                      {section.values.map((value) => (
                        <p key={value} className="text-sm md:text-base text-muted-foreground leading-relaxed font-body">
                          {value}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed font-body border-t border-border/50 pt-6">
                <p>
                  These values shape the culture of Ikigai Teen - guiding our coaching programs, our learning tools, and the
                  community we build with teens, parents, educators, and mentors.
                </p>
                <p>
                  Our aim is not perfection, but the steady development of self-aware, responsible, and compassionate
                  individuals who can lead meaningful lives.
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
