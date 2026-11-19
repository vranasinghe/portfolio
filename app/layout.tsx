import type { Metadata } from "next";
import "./globals.css";
import Preloader from "@/components/Preloader";
import PointerLight from "@/components/PointerLight";

export const metadata: Metadata = {
  title: "Venuja Ranasinghe | Data Science & AI Portfolio",
  description:
    "Portfolio of Venuja Ranasinghe — Data Science & AI undergraduate at SLIIT, building intelligent full-stack applications.",
  keywords: ["Data Science", "AI", "Machine Learning", "Full Stack", "SLIIT", "Internship"],
  authors: [{ name: "Venuja Ranasinghe" }],
  openGraph: {
    title: "Venuja Ranasinghe | Data Science Portfolio",
    description: "Data Science & AI undergraduate at SLIIT seeking internship opportunities.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning: browser extensions (e.g. AI Nexus) inject
    // data-* attributes on <html> before React hydrates. Only affects this tag.
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body
        suppressHydrationWarning
        className="bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans antialiased transition-colors duration-300"
      >
        <Preloader />
        <PointerLight />
        {children}
      </body>
    </html>
  );
}
