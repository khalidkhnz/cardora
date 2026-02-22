"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FlippableCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  width: number;
  height: number;
  className?: string;
}

export function FlippableCard({
  front,
  back,
  width,
  height,
  className,
}: FlippableCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Hide tooltip after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -30, y: x * 30 }); // ±15° range
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const handleClick = useCallback(() => {
    setIsFlipped((prev) => !prev);
    setShowTooltip(false);
  }, []);

  const flipY = isFlipped ? 180 : 0;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        perspective: 1000,
        width,
        height,
        cursor: "pointer",
        position: "relative",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              top: -32,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 50,
              whiteSpace: "nowrap",
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "4px 10px",
                borderRadius: 6,
                backgroundColor: "rgba(0,0,0,0.75)",
                color: "#fff",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}
            >
              Click to flip &middot; Hover to tilt
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D card container — entry spin */}
      <motion.div
        initial={{ rotateY: 360 }}
        animate={{ rotateY: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Inner — tilt + flip */}
        <motion.div
          animate={{
            rotateX: tilt.x,
            rotateY: tilt.y + flipY,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          style={{
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Front face */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            {front}
          </div>

          {/* Back face */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            {back}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
