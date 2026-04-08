"use client";

import { useState, useCallback } from "react";
import { useTemplateMusic } from "@/hooks/use-template-music";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowLeft, MapPin, Heart, Volume2, VolumeX, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { platform } from "@/lib/platform";

/* ================================================================== */
/*  CSS                                                               */
/* ================================================================== */

const CSS = `
@keyframes az-wave {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(-15px); }
}
@keyframes az-drift {
  0%, 100% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(-5px) translateX(3px); }
}
@keyframes az-shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
.az-shimmer {
  background: linear-gradient(90deg, #3A7A98 0%, #6AACCC 30%, #3A7A98 50%, #6AACCC 70%, #3A7A98 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: az-shimmer 10s linear infinite;
}
`;

/* ================================================================== */
/*  Data                                                              */
/* ================================================================== */

const GALLERY = [
  { label: "Golden Hour", src: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=500&h=500&fit=crop&q=80" },
  { label: "By The Shore", src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=500&h=500&fit=crop&q=80" },
  { label: "Ocean Breeze", src: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=500&h=500&fit=crop&q=80" },
  { label: "Sunset Glow", src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=500&fit=crop&q=80" },
];

/* ================================================================== */
/*  Helpers                                                           */
/* ================================================================== */

function Divider() {
  return <div className="mx-auto h-px w-14 bg-gradient-to-r from-transparent via-[#4A90B8]/15 to-transparent" />;
}

/* ================================================================== */
/*  Main                                                              */
/* ================================================================== */

export function AzureVowsExperience() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  // States — unique interaction patterns (NOT same as Maharani)
  const [hasEntered, setHasEntered] = useState(false);
  const [currentStoryStep, setCurrentStoryStep] = useState(0);
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const { isPlaying: isMusicPlaying, toggle: toggleMusic } = useTemplateMusic("ocean");

  const storySteps = [
    { title: "A Beach Encounter", text: "Bare feet in the sand, a sunset, and a conversation that changed everything.", year: "2022" },
    { title: "The Road Trip", text: "We drove down the coast with no plan — just the ocean and each other.", year: "2023" },
    { title: "He Asked", text: "Under the stars, by the same beach where we first met, he asked forever.", year: "2024" },
    { title: "October 8, 2026", text: "We return to the shore where it all began — to say I do.", year: "2026" },
  ];

  const events = [
    { name: "Ceremony", time: "4:00 PM", venue: "Beach Altar", desc: "Sacred vows by the ocean" },
    { name: "Ring Exchange", time: "4:30 PM", venue: "Beach Altar", desc: "Two rings, one forever" },
    { name: "Reception", time: "6:00 PM", venue: "Oceanview Pavilion", desc: "Dinner under the stars" },
    { name: "Cake & Toast", time: "7:30 PM", venue: "Pavilion", desc: "A sweet beginning together" },
  ];

  // ── ENTRY — wave/tide reveal (NOT envelope like Maharani) ──
  if (!hasEntered) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#A8CCE8] via-[#C0D8F0] to-[#D8E8F5]">
          {/* Animated waves — multiple layers */}
          {[0, 2, 4].map((d, i) => (
            <svg key={i} viewBox="0 0 500 25" preserveAspectRatio="none" className="absolute left-0 w-full" style={{ bottom: `${8 + i * 5}%`, animation: `az-wave ${5 + i}s ease-in-out ${d}s infinite`, opacity: 0.08 + i * 0.04 }}>
              <path d="M0 12 Q50 4 100 12 Q150 20 200 12 Q250 4 300 12 Q350 20 400 12 Q450 4 500 12" stroke="#4A7A98" strokeWidth="1" fill="none" />
            </svg>
          ))}
          {/* Sun */}
          <div className="absolute top-[10%] right-[15%] h-32 w-32 rounded-full bg-[#FFF0C8]/40 blur-[50px]" />
          {/* Sand */}
          <div className="absolute bottom-0 left-0 right-0 h-[8%] bg-gradient-to-t from-[#F0E4D0]/40 to-transparent" />

          <motion.button
            onClick={() => setHasEntered(true)}
            className="group relative z-10 flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Horizon line concept */}
            <div className="flex items-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#4A7A98]/30" />
              <p className="text-[10px] uppercase tracking-[0.6em] text-[#2A4A5A]/50" style={{ fontFamily: "var(--font-montserrat)" }}>The Wedding</p>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#4A7A98]/30" />
            </div>
            <h1 className="text-5xl text-[#1A3A4A]/70 md:text-6xl" style={{ fontFamily: "var(--font-great-vibes)" }}>James & Rose</h1>
            <div className="flex items-center gap-4">
              <div className="h-px w-10 bg-[#4A90B8]/15" />
              <p className="text-xs text-[#2A4A5A]/40" style={{ fontFamily: "var(--font-cormorant)" }}>October 8, 2026</p>
              <div className="h-px w-10 bg-[#4A90B8]/15" />
            </div>
            {/* Swipe/tap prompt — different from Maharani's chevron */}
            <motion.div animate={{ x: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="mt-4 flex items-center gap-2 text-[#4A90B8]/35">
              <span className="text-[8px] uppercase tracking-[0.3em]" style={{ fontFamily: "var(--font-montserrat)" }}>Enter</span>
              <ChevronRight className="h-3 w-3" />
            </motion.div>
          </motion.button>

          <Link href="/templates/azure-vows" className="fixed top-5 left-5 z-[101] flex items-center gap-1.5 rounded-full bg-white/50 px-4 py-2 text-xs font-medium text-[#2A4A5A]/50 shadow-sm backdrop-blur-md hover:bg-white/75">
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
      <div className="relative min-h-screen overflow-x-hidden bg-[#F0F6FA]">
        {/* Watermark */}
        <div className="pointer-events-none fixed inset-0 z-[95]">
          <span className="absolute top-[30%] right-[5%] -rotate-[25deg] text-xl font-semibold tracking-[0.5em] text-[#4A90B8]/[0.025] select-none" style={{ fontFamily: "var(--font-cinzel)" }}>{platform.name}</span>
        </div>
        {/* Progress */}
        <motion.div className="fixed top-0 right-0 left-0 z-[102] h-[2px] origin-left bg-gradient-to-r from-[#4A90B8] to-[#6AACCC]" style={{ scaleX: scrollYProgress }} />

        {/* ── HERO ── */}
        <motion.section className="relative flex h-screen flex-col items-center justify-end overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>
          <div className="absolute inset-0 bg-gradient-to-b from-[#B8D8F0] via-[#D0E8F8] to-[#E0EEF5]" />
          <div className="absolute top-[12%] right-[15%] h-36 w-36 rounded-full bg-[#FFF0D0]/40 blur-[55px]" />
          <div className="absolute bottom-[22%] left-0 right-0 h-[10%] bg-gradient-to-b from-[#6AACCC]/18 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[22%] bg-gradient-to-t from-[#F0E4D0] to-transparent" />
          {/* Waves */}
          <svg viewBox="0 0 500 20" preserveAspectRatio="none" className="absolute bottom-[20%] left-0 w-full" style={{ animation: "az-wave 6s ease-in-out infinite" }}>
            <path d="M0 10 Q50 4 100 10 Q150 16 200 10 Q250 4 300 10 Q350 16 400 10 Q450 4 500 10" stroke="#5A9CC0" strokeWidth="0.8" strokeOpacity="0.10" fill="none" />
          </svg>

          {/* Couple silhouette */}
          <div className="absolute bottom-[18%] right-[22%] md:right-[28%]" style={{ animation: "az-drift 8s ease-in-out infinite" }}>
            <svg viewBox="0 0 90 130" className="h-[120px] md:h-[150px]" fill="none">
              <circle cx="32" cy="28" r="10" fill="#2A3A48" fillOpacity="0.45" />
              <path d="M20 115 L24 48 Q24 36 32 36 Q40 36 40 48 L44 115" fill="#2A3A48" fillOpacity="0.35" />
              <circle cx="58" cy="28" r="10" fill="#7A6050" fillOpacity="0.30" />
              <path d="M44 115 L48 46 Q48 36 58 36 Q68 36 68 46 L78 115 Q58 106 44 115Z" fill="#FFFFFF" fillOpacity="0.50" />
              <path d="M58 20 Q72 16 74 38 Q68 28 58 28" fill="#FFFFFF" fillOpacity="0.15" />
              <circle cx="48" cy="68" r="3" fill="#FFD0D0" fillOpacity="0.28" />
            </svg>
          </div>

          {/* Text — left aligned */}
          <motion.div className="relative z-10 mb-[8%] mr-auto ml-[6%] md:ml-[12%]" style={{ opacity: heroOpacity }}>
            <p className="text-[9px] uppercase tracking-[0.5em] text-[#4A7A98]/50" style={{ fontFamily: "var(--font-montserrat)" }}>A Seaside Celebration</p>
            <h1 className="az-shimmer mt-2 inline-block text-5xl leading-tight md:text-7xl" style={{ fontFamily: "var(--font-great-vibes)" }}>James & Rose</h1>
            <div className="mt-2 flex items-center gap-3">
              <div className="h-px w-12 bg-[#4A90B8]/20" />
              <p className="text-xs text-[#2A4A5A]/50" style={{ fontFamily: "var(--font-cormorant)" }}>October 8, 2026</p>
            </div>
          </motion.div>
        </motion.section>

        {/* ── BLESSING ── */}
        <motion.section className="px-6 py-28" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
          <div className="mx-auto max-w-xl text-center">
            <p className="text-xl italic leading-[2.2] text-[#2A4A5A]/45 md:text-2xl" style={{ fontFamily: "var(--font-cormorant)" }}>
              &ldquo;And now these three remain: faith, hope and love. But the greatest of these is love.&rdquo;
            </p>
            <p className="mt-5 text-[10px] uppercase tracking-[0.25em] text-[#4A90B8]/35" style={{ fontFamily: "var(--font-montserrat)" }}>1 Corinthians 13:13</p>
          </div>
        </motion.section>

        {/* ── LOVE STORY — step-by-step navigation (NOT tap-to-reveal like Maharani) ── */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-md">
            <div className="mb-8 text-center">
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#4A90B8]/40" style={{ fontFamily: "var(--font-montserrat)" }}>Our Journey</p>
              <Divider />
            </div>

            {/* Step indicator */}
            <div className="mb-6 flex items-center justify-center gap-2">
              {storySteps.map((_, i) => (
                <button key={i} onClick={() => setCurrentStoryStep(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === currentStoryStep ? "w-6 bg-[#4A90B8]/50" : "w-1.5 bg-[#4A90B8]/15 hover:bg-[#4A90B8]/25"}`} />
              ))}
            </div>

            {/* Story card — swipeable feel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStoryStep}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-[#4A90B8]/8 bg-white/40 p-8 text-center backdrop-blur-sm"
              >
                <p className="text-[10px] font-bold text-[#4A90B8]/45" style={{ fontFamily: "var(--font-montserrat)" }}>{storySteps[currentStoryStep]!.year}</p>
                <h3 className="mt-2 text-2xl text-[#1A3A4A]/65" style={{ fontFamily: "var(--font-great-vibes)" }}>{storySteps[currentStoryStep]!.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#2A4A5A]/45" style={{ fontFamily: "var(--font-cormorant)" }}>{storySteps[currentStoryStep]!.text}</p>
              </motion.div>
            </AnimatePresence>

            {/* Nav buttons */}
            <div className="mt-4 flex justify-between">
              <button onClick={() => setCurrentStoryStep(Math.max(0, currentStoryStep - 1))}
                className={`text-[10px] uppercase tracking-[0.15em] text-[#4A90B8]/40 transition-opacity ${currentStoryStep === 0 ? "opacity-0" : "hover:text-[#4A90B8]/60"}`}
                style={{ fontFamily: "var(--font-montserrat)" }}>← Previous</button>
              <button onClick={() => setCurrentStoryStep(Math.min(storySteps.length - 1, currentStoryStep + 1))}
                className={`text-[10px] uppercase tracking-[0.15em] text-[#4A90B8]/40 transition-opacity ${currentStoryStep === storySteps.length - 1 ? "opacity-0" : "hover:text-[#4A90B8]/60"}`}
                style={{ fontFamily: "var(--font-montserrat)" }}>Next →</button>
            </div>
          </div>
        </section>

        {/* ── EVENTS — horizontal tab selector (NOT accordion like Maharani) ── */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-lg">
            <div className="mb-8 text-center">
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#4A90B8]/40" style={{ fontFamily: "var(--font-montserrat)" }}>The Day</p>
              <Divider />
              <h2 className="az-shimmer mt-2 inline-block text-3xl" style={{ fontFamily: "var(--font-great-vibes)" }}>Schedule</h2>
            </div>

            {/* Tab buttons */}
            <div className="mb-6 flex gap-1 overflow-x-auto rounded-full border border-[#4A90B8]/8 bg-white/40 p-1 backdrop-blur-sm">
              {events.map((ev, i) => (
                <button key={ev.name} onClick={() => setActiveEventIndex(i)}
                  className={`flex-1 rounded-full px-3 py-2 text-[9px] font-medium uppercase tracking-[0.1em] transition-all ${i === activeEventIndex ? "bg-[#4A90B8]/12 text-[#1A3A4A]/70 shadow-sm" : "text-[#2A4A5A]/35 hover:text-[#2A4A5A]/50"}`}
                  style={{ fontFamily: "var(--font-montserrat)" }}>{ev.name}</button>
              ))}
            </div>

            {/* Event detail card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEventIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl border border-[#4A90B8]/8 bg-white/40 p-6 text-center backdrop-blur-sm"
              >
                <p className="text-3xl text-[#1A3A4A]/60" style={{ fontFamily: "var(--font-great-vibes)" }}>{events[activeEventIndex]!.name}</p>
                <p className="mt-2 text-sm italic text-[#2A4A5A]/40" style={{ fontFamily: "var(--font-cormorant)" }}>{events[activeEventIndex]!.desc}</p>
                <div className="mx-auto my-4 h-px w-16 bg-[#4A90B8]/10" />
                <p className="text-lg font-bold text-[#4A90B8]/50" style={{ fontFamily: "var(--font-playfair)" }}>{events[activeEventIndex]!.time}</p>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <MapPin className="h-3 w-3 text-[#4A90B8]/35" />
                  <span className="text-xs text-[#2A4A5A]/40" style={{ fontFamily: "var(--font-montserrat)" }}>{events[activeEventIndex]!.venue}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ── DRESS CODE ── */}
        <motion.section className="px-6 py-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="mx-auto max-w-md text-center">
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#4A90B8]/40" style={{ fontFamily: "var(--font-montserrat)" }}>What to Wear</p>
            <Divider />
            <h2 className="mt-2 text-2xl text-[#1A3A4A]/60" style={{ fontFamily: "var(--font-great-vibes)" }}>Beach Formal</h2>
            <p className="mt-4 text-sm text-[#2A4A5A]/40" style={{ fontFamily: "var(--font-cormorant)" }}>Light linens · Pastels · Comfortable footwear welcome</p>
          </div>
        </motion.section>

        {/* ── VENUE ── */}
        <motion.section className="relative overflow-hidden px-6 py-28" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="absolute inset-0 bg-gradient-to-b from-[#F0F6FA] via-[#D8ECF8] to-[#C0D8EA]" />
          <svg viewBox="0 0 500 20" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full" style={{ animation: "az-wave 8s ease-in-out infinite" }}>
            <path d="M0 10 Q60 4 120 10 Q180 16 240 10 Q300 4 360 10 Q420 16 500 10 L500 20 L0 20Z" fill="#F0F6FA" fillOpacity="0.5" />
          </svg>
          <div className="relative mx-auto max-w-md text-center">
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#4A90B8]/45" style={{ fontFamily: "var(--font-montserrat)" }}>The Venue</p>
            <Divider />
            <h2 className="mt-2 text-3xl text-[#2A4A5A]/60" style={{ fontFamily: "var(--font-great-vibes)" }}>Sunset Beach</h2>
            <p className="mt-5 text-base text-[#2A4A5A]/40" style={{ fontFamily: "var(--font-cormorant)" }}>Golden sand, endless blue, and a sky painted just for us.</p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/40 px-5 py-2 backdrop-blur-sm">
              <MapPin className="h-3.5 w-3.5 text-[#4A90B8]/45" /><span className="text-xs text-[#2A4A5A]/45">Malibu, California</span>
            </div>
          </div>
        </motion.section>

        {/* ── GALLERY — reveal-on-click (NOT auto-visible grid like Maharani) ── */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#4A90B8]/40" style={{ fontFamily: "var(--font-montserrat)" }}>Moments</p>
            <Divider />

            {!isGalleryOpen ? (
              <motion.button onClick={() => setIsGalleryOpen(true)} className="group mx-auto mt-6 flex flex-col items-center gap-3"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#4A90B8]/12 bg-white/40 transition-all group-hover:bg-white/60">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#4A90B8" strokeWidth="1.2" strokeOpacity="0.45" strokeLinecap="round">
                    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                </div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#2A4A5A]/40" style={{ fontFamily: "var(--font-montserrat)" }}>Tap to View Gallery</p>
              </motion.button>
            ) : (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-6 grid grid-cols-2 gap-3">
                {GALLERY.map((p, i) => (
                  <motion.button key={p.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} onClick={() => setSelectedPhoto(i)}
                    className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-md">
                    <div className="relative aspect-square"><Image src={p.src} alt={p.label} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="50vw" /></div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1A3A4A]/40 to-transparent p-2 pt-6">
                      <p className="text-[9px] text-white/80" style={{ fontFamily: "var(--font-montserrat)" }}>{p.label}</p>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedPhoto !== null && (
            <motion.div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#1A3A4A]/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedPhoto(null)}>
              <motion.div className="relative mx-6 max-w-lg overflow-hidden rounded-2xl shadow-2xl" initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }} onClick={e => e.stopPropagation()}>
                <div className="relative aspect-[4/3]"><Image src={GALLERY[selectedPhoto]!.src} alt={GALLERY[selectedPhoto]!.label} fill className="object-cover" sizes="500px" /></div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1A3A4A]/50 to-transparent p-4 pt-10">
                  <p className="text-lg text-white/90" style={{ fontFamily: "var(--font-great-vibes)" }}>{GALLERY[selectedPhoto]!.label}</p>
                </div>
                <button onClick={() => setSelectedPhoto(null)} className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/40 text-[#1A3A4A]/50 backdrop-blur-sm hover:bg-white/70">✕</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── RSVP ── */}
        <motion.section className="px-6 py-28" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="mx-auto max-w-md text-center">
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#4A90B8]/40" style={{ fontFamily: "var(--font-montserrat)" }}>We hope to see you</p>
            <Divider />
            <h2 className="mt-2 text-3xl text-[#1A3A4A]/55" style={{ fontFamily: "var(--font-great-vibes)" }}>Will you join us?</h2>
            <div className="mt-8">
              <Button size="lg" className="gap-2 bg-[#4A90B8] px-12 text-base text-white hover:bg-[#3A80A8]"><Heart className="h-4 w-4" /> RSVP</Button>
            </div>
          </div>
        </motion.section>

        {/* ── CLOSING ── */}
        <motion.section className="px-6 py-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
          <div className="mx-auto max-w-md text-center">
            <p className="text-base italic text-[#2A4A5A]/40" style={{ fontFamily: "var(--font-cormorant)" }}>Thank you for being part of our story.</p>
            <Divider />
            <h3 className="az-shimmer mt-4 inline-block text-2xl" style={{ fontFamily: "var(--font-great-vibes)" }}>James & Rose</h3>
            <p className="mt-1 text-[10px] text-[#4A90B8]/35" style={{ fontFamily: "var(--font-montserrat)" }}>October 8, 2026</p>
          </div>
        </motion.section>

        <section className="border-t border-[#4A90B8]/6 px-6 py-6">
          <p className="text-center text-[9px] text-[#4A90B8]/20">{platform.watermarkText}</p>
        </section>

        {/* Nav */}
        <Link href="/templates/azure-vows" className="fixed top-5 left-5 z-[101] flex items-center gap-1.5 rounded-full bg-white/50 px-4 py-2 text-xs font-medium text-[#2A4A5A]/50 shadow-sm backdrop-blur-md hover:bg-white/75">
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </Link>
        <button onClick={toggleMusic} className="fixed top-5 right-5 z-[101] flex h-9 w-9 items-center justify-center rounded-full bg-white/50 shadow-sm backdrop-blur-md hover:bg-white/75">
          {isMusicPlaying ? <Volume2 className="h-4 w-4 text-[#4A90B8]/50" /> : <VolumeX className="h-4 w-4 text-[#2A4A5A]/30" />}
        </button>
      </div>
    </>
  );
}
