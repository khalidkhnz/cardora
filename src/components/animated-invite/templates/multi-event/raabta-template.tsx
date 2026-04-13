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
/*  Islamic Geometric Pattern SVG                                              */
/* -------------------------------------------------------------------------- */

function IslamicGeometricBorder({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "mx-auto my-6 h-16 w-full text-[#DAA520]"}
    >
      {/* Repeating geometric star pattern */}
      {[0, 100, 200, 300, 400, 500].map((x) => (
        <g key={x} transform={`translate(${x}, 0)`}>
          {/* Eight-pointed star */}
          <polygon
            points="50,10 55,30 75,30 60,42 65,62 50,50 35,62 40,42 25,30 45,30"
            fill="currentColor"
            opacity="0.3"
          />
          {/* Inner star detail */}
          <polygon
            points="50,20 53,35 65,35 56,43 59,55 50,48 41,55 44,43 35,35 47,35"
            fill="currentColor"
            opacity="0.5"
          />
          {/* Center circle */}
          <circle cx="50" cy="40" r="4" fill="currentColor" opacity="0.6" />
          {/* Connecting lines */}
          <line x1="0" y1="40" x2="25" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
          <line x1="75" y1="40" x2="100" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
        </g>
      ))}
      {/* Top and bottom border lines */}
      <line x1="0" y1="5" x2="600" y2="5" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line x1="0" y1="75" x2="600" y2="75" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Crescent Moon and Star SVG                                                 */
/* -------------------------------------------------------------------------- */

function CrescentMoonStar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "h-16 w-16 text-[#DAA520]"}
    >
      {/* Crescent moon */}
      <path
        d="M60 15 A35 35 0 1 0 60 85 A28 28 0 1 1 60 15Z"
        fill="currentColor"
        opacity="0.6"
      />
      {/* Star */}
      <polygon
        points="72,30 75,40 85,40 77,46 80,56 72,50 64,56 67,46 59,40 69,40"
        fill="currentColor"
        opacity="0.7"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Arabic-Inspired Ornamental Arch SVG                                        */
/* -------------------------------------------------------------------------- */

function OrnamentalArch({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "mx-auto my-6 h-8 w-64 text-[#DAA520]"}
    >
      {/* Central ornament */}
      <path
        d="M150 5 L160 15 L150 25 L140 15 Z"
        fill="currentColor"
        opacity="0.5"
      />
      <circle cx="150" cy="15" r="3" fill="currentColor" opacity="0.7" />
      {/* Left flowing line */}
      <path
        d="M135 15 Q110 5 80 15 Q60 20 40 15 Q25 10 10 15"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M135 15 Q110 25 80 15 Q60 10 40 15 Q25 20 10 15"
        stroke="currentColor"
        strokeWidth="0.6"
        fill="none"
        opacity="0.3"
      />
      {/* Right flowing line */}
      <path
        d="M165 15 Q190 5 220 15 Q240 20 260 15 Q275 10 290 15"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M165 15 Q190 25 220 15 Q240 10 260 15 Q275 20 290 15"
        stroke="currentColor"
        strokeWidth="0.6"
        fill="none"
        opacity="0.3"
      />
      {/* Side ornaments */}
      <circle cx="10" cy="15" r="2.5" fill="currentColor" opacity="0.4" />
      <circle cx="290" cy="15" r="2.5" fill="currentColor" opacity="0.4" />
      {/* Additional diamonds */}
      <path d="M80 12 L83 15 L80 18 L77 15 Z" fill="currentColor" opacity="0.35" />
      <path d="M220 12 L223 15 L220 18 L217 15 Z" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Arch-Shaped Event Card Clip Path                                           */
/* -------------------------------------------------------------------------- */

function ArchEventCard({
  event,
  index,
}: {
  event: { name: string; date: string; venue: string; time: string };
  index: number;
}) {
  return (
    <div className="scroll-fade group">
      <div
        className="relative overflow-hidden rounded-b-2xl border border-[#DAA520]/30 bg-gradient-to-b from-[#0a5c36]/80 to-[#0a2e1f]/90 p-6 pt-10 shadow-lg shadow-black/20 backdrop-blur-sm"
        style={{
          clipPath: "polygon(0 15%, 5% 5%, 15% 1%, 30% 0%, 50% 0%, 70% 0%, 85% 1%, 95% 5%, 100% 15%, 100% 100%, 0% 100%)",
        }}
      >
        {/* Arch top decorative border */}
        <div className="pointer-events-none absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#DAA520]/50 to-transparent" />

        {/* Event icon */}
        <div className="mb-4 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#DAA520]/40 bg-[#DAA520]/10">
            <span className="text-lg">
              {index === 0 && "🌿"}
              {index === 1 && "🌼"}
              {index === 2 && "🎵"}
              {index === 3 && "🕌"}
              {index === 4 && "🍽️"}
              {index > 4 && "✨"}
            </span>
          </div>
        </div>

        {/* Event name */}
        <h3 className="mb-3 text-center font-serif text-2xl font-semibold tracking-wide text-[#DAA520]">
          {event.name}
        </h3>

        {/* Thin gold divider */}
        <div className="mx-auto mb-3 h-px w-16 bg-gradient-to-r from-transparent via-[#DAA520]/60 to-transparent" />

        {/* Date & Time */}
        <div className="mb-2 flex items-center justify-center gap-2 text-sm text-[#FFF8E7]/80">
          <Calendar className="h-3.5 w-3.5 text-[#DAA520]/70" />
          <span>{event.date}</span>
        </div>
        <div className="mb-2 flex items-center justify-center gap-2 text-sm text-[#FFF8E7]/80">
          <Clock className="h-3.5 w-3.5 text-[#DAA520]/70" />
          <span>{event.time}</span>
        </div>

        {/* Venue */}
        <div className="flex items-center justify-center gap-2 text-sm text-[#FFF8E7]/60">
          <MapPin className="h-3.5 w-3.5 text-[#DAA520]/50" />
          <span>{event.venue}</span>
        </div>

        {/* Corner decorations */}
        <div className="pointer-events-none absolute bottom-2 left-2 h-6 w-6 border-b border-l border-[#DAA520]/20" />
        <div className="pointer-events-none absolute bottom-2 right-2 h-6 w-6 border-b border-r border-[#DAA520]/20" />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Floating Gold Particles                                                    */
/* -------------------------------------------------------------------------- */

function FloatingGoldParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${5 + (i * 5.3) % 90}%`,
    delay: i * 0.6,
    duration: 8 + (i % 5) * 2,
    size: 3 + (i % 4) * 1.5,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#DAA520]"
          style={{
            left: p.left,
            top: -10,
            width: p.size,
            height: p.size,
            opacity: 0,
          }}
          animate={{
            y: [0, typeof window !== "undefined" ? window.innerHeight + 20 : 1200],
            opacity: [0, 0.4, 0.4, 0],
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

/* -------------------------------------------------------------------------- */
/*  Main Template Component                                                    */
/* -------------------------------------------------------------------------- */

export default function RaabtaTemplate({ invite, isDemo }: TemplateProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const { isPlaying, toggle } = useMusicPlayer(invite.musicUrl);
  const countdown = useCountdown(invite.weddingDate);

  // Initialize Lenis smooth scrolling
  useLenis();

  // GSAP ScrollTrigger animations
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

      // Parallax effect for background pattern
      gsap.utils.toArray<HTMLElement>(".parallax-pattern").forEach((el) => {
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

      // Scale-in effect for countdown boxes
      gsap.utils.toArray<HTMLElement>(".countdown-box").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.7 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: i * 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Default events for Islamic wedding
  const events = invite.events ?? [
    { name: "Mehendi", date: "Date TBA", venue: invite.venue ?? "Venue TBA", time: "6 PM" },
    { name: "Manjha", date: "Date TBA", venue: invite.venue ?? "Venue TBA", time: "6 PM" },
    { name: "Sangeet", date: "Date TBA", venue: invite.venue ?? "Venue TBA", time: "7 PM" },
    { name: "Nikah", date: invite.weddingDate ?? "Date TBA", venue: invite.venue ?? "Venue TBA", time: "11 AM" },
    { name: "Walima", date: invite.receptionDate ?? "Date TBA", venue: invite.venue ?? "Venue TBA", time: "7 PM" },
  ];

  async function handleShare() {
    const url = `${window.location.origin}/wedding/${invite.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${invite.groomName} & ${invite.brideName} - Wedding Invitation`,
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

  // Extract Things to Know data and hashtag from extraData
  const thingsToKnow = (invite.extraData?.thingsToKnow as { label: string; detail: string }[] | undefined) ?? [];
  const hashtag = (invite.extraData?.hashtag as string | undefined) ?? null;

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0a2e1f] via-[#0a5c36] to-[#0a2e1f] text-[#FFF8E7]"
    >
      {/* Floating gold particles */}
      <FloatingGoldParticles />

      {/* Subtle geometric pattern overlay */}
      <div className="parallax-pattern pointer-events-none fixed inset-0 z-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23DAA520' stroke-width='0.5'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z'/%3E%3Ccircle cx='30' cy='30' r='10'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Music toggle */}
      {invite.musicUrl && (
        <MusicToggleButton
          isPlaying={isPlaying}
          onToggle={toggle}
          className="fixed top-4 right-4 z-50 rounded-full border border-[#DAA520]/30 bg-[#0a5c36]/80 p-3 shadow-lg backdrop-blur-sm transition-colors hover:bg-[#0a5c36]"
        />
      )}

      {/* Demo banner */}
      {isDemo && (
        <div className="relative z-10 bg-[#DAA520] py-2 text-center text-sm font-medium text-[#0a2e1f]">
          This is a demo preview. Complete payment to use your own details.
        </div>
      )}

      {/* ================================================================== */}
      {/*  CONTENT                                                           */}
      {/* ================================================================== */}
      <div className="relative z-10 mx-auto max-w-2xl px-4 py-12 sm:py-16">

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 1 - HERO: BISMILLAH + COUPLE NAMES + PARENT BLESSINGS   */}
        {/* ---------------------------------------------------------------- */}
        <motion.section
          className="mb-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          {/* Bismillah blessing */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4"
          >
            <p className="font-serif text-3xl leading-relaxed text-[#DAA520] sm:text-4xl" style={{ fontFamily: "serif" }}>
              &#1576;&#1616;&#1587;&#1618;&#1605;&#1616; &#1575;&#1604;&#1604;&#1617;&#1614;&#1607;&#1616; &#1575;&#1604;&#1585;&#1617;&#1614;&#1581;&#1618;&#1605;&#1614;&#1575;&#1606;&#1616; &#1575;&#1604;&#1585;&#1617;&#1614;&#1581;&#1616;&#1610;&#1605;&#1616;
            </p>
            <p className="mt-2 text-xs tracking-[0.2em] text-[#FFF8E7]/50 uppercase">
              In the name of Allah, the Most Gracious, the Most Merciful
            </p>
          </motion.div>

          <OrnamentalArch className="mx-auto my-6 h-8 w-64 text-[#DAA520]" />

          {/* Crescent and star */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto mb-6 flex justify-center"
          >
            <CrescentMoonStar className="h-14 w-14 text-[#DAA520]" />
          </motion.div>

          {/* Parent blessings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mb-8"
          >
            <p className="mb-1 text-sm tracking-[0.15em] text-[#FFF8E7]/60 uppercase">
              With the blessings of
            </p>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Groom's parents */}
              <div className="text-center">
                {invite.groomFatherName && invite.groomMotherName ? (
                  <>
                    <p className="text-xs tracking-wider text-[#DAA520]/70 uppercase">
                      Son of
                    </p>
                    <p className="mt-1 font-serif text-lg text-[#FFF8E7]/90">
                      {invite.groomFatherName}
                    </p>
                    <p className="font-serif text-sm text-[#FFF8E7]/70">
                      & {invite.groomMotherName}
                    </p>
                  </>
                ) : invite.groomFatherName ? (
                  <>
                    <p className="text-xs tracking-wider text-[#DAA520]/70 uppercase">Son of</p>
                    <p className="mt-1 font-serif text-lg text-[#FFF8E7]/90">{invite.groomFatherName}</p>
                  </>
                ) : null}
              </div>

              {/* Bride's parents */}
              <div className="text-center">
                {invite.brideFatherName && invite.brideMotherName ? (
                  <>
                    <p className="text-xs tracking-wider text-[#DAA520]/70 uppercase">
                      Daughter of
                    </p>
                    <p className="mt-1 font-serif text-lg text-[#FFF8E7]/90">
                      {invite.brideFatherName}
                    </p>
                    <p className="font-serif text-sm text-[#FFF8E7]/70">
                      & {invite.brideMotherName}
                    </p>
                  </>
                ) : invite.brideFatherName ? (
                  <>
                    <p className="text-xs tracking-wider text-[#DAA520]/70 uppercase">Daughter of</p>
                    <p className="mt-1 font-serif text-lg text-[#FFF8E7]/90">{invite.brideFatherName}</p>
                  </>
                ) : null}
              </div>
            </div>
          </motion.div>

          {/* Invitation text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mb-4 text-sm tracking-[0.15em] text-[#FFF8E7]/50 uppercase"
          >
            Request the honour of your presence at the wedding of
          </motion.p>

          {/* Hero image */}
          {invite.heroImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mx-auto mb-8 h-56 w-56 overflow-hidden rounded-full border-2 border-[#DAA520]/40 shadow-2xl shadow-[#DAA520]/10 sm:h-64 sm:w-64"
            >
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${invite.heroImage})` }}
              />
            </motion.div>
          )}

          {/* Couple Names */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h1 className="font-serif text-5xl font-light leading-tight text-[#DAA520] sm:text-6xl lg:text-7xl">
              {invite.groomName}
            </h1>

            {/* Gold divider with heart */}
            <div className="my-4 flex items-center justify-center gap-4">
              <motion.div
                className="h-px w-16 bg-gradient-to-r from-transparent to-[#DAA520]/60 sm:w-24"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.0, duration: 0.8 }}
              />
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.1, duration: 0.6, type: "spring" }}
              >
                <Heart className="h-5 w-5 fill-[#DAA520]/50 text-[#DAA520]" />
              </motion.div>
              <motion.div
                className="h-px w-16 bg-gradient-to-l from-transparent to-[#DAA520]/60 sm:w-24"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.0, duration: 0.8 }}
              />
            </div>

            <h1 className="font-serif text-5xl font-light leading-tight text-[#DAA520] sm:text-6xl lg:text-7xl">
              {invite.brideName}
            </h1>
          </motion.div>

          {/* Wedding date preview */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-6 text-base text-[#FFF8E7]/60"
          >
            {formatWeddingDate(invite.weddingDate)}
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="mt-12"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto h-8 w-px bg-[#DAA520]/40"
            />
          </motion.div>
        </motion.section>

        <IslamicGeometricBorder />

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 2 - EVENTS GRID                                         */}
        {/* ---------------------------------------------------------------- */}
        <section className="mb-16">
          <div className="scroll-fade mb-10 text-center">
            <p className="mb-2 text-xs tracking-[0.3em] text-[#DAA520]/60 uppercase">
              Celebrations
            </p>
            <h2 className="font-serif text-3xl text-[#DAA520] sm:text-4xl">
              Wedding Events
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {events.map((event, index) => (
              <ArchEventCard key={index} event={event} index={index} />
            ))}
          </div>
        </section>

        <OrnamentalArch />

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 3 - COUPLE PHOTO                                        */}
        {/* ---------------------------------------------------------------- */}
        {invite.couplePhoto && (
          <section className="mb-16">
            <div className="scroll-fade overflow-hidden rounded-2xl border border-[#DAA520]/20 shadow-xl shadow-black/20">
              <div
                className="aspect-[4/3] w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${invite.couplePhoto})` }}
              />
            </div>
            <div className="mt-4 text-center">
              <p className="font-serif text-lg text-[#FFF8E7]/60 italic">
                {invite.groomName} & {invite.brideName}
              </p>
            </div>
          </section>
        )}

        {/* Gallery */}
        {invite.galleryImages.length > 0 && (
          <section className="mb-16">
            <div className="scroll-fade mb-8 text-center">
              <h2 className="font-serif text-2xl text-[#DAA520]">Gallery</h2>
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
          </section>
        )}

        <IslamicGeometricBorder />

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 4 - THINGS TO KNOW                                      */}
        {/* ---------------------------------------------------------------- */}
        {thingsToKnow.length > 0 && (
          <section className="mb-16">
            <div className="scroll-fade mb-10 text-center">
              <p className="mb-2 text-xs tracking-[0.3em] text-[#DAA520]/60 uppercase">
                Helpful Information
              </p>
              <h2 className="font-serif text-3xl text-[#DAA520]">
                Things to Know
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {thingsToKnow.map((item, idx) => (
                <div
                  key={idx}
                  className="scroll-fade rounded-xl border border-[#DAA520]/20 bg-[#0a5c36]/40 p-5 backdrop-blur-sm"
                >
                  <h3 className="mb-2 font-serif text-lg text-[#DAA520]">
                    {item.label}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#FFF8E7]/60">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Story section */}
        {invite.story && (
          <section className="mb-16">
            <div className="scroll-fade rounded-2xl border border-[#DAA520]/20 bg-[#0a5c36]/40 p-8 text-center backdrop-blur-sm sm:p-10">
              <h2 className="mb-2 font-serif text-2xl text-[#DAA520]">
                Our Story
              </h2>
              <OrnamentalArch className="mx-auto my-4 h-6 w-48 text-[#DAA520]/50" />
              <p className="leading-relaxed text-[#FFF8E7]/70">
                {invite.story}
              </p>
            </div>
          </section>
        )}

        <OrnamentalArch />

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 5 - COUNTDOWN TIMER                                     */}
        {/* ---------------------------------------------------------------- */}
        {invite.weddingDate && (
          <section className="mb-16">
            <div className="scroll-fade mb-8 text-center">
              <p className="mb-2 text-xs tracking-[0.3em] text-[#DAA520]/60 uppercase">
                The Big Day
              </p>
              <h2 className="font-serif text-3xl text-[#DAA520]">
                Counting Down
              </h2>
            </div>

            <div className="rounded-2xl border border-[#DAA520]/20 bg-[#0a5c36]/40 p-8 backdrop-blur-sm">
              <div className="grid grid-cols-4 gap-3 sm:gap-6">
                {[
                  { label: "Days", value: countdown.days },
                  { label: "Hours", value: countdown.hours },
                  { label: "Minutes", value: countdown.minutes },
                  { label: "Seconds", value: countdown.seconds },
                ].map((unit) => (
                  <div key={unit.label} className="countdown-box text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl border border-[#DAA520]/30 bg-[#0a2e1f]/60 sm:h-20 sm:w-20">
                      <span className="font-serif text-2xl font-semibold text-[#DAA520] sm:text-3xl">
                        {String(unit.value).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="mt-2 block text-[10px] tracking-[0.2em] text-[#FFF8E7]/50 uppercase">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-[#FFF8E7]/50">
                  {formatWeddingDate(invite.weddingDate)}
                  {invite.weddingTime && ` at ${invite.weddingTime}`}
                </p>
                {invite.venue && (
                  <p className="mt-1 flex items-center justify-center gap-1 text-sm text-[#FFF8E7]/40">
                    <MapPin className="h-3 w-3" /> {invite.venue}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        <IslamicGeometricBorder />

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 6 - COUPLE MESSAGE                                      */}
        {/* ---------------------------------------------------------------- */}
        {invite.coupleMessage && (
          <section className="mb-16">
            <div className="scroll-fade rounded-2xl border border-[#DAA520]/20 bg-[#0a5c36]/40 p-8 text-center backdrop-blur-sm sm:p-10">
              <CrescentMoonStar className="mx-auto mb-4 h-10 w-10 text-[#DAA520]/40" />
              <p className="font-serif text-lg leading-relaxed text-[#FFF8E7]/80 italic">
                &ldquo;{invite.coupleMessage}&rdquo;
              </p>
              <p className="mt-4 text-sm text-[#DAA520]/60">
                &mdash; {invite.groomName} & {invite.brideName}
              </p>
            </div>
          </section>
        )}

        <OrnamentalArch />

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 7 - RSVP + SHARE BUTTONS                               */}
        {/* ---------------------------------------------------------------- */}
        <section className="mb-16 text-center">
          <div className="scroll-fade">
            <h2 className="mb-4 font-serif text-3xl text-[#DAA520]">
              Will You Join Us?
            </h2>
            <p className="mb-8 text-sm text-[#FFF8E7]/60">
              We would be honoured to have you celebrate this blessed occasion with us.
            </p>

            {hashtag && (
              <p className="mb-4 font-serif text-lg text-[#DAA520]/70 italic">
                {hashtag}
              </p>
            )}

            <div className="flex flex-col items-center gap-4">
              <Button
                size="lg"
                className="w-full max-w-xs border border-[#DAA520]/50 bg-[#DAA520] text-[#0a2e1f] shadow-lg shadow-[#DAA520]/20 hover:bg-[#DAA520]/90"
                onClick={() => setRsvpOpen(true)}
              >
                <Heart className="mr-2 h-4 w-4" />
                RSVP Now
              </Button>

              <div className="flex w-full max-w-xs gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 border-[#DAA520]/30 bg-transparent text-[#DAA520] hover:bg-[#DAA520]/10 hover:text-[#DAA520]"
                  onClick={() => void handleShare()}
                >
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#DAA520]/30 bg-transparent text-[#DAA520] hover:bg-[#DAA520]/10 hover:text-[#DAA520]"
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
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 8 - FOOTER / WATERMARK                                  */}
        {/* ---------------------------------------------------------------- */}
        <footer className="text-center">
          <IslamicGeometricBorder className="mx-auto mb-4 h-12 w-full text-[#DAA520]/30" />

          <div className="scroll-fade">
            <CrescentMoonStar className="mx-auto mb-3 h-8 w-8 text-[#DAA520]/30" />
            <p className="font-serif text-lg text-[#DAA520]/70">
              {invite.groomName} & {invite.brideName}
            </p>
            <p className="mt-1 text-sm text-[#FFF8E7]/40">
              {formatWeddingDate(invite.weddingDate)}
            </p>
            {invite.venue && (
              <p className="mt-1 text-xs text-[#FFF8E7]/30">
                {invite.venue}
              </p>
            )}

            <p className="mt-6 text-xs text-[#FFF8E7]/30 italic">
              May Allah bless this union with love, mercy, and tranquility
            </p>
          </div>

          <CardoraWatermark className="mt-10 pb-8 text-center text-xs text-[#FFF8E7]/20" />
        </footer>
      </div>

      {/* RSVP Modal */}
      <RsvpModal open={rsvpOpen} onOpenChange={setRsvpOpen} inviteSlug={invite.slug} />
    </div>
  );
}
