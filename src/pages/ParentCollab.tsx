import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { LetterSwapForward } from "@/components/ui/letter-swap";
import { ClipPathInfoCard } from "@/components/ui/clip-path-links";

const parentCollabCards = [
  { id: "when-guidance-fragmented", title: "When Guidance Is Fragmented", description: "Understand what happens when teens receive mixed signals and effort becomes inconsistent." },
  { id: "when-guidance-aligned", title: "When Guidance Is Aligned", description: "See how clear expectations and reduced conflict lead to steady growth." },
  { id: "what-ikigai-does", title: "What Ikigai Teen Does", description: "Discover how we act as a structured growth partner to build discipline and focus." },
  { id: "how-collaboration-works", title: "How the Collaboration Works", description: "Learn how structured development, parent alignment, and consistent environments work together." },
  { id: "what-you-notice", title: "What You Will Notice as a Parent", description: "Experience improved follow-through, greater teen ownership, and more stability." },
  { id: "what-this-is-not", title: "What This Is and What It Is Not", description: "A consistent growth process where behaviour is shaped through repetition and systems." },
  { id: "your-role", title: "Your Role in This Process", description: "Learn to be a steady guide and supporter without managing every detail." },
  { id: "common-questions", title: "Common Parent Questions", description: "Find answers about monitoring, resistance, follow-through, and added pressure." },
  { id: "when-important", title: "When Collaboration Becomes Important", description: "Recognize when it's time to move from general advice to structured support." },
  { id: "the-shift", title: "The Shift This Creates", description: "Move from pushing and reacting to guiding with clarity and reinforcing structure." }
];

const parentCollabDetails = [
  {
    id: "when-guidance-fragmented",
    title: "When Guidance Is Fragmented",
    opening: "When guidance is fragmented:",
    bullets: [
      "teens receive mixed signals",
      "effort becomes inconsistent",
      "parents feel the need to push more",
      "resistance increases over time"
    ]
  },
  {
    id: "when-guidance-aligned",
    title: "When Guidance Is Aligned",
    opening: "When guidance is aligned:",
    bullets: [
      "expectations become clear",
      "habits are easier to build",
      "conflict reduces",
      "growth becomes steady"
    ]
  },
  {
    id: "what-ikigai-does",
    title: "What Ikigai Teen Does",
    opening: "Ikigai Teen does not replace the parent. It strengthens the process. We act as a structured growth partner to help teens build:",
    bullets: [
      "discipline through practice",
      "focus and consistency",
      "emotional awareness",
      "self-respect and responsibility",
      "clarity and direction"
    ]
  },
  {
    id: "how-collaboration-works",
    title: "How the Collaboration Works",
    bullets: [
      "Structured Teen Development: guided through consistent sessions, practical tools, and habit-building routines.",
      "Parent Alignment: parents receive clarity on what their teen is working on without constant monitoring.",
      "Consistency Across Environments: what teens learn and practice at home is aligned for lasting change."
    ]
  },
  {
    id: "what-you-notice",
    title: "What You Will Notice as a Parent",
    bullets: [
      "reduced need for constant reminders",
      "improved follow-through",
      "greater ownership from the teen",
      "better emotional responses",
      "increasing self-discipline",
      "more stability in behaviour"
    ]
  },
  {
    id: "what-this-is-not",
    title: "What This Is and What It Is Not",
    opening: "This is not quick transformation or one-time learning. It is a structured, consistent growth process where:",
    bullets: [
      "teens are guided through action",
      "behaviour is shaped through repetition",
      "discipline is built through systems",
      "awareness becomes real change"
    ]
  },
  {
    id: "your-role",
    title: "Your Role in This Process",
    opening: "You do not need to manage every detail or push constantly. Your role becomes:",
    bullets: [
      "a consistent environment builder",
      "a calm and steady guide",
      "a supporter of structure rather than a source of pressure"
    ]
  },
  {
    id: "common-questions",
    title: "Common Parent Questions",
    bullets: [
      "Will my child follow through? Consistency is built through systems, not intention alone.",
      "Will I need to monitor everything? No. The structure reduces dependence on constant parental control.",
      "What if my child resists? Initial resistance is normal and reduces with consistent guidance.",
      "Is this added pressure? No. It replaces pressure with structured support."
    ]
  },
  {
    id: "when-important",
    title: "When Collaboration Becomes Important",
    opening: "If you notice:",
    bullets: [
      "repeated patterns despite effort",
      "lack of consistency",
      "increasing distraction",
      "emotional ups and downs",
      "resistance to guidance"
    ],
    closing: "It may be time to move from advice to structured support."
  },
  {
    id: "the-shift",
    title: "The Shift This Creates",
    bullets: [
      "From pushing, repeating, and reacting",
      "To guiding with clarity, reinforcing structure, and building long-term capability"
    ]
  }
];

const ParentCollab = () => {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const detailsById = parentCollabDetails.reduce<Record<string, (typeof parentCollabDetails)[number]>>((acc, section) => {
    acc[section.id] = section;
    return acc;
  }, {});

  const renderCardGrid = (cards: typeof parentCollabCards, colsClass = "lg:grid-cols-3") => (
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
                label="Parent Collaboration"
                className="justify-center text-4xl md:text-5xl font-display font-bold text-primary mb-4"
              />
            </h1>
            <p className="text-lg text-muted-foreground font-body">
              Your teen does not need more pressure. They need aligned guidance.
            </p>
          </div>
        </section>

        {/* Box 1: Intro + 6 Cards */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-6 max-w-5xl">
            <article className="rounded-xl border border-border/60 bg-[hsl(42_38%_88%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-6 md:p-8 lg:p-10 space-y-8">
              <section className="space-y-4 text-center">
                <h3 className="text-xl md:text-2xl font-display font-semibold text-primary">
                  <LetterSwapForward label="When parents and the right structure work together" className="justify-center" />
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-body max-w-3xl mx-auto">
                  Growth becomes more consistent, less forced, and more effective.
                </p>
              </section>

              {renderCardGrid(parentCollabCards.slice(0, 6))}
            </article>
          </div>
        </section>

        {/* Box 2: Why This Approach Works + 4 Cards */}
        <section className="py-6 bg-background">
          <div className="container mx-auto px-6 max-w-5xl">
            <article className="rounded-xl border border-border/60 bg-[hsl(42_38%_88%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-6 md:p-8 lg:p-10 space-y-8">
              <section className="space-y-6 text-center">
                <h3 className="text-xl md:text-2xl font-display font-semibold text-primary text-center">
                  <LetterSwapForward label="Why This Approach Works" className="justify-center" />
                </h3>
                <div className="text-left md:pl-8">
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-body mb-4">
                    Most challenges are not due to lack of advice. They are due to lack of structure, consistency, and accountability. When these are in place:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-muted-foreground leading-relaxed font-body">
                    <li>behaviour becomes more predictable</li>
                    <li>effort becomes more visible</li>
                    <li>progress becomes more stable</li>
                  </ul>
                </div>
              </section>

              {renderCardGrid(parentCollabCards.slice(6), "lg:grid-cols-2")}
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
                  When parents and structure align, teens grow with far less friction. Explore how Ikigai Teen can support your child’s growth journey.
                </p>
              </section>

              <section className="space-y-4 border-t border-border/50 pt-8">
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-body max-w-2xl mx-auto">
                  <span className="text-primary text-base md:text-lg font-medium">You do not have to carry the entire responsibility alone.</span><br/><br/>
                  With the right collaboration, effort becomes direction, direction becomes habit, and habit shapes identity.
                </p>
              </section>

              

            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ParentCollab;
