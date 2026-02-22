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

function CitySkyline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 220"
      preserveAspectRatio="none"
      className={`w-full ${className}`}
      style={{ display: "block" }}
    >
      {/* Far buildings */}
      <rect x="40" y="90" width="50" height="130" fill="#374151" fillOpacity="0.5" />
      <rect x="50" y="95" width="8" height="12" rx="1" fill="#00D4FF" fillOpacity="0.15" />
      <rect x="65" y="95" width="8" height="12" rx="1" fill="#00D4FF" fillOpacity="0.1" />
      <rect x="50" y="115" width="8" height="12" rx="1" fill="#00D4FF" fillOpacity="0.2" />
      <rect x="65" y="115" width="8" height="12" rx="1" fill="#00D4FF" fillOpacity="0.08" />

      <rect x="120" y="50" width="70" height="170" fill="#374151" fillOpacity="0.6" />
      <rect x="130" y="58" width="10" height="14" rx="1" fill="#00D4FF" fillOpacity="0.2" />
      <rect x="148" y="58" width="10" height="14" rx="1" fill="#00D4FF" fillOpacity="0.12" />
      <rect x="166" y="58" width="10" height="14" rx="1" fill="#00D4FF" fillOpacity="0.18" />
      <rect x="130" y="80" width="10" height="14" rx="1" fill="#00D4FF" fillOpacity="0.1" />
      <rect x="148" y="80" width="10" height="14" rx="1" fill="#00D4FF" fillOpacity="0.22" />
      <rect x="166" y="80" width="10" height="14" rx="1" fill="#00D4FF" fillOpacity="0.14" />

      <rect x="220" y="70" width="40" height="150" fill="#374151" fillOpacity="0.4" />
      <rect x="228" y="78" width="7" height="10" rx="1" fill="#00D4FF" fillOpacity="0.15" />
      <rect x="242" y="78" width="7" height="10" rx="1" fill="#00D4FF" fillOpacity="0.1" />

      <rect x="300" y="30" width="80" height="190" fill="#374151" fillOpacity="0.7" />
      <rect x="312" y="38" width="12" height="16" rx="1" fill="#00D4FF" fillOpacity="0.25" />
      <rect x="332" y="38" width="12" height="16" rx="1" fill="#00D4FF" fillOpacity="0.15" />
      <rect x="352" y="38" width="12" height="16" rx="1" fill="#00D4FF" fillOpacity="0.2" />
      <rect x="312" y="62" width="12" height="16" rx="1" fill="#00D4FF" fillOpacity="0.12" />
      <rect x="332" y="62" width="12" height="16" rx="1" fill="#00D4FF" fillOpacity="0.22" />
      <rect x="352" y="62" width="12" height="16" rx="1" fill="#00D4FF" fillOpacity="0.1" />
      {/* Antenna */}
      <rect x="338" y="15" width="4" height="15" fill="#374151" fillOpacity="0.7" />
      <circle cx="340" cy="12" r="3" fill="#00D4FF" fillOpacity="0.4" />

      <rect x="420" y="80" width="55" height="140" fill="#374151" fillOpacity="0.55" />
      <rect x="430" y="88" width="8" height="12" rx="1" fill="#00D4FF" fillOpacity="0.18" />
      <rect x="450" y="88" width="8" height="12" rx="1" fill="#00D4FF" fillOpacity="0.12" />

      <rect x="510" y="55" width="65" height="165" fill="#374151" fillOpacity="0.6" />
      <rect x="520" y="63" width="10" height="14" rx="1" fill="#00D4FF" fillOpacity="0.2" />
      <rect x="538" y="63" width="10" height="14" rx="1" fill="#00D4FF" fillOpacity="0.15" />
      <rect x="556" y="63" width="10" height="14" rx="1" fill="#00D4FF" fillOpacity="0.1" />

      <rect x="610" y="100" width="45" height="120" fill="#374151" fillOpacity="0.45" />
      <rect x="690" y="40" width="75" height="180" fill="#374151" fillOpacity="0.65" />
      <rect x="700" y="48" width="11" height="15" rx="1" fill="#00D4FF" fillOpacity="0.22" />
      <rect x="720" y="48" width="11" height="15" rx="1" fill="#00D4FF" fillOpacity="0.14" />
      <rect x="740" y="48" width="11" height="15" rx="1" fill="#00D4FF" fillOpacity="0.18" />

      <rect x="800" y="75" width="50" height="145" fill="#374151" fillOpacity="0.5" />
      <rect x="880" y="60" width="60" height="160" fill="#374151" fillOpacity="0.55" />
      <rect x="890" y="68" width="9" height="13" rx="1" fill="#00D4FF" fillOpacity="0.2" />
      <rect x="908" y="68" width="9" height="13" rx="1" fill="#00D4FF" fillOpacity="0.12" />
      <rect x="926" y="68" width="9" height="13" rx="1" fill="#00D4FF" fillOpacity="0.16" />

      <rect x="970" y="85" width="45" height="135" fill="#374151" fillOpacity="0.45" />
      <rect x="1050" y="45" width="70" height="175" fill="#374151" fillOpacity="0.6" />
      <rect x="1062" y="53" width="10" height="14" rx="1" fill="#00D4FF" fillOpacity="0.2" />
      <rect x="1080" y="53" width="10" height="14" rx="1" fill="#00D4FF" fillOpacity="0.15" />
      <rect x="1098" y="53" width="10" height="14" rx="1" fill="#00D4FF" fillOpacity="0.1" />
      {/* Antenna */}
      <rect x="1083" y="28" width="4" height="17" fill="#374151" fillOpacity="0.6" />
      <circle cx="1085" cy="25" r="3" fill="#00D4FF" fillOpacity="0.35" />

      <rect x="1160" y="95" width="50" height="125" fill="#374151" fillOpacity="0.5" />
      <rect x="1240" y="70" width="60" height="150" fill="#374151" fillOpacity="0.55" />
      <rect x="1250" y="78" width="9" height="13" rx="1" fill="#00D4FF" fillOpacity="0.18" />
      <rect x="1268" y="78" width="9" height="13" rx="1" fill="#00D4FF" fillOpacity="0.12" />

      <rect x="1340" y="90" width="55" height="130" fill="#374151" fillOpacity="0.5" />
      <rect x="1400" y="110" width="40" height="110" fill="#374151" fillOpacity="0.4" />
    </svg>
  );
}

function NeonLine({ className = "" }: { className?: string }) {
  return (
    <div className={`neon-line mx-auto h-px w-48 bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent ${className}`} />
  );
}

function GeometricPattern({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={`h-5 w-20 ${className}`} fill="none">
      <rect x="10" y="10" width="20" height="20" stroke="#00D4FF" strokeWidth="0.6" opacity="0.3" />
      <rect x="20" y="5" width="15" height="15" stroke="#00D4FF" strokeWidth="0.4" opacity="0.2" transform="rotate(45 27.5 12.5)" />
      <rect x="50" y="10" width="20" height="20" stroke="#00D4FF" strokeWidth="0.6" opacity="0.25" />
      <circle cx="95" cy="20" r="8" stroke="#00D4FF" strokeWidth="0.6" opacity="0.3" />
      <circle cx="95" cy="20" r="3" fill="#00D4FF" fillOpacity="0.15" />
    </svg>
  );
}

function DiamondDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#00D4FF]/40" />
      <div className="h-2 w-2 rotate-45 border border-[#00D4FF]/50 bg-[#00D4FF]/10" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#00D4FF]/40" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Template Component                                                */
/* ------------------------------------------------------------------ */

export default function CityTemplate({ invite, isDemo }: TemplateProps) {
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
    { label: "Weather", detail: "Indoor venue — comfortable year-round" },
    { label: "Dress Code", detail: "Smart casual to cocktail attire" },
    { label: "Parking", detail: "Multi-level garage attached to the venue" },
    { label: "Accommodation", detail: "Partnered hotels nearby with special rates" },
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
      /* Fade-up for .scroll-fade elements */
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

      /* Hero parallax */
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

      /* Glass-card slide-in from alternating sides */
      gsap.utils.toArray<HTMLElement>(".glass-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: i % 2 === 0 ? -40 : 40, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      /* Neon-line glow pulse */
      gsap.utils.toArray<HTMLElement>(".neon-line").forEach((el) => {
        gsap.to(el, {
          boxShadow: "0 0 10px rgba(0,212,255,0.5), 0 0 20px rgba(0,212,255,0.2)",
          duration: 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      /* Skyline parallax */
      const skylineEl = containerRef.current?.querySelector(".city-skyline");
      if (skylineEl) {
        gsap.to(skylineEl, {
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: skylineEl,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        });
      }

      /* Countdown blocks pop in */
      gsap.utils.toArray<HTMLElement>(".countdown-block").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            delay: i * 0.12,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      /* Geometric patterns subtle rotation */
      gsap.utils.toArray<HTMLElement>(".geo-pattern").forEach((el) => {
        gsap.to(el, {
          rotation: 360,
          duration: 40,
          ease: "none",
          repeat: -1,
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
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"
      style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}
    >
      {/* Music toggle */}
      {invite.musicUrl && (
        <MusicToggleButton
          isPlaying={isPlaying}
          onToggle={toggle}
          className="fixed top-4 right-4 z-50 rounded-full bg-gray-900/80 p-3 text-[#00D4FF] shadow-lg backdrop-blur-sm transition-colors hover:bg-gray-900"
        />
      )}

      {/* Demo banner */}
      {isDemo && (
        <div className="relative z-30 bg-[#00D4FF] py-2 text-center text-sm font-medium text-gray-900">
          This is a demo preview. Complete payment to use your own details.
        </div>
      )}

      {/* Background geometric patterns — large, slow-spinning */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-20">
        <div className="geo-pattern absolute top-[10%] left-[5%]">
          <svg viewBox="0 0 200 200" className="h-40 w-40" fill="none">
            <rect x="20" y="20" width="160" height="160" stroke="#00D4FF" strokeWidth="0.5" />
            <rect x="50" y="50" width="100" height="100" stroke="#00D4FF" strokeWidth="0.3" transform="rotate(15 100 100)" />
          </svg>
        </div>
        <div className="geo-pattern absolute top-[40%] right-[8%]">
          <svg viewBox="0 0 180 180" className="h-36 w-36" fill="none">
            <circle cx="90" cy="90" r="80" stroke="#00D4FF" strokeWidth="0.4" />
            <circle cx="90" cy="90" r="50" stroke="#00D4FF" strokeWidth="0.3" />
            <circle cx="90" cy="90" r="20" stroke="#00D4FF" strokeWidth="0.5" />
          </svg>
        </div>
        <div className="geo-pattern absolute bottom-[20%] left-[12%]">
          <svg viewBox="0 0 150 150" className="h-32 w-32" fill="none">
            <polygon points="75,10 140,140 10,140" stroke="#00D4FF" strokeWidth="0.4" />
            <polygon points="75,40 120,120 30,120" stroke="#00D4FF" strokeWidth="0.3" />
          </svg>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  SECTION 1 — Hero with Skyline                               */}
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
            <div className="h-full w-full bg-gradient-to-b from-gray-900 via-gray-800/80 to-gray-900/60" />
          )}
          <div className="absolute inset-0 bg-gray-900/60" />
        </div>

        {/* Skyline at bottom of hero */}
        <div className="city-skyline absolute right-0 bottom-0 left-0 z-[1]">
          <CitySkyline />
        </div>

        <div className="relative z-10 mx-auto max-w-xl">
          {/* Geometric accent */}
          <GeometricPattern className="mx-auto mb-4 opacity-60" />

          {/* Parent blessings */}
          {(groomParents ?? brideParents) && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mb-2 text-xs font-medium tracking-[0.3em] text-[#00D4FF]/60 uppercase"
            >
              With the blessings of
            </motion.p>
          )}
          {groomParents && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mb-1 text-sm font-light text-white/50"
            >
              {groomParents}
            </motion.p>
          )}
          {brideParents && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="mb-6 text-sm font-light text-white/50"
            >
              {brideParents}
            </motion.p>
          )}

          {/* Couple names — clean sans-serif emphasis */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
            className="text-5xl leading-tight font-extralight tracking-widest text-white uppercase sm:text-7xl"
          >
            {invite.groomName}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="my-5 flex items-center justify-center gap-4"
          >
            <NeonLine />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.9 }}
            className="text-5xl leading-tight font-extralight tracking-widest text-white uppercase sm:text-7xl"
          >
            {invite.brideName}
          </motion.h1>

          {/* Date */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 text-sm font-medium tracking-widest text-[#00D4FF]/70 uppercase"
          >
            {formatDate(invite.weddingDate)}
          </motion.p>

          {/* Venue */}
          {invite.venue && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="mt-3 flex items-center justify-center gap-2 text-sm font-light text-white/40"
            >
              <MapPin className="h-4 w-4 text-[#00D4FF]/50" /> {invite.venue}
            </motion.p>
          )}

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-14"
          >
            <span className="animate-bounce inline-block text-[#00D4FF]/40">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </span>
          </motion.div>
        </div>
      </section>

      {/* Neon divider */}
      <div className="py-6">
        <NeonLine className="opacity-50" />
      </div>

      {/* ============================================================ */}
      {/*  SECTION 2 — Events Grid (Glass-morphism Cards)              */}
      {/* ============================================================ */}
      <section className="relative z-10 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="scroll-fade mb-10 text-center">
            <GeometricPattern className="mx-auto mb-3 opacity-50" />
            <h2 className="text-3xl font-extralight tracking-widest text-white uppercase sm:text-4xl">
              The Events
            </h2>
            <p className="mt-2 text-sm font-light text-white/40">
              A curated series of celebrations
            </p>
            <DiamondDivider className="mt-4" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, idx) => (
              <div
                key={idx}
                className="glass-card group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-[#00D4FF]/30 hover:bg-white/10 hover:shadow-[0_0_25px_rgba(0,212,255,0.08)]"
              >
                {/* Top neon accent line */}
                <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-[#00D4FF]/30 to-transparent" />

                {/* Event number badge */}
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-md border border-[#00D4FF]/25 bg-[#00D4FF]/10 text-xs font-bold text-[#00D4FF]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-[#00D4FF]/20 to-transparent" />
                </div>

                <h3 className="mb-4 text-lg font-semibold tracking-wide text-white">
                  {event.name}
                </h3>

                <div className="space-y-2.5 text-sm text-white/50">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#00D4FF]/60" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#00D4FF]/60" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#00D4FF]/60" />
                    <span>{event.venue}</span>
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-[#00D4FF]/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Neon divider */}
      <div className="py-6">
        <NeonLine className="opacity-40" />
      </div>

      {/* ============================================================ */}
      {/*  SECTION 3 — Couple Photo                                    */}
      {/* ============================================================ */}
      {invite.couplePhoto && (
        <section className="relative z-10 px-4 py-20">
          <div className="scroll-fade mx-auto max-w-lg text-center">
            {/* Photo with modern frame */}
            <div className="relative mx-auto mb-8 h-80 w-80 overflow-hidden rounded-2xl shadow-[0_0_40px_rgba(0,212,255,0.1)] sm:h-96 sm:w-96">
              <div className="absolute inset-0 rounded-2xl border border-white/10" />
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${invite.couplePhoto})` }}
              />
              {/* Neon corner accents */}
              <div className="absolute top-0 left-0 h-8 w-px bg-gradient-to-b from-[#00D4FF]/60 to-transparent" />
              <div className="absolute top-0 left-0 h-px w-8 bg-gradient-to-r from-[#00D4FF]/60 to-transparent" />
              <div className="absolute right-0 bottom-0 h-8 w-px bg-gradient-to-t from-[#00D4FF]/60 to-transparent" />
              <div className="absolute right-0 bottom-0 h-px w-8 bg-gradient-to-l from-[#00D4FF]/60 to-transparent" />
            </div>
            <DiamondDivider />
            <p className="mt-4 text-lg font-extralight tracking-widest text-white/60 uppercase">
              {invite.groomName} & {invite.brideName}
            </p>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/*  SECTION 4 — Things to Know                                  */}
      {/* ============================================================ */}
      <section className="relative z-10 px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="scroll-fade mb-10 text-center">
            <h2 className="text-3xl font-extralight tracking-widest text-white uppercase sm:text-4xl">
              Good to Know
            </h2>
            <NeonLine className="mt-4 opacity-40" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {thingsToKnow.map((item, idx) => (
              <div
                key={idx}
                className="scroll-fade rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
              >
                <h4 className="mb-1 text-sm font-semibold tracking-wider text-[#00D4FF] uppercase">
                  {item.label}
                </h4>
                <p className="text-sm leading-relaxed font-light text-white/50">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Neon divider */}
      <div className="py-6">
        <NeonLine className="opacity-40" />
      </div>

      {/* ============================================================ */}
      {/*  SECTION 5 — Countdown                                       */}
      {/* ============================================================ */}
      <section className="relative z-10 px-4 py-20">
        <div className="scroll-fade mx-auto max-w-xl text-center">
          <h2 className="mb-2 text-3xl font-extralight tracking-widest text-white uppercase sm:text-4xl">
            Countdown
          </h2>
          <p className="mb-10 text-sm font-light text-white/35">The clock is ticking</p>

          <div className="grid grid-cols-4 gap-4">
            {(
              [
                { label: "Days", value: countdown.days },
                { label: "Hrs", value: countdown.hours },
                { label: "Min", value: countdown.minutes },
                { label: "Sec", value: countdown.seconds },
              ] as const
            ).map((unit) => (
              <div key={unit.label} className="countdown-block flex flex-col items-center">
                <div className="relative flex h-20 w-20 items-center justify-center rounded-lg border border-white/10 bg-white/5 shadow-lg backdrop-blur-sm sm:h-24 sm:w-24">
                  {/* Neon top edge */}
                  <div className="absolute top-0 right-2 left-2 h-px bg-gradient-to-r from-transparent via-[#00D4FF]/40 to-transparent" />
                  <span className="text-3xl font-extralight text-white sm:text-4xl">
                    {String(unit.value).padStart(2, "0")}
                  </span>
                </div>
                <span className="mt-2 text-[10px] font-medium tracking-[0.2em] text-[#00D4FF]/50 uppercase">
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
          <div className="scroll-fade mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md sm:p-12">
            {/* Neon top border */}
            <div className="absolute top-0 right-8 left-8 h-px bg-gradient-to-r from-transparent via-[#00D4FF]/30 to-transparent" />

            <GeometricPattern className="mx-auto mb-4 opacity-40" />
            <h2 className="mb-6 text-3xl font-extralight tracking-widest text-white uppercase sm:text-4xl">
              Our Words
            </h2>
            <p className="text-base leading-relaxed font-light text-white/55 italic">
              &ldquo;{invite.coupleMessage ?? invite.story}&rdquo;
            </p>
            <DiamondDivider className="mt-6" />
            <p className="mt-4 text-sm font-extralight tracking-widest text-[#00D4FF]/50 uppercase">
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
          <h2 className="text-3xl font-extralight tracking-widest text-white uppercase sm:text-4xl">
            Join Us
          </h2>
          <p className="text-sm font-light text-white/40">
            Your presence would make our celebration complete
          </p>

          <Button
            size="lg"
            className="w-full max-w-xs bg-[#00D4FF] font-medium tracking-wider text-gray-900 uppercase hover:bg-[#00D4FF]/90"
            onClick={() => setRsvpOpen(true)}
          >
            RSVP Now
          </Button>

          <div className="flex w-full max-w-xs gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 border-white/20 text-white hover:bg-white/10"
              onClick={() => void handleShare()}
            >
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10"
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
      {/*  SECTION 8 — Footer + Watermark                              */}
      {/* ============================================================ */}
      <footer className="relative z-10 overflow-hidden pt-4 pb-4">
        {/* Neon line separator */}
        <NeonLine className="mb-8 opacity-30" />

        <div className="relative px-4 py-8 text-center">
          {/* Background city dots */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-10">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-[#00D4FF]"
                style={{
                  width: `${1 + Math.random() * 2}px`,
                  height: `${1 + Math.random() * 2}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          <div className="relative">
            <DiamondDivider className="mb-4" />
            <p className="text-sm font-extralight tracking-widest text-white/40 uppercase">
              {invite.groomName} & {invite.brideName}
            </p>
            <p className="mt-1 text-xs font-light text-white/25">
              {formatDate(invite.weddingDate)}
            </p>
            <CardoraWatermark className="mt-8 pb-2 text-center text-xs text-white/20" />
          </div>
        </div>
      </footer>

      {/* RSVP Modal */}
      <RsvpModal open={rsvpOpen} onOpenChange={setRsvpOpen} inviteSlug={invite.slug} />
    </div>
  );
}
