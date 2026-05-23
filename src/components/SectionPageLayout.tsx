import { motion } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TextToSpeechButton from "@/components/TextToSpeechButton";

interface SectionPageLayoutProps {
  title: string;
  subtitle: string;
  sections: {
    title: string;
    description: string;
    path?: string;
    id?: string;
    body?: string[];
    bullets?: string[];
  }[];
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

const SectionCard = ({
  section,
}: {
  section: SectionPageLayoutProps["sections"][number];
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const content = (
    <motion.div
      className="rounded-lg md:rounded-xl border border-border/60 bg-[hsl(25_83%_93%_/_0.8)] [--foreground:0_0%_0%] [--muted-foreground:0_0%_0%] [--border:152_20%_86%] p-6 md:p-8 group cursor-pointer hover:border-primary/40 transition-colors"
      whileHover={{
        y: -6,
        boxShadow: "0 20px 40px -15px rgba(44,66,63,0.15)",
        transition: { duration: 0.3 },
      }}
    >
      <motion.div
        className="w-1 h-0 bg-primary rounded-full mb-4"
        whileInView={{ height: 24 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
      />
      <h2 className="text-lg md:text-xl font-display font-semibold text-primary mb-3">{section.title}</h2>
      <p className="text-muted-foreground font-body text-sm leading-relaxed">{section.description}</p>
      {section.body?.length ? (
        <div className="mt-5 space-y-3 md:space-y-4 text-xs sm:text-sm leading-relaxed text-muted-foreground font-body">
          {section.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      ) : null}
      {section.bullets?.length ? (
        <div className="mt-5 space-y-2 md:space-y-3 text-xs sm:text-sm leading-relaxed text-muted-foreground font-body">
          {section.bullets.map((bullet) => (
            <p key={bullet}>{bullet}</p>
          ))}
        </div>
      ) : null}
    </motion.div>
  );

  if (section.path) {
    return (
      <div ref={contentRef} className="relative">
        <TextToSpeechButton targetRef={contentRef} />
        <Link to={section.path} className="block">
          {content}
        </Link>
      </div>
    );
  }

  return (
    <motion.div ref={contentRef} className="relative" variants={cardVariants}>
      <TextToSpeechButton targetRef={contentRef} />
      {content}
    </motion.div>
  );
};

const SectionPageLayout = ({ title, subtitle, sections }: SectionPageLayoutProps) => {
  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20 bg-background min-h-screen">
        {/* Page Header */}
        <section className="footer-theme-legacy py-12 md:py-20 bg-card border-b border-border/50 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              className="max-w-3xl mx-auto text-center"
            >
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 md:mb-4"
                style={{ color: '#FCEADE' }}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {title}
              </motion.h1>
              <motion.p
                className="text-base sm:text-lg md:text-xl text-white font-body px-2"
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
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
              {sections.map((section) => (
                <motion.div key={section.title} variants={cardVariants} id={section.id} className="scroll-mt-24">
                  <SectionCard section={section} />
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
