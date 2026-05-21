import { type ReactNode, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import SEO from "@/components/SEO";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import FounderTeam from "./pages/FounderTeam.tsx";
import GroundingPhilosophy from "./pages/GroundingPhilosophy.tsx";
import ValuesVisionMission from "./pages/ValuesVisionMission.tsx";
import Journey from "./pages/Journey.tsx";
import Teenzone from "./pages/Teenzone.tsx";
import KnowYourself from "./pages/KnowYourself.tsx";
import TeenToolkit from "./pages/TeenToolkit.tsx";
import IkigaiTeenClub from "./pages/IkigaiTeenClub.tsx";
import IkigaiTeenApp from "./pages/IkigaiTeenApp.tsx";
import ParentHub from "./pages/ParentHub.tsx";
import ResourceArticle from "./pages/ResourceArticle.tsx";
import ResourceBlogs from "./pages/ResourceBlogs.tsx";
import ResourceVideos from "./pages/ResourceVideos.tsx";
import RecentEvents from "./pages/RecentEvents.tsx";
import UpcomingEvents from "./pages/UpcomingEvents.tsx";
import ReadyToUseTools from "./pages/ReadyToUseTools.tsx";
import PDFViewer from "./pages/PDFViewer.tsx";
import GetInvolved from "./pages/GetInvolved.tsx";
import BeOurExperts from "./pages/BeOurExperts.tsx";
import BeOurCollaborators from "./pages/BeOurCollaborators.tsx";
import BeOurTraineeCoaches from "./pages/BeOurTraineeCoaches.tsx";
import BeOurInternsGuests from "./pages/BeOurInternsGuests.tsx";
import BeOurPatrons from "./pages/BeOurPatrons.tsx";
import IkigaiTeenPatrons from "./pages/IkigaiTeenPatrons.tsx";
import NotFound from "./pages/NotFound.tsx";
import ParentRole from "./pages/ParentRole.tsx";
import ParentChallenges from "./pages/ParentChallenges.tsx";
import ParentCollab from "./pages/ParentCollab.tsx";
import ParentCircle from "./pages/ParentCircle.tsx";
import { findArticleBySlug } from "@/lib/articles";

const queryClient = new QueryClient();

const routeSeo = {
  home: {
    title: "Ikigai Teen | Helping Teens Discover Purpose, Growth & Direction",
    description:
      "Ikigai Teen empowers teenagers with mentorship, self-discovery tools, learning resources, community support and opportunities for growth.",
  },
  about: {
    title: "About Ikigai Teen | Our Vision, Mission & Story",
    description:
      "Learn about Ikigai Teen, our mission, values, vision and journey in supporting teenagers through growth, purpose and personal development.",
  },
  journey: {
    title: "Our Journey | Ikigai Teen",
    description:
      "Explore the story behind Ikigai Teen and how the initiative evolved to support teenagers, parents and educators.",
  },
  valuesVisionMission: {
    title: "Values, Vision & Mission | Ikigai Teen",
    description:
      "Discover the values, vision and mission that guide Ikigai Teen in empowering teenagers through purpose-driven growth.",
  },
  groundingPhilosophy: {
    title: "Grounding Philosophy | Ikigai Teen",
    description:
      "Learn about the philosophy and principles that shape Ikigai Teen's approach to youth development and self-discovery.",
  },
  founderTeam: {
    title: "Founder Team | Ikigai Teen",
    description:
      "Meet the founders and team members behind Ikigai Teen and learn about their passion for empowering young people.",
  },
  teenzone: {
    title: "TeenZone | Resources for Teen Growth & Self Discovery",
    description:
      "Discover practical resources, guidance, activities and learning opportunities designed to help teenagers grow with confidence.",
  },
  knowYourself: {
    title: "Know Yourself | Self Discovery for Teens",
    description:
      "Develop self-awareness, understand your strengths and explore your identity through guided self-discovery resources.",
  },
  teenToolkit: {
    title: "Teen Toolkit | Practical Tools for Everyday Growth",
    description:
      "Access worksheets, frameworks, activities and resources that help teenagers build confidence, skills and resilience.",
  },
  ikigaiTeenClub: {
    title: "Ikigai Teen Club | Community for Teen Growth",
    description:
      "Join a supportive community where teenagers can learn, connect, collaborate and grow together.",
  },
  ikigaiTeenApp: {
    title: "Ikigai Teen App | Digital Growth Companion for Teens",
    description:
      "Explore the Ikigai Teen App and access resources, activities and guidance for personal growth and self-development.",
  },
  parentHub: {
    title: "Parent Hub | Guidance for Parents of Teenagers",
    description:
      "Support your teenager's development with insights, resources and practical guidance for parenting through adolescence.",
  },
  parentRole: {
    title: "The Parent Role | Parenting Teenagers Effectively",
    description:
      "Learn how parents can create supportive environments that encourage growth, independence and emotional well-being.",
  },
  parentChallenges: {
    title: "Parent Challenges | Understanding Teenage Development",
    description:
      "Explore common parenting challenges and discover practical strategies for supporting teenagers.",
  },
  parentCollab: {
    title: "Parent Collaboration | Working Together for Teen Growth",
    description:
      "Learn how parents, mentors and communities can collaborate to support healthy teen development.",
  },
  parentCircle: {
    title: "Parent Circle | Community for Parents",
    description:
      "Connect with other parents, share experiences and access support through the Parent Circle community.",
  },
  resourcesBlogs: {
    title: "Teen Growth Articles & Blogs | Ikigai Teen",
    description:
      "Read articles, insights and practical guidance on personal growth, education, well-being and teenage development.",
  },
  resourcesVideos: {
    title: "Educational Videos for Teens | Ikigai Teen",
    description:
      "Watch engaging videos focused on self-discovery, learning, personal growth and life skills for teenagers.",
  },
  readyToUseTools: {
    title: "Ready-to-Use Growth Tools | Ikigai Teen",
    description:
      "Access practical tools, worksheets and resources designed to support teen learning and development.",
  },
  recentEvents: {
    title: "Recent Events | Ikigai Teen",
    description: "Explore recent workshops, activities and community events hosted by Ikigai Teen.",
  },
  upcomingEvents: {
    title: "Upcoming Events | Ikigai Teen",
    description:
      "Stay informed about upcoming events, programs and opportunities for teenagers and parents.",
  },
  getInvolved: {
    title: "Get Involved | Join the Ikigai Teen Community",
    description:
      "Discover ways to contribute, collaborate and support Ikigai Teen's mission of empowering young people.",
  },
  beOurExperts: {
    title: "Become an Expert | Contribute to Ikigai Teen",
    description:
      "Join Ikigai Teen as an expert mentor, educator or professional and help guide teenagers toward meaningful growth.",
  },
  beOurCollaborators: {
    title: "Become a Collaborator | Partner with Ikigai Teen",
    description:
      "Collaborate with Ikigai Teen through partnerships, projects and initiatives that benefit young people.",
  },
  beOurTraineeCoaches: {
    title: "Become a Trainee Coach | Ikigai Teen",
    description:
      "Develop coaching skills and help support teenagers through learning, mentorship and personal growth initiatives.",
  },
  beOurInternsGuests: {
    title: "Volunteer, Intern or Guest | Ikigai Teen",
    description:
      "Join Ikigai Teen as a volunteer, intern or guest contributor and help create meaningful impact.",
  },
  beOurPatrons: {
    title: "Support Ikigai Teen | Become a Patron",
    description:
      "Partner with Ikigai Teen and support programs, resources and opportunities that positively impact teenagers.",
  },
} as const;

const pdfSeo = {
  1: {
    title: "Your 3R Family Connection Planner | Ikigai Teen",
    description:
      "A practical planner that helps families build reflection, realignment and ritual habits to strengthen connection and support teen growth.",
  },
  2: {
    title: "The Self-Aware Parent Journal | Ikigai Teen",
    description:
      "A journaling guide for parents who want to shift from reacting impulsively to responding with intention and care.",
  },
  3: {
    title: "Raising an Unshakeable Teen | Ikigai Teen",
    description:
      "A confidence-building guide focused on resilience, recovery and everyday growth for teenagers.",
  },
  4: {
    title: "The Courage to Try Again Guide | Ikigai Teen",
    description:
      "A reflection guide that helps families turn mistakes into learning, trust and better habits over time.",
  },
  5: {
    title: "The 5-Day Listening Habit | Ikigai Teen",
    description:
      "A short daily practice that helps parents slow down, listen better and build stronger connection with their teen.",
  },
  6: {
    title: "Belonging Begins at Home | Ikigai Teen",
    description:
      "A guide to helping families create belonging, safety and identity-building routines that support teen self-worth.",
  },
  7: {
    title: "The Calm Connection Workbook | Ikigai Teen",
    description:
      "A supportive workbook for parents helping teens navigate anxiety, stress and emotional overwhelm with steadier responses.",
  },
  8: {
    title: "The Family Digital Reset Guide | Ikigai Teen",
    description:
      "A step-by-step plan for families who want healthier screen boundaries, stronger routines and less digital conflict.",
  },
  9: {
    title: "Understanding Your Teen's Mind | Ikigai Teen",
    description:
      "A science-backed guide that explains teen brain development and practical ways to support emotional regulation.",
  },
  10: {
    title: "The Teen Transition Years Toolkit | Ikigai Teen",
    description:
      "A practical toolkit for parents navigating the shift from caregiver to mentor during the teenage years.",
  },
  11: {
    title: "Identify and Adjust Your Parenting Style | Ikigai Teen",
    description:
      "A toolkit that helps parents observe their habits, close gaps and create a home where teens can thrive.",
  },
} as const;

type SeoRouteProps = {
  title: string;
  description: string;
  children: ReactNode;
};

const SeoRoute = ({ title, description, children }: SeoRouteProps) => (
  <>
    <SEO title={title} description={description} />
    {children}
  </>
);

const ResourceArticleRoute = () => {
  const { slug } = useParams();
  const article = findArticleBySlug(slug);

  if (!article) {
    return <ResourceArticle />;
  }

  return (
    <SeoRoute title={`${article.title} | Ikigai Teen`} description={article.summary}>
      <ResourceArticle />
    </SeoRoute>
  );
};

const PDFViewerRoute = () => {
  const { id } = useParams();
  const pdfId = id === undefined ? undefined : Number(id);
  const isPdfSeoKey = (value: number): value is keyof typeof pdfSeo => Object.prototype.hasOwnProperty.call(pdfSeo, value);
  const seo = pdfId !== undefined && Number.isInteger(pdfId) && isPdfSeoKey(pdfId) ? pdfSeo[pdfId] : undefined;

  return (
    <SeoRoute
      title={seo?.title ?? "Ready-to-Use Growth Tool | Ikigai Teen"}
      description={seo?.description ?? "Explore practical tools and worksheets from Ikigai Teen designed to support teen growth and learning."}
    >
      <PDFViewer />
    </SeoRoute>
  );
};

const LegacyRedirect = ({ to }: { to: string }) => {
  const location = useLocation();

  return <Navigate to={`${to}${location.search}${location.hash}`} replace />;
};

const ScrollToHash = () => {
  const { hash, pathname, search } = useLocation();

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) {
      return;
    }

    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    const id = hash.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(window.history.state, "", `${pathname}${search}`);
    }
  }, [hash, pathname, search]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToHash />
        <Routes>
          <Route path="/get-involved/ikigai-patrons" element={<LegacyRedirect to="/get-involved/be-our-patrons" />} />
          <Route path="/get-involved/expert" element={<LegacyRedirect to="/get-involved/be-our-experts" />} />
          <Route path="/parent-hub/role" element={<LegacyRedirect to="/parent-hub/parent-role" />} />
          <Route path="/parent-hub/support" element={<LegacyRedirect to="/teenzone/know-yourself" />} />
          <Route path="/" element={<SeoRoute {...routeSeo.home}><Index /></SeoRoute>} />
          <Route path="/about" element={<SeoRoute {...routeSeo.about}><About /></SeoRoute>} />
          <Route path="/about/values-vision-mission" element={<SeoRoute {...routeSeo.valuesVisionMission}><ValuesVisionMission /></SeoRoute>} />
          <Route path="/about/grounding-philosophy" element={<SeoRoute {...routeSeo.groundingPhilosophy}><GroundingPhilosophy /></SeoRoute>} />
          <Route path="/about/journey" element={<SeoRoute {...routeSeo.journey}><Journey /></SeoRoute>} />
          <Route path="/about/founder-team" element={<SeoRoute {...routeSeo.founderTeam}><FounderTeam /></SeoRoute>} />
          <Route path="/teenzone" element={<SeoRoute {...routeSeo.teenzone}><Teenzone /></SeoRoute>} />
          <Route path="/teenzone/know-yourself" element={<SeoRoute {...routeSeo.knowYourself}><KnowYourself /></SeoRoute>} />
          <Route path="/teenzone/teen-toolkit" element={<SeoRoute {...routeSeo.teenToolkit}><TeenToolkit /></SeoRoute>} />
          <Route path="/teenzone/ikigai-teen-club" element={<SeoRoute {...routeSeo.ikigaiTeenClub}><IkigaiTeenClub /></SeoRoute>} />
          <Route path="/teenzone/ikigai-teen-app" element={<SeoRoute {...routeSeo.ikigaiTeenApp}><IkigaiTeenApp /></SeoRoute>} />
          <Route path="/parent-hub" element={<SeoRoute {...routeSeo.parentHub}><ParentHub /></SeoRoute>} />
          <Route path="/parent-hub/parent-role" element={<SeoRoute {...routeSeo.parentRole}><ParentRole /></SeoRoute>} />
          <Route path="/parent-hub/parent-challenges" element={<SeoRoute {...routeSeo.parentChallenges}><ParentChallenges /></SeoRoute>} />
          <Route path="/parent-hub/parent-collab" element={<SeoRoute {...routeSeo.parentCollab}><ParentCollab /></SeoRoute>} />
          <Route path="/parent-hub/parent-circle" element={<SeoRoute {...routeSeo.parentCircle}><ParentCircle /></SeoRoute>} />
          <Route path="/resources" element={<Navigate to="/resources/blogs" replace />} />
          <Route path="/resources/blogs" element={<SeoRoute {...routeSeo.resourcesBlogs}><ResourceBlogs /></SeoRoute>} />
          <Route path="/resources/videos" element={<SeoRoute {...routeSeo.resourcesVideos}><ResourceVideos /></SeoRoute>} />
          <Route path="/resources/ready-to-use-tools" element={<SeoRoute {...routeSeo.readyToUseTools}><ReadyToUseTools /></SeoRoute>} />
          <Route path="/resources/pdf/:id" element={<PDFViewerRoute />} />
          <Route path="/resources/recent-events" element={<SeoRoute {...routeSeo.recentEvents}><RecentEvents /></SeoRoute>} />
          <Route path="/resources/upcoming-events" element={<SeoRoute {...routeSeo.upcomingEvents}><UpcomingEvents /></SeoRoute>} />
          <Route path="/resources/blog/:slug" element={<ResourceArticleRoute />} />
          <Route path="/get-involved" element={<SeoRoute {...routeSeo.getInvolved}><GetInvolved /></SeoRoute>} />
          <Route path="/get-involved/be-our-experts" element={<SeoRoute {...routeSeo.beOurExperts}><BeOurExperts /></SeoRoute>} />
          <Route path="/get-involved/be-our-collaborators" element={<SeoRoute {...routeSeo.beOurCollaborators}><BeOurCollaborators /></SeoRoute>} />
          <Route path="/get-involved/be-our-trainee-coaches" element={<SeoRoute {...routeSeo.beOurTraineeCoaches}><BeOurTraineeCoaches /></SeoRoute>} />
          <Route path="/get-involved/be-our-interns-guests" element={<SeoRoute {...routeSeo.beOurInternsGuests}><BeOurInternsGuests /></SeoRoute>} />
          <Route path="/get-involved/be-our-patrons" element={<SeoRoute {...routeSeo.beOurPatrons}><BeOurPatrons /></SeoRoute>} />
          <Route path="/get-involved/ikigaiteen-patrons" element={<IkigaiTeenPatrons />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
