"use client";

import { useCallback, useEffect, useRef } from "react";
import Spline from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";

type SplineApp = Application & {
  _renderer?: {
    pipeline?: {
      logoOverlayPass?: {
        enabled?: boolean;
      };
      setWatermark?: (texture: null) => void;
      updateRenderToScreen?: () => void;
    };
  };
  data?: {
    publish?: {
      settings?: {
        web?: {
          logo?: boolean;
        };
      };
    };
  };
  eventManager?: {
    publish?: {
      settings?: {
        web?: {
          logo?: boolean;
        };
      };
    };
  };
};

const SPLINE_BRANDING_SELECTOR = [
  'a[href*="spline.design"]',
  'a[href*="splinetool"]',
  '[aria-label*="Spline" i]',
  '[title*="Spline" i]',
  '[class*="logo" i]',
  '[id*="logo" i]',
].join(",");

const TRANSPARENT_BACKGROUND = "rgba(0, 0, 0, 0)";

const hideSplineBranding = (root: ParentNode) => {
  root.querySelectorAll<HTMLElement>(SPLINE_BRANDING_SELECTOR).forEach((el) => {
    el.style.setProperty("display", "none", "important");
    el.style.setProperty("opacity", "0", "important");
    el.style.setProperty("visibility", "hidden", "important");
    el.style.setProperty("pointer-events", "none", "important");
  });

  root.querySelectorAll<HTMLElement>("*").forEach((el) => {
    if (el.shadowRoot) {
      hideSplineBranding(el.shadowRoot);
    }
  });
};

const disableRuntimeLogo = (spline: SplineApp) => {
  const webSettings = [
    spline.data?.publish?.settings?.web,
    spline.eventManager?.publish?.settings?.web,
  ];

  webSettings.forEach((settings) => {
    if (settings) {
      settings.logo = false;
    }
  });

  spline._renderer?.pipeline?.setWatermark?.(null);

  if (spline._renderer?.pipeline?.logoOverlayPass) {
    spline._renderer.pipeline.logoOverlayPass.enabled = false;
  }

  spline._renderer?.pipeline?.updateRenderToScreen?.();
};

export default function SplineRobot() {
  const containerRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<SplineApp | null>(null);

  const makeSceneTransparent = useCallback(() => {
    if (containerRef.current) {
      containerRef.current
        .querySelectorAll<HTMLElement>("canvas, div")
        .forEach((el) => {
          el.style.background = "transparent";
          el.style.backgroundColor = "transparent";
        });
    }

    if (splineRef.current) {
      disableRuntimeLogo(splineRef.current);
      splineRef.current.setBackgroundColor(TRANSPARENT_BACKGROUND);
      splineRef.current.requestRender();
    }
  }, []);

  const cleanSplineChrome = useCallback(() => {
    if (!containerRef.current) return;

    hideSplineBranding(containerRef.current);
    makeSceneTransparent();
  }, [makeSceneTransparent]);

  useEffect(() => {
    cleanSplineChrome();

    const timers = [250, 750, 1500, 3000].map((delay) =>
      window.setTimeout(cleanSplineChrome, delay),
    );

    const domObserver = new MutationObserver(cleanSplineChrome);
    if (containerRef.current) {
      domObserver.observe(containerRef.current, {
        childList: true,
        subtree: true,
      });
    }

    const themeObserver = new MutationObserver(makeSceneTransparent);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      domObserver.disconnect();
      themeObserver.disconnect();
    };
  }, [makeSceneTransparent, cleanSplineChrome]);

  const handleLoad = (spline: Application) => {
    splineRef.current = spline as SplineApp;
    cleanSplineChrome();
  };

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden spline-wrapper">
      <style>{`
        .spline-wrapper {
          background: transparent !important;
        }

        .spline-wrapper > div,
        .spline-wrapper canvas {
          background: transparent !important;
          background-color: transparent !important;
        }

        .spline-wrapper a,
        .spline-wrapper [class*="logo"],
        .spline-wrapper [id*="logo"],
        .spline-wrapper [aria-label*="Spline"],
        .spline-wrapper [title*="Spline"] {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }
      `}</style>
      <Spline
        scene="https://prod.spline.design/s-pLOanXXtuywush/scene.splinecode"
        className="w-full h-full"
        style={{ background: "transparent" }}
        onLoad={handleLoad}
      />
    </div>
  );
}
