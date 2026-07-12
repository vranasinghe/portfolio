"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = personalInfo.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // Prioritizes environment variables, falls back to the hardcoded key
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "b28ae741-ce6c-4702-89d3-ded18845f665",
          name: formState.name,
          email: formState.email,
          message: formState.message,
          subject: `Portfolio Contact from ${formState.name}`,
          from_name: "Portfolio Contact Form",
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormState({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        console.error("Form submission failed");
        setStatus("idle");
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setStatus("idle");
      alert("Network error. Please try again later.");
    }
  };

  return (
    <section className="relative w-full bg-transparent py-24 overflow-hidden border-t border-[var(--border-color)]">
      {/* Decorative Glow elements */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-950/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[color-mix(in_srgb,var(--accent-color)_5%,transparent)] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center animate-fade-in"
        >
          <p className="text-sm font-bold tracking-widest text-[var(--accent-color)] uppercase mb-3 font-mono">
            CONTACT
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] mb-4 tracking-tight">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--accent-color)] to-indigo-500 mx-auto rounded-full mb-6" />
          <p className="text-[var(--text-muted)] max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            I&apos;m currently looking for internship opportunities. Whether you have a question, a project idea, or just want to say hi — I&apos;ll get back to you.
          </p>
        </motion.div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Contact Form Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full bg-[var(--card-bg)] backdrop-blur-md border border-[var(--border-color)] p-6 md:p-8 rounded-[2rem] shadow-[0_20px_50px_var(--shadow-color)]"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="text-[var(--accent-color)] font-bold text-xs uppercase tracking-wider mb-2 block font-mono">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] focus:border-[var(--accent-color)] rounded-xl px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-[var(--accent-color)] font-bold text-xs uppercase tracking-wider mb-2 block font-mono">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] focus:border-[var(--accent-color)] rounded-xl px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="message" className="text-[var(--accent-color)] font-bold text-xs uppercase tracking-wider mb-2 block font-mono">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] focus:border-[var(--accent-color)] rounded-xl px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-all duration-300 h-36 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className={`w-full py-4 bg-gradient-to-r from-[#38BDF8] to-[#1D4ED8] text-gray-950 hover:brightness-110 active:scale-95 transition-all duration-200 font-bold rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(56,189,248,0.3)] disabled:opacity-50`}
              >
                {status === "idle" && (
                  <>
                    <svg className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                    <span>Send Message</span>
                  </>
                )}
                {status === "sending" && <span>Sending...</span>}
                {status === "success" && (
                  <>
                    <svg className="w-4 h-4 text-green-950" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Message Sent!</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Details & Info Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col h-full justify-center lg:py-6"
          >
            <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)] mb-6">
              Let&apos;s build something together.
            </h3>

            <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed mb-8">
              I&apos;m actively looking for internship roles in{" "}
              <span className="text-[var(--accent-color)] font-semibold">Data Science</span>,{" "}
              <span className="text-[var(--accent-color)] font-semibold">AI / ML</span>, or{" "}
              <span className="text-[var(--accent-color)] font-semibold">Full-Stack Development</span>.{" "}
              Drop me a line — I respond within 24 hours.
            </p>

            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-4 rounded-xl flex items-center justify-between shadow-lg mb-8 max-w-md">
              <div className="flex items-center gap-3 overflow-hidden">
                <svg className="w-5 h-5 text-[var(--accent-color)] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span className="text-sm font-semibold text-[var(--text-secondary)] truncate">{personalInfo.email}</span>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(personalInfo.email);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="p-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--accent-color)] active:scale-95 transition-all duration-200 relative group"
                title="Copy email"
              >
                {copied ? (
                  <svg className="w-4 h-4 text-[var(--accent-color)]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect width="14" height="14" x="8" y="8" rx="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                )}
                {copied && (
                  <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#3b82f6] text-white text-xs rounded-md shadow-lg whitespace-nowrap z-50">
                    Copied!
                  </span>
                )}
              </button>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-5 py-2.5 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-color)] transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-5 py-2.5 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-color)] transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] mt-24">
        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col items-center gap-5">
          <p className="text-sm text-[var(--text-muted)]">
            Designed &amp; Built by{" "}
            <span className="text-[var(--accent-color)] font-semibold">{personalInfo.name}</span>
          </p>
          <p className="text-xs font-mono text-[var(--text-muted)]">
            © {new Date().getFullYear()} · All rights reserved
          </p>
        </div>
      </footer>
    </section>
  );
}
