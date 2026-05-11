import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { LetterSwapForward } from "@/components/ui/letter-swap";
import { ClipPathInfoCard } from "@/components/ui/clip-path-links";

const parentRoleCards = [
  { id: "whats-changing", title: "What’s Really Changing", description: "Understand the unique pressures and distractions today’s teens face." },
  { id: "your-role-today", title: "Your Role Today", description: "Discover the shift from constant correction to steady, thoughtful guidance." },
  { id: "where-things-break-down", title: "Where Things Break Down", description: "Identify common patterns where parenting efforts miss the mark." },
  { id: "what-actually-works", title: "What Actually Works", description: "Learn how structure and guided practice lead to real growth." },
  { id: "what-teen-needs", title: "What Your Teen Needs From You", description: "Find out what teens really need beneath their behaviour." },
  { id: "why-challenging", title: "Why This Is Challenging", description: "Acknowledge why modern parenting requires a different skill set." },
  { id: "how-ikigai-helps", title: "How Ikigai Teen Helps", description: "Discover structured support to help teens develop focus, discipline, and emotional strength." },
  { id: "what-makes-different", title: "What Makes This Different", description: "Experience a structured, consistent growth system guided over time." },
  { id: "your-role-process", title: "Your Role in This Process", description: "Learn how to be a steady source of support without monitoring every step." },
  { id: "when-important", title: "When This Becomes Important", description: "Recognize when a lack of structured development is affecting your teen." }
];

const parentRoleDetails = [
  {
    id: "whats-changing",
    title: "What’s Really Changing",
    opening: "Today’s teens face:",
    bullets: [
      "constant digital distraction",
      "comparison at scale",
      "emotional overload",
      "reduced focus and consistency",
      "pressure without clear direction"
    ],
    closing: "What may appear as laziness, mood swings, or disinterest is often a result of confusion, distraction, and lack of structure."
  },
  {
    id: "your-role-today",
    title: "Your Role Today",
    opening: "Not control. Not constant correction. But steady, thoughtful guidance. Your role is to help your teen build:",
    bullets: [
      "clarity",
      "discipline",
      "emotional stability",
      "self-respect",
      "consistency",
      "direction"
    ]
  },
  {
    id: "where-things-break-down",
    title: "Where Things Break Down",
    opening: "Many parents find themselves:",
    bullets: [
      "giving advice without structure",
      "correcting more than connecting",
      "reacting instead of guiding",
      "focusing on performance while missing identity"
    ]
  },
  {
    id: "what-actually-works",
    title: "What Actually Works",
    opening: "Teens do not grow through advice alone. They grow through structure and guided practice. What makes a difference:",
    bullets: [
      "consistency over intensity",
      "structure over pressure",
      "responsibility over control",
      "presence over preaching",
      "practice over theory"
    ]
  },
  {
    id: "what-teen-needs",
    title: "What Your Teen Needs From You",
    bullets: [
      "calm understanding instead of overreaction",
      "clear boundaries without constant conflict",
      "guidance without control",
      "expectations without pressure",
      "presence without judgement"
    ]
  },
  {
    id: "why-challenging",
    title: "Why This Is Challenging",
    opening: "This approach requires:",
    bullets: [
      "patience",
      "emotional awareness",
      "consistency",
      "clarity"
    ],
    closing: "Most parents have not been prepared for this version of parenting."
  },
  {
    id: "how-ikigai-helps",
    title: "How Ikigai Teen Helps",
    opening: "Ikigai Teen provides structured support to help teens develop:",
    bullets: [
      "focus",
      "discipline",
      "emotional strength",
      "consistency",
      "direction"
    ],
    closing: "This leads to: reduced conflict at home, fewer repeated reminders, stronger internal motivation, and greater stability in behaviour."
  },
  {
    id: "what-makes-different",
    title: "What Makes This Different",
    opening: "This is not based on motivation, lectures, or one-time sessions.",
    closing: "It is a structured, consistent growth system where teens are guided, supported, and held accountable over time."
  },
  {
    id: "your-role-process",
    title: "Your Role in This Process",
    opening: "You do not need to monitor every step or push constantly. Your role becomes:",
    bullets: [
      "a steady source of support",
      "a builder of a consistent environment",
      "a guide rather than an enforcer",
      "a silent observer and an open learner"
    ]
  },
  {
    id: "when-important",
    title: "When This Becomes Important",
    opening: "If you notice:",
    bullets: [
      "increasing distraction",
      "lack of consistency",
      "emotional instability",
      "resistance to guidance",
      "lack of direction",
      "distancing"
    ],
    closing: "It is often not just behaviour. It is a lack of structured development."
  }
];

const ParentRole = () => {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const detailsById = parentRoleDetails.reduce<Record<string, (typeof parentRoleDetails)[number]>>((acc, section) => {
    acc[section.id] = section;
    return acc;
  }, {});

  const renderCardGrid = (cards: typeof parentRoleCards, colsClass = "lg:grid-cols-3") => (
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
                label="Parent Role"
                className="justify-center text-4xl md:text-5xl font-display font-bold text-primary mb-4"
              />
            </h1>
            <p className="text-lg text-muted-foreground font-body">
              Your role has not become easier. It has become more important.
            </p>
          </div>
        </section>

        {/* Box 1: Intro + 6 Cards */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-6 max-w-5xl">
            <article className="rounded-xl border border-border/60 bg-[hsl(42_38%_88%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-6 md:p-8 lg:p-10 space-y-8">
              <section className="space-y-4 text-center">
                <h3 className="text-xl md:text-2xl font-display font-semibold text-primary">
                  <LetterSwapForward label="You’re not just raising a child. You’re shaping who they become." className="justify-center" />
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-body max-w-3xl mx-auto">
                  Parenting today is different. The world is faster, more distracting, and more complex than ever before. Your role has not become easier. It has become more important.
                </p>
              </section>

              {renderCardGrid(parentRoleCards.slice(0, 6))}
            </article>
          </div>
        </section>

        {/* Box 2: The Shift That Matters + 4 Cards */}
        <section className="py-6 bg-background">
          <div className="container mx-auto px-6 max-w-5xl">
            <article className="rounded-xl border border-border/60 bg-[hsl(42_38%_88%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-6 md:p-8 lg:p-10 space-y-8">
              <section className="space-y-6 text-center">
                <h3 className="text-xl md:text-2xl font-display font-semibold text-primary text-center">
                  <LetterSwapForward label="The Shift That Matters" className="justify-center" />
                </h3>
                <div className="text-left md:pl-8">
                  <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-muted-foreground leading-relaxed font-body">
                    <li>From reacting to guiding</li>
                    <li>From correcting to building</li>
                    <li>From controlling to structuring</li>
                  </ul>
                  <p className="text-sm md:text-base text-primary font-medium leading-relaxed font-body mt-4">
                    The focus shifts to building your teen’s inner strength.
                  </p>
                </div>
              </section>

              {renderCardGrid(parentRoleCards.slice(6), "lg:grid-cols-2")}
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
                  Supporting your teen effectively requires the right structure. Explore how Ikigai Teen can help bring clarity, consistency, and direction to your child’s growth.
                </p>
              </section>

              <section className="space-y-4 border-t border-border/50 pt-8">
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-body max-w-2xl mx-auto">
                  <span className="text-primary text-base md:text-lg font-medium">Your teen is not just growing older.<br/>
                  They are becoming someone.</span><br/><br/>
                  How they are guided now shapes how they think, act, and grow into adulthood.
                </p>
              </section>

              <div className="flex flex-wrap justify-center gap-4 pt-6">
                <Link
                  to="/parent-hub/parent-challenges"
                  className="cta-button"
                >
                  Understand My Teen Better
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

export default ParentRole;
