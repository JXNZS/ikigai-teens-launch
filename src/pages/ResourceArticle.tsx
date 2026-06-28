import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock3, User, Eye } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { articles, findArticleBySlug } from "@/lib/articles";
import PdfInlineViewer from "@/components/ui/pdf-inline-viewer";
import TextToSpeechButton, { resetTextToSpeechState } from "@/components/TextToSpeechButton";
import { getBlogViews, incrementBlogViews } from "@/lib/blogViews";

const normalizeCitationText = (text: string) => {
  return text
    .replace(/`r`n/g, "\n")
    .replace(/\\\[/g, "[")
    .replace(/\\\]/g, "]")
    .replace(/\[\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)\]/g, "[$1]($2)")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, "[$1]");
};

const ResourceArticle = () => {
  const { slug } = useParams();
  const article = findArticleBySlug(slug);
  const location = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);

  const [views, setViews] = useState<number | undefined>(undefined);
  const [moreViews, setMoreViews] = useState<Record<string, number>>({});

  useEffect(() => {
    if (article) {
      const updatedViews = incrementBlogViews(article.slug);
      setViews(updatedViews);

      const moreViewsMap: Record<string, number> = {};
      const related = articles.filter((item) => item.slug !== article.slug).slice(0, 4);
      related.forEach((item) => {
        moreViewsMap[item.slug] = getBlogViews(item.slug);
      });
      setMoreViews(moreViewsMap);
    }
  }, [slug]);

  useEffect(() => {
    return () => {
      resetTextToSpeechState();
    };
  }, [location.pathname]);

  if (!article) {
    return <Navigate to="/resources" replace />;
  }

  const moreArticles = articles.filter((item) => item.slug !== article.slug).slice(0, 4);

  return (
    <>
      <Navbar />
      <main className="pt-16 bg-background min-h-screen">
        <section className="footer-theme-legacy py-12 md:py-16 md:py-20 bg-card border-b border-border/50">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="mb-4 md:mb-5 flex items-center justify-between gap-4">
              <Link to="/resources" className="inline-flex items-center gap-2 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Back to all articles
              </Link>

              <span className="shrink-0 text-xs md:text-sm font-medium text-muted-foreground text-right">
                {article.audience}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-5xl font-display font-semibold tracking-tight leading-tight max-w-4xl mb-4 md:mb-5" style={{ color: '#FCEADE' }}>
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 md:gap-5 text-xs md:text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <User className="h-4 w-4" />
                {article.author}
              </span>
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {article.publishedOn}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4" />
                {article.readTime}
              </span>
              <span className="inline-flex items-center gap-2">
                <Eye className="h-4 w-4" />
                {views !== undefined ? `${views} views` : "..."}
              </span>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-12 lg:py-14 bg-background">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            {article.content && article.content.length > 0 ? (
              <article ref={contentRef} className="relative rounded-xl border border-border/60 bg-white [--foreground:0_0%_0%] [--muted-foreground:0_0%_0%] [--border:152_20%_86%] p-6 md:p-8 mb-14 space-y-5">
                <TextToSpeechButton targetRef={contentRef} />
                {article.content.map((block, index) => {
                  const key = `${block.type}-${index}`;

                  if (block.type === "heading") {
                    return (
                      <h2 key={key} className="text-2xl md:text-3xl font-display font-semibold text-primary pt-2 first:pt-0">
                        {block.text}
                      </h2>
                    );
                  }

                  if (block.type === "quote") {
                    return (
                      <blockquote key={key} className="border-l-4 border-primary/70 pl-4 py-1 text-primary italic text-xl leading-relaxed">
                        {block.text}
                      </blockquote>
                    );
                  }

                  if (block.type === "raw") {
                    return (
                      <div key={key} className="text-muted-foreground text-lg leading-loose whitespace-pre-wrap">
                        {normalizeCitationText(block.text)}
                      </div>
                    );
                  }

                  if (block.type === "image") {
                    return (
                      <figure key={key} className="my-3 md:my-4">
                        <img
                          src={block.src}
                          alt={block.alt}
                          className="w-full h-auto rounded-lg border border-border/40 bg-card"
                          loading="lazy"
                        />
                      </figure>
                    );
                  }

                  if (block.type === "list") {
                    return (
                      <ul key={key} className="list-disc pl-6 space-y-2 text-muted-foreground text-lg leading-loose">
                        {block.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    );
                  }

                  return (
                    <p key={key} className="text-muted-foreground text-lg leading-loose">
                      {block.text}
                    </p>
                  );
                })}
              </article>
            ) : (
              <div className="rounded-xl border border-border/60 bg-secondary/20 p-2 md:p-3 mb-14">
                <PdfInlineViewer fileUrl={article.pdfUrl} className="w-full" />
              </div>
            )}

            <div>
              <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-6">More Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {moreArticles.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/resources/blog/${item.slug}`}
                    className="rounded-xl border border-border/60 bg-white [--foreground:0_0%_0%] [--muted-foreground:0_0%_0%] [--border:152_20%_86%] p-5 hover:border-primary/40 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <p className="text-xs font-semibold text-primary mb-1.5">{item.audience}</p>
                      <h3 className="text-lg font-semibold text-primary mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.summary}</p>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground mt-2">
                      <span className="inline-flex items-center gap-1.5">
                        <Eye className="h-3.5 w-3.5" />
                        {moreViews[item.slug] !== undefined ? `${moreViews[item.slug]} views` : "..."}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ResourceArticle;

