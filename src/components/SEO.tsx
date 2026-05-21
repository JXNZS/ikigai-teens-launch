import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://www.ikigaiteen.com";

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
}

const SEO = ({
  title,
  description,
  canonical,
  openGraphTitle,
  openGraphDescription,
  twitterTitle,
  twitterDescription,
}: SEOProps) => {
  const { pathname } = useLocation();
  const resolvedCanonical = canonical ?? `${BASE_URL}${pathname === "/" ? "/" : pathname}`;
  const resolvedOgTitle = openGraphTitle ?? title;
  const resolvedOgDescription = openGraphDescription ?? description;
  const resolvedTwitterTitle = twitterTitle ?? title;
  const resolvedTwitterDescription = twitterDescription ?? description;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={resolvedCanonical} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={resolvedOgTitle} />
      <meta property="og:description" content={resolvedOgDescription} />
      <meta property="og:url" content={resolvedCanonical} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTwitterTitle} />
      <meta name="twitter:description" content={resolvedTwitterDescription} />
    </Helmet>
  );
};

export default SEO;