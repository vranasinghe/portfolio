"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { personalInfo } from "@/data/portfolio";

const QUICK_PROMPTS = [
  {
    icon: "💼",
    label: "Internship / Role Inquiry",
    text: "Hi Venuja, I came across your portfolio and I'm interested in discussing an internship or job opportunity.",
  },
  {
    icon: "🚀",
    label: "Project Collaboration",
    text: "Hi Venuja, I saw your projects and would love to collaborate with you on a project.",
  },
  {
    icon: "🧠",
    label: "AI & Data Science",
    text: "Hi Venuja, I'd like to ask you about your AI and Machine Learning work.",
  },
  {
    icon: "👋",
    label: "Quick Hello",
    text: "Hey Venuja, just checked out your portfolio. Great work!",
  },
];

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [hasNewBadge, setHasNewBadge] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [chatTime, setChatTime] = useState("Just now");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Format current time on client mount
  useEffect(() => {
    const now = new Date();
    setChatTime(
      now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );

    // Show initial teaser tooltip after 3 seconds if not opened
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleOpen = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      setHasNewBadge(false);
      setShowTooltip(false);
      setTimeout(() => textareaRef.current?.focus(), 250);
    }
  };

  const handleSelectPrompt = (promptText: string) => {
    setMessage(promptText);
    textareaRef.current?.focus();
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const targetNumber = (personalInfo.whatsapp || "94706827870").replace(
      /[^0-9]/g,
      ""
    );
    const textToSend =
      message.trim() ||
      "Hi Venuja, I checked out your portfolio and wanted to connect with you!";

    const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(
      textToSend
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <aside
      aria-label="WhatsApp live chat support"
      className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-50 flex flex-col items-end pointer-events-none"
    >
      {/* ── Chat Window Dialog ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 350, damping: 26 }}
            className="pointer-events-auto w-[calc(100vw-2.5rem)] sm:w-[380px] mb-4 rounded-3xl overflow-hidden shadow-2xl border border-emerald-500/20 bg-[var(--card-bg)] backdrop-blur-xl flex flex-col max-h-[560px] text-[var(--text-primary)]"
            style={{
              boxShadow: "0 20px 45px -10px rgba(16, 185, 129, 0.25)",
            }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 p-4 text-white flex items-center justify-between relative shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center font-bold text-white shadow-inner text-base">
                    VR
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-emerald-600 rounded-full animate-pulse" />
                </div>
                <div className="leading-tight">
                  <h4 className="font-bold text-base tracking-wide flex items-center gap-1.5">
                    {personalInfo.name}
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white/90 font-medium">
                      Online
                    </span>
                  </h4>
                  <p className="text-xs text-emerald-100 opacity-95">
                    Replies directly via WhatsApp
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors active:scale-90"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 overflow-y-auto space-y-3 bg-[var(--bg-primary)]/40 flex-1 max-h-[300px]">
              {/* Timestamp */}
              <div className="text-center">
                <span className="text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-muted)] border border-[var(--border-color)]">
                  {chatTime}
                </span>
              </div>

              {/* Incoming greeting bubble */}
              <div className="flex items-start gap-2.5 max-w-[90%]">
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 text-xs font-bold border border-emerald-500/30">
                  <FaWhatsapp className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-2xl rounded-tl-sm p-3.5 shadow-sm text-xs md:text-sm leading-relaxed">
                  <p className="font-medium mb-1">
                    Hey there! 👋 I&apos;m Venuja.
                  </p>
                  <p className="text-[var(--text-secondary)]">
                    Interested in an internship candidate, full-stack/AI
                    projects, or just want to connect? Choose a quick topic below
                    or type your message!
                  </p>
                </div>
              </div>

              {/* Suggested Quick Prompts */}
              <div className="pt-2">
                <p className="text-[11px] font-semibold text-[var(--text-muted)] mb-2 uppercase tracking-wider">
                  Quick Topics
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_PROMPTS.map((prompt, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSelectPrompt(prompt.text)}
                      className="text-xs px-2.5 py-1.5 rounded-xl bg-[var(--bg-tertiary)] hover:bg-emerald-500/10 hover:border-emerald-500/40 border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-emerald-500 text-left transition-all duration-150 active:scale-95 flex items-center gap-1.5"
                    >
                      <span>{prompt.icon}</span>
                      <span>{prompt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Message Input & Send Form */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-[var(--border-color)] bg-[var(--card-bg)]"
            >
              <div className="relative flex items-center gap-2">
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  rows={2}
                  placeholder="Write your message here..."
                  className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-3 py-2 text-xs md:text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none resize-none transition-all"
                />

                <button
                  type="submit"
                  aria-label="Send via WhatsApp"
                  className="h-10 px-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-500/30 active:scale-95 flex-shrink-0"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  <span className="hidden sm:inline text-xs">Send</span>
                </button>
              </div>

              <div className="mt-2 flex items-center justify-between text-[10px] text-[var(--text-muted)] px-1">
                <span>Opens directly in WhatsApp</span>
                <span className="font-mono">{personalInfo.whatsappNumber}</span>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Trigger Button & Tooltip ── */}
      <div className="relative flex items-center gap-3 pointer-events-auto">
        {/* Tooltip / Prompt Balloon */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              className="bg-[var(--card-bg)] text-[var(--text-primary)] border border-emerald-500/30 px-3.5 py-2 rounded-2xl shadow-xl backdrop-blur-md text-xs font-medium flex items-center gap-2 cursor-pointer hover:border-emerald-500 transition-colors"
              onClick={toggleOpen}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Need to connect quickly? Chat on WhatsApp!</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] ml-1"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Bubble Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={toggleOpen}
          aria-label="Open WhatsApp chat"
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-500 text-white shadow-[0_8px_25px_rgba(16,185,129,0.45)] flex items-center justify-center transition-all duration-300 group hover:shadow-[0_12px_30px_rgba(16,185,129,0.6)]"
        >
          {/* Pulsing ring indicator */}
          <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-40 group-hover:opacity-70 animate-ping pointer-events-none" />

          {/* New message notification badge */}
          {hasNewBadge && !isOpen && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 border-2 border-[var(--bg-primary)] text-white text-[10px] font-bold flex items-center justify-center shadow-md animate-bounce">
              1
            </span>
          )}

          {isOpen ? (
            <svg
              className="w-6 h-6 transition-transform group-hover:rotate-90"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <FaWhatsapp className="w-7 h-7 transition-transform group-hover:scale-110" />
          )}
        </motion.button>
      </div>
    </aside>
  );
}
