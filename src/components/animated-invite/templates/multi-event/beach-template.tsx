"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RsvpModal } from "@/components/rsvp/rsvp-modal";
import { Share2, MapPin, Calendar, Heart, Download, Clock } from "lucide-react";
import { toast } from "sonner";
import { gsap, ScrollTrigger } from "@/lib/gsap-setup";
import { MusicToggleButton } from "../../shared/music-toggle-button";
import { CardoraWatermark } from "../../shared/cardora-watermark";
import { useMusicPlayer } from "@/hooks/use-music-player";
import { useCountdown } from "@/hooks/use-countdown";
import { useLenis } from "@/hooks/use-lenis";
import type { TemplateProps } from "../../types";

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function formatDate(dateStr: string | null) {
  if (!dateStr) return "Date TBD";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/* ------------------------------------------------------------------ */
/*  Inline SVG Decorations                                            */
/* ------------------------------------------------------------------ */

function WaveDivider({ flip = false, className = "" }: { flip?: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={`w-full ${flip ? "rotate-180" : ""} ${className}`}
      style={{ display: "block", height: "60px" }}
    >
      <path
        d="M0,64 C360,120 720,0 1080,64 C1260,96 1380,80 1440,64 L1440,120 L0,120 Z"
        fill="#f4e4bc"
        fillOpacity="0.35"
      />
      <path
        d="M0,80 C320,30 640,110 960,60 C1120,35 1320,90 1440,70 L1440,120 L0,120 Z"
        fill="#f4e4bc"
        fillOpacity="0.2"
      />
    </svg>
  );
}

function Seashell({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none">
      <path
        d="M30 5C18 5 8 18 8 32c0 10 8 18 22 23 14-5 22-13 22-23C52 18 42 5 30 5z"
        stroke="#FF7F50"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M30 5c0 15-5 28-8 35M30 5c0 15 5 28 8 35M30 5v45"
        stroke="#FF7F50"
        strokeWidth="1"
        opacity="0.3"
      />
    </svg>
  );
}

function FloatingLantern({ index }: { index: number }) {
  const sizes = [28, 34, 24, 30];
  const size = sizes[index % sizes.length]!;
  return (
    <svg
      viewBox="0 0 40 60"
      width={size}
      height={size * 1.5}
      className="lantern-el pointer-events-none absolute"
      style={{
        left: `${15 + index * 22}%`,
        bottom: "10%",
      }}
    >
      <ellipse cx="20" cy="22" rx="12" ry="16" fill="#FF6B35" fillOpacity="0.6" />
      <ellipse cx="20" cy="22" rx="8" ry="11" fill="#f4e4bc" fillOpacity="0.45" />
      <rect x="17" y="38" width="6" height="6" rx="1" fill="#FF7F50" fillOpacity="0.5" />
      <line x1="20" y1="44" x2="20" y2="58" stroke="#f4e4bc" strokeWidth="0.8" opacity="0.4" />
    </svg>
  );
}

function Starfish({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <path
        d="M24 4l5 14h14l-11 8 4 14-12-9-12 9 4-14L5 18h14z"
        stroke="#FF6B35"
        strokeWidth="1.2"
        fill="#FF6B35"
        fillOpacity="0.15"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Template Component                                                */
/* ------------------------------------------------------------------ */

export default function BeachTemplate({ invite, isDemo }: TemplateProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const { isPlaying, toggle } = useMusicPlayer(invite.musicUrl);
  const countdown = useCountdown(invite.weddingDate);

  useLenis();

  /* ---- Default multi-event list ---- */
  const events = invite.events ?? [
    { name: "Mehendi", date: "Date TBA", venue: invite.venue ?? "Venue TBA", time: invite.weddingTime ?? "6 PM" },
    { name: "Haldi", date: "Date TBA", venue: invite.venue ?? "Venue TBA", time: invite.weddingTime ?? "6 PM" },
    { name: "Sangeet", date: "Date TBA", venue: invite.venue ?? "Venue TBA", time: invite.weddingTime ?? "7 PM" },
    { name: "Wedding", date: invite.weddingDate ?? "Date TBA", venue: invite.venue ?? "Venue TBA", time: invite.weddingTime ?? "6 PM" },
    { name: "Reception", date: invite.receptionDate ?? "Date TBA", venue: invite.venue ?? "Venue TBA", time: invite.weddingTime ?? "7 PM" },
  ];

  /* ---- Extra data for "Things to Know" ---- */
  const thingsToKnow = (invite.extraData?.thingsToKnow as { label: string; detail: string }[] | undefined) ?? [
    { label: "Weather", detail: "Expect warm sunny skies — sunscreen recommended!" },
    { label: "Dress Code", detail: "Resort casual — light fabrics and sandals welcome" },
    { label: "Parking", detail: "Complimentary valet parking available at the venue" },
    { label: "Accommodation", detail: "A block of rooms has been reserved at the resort" },
  ];

  /* ---- Share handler ---- */
  async function handleShare() {
    const url = `${window.location.origin}/wedding/${invite.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: `${invite.groomName} & ${invite.brideName} — Wedding`, url });
        return;
      } catch {
        /* fall through */
      }
    }
    await navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  }

  /* ---- GSAP scroll animations ---- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Fade-up for elements with .scroll-fade */
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

      /* Floating lanterns drift upward in a slow loop */
      gsap.utils.toArray<HTMLElement>(".lantern-el").forEach((el, i) => {
        gsap.to(el, {
          y: -(120 + i * 40),
          x: `+=${10 + i * 8}`,
          opacity: 0,
          duration: 8 + i * 2,
          ease: "power1.inOut",
          repeat: -1,
          delay: i * 2.5,
        });
      });

      /* Subtle parallax for the hero background */
      const heroBg = containerRef.current?.querySelector(".hero-bg");
      if (heroBg) {
        gsap.to(heroBg, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: heroBg,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      /* Scale-in for postcard event cards */
      gsap.utils.toArray<HTMLElement>(".postcard-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.85, rotate: i % 2 === 0 ? -3 : 3 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.7,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      /* Wave animation — gentle horizontal shift */
      gsap.utils.toArray<HTMLElement>(".wave-deco").forEach((el) => {
        gsap.to(el, {
          x: 15,
          duration: 4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  /* ---- Parent blessing text ---- */
  const groomParents =
    invite.groomFatherName ?? invite.groomMotherName
      ? `${invite.groomFatherName ?? ""}${invite.groomFatherName && invite.groomMotherName ? " & " : ""}${invite.groomMotherName ?? ""}`
      : null;

  const brideParents =
    invite.brideFatherName ?? invite.brideMotherName
      ? `${invite.brideFatherName ?? ""}${invite.brideFatherName && invite.brideMotherName ? " & " : ""}${invite.brideMotherName ?? ""}`
      : null;

  /* ================================================================ */
  /*  JSX                                                             */
  /* ================================================================ */

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#1e3a5f] via-[#2d5a87] to-[#f4e4bc]"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      {/* Music toggle */}
      {invite.musicUrl && (
        <MusicToggleButton
          isPlaying={isPlaying}
          onToggle={toggle}
          className="fixed top-4 right-4 z-50 rounded-full bg-[#1e3a5f]/80 p-3 text-[#f4e4bc] shadow-lg backdrop-blur-sm transition-colors hover:bg-[#1e3a5f]"
        />
      )}

      {/* Demo banner */}
      {isDemo && (
        <div className="relative z-30 bg-[#FF6B35] py-2 text-center text-sm font-medium text-white">
          This is a demo preview. Complete payment to use your own details.
        </div>
      )}

      {/* Floating lanterns layer */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {[0, 1, 2, 3].map((i) => (
          <FloatingLantern key={i} index={i} />
        ))}
      </div>

      {/* ============================================================ */}
      {/*  SECTION 1 — Hero                                            */}
      {/* ============================================================ */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
        {/* Background — hero image or gradient overlay */}
        <div className="hero-bg absolute inset-0 z-0">
          {invite.heroImage ? (
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${invite.heroImage})` }}
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-b from-[#1e3a5f] via-[#2d5a87]/80 to-[#1e3a5f]/60" />
          )}
          <div className="absolute inset-0 bg-[#1e3a5f]/50" />
        </div>

        <div className="relative z-10 mx-auto max-w-xl">
          {/* Seashell decoration */}
          <Seashell className="mx-auto mb-4 h-10 w-10 opacity-60" />

          {/* Parent blessings */}
          {(groomParents ?? brideParents) && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mb-2 text-sm tracking-widest text-[#f4e4bc]/80 uppercase"
            >
              With the blessings of
            </motion.p>
          )}
          {groomParents && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mb-1 text-sm text-[#f4e4bc]/70"
            >
              {groomParents}
            </motion.p>
          )}
          {brideParents && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="mb-6 text-sm text-[#f4e4bc]/70"
            >
              {brideParents}
            </motion.p>
          )}

          {/* Couple names */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-5xl leading-tight font-light tracking-wide text-[#f4e4bc] sm:text-7xl"
          >
            {invite.groomName}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="my-4 flex items-center justify-center gap-4"
          >
            <div className="h-px w-16 bg-[#FF7F50]/60" />
            <Heart className="h-6 w-6 text-[#FF7F50]" fill="#FF7F50" />
            <div className="h-px w-16 bg-[#FF7F50]/60" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-5xl leading-tight font-light tracking-wide text-[#f4e4bc] sm:text-7xl"
          >
            {invite.brideName}
          </motion.h1>

          {/* Date teaser */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-6 text-base tracking-wider text-[#f4e4bc]/70"
          >
            {formatDate(invite.weddingDate)}
          </motion.p>

          {/* Venue teaser */}
          {invite.venue && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="mt-2 flex items-center justify-center gap-2 text-sm text-[#f4e4bc]/60"
            >
              <MapPin className="h-4 w-4" /> {invite.venue}
            </motion.p>
          )}

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-12"
          >
            <span className="animate-bounce inline-block text-[#f4e4bc]/50">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </span>
          </motion.div>
        </div>
      </section>

      {/* Wave transition */}
      <div className="wave-deco relative z-10 -mt-1">
        <WaveDivider />
      </div>

      {/* ============================================================ */}
      {/*  SECTION 2 — Events Grid                                     */}
      {/* ============================================================ */}
      <section className="relative z-10 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="scroll-fade mb-10 text-center">
            <Starfish className="mx-auto mb-3 h-8 w-8" />
            <h2 className="text-3xl font-light tracking-wide text-[#1e3a5f] sm:text-4xl">
              Wedding Celebrations
            </h2>
            <p className="mt-2 text-sm text-[#1e3a5f]/60">
              Join us across all our joyous events
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, idx) => (
              <div
                key={idx}
                className="postcard-card group relative overflow-hidden rounded-2xl border border-[#FF7F50]/20 bg-white/70 p-6 shadow-lg backdrop-blur-sm transition-shadow hover:shadow-xl"
              >
                {/* Postcard stamp decoration */}
                <div className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-sm border-2 border-dashed border-[#FF6B35]/30">
                  <span className="text-xs font-bold text-[#FF6B35]/50">{String(idx + 1).padStart(2, "0")}</span>
                </div>

                {/* Postcard horizontal line accents */}
                <div className="mb-4 space-y-1">
                  <div className="h-px w-full bg-[#1e3a5f]/10" />
                  <div className="h-px w-3/4 bg-[#1e3a5f]/10" />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-[#1e3a5f]">
                  {event.name}
                </h3>

                <div className="space-y-2 text-sm text-[#1e3a5f]/70">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#FF6B35]" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#FF6B35]" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#FF6B35]" />
                    <span>{event.venue}</span>
                  </div>
                </div>

                {/* Bottom decorative wave */}
                <svg
                  viewBox="0 0 200 20"
                  preserveAspectRatio="none"
                  className="mt-4 h-3 w-full opacity-20"
                >
                  <path
                    d="M0,10 C40,0 60,20 100,10 C140,0 160,20 200,10"
                    fill="none"
                    stroke="#1e3a5f"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave transition */}
      <div className="wave-deco relative z-10">
        <WaveDivider flip />
      </div>

      {/* ============================================================ */}
      {/*  SECTION 3 — Couple Photo                                    */}
      {/* ============================================================ */}
      {invite.couplePhoto && (
        <section className="relative z-10 bg-[#1e3a5f]/90 px-4 py-20">
          <div className="scroll-fade mx-auto max-w-lg text-center">
            <div className="relative mx-auto mb-6 h-80 w-80 overflow-hidden rounded-full border-4 border-[#f4e4bc]/30 shadow-2xl sm:h-96 sm:w-96">
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${invite.couplePhoto})` }}
              />
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-[#FF7F50]/40" />
              <Heart className="h-4 w-4 text-[#FF7F50]" />
              <div className="h-px w-12 bg-[#FF7F50]/40" />
            </div>
            <p className="mt-4 text-lg font-light tracking-wide text-[#f4e4bc]/80">
              {invite.groomName} & {invite.brideName}
            </p>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/*  SECTION 4 — Things to Know                                  */}
      {/* ============================================================ */}
      <section className="relative z-10 bg-gradient-to-b from-[#f4e4bc]/40 to-[#f4e4bc]/60 px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="scroll-fade mb-10 text-center">
            <h2 className="text-3xl font-light tracking-wide text-[#1e3a5f] sm:text-4xl">
              Things to Know
            </h2>
            <Seashell className="mx-auto mt-3 h-8 w-8 opacity-50" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {thingsToKnow.map((item, idx) => (
              <div
                key={idx}
                className="scroll-fade rounded-xl border border-[#1e3a5f]/10 bg-white/60 p-5 shadow-sm backdrop-blur-sm"
              >
                <h4 className="mb-1 text-base font-semibold text-[#1e3a5f]">
                  {item.label}
                </h4>
                <p className="text-sm leading-relaxed text-[#1e3a5f]/70">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave transition */}
      <div className="wave-deco relative z-10">
        <WaveDivider />
      </div>

      {/* ============================================================ */}
      {/*  SECTION 5 — Countdown                                       */}
      {/* ============================================================ */}
      <section className="relative z-10 bg-[#1e3a5f] px-4 py-20">
        <div className="scroll-fade mx-auto max-w-xl text-center">
          <h2 className="mb-2 text-3xl font-light tracking-wide text-[#f4e4bc] sm:text-4xl">
            Counting the Days
          </h2>
          <p className="mb-8 text-sm text-[#f4e4bc]/50">Until we say &ldquo;I do&rdquo;</p>

          <div className="grid grid-cols-4 gap-4">
            {(
              [
                { label: "Days", value: countdown.days },
                { label: "Hours", value: countdown.hours },
                { label: "Minutes", value: countdown.minutes },
                { label: "Seconds", value: countdown.seconds },
              ] as const
            ).map((unit) => (
              <div key={unit.label} className="flex flex-col items-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-[#FF7F50]/30 bg-[#2d5a87]/60 shadow-lg sm:h-24 sm:w-24">
                  <span className="text-3xl font-light text-[#f4e4bc] sm:text-4xl">
                    {String(unit.value).padStart(2, "0")}
                  </span>
                </div>
                <span className="mt-2 text-xs tracking-wider text-[#f4e4bc]/60 uppercase">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 6 — Couple Message                                  */}
      {/* ============================================================ */}
      {(invite.coupleMessage ?? invite.story) && (
        <section className="relative z-10 bg-gradient-to-b from-[#1e3a5f] to-[#2d5a87] px-4 py-16">
          <div className="scroll-fade mx-auto max-w-2xl text-center">
            <Starfish className="mx-auto mb-4 h-8 w-8 opacity-50" />
            <h2 className="mb-6 text-3xl font-light tracking-wide text-[#f4e4bc] sm:text-4xl">
              A Message From Us
            </h2>
            <p className="text-base leading-relaxed text-[#f4e4bc]/80 italic">
              &ldquo;{invite.coupleMessage ?? invite.story}&rdquo;
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-[#FF7F50]/40" />
              <Heart className="h-4 w-4 text-[#FF7F50]" />
              <div className="h-px w-16 bg-[#FF7F50]/40" />
            </div>
            <p className="mt-4 text-sm font-light tracking-wider text-[#f4e4bc]/60">
              — {invite.groomName} & {invite.brideName}
            </p>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/*  SECTION 7 — RSVP + Share Buttons                            */}
      {/* ============================================================ */}
      <section className="relative z-10 bg-[#2d5a87] px-4 py-16">
        <div className="scroll-fade mx-auto flex max-w-md flex-col items-center gap-5 text-center">
          <h2 className="text-3xl font-light tracking-wide text-[#f4e4bc] sm:text-4xl">
            Will You Join Us?
          </h2>
          <p className="text-sm text-[#f4e4bc]/60">
            We would be honoured to have you celebrate with us
          </p>

          <Button
            size="lg"
            className="w-full max-w-xs bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90"
            onClick={() => setRsvpOpen(true)}
          >
            RSVP Now
          </Button>

          <div className="flex w-full max-w-xs gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 border-[#f4e4bc]/30 text-[#f4e4bc] hover:bg-[#f4e4bc]/10"
              onClick={() => void handleShare()}
            >
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-[#f4e4bc]/30 text-[#f4e4bc] hover:bg-[#f4e4bc]/10"
              onClick={() => {
                void fetch("/api/download/invite", { method: "POST" }).then((r) => {
                  if (r.ok) toast.success("Invite saved to gallery");
                  else toast.error("Unlock your invite to download");
                });
              }}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 8 — Footer / Sand Texture + Watermark               */}
      {/* ============================================================ */}
      <footer className="relative z-10 overflow-hidden bg-[#f4e4bc] px-4 py-10">
        {/* Sand texture dots */}
        <div className="pointer-events-none absolute inset-0 opacity-20">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[#1e3a5f]"
              style={{
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative text-center">
          <Seashell className="mx-auto mb-3 h-8 w-8 opacity-40" />
          <p className="text-sm text-[#1e3a5f]/50">
            {invite.groomName} & {invite.brideName}
          </p>
          <p className="mt-1 text-xs text-[#1e3a5f]/40">
            {formatDate(invite.weddingDate)}
          </p>
          <CardoraWatermark className="mt-8 pb-2 text-center text-xs text-[#1e3a5f]/40" />
        </div>
      </footer>

      {/* RSVP Modal */}
      <RsvpModal open={rsvpOpen} onOpenChange={setRsvpOpen} inviteSlug={invite.slug} />
    </div>
  );
}
