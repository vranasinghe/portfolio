"use client";

import { motion } from "framer-motion";
import { sectionNumber } from "@/lib/sections";
import { personalInfo, heroStats } from "@/data/portfolio";
import SectionHeader from "@/components/SectionHeader";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" },
  }),
};

const cell = "border-2 border-[var(--rule-card)] bg-[var(--card-bg)] p-[30px] relative";

const RECENT = [
  "Python / PyTorch", "React / Next.js",
  "Node.js / Express", "Scikit-learn",
  "MongoDB / PostgreSQL", "R (Statistical)",
];

export default function About() {
  return (
    <section className="wrap py-[120px] relative">
      <SectionHeader index={sectionNumber("about")} title="About Me" />

      <div className="grid grid-cols-2 lg:grid-cols-12 gap-4">

        {/* ── Photo cell ── */}
        <motion.div
          className="col-span-2 lg:col-span-4 lg:row-span-2 min-h-[440px] bg-[#1f56f0] text-white flex flex-col justify-between overflow-hidden relative border-2 border-[var(--rule-card)]"
          custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          <div className="relative flex-1 min-h-[360px] group">
            <img
              src="/venuja.png"
              alt={personalInfo.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Floating tech badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute left-3 top-8 px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--rule-card)] text-xs font-label font-semibold text-[var(--text-primary)] flex items-center gap-1.5 shadow-md"
            >
              <i className="devicon-python-plain colored text-base" />
              Python
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.8 }}
              className="absolute right-3 top-16 px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--rule-card)] text-xs font-label font-semibold text-[var(--text-primary)] flex items-center gap-1.5 shadow-md"
            >
              <i className="devicon-react-original colored text-base" />
              React
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1.5 }}
              className="absolute left-3 bottom-10 px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--rule-card)] text-xs font-label font-semibold text-[var(--text-primary)] flex items-center gap-1.5 shadow-md"
            >
              🧠 AI / ML
            </motion.div>
          </div>

          <div className="px-5 py-4 bg-[#04060b] font-label text-[0.8rem] flex justify-between gap-4">
            <span>{personalInfo.university}</span>
            <span>{personalInfo.specialization}</span>
          </div>
        </motion.div>

        {/* ── Bio cell ── */}
        <motion.div
          className={`${cell} col-span-2 lg:col-span-8`}
          custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          <h3 className="text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.2] tracking-[-0.025em] font-bold text-[var(--text-primary)] mb-4">
            Hello! I&apos;m{" "}
            <em className="not-italic text-[var(--accent-color)]">
              {personalInfo.name.split(" ")[0]}.
            </em>
          </h3>

          {[
            personalInfo.bio,
            "Right now I'm actively looking for a first internship where I can contribute to a real engineering team, accelerate my growth, and help ship things people actually use. I bring a strong foundation in machine learning, statistical modeling, and full-stack development.",
          ].map((para, i) => (
            <p key={i} className="text-[var(--text-secondary)] mb-3 max-w-[680px] leading-relaxed">
              {para}
            </p>
          ))}
        </motion.div>

        {/* ── Stat cells ── */}
        {heroStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i + 2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`${cell} col-span-1 lg:col-span-2 min-h-[160px] flex flex-col justify-between ${
              i % 2 === 1 ? "!bg-[#0b1222] text-white" : ""
            }`}
          >
            <b className={`text-[clamp(1.35rem,2.2vw,2rem)] leading-[1.05] tracking-[-0.04em] font-extrabold break-words ${
              i % 2 === 1 ? "text-white" : "text-[var(--text-primary)]"
            }`}>
              {stat.value}
            </b>
            <span className={`font-label text-[0.8rem] ${i % 2 === 1 ? "text-white/75" : "text-[var(--text-muted)]"}`}>
              {stat.label}
            </span>
          </motion.div>
        ))}

        {/* ── Recently working with ── */}
        <motion.div
          className={`${cell} col-span-2 lg:col-span-12 !bg-[var(--bg-secondary)]`}
          custom={6} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          <span className="block mb-3 font-label text-[0.78rem] font-bold text-[var(--accent-color)]">
            Recently working with:
          </span>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8">
            {RECENT.map((item) => (
              <li key={item} className="flex gap-2.5 py-[7px] border-b border-[var(--line-soft)] text-[0.95rem] text-[var(--text-secondary)] font-medium">
                <span className="text-[var(--accent-color)] font-bold">→</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
