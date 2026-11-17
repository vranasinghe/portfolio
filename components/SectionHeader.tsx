"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  index: string;
  title: string;
  subtitle?: string;
  id?: string;
}

/** v2 section header: mono index number + big title, closed by a hard rule. */
export default function SectionHeader({ index, title, subtitle, id }: SectionHeaderProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="mb-14"
    >
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] items-end gap-2 md:gap-5 pb-5 border-b-2 border-[var(--rule)]">
        <span className="font-label text-[0.85rem] font-bold text-[var(--accent-color)]">{index}</span>
        <h2 className="text-[clamp(2.2rem,5vw,3.8rem)] leading-none tracking-[-0.04em] font-extrabold text-[var(--text-primary)]">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="mt-5 max-w-2xl text-sm md:text-base leading-relaxed text-[var(--text-muted)]">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
