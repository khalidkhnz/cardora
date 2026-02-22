"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIsLowEndDevice } from "@/hooks/use-is-low-end-device";

interface ParallaxImageProps {
  src: string;
  alt?: string;
  speed?: number;
  scaleRange?: [number, number];
  className?: string;
}

export function ParallaxImage({
  src,
  alt = "",
  speed = 20,
  scaleRange = [1, 1.1],
  className,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isLowEnd = useIsLowEndDevice();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const disabled = reducedMotion || isLowEnd;

  const translateY = useTransform(
    scrollYProgress,
    [0, 1],
    disabled ? [0, 0] : [-speed, speed],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    disabled ? [1, 1] : scaleRange,
  );

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y: translateY, scale }}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    </div>
  );
}
