"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RsvpModal } from "@/components/rsvp/rsvp-modal";
import { Share2, MapPin, Calendar, Heart, Download } from "lucide-react";
import { toast } from "sonner";
import { MusicToggleButton } from "../../shared/music-toggle-button";
import { CardoraWatermark } from "../../shared/cardora-watermark";
import { ParticleLayer } from "../../shared/particle-layer";
import { useMusicPlayer } from "@/hooks/use-music-player";
import { useCountdown } from "@/hooks/use-countdown";
import { useLenis } from "@/hooks/use-lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap-setup";
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

function MountainSilhouette() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-0 overflow-hidden">
      <svg
        viewBox="0 0 1440 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-48 w-full sm:h-64"
        preserveAspectRatio="none"
      >
        {/* Far mountain layer */}
        <path
          d="M0 200 L120 120 L240 180 L360 80 L480 160 L600 60 L720 140 L840 40 L960 130 L1080 70 L1200 150 L1320 90 L1440 170 L1440 0 L0 0 Z"
          fill="currentColor"
          className="text-stone-300/40"
        />
        {/* Mid mountain layer */}
        <path
          d="M0 240 L160 150 L320 210 L480 120 L640 190 L800 100 L960 180 L1120 110 L1280 190 L1440 130 L1440 0 L0 0 Z"
          fill="currentColor"
          className="text-stone-400/30"
        />
        {/* Closest mountain layer */}
        <path
          d="M0 280 L200 180 L400 240 L600 150 L800 230 L1000 160 L1200 220 L1440 170 L1440 0 L0 0 Z"
          fill="currentColor"
          className="text-amber-700/15"
        />
        {/* Snow peaks */}
        <path d="M356 80 L360 68 L364 80 Z" fill="white" opacity="0.6" />
        <path d="M596 60 L600 45 L604 60 Z" fill="white" opacity="0.6" />
        <path d="M836 40 L840 25 L844 40 Z" fill="white" opacity="0.6" />
        <path d="M1076 70 L1080 55 L1084 70 Z" fill="white" opacity="0.6" />
      </svg>
    </div>
  );
}

function PineTreeDivider({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "mx-auto my-8 h-10 w-56 text-emerald-600"}
    >
      {/* Left line */}
      <line x1="40" y1="25" x2="140" y2="25" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      {/* Right line */}
      <line x1="260" y1="25" x2="360" y2="25" stroke="currentColor" strokeWidth="1" opacity="0.4" />

      {/* Center tree */}
      <path d="M200 5 L188 20 L192 20 L183 32 L188 32 L181 42 L219 42 L212 32 L217 32 L208 20 L212 20 Z" fill="currentColor" opacity="0.6" />
      <rect x="197" y="42" width="6" height="5" fill="currentColor" opacity="0.5" />

      {/* Left small tree */}
      <path d="M155 18 L148 28 L151 28 L145 36 L165 36 L159 28 L162 28 Z" fill="currentColor" opacity="0.35" />
      <rect x="153" y="36" width="4" height="4" fill="currentColor" opacity="0.3" />

      {/* Right small tree */}
      <path d="M245 18 L238 28 L241 28 L235 36 L255 36 L249 28 L252 28 Z" fill="currentColor" opacity="0.35" />
      <rect x="243" y="36" width="4" height="4" fill="currentColor" opacity="0.3" />

      {/* Dots */}
      <circle cx="130" cy="25" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="270" cy="25" r="2" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function MountainMiniIcon() {
  return (
    <svg viewBox="0 0 40 24" fill="none" className="mx-auto h-6 w-10 text-amber-600">
      <path d="M0 24 L15 4 L20 10 L25 2 L40 24 Z" fill="currentColor" opacity="0.3" />
      <path d="M14 4 L15 2 L16 4 Z" fill="white" opacity="0.5" />
      <path d="M24 2 L25 0 L26 2 Z" fill="white" opacity="0.5" />
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

export default function MountainPeakTemplate({ invite, isDemo }: TemplateProps) {
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const { isPlaying, toggle } = useMusicPlayer(invite.musicUrl);
  const countdown = useCountdown(invite.weddingDate);
  const containerRef = useRef<HTMLDivElement>(null);

  useLenis();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".scroll-fade").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".parallax-mountain").forEach((el) => {
        gsap.to(el, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

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
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-gradient-to-b from-stone-100 via-amber-50 to-stone-100">
      {/* Mountain silhouette backdrop */}
      <div className="parallax-mountain">
        <MountainSilhouette />
      </div>
      <ParticleLayer type="DUST" />

      {/* Music toggle */}
      {invite.musicUrl && (
        <MusicToggleButton
          isPlaying={isPlaying}
          onToggle={toggle}
          className="fixed top-4 right-4 z-50 rounded-full bg-stone-200/80 p-3 shadow-lg backdrop-blur-sm transition-colors hover:bg-stone-300/80"
        />
      )}

      {/* Demo banner */}
      {isDemo && (
        <div className="relative z-10 bg-amber-500 py-2 text-center text-sm font-medium text-amber-900">
          This is a demo preview. Complete payment to use your own details.
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-2xl px-4 pt-52 pb-12 sm:pt-64">
        {/* ------------------------------------------------------------------ */}
        {/*  HERO SECTION                                                       */}
        {/* ------------------------------------------------------------------ */}
        <motion.section
          className="mb-16 text-center"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          {/* Hero image */}
          {invite.heroImage && (
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.8 }}
              className="mx-auto mb-8 h-56 w-56 overflow-hidden rounded-2xl border-4 border-amber-200/60 shadow-2xl shadow-amber-900/10 sm:h-64 sm:w-64"
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
            className="mb-3 text-sm tracking-[0.3em] font-medium text-amber-600 uppercase"
          >
            An Adventure Begins
          </motion.p>

          {/* Couple Names */}
          <motion.div variants={fadeInUp} transition={{ duration: 0.8 }}>
            <h1 className="font-serif text-5xl font-bold leading-tight text-stone-800 sm:text-6xl lg:text-7xl">
              {invite.groomName}
            </h1>

            {/* Mountain-themed divider */}
            <div className="my-4 flex items-center justify-center gap-4">
              <motion.div
                className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400 sm:w-24"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
              >
                <MountainMiniIcon />
              </motion.div>
              <motion.div
                className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400 sm:w-24"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
            </div>

            <h1 className="font-serif text-5xl font-bold leading-tight text-stone-800 sm:text-6xl lg:text-7xl">
              {invite.brideName}
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg text-amber-700"
          >
            Two souls, one journey through life together
          </motion.p>

          {/* Family names */}
          {(invite.groomFatherName ?? invite.brideFatherName) && (
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 space-y-1 text-sm text-stone-500"
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
        </motion.section>

        {/* Pine tree divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <PineTreeDivider />
        </motion.div>

        {/* ------------------------------------------------------------------ */}
        {/*  COUNTDOWN SECTION                                                  */}
        {/* ------------------------------------------------------------------ */}
        {invite.weddingDate && (
          <motion.section
            className="scroll-fade mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-2xl border border-amber-200/50 bg-white/40 p-8 text-center shadow-xl shadow-amber-900/5 backdrop-blur-sm">
              <h2 className="mb-6 font-serif text-2xl text-stone-700">
                The Summit Awaits
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
                    className="flex flex-col items-center rounded-xl bg-amber-50/60 p-3"
                    whileInView={{ scale: [0.8, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="font-serif text-3xl font-bold text-amber-700 sm:text-4xl">
                      {String(unit.value).padStart(2, "0")}
                    </span>
                    <span className="mt-1 text-xs tracking-wider text-stone-500 uppercase">
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
              <PineTreeDivider />
            </motion.div>

            <motion.section
              className="scroll-fade mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="rounded-2xl border border-amber-200/50 bg-white/40 p-8 text-center shadow-xl shadow-amber-900/5 backdrop-blur-sm sm:p-10">
                <motion.h2
                  className="mb-2 font-serif text-3xl text-stone-700"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Our Trail Together
                </motion.h2>
                <MountainMiniIcon />
                <motion.p
                  className="mt-4 leading-relaxed text-stone-600"
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
            className="scroll-fade mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-2xl border border-amber-200/50 bg-amber-50/50 p-8 text-center backdrop-blur-sm sm:p-10">
              <p className="font-serif text-lg leading-relaxed text-stone-600 italic">
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
          <PineTreeDivider />
        </motion.div>

        <motion.section
          className="scroll-fade mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="rounded-2xl border border-amber-200/50 bg-white/40 p-8 text-center shadow-xl shadow-amber-900/5 backdrop-blur-sm sm:p-10">
            <h2 className="mb-8 font-serif text-3xl text-stone-700">
              When & Where
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
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                  <Calendar className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-stone-800">
                    {formatWeddingDate(invite.weddingDate)}
                  </p>
                  {invite.weddingTime && (
                    <p className="mt-1 text-sm text-amber-600">
                      at {invite.weddingTime}
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Divider */}
              <div className="flex items-center justify-center gap-2">
                <div className="h-px w-12 bg-amber-300/50" />
                <div className="h-2 w-2 rotate-45 border border-amber-300 bg-amber-100" />
                <div className="h-px w-12 bg-amber-300/50" />
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                    <MapPin className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-stone-800">
                      {invite.venue}
                    </p>
                    {invite.venueAddress && (
                      <p className="mt-1 text-sm text-stone-500">
                        {invite.venueAddress}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Reception */}
              {invite.receptionDate && (
                <>
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-px w-12 bg-amber-300/50" />
                    <div className="h-2 w-2 rotate-45 border border-amber-300 bg-amber-100" />
                    <div className="h-px w-12 bg-amber-300/50" />
                  </div>
                  <motion.div
                    className="flex flex-col items-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <p className="text-sm font-medium tracking-wider text-amber-600 uppercase">
                      Reception
                    </p>
                    <p className="text-lg text-stone-700">
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
            className="scroll-fade mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="mb-8 text-center font-serif text-3xl text-stone-700">
              Celebration Events
            </h2>
            <div className="space-y-4">
              {invite.events.map((event, index) => (
                <motion.div
                  key={index}
                  className="rounded-xl border border-amber-200/50 bg-white/40 p-6 text-center backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <h3 className="font-serif text-xl text-stone-700">{event.name}</h3>
                  <p className="mt-2 text-sm text-amber-600">
                    {event.date} {event.time && `at ${event.time}`}
                  </p>
                  {event.venue && (
                    <p className="mt-1 text-sm text-stone-500">{event.venue}</p>
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
            className="scroll-fade mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="mb-8 text-center font-serif text-3xl text-stone-700">
              Captured Moments
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {invite.galleryImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  className="aspect-square overflow-hidden rounded-xl border border-amber-200/50 shadow-md"
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
          <PineTreeDivider />
        </motion.div>

        <motion.section
          className="scroll-fade mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="mb-4 font-serif text-3xl text-stone-700">
            Join Our Adventure
          </h2>
          <p className="mb-8 text-stone-500">
            We would love for you to be part of this beautiful journey.
          </p>

          <div className="flex flex-col items-center gap-4">
            <Button
              size="lg"
              className="w-full max-w-xs bg-amber-600 text-white shadow-lg shadow-amber-200/50 hover:bg-amber-700"
              onClick={() => setRsvpOpen(true)}
            >
              <Heart className="mr-2 h-4 w-4" />
              RSVP Now
            </Button>

            <div className="flex w-full max-w-xs gap-3">
              <Button
                variant="outline"
                size="lg"
                className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-50"
                onClick={() => void handleShare()}
              >
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-amber-300 text-amber-700 hover:bg-amber-50"
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
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Bottom mountain silhouette */}
          <svg
            viewBox="0 0 400 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto mb-4 h-10 w-72 text-stone-300"
          >
            <path
              d="M0 60 L60 25 L100 40 L150 10 L200 35 L250 15 L300 38 L340 20 L400 60 Z"
              fill="currentColor"
              opacity="0.3"
            />
          </svg>

          <p className="font-serif text-lg text-stone-700">
            {invite.groomName} & {invite.brideName}
          </p>
          <p className="mt-1 text-sm text-amber-600">
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
