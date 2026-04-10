"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RsvpModal } from "@/components/rsvp/rsvp-modal";
import { Share2, MapPin, Calendar, Heart, Download } from "lucide-react";
import { toast } from "sonner";
import { gsap, ScrollTrigger } from "@/lib/gsap-setup";
import { MusicToggleButton } from "../../shared/music-toggle-button";
import { CardoraWatermark } from "../../shared/cardora-watermark";
import { ParticleLayer } from "../../shared/particle-layer";
import {
  DecorativeBorder,
  FloralFrame,
  SparkleEffect,
  OrnamentalDivider,
  ElegantFrame,
  GoldenPattern,
} from "../../shared/decorative-elements";
import { useMusicPlayer } from "@/hooks/use-music-player";
import { useCountdown } from "@/hooks/use-countdown";
import { useLenis } from "@/hooks/use-lenis";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
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

function formatShortDate(dateStr: string | null) {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/* -------------------------------------------------------------------------- */
/*  Cinematic Text Reveal                                                      */
/* -------------------------------------------------------------------------- */

function CinematicReveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.0, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Gold Shimmer Button                                                        */
/* -------------------------------------------------------------------------- */

function ShimmerButton({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden rounded-sm border border-[#DAA520]/60 bg-[#DAA520]/10 px-10 py-4 text-xs font-light uppercase tracking-[0.25em] text-[#DAA520] backdrop-blur-sm transition-all duration-300 hover:bg-[#DAA520]/20 hover:shadow-[0_0_30px_rgba(218,165,32,0.2)] ${className ?? ""}`}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#DAA520]/20 to-transparent"
        animate={{ x: ["-100%", "200%"] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 2,
        }}
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Film Grain Overlay                                                         */
/* -------------------------------------------------------------------------- */

function FilmGrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[5] opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  Letterbox Bars                                                             */
/* -------------------------------------------------------------------------- */

function LetterboxBars() {
  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 right-0 left-0 z-[15] bg-black"
        initial={{ height: "50vh" }}
        animate={{ height: "3vh" }}
        transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none fixed right-0 bottom-0 left-0 z-[15] bg-black"
        initial={{ height: "50vh" }}
        animate={{ height: "3vh" }}
        transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Countdown Unit                                                             */
/* -------------------------------------------------------------------------- */

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-sm border border-[#DAA520]/30 bg-[#DAA520]/5 shadow-[0_0_20px_rgba(218,165,32,0.08)] backdrop-blur-sm sm:h-24 sm:w-24">
        <span className="font-serif text-3xl font-light text-[#DAA520] sm:text-4xl">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="mt-3 text-[10px] font-light uppercase tracking-[0.3em] text-[#DAA520]/60">
        {label}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Template Component                                                    */
/* -------------------------------------------------------------------------- */

export default function CinematicFilmTemplate({
  invite,
  isDemo,
}: TemplateProps) {
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const { isPlaying, toggle } = useMusicPlayer(invite.musicUrl);
  const countdown = useCountdown(invite.weddingDate);
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth scrolling
  useLenis();

  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (reducedMotion) return;
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Animate each cinematic section into view
      gsap.utils.toArray<HTMLElement>(".cinematic-section").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // Parallax effect on gallery images
      gsap.utils.toArray<HTMLElement>(".film-gallery-img").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 1.15 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      // Title text split animation
      gsap.utils
        .toArray<HTMLElement>(".film-title-line")
        .forEach((el, index) => {
          gsap.fromTo(
            el,
            { opacity: 0, x: index % 2 === 0 ? -40 : 40 },
            {
              opacity: 1,
              x: 0,
              duration: 1.5,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            },
          );
        });
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  /* Share handler */
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
        /* fall through to clipboard */
      }
    }
    await navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  }

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#0a0a0a] text-[#faf0e6]"
    >
      {/* ================================================================== */}
      {/*  GLOBAL LAYERS                                                     */}
      {/* ================================================================== */}

      {/* Cinematic letterbox bars */}
      {!reducedMotion && <LetterboxBars />}

      {/* Film grain texture */}
      <FilmGrainOverlay />

      {/* Particle layer - rose petals */}
      {!reducedMotion && (
        <ParticleLayer type="PETAL" count={20} intensity="low" />
      )}

      {/* Golden pattern background overlay */}
      <GoldenPattern />

      {/* Music toggle */}
      {invite.musicUrl && (
        <MusicToggleButton
          isPlaying={isPlaying}
          onToggle={toggle}
          className="fixed top-8 right-4 z-50 rounded-full border border-[#DAA520]/30 bg-black/60 p-3 shadow-lg backdrop-blur-md transition-colors hover:bg-black/80"
        />
      )}

      {/* Demo banner */}
      {isDemo && (
        <div className="relative z-20 bg-[#DAA520] py-2 text-center text-sm font-medium text-black">
          This is a demo preview. Complete payment to use your own details.
        </div>
      )}

      {/* ================================================================== */}
      {/*  SECTION 1 - HERO                                                  */}
      {/* ================================================================== */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Hero background image with Ken Burns effect */}
        {invite.heroImage && (
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${invite.heroImage})` }}
            animate={reducedMotion ? {} : { scale: [1, 1.15] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        )}

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0a0a0a]" />

        {/* Decorative layers */}
        <DecorativeBorder color="#DAA520" />
        <SparkleEffect count={16} color="#DAA520" />
        <ElegantFrame />

        {/* Hero content */}
        <div className="relative z-10 px-6 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 3 }}
            className="mb-6 text-xs font-light uppercase tracking-[0.4em] text-[#DAA520]/70"
          >
            Together with their families
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 3.3 }}
            className="font-serif text-6xl font-light leading-tight text-white sm:text-7xl lg:text-8xl"
          >
            {invite.groomName}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 3.8, type: "spring" }}
            className="my-6 flex items-center justify-center gap-6"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#DAA520]/50 sm:w-24" />
            <Heart className="h-5 w-5 text-[#DAA520]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#DAA520]/50 sm:w-24" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 4.0 }}
            className="font-serif text-6xl font-light leading-tight text-white sm:text-7xl lg:text-8xl"
          >
            {invite.brideName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 4.5 }}
            className="mt-8 font-serif text-lg font-light tracking-wide text-[#faf0e6]/60 italic"
          >
            Request the pleasure of your company
          </motion.p>

          {/* Wedding date teaser */}
          {invite.weddingDate && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 5.0 }}
              className="mt-4 text-sm font-light tracking-[0.2em] text-[#DAA520]/60"
            >
              {formatShortDate(invite.weddingDate)}
            </motion.p>
          )}

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 5.5 }}
            className="mt-16"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mx-auto h-10 w-px bg-gradient-to-b from-[#DAA520]/40 to-transparent"
            />
            <p className="mt-3 text-[10px] font-light uppercase tracking-[0.3em] text-[#DAA520]/30">
              Scroll
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  SECTION 2 - OUR STORY                                             */}
      {/* ================================================================== */}
      {(invite.story ?? invite.coupleMessage) && (
        <section className="cinematic-section relative overflow-hidden px-6 py-32">
          {/* Background accent */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]" />
          <FloralFrame color="#DAA520" />

          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <OrnamentalDivider color="#DAA520" />

            <CinematicReveal delay={0.1}>
              <p className="mb-3 text-xs font-light uppercase tracking-[0.4em] text-[#DAA520]/60">
                Chapter One
              </p>
              <h2 className="film-title-line font-serif text-4xl font-light text-[#DAA520] sm:text-5xl">
                Our Love Story
              </h2>
            </CinematicReveal>

            <CinematicReveal delay={0.3}>
              <div className="my-8 flex items-center justify-center gap-4">
                <div className="h-px w-12 bg-[#DAA520]/20" />
                <Heart className="h-4 w-4 text-[#DAA520]/40" />
                <div className="h-px w-12 bg-[#DAA520]/20" />
              </div>
            </CinematicReveal>

            {invite.story && (
              <CinematicReveal delay={0.5}>
                <p className="font-serif text-lg leading-[2] font-light text-[#faf0e6]/70">
                  {invite.story}
                </p>
              </CinematicReveal>
            )}

            {invite.coupleMessage && (
              <CinematicReveal delay={0.7}>
                <div className="mt-12 rounded-sm border border-[#DAA520]/10 bg-[#DAA520]/[0.03] p-8">
                  <p className="font-serif text-base leading-relaxed text-[#faf0e6]/50 italic">
                    &ldquo;{invite.coupleMessage}&rdquo;
                  </p>
                </div>
              </CinematicReveal>
            )}

            {/* Family names */}
            {(invite.groomFatherName ?? invite.brideFatherName) && (
              <CinematicReveal delay={0.9}>
                <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
                  {invite.groomFatherName && invite.groomMotherName && (
                    <div className="text-center">
                      <p className="mb-2 text-[10px] font-light uppercase tracking-[0.3em] text-[#DAA520]/40">
                        Groom&apos;s Parents
                      </p>
                      <p className="font-serif text-sm font-light text-[#faf0e6]/50">
                        {invite.groomFatherName} &amp;{" "}
                        {invite.groomMotherName}
                      </p>
                    </div>
                  )}
                  {invite.brideFatherName && invite.brideMotherName && (
                    <div className="text-center">
                      <p className="mb-2 text-[10px] font-light uppercase tracking-[0.3em] text-[#DAA520]/40">
                        Bride&apos;s Parents
                      </p>
                      <p className="font-serif text-sm font-light text-[#faf0e6]/50">
                        {invite.brideFatherName} &amp;{" "}
                        {invite.brideMotherName}
                      </p>
                    </div>
                  )}
                </div>
              </CinematicReveal>
            )}

            <div className="mt-16">
              <OrnamentalDivider color="#DAA520" />
            </div>
          </div>
        </section>
      )}

      {/* ================================================================== */}
      {/*  SECTION 3 - WEDDING DETAILS                                       */}
      {/* ================================================================== */}
      <section className="cinematic-section relative overflow-hidden px-6 py-32">
        {/* Subtle background shift */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0b08] to-[#0a0a0a]" />
        <ElegantFrame />

        <div className="relative z-10 mx-auto max-w-2xl">
          <CinematicReveal>
            <p className="mb-3 text-center text-xs font-light uppercase tracking-[0.4em] text-[#DAA520]/60">
              Chapter Two
            </p>
            <h2 className="film-title-line text-center font-serif text-4xl font-light text-[#DAA520] sm:text-5xl">
              The Celebration
            </h2>
          </CinematicReveal>

          <CinematicReveal delay={0.2}>
            <div className="my-12 flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-[#DAA520]/20" />
              <Heart className="h-4 w-4 text-[#DAA520]/40" />
              <div className="h-px w-12 bg-[#DAA520]/20" />
            </div>
          </CinematicReveal>

          {/* Main wedding details */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {/* Date Card */}
            <CinematicReveal delay={0.3}>
              <div className="rounded-sm border border-[#DAA520]/15 bg-[#DAA520]/[0.03] p-8 text-center backdrop-blur-sm">
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#DAA520]/20">
                  <Calendar className="h-5 w-5 text-[#DAA520]/70" />
                </div>
                <p className="mb-1 text-[10px] font-light uppercase tracking-[0.3em] text-[#DAA520]/40">
                  The Date
                </p>
                <p className="font-serif text-xl font-light text-[#faf0e6]">
                  {formatWeddingDate(invite.weddingDate)}
                </p>
                {invite.weddingTime && (
                  <p className="mt-2 text-sm font-light text-[#faf0e6]/40">
                    at {invite.weddingTime}
                  </p>
                )}
              </div>
            </CinematicReveal>

            {/* Venue Card */}
            {invite.venue && (
              <CinematicReveal delay={0.5}>
                <div className="rounded-sm border border-[#DAA520]/15 bg-[#DAA520]/[0.03] p-8 text-center backdrop-blur-sm">
                  <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#DAA520]/20">
                    <MapPin className="h-5 w-5 text-[#DAA520]/70" />
                  </div>
                  <p className="mb-1 text-[10px] font-light uppercase tracking-[0.3em] text-[#DAA520]/40">
                    The Venue
                  </p>
                  <p className="font-serif text-xl font-light text-[#faf0e6]">
                    {invite.venue}
                  </p>
                  {invite.venueAddress && (
                    <p className="mt-2 text-sm font-light text-[#faf0e6]/40">
                      {invite.venueAddress}
                    </p>
                  )}
                </div>
              </CinematicReveal>
            )}
          </div>

          {/* Reception */}
          {invite.receptionDate && (
            <CinematicReveal delay={0.6}>
              <div className="mt-8 text-center">
                <p className="mb-1 text-[10px] font-light uppercase tracking-[0.2em] text-[#DAA520]/40">
                  Reception
                </p>
                <p className="font-serif text-lg font-light text-[#faf0e6]/60">
                  {formatWeddingDate(invite.receptionDate)}
                </p>
              </div>
            </CinematicReveal>
          )}

          {/* Events */}
          {invite.events && invite.events.length > 0 && (
            <div className="mt-16">
              <CinematicReveal delay={0.2}>
                <p className="mb-10 text-center text-xs font-light uppercase tracking-[0.4em] text-[#DAA520]/50">
                  Schedule of Events
                </p>
              </CinematicReveal>

              <div className="space-y-6">
                {invite.events.map((event, index) => (
                  <CinematicReveal key={index} delay={0.3 + index * 0.15}>
                    <div className="rounded-sm border border-[#DAA520]/10 bg-[#DAA520]/[0.02] p-6 text-center backdrop-blur-sm transition-colors duration-300 hover:border-[#DAA520]/25">
                      <h3 className="font-serif text-lg font-light text-[#DAA520]/80">
                        {event.name}
                      </h3>
                      <p className="mt-2 text-sm font-light text-[#faf0e6]/40">
                        {event.date}{" "}
                        {event.time && (
                          <span className="text-[#faf0e6]/30">
                            at {event.time}
                          </span>
                        )}
                      </p>
                      {event.venue && (
                        <p className="mt-1 text-sm font-light text-[#faf0e6]/30">
                          <MapPin className="mr-1 inline h-3 w-3" />
                          {event.venue}
                        </p>
                      )}
                    </div>
                  </CinematicReveal>
                ))}
              </div>
            </div>
          )}

          {/* Countdown */}
          {invite.weddingDate && (
            <CinematicReveal delay={0.4}>
              <div className="mt-20 text-center">
                <p className="mb-10 text-xs font-light uppercase tracking-[0.4em] text-[#DAA520]/50">
                  Counting Down to Forever
                </p>
                <div className="flex items-center justify-center gap-4 sm:gap-6">
                  <CountdownUnit value={countdown.days} label="Days" />
                  <span className="mb-6 font-serif text-2xl text-[#DAA520]/30">
                    :
                  </span>
                  <CountdownUnit value={countdown.hours} label="Hours" />
                  <span className="mb-6 font-serif text-2xl text-[#DAA520]/30">
                    :
                  </span>
                  <CountdownUnit value={countdown.minutes} label="Min" />
                  <span className="mb-6 font-serif text-2xl text-[#DAA520]/30">
                    :
                  </span>
                  <CountdownUnit value={countdown.seconds} label="Sec" />
                </div>
              </div>
            </CinematicReveal>
          )}
        </div>
      </section>

      {/* ================================================================== */}
      {/*  SECTION 4 - GALLERY                                               */}
      {/* ================================================================== */}
      {invite.galleryImages.length > 0 && (
        <section className="cinematic-section relative overflow-hidden px-6 py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0808] to-[#0a0a0a]" />
          <FloralFrame color="#DAA520" />

          <div className="relative z-10 mx-auto max-w-4xl">
            <CinematicReveal>
              <p className="mb-3 text-center text-xs font-light uppercase tracking-[0.4em] text-[#DAA520]/60">
                Chapter Three
              </p>
              <h2 className="film-title-line text-center font-serif text-4xl font-light text-[#DAA520] sm:text-5xl">
                Moments
              </h2>
            </CinematicReveal>

            <CinematicReveal delay={0.2}>
              <div className="my-10 flex items-center justify-center gap-4">
                <div className="h-px w-12 bg-[#DAA520]/20" />
                <Heart className="h-4 w-4 text-[#DAA520]/40" />
                <div className="h-px w-12 bg-[#DAA520]/20" />
              </div>
            </CinematicReveal>

            {/* Cinematic gallery layout */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {invite.galleryImages.map((img, idx) => (
                <CinematicReveal key={idx} delay={0.1 + idx * 0.08}>
                  <div className="group relative aspect-[4/5] overflow-hidden rounded-sm border border-[#DAA520]/10">
                    <div
                      className="film-gallery-img h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${img})` }}
                    />
                    {/* Film strip overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                </CinematicReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================== */}
      {/*  SECTION 5 - RSVP                                                  */}
      {/* ================================================================== */}
      <section className="cinematic-section relative overflow-hidden px-6 py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0a06] to-[#0a0a0a]" />
        <DecorativeBorder color="#DAA520" />
        <SparkleEffect count={10} color="#DAA520" />

        <div className="relative z-10 mx-auto max-w-lg text-center">
          <OrnamentalDivider color="#DAA520" />

          <CinematicReveal delay={0.1}>
            <p className="mb-3 text-xs font-light uppercase tracking-[0.4em] text-[#DAA520]/60">
              The Final Chapter
            </p>
            <h2 className="font-serif text-4xl font-light text-[#DAA520] sm:text-5xl">
              Will You Join Us?
            </h2>
          </CinematicReveal>

          <CinematicReveal delay={0.3}>
            <p className="mt-6 mb-12 font-serif text-base font-light leading-relaxed text-[#faf0e6]/50">
              We would be honored to have you celebrate this special day with
              us. Your presence would mean the world.
            </p>
          </CinematicReveal>

          {/* RSVP Button with shimmer */}
          <CinematicReveal delay={0.5}>
            <div className="flex flex-col items-center gap-4">
              <ShimmerButton
                onClick={() => setRsvpOpen(true)}
                className="w-full max-w-xs"
              >
                <Heart className="mr-2 inline h-4 w-4" />
                RSVP Now
              </ShimmerButton>

              <div className="flex w-full max-w-xs gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => void handleShare()}
                  className="flex-1 rounded-sm border-[#DAA520]/20 bg-transparent py-6 text-xs font-light uppercase tracking-[0.15em] text-[#DAA520]/70 hover:border-[#DAA520]/40 hover:bg-[#DAA520]/5 hover:text-[#DAA520]"
                >
                  <Share2 className="mr-2 h-3.5 w-3.5" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    void fetch("/api/download/invite", {
                      method: "POST",
                    }).then((r) => {
                      if (r.ok) toast.success("Invite saved to gallery");
                      else toast.error("Unlock your invite to download");
                    });
                  }}
                  className="rounded-sm border-[#DAA520]/20 bg-transparent px-4 py-6 text-[#DAA520]/70 hover:border-[#DAA520]/40 hover:bg-[#DAA520]/5 hover:text-[#DAA520]"
                >
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </CinematicReveal>

          {/* Couple photo */}
          {invite.couplePhoto && (
            <CinematicReveal delay={0.7}>
              <div className="mt-16 mx-auto h-40 w-40 overflow-hidden rounded-full border border-[#DAA520]/20 shadow-[0_0_40px_rgba(218,165,32,0.1)]">
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${invite.couplePhoto})` }}
                />
              </div>
            </CinematicReveal>
          )}

          <OrnamentalDivider color="#DAA520" />
        </div>
      </section>

      {/* ================================================================== */}
      {/*  FOOTER                                                            */}
      {/* ================================================================== */}
      <footer className="relative px-6 pb-16 pt-8">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#050505]" />
        <div className="relative z-10 mx-auto max-w-lg text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Heart className="mx-auto mb-4 h-4 w-4 text-[#DAA520]/30" />
            <p className="font-serif text-lg font-light tracking-wide text-[#DAA520]/50">
              {invite.groomName} &amp; {invite.brideName}
            </p>
            {invite.weddingDate && (
              <p className="mt-2 text-xs font-light tracking-[0.2em] text-[#DAA520]/30">
                {formatShortDate(invite.weddingDate)}
              </p>
            )}
          </motion.div>

          <CardoraWatermark className="mt-16 pb-8 text-center text-[10px] font-light tracking-wide text-[#faf0e6]/20" />
        </div>
      </footer>

      {/* ================================================================== */}
      {/*  RSVP Modal                                                        */}
      {/* ================================================================== */}
      <RsvpModal
        open={rsvpOpen}
        onOpenChange={setRsvpOpen}
        inviteSlug={invite.slug}
      />
    </div>
  );
}
