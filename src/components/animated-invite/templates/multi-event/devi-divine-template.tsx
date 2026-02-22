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
/*  CSS Keyframes for Diya Flame Flicker                                       */
/* -------------------------------------------------------------------------- */

const DIYA_STYLES = `
@keyframes diyaFlameFlicker {
  0%   { transform: scaleY(1)   scaleX(1)   translateY(0);   opacity: 0.9; }
  10%  { transform: scaleY(1.1) scaleX(0.9) translateY(-1px); opacity: 1;   }
  20%  { transform: scaleY(0.9) scaleX(1.1) translateY(0.5px); opacity: 0.8; }
  30%  { transform: scaleY(1.05) scaleX(0.95) translateY(-0.5px); opacity: 0.95; }
  40%  { transform: scaleY(0.95) scaleX(1.05) translateY(0);   opacity: 0.85; }
  50%  { transform: scaleY(1.12) scaleX(0.88) translateY(-1.5px); opacity: 1;   }
  60%  { transform: scaleY(0.92) scaleX(1.08) translateY(0.5px); opacity: 0.82; }
  70%  { transform: scaleY(1.08) scaleX(0.92) translateY(-0.8px); opacity: 0.92; }
  80%  { transform: scaleY(0.97) scaleX(1.03) translateY(0);   opacity: 0.88; }
  90%  { transform: scaleY(1.06) scaleX(0.94) translateY(-1px); opacity: 0.96; }
  100% { transform: scaleY(1)   scaleX(1)   translateY(0);   opacity: 0.9; }
}

@keyframes diyaGlow {
  0%, 100% { filter: blur(3px) brightness(1); }
  25%      { filter: blur(4px) brightness(1.2); }
  50%      { filter: blur(3.5px) brightness(0.9); }
  75%      { filter: blur(4.5px) brightness(1.1); }
}

@keyframes lotusFloat {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  33%      { transform: translateY(-6px) rotate(2deg); }
  66%      { transform: translateY(-3px) rotate(-1deg); }
}
`;

/* -------------------------------------------------------------------------- */
/*  Lotus Mandala SVG with 3 petal rings for animation                         */
/* -------------------------------------------------------------------------- */

function LotusMandala({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "h-28 w-28 text-[#FFD700]"}
    >
      {/* Ring 3 (outermost) - 12 petals */}
      {Array.from({ length: 12 }, (_, i) => (
        <ellipse
          key={`outer-${i}`}
          className="mandala-petal-3"
          cx="100"
          cy="40"
          rx="12"
          ry="30"
          fill="currentColor"
          opacity="0.15"
          transform={`rotate(${i * 30} 100 100)`}
        />
      ))}
      {/* Ring 2 (middle) - 8 petals */}
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse
          key={`mid-${i}`}
          className="mandala-petal-2"
          cx="100"
          cy="55"
          rx="10"
          ry="22"
          fill="currentColor"
          opacity="0.25"
          transform={`rotate(${i * 45} 100 100)`}
        />
      ))}
      {/* Ring 1 (innermost) - 6 petals */}
      {Array.from({ length: 6 }, (_, i) => (
        <ellipse
          key={`inner-${i}`}
          className="mandala-petal-1"
          cx="100"
          cy="68"
          rx="8"
          ry="16"
          fill="currentColor"
          opacity="0.35"
          transform={`rotate(${i * 60} 100 100)`}
        />
      ))}
      {/* Center circles */}
      <circle cx="100" cy="100" r="18" fill="currentColor" opacity="0.12" />
      <circle cx="100" cy="100" r="12" fill="currentColor" opacity="0.2" />
      <circle cx="100" cy="100" r="6" fill="currentColor" opacity="0.4" />
      {/* Outer concentric rings */}
      <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.15" />
      <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.1" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Diya Lamp SVG                                                              */
/* -------------------------------------------------------------------------- */

function DiyaLamp({ className, mirror }: { className?: string; mirror?: boolean }) {
  return (
    <svg
      viewBox="0 0 40 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "h-10 w-7"}
      style={mirror ? { transform: "scaleX(-1)" } : undefined}
    >
      {/* Flame glow */}
      <ellipse
        cx="20"
        cy="14"
        rx="7"
        ry="10"
        fill="#FF9933"
        opacity="0.15"
        style={{ animation: "diyaGlow 2s ease-in-out infinite" }}
      />
      {/* Flame */}
      <path
        d="M20 6 C22 10 25 14 23 18 C22 20 18 20 17 18 C15 14 18 10 20 6Z"
        fill="#FFD700"
        opacity="0.9"
        style={{ animation: "diyaFlameFlicker 1.5s ease-in-out infinite", transformOrigin: "20px 18px" }}
      />
      {/* Inner flame */}
      <path
        d="M20 10 C21 13 22.5 15 21.5 17 C21 18 19 18 18.5 17 C17.5 15 19 13 20 10Z"
        fill="#FFF8E7"
        opacity="0.7"
        style={{ animation: "diyaFlameFlicker 1.2s ease-in-out infinite 0.3s", transformOrigin: "20px 17px" }}
      />
      {/* Wick */}
      <line x1="20" y1="18" x2="20" y2="22" stroke="#FF9933" strokeWidth="1" opacity="0.6" />
      {/* Lamp bowl */}
      <path
        d="M10 24 Q10 22 14 22 L26 22 Q30 22 30 24 L28 34 Q27 38 20 38 Q13 38 12 34 Z"
        fill="#FF9933"
        opacity="0.5"
      />
      <path
        d="M12 24 Q12 23 15 23 L25 23 Q28 23 28 24 L26.5 32 Q26 35 20 35 Q14 35 13.5 32 Z"
        fill="#FFD700"
        opacity="0.2"
      />
      {/* Oil */}
      <ellipse cx="20" cy="24" rx="8" ry="2" fill="#FF9933" opacity="0.3" />
      {/* Base */}
      <path d="M14 38 L12 42 Q12 44 20 44 Q28 44 28 42 L26 38" fill="#FF9933" opacity="0.4" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Divine Border SVG (lotus-petal shaped section top)                          */
/* -------------------------------------------------------------------------- */

function DivineBorder({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "mx-auto mb-6 h-6 w-full text-[#FFD700]"}
    >
      {/* Central lotus-petal motif */}
      <path
        d="M180 28 Q190 10 200 4 Q210 10 220 28"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M165 28 Q180 8 200 2 Q220 8 235 28"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
        opacity="0.25"
      />
      <circle cx="200" cy="6" r="2" fill="currentColor" opacity="0.5" />

      {/* Side petals */}
      {[140, 260].map((x) => (
        <g key={x}>
          <path
            d={`M${x - 10} 28 Q${x} 16 ${x + 10} 28`}
            stroke="currentColor"
            strokeWidth="0.6"
            fill="none"
            opacity="0.3"
          />
          <circle cx={x} cy="18" r="1.5" fill="currentColor" opacity="0.35" />
        </g>
      ))}

      {/* Extended flowing lines */}
      <path d="M130 26 Q100 24 60 26 Q30 27 10 26" stroke="currentColor" strokeWidth="0.4" fill="none" opacity="0.2" />
      <path d="M270 26 Q300 24 340 26 Q370 27 390 26" stroke="currentColor" strokeWidth="0.4" fill="none" opacity="0.2" />

      {/* End dots */}
      <circle cx="10" cy="26" r="1.5" fill="currentColor" opacity="0.2" />
      <circle cx="390" cy="26" r="1.5" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Lotus Divider between events                                               */
/* -------------------------------------------------------------------------- */

function LotusDivider({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "mx-auto my-4 h-6 w-32 text-[#FFD700]"}
    >
      {/* Center lotus bud */}
      <path d="M90 30 Q95 15 100 8 Q105 15 110 30" fill="currentColor" opacity="0.2" />
      <path d="M85 32 Q92 12 100 5 Q108 12 115 32" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.3" />
      <circle cx="100" cy="10" r="2" fill="#FF69B4" opacity="0.4" />

      {/* Side curves */}
      <path d="M85 28 Q60 22 30 28" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.2" />
      <path d="M115 28 Q140 22 170 28" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.2" />
      <circle cx="30" cy="28" r="1.5" fill="currentColor" opacity="0.2" />
      <circle cx="170" cy="28" r="1.5" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Rangoli Pattern SVG                                                        */
/* -------------------------------------------------------------------------- */

function RangoliPattern({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "mx-auto my-4 h-8 w-56 text-[#FFD700]"}
    >
      {/* Center diamond */}
      <path d="M150 8 L160 20 L150 32 L140 20 Z" fill="currentColor" opacity="0.3" />
      <path d="M150 12 L156 20 L150 28 L144 20 Z" fill="#FF69B4" opacity="0.2" />
      <circle cx="150" cy="20" r="2.5" fill="currentColor" opacity="0.5" />

      {/* Dot patterns radiating outward */}
      {[125, 175].map((x) => (
        <g key={x}>
          <circle cx={x} cy="20" r="2" fill="currentColor" opacity="0.3" />
          <circle cx={x - (x < 150 ? 5 : -5)} cy="14" r="1.2" fill="#FF69B4" opacity="0.2" />
          <circle cx={x - (x < 150 ? 5 : -5)} cy="26" r="1.2" fill="#FF69B4" opacity="0.2" />
        </g>
      ))}

      {/* Flowing curves */}
      <path d="M130 20 Q105 10 75 20 Q55 25 35 20 Q20 17 10 20" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.3" />
      <path d="M170 20 Q195 10 225 20 Q245 25 265 20 Q280 17 290 20" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.3" />

      {/* Small ornaments */}
      <path d="M75 17 L78 20 L75 23 L72 20 Z" fill="currentColor" opacity="0.25" />
      <path d="M225 17 L228 20 L225 23 L222 20 Z" fill="currentColor" opacity="0.25" />

      {/* End circles */}
      <circle cx="10" cy="20" r="2" fill="currentColor" opacity="0.25" />
      <circle cx="290" cy="20" r="2" fill="currentColor" opacity="0.25" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section Heading with Diya Flanks                                           */
/* -------------------------------------------------------------------------- */

function SectionHeading({
  subtitle,
  title,
}: {
  subtitle?: string;
  title: string;
}) {
  return (
    <div className="devi-reveal mb-10 text-center">
      {subtitle && (
        <p className="mb-2 text-xs tracking-[0.3em] text-[#FF69B4]/60 uppercase">
          {subtitle}
        </p>
      )}
      <div className="flex items-center justify-center gap-3">
        <DiyaLamp className="h-8 w-5 flex-shrink-0" mirror />
        <h2 className="font-serif text-3xl text-[#FFD700] sm:text-4xl">
          {title}
        </h2>
        <DiyaLamp className="h-8 w-5 flex-shrink-0" />
      </div>
      <DivineBorder className="mt-3 h-5 w-48 text-[#FFD700]/40 sm:w-56" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Lotus-petal Event Card                                                     */
/* -------------------------------------------------------------------------- */

function LotusEventCard({
  event,
  index,
}: {
  event: { name: string; date: string; venue: string; time: string };
  index: number;
}) {
  const eventIcons = ["\uD83C\uDF1E", "\uD83C\uDF3A", "\uD83C\uDFB6", "\uD83D\uDD4A\uFE0F", "\uD83C\uDF89"];
  const icon = eventIcons[index] ?? "\u2728";

  return (
    <div className="lotus-card w-full">
      <div className="relative overflow-hidden rounded-2xl border border-[#FFD700]/20 bg-gradient-to-b from-[#3D0F50]/90 to-[#1A0525]/95 p-7 shadow-lg shadow-[#FF69B4]/8 backdrop-blur-sm">
        {/* Lotus-petal top decoration */}
        <div className="pointer-events-none absolute -top-1 left-1/2 -translate-x-1/2">
          <svg viewBox="0 0 80 20" className="h-4 w-16 text-[#FFD700]/30" fill="currentColor">
            <path d="M30 18 Q35 5 40 0 Q45 5 50 18" opacity="0.4" />
            <path d="M20 18 Q30 4 40 0 Q50 4 60 18" opacity="0.2" />
          </svg>
        </div>

        {/* Top gradient line */}
        <div className="pointer-events-none absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/40 to-transparent" />

        {/* Event icon */}
        <div className="mb-4 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#FF69B4]/25 bg-[#FF69B4]/10 shadow-inner">
            <span className="text-lg">{icon}</span>
          </div>
        </div>

        {/* Event name */}
        <h3 className="mb-3 text-center font-serif text-2xl font-semibold tracking-wide text-[#FFD700]">
          {event.name}
        </h3>

        {/* Gold divider */}
        <div className="mx-auto mb-4 h-px w-12 bg-gradient-to-r from-transparent via-[#FF69B4]/40 to-transparent" />

        {/* Date & Time */}
        <div className="mb-2 flex items-center justify-center gap-2 text-sm text-[#FFF8E7]/75">
          <Calendar className="h-3.5 w-3.5 text-[#FFD700]/60" />
          <span>{event.date}</span>
        </div>
        <div className="mb-2 flex items-center justify-center gap-2 text-sm text-[#FFF8E7]/75">
          <Clock className="h-3.5 w-3.5 text-[#FFD700]/60" />
          <span>{event.time}</span>
        </div>

        {/* Venue */}
        <div className="flex items-center justify-center gap-2 text-sm text-[#FFF8E7]/50">
          <MapPin className="h-3.5 w-3.5 text-[#FFD700]/40" />
          <span>{event.venue}</span>
        </div>

        {/* Corner lotus dots */}
        <div className="pointer-events-none absolute bottom-3 left-3 h-1.5 w-1.5 rounded-full bg-[#FFD700]/20" />
        <div className="pointer-events-none absolute bottom-3 right-3 h-1.5 w-1.5 rounded-full bg-[#FFD700]/20" />
        <div className="pointer-events-none absolute top-3 left-3 h-1.5 w-1.5 rounded-full bg-[#FFD700]/15" />
        <div className="pointer-events-none absolute top-3 right-3 h-1.5 w-1.5 rounded-full bg-[#FFD700]/15" />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Floating Lotus Petals Particles                                            */
/* -------------------------------------------------------------------------- */

function FloatingLotusPetals() {
  const petals = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${5 + (i * 5.3) % 90}%`,
    delay: i * 0.7,
    duration: 10 + (i % 4) * 3,
    size: 4 + (i % 3) * 2,
    isPink: i % 2 === 0,
    rotate: (i * 47) % 360,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: p.left,
            top: -20,
            width: p.size,
            height: p.size * 1.6,
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            background: p.isPink
              ? "linear-gradient(135deg, #FF69B4, #FF1493)"
              : "linear-gradient(135deg, #FFD700, #FF9933)",
            opacity: 0,
            rotate: p.rotate,
          }}
          animate={{
            y: [0, typeof window !== "undefined" ? window.innerHeight + 40 : 1200],
            x: [0, (p.id % 2 === 0 ? 1 : -1) * 30],
            rotate: [p.rotate, p.rotate + 180],
            opacity: [0, p.isPink ? 0.25 : 0.3, p.isPink ? 0.25 : 0.3, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Template Component                                                    */
/* -------------------------------------------------------------------------- */

export default function DeviDivineTemplate({ invite, isDemo }: TemplateProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroMandalaRef = useRef<HTMLDivElement>(null);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const { isPlaying, toggle } = useMusicPlayer(invite.musicUrl);
  const countdown = useCountdown(invite.weddingDate);

  // Initialize Lenis smooth scrolling
  useLenis();

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ---- Hero Mandala: Petals Unfold Sequentially ---- */
      const mandalaTimeline = gsap.timeline({ delay: 0.5 });

      // Ring 1 (innermost) - unfold first
      mandalaTimeline.fromTo(
        ".mandala-petal-1",
        { scale: 0, rotation: 30, transformOrigin: "center center", opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 0.35,
          duration: 0.6,
          stagger: 0.08,
          ease: "back.out(1.4)",
        },
        0,
      );

      // Ring 2 (middle) - unfold after ring 1
      mandalaTimeline.fromTo(
        ".mandala-petal-2",
        { scale: 0, rotation: 30, transformOrigin: "center center", opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 0.25,
          duration: 0.6,
          stagger: 0.07,
          ease: "back.out(1.4)",
        },
        0.4,
      );

      // Ring 3 (outermost) - unfold last
      mandalaTimeline.fromTo(
        ".mandala-petal-3",
        { scale: 0, rotation: 30, transformOrigin: "center center", opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 0.15,
          duration: 0.6,
          stagger: 0.05,
          ease: "back.out(1.4)",
        },
        0.8,
      );

      /* ---- Section Transitions: Circular Bloom Reveal ---- */
      gsap.utils.toArray<HTMLElement>(".devi-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "circle(0% at 50% 50%)", opacity: 0 },
          {
            clipPath: "circle(100% at 50% 50%)",
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      /* ---- Event Cards: Clip-Path Morph Circle -> Card ---- */
      gsap.utils.toArray<HTMLElement>(".lotus-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          {
            clipPath: "circle(20% at 50% 50%)",
            scale: 0.8,
            opacity: 0,
          },
          {
            clipPath: "circle(100% at 50% 50%)",
            scale: 1,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      /* ---- Countdown: Lotus Bloom Reveal ---- */
      gsap.utils.toArray<HTMLElement>(".devi-countdown").forEach((el, i) => {
        gsap.fromTo(
          el,
          {
            scale: 0,
            rotation: -90,
            borderRadius: "50%",
            opacity: 0,
          },
          {
            scale: 1,
            rotation: 0,
            borderRadius: "0.75rem",
            opacity: 1,
            duration: 0.7,
            delay: i * 0.12,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      /* ---- Gallery items fade-in with stagger ---- */
      gsap.utils.toArray<HTMLElement>(".devi-gallery-item").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
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

      /* ---- General scroll-fade elements ---- */
      gsap.utils.toArray<HTMLElement>(".devi-fade").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      /* ---- Parallax background ---- */
      gsap.utils.toArray<HTMLElement>(".devi-parallax").forEach((el) => {
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Default events for Hindu Devi-themed wedding
  const events = invite.events ?? [
    { name: "Haldi", date: "Date TBA", venue: invite.venue ?? "Venue TBA", time: "10 AM" },
    { name: "Mehendi", date: "Date TBA", venue: invite.venue ?? "Venue TBA", time: "4 PM" },
    { name: "Sangeet", date: "Date TBA", venue: invite.venue ?? "Venue TBA", time: "7 PM" },
    { name: "Wedding Ceremony", date: invite.weddingDate ?? "Date TBA", venue: invite.venue ?? "Venue TBA", time: "11 AM" },
    { name: "Reception", date: invite.receptionDate ?? "Date TBA", venue: invite.venue ?? "Venue TBA", time: "7 PM" },
  ];

  async function handleShare() {
    const url = `${window.location.origin}/wedding/${invite.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${invite.groomName} & ${invite.brideName} — Wedding Invitation`,
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
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#1A0525] via-[#2A0A3D] to-[#1A0525] text-[#FFF8E7]"
    >
      {/* Inject CSS keyframes for diya flicker */}
      <style dangerouslySetInnerHTML={{ __html: DIYA_STYLES }} />

      {/* Floating lotus petals */}
      <FloatingLotusPetals />

      {/* Mandala pattern overlay */}
      <div className="devi-parallax pointer-events-none fixed inset-0 z-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23FFD700' stroke-width='0.4'%3E%3Ccircle cx='50' cy='50' r='40'/%3E%3Ccircle cx='50' cy='50' r='28'/%3E%3Ccircle cx='50' cy='50' r='16'/%3E%3Cellipse cx='50' cy='15' rx='7' ry='18' transform='rotate(0 50 50)'/%3E%3Cellipse cx='50' cy='15' rx='7' ry='18' transform='rotate(72 50 50)'/%3E%3Cellipse cx='50' cy='15' rx='7' ry='18' transform='rotate(144 50 50)'/%3E%3Cellipse cx='50' cy='15' rx='7' ry='18' transform='rotate(216 50 50)'/%3E%3Cellipse cx='50' cy='15' rx='7' ry='18' transform='rotate(288 50 50)'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* Music toggle */}
      {invite.musicUrl && (
        <MusicToggleButton
          isPlaying={isPlaying}
          onToggle={toggle}
          className="fixed top-4 right-4 z-50 rounded-full border border-[#FFD700]/30 bg-[#2A0A3D]/80 p-3 shadow-lg backdrop-blur-sm transition-colors hover:bg-[#2A0A3D]"
        />
      )}

      {/* Demo banner */}
      {isDemo && (
        <div className="relative z-10 bg-[#FF69B4] py-2 text-center text-sm font-medium text-white">
          This is a demo preview. Complete payment to use your own details.
        </div>
      )}

      {/* ================================================================== */}
      {/*  CONTENT                                                           */}
      {/* ================================================================== */}
      <div className="relative z-10 mx-auto max-w-xl px-4">

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 1 -- HERO (full viewport)                               */}
        {/* ---------------------------------------------------------------- */}
        <section className="flex min-h-screen flex-col items-center justify-center py-16 text-center">
          {/* Lotus Mandala with petal unfold animation */}
          <div ref={heroMandalaRef} className="mb-6">
            <LotusMandala className="mx-auto h-28 w-28 text-[#FFD700]/70 sm:h-36 sm:w-36" />
          </div>

          {/* Sanskrit blessing */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mb-5"
          >
            <p className="font-serif text-3xl leading-relaxed text-[#FFD700] sm:text-4xl">
              &#2342;&#2367;&#2357;&#2381;&#2351; &#2357;&#2367;&#2357;&#2366;&#2361;
            </p>
            <p className="mt-2 text-xs tracking-[0.25em] text-[#FFF8E7]/45 uppercase">
              A Divine Union
            </p>
          </motion.div>

          <DivineBorder className="my-4 h-5 w-64 text-[#FFD700]/40 sm:w-80" />

          {/* Parent blessings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.6 }}
            className="mb-8 w-full"
          >
            <p className="mb-2 text-xs tracking-[0.2em] text-[#FFF8E7]/50 uppercase">
              With the blessings of
            </p>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Groom's parents */}
              <div className="text-center">
                {invite.groomFatherName && invite.groomMotherName ? (
                  <>
                    <p className="text-xs tracking-wider text-[#FF69B4]/60 uppercase">Son of</p>
                    <p className="mt-1 font-serif text-lg text-[#FFF8E7]/85">
                      {invite.groomFatherName}
                    </p>
                    <p className="font-serif text-sm text-[#FFF8E7]/65">
                      & {invite.groomMotherName}
                    </p>
                  </>
                ) : invite.groomFatherName ? (
                  <>
                    <p className="text-xs tracking-wider text-[#FF69B4]/60 uppercase">Son of</p>
                    <p className="mt-1 font-serif text-lg text-[#FFF8E7]/85">{invite.groomFatherName}</p>
                  </>
                ) : null}
              </div>

              {/* Bride's parents */}
              <div className="text-center">
                {invite.brideFatherName && invite.brideMotherName ? (
                  <>
                    <p className="text-xs tracking-wider text-[#FF69B4]/60 uppercase">Daughter of</p>
                    <p className="mt-1 font-serif text-lg text-[#FFF8E7]/85">
                      {invite.brideFatherName}
                    </p>
                    <p className="font-serif text-sm text-[#FFF8E7]/65">
                      & {invite.brideMotherName}
                    </p>
                  </>
                ) : invite.brideFatherName ? (
                  <>
                    <p className="text-xs tracking-wider text-[#FF69B4]/60 uppercase">Daughter of</p>
                    <p className="mt-1 font-serif text-lg text-[#FFF8E7]/85">{invite.brideFatherName}</p>
                  </>
                ) : null}
              </div>
            </div>
          </motion.div>

          {/* Invitation text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="mb-5 text-sm tracking-[0.15em] text-[#FFF8E7]/45 uppercase"
          >
            Request the honour of your presence at the wedding of
          </motion.p>

          {/* Hero image */}
          {invite.heroImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7, clipPath: "circle(0% at 50% 50%)" }}
              animate={{ opacity: 1, scale: 1, clipPath: "circle(50% at 50% 50%)" }}
              transition={{ duration: 1, delay: 1.9 }}
              className="mx-auto mb-8 h-56 w-56 overflow-hidden rounded-full border-2 border-[#FF69B4]/35 shadow-2xl shadow-[#FF69B4]/15 sm:h-64 sm:w-64"
            >
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${invite.heroImage})` }}
              />
            </motion.div>
          )}

          {/* Couple Names */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
          >
            <h1 className="font-serif text-5xl font-light leading-tight text-[#FFD700] sm:text-6xl lg:text-7xl">
              {invite.groomName}
            </h1>

            {/* Lotus heart divider */}
            <div className="my-4 flex items-center justify-center gap-4">
              <motion.div
                className="h-px w-14 bg-gradient-to-r from-transparent to-[#FF69B4]/50 sm:w-20"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 2.5, duration: 0.8 }}
              />
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 2.6, duration: 0.6, type: "spring" }}
              >
                <Heart className="h-5 w-5 fill-[#FF69B4]/50 text-[#FF69B4]" />
              </motion.div>
              <motion.div
                className="h-px w-14 bg-gradient-to-l from-transparent to-[#FF69B4]/50 sm:w-20"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 2.5, duration: 0.8 }}
              />
            </div>

            <h1 className="font-serif text-5xl font-light leading-tight text-[#FFD700] sm:text-6xl lg:text-7xl">
              {invite.brideName}
            </h1>
          </motion.div>

          {/* Wedding date */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.8 }}
            className="mt-6 text-base text-[#FFF8E7]/55"
          >
            {formatWeddingDate(invite.weddingDate)}
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 3.2 }}
            className="mt-14"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto flex flex-col items-center gap-1"
            >
              <div className="h-8 w-px bg-gradient-to-b from-[#FFD700]/50 to-transparent" />
              <div className="h-1.5 w-1.5 rounded-full bg-[#FFD700]/40" />
            </motion.div>
          </motion.div>
        </section>

        <DivineBorder />

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 2 -- EVENTS (stacked vertically with lotus dividers)    */}
        {/* ---------------------------------------------------------------- */}
        <section className="mb-20 py-8">
          <SectionHeading subtitle="Sacred Celebrations" title="Wedding Events" />

          <div className="flex flex-col gap-2">
            {events.map((event, index) => (
              <div key={index}>
                <LotusEventCard event={event} index={index} />
                {index < events.length - 1 && <LotusDivider />}
              </div>
            ))}
          </div>
        </section>

        <RangoliPattern />

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 3 -- COUPLE PHOTO                                       */}
        {/* ---------------------------------------------------------------- */}
        {invite.couplePhoto && (
          <section className="mb-20 py-8">
            <div className="devi-fade overflow-hidden rounded-2xl border border-[#FF69B4]/20 shadow-xl shadow-[#FF69B4]/10">
              {/* Lotus frame top decoration */}
              <div className="flex justify-center bg-gradient-to-r from-transparent via-[#2A0A3D] to-transparent py-2">
                <LotusMandala className="h-8 w-8 text-[#FFD700]/25" />
              </div>
              <div
                className="aspect-[4/3] w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${invite.couplePhoto})` }}
              />
            </div>
            <div className="mt-4 text-center">
              <p className="font-serif text-lg text-[#FFF8E7]/55 italic">
                {invite.groomName} & {invite.brideName}
              </p>
            </div>
          </section>
        )}

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 4 -- GALLERY (2-column within narrow frame)             */}
        {/* ---------------------------------------------------------------- */}
        {invite.galleryImages.length > 0 && (
          <section className="mb-20 py-8">
            <SectionHeading title="Gallery" />

            <div className="grid grid-cols-2 gap-3">
              {invite.galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  className="devi-gallery-item aspect-square overflow-hidden rounded-xl border border-[#FFD700]/15 shadow-md shadow-[#FF69B4]/5"
                >
                  <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-700 hover:scale-110"
                    style={{ backgroundImage: `url(${img})` }}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        <DivineBorder />

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 5 -- THINGS TO KNOW                                     */}
        {/* ---------------------------------------------------------------- */}
        {thingsToKnow.length > 0 && (
          <section className="mb-20 py-8">
            <SectionHeading subtitle="Helpful Information" title="Things to Know" />

            <div className="flex flex-col gap-4">
              {thingsToKnow.map((item, idx) => (
                <div
                  key={idx}
                  className="devi-fade rounded-xl border border-[#FFD700]/12 bg-[#3D0F50]/40 p-5 backdrop-blur-sm"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#FF69B4]/50" />
                    <h3 className="font-serif text-lg text-[#FFD700]">
                      {item.label}
                    </h3>
                  </div>
                  <p className="pl-3.5 text-sm leading-relaxed text-[#FFF8E7]/50">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 6 -- STORY                                              */}
        {/* ---------------------------------------------------------------- */}
        {invite.story && (
          <section className="mb-20 py-8">
            <div className="devi-fade relative rounded-2xl border border-[#FFD700]/15 bg-[#3D0F50]/40 p-8 text-center backdrop-blur-sm sm:p-10">
              {/* Top lotus accent */}
              <div className="pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2">
                <div
                  className="h-8 w-8 rounded-full border border-[#FFD700]/25 bg-[#2A0A3D]"
                  style={{ animation: "lotusFloat 4s ease-in-out infinite" }}
                >
                  <LotusMandala className="h-8 w-8 text-[#FFD700]/35" />
                </div>
              </div>

              <h2 className="mb-2 mt-2 font-serif text-2xl text-[#FFD700]">Our Story</h2>
              <div className="mx-auto mb-4 h-px w-16 bg-gradient-to-r from-transparent via-[#FF69B4]/30 to-transparent" />
              <p className="leading-relaxed text-[#FFF8E7]/60">
                {invite.story}
              </p>
            </div>
          </section>
        )}

        <RangoliPattern />

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 7 -- COUNTDOWN                                          */}
        {/* ---------------------------------------------------------------- */}
        {invite.weddingDate && (
          <section className="mb-20 py-8">
            <SectionHeading subtitle="The Auspicious Day" title="Counting Down" />

            <div className="rounded-2xl border border-[#FFD700]/15 bg-[#3D0F50]/40 p-8 backdrop-blur-sm">
              <div className="grid grid-cols-4 gap-3 sm:gap-5">
                {[
                  { label: "Days", value: countdown.days },
                  { label: "Hours", value: countdown.hours },
                  { label: "Minutes", value: countdown.minutes },
                  { label: "Seconds", value: countdown.seconds },
                ].map((unit) => (
                  <div key={unit.label} className="devi-countdown text-center">
                    <div className="relative mx-auto flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border border-[#FFD700]/20 bg-[#1A0525]/70 shadow-inner sm:h-20 sm:w-20">
                      {/* Inner glow */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#FFD700]/5 to-transparent" />
                      <span className="relative font-serif text-2xl font-semibold text-[#FFD700] sm:text-3xl">
                        {String(unit.value).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="mt-2 block text-[10px] tracking-[0.2em] text-[#FFF8E7]/40 uppercase">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-[#FFF8E7]/40">
                  {formatWeddingDate(invite.weddingDate)}
                  {invite.weddingTime && ` at ${invite.weddingTime}`}
                </p>
                {invite.venue && (
                  <p className="mt-1 flex items-center justify-center gap-1 text-sm text-[#FFF8E7]/30">
                    <MapPin className="h-3 w-3" /> {invite.venue}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        <DivineBorder />

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 8 -- COUPLE MESSAGE                                     */}
        {/* ---------------------------------------------------------------- */}
        {invite.coupleMessage && (
          <section className="mb-20 py-8">
            <div className="devi-fade relative rounded-2xl border border-[#FF69B4]/15 bg-[#3D0F50]/40 p-8 text-center backdrop-blur-sm sm:p-10">
              {/* Flanking diyas */}
              <div className="pointer-events-none absolute top-4 left-4">
                <DiyaLamp className="h-10 w-6" mirror />
              </div>
              <div className="pointer-events-none absolute top-4 right-4">
                <DiyaLamp className="h-10 w-6" />
              </div>

              <LotusMandala className="mx-auto mb-4 h-10 w-10 text-[#FFD700]/25" />
              <p className="font-serif text-lg leading-relaxed text-[#FFF8E7]/75 italic">
                &ldquo;{invite.coupleMessage}&rdquo;
              </p>
              <p className="mt-4 text-sm text-[#FF69B4]/55">
                &mdash; {invite.groomName} & {invite.brideName}
              </p>
            </div>
          </section>
        )}

        <RangoliPattern />

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 9 -- RSVP + SHARE BUTTONS                              */}
        {/* ---------------------------------------------------------------- */}
        <section className="mb-20 py-8 text-center">
          <div className="devi-fade">
            <div className="flex items-center justify-center gap-3">
              <DiyaLamp className="h-8 w-5" mirror />
              <h2 className="font-serif text-3xl text-[#FFD700]">
                Will You Join Us?
              </h2>
              <DiyaLamp className="h-8 w-5" />
            </div>

            <p className="mt-4 mb-8 text-sm text-[#FFF8E7]/50">
              We would be honoured to have you celebrate this sacred occasion with us.
            </p>

            {hashtag && (
              <p className="mb-5 font-serif text-lg text-[#FF69B4]/65 italic">
                {hashtag}
              </p>
            )}

            <div className="flex flex-col items-center gap-4">
              <Button
                size="lg"
                className="w-full max-w-xs border border-[#FF69B4]/50 bg-[#FF69B4] text-white shadow-lg shadow-[#FF69B4]/20 hover:bg-[#FF69B4]/90"
                onClick={() => setRsvpOpen(true)}
              >
                <Heart className="mr-2 h-4 w-4" />
                RSVP Now
              </Button>

              <div className="flex w-full max-w-xs gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 border-[#FFD700]/25 bg-transparent text-[#FFD700] hover:bg-[#FFD700]/10 hover:text-[#FFD700]"
                  onClick={() => void handleShare()}
                >
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#FFD700]/25 bg-transparent text-[#FFD700] hover:bg-[#FFD700]/10 hover:text-[#FFD700]"
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
        {/*  SECTION 10 -- FOOTER                                            */}
        {/* ---------------------------------------------------------------- */}
        <footer className="pb-4 text-center">
          <DivineBorder className="mx-auto mb-6 h-5 w-full text-[#FFD700]/20" />

          <div className="devi-fade">
            <LotusMandala className="mx-auto mb-3 h-10 w-10 text-[#FFD700]/20" />
            <p className="font-serif text-lg text-[#FFD700]/55">
              {invite.groomName} & {invite.brideName}
            </p>
            <p className="mt-1 text-sm text-[#FFF8E7]/30">
              {formatWeddingDate(invite.weddingDate)}
            </p>
            {invite.venue && (
              <p className="mt-1 text-xs text-[#FFF8E7]/20">
                {invite.venue}
              </p>
            )}

            <p className="mt-6 text-xs text-[#FFF8E7]/25 italic">
              May the divine light of the Goddess bless this sacred union
            </p>
          </div>

          <CardoraWatermark className="mt-10 pb-8 text-center text-xs text-[#FFF8E7]/15" />
        </footer>
      </div>

      {/* RSVP Modal */}
      <RsvpModal open={rsvpOpen} onOpenChange={setRsvpOpen} inviteSlug={invite.slug} />
    </div>
  );
}
