import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Toolkit from "@/components/Toolkit";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import ParticlesBackground from "@/components/ParticlesBackground";

// Toggle Reviews visibility via .env.local → NEXT_PUBLIC_SHOW_REVIEWS=true/false
const SHOW_REVIEWS = process.env.NEXT_PUBLIC_SHOW_REVIEWS === "true";

export default function Home() {
  return (
    <main className="bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-hidden relative min-h-screen transition-colors duration-300">
      <ParticlesBackground />
      <div className="relative z-10">
        <Nav />
        <section id="home">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="skills">
          <Toolkit />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="experience">
          <Experience />
        </section>
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
    </main>
  );
}
