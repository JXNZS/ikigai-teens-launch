import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LetterSwapForward } from "@/components/ui/letter-swap";

type FAQPoint = {
  title: string;
  description: string;
};

type FAQItem = {
  question: string;
  intro?: string[];
  points: FAQPoint[];
  closing?: string[];
};

const renderNumberText = (text: string): ReactNode => {
  const numberPattern = /\d[\d,-]*/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(numberPattern)) {
    const matchIndex = match.index ?? 0;

    if (matchIndex > lastIndex) {
      nodes.push(text.slice(lastIndex, matchIndex));
    }

    nodes.push(
      <span key={`${text}-${matchIndex}-${match[0]}`} className="number-font">
        {match[0]}
      </span>,
    );
    lastIndex = matchIndex + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length === 1 ? nodes[0] : nodes;
};

const faqItems: FAQItem[] = [
  {
    question: "What Makes Ikigai Teen Different",
    points: [
      {
        title: "Focus on the Teen Mindset, Not Just Marks",
        description:
          "Schools build academic knowledge. Ikigai Teen develops self-awareness, decision-making, emotional strength, and character.",
      },
      {
        title: "Designed for the Digital Age",
        description:
          "We address the realities of smartphones, social media, distraction, and digital influence - helping teens become responsible digital citizens.",
      },
      {
        title: "Purpose Before Profession",
        description:
          "Instead of asking what career to choose, we help teens discover who they are and what truly matters to them.",
      },
      {
        title: "Rooted in Real Field Experience",
        description:
          "Ikigai Teen draws from 25 years of humanitarian work with over 107,000 children, not just classroom theory.",
      },
      {
        title: "Builds Inner Strength",
        description:
          "Confidence, discipline, resilience, and ethical thinking are intentionally cultivated through guided reflection and practice.",
      },
      {
        title: "Teens Are Active Participants",
        description:
          "Students are not passive listeners. They contribute ideas, lead initiatives, and co-create parts of the program.",
      },
      {
        title: "Parents and Educators Are Partners",
        description:
          "Healthy teen development requires a supportive ecosystem. Ikigai Teen includes parents and educators as allies.",
      },
      {
        title: "Values and Awareness at the Core",
        description:
          "The program integrates values, cultural grounding, and responsible freedom - essential anchors in a fast-changing world.",
      },
      {
        title: "Real-Life Skills for Real-Life Situations",
        description:
          "Communication, judgment, digital discipline, and decision-making are practiced through scenarios teens actually face.",
      },
      {
        title: "Preparing Ethical Future Leaders",
        description:
          "The goal is not only successful students, but thoughtful young adults who contribute positively to society.",
      },
    ],
  },
  {
    question: "Who Ikigai Teen Is For",
    points: [
      {
        title: "Teens aged 13-18",
        description: "Young people navigating the important transition from childhood to adulthood.",
      },
      {
        title: "Teens who want to understand themselves better",
        description: "Those curious about their strengths, values, identity, and purpose.",
      },
      {
        title: "Teens struggling with focus or digital distraction",
        description: "Students who feel overwhelmed by smartphones, social media, or screen habits.",
      },
      {
        title: "Teens who want to build confidence and clarity",
        description: "Young people who want to speak up, think independently, and make better choices.",
      },
      {
        title: "Teens preparing for the future",
        description: "Those beginning to think about goals, direction, leadership, and contribution.",
      },
      {
        title: "Parents who want guidance beyond academics",
        description: "Families who believe that character, awareness, and emotional strength matter as much as marks.",
      },
    ],
  },
  {
    question: "Who Ikigai Teen Is Not For",
    points: [
      {
        title: "Teens looking for shortcuts to academic success",
        description: "Ikigai Teen is not a tuition or exam coaching program.",
      },
      {
        title: "Teens unwilling to reflect or participate",
        description: "The program works best for those open to thinking, sharing, and trying new habits.",
      },
      {
        title: "Families expecting instant transformation",
        description: "Real growth takes commitment, patience, and practice.",
      },
      {
        title: "Those seeking only motivational talks",
        description: "Ikigai Teen focuses on structured mindset development and practical life skills.",
      },
      {
        title: "Anyone expecting discipline to be imposed externally",
        description:
          "The goal is to help teens develop inner discipline and self-leadership, not forced compliance.",
      },
    ],
    closing: ["Ikigai Teen works best when teenagers, parents, and mentors grow together."],
  },
  {
    question: "The Ikigai Teen Growth Framework",
    intro: [
      "Growing into a strong, responsible, and purposeful adult does not happen by accident. It requires guidance, reflection, and practice during the formative teen years.",
      "The Ikigai Teen program is built around a structured Growth Framework that helps teenagers develop the awareness, habits, and inner strength needed to navigate modern life with clarity and confidence.",
      "This framework focuses on six key areas of development that are essential for young people growing up in today's rapidly changing digital world.",
    ],
    points: [
      {
        title: "Self-Awareness and Identity",
        description:
          "Helping teens understand who they are - their strengths, values, interests, and personal identity.",
      },
      {
        title: "Emotional Strength and Resilience",
        description:
          "Developing the ability to recognise emotions, handle stress, and respond to challenges with maturity.",
      },
      {
        title: "Digital Discipline and Responsible Technology Use",
        description:
          "Learning how to use smartphones, social media, and technology wisely without losing focus or balance.",
      },
      {
        title: "Values, Character, and Ethical Thinking",
        description:
          "Building integrity, empathy, responsibility, and respect in personal and social life.",
      },
      {
        title: "Communication and Healthy Relationships",
        description:
          "Strengthening the ability to express thoughts clearly, listen respectfully, and build meaningful connections.",
      },
      {
        title: "Purpose, Direction, and Leadership",
        description:
          "Encouraging teens to explore their potential, discover purpose, and grow into responsible contributors to society.",
      },
    ],
  },
  {
    question: "What Changes Parents Often See in Their Teen",
    points: [
      {
        title: "Improved Focus and Attention",
        description: "Teens become more mindful of how they use their time and attention.",
      },
      {
        title: "Healthier Relationship with Smartphones",
        description: "They begin to use technology more consciously instead of being controlled by it.",
      },
      {
        title: "Greater Self-Confidence",
        description: "Teens start expressing their thoughts and ideas with clarity and courage.",
      },
      {
        title: "Better Communication at Home",
        description: "Conversations with parents become calmer, more respectful, and more open.",
      },
      {
        title: "Stronger Emotional Balance",
        description: "Teens learn to recognise and manage emotions instead of reacting impulsively.",
      },
      {
        title: "Clearer Sense of Direction",
        description: "They begin thinking seriously about their interests, strengths, and future path.",
      },
      {
        title: "Improved Responsibility",
        description: "Teens show greater ownership of their choices, habits, and commitments.",
      },
      {
        title: "Healthier Peer Influence",
        description: "They become more aware of peer pressure and make more thoughtful decisions.",
      },
      {
        title: "Positive Attitude Toward Learning",
        description: "Curiosity and intrinsic motivation gradually replace resistance and apathy.",
      },
      {
        title: "Growth in Character and Values",
        description: "Parents often notice increased empathy, maturity, and ethical thinking.",
      },
    ],
  },
];

const FAQSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const headingColor = useTransform(scrollYProgress, [0, 0.45], ["hsl(195 10% 70%)", "hsl(var(--foreground))"]);

  return (
    <section ref={ref} className="py-20 bg-card border-t border-b border-border/50">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-center mb-8">
            <motion.h2 style={{ color: headingColor }}>
              <LetterSwapForward
                label="Frequently Asked Questions"
                className="justify-center text-3xl md:text-4xl font-display font-bold text-current mb-3"
              />
            </motion.h2>
          </div>

          <div className="rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] p-4 md:p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={item.question}
                  value={`faq-${index}`}
                  className="border-border/60 group px-4 data-[state=open]:bg-[hsl(195_25%_15%)] data-[state=open]:rounded-xl transition-all duration-300"
                >
                  <AccordionTrigger className="text-left text-base md:text-lg font-display font-semibold text-foreground hover:text-[hsl(152_55%_38%)] hover:drop-shadow-[0_0_12px_hsl(152_55%_38%_/_0.45)] data-[state=open]:text-white hover:no-underline transition-all duration-300">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white font-body">
                    <div className="space-y-4 pt-1">
                      {item.intro?.map((paragraph) => (
                        <p key={paragraph} className="text-sm md:text-base leading-relaxed text-white/95">
                          {renderNumberText(paragraph)}
                        </p>
                      ))}

                      <ol className="space-y-3">
                        {item.points.map((point, pointIndex) => (
                          <li key={point.title} className="text-sm md:text-base leading-relaxed">
                            <span className="font-semibold text-white">
                              {pointIndex + 1}. {renderNumberText(point.title)}
                            </span>
                            <span className="text-white/90">: {renderNumberText(point.description)}</span>
                          </li>
                        ))}
                      </ol>

                      {item.closing?.map((paragraph) => (
                        <p key={paragraph} className="text-sm md:text-base leading-relaxed italic text-white">
                          {renderNumberText(paragraph)}
                        </p>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
