"use client";

import { motion } from "framer-motion";

export function DecorativeBorder({ color = "#DAA520" }: { color?: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <div
        className="absolute inset-4 rounded-lg border-2"
        style={{ borderColor: `${color}33` }}
      />
      <div
        className="absolute inset-8 rounded-lg border"
        style={{ borderColor: `${color}22` }}
      />
      {/* Corner ornaments */}
      {(["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"] as const).map(
        (pos) => (
          <motion.div
            key={pos}
            className={`absolute ${pos}`}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill={color}>
              <path d="M12 2l3 6 6 1-4.5 4 1 6.5L12 17l-5.5 2.5 1-6.5L3 9l6-1z" />
            </svg>
          </motion.div>
        ),
      )}
    </div>
  );
}

export function FloralFrame({ color = "#FFB6C1" }: { color?: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 8)}%`,
            left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 8)}%`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20 + i * 2, repeat: Infinity, ease: "linear" }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill={`${color}44`}>
            <ellipse cx="10" cy="5" rx="4" ry="5" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

export function GoldenPattern() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-5">
      <svg width="100%" height="100%">
        <pattern id="golden-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1" fill="#DAA520" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#golden-dots)" />
      </svg>
    </div>
  );
}

export function OrnamentalDivider({ color = "#DAA520" }: { color?: string }) {
  return (
    <div className="my-6 flex items-center justify-center gap-3">
      <div className="h-px w-16" style={{ backgroundColor: `${color}66` }} />
      <motion.svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill={color}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <path d="M8 0l2 4 4 1-3 3 .5 4L8 11l-3.5 1 .5-4L2 5l4-1z" />
      </motion.svg>
      <div className="h-px w-16" style={{ backgroundColor: `${color}66` }} />
    </div>
  );
}

export function SparkleEffect({ count = 12, color = "#FFD700" }: { count?: number; color?: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full"
          style={{
            backgroundColor: color,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
}

export function ElegantFrame() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <div
        className="absolute inset-6 rounded-xl border"
        style={{
          borderColor: "rgba(218, 165, 32, 0.2)",
          boxShadow: "0 0 30px rgba(218, 165, 32, 0.05), inset 0 0 30px rgba(218, 165, 32, 0.03)",
        }}
      />
      <div
        className="absolute inset-10 rounded-lg border"
        style={{ borderColor: "rgba(218, 165, 32, 0.1)" }}
      />
    </div>
  );
}
