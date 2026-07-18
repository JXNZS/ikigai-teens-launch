import { useEffect, useRef, useState } from "react";
import Conrad from "@/assets/Conrad.jpeg";
import Patrizia from "@/assets/Patrizia.jpeg";
import Kumar from "@/assets/Kumar.jpeg";
import Howard from "@/assets/Howard.jpeg";
import Manivannan from "@/assets/Manivannan.jpeg";
import Sunil from "@/assets/sunil.jpeg";
import Archana from "@/assets/Archana.jpeg";
import Reshma from "@/assets/Reshma.jpeg";
import Dilip from "@/assets/Dilip.jpeg";
import TextToSpeechButton from "@/components/TextToSpeechButton";
import { useLanguage } from "@/context/LanguageContext";
import { type Language } from "@/lib/translations";

type Testimonial = {
  quote: string;
  name: string;
  title?: string;
  img: string;
  imgPosition?: string; // object-position for the image
  imgScale?: number; // image scale for zooming
  imgAlign?: "left" | "right" | "center"; // image placement
};

const getTestimonials = (language: Language): Testimonial[] => [
  {
    quote: language === "kn"
      ? "ಭಾರತದ ನಾಲ್ಕು ರಾಜ್ಯಗಳಲ್ಲಿ ಭಾರತೀಯ ರೆಡ್ ಕ್ರಾಸ್ ಸೊಸೈಟಿಯ ಯೋಜನೆಗಳ ವಿನ್ಯಾಸ ಮತ್ತು ಅನುಷ್ಠಾನದ ಜವಾಬ್ದಾರಿಯನ್ನು ಐರೀನ್ ಅವರು ನಿರ್ವಹಿಸಿದ ಸಂದರ್ಭದಲ್ಲಿ, ಸುಮಾರು ಏಳು ವರ್ಷಗಳ ಕಾಲ ಅವರೊಂದಿಗೆ ಕೆಲಸ ಮಾಡುವ ಅವಕಾಶ ನನಗೆ ದೊರೆಯಿತು. ಶಾಲಾಪೂರ್ವ ಮಕ್ಕಳು, ಪ್ರೌಢಶಾಲಾ ವಿದ್ಯಾರ್ಥಿಗಳು ಮತ್ತು ಯುವಕರೊಂದಿಗೆ ಅವರು ನಡೆಸಿದ ಕಾರ್ಯವು ಅವರ ಸುರಕ್ಷಿತ ಹಾಗೂ ಆರೋಗ್ಯಕರ ಬೆಳವಣಿಗೆಗೆ ಮಹತ್ವದ ಕೊಡುಗೆ ನೀಡಿತು.\nಬದ್ಧತೆ, ವೃತ್ತಿಪರತೆ, ಸಮುದಾಯದೊಂದಿಗೆ ಹೊಂದಾಣಿಕೆ ಮತ್ತು ನಿಷ್ಠೆ—ಈ ಗುಣಗಳಿಂದ ಅವರು ಸದಾ ವಿಶಿಷ್ಟವಾಗಿ ಗುರುತಿಸಿಕೊಂಡರು. ತರುಣರಿಗಾಗಿ ಅವರು ಆರಂಭಿಸಿರುವ ‘ಇಕಿಗೈ ಟೀನ್’ ಉಪಕ್ರಮವು ಅತ್ಯುತ್ತಮ ಯಶಸ್ಸು ಸಾಧಿಸಲಿ ಎಂದು ಹಾರೈಸುತ್ತೇನೆ."
      : "I have worked with Irene for 7 years while she managed the design and delivery of projects with the Indian Red Cross Society across 4 states in India. Her work with children- preschoolers, high schoolers and youth made significant contributions to healthier and safer growing years for young people. \nShe stood out for her commitment, professionalism, community engagement and integrity. I wish her latest endeavour for teenagers the very best",
    name: language === "kn" ? "ಕಾನ್ರಾಡ್ ಸಾವೇ" : "Conrad Sauvé",
    title: language === "kn" ? "ಮುಖ್ಯ ಕಾರ್ಯನಿರ್ವಾಹಕ ಅಧಿಕಾರಿ (CEO), ಕೆನಡಿಯನ್ ರೆಡ್ ಕ್ರಾಸ್ | ಒಟ್ಟಾವಾ" : "CEO, Canadian Red Cross | Ottawa",
    img: Conrad,
    imgPosition: "50% 30%",
    imgScale: 1,
    imgAlign: "left",
  },
  {
    quote: language === "kn"
      ? "ಐರೀನ್ ಅವರ ಸಹೋದ್ಯೋಗಿಯಾಗಿ ನಾನು ಅತ್ಯಂತ ಮೆಚ್ಚಿದ ಗುಣಗಳು ಅವರ ನಿಷ್ಠೆ, ಪ್ರಾಮಾಣಿಕತೆ ಮತ್ತು ಕೆಲಸದ ಮೇಲಿನ ಆಳವಾದ ಬದ್ಧತೆ. ಚಿಂತನಶೀಲ ನಾಯಕತ್ವ, ಅತ್ಯುತ್ತಮ ವ್ಯಕ್ತಿಗತ ಸಂಬಂಧ ಕೌಶಲ್ಯಗಳು ಹಾಗೂ ಸಮತೋಲನದ ವೃತ್ತಿಪರ ದೃಷ್ಟಿಕೋನವನ್ನು ಅವರು ಸದಾ ಸಮನ್ವಯಗೊಳಿಸುತ್ತಿದ್ದರು. ಸಿಬ್ಬಂದಿ ಮತ್ತು ಫಲಾನುಭವಿಗಳೊಂದಿಗೆ ಅವರ ಕೆಲಸವು ಅವರ ಸಾಮರ್ಥ್ಯ, ಕಾಳಜಿ ಮತ್ತು ಮಾನವೀಯ ಮೌಲ್ಯಗಳನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ಪ್ರತಿಬಿಂಬಿಸುತ್ತಿತ್ತು.\nಹಿರಿಯರು, ಯುವ ಸಹೋದ್ಯೋಗಿಗಳು ಮತ್ತು ಫಲಾನುಭವಿಗಳೊಂದಿಗೆ ಅವರು ಸದಾ ಗೌರವಯುತ ಹಾಗೂ ಸಹಕಾರದ ಸಂಬಂಧಗಳನ್ನು ಬೆಳೆಸಿಕೊಂಡಿದ್ದರು. ಆದರೆ ಅವರಲ್ಲಿ ನನ್ನನ್ನು ಅತ್ಯಂತ ಪ್ರಭಾವಿಸಿದ ಗುಣಗಳೆಂದರೆ ಅವರ ನೈಜತೆ, ನೈತಿಕ ಸ್ಪಷ್ಟತೆ ಮತ್ತು ತಮ್ಮ ಕೆಲಸದ ಮೂಲಕ ಅರ್ಥಪೂರ್ಣ ಹಾಗೂ ಜವಾಬ್ದಾರಿಯುತ ಬದಲಾವಣೆಯನ್ನು تರಬೇಕೆಂಬ ಪ್ರಾಮಾಣಿಕ ಬದ್ಧತೆ.\n'ಇಕಿಗೈ ಟೀನ್' ಸಂಸ್ಥಾಪಕಿಯಾಗಿ ಅವರ ಹೊಸ ಪಯಣದಲ್ಲಿ ಅವರು ಅತ್ಯುತ್ತಮ ಯಶಸ್ಸು ಸಾಧಿಸುವುದನ್ನು ನೋಡುವುದು ನನಗೆ ಆಳವಾದ ಸಂತೋಷವನ್ನು ನೀಡುತ್ತದೆ."
      : "What I valued about Irene as a colleague was her integrity and depth of engagement. Irene combined thoughtful leadership with strong interpersonal skills and a grounded professional approach. Her work with staff and beneficiaries reflected both competence and care. \nShe worked well with both senior and young team members, and beneficiaries always maintaining and ensuring respectful and collaborative relationships. What stood out most was her authenticity, ethical clarity, and her sincere commitment to creating meaningful and responsible connection and impact through her work. It would be a renewed pleasure to see her ace in her new profile as the Founder of Ikigai Teen.",
    name: language === "kn" ? "ಪ್ಯಾಟ್ರಿಜಿಯಾ ಕೋಪೊಲಾ" : "Patrizia Coppola",
    title: language === "kn" ? "ಜಿಯೋವೆ, ಇಟಲಿ\nಮಾಜಿ ನ್ಯಾಷನಲ್ ಸೊಸೈಟಿ ಡೆವಲಪ್ಮೆಂಟ್ ಪ್ರತಿನಿಧಿ, ಅಂತರರಾಷ್ಟ್ರೀಯ ರೆಡ್ ಕ್ರಾಸ್ ಮತ್ತು ರೆಡ್ ಕ್ರೆಸೆಂಟ್ ಮಹಾಸಂಘ (IFRC)" : "Giove, Italy — Former IFRC National Society Development Delegate",
    img: Patrizia,
    imgPosition: "50% 5%",
    imgScale: 1,
    imgAlign: "left",
  },
  {
    quote: language === "kn"
      ? "ಸಮುದಾಯ ಮತ್ತು ಶಾಲೆಗಳಿಗಾಗಿ ಕೈಗೊಂಡ ಹಲವು ಉಪಕ್ರಮಗಳಲ್ಲಿ ಐರೀನ್ ಅವರೊಂದಿಗೆ ಕೆಲಸ ಮಾಡುವ ಅವಕಾಶ ನನಗೆ ದೊರೆಯಿತು. ಅವರ ನಾಯಕತ್ವದ ಜನಕೇಂದ್ರಿತ ದೃಷ್ಟಿಕೋನವನ್ನು ನಾನು ಹೃತ್ಪೂರ್ವಕವಾಗಿ ಮೆಚ್ಚಿದ್ದೇನೆ.\nಅವರು ಕೈಗೆತ್ತಿಕೊಳ್ಳುವ ಪ್ರತಿಯೊಂದು ಕಾರ್ಯದಲ್ಲೂ ಪ್ರಾಮಾಣಿಕತೆ, ಜವಾಬ್ದಾರಿತನ ಮತ್ತು ಭಾವನಾತ್ಮಕ ಪ್ರಬುದ್ಧತೆ ಸ್ಪಷ್ಟವಾಗಿ ಕಾಣಿಸುತ್ತದೆ. ಐರೀನ್ ಅವರನ್ನು ویژهವಾಗಿಸುವ ಗುಣವೆಂದರೆ ಬುದ್ಧಿವಂತಿಕೆ ಮತ್ತು ಮಾನವೀಯತೆಯ ಸಮತೋಲನದೊಂದಿಗೆ ನಾಯಕತ್ವ ವಹಿಸುವ ಅವರ ಸಾಮರ್ಥ್ಯ. ಅವರು ಎಲ್ಲರ ಮಾತನ್ನೂ ಗಮನದಿಂದ ಆಲಿಸುತ್ತಾರೆ, ಫಲಿತಾಂಶಗಳ ಜವಾಬ್ದಾರಿಯನ್ನು ಸ್ವೀಕರಿಸುತ್ತಾರೆ ಹಾಗೂ ತಂಡದ ಪ್ರತಿಯೊಬ್ಬ ಸದಸ್ಯನಿಗೂ ಅಗತ್ಯವಾದ ಬೆಂಬಲವನ್ನು ನಿರಂತರವಾಗಿ ಒದಗಿಸುತ್ತಾರೆ.\nವಿಶೇಷವಾಗಿ ಮಕ್ಕಳು ಮತ್ತು ತರುಣರೊಂದಿಗೆ ಅವರ ಸಂವಹನ ಅತ್ಯಂತ ಸಂವೇದನಾಶೀಲ, ಗೌರವಯುತ ಮತ್ತು ಅರ್ಥಪೂರ್ಣವಾಗಿರುತ್ತದೆ. ತಮ್ಮ ಅಭಿಪ್ರಾಯಗಳನ್ನು ಮುಕ್ತವಾಗಿ ವ್ಯಕ್ತಪಡಿಸಲು, ಕೇಳಿಸಿಕೊಳ್ಳಲು ಮತ್ತು ಗೌರವಿಸಲ್ಪಡಲು ಅವರು ಸುರಕ್ಷಿತ ಹಾಗೂ ವಿಶ್ವಾಸಾರ್ಹ ವಾತಾವರಣವನ್ನು ನಿರ್ಮಿಸುತ್ತಾರೆ. ಸಂಕೋಚ ಹೊಂದಿರುವ ತರುಣರಲ್ಲಿಯೂ ವಿಶ್ವಾಸ ಬೆಳೆಸಿ, ಅವರನ್ನು ಸಕ್ರಿಯವಾಗಿ ಭಾಗವಹಿಸಲು ಪ್ರೇರೇಪಿಸುವ ಸಹಜ ಸಾಮರ್ಥ್ಯ ಅವರಿಗೆ ಇದೆ.\nಅವರು ಆರಂಭಿಸಿರುವ ‘ಇಕಿಗೈ ಟೀನ್’ ಉಪಕ್ರಮಕ್ಕೆ ನನ್ನ ಹೃತ್ಪೂರ್ವಕ ಶುಭಾಶಯಗಳು. ಈ ಮಹತ್ವದ ಕಾರ್ಯವು ಅತ್ಯುತ್ತಮ ಯಶಸ್ಸು ಸಾಧಿಸಲಿ ಎಂದು ಹಾರೈಸುತ್ತೇನೆ."
      : "I had the opportunity to work with Irene on several community and school initiatives, and I deeply appreciated her people-centred approach to leadership. \nShe brings sincerity, accountability, and emotional intelligence into every project she handles. What sets Irene apart is her ability to lead with both head and heart. She listens actively, takes ownership of outcomes, and ensures that team members feel supported throughout.\nHer engagement with children and youth was especially thoughtful and respectful. Irene consistently created environments where young people felt heard, valued, and safe to express themselves. She has a natural ability to build trust and encourage participation, even among the most hesitant voices. i wish her all the Best for the new Project.",
    name: language === "kn" ? "ಡಾ. ಕುಮಾರ್ ವಿ. ಎಲ್. ಎಸ್." : "Dr. Kumar V.L.S",
    title: language === "kn"
      ? "ಮಾಸ್ಟರ್ ಟ್ರೈನರ್ – ವಿಪತ್ತು ನಿರ್ವಹಣೆ ಮತ್ತು ಪ್ರಥಮ ಚಿಕಿತ್ಸೆ\nರಾಷ್ಟ್ರೀಯ ಹಾಗೂ ದಕ್ಷಿಣ ಏಷ್ಯಾ ಪ್ರಾದೇಶಿಕ ವಿಪತ್ತು ಪ್ರತಿಕ್ರಿಯಾ ತಂಡ\nಭಾರತೀಯ ರೆಡ್ ಕ್ರಾಸ್ ಸೊಸೈಟಿ"
      : "Master Trainer-Disaster Management and First Aid. \nNational & South Aisa Regional Disaster Response Team\nIndian Red Cross Society",
    img: Kumar,
    imgPosition: "50% -80%",
    imgScale: 1.4,
    imgAlign: "left",
  },
  {
    quote: language === "kn"
      ? "ಭಾರತದಲ್ಲಿನ ಕೆನಡಿಯನ್ ರೆಡ್ ಕ್ರಾಸ್ ನಿಯೋಗದ ಮುಖ್ಯಸ್ಥನಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸಿದ್ದ ಅವಧಿಯಲ್ಲಿ, ಐರೀನ್ ಅವರು ನಮ್ಮ ನಿಯೋಗದ ಕಾರ್ಯಕ್ರಮ ವ್ಯವಸ್ಥಾಪಕರಾಗಿದ್ದರು. ಮಕ್ಕಳು ಮತ್ತು ತರುಣರ ಬೆಳವಣಿಗೆಯನ್ನು ಕೇಂದ್ರವಾಗಿಟ್ಟುಕೊಂಡ ಶಾಲಾ ಹಾಗೂ ಸಮುದಾಯ ಆಧಾರಿತ ಉಪಕ್ರಮಗಳಿಗೆ ಅವರು ಯಶಸ್ವಿಯಾಗಿ ನಾಯಕತ್ವ ನೀಡಿದರು.\nತಮ್ಮ ಕಾರ್ಯದಲ್ಲಿ ಅವರು ವೃತ್ತಿಪರತೆ, ಸಹಾನುಭೂತಿ ಮತ್ತು ನೈತಿಕ ಸ್ಪಷ್ಟತೆಯ ಅಪರೂಪದ ಸಮತೋಲನವನ್ನು ಪ್ರದರ್ಶಿಸಿದರು. ಅವರ ನೈಜತೆ, ಪ್ರಬುದ್ಧತೆ ಮತ್ತು ಪ್ರಾಮಾಣಿಕ ನಡೆ ಎಲ್ಲರ ವಿಶ್ವಾಸವನ್ನು ಗಳಿಸಿತು.\nವಿದ್ಯಾರ್ಥಿಗಳು, ಶಿಕ್ಷಕರು ಮತ್ತು ತಂಡದ ಸದಸ್ಯರೊಂದಿಗೆ ಅರ್ಥಪೂರ್ಣ ಸಂಬಂಧವನ್ನು ಬೆಳೆಸುವ ಸಹಜ ಸಾಮರ್ಥ್ಯ ಐರೀನ್ ಅವರಿಗೆ ಇದೆ. ಅವರು ಮುನ್ನಡೆಸುವ ಪ್ರತಿಯೊಂದು ಕಾರ್ಯಕ್ರಮವೂ ಮಾನವೀಯ ಕಾಳಜಿ, ಗೌರವ ಮತ್ತು ನಿಜವಾದ ಸ್ಪಂದನೆಯ ಮೌಲ್ಯಗಳ ಮೇಲೆ ಆಧಾರಿತವಾಗಿರುತ್ತದೆ."
      : "In my capacity as Canadian Red Cross Head of Delegation for India, Irene served as the delegation's Program Manager, including on school- and community-based initiatives focused on children and youth development. She brought a rare balance of professionalism, empathy, and ethical clarity to her work, consistently earning trust through her authenticity and maturity. \nIrene possesses a natural ability to connect meaningfully with students, educators, and teams alike, ensuring program delivery is always grounded in sincere care and genuine human sensitivity.",
    name: language === "kn" ? "ಹೋವರ್ಡ್ ಆರ್ಫಿನ್" : "Howard Arfin",
    title: language === "kn" ? "ಕೆನಡಾ" : "Canada",
    img: Howard,
    imgPosition: "50% 28%",
    imgScale: 0.85,
    imgAlign: "left",
  },
  {
    quote: language === "kn"
      ? "2011ರಲ್ಲಿ ನಾನು ಕೆನಡಿಯನ್ ರೆಡ್ ಕ್ರಾಸ್ಗೆ ಸೇರಿದಾಗ, ಐರೀನ್ ಅವರು ಸಂಸ್ಥೆಯ ಕಾರ್ಯಕ್ರಮಗಳ ಉಸ್ತುವಾರಿ ವಹಿಸಿಕೊಂಡಿದ್ದರು. ಆ ಸಮಯದಲ್ಲಿ ಅವರೊಂದಿಗೆ ಕೆಲಸ ಮಾಡುವ ಅವಕಾಶ ನನಗೆ ದೊರೆಯತು. ಮಕ್ಕಳ ಮತ್ತು ತರುಣರ ಹಿತಾಸಕ್ತಿಯೇ ಪ್ರತಿಯೊಂದು ಕಾರ್ಯದ ಕೇಂದ್ರಬಿಂದುವಾಗಿರಬೇಕು ಎಂಬ ಅಚಲ ಬದ್ಧತೆ ನನ್ನನ್ನು ಅತ್ಯಂತ ಪ್ರಭಾವಿಸಿತು. ನಮ್ಮ ತಂಡವನ್ನೂ ಅವರು ಸದಾ ಅದೇ ದೃಷ್ಟಿಕೋನದಲ್ಲಿ ಮುನ್ನಡೆಸುತ್ತಿದ್ದರು.\nಐರೀನ್ ಅವರ ಕಾರ್ಯಶೈಲಿಯಲ್ಲಿ ಸ್ಪಷ್ಟತೆ, ಸಹಾನುಭೂತಿ ಮತ್ತು ಉದ್ದೇಶಪೂರ್ವಕ ದೃಷ್ಟಿಕೋನದ ಸುಂದರ ಸಮತೋಲನವಿದೆ. ತರುಣರು ಮತ್ತು ವಯಸ್ಕರೊಂದಿಗೆ ಅವರು ಸಹಜವಾಗಿ ವಿಶ್ವಾಸದ ಸಂಬಂಧವನ್ನು ಬೆಳೆಸುತ್ತಾರೆ. ತರುಣರು ಸುರಕ್ಷಿತವಾಗಿ, ಮುಕ್ತವಾಗಿ ಮತ್ತು ಗೌರವದಿಂದ ತಮ್ಮ ಅಭಿಪ್ರಾಯಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳುವ ವಾತಾವರಣವನ್ನು ಅವರು ನಿರ್ಮಿಸುತ್ತಾರೆ. ಜೊತೆಗೆ, ಹೊರಗೆ ಕಾಣುವ ವರ್ತನೆಯಾಚೆಗಿನ ನಿಜವಾದ ಅಗತ್ಯಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವ ಚಿಂತನಶೀಲ ಮತ್ತು ಸೂಕ್ಷ್ಮ ಮನೋಭಾವ ಅವರದು.\nಅವರ ಸ್ಥಿರ ನಾಯಕತ್ವ, ಅರ್ಥಪೂರ್ಣ ಮತ್ತು ಜವಾಬ್ದಾರಿಯುತ ಕಾರ್ಯದ ಮೇಲಿನ ಬದ್ಧತೆಯನ್ನು ನಾನು ಸದಾ ಮೆಚ್ಚಿದ್ದೇನೆ. 'ಇಕಿಗೈ ಟೀನ್' ಮೂಲಕವೂ ಅವರು ತರುಣರನ್ನು ಬೆಳೆಸುವ, ಸಬಲಗೊಳಿಸುವ ಮತ್ತು ಅವರ ಜೀವನದಲ್ಲಿ ಅರ್ಥಪೂರ್ಣ ಬದಲಾವಣೆ ತರುವ ವೇದಿಕೆಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ನಿರ್ಮಿಸಲಿದ್ದಾರೆ ಎಂಬ ವಿಶ್ವಾಸ ನನಗಿದೆ."
      : "I had the opportunity to work with Irene when I joined the Canadian Red Cross in 2011, where she oversaw the CRC programmes. What stood out to me was her unwavering focus on the well-being of children and young people, and how she consistently guided the team to keep this at the centre of our work.\nIrene brings a strong balance of clarity, empathy, and intentionality into her practice. She connects naturally with both youth and adults, creating spaces where young people feel safe, heard, and respected. At the same time, she is thoughtful and reflective, often looking beyond surface behaviours to understand deeper needs.\nI have always appreciated her grounded leadership and her commitment to meaningful and responsible work. I am confident that through IKIGAI TEEN, she will continue to create impactful spaces that support and empower young people.",
    name: language === "kn" ? "ಮಣಿವಣ್ಣನ್ ಪಿ." : "Manivannan P",
    title: language === "kn" ? "ಕೇಂದ್ರ ನಿರ್ದೇಶಕರು\nಟ್ರಾನ್ಸ್ ಫ್ಯಾಮಿಲಿ ಸರ್ವಿಸಸ್, ಸಿಂಗಾಪುರ್" : "Centre Director — Trans Family Services, Singapore",
    img: Manivannan,
    imgPosition: "50% 30%",
    imgScale: 1.4,
    imgAlign: "left",
  },
  {
    quote: language === "kn"
      ? "ನಮ್ಮ ಬಾಲ್ಯದಿಂದಲೇ ನನಗೆ ಐರೀನ್ ಆರತಿ ಅವರ ಪರಿಚಯವಿದೆ. ಅವರು ಯಾವಾಗಲೂ ಚಿಂತನಶೀಲರು, ಹೊಸ ಸವಾಲುಗಳನ್ನು ಸ್ವೀಕರಿಸುವ ಧೈರ್ಯ ಹೊಂದಿದವರು ಮತ್ತು ರೂಢಿಯ ಚೌಕಟ್ಟನ್ನು ಪ್ರಶ್ನಿಸಲು ಹಿಂಜರಿಯದ ವ್ಯಕ್ತಿತ್ವದವರು. ಅವರು ಗಮನವಿಟ್ಟು ಆಲಿಸುತ್ತಾರೆ, ಸರಿಯಾದ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳುತ್ತಾರೆ ಮತ್ತು ಸಂಕೀರ್ಣ ಸಂದರ್ಭಗಳಲ್ಲಿಯೂ ಸ್ಪಷ್ಟವಾದ ದೃಷ್ಟಿಕೋನವನ್ನು ನೀಡುತ್ತಾರೆ.\nನನ್ನ ಜೀವನದ ಅತ್ಯಂತ ಸವಾಲಿನ ಸಂದರ್ಭಗಳಲ್ಲಿ ನಾನು ಮಾರ್ಗದರ್ಶನ, ಸಮತೋಲನದ ಚಿಂತನೆ ಮತ್ತು ಪ್ರಾಮಾಣಿಕ ಸಲಹೆಗಾಗಿ ಅವರನ್ನೇ ಆಶ್ರಯಿಸಿದ್ದೆ. ಕಿರಿಯ ಪೀಳಿಗೆಯನ್ನು ಬೆಳೆಸುವ ಅವರ ಕಾಳಜಿ ಮತ್ತು ಜನರು ಮೌಲ್ಯಾಧಾರಿತ ಜೀವನ ನಡೆಸಲು ನೆರವಾಗಬೇಕೆಂಬ ಅವರ ಬದ್ಧತೆ ಇಂದು ನಾನು ರೂಪುಗೊಂಡಿರುವ ವ್ಯಕ್ತಿತ್ವದ ಮೇಲೂ ಆಳವಾದ ಪ್ರಭಾವ ಬೀರಿದೆ.\nಇಂದು ಅವರು ‘ಇಕಿಗೈ ಟೀನ್’ ಮೂಲಕ ಮಾಡುತ್ತಿರುವ ಕಾರ್ಯವು, ಅವರು ಯಾವಾಗಲೂ ನಂಬಿಕೊಂಡು ಬದುಕಿದ ಮೌಲ್ಯಗಳು ಮತ್ತು ಜೀವನ ಧ್ಯೇಯದ ಸಹಜ ಮುಂದುವರಿಕೆಯಾಗಿದೆ ಎಂಬ ಭಾವನೆ ನನಗಿದೆ."
      : "I’ve known Irene Arathi since our younger years, and she has always been thoughtful, adventurous, and unafraid to challenge the status quo. She listens deeply, asks the right questions, and brings clarity to complex situations. \nDuring some of the most challenging periods of my life, she was the person I turned to for perspective, grounding, and honest guidance. Her passion for nurturing younger generations and helping people navigate life with integrity has profoundly shaped who I am today. The work she does now feels like a natural continuation of who she has always been.",
    name: language === "kn" ? "ಸುನಿಲ್ ಕುಮಾರ್ ರಾಜಾ" : "Sunil Kumar Raja",
    title: language === "kn" ? "ಆಸ್ಟ್ರೇಲಿಯಾ" : "Australia",
    img: Sunil,
    imgPosition: "50% 30%",
    imgScale: 1,
    imgAlign: "left",
  },
  {
    quote: language === "kn"
      ? "1993ರಿಂದ, ಕಾಲೇಜು ದಿನಗಳಿಂದಲೇ ನನಗೆ ಐರೀನ್ ಅವರ ಪರಿಚಯವಿದೆ. ಸ್ನೇಹಿತರ ಜೀವನದಲ್ಲಿನ ಸಣ್ಣ ವಿಷಯಗಳಿಗೂ ಅವರು ತೋರಿಸುತ್ತಿದ್ದ ಕಾಳಜಿ ಮತ್ತು ಸಂವೇದನಾಶೀಲತೆ ಆಗಲೇ ನನ್ನ ಗಮನ ಸೆಳೆದಿತ್ತು. ಯಾವುದನ್ನಾದರೂ ಯಾಕೆ ಅಥವಾ ಹೇಗೆ ಎಂಬ ಪ್ರಶ್ನೆಯ ಮೂಲಕ ಆಳವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವ ಕುತೂಹಲ ಅವರಲ್ಲಿತ್ತು.\nವರ್ಷಗಳು ಕಳೆದಂತೆ ಅವರು ಹೇಳಿದ ಅನೇಕ ಮಾತುಗಳು ನನ್ನ ಮನಸ್ಸಿನಲ್ಲಿ ಉಳಿದುಕೊಂಡಿವೆ. ಜೀವನದ ವೈಯಕ್ತಿಕ ಸವಾಲುಗಳನ್ನು ಎದುರಿಸುವ ಸಂದರ್ಭದಲ್ಲಿ ಅವರ ಆಲೋಚನೆಗಳು ನನ್ನ ನಿರ್ಧಾರಗಳನ್ನು ಹೆಚ್ಚು ಸ್ಪಷ್ಟವಾಗಿ ಮತ್ತು ಆತ್ಮವಿಶ್ವಾಸದಿಂದ ತೆಗೆದುಕೊಳ್ಳಲು ನೆರವಾದವು.\n'ಯಾವುದೇ ಪರಿಸ್ಥಿತಿ ಎದುರಾದರೂ, ತಾಳ್ಮೆ ಮತ್ತು ದೃಢ ಮನಸ್ಸಿನೊಂದಿಗೆ ಸ್ಥಿರವಾಗಿ ನಿಲ್ಲುವುದೇ ನಿಜವಾದ ಶಕ್ತಿ' ಎಂಬ ಅವರ ಮಾತುಗಳು ನನಗೆ ಸದಾ ಸ್ಫೂರ್ತಿಯಾಗಿವೆ. ಕಳೆದ 33 ವರ್ಷಗಳಿಂದ ಸುಖ-ದುಃಖಗಳಲ್ಲಿ, ಹಗಲು-ರಾತ್ರಿ ಎನ್ನದೆ ಅವರು ನೀಡಿರುವ ಬೆಂಬಲವನ್ನು ನಾನು ಎಂದಿಗೂ ಮರೆಯಲಾರೆ.\nಇಂದು ತರುಣರ ಜೀವನದಲ್ಲಿ ಅರ್ಥಪೂರ್ಣ ಬದಲಾವಣೆ ತರಲು ‘ಇಕಿಗೈ ಟೀನ್’ ಮೂಲಕ ಅವರು ತಮ್ಮ ಸಂಪೂರ್ಣ ಸಮರ್ಪಣೆಯೊಂದಿಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿರುವುದನ್ನು ಕಂಡು ನನಗೆ ಅಪಾರ ಹೆಮ್ಮೆ ಉಂಟಾಗಿದೆ."
      : "I've known Irene since 1993 from college for her passion about small things that mattered to each friend in every way. She has always been curious to question why or what made one think a certain way. Over the years some of her words stayed with me and made a very strong impact on my decision making when stuck with a personal issues in life. \nShe has influenced me by saying 'staying strong with patience and a strong mind is the the best in the hardest of times no matter what the situation was. She continues to be a great support through thick & thin day/night - 33 years since. I am proud as she is giving her all to what she believes in - making a difference in lives of teens through Ikigai Teen.",
    name: language === "kn" ? "ಆರ್ಚಿ (ಅರ್ಚನಾ ಜಯಪ್ರಸಾದ್)" : "Archana Jayaprasad",
    title: language === "kn" ? "ಚಿಕಾಗೋ, U.S.A" : "Chicago",
    img: Archana,
    imgPosition: "50% 50%",
    imgScale: 1,
    imgAlign: "left",
  },
  {
    quote: language === "kn"
      ? "ನನ್ನ ತರುಣಾವಸ್ಥೆಯಲ್ಲೇ ಶಿಕ್ಷಕಿಯಾಗಿ ಐರೀನ್ ಆರತಿ ಅವರನ್ನು ಪರಿಚಯಿಸಿಕೊಂಡೆ. ಅವರು ಸದಾ ಉತ್ಸಾಹಭರಿತರು, ಪ್ರಸ್ತುತ ಕ್ಷಣದಲ್ಲಿ ಸಂಪೂರ್ಣವಾಗಿ ತೊಡಗಿಸಿಕೊಳ್ಳುವವರು, ಚಿಂತನಶೀಲರು, ಅಭಿವ್ಯಕ್ತಿಶೀಲರು ಹಾಗೂ ಯಾರೊಂದಿಗೂ ಸಹಜವಾಗಿ ಬೆರೆಯುವ ವ್ಯಕ್ತಿತ್ವದವರಾಗಿದ್ದರು. ಜನರು ಮತ್ತು ವಿಚಾರಗಳೊಂದಿಗೆ ಆಳವಾಗಿ ಸಂವಾದ ನಡೆಸುವುದು ಅವರ ಸಹಜ ಗುಣವಾಗಿತ್ತು.\nಅವರು ಎಲ್ಲರ ಮಾತನ್ನೂ ಗಮನದಿಂದ ಆಲಿಸುತ್ತಿದ್ದರು, ಪ್ರಶ್ನೆಗಳ ಮೂಲಕ ಚಿಂತನೆಗೆ ಪ್ರೇರೇಪಿಸುತ್ತಿದ್ದರು ಮತ್ತು ಸಂವಾದಗಳಿಗೆ ಸ್ಪಷ್ಟತೆ ನೀಡಲು ಪ್ರಯತ್ನಿಸುತ್ತಿದ್ದರು. ಅವರನ್ನು ಪರಿಚಯಿಸಿಕೊಂಡಿರುವುದು ನನಗೆ ಹೆಮ್ಮೆಯ ವಿಷಯ. ಮುಂದಿನ ಪೀಳಿಗೆಗಾಗಿ ಉತ್ತಮ ಸಮಾಜವನ್ನು ನಿರ್ಮಿಸುವ ಅವರ ವಿವಿಧ ಉಪಕ್ರಮಗಳು ನನಗೆ ಸದಾ ಸ್ಫೂರ್ತಿ ನೀಡಿವೆ.\nತಮ್ಮ ಜೀವನದ ಅನುಭವಗಳು ಮತ್ತು ಕಲಿಕೆಯನ್ನು ಸಮಾಜದ ಒಳಿತಿಗಾಗಿ, ವಿಶೇಷವಾಗಿ ಈ ಅತ್ಯಂತ ಮಹತ್ವದ ವಯಸ್ಸಿನ ತರುಣರ ಅಭಿವೃದ್ಧಿಗಾಗಿ ‘ಇಕಿಗೈ ಟೀನ್’ ಮೂಲಕ ಅರ್ಥಪೂರ್ಣವಾಗಿ ರೂಪಿಸಿರುವುದು ನಿಜಕ್ಕೂ ಸಂತಸದ ಹಾಗೂ ಪ್ರೇರಣಾದಾಯಕ ಸಂಗತಿಯಾಗಿದೆ."
      : "I’ve known Irene Arathi in her teaching capacity since my teenage years, and I remember her as someone who was very lively, in the moment always, thoughtful, expressive and very easy to talk to, naturally inclined to engage deeply with people and ideas.\nShe always listened, questioned, and tried to bring clarity to conversations. Very proud to have known her and inspired by her initiatives in making a better world for our future generations to come. It is an exhilarating experience to know how she has integrated her learnings and experiences for the upliftment of society and especially teens in this crucial age.",
    name: language === "kn" ? "ರೇಷ್ಮಾ ಕೆ. ವಿ." : "Reshma KV",
    title: language === "kn" ? "ಕ್ಲೈಂಟ್ ಆಪರೇಷನ್ಸ್ ಡೆಲಿವರಿ ಅನಾಲಿಸ್ಟ್\nಸಿಸ್ಕೋ ಸಿಸ್ಟಮ್ಸ್ ಪ್ರೈವೇಟ್ ಲಿಮಿಟೆಡ್" : "Client Operations Delivery Analyst — Cisco Systems Pvt Ltd",
    img: Reshma,
    imgPosition: "50% 20%",
    imgScale: 1,
    imgAlign: "left",
  },
  {
    quote: language === "kn"
      ? "'ಇಕಿಗೈ ಟೀನ್' ಎಂಬ ಕನಸು ಮಕ್ಕಳ, ತರುಣರ ಮತ್ತು ಕುಟುಂಬಗಳಿಗಾಗಿ ಅರ್ಥಪೂರ್ಣ ವೇದಿಕೆಯಾಗಿ ರೂಪುಗೊಳ್ಳುತ್ತಿರುವುದನ್ನು ನೋಡುವುದು ನಿಜಕ್ಕೂ ಸಂತೋಷ ಮತ್ತು ಸ್ಫೂರ್ತಿದಾಯಕವಾಗಿದೆ. ಕರ್ನಾಟಕ ರಾಜ್ಯ ಭಾರತೀಯ ರೆಡ್ ಕ್ರಾಸ್ ಸೊಸೈಟಿಯೊಂದಿಗೆ ನನ್ನ ಒಡನಾಟದ ಸಂದರ್ಭದಲ್ಲಿ, ಐರೀನ್ ಅವರ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ಮಾರ್ಗದರ್ಶಕತ್ವವನ್ನು ಪಡೆಯುವ ಅವಕಾಶ ನನಗೆ ದೊರೆಯಿತು. ಆ ಅನುಭವವನ್ನು ನಾನು ಇಂದಿಗೂ ಅತ್ಯಂತ ಮೌಲ್ಯಯುತವೆಂದು ಪರಿಗಣಿಸುತ್ತೇನೆ.\nವಿಶೇಷವಾಗಿ ಮಕ್ಕಳು ಮತ್ತು ತರುಣರೊಂದಿಗೆ ಕೆಲಸ ಮಾಡುವಲ್ಲಿ ಅವರ ಮಾರ್ಗದರ್ಶನದ ಸಾಮರ್ಥ್ಯ ಅನುಕರಣೀಯವಾಗಿದೆ. ಅವರಲ್ಲಿ ಸಹಾನುಭೂತಿ, ತಾಳ್ಮೆ ಮತ್ತು ಉನ್ನತ ವೃತ್ತಿಪರತೆ ಅತ್ಯಂತ ಸಹಜವಾಗಿ ಒಂದಾಗಿವೆ. ಪ್ರತಿಯೊಂದು ಉಪಕ್ರಮದಲ್ಲೂ ಅವರು ತೋರಿಸುವ ಪ್ರಾಮಾಣಿಕತೆ, ನೈತಿಕ ಸ್ಪಷ್ಟತೆ ಮತ್ತು ಮಾನವಕೇಂದ್ರಿತ ದೃಷ್ಟಿಕೋನವನ್ನು ನಾನು ಸದಾ ಮೆಚ್ಚಿದ್ದೇನೆ.\n'ಇಕಿಗೈ ಟೀನ್' ಮುಂದಿನ ದಿನಗಳಲ್ಲಿ ಅನೇಕ ತರುಣರು ಮತ್ತು ಕುಟುಂಬಗಳ ವಿಶ್ವಾಸ ಗಳಿಸುವ, ಅವರ ಜೀವನದಲ್ಲಿ ಸಕಾರಾತ್ಮಕ ಬದಲಾವಣೆ ತರುವ ಪರಿಣಾಮಕಾರಿ ವೇದಿಕೆಯಾಗಲಿದೆ ಎಂಬ ವಿಶ್ವಾಸ ನನಗಿದೆ."
      : "It is truly inspiring to see the Ikigai Teen vision taking shape into a meaningful platform for children, youth, and families. During my association with the Indian Red Cross Society, Karnataka State Branch, I had the opportunity to receive guidance and mentorship from Irene which I continue to value deeply.\nHer mentoring abilities, especially for working with children and youth, are truly exemplary and reflect great empathy, patience, and professionalism. I have always admired the sincerity, ethical clarity, and human-centred approach she brings into every initiative. I am sure Ikigai Teen Hub will become a trusted and impactful space that positively influences many young lives and families.",
    name: language === "kn" ? "ದಿಲೀಪ್ ಸಿ. ಎಸ್." : "Dilip C.S",
    title: language === "kn" ? "ಉದ್ಯಮಿ | ಸಹ-ಸಂಸ್ಥಾಪಕ, ಕಲ್ಪ ಅಮೃತ" : "Entrepreneur | Co-Founder, Kalpamrutha",
    img: Dilip,
    imgPosition: "50% 0%",
    imgScale: 1,
    imgAlign: "left",
  },
];

const TestimonialSlide = ({ testimonial }: { testimonial: Testimonial }) => {
  const contentRef = useRef<HTMLElement>(null);

  return (
    <div className="min-w-full flex-shrink-0 flex justify-center px-1.5 sm:px-3 md:px-4">
      <article
        ref={contentRef}
        className="relative w-full max-w-[calc(100vw-3.5rem)] md:max-w-4xl bg-card rounded-lg md:rounded-2xl border border-border/60 p-4 sm:p-6 md:p-10 min-h-[320px] md:min-h-[400px] flex flex-col justify-center"
      >
        <TextToSpeechButton targetRef={contentRef} label={`Read testimonial from ${testimonial.name}`} />
        <div
          className={`flex flex-col md:flex-row items-start gap-4 md:gap-8 ${
            testimonial.imgAlign === "right" ? "md:flex-row-reverse" : ""
          }`}
        >
          <div
            className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 rounded-2xl overflow-hidden"
            style={{ borderRadius: '0.75rem' }}
          >
            <img
              src={testimonial.img}
              alt={testimonial.name}
              className="w-full h-full object-cover rounded-xl"
              style={{
                objectPosition: testimonial.imgPosition ?? "50% 30%",
                transform: `scale(${testimonial.imgScale ?? 1})`,
                transition: "transform 300ms ease",
                borderRadius: '0.5rem',
              }}
            />
          </div>
          <div className="text-[12px] sm:text-sm md:text-base leading-relaxed text-left">
            <div className="text-foreground mb-3 md:mb-5 whitespace-pre-line italic">“{testimonial.quote}”</div>
            <div className="space-y-0.5">
              <p className="font-semibold text-primary">{testimonial.name}</p>
              {testimonial.title && <p className="text-xs md:text-sm text-muted-foreground whitespace-pre-line">{testimonial.title}</p>}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

const TestimonialCarousel = () => {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const { language } = useLanguage();
  const activeTestimonials = getTestimonials(language);

  useEffect(() => {
    // advance every 7 seconds
    intervalRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % activeTestimonials.length);
    }, 7000);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [activeTestimonials.length]);

  return (
    <section className="py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
          {language === "kn" ? "ಜನರು ಏನು ಹೇಳುತ್ತಾರೆ?" : "What People Say"}
        </h2>

        <div className="relative overflow-hidden">
          <div
            className="flex"
            style={{
              transform: `translateX(-${index * 100}%)`,
              transition: "transform 700ms ease-in-out",
            }}
          >
            {activeTestimonials.map((testimonial) => (
              <TestimonialSlide key={testimonial.name} testimonial={testimonial} />
            ))}
          </div>

          <div className="flex justify-center gap-3 mt-6">
            {activeTestimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === index}
                className={`w-3 h-3 rounded-full transition-colors duration-200 focus:outline-none ${
                  i === index
                    ? "bg-[#2C423F]"
                    : "bg-white/70 border border-[#2C423F]/10 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
