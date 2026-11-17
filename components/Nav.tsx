"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import { SECTIONS } from "@/lib/sections";

// Nav order and numbering come from the shared section list, so they always match the page.
const NAV_ITEMS = SECTIONS;


export default function Nav() {
  const [active,    setActive]    = useState("home");
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  const { scrollYProgress } = useScroll();
  const scrollProgress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = NAV_ITEMS.map((item) => {
        const el = document.getElementById(item.id);
        if (!el) return { id: item.id, top: Infinity };
        return { id: item.id, top: Math.abs(el.getBoundingClientRect().top) };
      });

      const homeEl = document.getElementById("home");
      if (homeEl) {
        sections.push({ id: "home", top: Math.abs(homeEl.getBoundingClientRect().top) });
      }

      const closest = sections.reduce((a, b) => (a.top < b.top ? a : b));
      setActive(closest.id);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`theme-dark fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b
          ${scrolled
            ? "backdrop-blur-md border-[var(--border-color)] bg-[var(--nav-bg)]"
            : "border-transparent bg-transparent"
          }
        `}
      >
        {/* Scroll progress indicator */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent-color)] origin-left"
          style={{ scaleX: scrollProgress }}
        />

        <div className="wrap flex items-center justify-between h-[74px]">

          {/* Logo */}
          <button
            onClick={() => scrollTo("home")}
            className="flex items-center gap-1.5 font-label font-bold text-[1.05rem] text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors"
          >
            &lt;
            <b className="grid place-items-center w-[34px] h-[34px] bg-[#1f56f0] text-white text-[0.85rem]">VR</b>
            /&gt;
          </button>

          {/* Desktop Links */}
          <div className="hidden xl:flex items-center gap-1">
            <ul className="flex items-center gap-1 font-label font-medium text-[0.82rem]">
              {NAV_ITEMS.map(({ id, label }) => {
                const isActive = active === id;
                return (
                  <li key={id}>
                    <button
                      onClick={() => scrollTo(id)}
                      className={`relative px-3 py-2 transition-colors duration-200 hover:bg-[var(--text-primary)]/[0.08] ${
                        isActive
                          ? "text-[var(--text-primary)]"
                          : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      {label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-underline"
                          className="absolute left-3 right-3 bottom-0 h-0.5 bg-[var(--accent-color)]"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Resume Button */}
            <a
              href={personalInfo.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 inline-flex items-center gap-2 px-[18px] py-[9px] border-2 border-current text-[0.82rem] font-bold text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors"
            >
              Resume
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </a>

          </div>

          {/* Mobile: toggle + hamburger */}
          <div className="flex xl:hidden items-center gap-3">
            <button
              id="mobile-menu-btn"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle mobile menu"
              className="p-2 text-[var(--text-primary)] hover:bg-[var(--text-primary)]/[0.08] transition-colors"
            >
              {menuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="xl:hidden overflow-hidden border-t border-[var(--border-color)] bg-[var(--nav-bg)] backdrop-blur-md"
            >
              <div className="wrap py-4 flex flex-col gap-1 font-label font-medium text-[0.9rem]">
                {NAV_ITEMS.map(({ id, label }, i) => (
                  <motion.button
                    key={id}
                    onClick={() => scrollTo(id)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                    className={`text-left py-2.5 border-b border-[var(--border-color)] transition-colors ${
                      active === id
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {label}
                  </motion.button>
                ))}
                <motion.a
                  href={personalInfo.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: NAV_ITEMS.length * 0.04, duration: 0.2 }}
                  className="mt-3 px-[18px] py-[9px] border-2 border-current text-[0.82rem] font-bold text-[var(--text-primary)] flex items-center gap-2 w-fit"
                >
                  Resume ↗
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
