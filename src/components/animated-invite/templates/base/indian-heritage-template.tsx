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

function MandalaOrnament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "h-32 w-32"}
    >
      {/* Outer ring of petals */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = i * 30;
        return (
          <ellipse
            key={`outer-${i}`}
            cx="100"
            cy="30"
            rx="8"
            ry="20"
            fill="currentColor"
            opacity="0.15"
            transform={`rotate(${angle} 100 100)`}
          />
        );
      })}
      {/* Middle ring */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = i * 45 + 22.5;
        return (
          <ellipse
            key={`mid-${i}`}
            cx="100"
            cy="50"
            rx="6"
            ry="15"
            fill="currentColor"
            opacity="0.2"
            transform={`rotate(${angle} 100 100)`}
          />
        );
      })}
      {/* Inner ring */}
      {Array.from({ length: 6 }, (_, i) => {
        const angle = i * 60;
        return (
          <ellipse
            key={`inner-${i}`}
            cx="100"
            cy="65"
            rx="5"
            ry="12"
            fill="currentColor"
            opacity="0.25"
            transform={`rotate(${angle} 100 100)`}
          />
        );
      })}
      {/* Outer circle */}
      <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      {/* Center */}
      <circle cx="100" cy="100" r="15" fill="currentColor" opacity="0.15" />
      <circle cx="100" cy="100" r="8" fill="currentColor" opacity="0.25" />
      <circle cx="100" cy="100" r="3" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function RangoliDivider({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "mx-auto my-8 h-12 w-72"}
    >
      {/* Left decorative line */}
      <line x1="30" y1="30" x2="130" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      {/* Right decorative line */}
      <line x1="270" y1="30" x2="370" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.3" />

      {/* Center paisley motif */}
      <path
        d="M200 10 Q215 10 220 20 Q225 30 215 35 Q205 40 195 35 Q185 30 185 20 Q185 10 200 10 Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        opacity="0.2"
      />
      <path
        d="M200 45 Q215 45 220 35 Q225 25 215 20 Q205 15 195 20 Q185 25 185 35 Q185 45 200 45 Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        opacity="0.15"
      />

      {/* Side diamonds */}
      <path d="M145 30 L155 22 L165 30 L155 38 Z" fill="currentColor" opacity="0.25" />
      <path d="M235 30 L245 22 L255 30 L245 38 Z" fill="currentColor" opacity="0.25" />

      {/* Small dots */}
      <circle cx="135" cy="30" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="175" cy="30" r="1.5" fill="currentColor" opacity="0.25" />
      <circle cx="225" cy="30" r="1.5" fill="currentColor" opacity="0.25" />
      <circle cx="265" cy="30" r="2" fill="currentColor" opacity="0.3" />

      {/* End ornaments */}
      <path d="M40 25 L50 30 L40 35" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
      <path d="M360 25 L350 30 L360 35" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />

      {/* Extra dots along the lines */}
      <circle cx="70" cy="30" r="1.5" fill="currentColor" opacity="0.2" />
      <circle cx="100" cy="30" r="1.5" fill="currentColor" opacity="0.2" />
      <circle cx="300" cy="30" r="1.5" fill="currentColor" opacity="0.2" />
      <circle cx="330" cy="30" r="1.5" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function DiyaLamp({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "h-16 w-12"}
    >
      {/* Flame */}
      <path
        d="M30 5 Q35 15 33 25 Q30 20 27 25 Q25 15 30 5 Z"
        fill="currentColor"
        opacity="0.6"
      />
      {/* Flame glow */}
      <ellipse cx="30" cy="18" rx="4" ry="6" fill="currentColor" opacity="0.15" />
      {/* Wick */}
      <line x1="30" y1="22" x2="30" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      {/* Lamp body */}
      <path
        d="M18 35 Q15 30 25 28 L35 28 Q45 30 42 35 Q48 45 45 55 L15 55 Q12 45 18 35 Z"
        fill="currentColor"
        opacity="0.2"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      {/* Base */}
      <ellipse cx="30" cy="55" rx="16" ry="4" fill="currentColor" opacity="0.15" />
      <path
        d="M14 55 Q14 62 22 65 L38 65 Q46 62 46 55"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="currentColor"
        opacity="0.12"
      />
      {/* Pedestal */}
      <rect x="24" y="65" width="12" height="4" rx="2" fill="currentColor" opacity="0.15" />
      <rect x="20" y="69" width="20" height="3" rx="1.5" fill="currentColor" opacity="0.12" />
      {/* Decorative dot on lamp body */}
      <circle cx="30" cy="42" r="3" fill="currentColor" opacity="0.15" />
      <circle cx="30" cy="42" r="1.5" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PaisleyCorner({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const transforms: Record<string, string> = {
    "top-left": "",
    "top-right": "scale(-1, 1)",
    "bottom-left": "scale(1, -1)",
    "bottom-right": "scale(-1, -1)",
  };

  return (
    <svg
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-24 w-24 sm:h-32 sm:w-32"
      style={{ transform: transforms[position] }}
    >
      {/* Main paisley */}
      <path
        d="M10 10 Q10 50 30 70 Q50 90 80 80 Q60 85 45 70 Q30 55 35 35 Q40 20 60 15 Q40 5 20 15 Z"
        fill="currentColor"
        opacity="0.12"
      />
      {/* Inner paisley details */}
      <path
        d="M25 25 Q25 45 38 55 Q48 63 60 58 Q50 60 42 52 Q35 45 38 32 Q42 22 55 20 Q42 15 30 22 Z"
        fill="currentColor"
        opacity="0.1"
      />
      {/* Dots along the paisley */}
      <circle cx="20" cy="30" r="2" fill="currentColor" opacity="0.2" />
      <circle cx="25" cy="45" r="1.5" fill="currentColor" opacity="0.2" />
      <circle cx="35" cy="58" r="1.5" fill="currentColor" opacity="0.2" />
      <circle cx="50" cy="65" r="2" fill="currentColor" opacity="0.2" />
      {/* Small leaf accent */}
      <ellipse cx="70" cy="15" rx="8" ry="3" fill="currentColor" opacity="0.1" transform="rotate(-30 70 15)" />
      <ellipse cx="15" cy="60" rx="3" ry="8" fill="currentColor" opacity="0.1" transform="rotate(-30 15 60)" />
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

export default function IndianHeritageTemplate({ invite, isDemo }: TemplateProps) {
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

      gsap.utils.toArray<HTMLElement>(".parallax-mandala").forEach((el) => {
        gsap.to(el, {
          yPercent: -12,
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
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-gradient-to-b from-orange-50 via-red-50/30 to-amber-50">
      {/* Decorative mandala backgrounds */}
      <div className="parallax-mandala pointer-events-none absolute -top-16 -left-16 z-0 text-orange-300">
        <MandalaOrnament className="h-64 w-64 opacity-30" />
      </div>
      <div className="parallax-mandala pointer-events-none absolute -right-20 top-1/4 z-0 text-red-300">
        <MandalaOrnament className="h-48 w-48 opacity-20" />
      </div>
      <div className="parallax-mandala pointer-events-none absolute -bottom-16 -left-12 z-0 text-amber-300">
        <MandalaOrnament className="h-56 w-56 opacity-25" />
      </div>
      <ParticleLayer type="LIGHT" />

      {/* Music toggle */}
      {invite.musicUrl && (
        <MusicToggleButton
          isPlaying={isPlaying}
          onToggle={toggle}
          className="fixed top-4 right-4 z-50 rounded-full border border-amber-300/50 bg-orange-50/80 p-3 shadow-lg backdrop-blur-sm transition-colors hover:bg-orange-100/80"
        />
      )}

      {/* Demo banner */}
      {isDemo && (
        <div className="relative z-10 bg-orange-500 py-2 text-center text-sm font-medium text-white">
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
          {/* Paisley corner ornaments */}
          <div className="pointer-events-none absolute -top-4 -left-2 text-orange-400">
            <PaisleyCorner position="top-left" />
          </div>
          <div className="pointer-events-none absolute -top-4 -right-2 text-orange-400">
            <PaisleyCorner position="top-right" />
          </div>

          {/* Ornamental card background */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl border-2 border-amber-300/40 bg-white/50 p-8 shadow-2xl shadow-orange-200/20 backdrop-blur-sm sm:p-12"
          >
            {/* Decorative inner border */}
            <div className="absolute inset-3 rounded-2xl border border-dashed border-amber-300/30 sm:inset-5" />

            <div className="relative">
              {/* Shubh Vivah header */}
              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
                className="mb-4"
              >
                <p
                  className="text-sm tracking-[0.5em] font-semibold uppercase"
                  style={{ color: "#b45309" }}
                >
                  Shubh Vivah
                </p>
                <p className="mt-1 text-xs tracking-widest text-amber-600 uppercase">
                  Wedding Ceremony
                </p>
              </motion.div>

              {/* Diya lamps flanking */}
              <motion.div
                className="mb-4 flex items-center justify-center gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <DiyaLamp className="h-12 w-9 text-amber-500" />
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-300" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-300" />
                <DiyaLamp className="h-12 w-9 -scale-x-100 text-amber-500" />
              </motion.div>

              {/* Couple photo */}
              {invite.heroImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                  className="mx-auto mb-8 h-56 w-56 overflow-hidden rounded-full shadow-xl sm:h-64 sm:w-64"
                  style={{
                    border: "4px solid rgba(245, 158, 11, 0.5)",
                    boxShadow: "0 0 30px rgba(245, 158, 11, 0.15), 0 0 60px rgba(234, 88, 12, 0.08)",
                  }}
                >
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${invite.heroImage})` }}
                  />
                </motion.div>
              )}

              {/* Couple Names */}
              <motion.div variants={fadeInUp} transition={{ duration: 0.8 }}>
                <h1
                  className="font-serif text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl"
                  style={{ color: "#9a3412" }}
                >
                  {invite.groomName}
                </h1>

                {/* Ornamental divider */}
                <div className="my-4 flex items-center justify-center gap-3">
                  <motion.div
                    className="h-px w-12 sm:w-20"
                    style={{ background: "linear-gradient(to right, transparent, #f59e0b)" }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  />
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
                  >
                    {/* Gold diamond with heart */}
                    <div className="relative flex h-10 w-10 items-center justify-center">
                      <div
                        className="absolute h-8 w-8 rotate-45 rounded-sm"
                        style={{ border: "1.5px solid #f59e0b", opacity: 0.6 }}
                      />
                      <Heart className="relative h-4 w-4" style={{ color: "#dc2626", fill: "#dc2626" }} />
                    </div>
                  </motion.div>
                  <motion.div
                    className="h-px w-12 sm:w-20"
                    style={{ background: "linear-gradient(to left, transparent, #f59e0b)" }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  />
                </div>

                <h1
                  className="font-serif text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl"
                  style={{ color: "#9a3412" }}
                >
                  {invite.brideName}
                </h1>
              </motion.div>

              {/* Invitation text */}
              <motion.p
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 font-serif text-lg"
                style={{ color: "#b45309" }}
              >
                Cordially invite you to bless the auspicious occasion of their wedding
              </motion.p>

              {/* Family names */}
              {(invite.groomFatherName ?? invite.brideFatherName) && (
                <motion.div
                  variants={fadeInUp}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-6 space-y-2"
                >
                  {invite.groomFatherName && invite.groomMotherName && (
                    <div
                      className="rounded-lg p-3 text-sm"
                      style={{ backgroundColor: "rgba(245, 158, 11, 0.08)", color: "#92400e" }}
                    >
                      <p className="text-xs tracking-wider text-amber-600 uppercase">
                        Groom&apos;s Parents
                      </p>
                      <p className="mt-1 font-medium">
                        {invite.groomFatherName} & {invite.groomMotherName}
                      </p>
                    </div>
                  )}
                  {invite.brideFatherName && invite.brideMotherName && (
                    <div
                      className="rounded-lg p-3 text-sm"
                      style={{ backgroundColor: "rgba(239, 68, 68, 0.05)", color: "#92400e" }}
                    >
                      <p className="text-xs tracking-wider text-red-400 uppercase">
                        Bride&apos;s Parents
                      </p>
                      <p className="mt-1 font-medium">
                        {invite.brideFatherName} & {invite.brideMotherName}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.section>

        {/* Rangoli divider */}
        <motion.div
          className="text-amber-500"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <RangoliDivider />
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
            <div className="rounded-2xl border border-amber-300/30 bg-white/50 p-8 text-center shadow-lg shadow-orange-200/10 backdrop-blur-sm">
              <h2
                className="mb-2 font-serif text-2xl"
                style={{ color: "#9a3412" }}
              >
                Counting Every Moment
              </h2>
              <p className="mb-6 text-xs tracking-wider text-amber-600 uppercase">
                Until the Big Day
              </p>
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
                    style={{
                      background: "linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(234, 88, 12, 0.05))",
                      border: "1px solid rgba(245, 158, 11, 0.2)",
                    }}
                    whileInView={{ scale: [0.8, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                  >
                    <span
                      className="font-serif text-3xl font-bold sm:text-4xl"
                      style={{ color: "#b45309" }}
                    >
                      {String(unit.value).padStart(2, "0")}
                    </span>
                    <span className="mt-1 text-xs tracking-wider text-amber-600 uppercase">
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
              className="text-amber-500"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <RangoliDivider />
            </motion.div>

            <motion.section
              className="scroll-fade mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="rounded-2xl border border-amber-300/30 bg-white/50 p-8 text-center shadow-lg shadow-orange-200/10 backdrop-blur-sm sm:p-10">
                {/* Mandala accent */}
                <div className="mx-auto mb-4 text-amber-400">
                  <MandalaOrnament className="mx-auto h-16 w-16 opacity-40" />
                </div>

                <motion.h2
                  className="mb-4 font-serif text-3xl"
                  style={{ color: "#9a3412" }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Our Love Story
                </motion.h2>

                <motion.p
                  className="leading-relaxed"
                  style={{ color: "#92400e" }}
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
            <div
              className="rounded-2xl border p-8 text-center backdrop-blur-sm sm:p-10"
              style={{
                borderColor: "rgba(245, 158, 11, 0.2)",
                background: "linear-gradient(135deg, rgba(254, 243, 199, 0.4), rgba(255, 237, 213, 0.3))",
              }}
            >
              <p
                className="font-serif text-lg leading-relaxed italic"
                style={{ color: "#92400e" }}
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
          className="text-amber-500"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <RangoliDivider />
        </motion.div>

        <motion.section
          className="scroll-fade mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="rounded-2xl border border-amber-300/30 bg-white/50 p-8 text-center shadow-lg shadow-orange-200/10 backdrop-blur-sm sm:p-10">
            <h2
              className="mb-2 font-serif text-3xl"
              style={{ color: "#9a3412" }}
            >
              Muhurat Details
            </h2>
            <p className="mb-8 text-xs tracking-wider text-amber-600 uppercase">
              Auspicious Date & Venue
            </p>

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
                  className="flex h-14 w-14 items-center justify-center rounded-full"
                  style={{
                    background: "linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(234, 88, 12, 0.1))",
                    border: "1px solid rgba(245, 158, 11, 0.3)",
                  }}
                >
                  <Calendar className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p
                    className="text-xl font-semibold"
                    style={{ color: "#9a3412" }}
                  >
                    {formatWeddingDate(invite.weddingDate)}
                  </p>
                  {invite.weddingTime && (
                    <p className="mt-1 text-sm text-amber-600">
                      at {invite.weddingTime}
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Decorative divider */}
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-10 bg-amber-300/40" />
                <div className="h-3 w-3 rotate-45 border border-amber-400/50 bg-amber-100/50" />
                <div className="h-px w-10 bg-amber-300/40" />
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
                    className="flex h-14 w-14 items-center justify-center rounded-full"
                    style={{
                      background: "linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(234, 88, 12, 0.08))",
                      border: "1px solid rgba(239, 68, 68, 0.2)",
                    }}
                  >
                    <MapPin className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <p
                      className="text-xl font-semibold"
                      style={{ color: "#9a3412" }}
                    >
                      {invite.venue}
                    </p>
                    {invite.venueAddress && (
                      <p className="mt-1 text-sm text-amber-600/80">
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
                    <div className="h-px w-10 bg-amber-300/40" />
                    <div className="h-3 w-3 rotate-45 border border-amber-400/50 bg-amber-100/50" />
                    <div className="h-px w-10 bg-amber-300/40" />
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
                    <p className="text-lg" style={{ color: "#9a3412" }}>
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
            <h2
              className="mb-2 text-center font-serif text-3xl"
              style={{ color: "#9a3412" }}
            >
              Wedding Events
            </h2>
            <p className="mb-8 text-center text-xs tracking-wider text-amber-600 uppercase">
              Celebrations & Functions
            </p>
            <div className="space-y-4">
              {invite.events.map((event, index) => (
                <motion.div
                  key={index}
                  className="rounded-xl border bg-white/50 p-6 text-center backdrop-blur-sm"
                  style={{
                    borderColor: "rgba(245, 158, 11, 0.2)",
                    background: index % 2 === 0
                      ? "linear-gradient(135deg, rgba(255, 237, 213, 0.4), rgba(254, 243, 199, 0.3))"
                      : "linear-gradient(135deg, rgba(254, 226, 226, 0.2), rgba(255, 237, 213, 0.3))",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <h3 className="font-serif text-xl" style={{ color: "#9a3412" }}>
                    {event.name}
                  </h3>
                  <p className="mt-2 text-sm text-amber-600">
                    {event.date} {event.time && `at ${event.time}`}
                  </p>
                  {event.venue && (
                    <p className="mt-1 text-sm text-amber-500/80">{event.venue}</p>
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
            <h2
              className="mb-8 text-center font-serif text-3xl"
              style={{ color: "#9a3412" }}
            >
              Precious Moments
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {invite.galleryImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  className="aspect-square overflow-hidden rounded-xl shadow-md"
                  style={{ border: "2px solid rgba(245, 158, 11, 0.2)" }}
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
          className="text-amber-500"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <RangoliDivider />
        </motion.div>

        <motion.section
          className="scroll-fade mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2
            className="mb-2 font-serif text-3xl"
            style={{ color: "#9a3412" }}
          >
            Grace Us With Your Presence
          </h2>
          <p className="mb-8 text-amber-600">
            Your blessings mean the world to us. Please let us know if you can attend.
          </p>

          {/* Diya accents */}
          <div className="mb-6 flex items-center justify-center gap-8">
            <DiyaLamp className="h-10 w-8 text-amber-400 opacity-60" />
            <DiyaLamp className="h-10 w-8 -scale-x-100 text-amber-400 opacity-60" />
          </div>

          <div className="flex flex-col items-center gap-4">
            <Button
              size="lg"
              className="w-full max-w-xs text-white shadow-lg"
              style={{
                background: "linear-gradient(135deg, #ea580c, #b45309)",
                boxShadow: "0 8px 20px rgba(234, 88, 12, 0.25)",
              }}
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
          className="relative text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Paisley corners */}
          <div className="pointer-events-none absolute -bottom-8 -left-2 text-orange-400">
            <PaisleyCorner position="bottom-left" />
          </div>
          <div className="pointer-events-none absolute -right-2 -bottom-8 text-orange-400">
            <PaisleyCorner position="bottom-right" />
          </div>

          {/* Small mandala */}
          <div className="mx-auto mb-4 text-amber-400">
            <MandalaOrnament className="mx-auto h-16 w-16 opacity-30" />
          </div>

          <p className="font-serif text-lg" style={{ color: "#9a3412" }}>
            {invite.groomName} & {invite.brideName}
          </p>
          <p className="mt-1 text-sm text-amber-600">
            {formatWeddingDate(invite.weddingDate)}
          </p>

          <CardoraWatermark className="mt-12 pb-8 text-center text-xs text-amber-400/60" />
        </motion.footer>
      </div>

      {/* RSVP Modal */}
      <RsvpModal open={rsvpOpen} onOpenChange={setRsvpOpen} inviteSlug={invite.slug} />
    </div>
  );
}
