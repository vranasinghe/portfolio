"use client";

import { motion } from "framer-motion";
import { certifications } from "@/data/portfolio";

export default function Certifications() {
  return (
    <section className="w-full bg-transparent py-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-950/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="text-sm font-bold tracking-widest text-[var(--accent-color)] uppercase mb-3 drop-shadow-sm font-mono">
            {/*Credentials*/}
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] mb-6 tracking-tight">
            Certifications &amp; Awards
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[var(--accent-color)] to-indigo-500 mx-auto rounded-full shadow-sm" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
              }}
              className="group relative w-full flex"
            >
              {cert.link ? (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-full flex flex-col bg-[var(--card-bg)] backdrop-blur-md rounded-3xl p-4 border border-[var(--border-color)] shadow-[0_15px_40px_-15px_var(--shadow-color)] group-hover:shadow-[0_20px_50px_rgba(96,165,250,0.15)] transition-all duration-500 overflow-hidden"
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                    style={{ background: "radial-gradient(400px circle at var(--x) var(--y), rgba(96,165,250,0.12), transparent 70%)" }}
                  />
                  {/* Inner image container */}
                  <div className="relative w-full aspect-[1.414/1] rounded-2xl overflow-hidden bg-[var(--bg-tertiary)] border border-[var(--border-color)] shadow-inner flex-shrink-0">
                    {cert.image ? (
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-contain p-2 transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex w-full h-full items-center justify-center text-[var(--text-muted)] font-medium">
                        [Image Placeholder]
                      </div>
                    )}
                  </div>

                  {/* Card Info Area */}
                  <div className="mt-4 flex flex-col justify-between flex-grow">
                    <div className="space-y-1.5">
                      <p className="text-[10px] font-bold text-[var(--accent-color)] tracking-wider uppercase">
                        Official Credential
                      </p>
                      <h3 className="text-sm md:text-base font-bold text-[var(--text-primary)] leading-snug group-hover:text-[var(--accent-color)] transition-colors duration-300 line-clamp-2">
                        {cert.title}
                      </h3>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[var(--border-color)] flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:text-[var(--accent-color)] transition-colors duration-300">
                      <span>Verify Credential</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300 text-indigo-600 dark:text-indigo-400 group-hover:text-[var(--accent-color)]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </div>
                </a>
              ) : (
                <div
                  className="w-full flex flex-col bg-[var(--card-bg)] backdrop-blur-md rounded-3xl p-4 border border-[var(--border-color)] shadow-[0_15px_40px_-15px_var(--shadow-color)] transition-all duration-500"
                >
                  {/* Inner image container */}
                  <div className="relative w-full aspect-[1.414/1] rounded-2xl overflow-hidden bg-[var(--bg-tertiary)] border border-[var(--border-color)] shadow-inner flex-shrink-0">
                    {cert.image ? (
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <div className="flex w-full h-full items-center justify-center text-[var(--text-muted)] font-medium">
                        [Image Placeholder]
                      </div>
                    )}
                  </div>

                  {/* Card Info Area */}
                  <div className="mt-4 flex flex-col justify-between flex-grow">
                    <div className="space-y-1.5">
                      <p className="text-[10px] font-bold text-[var(--text-muted)] tracking-wider uppercase">
                        Credential
                      </p>
                      <h3 className="text-sm md:text-base font-bold text-[var(--text-primary)] leading-snug line-clamp-2">
                        {cert.title}
                      </h3>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
