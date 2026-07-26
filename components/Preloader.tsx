"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Config ────────────────────────────────────────────────
const INITIALS = "VR";
const NAME = "Venuja Ranasinghe";
const DURATION = 2600; // ms — particle convergence + count to 100%
const SETTLE = 550;    // ms — hold on the formed monogram before fade

// Dark navy blue palette
const COLORS = ["#1a3a8f", "#1D4ED8", "#1e3a6e", "#0f2d6b"];

interface Particle {
  hx: number;
  hy: number;
  tx: number;
  ty: number;
  x: number;
  y: number;
  c: string;
  r: number;
  delay: number;
}

export default function Preloader() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Lock scroll while the intro plays
  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduce ? 900 : DURATION;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let particles: Particle[] = [];

    // Rasterize initials to an offscreen canvas, then sample a dot grid over it.
    const buildTargets = () => {
      W = canvas.width = Math.floor(window.innerWidth * dpr);
      H = canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";

      const off = document.createElement("canvas");
      off.width = W;
      off.height = H;
      const octx = off.getContext("2d");
      if (!octx) return;

      // Medium size gives enough pixels to sample for clean letterforms
      const fontSize = Math.min(W, H) * 0.15;
      octx.fillStyle = "#fff";
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.font = `800 ${fontSize}px Inter, system-ui, sans-serif`;
      // Position initials slightly above center
      octx.fillText(INITIALS, W / 2, H * 0.50);

      const data = octx.getImageData(0, 0, W, H).data;
      // Fixed small gap so dot grid is dense — dots fill most of each cell
      // giving clean round shapes instead of pixelated sparse dots
      const gap = Math.round(4 * dpr);
      const r = gap * 0.44; // nearly touching = solid, clean letterform
      const targets: { x: number; y: number }[] = [];
      for (let y = 0; y < H; y += gap) {
        for (let x = 0; x < W; x += gap) {
          if (data[(y * W + x) * 4 + 3] > 128) targets.push({ x, y });
        }
      }

      particles = targets.map((t) => {
        const hx = Math.random() * W;
        const hy = Math.random() * H;
        return {
          hx,
          hy,
          tx: t.x,
          ty: t.y,
          x: hx,
          y: hy,
          c: COLORS[(Math.random() * COLORS.length) | 0],
          r,
          delay: Math.random() * 0.4,
        };
      });
    };

    buildTargets();
    if (document.fonts?.ready) document.fonts.ready.then(buildTargets);
    window.addEventListener("resize", buildTargets);

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const start = performance.now();
    let raf = 0;
    let last = -1;

    const loop = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const pct = Math.round(p * 100);
      if (pct !== last) {
        last = pct;
        setProgress(pct);
      }

      ctx.clearRect(0, 0, W, H);
      ctx.shadowColor = "#1D4ED8";
      for (const pt of particles) {
        const local = Math.min(1, Math.max(0, (p - pt.delay) / (1 - pt.delay)));
        const e = easeOutCubic(local);
        pt.x = pt.hx + (pt.tx - pt.hx) * e;
        pt.y = pt.hy + (pt.ty - pt.hy) * e;

        ctx.globalAlpha = 0.2 + e * 0.8;
        ctx.shadowBlur = 5 * dpr * e;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
        ctx.fillStyle = pt.c;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      if (p < 1) {
        raf = requestAnimationFrame(loop);
      } else {
        window.setTimeout(() => setDone(true), SETTLE);
      }
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", buildTargets);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at 50% 42%, #061a2e 0%, #04111e 45%, #02080f 100%)",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {/* Particle dot-matrix monogram */}
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

          {/* Name + loading counter — pinned at very bottom like reference image */}
          <motion.div
            className="absolute left-1/2 top-[60%] flex -translate-x-1/2 flex-col items-center gap-1.5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            <h1 className="text-sm font-semibold tracking-wide text-white/90">
              {NAME}
            </h1>

            {/* Slim progress track */}
            <div className="h-[1.5px] w-24 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full transition-[width] duration-150 ease-out"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(to right, #1D4ED8, #3B82F6)",
                }}
              />
            </div>

            <p className="font-mono text-[10px] tracking-[0.3em] text-white/30">
              LOADING <span className="text-[#3B82F6]">{progress}%</span>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
