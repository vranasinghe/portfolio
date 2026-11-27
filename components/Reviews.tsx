"use client";

import { motion, AnimatePresence } from "framer-motion";
import { APPROVED_REVIEWS, Review } from "@/data/reviews";

// ── Helpers ────────────────────────────────────────────────────────────────
function getInitials(str: string) {
  if (!str) return "CL";
  const parts = str.trim().split(" ");
  return parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : str.slice(0, 2).toUpperCase();
}

const GRADIENT_PAIRS = [
  "from-blue-500 to-blue-700",
  "from-blue-400 to-blue-600",
  "from-blue-600 to-blue-800",
  "from-blue-400 to-blue-700",
  "from-blue-500 to-blue-600",
];

function StarRow({ rating, size = "sm" }: { rating: number; size?: "sm" | "xs" }) {
  const px = size === "xs" ? "w-3 h-3" : "w-4 h-4";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className={`${px} ${s <= rating ? "text-amber-400" : "text-[var(--text-primary)]/15"}`} viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ── Review Card ─────────────────────────────────────────────────────────────
function ReviewCard({ review, index }: { review: Review; index: number }) {
  const grad = GRADIENT_PAIRS[index % GRADIENT_PAIRS.length];
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
      }}
      className="group relative flex flex-col bg-[var(--card-bg)] border border-[var(--border-color)] p-6
                 shadow-[0_15px_40px_-15px_var(--shadow-color)]
                 hover:border-[color-mix(in_srgb,var(--accent-color)_35%,transparent)]
                 hover:shadow-[0_20px_50px_rgba(107,147,255,0.12)]
                 transition-all duration-400 overflow-hidden"
    >
      {/* Spotlight glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(320px circle at var(--mx) var(--my), rgba(107,147,255,0.09), transparent 70%)" }}
      />

      {/* Top row: stars + service badge */}
      <div className="flex items-start justify-between gap-3 mb-5">
        <StarRow rating={review.rating} />
        <span className="shrink-0 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1
                         bg-[color-mix(in_srgb,var(--accent-color)_10%,transparent)]
                         text-[var(--accent-color)]
                         border border-[color-mix(in_srgb,var(--accent-color)_25%,transparent)]">
          {review.service}
        </span>
      </div>

      {/* Quote mark watermark */}
      <svg
        className="absolute bottom-16 right-5 w-14 h-14 text-[var(--text-primary)] opacity-[0.05] group-hover:text-[var(--accent-color)] group-hover:opacity-[0.08] transition-all duration-500 pointer-events-none"
        viewBox="0 0 24 24" fill="currentColor"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>

      {/* Review text */}
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic flex-1 mb-4">
        &ldquo;{review.comment}&rdquo;
      </p>

      {/* Live Project Link — shown when projectUrl is set */}
      {review.projectUrl && (
        <a
          href={review.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 self-start mb-5 px-3.5 py-1.5
                     text-[11px] font-bold tracking-wide
                     bg-[var(--accent-color)]/10
                     text-[var(--accent-color)]
                     border border-[var(--accent-color)]/25
                     hover:bg-[var(--accent-color)]/20
                     hover:border-[var(--accent-color)]/50
                     transition-all duration-200 group/link"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
          View Live Site
          <svg className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 duration-200" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17l9.2-9.2M17 17V7H7" />
          </svg>
        </a>
      )}

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent mb-5" />

      {/* Client info */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {/* Avatar */}
          {review.avatarUrl ? (
            <img
              src={review.avatarUrl}
              alt={review.name}
              className="w-10 h-10 object-cover border-2 border-[var(--accent-color)]/40 shrink-0"
              onError={(e) => { (e.target as HTMLElement).style.display = "none"; }}
            />
          ) : (
            <div className={`w-10 h-10 bg-gradient-to-br ${grad} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-md`}>
              {getInitials(review.name)}
            </div>
          )}

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-sm font-bold text-[var(--text-primary)] truncate">{review.name}</span>
              {review.verified && (
                <span title="Verified Client" className="inline-flex items-center">
                  <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </div>
            <p className="text-[11px] text-[var(--text-muted)] truncate">
              {review.role}{review.company ? ` · ${review.company}` : ""}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-label text-[var(--text-muted)]">{review.date}</span>
          {review.linkedinUrl && (
            <a
              href={review.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="View Profile"
              className="w-7 h-7 bg-[var(--bg-tertiary)] border border-[var(--border-color)]
                         text-[var(--text-muted)] hover:text-[var(--accent-color)]
                         hover:border-[color-mix(in_srgb,var(--accent-color)_40%,transparent)]
                         flex items-center justify-center transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Section ─────────────────────────────────────────────────────────────
export default function Reviews({ reviews = APPROVED_REVIEWS }: { reviews?: Review[] } = {}) {
  if (reviews.length === 0) {
    return (
      <section className="band-dark reviews-band text-[var(--text-primary)] w-full bg-black py-20 sm:py-24">
        <div className="wrap">
          <header className="mb-12 border-b border-white/70 pb-5 sm:mb-16 sm:pb-7">
            <h2 className="text-[clamp(2.75rem,6vw,6rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-white">
              Client Reviews
            </h2>
          </header>
          <p className="mx-auto max-w-xl text-center text-[var(--text-muted)] leading-relaxed">Client reviews will appear here after approval.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="band-dark reviews-band text-[var(--text-primary)] w-full bg-black py-20 sm:py-24 relative overflow-hidden">


      <div className="wrap relative z-10">

        {/* ── Section Header ── */}
        <header className="mb-12 border-b border-white/70 pb-5 sm:mb-16 sm:pb-7">
            <h2 className="text-[clamp(2.75rem,6vw,6rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-white">
              Client Reviews
            </h2>
          </header>

        {/* ── Reviews Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {reviews.map((rev, i) => (
              <ReviewCard key={rev.id} review={rev} index={i} />
            ))}
          </AnimatePresence>
        </div>



      </div>


    </section>
  );
}
