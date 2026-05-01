import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const teenRealityData = [
  {
    title: "95%",
    summary: "Over 95% of young people aged 15-29 in India who own a mobile phone now use a smartphone...",
    content:
      "Over 95% of young people aged 15-29 in India who own a mobile phone now use a smartphone, giving widespread access to the internet and social media.",
  },
  {
    title: "23%",
    summary: "Studies estimate that around 23% of Indian school children may experience mental health challenges...",
    content:
      "Studies estimate that around 23% of Indian school children may experience mental health challenges, including anxiety, behavioural issues, or emotional distress.",
  },
  {
    title: "Economic Survey",
    summary: "The Economic Survey of India (2025-26) has flagged digital addiction...",
    content:
      "The Economic Survey of India (2025-26) has flagged digital addiction and excessive screen use as a growing concern affecting youth productivity and mental health.",
  },
  {
    title: "1 in 10",
    summary: "Global research suggests more than 1 in 10 adolescents show problematic social-media behaviour...",
    content:
      "Global research suggests more than 1 in 10 adolescents show problematic social-media behaviour, struggling to control their usage.",
  },
  {
    title: "1/3",
    summary: "Across many countries, over one-third of young people report experiencing cyberbullying online...",
    content:
      "Across many countries, over one-third of young people report experiencing cyberbullying online, highlighting growing safety concerns in digital spaces.",
  },
  {
    title: "United Nations",
    summary: "Studies by organisations such as UNICEF, WHO, and child-development researchers warn about rising screen dependency...",
    content:
      "Studies by organisations such as UNICEF, WHO, and child-development researchers increasingly warn about rising screen dependency, sleep disruption, and mental-health pressures among adolescents.",
  },
  {
    title: "Social-Media Bans",
    summary: "Governments are beginning to respond. Countries such as Australia have introduced social-media bans...",
    content:
      "Governments are beginning to respond. Countries such as Australia have introduced social-media bans for children under 16, while nations including France, Indonesia, Spain, and others are considering similar restrictions to protect young users.",
  },
  {
    title: "Karnataka, India",
    summary: "Even in India, Karnataka has proposed restricting social-media access for children under 16...",
    content:
      "Even in India, Karnataka has proposed restricting social-media access for children under 16, reflecting growing concern about digital addiction and online risks among youth.",
  },
];

export default function TeenRealityCards() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6 mb-8">
      {teenRealityData.map((item, idx) => (
        <motion.div
          key={item.title}
          layout
          initial={{ borderRadius: 16 }}
          transition={{ type: "spring", stiffness: 280, damping: 28, mass: 0.9 }}
          className={`relative bg-white border border-border rounded-xl shadow-md p-5 cursor-pointer will-change-transform ${openIndex === idx ? "ring-2 ring-primary/40" : "hover:shadow-lg"}`}
          onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          onMouseEnter={() => setOpenIndex(idx)}
          onMouseLeave={() => setOpenIndex(null)}
        >
          <div className="font-display font-bold text-primary text-lg mb-2">{item.title}</div>

          <div className="overflow-hidden">
            <motion.div
              initial={false}
              animate={openIndex === idx ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
              transition={{ height: { type: "spring", stiffness: 260, damping: 30 }, opacity: { duration: 0.18 } }}
              className="overflow-hidden"
            >
              <div className="text-muted-foreground text-base pt-1 pb-1">{item.content}</div>
            </motion.div>

            <motion.div
              initial={false}
              animate={openIndex === idx ? { opacity: 0, y: -6 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className="text-muted-foreground text-base"
            >
              {item.summary}
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
