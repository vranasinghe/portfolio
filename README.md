<div align="center">

  # 🚀 Venuja Ranasinghe — Personal Portfolio

  **An Interactive 3D Portfolio built with Next.js 15, React 19, Three.js, Framer Motion, and Tailwind CSS.**

  [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Three.js](https://img.shields.io/badge/Three.js-3D-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

  [Live Demo](https://venujaranasinghe.com) • [Report Bug](https://github.com/vranasinghe/portfolio/issues) • [Request Feature](https://github.com/vranasinghe/portfolio/issues)

</div>

---

## 📌 Overview

Welcome to the official repository of my personal portfolio website! Designed for modern web browsers, this platform showcases my journey as a **Data Science & AI Undergraduate at SLIIT**, highlighting my work across Full-Stack Web Development, Machine Learning, Mobile Apps, and Data Analytics.

The site blends immersive **3D interactive visual elements**, dynamic particle backgrounds, silky-smooth scroll animations, and clean dark/light mode aesthetics to deliver an exceptional user experience.

---

## ✨ Features

- 🤖 **Interactive 3D Experiences:** Spline 3D interactive robot integration and `@react-three/fiber` dynamic canvas scenes.
- 🎨 **Glassmorphism & Dynamic Themes:** Seamless dark/light theme switching using `next-themes` with custom glassmorphic UI components.
- ⚡ **High Performance & Responsive:** Built on Next.js 15 App Router and React 19 for optimal page loads and fully responsive layouts across all devices.
- 💫 **Interactive UI Animations:** Smooth page transitions, scroll-triggered animations powered by Framer Motion, particle background effects, and typewriter text dynamics.
- 📂 **Structured Showcase Sections:**
  - **Hero:** Interactive intro with 3D elements and quick call-to-actions.
  - **About:** Personal bio, key highlights, and career trajectory.
  - **Projects:** Filterable showcase of Full-Stack, Data Science & AI projects with live demos and repository links.
  - **Experience & Certifications:** Structured timeline of work experience and verified professional credentials.
  - **Toolkit:** Interactive matrix of tools, technologies, and programming languages.
  - **Contact Form:** Functional contact interface with social links.
- ⚙️ **Centralized Configuration:** Isolated data layer in `data/portfolio.ts` allows updating site content without modifying UI component code.

---

## 🛠️ Tech Stack & Tools

### **Core Technologies**
| Category | Technology |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) |

### **3D & Animation**
| Category | Technology |
|---|---|
| **3D Rendering** | [Three.js](https://threejs.org/) & [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) |
| **3D Design** | [Spline](https://spline.design/) (`@splinetool/react-spline`) |
| **Animations** | [Framer Motion 11](https://www.framer.com/motion/) |
| **UI Components & Icons** | `lucide-react`, `react-icons`, `react-simple-typewriter` |

---

## 📁 Directory Structure

```text
portfolio/
├── app/                  # Next.js App Router (Layouts, Pages, Global Styles)
│   ├── globals.css       # Global styles & Tailwind CSS directives
│   ├── layout.tsx        # Root layout with ThemeProvider & metadata
│   └── page.tsx          # Main entry page aggregating sections
├── components/           # Reusable UI & 3D components
│   ├── About.tsx         # About section component
│   ├── Certifications.tsx# Certifications carousel/grid
│   ├── Contact.tsx       # Contact form & social media links
│   ├── Experience.tsx    # Work experience timeline
│   ├── Hero.tsx          # Hero banner with 3D elements
│   ├── Nav.tsx           # Navigation bar & theme switcher
│   ├── ParticlesBackground.tsx # Interactive canvas particles
│   ├── Preloader.tsx     # Custom loading screen animation
│   ├── Projects.tsx      # Projects gallery & filters
│   ├── SplineRobot.tsx   # 3D Spline scene wrapper
│   ├── Toolkit.tsx       # Interactive skills matrix
│   └── ThemeToggle.tsx   # Dark/Light mode toggle switch
├── data/                 # Centralized content management
│   └── portfolio.ts      # Data configuration (Projects, Bio, Skills, Socials)
├── public/               # Static assets (Images, SVGs, Certifications)
├── next.config.ts        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS custom configuration
└── package.json          # Dependency specifications & scripts
```

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (v18.0.0 or higher recommended) — [Download Node.js](https://nodejs.org/)
- **npm** (comes bundled with Node.js) or **pnpm** / **yarn**

### 1. Clone the Repository

```bash
git clone https://github.com/vranasinghe/portfolio.git
cd portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Example `.env.local` contents:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the portfolio.

---

## 📦 Build for Production

To create an optimized production build:

```bash
npm run build
```

To test the production build locally:

```bash
npm run start
```

---

## 🛠️ Customization Guide

All personal info, project details, skills, certifications, and experience timelines are stored centrally in:

```text
data/portfolio.ts
```

To customize the portfolio for your own details:
1. Open `data/portfolio.ts`.
2. Update the `personalInfo`, `skills`, `projects`, `experience`, and `certifications` objects.
3. Save the file — the UI components will update automatically!

---

## 📬 Contact & Connect

I am always open to discussing new projects, internship opportunities, or collaborations!

- **Name:** Venuja Ranasinghe
- **Role:** Data Science & AI Undergraduate @ SLIIT
- **Email:** [venujaranasinghe26@gmail.com](mailto:venujaranasinghe26@gmail.com)
- **LinkedIn:** [Venuja Ranasinghe](https://www.linkedin.com/in/venuja-ranasinghe-522a63423/)
- **GitHub:** [@vranasinghe](https://github.com/vranasinghe)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

<div align="center">
  <br />
  ⭐️ <i>If you find this project interesting, feel free to give it a star!</i>
</div>
