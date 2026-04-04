import { motion } from "framer-motion";
import { Compass, Heart, Users, BookOpen, Lightbulb } from "lucide-react";

const features = [
  { icon: Compass, title: "Discover Purpose", desc: "Help teens explore their unique Ikigai through guided self-discovery." },
  { icon: Heart, title: "Passion-Led Growth", desc: "Programs designed around what teens love and care about." },
  { icon: Users, title: "Community Support", desc: "A safe space for teens to connect, share, and grow together." },
  { icon: BookOpen, title: "Curated Resources", desc: "Expert-crafted content for teens and parents alike." },
  { icon: Lightbulb, title: "Skill Building", desc: "Workshops and tools to build real-world skills and confidence." },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-card overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              className="flex flex-col items-center text-center gap-3 group"
              variants={itemVariants}
            >
              <motion.div
                className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center"
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <f.icon className="w-6 h-6 text-primary" />
              </motion.div>
              <h3 className="font-display text-sm font-semibold text-foreground">{f.title}</h3>
              <p className="text-xs text-muted-foreground font-body leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
