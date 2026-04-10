"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RsvpModal } from "@/components/rsvp/rsvp-modal";
import { Share2, MapPin, Calendar, Heart, Download } from "lucide-react";
import { toast } from "sonner";
import { gsap } from "@/lib/gsap-setup";
import { MusicToggleButton } from "../../shared/music-toggle-button";
import { CardoraWatermark } from "../../shared/cardora-watermark";
import { useMusicPlayer } from "@/hooks/use-music-player";
import { useCountdown } from "@/hooks/use-countdown";
import type { TemplateProps } from "../../types";

/* ---------- helpers ---------- */

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

/* ---------- Floating Golden Particles (CSS keyframe via motion.div) ---------- */

function GoldenParticles() {
  const particles = useRef(
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 4 + Math.random() * 6,
      size: 3 + Math.random() * 5,
      startY: 60 + Math.random() * 40,
      drift: (Math.random() - 0.5) * 30,
      opacity: 0.3 + Math.random() * 0.5,
    })),
  ).current;

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            background:
              "radial-gradient(circle, rgba(218,165,32,0.9) 0%, rgba(218,165,32,0) 70%)",
            boxShadow: "0 0 6px 1px rgba(218,165,32,0.4)",
          }}
          initial={{ y: `${p.startY}vh`, x: 0, opacity: 0 }}
          animate={{
            y: [
              `${p.startY}vh`,
              `${p.startY - 20}vh`,
              `${p.startY - 50}vh`,
              "-10vh",
            ],
            x: [0, p.drift, -p.drift * 0.5, p.drift * 0.3],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

/* ---------- Envelope Seal ---------- */

interface EnvelopeSealProps {
  initials: string;
  onClick: () => void;
  sealRef: React.RefObject<HTMLDivElement | null>;
}

function EnvelopeSeal({ initials, onClick, sealRef }: EnvelopeSealProps) {
  return (
    <div
      ref={sealRef}
      onClick={onClick}
      className="group relative z-30 cursor-pointer select-none"
      role="button"
      tabIndex={0}
      aria-label="Open envelope"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
    >
      {/* Outer ring glow */}
      <div className="absolute -inset-4 animate-pulse rounded-full bg-amber-400/20 blur-xl" />

      {/* Seal body */}
      <div
        className="relative flex h-28 w-28 items-center justify-center rounded-full shadow-2xl transition-shadow duration-300 group-hover:shadow-amber-400/50 sm:h-32 sm:w-32"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, #DAA520, #B8860B 50%, #8B6914 100%)",
          border: "3px solid rgba(255,215,0,0.5)",
        }}
      >
        {/* Inner circle */}
        <div
          className="flex h-20 w-20 items-center justify-center rounded-full sm:h-24 sm:w-24"
          style={{
            background:
              "radial-gradient(circle at 40% 40%, #C5A028, #9E7B16 60%)",
            boxShadow: "inset 0 2px 8px rgba(0,0,0,0.3)",
          }}
        >
          <span
            className="font-serif text-2xl font-bold tracking-wider text-amber-100 drop-shadow-md sm:text-3xl"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
          >
            {initials}
          </span>
        </div>

        {/* Decorative dots around seal */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 360) / 24;
          const rad = (angle * Math.PI) / 180;
          const r = 52;
          return (
            <div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-amber-300/60"
              style={{
                left: `calc(50% + ${Math.cos(rad) * r}px - 2px)`,
                top: `calc(50% + ${Math.sin(rad) * r}px - 2px)`,
              }}
            />
          );
        })}
      </div>

      {/* Tap instruction */}
      <motion.p
        className="mt-5 text-center text-xs tracking-[0.25em] text-amber-700/80 uppercase"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Tap to Open
      </motion.p>
    </div>
  );
}

/* ---------- Main Template ---------- */

export default function MotionVideoTemplate({
  invite,
  isDemo,
}: TemplateProps) {
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [animating, setAnimating] = useState(false);

  const { isPlaying, toggle } = useMusicPlayer(invite.musicUrl);
  const countdown = useCountdown(invite.weddingDate);

  const envelopeRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const contentSlideRef = useRef<HTMLDivElement>(null);
  const gsapCtxRef = useRef<gsap.Context | null>(null);

  const groomInitial = invite.groomName.charAt(0).toUpperCase();
  const brideInitial = invite.brideName.charAt(0).toUpperCase();
  const initials = `${groomInitial}&${brideInitial}`;

  /* ---- GSAP floating seal animation ---- */
  useEffect(() => {
    if (isOpened || !sealRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(sealRef.current, {
        y: -8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, [isOpened]);

  /* ---- Open envelope GSAP timeline ---- */
  function handleOpen() {
    if (animating || isOpened) return;
    setAnimating(true);

    gsapCtxRef.current = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsOpened(true);
          setAnimating(false);
        },
      });

      // Step 1 - Seal scales up, rotates, and fades out
      if (sealRef.current) {
        tl.to(sealRef.current, {
          scale: 1.6,
          rotation: 180,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
        });
      }

      // Step 2 - Envelope flap opens upward (rotate around top edge)
      if (flapRef.current) {
        tl.to(
          flapRef.current,
          {
            rotateX: -180,
            duration: 0.6,
            ease: "power2.inOut",
          },
          "-=0.1",
        );
      }

      // Step 3 - Content slides up from envelope
      if (contentSlideRef.current) {
        tl.fromTo(
          contentSlideRef.current,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.2",
        );
      }

      // Step 4 - Fade out entire envelope
      if (envelopeRef.current) {
        tl.to(
          envelopeRef.current,
          {
            opacity: 0,
            scale: 0.9,
            duration: 0.5,
            ease: "power2.in",
          },
          "-=0.4",
        );
      }
    });
  }

  /* ---- Cleanup GSAP on unmount ---- */
  useEffect(() => {
    return () => {
      gsapCtxRef.current?.revert();
    };
  }, []);

  async function handleShare() {
    const url = `${window.location.origin}/wedding/${invite.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${invite.groomName} & ${invite.brideName} - Wedding`,
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
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ backgroundColor: "#FFF8F0" }}
    >
      {/* Music toggle */}
      {invite.musicUrl && (
        <MusicToggleButton isPlaying={isPlaying} onToggle={toggle} />
      )}

      {/* Demo banner */}
      {isDemo && (
        <div className="relative z-50 bg-yellow-500 py-2 text-center text-sm font-medium text-yellow-900">
          This is a demo preview. Complete payment to use your own details.
        </div>
      )}

      {/* Golden particles - always visible */}
      <GoldenParticles />

      {/* ========== ENVELOPE STATE ========== */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div
            ref={envelopeRef}
            className="fixed inset-0 z-40 flex items-center justify-center"
            style={{ perspective: "1200px" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Envelope background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#FFF8F0] via-[#FAEBD7] to-[#F5DEB3]" />

            {/* Decorative pattern on envelope */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 20px,
                  #8B6914 20px,
                  #8B6914 21px
                )`,
              }}
            />

            {/* Envelope body */}
            <div className="relative flex flex-col items-center">
              {/* Top ornament */}
              <motion.div
                className="mb-6 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <p
                  className="text-xs tracking-[0.35em] uppercase"
                  style={{ color: "#8B6914" }}
                >
                  You are cordially invited
                </p>
              </motion.div>

              {/* Envelope visual with flap */}
              <div className="relative w-72 sm:w-80" style={{ perspective: "800px" }}>
                {/* Envelope flap (triangle pointing down, covering top of body) */}
                <div
                  ref={flapRef}
                  className="absolute top-0 left-0 z-10 w-full"
                  style={{
                    height: "100px",
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    background: "linear-gradient(180deg, #D4A76A 0%, #C5963A 100%)",
                    transformOrigin: "top center",
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
                  }}
                />

                {/* Envelope body */}
                <div
                  className="relative h-48 w-full overflow-hidden rounded-b-lg shadow-xl sm:h-56"
                  style={{
                    background:
                      "linear-gradient(180deg, #E8CFA0 0%, #D4A76A 100%)",
                    border: "1px solid rgba(218,165,32,0.3)",
                  }}
                >
                  {/* Inner envelope texture */}
                  <div
                    className="absolute inset-2 rounded-sm"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,248,240,0.5) 0%, transparent 50%)",
                    }}
                  />

                  {/* Inner V-fold lines */}
                  <div
                    className="absolute inset-0"
                    style={{
                      clipPath: "polygon(0 0, 50% 55%, 100% 0)",
                      background: "linear-gradient(180deg, rgba(139,105,20,0.08) 0%, rgba(139,105,20,0.03) 100%)",
                    }}
                  />
                </div>

                {/* Seal - centered at flap tip */}
                <div className="absolute left-1/2 z-20 -translate-x-1/2" style={{ top: "34px" }}>
                  <EnvelopeSeal
                    initials={initials}
                    onClick={handleOpen}
                    sealRef={sealRef}
                  />
                </div>
              </div>

              {/* Bottom ornament */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="h-px w-12"
                    style={{ backgroundColor: "#DAA52066" }}
                  />
                  <Heart
                    className="h-3 w-3"
                    style={{ color: "#DAA520" }}
                    fill="#DAA520"
                  />
                  <div
                    className="h-px w-12"
                    style={{ backgroundColor: "#DAA52066" }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========== OPENED INVITE CONTENT ========== */}
      <AnimatePresence>
        {isOpened && (
          <motion.div
            ref={contentSlideRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            {/* Subtle background pattern */}
            <div
              className="pointer-events-none fixed inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20px 20px, #8B6914 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            <div className="mx-auto max-w-2xl px-4 py-16">
              {/* ---- Hero Section ---- */}
              <motion.section
                className="mb-16 text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Couple Photo / Hero Image */}
                {(invite.heroImage ?? invite.couplePhoto) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    className="mx-auto mb-10 h-56 w-56 overflow-hidden rounded-full shadow-2xl sm:h-64 sm:w-64"
                    style={{
                      border: "4px solid #DAA520",
                      boxShadow:
                        "0 0 40px rgba(218,165,32,0.2), 0 20px 60px rgba(0,0,0,0.1)",
                    }}
                  >
                    <div
                      className="h-full w-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${invite.heroImage ?? invite.couplePhoto})`,
                      }}
                    />
                  </motion.div>
                )}

                {/* Together with families */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-3 text-xs tracking-[0.3em] uppercase"
                  style={{ color: "#8B6914" }}
                >
                  Together with their families
                </motion.p>

                {/* Parents names */}
                {(invite.groomFatherName ?? invite.brideFatherName) && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45 }}
                    className="mb-6 text-sm"
                    style={{ color: "#9E7B16" }}
                  >
                    {invite.groomFatherName && invite.groomMotherName
                      ? `${invite.groomFatherName} & ${invite.groomMotherName}`
                      : invite.groomFatherName}
                    {invite.brideFatherName ? " and " : ""}
                    {invite.brideFatherName && invite.brideMotherName
                      ? `${invite.brideFatherName} & ${invite.brideMotherName}`
                      : invite.brideFatherName}
                  </motion.p>
                )}

                {/* Names */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                >
                  <h1
                    className="font-serif text-5xl font-light sm:text-6xl lg:text-7xl"
                    style={{ color: "#4A3728" }}
                  >
                    {invite.groomName}
                  </h1>

                  <div className="my-4 flex items-center justify-center gap-4">
                    <div
                      className="h-px w-20"
                      style={{ backgroundColor: "#DAA52066" }}
                    />
                    <Heart
                      className="h-5 w-5"
                      style={{ color: "#DAA520" }}
                      fill="#DAA520"
                    />
                    <div
                      className="h-px w-20"
                      style={{ backgroundColor: "#DAA52066" }}
                    />
                  </div>

                  <h1
                    className="font-serif text-5xl font-light sm:text-6xl lg:text-7xl"
                    style={{ color: "#4A3728" }}
                  >
                    {invite.brideName}
                  </h1>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-6 text-lg italic"
                  style={{ color: "#6B4226" }}
                >
                  Request the pleasure of your company
                </motion.p>
              </motion.section>

              {/* ---- Date & Venue Section ---- */}
              <motion.section
                className="mb-16 rounded-2xl p-8 text-center shadow-lg sm:p-10"
                style={{
                  backgroundColor: "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(218,165,32,0.15)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="mb-6 flex flex-col items-center gap-2">
                  <Calendar className="h-7 w-7" style={{ color: "#DAA520" }} />
                  <p
                    className="text-xl font-semibold sm:text-2xl"
                    style={{ color: "#4A3728" }}
                  >
                    {formatWeddingDate(invite.weddingDate)}
                  </p>
                  {invite.weddingTime && (
                    <p className="text-sm" style={{ color: "#8B6914" }}>
                      at {invite.weddingTime}
                    </p>
                  )}
                </div>

                {invite.venue && (
                  <div className="flex flex-col items-center gap-2">
                    <MapPin className="h-7 w-7" style={{ color: "#DAA520" }} />
                    <p
                      className="text-lg font-semibold"
                      style={{ color: "#4A3728" }}
                    >
                      {invite.venue}
                    </p>
                    {invite.venueAddress && (
                      <p className="text-sm" style={{ color: "#8B6914" }}>
                        {invite.venueAddress}
                      </p>
                    )}
                  </div>
                )}

                {/* Countdown */}
                <div className="mt-8">
                  <p
                    className="mb-4 text-xs tracking-[0.25em] uppercase"
                    style={{ color: "#8B6914" }}
                  >
                    Counting down to the big day
                  </p>
                  <div className="flex items-center justify-center gap-3 sm:gap-4">
                    {(
                      [
                        { label: "Days", value: countdown.days },
                        { label: "Hours", value: countdown.hours },
                        { label: "Minutes", value: countdown.minutes },
                        { label: "Seconds", value: countdown.seconds },
                      ] as const
                    ).map((item) => (
                      <div key={item.label} className="text-center">
                        <div
                          className="flex h-16 w-16 items-center justify-center rounded-lg text-2xl font-bold shadow-md sm:h-18 sm:w-18 sm:text-3xl"
                          style={{
                            backgroundColor: "#FFF8F0",
                            color: "#4A3728",
                            border: "1px solid rgba(218,165,32,0.2)",
                          }}
                        >
                          {item.value}
                        </div>
                        <p
                          className="mt-1 text-[10px] tracking-wider uppercase"
                          style={{ color: "#8B6914" }}
                        >
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.section>

              {/* ---- Events Section ---- */}
              {invite.events && invite.events.length > 0 && (
                <motion.section
                  className="mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                >
                  <h2
                    className="mb-8 text-center font-serif text-3xl"
                    style={{ color: "#4A3728" }}
                  >
                    Wedding Events
                  </h2>
                  <div className="space-y-4">
                    {invite.events.map((event, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.0 + i * 0.15 }}
                        className="rounded-xl p-6 text-center shadow-md"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.6)",
                          backdropFilter: "blur(8px)",
                          border: "1px solid rgba(218,165,32,0.12)",
                        }}
                      >
                        <h3
                          className="mb-1 font-serif text-xl"
                          style={{ color: "#4A3728" }}
                        >
                          {event.name}
                        </h3>
                        <p
                          className="text-sm"
                          style={{ color: "#8B6914" }}
                        >
                          {event.date} {event.time ? `at ${event.time}` : ""}
                        </p>
                        <p
                          className="mt-1 text-sm"
                          style={{ color: "#6B4226" }}
                        >
                          {event.venue}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* ---- Story / Couple Message Section ---- */}
              {(invite.story ?? invite.coupleMessage) && (
                <motion.section
                  className="mb-16 rounded-2xl p-8 text-center shadow-lg sm:p-10"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.6)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(218,165,32,0.12)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.6 }}
                >
                  <div className="mx-auto mb-4 flex items-center justify-center gap-3">
                    <div
                      className="h-px w-10"
                      style={{ backgroundColor: "#DAA52040" }}
                    />
                    <Heart
                      className="h-4 w-4"
                      style={{ color: "#DAA520" }}
                      fill="#DAA520"
                    />
                    <div
                      className="h-px w-10"
                      style={{ backgroundColor: "#DAA52040" }}
                    />
                  </div>

                  <h2
                    className="mb-5 font-serif text-2xl sm:text-3xl"
                    style={{ color: "#4A3728" }}
                  >
                    Our Story
                  </h2>
                  <p
                    className="mx-auto max-w-lg leading-relaxed"
                    style={{ color: "#6B4226" }}
                  >
                    {invite.story ?? invite.coupleMessage}
                  </p>
                </motion.section>
              )}

              {/* ---- Gallery Section ---- */}
              {invite.galleryImages.length > 0 && (
                <motion.section
                  className="mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.6 }}
                >
                  <h2
                    className="mb-6 text-center font-serif text-2xl sm:text-3xl"
                    style={{ color: "#4A3728" }}
                  >
                    Gallery
                  </h2>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {invite.galleryImages.map((img, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2 + i * 0.1 }}
                        className="aspect-square overflow-hidden rounded-xl shadow-md"
                        style={{
                          border: "2px solid rgba(218,165,32,0.15)",
                        }}
                      >
                        <div
                          className="h-full w-full bg-cover bg-center transition-transform duration-500 hover:scale-110"
                          style={{ backgroundImage: `url(${img})` }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* ---- RSVP & Actions Section ---- */}
              <motion.section
                className="mb-12 flex flex-col items-center gap-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <Button
                  size="lg"
                  className="w-full max-w-xs text-white shadow-lg"
                  style={{
                    backgroundColor: "#6B21A8",
                    boxShadow: "0 4px 20px rgba(107,33,168,0.3)",
                  }}
                  onClick={() => setRsvpOpen(true)}
                >
                  <Heart className="mr-2 h-4 w-4" /> RSVP Now
                </Button>

                <div className="flex w-full max-w-xs gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    style={{
                      borderColor: "#DAA52066",
                      color: "#6B4226",
                    }}
                    onClick={() => void handleShare()}
                  >
                    <Share2 className="mr-2 h-4 w-4" /> Share
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    style={{
                      borderColor: "#DAA52066",
                      color: "#6B4226",
                    }}
                    onClick={() => {
                      void fetch("/api/download/invite", {
                        method: "POST",
                      }).then((r) => {
                        if (r.ok) toast.success("Invite saved to gallery");
                        else toast.error("Unlock your invite to download");
                      });
                    }}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </motion.section>

              {/* ---- Footer ---- */}
              <motion.footer
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                <div className="mb-4 flex items-center justify-center gap-3">
                  <div
                    className="h-px w-16"
                    style={{ backgroundColor: "#DAA52040" }}
                  />
                  <Heart
                    className="h-4 w-4"
                    style={{ color: "#DAA520" }}
                    fill="#DAA520"
                  />
                  <div
                    className="h-px w-16"
                    style={{ backgroundColor: "#DAA52040" }}
                  />
                </div>
                <p
                  className="font-serif text-lg italic"
                  style={{ color: "#6B4226" }}
                >
                  We can&apos;t wait to celebrate with you!
                </p>
                <p
                  className="mt-2 text-sm"
                  style={{ color: "#8B691480" }}
                >
                  {invite.groomName} & {invite.brideName}
                </p>

                <CardoraWatermark className="mt-10 pb-8 text-center text-xs text-amber-700/40" />
              </motion.footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RSVP Modal */}
      <RsvpModal
        open={rsvpOpen}
        onOpenChange={setRsvpOpen}
        inviteSlug={invite.slug}
      />
    </div>
  );
}
