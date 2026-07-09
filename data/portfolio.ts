// ═══════════════════════════════════════════════════════════
//  CENTRAL DATA FILE — All portfolio content lives here.
//  Components import and map over these arrays/objects.
// ═══════════════════════════════════════════════════════════

export const personalInfo = {
  name: "Venuja Ranasinghe",
  title: "Data Science & AI Undergraduate",
  university: "SLIIT",
  degree: "B.Sc. (Hons) in Information Technology",
  specialization: "Data Science",
  location: "Sri Lanka",
  email: "venujaranasinghe26@gmail.com",
  github: "https://github.com/vranasinghe",
  linkedin: "https://linkedin.com/in/venujaranasinghe",
  instagram: "https://instagram.com/venujaranasinghe",
  resumeLink: "/Resume.pdf",
  bio: "Hello! My name is Venuja. I'm pursuing a B.Sc. (Hons) in Information Technology at SLIIT, specializing in Data Science. I enjoy building things that live on the web and training predictive models that turn raw data into something useful. I bridge complex machine learning architectures with user-centric design.",
  heroBio:
    "Second-year SLIIT undergraduate specializing in Data Science. I build full-stack web, mobile, and machine learning applications using Python, React, Node.js, and Java. Seeking a Data Science Internship.",
  typewriterPhrases: [
    "I build machine learning models.",
    "I build full-stack web apps.",
    "I build data-driven solutions.",
    "I deploy AI architectures.",
  ],
};

export const heroStats = [
  { value: "5+", label: "Projects Shipped" },
  { value: "2nd", label: "Year @ SLIIT" },
  { value: "Data Science", label: "Specialization" },
  { value: "LK", label: "Based in Sri Lanka" },
];

import { IconType } from "react-icons";
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiMysql,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiJupyter,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiFigma,
  SiGit,
  SiIntellijidea,
  SiPycharm,
  SiPostman,
  SiVite,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiFlask,
  SiSpringboot,
  SiJsonwebtokens,
  SiSupabase,
  SiMongoose,
  SiGithub,
  SiLinux,
  SiVercel,
  SiDavinciresolve,
  SiCanva,
  SiExpo,
  SiKotlin,
  SiGradle
} from "react-icons/si";
import { FaJava, FaRProject, FaDatabase, FaNetworkWired, FaAws } from "react-icons/fa";
import { BiLineChart } from "react-icons/bi";
import { DiPhotoshop, DiIllustrator } from "react-icons/di";
import { VscVscode } from "react-icons/vsc";

// ─── SKILLS ────────────────────────────────────────────────
export interface SkillCategory {
  category: string;
  color: string;
  icon: string;
  items: {
    name: string;
    Icon?: IconType;
    iconUrl?: string;
    brandColor: string;
    darkBrandColor?: string;
    bgColor: string;
    hoverGlow: string;
  }[];
}

export const skills: SkillCategory[] = [
  {
    category: "LANGUAGES",
    color: "bg-blue-50 border-blue-200",
    icon: "💬",
    items: [
      { name: "Python", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", brandColor: "#3776AB", bgColor: "rgba(55, 118, 171, 0.12)", hoverGlow: "rgba(55, 118, 171, 0.25)" },
      { name: "Java", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", brandColor: "#F89820", bgColor: "rgba(248, 152, 32, 0.12)", hoverGlow: "rgba(248, 152, 32, 0.25)" },
      { name: "JavaScript", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", brandColor: "#F7DF1E", bgColor: "rgba(247, 223, 30, 0.12)", hoverGlow: "rgba(247, 223, 30, 0.25)" },
      { name: "TypeScript", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", brandColor: "#3178C6", bgColor: "rgba(49, 120, 198, 0.12)", hoverGlow: "rgba(49, 120, 198, 0.25)" },
      { name: "SQL", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", brandColor: "#00758F", bgColor: "rgba(0, 117, 143, 0.12)", hoverGlow: "rgba(0, 117, 143, 0.25)" },
      { name: "R", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg", brandColor: "#276DC3", bgColor: "rgba(39, 109, 195, 0.12)", hoverGlow: "rgba(39, 109, 195, 0.25)" },
    ],
  },
  {
    category: "FRONTEND",
    color: "bg-orange-50 border-orange-200",
    icon: "🎨",
    items: [
      { name: "React", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", brandColor: "#61DAFB", bgColor: "rgba(97, 218, 251, 0.12)", hoverGlow: "rgba(97, 218, 251, 0.25)" },
      { name: "Next.js", Icon: SiNextdotjs, brandColor: "#111827", darkBrandColor: "#ffffff", bgColor: "rgba(17, 24, 39, 0.08)", hoverGlow: "rgba(17, 24, 39, 0.2)" },
      { name: "Vite", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vite/vite-original.svg", brandColor: "#646CFF", bgColor: "rgba(100, 108, 255, 0.12)", hoverGlow: "rgba(100, 108, 255, 0.25)" },
      { name: "Tailwind CSS", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", brandColor: "#06B6D4", bgColor: "rgba(6, 182, 212, 0.12)", hoverGlow: "rgba(6, 182, 212, 0.25)" },
      { name: "HTML", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", brandColor: "#E44D26", bgColor: "rgba(228, 77, 38, 0.12)", hoverGlow: "rgba(228, 77, 38, 0.25)" },
      { name: "CSS", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", brandColor: "#1572B6", bgColor: "rgba(21, 114, 182, 0.12)", hoverGlow: "rgba(21, 114, 182, 0.25)" },
    ],
  },
  {
    category: "MOBILE DEV",
    color: "bg-teal-50 border-teal-200",
    icon: "📱",
    items: [
      { name: "React Native", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", brandColor: "#61DAFB", bgColor: "rgba(97, 218, 251, 0.12)", hoverGlow: "rgba(97, 218, 251, 0.25)" },
      { name: "Expo", Icon: SiExpo, brandColor: "#374151", darkBrandColor: "#ffffff", bgColor: "rgba(55, 65, 81, 0.09)", hoverGlow: "rgba(55, 65, 81, 0.2)" },
      { name: "Kotlin", Icon: SiKotlin, brandColor: "#7F52FF", bgColor: "rgba(127, 82, 255, 0.12)", hoverGlow: "rgba(127, 82, 255, 0.25)" },
      { name: "Gradle", Icon: SiGradle, brandColor: "#02303A", darkBrandColor: "#02A58F", bgColor: "rgba(2, 48, 58, 0.12)", hoverGlow: "rgba(2, 48, 58, 0.25)" },
    ],
  },
  {
    category: "BACKEND",
    color: "bg-green-50 border-green-200",
    icon: "⚙️",
    items: [
      { name: "Node.js", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", brandColor: "#68A063", bgColor: "rgba(104, 160, 99, 0.12)", hoverGlow: "rgba(104, 160, 99, 0.25)" },
      { name: "Express", Icon: SiExpress, brandColor: "#1a1a2e", darkBrandColor: "#ffffff", bgColor: "rgba(26, 26, 46, 0.09)", hoverGlow: "rgba(26, 26, 46, 0.2)" },
      { name: "Flask", Icon: SiFlask, brandColor: "#2d3748", darkBrandColor: "#ffffff", bgColor: "rgba(45, 55, 72, 0.09)", hoverGlow: "rgba(45, 55, 72, 0.2)" },
      { name: "Spring Boot", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg", brandColor: "#6DB33F", bgColor: "rgba(109, 179, 63, 0.12)", hoverGlow: "rgba(109, 179, 63, 0.25)" },
      { name: "REST APIs", Icon: FaNetworkWired, brandColor: "#007BFF", bgColor: "rgba(0, 123, 255, 0.12)", hoverGlow: "rgba(0, 123, 255, 0.25)" },
      { name: "JWT", iconUrl: "/Jwt-Icon--Streamline-Svg-Logos.svg", brandColor: "#FBB829", bgColor: "rgba(251, 184, 41, 0.12)", hoverGlow: "rgba(251, 184, 41, 0.25)" },
    ],
  },
  {
    category: "DATABASES",
    color: "bg-yellow-50 border-yellow-200",
    icon: "🗄️",
    items: [
      { name: "PostgreSQL", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", brandColor: "#336791", bgColor: "rgba(51, 103, 145, 0.12)", hoverGlow: "rgba(51, 103, 145, 0.25)" },
      { name: "Supabase", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg", brandColor: "#3ECF8E", bgColor: "rgba(62, 207, 142, 0.12)", hoverGlow: "rgba(62, 207, 142, 0.25)" },
      { name: "Firebase", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg", brandColor: "#FFCA28", bgColor: "rgba(255, 202, 40, 0.12)", hoverGlow: "rgba(255, 202, 40, 0.25)" },
      { name: "Neon", Icon: FaDatabase, brandColor: "#00E599", bgColor: "rgba(0, 229, 153, 0.12)", hoverGlow: "rgba(0, 229, 153, 0.25)" },
      { name: "MongoDB", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", brandColor: "#47A248", bgColor: "rgba(71, 162, 72, 0.12)", hoverGlow: "rgba(71, 162, 72, 0.25)" },
      { name: "MySQL", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", brandColor: "#00758F", bgColor: "rgba(0, 117, 143, 0.12)", hoverGlow: "rgba(0, 117, 143, 0.25)" },
      { name: "MS SQL Server", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg", brandColor: "#CC0000", bgColor: "rgba(204, 0, 0, 0.12)", hoverGlow: "rgba(204, 0, 0, 0.25)" },
      { name: "Mongoose", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongoose/mongoose-original.svg", brandColor: "#880000", bgColor: "rgba(136, 0, 0, 0.12)", hoverGlow: "rgba(136, 0, 0, 0.25)" },
    ],
  },
  {
    category: "DEVOPS & CLOUD",
    color: "bg-cyan-50 border-cyan-200",
    icon: "☁️",
    items: [
      { name: "Docker", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", brandColor: "#0DB7ED", bgColor: "rgba(13, 183, 237, 0.12)", hoverGlow: "rgba(13, 183, 237, 0.25)" },
      { name: "Vercel", Icon: SiVercel, brandColor: "#000000", darkBrandColor: "#ffffff", bgColor: "rgba(0, 0, 0, 0.07)", hoverGlow: "rgba(0, 0, 0, 0.18)" },
      { name: "AWS", Icon: FaAws, brandColor: "#FF9900", bgColor: "rgba(255, 153, 0, 0.12)", hoverGlow: "rgba(255, 153, 0, 0.25)" },
      { name: "Maven", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg", brandColor: "#C23531", bgColor: "rgba(194, 53, 49, 0.12)", hoverGlow: "rgba(194, 53, 49, 0.25)" },
    ],
  },
  {
    category: "AI & DATA",
    color: "bg-purple-50 border-purple-200",
    icon: "🧠",
    items: [
      { name: "PyTorch", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg", brandColor: "#EE4C2C", bgColor: "rgba(238, 76, 44, 0.12)", hoverGlow: "rgba(238, 76, 44, 0.25)" },
      { name: "TensorFlow", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", brandColor: "#FF6F00", bgColor: "rgba(255, 111, 0, 0.12)", hoverGlow: "rgba(255, 111, 0, 0.25)" },
      { name: "Pandas", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg", brandColor: "#150E89", bgColor: "rgba(21, 17, 136, 0.12)", hoverGlow: "rgba(21, 17, 136, 0.25)" },
      { name: "NumPy", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg", brandColor: "#4D77CF", bgColor: "rgba(77, 119, 207, 0.12)", hoverGlow: "rgba(77, 119, 207, 0.25)" },
      { name: "Scikit-learn", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg", brandColor: "#F27F2C", bgColor: "rgba(242, 127, 44, 0.12)", hoverGlow: "rgba(242, 127, 44, 0.25)" },
      { name: "Matplotlib", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg", brandColor: "#1177BB", bgColor: "rgba(17, 119, 187, 0.12)", hoverGlow: "rgba(17, 119, 187, 0.25)" },
      { name: "Jupyter", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg", brandColor: "#F07325", bgColor: "rgba(240, 115, 37, 0.12)", hoverGlow: "rgba(240, 115, 37, 0.25)" },
    ],
  },
  {
    category: "TOOLS",
    color: "bg-pink-50 border-pink-200",
    icon: "🛠️",
    items: [
      { name: "Git", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", brandColor: "#F05032", bgColor: "rgba(240, 80, 50, 0.12)", hoverGlow: "rgba(240, 80, 50, 0.25)" },
      { name: "GitHub", Icon: SiGithub, brandColor: "#24292e", darkBrandColor: "#ffffff", bgColor: "rgba(36, 41, 46, 0.09)", hoverGlow: "rgba(36, 41, 46, 0.2)" },
      { name: "VS Code", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", brandColor: "#007ACC", bgColor: "rgba(0, 122, 204, 0.12)", hoverGlow: "rgba(0, 122, 204, 0.25)" },
      { name: "IntelliJ IDEA", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg", brandColor: "#FF0050", bgColor: "rgba(255, 0, 80, 0.10)", hoverGlow: "rgba(255, 0, 80, 0.22)" },
      { name: "PyCharm", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pycharm/pycharm-original.svg", brandColor: "#21D789", bgColor: "rgba(33, 215, 137, 0.10)", hoverGlow: "rgba(33, 215, 137, 0.22)" },
      { name: "Android Studio", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg", brandColor: "#3DDC84", bgColor: "rgba(61, 220, 132, 0.12)", hoverGlow: "rgba(61, 220, 132, 0.25)" },
      { name: "Postman", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg", brandColor: "#FF6C37", bgColor: "rgba(255, 108, 55, 0.12)", hoverGlow: "rgba(255, 108, 55, 0.25)" },
    ],
  },
  {
    category: "MEDIA & DESIGN",
    color: "bg-rose-50 border-rose-200",
    icon: "🖌️",
    items: [
      { name: "Figma", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg", brandColor: "#A259FF", bgColor: "rgba(162, 89, 255, 0.12)", hoverGlow: "rgba(162, 89, 255, 0.25)" },
      { name: "Premiere Pro", iconUrl: "/Adobe_Premiere_Pro_CC_icon.svg", brandColor: "#001489", bgColor: "rgba(0, 20, 137, 0.10)", hoverGlow: "rgba(0, 20, 137, 0.22)" },
      { name: "After Effects", iconUrl: "/Adobe_After_Effects_CC_icon.svg", brandColor: "#9999FF", bgColor: "rgba(153, 153, 255, 0.10)", hoverGlow: "rgba(153, 153, 255, 0.22)" },
      { name: "DaVinci Resolve", iconUrl: "https://upload.wikimedia.org/wikipedia/commons/9/90/DaVinci_Resolve_17_logo.svg", brandColor: "#46B3B3", bgColor: "rgba(70, 179, 179, 0.12)", hoverGlow: "rgba(70, 179, 179, 0.25)" },
      { name: "Canva", iconUrl: "/canva.svg", brandColor: "#00C4CC", bgColor: "rgba(0, 196, 204, 0.12)", hoverGlow: "rgba(0, 196, 204, 0.25)" },
      { name: "Photoshop", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg", brandColor: "#31A8FF", bgColor: "rgba(49, 168, 255, 0.12)", hoverGlow: "rgba(49, 168, 255, 0.25)" },
      { name: "Illustrator", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-original.svg", brandColor: "#FF9A00", bgColor: "rgba(255, 154, 0, 0.12)", hoverGlow: "rgba(255, 154, 0, 0.25)" },
    ],
  },
];

// ─── FEATURED PROJECTS ────────────────────────────────────
export interface FeaturedProject {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  tags: string[];
  github: string;
  live?: string;
  role: string;
  reversed?: boolean;
}

export const featuredProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "X-ray Diagnostic AI",
    description:
      "Deep learning models trained on 100K+ medical X-ray images to detect pulmonary abnormalities including pneumonia, cardiomegaly, and pleural effusion. Implements ResNet-50 and DenseNet-121 architectures.",
    longDescription:
      "Built with PyTorch and optimized for GPU training using mixed-precision (FP16) and gradient checkpointing, reducing training time by 40% and memory usage by 55%. Achieved 94.7% validation accuracy on the NIH Chest X-ray Dataset.",
    imageUrl: "/Chest X ray Diagnosis system.png",
    tags: ["PyTorch", "ResNet-50", "DenseNet-121", "Python", "OpenCV", "Medical AI"],
    github: "https://github.com/vranasinghe/ChestAI_Diagnostics.git",
    live: "https://chest-ai-diagnostics-qjwog73l9-teams-01.vercel.app",
    role: "Lead ML Engineer",
    reversed: false,
  },
  {
    id: 2,
    title: "Casa Mare — Modern Real Estate Platform",
    description:
      "A premium, modern real estate marketplace platform built with React, Vite, Tailwind CSS, and a Supabase (PostgreSQL) backend.",
    longDescription:
      "Features dynamic property browsing with multi-parameter filtering, interactive property listings, user sessions, role-based controls, row-level security (RLS) policies, and database persistence.",
    imageUrl: "/Modern Real state platform.png",
    tags: ["React", "Vite", "Tailwind CSS", "Supabase", "PostgreSQL", "RLS Security"],
    github: "https://github.com/vranasinghe/Real-state-project.git",
    live: "https://real-state-project-9bb29bow0-teams-01.vercel.app",
    role: "Full-Stack Developer",
    reversed: true,
  },
  {
    id: 3,
    title: "Bright Future — Secure Student Awards Voting Platform",
    description:
      "A full-stack student awards voting platform with events, nominees, dashboards, notifications, and results reports.",
    longDescription:
      "Built with Spring Boot backend API and React/Vite UI frontend. Implements role-based dashboard access, automated notification triggers, student registration, and secure award voting mechanism.",
    imageUrl: "/Bright Vote.png",
    tags: ["Spring Boot", "React", "Vite", "Java", "H2 Database", "REST APIs", "Docker"],
    github: "https://github.com/vranasinghe/web-voting-system",
    live: "https://web-voting-system-pz0d5hbpv-teams-01.vercel.app",
    role: "Full-Stack Developer",
    reversed: false,
  },
  {
    id: 4,
    title: "Poth Library App",
    description:
      "A mobile reading & book marketplace platform for Sri Lanka, enabling readers to explore curated books and shop owners to manage listings and grow their library business.",
    longDescription:
      "Built with React Native and Expo (SDK 54) using Expo Router on the frontend. The backend is powered by Node.js, Express, and MongoDB with Mongoose. Features secure JWT authentication, encrypted passwords, and Cloudinary media storage.",
    imageUrl: "/Libaray App.png",
    tags: ["React Native", "Expo SDK 54", "Node.js", "Express.js", "MongoDB", "JWT Auth", "Cloudinary"],
    github: "https://github.com/vranasinghe",
    role: "Full-Stack Developer",
    reversed: true,
  },
];

// ─── MINOR PROJECTS ───────────────────────────────────────
export interface MinorProject {
  title: string;
  description: string;
  tags: string[];
  category: "AI / ML" | "Web Development" | "Mobile App" | "Fullstack" | "Design";
  github: string;
  live?: string;
  imageUrl?: string;
}

export const minorProjects: MinorProject[] = [
  {
    title: "DengueRisk — Outbreak Prediction Model",
    description:
      "Predictive model for dengue outbreak risk using geospatial data, weather patterns, and historical case records to identify high-risk transmission zones.",
    tags: ["Python", "Scikit-learn", "GeoPandas", "Folium", "Machine Learning", "Spatial Data Science"],
    category: "AI / ML",
    github: "https://github.com/vranasinghe/Dengue-Outbreak-Prediction-Model",
    live: "https://macromaster101.github.io/DengueRisk/dashboard/",
    imageUrl: "/Dengu Risk.png",
  },
  {
    title: "CarTrader — Premium Car Marketplace",
    description:
      "A modern car buying & selling marketplace platform utilizing a glassmorphic interface, client-side localStorage database simulation, and a full-stack Java Servlet backend.",
    tags: ["Java Servlets", "JavaServer Pages (JSP)", "Vanilla CSS", "ES6 JavaScript", "HTML5", "Apache Tomcat"],
    category: "Web Development",
    github: "https://github.com/vranasinghe/Second-Hand-Car-Sales-and-Purchase-Platform-",
    live: "https://vranasinghe.github.io/Second-Hand-Car-Sales-and-Purchase-Platform-/",
    imageUrl: "/Car Trader.png",
  },
  {
    title: "Portfolio Design — Premium UI/UX Showcase",
    description:
      "A beautifully crafted, modern personal portfolio design. Focuses on premium glassmorphic cards, glowing interactive neon accents, smooth page transitions, and responsive layouts.",
    tags: ["Figma", "Design System", "Vanilla CSS", "HTML5", "Framer Motion", "UI/UX Design"],
    category: "Design",
    github: "https://github.com/vranasinghe/portfolio",
    live: "http://localhost:3000/",
    imageUrl: "/portfolio_design.png",
  },
];

// ─── EXPERIENCE ───────────────────────────────────────────
export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  type: "seeking" | "education" | "work";
  description: string;
  bullets: string[];
  tags: string[];
}

export const experience: ExperienceItem[] = [
  {
    role: "Data Science / AI Intern",
    company: "Open to Opportunities",
    period: "Seeking · 2026",
    type: "seeking",
    description:
      "Looking for my first internship where I can contribute to a real engineering team. I've shipped 5+ end-to-end projects spanning web, mobile, and ML — ready from day one.",
    bullets: [
      "Project-tested skills across web, mobile, and ML domains",
      "Strong foundation in CNNs, NLP, and statistical modeling",
      "Comfortable with full-stack development (React, Node, Python)",
      "IEEE Student Member at SLIIT",
    ],
    tags: ["Data Science", "Machine Learning", "Full-Stack", "Remote-friendly"],
  },
];

// ─── EDUCATION ────────────────────────────────────────────
export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  description: string;
  tags: string[];
}

export const education: EducationItem[] = [
  {
    degree: "B.Sc. (Hons) in Information Technology",
    institution: "Sri Lanka Institute of Information Technology (SLIIT)",
    period: "2024 — Present",
    description:
      "Specializing in Artificial Intelligence & Data Science. Relevant coursework: OOP, Data Structures & Algorithms, Database Management, Software Engineering, Machine Learning Fundamentals, and Web Technologies.",
    tags: ["Data Science Specialization", "IEEE Student Member", "GPA: In Progress"],
  },
  {
    degree: "G.C.E. Advanced Level (A/L) - Physical Science Stream",
    institution: "Ananda College – Colombo 10",
    period: "2019 — 2022",
    description: "Combined Mathematics, Physics, and Chemistry stream.",
    tags: ["Combined Maths", "Physics", "Chemistry"],
  },
  {
    degree: "G.C.E. Ordinary Level (O/L)",
    institution: "Dharmapala Vidyalaya - Pannipitiya",
    period: "2017 — 2018",
    description: "Secondary school education including core subjects such as Mathematics, Science, and English.",
    tags: ["Mathematics", "Science", "English"],
  },
];

// ─── CERTIFICATIONS ───────────────────────────────────────
export interface Certification {
  title: string;
  link?: string;
  image?: string;
}

export const certifications: Certification[] = [
  {
    title: "Generative AI for Everyone",
    link: "https://coursera.org/verify/FNBNBNCG0SL8",
    image: "/genai-certificate.jpg.jpg",
  },
  {
    title: "Introduction to Front-End Development",
    link: "https://coursera.org/verify/GV4S2WMWT1BU",
    image: "/frontend-certificate.jpg.jpg",
  },
  {
    title: "Supervised Machine Learning: Regression and Classification",
    link: "https://coursera.org/verify/Z4G0EEWHYWDS",
    image: "/cetificate.jpg",
  },
];
