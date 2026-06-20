"use client";

import { useEffect, useState } from "react";
import { personalInfo } from "@/data/portfolio";
import { ThemeToggle } from "@/components/ThemeToggle";

const NAV_ITEMS = [
  { id: "about",          label: "About" },
  { id: "skills",         label: "Skills" },
  { id: "projects",       label: "Projects" },
  { id: "experience",     label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "contact",        label: "Contact" },
];

export default function Nav() {
  const [active,    setActive]    = useState("home");
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

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
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 border-b
          ${scrolled
            ? "backdrop-blur-md shadow-xl border-[var(--border-color)]"
            : "border-transparent"
          }
          bg-[var(--nav-bg)]
        `}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => scrollTo("home")}
            className="text-2xl font-bold tracking-tighter text-[var(--text-primary)] hover:text-[#60a5fa] transition-colors"
          >
            &lt;<span className="text-[#60a5fa]">VR</span>/&gt;
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map(({ id, label }) => {
              const isActive = active === id;
              return (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-[#60a5fa]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {label}
                </button>
              );
            })}

            {/* Resume Button */}
            <a
              href={personalInfo.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-sm font-medium border border-[#60a5fa] text-[#60a5fa] hover:bg-[#60a5fa]/10 transition-colors flex items-center gap-2"
            >
              Resume
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </a>

            {/* ── Theme Toggle ── */}
            <ThemeToggle />
          </div>

          {/* Mobile: toggle + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              id="mobile-menu-btn"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle mobile menu"
              className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
            >
              {menuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-[var(--border-color)] bg-[var(--nav-bg)] backdrop-blur-md px-6 py-4 flex flex-col gap-3">
            {NAV_ITEMS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`text-sm font-medium text-left py-1 transition-colors ${
                  active === id
                    ? "text-[#60a5fa]"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
              >
                {label}
              </button>
            ))}
            <a
              href={personalInfo.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 px-4 py-2 rounded-lg text-sm font-medium border border-[#60a5fa] text-[#60a5fa] hover:bg-[#60a5fa]/10 transition-colors flex items-center gap-2 w-fit"
            >
              Resume ↗
            </a>
          </div>
        )}
      </nav>
    </>
  );
}
