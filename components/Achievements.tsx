"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { achievements, type Achievement } from "@/data/portfolio";
import SectionHeader from "@/components/SectionHeader";
import { sectionNumber } from "@/lib/sections";

/** Full-screen certificate viewer: closes on Esc, the close button, or a click outside the image. */
function CertificateViewer({ item, onClose }: { item: Achievement; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} certificate`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#04060b]/90 backdrop-blur-sm p-4 sm:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close certificate"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 flex items-center justify-center border-2 border-white text-white text-xl hover:bg-white hover:text-[#04060b] transition-colors"
      >
        ✕
      </button>
      <motion.figure
        className="max-w-5xl w-full"
        initial={{ scale: 0.96, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 10 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.certificate}
          alt={`${item.title} certificate`}
          className="w-full max-h-[80vh] object-contain bg-white"
        />
        <figcaption className="mt-3 font-label text-[0.82rem] text-white/80">
          {[item.title, item.organizer, item.date].filter(Boolean).join(" · ")}
        </figcaption>
      </motion.figure>
    </motion.div>
  );
}

export default function Achievements() {
  const [viewing, setViewing] = useState<Achievement | null>(null);

  return (
    <section className="wrap py-[120px] bg-transparent">
      <SectionHeader
        index={sectionNumber("achievements")}
        title="Achievements"
        subtitle="Competitions and hackathons I've taken part in, and how they went."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((item, i) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
            className="flex flex-col p-7 border-2 border-[var(--rule-card)] bg-[var(--card-bg)] transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_#1f56f0]"
          >
            {/* Result + date */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="px-3 py-1.5 bg-[#1f56f0] text-white font-label text-[0.78rem] font-bold uppercase tracking-[0.06em]">
                {item.result}
              </span>
              {item.date && <span className="font-label text-[0.78rem] text-[var(--text-muted)]">{item.date}</span>}
            </div>

            <h3 className="mt-5 text-[1.3rem] tracking-[-0.02em] leading-[1.25] font-bold text-[var(--text-primary)]">
              {item.title}
            </h3>
            <p className="mt-1.5 font-label text-[0.8rem] text-[var(--accent-color)]">
              {item.organizer}
              {item.team && <span className="text-[var(--text-muted)]"> · {item.team}</span>}
            </p>

            <p className="mt-4 text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">{item.description}</p>

            {/* Certificate thumbnail + links */}
            {(Boolean(item.certificate) || (item.links?.length ?? 0) > 0) && (
              <div className="mt-auto pt-6 flex flex-wrap items-end justify-between gap-4">
                {item.certificate && (
                  <button
                    onClick={() => setViewing(item)}
                    className="group flex items-center gap-3 text-left"
                    aria-label={`View ${item.title} certificate`}
                  >
                    <span className="block w-24 aspect-[1.414/1] overflow-hidden border border-[var(--line-soft)] bg-[var(--bg-tertiary)]">
                      <img
                        src={item.certificate}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </span>
                    <span className="font-label text-[0.85rem] font-bold text-[var(--accent-color)] group-hover:text-[var(--text-primary)] transition-colors">
                      View certificate ↗
                    </span>
                  </button>
                )}
                {item.links && item.links.length > 0 && (
                  <div className="flex flex-wrap gap-4 font-label text-[0.85rem] font-bold">
                    {item.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--accent-color)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {viewing && <CertificateViewer item={viewing} onClose={() => setViewing(null)} />}
      </AnimatePresence>
    </section>
  );
}
