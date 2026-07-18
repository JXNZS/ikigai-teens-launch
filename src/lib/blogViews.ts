const getBaseViews = (slug: string): number => {
  if (slug === "why-high-achieving-students-are-more-vulnerable-to-burnout") {
    return 21;
  }
  if (slug === "when-encouragement-feels-like-pressure") {
    return 16;
  }
  if (slug === "the-link-between-perfectionism-and-academic-burnout") {
    return 12;
  }
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = slug.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Generate a deterministic number between 84 and 472
  return Math.abs(hash % 389) + 84;
};

export const getBlogViews = (slug: string): number => {
  if (typeof window === "undefined" || !window.localStorage) {
    return getBaseViews(slug);
  }
  const viewsKey = `blog_views_${slug}`;
  
  // Force reset this specific blog to 21 once on the client side
  const initializedKey = `blog_initialized_21_${slug}`;
  if (slug === "why-high-achieving-students-are-more-vulnerable-to-burnout" && !localStorage.getItem(initializedKey)) {
    localStorage.setItem(viewsKey, "21");
    localStorage.setItem(initializedKey, "true");
    return 21;
  }

  // Force reset this specific blog to 16 once on the client side
  const initializedKey2 = `blog_initialized_16_${slug}`;
  if (slug === "when-encouragement-feels-like-pressure" && !localStorage.getItem(initializedKey2)) {
    localStorage.setItem(viewsKey, "16");
    localStorage.setItem(initializedKey2, "true");
    return 16;
  }

  // Force reset this specific blog to 12 once on the client side
  const initializedKey3 = `blog_initialized_12_${slug}`;
  if (slug === "the-link-between-perfectionism-and-academic-burnout" && !localStorage.getItem(initializedKey3)) {
    localStorage.setItem(viewsKey, "12");
    localStorage.setItem(initializedKey3, "true");
    return 12;
  }

  const stored = localStorage.getItem(viewsKey);
  if (stored !== null) {
    const num = parseInt(stored, 10);
    if (!isNaN(num)) return num;
  }
  const base = getBaseViews(slug);
  localStorage.setItem(viewsKey, base.toString());
  return base;
};

export const incrementBlogViews = (slug: string): number => {
  if (typeof window === "undefined" || !window.localStorage) {
    return getBaseViews(slug) + 1;
  }
  const current = getBlogViews(slug);
  const next = current + 1;
  localStorage.setItem(`blog_views_${slug}`, next.toString());
  return next;
};
