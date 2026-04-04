import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface SectionPageLayoutProps {
  title: string;
  subtitle: string;
  sections: { title: string; description: string }[];
}

const SectionPageLayout = ({ title, subtitle, sections }: SectionPageLayoutProps) => {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Page Header */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">{title}</h1>
              <p className="text-lg text-muted-foreground font-body">{subtitle}</p>
            </motion.div>
          </div>
        </section>

        {/* Subsections */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {sections.map((s, i) => (
                <motion.div
                  key={s.title}
                  className="glass-card p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <h2 className="text-xl font-display font-semibold text-foreground mb-3">{s.title}</h2>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">{s.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SectionPageLayout;
