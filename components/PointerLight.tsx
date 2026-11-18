"use client";

import { useEffect } from "react";

/**
 * Feeds the mouse position to `.spotlight` elements as --mx / --my, so the soft
 * glow and the lit edge inside a card follow the pointer. There is no custom
 * cursor: the normal system cursor is untouched. Mouse and pen only; nothing runs
 * on touch screens.
 */
export default function PointerLight() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let raf = 0;
    let event: PointerEvent | null = null;

    const apply = () => {
      raf = 0;
      const e = event;
      if (!e) return;
      const spot = (e.target as Element | null)?.closest<HTMLElement>(".spotlight");
      if (!spot) return;
      const r = spot.getBoundingClientRect();
      spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
      spot.style.setProperty("--my", `${e.clientY - r.top}px`);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      event = e;
      // One update per frame is plenty
      if (!raf) raf = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
