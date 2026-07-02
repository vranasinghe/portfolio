"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { featuredProjects, minorProjects } from "@/data/portfolio";

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

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>("AI / ML");

  const filteredProjects = minorProjects.filter((p) => p.category === activeCategory);

  return (
    <section className="max-w-6xl mx-auto px-6 py-24 bg-transparent">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <p className="text-sm font-bold tracking-widest text-[#60a5fa] uppercase mb-3 drop-shadow-sm font-mono">
          {/*Portfolio*/}
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] mb-6 tracking-tight">
          Projects
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-[#60a5fa] to-indigo-500 mx-auto rounded-full shadow-sm mb-6" />
        <p className="text-[var(--text-muted)] max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          A curated selection of end-to-end projects spanning AI, data science, and full-stack development.
        </p>
      </motion.div>

      {/* ── Featured Projects (alternating layout) ── */}
      <div className="space-y-24 mb-24">
        {featuredProjects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`grid lg:grid-cols-12 gap-6 items-center ${project.reversed ? "lg:text-right" : ""
              }`}
          >
            {/* Image */}
            <div className={`lg:col-span-7 ${project.reversed ? "lg:order-2" : ""}`}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl overflow-hidden shadow-xl aspect-video bg-indigo-950/30 group"
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
              <p className="text-sm font-mono text-[#60a5fa]">{project.role}</p>
              <h3 className="text-2xl font-bold text-[var(--text-primary)]">{project.title}</h3>

              <div className="relative z-10 p-5 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-[0_15px_40px_var(--shadow-color)]">
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{project.description}</p>
                <p className="text-[var(--text-muted)] text-xs mt-2 leading-relaxed">{project.longDescription}</p>
              </div>

              {/* Tags */}
              <div className={`flex flex-wrap gap-2 ${project.reversed ? "lg:justify-end" : ""}`}>
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 text-xs font-mono font-medium rounded-full bg-indigo-950/40 text-[#60a5fa] border border-indigo-900/50">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className={`flex gap-3 ${project.reversed ? "lg:justify-end" : ""}`}>
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  className="text-[var(--text-muted)] hover:text-[#60a5fa] transition-colors">
                  <GitHubIcon />
                </a>
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer"
                    className="text-[var(--text-muted)] hover:text-[#60a5fa] transition-colors">
                    <ExternalLinkIcon />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Minor Projects Grid ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-32 mb-16 text-center"
      >

        <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-6 tracking-tight">
          Other Noteworthy Projects
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-[#60a5fa] to-indigo-500 mx-auto rounded-full shadow-sm mb-6" />
        <p className="text-[var(--text-muted)] max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          Smaller experiments, tools, and side projects.
        </p>
      </motion.div>

      {/* Category Tabs */}
      <motion.div
        className="flex flex-wrap justify-center gap-2 mb-10"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
              activeCategory === cat
                ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-950/50"
                : "bg-[var(--card-bg)] text-[var(--text-muted)] border-[var(--border-color)] hover:border-[#60a5fa] hover:text-[#60a5fa]"
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Grid with smooth transitions */}
      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -6 }}
              className="group flex flex-col p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-sm hover:border-[#60a5fa]/40 hover:shadow-[0_8px_30px_var(--shadow-color)] transition-all duration-250"
            >
              {project.imageUrl && (
                <div className="relative -mx-6 -mt-6 mb-5 aspect-video overflow-hidden rounded-t-2xl bg-indigo-950/30 border-b border-[var(--border-color)]">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-all duration-300"
                  />
                </div>
              )}
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div className="w-10 h-10 rounded-xl bg-indigo-950/50 flex items-center justify-center text-[#60a5fa]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    className="text-[var(--text-muted)] hover:text-[#60a5fa] transition-colors">
                    <GitHubIcon />
                  </a>
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer"
                      className="text-[var(--text-muted)] hover:text-[#60a5fa] transition-colors">
                      <ExternalLinkIcon />
                    </a>
                  )}
                </div>
              </div>

              <h4 className="text-base font-bold text-[var(--text-primary)] mb-2 group-hover:text-[#60a5fa] transition-colors">
                {project.title}
              </h4>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed flex-1">{project.description}</p>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs font-mono text-[var(--text-muted)]">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
