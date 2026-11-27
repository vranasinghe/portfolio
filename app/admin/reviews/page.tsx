import Link from "next/link";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, isAdmin } from "@/lib/adminSession";
import { AdminLogin } from "@/components/ReviewAdmin";
import ReviewManager from "@/components/ReviewManager";
export const metadata = { title: "Manage client reviews", robots: { index: false, follow: false } };
export default async function ManageReviewsPage() {
  const admin = isAdmin((await cookies()).get(ADMIN_COOKIE)?.value);
  return <main id="main-content" className="band-dark min-h-screen px-5 py-12"><div className="mx-auto max-w-3xl"><Link href="/admin/review-link" className="text-[var(--accent-color)] underline underline-offset-4">Create review link</Link><h1 className="text-3xl font-bold mt-6 mb-3">Manage client reviews</h1><p className="text-[var(--text-muted)] mb-8">Reviews from your invite links. Deleting one removes it from your portfolio right away.</p>{admin ? <ReviewManager /> : <div className="max-w-lg border border-[var(--border-color)] bg-[var(--card-bg)] p-6"><AdminLogin /></div>}</div></main>;
}
