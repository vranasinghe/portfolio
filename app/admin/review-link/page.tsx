import { cookies } from "next/headers";
import { ADMIN_COOKIE, isAdmin } from "@/lib/adminSession";
import { AdminLogin, InviteCreator } from "@/components/ReviewAdmin";
export const metadata = { title: "Create review link", robots: { index: false, follow: false } };
export default async function ReviewLinkPage() {
  const admin = isAdmin((await cookies()).get(ADMIN_COOKIE)?.value);
  return <main className="band-dark min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] px-5 py-12"><div className="mx-auto max-w-lg"><h1 className="text-3xl font-bold mb-3">Create review link</h1><p className="text-[var(--text-muted)] mb-8">Send a personal invitation to a client. Reviews arrive by email for your approval.</p><div className="border border-[var(--border-color)] bg-[var(--card-bg)] p-5 sm:p-8">{admin ? <InviteCreator /> : <AdminLogin />}</div></div></main>;
}
