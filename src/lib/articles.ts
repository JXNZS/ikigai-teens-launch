import blog2Parent2 from "@/assets/BLOG 2 PARENT FORMAT 2.pdf";
import blog2Teen from "@/assets/BLOG 2 TEEN FORMAT.pdf";
import blog3Parent from "@/assets/BLOG 3 PARENT FORMAT.pdf";
import blog3Teen from "@/assets/BLOG 3 TEEN FORMAT.pdf";
import blog4Parent from "@/assets/BLOG 4 PARENT FORMAT.pdf";
import blog4Teen from "@/assets/BLOG 4 TEEN FORMAT.pdf";
import blog5Parent from "@/assets/BLOG 5 PARENT FORMAT.pdf";
import blog5Teen from "@/assets/BLOG 5 TEEN FORMAT.pdf";
import websiteBlog1Image from "@/assets/website blog 1 image.png";
import websiteBlog2Image from "@/assets/Website blog 2 png.png";
import websiteBlog3Image from "@/assets/website Blog 3 png.png";
import websiteBlog4Image from "@/assets/Website blog 4 png.png";
import websiteBlog5Image from "@/assets/Website blog 5 png.png";
import websiteBlog6Image from "@/assets/Website blog 6 png.png";
import zubaidaEp1Image from "@/assets/zubaida/zubaida-ep1-1.png";
import zubaidaEp2Image from "@/assets/zubaida/zubaida-ep2-1.png";
import zubaidaEp3Image from "@/assets/zubaida/zubaida-ep3-1.png";
import zubaidaEp4Image from "@/assets/zubaida/zubaida-ep4-1.png";
import zubaidaEp5Image from "@/assets/zubaida/zubaida-ep5-1.png";
import zubaidaEp6Image from "@/assets/zubaida/zubaida-ep6-1.png";
import zubaidaEp7Image from "@/assets/zubaida/zubaida-ep7-1.png";
import { articleBodies, type ArticleContentBlock } from "@/lib/articleBodies";
import { zubaidaBodies } from "./zubaidaBodies";

const stripLeadingTitle = (text: string | undefined, title: string) => {
  if (!text) return "";
  const normalizedText = text.replace(/\r\n/g, "\n");
  const normalizedTitle = title.trim();

  if (!normalizedText.startsWith(normalizedTitle)) {
    return text;
  }

  return normalizedText
    .slice(normalizedTitle.length)
    .replace(/^\n+/, "")
    .replace(/\n/g, "\r\n");
};

const getArticleBodyString = (slug: string): string => {
  const body = articleBodies[slug];
  return typeof body === "string" ? body : "";
};

const getArticleBodyBlocks = (slug: string): ArticleContentBlock[] => {
  const body = articleBodies[slug];
  return Array.isArray(body) ? body : [];
};

export type Article = {
  slug: string;
  title: string;
  audience: string;
  summary: string;
  author: string;
  pdfUrl: string;
  readTime: string;
  publishedOn: string;
  content?: ArticleContentBlock[];
};

export const articles: Article[] = [
  { slug: "study-smarter-not-longer-healthy-habits-that-prevent-burnout", title: "Study Smarter, Not Longer: Healthy Habits That Prevent Burnout", audience: "For Parents", summary: "Burnout rarely appears overnight. It is usually the result of dozens of small habits repeated over weeks or months—late nights, skipped breaks, constant self-pressure, endless comparison, and the belief that working longer always means learning more.", author: "Ikigai Teen", pdfUrl: "", readTime: "5 min read", publishedOn: "25/07/2026", content: [ { type: "image", src: websiteBlog6Image, alt: "Study Smarter, Not Longer: Healthy Habits That Prevent Burnout" }, { type: "raw", text: stripLeadingTitle(getArticleBodyString("study-smarter-not-longer-healthy-habits-that-prevent-burnout"), "Study Smarter, Not Longer: Healthy Habits That Prevent Burnout") } ] },
  { slug: "the-link-between-perfectionism-and-academic-burnout", title: "The Link Between Perfectionism and Academic Burnout", audience: "For Parents", summary: "What if the pursuit of perfection is being driven by fear rather than passion? That distinction can make all the difference. Perfectionism Isn't About Wanting Things to Be Perfect", author: "Ikigai Teen", pdfUrl: "", readTime: "6 min read", publishedOn: "18/07/2026", content: [ { type: "image", src: websiteBlog5Image, alt: "The Link Between Perfectionism and Academic Burnout" }, { type: "raw", text: stripLeadingTitle(getArticleBodyString("the-link-between-perfectionism-and-academic-burnout"), "The Link Between Perfectionism and Academic Burnout") } ] },
  { slug: "when-encouragement-feels-like-pressure", title: "When Encouragement Feels Like Pressure: A Parent's Guide", audience: "For Parents", summary: "Can encouragement itself sometimes become pressure? For many parents, this idea feels uncomfortable.", author: "Ikigai Teen", pdfUrl: "", readTime: "5 min read", publishedOn: "11/07/2026", content: [ { type: "image", src: websiteBlog4Image, alt: "When Encouragement Feels Like Pressure" }, { type: "raw", text: stripLeadingTitle(getArticleBodyString("when-encouragement-feels-like-pressure"), "When Encouragement Feels Like Pressure: A Parent's Guide") } ] },
  { slug: "why-high-achieving-students-are-more-vulnerable-to-burnout", title: "Why High-Achieving Students Are More Vulnerable to Burnout", audience: "For Parents", summary: "If a teenager is succeeding academically, shouldn't they be less likely to burn out? Ironically, the opposite is often true.", author: "Ikigai Teen", pdfUrl: "", readTime: "5 min read", publishedOn: "04/07/2026", content: [ { type: "image", src: websiteBlog3Image, alt: "Why High-Achieving Students Are More Vulnerable to Burnout" }, { type: "raw", text: stripLeadingTitle(getArticleBodyString("why-high-achieving-students-are-more-vulnerable-to-burnout"), "Why High-Achieving Students Are More Vulnerable to Burnout") } ] },
  { slug: "is-your-teen-burned-out", title: "Is Your Teen Burned Out? The Warning Sign Most Parents Never Notice", audience: "For Parents", summary: "Burnout isn't always visible. Sometimes it hides behind good grades. Sometimes it hides behind responsibility. Sometimes it hides behind a smile.", author: "Ikigai Teen", pdfUrl: "", readTime: "4 min read", publishedOn: "20/06/2026", content: [ { type: "image", src: websiteBlog1Image, alt: "Teen burnout illustration" }, { type: "raw", text: stripLeadingTitle(getArticleBodyString("is-your-teen-burned-out"), "Is Your Teen Burned Out? The Warning Sign Most Parents Never Notice") } ] },
  { slug: "stress-vs-burnout-in-teens", title: "The Difference Between Stress and Burnout in Teenagers: When \"Busy\" Becomes \"Empty\"", audience: "For Parents", summary: "How to tell if your teen is stressed or burned out and what to do next.", author: "Ikigai Teen", pdfUrl: "", readTime: "4 min read", publishedOn: "27/06/2026", content: [ { type: "image", src: websiteBlog2Image, alt: "Stress vs Burnout illustration" }, { type: "raw", text: stripLeadingTitle(getArticleBodyString("stress-vs-burnout-in-teens"), "The Difference Between Stress and Burnout in Teenagers: When \"Busy\" Becomes \"Empty\"") } ] },
  { slug: "digital-is-not-the-enemy-for-teens", title: "Digital Is Not the Enemy: How to Use Your Phone Without Wasting Your Life", audience: "For Teens", summary: "That doesn't mean you're lazy. It means you're living in a world designed to pull attention. Your phone is not the enemy. Unconscious use is.", author: "Ikigai Teen", pdfUrl: blog5Teen, readTime: "4 min read", publishedOn: "15/04/2026", content: getArticleBodyBlocks("digital-is-not-the-enemy-for-teens") },
  { slug: "digital-is-not-the-enemy-parent-guide", title: "Digital Is Not the Enemy: A Parent's Guide to Healthy Digital Habits for Teens", audience: "For Parents", summary: "Teens do not need a world without screens, they need adults who can coach them toward healthier digital routines.", author: "Ikigai Teen", pdfUrl: blog5Parent, readTime: "4 min read", publishedOn: "01/04/2026", content: getArticleBodyBlocks("inside-the-teen-brain-digital-world") },
  { slug: "digital-is-not-the-enemy-for-parents", title: "Digital Is Not the Enemy: The Missed Opportunities Parents Overlook While Focusing Only on Screen Time", audience: "For Parents", summary: "Most conversations about teens and technology revolve around one question: how much screen time is too much.", author: "Ikigai Teen", pdfUrl: blog4Parent, readTime: "5 min read", publishedOn: "18/03/2026", content: getArticleBodyBlocks("digital-is-not-the-enemy-for-parents") },
  { slug: "from-tool-to-trap-phone-starts-using-you", title: "From Tool to Trap: How to Know When Your Phone Starts Using You", audience: "For Teens", summary: "Your phone is useful. It helps you learn, relax, connect, and escape boredom.", author: "Ikigai Teen", pdfUrl: blog3Teen, readTime: "3 min read", publishedOn: "04/03/2026", content: getArticleBodyBlocks("from-tool-to-trap-phone-starts-using-you") },
  { slug: "from-tool-to-trap-digital-dependence-in-teens", title: "From Tool to Trap: When Digital Use Quietly Turns into Digital Dependence in Teens", audience: "For Parents", summary: "Digital dependence rarely begins with extreme behaviour.", author: "Ikigai Teen", pdfUrl: blog2Parent2, readTime: "5 min read", publishedOn: "18/02/2026", content: getArticleBodyBlocks("from-tool-to-trap-digital-dependence-in-teens") },
  { slug: "social-media-comparison-and-you", title: "Social Media, Comparison, and You: Why So Many Teens Feel 'Never Enough'", audience: "For Teens", summary: "Have you ever looked at someone's post and suddenly felt worse about your own life?", author: "Ikigai Teen", pdfUrl: blog4Teen, readTime: "4 min read", publishedOn: "04/02/2026", content: getArticleBodyBlocks("social-media-comparison-and-you") },
  { slug: "social-media-self-worth-comparison-culture", title: "Social Media, Self-Worth, and Comparison Culture: Why Today's Teens Feel 'Never Enough'", audience: "For Parents", summary: "Today's teenagers are growing up inside a comparison machine.", author: "Ikigai Teen", pdfUrl: blog3Parent, readTime: "4 min read", publishedOn: "21/01/2026", content: getArticleBodyBlocks("social-media-self-worth-comparison-culture") },
  { slug: "your-brain-isnt-broken", title: "Your Brain Isn't Broken. It's Just Growing Up in a Crazy Digital World.", audience: "For Teens", summary: "If you've ever said 'I'll stop scrolling after 5 minutes' and then it's suddenly 1 hour later...", author: "Ikigai Teen", pdfUrl: blog2Teen, readTime: "5 min read", publishedOn: "07/01/2026", content: getArticleBodyBlocks("your-brain-isnt-broken") },

  { slug: "zubaida-ep7-blog", title: "The Silent Struggles: Understanding Anxiety, Stress, and Self-Esteem in Teens", audience: "For Parents", summary: "Teen mental health struggles can hide behind smiles, grades, and performance.", author: "Ikigai Teen", pdfUrl: "", readTime: "5 min read", publishedOn: "24/12/2025", content: [ { type: "image", src: zubaidaEp7Image, alt: "Zubaida Ep7 Blog image" }, { type: "raw", text: stripLeadingTitle(zubaidaBodies["zubaida-ep7-blog"], "The Silent Struggles: Understanding Anxiety, Stress, and Self-Esteem in Teens") } ] },
  { slug: "zubaida-ep6-blog", title: "Who Am I? Navigating Teen Identity, Belonging, and Peer Pressure", audience: "For Parents", summary: "Teen identity is a messy search for belonging, authenticity, and self-worth.", author: "Ikigai Teen", pdfUrl: "", readTime: "5 min read", publishedOn: "10/12/2025", content: [ { type: "image", src: zubaidaEp6Image, alt: "Zubaida Ep6 Blog image" }, { type: "raw", text: stripLeadingTitle(zubaidaBodies["zubaida-ep6-blog"], "Who Am I? Navigating Teen Identity, Belonging, and Peer Pressure") } ] },
  { slug: "zubaida-ep5-blog", title: "Digital Overload: Why Our Teens Can't Just 'Switch Off'", audience: "For Parents", summary: "Screens can crowd out sleep, focus, and real connection faster than parents expect.", author: "Ikigai Teen", pdfUrl: "", readTime: "5 min read", publishedOn: "26/11/2025", content: [ { type: "image", src: zubaidaEp5Image, alt: "Zubaida Ep5 Blog image" }, { type: "raw", text: stripLeadingTitle(zubaidaBodies["zubaida-ep5-blog"], "Digital Overload: Why Our Teens Can't Just 'Switch Off'") } ] },
  { slug: "zubaida-ep4-blog", title: "What Were They Thinking? Unlocking the Secrets of the Teen Mindset", audience: "For Parents", summary: "Teen behaviour is often biology, not defiance - and understanding that changes everything.", author: "Ikigai Teen", pdfUrl: "", readTime: "5 min read", publishedOn: "12/11/2025", content: [ { type: "image", src: zubaidaEp4Image, alt: "Zubaida Ep4 Blog image" }, { type: "raw", text: stripLeadingTitle(zubaidaBodies["zubaida-ep4-blog"], "What Were They Thinking? Unlocking the Secrets of the Teen Mindset") } ] },
  { slug: "zubaida-ep3-blog", title: "The Teen Transition: Why Your Presence as a Parent Matters More Than Ever", audience: "For Parents", summary: "Teens need presence, not control, as they navigate a fast-changing world.", author: "Ikigai Teen", pdfUrl: "", readTime: "5 min read", publishedOn: "29/10/2025", content: [ { type: "image", src: zubaidaEp3Image, alt: "Zubaida Ep3 Blog image" }, { type: "raw", text: stripLeadingTitle(zubaidaBodies["zubaida-ep3-blog"], "The Teen Transition: Why Your Presence as a Parent Matters More Than Ever") } ] },
  { slug: "zubaida-ep2-blog", title: "6 More Principles to Empower Tomorrow's Leaders", audience: "For Parents", summary: "More practical leadership principles for raising resilient, thoughtful teens.", author: "Ikigai Teen", pdfUrl: "", readTime: "5 min read", publishedOn: "15/10/2025", content: [ { type: "image", src: zubaidaEp2Image, alt: "Zubaida Ep2 Blog image" }, { type: "raw", text: stripLeadingTitle(zubaidaBodies["zubaida-ep2-blog"], "6 More Principles to Empower Tomorrow's Leaders") } ] },
  { slug: "zubaida-ep1-blog", title: "Feeling Stuck with your teen? 6 Principles for Building a Stronger, More Resilient Life", audience: "For Parents", summary: "Practical principles to help teens and parents build clarity, resilience, and strength.", author: "Ikigai Teen", pdfUrl: "", readTime: "5 min read", publishedOn: "01/10/2025", content: [ { type: "image", src: zubaidaEp1Image, alt: "Zubaida Ep1 Blog image" }, { type: "raw", text: stripLeadingTitle(zubaidaBodies["zubaida-ep1-blog"], "Feeling Stuck with your teen? 6 Principles for Building a Stronger, More Resilient Life") } ] },
];

export const findArticleBySlug = (slug?: string) => articles.find((article) => article.slug === slug);
