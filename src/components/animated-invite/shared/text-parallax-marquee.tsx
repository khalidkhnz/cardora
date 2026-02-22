"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface TextParallaxMarqueeProps {
  text: string;
  repeat?: number;
  baseVelocity?: number;
  color?: string;
  textClassName?: string;
  className?: string;
}

function MarqueeRow({
  text,
  repeat,
  direction,
  scrollProgress,
  baseVelocity,
  color,
  textClassName,
  disabled,
}: {
  text: string;
  repeat: number;
  direction: 1 | -1;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  baseVelocity: number;
  color?: string;
  textClassName?: string;
  disabled: boolean;
}) {
  const x = useTransform(
    scrollProgress,
    [0, 1],
    disabled ? [0, 0] : [0, direction * baseVelocity],
  );

  const repeatedText = Array.from({ length: repeat })
    .map(() => text)
    .join(" \u2014 ");

  return (
    <motion.div
      style={{ x }}
      className="flex whitespace-nowrap"
    >
      <span
        className={`font-serif text-5xl font-light opacity-[0.07] sm:text-7xl lg:text-8xl ${textClassName ?? ""}`}
        style={{ color }}
      >
        {repeatedText} &mdash;&nbsp;
      </span>
      <span
        className={`font-serif text-5xl font-light opacity-[0.07] sm:text-7xl lg:text-8xl ${textClassName ?? ""}`}
        style={{ color }}
      >
        {repeatedText} &mdash;&nbsp;
      </span>
    </motion.div>
  );
}

export function TextParallaxMarquee({
  text,
  repeat = 4,
  baseVelocity = 150,
  color,
  textClassName,
  className,
}: TextParallaxMarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div
      ref={ref}
      className={`overflow-hidden py-8 ${className ?? ""}`}
    >
      <MarqueeRow
        text={text}
        repeat={repeat}
        direction={-1}
        scrollProgress={scrollYProgress}
        baseVelocity={baseVelocity}
        color={color}
        textClassName={textClassName}
        disabled={reducedMotion}
      />
      <MarqueeRow
        text={text}
        repeat={repeat}
        direction={1}
        scrollProgress={scrollYProgress}
        baseVelocity={baseVelocity}
        color={color}
        textClassName={textClassName}
        disabled={reducedMotion}
      />
    </div>
  );
}
