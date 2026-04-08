"use client";

import { useState, useCallback } from "react";
import { useTemplateMusic } from "@/hooks/use-template-music";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowLeft, QrCode, Wifi, Share2, BarChart3, Camera, Smartphone, Volume2, VolumeX, Aperture } from "lucide-react";
import { Button } from "@/components/ui/button";
import { platform } from "@/lib/platform";
import { TemplateWatermark } from "@/components/landing/template-watermark";

/* ================================================================== */
/*  CSS                                                               */
/* ================================================================== */

const CSS = `
@keyframes mb-float {
  0%, 100% { transform: translateY(0) rotate(var(--r, 2deg)); }
  50% { transform: translateY(-5px) rotate(var(--r, 2deg)); }
}
@keyframes mb-shutter {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(0.95); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
}
`;

/* ================================================================== */
/*  Data                                                              */
/* ================================================================== */

const PORTFOLIO = [
  { label: "Editorial", src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=600&fit=crop&q=80" },
  { label: "Portrait", src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&h=600&fit=crop&q=80" },
  { label: "Wedding", src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=600&fit=crop&q=80" },
  { label: "Lifestyle", src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=600&fit=crop&q=80" },
];

const FEATURES = [
  { icon: Camera, title: "Photography Brand", desc: "Designed for visual artists" },
  { icon: QrCode, title: "QR Portfolio Link", desc: "Instant access to your work" },
  { icon: Wifi, title: "NFC Tap", desc: "Share with a single touch" },
  { icon: BarChart3, title: "View Analytics", desc: "Track who views your card" },
  { icon: Share2, title: "Easy Sharing", desc: "Custom link for networking" },
  { icon: Smartphone, title: "Mobile First", desc: "Perfect on any screen" },
];

/* ================================================================== */
/*  Helpers                                                           */
/* ================================================================== */

function GLine() {
  return <div className="mx-auto h-px w-12 bg-gradient-to-r from-transparent via-[#2A2828]/8 to-transparent" />;
}

/* ================================================================== */
/*  Main                                                              */
/* ================================================================== */

export function MaisonBlancheExperience() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  const [hasEntered, setHasEntered] = useState(false);
  const [showFront, setShowFront] = useState(true);
  const [activePortfolio, setActivePortfolio] = useState(0);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [revealedFeatures, setRevealedFeatures] = useState<Set<number>>(new Set());
  const { isPlaying: isMusicPlaying, toggle: toggleMusic } = useTemplateMusic("elegant");

  // ── ENTRY — shutter click reveal (unique to photography) ──
  if (!hasEntered) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#E0DDD8] via-[#D8D4D0] to-[#D0CCC8]">
          {/* Studio light */}
          <div className="absolute top-[10%] right-[15%] h-28 w-28 rounded-full bg-white/20 blur-[35px]" />
          <div className="absolute bottom-[20%] left-[20%] h-20 w-20 rounded-full bg-[#8A8A90]/[0.04] blur-[20px]" />

          <motion.button
            onClick={() => setHasEntered(true)}
            className="group relative z-10 flex flex-col items-center gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Aperture/shutter icon */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#2A2828]/10 bg-white/40 transition-all group-hover:bg-white/60 group-active:animate-[mb-shutter_0.3s_ease]">
              <Aperture className="h-7 w-7 text-[#2A2828]/40" />
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#2A2828]/35" style={{ fontFamily: "var(--font-montserrat)" }}>Photography Identity</p>
              <h1 className="mt-2 text-4xl font-bold text-[#1A1818]/70" style={{ fontFamily: "var(--font-playfair)" }}>Maison Blanche</h1>
            </div>
            <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 2 }}>
              <p className="text-[8px] uppercase tracking-[0.3em] text-[#2A2828]/30" style={{ fontFamily: "var(--font-montserrat)" }}>Click to Capture</p>
            </motion.div>
          </motion.button>

          <Link href="/templates/maison-blanche" className="fixed top-5 left-5 z-[101] flex items-center gap-1.5 rounded-full border border-[#2A2828]/6 bg-[#E8E5E0]/60 px-4 py-2 text-xs font-medium text-[#2A2828]/45 backdrop-blur-md hover:bg-[#E8E5E0]">
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
      <div className="relative min-h-screen overflow-x-hidden bg-[#E8E5E0]">
        <TemplateWatermark color="#2A2828" />
        {/* Progress */}
        <motion.div className="fixed top-0 right-0 left-0 z-[102] h-[2px] origin-left bg-gradient-to-r from-[#2A2828]/40 to-[#2A2828]/20" style={{ scaleX: scrollYProgress }} />

        {/* ── HERO ── */}
        <motion.section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <div className="absolute inset-0 bg-gradient-to-b from-[#E0DDD8] via-[#D8D4D0] to-[#D0CCC8]" />
          <div className="absolute top-[8%] right-[12%] h-28 w-28 rounded-full bg-white/20 blur-[35px]" />

          {/* Large camera lens bg */}
          <svg viewBox="0 0 200 200" className="absolute top-1/2 left-1/2 h-[60%] w-auto -translate-x-1/2 -translate-y-1/2 opacity-[0.03]" fill="none" stroke="#2A2828" strokeWidth="1">
            <circle cx="100" cy="100" r="90" /><circle cx="100" cy="100" r="70" /><circle cx="100" cy="100" r="50" /><circle cx="100" cy="100" r="30" />
          </svg>

          {/* Card toggle — front/back with button */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ opacity: heroOpacity }}>
            <AnimatePresence mode="wait">
              {showFront ? (
                <motion.div key="front" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}
                  className="relative h-40 w-64 rounded-lg border border-[#2A2828]/10 bg-[#FAFAF8] shadow-[0_15px_45px_rgba(0,0,0,0.08)]" style={{ animation: "mb-float 6s ease-in-out infinite", ["--r" as string]: "1.5deg" }}>
                  <div className="absolute top-0 left-0 h-full w-[4px] rounded-l-lg bg-[#2A2828]/55" />
                  <div className="p-5 pl-6">
                    <p className="text-base font-bold text-[#1A1818]/75" style={{ fontFamily: "var(--font-playfair)" }}>Elena Rossi</p>
                    <p className="mt-0.5 text-[7px] uppercase tracking-[0.2em] text-[#2A2828]/30" style={{ fontFamily: "var(--font-montserrat)" }}>Photographer</p>
                    <div className="mt-4 h-px w-14 bg-[#2A2828]/6" />
                    <div className="mt-2 space-y-0.5">
                      <p className="text-[7px] text-[#2A2828]/22">elena@rossi.studio</p>
                      <p className="text-[7px] text-[#2A2828]/18">rossi.studio</p>
                    </div>
                  </div>
                  <Camera className="absolute right-4 bottom-3 h-4 w-4 text-[#2A2828]/8" />
                </motion.div>
              ) : (
                <motion.div key="back" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.3 }}
                  className="flex h-40 w-64 flex-col items-center justify-center rounded-lg border border-[#2A2828]/10 bg-[#2A2828] shadow-[0_15px_45px_rgba(0,0,0,0.12)]" style={{ animation: "mb-float 6s ease-in-out infinite", ["--r" as string]: "-1deg" }}>
                  <Camera className="h-6 w-6 text-[#E8E5E0]/25" />
                  <p className="mt-2 text-[8px] uppercase tracking-[0.2em] text-[#E8E5E0]/35" style={{ fontFamily: "var(--font-cinzel)" }}>Maison Blanche</p>
                  <div className="mt-3 flex items-center gap-3">
                    <QrCode className="h-4 w-4 text-[#E8E5E0]/12" />
                    <Wifi className="h-4 w-4 text-[#E8E5E0]/12" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {/* Toggle */}
            <div className="mt-4 flex justify-center gap-2">
              <button onClick={() => setShowFront(true)} className={`rounded-full px-3 py-1 text-[8px] uppercase tracking-[0.1em] transition-all ${showFront ? "bg-[#2A2828]/10 text-[#1A1818]/55" : "text-[#2A2828]/25 hover:text-[#2A2828]/40"}`} style={{ fontFamily: "var(--font-montserrat)" }}>Front</button>
              <button onClick={() => setShowFront(false)} className={`rounded-full px-3 py-1 text-[8px] uppercase tracking-[0.1em] transition-all ${!showFront ? "bg-[#2A2828]/10 text-[#1A1818]/55" : "text-[#2A2828]/25 hover:text-[#2A2828]/40"}`} style={{ fontFamily: "var(--font-montserrat)" }}>Back</button>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div className="relative z-10 mt-8 text-center" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ opacity: heroOpacity }}>
            <p className="text-[9px] uppercase tracking-[0.5em] text-[#2A2828]/30" style={{ fontFamily: "var(--font-montserrat)" }}>Photography Identity</p>
            <GLine />
            <h1 className="mt-3 text-4xl font-bold text-[#1A1818]/70 md:text-5xl" style={{ fontFamily: "var(--font-playfair)" }}>Maison Blanche</h1>
            <p className="mt-3 text-sm text-[#2A2828]/28" style={{ fontFamily: "var(--font-cormorant)" }}>Your art deserves an identity as refined as your lens.</p>
          </motion.div>
        </motion.section>

        {/* ── PORTFOLIO — showcase slider (unique — horizontal swipe feel) ── */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-lg">
            <div className="mb-10 text-center">
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#2A2828]/30" style={{ fontFamily: "var(--font-montserrat)" }}>Portfolio</p>
              <GLine />
              <h2 className="mt-3 text-2xl text-[#1A1818]/60" style={{ fontFamily: "var(--font-playfair)" }}>Your Work, Showcased</h2>
            </div>

            {!isPortfolioOpen ? (
              <motion.button onClick={() => setIsPortfolioOpen(true)} className="group mx-auto flex flex-col items-center gap-3"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#2A2828]/8 bg-white/40 transition-all group-hover:bg-white/60">
                  <Aperture className="h-5 w-5 text-[#2A2828]/35" />
                </div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#2A2828]/30" style={{ fontFamily: "var(--font-montserrat)" }}>View Portfolio</p>
              </motion.button>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                {/* Current photo */}
                <AnimatePresence mode="wait">
                  <motion.div key={activePortfolio} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.3 }}
                    className="relative cursor-pointer overflow-hidden rounded-xl shadow-md" onClick={() => setSelectedPhoto(activePortfolio)}>
                    <div className="relative aspect-[4/3]">
                      <Image src={PORTFOLIO[activePortfolio]!.src} alt={PORTFOLIO[activePortfolio]!.label} fill className="object-cover" sizes="500px" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1A1818]/40 to-transparent p-4 pt-10">
                      <p className="text-lg text-white/85" style={{ fontFamily: "var(--font-playfair)" }}>{PORTFOLIO[activePortfolio]!.label}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Thumbnail strip */}
                <div className="mt-4 flex justify-center gap-2">
                  {PORTFOLIO.map((p, i) => (
                    <button key={p.label} onClick={() => setActivePortfolio(i)}
                      className={`relative h-12 w-12 overflow-hidden rounded-md transition-all ${i === activePortfolio ? "ring-2 ring-[#2A2828]/20" : "opacity-50 hover:opacity-75"}`}>
                      <Image src={p.src} alt={p.label} fill className="object-cover" sizes="48px" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* ── ABOUT — photographer intro (tap to expand) ── */}
        <motion.section className="px-6 py-24" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="mx-auto max-w-md text-center">
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#2A2828]/30" style={{ fontFamily: "var(--font-montserrat)" }}>The Photographer</p>
            <GLine />
            <h2 className="mt-3 text-2xl text-[#1A1818]/60" style={{ fontFamily: "var(--font-playfair)" }}>Elena Rossi</h2>
            <p className="mt-1 text-xs uppercase tracking-[0.15em] text-[#2A2828]/25" style={{ fontFamily: "var(--font-montserrat)" }}>Editorial · Portrait · Wedding</p>
            <p className="mt-5 text-sm leading-[2] text-[#2A2828]/35" style={{ fontFamily: "var(--font-cormorant)" }}>
              With over a decade behind the lens, Elena captures moments that feel both timeless and alive.
              Based in Toronto, she works with couples, brands, and editorial publications worldwide.
            </p>
            <div className="mt-6 flex items-center justify-center gap-6">
              {[
                { val: "12+", label: "Years" },
                { val: "500+", label: "Sessions" },
                { val: "30+", label: "Awards" },
              ].map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }}>
                  <p className="text-xl font-bold text-[#2A2828]/40" style={{ fontFamily: "var(--font-playfair)" }}>{s.val}</p>
                  <p className="mt-0.5 text-[7px] uppercase tracking-[0.12em] text-[#2A2828]/20" style={{ fontFamily: "var(--font-montserrat)" }}>{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── HOW IT WORKS — step process ── */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-md">
            <div className="mb-10 text-center">
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#2A2828]/30" style={{ fontFamily: "var(--font-montserrat)" }}>How It Works</p>
              <GLine />
              <h2 className="mt-3 text-2xl text-[#1A1818]/60" style={{ fontFamily: "var(--font-playfair)" }}>Three Simple Steps</h2>
            </div>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute top-0 left-5 h-full w-px bg-gradient-to-b from-[#2A2828]/8 via-[#2A2828]/5 to-transparent" />
              {[
                { step: "01", title: "Choose Your Style", desc: "Pick from our curated card designs" },
                { step: "02", title: "Customize", desc: "Add your details, portfolio link & QR code" },
                { step: "03", title: "Share Everywhere", desc: "QR scan, NFC tap, or direct link" },
              ].map((s, i) => (
                <motion.div key={s.step} initial={{ opacity: 0, x: 15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                  className="relative mb-10 pl-14 last:mb-0">
                  <div className="absolute left-[10px] top-0 flex h-8 w-8 items-center justify-center rounded-full border border-[#2A2828]/8 bg-[#E8E5E0] text-[9px] font-bold text-[#2A2828]/35" style={{ fontFamily: "var(--font-montserrat)" }}>{s.step}</div>
                  <h3 className="text-sm font-semibold text-[#1A1818]/55" style={{ fontFamily: "var(--font-playfair)" }}>{s.title}</h3>
                  <p className="mt-1 text-xs text-[#2A2828]/28" style={{ fontFamily: "var(--font-cormorant)" }}>{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CARD SHOWCASE — front + back ── */}
        <motion.section className="px-6 py-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 text-center">
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#2A2828]/30" style={{ fontFamily: "var(--font-montserrat)" }}>Card Design</p>
              <GLine />
              <h2 className="mt-3 text-2xl text-[#1A1818]/60" style={{ fontFamily: "var(--font-playfair)" }}>Front & Back</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <motion.div initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="rounded-xl border border-[#2A2828]/5 bg-[#FAFAF8] p-6 shadow-sm">
                <div className="h-1 w-full rounded bg-[#2A2828]/40" />
                <div className="mt-5">
                  <p className="text-lg font-bold text-[#1A1818]/70" style={{ fontFamily: "var(--font-playfair)" }}>Elena Rossi</p>
                  <p className="mt-0.5 text-[8px] uppercase tracking-[0.18em] text-[#2A2828]/28">Photographer</p>
                  <div className="mt-4 h-px bg-[#2A2828]/5" />
                  <p className="mt-2 text-xs text-[#2A2828]/22">elena@rossi.studio</p>
                  <p className="mt-1 text-xs text-[#2A2828]/18">+1 (416) 555-0198</p>
                </div>
                <Camera className="mt-3 ml-auto h-4 w-4 text-[#2A2828]/8" />
                <p className="mt-2 text-center text-[8px] text-[#2A2828]/20">Front</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="flex flex-col items-center justify-center rounded-xl border border-[#2A2828]/5 bg-[#2A2828] p-6 shadow-sm">
                <Camera className="h-6 w-6 text-[#E8E5E0]/25" />
                <p className="mt-3 text-[8px] uppercase tracking-[0.2em] text-[#E8E5E0]/35" style={{ fontFamily: "var(--font-cinzel)" }}>Maison Blanche</p>
                <div className="mt-3 flex items-center gap-3">
                  <QrCode className="h-4 w-4 text-[#E8E5E0]/12" /><Wifi className="h-4 w-4 text-[#E8E5E0]/12" />
                </div>
                <p className="mt-4 text-[8px] text-[#E8E5E0]/20">Back</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* ── FEATURES ── */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#2A2828]/30" style={{ fontFamily: "var(--font-montserrat)" }}>Features</p>
              <GLine />
              <h2 className="mt-3 text-2xl text-[#1A1818]/60" style={{ fontFamily: "var(--font-playfair)" }}>Everything Included</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f, i) => {
                const revealed = revealedFeatures.has(i);
                return (
                  <motion.div key={f.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                    {!revealed ? (
                      <motion.button onClick={() => setRevealedFeatures(prev => { const n = new Set(prev); n.add(i); return n; })}
                        className="group w-full rounded-xl border border-[#2A2828]/4 bg-[#F0EEEA] p-5 text-center transition-all hover:border-[#2A2828]/8 hover:shadow-sm"
                        whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                        <f.icon className="mx-auto h-5 w-5 text-[#2A2828]/15 transition-colors group-hover:text-[#2A2828]/30" />
                        <p className="mt-2 text-xs text-[#1A1818]/35">{f.title}</p>
                        <p className="mt-1 text-[7px] text-[#2A2828]/15">tap to learn more</p>
                      </motion.button>
                    ) : (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                        className="rounded-xl border border-[#2A2828]/6 bg-[#F0EEEA] p-5">
                        <f.icon className="mb-3 h-5 w-5 text-[#2A2828]/28" />
                        <h3 className="text-sm font-semibold text-[#1A1818]/55" style={{ fontFamily: "var(--font-montserrat)" }}>{f.title}</h3>
                        <p className="mt-1 text-xs text-[#2A2828]/25" style={{ fontFamily: "var(--font-cormorant)" }}>{f.desc}</p>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CLIENT QUOTE — interactive slider ── */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-md text-center">
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#2A2828]/30" style={{ fontFamily: "var(--font-montserrat)" }}>Client Love</p>
            <GLine />

            <AnimatePresence mode="wait">
              <motion.div key={activePortfolio % 3} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
                className="mt-8 rounded-xl border border-[#2A2828]/4 bg-[#F0EEEA] p-6">
                <p className="text-sm italic leading-relaxed text-[#2A2828]/35" style={{ fontFamily: "var(--font-cormorant)" }}>
                  {[
                    `"Elena's card is as beautiful as her photography. Clients always ask where she got it."`,
                    `"The NFC tap feature alone has changed how I network at events."`,
                    `"Finally, a business card that matches the quality of my work."`,
                  ][activePortfolio % 3]}
                </p>
                <div className="mt-4 h-px bg-[#2A2828]/4" />
                <p className="mt-3 text-[9px] font-semibold text-[#1A1818]/35" style={{ fontFamily: "var(--font-montserrat)" }}>
                  {["Sarah M., Wedding Planner", "David K., Studio Owner", "Lisa C., Freelance Photographer"][activePortfolio % 3]}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 flex justify-center gap-2">
              {[0, 1, 2].map(i => (
                <button key={i} onClick={() => setActivePortfolio(i)}
                  className={`h-1.5 rounded-full transition-all ${activePortfolio % 3 === i ? "w-5 bg-[#2A2828]/25" : "w-1.5 bg-[#2A2828]/8"}`} />
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT YOU GET — visual checklist ── */}
        <motion.section className="px-6 py-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="mx-auto max-w-md">
            <div className="mb-10 text-center">
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#2A2828]/30" style={{ fontFamily: "var(--font-montserrat)" }}>What You Get</p>
              <GLine />
            </div>
            <div className="space-y-3">
              {[
                "Front & back card design",
                "Custom QR code to your portfolio",
                "NFC tap sharing setup",
                "Downloadable PDF for printing",
                "Public profile page",
                "Real-time analytics dashboard",
              ].map((item, i) => (
                <motion.div key={item} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 rounded-lg border border-[#2A2828]/3 bg-[#F0EEEA]/60 px-4 py-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2A2828]/6">
                    <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="#2A2828" strokeWidth="1.5" strokeOpacity="0.35" strokeLinecap="round"><path d="M2 6 L5 9 L10 3" /></svg>
                  </div>
                  <p className="text-xs text-[#2A2828]/40" style={{ fontFamily: "var(--font-cormorant)" }}>{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── WHO IT'S FOR ── */}
        <motion.section className="px-6 py-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 text-center">
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#2A2828]/30" style={{ fontFamily: "var(--font-montserrat)" }}>Perfect For</p>
              <GLine />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { title: "Wedding Photographers", desc: "Share your portfolio at every event" },
                { title: "Studio Owners", desc: "Branded cards for your entire team" },
                { title: "Freelancers", desc: "Stand out at networking events" },
              ].map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="rounded-xl border border-[#2A2828]/4 bg-[#F0EEEA] p-5 text-center">
                  <h3 className="text-sm font-semibold text-[#1A1818]/50" style={{ fontFamily: "var(--font-playfair)" }}>{item.title}</h3>
                  <p className="mt-1 text-xs text-[#2A2828]/22" style={{ fontFamily: "var(--font-cormorant)" }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── CTA ── */}
        <motion.section className="px-6 py-24" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="mx-auto max-w-md text-center">
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#2A2828]/30" style={{ fontFamily: "var(--font-montserrat)" }}>Ready?</p>
            <GLine />
            <h2 className="mt-3 text-2xl text-[#1A1818]/60" style={{ fontFamily: "var(--font-playfair)" }}>Create Your Card</h2>
            <p className="mt-4 text-sm text-[#2A2828]/25" style={{ fontFamily: "var(--font-cormorant)" }}>Let your card speak as eloquently as your photographs.</p>
            <div className="mt-8">
              <Button size="lg" className="gap-2 bg-[#2A2828] px-10 text-base text-[#F0EEEA] hover:bg-[#3A3838]">Get Started</Button>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <section className="border-t border-[#2A2828]/4 px-6 py-8">
          <div className="mx-auto max-w-md text-center">
            <p className="text-base font-bold text-[#1A1818]/45" style={{ fontFamily: "var(--font-playfair)" }}>Maison Blanche</p>
            <p className="mt-1 text-[9px] text-[#2A2828]/18">Photography Identity by {platform.name}</p>
          </div>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedPhoto !== null && (
            <motion.div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#1A1818]/70 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedPhoto(null)}>
              <motion.div className="relative mx-6 max-w-xl overflow-hidden rounded-xl shadow-2xl" initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }} onClick={e => e.stopPropagation()}>
                <div className="relative aspect-[4/3]"><Image src={PORTFOLIO[selectedPhoto]!.src} alt={PORTFOLIO[selectedPhoto]!.label} fill className="object-cover" sizes="600px" /></div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1A1818]/50 to-transparent p-4 pt-10">
                  <p className="text-lg font-bold text-white/90" style={{ fontFamily: "var(--font-playfair)" }}>{PORTFOLIO[selectedPhoto]!.label}</p>
                </div>
                <button onClick={() => setSelectedPhoto(null)} className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/30 text-white/70 backdrop-blur-sm hover:bg-white/50">✕</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nav */}
        <Link href="/templates/maison-blanche" className="fixed top-5 left-5 z-[101] flex items-center gap-1.5 rounded-full border border-[#2A2828]/6 bg-[#E8E5E0]/70 px-4 py-2 text-xs font-medium text-[#2A2828]/45 backdrop-blur-md hover:bg-[#E8E5E0]">
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </Link>
        <button onClick={toggleMusic} className="fixed top-5 right-5 z-[101] flex h-9 w-9 items-center justify-center rounded-full border border-[#2A2828]/6 bg-[#E8E5E0]/70 backdrop-blur-md hover:bg-[#E8E5E0]">
          {isMusicPlaying ? <Volume2 className="h-4 w-4 text-[#2A2828]/40" /> : <VolumeX className="h-4 w-4 text-[#2A2828]/25" />}
        </button>
      </div>
    </>
  );
}
