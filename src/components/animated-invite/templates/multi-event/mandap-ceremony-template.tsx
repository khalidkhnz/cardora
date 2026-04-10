"use client";

import { useState, useEffect, useRef } from "react";
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
/*  Mandap Canopy SVG (Enhanced)                                               */
/* -------------------------------------------------------------------------- */

function MandapCanopy({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "mx-auto h-32 w-32 text-[#FFD700]"}
    >
      {/* Canopy top (dome) */}
      <path
        d="M30 80 Q100 10 170 80"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M40 80 Q100 20 160 80"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />
      {/* Pinnacle ornament */}
      <circle cx="100" cy="22" r="5" fill="currentColor" opacity="0.6" />
      <path
        d="M100 12 L103 18 L100 27 L97 18 Z"
        fill="currentColor"
        opacity="0.5"
      />
      {/* Draped fabric scallops */}
      <path
        d="M30 80 Q55 70 65 80 Q75 90 85 80 Q95 70 100 80 Q105 90 115 80 Q125 70 135 80 Q145 90 155 80 Q165 70 170 80"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        opacity="0.5"
      />
      {/* Left pillar */}
      <rect x="28" y="80" width="8" height="70" rx="2" fill="currentColor" opacity="0.4" />
      <rect x="26" y="78" width="12" height="6" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="26" y="148" width="12" height="6" rx="1" fill="currentColor" opacity="0.5" />
      {/* Right pillar */}
      <rect x="164" y="80" width="8" height="70" rx="2" fill="currentColor" opacity="0.4" />
      <rect x="162" y="78" width="12" height="6" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="162" y="148" width="12" height="6" rx="1" fill="currentColor" opacity="0.5" />
      {/* Pillar decorative bands */}
      <rect x="28" y="100" width="8" height="2" fill="currentColor" opacity="0.3" />
      <rect x="28" y="120" width="8" height="2" fill="currentColor" opacity="0.3" />
      <rect x="164" y="100" width="8" height="2" fill="currentColor" opacity="0.3" />
      <rect x="164" y="120" width="8" height="2" fill="currentColor" opacity="0.3" />
      {/* Hanging garland from canopy */}
      <path
        d="M50 82 Q75 95 100 82 Q125 95 150 82"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.35"
      />
      {/* Small decorative dots along garland */}
      {[60, 75, 90, 100, 110, 125, 140].map((x) => (
        <circle key={x} cx={x} cy={x < 100 ? 88 : x === 100 ? 82 : 88} r="1.5" fill="currentColor" opacity="0.4" />
      ))}
      {/* Extra inner dome detail */}
      <path
        d="M50 78 Q100 30 150 78"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity="0.2"
        strokeDasharray="4 3"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Marigold Border SVG (Enhanced)                                             */
/* -------------------------------------------------------------------------- */

function MarigoldBorder({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "mx-auto my-6 h-12 w-full text-[#FFD700]"}
    >
      {/* Garland string */}
      <path
        d="M0 30 Q75 50 150 30 Q225 10 300 30 Q375 50 450 30 Q525 10 600 30"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.3"
      />
      {/* Marigold flower clusters */}
      {[0, 75, 150, 225, 300, 375, 450, 525, 600].map((x, i) => {
        const yOffset = i % 2 === 0 ? 30 : i % 4 === 1 ? 42 : 18;
        return (
          <g key={x} transform={`translate(${x}, ${yOffset})`}>
            {/* Outer petals */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <ellipse
                key={angle}
                cx={Math.cos((angle * Math.PI) / 180) * 7}
                cy={Math.sin((angle * Math.PI) / 180) * 7}
                rx="4"
                ry="2.5"
                transform={`rotate(${angle})`}
                fill="#FF9933"
                opacity="0.5"
              />
            ))}
            {/* Center */}
            <circle cx="0" cy="0" r="3.5" fill="currentColor" opacity="0.6" />
            <circle cx="0" cy="0" r="2" fill="#FF9933" opacity="0.7" />
          </g>
        );
      })}
      {/* Top and bottom decorative lines */}
      <line x1="0" y1="3" x2="600" y2="3" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <line x1="0" y1="57" x2="600" y2="57" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Om Symbol SVG (Enhanced with more detail)                                  */
/* -------------------------------------------------------------------------- */

function OmSymbol({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "h-16 w-16 text-[#FFD700]"}
    >
      {/* Stylized Om */}
      {/* Main body curve */}
      <path
        d="M35 65 Q20 65 20 50 Q20 35 35 35 Q45 35 50 42 Q55 35 65 35 Q80 35 80 50 Q80 58 73 62"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        opacity="0.7"
        strokeLinecap="round"
      />
      {/* Upper hook */}
      <path
        d="M73 62 Q68 65 65 60 Q62 55 58 58 Q52 63 50 55"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        opacity="0.7"
        strokeLinecap="round"
      />
      {/* Tail curve */}
      <path
        d="M35 65 Q42 70 48 65 Q55 58 50 50"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        opacity="0.7"
        strokeLinecap="round"
      />
      {/* Top crescent and dot */}
      <path
        d="M58 28 Q65 18 72 25"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        opacity="0.6"
        strokeLinecap="round"
      />
      <circle cx="68" cy="16" r="2.5" fill="currentColor" opacity="0.7" />
      {/* Decorative ring */}
      <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.15" />
      {/* Additional glow ring */}
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.08" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Kalash Icon SVG (Enhanced)                                                 */
/* -------------------------------------------------------------------------- */

function KalashIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "h-14 w-14 text-[#FFD700]"}
    >
      {/* Coconut on top */}
      <ellipse cx="40" cy="18" rx="10" ry="9" fill="currentColor" opacity="0.5" />
      {/* Mango leaves */}
      <path d="M30 22 Q20 10 25 2" stroke="#FF9933" strokeWidth="1.5" fill="none" opacity="0.5" />
      <path d="M50 22 Q60 10 55 2" stroke="#FF9933" strokeWidth="1.5" fill="none" opacity="0.5" />
      <path d="M35 20 Q28 8 32 0" stroke="#FF9933" strokeWidth="1.2" fill="none" opacity="0.4" />
      <path d="M45 20 Q52 8 48 0" stroke="#FF9933" strokeWidth="1.2" fill="none" opacity="0.4" />
      {/* Pot rim */}
      <ellipse cx="40" cy="28" rx="14" ry="4" fill="currentColor" opacity="0.6" />
      {/* Pot body */}
      <path
        d="M26 30 Q24 55 30 70 Q35 80 40 82 Q45 80 50 70 Q56 55 54 30"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        opacity="0.5"
      />
      {/* Pot decorative bands */}
      <ellipse cx="40" cy="45" rx="16" ry="2" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.3" />
      <ellipse cx="40" cy="60" rx="14" ry="2" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.3" />
      {/* Base */}
      <ellipse cx="40" cy="85" rx="12" ry="4" fill="currentColor" opacity="0.4" />
      <rect x="32" y="85" width="16" height="6" rx="2" fill="currentColor" opacity="0.3" />
      {/* Swastik on pot */}
      <g transform="translate(40, 52)" opacity="0.35">
        <line x1="-4" y1="0" x2="4" y2="0" stroke="currentColor" strokeWidth="1.2" />
        <line x1="0" y1="-4" x2="0" y2="4" stroke="currentColor" strokeWidth="1.2" />
        <line x1="4" y1="0" x2="4" y2="-3" stroke="currentColor" strokeWidth="1" />
        <line x1="-4" y1="0" x2="-4" y2="3" stroke="currentColor" strokeWidth="1" />
        <line x1="0" y1="-4" x2="3" y2="-4" stroke="currentColor" strokeWidth="1" />
        <line x1="0" y1="4" x2="-3" y2="4" stroke="currentColor" strokeWidth="1" />
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Mandap Event Card (Arch-Shaped, Garland Drop Animation)                    */
/* -------------------------------------------------------------------------- */

function MandapEventCard({
  event,
  index,
  isEven,
}: {
  event: { name: string; date: string; venue: string; time: string };
  index: number;
  isEven: boolean;
}) {
  return (
    <div className="garland-card">
      <div
        className={`relative overflow-hidden rounded-b-2xl border border-[#FFD700]/30 p-6 pt-10 shadow-lg shadow-black/20 backdrop-blur-sm ${
          isEven
            ? "bg-gradient-to-b from-[#8B0000]/80 to-[#3d0c0c]/90"
            : "bg-gradient-to-b from-[#5c1010]/80 to-[#2a0808]/90"
        }`}
        style={{
          clipPath:
            "polygon(0 15%, 5% 5%, 15% 1%, 30% 0%, 50% 0%, 70% 0%, 85% 1%, 95% 5%, 100% 15%, 100% 100%, 0% 100%)",
        }}
      >
        {/* Arch top decorative border */}
        <div className="pointer-events-none absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent" />

        {/* Event icon */}
        <div className="mb-4 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#FFD700]/40 bg-[#FFD700]/10">
            <span className="text-lg">
              {index === 0 && "\u{1F33C}"}
              {index === 1 && "\u{1F33F}"}
              {index === 2 && "\u{1F3B5}"}
              {index === 3 && "\u{1F525}"}
              {index === 4 && "\u{1F37D}\u{FE0F}"}
              {index > 4 && "\u{2728}"}
            </span>
          </div>
        </div>

        {/* Event name */}
        <h3 className="mb-3 text-center font-serif text-2xl font-semibold tracking-wide text-[#FFD700]">
          {event.name}
        </h3>

        {/* Thin gold divider */}
        <div className="mx-auto mb-3 h-px w-16 bg-gradient-to-r from-transparent via-[#FFD700]/60 to-transparent" />

        {/* Date & Time */}
        <div className="mb-2 flex items-center justify-center gap-2 text-sm text-[#FFF8E7]/80">
          <Calendar className="h-3.5 w-3.5 text-[#FFD700]/70" />
          <span>{event.date}</span>
        </div>
        <div className="mb-2 flex items-center justify-center gap-2 text-sm text-[#FFF8E7]/80">
          <Clock className="h-3.5 w-3.5 text-[#FFD700]/70" />
          <span>{event.time}</span>
        </div>

        {/* Venue */}
        <div className="flex items-center justify-center gap-2 text-sm text-[#FFF8E7]/60">
          <MapPin className="h-3.5 w-3.5 text-[#FFD700]/50" />
          <span>{event.venue}</span>
        </div>

        {/* Corner decorations */}
        <div className="pointer-events-none absolute bottom-2 left-2 h-6 w-6 border-b border-l border-[#FFD700]/20" />
        <div className="pointer-events-none absolute bottom-2 right-2 h-6 w-6 border-b border-r border-[#FFD700]/20" />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Floating Marigold Petals (GSAP-driven)                                     */
/* -------------------------------------------------------------------------- */

function FloatingMarigoldPetals() {
  const petalsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!petalsRef.current) return;
    const petals = petalsRef.current.querySelectorAll<HTMLElement>(".marigold-petal");

    const tweens: gsap.core.Tween[] = [];

    petals.forEach((petal) => {
      const dur = 8 + Math.random() * 6;
      const delay = Math.random() * 6;
      const sway = 30 + Math.random() * 60;

      // Vertical fall
      const fallTween = gsap.fromTo(
        petal,
        { y: -20, opacity: 0 },
        {
          y: typeof window !== "undefined" ? window.innerHeight + 30 : 1200,
          opacity: 0.5,
          duration: dur,
          delay,
          repeat: -1,
          ease: "none",
          onRepeat() {
            gsap.set(petal, { y: -20, opacity: 0 });
          },
        },
      );
      tweens.push(fallTween);

      // Sideways sway
      const swayTween = gsap.to(petal, {
        x: `+=${sway}`,
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay,
      });
      tweens.push(swayTween);

      // Rotation
      const rotateTween = gsap.to(petal, {
        rotation: 360,
        duration: dur * 0.8,
        repeat: -1,
        ease: "none",
        delay,
      });
      tweens.push(rotateTween);
    });

    return () => {
      tweens.forEach((t) => { t.kill(); });
    };
  }, []);

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${4 + ((i * 4.8) % 92)}%`,
    size: 4 + (i % 4) * 2,
    color: i % 3 === 0 ? "#FFD700" : i % 3 === 1 ? "#FF9933" : "#FFB347",
  }));

  return (
    <div ref={petalsRef} className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="marigold-petal absolute rounded-full"
          style={{
            left: p.left,
            top: -10,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Mandap Pillar Decorative Border                                            */
/* -------------------------------------------------------------------------- */

function MandapPillar({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";
  return (
    <div
      className={`mandap-pillar-${side} pointer-events-none fixed top-0 ${isLeft ? "left-0" : "right-0"} z-[1] hidden h-full w-10 lg:block`}
    >
      <div
        className={`h-full w-full ${isLeft ? "bg-gradient-to-r" : "bg-gradient-to-l"} from-[#FFD700]/[0.04] to-transparent`}
      >
        {/* Repeating pillar pattern */}
        <div
          className="h-full w-full opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='80' viewBox='0 0 40 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0 L25 10 L20 20 L15 10 Z' fill='%23FFD700' opacity='0.15'/%3E%3Ccircle cx='20' cy='40' r='3' fill='%23FFD700' opacity='0.1'/%3E%3Cpath d='M20 60 L25 70 L20 80 L15 70 Z' fill='%23FFD700' opacity='0.15'/%3E%3C/svg%3E")`,
            backgroundSize: "40px 80px",
          }}
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Template Component                                                    */
/* -------------------------------------------------------------------------- */

export default function MandapCeremonyTemplate({ invite, isDemo }: TemplateProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const { isPlaying, toggle } = useMusicPlayer(invite.musicUrl);
  const countdown = useCountdown(invite.weddingDate);

  // Initialize Lenis smooth scrolling
  useLenis();

  // GSAP ScrollTrigger animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Om 3D flip reveal
      gsap.fromTo(
        ".om-flip",
        { rotateY: 180, opacity: 0 },
        { rotateY: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 },
      );

      // 2. Fire glow on couple names
      gsap.fromTo(
        ".fire-name",
        { textShadow: "0 0 0px transparent" },
        {
          textShadow: "0 0 20px #FF6B00, 0 0 40px #FF4500, 0 0 60px #FF6B00",
          duration: 1.5,
          delay: 0.8,
          ease: "power2.inOut",
        },
      );

      // 3. Shubh Vivah letter-by-letter type-in
      gsap.utils.toArray<HTMLElement>(".shubh-letter").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.15,
            delay: 0.4 + i * 0.08,
            ease: "power2.out",
          },
        );
      });

      // 4. Garland drop cards with elastic swing
      gsap.utils.toArray<HTMLElement>(".garland-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: -60, rotation: -8, opacity: 0 },
          {
            y: 0,
            rotation: 0,
            opacity: 1,
            duration: 1.2,
            delay: i * 0.15,
            ease: "elastic.out(1, 0.3)",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // 5. Mandap reveal sections (clip-path)
      gsap.utils.toArray<HTMLElement>(".mandap-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // 6. Fire countdown boxes
      gsap.utils.toArray<HTMLElement>(".fire-countdown").forEach((el, i) => {
        gsap.fromTo(
          el,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.12,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
        // Pulsing fire glow
        gsap.to(el, {
          boxShadow: "0 0 20px rgba(255,107,0,0.4), 0 0 40px rgba(255,69,0,0.2)",
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });

      // 7. Enhanced parallax for background pattern
      gsap.utils.toArray<HTMLElement>(".parallax-pattern").forEach((el) => {
        gsap.to(el, {
          yPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      // 8. Mandap pillar slide-in from sides
      gsap.fromTo(
        ".mandap-pillar-left",
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".mandap-pillar-left",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
      gsap.fromTo(
        ".mandap-pillar-right",
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".mandap-pillar-right",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Default events for Hindu wedding
  const events = invite.events ?? [
    { name: "Haldi", date: "Date TBA", venue: invite.venue ?? "Venue TBA", time: "10 AM" },
    { name: "Mehendi", date: "Date TBA", venue: invite.venue ?? "Venue TBA", time: "4 PM" },
    { name: "Sangeet", date: "Date TBA", venue: invite.venue ?? "Venue TBA", time: "7 PM" },
    { name: "Wedding Ceremony", date: invite.weddingDate ?? "Date TBA", venue: invite.venue ?? "Venue TBA", time: "11 AM" },
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

  // Split "Shubh Vivah" into individual letters for staggered animation
  const shubhVivahText = "\u0936\u0941\u092D \u0935\u093F\u0935\u093E\u0939";
  const shubhLetters = Array.from(shubhVivahText);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#3d0c0c] via-[#8B0000] to-[#3d0c0c] text-[#FFF8E7]"
    >
      {/* Floating marigold petals */}
      <FloatingMarigoldPetals />

      {/* Decorative mandap pillars on sides */}
      <MandapPillar side="left" />
      <MandapPillar side="right" />

      {/* Subtle traditional pattern overlay */}
      <div className="parallax-pattern pointer-events-none fixed inset-0 z-0 opacity-5">
        <div
          className="h-[130%] w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23FFD700' stroke-width='0.5'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z'/%3E%3Ccircle cx='30' cy='30' r='10'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Music toggle */}
      {invite.musicUrl && (
        <MusicToggleButton
          isPlaying={isPlaying}
          onToggle={toggle}
          className="fixed top-4 right-4 z-50 rounded-full border border-[#FFD700]/30 bg-[#8B0000]/80 p-3 shadow-lg backdrop-blur-sm transition-colors hover:bg-[#8B0000]"
        />
      )}

      {/* Demo banner */}
      {isDemo && (
        <div className="relative z-10 bg-[#FFD700] py-2 text-center text-sm font-medium text-[#3d0c0c]">
          This is a demo preview. Complete payment to use your own details.
        </div>
      )}

      {/* ================================================================== */}
      {/*  CONTENT                                                           */}
      {/* ================================================================== */}
      <div className="relative z-10">

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 1 -- HERO: OM + COUPLE NAMES + PARENT BLESSINGS         */}
        {/*  Full viewport height, centered                                  */}
        {/* ---------------------------------------------------------------- */}
        <section className="flex min-h-screen flex-col items-center justify-center px-4 py-16 text-center">
          {/* Om symbol with 3D flip */}
          <div
            className="om-flip mx-auto mb-4 flex justify-center"
            style={{ perspective: "800px", transformStyle: "preserve-3d" }}
          >
            <OmSymbol className="h-20 w-20 text-[#FFD700] drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]" />
          </div>

          {/* Shubh Vivah heading -- letter-by-letter type-in */}
          <div className="mb-4">
            <p className="font-serif text-3xl leading-relaxed text-[#FFD700] sm:text-4xl">
              {shubhLetters.map((letter, i) => (
                <span key={i} className="shubh-letter inline-block" style={{ opacity: 0 }}>
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </p>
            <p className="mt-2 text-xs tracking-[0.2em] text-[#FFF8E7]/50 uppercase">
              Auspicious Wedding Celebration
            </p>
          </div>

          <MarigoldBorder className="mx-auto my-6 h-12 w-full max-w-2xl text-[#FFD700]" />

          {/* Kalash icon */}
          <div className="mandap-reveal mx-auto mb-6 flex justify-center">
            <KalashIcon className="h-14 w-14 text-[#FFD700]" />
          </div>

          {/* Parent blessings */}
          <div className="mandap-reveal mb-8 max-w-xl">
            <p className="mb-1 text-sm tracking-[0.15em] text-[#FFF8E7]/60 uppercase">
              With the blessings of our beloved parents
            </p>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Groom's parents */}
              <div className="text-center">
                {invite.groomFatherName && invite.groomMotherName ? (
                  <>
                    <p className="text-xs tracking-wider text-[#FF9933]/70 uppercase">Son of</p>
                    <p className="mt-1 font-serif text-lg text-[#FFF8E7]/90">
                      {invite.groomFatherName}
                    </p>
                    <p className="font-serif text-sm text-[#FFF8E7]/70">
                      & {invite.groomMotherName}
                    </p>
                  </>
                ) : invite.groomFatherName ? (
                  <>
                    <p className="text-xs tracking-wider text-[#FF9933]/70 uppercase">Son of</p>
                    <p className="mt-1 font-serif text-lg text-[#FFF8E7]/90">{invite.groomFatherName}</p>
                  </>
                ) : null}
              </div>

              {/* Bride's parents */}
              <div className="text-center">
                {invite.brideFatherName && invite.brideMotherName ? (
                  <>
                    <p className="text-xs tracking-wider text-[#FF9933]/70 uppercase">Daughter of</p>
                    <p className="mt-1 font-serif text-lg text-[#FFF8E7]/90">
                      {invite.brideFatherName}
                    </p>
                    <p className="font-serif text-sm text-[#FFF8E7]/70">
                      & {invite.brideMotherName}
                    </p>
                  </>
                ) : invite.brideFatherName ? (
                  <>
                    <p className="text-xs tracking-wider text-[#FF9933]/70 uppercase">Daughter of</p>
                    <p className="mt-1 font-serif text-lg text-[#FFF8E7]/90">{invite.brideFatherName}</p>
                  </>
                ) : null}
              </div>
            </div>
          </div>

          {/* Invitation text */}
          <p className="mandap-reveal mb-4 text-sm tracking-[0.15em] text-[#FFF8E7]/50 uppercase">
            Request the honour of your presence at the wedding of
          </p>

          {/* Hero image */}
          {invite.heroImage && (
            <div className="mandap-reveal mx-auto mb-8 h-56 w-56 overflow-hidden rounded-full border-2 border-[#FFD700]/40 shadow-2xl shadow-[#FFD700]/10 sm:h-64 sm:w-64">
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${invite.heroImage})` }}
              />
            </div>
          )}

          {/* Couple Names with fire glow */}
          <div>
            <h1 className="fire-name font-serif text-5xl font-light leading-tight text-[#FFD700] sm:text-6xl lg:text-7xl">
              {invite.groomName}
            </h1>

            {/* Gold divider with heart */}
            <div className="my-4 flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#FFD700]/60 sm:w-24" />
              <Heart className="h-5 w-5 fill-[#FFD700]/50 text-[#FFD700]" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#FFD700]/60 sm:w-24" />
            </div>

            <h1 className="fire-name font-serif text-5xl font-light leading-tight text-[#FFD700] sm:text-6xl lg:text-7xl">
              {invite.brideName}
            </h1>
          </div>

          {/* Wedding date preview */}
          <p className="mt-6 text-base text-[#FFF8E7]/60">
            {formatWeddingDate(invite.weddingDate)}
          </p>

          {/* Scroll indicator */}
          <div className="mt-12">
            <div className="scroll-indicator mx-auto h-10 w-px bg-gradient-to-b from-[#FFD700]/60 to-transparent" />
          </div>
        </section>

        <MarigoldBorder className="mx-auto my-0 h-12 w-full text-[#FFD700]" />

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 2 -- EVENTS GRID                                        */}
        {/*  Full-width with alternating background bands                    */}
        {/* ---------------------------------------------------------------- */}
        <section className="relative w-full py-16">
          {/* Alternating background */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#5c1010]/50 via-[#3d0c0c] to-[#5c1010]/50" />

          <div className="relative z-10 mx-auto max-w-4xl px-4">
            <div className="mandap-reveal mb-10 text-center">
              <p className="mb-2 font-serif text-lg text-[#FF9933]/70">
                {"\u0936\u0941\u092D \u0915\u093E\u0930\u094D\u092F\u0915\u094D\u0930\u092E"}
              </p>
              <h2 className="font-serif text-3xl text-[#FFD700] sm:text-4xl">
                Wedding Events
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event, index) => (
                <MandapEventCard key={index} event={event} index={index} isEven={index % 2 === 0} />
              ))}
            </div>
          </div>
        </section>

        <MarigoldBorder className="mx-auto my-6 h-8 w-64 text-[#FFD700]/50" />

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 3 -- COUPLE PHOTO                                       */}
        {/* ---------------------------------------------------------------- */}
        {invite.couplePhoto && (
          <section className="mx-auto mb-16 max-w-3xl px-4">
            <div className="mandap-reveal overflow-hidden rounded-2xl border border-[#FFD700]/20 shadow-xl shadow-black/20">
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

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 4 -- GALLERY                                            */}
        {/*  Full-width masonry-style grid                                   */}
        {/* ---------------------------------------------------------------- */}
        {invite.galleryImages.length > 0 && (
          <section className="relative w-full py-16">
            <div className="pointer-events-none absolute inset-0 bg-[#2a0808]/40" />

            <div className="relative z-10 px-4">
              <div className="mandap-reveal mb-8 text-center">
                <h2 className="font-serif text-2xl text-[#FFD700]">Gallery</h2>
              </div>
              <div className="mx-auto columns-2 gap-3 sm:columns-3 lg:columns-4" style={{ maxWidth: "1200px" }}>
                {invite.galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="garland-card mb-3 break-inside-avoid overflow-hidden rounded-xl border border-[#FFD700]/20 shadow-md"
                  >
                    <div
                      className="w-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
                      style={{
                        backgroundImage: `url(${img})`,
                        // Masonry-style: alternate between aspect ratios
                        paddingBottom: idx % 3 === 0 ? "130%" : idx % 3 === 1 ? "100%" : "80%",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <MarigoldBorder className="mx-auto my-0 h-12 w-full text-[#FFD700]" />

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 5 -- THINGS TO KNOW                                     */}
        {/* ---------------------------------------------------------------- */}
        {thingsToKnow.length > 0 && (
          <section className="mx-auto mb-16 max-w-3xl px-4 pt-8">
            <div className="mandap-reveal mb-10 text-center">
              <p className="mb-2 text-xs tracking-[0.3em] text-[#FF9933]/60 uppercase">
                Helpful Information
              </p>
              <h2 className="font-serif text-3xl text-[#FFD700]">
                Things to Know
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {thingsToKnow.map((item, idx) => (
                <div
                  key={idx}
                  className="garland-card rounded-xl border border-[#FFD700]/20 bg-[#8B0000]/40 p-5 backdrop-blur-sm"
                >
                  <h3 className="mb-2 font-serif text-lg text-[#FFD700]">
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

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 6 -- STORY                                              */}
        {/* ---------------------------------------------------------------- */}
        {invite.story && (
          <section className="mx-auto mb-16 max-w-3xl px-4">
            <div className="mandap-reveal rounded-2xl border border-[#FFD700]/20 bg-[#8B0000]/40 p-8 text-center backdrop-blur-sm sm:p-10">
              <h2 className="mb-2 font-serif text-2xl text-[#FFD700]">
                Our Story
              </h2>
              <MarigoldBorder className="mx-auto my-4 h-8 w-48 text-[#FFD700]/50" />
              <p className="leading-relaxed text-[#FFF8E7]/70">
                {invite.story}
              </p>
            </div>
          </section>
        )}

        <MarigoldBorder className="mx-auto my-6 h-8 w-64 text-[#FFD700]/50" />

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 7 -- COUNTDOWN TIMER (Sacred Fire Reveal)               */}
        {/* ---------------------------------------------------------------- */}
        {invite.weddingDate && (
          <section className="mx-auto mb-16 max-w-3xl px-4">
            <div className="mandap-reveal mb-8 text-center">
              <p className="mb-2 text-xs tracking-[0.3em] text-[#FF9933]/60 uppercase">
                The Sacred Day
              </p>
              <h2 className="font-serif text-3xl text-[#FFD700]">
                Counting Down
              </h2>
            </div>

            <div className="rounded-2xl border border-[#FFD700]/20 bg-[#8B0000]/40 p-8 backdrop-blur-sm">
              <div className="grid grid-cols-4 gap-3 sm:gap-6">
                {[
                  { label: "Days", value: countdown.days },
                  { label: "Hours", value: countdown.hours },
                  { label: "Minutes", value: countdown.minutes },
                  { label: "Seconds", value: countdown.seconds },
                ].map((unit) => (
                  <div key={unit.label} className="fire-countdown text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl border border-[#FFD700]/30 bg-[#3d0c0c]/60 sm:h-20 sm:w-20">
                      <span className="font-serif text-2xl font-semibold text-[#FFD700] sm:text-3xl">
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

        <MarigoldBorder className="mx-auto my-0 h-12 w-full text-[#FFD700]" />

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 8 -- COUPLE MESSAGE                                     */}
        {/* ---------------------------------------------------------------- */}
        {invite.coupleMessage && (
          <section className="mx-auto mb-16 max-w-3xl px-4 pt-8">
            <div className="mandap-reveal rounded-2xl border border-[#FFD700]/20 bg-[#8B0000]/40 p-8 text-center backdrop-blur-sm sm:p-10">
              <MandapCanopy className="mx-auto mb-4 h-20 w-20 text-[#FFD700]/40" />
              <p className="font-serif text-lg leading-relaxed text-[#FFF8E7]/80 italic">
                &ldquo;{invite.coupleMessage}&rdquo;
              </p>
              <p className="mt-4 text-sm text-[#FFD700]/60">
                &mdash; {invite.groomName} & {invite.brideName}
              </p>
            </div>
          </section>
        )}

        <MarigoldBorder className="mx-auto my-6 h-8 w-64 text-[#FFD700]/50" />

        {/* ---------------------------------------------------------------- */}
        {/*  SECTION 9 -- RSVP + SHARE BUTTONS                              */}
        {/* ---------------------------------------------------------------- */}
        <section className="mx-auto mb-16 max-w-3xl px-4 text-center">
          <div className="mandap-reveal">
            <h2 className="mb-4 font-serif text-3xl text-[#FFD700]">
              Will You Join Us?
            </h2>
            <p className="mb-8 text-sm text-[#FFF8E7]/60">
              We would be honoured to have you celebrate this sacred occasion with us.
            </p>

            {hashtag && (
              <p className="mb-4 font-serif text-lg text-[#FF9933]/70 italic">
                {hashtag}
              </p>
            )}

            <div className="flex flex-col items-center gap-4">
              <Button
                size="lg"
                className="w-full max-w-xs border border-[#FFD700]/50 bg-[#FFD700] text-[#3d0c0c] shadow-lg shadow-[#FFD700]/20 hover:bg-[#FFD700]/90"
                onClick={() => setRsvpOpen(true)}
              >
                <Heart className="mr-2 h-4 w-4" />
                RSVP Now
              </Button>

              <div className="flex w-full max-w-xs gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 border-[#FFD700]/30 bg-transparent text-[#FFD700] hover:bg-[#FFD700]/10 hover:text-[#FFD700]"
                  onClick={() => void handleShare()}
                >
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#FFD700]/30 bg-transparent text-[#FFD700] hover:bg-[#FFD700]/10 hover:text-[#FFD700]"
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
        {/*  SECTION 10 -- FOOTER / WATERMARK                               */}
        {/* ---------------------------------------------------------------- */}
        <footer className="mx-auto max-w-3xl px-4 text-center">
          <MarigoldBorder className="mx-auto mb-4 h-12 w-full text-[#FFD700]/30" />

          <div className="mandap-reveal">
            <OmSymbol className="mx-auto mb-3 h-8 w-8 text-[#FFD700]/30" />
            <p className="font-serif text-lg text-[#FFD700]/70">
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
              May Lord Ganesha bless this sacred union
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
