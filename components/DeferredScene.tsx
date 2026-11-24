"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const SplineRobot = dynamic(() => import("./SplineRobot"), { ssr: false });
export default function DeferredScene() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);
  return ready ? <SplineRobot /> : <div className="h-full w-full" aria-hidden="true" />;
}
