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

  // While the mobile menu is open: lock the page behind it, close on Esc,
  // and close if the screen grows past the breakpoint (rotation, resize).
  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.dataset.menu = "open"; // hides Vee (see globals.css)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        document.getElementById("mobile-menu-btn")?.focus();
      }
    };
    const wide = window.matchMedia("(min-width: 1280px)");
    const onWide = () => wide.matches && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      document.body.style.overflow = prevOverflow;
      delete document.documentElement.dataset.menu;
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    // Release the menu's scroll lock now, so the scroll below is not swallowed
    document.body.style.overflow = "";
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <nav
        className={`theme-dark fixed top-0 left-0 w-full z-50 pt-[env(safe-area-inset-top)] transition-all duration-300 border-b
          ${scrolled || menuOpen
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
            aria-label="Back to top"
            className="flex min-h-11 items-center transition-opacity hover:opacity-80"
          >
            <img src="/logo.png" alt="VKR logo" width={480} height={243} className="h-10 w-auto" />
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
              className="lift ml-4 inline-flex items-center gap-2 px-[18px] py-[9px] border-2 border-current text-[0.82rem] font-bold text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors"
            >
              Resume
              <svg className="arrow-nudge" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </a>

          </div>

          {/* Mobile: toggle + hamburger */}
          <div className="flex xl:hidden items-center gap-3">
            <button
              id="mobile-menu-btn"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="-mr-2.5 grid h-11 w-11 place-items-center text-[var(--text-primary)] hover:bg-[var(--text-primary)]/[0.08] transition-colors"
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
            // Full-height sheet: big thumb-sized rows, the page behind is locked,
            // and the Resume action sits at the bottom where the thumb already is.
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="xl:hidden flex flex-col h-[calc(100svh-74px-env(safe-area-inset-top))] overflow-y-auto overscroll-contain border-t border-[var(--border-color)] bg-[#04060b]"
            >
              <ul className="wrap flex-1 pt-3">
                {NAV_ITEMS.map(({ id, label }, i) => {
                  const isActive = active === id;
                  return (
                    <motion.li
                      key={id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.03 + i * 0.035, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="border-b border-[var(--border-color)]"
                    >
                      <button
                        onClick={() => scrollTo(id)}
                        aria-current={isActive ? "true" : undefined}
                        className={`flex w-full min-h-[56px] items-center justify-between gap-4 text-left text-[clamp(1.35rem,6vw,1.75rem)] font-bold tracking-[-0.03em] transition-colors active:text-[var(--accent-color)] ${
                          isActive ? "text-white" : "text-white/60"
                        }`}
                      >
                        {label}
                        {isActive && <span aria-hidden="true" className="h-2 w-2 bg-[var(--accent-color)]" />}
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="wrap pt-6 pb-[max(24px,env(safe-area-inset-bottom))]"
              >
                <a
                  href={personalInfo.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press flex min-h-[52px] w-full items-center justify-center gap-2 bg-[#1f56f0] text-[0.95rem] font-bold text-white"
                >
                  Download Resume <span aria-hidden="true">↗</span>
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
