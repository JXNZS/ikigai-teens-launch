import { useParams, useNavigate } from "react-router-dom";
import { Download, ChevronLeft, FileText } from "lucide-react";
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

const pdfMap: { [key: string]: { url: string; title: string; description: string } } = {
  "1": {
    url: pdf1,
    title: "Your 3R Family Connection Planner",
    description: "A simple planner built around three powerful habits — Reflection, Realignment, and Ritual.",
  },
  "2": {
    url: pdf2,
    title: "The Self-Aware Parent Journal",
    description: "A journaling guide that helps you look inward before looking at your teen.",
  },
  "3": {
    url: pdf3,
    title: "Raising an Unshakeable Teen",
    description: "A guide to building real confidence in your teen through resilience.",
  },
  "4": {
    url: pdf4,
    title: "The Courage to Try Again Guide",
    description: "A reflection guide introducing the 4A Model for handling mistakes.",
  },
  "5": {
    url: pdf5,
    title: "The 5-Day Listening Habit",
    description: "A short, daily practice to help you truly hear your teen.",
  },
  "6": {
    url: pdf6,
    title: "Belonging Begins at Home",
    description: "A guide to building identity and self-worth from the inside out.",
  },
  "7": {
    url: pdf7,
    title: "The Calm Connection Workbook",
    description: "A 5-step evening workbook for supporting teens with anxiety and stress.",
  },
  "8": {
    url: pdf8,
    title: "The Family Digital Reset Guide",
    description: "A practical reset plan for healthier screen boundaries.",
  },
  "9": {
    url: pdf9,
    title: "Understanding Your Teen's Mind",
    description: "A science-backed guide explaining teen brain development.",
  },
  "10": {
    url: pdf10,
    title: "The Teen Transition Years Toolkit",
    description: "A three-part guide for navigating the shift from caregiver to mentor.",
  },
};

const PDFViewer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const pdfData = id ? pdfMap[id] : null;

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
        <main className="pt-16 bg-background min-h-screen flex items-center justify-center">
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
      <main className="pt-16 bg-background min-h-screen">
        <section className="sticky top-16 z-40 bg-card border-b border-border/50 py-3 md:py-4">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <button
                  onClick={() => navigate("/resources/ready-to-use-tools")}
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:opacity-80 transition-opacity flex-shrink-0"
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span className="hidden sm:inline">Back</span>
                </button>
                <div className="min-w-0 flex-1">
                  <h1 className="text-sm md:text-base font-display font-semibold text-foreground truncate">
                    {pdfData.title}
                  </h1>
                </div>
              </div>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary text-white px-3 py-2 text-xs md:text-sm font-semibold hover:bg-primary/90 transition-colors flex-shrink-0 ml-3"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Download</span>
              </button>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-12 bg-background">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="rounded-xl border border-border/60 bg-[hsl(42_38%_88%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-4 md:p-6 mb-6">
              <div className="flex items-start gap-3 mb-2">
                <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-lg md:text-xl font-display font-semibold text-primary">{pdfData.title}</h2>
                  <p className="text-sm md:text-base text-muted-foreground mt-2">{pdfData.description}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-border/60 bg-background">
              <iframe
                src={`${pdfData.url}#toolbar=0`}
                className="w-full h-[80vh] border-none"
                title={pdfData.title}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PDFViewer;
