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

/** Garden gate arch with detailed trellis and climbing roses */
function GardenGate({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 260"
      fill="none"
      className={`mx-auto ${className}`}
    >
      {/* Outer arch */}
      <path
        d="M30,260 L30,110 Q30,15 160,15 Q290,15 290,110 L290,260"
        stroke="#4A7C59"
        strokeWidth="3"
        fill="none"
        opacity="0.5"
      />
      {/* Inner arch */}
      <path
        d="M55,260 L55,120 Q55,40 160,40 Q265,40 265,120 L265,260"
        stroke="#4A7C59"
        strokeWidth="1.5"
        fill="none"
        opacity="0.3"
      />
      {/* Trellis crossbars */}
      <line x1="30" y1="160" x2="290" y2="160" stroke="#4A7C59" strokeWidth="0.8" opacity="0.15" />
      <line x1="30" y1="210" x2="290" y2="210" stroke="#4A7C59" strokeWidth="0.8" opacity="0.15" />
      {/* Left climbing vine */}
      <path
        d="M30,240 Q20,220 28,200 Q38,185 30,170 Q22,155 32,140 Q40,128 30,115"
        stroke="#4A7C59"
        strokeWidth="1.2"
        fill="none"
        opacity="0.35"
      />
      {/* Left vine leaves */}
      <ellipse cx="18" cy="225" rx="7" ry="3.5" fill="#4A7C59" fillOpacity="0.2" transform="rotate(-35 18 225)" />
      <ellipse cx="22" cy="195" rx="6" ry="3" fill="#4A7C59" fillOpacity="0.18" transform="rotate(25 22 195)" />
      <ellipse cx="20" cy="160" rx="7" ry="3" fill="#4A7C59" fillOpacity="0.2" transform="rotate(-20 20 160)" />
      <ellipse cx="24" cy="132" rx="6" ry="3" fill="#4A7C59" fillOpacity="0.18" transform="rotate(15 24 132)" />
      {/* Right climbing vine */}
      <path
        d="M290,240 Q300,220 292,200 Q282,185 290,170 Q298,155 288,140 Q280,128 290,115"
        stroke="#4A7C59"
        strokeWidth="1.2"
        fill="none"
        opacity="0.35"
      />
      {/* Right vine leaves */}
      <ellipse cx="302" cy="225" rx="7" ry="3.5" fill="#4A7C59" fillOpacity="0.2" transform="rotate(35 302 225)" />
      <ellipse cx="298" cy="195" rx="6" ry="3" fill="#4A7C59" fillOpacity="0.18" transform="rotate(-25 298 195)" />
      <ellipse cx="300" cy="160" rx="7" ry="3" fill="#4A7C59" fillOpacity="0.2" transform="rotate(20 300 160)" />
      <ellipse cx="296" cy="132" rx="6" ry="3" fill="#4A7C59" fillOpacity="0.18" transform="rotate(-15 296 132)" />
      {/* Top rose cluster */}
      <circle cx="160" cy="18" r="5" fill="#D4848B" fillOpacity="0.45" />
      <circle cx="148" cy="25" r="4" fill="#D4848B" fillOpacity="0.35" />
      <circle cx="172" cy="25" r="4" fill="#D4848B" fillOpacity="0.35" />
      <circle cx="140" cy="35" r="3" fill="#D4848B" fillOpacity="0.25" />
      <circle cx="180" cy="35" r="3" fill="#D4848B" fillOpacity="0.25" />
      {/* Small buds */}
      <circle cx="152" cy="14" r="2.5" fill="#D4848B" fillOpacity="0.3" />
      <circle cx="168" cy="14" r="2.5" fill="#D4848B" fillOpacity="0.3" />
      {/* Cross at the very top */}
      <line x1="160" y1="3" x2="160" y2="13" stroke="#C5A55A" strokeWidth="1.5" opacity="0.4" />
      <line x1="155" y1="7" x2="165" y2="7" stroke="#C5A55A" strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
}

/** Wavy vine border with blossoms */
function VineBorder({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 30" className={`mx-auto h-6 w-64 ${className}`} fill="none">
      <path
        d="M0,15 Q50,5 100,15 Q150,25 200,15 Q250,5 300,15 Q350,25 400,15"
        stroke="#4A7C59"
        strokeWidth="1.2"
        opacity="0.4"
      />
      <ellipse cx="50" cy="8" rx="8" ry="3" fill="#4A7C59" fillOpacity="0.2" transform="rotate(-25 50 8)" />
      <ellipse cx="100" cy="17" rx="7" ry="2.5" fill="#4A7C59" fillOpacity="0.18" transform="rotate(18 100 17)" />
      <ellipse cx="150" cy="22" rx="8" ry="3" fill="#4A7C59" fillOpacity="0.2" transform="rotate(-12 150 22)" />
      <ellipse cx="200" cy="12" rx="7" ry="2.5" fill="#4A7C59" fillOpacity="0.18" transform="rotate(22 200 12)" />
      <ellipse cx="250" cy="8" rx="8" ry="3" fill="#4A7C59" fillOpacity="0.2" transform="rotate(-18 250 8)" />
      <ellipse cx="300" cy="17" rx="7" ry="2.5" fill="#4A7C59" fillOpacity="0.18" transform="rotate(12 300 17)" />
      <ellipse cx="350" cy="22" rx="8" ry="3" fill="#4A7C59" fillOpacity="0.2" transform="rotate(-22 350 22)" />
      <circle cx="75" cy="10" r="2.5" fill="#D4848B" fillOpacity="0.35" />
      <circle cx="175" cy="20" r="2" fill="#D4848B" fillOpacity="0.3" />
      <circle cx="275" cy="10" r="2.5" fill="#D4848B" fillOpacity="0.35" />
      <circle cx="375" cy="20" r="2" fill="#D4848B" fillOpacity="0.3" />
    </svg>
  );
}

/** Butterfly with detailed wings */
function ButterflyIcon({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} fill="none">
      {/* Left upper wing */}
      <path
        d="M20,20 Q10,6 4,14 Q1,22 10,23 Q16,23 20,20"
        fill="#D4848B"
        fillOpacity="0.4"
        stroke="#D4848B"
        strokeWidth="0.5"
        opacity="0.65"
      />
      {/* Right upper wing */}
      <path
        d="M20,20 Q30,6 36,14 Q39,22 30,23 Q24,23 20,20"
        fill="#D4848B"
        fillOpacity="0.4"
        stroke="#D4848B"
        strokeWidth="0.5"
        opacity="0.65"
      />
      {/* Left lower wing */}
      <path
        d="M20,20 Q11,26 7,31 Q9,35 15,29 Q18,26 20,20"
        fill="#D4848B"
        fillOpacity="0.3"
        stroke="#D4848B"
        strokeWidth="0.4"
        opacity="0.5"
      />
      {/* Right lower wing */}
      <path
        d="M20,20 Q29,26 33,31 Q31,35 25,29 Q22,26 20,20"
        fill="#D4848B"
        fillOpacity="0.3"
        stroke="#D4848B"
        strokeWidth="0.4"
        opacity="0.5"
      />
      {/* Wing dots */}
      <circle cx="11" cy="16" r="1.5" fill="#C5A55A" fillOpacity="0.4" />
      <circle cx="29" cy="16" r="1.5" fill="#C5A55A" fillOpacity="0.4" />
      {/* Body */}
      <line x1="20" y1="13" x2="20" y2="29" stroke="#4A7C59" strokeWidth="1" opacity="0.5" />
      {/* Antennae */}
      <path d="M20,13 Q16,7 13,5" stroke="#4A7C59" strokeWidth="0.5" opacity="0.4" />
      <path d="M20,13 Q24,7 27,5" stroke="#4A7C59" strokeWidth="0.5" opacity="0.4" />
      <circle cx="13" cy="5" r="1" fill="#4A7C59" fillOpacity="0.4" />
      <circle cx="27" cy="5" r="1" fill="#4A7C59" fillOpacity="0.4" />
    </svg>
  );
}

/** Floral cross decoration */
function FloralCross({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none">
      {/* Cross */}
      <line x1="30" y1="10" x2="30" y2="50" stroke="#C5A55A" strokeWidth="1.8" opacity="0.35" />
      <line x1="15" y1="25" x2="45" y2="25" stroke="#C5A55A" strokeWidth="1.8" opacity="0.35" />
      {/* Tiny blooms at cross ends */}
      <circle cx="30" cy="10" r="3" fill="#D4848B" fillOpacity="0.3" />
      <circle cx="30" cy="50" r="3" fill="#D4848B" fillOpacity="0.3" />
      <circle cx="15" cy="25" r="3" fill="#D4848B" fillOpacity="0.3" />
      <circle cx="45" cy="25" r="3" fill="#D4848B" fillOpacity="0.3" />
      {/* Center bloom */}
      <circle cx="30" cy="25" r="4" fill="#D4848B" fillOpacity="0.4" />
      {/* Leaves around center */}
      <ellipse cx="24" cy="20" rx="4" ry="2" fill="#4A7C59" fillOpacity="0.2" transform="rotate(-40 24 20)" />
      <ellipse cx="36" cy="30" rx="4" ry="2" fill="#4A7C59" fillOpacity="0.2" transform="rotate(-40 36 30)" />
      <ellipse cx="36" cy="20" rx="4" ry="2" fill="#4A7C59" fillOpacity="0.2" transform="rotate(40 36 20)" />
      <ellipse cx="24" cy="30" rx="4" ry="2" fill="#4A7C59" fillOpacity="0.2" transform="rotate(40 24 30)" />
    </svg>
  );
}

/** Vertical vine SVG for card side decoration -- uses stroke-dasharray for draw animation */
function CardVine({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 200" className={className} fill="none">
      <path
        className="vine-stroke"
        d="M15,200 Q5,180 15,160 Q25,140 15,120 Q5,100 15,80 Q25,60 15,40 Q5,20 15,0"
        stroke="#4A7C59"
        strokeWidth="1.5"
        opacity="0.45"
        strokeDasharray="320"
        strokeDashoffset="320"
      />
      {/* Leaves along the vine */}
      <ellipse className="vine-leaf" cx="6" cy="175" rx="6" ry="3" fill="#4A7C59" fillOpacity="0" transform="rotate(-30 6 175)" />
      <ellipse className="vine-leaf" cx="24" cy="145" rx="5" ry="2.5" fill="#4A7C59" fillOpacity="0" transform="rotate(25 24 145)" />
      <ellipse className="vine-leaf" cx="6" cy="115" rx="6" ry="3" fill="#4A7C59" fillOpacity="0" transform="rotate(-20 6 115)" />
      <ellipse className="vine-leaf" cx="24" cy="85" rx="5" ry="2.5" fill="#4A7C59" fillOpacity="0" transform="rotate(30 24 85)" />
      <ellipse className="vine-leaf" cx="6" cy="55" rx="6" ry="3" fill="#4A7C59" fillOpacity="0" transform="rotate(-25 6 55)" />
      <ellipse className="vine-leaf" cx="24" cy="25" rx="5" ry="2.5" fill="#4A7C59" fillOpacity="0" transform="rotate(20 24 25)" />
      {/* Tiny blooms */}
      <circle className="vine-leaf" cx="8" cy="90" r="2.5" fill="#D4848B" fillOpacity="0" />
      <circle className="vine-leaf" cx="22" cy="50" r="2" fill="#D4848B" fillOpacity="0" />
    </svg>
  );
}

/** Full-height growing vine for page border */
function GrowingPageVine({ side }: { side: "left" | "right" }) {
  const mirror = side === "right";
  return (
    <svg
      viewBox="0 0 40 1000"
      className={`growing-vine pointer-events-none ${side === "left" ? "fixed top-0 left-0" : "fixed top-0 right-0"} z-[2] hidden h-full w-8 lg:block`}
      fill="none"
      style={mirror ? { transform: "scaleX(-1)" } : undefined}
      preserveAspectRatio="none"
    >
      <path
        className="growing-vine-stroke"
        d="M20,1000 Q8,950 20,900 Q32,850 20,800 Q8,750 20,700 Q32,650 20,600 Q8,550 20,500 Q32,450 20,400 Q8,350 20,300 Q32,250 20,200 Q8,150 20,100 Q32,50 20,0"
        stroke="#4A7C59"
        strokeWidth="1.2"
        opacity="0.2"
        strokeDasharray="1600"
        strokeDashoffset="1600"
      />
      {/* Leaves scattered */}
      <ellipse cx="8" cy="920" rx="6" ry="3" fill="#4A7C59" fillOpacity="0.08" transform="rotate(-30 8 920)" />
      <ellipse cx="32" cy="820" rx="5" ry="2.5" fill="#4A7C59" fillOpacity="0.06" transform="rotate(25 32 820)" />
      <ellipse cx="8" cy="720" rx="6" ry="3" fill="#4A7C59" fillOpacity="0.08" transform="rotate(-20 8 720)" />
      <ellipse cx="32" cy="620" rx="5" ry="2.5" fill="#4A7C59" fillOpacity="0.06" transform="rotate(30 32 620)" />
      <ellipse cx="8" cy="520" rx="6" ry="3" fill="#4A7C59" fillOpacity="0.08" transform="rotate(-25 8 520)" />
      <ellipse cx="32" cy="420" rx="5" ry="2.5" fill="#4A7C59" fillOpacity="0.06" transform="rotate(20 32 420)" />
      <ellipse cx="8" cy="320" rx="6" ry="3" fill="#4A7C59" fillOpacity="0.08" transform="rotate(-30 8 320)" />
      <ellipse cx="32" cy="220" rx="5" ry="2.5" fill="#4A7C59" fillOpacity="0.06" transform="rotate(25 32 220)" />
      <ellipse cx="8" cy="120" rx="6" ry="3" fill="#4A7C59" fillOpacity="0.08" transform="rotate(-20 8 120)" />
    </svg>
  );
}

/** Small flower SVG that blooms behind countdown boxes */
function BloomFlower({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none">
      {/* Petals -- each starts at scale 0 and blooms outward */}
      <ellipse className="bloom-petal" cx="30" cy="14" rx="7" ry="10" fill="#D4848B" fillOpacity="0.35" />
      <ellipse className="bloom-petal" cx="44" cy="24" rx="7" ry="10" fill="#D4848B" fillOpacity="0.3" transform="rotate(72 44 24)" />
      <ellipse className="bloom-petal" cx="40" cy="40" rx="7" ry="10" fill="#D4848B" fillOpacity="0.3" transform="rotate(144 40 40)" />
      <ellipse className="bloom-petal" cx="20" cy="40" rx="7" ry="10" fill="#D4848B" fillOpacity="0.3" transform="rotate(216 20 40)" />
      <ellipse className="bloom-petal" cx="16" cy="24" rx="7" ry="10" fill="#D4848B" fillOpacity="0.3" transform="rotate(288 16 24)" />
      {/* Center */}
      <circle className="bloom-center" cx="30" cy="30" r="5" fill="#C5A55A" fillOpacity="0.5" />
    </svg>
  );
}

/** Bible verse decorative frame */
function BibleVerseFrame({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`relative rounded-2xl border border-[#4A7C59]/20 bg-[#F5F8F0]/70 p-8 backdrop-blur-sm ${className}`}
    >
      {/* Corner leaf decorations */}
      <svg viewBox="0 0 40 40" className="absolute top-2 left-2 h-7 w-7" fill="none">
        <path d="M35,5 Q15,5 5,15 Q5,25 15,20 Q25,15 35,5" fill="#4A7C59" fillOpacity="0.15" />
        <path d="M30,10 Q18,10 10,18 Q12,24 18,18 Q24,14 30,10" fill="#4A7C59" fillOpacity="0.1" />
      </svg>
      <svg viewBox="0 0 40 40" className="absolute right-2 bottom-2 h-7 w-7 rotate-180" fill="none">
        <path d="M35,5 Q15,5 5,15 Q5,25 15,20 Q25,15 35,5" fill="#4A7C59" fillOpacity="0.15" />
        <path d="M30,10 Q18,10 10,18 Q12,24 18,18 Q24,14 30,10" fill="#4A7C59" fillOpacity="0.1" />
      </svg>
      <svg viewBox="0 0 40 40" className="absolute top-2 right-2 h-7 w-7" fill="none" style={{ transform: "scaleX(-1)" }}>
        <path d="M35,5 Q15,5 5,15 Q5,25 15,20 Q25,15 35,5" fill="#4A7C59" fillOpacity="0.15" />
      </svg>
      <svg viewBox="0 0 40 40" className="absolute bottom-2 left-2 h-7 w-7" fill="none" style={{ transform: "scaleY(-1)" }}>
        <path d="M35,5 Q15,5 5,15 Q5,25 15,20 Q25,15 35,5" fill="#4A7C59" fillOpacity="0.15" />
      </svg>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Garden Event Card with vine stroke                                */
/* ------------------------------------------------------------------ */

function GardenEventCard({
  event,
  index,
}: {
  event: { name: string; date: string; venue: string; time: string };
  index: number;
}) {
  const isEven = index % 2 === 0;
  const icons = ["🌸", "🕊️", "💒", "🌿"];
  const icon = icons[index % icons.length];

  return (
    <div
      className={`vine-card relative flex items-stretch gap-0 ${
        isEven ? "flex-row" : "flex-row-reverse"
      }`}
    >
      {/* Vine decoration on side */}
      <div className="flex w-8 shrink-0 items-center justify-center">
        <CardVine className="h-full w-full" />
      </div>

      {/* Card content */}
      <div className="vine-card-content min-w-0 flex-1">
        <div className="relative overflow-hidden rounded-2xl border border-[#4A7C59]/15 bg-white/75 p-6 shadow-md backdrop-blur-sm transition-shadow duration-300 hover:shadow-lg">
          {/* Top accent bar */}
          <div className="pointer-events-none absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#4A7C59]/30 to-transparent" />

          {/* Event icon */}
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#4A7C59]/20 bg-[#F5F8F0]">
              <span className="text-xl">{icon}</span>
            </div>
          </div>

          {/* Event name */}
          <h3 className="mb-3 text-center text-xl font-semibold tracking-wide text-[#2D3B2D]">
            {event.name}
          </h3>

          {/* Thin divider */}
          <div className="mx-auto mb-3 h-px w-16 bg-gradient-to-r from-transparent via-[#D4848B]/50 to-transparent" />

          {/* Details */}
          <div className="space-y-2.5 text-sm text-[#5A6A5A]">
            <div className="flex items-center justify-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-[#4A7C59]" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-3.5 w-3.5 text-[#4A7C59]" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-[#4A7C59]" />
              <span className="text-center">{event.venue}</span>
            </div>
          </div>

          {/* Bottom leaf wave */}
          <svg viewBox="0 0 200 20" preserveAspectRatio="none" className="mt-5 h-3 w-full opacity-15">
            <path
              d="M0,10 Q25,3 50,10 Q75,17 100,10 Q125,3 150,10 Q175,17 200,10"
              fill="none"
              stroke="#4A7C59"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Connecting vine line between event cards                          */
/* ------------------------------------------------------------------ */

function ConnectingVine() {
  return (
    <div className="flex justify-center py-1">
      <svg viewBox="0 0 4 40" className="h-10 w-1" fill="none">
        <path d="M2,0 Q0,10 2,20 Q4,30 2,40" stroke="#4A7C59" strokeWidth="1" opacity="0.25" />
        <circle cx="2" cy="20" r="1.5" fill="#D4848B" fillOpacity="0.3" />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Template Component                                                */
/* ------------------------------------------------------------------ */

export default function GardenBlessingTemplate({ invite, isDemo }: TemplateProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const { isPlaying, toggle } = useMusicPlayer(invite.musicUrl);
  const countdown = useCountdown(invite.weddingDate);

  useLenis();

  /* ---- Default multi-event list ---- */
  const events = invite.events ?? [
    {
      name: "Bridal Shower",
      date: "Date TBA",
      venue: invite.venue ?? "Venue TBA",
      time: invite.weddingTime ?? "2 PM",
    },
    {
      name: "Rehearsal Dinner",
      date: "Date TBA",
      venue: invite.venue ?? "Venue TBA",
      time: invite.weddingTime ?? "6 PM",
    },
    {
      name: "Garden Ceremony",
      date: invite.weddingDate ?? "Date TBA",
      venue: invite.venue ?? "Venue TBA",
      time: invite.weddingTime ?? "11 AM",
    },
    {
      name: "Reception",
      date: invite.receptionDate ?? "Date TBA",
      venue: invite.venue ?? "Venue TBA",
      time: invite.weddingTime ?? "4 PM",
    },
  ];

  /* ---- Extra data ---- */
  const thingsToKnow =
    (invite.extraData?.thingsToKnow as
      | { label: string; detail: string }[]
      | undefined) ?? [];
  const hashtag = (invite.extraData?.hashtag as string | undefined) ?? null;

  /* ---- Share handler ---- */
  async function handleShare() {
    const url = `${window.location.origin}/wedding/${invite.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${invite.groomName} & ${invite.brideName} - Wedding`,
          url,
        });
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
      /* ---------------------------------------------------------- */
      /*  HERO: Butterfly flutter from edges                        */
      /* ---------------------------------------------------------- */
      gsap.utils.toArray<HTMLElement>(".butterfly-enter").forEach((el, i) => {
        // Each butterfly starts off-screen at a different edge position
        const startPositions = [
          { x: -120, y: -80 },
          { x: 150, y: -100 },
          { x: -160, y: 60 },
          { x: 180, y: 40 },
          { x: -100, y: -50 },
          { x: 130, y: -70 },
        ];
        const pos = startPositions[i % startPositions.length]!;

        // Flutter in along a curved path
        const tl = gsap.timeline({ delay: 0.5 + i * 0.3 });
        tl.fromTo(
          el,
          {
            x: pos.x,
            y: pos.y,
            opacity: 0,
            scale: 0.3,
            rotation: pos.x < 0 ? -25 : 25,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.5,
            ease: "power2.out",
          },
        );

        // After landing, gentle bob
        tl.to(el, {
          y: "-=8",
          rotation: 5,
          duration: 2.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      /* ---------------------------------------------------------- */
      /*  EVENT CARDS: Vine stroke draws up + content slides in     */
      /* ---------------------------------------------------------- */
      gsap.utils.toArray<HTMLElement>(".vine-card").forEach((el, i) => {
        const vinePath = el.querySelector(".vine-stroke");
        const leaves = el.querySelectorAll(".vine-leaf");
        const content = el.querySelector(".vine-card-content");
        const isEven = i % 2 === 0;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          delay: i * 0.25,
        });

        // Draw vine stroke upward
        if (vinePath) {
          tl.to(
            vinePath,
            {
              strokeDashoffset: 0,
              duration: 1,
              ease: "power2.inOut",
            },
            0,
          );
        }

        // Fade in leaves along the vine
        if (leaves.length > 0) {
          tl.to(
            leaves,
            {
              fillOpacity: 0.2,
              duration: 0.4,
              stagger: 0.08,
              ease: "power1.out",
            },
            0.3,
          );
        }

        // Slide card content in from the side
        if (content) {
          tl.fromTo(
            content,
            {
              opacity: 0,
              x: isEven ? 40 : -40,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power2.out",
            },
            0.2,
          );
        }
      });

      /* ---------------------------------------------------------- */
      /*  AMBIENT: Growing vine borders scrubbed to scroll          */
      /* ---------------------------------------------------------- */
      gsap.utils.toArray<HTMLElement>(".growing-vine-stroke").forEach((el) => {
        gsap.to(el, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
          },
        });
      });

      /* ---------------------------------------------------------- */
      /*  COUNTDOWN: Flower bloom + number fade in                  */
      /* ---------------------------------------------------------- */
      gsap.utils.toArray<HTMLElement>(".garden-countdown").forEach((el, i) => {
        const petals = el.querySelectorAll(".bloom-petal");
        const center = el.querySelector(".bloom-center");
        const numberEl = el.querySelector(".countdown-number");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          delay: i * 0.15,
        });

        // Bloom petals outward
        if (petals.length > 0) {
          tl.fromTo(
            petals,
            { scale: 0, transformOrigin: "center center" },
            {
              scale: 1,
              duration: 0.6,
              stagger: 0.08,
              ease: "back.out(1.4)",
            },
            0,
          );
        }

        // Center appears
        if (center) {
          tl.fromTo(
            center,
            { scale: 0 },
            { scale: 1, duration: 0.3, ease: "back.out(2)" },
            0.3,
          );
        }

        // Number fades in after bloom
        if (numberEl) {
          tl.fromTo(
            numberEl,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            0.5,
          );
        }
      });

      /* ---------------------------------------------------------- */
      /*  SECTION TRANSITIONS: garden-reveal grow-up                */
      /* ---------------------------------------------------------- */
      gsap.utils.toArray<HTMLElement>(".garden-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          {
            scaleY: 0,
            opacity: 0,
            transformOrigin: "bottom center",
          },
          {
            scaleY: 1,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      /* ---------------------------------------------------------- */
      /*  GENERIC: scroll-fade elements                             */
      /* ---------------------------------------------------------- */
      gsap.utils.toArray<HTMLElement>(".scroll-fade").forEach((el) => {
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

      /* ---------------------------------------------------------- */
      /*  Hero parallax                                              */
      /* ---------------------------------------------------------- */
      const heroBg = containerRef.current?.querySelector(".hero-bg");
      if (heroBg) {
        gsap.to(heroBg, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: heroBg,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
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
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#F5F8F0] via-[#FAFFF5] to-[#F5F8F0]"
      style={{ fontFamily: "'Georgia', 'Garamond', 'Times New Roman', serif" }}
    >
      {/* Petal particles */}
      <ParticleLayer type="PETAL" intensity="low" />

      {/* Subtle botanical pattern overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%234A7C59' stroke-width='0.5'%3E%3Cellipse cx='50' cy='25' rx='14' ry='7' transform='rotate(-30 50 25)'/%3E%3Cellipse cx='75' cy='60' rx='12' ry='6' transform='rotate(20 75 60)'/%3E%3Cellipse cx='25' cy='75' rx='13' ry='6' transform='rotate(-15 25 75)'/%3E%3Ccircle cx='50' cy='50' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* Growing vine borders (desktop only, scroll-linked) */}
      <GrowingPageVine side="left" />
      <GrowingPageVine side="right" />

      {/* Music toggle */}
      {invite.musicUrl && (
        <MusicToggleButton
          isPlaying={isPlaying}
          onToggle={toggle}
          className="fixed top-4 right-4 z-50 rounded-full border border-[#4A7C59]/25 bg-white/85 p-3 text-[#2D3B2D] shadow-lg backdrop-blur-sm transition-colors hover:bg-white"
        />
      )}

      {/* Demo banner */}
      {isDemo && (
        <div className="relative z-30 bg-[#4A7C59] py-2 text-center text-sm font-medium text-white">
          This is a demo preview. Complete payment to use your own details.
        </div>
      )}

      {/* ============================================================ */}
      {/*  SECTION 1 -- Hero with Butterfly Flutter                    */}
      {/* ============================================================ */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
        {/* Background -- hero image or soft green gradient */}
        <div className="hero-bg absolute inset-0 z-0">
          {invite.heroImage ? (
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${invite.heroImage})` }}
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-b from-[#E8F0E0] via-[#F5F8F0]/80 to-[#FAFFF5]/60" />
          )}
          <div className="absolute inset-0 bg-[#F5F8F0]/35" />
        </div>

        {/* Butterflies that flutter in from edges */}
        <div className="pointer-events-none absolute inset-0 z-[5]">
          {[
            { left: "8%", top: "18%" },
            { left: "85%", top: "15%" },
            { left: "5%", top: "55%" },
            { left: "90%", top: "50%" },
            { left: "20%", top: "75%" },
            { left: "78%", top: "72%" },
          ].map((pos, i) => (
            <div
              key={i}
              className="butterfly-enter absolute"
              style={{
                left: pos.left,
                top: pos.top,
              }}
            >
              <ButterflyIcon className="h-8 w-8 opacity-50 sm:h-10 sm:w-10" />
            </div>
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-xl">
          {/* Garden Gate Arch */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <GardenGate className="mb-0 h-44 w-60 sm:h-52 sm:w-72" />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mb-2 text-sm tracking-[0.3em] text-[#4A7C59]/70 uppercase"
          >
            A Garden Blessing
          </motion.p>

          {/* Vine border */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <VineBorder className="mb-6" />
          </motion.div>

          {/* Parent blessings */}
          {(groomParents ?? brideParents) && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="mb-1 text-xs tracking-[0.2em] text-[#5A6A5A]/60 uppercase"
            >
              Together with their families
            </motion.p>
          )}
          {groomParents && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="mb-0.5 text-sm text-[#5A6A5A]/50"
            >
              {groomParents}
            </motion.p>
          )}
          {brideParents && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.6 }}
              className="mb-5 text-sm text-[#5A6A5A]/50"
            >
              {brideParents}
            </motion.p>
          )}

          {/* Groom name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.9 }}
            className="text-5xl leading-tight font-light tracking-wide text-[#2D3B2D] sm:text-7xl"
          >
            {invite.groomName}
          </motion.h1>

          {/* Heart + lines */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="my-4 flex items-center justify-center gap-4"
          >
            <div className="h-px w-16 bg-[#D4848B]/50" />
            <FloralCross className="h-8 w-8" />
            <div className="h-px w-16 bg-[#D4848B]/50" />
          </motion.div>

          {/* Bride name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.9 }}
            className="text-5xl leading-tight font-light tracking-wide text-[#2D3B2D] sm:text-7xl"
          >
            {invite.brideName}
          </motion.h1>

          {/* Date */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-7 text-base tracking-wider text-[#5A6A5A]/70"
          >
            {formatWeddingDate(invite.weddingDate)}
          </motion.p>

          {/* Venue teaser */}
          {invite.venue && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.35 }}
              className="mt-2 flex items-center justify-center gap-2 text-sm text-[#5A6A5A]/50"
            >
              <MapPin className="h-4 w-4" /> {invite.venue}
            </motion.p>
          )}

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="mt-14"
          >
            <span className="animate-bounce inline-block text-[#4A7C59]/35">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </span>
          </motion.div>
        </div>
      </section>

      {/* Vine divider */}
      <div className="garden-reveal flex justify-center py-6">
        <VineBorder />
      </div>

      {/* ============================================================ */}
      {/*  SECTION 2 -- Events with Alternating Layout + Vine Draw     */}
      {/* ============================================================ */}
      <section className="relative z-10 px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="scroll-fade mb-12 text-center">
            <FloralCross className="mx-auto mb-3 h-12 w-12" />
            <h2 className="text-3xl font-light tracking-wide text-[#2D3B2D] sm:text-4xl">
              Wedding Celebrations
            </h2>
            <p className="mt-2 text-sm text-[#5A6A5A]/60">
              Join us for each blessed moment
            </p>
          </div>

          <div className="space-y-0">
            {events.map((event, idx) => (
              <div key={idx}>
                <GardenEventCard event={event} index={idx} />
                {idx < events.length - 1 && <ConnectingVine />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vine divider */}
      <div className="garden-reveal flex justify-center py-6">
        <VineBorder />
      </div>

      {/* ============================================================ */}
      {/*  SECTION 3 -- Couple Photo                                   */}
      {/* ============================================================ */}
      {invite.couplePhoto && (
        <section className="relative z-10 bg-[#EDF5E6]/40 px-4 py-20">
          <div className="scroll-fade mx-auto max-w-lg text-center">
            <div className="relative mx-auto mb-8 h-80 w-80 overflow-hidden rounded-full shadow-2xl ring-4 ring-[#4A7C59]/15 ring-offset-4 ring-offset-[#F5F8F0] sm:h-96 sm:w-96">
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${invite.couplePhoto})` }}
              />
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-14 bg-[#D4848B]/40" />
              <Heart className="h-4 w-4 text-[#D4848B]" fill="#D4848B" />
              <div className="h-px w-14 bg-[#D4848B]/40" />
            </div>
            <p className="mt-4 text-lg font-light tracking-wide text-[#2D3B2D]/60">
              {invite.groomName} & {invite.brideName}
            </p>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/*  SECTION 4 -- Gallery (3-column with leaf borders)           */}
      {/* ============================================================ */}
      {invite.galleryImages.length > 0 && (
        <section className="relative z-10 px-4 py-16">
          <div className="mx-auto max-w-3xl">
            <div className="scroll-fade mb-10 text-center">
              <h2 className="text-3xl font-light tracking-wide text-[#2D3B2D] sm:text-4xl">
                Our Garden of Memories
              </h2>
              <div className="garden-reveal mt-4 flex justify-center">
                <VineBorder />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {invite.galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  className="garden-reveal group relative aspect-square overflow-hidden rounded-2xl shadow-md"
                >
                  {/* Leaf corner decorations */}
                  <svg
                    viewBox="0 0 30 30"
                    className="absolute top-1 left-1 z-10 h-5 w-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    fill="none"
                  >
                    <path
                      d="M25,3 Q10,3 3,10 Q3,18 10,14 Q18,10 25,3"
                      fill="#4A7C59"
                      fillOpacity="0.3"
                    />
                  </svg>
                  <svg
                    viewBox="0 0 30 30"
                    className="absolute right-1 bottom-1 z-10 h-5 w-5 rotate-180 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    fill="none"
                  >
                    <path
                      d="M25,3 Q10,3 3,10 Q3,18 10,14 Q18,10 25,3"
                      fill="#4A7C59"
                      fillOpacity="0.3"
                    />
                  </svg>
                  <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${img})` }}
                  />
                  {/* Subtle border overlay */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-[#4A7C59]/10" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Vine divider */}
      <div className="garden-reveal flex justify-center py-6">
        <VineBorder />
      </div>

      {/* ============================================================ */}
      {/*  SECTION 5 -- Things to Know                                 */}
      {/* ============================================================ */}
      {thingsToKnow.length > 0 && (
        <section className="relative z-10 bg-[#EDF5E6]/30 px-4 py-16">
          <div className="mx-auto max-w-3xl">
            <div className="scroll-fade mb-10 text-center">
              <ButterflyIcon className="mx-auto mb-3 h-10 w-10 opacity-50" />
              <h2 className="text-3xl font-light tracking-wide text-[#2D3B2D] sm:text-4xl">
                Things to Know
              </h2>
              <div className="garden-reveal mt-4 flex justify-center">
                <VineBorder />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {thingsToKnow.map((item, idx) => (
                <div
                  key={idx}
                  className="garden-reveal rounded-2xl border border-[#4A7C59]/12 bg-white/65 p-6 shadow-sm backdrop-blur-sm"
                >
                  <h4 className="mb-2 text-base font-semibold text-[#2D3B2D]">
                    {item.label}
                  </h4>
                  <p className="text-sm leading-relaxed text-[#5A6A5A]/70">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/*  SECTION 6 -- Our Story                                      */}
      {/* ============================================================ */}
      {invite.story && (
        <section className="relative z-10 px-4 py-16">
          <div className="mx-auto max-w-2xl">
            <BibleVerseFrame className="scroll-fade text-center">
              <FloralCross className="mx-auto mb-4 h-10 w-10" />
              <h2 className="mb-5 text-2xl font-light tracking-wide text-[#2D3B2D] sm:text-3xl">
                Our Story
              </h2>
              <VineBorder className="mb-5" />
              <p className="leading-relaxed text-[#5A6A5A]/80">
                {invite.story}
              </p>
            </BibleVerseFrame>
          </div>
        </section>
      )}

      {/* Vine divider */}
      <div className="garden-reveal flex justify-center py-6">
        <VineBorder />
      </div>

      {/* ============================================================ */}
      {/*  SECTION 7 -- Countdown with Flower Bloom                    */}
      {/* ============================================================ */}
      <section className="relative z-10 overflow-hidden bg-gradient-to-br from-[#2D3B2D] via-[#3A5035] to-[#2D3B2D] px-4 py-20">
        {/* Subtle leaf overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='30' cy='30' rx='15' ry='7' fill='none' stroke='white' stroke-width='0.5' transform='rotate(-30 30 30)'/%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="scroll-fade relative mx-auto max-w-xl text-center">
          <h2 className="mb-2 text-3xl font-light tracking-wide text-[#F5F8F0] sm:text-4xl">
            Counting the Days
          </h2>
          <p className="mb-10 text-sm text-[#F5F8F0]/45">
            Until our garden blooms
          </p>

          <div className="grid grid-cols-4 gap-4 sm:gap-6">
            {(
              [
                { label: "Days", value: countdown.days },
                { label: "Hours", value: countdown.hours },
                { label: "Minutes", value: countdown.minutes },
                { label: "Seconds", value: countdown.seconds },
              ] as const
            ).map((unit) => (
              <div
                key={unit.label}
                className="garden-countdown relative flex flex-col items-center"
              >
                {/* Bloom flower behind the box */}
                <div className="pointer-events-none absolute -top-3 left-1/2 z-0 -translate-x-1/2">
                  <BloomFlower className="h-24 w-24 sm:h-28 sm:w-28" />
                </div>

                {/* Countdown box */}
                <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl border border-[#4A7C59]/25 bg-[#3A5035]/60 shadow-lg backdrop-blur-sm sm:h-24 sm:w-24">
                  <span className="countdown-number text-3xl font-light text-[#F5F8F0] sm:text-4xl">
                    {String(unit.value).padStart(2, "0")}
                  </span>
                </div>
                <span className="mt-3 text-xs tracking-[0.15em] text-[#F5F8F0]/45 uppercase">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 8 -- Couple Message                                 */}
      {/* ============================================================ */}
      {(invite.coupleMessage ?? invite.story) && (
        <section className="relative z-10 bg-gradient-to-b from-[#2D3B2D] to-[#3A5035] px-4 py-16">
          <div className="scroll-fade mx-auto max-w-2xl text-center">
            <ButterflyIcon className="mx-auto mb-4 h-9 w-9 opacity-35" />
            <h2 className="mb-6 text-3xl font-light tracking-wide text-[#F5F8F0] sm:text-4xl">
              A Message From Us
            </h2>
            <p className="text-base leading-relaxed text-[#F5F8F0]/70 italic">
              &ldquo;{invite.coupleMessage ?? invite.story}&rdquo;
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-[#D4848B]/35" />
              <Heart className="h-4 w-4 text-[#D4848B]" fill="#D4848B" />
              <div className="h-px w-16 bg-[#D4848B]/35" />
            </div>
            <p className="mt-4 text-sm font-light tracking-wider text-[#F5F8F0]/45">
              With love, {invite.groomName} & {invite.brideName}
            </p>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/*  SECTION 9 -- RSVP + Share                                   */}
      {/* ============================================================ */}
      <section className="relative z-10 bg-[#EDF5E6]/50 px-4 py-16">
        <div className="scroll-fade mx-auto flex max-w-md flex-col items-center gap-5 text-center">
          <FloralCross className="h-10 w-10" />
          <h2 className="text-3xl font-light tracking-wide text-[#2D3B2D] sm:text-4xl">
            Will You Join Us?
          </h2>
          <p className="text-sm text-[#5A6A5A]/60">
            We would be honoured to have you celebrate with us in the garden
          </p>

          {hashtag && (
            <p className="text-lg font-light tracking-wide text-[#4A7C59]/70 italic">
              {hashtag}
            </p>
          )}

          <Button
            size="lg"
            className="w-full max-w-xs bg-[#4A7C59] text-white shadow-md hover:bg-[#4A7C59]/90"
            onClick={() => setRsvpOpen(true)}
          >
            RSVP Now
          </Button>

          <div className="flex w-full max-w-xs gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 border-[#4A7C59]/25 text-[#2D3B2D] hover:bg-[#4A7C59]/8"
              onClick={() => void handleShare()}
            >
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-[#4A7C59]/25 text-[#2D3B2D] hover:bg-[#4A7C59]/8"
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
      </section>

      {/* ============================================================ */}
      {/*  SECTION 10 -- Footer + Watermark                            */}
      {/* ============================================================ */}
      <footer className="relative z-10 overflow-hidden bg-[#F5F8F0] px-4 py-12">
        {/* Subtle leaf dots */}
        <div className="pointer-events-none absolute inset-0 opacity-10">
          {Array.from({ length: 35 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[#4A7C59]"
              style={{
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative text-center">
          <GardenGate className="mx-auto mb-4 h-20 w-28 opacity-25" />
          <p className="text-sm text-[#2D3B2D]/50">
            {invite.groomName} & {invite.brideName}
          </p>
          <p className="mt-1 text-xs text-[#2D3B2D]/35">
            {formatWeddingDate(invite.weddingDate)}
          </p>

          <VineBorder className="my-4 opacity-40" />

          <p className="text-xs text-[#5A6A5A]/35 italic">
            Love is patient, love is kind - 1 Corinthians 13:4
          </p>

          <CardoraWatermark className="mt-8 pb-2 text-center text-xs text-[#2D3B2D]/25" />
        </div>
      </footer>

      {/* RSVP Modal */}
      <RsvpModal
        open={rsvpOpen}
        onOpenChange={setRsvpOpen}
        inviteSlug={invite.slug}
      />
    </div>
  );
}
