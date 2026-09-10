<div align="center">

  # 🚀 Venuja Ranasinghe — Personal Portfolio

  **An Interactive 3D Portfolio built with Next.js 15, React 19, Three.js, Framer Motion, Tailwind CSS, and Web3Forms.**

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

The site blends immersive **3D interactive visual elements**, dynamic particle backgrounds, silky-smooth scroll animations, an interactive **Reviews & Testimonials system**, and clean dark/light glassmorphic aesthetics to deliver an exceptional user experience.

---

## ✨ Features

- 🤖 **Interactive 3D Experiences:** Spline 3D interactive robot integration (`@splinetool/react-spline`) and `@react-three/fiber` dynamic 3D canvas scenes.
- 🎨 **Glassmorphism & Dynamic Themes:** Seamless dark/light theme switching using `next-themes` with custom glassmorphic UI components.
- 💬 **Interactive Reviews & Testimonials:** Dedicated client & peer feedback section with star breakdown statistics, slider/grid toggle, and a public review submission page (`/review`) backed by an API route.
- 📱 **Interactive WhatsApp Messaging Widget:** Floating live WhatsApp chat bubble with online status, real-time timestamps, quick prompt suggestion chips, keyboard controls (Enter to send, Escape to close), and seamless direct contact integration.
- ⚡ **High Performance & Responsive:** Built on Next.js 15 App Router and React 19 for optimal page load speed and fully responsive layouts across mobile, tablet, and desktop screens.
- 💫 **Interactive UI Animations:** Smooth scroll transitions, Framer Motion animations, interactive canvas particles, preloader screen, and typewriter text dynamics.
- 📬 **Functional Contact Form & WhatsApp Direct:** Direct email delivery integrated with Web3Forms API, 1-click WhatsApp instant forwarding, direct WhatsApp card, and social profile hubs.
- 📂 **Structured Showcase Sections:**
  - **Hero:** Interactive intro with 3D elements, typewriter text, quick actions, and personal statistics (8+ shipped projects).
  - **About:** Bio, academic trajectory at SLIIT, and key specialization milestones.
  - **Projects:** Filterable showcase of Full-Stack, Data Science, AI, and Mobile projects with live demos and GitHub repositories.
  - **Experience & Certifications:** Structured timeline of professional work experience and verified credentials.
  - **Toolkit:** Interactive matrix of programming languages, machine learning frameworks, web technologies, and tools.
  - **Testimonials:** Live user feedback slider/grid and link to the submission form.
  - **Contact:** Functional contact interface powered by Web3Forms.
- ⚙️ **Centralized Data Architecture:** Isolated data layer in `data/portfolio.ts` allows modifying portfolio content without editing UI components.

---

## 🛠️ Tech Stack & Tools

### **Core Technologies**
| Category | Technology | Description |
|---|---|---|
| **Framework** | [Next.js 15](https://nextjs.org/) | App Router, Server Components & API Routes |
| **Library** | [React 19](https://react.dev/) | UI component library |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Type-safe JavaScript |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) | Utility-first CSS framework |

### **3D & Animation**
| Category | Technology | Description |
|---|---|---|
| **3D Rendering** | [Three.js](https://threejs.org/) & [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) | WebGL 3D scenes & helpers |
| **3D Design** | [Spline](https://spline.design/) | Interactive 3D Spline robot model |
| **Animations** | [Framer Motion 11](https://www.framer.com/motion/) | Declarative UI animations & scroll effects |
| **Icons & Text Effects** | `lucide-react`, `react-icons`, `react-type-animation` | Icons & dynamic hero typewriter text |

### **Forms & Backend Services**
| Category | Service / API | Description |
|---|---|---|
| **Contact Service** | [Web3Forms](https://web3forms.com/) | Serverless contact form submission API |
| **Review Storage** | Next.js API Routes | Local JSON storage for user reviews (`data/user_reviews.json`) |

---

## 📁 Directory Structure

```text
portfolio/
├── app/                          # Next.js App Router
│   ├── api/                      # Backend API Endpoints
│   │   └── reviews/              # Review storage handler (GET/POST)
│   │       └── route.ts
│   ├── review/                   # Public review submission page (/review)
│   │   └── page.tsx
│   ├── globals.css               # Global styles & Tailwind CSS directives
│   ├── layout.tsx                # Root layout with ThemeProvider & metadata
│   └── page.tsx                  # Main single-page portfolio view
├── components/                   # Reusable UI & 3D Components
│   ├── About.tsx                 # Bio & academic overview
│   ├── Certifications.tsx        # Professional credentials grid
│   ├── Contact.tsx               # Web3Forms contact form & social links
│   ├── Experience.tsx            # Work experience timeline
│   ├── Hero.tsx                  # Hero banner with 3D elements & typewriter
│   ├── Nav.tsx                   # Navbar with scroll links & theme toggle
│   ├── ParticlesBackground.tsx   # Interactive canvas particle background
│   ├── Preloader.tsx             # Custom preloader screen
│   ├── Projects.tsx              # Filterable project showcase gallery
│   ├── ReviewForm.tsx            # Testimonial & review submission form
│   ├── Reviews.tsx               # Reviews slider/grid & rating breakdown
│   ├── SplineRobot.tsx           # 3D Spline scene wrapper
│   ├── ThemeProvider.tsx         # Next-themes provider wrapper
│   ├── ThemeToggle.tsx           # Dark/Light theme mode switch
│   ├── Toolkit.tsx               # Categorized skills matrix
│   └── ToolsTechnologies.tsx     # Animated technology icon banner
├── data/                         # Data layer
│   ├── portfolio.ts              # Main portfolio configuration (Bio, Projects, Skills, Timeline)
│   ├── reviews.ts                # Initial curated testimonials & reviews
│   └── user_reviews.json         # Storage for user-submitted reviews
├── public/                       # Static assets (Images, Resume, Icons)
├── .env.example                  # Template for required environment variables
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript compiler configuration
└── package.json                  # Dependency specifications & scripts
```

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (v18.0.0 or higher recommended) — [Download Node.js](https://nodejs.org/)
- **npm** (bundled with Node.js) or **pnpm** / **yarn**

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

Populate `.env.local` with your Web3Forms key:

```env
# Web3Forms Access Key for the Contact Form (Get key at https://web3forms.com)
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key_here

# WhatsApp Phone Number (international format with country code, e.g. +947XXXXXXXX)
NEXT_PUBLIC_WHATSAPP_NUMBER=+94770000000
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

To run the production build locally:

```bash
npm run start
```

---

## 🔌 API Endpoints

The project includes built-in API handlers for dynamic client interactions:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/reviews` | Fetches all approved and user-submitted reviews/testimonials. |
| `POST` | `/api/reviews` | Submits a new review entry to `data/user_reviews.json`. |

---

## 🛠️ Customization Guide

All personal info, project details, skills, certifications, and experience timelines are stored centrally in:

```text
data/portfolio.ts
```

To customize the portfolio for your own details:
1. Open `data/portfolio.ts`.
2. Update the `personalInfo`, `skills`, `projects`, `experience`, and `certifications` arrays/objects.
3. Save the file — the UI components will update automatically!

---

## 📬 Contact & Connect

I am always open to discussing new projects, Data Science / AI internship opportunities, or full-stack collaborations!

- **Name:** Venuja Ranasinghe
- **Role:** Data Science & AI Undergraduate @ SLIIT
- **Email:** [venujaranasinghe26@gmail.com](mailto:venujaranasinghe26@gmail.com)
- **LinkedIn:** [Venuja Ranasinghe](https://www.linkedin.com/in/venuja-ranasinghe-522a63423/)
- **GitHub:** [@vranasinghe](https://github.com/vranasinghe)
- **Instagram:** [@venujaranasinghe](https://instagram.com/venujaranasinghe)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

<div align="center">
  <br />
  ⭐️ <i>If you find this repository helpful or inspiring, feel free to give it a star!</i>
</div>
