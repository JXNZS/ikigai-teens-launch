import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const teenRealityData = [
  {
    title: "83% - 95%",
    summary: "While 83% of Indian children (10-16) use smartphones, 95% of young adults own one...",
    content:
      "While 83% of Indian children in the 10-16 age group use smartphones, 95% of young adults upto 29 yrs own a smartphone. Early usage has been reported in infants as young as 6 months, with usage patterns increasing significantly by age two. (NCRB)",
  },
  {
    title: "76% Social Media usage",
    summary: "Majority of children (14-16) use phones for social media (76%) rather than education (57%)...",
    content:
      "The majority of children aged 14-16 use phones for social media (76%) rather than education (57%). This reflects the impressions left on growing minds as they shape into young adult phase (NCRB)",
  },
  {
    title: "86% anxiety",
    summary: "Studies in Chandigarh indicate severe mental health burdens among students...",
    content:
      "Studies in Chandigarh indicate severe mental health burdens, with 59.2% prevalence of depression, 86.5% anxiety, and 52.7% stress among university students. Among 13- 34 year olds up to 78.86% of young females reported depressive tendencies and 65–86% showed depression, anxiety, stress (DAS) – (NIH)",
  },
  {
    title: "Crime in India (2024)",
    summary: "NCRB reports a 17.9% surge in cybercrimes, with 77.7% of juvenile offenders aged 16-18...",
    content:
      "The NCRB \"Crime in India 2024\" report (released May 2026) highlights a 17.9% surge in cybercrimes, with 77.7% of juvenile offenders falling in the 16-18 age bracket, indicating increased exposure to digital devices at that age",
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
          className={`relative bg-[#FCEADE] border border-border rounded-xl shadow-md p-5 cursor-pointer will-change-transform ${openIndex === idx ? "ring-2 ring-primary/40" : "hover:shadow-lg"}`}
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
