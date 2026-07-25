import { describe, it, expect, beforeEach } from "vitest";
import { getBlogViews, incrementBlogViews } from "../lib/blogViews";

describe("blogViews utility", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return a deterministic initial value for a slug", () => {
    const slug = "test-slug-1";
    const views1 = getBlogViews(slug);
    const views2 = getBlogViews(slug);

    expect(views1).toBeGreaterThanOrEqual(84);
    expect(views1).toBeLessThanOrEqual(472);
    expect(views1).toBe(views2);
  });

  it("should return exactly 21 views for the high achieving students slug", () => {
    const slug = "why-high-achieving-students-are-more-vulnerable-to-burnout";
    expect(getBlogViews(slug)).toBe(21);
  });

  it("should return exactly 16 views for the encouragement feels like pressure slug", () => {
    const slug = "when-encouragement-feels-like-pressure";
    expect(getBlogViews(slug)).toBe(16);
  });

  it("should return exactly 12 views for the perfectionism and academic burnout slug", () => {
    const slug = "the-link-between-perfectionism-and-academic-burnout";
    expect(getBlogViews(slug)).toBe(12);
  });

  it("should return exactly 7 views for the study smarter not longer slug", () => {
    const slug = "study-smarter-not-longer-healthy-habits-that-prevent-burnout";
    expect(getBlogViews(slug)).toBe(7);
  });

  it("should increment views when incrementBlogViews is called", () => {
    const slug = "test-slug-2";
    const initialViews = getBlogViews(slug);
    const nextViews = incrementBlogViews(slug);

    expect(nextViews).toBe(initialViews + 1);
    expect(getBlogViews(slug)).toBe(initialViews + 1);
  });
});
