import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { LetterSwapForward } from "@/components/ui/letter-swap";
import { ClipPathInfoCard } from "@/components/ui/clip-path-links";

const beOurTraineeCoachesCards = [
  { id: "who-this-is-for", title: "Who This Is For", description: "College students, recent graduates, and aspiring coaches or mentors interested in youth development." },
  { id: "what-you-will-learn", title: "What You Will Learn", description: "How teens think, how to guide without controlling, and how to support real behaviour change." },
  { id: "what-you-will-do", title: "What You Will Do", description: "Assist in sessions, observe senior guides, support teen engagement, and gradually take on guided responsibilities." },
  { id: "what-makes-different", title: "What Makes This Different", description: "Hands-on training in real teen development — not a passive internship or just observation." },
  { id: "what-you-gain", title: "What You Gain", description: "Real experience with teens, structured mentorship, and the opportunity to grow into a future coach." },
  { id: "who-this-may-not-be-for", title: "Who This May Not Be For", description: "Those seeking quick or casual work, or those not open to learning, feedback, and consistency." },
];

const beOurTraineeCoachesDetails = [
  {
    id: "who-this-is-for",
    title: "Who This Is For",
    opening: "We are looking for:",
    bullets: [
      "College students / recent graduates",
      "Aspiring coaches, mentors, educators",
      "Individuals interested in youth development",
      "Those who want meaningful, purpose-driven work",
    ],
    closing: "You should be: willing to learn, consistent and responsible, open to feedback, and interested in working with teens.",
  },
  {
    id: "what-you-will-learn",
    title: "What You Will Learn",
    bullets: [
      "how teens think and behave",
      "how to guide without controlling",
      "how to build habits and discipline",
      "how to communicate clearly and calmly",
      "how to support real behaviour change",
    ],
  },
  {
    id: "what-you-will-do",
    title: "What You Will Do",
    bullets: [
      "assist in sessions and programs",
      "observe and learn from senior guides",
      "support teen engagement and activities",
      "gradually take on guided responsibilities",
    ],
  },
  {
    id: "what-makes-different",
    title: "What Makes This Different",
    opening: "This is not:",
    bullets: [
      "a passive internship",
      "just observation",
    ],
    closing: "This is hands-on training in real teen development.",
  },
  {
    id: "what-you-gain",
    title: "What You Gain",
    bullets: [
      "real experience working with teens",
      "structured learning and mentorship",
      "clarity in communication and guidance",
      "exposure to behaviour and habit-building systems",
      "opportunity to grow into a future coach",
    ],
  },
  {
    id: "who-this-may-not-be-for",
    title: "Who This May Not Be For",
    bullets: [
      "if you are looking for quick or casual work",
      "if consistency is difficult",
      "if you are not open to learning and feedback",
    ],
  },
];

const BeOurTraineeCoaches = () => {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const detailsById = beOurTraineeCoachesDetails.reduce<Record<string, (typeof beOurTraineeCoachesDetails)[number]>>((acc, section) => {
    acc[section.id] = section;
    return acc;
  }, {});

  const renderCardGrid = (cards: typeof beOurTraineeCoachesCards, colsClass = "lg:grid-cols-3") => (
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
                    className="h-full rounded-xl bg-[hsl(195_25%_96%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-6"
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
                label="Be Our Trainee Coaches"
                className="justify-center text-4xl md:text-5xl font-display font-bold text-primary mb-4"
              />
            </h1>
            <p className="text-lg text-muted-foreground font-body">
              Learn to guide teens. Not just advise them.
            </p>
          </div>
        </section>

        {/* Box 1: Intro + 6 Cards */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-6 max-w-5xl">
            <article className="rounded-xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-6 md:p-8 lg:p-10 space-y-8">
              <section className="space-y-4 text-center">
                <h3 className="text-xl md:text-2xl font-display font-semibold text-primary flex flex-col items-center gap-1 md:gap-2">
                  <LetterSwapForward label="Ikigai Teen is building a pool of young individuals who can" className="justify-center" />
                  <LetterSwapForward label="support teen growth with clarity, structure, and responsibility." className="justify-center" />
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-body max-w-3xl mx-auto">
                  Learn to guide teens. Not just advise them.
                </p>
              </section>

              {renderCardGrid(beOurTraineeCoachesCards)}
            </article>
          </div>
        </section>

        {/* Box 2: Next Step + CTA Buttons */}
        <section className="py-12 pb-20 bg-background">
          <div className="container mx-auto px-6 max-w-4xl">
            <article className="rounded-xl border border-primary/20 bg-[hsl(195_25%_96%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-6 md:p-8 space-y-8 text-center">
              <section className="space-y-4">
                <h3 className="text-xl md:text-2xl font-display font-semibold text-primary flex justify-center">
                  <LetterSwapForward label="Next Step" className="justify-center" />
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-body max-w-2xl mx-auto">
                  If you want to learn how to guide, not just speak — apply. Share your background, tell us why this interests you, and show your willingness to learn.
                </p>
              </section>

              <div className="flex flex-wrap justify-center gap-4 pt-6 border-t border-border/50">
                <Link
                  to="/#contact"
                  className="inline-flex items-center justify-center rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-11 py-2 px-6"
                >
                  Apply as a Trainee Coach
                </Link>
                <Link
                  to="/#contact"
                  className="inline-flex items-center justify-center rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background border border-primary/35 text-primary bg-background hover:bg-primary/10 h-11 py-2 px-6"
                >
                  Start Your Journey
                </Link>
                <Link
                  to="/get-involved"
                  className="inline-flex items-center justify-center rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background bg-secondary text-secondary-foreground hover:bg-secondary/80 h-11 py-2 px-6"
                >
                  Explore Other Roles
                </Link>
              </div>

            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BeOurTraineeCoaches;
