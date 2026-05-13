import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { LetterSwapForward } from "@/components/ui/letter-swap";
import { ClipPathInfoCard } from "@/components/ui/clip-path-links";

const parentCircleCards = [
  { id: "why-this-matters", title: "Why This Matters", description: "Understand the common challenges of uncertainty, fatigue, and navigating complex environments." },
  { id: "what-parent-circle-is", title: "What the Parent Circle Is", description: "A structured, guided space for practical insight and mutual growth." },
  { id: "guided-conversations", title: "Guided Conversations", description: "Explore key areas like understanding behaviour and setting effective boundaries." },
  { id: "shared-perspective", title: "Shared Perspective", description: "Gain clarity and reassurance by learning from shared real experiences." },
  { id: "practical-application", title: "Practical Application", description: "Learn clear, actionable ways to respond and guide adjustments at home." },
  { id: "alignment-with-ikigai", title: "Alignment with Ikigai Teen", description: "Ensure consistency by staying aligned with what your teen is learning." },
  { id: "what-creates-parents", title: "What This Creates for Parents", description: "Experience clearer decision-making, calmer responses, and less emotional strain." },
  { id: "why-this-important", title: "Why This Is Important", description: "Discover how a stable and intentional environment strengthens teen development." },
  { id: "who-this-is-for", title: "Who This Is For", description: "For parents seeking clarity, understanding, and structured guidance." },
  { id: "how-supports-teen", title: "How This Supports Your Teen", description: "Ensure that teen learning and parent reinforcement work seamlessly together." }
];

const parentCircleDetails = [
  {
    id: "why-this-matters",
    title: "Why This Matters",
    opening: "Many parents today face:",
    bullets: [
      "uncertainty about the right approach",
      "repeated effort without visible change",
      "difficulty balancing guidance and independence",
      "emotional fatigue from constant involvement",
      "lack of a space to reflect without judgement"
    ],
    closing: "Parenting in today’s environment is complex. Complexity requires support."
  },
  {
    id: "what-parent-circle-is",
    title: "What the Parent Circle Is",
    opening: "A structured space for parents to reflect, learn, and align. It is:",
    bullets: [
      "guided and moderated",
      "grounded in real challenges",
      "focused on practical insight",
      "designed to support both parent and teen growth"
    ]
  },
  {
    id: "guided-conversations",
    title: "Guided Conversations",
    opening: "Parents explore key areas such as:",
    bullets: [
      "understanding behaviour",
      "managing reactions",
      "building consistency",
      "setting effective boundaries",
      { text: "Ikigai Teen Compass Resources", href: "/resources/videos" },
    ]
  },
  {
    id: "shared-perspective",
    title: "Shared Perspective",
    opening: "Parents learn from real experiences, gaining:",
    bullets: [
      "clarity",
      "reassurance",
      "a broader understanding of what works"
    ]
  },
  {
    id: "practical-application",
    title: "Practical Application",
    opening: "Each session offers clear ways to:",
    bullets: [
      "respond",
      "guide",
      "make meaningful adjustments at home"
    ]
  },
  {
    id: "alignment-with-ikigai",
    title: "Alignment with Ikigai Teen",
    opening: "Parents stay informed and aligned on weekly bases with what their teen is learning, ensuring consistency across environments."
  },
  {
    id: "what-creates-parents",
    title: "What This Creates for Parents",
    bullets: [
      "clearer decision-making",
      "reduced confusion and second-guessing",
      "calmer responses in challenging situations",
      "improved communication",
      "less emotional strain",
      "stronger sense of direction"
    ]
  },
  {
    id: "why-this-important",
    title: "Why This Is Important",
    opening: "Teen development is shaped not only by what they are taught, but by the environment they return to every day.",
    closing: "A stable, aligned, and intentional environment strengthens growth."
  },
  {
    id: "who-this-is-for",
    title: "Who This Is For",
    opening: "Parents who:",
    bullets: [
      "want to understand their teen better",
      "are open to reflection and improvement",
      "value structured guidance",
      "prefer clarity over conflicting advice"
    ]
  },
  {
    id: "how-supports-teen",
    title: "How This Supports Your Teen",
    opening: "When teens are guided and parents are aligned, growth becomes stronger and more consistent.",
    closing: "The Parent Circle ensures that what your teen is learning and what you are reinforcing work together."
  }
];

const ParentCircle = () => {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const detailsById = parentCircleDetails.reduce<Record<string, (typeof parentCircleDetails)[number]>>((acc, section) => {
    acc[section.id] = section;
    return acc;
  }, {});

  const renderCardGrid = (cards: typeof parentCircleCards, colsClass = "lg:grid-cols-3") => (
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
                  {(detailsById[card.id]?.bullets ?? []).map((bullet) => {
                    const isLink = typeof bullet === "object" && "href" in bullet;
                    return (
                      <li key={isLink ? bullet.text : bullet} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
                        {isLink ? (
                          <Link
                            to={bullet.href}
                            className="text-primary hover:text-primary/80 underline decoration-primary/50 hover:decoration-primary transition-colors inline-flex items-center gap-1"
                          >
                            {bullet.text}
                            <ArrowUpRight className="h-3.5 w-3.5 mt-0.5" aria-hidden="true" />
                          </Link>
                        ) : (
                          <span>{bullet}</span>
                        )}
                      </li>
                    );
                  })}
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
                    className="h-full rounded-xl bg-white [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-6"
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
                label="Ikigai Teen Parent Circle"
                className="justify-center text-4xl md:text-5xl font-display font-bold mb-4"
                style={{ color: '#FCEADE' }}
              />
            </h1>
            <p className="text-lg text-white font-body">
              You do not have to navigate this alone
            </p>
          </div>
        </section>

        {/* Box 1: Intro + 6 Cards */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-6 max-w-5xl">
            <article className="rounded-xl border border-border/60 bg-white [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-6 md:p-8 lg:p-10 space-y-8">
              <section className="space-y-4 text-center">
                <h3 className="text-xl md:text-2xl font-display font-semibold text-primary">
                  <LetterSwapForward label="Parenting a teenager today can feel overwhelming." className="justify-center" />
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-body max-w-3xl mx-auto">
                  Even with effort and intent, it is common to experience uncertainty, fatigue, and doubt. The Parent Circle exists to provide structured support so you can guide your teen with clarity and confidence.
                </p>
              </section>

              {renderCardGrid(parentCircleCards.slice(0, 6))}
            </article>
          </div>
        </section>

        {/* Box 2: What This Creates for Teens + 4 Cards */}
        <section className="py-6 bg-background">
          <div className="container mx-auto px-6 max-w-5xl">
            <article className="rounded-xl border border-border/60 bg-white [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-6 md:p-8 lg:p-10 space-y-8">
              <section className="space-y-6 text-center">
                <h3 className="text-xl md:text-2xl font-display font-semibold text-primary text-center">
                  <LetterSwapForward label="What This Creates for Teens" className="justify-center" />
                </h3>
                <div className="text-left md:pl-8">
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-body mb-4">
                    When parents are aligned:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-muted-foreground leading-relaxed font-body">
                    <li>conflict reduces</li>
                    <li>communication improves</li>
                    <li>expectations become clearer</li>
                    <li>resistance decreases</li>
                    <li>growth becomes more consistent</li>
                  </ul>
                </div>
              </section>

              {renderCardGrid(parentCircleCards.slice(6), "lg:grid-cols-2")}
            </article>
          </div>
        </section>

        {/* Box 3: Next Step + Final Thoughts + Buttons */}
        <section className="py-12 pb-20 bg-background">
          <div className="container mx-auto px-6 max-w-4xl">
            <article className="cta-card rounded-xl border border-primary/20 bg-white [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-6 md:p-8 space-y-8 text-center">
              <section className="space-y-4">
                <h3 className="text-xl md:text-2xl font-display font-semibold text-primary flex justify-center">
                  <LetterSwapForward label="Next Step" className="justify-center" />
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-body max-w-2xl mx-auto">
                  Supporting your teen effectively also requires support for you. Explore how the Parent Circle can help you guide with greater clarity and confidence.
                </p>
              </section>

              <section className="space-y-4 border-t border-border/50 pt-8">
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-body max-w-2xl mx-auto">
                  <span className="text-primary text-base md:text-lg font-medium">Strong teens are shaped by aligned environments.</span><br/><br/>
                  The Parent Circle helps you become part of that alignment.
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

export default ParentCircle;

