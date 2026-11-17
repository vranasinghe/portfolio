"use client";

import { useEffect, useRef } from "react";

const VIEW_W = 270;          // drawing is authored in a 270×46 box…
const VIEW_H = 46;
const SCALE = 1.4;           // …and rendered 1.4× larger
const TRAIN_W = VIEW_W * SCALE;
const TRAIN_H = VIEW_H * SCALE;
const SPEED = 90;            // px per second, so the crossing feels the same on every screen width

// The train drives left → right. Boxcars read DATA → MODEL → DEPLOY left to
// right, and the "VR" engine at the front (right) pulls them along.
const WAGON_W = 58;
const WAGONS = [
  { x: 4, label: "DATA" },
  { x: 74, label: "MODEL" },
  { x: 144, label: "DEPLOY" },
] as const;
const WHEELS = [16, 50, 86, 120, 156, 190, 224, 240, 256];

/**
 * A small labelled train riding along the top edge of the footer:
 * DATA → MODEL → DEPLOY, pulled by the "VR" engine — the owner's workflow.
 * Hovering pauses it and shows a plain-English caption. Decorative
 * (hidden from screen readers) and parked for reduced motion.
 */
export default function PipelineTrain() {
  const ref = useRef<HTMLDivElement>(null);

  // Keep a constant speed: the run length is the screen width plus the train itself
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const set = () => {
      el.style.setProperty("--train-duration", `${(window.innerWidth + TRAIN_W * 2) / SPEED}s`);
    };
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);

  return (
    // No overflow clipping here so the hover caption can rise above the train;
    // the contact section itself clips the train while it is off-screen.
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0" style={{ height: TRAIN_H + 6 }}>
      <div
        ref={ref}
        className="pipeline-train pointer-events-auto absolute bottom-0 left-0"
        style={{ width: TRAIN_W, ["--train-w" as string]: `${TRAIN_W}px` }}
      >
        {/* Hover caption, in plain words */}
        <span className="pipeline-caption absolute -top-1 left-0 -translate-y-full whitespace-nowrap bg-[#04060b] px-2.5 py-1 font-label text-[0.8rem] font-bold text-white">
          My workflow: collect data → train models → deploy apps
        </span>

        {/* "Smoke": data bits puffing from the chimney, trailing behind */}
        {[0, 0.55, 1.1].map((delay) => (
          <span key={delay} className="pipeline-puff" style={{ left: 245 * SCALE, animationDelay: `${delay}s` }} />
        ))}

        <svg width={TRAIN_W} height={TRAIN_H} viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} fill="none">
          {/* Boxcars with their labels */}
          {WAGONS.map(({ x, label }) => (
            <g key={label}>
              <rect x={x} y="20" width={WAGON_W} height="15" fill="#04060b" />
              <text
                x={x + WAGON_W / 2}
                y="30.6"
                textAnchor="middle"
                fill="#ffffff"
                fontFamily="Inter, system-ui, sans-serif"
                fontSize="7.6"
                fontWeight="800"
                letterSpacing="0.6"
              >
                {label}
              </text>
            </g>
          ))}

          {/* Arrow couplers: DATA → MODEL → DEPLOY → engine */}
          {[62, 132, 202].map((x) => (
            <g key={x} stroke="#ffffff" strokeWidth="1.6">
              <path d={`M${x + 1} 27.5 H${x + 10}`} />
              <path d={`M${x + 7} 24.8 L${x + 10} 27.5 L${x + 7} 30.2`} />
            </g>
          ))}

          {/* DATA cargo: a stacked database */}
          <rect x="18" y="4" width="30" height="4" fill="#ffffff" />
          <rect x="18" y="9.5" width="30" height="4" fill="#c3d4ff" />
          <rect x="18" y="15" width="30" height="4" fill="#ffffff" />

          {/* MODEL cargo: a tiny neural network */}
          <g stroke="#ffffff" strokeWidth="1">
            <path d="M90 8 L103 5 M90 8 L103 11 M90 8 L103 17 M90 16 L103 5 M90 16 L103 11 M90 16 L103 17 M103 5 L116 11 M103 11 L116 11 M103 17 L116 11" />
          </g>
          <rect x="88" y="6" width="4" height="4" fill="#04060b" />
          <rect x="88" y="14" width="4" height="4" fill="#04060b" />
          <rect x="101" y="3" width="4" height="4" fill="#ffffff" />
          <rect x="101" y="9" width="4" height="4" fill="#ffffff" />
          <rect x="101" y="15" width="4" height="4" fill="#ffffff" />
          <rect x="114" y="9" width="4" height="4" fill="#04060b" />

          {/* DEPLOY cargo: a live browser window with a check */}
          <rect x="158" y="2" width="30" height="17" fill="#ffffff" />
          <rect x="158" y="2" width="30" height="4.5" fill="#04060b" />
          <rect x="160.5" y="3.6" width="2" height="1.3" fill="#6b93ff" />
          <rect x="163.8" y="3.6" width="2" height="1.3" fill="#6b93ff" />
          <path d="M166 12.5 L170.5 16 L179 8.5" stroke="#1f56f0" strokeWidth="2.2" />

          {/* Engine (facing right) with the VR monogram */}
          <rect x="212" y="16" width="46" height="19" fill="#04060b" />
          <rect x="212" y="4" width="20" height="13" fill="#04060b" />
          <rect x="215" y="7" width="14" height="6" fill="#6b93ff" />
          <rect x="242" y="7" width="8" height="10" fill="#04060b" />
          <rect x="240" y="5.5" width="12" height="2.5" fill="#04060b" />
          <rect x="253" y="19" width="3" height="3" fill="#ffffff" />
          <path d="M258 35 L268 35 L258 26 Z" fill="#04060b" />
          <text
            x="234"
            y="30.2"
            textAnchor="middle"
            fill="#6b93ff"
            fontFamily="Inter, system-ui, sans-serif"
            fontSize="8"
            fontWeight="900"
          >
            VR
          </text>

          {/* Wheels (spin via CSS) */}
          {WHEELS.map((cx) => (
            <g key={cx} className="pipeline-wheel" style={{ transformOrigin: `${cx}px 40.5px` }}>
              <circle cx={cx} cy="40.5" r="5" fill="#04060b" />
              <rect x={cx - 0.7} y="36.6" width="1.4" height="7.8" fill="#6b93ff" />
              <rect x={cx - 3.9} y="39.8" width="7.8" height="1.4" fill="#6b93ff" />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
