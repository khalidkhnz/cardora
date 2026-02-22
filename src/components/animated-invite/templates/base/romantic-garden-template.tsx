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
/*  Botanical Leaf SVG Decoration                                             */
/* -------------------------------------------------------------------------- */

function BotanicalLeaf({
  className,
  flip,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 60 120"
      fill="none"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        d="M30 0C30 0 10 30 10 60C10 90 30 120 30 120C30 120 50 90 50 60C50 30 30 0 30 0Z"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M30 20C30 20 20 40 20 60C20 80 30 100 30 100"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.25"
      />
      <path
        d="M30 35L22 50M30 50L20 65M30 65L24 78"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.2"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Vine Tendril Divider                                                      */
/* -------------------------------------------------------------------------- */

function VineDivider() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="my-8 flex items-center justify-center"
    >
      <svg
        viewBox="0 0 200 30"
        fill="none"
        className="h-6 w-48 text-green-600/30"
      >
        <path
          d="M0 15C20 15 30 5 50 5C70 5 70 25 90 25C110 25 110 5 130 5C150 5 160 15 200 15"
          stroke="currentColor"
          strokeWidth="1"
        />
        {/* Small leaves along the vine */}
        <ellipse cx="50" cy="5" rx="4" ry="7" fill="currentColor" opacity="0.4" transform="rotate(-20 50 5)" />
        <ellipse cx="90" cy="25" rx="4" ry="7" fill="currentColor" opacity="0.4" transform="rotate(20 90 25)" />
        <ellipse cx="130" cy="5" rx="4" ry="7" fill="currentColor" opacity="0.4" transform="rotate(-20 130 5)" />
        {/* Center flower */}
        <circle cx="100" cy="15" r="3" fill="rgba(244,114,182,0.4)" />
        <circle cx="100" cy="15" r="1.5" fill="rgba(244,114,182,0.6)" />
      </svg>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Floating Flower Petal                                                     */
/* -------------------------------------------------------------------------- */

function FloatingPetal({
  delay,
  startX,
  size,
}: {
  delay: number;
  startX: number;
  size: number;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute top-0"
      style={{ left: `${startX}%` }}
      initial={{ y: -20, opacity: 0, rotate: 0 }}
      animate={{
        y: ["0vh", "100vh"],
        opacity: [0, 0.7, 0.5, 0],
        rotate: [0, 180, 360],
        x: [0, 30, -20, 10],
      }}
      transition={{
        duration: 12 + Math.random() * 6,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <svg width={size} height={size} viewBox="0 0 16 16">
        <ellipse
          cx="8"
          cy="8"
          rx="5"
          ry="8"
          fill="rgba(244,114,182,0.35)"
          transform="rotate(30 8 8)"
        />
      </svg>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Butterfly                                                                 */
/* -------------------------------------------------------------------------- */

function FloatingButterfly({
  delay,
  startX,
}: {
  delay: number;
  startX: number;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{ left: `${startX}%`, top: `${20 + Math.random() * 50}%` }}
      animate={{
        x: [0, 60, -40, 80, 0],
        y: [0, -30, 20, -50, 0],
      }}
      transition={{
        duration: 18 + Math.random() * 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg width="20" height="16" viewBox="0 0 20 16" className="text-pink-300/50">
        <motion.ellipse
          cx="7"
          cy="8"
          rx="6"
          ry="7"
          fill="currentColor"
          animate={{ rx: [6, 2, 6] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.ellipse
          cx="13"
          cy="8"
          rx="6"
          ry="7"
          fill="currentColor"
          animate={{ rx: [6, 2, 6] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <rect x="9.5" y="3" width="1" height="10" rx="0.5" fill="currentColor" opacity="0.6" />
      </svg>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Romantic Garden Template                                                  */
/* -------------------------------------------------------------------------- */

export default function RomanticGardenTemplate({
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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-green-50/30 via-pink-50/20 to-green-50/30">
      {/* ---- Floating petals background ---- */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <FloatingPetal
            key={`petal-${i}`}
            delay={i * 1.8}
            startX={10 + Math.random() * 80}
            size={10 + Math.random() * 10}
          />
        ))}
        {Array.from({ length: 3 }).map((_, i) => (
          <FloatingButterfly
            key={`butterfly-${i}`}
            delay={i * 5}
            startX={15 + i * 30}
          />
        ))}
      </div>

      {/* ---- Botanical leaf corners ---- */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="absolute left-0 top-0 text-green-600"
        >
          <BotanicalLeaf className="h-32 w-16 sm:h-48 sm:w-24" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="absolute right-0 top-0 text-green-600"
        >
          <BotanicalLeaf className="h-32 w-16 sm:h-48 sm:w-24" flip />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="absolute bottom-0 left-0 rotate-180 text-green-600"
        >
          <BotanicalLeaf className="h-32 w-16 sm:h-48 sm:w-24" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="absolute bottom-0 right-0 rotate-180 text-green-600"
        >
          <BotanicalLeaf className="h-32 w-16 sm:h-48 sm:w-24" flip />
        </motion.div>
      </div>

      {/* ---- Music toggle ---- */}
      {invite.musicUrl && (
        <MusicToggleButton
          isPlaying={isPlaying}
          onToggle={toggle}
          className="fixed right-4 top-4 z-50 rounded-full bg-white/70 p-3 shadow-md backdrop-blur-md transition-colors hover:bg-white/90"
        />
      )}

      {/* ---- Demo Banner ---- */}
      {isDemo && (
        <div className="relative z-20 bg-green-700 py-2 text-center text-sm font-medium text-green-50">
          This is a demo preview. Complete payment to use your own details.
        </div>
      )}

      {/* ================================================================== */}
      {/*  HERO SECTION  — Garden Gate Metaphor                              */}
      {/* ================================================================== */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20">
        {/* Garden gate arch */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative mb-8"
        >
          <svg
            viewBox="0 0 300 180"
            fill="none"
            className="mx-auto h-32 w-64 text-green-600/20 sm:h-44 sm:w-80"
          >
            {/* Arch */}
            <path
              d="M30 180 L30 70 C30 20 150 -10 150 20 C150 -10 270 20 270 70 L270 180"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            {/* Leaves on arch */}
            <ellipse cx="60" cy="55" rx="8" ry="14" fill="currentColor" opacity="0.4" transform="rotate(-30 60 55)" />
            <ellipse cx="100" cy="30" rx="8" ry="14" fill="currentColor" opacity="0.4" transform="rotate(-15 100 30)" />
            <ellipse cx="200" cy="30" rx="8" ry="14" fill="currentColor" opacity="0.4" transform="rotate(15 200 30)" />
            <ellipse cx="240" cy="55" rx="8" ry="14" fill="currentColor" opacity="0.4" transform="rotate(30 240 55)" />
            {/* Flowers on arch */}
            <circle cx="80" cy="40" r="5" fill="rgba(244,114,182,0.3)" />
            <circle cx="150" cy="15" r="6" fill="rgba(244,114,182,0.35)" />
            <circle cx="220" cy="40" r="5" fill="rgba(244,114,182,0.3)" />
          </svg>
        </motion.div>

        {/* Couple photo */}
        {invite.heroImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="mb-10 h-52 w-52 overflow-hidden rounded-full border-4 border-pink-200/60 shadow-xl shadow-pink-200/20 sm:h-60 sm:w-60"
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
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-4 text-sm tracking-[0.25em] text-green-700/60"
        >
          TOGETHER WITH THEIR FAMILIES
        </motion.p>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="text-center font-serif text-5xl italic text-green-900/80 sm:text-6xl"
        >
          {invite.groomName}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="my-4 flex items-center gap-4"
        >
          <div className="h-px w-14 bg-pink-300/50" />
          <Heart className="h-5 w-5 text-pink-400/60" fill="rgba(244,114,182,0.3)" />
          <div className="h-px w-14 bg-pink-300/50" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.0 }}
          className="text-center font-serif text-5xl italic text-green-900/80 sm:text-6xl"
        >
          {invite.brideName}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-6 font-serif text-base italic text-pink-500/70"
        >
          Request the pleasure of your company
        </motion.p>

        {/* Dreamy blur circle background accent */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-200/20 blur-3xl" />
      </section>

      {/* ================================================================== */}
      {/*  FAMILIES SECTION                                                  */}
      {/* ================================================================== */}
      {(invite.groomFatherName ??
        invite.groomMotherName ??
        invite.brideFatherName ??
        invite.brideMotherName) && (
        <section className="relative z-10 px-6 py-16">
          <VineDivider />
          <div className="mx-auto max-w-lg">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-10 text-center text-xs tracking-[0.25em] text-green-700/50"
            >
              WITH BLESSINGS FROM
            </motion.p>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="rounded-2xl border border-green-200/40 bg-white/40 p-6 text-center backdrop-blur-sm"
              >
                <p className="mb-2 text-xs tracking-[0.15em] text-green-600/50">
                  GROOM&apos;S PARENTS
                </p>
                {invite.groomFatherName && (
                  <p className="font-serif text-lg italic text-green-900/70">
                    {invite.groomFatherName}
                  </p>
                )}
                {invite.groomMotherName && (
                  <p className="font-serif text-lg italic text-green-900/70">
                    {invite.groomMotherName}
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="rounded-2xl border border-pink-200/40 bg-white/40 p-6 text-center backdrop-blur-sm"
              >
                <p className="mb-2 text-xs tracking-[0.15em] text-pink-600/50">
                  BRIDE&apos;S PARENTS
                </p>
                {invite.brideFatherName && (
                  <p className="font-serif text-lg italic text-green-900/70">
                    {invite.brideFatherName}
                  </p>
                )}
                {invite.brideMotherName && (
                  <p className="font-serif text-lg italic text-green-900/70">
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
          <VineDivider />

          <div className="mx-auto max-w-lg text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-3 text-xs tracking-[0.25em] text-green-700/50"
            >
              OUR LOVE STORY
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative rounded-3xl border border-green-200/30 bg-white/50 p-8 backdrop-blur-sm sm:p-10"
            >
              {/* Decorative leaf in corner */}
              <div className="absolute -left-3 -top-3 text-green-600">
                <BotanicalLeaf className="h-12 w-6" />
              </div>
              <div className="absolute -bottom-3 -right-3 rotate-180 text-green-600">
                <BotanicalLeaf className="h-12 w-6" />
              </div>

              <p className="font-serif text-base italic leading-relaxed text-green-900/60">
                {invite.story}
              </p>

              {invite.coupleMessage && (
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="mt-6 border-t border-green-200/30 pt-6 font-serif text-sm italic text-pink-600/60"
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
        <VineDivider />

        <div className="mx-auto max-w-lg">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center text-xs tracking-[0.25em] text-green-700/50"
          >
            THE CELEBRATION
          </motion.p>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {/* Date card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-2xl border border-pink-200/40 bg-white/50 p-6 text-center backdrop-blur-sm"
            >
              <Calendar className="mx-auto mb-3 h-5 w-5 text-pink-400/60" />
              <p className="font-serif text-lg italic text-green-900/70">
                {formatWeddingDate(invite.weddingDate)}
              </p>
              {invite.weddingTime && (
                <p className="mt-1 text-sm text-green-700/40">
                  {invite.weddingTime}
                </p>
              )}
            </motion.div>

            {/* Venue card */}
            {invite.venue && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="rounded-2xl border border-green-200/40 bg-white/50 p-6 text-center backdrop-blur-sm"
              >
                <MapPin className="mx-auto mb-3 h-5 w-5 text-green-600/50" />
                <p className="font-serif text-lg italic text-green-900/70">
                  {invite.venue}
                </p>
                {invite.venueAddress && (
                  <p className="mt-1 text-sm text-green-700/40">
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
              <p className="mb-1 text-xs tracking-[0.15em] text-green-700/40">
                RECEPTION
              </p>
              <p className="font-serif text-base italic text-green-900/60">
                {formatWeddingDate(invite.receptionDate)}
              </p>
            </motion.div>
          )}

          {/* Countdown */}
          {invite.weddingDate && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-16"
            >
              <p className="mb-6 text-center text-xs tracking-[0.2em] text-green-700/40">
                COUNTING THE DAYS
              </p>
              <div className="grid grid-cols-4 gap-3 text-center">
                {(
                  [
                    { label: "Days", value: countdown.days },
                    { label: "Hours", value: countdown.hours },
                    { label: "Mins", value: countdown.minutes },
                    { label: "Secs", value: countdown.seconds },
                  ] as const
                ).map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-green-200/30 bg-white/40 px-2 py-4 backdrop-blur-sm"
                  >
                    <p className="font-serif text-2xl italic text-green-900/70 sm:text-3xl">
                      {String(item.value).padStart(2, "0")}
                    </p>
                    <p className="mt-1 text-[10px] tracking-[0.15em] text-green-600/40">
                      {item.label}
                    </p>
                  </div>
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
          <VineDivider />

          <div className="mx-auto max-w-lg">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12 text-center text-xs tracking-[0.25em] text-green-700/50"
            >
              WEDDING EVENTS
            </motion.p>

            <div className="space-y-6">
              {invite.events.map((event, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="rounded-2xl border border-green-200/30 bg-white/40 p-5 backdrop-blur-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pink-100/50">
                      <Heart className="h-3.5 w-3.5 text-pink-400/60" />
                    </div>
                    <div>
                      <p className="font-serif text-lg italic text-green-900/70">
                        {event.name}
                      </p>
                      <p className="mt-0.5 text-sm text-green-700/50">
                        {event.date} {event.time && `at ${event.time}`}
                      </p>
                      {event.venue && (
                        <p className="text-sm text-green-600/40">
                          {event.venue}
                        </p>
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
          <VineDivider />

          <div className="mx-auto max-w-2xl">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12 text-center text-xs tracking-[0.25em] text-green-700/50"
            >
              OUR MOMENTS
            </motion.p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {invite.galleryImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  className="aspect-square overflow-hidden rounded-2xl border border-green-200/30 shadow-sm"
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
        <VineDivider />

        <div className="mx-auto max-w-sm text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-3 text-xs tracking-[0.25em] text-green-700/50"
          >
            KINDLY RESPOND
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-10 font-serif text-sm italic text-green-900/50"
          >
            We would be delighted to celebrate this joyous occasion with you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col items-center gap-3"
          >
            <Button
              size="lg"
              onClick={() => setRsvpOpen(true)}
              className="w-full rounded-full border-0 bg-green-700/80 px-10 py-6 font-serif text-sm italic tracking-wide text-white shadow-md shadow-green-600/10 transition-colors hover:bg-green-700"
            >
              RSVP Now
            </Button>

            <div className="flex w-full gap-2">
              <Button
                variant="outline"
                size="lg"
                onClick={() => void handleShare()}
                className="flex-1 rounded-full border-green-300/50 py-6 font-serif text-xs italic text-green-700/60 hover:bg-green-50/50"
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
                className="rounded-full border-green-300/50 px-4 py-6 text-green-700/60 hover:bg-green-50/50"
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
        <VineDivider />

        <div className="mx-auto max-w-sm text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Heart
              className="mx-auto mb-4 h-5 w-5 text-pink-300/50"
              fill="rgba(244,114,182,0.2)"
            />
            <p className="font-serif text-base italic text-green-900/50">
              {invite.groomName} & {invite.brideName}
            </p>
            {invite.weddingDate && (
              <p className="mt-1 text-xs text-green-700/30">
                {formatWeddingDate(invite.weddingDate)}
              </p>
            )}
          </motion.div>

          <CardoraWatermark className="mt-10 pb-4 text-center text-[10px] text-green-700/25" />
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
