import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { LetterSwapForward } from "@/components/ui/letter-swap";
import { ClipPathInfoCard } from "@/components/ui/clip-path-links";

const parentChallengesCards = [
  { id: "what-you-may-be-experiencing", title: "What You May Be Experiencing", description: "Recognize the signs of reduced communication, distraction, and unpredictable reactions." },
  { id: "whats-really-happening", title: "What’s Really Happening", description: "Understand the underlying patterns driving your teen's behaviour and struggles." },
  { id: "where-parents-get-stuck", title: "Where Parents Get Stuck", description: "Identify common patterns where parenting efforts miss the mark." },
  { id: "the-core-challenge", title: "The Core Challenge", description: "Discover why the gap between awareness and consistent action exists for teens." },
  { id: "key-areas-navigating", title: "Key Areas Parents Are Navigating", description: "Explore specific challenges from low focus to emotional instability and resistance." },
  { id: "why-traditional-approaches-fall-short", title: "Why Traditional Approaches Fall Short", description: "Learn why advice, telling, and reminding are not enough to create lasting change." },
  { id: "where-parents-need-support", title: "Where Parents Need Support", description: "Find out how to guide your teen without constant conflict or emotional burnout." },
  { id: "how-ikigai-helps", title: "How Ikigai Teen Helps", description: "Discover how structured challenges and habit-building systems turn awareness into action." },
  { id: "impact-for-parents", title: "Impact for Parents", description: "Experience reduced instructions, more stability, and a shift from pushing to guiding." },
  { id: "when-to-take-next-step", title: "When to Take the Next Step", description: "Recognize when it's time to seek structured support beyond just regular guidance." }
];

const parentChallengesDetails = [
  {
    id: "what-you-may-be-experiencing",
    title: "What You May Be Experiencing",
    bullets: [
      "reduced communication or coldness",
      "increased distraction and screen dependence",
      "emotional reactions that feel intense or unpredictable",
      "inconsistency despite ability",
      "effort that does not match potential"
    ],
    closing: "Often, the more you correct, explain, or remind, the less effective it becomes."
  },
  {
    id: "whats-really-happening",
    title: "What’s Really Happening",
    opening: "This is rarely just behaviour. It is driven by underlying patterns. Today’s teens often struggle with:",
    bullets: [
      "fragmented attention",
      "lack of internal structure",
      "emotional overload",
      "comparison and validation loops",
      "low consistency and follow-through",
      "unclear direction"
    ],
    closing: "What appears as attitude or carelessness is often a lack of trained internal strength."
  },
  {
    id: "where-parents-get-stuck",
    title: "Where Parents Get Stuck",
    opening: "The effort is there. The method is unclear. Common patterns include:",
    bullets: [
      "repeating instructions without building systems",
      "increasing pressure when consistency drops",
      "reacting to outcomes instead of shaping habits",
      "focusing on short-term compliance over long-term growth"
    ]
  },
  {
    id: "the-core-challenge",
    title: "The Core Challenge",
    opening: "Most teens understand what they should do. But they struggle to act consistently.",
    closing: "The gap between awareness and action is where most challenges exist."
  },
  {
    id: "key-areas-navigating",
    title: "Key Areas Parents Are Navigating",
    bullets: [
      "distraction and low focus",
      "lack of consistency",
      "emotional instability",
      "low confidence",
      "peer and social pressure",
      "relationship and identity confusion",
      "lack of direction",
      "resistance to guidance",
      "hidden patterns such as avoidance or procrastination"
    ]
  },
  {
    id: "why-traditional-approaches-fall-short",
    title: "Why Traditional Approaches Fall Short",
    opening: "Advice alone is not enough. Telling, reminding, and correcting do not create lasting change. What teens need is:",
    bullets: [
      "structure",
      "guided practice",
      "repetition",
      "accountability"
    ],
    closing: "Without this, awareness does not become behaviour."
  },
  {
    id: "where-parents-need-support",
    title: "Where Parents Need Support",
    opening: "Parents need more than information. They need a structured way to guide their teen:",
    bullets: [
      "without constant conflict",
      "without repeated arguments",
      "without emotional burnout"
    ]
  },
  {
    id: "how-ikigai-helps",
    title: "How Ikigai Teen Helps",
    opening: "Ikigai Teen focuses on turning awareness into action through:",
    bullets: [
      "structured challenges",
      "guided routines",
      "behaviour training",
      "habit-building systems",
      "accountability"
    ]
  },
  {
    id: "impact-for-parents",
    title: "Impact for Parents",
    bullets: [
      "reduced need for repeated instructions",
      "improved follow-through",
      "stronger internal discipline in teens",
      "more stability at home",
      "shift from pushing to guiding"
    ]
  },
  {
    id: "when-to-take-next-step",
    title: "When to Take the Next Step",
    opening: "If you are noticing:",
    bullets: [
      "repeated patterns without change",
      "increasing distraction or inconsistency",
      "emotional reactivity",
      "difficulty maintaining routines & relationships"
    ],
    closing: "It may be time for structured support, not just guidance."
  }
];

const ParentChallenges = () => {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const detailsById = parentChallengesDetails.reduce<Record<string, (typeof parentChallengesDetails)[number]>>((acc, section) => {
    acc[section.id] = section;
    return acc;
  }, {});

  const renderCardGrid = (cards: typeof parentChallengesCards, colsClass = "lg:grid-cols-3") => (
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
                <h3 className="text-xl font-display font-semibold text-primary mb-3">
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
                label="Parent Challenges"
                className="justify-center text-4xl md:text-5xl font-display font-bold text-primary mb-4"
              />
            </h1>
            <p className="text-lg text-muted-foreground font-body">
              You’re trying to guide your teen. But the environment has changed.
            </p>
          </div>
        </section>

        {/* Box 1: Intro + 6 Cards */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-6 max-w-5xl">
            <article className="rounded-xl border border-border/60 bg-[hsl(42_38%_88%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-6 md:p-8 lg:p-10 space-y-8">
              <section className="space-y-4 text-center">
                <h3 className="text-xl md:text-2xl font-display font-semibold text-primary">
                  <LetterSwapForward label="Parenting today is more complex than before." className="justify-center" />
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-body max-w-3xl mx-auto">
                  Many parents are not failing. They are navigating without a clear system.
                </p>
              </section>

              {renderCardGrid(parentChallengesCards.slice(0, 6))}
            </article>
          </div>
        </section>

        {/* Box 2: What Actually Helps + 4 Cards */}
        <section className="py-6 bg-background">
          <div className="container mx-auto px-6 max-w-5xl">
            <article className="rounded-xl border border-border/60 bg-[hsl(42_38%_88%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-6 md:p-8 lg:p-10 space-y-8">
              <section className="space-y-6 text-center">
                <h3 className="text-xl md:text-2xl font-display font-semibold text-primary text-center">
                  <LetterSwapForward label="What Actually Helps" className="justify-center" />
                </h3>
                <div className="text-left md:pl-8">
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-body mb-4">
                    Not more pressure. Not more reminders. But better structure. Effective growth comes from:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-muted-foreground leading-relaxed font-body">
                    <li>clear routines</li>
                    <li>consistent practice</li>
                    <li>accountability systems</li>
                    <li>reflection and feedback</li>
                    <li>gradual habit building</li>
                  </ul>
                  <p className="text-sm md:text-base text-primary font-medium leading-relaxed font-body mt-4">
                    This is what builds discipline, confidence, and consistency.
                  </p>
                </div>
              </section>

              {renderCardGrid(parentChallengesCards.slice(6), "lg:grid-cols-2")}
            </article>
          </div>
        </section>

        {/* Box 3: Next Step + Final Thoughts + Buttons */}
        <section className="py-12 pb-20 bg-background">
          <div className="container mx-auto px-6 max-w-4xl">
            <article className="cta-card rounded-xl border border-primary/20 bg-[hsl(42_38%_88%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-6 md:p-8 space-y-8 text-center">
              <section className="space-y-4">
                <h3 className="text-xl md:text-2xl font-display font-semibold text-primary flex justify-center">
                  <LetterSwapForward label="Next Step" className="justify-center" />
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-body max-w-2xl mx-auto">
                  Understanding the challenge is the first step. Resolving it requires the right system. Explore how Ikigai Teen can support your teen’s growth.
                </p>
              </section>

              <section className="space-y-4 border-t border-border/50 pt-8">
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-body max-w-2xl mx-auto">
                  <span className="text-primary text-base md:text-lg font-medium">Most teen challenges are not permanent.</span><br/><br/>
                  They are patterns that can be trained and changed with the right structure.
                </p>
              </section>

              <div className="flex flex-wrap justify-center gap-4 pt-6">
                <Link
                  to="/parent-hub/parent-role"
                  className="cta-button"
                >
                  Understand My Role Better
                </Link>
                <Link
                  to="/teenzone/ikigai-teen-club"
                  className="cta-button"
                >
                  See How Ikigai Teen Helps
                </Link>
                <Link
                  to="/teenzone"
                  className="cta-button"
                >
                  Explore the Program
                </Link>
                <Link
                  to="/get-involved"
                  className="cta-button"
                >
                  Join a Parent Intro Session
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

export default ParentChallenges;
