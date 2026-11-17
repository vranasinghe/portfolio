import { achievements } from "@/data/portfolio";

// Reviews is only rendered when NEXT_PUBLIC_SHOW_REVIEWS=true (see app/page.tsx).
export const SHOW_REVIEWS = process.env.NEXT_PUBLIC_SHOW_REVIEWS === "true";
// Achievements is only rendered once data/portfolio.ts has at least one entry.
export const SHOW_ACHIEVEMENTS = achievements.length > 0;

/** Page sections in order. The nav and every section header number from this one list. */
export const SECTIONS = [
  { id: "about",          label: "About" },
  { id: "projects",       label: "Projects" },
  { id: "skills",         label: "Skills" },
  { id: "experience",     label: "Experience" },
  ...(SHOW_ACHIEVEMENTS ? [{ id: "achievements", label: "Achievements" }] : []),
  { id: "certifications", label: "Certifications" },
  ...(SHOW_REVIEWS ? [{ id: "reviews", label: "Reviews" }] : []),
  { id: "contact",        label: "Contact" },
];

/** Two-digit number shown before a section, e.g. "05". */
export function sectionNumber(id: string): string {
  return String(SECTIONS.findIndex((s) => s.id === id) + 1).padStart(2, "0");
}
