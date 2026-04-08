"use client";

import { useRef, useState, useCallback } from "react";
import { useTemplateMusic } from "@/hooks/use-template-music";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
/* Image import kept for gallery photos */
import { ArrowLeft, MapPin, Calendar, Clock, Heart, ChevronDown, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { platform } from "@/lib/platform";

/* ================================================================== */
/*  CSS for shimmer + floating animations (injected once)             */
/* ================================================================== */

const INJECTED_CSS = `
@keyframes maharani-float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(2deg); }
}
@keyframes maharani-drift {
  0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(calc(100vh + 40px)) translateX(30px) rotate(45deg); opacity: 0; }
}
@keyframes maharani-shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes maharani-glow-pulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}
@keyframes maharani-elephant-walk {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(8px); }
}
@keyframes maharani-envelope-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(180,150,10,0.08); }
  50% { box-shadow: 0 0 40px rgba(180,150,10,0.15); }
}
@keyframes maharani-bride-sway {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(0.8deg); }
}
@keyframes maharani-groom-sway {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(-0.6deg); }
}
@keyframes maharani-dupatta-flow {
  0%, 100% { d: path("M130 58 Q155 50 162 88 Q152 75 130 68"); }
  50% { d: path("M130 58 Q160 48 168 85 Q155 72 130 68"); }
}
@keyframes maharani-varmala-sway {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(2px); }
}
@keyframes maharani-sparkle {
  0%, 100% { opacity: 0; transform: scale(0.5); }
  50% { opacity: 1; transform: scale(1); }
}
.maharani-shimmer-text {
  background: linear-gradient(90deg, #9A7A1A 0%, #C8A830 30%, #9A7A1A 50%, #C8A830 70%, #9A7A1A 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: maharani-shimmer 12s linear infinite;
}
.maharani-shimmer-line {
  background: linear-gradient(90deg, transparent 0%, #9A7A1A 30%, #C8A830 50%, #9A7A1A 70%, transparent 100%);
  background-size: 200% 100%;
  animation: maharani-shimmer 10s ease-in-out infinite;
}
`;

/* ================================================================== */
/*  Floating petals system                                            */
/* ================================================================== */

const PETAL_CONFIGS = [
  { delay: 0, duration: 12, left: 8, size: 12, color: "#FF9BAA" },
  { delay: 2, duration: 15, left: 22, size: 10, color: "#FFB0A0" },
  { delay: 4, duration: 11, left: 45, size: 14, color: "#FFCCC0" },
  { delay: 1, duration: 14, left: 65, size: 11, color: "#FF9BAA" },
  { delay: 3, duration: 13, left: 80, size: 9, color: "#FFB347" },
  { delay: 5, duration: 16, left: 35, size: 10, color: "#E88090" },
  { delay: 7, duration: 12, left: 92, size: 12, color: "#FFCCC0" },
  { delay: 6, duration: 14, left: 55, size: 8, color: "#FF9BAA" },
];

function FloatingPetals() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[90] overflow-hidden">
      {PETAL_CONFIGS.map((p, i) => (
        <div
          key={i}
          className="absolute -top-5"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.3,
            animation: `maharani-drift ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        >
          <svg viewBox="0 0 12 16" width={p.size} height={p.size * 1.3}>
            <path d="M6 0 Q10 4 10 10 Q8 14 6 16 Q4 14 2 10 Q2 4 6 0Z" fill={p.color} fillOpacity="0.5" />
          </svg>
        </div>
      ))}
    </div>
  );
}

/* ================================================================== */
/*  Sparkle particles                                                 */
/* ================================================================== */

function SparkleField() {
  const sparkles = [
    { l: 10, t: 15, d: 3, s: 0 }, { l: 30, t: 25, d: 4, s: 1 },
    { l: 55, t: 10, d: 3.5, s: 0.5 }, { l: 75, t: 20, d: 3, s: 1.5 },
    { l: 90, t: 30, d: 4.5, s: 2 }, { l: 20, t: 70, d: 3, s: 0.8 },
    { l: 45, t: 80, d: 4, s: 1.2 }, { l: 70, t: 75, d: 3.5, s: 0.3 },
    { l: 85, t: 60, d: 3, s: 1.8 }, { l: 15, t: 50, d: 4, s: 2.5 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 z-[5]">
      {sparkles.map((s, i) => (
        <div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-[#D4AF37]"
          style={{
            left: `${s.l}%`,
            top: `${s.t}%`,
            animation: `maharani-sparkle ${s.d}s ease-in-out ${s.s}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ================================================================== */
/*  SVG: Floral arch with chandeliers                                 */
/* ================================================================== */

function FloralArch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 340" preserveAspectRatio="xMidYMid meet" className={className} fill="none">
      {/* Arch structure */}
      <path d="M28 330 L28 130 Q28 38 200 18 Q372 38 372 130 L372 330" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.22" />
      <path d="M42 330 L42 135 Q42 52 200 32 Q358 52 358 135 L358 330" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.14" />
      {/* Dome finial */}
      <circle cx="200" cy="14" r="5" fill="#D4AF37" fillOpacity="0.18" />
      <path d="M196 16 L200 4 L204 16" fill="#D4AF37" fillOpacity="0.14" />

      {/* ── TOP FLORAL CROWN — large, lush ── */}
      {/* Center rose cluster */}
      <circle cx="200" cy="28" r="16" fill="#E88090" fillOpacity="0.35" />
      <circle cx="200" cy="28" r="10" fill="#FF9BAA" fillOpacity="0.25" />
      <circle cx="200" cy="28" r="5" fill="#FFCCC0" fillOpacity="0.20" />
      {/* Left blooms */}
      <circle cx="180" cy="36" r="12" fill="#FFB0A0" fillOpacity="0.30" />
      <circle cx="180" cy="36" r="7" fill="#FFC8B8" fillOpacity="0.20" />
      <circle cx="165" cy="44" r="10" fill="#FF8C6A" fillOpacity="0.25" />
      <circle cx="165" cy="44" r="5" fill="#FFCBA4" fillOpacity="0.18" />
      <circle cx="152" cy="52" r="7" fill="#E88090" fillOpacity="0.20" />
      {/* Right blooms */}
      <circle cx="220" cy="36" r="12" fill="#FF8C6A" fillOpacity="0.28" />
      <circle cx="220" cy="36" r="7" fill="#FFD0B0" fillOpacity="0.20" />
      <circle cx="235" cy="44" r="10" fill="#E88090" fillOpacity="0.25" />
      <circle cx="235" cy="44" r="5" fill="#FFCCC0" fillOpacity="0.18" />
      <circle cx="248" cy="52" r="7" fill="#FFB0A0" fillOpacity="0.20" />
      {/* Small ivory buds */}
      <circle cx="190" cy="20" r="4" fill="#FFF5EA" fillOpacity="0.30" />
      <circle cx="210" cy="20" r="3.5" fill="#FFF0E0" fillOpacity="0.28" />
      <circle cx="170" cy="30" r="3" fill="#FFF5EA" fillOpacity="0.22" />
      <circle cx="230" cy="30" r="3" fill="#FFF0E0" fillOpacity="0.22" />
      {/* Leaves radiating from top */}
      <path d="M142 56 Q132 48 145 42 Q148 50 142 56Z" fill="#5A8A50" fillOpacity="0.25" />
      <path d="M258 56 Q268 48 255 42 Q252 50 258 56Z" fill="#5A8A50" fillOpacity="0.25" />
      <path d="M168 26 Q158 20 170 16 Q172 24 168 26Z" fill="#6B9A5E" fillOpacity="0.18" />
      <path d="M232 26 Q242 20 230 16 Q228 24 232 26Z" fill="#6B9A5E" fillOpacity="0.18" />
      <path d="M148 40 Q138 34 150 30 Q152 38 148 40Z" fill="#5A8A50" fillOpacity="0.15" />
      <path d="M252 40 Q262 34 250 30 Q248 38 252 40Z" fill="#5A8A50" fillOpacity="0.15" />

      {/* ── LEFT SIDE FLORALS — cascading down the arch ── */}
      <circle cx="48" cy="90" r="12" fill="#E88090" fillOpacity="0.28" />
      <circle cx="48" cy="90" r="7" fill="#FF9BAA" fillOpacity="0.18" />
      <circle cx="38" cy="105" r="9" fill="#FFB0A0" fillOpacity="0.22" />
      <circle cx="55" cy="108" r="7" fill="#FFCCC0" fillOpacity="0.18" />
      <circle cx="32" cy="125" r="6" fill="#FF8C6A" fillOpacity="0.15" />
      <circle cx="42" cy="140" r="5" fill="#FFF5EA" fillOpacity="0.18" />
      <circle cx="35" cy="160" r="6" fill="#E88090" fillOpacity="0.12" />
      <circle cx="38" cy="180" r="4" fill="#FFCCC0" fillOpacity="0.10" />
      <circle cx="32" cy="200" r="5" fill="#FFB0A0" fillOpacity="0.08" />
      {/* Left leaves */}
      <path d="M62 85 Q72 78 68 95 Q60 90 62 85Z" fill="#5A8A50" fillOpacity="0.20" />
      <path d="M28 118 Q18 112 30 106 Q34 114 28 118Z" fill="#6B9A5E" fillOpacity="0.15" />
      <path d="M50 130 Q58 122 60 138 Q52 134 50 130Z" fill="#5A8A50" fillOpacity="0.12" />

      {/* ── RIGHT SIDE FLORALS — cascading ── */}
      <circle cx="352" cy="90" r="12" fill="#FF8C6A" fillOpacity="0.28" />
      <circle cx="352" cy="90" r="7" fill="#FFD0B0" fillOpacity="0.18" />
      <circle cx="362" cy="105" r="9" fill="#E88090" fillOpacity="0.22" />
      <circle cx="345" cy="108" r="7" fill="#FFCCC0" fillOpacity="0.18" />
      <circle cx="368" cy="125" r="6" fill="#FFB0A0" fillOpacity="0.15" />
      <circle cx="358" cy="140" r="5" fill="#FFF5EA" fillOpacity="0.18" />
      <circle cx="365" cy="160" r="6" fill="#FF8C6A" fillOpacity="0.12" />
      <circle cx="362" cy="180" r="4" fill="#E88090" fillOpacity="0.10" />
      <circle cx="368" cy="200" r="5" fill="#FFCCC0" fillOpacity="0.08" />
      {/* Right leaves */}
      <path d="M338 85 Q328 78 332 95 Q340 90 338 85Z" fill="#5A8A50" fillOpacity="0.20" />
      <path d="M372 118 Q382 112 370 106 Q366 114 372 118Z" fill="#6B9A5E" fillOpacity="0.15" />

      {/* ── CHANDELIERS — elaborate, with glow ── */}
      {/* Left chandelier */}
      <line x1="110" y1="48" x2="110" y2="78" stroke="#D4AF37" strokeWidth="0.6" strokeOpacity="0.25" />
      <path d="M96 82 Q96 75 110 75 Q124 75 124 82 L120 96 Q110 102 100 96Z" fill="#D4AF37" fillOpacity="0.10" stroke="#D4AF37" strokeWidth="0.4" strokeOpacity="0.18" />
      {/* Chandelier drops */}
      <line x1="102" y1="96" x2="102" y2="104" stroke="#D4AF37" strokeWidth="0.3" strokeOpacity="0.15" />
      <circle cx="102" cy="105" r="1.5" fill="#FFD700" fillOpacity="0.20" />
      <line x1="110" y1="100" x2="110" y2="108" stroke="#D4AF37" strokeWidth="0.3" strokeOpacity="0.15" />
      <circle cx="110" cy="109" r="1.5" fill="#FFD700" fillOpacity="0.20" />
      <line x1="118" y1="96" x2="118" y2="104" stroke="#D4AF37" strokeWidth="0.3" strokeOpacity="0.15" />
      <circle cx="118" cy="105" r="1.5" fill="#FFD700" fillOpacity="0.20" />
      {/* Center glow */}
      <circle cx="110" cy="85" r="4" fill="#FFD700" fillOpacity="0.12" />
      <circle cx="110" cy="85" r="10" fill="#FFD700" fillOpacity="0.04" />

      {/* Right chandelier */}
      <line x1="290" y1="48" x2="290" y2="78" stroke="#D4AF37" strokeWidth="0.6" strokeOpacity="0.25" />
      <path d="M276 82 Q276 75 290 75 Q304 75 304 82 L300 96 Q290 102 280 96Z" fill="#D4AF37" fillOpacity="0.10" stroke="#D4AF37" strokeWidth="0.4" strokeOpacity="0.18" />
      <line x1="282" y1="96" x2="282" y2="104" stroke="#D4AF37" strokeWidth="0.3" strokeOpacity="0.15" />
      <circle cx="282" cy="105" r="1.5" fill="#FFD700" fillOpacity="0.20" />
      <line x1="290" y1="100" x2="290" y2="108" stroke="#D4AF37" strokeWidth="0.3" strokeOpacity="0.15" />
      <circle cx="290" cy="109" r="1.5" fill="#FFD700" fillOpacity="0.20" />
      <line x1="298" y1="96" x2="298" y2="104" stroke="#D4AF37" strokeWidth="0.3" strokeOpacity="0.15" />
      <circle cx="298" cy="105" r="1.5" fill="#FFD700" fillOpacity="0.20" />
      <circle cx="290" cy="85" r="4" fill="#FFD700" fillOpacity="0.12" />
      <circle cx="290" cy="85" r="10" fill="#FFD700" fillOpacity="0.04" />

      {/* Center mini chandelier */}
      <line x1="200" y1="42" x2="200" y2="60" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.20" />
      <path d="M190 64 Q190 58 200 58 Q210 58 210 64 L207 72 Q200 76 193 72Z" fill="#D4AF37" fillOpacity="0.08" stroke="#D4AF37" strokeWidth="0.3" strokeOpacity="0.14" />
      <circle cx="200" cy="66" r="2.5" fill="#FFD700" fillOpacity="0.15" />
      <circle cx="200" cy="66" r="8" fill="#FFD700" fillOpacity="0.03" />

      {/* ── HANGING FLORAL STRINGS ── */}
      {/* Left strings */}
      <path d="M70 58 Q72 70 70 82" stroke="#E88090" strokeWidth="0.4" strokeOpacity="0.18" />
      <circle cx="70" cy="68" r="2" fill="#FF9BAA" fillOpacity="0.18" />
      <circle cx="70" cy="78" r="2.5" fill="#FFCCC0" fillOpacity="0.15" />
      <circle cx="70" cy="85" r="2" fill="#FFF5EA" fillOpacity="0.12" />
      <path d="M85" y1="52" x2="85" y2="70" stroke="#FFB0A0" strokeWidth="0.3" strokeOpacity="0.12" />
      {/* Right strings */}
      <path d="M330 58 Q328 70 330 82" stroke="#E88090" strokeWidth="0.4" strokeOpacity="0.18" />
      <circle cx="330" cy="68" r="2" fill="#FFB0A0" fillOpacity="0.18" />
      <circle cx="330" cy="78" r="2.5" fill="#FF9BAA" fillOpacity="0.15" />
      <circle cx="330" cy="85" r="2" fill="#FFF5EA" fillOpacity="0.12" />

      {/* ── BOTTOM CORNER FLORALS ── */}
      <circle cx="32" cy="280" r="8" fill="#E88090" fillOpacity="0.12" />
      <circle cx="40" cy="295" r="6" fill="#FFB0A0" fillOpacity="0.10" />
      <circle cx="25" cy="300" r="5" fill="#FFCCC0" fillOpacity="0.08" />
      <circle cx="368" cy="280" r="8" fill="#FFB0A0" fillOpacity="0.12" />
      <circle cx="360" cy="295" r="6" fill="#E88090" fillOpacity="0.10" />
      <circle cx="375" cy="300" r="5" fill="#FFCCC0" fillOpacity="0.08" />
    </svg>
  );
}

/* ================================================================== */
/*  SVG: Royal couple — detailed, facing each other                   */
/* ================================================================== */

function AnimatedCouple({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 260" className={className}>
      <defs>
        {/* Watercolor-style gradient for groom */}
        <radialGradient id="groomSkin" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#D4A878" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#B88858" stopOpacity="0.6" />
        </radialGradient>
        <radialGradient id="brideSkin" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#D4A878" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#C09060" stopOpacity="0.55" />
        </radialGradient>
        <linearGradient id="groomSherwani" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F8F0E0" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#E8D8C0" stopOpacity="0.70" />
        </linearGradient>
        <linearGradient id="brideLehenga" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C83838" stopOpacity="0.80" />
          <stop offset="50%" stopColor="#A82828" stopOpacity="0.70" />
          <stop offset="100%" stopColor="#882020" stopOpacity="0.60" />
        </linearGradient>
        <linearGradient id="turbanGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D44040" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#A02020" stopOpacity="0.75" />
        </linearGradient>
        {/* Soft shadow filter */}
        <filter id="softShadow" x="-20%" y="-10%" width="140%" height="130%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dy="4" />
          <feComponentTransfer><feFuncA type="linear" slope="0.08" /></feComponentTransfer>
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Ground reflection */}
      <ellipse cx="100" cy="256" rx="65" ry="3" fill="#8B6040" fillOpacity="0.05" />

      {/* ── GROOM ── */}
      <g style={{ animation: "maharani-groom-sway 5s ease-in-out infinite", transformOrigin: "70px 252px" }} filter="url(#softShadow)">
        {/* Sherwani — cream with gold details */}
        <path d="M48 252 L56 92 Q56 75 70 75 Q84 75 84 92 L92 252" fill="url(#groomSherwani)" />
        <path d="M56 92 Q70 85 84 92" fill="#F0E4D0" stroke="#D4AF37" strokeWidth="0.3" strokeOpacity="0.20" />
        {/* Gold details */}
        <line x1="70" y1="92" x2="70" y2="210" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.12" />
        <circle cx="70" cy="110" r="1.8" fill="#D4AF37" fillOpacity="0.30" />
        <circle cx="70" cy="128" r="1.8" fill="#D4AF37" fillOpacity="0.25" />
        <circle cx="70" cy="146" r="1.8" fill="#D4AF37" fillOpacity="0.20" />
        <path d="M61 98 L79 98 L77 120 L63 120Z" fill="#D4AF37" fillOpacity="0.08" />
        {/* Head */}
        <circle cx="70" cy="58" r="17" fill="url(#groomSkin)" />
        {/* Turban */}
        <path d="M53 52 Q70 28 87 52 Q89 62 70 66 Q51 62 53 52Z" fill="url(#turbanGrad)" />
        <path d="M57 48 Q70 34 83 48" fill="#D4AF37" fillOpacity="0.28" />
        {/* Turban ornament */}
        <circle cx="70" cy="40" r="4" fill="#D4AF37" fillOpacity="0.55" />
        <circle cx="70" cy="40" r="2" fill="#FFF0C0" fillOpacity="0.45" />
        {/* Kalgi */}
        <path d="M85 44 Q93 30 91 46" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.35" fill="none" />
      </g>

      {/* ── BRIDE ── */}
      <g style={{ animation: "maharani-bride-sway 5.5s ease-in-out 0.5s infinite", transformOrigin: "130px 252px" }} filter="url(#softShadow)">
        {/* Lehenga */}
        <path d="M106 252 L116 90 Q116 75 130 75 Q144 75 144 90 L156 252 Q130 240 106 252Z" fill="url(#brideLehenga)" />
        {/* Lehenga embroidery — 3 gold borders */}
        <path d="M109 222 Q130 212 153 222" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.25" fill="none" />
        <path d="M111 232 Q130 222 151 232" stroke="#D4AF37" strokeWidth="0.6" strokeOpacity="0.20" fill="none" />
        <path d="M113 242 Q130 233 149 242" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.15" fill="none" />
        {/* Blouse */}
        <path d="M122 82 L138 82 L136 95 L124 95Z" fill="#D4AF37" fillOpacity="0.12" />
        {/* Head */}
        <circle cx="130" cy="58" r="17" fill="url(#brideSkin)" />
        {/* Hair */}
        <path d="M115 52 Q130 38 145 52 Q147 60 130 64 Q113 60 115 52Z" fill="#1A0808" fillOpacity="0.55" />
        {/* Maang tikka */}
        <circle cx="130" cy="42" r="3" fill="#D4AF37" fillOpacity="0.55" />
        <circle cx="130" cy="42" r="1.5" fill="#FFF0C0" fillOpacity="0.40" />
        <line x1="130" y1="39" x2="130" y2="34" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.30" />
        {/* Earrings */}
        <circle cx="113" cy="60" r="2.5" fill="#D4AF37" fillOpacity="0.35" />
        <circle cx="113" cy="65" r="1.5" fill="#D4AF37" fillOpacity="0.25" />
        <circle cx="147" cy="60" r="2.5" fill="#D4AF37" fillOpacity="0.35" />
        <circle cx="147" cy="65" r="1.5" fill="#D4AF37" fillOpacity="0.25" />
        {/* Dupatta */}
        <path d="M130 50 Q158 42 162 88 Q152 72 130 62" fill="#E88060" fillOpacity="0.22" />
        <path d="M130 50 Q152 40 160 80" stroke="#D4AF37" strokeWidth="0.4" strokeOpacity="0.12" fill="none" />
        {/* Bangles */}
        <circle cx="112" cy="148" r="3.5" stroke="#D4AF37" strokeWidth="0.7" strokeOpacity="0.28" fill="none" />
        <circle cx="112" cy="154" r="3.5" stroke="#D4AF37" strokeWidth="0.6" strokeOpacity="0.22" fill="none" />
        <circle cx="112" cy="160" r="3.5" stroke="#A03030" strokeWidth="0.5" strokeOpacity="0.18" fill="none" />
      </g>

      {/* ── VARMALA ── */}
      <g style={{ animation: "maharani-varmala-sway 3.5s ease-in-out infinite" }}>
        <path d="M84 102 Q107 122 130 102" stroke="#D4A070" strokeOpacity="0.40" strokeWidth="1.8" fill="none" />
        <path d="M88 106 Q107 118 126 106" stroke="#D4AF37" strokeOpacity="0.20" strokeWidth="0.8" fill="none" />
        {/* Flowers — warm tones */}
        <circle cx="90" cy="108" r="3.5" fill="#D4A070" fillOpacity="0.40" />
        <circle cx="97" cy="114" r="4" fill="#C89060" fillOpacity="0.35" />
        <circle cx="107" cy="118" r="3.5" fill="#D4A070" fillOpacity="0.38" />
        <circle cx="117" cy="114" r="4" fill="#C89060" fillOpacity="0.35" />
        <circle cx="124" cy="108" r="3.5" fill="#D4A070" fillOpacity="0.40" />
      </g>
    </svg>
  );
}

/* ================================================================== */
/*  Elephant SVG with walk animation                                  */
/* ================================================================== */

/* ElephantProcession removed — replaced with decorative ornamental section */

/* ================================================================== */
/*  Helpers                                                           */
/* ================================================================== */

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-1">
      <div className="maharani-shimmer-line h-px w-14" />
      <span className="text-[10px] text-[#B8960A]/55" style={{ animation: "maharani-glow-pulse 3s ease-in-out infinite" }}>✦</span>
      <div className="maharani-shimmer-line h-px w-14" />
    </div>
  );
}

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-12 text-center">
      <p className="text-[9px] font-medium uppercase tracking-[0.4em] text-[#B8960A]/65" style={{ fontFamily: "var(--font-cinzel)" }}>{label}</p>
      <GoldDivider />
      <h2 className="maharani-shimmer-text mt-3 inline-block text-3xl md:text-4xl" style={{ fontFamily: "var(--font-great-vibes)" }}>{title}</h2>
    </div>
  );
}

/* ================================================================== */
/*  Parallax section wrapper                                          */
/* ================================================================== */

function ParallaxSection({ children, className, speed = 0.1 }: { children: React.ReactNode; className?: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30 * speed * 100, -30 * speed * 100]);

  return (
    <motion.section ref={ref} className={className} style={{ y }}>
      {children}
    </motion.section>
  );
}

/* ================================================================== */
/*  Events data                                                       */
/* ================================================================== */

const EVENTS = [
  { name: "Haldi", date: "June 12, 2026", time: "10 AM", venue: "Palace Courtyard", accent: "#C8960A", iconBg: "from-[#FFF8E0] to-[#FFEFB8]", iconSvg: "M12 3 Q14 7 12 11 Q10 7 12 3Z M8 6 Q10 4 12 8 Q10 10 8 6Z M16 6 Q14 4 12 8 Q14 10 16 6Z M10 11 L10 18 M14 11 L14 18 M8 18 L16 18", motif: "Turmeric blessings for the couple" },
  { name: "Mehendi", date: "June 12, 2026", time: "4 PM", venue: "Garden Pavilion", accent: "#4A7A35", iconBg: "from-[#EEF6E8] to-[#D8EAD0]", iconSvg: "M12 2 Q16 5 16 10 Q14 14 12 16 Q10 14 8 10 Q8 5 12 2Z M12 5 L12 14 M10 7 L8 5 M14 7 L16 5 M10 10 L7 9 M14 10 L17 9", motif: "Intricate henna artistry" },
  { name: "Sangeet", date: "June 13, 2026", time: "7 PM", venue: "Grand Ballroom", accent: "#B07060", iconBg: "from-[#FFF0EC] to-[#FFE0D8]", iconSvg: "M6 4 L6 14 Q6 18 10 18 Q12 18 12 16 L12 8 M12 8 Q12 6 14 6 Q16 6 16 8 L16 16 Q16 18 18 18 M4 8 L8 8 M14 12 L18 12", motif: "A night of music and dance" },
  { name: "Wedding", date: "June 15, 2026", time: "6 PM", venue: "The Royal Mandap", accent: "#D4AF37", iconBg: "from-[#FFF8EA] to-[#FFEFC8]", iconSvg: "M12 6 Q12 2 8 2 Q4 2 4 6 Q4 12 12 18 Q20 12 20 6 Q20 2 16 2 Q12 2 12 6Z", motif: "Sacred vows under the stars" },
  { name: "Reception", date: "June 15, 2026", time: "9 PM", venue: "Palace Grand Hall", accent: "#8B7355", iconBg: "from-[#F8F2EA] to-[#EDE4D8]", iconSvg: "M12 2 L14 8 L20 8 L15 12 L17 18 L12 14 L7 18 L9 12 L4 8 L10 8Z", motif: "A grand celebration of togetherness" },
];

const GALLERY_PHOTOS = [
  { label: "First Meeting", src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=600&fit=crop&q=80" },
  { label: "The Proposal", src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&h=600&fit=crop&q=80" },
  { label: "Engagement Day", src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=600&fit=crop&q=80" },
  { label: "Pre-Wedding", src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=600&fit=crop&q=80" },
  { label: "Mehendi Night", src: "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?w=600&h=600&fit=crop&q=80" },
  { label: "Together Forever", src: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=600&h=600&fit=crop&q=80" },
];

/* ================================================================== */
/*  Watermark — subtle diagonal pattern                               */
/* ================================================================== */

function Watermark() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[95] overflow-hidden">
      <span className="absolute top-[18%] left-[8%] -rotate-[30deg] whitespace-nowrap text-2xl font-semibold tracking-[0.4em] text-[#8B7355]/[0.07] select-none" style={{ fontFamily: "var(--font-cinzel)" }}>{platform.name}</span>
      <span className="absolute top-[50%] right-[6%] -rotate-[30deg] whitespace-nowrap text-2xl font-semibold tracking-[0.4em] text-[#8B7355]/[0.07] select-none" style={{ fontFamily: "var(--font-cinzel)" }}>{platform.name}</span>
      <span className="absolute bottom-[20%] left-[22%] -rotate-[30deg] whitespace-nowrap text-2xl font-semibold tracking-[0.4em] text-[#8B7355]/[0.07] select-none" style={{ fontFamily: "var(--font-cinzel)" }}>{platform.name}</span>
    </div>
  );
}

/* ================================================================== */
/*  Main experience                                                   */
/* ================================================================== */

export function MaharaniExperience() {
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 1.05]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  // Interactive states
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [isStoryRevealed, setIsStoryRevealed] = useState(false);
  const [isVenueRevealed, setIsVenueRevealed] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const { isPlaying: isMusicPlaying, toggle: toggleMusic } = useTemplateMusic("warm");

  const openEnvelope = useCallback(() => {
    setShowConfetti(true);
    setTimeout(() => setIsEnvelopeOpen(true), 600);
    setTimeout(() => setShowConfetti(false), 2500);
  }, []);
  const toggleEvent = useCallback((name: string) => {
    setExpandedEvent((prev) => (prev === name ? null : name));
  }, []);

  // ── ENVELOPE SCREEN — before invitation opens ──
  if (!isEnvelopeOpen) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: INJECTED_CSS }} />
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#FFF8F0] via-[#FFF2E4] to-[#FFE8D0]">
          {/* Petal burst on envelope open */}
          <AnimatePresence>
            {showConfetti && (
              <div className="pointer-events-none absolute inset-0 z-[100]">
                {Array.from({ length: 18 }).map((_, i) => {
                  const angle = (i / 18) * 360;
                  const rad = (angle * Math.PI) / 180;
                  const dist = 120 + (i % 3) * 40;
                  const colors = ["#FF9BAA", "#FFB0A0", "#FFCCC0", "#D4AF37", "#FFB347", "#E88090"];
                  return (
                    <motion.div
                      key={i}
                      className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full"
                      style={{ background: colors[i % colors.length] }}
                      initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                      animate={{
                        x: Math.cos(rad) * dist,
                        y: Math.sin(rad) * dist + 40,
                        scale: 0,
                        opacity: 0,
                      }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.03 }}
                    />
                  );
                })}
              </div>
            )}
          </AnimatePresence>

          {/* Warm glows */}
          <div className="absolute top-[25%] left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#D4AF37]/[0.05] blur-[80px]" />
          <div className="absolute top-[15%] left-[25%] h-32 w-32 rounded-full bg-[#FF9BAA]/[0.06] blur-[40px]" />
          <div className="absolute top-[20%] right-[25%] h-32 w-32 rounded-full bg-[#FFB347]/[0.04] blur-[35px]" />

          {/* Floating petals — fewer on envelope screen */}
          {[
            { l: 12, d: 15, delay: 0, c: "#FF9BAA" }, { l: 55, d: 18, delay: 2, c: "#FFCCC0" },
            { l: 85, d: 14, delay: 4, c: "#FFB0A0" },
          ].map((p, i) => (
            <div key={i} className="absolute -top-3" style={{ left: `${p.l}%`, animation: `maharani-drift ${p.d}s ease-in-out ${p.delay}s infinite` }}>
              <svg viewBox="0 0 12 16" width={10} height={13}><path d="M6 0 Q10 4 10 10 Q8 14 6 16 Q4 14 2 10 Q2 4 6 0Z" fill={p.c} fillOpacity="0.4" /></svg>
            </div>
          ))}

          {/* Envelope */}
          <motion.button
            onClick={openEnvelope}
            className="group relative cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Envelope SVG */}
            <div className="relative" style={{ animation: "maharani-envelope-glow 3s ease-in-out infinite" }}>
              <svg viewBox="0 0 200 150" className="h-[140px] w-auto md:h-[180px]" fill="none">
                {/* Envelope body */}
                <rect x="10" y="40" width="180" height="105" rx="6" fill="#F5ECD4" stroke="#B8960A" strokeWidth="0.8" strokeOpacity="0.20" />
                {/* Envelope flap */}
                <path d="M10 40 L100 95 L190 40" fill="#F0E4C8" stroke="#B8960A" strokeWidth="0.6" strokeOpacity="0.18" />
                {/* Inner shadow */}
                <path d="M10 40 L100 85 L190 40" fill="#E8D8B8" fillOpacity="0.30" />
                {/* Wax seal */}
                <circle cx="100" cy="95" r="14" fill="#9A3030" fillOpacity="0.30" stroke="#B8960A" strokeWidth="0.5" strokeOpacity="0.20" />
                <circle cx="100" cy="95" r="9" fill="#A04040" fillOpacity="0.25" />
                <text x="100" y="99" textAnchor="middle" fill="#F0E4D0" fillOpacity="0.50" fontSize="8" fontWeight="bold" style={{ fontFamily: "serif" }}>A&P</text>
                {/* Decorative gold line */}
                <line x1="30" y1="130" x2="170" y2="130" stroke="#B8960A" strokeWidth="0.3" strokeOpacity="0.12" />
                {/* Corner ornaments */}
                <circle cx="20" cy="50" r="2" fill="#B8960A" fillOpacity="0.10" />
                <circle cx="180" cy="50" r="2" fill="#B8960A" fillOpacity="0.10" />
              </svg>
            </div>

            {/* Tap prompt */}
            <motion.div
              className="mt-6 text-center"
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#6B4A28]/60" style={{ fontFamily: "var(--font-cinzel)" }}>
                Tap to Open
              </p>
              <ChevronDown className="mx-auto mt-1 h-4 w-4 text-[#B8960A]/40" />
            </motion.div>
          </motion.button>

          {/* Names preview below */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-[9px] uppercase tracking-[0.5em] text-[#6B4A28]/40" style={{ fontFamily: "var(--font-cinzel)" }}>
              The Wedding of
            </p>
            <p className="mt-2 text-2xl text-[#3A1A10]/60" style={{ fontFamily: "var(--font-great-vibes)" }}>
              Aarav & Priya
            </p>
          </motion.div>

          {/* Back button */}
          <Link href="/templates/the-maharani" className="fixed top-5 left-5 z-[101] flex items-center gap-1.5 rounded-full bg-white/70 px-4 py-2 text-xs font-medium text-[#2A1208]/72 shadow-sm backdrop-blur-md transition-all hover:bg-white/90 hover:text-[#3A1A10]">
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </Link>
        </div>
      </>
    );
  }

  // ── MAIN INVITATION — after envelope opens ──
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: INJECTED_CSS }} />
      <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-[#FFF8F0] via-[#FFF5EA] to-[#FFF0E0]">
        <FloatingPetals />
        <Watermark />

        {/* Scroll progress bar */}
        <motion.div
          className="fixed top-0 right-0 left-0 z-[102] h-[2px] origin-left bg-gradient-to-r from-[#B8960A] to-[#D4AF37]"
          style={{ scaleX: scrollYProgress }}
        />

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  HERO / COVER                                              */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <motion.section
          className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
          style={{ scale: heroScale }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFF5EA] via-[#FFECD8] to-[#FFE0C8]" />
          {/* Glows */}
          <div className="absolute top-[25%] left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[#D4AF37]/[0.06] blur-[100px]" />
          <div className="absolute top-[15%] left-[20%] h-48 w-48 rounded-full bg-[#FF9BAA]/[0.08] blur-[60px]" />
          <div className="absolute top-[20%] right-[20%] h-48 w-48 rounded-full bg-[#FFB347]/[0.06] blur-[50px]" />
          {/* Light rays behind couple */}
          <div className="absolute top-[20%] left-1/2 h-[300px] w-[2px] -translate-x-1/2 rotate-[15deg] bg-gradient-to-b from-[#D4AF37]/[0.08] to-transparent blur-[3px]" />
          <div className="absolute top-[18%] left-1/2 h-[320px] w-[2px] -translate-x-[calc(50%+40px)] rotate-[-12deg] bg-gradient-to-b from-[#D4AF37]/[0.06] to-transparent blur-[3px]" />
          <div className="absolute top-[22%] left-1/2 h-[280px] w-[2px] -translate-x-[calc(50%-40px)] rotate-[20deg] bg-gradient-to-b from-[#FFB347]/[0.05] to-transparent blur-[3px]" />
          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,transparent_40%,rgba(120,60,30,0.06)_100%)]" />

          <SparkleField />

          {/* Floral arch — rich with chandeliers */}
          <FloralArch className="absolute top-[3%] left-1/2 h-[82%] w-auto max-w-[520px] -translate-x-1/2 md:h-[88%]" />

          {/* Extra floating floral clusters — foreground depth */}
          {/* Top-left cluster */}
          <div className="absolute top-[6%] left-[4%] z-[6]" style={{ animation: "maharani-float 8s ease-in-out 0.5s infinite" }}>
            <svg viewBox="0 0 60 70" className="h-14 w-auto opacity-40 blur-[0.5px]" fill="none">
              <circle cx="25" cy="22" r="14" fill="#E88090" fillOpacity="0.35" />
              <circle cx="25" cy="22" r="8" fill="#FF9BAA" fillOpacity="0.25" />
              <circle cx="40" cy="35" r="10" fill="#FFB0A0" fillOpacity="0.28" />
              <circle cx="15" cy="38" r="8" fill="#FFCCC0" fillOpacity="0.22" />
              <circle cx="30" cy="12" r="5" fill="#FFF5EA" fillOpacity="0.25" />
              <path d="M48 28 Q55 22 50 38 Q44 34 48 28Z" fill="#5A8A50" fillOpacity="0.22" />
              <path d="M8 30 Q2 24 12 20 Q14 28 8 30Z" fill="#6B9A5E" fillOpacity="0.18" />
            </svg>
          </div>
          {/* Top-right cluster */}
          <div className="absolute top-[5%] right-[4%] z-[6]" style={{ animation: "maharani-float 7s ease-in-out 1s infinite" }}>
            <svg viewBox="0 0 60 70" className="h-12 w-auto opacity-35 blur-[0.5px]" fill="none">
              <circle cx="35" cy="22" r="14" fill="#FF8C6A" fillOpacity="0.30" />
              <circle cx="35" cy="22" r="8" fill="#FFD0B0" fillOpacity="0.22" />
              <circle cx="20" cy="35" r="10" fill="#E88090" fillOpacity="0.25" />
              <circle cx="45" cy="38" r="8" fill="#FFB0A0" fillOpacity="0.20" />
              <circle cx="30" cy="12" r="5" fill="#FFF0E0" fillOpacity="0.22" />
              <path d="M12 28 Q5 22 10 38 Q16 34 12 28Z" fill="#5A8A50" fillOpacity="0.20" />
            </svg>
          </div>
          {/* Bottom-left cluster */}
          <div className="absolute bottom-[18%] left-[3%] z-[6]" style={{ animation: "maharani-float 9s ease-in-out 2s infinite" }}>
            <svg viewBox="0 0 50 50" className="h-10 w-auto opacity-30" fill="none">
              <circle cx="20" cy="20" r="12" fill="#E88090" fillOpacity="0.25" />
              <circle cx="20" cy="20" r="6" fill="#FFCCC0" fillOpacity="0.18" />
              <circle cx="35" cy="30" r="8" fill="#FFB0A0" fillOpacity="0.20" />
              <path d="M38 18 Q44 14 40 28 Q36 24 38 18Z" fill="#5A8A50" fillOpacity="0.18" />
            </svg>
          </div>
          {/* Bottom-right cluster */}
          <div className="absolute bottom-[20%] right-[3%] z-[6]" style={{ animation: "maharani-float 8.5s ease-in-out 1.5s infinite" }}>
            <svg viewBox="0 0 50 50" className="h-10 w-auto opacity-30" fill="none">
              <circle cx="30" cy="20" r="12" fill="#FFB0A0" fillOpacity="0.25" />
              <circle cx="30" cy="20" r="6" fill="#FF9BAA" fillOpacity="0.18" />
              <circle cx="15" cy="30" r="8" fill="#FFCCC0" fillOpacity="0.20" />
              <path d="M12 18 Q6 14 10 28 Q14 24 12 18Z" fill="#6B9A5E" fillOpacity="0.18" />
            </svg>
          </div>

          {/* Couple */}
          {/* Animated couple — stylized silhouette, no photo */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            style={{ opacity: heroOpacity }}
          >
            <div className="relative z-10" style={{ animation: "maharani-float 8s ease-in-out infinite" }}>
              <AnimatedCouple className="h-[200px] w-auto md:h-[260px]" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="relative z-10 mt-2 flex flex-col items-center px-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ opacity: heroOpacity }}
          >
            <p className="text-[9px] font-medium uppercase tracking-[0.5em] text-[#6B4A28]/70 md:text-[10px]" style={{ fontFamily: "var(--font-cinzel)" }}>
              A Royal Celebration of Love
            </p>
            <GoldDivider />
            <h1 className="maharani-shimmer-text mt-1 inline-block text-5xl leading-tight md:text-7xl" style={{ fontFamily: "var(--font-great-vibes)" }}>
              Aarav & Priya
            </h1>
            <div className="mt-3 flex items-center gap-3">
              <div className="maharani-shimmer-line h-px w-16" />
              <p className="text-xs tracking-[0.15em] text-[#6B4A28]/75" style={{ fontFamily: "var(--font-cormorant)" }}>June 15, 2026</p>
              <div className="maharani-shimmer-line h-px w-16" />
            </div>
            <p className="mt-1.5 text-[9px] tracking-[0.1em] text-[#6B4A28]/50" style={{ fontFamily: "var(--font-montserrat)" }}>
              The Royal Palace · Jaipur, Rajasthan
            </p>
          </motion.div>

          {/* Scroll hint */}
          <motion.div className="absolute bottom-6" animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <div className="flex flex-col items-center gap-1 text-[#6B4A28]/40">
              <p className="text-[7px] uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-montserrat)" }}>Scroll</p>
              <div className="h-5 w-px bg-gradient-to-b from-[#8B6040]/20 to-transparent" />
            </div>
          </motion.div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  FAMILY BLESSINGS                                          */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <motion.section className="relative px-6 py-24 md:py-32" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading label="With Blessings Of" title="Our Families" />
            <div className="grid gap-10 md:grid-cols-2">
              {/* Groom's family */}
              <motion.div initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="rounded-2xl border border-[#D4AF37]/8 bg-[#FFFBF5]/50 p-6">
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#B8960A]/50" style={{ fontFamily: "var(--font-cinzel)" }}>Groom&apos;s Family</p>
                <div className="my-3 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/12 to-transparent" />
                <p className="text-lg text-[#3A1A10]/70" style={{ fontFamily: "var(--font-great-vibes)" }}>Mr. Rajesh & Mrs. Sunita Sharma</p>
                <p className="mt-1 text-xs italic text-[#6B4A28]/45" style={{ fontFamily: "var(--font-cormorant)" }}>Proud parents of the groom</p>
              </motion.div>
              {/* Bride's family */}
              <motion.div initial={{ opacity: 0, x: 15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                className="rounded-2xl border border-[#D4AF37]/8 bg-[#FFFBF5]/50 p-6">
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#B8960A]/50" style={{ fontFamily: "var(--font-cinzel)" }}>Bride&apos;s Family</p>
                <div className="my-3 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/12 to-transparent" />
                <p className="text-lg text-[#3A1A10]/70" style={{ fontFamily: "var(--font-great-vibes)" }}>Mr. Vikram & Mrs. Meera Patel</p>
                <p className="mt-1 text-xs italic text-[#6B4A28]/45" style={{ fontFamily: "var(--font-cormorant)" }}>Proud parents of the bride</p>
              </motion.div>
            </div>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
              className="mt-8 text-sm italic text-[#6B4A28]/45" style={{ fontFamily: "var(--font-cormorant)" }}>
              &ldquo;Two families, one love, forever blessed.&rdquo;
            </motion.p>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  COUNTDOWN                                                 */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <motion.section className="relative px-6 py-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="mx-auto max-w-md text-center">
            <SectionHeading label="Save the Date" title="Counting the Days" />
            <div className="flex items-center justify-center gap-4">
              {[
                { value: "128", label: "Days" },
                { value: "08", label: "Hours" },
                { value: "45", label: "Minutes" },
              ].map((unit, i) => (
                <motion.div key={unit.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-[#D4AF37]/12 bg-[#FFFBF5]/60">
                    <span className="text-2xl font-bold text-[#3A1A10]/65" style={{ fontFamily: "var(--font-playfair)" }}>{unit.value}</span>
                  </div>
                  <p className="mt-2 text-[8px] uppercase tracking-[0.2em] text-[#6B4A28]/45" style={{ fontFamily: "var(--font-montserrat)" }}>{unit.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  OUR STORY — tap to reveal                                 */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <ParallaxSection className="relative px-6 py-24 md:py-32" speed={0.05}>
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading label="Our Story" title="Written in the Stars" />

            <AnimatePresence mode="wait">
              {!isStoryRevealed ? (
                <motion.button
                  key="story-btn"
                  onClick={() => setIsStoryRevealed(true)}
                  className="group mx-auto flex flex-col items-center gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#B8960A]/15 bg-[#B8960A]/[0.04] transition-all group-hover:border-[#B8960A]/25 group-hover:bg-[#B8960A]/[0.08]">
                    <Heart className="h-5 w-5 text-[#B8960A]/50" />
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#6B4A28]/50" style={{ fontFamily: "var(--font-montserrat)" }}>
                    Tap to Read Our Story
                  </p>
                </motion.button>
              ) : (
                <motion.div
                  key="story-content"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  {[
                    { year: "2022", title: "How We Met", desc: "A rainy afternoon, a coffee shop on the corner, and a conversation that never ended." },
                    { year: "2023", title: "First Trip Together", desc: "We drove to the mountains with no plan — just two hearts and an open road." },
                    { year: "2024", title: "The Proposal", desc: "Under a sky full of stars, he knelt down, and she said yes before he could finish." },
                    { year: "2026", title: "Forever Begins", desc: "June 15th — the day two stories become one." },
                  ].map((step, i) => (
                    <motion.div
                      key={step.year}
                      initial={{ opacity: 0, x: i % 2 === 0 ? -15 : 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="flex items-start gap-4 text-left"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#B8960A]/15 bg-[#B8960A]/[0.04]">
                        <span className="text-[10px] font-bold text-[#B8960A]/55" style={{ fontFamily: "var(--font-montserrat)" }}>{step.year}</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[#3A1A10]/65" style={{ fontFamily: "var(--font-playfair)" }}>{step.title}</h4>
                        <p className="mt-1 text-xs leading-relaxed text-[#3A2418]/50" style={{ fontFamily: "var(--font-cormorant)" }}>{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                  <Heart className="mx-auto mt-4 h-5 w-5 text-[#B8960A]/42" style={{ animation: "maharani-glow-pulse 2.5s ease-in-out infinite" }} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ParallaxSection>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  EVENTS — full-width stacked, one per scroll view          */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="relative px-6 py-16">
          <SectionHeading label="The Celebrations" title="Wedding Events" />
        </section>

        {/* Event cards — compact, expandable on tap */}
        <div className="mx-auto max-w-2xl px-6 pb-16">
          <div className="space-y-4">
            {EVENTS.map((event, i) => {
              const isOpen = expandedEvent === event.name;
              return (
                <motion.div
                  key={event.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <button
                    onClick={() => toggleEvent(event.name)}
                    className="group w-full overflow-hidden rounded-2xl border border-[#D4AF37]/10 bg-gradient-to-b from-[#FFFBF5] to-[#FFF5EA] text-left shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-[#D4AF37]/18 hover:shadow-[0_6px_24px_rgba(180,140,60,0.06)]"
                  >
                    {/* Collapsed view — always visible */}
                    <div className="flex items-center justify-between p-5">
                      <div className="flex items-center gap-4">
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-gradient-to-b ${event.iconBg} transition-transform duration-300 group-hover:scale-105`} style={{ borderColor: `${event.accent}20` }}>
                          <svg viewBox="0 0 24 20" className="h-5 w-5" fill="none" stroke={event.accent} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7">
                            <path d={event.iconSvg} />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-xl text-[#3A1A10]" style={{ fontFamily: "var(--font-great-vibes)" }}>{event.name}</h3>
                          <p className="mt-0.5 text-[10px] italic text-[#6B4A28]/55" style={{ fontFamily: "var(--font-cormorant)" }}>{event.motif}</p>
                        </div>
                      </div>
                      <ChevronDown className={`h-4 w-4 shrink-0 text-[#B8960A]/40 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </div>

                    {/* Expanded view — details */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-[#D4AF37]/8 px-5 pb-5 pt-4">
                            <div className="space-y-2.5">
                              <div className="flex items-center gap-3">
                                <Calendar className="h-4 w-4 text-[#9A7A0A]/65" />
                                <span className="text-sm text-[#2A1208]/78" style={{ fontFamily: "var(--font-montserrat)" }}>{event.date}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <Clock className="h-4 w-4 text-[#9A7A0A]/65" />
                                <span className="text-sm text-[#2A1208]/68" style={{ fontFamily: "var(--font-montserrat)" }}>{event.time}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <MapPin className="h-4 w-4 text-[#9A7A0A]/65" />
                                <span className="text-sm text-[#2A1208]/60" style={{ fontFamily: "var(--font-montserrat)" }}>{event.venue}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  DRESS CODE                                                */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <motion.section className="relative px-6 py-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="mx-auto max-w-lg text-center">
            <SectionHeading label="What to Wear" title="Dress Code" />
            <div className="grid grid-cols-2 gap-4">
              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="rounded-2xl border border-[#D4AF37]/8 bg-[#FFFBF5]/50 p-5 text-center">
                <svg viewBox="0 0 24 28" className="mx-auto mb-3 h-7 w-6" fill="none" stroke="#B8960A" strokeWidth="0.8" strokeOpacity="0.45">
                  <path d="M8 4 L12 2 L16 4 L16 10 Q16 14 12 16 Q8 14 8 10Z" />
                  <path d="M8 10 L4 28 L12 24 L20 28 L16 10" />
                  <path d="M10 6 L14 6" />
                </svg>
                <p className="text-sm font-semibold text-[#3A1A10]/60" style={{ fontFamily: "var(--font-playfair)" }}>Men</p>
                <p className="mt-1 text-xs text-[#6B4A28]/45" style={{ fontFamily: "var(--font-cormorant)" }}>Kurta / Sherwani · Royal tones</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                className="rounded-2xl border border-[#D4AF37]/8 bg-[#FFFBF5]/50 p-5 text-center">
                <svg viewBox="0 0 24 28" className="mx-auto mb-3 h-7 w-6" fill="none" stroke="#B8960A" strokeWidth="0.8" strokeOpacity="0.45">
                  <path d="M8 6 Q12 2 16 6 L18 12 Q18 16 12 18 Q6 16 6 12Z" />
                  <path d="M6 12 L2 28 Q12 26 22 28 L18 12" />
                  <path d="M4 22 Q12 20 20 22" />
                </svg>
                <p className="text-sm font-semibold text-[#3A1A10]/60" style={{ fontFamily: "var(--font-playfair)" }}>Women</p>
                <p className="mt-1 text-xs text-[#6B4A28]/45" style={{ fontFamily: "var(--font-cormorant)" }}>Saree / Lehenga · Pastels or rich tones</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  TRAVEL & STAY                                             */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <motion.section className="relative px-6 py-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="mx-auto max-w-lg text-center">
            <SectionHeading label="Getting There" title="Travel & Stay" />
            <div className="space-y-4">
              {[
                { title: "Nearest Airport", desc: "Jaipur International Airport (JAI) — 25 min drive", iconPath: "M2 16 L10 12 L10 6 Q10 2 12 2 Q14 2 14 6 L14 12 L22 16 L22 18 L14 15 L14 18 L16 20 L16 22 L12 20 L8 22 L8 20 L10 18 L10 15 L2 18Z" },
                { title: "Recommended Stay", desc: "The Rosewater Suites — special rates for guests", iconPath: "M3 20 L3 10 L12 4 L21 10 L21 20 M8 20 L8 14 L16 14 L16 20 M3 10 L21 10" },
                { title: "From Delhi", desc: "5 hours by road · Rajdhani Express available", iconPath: "M5 17 L5 11 Q5 8 8 8 L18 8 Q20 8 20 10 L21 14 L22 15 L22 17 M7 18 Q7 16 9 16 Q11 16 11 18 M15 18 Q15 16 17 16 Q19 16 19 18 M11 11 L11 8 M15 11 L15 8 M5 14 L22 14" },
              ].map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-4 rounded-xl border border-[#D4AF37]/6 bg-[#FFFBF5]/40 p-4 text-left">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#B8960A]/12 bg-[#B8960A]/[0.04]">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="#B8960A" strokeWidth="1.2" strokeOpacity="0.55" strokeLinecap="round" strokeLinejoin="round">
                      <path d={item.iconPath} />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#3A1A10]/60" style={{ fontFamily: "var(--font-playfair)" }}>{item.title}</p>
                    <p className="mt-0.5 text-xs text-[#6B4A28]/45" style={{ fontFamily: "var(--font-cormorant)" }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  THE JOURNEY — decorative royal section                    */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <ParallaxSection className="relative overflow-hidden px-6 py-24" speed={0.08}>
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading label="The Journey" title="Two Souls, One Path" />

            {/* Decorative royal ornament */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto mb-8"
            >
              <svg viewBox="0 0 300 100" className="mx-auto w-full max-w-sm" fill="none">
                {/* Central mandala-style ornament */}
                <circle cx="150" cy="50" r="35" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.20" />
                <circle cx="150" cy="50" r="28" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.15" />
                <circle cx="150" cy="50" r="20" stroke="#D4AF37" strokeWidth="0.4" strokeOpacity="0.12" />
                {/* Center heart */}
                <path d="M145 45 Q145 40 150 40 Q155 40 155 45 Q155 52 150 56 Q145 52 145 45Z" fill="#D4AF37" fillOpacity="0.20" />
                {/* Radiating petals */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
                  const rad = (angle * Math.PI) / 180;
                  const x1 = 150 + 22 * Math.cos(rad);
                  const y1 = 50 + 22 * Math.sin(rad);
                  const x2 = 150 + 32 * Math.cos(rad);
                  const y2 = 50 + 32 * Math.sin(rad);
                  return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D4AF37" strokeWidth="0.4" strokeOpacity="0.12" />;
                })}
                {/* Small dots at cardinal points */}
                {[0, 90, 180, 270].map((angle) => {
                  const rad = (angle * Math.PI) / 180;
                  const cx = 150 + 35 * Math.cos(rad);
                  const cy = 50 + 35 * Math.sin(rad);
                  return <circle key={angle} cx={cx} cy={cy} r="2" fill="#D4AF37" fillOpacity="0.15" />;
                })}
                {/* Extending decorative lines */}
                <line x1="30" y1="50" x2="112" y2="50" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.10" />
                <line x1="188" y1="50" x2="270" y2="50" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.10" />
                {/* Small floral dots on lines */}
                <circle cx="50" cy="50" r="2.5" fill="#E88090" fillOpacity="0.15" />
                <circle cx="75" cy="50" r="2" fill="#FFCCC0" fillOpacity="0.12" />
                <circle cx="95" cy="50" r="1.5" fill="#E88090" fillOpacity="0.10" />
                <circle cx="250" cy="50" r="2.5" fill="#FFB0A0" fillOpacity="0.15" />
                <circle cx="225" cy="50" r="2" fill="#FFCCC0" fillOpacity="0.12" />
                <circle cx="205" cy="50" r="1.5" fill="#FFB0A0" fillOpacity="0.10" />
              </svg>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-base leading-[2] text-[#3A2418]/60"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              From the sound of shehnai to the shower of petals, from the warmth
              of blessings to the promise of forever — every step of this journey
              has led us to each other.
            </motion.p>

            {/* Three milestone moments */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              {[
                { label: "First Met", detail: "A rainy afternoon", iconPath: "M8 2 Q8 0 10 0 L14 0 Q16 0 16 2 L16 3 L8 3Z M6 4 L18 4 L18 6 Q18 14 12 18 Q6 14 6 6Z M11 14 L11 18 M9 18 L15 18" },
                { label: "Said Yes", detail: "Under the stars", iconPath: "M12 2 L13.5 8 L20 8 L15 12 L17 18 L12 14 L7 18 L9 12 L4 8 L10.5 8Z" },
                { label: "Forever", detail: "June 15, 2026", iconPath: "M12 6 Q12 2 8 2 Q4 2 4 6 Q4 12 12 18 Q20 12 20 6 Q20 2 16 2 Q12 2 12 6Z" },
              ].map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.15 }}
                  className="text-center"
                >
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/15 bg-[#D4AF37]/[0.05]">
                    <svg viewBox="0 0 24 20" className="h-4 w-4" fill="none" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity="0.55" strokeLinecap="round" strokeLinejoin="round">
                      <path d={m.iconPath} fill={i === 2 ? "#D4AF37" : "none"} fillOpacity={i === 2 ? "0.15" : "0"} />
                    </svg>
                  </div>
                  <p className="text-xs font-semibold text-[#2A1208]/72" style={{ fontFamily: "var(--font-montserrat)" }}>{m.label}</p>
                  <p className="mt-0.5 text-[10px] text-[#6B4A28]/55" style={{ fontFamily: "var(--font-cormorant)" }}>{m.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </ParallaxSection>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  FLORAL DIVIDER                                            */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center py-6"
        >
          <svg viewBox="0 0 400 60" className="w-full max-w-lg" fill="none">
            {/* Center line */}
            <line x1="40" y1="30" x2="160" y2="30" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.15" />
            <line x1="240" y1="30" x2="360" y2="30" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.15" />
            {/* Center bloom */}
            <circle cx="200" cy="30" r="10" fill="#E88090" fillOpacity="0.22" />
            <circle cx="200" cy="30" r="6" fill="#FF9BAA" fillOpacity="0.15" />
            <circle cx="200" cy="30" r="3" fill="#FFCCC0" fillOpacity="0.12" />
            {/* Left blooms */}
            <circle cx="180" cy="28" r="7" fill="#FFB0A0" fillOpacity="0.18" />
            <circle cx="170" cy="34" r="5" fill="#FFCCC0" fillOpacity="0.14" />
            <circle cx="165" cy="26" r="4" fill="#FFF5EA" fillOpacity="0.18" />
            {/* Right blooms */}
            <circle cx="220" cy="28" r="7" fill="#FF8C6A" fillOpacity="0.18" />
            <circle cx="230" cy="34" r="5" fill="#FFB0A0" fillOpacity="0.14" />
            <circle cx="235" cy="26" r="4" fill="#FFF5EA" fillOpacity="0.18" />
            {/* Leaves */}
            <path d="M155 30 Q148 24 158 22 Q160 28 155 30Z" fill="#5A8A50" fillOpacity="0.18" />
            <path d="M245 30 Q252 24 242 22 Q240 28 245 30Z" fill="#5A8A50" fillOpacity="0.18" />
            {/* Small dots along lines */}
            <circle cx="80" cy="30" r="2" fill="#E88090" fillOpacity="0.10" />
            <circle cx="120" cy="30" r="1.5" fill="#FFCCC0" fillOpacity="0.08" />
            <circle cx="280" cy="30" r="1.5" fill="#FFCCC0" fillOpacity="0.08" />
            <circle cx="320" cy="30" r="2" fill="#FFB0A0" fillOpacity="0.10" />
            {/* End ornaments */}
            <circle cx="40" cy="30" r="2" fill="#D4AF37" fillOpacity="0.12" />
            <circle cx="360" cy="30" r="2" fill="#D4AF37" fillOpacity="0.12" />
          </svg>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  VENUE — tap to reveal                                     */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <ParallaxSection className="relative px-6 py-24" speed={0.06}>
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading label="The Venue" title="The Royal Palace" />

            <AnimatePresence mode="wait">
              {!isVenueRevealed ? (
                <motion.button
                  key="venue-btn"
                  onClick={() => setIsVenueRevealed(true)}
                  className="group mx-auto flex flex-col items-center gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#B8960A]/15 bg-[#B8960A]/[0.04] transition-all group-hover:border-[#B8960A]/25 group-hover:bg-[#B8960A]/[0.08]">
                    <MapPin className="h-5 w-5 text-[#B8960A]/50" />
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#6B4A28]/50" style={{ fontFamily: "var(--font-montserrat)" }}>
                    Tap to Reveal Venue
                  </p>
                </motion.button>
              ) : (
                <motion.div
                  key="venue-content"
                  initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="text-base leading-relaxed text-[#3A2418]/60" style={{ fontFamily: "var(--font-cormorant)" }}>
                    Nestled in the heart of Jaipur, our celebration unfolds within the majestic walls
                    of a heritage palace — where every arch tells a story.
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#D4AF37]/[0.08] px-6 py-2.5">
                    <MapPin className="h-4 w-4 text-[#D4AF37]/60" />
                    <span className="text-sm text-[#3A2418]/60" style={{ fontFamily: "var(--font-montserrat)" }}>Palace Road, Jaipur, Rajasthan 302002</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ParallaxSection>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  GALLERY — clickable photos                                */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <motion.section className="relative px-6 py-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="mx-auto max-w-3xl">
            <SectionHeading label="Moments" title="Our Gallery" />
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {GALLERY_PHOTOS.map((photo, i) => (
                <motion.button
                  key={photo.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPhoto(i)}
                  className="group relative cursor-pointer overflow-hidden rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)]"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={photo.src}
                      alt={photo.label}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1A0808]/50 to-transparent p-2.5 pt-8">
                    <p className="text-[9px] font-medium text-white/80" style={{ fontFamily: "var(--font-montserrat)" }}>{photo.label}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Photo lightbox */}
        <AnimatePresence>
          {selectedPhoto !== null && (
            <motion.div
              className="fixed inset-0 z-[200] flex items-center justify-center bg-[#1A0808]/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
            >
              <motion.div
                className="relative mx-6 max-w-lg overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={GALLERY_PHOTOS[selectedPhoto]!.src}
                    alt={GALLERY_PHOTOS[selectedPhoto]!.label}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 90vw, 500px"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1A0808]/60 to-transparent p-5 pt-12">
                    <p className="text-lg text-white/90" style={{ fontFamily: "var(--font-great-vibes)" }}>
                      {GALLERY_PHOTOS[selectedPhoto]!.label}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/50 text-[#3A1A10]/50 backdrop-blur-sm transition-colors hover:bg-white/80"
                >
                  ✕
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  RSVP                                                      */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <motion.section className="relative px-6 py-24" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="mx-auto max-w-lg text-center">
            <SectionHeading label="We await your presence" title="Kindly Respond" />
            <p className="text-base text-[#3A2418]/55" style={{ fontFamily: "var(--font-cormorant)" }}>
              Your presence would make our celebration truly complete.
            </p>
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-8">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-[#D4AF37] to-[#C6A85A] px-10 text-base text-white hover:from-[#C09A2F] hover:to-[#B89848]">
                <Heart className="h-4 w-4" /> RSVP Now
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  GIFT SECTION                                              */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <motion.section className="relative px-6 py-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="mx-auto max-w-md text-center">
            <SectionHeading label="A Note" title="Your Presence is Our Gift" />
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="text-base leading-[2] text-[#3A2418]/55" style={{ fontFamily: "var(--font-cormorant)" }}>
              Your love, laughter, and blessings are the only gifts we need.
              But if you wish to contribute to our new beginning, we would be honored.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/12 bg-[#D4AF37]/[0.04] px-5 py-2">
              <Heart className="h-3.5 w-3.5 text-[#B8960A]/45" />
              <span className="text-xs text-[#6B4A28]/50" style={{ fontFamily: "var(--font-montserrat)" }}>Gift Registry Available</span>
            </motion.div>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  CLOSING BLESSING                                          */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <motion.section className="relative px-6 py-24" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
          <div className="mx-auto max-w-lg text-center">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.8 }}
              className="text-lg italic leading-[2] text-[#3A2418]/50 md:text-xl" style={{ fontFamily: "var(--font-cormorant)" }}>
              &ldquo;May the love that has brought us together continue to grow stronger with every sunrise, and may our journey be blessed with joy, laughter, and endless togetherness.&rdquo;
            </motion.p>
            <GoldDivider />
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
              <h3 className="maharani-shimmer-text mt-4 inline-block text-3xl" style={{ fontFamily: "var(--font-great-vibes)" }}>Aarav & Priya</h3>
              <p className="mt-2 text-xs text-[#6B4A28]/50" style={{ fontFamily: "var(--font-montserrat)" }}>June 15, 2026 · The Royal Palace, Jaipur</p>
            </motion.div>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  FOOTER                                                    */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="border-t border-[#D4AF37]/8 px-6 py-8">
          <div className="mx-auto max-w-md text-center">
            <p className="text-[9px] text-[#6B4A28]/25" style={{ fontFamily: "var(--font-montserrat)" }}>{platform.watermarkText}</p>
          </div>
        </section>

        {/* Back button */}
        <Link href="/templates/the-maharani" className="fixed top-5 left-5 z-[101] flex items-center gap-1.5 rounded-full bg-white/70 px-4 py-2 text-xs font-medium text-[#2A1208]/72 shadow-sm backdrop-blur-md transition-all hover:bg-white/90 hover:text-[#3A1A10]">
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </Link>

        {/* Music toggle */}
        <button
          onClick={toggleMusic}
          className="fixed top-5 right-5 z-[101] flex h-9 w-9 items-center justify-center rounded-full bg-white/70 shadow-sm backdrop-blur-md transition-all hover:bg-white/90"
          aria-label={isMusicPlaying ? "Pause music" : "Play music"}
        >
          {isMusicPlaying ? (
            <Volume2 className="h-4 w-4 text-[#B8960A]/60" />
          ) : (
            <VolumeX className="h-4 w-4 text-[#6B4A28]/40" />
          )}
        </button>
      </div>
    </>
  );
}
