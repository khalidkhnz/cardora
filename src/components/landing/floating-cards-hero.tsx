"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/animated-invite/shared/magnetic-button";

/* ================================================================== */
/*  5 real-looking card designs                                       */
/* ================================================================== */

function WeddingElegance() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-[#fdf8f0] to-[#f5ead6] p-8 text-center">
      {/* Ornamental top */}
      <div className="mb-2 text-[#c9a96e] opacity-60">✦ ✦ ✦</div>
      <p
        className="text-[10px] uppercase tracking-[0.3em] text-[#9a8560]"
        style={{ fontFamily: "var(--font-montserrat)" }}
      >
        Together with their families
      </p>
      <h3
        className="mt-3 text-2xl leading-tight text-[#3d3427]"
        style={{ fontFamily: "var(--font-great-vibes)" }}
      >
        Aarav & Priya
      </h3>
      <div className="my-3 h-px w-16 bg-gradient-to-r from-transparent via-[#c9a96e]/50 to-transparent" />
      <p
        className="text-[9px] uppercase tracking-[0.2em] text-[#9a8560]"
        style={{ fontFamily: "var(--font-montserrat)" }}
      >
        Request the pleasure of your company
      </p>
      <p
        className="mt-3 text-sm font-light text-[#5a4d3a]"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        Saturday, the Fifteenth of June
      </p>
      <p
        className="text-xs text-[#9a8560]"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        Two Thousand Twenty Six
      </p>
      {/* Decorative bottom */}
      <div className="mt-4 flex items-center gap-2 text-[#c9a96e] opacity-40">
        <div className="h-px w-8 bg-[#c9a96e]" />
        <span className="text-[8px]">❦</span>
        <div className="h-px w-8 bg-[#c9a96e]" />
      </div>
    </div>
  );
}

function BusinessModern() {
  return (
    <div className="flex h-full w-full flex-col justify-between rounded-2xl bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-7">
      {/* Top */}
      <div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/20" />
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-400"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            TechNova
          </span>
        </div>
      </div>
      {/* Bottom */}
      <div>
        <h3
          className="text-lg font-bold text-white"
          style={{ fontFamily: "var(--font-raleway)" }}
        >
          Aman Gupta
        </h3>
        <p
          className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.15em] text-cyan-400/70"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Senior Product Designer
        </p>
        <div className="mt-3 space-y-1">
          <p className="text-[9px] text-slate-400">aman@technova.com</p>
          <p className="text-[9px] text-slate-400">+1 (647) 555-0123</p>
        </div>
      </div>
    </div>
  );
}

function WeddingRoyal() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#1a0a2e] to-[#2d1654] p-8 text-center">
      {/* Corner accents */}
      <div className="absolute top-3 left-3 h-8 w-8 border-t-2 border-l-2 border-amber-400/30 rounded-tl-sm" />
      <div className="absolute right-3 bottom-3 h-8 w-8 border-r-2 border-b-2 border-amber-400/30 rounded-br-sm" />

      <p
        className="text-[9px] uppercase tracking-[0.25em] text-amber-300/60"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        You are cordially invited
      </p>
      <h3
        className="mt-2 text-[26px] leading-tight text-amber-100"
        style={{ fontFamily: "var(--font-great-vibes)" }}
      >
        Rahul & Simran
      </h3>
      <div className="my-2 flex items-center gap-2">
        <div className="h-px w-10 bg-gradient-to-r from-transparent to-amber-400/40" />
        <span className="text-[10px] text-amber-400/50">⟡</span>
        <div className="h-px w-10 bg-gradient-to-l from-transparent to-amber-400/40" />
      </div>
      <p
        className="text-xs font-light text-purple-200/70"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        December 12, 2026
      </p>
      <p
        className="mt-1 text-[9px] text-purple-300/50"
        style={{ fontFamily: "var(--font-montserrat)" }}
      >
        The Grand Palace, Jaipur
      </p>
    </div>
  );
}

function BusinessMinimal() {
  return (
    <div className="flex h-full w-full flex-col justify-between rounded-2xl bg-white p-7 shadow-inner">
      <div>
        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#B8860B] to-[#D4A843] shadow-md shadow-[#B8860B]/20" />
      </div>
      <div>
        <h3
          className="text-lg font-semibold text-gray-900"
          style={{ fontFamily: "var(--font-raleway)" }}
        >
          Sara Chen
        </h3>
        <p
          className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[#B8860B]"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Creative Director
        </p>
        <div className="mt-3 h-px w-12 bg-gradient-to-r from-[#D4A843] to-transparent" />
        <div className="mt-2 space-y-0.5">
          <p className="text-[9px] text-gray-400">sara@designhaus.co</p>
          <p className="text-[9px] text-gray-400">designhaus.co</p>
        </div>
      </div>
    </div>
  );
}

function WeddingFloral() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#fef7f0] to-[#fce4ec] p-8 text-center">
      {/* Decorative flower hint corners */}
      <div className="absolute top-2 right-2 text-lg text-rose-300/30">✿</div>
      <div className="absolute bottom-2 left-2 text-lg text-rose-300/30">✿</div>

      <p
        className="text-[9px] uppercase tracking-[0.25em] text-rose-400/80"
        style={{ fontFamily: "var(--font-montserrat)" }}
      >
        Save the Date
      </p>
      <h3
        className="mt-2 text-[26px] leading-tight text-rose-800"
        style={{ fontFamily: "var(--font-dancing-script)" }}
      >
        Arjun & Meera
      </h3>
      <div className="my-2 flex items-center gap-2">
        <div className="h-px w-6 bg-rose-300/50" />
        <span className="text-xs text-rose-400/60">♥</span>
        <div className="h-px w-6 bg-rose-300/50" />
      </div>
      <p
        className="text-sm font-light text-rose-700/70"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        March 22, 2026
      </p>
      <p
        className="mt-1 text-[9px] text-rose-500/50"
        style={{ fontFamily: "var(--font-montserrat)" }}
      >
        Garden Estate, Toronto
      </p>
    </div>
  );
}

/* ================================================================== */
/*  Card configs — position, depth, size                              */
/* ================================================================== */

const SHOWCASE_CARDS = [
  { id: 0, Component: WeddingElegance, title: "Wedding Invitation" },
  { id: 1, Component: BusinessModern,  title: "Business Card" },
  { id: 2, Component: WeddingRoyal,    title: "Royal Invitation" },
  { id: 3, Component: BusinessMinimal, title: "Minimal Business" },
  { id: 4, Component: WeddingFloral,   title: "Floral Save-the-Date" },
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
            background: "radial-gradient(ellipse, rgba(184,134,11,0.10) 0%, rgba(212,168,67,0.05) 40%, transparent 70%)",
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
                y: pos.y,
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
              }}
              onClick={() => handleCardClick(card.id)}
              onHoverStart={() => setHoveredId(card.id)}
              onHoverEnd={() => setHoveredId(null)}
              whileHover={
                isFocused
                  ? { y: -8, transition: { type: "spring", stiffness: 200, damping: 15 } }
                  : undefined
              }
            >
              <div
                className={`h-full w-full overflow-hidden rounded-2xl transition-shadow duration-500 ${
                  isFocused
                    ? "shadow-[0_30px_80px_-10px_rgba(184,134,11,0.25)]"
                    : "shadow-[0_12px_40px_-8px_rgba(0,0,0,0.15)]"
                } ${isHovered ? "ring-2 ring-white/20" : ""}`}
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
                    className="mt-4 text-center text-xs font-medium text-muted-foreground"
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
      <div className="mt-6 flex items-center gap-2">
        {SHOWCASE_CARDS.map((card) => (
          <button
            key={card.id}
            onClick={() => setActiveIndex(card.id)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              card.id === activeIndex
                ? "w-6 bg-[#B8860B]"
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
              className="min-w-[200px] border-[#B8860B]/30 text-base text-[#1A1A1A] hover:bg-[#B8860B]/8"
            >
              Sign In
            </Button>
          </Link>
        </MagneticButton>
      </motion.div>
    </section>
  );
}
