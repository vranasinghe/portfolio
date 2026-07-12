"use client";

// React is available via JSX transform — no explicit import needed
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { personalInfo } from "@/data/portfolio";
import SplineRobot from "@/components/SplineRobot";



// Build the typewriter sequence: [phrase, pause, ...]
const buildSequence = (phrases: string[]) => {
  const seq: (string | number)[] = [];
  phrases.forEach((p) => { seq.push(p, 2200); });
  return seq;
};

export default function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-28 pb-24 lg:pt-24 lg:pb-28 overflow-hidden bg-transparent">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-indigo-950/20 dark:bg-indigo-950/20 blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full bg-[color-mix(in_srgb,var(--accent-color)_5%,transparent)] blur-3xl" />
      </div>

      <div className="relative max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-12 items-center">

        {/* ── LEFT: Text content ── */}
        <motion.div
          className="flex flex-col gap-5 z-10"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Available badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50/90 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-900/50 shadow-sm mb-6 w-fit"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-indigo-700 dark:text-indigo-200">Available for 2026 Internships</span>
          </motion.div>

          {/* Greeting */}
          <div>
            <motion.p
              className="text-base text-[var(--text-muted)] font-mono mb-1"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
            >
              Hi, my name is
            </motion.p>
            <motion.h1
              className="text-5xl lg:text-7xl font-extrabold text-[var(--text-primary)] tracking-tight leading-[1.1] mb-4"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            >
              {personalInfo.name.split(" ")[0]}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-[var(--accent-color)]">
                {personalInfo.name.split(" ")[1]}.
              </span>
            </motion.h1>
          </div>

          {/* Typewriter */}
          <motion.div
            className="text-xl lg:text-2xl text-[var(--text-secondary)] font-medium h-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          >
            <TypeAnimation
              sequence={buildSequence(personalInfo.typewriterPhrases)}
              repeat={Infinity}
              speed={60}
              deletionSpeed={70}
              className="text-[var(--accent-color)]"
            />
          </motion.div>

          {/* Bio */}
          <motion.p
            className="text-lg text-[var(--text-muted)] leading-relaxed max-w-lg mb-8"
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          >
            {personalInfo.heroBio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-3 mt-2"
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 active:scale-95 transition-all duration-200 shadow-lg shadow-indigo-950/50"
            >
              Check out my work ↗
            </a>
            <a
              href={personalInfo.resumeLink}
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--accent-color)] text-[var(--accent-color)] text-sm font-semibold hover:bg-[color-mix(in_srgb,var(--accent-color)_10%,transparent)] active:scale-95 transition-all duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Resume
            </a>
          </motion.div>

          {/* Tech pills */}
          <motion.div
            className="flex flex-wrap gap-2 mt-1"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
          >
            {["Python", "PyTorch", "React", "Node.js", "R"].map((tech) => (
              <span key={tech} className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-[var(--bg-tertiary)] text-[var(--text-muted)] border border-[var(--border-color)]">
                {tech}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Interactive Spline Robot ── */}
        <motion.div
          className="relative h-[480px] lg:h-[600px] w-full z-10"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          {/* ── Blue-indigo backlight glow (matches reference) ── */}
          {/* Outer soft halo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 0 }}>
            <div
              style={{
                width: "500px",
                height: "500px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(79,70,229,0.55) 0%, rgba(67,56,202,0.35) 35%, rgba(30,27,75,0.15) 65%, transparent 80%)",
                filter: "blur(30px)",
              }}
            />
          </div>

          {/* Bright blue centre core */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={{ opacity: [0.75, 1, 0.75] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            style={{ zIndex: 0 }}
          >
            <div
              style={{
                width: "280px",
                height: "280px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(99,102,241,0.75) 0%, rgba(79,70,229,0.48) 45%, transparent 72%)",
                filter: "blur(14px)",
                boxShadow: "0 0 60px 20px rgba(99,102,241,0.20)",
              }}
            />
          </motion.div>

          {/* Inner white-blue hotspot */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={{ opacity: [0.6, 0.9, 0.6] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.6 }}
            style={{ zIndex: 0 }}
          >
            <div
              style={{
                width: "130px",
                height: "130px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(165,180,252,0.85) 0%, rgba(129,140,248,0.45) 55%, transparent 75%)",
                filter: "blur(10px)",
              }}
            />
          </motion.div>

          {/* Spline scene — renders on top of glow */}
          <div className="absolute inset-0 overflow-hidden bg-transparent" style={{ zIndex: 1 }}>
            <div className="w-full h-full min-h-[280px] md:min-h-[400px]">
              <SplineRobot />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[var(--text-muted)]"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
      >
        <span className="text-xs font-mono">scroll</span>
        <div className="w-5 h-8 border-2 border-[var(--border-color)] rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-[var(--text-muted)] rounded-full animate-bounce" />
        </div>
      </motion.div>
    </div>
  );
}
