import { useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LetterSwapForward } from "@/components/ui/letter-swap";
import HolographicCard from "@/components/ui/holographic-card";
import { ClipPathInfoCard } from "@/components/ui/clip-path-links";

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
  <>
    Why do small things affect me <br />
    so much?
  </>,
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

const teenStruggles1315 = [
  {
    title: "1. Feeling Behind Everyone Else",
    whatItFeelsLike:
      "You constantly compare your life, achievements, appearance, friendships, or success to other people. Social media makes it seem like everyone else already has life figured out while you are still trying to keep up.",
    identify: [
      "You compare your progress to others daily.",
      "Other people's success makes you feel worse about yourself.",
      "You feel like you are already late in life.",
      "You constantly think you are not doing enough.",
    ],
    redFlag: "You measure your worth based on how your life looks compared to everyone else.",
    greenFlag: "You focus on your own growth and understand that everyone moves at a different pace.",
  },
  {
    title: "2. Overthinking Everything",
    whatItFeelsLike:
      "Your mind keeps replaying conversations, mistakes, awkward moments, and what-if scenarios until small situations start feeling huge.",
    identify: [
      "You replay conversations repeatedly.",
      "Small mistakes stay in your mind for days.",
      "Your thoughts race constantly.",
      "Relaxing feels difficult because your brain never fully switches off.",
    ],
    redFlag: "You allow overthinking to destroy your confidence, mood, or peace.",
    greenFlag: "You reflect on situations, learn from them, and move forward without staying stuck mentally.",
  },
  {
    title: "3. Living Through Your Phone",
    whatItFeelsLike:
      "You automatically open apps whenever you are bored, stressed, lonely, or uncomfortable. Hours disappear scrolling, but you rarely feel happier afterward.",
    identify: [
      "You reach for your phone without thinking.",
      "Scrolling makes you lose track of time.",
      "Being offline feels uncomfortable.",
      "Your mood depends heavily on notifications or social media.",
    ],
    redFlag: "You use your phone as an escape from real emotions, responsibilities, or life.",
    greenFlag: "You enjoy social media while still being present in real life and knowing when to disconnect.",
  },
  {
    title: "4. Trying Too Hard To Fit In",
    whatItFeelsLike:
      "You hide parts of yourself to avoid judgment, rejection, or exclusion. You change your personality depending on who you are around.",
    identify: [
      "You act differently around different people.",
      "You hide opinions or interests.",
      "You fear being judged for being yourself.",
      "Being accepted feels more important than being authentic.",
    ],
    redFlag: "You lose your real identity trying to please everyone around you.",
    greenFlag: "You feel comfortable being yourself even if not everyone understands or agrees with you.",
  },
  {
    title: "5. Feeling Too Much At Once",
    whatItFeelsLike:
      "Your emotions become so overwhelming that even small problems feel impossible to handle.",
    identify: [
      "Small situations feel emotionally huge.",
      "Your mood changes quickly.",
      "You feel mentally exhausted often.",
      "Stress builds up faster than you can process it.",
    ],
    redFlag: "You ignore your emotions until everything explodes at once.",
    greenFlag: "You allow yourself to feel emotions while learning healthy ways to calm, process, and express them.",
  },
  {
    title: "6. Friendship Stress",
    whatItFeelsLike:
      "Replies, group chats, attention, and social situations affect your mood more than they should.",
    identify: [
      "Delayed replies upset you deeply.",
      "You overanalyze friendships constantly.",
      "Feeling left out ruins your mood.",
      "Your self-worth depends on being included.",
    ],
    redFlag: "Your happiness completely depends on other people's attention or validation.",
    greenFlag: "You value friendships without letting every small social situation control your emotions.",
  },
  {
    title: "7. Not Feeling Good Enough",
    whatItFeelsLike:
      "No matter what you achieve, you still focus more on your flaws, mistakes, or what you lack.",
    identify: [
      "Compliments feel hard to believe.",
      "You focus mostly on your weaknesses.",
      "You constantly feel the need to prove yourself.",
      "Perfection feels like the only way to feel worthy.",
    ],
    redFlag: "You believe your value depends on being perfect, successful, attractive, or talented.",
    greenFlag: "You recognize your strengths and allow yourself to grow without expecting perfection.",
  },
  {
    title: "8. Caring Too Much About What People Think",
    whatItFeelsLike:
      "Fear of judgment controls your choices, confidence, appearance, or personality.",
    identify: [
      "Your decisions depend heavily on others' opinions.",
      "Criticism affects you deeply.",
      "You avoid situations because of embarrassment.",
      "You constantly worry about how people see you.",
    ],
    redFlag: "You stop living authentically because you are afraid of being judged.",
    greenFlag: "You care about feedback without letting it completely define who you are.",
  },
  {
    title: "9. Pressure To Have Life Figured Out",
    whatItFeelsLike:
      "You feel pressure to know your future, career, purpose, and success plan far earlier than anyone realistically can.",
    identify: [
      "Thinking about the future makes you anxious.",
      "You feel pressure to succeed quickly.",
      "You constantly fear falling behind.",
      "You believe you should already have everything planned.",
    ],
    redFlag: "You think not having all the answers means you are failing.",
    greenFlag: "You understand that growth takes time and life is something people figure out gradually.",
  },
  {
    title: "10. Avoiding Things Until They Become Bigger",
    whatItFeelsLike:
      "You avoid responsibilities, difficult conversations, or stressful tasks until the pressure becomes overwhelming.",
    identify: [
      "You delay important tasks repeatedly.",
      "Starting feels harder than doing the task itself.",
      "You feel guilty for procrastinating.",
      "Problems grow because they stay unaddressed.",
    ],
    redFlag: "Avoidance creates even more stress, pressure, and anxiety over time.",
    greenFlag: "You deal with problems early instead of letting fear or procrastination control you.",
  },
  {
    title: "11. Feeling Alone Even Around People",
    whatItFeelsLike:
      "You feel emotionally disconnected even when surrounded by friends, classmates, family, or online interactions.",
    identify: [
      "You struggle feeling truly understood.",
      "You feel lonely even while socializing.",
      "Conversations feel surface-level.",
      "You hide how you actually feel.",
    ],
    redFlag: "You keep pretending everything is fine while feeling emotionally isolated.",
    greenFlag: "You build honest relationships where you feel safe being yourself emotionally.",
  },
  {
    title: "12. Not Feeling Like Yourself Lately",
    whatItFeelsLike:
      "You feel emotionally different, mentally exhausted, disconnected, or unlike the version of yourself you used to recognize.",
    identify: [
      "Things that once mattered feel exhausting.",
      "You feel emotionally numb or mentally drained.",
      "You feel off more often than present.",
      "You struggle explaining what is wrong.",
    ],
    redFlag: "You ignore emotional exhaustion and pretend everything is completely fine.",
    greenFlag: "You notice changes in yourself and give yourself permission to slow down, reflect, and ask for support when needed.",
  },
] as const;

const quickTruths = [
  "You don't become who you want to be by accident.",
  "Every repeated action is training your future self.",
  "Confidence is not loudness. It grows when you keep promises to yourself.",
  "Wanting to be liked can quietly make you lose yourself.",
  "Your screen habits are also shaping your identity.",
  "You don't need to be perfect. You need to become more aware and intentional.",
  "Feelings are real, but they are not always wise leaders.",
];

  const arrangedQuickTruths = quickTruths;

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

const relatableQuestions1618 = [
  "Why do I know better but still repeat the same patterns?",
  "Why do I feel behind even when I'm trying?",
  "Why does distraction keep winning?",
  "Why do I care so much what people think?",
  "Why do I feel emotionally messy and mentally tired?",
  "Why do I feel pressure without clarity?",
 "Why do I feel distant from my parents?",
];

const selfCheckPrompts1618: SelfCheckPrompt[] = [
  { label: "I feel in control of my habits", tags: ["Consistency", "Self-Control"], reverse: true },
  { label: "I often compare my life to others", tags: ["Confidence", "Validation"] },
  { label: "I know what kind of person I want to become", tags: ["Identity", "Direction"], reverse: true },
  { label: "My emotions affect my focus and decisions", tags: ["Emotional Stability", "Clarity"] },
  { label: "I struggle to stay consistent", tags: ["Consistency", "Self-Control"] },
  { label: "I seek validation more than I want to", tags: ["Confidence", "Validation"] },
  { label: "I feel grounded in my values", tags: ["Boundaries", "Self-Respect"], reverse: true },
  { label: "I use my phone intentionally", tags: ["Focus", "Digital Balance"], reverse: true },
  { label: "I can say no when something is not right for me", tags: ["Boundaries", "Self-Respect"], reverse: true },
  { label: "I feel clear about my direction", tags: ["Identity", "Direction"], reverse: true },
];

const resultProfiles1618 = [
  {
    title: "Consistency + Self-Control",
    tags: ["Consistency", "Self-Control"],
    summary: "You may need stronger routines and follow-through to match your intentions.",
  },
  {
    title: "Confidence + Validation",
    tags: ["Confidence", "Validation"],
    summary: "External opinions may be shaping your confidence more than you want.",
  },
  {
    title: "Emotional Stability + Clarity",
    tags: ["Emotional Stability", "Clarity"],
    summary: "Emotional noise may be affecting your focus, choices, and consistency.",
  },
  {
    title: "Focus + Digital Balance",
    tags: ["Focus", "Digital Balance"],
    summary: "Your attention may be getting split, making clarity and progress harder.",
  },
  {
    title: "Boundaries + Self-Respect",
    tags: ["Boundaries", "Self-Respect"],
    summary: "You may be learning how to protect your standards and energy more clearly.",
  },
  {
    title: "Identity + Direction",
    tags: ["Identity", "Direction"],
    summary: "You may need more structure to align your choices with who you want to become.",
  },
] as const;

const shapingTiles1618 = [
  {
    title: "Attention",
    summary: "Where your mind goes, your life often follows.",
    redFlag: "You are mentally scattered most of the time.",
    growthSign: "You can direct your focus on purpose.",
  },
  {
    title: "Habits",
    summary: "Your routine reveals your real direction more than your intentions do.",
    redFlag: "You keep repeating what weakens your future.",
    growthSign: "You are building actions you can respect.",
  },
  {
    title: "Self-Respect",
    summary: "The way you treat yourself sets the tone for your whole life.",
    redFlag: "You betray your own standards too often.",
    growthSign: "You begin living in a way you trust.",
  },
  {
    title: "Emotional Regulation",
    summary: "Emotions are part of life - but they should not drive every choice.",
    redFlag: "You act from impulse, overwhelm, or emotional confusion.",
    growthSign: "You can pause and choose more wisely.",
  },
  {
    title: "Relationships",
    summary: "Who you allow close to you shapes your peace, choices, and identity.",
    redFlag: "You get pulled by attention, attachment, or unhealthy dynamics.",
    growthSign: "You choose connection without losing yourself.",
  },
  {
    title: "Screen / Digital Influence",
    summary: "Your digital life is not neutral. It affects desire, comparison, attention, and self-worth.",
    redFlag: "You feel more drained, distracted, or insecure after scrolling.",
    growthSign: "You are using tech without letting it shape you blindly.",
  },
  {
    title: "Values",
    summary: "Your values are your internal direction when external noise gets loud.",
    redFlag: "You keep acting against what you know is right.",
    growthSign: "You begin choosing based on principle, not pressure.",
  },
  {
    title: "Direction",
    summary: "You do not need your whole life figured out. But drifting without reflection has a cost.",
    redFlag: "You keep reacting to life instead of shaping it.",
    growthSign: "You are becoming more intentional.",
  },
];

const challengeCards1618 = [
  ["Validation-Seeking", "You know you shouldn't depend on attention, but part of you still does."],
  ["Comparison", "You measure your real life against edited lives, and it quietly affects your confidence."],
  ["Distraction", "You want focus, but your attention keeps getting hijacked."],
  ["Low Self-Trust", "You keep saying you'll do better - and then don't."],
  ["Emotional Highs & Lows", "Your emotions may be shaping your day more than you realise."],
  ["Body Image / Appearance Pressure", "You may feel pressure to look a certain way, be attractive, or feel enough."],
  ["Attraction / Attachment / Relationship Confusion", "Feelings and emotional entanglement can deeply affect clarity, discipline, and peace."],
  ["Friendship / Belonging Issues", "Feeling unseen, left out, used, or emotionally drained by people around you."],
  ["Identity Drift", "You are not sure who you are becoming - or whether you even like the direction."],
  ["Substance / Party / Risk Exposure", "Exposure, pressure, or image can still pull at you, even if you don't want it."],
  ["Pressure About the Future", "Marks, career, success, and expectations can feel heavy while you're still figuring yourself out."],
  ["Hidden Patterns", "Doom scrolling, avoidance, shutting down, self-sabotage, or other habits you don't feel proud of."],
] as const;

const quickTruths1618 = [
  "Identity is not found once. It is built daily.",
  "Confidence is not a vibe. It is built through self-respect and follow-through.",
  "What you repeatedly tolerate also shapes who you become.",
  "Attention is one of the most powerful forces in your life.",
  "Attraction is real. But not every feeling deserves control over your choices.",
  "Validation can feel good while quietly weakening your center.",
  "Discipline is not punishment. It is protection.",
  "You do not need to be perfect. You do need to become more honest and more intentional.",
];

const microActions1618 = [
  {
    title: "If you feel mentally scattered",
    steps: ["Put your phone away", "Sit with one task for 15 minutes", "Finish before switching"],
  },
  {
    title: "If you feel emotionally messy",
    steps: ["What am I actually feeling?", "What triggered this?", "What is the strongest response available right now?"],
  },
  {
    title: "If you feel pulled by attention / attraction / confusion",
    steps: ["Is this helping me grow or weakening my center?", "Am I thinking clearly or just reacting emotionally?"],
  },
  {
    title: "If you feel behind",
    steps: ["Stop comparing", "Pick one meaningful action", "Build from today, not from panic"],
  },
  {
    title: "If you feel low in self-respect",
    steps: ["Keep one promise to yourself today", "Small integrity rebuilds identity"],
  },
];

const parentScripts1618 = [
  "I think I need more structure and support. Can we look at this together?",
  "This seems practical and not just motivational. Can we go through it?",
  "I want to work on myself more seriously. Can we consider this?",
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

const getHumanResult1618 = (responses: Record<string, number>): TestResult | null => {
  const answeredCount = selfCheckPrompts1618.filter((prompt) => responses[prompt.label] !== undefined).length;
  if (answeredCount < selfCheckPrompts1618.length) {
    return null;
  }

  const tagCount = new Map<string, number>();
  const tagWeights = new Map<string, number>();

  selfCheckPrompts1618.forEach((prompt) => {
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

  const scoredResults = resultProfiles1618
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
      primary: "Identity + Direction",
      secondary: null,
      summary: "Your answers suggest mixed patterns. Keep exploring your responses for clearer signals.",
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
  const [expandedStruggle1315, setExpandedStruggle1315] = useState<string | null>(null);
  const [selectedChecks, setSelectedChecks] = useState<Record<string, number>>({});
  const [selectedChecks1618, setSelectedChecks1618] = useState<Record<string, number>>({});
  const [isChallengeGridHovered, setIsChallengeGridHovered] = useState(false);
  const [isChallengeGridHovered1618, setIsChallengeGridHovered1618] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState(1);
  const selectedSectionRef = useRef<HTMLElement | null>(null);

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
      description: "Early teen years - discovering who you are and finding your voice.",
    },
    {
      id: "16-18",
       label: "16-18 years",
      description: "Late teen years - deepening self-understanding and planning your future.",
    },
  ];
 
  const arrangedRelatableQuestions = [
    relatableQuestions[0],
    relatableQuestions[1],
    relatableQuestions[2],
    relatableQuestions[5],
    relatableQuestions[4],
    relatableQuestions[3],
  ];
 
   const arrangedRelatableQuestions1618 = relatableQuestions1618;

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
  const humanResult1618 = getHumanResult1618(selectedChecks1618);

  const updateCheckResponse = (label: string, value: number) => {
    setSelectedChecks((prev) => ({ ...prev, [label]: value }));
  };

  const updateCheckResponse1618 = (label: string, value: number) => {
    setSelectedChecks1618((prev) => ({ ...prev, [label]: value }));
  };

  const getDirectionFromAge = (ageId: string) => (ageId === "13-15" ? -1 : 1);

  const selectAge = (ageId: string) => {
    setTransitionDirection(getDirectionFromAge(ageId));
    setSelectedAge(ageId);
  };

  const returnToAgeSelection = () => {
    if (selectedAge) {
      setTransitionDirection(-getDirectionFromAge(selectedAge));
    }
    setSelectedAge(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageTransition = {
    duration: 0.55,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  };

  useEffect(() => {
    if (selectedAge && selectedSectionRef.current) {
      selectedSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedAge]);

  return (
    <>
      <Navbar />
      <main className="pt-16 bg-background min-h-screen">
        <section className="footer-theme-legacy py-12 md:py-20 bg-card border-b border-border/50 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div className="max-w-3xl mx-auto text-center" variants={containerVariants} initial="hidden" animate="visible">
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-primary mb-4 md:mb-6"
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <LetterSwapForward label="Know Yourself" />
              </motion.h1>

              <motion.div className="space-y-4" variants={itemVariants}>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed whitespace-nowrap">
                  You can't grow well if you don't understand what's going on inside YOU.
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Your thoughts, habits, emotions, choices, friendships, screens, pressure, and patterns are all shaping who you are becoming.
                </p>
              </motion.div>
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
              <motion.div className="max-w-3xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
                <motion.h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-primary/85 mb-8 md:mb-12 text-center" variants={itemVariants}>
                  <LetterSwapForward label="Choose your age" />
                </motion.h2>

                <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6" variants={containerVariants}>
                  {ageCategories.map((category) => (
                    <motion.button
                      key={category.id}
                      variants={cardVariants}
                      whileHover="hover"
                      onMouseMove={handleCardMouseMove}
                      onMouseLeave={handleCardMouseLeave}
                      onClick={() => selectAge(category.id)}
                      className={`relative p-5 sm:p-8 rounded-xl border-2 transition-[transform,border-color,box-shadow,background-color] duration-300 text-left group overflow-hidden hover:border-border/60 hover:shadow-[0_0_0_1px_rgba(44,66,63,0.45),0_0_28px_rgba(44,66,63,0.5)] ${
                        selectedAge === category.id
                          ? "border-primary/60 bg-[hsl(42_38%_88%_/_0.8)]"
                          : "border-border hover:border-primary/40 bg-[hsl(42_38%_88%_/_0.7)] hover:bg-[hsl(42_38%_88%_/_0.82)]"
                      }`}
                      style={{
                        transformStyle: "preserve-3d",
                        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
                      }}
                    >
                      {selectedAge === category.id && <div className="absolute inset-0 opacity-20 blur-xl bg-primary pointer-events-none" />}
                      <div
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{
                          background:
                            "radial-gradient(circle at var(--bg-x, 50%) var(--bg-y, 50%), rgba(44,66,63,0.24), rgba(44,66,63,0.1) 35%, rgba(0, 0, 0, 0) 70%)",
                        }}
                      />

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-3xl md:text-4xl number-font font-bold text-primary tracking-tight">{category.label}</h3>
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

              <div className="max-w-5xl mx-auto rounded-lg md:rounded-2xl border border-border/60 bg-[hsl(42_38%_88%_/_0.7)] p-6 md:p-8">
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2 md:mb-3">Know Yourself (Age 13-15)</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-primary/85 mb-3 md:mb-4">
                  You are not just going through stuff. You are becoming a person.
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  What you repeat in your thoughts, habits, friendships, emotions, and screen life quietly shapes who you are becoming.
                </p>
              </div>

              <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(42_38%_88%_/_0.8)] p-5 sm:p-8">
                <h3 className="mb-5">
                  <LetterSwapForward
                    label="Quick relatable cards"
                    className="text-2xl font-display font-semibold text-primary/85"
                  />
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {arrangedRelatableQuestions.map((question, idx) => (
                    question === "__SPACER__" ? (
                      <div key={`spacer-1315-${idx}`} className="lg:block hidden" aria-hidden />
                    ) : (
                      <ClipPathInfoCard key={`rel-${idx}`} body={question} />
                    )
                  ))}
                </div>
                <p className="mt-5 text-foreground font-medium">Do you feel like <span className="text-primary">"This is literally me."</span> Take the small test below</p>
              </div>

              <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(42_38%_88%_/_0.8)] p-5 sm:p-8">
                <h3 className="mb-2">
                  <LetterSwapForward
                    label="What's affecting you most right now?"
                    className="text-2xl font-display font-semibold text-primary/85"
                  />
                </h3>
                <p className="text-muted-foreground mb-6">Mini identity check</p>
                <div className="grid md:grid-cols-2 gap-3">
                  {selfCheckPrompts.map((prompt) => {
                    const selectedValue = selectedChecks[prompt.label];
                    return (
                      <div
                        key={prompt.label}
                        onMouseMove={handleCardMouseMove}
                        onMouseLeave={handleCardMouseLeave}
                        className="group relative overflow-hidden rounded-lg border border-border/70 p-4 transition-[transform,border-color,box-shadow] duration-300 hover:border-border/60 hover:shadow-[0_0_0_1px_rgba(44,66,63,0.45),0_0_22px_rgba(44,66,63,0.42)]"
                        style={{
                          transformStyle: "preserve-3d",
                          transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
                        }}
                      >
                        <div
                          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          style={{
                            background:
                              "radial-gradient(circle at var(--bg-x, 50%) var(--bg-y, 50%), rgba(44,66,63,0.2), rgba(44,66,63,0.08) 35%, rgba(0, 0, 0, 0) 70%)",
                          }}
                        />
                        <div className="relative z-10">
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
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 rounded-xl border border-primary/30 bg-[hsl(42_38%_88%_/_0.85)] p-5">
                  {humanResult ? (
                    <>
                      <p className="text-sm text-muted-foreground mb-2">Right now, you may be dealing most with:</p>
                      <p className="text-xl font-display font-semibold text-primary">{humanResult.primary}</p>
                      {humanResult.secondary && <p className="mt-1 text-sm text-muted-foreground">Also showing up: {humanResult.secondary}</p>}
                      <p className="mt-3 text-sm text-muted-foreground">{humanResult.summary}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-primary/80 mb-2">Answer all 8 questions to see your result.</p>
                      <p className="text-base text-foreground/80">Your result will be based on the pattern of your responses, not just one answer.</p>
                    </>
                  )}
                </div>
              </div>

              <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(42_38%_88%_/_0.8)] p-5 sm:p-8 space-y-6">
                <h3 className="text-2xl font-display font-semibold text-primary/85">
                  12 Teen Struggles Almost Everyone Faces
                </h3>

                <div className="grid md:grid-cols-2 gap-4 pt-2">
                  {teenStruggles1315.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.35, delay: index * 0.02 }}
                      className="h-full"
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {expandedStruggle1315 === item.title ? (
                          <motion.article
                            key={`${item.title}-expanded`}
                            className="rounded-xl border border-border/60 bg-[hsl(42_38%_88%_/_0.85)] p-4 md:p-5 space-y-3 h-full"
                            initial={{ opacity: 0, y: 10, scale: 0.995 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.995 }}
                            transition={{ duration: 0.2 }}
                          >
                            <button
                              type="button"
                              onClick={() => setExpandedStruggle1315(null)}
                              className="mb-1 inline-flex self-start items-center gap-1 rounded-md border border-primary/35 px-2 py-1 text-xs font-semibold text-primary hover:bg-primary/10 transition-colors"
                            >
                              Back
                            </button>

                            <h4 className="text-lg md:text-xl font-display font-semibold text-primary">{item.title}</h4>

                            <div className="space-y-2">
                              <p className="text-sm md:text-base font-semibold text-foreground">What It Feels Like</p>
                              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{item.whatItFeelsLike}</p>
                            </div>

                            <div className="space-y-2">
                              <p className="text-sm md:text-base font-semibold text-foreground">How To Identify It</p>
                              <ul className="list-disc pl-5 space-y-1 text-sm md:text-base text-muted-foreground">
                                {item.identify.map((point) => (
                                  <li key={point}>{point}</li>
                                ))}
                              </ul>
                            </div>

                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                              <span className="font-semibold text-foreground">Red Flag:</span> {item.redFlag}
                            </p>
                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                              <span className="font-semibold text-foreground">Green Flag:</span> {item.greenFlag}
                            </p>
                          </motion.article>
                        ) : (
                          <motion.div
                            key={`${item.title}-collapsed`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="h-full"
                          >
                            <button
                              type="button"
                              onClick={() => setExpandedStruggle1315(item.title)}
                              className="block w-full h-full text-left"
                              aria-label={`Open details for ${item.title}`}
                            >
                              <ClipPathInfoCard
                                title={item.title}
                                body={item.whatItFeelsLike}
                                className="h-full rounded-xl bg-[hsl(42_38%_88%_/_0.85)] p-5"
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
              </div>


              <div className="cta-card max-w-5xl mx-auto rounded-2xl border border-primary/35 bg-[hsl(42_38%_88%_/_0.8)] p-5 sm:p-8">
                <h3 className="mb-3">
                  <LetterSwapForward
                    label="Quick understanding helps. But stronger growth needs more than one page."
                    className="w-full flex-wrap justify-start items-start leading-tight text-2xl font-display font-semibold text-primary/85"
                  />
                </h3>
                <p className="text-muted-foreground mb-5">
                  If you want to become more focused, confident, disciplined, emotionally steady, and more sure of yourself, you may need more than random tips.
                </p>
                <p className="text-sm font-semibold text-foreground mb-3">What Ikigai Teen offers:</p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                  <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(42_38%_88%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">understand yourself better</li>
                  <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(42_38%_88%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">build stronger habits</li>
                  <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(42_38%_88%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">handle emotions better</li>
                  <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(42_38%_88%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">improve confidence and discipline</li>
                  <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(42_38%_88%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">become more grounded and responsible</li>
                </ul>
              </div>

              <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(42_38%_88%_/_0.8)] p-5 sm:p-8">
                <h3 className="mb-4">
                  <LetterSwapForward
                    label="How to ask at home"
                    className="text-2xl font-display font-semibold text-primary/85"
                  />
                </h3>
                <p className="text-muted-foreground mb-4">Want to explore this with your parent? You can say:</p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {parentScripts.map((line) => (
                    <li
                      key={line}
                      className="rounded-lg border border-border/60 p-3 transition-[transform,border-color,box-shadow,background-color] duration-300 hover:scale-[1.015] hover:border-primary/60 hover:bg-[hsl(42_38%_88%_/_0.95)] hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.4),0_0_20px_hsl(var(--primary)/0.35)]"
                    >
                      "{line}"
                    </li>
                  ))}
                </ul>
              </div>

              <div className="cta-card max-w-5xl mx-auto rounded-2xl border border-primary/35 bg-[hsl(42_38%_88%_/_0.8)] p-5 sm:p-8">
                <h3 className="mb-3">
                  <LetterSwapForward
                    label="Understanding yourself is the beginning. Building yourself is the next step."
                    className="w-full flex-wrap justify-start items-start leading-tight text-2xl font-display font-semibold text-primary/85"
                  />
                </h3>
                <p className="text-muted-foreground mb-5">
                  If this page made you realise something about yourself, don't stop there.
                </p>
                <p className="text-sm font-semibold text-foreground mb-3">Next Step Options</p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/teenzone/teen-toolkit?age=13-15"
                    className="cta-button"
                  >
                    Go to Teen Toolkit
                  </Link>
                </div>
              </div>
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
            <div className="container mx-auto px-4 sm:px-6 space-y-16">
              <div className="max-w-5xl mx-auto">
                <button
                  type="button"
                  onClick={returnToAgeSelection}
                  className="inline-flex items-center rounded-md bg-primary/15 px-2 py-0.5 text-xs md:text-sm font-semibold text-primary hover:bg-primary/20 transition-colors"
                >
                  Choose a different age
                </button>
              </div>

              <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(42_38%_88%_/_0.7)] p-5 sm:p-8">
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">Know Yourself (Age 16-18)</p>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-primary/85 mb-4">
                  You are not just managing school, screens, and stress. You are shaping your identity.
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  The way you handle attention, emotions, attraction, friendships, self-respect, pressure, choices, and habits is shaping who you are becoming.
                </p>
              </div>

              <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(42_38%_88%_/_0.8)] p-5 sm:p-8">
                <h3 className="mb-5">
                  <LetterSwapForward label="Quick relatable cards" className="text-2xl font-display font-semibold text-primary/85" />
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                   {arrangedRelatableQuestions1618.map((question, idx) => (
                     question === "__SPACER__" ? (
                       <div key={`spacer-1618-${idx}`} className="lg:block hidden" aria-hidden />
                     ) : (
                       <ClipPathInfoCard key={`rel-1618-${idx}`} body={question} />
                     )
                  ))}
                </div>
                <p className="mt-5 text-foreground font-medium">Do you feel like <span className="text-primary">"This site actually gets it."</span> Take the small test below</p>
              </div>

              <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(42_38%_88%_/_0.8)] p-5 sm:p-8">
                <h3 className="mb-2">
                  <LetterSwapForward
                    label="What's Quietly Affecting You Most Right Now?"
                    className="text-2xl font-display font-semibold text-primary/85"
                  />
                </h3>
                <p className="text-muted-foreground mb-6">Mini Identity + Challenge Check</p>
                <div className="grid md:grid-cols-2 gap-3">
                  {selfCheckPrompts1618.map((prompt) => {
                    const selectedValue = selectedChecks1618[prompt.label];
                    return (
                      <div
                        key={prompt.label}
                        onMouseMove={handleCardMouseMove}
                        onMouseLeave={handleCardMouseLeave}
                        className="group relative overflow-hidden rounded-lg border border-border/70 p-4 transition-[transform,border-color,box-shadow] duration-300 hover:border-border/60 hover:shadow-[0_0_0_1px_rgba(44,66,63,0.45),0_0_22px_rgba(44,66,63,0.42)]"
                        style={{
                          transformStyle: "preserve-3d",
                          transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
                        }}
                      >
                        <div
                          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          style={{
                            background:
                              "radial-gradient(circle at var(--bg-x, 50%) var(--bg-y, 50%), rgba(44,66,63,0.2), rgba(44,66,63,0.08) 35%, rgba(0, 0, 0, 0) 70%)",
                          }}
                        />
                        <div className="relative z-10">
                          <p className="text-sm text-foreground mb-3">{prompt.label}</p>
                          <div className="flex flex-wrap gap-2">
                            {responseScale.map((option) => {
                              const isActive = selectedValue === option.value;
                              return (
                                <button
                                  type="button"
                                  key={option.label}
                                  onClick={() => updateCheckResponse1618(prompt.label, option.value)}
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
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 rounded-xl border border-primary/30 bg-[hsl(42_38%_88%_/_0.85)] p-5">
                  {humanResult1618 ? (
                    <>
                      <p className="text-sm text-muted-foreground mb-2">Right now, your biggest growth areas may be:</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-primary font-semibold">
                        <li>{humanResult1618.primary}</li>
                        {humanResult1618.secondary && <li>{humanResult1618.secondary}</li>}
                      </ul>
                      <p className="mt-3 text-sm text-muted-foreground">{humanResult1618.summary}</p>
                      <p className="mt-3 text-sm text-muted-foreground">
                        This is not your final identity. It is simply a reflection of what may need strengthening right now.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <button type="button" className="cta-button">Help Me Understand This Better</button>
                        <button type="button" className="px-4 py-2 rounded-md border border-primary/40 text-primary text-sm font-medium">Show Me Tools That Can Help</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-primary/80 mb-2">Answer all 10 prompts to view your growth result.</p>
                      <p className="text-base text-foreground/80">This reflection helps you notice patterns that may need strengthening right now.</p>
                    </>
                  )}
                </div>
              </div>

              <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(42_38%_88%_/_0.8)] p-5 sm:p-8">
                <h3 className="mb-5">
                  <LetterSwapForward
                    label="The 8 Forces Quietly Building the Person You're Becoming"
                    className="text-2xl font-display font-semibold text-primary/85"
                  />
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {shapingTiles1618.map((tile) => (
                    <HolographicCard
                      key={tile.title}
                      title={tile.title}
                      summary={tile.summary}
                      redFlag={tile.redFlag}
                      growthSign={tile.growthSign}
                    />
                  ))}
                </div>
              </div>

              <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(42_38%_88%_/_0.8)] p-5 sm:p-8">
                <h3 className="mb-5">
                  <LetterSwapForward
                    label="What May Be Getting in Your Way"
                    className="text-2xl font-display font-semibold text-primary/85"
                  />
                </h3>
                <p className="text-muted-foreground mb-5">Real things many teens this age quietly struggle with</p>
                <div
                  onMouseEnter={() => setIsChallengeGridHovered1618(true)}
                  onMouseLeave={() => setIsChallengeGridHovered1618(false)}
                  className={`grid md:grid-cols-2 lg:grid-cols-3 transition-[gap] duration-300 ${
                    isChallengeGridHovered1618 ? "gap-2" : "gap-4"
                  }`}
                >
                  {challengeCards1618.map(([title, body]) => (
                    <ClipPathInfoCard
                      key={title}
                      title={title}
                      body={body}
                      className={`transition-transform duration-300 ${isChallengeGridHovered1618 ? "scale-[1.01]" : "scale-100"}`}
                    />
                  ))}
                </div>
              </div>


              <div className="cta-card max-w-5xl mx-auto rounded-2xl border border-primary/35 bg-[hsl(42_38%_88%_/_0.8)] p-5 sm:p-8">
                <h3 className="mb-3">
                  <LetterSwapForward
                    label="You don't need more random content. You need a stronger inner system."
                    className="w-full flex-wrap justify-start items-start leading-tight text-2xl font-display font-semibold text-primary/85"
                  />
                </h3>
                <p className="text-muted-foreground mb-5">
                  If you are serious about becoming focused, emotionally steady, disciplined, self-respecting, and clear about who you are becoming, growth needs structure.
                </p>
                <p className="text-sm font-semibold text-foreground mb-3">What Ikigai Teen offers:</p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                  <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(42_38%_88%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">understand your patterns</li>
                  <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(42_38%_88%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">improve self-control</li>
                  <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(42_38%_88%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">reduce distraction</li>
                  <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(42_38%_88%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">build confidence and consistency</li>
                  <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(42_38%_88%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">strengthen emotional steadiness</li>
                  <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(42_38%_88%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">move toward purpose and direction</li>
                </ul>
              </div>

              <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(42_38%_88%_/_0.8)] p-5 sm:p-8">
                <h3 className="mb-4">
                  <LetterSwapForward
                    label="If you want to explore this with your parent"
                    className="w-full flex-wrap justify-start items-start leading-tight text-2xl font-display font-semibold text-primary/85"
                  />
                </h3>
                <p className="text-muted-foreground mb-4">You can say:</p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {parentScripts1618.map((line) => (
                    <li
                      key={line}
                      className="rounded-lg border border-border/60 p-3 transition-[transform,border-color,box-shadow,background-color] duration-300 hover:scale-[1.015] hover:border-primary/60 hover:bg-[hsl(42_38%_88%_/_0.95)] hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.4),0_0_20px_hsl(var(--primary)/0.35)]"
                    >
                      "{line}"
                    </li>
                  ))}
                </ul>
              </div>

              <div className="cta-card max-w-5xl mx-auto rounded-2xl border border-primary/35 bg-[hsl(42_38%_88%_/_0.8)] p-5 sm:p-8">
                <h3 className="mb-3">
                  <LetterSwapForward
                    label="Understanding yourself is the beginning. Building yourself is the next step."
                    className="w-full flex-wrap justify-start items-start leading-tight text-2xl font-display font-semibold text-primary/85"
                  />
                </h3>
                <p className="text-muted-foreground mb-5">
                  If this page made you realise something about yourself, don't stop there.
                </p>
                <p className="text-sm font-semibold text-foreground mb-3">Next Step Options</p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/teenzone/teen-toolkit?age=16-18"
                    className="cta-button"
                  >
                    Go to Teen Toolkit
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>
        )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
};

export default KnowYourself;

