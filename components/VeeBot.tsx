"use client";

import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { veeChips, veeReply, type VeeAction } from "@/lib/veeBrain";
import { SECTIONS } from "@/lib/sections";

type Msg = { id: number; from: "vee" | "you"; text: string; actions?: VeeAction[] };

const SLEEP_AFTER = 30000; // ms of no attention (chat closed) before Vee dozes off
const INTRO_DELAY = 13000; // ms after load (the opening loader runs ~10 s) before the one-time hello
const INTRO_KEY = "vee-intro-seen";
const GREETING: Msg = {
  id: 0,
  from: "vee",
  text: "Hi, I'm Vee — Venuja's portfolio guide. Ask me about projects, skills, education, achievements or internships, or tap a suggestion below.",
};

// ── Colour themes: Vee reads the colour behind him and picks the one that stands out ──
type Theme = "blue" | "ink" | "ice";
const THEME_BODY: Record<Theme, [number, number, number]> = {
  blue: [31, 86, 240],
  ink: [11, 18, 34],
  ice: [238, 243, 255],
};
const dist = (a: [number, number, number], b: [number, number, number]) =>
  Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

/** The first solid background colour found under (x, y), ignoring Vee himself */
function backgroundAt(x: number, y: number, skip: HTMLElement | null): [number, number, number] {
  for (const el of document.elementsFromPoint(x, y)) {
    if (skip?.contains(el)) continue;
    const m = getComputedStyle(el).backgroundColor.match(/rgba?\(([^)]+)\)/);
    if (!m) continue;
    const [r, g, b, a = 1] = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
    if (a >= 0.9) return [r, g, b];
  }
  return [251, 252, 254];
}

/** Ice on dark, navy and black backgrounds, ink on mid blues, blue on light ones */
function pickTheme(bg: [number, number, number]): Theme {
  const lum = (0.2126 * bg[0] + 0.7152 * bg[1] + 0.0722 * bg[2]) / 255;
  if (lum < 0.3) return "ice";
  return dist(THEME_BODY.blue, bg) < 130 ? "ink" : "blue";
}

type Act = "hop" | "wink" | "wave" | "dance" | "look" | "cheer";
const IDLE_ACTS: Act[] = ["wink", "look", "wave", "dance", "hop", "wink", "look"];

/**
 * Vee: a glossy, softly-shaded hover-bot (ice / blue / ink themes). Head and torso
 * are bevelled (rim + lit inner face), the visor eyes follow the pointer, the chest
 * screen types "///_" while awake, the antenna sends out signal rings and the cone
 * thruster glows over a pool of light. Colours come from CSS variables set by
 * `.vee[data-theme]`, so he re-colours himself to stay visible.
 */
const HEAD = "M40 25 H80 Q83 25 86 28 L94 35 Q96 37 96 40 V66 Q96 69 93 72 L86 78 Q84 80 80 80 H40 Q36 80 33 77 L26 71 Q24 69 24 66 V40 Q24 37 26 35 L35 27 Q37 25 40 25 Z";
const TORSO = "M44 83 H76 L82 88 Q83 89 83 92 V105 L76 113 Q75 114 72 114 H48 Q45 114 44 112 L37 105 V91 Q37 89 39 87 Z";

function Grad({ id, a, b, x2 = 0, y2 = 1 }: { id: string; a: string; b: string; x2?: number; y2?: number }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2={x2} y2={y2}>
      <stop offset="0" className="vee-stop" style={{ stopColor: `var(${a})` }} />
      <stop offset="1" className="vee-stop" style={{ stopColor: `var(${b})` }} />
    </linearGradient>
  );
}

function VeeFigure() {
  return (
    <svg viewBox="5 -1 110 149" className="block h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <Grad id="vee-g-rim" a="--vee-rim-a" b="--vee-rim-b" />
        <Grad id="vee-g-body" a="--vee-body" b="--vee-body-2" />
        <Grad id="vee-g-arm" a="--vee-arm" b="--vee-arm-2" x2={1} y2={0.4} />
        <Grad id="vee-g-hand" a="--vee-hand" b="--vee-hand-2" />
        <Grad id="vee-g-ear" a="--vee-trim" b="--vee-trim-2" />
        <Grad id="vee-g-cone" a="--vee-cone" b="--vee-cone-2" />
        <Grad id="vee-g-tip" a="--vee-tip-o" b="--vee-tip-i" />
        <linearGradient id="vee-g-visor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#010612" />
          <stop offset="1" stopColor="#0a1a3c" />
        </linearGradient>
        <radialGradient id="vee-g-pool" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" className="vee-stop" style={{ stopColor: "var(--vee-pool)" }} />
          <stop offset="1" className="vee-stop" style={{ stopColor: "var(--vee-shadow)" }} />
        </radialGradient>
      </defs>

      <ellipse className="vee-shadow" cx="60" cy="141" rx="30" ry="5.2" fill="url(#vee-g-pool)" />
      <ellipse className="vee-pool-core" cx="60" cy="141" rx="17" ry="2.6" />

      <g className="vee-hop">
        <g className="vee-float">
          {/* Thruster: neck block, light spot + glowing cone */}
          <path className="vee-neck" d="M45 112 H75 Q74 120 70 120 H50 Q46 120 45 112 Z" />
          <ellipse className="vee-spot" cx="60" cy="134" rx="13" ry="9" />
          <g className="vee-flame">
            <polygon className="vee-cone" points="50.5,120 69.5,120 60,136" strokeWidth="2" />
            <polygon points="54,121.5 66,121.5 60,131" fill="#ffffff" opacity="0.55" />
          </g>

          {/* Arms: shaded upper arm + glowing cuff, angled outwards */}
          <g className="vee-arm-l">
            <g transform="translate(0 2) rotate(24 36 86)">
              <rect className="vee-arm vee-stroke" x="30" y="84" width="12" height="19" rx="5" strokeWidth="2.5" strokeLinejoin="round" />
              <rect className="vee-hand vee-stroke" x="29" y="100" width="14" height="8" rx="3.5" strokeWidth="2.5" strokeLinejoin="round" />
              <rect x="31.5" y="85.5" width="3" height="12" rx="1.5" fill="#fff" opacity="0.55" />
            </g>
          </g>
          <g className="vee-arm-r">
            <g transform="translate(0 2) rotate(-24 84 86)">
              <rect className="vee-arm vee-stroke" x="78" y="84" width="12" height="19" rx="5" strokeWidth="2.5" strokeLinejoin="round" />
              <rect className="vee-hand vee-stroke" x="77" y="100" width="14" height="8" rx="3.5" strokeWidth="2.5" strokeLinejoin="round" />
              <rect x="79.5" y="85.5" width="3" height="12" rx="1.5" fill="#fff" opacity="0.55" />
            </g>
          </g>

          {/* Torso: bevelled rim + lit face, chest screen */}
          <path className="vee-neck" d="M48 77 H72 V85 H48 Z" />
          <path className="vee-rim vee-stroke" d={TORSO} strokeWidth="3" strokeLinejoin="round" />
          <path className="vee-inner" d={TORSO} transform="translate(60 95.5) scale(0.93) translate(-60 -96.5)" />
          <path d="M38.5 84 Q40 80 44 80 H76 Q80 80 81.5 84 Z" fill="#021030" opacity="0.16" />
          <rect x="42" y="89" width="36" height="18" rx="5" className="vee-lip" />
          <rect x="43" y="90" width="34" height="16" rx="4" fill="url(#vee-g-visor)" className="vee-visor" strokeWidth="1" strokeOpacity="0.6" />
          <g transform="translate(0 3)" className="vee-glyph vee-led-stroke" strokeWidth="2.2" fill="none" strokeLinecap="round">
            <path className="vee-slash" d="M49.5 98 L52 91" />
            <path className="vee-slash vee-slash--2" d="M54.5 98 L57 91" />
            <path className="vee-slash vee-slash--3" d="M59.5 98 L62 91" />
            <path className="vee-cursor" d="M64.5 98.5 H72" />
          </g>

          {/* Head: tilts toward you, droops when asleep */}
          <g className="vee-head">
            <rect className="vee-stem" x="58.8" y="12" width="2.4" height="14" />
            <circle className="vee-ring" cx="60" cy="8.5" r="5" fill="none" strokeWidth="1.4" />
            <circle className="vee-ring vee-ring--2" cx="60" cy="8.5" r="5" fill="none" strokeWidth="1.4" />
            <g className="vee-tip">
              <rect className="vee-tip-o vee-stroke" x="53.5" y="3" width="13" height="11" rx="3.5" strokeWidth="1.6" strokeLinejoin="round" />
              <rect x="55.2" y="4.1" width="9" height="2.1" rx="1" fill="#fff" opacity="0.7" />
            </g>
            <rect className="vee-trim vee-stroke" x="15" y="43" width="11" height="21" rx="5.5" strokeWidth="1.4" />
            <rect className="vee-slot" x="19.3" y="48" width="2.6" height="11" rx="1.3" />
            <rect className="vee-trim vee-stroke" x="94" y="43" width="11" height="21" rx="5.5" strokeWidth="1.4" />
            <rect className="vee-slot" x="98.1" y="48" width="2.6" height="11" rx="1.3" />
            <path className="vee-rim vee-stroke" d={HEAD} strokeWidth="3" strokeLinejoin="round" />
            <path className="vee-inner" d={HEAD} transform="translate(60 49.8) scale(0.945) translate(-60 -51)" />
            <path className="vee-hi" d="M33 39 L40 32 H47" strokeWidth="2.4" />
            <rect x="31" y="40" width="58" height="32" rx="9" fill="url(#vee-g-visor)" className="vee-visor" strokeWidth="1.8" />
            <path d="M28 36 L37 28 Q38 27 41 27 H81 L83 29 H40 Z" fill="#fff" opacity="0.48" />
            <g className="vee-eyes">
              <rect className="vee-eye vee-eye--l vee-led-fill" x="44" y="49" width="8" height="13" rx="2" style={{ transformOrigin: "48px 53px" }} />
              <rect className="vee-eye vee-eye--r vee-led-fill" x="68" y="49" width="8" height="13" rx="2" style={{ transformOrigin: "72px 53px" }} />
              <g className="vee-happy vee-led-stroke" strokeWidth="3" fill="none" strokeLinecap="round">
                <path d="M41 59 C43 50 52 50 55 59" />
                <path d="M65 59 C68 50 77 50 80 59" />
              </g>
              <g className="vee-think vee-led-fill">
                <circle cx="52" cy="53" r="2.4" />
                <circle cx="60" cy="53" r="2.4" />
                <circle cx="68" cy="53" r="2.4" />
              </g>
            </g>
          </g>

          {/* Little "pleased" sparks */}
          <g className="vee-sparks" stroke="var(--vee-glow)" strokeWidth="2.6" strokeLinecap="round">
            <path d="M104 26 L106 17" />
            <path d="M110 31 L118 27" />
            <path d="M108 40 L116 42" />
          </g>

          <text className="vee-z vee-z--1" x="96" y="24" fill="var(--vee-glow)" fontFamily="Inter, system-ui, sans-serif" fontSize="13" fontWeight="800">z</text>
          <text className="vee-z vee-z--2" x="103" y="14" fill="var(--vee-glow)" fontFamily="Inter, system-ui, sans-serif" fontSize="9.5" fontWeight="800">z</text>
        </g>
      </g>
    </svg>
  );
}

/** Tiny static Vee (ice) for the chat header */
function VeeMark() {
  return (
    <svg viewBox="12 18 96 66" className="h-9 w-11 shrink-0" aria-hidden="true">
      <defs>
        <linearGradient id="vee-m-rim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#a6bbe6" />
        </linearGradient>
        <linearGradient id="vee-m-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#d6e3fa" />
        </linearGradient>
        <linearGradient id="vee-m-ear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5ce6ff" />
          <stop offset="1" stopColor="#1fa0ff" />
        </linearGradient>
      </defs>
      <rect x="15" y="43" width="11" height="21" rx="5.5" fill="url(#vee-m-ear)" />
      <rect x="19.3" y="48" width="2.6" height="11" rx="1.3" fill="#eafcff" />
      <rect x="94" y="43" width="11" height="21" rx="5.5" fill="url(#vee-m-ear)" />
      <rect x="98.1" y="48" width="2.6" height="11" rx="1.3" fill="#eafcff" />
      <path d={HEAD} fill="url(#vee-m-rim)" />
      <path d={HEAD} fill="url(#vee-m-face)" transform="translate(60 49.8) scale(0.945) translate(-60 -51)" />
      <path d="M33 39 L40 32 H47" fill="none" stroke="#2f6bff" strokeWidth="2.4" strokeLinecap="round" />
      <rect x="31" y="40" width="58" height="32" rx="9" fill="#030a1c" stroke="#2f7bff" strokeWidth="1.8" />
      <rect x="44" y="49" width="8" height="13" rx="3.5" fill="#ffffff" />
      <rect x="68" y="49" width="8" height="13" rx="3.5" fill="#ffffff" />
    </svg>
  );
}

export default function VeeBot() {
  const [awake, setAwake] = useState(false);
  const [open, setOpen] = useState(false);
  const [happy, setHappy] = useState(false);
  const [booting, setBooting] = useState(false);
  const [peek, setPeek] = useState(false);
  const [intro, setIntro] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState<Theme>("blue");
  const [lift, setLift] = useState(0); // keeps Vee above the footer at the bottom of the page
  const [section, setSection] = useState("home");
  const [act, setAct] = useState<Act | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const botRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const sleepTimer = useRef<number | undefined>(undefined);
  const touched = useRef(false);
  const nextId = useRef(1);
  const panelId = useId();

  const flashHappy = useCallback((ms = 1300) => {
    setHappy(true);
    window.setTimeout(() => setHappy(false), ms);
  }, []);

  const actTimer = useRef<number | undefined>(undefined);
  const lastSection = useRef("home");
  const perform = useCallback((a: Act) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    window.clearTimeout(actTimer.current);
    setAct(null);
    requestAnimationFrame(() => {
      setAct(a);
      if (a === "look") {
        const el = rootRef.current;
        const set = (x: number, y = 0) => {
          el?.style.setProperty("--ex", `${x}px`);
          el?.style.setProperty("--ey", `${y}px`);
        };
        set(-4.5, -1);
        window.setTimeout(() => set(4.5, -1), 450);
        window.setTimeout(() => set(0, 1.5), 900);
        window.setTimeout(() => set(0, 0), 1300);
      }
      if (a === "cheer" || a === "dance") flashHappy(1200);
      actTimer.current = window.setTimeout(() => setAct(null), a === "look" ? 1400 : 1300);
    });
  }, [flashHappy]);

  const wake = useCallback(() => {
    setAwake(true);
    setPeek(false);
    setBooting(true);
    window.setTimeout(() => setBooting(false), 900);
    window.setTimeout(() => flashHappy(), 650);
  }, [flashHappy]);

  // Doze off after a while when nobody is paying attention
  const resetSleep = useCallback(() => {
    window.clearTimeout(sleepTimer.current);
    if (!open) sleepTimer.current = window.setTimeout(() => setAwake(false), SLEEP_AFTER);
  }, [open]);

  useEffect(() => {
    if (awake && !open) resetSleep();
    else window.clearTimeout(sleepTimer.current);
    return () => window.clearTimeout(sleepTimer.current);
  }, [awake, open, resetSleep]);

  // One short hello per visit, so first-time visitors notice Vee (skipped once they interact)
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(INTRO_KEY) === "1";
    } catch {
      /* storage unavailable: still show it once for this page view */
    }
    if (seen) return;
    let hideTimer: number | undefined;
    const showTimer = window.setTimeout(() => {
      if (touched.current) return;
      setIntro(true);
      try {
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {
        /* ignore */
      }
      hideTimer = window.setTimeout(() => setIntro(false), 7000);
    }, INTRO_DELAY);
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  // Playful idle: every few seconds Vee winks, looks around, waves, dances or hops
  useEffect(() => {
    if (!awake) return;
    let t = 0;
    const next = () => {
      t = window.setTimeout(() => {
        perform(IDLE_ACTS[Math.floor(Math.random() * IDLE_ACTS.length)]);
        next();
      }, 4500 + Math.random() * 4500);
    };
    next();
    return () => window.clearTimeout(t);
  }, [awake, perform]);

  // Hops to say hi when you scroll into a new section
  useEffect(() => {
    if (lastSection.current !== section && awake) perform("hop");
    lastSection.current = section;
  }, [section, awake, perform]);

  // Eyes follow the pointer while awake (mouse / pen only, not for reduced motion)
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!awake || !fine || reduce) {
      el.style.setProperty("--ex", "0px");
      el.style.setProperty("--ey", "0px");
      el.style.setProperty("--hr", "0deg");
      return;
    }
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = botRef.current?.getBoundingClientRect();
        if (!r) return;
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height * 0.45);
        const len = Math.hypot(dx, dy) || 1;
        const reach = Math.min(1, len / 240);
        el.style.setProperty("--ex", `${((dx / len) * 4 * reach).toFixed(2)}px`);
        el.style.setProperty("--ey", `${((dy / len) * 2.6 * reach).toFixed(2)}px`);
        el.style.setProperty("--hr", `${((dx / len) * 7 * reach).toFixed(2)}deg`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [awake]);

  // Track the section on screen (for the suggestion chips) and lift above the footer
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const footer = document.querySelector("#contact footer");
      const overlap = footer ? Math.max(0, window.innerHeight - footer.getBoundingClientRect().top) : 0;
      setLift(Math.round(overlap));
      const bot = botRef.current?.getBoundingClientRect();
      if (bot) setTheme(pickTheme(backgroundAt(bot.left + bot.width * 0.5, bot.top + bot.height * 0.45, rootRef.current)));
      let current = "home";
      for (const s of SECTIONS) {
        const node = document.getElementById(s.id);
        if (node && node.getBoundingClientRect().top < window.innerHeight * 0.45) current = s.id;
      }
      setSection(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    const poll = window.setInterval(update, 1500); // catches the loader ending, resizes and late layout
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearInterval(poll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Keep the newest message in view
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages, typing]);

  // Esc closes the chat and returns focus to Vee
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        botRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) inputRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const toggle = () => {
    touched.current = true;
    setIntro(false);
    if (!awake) wake();
    else perform("cheer");
    setOpen((o) => !o);
  };

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || typing) return;
    setMessages((m) => [...m, { id: nextId.current++, from: "you", text: q }]);
    setInput("");
    setTyping(true);
    try {
      const response = await fetch("/api/vee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q }),
        signal: AbortSignal.timeout(20000),
      });
      const reply = await response.json();
      if (typeof reply.text !== "string") throw new Error("Invalid reply");
      setMessages((m) => [...m, { id: nextId.current++, from: "vee", text: reply.text, actions: reply.actions }]);
      if (reply.mood === "happy") flashHappy();
    } catch {
      const reply = veeReply(q);
      setMessages((m) => [...m, { id: nextId.current++, from: "vee", text: reply.text, actions: reply.actions }]);
    } finally {
      setTyping(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const runAction = (a: VeeAction) => {
    if (a.href.startsWith("#")) {
      document.getElementById(a.href.slice(1))?.scrollIntoView({ behavior: "smooth" });
      if (window.innerWidth < 640) setOpen(false);
    }
  };

  const tip = awake ? "Ask me about Venuja" : "Wake me up to chat";

  return (
    <div
      ref={rootRef}
      className="vee pointer-events-none fixed right-3 z-[80] flex flex-col items-end gap-3 sm:right-6"
      style={{ bottom: 10 + lift }}
      data-state={awake ? "awake" : "asleep"}
      data-mood={happy ? "happy" : undefined}
      data-boot={booting ? "true" : undefined}
      data-peek={peek ? "true" : undefined}
      data-think={typing ? "true" : undefined}
      data-act={act ?? undefined}
      data-theme={theme}
    >
      {/* ── Chat panel ── */}
      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label="Chat with Vee, Venuja's portfolio guide"
          className="vee-panel pointer-events-auto flex w-[min(370px,calc(100vw-1.5rem))] flex-col border border-white/15 bg-[#04060b] text-white shadow-[0_28px_70px_-24px_rgba(31,86,240,0.6)]"
          style={{ maxHeight: `min(560px, calc(100svh - ${lift + 195}px))` }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
            <VeeMark />
            <div className="min-w-0 flex-1">
              <p className="text-[0.95rem] font-semibold leading-tight">Vee</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-[0.75rem] leading-tight text-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-[#34d399]" aria-hidden="true" />
                Portfolio guide · scripted, not an AI
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                botRef.current?.focus();
              }}
              aria-label="Close chat"
              className="grid h-8 w-8 place-items-center border border-white/15 text-white/70 transition-colors hover:border-white/60 hover:text-white"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={logRef} role="log" aria-live="polite" className="flex min-h-[180px] flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
            {messages.map((m) => (
              <div key={m.id} className={m.from === "you" ? "flex justify-end" : "flex flex-col items-start gap-2"}>
                <p
                  className={`max-w-[88%] whitespace-pre-line px-3.5 py-2.5 text-[0.9rem] leading-relaxed ${
                    m.from === "you" ? "bg-[#1f56f0] text-white" : "border border-white/10 bg-white/[0.04] text-white/90"
                  }`}
                >
                  {m.text}
                </p>
                {m.actions && (
                  <div className="flex flex-wrap gap-2">
                    {m.actions.map((a) =>
                      a.href.startsWith("#") ? (
                        <button
                          key={a.label}
                          type="button"
                          onClick={() => runAction(a)}
                          className="border border-[#6b93ff]/50 px-3 py-1.5 text-[0.8rem] font-semibold text-[#9db8ff] transition-colors hover:border-[#6b93ff] hover:bg-[#1f56f0] hover:text-white"
                        >
                          {a.label} <span aria-hidden="true">↓</span>
                        </button>
                      ) : (
                        <a
                          key={a.label}
                          href={a.href}
                          target={a.href.startsWith("mailto:") ? undefined : "_blank"}
                          rel="noopener noreferrer"
                          className="border border-[#6b93ff]/50 px-3 py-1.5 text-[0.8rem] font-semibold text-[#9db8ff] transition-colors hover:border-[#6b93ff] hover:bg-[#1f56f0] hover:text-white"
                        >
                          {a.label} <span className="arrow-nudge" aria-hidden="true">↗</span>
                        </a>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <p className="vee-typing flex w-fit gap-1.5 border border-white/10 bg-white/[0.04] px-3.5 py-3" aria-label="Vee is typing">
                <span /> <span /> <span />
              </p>
            )}
          </div>

          {/* Suggestions + input */}
          <div className="border-t border-white/10 px-4 pb-4 pt-3">
            <div className="mb-3 flex flex-wrap gap-1.5">
              {veeChips(section).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => send(c)}
                  disabled={typing}

                  className="border border-white/15 px-2.5 py-1 text-[0.78rem] font-medium text-white/80 transition-colors hover:border-white/60 hover:text-white disabled:opacity-50"
                >
                  {c}
                </button>
              ))}
            </div>
            <form onSubmit={onSubmit} className="flex gap-2">
              <label htmlFor={`${panelId}-q`} className="sr-only">
                Ask Vee a question
              </label>
              <input
                ref={inputRef}
                id={`${panelId}-q`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, skills…"
                autoComplete="off"
                maxLength={160}
                className="min-w-0 flex-1 border border-white/15 bg-transparent px-3 py-2.5 text-[0.9rem] text-white placeholder:text-white/40 focus:border-[#6b93ff] focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                aria-label="Send"
                className="grid w-11 place-items-center bg-[#1f56f0] text-white transition-colors hover:bg-[#6b93ff] disabled:opacity-40"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── Vee ── */}
      <div className="group relative">
        {/* One-time hello, or a hover / focus tip */}
        {!open && (
          <span
            className={`vee-bubble pointer-events-none absolute bottom-[62%] right-[88%] whitespace-nowrap border border-white/15 bg-[#04060b]/95 px-3.5 py-2 text-[0.82rem] font-medium text-white shadow-[0_12px_30px_-12px_rgba(31,86,240,0.7)] transition-opacity duration-200 ${
              intro ? "vee-bubble--intro opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
            }`}
            aria-hidden="true"
          >
            {intro ? "Hi, I'm Vee — ask me about Venuja" : tip}
          </span>
        )}
        <button
          ref={botRef}
          type="button"
          onClick={toggle}
          onPointerEnter={() => {
            touched.current = true;
            if (!awake) setPeek(true);
            else {
              resetSleep();
              perform("wave");
            }
          }}
          onPointerLeave={() => setPeek(false)}
          aria-expanded={open}
          aria-controls={open ? panelId : undefined}
          aria-label={open ? "Close chat with Vee" : awake ? "Chat with Vee, Venuja's portfolio guide" : "Wake up Vee, Venuja's portfolio guide, to chat"}
          className="vee-body pointer-events-auto block h-[92px] w-[69px] sm:h-[112px] sm:w-[84px]"
        >
          <VeeFigure />
        </button>
      </div>
    </div>
  );
}

