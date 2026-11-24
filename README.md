<div align="center">

<br />

# Venuja Ranasinghe — Personal Portfolio

**A production-grade, interactive 3D portfolio built with Next.js 15, React 19, Three.js, Framer Motion, and Tailwind CSS.**

<br />

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-r170-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

<br />

<a href="https://github.com/vranasinghe">
  <img src="https://github-readme-stats.vercel.app/api?username=vranasinghe&show_icons=true&theme=transparent&hide_border=true&title_color=38B2AC&icon_color=38B2AC&text_color=ffffff" alt="GitHub Stats" />
</a>

<br /><br />

[🌐 Live Demo](https://venujaranasinghe.com) &nbsp;·&nbsp; [🐛 Report Bug](https://github.com/vranasinghe/portfolio/issues) &nbsp;·&nbsp; [✨ Request Feature](https://github.com/vranasinghe/portfolio/issues)

</div>

---

## 📌 Overview

This is the source code for my personal portfolio website — a full-stack, production-ready web application designed to showcase my work as a **Data Science & AI undergraduate at SLIIT**. It highlights projects spanning Machine Learning, Full-Stack Web Development, Mobile Applications, and Data Analytics.

The site is built for performance and impact, combining immersive **3D interactive elements** (Spline robot, React Three Fiber scenes), dynamic particle backgrounds, scroll-driven Framer Motion animations, an interactive **Testimonials & Reviews system**, and a clean glassmorphic dark/light aesthetic — all running on the **Next.js 15 App Router**.

> **Live at:** [venujaranasinghe.com](https://venuja.online)

---

## 🙋 About Me

- 🎓 **Studying:** B.Sc. (Hons) in Information Technology @ SLIIT — specializing in **Data Science & AI** (3rd Year)
- 🌱 **Currently Learning:** Advanced Machine Learning, LLM fine-tuning, and scalable cloud architectures
- 🔭 **Building:** End-to-end ML pipelines and production-grade full-stack web & mobile applications
- 💼 **Seeking:** A **Data Science / AI Internship** for 2026
- 💬 **Ask me about:** Python · React · Machine Learning · Data Analysis · Full-Stack Development
- 📫 **Contact:** [venujaranasinghe26@gmail.com](mailto:venujaranasinghe26@gmail.com)

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🤖 **Interactive 3D** | Spline 3D robot (`@splinetool/react-spline`) + dynamic WebGL canvas scenes via `@react-three/fiber` |
| 🎨 **Mixed Dark/Light Design** | Fixed layout mixing a dark hero, nav and projects band with light paper sections and a blue contact band |
| 💬 **Reviews & Testimonials** | Live review submission at `/review`, star-rating breakdown, slider/grid toggle, persisted via API |
| ⚡ **High Performance** | Next.js 15 App Router + React 19 Server Components for fast TTI and optimal Core Web Vitals |
| 💫 **Micro-Animations** | Framer Motion scroll transitions, animated node-network hero background, preloader, and typewriter dynamics |
| 📬 **Functional Contact Form** | Serverless email delivery via **Resend server API** + WhatsApp direct-link integration |
| 📱 **Fully Responsive** | Mobile-first layouts optimized across all screen sizes |
| ⚙️ **Centralized Data Layer** | All content (projects, skills, experience) managed from a single `data/portfolio.ts` file |

---

## 🛠️ Tech Stack

### Core

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | [Next.js 15](https://nextjs.org/) | App Router, Server Components, API Routes |
| **UI Library** | [React 19](https://react.dev/) | Component model, hooks, concurrent rendering |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Type safety across the entire codebase |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) | Utility-first CSS with custom design tokens |

### 3D & Animation

| Library | Purpose |
|---|---|
| [Three.js](https://threejs.org/) + [`@react-three/fiber`](https://docs.pmnd.rs/react-three-fiber) | WebGL 3D scene rendering |
| [`@react-three/drei`](https://docs.pmnd.rs/drei) | Three.js helpers and abstractions |
| [Spline](https://spline.design/) (`@splinetool/react-spline`) | Interactive 3D robot model |
| [Framer Motion 11](https://www.framer.com/motion/) | Declarative animations, scroll effects, layout transitions |
| `react-type-animation` | Typewriter hero text effect |

### Backend & Services

| Service | Purpose |
|---|---|
| Next.js API Routes | Review storage (`GET /api/reviews`, `POST /api/reviews`) |
| [Resend](https://resend.com/) | Server-only contact email to the configured owner |

---

## 🗂️ Project Structure

```text
portfolio/
├── app/                          # Next.js 15 App Router
│   ├── api/
│   │   └── reviews/              # Review API (GET + POST handlers)
│   │       └── route.ts
│   ├── review/                   # Public review submission page (/review)
│   │   └── page.tsx
│   ├── globals.css               # Global styles & Tailwind directives
│   ├── layout.tsx                # Root layout — metadata, fonts, preloader
│   └── page.tsx                  # Main single-page portfolio view
│
├── components/                   # Feature UI components
│   ├── About.tsx                 # Bio & academic overview
│   ├── Certifications.tsx        # Professional credentials grid
│   ├── Contact.tsx               # Resend contact form & social links
│   ├── Experience.tsx            # Work experience & education timeline
│   ├── Hero.tsx                  # Hero section — 3D robot, typewriter, stats
│   ├── Nav.tsx                   # Sticky navbar with numbered scroll links
│   ├── NetworkBackground.tsx     # Animated node-network canvas background
│   ├── Preloader.tsx             # Custom animated preloader screen
│   ├── Projects.tsx              # Filterable project gallery (featured + minor)
│   ├── ReviewForm.tsx            # Review submission form component
│   ├── Reviews.tsx               # Testimonials slider/grid + rating breakdown
│   ├── SplineRobot.tsx           # Spline 3D scene wrapper
│   ├── Toolkit.tsx               # Categorized interactive skills matrix
│   └── ToolsTechnologies.tsx     # Animated technology icon banner
│
├── data/                         # Centralized content layer
│   ├── portfolio.ts              # ← All portfolio data (bio, projects, skills, experience, certs)
│   ├── reviews.ts                # Curated seed testimonials
│   └── user_reviews.json         # Persistent storage for user-submitted reviews
│
├── public/                       # Static assets (images, icons, resume PDF)
├── .env.example                  # Environment variable template
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript compiler options
└── package.json                  # Scripts and dependencies
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** v18.0.0 or higher → [Download](https://nodejs.org/)
- **npm** (bundled with Node.js) or **pnpm** / **yarn**

### 1 · Clone the Repository

```bash
git clone https://github.com/vranasinghe/portfolio.git
cd portfolio
```

### 2 · Install Dependencies

```bash
npm install
```

### 3 · Configure Environment Variables

Copy the example env file and fill in your values:

```bash
# macOS / Linux
cp .env.example .env.local

# Windows (PowerShell)
Copy-Item .env.example .env.local
```

Open `.env.local` and set the following variables:

```env
# ── Contact Form ─────────────────────────────────────────────
# Server-only Resend; never use NEXT_PUBLIC_ for these values
RESEND_API_KEY=your_resend_key
CONTACT_TO_EMAIL=your_owner_inbox
CONTACT_FROM_EMAIL=Portfolio <contact@your-verified-domain>

# Server-only GitHub GraphQL
GITHUB_TOKEN=your_authorized_token
GITHUB_USERNAME=vranasinghe

# ── WhatsApp Integration ─────────────────────────────────────
# International format, no spaces (e.g. +94706827870)
NEXT_PUBLIC_WHATSAPP_NUMBER=+94706827870

# ── Feature Flags ────────────────────────────────────────────
# Development preview only; production reviews stay disabled
NEXT_PUBLIC_SHOW_REVIEWS=false
```

### 4 · Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the portfolio is live locally.

---

## 📦 Production Build

```bash
# Create an optimized production build
npm run build

# Serve the production build locally
npm run start
```

---

## 🔌 API Reference

The project ships two built-in API endpoints for the testimonials system:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/reviews` | Returns all curated + user-submitted reviews |
| `POST` | `/api/reviews` | Persists a new user review to `data/user_reviews.json` |

---

## 🎨 Customization

All portfolio content is isolated in a single file — no component editing required.

**To customize this portfolio with your own details:**

1. Open `data/portfolio.ts`
2. Update the exported objects and arrays:
   - `personalInfo` — name, bio, social links, resume URL
   - `heroStats` — your headline stats (projects, year, specialization)
   - `skills` — your skill categories and individual tools
   - `featuredProjects` / `minorProjects` — your project showcase
   - `experience` / `education` — your career and academic timeline
   - `certifications` — your verified credentials
3. Replace images in `/public/` with your own assets
4. Update `.env.local` with your API keys

---

## 🖥️ Featured Projects

| Project | Stack | Role |
|---|---|---|
| [X-ray Diagnostic AI](https://github.com/vranasinghe/ChestAI_Diagnostics.git) | PyTorch · ResNet-50 · DenseNet-121 · Python | ML Engineer |
| [Aura Space — Real Estate Platform](https://github.com/vranasinghe/Real-state-project.git) | React · Vite · Supabase · PostgreSQL | Full-Stack Dev |
| [Bright Future — Voting Platform](https://github.com/vranasinghe/web-voting-system) | Spring Boot · React · Java · Docker | Full-Stack Dev |
| [Poth Library App](https://github.com/vranasinghe) | React Native · Expo · Node.js · MongoDB | Full-Stack Dev |
| [DengueRisk — Outbreak Prediction](https://github.com/vranasinghe/Dengue-Outbreak-Prediction-Model) | Python · Scikit-learn · GeoPandas | ML Engineer |
| [CarTrader — Car Marketplace](https://github.com/vranasinghe/Second-Hand-Car-Sales-and-Purchase-Platform-) | Java Servlets · JSP · Vanilla JS | Web Dev |

---

## 📬 Contact & Connect

I'm always open to discussing **Data Science / AI internship opportunities**, collaborative projects, or full-stack work.

| | |
|---|---|
| **Email** | [venujaranasinghe26@gmail.com](mailto:venujaranasinghe26@gmail.com) |
| **LinkedIn** | [Venuja Ranasinghe](https://www.linkedin.com/in/venuja-ranasinghe-522a63423/) |
| **GitHub** | [@vranasinghe](https://github.com/vranasinghe) |
| **Instagram** | [@venujaranasinghe](https://instagram.com/venujaranasinghe) |
| **Portfolio** | [venujaranasinghe.com](https://venujaranasinghe.com) |

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

<div align="center">
  <br />
  If you found this helpful or inspiring, a ⭐ would mean a lot - thank you!
  <br /><br />

</div>


## Phase 01 configuration and validation

See [implementation progress](docs/PHASE_01_IMPLEMENTATION.md) for verified changes, checks, evidence gaps and hosting constraints. Run `npm test`, `npm run typecheck` and `npm run build` before release. Development uses `.next-dev`; production uses `.next`, preventing chunk collisions.

Contact requires server-only `RESEND_API_KEY` and `CONTACT_TO_EMAIL`; use a verified `CONTACT_FROM_EMAIL` sender in production. Only the configured owner receives messages; visitor confirmation emails are disabled. The five-per-minute process-local throttle is not distributed protection: configure hosting controls and provider quotas.

GitHub activity requires server-only `GITHUB_TOKEN` authorized for GraphQL contribution reads and `GITHUB_USERNAME=vranasinghe`. Missing credentials produce an honest unavailable state. Results are cached in process for one hour by username and year; cache lifetime is not durable across server restarts. UTC calendar-year summaries disclose stale results.

Reviews are always disabled in production because local JSON files cannot guarantee durable persistence on serverless hosting. `NEXT_PUBLIC_SHOW_REVIEWS=true` enables development previews only. The production review page explains the limitation; production writes return 503. Re-enabling production requires a separately approved durable-storage solution. Development saves remain unverified and unfeatured. Do not commit review submissions or credentials.
