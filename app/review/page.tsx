import { Metadata } from "next";
import Link from "next/link";
import ReviewForm from "@/components/ReviewForm";
import ParticlesBackground from "@/components/ParticlesBackground";

export const metadata: Metadata = {
  title: "Submit a Review | Venuja Ranasinghe",
  description:
    "Share your client review and feedback for Venuja Ranasinghe's Data Science and Full-Stack development services.",
};

export default function ReviewPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] relative overflow-x-hidden transition-colors duration-300">
      <ParticlesBackground />

      {/* Background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-blue-950/20 blur-[110px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-indigo-950/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-12 sm:py-16">

        {/* ── Top nav ── */}
        <div className="flex items-center justify-between mb-12 pb-5 border-b border-[var(--border-color)]">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--accent-color)] transition-colors group font-mono"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1 duration-200" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Portfolio
          </Link>

          <Link
            href="/"
            className="text-xl font-bold tracking-tighter text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors"
          >
            &lt;<span className="text-[var(--accent-color)]">VR</span>/&gt;
          </Link>
        </div>

        {/* ── Hero header ── */}
        <div className="text-center mb-10 space-y-4">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                          border border-[var(--accent-color)]/25
                          bg-[color-mix(in_srgb,var(--accent-color)_8%,transparent)]
                          text-[var(--accent-color)] text-[11px] font-bold tracking-widest uppercase font-mono">
            <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Client Review Portal
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] leading-tight">
            Leave a Review for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-color)] to-indigo-400">
              Venuja Ranasinghe
            </span>
          </h1>

          <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            Thank you for partnering with me. Your honest feedback helps build trust with future clients and celebrates the work we created together.
          </p>

          <div className="w-24 h-1.5 bg-gradient-to-r from-[var(--accent-color)] to-indigo-500 mx-auto rounded-full shadow-sm" />
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-xs text-[var(--text-muted)] font-medium font-mono">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Instant Portfolio Publication
          </span>
          <span className="text-[var(--border-color)]">·</span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Verified Client Badge
          </span>
          <span className="text-[var(--border-color)]">·</span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[var(--accent-color)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Private &amp; Secure
          </span>
        </div>

        {/* ── Form card ── */}
        <div className="relative bg-[var(--card-bg)] rounded-3xl border border-[var(--border-color)]
                        shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
          {/* Top gradient accent strip */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-color)]/40 to-transparent" />

          <div className="p-7 sm:p-10">
            <ReviewForm />
          </div>
        </div>

        {/* Footer */}
        <p className="mt-10 text-center text-[10px] text-[var(--text-muted)] font-mono">
          © {new Date().getFullYear()} Venuja Ranasinghe · All submissions are protected &amp; verified.
        </p>
      </div>
    </main>
  );
}
