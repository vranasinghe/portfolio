"use client";

import { motion } from "framer-motion";
import { experience, education } from "@/data/portfolio";
import SectionHeader from "@/components/SectionHeader";

export default function Experience() {
  return (
    <section className="wrap py-[120px] bg-transparent">
      <SectionHeader title="Experience and Academic Journey" />

      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14">

        {/* ── Experience (sticky highlight card) ── */}
        <div className="lg:sticky lg:top-[100px] self-start">
          <h3 className="font-label text-[0.8rem] font-bold uppercase tracking-[0.08em] text-[var(--text-muted)] mb-4 flex items-center gap-2">
            <span>💼</span>
            Industry Experience
          </h3>

          <div className="space-y-4">
            {experience.map((item, i) => (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-[#1f56f0] text-white p-8 md:p-10"
              >
                <span className="inline-block font-label text-[0.8rem] bg-[#04060b]/35 px-2.5 py-[5px] mb-[22px]">
                  {item.period}
                </span>
                <h4 className="text-[1.9rem] tracking-[-0.03em] leading-[1.1] font-bold mb-2">{item.role}</h4>
                <p className="flex items-center gap-2 text-white/85 font-medium mb-5">
                  {item.type === "seeking" && (
                    <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
                  )}
                  {item.company}
                </p>
                <p className="text-[0.95rem] text-white/85 mb-5 leading-relaxed">{item.description}</p>

                <ul className="mb-6">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="py-2.5 border-t border-white/30 text-[0.95rem]">
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span key={tag} className="font-label text-[0.75rem] px-2.5 py-1 border border-white/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Education (timeline) ── */}
        <div>
          <h3 className="font-label text-[0.8rem] font-bold uppercase tracking-[0.08em] text-[var(--text-muted)] mb-4 flex items-center gap-2">
            <span>🎓</span>
            Academic Journey
          </h3>

          <div className="border-t-2 border-[var(--rule)]">
            {education.map((item, i) => (
              <motion.div
                key={item.degree}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="grid md:grid-cols-[150px_1fr] gap-1.5 md:gap-6 py-7 border-b border-[var(--line-soft)]"
              >
                {/* Years, with the school crest underneath */}
                <div className="flex flex-col items-start gap-4">
                  <span className="font-label text-[0.85rem] font-bold text-[var(--accent-color)]">{item.period}</span>
                  {item.logo && (
                    <img
                      src={item.logo}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="h-16 w-auto max-w-[96px] object-contain"
                    />
                  )}
                </div>
                <div>
                  <h4 className="text-[1.2rem] tracking-[-0.01em] font-bold text-[var(--text-primary)]">{item.degree}</h4>
                  <p className="text-[0.92rem] text-[var(--text-muted)] mt-0.5 mb-2.5">{item.institution}</p>
                  <p className="text-[0.92rem] text-[var(--text-secondary)] leading-relaxed">{item.description}</p>

                  <div className="flex flex-wrap gap-1.5 mt-3.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-label text-[0.75rem] px-2.5 py-1 border border-[var(--rule-card)] text-[var(--text-secondary)] bg-[var(--bg-secondary)] transition-colors hover:border-[var(--accent-color)] hover:text-[var(--accent-color)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
