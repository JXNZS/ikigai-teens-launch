import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { LetterSwapForward } from "@/components/ui/letter-swap";
import { ClipPathInfoCard } from "@/components/ui/clip-path-links";

const beOurInternsGuestsCards = [
  { id: "who-this-is-for", title: "Who This Is For", description: "Students, young professionals, creators, and communicators who want to contribute meaningfully to youth development." },
  { id: "interns-what-you-do", title: "Interns — What You Do", description: "Support programs, assist in content or operations, work on specific projects, and learn how structured teen development works." },
  { id: "volunteers-how-you-contribute", title: "Volunteers — How You Can Contribute", description: "Share insights, conduct focused sessions, or bring unique real-world perspectives teens can learn from." },
  { id: "what-you-will-experience", title: "What You Will Experience", description: "A structured, purpose-driven environment with real interaction with teen programs and learning beyond theory." },
  { id: "what-makes-different", title: "What Makes This Different", description: "Meaningful contribution with real learning — not routine internship work or surface-level guest talks." },
  { id: "who-this-may-not-be-for", title: "Who This May Not Be For", description: "Those seeking casual or low-commitment work, purely theoretical involvement, or those who struggle with consistency." },
];

const beOurInternsGuestsDetails = [
  {
    id: "who-this-is-for",
    title: "Who This Is For",
    opening: "We welcome:",
    bullets: [
      "Students and young professionals",
      "Individuals exploring youth development",
      "Creators, communicators, facilitators",
      "Anyone interested in contributing meaningfully",
    ],
  },
  {
    id: "interns-what-you-do",
    title: "Interns — What You Do",
    bullets: [
      "support ongoing programs and activities",
      "assist in content, operations, or engagement",
      "work on specific projects or initiatives",
      "learn how structured teen development works",
    ],
  },
  {
    id: "volunteers-how-you-contribute",
    title: "Volunteers — How You Can Contribute",
    bullets: [
      "support teen activities and initiatives",
      "assist in events, engagement, or outreach",
      "contribute your time, skills, or ideas",
      "help create a positive impact for teens",
      "be part of a purpose-driven community",
    ],
  },
  {
    id: "what-you-will-experience",
    title: "What You Will Experience",
    bullets: [
      "a structured, purpose-driven environment",
      "real interaction with teen programs",
      "exposure to behaviour, habits, and growth systems",
      "learning beyond theory",
    ],
  },
  {
    id: "what-makes-different",
    title: "What Makes This Different",
    opening: "This is not:",
    bullets: [
      "routine internship work",
      "surface-level guest talks",
    ],
    closing: "This is meaningful contribution with real learning.",
  },
  {
    id: "who-this-may-not-be-for",
    title: "Who This May Not Be For",
    bullets: [
      "if you are looking for casual or low-commitment work",
      "if you prefer purely theoretical involvement",
      "if consistency is difficult",
    ],
  },
];

const BeOurInternsGuests = () => {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const detailsById = beOurInternsGuestsDetails.reduce<Record<string, (typeof beOurInternsGuestsDetails)[number]>>((acc, section) => {
    acc[section.id] = section;
    return acc;
  }, {});

  const renderCardGrid = (cards: typeof beOurInternsGuestsCards, colsClass = "lg:grid-cols-3") => (
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
                    className="h-full rounded-xl bg-[hsl(42_38%_88%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-6"
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
                label="Be Our Intern / Volunteer"
                className="justify-center text-4xl md:text-5xl font-display font-bold text-primary mb-4"
              />
            </h1>
            <p className="text-lg text-muted-foreground font-body">
              Contribute. Learn. Be part of something meaningful.
            </p>
          </div>
        </section>

        {/* Box 1: Intro + 6 Cards */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-6 max-w-5xl">
            <article className="rounded-xl border border-border/60 bg-[hsl(42_38%_88%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-6 md:p-8 lg:p-10 space-y-8">
              <section className="space-y-4 text-center">
                <h3 className="text-xl md:text-2xl font-display font-semibold text-primary flex flex-col items-center gap-1 md:gap-2">
                  <LetterSwapForward label="Ikigai Teen invites individuals who want to experience," className="justify-center" />
                  <LetterSwapForward label="contribute, and grow in a real teen development environment." className="justify-center" />
                </h3>
              </section>

              {renderCardGrid(beOurInternsGuestsCards)}
            </article>
          </div>
        </section>

        {/* Box 2: Next Step + CTA Buttons */}
        <section className="py-12 pb-20 bg-background">
          <div className="container mx-auto px-6 max-w-4xl">
            <article className="cta-card rounded-xl border border-primary/20 bg-[hsl(42_38%_88%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-6 md:p-8 space-y-8 text-center">
              <section className="space-y-4">
                <h3 className="text-xl md:text-2xl font-display font-semibold text-primary flex justify-center">
                  <LetterSwapForward label="Next Step" className="justify-center" />
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-body max-w-2xl mx-auto">
                  If you want to contribute and learn in a meaningful way, apply. Share your background, tell us how you'd like to contribute, and highlight your areas of interest.
                </p>
              </section>

              <div className="flex flex-wrap justify-center gap-4 pt-6 border-t border-border/50">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScNcKye3m-tOX4M8ZW0PzRlmYJ5j0Gm-E_5N3PKOOeJawNhvQ/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-button"
                >
                  Apply as an Intern/Volunteer
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

export default BeOurInternsGuests;
