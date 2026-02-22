"use client";

import { useState, useEffect } from "react";

function detectLowEndDevice(): boolean {
  if (typeof window === "undefined") return true;
  const nav = navigator as Navigator & { deviceMemory?: number };
  if (nav.hardwareConcurrency && nav.hardwareConcurrency <= 2) return true;
  if (nav.deviceMemory && nav.deviceMemory <= 2) return true;
  if (/Mobi|Android/i.test(navigator.userAgent)) return true;
  return false;
}

export function useIsLowEndDevice(): boolean {
  const [isLowEnd, setIsLowEnd] = useState(true);

  useEffect(() => {
    setIsLowEnd(detectLowEndDevice());
  }, []);

  return isLowEnd;
}

/** Imperative check — for non-hook contexts (e.g. useEffect callbacks) */
export { detectLowEndDevice as isLowEndDevice };
