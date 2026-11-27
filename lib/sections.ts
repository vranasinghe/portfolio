import { achievements } from "@/data/portfolio";

// Client Reviews is shown between Certifications and Contact unless explicitly hidden.
const reviewsFlag = process.env.NEXT_PUBLIC_SHOW_REVIEWS;
export const SHOW_REVIEWS = reviewsFlag !== "false";
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
