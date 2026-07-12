"use client";

import { motion } from "framer-motion";
import { personalInfo, heroStats } from "@/data/portfolio";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" },
  }),
};

export default function About() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-28 relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <p className="text-sm font-bold tracking-widest text-[var(--accent-color)] uppercase mb-3 drop-shadow-sm font-mono">

        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] mb-6 tracking-tight">
          About Me
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-[var(--accent-color)] to-indigo-500 mx-auto rounded-full shadow-sm" />
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-14 items-start">

        {/* ── LEFT: Bio ── */}
        <div className="lg:col-span-3 space-y-5">
          <motion.h2
            className="text-3xl lg:text-4xl font-bold text-[var(--text-primary)]"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            Hello! I&apos;m{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-[var(--accent-color)]">
              {personalInfo.name.split(" ")[0]}.
            </span>
          </motion.h2>

          {[
            personalInfo.bio,
            "Right now I'm actively looking for a first internship where I can contribute to a real engineering team, accelerate my growth, and help ship things people actually use. I bring a strong foundation in machine learning, statistical modeling, and full-stack development.",
          ].map((para, i) => (
            <motion.p
              key={i}
              className="text-[var(--text-secondary)] leading-relaxed text-base lg:text-lg"
              custom={i + 1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {para}
            </motion.p>
          ))}

          {/* Tech list */}
          <motion.div
            className="pt-2"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.35 }}
          >
            <p className="text-sm font-mono text-[var(--accent-color)] mb-3">Recently working with:</p>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              {[
                "Python / PyTorch", "React / Next.js",
                "Node.js / Express", "Scikit-learn",
                "MongoDB / PostgreSQL", "R (Statistical)",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                  <span className="text-[var(--accent-color)] font-bold">▸</span>
                  <span className="font-mono">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            {heroStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="flex flex-col items-center text-center p-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-[0_10px_30px_var(--shadow-color)] transition-all duration-200"
              >
                <span className="text-xl font-extrabold text-[var(--accent-color)] leading-none mb-1">
                  {stat.value}
                </span>
                <span className="text-xs text-[var(--text-muted)] leading-tight">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Photo ── */}
        <motion.div
          className="lg:col-span-2 flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="group relative w-64 h-72 lg:w-72 lg:h-80">
            {/* Offset border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-[color-mix(in_srgb,var(--accent-color)_30%,transparent)] translate-x-3 translate-y-3 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4" />

            {/* Photo */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[var(--card-bg)] border border-[var(--border-color)]">
              <img
                src="/venuja.png"
                alt={personalInfo.name}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
              />
            </div>

            {/* Floating tech badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -left-8 top-8 px-3 py-1.5 rounded-xl bg-[var(--card-bg)] backdrop-blur-sm border border-[var(--border-color)] text-xs font-mono font-semibold text-[var(--text-primary)] flex items-center gap-1.5 shadow-md"
            >
              <i className="devicon-python-plain colored text-base" />
              Python
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.8 }}
              className="absolute -right-6 top-16 px-3 py-1.5 rounded-xl bg-[var(--card-bg)] backdrop-blur-sm border border-[var(--border-color)] text-xs font-mono font-semibold text-[var(--text-primary)] flex items-center gap-1.5 shadow-md"
            >
              <i className="devicon-react-original colored text-base" />
              React
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1.5 }}
              className="absolute -left-4 bottom-10 px-3 py-1.5 rounded-xl bg-[var(--card-bg)] backdrop-blur-sm border border-[var(--border-color)] text-xs font-mono font-semibold text-[var(--text-primary)] flex items-center gap-1.5 shadow-md"
            >
              🧠 AI / ML
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
