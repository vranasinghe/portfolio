"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";

// ─── Timing ────────────────────────────────────────────────
const LOAD = 4500;   // ms: wander → constellation forms → counter reaches 100% (~5 s total with SETTLE)
const SETTLE = 500;  // ms: hold on the finished constellation before the exit
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

// Status line under the bar, keyed to progress
const STATUS: [number, string][] = [
  [0.3, "Mapping the network"],
  [0.6, "Training the model"],
  [0.9, "Composing the interface"],
  [1.01, "Ready to explore"],
];
const SEGMENTS = 5;

interface Node {
  x: number;  // current
  y: number;
  wx: number; // wander position
  wy: number;
  vx: number; // wander velocity (px per ms)
  vy: number;
  tx: number; // target on the VR letterforms
  ty: number;
  delay: number; // 0–0.35, staggers the convergence
  phase: number; // idle shimmer offset
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Sample points every `step` px along a polyline, with a little perpendicular jitter. */
function samplePath(pts: [number, number][], step: number, jitter: number) {
  const out: [number, number][] = [];
  let carry = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    const len = Math.hypot(x1 - x0, y1 - y0);
    if (len === 0) continue;
    const nx = -(y1 - y0) / len;
    const ny = (x1 - x0) / len;
    for (let d = carry; d <= len; d += step) {
      const t = d / len;
      const j = (Math.random() * 2 - 1) * jitter;
      out.push([x0 + (x1 - x0) * t + nx * j, y0 + (y1 - y0) * t + ny * j]);
    }
    carry = step - ((len - carry) % step);
  }
  return out;
}

/** Stroke skeleton of the "VR" monogram inside a box (x, y, w, h). */
function monogram(x: number, y: number, w: number, h: number): [number, number][][] {
  const v: [number, number][] = [[x, y], [x + w * 0.22, y + h], [x + w * 0.44, y]];
  const sx = x + w * 0.54;
  const stem: [number, number][] = [[sx, y + h], [sx, y]];
  const bowl: [number, number][] = [[sx, y]];
  const cx = sx + w * 0.2;
  const rx = w * 0.2;
  const ry = h * 0.25;
  for (let a = -90; a <= 90; a += 12) {
    const r = (a * Math.PI) / 180;
    bowl.push([cx + Math.cos(r) * rx, y + ry + Math.sin(r) * ry]);
  }
  bowl.push([sx, y + h * 0.5]);
  const leg: [number, number][] = [[sx + w * 0.16, y + h * 0.5], [x + w, y + h]];
  return [v, stem, bowl, leg];
}

export default function Preloader() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0); // 0–1
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  const phrases = personalInfo.typewriterPhrases;
  const phrase = phrases[Math.min(phrases.length - 1, Math.floor(progress * phrases.length))];
  const status = STATUS.find(([t]) => progress < t)?.[1] ?? STATUS[STATUS.length - 1][1];
  const pct = Math.round(progress * 100);

  // Lock scroll while the intro plays
  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const load = reduced ? 900 : LOAD;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let nodes: Node[] = [];
    let step = 26;
    let cx = 0;
    let cy = 0;
    let spreadX = 0;
    let spreadY = 0;

    const build = () => {
      W = canvas.width = Math.floor(window.innerWidth * dpr);
      H = canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      // A zero-size window (hidden tab, background preview, mid-resize) has
      // nothing to draw; the resize listener rebuilds once a real size exists.
      if (W <= 0 || H <= 0) {
        nodes = [];
        return;
      }

      // Monogram box: large, behind the name, a touch above centre
      const bw = Math.min(W * 0.8, H * 1.05, 960 * dpr);
      // Portrait screens get taller letters so the monogram still frames the name
      const bh = Math.min(bw * (W < H ? 1.2 : 0.62), H * 0.6);
      cx = W / 2;
      cy = H * 0.46;
      spreadX = bw * 0.7;
      spreadY = bh * 0.85;
      step = Math.max(16 * dpr, bw / 34);

      const spine = monogram(cx - bw / 2, cy - bh / 2, bw, bh).flatMap((p) =>
        samplePath(p, step, step * 0.32)
      );
      // Satellites beside the strokes turn a dotted line into clustered constellation chains
      const targets: [number, number][] = [];
      for (const [x, y] of spine) {
        targets.push([x, y]);
        if (Math.random() < 0.5) {
          const a = Math.random() * Math.PI * 2;
          const r = step * (0.45 + Math.random() * 0.4);
          targets.push([x + Math.cos(a) * r, y + Math.sin(a) * r]);
        }
      }

      nodes = targets.map(([tx, ty]) => {
        // Start scattered inside a soft ellipse around the centre
        const a = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random());
        const wx = cx + Math.cos(a) * r * spreadX;
        const wy = cy + Math.sin(a) * r * spreadY;
        const sp = (0.02 + Math.random() * 0.05) * dpr;
        const va = Math.random() * Math.PI * 2;
        return {
          x: reduced ? tx : wx,
          y: reduced ? ty : wy,
          wx,
          wy,
          vx: Math.cos(va) * sp,
          vy: Math.sin(va) * sp,
          tx,
          ty,
          delay: Math.random() * 0.35,
          phase: Math.random() * Math.PI * 2,
        };
      });
    };

    build();
    window.addEventListener("resize", build);

    const start = performance.now();
    let prev = start;
    let raf = 0;
    let lastPct = -1;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      window.setTimeout(() => setDone(true), SETTLE);
    };
    // Safety net: never trap the visitor if animation frames are paused
    const fallback = window.setTimeout(() => setDone(true), load + SETTLE + 2500);

    const loop = (now: number) => {
      const dt = Math.min(48, now - prev);
      prev = now;
      const p = clamp01((now - start) / load);
      // Counter eases out so it settles into 100% instead of slamming into it
      const shown = 1 - Math.pow(1 - p, 1.6);
      const pctNow = Math.round(shown * 100);
      if (pctNow !== lastPct) {
        lastPct = pctNow;
        setProgress(shown);
      }

      // Convergence window: 25% → 80% of the load
      const m = reduced ? 1 : clamp01((p - 0.25) / 0.55);
      const linkDist = (reduced ? step * 1.75 : step * 1.75 + (1 - easeInOutCubic(m)) * step * 3.4);

      ctx.clearRect(0, 0, W, H);

      for (const n of nodes) {
        if (!reduced) {
          // Wander inside the ellipse, bouncing softly off its edge
          n.wx += n.vx * dt;
          n.wy += n.vy * dt;
          const ex = (n.wx - cx) / spreadX;
          const ey = (n.wy - cy) / spreadY;
          if (ex * ex + ey * ey > 1) {
            n.vx = -n.vx;
            n.vy = -n.vy;
          }
          const local = easeInOutCubic(clamp01((m - n.delay) / (1 - n.delay)));
          const shimmer = local * Math.sin(now / 520 + n.phase) * 0.6 * dpr;
          n.x = n.wx + (n.tx - n.wx) * local + shimmer;
          n.y = n.wy + (n.ty - n.wy) * local + shimmer;
        }
      }

      // Links: fade with distance
      ctx.lineWidth = dpr;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (Math.abs(dx) > linkDist || Math.abs(dy) > linkDist) continue;
          const d = Math.hypot(dx, dy);
          if (d > linkDist) continue;
          ctx.strokeStyle = `rgba(107,147,255,${0.12 + (1 - d / linkDist) * 0.5})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Nodes: soft halo + bright core
      for (const n of nodes) {
        ctx.fillStyle = "rgba(31,86,240,0.28)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, 4.5 * dpr, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#9db8ff";
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.8 * dpr, 0, Math.PI * 2);
        ctx.fill();
      }

      if (p >= 1) finish();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(fallback);
      window.removeEventListener("resize", build);
    };
  }, []);

  const [firstName, ...rest] = personalInfo.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] overflow-hidden bg-[#04060b] text-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          {/* Faint blueprint grid, fading out toward the edges */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              maskImage: "radial-gradient(ellipse at 50% 46%, #000 25%, transparent 72%)",
              WebkitMaskImage: "radial-gradient(ellipse at 50% 46%, #000 25%, transparent 72%)",
            }}
          />
          {/* Blue core glow */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 55% 45% at 50% 46%, rgba(31,86,240,0.20), transparent 70%)" }}
          />

          {/* Constellation: drifting nodes that converge into the VR monogram */}
          <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />

          {/* Name + rotating line */}
          <div className="absolute inset-x-0 top-[46%] -translate-y-1/2 flex flex-col items-center px-4 text-center">
            <p
              aria-hidden="true"
              className="font-black uppercase leading-[0.9] tracking-[-0.03em] text-[clamp(2.4rem,9.5vw,6.4rem)]"
            >
              <span className="block overflow-hidden pb-[0.04em]">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.15 }}
                >
                  {firstName}
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  // Same outline treatment as the hero surname: fill with the background, stroke underneath
                  style={{ color: "#04060b", WebkitTextStroke: "4px #6b93ff", paintOrder: "stroke fill" }}
                  initial={reduce ? false : { y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.28 }}
                >
                  {lastName}.
                </motion.span>
              </span>
            </p>

            <div className="relative mt-5 h-6 w-full max-w-md overflow-hidden" aria-hidden="true">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={phrase}
                  className="absolute inset-0 text-[0.95rem] text-white/70"
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.28, ease: EASE_OUT }}
                >
                  {phrase}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Status, counter and segmented progress */}
          <div
            className="absolute bottom-[7vh] left-1/2 w-[min(560px,86vw)] -translate-x-1/2"
            role="progressbar"
            aria-label="Loading portfolio"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
          >
            <div className="mb-2.5 flex items-baseline justify-between font-label text-[0.7rem] uppercase tracking-[0.18em] text-white/55">
              <span>{status}</span>
              <span className="text-white/85">{String(pct).padStart(3, "0")}%</span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {Array.from({ length: SEGMENTS }).map((_, i) => (
                <div key={i} className="h-[3px] bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#1f56f0] to-[#6b93ff]"
                    style={{ width: `${clamp01(progress * SEGMENTS - i) * 100}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
