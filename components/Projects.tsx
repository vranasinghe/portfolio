"use client";

import { useState } from "react";
import { sectionNumber } from "@/lib/sections";
import { AnimatePresence, motion } from "framer-motion";
import { featuredProjects, minorProjects } from "@/data/portfolio";
import SectionHeader from "@/components/SectionHeader";

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
function ExternalLinkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

const categories = ["AI / ML", "Web Development", "Mobile App", "Fullstack", "Design"] as const;
type Filter = "All" | (typeof categories)[number];
const filters: Filter[] = ["All", ...categories];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filteredProjects =
    activeFilter === "All"
      ? minorProjects
      : minorProjects.filter((p) => p.category === activeFilter);

  return (
    <>
    <div className="band-dark pt-[120px] pb-[60px]">
      <div className="wrap">
        <SectionHeader
          index={sectionNumber("projects")}
          title="Projects"
          subtitle="A curated selection of end-to-end projects spanning AI, data science, and full-stack development."
        />

        {/* ── Featured Projects (alternating layout) ── */}
        <div className="space-y-24 mb-24">
          {featuredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`grid lg:grid-cols-12 gap-6 items-center ${project.reversed ? "lg:text-right" : ""}`}
            >
              {/* Image */}
              <div className={`lg:col-span-7 ${project.reversed ? "lg:order-2" : ""}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden shadow-xl aspect-video bg-indigo-950/30 group"
                >
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-all duration-500"
                  />
                </motion.div>
              </div>

              {/* Content */}
              <div className={`lg:col-span-5 space-y-4 ${project.reversed ? "lg:order-1" : ""}`}>
                <h3 className="text-2xl font-bold text-[var(--text-primary)]">{project.title}</h3>

                <div className="relative z-10 p-5 bg-[var(--card-bg)] border border-[var(--border-color)] shadow-[0_15px_40px_var(--shadow-color)]">
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{project.description}</p>
                  <p className="text-[var(--text-muted)] text-xs mt-2 leading-relaxed">{project.longDescription}</p>
                </div>

                {/* Tags */}
                <div className={`flex flex-wrap gap-2 ${project.reversed ? "lg:justify-end" : ""}`}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-label font-medium bg-indigo-950/40 text-[var(--accent-color)] border border-indigo-900/50 transition-all duration-200 hover:scale-105 hover:border-[var(--accent-color)] hover:bg-indigo-950/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className={`flex gap-3 ${project.reversed ? "lg:justify-end" : ""}`}>
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    className="text-[var(--text-muted)] hover:text-[var(--accent-color)] transition-colors">
                    <GitHubIcon />
                  </a>
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer"
                      className="text-[var(--text-muted)] hover:text-[var(--accent-color)] transition-colors">
                      <ExternalLinkIcon />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    {/* ── Other projects: white section, card grid (previous portfolio structure) ── */}
    <section className="bg-white py-[100px]">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-5 mb-8">
          <div>
            <h3 className="text-[1.6rem] tracking-[-0.02em] font-bold text-[var(--text-primary)]">
              Other Noteworthy Projects
            </h3>
            <p className="mt-2 text-sm text-[var(--text-muted)]">Smaller experiments, tools, and side projects.</p>
          </div>

          {/* Category tabs with a sliding active pill */}
          <motion.div
            className="flex flex-wrap gap-1.5"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                aria-pressed={activeFilter === f}
                className={`relative font-label font-medium text-[0.8rem] px-3.5 py-2 border overflow-hidden transition-colors duration-200 ${
                  activeFilter === f
                    ? "text-white border-[#0b1222]"
                    : "border-[#0b1222]/25 text-[var(--text-secondary)] hover:border-[#0b1222] hover:text-[var(--text-primary)]"
                }`}
              >
                {activeFilter === f && (
                  <motion.span
                    layoutId="other-projects-tab"
                    className="absolute inset-0 bg-[#0b1222]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{f}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Card grid with smooth filter transitions */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                layout
                key={project.title}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3 }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
                }}
                className="group relative flex flex-col bg-white border border-[var(--line-soft)] overflow-hidden transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1.5 hover:border-[#1f56f0]/50 hover:shadow-[0_14px_34px_rgba(15,23,42,0.10)]"
              >
                {/* Cursor-follow spotlight */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "radial-gradient(380px circle at var(--x) var(--y), rgba(31,86,240,0.07), transparent 70%)" }}
                />

                {project.imageUrl && (
                  <div className="relative aspect-video overflow-hidden bg-[var(--bg-secondary)] border-b border-[var(--line-soft)]">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6">
                  {/* Header: folder icon + category, links on the right */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 flex items-center justify-center bg-[var(--bg-secondary)] text-[var(--accent-color)]">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                        </svg>
                      </span>
                      <span className="font-label font-medium text-[0.78rem] text-[var(--accent-color)]">{project.category}</span>
                    </div>
                    {/* Always visible on touch screens; revealed on hover or keyboard focus on desktop */}
                    <div className="relative z-20 flex gap-3 lg:opacity-0 lg:group-hover:opacity-100 lg:focus-within:opacity-100 transition-opacity">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} source code on GitHub`}
                        className="text-[var(--text-muted)] hover:text-[var(--accent-color)] transition-colors"
                      >
                        <GitHubIcon />
                      </a>
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} live site`}
                          className="text-[var(--text-muted)] hover:text-[var(--accent-color)] transition-colors"
                        >
                          <ExternalLinkIcon />
                        </a>
                      )}
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-color)] transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed flex-1">{project.description}</p>

                  <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="font-label text-xs text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--accent-color)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
    </>
  );
}
