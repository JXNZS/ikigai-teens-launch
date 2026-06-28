const getBaseViews = (slug: string): number => {
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
