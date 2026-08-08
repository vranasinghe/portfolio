"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Review, SERVICE_CATEGORIES, getStoredReviews } from "@/data/reviews";
import ReviewForm from "@/components/ReviewForm";

// ── Helpers ────────────────────────────────────────────────────────────────
function getInitials(str: string) {
  if (!str) return "CL";
  const parts = str.trim().split(" ");
  return parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : str.slice(0, 2).toUpperCase();
}

const GRADIENT_PAIRS = [
  "from-blue-500 to-indigo-600",
  "from-violet-500 to-purple-600",
  "from-cyan-500 to-blue-600",
  "from-indigo-500 to-blue-500",
  "from-sky-500 to-indigo-500",
];

function StarRow({ rating, size = "sm" }: { rating: number; size?: "sm" | "xs" }) {
  const px = size === "xs" ? "w-3 h-3" : "w-4 h-4";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className={`${px} ${s <= rating ? "text-amber-400" : "text-white/10"}`} viewBox="0 0 20 20" fill="currentColor">
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
      className="group relative flex flex-col bg-[var(--card-bg)] rounded-3xl border border-[var(--border-color)] p-6
                 shadow-[0_15px_40px_-15px_var(--shadow-color)]
                 hover:border-[color-mix(in_srgb,var(--accent-color)_35%,transparent)]
                 hover:shadow-[0_20px_50px_rgba(96,165,250,0.12)]
                 transition-all duration-400 overflow-hidden"
    >
      {/* Spotlight glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(320px circle at var(--mx) var(--my), rgba(96,165,250,0.09), transparent 70%)" }}
      />

      {/* Top row: stars + service badge */}
      <div className="flex items-start justify-between gap-3 mb-5">
        <StarRow rating={review.rating} />
        <span className="shrink-0 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full
                         bg-[color-mix(in_srgb,var(--accent-color)_10%,transparent)]
                         text-[var(--accent-color)]
                         border border-[color-mix(in_srgb,var(--accent-color)_25%,transparent)]">
          {review.service}
        </span>
      </div>

      {/* Quote mark watermark */}
      <svg
        className="absolute top-5 right-5 w-14 h-14 text-white/[0.03] group-hover:text-[var(--accent-color)]/[0.06] transition-colors duration-500 pointer-events-none"
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
          className="inline-flex items-center gap-2 self-start mb-5 px-3.5 py-1.5 rounded-lg
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
              className="w-10 h-10 rounded-full object-cover border-2 border-[var(--accent-color)]/40 shrink-0"
              onError={(e) => { (e.target as HTMLElement).style.display = "none"; }}
            />
          ) : (
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${grad} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-md`}>
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
          <span className="text-[10px] font-mono text-[var(--text-muted)]">{review.date}</span>
          {review.linkedinUrl && (
            <a
              href={review.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="View Profile"
              className="w-7 h-7 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)]
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
export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All Services");
  const [copiedLink, setCopiedLink] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clear any stale cached reviews from localStorage so removed samples don't reappear
    if (typeof window !== "undefined") {
      localStorage.removeItem("vr_portfolio_client_reviews");
    }
    async function fetchReviews() {
      try {
        const res = await fetch("/api/reviews");
        const data = await res.json();
        if (res.ok && data.success && Array.isArray(data.reviews)) {
          setReviews(data.reviews);
          return;
        }
      } catch { /* ignore, use local fallback */ }
      setReviews(getStoredReviews());
    }
    fetchReviews();
  }, []);

  // Close modal on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setIsModalOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleReviewAdded = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/review`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const filtered = activeCategory === "All Services"
    ? reviews
    : reviews.filter((r) => r.service.toLowerCase() === activeCategory.toLowerCase());

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "5.0";

  return (
    <section className="w-full bg-transparent py-24 relative overflow-hidden" id="reviews">

      {/* Background blur accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-blue-950/20 blur-[110px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-indigo-950/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-16 text-center"
        >


          <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] mb-6 tracking-tight">
            What My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-color)] to-indigo-400">
              Clients Say
            </span>
          </h2>

          <p className="text-[var(--text-muted)] text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-6">
            Genuine testimonials from leaders and clients I&apos;ve collaborated with on Data Science,
            Machine Learning, and Web projects.
          </p>

          <div className="w-24 h-1.5 bg-gradient-to-r from-[var(--accent-color)] to-indigo-500 mx-auto rounded-full shadow-sm" />
        </motion.div>

        {/* ── Stats & Actions Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative flex flex-col sm:flex-row items-center justify-between gap-6
                     p-5 sm:p-6 rounded-2xl mb-10
                     bg-[var(--card-bg)] border border-[var(--border-color)]
                     shadow-[0_15px_40px_-15px_var(--shadow-color)] overflow-hidden"
        >
          {/* Subtle gradient strip top */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-color)]/30 to-transparent" />

          {/* Stats */}
          <div className="flex items-center gap-6 sm:gap-8 flex-wrap justify-center sm:justify-start">
            {/* Avg Rating */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-extrabold text-[var(--text-primary)] leading-none">
                  {avgRating} <span className="text-xs font-normal text-[var(--text-muted)]">/ 5.0</span>
                </p>
                <p className="text-[11px] text-[var(--text-muted)] mt-0.5">Average Client Rating</p>
              </div>
            </div>

            <div className="hidden sm:block w-px h-9 bg-[var(--border-color)]" />

            {/* Total reviews */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-[var(--accent-color)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-extrabold text-[var(--text-primary)] leading-none">{reviews.length}</p>
                <p className="text-[11px] text-[var(--text-muted)] mt-0.5">Verified Reviews</p>
              </div>
            </div>

            <div className="hidden sm:block w-px h-9 bg-[var(--border-color)]" />

            {/* Satisfaction */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-extrabold text-[var(--text-primary)] leading-none">100%</p>
                <p className="text-[11px] text-[var(--text-muted)] mt-0.5">Satisfaction Rate</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-end">
            {/* Copy link */}
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
                         border border-[var(--border-color)] bg-[var(--bg-tertiary)]
                         text-[var(--text-muted)] hover:text-[var(--accent-color)]
                         hover:border-[color-mix(in_srgb,var(--accent-color)_40%,transparent)]
                         transition-all duration-200"
            >
              {copiedLink ? (
                <>
                  <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Client Review Link
                </>
              )}
            </button>

            {/* Write a Review */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-accent flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Write a Review
            </button>
          </div>
        </motion.div>

        {/* ── Category Filter Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
          {SERVICE_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200
                  ${isActive
                    ? "btn-accent"
                    : "btn-outline bg-transparent text-white hover:bg-[color-mix(in_srgb,var(--accent-color)_8%,transparent)]"
                  }`}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* ── Reviews Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((rev, i) => (
              <ReviewCard key={rev.id} review={rev} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[var(--text-muted)]">
            <p className="text-sm">No reviews found for this category yet.</p>
          </div>
        )}


      </div>

      {/* ── Write a Review Modal ── */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal panel */}
            <motion.div
              key="modal"
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 24 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto pointer-events-none"
            >
              <div className="w-full max-w-xl pointer-events-auto my-8
                              bg-[var(--card-bg)] rounded-3xl border border-[var(--border-color)]
                              shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]
                              relative overflow-hidden">

                {/* Top gradient strip */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-color)]/40 to-transparent" />

                <div className="p-7 sm:p-8">
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-extrabold text-[var(--text-primary)] tracking-tight">
                        Write a Client Review
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] mt-1">
                        Your review appears instantly on Venuja&apos;s portfolio.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      aria-label="Close"
                      className="w-8 h-8 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)]
                                 text-[var(--text-muted)] hover:text-[var(--text-primary)]
                                 flex items-center justify-center transition-colors duration-150 shrink-0"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <ReviewForm
                    isModal={true}
                    onReviewSubmitted={(newRev) => {
                      handleReviewAdded(newRev);
                      setTimeout(() => setIsModalOpen(false), 2500);
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
