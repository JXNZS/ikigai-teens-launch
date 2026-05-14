import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { LetterSwapForward } from "@/components/ui/letter-swap";

const introParagraphs = [
  "At Ikigai Teen, we believe that the strength of a young person's future is shaped by the values they build early in life. In a world filled with distraction, pressure, and rapid change, values act as an inner compass - helping teens make wise decisions, develop strong character, and contribute positively to the world around them.",
  "Our work with teens is guided by nine core values, organised into three essential areas of growth:",
  <span key="intro-focus-line" className="font-semibold text-foreground">
    Who I Am - How I Live - How I Engage With the World
  </span>,
  "Together, these values form the foundation of the Ikigai Teen approach to developing grounded, responsible, and purposeful young individuals.",
];

const sections = [
  {
    title: "Inner Character",
    subtitle: (
      <>
        <span className="font-semibold text-foreground">Who I Am:</span> A strong life begins with a strong inner foundation. These values help teens understand themselves and develop the courage to live authentically.
      </>
    ),
    values: [
      <>
        <span className="font-semibold text-primary">Integrity</span> - Doing what is right even when it is difficult or when no one is watching.
      </>,
      <>
        <span className="font-semibold text-primary">Authenticity</span> - Being honest about who you are, what you feel, and what you stand for.
      </>,
      <>
        <span className="font-semibold text-primary">Self-Respect</span> - Valuing your own dignity, worth, and boundaries.
      </>,
    ],
  },
  {
    title: "Self-Mastery",
    subtitle: (
      <>
        <span className="font-semibold text-foreground">How I Live:</span> Character becomes meaningful when it shapes daily choices and habits. These values help teens develop discipline, responsibility, and self-control.
      </>
    ),
    values: [
      <>
        <span className="font-semibold text-primary">Responsibility</span> - Taking ownership of one's choices, actions, and their consequences.
      </>,
      <>
        <span className="font-semibold text-primary">Discipline</span> - Building consistent habits that support growth and long-term success.
      </>,
      <>
        <span className="font-semibold text-primary">Temperance</span> - Practicing self-control and balance, especially in a world full of distractions and impulses.
      </>,
    ],
  },
  {
    title: "Impact",
    subtitle: (
      <>
        <span className="font-semibold text-foreground">How I Engage With the World:</span> True growth is reflected in how we relate to others and contribute to society. These values help teens develop empathy and purpose beyond themselves.
      </>
    ),
    values: [
      <>
        <span className="font-semibold text-primary">Curiosity</span> - Maintaining a love for learning, questioning, and discovering new ideas.
      </>,
      <>
        <span className="font-semibold text-primary">Empathy</span> - Understanding and caring about the experiences and feelings of others.
      </>,
      <>
        <span className="font-semibold text-primary">Contribution</span> - Using one's talents, skills, and strengths to make a positive difference in the world.
      </>,
    ],
  },
];

const visionStatement =
  "To nurture a generation of self-aware, resilient and value-driven teens who grow into responsible leaders for their families, communities and the world.";

const missionStatement =
  "To equip teens with the mindset, values, and practical life skills needed to navigate modern challenges, discover who they are, and grow into emotionally strong, responsible individuals - through structured coaching, practical tools, and a supportive ecosystem of parents, educators, and mentors.";

const ValuesVisionMission = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16 bg-background min-h-screen">
        <section className="footer-theme-legacy py-20 bg-card border-b border-border/50">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h1>
              <LetterSwapForward
                label="Vision, Mission & Values"
                className="justify-center text-2xl sm:text-4xl md:text-5xl font-display font-bold mb-4 leading-tight"
                style={{ color: '#FCEADE' }}
              />
            </h1>
            <p className="text-lg text-white font-body">Our shared foundation for raising grounded, responsible, and purposeful young individuals.</p>
          </div>
        </section>

        <section className="py-14 bg-background">
          <div className="container mx-auto px-6 max-w-4xl">
            <article className="rounded-xl border border-border/60 bg-white [--foreground:0_0%_0%] [--muted-foreground:0_0%_0%] [--border:152_20%_86%] p-6 md:p-8 space-y-8">
              <section className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-display font-semibold text-primary">Vision</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-body">{visionStatement}</p>
                </div>
                <div className="space-y-2 border-t border-border/50 pt-6">
                  <h3 className="text-xl md:text-2xl font-display font-semibold text-primary">Mission</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-body">{missionStatement}</p>
                </div>
              </section>

              <section className="space-y-4 border-t border-border/50 pt-6">
                <h3 className="text-xl md:text-2xl font-display font-semibold text-primary">Values</h3>
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

