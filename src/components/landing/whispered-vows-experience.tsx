"use client";

import { useState, useCallback } from "react";
import { useTemplateMusic } from "@/hooks/use-template-music";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Clock, Heart, Volume2, VolumeX, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { platform } from "@/lib/platform";
import { TemplateWatermark } from "@/components/landing/template-watermark";

/* ================================================================== */
/*  CSS                                                               */
/* ================================================================== */

const CSS = `
@keyframes wv-dust {
  0%, 100% { opacity: 0; transform: translateY(0) scale(0.5); }
  50% { opacity: 1; transform: translateY(-12px) scale(1); }
}
@keyframes wv-glow {
  0%, 100% { opacity: 0.12; }
  50% { opacity: 0.25; }
}
`;

const GRAIN = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='a'%3E%3CfeTurbulence baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23a)' opacity='.4'/%3E%3C/svg%3E\")";
const A = "#5A4830";
const T = "#2A1E14";

/* ================================================================== */
/*  Data                                                              */
/* ================================================================== */

const EVENTS = [
  { name: "Engagement", date: "Nov 15", time: "11 AM", venue: "Garden Terrace", note: "Where it all began, again" },
  { name: "Haldi", date: "Nov 18", time: "10 AM", venue: "Courtyard Lawn", note: "Golden blessings under the sun" },
  { name: "Wedding", date: "Nov 20", time: "5 PM", venue: "Heritage Pavilion", note: "Two hearts, one promise" },
  { name: "Reception", date: "Nov 20", time: "8 PM", venue: "Grand Ballroom", note: "A night to remember forever" },
];

const STORY_PAGES = [
  { title: "The Bookshop", text: "A quiet autumn evening, a little bookshop on the corner of Maple Street. He reached for the same book she did.", year: "2022" },
  { title: "First Letter", text: "He left a handwritten note in her favorite book. She found it three days later and smiled for hours.", year: "2023" },
  { title: "The Question", text: "On a garden bench, surrounded by fairy lights and old roses, he asked the only question that mattered.", year: "2024" },
  { title: "Forever Begins", text: "November 20, 2026 - at the Heritage Garden Estate, two stories become one.", year: "2026" },
];

const GALLERY = [
  { label: "Garden Aisle", src: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=500&h=500&fit=crop&q=80" },
  { label: "The Promise", src: "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?w=500&h=500&fit=crop&q=80" },
  { label: "Golden Hour", src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=500&h=500&fit=crop&q=80" },
  { label: "Forever", src: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=500&h=500&fit=crop&q=80" },
];

/* ================================================================== */
/*  Helpers                                                           */
/* ================================================================== */

function VDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-1">
      <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#5A4830]/15" />
      <span className="text-[8px] text-[#5A4830]/25">❧</span>
      <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#5A4830]/15" />
    </div>
  );
}

/* ================================================================== */
/*  Main                                                              */
/* ================================================================== */

export function VintageAffairExperience() {
  const { scrollYProgress } = useScroll();

  const [isBookOpen, setIsBookOpen] = useState(false);
  const [storyPage, setStoryPage] = useState(0);
  const [revealedEvents, setRevealedEvents] = useState<Set<number>>(new Set());
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const { isPlaying: isMusicPlaying, toggle: toggleMusic } = useTemplateMusic("vintage");

  const revealEvent = useCallback((idx: number) => {
    setRevealedEvents(prev => { const n = new Set(prev); n.add(idx); return n; });
  }, []);

  // ── ENTRY - "Open the Book" (unique - NOT envelope, NOT horizon) ──
  if (!isBookOpen) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#D4C8AE]">
          <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: GRAIN }} />
          {/* Fairy lights */}
          {[20, 40, 60, 80].map((l, i) => (
            <div key={i} className="absolute h-[3px] w-[3px] rounded-full bg-[#FFE8A0]" style={{ left: `${l}%`, top: `${15 + i * 5}%`, animation: `wv-glow ${3 + i}s ease-in-out ${i}s infinite` }} />
          ))}
          {/* Dust */}
          {[15, 45, 70, 88].map((l, i) => (
            <div key={`d${i}`} className="absolute h-[2px] w-[2px] rounded-full bg-[#C8B898]" style={{ left: `${l}%`, top: `${30 + i * 12}%`, animation: `wv-dust ${5 + i}s ease-in-out ${i * 1.5}s infinite` }} />
          ))}

          <motion.button
            onClick={() => setIsBookOpen(true)}
            className="group relative z-10 flex flex-col items-center gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Book icon */}
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#5A4830]/12 bg-[#EDE4D0]/60 shadow-[0_4px_20px_rgba(60,40,20,0.08)] transition-all group-hover:shadow-[0_8px_30px_rgba(60,40,20,0.12)]">
              <BookOpen className="h-7 w-7 text-[#5A4830]/45" />
            </div>
            <div className="text-center">
              <p className="text-[9px] uppercase tracking-[0.5em] text-[#5A4830]/45" style={{ fontFamily: "var(--font-cinzel)" }}>A Love Story</p>
              <p className="mt-2 text-3xl text-[#2A1E14]/65" style={{ fontFamily: "var(--font-dancing-script)" }}>Rohan & Aisha</p>
            </div>
            <motion.div animate={{ y: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
              <p className="text-[8px] uppercase tracking-[0.3em] text-[#5A4830]/35" style={{ fontFamily: "var(--font-montserrat)" }}>Open the Book</p>
            </motion.div>
          </motion.button>

          <Link href="/templates/whispered-vows" className="fixed top-5 left-5 z-[101] flex items-center gap-1.5 rounded-full border border-[#5A4830]/8 bg-[#E5DCC8]/60 px-4 py-2 text-xs font-medium text-[#3A2818]/50 shadow-sm backdrop-blur-md hover:bg-[#E5DCC8]">
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </Link>
        </div>
      </>
    );
  }

  // ── MAIN EXPERIENCE ──
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="relative min-h-screen overflow-x-hidden bg-[#D8CCAE]">
        <div className="pointer-events-none fixed inset-0 z-[1] opacity-[0.05]" style={{ backgroundImage: GRAIN }} />
        <TemplateWatermark color="#5A4830" />
        {/* Progress */}
        <motion.div className="fixed top-0 right-0 left-0 z-[102] h-[2px] origin-left bg-gradient-to-r from-[#8B7040] to-[#C8A870]" style={{ scaleX: scrollYProgress }} />
        {/* Dust */}
        <div className="pointer-events-none fixed inset-0 z-[90]">
          {[12, 35, 55, 78].map((l, i) => (
            <div key={i} className="absolute h-[2px] w-[2px] rounded-full bg-[#C8B898]" style={{ left: `${l}%`, top: `${25 + i * 15}%`, animation: `wv-dust ${5 + i}s ease-in-out ${i * 1.2}s infinite` }} />
          ))}
        </div>

        {/* ── HERO - letter card ── */}
        <motion.section className="relative flex min-h-screen flex-col items-center justify-center px-6" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
          <div className="absolute inset-0 bg-gradient-to-b from-[#D4C8AE] via-[#CCBC9C] to-[#C0B090]" />
          {/* Fairy lights */}
          {[25, 45, 65, 85].map((l, i) => (
            <div key={i} className="absolute h-[3px] w-[3px] rounded-full bg-[#FFE8A0]" style={{ left: `${l}%`, top: `${10 + i * 4}%`, animation: `wv-glow ${3.5 + i * 0.5}s ease-in-out ${i * 0.8}s infinite` }} />
          ))}

          <motion.div className="relative z-10 max-w-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <div className="rounded-lg border border-[#B8A888]/30 bg-[#EDE4D0]/70 px-10 py-14 shadow-[0_8px_30px_rgba(60,40,20,0.08)] backdrop-blur-sm">
              <p className="text-center text-[9px] uppercase tracking-[0.5em] text-[#5A4830]/45" style={{ fontFamily: "var(--font-montserrat)" }}>You are invited</p>
              <VDivider />
              <p className="mt-2 text-center text-xs italic text-[#5A4830]/40" style={{ fontFamily: "var(--font-cormorant)" }}>to the wedding of</p>
              <h1 className="mt-4 text-center text-5xl text-[#2A1E14]/75 md:text-6xl" style={{ fontFamily: "var(--font-dancing-script)" }}>Rohan & Aisha</h1>
              <VDivider />
              <p className="mt-2 text-center text-sm text-[#5A4830]/55" style={{ fontFamily: "var(--font-cormorant)" }}>November 20, 2026</p>
              <p className="mt-1 text-center text-[9px] uppercase tracking-[0.12em] text-[#5A4830]/35" style={{ fontFamily: "var(--font-montserrat)" }}>Heritage Garden Estate</p>
            </div>
            {/* Wax seal */}
            <div className="mx-auto mt-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#8B4040]/15 shadow-inner">
              <span className="text-[9px] font-bold text-[#8B4040]/40" style={{ fontFamily: "var(--font-cinzel)" }}>R&A</span>
            </div>
          </motion.div>

          <motion.div className="absolute bottom-6" animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}>
            <p className="text-[7px] uppercase tracking-[0.2em] text-[#5A4830]/25" style={{ fontFamily: "var(--font-montserrat)" }}>Scroll</p>
            <div className="mx-auto mt-1 h-4 w-px bg-gradient-to-b from-[#5A4830]/15 to-transparent" />
          </motion.div>
        </motion.section>

        {/* ── FAMILY BLESSINGS ── */}
        <motion.section className="px-6 py-24" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="mx-auto max-w-lg text-center">
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#5A4830]/40" style={{ fontFamily: "var(--font-montserrat)" }}>With Blessings Of</p>
            <VDivider />
            <h2 className="mt-2 text-2xl text-[#2A1E14]/65" style={{ fontFamily: "var(--font-dancing-script)" }}>Our Families</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {[
                { side: "Groom's Family", parents: "Mr. Arjun & Mrs. Priya Mehta" },
                { side: "Bride's Family", parents: "Mr. Sameer & Mrs. Kavita Shah" },
              ].map((f, i) => (
                <motion.div key={f.side} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }}
                  className="rounded-lg border border-[#B8A888]/20 bg-[#EDE4D0]/50 p-5" style={{ transform: `rotate(${i === 0 ? "-0.5" : "0.5"}deg)` }}>
                  <p className="text-[8px] uppercase tracking-[0.3em] text-[#5A4830]/35" style={{ fontFamily: "var(--font-montserrat)" }}>{f.side}</p>
                  <div className="my-2 h-px bg-[#5A4830]/8" />
                  <p className="text-sm text-[#2A1E14]/55" style={{ fontFamily: "var(--font-cormorant)" }}>{f.parents}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── LOVE STORY - page-by-page journal (UNIQUE - not tap-reveal or step-nav) ── */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-md">
            <div className="mb-6 text-center">
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#5A4830]/35" style={{ fontFamily: "var(--font-montserrat)" }}>Our Story</p>
              <VDivider />
            </div>

            {/* Journal page */}
            <AnimatePresence mode="wait">
              <motion.div
                key={storyPage}
                initial={{ opacity: 0, rotateY: 30 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: -30 }}
                transition={{ duration: 0.4 }}
                className="rounded-lg border border-[#B8A888]/20 bg-[#EDE4D0]/60 p-8"
                style={{ transform: `rotate(${storyPage % 2 === 0 ? "-0.5" : "0.5"}deg)` }}
              >
                <p className="text-[9px] font-bold text-[#5A4830]/40" style={{ fontFamily: "var(--font-montserrat)" }}>
                  Page {storyPage + 1} of {STORY_PAGES.length} · {STORY_PAGES[storyPage]!.year}
                </p>
                <div className="my-3 h-px bg-[#5A4830]/8" />
                <h3 className="text-xl text-[#2A1E14]/65" style={{ fontFamily: "var(--font-dancing-script)" }}>{STORY_PAGES[storyPage]!.title}</h3>
                <p className="mt-3 text-sm leading-[2] text-[#3A2818]/50" style={{ fontFamily: "var(--font-cormorant)" }}>{STORY_PAGES[storyPage]!.text}</p>
                {/* Handwritten signature on last page */}
                {storyPage === STORY_PAGES.length - 1 && (
                  <p className="mt-4 text-right text-sm italic text-[#5A4830]/35" style={{ fontFamily: "var(--font-dancing-script)" }}>With love, R & A</p>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Page turn buttons - book-style */}
            <div className="mt-4 flex items-center justify-between">
              <button onClick={() => setStoryPage(Math.max(0, storyPage - 1))}
                className={`text-[9px] uppercase tracking-[0.12em] text-[#5A4830]/40 transition-opacity ${storyPage === 0 ? "opacity-0" : "hover:text-[#5A4830]/60"}`}
                style={{ fontFamily: "var(--font-montserrat)" }}>← Prev Page</button>
              {/* Page dots */}
              <div className="flex gap-1.5">
                {STORY_PAGES.map((_, i) => (
                  <button key={i} onClick={() => setStoryPage(i)}
                    className={`h-1.5 rounded-full transition-all ${i === storyPage ? "w-4 bg-[#5A4830]/35" : "w-1.5 bg-[#5A4830]/12"}`} />
                ))}
              </div>
              <button onClick={() => setStoryPage(Math.min(STORY_PAGES.length - 1, storyPage + 1))}
                className={`text-[9px] uppercase tracking-[0.12em] text-[#5A4830]/40 transition-opacity ${storyPage === STORY_PAGES.length - 1 ? "opacity-0" : "hover:text-[#5A4830]/60"}`}
                style={{ fontFamily: "var(--font-montserrat)" }}>Next Page →</button>
            </div>
          </div>
        </section>

        {/* ── EVENTS - sealed cards, tap to unseal (UNIQUE - not accordion, not tabs) ── */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-lg">
            <div className="mb-10 text-center">
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#5A4830]/35" style={{ fontFamily: "var(--font-montserrat)" }}>The Celebrations</p>
              <VDivider />
              <h2 className="mt-2 text-2xl text-[#2A1E14]/65" style={{ fontFamily: "var(--font-dancing-script)" }}>Wedding Events</h2>
            </div>

            <div className="space-y-4">
              {EVENTS.map((ev, i) => {
                const isRevealed = revealedEvents.has(i);
                return (
                  <motion.div key={ev.name} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                    {!isRevealed ? (
                      /* Sealed card - tap to reveal */
                      <motion.button onClick={() => revealEvent(i)} className="group w-full rounded-lg border border-[#B8A888]/15 bg-[#EDE4D0]/40 p-5 text-center transition-all hover:border-[#B8A888]/25 hover:shadow-sm"
                        whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} style={{ transform: `rotate(${i % 2 === 0 ? "-0.3" : "0.3"}deg)` }}>
                        <div className="flex items-center justify-center gap-3">
                          <div className="h-6 w-6 rounded-full bg-[#8B4040]/12" />
                          <p className="text-sm text-[#5A4830]/50" style={{ fontFamily: "var(--font-dancing-script)" }}>{ev.name}</p>
                          <p className="text-[8px] text-[#5A4830]/25" style={{ fontFamily: "var(--font-montserrat)" }}>tap to unseal</p>
                        </div>
                      </motion.button>
                    ) : (
                      /* Revealed card */
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
                        className="rounded-lg border border-[#B8A888]/20 bg-[#EDE4D0]/50 p-5" style={{ transform: `rotate(${i % 2 === 0 ? "-0.5" : "0.5"}deg)` }}>
                        <h3 className="text-lg text-[#2A1E14]/65" style={{ fontFamily: "var(--font-dancing-script)" }}>{ev.name}</h3>
                        <p className="mt-1 text-[10px] italic text-[#5A4830]/40" style={{ fontFamily: "var(--font-cormorant)" }}>{ev.note}</p>
                        <div className="mt-3 h-px bg-[#5A4830]/6" />
                        <div className="mt-3 flex flex-wrap gap-4 text-[11px] text-[#3A2818]/45">
                          <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3 text-[#5A4830]/30" />{ev.date}</span>
                          <span className="flex items-center gap-1.5"><Clock className="h-3 w-3 text-[#5A4830]/30" />{ev.time}</span>
                          <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-[#5A4830]/30" />{ev.venue}</span>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── DRESS CODE ── */}
        <motion.section className="px-6 py-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="mx-auto max-w-md text-center">
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#5A4830]/35" style={{ fontFamily: "var(--font-montserrat)" }}>What to Wear</p>
            <VDivider />
            <h2 className="mt-2 text-xl text-[#2A1E14]/60" style={{ fontFamily: "var(--font-dancing-script)" }}>Vintage Garden Attire</h2>
            <p className="mt-4 text-sm text-[#3A2818]/40" style={{ fontFamily: "var(--font-cormorant)" }}>Earthy tones · Florals · Smart casuals · Comfortable shoes for the garden</p>
          </div>
        </motion.section>

        {/* ── TRAVEL ── */}
        <motion.section className="px-6 py-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="mx-auto max-w-md">
            <div className="text-center">
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#5A4830]/35" style={{ fontFamily: "var(--font-montserrat)" }}>Getting There</p>
              <VDivider />
            </div>
            <div className="mt-8 space-y-3">
              {[
                { title: "From Airport", desc: "45 minutes from the city airport", icon: "M2 16 L10 12 L10 6 Q10 2 12 2 Q14 2 14 6 L14 12 L22 16 L22 18 L14 15 L14 18 L16 20 L16 22 L12 20 L8 22 L8 20 L10 18 L10 15 L2 18Z" },
                { title: "Accommodation", desc: "The Garden Inn - special guest rates", icon: "M3 20 L3 10 L12 4 L21 10 L21 20 M8 20 L8 14 L16 14 L16 20" },
              ].map((t, i) => (
                <motion.div key={t.title} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 rounded-lg border border-[#B8A888]/12 bg-[#EDE4D0]/40 p-4 text-left">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#5A4830]/10 bg-[#5A4830]/[0.04]">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="#5A4830" strokeWidth="1.2" strokeOpacity="0.45" strokeLinecap="round"><path d={t.icon} /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#2A1E14]/55" style={{ fontFamily: "var(--font-playfair)" }}>{t.title}</p>
                    <p className="mt-0.5 text-xs text-[#5A4830]/40" style={{ fontFamily: "var(--font-cormorant)" }}>{t.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── VENUE ── */}
        <motion.section className="px-6 py-24" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="mx-auto max-w-md text-center">
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#5A4830]/35" style={{ fontFamily: "var(--font-montserrat)" }}>The Venue</p>
            <VDivider />
            <h2 className="mt-2 text-2xl text-[#2A1E14]/60" style={{ fontFamily: "var(--font-dancing-script)" }}>Heritage Garden Estate</h2>
            <p className="mt-5 text-base leading-relaxed text-[#3A2818]/45" style={{ fontFamily: "var(--font-cormorant)" }}>
              A century-old estate wrapped in ivy and memories.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#B8A888]/15 bg-[#EDE4D0]/40 px-5 py-2">
              <MapPin className="h-3.5 w-3.5 text-[#5A4830]/35" /><span className="text-xs text-[#3A2818]/40">Heritage Lane, Garden District</span>
            </div>
          </div>
        </motion.section>

        {/* ── GALLERY - tap to open book of memories (UNIQUE) ── */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#5A4830]/35" style={{ fontFamily: "var(--font-montserrat)" }}>Captured Moments</p>
            <VDivider />

            {!isGalleryOpen ? (
              <motion.button onClick={() => setIsGalleryOpen(true)} className="group mx-auto mt-6 flex flex-col items-center gap-3"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#5A4830]/10 bg-[#EDE4D0]/50 transition-all group-hover:bg-[#EDE4D0]/70">
                  <BookOpen className="h-5 w-5 text-[#5A4830]/40" />
                </div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#5A4830]/35" style={{ fontFamily: "var(--font-montserrat)" }}>Open Photo Album</p>
              </motion.button>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mt-6 grid max-w-sm grid-cols-2 gap-2.5">
                {GALLERY.map((p, i) => (
                  <motion.button key={p.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setSelectedPhoto(i)}
                    className="group relative overflow-hidden rounded-lg border border-[#B8A888]/10 shadow-sm transition-shadow hover:shadow-md">
                    <div className="relative aspect-square">
                      <Image src={p.src} alt={p.label} fill className="object-cover brightness-[0.95] sepia-[0.15] transition-transform duration-500 group-hover:scale-105" sizes="180px" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2A1E14]/50 to-transparent p-2 pt-6">
                      <p className="text-[10px] text-[#F0E8D8]/80" style={{ fontFamily: "var(--font-dancing-script)" }}>{p.label}</p>
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
            <motion.div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#2A1E14]/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedPhoto(null)}>
              <motion.div className="relative mx-6 max-w-lg overflow-hidden rounded-xl shadow-2xl" initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }} onClick={e => e.stopPropagation()}>
                <div className="relative aspect-[4/3]"><Image src={GALLERY[selectedPhoto]!.src} alt={GALLERY[selectedPhoto]!.label} fill className="object-cover" sizes="500px" /></div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2A1E14]/50 to-transparent p-4 pt-10">
                  <p className="text-lg text-white/90" style={{ fontFamily: "var(--font-dancing-script)" }}>{GALLERY[selectedPhoto]!.label}</p>
                </div>
                <button onClick={() => setSelectedPhoto(null)} className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#EDE4D0]/50 text-[#2A1E14]/50 backdrop-blur-sm hover:bg-[#EDE4D0]/80">✕</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── RSVP ── */}
        <motion.section className="px-6 py-24" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="mx-auto max-w-sm text-center">
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#5A4830]/35" style={{ fontFamily: "var(--font-montserrat)" }}>We await you</p>
            <VDivider />
            <h2 className="mt-2 text-2xl text-[#2A1E14]/55" style={{ fontFamily: "var(--font-dancing-script)" }}>Will you join us?</h2>
            <div className="mt-8">
              <Button size="lg" className="gap-2 bg-[#5A4830] px-10 text-base text-[#EDE4D0] hover:bg-[#4A3820]"><Heart className="h-4 w-4" /> RSVP</Button>
            </div>
          </div>
        </motion.section>

        {/* ── CLOSING ── */}
        <motion.section className="px-6 py-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
          <div className="mx-auto max-w-xs text-center">
            <div className="rounded-lg border border-[#B8A888]/15 bg-[#EDE4D0]/50 px-6 py-8">
              <p className="text-xs italic text-[#5A4830]/40" style={{ fontFamily: "var(--font-cormorant)" }}>Thank you for being part of our story</p>
              <h3 className="mt-3 text-2xl text-[#2A1E14]/60" style={{ fontFamily: "var(--font-dancing-script)" }}>Rohan & Aisha</h3>
              <p className="mt-1 text-[9px] text-[#5A4830]/30" style={{ fontFamily: "var(--font-montserrat)" }}>November 20, 2026</p>
            </div>
            <p className="mt-6 text-[9px] text-[#5A4830]/18">{platform.watermarkText}</p>
          </div>
        </motion.section>

        {/* Nav */}
        <Link href="/templates/whispered-vows" className="fixed top-5 left-5 z-[101] flex items-center gap-1.5 rounded-full border border-[#B8A888]/15 bg-[#E5DCC8]/60 px-4 py-2 text-xs font-medium text-[#3A2818]/50 shadow-sm backdrop-blur-md hover:bg-[#E5DCC8]">
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </Link>
        <button onClick={toggleMusic} className="fixed top-5 right-5 z-[101] flex h-9 w-9 items-center justify-center rounded-full border border-[#B8A888]/12 bg-[#E5DCC8]/60 shadow-sm backdrop-blur-md hover:bg-[#E5DCC8]">
          {isMusicPlaying ? <Volume2 className="h-4 w-4 text-[#5A4830]/50" /> : <VolumeX className="h-4 w-4 text-[#5A4830]/30" />}
        </button>
      </div>
    </>
  );
}
