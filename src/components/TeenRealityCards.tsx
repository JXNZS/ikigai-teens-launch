import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const teenRealityDataEn = [
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

const teenRealityDataKn = [
  {
    title: "83% – 95% ಸ್ಮಾರ್ಟ್ಫೋನ್ ಬಳಕೆ",
    summary: "10–16 ವರ್ಷದ ಭಾರತೀಯ ಮಕ್ಕಳಲ್ಲಿ 83% ಮಂದಿ ಸ್ಮಾರ್ಟ್ಫೋನ್ ಬಳಸುತ್ತಿದ್ದಾರೆ. 29 ವರ್ಷ ವಯಸ್ಸಿನೊಳಗಿನ ಯುವಕರಲ್ಲಿ ಈ ಪ್ರಮಾಣ 95% ತಲುಪಿದೆ...",
    content:
      "10–16 ವರ್ಷದ ಭಾರತೀಯ ಮಕ್ಕಳಲ್ಲಿ 83% ಮಂದಿ ಸ್ಮಾರ್ಟ್ಫೋನ್ ಬಳಸುತ್ತಿದ್ದಾರೆ. 29 ವರ್ಷ ವಯಸ್ಸಿನೊಳಗಿನ ಯುವಕರಲ್ಲಿ ಈ ಪ್ರಮಾಣ 95% ತಲುಪಿದೆ. ಕೆಲವು ಅಧ್ಯಯನಗಳ ಪ್ರಕಾರ, ಸ್ಮಾರ್ಟ್ಫೋನ್ ಬಳಕೆ 6 ತಿಂಗಳ ಶಿಶುಗಳಲ್ಲಿಯೇ ಆರಂಭವಾಗುತ್ತಿದ್ದು, ಎರಡು ವರ್ಷದೊಳಗೆ ಅದು ಗಮನಾರ್ಹವಾಗಿ ಹೆಚ್ಚುತ್ತಿದೆ. (NCRB)",
  },
  {
    title: "76% ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮ ಬಳಕೆ",
    summary: "14–16 ವರ್ಷದ ತರುಣರಲ್ಲಿ, ಶಿಕ್ಷಣಕ್ಕಿಂತ ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮಗಳ ಬಳಕೆ ಹೆಚ್ಚಾಗಿದೆ...",
    content:
      "14–16 ವರ್ಷದ ತರುಣರಲ್ಲಿ, ಶಿಕ್ಷಣಕ್ಕಿಂತ ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮಗಳ ಬಳಕೆ ಹೆಚ್ಚಾಗಿದೆ. 76% ಮಂದಿ ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮಗಳಿಗಾಗಿ ಸ್ಮಾರ್ಟ್ಫೋನ್ ಬಳಸಿದರೆ, ಶಿಕ್ಷಣಕ್ಕಾಗಿ ಬಳಸುವವರು 57% ಮಾತ್ರ. (NCRB)",
  },
  {
    title: "86% ಆತಂಕದ ಲಕ್ಷಣಗಳು",
    summary: "ಚಂಡೀಗಢದಲ್ಲಿ ನಡೆದ ಅಧ್ಯಯನಗಳು ಯುವಕರಲ್ಲಿ ಮಾನಸಿಕ ಆರೋಗ್ಯದ ಗಂಭೀರ ಸವಾಲುಗಳನ್ನು ತೋರಿಸಿವೆ...",
    content:
      "ಚಂಡೀಗಢದಲ್ಲಿ ನಡೆದ ಅಧ್ಯಯನಗಳು ಯುವಕರಲ್ಲಿ ಮಾನಸಿಕ ಆರೋಗ್ಯದ ಗಂಭೀರ ಸವಾಲುಗಳನ್ನು ತೋರಿಸಿವೆ. ವಿಶ್ವವಿದ್ಯಾಲಯದ ವಿದ್ಯಾರ್ಥಿಗಳಲ್ಲಿ 59.2% ಖಿನ್ನತೆ, 86.5% ಆತಂಕ ಹಾಗೂ 52.7% ಒತ್ತಡ ಕಂಡುಬಂದಿದೆ. 13–34 ವರ್ಷದವರಲ್ಲಿ, ವಿಶೇಷವಾಗಿ ಯುವತಿಯರಲ್ಲಿ, ಖಿನ್ನತೆ, ಆತಂಕ ಮತ್ತು ಒತ್ತಡದ ಪ್ರಮಾಣ ಗಮನಾರ್ಹವಾಗಿದೆ. (NIH)",
  },
  {
    title: "ಭಾರತದಲ್ಲಿ ಸೈಬರ್ ಅಪರಾಧ (2024)",
    summary: "Crime in India 2024 ವರದಿಯ ಪ್ರಕಾರ, ಸೈಬರ್ ಅಪರಾಧಗಳು 17.9% ಹೆಚ್ಚಾಗಿವೆ...",
    content:
      "Crime in India 2024 ವರದಿಯ ಪ್ರಕಾರ, ಸೈಬರ್ ಅಪರಾಧಗಳು 17.9% ಹೆಚ್ಚಾಗಿವೆ. ಬಾಲ ಅಪರಾಧಿಗಳಲ್ಲಿ 77.7% ಮಂದಿ 16–18 ವರ್ಷದವರಾಗಿದ್ದು, ಈ ವಯಸ್ಸಿನಲ್ಲಿ ಡಿಜಿಟಲ್ ಪ್ರಪಂಚದ ಪ್ರಭಾವ ಮತ್ತು ಅಪಾಯಗಳು ಹೆಚ್ಚುತ್ತಿರುವುದನ್ನು ಇದು ಸೂಚಿಸುತ್ತದೆ. (NCRB)",
  },
  {
    title: "ಭಾರತದ ಆರ್ಥಿಕ ಸಮೀಕ್ಷೆ (2025–26)",
    summary: "ಭಾರತ ಸರ್ಕಾರದ ಆರ್ಥಿಕ ಸಮೀಕ್ಷೆಯು ಡಿಜಿಟಲ್ ವ್ಯಸನ ಮತ್ತು ಅತಿಯಾದ ಪರದೆ ಬಳಕೆಯು ಪರಿಣಾಮ ಬೀರುತ್ತಿದೆ...",
    content:
      "ಭಾರತ ಸರ್ಕಾರದ ಆರ್ಥಿಕ ಸಮೀಕ್ಷೆಯು ಡಿಜಿಟಲ್ ವ್ಯಸನ ಮತ್ತು ಅತಿಯಾದ ಪರದೆ ಬಳಕೆಯು ಯುವಕರ ಉತ್ಪಾದಕತೆ ಹಾಗೂ ಮಾನಸಿಕ ಆರೋಗ್ಯದ ಮೇಲೆ ಗಂಭೀರ ಪರಿಣಾಮ ಬೀರುತ್ತಿದೆ ಎಂದು ಎಚ್ಚರಿಸಿದೆ.",
  },
  {
    title: "ಪ್ರತಿ 10 ಮಂದಿಯಲ್ಲಿ ಒಬ್ಬರು",
    summary: "ಜಾಗತಿಕ ಅಧ್ಯಯನಗಳ ಪ್ರಕಾರ, ಪ್ರತಿ 10 ತರುಣರಲ್ಲಿ ಒಬ್ಬರು ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮ ಬಳಕೆಯನ್ನು ನಿಯಂತ್ರಿಸಲು ಕಷ್ಟಪಡುತ್ತಾರೆ...",
    content:
      "ಜಾಗತಿಕ ಅಧ್ಯಯನಗಳ ಪ್ರಕಾರ, ಪ್ರತಿ 10 ತರುಣರಲ್ಲಿ ಒಬ್ಬರು ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮ ಬಳಕೆಯನ್ನು ನಿಯಂತ್ರಿಸಲು ಕಷ್ಟಪಡುವ ಮಟ್ಟದ ಅವಲಂಬನೆಯನ್ನು ಹೊಂದಿದ್ದಾರೆ.",
  },
  {
    title: "ಪ್ರತಿ 3 ಮಂದಿಯಲ್ಲಿ ಒಬ್ಬರು",
    summary: "ಅನೇಕ ದೇಶಗಳಲ್ಲಿ ಮೂರರಲ್ಲಿ ಒಬ್ಬ ತರುಣ ಆನ್ಲೈನ್ ಕಿರುಕುಳ (Cyberbullying) ಅನುಭವಿಸಿದ್ದಾನೆ...",
    content:
      "ಅನೇಕ ದೇಶಗಳಲ್ಲಿ ಮೂರರಲ್ಲಿ ಒಬ್ಬ ತರುಣ ಆನ್ಲೈನ್ ಕಿರುಕುಳ (Cyberbullying) ಅನುಭವಿಸಿರುವುದಾಗಿ ವರದಿ ಮಾಡಿದ್ದಾನೆ. ಇದು ಡಿಜಿಟಲ್ ಸುರಕ್ಷತೆಯ ಬಗ್ಗೆ ಹೆಚ್ಚುತ್ತಿರುವ ಕಳವಳವನ್ನು ಸೂಚಿಸುತ್ತದೆ.",
  },
  {
    title: "ವಿಶ್ವಸಂಸ್ಥೆಯ ಎಚ್ಚರಿಕೆ",
    summary: "UNICEF, WHO ಹಾಗೂ ಮಕ್ಕಳ ಬೆಳವಣಿಗೆಯ ಸಂಸ್ಥೆಗಳು ತರುಣರಲ್ಲಿ ಹೆಚ್ಚುತ್ತಿರುವ ಪರದೆ ಅವಲಂಬನೆ ಬಗ್ಗೆ ಎಚ್ಚರಿಸುತ್ತಿವೆ...",
    content:
      "UNICEF, WHO ಹಾಗೂ ಮಕ್ಕಳ ಬೆಳವಣಿಗೆ ಕುರಿತು ಸಂಶೋಧನೆ ನಡೆಸುವ ಸಂಸ್ಥೆಗಳು ತರುಣರಲ್ಲಿ ಹೆಚ್ಚುತ್ತಿರುವ ಪರದೆ (digital screen) ಅವಲಂಬನೆ, ನಿದ್ರೆಯ ಅಡಚಣೆಗಳು ಮತ್ತು ಮಾನಸಿಕ ಆರೋಗ್ಯದ ಸಮಸ್ಯೆಗಳ ಬಗ್ಗೆ ನಿರಂತರವಾಗಿ ಎಚ್ಚರಿಕೆ ನೀಡುತ್ತಿವೆ.",
  },
  {
    title: "ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮಗಳ ಮೇಲಿನ ನಿರ್ಬಂಧಗಳು",
    summary: "ಆಸ್ಟ್ರೇಲಿಯಾ ಸೇರಿದಂತೆ ಹಲವು ದೇಶಗಳು 16 ವರ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ ವಯಸ್ಸಿನ ಮಕ್ಕಳಿಗೆ ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮಗಳ ಬಳಕೆಯನ್ನು ನಿರ್ಬಂಧಿಸುತ್ತಿವೆ...",
    content:
      "ಆಸ್ಟ್ರೇಲಿಯಾ ಸೇರಿದಂತೆ ಹಲವು ದೇಶಗಳು 16 ವರ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ ವಯಸ್ಸಿನ ಮಕ್ಕಳಿಗೆ ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮಗಳ ಬಳಕೆಯನ್ನು ನಿರ್ಬಂಧಿಸುವ ಕ್ರಮಗಳನ್ನು ಆರಂಭಿಸಿವೆ. ಫ್ರಾನ್ಸ್, ಇಂಡೋನೇಷ್ಯಾ, ಸ್ಪೇನ್ ಸೇರಿದಂತೆ ಇನ್ನೂ ಹಲವು ದೇಶಗಳು ಇದೇ ರೀತಿಯ ನಿಯಮಗಳನ್ನು ಪರಿಗಣಿಸುತ್ತಿವೆ.",
  },
  {
    title: "ಕರ್ನಾಟಕದ ಹೆಜ್ಜೆ",
    summary: "ಭಾರತದಲ್ಲಿಯೂ ಕರ್ನಾಟಕ ಸರ್ಕಾರ 16 ವರ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ ವಯಸ್ಸಿನ ಮಕ್ಕಳ ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮ ಬಳಕೆಗೆ ನಿರ್ಬಂಧ ಹೇರುವ ಸಾಧ್ಯತೆ ಪರಿಶೀಲಿಸುತ್ತಿದೆ...",
    content:
      "ಭಾರತದಲ್ಲಿಯೂ ಕರ್ನಾಟಕ ಸರ್ಕಾರ 16 ವರ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ ವಯಸ್ಸಿನ ಮಕ್ಕಳ ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮ ಬಳಕೆಗೆ ನಿರ್ಬಂಧ ಹೇರುವ ಸಾಧ್ಯತೆಯನ್ನು ಪರಿಶೀಲಿಸುತ್ತಿದೆ. ಇದು ಡಿಜಿಟಲ್ ವ್ಯಸನ ಮತ್ತು ಆನ್ಲೈನ್ ಅಪಾಯಗಳ ಬಗ್ಗೆ ಹೆಚ್ಚುತ್ತಿರುವ ಕಾಳಜಿಯನ್ನು ಪ್ರತಿಬಿಂಬಿಸುತ್ತದೆ.",
  },
];

export default function TeenRealityCards() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { language } = useLanguage();
  const teenRealityData = language === "kn" ? teenRealityDataKn : teenRealityDataEn;

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
