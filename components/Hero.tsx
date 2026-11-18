"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { personalInfo } from "@/data/portfolio";
import SplineRobot from "@/components/SplineRobot";
import NetworkBackground from "@/components/NetworkBackground";

// Build the typewriter sequence: [phrase, pause, ...]
const buildSequence = (phrases: string[]) => {
  const seq: (string | number)[] = [];
  phrases.forEach((p) => { seq.push(p, 2200); });
  return seq;
};

const TECH = ["Python", "PyTorch", "React", "Node.js", "R"];

export default function Hero() {
  const [firstName, ...rest] = personalInfo.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <div className="band-dark relative min-h-screen flex flex-col justify-end pt-[clamp(84px,12vh,120px)] overflow-hidden">

      {/* Node-network background */}
      <NetworkBackground />

      {/* Background glow */}
      <div
        className="absolute -right-[300px] -top-[300px] w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(31,86,240,0.40), transparent 60%)" }}
      />

      {/* ── Interactive Spline Robot: own block under the text on phones, right side on desktop ── */}
      <motion.div
        className="relative order-2 w-full h-[420px] sm:h-[520px] z-0 pointer-events-none lg:order-none lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[58%] lg:pointer-events-auto"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      >
        <div className="absolute inset-0">
        {/* Blue backlight glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ paddingBottom: "18%" }}>
          <div
            style={{
              width: "500px",
              height: "500px",
              maxWidth: "90%",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(31,86,240,0.55) 0%, rgba(22,64,196,0.35) 35%, rgba(10,26,63,0.15) 65%, transparent 80%)",
              filter: "blur(30px)",
            }}
          />
        </div>
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ paddingBottom: "18%" }}
          animate={{ opacity: [0.75, 1, 0.75] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
        >
          <div
            style={{
              width: "280px",
              height: "280px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(59,109,255,0.75) 0%, rgba(31,86,240,0.48) 45%, transparent 72%)",
              filter: "blur(14px)",
              boxShadow: "0 0 60px 20px rgba(59,109,255,0.20)",
            }}
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ paddingBottom: "18%" }}
          animate={{ opacity: [0.6, 0.9, 0.6] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.6 }}
        >
          <div
            style={{
              width: "130px",
              height: "130px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(195,212,255,0.85) 0%, rgba(107,147,255,0.45) 55%, transparent 75%)",
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
        </div>
      </motion.div>

      {/* ── Content (left column on desktop; robot fills the right) ── */}
      <div className="wrap relative z-10 order-1 pointer-events-none flex-1 flex items-center py-[clamp(14px,3.5vh,40px)]">
      <div className="w-full lg:max-w-[56%]">

        {/* Status chip, then where and what: two clear rows in one typeface instead of three mismatched items */}
        <motion.div
          className="mb-[clamp(20px,3.6vh,36px)] flex flex-col items-start gap-[clamp(10px,1.6vh,16px)]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-3 border border-white/35 bg-white/[0.05] px-4 py-2.5 text-base font-semibold leading-none text-[var(--text-primary)]">
            {/* Live dot: a soft ring pulses outward from the solid centre */}
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="absolute inset-0 rounded-full bg-[#34d399] opacity-60 animate-ping motion-reduce:hidden" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-[#34d399]" />
            </span>
            Available for 2026 Internships
          </span>

          <p className="flex flex-col gap-1.5 text-[1.0625rem] font-medium leading-snug text-[var(--text-secondary)] sm:flex-row sm:items-center sm:gap-4">
            <span className="inline-flex items-center gap-2">
              <svg className="h-4 w-4 shrink-0 text-[var(--accent-color)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {personalInfo.location}
            </span>
            <span aria-hidden="true" className="hidden h-1 w-1 bg-[var(--accent-color)] sm:block" />
            <span>{personalInfo.title}</span>
          </p>
        </motion.div>

        {/* Greeting + giant name */}
        <motion.p
          className="mb-3 text-[1.2rem] font-medium leading-none text-[var(--text-secondary)]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
        >
          Hi, my name is
        </motion.p>
        <motion.h1
          className="font-black uppercase leading-[0.9] tracking-[-0.03em] text-[clamp(2.4rem,12vw,4.5rem)] lg:text-[clamp(3.4rem,min(6.5vw,10.2vh),6.3rem)] text-[var(--text-primary)]"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
        >
          {firstName}
          <span
            className="block"
            // Inter's glyphs have overlapping contours, so a plain stroke draws lines inside letters (A, R, N).
            // Painting the stroke first and filling with the background colour on top hides those inner lines;
            // the stroke is doubled because only its outer half stays visible.
            style={{
              color: "var(--bg-primary)",
              WebkitTextStroke: "4px var(--accent-color)",
              paintOrder: "stroke fill",
            }}
          >
            {lastName}.
          </span>
        </motion.h1>

        {/* Typewriter + bio, then CTAs */}
        <div className="flex flex-col gap-[clamp(18px,3.4vh,32px)] mt-[clamp(18px,3.4vh,32px)]">
          <div>
            <motion.div
              className="text-xl lg:text-2xl font-medium min-h-[2rem] mb-4"
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
            <motion.p
              className="text-base sm:text-lg leading-relaxed max-w-[540px] text-[var(--text-secondary)]"
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            >
              {personalInfo.heroBio}
            </motion.p>
          </div>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="lift pointer-events-auto inline-flex items-center gap-2.5 px-[26px] py-[15px] border-2 border-[#1f56f0] bg-[#1f56f0] text-white text-[0.95rem] font-bold hover:bg-[var(--text-primary)] hover:border-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors duration-200"
            >
              Check out my work <span className="arrow-nudge">↗</span>
            </a>
            <a
              href={personalInfo.resumeLink}
              download
              className="lift pointer-events-auto inline-flex items-center gap-2.5 px-[26px] py-[15px] border-2 border-current text-[var(--text-primary)] text-[0.95rem] font-bold hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Resume
            </a>
          </motion.div>
        </div>
      </div>
      </div>

      {/* ── Tech marquee ── */}
      <motion.div
        className="relative z-10 order-3 overflow-hidden whitespace-nowrap py-4 bg-[#1f56f0] text-white font-label font-bold text-[0.95rem] tracking-[0.04em]"
        aria-hidden="true"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
      >
        <div className="marquee-track">
          {Array.from({ length: 2 }).flatMap((_, rep) =>
            Array.from({ length: 4 }).flatMap((__, r2) =>
              TECH.map((tech) => (
                <span key={`${rep}-${r2}-${tech}`} className="marquee-item uppercase">{tech}</span>
              ))
            )
          )}
        </div>
      </motion.div>
    </div>
  );
}
