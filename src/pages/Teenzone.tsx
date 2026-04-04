import SectionPageLayout from "@/components/SectionPageLayout";

const sections = [
  { title: "Teen Identity", description: "Explore who you are — your strengths, passions, and values. Build a strong sense of self through guided activities and reflections." },
  { title: "Teen Issues", description: "Navigate common challenges like peer pressure, academic stress, social media impact, and mental health with practical tools and support." },
  { title: "Teen Solutions", description: "Discover actionable strategies, coping mechanisms, and frameworks designed specifically for teenagers facing real-world challenges." },
  { title: "Teen Resources", description: "Access curated articles, worksheets, videos, and tools to support your personal growth journey." },
  { title: "IkigaiTeen Club & App", description: "Join the IkigaiTeen Club for exclusive access to events, mentorship, and our upcoming app designed to guide your Ikigai journey." },
];

const Teenzone = () => (
  <SectionPageLayout
    title="Teen Zone"
    subtitle="A dedicated space for teens to explore, learn, and grow."
    sections={sections}
  />
);

export default Teenzone;
