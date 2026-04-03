"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { platform } from "@/lib/platform";

/* ================================================================== */
/*  CSS                                                               */
/* ================================================================== */

const CSS = `
@keyframes azure-drift {
  0%, 100% { transform: translateY(0) translateX(0); }
  25% { transform: translateY(-4px) translateX(2px); }
  75% { transform: translateY(3px) translateX(-2px); }
}
@keyframes azure-wave {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(-8px); }
}
@keyframes azure-shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
.azure-shimmer {
  background: linear-gradient(90deg, #4A90B8 0%, #8EC8E8 30%, #4A90B8 50%, #8EC8E8 70%, #4A90B8 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: azure-shimmer 5s linear infinite;
}
`;

/* ================================================================== */
/*  Watermark                                                         */
/* ================================================================== */

function Watermark() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[95] overflow-hidden">
      <span className="absolute top-[25%] right-[5%] -rotate-[25deg] text-xl font-semibold tracking-[0.5em] text-[#4A90B8]/[0.03] select-none" style={{ fontFamily: "var(--font-cinzel)" }}>{platform.name}</span>
      <span className="absolute bottom-[30%] left-[8%] -rotate-[25deg] text-xl font-semibold tracking-[0.5em] text-[#4A90B8]/[0.03] select-none" style={{ fontFamily: "var(--font-cinzel)" }}>{platform.name}</span>
    </div>
  );
}

/* ================================================================== */
/*  Main experience                                                   */
/* ================================================================== */

export function AzureVowsExperience() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="relative min-h-screen overflow-x-hidden bg-[#F0F6FA]">
        <Watermark />

        {/* ═════════════════════════════════════════════════════════ */}
        {/*  HERO — full-width open beach, cinematic                 */}
        {/* ═════════════════════════════════════════════════════════ */}
        <section className="relative flex h-screen flex-col items-center justify-end overflow-hidden">
          {/* Sky */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#B8D8F0] via-[#D0E8F8] to-[#E0EEF5]" />
          {/* Sun glow — right side, low */}
          <div className="absolute top-[15%] right-[15%] h-40 w-40 rounded-full bg-[#FFF0D0]/40 blur-[60px]" />
          <div className="absolute top-[18%] right-[18%] h-20 w-20 rounded-full bg-[#FFF8E8]/50 blur-[25px]" />
          {/* Horizon ocean band */}
          <div className="absolute bottom-[22%] left-0 right-0 h-[12%] bg-gradient-to-b from-[#6AACCC]/20 via-[#5A9CC0]/15 to-transparent" />
          {/* Sand */}
          <div className="absolute bottom-0 left-0 right-0 h-[22%] bg-gradient-to-t from-[#F0E4D0] via-[#EEE0CC] to-[#E8DCCA]/50" />
          {/* Wave lines */}
          <svg viewBox="0 0 500 30" preserveAspectRatio="none" className="absolute bottom-[20%] left-0 w-full" style={{ animation: "azure-wave 6s ease-in-out infinite" }}>
            <path d="M0 15 Q50 8 100 15 Q150 22 200 15 Q250 8 300 15 Q350 22 400 15 Q450 8 500 15" stroke="#5A9CC0" strokeWidth="0.8" strokeOpacity="0.12" fill="none" />
            <path d="M0 20 Q60 14 120 20 Q180 26 240 20 Q300 14 360 20 Q420 26 500 20" stroke="#5A9CC0" strokeWidth="0.5" strokeOpacity="0.08" fill="none" />
          </svg>

          {/* Couple — off-center right, standing on sand, looking at ocean */}
          <motion.div
            className="absolute bottom-[18%] right-[20%] md:right-[28%]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            style={{ opacity: heroOpacity }}
          >
            <div style={{ animation: "azure-drift 8s ease-in-out infinite" }}>
              <svg viewBox="0 0 120 160" className="h-[140px] md:h-[180px]" fill="none">
                {/* Groom — dark suit, slightly behind */}
                <circle cx="42" cy="35" r="12" fill="#2A3A48" fillOpacity="0.50" />
                <path d="M28 145 L32 58 Q32 48 42 48 Q52 48 52 58 L56 145" fill="#2A3A48" fillOpacity="0.40" />
                {/* Suit detail */}
                <path d="M38 56 L42 50 L46 56" fill="#4A7A98" fillOpacity="0.15" />
                {/* Bride — white gown, wind-blown veil */}
                <circle cx="72" cy="35" r="12" fill="#7A6050" fillOpacity="0.35" />
                <path d="M56 145 L62 56 Q62 48 72 48 Q82 48 82 56 L95 145 Q72 135 56 145Z" fill="#FFFFFF" fillOpacity="0.55" />
                {/* Wind-blown veil — flowing right */}
                <path d="M72 28 Q95 22 105 40 Q98 32 88 30 Q80 28 72 30" fill="#FFFFFF" fillOpacity="0.20" />
                <path d="M72 26 Q90 18 100 32" stroke="#FFFFFF" strokeWidth="0.5" strokeOpacity="0.15" />
                {/* Dress wind flow */}
                <path d="M82 100 Q92 95 98 110 Q90 108 82 100" fill="#FFFFFF" fillOpacity="0.12" />
                {/* Bouquet */}
                <circle cx="62" cy="82" r="4" fill="#FFD0D0" fillOpacity="0.35" />
                <circle cx="62" cy="82" r="2" fill="#FFFFFF" fillOpacity="0.30" />
                {/* Hand holding */}
                <path d="M52 75 L62 75" stroke="#7A6050" strokeWidth="1" strokeOpacity="0.15" />
              </svg>
            </div>
          </motion.div>

          {/* Minimal floral — left side, loose, not framing */}
          <div className="absolute bottom-[20%] left-[8%] md:left-[15%]" style={{ animation: "azure-drift 7s ease-in-out 1s infinite" }}>
            <svg viewBox="0 0 60 80" className="h-16 w-auto opacity-30" fill="none">
              <circle cx="30" cy="20" r="8" fill="#FFFFFF" fillOpacity="0.55" />
              <circle cx="30" cy="20" r="4" fill="#FFD8D0" fillOpacity="0.35" />
              <circle cx="20" cy="28" r="5" fill="#FFE8E0" fillOpacity="0.35" />
              <circle cx="40" cy="28" r="5" fill="#FFFFFF" fillOpacity="0.40" />
              <path d="M15 30 Q10 24 18 20 Q20 26 15 30Z" fill="#8BC4A0" fillOpacity="0.25" />
              <path d="M45 30 Q50 24 42 20 Q40 26 45 30Z" fill="#8BC4A0" fillOpacity="0.25" />
              <path d="M28 35 L30 70" stroke="#8BC4A0" strokeWidth="0.6" strokeOpacity="0.18" />
              <path d="M32 35 L34 65" stroke="#8BC4A0" strokeWidth="0.5" strokeOpacity="0.12" />
            </svg>
          </div>

          {/* Text — bottom left, minimal */}
          <motion.div
            className="relative z-10 mb-[8%] mr-auto ml-[6%] text-left md:ml-[12%]"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ opacity: heroOpacity }}
          >
            <p className="text-[9px] uppercase tracking-[0.5em] text-[#4A7A98]/50" style={{ fontFamily: "var(--font-montserrat)" }}>
              A Seaside Celebration
            </p>
            <h1 className="azure-shimmer mt-2 inline-block text-5xl leading-tight md:text-7xl" style={{ fontFamily: "var(--font-great-vibes)" }}>
              James & Rose
            </h1>
            <div className="mt-2 flex items-center gap-3">
              <div className="h-px w-12 bg-[#4A90B8]/20" />
              <p className="text-xs tracking-[0.1em] text-[#2A4A5A]/45" style={{ fontFamily: "var(--font-cormorant)" }}>October 8, 2026</p>
            </div>
            <p className="mt-1 text-[9px] tracking-[0.08em] text-[#4A7A98]/35" style={{ fontFamily: "var(--font-montserrat)" }}>
              Sunset Beach · Malibu
            </p>
          </motion.div>
        </section>

        {/* ═════════════════════════════════════════════════════════ */}
        {/*  BLESSING — full-width, airy                             */}
        {/* ═════════════════════════════════════════════════════════ */}
        <motion.section className="px-6 py-28 md:py-36" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
          <div className="mx-auto max-w-xl text-center">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xl italic leading-[2.2] text-[#2A4A5A]/40 md:text-2xl" style={{ fontFamily: "var(--font-cormorant)" }}>
              &ldquo;God is Love. Whoever lives in love lives in God, and God in them.&rdquo;
            </motion.p>
            <p className="mt-6 text-[10px] uppercase tracking-[0.25em] text-[#4A90B8]/35" style={{ fontFamily: "var(--font-montserrat)" }}>1 John 4:16</p>
          </div>
        </motion.section>

        {/* ═════════════════════════════════════════════════════════ */}
        {/*  LOVE STORY — horizontal split layout                    */}
        {/* ═════════════════════════════════════════════════════════ */}
        <motion.section className="px-6 py-20 md:py-28" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="mx-auto grid max-w-5xl items-center gap-16 md:grid-cols-2">
            {/* Left — decorative */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex justify-center">
              <div className="relative h-64 w-48 rounded-[24px] bg-gradient-to-b from-[#C8E0F0] to-[#D8ECF8] shadow-[0_8px_30px_rgba(74,120,160,0.08)]">
                <div className="absolute inset-3 rounded-[18px] border border-[#4A90B8]/10" />
                <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                  <Heart className="mb-4 h-6 w-6 text-[#4A90B8]/25" />
                  <p className="text-[9px] uppercase tracking-[0.3em] text-[#4A90B8]/40" style={{ fontFamily: "var(--font-montserrat)" }}>Est. 2023</p>
                  <p className="mt-3 text-lg text-[#2A4A5A]/50" style={{ fontFamily: "var(--font-great-vibes)" }}>Our Story</p>
                </div>
              </div>
            </motion.div>
            {/* Right — text */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#4A90B8]/40" style={{ fontFamily: "var(--font-montserrat)" }}>How We Met</p>
              <div className="mt-2 h-px w-12 bg-[#4A90B8]/15" />
              <p className="mt-6 text-base leading-[2.2] text-[#2A4A5A]/45 md:text-lg" style={{ fontFamily: "var(--font-cormorant)" }}>
                We found each other on a quiet beach at sunset. Bare feet in the warm sand,
                the sound of waves, and a conversation that never ended. Three years later,
                we return to the shore where it all began.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* ═════════════════════════════════════════════════════════ */}
        {/*  EVENTS — vertical timeline, left-aligned, minimal       */}
        {/* ═════════════════════════════════════════════════════════ */}
        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-2xl">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-16">
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#4A90B8]/40" style={{ fontFamily: "var(--font-montserrat)" }}>The Day</p>
              <h2 className="azure-shimmer mt-2 inline-block text-3xl md:text-4xl" style={{ fontFamily: "var(--font-great-vibes)" }}>Order of Events</h2>
            </motion.div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute top-0 left-4 h-full w-px bg-gradient-to-b from-[#4A90B8]/15 via-[#4A90B8]/10 to-transparent" />

              {[
                { time: "4:00 PM", title: "Ceremony", desc: "Sacred vows exchanged by the ocean, beneath an open sky.", icon: "✦" },
                { time: "4:30 PM", title: "Ring Exchange", desc: "Two rings, one promise — sealed with love and the sound of waves.", icon: "○" },
                { time: "6:00 PM", title: "Reception", desc: "Dinner, laughter, and the golden glow of a seaside sunset.", icon: "◇" },
                { time: "7:30 PM", title: "Cake & Toast", desc: "A three-tier coastal cake and champagne under the first stars.", icon: "△" },
              ].map((event, i) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative mb-16 pl-14 last:mb-0"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[9px] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-[#4A90B8]/15 bg-[#F0F6FA] text-[9px] text-[#4A90B8]/40">
                    {event.icon}
                  </div>
                  {/* Time */}
                  <p className="text-[10px] font-medium tracking-[0.1em] text-[#4A90B8]/50" style={{ fontFamily: "var(--font-montserrat)" }}>{event.time}</p>
                  {/* Title */}
                  <h3 className="mt-1 text-2xl text-[#2A4A5A]/70" style={{ fontFamily: "var(--font-great-vibes)" }}>{event.title}</h3>
                  {/* Description */}
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#2A4A5A]/35" style={{ fontFamily: "var(--font-cormorant)" }}>{event.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════ */}
        {/*  SPECIAL MOMENTS — horizontal row, icons only             */}
        {/* ═════════════════════════════════════════════════════════ */}
        <motion.section className="px-6 py-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="mx-auto max-w-3xl">
            <div className="flex items-start justify-between gap-4 md:gap-8">
              {[
                { label: "Ring Bearer", sub: "Little Noah" },
                { label: "Flower Girl", sub: "Sweet Emma" },
                { label: "First Dance", sub: "By the waves" },
                { label: "Wine Toast", sub: "Sunset hour" },
              ].map((m, i) => (
                <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} className="flex flex-1 flex-col items-center text-center">
                  <div className="mb-3 h-px w-full bg-gradient-to-r from-transparent via-[#4A90B8]/10 to-transparent" />
                  <p className="text-[10px] font-medium text-[#2A4A5A]/50" style={{ fontFamily: "var(--font-montserrat)" }}>{m.label}</p>
                  <p className="mt-0.5 text-[9px] italic text-[#4A90B8]/40" style={{ fontFamily: "var(--font-cormorant)" }}>{m.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ═════════════════════════════════════════════════════════ */}
        {/*  VENUE — large immersive section                          */}
        {/* ═════════════════════════════════════════════════════════ */}
        <motion.section className="relative overflow-hidden px-6 py-28 md:py-36" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          {/* Ocean gradient bg */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#F0F6FA] via-[#D8ECF8] to-[#C0D8EA]" />
          {/* Wave */}
          <svg viewBox="0 0 500 20" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full" style={{ animation: "azure-wave 8s ease-in-out infinite" }}>
            <path d="M0 10 Q60 4 120 10 Q180 16 240 10 Q300 4 360 10 Q420 16 500 10 L500 20 L0 20Z" fill="#F0F6FA" fillOpacity="0.5" />
          </svg>

          <div className="relative mx-auto max-w-lg text-center">
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#4A90B8]/45" style={{ fontFamily: "var(--font-montserrat)" }}>The Venue</p>
            <h2 className="mt-3 text-3xl text-[#2A4A5A]/65 md:text-4xl" style={{ fontFamily: "var(--font-great-vibes)" }}>Sunset Beach</h2>
            <div className="mx-auto mt-3 h-px w-16 bg-[#4A90B8]/15" />
            <p className="mt-6 text-base leading-relaxed text-[#2A4A5A]/40" style={{ fontFamily: "var(--font-cormorant)" }}>
              Golden sand, endless blue, and a sky painted just for us.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/40 px-5 py-2 backdrop-blur-sm">
              <MapPin className="h-3.5 w-3.5 text-[#4A90B8]/45" />
              <span className="text-xs text-[#2A4A5A]/45" style={{ fontFamily: "var(--font-montserrat)" }}>Malibu, California</span>
            </div>
          </div>
        </motion.section>

        {/* ═════════════════════════════════════════════════════════ */}
        {/*  RSVP — minimal                                           */}
        {/* ═════════════════════════════════════════════════════════ */}
        <motion.section className="px-6 py-28" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="mx-auto max-w-md text-center">
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#4A90B8]/40" style={{ fontFamily: "var(--font-montserrat)" }}>We hope to see you</p>
            <h2 className="mt-3 text-3xl text-[#2A4A5A]/60" style={{ fontFamily: "var(--font-great-vibes)" }}>Will you join us?</h2>
            <div className="mx-auto mt-3 h-px w-12 bg-[#4A90B8]/15" />
            <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-10">
              <Button size="lg" className="gap-2 bg-[#4A90B8] px-12 text-base text-white hover:bg-[#3A80A8]">
                <Heart className="h-4 w-4" /> RSVP
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {/* ═════════════════════════════════════════════════════════ */}
        {/*  CLOSING                                                  */}
        {/* ═════════════════════════════════════════════════════════ */}
        <section className="px-6 pb-16 pt-8">
          <div className="mx-auto max-w-md text-center">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#4A90B8]/10 to-transparent" />
            <div className="py-10">
              <h3 className="azure-shimmer inline-block text-2xl" style={{ fontFamily: "var(--font-great-vibes)" }}>James & Rose</h3>
              <p className="mt-1 text-[10px] text-[#4A90B8]/35" style={{ fontFamily: "var(--font-montserrat)" }}>October 8, 2026</p>
            </div>
            <p className="text-[9px] text-[#4A90B8]/20" style={{ fontFamily: "var(--font-montserrat)" }}>{platform.watermarkText}</p>
          </div>
        </section>

        {/* Back */}
        <Link href="/templates/azure-vows" className="fixed top-5 left-5 z-[101] flex items-center gap-1.5 rounded-full bg-white/60 px-4 py-2 text-xs font-medium text-[#2A4A5A]/55 shadow-sm backdrop-blur-md transition-all hover:bg-white/85 hover:text-[#2A4A5A]">
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </Link>
      </div>
    </>
  );
}
