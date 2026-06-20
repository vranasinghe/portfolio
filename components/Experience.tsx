"use client";

import { motion } from "framer-motion";
import { experience, education } from "@/data/portfolio";

function TimelineDot({ type }: { type: string }) {
  return (
    <div className="relative flex flex-col items-center">
      <div className={`w-4 h-4 rounded-full border-4 z-10 ${type === "seeking"
        ? "border-[#60a5fa] bg-indigo-950 ring-4 ring-[#60a5fa]/20"
        : type === "education"
          ? "border-purple-500 bg-purple-950/30"
          : "border-green-500 bg-green-950/30"
        }`} />
      <div className="w-0.5 bg-[var(--border-color)] flex-1 mt-1" />
    </div>
  );
}

export default function Experience() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-24 bg-transparent">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <p className="text-sm font-bold tracking-widest text-[#60a5fa] uppercase mb-3 drop-shadow-sm font-mono">
          Experience
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] mb-6 tracking-tight">
          Experience and Academic Journey
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-[#60a5fa] to-indigo-500 mx-auto rounded-full shadow-sm" />
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-16">

        {/* ── Experience ── */}
        <div>
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-950/50 border border-indigo-900/30 flex items-center justify-center text-base">💼</span>
            Industry Experience
          </h3>

          <div className="space-y-6">
            {experience.map((item, i) => (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex gap-4"
              >
                <TimelineDot type={item.type} />

                <div className="pb-6 flex-1">
                  <span className="text-xs font-mono text-[#60a5fa] mb-1 block">{item.period}</span>
                  <h4 className="text-base font-bold text-[var(--text-primary)]">{item.role}</h4>
                  <p className="text-sm text-indigo-400 font-medium mb-2 flex items-center gap-1.5">
                    {item.type === "seeking" && (
                      <span className="inline-flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      </span>
                    )}
                    {item.company}
                  </p>

                  <div className="p-4 rounded-xl border bg-[var(--card-bg)] border-[var(--border-color)]">
                    <p className="text-sm text-[var(--text-secondary)] mb-3">{item.description}</p>
                    <ul className="space-y-1.5">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                          <span className="text-[#60a5fa] mt-0.5 text-xs font-bold">▸</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {item.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-0.5 text-xs font-mono rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-muted)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Education ── */}
        <div>
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-purple-950/50 border border-purple-900/30 flex items-center justify-center text-base">🎓</span>
            Academic Journey
          </h3>

          <div className="space-y-6">
            {education.map((item, i) => (
              <motion.div
                key={item.degree}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="flex gap-4"
              >
                <TimelineDot type="education" />

                <div className="pb-6 flex-1">
                  <span className="text-xs font-mono text-purple-400 mb-1 block">{item.period}</span>
                  <h4 className="text-base font-bold text-[var(--text-primary)]">{item.degree}</h4>
                  <p className="text-sm text-purple-400 font-medium mb-2">{item.institution}</p>

                  <div className="p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)]">
                    <p className="text-sm text-[var(--text-secondary)]">{item.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {item.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-0.5 text-xs font-mono rounded-full bg-purple-950/40 border border-purple-900/40 text-purple-300">
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
