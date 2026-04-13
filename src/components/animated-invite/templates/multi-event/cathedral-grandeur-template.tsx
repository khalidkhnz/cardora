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

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function formatWeddingDate(dateStr: string | null) {
  if (!dateStr) return "Date TBD";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/* ------------------------------------------------------------------ */
/*  Inline SVG Decorations                                            */
/* ------------------------------------------------------------------ */

function GothicArchFrame({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 280"
      fill="none"
      className={`arch-draw mx-auto ${className}`}
    >
      {/* Outer pointed arch */}
      <path
        d="M30,280 L30,120 Q30,30 150,10 Q270,30 270,120 L270,280"
        stroke="#C5A55A"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
        strokeDasharray="800"
        strokeDashoffset="800"
      />
      {/* Inner pointed arch */}
      <path
        d="M50,280 L50,130 Q50,50 150,30 Q250,50 250,130 L250,280"
        stroke="#C5A55A"
        strokeWidth="1"
        fill="none"
        opacity="0.35"
        strokeDasharray="700"
        strokeDashoffset="700"
      />
      {/* Pinnacle details on top */}
      <path
        d="M150,10 L145,0 L150,5 L155,0 Z"
        fill="#C5A55A"
        fillOpacity="0.5"
      />
      {/* Left column details */}
      <line x1="30" y1="200" x2="30" y2="280" stroke="#C5A55A" strokeWidth="3" opacity="0.25" />
      <line x1="34" y1="200" x2="34" y2="280" stroke="#C5A55A" strokeWidth="0.5" opacity="0.2" />
      {/* Right column details */}
      <line x1="270" y1="200" x2="270" y2="280" stroke="#C5A55A" strokeWidth="3" opacity="0.25" />
      <line x1="266" y1="200" x2="266" y2="280" stroke="#C5A55A" strokeWidth="0.5" opacity="0.2" />
      {/* Cross at apex */}
      <line x1="150" y1="18" x2="150" y2="40" stroke="#C5A55A" strokeWidth="1.2" opacity="0.5" />
      <line x1="142" y1="26" x2="158" y2="26" stroke="#C5A55A" strokeWidth="1.2" opacity="0.5" />
      {/* Trefoil detail at top center */}
      <circle cx="150" cy="50" r="6" stroke="#C5A55A" strokeWidth="0.8" fill="none" opacity="0.3" />
      <circle cx="142" cy="56" r="5" stroke="#C5A55A" strokeWidth="0.6" fill="none" opacity="0.2" />
      <circle cx="158" cy="56" r="5" stroke="#C5A55A" strokeWidth="0.6" fill="none" opacity="0.2" />
    </svg>
  );
}

function RoseWindow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none">
      {/* Outer circle */}
      <circle cx="60" cy="60" r="55" stroke="#C5A55A" strokeWidth="1.5" opacity="0.4" />
      <circle cx="60" cy="60" r="50" stroke="#C5A55A" strokeWidth="0.8" opacity="0.25" />
      {/* Inner circle */}
      <circle cx="60" cy="60" r="18" stroke="#C5A55A" strokeWidth="1" opacity="0.4" />
      <circle cx="60" cy="60" r="8" fill="#C5A55A" fillOpacity="0.15" />
      {/* Radial segments -- 8 spokes */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const x1 = 60 + 18 * Math.cos(angle);
        const y1 = 60 + 18 * Math.sin(angle);
        const x2 = 60 + 50 * Math.cos(angle);
        const y2 = 60 + 50 * Math.sin(angle);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#C5A55A"
            strokeWidth="0.6"
            opacity="0.3"
          />
        );
      })}
      {/* Petal shapes between spokes */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = ((i * 45 + 22.5) * Math.PI) / 180;
        const cx = 60 + 34 * Math.cos(angle);
        const cy = 60 + 34 * Math.sin(angle);
        return (
          <circle
            key={`p-${i}`}
            cx={cx}
            cy={cy}
            r="8"
            stroke="#C5A55A"
            strokeWidth="0.5"
            fill="#C5A55A"
            fillOpacity="0.06"
            opacity="0.35"
          />
        );
      })}
      {/* Quatrefoil center */}
      <circle cx="60" cy="48" r="5" stroke="#C5A55A" strokeWidth="0.5" fill="none" opacity="0.25" />
      <circle cx="60" cy="72" r="5" stroke="#C5A55A" strokeWidth="0.5" fill="none" opacity="0.25" />
      <circle cx="48" cy="60" r="5" stroke="#C5A55A" strokeWidth="0.5" fill="none" opacity="0.25" />
      <circle cx="72" cy="60" r="5" stroke="#C5A55A" strokeWidth="0.5" fill="none" opacity="0.25" />
    </svg>
  );
}

function StainedGlassPanel({ className = "", color = "#8B1A1A" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 40 80" className={className} fill="none">
      {/* Pointed arch panel shape */}
      <path
        d="M2,80 L2,30 Q2,5 20,2 Q38,5 38,30 L38,80 Z"
        stroke={color}
        strokeWidth="1"
        fill={color}
        fillOpacity="0.12"
        opacity="0.6"
      />
      {/* Inner glow */}
      <path
        d="M8,75 L8,33 Q8,12 20,8 Q32,12 32,33 L32,75 Z"
        fill={color}
        fillOpacity="0.08"
      />
      {/* Cross detail */}
      <line x1="20" y1="20" x2="20" y2="55" stroke={color} strokeWidth="0.5" opacity="0.4" />
      <line x1="12" y1="35" x2="28" y2="35" stroke={color} strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}

function CandleFlame({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 48" className={className} fill="none">
      {/* Candle body */}
      <rect x="8" y="24" width="8" height="20" rx="1.5" fill="#C5A55A" fillOpacity="0.18" stroke="#C5A55A" strokeWidth="0.6" opacity="0.4" />
      {/* Wick */}
      <line x1="12" y1="24" x2="12" y2="18" stroke="#C5A55A" strokeWidth="0.6" opacity="0.4" />
      {/* Flame - outer glow */}
      <path
        d="M12,3 Q16,9 14,17 Q12,19 10,17 Q8,9 12,3"
        fill="#C5A55A"
        fillOpacity="0.4"
        className="candle-css-flicker"
      />
      {/* Flame - inner */}
      <path
        d="M12,7 Q14,11 13,16 Q12,17 11,16 Q10,11 12,7"
        fill="#F5F0E8"
        fillOpacity="0.5"
        className="candle-css-flicker"
      />
      {/* Base plate */}
      <ellipse cx="12" cy="44" rx="6" ry="1.5" fill="#C5A55A" fillOpacity="0.12" />
    </svg>
  );
}

function GothicDivider({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 30" className={`mx-auto h-7 w-72 ${className}`} fill="none">
      {/* Left line */}
      <line x1="0" y1="15" x2="155" y2="15" stroke="#C5A55A" strokeWidth="0.8" opacity="0.4" />
      {/* Central diamond */}
      <path d="M170,5 L185,15 L200,5 L215,15 L230,5" stroke="#C5A55A" strokeWidth="0.8" opacity="0.5" fill="none" />
      <path d="M170,25 L185,15 L200,25 L215,15 L230,25" stroke="#C5A55A" strokeWidth="0.8" opacity="0.5" fill="none" />
      {/* Center jewel */}
      <circle cx="200" cy="15" r="3" fill="#8B1A1A" fillOpacity="0.5" stroke="#C5A55A" strokeWidth="0.6" opacity="0.6" />
      {/* Side diamonds */}
      <path d="M165,12 L170,15 L165,18 L160,15 Z" fill="#C5A55A" fillOpacity="0.3" />
      <path d="M235,12 L240,15 L235,18 L230,15 Z" fill="#C5A55A" fillOpacity="0.3" />
      {/* Right line */}
      <line x1="245" y1="15" x2="400" y2="15" stroke="#C5A55A" strokeWidth="0.8" opacity="0.4" />
      {/* Fleur-de-lis hints at ends */}
      <circle cx="5" cy="15" r="2" fill="#C5A55A" fillOpacity="0.3" />
      <circle cx="395" cy="15" r="2" fill="#C5A55A" fillOpacity="0.3" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Cathedral Event Card with Stained Glass Color Bar                  */
/* ------------------------------------------------------------------ */

const GLASS_COLORS = ["#8B1A1A", "#1A3A6B", "#1A6B3A", "#6B1A6B"] as const;
const GLASS_LABELS = ["ruby", "sapphire", "emerald", "amethyst"] as const;

function CathedralEventCard({
  event,
  index,
}: {
  event: { name: string; date: string; venue: string; time: string };
  index: number;
}) {
  const color = GLASS_COLORS[index % GLASS_COLORS.length]!;
  const _label = GLASS_LABELS[index % GLASS_LABELS.length]!;

  return (
    <div className="glass-card group">
      <div className="relative overflow-hidden rounded-lg border border-[#C5A55A]/20 bg-gradient-to-br from-[#1A1A2E]/95 to-[#0F0F1E]/95 shadow-lg shadow-black/40 backdrop-blur-sm transition-all duration-500 hover:border-[#C5A55A]/40 hover:shadow-[0_0_30px_rgba(197,165,90,0.08)]">
        {/* Stained glass color bar on left edge */}
        <div
          className="absolute top-0 bottom-0 left-0 w-1.5"
          style={{
            background: `linear-gradient(to bottom, transparent, ${color}, ${color}88, transparent)`,
          }}
        />

        {/* Subtle gradient glow border that pulses */}
        <div
          className="glass-pulse pointer-events-none absolute inset-0 rounded-lg opacity-0"
          style={{
            background: `linear-gradient(135deg, ${color}15, transparent 40%, ${color}10, transparent 60%, ${color}15)`,
          }}
        />

        <div className="relative p-6 pl-7">
          {/* Event name */}
          <h3 className="mb-3 text-xl font-semibold tracking-wider text-[#C5A55A]">
            {event.name}
          </h3>

          {/* Thin gold divider */}
          <div
            className="mb-4 h-px w-12"
            style={{
              background: `linear-gradient(to right, ${color}, #C5A55A44, transparent)`,
            }}
          />

          {/* Details */}
          <div className="space-y-2.5 text-sm text-[#F5F0E8]/60">
            <div className="flex items-center gap-2.5">
              <Calendar className="h-3.5 w-3.5 shrink-0 text-[#C5A55A]/60" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="h-3.5 w-3.5 shrink-0 text-[#C5A55A]/60" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-[#C5A55A]/60" />
              <span>{event.venue}</span>
            </div>
          </div>

          {/* Bottom corner accent */}
          <div
            className="pointer-events-none absolute right-3 bottom-3 h-8 w-8 border-r border-b opacity-20"
            style={{ borderColor: color }}
          />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Candle Flicker CSS Keyframes (injected once)                       */
/* ------------------------------------------------------------------ */

function CandleFlickerStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          @keyframes candleFlicker {
            0%   { transform: scaleY(1) scaleX(1); opacity: 0.85; }
            15%  { transform: scaleY(1.06) scaleX(0.94); opacity: 0.9; }
            30%  { transform: scaleY(0.92) scaleX(1.03); opacity: 0.75; }
            50%  { transform: scaleY(1.04) scaleX(0.97); opacity: 0.95; }
            65%  { transform: scaleY(0.96) scaleX(1.02); opacity: 0.8; }
            80%  { transform: scaleY(1.02) scaleX(0.98); opacity: 0.88; }
            100% { transform: scaleY(1) scaleX(1); opacity: 0.85; }
          }
          .candle-css-flicker {
            transform-origin: center bottom;
            animation: candleFlicker 1.8s ease-in-out infinite;
          }
          .candle-side-left .candle-css-flicker {
            animation-delay: 0.3s;
            animation-duration: 2.1s;
          }
          .candle-side-right .candle-css-flicker {
            animation-delay: 0.7s;
            animation-duration: 1.6s;
          }
        `,
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Template Component                                                */
/* ------------------------------------------------------------------ */

export default function CathedralGrandeurTemplate({ invite, isDemo }: TemplateProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const { isPlaying, toggle } = useMusicPlayer(invite.musicUrl);
  const countdown = useCountdown(invite.weddingDate);

  useLenis();

  /* ---- Default multi-event list ---- */
  const events = invite.events ?? [
    { name: "Rehearsal Dinner", date: invite.weddingDate ?? "Date TBA", venue: invite.venue ?? "Venue TBA", time: invite.weddingTime ?? "6 PM" },
    { name: "Church Ceremony", date: invite.weddingDate ?? "Date TBA", venue: invite.venue ?? "Venue TBA", time: invite.weddingTime ?? "11 AM" },
    { name: "Cocktail Hour", date: invite.weddingDate ?? "Date TBA", venue: invite.venue ?? "Venue TBA", time: invite.weddingTime ?? "4 PM" },
    { name: "Reception", date: invite.receptionDate ?? "Date TBA", venue: invite.venue ?? "Venue TBA", time: invite.weddingTime ?? "6 PM" },
  ];

  /* ---- Extra data ---- */
  const thingsToKnow = (invite.extraData?.thingsToKnow as { label: string; detail: string }[] | undefined) ?? [];
  const hashtag = (invite.extraData?.hashtag as string | undefined) ?? null;

  /* ---- Share handler ---- */
  async function handleShare() {
    const url = `${window.location.origin}/wedding/${invite.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: `${invite.groomName} & ${invite.brideName} - Wedding`, url });
        return;
      } catch {
        /* fall through */
      }
    }
    await navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  }

  /* ---- GSAP scroll animations ---- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ---- Rose Window Spin + Scale ---- */
      const roseEl = containerRef.current?.querySelector(".rose-spin");
      if (roseEl) {
        gsap.fromTo(
          roseEl,
          { scale: 0, rotation: 0, opacity: 0 },
          {
            scale: 1,
            rotation: 360,
            opacity: 1,
            duration: 3,
            ease: "power2.out",
          },
        );
      }

      /* ---- Gothic Arch strokeDashoffset Draw ---- */
      gsap.utils.toArray<SVGPathElement>(".arch-draw path[stroke-dasharray]").forEach((path) => {
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2.5,
          ease: "power2.inOut",
          delay: 0.3,
        });
      });

      /* ---- Hero couple names bounce-fade ---- */
      gsap.utils.toArray<HTMLElement>(".hero-name").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "back.out(1.4)",
            delay: 2.2 + i * 0.3,
          },
        );
      });

      /* ---- Cathedral Reveal: pointed arch clip-path expansion ---- */
      gsap.utils.toArray<HTMLElement>(".cathedral-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)" },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      /* ---- Glass Card rise + stagger ---- */
      gsap.utils.toArray<HTMLElement>(".glass-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.25,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );

        /* Glass pulse glow on enter */
        const pulseEl = el.querySelector(".glass-pulse");
        if (pulseEl) {
          gsap.fromTo(
            pulseEl,
            { opacity: 0 },
            {
              opacity: 0.6,
              duration: 1.2,
              ease: "sine.inOut",
              yoyo: true,
              repeat: 1,
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            },
          );
        }
      });

      /* ---- Cathedral Countdown: blur revelation ---- */
      gsap.utils.toArray<HTMLElement>(".cathedral-countdown").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, filter: "blur(8px)" },
          {
            opacity: 1,
            filter: "blur(0px)",
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

      /* ---- Section scroll-fade ---- */
      gsap.utils.toArray<HTMLElement>(".scroll-fade").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      /* ---- Gothic dividers shimmer in ---- */
      gsap.utils.toArray<HTMLElement>(".gothic-divider").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.15, scaleX: 0.4 },
          {
            opacity: 1,
            scaleX: 1,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      /* ---- Hero background parallax ---- */
      const heroBg = containerRef.current?.querySelector(".hero-bg");
      if (heroBg) {
        gsap.to(heroBg, {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: heroBg,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      /* ---- Continuous slow rose window rotation (post-initial) ---- */
      const roseWindowSlow = containerRef.current?.querySelector(".rose-spin");
      if (roseWindowSlow) {
        gsap.to(roseWindowSlow, {
          rotation: "+=3600",
          duration: 300,
          ease: "none",
          repeat: -1,
          delay: 3,
        });
      }

      /* ---- Parallax pattern overlay ---- */
      gsap.utils.toArray<HTMLElement>(".parallax-pattern").forEach((el) => {
        gsap.to(el, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      /* ---- Gallery images pointed-arch clip reveal ---- */
      gsap.utils.toArray<HTMLElement>(".gallery-arch").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
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

  /* ---- Parent blessing text ---- */
  const groomParents =
    invite.groomFatherName ?? invite.groomMotherName
      ? `${invite.groomFatherName ?? ""}${invite.groomFatherName && invite.groomMotherName ? " & " : ""}${invite.groomMotherName ?? ""}`
      : null;

  const brideParents =
    invite.brideFatherName ?? invite.brideMotherName
      ? `${invite.brideFatherName ?? ""}${invite.brideFatherName && invite.brideMotherName ? " & " : ""}${invite.brideMotherName ?? ""}`
      : null;

  /* ================================================================ */
  /*  JSX                                                             */
  /* ================================================================ */

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0F0F1E] via-[#1A1A2E] to-[#0F0F1E]"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      {/* Candle flicker CSS keyframes */}
      <CandleFlickerStyles />

      {/* Particles */}
      <ParticleLayer type="LIGHT" />

      {/* Gothic diamond pattern overlay */}
      <div className="parallax-pattern pointer-events-none fixed inset-0 z-0 opacity-[0.025]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23C5A55A' stroke-width='0.4'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z'/%3E%3Ccircle cx='30' cy='30' r='8'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Music toggle */}
      {invite.musicUrl && (
        <MusicToggleButton
          isPlaying={isPlaying}
          onToggle={toggle}
          className="fixed top-4 right-4 z-50 rounded-full border border-[#C5A55A]/30 bg-[#1A1A2E]/80 p-3 text-[#C5A55A] shadow-lg backdrop-blur-sm transition-colors hover:bg-[#1A1A2E]"
        />
      )}

      {/* Demo banner */}
      {isDemo && (
        <div className="relative z-30 bg-[#C5A55A] py-2 text-center text-sm font-medium text-[#0F0F1E]">
          This is a demo preview. Complete payment to use your own details.
        </div>
      )}

      {/* ---- Candle accents on page edges (desktop) ---- */}
      <div className="pointer-events-none absolute inset-0 z-[5] hidden overflow-hidden lg:block">
        {/* Left side candles */}
        {[0, 1, 2].map((i) => (
          <div
            key={`cl-${i}`}
            className="candle-side-left absolute left-6"
            style={{ top: `${18 + i * 28}%` }}
          >
            <CandleFlame className="h-12 w-6 opacity-40" />
          </div>
        ))}
        {/* Right side candles */}
        {[0, 1, 2].map((i) => (
          <div
            key={`cr-${i}`}
            className="candle-side-right absolute right-6"
            style={{ top: `${25 + i * 28}%` }}
          >
            <CandleFlame className="h-12 w-6 opacity-40" />
          </div>
        ))}
      </div>

      {/* ============================================================ */}
      {/*  SECTION 1 -- Hero: Rose Window Spin + Arch Draw              */}
      {/* ============================================================ */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
        {/* Background */}
        <div className="hero-bg absolute inset-0 z-0">
          {invite.heroImage ? (
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${invite.heroImage})` }}
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-b from-[#0F0F1E] via-[#1A1A2E]/80 to-[#0F0F1E]" />
          )}
          <div className="absolute inset-0 bg-[#0F0F1E]/65" />
        </div>

        {/* Vertical golden lines framing edges */}
        <div className="pointer-events-none absolute inset-0 z-[1]">
          <div className="absolute top-0 bottom-0 left-[8%] w-px bg-gradient-to-b from-transparent via-[#C5A55A]/15 to-transparent" />
          <div className="absolute top-0 bottom-0 right-[8%] w-px bg-gradient-to-b from-transparent via-[#C5A55A]/15 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-xl">
          {/* Rose Window - spins and scales on load */}
          <div className="rose-spin mx-auto mb-6 opacity-0" style={{ transformOrigin: "center center" }}>
            <RoseWindow className="mx-auto h-28 w-28 sm:h-32 sm:w-32" />
          </div>

          {/* Gothic Arch Frame drawing itself */}
          <div className="mx-auto mb-6 w-64 sm:w-72">
            <GothicArchFrame />
          </div>

          {/* Title */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="mb-2 text-xs tracking-[0.4em] text-[#C5A55A]/70 uppercase"
          >
            A Sacred Union in Christ
          </motion.p>

          {/* Parent blessings */}
          {(groomParents ?? brideParents) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.1, duration: 0.8 }}
              className="mb-4"
            >
              <p className="mb-1 text-xs tracking-[0.2em] text-[#C5A55A]/50 uppercase">
                With the blessings of
              </p>
              {groomParents && (
                <p className="text-sm text-[#F5F0E8]/40">{groomParents}</p>
              )}
              {brideParents && (
                <p className="text-sm text-[#F5F0E8]/40">{brideParents}</p>
              )}
            </motion.div>
          )}

          {/* Couple names with cathedral-echo bounce */}
          <h1 className="hero-name text-5xl leading-tight font-light tracking-widest text-[#C5A55A] opacity-0 sm:text-7xl">
            {invite.groomName}
          </h1>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.6, duration: 0.6, ease: "backOut" }}
            className="my-4 flex items-center justify-center gap-4"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C5A55A]/40" />
            <Heart className="h-5 w-5 text-[#8B1A1A]" fill="#8B1A1A" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C5A55A]/40" />
          </motion.div>

          <h1 className="hero-name text-5xl leading-tight font-light tracking-widest text-[#C5A55A] opacity-0 sm:text-7xl">
            {invite.brideName}
          </h1>

          {/* Date */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2, duration: 0.8 }}
            className="mt-8 text-base tracking-wider text-[#F5F0E8]/45"
          >
            {formatWeddingDate(invite.weddingDate)}
          </motion.p>

          {/* Venue */}
          {invite.venue && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.4, duration: 0.8 }}
              className="mt-2 flex items-center justify-center gap-2 text-sm text-[#F5F0E8]/35"
            >
              <MapPin className="h-4 w-4" /> {invite.venue}
            </motion.p>
          )}

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.8 }}
            className="mt-16"
          >
            <span className="animate-bounce inline-block text-[#C5A55A]/30">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </span>
          </motion.div>
        </div>
      </section>

      {/* Gothic divider */}
      <div className="gothic-divider flex justify-center py-8">
        <GothicDivider />
      </div>

      {/* ============================================================ */}
      {/*  SECTION 2 -- Events Grid (Stained Glass Cards)               */}
      {/* ============================================================ */}
      <section className="relative z-10 px-4 py-20">
        {/* Stone-textured gradient background band */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/0 via-[#1A1A2E]/60 to-[#1A1A2E]/0" />

        <div className="relative mx-auto max-w-4xl">
          <div className="cathedral-reveal mb-12 text-center">
            <div className="mb-4 flex justify-center gap-6 opacity-50">
              <StainedGlassPanel className="h-10 w-5" color="#8B1A1A" />
              <StainedGlassPanel className="h-10 w-5" color="#1A3A6B" />
              <StainedGlassPanel className="h-10 w-5" color="#1A6B3A" />
            </div>
            <h2 className="text-3xl font-light tracking-[0.15em] text-[#C5A55A] sm:text-4xl">
              Wedding Celebrations
            </h2>
            <p className="mt-2 text-sm text-[#F5F0E8]/35">
              A journey of sacred devotion and joyful celebration
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {events.map((event, idx) => (
              <CathedralEventCard key={idx} event={event} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Gothic divider */}
      <div className="gothic-divider flex justify-center py-8">
        <GothicDivider />
      </div>

      {/* ============================================================ */}
      {/*  SECTION 3 -- Couple Photo                                   */}
      {/* ============================================================ */}
      {invite.couplePhoto && (
        <section className="relative z-10 px-4 py-20">
          <div className="cathedral-reveal mx-auto max-w-lg text-center">
            {/* Photo with gothic arch frame overlay */}
            <div className="relative mx-auto mb-8 aspect-[3/4] w-72 overflow-hidden sm:w-80">
              {/* Pointed arch clip on the image */}
              <div
                className="h-full w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${invite.couplePhoto})`,
                  clipPath: "polygon(50% 0%, 3% 18%, 0% 100%, 100% 100%, 97% 18%)",
                }}
              />
              {/* Gold border overlay matching the arch clip */}
              <svg
                viewBox="0 0 320 427"
                fill="none"
                className="pointer-events-none absolute inset-0 h-full w-full"
              >
                <path
                  d="M160,0 L10,77 L0,427 L320,427 L310,77 Z"
                  stroke="#C5A55A"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.4"
                />
              </svg>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-[#C5A55A]/25" />
              <Heart className="h-4 w-4 text-[#8B1A1A]" fill="#8B1A1A" />
              <div className="h-px w-12 bg-[#C5A55A]/25" />
            </div>
            <p className="mt-4 text-lg font-light tracking-widest text-[#C5A55A]/55">
              {invite.groomName} & {invite.brideName}
            </p>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/*  Gallery with Pointed-Arch Clipped Images                     */}
      {/* ============================================================ */}
      {invite.galleryImages.length > 0 && (
        <section className="relative z-10 px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="cathedral-reveal mb-10 text-center">
              <h2 className="text-3xl font-light tracking-[0.15em] text-[#C5A55A] sm:text-4xl">
                Gallery
              </h2>
              <div className="gothic-divider mt-4 flex justify-center">
                <GothicDivider />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {invite.galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  className="gallery-arch group relative aspect-[3/4] overflow-hidden border border-[#C5A55A]/10 shadow-lg shadow-black/30"
                  style={{
                    clipPath: "polygon(50% 0%, 5% 14%, 0% 100%, 100% 100%, 95% 14%)",
                  }}
                >
                  <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${img})` }}
                  />
                  {/* Dark gradient overlay at bottom */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0F0F1E]/60 to-transparent" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gothic divider */}
      <div className="gothic-divider flex justify-center py-8">
        <GothicDivider />
      </div>

      {/* ============================================================ */}
      {/*  SECTION 4 -- Things to Know                                 */}
      {/* ============================================================ */}
      {thingsToKnow.length > 0 && (
        <section className="relative z-10 px-4 py-20">
          <div className="mx-auto max-w-3xl">
            <div className="cathedral-reveal mb-10 text-center">
              <h2 className="text-3xl font-light tracking-[0.15em] text-[#C5A55A] sm:text-4xl">
                Things to Know
              </h2>
              <div className="gothic-divider mt-4 flex justify-center">
                <GothicDivider />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {thingsToKnow.map((item, idx) => (
                <div
                  key={idx}
                  className="scroll-fade rounded-lg border border-[#C5A55A]/15 bg-[#1A1A2E]/70 p-6 shadow-md shadow-black/20 backdrop-blur-sm"
                >
                  <h4 className="mb-2 text-base font-semibold tracking-wide text-[#C5A55A]">
                    {item.label}
                  </h4>
                  <p className="text-sm leading-relaxed text-[#F5F0E8]/45">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/*  Story Section                                                */}
      {/* ============================================================ */}
      {invite.story && (
        <section className="relative z-10 px-4 py-20">
          <div className="mx-auto max-w-3xl">
            <div className="cathedral-reveal relative overflow-hidden rounded-2xl border border-[#C5A55A]/15 bg-gradient-to-br from-[#1A1A2E]/80 to-[#0F0F1E]/90 p-8 text-center backdrop-blur-sm sm:p-12">
              {/* Corner stained glass accents */}
              <div className="pointer-events-none absolute top-0 left-0 h-20 w-20 bg-gradient-to-br from-[#8B1A1A]/10 to-transparent" />
              <div className="pointer-events-none absolute top-0 right-0 h-20 w-20 bg-gradient-to-bl from-[#1A3A6B]/10 to-transparent" />

              <h2 className="mb-2 text-2xl font-light tracking-[0.15em] text-[#C5A55A] sm:text-3xl">
                Our Story
              </h2>
              <GothicDivider className="mb-6" />
              <p className="leading-relaxed text-[#F5F0E8]/55">
                {invite.story}
              </p>

              {/* Bottom stained glass accents */}
              <div className="pointer-events-none absolute right-0 bottom-0 h-20 w-20 bg-gradient-to-tl from-[#1A6B3A]/10 to-transparent" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-20 bg-gradient-to-tr from-[#6B1A6B]/10 to-transparent" />
            </div>
          </div>
        </section>
      )}

      {/* Gothic divider */}
      <div className="gothic-divider flex justify-center py-8">
        <GothicDivider />
      </div>

      {/* ============================================================ */}
      {/*  SECTION 5 -- Countdown with Candle Flames                    */}
      {/* ============================================================ */}
      <section className="relative z-10 px-4 py-24">
        <div className="scroll-fade mx-auto max-w-xl text-center">
          <h2 className="mb-2 text-3xl font-light tracking-[0.15em] text-[#C5A55A] sm:text-4xl">
            The Day Awaits
          </h2>
          <p className="mb-12 text-sm text-[#F5F0E8]/30">
            Counting the moments until two become one
          </p>

          <div className="grid grid-cols-4 gap-3 sm:gap-5">
            {(
              [
                { label: "Days", value: countdown.days },
                { label: "Hours", value: countdown.hours },
                { label: "Minutes", value: countdown.minutes },
                { label: "Seconds", value: countdown.seconds },
              ] as const
            ).map((unit) => (
              <div key={unit.label} className="cathedral-countdown flex flex-col items-center">
                {/* Tiny flame above each box */}
                <div className="mb-1">
                  <CandleFlame className="mx-auto h-8 w-4" />
                </div>

                <div className="flex h-20 w-full max-w-[5.5rem] items-center justify-center rounded-lg border border-[#C5A55A]/20 bg-[#1A1A2E]/80 shadow-[0_0_20px_rgba(197,165,90,0.05)] sm:h-24">
                  <span className="text-3xl font-light text-[#C5A55A] sm:text-4xl">
                    {String(unit.value).padStart(2, "0")}
                  </span>
                </div>
                <span className="mt-2 text-[10px] tracking-[0.2em] text-[#C5A55A]/40 uppercase sm:text-xs">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 6 -- Couple Message                                 */}
      {/* ============================================================ */}
      {(invite.coupleMessage ?? invite.story) && (
        <section className="relative z-10 px-4 py-20">
          <div className="cathedral-reveal mx-auto max-w-3xl">
            <div className="relative overflow-hidden rounded-2xl border border-[#C5A55A]/15 bg-gradient-to-b from-[#1A1A2E]/70 to-[#0F0F1E]/80 p-8 text-center backdrop-blur-sm sm:p-14">
              {/* Decorative rose window small */}
              <RoseWindow className="mx-auto mb-6 h-16 w-16 opacity-25" />

              <h2 className="mb-6 text-3xl font-light tracking-[0.15em] text-[#C5A55A] sm:text-4xl">
                From Our Hearts
              </h2>

              <p className="mx-auto max-w-prose text-base leading-relaxed text-[#F5F0E8]/55 italic">
                &ldquo;{invite.coupleMessage ?? invite.story}&rdquo;
              </p>

              <div className="mt-8 flex items-center justify-center gap-3">
                <div className="h-px w-16 bg-[#C5A55A]/25" />
                <Heart className="h-4 w-4 text-[#8B1A1A]" fill="#8B1A1A" />
                <div className="h-px w-16 bg-[#C5A55A]/25" />
              </div>
              <p className="mt-4 text-sm font-light tracking-widest text-[#C5A55A]/40">
                {invite.groomName} & {invite.brideName}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/*  SECTION 7 -- RSVP + Share Buttons                           */}
      {/* ============================================================ */}
      <section className="relative z-10 px-4 py-20">
        <div className="scroll-fade mx-auto flex max-w-md flex-col items-center gap-5 text-center">
          <h2 className="text-3xl font-light tracking-[0.15em] text-[#C5A55A] sm:text-4xl">
            Will You Join Us?
          </h2>
          <p className="text-sm text-[#F5F0E8]/35">
            We would be honoured by your presence at this sacred celebration
          </p>

          {hashtag && (
            <p className="text-lg font-light tracking-widest text-[#C5A55A]/50 italic">
              {hashtag}
            </p>
          )}

          <Button
            size="lg"
            className="w-full max-w-xs bg-[#C5A55A] text-[#0F0F1E] hover:bg-[#C5A55A]/90"
            onClick={() => setRsvpOpen(true)}
          >
            RSVP Now
          </Button>

          <div className="flex w-full max-w-xs gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 border-[#C5A55A]/30 text-[#C5A55A] hover:bg-[#C5A55A]/10"
              onClick={() => void handleShare()}
            >
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-[#C5A55A]/30 text-[#C5A55A] hover:bg-[#C5A55A]/10"
              onClick={() => {
                void fetch("/api/download/invite", { method: "POST" }).then((r) => {
                  if (r.ok) toast.success("Invite saved to gallery");
                  else toast.error("Unlock your invite to download");
                });
              }}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 8 -- Footer + Stained Glass Gradient Bar             */}
      {/* ============================================================ */}
      <footer className="relative z-10 overflow-hidden px-4 pt-8 pb-4">
        {/* Stained glass gradient bar at top of footer */}
        <div className="mx-auto mb-8 h-1 max-w-2xl rounded-full bg-gradient-to-r from-[#8B1A1A]/50 via-[#1A3A6B]/50 via-[#1A6B3A]/50 to-[#6B1A6B]/50" />

        <div className="relative py-8 text-center">
          {/* Ambient dots */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-15">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-[#C5A55A]"
                style={{
                  width: `${1 + Math.random()}px`,
                  height: `${1 + Math.random()}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          <div className="relative">
            <div className="gothic-divider mb-5 flex justify-center">
              <GothicDivider />
            </div>
            <p className="text-sm tracking-wider text-[#C5A55A]/45">
              {invite.groomName} & {invite.brideName}
            </p>
            <p className="mt-1 text-xs text-[#F5F0E8]/25">
              {formatWeddingDate(invite.weddingDate)}
            </p>

            <p className="mt-8 text-xs text-[#F5F0E8]/20 italic">
              And the two shall become one flesh - Mark 10:8
            </p>

            {/* Stained glass gradient bar at bottom */}
            <div className="mx-auto mt-6 h-0.5 w-48 rounded-full bg-gradient-to-r from-[#8B1A1A]/30 via-[#C5A55A]/30 to-[#1A3A6B]/30" />

            <CardoraWatermark className="mt-8 pb-2 text-center text-xs text-[#F5F0E8]/18" />
          </div>
        </div>
      </footer>

      {/* RSVP Modal */}
      <RsvpModal open={rsvpOpen} onOpenChange={setRsvpOpen} inviteSlug={invite.slug} />
    </div>
  );
}
