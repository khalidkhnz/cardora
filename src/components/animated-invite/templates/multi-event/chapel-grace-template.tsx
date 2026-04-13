"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RsvpModal } from "@/components/rsvp/rsvp-modal";
import { Share2, MapPin, Calendar, Heart, Download, Clock } from "lucide-react";
import { toast } from "sonner";
import { gsap, ScrollTrigger } from "@/lib/gsap-setup";
import { MusicToggleButton } from "../../shared/music-toggle-button";
import { CardoraWatermark } from "../../shared/cardora-watermark";
import { ParticleLayer } from "../../shared/particle-layer";
import { useMusicPlayer } from "@/hooks/use-music-player";
import { useCountdown } from "@/hooks/use-countdown";
import { useLenis } from "@/hooks/use-lenis";
import type { TemplateProps } from "../../types";

/* -------------------------------------------------------------------------- */
/*  Color Palette Constants                                                    */
/* -------------------------------------------------------------------------- */

const IVORY = "#FDF8F0";
const GOLD = "#C5A55A";
const GOLD_LIGHT = "#D4B96A";
const ROSE = "#D4A0A0";
const CHAPEL_BLUE = "#2C3E6B";
const CHARCOAL = "#2D2D2D";
const SAGE = "#9DC183";

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function formatWeddingDate(dateStr: string | null) {
  if (!dateStr) return "Date TBD";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/* -------------------------------------------------------------------------- */
/*  CrossSymbol - Enhanced with glow capabilities                              */
/* -------------------------------------------------------------------------- */

function CrossSymbol({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? `h-28 w-28 text-[${GOLD}]`}
    >
      {/* Floral wreath circle */}
      <circle cx="100" cy="120" r="65" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.25" />
      {/* Wreath leaf clusters */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 100 + 65 * Math.cos(rad);
        const cy = 120 + 65 * Math.sin(rad);
        return (
          <g key={angle} transform={`translate(${cx}, ${cy}) rotate(${angle + 90})`}>
            <ellipse rx="8" ry="3.5" fill="currentColor" opacity="0.2" />
            <ellipse rx="6" ry="2.5" fill="currentColor" opacity="0.15" transform="rotate(30)" />
          </g>
        );
      })}
      {/* Small flowers on wreath */}
      {[30, 150, 210, 330].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 100 + 65 * Math.cos(rad);
        const cy = 120 + 65 * Math.sin(rad);
        return (
          <g key={`flower-${angle}`}>
            <circle cx={cx} cy={cy} r="4" fill={ROSE} opacity="0.3" />
            <circle cx={cx} cy={cy} r="2" fill="currentColor" opacity="0.4" />
          </g>
        );
      })}
      {/* Cross - vertical beam */}
      <rect x="94" y="55" width="12" height="130" rx="2" fill="currentColor" opacity="0.5" />
      {/* Cross - horizontal beam */}
      <rect x="60" y="90" width="80" height="12" rx="2" fill="currentColor" opacity="0.5" />
      {/* Inner cross detail */}
      <rect x="97" y="62" width="6" height="116" rx="1" fill="currentColor" opacity="0.25" />
      <rect x="67" y="93" width="66" height="6" rx="1" fill="currentColor" opacity="0.25" />
      {/* Cross center ornament */}
      <circle cx="100" cy="96" r="5" fill="currentColor" opacity="0.4" />
      <circle cx="100" cy="96" r="2.5" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  ChurchWindow - Stained glass window accent                                 */
/* -------------------------------------------------------------------------- */

function ChurchWindow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "h-32 w-20"}
    >
      {/* Window arch outline */}
      <path
        d="M10 180 L10 70 Q10 10 60 10 Q110 10 110 70 L110 180 Z"
        stroke={GOLD}
        strokeWidth="1.5"
        fill="none"
        opacity="0.2"
      />
      {/* Inner arch fill */}
      <path
        d="M18 175 L18 72 Q18 20 60 20 Q102 20 102 72 L102 175 Z"
        fill={CHAPEL_BLUE}
        opacity="0.05"
      />
      {/* Vertical dividers */}
      <line x1="60" y1="20" x2="60" y2="175" stroke={GOLD} strokeWidth="0.5" opacity="0.15" />
      <line x1="38" y1="50" x2="38" y2="175" stroke={GOLD} strokeWidth="0.5" opacity="0.1" />
      <line x1="82" y1="50" x2="82" y2="175" stroke={GOLD} strokeWidth="0.5" opacity="0.1" />
      {/* Horizontal dividers */}
      <line x1="18" y1="80" x2="102" y2="80" stroke={GOLD} strokeWidth="0.5" opacity="0.1" />
      <line x1="18" y1="120" x2="102" y2="120" stroke={GOLD} strokeWidth="0.5" opacity="0.1" />
      {/* Colored glass segments */}
      <rect x="20" y="82" width="18" height="36" fill={ROSE} opacity="0.08" rx="1" />
      <rect x="42" y="82" width="36" height="36" fill={CHAPEL_BLUE} opacity="0.06" rx="1" />
      <rect x="82" y="82" width="18" height="36" fill={SAGE} opacity="0.08" rx="1" />
      <rect x="20" y="122" width="18" height="50" fill={SAGE} opacity="0.06" rx="1" />
      <rect x="42" y="122" width="36" height="50" fill={ROSE} opacity="0.05" rx="1" />
      <rect x="82" y="122" width="18" height="50" fill={CHAPEL_BLUE} opacity="0.06" rx="1" />
      {/* Small cross at top */}
      <line x1="60" y1="30" x2="60" y2="50" stroke={GOLD} strokeWidth="1" opacity="0.25" />
      <line x1="50" y1="38" x2="70" y2="38" stroke={GOLD} strokeWidth="1" opacity="0.25" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  StainedGlassBorder - Horizontal border with color segments                 */
/* -------------------------------------------------------------------------- */

function StainedGlassBorder({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "mx-auto my-6 h-10 w-full"}
    >
      {/* Top frame line */}
      <line x1="0" y1="5" x2="600" y2="5" stroke={GOLD} strokeWidth="0.8" opacity="0.3" />
      {/* Bottom frame line */}
      <line x1="0" y1="45" x2="600" y2="45" stroke={GOLD} strokeWidth="0.8" opacity="0.3" />
      {/* Stained glass segments */}
      {[0, 60, 120, 180, 240, 300, 360, 420, 480, 540].map((x, i) => {
        const colors = [ROSE, SAGE, GOLD, ROSE, SAGE];
        const color = colors[i % colors.length]!;
        return (
          <g key={x}>
            <path
              d={`M${x + 5} 42 L${x + 5} 20 Q${x + 30} 8 ${x + 55} 20 L${x + 55} 42 Z`}
              fill={color}
              opacity="0.1"
            />
            <path
              d={`M${x + 5} 42 L${x + 5} 20 Q${x + 30} 8 ${x + 55} 20 L${x + 55} 42`}
              stroke={color}
              strokeWidth="0.6"
              fill="none"
              opacity="0.3"
            />
            <line x1={x + 30} y1="12" x2={x + 30} y2="20" stroke={GOLD} strokeWidth="0.5" opacity="0.25" />
            <line x1={x + 27} y1="15" x2={x + 33} y2="15" stroke={GOLD} strokeWidth="0.5" opacity="0.25" />
          </g>
        );
      })}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  DoveSVG - Enhanced dove with olive branch                                  */
/* -------------------------------------------------------------------------- */

function DoveSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? `h-10 w-12 text-[${GOLD}]`}
    >
      {/* Dove body */}
      <path
        d="M50 50 Q40 45 35 38 Q30 30 35 24 Q40 18 48 22 L50 24
           Q55 18 62 16 Q72 14 78 20 Q82 24 80 32
           L75 30 Q78 35 76 42 Q72 50 60 52 Z"
        fill="currentColor"
        opacity="0.4"
      />
      {/* Wing */}
      <path
        d="M48 30 Q35 22 20 18 Q10 16 5 20 Q12 22 20 28 Q30 36 42 38"
        fill="currentColor"
        opacity="0.3"
      />
      {/* Wing feather details */}
      <path d="M30 24 Q22 20 15 19" stroke="currentColor" strokeWidth="0.5" opacity="0.2" fill="none" />
      <path d="M35 28 Q25 24 18 23" stroke="currentColor" strokeWidth="0.5" opacity="0.2" fill="none" />
      {/* Tail */}
      <path
        d="M60 50 Q65 55 72 60 Q78 63 82 62 Q75 58 68 52"
        fill="currentColor"
        opacity="0.3"
      />
      {/* Tail feather detail */}
      <path d="M65 54 Q70 58 76 61" stroke="currentColor" strokeWidth="0.4" opacity="0.2" fill="none" />
      {/* Eye */}
      <circle cx="65" cy="24" r="1.5" fill="currentColor" opacity="0.6" />
      {/* Olive branch in beak */}
      <path d="M78 20 Q85 18 90 15" stroke={SAGE} strokeWidth="1" fill="none" opacity="0.5" />
      <ellipse cx="90" cy="13" rx="4" ry="2" fill={SAGE} opacity="0.3" transform="rotate(-20 90 13)" />
      <ellipse cx="86" cy="16" rx="3" ry="1.5" fill={SAGE} opacity="0.25" transform="rotate(10 86 16)" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  OliveBranchAccent - Small olive branch section divider                     */
/* -------------------------------------------------------------------------- */

function OliveBranchAccent({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? `mx-auto my-4 h-6 w-56 text-[${SAGE}]`}
    >
      {/* Central small cross */}
      <line x1="150" y1="8" x2="150" y2="22" stroke={GOLD} strokeWidth="1" opacity="0.4" />
      <line x1="144" y1="15" x2="156" y2="15" stroke={GOLD} strokeWidth="1" opacity="0.4" />
      {/* Left branch */}
      <path
        d="M140 15 Q120 12 100 15 Q80 18 60 15 Q40 12 20 15"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />
      <ellipse cx="120" cy="12" rx="6" ry="2.5" fill="currentColor" opacity="0.2" transform="rotate(-15 120 12)" />
      <ellipse cx="100" cy="17" rx="5" ry="2" fill="currentColor" opacity="0.18" transform="rotate(10 100 17)" />
      <ellipse cx="80" cy="14" rx="5" ry="2" fill="currentColor" opacity="0.15" transform="rotate(-10 80 14)" />
      <ellipse cx="60" cy="17" rx="4.5" ry="2" fill="currentColor" opacity="0.12" transform="rotate(8 60 17)" />
      {/* Right branch */}
      <path
        d="M160 15 Q180 12 200 15 Q220 18 240 15 Q260 12 280 15"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />
      <ellipse cx="180" cy="12" rx="6" ry="2.5" fill="currentColor" opacity="0.2" transform="rotate(15 180 12)" />
      <ellipse cx="200" cy="17" rx="5" ry="2" fill="currentColor" opacity="0.18" transform="rotate(-10 200 17)" />
      <ellipse cx="220" cy="14" rx="5" ry="2" fill="currentColor" opacity="0.15" transform="rotate(10 220 14)" />
      <ellipse cx="240" cy="17" rx="4.5" ry="2" fill="currentColor" opacity="0.12" transform="rotate(-8 240 17)" />
      <circle cx="20" cy="15" r="2" fill="currentColor" opacity="0.25" />
      <circle cx="280" cy="15" r="2" fill="currentColor" opacity="0.25" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  LightRays - SVG radiating from behind the cross                            */
/* -------------------------------------------------------------------------- */

function LightRays({ className }: { className?: string }) {
  return (
    <div className={`light-ray absolute inset-0 flex items-center justify-center ${className ?? ""}`}>
      <svg viewBox="0 0 400 400" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x2 = 200 + 200 * Math.cos(angle);
          const y2 = 200 + 200 * Math.sin(angle);
          return (
            <line
              key={i}
              x1="200"
              y1="200"
              x2={x2}
              y2={y2}
              stroke={GOLD}
              strokeWidth={i % 2 === 0 ? "1.5" : "0.8"}
              opacity={i % 2 === 0 ? "0.15" : "0.08"}
            />
          );
        })}
        {/* Radial glow circles */}
        <circle cx="200" cy="200" r="60" fill={GOLD} opacity="0.04" />
        <circle cx="200" cy="200" r="100" fill={GOLD} opacity="0.025" />
        <circle cx="200" cy="200" r="150" fill={GOLD} opacity="0.015" />
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Floating Dove - Individual dove for ambient animation (Framer Motion)      */
/* -------------------------------------------------------------------------- */

function FloatingDove({
  size,
  initialX,
  initialY,
  pathAmplitudeX,
  pathAmplitudeY,
  duration,
  delay,
  opacity,
}: {
  size: number;
  initialX: number;
  initialY: number;
  pathAmplitudeX: number;
  pathAmplitudeY: number;
  duration: number;
  delay: number;
  opacity: number;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{ width: size, height: size * 0.7, left: `${initialX}%`, top: `${initialY}%` }}
      animate={{
        x: [0, pathAmplitudeX * 0.5, pathAmplitudeX, pathAmplitudeX * 0.5, 0],
        y: [0, -pathAmplitudeY, 0, pathAmplitudeY * 0.6, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
        <path
          d="M50 45 Q42 40 38 34 Q34 28 38 22 Q42 17 48 20 L50 22
             Q54 17 60 16 Q68 14 73 19 Q76 22 74 28
             L70 27 Q72 31 70 37 Q67 43 58 45 Z"
          fill={GOLD}
          opacity="0.6"
        />
        <path
          d="M46 28 Q36 22 24 19 Q16 17 12 20 Q18 22 24 27 Q32 33 42 34"
          fill={GOLD}
          opacity="0.4"
        />
        <path
          d="M58 43 Q62 47 67 51 Q71 53 74 52 Q69 49 64 44"
          fill={GOLD}
          opacity="0.4"
        />
      </svg>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  FloatingDovesLayer - 7 doves on arc paths                                  */
/* -------------------------------------------------------------------------- */

function FloatingDovesLayer() {
  const doves = [
    { size: 40, initialX: 5, initialY: 15, pathAmplitudeX: 120, pathAmplitudeY: 30, duration: 18, delay: 0, opacity: 0.12 },
    { size: 30, initialX: 80, initialY: 25, pathAmplitudeX: -100, pathAmplitudeY: 25, duration: 22, delay: 2, opacity: 0.1 },
    { size: 35, initialX: 20, initialY: 50, pathAmplitudeX: 80, pathAmplitudeY: 35, duration: 20, delay: 4, opacity: 0.15 },
    { size: 25, initialX: 70, initialY: 60, pathAmplitudeX: -90, pathAmplitudeY: 20, duration: 24, delay: 1, opacity: 0.1 },
    { size: 45, initialX: 10, initialY: 75, pathAmplitudeX: 140, pathAmplitudeY: 40, duration: 19, delay: 3, opacity: 0.2 },
    { size: 28, initialX: 55, initialY: 40, pathAmplitudeX: 60, pathAmplitudeY: 28, duration: 21, delay: 5, opacity: 0.12 },
    { size: 32, initialX: 90, initialY: 80, pathAmplitudeX: -70, pathAmplitudeY: 22, duration: 23, delay: 6, opacity: 0.25 },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {doves.map((dove, i) => (
        <FloatingDove key={i} {...dove} />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  ChapelEventCard - Timeline-aware event card with pew-rise animation        */
/* -------------------------------------------------------------------------- */

function ChapelEventCard({
  event,
  index,
}: {
  event: { name: string; date: string; venue: string; time: string };
  index: number;
}) {
  return (
    <div className={`pew-rise flex w-full ${index % 2 === 0 ? "justify-start" : "justify-end"}`}>
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-[#D4A0A0]/20 bg-white/70 p-6 shadow-lg shadow-black/[0.04] backdrop-blur-sm">
        {/* Top decorative gradient line */}
        <div
          className="pointer-events-none absolute top-0 right-0 left-0 h-1"
          style={{
            background: `linear-gradient(to right, ${SAGE}40, ${ROSE}50, ${SAGE}40)`,
          }}
        />

        {/* Event icon */}
        <div className="mb-4 flex justify-center">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full"
            style={{
              border: `1px solid ${ROSE}30`,
              background: `${ROSE}10`,
            }}
          >
            <span className="text-lg">
              {index === 0 && "🍷"}
              {index === 1 && "⛪"}
              {index === 2 && "🥂"}
              {index === 3 && "🎉"}
              {index > 3 && "✨"}
            </span>
          </div>
        </div>

        {/* Event name */}
        <h3
          className="mb-3 text-center font-serif text-2xl font-semibold tracking-wide"
          style={{ color: CHARCOAL }}
        >
          {event.name}
        </h3>

        {/* Rose/sage divider */}
        <div
          className="mx-auto mb-3 h-px w-16"
          style={{ background: `linear-gradient(to right, transparent, ${ROSE}50, transparent)` }}
        />

        {/* Date & Time */}
        <div className="mb-2 flex items-center justify-center gap-2 text-sm" style={{ color: `${CHARCOAL}b3` }}>
          <Calendar className="h-3.5 w-3.5" style={{ color: `${SAGE}cc` }} />
          <span>{event.date}</span>
        </div>
        <div className="mb-2 flex items-center justify-center gap-2 text-sm" style={{ color: `${CHARCOAL}b3` }}>
          <Clock className="h-3.5 w-3.5" style={{ color: `${SAGE}cc` }} />
          <span>{event.time}</span>
        </div>

        {/* Venue */}
        <div className="flex items-center justify-center gap-2 text-sm" style={{ color: `${CHARCOAL}80` }}>
          <MapPin className="h-3.5 w-3.5" style={{ color: `${ROSE}99` }} />
          <span>{event.venue}</span>
        </div>

        {/* Corner decorations */}
        <div className="pointer-events-none absolute bottom-2 left-2 h-6 w-6" style={{ borderBottom: `1px solid ${SAGE}33`, borderLeft: `1px solid ${SAGE}33` }} />
        <div className="pointer-events-none absolute bottom-2 right-2 h-6 w-6" style={{ borderBottom: `1px solid ${SAGE}33`, borderRight: `1px solid ${SAGE}33` }} />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Candle Flame CSS Animation (injected via style tag)                        */
/* -------------------------------------------------------------------------- */

function CandleFlameStyles() {
  return (
    <style>{`
      @keyframes candleFlicker {
        0%, 100% {
          transform: scaleY(1) scaleX(1) translateX(0);
          opacity: 0.8;
        }
        25% {
          transform: scaleY(1.15) scaleX(0.9) translateX(-1px);
          opacity: 0.9;
        }
        50% {
          transform: scaleY(0.9) scaleX(1.05) translateX(1px);
          opacity: 0.7;
        }
        75% {
          transform: scaleY(1.1) scaleX(0.95) translateX(-0.5px);
          opacity: 0.85;
        }
      }
      .candle-flame {
        animation: candleFlicker 1.5s ease-in-out infinite;
        transform-origin: bottom center;
      }
      .candle-flame-delay-1 { animation-delay: 0.3s; }
      .candle-flame-delay-2 { animation-delay: 0.6s; }
      .candle-flame-delay-3 { animation-delay: 0.9s; }

      @keyframes lightRevealBg {
        from { background-position: 0% 100%; }
        to { background-position: 0% 0%; }
      }
    `}</style>
  );
}

/* -------------------------------------------------------------------------- */
/*  CandleFlame - Small animated flame SVG                                     */
/* -------------------------------------------------------------------------- */

function CandleFlame({ delayClass }: { delayClass?: string }) {
  return (
    <div className={`candle-flame ${delayClass ?? ""} mx-auto -mb-1 h-5 w-3`}>
      <svg viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="6" cy="14" rx="3" ry="6" fill={GOLD_LIGHT} opacity="0.6" />
        <ellipse cx="6" cy="12" rx="2" ry="4" fill="#F5D680" opacity="0.8" />
        <ellipse cx="6" cy="11" rx="1" ry="2.5" fill="#FFF4D6" opacity="0.9" />
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Template Component                                                    */
/* -------------------------------------------------------------------------- */

export default function ChapelGraceTemplate({ invite, isDemo }: TemplateProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const { isPlaying, toggle } = useMusicPlayer(invite.musicUrl);
  const countdown = useCountdown(invite.weddingDate);

  // Initialize Lenis smooth scrolling
  useLenis();

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Dove glide across hero
      gsap.fromTo(
        ".dove-glide",
        { x: -100, y: 50, opacity: 0, scale: 0.5 },
        {
          x: "70vw",
          y: -30,
          opacity: 1,
          scale: 1,
          duration: 2.5,
          ease: "power1.inOut",
          delay: 0.5,
          onComplete: () => {
            gsap.to(".dove-glide", { opacity: 0, duration: 0.5 });
          },
        },
      );

      // 2. Light rays radiate outward
      gsap.fromTo(
        ".light-ray",
        { opacity: 0, scale: 0.3 },
        { opacity: 0.3, scale: 1.5, duration: 2, ease: "power1.out", delay: 0.8 },
      );

      // 3. Cross glow effect
      gsap.fromTo(
        ".cross-glow",
        { filter: "drop-shadow(0 0 0px transparent)" },
        {
          filter: "drop-shadow(0 0 20px rgba(197,165,90,0.6))",
          duration: 1.5,
          delay: 1,
          ease: "power2.inOut",
        },
      );

      // 4. Pew rise event cards - sequential timeline
      const pewTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".events-section",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
      gsap.utils.toArray<HTMLElement>(".pew-rise").forEach((el, i) => {
        pewTl.fromTo(
          el,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
          i * 0.2,
        );
      });

      // 5. Chapel reveals - soft light wipe with blur
      gsap.utils.toArray<HTMLElement>(".chapel-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, filter: "blur(10px)" },
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // 6. Candle reveal countdown boxes
      gsap.utils.toArray<HTMLElement>(".candle-reveal").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30, backgroundSize: "100% 0%" },
          {
            opacity: 1,
            y: 0,
            backgroundSize: "100% 100%",
            duration: 0.8,
            delay: i * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // 7. Parallax background pattern
      gsap.utils.toArray<HTMLElement>(".parallax-pattern").forEach((el) => {
        gsap.to(el, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      // 8. Timeline line grow animation
      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power2.out",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: ".events-section",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Default events for Christian wedding
  const events = invite.events ?? [
    { name: "Rehearsal Dinner", date: "Date TBA", venue: invite.venue ?? "Venue TBA", time: "6 PM" },
    { name: "Wedding Ceremony", date: invite.weddingDate ?? "Date TBA", venue: invite.venue ?? "Chapel", time: "11 AM" },
    { name: "Reception", date: invite.receptionDate ?? "Date TBA", venue: invite.venue ?? "Venue TBA", time: "5 PM" },
    { name: "After Party", date: invite.receptionDate ?? "Date TBA", venue: invite.venue ?? "Venue TBA", time: "9 PM" },
  ];

  async function handleShare() {
    const url = `${window.location.origin}/wedding/${invite.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${invite.groomName} & ${invite.brideName} - Wedding Invitation`,
          url,
        });
        return;
      } catch {
        /* fall through to clipboard */
      }
    }
    await navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  }

  // Extract Things to Know data and hashtag from extraData
  const thingsToKnow = (invite.extraData?.thingsToKnow as { label: string; detail: string }[] | undefined) ?? [];
  const hashtag = (invite.extraData?.hashtag as string | undefined) ?? null;

  const flameDelayClasses = ["", "candle-flame-delay-1", "candle-flame-delay-2", "candle-flame-delay-3"];

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, ${IVORY}, #FFFDF8, ${IVORY})`,
        color: CHARCOAL,
      }}
    >
      {/* Injected candle flame CSS animations */}
      <CandleFlameStyles />

      {/* Particle layer */}
      <ParticleLayer type="LIGHT" />

      {/* Floating Doves Layer - Framer Motion ambient */}
      <FloatingDovesLayer />

      {/* Subtle floral pattern overlay with parallax */}
      <div className="parallax-pattern pointer-events-none fixed inset-0 z-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23D4A0A0' stroke-width='0.5'%3E%3Ccircle cx='40' cy='40' r='15'/%3E%3Cpath d='M40 25 Q50 35 40 55 Q30 35 40 25'/%3E%3Cpath d='M25 40 Q35 30 55 40 Q35 50 25 40'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Music toggle */}
      {invite.musicUrl && (
        <MusicToggleButton
          isPlaying={isPlaying}
          onToggle={toggle}
          className="fixed top-4 right-4 z-50 rounded-full border border-[#D4A0A0]/30 bg-white/80 p-3 shadow-lg backdrop-blur-sm transition-colors hover:bg-white"
        />
      )}

      {/* Demo banner */}
      {isDemo && (
        <div
          className="relative z-10 py-2 text-center text-sm font-medium text-white"
          style={{ backgroundColor: ROSE }}
        >
          This is a demo preview. Complete payment to use your own details.
        </div>
      )}

      {/* ================================================================== */}
      {/*  CONTENT                                                           */}
      {/* ================================================================== */}
      <div className="relative z-10">

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 1 - HERO (Full viewport height)                         */}
        {/* ---------------------------------------------------------------- */}
        <motion.section
          className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          {/* Light rays behind cross */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
            <LightRays className="" />
          </div>

          {/* Dove glide animation element */}
          <div className="dove-glide pointer-events-none absolute top-[20%] left-0 z-20">
            <DoveSVG className="h-14 w-16 text-[#C5A55A]/60" />
          </div>

          {/* Church windows flanking - decorative */}
          <div className="pointer-events-none absolute top-[15%] left-4 hidden opacity-20 lg:block">
            <ChurchWindow className="h-40 w-24" />
          </div>
          <div className="pointer-events-none absolute top-[15%] right-4 hidden -scale-x-100 opacity-20 lg:block">
            <ChurchWindow className="h-40 w-24" />
          </div>

          {/* Cross with Wreath - with glow class */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="cross-glow relative z-10 mx-auto mb-6 flex justify-center"
          >
            <CrossSymbol className="h-24 w-24 text-[#C5A55A]/70 sm:h-28 sm:w-28" />
          </motion.div>

          {/* Holy Matrimony heading */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative z-10 mb-2"
          >
            <p className="font-serif text-3xl leading-relaxed sm:text-4xl" style={{ color: GOLD }}>
              Holy Matrimony
            </p>
          </motion.div>

          {/* Dove icon */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative z-10 mx-auto mb-4 flex justify-center"
          >
            <DoveSVG className="h-8 w-10 text-[#C5A55A]/50" />
          </motion.div>

          <OliveBranchAccent className={`relative z-10 mx-auto my-4 h-6 w-56 text-[${SAGE}]`} />

          {/* Parent blessings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="relative z-10 mb-8"
          >
            <p className="mb-1 text-sm tracking-[0.15em] uppercase" style={{ color: `${CHARCOAL}80` }}>
              With the blessings of
            </p>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Groom's parents */}
              <div className="text-center">
                {invite.groomFatherName && invite.groomMotherName ? (
                  <>
                    <p className="text-xs tracking-wider uppercase" style={{ color: `${GOLD}b3` }}>
                      Son of
                    </p>
                    <p className="mt-1 font-serif text-lg" style={{ color: `${CHARCOAL}e6` }}>
                      {invite.groomFatherName}
                    </p>
                    <p className="font-serif text-sm" style={{ color: `${CHARCOAL}a6` }}>
                      & {invite.groomMotherName}
                    </p>
                  </>
                ) : invite.groomFatherName ? (
                  <>
                    <p className="text-xs tracking-wider uppercase" style={{ color: `${GOLD}b3` }}>Son of</p>
                    <p className="mt-1 font-serif text-lg" style={{ color: `${CHARCOAL}e6` }}>{invite.groomFatherName}</p>
                  </>
                ) : null}
              </div>

              {/* Bride's parents */}
              <div className="text-center">
                {invite.brideFatherName && invite.brideMotherName ? (
                  <>
                    <p className="text-xs tracking-wider uppercase" style={{ color: `${GOLD}b3` }}>
                      Daughter of
                    </p>
                    <p className="mt-1 font-serif text-lg" style={{ color: `${CHARCOAL}e6` }}>
                      {invite.brideFatherName}
                    </p>
                    <p className="font-serif text-sm" style={{ color: `${CHARCOAL}a6` }}>
                      & {invite.brideMotherName}
                    </p>
                  </>
                ) : invite.brideFatherName ? (
                  <>
                    <p className="text-xs tracking-wider uppercase" style={{ color: `${GOLD}b3` }}>Daughter of</p>
                    <p className="mt-1 font-serif text-lg" style={{ color: `${CHARCOAL}e6` }}>{invite.brideFatherName}</p>
                  </>
                ) : null}
              </div>
            </div>
          </motion.div>

          {/* Invitation text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="relative z-10 mb-4 text-sm tracking-[0.15em] uppercase"
            style={{ color: `${CHARCOAL}73` }}
          >
            Request the honour of your presence at the wedding of
          </motion.p>

          {/* Hero image */}
          {invite.heroImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative z-10 mx-auto mb-8 h-56 w-56 overflow-hidden rounded-full shadow-2xl sm:h-64 sm:w-64"
              style={{
                border: `2px solid ${ROSE}4d`,
                boxShadow: `0 25px 50px -12px ${ROSE}1a`,
              }}
            >
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${invite.heroImage})` }}
              />
            </motion.div>
          )}

          {/* Couple Names */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="relative z-10"
          >
            <h1 className="font-serif text-5xl font-light leading-tight sm:text-6xl lg:text-7xl" style={{ color: CHARCOAL }}>
              {invite.groomName}
            </h1>

            {/* Divider with heart */}
            <div className="my-4 flex items-center justify-center gap-4">
              <motion.div
                className="h-px w-16 sm:w-24"
                style={{ background: `linear-gradient(to right, transparent, ${ROSE}80)` }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.0, duration: 0.8 }}
              />
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.1, duration: 0.6, type: "spring" }}
              >
                <Heart className="h-5 w-5" style={{ fill: `${ROSE}66`, color: ROSE }} />
              </motion.div>
              <motion.div
                className="h-px w-16 sm:w-24"
                style={{ background: `linear-gradient(to left, transparent, ${ROSE}80)` }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.0, duration: 0.8 }}
              />
            </div>

            <h1 className="font-serif text-5xl font-light leading-tight sm:text-6xl lg:text-7xl" style={{ color: CHARCOAL }}>
              {invite.brideName}
            </h1>
          </motion.div>

          {/* Wedding date preview */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="relative z-10 mt-6 text-base"
            style={{ color: `${CHARCOAL}80` }}
          >
            {formatWeddingDate(invite.weddingDate)}
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="relative z-10 mt-12"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto h-8 w-px"
              style={{ backgroundColor: `${ROSE}4d` }}
            />
          </motion.div>
        </motion.section>

        <div className="mx-auto max-w-3xl px-4">
          <StainedGlassBorder />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 2 - EVENTS with Vertical Timeline                       */}
        {/* ---------------------------------------------------------------- */}
        <section className="events-section mx-auto max-w-3xl px-4 py-16">
          <div className="chapel-reveal mb-10 text-center">
            <p className="mb-2 text-xs tracking-[0.3em] uppercase" style={{ color: `${GOLD}99` }}>
              Celebrations
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl" style={{ color: CHARCOAL }}>
              Wedding Events
            </h2>
          </div>

          {/* Vertical timeline layout */}
          <div className="relative">
            {/* Central timeline line */}
            <div
              className="timeline-line absolute top-0 left-1/2 h-full w-px -translate-x-1/2"
              style={{ backgroundColor: `${GOLD}33` }}
            />

            {/* Event cards alternating left/right */}
            <div className="relative flex flex-col gap-12">
              {events.map((event, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <div key={index} className="relative flex items-start">
                    {/* Timeline dot */}
                    <div
                      className="absolute top-6 left-1/2 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2"
                      style={{
                        borderColor: GOLD,
                        backgroundColor: IVORY,
                        boxShadow: `0 0 8px ${GOLD}40`,
                      }}
                    />

                    {/* Left side */}
                    <div className={`w-[calc(50%-1.5rem)] ${isLeft ? "pr-4" : ""}`}>
                      {isLeft && <ChapelEventCard event={event} index={index} />}
                    </div>

                    {/* Center spacer (for the line) */}
                    <div className="w-12 shrink-0" />

                    {/* Right side */}
                    <div className={`w-[calc(50%-1.5rem)] ${!isLeft ? "pl-4" : ""}`}>
                      {!isLeft && <ChapelEventCard event={event} index={index} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-4">
          <OliveBranchAccent />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 3 - COUPLE PHOTO                                        */}
        {/* ---------------------------------------------------------------- */}
        {invite.couplePhoto && (
          <section className="chapel-reveal mx-auto max-w-3xl px-4 py-16">
            <div
              className="overflow-hidden rounded-2xl shadow-xl"
              style={{
                border: `1px solid ${ROSE}33`,
                boxShadow: `0 20px 40px -12px ${CHARCOAL}0d`,
              }}
            >
              <div
                className="aspect-[4/3] w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${invite.couplePhoto})` }}
              />
            </div>
            <div className="mt-4 text-center">
              <p className="font-serif text-lg italic" style={{ color: `${CHARCOAL}80` }}>
                {invite.groomName} & {invite.brideName}
              </p>
            </div>
          </section>
        )}

        {/* ---------------------------------------------------------------- */}
        {/*  GALLERY - 3-column asymmetric grid                              */}
        {/* ---------------------------------------------------------------- */}
        {invite.galleryImages.length > 0 && (
          <section className="mx-auto max-w-3xl px-4 py-16">
            <div className="chapel-reveal mb-8 text-center">
              <h2 className="font-serif text-2xl" style={{ color: CHARCOAL }}>Gallery</h2>
            </div>

            {/* Asymmetric 3-column grid: 1 tall + 2 small stacked pattern */}
            <div className="grid grid-cols-3 gap-3">
              {invite.galleryImages.map((img, idx) => {
                // Pattern: every 3 images: first is tall (spans 2 rows), next 2 are stacked
                const groupIndex = idx % 3;
                const isTall = groupIndex === 0;

                return (
                  <div
                    key={idx}
                    className={`chapel-reveal overflow-hidden rounded-xl shadow-md ${
                      isTall ? "row-span-2" : ""
                    }`}
                    style={{
                      border: `1px solid ${ROSE}26`,
                      aspectRatio: isTall ? undefined : "1 / 1",
                    }}
                  >
                    <div
                      className={`h-full w-full bg-cover bg-center transition-transform duration-700 hover:scale-105 ${
                        isTall ? "min-h-[280px]" : ""
                      }`}
                      style={{ backgroundImage: `url(${img})` }}
                    />
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <div className="mx-auto max-w-3xl px-4">
          <StainedGlassBorder />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 4 - THINGS TO KNOW                                      */}
        {/* ---------------------------------------------------------------- */}
        {thingsToKnow.length > 0 && (
          <section className="mx-auto max-w-3xl px-4 py-16">
            <div className="chapel-reveal mb-10 text-center">
              <p className="mb-2 text-xs tracking-[0.3em] uppercase" style={{ color: `${GOLD}99` }}>
                Helpful Information
              </p>
              <h2 className="font-serif text-3xl" style={{ color: CHARCOAL }}>
                Things to Know
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {thingsToKnow.map((item, idx) => (
                <div
                  key={idx}
                  className="chapel-reveal rounded-xl p-5 backdrop-blur-sm"
                  style={{
                    border: `1px solid ${SAGE}33`,
                    backgroundColor: "rgba(255,255,255,0.5)",
                  }}
                >
                  <h3 className="mb-2 font-serif text-lg" style={{ color: GOLD }}>
                    {item.label}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: `${CHARCOAL}8c` }}>
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ---------------------------------------------------------------- */}
        {/*  STORY SECTION                                                   */}
        {/* ---------------------------------------------------------------- */}
        {invite.story && (
          <section className="mx-auto max-w-3xl px-4 py-16">
            <div
              className="chapel-reveal rounded-2xl p-8 text-center backdrop-blur-sm sm:p-10"
              style={{
                border: `1px solid ${ROSE}26`,
                backgroundColor: "rgba(255,255,255,0.5)",
              }}
            >
              <h2 className="mb-2 font-serif text-2xl" style={{ color: CHARCOAL }}>
                Our Story
              </h2>
              <OliveBranchAccent className={`mx-auto my-4 h-5 w-48 text-[${SAGE}]/50`} />
              <p className="leading-relaxed" style={{ color: `${CHARCOAL}a6` }}>
                {invite.story}
              </p>
            </div>
          </section>
        )}

        <div className="mx-auto max-w-3xl px-4">
          <OliveBranchAccent />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 5 - COUNTDOWN TIMER with Candle Reveal                  */}
        {/* ---------------------------------------------------------------- */}
        {invite.weddingDate && (
          <section className="mx-auto max-w-3xl px-4 py-16">
            <div className="chapel-reveal mb-8 text-center">
              <p className="mb-2 text-xs tracking-[0.3em] uppercase" style={{ color: `${GOLD}99` }}>
                The Blessed Day
              </p>
              <h2 className="font-serif text-3xl" style={{ color: CHARCOAL }}>
                Counting Down
              </h2>
            </div>

            <div
              className="rounded-2xl p-8 backdrop-blur-sm"
              style={{
                border: `1px solid ${ROSE}26`,
                backgroundColor: "rgba(255,255,255,0.5)",
              }}
            >
              <div className="grid grid-cols-4 gap-3 sm:gap-6">
                {[
                  { label: "Days", value: countdown.days },
                  { label: "Hours", value: countdown.hours },
                  { label: "Minutes", value: countdown.minutes },
                  { label: "Seconds", value: countdown.seconds },
                ].map((unit, i) => (
                  <div key={unit.label} className="text-center">
                    {/* Candle flame above each box */}
                    <CandleFlame delayClass={flameDelayClasses[i]} />

                    <div
                      className="candle-reveal mx-auto flex h-16 w-16 items-center justify-center rounded-xl sm:h-20 sm:w-20"
                      style={{
                        border: `1px solid ${ROSE}33`,
                        background: `linear-gradient(to top, ${GOLD}0d, ${IVORY}cc)`,
                        backgroundSize: "100% 100%",
                      }}
                    >
                      <span className="font-serif text-2xl font-semibold sm:text-3xl" style={{ color: GOLD }}>
                        {String(unit.value).padStart(2, "0")}
                      </span>
                    </div>
                    <span
                      className="mt-2 block text-[10px] tracking-[0.2em] uppercase"
                      style={{ color: `${CHARCOAL}66` }}
                    >
                      {unit.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm" style={{ color: `${CHARCOAL}73` }}>
                  {formatWeddingDate(invite.weddingDate)}
                  {invite.weddingTime && ` at ${invite.weddingTime}`}
                </p>
                {invite.venue && (
                  <p className="mt-1 flex items-center justify-center gap-1 text-sm" style={{ color: `${CHARCOAL}59` }}>
                    <MapPin className="h-3 w-3" /> {invite.venue}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        <div className="mx-auto max-w-3xl px-4">
          <StainedGlassBorder />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 6 - COUPLE MESSAGE                                      */}
        {/* ---------------------------------------------------------------- */}
        {invite.coupleMessage && (
          <section className="mx-auto max-w-3xl px-4 py-16">
            <div
              className="chapel-reveal rounded-2xl p-8 text-center backdrop-blur-sm sm:p-10"
              style={{
                border: `1px solid ${ROSE}26`,
                backgroundColor: "rgba(255,255,255,0.5)",
              }}
            >
              <DoveSVG className="mx-auto mb-4 h-8 w-10 text-[#C5A55A]/35" />
              <p
                className="font-serif text-lg leading-relaxed italic"
                style={{ color: `${CHARCOAL}bf` }}
              >
                &ldquo;{invite.coupleMessage}&rdquo;
              </p>
              <p className="mt-4 text-sm" style={{ color: `${GOLD}8c` }}>
                &mdash; {invite.groomName} & {invite.brideName}
              </p>
            </div>
          </section>
        )}

        <div className="mx-auto max-w-3xl px-4">
          <OliveBranchAccent />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 7 - RSVP + SHARE BUTTONS                               */}
        {/* ---------------------------------------------------------------- */}
        <section className="mx-auto max-w-3xl px-4 py-16 text-center">
          <div className="chapel-reveal">
            <h2 className="mb-4 font-serif text-3xl" style={{ color: CHARCOAL }}>
              Will You Join Us?
            </h2>
            <p className="mb-8 text-sm" style={{ color: `${CHARCOAL}80` }}>
              We would be honoured to have you share in the joy of this blessed occasion.
            </p>

            {hashtag && (
              <p className="mb-4 font-serif text-lg italic" style={{ color: `${ROSE}b3` }}>
                {hashtag}
              </p>
            )}

            <div className="flex flex-col items-center gap-4">
              <Button
                size="lg"
                className="w-full max-w-xs border text-white shadow-lg"
                style={{
                  backgroundColor: ROSE,
                  borderColor: `${ROSE}66`,
                  boxShadow: `0 10px 25px -5px ${ROSE}26`,
                }}
                onClick={() => setRsvpOpen(true)}
              >
                <Heart className="mr-2 h-4 w-4" />
                RSVP Now
              </Button>

              <div className="flex w-full max-w-xs gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 bg-transparent"
                  style={{
                    borderColor: `${GOLD}4d`,
                    color: GOLD,
                  }}
                  onClick={() => void handleShare()}
                >
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent"
                  style={{
                    borderColor: `${GOLD}4d`,
                    color: GOLD,
                  }}
                  onClick={() => {
                    void fetch("/api/download/invite", { method: "POST" }).then(
                      (r) => {
                        if (r.ok) toast.success("Invite saved to gallery");
                        else toast.error("Unlock your invite to download");
                      },
                    );
                  }}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 8 - FOOTER / WATERMARK                                  */}
        {/* ---------------------------------------------------------------- */}
        <footer className="mx-auto max-w-3xl px-4 pb-8 text-center">
          <StainedGlassBorder className="mx-auto mb-4 h-8 w-full" />

          <div className="chapel-reveal">
            <CrossSymbol className="mx-auto mb-3 h-8 w-8 text-[#C5A55A]/25" />
            <p className="font-serif text-lg" style={{ color: `${CHARCOAL}99` }}>
              {invite.groomName} & {invite.brideName}
            </p>
            <p className="mt-1 text-sm" style={{ color: `${CHARCOAL}59` }}>
              {formatWeddingDate(invite.weddingDate)}
            </p>
            {invite.venue && (
              <p className="mt-1 text-xs" style={{ color: `${CHARCOAL}40` }}>
                {invite.venue}
              </p>
            )}

            <p className="mt-6 text-xs italic" style={{ color: `${CHARCOAL}40` }}>
              What God has joined together, let no one separate
            </p>
          </div>

          <CardoraWatermark className="mt-10 pb-8 text-center text-xs text-[#2D2D2D]/15" />
        </footer>
      </div>

      {/* RSVP Modal */}
      <RsvpModal open={rsvpOpen} onOpenChange={setRsvpOpen} inviteSlug={invite.slug} />
    </div>
  );
}
