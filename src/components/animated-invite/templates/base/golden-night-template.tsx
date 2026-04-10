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
import { StaggeredTextReveal } from "../../shared/staggered-text-reveal";
import { ParallaxImage } from "../../shared/parallax-image";
import { ParallaxCards } from "../../shared/parallax-cards";
import { MagneticButton } from "../../shared/magnetic-button";
import { CurvedDivider } from "../../shared/curved-divider";
import { useMusicPlayer } from "@/hooks/use-music-player";
import { useCountdown } from "@/hooks/use-countdown";
import { useLenis } from "@/hooks/use-lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap-setup";
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
/*  Color constants                                                           */
/* -------------------------------------------------------------------------- */

const NAVY = "#0a0a2e";
const GOLD = "#FFD700";
const GOLD_DIM = "rgba(255,215,0,0.25)";
const GOLD_GLOW = "rgba(255,215,0,0.15)";

/* -------------------------------------------------------------------------- */
/*  Moon Crescent SVG                                                         */
/* -------------------------------------------------------------------------- */

function MoonCrescent({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      className={className ?? "h-16 w-16"}
    >
      <circle cx="30" cy="30" r="24" fill="rgba(255,215,0,0.1)" />
      <path
        d="M38 10 A22 22 0 1 0 38 50 A16 16 0 1 1 38 10Z"
        fill="rgba(255,215,0,0.15)"
        stroke="rgba(255,215,0,0.3)"
        strokeWidth="0.5"
      />
      {/* Glow effect */}
      <circle cx="30" cy="30" r="28" fill="none" stroke="rgba(255,215,0,0.05)" strokeWidth="4" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Animated Star / Sparkle SVG                                               */
/* -------------------------------------------------------------------------- */

function AnimatedStar({
  x,
  y,
  size,
  delay,
}: {
  x: number;
  y: number;
  size: number;
  delay: number;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        opacity: [0.2, 0.9, 0.2],
        scale: [0.8, 1.2, 0.8],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg width={size} height={size} viewBox="0 0 16 16">
        <path
          d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5Z"
          fill={GOLD}
          opacity="0.7"
        />
      </svg>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Star Field Background                                                     */
/* -------------------------------------------------------------------------- */

function StarField() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Static tiny stars */}
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={`dot-${i}`}
          className="absolute rounded-full"
          style={{
            width: 1 + Math.random() * 2,
            height: 1 + Math.random() * 2,
            backgroundColor: `rgba(255,255,255,${0.1 + Math.random() * 0.3})`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Animated sparkle stars */}
      {Array.from({ length: 12 }).map((_, i) => (
        <AnimatedStar
          key={`star-${i}`}
          x={Math.random() * 95}
          y={Math.random() * 95}
          size={6 + Math.random() * 10}
          delay={Math.random() * 4}
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Constellation Connector Lines                                             */
/* -------------------------------------------------------------------------- */

function ConstellationLine() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="my-12 flex origin-center items-center justify-center gap-4"
    >
      {/* Left constellation points */}
      <svg viewBox="0 0 80 20" className="h-4 w-20" fill="none">
        <circle cx="5" cy="10" r="1.5" fill={GOLD} opacity="0.6" />
        <line x1="5" y1="10" x2="30" y2="5" stroke={GOLD} strokeWidth="0.5" opacity="0.3" />
        <circle cx="30" cy="5" r="1" fill={GOLD} opacity="0.5" />
        <line x1="30" y1="5" x2="55" y2="12" stroke={GOLD} strokeWidth="0.5" opacity="0.3" />
        <circle cx="55" cy="12" r="1" fill={GOLD} opacity="0.5" />
        <line x1="55" y1="12" x2="75" y2="8" stroke={GOLD} strokeWidth="0.5" opacity="0.3" />
        <circle cx="75" cy="8" r="1.5" fill={GOLD} opacity="0.6" />
      </svg>

      {/* Center star */}
      <motion.svg
        width="18"
        height="18"
        viewBox="0 0 16 16"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <path
          d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5Z"
          fill={GOLD}
          opacity="0.6"
        />
      </motion.svg>

      {/* Right constellation points */}
      <svg viewBox="0 0 80 20" className="h-4 w-20" fill="none">
        <circle cx="5" cy="8" r="1.5" fill={GOLD} opacity="0.6" />
        <line x1="5" y1="8" x2="25" y2="14" stroke={GOLD} strokeWidth="0.5" opacity="0.3" />
        <circle cx="25" cy="14" r="1" fill={GOLD} opacity="0.5" />
        <line x1="25" y1="14" x2="50" y2="6" stroke={GOLD} strokeWidth="0.5" opacity="0.3" />
        <circle cx="50" cy="6" r="1" fill={GOLD} opacity="0.5" />
        <line x1="50" y1="6" x2="75" y2="10" stroke={GOLD} strokeWidth="0.5" opacity="0.3" />
        <circle cx="75" cy="10" r="1.5" fill={GOLD} opacity="0.6" />
      </svg>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Golden Night Template                                                     */
/* -------------------------------------------------------------------------- */

export default function GoldenNightTemplate({
  invite,
  isDemo,
}: TemplateProps) {
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

      // Parallax on star/night sky elements
      gsap.utils.toArray<HTMLElement>(".parallax-bg").forEach((el) => {
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
      ref={containerRef}
      className="relative min-h-screen overflow-hidden text-white"
      style={{
        background: `linear-gradient(to bottom, ${NAVY}, #1a1a3e, ${NAVY})`,
      }}
    >
      {/* ---- Star field background ---- */}
      <StarField />

      {/* ---- Gold particle layer ---- */}
      <ParticleLayer type="LIGHT" count={20} intensity="low" />

      {/* ---- Music toggle ---- */}
      {invite.musicUrl && (
        <MusicToggleButton
          isPlaying={isPlaying}
          onToggle={toggle}
          className="fixed right-4 top-4 z-50 rounded-full border border-amber-500/20 bg-[#0a0a2e]/80 p-3 shadow-lg shadow-amber-900/10 backdrop-blur-sm transition-colors hover:bg-[#1a1a3e]/90"
        />
      )}

      {/* ---- Demo banner ---- */}
      {isDemo && (
        <div
          className="relative z-20 py-2 text-center text-sm font-medium"
          style={{
            background: `linear-gradient(90deg, transparent, ${GOLD_DIM}, transparent)`,
            color: GOLD,
          }}
        >
          This is a demo preview. Complete payment to use your own details.
        </div>
      )}

      {/* ================================================================== */}
      {/*  HERO SECTION                                                      */}
      {/* ================================================================== */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-24">
        {/* Moon crescent decoration */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-8"
        >
          <MoonCrescent className="mx-auto h-20 w-20 sm:h-24 sm:w-24" />
        </motion.div>

        {/* Couple photo */}
        {invite.heroImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-10 h-52 w-52 overflow-hidden rounded-full sm:h-60 sm:w-60"
            style={{
              border: `2px solid ${GOLD_DIM}`,
              boxShadow: `0 0 50px ${GOLD_GLOW}, 0 0 100px rgba(255,215,0,0.05)`,
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
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-6 text-xs font-light uppercase tracking-[0.35em]"
          style={{ color: GOLD }}
        >
          Together with their families
        </motion.p>

        <div style={{ color: GOLD, textShadow: `0 0 40px ${GOLD_GLOW}, 0 0 80px rgba(255,215,0,0.08)` }}>
          <StaggeredTextReveal
            text={invite.groomName}
            splitBy="letter"
            as="h1"
            trigger="inView"
            className="justify-center text-center text-5xl font-light tracking-wide sm:text-7xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="my-5 flex items-center gap-5"
        >
          <div className="h-px w-14" style={{ backgroundColor: GOLD_DIM }} />
          <Heart
            className="h-5 w-5"
            style={{ color: GOLD }}
            fill="rgba(255,215,0,0.3)"
          />
          <div className="h-px w-14" style={{ backgroundColor: GOLD_DIM }} />
        </motion.div>

        <div style={{ color: GOLD, textShadow: `0 0 40px ${GOLD_GLOW}, 0 0 80px rgba(255,215,0,0.08)` }}>
          <StaggeredTextReveal
            text={invite.brideName}
            splitBy="letter"
            as="h1"
            trigger="inView"
            className="justify-center text-center text-5xl font-light tracking-wide sm:text-7xl"
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-8 text-sm font-light tracking-widest text-white/40"
        >
          Request the pleasure of your company
        </motion.p>

        {/* Subtle glow behind hero */}
        <div
          className="parallax-bg pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: `radial-gradient(circle, ${GOLD_GLOW} 0%, transparent 60%)`,
          }}
        />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-8 w-px"
            style={{ backgroundColor: GOLD_DIM }}
          />
        </motion.div>
      </section>

      {/* ================================================================== */}
      {/*  FAMILIES SECTION                                                  */}
      {/* ================================================================== */}
      {(invite.groomFatherName ??
        invite.groomMotherName ??
        invite.brideFatherName ??
        invite.brideMotherName) && (
        <section className="scroll-fade relative z-10 px-6 py-16">
          <ConstellationLine />

          <div className="mx-auto max-w-lg">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-10 text-center text-xs font-light uppercase tracking-[0.3em]"
              style={{ color: GOLD }}
            >
              Blessed by their families
            </motion.p>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="rounded-xl border p-6 text-center backdrop-blur-sm"
                style={{
                  borderColor: GOLD_DIM,
                  background: "rgba(255,215,0,0.03)",
                }}
              >
                <p
                  className="mb-2 text-xs uppercase tracking-[0.15em]"
                  style={{ color: GOLD }}
                >
                  Groom&apos;s Parents
                </p>
                {invite.groomFatherName && (
                  <p className="text-lg font-light text-white/70">
                    {invite.groomFatherName}
                  </p>
                )}
                {invite.groomMotherName && (
                  <p className="text-lg font-light text-white/70">
                    {invite.groomMotherName}
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="rounded-xl border p-6 text-center backdrop-blur-sm"
                style={{
                  borderColor: GOLD_DIM,
                  background: "rgba(255,215,0,0.03)",
                }}
              >
                <p
                  className="mb-2 text-xs uppercase tracking-[0.15em]"
                  style={{ color: GOLD }}
                >
                  Bride&apos;s Parents
                </p>
                {invite.brideFatherName && (
                  <p className="text-lg font-light text-white/70">
                    {invite.brideFatherName}
                  </p>
                )}
                {invite.brideMotherName && (
                  <p className="text-lg font-light text-white/70">
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
        <section className="scroll-fade relative z-10 px-6 py-20">
          <ConstellationLine />

          <div className="mx-auto max-w-lg text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-8 text-xs font-light uppercase tracking-[0.3em]"
              style={{ color: GOLD }}
            >
              Written in the Stars
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative rounded-2xl border p-8 backdrop-blur-sm sm:p-10"
              style={{
                borderColor: GOLD_DIM,
                background: "rgba(255,215,0,0.02)",
                boxShadow: `0 0 30px rgba(255,215,0,0.03)`,
              }}
            >
              {/* Decorative star corners */}
              <div className="absolute -left-2 -top-2">
                <svg width="12" height="12" viewBox="0 0 16 16">
                  <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5Z" fill={GOLD} opacity="0.4" />
                </svg>
              </div>
              <div className="absolute -bottom-2 -right-2">
                <svg width="12" height="12" viewBox="0 0 16 16">
                  <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5Z" fill={GOLD} opacity="0.4" />
                </svg>
              </div>

              <p className="text-base font-light leading-relaxed text-white/60">
                {invite.story}
              </p>

              {invite.coupleMessage && (
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="mt-6 border-t pt-6 text-sm italic text-white/40"
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
      <section className="scroll-fade relative z-10 px-6 py-20">
        <ConstellationLine />

        <div className="mx-auto max-w-lg">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center text-xs font-light uppercase tracking-[0.3em]"
            style={{ color: GOLD }}
          >
            The Celestial Evening
          </motion.p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Date */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-2xl border p-6 text-center backdrop-blur-sm"
              style={{
                borderColor: GOLD_DIM,
                background: "rgba(255,215,0,0.03)",
              }}
            >
              <Calendar className="mx-auto mb-3 h-5 w-5" style={{ color: GOLD }} />
              <p
                className="text-lg font-light"
                style={{
                  color: GOLD,
                  textShadow: `0 0 15px ${GOLD_GLOW}`,
                }}
              >
                {formatWeddingDate(invite.weddingDate)}
              </p>
              {invite.weddingTime && (
                <p className="mt-1 text-sm text-white/40">{invite.weddingTime}</p>
              )}
            </motion.div>

            {/* Venue */}
            {invite.venue && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="rounded-2xl border p-6 text-center backdrop-blur-sm"
                style={{
                  borderColor: GOLD_DIM,
                  background: "rgba(255,215,0,0.03)",
                }}
              >
                <MapPin className="mx-auto mb-3 h-5 w-5" style={{ color: GOLD }} />
                <p
                  className="text-lg font-light"
                  style={{
                    color: GOLD,
                    textShadow: `0 0 15px ${GOLD_GLOW}`,
                  }}
                >
                  {invite.venue}
                </p>
                {invite.venueAddress && (
                  <p className="mt-1 text-sm text-white/40">
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
              <p className="text-base text-white/50">
                {formatWeddingDate(invite.receptionDate)}
              </p>
            </motion.div>
          )}

          {/* Countdown */}
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
                Until the Stars Align
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
                    className="rounded-xl border px-2 py-4 backdrop-blur-sm"
                    style={{
                      borderColor: GOLD_DIM,
                      background: "rgba(255,215,0,0.03)",
                      boxShadow: `0 0 20px rgba(255,215,0,0.04)`,
                    }}
                    whileHover={{
                      boxShadow: `0 0 30px ${GOLD_GLOW}`,
                    }}
                  >
                    <p
                      className="text-3xl font-light sm:text-4xl"
                      style={{
                        color: GOLD,
                        textShadow: `0 0 20px ${GOLD_GLOW}`,
                      }}
                    >
                      {String(item.value).padStart(2, "0")}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-white/30">
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
        <section className="scroll-fade relative z-10 px-6 py-16">
          <ConstellationLine />

          <div className="mx-auto max-w-lg">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12 text-center text-xs font-light uppercase tracking-[0.3em]"
              style={{ color: GOLD }}
            >
              The Evening Unfolds
            </motion.p>

            <ParallaxCards
              cards={invite.events.map((event, idx) => ({
                id: idx,
                content: (
                  <div
                    className="rounded-xl border p-6 backdrop-blur-sm"
                    style={{
                      borderColor: GOLD_DIM,
                      background: "rgba(255,215,0,0.03)",
                      boxShadow: `0 0 20px rgba(255,215,0,0.04)`,
                    }}
                  >
                    <p className="text-lg font-light" style={{ color: GOLD }}>
                      {event.name}
                    </p>
                    <p className="mt-1 text-sm text-white/40">
                      {event.date} {event.time && `at ${event.time}`}
                    </p>
                    {event.venue && (
                      <p className="mt-0.5 text-sm text-white/30">{event.venue}</p>
                    )}
                  </div>
                ),
              }))}
              cardClassName="mb-4"
            />
          </div>
        </section>
      )}

      {/* Gold-tinted section divider */}
      {invite.galleryImages.length > 0 && (
        <CurvedDivider color={GOLD} height={60} className="relative z-10" />
      )}

      {/* ================================================================== */}
      {/*  GALLERY SECTION                                                   */}
      {/* ================================================================== */}
      {invite.galleryImages.length > 0 && (
        <section className="scroll-fade relative z-10 px-6 py-16">
          <ConstellationLine />

          <div className="mx-auto max-w-2xl">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12 text-center text-xs font-light uppercase tracking-[0.3em]"
              style={{ color: GOLD }}
            >
              Captured Moments
            </motion.p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {invite.galleryImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  className="aspect-square overflow-hidden rounded-xl border"
                  style={{
                    borderColor: GOLD_DIM,
                    boxShadow: `0 0 15px rgba(255,215,0,0.04)`,
                  }}
                >
                  <ParallaxImage
                    src={img}
                    alt={`Gallery image ${idx + 1}`}
                    speed={15}
                    scaleRange={[1, 1.12]}
                    className="h-full w-full"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gold-tinted section divider */}
      <CurvedDivider color={GOLD} height={60} flip className="relative z-10" />

      {/* ================================================================== */}
      {/*  RSVP SECTION                                                      */}
      {/* ================================================================== */}
      <section className="scroll-fade relative z-10 px-6 py-20">
        <ConstellationLine />

        <div className="mx-auto max-w-sm text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <MoonCrescent className="mx-auto mb-6 h-12 w-12" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-3 text-xs font-light uppercase tracking-[0.3em]"
            style={{ color: GOLD }}
          >
            Join Us Under the Stars
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-10 text-sm font-light text-white/40"
          >
            Your presence will illuminate our evening with joy and love.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col items-center gap-3"
          >
            <MagneticButton strength={0.3} className="w-full">
              <Button
                size="lg"
                onClick={() => setRsvpOpen(true)}
                className="w-full rounded-xl border-0 px-10 py-6 text-sm font-light uppercase tracking-widest shadow-lg transition-all hover:shadow-xl"
                style={{
                  background: `linear-gradient(135deg, ${GOLD}, #FFA500)`,
                  color: NAVY,
                  boxShadow: `0 4px 25px rgba(255,215,0,0.25)`,
                }}
              >
                RSVP
              </Button>
            </MagneticButton>

            <div className="flex w-full gap-2">
              <Button
                variant="outline"
                size="lg"
                onClick={() => void handleShare()}
                className="flex-1 rounded-xl bg-transparent py-6 text-xs uppercase tracking-wider text-white/60 hover:bg-white/5"
                style={{ borderColor: GOLD_DIM }}
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
                className="rounded-xl bg-transparent px-4 py-6 text-white/60 hover:bg-white/5"
                style={{ borderColor: GOLD_DIM }}
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
      <footer className="scroll-fade relative z-10 px-6 pb-12 pt-8">
        <ConstellationLine />

        <div className="mx-auto max-w-sm text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <MoonCrescent className="mx-auto mb-4 h-10 w-10 opacity-40" />
            <p
              className="text-lg font-light tracking-wide"
              style={{
                color: GOLD,
                textShadow: `0 0 15px ${GOLD_GLOW}`,
              }}
            >
              {invite.groomName} & {invite.brideName}
            </p>
            {invite.weddingDate && (
              <p className="mt-1 text-xs text-white/25">
                {formatWeddingDate(invite.weddingDate)}
              </p>
            )}
          </motion.div>

          <CardoraWatermark className="mt-10 pb-4 text-center text-[10px] text-white/15" />
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
