"use client";
import Image from "next/image";

import { motion } from "framer-motion";
import { certifications } from "@/data/portfolio";
import SectionHeader from "@/components/SectionHeader";

const cardClass =
  "spotlight relative w-full flex flex-col justify-between min-h-[230px] p-7 border-2 border-[var(--rule-card)] bg-[var(--card-bg)] transition-all duration-200";

export default function Certifications() {
  return (
    <section className="wrap py-[120px] bg-transparent">
      <SectionHeader title="Certifications" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {certifications.map((cert, i) => {
          const body = (
            <>
              <div>
                <div className="flex justify-between font-label text-[0.78rem] text-[var(--text-muted)]">
                  <span>{cert.link ? "Official Credential" : "Credential"}</span>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                </div>

                {/* Certificate image */}
                <div className="relative w-full aspect-[1.414/1] mt-5 overflow-hidden bg-[var(--bg-tertiary)] border border-[var(--line-soft)] flex-shrink-0">
                  {cert.image ? (
                    <Image
                      src={cert.image} quality={95} fill sizes="(max-width: 767px) 92vw, 380px"
                      alt={cert.title}
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <div className="flex w-full h-full items-center justify-center text-[var(--text-muted)] font-medium">
                      [Image Placeholder]
                    </div>
                  )}
                </div>

                <h3 className="text-[1.15rem] tracking-[-0.015em] leading-[1.3] font-bold text-[var(--text-primary)] mt-5 mb-5">
                  {cert.title}
                </h3>
              </div>

              {cert.link && (
                <span className="font-label text-[0.85rem] font-bold text-[var(--accent-color)]">
                  Verify Credential <span className="arrow-nudge">↗</span>
                </span>
              )}
            </>
          );

          return (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
              className="flex"
            >
              {cert.link ? (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${cardClass} hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_#1f56f0]`}
                >
                  {body}
                </a>
              ) : (
                <div className={cardClass}>{body}</div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
