import type { Metadata, Viewport } from "next";
import "./globals.css";
import Preloader from "@/components/Preloader";
import PointerLight from "@/components/PointerLight";
import MotionPreferences from "@/components/MotionPreferences";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.venuja.online"),
  alternates: { canonical: "/" },
  title: "Venuja Ranasinghe | Data Science & AI Portfolio",
  description:
    "Portfolio of Venuja Ranasinghe — Data Science & AI undergraduate at SLIIT, building intelligent full-stack applications.",
  keywords: ["Data Science", "AI", "Machine Learning", "Full Stack", "SLIIT", "Internship"],
  authors: [{ name: "Venuja Ranasinghe" }],
  openGraph: {
    title: "Venuja Ranasinghe | Data Science Portfolio",
    description: "Data Science & AI undergraduate at SLIIT seeking internship opportunities.",
    type: "website",
    url: "/",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Venuja Ranasinghe — Data Science & AI" }],
  },
};

// viewport-fit=cover lets the dark nav run under the notch; safe-area insets pad it back in.
// themeColor tints the mobile browser chrome to match the nav.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#04060b",
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
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[10000] focus:bg-white focus:text-black focus:p-3">Skip to content</a>
        <MotionPreferences>
        <Preloader />
        <PointerLight />
        {children}
        </MotionPreferences>
      </body>
    </html>
  );
}
