import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { LetterSwapForward } from "@/components/ui/letter-swap";
import { ClipPathInfoCard } from "@/components/ui/clip-path-links";

const beOurExpertsCards = [
  { id: "who-we-are-looking-for", title: "Who We Are Looking For", description: "Educators, coaches, psychologists, and professionals with real-world experience." },
  { id: "your-role", title: "Your Role", description: "Not to speak. To shape. Guide sessions and support habit building." },
  { id: "areas-to-contribute", title: "Areas You Can Contribute", description: "Focus, emotional awareness, digital balance, and purpose." },
  { id: "what-makes-different", title: "What Makes This Different", description: "Structured, outcome-based development—not just one-time sessions." },
  { id: "not-for-you-if", title: "This May Not Be For You If", description: "You prefer one-way speaking or struggle with consistency." },
  { id: "why-this-matters", title: "Why This Matters", description: "Help teens build habits, stay consistent, and grow stronger." }
];

const beOurExpertsDetails = [
  {
    id: "who-we-are-looking-for",
    title: "Who We Are Looking For",
    opening: "We are looking for:",
    bullets: [
      "Educators, coaches, mentors",
      "Psychologists / counsellors",
      "Professionals working with teens",
      "Individuals with real-world experience"
    ],
    closing: "You should be: clear in communication, practical in approach, grounded in values, and consistent and responsible."
  },
  {
    id: "your-role",
    title: "Your Role",
    opening: "Not to speak. To shape. You may:",
    bullets: [
      "guide focused sessions",
      "support behaviour and habit building",
      "bring real-life perspective",
      "help teens grow with clarity and structure"
    ]
  },
  {
    id: "areas-to-contribute",
    title: "Areas You Can Contribute",
    bullets: [
      "Focus & discipline",
      "Emotional awareness",
      "Confidence & self-respect",
      "Communication & decision-making",
      "Digital balance",
      "Purpose & direction",
      "Health & wellness",
      "Power of Habits"
    ]
  },
  {
    id: "what-makes-different",
    title: "What Makes This Different",
    opening: "This is not:",
    bullets: [
      "motivational speaking",
      "one-time sessions"
    ],
    closing: "This is structured, outcome-based teen development."
  },
  {
    id: "not-for-you-if",
    title: "This May Not Be For You If",
    bullets: [
      "you prefer only one-way speaking",
      "your approach is purely motivational",
      "consistency is difficult"
    ]
  },
  {
    id: "why-this-matters",
    title: "Why This Matters",
    opening: "Teens today know a lot, but struggle to act. The right guidance helps them:",
    bullets: [
      "build habits",
      "stay consistent",
      "grow into stronger individuals"
    ]
  }
];

const BeOurExperts = () => {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const detailsById = beOurExpertsDetails.reduce<Record<string, (typeof beOurExpertsDetails)[number]>>((acc, section) => {
    acc[section.id] = section;
    return acc;
  }, {});

  const renderCardGrid = (cards: typeof beOurExpertsCards, colsClass = "lg:grid-cols-3") => (
    <div className={`grid md:grid-cols-2 ${colsClass} gap-4 pt-6 border-t border-border/50`}>
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, delay: index * 0.03 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {expandedCardId === card.id ? (
              <motion.article
                key={`${card.id}-expanded`}
                className="rounded-xl border border-border/60 bg-card p-6 h-full flex flex-col"
                initial={{ opacity: 0, y: 12, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.99 }}
                transition={{ duration: 0.24 }}
              >
                <button
                  type="button"
                  onClick={() => setExpandedCardId(null)}
                  className="mb-3 inline-flex self-start items-center gap-1 rounded-md border border-primary/35 px-2 py-1 text-xs font-semibold text-primary hover:bg-primary/10 transition-colors"
                  aria-label={`Collapse ${card.title} details`}
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back
                </button>
                <h3 className="text-base md:text-lg font-display font-semibold text-primary mb-3 leading-tight">
                  {detailsById[card.id]?.title ?? card.title}
                </h3>
                {detailsById[card.id]?.opening && (
                  <p className="text-sm leading-relaxed text-muted-foreground mb-4">{detailsById[card.id]?.opening}</p>
                )}
                <ul className="space-y-2 mb-4 text-sm text-muted-foreground">
                  {(detailsById[card.id]?.bullets ?? []).map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                {detailsById[card.id]?.closing && (
                  <p className="text-sm leading-relaxed text-muted-foreground mt-auto pt-2">{detailsById[card.id]?.closing}</p>
                )}
              </motion.article>
            ) : (
              <motion.div key={`${card.id}-collapsed`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} className="h-full">
                <button
                  type="button"
                  onClick={() => setExpandedCardId(card.id)}
                  className="block w-full h-full text-left"
                  aria-label={`Open ${card.title} details`}
                >
                  <ClipPathInfoCard
                    title={card.title}
                    body={card.description}
                    className="h-full rounded-xl bg-white [--foreground:0_0%_0%] [--muted-foreground:0_0%_0%] [--border:152_20%_86%] p-6"
                  >
                    <p className="mt-4 text-xs uppercase tracking-wide font-semibold text-primary/90">Open details</p>
                  </ClipPathInfoCard>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );

  return (
    <>
      <Navbar />
      <main className="pt-16 bg-background min-h-screen">
        <section className="footer-theme-legacy py-20 bg-card border-b border-border/50">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h1>
              <LetterSwapForward
                label="Be Our Expert/Guest Speaker"
                className="justify-center text-4xl md:text-5xl font-display font-bold mb-4"
                style={{ color: '#FCEADE' }}
              />
            </h1>
            <p className="text-lg text-white font-body">
              If you can guide a teen, you can shape a life.
            </p>
          </div>
        </section>

        {/* Box 1: Intro + 6 Cards */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-6 max-w-5xl">
            <article className="rounded-xl border border-border/60 bg-white [--foreground:0_0%_0%] [--muted-foreground:0_0%_0%] [--border:152_20%_86%] p-6 md:p-8 lg:p-10 space-y-8">
              <section className="space-y-4 text-center">
                <h3 className="text-xl md:text-2xl font-display font-semibold text-primary flex flex-col items-center gap-1 md:gap-2">
                  <LetterSwapForward label="We’re building a generation of teens who are" className="justify-center" />
                  <LetterSwapForward label="more aware, disciplined, and purpose-driven." className="justify-center" />
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-body max-w-3xl mx-auto">
                  This requires real guidance — not just information.
                </p>
              </section>

              {renderCardGrid(beOurExpertsCards)}
            </article>
          </div>
        </section>

        {/* Box 3: Next Step + Final Thoughts + Buttons */}
        <section className="py-12 pb-20 bg-background">
          <div className="container mx-auto px-6 max-w-4xl">
            <article className="cta-card rounded-xl border border-primary/20 bg-white [--foreground:0_0%_0%] [--muted-foreground:0_0%_0%] [--border:152_20%_86%] p-6 md:p-8 space-y-8 text-center">
              <section className="space-y-4">
                <h3 className="text-xl md:text-2xl font-display font-semibold text-primary flex justify-center">
                  <LetterSwapForward label="Next Step" className="justify-center" />
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-body max-w-2xl mx-auto">
                  If you can guide with clarity, we’d like to hear from you. Share your background and tell us how you can contribute.
                </p>
              </section>

              <div className="flex flex-wrap justify-center gap-4 pt-6 border-t border-border/50">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSca5iG2xUvrJ9cyLAdMKtO5Dspc3YMIke8piqtozxhbV597GA/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-button"
                >
                  Apply as an Expert/Guest Speaker
                </a>
              </div>

            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BeOurExperts;

