import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Toolkit from "@/components/Toolkit";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import GitHubActivitySection from "@/components/github/GitHubActivitySection";
import Achievements from "@/components/Achievements";
import Certifications from "@/components/Certifications";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import VeeBot from "@/components/DeferredVee";
import { SHOW_ACHIEVEMENTS, SHOW_REVIEWS } from "@/lib/sections";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-hidden relative min-h-screen transition-colors duration-300">
      <div className="relative z-10">
        <Nav />
        <section id="home" tabIndex={-1}>
          <Hero />
        </section>
        <section id="about" tabIndex={-1}>
          <About />
        </section>
        <section id="skills" tabIndex={-1}>
          <Toolkit />
        </section>
        <section id="projects" tabIndex={-1}>
          <Projects />
        </section>
        <GitHubActivitySection />
        <section id="experience" tabIndex={-1}>
          <Experience />
        </section>
        {/* Achievements — appears once data/portfolio.ts has at least one entry */}
        {SHOW_ACHIEVEMENTS && (
          <section id="achievements" tabIndex={-1}>
            <Achievements />
          </section>
        )}

        <section id="certifications" tabIndex={-1}>
          <Certifications />
        </section>

        {/* Reviews section — toggle via NEXT_PUBLIC_SHOW_REVIEWS in .env.local */}
        {SHOW_REVIEWS && (
          <section id="reviews" tabIndex={-1}>
            <Reviews />
          </section>
        )}

        <section id="contact" tabIndex={-1}>
          <Contact />
        </section>
      </div>

      {/* Vee, the interactive portfolio guide (bottom-right) */}
      <VeeBot />
    </main>
  );
}
