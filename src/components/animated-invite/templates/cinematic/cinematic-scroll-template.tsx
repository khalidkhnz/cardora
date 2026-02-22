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
import { StaggeredTextReveal } from "../../shared/staggered-text-reveal";
import { ParallaxImage } from "../../shared/parallax-image";
import { MagneticButton } from "../../shared/magnetic-button";
import { SvgMaskTransition } from "../../shared/svg-mask-transition";
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
/*  Immersive Text Reveal                                                      */
/* -------------------------------------------------------------------------- */

function ImmersiveReveal({
  children,
  delay = 0,
  direction = "up",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
  className?: string;
}) {
  const initial =
    direction === "up"
      ? { opacity: 0, y: 50 }
      : direction === "left"
        ? { opacity: 0, x: -50 }
        : { opacity: 0, x: 50 };

  const animate =
    direction === "up"
      ? { opacity: 1, y: 0 }
      : { opacity: 1, x: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Glow Number (for countdown)                                                */
/* -------------------------------------------------------------------------- */

function GlowNumber({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {/* Glow effect behind number */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 rounded-full bg-[#C0C0C0]/5 blur-xl" />
        </div>
        <span
          className="relative font-serif text-6xl font-light tracking-tight sm:text-7xl lg:text-8xl"
          style={{
            color: "#C0C0C0",
            textShadow:
              "0 0 20px rgba(192, 192, 192, 0.3), 0 0 60px rgba(192, 192, 192, 0.1)",
          }}
        >
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="mt-4 text-[10px] font-light uppercase tracking-[0.4em] text-[#C0C0C0]/50">
        {label}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Story Line Reveal (line-by-line text animation)                            */
/* -------------------------------------------------------------------------- */

function StoryLineReveal({ text }: { text: string }) {
  const lines = text.split(/(?<=[.!?])\s+/);

  return (
    <div className="space-y-4">
      {lines.map((line, index) => (
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{
            duration: 0.8,
            delay: index * 0.15,
            ease: "easeOut",
          }}
          className="story-line font-serif text-lg leading-[2] font-light text-[#e8e0f0]/70 sm:text-xl"
        >
          {line}
        </motion.p>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Platinum Shimmer Button                                                    */
/* -------------------------------------------------------------------------- */

function PlatinumShimmerButton({
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
      className={`relative overflow-hidden rounded-sm border border-[#C0C0C0]/40 bg-[#C0C0C0]/5 px-10 py-4 text-xs font-light uppercase tracking-[0.25em] text-[#C0C0C0] backdrop-blur-sm transition-all duration-300 hover:bg-[#C0C0C0]/15 hover:shadow-[0_0_30px_rgba(192,192,192,0.15)] ${className ?? ""}`}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C0C0C0]/15 to-transparent"
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
/*  Section Indicator Dots                                                     */
/* -------------------------------------------------------------------------- */

function SectionIndicator({
  totalSections,
  activeSection,
}: {
  totalSections: number;
  activeSection: number;
}) {
  return (
    <div className="fixed right-6 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-3">
      {Array.from({ length: totalSections }).map((_, i) => (
        <motion.div
          key={i}
          className="h-2 w-2 rounded-full border transition-colors duration-300"
          style={{
            borderColor:
              i === activeSection
                ? "rgba(192, 192, 192, 0.8)"
                : "rgba(192, 192, 192, 0.2)",
            backgroundColor:
              i === activeSection
                ? "rgba(192, 192, 192, 0.6)"
                : "transparent",
            boxShadow:
              i === activeSection
                ? "0 0 8px rgba(192, 192, 192, 0.3)"
                : "none",
          }}
          animate={
            i === activeSection ? { scale: [1, 1.3, 1] } : { scale: 1 }
          }
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Template Component                                                    */
/* -------------------------------------------------------------------------- */

export default function CinematicScrollTemplate({
  invite,
  isDemo,
}: TemplateProps) {
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const { isPlaying, toggle } = useMusicPlayer(invite.musicUrl);
  const countdown = useCountdown(invite.weddingDate);
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // How many fullscreen sections we have
  const sectionCount = 5;

  // Smooth scrolling via Lenis (no snap — Lenis provides the cinematic feel)
  useLenis();

  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (reducedMotion) return;
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Parallax effect on background elements
      gsap.utils.toArray<HTMLElement>(".parallax-bg").forEach((el) => {
        gsap.to(el, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Scroll-driven section reveals
      gsap.utils
        .toArray<HTMLElement>(".scroll-section")
        .forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 75%",
                toggleActions: "play none none none",
              },
            },
          );
        });

      // Event detail cards float up
      gsap.utils
        .toArray<HTMLElement>(".event-card")
        .forEach((el, index) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 80, rotateX: 10 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 1,
              delay: index * 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            },
          );
        });

      // Track active section for dot indicator
      gsap.utils
        .toArray<HTMLElement>(".fullscreen-section")
        .forEach((el, index) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top center",
            end: "bottom center",
            onEnter: () => setActiveSection(index),
            onEnterBack: () => setActiveSection(index),
          });
        });

      // Horizontal line expansion on headings
      gsap.utils
        .toArray<HTMLElement>(".scroll-line-expand")
        .forEach((el) => {
          gsap.fromTo(
            el,
            { scaleX: 0 },
            {
              scaleX: 1,
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
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  /* Share handler */
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
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#1a0a2e] text-[#e8e0f0]"
    >
      {/* ================================================================== */}
      {/*  GLOBAL LAYERS                                                     */}
      {/* ================================================================== */}

      {/* Dust particles */}
      {!reducedMotion && (
        <ParticleLayer type="DUST" count={25} intensity="low" />
      )}

      {/* Section indicator dots */}
      {!reducedMotion && (
        <SectionIndicator
          totalSections={sectionCount}
          activeSection={activeSection}
        />
      )}

      {/* Music toggle */}
      {invite.musicUrl && (
        <MusicToggleButton
          isPlaying={isPlaying}
          onToggle={toggle}
          className="fixed top-4 right-4 z-50 rounded-full border border-[#C0C0C0]/20 bg-[#1a0a2e]/80 p-3 shadow-lg backdrop-blur-md transition-colors hover:bg-[#1a0a2e]"
        />
      )}

      {/* Demo banner */}
      {isDemo && (
        <div className="relative z-20 bg-[#C0C0C0] py-2 text-center text-sm font-medium text-[#1a0a2e]">
          This is a demo preview. Complete payment to use your own details.
        </div>
      )}

      {/* ================================================================== */}
      {/*  SECTION 1 — HERO (fullscreen)                                     */}
      {/* ================================================================== */}
      <section className="fullscreen-section relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Background image with parallax */}
        {invite.heroImage && (
          <div
            className="parallax-bg absolute inset-0 scale-110 bg-cover bg-center"
            style={{ backgroundImage: `url(${invite.heroImage})` }}
          />
        )}

        {/* Gradient overlays for the deep indigo mood */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a2e]/80 via-[#1a0a2e]/60 to-[#1a0a2e]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0a2e]/40 via-transparent to-[#1a0a2e]/40" />

        {/* Decorative layers on hero */}
        <SparkleEffect count={20} color="#C0C0C0" />
        <DecorativeBorder color="#C0C0C0" />

        {/* Hero content */}
        <div className="relative z-10 px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="mb-8 text-xs font-light uppercase tracking-[0.5em] text-[#C0C0C0]/60"
          >
            A Celebration of Love
          </motion.p>

          {/* Huge couple names — letter-by-letter cinematic reveal */}
          <StaggeredTextReveal
            text={invite.groomName}
            splitBy="letter"
            as="h1"
            trigger="inView"
            className="font-serif text-7xl font-light leading-[0.9] text-white sm:text-8xl lg:text-9xl"
          />

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="my-6 flex items-center justify-center gap-6"
          >
            <div className="h-px w-20 origin-right bg-gradient-to-r from-transparent to-[#C0C0C0]/40 sm:w-32" />
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 1.8, type: "spring" }}
            >
              <Heart className="h-5 w-5 text-[#C0C0C0]/70" />
            </motion.div>
            <div className="h-px w-20 origin-left bg-gradient-to-l from-transparent to-[#C0C0C0]/40 sm:w-32" />
          </motion.div>

          <StaggeredTextReveal
            text={invite.brideName}
            splitBy="letter"
            as="h1"
            trigger="inView"
            className="font-serif text-7xl font-light leading-[0.9] text-white sm:text-8xl lg:text-9xl"
          />

          {invite.weddingDate && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.2 }}
              className="mt-10 text-sm font-light tracking-[0.3em] text-[#C0C0C0]/50"
            >
              {formatShortDate(invite.weddingDate)}
            </motion.p>
          )}

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3 }}
            className="mt-20"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mx-auto h-12 w-px bg-gradient-to-b from-[#C0C0C0]/30 to-transparent"
            />
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  SECTION 2 — STORY (fullscreen, with mask reveal)                  */}
      {/* ================================================================== */}
      <SvgMaskTransition maskColor="#1a0a2e">
      <section className="fullscreen-section scroll-section relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Background gradient variation */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a2e] via-[#2d1b4e] to-[#1a0a2e]" />

        {/* Background image with parallax (if available) */}
        {invite.backgroundImage && (
          <div
            className="parallax-bg absolute inset-0 scale-110 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url(${invite.backgroundImage})` }}
          />
        )}

        <FloralFrame color="#C0C0C0" />
        <ElegantFrame />

        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <ImmersiveReveal>
            <p className="mb-3 text-xs font-light uppercase tracking-[0.5em] text-[#C0C0C0]/50">
              Our Journey
            </p>
            <h2 className="font-serif text-4xl font-light text-[#C0C0C0] sm:text-5xl lg:text-6xl">
              The Story
            </h2>
          </ImmersiveReveal>

          <ImmersiveReveal delay={0.2}>
            <div className="scroll-line-expand my-10 h-px origin-center bg-gradient-to-r from-transparent via-[#C0C0C0]/30 to-transparent" />
          </ImmersiveReveal>

          {/* Line-by-line story reveal */}
          {invite.story && (
            <div className="mb-12">
              <StoryLineReveal text={invite.story} />
            </div>
          )}

          {/* Couple message */}
          {invite.coupleMessage && (
            <ImmersiveReveal delay={0.3}>
              <div className="mt-10 rounded-sm border border-[#C0C0C0]/10 bg-[#C0C0C0]/[0.03] p-8 backdrop-blur-sm">
                <p className="font-serif text-base leading-relaxed text-[#e8e0f0]/50 italic">
                  &ldquo;{invite.coupleMessage}&rdquo;
                </p>
              </div>
            </ImmersiveReveal>
          )}

          {/* Family names */}
          {(invite.groomFatherName ?? invite.brideFatherName) && (
            <ImmersiveReveal delay={0.4}>
              <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
                {invite.groomFatherName && invite.groomMotherName && (
                  <div className="text-center">
                    <p className="mb-2 text-[10px] font-light uppercase tracking-[0.3em] text-[#C0C0C0]/30">
                      Groom&apos;s Parents
                    </p>
                    <p className="font-serif text-sm font-light text-[#e8e0f0]/50">
                      {invite.groomFatherName} &amp; {invite.groomMotherName}
                    </p>
                  </div>
                )}
                {invite.brideFatherName && invite.brideMotherName && (
                  <div className="text-center">
                    <p className="mb-2 text-[10px] font-light uppercase tracking-[0.3em] text-[#C0C0C0]/30">
                      Bride&apos;s Parents
                    </p>
                    <p className="font-serif text-sm font-light text-[#e8e0f0]/50">
                      {invite.brideFatherName} &amp; {invite.brideMotherName}
                    </p>
                  </div>
                )}
              </div>
            </ImmersiveReveal>
          )}
        </div>
      </section>
      </SvgMaskTransition>

      {/* ================================================================== */}
      {/*  SECTION 3 — EVENT DETAILS (fullscreen)                            */}
      {/* ================================================================== */}
      <section className="fullscreen-section scroll-section relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Darker variation */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a2e] via-[#150826] to-[#1a0a2e]" />
        <GoldenPattern />

        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <ImmersiveReveal>
            <p className="mb-3 text-center text-xs font-light uppercase tracking-[0.5em] text-[#C0C0C0]/50">
              Save the Date
            </p>
            <h2 className="text-center font-serif text-4xl font-light text-[#C0C0C0] sm:text-5xl lg:text-6xl">
              The Details
            </h2>
          </ImmersiveReveal>

          <ImmersiveReveal delay={0.2}>
            <div className="scroll-line-expand my-10 h-px origin-center bg-gradient-to-r from-transparent via-[#C0C0C0]/30 to-transparent" />
          </ImmersiveReveal>

          {/* Main event cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Date card */}
            <div className="event-card rounded-sm border border-[#C0C0C0]/10 bg-gradient-to-br from-[#2d1b4e]/50 to-[#1a0a2e]/50 p-8 text-center backdrop-blur-sm">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#C0C0C0]/15 bg-[#C0C0C0]/5">
                <Calendar className="h-6 w-6 text-[#C0C0C0]/60" />
              </div>
              <p className="mb-2 text-[10px] font-light uppercase tracking-[0.3em] text-[#C0C0C0]/40">
                The Date
              </p>
              <p className="font-serif text-xl font-light text-[#e8e0f0]">
                {formatWeddingDate(invite.weddingDate)}
              </p>
              {invite.weddingTime && (
                <p className="mt-3 text-sm font-light text-[#e8e0f0]/40">
                  at {invite.weddingTime}
                </p>
              )}
            </div>

            {/* Venue card */}
            {invite.venue && (
              <div className="event-card rounded-sm border border-[#C0C0C0]/10 bg-gradient-to-br from-[#2d1b4e]/50 to-[#1a0a2e]/50 p-8 text-center backdrop-blur-sm">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#C0C0C0]/15 bg-[#C0C0C0]/5">
                  <MapPin className="h-6 w-6 text-[#C0C0C0]/60" />
                </div>
                <p className="mb-2 text-[10px] font-light uppercase tracking-[0.3em] text-[#C0C0C0]/40">
                  The Venue
                </p>
                <p className="font-serif text-xl font-light text-[#e8e0f0]">
                  {invite.venue}
                </p>
                {invite.venueAddress && (
                  <p className="mt-3 text-sm font-light text-[#e8e0f0]/40">
                    {invite.venueAddress}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Reception */}
          {invite.receptionDate && (
            <ImmersiveReveal delay={0.3}>
              <div className="mt-8 text-center">
                <p className="mb-1 text-[10px] font-light uppercase tracking-[0.3em] text-[#C0C0C0]/40">
                  Reception
                </p>
                <p className="font-serif text-lg font-light text-[#e8e0f0]/60">
                  {formatWeddingDate(invite.receptionDate)}
                </p>
              </div>
            </ImmersiveReveal>
          )}

          {/* Additional events */}
          {invite.events && invite.events.length > 0 && (
            <div className="mt-16">
              <ImmersiveReveal>
                <p className="mb-10 text-center text-xs font-light uppercase tracking-[0.4em] text-[#C0C0C0]/40">
                  Events Schedule
                </p>
              </ImmersiveReveal>

              <div className="space-y-4">
                {invite.events.map((event, index) => (
                  <div
                    key={index}
                    className="event-card rounded-sm border border-[#C0C0C0]/8 bg-[#2d1b4e]/30 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-[#C0C0C0]/20 hover:bg-[#2d1b4e]/50"
                  >
                    <h3 className="font-serif text-lg font-light text-[#C0C0C0]/80">
                      {event.name}
                    </h3>
                    <p className="mt-2 text-sm font-light text-[#e8e0f0]/40">
                      {event.date}{" "}
                      {event.time && (
                        <span className="text-[#e8e0f0]/25">
                          at {event.time}
                        </span>
                      )}
                    </p>
                    {event.venue && (
                      <p className="mt-1 text-sm font-light text-[#e8e0f0]/25">
                        <MapPin className="mr-1 inline h-3 w-3" />
                        {event.venue}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery within event details section */}
          {invite.galleryImages.length > 0 && (
            <div className="mt-16">
              <ImmersiveReveal>
                <p className="mb-10 text-center text-xs font-light uppercase tracking-[0.4em] text-[#C0C0C0]/40">
                  Captured Moments
                </p>
              </ImmersiveReveal>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {invite.galleryImages.map((img, idx) => (
                  <ImmersiveReveal key={idx} delay={idx * 0.08}>
                    <div className="group relative aspect-square overflow-hidden rounded-sm border border-[#C0C0C0]/8">
                      <ParallaxImage
                        src={img}
                        alt={`Gallery image ${idx + 1}`}
                        speed={18}
                        scaleRange={[1, 1.15]}
                        className="h-full w-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a2e]/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </div>
                  </ImmersiveReveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ================================================================== */}
      {/*  SECTION 4 — COUNTDOWN (fullscreen)                                */}
      {/* ================================================================== */}
      <section className="fullscreen-section scroll-section relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Warmer purple gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a2e] via-[#2a1545] to-[#1a0a2e]" />

        {/* Background couple photo with parallax */}
        {invite.couplePhoto && (
          <div
            className="parallax-bg absolute inset-0 scale-110 bg-cover bg-center opacity-8"
            style={{ backgroundImage: `url(${invite.couplePhoto})` }}
          />
        )}

        <DecorativeBorder color="#C0C0C0" />

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <ImmersiveReveal>
            <p className="mb-3 text-xs font-light uppercase tracking-[0.5em] text-[#C0C0C0]/50">
              Every Second Counts
            </p>
            <h2 className="font-serif text-4xl font-light text-[#C0C0C0] sm:text-5xl lg:text-6xl">
              Until Forever
            </h2>
          </ImmersiveReveal>

          <ImmersiveReveal delay={0.2}>
            <div className="scroll-line-expand my-12 h-px origin-center bg-gradient-to-r from-transparent via-[#C0C0C0]/30 to-transparent" />
          </ImmersiveReveal>

          {/* Large glowing countdown numbers */}
          {invite.weddingDate && (
            <ImmersiveReveal delay={0.3}>
              <div className="flex items-start justify-center gap-4 sm:gap-8 lg:gap-12">
                <GlowNumber value={countdown.days} label="Days" />
                <span
                  className="mt-4 font-serif text-4xl font-light text-[#C0C0C0]/20 sm:text-5xl"
                >
                  :
                </span>
                <GlowNumber value={countdown.hours} label="Hours" />
                <span
                  className="mt-4 font-serif text-4xl font-light text-[#C0C0C0]/20 sm:text-5xl"
                >
                  :
                </span>
                <GlowNumber value={countdown.minutes} label="Minutes" />
                <span
                  className="mt-4 font-serif text-4xl font-light text-[#C0C0C0]/20 sm:text-5xl"
                >
                  :
                </span>
                <GlowNumber value={countdown.seconds} label="Seconds" />
              </div>
            </ImmersiveReveal>
          )}

          {/* Wedding date */}
          <ImmersiveReveal delay={0.5}>
            <div className="mt-16">
              <p className="font-serif text-xl font-light text-[#e8e0f0]/40">
                {formatWeddingDate(invite.weddingDate)}
              </p>
              {invite.venue && (
                <p className="mt-3 text-sm font-light text-[#e8e0f0]/25">
                  <MapPin className="mr-1 inline h-3 w-3" />
                  {invite.venue}
                </p>
              )}
            </div>
          </ImmersiveReveal>

          {/* Couple photo display */}
          {invite.couplePhoto && (
            <ImmersiveReveal delay={0.6}>
              <div className="mt-12 mx-auto h-40 w-40 overflow-hidden rounded-full border border-[#C0C0C0]/15 shadow-[0_0_40px_rgba(192,192,192,0.08)]">
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${invite.couplePhoto})`,
                  }}
                />
              </div>
            </ImmersiveReveal>
          )}
        </div>
      </section>

      {/* ================================================================== */}
      {/*  SECTION 5 — RSVP (fullscreen)                                     */}
      {/* ================================================================== */}
      <section className="fullscreen-section scroll-section relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Final gradient — slightly lighter */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a2e] via-[#2d1b4e] to-[#0f0520]" />

        <DecorativeBorder color="#C0C0C0" />
        <SparkleEffect count={14} color="#C0C0C0" />
        <ElegantFrame />

        <div className="relative z-10 mx-auto max-w-lg px-6 text-center">
          <ImmersiveReveal>
            <p className="mb-3 text-xs font-light uppercase tracking-[0.5em] text-[#C0C0C0]/50">
              The Invitation
            </p>
            <h2 className="font-serif text-4xl font-light text-[#C0C0C0] sm:text-5xl lg:text-6xl">
              Will You Join Us?
            </h2>
          </ImmersiveReveal>

          <ImmersiveReveal delay={0.2}>
            <div className="scroll-line-expand my-10 h-px origin-center bg-gradient-to-r from-transparent via-[#C0C0C0]/30 to-transparent" />
          </ImmersiveReveal>

          <ImmersiveReveal delay={0.3}>
            <p className="mb-12 font-serif text-base font-light leading-relaxed text-[#e8e0f0]/50">
              Your presence would make our celebration truly complete. We
              would be honored to share this magical moment with you.
            </p>
          </ImmersiveReveal>

          {/* RSVP + action buttons */}
          <ImmersiveReveal delay={0.4}>
            <div className="flex flex-col items-center gap-4">
              <MagneticButton strength={0.3} className="w-full max-w-xs">
                <PlatinumShimmerButton
                  onClick={() => setRsvpOpen(true)}
                  className="w-full"
                >
                  <Heart className="mr-2 inline h-4 w-4" />
                  RSVP Now
                </PlatinumShimmerButton>
              </MagneticButton>

              <div className="flex w-full max-w-xs gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => void handleShare()}
                  className="flex-1 rounded-sm border-[#C0C0C0]/15 bg-transparent py-6 text-xs font-light uppercase tracking-[0.15em] text-[#C0C0C0]/60 hover:border-[#C0C0C0]/30 hover:bg-[#C0C0C0]/5 hover:text-[#C0C0C0]"
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
                  className="rounded-sm border-[#C0C0C0]/15 bg-transparent px-4 py-6 text-[#C0C0C0]/60 hover:border-[#C0C0C0]/30 hover:bg-[#C0C0C0]/5 hover:text-[#C0C0C0]"
                >
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </ImmersiveReveal>

          {/* Footer content within RSVP section */}
          <ImmersiveReveal delay={0.6}>
            <div className="mt-20">
              <OrnamentalDivider color="#C0C0C0" />

              <Heart className="mx-auto mb-4 mt-8 h-4 w-4 text-[#C0C0C0]/25" />
              <p className="font-serif text-lg font-light tracking-wide text-[#C0C0C0]/40">
                {invite.groomName} &amp; {invite.brideName}
              </p>
              {invite.weddingDate && (
                <p className="mt-2 text-xs font-light tracking-[0.2em] text-[#C0C0C0]/25">
                  {formatShortDate(invite.weddingDate)}
                </p>
              )}

              <CardoraWatermark className="mt-16 pb-8 text-center text-[10px] font-light tracking-wide text-[#e8e0f0]/15" />
            </div>
          </ImmersiveReveal>
        </div>
      </section>

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
