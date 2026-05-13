import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Download, ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

const pdfMap: Record<string, { url: string; title: string; description: string }> = {
  1: {
    url: pdf1,
    title: "Your 3R Family Connection Planner",
    description:
      "A simple planner built around three powerful habits — Reflection, Realignment, and Ritual. It helps you notice your emotional patterns, align your family around shared values, and build weekly routines that bring you closer to your teen. Small, steady actions that add up.",
  },
  2: {
    url: pdf2,
    title: "The Self-Aware Parent Journal",
    description:
      "A journaling guide that helps you look inward before looking at your teen. It offers honest reflection prompts and a 5-day practice to shift from reacting on impulse to responding with intention. Because how you show up shapes how your teen learns to handle life.",
  },
  3: {
    url: pdf3,
    title: "Raising an Unshakeable Teen",
    description:
      "A guide to building real confidence in your teen — not through praise, but through allowing them to face and recover from challenges. It walks you through five pillars that grow resilience in ordinary, everyday moments.",
  },
  4: {
    url: pdf4,
    title: "The Courage to Try Again Guide",
    description:
      "A reflection guide that helps you rethink how you respond when your teen makes mistakes. It introduces the 4A Model — Acknowledge, Ask, Align, Act — so that failure becomes a doorway to trust rather than shame.",
  },
  5: {
    url: pdf5,
    title: "The 5-Day Listening Habit",
    description:
      "A short, daily practice to help you slow down and truly hear your teen. Each day focuses on a different listening skill — from pausing before speaking to celebrating the small moments they open up. Connection begins with attention.",
  },
  6: {
    url: pdf6,
    title: "Belonging Begins at Home",
    description:
      "A guide to understanding why your teen craves belonging and how your home can be their safest anchor. It offers practical tools — from the Check-In Circle to the Peer Pressure Playbook — to build identity and self-worth from the inside out.",
  },
  7: {
    url: pdf7,
    title: "The Calm Connection Workbook",
    description:
      "A 5-step evening workbook to help you support a teen dealing with anxiety, stress, or low self-esteem. It helps you recognize the signs, listen without lecturing, and respond in ways that build emotional safety — one quiet evening at a time.",
  },
  8: {
    url: pdf8,
    title: "The Family Digital Reset Guide",
    description:
      "A practical reset plan to help your family build healthier boundaries around screens — together, not as punishment. It moves through four steps: Reflect, Reset, Reconnect, and Reinforce, making tech a tool rather than a tension point at home.",
  },
  9: {
    url: pdf9,
    title: "Understanding Your Teen's Mind",
    description:
      "A science-backed guide that explains why your teen thinks, feels, and reacts the way they do — and it's not defiance, it's brain development. It gives you a simple weekly action plan to co-regulate emotions and become the calm your teen needs.",
  },
  10: {
    url: pdf10,
    title: "The Teen Transition Years Toolkit",
    description:
      "A three-part guide — Reflect, Relate, Reframe — designed for parents navigating the shift from caregiver to mentor. It helps you understand what your teen is going through, strengthen your connection with the 3Cs, and adjust your own responses with honesty and care.",
  },
};

const PDFViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const pdfData = useMemo(() => (id ? pdfMap[id] : undefined), [id]);

  useEffect(() => {
    if (pdfData) {
      document.title = `${pdfData.title} | Ikigai Teen`;
    }

    return () => {
      document.title = "Ikigai Teen - Empowering Teens to Find Their Purpose";
    };
  }, [pdfData]);

  const handleDownload = () => {
    if (!pdfData) return;

    const link = document.createElement("a");
    link.href = pdfData.url;
    link.download = `${pdfData.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!pdfData) {
    return (
      <>
        <Navbar />
        <main className="pt-16 bg-background min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <p className="text-lg text-muted-foreground font-body">PDF not found</p>
            <button
              onClick={() => navigate("/resources/ready-to-use-tools")}
              className="mt-4 inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Tools
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 bg-background min-h-screen overflow-x-hidden">
        <section className="footer-theme-legacy py-12 md:py-20 bg-card border-b border-border/50">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 leading-tight" style={{ color: "#FCEADE" }}>
              {pdfData.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white font-body max-w-3xl mx-auto">
              {pdfData.description}
            </p>
          </div>
        </section>

        <section className="py-6 md:py-12 bg-background">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-4">
              <button
                onClick={() => navigate("/resources/ready-to-use-tools")}
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline self-start"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to Tools
              </button>

              <button
                onClick={handleDownload}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary text-white px-3 py-2 text-xs md:text-sm font-semibold hover:bg-primary/90 transition-colors self-start sm:self-auto"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </button>
            </div>

            <div className="rounded-xl border border-border/60 bg-white [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-2 sm:p-3 md:p-4">
              <div className="rounded-lg overflow-hidden bg-white border border-border/40">
                <iframe
                  src={pdfData.url}
                  title={pdfData.title}
                  className="block w-full h-[78vh] min-h-[560px] md:h-[82vh] border-none"
                />
              </div>
              <p className="mt-3 text-xs sm:text-sm text-muted-foreground font-body text-center">
                If the PDF does not display properly on your device, use the download button above.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PDFViewer;
