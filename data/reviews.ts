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

/** Published reviews live in this JSON array. Invite-link submissions and admin deletions commit changes to it on GitHub. */
import approvedReviews from "./approvedReviews.json";
export const APPROVED_REVIEWS: Review[] = approvedReviews;

export const SERVICE_CATEGORIES = [
  "All Services",
  "Full-Stack Web App",
  "AI & ML Solutions",
  "Data Analytics & Automation",
  "Mobile Development",
  "Database & Cloud Setup",
] as const;
