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
  github: "https://github.com/kavishaliyanage",
  linkedin: "https://linkedin.com/in/kavishaliyanage",
  instagram: "https://instagram.com/kavishaliyanage",
  resumeLink: "/resume.pdf",
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
  SiExpo
} from "react-icons/si";
import { FaJava, FaRProject, FaDatabase, FaNetworkWired } from "react-icons/fa";
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
      { name: "React Native", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", brandColor: "#61DAFB", bgColor: "rgba(97, 218, 251, 0.12)", hoverGlow: "rgba(97, 218, 251, 0.25)" },
      { name: "Expo", Icon: SiExpo, brandColor: "#374151", darkBrandColor: "#ffffff", bgColor: "rgba(55, 65, 81, 0.09)", hoverGlow: "rgba(55, 65, 81, 0.2)" },
      { name: "Vite", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vite/vite-original.svg", brandColor: "#646CFF", bgColor: "rgba(100, 108, 255, 0.12)", hoverGlow: "rgba(100, 108, 255, 0.25)" },
      { name: "Tailwind CSS", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", brandColor: "#06B6D4", bgColor: "rgba(6, 182, 212, 0.12)", hoverGlow: "rgba(6, 182, 212, 0.25)" },
      { name: "HTML", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", brandColor: "#E44D26", bgColor: "rgba(228, 77, 38, 0.12)", hoverGlow: "rgba(228, 77, 38, 0.25)" },
      { name: "CSS", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", brandColor: "#1572B6", bgColor: "rgba(21, 114, 182, 0.12)", hoverGlow: "rgba(21, 114, 182, 0.25)" },
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
      { name: "JWT", Icon: SiJsonwebtokens, brandColor: "#FBB829", bgColor: "rgba(251, 184, 41, 0.12)", hoverGlow: "rgba(251, 184, 41, 0.25)" },
    ],
  },
  {
    category: "DATABASES",
    color: "bg-yellow-50 border-yellow-200",
    icon: "🗄️",
    items: [
      { name: "PostgreSQL", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", brandColor: "#336791", bgColor: "rgba(51, 103, 145, 0.12)", hoverGlow: "rgba(51, 103, 145, 0.25)" },
      { name: "Supabase", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg", brandColor: "#3ECF8E", bgColor: "rgba(62, 207, 142, 0.12)", hoverGlow: "rgba(62, 207, 142, 0.25)" },
      { name: "Neon", Icon: FaDatabase, brandColor: "#00E599", bgColor: "rgba(0, 229, 153, 0.12)", hoverGlow: "rgba(0, 229, 153, 0.25)" },
      { name: "MongoDB", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", brandColor: "#47A248", bgColor: "rgba(71, 162, 72, 0.12)", hoverGlow: "rgba(71, 162, 72, 0.25)" },
      { name: "MySQL", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", brandColor: "#00758F", bgColor: "rgba(0, 117, 143, 0.12)", hoverGlow: "rgba(0, 117, 143, 0.25)" },
      { name: "MS SQL Server", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg", brandColor: "#CC0000", bgColor: "rgba(204, 0, 0, 0.12)", hoverGlow: "rgba(204, 0, 0, 0.25)" },
      { name: "Mongoose", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongoose/mongoose-original.svg", brandColor: "#880000", bgColor: "rgba(136, 0, 0, 0.12)", hoverGlow: "rgba(136, 0, 0, 0.25)" },
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
      { name: "Docker", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", brandColor: "#0DB7ED", bgColor: "rgba(13, 183, 237, 0.12)", hoverGlow: "rgba(13, 183, 237, 0.25)" },
      { name: "Vercel", Icon: SiVercel, brandColor: "#000000", darkBrandColor: "#ffffff", bgColor: "rgba(0, 0, 0, 0.07)", hoverGlow: "rgba(0, 0, 0, 0.18)" },
      { name: "Maven", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg", brandColor: "#C23531", bgColor: "rgba(194, 53, 49, 0.12)", hoverGlow: "rgba(194, 53, 49, 0.25)" },
      { name: "VS Code", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", brandColor: "#007ACC", bgColor: "rgba(0, 122, 204, 0.12)", hoverGlow: "rgba(0, 122, 204, 0.25)" },
      { name: "IntelliJ IDEA", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg", brandColor: "#FF0050", bgColor: "rgba(255, 0, 80, 0.10)", hoverGlow: "rgba(255, 0, 80, 0.22)" },
      { name: "PyCharm", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pycharm/pycharm-original.svg", brandColor: "#21D789", bgColor: "rgba(33, 215, 137, 0.10)", hoverGlow: "rgba(33, 215, 137, 0.22)" },
      { name: "Postman", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg", brandColor: "#FF6C37", bgColor: "rgba(255, 108, 55, 0.12)", hoverGlow: "rgba(255, 108, 55, 0.25)" },
    ],
  },
  {
    category: "MEDIA & DESIGN",
    color: "bg-rose-50 border-rose-200",
    icon: "🖌️",
    items: [
      { name: "Figma", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg", brandColor: "#A259FF", bgColor: "rgba(162, 89, 255, 0.12)", hoverGlow: "rgba(162, 89, 255, 0.25)" },
      { name: "Premiere Pro", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premierepro/premierepro-original.svg", brandColor: "#001489", bgColor: "rgba(0, 20, 137, 0.10)", hoverGlow: "rgba(0, 20, 137, 0.22)" },
      { name: "After Effects", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/aftereffects/aftereffects-original.svg", brandColor: "#001489", bgColor: "rgba(0, 20, 137, 0.10)", hoverGlow: "rgba(0, 20, 137, 0.22)" },
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
    imageUrl:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=900&q=80",
    tags: ["PyTorch", "ResNet-50", "DenseNet-121", "Python", "OpenCV", "Medical AI"],
    github: "https://github.com",
    role: "Lead ML Engineer",
    reversed: false,
  },
  {
    id: 2,
    title: "APT Detection Model",
    description:
      "Machine learning pipeline for Advanced Persistent Threat detection using network honeypot data. Achieves 94% precision with extremely low false-positive rates using a SMOTE-balanced Random Forest ensemble.",
    longDescription:
      "Implemented in R with caret and randomForest. The challenge was extreme class imbalance (< 2% malicious traffic). Applied SMOTE oversampling, feature engineering on temporal attack patterns, and a weighted voting ensemble.",
    imageUrl:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80",
    tags: ["R", "Random Forest", "SMOTE", "Cybersecurity", "ML"],
    github: "https://github.com",
    role: "Security Data Scientist",
    reversed: true,
  },
  {
    id: 3,
    title: "Legal AI Chat Assistant",
    description:
      "AI-powered chat interface for legal queries, mapping unstructured legal text into a structured schema for retrieval-augmented generation. Built with Material Design 3 principles for maximum accessibility.",
    longDescription:
      "Integrates Google Generative AI with a custom NLP preprocessing pipeline that normalizes legal document formats — clause types, entity references, citations — before vector indexing for high-accuracy context retrieval.",
    imageUrl:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=900&q=80",
    tags: ["NLP", "React", "Node.js", "Material Design 3", "GenAI"],
    github: "https://github.com",
    live: "https://demo.example.com",
    role: "Full-Stack AI Developer",
    reversed: false,
  },
  {
    id: 4,
    title: "Poth — Library App",
    description:
      "Full-stack mobile app providing real-time book availability alerts across libraries in Sri Lanka. WebSocket-powered with MongoDB aggregation pipelines serving queries consistently under 100ms.",
    longDescription:
      "Built with React Native (Expo), Node.js, Socket.IO, and Redis pub/sub for cross-node real-time messaging. Covers 10+ library nodes across Sri Lankan university campuses.",
    imageUrl:
      "https://images.unsplash.com/photo-1544716278-e513176f20b5?auto=format&fit=crop&w=900&q=80",
    tags: ["React Native", "Node.js", "MongoDB", "WebSockets", "Expo"],
    github: "https://github.com",
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
}

export const minorProjects: MinorProject[] = [
  {
    title: "TravelGenie",
    description:
      "AI-powered travel planning platform with personalized destination recommendations, itinerary generation, and budget management.",
    tags: ["Next.js", "Supabase", "OpenAI", "Tailwind"],
    category: "Fullstack",
    github: "https://github.com",
    live: "https://demo.example.com",
  },
  {
    title: "E-Voting System",
    description:
      "Secure campus E-Voting platform with end-to-end encryption, audit trails, and real-time result visualization.",
    tags: ["React", "Node.js", "PostgreSQL", "Cryptography"],
    category: "Fullstack",
    github: "https://github.com",
  },
  {
    title: "DengueRisk ML",
    description:
      "Predictive model for dengue outbreak risk using geospatial data, weather patterns, and historical case records.",
    tags: ["Python", "Scikit-learn", "GeoPandas", "Folium"],
    category: "AI / ML",
    github: "https://github.com",
  },
  {
    title: "Portfolio V1",
    description:
      "Previous personal portfolio built with vanilla HTML, CSS, and JS featuring Three.js particle animation.",
    tags: ["HTML", "CSS", "JavaScript", "Three.js"],
    category: "Web Development",
    github: "https://github.com",
    live: "https://demo.example.com",
  },
  {
    title: "Discord AI Bot",
    description:
      "Feature-rich Discord bot with AI responses, moderation commands, music playback, and custom slash commands.",
    tags: ["Python", "discord.py", "OpenAI", "Redis"],
    category: "AI / ML",
    github: "https://github.com",
  },
  {
    title: "Expense Tracker",
    description:
      "Full-stack expense tracking app with budgeting categories, data visualization, and monthly financial reports.",
    tags: ["React", "Express", "MongoDB", "Chart.js"],
    category: "Fullstack",
    github: "https://github.com",
  },
  {
    title: "Poth Mobile Reader",
    description:
      "Lightweight companion app for the Poth Library ecosystem, allowing offline reading and quick barcode scanning.",
    tags: ["React Native", "Expo", "SQLite"],
    category: "Mobile App",
    github: "https://github.com",
  },
  {
    title: "Fintech Dashboard Design",
    description:
      "High-fidelity Figma UI/UX designs and design system for a modern financial analytics and portfolio dashboard.",
    tags: ["Figma", "UI/UX", "Design System"],
    category: "Design",
    github: "https://github.com",
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
    period: "Seeking · 2025",
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
    image: "/frontend-certificate.jpg.jpg",
  },
  {
    title: "Introduction to Front-End Development",
    link: "https://coursera.org/verify/GV4S2WMWT1BU",
    image: "/genai-certificate.jpg.jpg",
  },
  {
    title: "Supervised Machine Learning: Regression and Classification",
    link: "https://coursera.org/verify/Z4G0EEWHYWDS",
    image: "/cetificate.jpg",
  },
];
