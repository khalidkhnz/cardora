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
/*  Four Laavaan Data                                                          */
/* -------------------------------------------------------------------------- */

const FOUR_LAAVAAN = [
  {
    number: 1,
    title: "First Laav",
    gurmukhi: "\u0A2A\u0A39\u0A3F\u0A32\u0A40 \u0A32\u0A3E\u0A35",
    description: "Beginning of the spiritual journey together",
    detail:
      "The first round is the Lord's instruction for performing the daily duties of married life. Embrace righteousness, meditate on the Lord's Name, and abandon sinful actions.",
    symbol: "The first step around the Guru Granth Sahib",
  },
  {
    number: 2,
    title: "Second Laav",
    gurmukhi: "\u0A26\u0A42\u0A1C\u0A40 \u0A32\u0A3E\u0A35",
    description: "Meeting the Guru within",
    detail:
      "In the second round, the Lord leads you to meet the True Guru. Fear departs and the filth of ego is washed away. Sing God's praises and behold the Lord's presence.",
    symbol: "The meeting of two souls in devotion",
  },
  {
    number: 3,
    title: "Third Laav",
    gurmukhi: "\u0A24\u0A40\u0A1C\u0A40 \u0A32\u0A3E\u0A35",
    description: "Detachment from the world, divine love",
    detail:
      "In the third round, the mind is filled with divine love. Meeting with the holy congregation, the Lord is found. Through good fortune, the pure praises of the Lord are sung.",
    symbol: "Detachment blossoms into pure devotion",
  },
  {
    number: 4,
    title: "Fourth Laav",
    gurmukhi: "\u0A1A\u0A4C\u0A25\u0A40 \u0A32\u0A3E\u0A35",
    description: "Final bliss, union with the divine",
    detail:
      "In the fourth round, the mind grasps the knowledge of the divine. Through the Guru's grace, the couple attains the Lord with ease. The bride and groom merge as one in the Lord's love.",
    symbol: "Eternal union in divine light",
  },
];

/* -------------------------------------------------------------------------- */
/*  Golden Dome SVG                                                            */
/* -------------------------------------------------------------------------- */

function GoldenDome({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "h-32 w-32 text-[#FFD700]"}
    >
      {/* Main dome */}
      <path
        d="M40 130 Q40 60 100 25 Q160 60 160 130"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />
      {/* Inner dome */}
      <path
        d="M55 130 Q55 70 100 40 Q145 70 145 130"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        opacity="0.35"
      />
      {/* Dome finial (kalash) */}
      <path
        d="M97 25 L100 10 L103 25"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.7"
      />
      <circle cx="100" cy="8" r="3" fill="currentColor" opacity="0.5" />
      {/* Base */}
      <line x1="30" y1="130" x2="170" y2="130" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <line x1="25" y1="134" x2="175" y2="134" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      {/* Side minarets */}
      <rect x="25" y="90" width="8" height="40" rx="1" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
      <rect x="167" y="90" width="8" height="40" rx="1" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
      {/* Minaret tops */}
      <path d="M27 90 Q29 82 29 90" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M169 90 Q171 82 173 90" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.4" />
      {/* Arched windows */}
      <path d="M80 130 Q80 110 90 105 Q100 110 100 130" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.25" />
      <path d="M100 130 Q100 110 110 105 Q120 110 120 130" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.25" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Animated Khanda Symbol SVG — separate pieces for GSAP assembly             */
/* -------------------------------------------------------------------------- */

function AnimatedKhanda({ className }: { className?: string }) {
  return (
    <div className={className ?? "relative mx-auto h-28 w-28"}>
      <svg
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full text-[#FFD700]"
      >
        {/* Central double-edged sword (Khanda) — draws via strokeDashoffset */}
        <g className="khanda-sword">
          <path
            d="M100 20 L103 30 L103 180 L100 190 L97 180 L97 30 Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="currentColor"
            opacity="0.8"
          />
          <path d="M95 20 L100 5 L105 20 Z" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.7" />
          {/* Bottom handle */}
          <path d="M96 180 L92 195 L100 200 L108 195 L104 180" fill="currentColor" opacity="0.6" />
        </g>

        {/* Chakra (circle) — spins in from rotation 360 */}
        <g className="khanda-chakra">
          <circle cx="100" cy="105" r="40" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.6" />
          <circle cx="100" cy="105" r="36" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
        </g>

        {/* Left Kirpan (curved sword) — slides in from left */}
        <g className="khanda-kirpan-left">
          <path
            d="M60 105 Q45 70 55 40 Q58 32 62 35 Q52 65 65 100"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            opacity="0.7"
          />
          <path d="M55 40 Q52 35 48 38 Q44 42 50 44" fill="currentColor" opacity="0.5" />
        </g>

        {/* Right Kirpan (curved sword) — slides in from right */}
        <g className="khanda-kirpan-right">
          <path
            d="M140 105 Q155 70 145 40 Q142 32 138 35 Q148 65 135 100"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            opacity="0.7"
          />
          <path d="M145 40 Q148 35 152 38 Q156 42 150 44" fill="currentColor" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Static Khanda (for smaller decorative usages)                              */
/* -------------------------------------------------------------------------- */

function KhandaSymbol({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "h-28 w-28 text-[#FFD700]"}
    >
      <path d="M100 20 L103 30 L103 180 L100 190 L97 180 L97 30 Z" fill="currentColor" opacity="0.8" />
      <path d="M95 20 L100 5 L105 20 Z" fill="currentColor" opacity="0.7" />
      <circle cx="100" cy="105" r="40" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.6" />
      <circle cx="100" cy="105" r="36" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
      <path d="M60 105 Q45 70 55 40 Q58 32 62 35 Q52 65 65 100" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.7" />
      <path d="M55 40 Q52 35 48 38 Q44 42 50 44" fill="currentColor" opacity="0.5" />
      <path d="M140 105 Q155 70 145 40 Q142 32 138 35 Q148 65 135 100" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.7" />
      <path d="M145 40 Q148 35 152 38 Q156 42 150 44" fill="currentColor" opacity="0.5" />
      <path d="M96 180 L92 195 L100 200 L108 195 L104 180" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Ik Onkar Symbol                                                            */
/* -------------------------------------------------------------------------- */

function IkOnkar({ className }: { className?: string }) {
  return (
    <div className={className ?? "text-4xl text-[#FFD700]"}>
      <span style={{ fontFamily: "serif", fontWeight: 700, letterSpacing: "0.05em" }}>
        &#2676;
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Nishan Sahib Flag SVG                                                      */
/* -------------------------------------------------------------------------- */

function NishanSahibFlag({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "h-20 w-12 text-[#FF9933]"}
    >
      <line x1="20" y1="10" x2="20" y2="175" stroke="currentColor" strokeWidth="2.5" opacity="0.7" />
      <path d="M20 15 L85 40 L20 70 Z" fill="currentColor" opacity="0.5" />
      <circle cx="42" cy="42" r="8" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
      <line x1="42" y1="32" x2="42" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle cx="20" cy="175" r="4" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Gurdwara Border (dome/arch repeats)                                        */
/* -------------------------------------------------------------------------- */

function GurdwaraBorder({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "mx-auto my-6 h-14 w-full text-[#FFD700]"}
    >
      {/* Central dome */}
      <path
        d="M250 50 Q250 15 300 10 Q350 15 350 50"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
      <circle cx="300" cy="8" r="3" fill="currentColor" opacity="0.6" />
      <line x1="300" y1="3" x2="300" y2="0" stroke="currentColor" strokeWidth="1" opacity="0.5" />

      {/* Left domes */}
      {[0, 60, 120, 180].map((x) => (
        <g key={`left-${x}`}>
          <path
            d={`M${x + 20} 50 Q${x + 20} 32 ${x + 35} 28 Q${x + 50} 32 ${x + 50} 50`}
            stroke="currentColor"
            strokeWidth="0.8"
            fill="none"
            opacity="0.3"
          />
          <circle cx={x + 35} cy="26" r="1.5" fill="currentColor" opacity="0.4" />
        </g>
      ))}
      {/* Right domes */}
      {[350, 410, 470, 530].map((x) => (
        <g key={`right-${x}`}>
          <path
            d={`M${x} 50 Q${x} 32 ${x + 15} 28 Q${x + 30} 32 ${x + 30} 50`}
            stroke="currentColor"
            strokeWidth="0.8"
            fill="none"
            opacity="0.3"
          />
          <circle cx={x + 15} cy="26" r="1.5" fill="currentColor" opacity="0.4" />
        </g>
      ))}
      {/* Base lines */}
      <line x1="10" y1="55" x2="590" y2="55" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line x1="20" y1="58" x2="580" y2="58" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Saffron-Gold Divider                                                       */
/* -------------------------------------------------------------------------- */

function SaffronGoldDivider({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "mx-auto my-4 h-6 w-56 text-[#FF9933]"}
    >
      <ellipse cx="150" cy="15" rx="8" ry="5" fill="currentColor" opacity="0.3" />
      <ellipse cx="150" cy="15" rx="5" ry="8" fill="currentColor" opacity="0.3" />
      <circle cx="150" cy="15" r="3" fill="currentColor" opacity="0.5" />
      <ellipse cx="135" cy="15" rx="6" ry="3" fill="currentColor" opacity="0.2" transform="rotate(-15 135 15)" />
      <ellipse cx="120" cy="15" rx="5" ry="2.5" fill="currentColor" opacity="0.15" />
      <ellipse cx="165" cy="15" rx="6" ry="3" fill="currentColor" opacity="0.2" transform="rotate(15 165 15)" />
      <ellipse cx="180" cy="15" rx="5" ry="2.5" fill="currentColor" opacity="0.15" />
      <path d="M105 15 Q80 8 50 15 Q30 18 10 15" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.3" />
      <path d="M195 15 Q220 8 250 15 Q270 18 290 15" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.3" />
      <circle cx="10" cy="15" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="290" cy="15" r="2" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Dome Rays — conic gradient light rays behind dome silhouette               */
/* -------------------------------------------------------------------------- */

function DomeRays() {
  return (
    <div className="pointer-events-none absolute top-0 left-0 z-0 flex w-full justify-center overflow-hidden" style={{ height: "100vh" }}>
      {/* Rotating conic gradient rays */}
      <div
        className="dome-rays absolute top-[-20%] h-[600px] w-[600px] rounded-full sm:h-[800px] sm:w-[800px]"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgba(218,165,32,0.08) 10deg, transparent 20deg, transparent 30deg, rgba(218,165,32,0.06) 40deg, transparent 50deg, transparent 60deg, rgba(218,165,32,0.08) 70deg, transparent 80deg, transparent 90deg, rgba(218,165,32,0.05) 100deg, transparent 110deg, transparent 120deg, rgba(218,165,32,0.07) 130deg, transparent 140deg, transparent 150deg, rgba(218,165,32,0.06) 160deg, transparent 170deg, transparent 180deg, rgba(218,165,32,0.08) 190deg, transparent 200deg, transparent 210deg, rgba(218,165,32,0.05) 220deg, transparent 230deg, transparent 240deg, rgba(218,165,32,0.07) 250deg, transparent 260deg, transparent 270deg, rgba(218,165,32,0.06) 280deg, transparent 290deg, transparent 300deg, rgba(218,165,32,0.08) 310deg, transparent 320deg, transparent 330deg, rgba(218,165,32,0.05) 340deg, transparent 350deg, transparent 360deg)",
          opacity: 0.15,
        }}
      />
      {/* Dome silhouette overlay — clips the bottom of the rays */}
      <div className="absolute top-[220px] sm:top-[300px]">
        <GoldenDome className="h-28 w-28 text-[#FFD700]/10 sm:h-36 sm:w-36" />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Golden Dome Event Card                                                     */
/* -------------------------------------------------------------------------- */

const EVENT_EMOJIS: Record<string, string> = {
  "Akhand Path": "\uD83D\uDCD6",
  "Mehendi": "\uD83C\uDF3F",
  "Jaggo": "\uD83D\uDD25",
  "Anand Karaj": "\uD83D\uDE4F",
  "Milni": "\uD83E\uDD1D",
  "Langar": "\uD83C\uDF5B",
  "Reception": "\uD83C\uDF89",
};

function GoldenDomeEventCard({
  event,
  isAnandKaraj,
}: {
  event: { name: string; date: string; venue: string; time: string };
  index: number;
  isAnandKaraj: boolean;
}) {
  return (
    <div className={`golden-pulse-card ${isAnandKaraj ? "sm:col-span-2" : ""}`}>
      <div
        className={`relative overflow-hidden rounded-b-2xl border p-6 pt-10 shadow-lg backdrop-blur-sm ${
          isAnandKaraj
            ? "border-[#FF9933]/40 bg-gradient-to-b from-[#0F1D36]/90 to-[#0A1628]/95 shadow-[#FF9933]/10"
            : "border-[#DAA520]/20 bg-gradient-to-b from-[#0F1D36]/70 to-[#0A1628]/80 shadow-black/20"
        }`}
        style={{
          clipPath:
            "polygon(0 12%, 8% 4%, 20% 1%, 35% 0%, 50% 0%, 65% 0%, 80% 1%, 92% 4%, 100% 12%, 100% 100%, 0% 100%)",
        }}
      >
        {/* Top glow line */}
        <div
          className={`pointer-events-none absolute top-0 right-0 left-0 h-1 ${
            isAnandKaraj
              ? "bg-gradient-to-r from-transparent via-[#FF9933]/60 to-transparent"
              : "bg-gradient-to-r from-transparent via-[#DAA520]/40 to-transparent"
          }`}
        />

        {/* Ik Onkar for Anand Karaj */}
        {isAnandKaraj && (
          <div className="mb-3 flex justify-center">
            <IkOnkar className="text-3xl text-[#FF9933]/60" />
          </div>
        )}

        {/* Event icon */}
        <div className="mb-4 flex justify-center">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full border ${
              isAnandKaraj
                ? "border-[#FF9933]/40 bg-[#FF9933]/15"
                : "border-[#DAA520]/30 bg-[#DAA520]/10"
            }`}
          >
            <span className="text-lg">
              {EVENT_EMOJIS[event.name] ?? "\u2728"}
            </span>
          </div>
        </div>

        {/* Event name */}
        <h3
          className={`mb-3 text-center font-serif text-2xl font-semibold tracking-wide ${
            isAnandKaraj ? "text-3xl text-[#FF9933]" : "text-[#DAA520]"
          }`}
        >
          {event.name}
        </h3>

        {/* Gold divider */}
        <div
          className={`mx-auto mb-3 h-px w-16 bg-gradient-to-r from-transparent to-transparent ${
            isAnandKaraj ? "via-[#FF9933]/60" : "via-[#DAA520]/40"
          }`}
        />

        {/* Date & Time */}
        <div className="mb-2 flex items-center justify-center gap-2 text-sm text-[#FFF8E7]/80">
          <Calendar className={`h-3.5 w-3.5 ${isAnandKaraj ? "text-[#FF9933]/70" : "text-[#DAA520]/60"}`} />
          <span>{event.date}</span>
        </div>
        <div className="mb-2 flex items-center justify-center gap-2 text-sm text-[#FFF8E7]/80">
          <Clock className={`h-3.5 w-3.5 ${isAnandKaraj ? "text-[#FF9933]/70" : "text-[#DAA520]/60"}`} />
          <span>{event.time}</span>
        </div>

        {/* Venue */}
        <div className="flex items-center justify-center gap-2 text-sm text-[#FFF8E7]/55">
          <MapPin className="h-3.5 w-3.5 text-[#DAA520]/40" />
          <span>{event.venue}</span>
        </div>

        {/* Corner accents */}
        <div
          className={`pointer-events-none absolute bottom-2 left-2 h-6 w-6 border-b border-l ${
            isAnandKaraj ? "border-[#FF9933]/25" : "border-[#DAA520]/15"
          }`}
        />
        <div
          className={`pointer-events-none absolute bottom-2 right-2 h-6 w-6 border-b border-r ${
            isAnandKaraj ? "border-[#FF9933]/25" : "border-[#DAA520]/15"
          }`}
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Laav Card Component                                                        */
/* -------------------------------------------------------------------------- */

function LaavCard({
  laav,
}: {
  laav: (typeof FOUR_LAAVAAN)[number];
  index: number;
}) {
  return (
    <div className="laav-card">
      <div className="relative overflow-hidden rounded-2xl border border-[#DAA520]/25 bg-gradient-to-br from-[#0F1D36]/80 to-[#0A1628]/90 p-6 backdrop-blur-sm sm:p-8">
        {/* Laav number badge */}
        <div className="mb-4 flex items-center gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-[#DAA520]/40 bg-gradient-to-br from-[#DAA520]/20 to-[#C5961B]/10">
            <span className="font-serif text-xl font-bold text-[#FFD700]">{laav.number}</span>
          </div>
          <div>
            <h4 className="font-serif text-xl font-semibold text-[#FFD700]">{laav.title}</h4>
            <p className="font-serif text-sm text-[#DAA520]/60">{laav.gurmukhi}</p>
          </div>
        </div>

        {/* Description */}
        <p className="mb-3 font-serif text-base leading-relaxed text-[#FF9933]/90 italic">
          &ldquo;{laav.description}&rdquo;
        </p>

        {/* Detail */}
        <p className="mb-3 text-sm leading-relaxed text-[#FFF8E7]/55">
          {laav.detail}
        </p>

        {/* Symbol line */}
        <div className="flex items-center gap-2 border-t border-[#DAA520]/15 pt-3">
          <div className="h-1.5 w-1.5 rounded-full bg-[#DAA520]/50" />
          <p className="text-xs tracking-wide text-[#DAA520]/50">{laav.symbol}</p>
        </div>

        {/* Subtle corner glow */}
        <div className="pointer-events-none absolute top-0 right-0 h-20 w-20 rounded-bl-full bg-gradient-to-bl from-[#DAA520]/5 to-transparent" />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Template Component                                                    */
/* -------------------------------------------------------------------------- */

export default function GoldenGurdwaraTemplate({ invite, isDemo }: TemplateProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const { isPlaying, toggle } = useMusicPlayer(invite.musicUrl);
  const countdown = useCountdown(invite.weddingDate);

  // Initialize Lenis smooth scrolling
  useLenis();

  // GSAP ScrollTrigger animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // ---- 1. Khanda assembly timeline ----
      const khandaTl = gsap.timeline({ delay: 0.5 });

      // Sword draws in via strokeDashoffset
      khandaTl.fromTo(
        ".khanda-sword path",
        { strokeDashoffset: 500, strokeDasharray: 500, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 1.5, ease: "power2.inOut" },
      );

      // Chakra spins in
      khandaTl.fromTo(
        ".khanda-chakra",
        { rotation: 360, opacity: 0, scale: 0, transformOrigin: "50% 50%" },
        { rotation: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
        "-=0.5",
      );

      // Left Kirpan slides in from left
      khandaTl.fromTo(
        ".khanda-kirpan-left",
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.3",
      );

      // Right Kirpan slides in from right
      khandaTl.fromTo(
        ".khanda-kirpan-right",
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.8",
      );

      // ---- 2. Golden pulse cards ----
      gsap.utils.toArray<HTMLElement>(".golden-pulse-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0, boxShadow: "0 0 0px rgba(218,165,32,0)" },
          {
            y: 0,
            opacity: 1,
            boxShadow: "0 0 25px rgba(218,165,32,0.3)",
            duration: 0.8,
            delay: i * 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
        // Continuous golden glow pulse after reveal
        gsap.to(el, {
          boxShadow: "0 0 15px rgba(218,165,32,0.15)",
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1 + i * 0.2,
        });
      });

      // ---- 3. Gurdwara reveals (golden curtain draw effect) ----
      gsap.utils.toArray<HTMLElement>(".gurdwara-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // ---- 4. Sacred light countdown ----
      gsap.utils.toArray<HTMLElement>(".sacred-light").forEach((el, i) => {
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

      // ---- 5. Dome rays rotation ----
      gsap.to(".dome-rays", {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: "none",
      });

      // ---- 6. Laavan cards sequential ----
      gsap.utils.toArray<HTMLElement>(".laav-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { x: i % 2 === 0 ? -60 : 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // ---- 7. Parallax for decorative pattern overlay ----
      gsap.utils.toArray<HTMLElement>(".parallax-pattern").forEach((el) => {
        gsap.to(el, {
          yPercent: -25,
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

  // Default events for Golden Gurdwara Sikh wedding
  const events = invite.events ?? [
    { name: "Milni", date: invite.weddingDate ?? "Date TBA", venue: invite.venue ?? "Gurudwara Sahib", time: "9 AM" },
    { name: "Anand Karaj", date: invite.weddingDate ?? "Date TBA", venue: invite.venue ?? "Gurudwara Sahib", time: "10 AM" },
    { name: "Langar", date: invite.weddingDate ?? "Date TBA", venue: invite.venue ?? "Gurudwara Sahib", time: "1 PM" },
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
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0A1628] via-[#0F1D36] to-[#0A1628] text-[#FFF8E7]"
    >
      {/* Gold shimmer particles */}
      <ParticleLayer type="LIGHT" />

      {/* Dome rays ambient effect — fixed behind hero */}
      <DomeRays />

      {/* Subtle pattern overlay */}
      <div className="parallax-pattern pointer-events-none fixed inset-0 z-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23DAA520' stroke-width='0.5'%3E%3Ccircle cx='40' cy='40' r='30'/%3E%3Ccircle cx='40' cy='40' r='20'/%3E%3Cpath d='M40 10 L40 70 M10 40 L70 40'/%3E%3Cpath d='M18 18 L62 62 M62 18 L18 62'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Music toggle */}
      {invite.musicUrl && (
        <MusicToggleButton
          isPlaying={isPlaying}
          onToggle={toggle}
          className="fixed top-4 right-4 z-50 rounded-full border border-[#DAA520]/30 bg-[#0F1D36]/80 p-3 shadow-lg backdrop-blur-sm transition-colors hover:bg-[#0F1D36]"
        />
      )}

      {/* Demo banner */}
      {isDemo && (
        <div className="relative z-10 bg-[#FF9933] py-2 text-center text-sm font-medium text-white">
          This is a demo preview. Complete payment to use your own details.
        </div>
      )}

      {/* ================================================================== */}
      {/*  CONTENT                                                           */}
      {/* ================================================================== */}

      {/* ---------------------------------------------------------------- */}
      {/*  SECTION 1 — HERO (full viewport)                                */}
      {/* ---------------------------------------------------------------- */}
      <div className="relative z-10">
        <motion.section
          className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          {/* Ik Onkar at top */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4 flex justify-center"
          >
            <IkOnkar className="text-5xl text-[#FF9933]/70" />
          </motion.div>

          {/* Gurmukhi heading */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-2"
          >
            <p className="font-serif text-2xl leading-relaxed text-[#DAA520]/80 sm:text-3xl">
              &#2565;&#2600;&#2672;&#2598; &#2581;&#2622;&#2608;&#2588;
            </p>
          </motion.div>

          {/* English heading */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-5"
          >
            <p className="font-serif text-lg tracking-[0.2em] text-[#DAA520]/60 uppercase">
              Anand Karaj
            </p>
          </motion.div>

          {/* Waheguru greeting */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6"
          >
            <p className="font-serif text-xl leading-relaxed text-[#FFD700] sm:text-2xl">
              Waheguru Ji Ka Khalsa
            </p>
            <p className="font-serif text-xl leading-relaxed text-[#FFD700] sm:text-2xl">
              Waheguru Ji Ki Fateh
            </p>
          </motion.div>

          {/* Animated Khanda symbol — assembles piece by piece */}
          <div className="mx-auto mb-6">
            <AnimatedKhanda className="relative mx-auto h-24 w-24 sm:h-28 sm:w-28" />
          </div>

          <GurdwaraBorder className="mx-auto my-4 h-12 w-full max-w-2xl text-[#DAA520]" />

          {/* Parent blessings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mb-8 w-full max-w-2xl"
          >
            <p className="mb-1 text-sm tracking-[0.15em] text-[#FFF8E7]/50 uppercase">
              With the blessings of
            </p>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Groom's parents */}
              <div className="text-center">
                {invite.groomFatherName && invite.groomMotherName ? (
                  <>
                    <p className="text-xs tracking-wider text-[#FF9933]/70 uppercase">Son of</p>
                    <p className="mt-1 font-serif text-lg text-[#FFF8E7]/90">
                      S. {invite.groomFatherName}
                    </p>
                    <p className="font-serif text-sm text-[#FFF8E7]/70">
                      & Smt. {invite.groomMotherName}
                    </p>
                  </>
                ) : invite.groomFatherName ? (
                  <>
                    <p className="text-xs tracking-wider text-[#FF9933]/70 uppercase">Son of</p>
                    <p className="mt-1 font-serif text-lg text-[#FFF8E7]/90">S. {invite.groomFatherName}</p>
                  </>
                ) : null}
              </div>

              {/* Bride's parents */}
              <div className="text-center">
                {invite.brideFatherName && invite.brideMotherName ? (
                  <>
                    <p className="text-xs tracking-wider text-[#FF9933]/70 uppercase">Daughter of</p>
                    <p className="mt-1 font-serif text-lg text-[#FFF8E7]/90">
                      S. {invite.brideFatherName}
                    </p>
                    <p className="font-serif text-sm text-[#FFF8E7]/70">
                      & Smt. {invite.brideMotherName}
                    </p>
                  </>
                ) : invite.brideFatherName ? (
                  <>
                    <p className="text-xs tracking-wider text-[#FF9933]/70 uppercase">Daughter of</p>
                    <p className="mt-1 font-serif text-lg text-[#FFF8E7]/90">S. {invite.brideFatherName}</p>
                  </>
                ) : null}
              </div>
            </div>
          </motion.div>

          {/* Invitation text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-4 text-sm tracking-[0.15em] text-[#FFF8E7]/50 uppercase"
          >
            Cordially invite you to the Anand Karaj ceremony of
          </motion.p>

          {/* Hero image */}
          {invite.heroImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mx-auto mb-8 h-56 w-56 overflow-hidden rounded-full border-2 border-[#FF9933]/40 shadow-2xl shadow-[#FF9933]/10 sm:h-64 sm:w-64"
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
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <h1 className="font-serif text-5xl font-semibold leading-tight text-[#FF9933] sm:text-6xl lg:text-7xl">
              {invite.groomName}
            </h1>

            {/* Gold heart divider */}
            <div className="my-4 flex items-center justify-center gap-4">
              <motion.div
                className="h-px w-16 bg-gradient-to-r from-transparent to-[#DAA520]/50 sm:w-24"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.1, duration: 0.8 }}
              />
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.2, duration: 0.6, type: "spring" }}
              >
                <Heart className="h-5 w-5 fill-[#DAA520]/50 text-[#DAA520]" />
              </motion.div>
              <motion.div
                className="h-px w-16 bg-gradient-to-l from-transparent to-[#DAA520]/50 sm:w-24"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.1, duration: 0.8 }}
              />
            </div>

            <h1 className="font-serif text-5xl font-semibold leading-tight text-[#FF9933] sm:text-6xl lg:text-7xl">
              {invite.brideName}
            </h1>
          </motion.div>

          {/* Date */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="mt-6 text-base text-[#FFF8E7]/50"
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
              className="mx-auto h-8 w-px bg-[#FF9933]/30"
            />
          </motion.div>
        </motion.section>

        {/* Remaining sections: max-w-3xl centered */}
        <div className="relative z-10 mx-auto max-w-3xl px-4">
          <GurdwaraBorder />

          {/* ---------------------------------------------------------------- */}
          {/*  SECTION 2 — EVENTS GRID (2-column)                             */}
          {/* ---------------------------------------------------------------- */}
          <section className="mb-16">
            <div className="gurdwara-reveal mb-10 text-center">
              <p className="mb-2 text-xs tracking-[0.3em] text-[#FF9933]/60 uppercase">
                Sacred Celebrations
              </p>
              <h2 className="font-serif text-3xl text-[#FFD700] sm:text-4xl">
                Wedding Events
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {events.map((event, index) => (
                <GoldenDomeEventCard
                  key={index}
                  event={event}
                  index={index}
                  isAnandKaraj={event.name === "Anand Karaj"}
                />
              ))}
            </div>
          </section>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 2.5 — THE FOUR LAAVAAN (full-width golden band)         */}
        {/* ---------------------------------------------------------------- */}
        <section className="relative mb-16 overflow-hidden">
          {/* Full-width golden gradient background band */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#DAA520]/[0.06] via-[#C5961B]/[0.1] to-[#DAA520]/[0.06]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/80 via-transparent to-[#0A1628]/80" />

          {/* Top golden border line */}
          <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-[#DAA520]/30 to-transparent" />
          {/* Bottom golden border line */}
          <div className="absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-[#DAA520]/30 to-transparent" />

          <div className="relative z-10 mx-auto max-w-3xl px-4 py-16 sm:py-20">
            <div className="gurdwara-reveal mb-10 text-center">
              <NishanSahibFlag className="mx-auto mb-4 h-16 w-10 text-[#FF9933]/50" />
              <p className="mb-2 text-xs tracking-[0.3em] text-[#FF9933]/60 uppercase">
                The Sacred Ceremony
              </p>
              <h2 className="font-serif text-3xl text-[#FFD700] sm:text-4xl">
                The Four Laavaan
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#FFF8E7]/45">
                The Anand Karaj ceremony centers on four sacred rounds around the Guru Granth Sahib Ji,
                each representing a stage of the soul&apos;s journey toward union with the Divine.
              </p>
              <SaffronGoldDivider className="mx-auto mt-4 h-5 w-48 text-[#FF9933]/50" />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {FOUR_LAAVAAN.map((laav, index) => (
                <LaavCard key={laav.number} laav={laav} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Continue with max-w-3xl centered content */}
        <div className="relative z-10 mx-auto max-w-3xl px-4">
          <SaffronGoldDivider />

          {/* ---------------------------------------------------------------- */}
          {/*  SECTION 3 — COUPLE PHOTO                                        */}
          {/* ---------------------------------------------------------------- */}
          {invite.couplePhoto && (
            <section className="mb-16">
              <div className="gurdwara-reveal overflow-hidden rounded-2xl border border-[#FF9933]/20 shadow-xl shadow-black/20">
                <div
                  className="aspect-[4/3] w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${invite.couplePhoto})` }}
                />
              </div>
              <div className="mt-4 text-center">
                <p className="font-serif text-lg text-[#FFF8E7]/50 italic">
                  {invite.groomName} & {invite.brideName}
                </p>
              </div>
            </section>
          )}

          {/* Gallery */}
          {invite.galleryImages.length > 0 && (
            <section className="mb-16">
              <div className="gurdwara-reveal mb-8 text-center">
                <h2 className="font-serif text-2xl text-[#FFD700]">Gallery</h2>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {invite.galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="gurdwara-reveal aspect-square overflow-hidden rounded-xl border border-[#DAA520]/20 shadow-md"
                  >
                    <div
                      className="h-full w-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
                      style={{ backgroundImage: `url(${img})` }}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          <GurdwaraBorder />

          {/* ---------------------------------------------------------------- */}
          {/*  SECTION 4 — THINGS TO KNOW                                      */}
          {/* ---------------------------------------------------------------- */}
          {thingsToKnow.length > 0 && (
            <section className="mb-16">
              <div className="gurdwara-reveal mb-10 text-center">
                <p className="mb-2 text-xs tracking-[0.3em] text-[#FF9933]/60 uppercase">
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
                    className="gurdwara-reveal rounded-xl border border-[#DAA520]/15 bg-[#0F1D36]/40 p-5 backdrop-blur-sm"
                  >
                    <h3 className="mb-2 font-serif text-lg text-[#FF9933]">
                      {item.label}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#FFF8E7]/55">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Story */}
          {invite.story && (
            <section className="mb-16">
              <div className="gurdwara-reveal rounded-2xl border border-[#DAA520]/20 bg-[#0F1D36]/40 p-8 text-center backdrop-blur-sm sm:p-10">
                <h2 className="mb-2 font-serif text-2xl text-[#FFD700]">Our Story</h2>
                <SaffronGoldDivider className="mx-auto my-4 h-5 w-48 text-[#FF9933]/50" />
                <p className="leading-relaxed text-[#FFF8E7]/65">{invite.story}</p>
              </div>
            </section>
          )}

          <SaffronGoldDivider />

          {/* ---------------------------------------------------------------- */}
          {/*  SECTION 5 — COUNTDOWN TIMER (Sacred Light Reveal)               */}
          {/* ---------------------------------------------------------------- */}
          {invite.weddingDate && (
            <section className="mb-16">
              <div className="gurdwara-reveal mb-8 text-center">
                <p className="mb-2 text-xs tracking-[0.3em] text-[#FF9933]/60 uppercase">
                  The Sacred Day Approaches
                </p>
                <h2 className="font-serif text-3xl text-[#FFD700]">Counting Down</h2>
              </div>

              <div className="rounded-2xl border border-[#DAA520]/20 bg-[#0F1D36]/40 p-8 backdrop-blur-sm">
                <div className="grid grid-cols-4 gap-3 sm:gap-6">
                  {[
                    { label: "Days", value: countdown.days },
                    { label: "Hours", value: countdown.hours },
                    { label: "Minutes", value: countdown.minutes },
                    { label: "Seconds", value: countdown.seconds },
                  ].map((unit) => (
                    <div key={unit.label} className="sacred-light text-center">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl border border-[#FF9933]/25 bg-[#0A1628]/70 shadow-[0_0_12px_rgba(218,165,32,0.1)] sm:h-20 sm:w-20">
                        <span className="font-serif text-2xl font-semibold text-[#FF9933] sm:text-3xl">
                          {String(unit.value).padStart(2, "0")}
                        </span>
                      </div>
                      <span className="mt-2 block text-[10px] tracking-[0.2em] text-[#FFF8E7]/45 uppercase">
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-[#FFF8E7]/45">
                    {formatWeddingDate(invite.weddingDate)}
                    {invite.weddingTime && ` at ${invite.weddingTime}`}
                  </p>
                  {invite.venue && (
                    <p className="mt-1 flex items-center justify-center gap-1 text-sm text-[#FFF8E7]/35">
                      <MapPin className="h-3 w-3" /> {invite.venue}
                    </p>
                  )}
                </div>
              </div>
            </section>
          )}

          <GurdwaraBorder />

          {/* ---------------------------------------------------------------- */}
          {/*  SECTION 6 — COUPLE MESSAGE                                      */}
          {/* ---------------------------------------------------------------- */}
          {invite.coupleMessage && (
            <section className="mb-16">
              <div className="gurdwara-reveal rounded-2xl border border-[#FF9933]/20 bg-[#0F1D36]/40 p-8 text-center backdrop-blur-sm sm:p-10">
                <KhandaSymbol className="mx-auto mb-4 h-12 w-12 text-[#DAA520]/30" />
                <p className="font-serif text-lg leading-relaxed text-[#FFF8E7]/75 italic">
                  &ldquo;{invite.coupleMessage}&rdquo;
                </p>
                <p className="mt-4 text-sm text-[#FF9933]/50">
                  &mdash; {invite.groomName} & {invite.brideName}
                </p>
              </div>
            </section>
          )}

          <SaffronGoldDivider />

          {/* ---------------------------------------------------------------- */}
          {/*  SECTION 7 — RSVP + SHARE BUTTONS                               */}
          {/* ---------------------------------------------------------------- */}
          <section className="mb-16 text-center">
            <div className="gurdwara-reveal">
              <h2 className="mb-4 font-serif text-3xl text-[#FFD700]">
                Will You Join Us?
              </h2>
              <p className="mb-8 text-sm text-[#FFF8E7]/50">
                We would be honoured to have you witness the Anand Karaj and celebrate this joyous occasion with us.
              </p>

              {hashtag && (
                <p className="mb-4 font-serif text-lg text-[#FF9933]/70 italic">
                  {hashtag}
                </p>
              )}

              <div className="flex flex-col items-center gap-4">
                <Button
                  size="lg"
                  className="w-full max-w-xs border border-[#FF9933]/50 bg-[#FF9933] text-white shadow-lg shadow-[#FF9933]/20 hover:bg-[#FF9933]/90"
                  onClick={() => setRsvpOpen(true)}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  RSVP Now
                </Button>

                <div className="flex w-full max-w-xs gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 border-[#DAA520]/30 bg-transparent text-[#DAA520] hover:bg-[#DAA520]/10 hover:text-[#DAA520]"
                    onClick={() => void handleShare()}
                  >
                    <Share2 className="mr-2 h-4 w-4" /> Share
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-[#DAA520]/30 bg-transparent text-[#DAA520] hover:bg-[#DAA520]/10 hover:text-[#DAA520]"
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
          {/*  SECTION 8 — FOOTER / WATERMARK                                  */}
          {/* ---------------------------------------------------------------- */}
          <footer className="text-center">
            <GurdwaraBorder className="mx-auto mb-4 h-12 w-full text-[#DAA520]/25" />

            <div className="gurdwara-reveal">
              <IkOnkar className="mx-auto mb-3 text-3xl text-[#FF9933]/25" />
              <p className="font-serif text-lg text-[#DAA520]/60">
                {invite.groomName} & {invite.brideName}
              </p>
              <p className="mt-1 text-sm text-[#FFF8E7]/35">
                {formatWeddingDate(invite.weddingDate)}
              </p>
              {invite.venue && (
                <p className="mt-1 text-xs text-[#FFF8E7]/25">
                  {invite.venue}
                </p>
              )}

              <p className="mt-6 text-xs text-[#FFF8E7]/25 italic">
                May Waheguru shower eternal blessings upon this sacred bond
              </p>
            </div>

            <CardoraWatermark className="mt-10 pb-8 text-center text-xs text-[#FFF8E7]/20" />
          </footer>
        </div>
      </div>

      {/* RSVP Modal */}
      <RsvpModal open={rsvpOpen} onOpenChange={setRsvpOpen} inviteSlug={invite.slug} />
    </div>
  );
}
