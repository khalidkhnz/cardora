"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useIsInsidePreviewDialog } from "@/components/animated-invite/preview-context";

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);
  const isPreview = useIsInsidePreviewDialog();

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Skip Lenis inside the fullscreen dialog preview - it hijacks
    // window-level scroll and prevents the dialog container from scrolling.
    if (isPreview) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isPreview]);

  return lenisRef;
}
