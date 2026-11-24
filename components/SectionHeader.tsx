"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  id?: string;
  compact?: boolean;
}

/**
 * Section header: big title with the subtitle set beside it on wide screens
 * (stacked on phones), closed by a hard rule.
 */
export default function SectionHeader({ title, subtitle, id, compact = false }: SectionHeaderProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className={compact ? "mb-7 md:mb-8" : "mb-14"}
    >
      <div
        className={`grid grid-cols-1 gap-4 pb-5 border-b-2 border-[var(--rule)] ${
          subtitle ? "md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:items-end md:gap-10" : ""
        }`}
      >
        <h2 className={`${compact ? "text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.03em]" : "text-[clamp(2.6rem,6vw,4.6rem)] leading-[0.95] tracking-[-0.04em]"} font-extrabold text-[var(--text-primary)] [text-wrap:balance]`}>
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm md:text-[0.95rem] leading-relaxed text-[var(--text-muted)] md:pb-1 [text-wrap:pretty]">
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );
}
