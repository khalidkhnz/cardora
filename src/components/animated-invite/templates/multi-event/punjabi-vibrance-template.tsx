"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
/*  Constants                                                                  */
/* -------------------------------------------------------------------------- */

const PHULKARI_COLORS = ["#FF1493", "#FF9933", "#00CC44", "#0066FF"] as const;
const GOLD = "#FFD700";
const CREAM = "#FFF8E7";

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
/*  Phulkari Grid Pattern (8x6 colored squares)                                */
/* -------------------------------------------------------------------------- */

function PhulkariGridPattern({ className }: { className?: string }) {
  const cols = 8;
  const rows = 6;
  const size = 12;
  const gap = 3;
  const w = cols * (size + gap);
  const h = rows * (size + gap);

  return (
    <div className={className ?? "pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"}>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="phulkari-grid h-full w-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((_, c) => (
            <rect
              key={`${r}-${c}`}
              className="phulkari-square"
              x={c * (size + gap)}
              y={r * (size + gap)}
              width={size}
              height={size}
              rx="1.5"
              fill={PHULKARI_COLORS[(r + c) % 4]}
              opacity="0"
            />
          )),
        )}
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Phulkari Border SVG (enhanced)                                             */
/* -------------------------------------------------------------------------- */

function PhulkariBorder({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "mx-auto my-6 h-12 w-full"}
    >
      {[0, 75, 150, 225, 300, 375, 450, 525].map((x, i) => (
        <g key={x}>
          <path
            d={`M${x + 37} 10 L${x + 55} 30 L${x + 37} 50 L${x + 19} 30 Z`}
            stroke={PHULKARI_COLORS[i % 4]}
            strokeWidth="1.5"
            fill="none"
            opacity="0.5"
          />
          <path
            d={`M${x + 37} 18 L${x + 47} 30 L${x + 37} 42 L${x + 27} 30 Z`}
            fill={PHULKARI_COLORS[i % 4]}
            opacity="0.18"
          />
          <circle cx={x + 37} cy="30" r="2.5" fill={PHULKARI_COLORS[i % 4]} opacity="0.6" />
          <line x1={x + 37} y1="18" x2={x + 37} y2="42" stroke={PHULKARI_COLORS[i % 4]} strokeWidth="0.6" opacity="0.3" />
          <line x1={x + 27} y1="30" x2={x + 47} y2="30" stroke={PHULKARI_COLORS[i % 4]} strokeWidth="0.6" opacity="0.3" />
        </g>
      ))}
      <line x1="10" y1="5" x2="590" y2="5" stroke="#FF1493" strokeWidth="0.6" opacity="0.25" />
      <line x1="10" y1="55" x2="590" y2="55" stroke="#FF9933" strokeWidth="0.6" opacity="0.25" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Bangles Border SVG                                                         */
/* -------------------------------------------------------------------------- */

function BanglesBorder({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "mx-auto my-4 h-8 w-72"}
    >
      {[40, 80, 120, 160, 200, 240, 280, 320, 360].map((cx, i) => (
        <circle
          key={cx}
          cx={cx}
          cy="20"
          r="14"
          stroke={PHULKARI_COLORS[i % 4]}
          strokeWidth="1.8"
          fill="none"
          opacity={0.35 + (i % 3) * 0.1}
        />
      ))}
      {[40, 120, 200, 280, 360].map((cx, i) => (
        <circle
          key={`inner-${cx}`}
          cx={cx}
          cy="20"
          r="9"
          stroke={i % 2 === 0 ? GOLD : "#FF1493"}
          strokeWidth="0.8"
          fill="none"
          opacity="0.25"
        />
      ))}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Dhol Icon SVG                                                              */
/* -------------------------------------------------------------------------- */

function DholIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "h-20 w-16 text-[#FF9933]"}
    >
      <ellipse cx="60" cy="40" rx="38" ry="14" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5" />
      <ellipse cx="60" cy="100" rx="38" ry="14" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5" />
      <line x1="22" y1="40" x2="22" y2="100" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <line x1="98" y1="40" x2="98" y2="100" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <path d="M30 42 L50 98" stroke={GOLD} strokeWidth="1" opacity="0.35" />
      <path d="M45 42 L65 98" stroke={GOLD} strokeWidth="1" opacity="0.35" />
      <path d="M60 42 L80 98" stroke={GOLD} strokeWidth="1" opacity="0.35" />
      <path d="M75 42 L90 98" stroke={GOLD} strokeWidth="1" opacity="0.35" />
      <line x1="95" y1="25" x2="115" y2="5" stroke="currentColor" strokeWidth="2.5" opacity="0.6" strokeLinecap="round" />
      <circle cx="115" cy="5" r="3" fill="currentColor" opacity="0.5" />
      <line x1="25" y1="25" x2="5" y2="5" stroke="currentColor" strokeWidth="2.5" opacity="0.6" strokeLinecap="round" />
      <circle cx="5" cy="5" r="3" fill="currentColor" opacity="0.5" />
      <ellipse cx="60" cy="70" rx="38" ry="4" stroke="#FF1493" strokeWidth="0.8" fill="none" opacity="0.3" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Truck Art Frame SVG                                                        */
/* -------------------------------------------------------------------------- */

function TruckArtFrame({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "mx-auto my-4 h-6 w-56"}
    >
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270].map((x, i) => (
        <path
          key={x}
          d={`M${x} 25 Q${x + 15} 5 ${x + 30} 25`}
          stroke={PHULKARI_COLORS[i % 4]}
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
        />
      ))}
      {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285].map((cx, i) => (
        <circle
          key={cx}
          cx={cx}
          cy="10"
          r="2"
          fill={PHULKARI_COLORS[i % 4]}
          opacity="0.4"
        />
      ))}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Punjabi Motif Corner SVG                                                   */
/* -------------------------------------------------------------------------- */

function PunjabiMotif({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "h-16 w-16"}
    >
      <path d="M40 5 L65 40 L40 75 L15 40 Z" stroke="#FF1493" strokeWidth="1" fill="none" opacity="0.3" />
      <path d="M40 15 L55 40 L40 65 L25 40 Z" stroke="#FF9933" strokeWidth="0.8" fill="none" opacity="0.25" />
      <circle cx="40" cy="40" r="8" stroke={GOLD} strokeWidth="0.8" fill="none" opacity="0.3" />
      <circle cx="40" cy="40" r="3" fill="#FF1493" opacity="0.2" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Confetti Celebration Particles (Framer Motion)                             */
/* -------------------------------------------------------------------------- */

function CelebrationConfetti() {
  const particleCount = 20;
  const colors = ["#FF1493", "#FF9933", "#00CC44", "#0066FF", "#FFD700"];

  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      {Array.from({ length: particleCount }).map((_, i) => {
        const startX = Math.random() * 100;
        const color = colors[i % colors.length]!;
        const size = 4 + Math.random() * 8;
        const delay = Math.random() * 6;
        const duration = 4 + Math.random() * 4;
        const isSquare = i % 3 === 0;
        const isCircle = i % 3 === 1;

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${startX}%`,
              bottom: "-20px",
              width: size,
              height: isSquare ? size : size * 0.6,
              borderRadius: isCircle ? "50%" : isSquare ? "1px" : "0",
              backgroundColor: color,
              opacity: 0,
            }}
            animate={{
              y: [0, -(400 + Math.random() * 600)],
              x: [0, (Math.random() - 0.5) * 200],
              opacity: [0, 0.7, 0.5, 0],
              rotate: [0, 360 + Math.random() * 360],
              scale: [0.5, 1.2, 0.8, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              repeatDelay: Math.random() * 3,
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Punjabi Event Card (Bhangra Bounce)                                        */
/* -------------------------------------------------------------------------- */

const PUNJABI_EVENT_EMOJIS: Record<string, string> = {
  Roka: "\uD83D\uDC8D",
  Chunni: "\uD83E\uDDE3",
  Jaggo: "\uD83D\uDD25",
  "Anand Karaj": "\uD83D\uDE4F",
  Reception: "\uD83C\uDF89",
};

function PunjabiEventCard({
  event,
  index,
  isAnandKaraj,
}: {
  event: { name: string; date: string; venue: string; time: string };
  index: number;
  isAnandKaraj: boolean;
}) {
  const colorIdx = isAnandKaraj ? 0 : index % 4;
  const color = PHULKARI_COLORS[colorIdx]!;

  return (
    <div className={`bhangra-card ${isAnandKaraj ? "sm:col-span-2" : ""}`}>
      <div
        className="relative overflow-hidden rounded-3xl border-2 p-6 shadow-xl backdrop-blur-sm sm:p-7"
        style={{
          borderColor: `${color}40`,
          background: isAnandKaraj
            ? "linear-gradient(145deg, rgba(45,18,51,0.95), rgba(26,10,26,0.98))"
            : "linear-gradient(145deg, rgba(35,14,40,0.85), rgba(20,8,22,0.92))",
          boxShadow: `0 8px 32px ${color}15, inset 0 1px 0 ${color}20`,
        }}
      >
        {/* Top colorful glow bar */}
        <div
          className="pointer-events-none absolute top-0 right-0 left-0 h-1.5"
          style={{ background: `linear-gradient(90deg, transparent, ${color}80, transparent)` }}
        />

        {/* Bottom colorful glow bar */}
        <div
          className="pointer-events-none absolute right-0 bottom-0 left-0 h-0.5"
          style={{ background: `linear-gradient(90deg, transparent, ${color}30, transparent)` }}
        />

        {/* Event icon */}
        <div className="mb-5 flex justify-center">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl border-2"
            style={{
              borderColor: `${color}50`,
              background: `${color}15`,
              boxShadow: `0 0 20px ${color}20`,
            }}
          >
            <span className="text-xl">{PUNJABI_EVENT_EMOJIS[event.name] ?? "\u2728"}</span>
          </div>
        </div>

        {/* Event name */}
        <h3
          className="mb-3 text-center font-serif text-2xl font-bold tracking-wide"
          style={{ color: isAnandKaraj ? GOLD : color, textShadow: `0 0 20px ${color}40` }}
        >
          {isAnandKaraj ? (
            <span className="text-3xl">{event.name}</span>
          ) : (
            event.name
          )}
        </h3>

        {/* Divider */}
        <div
          className="mx-auto mb-4 h-px w-20"
          style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }}
        />

        {/* Date & Time */}
        <div className="mb-2 flex items-center justify-center gap-2 text-sm" style={{ color: `${CREAM}CC` }}>
          <Calendar className="h-3.5 w-3.5" style={{ color: `${color}AA` }} />
          <span className="font-medium">{event.date}</span>
        </div>
        <div className="mb-3 flex items-center justify-center gap-2 text-sm" style={{ color: `${CREAM}CC` }}>
          <Clock className="h-3.5 w-3.5" style={{ color: `${color}AA` }} />
          <span>{event.time}</span>
        </div>

        {/* Venue */}
        <div className="flex items-center justify-center gap-2 text-sm" style={{ color: `${CREAM}88` }}>
          <MapPin className="h-3.5 w-3.5" style={{ color: `${GOLD}66` }} />
          <span>{event.venue}</span>
        </div>

        {/* Corner motifs */}
        <div className="pointer-events-none absolute top-3 left-3 h-5 w-5 border-t-2 border-l-2 rounded-tl-md" style={{ borderColor: `${color}30` }} />
        <div className="pointer-events-none absolute top-3 right-3 h-5 w-5 border-t-2 border-r-2 rounded-tr-md" style={{ borderColor: `${color}30` }} />
        <div className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 rounded-bl-md" style={{ borderColor: `${color}30` }} />
        <div className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 rounded-br-md" style={{ borderColor: `${color}30` }} />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Colorful Section Divider                                                   */
/* -------------------------------------------------------------------------- */

function ColorBandDivider() {
  return (
    <div className="my-10 flex h-2 w-full overflow-hidden rounded-full opacity-40">
      {PHULKARI_COLORS.map((c) => (
        <div key={c} className="h-full flex-1" style={{ backgroundColor: c }} />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Template Component                                                    */
/* -------------------------------------------------------------------------- */

export default function PunjabiVibranceTemplate({ invite, isDemo }: TemplateProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const { isPlaying, toggle } = useMusicPlayer(invite.musicUrl);
  const countdown = useCountdown(invite.weddingDate);

  // Initialize Lenis smooth scrolling
  useLenis();

  // GSAP ScrollTrigger animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ---- Phulkari Grid: squares build in one-by-one in wave pattern ---- */
      const squares = gsap.utils.toArray<SVGElement>(".phulkari-square");
      if (squares.length > 0) {
        gsap.fromTo(
          squares,
          { scale: 0, opacity: 0, transformOrigin: "center center" },
          {
            scale: 1,
            opacity: 0.7,
            duration: 0.4,
            ease: "power2.out",
            stagger: {
              grid: [6, 8],
              from: "center",
              amount: 0.03 * squares.length,
            },
          },
        );
      }

      /* ---- Section transitions: .punjabi-reveal - energetic pop-in ---- */
      gsap.utils.toArray<HTMLElement>(".punjabi-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.8, rotation: -5 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      /* ---- Bhangra Bounce: event cards bounce in from below ---- */
      gsap.utils.toArray<HTMLElement>(".bhangra-card").forEach((el, i) => {
        const randomRotation = (Math.random() - 0.5) * 6; // -3 to 3 degrees
        gsap.fromTo(
          el,
          { opacity: 0, y: 100, rotation: randomRotation },
          {
            opacity: 1,
            y: 0,
            rotation: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: "bounce.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      /* ---- Countdown: dancing rotation entry ---- */
      gsap.utils.toArray<HTMLElement>(".dhol-countdown").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.5, rotation: -15 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.7,
            delay: i * 0.12,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            onComplete: () => {
              // Continuous subtle dance after entry
              gsap.to(el, {
                rotation: 2,
                yoyo: true,
                repeat: -1,
                duration: 0.8,
                ease: "sine.inOut",
              });
            },
          },
        );
      });

      /* ---- Gallery images: staggered color-pop entry ---- */
      gsap.utils.toArray<HTMLElement>(".gallery-pop").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.6, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            delay: i * 0.08,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      /* ---- Things to Know: alternating slide ---- */
      gsap.utils.toArray<HTMLElement>(".info-slide-left").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -60, rotation: -3 },
          {
            opacity: 1,
            x: 0,
            rotation: 0,
            duration: 0.6,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".info-slide-right").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: 60, rotation: 3 },
          {
            opacity: 1,
            x: 0,
            rotation: 0,
            duration: 0.6,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      /* ---- Parallax pattern overlay ---- */
      gsap.utils.toArray<HTMLElement>(".parallax-phulkari").forEach((el) => {
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

  // Default events for Punjabi Sikh wedding
  const events = invite.events ?? [
    { name: "Roka", date: "Date TBA", venue: invite.venue ?? "Venue TBA", time: "11 AM" },
    { name: "Chunni", date: "Date TBA", venue: invite.venue ?? "Venue TBA", time: "5 PM" },
    { name: "Jaggo", date: "Date TBA", venue: invite.venue ?? "Venue TBA", time: "8 PM" },
    { name: "Anand Karaj", date: invite.weddingDate ?? "Date TBA", venue: invite.venue ?? "Gurudwara Sahib", time: "10 AM" },
    { name: "Reception", date: invite.receptionDate ?? "Date TBA", venue: invite.venue ?? "Venue TBA", time: "7 PM" },
  ];

  const handleShare = useCallback(async () => {
    const url = `${window.location.origin}/wedding/${invite.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${invite.groomName} & ${invite.brideName} -- Wedding Invitation`,
          url,
        });
        return;
      } catch {
        /* fall through to clipboard */
      }
    }
    await navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  }, [invite.slug, invite.groomName, invite.brideName]);

  // Extract Things to Know data and hashtag from extraData
  const thingsToKnow = (invite.extraData?.thingsToKnow as { label: string; detail: string }[] | undefined) ?? [];
  const hashtag = (invite.extraData?.hashtag as string | undefined) ?? null;

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden text-white"
      style={{
        background: "linear-gradient(180deg, #1A0A1A 0%, #0F050F 30%, #1A0A1A 60%, #0F050F 100%)",
      }}
    >
      {/* Confetti celebration particles (Framer Motion) */}
      <CelebrationConfetti />

      {/* Background Phulkari pattern overlay */}
      <div className="parallax-phulkari pointer-events-none fixed inset-0 z-0 opacity-[0.03]">
        <div
          className="h-[120%] w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cpath d='M40 10 L60 40 L40 70 L20 40Z' stroke='%23FF1493' stroke-width='0.6'/%3E%3Cpath d='M40 20 L52 40 L40 60 L28 40Z' stroke='%23FF9933' stroke-width='0.4'/%3E%3Ccircle cx='40' cy='40' r='6' stroke='%23FFD700' stroke-width='0.4'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Music toggle */}
      {invite.musicUrl && (
        <MusicToggleButton
          isPlaying={isPlaying}
          onToggle={toggle}
          className="fixed top-4 right-4 z-50 rounded-full border-2 border-[#FF1493]/40 bg-[#1A0A1A]/90 p-3 shadow-lg shadow-[#FF1493]/20 backdrop-blur-md transition-all hover:scale-110 hover:border-[#FF1493]/60 hover:bg-[#1A0A1A]"
        />
      )}

      {/* Demo banner */}
      {isDemo && (
        <div
          className="relative z-30 py-2.5 text-center text-sm font-bold text-white tracking-wide"
          style={{ background: "linear-gradient(90deg, #FF1493, #FF9933, #00CC44, #0066FF)" }}
        >
          This is a demo preview. Complete payment to use your own details.
        </div>
      )}

      {/* ================================================================== */}
      {/*  CONTENT                                                           */}
      {/* ================================================================== */}
      <div className="relative z-10">

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 1 -- HERO (Full Viewport)                               */}
        {/* ---------------------------------------------------------------- */}
        <motion.section
          className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Phulkari Grid Background */}
          <PhulkariGridPattern className="pointer-events-none absolute inset-0 flex items-center justify-center" />

          {/* Radial glow behind hero */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, #FF1493 0%, transparent 70%)" }}
          />

          {/* Phulkari border at top */}
          <motion.div
            className="w-full max-w-lg"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <PhulkariBorder />
          </motion.div>

          {/* Dhol icon with bounce */}
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, type: "spring", bounce: 0.6 }}
            className="mb-4"
          >
            <DholIcon className="h-20 w-16 text-[#FF9933]/80" />
          </motion.div>

          {/* Gurmukhi heading */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "backOut" }}
            className="mb-2"
          >
            <p className="font-serif text-2xl leading-relaxed text-[#FF1493] sm:text-3xl" style={{ textShadow: "0 0 30px #FF149360" }}>
              &#2602;&#2672;&#2588;&#2622;&#2604;&#2624; &#2613;&#2623;&#2566;&#2617;
            </p>
          </motion.div>

          {/* English heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-6"
          >
            <p className="font-serif text-lg tracking-[0.3em] text-[#FF9933] uppercase" style={{ textShadow: "0 0 20px #FF993340" }}>
              Punjabi Wedding
            </p>
          </motion.div>

          {/* Bangles border */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <BanglesBorder />
          </motion.div>

          {/* Parent blessings */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-8 max-w-lg"
          >
            <p className="mb-1 text-center text-sm tracking-[0.2em] uppercase" style={{ color: `${CREAM}80` }}>
              With the blessings of
            </p>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Groom's parents */}
              <div className="text-center">
                {invite.groomFatherName && invite.groomMotherName ? (
                  <>
                    <p className="text-xs tracking-wider text-[#FF9933] uppercase">Son of</p>
                    <p className="mt-1 font-serif text-lg" style={{ color: CREAM }}>
                      S. {invite.groomFatherName}
                    </p>
                    <p className="font-serif text-sm" style={{ color: `${CREAM}BB` }}>
                      & Smt. {invite.groomMotherName}
                    </p>
                  </>
                ) : invite.groomFatherName ? (
                  <>
                    <p className="text-xs tracking-wider text-[#FF9933] uppercase">Son of</p>
                    <p className="mt-1 font-serif text-lg" style={{ color: CREAM }}>S. {invite.groomFatherName}</p>
                  </>
                ) : null}
              </div>

              {/* Bride's parents */}
              <div className="text-center">
                {invite.brideFatherName && invite.brideMotherName ? (
                  <>
                    <p className="text-xs tracking-wider text-[#00CC44] uppercase">Daughter of</p>
                    <p className="mt-1 font-serif text-lg" style={{ color: CREAM }}>
                      S. {invite.brideFatherName}
                    </p>
                    <p className="font-serif text-sm" style={{ color: `${CREAM}BB` }}>
                      & Smt. {invite.brideMotherName}
                    </p>
                  </>
                ) : invite.brideFatherName ? (
                  <>
                    <p className="text-xs tracking-wider text-[#00CC44] uppercase">Daughter of</p>
                    <p className="mt-1 font-serif text-lg" style={{ color: CREAM }}>S. {invite.brideFatherName}</p>
                  </>
                ) : null}
              </div>
            </div>
          </motion.div>

          {/* Invitation text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="mb-5 text-sm tracking-[0.2em] uppercase"
            style={{ color: `${CREAM}80` }}
          >
            Joyfully invite you to celebrate the wedding of
          </motion.p>

          {/* Hero image */}
          {invite.heroImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.3, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, delay: 0.7, type: "spring", bounce: 0.4 }}
              className="mb-8"
            >
              <div
                className="mx-auto h-56 w-56 overflow-hidden rounded-full shadow-2xl sm:h-64 sm:w-64"
                style={{
                  border: "3px solid #FF149360",
                  boxShadow: "0 0 40px #FF149330, 0 0 80px #FF993320",
                }}
              >
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${invite.heroImage})` }}
                />
              </div>
            </motion.div>
          )}

          {/* Couple Names - vibrant gold */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.9, type: "spring", bounce: 0.35 }}
          >
            <h1
              className="font-serif text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl"
              style={{ color: GOLD, textShadow: `0 0 40px ${GOLD}40, 0 2px 10px #00000060` }}
            >
              {invite.groomName}
            </h1>

            {/* Colorful heart divider */}
            <div className="my-4 flex items-center justify-center gap-4">
              <motion.div
                className="h-0.5 w-16 sm:w-24"
                style={{ background: `linear-gradient(90deg, transparent, #FF1493)` }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              />
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.15, duration: 0.5, type: "spring", bounce: 0.5 }}
              >
                <Heart className="h-6 w-6 fill-[#FF1493] text-[#FF1493]" style={{ filter: "drop-shadow(0 0 8px #FF149360)" }} />
              </motion.div>
              <motion.div
                className="h-0.5 w-16 sm:w-24"
                style={{ background: `linear-gradient(270deg, transparent, #FF1493)` }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              />
            </div>

            <h1
              className="font-serif text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl"
              style={{ color: GOLD, textShadow: `0 0 40px ${GOLD}40, 0 2px 10px #00000060` }}
            >
              {invite.brideName}
            </h1>
          </motion.div>

          {/* Date */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="mt-6 text-base font-medium"
            style={{ color: `${CREAM}99` }}
          >
            {formatWeddingDate(invite.weddingDate)}
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="mt-12"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-1"
            >
              <div className="h-8 w-0.5 rounded-full" style={{ background: `linear-gradient(180deg, #FF1493, transparent)` }} />
              <div className="h-2 w-2 rounded-full bg-[#FF1493]/50" />
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Color band divider */}
        <ColorBandDivider />

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 2 -- EVENTS GRID                                        */}
        {/* ---------------------------------------------------------------- */}
        <section className="relative px-4 pb-16">
          {/* Colorful side accents */}
          <div className="pointer-events-none absolute top-0 left-0 h-full w-1 opacity-40" style={{ background: `linear-gradient(180deg, #FF1493, #FF9933, #00CC44, #0066FF, transparent)` }} />
          <div className="pointer-events-none absolute top-0 right-0 h-full w-1 opacity-40" style={{ background: `linear-gradient(180deg, #0066FF, #00CC44, #FF9933, #FF1493, transparent)` }} />

          <div className="mx-auto max-w-3xl">
            <div className="punjabi-reveal mb-10 text-center">
              <p className="mb-2 text-xs tracking-[0.35em] text-[#FF9933] uppercase">
                Let the Celebrations Begin
              </p>
              <h2
                className="font-serif text-4xl font-bold sm:text-5xl"
                style={{ color: GOLD, textShadow: `0 0 30px ${GOLD}30` }}
              >
                Wedding Events
              </h2>
              <TruckArtFrame className="mx-auto mt-4 h-6 w-56" />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {events.map((event, index) => (
                <PunjabiEventCard
                  key={index}
                  event={event}
                  index={index}
                  isAnandKaraj={event.name === "Anand Karaj"}
                />
              ))}
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-lg px-4">
          <PhulkariBorder />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 3 -- COUPLE PHOTO                                       */}
        {/* ---------------------------------------------------------------- */}
        {invite.couplePhoto && (
          <section className="px-4 py-16">
            <div className="mx-auto max-w-3xl">
              <div className="punjabi-reveal overflow-hidden rounded-3xl shadow-2xl" style={{ border: "3px solid #FF149330", boxShadow: "0 16px 64px #FF149320, 0 0 0 1px #FF149310" }}>
                <div
                  className="aspect-[4/3] w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${invite.couplePhoto})` }}
                />
              </div>
              <div className="mt-5 text-center">
                <p className="font-serif text-xl italic" style={{ color: `${GOLD}99` }}>
                  {invite.groomName} & {invite.brideName}
                </p>
                <BanglesBorder className="mx-auto mt-2 h-6 w-48" />
              </div>
            </div>
          </section>
        )}

        {/* ---------------------------------------------------------------- */}
        {/*  GALLERY                                                         */}
        {/* ---------------------------------------------------------------- */}
        {invite.galleryImages.length > 0 && (
          <section className="px-4 pb-16">
            <div className="mx-auto max-w-4xl">
              <div className="punjabi-reveal mb-8 text-center">
                <h2
                  className="font-serif text-3xl font-bold sm:text-4xl"
                  style={{ color: GOLD, textShadow: `0 0 20px ${GOLD}25` }}
                >
                  Gallery
                </h2>
              </div>

              {/* Full-width 4-column grid with colorful borders */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {invite.galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="gallery-pop aspect-square overflow-hidden rounded-xl shadow-lg"
                    style={{
                      border: `2px solid ${PHULKARI_COLORS[idx % 4]}40`,
                      boxShadow: `0 4px 20px ${PHULKARI_COLORS[idx % 4]}15`,
                    }}
                  >
                    <div
                      className="h-full w-full bg-cover bg-center transition-transform duration-500 hover:scale-110"
                      style={{ backgroundImage: `url(${img})` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <ColorBandDivider />

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 4 -- THINGS TO KNOW                                     */}
        {/* ---------------------------------------------------------------- */}
        {thingsToKnow.length > 0 && (
          <section className="px-4 pb-16">
            <div className="mx-auto max-w-3xl">
              <div className="punjabi-reveal mb-10 text-center">
                <p className="mb-2 text-xs tracking-[0.35em] text-[#00CC44] uppercase">
                  Helpful Information
                </p>
                <h2
                  className="font-serif text-3xl font-bold sm:text-4xl"
                  style={{ color: GOLD, textShadow: `0 0 20px ${GOLD}25` }}
                >
                  Things to Know
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {thingsToKnow.map((item, idx) => (
                  <div
                    key={idx}
                    className={`rounded-2xl border-2 p-6 backdrop-blur-sm ${
                      idx % 2 === 0 ? "info-slide-left" : "info-slide-right"
                    }`}
                    style={{
                      borderColor: `${PHULKARI_COLORS[idx % 4]}25`,
                      background: "linear-gradient(135deg, rgba(35,14,40,0.6), rgba(20,8,22,0.8))",
                      boxShadow: `0 4px 20px ${PHULKARI_COLORS[idx % 4]}08`,
                    }}
                  >
                    <h3 className="mb-2 font-serif text-lg font-semibold" style={{ color: PHULKARI_COLORS[idx % 4] }}>
                      {item.label}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: `${CREAM}88` }}>
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ---------------------------------------------------------------- */}
        {/*  STORY                                                           */}
        {/* ---------------------------------------------------------------- */}
        {invite.story && (
          <section className="px-4 pb-16">
            <div className="mx-auto max-w-3xl">
              <div
                className="punjabi-reveal rounded-3xl border-2 p-8 text-center backdrop-blur-sm sm:p-12"
                style={{
                  borderColor: `${GOLD}25`,
                  background: "linear-gradient(145deg, rgba(40,16,46,0.7), rgba(20,8,22,0.9))",
                  boxShadow: `0 8px 40px ${GOLD}08, inset 0 1px 0 ${GOLD}15`,
                }}
              >
                <PunjabiMotif className="mx-auto mb-4 h-12 w-12" />
                <h2 className="mb-3 font-serif text-3xl font-bold" style={{ color: GOLD, textShadow: `0 0 20px ${GOLD}25` }}>
                  Our Story
                </h2>
                <BanglesBorder className="mx-auto my-4 h-6 w-48" />
                <p className="leading-relaxed text-lg" style={{ color: `${CREAM}AA` }}>{invite.story}</p>
              </div>
            </div>
          </section>
        )}

        <div className="mx-auto max-w-lg px-4">
          <PhulkariBorder />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 5 -- COUNTDOWN TIMER                                    */}
        {/* ---------------------------------------------------------------- */}
        {invite.weddingDate && (
          <section className="px-4 py-16">
            <div className="mx-auto max-w-3xl">
              <div className="punjabi-reveal mb-8 text-center">
                <p className="mb-2 text-xs tracking-[0.35em] text-[#FF1493] uppercase">
                  The Big Day is Coming
                </p>
                <h2
                  className="font-serif text-3xl font-bold sm:text-4xl"
                  style={{ color: GOLD, textShadow: `0 0 25px ${GOLD}30` }}
                >
                  Counting Down
                </h2>
              </div>

              <div
                className="rounded-3xl border-2 p-8 backdrop-blur-sm sm:p-10"
                style={{
                  borderColor: "#FF149325",
                  background: "linear-gradient(145deg, rgba(40,16,46,0.7), rgba(20,8,22,0.9))",
                  boxShadow: "0 8px 40px #FF149310",
                }}
              >
                <div className="grid grid-cols-4 gap-3 sm:gap-6">
                  {[
                    { label: "Days", value: countdown.days, color: "#FF1493" },
                    { label: "Hours", value: countdown.hours, color: "#FF9933" },
                    { label: "Minutes", value: countdown.minutes, color: "#00CC44" },
                    { label: "Seconds", value: countdown.seconds, color: "#0066FF" },
                  ].map((unit) => (
                    <div key={unit.label} className="dhol-countdown text-center">
                      <div
                        className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border-2 sm:h-20 sm:w-20"
                        style={{
                          borderColor: `${unit.color}35`,
                          background: `linear-gradient(145deg, ${unit.color}12, #0F050F)`,
                          boxShadow: `0 4px 20px ${unit.color}15, inset 0 1px 0 ${unit.color}20`,
                        }}
                      >
                        <span
                          className="font-serif text-2xl font-bold sm:text-3xl"
                          style={{ color: unit.color, textShadow: `0 0 15px ${unit.color}50` }}
                        >
                          {String(unit.value).padStart(2, "0")}
                        </span>
                      </div>
                      <span
                        className="mt-2 block text-[10px] tracking-[0.25em] uppercase"
                        style={{ color: `${unit.color}99` }}
                      >
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <p className="text-sm" style={{ color: `${CREAM}77` }}>
                    {formatWeddingDate(invite.weddingDate)}
                    {invite.weddingTime && ` at ${invite.weddingTime}`}
                  </p>
                  {invite.venue && (
                    <p className="mt-1 flex items-center justify-center gap-1 text-sm" style={{ color: `${CREAM}55` }}>
                      <MapPin className="h-3 w-3" /> {invite.venue}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        <ColorBandDivider />

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 6 -- COUPLE MESSAGE                                     */}
        {/* ---------------------------------------------------------------- */}
        {invite.coupleMessage && (
          <section className="px-4 pb-16">
            <div className="mx-auto max-w-3xl">
              <div
                className="punjabi-reveal rounded-3xl border-2 p-8 text-center backdrop-blur-sm sm:p-12"
                style={{
                  borderColor: "#FF993325",
                  background: "linear-gradient(145deg, rgba(40,16,46,0.6), rgba(20,8,22,0.85))",
                  boxShadow: "0 8px 40px #FF993308",
                }}
              >
                <DholIcon className="mx-auto mb-5 h-14 w-12 text-[#FF9933]/40" />
                <p
                  className="font-serif text-xl leading-relaxed italic sm:text-2xl"
                  style={{ color: `${CREAM}CC` }}
                >
                  &ldquo;{invite.coupleMessage}&rdquo;
                </p>
                <div className="mx-auto my-4 h-px w-24" style={{ background: `linear-gradient(90deg, transparent, #FF1493, transparent)` }} />
                <p className="text-sm font-medium" style={{ color: "#FF149399" }}>
                  &mdash; {invite.groomName} & {invite.brideName}
                </p>
              </div>
            </div>
          </section>
        )}

        <div className="mx-auto max-w-lg px-4">
          <BanglesBorder />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 7 -- RSVP + SHARE BUTTONS                               */}
        {/* ---------------------------------------------------------------- */}
        <section className="px-4 py-16 text-center">
          <div className="punjabi-reveal mx-auto max-w-3xl">
            <h2
              className="mb-4 font-serif text-4xl font-bold sm:text-5xl"
              style={{ color: GOLD, textShadow: `0 0 30px ${GOLD}30` }}
            >
              Come Celebrate With Us!
            </h2>
            <p className="mb-8 text-sm" style={{ color: `${CREAM}77` }}>
              It would mean the world to have you join in the festivities and bless the happy couple.
            </p>

            {hashtag && (
              <motion.p
                className="mb-6 font-serif text-xl font-semibold italic"
                style={{ color: "#FF149399" }}
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {hashtag}
              </motion.p>
            )}

            <div className="flex flex-col items-center gap-4">
              <Button
                size="lg"
                className="w-full max-w-xs rounded-xl border-2 border-[#FF1493]/60 bg-[#FF1493] py-6 text-base font-bold text-white shadow-xl shadow-[#FF1493]/25 transition-all hover:scale-105 hover:bg-[#FF1493]/90 hover:shadow-[#FF1493]/40"
                onClick={() => setRsvpOpen(true)}
              >
                <Heart className="mr-2 h-5 w-5 fill-white" />
                RSVP Now
              </Button>

              <div className="flex w-full max-w-xs gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 rounded-xl border-2 border-[#FF9933]/40 bg-transparent py-5 text-[#FF9933] transition-all hover:scale-105 hover:border-[#FF9933]/60 hover:bg-[#FF9933]/10 hover:text-[#FF9933]"
                  onClick={() => void handleShare()}
                >
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-xl border-2 border-[#00CC44]/40 bg-transparent py-5 text-[#00CC44] transition-all hover:scale-105 hover:border-[#00CC44]/60 hover:bg-[#00CC44]/10 hover:text-[#00CC44]"
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
        {/*  SECTION 8 -- FOOTER / WATERMARK                                 */}
        {/* ---------------------------------------------------------------- */}
        <footer className="px-4 pb-8 text-center">
          <PhulkariBorder className="mx-auto mb-6 h-10 w-full max-w-lg" />

          <div className="punjabi-reveal">
            <DholIcon className="mx-auto mb-4 h-12 w-10 text-[#FF9933]/30" />
            <p
              className="font-serif text-xl font-semibold"
              style={{ color: `${GOLD}99` }}
            >
              {invite.groomName} & {invite.brideName}
            </p>
            <p className="mt-1 text-sm" style={{ color: `${CREAM}55` }}>
              {formatWeddingDate(invite.weddingDate)}
            </p>
            {invite.venue && (
              <p className="mt-1 text-xs" style={{ color: `${CREAM}40` }}>
                {invite.venue}
              </p>
            )}

            {/* Closing Punjabi line */}
            <div className="mt-8">
              <TruckArtFrame className="mx-auto mb-3 h-5 w-40" />
              <p className="font-serif text-sm italic" style={{ color: `${GOLD}55` }}>
                Bole So Nihaal, Sat Sri Akaal!
              </p>
            </div>
          </div>

          <CardoraWatermark className="mt-10 pb-4 text-center text-xs text-[#FFF8E7]/20" />
        </footer>
      </div>

      {/* RSVP Modal */}
      <RsvpModal open={rsvpOpen} onOpenChange={setRsvpOpen} inviteSlug={invite.slug} />
    </div>
  );
}
