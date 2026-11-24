"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const VeeBot = dynamic(() => import("./VeeBot"), { ssr: false });
export default function DeferredVee() {
  const [ready, setReady] = useState(false);
  useEffect(() => { const timer = window.setTimeout(() => setReady(true), 1500); return () => window.clearTimeout(timer); }, []);
  return ready ? <VeeBot /> : null;
}
