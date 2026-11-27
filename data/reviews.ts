export interface Review {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number; // 1 to 5
  comment: string;
  service: string; // e.g. "Full-Stack Web App", "Machine Learning Model", "Data Analytics"
  date: string;
  verified: boolean;
  avatarUrl?: string;
  linkedinUrl?: string;
  projectUrl?: string; // Deployed web link for the client's project
  featured?: boolean;
}

/**
 * Approved client reviews shown on the homepage.
 *
 * How to publish a review:
 *   1. A client submits the form at venuja.online/review.
 *   2. You get an email with the review and a ready-to-paste block.
 *   3. Paste that block inside the array below, commit and push.
 *
 * Approved entries appear between Certifications and Contact.
 * Delete an entry to unpublish it.
 */
export const APPROVED_REVIEWS: Review[] = [
  // Paste approved reviews here, newest first.
];

export const SERVICE_CATEGORIES = [
  "All Services",
  "Full-Stack Web App",
  "AI & ML Solutions",
  "Data Analytics & Automation",
  "Mobile Development",
  "Database & Cloud Setup",
] as const;
