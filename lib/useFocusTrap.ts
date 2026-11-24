"use client";
import { useEffect, type RefObject } from "react";

export function useFocusTrap(ref: RefObject<HTMLElement | null>, enabled: boolean, restore = true) {
  useEffect(() => {
    const root = ref.current;
    if (!enabled || !root) return;
    const previous = document.activeElement as HTMLElement | null;
    const targets = () => [...root.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex="0"]')].filter(node => node.getClientRects().length > 0);
    const frame = requestAnimationFrame(() => (targets()[0] || root).focus());
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const nodes = targets(), first = nodes[0], last = nodes.at(-1);
      if (!first) { event.preventDefault(); root.focus(); }
      else if (event.shiftKey && (document.activeElement === first || !root.contains(document.activeElement))) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || !root.contains(document.activeElement))) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => { cancelAnimationFrame(frame); document.removeEventListener("keydown", onKey); if (restore && previous?.isConnected) previous.focus({ preventScroll: true }); };
  }, [enabled, ref, restore]);
}
