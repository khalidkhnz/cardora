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
/*  Gold color constants                                                      */
/* -------------------------------------------------------------------------- */

const GOLD = "#DAA520";
const GOLD_LIGHT = "#F5D060";
const GOLD_DIM = "rgba(218,165,32,0.3)";

/* -------------------------------------------------------------------------- */
/*  Crown SVG Motif                                                           */
/* -------------------------------------------------------------------------- */

function CrownMotif({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 50"
      fill="none"
      className={className ?? "h-10 w-16"}
    >
      <path
        d="M5 45 L5 20 L20 30 L40 10 L60 30 L75 20 L75 45 Z"
        stroke={GOLD}
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="5" cy="18" r="3" fill={GOLD} opacity="0.6" />
      <circle cx="40" cy="8" r="3.5" fill={GOLD} opacity="0.8" />
      <circle cx="75" cy="18" r="3" fill={GOLD} opacity="0.6" />
      <line x1="8" y1="45" x2="72" y2="45" stroke={GOLD} strokeWidth="1" opacity="0.5" />
      <line x1="10" y1="48" x2="70" y2="48" stroke={GOLD} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Ornamental Gold Frame                                                     */
/* -------------------------------------------------------------------------- */

function OrnamentalFrame() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {/* Outer border */}
      <div
        className="absolute inset-3 rounded-lg border sm:inset-5"
        style={{ borderColor: GOLD_DIM }}
      />
      {/* Inner border */}
      <div
        className="absolute inset-5 rounded-lg border sm:inset-8"
        style={{ borderColor: "rgba(218,165,32,0.15)" }}
      />
      {/* Corner ornaments */}
      {(
        [
          { pos: "top-2 left-2 sm:top-4 sm:left-4", rotate: "0deg" },
          { pos: "top-2 right-2 sm:top-4 sm:right-4", rotate: "90deg" },
          { pos: "bottom-2 left-2 sm:bottom-4 sm:left-4", rotate: "270deg" },
          { pos: "bottom-2 right-2 sm:bottom-4 sm:right-4", rotate: "180deg" },
        ] as const
      ).map((corner) => (
        <motion.div
          key={corner.pos}
          className={`absolute ${corner.pos}`}
          style={{ transform: `rotate(${corner.rotate})` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path
              d="M2 2 L2 20 C2 20 8 18 12 12 C18 8 20 2 20 2 Z"
              stroke={GOLD}
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M4 4 L4 16 C4 16 8 14 10 10 C14 8 16 4 16 4"
              stroke={GOLD}
              strokeWidth="0.5"
              opacity="0.5"
            />
            <circle cx="3" cy="3" r="2" fill={GOLD} opacity="0.6" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Regal Section Divider                                                     */
/* -------------------------------------------------------------------------- */

function RegalDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="my-10 flex origin-center items-center justify-center gap-3"
    >
      <svg viewBox="0 0 60 12" className="h-3 w-14" fill={GOLD}>
        <path d="M0 6 L15 2 L20 6 L15 10 Z" opacity="0.3" />
        <path d="M10 6 L25 2 L30 6 L25 10 Z" opacity="0.5" />
      </svg>
      <svg viewBox="0 0 20 20" className="h-4 w-4" fill={GOLD}>
        <path d="M10 0 L12.5 7.5 L20 10 L12.5 12.5 L10 20 L7.5 12.5 L0 10 L7.5 7.5 Z" />
      </svg>
      <svg viewBox="0 0 60 12" className="h-3 w-14" fill={GOLD}>
        <path d="M60 6 L45 2 L40 6 L45 10 Z" opacity="0.3" />
        <path d="M50 6 L35 2 L30 6 L35 10 Z" opacity="0.5" />
      </svg>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Gold Sparkle Particles                                                    */
/* -------------------------------------------------------------------------- */

function GoldSparkles() {
  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 2 + Math.random() * 3,
            height: 2 + Math.random() * 3,
            background: `radial-gradient(circle, ${GOLD_LIGHT}, transparent)`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 2.5 + Math.random() * 2,
            delay: Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Royal Palace Template                                                     */
/* -------------------------------------------------------------------------- */

export default function RoyalPalaceTemplate({
  invite,
  isDemo,
}: TemplateProps) {
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
        /* fall through */
      }
    }
    await navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-purple-950 via-gray-900 to-purple-950 text-gray-100">
      {/* ---- Gold sparkle particles ---- */}
      <GoldSparkles />

      {/* ---- Ornamental frame ---- */}
      <OrnamentalFrame />

      {/* ---- Golden dot pattern overlay ---- */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]">
        <svg width="100%" height="100%">
          <pattern
            id="royal-dots"
            x="0"
            y="0"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="12" cy="12" r="1" fill={GOLD} />
          </pattern>
          <rect width="100%" height="100%" fill="url(#royal-dots)" />
        </svg>
      </div>

      {/* ---- Music toggle ---- */}
      {invite.musicUrl && (
        <MusicToggleButton
          isPlaying={isPlaying}
          onToggle={toggle}
          className="fixed right-4 top-4 z-50 rounded-full border border-amber-600/30 bg-gray-900/80 p-3 shadow-lg shadow-amber-900/20 backdrop-blur-sm transition-colors hover:bg-gray-800/90"
        />
      )}

      {/* ---- Demo Banner ---- */}
      {isDemo && (
        <div
          className="relative z-20 py-2 text-center text-sm font-medium"
          style={{
            background: `linear-gradient(90deg, ${GOLD_DIM}, ${GOLD}, ${GOLD_DIM})`,
            color: "#1a0a2e",
          }}
        >
          This is a demo preview. Complete payment to use your own details.
        </div>
      )}

      {/* ================================================================== */}
      {/*  HERO SECTION                                                      */}
      {/* ================================================================== */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-24">
        {/* Crown */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <CrownMotif className="mx-auto mb-8 h-12 w-20 sm:h-16 sm:w-28" />
        </motion.div>

        {/* Couple photo */}
        {invite.heroImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="mb-10 h-56 w-56 overflow-hidden rounded-full shadow-2xl sm:h-64 sm:w-64"
            style={{
              border: `3px solid ${GOLD}`,
              boxShadow: `0 0 40px rgba(218,165,32,0.2), 0 0 80px rgba(218,165,32,0.1)`,
            }}
          >
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${invite.heroImage})` }}
            />
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6 text-xs font-light uppercase tracking-[0.35em]"
          style={{ color: GOLD }}
        >
          Together with their families
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="text-center text-5xl font-bold tracking-wide sm:text-7xl"
          style={{
            color: GOLD_LIGHT,
            textShadow: `0 0 30px rgba(218,165,32,0.3), 0 2px 4px rgba(0,0,0,0.5)`,
          }}
        >
          {invite.groomName}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="my-5 flex items-center gap-5"
        >
          <div className="h-px w-16" style={{ backgroundColor: GOLD_DIM }} />
          <Heart
            className="h-6 w-6"
            style={{ color: GOLD }}
            fill="rgba(218,165,32,0.4)"
          />
          <div className="h-px w-16" style={{ backgroundColor: GOLD_DIM }} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85 }}
          className="text-center text-5xl font-bold tracking-wide sm:text-7xl"
          style={{
            color: GOLD_LIGHT,
            textShadow: `0 0 30px rgba(218,165,32,0.3), 0 2px 4px rgba(0,0,0,0.5)`,
          }}
        >
          {invite.brideName}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-8 text-sm font-light tracking-widest text-gray-400"
        >
          Request the honour of your presence
        </motion.p>

        {/* Glowing radial behind names */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(218,165,32,0.06) 0%, transparent 70%)`,
          }}
        />
      </section>

      {/* ================================================================== */}
      {/*  FAMILIES SECTION                                                  */}
      {/* ================================================================== */}
      {(invite.groomFatherName ??
        invite.groomMotherName ??
        invite.brideFatherName ??
        invite.brideMotherName) && (
        <section className="relative z-10 px-6 py-16">
          <RegalDivider />

          <div className="mx-auto max-w-lg">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-10 text-center text-xs font-light uppercase tracking-[0.3em]"
              style={{ color: GOLD }}
            >
              Esteemed Families
            </motion.p>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="rounded-lg border p-6 text-center"
                style={{
                  borderColor: GOLD_DIM,
                  background: "rgba(218,165,32,0.03)",
                }}
              >
                <CrownMotif className="mx-auto mb-3 h-6 w-10 opacity-50" />
                <p
                  className="mb-2 text-xs uppercase tracking-[0.15em]"
                  style={{ color: GOLD }}
                >
                  Groom&apos;s Parents
                </p>
                {invite.groomFatherName && (
                  <p className="text-lg font-light text-gray-300">
                    {invite.groomFatherName}
                  </p>
                )}
                {invite.groomMotherName && (
                  <p className="text-lg font-light text-gray-300">
                    {invite.groomMotherName}
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="rounded-lg border p-6 text-center"
                style={{
                  borderColor: GOLD_DIM,
                  background: "rgba(218,165,32,0.03)",
                }}
              >
                <CrownMotif className="mx-auto mb-3 h-6 w-10 opacity-50" />
                <p
                  className="mb-2 text-xs uppercase tracking-[0.15em]"
                  style={{ color: GOLD }}
                >
                  Bride&apos;s Parents
                </p>
                {invite.brideFatherName && (
                  <p className="text-lg font-light text-gray-300">
                    {invite.brideFatherName}
                  </p>
                )}
                {invite.brideMotherName && (
                  <p className="text-lg font-light text-gray-300">
                    {invite.brideMotherName}
                  </p>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ================================================================== */}
      {/*  STORY SECTION                                                     */}
      {/* ================================================================== */}
      {invite.story && (
        <section className="relative z-10 px-6 py-20">
          <RegalDivider />

          <div className="mx-auto max-w-lg text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-8 text-xs font-light uppercase tracking-[0.3em]"
              style={{ color: GOLD }}
            >
              Our Royal Tale
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative rounded-lg border p-8 sm:p-10"
              style={{
                borderColor: GOLD_DIM,
                background: "rgba(218,165,32,0.02)",
              }}
            >
              <p className="text-base font-light leading-relaxed text-gray-300">
                {invite.story}
              </p>

              {invite.coupleMessage && (
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="mt-6 border-t pt-6 text-sm italic text-gray-400"
                  style={{ borderColor: GOLD_DIM }}
                >
                  &ldquo;{invite.coupleMessage}&rdquo;
                </motion.p>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* ================================================================== */}
      {/*  DATE & VENUE SECTION                                              */}
      {/* ================================================================== */}
      <section className="relative z-10 px-6 py-20">
        <RegalDivider />

        <div className="mx-auto max-w-lg">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center text-xs font-light uppercase tracking-[0.3em]"
            style={{ color: GOLD }}
          >
            The Grand Celebration
          </motion.p>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-lg border p-6 text-center"
              style={{
                borderColor: GOLD_DIM,
                background: "rgba(218,165,32,0.03)",
              }}
            >
              <Calendar className="mx-auto mb-3 h-5 w-5" style={{ color: GOLD }} />
              <p
                className="text-lg font-semibold"
                style={{
                  color: GOLD_LIGHT,
                  textShadow: "0 0 10px rgba(218,165,32,0.2)",
                }}
              >
                {formatWeddingDate(invite.weddingDate)}
              </p>
              {invite.weddingTime && (
                <p className="mt-1 text-sm text-gray-400">{invite.weddingTime}</p>
              )}
            </motion.div>

            {invite.venue && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="rounded-lg border p-6 text-center"
                style={{
                  borderColor: GOLD_DIM,
                  background: "rgba(218,165,32,0.03)",
                }}
              >
                <MapPin className="mx-auto mb-3 h-5 w-5" style={{ color: GOLD }} />
                <p
                  className="text-lg font-semibold"
                  style={{
                    color: GOLD_LIGHT,
                    textShadow: "0 0 10px rgba(218,165,32,0.2)",
                  }}
                >
                  {invite.venue}
                </p>
                {invite.venueAddress && (
                  <p className="mt-1 text-sm text-gray-400">
                    {invite.venueAddress}
                  </p>
                )}
              </motion.div>
            )}
          </div>

          {/* Reception */}
          {invite.receptionDate && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mt-8 text-center"
            >
              <p
                className="mb-1 text-xs uppercase tracking-[0.15em]"
                style={{ color: GOLD }}
              >
                Reception
              </p>
              <p className="text-base text-gray-300">
                {formatWeddingDate(invite.receptionDate)}
              </p>
            </motion.div>
          )}

          {/* Countdown in gold-bordered boxes */}
          {invite.weddingDate && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-16"
            >
              <p
                className="mb-8 text-center text-xs font-light uppercase tracking-[0.3em]"
                style={{ color: GOLD }}
              >
                The Royal Countdown
              </p>
              <div className="grid grid-cols-4 gap-3 text-center">
                {(
                  [
                    { label: "Days", value: countdown.days },
                    { label: "Hours", value: countdown.hours },
                    { label: "Minutes", value: countdown.minutes },
                    { label: "Seconds", value: countdown.seconds },
                  ] as const
                ).map((item) => (
                  <motion.div
                    key={item.label}
                    className="rounded-lg border px-2 py-4"
                    style={{
                      borderColor: GOLD_DIM,
                      background: "rgba(218,165,32,0.04)",
                      boxShadow: "0 0 15px rgba(218,165,32,0.05)",
                    }}
                    whileHover={{
                      boxShadow: "0 0 25px rgba(218,165,32,0.15)",
                    }}
                  >
                    <p
                      className="text-3xl font-bold sm:text-4xl"
                      style={{
                        color: GOLD_LIGHT,
                        textShadow: "0 0 15px rgba(218,165,32,0.3)",
                      }}
                    >
                      {String(item.value).padStart(2, "0")}
                    </p>
                    <p
                      className="mt-1 text-[10px] uppercase tracking-[0.15em]"
                      style={{ color: GOLD }}
                    >
                      {item.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ================================================================== */}
      {/*  EVENTS SECTION                                                    */}
      {/* ================================================================== */}
      {invite.events && invite.events.length > 0 && (
        <section className="relative z-10 px-6 py-16">
          <RegalDivider />

          <div className="mx-auto max-w-lg">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12 text-center text-xs font-light uppercase tracking-[0.3em]"
              style={{ color: GOLD }}
            >
              Royal Proceedings
            </motion.p>

            <div className="space-y-5">
              {invite.events.map((event, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="rounded-lg border p-5"
                  style={{
                    borderColor: GOLD_DIM,
                    background: "rgba(218,165,32,0.02)",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border"
                      style={{ borderColor: GOLD_DIM }}
                    >
                      <span
                        className="text-xs font-bold"
                        style={{ color: GOLD }}
                      >
                        {idx + 1}
                      </span>
                    </div>
                    <div>
                      <p
                        className="text-lg font-semibold"
                        style={{ color: GOLD_LIGHT }}
                      >
                        {event.name}
                      </p>
                      <p className="mt-0.5 text-sm text-gray-400">
                        {event.date} {event.time && `at ${event.time}`}
                      </p>
                      {event.venue && (
                        <p className="text-sm text-gray-500">{event.venue}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================== */}
      {/*  GALLERY SECTION                                                   */}
      {/* ================================================================== */}
      {invite.galleryImages.length > 0 && (
        <section className="relative z-10 px-6 py-16">
          <RegalDivider />

          <div className="mx-auto max-w-2xl">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12 text-center text-xs font-light uppercase tracking-[0.3em]"
              style={{ color: GOLD }}
            >
              Royal Gallery
            </motion.p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {invite.galleryImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  className="aspect-square overflow-hidden rounded-lg border"
                  style={{
                    borderColor: GOLD_DIM,
                    boxShadow: "0 0 10px rgba(218,165,32,0.05)",
                  }}
                >
                  <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-700 hover:scale-110"
                    style={{ backgroundImage: `url(${img})` }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================== */}
      {/*  RSVP SECTION                                                      */}
      {/* ================================================================== */}
      <section className="relative z-10 px-6 py-20">
        <RegalDivider />

        <div className="mx-auto max-w-sm text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-3 text-xs font-light uppercase tracking-[0.3em]"
            style={{ color: GOLD }}
          >
            Your Presence is Requested
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-10 text-sm font-light text-gray-400"
          >
            We would be honoured by your gracious attendance at our celebration.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col items-center gap-3"
          >
            <Button
              size="lg"
              onClick={() => setRsvpOpen(true)}
              className="w-full rounded-lg border-0 px-10 py-6 text-sm font-semibold uppercase tracking-widest text-purple-950 shadow-lg transition-all hover:shadow-xl"
              style={{
                background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
                boxShadow: `0 4px 20px rgba(218,165,32,0.3)`,
              }}
            >
              RSVP
            </Button>

            <div className="flex w-full gap-2">
              <Button
                variant="outline"
                size="lg"
                onClick={() => void handleShare()}
                className="flex-1 rounded-lg border-amber-700/30 bg-transparent py-6 text-xs uppercase tracking-wider text-gray-300 hover:bg-amber-900/10"
              >
                <Share2 className="mr-2 h-3.5 w-3.5" />
                Share
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  void fetch("/api/download/invite", { method: "POST" }).then(
                    (r) => {
                      if (r.ok) toast.success("Invite saved to gallery");
                      else toast.error("Unlock your invite to download");
                    },
                  );
                }}
                className="rounded-lg border-amber-700/30 bg-transparent px-4 py-6 text-gray-300 hover:bg-amber-900/10"
              >
                <Download className="h-3.5 w-3.5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  FOOTER                                                            */}
      {/* ================================================================== */}
      <footer className="relative z-10 px-6 pb-12 pt-8">
        <RegalDivider />

        <div className="mx-auto max-w-sm text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <CrownMotif className="mx-auto mb-4 h-8 w-14 opacity-40" />
            <p
              className="text-lg font-semibold tracking-wide"
              style={{
                color: GOLD_LIGHT,
                textShadow: "0 0 10px rgba(218,165,32,0.2)",
              }}
            >
              {invite.groomName} & {invite.brideName}
            </p>
            {invite.weddingDate && (
              <p className="mt-1 text-xs text-gray-500">
                {formatWeddingDate(invite.weddingDate)}
              </p>
            )}
          </motion.div>

          <CardoraWatermark className="mt-10 pb-4 text-center text-[10px] text-gray-600" />
        </div>
      </footer>

      {/* ---- RSVP Modal ---- */}
      <RsvpModal
        open={rsvpOpen}
        onOpenChange={setRsvpOpen}
        inviteSlug={invite.slug}
      />
    </div>
  );
}
