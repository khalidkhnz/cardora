"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Sparkles, Share2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Template } from "@/lib/template-data";
import { APP_NAME } from "@/lib/constants";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Footer } from "@/components/landing/footer";
import { BuyButton } from "@/components/landing/buy-flow";

/* ================================================================== */
/*  Template preview (reused visual from showcase)                    */
/* ================================================================== */

function LargePreview({ template: t }: { template: Template }) {
  if (t.style === "wedding") {
    // ── AZURE VOWS — open beach landscape, no arch ──
    if (t.id === "azure-vows") {
      return (
        <div className="relative flex h-full w-full flex-col justify-end overflow-hidden">
          {/* Sky */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#B8D8F0] via-[#D0E8F8] to-[#E0EEF5]" />
          {/* Sun glow */}
          <div className="absolute top-[8%] right-[12%] h-24 w-24 rounded-full bg-[#FFF0D0]/40 blur-[35px]" />
          <div className="absolute top-[10%] right-[15%] h-12 w-12 rounded-full bg-[#FFF8E8]/50 blur-[15px]" />
          {/* Horizon */}
          <div className="absolute bottom-[28%] left-0 right-0 h-[10%] bg-gradient-to-b from-[#6AACCC]/18 to-transparent" />
          {/* Sand */}
          <div className="absolute bottom-0 left-0 right-0 h-[28%] bg-gradient-to-t from-[#F0E4D0] via-[#EEE0CC] to-[#E8DCCA]/40" />
          {/* Waves */}
          <svg viewBox="0 0 200 10" preserveAspectRatio="none" className="absolute bottom-[26%] left-0 w-full">
            <path d="M0 5 Q20 2 40 5 Q60 8 80 5 Q100 2 120 5 Q140 8 160 5 Q180 2 200 5" stroke="#5A9CC0" strokeWidth="0.5" strokeOpacity="0.12" fill="none" />
          </svg>

          {/* Couple — off-center right */}
          <svg viewBox="0 0 80 110" className="absolute bottom-[22%] right-[18%] h-[120px]" fill="none">
            <circle cx="28" cy="22" r="10" fill="#2A4050" fillOpacity="0.50" />
            <path d="M16 100 L20 42 Q20 30 28 30 Q36 30 36 42 L40 100" fill="#2A4050" fillOpacity="0.40" />
            <path d="M25 40 L28 34 L31 40" fill="#4A7A98" fillOpacity="0.15" />
            <circle cx="52" cy="22" r="10" fill="#7A6050" fillOpacity="0.35" />
            <path d="M38 100 L42 40 Q42 30 52 30 Q62 30 62 40 L72 100 Q52 92 38 100Z" fill="#FFFFFF" fillOpacity="0.55" />
            <path d="M52 15 Q66 12 70 35 Q64 26 52 22" fill="#FFFFFF" fillOpacity="0.18" />
            <circle cx="42" cy="58" r="3" fill="#FFD0D0" fillOpacity="0.35" />
            <circle cx="42" cy="58" r="1.5" fill="#FFFFFF" fillOpacity="0.30" />
            <path d="M36 55 L42 55" stroke="#7A6050" strokeWidth="0.8" strokeOpacity="0.12" />
          </svg>

          {/* Loose flowers — left */}
          <svg viewBox="0 0 40 50" className="absolute bottom-[25%] left-[10%] h-12 opacity-30" fill="none">
            <circle cx="20" cy="12" r="6" fill="#FFFFFF" fillOpacity="0.55" />
            <circle cx="20" cy="12" r="3" fill="#FFD8D0" fillOpacity="0.35" />
            <circle cx="12" cy="18" r="4" fill="#FFE8E0" fillOpacity="0.30" />
            <circle cx="28" cy="18" r="4" fill="#FFFFFF" fillOpacity="0.35" />
            <path d="M18 22 L19 45" stroke="#8BC4A0" strokeWidth="0.5" strokeOpacity="0.20" />
            <path d="M22 22 L24 40" stroke="#8BC4A0" strokeWidth="0.4" strokeOpacity="0.15" />
          </svg>

          {/* Text — bottom left */}
          <div className="relative z-10 p-8 pb-10">
            <h3 className="text-[26px] leading-tight text-[#1A3A4A]" style={{ fontFamily: "var(--font-great-vibes)" }}>
              James <span className="text-[#5B9EC4]">&</span> Rose
            </h3>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-px w-10 bg-[#5B9EC4]/20" />
              <p className="text-[9px] text-[#4A7A98]/50" style={{ fontFamily: "var(--font-cormorant)" }}>October 8, 2026</p>
            </div>
            <p className="mt-1 text-[7px] uppercase tracking-[0.1em] text-[#4A7A98]/35" style={{ fontFamily: "var(--font-montserrat)" }}>Sunset Beach · Malibu</p>
          </div>
        </div>
      );
    }

    // ── WHISPERED VOWS — warm brown, invitation letter scene ──
    if (t.id === "whispered-vows") {
      return (
        <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
          {/* Rich brown gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#C8B898] via-[#B8A882] to-[#A89870]" />
          {/* Paper grain — heavier */}
          <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='a'%3E%3CfeTurbulence baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23a)' opacity='.4'/%3E%3C/svg%3E\")" }} />
          {/* Warm glow spots */}
          <div className="absolute top-[8%] left-[20%] h-20 w-20 rounded-full bg-[#FFE0A0]/20 blur-[25px]" />
          <div className="absolute top-[12%] right-[22%] h-16 w-16 rounded-full bg-[#FFE0A0]/15 blur-[20px]" />
          <div className="absolute top-[5%] left-1/2 h-12 w-12 -translate-x-1/2 rounded-full bg-[#FFE0A0]/18 blur-[15px]" />

          {/* Full scene SVG */}
          <svg viewBox="0 0 220 320" className="relative h-[280px] w-auto" fill="none">
            {/* Fairy light string across top */}
            <path d="M15 30 Q55 15 110 25 Q165 15 205 30" stroke="#5A4830" strokeWidth="0.4" strokeOpacity="0.12" />
            <circle cx="35" cy="22" r="2" fill="#FFE8A0" fillOpacity="0.40" />
            <circle cx="65" cy="18" r="2" fill="#FFE8A0" fillOpacity="0.35" />
            <circle cx="95" cy="22" r="2" fill="#FFE8A0" fillOpacity="0.38" />
            <circle cx="125" cy="18" r="2" fill="#FFE8A0" fillOpacity="0.32" />
            <circle cx="155" cy="20" r="2" fill="#FFE8A0" fillOpacity="0.35" />
            <circle cx="185" cy="26" r="2" fill="#FFE8A0" fillOpacity="0.30" />
            {/* Light glow halos */}
            <circle cx="65" cy="18" r="6" fill="#FFE8A0" fillOpacity="0.06" />
            <circle cx="125" cy="18" r="6" fill="#FFE8A0" fillOpacity="0.05" />

            {/* Main invitation card — center, large */}
            <rect x="45" y="50" width="130" height="170" rx="4" fill="#F0E8D4" fillOpacity="0.80" stroke="#5A4830" strokeWidth="0.6" strokeOpacity="0.15" />
            {/* Inner border */}
            <rect x="52" y="57" width="116" height="156" rx="2" fill="none" stroke="#5A4830" strokeWidth="0.3" strokeOpacity="0.08" />
            {/* Decorative top flourish */}
            <path d="M90 65 Q100 58 110 65 Q110 70 100 72 Q90 70 90 65Z" fill="#5A4830" fillOpacity="0.10" />
            <circle cx="100" cy="65" r="2" fill="#5A4830" fillOpacity="0.12" />
            {/* Text lines */}
            <line x1="70" y1="82" x2="150" y2="82" stroke="#5A4830" strokeWidth="0.3" strokeOpacity="0.08" />
            {/* Names — represented as elegant text area */}
            <text x="110" y="108" textAnchor="middle" fill="#3A2818" fillOpacity="0.60" fontSize="18" style={{ fontFamily: "cursive" }}>R &amp; A</text>
            {/* Date line */}
            <line x1="80" y1="120" x2="140" y2="120" stroke="#5A4830" strokeWidth="0.3" strokeOpacity="0.06" />
            <text x="110" y="136" textAnchor="middle" fill="#5A4830" fillOpacity="0.30" fontSize="6">November 20, 2026</text>
            {/* Decorative bottom */}
            <path d="M85 160 Q100 155 115 160" stroke="#5A4830" strokeWidth="0.4" strokeOpacity="0.10" />
            <circle cx="100" cy="165" r="1.5" fill="#5A4830" fillOpacity="0.10" />
            {/* Wax seal */}
            <circle cx="110" cy="195" r="10" fill="#8B4040" fillOpacity="0.25" />
            <circle cx="110" cy="195" r="6" fill="#A05050" fillOpacity="0.18" />
            <text x="110" y="198" textAnchor="middle" fill="#F0E0D0" fillOpacity="0.40" fontSize="5" fontWeight="bold">R&amp;A</text>

            {/* Second card — behind, tilted left */}
            <rect x="25" y="60" width="80" height="105" rx="3" fill="#E8DCC4" fillOpacity="0.45" stroke="#5A4830" strokeWidth="0.3" strokeOpacity="0.08" transform="rotate(-8 65 112)" />

            {/* Photo frame — behind right, tilted */}
            <rect x="130" y="55" width="55" height="70" rx="3" fill="#D4C4A0" fillOpacity="0.40" stroke="#5A4830" strokeWidth="0.4" strokeOpacity="0.12" transform="rotate(6 157 90)" />
            <rect x="135" y="60" width="45" height="52" rx="1.5" fill="#C8B898" fillOpacity="0.30" transform="rotate(6 157 86)" />

            {/* Flowers — bottom left cluster */}
            <circle cx="30" cy="248" r="12" fill="#C09080" fillOpacity="0.35" />
            <circle cx="30" cy="248" r="7" fill="#D4A090" fillOpacity="0.25" />
            <circle cx="45" cy="258" r="9" fill="#B88070" fillOpacity="0.28" />
            <circle cx="18" cy="260" r="7" fill="#D4B0A0" fillOpacity="0.22" />
            <circle cx="55" cy="248" r="6" fill="#E8C8B0" fillOpacity="0.20" />
            <path d="M12 252 Q5 244 15 240 Q18 248 12 252Z" fill="#6A7A50" fillOpacity="0.22" />
            <path d="M60 244 Q66 238 58 235 Q55 242 60 244Z" fill="#6A7A50" fillOpacity="0.18" />

            {/* Flowers — bottom right */}
            <circle cx="185" cy="250" r="10" fill="#C09080" fillOpacity="0.30" />
            <circle cx="185" cy="250" r="6" fill="#D4A090" fillOpacity="0.22" />
            <circle cx="172" cy="258" r="7" fill="#B88070" fillOpacity="0.25" />
            <circle cx="196" cy="260" r="6" fill="#E8C8B0" fillOpacity="0.18" />
            <path d="M200 252 Q206 244 198 240 Q195 248 200 252Z" fill="#6A7A50" fillOpacity="0.20" />

            {/* Wooden table surface at bottom */}
            <rect x="5" y="270" width="210" height="45" rx="3" fill="#6A5030" fillOpacity="0.12" />
            <line x1="10" y1="280" x2="210" y2="280" stroke="#6A5030" strokeWidth="0.3" strokeOpacity="0.06" />
            <line x1="10" y1="290" x2="210" y2="290" stroke="#6A5030" strokeWidth="0.2" strokeOpacity="0.04" />

            {/* Glass bottle — left */}
            <rect x="168" y="230" width="7" height="30" rx="3" fill="#7A9A70" fillOpacity="0.15" />
            <path d="M169 230 Q171.5 222 174 230" fill="#7A9A70" fillOpacity="0.10" />
            {/* Small flower in bottle */}
            <circle cx="171.5" cy="220" r="3" fill="#D4A090" fillOpacity="0.18" />

            {/* Vintage key */}
            <path d="M80 278 L95 278 M95 275 Q100 275 100 278 Q100 281 95 281 Z" stroke="#5A4830" strokeWidth="0.5" strokeOpacity="0.10" fill="none" />
            <circle cx="80" cy="278" r="3" stroke="#5A4830" strokeWidth="0.4" strokeOpacity="0.08" fill="none" />
          </svg>

          {/* Names overlay at bottom */}
          <div className="relative z-10 mt-2 text-center">
            <h3 className="text-[22px] leading-tight text-[#F0E4D0]" style={{ fontFamily: "var(--font-dancing-script)" }}>
              Rohan & Aisha
            </h3>
            <div className="mt-1 flex items-center justify-center gap-2">
              <div className="h-px w-8 bg-[#F0E4D0]/20" />
              <p className="text-[8px] italic text-[#F0E4D0]/40" style={{ fontFamily: "var(--font-cormorant)" }}>Whispered Vows</p>
              <div className="h-px w-8 bg-[#F0E4D0]/20" />
            </div>
            <p className="mt-1 text-[7px] text-[#F0E4D0]/30" style={{ fontFamily: "var(--font-montserrat)" }}>Nov 20, 2026</p>
          </div>
        </div>
      );
    }

    // ── THE MAHARANI — default warm peach, floral arch ──
    return (
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#F8EAD8] via-[#F2DCCA] to-[#EACEBC] p-8 text-center">
        <div className="absolute top-[15%] left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[#D4AF37]/[0.06] blur-[50px]" />
        <div className="absolute top-[8%] left-[10%] h-20 w-20 rounded-full bg-[#E88090]/[0.06] blur-[25px]" />
        <div className="absolute top-[10%] right-[10%] h-20 w-20 rounded-full bg-[#FFB0A0]/[0.05] blur-[22px]" />
        <svg viewBox="0 0 180 220" className="relative my-2 h-[200px] w-auto" fill="none">
          <path d="M15 210 L15 75 Q15 25 90 12 Q165 25 165 75 L165 210" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.20" />
          <circle cx="90" cy="18" r="8" fill="#E88090" fillOpacity="0.30" /><circle cx="90" cy="18" r="5" fill="#FF9BAA" fillOpacity="0.22" />
          <circle cx="78" cy="24" r="6" fill="#FFB0A0" fillOpacity="0.25" /><circle cx="102" cy="24" r="6" fill="#FF8C6A" fillOpacity="0.22" />
          <path d="M68 28 Q62 22 72 18" fill="#5A8A50" fillOpacity="0.18" /><path d="M112 28 Q118 22 108 18" fill="#5A8A50" fillOpacity="0.18" />
          <circle cx="20" cy="60" r="5" fill="#E88090" fillOpacity="0.20" /><circle cx="160" cy="60" r="5" fill="#FFB0A0" fillOpacity="0.20" />
          <circle cx="18" cy="75" r="3.5" fill="#FFCCC0" fillOpacity="0.14" /><circle cx="162" cy="75" r="3.5" fill="#FFCCC0" fillOpacity="0.14" />
          <line x1="45" y1="28" x2="45" y2="45" stroke="#D4AF37" strokeWidth="0.3" strokeOpacity="0.15" /><circle cx="45" cy="46" r="1.5" fill="#D4AF37" fillOpacity="0.12" />
          <line x1="135" y1="28" x2="135" y2="45" stroke="#D4AF37" strokeWidth="0.3" strokeOpacity="0.15" /><circle cx="135" cy="46" r="1.5" fill="#D4AF37" fillOpacity="0.12" />
          <circle cx="75" cy="80" r="11" fill="#5A3020" fillOpacity="0.50" />
          <path d="M60 190 L65 100 Q65 88 75 88 Q85 88 85 100 L90 190" fill="#5A3020" fillOpacity="0.40" />
          <path d="M68 74 Q75 66 82 74 Q82 82 75 83 Q68 82 68 74Z" fill="#D4AF37" fillOpacity="0.30" />
          <circle cx="105" cy="80" r="11" fill="#6A2030" fillOpacity="0.45" />
          <path d="M85 190 L90 98 Q90 88 105 88 Q120 88 120 98 L130 190 Q105 182 85 190Z" fill="#8A2040" fillOpacity="0.32" />
          <path d="M105 72 Q118 70 120 95 Q116 85 105 80" fill="#E88090" fillOpacity="0.15" />
          <circle cx="105" cy="76" r="1.5" fill="#D4AF37" fillOpacity="0.38" />
          <path d="M85 106 Q95 120 105 106" stroke="#D4AF37" strokeOpacity="0.28" strokeWidth="0.8" />
          <circle cx="88" cy="110" r="2" fill="#E88090" fillOpacity="0.28" /><circle cx="95" cy="115" r="2.5" fill="#D4AF37" fillOpacity="0.20" /><circle cx="102" cy="110" r="2" fill="#FFB0A0" fillOpacity="0.28" />
        </svg>
        <h3 className="relative text-[22px] leading-tight text-[#3A1A10]" style={{ fontFamily: "var(--font-great-vibes)" }}>Aarav <span className="text-[#D4AF37]">&</span> Priya</h3>
        <div className="relative my-2 flex items-center gap-2"><div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4AF37]/30" /><span className="text-[7px] text-[#D4AF37]/45">✦</span><div className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4AF37]/30" /></div>
        <p className="relative text-[10px] text-[#8B6040]/60" style={{ fontFamily: "var(--font-cormorant)" }}>June 15, 2026 · Six in the Evening</p>
        <p className="relative mt-1 text-[8px] uppercase tracking-[0.12em] text-[#8B6040]/40" style={{ fontFamily: "var(--font-montserrat)" }}>The Royal Palace · Jaipur</p>
      </div>
    );
  }
  if (t.style === "business" && t.id === "maison-blanche") {
    return (
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#E8E5E0] via-[#E0DCDA] to-[#D4D0CC]">
        {/* Studio light */}
        <div className="absolute top-[8%] right-[12%] h-28 w-28 rounded-full bg-white/20 blur-[35px]" />
        <div className="absolute bottom-[15%] left-[15%] h-20 w-20 rounded-full bg-[#8A8A90]/[0.05] blur-[25px]" />
        {/* Grain */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='a'%3E%3CfeTurbulence baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23a)' opacity='.4'/%3E%3C/svg%3E\")" }} />

        <svg viewBox="0 0 220 260" className="relative h-[240px] w-auto" fill="none">
          {/* Photo backdrop */}
          <rect x="45" y="10" width="130" height="85" rx="5" fill="#B0B0B5" fillOpacity="0.08" />
          <rect x="52" y="18" width="116" height="68" rx="3" fill="#A0A0A5" fillOpacity="0.06" />
          {/* Portrait hint */}
          <circle cx="110" cy="38" r="14" fill="#8A8A90" fillOpacity="0.08" />
          <path d="M92 82 L98 55 Q98 45 110 45 Q122 45 122 55 L128 82" fill="#8A8A90" fillOpacity="0.05" />

          {/* Back card */}
          <rect x="40" y="95" width="140" height="85" rx="5" fill="#F5F3F0" stroke="#2A2828" strokeWidth="0.4" strokeOpacity="0.10" transform="rotate(-4 110 137)" />

          {/* Front card — editorial photographer */}
          <rect x="35" y="108" width="150" height="90" rx="5" fill="#FAFAF8" stroke="#2A2828" strokeWidth="0.5" strokeOpacity="0.15" transform="rotate(2 110 153)" />
          {/* Charcoal left bar */}
          <rect x="35" y="108" width="5" height="90" rx="2.5" fill="#2A2828" fillOpacity="0.65" transform="rotate(2 37 153)" />
          {/* Name */}
          <text x="50" y="135" fill="#1A1818" fillOpacity="0.75" fontSize="14" fontWeight="bold" transform="rotate(2 50 135)" style={{ fontFamily: "serif" }}>Elena Rossi</text>
          <text x="50" y="148" fill="#2A2828" fillOpacity="0.35" fontSize="6" transform="rotate(2 50 148)" letterSpacing="2">PHOTOGRAPHER</text>
          {/* Divider */}
          <line x1="50" y1="158" x2="120" y2="159" stroke="#2A2828" strokeWidth="0.3" strokeOpacity="0.10" transform="rotate(2 85 158)" />
          {/* Contact */}
          <text x="50" y="172" fill="#2A2828" fillOpacity="0.22" fontSize="5" transform="rotate(2 50 172)">elena@rossi.studio</text>
          <text x="50" y="182" fill="#2A2828" fillOpacity="0.18" fontSize="5" transform="rotate(2 50 182)">+1 (416) 555-0198</text>
          <text x="50" y="192" fill="#2A2828" fillOpacity="0.15" fontSize="5" transform="rotate(2 50 192)">rossi.studio</text>
          {/* Camera icon */}
          <circle cx="160" cy="172" r="10" stroke="#2A2828" strokeWidth="0.4" strokeOpacity="0.12" fill="none" transform="rotate(2 160 172)" />
          <circle cx="160" cy="172" r="4" fill="#2A2828" fillOpacity="0.06" transform="rotate(2 160 172)" />
          <rect x="155" y="162" width="10" height="3" rx="1" fill="#2A2828" fillOpacity="0.04" transform="rotate(2 160 163)" />
        </svg>

        <p className="relative mt-2 text-[8px] font-semibold uppercase tracking-[0.3em] text-[#2A2828]/35" style={{ fontFamily: "var(--font-montserrat)" }}>Maison Blanche</p>
        <p className="relative mt-1 text-[7px] text-[#2A2828]/20" style={{ fontFamily: "var(--font-cormorant)" }}>Luxury Photography Identity</p>
      </div>
    );
  }
  if (t.style === "business") {
    return (
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#1E2028] via-[#1A1C24] to-[#14161C]">
        {/* Radial glow */}
        <div className="absolute top-[25%] left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#C6A85A]/[0.05] blur-[50px]" />
        {/* Diagonal texture */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "repeating-linear-gradient(135deg,transparent,transparent 3px,rgba(255,255,255,0.3) 3px,rgba(255,255,255,0.3) 4px)" }} />
        {/* Grain */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='a'%3E%3CfeTurbulence baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23a)' opacity='.4'/%3E%3C/svg%3E\")" }} />

        {/* Floating cards in perspective */}
        <svg viewBox="0 0 240 200" className="relative h-[240px] w-auto" fill="none">
          {/* Shadow under cards */}
          <ellipse cx="120" cy="185" rx="80" ry="6" fill="#000" fillOpacity="0.15" />

          {/* Back card — tilted left */}
          <rect x="30" y="35" width="150" height="90" rx="6" fill="#252830" stroke="#C6A85A" strokeWidth="0.4" strokeOpacity="0.18" transform="rotate(-8 105 80)" />
          <line x1="40" y1="42" x2="170" y2="35" stroke="#C6A85A" strokeWidth="1" strokeOpacity="0.15" transform="rotate(-8 105 38)" />
          <rect x="45" y="52" width="18" height="18" rx="3" fill="#C6A85A" fillOpacity="0.12" transform="rotate(-8 54 61)" />
          <line x1="70" y1="60" x2="120" y2="55" stroke="#E8E4DC" strokeWidth="0.3" strokeOpacity="0.08" transform="rotate(-8 95 57)" />
          <line x1="70" y1="68" x2="105" y2="63" stroke="#E8E4DC" strokeWidth="0.2" strokeOpacity="0.05" transform="rotate(-8 87 65)" />

          {/* Front card — main, slight tilt right */}
          <rect x="35" y="55" width="170" height="100" rx="6" fill="#22252E" stroke="#C6A85A" strokeWidth="0.5" strokeOpacity="0.22" transform="rotate(4 120 105)" />
          {/* Gold top line */}
          <line x1="42" y1="60" x2="198" y2="65" stroke="#C6A85A" strokeWidth="1.2" strokeOpacity="0.30" transform="rotate(4 120 62)" />
          {/* Logo */}
          <rect x="50" y="72" width="22" height="22" rx="4" fill="#C6A85A" fillOpacity="0.15" stroke="#C6A85A" strokeWidth="0.4" strokeOpacity="0.15" transform="rotate(4 61 83)" />
          <text x="61" y="87" textAnchor="middle" fill="#C6A85A" fillOpacity="0.55" fontSize="10" fontWeight="bold" transform="rotate(4 61 87)" style={{ fontFamily: "serif" }}>N</text>
          {/* Name */}
          <text x="82" y="84" fill="#E8E4DC" fillOpacity="0.65" fontSize="12" fontWeight="bold" transform="rotate(4 82 84)" style={{ fontFamily: "serif" }}>Aman Gupta</text>
          <text x="82" y="96" fill="#C6A85A" fillOpacity="0.40" fontSize="5.5" transform="rotate(4 82 96)" letterSpacing="1.5">MANAGING DIRECTOR</text>
          {/* Divider */}
          <line x1="50" y1="106" x2="140" y2="110" stroke="#C6A85A" strokeWidth="0.4" strokeOpacity="0.15" transform="rotate(4 95 108)" />
          {/* Contact */}
          <text x="52" y="120" fill="#E8E4DC" fillOpacity="0.25" fontSize="5" transform="rotate(4 52 120)">aman@aurelius.co</text>
          <text x="52" y="128" fill="#E8E4DC" fillOpacity="0.20" fontSize="5" transform="rotate(4 52 128)">+1 (647) 555-0123</text>
          <text x="52" y="136" fill="#E8E4DC" fillOpacity="0.18" fontSize="5" transform="rotate(4 52 136)">aurelius.co</text>
          {/* QR */}
          <rect x="165" y="112" width="22" height="22" rx="2" fill="#C6A85A" fillOpacity="0.08" stroke="#C6A85A" strokeWidth="0.3" strokeOpacity="0.12" transform="rotate(4 176 123)" />
          <rect x="168" y="115" width="5" height="5" rx="0.5" fill="#C6A85A" fillOpacity="0.15" transform="rotate(4 170 117)" />
          <rect x="178" y="115" width="5" height="5" rx="0.5" fill="#C6A85A" fillOpacity="0.15" transform="rotate(4 180 117)" />
          <rect x="168" y="125" width="5" height="5" rx="0.5" fill="#C6A85A" fillOpacity="0.15" transform="rotate(4 170 127)" />
          <circle cx="176" cy="123" r="2.5" fill="#C6A85A" fillOpacity="0.12" transform="rotate(4 176 123)" />
        </svg>

        {/* Vintage car silhouette */}
        <svg viewBox="0 0 220 55" className="relative mt-4 w-[180px]" fill="none">
          <path d="M20 42 L20 30 Q20 22 38 20 L60 18 Q72 12 85 10 L165 10 Q180 12 188 18 L200 22 Q210 25 210 32 L210 42" fill="#C6A85A" fillOpacity="0.05" stroke="#C6A85A" strokeWidth="0.5" strokeOpacity="0.12" />
          <path d="M78 18 L88 8 L155 8 L168 18" fill="#1E2028" fillOpacity="0.4" stroke="#C6A85A" strokeWidth="0.3" strokeOpacity="0.08" />
          <circle cx="52" cy="44" r="8" fill="#1E2028" stroke="#C6A85A" strokeWidth="0.4" strokeOpacity="0.15" />
          <circle cx="52" cy="44" r="4" fill="#C6A85A" fillOpacity="0.04" />
          <circle cx="178" cy="44" r="8" fill="#1E2028" stroke="#C6A85A" strokeWidth="0.4" strokeOpacity="0.15" />
          <circle cx="178" cy="44" r="4" fill="#C6A85A" fillOpacity="0.04" />
          <circle cx="28" cy="28" r="1.5" fill="#C6A85A" fillOpacity="0.18" />
          <line x1="32" y1="32" x2="205" y2="32" stroke="#C6A85A" strokeWidth="0.2" strokeOpacity="0.06" />
        </svg>

        {/* Label */}
        <p className="relative mt-3 text-[8px] font-semibold uppercase tracking-[0.3em] text-[#C6A85A]/40" style={{ fontFamily: "var(--font-cinzel)" }}>Regent Motors</p>
        <p className="relative mt-1 text-[7px] text-[#E8E4DC]/20" style={{ fontFamily: "var(--font-cormorant)" }}>Luxury Automotive Identity</p>
      </div>
    );
  }
  if (t.style === "animated") {
    return (
      <div className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-b ${t.colors.bg} p-8 text-center`}>
        <svg viewBox="0 0 120 30" className="mb-3 w-[60%] opacity-30" fill="none">
          <path d="M0 15 Q30 5 60 15 Q90 25 120 15" stroke={t.colors.accent} strokeWidth="1" />
          <path d="M0 20 Q30 10 60 20 Q90 30 120 20" stroke={t.colors.accent} strokeWidth="0.6" strokeOpacity="0.5" />
        </svg>
        <div className="flex h-14 w-14 items-center justify-center rounded-full" style={{ border: `2px solid ${t.colors.accent}40`, background: `${t.colors.accent}10` }}>
          <svg viewBox="0 0 16 16" className="ml-0.5 h-5 w-5" fill={t.colors.accent} fillOpacity="0.7"><path d="M4 2 L14 8 L4 14Z" /></svg>
        </div>
        <h3 className="mt-3 text-[16px] font-bold" style={{ color: t.colors.text, fontFamily: "var(--font-playfair)" }}>Cinematic Invite</h3>
        <p className="mt-1 text-[9px]" style={{ color: `${t.colors.accent}50`, fontFamily: "var(--font-montserrat)" }}>Music · Parallax · RSVP</p>
      </div>
    );
  }
  if (t.style === "dashboard") {
    return (
      <div className="flex h-full w-full flex-col bg-gradient-to-b from-white to-[#F5F2ED] p-6">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#D4AF37]/15">
              <div className="h-2.5 w-2.5 rounded-sm bg-[#D4AF37]" />
            </div>
            <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#8B7355]" style={{ fontFamily: "var(--font-montserrat)" }}>Lumière Insights</span>
          </div>
          <div className="flex gap-1">
            {["Week", "Month"].map((p) => (
              <span key={p} className={`rounded-full px-2 py-0.5 text-[6px] font-medium ${p === "Week" ? "bg-[#1A1A1A] text-white" : "text-[#8B8580]"}`}>{p}</span>
            ))}
          </div>
        </div>

        {/* Stat cards */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { label: "Total Views", value: "2,847", change: "+24%" },
            { label: "QR Scans", value: "482", change: "+18%" },
            { label: "NFC Taps", value: "156", change: "+32%" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-[#E8E4DE] bg-white p-2.5">
              <p className="text-[5px] font-medium uppercase tracking-wider text-[#8B8580]">{s.label}</p>
              <p className="mt-0.5 text-[16px] font-bold leading-tight text-[#1A1A1A]" style={{ fontFamily: "var(--font-montserrat)" }}>{s.value}</p>
              <p className="mt-0.5 text-[6px] font-medium text-[#B8860B]">↑ {s.change}</p>
            </div>
          ))}
        </div>

        {/* Chart area */}
        <div className="mt-3 rounded-lg border border-[#E8E4DE] bg-white p-3">
          <div className="flex items-center justify-between">
            <span className="text-[6px] font-medium uppercase tracking-wider text-[#8B8580]">Weekly Performance</span>
            <div className="flex gap-2 text-[5px] text-[#8B8580]">
              <span className="flex items-center gap-0.5"><span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />Views</span>
              <span className="flex items-center gap-0.5"><span className="h-1.5 w-1.5 rounded-full bg-[#8B7355]" />Scans</span>
            </div>
          </div>
          <div className="mt-2 flex items-end gap-1.5">
            {[
              { v: 34, s: 12 }, { v: 42, s: 18 }, { v: 38, s: 14 },
              { v: 51, s: 22 }, { v: 46, s: 20 }, { v: 29, s: 10 }, { v: 35, s: 15 },
            ].map((d, i) => (
              <div key={i} className="flex flex-1 items-end justify-center gap-[2px]" style={{ height: 70 }}>
                <div className="w-[5px] rounded-t bg-gradient-to-t from-[#D4AF37]/30 to-[#D4AF37]/70" style={{ height: (d.v / 51) * 70 }} />
                <div className="w-[5px] rounded-t bg-gradient-to-t from-[#8B7355]/25 to-[#8B7355]/55" style={{ height: (d.s / 51) * 70 }} />
              </div>
            ))}
          </div>
          <div className="mt-1 flex justify-between px-1 text-[5px] text-[#8B8580]">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => <span key={d}>{d}</span>)}
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-2 grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-[#E8E4DE] bg-white p-2">
            <p className="text-[5px] uppercase tracking-wider text-[#8B8580]">Top Source</p>
            <p className="mt-0.5 text-[8px] font-semibold text-[#1A1A1A]">Direct Link — 42%</p>
            <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-[#F3F0EB]">
              <div className="h-full w-[42%] rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B]" />
            </div>
          </div>
          <div className="rounded-lg border border-[#E8E4DE] bg-white p-2">
            <p className="text-[5px] uppercase tracking-wider text-[#8B8580]">Activity</p>
            <div className="mt-1 space-y-0.5">
              {["QR Scan — Toronto", "NFC Tap — Vancouver", "Link — Montreal"].map((a) => (
                <p key={a} className="truncate text-[5px] text-[#6B6560]">{a}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  // qr / global fallback
  return (
    <div className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-b ${t.colors.bg} p-8 text-center`}>
      <svg viewBox="0 0 50 50" className="h-14 w-14" fill="none">
        <rect x="3" y="3" width="14" height="14" rx="2" fill={t.colors.accent} fillOpacity="0.6" />
        <rect x="5" y="5" width="10" height="10" rx="1" fill={t.colors.bg.includes("EC") ? "#F8F4EE" : "#0A0A0A"} />
        <rect x="7" y="7" width="6" height="6" rx="0.5" fill={t.colors.accent} fillOpacity="0.6" />
        <rect x="33" y="3" width="14" height="14" rx="2" fill={t.colors.accent} fillOpacity="0.6" />
        <rect x="35" y="5" width="10" height="10" rx="1" fill={t.colors.bg.includes("EC") ? "#F8F4EE" : "#0A0A0A"} />
        <rect x="37" y="7" width="6" height="6" rx="0.5" fill={t.colors.accent} fillOpacity="0.6" />
        <rect x="3" y="33" width="14" height="14" rx="2" fill={t.colors.accent} fillOpacity="0.6" />
        <rect x="5" y="35" width="10" height="10" rx="1" fill={t.colors.bg.includes("EC") ? "#F8F4EE" : "#0A0A0A"} />
        <rect x="7" y="37" width="6" height="6" rx="0.5" fill={t.colors.accent} fillOpacity="0.6" />
        <circle cx="25" cy="25" r="5" fill={t.colors.accent} fillOpacity="0.7" />
      </svg>
      <h3 className="mt-3 text-[14px] font-bold" style={{ color: `${t.colors.text}D0`, fontFamily: "var(--font-playfair)" }}>{t.name}</h3>
      <p className="mt-1 text-[8px]" style={{ color: `${t.colors.accent}60`, fontFamily: "var(--font-montserrat)" }}>Smart Sharing</p>
    </div>
  );
}

/* ================================================================== */
/*  Main detail page                                                  */
/* ================================================================== */

export function TemplateDetailContent({ template }: { template: Template }) {
  return (
    <main className="flex min-h-screen flex-col">
      {/* ── Navbar ── */}
      <header className="fixed top-0 right-0 left-0 z-50 border-b border-[#E8E4DE]/60 bg-[#FAF8F5]/80 backdrop-blur-xl dark:border-white/10 dark:bg-[#141414]/80">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-0.5">
            <Image src="/cardora-logo.png" alt="Cardora" width={30} height={30} className="h-7 w-7 object-contain mix-blend-multiply dark:hidden" />
            <Image src="/cardora-logo.png" alt="Cardora" width={30} height={30} className="hidden h-7 w-7 object-contain drop-shadow-[0_0_1px_rgba(255,255,255,0.8)] [filter:drop-shadow(0_0_2px_rgba(255,255,255,0.4))_drop-shadow(0_0_1px_rgba(255,255,255,0.6))] dark:block" />
            <span className="text-xl font-bold tracking-wide text-[#1A1A1A] dark:text-[#F0E8D8]" style={{ fontFamily: "var(--font-playfair)" }}>{APP_NAME}</span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/#templates" className="rounded-md px-3 py-1.5 text-sm font-medium text-[#1A1A1A] transition-colors hover:bg-[#F3F0EB] dark:text-[#F5ECD7] dark:hover:bg-white/10">
              All Templates
            </Link>
          </div>
        </nav>
      </header>

      {/* ── Hero section ── */}
      <section className="mx-auto w-full max-w-6xl px-6 pt-28 pb-16">
        {/* Back link */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <Link href="/#templates" className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Templates
          </Link>
        </motion.div>

        <div className="mt-6 grid items-start gap-12 lg:grid-cols-2">
          {/* Left — large preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="overflow-hidden rounded-2xl border border-[#E8E4DE]/50 shadow-[0_12px_50px_rgba(0,0,0,0.10)] dark:border-white/8 dark:shadow-[0_12px_50px_rgba(0,0,0,0.3)]">
              <div className="aspect-[3/4]">
                <LargePreview template={template} />
              </div>
            </div>
          </motion.div>

          {/* Right — details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col"
          >
            {/* Tags */}
            <div className="mb-4 flex flex-wrap gap-2">
              {template.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#D4AF37]/10 px-3 py-0.5 text-[11px] font-medium text-[#D4AF37]"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Name */}
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl" style={{ fontFamily: "var(--font-playfair)" }}>
              {template.name}
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground" style={{ fontFamily: "var(--font-cormorant)" }}>
              {template.description}
            </p>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#D4AF37]" style={{ fontFamily: "var(--font-montserrat)" }}>
                {template.price}
              </span>
              {template.priceNote && (
                <span className="text-sm text-muted-foreground">/ {template.priceNote}</span>
              )}
            </div>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              {["the-maharani", "azure-vows", "whispered-vows", "noir-atelier", "maison-blanche", "lumiere-insights", "auric-touch", "obsidian-cipher"].includes(template.id) ? (
                <Link href={`/templates/${template.id}/preview`}>
                  <Button
                    size="lg"
                    className="gap-2 bg-gradient-to-r from-[#D4AF37] to-[#C6A85A] text-base text-white hover:from-[#C09A2F] hover:to-[#B89848]"
                  >
                    <Eye className="h-4 w-4" />
                    Preview Template
                  </Button>
                </Link>
              ) : (
                <Button
                  size="lg"
                  disabled
                  className="gap-2 bg-[#D4AF37]/20 text-base text-[#D4AF37]/60 cursor-not-allowed"
                >
                  <Eye className="h-4 w-4" />
                  Preview Coming Soon
                </Button>
              )}
              <BuyButton template={template} size="lg" />
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-[#D4AF37]/25 text-base hover:bg-[#D4AF37]/8 dark:border-[#D4AF37]/30 dark:text-[#F0E8D8] dark:hover:bg-[#D4AF37]/15"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>

            {/* Divider */}
            <div className="my-8 h-px bg-border" />

            {/* Quick features */}
            <div className="grid grid-cols-2 gap-3">
              {template.features.slice(0, 4).map((feat) => (
                <div key={feat} className="flex items-center gap-2">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/10">
                    <Check className="h-3 w-3 text-[#D4AF37]" />
                  </div>
                  <span className="text-sm text-muted-foreground">{feat}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="border-t bg-muted/20 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <span className="mb-3 inline-block rounded-full bg-[#D4AF37]/10 px-4 py-1 text-sm font-medium text-[#D4AF37]">
              What&apos;s Included
            </span>
            <h2 className="text-2xl font-bold md:text-3xl" style={{ fontFamily: "var(--font-playfair)" }}>
              Everything you need
            </h2>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {template.includes.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-start gap-3 rounded-xl border bg-card p-5 shadow-sm"
              >
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/10">
                  <Check className="h-3.5 w-3.5 text-[#D4AF37]" />
                </div>
                <span className="text-sm leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <span className="mb-3 inline-block rounded-full bg-[#D4AF37]/10 px-4 py-1 text-sm font-medium text-[#D4AF37]">
              Features
            </span>
            <h2 className="text-2xl font-bold md:text-3xl" style={{ fontFamily: "var(--font-playfair)" }}>
              Crafted with care
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Sparkles, title: "Premium Design", desc: "Every pixel is intentionally placed for a premium, luxurious feel." },
              { icon: Eye, title: "Live Preview", desc: "See exactly how your invitation will look before you publish." },
              { icon: Share2, title: "Easy Sharing", desc: "Share instantly via QR code, NFC tap, or a direct link." },
            ].map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-xl border bg-card p-6 shadow-sm"
              >
                <div className="mb-4 inline-flex rounded-xl bg-[#D4AF37]/10 p-3">
                  <feat.icon className="h-5 w-5 text-[#D4AF37]" />
                </div>
                <h3 className="mb-2 text-base font-semibold">{feat.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold md:text-3xl" style={{ fontFamily: "var(--font-playfair)" }}>
            Ready to create your {template.style === "wedding" || template.style === "animated" ? "invitation" : "card"}?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Get started with {template.name} today.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            {["the-maharani", "azure-vows", "whispered-vows", "noir-atelier", "maison-blanche", "lumiere-insights", "auric-touch", "obsidian-cipher"].includes(template.id) ? (
              <Link href={`/templates/${template.id}/preview`}>
                <Button
                  size="lg"
                  className="gap-2 bg-gradient-to-r from-[#D4AF37] to-[#C6A85A] text-base text-white hover:from-[#C09A2F] hover:to-[#B89848]"
                >
                  Preview Template
                  <ArrowLeft className="h-4 w-4 rotate-180" />
                </Button>
              </Link>
            ) : (
              <Button
                size="lg"
                disabled
                className="gap-2 bg-[#D4AF37]/20 text-base text-[#D4AF37]/60 cursor-not-allowed"
              >
                Preview Coming Soon
                <ArrowLeft className="h-4 w-4 rotate-180" />
              </Button>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
