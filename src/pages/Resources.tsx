import SectionPageLayout from "@/components/SectionPageLayout";

const sections = [
  { title: "Blog/Articles", description: "Read insightful articles on teen development, purpose-finding, mental wellness, and the Ikigai philosophy.", path: "/resources/blogs" },
  { title: "Video/Podcast Links", description: "Watch and listen to inspiring content from teen coaches, educators, and young leaders making a difference." },
  { title: "Ready to Use Tools", description: "Practical guides and workbooks to support your teen's growth and strengthen your connection.", path: "/resources/ready-to-use-tools" },
  { title: "Recent Events", description: "Catch up on our latest workshops, webinars, and community gatherings that brought teens and families together.", path: "/resources/recent-events" },
  { title: "Upcoming Events", description: "Stay updated on future events, programs, and opportunities to engage with the Ikigai Teen community.", path: "/resources/upcoming-events" },
];

const Resources = () => (
  <SectionPageLayout
    title="Resources"
    subtitle="Explore our library of content, events, and insights."
    sections={sections}
  />
);

export default Resources;
