import SectionPageLayout from "@/components/SectionPageLayout";

const sections = [
  { title: "Vision & Mission", description: "Our vision is a world where every teenager discovers their unique purpose and lives a life of meaning. Our mission is to guide teens through self-discovery using the Ikigai framework." },
  { title: "Grounding Philosophy", description: "Rooted in the Japanese concept of Ikigai — the intersection of what you love, what you're good at, what the world needs, and what you can be paid for — we help teens find balance and direction." },
  { title: "Core Values", description: "Authenticity, empathy, growth, community, and courage form the pillars of everything we do at Ikigai Teen." },
  { title: "The Journey", description: "From a small initiative to a growing movement, Ikigai Teen has been on a mission to empower teenagers across communities to live with purpose and passion." },
  { title: "Founder & Team", description: "Meet the passionate team behind Ikigai Teen — educators, mentors, and youth advocates dedicated to making a difference in every teen's life." },
];

const About = () => (
  <SectionPageLayout
    title="About Us"
    subtitle="Learn about our mission to empower teens through purpose and self-discovery."
    sections={sections}
  />
);

export default About;
