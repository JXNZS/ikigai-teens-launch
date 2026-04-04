import { motion } from "framer-motion";
import { Compass, Heart, Users, BookOpen, Lightbulb } from "lucide-react";

const features = [
  { icon: Compass, title: "Discover Purpose", desc: "Help teens explore their unique Ikigai through guided self-discovery." },
  { icon: Heart, title: "Passion-Led Growth", desc: "Programs designed around what teens love and care about." },
  { icon: Users, title: "Community Support", desc: "A safe space for teens to connect, share, and grow together." },
  { icon: BookOpen, title: "Curated Resources", desc: "Expert-crafted content for teens and parents alike." },
  { icon: Lightbulb, title: "Skill Building", desc: "Workshops and tools to build real-world skills and confidence." },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="flex flex-col items-center text-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-sm font-semibold text-foreground">{f.title}</h3>
              <p className="text-xs text-muted-foreground font-body leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
