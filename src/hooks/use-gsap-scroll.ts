"use client";

import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-setup";

interface GsapScrollOptions {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  trigger?: RefObject<HTMLElement | null>;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  toggleActions?: string;
}

export function useGsapScroll(
  target: RefObject<HTMLElement | null>,
  options: GsapScrollOptions,
) {
  useEffect(() => {
    if (!target.current) return;
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const tween = gsap.fromTo(target.current, options.from, {
      ...options.to,
      scrollTrigger: {
        trigger: options.trigger?.current ?? target.current,
        start: options.start ?? "top 80%",
        end: options.end ?? "bottom 20%",
        scrub: options.scrub ?? false,
        toggleActions: options.toggleActions ?? "play none none none",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
