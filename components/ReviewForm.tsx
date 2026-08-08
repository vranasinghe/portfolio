"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Review, SERVICE_CATEGORIES, saveReviewToLocalStorage } from "@/data/reviews";
import Link from "next/link";

interface ReviewFormProps {
  onReviewSubmitted?: (newReview: Review) => void;
  isModal?: boolean;
}

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  const labels = ["Terrible", "Poor", "Average", "Good", "Excellent"];
  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          onMouseEnter={() => setHover(s)}
          onMouseLeave={() => setHover(0)}
          className="transition-transform hover:scale-125 focus:outline-none"
          aria-label={`Rate ${s} star`}
        >
          <svg
            className={`w-8 h-8 transition-all duration-150 ${s <= (hover || value)
              ? "text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]"
              : "text-white/10"
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
      <span className="ml-2 text-sm font-semibold text-amber-400 min-w-[72px]">
        {labels[(hover || value) - 1] ?? ""}
      </span>
    </div>
  );
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--text-muted)] mb-1.5 font-mono">
      {children}{required && <span className="text-[var(--accent-color)] ml-1">*</span>}
    </label>
  );
}

function Input({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full px-4 py-3 rounded-xl input-neon text-sm placeholder:text-[var(--text-muted)]/50"
    />
  );
}

function Textarea({ ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="w-full px-4 py-3 rounded-xl input-neon text-sm placeholder:text-[var(--text-muted)]/50 resize-none"
    />
  );
}

export default function ReviewForm({ onReviewSubmitted, isModal = false }: ReviewFormProps) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState<string>(SERVICE_CATEGORIES[1]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!name.trim()) { setErrorMsg("Please enter your name."); return; }
    if (!comment.trim()) { setErrorMsg("Please write a short review."); return; }
    setSubmitting(true);

    const payload = {
      name: name.trim(),
      role: role.trim() || "Client",
      company: company.trim() || "Independent",
      service,
      rating,
      comment: comment.trim(),
      avatarUrl: avatarUrl.trim() || undefined,
      linkedinUrl: linkedinUrl.trim() || undefined,
      projectUrl: projectUrl.trim() || undefined,
    };

    const makeReview = (id: string): Review => ({
      id,
      name: payload.name,
      role: payload.role,
      company: payload.company,
      rating: payload.rating,
      comment: payload.comment,
      service: payload.service,
      date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      verified: true,
      avatarUrl: payload.avatarUrl,
      linkedinUrl: payload.linkedinUrl,
      projectUrl: payload.projectUrl,
      featured: true,
    });

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      const review = (res.ok && data.success && data.review) ? data.review : makeReview(`rev-${Date.now()}`);
      saveReviewToLocalStorage(review);
      setSubmitted(true);
      onReviewSubmitted?.(review);
    } catch {
      const review = makeReview(`rev-${Date.now()}`);
      saveReviewToLocalStorage(review);
      setSubmitted(true);
      onReviewSubmitted?.(review);
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success state ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center justify-center text-center py-10 gap-4"
      >
        <div className="w-16 h-16 rounded-2xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center">
          <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-extrabold text-[var(--text-primary)]">Thank you for your review!</h3>
        <p className="text-sm text-[var(--text-muted)] max-w-xs">
          Your testimonial has been published to the portfolio. Your support is truly appreciated.
        </p>
        <div className="flex items-center gap-3 mt-2 flex-wrap justify-center">
          <Link
            href="/#reviews"
            className="btn-accent px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2"
          >
            View on Portfolio
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          {!isModal && (
            <button
              onClick={() => { setSubmitted(false); setName(""); setRole(""); setCompany(""); setComment(""); setAvatarUrl(""); setLinkedinUrl(""); setProjectUrl(""); }}
              className="btn-outline px-5 py-2.5 rounded-xl text-sm font-semibold"
            >
              Submit Another
            </button>
          )}
        </div>
      </motion.div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errorMsg && (
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {errorMsg}
        </div>
      )}

      {/* Star Rating */}
      <div>
        <FieldLabel required>Overall Rating</FieldLabel>
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)] w-fit">
          <StarPicker value={rating} onChange={setRating} />
        </div>
      </div>

      {/* Name + Role */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel required>Full Name</FieldLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Alex Morgan" required />
        </div>
        <div>
          <FieldLabel>Role / Title</FieldLabel>
          <Input value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Product Manager" />
        </div>
      </div>

      {/* Company + Service */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel>Company / Project</FieldLabel>
          <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g. TechCorp Inc." />
        </div>
        <div>
          <FieldLabel>Service Received</FieldLabel>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full px-4 py-3 rounded-xl input-neon text-sm cursor-pointer"
          >
            {SERVICE_CATEGORIES.filter((c) => c !== "All Services").map((cat) => (
              <option key={cat} value={cat} className="bg-[#04111e]">{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Review Text */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <FieldLabel required>Your Review</FieldLabel>
          <span className="text-[10px] text-[var(--text-muted)] font-mono">{comment.length}/500</span>
        </div>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={500}
          rows={4}
          placeholder="Share your honest experience working with Venuja — code quality, delivery speed, communication, data science results..."
          required
        />
      </div>

      {/* Optional fields — Photo, LinkedIn, Project URL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel>Photo URL (optional)</FieldLabel>
          <Input
            type="url"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="https://... (or leave for initials)"
          />
        </div>
        <div>
          <FieldLabel>LinkedIn / Website (optional)</FieldLabel>
          <Input
            type="url"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            placeholder="https://linkedin.com/in/…"
          />
        </div>
      </div>

      {/* Deployed Project URL */}
      <div>
        <FieldLabel>Deployed Project URL (optional)</FieldLabel>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-[var(--accent-color)]/60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <input
            type="url"
            value={projectUrl}
            onChange={(e) => setProjectUrl(e.target.value)}
            placeholder="https://your-project.vercel.app  (the live site I built for you)"
            className="w-full pl-11 pr-4 py-3 rounded-xl input-neon text-sm placeholder:text-[var(--text-muted)]/50"
          />
        </div>
        <p className="mt-1.5 text-[10px] text-[var(--text-muted)] font-mono pl-1">
          Share the live URL of your deployed web app, dashboard, or AI tool.
        </p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full btn-accent flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-base font-bold disabled:opacity-50 mt-1"
      >
        {submitting ? (
          <>
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Publishing Review…
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Publish Review to Portfolio
          </>
        )}
      </button>
    </form>
  );
}
