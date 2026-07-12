"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = !mounted || resolvedTheme !== "light";
  const isDarkRef = useRef(isDark);
  isDarkRef.current = isDark;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // ── Generate stars ────────────────────────────────────────
    const starCount = Math.floor((width * height) / 3500);
    const stars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      // Bias toward smaller stars (realistic distribution)
      const rand = Math.random();
      let radius: number;
      if (rand < 0.70) {
        radius = Math.random() * 0.5 + 0.2;   // tiny  (70%)
      } else if (rand < 0.92) {
        radius = Math.random() * 0.6 + 0.6;   // small (22%)
      } else {
        radius = Math.random() * 0.8 + 1.1;   // medium (8%)
      }

      // Subtle drift — smaller stars move slightly faster for depth effect
      const speed = (0.02 + Math.random() * 0.13) * (1.4 - radius * 0.3);
      const angle = Math.random() * Math.PI * 2;

      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius,
        opacity: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.008 + 0.003,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    // ── Handle resize ─────────────────────────────────────────
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    let frame = 0;

    // ── Draw loop ─────────────────────────────────────────────
    const draw = () => {
      frame++;
      const dark = isDarkRef.current;

      // ── Background gradient (deep space in dark mode, soft sky in light) ──
      const grad = ctx.createRadialGradient(
        width * 0.5, height * 0.4, 0,
        width * 0.5, height * 0.4, Math.max(width, height) * 0.75
      );
      if (dark) {
        grad.addColorStop(0,   "#061a2e"); // centre — slightly lighter navy
        grad.addColorStop(0.4, "#04111e"); // mid
        grad.addColorStop(1,   "#02080f"); // edges — deep black-navy
      } else {
        grad.addColorStop(0,   "#f8fafc"); // centre — soft white
        grad.addColorStop(0.4, "#eef2f7"); // mid
        grad.addColorStop(1,   "#e5e9f0"); // edges — light slate
      }

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // ── Stars / dots ────────────────────────────────────────
      stars.forEach((star) => {
        // ── Drift movement with edge wrapping ──
        star.x += star.vx;
        star.y += star.vy;
        if (star.x < -2) star.x = width + 2;
        if (star.x > width + 2) star.x = -2;
        if (star.y < -2) star.y = height + 2;
        if (star.y > height + 2) star.y = -2;

        // Slow sine-wave twinkle
        const twinkle = Math.sin(frame * star.twinkleSpeed + star.twinkleOffset);
        const currentOpacity = star.opacity + twinkle * 0.18;
        const clampedOpacity = Math.max(0.05, Math.min(1, currentOpacity));

        const isBright = star.radius > 1.0;
        let color: string;
        if (dark) {
          // Slight blue-white tint for larger stars
          color = isBright
            ? `rgba(210, 230, 255, ${clampedOpacity})`
            : `rgba(255, 255, 255, ${clampedOpacity})`;
        } else {
          // Muted blue-gray dots, lower opacity so they read as a subtle texture on light backgrounds
          const lightOpacity = clampedOpacity * 0.5;
          color = isBright
            ? `rgba(96, 130, 200, ${lightOpacity})`
            : `rgba(100, 116, 139, ${lightOpacity})`;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;

        // Soft glow on brighter/larger stars (dark mode only)
        if (dark && isBright && clampedOpacity > 0.55) {
          ctx.shadowBlur = 4;
          ctx.shadowColor = "rgba(180, 210, 255, 0.6)";
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fill();
      });

      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
