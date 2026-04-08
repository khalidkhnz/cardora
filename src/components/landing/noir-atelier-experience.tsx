"use client";

import { useState, useCallback } from "react";
import { useTemplateMusic } from "@/hooks/use-template-music";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowLeft, QrCode, Wifi, Share2, BarChart3, Palette, Smartphone, Volume2, VolumeX, ChevronRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { platform } from "@/lib/platform";
import { TemplateWatermark } from "@/components/landing/template-watermark";

/* ================================================================== */
/*  CSS                                                               */
/* ================================================================== */

const CSS = `
@keyframes noir-float {
  0%, 100% { transform: translateY(0) rotate(var(--r, 3deg)); }
  50% { transform: translateY(-6px) rotate(var(--r, 3deg)); }
}
@keyframes noir-shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
.noir-shimmer {
  background: linear-gradient(90deg, #C6A85A 0%, #E8D088 30%, #C6A85A 50%, #E8D088 70%, #C6A85A 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: noir-shimmer 10s linear infinite;
}
@keyframes noir-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(198,168,90,0.1); }
  50% { box-shadow: 0 0 0 8px rgba(198,168,90,0); }
}
`;

/* ================================================================== */
/*  Data                                                              */
/* ================================================================== */

const FEATURES = [
  { icon: QrCode, title: "QR Code", desc: "Scannable code embedded in your card" },
  { icon: Wifi, title: "NFC Tap", desc: "Share with a single touch" },
  { icon: Share2, title: "Link Sharing", desc: "Custom profile URL" },
  { icon: BarChart3, title: "Analytics", desc: "Track views and engagement" },
  { icon: Palette, title: "Custom Branding", desc: "Your colors, your identity" },
  { icon: Smartphone, title: "Mobile First", desc: "Perfect on every screen" },
];

/* ================================================================== */
/*  Helpers                                                           */
/* ================================================================== */

function GoldLine() {
  return <div className="mx-auto h-px w-14 bg-gradient-to-r from-transparent via-[#C6A85A]/15 to-transparent" />;
}

/* ================================================================== */
/*  Main                                                              */
/* ================================================================== */

export function NoirAtelierExperience() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  const [hasEntered, setHasEntered] = useState(false);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [revealedFeatures, setRevealedFeatures] = useState<Set<number>>(new Set());
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { isPlaying: isMusicPlaying, toggle: toggleMusic } = useTemplateMusic("dark");

  const revealFeature = useCallback((idx: number) => {
    setRevealedFeatures(prev => { const n = new Set(prev); n.add(idx); return n; });
  }, []);

  // ── ENTRY — dark reveal (unique — swipe/unlock feel) ──
  if (!hasEntered) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0E1014]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#14161C] to-[#0A0C10]" />
          {/* Subtle diagonal lines */}
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "repeating-linear-gradient(135deg,transparent,transparent 4px,rgba(255,255,255,0.3) 4px,rgba(255,255,255,0.3) 5px)" }} />
          {/* Gold glow */}
          <div className="absolute top-[35%] left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[#C6A85A]/[0.03] blur-[60px]" />

          <motion.button
            onClick={() => setHasEntered(true)}
            className="group relative z-10 flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Pulsing gold ring */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#C6A85A]/20 bg-[#C6A85A]/[0.05] transition-all group-hover:border-[#C6A85A]/30" style={{ animation: "noir-pulse 2.5s ease-in-out infinite" }}>
              <Eye className="h-6 w-6 text-[#C6A85A]/50" />
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#C6A85A]/40" style={{ fontFamily: "var(--font-montserrat)" }}>Luxury Identity</p>
              <h1 className="noir-shimmer mt-2 inline-block text-4xl" style={{ fontFamily: "var(--font-playfair)" }}>Noir Atelier</h1>
            </div>
            <motion.div animate={{ x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="flex items-center gap-2 text-[#C6A85A]/30">
              <span className="text-[8px] uppercase tracking-[0.3em]" style={{ fontFamily: "var(--font-montserrat)" }}>View</span>
              <ChevronRight className="h-3 w-3" />
            </motion.div>
          </motion.button>

          <Link href="/templates/noir-atelier" className="fixed top-5 left-5 z-[101] flex items-center gap-1.5 rounded-full border border-[#C6A85A]/8 bg-[#1A1C24]/60 px-4 py-2 text-xs font-medium text-[#E8E4DC]/40 backdrop-blur-md hover:text-[#E8E4DC]/70">
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </Link>
        </div>
      </>
    );
  }

  // ── MAIN ──
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="relative min-h-screen overflow-x-hidden bg-[#14161C]">
        <TemplateWatermark color="#C6A85A" />
        {/* Progress */}
        <motion.div className="fixed top-0 right-0 left-0 z-[102] h-[2px] origin-left bg-gradient-to-r from-[#C6A85A] to-[#E8D088]" style={{ scaleX: scrollYProgress }} />

        {/* ── HERO — floating card + car ── */}
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E2028] via-[#1A1C24] to-[#14161C]" />
          <div className="absolute top-[20%] left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[#C6A85A]/[0.03] blur-[80px]" />
          <div className="absolute inset-0 opacity-[0.012]" style={{ backgroundImage: "repeating-linear-gradient(135deg,transparent,transparent 4px,rgba(255,255,255,0.3) 4px,rgba(255,255,255,0.3) 5px)" }} />

          {/* Interactive card — tap to flip */}
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ opacity: heroOpacity }} className="relative">
            <button onClick={() => setIsCardFlipped(!isCardFlipped)} className="group relative cursor-pointer">
              <AnimatePresence mode="wait">
                {!isCardFlipped ? (
                  /* Front */
                  <motion.div key="front" initial={{ rotateY: 90 }} animate={{ rotateY: 0 }} exit={{ rotateY: -90 }} transition={{ duration: 0.4 }}
                    className="relative h-44 w-72 rounded-xl border border-[#C6A85A]/15 bg-[#22252E] shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
                    style={{ animation: "noir-float 6s ease-in-out infinite", ["--r" as string]: "2deg" }}>
                    <div className="h-[3px] rounded-t-xl bg-gradient-to-r from-transparent via-[#C6A85A]/35 to-transparent" />
                    <div className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#C6A85A]/15 bg-[#C6A85A]/[0.06]">
                          <span className="text-xs font-bold text-[#C6A85A]/55" style={{ fontFamily: "serif" }}>R</span>
                        </div>
                        <div>
                          <p className="text-[7px] uppercase tracking-[0.2em] text-[#C6A85A]/45" style={{ fontFamily: "var(--font-cinzel)" }}>Regent Motors</p>
                          <div className="mt-0.5 h-px w-10 bg-gradient-to-r from-[#C6A85A]/18 to-transparent" />
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-base font-bold text-[#E8E4DC]/75" style={{ fontFamily: "var(--font-playfair)" }}>Aman Gupta</p>
                        <p className="mt-0.5 text-[7px] uppercase tracking-[0.18em] text-[#C6A85A]/40" style={{ fontFamily: "var(--font-montserrat)" }}>Chief Executive</p>
                      </div>
                      <div className="mt-3 h-px bg-gradient-to-r from-[#C6A85A]/10 to-transparent" />
                      <p className="mt-2 text-[6px] text-[#E8E4DC]/22">regentmotors.co</p>
                    </div>
                    <p className="absolute right-3 bottom-2 text-[6px] text-[#C6A85A]/20">tap to flip →</p>
                  </motion.div>
                ) : (
                  /* Back */
                  <motion.div key="back" initial={{ rotateY: -90 }} animate={{ rotateY: 0 }} exit={{ rotateY: 90 }} transition={{ duration: 0.4 }}
                    className="relative flex h-44 w-72 flex-col items-center justify-center rounded-xl border border-[#C6A85A]/15 bg-[#1A1C22] shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
                    style={{ animation: "noir-float 6s ease-in-out infinite", ["--r" as string]: "-1deg" }}>
                    {/* Car silhouette on back */}
                    <svg viewBox="0 0 200 55" className="w-[160px]" fill="none">
                      <path d="M20 42 L20 30 Q20 22 38 20 L60 18 Q72 12 85 10 L155 10 Q170 12 178 18 L192 22 Q200 25 200 32 L200 42" fill="#C6A85A" fillOpacity="0.04" stroke="#C6A85A" strokeWidth="0.5" strokeOpacity="0.12" />
                      <circle cx="52" cy="44" r="7" fill="#1A1C22" stroke="#C6A85A" strokeWidth="0.4" strokeOpacity="0.15" />
                      <circle cx="170" cy="44" r="7" fill="#1A1C22" stroke="#C6A85A" strokeWidth="0.4" strokeOpacity="0.15" />
                      <line x1="35" y1="32" x2="195" y2="32" stroke="#C6A85A" strokeWidth="0.2" strokeOpacity="0.06" />
                    </svg>
                    <p className="mt-3 text-[8px] uppercase tracking-[0.25em] text-[#C6A85A]/35" style={{ fontFamily: "var(--font-cinzel)" }}>Regent Motors</p>
                    <div className="mt-2 flex items-center gap-3">
                      <QrCode className="h-4 w-4 text-[#C6A85A]/20" />
                      <div className="h-3 w-px bg-[#C6A85A]/10" />
                      <Wifi className="h-4 w-4 text-[#C6A85A]/20" />
                    </div>
                    <p className="absolute right-3 bottom-2 text-[6px] text-[#C6A85A]/20">← tap to flip</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>

          {/* Car silhouette below card */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }} style={{ opacity: heroOpacity }} className="relative z-10 mt-5">
            <svg viewBox="0 0 240 60" className="w-[200px] md:w-[260px]" fill="none">
              <path d="M25 48 L25 35 Q25 25 45 22 L75 20 Q90 12 105 9 L180 9 Q198 12 208 20 L228 26 Q238 30 238 38 L238 48" fill="#C6A85A" fillOpacity="0.03" stroke="#C6A85A" strokeWidth="0.5" strokeOpacity="0.10" />
              <circle cx="62" cy="50" r="9" fill="#14161C" stroke="#C6A85A" strokeWidth="0.4" strokeOpacity="0.12" />
              <circle cx="62" cy="50" r="4.5" fill="#C6A85A" fillOpacity="0.03" />
              <circle cx="198" cy="50" r="9" fill="#14161C" stroke="#C6A85A" strokeWidth="0.4" strokeOpacity="0.12" />
              <circle cx="198" cy="50" r="4.5" fill="#C6A85A" fillOpacity="0.03" />
              <circle cx="35" cy="30" r="1.5" fill="#C6A85A" fillOpacity="0.12" />
              <line x1="40" y1="35" x2="232" y2="35" stroke="#C6A85A" strokeWidth="0.2" strokeOpacity="0.05" />
            </svg>
          </motion.div>

          {/* Text */}
          <motion.div className="relative z-10 mt-8 text-center" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ opacity: heroOpacity }}>
            <p className="text-[9px] uppercase tracking-[0.5em] text-[#C6A85A]/35" style={{ fontFamily: "var(--font-montserrat)" }}>Luxury Automotive Identity</p>
            <GoldLine />
            <h1 className="noir-shimmer mt-3 inline-block text-4xl md:text-5xl" style={{ fontFamily: "var(--font-playfair)" }}>Noir Atelier</h1>
            <p className="mt-3 text-sm text-[#E8E4DC]/25" style={{ fontFamily: "var(--font-cormorant)" }}>Where elegance meets the open road.</p>
          </motion.div>
        </section>

        {/* ── CARD SHOWCASE — front + back side by side ── */}
        <motion.section className="px-6 py-24" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#C6A85A]/30" style={{ fontFamily: "var(--font-montserrat)" }}>Card Design</p>
              <GoldLine />
              <h2 className="mt-3 text-2xl text-[#E8E4DC]/60" style={{ fontFamily: "var(--font-playfair)" }}>Front & Back</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Front */}
              <motion.div initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="rounded-xl border border-[#C6A85A]/8 bg-[#1E2028] p-6">
                <div className="h-1 w-full rounded bg-gradient-to-r from-transparent via-[#C6A85A]/25 to-transparent" />
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#C6A85A]/12 bg-[#C6A85A]/[0.05]">
                    <span className="text-sm font-bold text-[#C6A85A]/50" style={{ fontFamily: "serif" }}>R</span>
                  </div>
                  <p className="text-[8px] uppercase tracking-[0.2em] text-[#C6A85A]/40" style={{ fontFamily: "var(--font-cinzel)" }}>Regent Motors</p>
                </div>
                <div className="mt-6">
                  <p className="text-lg font-bold text-[#E8E4DC]/70" style={{ fontFamily: "var(--font-playfair)" }}>Aman Gupta</p>
                  <p className="mt-0.5 text-[8px] uppercase tracking-[0.18em] text-[#C6A85A]/35">Chief Executive</p>
                  <div className="mt-4 h-px bg-[#C6A85A]/8" />
                  <div className="mt-3 space-y-1">
                    <p className="text-xs text-[#E8E4DC]/22">aman@regentmotors.co</p>
                    <p className="text-xs text-[#E8E4DC]/18">+1 (647) 555-0123</p>
                  </div>
                </div>
                <p className="mt-4 text-center text-[8px] text-[#C6A85A]/20">Front</p>
              </motion.div>
              {/* Back */}
              <motion.div initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="flex flex-col items-center justify-center rounded-xl border border-[#C6A85A]/8 bg-[#1A1C22] p-6">
                <svg viewBox="0 0 160 45" className="w-[130px]" fill="none">
                  <path d="M15 35 L15 25 Q15 18 30 16 L48 14 Q58 9 68 7 L125 7 Q138 9 145 14 L155 18 Q162 20 162 26 L162 35" fill="#C6A85A" fillOpacity="0.03" stroke="#C6A85A" strokeWidth="0.4" strokeOpacity="0.10" />
                  <circle cx="40" cy="37" r="6" fill="#1A1C22" stroke="#C6A85A" strokeWidth="0.3" strokeOpacity="0.12" />
                  <circle cx="138" cy="37" r="6" fill="#1A1C22" stroke="#C6A85A" strokeWidth="0.3" strokeOpacity="0.12" />
                </svg>
                <p className="mt-4 text-[8px] uppercase tracking-[0.2em] text-[#C6A85A]/30" style={{ fontFamily: "var(--font-cinzel)" }}>Regent Motors</p>
                <div className="mt-3 flex items-center gap-3">
                  <QrCode className="h-4 w-4 text-[#C6A85A]/15" />
                  <div className="h-3 w-px bg-[#C6A85A]/8" />
                  <Wifi className="h-4 w-4 text-[#C6A85A]/15" />
                </div>
                <p className="mt-4 text-[8px] text-[#C6A85A]/20">Back</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* ── FEATURES — tap to reveal each (unique — sealed cards) ── */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#C6A85A]/30" style={{ fontFamily: "var(--font-montserrat)" }}>Features</p>
              <GoldLine />
              <h2 className="mt-3 text-2xl text-[#E8E4DC]/60" style={{ fontFamily: "var(--font-playfair)" }}>Built for Impact</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((feat, i) => {
                const revealed = revealedFeatures.has(i);
                return (
                  <motion.div key={feat.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                    {!revealed ? (
                      <motion.button onClick={() => revealFeature(i)} className="group w-full rounded-xl border border-[#C6A85A]/6 bg-[#1A1C22] p-5 text-center transition-all hover:border-[#C6A85A]/12 hover:shadow-sm"
                        whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                        <feat.icon className="mx-auto h-5 w-5 text-[#C6A85A]/20 transition-colors group-hover:text-[#C6A85A]/35" />
                        <p className="mt-2 text-xs text-[#E8E4DC]/25">{feat.title}</p>
                        <p className="mt-1 text-[7px] text-[#C6A85A]/18">tap to reveal</p>
                      </motion.button>
                    ) : (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                        className="rounded-xl border border-[#C6A85A]/10 bg-[#1A1C22] p-5">
                        <feat.icon className="mb-3 h-5 w-5 text-[#C6A85A]/40" />
                        <h3 className="text-sm font-semibold text-[#E8E4DC]/55" style={{ fontFamily: "var(--font-montserrat)" }}>{feat.title}</h3>
                        <p className="mt-1 text-xs text-[#E8E4DC]/22" style={{ fontFamily: "var(--font-cormorant)" }}>{feat.desc}</p>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS — slider (unique to this template) ── */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-md">
            <div className="mb-10 text-center">
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#C6A85A]/30" style={{ fontFamily: "var(--font-montserrat)" }}>What They Say</p>
              <GoldLine />
            </div>

            {/* Dots */}
            <div className="mb-5 flex justify-center gap-2">
              {[0, 1, 2].map(i => (
                <button key={i} onClick={() => setActiveTestimonial(i)}
                  className={`h-1.5 rounded-full transition-all ${i === activeTestimonial ? "w-5 bg-[#C6A85A]/40" : "w-1.5 bg-[#C6A85A]/12"}`} />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={activeTestimonial} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
                className="rounded-xl border border-[#C6A85A]/6 bg-[#1A1C22] p-6 text-center">
                <p className="text-sm italic leading-relaxed text-[#E8E4DC]/35" style={{ fontFamily: "var(--font-cormorant)" }}>
                  {[
                    `"The card speaks before I do. Clients notice the quality immediately."`,
                    `"NFC tap sharing changed how I network. It feels like the future."`,
                    `"Our entire team uses Noir Atelier. It matches our brand perfectly."`,
                  ][activeTestimonial]}
                </p>
                <div className="mt-4 h-px bg-[#C6A85A]/6" />
                <p className="mt-3 text-[9px] font-semibold text-[#E8E4DC]/35" style={{ fontFamily: "var(--font-montserrat)" }}>
                  {["Aman G., CEO", "Priya S., Founder", "Vikram R., Agency Director"][activeTestimonial]}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ── USE CASES ── */}
        <motion.section className="px-6 py-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 text-center">
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#C6A85A]/30" style={{ fontFamily: "var(--font-montserrat)" }}>Perfect For</p>
              <GoldLine />
              <h2 className="mt-3 text-2xl text-[#E8E4DC]/60" style={{ fontFamily: "var(--font-playfair)" }}>Who It&apos;s For</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { title: "Entrepreneurs", desc: "First impressions that close deals" },
                { title: "Executives", desc: "Authority in every interaction" },
                { title: "Agencies", desc: "Team cards that match your brand" },
              ].map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="rounded-xl border border-[#C6A85A]/6 bg-[#1A1C22] p-5 text-center">
                  <h3 className="text-sm font-semibold text-[#E8E4DC]/50" style={{ fontFamily: "var(--font-playfair)" }}>{item.title}</h3>
                  <p className="mt-1 text-xs text-[#E8E4DC]/20" style={{ fontFamily: "var(--font-cormorant)" }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── STATS ── */}
        <motion.section className="px-6 py-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="mx-auto max-w-md">
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { value: "50+", label: "Templates" },
                { value: "10K+", label: "Cards Created" },
                { value: "99%", label: "Satisfaction" },
              ].map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
                  <p className="text-2xl font-bold text-[#C6A85A]/50" style={{ fontFamily: "var(--font-playfair)" }}>{s.value}</p>
                  <p className="mt-1 text-[8px] uppercase tracking-[0.15em] text-[#E8E4DC]/20" style={{ fontFamily: "var(--font-montserrat)" }}>{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── CTA ── */}
        <motion.section className="px-6 py-24" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="mx-auto max-w-md text-center">
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#C6A85A]/30" style={{ fontFamily: "var(--font-montserrat)" }}>Ready?</p>
            <GoldLine />
            <h2 className="mt-3 text-2xl text-[#E8E4DC]/60" style={{ fontFamily: "var(--font-playfair)" }}>Create Your Card</h2>
            <p className="mt-4 text-sm text-[#E8E4DC]/22" style={{ fontFamily: "var(--font-cormorant)" }}>Join professionals who make every introduction count.</p>
            <div className="mt-8">
              <Button size="lg" className="gap-2 bg-[#C6A85A] px-10 text-base text-[#14161C] hover:bg-[#B89848]">Get Started</Button>
            </div>
          </div>
        </motion.section>

        {/* ── FOOTER ── */}
        <section className="border-t border-[#C6A85A]/5 px-6 py-8">
          <div className="mx-auto max-w-md text-center">
            <p className="noir-shimmer inline-block text-lg" style={{ fontFamily: "var(--font-playfair)" }}>Noir Atelier</p>
            <p className="mt-1 text-[9px] text-[#C6A85A]/20" style={{ fontFamily: "var(--font-montserrat)" }}>Premium Identity by {platform.name}</p>
          </div>
        </section>

        {/* Nav */}
        <Link href="/templates/noir-atelier" className="fixed top-5 left-5 z-[101] flex items-center gap-1.5 rounded-full border border-[#C6A85A]/8 bg-[#1A1C24]/60 px-4 py-2 text-xs font-medium text-[#E8E4DC]/40 backdrop-blur-md hover:text-[#E8E4DC]/70">
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </Link>
        <button onClick={toggleMusic} className="fixed top-5 right-5 z-[101] flex h-9 w-9 items-center justify-center rounded-full border border-[#C6A85A]/8 bg-[#1A1C24]/60 backdrop-blur-md hover:bg-[#1A1C24]">
          {isMusicPlaying ? <Volume2 className="h-4 w-4 text-[#C6A85A]/45" /> : <VolumeX className="h-4 w-4 text-[#E8E4DC]/25" />}
        </button>
      </div>
    </>
  );
}
