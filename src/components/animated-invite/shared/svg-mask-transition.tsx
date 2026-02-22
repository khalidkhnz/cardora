"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface SvgMaskTransitionProps {
  children: React.ReactNode;
  maskColor?: string;
  className?: string;
}

export function SvgMaskTransition({
  children,
  maskColor = "#1a0a2e",
  className,
}: SvgMaskTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const clipRadius = useTransform(scrollYProgress, [0.1, 0.5], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);
  const maskClipPath = useTransform(
    clipRadius,
    (r) => `circle(${100 - r}% at 50% 50%)`,
  );
  const maskOpacity = useTransform(clipRadius, [0, 100], [1, 0]);

  if (reducedMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      {/* Mask overlay that shrinks away */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          backgroundColor: maskColor,
          clipPath: maskClipPath,
          opacity: maskOpacity,
        }}
      />
      {/* Content fades in */}
      <motion.div style={{ opacity }}>
        {children}
      </motion.div>
    </div>
  );
}
