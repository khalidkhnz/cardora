"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface CurvedDividerProps {
  color?: string;
  fillColor?: string;
  height?: number;
  flip?: boolean;
  className?: string;
}

export function CurvedDivider({
  color,
  fillColor,
  height = 80,
  flip = false,
  className,
}: CurvedDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const controlY = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [height * 0.6, height * 0.6] : [height * 0.2, height * 0.9],
  );

  const pathD = useTransform(
    controlY,
    (cy) =>
      `M0,${height} C360,${cy} 1080,${cy} 1440,${height} L1440,${height} L0,${height} Z`,
  );

  const fill = fillColor ?? color ?? "currentColor";

  return (
    <div
      ref={ref}
      className={`w-full overflow-hidden ${className ?? ""}`}
      style={{ height, transform: flip ? "scaleY(-1)" : undefined }}
    >
      <svg
        viewBox={`0 0 1440 ${height}`}
        preserveAspectRatio="none"
        className="block h-full w-full"
      >
        <motion.path
          style={{ d: pathD }}
          fill={fill}
          fillOpacity={0.15}
        />
      </svg>
    </div>
  );
}
