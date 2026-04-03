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

    // ── VELVET HEIRLOOM — dark burgundy, gold mandala ──
    if (t.id === "velvet-heirloom") {
      return (
        <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#2A0E12] via-[#1E0A0E] to-[#140608] p-8 text-center">
          <div className="absolute top-[25%] left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[#D4AF37]/[0.06] blur-[45px]" />
          <svg viewBox="0 0 180 220" className="relative my-2 h-[200px] w-auto" fill="none">
            <circle cx="90" cy="100" r="70" stroke="#D4AF37" strokeWidth="0.4" strokeOpacity="0.08" />
            <circle cx="90" cy="100" r="55" stroke="#D4AF37" strokeWidth="0.3" strokeOpacity="0.06" />
            <path d="M80 15 Q90 8 100 15 Q100 22 90 24 Q80 22 80 15Z" fill="#D4AF37" fillOpacity="0.14" />
            <circle cx="90" cy="15" r="2.5" fill="#D4AF37" fillOpacity="0.22" />
            <path d="M25 25 L25 40" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.12" /><path d="M25 25 L40 25" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.12" />
            <path d="M155 25 L155 40" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.12" /><path d="M155 25 L140 25" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.12" />
            <path d="M25 200 L25 185" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.12" /><path d="M25 200 L40 200" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.12" />
            <path d="M155 200 L155 185" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.12" /><path d="M155 200 L140 200" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.12" />
            <circle cx="75" cy="85" r="11" fill="#D4AF37" fillOpacity="0.18" />
            <path d="M60 190 L65 105 Q65 92 75 92 Q85 92 85 105 L90 190" fill="#D4AF37" fillOpacity="0.12" />
            <path d="M68 80 Q75 72 82 80 Q82 87 75 88 Q68 87 68 80Z" fill="#D4AF37" fillOpacity="0.16" />
            <circle cx="105" cy="85" r="11" fill="#D4AF37" fillOpacity="0.16" />
            <path d="M85 190 L90 103 Q90 92 105 92 Q120 92 120 103 L130 190 Q105 182 85 190Z" fill="#D4AF37" fillOpacity="0.10" />
            <path d="M105 78 Q115 76 118 100 Q114 90 105 85" fill="#D4AF37" fillOpacity="0.06" />
            <circle cx="105" cy="82" r="1.5" fill="#D4AF37" fillOpacity="0.30" />
            <path d="M85 110 Q95 122 105 110" stroke="#D4AF37" strokeOpacity="0.22" strokeWidth="0.8" />
            <circle cx="90" cy="114" r="2" fill="#D4AF37" fillOpacity="0.18" />
            <circle cx="98" cy="118" r="2" fill="#D4AF37" fillOpacity="0.14" />
            <path d="M45 185 Q47 180 49 185" fill="#FFB347" fillOpacity="0.12" /><circle cx="47" cy="180" r="1" fill="#FFD700" fillOpacity="0.12" />
            <path d="M131 185 Q133 180 135 185" fill="#FFB347" fillOpacity="0.12" /><circle cx="133" cy="180" r="1" fill="#FFD700" fillOpacity="0.12" />
          </svg>
          <h3 className="relative text-[22px] leading-tight text-[#F0E8D8]" style={{ fontFamily: "var(--font-great-vibes)" }}>Vikram <span className="text-[#D4AF37]">&</span> Ananya</h3>
          <div className="relative my-2 flex items-center gap-2"><div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4AF37]/22" /><span className="text-[7px] text-[#D4AF37]/35">✦</span><div className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4AF37]/22" /></div>
          <p className="relative text-[10px] text-[#D4AF37]/50" style={{ fontFamily: "var(--font-cormorant)" }}>February 14, 2026</p>
          <p className="relative mt-1 text-[8px] uppercase tracking-[0.12em] text-[#D4AF37]/30" style={{ fontFamily: "var(--font-montserrat)" }}>Heritage Palace · Udaipur</p>
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
  if (t.style === "business") {
    const isDark = t.colors.bg.includes("1A1A1A") || t.colors.bg.includes("0F0F");
    return (
      <div className={`flex h-full w-full flex-col justify-between bg-gradient-to-b ${t.colors.bg} p-8`}>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: `${t.colors.accent}18`, border: `1px solid ${t.colors.accent}25` }}>
            <span className="text-[12px] font-bold" style={{ color: t.colors.accent, fontFamily: "var(--font-cinzel)" }}>A</span>
          </div>
          <span className="text-[9px] font-semibold uppercase tracking-[0.15em]" style={{ color: `${t.colors.accent}90`, fontFamily: "var(--font-cinzel)" }}>Aurelius & Co.</span>
        </div>
        <div>
          <h3 className="text-[18px] font-bold" style={{ color: `${t.colors.text}${isDark ? "E0" : ""}`, fontFamily: "var(--font-playfair)" }}>Aman Gupta</h3>
          <p className="mt-1 text-[8px] uppercase tracking-[0.15em]" style={{ color: `${t.colors.accent}70`, fontFamily: "var(--font-montserrat)" }}>Managing Director</p>
          <div className="mt-4 h-px w-full" style={{ background: `linear-gradient(to right, ${t.colors.accent}15, transparent)` }} />
          <p className="mt-2 text-[7px]" style={{ color: `${t.colors.text}50` }}>aman@aurelius.co · aurelius.co</p>
        </div>
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
      <div className={`flex h-full w-full flex-col bg-gradient-to-b ${t.colors.bg} p-6`}>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full" style={{ background: t.colors.accent }} />
          <span className="text-[8px] font-semibold uppercase tracking-[0.12em]" style={{ color: `${t.colors.accent}70`, fontFamily: "var(--font-montserrat)" }}>Analytics</span>
        </div>
        <p className="mt-3 text-[28px] font-bold leading-none" style={{ color: `${t.colors.text}E0`, fontFamily: "var(--font-raleway)" }}>2,847</p>
        <p className="mt-1 text-[9px]" style={{ color: `${t.colors.accent}80` }}>↑ 24% this week</p>
        <svg viewBox="0 0 120 30" className="mt-3 w-full" fill="none">
          <path d="M0 22 Q20 18 40 15 Q60 10 80 12 Q100 5 120 8 L120 30 L0 30Z" fill={t.colors.accent} fillOpacity="0.15" />
          <path d="M0 22 Q20 18 40 15 Q60 10 80 12 Q100 5 120 8" stroke={t.colors.accent} strokeWidth="1.5" strokeOpacity="0.4" />
        </svg>
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
              {template.id === "the-maharani" || template.id === "azure-vows" ? (
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
            {template.id === "the-maharani" || template.id === "azure-vows" ? (
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
