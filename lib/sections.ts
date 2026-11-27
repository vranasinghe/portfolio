import { achievements } from "@/data/portfolio";
import { APPROVED_REVIEWS } from "@/data/reviews";

// Reviews appears once data/reviews.ts has at least one approved review.
// NEXT_PUBLIC_SHOW_REVIEWS=true forces it on (e.g. to preview it); =false forces it off.
const reviewsFlag = process.env.NEXT_PUBLIC_SHOW_REVIEWS;
export const SHOW_REVIEWS = reviewsFlag === "false" ? false : reviewsFlag === "true" || APPROVED_REVIEWS.length > 0;
// Achievements is only rendered once data/portfolio.ts has at least one entry.
export const SHOW_ACHIEVEMENTS = achievements.length > 0;

/** Page sections in order; the nav is built from this list. */
export const SECTIONS = [
  { id: "about",          label: "About" },
  { id: "skills",         label: "Tech Stack" },
  { id: "projects",       label: "Projects" },
  { id: "github-activity", label: "GitHub" },
  { id: "experience",     label: "Experience" },
  ...(SHOW_ACHIEVEMENTS ? [{ id: "achievements", label: "Achievements" }] : []),
  { id: "certifications", label: "Certifications" },
  ...(SHOW_REVIEWS ? [{ id: "reviews", label: "Reviews" }] : []),
  { id: "contact",        label: "Contact" },
];
