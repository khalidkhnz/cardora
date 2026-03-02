"use client";

import { useMemo } from "react";
import { motion, type Variants } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface StaggeredTextRevealProps {
  text: string;
  splitBy?: "word" | "letter";
  as?: "h1" | "h2" | "h3" | "p" | "span";
  trigger?: "inView" | "scroll";
  className?: string;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const unitVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function StaggeredTextReveal({
  text,
  splitBy = "word",
  as: Tag = "p",
  trigger = "inView",
  className,
}: StaggeredTextRevealProps) {
  const reducedMotion = useReducedMotion();

  const units = useMemo(() => {
    if (splitBy === "letter") {
      return text.split("").map((char, i) => ({
        key: `${char}-${i}`,
        content: char === " " ? "\u00A0" : char,
      }));
    }
    return text.split(/\s+/).map((word, i) => ({
      key: `${word}-${i}`,
      content: word,
    }));
  }, [text, splitBy]);

  if (reducedMotion) {
    const MotionTag = motion[Tag];
    return (
      <MotionTag
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={className}
      >
        {text}
      </MotionTag>
    );
  }

  const MotionTag = motion[Tag];

  return (
    <MotionTag
      variants={containerVariants}
      initial="hidden"
      {...(trigger === "inView"
        ? { whileInView: "visible", viewport: { once: true, margin: "-50px" } }
        : { animate: "visible" })}
      className={`flex flex-wrap ${className ?? ""}`}
    >
      {units.map((unit) => (
        <motion.span
          key={unit.key}
          variants={unitVariants}
          style={{
            display: "inline-block",
            marginRight: splitBy === "word" ? "0.3em" : undefined,
          }}
        >
          {unit.content}
        </motion.span>
      ))}
    </MotionTag>
  );
}
