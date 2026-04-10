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
/*  Islamic Tessellation Pattern SVG (enhanced with tile classes)              */
/* -------------------------------------------------------------------------- */

function IslamicTessellation({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "mx-auto my-6 h-16 w-full text-[#D4AF37]"}
    >
      {[0, 75, 150, 225, 300, 375, 450, 525].map((x) => (
        <g key={x} transform={`translate(${x}, 0)`} className="tess-tile">
          <polygon
            points="37,12 42,28 58,28 45,38 50,54 37,44 24,54 29,38 16,28 32,28"
            fill="currentColor"
            opacity="0.25"
          />
          <polygon
            points="37,24 44,30 44,40 37,46 30,40 30,30"
            fill="currentColor"
            opacity="0.4"
          />
          <circle cx="37" cy="35" r="2.5" fill="currentColor" opacity="0.6" />
          <line x1="0" y1="35" x2="16" y2="35" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          <line x1="58" y1="35" x2="75" y2="35" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          <line x1="37" y1="0" x2="37" y2="12" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
          <line x1="37" y1="54" x2="37" y2="68" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
        </g>
      ))}
      <line x1="0" y1="3" x2="600" y2="3" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
      <line x1="0" y1="67" x2="600" y2="67" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero Tessellation Grid - animated tile-by-tile background                  */
/* -------------------------------------------------------------------------- */

function HeroTessellationGrid() {
  const cols = 8;
  const rows = 10;
  const tiles: { x: number; y: number; key: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      tiles.push({ x: c * 75, y: r * 80, key: r * cols + c });
    }
  }
  return (
    <svg
      viewBox="0 0 600 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none absolute inset-0 h-full w-full text-[#D4AF37]"
      preserveAspectRatio="xMidYMid slice"
    >
      {tiles.map((t) => (
        <g key={t.key} transform={`translate(${t.x}, ${t.y})`} className="tess-tile">
          <polygon
            points="37,8 44,22 58,22 48,33 52,48 37,39 22,48 26,33 16,22 30,22"
            fill="currentColor"
            opacity="0.06"
          />
          <polygon
            points="37,20 43,26 43,36 37,42 31,36 31,26"
            fill="currentColor"
            opacity="0.08"
          />
          <circle cx="37" cy="31" r="2" fill="currentColor" opacity="0.1" />
        </g>
      ))}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Crescent and Star SVG                                                      */
/* -------------------------------------------------------------------------- */

function CrescentStar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "h-16 w-16 text-[#D4AF37]"}
    >
      <path
        d="M65 10 A42 42 0 1 0 65 110 A34 34 0 1 1 65 10Z"
        fill="currentColor"
        opacity="0.55"
      />
      <polygon
        points="82,28 86,40 98,40 88,48 92,60 82,52 72,60 76,48 66,40 78,40"
        fill="currentColor"
        opacity="0.65"
      />
      <circle cx="55" cy="60" r="50" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.15" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Arabesque Border Divider SVG                                               */
/* -------------------------------------------------------------------------- */

function ArabesqueBorder({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "mx-auto my-6 h-8 w-72 text-[#D4AF37]"}
    >
      <path
        d="M160 8 Q165 3 170 8 Q175 13 170 18 Q165 23 160 18 Q155 13 160 8Z"
        fill="currentColor"
        opacity="0.5"
      />
      <circle cx="160" cy="13" r="2" fill="currentColor" opacity="0.7" />
      <path
        d="M150 13 Q130 2 105 13 Q85 22 65 13 Q50 6 30 13 Q18 18 5 13"
        stroke="currentColor"
        strokeWidth="1.3"
        fill="none"
        opacity="0.45"
      />
      <path
        d="M150 13 Q130 24 105 13 Q85 4 65 13 Q50 20 30 13 Q18 8 5 13"
        stroke="currentColor"
        strokeWidth="0.6"
        fill="none"
        opacity="0.25"
      />
      <path
        d="M170 13 Q190 2 215 13 Q235 22 255 13 Q270 6 290 13 Q302 18 315 13"
        stroke="currentColor"
        strokeWidth="1.3"
        fill="none"
        opacity="0.45"
      />
      <path
        d="M170 13 Q190 24 215 13 Q235 4 255 13 Q270 20 290 13 Q302 8 315 13"
        stroke="currentColor"
        strokeWidth="0.6"
        fill="none"
        opacity="0.25"
      />
      <path d="M5 10 Q2 13 5 16 Q8 13 5 10Z" fill="currentColor" opacity="0.35" />
      <path d="M315 10 Q312 13 315 16 Q318 13 315 10Z" fill="currentColor" opacity="0.35" />
      <path d="M85 10 L88 13 L85 16 L82 13Z" fill="currentColor" opacity="0.3" />
      <path d="M235 10 L238 13 L235 16 L232 13Z" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Ornamental Divider Between Event Cards                                     */
/* -------------------------------------------------------------------------- */

function OrnamentalDivider() {
  return (
    <svg
      viewBox="0 0 200 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto my-4 h-6 w-40 text-[#D4AF37]"
    >
      <line x1="10" y1="15" x2="80" y2="15" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <path d="M100 5 L108 15 L100 25 L92 15Z" fill="currentColor" opacity="0.25" />
      <circle cx="100" cy="15" r="2" fill="currentColor" opacity="0.5" />
      <line x1="120" y1="15" x2="190" y2="15" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Bismillah Calligraphy with stroke animation paths                          */
/* -------------------------------------------------------------------------- */

function BismillahCalligraphy({ className }: { className?: string }) {
  return (
    <div className={className ?? "mb-4 text-center"}>
      {/* SVG calligraphic stroke lines for the animation effect */}
      <svg
        viewBox="0 0 400 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="bismillah-stroke mx-auto mb-2 h-12 w-80 sm:h-14 sm:w-96"
      >
        {/* Stylized Bismillah stroke paths */}
        <path
          d="M20 45 Q40 10 80 30 Q100 40 120 25 Q140 12 160 30 Q175 42 195 28"
          stroke="#D4AF37"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M200 28 Q220 15 240 32 Q255 42 270 25 Q290 10 310 35 Q325 48 350 30 Q365 20 380 35"
          stroke="#D4AF37"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        {/* Dots / diacritics */}
        <circle cx="90" cy="18" r="2.5" fill="#D4AF37" opacity="0.7" className="tess-tile" />
        <circle cx="150" cy="45" r="2" fill="#D4AF37" opacity="0.7" className="tess-tile" />
        <circle cx="260" cy="15" r="2.5" fill="#D4AF37" opacity="0.7" className="tess-tile" />
        <circle cx="340" cy="45" r="2" fill="#D4AF37" opacity="0.7" className="tess-tile" />
      </svg>

      <p
        className="font-serif text-3xl leading-relaxed text-[#D4AF37] sm:text-4xl"
        style={{ fontFamily: "serif", direction: "rtl" }}
      >
        &#1576;&#1616;&#1587;&#1618;&#1605;&#1616; &#1575;&#1604;&#1604;&#1617;&#1614;&#1607;&#1616; &#1575;&#1604;&#1585;&#1617;&#1614;&#1581;&#1618;&#1605;&#1614;&#1575;&#1606;&#1616; &#1575;&#1604;&#1585;&#1617;&#1614;&#1581;&#1616;&#1610;&#1605;&#1616;
      </p>
      <p className="mt-2 text-xs tracking-[0.2em] text-[#FFF8E7]/50 uppercase">
        In the name of Allah, the Most Gracious, the Most Merciful
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Geometric Frame Wrapper - double-line border with corner ornaments         */
/* -------------------------------------------------------------------------- */

function GeometricFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className ?? ""}`}>
      {/* Outer border */}
      <div className="pointer-events-none absolute inset-0 border border-[#D4AF37]/15" />
      {/* Inner border with offset */}
      <div className="pointer-events-none absolute inset-[6px] border border-[#D4AF37]/10" />
      {/* Corner ornaments - top-left */}
      <svg className="pointer-events-none absolute -top-1 -left-1 h-5 w-5 text-[#D4AF37]/40" viewBox="0 0 20 20">
        <path d="M0 10 L10 0 L10 4 L4 10 Z" fill="currentColor" />
      </svg>
      {/* Corner ornaments - top-right */}
      <svg className="pointer-events-none absolute -top-1 -right-1 h-5 w-5 text-[#D4AF37]/40" viewBox="0 0 20 20">
        <path d="M20 10 L10 0 L10 4 L16 10 Z" fill="currentColor" />
      </svg>
      {/* Corner ornaments - bottom-left */}
      <svg className="pointer-events-none absolute -bottom-1 -left-1 h-5 w-5 text-[#D4AF37]/40" viewBox="0 0 20 20">
        <path d="M0 10 L10 20 L10 16 L4 10 Z" fill="currentColor" />
      </svg>
      {/* Corner ornaments - bottom-right */}
      <svg className="pointer-events-none absolute -bottom-1 -right-1 h-5 w-5 text-[#D4AF37]/40" viewBox="0 0 20 20">
        <path d="M20 10 L10 20 L10 16 L16 10 Z" fill="currentColor" />
      </svg>
      {/* Content */}
      <div className="relative p-6 sm:p-8">{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Floating Geometric Stars - 8-pointed Islamic shapes via Framer Motion      */
/* -------------------------------------------------------------------------- */

function FloatingGeometricStars() {
  const stars = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    size: 10 + Math.random() * 18,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: 12 + Math.random() * 16,
    delay: Math.random() * 6,
    rotDuration: 20 + Math.random() * 20,
    opacity: 0.04 + Math.random() * 0.08,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
          animate={{
            y: [0, -40, 10, -20, 0],
            x: [0, 15, -10, 5, 0],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.delay,
          }}
        >
          <motion.svg
            viewBox="0 0 40 40"
            className="h-full w-full text-[#D4AF37]"
            animate={{ rotate: 360 }}
            transition={{
              duration: s.rotDuration,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* 8-pointed Islamic geometric star */}
            <polygon
              points="20,2 24,14 36,14 27,22 30,34 20,27 10,34 13,22 4,14 16,14"
              fill="currentColor"
              opacity={s.opacity}
            />
            <polygon
              points="20,6 14,20 20,34 26,20"
              fill="currentColor"
              opacity={s.opacity * 0.6}
            />
          </motion.svg>
        </motion.div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Tessellation Event Card (Geometric Expand)                                 */
/* -------------------------------------------------------------------------- */

function TessellationEventCard({
  event,
  index,
}: {
  event: { name: string; date: string; venue: string; time: string };
  index: number;
}) {
  return (
    <div className="geo-card">
      <GeometricFrame className="overflow-hidden rounded-lg bg-gradient-to-b from-[#0D6B3D]/70 to-[#062a19]/90 shadow-lg shadow-black/20 backdrop-blur-sm">
        {/* Top geometric tessellation accent */}
        <div className="pointer-events-none absolute top-0 right-0 left-0">
          <svg viewBox="0 0 200 20" className="h-5 w-full text-[#D4AF37]" preserveAspectRatio="none">
            {[0, 25, 50, 75, 100, 125, 150, 175].map((x) => (
              <polygon
                key={x}
                points={`${x + 12.5},2 ${x + 18},10 ${x + 12.5},18 ${x + 7},10`}
                fill="currentColor"
                opacity="0.15"
              />
            ))}
            <line x1="0" y1="19" x2="200" y2="19" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          </svg>
        </div>

        {/* Event icon */}
        <div className="mb-4 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10">
            <span className="text-lg">
              {index === 0 && "\uD83C\uDFB5"}
              {index === 1 && "\uD83C\uDF3F"}
              {index === 2 && "\uD83C\uDFAA"}
              {index === 3 && "\uD83D\uDD4C"}
              {index === 4 && "\uD83C\uDF7D\uFE0F"}
              {index > 4 && "\u2728"}
            </span>
          </div>
        </div>

        {/* Event name */}
        <h3 className="mb-3 text-center font-serif text-2xl font-semibold tracking-wide text-[#D4AF37]">
          {event.name}
        </h3>

        {/* Gold divider */}
        <div className="mx-auto mb-3 h-px w-16 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

        {/* Date & Time */}
        <div className="mb-2 flex items-center justify-center gap-2 text-sm text-[#FFF8E7]/80">
          <Calendar className="h-3.5 w-3.5 text-[#D4AF37]/70" />
          <span>{event.date}</span>
        </div>
        <div className="mb-2 flex items-center justify-center gap-2 text-sm text-[#FFF8E7]/80">
          <Clock className="h-3.5 w-3.5 text-[#D4AF37]/70" />
          <span>{event.time}</span>
        </div>

        {/* Venue */}
        <div className="flex items-center justify-center gap-2 text-sm text-[#FFF8E7]/60">
          <MapPin className="h-3.5 w-3.5 text-[#D4AF37]/50" />
          <span>{event.venue}</span>
        </div>
      </GeometricFrame>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Template Component                                                    */
/* -------------------------------------------------------------------------- */

export default function NikkahEleganceTemplate({ invite, isDemo }: TemplateProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const { isPlaying, toggle } = useMusicPlayer(invite.musicUrl);
  const countdown = useCountdown(invite.weddingDate);

  // Initialize Lenis smooth scrolling
  useLenis();

  // GSAP ScrollTrigger animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Bismillah stroke draw
      gsap.fromTo(
        ".bismillah-stroke path",
        { strokeDashoffset: 1000, strokeDasharray: 1000 },
        { strokeDashoffset: 0, duration: 3, ease: "power1.inOut", delay: 0.3 },
      );

      // 2. Tessellation tile build
      gsap.utils.toArray<HTMLElement>(".tess-tile").forEach((el, i) => {
        gsap.fromTo(
          el,
          { scale: 0, opacity: 0, rotation: 45 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.4,
            delay: i * 0.05,
            ease: "back.out(1.7)",
          },
        );
      });

      // 3. Geometric expand cards
      gsap.utils.toArray<HTMLElement>(".geo-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          {
            clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
            opacity: 0,
          },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            opacity: 1,
            duration: 0.8,
            delay: i * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // 4. Nikkah section reveals - geometric diamond wipe
      gsap.utils.toArray<HTMLElement>(".nikkah-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)" },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
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

      // 5. Crescent reveal countdown
      gsap.utils.toArray<HTMLElement>(".crescent-reveal").forEach((el, i) => {
        gsap.fromTo(
          el,
          { clipPath: "circle(0% at 50% 50%)", opacity: 0 },
          {
            clipPath: "circle(100% at 50% 50%)",
            opacity: 1,
            duration: 0.7,
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

      // 6. Parallax pattern
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Default events for Nikkah ceremony
  const events = invite.events ?? [
    { name: "Dholki", date: "Date TBA", venue: invite.venue ?? "Venue TBA", time: "7 PM" },
    { name: "Mehendi", date: "Date TBA", venue: invite.venue ?? "Venue TBA", time: "6 PM" },
    { name: "Baraat", date: "Date TBA", venue: invite.venue ?? "Venue TBA", time: "4 PM" },
    { name: "Nikkah", date: invite.weddingDate ?? "Date TBA", venue: invite.venue ?? "Venue TBA", time: "11 AM" },
    { name: "Walima", date: invite.receptionDate ?? "Date TBA", venue: invite.venue ?? "Venue TBA", time: "7 PM" },
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
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#062a19] via-[#0D6B3D] to-[#062a19] text-[#FFF8E7]"
    >
      {/* Floating geometric stars (Framer Motion) */}
      <FloatingGeometricStars />

      {/* Subtle tessellation pattern overlay */}
      <div className="parallax-pattern pointer-events-none fixed inset-0 z-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23D4AF37' stroke-width='0.5'%3E%3Cpolygon points='40,5 55,20 55,40 40,55 25,40 25,20'/%3E%3Ccircle cx='40' cy='30' r='8'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Music toggle */}
      {invite.musicUrl && (
        <MusicToggleButton
          isPlaying={isPlaying}
          onToggle={toggle}
          className="fixed top-4 right-4 z-50 rounded-full border border-[#D4AF37]/30 bg-[#0D6B3D]/80 p-3 shadow-lg backdrop-blur-sm transition-colors hover:bg-[#0D6B3D]"
        />
      )}

      {/* Demo banner */}
      {isDemo && (
        <div className="relative z-10 bg-[#D4AF37] py-2 text-center text-sm font-medium text-[#062a19]">
          This is a demo preview. Complete payment to use your own details.
        </div>
      )}

      {/* ================================================================== */}
      {/*  CONTENT                                                           */}
      {/* ================================================================== */}
      <div className="relative z-10 mx-auto max-w-xl px-4">

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 1 - HERO (full viewport height)                         */}
        {/* ---------------------------------------------------------------- */}
        <motion.section
          className="relative flex min-h-screen flex-col items-center justify-center py-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          {/* Tessellation tile-by-tile background */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <HeroTessellationGrid />
          </div>

          <div className="relative z-10">
            {/* Bismillah calligraphy with stroke animation */}
            <BismillahCalligraphy />

            <ArabesqueBorder className="mx-auto my-6 h-8 w-72 text-[#D4AF37]" />

            {/* Crescent and star */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mx-auto mb-6 flex justify-center"
            >
              <CrescentStar className="h-14 w-14 text-[#D4AF37]" />
            </motion.div>

            {/* Parent blessings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mb-8"
            >
              <p className="mb-1 text-sm tracking-[0.15em] text-[#FFF8E7]/60 uppercase">
                With the blessings of
              </p>
              <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Groom's parents */}
                <div className="text-center">
                  {invite.groomFatherName && invite.groomMotherName ? (
                    <>
                      <p className="text-xs tracking-wider text-[#D4AF37]/70 uppercase">
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
                      <p className="text-xs tracking-wider text-[#D4AF37]/70 uppercase">Son of</p>
                      <p className="mt-1 font-serif text-lg text-[#FFF8E7]/90">{invite.groomFatherName}</p>
                    </>
                  ) : null}
                </div>

                {/* Bride's parents */}
                <div className="text-center">
                  {invite.brideFatherName && invite.brideMotherName ? (
                    <>
                      <p className="text-xs tracking-wider text-[#D4AF37]/70 uppercase">
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
                      <p className="text-xs tracking-wider text-[#D4AF37]/70 uppercase">Daughter of</p>
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
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mb-4 text-sm tracking-[0.15em] text-[#FFF8E7]/50 uppercase"
            >
              Request the honour of your presence at the Nikkah of
            </motion.p>

            {/* Hero image */}
            {invite.heroImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mx-auto mb-8 h-56 w-56 overflow-hidden rounded-full border-2 border-[#D4AF37]/40 shadow-2xl shadow-[#D4AF37]/10 sm:h-64 sm:w-64"
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
            >
              <h1 className="font-serif text-5xl font-light leading-tight text-[#D4AF37] sm:text-6xl lg:text-7xl">
                {invite.groomName}
              </h1>

              {/* Gold divider with heart */}
              <div className="my-4 flex items-center justify-center gap-4">
                <motion.div
                  className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]/60 sm:w-24"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.0, duration: 0.8 }}
                />
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1.1, duration: 0.6, type: "spring" }}
                >
                  <Heart className="h-5 w-5 fill-[#D4AF37]/50 text-[#D4AF37]" />
                </motion.div>
                <motion.div
                  className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]/60 sm:w-24"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.0, duration: 0.8 }}
                />
              </div>

              <h1 className="font-serif text-5xl font-light leading-tight text-[#D4AF37] sm:text-6xl lg:text-7xl">
                {invite.brideName}
              </h1>
            </motion.div>

            {/* Wedding date preview */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-6 text-base text-[#FFF8E7]/60"
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
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="mx-auto h-8 w-px bg-[#D4AF37]/40"
              />
            </motion.div>
          </div>
        </motion.section>

        <IslamicTessellation />

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 2 - EVENTS (centered, stacked vertically)               */}
        {/* ---------------------------------------------------------------- */}
        <section className="mb-16">
          <div className="nikkah-reveal mb-10 text-center">
            <p className="mb-2 text-xs tracking-[0.3em] text-[#D4AF37]/60 uppercase">
              Celebrations
            </p>
            <h2 className="font-serif text-3xl text-[#D4AF37] sm:text-4xl">
              Wedding Events
            </h2>
          </div>

          <div className="flex flex-col gap-2">
            {events.map((event, index) => (
              <div key={index}>
                <TessellationEventCard event={event} index={index} />
                {index < events.length - 1 && <OrnamentalDivider />}
              </div>
            ))}
          </div>
        </section>

        <ArabesqueBorder />

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 3 - COUPLE PHOTO                                        */}
        {/* ---------------------------------------------------------------- */}
        {invite.couplePhoto && (
          <section className="mb-16">
            <div className="nikkah-reveal">
              <GeometricFrame className="overflow-hidden rounded-lg shadow-xl shadow-black/20">
                <div
                  className="-m-6 aspect-[4/3] w-[calc(100%+3rem)] bg-cover bg-center sm:-m-8 sm:w-[calc(100%+4rem)]"
                  style={{ backgroundImage: `url(${invite.couplePhoto})` }}
                />
              </GeometricFrame>
            </div>
            <div className="mt-4 text-center">
              <p className="font-serif text-lg text-[#FFF8E7]/60 italic">
                {invite.groomName} & {invite.brideName}
              </p>
            </div>
          </section>
        )}

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 4 - GALLERY (2-column grid within narrow frame)          */}
        {/* ---------------------------------------------------------------- */}
        {invite.galleryImages.length > 0 && (
          <section className="mb-16">
            <div className="nikkah-reveal mb-8 text-center">
              <h2 className="font-serif text-2xl text-[#D4AF37]">Gallery</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {invite.galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  className="geo-card overflow-hidden"
                >
                  <GeometricFrame className="rounded-lg shadow-md">
                    <div
                      className="-m-6 aspect-square w-[calc(100%+3rem)] bg-cover bg-center transition-transform duration-700 hover:scale-105 sm:-m-8 sm:w-[calc(100%+4rem)]"
                      style={{ backgroundImage: `url(${img})` }}
                    />
                  </GeometricFrame>
                </div>
              ))}
            </div>
          </section>
        )}

        <IslamicTessellation />

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 5 - THINGS TO KNOW                                      */}
        {/* ---------------------------------------------------------------- */}
        {thingsToKnow.length > 0 && (
          <section className="mb-16">
            <div className="nikkah-reveal mb-10 text-center">
              <p className="mb-2 text-xs tracking-[0.3em] text-[#D4AF37]/60 uppercase">
                Helpful Information
              </p>
              <h2 className="font-serif text-3xl text-[#D4AF37]">
                Things to Know
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {thingsToKnow.map((item, idx) => (
                <div
                  key={idx}
                  className="geo-card"
                >
                  <GeometricFrame className="rounded-lg bg-[#0D6B3D]/40 backdrop-blur-sm">
                    <h3 className="mb-2 font-serif text-lg text-[#D4AF37]">
                      {item.label}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#FFF8E7]/60">
                      {item.detail}
                    </p>
                  </GeometricFrame>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 6 - STORY                                               */}
        {/* ---------------------------------------------------------------- */}
        {invite.story && (
          <section className="mb-16">
            <div className="nikkah-reveal">
              <GeometricFrame className="rounded-lg bg-[#0D6B3D]/40 text-center backdrop-blur-sm">
                <h2 className="mb-2 font-serif text-2xl text-[#D4AF37]">
                  Our Story
                </h2>
                <ArabesqueBorder className="mx-auto my-4 h-6 w-48 text-[#D4AF37]/50" />
                <p className="leading-relaxed text-[#FFF8E7]/70">
                  {invite.story}
                </p>
              </GeometricFrame>
            </div>
          </section>
        )}

        <ArabesqueBorder />

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 7 - COUNTDOWN TIMER (Crescent Moon Reveal)              */}
        {/* ---------------------------------------------------------------- */}
        {invite.weddingDate && (
          <section className="mb-16">
            <div className="nikkah-reveal mb-8 text-center">
              <p className="mb-2 text-xs tracking-[0.3em] text-[#D4AF37]/60 uppercase">
                The Blessed Day
              </p>
              <h2 className="font-serif text-3xl text-[#D4AF37]">
                Counting Down
              </h2>
            </div>

            <GeometricFrame className="rounded-lg bg-[#0D6B3D]/40 backdrop-blur-sm">
              <div className="grid grid-cols-4 gap-3 sm:gap-6">
                {[
                  { label: "Days", value: countdown.days },
                  { label: "Hours", value: countdown.hours },
                  { label: "Minutes", value: countdown.minutes },
                  { label: "Seconds", value: countdown.seconds },
                ].map((unit) => (
                  <div key={unit.label} className="crescent-reveal text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#062a19]/60 sm:h-20 sm:w-20">
                      <span className="font-serif text-2xl font-semibold text-[#D4AF37] sm:text-3xl">
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
            </GeometricFrame>
          </section>
        )}

        <IslamicTessellation />

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 8 - COUPLE MESSAGE                                      */}
        {/* ---------------------------------------------------------------- */}
        {invite.coupleMessage && (
          <section className="mb-16">
            <div className="nikkah-reveal">
              <GeometricFrame className="rounded-lg bg-[#0D6B3D]/40 text-center backdrop-blur-sm">
                <CrescentStar className="mx-auto mb-4 h-10 w-10 text-[#D4AF37]/40" />
                <p className="font-serif text-lg leading-relaxed text-[#FFF8E7]/80 italic">
                  &ldquo;{invite.coupleMessage}&rdquo;
                </p>
                <p className="mt-4 text-sm text-[#D4AF37]/60">
                  &mdash; {invite.groomName} & {invite.brideName}
                </p>
              </GeometricFrame>
            </div>
          </section>
        )}

        <ArabesqueBorder />

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 9 - RSVP + SHARE BUTTONS                               */}
        {/* ---------------------------------------------------------------- */}
        <section className="mb-16 text-center">
          <div className="nikkah-reveal">
            <h2 className="mb-4 font-serif text-3xl text-[#D4AF37]">
              Will You Join Us?
            </h2>
            <p className="mb-8 text-sm text-[#FFF8E7]/60">
              We would be honoured to have you celebrate this blessed occasion with us.
            </p>

            {hashtag && (
              <p className="mb-4 font-serif text-lg text-[#D4AF37]/70 italic">
                {hashtag}
              </p>
            )}

            <div className="flex flex-col items-center gap-4">
              <Button
                size="lg"
                className="w-full max-w-xs border border-[#D4AF37]/50 bg-[#D4AF37] text-[#062a19] shadow-lg shadow-[#D4AF37]/20 hover:bg-[#D4AF37]/90"
                onClick={() => setRsvpOpen(true)}
              >
                <Heart className="mr-2 h-4 w-4" />
                RSVP Now
              </Button>

              <div className="flex w-full max-w-xs gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 border-[#D4AF37]/30 bg-transparent text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
                  onClick={() => void handleShare()}
                >
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#D4AF37]/30 bg-transparent text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
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
        <footer className="text-center">
          <IslamicTessellation className="mx-auto mb-4 h-12 w-full text-[#D4AF37]/30" />

          <div className="nikkah-reveal">
            <CrescentStar className="mx-auto mb-3 h-8 w-8 text-[#D4AF37]/30" />
            <p className="font-serif text-lg text-[#D4AF37]/70">
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
              May Allah bless this union with love, mercy, and tranquility
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
