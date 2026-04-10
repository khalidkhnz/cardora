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
/*  Khanda (Sikh Symbol) SVG                                                   */
/* -------------------------------------------------------------------------- */

function KhandaSymbol({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "h-28 w-28 text-[#DAA520]"}
    >
      {/* Central double-edged sword (Khanda) */}
      <path
        d="M100 20 L103 30 L103 180 L100 190 L97 180 L97 30 Z"
        fill="currentColor"
        opacity="0.8"
      />
      {/* Sword tip */}
      <path
        d="M95 20 L100 5 L105 20 Z"
        fill="currentColor"
        opacity="0.7"
      />
      {/* Chakra (circle) */}
      <circle cx="100" cy="105" r="40" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.6" />
      <circle cx="100" cy="105" r="36" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
      {/* Left Kirpan (curved sword) */}
      <path
        d="M60 105 Q45 70 55 40 Q58 32 62 35 Q52 65 65 100"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M55 40 Q52 35 48 38 Q44 42 50 44"
        fill="currentColor"
        opacity="0.5"
      />
      {/* Right Kirpan (curved sword) */}
      <path
        d="M140 105 Q155 70 145 40 Q142 32 138 35 Q148 65 135 100"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M145 40 Q148 35 152 38 Q156 42 150 44"
        fill="currentColor"
        opacity="0.5"
      />
      {/* Bottom handle of Khanda */}
      <path
        d="M96 180 L92 195 L100 200 L108 195 L104 180"
        fill="currentColor"
        opacity="0.6"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Ik Onkar Symbol                                                            */
/* -------------------------------------------------------------------------- */

function IkOnkar({ className }: { className?: string }) {
  return (
    <div className={className ?? "text-4xl text-[#DAA520]"}>
      <span style={{ fontFamily: "serif", fontWeight: 700, letterSpacing: "0.05em" }}>
        &#2676;
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sikh Architectural Border SVG                                              */
/* -------------------------------------------------------------------------- */

function SikhArchBorder({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "mx-auto my-6 h-14 w-full text-[#DAA520]"}
    >
      {/* Central dome/arch */}
      <path
        d="M250 50 Q250 15 300 10 Q350 15 350 50"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
      {/* Inner dome */}
      <path
        d="M265 50 Q265 25 300 18 Q335 25 335 50"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity="0.3"
      />
      {/* Dome finial */}
      <circle cx="300" cy="8" r="3" fill="currentColor" opacity="0.6" />
      <line x1="300" y1="3" x2="300" y2="0" stroke="currentColor" strokeWidth="1" opacity="0.5" />

      {/* Left decorative elements */}
      {[0, 60, 120, 180].map((x) => (
        <g key={`left-${x}`}>
          <path
            d={`M${x + 20} 50 Q${x + 20} 32 ${x + 35} 28 Q${x + 50} 32 ${x + 50} 50`}
            stroke="currentColor"
            strokeWidth="0.8"
            fill="none"
            opacity="0.3"
          />
          <circle cx={x + 35} cy="26" r="1.5" fill="currentColor" opacity="0.4" />
        </g>
      ))}
      {/* Right decorative elements */}
      {[350, 410, 470, 530].map((x) => (
        <g key={`right-${x}`}>
          <path
            d={`M${x} 50 Q${x} 32 ${x + 15} 28 Q${x + 30} 32 ${x + 30} 50`}
            stroke="currentColor"
            strokeWidth="0.8"
            fill="none"
            opacity="0.3"
          />
          <circle cx={x + 15} cy="26" r="1.5" fill="currentColor" opacity="0.4" />
        </g>
      ))}
      {/* Bottom line */}
      <line x1="10" y1="55" x2="590" y2="55" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line x1="20" y1="58" x2="580" y2="58" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Saffron Ornamental Divider                                                 */
/* -------------------------------------------------------------------------- */

function SaffronDivider({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "mx-auto my-4 h-6 w-56 text-[#FF6F00]"}
    >
      {/* Center lotus-like ornament */}
      <ellipse cx="150" cy="15" rx="8" ry="5" fill="currentColor" opacity="0.3" />
      <ellipse cx="150" cy="15" rx="5" ry="8" fill="currentColor" opacity="0.3" />
      <circle cx="150" cy="15" r="3" fill="currentColor" opacity="0.5" />
      {/* Left petals */}
      <ellipse cx="135" cy="15" rx="6" ry="3" fill="currentColor" opacity="0.2" transform="rotate(-15 135 15)" />
      <ellipse cx="120" cy="15" rx="5" ry="2.5" fill="currentColor" opacity="0.15" />
      {/* Right petals */}
      <ellipse cx="165" cy="15" rx="6" ry="3" fill="currentColor" opacity="0.2" transform="rotate(15 165 15)" />
      <ellipse cx="180" cy="15" rx="5" ry="2.5" fill="currentColor" opacity="0.15" />
      {/* Flowing lines */}
      <path d="M105 15 Q80 8 50 15 Q30 18 10 15" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.3" />
      <path d="M195 15 Q220 8 250 15 Q270 18 290 15" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.3" />
      {/* End dots */}
      <circle cx="10" cy="15" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="290" cy="15" r="2" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Dome-Shaped Event Card                                                     */
/* -------------------------------------------------------------------------- */

function DomeEventCard({
  event,
  index,
  isAnandKaraj,
}: {
  event: { name: string; date: string; venue: string; time: string };
  index: number;
  isAnandKaraj: boolean;
}) {
  return (
    <div className={`scroll-fade ${isAnandKaraj ? "sm:col-span-2" : ""}`}>
      <div
        className={`relative overflow-hidden rounded-b-2xl border p-6 pt-10 shadow-lg backdrop-blur-sm ${
          isAnandKaraj
            ? "border-[#FF6F00]/40 bg-gradient-to-b from-[#1a237e]/90 to-[#1a1a3e]/95 shadow-[#FF6F00]/10"
            : "border-[#DAA520]/20 bg-gradient-to-b from-[#1a237e]/70 to-[#1a1a3e]/80 shadow-black/20"
        }`}
        style={{
          clipPath: "polygon(0 12%, 8% 4%, 20% 1%, 35% 0%, 50% 0%, 65% 0%, 80% 1%, 92% 4%, 100% 12%, 100% 100%, 0% 100%)",
        }}
      >
        {/* Top decorative line */}
        <div
          className={`pointer-events-none absolute top-0 right-0 left-0 h-1 ${
            isAnandKaraj
              ? "bg-gradient-to-r from-transparent via-[#FF6F00]/60 to-transparent"
              : "bg-gradient-to-r from-transparent via-[#DAA520]/40 to-transparent"
          }`}
        />

        {/* Centerpiece indicator for Anand Karaj */}
        {isAnandKaraj && (
          <div className="mb-3 flex justify-center">
            <IkOnkar className="text-3xl text-[#FF6F00]/60" />
          </div>
        )}

        {/* Event icon */}
        <div className="mb-4 flex justify-center">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full border ${
              isAnandKaraj
                ? "border-[#FF6F00]/40 bg-[#FF6F00]/15"
                : "border-[#DAA520]/30 bg-[#DAA520]/10"
            }`}
          >
            <span className="text-lg">
              {event.name === "Mehendi" && "🌿"}
              {event.name === "Jaggo" && "🔥"}
              {event.name === "Anand Karaj" && "🙏"}
              {event.name === "Reception" && "🎉"}
              {!["Mehendi", "Jaggo", "Anand Karaj", "Reception"].includes(event.name) && "✨"}
            </span>
          </div>
        </div>

        {/* Event name */}
        <h3
          className={`mb-3 text-center font-serif text-2xl font-semibold tracking-wide ${
            isAnandKaraj ? "text-3xl text-[#FF6F00]" : "text-[#DAA520]"
          }`}
        >
          {event.name}
        </h3>

        {/* Gold divider */}
        <div
          className={`mx-auto mb-3 h-px w-16 bg-gradient-to-r from-transparent to-transparent ${
            isAnandKaraj ? "via-[#FF6F00]/60" : "via-[#DAA520]/40"
          }`}
        />

        {/* Date & Time */}
        <div className="mb-2 flex items-center justify-center gap-2 text-sm text-[#e8e0d0]/80">
          <Calendar className={`h-3.5 w-3.5 ${isAnandKaraj ? "text-[#FF6F00]/70" : "text-[#DAA520]/60"}`} />
          <span>{event.date}</span>
        </div>
        <div className="mb-2 flex items-center justify-center gap-2 text-sm text-[#e8e0d0]/80">
          <Clock className={`h-3.5 w-3.5 ${isAnandKaraj ? "text-[#FF6F00]/70" : "text-[#DAA520]/60"}`} />
          <span>{event.time}</span>
        </div>

        {/* Venue */}
        <div className="flex items-center justify-center gap-2 text-sm text-[#e8e0d0]/55">
          <MapPin className="h-3.5 w-3.5 text-[#DAA520]/40" />
          <span>{event.venue}</span>
        </div>

        {/* Corner decorations */}
        <div
          className={`pointer-events-none absolute bottom-2 left-2 h-6 w-6 border-b border-l ${
            isAnandKaraj ? "border-[#FF6F00]/25" : "border-[#DAA520]/15"
          }`}
        />
        <div
          className={`pointer-events-none absolute bottom-2 right-2 h-6 w-6 border-b border-r ${
            isAnandKaraj ? "border-[#FF6F00]/25" : "border-[#DAA520]/15"
          }`}
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Floating Saffron Particles                                                 */
/* -------------------------------------------------------------------------- */

function FloatingSaffronParticles() {
  const particles = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    left: `${4 + (i * 5.8) % 92}%`,
    delay: i * 0.7,
    duration: 9 + (i % 4) * 2,
    size: 3 + (i % 3) * 1.5,
    isSaffron: i % 3 === 0,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${p.isSaffron ? "bg-[#FF6F00]" : "bg-[#DAA520]"}`}
          style={{
            left: p.left,
            top: -10,
            width: p.size,
            height: p.size,
            opacity: 0,
          }}
          animate={{
            y: [0, typeof window !== "undefined" ? window.innerHeight + 20 : 1200],
            opacity: [0, 0.35, 0.35, 0],
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

export default function LaavanTemplate({ invite, isDemo }: TemplateProps) {
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

      // Parallax for the decorative pattern overlay
      gsap.utils.toArray<HTMLElement>(".parallax-pattern").forEach((el) => {
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

      // Staggered reveal for countdown boxes
      gsap.utils.toArray<HTMLElement>(".countdown-box").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.7 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: i * 0.12,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // Horizontal slide-in for event cards
      gsap.utils.toArray<HTMLElement>(".slide-left").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".slide-right").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power2.out",
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
  }, []);

  // Default events for Sikh wedding
  const events = invite.events ?? [
    { name: "Mehendi", date: "Date TBA", venue: invite.venue ?? "Venue TBA", time: "6 PM" },
    { name: "Jaggo", date: "Date TBA", venue: invite.venue ?? "Venue TBA", time: "8 PM" },
    { name: "Anand Karaj", date: invite.weddingDate ?? "Date TBA", venue: invite.venue ?? "Gurudwara Sahib", time: "10 AM" },
    { name: "Reception", date: invite.receptionDate ?? "Date TBA", venue: invite.venue ?? "Venue TBA", time: "7 PM" },
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
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#1a1a3e] via-[#1a237e] to-[#1a1a3e] text-[#e8e0d0]"
    >
      {/* Floating saffron particles */}
      <FloatingSaffronParticles />

      {/* Subtle pattern overlay */}
      <div className="parallax-pattern pointer-events-none fixed inset-0 z-0 opacity-[0.04]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23DAA520' stroke-width='0.5'%3E%3Ccircle cx='40' cy='40' r='30'/%3E%3Ccircle cx='40' cy='40' r='20'/%3E%3Cpath d='M40 10 L40 70 M10 40 L70 40'/%3E%3Cpath d='M18 18 L62 62 M62 18 L18 62'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Music toggle */}
      {invite.musicUrl && (
        <MusicToggleButton
          isPlaying={isPlaying}
          onToggle={toggle}
          className="fixed top-4 right-4 z-50 rounded-full border border-[#DAA520]/30 bg-[#1a237e]/80 p-3 shadow-lg backdrop-blur-sm transition-colors hover:bg-[#1a237e]"
        />
      )}

      {/* Demo banner */}
      {isDemo && (
        <div className="relative z-10 bg-[#FF6F00] py-2 text-center text-sm font-medium text-white">
          This is a demo preview. Complete payment to use your own details.
        </div>
      )}

      {/* ================================================================== */}
      {/*  CONTENT                                                           */}
      {/* ================================================================== */}
      <div className="relative z-10 mx-auto max-w-2xl px-4 py-12 sm:py-16">

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 1 - HERO: WAHEGURU BLESSING + KHANDA + COUPLE NAMES     */}
        {/* ---------------------------------------------------------------- */}
        <motion.section
          className="mb-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          {/* Ik Onkar symbol at very top */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4 flex justify-center"
          >
            <IkOnkar className="text-5xl text-[#FF6F00]/70" />
          </motion.div>

          {/* Waheguru Ji Ka Khalsa greeting */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-6"
          >
            <p className="font-serif text-xl leading-relaxed text-[#DAA520] sm:text-2xl">
              Waheguru Ji Ka Khalsa
            </p>
            <p className="font-serif text-xl leading-relaxed text-[#DAA520] sm:text-2xl">
              Waheguru Ji Ki Fateh
            </p>
          </motion.div>

          <SaffronDivider />

          {/* Khanda symbol */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
            className="mx-auto mb-6 flex justify-center"
          >
            <KhandaSymbol className="h-24 w-24 text-[#DAA520]/70 sm:h-28 sm:w-28" />
          </motion.div>

          {/* Parent blessings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mb-8"
          >
            <p className="mb-1 text-sm tracking-[0.15em] text-[#e8e0d0]/50 uppercase">
              With the blessings of
            </p>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Groom's parents */}
              <div className="text-center">
                {invite.groomFatherName && invite.groomMotherName ? (
                  <>
                    <p className="text-xs tracking-wider text-[#FF6F00]/70 uppercase">
                      Son of
                    </p>
                    <p className="mt-1 font-serif text-lg text-[#e8e0d0]/90">
                      S. {invite.groomFatherName}
                    </p>
                    <p className="font-serif text-sm text-[#e8e0d0]/70">
                      & Smt. {invite.groomMotherName}
                    </p>
                  </>
                ) : invite.groomFatherName ? (
                  <>
                    <p className="text-xs tracking-wider text-[#FF6F00]/70 uppercase">Son of</p>
                    <p className="mt-1 font-serif text-lg text-[#e8e0d0]/90">S. {invite.groomFatherName}</p>
                  </>
                ) : null}
              </div>

              {/* Bride's parents */}
              <div className="text-center">
                {invite.brideFatherName && invite.brideMotherName ? (
                  <>
                    <p className="text-xs tracking-wider text-[#FF6F00]/70 uppercase">
                      Daughter of
                    </p>
                    <p className="mt-1 font-serif text-lg text-[#e8e0d0]/90">
                      S. {invite.brideFatherName}
                    </p>
                    <p className="font-serif text-sm text-[#e8e0d0]/70">
                      & Smt. {invite.brideMotherName}
                    </p>
                  </>
                ) : invite.brideFatherName ? (
                  <>
                    <p className="text-xs tracking-wider text-[#FF6F00]/70 uppercase">Daughter of</p>
                    <p className="mt-1 font-serif text-lg text-[#e8e0d0]/90">S. {invite.brideFatherName}</p>
                  </>
                ) : null}
              </div>
            </div>
          </motion.div>

          {/* Invitation text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-4 text-sm tracking-[0.15em] text-[#e8e0d0]/50 uppercase"
          >
            Cordially invite you to the Anand Karaj ceremony of
          </motion.p>

          {/* Hero image */}
          {invite.heroImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mx-auto mb-8 h-56 w-56 overflow-hidden rounded-full border-2 border-[#FF6F00]/40 shadow-2xl shadow-[#FF6F00]/10 sm:h-64 sm:w-64"
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
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <h1 className="font-serif text-5xl font-semibold leading-tight text-[#FF6F00] sm:text-6xl lg:text-7xl">
              {invite.groomName}
            </h1>

            {/* Saffron divider with heart */}
            <div className="my-4 flex items-center justify-center gap-4">
              <motion.div
                className="h-px w-16 bg-gradient-to-r from-transparent to-[#FF6F00]/50 sm:w-24"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.1, duration: 0.8 }}
              />
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.2, duration: 0.6, type: "spring" }}
              >
                <Heart className="h-5 w-5 fill-[#FF6F00]/50 text-[#FF6F00]" />
              </motion.div>
              <motion.div
                className="h-px w-16 bg-gradient-to-l from-transparent to-[#FF6F00]/50 sm:w-24"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.1, duration: 0.8 }}
              />
            </div>

            <h1 className="font-serif text-5xl font-semibold leading-tight text-[#FF6F00] sm:text-6xl lg:text-7xl">
              {invite.brideName}
            </h1>
          </motion.div>

          {/* Wedding date preview */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="mt-6 text-base text-[#e8e0d0]/50"
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
              className="mx-auto h-8 w-px bg-[#FF6F00]/30"
            />
          </motion.div>
        </motion.section>

        <SikhArchBorder />

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 2 - EVENTS GRID                                         */}
        {/* ---------------------------------------------------------------- */}
        <section className="mb-16">
          <div className="scroll-fade mb-10 text-center">
            <p className="mb-2 text-xs tracking-[0.3em] text-[#FF6F00]/60 uppercase">
              Sacred Celebrations
            </p>
            <h2 className="font-serif text-3xl text-[#DAA520] sm:text-4xl">
              Wedding Events
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {events.map((event, index) => (
              <DomeEventCard
                key={index}
                event={event}
                index={index}
                isAnandKaraj={event.name === "Anand Karaj"}
              />
            ))}
          </div>
        </section>

        <SaffronDivider />

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 3 - COUPLE PHOTO                                        */}
        {/* ---------------------------------------------------------------- */}
        {invite.couplePhoto && (
          <section className="mb-16">
            <div className="scroll-fade overflow-hidden rounded-2xl border border-[#FF6F00]/20 shadow-xl shadow-black/20">
              <div
                className="aspect-[4/3] w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${invite.couplePhoto})` }}
              />
            </div>
            <div className="mt-4 text-center">
              <p className="font-serif text-lg text-[#e8e0d0]/50 italic">
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

        <SikhArchBorder />

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 4 - THINGS TO KNOW                                      */}
        {/* ---------------------------------------------------------------- */}
        {thingsToKnow.length > 0 && (
          <section className="mb-16">
            <div className="scroll-fade mb-10 text-center">
              <p className="mb-2 text-xs tracking-[0.3em] text-[#FF6F00]/60 uppercase">
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
                  className={`scroll-fade rounded-xl border border-[#DAA520]/15 bg-[#1a237e]/40 p-5 backdrop-blur-sm ${
                    idx % 2 === 0 ? "slide-left" : "slide-right"
                  }`}
                >
                  <h3 className="mb-2 font-serif text-lg text-[#FF6F00]">
                    {item.label}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#e8e0d0]/55">
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
            <div className="scroll-fade rounded-2xl border border-[#DAA520]/20 bg-[#1a237e]/40 p-8 text-center backdrop-blur-sm sm:p-10">
              <h2 className="mb-2 font-serif text-2xl text-[#DAA520]">
                Our Story
              </h2>
              <SaffronDivider className="mx-auto my-4 h-5 w-48 text-[#FF6F00]/50" />
              <p className="leading-relaxed text-[#e8e0d0]/65">
                {invite.story}
              </p>
            </div>
          </section>
        )}

        <SaffronDivider />

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 5 - COUNTDOWN TIMER                                     */}
        {/* ---------------------------------------------------------------- */}
        {invite.weddingDate && (
          <section className="mb-16">
            <div className="scroll-fade mb-8 text-center">
              <p className="mb-2 text-xs tracking-[0.3em] text-[#FF6F00]/60 uppercase">
                The Sacred Day Approaches
              </p>
              <h2 className="font-serif text-3xl text-[#DAA520]">
                Counting Down
              </h2>
            </div>

            <div className="rounded-2xl border border-[#DAA520]/20 bg-[#1a237e]/40 p-8 backdrop-blur-sm">
              <div className="grid grid-cols-4 gap-3 sm:gap-6">
                {[
                  { label: "Days", value: countdown.days },
                  { label: "Hours", value: countdown.hours },
                  { label: "Minutes", value: countdown.minutes },
                  { label: "Seconds", value: countdown.seconds },
                ].map((unit) => (
                  <div key={unit.label} className="countdown-box text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl border border-[#FF6F00]/25 bg-[#1a1a3e]/70 sm:h-20 sm:w-20">
                      <span className="font-serif text-2xl font-semibold text-[#FF6F00] sm:text-3xl">
                        {String(unit.value).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="mt-2 block text-[10px] tracking-[0.2em] text-[#e8e0d0]/45 uppercase">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-[#e8e0d0]/45">
                  {formatWeddingDate(invite.weddingDate)}
                  {invite.weddingTime && ` at ${invite.weddingTime}`}
                </p>
                {invite.venue && (
                  <p className="mt-1 flex items-center justify-center gap-1 text-sm text-[#e8e0d0]/35">
                    <MapPin className="h-3 w-3" /> {invite.venue}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        <SikhArchBorder />

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 6 - COUPLE MESSAGE                                      */}
        {/* ---------------------------------------------------------------- */}
        {invite.coupleMessage && (
          <section className="mb-16">
            <div className="scroll-fade rounded-2xl border border-[#FF6F00]/20 bg-[#1a237e]/40 p-8 text-center backdrop-blur-sm sm:p-10">
              <KhandaSymbol className="mx-auto mb-4 h-12 w-12 text-[#DAA520]/30" />
              <p className="font-serif text-lg leading-relaxed text-[#e8e0d0]/75 italic">
                &ldquo;{invite.coupleMessage}&rdquo;
              </p>
              <p className="mt-4 text-sm text-[#FF6F00]/50">
                &mdash; {invite.groomName} & {invite.brideName}
              </p>
            </div>
          </section>
        )}

        <SaffronDivider />

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 7 - RSVP + SHARE BUTTONS                               */}
        {/* ---------------------------------------------------------------- */}
        <section className="mb-16 text-center">
          <div className="scroll-fade">
            <h2 className="mb-4 font-serif text-3xl text-[#DAA520]">
              Will You Join Us?
            </h2>
            <p className="mb-8 text-sm text-[#e8e0d0]/50">
              We would be honoured to have you witness the Anand Karaj and celebrate this joyous occasion with us.
            </p>

            {hashtag && (
              <p className="mb-4 font-serif text-lg text-[#FF6F00]/70 italic">
                {hashtag}
              </p>
            )}

            <div className="flex flex-col items-center gap-4">
              <Button
                size="lg"
                className="w-full max-w-xs border border-[#FF6F00]/50 bg-[#FF6F00] text-white shadow-lg shadow-[#FF6F00]/20 hover:bg-[#FF6F00]/90"
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
          <SikhArchBorder className="mx-auto mb-4 h-12 w-full text-[#DAA520]/25" />

          <div className="scroll-fade">
            <IkOnkar className="mx-auto mb-3 text-3xl text-[#FF6F00]/25" />
            <p className="font-serif text-lg text-[#DAA520]/60">
              {invite.groomName} & {invite.brideName}
            </p>
            <p className="mt-1 text-sm text-[#e8e0d0]/35">
              {formatWeddingDate(invite.weddingDate)}
            </p>
            {invite.venue && (
              <p className="mt-1 text-xs text-[#e8e0d0]/25">
                {invite.venue}
              </p>
            )}

            <p className="mt-6 text-xs text-[#e8e0d0]/25 italic">
              May Waheguru bless this sacred union with eternal love and harmony
            </p>
          </div>

          <CardoraWatermark className="mt-10 pb-8 text-center text-xs text-[#e8e0d0]/20" />
        </footer>
      </div>

      {/* RSVP Modal */}
      <RsvpModal open={rsvpOpen} onOpenChange={setRsvpOpen} inviteSlug={invite.slug} />
    </div>
  );
}
