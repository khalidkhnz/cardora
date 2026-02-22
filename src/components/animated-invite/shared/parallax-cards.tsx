"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface ParallaxCard {
  id: string | number;
  content: React.ReactNode;
}

interface ParallaxCardsProps {
  cards: ParallaxCard[];
  cardClassName?: string;
  className?: string;
}

function StickyCard({
  card,
  index,
  total,
  cardClassName,
  disabled,
}: {
  card: ParallaxCard;
  index: number;
  total: number;
  cardClassName?: string;
  disabled: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0.3, 1],
    disabled ? [1, 1] : [1, 0.95],
  );

  const topOffset = `calc(10vh + ${index * 25}px)`;

  return (
    <div ref={ref} style={{ height: index < total - 1 ? "50vh" : undefined }}>
      <motion.div
        style={{
          scale,
          position: "sticky",
          top: topOffset,
          zIndex: index + 1,
        }}
        className={cardClassName}
      >
        {card.content}
      </motion.div>
    </div>
  );
}

export function ParallaxCards({
  cards,
  cardClassName,
  className,
}: ParallaxCardsProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={className}>
      {cards.map((card, index) => (
        <StickyCard
          key={card.id}
          card={card}
          index={index}
          total={cards.length}
          cardClassName={cardClassName}
          disabled={reducedMotion}
        />
      ))}
    </div>
  );
}
