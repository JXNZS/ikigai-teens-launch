import { useEffect, useRef, useState, type CSSProperties } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { LetterSwapForward } from "@/components/ui/letter-swap";
import { useIsMobile } from "@/hooks/use-mobile";
import TeenRealityCards from "@/components/TeenRealityCards";
import { X } from "lucide-react";
import irene1Photo from "@/assets/Irene 1.jpeg";
import TextToSpeechButton from "@/components/TextToSpeechButton";
import { useLanguage } from "@/context/LanguageContext";

const CircleProfilePhoto = ({ src, alt, imageClassName, imageStyle, containerClassName }: { src: string; alt: string; imageClassName?: string; imageStyle?: CSSProperties; containerClassName?: string }) => {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border border-border/70 shrink-0 ${containerClassName ?? ""}`}>
        <div className="w-full h-full bg-secondary flex items-center justify-center text-xs font-semibold text-muted-foreground px-3 text-center">
          {alt}
        </div>
      </div>
    );
  }

  return (
    <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border border-border/70 shrink-0 ${containerClassName ?? ""}`}>
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover ${imageClassName ?? ""}`}
        style={imageStyle}
        onError={() => setFailed(true)}
      />
    </div>
  );
};

type CredibilityStat = {
  value: number;
  label: string;
  suffix?: string;
};

const credibilityStatsEn: CredibilityStat[] = [
  { value: 107893, suffix: "+", label: "Children Reached" },
  { value: 25, label: "Years Humanitarian Experience" },
  { value: 200, suffix: "+", label: "Schools Engaged" },
  { value: 63, label: "Villages Served" },
  { value: 32, label: "Countries with Footprints" },
  { value: 136, label: "Nationalities of Colleagues" },
];

const credibilityStatsKn: CredibilityStat[] = [
  { value: 107893, suffix: "+", label: "ಮಕ್ಕಳಿಗೆ ತರಬೇತಿ" },
  { value: 25, label: "ವರ್ಷ ಮಾನವೀಯ ನೆರವು ಮತ್ತು ಪರಿಹಾರ ಸೇವೆಯ ಅನುಭವ" },
  { value: 200, suffix: "+", label: "ಶಾಲೆಗಳೊಂದಿಗೆ ಕಾರ್ಯನಿರ್ವಹಣೆ" },
  { value: 63, label: "ಗ್ರಾಮಗಳಲ್ಲಿ ಸೇವೆ ತಂದ ಬದಲಾವಣೆ" },
  { value: 32, label: "ದೇಶಗಳಲ್ಲಿ ಕಾರ್ಯಾನುಭವ" },
  { value: 136, label: "ರಾಷ್ಟ್ರೀಯತೆಗಳ ಸಹೋದ್ಯೋಗಿಗಳೊಂದಿಗೆ ಕಾರ್ಯನುಭವ" },
];

type Milestone = {
  label: string;
  title: string;
  details: string[];
  bullets?: string[];
};

const milestonesEn: Milestone[] = [
  {
    label: "1986 – 1993",
    title: "Academic Foundation in Child Development",
    details: [
      "BSc, MSc for a foundation in understanding childhood growth, behaviour, and learning.",
    ],
  },
  {
    label: "1994",
    title: "Government of India – Ministry of Personnel",
    details: [
      "Served at the office of a Cabinet Minister in New Delhi.",
    ],
  },
  {
    label: "1998 – 2001",
    title: "Private Sector Exposure",
    details: [
      "Worked across corporate roles before moving fully into humanitarian work.",
    ],
  },
  {
    label: "2002",
    title: "UN and WHO Support",
    details: [
      "Supported HIV/AIDS, Malaria, and Tuberculosis projects across Southeast Asian countries.",
    ],
  },
  {
    label: "2002 – 2012",
    title: "Red Cross Movement Work in India",
    details: [
      "Designed and delivered multiple children's programs across India.",
      "Reached over 107,893 children across schools and communities.",
    ],
    bullets: [
      "Youth peer education programs",
      "Disaster risk reduction training",
      "First aid and emergency preparedness",
      "School and community life-skills initiatives",
    ],
  },
  {
    label: "2012 – 2018",
    title: "International Work with Red Cross Globally",
    details: [
      "Worked in humanitarian contexts across Haiti, Iraq, Sudan, and Ethiopia.",
      "Supported programs in challenging disaster and conflict environments.",
    ],
  },
  {
    label: "2023 - 2025",
    title: "Oxfam – Iraq",
    details: [
      "Continued humanitarian leadership and program work in complex conflict contexts.",
      "Based in Iraq during the Israel-Palestine-Gaza war.",
    ],
  },
  {
    label: "2025",
    title: "Ikigai Teen Conceptualised",
    details: [
      "Drawing from decades of work with children and youth, the idea for a focused teen mindset development platform started taking shape.",
    ],
  },
  {
    label: "2026",
    title: "Ikigai Teen Launch",
    details: [
      "A structured coaching initiative helping teenagers develop clarity of identity, emotional resilience, responsible digital habits, purpose, and leadership.",
    ],
  },
];

const milestonesKn: Milestone[] = [
  {
    label: "1986 – 1993",
    title: "ಮಕ್ಕಳ ಬೆಳವಣಿಗೆಯ ಶೈಕ್ಷಣಿಕ ಅಡಿಪಾಯ",
    details: [
      "ಬಾಲ್ಯದ ಬೆಳವಣಿಗೆ, ವರ್ತನೆ ಮತ್ತು ಕಲಿಕೆಯ ಕುರಿತು ಬಲವಾದ ಶೈಕ್ಷಣಿಕ ನೆಲೆಯನ್ನು ರೂಪಿಸಲು B.Sc. ಹಾಗೂ M.Sc. ಪದವಿಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿದರು.",
    ],
  },
  {
    label: "1994",
    title: "ಭಾರತ ಸರ್ಕಾರ – ಸಿಬ್ಬಂದಿ ಸಚಿವಾಲಯ",
    details: [
      "ನವದೆಹಲಿದಲ್ಲಿ ಕೇಂದ್ರ ಸಚಿವರ ಕಚೇರಿಯಲ್ಲಿ ಸೇವೆ ಸಲ್ಲಿಸಿದರು.",
    ],
  },
  {
    label: "1998 – 2001",
    title: "ಖಾಸಗಿ ವಲಯದ ಅನುಭವ",
    details: [
      "ಮಾನವೀಯ ಸೇವೆಗೆ ಸಂಪೂರ್ಣವಾಗಿ ತೊಡಗಿಸಿಕೊಳ್ಳುವ ಮೊದಲು ವಿವಿಧ ಕಾರ್ಪೊರೇಟ್ ಹುದ್ದೆಗಳಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸಿದರು.",
    ],
  },
  {
    label: "2002",
    title: "ವಿಶ್ವಸಂಸ್ಥೆ ಮತ್ತು ವಿಶ್ವ ಆರೋಗ್ಯ ಸಂಸ್ಥೆಯೊಂದಿಗೆ ಸಹಯೋಗ",
    details: [
      "ಆಗ್ನೇಯ ಏಷ್ಯಾದ ವಿವಿಧ ದೇಶಗಳಲ್ಲಿ HIV/AIDS, ಮಲೇರಿಯಾ ಮತ್ತು ಕ್ಷಯರೋಗ (TB) ಯೋಜನೆಗಳಿಗೆ ಬೆಂಬಲ ನೀಡಿದರು.",
    ],
  },
  {
    label: "2002 – 2012",
    title: "ಭಾರತದಲ್ಲಿ ರೆಡ್ಕ್ರಾಸ್ ಸೇವೆ",
    details: [
      "ಭಾರತದಾದ್ಯಂತ ಮಕ್ಕಳಿಗಾಗಿ ಅನೇಕ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ರೂಪಿಸಿ ಯಶಸ್ವಿಯಾಗಿ ಅನುಷ್ಠಾನಗೊಳಿಸಿದರು.",
      "1,07,893ಕ್ಕೂ ಹೆಚ್ಚು ಮಕ್ಕಳನ್ನು ತಲುಪಿ ತರಬೇತಿ ನೀಡಿದರು.",
    ],
    bullets: [
      "ಯುವ ಸಹಪಾಠಿ ಶಿಕ್ಷಣ ಕಾರ್ಯಕ್ರಮಗಳು",
      "ವಿಪತ್ತು ಅಪಾಯ ತಗ್ಗಿಸುವ ತರಬೇತಿಗಳು",
      "ಪ್ರಥಮ ಚಿಕಿತ್ಸೆ ಮತ್ತು ತುರ್ತು ಸನ್ನದ್ಧತೆ",
      "ಶಾಲೆ ಮತ್ತು ಸಮುದಾಯ ಆಧಾರಿತ ಜೀವನ ಕೌಶಲ್ಯ ಕಾರ್ಯಕ್ರಮಗಳು",
    ],
  },
  {
    label: "2012 – 2018",
    title: "ಅಂತರರಾಷ್ಟ್ರೀಯ ರೆಡ್ಕ್ರಾಸ್ ಕಾರ್ಯಾನುಭವ",
    details: [
      "ಹೈಟಿ, ಇರಾಕ್, ಸುಡಾನ್ ಮತ್ತು ಇಥಿಯೋಪಿಯಾದಂತಹ ದೇಶಗಳ ಮಾನವೀಯ ಸೇವಾ ಕಾರ್ಯಗಳಲ್ಲಿ ಭಾಗವಹಿಸಿದರು.",
      "ವಿಪತ್ತು ಮತ್ತು ಸಂಘರ್ಷಪೀಡಿತ ಪ್ರದೇಶಗಳಲ್ಲಿ ವಿವಿಧ ಕಾರ್ಯಕ್ರಮಗಳಿಗೆ ಬೆಂಬಲ ನೀಡಿದರು.",
    ],
  },
  {
    label: "2023 – 2025",
    title: "ಆಕ್ಸ್ಫ್ಯಾಮ್ – ಇರಾಕ್",
    details: [
      "ಸಂಘರ್ಷಪೀಡಿತ ಪ್ರದೇಶಗಳಲ್ಲಿ ಮಾನವೀಯ ನಾಯಕತ್ವ ಮತ್ತು ಕಾರ್ಯಕ್ರಮಗಳ ಅನುಷ್ಠಾನವನ್ನು ಮುಂದುವರಿಸಿದರು.",
      "ಇಸ್ರೇಲ್–ಪ್ಯಾಲೆಸ್ಟೈನ್–ಗಾಜಾ ಸಂಘರ್ಷದ ಅವಧಿಯಲ್ಲಿ ಇರಾಕ್ನಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸಿದರು.",
    ],
  },
  {
    label: "2025",
    title: "ಇಕಿಗೈ ಟೀನ್ ಪರಿಕಲ್ಪನೆ",
    details: [
      "ಮಕ್ಕಳು ಮತ್ತು ಯುವಕರೊಂದಿಗೆ ಹಲವು ದಶಕಗಳ ಅನುಭವದ ಆಧಾರದ ಮೇಲೆ, ತರುಣರ ಮನೋವಿಕಾಸಕ್ಕಾಗಿ ಸಮರ್ಪಿತ ವೇದಿಕೆಯಾದ ಇಕಿಗೈ ಟೀನ್ ಪರಿಕಲ್ಪನೆ ರೂಪುಗೊಳ್ಳಲು ಆರಂಭವಾಯಿತು.",
    ],
  },
  {
    label: "2026",
    title: "ಇಕಿಗೈ ಟೀನ್ ಆರಂಭ",
    details: [
      "ತರುಣರಲ್ಲಿ ಸ್ವಗುರುತಿನ ಸ್ಪಷ್ಟತೆ, ಭಾವನಾತ್ಮಕ ಸ್ಥೈರ್ಯ, ಜವಾಬ್ದಾರಿಯುತ ಡಿಜಿಟಲ್ ಅಭ್ಯಾಸಗಳು, ಜೀವನದ ಉದ್ದೇಶ ಮತ್ತು ನಾಯಕತ್ವದ ಗುಣಗಳನ್ನು ಬೆಳೆಸುವ ಸುಸಂಘಟಿತ ತರಬೇತಿ ಉಪಕ್ರಮವಾಗಿ ಇಕಿಗೈ ಟೀನ್ ಆರಂಭವಾಯಿತು.",
    ],
  },
];

const whyIkigaiSummaryEn = "Ikigai Teen was founded after Irene Arathi Pais observed dramatic changes in teen behaviour following the widespread adoption of smartphones during the COVID era for education purposes among teens. Conversations with parents, educators, teenagers and government officials revealed rising digital dependency, declining focus, and emotional strain. Ikigai Teen helps teens develop awareness, resilience, and purpose so they can navigate the digital world wisely and grow into responsible future leaders";

const whyIkigaiSummaryKn = "ಕೋವಿಡ್ ಸಾಂಕ್ರಾಮಿಕದ ಅವಧಿಯಲ್ಲಿ ಶಿಕ್ಷಣಕ್ಕಾಗಿ ಸ್ಮಾರ್ಟ್ಫೋನ್ಗಳ ವ್ಯಾಪಕ ಬಳಕೆಯ ನಂತರ ತರುಣರ ನಡವಳಿಕೆಯಲ್ಲಿ ಉಂಟಾದ ಮಹತ್ತರ ಬದಲಾವಣೆಗಳನ್ನು ಗಮನಿಸಿದ ಐರೀನ್ ಆರತಿ ಪೈಸ್ ಅವರು 'ಇಕಿಗೈ ಟೀನ್' ಅನ್ನು ಸ್ಥಾಪಿಸಿದರು. ಪೋಷಕರು, ಶಿಕ್ಷಕರು, ತರುಣರು ಮತ್ತು ಸರ್ಕಾರಿ ಅಧಿಕಾರಿಗಳೊಂದಿಗಿನ ಚರ್ಚೆಗಳು ಹೆಚ್ಚುತ್ತಿರುವ ಡಿಜಿಟಲ್ ಅವಲಂಬನೆ, ಕುಸಿಯುತ್ತಿರುವ ಏಕಾಗ್ರತೆ ಮತ್ತು ಭಾವನಾತ್ಮಕ ಒತ್ತಡವನ್ನು ಬಹಿರಂಗಪಡಿಸಿದವು. ಇಕಿಗೈ ಟೀನ್ ತರುಣರಲ್ಲಿ ಜಾಗೃತಿ, ಸ್ಥೈರ್ಯ ಮತ್ತು ಉದ್ದೇಶವನ್ನು ಬೆಳೆಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ, ಇದರಿಂದ ಅವರು ಡಿಜಿಟಲ್ ಲೋಕವನ್ನು ಜಾಣ್ಮೆಯಿಂದ ಮುನ್ನಡೆಸಬಹುದು ಮತ್ತು ಜವಾಬ್ದಾರಿಯುತ ಭವಿಷ್ಯದ ನಾಯಕರಾಗಿ ಬೆಳೆಯಬಹುದು.";

const whyIkigaiExpandedEn = [
  "After more than two decades of working with children across schools, villages, and humanitarian programs, Irene Arathi has witnessed how profoundly the teen years shape the future of individuals and societies.",
  "Her concern deepened during the COVID-19 pandemic when millions of students were required to use smartphones for online learning. While technology ensured continuity in education, it also opened unrestricted digital access for many teenagers - often without guidance or awareness from adults.",
  "In the years since, conversations with parents, educators, and teens themselves revealed worrying patterns: declining focus, weakening family connections, growing digital dependency, and increasing exposure to unsafe online behaviour.",
  "At the same time, Irene recognised that technology itself is not the enemy. When used wisely, it can be a powerful tool for learning, creativity, and opportunity.",
  "What concerned her most was the absence of guidance during a critical stage of life.",
  "As Mahatma Gandhi once said, \"Youth are the salt of the nation.\" Irene extends that thought further: \"Teens are the soil of the nation - what we sow during these years becomes the character of society tomorrow.\"",
  "Ikigai Teen was created to help young people develop awareness, emotional strength, digital discipline, and clarity of purpose so they can grow into responsible digital citizens and ethical future leaders.",
];

const whyIkigaiExpandedKn = [
  "ಶಾಲೆಗಳು, ಗ್ರಾಮೀಣ ಭಾಗಗಳು ಮತ್ತು ಮಾನವೀಯ ಸೇವಾ ಸಂಸ್ಥೆಗಳಲ್ಲಿ ಎರಡು ದಶಕಗಳಿಗೂ ಹೆಚ್ಚು ಕಾಲ ಮಕ್ಕಳೊಂದಿಗೆ ಕೆಲಸ ಮಾಡಿದ ಸುದೀರ್ಘ ಅನುಭವ ಐರೀನ್ ಆರತಿ ಅವರದ್ದು. ತರುಣದ ಪ್ರಾಯವು ಒಬ್ಬ ವ್ಯಕ್ತಿಯ ಹಾಗೂ ಇಡೀ ಸಮಾಜದ ಭವಿಷ್ಯವನ್ನು ಎಷ್ಟು ಆಳವಾಗಿ ರೂಪಿಸುತ್ತದೆ ಎಂಬುದನ್ನು ಅವರು ಹತ್ತಿರದಿಂದ ಕಂಡಿದ್ದಾರೆ.",
  "ಕೋವಿಡ್-19 ಮತ್ತು ಡಿಜಿಟಲ್ ಸವಾಲು: ಕೋವಿಡ್ ಸಾಂಕ್ರಾಮಿಕದ ಸಮಯದಲ್ಲಿ ಆನ್ಲೈನ್ ಕಲಿಕೆಗಾಗಿ ಲಕ್ಷಾಂತರ ವಿದ್ಯಾರ್ಥಿಗಳು ಸ್ಮಾರ್ಟ್ಫೋನ್ಗಳನ್ನು ಅವಲಂಬಿಸಬೇಕಾಯಿತು. ತಂತ್ರಜ್ಞಾನವು ಶಿಕ್ಷಣ ನಿಲ್ಲದಂತೆ ನೋಡಿಕೊಂಡರೂ, ಅದು ತರುಣದವರಿಗೆ ಯಾವುದೇ ವಯಸ್ಕರ ಮಾರ್ಗದರ್ಶನವಿಲ್ಲದ ಅನಿಯಂತ್ರಿತ ಡಿಜಿಟಲ್ ಲೋಕದ ಬಾಗಿಲನ್ನು ತೆರೆಯಿತು. ಇದರ ಬೆನ್ನಲ್ಲೇ ಮಕ್ಕಳ ನಡವಳಿಕೆಯಲ್ಲಿ ದೊಡ್ಡ ಬದಲಾವಣೆಗಳು ಕಾಣಿಸಿಕೊಂಡವು.",
  "ಇದರ ಬೆನ್ನಲ್ಲೇ ಪೋಷಕರು, ಶಿಕ್ಷಕರು ಮತ್ತು ಸ್ವತಃ ತರುಣದವರೊಂದಿಗೆ ಐರೀನ್ ನಡೆಸಿದ ಚರ್ಚೆಗಳಲ್ಲಿ ಕೆಲವು ಆತಂಕಕಾರಿ ವಿಷಯಗಳು ಬೆಳಕಿಗೆ ಬಂದವು: ಕುಸಿಯುತ್ತಿರುವ ಏಕಾಗ್ರತೆ ಮತ್ತು ಗಮನ, ಕುಟುಂಬದೊಂದಿಗಿನ ಬಾಂಧವ್ಯ ದುರ್ಬಲಗೊಳ್ಳುವುದು, ತೀವ್ರಗೊಳ್ಳುತ್ತಿರುವ ಡಿಜಿಟಲ್ ವ್ಯಸನ ಮತ್ತು ಅಸುರಕ್ಷಿತ ಆನ್ಲೈನ್ ನಡವಳಿಕೆ.",
  "ಅದೇ ಸಮಯದಲ್ಲಿ, ತಂತ್ರಜ್ಞಾನವೇನೂ ಶತ್ರುವಲ್ಲ ಎಂದು ಐರೀನ್ ಗುರುತಿಸಿದರು. ಜಾಣ್ಮೆಯಿಂದ ಬಳಸಿದರೆ ಅದು ಕಲಿಕೆ, ಸೃಜನಶೀಲತೆ ಮತ್ತು ಅವಕಾಶಗಳಿಗೆ ಅದ್ಭುತ ಸಾಧನವಾಗಬಲ್ಲದು.",
  "ಆದರೆ, ಈ ಪ್ರಮುಖ ವಯಸ್ಸಿನಲ್ಲಿ ಮಕ್ಕಳಿಗೆ ಸರಿಯಾದ ದಾರಿದೀಪ ಮತ್ತು ಮಾರ್ಗದರ್ಶನ ಇಲ್ಲದಿರುವುದು ಅವರ ಕಳವಳಕ್ಕೆ ಕಾರಣವಾಯಿತು.",
  "ಮಹಾತ್ಮ ಗಾಂಧಿಯವರ \"ಯುವಕರು ರಾಷ್ಟ್ರದ ಉಪ್ಪು\" ಎಂಬ ಮಾತನ್ನು ನೆನಪಿಸುತ್ತಾ ಐರೀನ್ ಹೇಳುತ್ತಾರೆ: \"ತರುಣದವರು ರಾಷ್ಟ್ರದ ಮಣ್ಣು ಇದ್ದಂತೆ–ಈ ವಯಸ್ಸಿನಲ್ಲಿ ನಾವು ಏನನ್ನು ಬಿತ್ತುತ್ತೇವೆಯೋ, ನಾಳೆ ಸಮಾಜದಲ್ಲಿ ಅದೇ ಬೆಳೆಯುತ್ತದೆ.\"",
  "ಇದೇ ಉದ್ದೇಶದಿಂದ, ತರುಣದವರಲ್ಲಿ ಜಾಗೃತಿ, ಭಾವನಾತ್ಮಕ ಶಕ್ತಿ, ಡಿಜಿಟಲ್ ಶಿಸ್ತು ಮತ್ತು ಬದುಕಿನ ಗುರಿಯನ್ನು ಮೂಡಿಸಲು 'ಇಕಿಗೈ ಟೀನ್' ಅನ್ನು ಸ್ಥಾಪಿಸಲಾಯಿತು. ಇದು ಯುವಜನರನ್ನು ಜವಾಬ್ದಾರಿಯುತ ಡಿಜಿಟಲ್ ನಾಗರಿಕರನ್ನಾಗಿ ಹಾಗೂ ನೈತಿಕತೆಯುಳ್ಳ ಭವಿಷ್ಯದ ನಾಯಕರನ್ನಾಗಿ ರೂಪಿಸುತ್ತದೆ."
];

const formatNumber = (value: number) => value.toLocaleString("en-US");

const useCountUp = (target: number, shouldAnimate: boolean) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) {
      return;
    }

    let animationFrame = 0;
    let startTime: number | null = null;
    const duration = 3200;

    const step = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrentValue(Math.round(target * eased));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step);
      }
    };

    setCurrentValue(0);
    animationFrame = window.requestAnimationFrame(step);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [shouldAnimate, target]);

  return currentValue;
};

const CredibilityCounter = ({ value, suffix, label, shouldAnimate }: CredibilityStat & { shouldAnimate: boolean }) => {
  const currentValue = useCountUp(value, shouldAnimate);

  return (
    <div className="rounded-xl border border-border/60 bg-background/70 p-5 text-center shadow-sm">
      <div className="font-display text-3xl md:text-4xl font-bold text-primary leading-none">
        {formatNumber(currentValue)}{suffix ?? ""}
      </div>
      <p className="mt-3 text-sm md:text-base font-body text-muted-foreground leading-snug">{label}</p>
    </div>
  );
};

const Journey = () => {
  const stripRef = useRef<HTMLDivElement>(null);
  const whyArticleRef = useRef<HTMLElement>(null);
  const timelineScrollRef = useRef<HTMLDivElement>(null);
  const [stripVisible, setStripVisible] = useState(false);
  const [activeMilestoneLabel, setActiveMilestoneLabel] = useState<string | null>(null);
  const [activeMilestoneRect, setActiveMilestoneRect] = useState<DOMRect | null>(null);
  const [showWhyReadMore, setShowWhyReadMore] = useState(false);
  const isMobile = useIsMobile();
  const { language, t } = useLanguage();

  const credibilityStats = language === "kn" ? credibilityStatsKn : credibilityStatsEn;
  const milestones = language === "kn" ? milestonesKn : milestonesEn;
  const whyIkigaiSummary = language === "kn" ? whyIkigaiSummaryKn : whyIkigaiSummaryEn;
  const whyIkigaiExpanded = language === "kn" ? whyIkigaiExpandedKn : whyIkigaiExpandedEn;

  useEffect(() => {
    const element = stripRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStripVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.65, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!activeMilestoneLabel || !isMobile) return;

    const handleScroll = () => {
      closeMilestonePopup();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const timelineElement = timelineScrollRef.current;
    if (timelineElement) {
      timelineElement.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timelineElement) {
        timelineElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activeMilestoneLabel, isMobile]);

  const scrollTimeline = (direction: -1 | 1) => {
    const element = timelineScrollRef.current;
    if (!element) {
      return;
    }

    const scrollAmount = Math.min(element.clientWidth * 0.7, 360);
    element.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  };

  const openMilestonePopup = (milestoneLabel: string, rect: DOMRect) => {
    setActiveMilestoneLabel(milestoneLabel);
    setActiveMilestoneRect(rect);
  };

  const closeMilestonePopup = () => {
    setActiveMilestoneLabel(null);
    setActiveMilestoneRect(null);
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 bg-background min-h-screen">
        <section className="footer-theme-legacy py-12 md:py-20 bg-card border-b border-border/50">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
            <h1>
              <LetterSwapForward
                label={t("journey.title")}
                className="justify-center text-4xl md:text-5xl font-display font-bold mb-4"
                style={{ color: '#FCEADE' }}
              />
            </h1>
            <p className="text-lg text-white font-body">
              {t("journey.subtitle")}
            </p>
          </div>
        </section>

        <section className="py-14 bg-background">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <article className="rounded-xl border border-border/60 bg-white [--foreground:0_0%_0%] [--muted-foreground:0_0%_0%] [--border:152_20%_86%] p-6 md:p-8 space-y-8">
              <div ref={stripRef} className="space-y-5 border-t border-border/50 pt-6">
                <h2>
                  <LetterSwapForward
                    label={t("journey.credibilityTitle")}
                    className="text-2xl md:text-3xl font-display font-semibold text-primary"
                  />
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {credibilityStats.map((stat) => (
                    <CredibilityCounter
                      key={stat.label}
                      value={stat.value}
                      suffix={stat.suffix}
                      label={stat.label}
                      shouldAnimate={stripVisible}
                    />
                  ))}
                </div>
              </div>
            </article>
          </div>
        </section>

        <section
          className="pb-16 bg-background overflow-visible"
          onMouseLeave={closeMilestonePopup}
        >
          <div className="px-6 md:px-10 lg:px-14">
            <h2 className="text-2xl md:text-3xl font-display font-semibold text-primary text-center">
              {t("journey.milestonesTitle")}
            </h2>
          </div>
          <div className="relative mt-6 w-full px-4 sm:px-6 md:px-10 lg:px-14 group/timeline">
            <div className="pointer-events-none absolute left-4 right-4 top-[50%] z-0 h-px -translate-y-1/2" style={{ backgroundColor: 'rgba(88,128,104,0.7)' }} aria-hidden="true" />
            <div
              className="absolute left-4 right-4 top-1/2 z-20 flex -translate-y-1/2 items-center justify-between pointer-events-none"
              aria-hidden="true"
            >
              <button
                type="button"
                onClick={() => scrollTimeline(-1)}
                className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-white/90 text-primary shadow-md opacity-100 transition-opacity duration-200 md:opacity-0 md:group-hover/timeline:opacity-100"
                aria-label="Scroll milestones left"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => scrollTimeline(1)}
                className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-white/90 text-primary shadow-md opacity-100 transition-opacity duration-200 md:opacity-0 md:group-hover/timeline:opacity-100"
                aria-label="Scroll milestones right"
              >
                ›
              </button>
            </div>

            <div ref={timelineScrollRef} className="relative z-10 py-10 overflow-x-auto no-scrollbar scroll-smooth">
              <ol className="relative flex items-center gap-2 sm:gap-4 md:gap-6 px-2 min-w-max md:justify-between" role="list">
                {milestones.map((milestone, index) => {
                  const isTop = index % 2 === 0;
                  const isActive = activeMilestoneLabel === milestone.label;

                  return (
                    <li key={milestone.label} className="relative flex-shrink-0 min-w-[140px] sm:min-w-[160px] md:flex-1">
                      <button
                        type="button"
                        onMouseEnter={(event) => openMilestonePopup(milestone.label, event.currentTarget.getBoundingClientRect())}
                        onMouseMove={(event) => {
                          if (activeMilestoneLabel === milestone.label) {
                            setActiveMilestoneRect(event.currentTarget.getBoundingClientRect());
                          }
                        }}
                        onClick={(event) => {
                          const rect = event.currentTarget.getBoundingClientRect();
                          setActiveMilestoneLabel((current) => (current === milestone.label ? null : milestone.label));
                          setActiveMilestoneRect(rect);
                        }}
                        onFocus={(event) => openMilestonePopup(milestone.label, event.currentTarget.getBoundingClientRect())}
                        className="flex w-full flex-col items-center text-center"
                        aria-expanded={isActive}
                        aria-label={`Show details for ${milestone.label}`}
                      >
                        {isTop ? (
                          <span className="mb-6 whitespace-nowrap font-sans text-xs sm:text-sm md:text-base font-medium tracking-wide text-foreground/90">{milestone.label}</span>
                        ) : (
                          <span className="mb-6 h-[1.1rem] sm:h-[1.25rem]" aria-hidden="true" />
                        )}
                        <span
                          className="h-3.5 w-3.5 rounded-full border-2"
                          style={{ borderColor: '#588068', backgroundColor: '#588068' }}
                          aria-hidden="true"
                        />
                        {isTop ? (
                          <span className="mt-6 h-[1.1rem] sm:h-[1.25rem]" aria-hidden="true" />
                        ) : (
                          <span className="mt-6 whitespace-nowrap font-sans text-xs sm:text-sm md:text-base font-medium tracking-wide text-foreground/90">{milestone.label}</span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>

            {activeMilestoneLabel && activeMilestoneRect ? (() => {
              const milestoneIndex = milestones.findIndex((item) => item.label === activeMilestoneLabel);
              const milestone = milestones[milestoneIndex];
              const isTop = milestoneIndex % 2 === 0;
              const popupWidth = Math.min(384, window.innerWidth - 32);
              const popupHalfWidth = popupWidth / 2;
              const popupCenterX = activeMilestoneRect.left + activeMilestoneRect.width / 2;
              const desktopLeft = Math.min(
                Math.max(popupCenterX, popupHalfWidth + 16),
                window.innerWidth - popupHalfWidth - 16,
              );

              return (
                <div
                  className="fixed z-[2147483647] rounded-lg border p-4 text-left"
                  onMouseEnter={() => setActiveMilestoneLabel(milestone.label)}
                  onMouseLeave={closeMilestonePopup}
                  style={{
                    backgroundColor: "#ffffff",
                    opacity: 1,
                    borderColor: "rgba(46,194,126,0.15)",
                    boxShadow: "0 16px 40px rgba(0,0,0,0.08)",
                    mixBlendMode: "normal",
                    isolation: "isolate",
                    WebkitBackdropFilter: "none",
                    backdropFilter: "none",
                    width: "min(24rem, calc(100vw - 2rem))",
                    maxHeight: isMobile ? "calc(100vh - 4rem)" : undefined,
                    overflowY: isMobile ? "auto" : undefined,
                    left: desktopLeft,
                    top: isTop ? activeMilestoneRect.top - 16 : activeMilestoneRect.bottom + 16,
                    transform: isTop
                      ? "translate(-50%, -100%)"
                      : "translate(-50%, 0)",
                  }}
                >
                  {isMobile ? (
                    <button
                      type="button"
                      onClick={closeMilestonePopup}
                      aria-label={t("journey.strings.Close milestone details")}
                      className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full border border-border/60 bg-white text-primary shadow-sm"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  ) : null}
                  <p className="font-display text-sm font-semibold text-primary">{milestone.label}</p>
                  <p className="mt-1 font-body text-base font-medium text-foreground">{milestone.title}</p>
                  <div className="mt-3 space-y-2">
                    {milestone.details.map((line) => (
                      <p key={line} className="font-body text-sm leading-relaxed text-muted-foreground">
                        {line}
                      </p>
                    ))}
                    {milestone.bullets ? (
                      <ul className="space-y-1">
                        {milestone.bullets.map((item) => (
                          <li key={item} className="font-body text-sm leading-relaxed text-muted-foreground">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              );
            })() : null}
          </div>
        </section>

        <section className="pb-20 bg-background">
          <div className={`container mx-auto px-4 sm:px-6 transition-all duration-300 ${language === "kn" ? "max-w-6xl" : "max-w-5xl"}`}>
            <article ref={whyArticleRef} className={`relative rounded-xl border border-border/60 bg-white [--foreground:0_0%_0%] [--muted-foreground:0_0%_0%] [--border:152_20%_86%] p-6 md:p-8 space-y-5 transition-all duration-300 ${language === "kn" ? "max-w-6xl w-full min-h-[480px] md:min-h-[380px]" : "max-w-5xl"}`}>
              <TextToSpeechButton targetRef={whyArticleRef} />
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                <div className="flex-shrink-0">
                  <CircleProfilePhoto
                    src={irene1Photo}
                    alt="Irene Arathi"
                    imageStyle={{ transform: 'scale(1.5)', transformOrigin: 'center 35%' }}
                  />
                </div>
                <div className="space-y-4 flex-1">
                  <h2>
                    <LetterSwapForward
                      label={t("journey.whyIreneTitle")}
                      className="justify-center md:justify-start text-center md:text-left text-2xl md:text-3xl font-display font-semibold text-primary"
                    />
                  </h2>

                  <div className="space-y-3">
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {whyIkigaiSummary}
                      {!showWhyReadMore ? (
                        <>
                          {" "}
                          <button
                            type="button"
                            onClick={() => setShowWhyReadMore(true)}
                            className="ml-1 inline-flex items-center rounded-md bg-primary/15 px-2 py-0.5 text-xs md:text-sm font-semibold text-primary hover:bg-primary/20 transition-colors"
                          >
                            {t("journey.strings.Read more")}
                          </button>
                        </>
                      ) : null}
                    </p>

                    {showWhyReadMore ? (
                      <div className="space-y-3">
                        {whyIkigaiExpanded.map((paragraph, paragraphIndex) => (
                          <p key={paragraphIndex} className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            {paragraph}
                            {paragraphIndex === whyIkigaiExpanded.length - 1 ? (
                              <>
                                {" "}
                                <button
                                  type="button"
                                  onClick={() => setShowWhyReadMore(false)}
                                  className="ml-1 inline-flex items-center rounded-md bg-primary/15 px-2 py-0.5 text-xs md:text-sm font-semibold text-primary hover:bg-primary/20 transition-colors"
                                >
                                  {t("journey.strings.Show less")}
                                </button>
                              </>
                            ) : null}
                          </p>
                        ))}
                      </div>
                    ) : null}

                  </div>
                </div>
              </div>

              {/* Quote outside the flex container, directly under it */}
              <div className="border-t border-border/50 pt-5 mt-5">
                {language === "kn" ? (
                  <>
                    <p className="text-sm md:text-base italic font-semibold text-foreground/85">
                      "ತರುಣದ ದಿನಗಳು ರಾಷ್ಟ್ರದ ನಾಳಿನ ತಳಹದಿ. ಇಂದು ನಾವು ತೋರುವ ದಾರಿ, ನಾಳಿನ ಸಮಾಜದ ಮುಖಗನ್ನಡಿ."
                    </p>
                    <p className="text-xs md:text-sm font-semibold text-primary/90">— ಐರೀನ್ ಆರತಿ</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm md:text-base italic font-semibold text-foreground/85">
                      "Teen years are the foundation of a nation's future - what we guide today becomes the character of society tomorrow."
                    </p>
                    <p className="text-xs md:text-sm font-semibold text-primary/90">- Irene Arathi Pais</p>
                  </>
                )}
              </div>
            </article>
          </div>
        </section>

        <section className="pb-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <article className="rounded-xl border border-border/60 bg-white [--foreground:0_0%_0%] [--muted-foreground:0_0%_0%] [--border:152_20%_86%] p-6 md:p-8 space-y-5">
              <h2>
                <LetterSwapForward
                  label={t("journey.teenRealityTitle")}
                  className="text-2xl md:text-3xl font-display font-semibold text-primary"
                />
              </h2>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {language === "kn" ? (
                  "ಜಾಗತಿಕ ಅಧ್ಯಯನಗಳು ಹಾಗೂ ಭಾರತದ ಅಧಿಕೃತ ವರದಿಗಳು ತರುಣರ ಜೀವನದ ಮೇಲೆ ಡಿಜಿಟಲ್ ಜಗತ್ತಿನ ವೇಗವಾದ ಪ್ರಭಾವವು ಗಂಭೀರ ಪರಿಣಾಮ ಬೀರುತ್ತಿರುವುದನ್ನು ಸೂಚಿಸುತ್ತಿವೆ."
                ) : (
                  "Global research and national data increasingly warn that adolescent well-being is being reshaped by rapid digital exposure."
                )}
              </p>

              <TeenRealityCards />

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {language === "kn" ? (
                  "ತಂತ್ರಜ್ಞಾನವು ಇಂದು ಅಪಾರ ಅವಕಾಶಗಳ ಹೆಬ್ಬಾಗಿಲನ್ನು ತೆರೆದಿದೆ ನಿಜ. ಆದರೆ, ಈ ಡಿಜಿಟಲ್ ಜಗತ್ತಿನಲ್ಲಿ ಯುವ ಪೀಳಿಗೆಯು ದಾರಿ ತಪ್ಪದೆ, ಸುರಕ್ಷಿತವಾಗಿ ಮತ್ತು ಜಾಣ್ಮೆಯಿಂದ ಮುನ್ನಡೆಯಲು ಸೂಕ್ತ ಮಾರ್ಗದರ್ಶನದ ಅಗತ್ಯವಿದೆ ಎಂಬುದನ್ನು ಜಾಗತಿಕ ವಿದ್ಯಮಾನಗಳು ಸಾಬೀತುಪಡಿಸುತ್ತಿವೆ."
                ) : (
                  "These developments underline a global recognition that while technology offers immense opportunity, young people need guidance to navigate the digital world safely and wisely."
                )}
              </p>

              {language === "kn" ? (
                <>
                  <p className="text-sm md:text-base italic font-semibold text-foreground/85">
                    "ತರುಣದವರು ಡಿಜಿಟಲ್ ಲೋಕವನ್ನು ಆಳುವ ಮುನ್ನ, ತಮ್ಮ ಮನಸ್ಸನ್ನು ಹತೋಟಿಯಲ್ಲಿಟ್ಟುಕೊಳ್ಳುವುದನ್ನು ಕಲಿತರೆ; ಅವರು ತಂತ್ರಜ್ಞಾನದ ಬಲಿಪಶುಗಳಾಗದೆ, ಉಜ್ವಲ ಭವಿಷ್ಯದ ಸೃಷ್ಟಿಕರ್ತರಾಗುತ್ತಾರೆ."
                  </p>
                  <p className="text-xs md:text-sm font-semibold text-primary/90">— ಐರೀನ್ ಆರತಿ</p>
                </>
              ) : (
                <>
                  <p className="text-sm md:text-base italic font-semibold text-foreground/85">
                    "If teenagers learn to master their minds before the digital world masters them, they become builders of the future, not victims of it."
                  </p>
                  <p className="text-xs md:text-sm font-semibold text-primary/90">- Irene Arathi</p>
                </>
              )}
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Journey;
