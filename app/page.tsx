import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Toolkit from "@/components/Toolkit";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Achievements from "@/components/Achievements";
import Certifications from "@/components/Certifications";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import VeeBot from "@/components/VeeBot";
import { SHOW_ACHIEVEMENTS, SHOW_REVIEWS } from "@/lib/sections";

export default function Home() {
  return (
    <main className="bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-hidden relative min-h-screen transition-colors duration-300">
      <div className="relative z-10">
        <Nav />
        <section id="home">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="skills">
          <Toolkit />
        </section>
        <section id="experience">
          <Experience />
        </section>
        {/* Achievements — appears once data/portfolio.ts has at least one entry */}
        {SHOW_ACHIEVEMENTS && (
          <section id="achievements">
            <Achievements />
          </section>
        )}

        <section id="certifications">
          <Certifications />
        </section>

        {/* Reviews section — toggle via NEXT_PUBLIC_SHOW_REVIEWS in .env.local */}
        {SHOW_REVIEWS && (
          <section id="reviews">
            <Reviews />
          </section>
        )}

        <section id="contact">
          <Contact />
        </section>
      </div>

      {/* Vee, the interactive portfolio guide (bottom-right) */}
      <VeeBot />
    </main>
  );
}
