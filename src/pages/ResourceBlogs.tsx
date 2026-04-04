import { Link } from "react-router-dom";
import { Calendar, Clock3, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { articles } from "@/lib/articles";

const ResourceBlogs = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16 bg-background min-h-screen">
        <section className="py-20 bg-card/60 border-b border-border/50">
          <div className="container mx-auto px-6 max-w-5xl text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">Blog / Articles</h1>
            <p className="text-lg text-muted-foreground font-body">Browse all published blogs in sequence.</p>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {articles.map((article, index) => (
                <Link
                  key={article.slug}
                  to={`/resources/blog/${article.slug}`}
                  className="rounded-xl border border-border/60 bg-card/70 p-5 hover:bg-card transition-colors"
                >
                  <p className="text-xs font-semibold text-primary mb-1.5">
                    {index + 1}. {article.audience}
                  </p>
                  <h2 className="text-xl font-display font-semibold text-foreground mb-2 leading-snug">{article.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{article.summary}</p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" />
                      {article.author}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {article.publishedOn}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="h-3.5 w-3.5" />
                      {article.readTime}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ResourceBlogs;
