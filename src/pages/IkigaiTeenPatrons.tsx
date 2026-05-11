import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const IkigaiTeenPatrons = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16 bg-background min-h-screen flex flex-col">
        {/* Hero banner matching other Get Involved pages */}
        <section className="footer-theme-legacy py-20 bg-card border-b border-border/50">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4" style={{ color: '#FCEADE' }}>
              IkigaiTeen Patrons
            </h1>
            <p className="text-lg text-white font-body">
              Meet the people who make this mission possible.
            </p>
          </div>
        </section>

        <section className="flex-1 flex items-center justify-center py-20 px-6 bg-background">
          <div className="max-w-2xl text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-display font-semibold text-primary">
              Coming Soon!
            </h2>
            <p className="text-base md:text-lg text-muted-foreground font-body">
              The IkigaiTeen Patrons page is currently being built. Check back soon to meet the incredible supporters behind this mission.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default IkigaiTeenPatrons;
