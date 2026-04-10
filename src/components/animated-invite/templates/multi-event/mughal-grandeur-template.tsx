"use client";

import { useState, useEffect, useRef, useMemo } from "react";
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
/*  Jharokha Arch SVG - Mughal window/arch ornamental frame                    */
/* -------------------------------------------------------------------------- */

function JharokhaArch({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 260 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "mx-auto h-48 w-40 text-[#FFD700]"}
    >
      {/* Outer arch frame */}
      <path
        className="jharokha-draw"
        d="M30 300 L30 120 Q30 30 130 30 Q230 30 230 120 L230 300"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        opacity="0.5"
      />
      {/* Inner arch frame */}
      <path
        className="jharokha-draw"
        d="M50 300 L50 130 Q50 55 130 55 Q210 55 210 130 L210 300"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.35"
      />
      {/* Keystone ornament at top */}
      <path
        className="jharokha-draw"
        d="M125 32 L130 20 L135 32"
        stroke="currentColor"
        strokeWidth="2"
        fill="currentColor"
        opacity="0.5"
      />
      <circle className="jharokha-draw" cx="130" cy="18" r="4" fill="currentColor" opacity="0.4" />
      {/* Scalloped inner arch detail */}
      <path
        className="jharokha-draw"
        d="M65 300 L65 140 Q65 80 100 65 Q115 60 130 60 Q145 60 160 65 Q195 80 195 140 L195 300"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity="0.2"
      />
      {/* Cusped arch points */}
      <path className="jharokha-draw" d="M80 110 Q90 95 100 105" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
      <path className="jharokha-draw" d="M180 110 Q170 95 160 105" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
      {/* Pillar bases */}
      <rect className="jharokha-draw" x="25" y="280" width="15" height="20" rx="2" fill="currentColor" opacity="0.15" />
      <rect className="jharokha-draw" x="220" y="280" width="15" height="20" rx="2" fill="currentColor" opacity="0.15" />
      {/* Decorative bands on pillars */}
      <line className="jharokha-draw" x1="30" y1="200" x2="40" y2="200" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <line className="jharokha-draw" x1="220" y1="200" x2="230" y2="200" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <line className="jharokha-draw" x1="30" y1="240" x2="40" y2="240" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <line className="jharokha-draw" x1="220" y1="240" x2="230" y2="240" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Jali Pattern SVG - Intricate lattice pattern border                        */
/* -------------------------------------------------------------------------- */

function JaliPattern({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "mx-auto my-6 h-12 w-full text-[#FFD700]"}
    >
      {/* Repeating jali lattice diamonds */}
      {[0, 60, 120, 180, 240, 300, 360, 420, 480, 540].map((x) => (
        <g key={x} transform={`translate(${x}, 0)`}>
          {/* Main diamond */}
          <path
            d="M30 5 L50 30 L30 55 L10 30 Z"
            stroke="currentColor"
            strokeWidth="0.8"
            fill="none"
            opacity="0.3"
          />
          {/* Inner diamond */}
          <path
            d="M30 15 L40 30 L30 45 L20 30 Z"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            opacity="0.25"
          />
          {/* Center dot */}
          <circle cx="30" cy="30" r="2" fill="currentColor" opacity="0.4" />
          {/* Cross lattice lines */}
          <line x1="30" y1="5" x2="30" y2="15" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
          <line x1="30" y1="45" x2="30" y2="55" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
          <line x1="10" y1="30" x2="20" y2="30" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
          <line x1="40" y1="30" x2="50" y2="30" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
        </g>
      ))}
      {/* Top and bottom border lines */}
      <line x1="0" y1="1" x2="600" y2="1" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <line x1="0" y1="59" x2="600" y2="59" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Pietra Dura Inlay SVG - Floral inlay decorative element                    */
/* -------------------------------------------------------------------------- */

function PietraDuraInlay({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "mx-auto my-6 h-10 w-64 text-[#FFD700]"}
    >
      {/* Central flower */}
      <circle cx="150" cy="25" r="6" fill="currentColor" opacity="0.35" />
      <circle cx="150" cy="25" r="3" fill="currentColor" opacity="0.55" />
      {/* Petals radiating outward */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const px = 150 + Math.cos(rad) * 12;
        const py = 25 + Math.sin(rad) * 12;
        return (
          <ellipse
            key={angle}
            cx={px}
            cy={py}
            rx="4"
            ry="2.5"
            transform={`rotate(${angle}, ${px}, ${py})`}
            fill="currentColor"
            opacity="0.2"
          />
        );
      })}
      {/* Left vine */}
      <path
        d="M130 25 Q110 15 85 25 Q65 32 45 25 Q30 20 15 25"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        opacity="0.35"
      />
      {/* Left leaves */}
      <ellipse cx="85" cy="22" rx="6" ry="3" transform="rotate(-20, 85, 22)" fill="currentColor" opacity="0.15" />
      <ellipse cx="50" cy="28" rx="5" ry="2.5" transform="rotate(15, 50, 28)" fill="currentColor" opacity="0.15" />
      {/* Right vine */}
      <path
        d="M170 25 Q190 15 215 25 Q235 32 255 25 Q270 20 285 25"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        opacity="0.35"
      />
      {/* Right leaves */}
      <ellipse cx="215" cy="22" rx="6" ry="3" transform="rotate(20, 215, 22)" fill="currentColor" opacity="0.15" />
      <ellipse cx="250" cy="28" rx="5" ry="2.5" transform="rotate(-15, 250, 28)" fill="currentColor" opacity="0.15" />
      {/* Terminal buds */}
      <circle cx="15" cy="25" r="2.5" fill="currentColor" opacity="0.25" />
      <circle cx="285" cy="25" r="2.5" fill="currentColor" opacity="0.25" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Mughal Rose SVG - Stylized rose motif                                      */
/* -------------------------------------------------------------------------- */

function MughalRose({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "h-12 w-12 text-[#FFD700]"}
    >
      {/* Outer petals */}
      <ellipse cx="50" cy="30" rx="12" ry="18" fill="currentColor" opacity="0.15" />
      <ellipse cx="70" cy="50" rx="18" ry="12" fill="currentColor" opacity="0.15" />
      <ellipse cx="50" cy="70" rx="12" ry="18" fill="currentColor" opacity="0.15" />
      <ellipse cx="30" cy="50" rx="18" ry="12" fill="currentColor" opacity="0.15" />
      {/* Inner petals */}
      <ellipse cx="50" cy="38" rx="8" ry="12" fill="currentColor" opacity="0.25" />
      <ellipse cx="62" cy="50" rx="12" ry="8" fill="currentColor" opacity="0.25" />
      <ellipse cx="50" cy="62" rx="8" ry="12" fill="currentColor" opacity="0.25" />
      <ellipse cx="38" cy="50" rx="12" ry="8" fill="currentColor" opacity="0.25" />
      {/* Center circle */}
      <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.3" />
      <circle cx="50" cy="50" r="4" fill="currentColor" opacity="0.5" />
      {/* Stamen dots */}
      <circle cx="50" cy="42" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="58" cy="50" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="50" cy="58" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="42" cy="50" r="1.5" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Jali Lattice Overlay SVG - full-card decorative lattice for dissolve       */
/* -------------------------------------------------------------------------- */

function JaliOverlay() {
  return (
    <svg
      viewBox="0 0 200 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none absolute inset-0 h-full w-full text-[#FFD700]"
      preserveAspectRatio="none"
    >
      {/* Dense lattice pattern */}
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 4 }).map((_, col) => {
          const cx = 25 + col * 50;
          const cy = 26 + row * 52;
          return (
            <g key={`${row}-${col}`}>
              <path
                d={`M${cx} ${cy - 20} L${cx + 20} ${cy} L${cx} ${cy + 20} L${cx - 20} ${cy} Z`}
                stroke="currentColor"
                strokeWidth="1.2"
                fill="currentColor"
                fillOpacity="0.06"
                opacity="0.5"
              />
              <path
                d={`M${cx} ${cy - 10} L${cx + 10} ${cy} L${cx} ${cy + 10} L${cx - 10} ${cy} Z`}
                stroke="currentColor"
                strokeWidth="0.6"
                fill="none"
                opacity="0.4"
              />
              <circle cx={cx} cy={cy} r="2" fill="currentColor" opacity="0.5" />
            </g>
          );
        }),
      )}
      {/* Horizontal connecting lines */}
      {Array.from({ length: 6 }).map((_, i) => (
        <line
          key={`h-${i}`}
          x1="0"
          y1={i * 52}
          x2="200"
          y2={i * 52}
          stroke="currentColor"
          strokeWidth="0.4"
          opacity="0.15"
        />
      ))}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Mughal Garden Divider - decorative band between sections                   */
/* -------------------------------------------------------------------------- */

function MughalGardenDivider() {
  return (
    <div className="relative my-12 overflow-hidden py-4">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0D6B3D]/30 to-transparent" />
      <svg
        viewBox="0 0 800 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative mx-auto h-10 w-full text-[#FFD700]"
        preserveAspectRatio="none"
      >
        {/* Central lotus */}
        <circle cx="400" cy="25" r="8" fill="currentColor" opacity="0.3" />
        <circle cx="400" cy="25" r="4" fill="currentColor" opacity="0.5" />
        {[0, 60, 120, 180, 240, 300].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const px = 400 + Math.cos(rad) * 15;
          const py = 25 + Math.sin(rad) * 15;
          return (
            <ellipse
              key={angle}
              cx={px}
              cy={py}
              rx="5"
              ry="3"
              transform={`rotate(${angle}, ${px}, ${py})`}
              fill="currentColor"
              opacity="0.15"
            />
          );
        })}
        {/* Left flowing vine */}
        <path
          d="M380 25 Q340 12 300 25 Q260 38 220 25 Q180 12 140 25 Q100 38 60 25 Q30 15 0 25"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          opacity="0.25"
        />
        {/* Right flowing vine */}
        <path
          d="M420 25 Q460 12 500 25 Q540 38 580 25 Q620 12 660 25 Q700 38 740 25 Q770 15 800 25"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          opacity="0.25"
        />
        {/* Small flowers along vines */}
        {[140, 220, 300, 500, 580, 660].map((x) => (
          <g key={x}>
            <circle cx={x} cy="25" r="3" fill="currentColor" opacity="0.2" />
            <circle cx={x} cy="25" r="1.5" fill="currentColor" opacity="0.35" />
          </g>
        ))}
        {/* Top and bottom border lines */}
        <line x1="50" y1="3" x2="750" y2="3" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
        <line x1="50" y1="47" x2="750" y2="47" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Rose Petal - Framer Motion floating petal component                        */
/* -------------------------------------------------------------------------- */

function RosePetal({ delay, size, startX, color }: { delay: number; size: number; startX: number; color: string }) {
  return (
    <motion.div
      className="pointer-events-none fixed z-[5]"
      style={{
        width: size,
        height: size * 0.65,
        borderRadius: "50% 50% 50% 0%",
        backgroundColor: color,
        left: `${startX}%`,
        top: -20,
      }}
      initial={{ opacity: 0, y: -20, rotate: 0 }}
      animate={{
        opacity: [0, 0.25, 0.2, 0.15, 0],
        y: ["-2vh", "105vh"],
        x: [0, 30, -20, 40, -10, 25],
        rotate: [0, 90, 180, 270, 360],
      }}
      transition={{
        duration: 18 + Math.random() * 12,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  Rose Petals Layer - Ambient floating petals using Framer Motion            */
/* -------------------------------------------------------------------------- */

function RosePetalsLayer() {
  const petals = useMemo(() => {
    const colors = ["#FF6B6B", "#FFB4B4", "#FF8E8E"];
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      delay: i * 1.8,
      size: 5 + Math.random() * 5,
      startX: Math.random() * 100,
      color: colors[i % colors.length]!,
    }));
  }, []);

  return (
    <>
      {petals.map((p) => (
        <RosePetal key={p.id} delay={p.delay} size={p.size} startX={p.startX} color={p.color} />
      ))}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Mughal Event Card - Jali lattice overlay dissolves to reveal content        */
/* -------------------------------------------------------------------------- */

function MughalEventCard({
  event,
  index,
}: {
  event: { name: string; date: string; venue: string; time: string };
  index: number;
}) {
  return (
    <div className="jali-card relative">
      <div
        className="relative overflow-hidden rounded-b-2xl border border-[#FFD700]/25 bg-gradient-to-b from-[#006B3C]/70 to-[#002a18]/90 p-6 pt-10 shadow-lg shadow-black/25 backdrop-blur-sm"
        style={{
          clipPath:
            "polygon(0 15%, 5% 5%, 15% 1%, 30% 0%, 50% 0%, 70% 0%, 85% 1%, 95% 5%, 100% 15%, 100% 100%, 0% 100%)",
        }}
      >
        {/* Jali lattice overlay that dissolves away */}
        <div className="jali-overlay pointer-events-none absolute inset-0 z-10 bg-[#051A0D]/80">
          <JaliOverlay />
        </div>

        {/* Top arch jali accent */}
        <div className="pointer-events-none absolute top-0 right-0 left-0">
          <svg viewBox="0 0 200 16" className="h-4 w-full text-[#FFD700]" preserveAspectRatio="none">
            {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180].map((x) => (
              <g key={x}>
                <path
                  d={`M${x + 10} 2 L${x + 15} 8 L${x + 10} 14 L${x + 5} 8 Z`}
                  stroke="currentColor"
                  strokeWidth="0.5"
                  fill="none"
                  opacity="0.2"
                />
                <circle cx={x + 10} cy={8} r="1" fill="currentColor" opacity="0.25" />
              </g>
            ))}
            <line x1="0" y1="15" x2="200" y2="15" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
          </svg>
        </div>

        {/* Event icon */}
        <div className="mb-4 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#FFD700]/40 bg-[#FFD700]/10">
            <span className="text-lg">
              {index === 0 && "\uD83C\uDFB5"}
              {index === 1 && "\uD83C\uDF3F"}
              {index === 2 && "\uD83D\uDD4C"}
              {index === 3 && "\uD83C\uDF7D\uFE0F"}
              {index === 4 && "\uD83C\uDFAA"}
              {index > 4 && "\u2728"}
            </span>
          </div>
        </div>

        {/* Event name */}
        <h3 className="mb-3 text-center font-serif text-2xl font-semibold tracking-wide text-[#FFD700]">
          {event.name}
        </h3>

        {/* Gold divider */}
        <div className="mx-auto mb-3 h-px w-16 bg-gradient-to-r from-transparent via-[#FFD700]/60 to-transparent" />

        {/* Date & Time */}
        <div className="mb-2 flex items-center justify-center gap-2 text-sm text-[#FFFFF0]/80">
          <Calendar className="h-3.5 w-3.5 text-[#FFD700]/70" />
          <span>{event.date}</span>
        </div>
        <div className="mb-2 flex items-center justify-center gap-2 text-sm text-[#FFFFF0]/80">
          <Clock className="h-3.5 w-3.5 text-[#FFD700]/70" />
          <span>{event.time}</span>
        </div>

        {/* Venue */}
        <div className="flex items-center justify-center gap-2 text-sm text-[#FFFFF0]/60">
          <MapPin className="h-3.5 w-3.5 text-[#FFD700]/50" />
          <span>{event.venue}</span>
        </div>

        {/* Corner arch details */}
        <div className="pointer-events-none absolute bottom-2 left-2 h-6 w-6 border-b border-l border-[#FFD700]/15" />
        <div className="pointer-events-none absolute bottom-2 right-2 h-6 w-6 border-b border-r border-[#FFD700]/15" />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Template Component                                                    */
/* -------------------------------------------------------------------------- */

export default function MughalGrandeurTemplate({ invite, isDemo }: TemplateProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const { isPlaying, toggle } = useMusicPlayer(invite.musicUrl);
  const countdown = useCountdown(invite.weddingDate);

  // Initialize Lenis smooth scrolling
  useLenis();

  // GSAP ScrollTrigger animations - Imperial Unfolding Theme
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ---- Hero: Jharokha Arch draws itself from bottom to top ---- */
      const archPaths = gsap.utils.toArray<SVGPathElement | SVGLineElement | SVGRectElement | SVGCircleElement>(".jharokha-draw");
      archPaths.forEach((el) => {
        if (el instanceof SVGPathElement || el instanceof SVGLineElement || el instanceof SVGCircleElement) {
          const length = el instanceof SVGPathElement ? el.getTotalLength() : el instanceof SVGLineElement ? el.getTotalLength() : 30;
          gsap.set(el, { strokeDasharray: length, strokeDashoffset: length });
        }
      });

      const heroTl = gsap.timeline({ delay: 0.3 });
      heroTl.to(".jharokha-draw", {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut",
        stagger: 0.05,
      });
      heroTl.fromTo(
        ".hero-content-reveal",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.15 },
        "-=0.5",
      );

      /* ---- Event Cards: Jali lattice overlay dissolves away ---- */
      gsap.utils.toArray<HTMLElement>(".jali-card").forEach((el, i) => {
        const overlay = el.querySelector(".jali-overlay");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
        tl.fromTo(
          el,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, delay: i * 0.2, ease: "power2.out" },
        );
        if (overlay) {
          tl.fromTo(
            overlay,
            { opacity: 1 },
            { opacity: 0, duration: 0.8, ease: "power1.inOut" },
            "-=0.4",
          );
        }
      });

      /* ---- Section reveals: gentle scale + opacity ---- */
      gsap.utils.toArray<HTMLElement>(".mughal-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50, scaleY: 0.95 },
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      /* ---- Parallax effect for background pattern ---- */
      gsap.utils.toArray<HTMLElement>(".parallax-pattern").forEach((el) => {
        gsap.to(el, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      /* ---- Countdown boxes: scale up from center with golden shimmer ---- */
      gsap.utils.toArray<HTMLElement>(".mughal-countdown").forEach((el, i) => {
        const shimmer = el.querySelector(".countdown-shimmer");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });

        tl.fromTo(
          el,
          { opacity: 0, scale: 0.4 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: i * 0.12,
            ease: "power3.out",
          },
        );

        if (shimmer) {
          tl.fromTo(
            shimmer,
            { backgroundPosition: "-200% 0" },
            {
              backgroundPosition: "200% 0",
              duration: 1.2,
              ease: "power1.inOut",
            },
            "-=0.1",
          );
        }
      });

      /* ---- Gallery images: staggered reveal with ornamental border glow ---- */
      gsap.utils.toArray<HTMLElement>(".gallery-item").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.85, rotateY: 15 },
          {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 0.7,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Default events for Mughal wedding
  const events = invite.events ?? [
    { name: "Dholki", date: "Date TBA", venue: invite.venue ?? "Venue TBA", time: "7 PM" },
    { name: "Mehendi", date: "Date TBA", venue: invite.venue ?? "Venue TBA", time: "6 PM" },
    { name: "Nikkah Ceremony", date: invite.weddingDate ?? "Date TBA", venue: invite.venue ?? "Venue TBA", time: "11 AM" },
    { name: "Walima", date: invite.receptionDate ?? "Date TBA", venue: invite.venue ?? "Venue TBA", time: "7 PM" },
    { name: "Reception", date: invite.receptionDate ?? "Date TBA", venue: invite.venue ?? "Venue TBA", time: "8 PM" },
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

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#051A0D] via-[#0A2E1A] to-[#051A0D] text-[#FFF8E7]"
    >
      {/* Gold leaf floating particles */}
      <ParticleLayer type="LIGHT" />

      {/* Rose petals - gentle ambient drift (Framer Motion) */}
      <RosePetalsLayer />

      {/* Subtle jali lattice pattern overlay */}
      <div className="parallax-pattern pointer-events-none fixed inset-0 z-0 opacity-[0.04]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23FFD700' stroke-width='0.5'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z'/%3E%3Cpath d='M30 10L50 30L30 50L10 30Z'/%3E%3Ccircle cx='30' cy='30' r='5'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Music toggle */}
      {invite.musicUrl && (
        <MusicToggleButton
          isPlaying={isPlaying}
          onToggle={toggle}
          className="fixed top-4 right-4 z-50 rounded-full border border-[#FFD700]/30 bg-[#0A2E1A]/80 p-3 shadow-lg backdrop-blur-sm transition-colors hover:bg-[#0A2E1A]"
        />
      )}

      {/* Demo banner */}
      {isDemo && (
        <div className="relative z-10 bg-gradient-to-r from-[#FFD700] via-[#B76E79] to-[#FFD700] py-2 text-center text-sm font-medium text-[#051A0D]">
          This is a demo preview. Complete payment to use your own details.
        </div>
      )}

      {/* ================================================================== */}
      {/*  HERO SECTION - Full viewport with Jharokha arch draw              */}
      {/* ================================================================== */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4">
        {/* Radial background glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(13,107,61,0.25)_0%,_transparent_70%)]" />

        {/* Jharokha arch frame - draws itself */}
        <div className="relative mx-auto flex justify-center">
          <JharokhaArch className="h-44 w-36 text-[#FFD700]/60 sm:h-56 sm:w-44" />
        </div>

        {/* Bismillah - appears after arch draws */}
        <div className="hero-content-reveal mt-4 mb-2">
          <p
            className="font-serif text-2xl leading-relaxed text-[#FFD700] sm:text-3xl"
            style={{ fontFamily: "serif", direction: "rtl" }}
          >
            &#1576;&#1616;&#1587;&#1618;&#1605;&#1616; &#1575;&#1604;&#1604;&#1617;&#1614;&#1607;&#1616;
          </p>
          <p className="mt-1 text-center text-xs tracking-[0.2em] text-[#FFF8E7]/45 uppercase">
            In the name of Allah
          </p>
        </div>

        <div className="hero-content-reveal">
          <JaliPattern className="mx-auto my-3 h-8 w-64 text-[#FFD700]/50 sm:w-80" />
        </div>

        {/* Parent blessings */}
        <div className="hero-content-reveal mb-6 w-full max-w-lg text-center">
          <p className="mb-2 text-sm tracking-[0.15em] text-[#FFF8E7]/60 uppercase">
            With the blessings of
          </p>
          <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Groom's parents */}
            <div className="text-center">
              {invite.groomFatherName && invite.groomMotherName ? (
                <>
                  <p className="text-xs tracking-wider text-[#FFD700]/70 uppercase">Son of</p>
                  <p className="mt-1 font-serif text-lg text-[#FFF8E7]/90">{invite.groomFatherName}</p>
                  <p className="font-serif text-sm text-[#FFF8E7]/70">& {invite.groomMotherName}</p>
                </>
              ) : invite.groomFatherName ? (
                <>
                  <p className="text-xs tracking-wider text-[#FFD700]/70 uppercase">Son of</p>
                  <p className="mt-1 font-serif text-lg text-[#FFF8E7]/90">{invite.groomFatherName}</p>
                </>
              ) : null}
            </div>

            {/* Bride's parents */}
            <div className="text-center">
              {invite.brideFatherName && invite.brideMotherName ? (
                <>
                  <p className="text-xs tracking-wider text-[#FFD700]/70 uppercase">Daughter of</p>
                  <p className="mt-1 font-serif text-lg text-[#FFF8E7]/90">{invite.brideFatherName}</p>
                  <p className="font-serif text-sm text-[#FFF8E7]/70">& {invite.brideMotherName}</p>
                </>
              ) : invite.brideFatherName ? (
                <>
                  <p className="text-xs tracking-wider text-[#FFD700]/70 uppercase">Daughter of</p>
                  <p className="mt-1 font-serif text-lg text-[#FFF8E7]/90">{invite.brideFatherName}</p>
                </>
              ) : null}
            </div>
          </div>
        </div>

        {/* Invitation text */}
        <p className="hero-content-reveal mb-4 text-sm tracking-[0.15em] text-[#FFF8E7]/50 uppercase">
          Request the honour of your presence at the wedding of
        </p>

        {/* Hero image */}
        {invite.heroImage && (
          <div className="hero-content-reveal mx-auto mb-6 h-56 w-56 overflow-hidden rounded-full border-2 border-[#FFD700]/40 shadow-2xl shadow-[#FFD700]/10 sm:h-64 sm:w-64">
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${invite.heroImage})` }}
            />
          </div>
        )}

        {/* Couple Names */}
        <div className="hero-content-reveal text-center">
          <h1 className="font-serif text-5xl font-light leading-tight text-[#FFD700] sm:text-6xl lg:text-7xl">
            {invite.groomName}
          </h1>

          {/* Gold accent divider with heart */}
          <div className="my-4 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#FFD700]/60 sm:w-24" />
            <Heart className="h-5 w-5 fill-[#B76E79]/50 text-[#FFD700]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#FFD700]/60 sm:w-24" />
          </div>

          <h1 className="font-serif text-5xl font-light leading-tight text-[#FFD700] sm:text-6xl lg:text-7xl">
            {invite.brideName}
          </h1>
        </div>

        {/* Wedding date preview */}
        <p className="hero-content-reveal mt-6 text-base text-[#FFF8E7]/60">
          {formatWeddingDate(invite.weddingDate)}
        </p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 3 }}
          className="mt-12"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto flex flex-col items-center gap-1"
          >
            <span className="text-[10px] tracking-[0.3em] text-[#FFD700]/40 uppercase">Scroll</span>
            <div className="h-8 w-px bg-gradient-to-b from-[#FFD700]/40 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* ================================================================== */}
      {/*  CONTENT - max-w-3xl centered                                      */}
      {/* ================================================================== */}
      <div className="relative z-10">

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 2 - EVENTS                                              */}
        {/* ---------------------------------------------------------------- */}
        <section className="relative py-16">
          {/* Full-width deep green/gold gradient band */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0D6B3D]/20 via-[#0A2E1A]/40 to-[#0D6B3D]/20" />

          <div className="relative mx-auto max-w-3xl px-4">
            <div className="mughal-reveal mb-10 text-center">
              <p className="mb-2 text-xs tracking-[0.3em] text-[#FFD700]/60 uppercase">
                Royal Celebrations
              </p>
              <h2 className="font-serif text-3xl text-[#FFD700] sm:text-4xl">
                Wedding Events
              </h2>
              <PietraDuraInlay className="mx-auto mt-2 h-8 w-48 text-[#FFD700]/40" />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {events.map((event, index) => (
                <MughalEventCard key={index} event={event} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Mughal garden divider band */}
        <MughalGardenDivider />

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 3 - COUPLE PHOTO                                        */}
        {/* ---------------------------------------------------------------- */}
        {invite.couplePhoto && (
          <section className="mx-auto mb-16 max-w-3xl px-4">
            <div className="mughal-reveal relative overflow-hidden rounded-2xl border border-[#FFD700]/20 shadow-xl shadow-black/20">
              {/* Ornamental corner accents */}
              <div className="pointer-events-none absolute top-3 left-3 z-10 h-10 w-10 border-t-2 border-l-2 border-[#FFD700]/30" />
              <div className="pointer-events-none absolute top-3 right-3 z-10 h-10 w-10 border-t-2 border-r-2 border-[#FFD700]/30" />
              <div className="pointer-events-none absolute bottom-3 left-3 z-10 h-10 w-10 border-b-2 border-l-2 border-[#FFD700]/30" />
              <div className="pointer-events-none absolute bottom-3 right-3 z-10 h-10 w-10 border-b-2 border-r-2 border-[#FFD700]/30" />
              <div
                className="aspect-[4/3] w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${invite.couplePhoto})` }}
              />
            </div>
            <div className="mt-4 text-center">
              <p className="font-serif text-lg text-[#FFF8E7]/60 italic">
                {invite.groomName} & {invite.brideName}
              </p>
            </div>
          </section>
        )}

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 4 - GALLERY                                             */}
        {/* ---------------------------------------------------------------- */}
        {invite.galleryImages.length > 0 && (
          <section className="relative mb-16 py-10">
            {/* Full-width background tint for gallery */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#0D6B3D]/10 to-transparent" />

            <div className="relative mx-auto max-w-3xl px-4">
              <div className="mughal-reveal mb-8 text-center">
                <p className="mb-2 text-xs tracking-[0.3em] text-[#FFD700]/60 uppercase">
                  Precious Moments
                </p>
                <h2 className="font-serif text-2xl text-[#FFD700] sm:text-3xl">Gallery</h2>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {invite.galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="gallery-item group relative aspect-square overflow-hidden rounded-xl border border-[#FFD700]/20 shadow-md"
                  >
                    {/* Ornamental top border on each image */}
                    <div className="pointer-events-none absolute top-0 right-0 left-0 z-10 h-1 bg-gradient-to-r from-transparent via-[#FFD700]/40 to-transparent" />
                    <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-1 bg-gradient-to-r from-transparent via-[#FFD700]/20 to-transparent" />
                    <div
                      className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${img})` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="mx-auto max-w-3xl px-4">
          <JaliPattern />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 5 - THINGS TO KNOW                                      */}
        {/* ---------------------------------------------------------------- */}
        {thingsToKnow.length > 0 && (
          <section className="mx-auto mb-16 max-w-3xl px-4">
            <div className="mughal-reveal mb-10 text-center">
              <p className="mb-2 text-xs tracking-[0.3em] text-[#FFD700]/60 uppercase">
                Helpful Information
              </p>
              <h2 className="font-serif text-3xl text-[#FFD700]">
                Things to Know
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {thingsToKnow.map((item, idx) => (
                <div
                  key={idx}
                  className="mughal-reveal relative overflow-hidden rounded-xl border border-[#FFD700]/20 bg-[#0A2E1A]/60 p-5 backdrop-blur-sm"
                >
                  {/* Top golden accent line */}
                  <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/40 to-transparent" />
                  <h3 className="mb-2 font-serif text-lg text-[#FFD700]">
                    {item.label}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#FFF8E7]/60">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 6 - STORY                                               */}
        {/* ---------------------------------------------------------------- */}
        {invite.story && (
          <section className="mx-auto mb-16 max-w-3xl px-4">
            <div className="mughal-reveal relative overflow-hidden rounded-2xl border border-[#FFD700]/20 bg-gradient-to-b from-[#0D6B3D]/30 to-[#0A2E1A]/50 p-8 text-center backdrop-blur-sm sm:p-10">
              {/* Decorative corner arches */}
              <div className="pointer-events-none absolute top-4 left-4 h-12 w-12 border-t border-l border-[#FFD700]/20 rounded-tl-lg" />
              <div className="pointer-events-none absolute top-4 right-4 h-12 w-12 border-t border-r border-[#FFD700]/20 rounded-tr-lg" />
              <div className="pointer-events-none absolute bottom-4 left-4 h-12 w-12 border-b border-l border-[#FFD700]/20 rounded-bl-lg" />
              <div className="pointer-events-none absolute bottom-4 right-4 h-12 w-12 border-b border-r border-[#FFD700]/20 rounded-br-lg" />

              <MughalRose className="mx-auto mb-3 h-10 w-10 text-[#FFD700]/40" />
              <h2 className="mb-2 font-serif text-2xl text-[#FFD700]">
                Our Story
              </h2>
              <PietraDuraInlay className="mx-auto my-4 h-8 w-48 text-[#FFD700]/50" />
              <p className="leading-relaxed text-[#FFF8E7]/70">
                {invite.story}
              </p>
            </div>
          </section>
        )}

        <div className="mx-auto max-w-3xl px-4">
          <PietraDuraInlay />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 7 - COUNTDOWN TIMER                                     */}
        {/* ---------------------------------------------------------------- */}
        {invite.weddingDate && (
          <section className="mx-auto mb-16 max-w-3xl px-4">
            <div className="mughal-reveal mb-8 text-center">
              <p className="mb-2 text-xs tracking-[0.3em] text-[#FFD700]/60 uppercase">
                The Auspicious Day
              </p>
              <h2 className="font-serif text-3xl text-[#FFD700]">
                Counting Down
              </h2>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-[#FFD700]/20 bg-gradient-to-b from-[#0D6B3D]/30 to-[#0A2E1A]/50 p-8 backdrop-blur-sm">
              {/* Decorative top arch */}
              <div className="pointer-events-none absolute top-0 right-0 left-0">
                <svg viewBox="0 0 400 20" className="h-5 w-full text-[#FFD700]" preserveAspectRatio="none">
                  <path d="M0 20 Q100 0 200 0 Q300 0 400 20" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.2" />
                  <path d="M50 20 Q150 5 200 5 Q250 5 350 20" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.15" />
                </svg>
              </div>

              <div className="grid grid-cols-4 gap-3 sm:gap-6">
                {[
                  { label: "Days", value: countdown.days },
                  { label: "Hours", value: countdown.hours },
                  { label: "Minutes", value: countdown.minutes },
                  { label: "Seconds", value: countdown.seconds },
                ].map((unit) => (
                  <div key={unit.label} className="mughal-countdown text-center">
                    <div
                      className="relative mx-auto flex h-18 w-18 items-center justify-center overflow-hidden border border-[#FFD700]/30 bg-[#051A0D]/70 sm:h-22 sm:w-22"
                      style={{
                        clipPath:
                          "polygon(50% 0%, 95% 15%, 100% 50%, 95% 85%, 50% 100%, 5% 85%, 0% 50%, 5% 15%)",
                      }}
                    >
                      {/* Golden shimmer overlay */}
                      <div
                        className="countdown-shimmer pointer-events-none absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent 0%, rgba(255,215,0,0.15) 50%, transparent 100%)",
                          backgroundSize: "200% 100%",
                          backgroundPosition: "-200% 0",
                        }}
                      />
                      <span className="relative z-10 font-serif text-2xl font-semibold text-[#FFD700] sm:text-3xl">
                        {String(unit.value).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="mt-2 block text-[10px] tracking-[0.2em] text-[#FFF8E7]/50 uppercase">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-[#FFF8E7]/50">
                  {formatWeddingDate(invite.weddingDate)}
                  {invite.weddingTime && ` at ${invite.weddingTime}`}
                </p>
                {invite.venue && (
                  <p className="mt-1 flex items-center justify-center gap-1 text-sm text-[#FFF8E7]/40">
                    <MapPin className="h-3 w-3" /> {invite.venue}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        <div className="mx-auto max-w-3xl px-4">
          <JaliPattern />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 8 - COUPLE MESSAGE                                      */}
        {/* ---------------------------------------------------------------- */}
        {invite.coupleMessage && (
          <section className="mx-auto mb-16 max-w-3xl px-4">
            <div className="mughal-reveal relative overflow-hidden rounded-2xl border border-[#FFD700]/20 bg-gradient-to-b from-[#0D6B3D]/30 to-[#0A2E1A]/50 p-8 text-center backdrop-blur-sm sm:p-10">
              {/* Top arch ornament */}
              <div className="pointer-events-none absolute top-0 right-0 left-0 flex justify-center">
                <svg viewBox="0 0 120 30" className="h-8 w-24 text-[#FFD700]">
                  <path d="M10 30 L10 12 Q10 2 60 2 Q110 2 110 12 L110 30" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.25" />
                  <circle cx="60" cy="4" r="2" fill="currentColor" opacity="0.3" />
                </svg>
              </div>

              <MughalRose className="mx-auto mb-4 h-10 w-10 text-[#B76E79]/50" />
              <p className="font-serif text-lg leading-relaxed text-[#FFF8E7]/80 italic">
                &ldquo;{invite.coupleMessage}&rdquo;
              </p>
              <p className="mt-4 text-sm text-[#FFD700]/60">
                &mdash; {invite.groomName} & {invite.brideName}
              </p>
            </div>
          </section>
        )}

        <div className="mx-auto max-w-3xl px-4">
          <PietraDuraInlay />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 9 - RSVP + SHARE BUTTONS                               */}
        {/* ---------------------------------------------------------------- */}
        <section className="mx-auto mb-16 max-w-3xl px-4 text-center">
          <div className="mughal-reveal">
            <JharokhaArch className="mx-auto mb-4 h-20 w-16 text-[#FFD700]/30" />
            <h2 className="mb-4 font-serif text-3xl text-[#FFD700]">
              Will You Join Us?
            </h2>
            <p className="mb-8 text-sm text-[#FFF8E7]/60">
              We would be honoured to have you celebrate this grand occasion with us.
            </p>

            {hashtag && (
              <p className="mb-4 font-serif text-lg text-[#B76E79]/80 italic">
                {hashtag}
              </p>
            )}

            <div className="flex flex-col items-center gap-4">
              <Button
                size="lg"
                className="w-full max-w-xs border border-[#FFD700]/50 bg-[#FFD700] text-[#051A0D] shadow-lg shadow-[#FFD700]/20 transition-all hover:bg-[#FFD700]/90 hover:shadow-[#FFD700]/30"
                onClick={() => setRsvpOpen(true)}
              >
                <Heart className="mr-2 h-4 w-4" />
                RSVP Now
              </Button>

              <div className="flex w-full max-w-xs gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 border-[#FFD700]/30 bg-transparent text-[#FFD700] hover:bg-[#FFD700]/10 hover:text-[#FFD700]"
                  onClick={() => void handleShare()}
                >
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#FFD700]/30 bg-transparent text-[#FFD700] hover:bg-[#FFD700]/10 hover:text-[#FFD700]"
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
        {/*  SECTION 10 - FOOTER / WATERMARK                                 */}
        {/* ---------------------------------------------------------------- */}
        <footer className="mx-auto max-w-3xl px-4 pb-8 text-center">
          <JaliPattern className="mx-auto mb-4 h-10 w-full text-[#FFD700]/25" />

          <div className="mughal-reveal">
            <MughalRose className="mx-auto mb-3 h-8 w-8 text-[#FFD700]/25" />
            <p className="font-serif text-lg text-[#FFD700]/70">
              {invite.groomName} & {invite.brideName}
            </p>
            <p className="mt-1 text-sm text-[#FFF8E7]/40">
              {formatWeddingDate(invite.weddingDate)}
            </p>
            {invite.venue && (
              <p className="mt-1 text-xs text-[#FFF8E7]/30">
                {invite.venue}
              </p>
            )}

            <p className="mt-6 text-xs text-[#FFF8E7]/30 italic">
              May this blessed union flourish like the gardens of paradise
            </p>
          </div>

          <CardoraWatermark className="mt-10 pb-8 text-center text-xs text-[#FFF8E7]/20" />
        </footer>
      </div>

      {/* RSVP Modal */}
      <RsvpModal open={rsvpOpen} onOpenChange={setRsvpOpen} inviteSlug={invite.slug} />
    </div>
  );
}
