"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RsvpModal } from "@/components/rsvp/rsvp-modal";
import { Share2, MapPin, Calendar, Heart, Download } from "lucide-react";
import { toast } from "sonner";
import { MusicToggleButton } from "../../shared/music-toggle-button";
import { CardoraWatermark } from "../../shared/cardora-watermark";
import { useMusicPlayer } from "@/hooks/use-music-player";
import { useCountdown } from "@/hooks/use-countdown";
import type { TemplateProps } from "../../types";

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function formatWeddingDate(dateStr: string | null) {
  if (!dateStr) return "Date TBD";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/* -------------------------------------------------------------------------- */
/*  Decorative SVG Components                                                  */
/* -------------------------------------------------------------------------- */

function OliveBranchDivider({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "mx-auto my-8 h-10 w-64 text-olive-600"}
      style={{ color: "#6b7c3f" }}
    >
      {/* Left branch */}
      <path
        d="M60 25 Q100 25 140 25 Q150 25 160 25"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      {/* Left leaves */}
      <ellipse cx="80" cy="20" rx="8" ry="4" fill="currentColor" opacity="0.4" transform="rotate(-30 80 20)" />
      <ellipse cx="80" cy="30" rx="8" ry="4" fill="currentColor" opacity="0.35" transform="rotate(30 80 30)" />
      <ellipse cx="100" cy="18" rx="7" ry="3.5" fill="currentColor" opacity="0.35" transform="rotate(-25 100 18)" />
      <ellipse cx="100" cy="32" rx="7" ry="3.5" fill="currentColor" opacity="0.3" transform="rotate(25 100 32)" />
      <ellipse cx="120" cy="20" rx="6" ry="3" fill="currentColor" opacity="0.3" transform="rotate(-20 120 20)" />
      <ellipse cx="120" cy="30" rx="6" ry="3" fill="currentColor" opacity="0.25" transform="rotate(20 120 30)" />
      <ellipse cx="140" cy="22" rx="5" ry="2.5" fill="currentColor" opacity="0.25" transform="rotate(-15 140 22)" />

      {/* Right branch */}
      <path
        d="M340 25 Q300 25 260 25 Q250 25 240 25"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      {/* Right leaves */}
      <ellipse cx="320" cy="20" rx="8" ry="4" fill="currentColor" opacity="0.4" transform="rotate(30 320 20)" />
      <ellipse cx="320" cy="30" rx="8" ry="4" fill="currentColor" opacity="0.35" transform="rotate(-30 320 30)" />
      <ellipse cx="300" cy="18" rx="7" ry="3.5" fill="currentColor" opacity="0.35" transform="rotate(25 300 18)" />
      <ellipse cx="300" cy="32" rx="7" ry="3.5" fill="currentColor" opacity="0.3" transform="rotate(-25 300 32)" />
      <ellipse cx="280" cy="20" rx="6" ry="3" fill="currentColor" opacity="0.3" transform="rotate(20 280 20)" />
      <ellipse cx="280" cy="30" rx="6" ry="3" fill="currentColor" opacity="0.25" transform="rotate(-20 280 30)" />
      <ellipse cx="260" cy="22" rx="5" ry="2.5" fill="currentColor" opacity="0.25" transform="rotate(15 260 22)" />

      {/* Center ornament */}
      <circle cx="200" cy="25" r="5" fill="currentColor" opacity="0.2" />
      <circle cx="200" cy="25" r="3" fill="currentColor" opacity="0.35" />
      {/* Olives */}
      <ellipse cx="155" cy="25" rx="3" ry="4" fill="currentColor" opacity="0.4" />
      <ellipse cx="245" cy="25" rx="3" ry="4" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function WatercolorBorder() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {/* Top-left watercolor wash */}
      <div
        className="absolute -top-20 -left-20 h-72 w-72 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #c4a35a 0%, transparent 70%)" }}
      />
      {/* Top-right watercolor wash */}
      <div
        className="absolute -top-16 -right-16 h-64 w-64 rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, #8b9a5b 0%, transparent 70%)" }}
      />
      {/* Bottom-left watercolor wash */}
      <div
        className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, #8b9a5b 0%, transparent 70%)" }}
      />
      {/* Bottom-right watercolor wash */}
      <div
        className="absolute -right-20 -bottom-20 h-72 w-72 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #c4a35a 0%, transparent 70%)" }}
      />
      {/* Center subtle wash */}
      <div
        className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.08] blur-3xl"
        style={{ background: "radial-gradient(circle, #d4a574 0%, transparent 70%)" }}
      />
    </div>
  );
}

function CornerOrnament({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const transforms: Record<string, string> = {
    "top-left": "",
    "top-right": "scale(-1, 1)",
    "bottom-left": "scale(1, -1)",
    "bottom-right": "scale(-1, -1)",
  };

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-20 w-20 sm:h-28 sm:w-28"
      style={{ transform: transforms[position], color: "#8b7a3e" }}
    >
      {/* Decorative scroll */}
      <path
        d="M5 5 Q5 30 20 40 Q10 35 10 20 Q12 30 25 35 Q15 30 15 18"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M5 5 Q30 5 40 20 Q35 10 20 10 Q30 12 35 25 Q30 15 18 15"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity="0.4"
      />
      {/* Dot accent */}
      <circle cx="8" cy="8" r="2" fill="currentColor" opacity="0.3" />
      {/* Small leaf */}
      <ellipse cx="30" cy="10" rx="6" ry="2.5" fill="currentColor" opacity="0.15" transform="rotate(-20 30 10)" />
      <ellipse cx="10" cy="30" rx="2.5" ry="6" fill="currentColor" opacity="0.15" transform="rotate(-20 10 30)" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section Animation Variants                                                 */
/* -------------------------------------------------------------------------- */

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: { staggerChildren: 0.15 },
  },
};

/* -------------------------------------------------------------------------- */
/*  Main Template Component                                                    */
/* -------------------------------------------------------------------------- */

export default function MediterraneanEleganceTemplate({ invite, isDemo }: TemplateProps) {
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const { isPlaying, toggle } = useMusicPlayer(invite.musicUrl);
  const countdown = useCountdown(invite.weddingDate);

  async function handleShare() {
    const url = `${window.location.origin}/wedding/${invite.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${invite.groomName} & ${invite.brideName} — Wedding`,
          url,
        });
        return;
      } catch {
        /* fall through to clipboard */
      }
    }
    await navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-amber-50/30 via-stone-50 to-amber-50/30">
      {/* Watercolor background washes */}
      <WatercolorBorder />

      {/* Music toggle */}
      {invite.musicUrl && (
        <MusicToggleButton
          isPlaying={isPlaying}
          onToggle={toggle}
          className="fixed top-4 right-4 z-50 rounded-full border border-amber-200/50 bg-stone-50/80 p-3 shadow-lg backdrop-blur-sm transition-colors hover:bg-stone-100/80"
        />
      )}

      {/* Demo banner */}
      {isDemo && (
        <div className="relative z-10 bg-amber-600 py-2 text-center text-sm font-medium text-amber-50">
          This is a demo preview. Complete payment to use your own details.
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-2xl px-4 py-12 sm:py-16">
        {/* ------------------------------------------------------------------ */}
        {/*  HERO SECTION                                                       */}
        {/* ------------------------------------------------------------------ */}
        <motion.section
          className="relative mb-16 text-center"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          {/* Corner ornaments */}
          <div className="pointer-events-none absolute -top-4 -left-4">
            <CornerOrnament position="top-left" />
          </div>
          <div className="pointer-events-none absolute -top-4 -right-4">
            <CornerOrnament position="top-right" />
          </div>

          {/* Watercolor frame card */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl border border-amber-200/40 bg-white/50 p-8 shadow-xl shadow-amber-900/5 backdrop-blur-sm sm:p-12"
          >
            {/* Inner decorative border */}
            <div className="absolute inset-3 rounded-2xl border border-amber-200/30 sm:inset-5" />

            <div className="relative">
              {/* Hero image */}
              {invite.heroImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                  className="mx-auto mb-8 h-56 w-56 overflow-hidden rounded-full shadow-xl sm:h-64 sm:w-64"
                  style={{
                    border: "3px solid rgba(180, 160, 100, 0.4)",
                    boxShadow: "0 0 40px rgba(180, 160, 100, 0.15)",
                  }}
                >
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${invite.heroImage})` }}
                  />
                </motion.div>
              )}

              {/* Subtitle */}
              <motion.p
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
                className="mb-4 text-sm tracking-[0.4em] font-light uppercase"
                style={{ color: "#8b7a3e" }}
              >
                Together with their families
              </motion.p>

              {/* Couple Names */}
              <motion.div variants={fadeInUp} transition={{ duration: 0.8 }}>
                <h1
                  className="font-serif text-5xl font-light leading-tight sm:text-6xl lg:text-7xl"
                  style={{ color: "#5a4f2e" }}
                >
                  {invite.groomName}
                </h1>

                {/* Elegant ampersand divider */}
                <div className="my-5 flex items-center justify-center gap-4">
                  <motion.div
                    className="h-px w-16 sm:w-24"
                    style={{ background: "linear-gradient(to right, transparent, #b4a064)" }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  />
                  <motion.span
                    className="font-serif text-3xl font-light italic"
                    style={{ color: "#8b7a3e" }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.5, type: "spring" }}
                  >
                    &
                  </motion.span>
                  <motion.div
                    className="h-px w-16 sm:w-24"
                    style={{ background: "linear-gradient(to left, transparent, #b4a064)" }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  />
                </div>

                <h1
                  className="font-serif text-5xl font-light leading-tight sm:text-6xl lg:text-7xl"
                  style={{ color: "#5a4f2e" }}
                >
                  {invite.brideName}
                </h1>
              </motion.div>

              {/* Invitation text */}
              <motion.p
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 font-serif text-lg italic"
                style={{ color: "#7a6e45" }}
              >
                Joyfully invite you to celebrate their union
              </motion.p>

              {/* Family names */}
              {(invite.groomFatherName ?? invite.brideFatherName) && (
                <motion.div
                  variants={fadeInUp}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-6 space-y-1 text-sm"
                  style={{ color: "#9a8e6a" }}
                >
                  {invite.groomFatherName && invite.groomMotherName && (
                    <p>
                      Son of {invite.groomFatherName} & {invite.groomMotherName}
                    </p>
                  )}
                  {invite.brideFatherName && invite.brideMotherName && (
                    <p>
                      Daughter of {invite.brideFatherName} & {invite.brideMotherName}
                    </p>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.section>

        {/* Olive branch divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <OliveBranchDivider />
        </motion.div>

        {/* ------------------------------------------------------------------ */}
        {/*  COUNTDOWN SECTION                                                  */}
        {/* ------------------------------------------------------------------ */}
        {invite.weddingDate && (
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="rounded-2xl border bg-white/40 p-8 text-center shadow-lg backdrop-blur-sm"
              style={{ borderColor: "rgba(180, 160, 100, 0.25)" }}
            >
              <h2 className="mb-6 font-serif text-2xl" style={{ color: "#5a4f2e" }}>
                Days Until We Say &ldquo;I Do&rdquo;
              </h2>
              <div className="grid grid-cols-4 gap-3 sm:gap-6">
                {[
                  { label: "Days", value: countdown.days },
                  { label: "Hours", value: countdown.hours },
                  { label: "Minutes", value: countdown.minutes },
                  { label: "Seconds", value: countdown.seconds },
                ].map((unit) => (
                  <motion.div
                    key={unit.label}
                    className="flex flex-col items-center rounded-xl p-3"
                    style={{ backgroundColor: "rgba(180, 160, 100, 0.08)" }}
                    whileInView={{ scale: [0.8, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                  >
                    <span
                      className="font-serif text-3xl font-semibold sm:text-4xl"
                      style={{ color: "#6b5c2e" }}
                    >
                      {String(unit.value).padStart(2, "0")}
                    </span>
                    <span
                      className="mt-1 text-xs tracking-wider uppercase"
                      style={{ color: "#9a8e6a" }}
                    >
                      {unit.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* ------------------------------------------------------------------ */}
        {/*  OUR STORY SECTION                                                  */}
        {/* ------------------------------------------------------------------ */}
        {invite.story && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <OliveBranchDivider />
            </motion.div>

            <motion.section
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div
                className="relative rounded-2xl border bg-white/40 p-8 text-center shadow-lg backdrop-blur-sm sm:p-10"
                style={{ borderColor: "rgba(180, 160, 100, 0.25)" }}
              >
                {/* Watercolor accent */}
                <div
                  className="absolute -top-8 left-1/2 h-16 w-48 -translate-x-1/2 rounded-full opacity-[0.12] blur-2xl"
                  style={{ background: "#8b9a5b" }}
                />

                <motion.h2
                  className="mb-2 font-serif text-3xl"
                  style={{ color: "#5a4f2e" }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Our Story
                </motion.h2>

                {/* Small olive ornament */}
                <svg viewBox="0 0 60 20" className="mx-auto mb-6 h-4 w-12" style={{ color: "#8b7a3e" }}>
                  <ellipse cx="20" cy="10" rx="6" ry="3" fill="currentColor" opacity="0.3" transform="rotate(-20 20 10)" />
                  <ellipse cx="40" cy="10" rx="6" ry="3" fill="currentColor" opacity="0.3" transform="rotate(20 40 10)" />
                  <circle cx="30" cy="10" r="2" fill="currentColor" opacity="0.4" />
                </svg>

                <motion.p
                  className="leading-relaxed"
                  style={{ color: "#6b5c2e" }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  {invite.story}
                </motion.p>
              </div>
            </motion.section>
          </>
        )}

        {/* Couple message */}
        {invite.coupleMessage && (
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="rounded-2xl border p-8 text-center backdrop-blur-sm sm:p-10"
              style={{
                borderColor: "rgba(180, 160, 100, 0.2)",
                backgroundColor: "rgba(180, 160, 100, 0.06)",
              }}
            >
              <p
                className="font-serif text-lg leading-relaxed italic"
                style={{ color: "#6b5c2e" }}
              >
                &ldquo;{invite.coupleMessage}&rdquo;
              </p>
            </div>
          </motion.section>
        )}

        {/* ------------------------------------------------------------------ */}
        {/*  DATE & VENUE SECTION                                               */}
        {/* ------------------------------------------------------------------ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <OliveBranchDivider />
        </motion.div>

        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="rounded-2xl border bg-white/40 p-8 text-center shadow-lg backdrop-blur-sm sm:p-10"
            style={{ borderColor: "rgba(180, 160, 100, 0.25)" }}
          >
            <h2 className="mb-8 font-serif text-3xl" style={{ color: "#5a4f2e" }}>
              Ceremony Details
            </h2>

            <div className="space-y-8">
              {/* Date */}
              <motion.div
                className="flex flex-col items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ backgroundColor: "rgba(180, 160, 100, 0.15)" }}
                >
                  <Calendar className="h-6 w-6" style={{ color: "#8b7a3e" }} />
                </div>
                <div>
                  <p className="text-xl font-semibold" style={{ color: "#5a4f2e" }}>
                    {formatWeddingDate(invite.weddingDate)}
                  </p>
                  {invite.weddingTime && (
                    <p className="mt-1 text-sm" style={{ color: "#8b7a3e" }}>
                      at {invite.weddingTime}
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Decorative divider */}
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-10" style={{ backgroundColor: "rgba(180, 160, 100, 0.3)" }} />
                <svg viewBox="0 0 20 20" className="h-4 w-4" style={{ color: "#8b7a3e" }}>
                  <path d="M10 2 L12 8 L18 10 L12 12 L10 18 L8 12 L2 10 L8 8 Z" fill="currentColor" opacity="0.4" />
                </svg>
                <div className="h-px w-10" style={{ backgroundColor: "rgba(180, 160, 100, 0.3)" }} />
              </div>

              {/* Venue */}
              {invite.venue && (
                <motion.div
                  className="flex flex-col items-center gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ backgroundColor: "rgba(139, 154, 91, 0.15)" }}
                  >
                    <MapPin className="h-6 w-6" style={{ color: "#6b7c3f" }} />
                  </div>
                  <div>
                    <p className="text-xl font-semibold" style={{ color: "#5a4f2e" }}>
                      {invite.venue}
                    </p>
                    {invite.venueAddress && (
                      <p className="mt-1 text-sm" style={{ color: "#9a8e6a" }}>
                        {invite.venueAddress}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Reception */}
              {invite.receptionDate && (
                <>
                  <div className="flex items-center justify-center gap-3">
                    <div className="h-px w-10" style={{ backgroundColor: "rgba(180, 160, 100, 0.3)" }} />
                    <svg viewBox="0 0 20 20" className="h-4 w-4" style={{ color: "#8b7a3e" }}>
                      <path d="M10 2 L12 8 L18 10 L12 12 L10 18 L8 12 L2 10 L8 8 Z" fill="currentColor" opacity="0.4" />
                    </svg>
                    <div className="h-px w-10" style={{ backgroundColor: "rgba(180, 160, 100, 0.3)" }} />
                  </div>
                  <motion.div
                    className="flex flex-col items-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <p
                      className="text-sm font-medium tracking-wider uppercase"
                      style={{ color: "#8b7a3e" }}
                    >
                      Reception
                    </p>
                    <p className="text-lg" style={{ color: "#5a4f2e" }}>
                      {formatWeddingDate(invite.receptionDate)}
                    </p>
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </motion.section>

        {/* ------------------------------------------------------------------ */}
        {/*  EVENTS SECTION                                                     */}
        {/* ------------------------------------------------------------------ */}
        {invite.events && invite.events.length > 0 && (
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="mb-8 text-center font-serif text-3xl" style={{ color: "#5a4f2e" }}>
              Wedding Events
            </h2>
            <div className="space-y-4">
              {invite.events.map((event, index) => (
                <motion.div
                  key={index}
                  className="rounded-xl border bg-white/40 p-6 text-center backdrop-blur-sm"
                  style={{ borderColor: "rgba(180, 160, 100, 0.2)" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <h3 className="font-serif text-xl" style={{ color: "#5a4f2e" }}>
                    {event.name}
                  </h3>
                  <p className="mt-2 text-sm" style={{ color: "#8b7a3e" }}>
                    {event.date} {event.time && `at ${event.time}`}
                  </p>
                  {event.venue && (
                    <p className="mt-1 text-sm" style={{ color: "#9a8e6a" }}>
                      {event.venue}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ------------------------------------------------------------------ */}
        {/*  GALLERY SECTION                                                    */}
        {/* ------------------------------------------------------------------ */}
        {invite.galleryImages.length > 0 && (
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="mb-8 text-center font-serif text-3xl" style={{ color: "#5a4f2e" }}>
              Moments Together
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {invite.galleryImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  className="aspect-square overflow-hidden rounded-xl shadow-md"
                  style={{ border: "1px solid rgba(180, 160, 100, 0.2)" }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${img})` }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ------------------------------------------------------------------ */}
        {/*  RSVP SECTION                                                       */}
        {/* ------------------------------------------------------------------ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <OliveBranchDivider />
        </motion.div>

        <motion.section
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="mb-4 font-serif text-3xl" style={{ color: "#5a4f2e" }}>
            Kindly Respond
          </h2>
          <p className="mb-8" style={{ color: "#9a8e6a" }}>
            We would be delighted to have you share in our celebration.
          </p>

          <div className="flex flex-col items-center gap-4">
            <Button
              size="lg"
              className="w-full max-w-xs text-white shadow-lg"
              style={{ backgroundColor: "#8b7a3e", boxShadow: "0 8px 20px rgba(139, 122, 62, 0.2)" }}
              onClick={() => setRsvpOpen(true)}
            >
              <Heart className="mr-2 h-4 w-4" />
              RSVP Now
            </Button>

            <div className="flex w-full max-w-xs gap-3">
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                style={{ borderColor: "rgba(180, 160, 100, 0.4)", color: "#8b7a3e" }}
                onClick={() => void handleShare()}
              >
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
              <Button
                variant="outline"
                size="lg"
                style={{ borderColor: "rgba(180, 160, 100, 0.4)", color: "#8b7a3e" }}
                onClick={() => {
                  void fetch("/api/download/invite", { method: "POST" }).then(
                    (r) => {
                      if (r.ok) toast.success("Invite saved to gallery");
                      else toast.error("Unlock your invite to download");
                    },
                  );
                }}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.section>

        {/* ------------------------------------------------------------------ */}
        {/*  FOOTER                                                             */}
        {/* ------------------------------------------------------------------ */}
        <motion.footer
          className="relative text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Corner ornaments */}
          <div className="pointer-events-none absolute -bottom-8 -left-4">
            <CornerOrnament position="bottom-left" />
          </div>
          <div className="pointer-events-none absolute -right-4 -bottom-8">
            <CornerOrnament position="bottom-right" />
          </div>

          <OliveBranchDivider className="mx-auto mb-4 h-8 w-48" />
          <p className="font-serif text-lg" style={{ color: "#5a4f2e" }}>
            {invite.groomName} & {invite.brideName}
          </p>
          <p className="mt-1 text-sm" style={{ color: "#8b7a3e" }}>
            {formatWeddingDate(invite.weddingDate)}
          </p>

          <CardoraWatermark className="mt-12 pb-8 text-center text-xs text-stone-400" />
        </motion.footer>
      </div>

      {/* RSVP Modal */}
      <RsvpModal open={rsvpOpen} onOpenChange={setRsvpOpen} inviteSlug={invite.slug} />
    </div>
  );
}
