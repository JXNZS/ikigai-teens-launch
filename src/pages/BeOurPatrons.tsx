import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { LetterSwapForward } from "@/components/ui/letter-swap";
import { ClipPathInfoCard } from "@/components/ui/clip-path-links";

const beOurPatronsCards = [
  { id: "why-patron-support-matters", title: "Why Patron Support Matters", description: "Enables access, strengthens programs at scale, and helps build long-term, meaningful impact for teens." },
  { id: "ways-you-can-support", title: "Ways You Can Support", description: "Sponsor a student, support program development, or contribute to initiatives and outreach efforts." },
  { id: "what-your-support-creates", title: "What Your Support Creates", description: "More teens receiving structured guidance, better habits, and stronger individuals for families and society." },
  { id: "what-makes-different", title: "What Makes This Different", description: "Investing in long-term teen development — not one-time charity." },
  { id: "transparency-intent", title: "Transparency & Intent", description: "Your support is directed toward structured programs, teen development initiatives, and expanding reach responsibly." },
  { id: "next-step", title: "Next Step", description: "Choose how you'd like to contribute and connect with us to be part of this journey." },
];

const beOurPatronsDetails = [
  {
    id: "why-patron-support-matters",
    title: "Why Patron Support Matters",
    bullets: [
      "enables access for teens who may not afford programs",
      "supports development of better tools and content",
      "strengthens structured teen programs at scale",
      "helps build long-term, meaningful impact",
    ],
  },
  {
    id: "ways-you-can-support",
    title: "Ways You Can Support",
    bullets: [
      "sponsor a student or group",
      "support program development",
      "contribute to initiatives and outreach",
      "partner in long-term impact efforts",
    ],
  },
  {
    id: "what-your-support-creates",
    title: "What Your Support Creates",
    bullets: [
      "more teens receiving structured guidance",
      "you help expand Ikigai Teen's reach",
      "your contributions help in shaping today's teens into tomorrow's better youth",
      "you will participate in nation building through teen development",
    ],
  },
  {
    id: "what-makes-different",
    title: "What Makes This Different",
    opening: "This is not:",
    bullets: [
      "one-time charity",
      "This is investing in long-term teen development and contribute to nation building",
    ],
    closing: "This is investing in long-term teen development.",
  },
  {
    id: "transparency-intent",
    title: "Transparency & Intent",
    opening: "Your support is directed toward:",
    bullets: [
      "structured programs outreach to larger teen populations",
      "hybrid teen development initiatives",
      "expanding collective community accountability through youth participation responsibly",
    ],
  },
  {
    id: "next-step",
    title: "Next Step",
    opening: "If you believe in building stronger young individuals, you can be part of this journey.",
    bullets: [
      "choose how you would like to contribute",
      "connect with us for more details",
    ],
  },
];

const BeOurPatrons = () => {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const detailsById = beOurPatronsDetails.reduce<Record<string, (typeof beOurPatronsDetails)[number]>>((acc, section) => {
    acc[section.id] = section;
    return acc;
  }, {});

  const renderCardGrid = (cards: typeof beOurPatronsCards, colsClass = "lg:grid-cols-3") => (
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
                label="Be Our Patron/Sponserer"
                className="justify-center text-4xl md:text-5xl font-display font-bold mb-4"
                style={{ color: '#FCEADE' }}
              />
            </h1>
            <p className="text-lg text-muted-foreground font-body">
              Support the making of stronger, more grounded teens.
            </p>
          </div>
        </section>

        {/* Box 1: Intro + 6 Cards */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-6 max-w-5xl">
            <article className="rounded-xl border border-border/60 bg-[hsl(42_38%_88%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-6 md:p-8 lg:p-10 space-y-8">
              <section className="space-y-4 text-center">
                <h3 className="text-xl md:text-2xl font-display font-semibold text-primary flex flex-col items-center gap-1 md:gap-2">
                  <LetterSwapForward label="Ikigai Teen is building structured programs that help teens" className="justify-center" />
                  <LetterSwapForward label="develop focus, discipline, emotional strength, and purpose." className="justify-center" />
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-body max-w-3xl mx-auto">
                  Your support helps expand this impact to more teens.
                </p>
              </section>

              {renderCardGrid(beOurPatronsCards)}
            </article>
          </div>
        </section>

        {/* Box 2: CTA Buttons */}
        <section className="py-12 pb-20 bg-background">
          <div className="container mx-auto px-6 max-w-4xl">
            <article className="cta-card rounded-xl border border-primary/20 bg-[hsl(42_38%_88%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-6 md:p-8 space-y-8 text-center">
              <section className="space-y-4">
                <h3 className="text-xl md:text-2xl font-display font-semibold text-primary flex justify-center">
                  <LetterSwapForward label="Be Part of This Journey" className="justify-center" />
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-body max-w-2xl mx-auto">
                  If you believe in building stronger young individuals, choose how you would like to contribute and connect with us for more details.
                </p>
              </section>

              <div className="flex flex-wrap justify-center gap-4 pt-6 border-t border-border/50">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSc7U_hhRKlsy4oVl0tRrD2Q1dNUEYdMn1SZkGOZYYlYNTu8Pw/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-button"
                >
                  Become a Patron/Sponserer
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

export default BeOurPatrons;
