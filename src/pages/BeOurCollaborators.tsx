import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { LetterSwapForward } from "@/components/ui/letter-swap";
import { ClipPathInfoCard } from "@/components/ui/clip-path-links";

const beOurCollaboratorsCards = [
  { id: "who-we-collaborate-with", title: "Who We Collaborate With", description: "Schools, coaching centres, youth organisations, NGOs, and professionals aligned with teen development." },
  { id: "what-collaboration-looks-like", title: "What Collaboration Can Look Like", description: "School programs, 90-Day Challenge partnerships, co-hosted sessions, and structured teen development programs." },
  { id: "what-we-bring", title: "What We Bring", description: "Structured, outcome-based teen programs focused on behaviour, habits, and identity — practical tools, not just theory." },
  { id: "what-you-bring", title: "What You Bring", description: "Access to teen and parent communities, aligned intent toward growth, and openness to long-term impact." },
  { id: "what-makes-different", title: "What Makes This Different", description: "Consistent, structured teen development — not one-time events or generic awareness sessions." },
  { id: "why-this-matters", title: "Why This Matters", description: "Teens need structure, guidance, and consistency. Collaboration helps deliver this at scale." },
];

const beOurCollaboratorsDetails = [
  {
    id: "who-we-collaborate-with",
    title: "Who We Collaborate With",
    opening: "We work with partners who want to support teens:",
    bullets: [
      "Schools & educational institutions",
      "Coaching centres & academies",
      "Youth organisations & communities",
      "NGOs & social initiatives",
      "Professionals working with teens",
      "Organisations aligned with teen development",
    ],
  },
  {
    id: "what-collaboration-looks-like",
    title: "What Collaboration Can Look Like",
    bullets: [
      "School programs & workshops",
      "90-Day Challenge partnerships",
      "Co-hosted sessions or events",
      "Structured teen development programs",
      "Parent + teen engagement initiatives",
    ],
  },
  {
    id: "what-we-bring",
    title: "What We Bring",
    bullets: [
      "structured, outcome-based teen programs",
      "focus on behaviour, habits, and identity",
      "practical tools, not just theory",
      "consistency and guided engagement",
      "alignment with real teen challenges today",
    ],
  },
  {
    id: "what-you-bring",
    title: "What You Bring",
    bullets: [
      "access to teens / parent communities",
      "aligned intent toward growth",
      "willingness to implement structured programs",
      "openness to long-term impact",
    ],
  },
  {
    id: "what-makes-different",
    title: "What Makes This Different",
    opening: "This is not:",
    bullets: [
      "one-time events",
      "generic awareness sessions",
    ],
    closing: "This is consistent, structured teen development.",
  },
  {
    id: "why-this-matters",
    title: "Why This Matters",
    opening: "Teens today don't just need information. They need:",
    bullets: [
      "structure, guidance, and consistency",
    ],
    closing: "Collaboration helps deliver this at scale.",
  },
];

const BeOurCollaborators = () => {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const detailsById = beOurCollaboratorsDetails.reduce<Record<string, (typeof beOurCollaboratorsDetails)[number]>>((acc, section) => {
    acc[section.id] = section;
    return acc;
  }, {});

  const renderCardGrid = (cards: typeof beOurCollaboratorsCards, colsClass = "lg:grid-cols-3") => (
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
                label="Be Our Service Collaborator"
                className="justify-center text-4xl md:text-5xl font-display font-bold mb-4"
                style={{ color: '#FCEADE' }}
              />
            </h1>
            <p className="text-lg text-white font-body">
              Stronger ecosystems build stronger teens.
            </p>
          </div>
        </section>

        {/* Box 1: Intro + 6 Cards */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-6 max-w-5xl">
            <article className="rounded-xl border border-border/60 bg-[hsl(42_38%_88%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-6 md:p-8 lg:p-10 space-y-8">
              <section className="space-y-4 text-center">
                <h3 className="text-xl md:text-2xl font-display font-semibold text-primary flex flex-col items-center gap-1 md:gap-2">
                  <LetterSwapForward label="Ikigai Teen works with partners who want to support" className="justify-center" />
                  <LetterSwapForward label="teens in becoming more aware, disciplined, and purpose-driven." className="justify-center" />
                </h3>
              </section>

              {renderCardGrid(beOurCollaboratorsCards)}
            </article>
          </div>
        </section>

        {/* Box 2: Service Collaborations */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-6 max-w-5xl">
            <article className="rounded-xl border border-border/60 bg-[hsl(42_38%_88%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-6 md:p-8 lg:p-10 space-y-8">
              <section className="space-y-4 text-center">
                <h3 className="text-xl md:text-2xl font-display font-semibold text-primary flex justify-center">
                  <LetterSwapForward label="We Are Exploring Collaborations With Following Services" className="justify-center" />
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-body max-w-3xl mx-auto">
                  Any collaboration will be based on completing a basic service audit
                </p>
              </section>

              <div className="space-y-6 pt-6 border-t border-border/50">
                {/* Category A */}
                <div className="space-y-3">
                  <h4 className="text-base md:text-lg font-display font-semibold text-primary">A. Mental & Emotional Wellness</h4>
                  <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    {["Psychologists", "Teen counselors", "Child psychiatrists", "De-addiction support", "ADHD/autism specialists", "Family therapists", "Grief counselors", "Art/music therapy", "Mindfulness trainers", "Crisis helplines"].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Category B */}
                <div className="space-y-3">
                  <h4 className="text-base md:text-lg font-display font-semibold text-primary">B. Physical Wellness</h4>
                  <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    {["Nutritionists", "Sports coaches", "Yoga instructors", "Martial arts centers", "Fitness trainers", "Sleep specialists"].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Category C */}
                <div className="space-y-3">
                  <h4 className="text-base md:text-lg font-display font-semibold text-primary">C. Creativity & Hobbies</h4>
                  <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    {["Dance", "Music", "Theatre", "Animation", "Gaming design", "Robotics", "Photography", "Creative writing", "Coding clubs", "Nature clubs"].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Category D */}
                <div className="space-y-3">
                  <h4 className="text-base md:text-lg font-display font-semibold text-primary">D. Career & Skill Exploration</h4>
                  <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    {["Internship platforms", "Design studios", "Entrepreneurs", "Makerspaces", "Public speaking trainers", "Financial literacy mentors"].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Category E */}
                <div className="space-y-3">
                  <h4 className="text-base md:text-lg font-display font-semibold text-primary">E. Digital & Life Challenges</h4>
                  <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    {["Cyber safety educators", "Screen addiction specialists", "Parenting coaches", "Social media literacy experts"].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Category F */}
                <div className="space-y-3">
                  <h4 className="text-base md:text-lg font-display font-semibold text-primary">F. Spiritual / Reflective / Healing Spaces <span className="text-xs text-muted-foreground font-body">(subject to detailed audited vetting)</span></h4>
                  <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    {["Meditation spaces", "Nature healing programs", "Reflective retreats", "Holistic wellness practitioners"].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
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
                  If you want to build something meaningful for teens, let's work together. Tell us about your organisation, share your intent and audience, and explore possible collaboration formats.
                </p>
              </section>

              <div className="flex flex-wrap justify-center gap-4 pt-6 border-t border-border/50">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSeDdq-b3PoH69uUyLKTzpPm8H_tSCuSX6-wC-OMe9IfLf1low/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-button"
                >
                  Collaborate with Us
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

export default BeOurCollaborators;
