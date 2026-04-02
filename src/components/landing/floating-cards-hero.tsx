"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/animated-invite/shared/magnetic-button";

/* ================================================================== */
/*  5 crafted cards — L/D/L/D/L alternating                          */
/* ================================================================== */

const GRAIN = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='a'%3E%3CfeTurbulence baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23a)' opacity='.4'/%3E%3C/svg%3E\")";

/* ─── 1. WEDDING — Cinematic night scene (HERO) ─── */
/* ─── CARD 1: INDIAN WEDDING (Light) — Back-view couple ─── */
function WeddingCard() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[18px] shadow-[0_8px_40px_rgba(40,20,10,0.10)]">
      {/* Warm ivory base — darker than page bg to pop */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#EDE4D4] via-[#E6DAC8] to-[#DDD0BC]" />
      {/* Soft center warmth */}
      <div className="absolute top-[30%] left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#D4AF37]/[0.05] blur-[50px]" />
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_45%,rgba(60,35,20,0.10)_100%)]" />
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: GRAIN }} />

      {/* Mandap arch — soft, charcoal + gold */}
      <svg viewBox="0 0 220 130" preserveAspectRatio="xMidYMid meet" className="absolute top-[3%] left-1/2 w-[85%] -translate-x-1/2" fill="none">
        <path d="M20 130 L20 55 Q20 15 110 10 Q200 15 200 55 L200 130" stroke="#3A2A1A" strokeWidth="0.8" strokeOpacity="0.12" />
        <path d="M35 130 L35 60 Q35 25 110 18 Q185 25 185 60 L185 130" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.15" />
        {/* Dome ornament */}
        <circle cx="110" cy="8" r="3" fill="#D4AF37" fillOpacity="0.18" />
        {/* Small pillar caps */}
        <circle cx="20" cy="52" r="2" fill="#3A2A1A" fillOpacity="0.08" />
        <circle cx="200" cy="52" r="2" fill="#3A2A1A" fillOpacity="0.08" />
      </svg>

      {/* Minimal florals — top corners only */}
      <svg viewBox="0 0 60 70" className="absolute top-0 left-0 h-[18%] w-auto" fill="none">
        <circle cx="15" cy="18" r="10" fill="#C08060" fillOpacity="0.15" />
        <circle cx="30" cy="32" r="7" fill="#D4AF37" fillOpacity="0.08" />
        <path d="M35 15 Q42 10 40 25 Q36 20 35 15Z" fill="#5A7A4E" fillOpacity="0.15" />
      </svg>
      <svg viewBox="0 0 60 70" className="absolute top-0 right-0 h-[18%] w-auto -scale-x-100" fill="none">
        <circle cx="15" cy="18" r="10" fill="#C08060" fillOpacity="0.12" />
        <circle cx="30" cy="32" r="7" fill="#D4AF37" fillOpacity="0.06" />
        <path d="M35 15 Q42 10 40 25 Q36 20 35 15Z" fill="#5A7A4E" fillOpacity="0.12" />
      </svg>

      {/* ── Names at top ── */}
      <div className="relative z-10 mt-[15%] flex flex-col items-center px-5">
        <p className="text-[6.5px] font-medium uppercase tracking-[0.4em] text-[#3A2A1A]/45" style={{ fontFamily: "var(--font-cinzel)" }}>
          Together with their families
        </p>
        <h3 className="mt-2 text-[28px] leading-tight text-[#2A1810]" style={{ fontFamily: "var(--font-great-vibes)" }}>
          Aarav <span className="text-[#D4AF37]">&</span> Priya
        </h3>
        <div className="mt-1 flex items-center gap-2">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]/30" />
          <span className="text-[5px] text-[#D4AF37]/45">✦</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]/30" />
        </div>
      </div>

      {/* ── Couple from BACK VIEW — center visual ── */}
      <svg viewBox="0 0 140 160" className="relative z-10 mx-auto mt-2 h-[140px] w-auto">
        {/* Soft ground shadow */}
        <ellipse cx="70" cy="155" rx="45" ry="4" fill="#3A2A1A" fillOpacity="0.05" />
        {/* Varmala garland connecting them */}
        <path d="M55 65 Q70 78 85 65" stroke="#D4AF37" strokeOpacity="0.25" strokeWidth="1" fill="none" />
        <path d="M58 68 Q70 75 82 68" stroke="#C08060" strokeOpacity="0.15" strokeWidth="0.6" fill="none" />
        {/* Groom — back view, sherwani */}
        <circle cx="55" cy="35" r="13" fill="#3A2A1A" fillOpacity="0.50" />
        <path d="M38 150 L42 62 Q42 48 55 48 Q68 48 68 62 L72 150" fill="#3A2A1A" fillOpacity="0.45" />
        {/* Sherwani collar detail */}
        <path d="M48 55 L62 55 L60 48 L50 48Z" fill="#D4AF37" fillOpacity="0.12" />
        {/* Turban */}
        <path d="M44 30 Q55 20 66 30 Q66 38 55 40 Q44 38 44 30Z" fill="#C08060" fillOpacity="0.25" />
        <path d="M60 25 Q64 22 66 30" stroke="#D4AF37" strokeOpacity="0.15" strokeWidth="0.5" fill="none" />
        {/* Bride — back view, lehenga */}
        <circle cx="85" cy="35" r="13" fill="#5A2030" fillOpacity="0.40" />
        <path d="M68 150 L72 60 Q72 48 85 48 Q98 48 98 60 L108 150 Q88 140 68 150Z" fill="#5A2030" fillOpacity="0.35" />
        {/* Lehenga border detail */}
        <path d="M72 135 Q88 128 108 135" stroke="#D4AF37" strokeOpacity="0.12" strokeWidth="0.5" fill="none" />
        <path d="M74 140 Q88 133 106 140" stroke="#D4AF37" strokeOpacity="0.08" strokeWidth="0.3" fill="none" />
        {/* Dupatta flowing down back */}
        <path d="M85 28 Q100 25 105 55 Q98 45 85 38" fill="#D45570" fillOpacity="0.12" />
        {/* Jewelry — maang tikka */}
        <circle cx="85" cy="26" r="1.5" fill="#D4AF37" fillOpacity="0.30" />
        {/* Garland flowers */}
        <circle cx="60" cy="72" r="1.5" fill="#C08060" fillOpacity="0.20" />
        <circle cx="70" cy="76" r="1.8" fill="#D4AF37" fillOpacity="0.15" />
        <circle cx="80" cy="72" r="1.5" fill="#C08060" fillOpacity="0.20" />
      </svg>

      {/* ── Bottom details ── */}
      <div className="relative z-10 mt-auto flex w-full flex-col items-center px-5 pb-5">
        <p className="rounded-full bg-[#3A2A1A]/[0.04] px-4 py-1 text-[9px] font-light tracking-wider text-[#3A2A1A]/55" style={{ fontFamily: "var(--font-cormorant)" }}>
          June 15, 2026 · Six in the Evening
        </p>
        <p className="mt-1.5 text-[6.5px] uppercase tracking-[0.15em] text-[#3A2A1A]/35" style={{ fontFamily: "var(--font-montserrat)" }}>
          The Rosewater Estate · Toronto
        </p>
      </div>

      <div className="absolute inset-0 rounded-[18px] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]" />
    </div>
  );
}

/* ─── 2. BUSINESS CARD — Marble & gold texture ─── */
/* ─── CARD 2: BUSINESS (Dark) — Vintage car brand ─── */
function BusinessCard() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[18px]">
      {/* Deep olive-charcoal — NOT pure black */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#22241E] via-[#1A1C16] to-[#141610]" />
      {/* Matte brushed texture */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: GRAIN }} />
      <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "repeating-linear-gradient(90deg,transparent,transparent 2px,rgba(255,255,255,0.3) 2px,rgba(255,255,255,0.3) 3px)" }} />
      {/* Warm metallic sheen — top */}
      <div className="absolute -top-10 right-[10%] h-36 w-36 rounded-full bg-[#C6A85A]/[0.04] blur-[45px]" />

      {/* Vintage car silhouette — background */}
      <svg viewBox="0 0 300 120" preserveAspectRatio="xMidYMax meet" className="absolute bottom-[30%] left-1/2 w-[95%] -translate-x-1/2 opacity-[0.04]" fill="#C6A85A">
        {/* Body */}
        <path d="M40 90 L40 65 Q40 50 70 45 L100 42 Q120 35 140 32 L200 32 Q230 35 240 42 L260 50 Q280 55 280 70 L280 90Z" />
        {/* Wheels */}
        <circle cx="85" cy="92" r="14" /><circle cx="85" cy="92" r="8" fill="#22241E" />
        <circle cx="235" cy="92" r="14" /><circle cx="235" cy="92" r="8" fill="#22241E" />
        {/* Windshield */}
        <path d="M120 42 L135 28 L195 28 L210 42" fill="#22241E" fillOpacity="0.5" />
        {/* Hood ornament */}
        <circle cx="55" cy="58" r="2" />
      </svg>

      {/* Gold accent line — top */}
      <div className="absolute top-0 right-[18%] left-[18%] h-px bg-gradient-to-r from-transparent via-[#C6A85A]/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-7 pb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#C6A85A]/15 bg-[#C6A85A]/[0.06]">
            <span className="text-[13px] font-semibold text-[#C6A85A]/80" style={{ fontFamily: "var(--font-cinzel)" }}>R</span>
          </div>
          <div>
            <p className="text-[7.5px] font-medium uppercase tracking-[0.25em] text-[#C6A85A]/55" style={{ fontFamily: "var(--font-cinzel)" }}>Regent Motors</p>
            <div className="mt-1 h-px w-12 bg-gradient-to-r from-[#C6A85A]/15 to-transparent" />
          </div>
        </div>

        <div>
          <h3 className="text-[20px] font-bold tracking-wide text-[#E8E4DC]/85" style={{ fontFamily: "var(--font-playfair)" }}>Aman Gupta</h3>
          <p className="mt-1 text-[7px] font-medium uppercase tracking-[0.25em] text-[#C6A85A]/45" style={{ fontFamily: "var(--font-montserrat)" }}>Chief Executive</p>
          <div className="mt-5 h-px w-full bg-gradient-to-r from-[#C6A85A]/10 to-transparent" />
          <div className="mt-4 space-y-2">
            {[
              { i: "✉", t: "aman@regentmotors.co" },
              { i: "☎", t: "+1 (647) 555-0123" },
              { i: "◎", t: "regentmotors.co" },
            ].map((c) => (
              <div key={c.t} className="flex items-center gap-2.5">
                <span className="text-[5px] text-[#C6A85A]/20">{c.i}</span>
                <p className="text-[7px] tracking-[0.04em] text-[#E8E4DC]/25" style={{ fontFamily: "var(--font-montserrat)" }}>{c.t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 rounded-[18px] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]" />
    </div>
  );
}

/* ─── 3. ANIMATED INVITE — Aurora / northern lights ─── */
/* ─── CARD 3: ANIMATED INVITE (Light) — Layered depth, no play button ─── */
function AnimatedInviteCard() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[18px] shadow-[0_6px_30px_rgba(40,20,10,0.08)]">
      {/* Cream base — darker than page bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#EBE2D4] via-[#E4DAC8] to-[#DCD0BE]" />
      {/* Coral wash */}
      <div className="absolute top-[5%] right-[5%] h-36 w-36 rounded-full bg-[#FF8C6A]/[0.06] blur-[40px]" />
      {/* Plum wash */}
      <div className="absolute bottom-[10%] left-[8%] h-28 w-28 rounded-full bg-[#7A5C61]/[0.04] blur-[30px]" />
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_45%,rgba(50,30,20,0.08)_100%)]" />
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: GRAIN }} />

      {/* ── Layered card frames — implying animation/parallax ── */}
      {/* Back layer */}
      <div className="absolute top-[18%] left-1/2 h-[52%] w-[72%] -translate-x-[46%] rotate-[-3deg] rounded-xl border border-[#D4AF37]/12 bg-[#E0D6C6]/70 shadow-[0_3px_12px_rgba(0,0,0,0.05)]" />
      {/* Mid layer */}
      <div className="absolute top-[15%] left-1/2 h-[54%] w-[74%] -translate-x-[50%] rotate-[1deg] rounded-xl border border-[#D4AF37]/15 bg-[#E8DED0]/75 shadow-[0_4px_16px_rgba(0,0,0,0.06)]" />
      {/* Front layer — main card */}
      <div className="absolute top-[12%] left-1/2 h-[56%] w-[76%] -translate-x-[54%] rotate-[-1deg] rounded-xl border border-[#D4AF37]/18 bg-[#F0E8DA]/85 shadow-[0_5px_22px_rgba(0,0,0,0.08)]">
        {/* Content inside front card */}
        <div className="flex h-full flex-col items-center justify-center p-4">
          <p className="text-[5px] font-medium uppercase tracking-[0.35em] text-[#7A5C61]/40" style={{ fontFamily: "var(--font-cinzel)" }}>You&apos;re Invited</p>
          <h4 className="mt-1 text-[14px] text-[#2A1A15]/80" style={{ fontFamily: "var(--font-great-vibes)" }}>Rahul & Simran</h4>
          <div className="mt-1 h-px w-12 bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent" />
          <p className="mt-1 text-[5px] text-[#7A5C61]/35" style={{ fontFamily: "var(--font-cormorant)" }}>Dec 12, 2026</p>
        </div>
      </div>

      {/* Motion trail curves */}
      <svg viewBox="0 0 280 420" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" fill="none">
        <path d="M-20 90 Q60 55 140 85 Q220 115 300 75" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.10" />
        <path d="M-20 110 Q70 75 150 105 Q230 135 310 95" stroke="#FF8C6A" strokeWidth="0.6" strokeOpacity="0.07" />
        <path d="M-20 330 Q80 300 170 330 Q260 360 340 320" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.06" strokeDasharray="4 6" />
      </svg>

      {/* Sparkle particles */}
      {[
        { l: 15, t: 15, s: 3, c: "#D4AF37", o: 0.28 },
        { l: 80, t: 12, s: 2, c: "#FF8C6A", o: 0.22 },
        { l: 12, t: 70, s: 2.5, c: "#D4AF37", o: 0.25 },
        { l: 85, t: 72, s: 2, c: "#7A5C61", o: 0.18 },
        { l: 50, t: 8, s: 2, c: "#FF8C6A", o: 0.20 },
      ].map((p, i) => (
        <div key={i} className="absolute rounded-full" style={{ left: `${p.l}%`, top: `${p.t}%`, width: p.s, height: p.s, background: p.c, opacity: p.o }} />
      ))}

      {/* Bottom text */}
      <div className="relative z-10 mt-auto mb-5 flex flex-col items-center px-5 text-center">
        <p className="text-[6px] font-bold uppercase tracking-[0.4em] text-[#7A5C61]/40" style={{ fontFamily: "var(--font-montserrat)" }}>
          Animated Invites
        </p>
        <div className="mt-1.5 flex items-center gap-2">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#D4AF37]/20" />
          <span className="text-[5px] text-[#D4AF37]/40">✦</span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#D4AF37]/20" />
        </div>
        <p className="mt-1 text-[7px] font-light text-[#7A5C61]/40" style={{ fontFamily: "var(--font-cormorant)" }}>
          Cinematic · Music · Parallax
        </p>
      </div>

      <div className="absolute inset-0 rounded-[18px] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]" />
    </div>
  );
}

/* ─── CARD 4: CHRISTIAN WEDDING (Dark) — Garden ring scene ─── */
function ChristianWeddingCard() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[18px]">
      {/* Deep navy-teal — NOT too dark */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#162030] via-[#1A2838] to-[#122028]" />
      {/* Warm glow center */}
      <div className="absolute top-[25%] left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[#D4AF37]/[0.07] blur-[60px]" />
      {/* Teal accent */}
      <div className="absolute bottom-[15%] left-[20%] h-32 w-32 rounded-full bg-[#2A6060]/[0.10] blur-[40px]" />
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,transparent_30%,rgba(10,15,25,0.45)_100%)]" />
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: GRAIN }} />

      {/* ── Glowing ring in sky ── */}
      <div className="absolute top-[12%] left-1/2 -translate-x-1/2">
        {/* Outer glow */}
        <div className="absolute top-1/2 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/[0.08] blur-[20px]" />
        <svg viewBox="0 0 50 50" className="relative h-12 w-12">
          <circle cx="25" cy="25" r="18" stroke="#D4AF37" strokeWidth="2.5" strokeOpacity="0.30" fill="none" />
          <circle cx="25" cy="25" r="18" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.10" fill="none" strokeDasharray="2 3" />
          {/* Diamond on ring */}
          <path d="M25 5 L28 10 L25 8 L22 10Z" fill="#D4AF37" fillOpacity="0.45" />
          <circle cx="25" cy="7" r="1.5" fill="#F5ECD7" fillOpacity="0.30" />
        </svg>
      </div>

      {/* ── Garden ground with florals ── */}
      <svg viewBox="0 0 300 80" preserveAspectRatio="xMidYMax slice" className="absolute bottom-[15%] left-0 w-full" fill="none">
        {/* Ground line */}
        <path d="M0 50 Q75 42 150 48 Q225 54 300 46" stroke="#2A6060" strokeWidth="0.5" strokeOpacity="0.15" />
        {/* Soft bushes */}
        <ellipse cx="40" cy="48" rx="25" ry="12" fill="#1A3530" fillOpacity="0.30" />
        <ellipse cx="150" cy="45" rx="30" ry="14" fill="#1A3530" fillOpacity="0.25" />
        <ellipse cx="260" cy="48" rx="25" ry="12" fill="#1A3530" fillOpacity="0.30" />
        {/* Small flowers */}
        <circle cx="55" cy="40" r="2.5" fill="#D4AF37" fillOpacity="0.12" />
        <circle cx="140" cy="38" r="2" fill="#F5ECD7" fillOpacity="0.10" />
        <circle cx="245" cy="40" r="2.5" fill="#D4AF37" fillOpacity="0.12" />
      </svg>

      {/* ── Couple — looking towards ring ── */}
      <svg viewBox="0 0 120 130" className="absolute bottom-[12%] left-1/2 h-[120px] -translate-x-1/2">
        <ellipse cx="60" cy="126" rx="35" ry="3" fill="#D4AF37" fillOpacity="0.03" />
        {/* Groom — three-piece suit */}
        <circle cx="48" cy="32" r="11" fill="#101820" fillOpacity="0.55" />
        <path d="M34 125 L38 58 Q38 45 48 45 Q58 45 58 58 L62 125" fill="#101820" fillOpacity="0.50" />
        {/* Suit lapel hint */}
        <path d="M43 55 L48 50 L53 55" stroke="#D4AF37" strokeOpacity="0.10" strokeWidth="0.5" fill="none" />
        {/* Bride — white gown */}
        <circle cx="72" cy="32" r="11" fill="#C8C0B0" fillOpacity="0.35" />
        <path d="M58 125 L62 56 Q62 45 72 45 Q82 45 82 56 L92 125 Q72 118 58 125Z" fill="#C8C0B0" fillOpacity="0.28" />
        {/* Gown detail */}
        <path d="M62 110 Q72 105 92 110" stroke="#D4AF37" strokeOpacity="0.06" strokeWidth="0.4" fill="none" />
        {/* Veil */}
        <path d="M72 24 Q86 20 90 42 Q84 35 72 32" fill="#E8E0D4" fillOpacity="0.12" />
        {/* Bouquet */}
        <circle cx="68" cy="70" r="4" fill="#D4AF37" fillOpacity="0.08" />
        <circle cx="68" cy="70" r="2" fill="#F5ECD7" fillOpacity="0.06" />
      </svg>

      {/* Content */}
      <div className="relative z-10 mt-auto flex w-full flex-col items-center bg-gradient-to-t from-[#0E1820]/50 to-transparent px-5 pt-12 pb-5">
        <p className="text-[6.5px] font-medium uppercase tracking-[0.4em] text-[#D4AF37]/40" style={{ fontFamily: "var(--font-cinzel)" }}>
          You are invited to celebrate
        </p>
        <h3 className="mt-2 text-[28px] leading-tight text-[#E8E0D4]/85" style={{ fontFamily: "var(--font-great-vibes)" }}>
          James <span className="text-[#D4AF37]/70">&</span> Rose
        </h3>
        <div className="mt-1 flex items-center gap-2">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]/20" />
          <span className="text-[5px] text-[#D4AF37]/35">✦</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]/20" />
        </div>
        <p className="mt-1.5 rounded-full bg-[#D4AF37]/[0.06] px-4 py-1 text-[9px] font-light tracking-wider text-[#C8C0B0]/55" style={{ fontFamily: "var(--font-cormorant)" }}>
          October 8, 2026 · Four in the Afternoon
        </p>
        <p className="mt-1.5 text-[6.5px] uppercase tracking-[0.15em] text-[#D4AF37]/22" style={{ fontFamily: "var(--font-montserrat)" }}>
          St. Andrew&apos;s Cathedral · Vancouver
        </p>
      </div>

      <div className="absolute inset-0 rounded-[18px] shadow-[inset_0_1px_0_rgba(212,175,55,0.04)]" />
    </div>
  );
}

/* ─── CARD 5: QR/NFC SHARING (Light) — Scattered mini QR pattern ─── */
function QrShareCard() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[18px] shadow-[0_6px_30px_rgba(40,20,10,0.08)]">
      {/* Ivory base — darker than page bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#ECE6DC] via-[#E5DDD0] to-[#DDD4C6]" />
      {/* Soft warmth */}
      <div className="absolute top-[20%] left-1/2 h-36 w-36 -translate-x-1/2 rounded-full bg-[#D4AF37]/[0.04] blur-[40px]" />
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_50%,rgba(50,30,20,0.06)_100%)]" />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: GRAIN }} />

      {/* ── Scattered mini QR codes — pattern across card ── */}
      <svg viewBox="0 0 280 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" fill="none">
        {/* Mini QR blocks scattered aesthetically */}
        {[
          { x: 25, y: 40, s: 22, o: 0.06 },
          { x: 200, y: 60, s: 18, o: 0.05 },
          { x: 60, y: 300, s: 20, o: 0.05 },
          { x: 220, y: 320, s: 16, o: 0.04 },
          { x: 30, y: 170, s: 14, o: 0.03 },
          { x: 240, y: 180, s: 15, o: 0.04 },
          { x: 140, y: 50, s: 12, o: 0.03 },
          { x: 120, y: 340, s: 14, o: 0.03 },
        ].map((q, i) => (
          <g key={i} opacity={q.o}>
            <rect x={q.x} y={q.y} width={q.s} height={q.s} rx="2" stroke="#3A2A1A" strokeWidth="0.5" />
            <rect x={q.x + 2} y={q.y + 2} width={q.s * 0.35} height={q.s * 0.35} rx="1" fill="#3A2A1A" />
            <rect x={q.x + q.s - q.s * 0.35 - 2} y={q.y + 2} width={q.s * 0.35} height={q.s * 0.35} rx="1" fill="#3A2A1A" />
            <rect x={q.x + 2} y={q.y + q.s - q.s * 0.35 - 2} width={q.s * 0.35} height={q.s * 0.35} rx="1" fill="#3A2A1A" />
          </g>
        ))}
        {/* Connecting line pattern */}
        <path d="M50 55 Q140 80 210 68" stroke="#D4AF37" strokeWidth="0.3" strokeOpacity="0.08" strokeDasharray="3 5" />
        <path d="M70 310 Q140 290 230 328" stroke="#D4AF37" strokeWidth="0.3" strokeOpacity="0.06" strokeDasharray="3 5" />
      </svg>

      {/* NFC concentric waves — center */}
      {[48, 64, 80].map((s, i) => (
        <div key={i} className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D4AF37]" style={{ width: s, height: s, opacity: 0.06 - i * 0.015 }} />
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-5 text-center">
        {/* NFC icon */}
        <svg viewBox="0 0 24 24" className="mb-3 h-6 w-6 text-[#D4AF37]/40" fill="currentColor">
          <path d="M4 12 Q4 6 12 6 Q20 6 20 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
          <path d="M7 12 Q7 8 12 8 Q17 8 17 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
          <path d="M10 12 Q10 10 12 10 Q14 10 14 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
          <circle cx="12" cy="13" r="1.5" />
        </svg>

        <h3 className="text-[18px] font-bold text-[#2A1A10]/80" style={{ fontFamily: "var(--font-playfair)" }}>
          Smart Sharing
        </h3>
        <div className="mt-1.5 flex items-center gap-2">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4AF37]/25" />
          <span className="text-[5px] text-[#D4AF37]/40">✦</span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4AF37]/25" />
        </div>
        <p className="mt-1.5 text-[7px] font-light text-[#3A2A1A]/40" style={{ fontFamily: "var(--font-cormorant)" }}>
          QR Code · NFC Tap · Direct Link
        </p>

        {/* Mini feature tags */}
        <div className="mt-4 flex items-center gap-2">
          {["Instant", "Secure", "Trackable"].map((t) => (
            <span key={t} className="rounded-full bg-[#3A2A1A]/[0.04] px-2.5 py-0.5 text-[5px] font-medium uppercase tracking-[0.1em] text-[#3A2A1A]/35" style={{ fontFamily: "var(--font-montserrat)" }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 rounded-[18px] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]" />
    </div>
  );
}

/* ================================================================== */
/*  Card configs — L/D/L/D/L                                         */
/* ================================================================== */

const SHOWCASE_CARDS = [
  { id: 0, Component: WeddingCard,          title: "Wedding Invitation" },
  { id: 1, Component: BusinessCard,         title: "Business Card" },
  { id: 2, Component: AnimatedInviteCard,   title: "Animated Invite" },
  { id: 3, Component: ChristianWeddingCard, title: "Evening Wedding" },
  { id: 4, Component: QrShareCard,          title: "Smart Sharing" },
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
                    className="mt-5 text-center text-xs font-medium text-muted-foreground"
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
      <div className="mt-10 flex items-center gap-2">
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
              className="min-w-[200px] border-[#D4AF37]/30 text-base text-[#1A1A1A] hover:bg-[#D4AF37]/8 dark:border-[#D4AF37]/40 dark:text-[#F5ECD7] dark:hover:bg-[#D4AF37]/15"
            >
              Sign In
            </Button>
          </Link>
        </MagneticButton>
      </motion.div>
    </section>
  );
}
