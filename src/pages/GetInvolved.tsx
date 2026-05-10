import SectionPageLayout from "@/components/SectionPageLayout";

const sections = [
  { title: "Be Our Expert/Guest Speaker", description: "Share your expertise in youth development, psychology, education, or coaching to help shape the Ikigai Teen programs.", path: "/get-involved/be-our-experts" },
  { title: "Be Our Service Collaborator", description: "Partner with us as an organization, school, or community group to bring Ikigai-based programs to more teens.", path: "/get-involved/be-our-collaborators" },
  { title: "Be Our Trainee Coach", description: "Join our coaching program and learn to guide teens through their Ikigai journey with our certified training.", path: "/get-involved/be-our-trainee-coaches" },
  { title: "Be Our Intern/Volunteer", description: "Gain hands-on experience in youth empowerment through internship opportunities or guest speaking engagements.", path: "/get-involved/be-our-interns-guests" },
  { title: "Be Our Patron/Sponserer", description: "Support the Ikigai Teen movement financially and help us reach more teenagers who need guidance and purpose.", path: "/get-involved/be-our-patrons" },
];

const GetInvolved = () => (
  <SectionPageLayout
    title="Get Involved"
    subtitle="Join our mission and make a difference in a teen's life."
    sections={sections}
  />
);

export default GetInvolved;
