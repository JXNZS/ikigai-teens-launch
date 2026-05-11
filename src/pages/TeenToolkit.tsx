import { useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LetterSwapForward } from "@/components/ui/letter-swap";
import { ClipPathInfoCard } from "@/components/ui/clip-path-links";

const toolkitNeeds1315 = [
  {
    label: "I feel distracted",
    solution:
      "Your mind keeps jumping between school, friends, games, videos, and notifications, making it hard to focus on one thing for long.",
    tips: [
      "Study or work in short sessions (20–30 minutes)",
      "Keep your phone away while doing homework",
      "Turn off unnecessary notifications",
      "Do one task at a time instead of multitasking",
      "Take small breaks after focused work",
      "Sleep properly - tired brains get distracted faster",
    ],
    reminder: "Focus is a skill. The more you practice it, the easier it becomes.",
  },
  {
    label: "I'm overthinking",
    solution:
      "You replay small moments repeatedly and worry people noticed mistakes that probably mattered less than you think.",
    tips: [
      "Ask yourself: 'Will this matter next week?'",
      "Write your thoughts down instead of keeping them in your head",
      "Talk to someone you trust",
      "Keep yourself busy with real activities, not endless thinking",
      "Stop trying to make everything perfect",
    ],
    reminder: "Your thoughts are not always facts.",
  },
  {
    label: "I feel low / confused",
    solution:
      "Some days you feel emotionally off, unmotivated, or unsure about yourself without fully understanding why.",
    tips: [
      "Get enough sleep consistently",
      "Spend time outside or move your body daily",
      "Listen to music, draw, play sports, or do hobbies",
      "Talk to supportive people instead of isolating yourself",
      "Be patient with yourself when you feel 'off'",
    ],
    reminder: "Not every bad day means something is wrong with you.",
  },
  {
    label: "I can't stay consistent",
    solution:
      "You feel motivated at first but quickly lose energy, making routines, habits, or goals difficult to maintain.",
    tips: [
      "Start tiny:",
      "10 minutes of studying",
      "5 pushups",
      "Reading 2 pages",
      "Track small wins daily",
      "Focus on showing up, not being perfect",
      "If you miss a day, restart quickly instead of quitting",
    ],
    reminder: "Consistency beats intensity.",
  },
  {
    label: "I want to feel more confident",
    solution:
      "You sometimes stay quiet, doubt yourself, or avoid things because you’re scared of embarrassment, rejection, or not being enough.",
    tips: [
      "Speak up even if your voice shakes",
      "Try things without needing to be perfect",
      "Stop apologizing for every little thing",
      "Spend less time comparing yourself online",
      "Celebrate small improvements",
    ],
    reminder: "Confidence is built, not born.",
  },
  {
    label: "I want to fix my routine",
    solution:
      "Your sleep, homework, screen time, or daily habits feel messy and difficult to manage properly.",
    tips: [
      "Sleep and wake up around the same time",
      "Reduce screen time before bed",
      "Make a basic daily plan:",
      "School",
      "Homework",
      "Break",
      "Fun time",
      "Prepare for the next day the night before",
    ],
    reminder: "Simple routines are easier to maintain.",
  },
  {
    label: "I feel stuck",
    solution:
      "You want things to improve but don’t know where to start or how to change what you’re feeling.",
    tips: [
      "Pick ONE thing to improve this week",
      "Break goals into smaller steps",
      "Stop waiting for motivation to magically appear",
      "Spend less time thinking and more time doing",
    ],
    reminder: "Small progress is still progress.",
  },
  {
    label: "I feel pressured",
    solution:
      "School, expectations, friendships, and trying to fit in can sometimes feel emotionally exhausting and overwhelming.",
    tips: [
      "Stop putting pressure on yourself to be perfect",
      "Take breaks without guilt",
      "Talk about stress instead of hiding it",
      "Spend time with people who make you feel safe",
      "Remember that everyone struggles sometimes",
    ],
    reminder: "You are allowed to rest.",
  },
  {
    label: "I keep comparing myself",
    solution:
      "Seeing other people online, at school, or around you makes it feel like everyone else is happier, cooler, or doing better.",
    tips: [
      "Spend less time scrolling social media",
      "Focus on improving yourself, not beating others",
      "Remember people mostly post their best moments",
      "Practice gratitude for what you already have",
    ],
    reminder: "Your journey does not need to look like someone else’s.",
  },
];

const toolkitNeeds1618 = [
  {
    label: "I feel distracted",
    solution:
      "Constant stimulation, stress, social media, and pressure make it difficult to stay mentally focused or emotionally present for long.",
    tips: [
      "Study in focused time blocks",
      "Keep your phone physically away while working",
      "Avoid switching between apps constantly",
      "Create a clean workspace",
      "Prioritize sleep and hydration",
      "Practice being present without consuming content 24/7",
    ],
    reminder: "Your attention is shaped by what you repeatedly give energy to.",
  },
  {
    label: "I'm overthinking",
    solution:
      "You analyze conversations, decisions, and mistakes repeatedly until your thoughts become mentally draining and emotionally exhausting.",
    tips: [
      "Separate 'thinking' from 'solving'",
      "Ask: 'Can I control this?'",
      "Ask: 'Is this useful right now?'",
      "Journal your thoughts instead of looping them mentally",
      "Make decisions with the information you have",
      "Accept that mistakes are part of growth",
    ],
    reminder: "Clarity often comes from action, not endless analysis.",
  },
  {
    label: "I feel low / confused",
    solution:
      "You feel emotionally disconnected, uncertain about yourself, or mentally overwhelmed while trying to understand where your life is heading.",
    tips: [
      "Focus on stability before perfection",
      "Improve sleep, movement, and eating habits",
      "Build supportive friendships",
      "Spend less time comparing yourself online",
      "Explore interests instead of forcing yourself to 'figure everything out'",
    ],
    reminder: "It is okay to still be figuring yourself out.",
  },
  {
    label: "I can't stay consistent",
    solution:
      "You struggle maintaining habits, discipline, or motivation even when you genuinely want to improve yourself and your future.",
    tips: [
      "Build habits around your daily schedule",
      "Lower unrealistic expectations",
      "Focus on progress, not perfection",
      "Track habits weekly",
      "Learn to restart quickly after setbacks",
    ],
    reminder: "Discipline is built through repetition, not mood.",
  },
  {
    label: "I want to feel more confident",
    solution:
      "You often second-guess your choices, feelings, or abilities. Confidence can feel temporary, especially when it depends on how others respond to you.",
    tips: [
      "Keep promises you make to yourself",
      "Speak honestly instead of people-pleasing",
      "Do difficult things even when uncomfortable",
      "Stop needing everyone’s approval",
      "Learn from failure instead of using it against yourself",
    ],
    reminder: "Self-trust creates lasting confidence.",
  },
  {
    label: "I want to fix my routine",
    solution:
      "Your sleep, productivity, energy, and daily habits feel chaotic, unbalanced, and harder to control consistently.",
    tips: [
      "Fix your sleep schedule first",
      "Reduce late-night scrolling",
      "Plan your most important tasks earlier in the day",
      "Add movement/exercise consistently",
      "Avoid trying to 'completely change your life' overnight",
    ],
    reminder: "Balanced routines work better than extreme ones.",
  },
  {
    label: "I feel stuck",
    solution:
      "You know something in your life needs to change, but mentally you feel frozen or unsure where to begin.",
    tips: [
      "Stop waiting for the perfect plan",
      "Take one small action daily",
      "Spend less time consuming and more time creating",
      "Change your environment occasionally",
      "Ask for support when needed",
    ],
    reminder: "Movement creates momentum.",
  },
  {
    label: "I feel pressured",
    solution:
      "Expectations about success, school, future plans, relationships, and responsibilities can feel emotionally heavy all at once.",
    tips: [
      "Stop comparing your timeline to others",
      "Focus on what you can control today",
      "Rest without feeling guilty",
      "Learn to say no when overwhelmed",
      "Remember that success is not one straight path",
    ],
    reminder: "You do not need to have your whole life figured out right now.",
  },
  {
    label: "I keep comparing myself",
    solution:
      "You frequently compare your looks, accomplishments, friendships, or life progress to other people and end up feeling like you’re falling behind.",
    tips: [
      "Reduce social media that triggers insecurity",
      "Focus on your own growth and goals",
      "Remember everyone hides struggles differently",
      "Celebrate your own progress more often",
      "Build a life you genuinely enjoy instead of trying to impress people",
    ],
    reminder: "Someone else doing well does not mean you are failing.",
  },
];

const quickResetTools = [
  {
    title: "Calm My Mind (2 mins)",
    steps: [
      "Breathe in for 4, hold 4, out for 6 (repeat 5 times)",
      "Look around and name 5 things you see",
      "Tell yourself: I can slow this down",
    ],
  },
  {
    title: "Stop Overthinking (3 steps)",
    steps: ["Write the problem in one line", "Write one next step", "Do only that step"],
  },
  {
    title: "Phone Reset",
    steps: ["Keep phone away for 10 minutes", "Do 1 small task fully", "Then check"],
  },
  {
    title: "Restart My Day",
    steps: ["Forget the earlier part of the day", "Pick 1 useful action", "Complete it"],
  },
];

const habitTools = [
  {
    title: "Start Small Routine",
    steps: [
      "Wake up -> no phone for first 15 mins",
      "Do 1 useful task",
      "Keep 1 promise to yourself",
    ],
  },
  {
    title: "3-Day Mini Challenge",
    steps: [
      "Day 1: Notice your distractions",
      "Day 2: Delay them by 5 mins",
      "Day 3: Do 1 hard thing first",
    ],
  },
  {
    title: "Keep One Promise",
    steps: ["Don't try to fix everything", "Just keep one promise daily"],
  },
];

const mindEmotionTools = [
  {
    title: "What Am I Feeling?",
    steps: [
      "Name the Emotion: Angry, Confused, Left out, Pressured, Low...",
      "Ask: Why might I feel this?",
      "Allot how many minutes I want to feel this before moving on?",
    ],
  },
  {
    title: "Friendship Reset",
    steps: [
      "Not everyone has to like you",
      "Choose 1 person who respects you",
      "Be real, not impressive",
    ],
  },
  {
    title: "Confidence Builder",
    steps: ["Do 1 thing you've been avoiding", "Small courage builds real confidence", "It's okay to stand up for what you think is right"],
  },
];

const bodyEnergyTools = [
  {
    title: "Why Am I So Tired?",
    steps: [
      "Check: Did I sleep for 8 hours?",
      "Fix: How long did I spend on screens?",
      "Did I drink enough water and move my body?"
    ],
  },
  {
    title: "Self-Respect Basics",
    steps: ["Clean body", "Eat on time", "Keep your space decent"],
  },
];

const supportParentScripts1315 = [
  "I think this could help me focus better. Can we check this together?",
  "This looks useful, not random motivation. Can we go through it?",
  "I want to improve my habits. Can I try this program?",
];

const quickResetTools1618 = [
  {
    title: "Mental Reset (2 mins)",
    steps: ["Pause", "Breathe slow", "Ask: What actually matters right now?"],
  },
  {
    title: "Break Overthinking",
    steps: ["What's the issue? (1 line)", "What's in my control?", "What's the next action?"],
  },
  {
    title: "Digital Control Reset",
    steps: ["Put phone away", "Work in 15-min focus block", "No switching"],
  },
  {
    title: "Restart After a Bad Day",
    steps: ["Stop replaying the day", "Choose 1 meaningful action", "Execute"],
  },
];

const disciplineTools1618 = [
  {
    title: "Build a Simple Routine",
    steps: ["Fixed wake-up", "One priority task", "Limited distractions", "Wind-down before sleep"],
  },
  {
    title: "Consistency Builder",
    steps: [
      "You don't need intensity. You need repetition.",
      "Pick: 1 habit, 1 time, 1 place",
      "Repeat daily",
    ],
  },
  {
    title: "Stop Starting & Stopping",
    steps: ["Reduce goals", "Increase follow-through", "Track small wins"],
  },
];

const mindEmotionTools1618 = [
  {
    title: "Emotional Check-In",
    steps: ["What am I feeling?", "What triggered this?", "What is the best response?"],
  },
  {
    title: "Comparison Reset",
    steps: ["You are comparing your reality to someone else's highlight", "Focus on your path"],
  },
  {
    title: "Attraction / Relationship Clarity",
    steps: [
      "Are you thinking clearly or emotionally?",
      "Is this helping you grow or distracting you?",
      "Stay grounded in your values",
    ],
  },
  {
    title: "Confidence Rebuild",
    steps: ["Keep promises to yourself", "Reduce validation-seeking", "Build internal respect"],
  },
];

const bodyControlTools1618 = [
  {
    title: "Energy Audit",
    steps: ["Sleep", "Food", "Movement"],
  },
  {
    title: "Night Routine Reset",
    steps: ["No screens 30 mins before sleep", "Slow your mind", "Plan next day"],
  },
  {
    title: "Self-Control Basics",
    steps: ["Delay impulses", "Stay with discomfort", "Choose long-term over short-term"],
  },
];

const supportParentScripts1618 = [
  "I feel like I need more structure. Can we explore this?",
  "This looks like a proper system, not just motivation. Can we review it?",
  "I want to improve seriously. Can we consider this?",
];

const TeenToolkit = () => {
  const [searchParams] = useSearchParams();
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [transitionDirection, setTransitionDirection] = useState(1);
  const [selectedNeed1315, setSelectedNeed1315] = useState<string | null>(null);
  const [hasContinued1315, setHasContinued1315] = useState(false);
  const [selectedNeed1618, setSelectedNeed1618] = useState<string | null>(null);
  const [hasContinued1618, setHasContinued1618] = useState(false);
  const selectedSectionRef = useRef<HTMLElement | null>(null);
  const continuedContentRef = useRef<HTMLDivElement | null>(null);
  const continuedContentRef1618 = useRef<HTMLDivElement | null>(null);

  const handleCardMouseMove = (e: MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 16;
    const rotateY = (centerX - x) / 16;

    card.style.setProperty("--bg-x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--bg-y", `${(y / rect.height) * 100}%`);
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-1px)`;
  };

  const handleCardMouseLeave = (e: MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    card.style.setProperty("--bg-x", "50%");
    card.style.setProperty("--bg-y", "50%");
  };

  const ageCategories = [
    {
      id: "13-15",
       label: "13-15 years",
      description: "Early teen years - practical tools for identity, habits, and confidence.",
    },
    {
      id: "16-18",
       label: "16-18 years",
      description: "Late teen years - deeper tools for clarity, discipline, and direction.",
    },
  ];

  const getDirectionFromAge = (ageId: string) => (ageId === "13-15" ? -1 : 1);
  const selectedNeed1315Details = toolkitNeeds1315.find((need) => need.label === selectedNeed1315) ?? null;
  const selectedNeed1618Details = toolkitNeeds1618.find((need) => need.label === selectedNeed1618) ?? null;
  const arrangedToolkitNeeds1315 = toolkitNeeds1315;
  const arrangedToolkitNeeds1618 = toolkitNeeds1618;

  const selectAge = (ageId: string) => {
    setTransitionDirection(getDirectionFromAge(ageId));
    setSelectedAge(ageId);
    setSelectedNeed1315(null);
    setHasContinued1315(false);
    setSelectedNeed1618(null);
    setHasContinued1618(false);
  };

  const returnToAgeSelection = () => {
    if (selectedAge) {
      setTransitionDirection(-getDirectionFromAge(selectedAge));
    }
    setSelectedAge(null);
    setSelectedNeed1315(null);
    setHasContinued1315(false);
    setSelectedNeed1618(null);
    setHasContinued1618(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const requestedAge = searchParams.get("age");
    if (requestedAge !== "13-15" && requestedAge !== "16-18") {
      return;
    }

    setTransitionDirection(getDirectionFromAge(requestedAge));
    setSelectedAge(requestedAge);
    setSelectedNeed1315(null);
    setHasContinued1315(false);
    setSelectedNeed1618(null);
    setHasContinued1618(false);
  }, [searchParams]);

  const pageTransition = {
    duration: 0.55,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  };

  useEffect(() => {
    if (selectedAge && selectedSectionRef.current) {
      selectedSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedAge]);

  useEffect(() => {
    if (hasContinued1315 && continuedContentRef.current) {
      continuedContentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hasContinued1315]);

  useEffect(() => {
    if (hasContinued1618 && continuedContentRef1618.current) {
      continuedContentRef1618.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hasContinued1618]);

  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20 bg-background min-h-screen">
        <section className="footer-theme-legacy py-12 md:py-20 bg-card border-b border-border/50 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div className="max-w-3xl mx-auto text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 md:mb-6"
                style={{ color: '#FCEADE' }}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <LetterSwapForward label="Teen Toolkit" />
              </motion.h1>

              <motion.p
                className="text-base sm:text-lg md:text-xl text-white font-medium leading-relaxed px-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Practical tools to help teens build focus, confidence, emotional steadiness, and direction.
              </motion.p>
            </motion.div>
          </div>
        </section>

        <AnimatePresence mode="wait" initial={false}>
          {selectedAge === null && (
            <motion.section
              key="choose-age"
              className="py-12 md:py-20 bg-background"
              initial={{ opacity: 0, x: 56 * transitionDirection, scale: 0.985, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -48 * transitionDirection, scale: 0.99, filter: "blur(6px)" }}
              transition={pageTransition}
            >
              <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-primary/85 mb-8 md:mb-12 text-center">
                    <LetterSwapForward label="Choose your age" />
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {ageCategories.map((category) => (
                      <motion.button
                        key={category.id}
                        whileHover={{ scale: 1.02 }}
                        onMouseMove={handleCardMouseMove}
                        onMouseLeave={handleCardMouseLeave}
                        onClick={() => selectAge(category.id)}
                        className="relative p-6 md:p-8 rounded-lg md:rounded-xl border-2 transition-[transform,border-color,box-shadow,background-color] duration-300 text-left group overflow-hidden border-border hover:border-border/60 bg-[hsl(42_38%_88%_/_0.7)] hover:bg-[hsl(42_38%_88%_/_0.82)] hover:shadow-[0_0_0_1px_rgba(44,66,63,0.45),0_0_28px_rgba(44,66,63,0.5)]"
                        style={{
                          transformStyle: "preserve-3d",
                          transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
                        }}
                      >
                        <div
                          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          style={{
                            background:
                              "radial-gradient(circle at var(--bg-x, 50%) var(--bg-y, 50%), rgba(44,66,63,0.24), rgba(44,66,63,0.1) 35%, rgba(0, 0, 0, 0) 70%)",
                          }}
                        />

                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-3 md:mb-4">
                            <h3 className="text-2xl sm:text-3xl md:text-4xl number-font font-bold text-primary tracking-tight">{category.label}</h3>
                            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-primary/60 shrink-0" />
                          </div>
                          <p className="text-foreground/75 text-xs sm:text-sm md:text-base leading-relaxed">{category.description}</p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {selectedAge === "13-15" && (
            <motion.section
              key="age-13-15"
              ref={selectedSectionRef}
              className="py-12 md:py-16 lg:py-20 bg-background"
              initial={{ opacity: 0, x: 56 * transitionDirection, scale: 0.985, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -48 * transitionDirection, scale: 0.99, filter: "blur(6px)" }}
              transition={pageTransition}
            >
              <div className="container mx-auto px-4 md:px-6 space-y-12 md:space-y-16">
                <div className="max-w-5xl mx-auto">
                  <button
                    type="button"
                    onClick={returnToAgeSelection}
                    className="inline-flex items-center rounded-md bg-primary/15 px-2 py-0.5 text-xs md:text-sm font-semibold text-primary hover:bg-primary/20 transition-colors"
                  >
                    Choose a different age
                  </button>
                </div>

                <AnimatePresence mode="wait" initial={false}>
                {!hasContinued1315 && (
                <motion.div
                  key="toolkit-needs-selector"
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(42_38%_88%_/_0.7)] p-5 sm:p-8"
                >
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">Teen Toolkit (Age 13-15)</p>
                  <h2 className="w-full leading-tight text-3xl md:text-4xl font-display font-bold text-primary/85 mb-4">
                    You Don't Need Another Lecture. You Need Tools That Actually Help.
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Not everything needs a big solution. Sometimes you just need the right reset at the right time.
                  </p>
                  <p className="mt-5 text-foreground font-medium mb-3">Choose what you need right now:</p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {arrangedToolkitNeeds1315.map((need) => (
                      <button
                        key={need.label}
                        type="button"
                        onClick={() => setSelectedNeed1315(need.label)}
                        className={`text-left rounded-xl border p-5 transition-[transform,border-color,box-shadow,background-color,color] duration-300 ${
                          selectedNeed1315 === need.label
                            ? "border-primary/80 bg-[hsl(42_38%_88%_/_0.95)] text-foreground shadow-[0_0_0_1px_hsl(var(--primary)/0.4),0_0_20px_hsl(var(--primary)/0.35)]"
                            : "border-border/60 bg-card text-muted-foreground hover:border-primary/60 hover:bg-[hsl(42_38%_88%_/_0.95)] hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.3),0_0_16px_hsl(var(--primary)/0.25)]"
                        }`}
                      >
                        {need.label}
                      </button>
                    ))}
                  </div>
                  {selectedNeed1315Details && (
                    <motion.div
                      key={selectedNeed1315Details.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="mt-5 rounded-xl border border-primary/20 bg-white/70 p-4 text-sm text-foreground/80 leading-relaxed"
                    >
                      {selectedNeed1315Details.solution}
                    </motion.div>
                  )}
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setHasContinued1315(true)}
                      disabled={!selectedNeed1315}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        selectedNeed1315
                          ? "bg-primary text-primary-foreground hover:brightness-105"
                          : "bg-primary/40 text-primary-foreground/70 cursor-not-allowed"
                      }`}
                    >
                      Continue
                    </button>
                  </div>
                </motion.div>
                )}

                {hasContinued1315 && (
                  <motion.div
                    key="toolkit-content-reveal"
                    ref={continuedContentRef}
                    initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-16"
                  >
                {selectedNeed1315Details && (
                  <div className="max-w-5xl mx-auto rounded-2xl border border-primary/35 bg-[hsl(42_38%_88%_/_0.88)] p-5 sm:p-8 space-y-5">
                    <div>
                      <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">Your selected challenge</p>
                      <h3 className="text-2xl md:text-3xl font-display font-bold text-primary/85">{selectedNeed1315Details.label}</h3>
                    </div>
                    <div className="rounded-xl border border-border/60 bg-white/75 p-4 sm:p-5 space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-foreground mb-2">Solution</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{selectedNeed1315Details.solution}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground mb-2">Tips to work on it</p>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                          {selectedNeed1315Details.tips?.map((tip) => (
                            <li key={tip}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground mb-2">Reminder</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{selectedNeed1315Details.reminder}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(42_38%_88%_/_0.8)] p-5 sm:p-8">
                  <h3 className="mb-5">
                    <LetterSwapForward label="Quick Resets (Try Now)" className="text-2xl font-display font-semibold text-primary/85" />
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {quickResetTools.map((tool) => (
                      <ClipPathInfoCard key={tool.title} title={tool.title}>
                        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                          {tool.steps.map((step) => (
                            <li key={step}>{step}</li>
                          ))}
                        </ul>
                      </ClipPathInfoCard>
                    ))}
                  </div>
                </div>

                <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(42_38%_88%_/_0.8)] p-5 sm:p-8">
                  <h3 className="mb-5">
                    <LetterSwapForward label="Build Better Habits" className="text-2xl font-display font-semibold text-primary/85" />
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {habitTools.map((tool) => (
                      <ClipPathInfoCard key={tool.title} title={tool.title}>
                        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                          {tool.steps.map((step) => (
                            <li key={step}>{step}</li>
                          ))}
                        </ul>
                      </ClipPathInfoCard>
                    ))}
                  </div>
                </div>

                <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(42_38%_88%_/_0.8)] p-5 sm:p-8">
                  <h3 className="mb-5">
                    <LetterSwapForward label="Mind + Emotion Tools" className="text-2xl font-display font-semibold text-primary/85" />
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {mindEmotionTools.map((tool) => (
                      <ClipPathInfoCard key={tool.title} title={tool.title}>
                        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                          {tool.steps.map((step) => (
                            <li key={step}>{step}</li>
                          ))}
                        </ul>
                      </ClipPathInfoCard>
                    ))}
                  </div>
                </div>

                <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(42_38%_88%_/_0.8)] p-5 sm:p-8">
                  <h3 className="mb-5">
                    <LetterSwapForward label="Body + Energy Basics" className="text-2xl font-display font-semibold text-primary/85" />
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {bodyEnergyTools.map((tool) => (
                      <ClipPathInfoCard key={tool.title} title={tool.title}>
                        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                          {tool.steps.map((step) => (
                            <li key={step}>{step}</li>
                          ))}
                        </ul>
                      </ClipPathInfoCard>
                    ))}
                  </div>
                </div>

                <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(42_38%_88%_/_0.8)] p-5 sm:p-8">
                  <h3 className="mb-5">
                    <LetterSwapForward label="Get Support" className="text-2xl font-display font-semibold text-primary/85" />
                  </h3>
                  <ClipPathInfoCard title="When to Talk to Someone">
                    <p className="text-sm text-muted-foreground mb-3">If you feel stuck for many days, very low, confused, or unable to handle things.</p>
                    <p className="text-sm font-semibold text-foreground mb-2">Talk to:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>parent</li>
                      <li>teacher</li>
                      <li>trusted adult</li>
                    </ul>
                  </ClipPathInfoCard>
                </div>

                <div className="cta-card max-w-5xl mx-auto rounded-2xl border border-primary/35 bg-[hsl(42_38%_88%_/_0.8)] p-5 sm:p-8">
                  <h3 className="mb-3">
                    <LetterSwapForward
                      label="Quick tools help. But stronger change needs training."
                      className="w-full flex-wrap justify-start items-start leading-tight text-2xl font-display font-semibold text-primary/85"
                    />
                  </h3>
                  <p className="text-muted-foreground mb-5">
                    If you keep facing the same problems - distraction, inconsistency, confusion - you may need more than tips.
                  </p>
                  <p className="text-sm font-semibold text-foreground mb-3">What this is:</p>
                  <p className="text-sm text-muted-foreground mb-3">A 90-day guided challenge to help you:</p>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                    <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(42_38%_88%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">focus better</li>
                    <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(42_38%_88%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">build discipline</li>
                    <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(42_38%_88%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">feel more confident</li>
                    <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(42_38%_88%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">manage emotions</li>
                    <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(42_38%_88%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">become more responsible</li>
                  </ul>
                </div>

                <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(42_38%_88%_/_0.8)] p-5 sm:p-8">
                  <h3 className="mb-4">
                    <LetterSwapForward label="How to Ask Your Parent" className="text-2xl font-display font-semibold text-primary/85" />
                  </h3>
                  <p className="text-muted-foreground mb-4">Not sure how to say it? You can try:</p>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {supportParentScripts1315.map((line) => (
                      <li
                        key={line}
                        className="rounded-lg border border-border/60 p-3 transition-[transform,border-color,box-shadow,background-color] duration-300 hover:scale-[1.015] hover:border-primary/60 hover:bg-[hsl(42_38%_88%_/_0.95)] hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.4),0_0_20px_hsl(var(--primary)/0.35)]"
                      >
                        "{line}"
                      </li>
                    ))}
                  </ul>
                </div>
                  </motion.div>
                )}
                </AnimatePresence>
              </div>
            </motion.section>
          )}

          {selectedAge === "16-18" && (
            <motion.section
              key="age-16-18"
              ref={selectedSectionRef}
              className="py-16 md:py-20 bg-background"
              initial={{ opacity: 0, x: 56 * transitionDirection, scale: 0.985, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -48 * transitionDirection, scale: 0.99, filter: "blur(6px)" }}
              transition={pageTransition}
            >
              <div className="container mx-auto px-4 md:px-6 space-y-12 md:space-y-16">
                <div className="max-w-5xl mx-auto">
                  <button
                    type="button"
                    onClick={returnToAgeSelection}
                    className="inline-flex items-center rounded-md bg-primary/15 px-2 py-0.5 text-xs md:text-sm font-semibold text-primary hover:bg-primary/20 transition-colors"
                  >
                    Choose a different age
                  </button>
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  {!hasContinued1618 && (
                    <motion.div
                      key="toolkit-needs-selector-1618"
                      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="max-w-5xl mx-auto rounded-lg md:rounded-2xl border border-border/60 bg-[hsl(42_38%_88%_/_0.7)] p-6 md:p-8"
                    >
                      <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2 md:mb-3">Teen Toolkit (Age 16-18)</p>
                      <h2 className="w-full leading-tight text-2xl sm:text-3xl md:text-4xl font-display font-bold text-primary/85 mb-3 md:mb-4">
                        You Don't Need Another Lecture. You Need Tools That Actually Help.
                      </h2>
                      <p className="text-sm md:text-lg text-muted-foreground leading-relaxed">
                        Not everything needs a big solution. Sometimes you just need the right reset at the right time.
                      </p>
                      <p className="mt-4 md:mt-5 text-foreground font-medium mb-2 md:mb-3 text-sm md:text-base">Choose what you need right now:</p>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
                        {arrangedToolkitNeeds1618.map((need) => (
                          <button
                            key={need.label}
                            type="button"
                            onClick={() => setSelectedNeed1618(need.label)}
                            className={`text-left rounded-lg md:rounded-xl border p-3 md:p-5 transition-[transform,border-color,box-shadow,background-color,color] duration-300 text-xs md:text-sm ${
                              selectedNeed1618 === need.label
                                ? "border-primary/80 bg-[hsl(42_38%_88%_/_0.95)] text-foreground shadow-[0_0_0_1px_hsl(var(--primary)/0.4),0_0_20px_hsl(var(--primary)/0.35)]"
                                : "border-border/60 bg-card text-muted-foreground hover:border-primary/60 hover:bg-[hsl(42_38%_88%_/_0.95)] hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.3),0_0_16px_hsl(var(--primary)/0.25)]"
                            }`}
                          >
                            {need.label}
                          </button>
                        ))}
                      </div>
                      {selectedNeed1618Details && (
                        <motion.div
                          key={selectedNeed1618Details.label}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="mt-5 rounded-xl border border-primary/20 bg-white/70 p-4 text-sm text-foreground/80 leading-relaxed"
                        >
                          {selectedNeed1618Details.solution}
                        </motion.div>
                      )}
                      <div className="mt-4 md:mt-6 flex justify-end">
                        <button
                          type="button"
                          onClick={() => setHasContinued1618(true)}
                          disabled={!selectedNeed1618}
                          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            selectedNeed1618
                              ? "bg-primary text-primary-foreground hover:brightness-105"
                              : "bg-primary/40 text-primary-foreground/70 cursor-not-allowed"
                          }`}
                        >
                          Continue
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {hasContinued1618 && (
                    <motion.div
                      key="toolkit-content-reveal-1618"
                      ref={continuedContentRef1618}
                      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-16"
                    >
                      {selectedNeed1618Details && (
                        <div className="max-w-5xl mx-auto rounded-2xl border border-primary/35 bg-[hsl(42_38%_88%_/_0.88)] p-5 sm:p-8 space-y-4">
                          <div>
                            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">Your selected challenge</p>
                            <h3 className="text-2xl md:text-3xl font-display font-bold text-primary/85">{selectedNeed1618Details.label}</h3>
                          </div>
                          <div className="rounded-xl border border-border/60 bg-white/75 p-4 sm:p-5">
                            <p className="text-sm font-semibold text-foreground mb-2">Solution</p>
                            <p className="text-sm text-muted-foreground leading-relaxed">{selectedNeed1618Details.solution}</p>
                          </div>
                          <div className="rounded-xl border border-border/60 bg-white/75 p-4 sm:p-5 space-y-4">
                            <div>
                              <p className="text-sm font-semibold text-foreground mb-2">Tips to work on it</p>
                              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                                {selectedNeed1618Details.tips?.map((tip) => (
                                  <li key={tip}>{tip}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-foreground mb-2">Reminder</p>
                              <p className="text-sm text-muted-foreground leading-relaxed">{selectedNeed1618Details.reminder}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(42_38%_88%_/_0.8)] p-5 sm:p-8">
                        <h3 className="mb-5">
                          <LetterSwapForward label="Quick Resets (Try Now)" className="text-2xl font-display font-semibold text-primary/85" />
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {quickResetTools1618.map((tool) => (
                            <ClipPathInfoCard key={tool.title} title={tool.title}>
                              <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                                {tool.steps.map((step) => (
                                  <li key={step}>{step}</li>
                                ))}
                              </ul>
                            </ClipPathInfoCard>
                          ))}
                        </div>
                      </div>

                      <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(42_38%_88%_/_0.8)] p-5 sm:p-8">
                        <h3 className="mb-5">
                          <LetterSwapForward label="Build Discipline + Consistency" className="text-2xl font-display font-semibold text-primary/85" />
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {disciplineTools1618.map((tool) => (
                            <ClipPathInfoCard key={tool.title} title={tool.title}>
                              <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                                {tool.steps.map((step) => (
                                  <li key={step}>{step}</li>
                                ))}
                              </ul>
                            </ClipPathInfoCard>
                          ))}
                        </div>
                      </div>

                      <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(42_38%_88%_/_0.8)] p-5 sm:p-8">
                        <h3 className="mb-5">
                          <LetterSwapForward label="Mind + Emotion Tools" className="text-2xl font-display font-semibold text-primary/85" />
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {mindEmotionTools1618.map((tool) => (
                            <ClipPathInfoCard key={tool.title} title={tool.title}>
                              <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                                {tool.steps.map((step) => (
                                  <li key={step}>{step}</li>
                                ))}
                              </ul>
                            </ClipPathInfoCard>
                          ))}
                        </div>
                      </div>

                      <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(42_38%_88%_/_0.8)] p-5 sm:p-8">
                        <h3 className="mb-5">
                          <LetterSwapForward label="Body + Energy + Control" className="text-2xl font-display font-semibold text-primary/85" />
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {bodyControlTools1618.map((tool) => (
                            <ClipPathInfoCard key={tool.title} title={tool.title}>
                              <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                                {tool.steps.map((step) => (
                                  <li key={step}>{step}</li>
                                ))}
                              </ul>
                            </ClipPathInfoCard>
                          ))}
                        </div>
                      </div>

                      <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(42_38%_88%_/_0.8)] p-5 sm:p-8">
                        <h3 className="mb-5">
                          <LetterSwapForward label="Real-Life Support" className="text-2xl font-display font-semibold text-primary/85" />
                        </h3>
                        <ClipPathInfoCard title="When to Seek Help">
                          <p className="text-sm text-muted-foreground mb-3">If you feel constantly overwhelmed, emotionally unstable, stuck in patterns, or unable to move forward.</p>
                          <p className="text-sm font-semibold text-foreground mb-2">Talk to:</p>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                            <li>parent</li>
                            <li>mentor</li>
                            <li>counsellor</li>
                          </ul>
                        </ClipPathInfoCard>
                      </div>

                      <div className="cta-card max-w-5xl mx-auto rounded-2xl border border-primary/35 bg-[hsl(42_38%_88%_/_0.8)] p-5 sm:p-8">
                        <h3 className="mb-3">
                          <LetterSwapForward
                            label="You don't need more content. You need a system."
                            className="w-full flex-wrap justify-start items-start leading-tight text-2xl font-display font-semibold text-primary/85"
                          />
                        </h3>
                        <p className="text-muted-foreground mb-5">
                          If you're serious about becoming focused, disciplined, confident, and clear, structure matters.
                        </p>
                        <p className="text-sm font-semibold text-foreground mb-3">What this is:</p>
                        <p className="text-sm text-muted-foreground mb-3">A 90-day guided challenge to help you:</p>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                          <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(42_38%_88%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">build consistency</li>
                          <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(42_38%_88%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">improve focus</li>
                          <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(42_38%_88%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">manage distractions</li>
                          <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(42_38%_88%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">strengthen emotional control</li>
                          <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(42_38%_88%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">move toward purpose</li>
                        </ul>
                      </div>

                      <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(42_38%_88%_/_0.8)] p-5 sm:p-8">
                        <h3 className="mb-4">
                          <LetterSwapForward label="How to Talk at Home" className="text-2xl font-display font-semibold text-primary/85" />
                        </h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                          {supportParentScripts1618.map((line) => (
                            <li
                              key={line}
                              className="rounded-lg border border-border/60 p-3 transition-[transform,border-color,box-shadow,background-color] duration-300 hover:scale-[1.015] hover:border-primary/60 hover:bg-[hsl(42_38%_88%_/_0.95)] hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.4),0_0_20px_hsl(var(--primary)/0.35)]"
                            >
                              "{line}"
                            </li>
                          ))}
                        </ul>
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
};

export default TeenToolkit;
