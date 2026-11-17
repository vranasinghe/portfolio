"use client";

import { useState } from "react";
import { sectionNumber } from "@/lib/sections";
import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";

const rowClass =
  "flex items-center justify-between gap-4 py-[18px] border-b-2 border-white font-bold text-[1.05rem] transition-all duration-200 hover:pl-3 hover:text-[#04060b]";
const rowValue = "min-w-0 font-label text-[0.8rem] opacity-85 font-normal truncate";

const inputClass =
  "w-full bg-transparent border-2 border-white px-3.5 py-3.5 text-[1rem] text-white placeholder-white/75 outline-none transition-colors focus:bg-[#04060b]/20";
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
    <>
      <section className="relative w-full bg-[#1f56f0] text-white pt-[120px] overflow-hidden">
        <div className="wrap relative">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="font-label text-[0.85rem] font-bold mb-6">
              <span className="mr-3 opacity-80">{sectionNumber("contact")}</span>Get In Touch
            </p>
            <h2 className="text-[clamp(2.8rem,9vw,8rem)] leading-[0.9] tracking-[-0.06em] font-black uppercase mb-12">
              Let&apos;s build
              <br />
              something
              <br />
              <span className="text-[#04060b]">together.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-2 gap-14 pb-[100px]">

            {/* Details & links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[1.1rem] mb-5 max-w-[460px]">
                I&apos;m currently looking for internship opportunities. Whether you have a question, a project idea, or just want to say hi — I&apos;ll get back to you.
              </p>
              <p className="text-[1.1rem] mb-8 max-w-[460px]">
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
                  <span className={rowValue}>{displayUrl(personalInfo.github)} ↗</span>
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={rowClass}
                >
                  <span>LinkedIn</span>
                  <span className={rowValue}>{displayUrl(personalInfo.linkedin)} ↗</span>
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
              className="grid gap-3.5 content-start"
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
                  className={`${inputClass} min-h-[140px] resize-y`}
                />
              </label>

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center justify-center gap-2.5 px-[26px] py-[15px] bg-[#04060b] border-2 border-[#04060b] text-white font-bold text-[0.95rem] transition-colors duration-200 hover:bg-white hover:text-[#04060b] hover:border-white disabled:opacity-50"
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
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#04060b] text-white/75 py-[26px] font-label text-[0.8rem]">
        <div className="wrap flex flex-wrap justify-between gap-4">
          <span>
            Designed &amp; Built by <span className="text-[#6b93ff] font-bold">{personalInfo.name}</span>
          </span>
          <span>© {new Date().getFullYear()} · All rights reserved</span>
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hover:text-white transition-colors"
          >
            Back to top ↑
          </a>
        </div>
      </footer>
    </>
  );
}
