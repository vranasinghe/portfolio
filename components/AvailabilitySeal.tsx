"use client";

import { motion, useReducedMotion } from "framer-motion";

// Text set around the ring. Ends with a separator so the loop joins seamlessly.
const RING_TEXT = "OPEN TO INTERNSHIPS • 2026 • DATA SCIENCE • AI / ML • ";
const RING_R = 74;
const RING_LEN = 2 * Math.PI * RING_R;

/** Small four-point star, like the dividers on a printed stamp. */
function Star({ x, y, s = 5 }: { x: number; y: number; s?: number }) {
  return (
    <path
      d={`M${x} ${y - s} L${x + s * 0.32} ${y - s * 0.32} L${x + s} ${y} L${x + s * 0.32} ${y + s * 0.32} L${x} ${y + s} L${x - s * 0.32} ${y + s * 0.32} L${x - s} ${y} L${x - s * 0.32} ${y - s * 0.32} Z`}
      fill="currentColor"
    />
  );
}

/**
 * Coaster-style "Open to internships" seal. The lettered ring turns slowly
 * while the VR centre stays upright; it lands like a rubber stamp when the
 * contact section scrolls into view. Decorative, so hidden from screen readers
 * (the same availability is stated in text in the hero and contact copy).
 */
export default function AvailabilitySeal({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      // Ink colour comes from the caller's text colour (the SVG uses currentColor)
      className={`pointer-events-none select-none ${className}`}
      initial={reduce ? false : { opacity: 0, scale: 1.55, rotate: -24 }}
      whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.9, delay: 0.25 }}
    >
      <svg viewBox="0 0 200 200" className="block h-full w-full overflow-visible">
        <defs>
          {/* Circle path the ring text follows (starts at the top, clockwise) */}
          <path
            id="seal-ring"
            d={`M100 ${100 - RING_R} a${RING_R} ${RING_R} 0 1 1 0 ${RING_R * 2} a${RING_R} ${RING_R} 0 1 1 0 ${-RING_R * 2}`}
          />
        </defs>

        {/* Rotating part: rings + lettering */}
        <g className="seal-spin" style={{ transformOrigin: "100px 100px" }}>
          <circle cx="100" cy="100" r="96" stroke="currentColor" strokeWidth="3" fill="none" />
          <circle cx="100" cy="100" r="89" stroke="currentColor" strokeWidth="1.2" fill="none" />
          <text
            fill="currentColor"
            fontFamily="Inter, system-ui, sans-serif"
            fontSize="14.5"
            fontWeight="800"
            letterSpacing="1.5"
          >
            <textPath href="#seal-ring" textLength={RING_LEN - 4} lengthAdjust="spacing">
              {RING_TEXT}
            </textPath>
          </text>
          <circle cx="100" cy="100" r="58" stroke="currentColor" strokeWidth="1.2" fill="none" />
        </g>

        {/* Upright centre */}
        <Star x={64} y={100} s={4.5} />
        <Star x={136} y={100} s={4.5} />
        <text
          x="100"
          y="108"
          textAnchor="middle"
          fill="currentColor"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="38"
          fontWeight="900"
          letterSpacing="-1.5"
        >
          VR
        </text>
        <text
          x="100"
          y="127"
          textAnchor="middle"
          fill="currentColor"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="2.6"
        >
          AVAILABLE
        </text>
      </svg>
    </motion.div>
  );
}
