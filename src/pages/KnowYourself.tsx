import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LetterSwapForward } from "@/components/ui/letter-swap";

type SelfCheckPrompt = {
  label: string;
  tags: string[];
  reverse?: boolean;
};

type ResponseOption = {
  label: string;
  value: number;
};

type TestResult = {
  primary: string;
  secondary: string | null;
  summary: string;
};

const relatableQuestions = [
  "Why do I feel weird sometimes for no reason?",
  "Why do I care so much what others think?",
  "Why do I keep wasting time even when I don't want to?",
  "Why do I feel left out so easily?",
  "Why do small things affect me so much?",
  "Why do I know better but still do the wrong thing?",
];

const selfCheckPrompts: SelfCheckPrompt[] = [
  { label: "I compare myself a lot", tags: ["Confidence", "Comparison"] },
  { label: "I get distracted easily", tags: ["Distraction", "Self-Control"] },
  { label: "I care too much what others think", tags: ["Friendship Pressure", "Confidence"] },
  { label: "I feel confident in myself", tags: ["Confidence"], reverse: true },
  { label: "I often delay what I should do", tags: ["Self-Control", "Motivation"] },
  { label: "I know what kind of person I want to become", tags: ["Identity", "Direction"], reverse: true },
  { label: "My emotions affect my whole day", tags: ["Emotions", "Mood"] },
  { label: "I can stay true to myself around others", tags: ["Identity", "Friendship Pressure"], reverse: true },
];

const responseScale: ResponseOption[] = [
  { label: "Rarely", value: 0 },
  { label: "Sometimes", value: 1 },
  { label: "Often", value: 2 },
  { label: "Almost always", value: 3 },
];

const resultProfiles = [
  {
    title: "Confidence + Comparison",
    tags: ["Confidence", "Comparison"],
    summary: "You may be measuring yourself against others and second-guessing your worth.",
  },
  {
    title: "Distraction + Self-Control",
    tags: ["Distraction", "Self-Control"],
    summary: "Your attention may be getting pulled around, making it harder to follow through.",
  },
  {
    title: "Friendship Pressure + Emotions",
    tags: ["Friendship Pressure", "Emotions"],
    summary: "Other people and strong feelings may be influencing your choices more than you want.",
  },
  {
    title: "Identity Confusion + Confidence",
    tags: ["Identity", "Confidence"],
    summary: "You may be building your identity while still figuring out how to trust yourself.",
  },
  {
    title: "Mood + Motivation",
    tags: ["Mood", "Motivation"],
    summary: "Your energy and emotional state may be changing how much you can get done.",
  },
] as const;

const shapingTiles = [
  {
    title: "Your Attention",
    summary: "What gets your focus gets your future.",
    redFlag: "You can't stay with one thing for long.",
    growthSign: "You can focus on purpose.",
  },
  {
    title: "Your Habits",
    summary: "Small repeated actions become your normal.",
    redFlag: "You keep doing what weakens you.",
    growthSign: "You start keeping small promises to yourself.",
  },
  {
    title: "Your Self-Image",
    summary: "How you see yourself affects how you behave.",
    redFlag: "You keep putting yourself down.",
    growthSign: "You begin respecting yourself more.",
  },
  {
    title: "Your Emotions",
    summary: "Feelings are real - but they should not run your whole life.",
    redFlag: "One mood ruins your whole day.",
    growthSign: "You can pause before reacting.",
  },
  {
    title: "Your Friendships",
    summary: "The people around you shape your choices more than you think.",
    redFlag: "You act different just to fit in.",
    growthSign: "You feel safe being yourself.",
  },
  {
    title: "Your Screen Life",
    summary: "What you watch, scroll, and consume affects your mind.",
    redFlag: "You feel worse after using your phone.",
    growthSign: "You use tech without letting it control you.",
  },
  {
    title: "Your Values",
    summary: "What matters to you shapes how you live.",
    redFlag: "You copy what others are doing without thinking.",
    growthSign: "You start choosing what is right, not just what is popular.",
  },
  {
    title: "Your Direction",
    summary: "Even at your age, it helps to know who you want to become.",
    redFlag: "You are just drifting.",
    growthSign: "You begin making more intentional choices.",
  },
];

const challengeCards = [
  ["Comparison", "You keep checking if you are enough by looking at others."],
  ["Wanting to Fit In", "You don't want to feel left out, so you sometimes ignore your own values."],
  ["Low Confidence", "You doubt yourself more than people realise."],
  ["Phone Distraction", "You waste time and then feel bad about it."],
  ["Friendship Drama", "Small social things can feel huge and exhausting."],
  ["Body Image Worries", "You become more aware of how you look and whether you measure up."],
  ["Mood Swings / Emotional Overload", "Your feelings can feel bigger than your ability to handle them."],
  ["Crushes / Attraction / Confusion", "You may feel drawn to someone and not always know what to do with those feelings."],
  ["People Pleasing", "You say yes or go along even when it doesn't feel right."],
  ["Procrastination", "You know what you should do but still don't do it."],
  ["Pressure", "From school, adults, expectations, or just trying to keep up."],
  ["Feeling Off", "Sometimes you don't know what's wrong - you just don't feel like yourself."],
] as const;

const quickTruths = [
  "You don't become who you want to be by accident.",
  "Every repeated action is training your future self.",
  "Confidence is not loudness. It grows when you keep promises to yourself.",
  "Wanting to be liked can quietly make you lose yourself.",
  "Your screen habits are also shaping your identity.",
  "Feelings are real, but they are not always wise leaders.",
  "You don't need to be perfect. You need to become more aware and intentional.",
];

const microActions = [
  {
    title: "If you feel confused",
    steps: ["What am I feeling?", "What may be causing this?", "What would help right now?"],
  },
  {
    title: "If you feel distracted",
    steps: ["Keep your phone away for 10 minutes", "Do one useful thing fully", "Then check it"],
  },
  {
    title: "If you feel left out",
    steps: ["Stop chasing every group", "Focus on one real connection", "Stay kind, but don't lose yourself"],
  },
  {
    title: "If you feel low in confidence",
    steps: ["Do one thing you've been avoiding", "Confidence grows after courage, not before it"],
  },
  {
    title: "If you feel emotionally overwhelmed",
    steps: ["Pause", "Breathe slowly", "Delay reacting", "Choose one calmer response"],
  },
];

const parentScripts = [
  "I think this could actually help me. Can I show you?",
  "This looks useful and structured. Can we go through it together?",
  "I want to improve some things about myself. Can we check this out?",
];

const getHumanResult = (responses: Record<string, number>): TestResult | null => {
  const answeredCount = selfCheckPrompts.filter((prompt) => responses[prompt.label] !== undefined).length;
  if (answeredCount < selfCheckPrompts.length) {
    return null;
  }

  const tagCount = new Map<string, number>();
  const tagWeights = new Map<string, number>();

  selfCheckPrompts.forEach((prompt) => {
    const responseValue = responses[prompt.label];
    if (responseValue === undefined) {
      return;
    }

    const riskValue = prompt.reverse ? 3 - responseValue : responseValue;
    prompt.tags.forEach((tag) => {
      tagCount.set(tag, (tagCount.get(tag) ?? 0) + riskValue);
      tagWeights.set(tag, (tagWeights.get(tag) ?? 0) + 1);
    });
  });

  const scoredResults = resultProfiles
    .map((profile) => {
      const score = profile.tags.reduce((acc, tag) => {
        const total = tagCount.get(tag) ?? 0;
        const weight = tagWeights.get(tag) ?? 0;
        return weight === 0 ? acc : acc + total / weight;
      }, 0);

      return { ...profile, score };
    })
    .sort((a, b) => b.score - a.score);

  const bestResult = scoredResults[0];
  const secondaryResult = scoredResults[1];

  if (!bestResult) {
    return {
      primary: "Confidence + Comparison",
      secondary: null,
      summary: "Your answers suggest a mix of patterns, but there is not enough data to narrow it down yet.",
    };
  }

  return {
    primary: bestResult.title,
    secondary: secondaryResult && secondaryResult.score > 0 ? secondaryResult.title : null,
    summary: bestResult.summary,
  };
};

const KnowYourself = () => {
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [selectedChecks, setSelectedChecks] = useState<Record<string, number>>({});
  const [openShapingTile, setOpenShapingTile] = useState<string | null>(null);

  const ageCategories = [
    {
      id: "13-15",
      label: "13-15",
      description: "Early teen years - discovering who you are and finding your voice.",
    },
    {
      id: "16-18",
      label: "16-18",
      description: "Late teen years - deepening self-understanding and planning your future.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.3 },
    },
  };

  const humanResult = getHumanResult(selectedChecks);

  const updateCheckResponse = (label: string, value: number) => {
    setSelectedChecks((prev) => ({ ...prev, [label]: value }));
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 bg-background min-h-screen">
        <section className="footer-theme-legacy py-20 bg-card border-b border-border/50 overflow-hidden">
          <div className="container mx-auto px-6">
            <motion.div className="max-w-3xl mx-auto text-center" variants={containerVariants} initial="hidden" animate="visible">
              <motion.h1
                className="text-4xl md:text-5xl font-display font-bold text-primary mb-6"
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <LetterSwapForward label="Know Yourself" />
              </motion.h1>

              <motion.div className="space-y-4" variants={itemVariants}>
                <p className="text-lg md:text-xl text-foreground/90 font-medium leading-relaxed">
                  You can't grow well if you don't understand what's going on inside you.
                </p>
                <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                  Your thoughts, habits, emotions, choices, friendships, screens, pressure, and patterns are all shaping who you are becoming.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {selectedAge !== "13-15" && (
          <section className="py-20 bg-background">
            <div className="container mx-auto px-6">
              <motion.div className="max-w-3xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
                <motion.h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-12 text-center" variants={itemVariants}>
                  <LetterSwapForward label="Choose your age" />
                </motion.h2>

                <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={containerVariants}>
                  {ageCategories.map((category) => (
                    <motion.button
                      key={category.id}
                      variants={cardVariants}
                      whileHover="hover"
                      onClick={() => setSelectedAge(category.id)}
                      className={`relative p-8 rounded-xl border-2 transition-all duration-300 text-left group overflow-hidden ${
                        selectedAge === category.id
                          ? "border-primary/60 bg-[hsl(195_25%_96%_/_0.8)]"
                          : "border-border hover:border-primary/40 bg-card hover:bg-[hsl(195_25%_96%_/_0.4)]"
                      }`}
                    >
                      {selectedAge === category.id && <div className="absolute inset-0 opacity-20 blur-xl bg-primary pointer-events-none" />}

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-3xl md:text-4xl font-display font-bold text-primary">{category.label}</h3>
                          <motion.div
                            animate={{
                              opacity: selectedAge === category.id ? 1 : 0.3,
                              x: selectedAge === category.id ? 0 : -10,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <ArrowRight className="w-6 h-6 text-primary" />
                          </motion.div>
                        </div>
                        <p className="text-foreground/75 text-sm md:text-base leading-relaxed">{category.description}</p>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </section>
        )}

        {selectedAge === "13-15" && (
          <section className="py-16 md:py-20 bg-background">
            <div className="container mx-auto px-6 space-y-16">
              <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.7)] p-8">
                <p className="text-xs tracking-[0.2em] uppercase text-primary/80 mb-3">Know Yourself (Age 13-15)</p>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                  You are not just going through stuff. You are becoming a person.
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  What you repeat in your thoughts, habits, friendships, emotions, and screen life quietly shapes who you are becoming.
                </p>
              </div>

              <div className="max-w-5xl mx-auto">
                <h3 className="text-2xl font-display font-semibold text-foreground mb-5">Quick relatable cards</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatableQuestions.map((question) => (
                    <div key={question} className="rounded-xl border border-border/60 bg-card p-5 text-sm text-foreground/85">
                      {question}
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-foreground font-medium">
                  Do you feel like <span className="text-primary">"This is literally me."</span>
                  <br />
                  Take the small test below
                </p>
              </div>

              <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-card p-8">
                <h3 className="text-2xl font-display font-semibold text-foreground mb-2">What's affecting you most right now?</h3>
                <p className="text-muted-foreground mb-6">Mini identity check</p>
                <div className="grid md:grid-cols-2 gap-3">
                  {selfCheckPrompts.map((prompt) => {
                    const selectedValue = selectedChecks[prompt.label];
                    return (
                      <div key={prompt.label} className="rounded-lg border border-border/70 p-4">
                        <p className="text-sm text-foreground mb-3">{prompt.label}</p>
                        <div className="flex flex-wrap gap-2">
                          {responseScale.map((option) => {
                            const isActive = selectedValue === option.value;
                            return (
                              <button
                                type="button"
                                key={option.label}
                                onClick={() => updateCheckResponse(prompt.label, option.value)}
                                className={`rounded-md border px-3 py-1.5 text-xs transition-colors ${
                                  isActive
                                    ? "border-primary/60 bg-primary/10 text-primary"
                                    : "border-border/70 text-muted-foreground hover:border-primary/40"
                                }`}
                              >
                                {option.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 rounded-xl border border-primary/30 bg-[hsl(195_25%_96%_/_0.85)] p-5">
                  {humanResult ? (
                    <>
                      <p className="text-sm text-muted-foreground mb-2">Right now, you may be dealing most with:</p>
                      <p className="text-xl font-display font-semibold text-primary">{humanResult.primary}</p>
                      {humanResult.secondary && <p className="mt-1 text-sm text-muted-foreground">Also showing up: {humanResult.secondary}</p>}
                      <p className="mt-3 text-sm text-muted-foreground">{humanResult.summary}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-muted-foreground mb-2">Answer all 8 questions to see your result.</p>
                      <p className="text-base text-foreground/80">Your result will be based on the pattern of your responses, not just one answer.</p>
                    </>
                  )}
                </div>
              </div>

              <div className="max-w-5xl mx-auto">
                <h3 className="text-2xl font-display font-semibold text-foreground mb-5">The 8 things quietly building your identity</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {shapingTiles.map((tile, index) => {
                    const isOpen = openShapingTile === tile.title;
                    return (
                      <button
                        type="button"
                        key={tile.title}
                        onClick={() => setOpenShapingTile(isOpen ? null : tile.title)}
                        className="rounded-xl border border-border/60 bg-card p-5 text-left hover:border-primary/40 transition-colors"
                      >
                        <p className="text-xs uppercase tracking-[0.18em] text-primary/80 mb-2">{index + 1}</p>
                        <h4 className="text-lg font-display font-semibold text-foreground mb-2">{tile.title}</h4>
                        <p className="text-sm text-muted-foreground">{tile.summary}</p>
                        {isOpen && (
                          <div className="mt-4 space-y-2 text-sm">
                            <p>
                              <span className="font-semibold text-rose-500">Red flag:</span>{" "}
                              <span className="text-muted-foreground">{tile.redFlag}</span>
                            </p>
                            <p>
                              <span className="font-semibold text-emerald-600">Growth sign:</span>{" "}
                              <span className="text-muted-foreground">{tile.growthSign}</span>
                            </p>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="max-w-5xl mx-auto">
                <h3 className="text-2xl font-display font-semibold text-foreground mb-5">What might be getting in your way</h3>
                <p className="text-muted-foreground mb-5">Common things teens this age deal with</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {challengeCards.map(([title, body]) => (
                    <div key={title} className="rounded-xl border border-border/60 bg-card p-5">
                      <h4 className="text-base font-semibold text-foreground mb-2">{title}</h4>
                      <p className="text-sm text-muted-foreground">{body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="max-w-5xl mx-auto">
                <h3 className="text-2xl font-display font-semibold text-foreground mb-5">No one told you this... but it matters</h3>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {quickTruths.map((truth) => (
                    <div key={truth} className="min-w-[260px] md:min-w-[320px] rounded-xl border border-primary/30 bg-[hsl(195_25%_96%_/_0.8)] p-5 text-sm text-foreground/85">
                      {truth}
                    </div>
                  ))}
                </div>
              </div>

              <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-card p-8">
                <h3 className="text-2xl font-display font-semibold text-foreground mb-6">Try this today</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {microActions.map((action) => (
                    <div key={action.title} className="rounded-xl border border-border/60 p-5">
                      <h4 className="text-base font-semibold text-foreground mb-3">{action.title}</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                        {action.steps.map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="max-w-5xl mx-auto rounded-2xl border border-primary/35 bg-[hsl(195_25%_96%_/_0.8)] p-8">
                <h3 className="text-2xl font-display font-semibold text-foreground mb-3">Quick understanding helps. But stronger growth needs more than one page.</h3>
                <p className="text-muted-foreground mb-5">
                  If you want to become more focused, confident, disciplined, emotionally steady, and more sure of yourself, you may need more than random tips.
                </p>
                <p className="text-sm font-semibold text-foreground mb-3">What Ikigai Teen offers:</p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                  <li>understand yourself better</li>
                  <li>build stronger habits</li>
                  <li>handle emotions better</li>
                  <li>improve confidence and discipline</li>
                  <li>become more grounded and responsible</li>
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button type="button" className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium">See What This Could Help With</button>
                  <button type="button" className="px-4 py-2 rounded-md border border-primary/40 text-primary text-sm font-medium">Show This to My Parent</button>
                </div>
              </div>

              <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-card p-8">
                <h3 className="text-2xl font-display font-semibold text-foreground mb-4">How to ask at home</h3>
                <p className="text-muted-foreground mb-4">Want to explore this with your parent? You can say:</p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {parentScripts.map((line) => (
                    <li key={line} className="rounded-lg border border-border/60 p-3">"{line}"</li>
                  ))}
                </ul>
                <button type="button" onClick={() => setSelectedAge(null)} className="mt-6 text-sm text-primary font-semibold hover:underline">
                  Choose a different age
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default KnowYourself;
