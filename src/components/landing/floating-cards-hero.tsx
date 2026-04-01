"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/animated-invite/shared/magnetic-button";

/* ================================================================== */
/*  Gold accent color                                                 */
/* ================================================================== */

const G = "#C9A34E"; // primary gold

/* ================================================================== */
/*  Inline SVG helpers                                                */
/* ================================================================== */

function CoupleIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Groom silhouette */}
      <circle cx="30" cy="16" r="7" fill={G} fillOpacity="0.2" />
      <path d="M22 55 L22 30 Q22 22 30 22 Q38 22 38 30 L38 55" fill={G} fillOpacity="0.12" />
      <rect x="26" y="30" width="8" height="1.5" rx="0.75" fill={G} fillOpacity="0.25" />
      {/* Bride silhouette */}
      <circle cx="50" cy="16" r="7" fill={G} fillOpacity="0.2" />
      <path d="M40 55 L42 28 Q42 22 50 22 Q58 22 58 28 L60 55 Q50 50 40 55Z" fill={G} fillOpacity="0.12" />
      {/* Veil hint */}
      <path d="M50 10 Q58 8 60 16 Q56 14 50 16" fill={G} fillOpacity="0.08" />
      {/* Connecting hearts */}
      <path d="M38 35 Q40 32 42 35 Q40 38 38 35Z" fill={G} fillOpacity="0.3" />
    </svg>
  );
}

function EventIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="20" cy="20" r="18" stroke={G} strokeOpacity="0.25" strokeWidth="0.5" />
      <circle cx="20" cy="20" r="12" stroke={G} strokeOpacity="0.15" strokeWidth="0.5" />
      <path d="M20 8 L22 16 L20 14 L18 16Z" fill={G} fillOpacity="0.35" />
      <path d="M20 32 L18 24 L20 26 L22 24Z" fill={G} fillOpacity="0.35" />
      <path d="M8 20 L16 18 L14 20 L16 22Z" fill={G} fillOpacity="0.35" />
      <path d="M32 20 L24 22 L26 20 L24 18Z" fill={G} fillOpacity="0.35" />
      <circle cx="20" cy="20" r="3" fill={G} fillOpacity="0.2" />
    </svg>
  );
}

/* ================================================================== */
/*  5 premium card designs                                            */
/* ================================================================== */

/* ── Card 1: Wedding Invitation (HERO CARD) ── */
function WeddingCard() {
  return (
    <div className="relative flex h-full w-full flex-col items-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#FBF7F0] via-[#F7EFDF] to-[#EDE4D0]">
      {/* Paper grain */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Ccircle cx='2' cy='2' r='0.3'/%3E%3C/g%3E%3C/svg%3E\")" }} />

      {/* Outer gold frame */}
      <div className="absolute inset-[10px] rounded-xl border border-[#C9A34E]/20" />
      {/* Inner gold frame */}
      <div className="absolute inset-[18px] rounded-lg border border-[#C9A34E]/10" />

      {/* Corner ornaments */}
      {[
        "top-3 left-3",
        "top-3 right-3 -scale-x-100",
        "bottom-3 left-3 -scale-y-100",
        "bottom-3 right-3 -scale-x-100 -scale-y-100",
      ].map((pos) => (
        <div key={pos} className={`absolute ${pos} text-[14px] leading-none text-[#C9A34E]/35`}>❧</div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 py-6">
        {/* Top ornament */}
        <div className="flex items-center gap-1 text-[#C9A34E]/40">
          <span className="text-[6px]">✦</span>
          <span className="text-[8px]">✦</span>
          <span className="text-[10px]">✦</span>
          <span className="text-[8px]">✦</span>
          <span className="text-[6px]">✦</span>
        </div>

        <p className="mt-2 text-[7px] font-medium uppercase tracking-[0.35em] text-[#9A8560]" style={{ fontFamily: "var(--font-cinzel)" }}>
          Together with their families
        </p>

        <div className="my-2 h-px w-24 bg-gradient-to-r from-transparent via-[#C9A34E]/30 to-transparent" />

        {/* Couple illustration */}
        <CoupleIllustration className="my-1 h-[52px] w-[70px]" />

        <h3 className="text-[26px] leading-tight text-[#3D3427]" style={{ fontFamily: "var(--font-great-vibes)" }}>
          Aarav <span className="text-[#C9A34E]">&</span> Priya
        </h3>

        {/* Decorative divider */}
        <div className="my-2 flex items-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C9A34E]/25" />
          <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full border border-[#C9A34E]/25 bg-[#C9A34E]/5">
            <span className="text-[6px] text-[#C9A34E]">❦</span>
          </div>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C9A34E]/25" />
        </div>

        <p className="text-[7px] font-medium uppercase tracking-[0.2em] text-[#9A8560]" style={{ fontFamily: "var(--font-cinzel)" }}>
          Request the pleasure of your company
        </p>

        {/* Date panel */}
        <div className="mt-3 rounded-lg border border-[#C9A34E]/12 bg-[#C9A34E]/[0.04] px-5 py-2.5">
          <p className="text-[12px] font-light text-[#5A4D3A]" style={{ fontFamily: "var(--font-cormorant)" }}>
            Saturday, the Fifteenth of June
          </p>
          <p className="text-[9px] tracking-[0.1em] text-[#9A8560]" style={{ fontFamily: "var(--font-cormorant)" }}>
            Two Thousand Twenty Six
          </p>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-[#C9A34E]/40" fill="currentColor"><path d="M6 1 L7 4.5 L11 5 L8 7.5 L9 11 L6 9 L3 11 L4 7.5 L1 5 L5 4.5Z" /></svg>
          <p className="text-[7px] uppercase tracking-[0.15em] text-[#B8A080]" style={{ fontFamily: "var(--font-montserrat)" }}>
            The Rosewater Estate, Toronto
          </p>
          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-[#C9A34E]/40" fill="currentColor"><path d="M6 1 L7 4.5 L11 5 L8 7.5 L9 11 L6 9 L3 11 L4 7.5 L1 5 L5 4.5Z" /></svg>
        </div>

        {/* Bottom ornament */}
        <div className="mt-2 flex items-center gap-1 text-[#C9A34E]/25">
          <div className="h-px w-8 bg-[#C9A34E]/20" />
          <span className="text-[7px]">✦</span>
          <div className="h-px w-8 bg-[#C9A34E]/20" />
        </div>
      </div>

      {/* Edge glow */}
      <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_40px_rgba(201,163,78,0.06),inset_0_1px_0_rgba(255,255,255,0.5)]" />
    </div>
  );
}

/* ── Card 2: Business Card ── */
function BusinessCard() {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-[#111111] via-[#1A1A1A] to-[#0A0A0A] p-7">
      {/* Diagonal pinstripe texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 4px, #fff 4px, #fff 5px)" }} />

      {/* Top gold line */}
      <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A34E] to-transparent opacity-50" />
      {/* Bottom subtle line */}
      <div className="absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-[#C9A34E]/15 to-transparent" />

      {/* Content top */}
      <div className="relative z-10">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#C9A34E] to-[#DBBD6A] shadow-lg shadow-[#C9A34E]/20">
            <span className="text-[14px] font-bold text-white" style={{ fontFamily: "var(--font-cinzel)" }}>A</span>
          </div>
          <div>
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#DBBD6A]" style={{ fontFamily: "var(--font-cinzel)" }}>
              Aurelius & Co.
            </span>
            <div className="mt-1 h-px w-14 bg-gradient-to-r from-[#C9A34E]/40 to-transparent" />
          </div>
        </div>
      </div>

      {/* Content bottom */}
      <div className="relative z-10">
        <h3 className="text-[20px] font-bold tracking-wide text-white" style={{ fontFamily: "var(--font-playfair)" }}>
          Aman Gupta
        </h3>
        <p className="mt-1 text-[8px] font-medium uppercase tracking-[0.2em] text-[#C9A34E]" style={{ fontFamily: "var(--font-montserrat)" }}>
          Managing Director
        </p>

        <div className="mt-4 h-px w-full bg-gradient-to-r from-[#C9A34E]/20 via-[#C9A34E]/10 to-transparent" />

        <div className="mt-3 grid grid-cols-[auto_1fr] gap-x-2.5 gap-y-2">
          {[
            { icon: "✉", text: "aman@aurelius.co" },
            { icon: "☎", text: "+1 (647) 555-0123" },
            { icon: "◎", text: "aurelius.co" },
          ].map((item) => (
            <div key={item.text} className="contents">
              <span className="text-[7px] text-[#C9A34E]/50">{item.icon}</span>
              <p className="text-[8px] tracking-wider text-[#999]">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Edge highlights */}
      <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-1px_0_rgba(201,163,78,0.08)]" />
    </div>
  );
}

/* ── Card 3: Event / Gala Card ── */
function EventCard() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#0D1117] via-[#161B26] to-[#0A0E14] text-center">
      {/* Radial glow */}
      <div className="absolute top-[40%] left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A34E]/6 blur-[70px]" />
      {/* Secondary glow */}
      <div className="absolute bottom-[20%] left-[30%] h-32 w-32 rounded-full bg-[#1A3A5C]/15 blur-[50px]" />

      {/* Particle dots */}
      {[
        "top-[12%] left-[18%] h-1 w-1 opacity-30",
        "top-[22%] right-[25%] h-0.5 w-0.5 opacity-20",
        "top-[65%] left-[15%] h-0.5 w-0.5 opacity-25",
        "bottom-[18%] right-[20%] h-1 w-1 opacity-20",
        "top-[40%] right-[12%] h-0.5 w-0.5 opacity-15",
        "bottom-[35%] left-[25%] h-0.5 w-0.5 opacity-20",
      ].map((cls, i) => (
        <div key={i} className={`absolute rounded-full bg-[#C9A34E] ${cls}`} />
      ))}

      {/* Corner L-brackets */}
      <div className="absolute top-4 left-4 h-8 w-8 border-t border-l border-[#C9A34E]/20" />
      <div className="absolute top-4 right-4 h-8 w-8 border-t border-r border-[#C9A34E]/20" />
      <div className="absolute bottom-4 left-4 h-8 w-8 border-b border-l border-[#C9A34E]/20" />
      <div className="absolute right-4 bottom-4 h-8 w-8 border-r border-b border-[#C9A34E]/20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-5">
        <EventIcon className="mb-2 h-10 w-10" />

        <p className="text-[7px] font-medium uppercase tracking-[0.3em] text-[#C9A34E]/45" style={{ fontFamily: "var(--font-cinzel)" }}>
          You are invited to
        </p>

        <div className="my-2 h-px w-20 bg-gradient-to-r from-transparent via-[#C9A34E]/20 to-transparent" />

        <h3 className="text-[22px] font-bold tracking-wide text-white/90" style={{ fontFamily: "var(--font-playfair)" }}>
          Midnight Gala
        </h3>
        <p className="mt-1 text-[9px] font-light tracking-[0.15em] text-[#C9A34E]/60" style={{ fontFamily: "var(--font-cormorant)" }}>
          An Evening of Art & Elegance
        </p>

        <div className="my-3 flex items-center gap-2">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#C9A34E]/20" />
          <div className="h-1.5 w-1.5 rotate-45 border border-[#C9A34E]/30 bg-[#C9A34E]/10" />
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#C9A34E]/20" />
        </div>

        {/* Date & time panel */}
        <div className="rounded-lg border border-[#C9A34E]/10 bg-[#C9A34E]/[0.04] px-5 py-2.5">
          <p className="text-[11px] font-light tracking-wider text-[#C5D0E0]/60" style={{ fontFamily: "var(--font-cormorant)" }}>
            November 28, 2026
          </p>
          <p className="mt-0.5 text-[8px] uppercase tracking-[0.15em] text-[#C9A34E]/35" style={{ fontFamily: "var(--font-montserrat)" }}>
            8:00 PM · Black Tie
          </p>
        </div>

        <p className="mt-3 text-[7px] uppercase tracking-[0.15em] text-[#6A8AAE]/35" style={{ fontFamily: "var(--font-montserrat)" }}>
          The Crystal Pavilion · Vancouver
        </p>
      </div>

      {/* Edge light */}
      <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(201,163,78,0.08),inset_0_-1px_0_rgba(201,163,78,0.04)]" />
    </div>
  );
}

/* ── Card 4: Personal Identity Card ── */
function PersonalCard() {
  return (
    <div className="relative flex h-full w-full flex-col items-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#FDFBF7] via-[#F8F3EA] to-[#F0E8D8]">
      {/* Texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Ccircle cx='2' cy='2' r='0.3'/%3E%3C/g%3E%3C/svg%3E\")" }} />

      {/* Gold accent top */}
      <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-[#C9A34E]/15 via-[#C9A34E]/40 to-[#C9A34E]/15" />

      {/* Border */}
      <div className="absolute inset-3 rounded-xl border border-[#C9A34E]/10" />

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 py-8">
        {/* Avatar */}
        <div className="relative mb-3">
          <div className="h-16 w-16 rounded-full border-2 border-[#C9A34E]/25 bg-gradient-to-br from-[#C9A34E]/15 to-[#DBBD6A]/10 p-[3px]">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-[#F8F3EA]">
              <span className="text-[20px] font-bold text-[#C9A34E]/60" style={{ fontFamily: "var(--font-playfair)" }}>N</span>
            </div>
          </div>
          {/* Online indicator */}
          <div className="absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-[#F8F3EA] bg-[#4CAF50]" />
        </div>

        <h3 className="text-[18px] font-bold text-[#1A1A1A]" style={{ fontFamily: "var(--font-playfair)" }}>
          Nisha Patel
        </h3>
        <p className="mt-0.5 text-[8px] font-medium uppercase tracking-[0.15em] text-[#C9A34E]" style={{ fontFamily: "var(--font-montserrat)" }}>
          Brand Strategist
        </p>

        <div className="mt-3 h-px w-20 bg-gradient-to-r from-transparent via-[#C9A34E]/20 to-transparent" />

        <p className="mt-3 max-w-[180px] text-center text-[8px] leading-relaxed text-[#8B7355]" style={{ fontFamily: "var(--font-cormorant)" }}>
          Crafting narratives that connect brands with the people who matter most.
        </p>

        {/* Social row */}
        <div className="mt-4 flex items-center gap-3">
          {["in", "𝕏", "◉"].map((icon, i) => (
            <div key={i} className="flex h-7 w-7 items-center justify-center rounded-full border border-[#C9A34E]/15 bg-[#C9A34E]/[0.04] text-[8px] font-bold text-[#C9A34E]/50">
              {icon}
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-2">
          <div className="h-0.5 w-0.5 rounded-full bg-[#C9A34E]/30" />
          <p className="text-[7px] tracking-wider text-[#8B7355]">nisha.patel.co</p>
          <div className="h-0.5 w-0.5 rounded-full bg-[#C9A34E]/30" />
        </div>
      </div>

      {/* Edge glow */}
      <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_25px_rgba(201,163,78,0.05),inset_0_1px_0_rgba(255,255,255,0.6)]" />
    </div>
  );
}

/* ── Card 5: Royal Dark Wedding ── */
function RoyalWeddingCard() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#0C1520] via-[#101D2E] to-[#08101A] text-center">
      {/* Center radial glow */}
      <div className="absolute top-[45%] left-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A34E]/6 blur-[65px]" />

      {/* Corner L-brackets */}
      <div className="absolute top-4 left-4 h-10 w-10 border-t border-l border-[#C9A34E]/25" />
      <div className="absolute top-4 right-4 h-10 w-10 border-t border-r border-[#C9A34E]/25" />
      <div className="absolute bottom-4 left-4 h-10 w-10 border-b border-l border-[#C9A34E]/25" />
      <div className="absolute right-4 bottom-4 h-10 w-10 border-r border-b border-[#C9A34E]/25" />

      {/* Inner frame */}
      <div className="absolute inset-6 rounded-lg border border-[#C9A34E]/8" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-5">
        {/* Crown */}
        <div className="mb-1 text-[14px] text-[#C9A34E]/35">♛</div>

        <p className="text-[7px] font-medium uppercase tracking-[0.3em] text-[#C9A34E]/40" style={{ fontFamily: "var(--font-cinzel)" }}>
          You are cordially invited
        </p>

        <div className="my-2 flex items-center gap-2">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#C9A34E]/25" />
          <div className="h-1 w-1 rotate-45 bg-[#C9A34E]/25" />
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#C9A34E]/25" />
        </div>

        <p className="text-[7px] tracking-[0.12em] text-[#7A9CC6]/40" style={{ fontFamily: "var(--font-montserrat)" }}>
          to the wedding celebration of
        </p>

        {/* Couple illustration */}
        <CoupleIllustration className="my-1 h-[40px] w-[55px] opacity-70" />

        <h3 className="text-[26px] leading-tight text-[#E8DCC8]" style={{ fontFamily: "var(--font-great-vibes)" }}>
          Rahul <span className="text-[#DBBD6A]">&</span> Simran
        </h3>

        <div className="my-2 flex items-center gap-2">
          <div className="h-px w-14 bg-gradient-to-r from-transparent to-[#C9A34E]/20" />
          <span className="text-[7px] text-[#C9A34E]/30">⟡</span>
          <div className="h-px w-14 bg-gradient-to-l from-transparent to-[#C9A34E]/20" />
        </div>

        <div className="rounded-lg border border-[#C9A34E]/8 bg-[#C9A34E]/[0.04] px-4 py-2">
          <p className="text-[11px] font-light tracking-wider text-[#C5D5E8]/60" style={{ fontFamily: "var(--font-cormorant)" }}>
            December 12, 2026
          </p>
          <p className="mt-0.5 text-[7px] uppercase tracking-[0.12em] text-[#7A9CC6]/35" style={{ fontFamily: "var(--font-montserrat)" }}>
            at Five O&apos;Clock in the Evening
          </p>
        </div>

        <p className="mt-2.5 text-[7px] uppercase tracking-[0.12em] text-[#C9A34E]/30" style={{ fontFamily: "var(--font-montserrat)" }}>
          The Grand Palace · Jaipur
        </p>
      </div>

      {/* Edge glow */}
      <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(201,163,78,0.08),inset_0_-1px_0_rgba(201,163,78,0.04)]" />
    </div>
  );
}

/* ================================================================== */
/*  Card configs                                                      */
/* ================================================================== */

const SHOWCASE_CARDS = [
  { id: 0, Component: WeddingCard,      title: "Wedding Invitation" },
  { id: 1, Component: BusinessCard,     title: "Business Card" },
  { id: 2, Component: EventCard,        title: "Event Invitation" },
  { id: 3, Component: PersonalCard,     title: "Personal Card" },
  { id: 4, Component: RoyalWeddingCard, title: "Royal Wedding" },
];

/* Position configs for each card relative to spotlight (center = focused) */
const POSITIONS = [
  // center (focused)
  { x: 0,    y: 0,   scale: 1,    rotate: 0,   z: 40, opacity: 1,    blur: 0 },
  // right
  { x: 320,  y: 20,  scale: 0.75, rotate: 6,   z: 20, opacity: 0.55, blur: 1 },
  // left
  { x: -320, y: 15,  scale: 0.75, rotate: -5,  z: 20, opacity: 0.55, blur: 1 },
  // far right
  { x: 560,  y: 40,  scale: 0.6,  rotate: 10,  z: 10, opacity: 0.3,  blur: 3 },
  // far left
  { x: -560, y: 35,  scale: 0.6,  rotate: -9,  z: 10, opacity: 0.3,  blur: 3 },
];

/* ================================================================== */
/*  Main hero                                                         */
/* ================================================================== */

export function FloatingCardsHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Auto-rotate every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SHOWCASE_CARDS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleCardClick = useCallback((cardId: number) => {
    setActiveIndex(cardId);
  }, []);

  // Map each card to a position based on its distance from activeIndex
  function getPosition(cardIndex: number) {
    const total = SHOWCASE_CARDS.length;
    let diff = cardIndex - activeIndex;
    // Wrap around for shortest path
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    // Map diff to position slot
    if (diff === 0) return POSITIONS[0]!; // center
    if (diff === 1) return POSITIONS[1]!; // right
    if (diff === -1) return POSITIONS[2]!; // left
    if (diff === 2 || diff === -(total - 2)) return POSITIONS[3]!; // far right
    return POSITIONS[4]!; // far left
  }

  return (
    <section className="relative flex min-h-screen flex-col items-center overflow-hidden pt-28 pb-12">
      {/* ── Background ── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 50% 45%, rgba(184,134,11,0.06) 0%, transparent 70%),
              radial-gradient(ellipse 40% 30% at 30% 35%, rgba(212,168,67,0.04) 0%, transparent 60%),
              radial-gradient(ellipse 40% 30% at 70% 60%, rgba(26,26,26,0.03) 0%, transparent 60%)
            `,
          }}
        />
      </div>

      {/* ── Badge ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-5 px-6"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-[#B8860B]/20 bg-[#B8860B]/8 px-4 py-1.5 text-sm font-medium text-[#8B7355] backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5 text-[#B8860B]" />
          100% Free Business Cards &amp; Wedding Invitations
        </span>
      </motion.div>

      {/* ── Headline ── */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="px-6 text-center text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Your Digital Identity,{" "}
        <span className="bg-gradient-to-r from-[#B8860B] to-[#D4A843] bg-clip-text text-transparent">
          Beautifully Crafted
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mx-auto mt-4 max-w-lg px-6 text-center text-base text-muted-foreground md:text-lg"
      >
        Stunning business cards, wedding invitations &amp; cinematic animated
        invites — explore our designs.
      </motion.p>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  SPOTLIGHT CARD SHOWCASE                                    */}
      {/* ════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative mt-10 flex w-full flex-1 items-center justify-center md:mt-14"
        style={{ minHeight: 360 }}
      >
        {/* Glow behind focused card */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: 400,
            height: 300,
            background: "radial-gradient(ellipse, rgba(201,163,78,0.12) 0%, rgba(219,189,106,0.05) 40%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />

        {/* Cards */}
        {SHOWCASE_CARDS.map((card) => {
          const pos = getPosition(card.id);
          const isFocused = card.id === activeIndex;
          const isHovered = hoveredId === card.id;

          return (
            <motion.div
              key={card.id}
              className="absolute cursor-pointer select-none"
              style={{
                width: 280,
                height: 380,
                zIndex: isHovered ? 50 : pos.z,
              }}
              animate={{
                x: pos.x,
                y: isFocused ? [0, -6, 0] : pos.y,
                scale: isHovered && !isFocused ? pos.scale * 1.08 : pos.scale,
                rotate: pos.rotate,
                opacity: pos.opacity,
                filter: `blur(${pos.blur}px)`,
              }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
                mass: 1,
                ...(isFocused && {
                  y: {
                    repeat: Infinity,
                    duration: 3.5,
                    ease: "easeInOut",
                  },
                }),
              }}
              onClick={() => handleCardClick(card.id)}
              onHoverStart={() => setHoveredId(card.id)}
              onHoverEnd={() => setHoveredId(null)}
              whileHover={
                isFocused
                  ? { y: -12, scale: 1.02, transition: { type: "spring", stiffness: 200, damping: 15 } }
                  : undefined
              }
            >
              <div
                className={`h-full w-full overflow-hidden rounded-2xl border transition-all duration-500 ${
                  isFocused
                    ? "border-[#C9A34E]/25 shadow-[0_30px_90px_-10px_rgba(201,163,78,0.35),0_0_0_1px_rgba(201,163,78,0.12)]"
                    : "border-[#E8E4DE]/40 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,0,0,0.05)]"
                } ${isHovered && !isFocused ? "border-[#C9A34E]/15 shadow-[0_25px_70px_-10px_rgba(201,163,78,0.2)]" : ""}`}
              >
                <card.Component />
              </div>
              {/* Label under focused card */}
              <AnimatePresence>
                {isFocused && (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 text-center text-xs font-medium text-muted-foreground"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {card.title}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Dot indicators */}
      <div className="mt-6 flex items-center gap-2">
        {SHOWCASE_CARDS.map((card) => (
          <button
            key={card.id}
            onClick={() => setActiveIndex(card.id)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              card.id === activeIndex
                ? "w-6 bg-[#C9A34E]"
                : "w-1.5 bg-muted-foreground/25 hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>

      {/* ── CTAs ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-8 flex flex-col items-center gap-4 px-6 sm:flex-row"
      >
        <MagneticButton strength={0.3}>
          <Link href="/signup">
            <Button
              size="lg"
              className="min-w-[200px] gap-2 bg-gradient-to-r from-[#B8860B] to-[#D4A843] text-base text-white hover:from-[#9A7209] hover:to-[#B8960B]"
            >
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </MagneticButton>
        <MagneticButton strength={0.2}>
          <Link href="/login">
            <Button
              size="lg"
              variant="outline"
              className="min-w-[200px] border-[#B8860B]/30 text-base text-[#1A1A1A] hover:bg-[#B8860B]/8"
            >
              Sign In
            </Button>
          </Link>
        </MagneticButton>
      </motion.div>
    </section>
  );
}
