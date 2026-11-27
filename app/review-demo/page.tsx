import Link from "next/link";
import { notFound } from "next/navigation";
import Reviews from "@/components/Reviews";
import type { Review } from "@/data/reviews";
export const metadata = { title: "Client Reviews Demo", robots: { index: false, follow: false } };
const samples: Review[] = [
  { id: "demo-1", name: "Alex Morgan (Demo)", role: "Founder", company: "Sample Store", rating: 5, service: "Full-Stack Web App", comment: "Venuja turned our idea into a website that is easy to use and looks great on mobile. Communication was clear throughout, and the final handover made everything straightforward.", date: "November 2026", verified: true, projectUrl: "https://example.com" },
  { id: "demo-2", name: "Sam Taylor (Demo)", role: "Operations Manager", company: "Sample Analytics", rating: 5, service: "Data Analytics & Automation", comment: "The dashboard brought our reporting into one place. Venuja took time to understand our workflow and explained the results in a way our whole team could follow.", date: "November 2026", verified: true },
  { id: "demo-3", name: "Jordan Lee (Demo)", role: "Product Lead", company: "Sample AI Project", rating: 4, service: "AI & ML Solutions", comment: "A thoughtful approach to our prototype, with useful progress updates and a clear explanation of the model's limitations. We appreciated the attention to detail.", date: "October 2026", verified: true }
];
export default function ReviewDemoPage() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <main id="main-content" className="min-h-screen bg-black text-white"><div className="wrap py-6 border-b border-white/20"><p className="text-sm text-amber-300 mb-3">Demo only — fictional sample reviews and ratings. These are not real testimonials.</p><Link href="/#reviews" className="text-sm underline underline-offset-4">Back to portfolio</Link></div><Reviews reviews={samples} /></main>;
}
