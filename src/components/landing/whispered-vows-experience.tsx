"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { platform } from "@/lib/platform";

/* ================================================================== */
/*  CSS                                                               */
/* ================================================================== */

const CSS = `
@keyframes vintage-dust {
  0%, 100% { opacity: 0; transform: translateY(0) scale(0.5); }
  50% { opacity: 1; transform: translateY(-15px) scale(1); }
}
@keyframes vintage-glow {
  0%, 100% { opacity: 0.15; }
  50% { opacity: 0.30; }
}
`;

/* ================================================================== */
/*  Shared constants                                                  */
/* ================================================================== */

const GRAIN = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='a'%3E%3CfeTurbulence baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23a)' opacity='.4'/%3E%3C/svg%3E\")";
const ACCENT = "#5A4830";
const TEXT = "#2A1E14";

/* ================================================================== */
/*  Helpers                                                           */
/* ================================================================== */

function VintageDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-1">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#5A4830]/20" />
      <span className="text-[8px] text-[#5A4830]/30">❧</span>
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#5A4830]/20" />
    </div>
  );
}

function Watermark() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[95] overflow-hidden">
      <span className="absolute top-[22%] right-[6%] -rotate-[25deg] text-xl font-semibold tracking-[0.5em] text-[#5A4830]/[0.03] select-none" style={{ fontFamily: "var(--font-cinzel)" }}>{platform.name}</span>
      <span className="absolute bottom-[28%] left-[10%] -rotate-[25deg] text-xl font-semibold tracking-[0.5em] text-[#5A4830]/[0.03] select-none" style={{ fontFamily: "var(--font-cinzel)" }}>{platform.name}</span>
    </div>
  );
}

/* ================================================================== */
/*  Events                                                            */
/* ================================================================== */

const EVENTS = [
  { name: "Engagement", date: "Nov 15, 2026", time: "11 AM", venue: "The Garden Terrace", motif: "Where it all began, again" },
  { name: "Haldi", date: "Nov 18, 2026", time: "10 AM", venue: "Courtyard Lawn", motif: "Golden blessings under the sun" },
  { name: "Wedding", date: "Nov 20, 2026", time: "5 PM", venue: "The Heritage Pavilion", motif: "Two hearts, one promise" },
  { name: "Reception", date: "Nov 20, 2026", time: "8 PM", venue: "Grand Ballroom", motif: "A night to remember forever" },
];

/* ================================================================== */
/*  Main experience                                                   */
/* ================================================================== */

export function VintageAffairExperience() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="relative min-h-screen overflow-x-hidden bg-[#D8CCAE]">
        {/* Paper texture over entire page */}
        <div className="pointer-events-none fixed inset-0 z-[1] opacity-[0.05]" style={{ backgroundImage: GRAIN }} />
        <Watermark />

        {/* Dust particles */}
        <div className="pointer-events-none fixed inset-0 z-[90]">
          {[12, 30, 50, 70, 85, 42].map((l, i) => (
            <div key={i} className="absolute h-[2px] w-[2px] rounded-full bg-[#D4C8A0]" style={{ left: `${l}%`, top: `${20 + i * 12}%`, animation: `vintage-dust ${5 + i}s ease-in-out ${i * 1.5}s infinite` }} />
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  HERO — vintage table, letter style                       */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#D4C8AE] via-[#CCBC9C] to-[#C0B090]" />
          {/* Warm light — like fairy lights */}
          <div className="absolute top-[12%] left-[30%] h-20 w-20 rounded-full bg-[#FFE8C0]/20 blur-[25px]" style={{ animation: "vintage-glow 4s ease-in-out infinite" }} />
          <div className="absolute top-[15%] right-[25%] h-16 w-16 rounded-full bg-[#FFE8C0]/15 blur-[20px]" style={{ animation: "vintage-glow 5s ease-in-out 1s infinite" }} />
          <div className="absolute top-[10%] left-1/2 h-14 w-14 -translate-x-1/2 rounded-full bg-[#FFE8C0]/18 blur-[18px]" style={{ animation: "vintage-glow 4.5s ease-in-out 0.5s infinite" }} />

          {/* Content — letter style */}
          <motion.div
            className="relative z-10 max-w-sm text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{ opacity: heroOpacity }}
          >
            {/* Paper card */}
            <div className="rounded-lg border border-[#B8A888]/30 bg-[#EDE4D0]/70 px-10 py-14 shadow-[0_8px_30px_rgba(80,60,30,0.08)] backdrop-blur-sm">
              <p className="text-[9px] uppercase tracking-[0.5em] text-[#5A4830]/40" style={{ fontFamily: "var(--font-montserrat)" }}>
                You are cordially invited
              </p>
              <VintageDivider />
              <p className="mt-2 text-xs italic text-[#5A4830]/35" style={{ fontFamily: "var(--font-cormorant)" }}>
                to the wedding celebration of
              </p>
              <h1 className="mt-4 text-5xl leading-tight text-[#2A1E14] md:text-6xl" style={{ fontFamily: "var(--font-dancing-script)" }}>
                Rohan & Aisha
              </h1>
              <VintageDivider />
              <p className="mt-2 text-sm text-[#5A4830]/50" style={{ fontFamily: "var(--font-cormorant)" }}>
                November 20, 2026
              </p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-[#5A4830]/30" style={{ fontFamily: "var(--font-montserrat)" }}>
                The Heritage Garden Estate
              </p>
            </div>

            {/* Wax seal below card */}
            <div className="mx-auto mt-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#8B5040]/15 shadow-[inset_0_1px_3px_rgba(0,0,0,0.08)]">
              <span className="text-[10px] font-bold text-[#8B5040]/40" style={{ fontFamily: "var(--font-cinzel)" }}>R&A</span>
            </div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div className="absolute bottom-6" animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}>
            <p className="text-[7px] uppercase tracking-[0.2em] text-[#5A4830]/20" style={{ fontFamily: "var(--font-montserrat)" }}>Scroll</p>
            <div className="mx-auto mt-1 h-4 w-px bg-gradient-to-b from-[#5A4830]/15 to-transparent" />
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  LOVE STORY — handwritten letter style                    */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <motion.section className="relative px-6 py-28" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="mx-auto max-w-md">
            {/* Letter paper */}
            <motion.div initial={{ opacity: 0, y: 15, rotate: -1 }} whileInView={{ opacity: 1, y: 0, rotate: -1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="rounded-lg border border-[#B8A888]/25 bg-[#EDE4D0]/60 p-8 shadow-[0_4px_20px_rgba(80,60,30,0.06)]"
              style={{ transform: "rotate(-1deg)" }}
            >
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#5A4830]/35" style={{ fontFamily: "var(--font-montserrat)" }}>Our Story</p>
              <div className="mt-2 h-px w-10 bg-[#5A4830]/12" />
              <p className="mt-6 text-base leading-[2.4] text-[#3A2818]/45" style={{ fontFamily: "var(--font-cormorant)" }}>
                Dear friends and family, we met on a quiet autumn evening at a
                little bookshop on the corner of Maple Street. What started as a
                shared love for old stories turned into a love story of our own.
                Three years, countless sunsets, and one unforgettable question later —
                here we are, ready to write our next chapter.
              </p>
              <p className="mt-6 text-right text-sm italic text-[#5A4830]/35" style={{ fontFamily: "var(--font-dancing-script)" }}>
                With love, Rohan & Aisha
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  EVENTS — paper tag style, vertical                       */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="relative px-6 py-20">
          <div className="mx-auto max-w-lg">
            <div className="mb-14 text-center">
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#5A4830]/35" style={{ fontFamily: "var(--font-montserrat)" }}>The Celebrations</p>
              <VintageDivider />
              <h2 className="mt-2 text-3xl text-[#2A1E14]" style={{ fontFamily: "var(--font-dancing-script)" }}>Wedding Events</h2>
            </div>

            <div className="space-y-6">
              {EVENTS.map((event, i) => (
                <motion.div
                  key={event.name}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -15 : 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5 }}
                  className="relative overflow-hidden rounded-lg border border-[#B8A888]/20 bg-[#EDE4D0]/50 p-5 shadow-[0_2px_10px_rgba(80,60,30,0.04)]"
                  style={{ transform: `rotate(${i % 2 === 0 ? "-0.5" : "0.5"}deg)` }}
                >
                  {/* Torn edge hint — top */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#B8A888]/15 via-[#B8A888]/25 to-[#B8A888]/15" />

                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl text-[#2A1E14]" style={{ fontFamily: "var(--font-dancing-script)" }}>{event.name}</h3>
                      <p className="mt-1 text-[10px] italic text-[#5A4830]/40" style={{ fontFamily: "var(--font-cormorant)" }}>{event.motif}</p>
                    </div>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#5A4830]/10 bg-[#5A4830]/[0.04]">
                      <span className="text-[9px] font-semibold text-[#5A4830]/40" style={{ fontFamily: "var(--font-cinzel)" }}>{i + 1}</span>
                    </div>
                  </div>

                  <div className="mt-3 h-px bg-gradient-to-r from-[#5A4830]/8 to-transparent" />

                  <div className="mt-3 flex flex-wrap gap-4 text-[11px] text-[#3A2818]/40">
                    <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3 text-[#5A4830]/30" />{event.date}</span>
                    <span className="flex items-center gap-1.5"><Clock className="h-3 w-3 text-[#5A4830]/30" />{event.time}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-[#5A4830]/30" />{event.venue}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  MEMORIES — polaroid style                                */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <motion.section className="relative px-6 py-24" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="mx-auto max-w-2xl">
            <div className="mb-14 text-center">
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#5A4830]/35" style={{ fontFamily: "var(--font-montserrat)" }}>Captured Moments</p>
              <VintageDivider />
              <h2 className="mt-2 text-3xl text-[#2A1E14]" style={{ fontFamily: "var(--font-dancing-script)" }}>Our Memories</h2>
            </div>

            <div className="flex flex-wrap justify-center gap-5">
              {[
                { label: "First Date", rotate: "-3deg", scene: (
                  <svg viewBox="0 0 96 112" className="h-full w-full" fill="none">
                    <rect width="96" height="112" rx="2" fill="#C8B898" fillOpacity="0.4" />
                    {/* Coffee cups */}
                    <rect x="25" y="60" width="18" height="20" rx="3" fill="#8B6040" fillOpacity="0.25" />
                    <path d="M43 68 Q48 68 48 74 Q48 80 43 80" stroke="#8B6040" strokeWidth="0.8" strokeOpacity="0.15" />
                    <rect x="53" y="62" width="18" height="18" rx="3" fill="#8B6040" fillOpacity="0.20" />
                    <path d="M71 69 Q76 69 76 74 Q76 79 71 79" stroke="#8B6040" strokeWidth="0.8" strokeOpacity="0.12" />
                    {/* Steam */}
                    <path d="M34 56 Q36 50 34 44" stroke="#8B6040" strokeWidth="0.5" strokeOpacity="0.10" />
                    <path d="M62 58 Q64 52 62 46" stroke="#8B6040" strokeWidth="0.5" strokeOpacity="0.08" />
                    {/* Table */}
                    <line x1="10" y1="82" x2="86" y2="82" stroke="#8B6040" strokeWidth="0.5" strokeOpacity="0.12" />
                    {/* Book */}
                    <rect x="30" y="86" width="20" height="14" rx="1" fill="#A08060" fillOpacity="0.15" />
                    <line x1="40" y1="86" x2="40" y2="100" stroke="#8B6040" strokeWidth="0.3" strokeOpacity="0.10" />
                  </svg>
                )},
                { label: "The Proposal", rotate: "2deg", scene: (
                  <svg viewBox="0 0 96 112" className="h-full w-full" fill="none">
                    <rect width="96" height="112" rx="2" fill="#C8B898" fillOpacity="0.4" />
                    {/* Ring box */}
                    <rect x="30" y="50" width="36" height="28" rx="3" fill="#5A4830" fillOpacity="0.20" />
                    <rect x="33" y="53" width="30" height="22" rx="2" fill="#8B6040" fillOpacity="0.12" />
                    {/* Ring */}
                    <circle cx="48" cy="62" r="6" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity="0.35" fill="none" />
                    <circle cx="48" cy="57" r="2" fill="#D4AF37" fillOpacity="0.30" />
                    {/* Stars */}
                    <circle cx="25" cy="30" r="1" fill="#D4AF37" fillOpacity="0.20" />
                    <circle cx="70" cy="25" r="1" fill="#D4AF37" fillOpacity="0.15" />
                    <circle cx="48" cy="20" r="1.5" fill="#D4AF37" fillOpacity="0.18" />
                    {/* Ground */}
                    <line x1="15" y1="85" x2="80" y2="85" stroke="#8B6040" strokeWidth="0.4" strokeOpacity="0.10" />
                  </svg>
                )},
                { label: "Together", rotate: "-1deg", scene: (
                  <svg viewBox="0 0 96 112" className="h-full w-full" fill="none">
                    <rect width="96" height="112" rx="2" fill="#C8B898" fillOpacity="0.4" />
                    {/* Two silhouettes walking */}
                    <circle cx="38" cy="40" r="6" fill="#5A4830" fillOpacity="0.25" />
                    <path d="M30 85 L33 55 Q33 48 38 48 Q43 48 43 55 L46 85" fill="#5A4830" fillOpacity="0.20" />
                    <circle cx="55" cy="40" r="6" fill="#5A4830" fillOpacity="0.22" />
                    <path d="M47 85 L50 53 Q50 48 55 48 Q60 48 60 53 L66 85 Q55 80 47 85Z" fill="#5A4830" fillOpacity="0.18" />
                    {/* Held hands */}
                    <path d="M43 60 L50 60" stroke="#5A4830" strokeWidth="0.8" strokeOpacity="0.15" />
                    {/* Trees/path */}
                    <path d="M10 88 Q48 82 86 88" stroke="#7A8A60" strokeWidth="0.5" strokeOpacity="0.12" />
                    <path d="M15 75 Q12 65 18 60" stroke="#7A8A60" strokeWidth="0.5" strokeOpacity="0.10" />
                    <circle cx="15" cy="58" r="5" fill="#7A8A60" fillOpacity="0.10" />
                    <path d="M78 75 Q82 65 76 60" stroke="#7A8A60" strokeWidth="0.5" strokeOpacity="0.10" />
                    <circle cx="79" cy="58" r="5" fill="#7A8A60" fillOpacity="0.10" />
                  </svg>
                )},
              ].map((photo, i) => (
                <motion.div
                  key={photo.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="rounded-sm bg-[#F0E8D4] p-2.5 shadow-[0_3px_12px_rgba(60,40,20,0.10)]"
                  style={{ transform: `rotate(${photo.rotate})` }}
                >
                  <div className="h-28 w-24 overflow-hidden rounded-sm">{photo.scene}</div>
                  <p className="mt-2 text-center text-[9px] text-[#5A4830]/50" style={{ fontFamily: "var(--font-dancing-script)" }}>{photo.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  SPECIAL ELEMENTS                                          */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <motion.section className="relative px-6 py-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="mx-auto max-w-md text-center">
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#5A4830]/35" style={{ fontFamily: "var(--font-montserrat)" }}>Details</p>
            <VintageDivider />
            <h2 className="mt-2 text-3xl text-[#2A1E14]" style={{ fontFamily: "var(--font-dancing-script)" }}>The Little Things</h2>

            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                { label: "Vintage Décor", desc: "Garden roses & fairy lights" },
                { label: "Live Music", desc: "Acoustic & gramophone" },
                { label: "Wine & Dine", desc: "Curated vintage menu" },
                { label: "Photo Booth", desc: "Polaroid memories" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-lg border border-[#B8A888]/15 bg-[#E5DCC8]/40 p-4"
                >
                  <p className="text-xs font-medium text-[#2A1E14]/55" style={{ fontFamily: "var(--font-montserrat)" }}>{item.label}</p>
                  <p className="mt-0.5 text-[10px] italic text-[#5A4830]/40" style={{ fontFamily: "var(--font-cormorant)" }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  VENUE                                                     */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <motion.section className="relative px-6 py-24" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="mx-auto max-w-md text-center">
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#5A4830]/35" style={{ fontFamily: "var(--font-montserrat)" }}>The Venue</p>
            <VintageDivider />
            <h2 className="mt-2 text-3xl text-[#2A1E14]" style={{ fontFamily: "var(--font-dancing-script)" }}>Heritage Garden Estate</h2>
            <p className="mt-6 text-base leading-relaxed text-[#3A2818]/40" style={{ fontFamily: "var(--font-cormorant)" }}>
              A century-old estate wrapped in ivy and memories — where every corner
              tells a story and every garden path leads to something beautiful.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#B8A888]/20 bg-[#E5DCC8]/40 px-5 py-2">
              <MapPin className="h-3.5 w-3.5 text-[#5A4830]/40" />
              <span className="text-xs text-[#3A2818]/40" style={{ fontFamily: "var(--font-montserrat)" }}>Heritage Lane, Garden District</span>
            </div>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  RSVP                                                      */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <motion.section className="relative px-6 py-24" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="mx-auto max-w-sm text-center">
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#5A4830]/35" style={{ fontFamily: "var(--font-montserrat)" }}>We await your presence</p>
            <VintageDivider />
            <h2 className="mt-2 text-3xl text-[#2A1E14]" style={{ fontFamily: "var(--font-dancing-script)" }}>Will you join us?</h2>
            <p className="mt-4 text-sm text-[#3A2818]/40" style={{ fontFamily: "var(--font-cormorant)" }}>
              Your presence would be the greatest gift.
            </p>
            <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-8">
              <Button size="lg" className="gap-2 bg-[#5A4830] px-10 text-base text-[#EDE4D0] hover:bg-[#5A5035]">
                <Heart className="h-4 w-4" /> RSVP
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  CLOSING — thank you card                                  */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="px-6 pb-16 pt-8">
          <div className="mx-auto max-w-xs text-center">
            <div className="rounded-lg border border-[#B8A888]/20 bg-[#EDE4D0]/50 px-6 py-8">
              <p className="text-xs italic text-[#5A4830]/35" style={{ fontFamily: "var(--font-cormorant)" }}>Thank you for being part of our story</p>
              <h3 className="mt-3 text-2xl text-[#2A1E14]" style={{ fontFamily: "var(--font-dancing-script)" }}>Rohan & Aisha</h3>
              <p className="mt-1 text-[9px] text-[#5A4830]/30" style={{ fontFamily: "var(--font-montserrat)" }}>November 20, 2026</p>
            </div>
            <p className="mt-6 text-[9px] text-[#5A4830]/18" style={{ fontFamily: "var(--font-montserrat)" }}>{platform.watermarkText}</p>
          </div>
        </section>

        {/* Back */}
        <Link href="/templates/whispered-vows" className="fixed top-5 left-5 z-[101] flex items-center gap-1.5 rounded-full border border-[#B8A888]/25 bg-[#E5DCC8]/70 px-4 py-2 text-xs font-medium text-[#3A2818]/55 shadow-sm backdrop-blur-md transition-all hover:bg-[#E5DCC8] hover:text-[#2A1E14]">
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </Link>
      </div>
    </>
  );
}
