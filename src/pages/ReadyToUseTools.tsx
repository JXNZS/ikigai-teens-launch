import { Download, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LetterSwapForward } from "@/components/ui/letter-swap";

import pdf1 from "@/assets/PDF 1.pdf";
import pdf2 from "@/assets/PDF 2.pdf";
import pdf3 from "@/assets/PDF 3.pdf";
import pdf4 from "@/assets/PDF 4.pdf";
import pdf5 from "@/assets/PDF 5.pdf";
import pdf6 from "@/assets/PDF 6.pdf";
import pdf7 from "@/assets/PDF 7.pdf";
import pdf8 from "@/assets/PDF 8.pdf";
import pdf9 from "@/assets/PDF 9.pdf";
import pdf10 from "@/assets/PDF 10.pdf";

const readyToUseTools = [
  {
    id: 1,
    heading: "Your 3R Family Connection Planner",
    description: "A simple planner built around three powerful habits — Reflection, Realignment, and Ritual. It helps you notice your emotional patterns, align your family around shared values, and build weekly routines that bring you closer to your teen. Small, steady actions that add up.",
    pdf: pdf1,
  },
  {
    id: 2,
    heading: "The Self-Aware Parent Journal",
    description: "A journaling guide that helps you look inward before looking at your teen. It offers honest reflection prompts and a 5-day practice to shift from reacting on impulse to responding with intention. Because how you show up shapes how your teen learns to handle life.",
    pdf: pdf2,
  },
  {
    id: 3,
    heading: "Raising an Unshakeable Teen",
    description: "A guide to building real confidence in your teen — not through praise, but through allowing them to face and recover from challenges. It walks you through five pillars that grow resilience in ordinary, everyday moments.",
    pdf: pdf3,
  },
  {
    id: 4,
    heading: "The Courage to Try Again Guide",
    description: "A reflection guide that helps you rethink how you respond when your teen makes mistakes. It introduces the 4A Model — Acknowledge, Ask, Align, Act — so that failure becomes a doorway to trust rather than shame.",
    pdf: pdf4,
  },
  {
    id: 5,
    heading: "The 5-Day Listening Habit",
    description: "A short, daily practice to help you slow down and truly hear your teen. Each day focuses on a different listening skill — from pausing before speaking to celebrating the small moments they open up. Connection begins with attention.",
    pdf: pdf5,
  },
  {
    id: 6,
    heading: "Belonging Begins at Home",
    description: "A guide to understanding why your teen craves belonging and how your home can be their safest anchor. It offers practical tools — from the Check-In Circle to the Peer Pressure Playbook — to build identity and self-worth from the inside out.",
    pdf: pdf6,
  },
  {
    id: 7,
    heading: "The Calm Connection Workbook",
    description: "A 5-step evening workbook to help you support a teen dealing with anxiety, stress, or low self-esteem. It helps you recognize the signs, listen without lecturing, and respond in ways that build emotional safety — one quiet evening at a time.",
    pdf: pdf7,
  },
  {
    id: 8,
    heading: "The Family Digital Reset Guide",
    description: "A practical reset plan to help your family build healthier boundaries around screens — together, not as punishment. It moves through four steps: Reflect, Reset, Reconnect, and Reinforce, making tech a tool rather than a tension point at home.",
    pdf: pdf8,
  },
  {
    id: 9,
    heading: "Understanding Your Teen's Mind",
    description: "A science-backed guide that explains why your teen thinks, feels, and reacts the way they do — and it's not defiance, it's brain development. It gives you a simple weekly action plan to co-regulate emotions and become the calm your teen needs.",
    pdf: pdf9,
  },
  {
    id: 10,
    heading: "The Teen Transition Years Toolkit",
    description: "A three-part guide — Reflect, Relate, Reframe — designed for parents navigating the shift from caregiver to mentor. It helps you understand what your teen is going through, strengthen your connection with the 3Cs, and adjust your own responses with honesty and care.",
    pdf: pdf10,
  },
];

const ReadyToUseTools = () => {
  const handleDownload = (pdf: string, filename: string) => {
    const link = document.createElement("a");
    link.href = pdf;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 bg-background min-h-screen">
        <section className="footer-theme-legacy py-12 md:py-20 bg-card border-b border-border/50">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl text-center">
            <h1>
              <LetterSwapForward
                label="Ready to Use Tools"
                className="justify-center text-4xl md:text-5xl font-display font-bold mb-4"
                style={{ color: '#FCEADE' }}
              />
            </h1>
            <p className="text-lg text-white font-body">Practical guides and workbooks to support your teen's growth and strengthen your connection.</p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="space-y-5">
              {readyToUseTools.map((tool) => (
                <div
                  key={tool.id}
                  className="rounded-xl border border-border/60 bg-white [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-6 md:p-8 hover:border-primary/40 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                        <h2 className="text-lg md:text-xl font-display font-semibold text-primary">{tool.heading}</h2>
                      </div>
                      <p className="text-muted-foreground font-body text-sm md:text-base leading-relaxed">{tool.description}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleDownload(tool.pdf, `${tool.heading}.pdf`)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-primary bg-transparent text-primary px-3 py-2 md:px-4 md:py-2.5 text-xs md:text-sm font-semibold hover:bg-primary/10 transition-colors"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ReadyToUseTools;

