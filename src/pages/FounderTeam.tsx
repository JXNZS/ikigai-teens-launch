import { useState, type CSSProperties } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { LetterSwapForward } from "@/components/ui/letter-swap";
import { useLanguage } from "@/context/LanguageContext";
import { type Language } from "@/lib/translations";

import irenePhoto from "@/assets/Irene.jpeg";
import zubaidaPhoto from "@/assets/Zubaida.jpeg";
import barakatPhoto from "@/assets/Barakat.jpg";
import poorviPhoto from "@/assets/Poorvi.jpeg";
import jeevanPhoto from "@/assets/Jeevan.PNG";
import jiyaPhoto from "@/assets/Jiya.jpg";

type TeamMember = {
	name: string;
	role: string;
	region?: string;
	image: string;
	imageClassName?: string;
	imageStyle?: CSSProperties;
	quote: string;
	bio: string[];
	extendedBio?: string[];
};

const getTeamMembers = (language: Language): TeamMember[] => [
	{
		name: language === "kn" ? "ಐರೀನ್ ಆರತಿ" : "Irene Arathi Pais",
		role: language === "kn" ? "ಸಂಸ್ಥಾಪಕಿ – ಇಕಿಗೈ ಟೀನ್" : "Founder, Ikigai Teen",
		image: irenePhoto,
		imageStyle: { objectPosition: "50% 40%", transform: "translateX(-23%) scale(1.95)", transformOrigin: "center center" },
		quote: language === "kn"
			? "ತರುಣರು ತಮ್ಮನ್ನು ತಾವು ಬೇಗ ಅರಿತುಕೊಂಡಾಗ, ತಮ್ಮ ಭವಿಷ್ಯವನ್ನು ಸ್ಪಷ್ಟತೆ ಮತ್ತು ಧೈರ್ಯದಿಂದ ರೂಪಿಸಿಕೊಳ್ಳುವ ಶಕ್ತಿ ಅವರೊಳಗೆ ಬೆಳೆಯುತ್ತದೆ."
			: "When young people understand themselves early, they gain the power to shape their future with clarity and courage.",
		bio: language === "kn"
			? [
					"ಐರೀನ್ ಆರತಿ ಆತ್ಮಜಾಗೃತಿ, ಸ್ಥೈರ್ಯ ಮತ್ತು ಮೌಲ್ಯಾಧಾರಿತ ಜೀವನವನ್ನು ಬೆಳೆಸುವ ಮೂಲಕ ತರುಣರು ಜವಾಬ್ದಾರಿಯುತ ವ್ಯಕ್ತಿಗಳಾಗಿ ಬೆಳೆಯಲು ನೆರವಾಗುವ ಇಕಿಗೈ ಟೀನ್ ಸಂಸ್ಥೆಯ ಸಂಸ್ಥಾಪಕಿ.",
					"ಮಾನವ ಸಂಪನ್ಮೂಲ ನಿರ್ವಹಣೆ, ವಿಪತ್ತು ನಿರ್ವಹಣೆ, ಯುದ್ಧ ಮತ್ತು ಸಂಘರ್ಷ ಪೀಡಿತ ಪ್ರದೇಶಗಳಲ್ಲಿ ಎರಡು ದಶಕಗಳಿಗಿಂತ ಹೆಚ್ಚಿನ ವೃತ್ತಿಪರ ಅನುಭವ ಹೊಂದಿರುವ ಐರೀನ್ ಅವರು ಭಾರತ, ಇರಾಕ್, ಸುಡಾನ್, ಇಥಿಯೋಪಿಯಾ ಮತ್ತು ಹೈಟಿ ಸೇರಿದಂತೆ ವಿಶ್ವದ ಹಲವು ಪರಿಸರಗಳಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸಿದ್ದಾರೆ. ಅಂತರರಾಷ್ಟ್ರೀಯ ರೆಡ್ ಕ್ರಾಸ್ ಚಳವಳಿ, ವಿಶ್ವಸಂಸ್ಥೆಯ ವ್ಯವಸ್ಥೆ ಹಾಗೂ ಆಕ್ಸ್ಫ್ಯಾಮ್ ಮೊದಲಾದ ಅಂತರರಾಷ್ಟ್ರೀಯ ಸಂಸ್ಥೆಗಳೊಂದಿಗೆ ಅವರು ವಿಪತ್ತು ನಿರ್ವಹಣೆ, ಸಂಘರ್ಷ ಪೀಡಿತ ಪ್ರದೇಶಗಳು ಮತ್ತು ಬೃಹತ್ ಮಾನವೀಯ ಕಾರ್ಯಾಚರಣೆಗಳಲ್ಲಿ ಮಹತ್ವದ ಕೊಡುಗೆ ನೀಡಿದ್ದಾರೆ."
				]
			: [
					"Irene Arathi Pais is the founder of Ikigai Teen, a values-driven initiative dedicated to helping young people grow into self-aware, resilient and responsible individuals. With over two decades of professional experience in human resources, humanitarian operations and youth-focused initiatives, Irene has worked in some of the world's most complex environments, including India, Iraq, Sudan, Ethiopia and Haiti. Her work has included roles within the Red Cross movement, United Nations system and international organisations such as Oxfam, where she contributed to programmes in disaster response, conflict contexts and large-scale humanitarian operations.",
					"Through these experiences, Irene witnessed first-hand how resilience, character and inner strength shape the course of a young person's life. Alongside her humanitarian career, she pursued her deep interest in child development and adolescent growth, designing and delivering programmes for high school students across several Indian states that reached over 100,000 students."
				],
		extendedBio: language === "kn"
			? [
					"ಐರೀನ್ ಆರತಿ ಆತ್ಮಜಾಗೃತಿ, ಸ್ಥೈರ್ಯ ಮತ್ತು ಮೌಲ್ಯಾಧಾರಿತ ಜೀವನವನ್ನು ಬೆಳೆಸುವ ಮೂಲಕ ತರುಣರು ಜವಾಬ್ದಾರಿಯುತ ವ್ಯಕ್ತಿಗಳಾಗಿ ಬೆಳೆಯಲು ನೆರವಾಗುವ ಇಕಿಗೈ ಟೀನ್ ಸಂಸ್ಥೆಯ ಸಂಸ್ಥಾಪಕಿ.",
					"ಮಾನವ ಸಂಪನ್ಮೂಲ ನಿರ್ವಹಣೆ, ವಿಪತ್ತು ನಿರ್ವಹಣೆ, ಯುದ್ಧ ಮತ್ತು ಸಂಘರ್ಷ ಪೀಡಿತ ಪ್ರದೇಶಗಳಲ್ಲಿ ಎರಡು ದಶಕಗಳಿಗಿಂತ ಹೆಚ್ಚಿನ ವೃತ್ತಿಪರ ಅನುಭವ ಹೊಂದಿರುವ ಐರೀನ್ ಅವರು ಭಾರತ, ಇರಾಕ್, ಸುಡಾನ್, ಇಥಿಯೋಪಿಯಾ ಮತ್ತು ಹೈಟಿ ಸೇರಿದಂತೆ ವಿಶ್ವದ ಹಲವು ಪರಿಸರಗಳಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸಿದ್ದಾರೆ. ಅಂತರರಾಷ್ಟ್ರೀಯ ರೆಡ್ ಕ್ರಾಸ್ ಚಳವಳಿ, ವಿಶ್ವಸಂಸ್ಥೆಯ ವ್ಯವಸ್ಥೆ ಹಾಗೂ ಆಕ್ಸ್ಫ್ಯಾಮ್ ಮೊದಲಾದ ಅಂತರರಾಷ್ಟ್ರೀಯ ಸಂಸ್ಥೆಗಳೊಂದಿಗೆ ಅವರು ವಿಪತ್ತು ನಿರ್ವಹಣೆ, ಸಂಘರ್ಷ ಪೀಡಿತ ಪ್ರದೇಶಗಳು ಮತ್ತು ಬೃಹತ್ ಮಾನವೀಯ ಕಾರ್ಯಾಚರಣೆಗಳಲ್ಲಿ ಮಹತ್ವದ ಕೊಡುಗೆ ನೀಡಿದ್ದಾರೆ.",
					"ಈ ಅನುಭವಗಳ ಮೂಲಕ, ಜೀವನದ ಸವಾಲುಗಳನ್ನು ಎದುರಿಸಲು ಸ್ಥೈರ್ಯ, ವ್ಯಕ್ತಿತ್ವ ಮತ್ತು ಆಂತರಿಕ ಶಕ್ತಿ ಎಷ್ಟು ಮಹತ್ವದ್ದೆಂಬುದನ್ನು ಅವರು ನೇರವಾಗಿ ಕಂಡಿದ್ದಾರೆ. ಮಾನವೀಯ ಸೇವೆಯ ಜೊತೆಗೆ ಮಕ್ಕಳ ಮತ್ತು ತರುಣರ ಬೆಳವಣಿಗೆಯ ಬಗ್ಗೆ ಇದ್ದ ತಮ್ಮ ಆಸಕ್ತಿಯನ್ನು ಮುಂದುವರಿಸಿಕೊಂಡು, ಭಾರತದ ಹಲವು ರಾಜ್ಯಗಳ ಪ್ರೌಢಶಾಲಾ ವಿದ್ಯಾರ್ಥಿಗಳಿಗಾಗಿ ಜೀವನ ಕೌಶಲ್ಯ ಮತ್ತು ವ್ಯಕ್ತಿತ್ವ ವಿಕಸನ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ರೂಪಿಸಿ, ಒಂದು ಲಕ್ಷಕ್ಕೂ ಹೆಚ್ಚು ವಿದ್ಯಾರ್ಥಿಗಳನ್ನು ತರಬೇತಿ ಮೂಲಕ ತಲುಪಿದ್ದಾರೆ.",
					"ಐರೀನ್ ಅವರು ಸ್ನಾತಕೋತ್ತರ ಪದವೀಧರೆ (M.Sc) ಆಗಿದ್ದು, ಮಕ್ಕಳ ಬೆಳವಣಿಗೆ ಹಾಗೂ ತರುಣರ ಸಬಲೀಕರಣ ಕ್ಷೇತ್ರಗಳಲ್ಲಿ ವಿಶೇಷ ತರಬೇತಿ ಪಡೆದಿದ್ದಾರೆ. ಹಲವು ವರ್ಷಗಳಿಂದ ಶಿಕ್ಷಣ ಸಂಸ್ಥೆಗಳು, ಶಿಕ್ಷಕರು ಹಾಗೂ ಸಮುದಾಯಗಳೊಂದಿಗೆ ಕೈಜೋಡಿಸಿ, ತರುಣರಲ್ಲಿ ಜೀವನ ಕೌಶಲ್ಯಗಳು, ಭಾವನಾತ್ಮಕ ಸ್ಥೈರ್ಯ ಮತ್ತು ಬದುಕಿನ ಉದ್ದೇಶವನ್ನು ಬೆಳೆಸುವ ಕಾರ್ಯದಲ್ಲಿ ತೊಡಗಿಸಿಕೊಂಡಿದ್ದಾರೆ.",
					"ತರುಣಾವಸ್ಥೆಯೇ ಜೀವನದ ಅತ್ಯಂತ ನಿರ್ಣಾಯಕ ಘಟ್ಟ ಎಂಬ ದೃಢ ನಂಬಿಕೆಯಿಂದಲೇ ಇಕಿಗೈ ಟೀನ್ ಹುಟ್ಟಿಕೊಂಡಿತು. ಈ ವಯಸ್ಸಿನಲ್ಲಿ ದೊರೆಯುವ ಸರಿಯಾದ ಮಾರ್ಗದರ್ಶನವು ತರುಣರಿಗೆ ತಮ್ಮನ್ನು ತಾವು ಅರಿತುಕೊಳ್ಳಲು, ದೃಢ ಮೌಲ್ಯಗಳನ್ನು ಬೆಳೆಸಿಕೊಳ್ಳಲು ಮತ್ತು ಸಂಕೀರ್ಣವಾಗುತ್ತಿರುವ ಜಗತ್ತನ್ನು ಆತ್ಮವಿಶ್ವಾಸದಿಂದ ಎದುರಿಸಲು ನೆರವಾಗುತ್ತದೆ ಎಂಬುದು ಅವರ ವಿಶ್ವಾಸ.",
					"ಇಕಿಗೈ ಟೀನ್ ಮೂಲಕ, ತರುಣರು, ಪೋಷಕರು ಮತ್ತು ಶಿಕ್ಷಕರು ಒಟ್ಟಾಗಿ ಮುಂದಿನ ಪೀಳಿಗೆಯನ್ನು ವಿವೇಕಿ, ಸಮರ್ಥ ಮತ್ತು ಸಹಾನುಭೂತಿಯುಳ್ಳ ನಾಯಕರನ್ನಾಗಿ ರೂಪಿಸಲು ನೆರವಾಗುವ ಪ್ರಾಯೋಗಿಕ ಸಾಧನಗಳು, ತರಬೇತಿ ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಸಹಕಾರದ ಸಮುದಾಯವನ್ನು ನಿರ್ಮಿಸುವುದು ಐರೀನ್ ಅವರ ಧ್ಯೇಯವಾಗಿದೆ."
				]
			: [
					"Irene Arathi Pais is the founder of Ikigai Teen, a values-driven initiative dedicated to helping young people grow into self-aware, resilient and responsible individuals.",
					"With over two decades of professional experience in human resources, humanitarian operations and youth-focused initiatives, Irene has worked in some of the world's most complex environments, including India, Iraq, Sudan, Ethiopia and Haiti. Her work has included roles within the Red Cross movement, United Nations system and international organisations such as Oxfam, where she contributed to programmes in disaster response, conflict contexts and large-scale humanitarian operations.",
					"Through these experiences, Irene witnessed first-hand how resilience, character and inner strength shape the course of a young person's life. Alongside her humanitarian career, she pursued her deep interest in child development and adolescent growth, designing and delivering programmes for high school students across several Indian states that reached over 100,000 students.",
					"Irene holds a Master's degree and has been trained in child development and youth engagement practices. Over the years, she has worked closely with educators, institutions and communities to support young people in building life skills, emotional strength and a sense of purpose.",
					"Ikigai Teen was born from Irene's conviction that adolescence is a critical window in life - a time when the right guidance can help young people discover who they are, develop strong values and build the confidence to navigate an increasingly complex world.",
					"Through Ikigai Teen, Irene aims to create practical tools, coaching programmes and supportive communities that help teens, parents and educators work together to nurture the next generation of thoughtful, capable and compassionate leaders."
				],
	},
	{
		name: language === "kn" ? "ಜುಬೈದಾ ಜುಹೈರ್" : "Zubaida Zuhair",
		role: language === "kn" ? "ರಿಸರ್ಚ್ & ಕಂಟೆಂಟ್ ಅಸೋಸಿಯೇಟ್" : "Research & Content Associate",
		region: language === "kn" ? "ಇರಾಕ್" : "Iraq",
		image: zubaidaPhoto,
		imageClassName: "object-[50%_1%]",
		quote: language === "kn"
			? "ಜ್ಞಾನವನ್ನು ಪ್ರಾಮಾಣಿಕತೆಯಿಂದ ಹಂಚಿಕೊಂಡಾಗ, ಅದು ಇತರರ ಬೆಳವಣಿಗೆಗೆ ನೆರವಾಗುವ ಸುಂದರ ಸೇತುವೆಯಾಗುತ್ತದೆ."
			: "When knowledge is shared with sincerity, it becomes a bridge that helps others grow.",
		bio: language === "kn"
			? [
					"ಇರಾಕ್ನ ಎರ್ಬಿಲ್ ಮೂಲದ ಜುಬೈದಾ ಜುಹೈರ್ ಅವರು ಭರವಸೆಯ ಯುವ ಸಂಶೋಧಕಿ ಮತ್ತು ವಿಷಯ ರಚನೆಕಾರರಾಗಿದ್ದಾರೆ. ಲೆಬನಾನಿನ ಫ್ರೆಂಚ್ ವಿಶ್ವವಿದ್ಯಾಲಯ ಹಾಗೂ ಬ್ರಿಟಿಷ್ ಇಂಟರ್ನ್ಯಾಷನಲ್ ವಿಶ್ವವಿದ್ಯಾಲಯದಿಂದ ಇಂಗ್ಲಿಷ್ ಭಾಷೆ ಮತ್ತು ಸಾಹಿತ್ಯದಲ್ಲಿ ಪದವಿ ಪಡೆದಿರುವ ಇವರು, ವಿದ್ಯಾರ್ಥಿಗಳ ಸಬಲೀಕರಣ ಹಾಗೂ ಶೈಕ್ಷಣಿಕ ಪ್ರಗತಿಯಲ್ಲಿ ಸಕ್ರಿಯವಾಗಿ ತೊಡಗಿಸಿಕೊಂಡಿದ್ದಾರೆ. ತಮ್ಮ ವೃತ್ತಿಜೀವನದ ಆರಂಭಿಕ ದಿನಗಳಲ್ಲೇ ಇವರು ವಿವಿಧ ಶೈಕ್ಷಣಿಕ ಸಂಸ್ಥೆಗಳು, ಶಿಕ್ಷಕರ ತರಬೇತಿ ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು 'ಆಕ್ಸ್ಫ್ಯಾಮ್' ಸಂಸ್ಥೆಯ ಮೂಲಕ ಮಾನವೀಯ ಸೇವಾ ಯೋಜನೆಗಳಲ್ಲಿ ಕೆಲಸ ಮಾಡಿದ ಉತ್ತಮ ಅನುಭವ ಹೊಂದಿದ್ದಾರೆ.",
					"ಇಕಿಗೈ ಟೀನ್ ಸಂಸ್ಥೆಯಲ್ಲಿ ಜುಬೈದಾ ಅವರು ಸಂಶೋಧನೆ, ತರುಣದವರ ವ್ಯಕ್ತಿತ್ವ ವಿಶ್ಲೇಷಣೆ (Profiling) ಮತ್ತು ಸಂಪನ್ಮೂಲಗಳ ಅಭಿವೃದ್ಧಿಗೆ ಮಹತ್ವದ ಕೊಡುಗೆ ನೀಡುತ್ತಿದ್ದಾರೆ. ಸಂಶೋಧನೆ ಆಧಾರಿತ ಬರವಣಿಗೆ, ವಿಷಯ ಪರಿಷ್ಕರಣೆ (Editing) ಮತ್ತು ಆಡಿಯೋ-ವಿಶುವಲ್ ಎಡಿಟಿಂಗ್ ಮೂಲಕ ಬ್ಲಾಗ್ಗಳು, ಪಾಡ್ಕಾಸ್ಟ್ಗಳು ಹಾಗೂ ಶೈಕ್ಷಣಿಕ ಲೇಖನಗಳ ಸೃಜನಾತ್ಮಕ ರಚನೆಯಲ್ಲಿ ಅವರು ಪ್ರಮುಖ ಪಾತ್ರ ವಹಿಸುತ್ತಿದ್ದಾರೆ. ಅವರ ಬಹುಭಾಷಾ ಪ್ರಾವೀಣ್ಯತೆ ಮತ್ತು ಯುವಮನಸ್ಸುಗಳ ಜಗತ್ತನ್ನು ತಿಳಿಯುವ ಕುತೂಹಲವು, ಜಾಗತಿಕ ಒಳನೋಟಗಳನ್ನು ಅರ್ಥಪೂರ್ಣ ಕಲಿಕಾ ಸಾಮಗ್ರಿಗಳಾಗಿ ಪರಿವರ್ತಿಸಲು ನೆರವಾಗುತ್ತಿದೆ."
				]
			: [
					"Zubaida Zuhair is a young research and content contributor based in Erbil, Iraq, with a background in English Language and Literature from Lebanese French University and British International University and experience in student engagement and education support. In the early stages of her career, she has already worked across academic institutions, teacher training programs, and community initiatives, including exposure to humanitarian work with Oxfam.",
					"At Ikigai Teen, Zubaida contributes to research, teen profiling, and resource development. She supports the creation of blogs, podcasts, and educational articles through research-backed writing, content refinement, and audio-visual editing. Her multilingual skills and curiosity about youth experiences help translate insights into meaningful learning resources."
				],
	},
	{
		name: language === "kn" ? "ಬರಾಕತ್ ಮೊಹಮ್ಮದ್" : "Barakat Mohammed",
		role: language === "kn" ? "ಡಿಜಿಟಲ್ ಮೀಡಿಯಾ ಮತ್ತು ವಿನ್ಯಾಸ ಬೆಂಬಲ" : "Digital Media & Design Support",
		region: language === "kn" ? "ಇರಾಕ್" : "Iraq",
		image: barakatPhoto,
		imageStyle: { objectPosition: "60% 30%", transform: "scale(1.5)", transformOrigin: "center bottom" },
		quote: language === "kn"
			? "ಜನರು ಭಿನ್ನವಾಗಿ ಯೋಚಿಸುವಂತೆ ಪ್ರೇರೇಪಿಸುವ ಆಲೋಚನೆಗಳನ್ನು, ದೃಶ್ಯ ಅನುಭವಗಳಾಗಿ ಪರಿವರ್ತಿಸುವ ಅದ್ಭುತ ಶಕ್ತಿ ವಿನ್ಯಾಸಕ್ಕಿದೆ."
			: "Design has the power to turn ideas into experiences that inspire people to think differently.",
		bio: language === "kn"
			? [
					"ಇರಾಕ್ನ ಎರ್ಬಿಲ್ ಮೂಲದ ಡಿಜಿಟಲ್ ಡಿಸೈನರ್ ಆಗಿರುವ ಬರಾಕತ್ ಮೊಹಮ್ಮದ್ ಅವರಿಗೆ ದೃಶ್ಯ ಕಥೆಗಾರಿಕೆ (Visual Storytelling), ಯುವ ಸಮುದಾಯದ ತೊಡಗಿಸಿಕೊಳ್ಳುವಿಕೆ ಮತ್ತು ಶೈಕ್ಷಣಿಕ ಮಾಧ್ಯಮಗಳಲ್ಲಿ ತೀವ್ರ ಆಸಕ್ತಿಯಿದೆ. ಲೆಬನಾನಿನ ಫ್ರೆಂಚ್ ವಿಶ್ವವಿದ್ಯಾಲಯದ (2024) ಪದವೀಧರರಾಗಿರುವ ಇವರು, ಯುವ ಪೀಳಿಗೆಯ ಕಲಿಕೆ ಮತ್ತು ಸಂವಹನದ ಮೇಲೆ ಡಿಜಿಟಲ್ ವೇದಿಕೆಗಳು ಬೀರುವ ಪ್ರಭಾವವನ್ನು ಚೆನ್ನಾಗಿ ಅರಿತಿದ್ದಾರೆ. ತಮ್ಮ ಈ ತಿಳುವಳಿಕೆಯನ್ನು ಸೃಜನಶೀಲ ವಿನ್ಯಾಸ ಕೌಶಲ್ಯಗಳೊಂದಿಗೆ ಸಂಯೋಜಿಸಿ ಅವರು ಕೆಲಸ ಮಾಡುತ್ತಾರೆ.",
					"ಇಕಿಗೈ ಟೀನ್ ಸಂಸ್ಥೆಯಲ್ಲಿ ಬರಾಕತ್ ಅವರು ಯೂಟ್ಯೂಬ್, ಪಾಡ್ಕ್ಯಾಸ್ಟ್ ಹಾಗೂ ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮಗಳ ವಿನ್ಯಾಸ ಮತ್ತು ಪ್ರಕಟಣೆಯ ಜವಾಬ್ದಾರಿಯನ್ನು ಹೊತ್ತಿದ್ದಾರೆ. ಬ್ರ್ಯಾಂಡ್ ದೃಶ್ಯಗಳು, ಆಕರ್ಷಕ ಥಂಬ್ನೇಲ್ಗಳು ಮತ್ತು ಕಿರು-ರೂಪದ (Short-form) ಮಾಧ್ಯಮಗಳನ್ನು ರಚಿಸುವ ಮೂಲಕ, ಪ್ರಮುಖ ಆಲೋಚನೆಗಳನ್ನು ಆಕರ್ಷಕ ಡಿಜಿಟಲ್ ಕಂಟೆಂಟ್ ಆಗಿ ಪರಿವರ್ತಿಸುವುದು ಇವರ ಕೆಲಸದ ಹೆಗ್ಗಳಿಕೆಯಾಗಿದೆ."
				]
			: [
					"Barakat Mohammed is a digital designer based in Erbil, Iraq, with a strong interest in youth engagement, visual storytelling, and educational media. A graduate of Lebanese French University (2024), he combines creative design skills with an understanding of how digital platforms influence the way young audiences learn and interact.",
					"At Ikigai Teen, Barakat supports digital design and social media publishing across platforms such as YouTube, podcasts, and social media channels. His work includes creating branded visuals, thumbnails, and short-form media that transform insights and conversations into engaging digital content."
				],
	},
	{
		name: language === "kn" ? "ಪೂರ್ವಿ ಪ್ರವೀಣ್" : "Poorvi Praveen",
		role: language === "kn" ? "ಕಾರ್ಯಕ್ರಮ ಮತ್ತು ಕಾರ್ಯಾಚರಣೆ ಬೆಂಬಲ" : "Program & Operations Support",
		region: language === "kn" ? "ಭಾರತ" : "India",
		image: poorviPhoto,
		imageStyle: { objectPosition: "10% 24%", transform: "translateX(-35%) translateY(25%) scale(2)", transformOrigin: "center center" },
		quote: language === "kn"
			? "ವಯಸ್ಸು ಎಂದಿಗೂ ಜವಾಬ್ದಾರಿಯನ್ನು ನಿರ್ಧರಿಸುವುದಿಲ್ಲ; ನಮ್ಮ ಬದ್ಧತೆ ಮತ್ತು ಕರಾರುವಾಕ್ಕಾದ ಕೆಲಸಗಳು ಮಾತ್ರ ಅದನ್ನು ಸಾಬೀತುಪಡಿಸುತ್ತವೆ."
			: "Age does not define responsibility - commitment and action do.",
		bio: language === "kn"
			? [
					"ಕರ್ನಾಟಕದ ಬೆಂಗಳೂರಿನ ಚಾರ್ಟರ್ಡ್ ಅಕೌಂಟೆನ್ಸಿ (CA) ವಿದ್ಯಾರ್ಥಿನಿಯಾಗಿರುವ ಪೂರ್ವಿ ಪ್ರವೀಣ್, 'ಇಕಿಗೈ ಟೀನ್' ಉಪಕ್ರಮದ ಅತ್ಯಂತ ಉತ್ಸಾಹಿ ಯುವ ಕೊಡುಗೆದಾರರಾಗಿದ್ದಾರೆ. ಶಿಸ್ತಿನ ವೇಟ್ಲಿಫ್ಟಿಂಗ್ ಪಟುವೂ ಆಗಿರುವ ಇವರು, ಅದೇ ದೃಢಸಂಕಲ್ಪ ಮತ್ತು ಪರಿಶ್ರಮವನ್ನು ಯುವ ಅಭಿವೃದ್ಧಿ ಕಾರ್ಯಕ್ರಮಗಳಿಗೂ ಧಾರೆ ಎರೆದಿದ್ದಾರೆ.",
					"ಕುತೂಹಲ, ಜವಾಬ್ದಾರಿ ಮತ್ತು ಇತರರಿಗೆ ಸಹಾಯ ಮಾಡುವ ನೈಜ ಗುಣ ಹೊಂದಿರುವ ಪೂರ್ವಿ, ಸ್ವಯಂಪ್ರೇರಿತರಾಗಿ ಇಕಿಗೈ ಟೀನ್ ತಂಡವನ್ನು ಸೇರಿದರು. ಕಾರ್ಯಕ್ರಮದ ಸಮನ್ವಯ, ಪಾಡ್ಕ್ಯಾಸ್ಟ್ ನಿರ್ಮಾಣದ ಲಾಜಿಸ್ಟಿಕ್ಸ್, ವೆಬ್ಸೈಟ್ ಅಭಿವೃದ್ಧಿ ಮತ್ತು ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮದ ಕಂಟೆಂಟ್ ಸಿದ್ಧಪಡಿಸುವಿಕೆ ಸೇರಿದಂತೆ ಹಲವು ಕ್ಷೇತ್ರಗಳಲ್ಲಿ ಅವರು ವಿಶ್ವಾಸಾರ್ಹ ಕೊಡುಗೆ ನೀಡುತ್ತಿದ್ದಾರೆ. ಸಣ್ಣ ಉದ್ಯಮಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಮುನ್ನಡೆಸಿದ ತಮ್ಮ ತಾಯಿಯ ಉದ್ಯಮಶೀಲತೆಯ ಮನೋಭಾವವನ್ನು ಹತ್ತಿರದಿಂದ ಕಂಡು ಬೆಳೆದ ಪೂರ್ವಿ, ಸ್ವಯಂ-ಮುತುವರ್ಜಿ, ಸ್ಥಿತಿಸ್ಥಾಪಕತ್ವ ಮತ್ತು ಪ್ರಾಯೋಗಿಕ ಕಲಿಕೆಯ ಮೌಲ್ಯವನ್ನು ಚಿಕ್ಕ ವಯಸ್ಸಿನಲ್ಲೇ ಅರಿತಿದ್ದಾರೆ."
				]
			: [
					"Poorvi Praveen is a Chartered Accountancy student from Bangalore, Karnataka, and an enthusiastic young contributor to the Ikigai Teen initiative. A disciplined weightlifting enthusiast, she brings the same determination and perseverance to her work supporting youth development programs.",
					"Curious, responsible, and a natural go-getter, Poorvi volunteered to support Ikigai Teen and quickly became a dependable contributor across many areas, from program coordination to podcast production logistics, website development support, and social media content production among others. Having grown up observing her mother's enterprising spirit in launching small business initiatives, Poorvi developed an early appreciation for initiative, resilience, and learning through action."
				],
	},
	{
		name: language === "kn" ? "ಜೀವನ್ ಶಾಜಿ ಜಾನ್" : "Jeevan Shaji John",
		role: language === "kn" ? "ತಂತ್ರಜ್ಞಾನ ಮತ್ತು ಸಹಯೋಗ ಬೆಂಬಲ" : "Technology & Collaborations Support",
		region: language === "kn" ? "ಭಾರತ | ಕುವೈತ್" : "India|Kuwait",
		image: jeevanPhoto,
		imageStyle: { objectPosition: "50% 44%", transform: "translateX(30%) translateY(-10%) scale(2.15)", transformOrigin: "center center" },
		quote: language === "kn"
			? "ದೃಢವಾದ ಮನಸ್ಸು ಮತ್ತು ನಿರಂತರ ಪ್ರಯತ್ನವಿದ್ದರೆ, ಸಣ್ಣ ಆರಂಭಗಳೂ ಕೂಡ ಸಮಾಜದಲ್ಲಿ ದೊಡ್ಡ ಬದಲಾವಣೆಯನ್ನು ತರಬಲ್ಲವು."
			: "A willing mind and consistent action can turn small beginnings into meaningful impact.",
		bio: language === "kn"
			? [
					"ಜೀವನ್ ಶಾಜಿ ಜಾನ್ ಅವರು ಕೇರಳದ ಒಬ್ಬ ಪ್ರತಿಭಾವಂತ ಯುವ ತಂತ್ರಜ್ಞಾನ ಉತ್ಸಾಹಿಯಾಗಿದ್ದು, ಕಂಪ್ಯೂಟರ್ ಅಪ್ಲಿಕೇಷನ್ಸ್ (BCA) ಪದವೀಧರರಾಗಿದ್ದಾರೆ. ವೆಬ್ ಡೆವಲಪ್ಮೆಂಟ್, ಸೈಬರ್ ಭದ್ರತೆ ಹಾಗೂ ಡಿಜಿಟಲ್ ಸಮಸ್ಯೆಗಳಿಗೆ ಪರಿಹಾರ ಕಂಡುಕೊಳ್ಳುವಲ್ಲಿ ಅಪಾರ ಆಸಕ್ತಿ ಹೊಂದಿರುವ ಇವರು, ತಂತ್ರಜ್ಞಾನವನ್ನು ಸಮಾಜಮುಖಿಯಾಗಿ ಬಳಸಬಯಸುವ ಹೊಸ ಪೀಳಿಗೆಯ ಕಲಿಯುವವರನ್ನು ಪ್ರತಿನಿಧಿಸುತ್ತಾರೆ.",
					"ಇಕಿಗೈ ಟೀನ್ ಸಂಸ್ಥೆಯಲ್ಲಿ ಜೀವನ್ ಅವರು ಆಪ್ (App) ಮತ್ತು ವೆಬ್ಸೈಟ್ ಅಭಿವೃದ್ಧಿಯ ಜವಾಬ್ದಾರಿಯನ್ನು ಹೊತ್ತಿದ್ದಾರೆ. ಇದರೊಂದಿಗೆ, ಸಂಸ್ಥೆಯ ಡಿಜಿಟಲ್ ಮತ್ತು ಕಾರ್ಯಾಚರಣೆಯ ವ್ಯವಸ್ಥೆಯನ್ನು ಬಲಪಡಿಸಲು, ಸಹಯೋಗವನ್ನು ವೃದ್ಧಿಸಲು ಹಾಗೂ ಹೊಸ ನಾವೀನ್ಯತೆಗಳನ್ನು ತರಲು ಶ್ರಮಿಸುತ್ತಿದ್ದಾರೆ. ತಾಂತ್ರಿಕ ವಿನ್ಯಾಸ ಮತ್ತು ಸದಾ ಹೊಸದನ್ನು ಕಲಿಯುವ ಇವರ ಹಂಬಲವು, ಯುವ ಪೀಳಿಗೆಗಾಗಿ ಶ್ರಮಿಸುತ್ತಿರುವ ನಮ್ಮ ಸಂಸ್ಥೆಗೆ ದೊಡ್ಡ ಶಕ್ತಿಯಾಗಿದೆ. ಸದಾ ತಮ್ಮ ಕಂಫರ್ಟ್ ಜೋನ್ನಿಂದ (Comfort Zone) ಹೊರಬಂದು ಬೆಳೆಯಲು ಉತ್ಸುಕರಾಗಿರುವ ಜೀವನ್, ಇಕಿಗೈ ಟೀನ್ ಯುವಜನರಲ್ಲಿ ಮೂಡಿಸಲು ಬಯಸುವ ಕುತೂಹಲ, ಹೊಂದಾಣಿಕೆ ಮತ್ತು ಧ್ಯೇಯನಿಷ್ಠ ಮನೋಭಾವಕ್ಕೆ ಉತ್ತಮ ಉದಾಹರಣೆಯಾಗಿದ್ದಾರೆ."
				]
			: [
					"Jeevan Shaji John is a young technology enthusiast from Kerala, with a Bachelor degree in Computer Applications. With a growing interest in web development, cybersecurity, and digital problem-solving, he represents a new generation of learners eager to apply technology in meaningful and socially relevant ways.",
					"At Ikigai Teen, Jeevan supports both application and website development, along with collaboration-building efforts that strengthen the initiative's digital and operational ecosystem, driving innovation and rapid evolution. His interests in tech design, systems thinking, and continuous learning make him a valuable contributor to a mission-driven platform designed for the next generation. Passionate about growth and stepping beyond his comfort zone, Jeevan embodies the curiosity, adaptability, and purpose-driven mindset that Ikigai Teen seeks to nurture in young people."
				],
	},
];

const CircleProfilePhoto = ({ src, alt, imageClassName, imageStyle }: { src: string; alt: string; imageClassName?: string; imageStyle?: CSSProperties }) => {
	const [failed, setFailed] = useState(false);

	if (failed || !src) {
		return (
			<div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border border-border/70 shrink-0">
				<div className="w-full h-full bg-secondary flex items-center justify-center text-xs font-semibold text-muted-foreground px-3 text-center">
					{alt}
				</div>
			</div>
		);
	}

	return (
		<div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border border-border/70 shrink-0">
			<img
				src={src}
				alt={alt}
				className={`h-full w-full object-cover object-top ${imageClassName ?? ""}`}
				style={imageStyle}
				onError={() => setFailed(true)}
			/>
		</div>
	);
};

const FounderTeam = () => {
	const [showFullFounderBio, setShowFullFounderBio] = useState(false);
	const { language, t } = useLanguage();
	const members = getTeamMembers(language);

	return (
		<>
			<Navbar />
			<main className="pt-16 bg-background min-h-screen">
				<section className="footer-theme-legacy py-12 md:py-20 bg-card border-b border-border/50">
					<div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
						<h1>
							<LetterSwapForward
								label={language === "kn" ? "ಇಕಿಗೈ ಟೀನ್ ಪರಿಕಲ್ಪನೆ ರೂಪಿಸಿದವರು" : "Architects of Ikigai Teen"}
								className="justify-center text-4xl md:text-5xl font-display font-bold mb-4"
								style={{ color: '#FCEADE' }}
							/>
						</h1>
						<p className="text-lg text-white font-body">
							{language === "kn" ? "ಇಕಿಗೈ ಟೀನ್ನ ಕನಸು, ದಿಕ್ಕು ಮತ್ತು ಬೆಳವಣಿಗೆಯನ್ನು ರೂಪಿಸುತ್ತಿರುವ ವ್ಯಕ್ತಿಗಳನ್ನು ಪರಿಚಯಿಸಿಕೊಳ್ಳಿ." : "Meet the people shaping Ikigai Teen."}
						</p>
					</div>
				</section>

				<section className="py-10 md:py-14 bg-background">
					<div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-8">
						<section className="space-y-5">
							<div className="rounded-xl border border-border/60 bg-[#2C423F] p-6 md:p-8 space-y-5">
								<h2 className="text-2xl md:text-3xl font-display font-semibold text-[#FCEADE]">
									{language === "kn" ? "ನಮ್ಮ ತಂಡ" : "The Team"}
								</h2>
								<p className="text-sm md:text-base text-white/90 leading-relaxed">
									{language === "kn"
										? "ಆತ್ಮಜಾಗೃತಿ, ಧೈರ್ಯ ಮತ್ತು ಸಹಯೋಗದ ಮೂಲಕ ಅರ್ಥಪೂರ್ಣ ಬದಲಾವಣೆ ಸಾಧ್ಯ ಎಂಬ ನಂಬಿಕೆಯುಳ್ಳ ಉತ್ಸಾಹಿ ಯುವ ಜಾಗತಿಕ ತಂಡವೇ ಇಕಿಗೈ ಟೀನ್ನ ಶಕ್ತಿ. ಸಂಶೋಧನೆ, ವಿನ್ಯಾಸ, ತಂತ್ರಜ್ಞಾನ ಹಾಗೂ ತರುಣರ ದೃಷ್ಟಿಕೋನವನ್ನು ಒಟ್ಟುಗೂಡಿಸಿ, ತರುಣರು ಜೀವನವನ್ನು ಸ್ಪಷ್ಟತೆ ಮತ್ತು ಉದ್ದೇಶದೊಂದಿಗೆ ಮುನ್ನಡೆಸಲು ನೆರವಾಗುವ ವೇದಿಕೆಯನ್ನು ನಾವು ನಿರ್ಮಿಸುತ್ತಿದ್ದೇವೆ."
										: "Ikigai Teen is powered by a young, global team that believes meaningful change begins with awareness, courage, and collaboration. Together, we bring research, design, technology, youth perspective and participation to build a platform that helps teens navigate life with clarity and purpose."}
								</p>
								<div className="space-y-5">
									{members.map((member) => (
										<article key={member.name} className="rounded-xl border border-border/60 bg-white p-5 md:p-6 transition-all duration-300">
											<div className="mb-3">
												<header>
													<h3 className="text-xl md:text-2xl font-display font-semibold text-primary">{member.name}</h3>
													<p className="text-sm md:text-base text-primary font-semibold">{member.role}</p>
													{member.region && <p className="text-xs text-muted-foreground mt-1">{member.region}</p>}
												</header>
											</div>
											<div className="flex flex-col sm:flex-row gap-5 items-start pt-1">
												<CircleProfilePhoto src={member.image} alt={member.name} imageClassName={member.imageClassName} imageStyle={member.imageStyle} />
												<div className="space-y-3">
													{member.name === "ಐರೀನ್ ಆರತಿ" || member.name === "Irene Arathi Pais" ? (
														<>
															{(showFullFounderBio ? member.extendedBio ?? member.bio : member.bio).map((paragraph, paragraphIndex) => (
																<p key={`founder-bio-${paragraphIndex}`} className="text-sm md:text-base text-muted-foreground leading-relaxed">
																	{paragraph}
																	{paragraphIndex === (showFullFounderBio ? member.extendedBio ?? member.bio : member.bio).length - 1 ? (
																		<>
																			{" "}
																			<button
																				type="button"
																				onClick={() => setShowFullFounderBio((previous) => !previous)}
																				className="ml-1 inline-flex items-center rounded-md bg-primary/15 px-2 py-0.5 text-xs md:text-sm font-semibold text-primary hover:bg-primary/20 transition-colors"
																			>
																				{showFullFounderBio
																					? (language === "kn" ? "ಕಡಿಮೆ ತೋರಿಸಿ" : "Show less")
																					: (language === "kn" ? "ಹೆಚ್ಚು ಓದಿ" : "Read more")}
																			</button>
																			<a
																				href="https://www.youtube.com/watch?v=EFeykHZoAv0&t=154s"
																				target="_blank"
																				rel="noopener noreferrer"
																				className="ml-2 inline-flex items-center rounded-md bg-primary/15 px-2 py-0.5 text-xs md:text-sm font-semibold text-primary hover:bg-primary/20 transition-colors"
																			>
																				{language === "kn" ? "ವಿಡಿಯೋ ನೋಡಿ" : "Watch Video"}
																			</a>
																		</>
																	) : null}
																</p>
															))}
														</>
													) : (
														member.bio.map((paragraph, idx) => (
															<p key={`${member.name}-bio-${idx}`} className="text-sm md:text-base text-muted-foreground leading-relaxed">
																{paragraph}
															</p>
														))
													)}

													<p className="text-sm md:text-base italic font-semibold text-foreground/85">"{member.quote}"</p>
												</div>
											</div>
										</article>
									))}
								</div>
							</div>
						</section>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
};

export default FounderTeam;

