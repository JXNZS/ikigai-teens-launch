import { ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LetterSwapForward } from "@/components/ui/letter-swap";
import { getYoutubeThumbnail } from "@/lib/videos";

const recentEvents = [
  {
    title: "Peepal TV Podcast 1",
    youtubeUrl: "https://www.youtube.com/watch?v=Ei1vhi6TGK0",
  },
  {
    title: "Peepal TV Podcast 2",
    youtubeUrl: "https://www.youtube.com/watch?v=3ZB7xZ5uw0c",
  },
];

const RecentEvents = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16 bg-background min-h-screen">
        <section className="footer-theme-legacy py-12 md:py-20 bg-card border-b border-border/50">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl text-center">
            <h1>
              <LetterSwapForward
                label="Recent Events"
                className="justify-center text-4xl md:text-5xl font-display font-bold mb-4"
                style={{ color: '#FCEADE' }}
              />
            </h1>
            <p className="text-lg text-white font-body">Catch up on the latest community events and open them directly on YouTube.</p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {recentEvents.map((event) => (
                <a
                  key={event.youtubeUrl}
                  href={event.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-border/60 bg-[hsl(42_38%_88%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] overflow-hidden hover:border-primary/40 transition-colors"
                >
                  <div className="aspect-video bg-secondary/40">
                    <img
                      src={getYoutubeThumbnail(event.youtubeUrl)}
                      alt={`${event.title} thumbnail`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-4">
                    <h2 className="text-lg font-display font-semibold text-primary leading-snug">{event.title}</h2>
                    <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      Open on YouTube
                      <ExternalLink className="h-3.5 w-3.5" />
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default RecentEvents;
