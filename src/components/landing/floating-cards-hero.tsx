"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/animated-invite/shared/magnetic-button";

/* ================================================================== */
/*  5 artwork-level cards — each a different Cardora capability       */
/* ================================================================== */

/* noise texture as inline data URI — shared across cards */
const GRAIN = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='a'%3E%3CfeTurbulence baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23a)' opacity='.4'/%3E%3C/svg%3E\")";

/* ─── 1. WEDDING — Cinematic night scene (HERO) ─── */
function WeddingCard() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[18px] border border-[#D4AF37]/15 shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
      {/* Warm peach base — darker than before */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F6E3D7] via-[#F0D4C2] via-[50%] to-[#E8C1B0]" />
      {/* Subtle warm bloom */}
      <div className="absolute top-[8%] left-1/2 h-36 w-48 -translate-x-1/2 rounded-full bg-[#FFF5EC]/40 blur-[45px]" />
      {/* Vignette — stronger deep brown edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_48%,transparent_40%,rgba(58,31,26,0.14)_100%)]" />
      {/* Paper grain */}
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: GRAIN }} />

      {/* ── Top floral — LEFT ── */}
      <svg viewBox="0 0 100 130" className="absolute -top-1 -left-1 h-[34%] w-auto" fill="none">
        <circle cx="28" cy="30" r="16" fill="#D45570" fillOpacity="0.55" />
        <circle cx="28" cy="30" r="10" fill="#B83E55" fillOpacity="0.35" />
        <circle cx="28" cy="30" r="4" fill="#9A2840" fillOpacity="0.22" />
        <circle cx="52" cy="50" r="11" fill="#E8826A" fillOpacity="0.45" />
        <circle cx="52" cy="50" r="6" fill="#D06850" fillOpacity="0.25" />
        <circle cx="15" cy="55" r="7" fill="#F4A0B0" fillOpacity="0.38" />
        <path d="M60 28 Q72 22 68 42 Q62 36 60 28Z" fill="#5A7A4E" fillOpacity="0.32" />
        <path d="M5 38 Q-2 30 10 24 Q14 32 5 38Z" fill="#5A7A4E" fillOpacity="0.25" />
        <path d="M38 65 Q48 58 48 72 Q40 68 38 65Z" fill="#6B8F5E" fillOpacity="0.20" />
      </svg>

      {/* ── Top floral — RIGHT ── */}
      <svg viewBox="0 0 100 130" className="absolute -top-1 -right-1 h-[34%] w-auto -scale-x-100" fill="none">
        <circle cx="28" cy="30" r="16" fill="#E8826A" fillOpacity="0.50" />
        <circle cx="28" cy="30" r="10" fill="#D06850" fillOpacity="0.28" />
        <circle cx="28" cy="30" r="4" fill="#B85040" fillOpacity="0.20" />
        <circle cx="52" cy="50" r="11" fill="#F4A0B0" fillOpacity="0.42" />
        <circle cx="52" cy="50" r="6" fill="#D87888" fillOpacity="0.22" />
        <circle cx="15" cy="55" r="7" fill="#FFAB91" fillOpacity="0.32" />
        <path d="M60 28 Q72 22 68 42 Q62 36 60 28Z" fill="#6B8F5E" fillOpacity="0.26" />
        <path d="M5 38 Q-2 30 10 24 Q14 32 5 38Z" fill="#6B8F5E" fillOpacity="0.22" />
        <path d="M38 65 Q48 58 48 72 Q40 68 38 65Z" fill="#5A7A4E" fillOpacity="0.18" />
      </svg>

      {/* ── Bottom florals ── */}
      <svg viewBox="0 0 300 50" preserveAspectRatio="xMidYMax slice" className="absolute bottom-0 left-0 w-full" fill="none">
        <circle cx="25" cy="38" r="12" fill="#D45570" fillOpacity="0.40" />
        <circle cx="25" cy="38" r="6" fill="#B83E55" fillOpacity="0.20" />
        <circle cx="55" cy="44" r="7" fill="#FFAB91" fillOpacity="0.30" />
        <circle cx="275" cy="38" r="12" fill="#E8826A" fillOpacity="0.38" />
        <circle cx="275" cy="38" r="6" fill="#D06850" fillOpacity="0.18" />
        <circle cx="245" cy="44" r="7" fill="#F4A0B0" fillOpacity="0.28" />
        <path d="M42 30 Q50 24 50 38 Q44 35 42 30Z" fill="#5A7A4E" fillOpacity="0.25" />
        <path d="M258 30 Q266 24 266 38 Q260 35 258 30Z" fill="#6B8F5E" fillOpacity="0.22" />
      </svg>

      {/* ── Petals ── */}
      {[
        { l: 10, t: 42, c: "#D45570", r: 25, sz: 9 },
        { l: 86, t: 46, c: "#E8826A", r: -18, sz: 8 },
        { l: 20, t: 56, c: "#F4A0B0", r: 35, sz: 7 },
        { l: 78, t: 52, c: "#FFAB91", r: -28, sz: 8 },
      ].map((p, i) => (
        <svg key={`petal${i}`} viewBox="0 0 12 16" className="absolute" style={{ left: `${p.l}%`, top: `${p.t}%`, width: p.sz, height: p.sz * 1.3, opacity: 0.30, transform: `rotate(${p.r}deg)` }}>
          <path d="M6 0 Q10 4 10 10 Q8 14 6 16 Q4 14 2 10 Q2 4 6 0Z" fill={p.c} />
        </svg>
      ))}

      {/* ── Gold arch frame — slightly stronger ── */}
      <svg viewBox="0 0 200 320" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full" fill="none">
        <path d="M40 310 L40 120 Q40 50 100 40 Q160 50 160 120 L160 310" stroke="#D4AF37" strokeWidth="0.6" strokeOpacity="0.28" />
        <path d="M50 305 L50 125 Q50 60 100 50 Q150 60 150 125 L150 305" stroke="#D4AF37" strokeWidth="0.35" strokeOpacity="0.15" />
        {/* Arch fill — very subtle tinted shape for depth */}
        <path d="M50 305 L50 125 Q50 60 100 50 Q150 60 150 125 L150 305Z" fill="#3A1F1A" fillOpacity="0.015" />
        <circle cx="100" cy="38" r="3.5" fill="#D4AF37" fillOpacity="0.22" />
        <path d="M92 40 L100 33 L108 40" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.20" fill="none" />
        {/* Small gold dots on arch */}
        <circle cx="40" cy="200" r="1.5" fill="#D4AF37" fillOpacity="0.12" />
        <circle cx="160" cy="200" r="1.5" fill="#D4AF37" fillOpacity="0.12" />
      </svg>

      {/* ── Couple silhouette ── */}
      <svg viewBox="0 0 120 130" className="absolute bottom-[14%] left-1/2 h-[120px] -translate-x-1/2">
        <ellipse cx="60" cy="126" rx="35" ry="3" fill="#3A1F1A" fillOpacity="0.06" />
        {/* Groom */}
        <circle cx="44" cy="28" r="12" fill="#3A1F1A" fillOpacity="0.55" />
        <path d="M28 125 L32 55 Q32 40 44 40 Q56 40 56 55 L60 125" fill="#3A1F1A" fillOpacity="0.50" />
        <path d="M35 22 Q44 14 53 22 Q53 28 44 30 Q35 28 35 22Z" fill="#D4AF37" fillOpacity="0.35" />
        <path d="M38 58 L50 58 L48 68 L40 68Z" fill="#D4AF37" fillOpacity="0.20" />
        {/* Bride */}
        <circle cx="76" cy="28" r="12" fill="#4A1525" fillOpacity="0.50" />
        <path d="M56 125 L60 52 Q60 40 76 40 Q92 40 92 52 L100 125 Q76 115 56 125Z" fill="#4A1525" fillOpacity="0.45" />
        <path d="M76 18 Q95 14 100 42 Q90 34 76 28" fill="#D45570" fillOpacity="0.20" />
        <circle cx="76" cy="24" r="1.5" fill="#D4AF37" fillOpacity="0.50" />
        {/* Garland */}
        <path d="M56 62 Q68 76 80 62" stroke="#D45570" strokeOpacity="0.45" strokeWidth="1" fill="none" />
        <circle cx="62" cy="71" r="1.8" fill="#E8826A" fillOpacity="0.38" />
        <circle cx="68" cy="74" r="2" fill="#D45570" fillOpacity="0.32" />
        <circle cx="74" cy="71" r="1.8" fill="#F4A0B0" fillOpacity="0.35" />
      </svg>

      {/* ── Content ── */}
      <div className="relative z-10 mt-auto flex w-full flex-col items-center px-5 pb-5">
        <p className="text-[7px] font-medium uppercase tracking-[0.4em] text-[#3A1F1A]/55" style={{ fontFamily: "var(--font-cinzel)" }}>
          Together with their families
        </p>
        <h3 className="mt-2 text-[30px] leading-tight text-[#2A0E0E]" style={{ fontFamily: "var(--font-great-vibes)" }}>
          Aarav <span className="text-[#D4AF37]">&</span> Priya
        </h3>
        <div className="my-1.5 flex items-center gap-2">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]/45" />
          <span className="text-[7px] text-[#D4AF37]/65">✦</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]/45" />
        </div>
        <p className="rounded-full border border-[#D4AF37]/25 bg-white/45 px-5 py-1.5 text-[10px] font-light tracking-wider text-[#3A1F1A]/70 shadow-[0_2px_10px_rgba(58,31,26,0.06)] backdrop-blur-sm" style={{ fontFamily: "var(--font-cormorant)" }}>
          June 15, 2026 · Six in the Evening
        </p>
        <p className="mt-2 text-[7px] uppercase tracking-[0.15em] text-[#3A1F1A]/40" style={{ fontFamily: "var(--font-montserrat)" }}>
          The Rosewater Estate · Toronto
        </p>
      </div>

      {/* Inner edge highlight */}
      <div className="absolute inset-0 rounded-[18px] shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-1px_0_rgba(58,31,26,0.06)]" />
    </div>
  );
}

/* ─── 2. BUSINESS CARD — Marble & gold texture ─── */
function BusinessCard() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[18px]">
      {/* Dark marble base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] via-[#222] to-[#111]" />
      {/* Marble veins */}
      <svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full opacity-[0.04]">
        <path d="M-20 50 Q80 80 150 30 Q220 -10 320 60" stroke="white" strokeWidth="0.8" fill="none" />
        <path d="M-20 120 Q100 160 180 100 Q260 50 340 130" stroke="white" strokeWidth="0.5" fill="none" />
        <path d="M-10 220 Q90 190 170 240 Q250 280 330 210" stroke="white" strokeWidth="0.6" fill="none" />
        <path d="M-20 320 Q70 290 160 340 Q250 380 340 310" stroke="white" strokeWidth="0.4" fill="none" />
      </svg>
      {/* Gold edge accent */}
      <div className="absolute top-0 right-0 left-0 h-[2.5px] bg-gradient-to-r from-[#C9A34E]/0 via-[#C9A34E]/60 to-[#C9A34E]/0" />
      <div className="absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-[#C9A34E]/12 to-transparent" />
      {/* Grain */}
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: GRAIN }} />
      {/* Corner glow */}
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[#C9A34E]/[0.04] blur-[40px]" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-7">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#C9A34E] to-[#DBBD6A] shadow-[0_4px_20px_rgba(201,163,78,0.25)]">
            <span className="text-[14px] font-bold text-white" style={{ fontFamily: "var(--font-cinzel)" }}>A</span>
          </div>
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#DBBD6A]" style={{ fontFamily: "var(--font-cinzel)" }}>Aurelius & Co.</p>
            <div className="mt-0.5 h-px w-14 bg-gradient-to-r from-[#C9A34E]/35 to-transparent" />
          </div>
        </div>

        <div>
          <h3 className="text-[20px] font-bold tracking-wide text-white/95" style={{ fontFamily: "var(--font-playfair)" }}>Aman Gupta</h3>
          <p className="mt-0.5 text-[7px] font-medium uppercase tracking-[0.22em] text-[#C9A34E]/80" style={{ fontFamily: "var(--font-montserrat)" }}>Managing Director</p>
          <div className="mt-4 h-px w-full bg-gradient-to-r from-[#C9A34E]/15 via-[#C9A34E]/8 to-transparent" />
          <div className="mt-3 space-y-1.5">
            {[
              { i: "✉", t: "aman@aurelius.co" },
              { i: "☎", t: "+1 (647) 555-0123" },
              { i: "◎", t: "aurelius.co" },
            ].map((c) => (
              <div key={c.t} className="flex items-center gap-2">
                <span className="text-[6px] text-[#C9A34E]/35">{c.i}</span>
                <p className="text-[7px] tracking-wider text-white/35">{c.t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edge glow */}
      <div className="absolute inset-0 rounded-[18px] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-1px_0_rgba(201,163,78,0.06)]" />
    </div>
  );
}

/* ─── 3. ANIMATED INVITE — Aurora / northern lights ─── */
function AnimatedInviteCard() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[18px]">
      {/* Deep space base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06001A] via-[#0D0833] to-[#030012]" />
      {/* Aurora layers */}
      <div className="absolute top-0 left-0 right-0 h-[60%] bg-gradient-to-b from-[#7B2FF7]/[0.12] via-[#2DD4BF]/[0.06] to-transparent" />
      <div className="absolute top-[5%] left-[10%] h-[40%] w-[80%] rounded-full bg-gradient-to-r from-[#C084FC]/[0.08] via-[#22D3EE]/[0.05] to-[#F472B6]/[0.06] blur-[50px]" />
      <div className="absolute top-[15%] left-[20%] h-[25%] w-[60%] rounded-full bg-gradient-to-r from-[#34D399]/[0.06] to-[#818CF8]/[0.04] blur-[40px]" />
      {/* Stars */}
      {[[15, 10], [40, 6], [70, 14], [85, 8], [55, 18], [25, 22], [90, 20]].map(([l, t], i) => (
        <div key={i} className="absolute h-px w-px rounded-full bg-white" style={{ left: `${l}%`, top: `${t}%`, opacity: 0.15 + (i % 4) * 0.08 }} />
      ))}
      {/* Grain */}
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: GRAIN }} />

      {/* Animated wave lines */}
      <svg viewBox="0 0 280 100" preserveAspectRatio="none" className="absolute top-[8%] left-0 h-[35%] w-full opacity-[0.06]" fill="none">
        <path d="M0 50 Q70 20 140 50 Q210 80 280 50" stroke="#C084FC" strokeWidth="1" />
        <path d="M0 60 Q70 35 140 60 Q210 85 280 60" stroke="#22D3EE" strokeWidth="0.7" />
        <path d="M0 70 Q70 45 140 70 Q210 95 280 70" stroke="#34D399" strokeWidth="0.5" />
      </svg>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-5 text-center">
        {/* Play button with glow */}
        <div className="relative mb-4">
          <div className="absolute inset-0 scale-150 rounded-full bg-[#7B2FF7]/10 blur-[15px]" />
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] backdrop-blur-md">
            <svg viewBox="0 0 16 16" className="ml-0.5 h-4 w-4 text-white/80" fill="currentColor"><path d="M4 2 L14 8 L4 14Z" /></svg>
          </div>
        </div>

        <p className="text-[6px] font-bold uppercase tracking-[0.5em] text-[#C084FC]/50" style={{ fontFamily: "var(--font-montserrat)" }}>
          Animated Invitation
        </p>
        <h3 className="mt-2 text-[24px] font-bold text-white/90" style={{ fontFamily: "var(--font-playfair)" }}>
          Cinematic
        </h3>
        <p className="mt-0.5 text-[9px] font-light italic tracking-wider text-[#C084FC]/35" style={{ fontFamily: "var(--font-cormorant)" }}>
          Music · Parallax · Interactive RSVP
        </p>

        <div className="mt-5 flex items-center gap-2">
          {[
            { icon: "♫", color: "from-[#7B2FF7]/15 to-[#7B2FF7]/5", border: "border-[#7B2FF7]/15" },
            { icon: "✦", color: "from-[#22D3EE]/15 to-[#22D3EE]/5", border: "border-[#22D3EE]/15" },
            { icon: "↗", color: "from-[#F472B6]/15 to-[#F472B6]/5", border: "border-[#F472B6]/15" },
          ].map((b, i) => (
            <div key={i} className={`flex h-7 w-7 items-center justify-center rounded-full border bg-gradient-to-b ${b.color} ${b.border} text-[8px] text-white/40`}>
              {b.icon}
            </div>
          ))}
        </div>
        <p className="mt-3 text-[6.5px] tracking-[0.1em] text-white/20" style={{ fontFamily: "var(--font-montserrat)" }}>17 cinematic templates</p>
      </div>
    </div>
  );
}

/* ─── 4. ANALYTICS — Emerald dashboard in glass card ─── */
function AnalyticsCard() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[18px]">
      {/* Rich dark green base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#071A12] via-[#0D2818] to-[#061210]" />
      {/* Ambient glow */}
      <div className="absolute top-[20%] left-[30%] h-40 w-40 rounded-full bg-emerald-500/[0.06] blur-[50px]" />
      <div className="absolute bottom-[10%] right-[20%] h-28 w-28 rounded-full bg-[#C9A34E]/[0.04] blur-[40px]" />
      {/* Grain */}
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: GRAIN }} />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col p-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-400/70 shadow-[0_0_6px_rgba(52,211,153,0.3)]" />
            <p className="text-[7px] font-semibold uppercase tracking-[0.18em] text-emerald-300/50" style={{ fontFamily: "var(--font-montserrat)" }}>Analytics</p>
          </div>
          <div className="rounded-full bg-emerald-500/[0.08] px-2 py-0.5 text-[5px] font-medium uppercase tracking-[0.15em] text-emerald-300/40" style={{ fontFamily: "var(--font-montserrat)" }}>Live</div>
        </div>

        {/* Big stat */}
        <div className="mt-4">
          <p className="text-[6px] uppercase tracking-[0.15em] text-white/25" style={{ fontFamily: "var(--font-montserrat)" }}>Total Views</p>
          <div className="flex items-end gap-2">
            <p className="text-[30px] font-bold leading-none text-white/90" style={{ fontFamily: "var(--font-raleway)" }}>2,847</p>
            <span className="mb-1 text-[8px] font-medium text-emerald-400/60">↑ 24%</span>
          </div>
        </div>

        {/* Chart — organic curve */}
        <div className="mt-3 flex-1">
          <svg viewBox="0 0 220 60" preserveAspectRatio="none" className="h-full w-full">
            <defs>
              <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34D399" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#34D399" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 45 Q20 40 40 38 Q60 36 80 28 Q100 20 120 22 Q140 24 160 15 Q180 8 200 12 Q210 14 220 10 L220 60 L0 60Z" fill="url(#cg)" />
            <path d="M0 45 Q20 40 40 38 Q60 36 80 28 Q100 20 120 22 Q140 24 160 15 Q180 8 200 12 Q210 14 220 10" stroke="#34D399" strokeWidth="1.5" strokeOpacity="0.5" fill="none" />
            <circle cx="220" cy="10" r="2.5" fill="#34D399" fillOpacity="0.6" />
          </svg>
        </div>

        {/* Stat pills */}
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {[
            { l: "QR Scans", v: "342", c: "text-emerald-300/60" },
            { l: "NFC Taps", v: "128", c: "text-[#C9A34E]/60" },
            { l: "Shares", v: "89", c: "text-cyan-300/50" },
          ].map((s) => (
            <div key={s.l} className="rounded-lg bg-white/[0.03] px-2 py-2 text-center">
              <p className={`text-[11px] font-bold ${s.c}`} style={{ fontFamily: "var(--font-raleway)" }}>{s.v}</p>
              <p className="mt-0.5 text-[4.5px] uppercase tracking-[0.12em] text-white/20" style={{ fontFamily: "var(--font-montserrat)" }}>{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Edge */}
      <div className="absolute inset-0 rounded-[18px] shadow-[inset_0_1px_0_rgba(52,211,153,0.06)]" />
    </div>
  );
}

/* ─── 5. QR/NFC — Warm sunset paper feel ─── */
function QrShareCard() {
  return (
    <div className="relative flex h-full w-full flex-col items-center overflow-hidden rounded-[18px]">
      {/* Warm paper gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F8E8D0] via-[#F0D8B8] to-[#E8C8A0]" />
      {/* Warm glow */}
      <div className="absolute top-[30%] left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[#FF8C42]/[0.08] blur-[40px]" />
      {/* Paper grain */}
      <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: GRAIN }} />
      {/* Subtle watercolor wash */}
      <div className="absolute top-0 right-0 h-[45%] w-[50%] rounded-bl-full bg-[#E8A060]/[0.08] blur-[30px]" />
      <div className="absolute bottom-0 left-0 h-[35%] w-[45%] rounded-tr-full bg-[#C08050]/[0.06] blur-[25px]" />

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-5">
        {/* Phone mockup with QR */}
        <div className="relative rounded-2xl border border-[#1A1A1A]/[0.06] bg-white/80 p-1 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
          {/* Phone screen */}
          <div className="rounded-xl bg-gradient-to-b from-[#FDFAF5] to-white p-3">
            {/* Mini header */}
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="h-4 w-4 rounded-full bg-gradient-to-br from-[#C9A34E] to-[#DBBD6A]" />
                <p className="text-[5px] font-bold text-[#1A1A1A]/60" style={{ fontFamily: "var(--font-montserrat)" }}>Aman Gupta</p>
              </div>
              <div className="rounded-full bg-[#C9A34E]/10 px-1.5 py-0.5 text-[4px] font-bold text-[#C9A34E]">PRO</div>
            </div>
            {/* QR */}
            <svg viewBox="0 0 70 70" className="h-[62px] w-[62px]">
              <rect x="3" y="3" width="17" height="17" rx="2" fill="#1A1A1A" /><rect x="6" y="6" width="11" height="11" rx="1" fill="white" /><rect x="8.5" y="8.5" width="6" height="6" rx="0.5" fill="#1A1A1A" />
              <rect x="50" y="3" width="17" height="17" rx="2" fill="#1A1A1A" /><rect x="53" y="6" width="11" height="11" rx="1" fill="white" /><rect x="55.5" y="8.5" width="6" height="6" rx="0.5" fill="#1A1A1A" />
              <rect x="3" y="50" width="17" height="17" rx="2" fill="#1A1A1A" /><rect x="6" y="53" width="11" height="11" rx="1" fill="white" /><rect x="8.5" y="55.5" width="6" height="6" rx="0.5" fill="#1A1A1A" />
              {[[25, 5], [31, 5], [37, 5], [43, 5], [25, 11], [37, 11], [43, 11], [5, 25], [11, 25], [5, 31], [11, 31], [5, 37], [11, 37], [5, 43], [25, 25], [31, 25], [37, 25], [43, 25], [49, 25], [25, 31], [37, 31], [49, 31], [25, 37], [31, 37], [43, 37], [49, 37], [25, 43], [37, 43], [49, 49], [55, 49], [61, 49], [49, 55], [61, 55], [49, 61], [55, 61]].map(([x, y], i) => (
                <rect key={i} x={x} y={y} width="4" height="4" rx="0.5" fill="#1A1A1A" />
              ))}
              <circle cx="35" cy="35" r="5.5" fill="#C9A34E" /><circle cx="35" cy="35" r="2.5" fill="white" />
            </svg>
          </div>
        </div>

        {/* NFC waves underneath */}
        <div className="relative mt-4">
          {[30, 42, 54].map((s, i) => (
            <div key={i} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#1A1A1A]" style={{ width: s, height: s, opacity: 0.05 - i * 0.012 }} />
          ))}
          <p className="relative text-[7px] font-semibold uppercase tracking-[0.35em] text-[#5A4030]/45" style={{ fontFamily: "var(--font-montserrat)" }}>
            Scan · Tap · Share
          </p>
        </div>

        <p className="mt-2 text-[8px] font-light text-[#7A6040]/50" style={{ fontFamily: "var(--font-cormorant)" }}>
          One tap to share your identity
        </p>

        {/* Feature pills */}
        <div className="mt-3 flex items-center gap-2">
          {[
            { label: "NFC", icon: "⊙" },
            { label: "QR", icon: "⊞" },
            { label: "Link", icon: "↗" },
          ].map((f) => (
            <div key={f.label} className="flex items-center gap-1 rounded-full border border-[#1A1A1A]/[0.06] bg-white/60 px-2.5 py-1 text-[5.5px] font-medium uppercase tracking-[0.12em] text-[#5A4030]/50" style={{ fontFamily: "var(--font-montserrat)" }}>
              <span className="text-[7px]">{f.icon}</span> {f.label}
            </div>
          ))}
        </div>
      </div>

      {/* Edge */}
      <div className="absolute inset-0 rounded-[18px] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]" />
    </div>
  );
}

/* ================================================================== */
/*  Card configs                                                      */
/* ================================================================== */

const SHOWCASE_CARDS = [
  { id: 0, Component: WeddingCard,        title: "Wedding Invitation" },
  { id: 1, Component: BusinessCard,       title: "Business Card" },
  { id: 2, Component: AnimatedInviteCard, title: "Animated Invite" },
  { id: 3, Component: AnalyticsCard,      title: "Analytics Dashboard" },
  { id: 4, Component: QrShareCard,        title: "QR & NFC Sharing" },
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
