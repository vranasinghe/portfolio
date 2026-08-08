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

export const INITIAL_REVIEWS: Review[] = [];

export const SERVICE_CATEGORIES = [
  "All Services",
  "Full-Stack Web App",
  "AI & ML Solutions",
  "Data Analytics & Automation",
  "Mobile Development",
  "Database & Cloud Setup",
] as const;

const LOCAL_STORAGE_KEY = "vr_portfolio_client_reviews";

export function getStoredReviews(): Review[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Error reading reviews from localStorage", e);
    return [];
  }
}

export function saveReviewToLocalStorage(newReview: Review): Review[] {
  const current = getStoredReviews();
  const updated = [newReview, ...current];
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Error saving review to localStorage", e);
    }
  }
  return updated;
}
