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
/*  Rajput Crest — Shield with elephant silhouette                             */
/* -------------------------------------------------------------------------- */

function RajputCrest({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "h-28 w-28 text-[#FFD700]"}
    >
      {/* Shield outline */}
      <path
        d="M100 10 L180 50 L180 140 Q180 200 100 250 Q20 200 20 140 L20 50 Z"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        opacity="0.5"
      />
      {/* Inner shield border */}
      <path
        d="M100 22 L170 56 L170 138 Q170 192 100 238 Q30 192 30 138 L30 56 Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        opacity="0.3"
      />
      {/* Elephant silhouette */}
      <path
        d="M70 160 Q60 155 55 140 Q52 130 56 120 Q60 112 65 110
           L65 95 Q63 85 68 80 Q75 75 80 80 L82 90
           Q90 85 100 85 Q110 85 118 90 L120 80
           Q125 75 132 80 Q137 85 135 95 L135 110
           Q140 112 144 120 Q148 130 145 140 Q140 155 130 160
           L128 175 Q125 180 120 180 L115 170
           Q108 175 100 175 Q92 175 85 170 L80 180
           Q75 180 72 175 Z"
        fill="currentColor"
        opacity="0.35"
      />
      {/* Elephant eye */}
      <circle cx="78" cy="100" r="2.5" fill="currentColor" opacity="0.6" />
      {/* Elephant tusk */}
      <path
        d="M68 115 Q64 120 66 125"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
      {/* Crown at top of shield */}
      <path
        d="M80 38 L85 28 L90 35 L95 22 L100 35 L105 22 L110 35 L115 28 L120 38"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      <line x1="80" y1="38" x2="120" y2="38" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      {/* Decorative dots at cardinal points */}
      <circle cx="100" cy="248" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="22" cy="95" r="2.5" fill="currentColor" opacity="0.4" />
      <circle cx="178" cy="95" r="2.5" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Haveli Arch Border — Repeating arch pattern                                */
/* -------------------------------------------------------------------------- */

function HaveliArchBorder({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "mx-auto my-6 h-14 w-full text-[#FFD700]"}
    >
      {/* Repeating haveli arches */}
      {[0, 75, 150, 225, 300, 375, 450, 525].map((x) => (
        <g key={x}>
          {/* Outer arch */}
          <path
            d={`M${x + 5} 55 Q${x + 5} 20 ${x + 37.5} 12 Q${x + 70} 20 ${x + 70} 55`}
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
            opacity="0.4"
          />
          {/* Inner arch */}
          <path
            d={`M${x + 15} 55 Q${x + 15} 28 ${x + 37.5} 22 Q${x + 60} 28 ${x + 60} 55`}
            stroke="currentColor"
            strokeWidth="0.6"
            fill="none"
            opacity="0.25"
          />
          {/* Finial atop arch */}
          <circle cx={x + 37.5} cy="10" r="2" fill="currentColor" opacity="0.5" />
          {/* Small lotus at base of each arch */}
          <ellipse cx={x + 37.5} cy="55" rx="5" ry="2.5" fill="currentColor" opacity="0.15" />
        </g>
      ))}
      {/* Bottom line */}
      <line x1="0" y1="60" x2="600" y2="60" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line x1="0" y1="63" x2="600" y2="63" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Miniature Painting Frame — Ornamental frame element                        */
/* -------------------------------------------------------------------------- */

function MiniaturePaintingFrame({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "mx-auto my-6 h-8 w-64 text-[#FFD700]"}
    >
      {/* Central medallion */}
      <circle cx="150" cy="20" r="8" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.5" />
      <circle cx="150" cy="20" r="4" fill="currentColor" opacity="0.3" />
      <circle cx="150" cy="20" r="1.5" fill="currentColor" opacity="0.6" />
      {/* Left ornamental line */}
      <path
        d="M138 20 Q120 10 100 20 Q85 25 65 20 Q50 15 30 20 Q15 22 5 20"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M138 20 Q120 30 100 20 Q85 15 65 20 Q50 25 30 20"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
        opacity="0.2"
      />
      {/* Right ornamental line */}
      <path
        d="M162 20 Q180 10 200 20 Q215 25 235 20 Q250 15 270 20 Q285 22 295 20"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M162 20 Q180 30 200 20 Q215 15 235 20 Q250 25 270 20"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
        opacity="0.2"
      />
      {/* End diamonds */}
      <path d="M5 17 L8 20 L5 23 L2 20 Z" fill="currentColor" opacity="0.35" />
      <path d="M295 17 L298 20 L295 23 L292 20 Z" fill="currentColor" opacity="0.35" />
      {/* Side medallions */}
      <circle cx="100" cy="20" r="2.5" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.3" />
      <circle cx="200" cy="20" r="2.5" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.3" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Elephant Silhouette — Standalone procession elephant                       */
/* -------------------------------------------------------------------------- */

function ElephantSilhouette({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "h-16 w-16 text-[#FFD700]"}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        d="M25 75 Q18 72 15 62 Q13 55 16 48 Q19 42 23 40 L23 30 Q21 22 25 18 Q30 14 34 18
           L35 25 Q40 22 48 22 Q56 22 62 25 L63 18 Q67 14 72 18 Q76 22 74 30 L74 40
           Q78 42 81 48 Q84 55 82 62 Q79 72 72 75 L71 85 Q69 88 66 88 L63 80
           Q58 83 50 83 Q42 83 37 80 L34 88 Q31 88 29 85 Z"
        fill="currentColor"
        opacity="0.2"
      />
      {/* Howdah (seat) on top */}
      <rect x="35" y="12" width="28" height="12" rx="2" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.15" />
      <path d="M38 12 L49 4 L60 12" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.15" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Gold Stamp Border SVG — draws itself via strokeDashoffset                  */
/* -------------------------------------------------------------------------- */

function StampBorderRect({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? "pointer-events-none absolute inset-0 h-full w-full"}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        className="stamp-border-path"
        x="2"
        y="2"
        width="96"
        height="96"
        rx="12"
        stroke="#FFD700"
        strokeWidth="1.5"
        strokeDasharray="400"
        strokeDashoffset="400"
        opacity="0.6"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Haveli Event Card — 3D page-flip with arch styling                         */
/* -------------------------------------------------------------------------- */

function HaveliEventCard({
  event,
  index,
}: {
  event: { name: string; date: string; venue: string; time: string };
  index: number;
}) {
  const isEven = index % 2 === 0;
  return (
    <div
      className="page-flip"
      style={{ perspective: "1000px" }}
      data-flip-direction={isEven ? "left" : "right"}
    >
      <div
        className="relative overflow-hidden rounded-b-2xl border border-[#FFD700]/30 shadow-lg shadow-black/30 backdrop-blur-sm"
        style={{
          background: isEven
            ? "linear-gradient(to bottom, rgba(139,69,19,0.5), rgba(42,10,10,0.85))"
            : "linear-gradient(to bottom, rgba(128,0,0,0.5), rgba(42,10,10,0.85))",
          clipPath:
            "polygon(0 15%, 5% 5%, 15% 1%, 30% 0%, 50% 0%, 70% 0%, 85% 1%, 95% 5%, 100% 15%, 100% 100%, 0% 100%)",
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
        }}
      >
        {/* Arch top decorative border */}
        <div className="pointer-events-none absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700]/60 to-transparent" />

        <div className="p-6 pt-10">
          {/* Event icon */}
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#FFD700]/40 bg-gradient-to-b from-[#FFD700]/15 to-transparent">
              <span className="text-xl">
                {index === 0 && "\u{1FAB7}"}
                {index === 1 && "\u{1F33F}"}
                {index === 2 && "\u{1F3B5}"}
                {index === 3 && "\u{1F525}"}
                {index === 4 && "\u{1F389}"}
                {index > 4 && "\u{2728}"}
              </span>
            </div>
          </div>

          {/* Event name */}
          <h3 className="mb-3 text-center font-serif text-2xl font-semibold tracking-wide text-[#FFD700]">
            {event.name}
          </h3>

          {/* Gold divider */}
          <div className="mx-auto mb-4 h-px w-20 bg-gradient-to-r from-transparent via-[#FFD700]/70 to-transparent" />

          {/* Date & Time */}
          <div className="mb-2 flex items-center justify-center gap-2 text-sm text-[#FFF8E7]/80">
            <Calendar className="h-3.5 w-3.5 text-[#FFD700]/70" />
            <span>{event.date}</span>
          </div>
          <div className="mb-3 flex items-center justify-center gap-2 text-sm text-[#FFF8E7]/80">
            <Clock className="h-3.5 w-3.5 text-[#FFD700]/70" />
            <span>{event.time}</span>
          </div>

          {/* Venue */}
          <div className="flex items-center justify-center gap-2 text-sm text-[#FFF8E7]/60">
            <MapPin className="h-3.5 w-3.5 text-[#FFD700]/50" />
            <span>{event.venue}</span>
          </div>
        </div>

        {/* Corner decorations */}
        <div className="pointer-events-none absolute bottom-2 left-2 h-6 w-6 border-b border-l border-[#FFD700]/20" />
        <div className="pointer-events-none absolute right-2 bottom-2 h-6 w-6 border-r border-b border-[#FFD700]/20" />

        {/* Subtle inner glow */}
        <div className="pointer-events-none absolute inset-0 rounded-b-2xl shadow-[inset_0_0_60px_rgba(255,215,0,0.03)]" />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Template Component                                                    */
/* -------------------------------------------------------------------------- */

export default function RoyalRajputTemplate({ invite, isDemo }: TemplateProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const { isPlaying, toggle } = useMusicPlayer(invite.musicUrl);
  const countdown = useCountdown(invite.weddingDate);

  // Initialize Lenis smooth scrolling
  useLenis();

  // Memoized share handler
  const handleShare = useCallback(async () => {
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
  }, [invite.slug, invite.groomName, invite.brideName]);

  // GSAP ScrollTrigger animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ---- Hero: Crest stamp-down ---- */
      const crestEl = document.querySelector(".crest-stamp");
      if (crestEl) {
        const tl = gsap.timeline({ delay: 0.3 });
        tl.fromTo(
          crestEl,
          { opacity: 0, scale: 1.5, y: -80 },
          { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "power4.out" },
        );
        // Screen shake after stamp
        tl.to(
          containerRef.current,
          {
            keyframes: [
              { x: -2, duration: 0.06 },
              { x: 2, duration: 0.06 },
              { x: -1, duration: 0.06 },
              { x: 1, duration: 0.06 },
              { x: 0, duration: 0.06 },
            ],
            ease: "power2.out",
          },
          "-=0.1",
        );
      }

      /* ---- Hero: Gold shimmer on couple names ---- */
      gsap.utils.toArray<HTMLElement>(".gold-shimmer").forEach((el) => {
        gsap.fromTo(
          el,
          { backgroundPosition: "-200% center" },
          {
            backgroundPosition: "200% center",
            duration: 3,
            delay: 1.2,
            ease: "power1.inOut",
            repeat: -1,
            repeatDelay: 4,
          },
        );
      });

      /* ---- Section transitions: Gate-opening reveal ---- */
      gsap.utils.toArray<HTMLElement>(".rajput-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(0 50% 0 50%)", opacity: 0.3 },
          {
            clipPath: "inset(0 0% 0 0%)",
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      /* ---- Event cards: 3D page flip ---- */
      gsap.utils.toArray<HTMLElement>(".page-flip").forEach((el, i) => {
        const dir = el.dataset.flipDirection;
        const startRotation = dir === "left" ? -90 : 90;
        gsap.fromTo(
          el,
          { opacity: 0, rotateY: startRotation, transformOrigin: dir === "left" ? "left center" : "right center" },
          {
            opacity: 1,
            rotateY: 0,
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

      /* ---- Countdown: Royal stamp boxes ---- */
      gsap.utils.toArray<HTMLElement>(".royal-countdown").forEach((el, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
        // Drop and tilt
        tl.fromTo(
          el,
          { opacity: 0, y: -50, rotation: -5 },
          { opacity: 1, y: 0, rotation: 0, duration: 0.6, delay: i * 0.12, ease: "power3.out" },
        );
        // Gold border draw-in
        const borderPath = el.querySelector(".stamp-border-path");
        if (borderPath) {
          tl.to(
            borderPath,
            { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" },
            "-=0.2",
          );
        }
      });

      /* ---- Ambient: Hue-shifting background ---- */
      const bgEl = containerRef.current?.querySelector<HTMLElement>(".hue-shift-bg");
      if (bgEl) {
        gsap.fromTo(
          bgEl,
          { filter: "hue-rotate(0deg)" },
          {
            filter: "hue-rotate(15deg)",
            ease: "none",
            scrollTrigger: {
              trigger: bgEl,
              start: "top top",
              end: "bottom bottom",
              scrub: 2,
            },
          },
        );
      }

      /* ---- Generic scroll-fade for remaining elements ---- */
      gsap.utils.toArray<HTMLElement>(".scroll-fade").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
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

      /* ---- Parallax pattern ---- */
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Default events for Hindu Rajput wedding
  const events = invite.events ?? [
    { name: "Tilak", date: "Date TBA", venue: invite.venue ?? "Venue TBA", time: "10 AM" },
    { name: "Mehendi", date: "Date TBA", venue: invite.venue ?? "Venue TBA", time: "4 PM" },
    { name: "Sangeet", date: "Date TBA", venue: invite.venue ?? "Venue TBA", time: "7 PM" },
    { name: "Baraat / Wedding Ceremony", date: invite.weddingDate ?? "Date TBA", venue: invite.venue ?? "Venue TBA", time: "11 AM" },
    { name: "Reception", date: invite.receptionDate ?? "Date TBA", venue: invite.venue ?? "Venue TBA", time: "7 PM" },
  ];

  // Extract Things to Know data and hashtag from extraData
  const thingsToKnow = (invite.extraData?.thingsToKnow as { label: string; detail: string }[] | undefined) ?? [];
  const hashtag = (invite.extraData?.hashtag as string | undefined) ?? null;

  return (
    <div
      ref={containerRef}
      className="hue-shift-bg relative min-h-screen overflow-hidden bg-gradient-to-b from-[#2A0A0A] via-[#1A0505] to-[#2A0A0A] text-[#FFF8E7]"
    >
      {/* Particle layer */}
      <ParticleLayer type="LIGHT" />

      {/* Subtle Rajasthani jali pattern overlay */}
      <div className="parallax-pattern pointer-events-none fixed inset-0 z-0 opacity-[0.04]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23FFD700' stroke-width='0.5'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z'/%3E%3Ccircle cx='30' cy='30' r='12'/%3E%3Ccircle cx='30' cy='30' r='6'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Maroon vignette overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(42,10,10,0.6) 100%)",
        }}
      />

      {/* Music toggle */}
      {invite.musicUrl && (
        <MusicToggleButton
          isPlaying={isPlaying}
          onToggle={toggle}
          className="fixed top-4 right-4 z-50 rounded-full border border-[#FFD700]/30 bg-[#2A0A0A]/80 p-3 shadow-lg backdrop-blur-sm transition-colors hover:bg-[#2A0A0A]"
        />
      )}

      {/* Demo banner */}
      {isDemo && (
        <div className="relative z-10 bg-gradient-to-r from-[#D4A017] to-[#FFD700] py-2 text-center text-sm font-medium text-[#2A0A0A]">
          This is a demo preview. Complete payment to use your own details.
        </div>
      )}

      {/* ================================================================== */}
      {/*  CONTENT                                                           */}
      {/* ================================================================== */}
      <div className="relative z-10">

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 1 — HERO (Full viewport height)                         */}
        {/* ---------------------------------------------------------------- */}
        <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16">
          {/* Background hero image layer */}
          {invite.heroImage && (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-15"
              style={{ backgroundImage: `url(${invite.heroImage})` }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[#2A0A0A]/60 via-transparent to-[#2A0A0A]" />

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            {/* Rajput Crest — stamp-down */}
            <div className="crest-stamp mx-auto mb-8 flex justify-center opacity-0">
              <RajputCrest className="h-28 w-28 text-[#FFD700]/80 drop-shadow-[0_0_20px_rgba(255,215,0,0.3)] sm:h-36 sm:w-36" />
            </div>

            {/* Hindi heading */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mb-6"
            >
              <p className="font-serif text-4xl leading-relaxed text-[#FFD700] sm:text-5xl">
                &#2352;&#2366;&#2332;&#2346;&#2370;&#2340; &#2357;&#2367;&#2357;&#2366;&#2361;
              </p>
              <p className="mt-3 text-xs tracking-[0.25em] text-[#FFF8E7]/50 uppercase">
                A Royal Rajput Wedding
              </p>
            </motion.div>

            <MiniaturePaintingFrame className="mx-auto my-6 h-8 w-72 text-[#FFD700]" />

            {/* Parent blessings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0 }}
              className="mb-10"
            >
              <p className="mb-2 text-xs tracking-[0.2em] text-[#FFF8E7]/50 uppercase">
                With the blessings of
              </p>
              <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Groom's parents */}
                <div className="text-center">
                  {invite.groomFatherName && invite.groomMotherName ? (
                    <>
                      <p className="text-xs tracking-wider text-[#D4A017]/80 uppercase">
                        Son of
                      </p>
                      <p className="mt-1 font-serif text-lg text-[#FFF8E7]/90">
                        {invite.groomFatherName}
                      </p>
                      <p className="font-serif text-sm text-[#FFF8E7]/70">
                        & {invite.groomMotherName}
                      </p>
                    </>
                  ) : invite.groomFatherName ? (
                    <>
                      <p className="text-xs tracking-wider text-[#D4A017]/80 uppercase">Son of</p>
                      <p className="mt-1 font-serif text-lg text-[#FFF8E7]/90">{invite.groomFatherName}</p>
                    </>
                  ) : null}
                </div>

                {/* Bride's parents */}
                <div className="text-center">
                  {invite.brideFatherName && invite.brideMotherName ? (
                    <>
                      <p className="text-xs tracking-wider text-[#D4A017]/80 uppercase">
                        Daughter of
                      </p>
                      <p className="mt-1 font-serif text-lg text-[#FFF8E7]/90">
                        {invite.brideFatherName}
                      </p>
                      <p className="font-serif text-sm text-[#FFF8E7]/70">
                        & {invite.brideMotherName}
                      </p>
                    </>
                  ) : invite.brideFatherName ? (
                    <>
                      <p className="text-xs tracking-wider text-[#D4A017]/80 uppercase">Daughter of</p>
                      <p className="mt-1 font-serif text-lg text-[#FFF8E7]/90">{invite.brideFatherName}</p>
                    </>
                  ) : null}
                </div>
              </div>
            </motion.div>

            {/* Invitation text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="mb-6 text-sm tracking-[0.15em] text-[#FFF8E7]/50 uppercase"
            >
              Request the honour of your presence at the wedding of
            </motion.p>

            {/* Couple Names — with gold shimmer */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <h1
                className="gold-shimmer bg-gradient-to-r from-[#FFD700] via-[#FFF8E7] to-[#FFD700] bg-[length:200%_100%] bg-clip-text font-serif text-6xl font-light leading-tight text-transparent sm:text-7xl lg:text-8xl"
              >
                {invite.groomName}
              </h1>

              {/* Gold divider with heart */}
              <div className="my-5 flex items-center justify-center gap-5">
                <motion.div
                  className="h-px w-20 bg-gradient-to-r from-transparent to-[#FFD700]/60 sm:w-28"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                />
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1.6, duration: 0.6, type: "spring" }}
                >
                  <Heart className="h-6 w-6 fill-[#800000]/60 text-[#FFD700]" />
                </motion.div>
                <motion.div
                  className="h-px w-20 bg-gradient-to-l from-transparent to-[#FFD700]/60 sm:w-28"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                />
              </div>

              <h1
                className="gold-shimmer bg-gradient-to-r from-[#FFD700] via-[#FFF8E7] to-[#FFD700] bg-[length:200%_100%] bg-clip-text font-serif text-6xl font-light leading-tight text-transparent sm:text-7xl lg:text-8xl"
              >
                {invite.brideName}
              </h1>
            </motion.div>

            {/* Wedding date preview */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="mt-8 text-base text-[#FFF8E7]/60"
            >
              {formatWeddingDate(invite.weddingDate)}
            </motion.p>

            {/* Elephant procession decoration */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
              className="mt-8 flex items-center justify-center gap-4"
            >
              <ElephantSilhouette className="h-10 w-10 text-[#FFD700]/30" flip />
              <div className="h-px w-16 bg-[#FFD700]/20" />
              <ElephantSilhouette className="h-10 w-10 text-[#FFD700]/30" />
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.2 }}
              className="mt-12"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="mx-auto h-10 w-px bg-gradient-to-b from-[#FFD700]/50 to-transparent"
              />
            </motion.div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 2 — EVENTS (Full width, alternating backgrounds)        */}
        {/* ---------------------------------------------------------------- */}
        <section className="relative w-full">
          {/* Section header */}
          <div className="rajput-reveal py-12 text-center">
            <p className="mb-3 text-xs tracking-[0.3em] text-[#D4A017]/70 uppercase">
              Royal Celebrations
            </p>
            <h2 className="font-serif text-4xl text-[#FFD700] sm:text-5xl">
              Wedding Events
            </h2>
            <HaveliArchBorder className="mx-auto mt-6 h-12 w-full max-w-xl text-[#FFD700]/60" />
          </div>

          {/* Event cards grid with perspective parent */}
          <div className="mx-auto max-w-4xl px-4 pb-12" style={{ perspective: "1200px" }}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event, index) => (
                <HaveliEventCard key={index} event={event} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Full-width divider */}
        <div className="mx-auto max-w-3xl px-4">
          <MiniaturePaintingFrame />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 3 — COUPLE PHOTO                                        */}
        {/* ---------------------------------------------------------------- */}
        {invite.couplePhoto && (
          <section className="rajput-reveal mx-auto max-w-3xl px-4 py-16">
            <div className="relative overflow-hidden rounded-3xl border-2 border-[#FFD700]/25 shadow-2xl shadow-[#FFD700]/10">
              {/* Ornamental corner pieces */}
              <div className="pointer-events-none absolute top-3 left-3 z-10 h-10 w-10 border-t-2 border-l-2 border-[#FFD700]/40 rounded-tl-lg" />
              <div className="pointer-events-none absolute top-3 right-3 z-10 h-10 w-10 border-t-2 border-r-2 border-[#FFD700]/40 rounded-tr-lg" />
              <div className="pointer-events-none absolute bottom-3 left-3 z-10 h-10 w-10 border-b-2 border-l-2 border-[#FFD700]/40 rounded-bl-lg" />
              <div className="pointer-events-none absolute right-3 bottom-3 z-10 h-10 w-10 border-r-2 border-b-2 border-[#FFD700]/40 rounded-br-lg" />

              <div
                className="aspect-[4/3] w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${invite.couplePhoto})` }}
              />
            </div>
            <div className="mt-5 text-center">
              <p className="font-serif text-xl tracking-wide text-[#FFF8E7]/60 italic">
                {invite.groomName} & {invite.brideName}
              </p>
            </div>
          </section>
        )}

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 4 — GALLERY (Full width, 4-column masonry)              */}
        {/* ---------------------------------------------------------------- */}
        {invite.galleryImages.length > 0 && (
          <section className="w-full py-16">
            <div className="rajput-reveal mb-10 text-center">
              <p className="mb-2 text-xs tracking-[0.3em] text-[#D4A017]/60 uppercase">
                Captured Moments
              </p>
              <h2 className="font-serif text-3xl text-[#FFD700] sm:text-4xl">Gallery</h2>
            </div>
            <div className="mx-auto max-w-6xl columns-2 gap-3 px-4 sm:columns-3 lg:columns-4">
              {invite.galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  className="scroll-fade mb-3 break-inside-avoid overflow-hidden rounded-xl border border-[#FFD700]/15 shadow-md shadow-black/30"
                >
                  <div
                    className="w-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
                    style={{
                      backgroundImage: `url(${img})`,
                      aspectRatio: idx % 3 === 0 ? "3/4" : idx % 3 === 1 ? "1/1" : "4/3",
                    }}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="mx-auto max-w-3xl px-4">
          <HaveliArchBorder />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 5 — THINGS TO KNOW                                      */}
        {/* ---------------------------------------------------------------- */}
        {thingsToKnow.length > 0 && (
          <section className="mx-auto max-w-3xl px-4 py-16">
            <div className="rajput-reveal mb-10 text-center">
              <p className="mb-2 text-xs tracking-[0.3em] text-[#D4A017]/60 uppercase">
                Helpful Information
              </p>
              <h2 className="font-serif text-3xl text-[#FFD700] sm:text-4xl">
                Things to Know
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {thingsToKnow.map((item, idx) => (
                <div
                  key={idx}
                  className="scroll-fade rounded-2xl border border-[#FFD700]/20 bg-gradient-to-br from-[#800000]/20 to-[#2A0A0A]/60 p-6 backdrop-blur-sm"
                >
                  <h3 className="mb-3 font-serif text-lg text-[#FFD700]">
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
        {/*  SECTION 6 — OUR STORY                                           */}
        {/* ---------------------------------------------------------------- */}
        {invite.story && (
          <section className="mx-auto max-w-3xl px-4 py-16">
            <div className="rajput-reveal rounded-3xl border border-[#FFD700]/20 bg-gradient-to-br from-[#800000]/15 to-[#2A0A0A]/50 p-8 text-center backdrop-blur-sm sm:p-12">
              <ElephantSilhouette className="mx-auto mb-4 h-12 w-12 text-[#FFD700]/25" />
              <h2 className="mb-3 font-serif text-3xl text-[#FFD700]">
                Our Story
              </h2>
              <MiniaturePaintingFrame className="mx-auto my-5 h-6 w-48 text-[#FFD700]/50" />
              <p className="text-lg leading-relaxed text-[#FFF8E7]/70">
                {invite.story}
              </p>
            </div>
          </section>
        )}

        <div className="mx-auto max-w-3xl px-4">
          <MiniaturePaintingFrame />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 7 — COUNTDOWN TIMER (Royal Stamp Boxes)                 */}
        {/* ---------------------------------------------------------------- */}
        {invite.weddingDate && (
          <section className="mx-auto max-w-3xl px-4 py-16">
            <div className="rajput-reveal mb-10 text-center">
              <p className="mb-2 text-xs tracking-[0.3em] text-[#D4A017]/60 uppercase">
                The Auspicious Day
              </p>
              <h2 className="font-serif text-4xl text-[#FFD700]">
                Counting Down
              </h2>
            </div>

            <div className="rounded-3xl border border-[#FFD700]/20 bg-gradient-to-br from-[#800000]/15 to-[#2A0A0A]/50 p-8 backdrop-blur-sm sm:p-10">
              <div className="grid grid-cols-4 gap-4 sm:gap-8">
                {[
                  { label: "Days", value: countdown.days },
                  { label: "Hours", value: countdown.hours },
                  { label: "Minutes", value: countdown.minutes },
                  { label: "Seconds", value: countdown.seconds },
                ].map((unit) => (
                  <div key={unit.label} className="royal-countdown text-center">
                    <div className="relative mx-auto flex h-18 w-18 items-center justify-center rounded-xl border border-[#FFD700]/20 bg-[#2A0A0A]/70 sm:h-24 sm:w-24">
                      <StampBorderRect />
                      <span className="relative z-10 font-serif text-3xl font-bold text-[#FFD700] sm:text-4xl">
                        {String(unit.value).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="mt-3 block text-[10px] tracking-[0.25em] text-[#FFF8E7]/50 uppercase sm:text-xs">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-[#FFF8E7]/50">
                  {formatWeddingDate(invite.weddingDate)}
                  {invite.weddingTime && ` at ${invite.weddingTime}`}
                </p>
                {invite.venue && (
                  <p className="mt-2 flex items-center justify-center gap-1.5 text-sm text-[#FFF8E7]/40">
                    <MapPin className="h-3.5 w-3.5" /> {invite.venue}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        <div className="mx-auto max-w-3xl px-4">
          <HaveliArchBorder />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 8 — COUPLE MESSAGE                                      */}
        {/* ---------------------------------------------------------------- */}
        {invite.coupleMessage && (
          <section className="mx-auto max-w-3xl px-4 py-16">
            <div className="rajput-reveal rounded-3xl border border-[#FFD700]/20 bg-gradient-to-br from-[#800000]/15 to-[#2A0A0A]/50 p-8 text-center backdrop-blur-sm sm:p-12">
              <RajputCrest className="mx-auto mb-5 h-12 w-12 text-[#FFD700]/40" />
              <p className="font-serif text-xl leading-relaxed text-[#FFF8E7]/80 italic sm:text-2xl">
                &ldquo;{invite.coupleMessage}&rdquo;
              </p>
              <MiniaturePaintingFrame className="mx-auto my-5 h-6 w-40 text-[#FFD700]/40" />
              <p className="text-sm tracking-wide text-[#D4A017]/70">
                &mdash; {invite.groomName} & {invite.brideName}
              </p>
            </div>
          </section>
        )}

        <div className="mx-auto max-w-3xl px-4">
          <MiniaturePaintingFrame />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 9 — RSVP + SHARE BUTTONS                               */}
        {/* ---------------------------------------------------------------- */}
        <section className="mx-auto max-w-3xl px-4 py-16 text-center">
          <div className="rajput-reveal">
            <ElephantSilhouette className="mx-auto mb-4 h-14 w-14 text-[#FFD700]/20" />
            <h2 className="mb-5 font-serif text-4xl text-[#FFD700]">
              Will You Join Us?
            </h2>
            <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-[#FFF8E7]/60">
              We would be honoured to have you grace this royal celebration with your presence.
            </p>

            {hashtag && (
              <p className="mb-5 font-serif text-xl text-[#D4A017]/70 italic">
                {hashtag}
              </p>
            )}

            <div className="flex flex-col items-center gap-4">
              <Button
                size="lg"
                className="w-full max-w-xs border-2 border-[#FFD700]/60 bg-gradient-to-r from-[#FFD700] to-[#D4A017] text-[#2A0A0A] shadow-lg shadow-[#FFD700]/20 transition-all hover:from-[#FFD700]/90 hover:to-[#D4A017]/90 hover:shadow-xl hover:shadow-[#FFD700]/30"
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
        {/*  SECTION 10 — FOOTER / WATERMARK                                 */}
        {/* ---------------------------------------------------------------- */}
        <footer className="pb-8 text-center">
          <div className="mx-auto max-w-3xl px-4">
            <HaveliArchBorder className="mx-auto mb-6 h-12 w-full text-[#FFD700]/30" />
          </div>

          <div className="scroll-fade">
            <RajputCrest className="mx-auto mb-4 h-10 w-10 text-[#FFD700]/25" />
            <p className="font-serif text-xl tracking-wide text-[#FFD700]/70">
              {invite.groomName} & {invite.brideName}
            </p>
            <p className="mt-2 text-sm text-[#FFF8E7]/40">
              {formatWeddingDate(invite.weddingDate)}
            </p>
            {invite.venue && (
              <p className="mt-1 text-xs text-[#FFF8E7]/30">
                {invite.venue}
              </p>
            )}

            {/* Elephant procession footer */}
            <div className="mt-6 flex items-center justify-center gap-3 opacity-30">
              <ElephantSilhouette className="h-8 w-8 text-[#FFD700]" flip />
              <div className="h-px w-10 bg-[#FFD700]/40" />
              <Heart className="h-3 w-3 text-[#FFD700]" />
              <div className="h-px w-10 bg-[#FFD700]/40" />
              <ElephantSilhouette className="h-8 w-8 text-[#FFD700]" />
            </div>

            <p className="mt-6 text-xs text-[#FFF8E7]/30 italic">
              May the royal heritage bless this eternal union
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
