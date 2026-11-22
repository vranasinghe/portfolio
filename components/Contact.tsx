"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import PipelineTrain from "@/components/PipelineTrain";

// On desktop (lg+) the contact screen is exactly one viewport tall, so vertical
// spacing scales with the viewport height (vh) instead of using fixed pixels.
// Phones: label above value so long URLs show in full instead of being cut off.
// The slide-in nudge only runs on devices that can hover (it would stick after a tap).
const rowClass =
  "flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4 min-h-[60px] justify-center py-3.5 sm:py-[18px] lg:py-[clamp(9px,1.5vh,18px)] border-b-2 border-white font-bold text-[1.05rem] transition-all duration-200 active:bg-white/10 [@media(hover:hover)]:hover:pl-3 [@media(hover:hover)]:hover:text-[#04060b]";
const rowValue = "min-w-0 max-w-full font-label text-[0.85rem] sm:text-[0.8rem] opacity-85 font-normal break-words sm:truncate";

const inputClass =
  "w-full bg-transparent border-2 border-white px-3.5 py-3.5 lg:py-[clamp(8px,1.4vh,14px)] text-[1rem] text-white placeholder-white/75 outline-none transition-colors focus:bg-[#04060b]/20";
const labelClass = "grid gap-1.5 font-label text-[0.8rem]";

// "https://www.linkedin.com/in/x/" -> "linkedin.com/in/x"
const displayUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = personalInfo.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
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
    // Blue contact area + footer together fill exactly one screen on desktop
    <div className="flex flex-col lg:min-h-[100svh]">
      <section className="relative w-full flex-1 flex flex-col justify-center bg-[#1f56f0] text-white pt-[96px] pb-[110px] sm:pt-[120px] lg:pt-[clamp(80px,10.5vh,112px)] lg:pb-[clamp(72px,8.6vh,96px)] overflow-hidden">
        <div className="wrap relative">

          {/* Header */}
          <div className="relative">

          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="font-label text-[0.85rem] font-bold mb-6 lg:mb-[clamp(10px,2vh,24px)]">
              Get In Touch
            </p>
            {/* Three lines on phones; two lines on desktop so the screen fits one viewport */}
            <h2 className="text-[clamp(2.8rem,9vw,8rem)] lg:text-[clamp(3rem,min(6.4vw,8.3vh),5.6rem)] leading-[0.9] tracking-[-0.06em] font-black uppercase mb-12 lg:mb-[clamp(20px,4.5vh,52px)]">
              Let&apos;s build{" "}
              <br className="lg:hidden" />
              something
              <br />
              <span className="text-[#04060b]">together.</span>
            </h2>
          </motion.div>
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-2 gap-14 lg:gap-x-[clamp(40px,5vw,72px)] lg:items-end">

            {/* Details & links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[1.1rem] lg:text-[clamp(0.95rem,1.9vh,1.1rem)] mb-5 lg:mb-[clamp(10px,1.8vh,20px)] max-w-[460px] lg:max-w-[520px]">
                I&apos;m currently looking for internship opportunities. Whether you have a question, a project idea, or just want to say hi — I&apos;ll get back to you.
              </p>
              <p className="text-[1.1rem] lg:text-[clamp(0.95rem,1.9vh,1.1rem)] mb-8 lg:mb-[clamp(16px,3vh,32px)] max-w-[460px] lg:max-w-[520px]">
                I&apos;m actively looking for internship roles in{" "}
                <strong>Data Science</strong>, <strong>AI / ML</strong>, or <strong>Full-Stack Development</strong>.{" "}
                Drop me a line — I respond within 24 hours.
              </p>

              <div className="border-t-2 border-white">
                {/* Email (click to copy) */}
                <button
                  type="button"
                  onClick={copyEmail}
                  title="Copy email"
                  className={`${rowClass} w-full text-left`}
                >
                  <span>Email</span>
                  <span className={rowValue}>
                    {copied ? "Copied!" : `${personalInfo.email} ⧉`}
                  </span>
                </button>

                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={rowClass}
                >
                  <span>GitHub</span>
                  <span className={rowValue}>{displayUrl(personalInfo.github)} <span className="arrow-nudge">↗</span></span>
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={rowClass}
                >
                  <span>LinkedIn</span>
                  <span className={rowValue}>View LinkedIn profile <span className="arrow-nudge">↗</span></span>
                </a>

                <a
                  href={personalInfo.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={rowClass}
                >
                  <span>Resume</span>
                  <span className={rowValue}>PDF ↓</span>
                </a>
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.form
              onSubmit={handleSubmit}
              className="grid gap-3.5 lg:gap-[clamp(8px,1.5vh,14px)] content-start"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <label htmlFor="name" className={labelClass}>
                Name
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  required
                  className={inputClass}
                />
              </label>

              <label htmlFor="email" className={labelClass}>
                Email
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  required
                  className={inputClass}
                />
              </label>

              <label htmlFor="message" className={labelClass}>
                Message
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  required
                  className={`${inputClass} min-h-[140px] lg:min-h-[clamp(52px,8vh,140px)] resize-y`}
                />
              </label>

              <button
                type="submit"
                disabled={status === "sending"}
                className="lift [--lift-glow:rgba(4,6,11,0.55)] inline-flex items-center justify-center gap-2.5 px-[26px] py-[15px] bg-[#04060b] border-2 border-[#04060b] text-white font-bold text-[0.95rem] transition-colors duration-200 hover:bg-white hover:text-[#04060b] hover:border-white disabled:opacity-50"
              >
                {status === "idle" && (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                    <span>Send Message</span>
                  </>
                )}
                {status === "sending" && <span>Sending...</span>}
                {status === "success" && (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Message Sent!</span>
                  </>
                )}
              </button>
            </motion.form>
          </div>
        </div>


        <PipelineTrain />
      </section>

      <footer className="portfolio-footer bg-[#04060b] text-[#a8b6d0] pt-6 pb-[max(24px,env(safe-area-inset-bottom))] text-xs sm:text-sm">
        <div className="wrap flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
          <p>
            Designed &amp; built by <span className="font-semibold text-[#6b93ff]">{personalInfo.name}</span>
          </p>
          <p>© {new Date().getFullYear()} · All rights reserved</p>
          <a href="#home" className="footer-link inline-flex min-h-11 items-center gap-2 font-semibold text-white">
            Back to top
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5m-6 6 6-6 6 6" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}
