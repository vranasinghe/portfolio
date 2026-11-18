"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "@/data/portfolio";
import SectionHeader from "@/components/SectionHeader";

export default function Toolkit() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="band-dark">
    <section className="wrap py-[120px] bg-transparent">
      <SectionHeader
        title="Tech Stack"
        subtitle="Languages, frameworks, and tools I build with — mapped directly from my skill set."
      />

      {/* Category tabs */}
      <motion.div
        className="flex flex-wrap gap-2 mb-8"
        initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ delay: 0.2 }}
      >
        {skills.map((cat, i) => (
          <button
            key={cat.category}
            onClick={() => setActiveCategory(i)}
            className={`relative flex items-center gap-1.5 px-4 py-2 text-sm font-medium border overflow-hidden transition-colors duration-200 ${activeCategory === i
                ? "text-white border-indigo-600"
                : "bg-[var(--card-bg)] text-[var(--text-muted)] border-[var(--border-color)] hover:border-[var(--accent-color)] hover:text-[var(--accent-color)]"
              }`}
          >
            {activeCategory === i && (
              <motion.span
                layoutId="toolkit-tab-pill"
                className="absolute inset-0 bg-indigo-600 shadow-md shadow-indigo-950/50"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative z-10">{cat.category}</span>
          </button>
        ))}
      </motion.div>

      {/* Skill grid — animated panel swap */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4"
        >
          {skills[activeCategory].items.map((skill, i) => {
            // Skills sit on the black band: use the light variant of dark brand colours when defined
            const activeColor = skill.darkBrandColor ?? skill.brandColor;

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04, duration: 0.25 }}
                whileHover={{
                  y: -3,
                  borderColor: activeColor,
                  boxShadow: `0 6px 20px ${skill.hoverGlow}`
                }}
                style={{
                  backgroundColor: skill.bgColor,
                  borderColor: `${activeColor}4D` // 4D = 30% opacity in hex
                }}
                className="group relative overflow-hidden flex flex-col items-center justify-center gap-2 p-4 border cursor-default transition-all duration-200"
              >
                {/* Light band that sweeps across on hover */}
                <span aria-hidden="true" className="tile-sweep" />
                {skill.Icon ? (
                  <skill.Icon
                    className="relative text-[36px] transition-all duration-300 opacity-80 group-hover:opacity-100 group-hover:scale-110"
                    style={{ color: activeColor }}
                  />
                ) : skill.iconUrl ? (
                  <img
                    src={skill.iconUrl}
                    alt={skill.name}
                    className="relative w-[36px] h-[36px] transition-all duration-300 opacity-80 group-hover:opacity-100 group-hover:scale-110 object-contain"
                  />
                ) : null}
                <span
                  className="relative text-xs text-center font-medium text-[var(--text-secondary)] leading-tight transition-colors duration-300"
                  onMouseEnter={e => (e.currentTarget.style.color = activeColor)}
                  onMouseLeave={e => (e.currentTarget.style.color = '')}
                >
                  {skill.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </section>
    </div>
  );
}
