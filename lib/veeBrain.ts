// Vee's "brain": a small, scripted question-answerer. It is not an AI model —
// every answer is built from data/portfolio.ts, so it can never invent facts.

import {
  personalInfo,
  featuredProjects,
  minorProjects,
  skills,
  education,
  experience,
  achievements,
  certifications,
} from "@/data/portfolio";

export interface VeeAction {
  label: string;
  /** "#section" scrolls the page; anything else opens as a link */
  href: string;
}

export interface VeeReply {
  text: string;
  actions?: VeeAction[];
  /** "happy" makes Vee smile for a moment */
  mood?: "happy";
}

// ── helpers ──────────────────────────────────────────────
const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9+#./\s-]/g, " ")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Whole-word (or whole-phrase) match against the normalised question */
const mentions = (q: string, word: string) => new RegExp(`(^|\\s)${esc(norm(word))}(\\s|$)`).test(q);
const countOf = (q: string, words: string[]) => words.filter((w) => mentions(q, w)).length;

const titleCase = (s: string) =>
  s.toLowerCase().replace(/(^|[\s/&])([a-z])/g, (_, p, c) => p + c.toUpperCase()).replace(/\bAi\b/, "AI").replace(/Devops/, "DevOps");

const shortTitle = (t: string) => t.split(" — ")[0];
const firstName = personalInfo.name.split(" ")[0];

// ── knowledge built from the portfolio data ──────────────
type AnyProject = {
  title: string;
  description: string;
  tags: string[];
  github: string;
  live?: string;
};
const allProjects: AnyProject[] = [...featuredProjects, ...minorProjects];

const GENERIC = new Set([
  "model", "system", "platform", "modern", "premium", "responsive", "portfolio", "website",
  "application", "secure", "student", "awards", "voting", "web", "app", "prediction", "outbreak",
  "marketplace", "real", "estate", "tracker", "library", "diagnostic", "commerce",
]);

/** Distinctive words that identify each project, e.g. "denguerisk", "cartrader", "x ray" */
const projectKeys = allProjects.map((p) => {
  const head = norm(shortTitle(p.title));
  const headWords = head.split(" ");
  const words = norm(p.title).split(" ").filter((w) => w.length >= 4 && !GENERIC.has(w));
  const keys = [head, ...words];
  if (headWords.length > 1) keys.push(headWords.slice(0, 2).join(" ")); // "x ray", "aura space", "e commerce"
  return { project: p, head: headWords[0], keys: Array.from(new Set(keys)) };
});

/** Matches a project by name, including a partial name typed as one word ("dengue" → DengueRisk) */
const findProject = (q: string) => {
  const qWords = q.split(" ");
  return projectKeys.find(
    ({ keys, head }) =>
      keys.some((k) => mentions(q, k)) || qWords.some((w) => w.length >= 5 && head.length > w.length && head.startsWith(w))
  )?.project;
};

// Skill names that are also everyday words (or contact channels) are left to the topic matcher
const AMBIGUOUS_SKILLS = new Set(["GitHub", "Express", "Expo", "Neon", "REST APIs"]);
// Longest names first, so "React Native" wins over "React" and "PostgreSQL" over "SQL"
const allSkills = skills
  .flatMap((c) => c.items.map((i) => ({ name: i.name, category: titleCase(c.category) })))
  .filter((s) => !AMBIGUOUS_SKILLS.has(s.name))
  .sort((x, y) => y.name.length - x.name.length);

// ── intents ──────────────────────────────────────────────
const SECTION = (id: string, label: string): VeeAction => ({ label, href: `#${id}` });

const intents: { words: string[]; reply: () => VeeReply }[] = [
  {
    words: ["projects", "project", "built", "build", "made", "portfolio", "apps", "showcase", "works"],
    reply: () => ({
      text:
        `${firstName} has ${featuredProjects.length} featured projects:\n` +
        featuredProjects.map((p) => `• ${shortTitle(p.title)}`).join("\n") +
        `\n\n…plus ${minorProjects.length} smaller ones. Ask me about any of them by name.`,
      actions: [SECTION("projects", "Show projects")],
    }),
  },
  {
    words: ["skills", "skill", "stack", "tech", "technologies", "tools", "languages", "frameworks", "programming"],
    reply: () => ({
      text:
        `Here's the stack at a glance:\n` +
        skills
          .slice(0, 5)
          .map((c) => `• ${titleCase(c.category)}: ${c.items.slice(0, 5).map((i) => i.name).join(", ")}`)
          .join("\n") +
        `\n\nAsk "does ${firstName} use Python?" to check a specific tool.`,
      actions: [SECTION("skills", "Open tech stack")],
    }),
  },
  {
    words: ["education", "study", "studying", "studies", "university", "degree", "sliit", "school", "college", "ananda", "a/l", "o/l", "campus"],
    reply: () => ({
      text: education.map((e) => `• ${e.degree}\n  ${e.institution} · ${e.period}`).join("\n"),
      actions: [SECTION("experience", "See academic journey")],
    }),
  },
  {
    words: ["intern", "internship", "internships", "job", "jobs", "hire", "hiring", "available", "availability", "experience", "recruit", "position", "opportunity"],
    reply: () => ({
      text:
        `Yes, ${firstName} is available for 2026 internships in Data Science, AI / ML or full-stack development.` +
        (experience[0]?.bullets.length ? `\n\n${experience[0].bullets.map((b) => `• ${b}`).join("\n")}` : ""),
      actions: [SECTION("contact", "Get in touch"), { label: "Resume", href: personalInfo.resumeLink }],
    }),
  },
  {
    words: ["achievements", "achievement", "award", "awards", "competition", "competitions", "hackathon", "hackathons", "won", "nasa", "tensorforge"],
    reply: () =>
      achievements.length
        ? {
            text: achievements.map((a) => `• ${a.title} — ${a.result}${a.date ? ` (${a.date})` : ""}`).join("\n"),
            actions: [SECTION("achievements", "Show achievements")],
          }
        : { text: "No competition results are listed yet." },
  },
  {
    words: ["certificate", "certificates", "certification", "certifications", "course", "courses", "coursera", "certified"],
    reply: () => ({
      text: certifications.map((c) => `• ${c.title}`).join("\n"),
      actions: [SECTION("certifications", "Show certifications")],
    }),
  },
  {
    words: ["contact", "email", "mail", "reach", "message", "connect", "linkedin", "github", "talk", "touch", "whatsapp", "whats app", "phone", "mobile", "number", "mobile number", "phone number", "whatsapp number", "whats app number"],
    reply: () => ({
      text: `The quickest way is email: ${personalInfo.email}\nWhatsApp: 0706827870 (${personalInfo.whatsappNumber}).\nYou can also find ${firstName} on LinkedIn and GitHub.`,
      actions: [
        { label: "Email", href: `mailto:${personalInfo.email}` },
        { label: "WhatsApp", href: `https://wa.me/${personalInfo.whatsappNumber.replace(/\D/g, "")}` },
        { label: "LinkedIn", href: personalInfo.linkedin },
        { label: "GitHub", href: personalInfo.github },
      ],
    }),
  },
  {
    words: ["resume", "cv"],
    reply: () => ({ text: `Here's ${firstName}'s resume (PDF).`, actions: [{ label: "Open resume", href: personalInfo.resumeLink }] }),
  },
  {
    words: ["where", "location", "based", "country", "remote", "relocate"],
    reply: () => ({ text: `${firstName} is based in ${personalInfo.location} and is happy to work remotely.` }),
  },
  {
    words: ["who", "about", "introduce", "bio", "background", "venuja"],
    reply: () => ({ text: personalInfo.heroBio, actions: [SECTION("about", "Read more")] }),
  },
];

const SUGGEST = `Try asking about projects, skills, education, achievements, internships or how to get in touch.`;

const OUT_OF_SCOPE: VeeReply = {
  text: "I can only answer questions about Venuja and this portfolio website. Please ask about his projects, skills, education, experience, achievements, certifications, resume or contact details.",
};

/** Accept complete portfolio questions, never an incidental keyword in arbitrary text. */
function portfolioQuery(q: string): string | null {
  const owner = norm(firstName);
  const subjects = [owner, norm(personalInfo.name), "he", "this website", "this site", "this portfolio"];
  const topics = new Set([
    ...intents.flatMap((intent) => intent.words),
    "contact details", "work experience", "tech stack", "academic journey",
    "social links", "featured projects", "minor projects", "his projects", "his skills",
    ...projectKeys.flatMap(({ keys }) => keys),
    ...allSkills.map(({ name }) => norm(name)),
  ]);
  const clean = q.replace(/[.!]+$/g, "").replace(/^please /, "").replace(/ please$/, "");
  if (topics.has(clean)) return clean;

  // Each template must consume the entire message, including the requested topic.
  const requested = clean
    .replace(/^(?:can you |could you )?(?:tell me about|show me|show|list|describe|explain|give me|what are|what is) /, "")
    .replace(/^(?:the |his )/, "")
    .replace(new RegExp("^(?:" + esc(owner) + "s|your) "), "")
    .replace(/ (?:on this (?:website|site|portfolio)|in this portfolio)$/, "");
  if (requested !== clean && topics.has(requested)) return requested;

  for (const subject of subjects) {
    const name = esc(subject);
    if (new RegExp("^(?:who is|tell me about|introduce) " + name + "$").test(clean)) return "about";
    if (new RegExp("^where (?:is " + name + "(?: based| located| from)?|does " + name + " live)$").test(clean)) return "location";
    if (new RegExp("^(?:how (?:can|do) i (?:contact|reach|hire)|can i (?:contact|hire)) " + name + "$").test(clean)) return "contact";
    if (new RegExp("^is " + name + " (?:available|looking)(?: for)?(?: an?)? (?:internship|internships|work|job|jobs)$").test(clean)) return "internships";
    if (new RegExp("^(?:what (?:has " + name + " (?:built|made)|does " + name + " do))$").test(clean)) return "projects";
    if (new RegExp("^(?:where does " + name + " study|what (?:is " + name + " studying|did " + name + " study))$").test(clean)) return "education";
    const skillMatch = clean.match(new RegExp("^(?:does|can) " + name + " (?:use|know|work with|code in) (.+)$"));
    if (skillMatch && allSkills.some(({ name: skill }) => norm(skill) === skillMatch[1])) return skillMatch[1];
    const topicMatch = clean.match(new RegExp("^what (?:are|is) " + name + "s (.+)$"));
    if (topicMatch && topics.has(topicMatch[1])) return topicMatch[1];
  }
  return null;
}

// ── main entry ───────────────────────────────────────────
export function veeReply(raw: string): VeeReply {
  let q = norm(raw);
  if (!q) return { text: SUGGEST };

  // Small talk
  if (/^(hi|hey|hello|hiya|yo|sup|good (morning|afternoon|evening))[.!]*$/.test(q)) {
    return { text: `Hi! I'm Vee, ${firstName}'s portfolio guide. ${SUGGEST}`, mood: "happy" };
  }
  if (/^(thanks|thank you|thx|cool|nice|great|awesome)[.!]*$/.test(q)) {
    return { text: "Happy to help! Anything else you'd like to know?", mood: "happy" };
  }
  if (/^(bye|goodbye|cya|later)[.!]*$/.test(q)) {
    return { text: "Bye for now! Click me any time you want to chat again.", mood: "happy" };
  }
  if (/^(?:(who|what) are you|are you (an? )?(ai|bot|robot|human|real)|what is your name|your name)[.!]*$/.test(q)) {
    return {
      text: `I'm Vee, a small scripted guide for this site — not an AI. I answer from what's written on ${firstName}'s portfolio, so I won't make things up.`,
    };
  }

  const scoped = portfolioQuery(q);
  if (!scoped) return OUT_OF_SCOPE;
  q = scoped;

  // A specific project by name
  const project = findProject(q);
  if (project) {
    const links: VeeAction[] = [];
    if (project.live) links.push({ label: "Live site", href: project.live });
    links.push({ label: "Code", href: project.github });
    return {
      text: `${shortTitle(project.title)}: ${project.description}\n\nBuilt with ${project.tags.slice(0, 6).join(", ")}.`,
      actions: links,
    };
  }

  // A specific skill or tool ("does Venuja use React?")
  const skill = allSkills.find((s) => s.name.length > 1 && mentions(q, s.name));
  if (skill) {
    const used = allProjects.filter((p) => p.tags.some((t) => norm(t).includes(norm(skill.name))));
    return {
      text:
        `Yes — ${skill.name} is part of ${firstName}'s ${skill.category} stack.` +
        (used.length ? `\nUsed in: ${used.slice(0, 4).map((p) => shortTitle(p.title)).join(", ")}.` : ""),
      actions: [SECTION("skills", "Open tech stack")],
    };
  }

  // Best-matching topic
  let best: (typeof intents)[number] | null = null;
  let bestScore = 0;
  for (const intent of intents) {
    const score = countOf(q, intent.words);
    if (score > bestScore) {
      best = intent;
      bestScore = score;
    }
  }
  if (best) return best.reply();

  return { text: `I'm not sure about that one — I only know what's on this site. ${SUGGEST}` };
}

/** Quick-reply chips; the first one follows the section on screen */
const SECTION_CHIP: Record<string, string> = {
  about: "Who is Venuja?",
  projects: "Projects",
  skills: "Tech stack",
  experience: "Internships",
  achievements: "Achievements",
  certifications: "Certifications",
  contact: "Contact",
};
const BASE_CHIPS = ["Projects", "Tech stack", "Internships", "Achievements", "Education", "Resume"];

export function veeChips(section: string): string[] {
  const lead = SECTION_CHIP[section];
  const chips = lead ? [lead, ...BASE_CHIPS.filter((c) => c !== lead)] : BASE_CHIPS;
  return chips.slice(0, 5);
}
