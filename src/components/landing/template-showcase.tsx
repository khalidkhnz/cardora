"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { type Template, CATEGORIES, TEMPLATES } from "@/lib/template-data";


/* Data imported from @/lib/template-data */

/* ================================================================== */
/*  Template card preview renderers                                   */
/* ================================================================== */

function WeddingPreview({ t }: { t: Template }) {
  const isBeach = t.id === "azure-vows";
  const isVintage = t.id === "whispered-vows";

  // THE MAHARANI — warm peach, floral arch, chandeliers
  if (t.id === "the-maharani") {
    return (
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#F8EAD8] via-[#F2DCCA] to-[#EACEBC] p-4 text-center">
        <div className="absolute top-[20%] left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-[#D4AF37]/[0.06] blur-[30px]" />
        <svg viewBox="0 0 140 130" className="relative my-1 h-[85px] w-auto" fill="none">
          <path d="M15 125 L15 55 Q15 18 70 10 Q125 18 125 55 L125 125" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.18" />
          <circle cx="70" cy="14" r="7" fill="#E88090" fillOpacity="0.30" />
          <circle cx="70" cy="14" r="4" fill="#FF9BAA" fillOpacity="0.22" />
          <circle cx="60" cy="18" r="5" fill="#FFB0A0" fillOpacity="0.25" />
          <circle cx="80" cy="18" r="5" fill="#FF8C6A" fillOpacity="0.22" />
          <path d="M48 22 Q44 18 50 16 Q51 20 48 22Z" fill="#5A8A50" fillOpacity="0.18" />
          <path d="M92 22 Q96 18 90 16 Q89 20 92 22Z" fill="#5A8A50" fillOpacity="0.18" />
          <circle cx="20" cy="50" r="4" fill="#E88090" fillOpacity="0.18" />
          <circle cx="120" cy="50" r="4" fill="#FFB0A0" fillOpacity="0.18" />
          <line x1="42" y1="22" x2="42" y2="34" stroke="#D4AF37" strokeWidth="0.3" strokeOpacity="0.15" />
          <circle cx="42" cy="35" r="1.5" fill="#D4AF37" fillOpacity="0.12" />
          <line x1="98" y1="22" x2="98" y2="34" stroke="#D4AF37" strokeWidth="0.3" strokeOpacity="0.15" />
          <circle cx="98" cy="35" r="1.5" fill="#D4AF37" fillOpacity="0.12" />
          <circle cx="58" cy="52" r="8" fill="#5A3020" fillOpacity="0.50" />
          <path d="M47 115 L50 68 Q50 58 58 58 Q66 58 66 68 L69 115" fill="#5A3020" fillOpacity="0.40" />
          <path d="M52 48 Q58 42 64 48 Q64 53 58 54 Q52 53 52 48Z" fill="#D4AF37" fillOpacity="0.30" />
          <circle cx="82" cy="52" r="8" fill="#6A2030" fillOpacity="0.45" />
          <path d="M66 115 L70 66 Q70 58 82 58 Q94 58 94 66 L102 115 Q82 108 66 115Z" fill="#8A2040" fillOpacity="0.32" />
          <path d="M82 46 Q92 44 94 62 Q90 54 82 52" fill="#E88090" fillOpacity="0.15" />
          <path d="M66 74 Q74 84 82 74" stroke="#D4AF37" strokeOpacity="0.28" strokeWidth="0.8" />
          <circle cx="69" cy="77" r="1.5" fill="#E88090" fillOpacity="0.28" />
          <circle cx="74" cy="80" r="1.8" fill="#D4AF37" fillOpacity="0.20" />
          <circle cx="79" cy="77" r="1.5" fill="#FFB0A0" fillOpacity="0.28" />
        </svg>
        <h4 className="relative text-[13px] leading-tight text-[#3A1A10]" style={{ fontFamily: "var(--font-great-vibes)" }}>Aarav <span className="text-[#D4AF37]">&</span> Priya</h4>
        <div className="relative my-1 flex items-center gap-1"><div className="h-px w-6 bg-gradient-to-r from-transparent to-[#D4AF37]/25" /><span className="text-[5px] text-[#D4AF37]/35">✦</span><div className="h-px w-6 bg-gradient-to-l from-transparent to-[#D4AF37]/25" /></div>
        <p className="relative text-[6px] text-[#8B6040]/50" style={{ fontFamily: "var(--font-montserrat)" }}>June 15, 2026</p>
      </div>
    );
  }

  // AZURE VOWS — open beach landscape, no arch, couple off-center
  if (isBeach) {
    return (
      <div className="relative flex h-full w-full flex-col justify-end overflow-hidden p-4">
        {/* Sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#B8D8F0] via-[#D0E8F8] to-[#E0EEF5]" />
        {/* Sun glow — top right */}
        <div className="absolute top-[10%] right-[15%] h-14 w-14 rounded-full bg-[#FFF0D0]/40 blur-[18px]" />
        {/* Horizon ocean line */}
        <div className="absolute bottom-[28%] left-0 right-0 h-[8%] bg-gradient-to-b from-[#6AACCC]/15 to-transparent" />
        {/* Sand */}
        <div className="absolute bottom-0 left-0 right-0 h-[28%] bg-gradient-to-t from-[#F0E4D0] via-[#EEE0CC] to-[#E8DCCA]/40" />
        {/* Waves */}
        <svg viewBox="0 0 140 10" preserveAspectRatio="none" className="absolute bottom-[26%] left-0 w-full">
          <path d="M0 5 Q15 2 30 5 Q45 8 60 5 Q75 2 90 5 Q105 8 120 5 Q135 2 140 5" stroke="#5A9CC0" strokeWidth="0.5" strokeOpacity="0.12" fill="none" />
        </svg>

        {/* Couple — right side, standing on sand */}
        <svg viewBox="0 0 50 70" className="absolute bottom-[22%] right-[18%] h-[55px]" fill="none">
          {/* Groom */}
          <circle cx="18" cy="14" r="6" fill="#2A4050" fillOpacity="0.50" />
          <path d="M10 62 L13 28 Q13 20 18 20 Q23 20 23 28 L26 62" fill="#2A4050" fillOpacity="0.40" />
          {/* Bride */}
          <circle cx="34" cy="14" r="6" fill="#7A6050" fillOpacity="0.35" />
          <path d="M25 62 L28 26 Q28 20 34 20 Q40 20 40 26 L46 62 Q34 57 25 62Z" fill="#FFFFFF" fillOpacity="0.55" />
          {/* Veil blowing */}
          <path d="M34 10 Q44 7 46 20 Q42 14 34 14" fill="#FFFFFF" fillOpacity="0.18" />
          {/* Bouquet */}
          <circle cx="28" cy="38" r="2" fill="#FFD0D0" fillOpacity="0.35" />
        </svg>

        {/* Loose flowers — left side, scattered on sand */}
        <div className="absolute top-[72%] left-[12%] h-1 w-1 rounded-full bg-white/30" />
        <div className="absolute top-[78%] left-[20%] h-[3px] w-[3px] rounded-full bg-[#FFE0E0]/25" />
        <div className="absolute top-[80%] left-[8%] h-[3px] w-[3px] rounded-full bg-white/20" />

        {/* Text — bottom left */}
        <div className="relative z-10 mb-1">
          <h4 className="text-[14px] leading-tight text-[#1A3A4A]" style={{ fontFamily: "var(--font-great-vibes)" }}>
            James <span className="text-[#5B9EC4]">&</span> Rose
          </h4>
          <div className="mt-1 flex items-center gap-1.5">
            <div className="h-px w-5 bg-[#5B9EC4]/20" />
            <p className="text-[6px] text-[#4A7A98]/50" style={{ fontFamily: "var(--font-montserrat)" }}>Oct 8, 2026</p>
          </div>
          <p className="mt-0.5 text-[5px] text-[#4A7A98]/35" style={{ fontFamily: "var(--font-montserrat)" }}>Sunset Beach · Malibu</p>
        </div>
      </div>
    );
  }

  // WHISPERED VOWS — rich brown, invitation letter on table
  if (isVintage) return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden p-3">
      {/* Rich brown */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#C8B898] via-[#B8A882] to-[#A89870]" />
      {/* Grain */}
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='a'%3E%3CfeTurbulence baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23a)' opacity='.4'/%3E%3C/svg%3E\")" }} />
      {/* Warm lights */}
      <div className="absolute top-[10%] left-[25%] h-10 w-10 rounded-full bg-[#FFE0A0]/20 blur-[12px]" />
      <div className="absolute top-[8%] right-[28%] h-8 w-8 rounded-full bg-[#FFE0A0]/15 blur-[10px]" />

      <svg viewBox="0 0 140 130" className="relative h-[80px] w-auto" fill="none">
        {/* Fairy lights */}
        <path d="M15 12 Q40 5 70 10 Q100 5 125 12" stroke="#5A4830" strokeWidth="0.3" strokeOpacity="0.10" />
        <circle cx="30" cy="8" r="1.2" fill="#FFE8A0" fillOpacity="0.35" />
        <circle cx="55" cy="6" r="1.2" fill="#FFE8A0" fillOpacity="0.30" />
        <circle cx="85" cy="7" r="1.2" fill="#FFE8A0" fillOpacity="0.32" />
        <circle cx="110" cy="9" r="1.2" fill="#FFE8A0" fillOpacity="0.28" />
        {/* Main card */}
        <rect x="32" y="20" width="76" height="95" rx="3" fill="#F0E8D4" fillOpacity="0.80" stroke="#5A4830" strokeWidth="0.4" strokeOpacity="0.12" />
        <rect x="37" y="25" width="66" height="85" rx="1.5" fill="none" stroke="#5A4830" strokeWidth="0.2" strokeOpacity="0.06" />
        {/* Flourish */}
        <path d="M60 32 Q70 27 80 32 Q80 36 70 37 Q60 36 60 32Z" fill="#5A4830" fillOpacity="0.10" />
        {/* R & A */}
        <text x="70" y="58" textAnchor="middle" fill="#3A2818" fillOpacity="0.55" fontSize="12" style={{ fontFamily: "cursive" }}>R &amp; A</text>
        {/* Lines */}
        <line x1="50" y1="65" x2="90" y2="65" stroke="#5A4830" strokeWidth="0.2" strokeOpacity="0.06" />
        {/* Wax seal */}
        <circle cx="70" cy="100" r="6" fill="#8B4040" fillOpacity="0.22" />
        <circle cx="70" cy="100" r="3.5" fill="#A05050" fillOpacity="0.15" />
        {/* Behind card */}
        <rect x="18" y="28" width="45" height="60" rx="2" fill="#E0D4BC" fillOpacity="0.35" stroke="#5A4830" strokeWidth="0.2" strokeOpacity="0.06" transform="rotate(-6 40 58)" />
        {/* Flowers bottom */}
        <circle cx="18" cy="108" r="6" fill="#C09080" fillOpacity="0.30" />
        <circle cx="18" cy="108" r="3.5" fill="#D4A090" fillOpacity="0.20" />
        <circle cx="28" cy="115" r="4" fill="#B88070" fillOpacity="0.22" />
        <circle cx="118" cy="110" r="5" fill="#C09080" fillOpacity="0.25" />
        <circle cx="110" cy="116" r="3.5" fill="#D4B0A0" fillOpacity="0.18" />
        <path d="M10 112 Q6 106 14 104 Q16 110 10 112Z" fill="#6A7A50" fillOpacity="0.18" />
        <path d="M124 108 Q128 102 120 100 Q118 106 124 108Z" fill="#6A7A50" fillOpacity="0.15" />
        {/* Table */}
        <rect x="5" y="120" width="130" height="8" rx="1.5" fill="#6A5030" fillOpacity="0.10" />
      </svg>

      <h4 className="relative mt-1 text-[13px] leading-tight text-[#F0E4D0]" style={{ fontFamily: "var(--font-dancing-script)" }}>
        Rohan & Aisha
      </h4>
      <div className="relative mt-0.5 flex items-center gap-1">
        <div className="h-px w-5 bg-[#F0E4D0]/18" />
        <p className="text-[5px] italic text-[#F0E4D0]/40" style={{ fontFamily: "var(--font-cormorant)" }}>Whispered Vows</p>
        <div className="h-px w-5 bg-[#F0E4D0]/18" />
      </div>
      <p className="relative text-[5px] text-[#F0E4D0]/28" style={{ fontFamily: "var(--font-montserrat)" }}>Nov 20, 2026</p>
    </div>
  );
}

function BusinessPreview({ t }: { t: Template }) {
  // NOIR ATELIER — dark luxury car brand card
  if (t.id === "noir-atelier") {
    return (
      <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-gradient-to-b from-[#1E2028] via-[#1A1C24] to-[#14161C] p-4">
        <div className="absolute top-[35%] left-1/2 h-28 w-40 -translate-x-1/2 rounded-full bg-[#C6A85A]/[0.04] blur-[30px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "repeating-linear-gradient(135deg,transparent,transparent 3px,rgba(255,255,255,0.3) 3px,rgba(255,255,255,0.3) 4px)" }} />

        {/* Top — brand */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#C6A85A]/15 bg-[#C6A85A]/[0.06]">
            <span className="text-[8px] font-bold text-[#C6A85A]/55" style={{ fontFamily: "serif" }}>R</span>
          </div>
          <span className="text-[6px] uppercase tracking-[0.18em] text-[#C6A85A]/45" style={{ fontFamily: "var(--font-cinzel)" }}>Regent Motors</span>
        </div>

        {/* Center — vintage car silhouette */}
        <svg viewBox="0 0 160 55" className="relative z-10 mx-auto w-[85%]" fill="none">
          <path d="M20 42 L20 30 Q20 22 35 20 L55 18 Q65 12 78 10 L120 10 Q135 12 140 18 L148 22 Q155 25 155 32 L155 42" fill="#C6A85A" fillOpacity="0.06" stroke="#C6A85A" strokeWidth="0.5" strokeOpacity="0.15" />
          {/* Windshield */}
          <path d="M68 18 L78 8 L115 8 L125 18" fill="#1E2028" fillOpacity="0.4" stroke="#C6A85A" strokeWidth="0.3" strokeOpacity="0.10" />
          {/* Wheels */}
          <circle cx="48" cy="44" r="8" fill="#1E2028" stroke="#C6A85A" strokeWidth="0.4" strokeOpacity="0.18" />
          <circle cx="48" cy="44" r="4" fill="#C6A85A" fillOpacity="0.06" />
          <circle cx="130" cy="44" r="8" fill="#1E2028" stroke="#C6A85A" strokeWidth="0.4" strokeOpacity="0.18" />
          <circle cx="130" cy="44" r="4" fill="#C6A85A" fillOpacity="0.06" />
          {/* Hood ornament */}
          <circle cx="28" cy="26" r="1.5" fill="#C6A85A" fillOpacity="0.25" />
          {/* Headlight glow */}
          <circle cx="22" cy="32" r="3" fill="#C6A85A" fillOpacity="0.08" />
          <circle cx="22" cy="32" r="6" fill="#C6A85A" fillOpacity="0.03" />
          {/* Chrome trim */}
          <line x1="30" y1="30" x2="150" y2="30" stroke="#C6A85A" strokeWidth="0.3" strokeOpacity="0.10" />
        </svg>

        {/* Bottom — name + role */}
        <div className="relative z-10">
          <h4 className="text-[12px] font-bold text-[#E8E4DC]/70" style={{ fontFamily: "var(--font-playfair)" }}>Aman Gupta</h4>
          <p className="mt-0.5 text-[5px] uppercase tracking-[0.15em] text-[#C6A85A]/40" style={{ fontFamily: "var(--font-montserrat)" }}>Chief Executive</p>
          <div className="mt-2 h-px bg-gradient-to-r from-[#C6A85A]/12 to-transparent" />
          <p className="mt-1 text-[4px] text-[#E8E4DC]/20">regentmotors.co</p>
        </div>
      </div>
    );
  }

  // MAISON BLANCHE — photographer, camera-first layout (NOT floating cards like Noir)
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-gradient-to-b from-[#D8D5D0] via-[#D0CCC8] to-[#C8C4BE] p-4">
      {/* Studio light */}
      <div className="absolute top-[5%] right-[12%] h-16 w-16 rounded-full bg-white/30 blur-[18px]" />

      {/* Top — brand + camera icon */}
      <div className="relative z-10 flex items-center gap-2">
        {/* Camera icon — visible */}
        <svg viewBox="0 0 24 20" className="h-5 w-5" fill="none" stroke="#2A2828" strokeWidth="1.2" strokeOpacity="0.35" strokeLinecap="round">
          <rect x="2" y="6" width="20" height="13" rx="3" />
          <path d="M7 6 L9 3 L15 3 L17 6" />
          <circle cx="12" cy="12.5" r="4" />
          <circle cx="12" cy="12.5" r="1.5" fill="#2A2828" fillOpacity="0.10" />
        </svg>
        <span className="text-[7px] uppercase tracking-[0.15em] text-[#2A2828]/40" style={{ fontFamily: "var(--font-cinzel)" }}>Maison Blanche</span>
      </div>

      {/* Center — large camera lens as hero visual */}
      <div className="relative z-10 mx-auto my-2">
        <svg viewBox="0 0 80 80" className="h-[65px] w-[65px]" fill="none">
          {/* Outer ring */}
          <circle cx="40" cy="40" r="36" stroke="#2A2828" strokeWidth="1.5" strokeOpacity="0.15" />
          <circle cx="40" cy="40" r="30" stroke="#2A2828" strokeWidth="0.8" strokeOpacity="0.12" />
          {/* Lens elements */}
          <circle cx="40" cy="40" r="22" fill="#2A2828" fillOpacity="0.05" stroke="#2A2828" strokeWidth="0.5" strokeOpacity="0.10" />
          <circle cx="40" cy="40" r="14" fill="#2A2828" fillOpacity="0.08" />
          <circle cx="40" cy="40" r="8" fill="#D0CCC8" stroke="#2A2828" strokeWidth="0.3" strokeOpacity="0.08" />
          {/* Light reflection */}
          <circle cx="32" cy="34" r="3" fill="white" fillOpacity="0.15" />
          <circle cx="34" cy="36" r="1.5" fill="white" fillOpacity="0.10" />
          {/* Aperture blades hint */}
          {[0, 60, 120, 180, 240, 300].map((a) => {
            const rad = (a * Math.PI) / 180;
            const x1 = 40 + 18 * Math.cos(rad);
            const y1 = 40 + 18 * Math.sin(rad);
            const x2 = 40 + 24 * Math.cos(rad);
            const y2 = 40 + 24 * Math.sin(rad);
            return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#2A2828" strokeWidth="0.4" strokeOpacity="0.06" />;
          })}
        </svg>
      </div>

      {/* Bottom — name + role */}
      <div className="relative z-10">
        <h4 className="text-[13px] font-bold text-[#1A1818]/70" style={{ fontFamily: "var(--font-playfair)" }}>Elena Rossi</h4>
        <p className="mt-0.5 text-[5px] uppercase tracking-[0.15em] text-[#2A2828]/35" style={{ fontFamily: "var(--font-montserrat)" }}>Photographer</p>
        <div className="mt-1.5 h-px w-12 bg-[#2A2828]/8" />
        <p className="mt-1 text-[4.5px] text-[#2A2828]/22">rossi.studio</p>
      </div>
    </div>
  );
}

function AnimatedPreview({ t }: { t: Template }) {
  return (
    <div className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-b ${t.colors.bg} p-5 text-center`}>
      {/* Motion lines */}
      <svg viewBox="0 0 100 30" className="mb-2 w-[70%] opacity-30" fill="none">
        <path d="M0 15 Q25 5 50 15 Q75 25 100 15" stroke={t.colors.accent} strokeWidth="0.8" />
        <path d="M0 20 Q25 10 50 20 Q75 30 100 20" stroke={t.colors.accent} strokeWidth="0.5" strokeOpacity="0.5" />
      </svg>
      {/* Play hint */}
      <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ border: `1.5px solid ${t.colors.accent}40`, background: `${t.colors.accent}10` }}>
        <svg viewBox="0 0 16 16" className="ml-0.5 h-3 w-3" fill={t.colors.accent} fillOpacity="0.7"><path d="M4 2 L14 8 L4 14Z" /></svg>
      </div>
      <h4 className="mt-2 text-[11px] font-bold" style={{ color: t.colors.text, fontFamily: "var(--font-playfair)" }}>Cinematic Invite</h4>
      <p className="mt-0.5 text-[6px]" style={{ color: `${t.colors.accent}50`, fontFamily: "var(--font-montserrat)" }}>Music · Parallax · RSVP</p>
    </div>
  );
}

function DashboardPreview({ t }: { t: Template }) {
  return (
    <div className={`flex h-full w-full flex-col bg-gradient-to-b ${t.colors.bg} p-4`}>
      <div className="flex items-center gap-1.5">
        <div className="h-1.5 w-1.5 rounded-full" style={{ background: t.colors.accent }} />
        <span className="text-[6px] font-semibold uppercase tracking-[0.12em]" style={{ color: `${t.colors.accent}70`, fontFamily: "var(--font-montserrat)" }}>Analytics</span>
      </div>
      <p className="mt-2 text-[18px] font-bold leading-none" style={{ color: `${t.colors.text}E0`, fontFamily: "var(--font-raleway)" }}>2,847</p>
      <p className="mt-0.5 text-[6px]" style={{ color: `${t.colors.accent}80` }}>↑ 24%</p>
      {/* Mini chart */}
      <svg viewBox="0 0 100 25" className="mt-2 w-full" fill="none">
        <defs>
          <linearGradient id={`cg-${t.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={t.colors.accent} stopOpacity="0.3" />
            <stop offset="100%" stopColor={t.colors.accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 20 Q15 18 25 15 Q40 10 55 12 Q70 8 85 5 Q95 3 100 4 L100 25 L0 25Z" fill={`url(#cg-${t.id})`} />
        <path d="M0 20 Q15 18 25 15 Q40 10 55 12 Q70 8 85 5 Q95 3 100 4" stroke={t.colors.accent} strokeWidth="1" strokeOpacity="0.5" />
      </svg>
      <div className="mt-2 flex gap-1">
        {["QR", "NFC", "Link"].map((s) => (
          <span key={s} className="rounded px-1.5 py-0.5 text-[4.5px] font-medium" style={{ background: `${t.colors.accent}15`, color: `${t.colors.accent}80` }}>{s}</span>
        ))}
      </div>
    </div>
  );
}

function QrPreview({ t }: { t: Template }) {
  return (
    <div className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-b ${t.colors.bg} p-5`}>
      {/* Mini QR */}
      <svg viewBox="0 0 40 40" className="h-10 w-10">
        <rect x="2" y="2" width="10" height="10" rx="1.5" fill={t.colors.accent} fillOpacity="0.7" />
        <rect x="4" y="4" width="6" height="6" rx="0.5" fill={t.colors.bg.includes("EC") ? "#F8F4EE" : "#0A0A0A"} />
        <rect x="5.5" y="5.5" width="3" height="3" rx="0.3" fill={t.colors.accent} fillOpacity="0.7" />
        <rect x="28" y="2" width="10" height="10" rx="1.5" fill={t.colors.accent} fillOpacity="0.7" />
        <rect x="30" y="4" width="6" height="6" rx="0.5" fill={t.colors.bg.includes("EC") ? "#F8F4EE" : "#0A0A0A"} />
        <rect x="31.5" y="5.5" width="3" height="3" rx="0.3" fill={t.colors.accent} fillOpacity="0.7" />
        <rect x="2" y="28" width="10" height="10" rx="1.5" fill={t.colors.accent} fillOpacity="0.7" />
        <rect x="4" y="30" width="6" height="6" rx="0.5" fill={t.colors.bg.includes("EC") ? "#F8F4EE" : "#0A0A0A"} />
        <rect x="5.5" y="31.5" width="3" height="3" rx="0.3" fill={t.colors.accent} fillOpacity="0.7" />
        {/* Data dots */}
        {[[15,3],[18,3],[21,3],[15,6],[21,6],[3,15],[6,15],[3,18],[15,15],[18,15],[21,15],[24,15],[15,18],[21,18],[24,18],[15,21],[18,21],[28,28],[31,28],[34,28],[28,31],[34,31],[28,34]].map(([x,y],i)=>(
          <rect key={i} x={x} y={y} width="2" height="2" rx="0.3" fill={t.colors.accent} fillOpacity="0.5" />
        ))}
        <circle cx="20" cy="20" r="3.5" fill={t.colors.accent} fillOpacity="0.8" />
        <circle cx="20" cy="20" r="1.5" fill={t.colors.bg.includes("EC") ? "#F8F4EE" : "#0A0A0A"} />
      </svg>
      {/* NFC waves */}
      <div className="mt-3 flex flex-col items-center">
        <p className="text-[7px] font-semibold uppercase tracking-[0.25em]" style={{ color: `${t.colors.text}80`, fontFamily: "var(--font-montserrat)" }}>Scan · Tap</p>
      </div>
    </div>
  );
}

function GlobalPreview({ t }: { t: Template }) {
  const isDark = t.colors.bg.includes("16") || t.colors.bg.includes("0E");
  return (
    <div className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-b ${t.colors.bg} p-5 text-center`}>
      {/* Globe hint */}
      <svg viewBox="0 0 40 40" className="mb-2 h-10 w-10" fill="none" stroke={t.colors.accent} strokeWidth="0.8" strokeOpacity="0.5">
        <circle cx="20" cy="20" r="16" />
        <ellipse cx="20" cy="20" rx="8" ry="16" />
        <path d="M4 15 Q20 18 36 15" /><path d="M4 25 Q20 22 36 25" />
      </svg>
      <h4 className="text-[11px] font-bold" style={{ color: `${t.colors.text}${isDark ? "D0" : ""}`, fontFamily: "var(--font-playfair)" }}>{t.name}</h4>
      <p className="mt-0.5 text-[6px]" style={{ color: `${t.colors.accent}60`, fontFamily: "var(--font-montserrat)" }}>CAD · Stripe Payments</p>
    </div>
  );
}

function TemplatePreview({ template }: { template: Template }) {
  switch (template.style) {
    case "wedding": return <WeddingPreview t={template} />;
    case "business": return <BusinessPreview t={template} />;
    case "animated": return <AnimatedPreview t={template} />;
    case "dashboard": return <DashboardPreview t={template} />;
    case "qr": return <QrPreview t={template} />;
    case "global": return <GlobalPreview t={template} />;
  }
}

/* ================================================================== */
/*  Template card                                                     */
/* ================================================================== */

function TemplateCard({ template, index }: { template: Template; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/templates/${template.id}`} className="group block">
        <div className="overflow-hidden rounded-xl border border-[#E8E4DE]/60 bg-card shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.10)] dark:border-white/8 dark:shadow-[0_2px_12px_rgba(0,0,0,0.2)] dark:group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
          {/* Preview */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <TemplatePreview template={template} />
            {/* Category tag */}
            <span className="absolute top-2 left-2 rounded-full bg-black/40 px-2 py-0.5 text-[9px] font-medium text-white/90 backdrop-blur-sm">
              {template.category.split(" ")[0]}
            </span>
          </div>
          {/* Info */}
          <div className="flex items-center justify-between p-3.5">
            <div>
              <h3 className="text-[13px] font-semibold text-foreground" style={{ fontFamily: "var(--font-playfair)" }}>
                {template.name}
              </h3>
              <p className="mt-0.5 text-[10px] text-muted-foreground">
                {template.category}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <span
                  className="text-[13px] font-bold text-[#D4AF37]"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {template.price}
                </span>
                {template.priceNote && (
                  <p className="text-[8px] text-muted-foreground">{template.priceNote}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ================================================================== */
/*  Main section                                                      */
/* ================================================================== */

const CARDS_PER_ROW = 4;

export function TemplateBrowseSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleRows, setVisibleRows] = useState(1);

  const filtered = activeCategory === "All"
    ? TEMPLATES
    : TEMPLATES.filter((t) => t.category === activeCategory);

  const visibleCount = visibleRows * CARDS_PER_ROW;
  const visible = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  function handleCategoryChange(cat: string) {
    setActiveCategory(cat);
    setVisibleRows(1); // reset to first row on tab change
  }

  return (
    <section id="templates" className="relative scroll-mt-20 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-4 inline-block rounded-full bg-[#D4AF37]/10 px-4 py-1 text-sm font-medium text-[#D4AF37]"
          >
            Templates
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-3xl font-bold md:text-5xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Explore Templates
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mx-auto mt-4 max-w-xl text-muted-foreground"
          >
            Browse our collection of professionally crafted templates.
            From wedding invitations to business cards — find the perfect design.
          </motion.p>
        </div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#1A1A1A] text-white shadow-sm dark:bg-[#D4AF37] dark:text-[#1A1A1A]"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Template grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {visible.map((template, i) => (
              <TemplateCard key={template.id} template={template} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* See more button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 flex justify-center"
          >
            <button
              onClick={() => setVisibleRows((r) => r + 1)}
              className="rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/[0.06] px-8 py-2.5 text-sm font-medium text-[#1A1A1A] transition-all hover:bg-[#D4AF37]/[0.12] hover:shadow-sm dark:text-[#F0E8D8]"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              See More Templates
            </button>
          </motion.div>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="py-16 text-center text-muted-foreground">
            No templates in this category yet.
          </div>
        )}
      </div>
    </section>
  );
}
