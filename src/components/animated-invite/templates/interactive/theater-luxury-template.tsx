"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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

function getDateParts(dateStr: string | null): {
  day: string;
  month: string;
  year: string;
} {
  if (!dateStr) return { day: "??", month: "??", year: "????" };
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return { day: "??", month: "??", year: "????" };
    return {
      day: d.getDate().toString().padStart(2, "0"),
      month: d.toLocaleString("en-US", { month: "short" }).toUpperCase(),
      year: d.getFullYear().toString(),
    };
  } catch {
    return { day: "??", month: "??", year: "????" };
  }
}

/* ---------- Theater Curtain Component ---------- */

interface CurtainProps {
  side: "left" | "right";
  curtainRef: React.RefObject<HTMLDivElement | null>;
}

function TheaterCurtain({ side, curtainRef }: CurtainProps) {
  return (
    <div
      ref={curtainRef}
      className="fixed top-0 z-50 h-full w-1/2"
      style={{
        [side]: 0,
        background: `linear-gradient(
          ${side === "left" ? "to right" : "to left"},
          #5C0000 0%,
          #8B0000 30%,
          #A00000 50%,
          #8B0000 70%,
          #5C0000 100%
        )`,
      }}
    >
      {/* Vertical striped curtain texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 18px,
            rgba(0,0,0,0.12) 18px,
            rgba(0,0,0,0.12) 20px
          )`,
        }}
      />

      {/* Curtain fold shading */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent 0px,
            rgba(255,255,255,0.04) 8px,
            transparent 16px,
            rgba(0,0,0,0.08) 24px,
            transparent 32px
          )`,
        }}
      />

      {/* Top gathered fabric */}
      <div
        className="absolute left-0 right-0 top-0 h-24"
        style={{
          background:
            "linear-gradient(to bottom, #3D0000 0%, transparent 100%)",
        }}
      />

      {/* Bottom shadow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)",
        }}
      />

      {/* Gold trim at the inner edge */}
      <div
        className="absolute top-0 h-full w-1"
        style={{
          [side === "left" ? "right" : "left"]: 0,
          background:
            "linear-gradient(to bottom, #FFD700, #DAA520, #B8860B, #DAA520, #FFD700)",
          boxShadow: "0 0 10px rgba(218,165,32,0.5)",
        }}
      />

      {/* Gold tassel */}
      <div
        className="absolute top-16"
        style={{
          [side === "left" ? "right" : "left"]: 8,
        }}
      >
        <div
          className="h-4 w-4 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, #FFD700, #B8860B)",
            boxShadow: "0 0 8px rgba(218,165,32,0.6)",
          }}
        />
        <div
          className="mx-auto mt-0.5 h-10 w-0.5"
          style={{ backgroundColor: "#DAA520" }}
        />
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-6 w-0.5 rounded-b"
              style={{ backgroundColor: "#DAA520" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Scratch Reveal Circle ---------- */

interface ScratchCircleProps {
  label: string;
  value: string;
  isRevealed: boolean;
  onReveal: () => void;
  delay: number;
}

function ScratchCircle({
  label,
  value,
  isRevealed,
  onReveal,
  delay,
}: ScratchCircleProps) {
  const circleRef = useRef<HTMLDivElement>(null);

  function handleClick() {
    if (isRevealed) return;

    if (circleRef.current) {
      const ctx = gsap.context(() => {
        gsap
          .timeline()
          .to(circleRef.current, {
            scale: 1.3,
            rotation: 360,
            duration: 0.5,
            ease: "back.out(1.7)",
          })
          .to(circleRef.current, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
      });

      // Clean up on next tick (animation is fire-and-forget)
      setTimeout(() => ctx.revert(), 1500);
    }

    onReveal();
  }

  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <p
        className="text-[10px] font-medium tracking-[0.2em] uppercase"
        style={{ color: "#DAA520" }}
      >
        {label}
      </p>

      <div
        ref={circleRef}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label={`Reveal ${label}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleClick();
        }}
        className="relative flex h-24 w-24 cursor-pointer items-center justify-center rounded-full transition-shadow duration-300 hover:shadow-lg sm:h-28 sm:w-28"
        style={{
          border: "2px solid #DAA520",
          boxShadow: isRevealed
            ? "0 0 25px rgba(218,165,32,0.4)"
            : "0 0 15px rgba(218,165,32,0.15)",
          background: isRevealed
            ? "radial-gradient(circle, rgba(20,10,5,0.9) 0%, rgba(10,5,2,0.95) 100%)"
            : "radial-gradient(circle at 35% 35%, #DAA520, #B8860B 50%, #8B6914 100%)",
        }}
      >
        <AnimatePresence mode="wait">
          {isRevealed ? (
            <motion.span
              key="value"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "backOut" }}
              className="font-serif text-2xl font-bold sm:text-3xl"
              style={{ color: "#FFD700" }}
            >
              {value}
            </motion.span>
          ) : (
            <motion.span
              key="question"
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-xl font-bold"
              style={{
                color: "#3D0000",
                textShadow: "0 1px 2px rgba(255,255,255,0.3)",
              }}
            >
              ?
            </motion.span>
          )}
        </AnimatePresence>

        {/* Decorative ring */}
        <div
          className="pointer-events-none absolute inset-1 rounded-full"
          style={{
            border: isRevealed
              ? "1px solid rgba(218,165,32,0.3)"
              : "1px solid rgba(61,0,0,0.2)",
          }}
        />
      </div>

      {!isRevealed && (
        <motion.p
          className="text-[9px] tracking-wider uppercase"
          style={{ color: "#DAA52080" }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Tap to reveal
        </motion.p>
      )}
    </motion.div>
  );
}

/* ---------- Main Template ---------- */

export default function TheaterLuxuryTemplate({
  invite,
  isDemo,
}: TemplateProps) {
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [revealedCircles, setRevealedCircles] = useState<Set<string>>(
    new Set(),
  );

  const { isPlaying, toggle } = useMusicPlayer(invite.musicUrl);
  const countdown = useCountdown(invite.weddingDate);
  const dateParts = getDateParts(invite.weddingDate);

  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const autoOpenTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gsapCtxRef = useRef<gsap.Context | null>(null);

  const openCurtains = useCallback(() => {
    if (curtainsOpen) return;

    // Clear auto-open timer if user clicks before timer fires
    if (autoOpenTimerRef.current) {
      clearTimeout(autoOpenTimerRef.current);
      autoOpenTimerRef.current = null;
    }

    gsapCtxRef.current = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setCurtainsOpen(true);
        },
      });

      // Curtains slide open simultaneously
      if (leftCurtainRef.current) {
        tl.to(leftCurtainRef.current, {
          x: "-100%",
          duration: 1.5,
          ease: "power2.inOut",
        });
      }

      if (rightCurtainRef.current) {
        tl.to(
          rightCurtainRef.current,
          {
            x: "100%",
            duration: 1.5,
            ease: "power2.inOut",
          },
          "<", // simultaneously with left curtain
        );
      }

      // Content fades in after curtains finish
      if (contentRef.current) {
        tl.fromTo(
          contentRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.3",
        );
      }
    });
  }, [curtainsOpen]);

  /* ---- Auto-open after 2 seconds ---- */
  useEffect(() => {
    autoOpenTimerRef.current = setTimeout(() => {
      openCurtains();
    }, 2000);

    return () => {
      if (autoOpenTimerRef.current) {
        clearTimeout(autoOpenTimerRef.current);
      }
    };
  }, [openCurtains]);

  /* ---- Cleanup GSAP ---- */
  useEffect(() => {
    return () => {
      gsapCtxRef.current?.revert();
    };
  }, []);

  function revealCircle(key: string) {
    setRevealedCircles((prev) => new Set(prev).add(key));
  }

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
      style={{
        backgroundColor: "#0A0505",
        color: "#E8D5B5",
      }}
    >
      {/* Music toggle */}
      {invite.musicUrl && (
        <MusicToggleButton
          isPlaying={isPlaying}
          onToggle={toggle}
          className="fixed top-4 right-4 z-[60] rounded-full bg-black/60 p-3 shadow-lg backdrop-blur-sm transition-colors hover:bg-black/80"
        />
      )}

      {/* Demo banner */}
      {isDemo && (
        <div className="relative z-[60] bg-yellow-500 py-2 text-center text-sm font-medium text-yellow-900">
          This is a demo preview. Complete payment to use your own details.
        </div>
      )}

      {/* ========== THEATER CURTAINS ========== */}
      {!curtainsOpen && (
        <>
          <TheaterCurtain side="left" curtainRef={leftCurtainRef} />
          <TheaterCurtain side="right" curtainRef={rightCurtainRef} />

          {/* Center overlay: "Open" button between curtains */}
          <div className="fixed inset-0 z-[55] flex flex-col items-center justify-center">
            {/* Top decoration */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <p
                className="text-center text-xs tracking-[0.4em] uppercase"
                style={{ color: "#FFD700" }}
              >
                {invite.groomName} & {invite.brideName}
              </p>
            </motion.div>

            {/* Open button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <button
                onClick={openCurtains}
                className="group relative cursor-pointer rounded-full px-10 py-4 font-serif text-lg tracking-wider transition-all duration-300 hover:scale-105"
                style={{
                  background:
                    "linear-gradient(135deg, #DAA520 0%, #FFD700 50%, #DAA520 100%)",
                  color: "#3D0000",
                  boxShadow:
                    "0 0 30px rgba(218,165,32,0.3), 0 4px 15px rgba(0,0,0,0.5)",
                  border: "1px solid rgba(255,215,0,0.5)",
                }}
              >
                <span className="relative z-10">Open Invitation</span>
                <div
                  className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(135deg, #FFD700 0%, #FFF8DC 50%, #FFD700 100%)",
                  }}
                />
              </button>
            </motion.div>

            {/* Auto-open hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 text-[10px] tracking-wider uppercase"
              style={{ color: "#DAA52060" }}
            >
              Opens automatically in a moment...
            </motion.p>
          </div>

          {/* Stage floor gradient behind curtains */}
          <div
            className="fixed inset-0 z-[45]"
            style={{
              background:
                "radial-gradient(ellipse at 50% 80%, rgba(139,0,0,0.15) 0%, #0A0505 70%)",
            }}
          />
        </>
      )}

      {/* ========== MAIN CONTENT ========== */}
      <div
        ref={contentRef}
        style={{ opacity: curtainsOpen ? 1 : 0 }}
      >
        {/* Dark background texture */}
        <div
          className="pointer-events-none fixed inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20px 20px, #DAA520 0.5px, transparent 0.5px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Top decorative bar */}
        <div
          className="relative z-10 h-1 w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, #DAA520, transparent)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-2xl px-4 py-16">
          {/* ---- Hero Section ---- */}
          <motion.section
            className="mb-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={curtainsOpen ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Couple Photo */}
            {(invite.heroImage ?? invite.couplePhoto) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={curtainsOpen ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="mx-auto mb-10 h-52 w-52 overflow-hidden rounded-full shadow-2xl sm:h-60 sm:w-60"
                style={{
                  border: "3px solid #DAA520",
                  boxShadow:
                    "0 0 50px rgba(218,165,32,0.2), 0 0 100px rgba(139,0,0,0.15)",
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

            {/* Invitation preamble */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={curtainsOpen ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="mb-2 text-xs tracking-[0.35em] uppercase"
              style={{ color: "#DAA520" }}
            >
              Together with their families
            </motion.p>

            {/* Parents */}
            {(invite.groomFatherName ?? invite.brideFatherName) && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={curtainsOpen ? { opacity: 1 } : {}}
                transition={{ delay: 0.55 }}
                className="mb-6 text-sm"
                style={{ color: "#B8860B" }}
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
              animate={curtainsOpen ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <h1
                className="font-serif text-5xl font-light sm:text-6xl lg:text-7xl"
                style={{
                  color: "#FFD700",
                  textShadow: "0 2px 20px rgba(218,165,32,0.3)",
                }}
              >
                {invite.groomName}
              </h1>

              <div className="my-4 flex items-center justify-center gap-4">
                <div
                  className="h-px w-20"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, #DAA520, transparent)",
                  }}
                />
                <Heart
                  className="h-5 w-5"
                  style={{
                    color: "#8B0000",
                    filter: "drop-shadow(0 0 4px rgba(139,0,0,0.5))",
                  }}
                  fill="#8B0000"
                />
                <div
                  className="h-px w-20"
                  style={{
                    background:
                      "linear-gradient(to left, transparent, #DAA520, transparent)",
                  }}
                />
              </div>

              <h1
                className="font-serif text-5xl font-light sm:text-6xl lg:text-7xl"
                style={{
                  color: "#FFD700",
                  textShadow: "0 2px 20px rgba(218,165,32,0.3)",
                }}
              >
                {invite.brideName}
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={curtainsOpen ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-6 text-lg italic"
              style={{ color: "#B8860B" }}
            >
              Request the honour of your presence
            </motion.p>
          </motion.section>

          {/* ---- Scratch Reveal Date Section ---- */}
          <motion.section
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={curtainsOpen ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <h2
              className="mb-3 text-center font-serif text-2xl sm:text-3xl"
              style={{ color: "#FFD700" }}
            >
              Save the Date
            </h2>
            <p
              className="mb-8 text-center text-xs tracking-[0.2em] uppercase"
              style={{ color: "#DAA52080" }}
            >
              Scratch to reveal the wedding date
            </p>

            <div className="flex items-center justify-center gap-6 sm:gap-10">
              <ScratchCircle
                label="Day"
                value={dateParts.day}
                isRevealed={revealedCircles.has("day")}
                onReveal={() => revealCircle("day")}
                delay={1.0}
              />
              <ScratchCircle
                label="Month"
                value={dateParts.month}
                isRevealed={revealedCircles.has("month")}
                onReveal={() => revealCircle("month")}
                delay={1.15}
              />
              <ScratchCircle
                label="Year"
                value={dateParts.year}
                isRevealed={revealedCircles.has("year")}
                onReveal={() => revealCircle("year")}
                delay={1.3}
              />
            </div>

            {/* Full date reveal after all circles are tapped */}
            <AnimatePresence>
              {revealedCircles.size === 3 && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-6 text-center text-lg"
                  style={{ color: "#E8D5B5" }}
                >
                  {formatWeddingDate(invite.weddingDate)}
                  {invite.weddingTime ? ` at ${invite.weddingTime}` : ""}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.section>

          {/* ---- Countdown Timer ---- */}
          <motion.section
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={curtainsOpen ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <p
              className="mb-6 text-center text-xs tracking-[0.25em] uppercase"
              style={{ color: "#DAA520" }}
            >
              Time remaining
            </p>
            <div className="flex items-center justify-center gap-3 sm:gap-5">
              {(
                [
                  { label: "Days", value: countdown.days },
                  { label: "Hours", value: countdown.hours },
                  { label: "Minutes", value: countdown.minutes },
                  { label: "Seconds", value: countdown.seconds },
                ] as const
              ).map((item, i) => (
                <motion.div
                  key={item.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 15 }}
                  animate={curtainsOpen ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.1 + i * 0.1 }}
                >
                  <div
                    className="flex h-18 w-18 items-center justify-center rounded-lg text-3xl font-bold sm:h-20 sm:w-20 sm:text-4xl"
                    style={{
                      backgroundColor: "rgba(139,0,0,0.15)",
                      border: "1px solid #DAA520",
                      color: "#FFD700",
                      boxShadow:
                        "0 0 15px rgba(218,165,32,0.1), inset 0 0 20px rgba(139,0,0,0.1)",
                    }}
                  >
                    {item.value}
                  </div>
                  <p
                    className="mt-2 text-[10px] font-medium tracking-[0.15em] uppercase"
                    style={{ color: "#B8860B" }}
                  >
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ---- Venue Section ---- */}
          {invite.venue && (
            <motion.section
              className="mb-20 rounded-xl p-8 text-center sm:p-10"
              style={{
                backgroundColor: "rgba(139,0,0,0.08)",
                border: "1px solid rgba(218,165,32,0.15)",
                boxShadow: "0 0 30px rgba(139,0,0,0.1)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={curtainsOpen ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <MapPin
                className="mx-auto mb-4 h-8 w-8"
                style={{ color: "#DAA520" }}
              />
              <h2
                className="mb-2 font-serif text-2xl sm:text-3xl"
                style={{ color: "#FFD700" }}
              >
                {invite.venue}
              </h2>
              {invite.venueAddress && (
                <p className="text-sm" style={{ color: "#B8860B" }}>
                  {invite.venueAddress}
                </p>
              )}

              {/* Decorative divider */}
              <div className="mt-6 flex items-center justify-center gap-3">
                <div
                  className="h-px w-12"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, #DAA52066)",
                  }}
                />
                <div
                  className="h-2 w-2 rotate-45"
                  style={{ backgroundColor: "#DAA520" }}
                />
                <div
                  className="h-px w-12"
                  style={{
                    background:
                      "linear-gradient(to left, transparent, #DAA52066)",
                  }}
                />
              </div>
            </motion.section>
          )}

          {/* ---- Events Section ---- */}
          {invite.events && invite.events.length > 0 && (
            <motion.section
              className="mb-20"
              initial={{ opacity: 0, y: 20 }}
              animate={curtainsOpen ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.3, duration: 0.6 }}
            >
              <h2
                className="mb-8 text-center font-serif text-2xl sm:text-3xl"
                style={{ color: "#FFD700" }}
              >
                Wedding Events
              </h2>
              <div className="space-y-4">
                {invite.events.map((event, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    animate={curtainsOpen ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 1.4 + i * 0.12 }}
                    className="rounded-lg p-5 text-center"
                    style={{
                      backgroundColor: "rgba(139,0,0,0.06)",
                      border: "1px solid rgba(218,165,32,0.1)",
                    }}
                  >
                    <h3
                      className="mb-1 font-serif text-xl"
                      style={{ color: "#FFD700" }}
                    >
                      {event.name}
                    </h3>
                    <p className="text-sm" style={{ color: "#DAA520" }}>
                      {event.date} {event.time ? `at ${event.time}` : ""}
                    </p>
                    <p className="mt-1 text-sm" style={{ color: "#B8860B" }}>
                      {event.venue}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* ---- Story / Couple Message ---- */}
          {(invite.story ?? invite.coupleMessage) && (
            <motion.section
              className="mb-20 rounded-xl p-8 text-center sm:p-10"
              style={{
                backgroundColor: "rgba(139,0,0,0.06)",
                border: "1px solid rgba(218,165,32,0.1)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={curtainsOpen ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <div className="mx-auto mb-4 flex items-center justify-center gap-3">
                <div
                  className="h-px w-10"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, #DAA52040)",
                  }}
                />
                <Heart
                  className="h-4 w-4"
                  style={{ color: "#8B0000" }}
                  fill="#8B0000"
                />
                <div
                  className="h-px w-10"
                  style={{
                    background:
                      "linear-gradient(to left, transparent, #DAA52040)",
                  }}
                />
              </div>

              <h2
                className="mb-5 font-serif text-2xl sm:text-3xl"
                style={{ color: "#FFD700" }}
              >
                Our Story
              </h2>
              <p
                className="mx-auto max-w-lg leading-relaxed"
                style={{ color: "#D4B896" }}
              >
                {invite.story ?? invite.coupleMessage}
              </p>
            </motion.section>
          )}

          {/* ---- Gallery ---- */}
          {invite.galleryImages.length > 0 && (
            <motion.section
              className="mb-20"
              initial={{ opacity: 0, y: 20 }}
              animate={curtainsOpen ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              <h2
                className="mb-6 text-center font-serif text-2xl sm:text-3xl"
                style={{ color: "#FFD700" }}
              >
                Gallery
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {invite.galleryImages.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={curtainsOpen ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 1.6 + i * 0.08 }}
                    className="aspect-square overflow-hidden rounded-lg shadow-lg"
                    style={{
                      border: "1px solid rgba(218,165,32,0.2)",
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

          {/* ---- RSVP & Actions ---- */}
          <motion.section
            className="mb-16 flex flex-col items-center gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={curtainsOpen ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            <Button
              size="lg"
              className="w-full max-w-xs text-white shadow-xl"
              style={{
                background:
                  "linear-gradient(135deg, #8B0000 0%, #A00000 50%, #8B0000 100%)",
                border: "1px solid rgba(218,165,32,0.3)",
                boxShadow:
                  "0 4px 20px rgba(139,0,0,0.4), 0 0 10px rgba(218,165,32,0.1)",
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
                  color: "#DAA520",
                  backgroundColor: "rgba(139,0,0,0.1)",
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
                  color: "#DAA520",
                  backgroundColor: "rgba(139,0,0,0.1)",
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
            animate={curtainsOpen ? { opacity: 1 } : {}}
            transition={{ delay: 1.8 }}
          >
            {/* Decorative line */}
            <div
              className="mx-auto mb-6 h-px w-40"
              style={{
                background:
                  "linear-gradient(to right, transparent, #DAA52040, transparent)",
              }}
            />

            <p
              className="font-serif text-lg italic"
              style={{ color: "#B8860B" }}
            >
              We can&apos;t wait to celebrate with you!
            </p>
            <p
              className="mt-2 text-sm"
              style={{ color: "#DAA52060" }}
            >
              {invite.groomName} & {invite.brideName}
            </p>

            <CardoraWatermark className="mt-10 pb-8 text-center text-xs text-amber-800/30" />
          </motion.footer>
        </div>

        {/* Bottom decorative bar */}
        <div
          className="relative z-10 h-1 w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, #DAA520, transparent)",
          }}
        />
      </div>

      {/* RSVP Modal */}
      <RsvpModal
        open={rsvpOpen}
        onOpenChange={setRsvpOpen}
        inviteSlug={invite.slug}
      />
    </div>
  );
}
