import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface SectionPageLayoutProps {
  title: string;
  subtitle: string;
  sections: { title: string; description: string }[];
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const SectionPageLayout = ({ title, subtitle, sections }: SectionPageLayoutProps) => {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Page Header */}
        <section className="py-20 bg-card overflow-hidden">
          <div className="container mx-auto px-6">
            <motion.div
              className="max-w-3xl mx-auto text-center"
            >
              <motion.h1
                className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4"
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {title}
              </motion.h1>
              <motion.p
                className="text-lg text-muted-foreground font-body"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {subtitle}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Subsections */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <motion.div
              className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
            >
              {sections.map((s) => (
                <motion.div
                  key={s.title}
                  className="glass-card p-8 group"
                  variants={cardVariants}
                  whileHover={{
                    y: -6,
                    boxShadow: "0 20px 40px -15px hsl(152 60% 45% / 0.15)",
                    transition: { duration: 0.3 },
                  }}
                >
                  <motion.div
                    className="w-1 h-0 bg-primary rounded-full mb-4"
                    whileInView={{ height: 24 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  />
                  <h2 className="text-xl font-display font-semibold text-foreground mb-3">{s.title}</h2>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">{s.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SectionPageLayout;
