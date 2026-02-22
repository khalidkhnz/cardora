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

function MountainSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 200"
      preserveAspectRatio="none"
      className={`w-full ${className}`}
      style={{ display: "block" }}
    >
      {/* Far mountains */}
      <path
        d="M0,200 L0,140 L120,80 L240,130 L360,60 L480,110 L600,40 L720,100 L840,50 L960,90 L1080,30 L1200,80 L1320,55 L1440,120 L1440,200 Z"
        fill="#0d3b3b"
        fillOpacity="0.6"
      />
      {/* Near mountains */}
      <path
        d="M0,200 L0,160 L180,100 L300,145 L420,85 L540,130 L660,70 L780,120 L900,80 L1020,140 L1140,90 L1260,130 L1380,100 L1440,150 L1440,200 Z"
        fill="#0d3b3b"
        fillOpacity="0.9"
      />
    </svg>
  );
}

function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 24" className={`h-6 w-64 ${className}`} fill="none">
      <line x1="0" y1="12" x2="160" y2="12" stroke="#DAA520" strokeWidth="0.8" opacity="0.5" />
      <circle cx="175" cy="12" r="2" fill="#DAA520" opacity="0.7" />
      <path d="M190,6 L200,12 L190,18 L200,12 Z" fill="#DAA520" opacity="0.6" />
      <circle cx="225" cy="12" r="2" fill="#DAA520" opacity="0.7" />
      <line x1="240" y1="12" x2="400" y2="12" stroke="#DAA520" strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}

function TwinklingStar({ index }: { index: number }) {
  const positions = [
    { top: "5%", left: "10%" },
    { top: "8%", left: "35%" },
    { top: "3%", left: "60%" },
    { top: "12%", left: "80%" },
    { top: "15%", left: "20%" },
    { top: "6%", left: "90%" },
    { top: "18%", left: "50%" },
    { top: "10%", left: "72%" },
    { top: "22%", left: "15%" },
    { top: "2%", left: "45%" },
    { top: "20%", left: "88%" },
    { top: "25%", left: "30%" },
    { top: "14%", left: "65%" },
    { top: "7%", left: "5%" },
    { top: "28%", left: "55%" },
  ];
  const pos = positions[index % positions.length]!;
  const sizes = [2, 3, 2, 4, 2, 3, 2, 3, 2, 4, 2, 3, 2, 3, 2];
  const size = sizes[index % sizes.length]!;

  return (
    <div
      className="star-twinkle absolute rounded-full bg-[#DAA520]"
      style={{
        top: pos.top,
        left: pos.left,
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
}

function ConstellationDots() {
  const dots = [
    { cx: 100, cy: 40 },
    { cx: 130, cy: 55 },
    { cx: 160, cy: 35 },
    { cx: 185, cy: 60 },
    { cx: 210, cy: 42 },
  ];
  return (
    <svg viewBox="0 0 300 100" className="mx-auto h-12 w-48 opacity-30">
      {dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r="1.5" fill="#DAA520" />
      ))}
      {dots.slice(0, -1).map((d, i) => (
        <line
          key={`l-${i}`}
          x1={d.cx}
          y1={d.cy}
          x2={dots[i + 1]!.cx}
          y2={dots[i + 1]!.cy}
          stroke="#DAA520"
          strokeWidth="0.5"
          opacity="0.5"
        />
      ))}
    </svg>
  );
}

function GoldCornerOrnament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={`h-8 w-8 ${className}`} fill="none">
      <path
        d="M5,55 Q5,5 55,5"
        stroke="#DAA520"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M10,55 Q10,10 55,10"
        stroke="#DAA520"
        strokeWidth="0.8"
        fill="none"
        opacity="0.25"
      />
      <circle cx="55" cy="5" r="2" fill="#DAA520" opacity="0.4" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Template Component                                                */
/* ------------------------------------------------------------------ */

export default function MountainsDarkTemplate({ invite, isDemo }: TemplateProps) {
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

  /* ---- Extra data ---- */
  const thingsToKnow = (invite.extraData?.thingsToKnow as { label: string; detail: string }[] | undefined) ?? [];
  const hashtag = (invite.extraData?.hashtag as string | undefined) ?? null;

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

      /* Twinkling stars */
      gsap.utils.toArray<HTMLElement>(".star-twinkle").forEach((el, i) => {
        gsap.to(el, {
          opacity: 0.2,
          scale: 0.5,
          duration: 1.2 + (i % 4) * 0.3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: (i % 5) * 0.4,
        });
      });

      /* Parallax for hero background */
      const heroBg = containerRef.current?.querySelector(".hero-bg");
      if (heroBg) {
        gsap.to(heroBg, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: heroBg,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      /* Event cards stagger in */
      gsap.utils.toArray<HTMLElement>(".event-card-dark").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      /* Gold divider shimmer */
      gsap.utils.toArray<HTMLElement>(".gold-divider").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.3, scaleX: 0.6 },
          {
            opacity: 1,
            scaleX: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      /* Mountain parallax at bottom */
      const mountainEl = containerRef.current?.querySelector(".mountain-silhouette");
      if (mountainEl) {
        gsap.to(mountainEl, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: mountainEl,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        });
      }
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
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0a1628] via-[#0d3b3b] to-[#0a1628]"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      {/* Music toggle */}
      {invite.musicUrl && (
        <MusicToggleButton
          isPlaying={isPlaying}
          onToggle={toggle}
          className="fixed top-4 right-4 z-50 rounded-full bg-[#0a1628]/80 p-3 text-[#DAA520] shadow-lg backdrop-blur-sm transition-colors hover:bg-[#0a1628]"
        />
      )}

      {/* Demo banner */}
      {isDemo && (
        <div className="relative z-30 bg-[#DAA520] py-2 text-center text-sm font-medium text-[#0a1628]">
          This is a demo preview. Complete payment to use your own details.
        </div>
      )}

      {/* Night sky stars layer */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <TwinklingStar key={i} index={i} />
        ))}
      </div>

      {/* ============================================================ */}
      {/*  SECTION 1 — Hero                                            */}
      {/* ============================================================ */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
        {/* Background */}
        <div className="hero-bg absolute inset-0 z-0">
          {invite.heroImage ? (
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${invite.heroImage})` }}
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-b from-[#0a1628] via-[#0d3b3b]/80 to-[#0a1628]/60" />
          )}
          <div className="absolute inset-0 bg-[#0a1628]/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-xl">
          {/* Constellation decoration */}
          <ConstellationDots />

          {/* Parent blessings */}
          {(groomParents ?? brideParents) && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mb-2 text-sm tracking-[0.25em] text-[#DAA520]/70 uppercase"
            >
              With the blessings of
            </motion.p>
          )}
          {groomParents && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mb-1 text-sm text-[#DAA520]/50"
            >
              {groomParents}
            </motion.p>
          )}
          {brideParents && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="mb-6 text-sm text-[#DAA520]/50"
            >
              {brideParents}
            </motion.p>
          )}

          {/* Couple names */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
            className="text-5xl leading-tight font-light tracking-wider text-[#DAA520] sm:text-7xl"
          >
            {invite.groomName}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="my-5 flex items-center justify-center gap-4"
          >
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#DAA520]/60" />
            <Heart className="h-5 w-5 text-[#DAA520]" fill="#DAA520" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#DAA520]/60" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.9 }}
            className="text-5xl leading-tight font-light tracking-wider text-[#DAA520] sm:text-7xl"
          >
            {invite.brideName}
          </motion.h1>

          {/* Date */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 text-base tracking-wider text-white/50"
          >
            {formatDate(invite.weddingDate)}
          </motion.p>

          {/* Venue */}
          {invite.venue && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="mt-2 flex items-center justify-center gap-2 text-sm text-white/40"
            >
              <MapPin className="h-4 w-4" /> {invite.venue}
            </motion.p>
          )}

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-14"
          >
            <span className="animate-bounce inline-block text-[#DAA520]/40">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </span>
          </motion.div>
        </div>
      </section>

      {/* Gold divider */}
      <div className="gold-divider flex justify-center py-4">
        <GoldDivider />
      </div>

      {/* ============================================================ */}
      {/*  SECTION 2 — Events Grid                                     */}
      {/* ============================================================ */}
      <section className="relative z-10 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="scroll-fade mb-10 text-center">
            <ConstellationDots />
            <h2 className="mt-2 text-3xl font-light tracking-wider text-[#DAA520] sm:text-4xl">
              Wedding Celebrations
            </h2>
            <p className="mt-2 text-sm text-white/40">
              An evening of love, laughter & starlight
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, idx) => (
              <div
                key={idx}
                className="event-card-dark group relative overflow-hidden rounded-xl border border-[#DAA520]/25 bg-[#0a1628]/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-[#DAA520]/50 hover:shadow-[0_0_20px_rgba(218,165,32,0.1)]"
              >
                {/* Corner ornaments */}
                <GoldCornerOrnament className="absolute top-2 left-2" />
                <GoldCornerOrnament className="absolute right-2 bottom-2 rotate-180" />

                {/* Event number */}
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#DAA520]/30 text-xs font-semibold text-[#DAA520]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="h-px flex-1 bg-[#DAA520]/15" />
                </div>

                <h3 className="mb-4 text-xl font-semibold tracking-wide text-[#DAA520]">
                  {event.name}
                </h3>

                <div className="space-y-2.5 text-sm text-white/60">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#DAA520]/70" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#DAA520]/70" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#DAA520]/70" />
                    <span>{event.venue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gold divider */}
      <div className="gold-divider flex justify-center py-4">
        <GoldDivider />
      </div>

      {/* ============================================================ */}
      {/*  SECTION 3 — Couple Photo                                    */}
      {/* ============================================================ */}
      {invite.couplePhoto && (
        <section className="relative z-10 px-4 py-20">
          <div className="scroll-fade mx-auto max-w-lg text-center">
            {/* Photo with gold border */}
            <div className="relative mx-auto mb-8 h-80 w-80 overflow-hidden rounded-full shadow-[0_0_40px_rgba(218,165,32,0.15)] sm:h-96 sm:w-96">
              <div className="absolute inset-0 rounded-full border-2 border-[#DAA520]/30" />
              <div className="absolute inset-1 rounded-full border border-[#DAA520]/15" />
              <div
                className="h-full w-full rounded-full bg-cover bg-center"
                style={{ backgroundImage: `url(${invite.couplePhoto})` }}
              />
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-[#DAA520]/30" />
              <Heart className="h-4 w-4 text-[#DAA520]" fill="#DAA520" />
              <div className="h-px w-12 bg-[#DAA520]/30" />
            </div>
            <p className="mt-4 text-lg font-light tracking-wider text-[#DAA520]/70">
              {invite.groomName} & {invite.brideName}
            </p>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/*  Gallery                                                      */}
      {/* ============================================================ */}
      {invite.galleryImages.length > 0 && (
        <section className="relative z-10 px-4 py-16">
          <div className="mx-auto max-w-3xl">
            <div className="scroll-fade mb-8 text-center">
              <h2 className="text-3xl font-light tracking-wider text-[#DAA520] sm:text-4xl">
                Gallery
              </h2>
              <div className="gold-divider mt-4 flex justify-center">
                <GoldDivider />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {invite.galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  className="scroll-fade aspect-square overflow-hidden rounded-xl border border-[#DAA520]/20 shadow-md"
                >
                  <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
                    style={{ backgroundImage: `url(${img})` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gold divider */}
      <div className="gold-divider flex justify-center py-4">
        <GoldDivider />
      </div>

      {/* ============================================================ */}
      {/*  SECTION 4 — Things to Know                                  */}
      {/* ============================================================ */}
      {thingsToKnow.length > 0 && (
        <section className="relative z-10 px-4 py-16">
          <div className="mx-auto max-w-3xl">
            <div className="scroll-fade mb-10 text-center">
              <h2 className="text-3xl font-light tracking-wider text-[#DAA520] sm:text-4xl">
                Things to Know
              </h2>
              <div className="gold-divider mt-4 flex justify-center">
                <GoldDivider />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {thingsToKnow.map((item, idx) => (
                <div
                  key={idx}
                  className="scroll-fade rounded-xl border border-[#DAA520]/15 bg-[#0a1628]/60 p-5 shadow-sm backdrop-blur-sm"
                >
                  <h4 className="mb-1 text-base font-semibold text-[#DAA520]">
                    {item.label}
                  </h4>
                  <p className="text-sm leading-relaxed text-white/50">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gold divider */}
      <div className="gold-divider flex justify-center py-4">
        <GoldDivider />
      </div>

      {/* ============================================================ */}
      {/*  SECTION 5 — Countdown                                       */}
      {/* ============================================================ */}
      <section className="relative z-10 px-4 py-20">
        <div className="scroll-fade mx-auto max-w-xl text-center">
          <h2 className="mb-2 text-3xl font-light tracking-wider text-[#DAA520] sm:text-4xl">
            The Night Awaits
          </h2>
          <p className="mb-10 text-sm text-white/35">Counting the moments until forever begins</p>

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
                <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-[#DAA520]/25 bg-[#0d3b3b]/40 shadow-[0_0_15px_rgba(218,165,32,0.08)] sm:h-24 sm:w-24">
                  <span className="text-3xl font-light text-[#DAA520] sm:text-4xl">
                    {String(unit.value).padStart(2, "0")}
                  </span>
                </div>
                <span className="mt-2 text-xs tracking-widest text-[#DAA520]/50 uppercase">
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
        <section className="relative z-10 px-4 py-16">
          <div className="scroll-fade mx-auto max-w-2xl rounded-2xl border border-[#DAA520]/15 bg-[#0a1628]/70 p-8 text-center backdrop-blur-sm sm:p-12">
            <ConstellationDots />
            <h2 className="mt-2 mb-6 text-3xl font-light tracking-wider text-[#DAA520] sm:text-4xl">
              From Our Hearts
            </h2>
            <p className="text-base leading-relaxed text-white/60 italic">
              &ldquo;{invite.coupleMessage ?? invite.story}&rdquo;
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-[#DAA520]/30" />
              <Heart className="h-4 w-4 text-[#DAA520]" fill="#DAA520" />
              <div className="h-px w-16 bg-[#DAA520]/30" />
            </div>
            <p className="mt-4 text-sm font-light tracking-wider text-[#DAA520]/50">
              — {invite.groomName} & {invite.brideName}
            </p>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/*  SECTION 7 — RSVP + Share Buttons                            */}
      {/* ============================================================ */}
      <section className="relative z-10 px-4 py-16">
        <div className="scroll-fade mx-auto flex max-w-md flex-col items-center gap-5 text-center">
          <h2 className="text-3xl font-light tracking-wider text-[#DAA520] sm:text-4xl">
            Under the Stars
          </h2>
          <p className="text-sm text-white/40">
            We would be honoured by your presence on this magical night
          </p>

          {hashtag && (
            <p className="text-lg font-light tracking-wider text-[#DAA520]/70 italic">
              {hashtag}
            </p>
          )}

          <Button
            size="lg"
            className="w-full max-w-xs bg-[#DAA520] text-[#0a1628] hover:bg-[#DAA520]/90"
            onClick={() => setRsvpOpen(true)}
          >
            RSVP Now
          </Button>

          <div className="flex w-full max-w-xs gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 border-[#DAA520]/30 text-[#DAA520] hover:bg-[#DAA520]/10"
              onClick={() => void handleShare()}
            >
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-[#DAA520]/30 text-[#DAA520] hover:bg-[#DAA520]/10"
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
      {/*  SECTION 8 — Footer / Mountains + Watermark                  */}
      {/* ============================================================ */}
      <footer className="relative z-10 overflow-hidden pt-8 pb-4">
        {/* Mountain silhouette */}
        <div className="mountain-silhouette relative">
          <MountainSilhouette className="opacity-80" />
        </div>

        <div className="relative bg-[#0d3b3b] px-4 py-8 text-center">
          {/* Additional small star dots in footer */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-[#DAA520]"
                style={{
                  width: `${1 + Math.random()}px`,
                  height: `${1 + Math.random()}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          <div className="relative">
            <div className="gold-divider mb-4 flex justify-center">
              <GoldDivider />
            </div>
            <p className="text-sm text-[#DAA520]/50">
              {invite.groomName} & {invite.brideName}
            </p>
            <p className="mt-1 text-xs text-white/30">
              {formatDate(invite.weddingDate)}
            </p>
            <CardoraWatermark className="mt-8 pb-2 text-center text-xs text-white/25" />
          </div>
        </div>
      </footer>

      {/* RSVP Modal */}
      <RsvpModal open={rsvpOpen} onOpenChange={setRsvpOpen} inviteSlug={invite.slug} />
    </div>
  );
}
