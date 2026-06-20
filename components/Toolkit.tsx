"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { skills } from "@/data/portfolio";

export default function Toolkit() {
  const [activeCategory, setActiveCategory] = useState(0);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <section className="max-w-6xl mx-auto px-6 py-24 bg-transparent">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <p className="text-sm font-bold tracking-widest text-[#60a5fa] uppercase mb-3 drop-shadow-sm font-mono">

        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] mb-6 tracking-tight">
          Tech Stack
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-[#60a5fa] to-indigo-500 mx-auto rounded-full shadow-sm mb-6" />
        <p className="text-[var(--text-muted)] max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          Languages, frameworks, and tools I build with — mapped directly from my skill set.
        </p>
      </motion.div>

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
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${activeCategory === i
                ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-950/50"
                : "bg-[var(--card-bg)] text-[var(--text-muted)] border-[var(--border-color)] hover:border-[#60a5fa] hover:text-[#60a5fa]"
              }`}
          >
            <span>{cat.icon}</span>
            {cat.category}
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
            // In dark mode use darkBrandColor if defined, otherwise fall back to brandColor
            const activeColor = isDark && skill.darkBrandColor ? skill.darkBrandColor : skill.brandColor;

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
                className="group flex flex-col items-center justify-center gap-2 p-4 rounded-xl border cursor-default transition-all duration-200"
              >
                {skill.Icon ? (
                  <skill.Icon 
                    className="text-[36px] transition-all duration-300 opacity-80 group-hover:opacity-100" 
                    style={{ color: activeColor }}
                  />
                ) : skill.iconUrl ? (
                  <img 
                    src={skill.iconUrl} 
                    alt={skill.name} 
                    className="w-[36px] h-[36px] transition-all duration-300 opacity-80 group-hover:opacity-100 object-contain" 
                  />
                ) : null}
                <span 
                  className="text-xs text-center font-medium text-[var(--text-secondary)] leading-tight transition-colors duration-300"
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
  );
}
