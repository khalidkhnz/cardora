"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Clock, Heart, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { platform } from "@/lib/platform";

/* ================================================================== */
/*  CSS for shimmer + floating animations (injected once)             */
/* ================================================================== */

const INJECTED_CSS = `
@keyframes maharani-float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(2deg); }
}
@keyframes maharani-drift {
  0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(calc(100vh + 40px)) translateX(30px) rotate(45deg); opacity: 0; }
}
@keyframes maharani-shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes maharani-glow-pulse {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
}
@keyframes maharani-elephant-walk {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(8px); }
}
@keyframes maharani-sparkle {
  0%, 100% { opacity: 0; transform: scale(0.5); }
  50% { opacity: 1; transform: scale(1); }
}
.maharani-shimmer-text {
  background: linear-gradient(90deg, #D4AF37 0%, #FFE8A0 25%, #D4AF37 50%, #FFE8A0 75%, #D4AF37 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: maharani-shimmer 4s linear infinite;
}
.maharani-shimmer-line {
  background: linear-gradient(90deg, transparent 0%, #D4AF37 30%, #FFE8A0 50%, #D4AF37 70%, transparent 100%);
  background-size: 200% 100%;
  animation: maharani-shimmer 3s ease-in-out infinite;
}
`;

/* ================================================================== */
/*  Floating petals system                                            */
/* ================================================================== */

const PETAL_CONFIGS = [
  { delay: 0, duration: 12, left: 8, size: 12, color: "#FF9BAA" },
  { delay: 2, duration: 15, left: 22, size: 10, color: "#FFB0A0" },
  { delay: 4, duration: 11, left: 45, size: 14, color: "#FFCCC0" },
  { delay: 1, duration: 14, left: 65, size: 11, color: "#FF9BAA" },
  { delay: 3, duration: 13, left: 80, size: 9, color: "#FFB347" },
  { delay: 5, duration: 16, left: 35, size: 10, color: "#E88090" },
  { delay: 7, duration: 12, left: 92, size: 12, color: "#FFCCC0" },
  { delay: 6, duration: 14, left: 55, size: 8, color: "#FF9BAA" },
];

function FloatingPetals() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[90] overflow-hidden">
      {PETAL_CONFIGS.map((p, i) => (
        <div
          key={i}
          className="absolute -top-5"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.3,
            animation: `maharani-drift ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        >
          <svg viewBox="0 0 12 16" width={p.size} height={p.size * 1.3}>
            <path d="M6 0 Q10 4 10 10 Q8 14 6 16 Q4 14 2 10 Q2 4 6 0Z" fill={p.color} fillOpacity="0.5" />
          </svg>
        </div>
      ))}
    </div>
  );
}

/* ================================================================== */
/*  Sparkle particles                                                 */
/* ================================================================== */

function SparkleField() {
  const sparkles = [
    { l: 10, t: 15, d: 3, s: 0 }, { l: 30, t: 25, d: 4, s: 1 },
    { l: 55, t: 10, d: 3.5, s: 0.5 }, { l: 75, t: 20, d: 3, s: 1.5 },
    { l: 90, t: 30, d: 4.5, s: 2 }, { l: 20, t: 70, d: 3, s: 0.8 },
    { l: 45, t: 80, d: 4, s: 1.2 }, { l: 70, t: 75, d: 3.5, s: 0.3 },
    { l: 85, t: 60, d: 3, s: 1.8 }, { l: 15, t: 50, d: 4, s: 2.5 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 z-[5]">
      {sparkles.map((s, i) => (
        <div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-[#D4AF37]"
          style={{
            left: `${s.l}%`,
            top: `${s.t}%`,
            animation: `maharani-sparkle ${s.d}s ease-in-out ${s.s}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ================================================================== */
/*  SVG: Floral arch with chandeliers                                 */
/* ================================================================== */

function FloralArch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 340" preserveAspectRatio="xMidYMid meet" className={className} fill="none">
      {/* Arch structure */}
      <path d="M28 330 L28 130 Q28 38 200 18 Q372 38 372 130 L372 330" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.22" />
      <path d="M42 330 L42 135 Q42 52 200 32 Q358 52 358 135 L358 330" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.14" />
      {/* Dome finial */}
      <circle cx="200" cy="14" r="5" fill="#D4AF37" fillOpacity="0.18" />
      <path d="M196 16 L200 4 L204 16" fill="#D4AF37" fillOpacity="0.14" />

      {/* ── TOP FLORAL CROWN — large, lush ── */}
      {/* Center rose cluster */}
      <circle cx="200" cy="28" r="16" fill="#E88090" fillOpacity="0.35" />
      <circle cx="200" cy="28" r="10" fill="#FF9BAA" fillOpacity="0.25" />
      <circle cx="200" cy="28" r="5" fill="#FFCCC0" fillOpacity="0.20" />
      {/* Left blooms */}
      <circle cx="180" cy="36" r="12" fill="#FFB0A0" fillOpacity="0.30" />
      <circle cx="180" cy="36" r="7" fill="#FFC8B8" fillOpacity="0.20" />
      <circle cx="165" cy="44" r="10" fill="#FF8C6A" fillOpacity="0.25" />
      <circle cx="165" cy="44" r="5" fill="#FFCBA4" fillOpacity="0.18" />
      <circle cx="152" cy="52" r="7" fill="#E88090" fillOpacity="0.20" />
      {/* Right blooms */}
      <circle cx="220" cy="36" r="12" fill="#FF8C6A" fillOpacity="0.28" />
      <circle cx="220" cy="36" r="7" fill="#FFD0B0" fillOpacity="0.20" />
      <circle cx="235" cy="44" r="10" fill="#E88090" fillOpacity="0.25" />
      <circle cx="235" cy="44" r="5" fill="#FFCCC0" fillOpacity="0.18" />
      <circle cx="248" cy="52" r="7" fill="#FFB0A0" fillOpacity="0.20" />
      {/* Small ivory buds */}
      <circle cx="190" cy="20" r="4" fill="#FFF5EA" fillOpacity="0.30" />
      <circle cx="210" cy="20" r="3.5" fill="#FFF0E0" fillOpacity="0.28" />
      <circle cx="170" cy="30" r="3" fill="#FFF5EA" fillOpacity="0.22" />
      <circle cx="230" cy="30" r="3" fill="#FFF0E0" fillOpacity="0.22" />
      {/* Leaves radiating from top */}
      <path d="M142 56 Q132 48 145 42 Q148 50 142 56Z" fill="#5A8A50" fillOpacity="0.25" />
      <path d="M258 56 Q268 48 255 42 Q252 50 258 56Z" fill="#5A8A50" fillOpacity="0.25" />
      <path d="M168 26 Q158 20 170 16 Q172 24 168 26Z" fill="#6B9A5E" fillOpacity="0.18" />
      <path d="M232 26 Q242 20 230 16 Q228 24 232 26Z" fill="#6B9A5E" fillOpacity="0.18" />
      <path d="M148 40 Q138 34 150 30 Q152 38 148 40Z" fill="#5A8A50" fillOpacity="0.15" />
      <path d="M252 40 Q262 34 250 30 Q248 38 252 40Z" fill="#5A8A50" fillOpacity="0.15" />

      {/* ── LEFT SIDE FLORALS — cascading down the arch ── */}
      <circle cx="48" cy="90" r="12" fill="#E88090" fillOpacity="0.28" />
      <circle cx="48" cy="90" r="7" fill="#FF9BAA" fillOpacity="0.18" />
      <circle cx="38" cy="105" r="9" fill="#FFB0A0" fillOpacity="0.22" />
      <circle cx="55" cy="108" r="7" fill="#FFCCC0" fillOpacity="0.18" />
      <circle cx="32" cy="125" r="6" fill="#FF8C6A" fillOpacity="0.15" />
      <circle cx="42" cy="140" r="5" fill="#FFF5EA" fillOpacity="0.18" />
      <circle cx="35" cy="160" r="6" fill="#E88090" fillOpacity="0.12" />
      <circle cx="38" cy="180" r="4" fill="#FFCCC0" fillOpacity="0.10" />
      <circle cx="32" cy="200" r="5" fill="#FFB0A0" fillOpacity="0.08" />
      {/* Left leaves */}
      <path d="M62 85 Q72 78 68 95 Q60 90 62 85Z" fill="#5A8A50" fillOpacity="0.20" />
      <path d="M28 118 Q18 112 30 106 Q34 114 28 118Z" fill="#6B9A5E" fillOpacity="0.15" />
      <path d="M50 130 Q58 122 60 138 Q52 134 50 130Z" fill="#5A8A50" fillOpacity="0.12" />

      {/* ── RIGHT SIDE FLORALS — cascading ── */}
      <circle cx="352" cy="90" r="12" fill="#FF8C6A" fillOpacity="0.28" />
      <circle cx="352" cy="90" r="7" fill="#FFD0B0" fillOpacity="0.18" />
      <circle cx="362" cy="105" r="9" fill="#E88090" fillOpacity="0.22" />
      <circle cx="345" cy="108" r="7" fill="#FFCCC0" fillOpacity="0.18" />
      <circle cx="368" cy="125" r="6" fill="#FFB0A0" fillOpacity="0.15" />
      <circle cx="358" cy="140" r="5" fill="#FFF5EA" fillOpacity="0.18" />
      <circle cx="365" cy="160" r="6" fill="#FF8C6A" fillOpacity="0.12" />
      <circle cx="362" cy="180" r="4" fill="#E88090" fillOpacity="0.10" />
      <circle cx="368" cy="200" r="5" fill="#FFCCC0" fillOpacity="0.08" />
      {/* Right leaves */}
      <path d="M338 85 Q328 78 332 95 Q340 90 338 85Z" fill="#5A8A50" fillOpacity="0.20" />
      <path d="M372 118 Q382 112 370 106 Q366 114 372 118Z" fill="#6B9A5E" fillOpacity="0.15" />

      {/* ── CHANDELIERS — elaborate, with glow ── */}
      {/* Left chandelier */}
      <line x1="110" y1="48" x2="110" y2="78" stroke="#D4AF37" strokeWidth="0.6" strokeOpacity="0.25" />
      <path d="M96 82 Q96 75 110 75 Q124 75 124 82 L120 96 Q110 102 100 96Z" fill="#D4AF37" fillOpacity="0.10" stroke="#D4AF37" strokeWidth="0.4" strokeOpacity="0.18" />
      {/* Chandelier drops */}
      <line x1="102" y1="96" x2="102" y2="104" stroke="#D4AF37" strokeWidth="0.3" strokeOpacity="0.15" />
      <circle cx="102" cy="105" r="1.5" fill="#FFD700" fillOpacity="0.20" />
      <line x1="110" y1="100" x2="110" y2="108" stroke="#D4AF37" strokeWidth="0.3" strokeOpacity="0.15" />
      <circle cx="110" cy="109" r="1.5" fill="#FFD700" fillOpacity="0.20" />
      <line x1="118" y1="96" x2="118" y2="104" stroke="#D4AF37" strokeWidth="0.3" strokeOpacity="0.15" />
      <circle cx="118" cy="105" r="1.5" fill="#FFD700" fillOpacity="0.20" />
      {/* Center glow */}
      <circle cx="110" cy="85" r="4" fill="#FFD700" fillOpacity="0.12" />
      <circle cx="110" cy="85" r="10" fill="#FFD700" fillOpacity="0.04" />

      {/* Right chandelier */}
      <line x1="290" y1="48" x2="290" y2="78" stroke="#D4AF37" strokeWidth="0.6" strokeOpacity="0.25" />
      <path d="M276 82 Q276 75 290 75 Q304 75 304 82 L300 96 Q290 102 280 96Z" fill="#D4AF37" fillOpacity="0.10" stroke="#D4AF37" strokeWidth="0.4" strokeOpacity="0.18" />
      <line x1="282" y1="96" x2="282" y2="104" stroke="#D4AF37" strokeWidth="0.3" strokeOpacity="0.15" />
      <circle cx="282" cy="105" r="1.5" fill="#FFD700" fillOpacity="0.20" />
      <line x1="290" y1="100" x2="290" y2="108" stroke="#D4AF37" strokeWidth="0.3" strokeOpacity="0.15" />
      <circle cx="290" cy="109" r="1.5" fill="#FFD700" fillOpacity="0.20" />
      <line x1="298" y1="96" x2="298" y2="104" stroke="#D4AF37" strokeWidth="0.3" strokeOpacity="0.15" />
      <circle cx="298" cy="105" r="1.5" fill="#FFD700" fillOpacity="0.20" />
      <circle cx="290" cy="85" r="4" fill="#FFD700" fillOpacity="0.12" />
      <circle cx="290" cy="85" r="10" fill="#FFD700" fillOpacity="0.04" />

      {/* Center mini chandelier */}
      <line x1="200" y1="42" x2="200" y2="60" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.20" />
      <path d="M190 64 Q190 58 200 58 Q210 58 210 64 L207 72 Q200 76 193 72Z" fill="#D4AF37" fillOpacity="0.08" stroke="#D4AF37" strokeWidth="0.3" strokeOpacity="0.14" />
      <circle cx="200" cy="66" r="2.5" fill="#FFD700" fillOpacity="0.15" />
      <circle cx="200" cy="66" r="8" fill="#FFD700" fillOpacity="0.03" />

      {/* ── HANGING FLORAL STRINGS ── */}
      {/* Left strings */}
      <path d="M70 58 Q72 70 70 82" stroke="#E88090" strokeWidth="0.4" strokeOpacity="0.18" />
      <circle cx="70" cy="68" r="2" fill="#FF9BAA" fillOpacity="0.18" />
      <circle cx="70" cy="78" r="2.5" fill="#FFCCC0" fillOpacity="0.15" />
      <circle cx="70" cy="85" r="2" fill="#FFF5EA" fillOpacity="0.12" />
      <path d="M85" y1="52" x2="85" y2="70" stroke="#FFB0A0" strokeWidth="0.3" strokeOpacity="0.12" />
      {/* Right strings */}
      <path d="M330 58 Q328 70 330 82" stroke="#E88090" strokeWidth="0.4" strokeOpacity="0.18" />
      <circle cx="330" cy="68" r="2" fill="#FFB0A0" fillOpacity="0.18" />
      <circle cx="330" cy="78" r="2.5" fill="#FF9BAA" fillOpacity="0.15" />
      <circle cx="330" cy="85" r="2" fill="#FFF5EA" fillOpacity="0.12" />

      {/* ── BOTTOM CORNER FLORALS ── */}
      <circle cx="32" cy="280" r="8" fill="#E88090" fillOpacity="0.12" />
      <circle cx="40" cy="295" r="6" fill="#FFB0A0" fillOpacity="0.10" />
      <circle cx="25" cy="300" r="5" fill="#FFCCC0" fillOpacity="0.08" />
      <circle cx="368" cy="280" r="8" fill="#FFB0A0" fillOpacity="0.12" />
      <circle cx="360" cy="295" r="6" fill="#E88090" fillOpacity="0.10" />
      <circle cx="375" cy="300" r="5" fill="#FFCCC0" fillOpacity="0.08" />
    </svg>
  );
}

/* ================================================================== */
/*  SVG: Royal couple — detailed, facing each other                   */
/* ================================================================== */

function RoyalCouple({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 230" className={className} fill="none">
      <ellipse cx="100" cy="225" rx="70" ry="5" fill="#D4AF37" fillOpacity="0.05" />
      {/* Groom */}
      <circle cx="70" cy="55" r="18" fill="#8B6040" fillOpacity="0.65" />
      <path d="M54 48 Q70 30 86 48 Q88 58 70 62 Q52 58 54 48Z" fill="#C03030" fillOpacity="0.55" />
      <path d="M58 45 Q70 34 82 45" fill="#D4AF37" fillOpacity="0.28" />
      <circle cx="70" cy="40" r="3" fill="#D4AF37" fillOpacity="0.45" />
      <circle cx="70" cy="40" r="1.5" fill="#FFE0A0" fillOpacity="0.5" />
      <path d="M82 42 Q90 30 88 45" stroke="#D4AF37" strokeWidth="0.6" strokeOpacity="0.3" />
      <circle cx="78" cy="55" r="1" fill="#1A0808" fillOpacity="0.4" />
      <path d="M48 220 L54 90 Q54 75 70 75 Q86 75 86 90 L92 220" fill="#F0E8D0" fillOpacity="0.55" />
      <path d="M62 92 L78 92 L76 108 L64 108Z" fill="#D4AF37" fillOpacity="0.18" />
      <path d="M86 85 Q95 90 92 120 Q88 110 86 90" fill="#D4AF37" fillOpacity="0.10" />
      {/* Bride */}
      <circle cx="130" cy="55" r="18" fill="#8B6040" fillOpacity="0.60" />
      <path d="M115 50 Q130 38 145 50 Q145 55 130 58 Q115 55 115 50Z" fill="#1A0808" fillOpacity="0.35" />
      <circle cx="130" cy="45" r="2.5" fill="#D4AF37" fillOpacity="0.55" />
      <path d="M130 42 L130 38" stroke="#D4AF37" strokeWidth="0.6" strokeOpacity="0.35" />
      <circle cx="123" cy="58" r="1.5" fill="#D4AF37" fillOpacity="0.40" />
      <circle cx="113" cy="58" r="2" fill="#D4AF37" fillOpacity="0.30" />
      <circle cx="147" cy="58" r="2" fill="#D4AF37" fillOpacity="0.30" />
      <path d="M104 220 L112 88 Q112 75 130 75 Q148 75 148 88 L160 220 Q130 208 104 220Z" fill="#C03030" fillOpacity="0.50" />
      <path d="M108 195 Q130 185 156 195" stroke="#D4AF37" strokeWidth="0.6" strokeOpacity="0.20" />
      <path d="M110 200 Q130 190 154 200" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.16" />
      <path d="M112 205 Q130 196 152 205" stroke="#D4AF37" strokeWidth="0.4" strokeOpacity="0.12" />
      <path d="M120 82 L140 82 L138 95 L122 95Z" fill="#D4AF37" fillOpacity="0.14" />
      <path d="M130 50 Q155 45 158 88 Q150 72 130 60" fill="#FF8C6A" fillOpacity="0.18" />
      <circle cx="108" cy="140" r="3" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.22" fill="none" />
      <circle cx="108" cy="145" r="3" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.18" fill="none" />
      {/* Varmala */}
      <path d="M86 100 Q100 120 114 100" stroke="#FF8C6A" strokeOpacity="0.40" strokeWidth="1.5" fill="none" />
      <path d="M88 104 Q100 116 112 104" stroke="#D4AF37" strokeOpacity="0.22" strokeWidth="0.8" fill="none" />
      <circle cx="90" cy="106" r="3" fill="#FF9BAA" fillOpacity="0.35" />
      <circle cx="96" cy="112" r="3.5" fill="#FFB347" fillOpacity="0.30" />
      <circle cx="100" cy="116" r="3" fill="#FF8C6A" fillOpacity="0.32" />
      <circle cx="104" cy="112" r="3.5" fill="#E88090" fillOpacity="0.30" />
      <circle cx="110" cy="106" r="3" fill="#FFCCC0" fillOpacity="0.35" />
    </svg>
  );
}

/* ================================================================== */
/*  Elephant SVG with walk animation                                  */
/* ================================================================== */

/* ElephantProcession removed — replaced with decorative ornamental section */

/* ================================================================== */
/*  Helpers                                                           */
/* ================================================================== */

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-1">
      <div className="maharani-shimmer-line h-px w-14" />
      <span className="text-[10px] text-[#D4AF37]/40" style={{ animation: "maharani-glow-pulse 3s ease-in-out infinite" }}>✦</span>
      <div className="maharani-shimmer-line h-px w-14" />
    </div>
  );
}

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-12 text-center">
      <p className="text-[9px] font-medium uppercase tracking-[0.4em] text-[#D4AF37]/50" style={{ fontFamily: "var(--font-cinzel)" }}>{label}</p>
      <GoldDivider />
      <h2 className="maharani-shimmer-text mt-3 inline-block text-3xl md:text-4xl" style={{ fontFamily: "var(--font-great-vibes)" }}>{title}</h2>
    </div>
  );
}

/* ================================================================== */
/*  Parallax section wrapper                                          */
/* ================================================================== */

function ParallaxSection({ children, className, speed = 0.1 }: { children: React.ReactNode; className?: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30 * speed * 100, -30 * speed * 100]);

  return (
    <motion.section ref={ref} className={className} style={{ y }}>
      {children}
    </motion.section>
  );
}

/* ================================================================== */
/*  Events data                                                       */
/* ================================================================== */

const EVENTS = [
  { name: "Haldi", date: "June 12, 2026", time: "10 AM", venue: "Palace Courtyard", accent: "#C8960A", iconBg: "from-[#FFF8E0] to-[#FFEFB8]", iconSvg: "M12 3 Q14 7 12 11 Q10 7 12 3Z M8 6 Q10 4 12 8 Q10 10 8 6Z M16 6 Q14 4 12 8 Q14 10 16 6Z M10 11 L10 18 M14 11 L14 18 M8 18 L16 18", motif: "Turmeric blessings for the couple" },
  { name: "Mehendi", date: "June 12, 2026", time: "4 PM", venue: "Garden Pavilion", accent: "#4A7A35", iconBg: "from-[#EEF6E8] to-[#D8EAD0]", iconSvg: "M12 2 Q16 5 16 10 Q14 14 12 16 Q10 14 8 10 Q8 5 12 2Z M12 5 L12 14 M10 7 L8 5 M14 7 L16 5 M10 10 L7 9 M14 10 L17 9", motif: "Intricate henna artistry" },
  { name: "Sangeet", date: "June 13, 2026", time: "7 PM", venue: "Grand Ballroom", accent: "#B07060", iconBg: "from-[#FFF0EC] to-[#FFE0D8]", iconSvg: "M6 4 L6 14 Q6 18 10 18 Q12 18 12 16 L12 8 M12 8 Q12 6 14 6 Q16 6 16 8 L16 16 Q16 18 18 18 M4 8 L8 8 M14 12 L18 12", motif: "A night of music and dance" },
  { name: "Wedding", date: "June 15, 2026", time: "6 PM", venue: "The Royal Mandap", accent: "#D4AF37", iconBg: "from-[#FFF8EA] to-[#FFEFC8]", iconSvg: "M12 6 Q12 2 8 2 Q4 2 4 6 Q4 12 12 18 Q20 12 20 6 Q20 2 16 2 Q12 2 12 6Z", motif: "Sacred vows under the stars" },
  { name: "Reception", date: "June 15, 2026", time: "9 PM", venue: "Palace Grand Hall", accent: "#8B7355", iconBg: "from-[#F8F2EA] to-[#EDE4D8]", iconSvg: "M12 2 L14 8 L20 8 L15 12 L17 18 L12 14 L7 18 L9 12 L4 8 L10 8Z", motif: "A grand celebration of togetherness" },
];

/* ================================================================== */
/*  Watermark — subtle diagonal pattern                               */
/* ================================================================== */

function Watermark() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[95] overflow-hidden">
      <span className="absolute top-[18%] left-[8%] -rotate-[30deg] whitespace-nowrap text-2xl font-semibold tracking-[0.4em] text-[#8B7355]/[0.07] select-none" style={{ fontFamily: "var(--font-cinzel)" }}>{platform.name}</span>
      <span className="absolute top-[50%] right-[6%] -rotate-[30deg] whitespace-nowrap text-2xl font-semibold tracking-[0.4em] text-[#8B7355]/[0.07] select-none" style={{ fontFamily: "var(--font-cinzel)" }}>{platform.name}</span>
      <span className="absolute bottom-[20%] left-[22%] -rotate-[30deg] whitespace-nowrap text-2xl font-semibold tracking-[0.4em] text-[#8B7355]/[0.07] select-none" style={{ fontFamily: "var(--font-cinzel)" }}>{platform.name}</span>
    </div>
  );
}

/* ================================================================== */
/*  Main experience                                                   */
/* ================================================================== */

export function MaharaniExperience() {
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 1.05]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: INJECTED_CSS }} />
      <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-[#FFF8F0] via-[#FFF5EA] to-[#FFF0E0]">
        <FloatingPetals />
        <Watermark />

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  HERO / COVER                                              */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <motion.section
          className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
          style={{ scale: heroScale }}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFF5EA] via-[#FFECD8] to-[#FFE0C8]" />
          {/* Glows */}
          <div className="absolute top-[25%] left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[#D4AF37]/[0.06] blur-[100px]" />
          <div className="absolute top-[15%] left-[20%] h-48 w-48 rounded-full bg-[#FF9BAA]/[0.08] blur-[60px]" />
          <div className="absolute top-[20%] right-[20%] h-48 w-48 rounded-full bg-[#FFB347]/[0.06] blur-[50px]" />
          {/* Light rays behind couple */}
          <div className="absolute top-[20%] left-1/2 h-[300px] w-[2px] -translate-x-1/2 rotate-[15deg] bg-gradient-to-b from-[#D4AF37]/[0.08] to-transparent blur-[3px]" />
          <div className="absolute top-[18%] left-1/2 h-[320px] w-[2px] -translate-x-[calc(50%+40px)] rotate-[-12deg] bg-gradient-to-b from-[#D4AF37]/[0.06] to-transparent blur-[3px]" />
          <div className="absolute top-[22%] left-1/2 h-[280px] w-[2px] -translate-x-[calc(50%-40px)] rotate-[20deg] bg-gradient-to-b from-[#FFB347]/[0.05] to-transparent blur-[3px]" />
          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,transparent_40%,rgba(120,60,30,0.06)_100%)]" />

          <SparkleField />

          {/* Floral arch — rich with chandeliers */}
          <FloralArch className="absolute top-[3%] left-1/2 h-[82%] w-auto max-w-[520px] -translate-x-1/2 md:h-[88%]" />

          {/* Extra floating floral clusters — foreground depth */}
          {/* Top-left cluster */}
          <div className="absolute top-[6%] left-[4%] z-[6]" style={{ animation: "maharani-float 8s ease-in-out 0.5s infinite" }}>
            <svg viewBox="0 0 60 70" className="h-14 w-auto opacity-40 blur-[0.5px]" fill="none">
              <circle cx="25" cy="22" r="14" fill="#E88090" fillOpacity="0.35" />
              <circle cx="25" cy="22" r="8" fill="#FF9BAA" fillOpacity="0.25" />
              <circle cx="40" cy="35" r="10" fill="#FFB0A0" fillOpacity="0.28" />
              <circle cx="15" cy="38" r="8" fill="#FFCCC0" fillOpacity="0.22" />
              <circle cx="30" cy="12" r="5" fill="#FFF5EA" fillOpacity="0.25" />
              <path d="M48 28 Q55 22 50 38 Q44 34 48 28Z" fill="#5A8A50" fillOpacity="0.22" />
              <path d="M8 30 Q2 24 12 20 Q14 28 8 30Z" fill="#6B9A5E" fillOpacity="0.18" />
            </svg>
          </div>
          {/* Top-right cluster */}
          <div className="absolute top-[5%] right-[4%] z-[6]" style={{ animation: "maharani-float 7s ease-in-out 1s infinite" }}>
            <svg viewBox="0 0 60 70" className="h-12 w-auto opacity-35 blur-[0.5px]" fill="none">
              <circle cx="35" cy="22" r="14" fill="#FF8C6A" fillOpacity="0.30" />
              <circle cx="35" cy="22" r="8" fill="#FFD0B0" fillOpacity="0.22" />
              <circle cx="20" cy="35" r="10" fill="#E88090" fillOpacity="0.25" />
              <circle cx="45" cy="38" r="8" fill="#FFB0A0" fillOpacity="0.20" />
              <circle cx="30" cy="12" r="5" fill="#FFF0E0" fillOpacity="0.22" />
              <path d="M12 28 Q5 22 10 38 Q16 34 12 28Z" fill="#5A8A50" fillOpacity="0.20" />
            </svg>
          </div>
          {/* Bottom-left cluster */}
          <div className="absolute bottom-[18%] left-[3%] z-[6]" style={{ animation: "maharani-float 9s ease-in-out 2s infinite" }}>
            <svg viewBox="0 0 50 50" className="h-10 w-auto opacity-30" fill="none">
              <circle cx="20" cy="20" r="12" fill="#E88090" fillOpacity="0.25" />
              <circle cx="20" cy="20" r="6" fill="#FFCCC0" fillOpacity="0.18" />
              <circle cx="35" cy="30" r="8" fill="#FFB0A0" fillOpacity="0.20" />
              <path d="M38 18 Q44 14 40 28 Q36 24 38 18Z" fill="#5A8A50" fillOpacity="0.18" />
            </svg>
          </div>
          {/* Bottom-right cluster */}
          <div className="absolute bottom-[20%] right-[3%] z-[6]" style={{ animation: "maharani-float 8.5s ease-in-out 1.5s infinite" }}>
            <svg viewBox="0 0 50 50" className="h-10 w-auto opacity-30" fill="none">
              <circle cx="30" cy="20" r="12" fill="#FFB0A0" fillOpacity="0.25" />
              <circle cx="30" cy="20" r="6" fill="#FF9BAA" fillOpacity="0.18" />
              <circle cx="15" cy="30" r="8" fill="#FFCCC0" fillOpacity="0.20" />
              <path d="M12 18 Q6 14 10 28 Q14 24 12 18Z" fill="#6B9A5E" fillOpacity="0.18" />
            </svg>
          </div>

          {/* Couple */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            style={{ opacity: heroOpacity }}
          >
            <div style={{ animation: "maharani-float 6s ease-in-out infinite" }}>
              <RoyalCouple className="relative z-10 h-[200px] w-auto md:h-[260px]" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="relative z-10 mt-2 flex flex-col items-center px-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ opacity: heroOpacity }}
          >
            <p className="text-[9px] font-medium uppercase tracking-[0.5em] text-[#8B6040]/50 md:text-[10px]" style={{ fontFamily: "var(--font-cinzel)" }}>
              A Royal Celebration of Love
            </p>
            <GoldDivider />
            <h1 className="maharani-shimmer-text mt-1 inline-block text-5xl leading-tight md:text-7xl" style={{ fontFamily: "var(--font-great-vibes)" }}>
              Aarav & Priya
            </h1>
            <div className="mt-3 flex items-center gap-3">
              <div className="maharani-shimmer-line h-px w-16" />
              <p className="text-xs tracking-[0.15em] text-[#8B6040]/55" style={{ fontFamily: "var(--font-cormorant)" }}>June 15, 2026</p>
              <div className="maharani-shimmer-line h-px w-16" />
            </div>
            <p className="mt-1.5 text-[9px] tracking-[0.1em] text-[#8B6040]/35" style={{ fontFamily: "var(--font-montserrat)" }}>
              The Royal Palace · Jaipur, Rajasthan
            </p>
          </motion.div>

          {/* Scroll hint */}
          <motion.div className="absolute bottom-6" animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <div className="flex flex-col items-center gap-1 text-[#8B6040]/25">
              <p className="text-[7px] uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-montserrat)" }}>Scroll</p>
              <div className="h-5 w-px bg-gradient-to-b from-[#8B6040]/20 to-transparent" />
            </div>
          </motion.div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  OUR STORY                                                 */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <ParallaxSection className="relative px-6 py-24 md:py-32" speed={0.05}>
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading label="Our Story" title="Written in the Stars" />
            <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }}
              className="text-base leading-[2] text-[#5A3A28]/55 md:text-lg" style={{ fontFamily: "var(--font-cormorant)" }}>
              We met at a coffee shop on a rainy afternoon. What started as a conversation
              over chai turned into a lifetime of love. Three years later, here we are —
              ready to begin our forever together.
            </motion.p>
            <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, type: "spring" }}>
              <Heart className="mx-auto mt-8 h-5 w-5 text-[#D4AF37]/30" style={{ animation: "maharani-glow-pulse 2.5s ease-in-out infinite" }} />
            </motion.div>
          </div>
        </ParallaxSection>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  EVENTS — full-width stacked, one per scroll view          */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="relative px-6 py-16">
          <SectionHeading label="The Celebrations" title="Wedding Events" />
        </section>

        {EVENTS.map((event, i) => (
          <motion.section
            key={event.name}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative px-6 py-16 md:py-24"
          >
            <div className={`mx-auto flex max-w-4xl items-center gap-10 ${i % 2 === 1 ? "flex-row-reverse" : ""} max-md:flex-col`}>
              {/* Left/Right — decorative visual */}
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex w-full flex-col items-center md:w-2/5"
              >
                {/* Large icon circle — color-tinted per event */}
                <div className={`flex h-24 w-24 items-center justify-center rounded-full border shadow-[0_4px_20px_rgba(180,140,60,0.06)] bg-gradient-to-b ${event.iconBg}`} style={{ borderColor: `${event.accent}20` }}>
                  <svg viewBox="0 0 24 20" className="h-8 w-8" fill="none" stroke={event.accent} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7">
                    <path d={event.iconSvg} />
                  </svg>
                </div>
                {/* Vertical gold line */}
                <div className="my-3 h-12 w-px bg-gradient-to-b from-[#D4AF37]/20 to-transparent" />
                {/* Small floral accent */}
                <svg viewBox="0 0 40 20" className="w-10" fill="none">
                  <circle cx="20" cy="10" r="5" fill="#E88090" fillOpacity="0.18" />
                  <circle cx="20" cy="10" r="2.5" fill="#FFCCC0" fillOpacity="0.14" />
                  <circle cx="10" cy="12" r="3" fill="#FFB0A0" fillOpacity="0.12" />
                  <circle cx="30" cy="12" r="3" fill="#FFB0A0" fillOpacity="0.12" />
                  <path d="M6 10 Q3 6 8 5 Q9 8 6 10Z" fill="#5A8A50" fillOpacity="0.14" />
                  <path d="M34 10 Q37 6 32 5 Q31 8 34 10Z" fill="#5A8A50" fillOpacity="0.14" />
                </svg>
              </motion.div>

              {/* Right/Left — content */}
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`w-full md:w-3/5 ${i % 2 === 1 ? "md:text-right" : ""} max-md:text-center`}
              >
                {/* Tag */}
                <span className="inline-block rounded-full border border-[#D4AF37]/10 bg-[#D4AF37]/[0.04] px-4 py-1 text-[8px] font-semibold uppercase tracking-[0.15em] text-[#8B6040]/55" style={{ fontFamily: "var(--font-montserrat)" }}>
                  {event.name}
                </span>

                {/* Event name */}
                <h3 className="mt-4 text-3xl text-[#3A1A10] md:text-4xl" style={{ fontFamily: "var(--font-great-vibes)" }}>{event.name}</h3>

                {/* Motif */}
                <p className="mt-2 text-sm italic text-[#8B6040]/50" style={{ fontFamily: "var(--font-cormorant)" }}>{event.motif}</p>

                {/* Gold divider */}
                <div className={`my-5 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent ${i % 2 === 1 ? "md:ml-auto md:w-48" : "md:w-48"}`} />

                {/* Details */}
                <div className={`space-y-2.5 ${i % 2 === 1 ? "md:ml-auto" : ""}`}>
                  <div className={`flex items-center gap-3 ${i % 2 === 1 ? "md:justify-end" : ""} max-md:justify-center`}>
                    <Calendar className="h-4 w-4 text-[#D4AF37]/45" />
                    <span className="text-sm text-[#3A1A10]/55" style={{ fontFamily: "var(--font-montserrat)" }}>{event.date}</span>
                  </div>
                  <div className={`flex items-center gap-3 ${i % 2 === 1 ? "md:justify-end" : ""} max-md:justify-center`}>
                    <Clock className="h-4 w-4 text-[#D4AF37]/45" />
                    <span className="text-sm text-[#3A1A10]/45" style={{ fontFamily: "var(--font-montserrat)" }}>{event.time}</span>
                  </div>
                  <div className={`flex items-center gap-3 ${i % 2 === 1 ? "md:justify-end" : ""} max-md:justify-center`}>
                    <MapPin className="h-4 w-4 text-[#D4AF37]/45" />
                    <span className="text-sm text-[#3A1A10]/40" style={{ fontFamily: "var(--font-montserrat)" }}>{event.venue}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Section divider — between events */}
            {i < EVENTS.length - 1 && (
              <div className="mx-auto mt-16 flex items-center justify-center">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]/15" />
                <div className="mx-2 h-1.5 w-1.5 rotate-45 bg-[#D4AF37]/15" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]/15" />
              </div>
            )}
          </motion.section>
        ))}

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  THE JOURNEY — decorative royal section                    */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <ParallaxSection className="relative overflow-hidden px-6 py-24" speed={0.08}>
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading label="The Journey" title="Two Souls, One Path" />

            {/* Decorative royal ornament */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto mb-8"
            >
              <svg viewBox="0 0 300 100" className="mx-auto w-full max-w-sm" fill="none">
                {/* Central mandala-style ornament */}
                <circle cx="150" cy="50" r="35" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.20" />
                <circle cx="150" cy="50" r="28" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.15" />
                <circle cx="150" cy="50" r="20" stroke="#D4AF37" strokeWidth="0.4" strokeOpacity="0.12" />
                {/* Center heart */}
                <path d="M145 45 Q145 40 150 40 Q155 40 155 45 Q155 52 150 56 Q145 52 145 45Z" fill="#D4AF37" fillOpacity="0.20" />
                {/* Radiating petals */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
                  const rad = (angle * Math.PI) / 180;
                  const x1 = 150 + 22 * Math.cos(rad);
                  const y1 = 50 + 22 * Math.sin(rad);
                  const x2 = 150 + 32 * Math.cos(rad);
                  const y2 = 50 + 32 * Math.sin(rad);
                  return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D4AF37" strokeWidth="0.4" strokeOpacity="0.12" />;
                })}
                {/* Small dots at cardinal points */}
                {[0, 90, 180, 270].map((angle) => {
                  const rad = (angle * Math.PI) / 180;
                  const cx = 150 + 35 * Math.cos(rad);
                  const cy = 50 + 35 * Math.sin(rad);
                  return <circle key={angle} cx={cx} cy={cy} r="2" fill="#D4AF37" fillOpacity="0.15" />;
                })}
                {/* Extending decorative lines */}
                <line x1="30" y1="50" x2="112" y2="50" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.10" />
                <line x1="188" y1="50" x2="270" y2="50" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.10" />
                {/* Small floral dots on lines */}
                <circle cx="50" cy="50" r="2.5" fill="#E88090" fillOpacity="0.15" />
                <circle cx="75" cy="50" r="2" fill="#FFCCC0" fillOpacity="0.12" />
                <circle cx="95" cy="50" r="1.5" fill="#E88090" fillOpacity="0.10" />
                <circle cx="250" cy="50" r="2.5" fill="#FFB0A0" fillOpacity="0.15" />
                <circle cx="225" cy="50" r="2" fill="#FFCCC0" fillOpacity="0.12" />
                <circle cx="205" cy="50" r="1.5" fill="#FFB0A0" fillOpacity="0.10" />
              </svg>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-base leading-[2] text-[#5A3A28]/50"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              From the sound of shehnai to the shower of petals, from the warmth
              of blessings to the promise of forever — every step of this journey
              has led us to each other.
            </motion.p>

            {/* Three milestone moments */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              {[
                { label: "First Met", detail: "A rainy afternoon", iconPath: "M8 2 Q8 0 10 0 L14 0 Q16 0 16 2 L16 3 L8 3Z M6 4 L18 4 L18 6 Q18 14 12 18 Q6 14 6 6Z M11 14 L11 18 M9 18 L15 18" },
                { label: "Said Yes", detail: "Under the stars", iconPath: "M12 2 L13.5 8 L20 8 L15 12 L17 18 L12 14 L7 18 L9 12 L4 8 L10.5 8Z" },
                { label: "Forever", detail: "June 15, 2026", iconPath: "M12 6 Q12 2 8 2 Q4 2 4 6 Q4 12 12 18 Q20 12 20 6 Q20 2 16 2 Q12 2 12 6Z" },
              ].map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.15 }}
                  className="text-center"
                >
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/15 bg-[#D4AF37]/[0.05]">
                    <svg viewBox="0 0 24 20" className="h-4 w-4" fill="none" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity="0.55" strokeLinecap="round" strokeLinejoin="round">
                      <path d={m.iconPath} fill={i === 2 ? "#D4AF37" : "none"} fillOpacity={i === 2 ? "0.15" : "0"} />
                    </svg>
                  </div>
                  <p className="text-xs font-semibold text-[#3A1A10]/60" style={{ fontFamily: "var(--font-montserrat)" }}>{m.label}</p>
                  <p className="mt-0.5 text-[10px] text-[#8B6040]/40" style={{ fontFamily: "var(--font-cormorant)" }}>{m.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </ParallaxSection>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  FLORAL DIVIDER                                            */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center py-6"
        >
          <svg viewBox="0 0 400 60" className="w-full max-w-lg" fill="none">
            {/* Center line */}
            <line x1="40" y1="30" x2="160" y2="30" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.15" />
            <line x1="240" y1="30" x2="360" y2="30" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.15" />
            {/* Center bloom */}
            <circle cx="200" cy="30" r="10" fill="#E88090" fillOpacity="0.22" />
            <circle cx="200" cy="30" r="6" fill="#FF9BAA" fillOpacity="0.15" />
            <circle cx="200" cy="30" r="3" fill="#FFCCC0" fillOpacity="0.12" />
            {/* Left blooms */}
            <circle cx="180" cy="28" r="7" fill="#FFB0A0" fillOpacity="0.18" />
            <circle cx="170" cy="34" r="5" fill="#FFCCC0" fillOpacity="0.14" />
            <circle cx="165" cy="26" r="4" fill="#FFF5EA" fillOpacity="0.18" />
            {/* Right blooms */}
            <circle cx="220" cy="28" r="7" fill="#FF8C6A" fillOpacity="0.18" />
            <circle cx="230" cy="34" r="5" fill="#FFB0A0" fillOpacity="0.14" />
            <circle cx="235" cy="26" r="4" fill="#FFF5EA" fillOpacity="0.18" />
            {/* Leaves */}
            <path d="M155 30 Q148 24 158 22 Q160 28 155 30Z" fill="#5A8A50" fillOpacity="0.18" />
            <path d="M245 30 Q252 24 242 22 Q240 28 245 30Z" fill="#5A8A50" fillOpacity="0.18" />
            {/* Small dots along lines */}
            <circle cx="80" cy="30" r="2" fill="#E88090" fillOpacity="0.10" />
            <circle cx="120" cy="30" r="1.5" fill="#FFCCC0" fillOpacity="0.08" />
            <circle cx="280" cy="30" r="1.5" fill="#FFCCC0" fillOpacity="0.08" />
            <circle cx="320" cy="30" r="2" fill="#FFB0A0" fillOpacity="0.10" />
            {/* End ornaments */}
            <circle cx="40" cy="30" r="2" fill="#D4AF37" fillOpacity="0.12" />
            <circle cx="360" cy="30" r="2" fill="#D4AF37" fillOpacity="0.12" />
          </svg>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  VENUE                                                     */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <ParallaxSection className="relative px-6 py-24" speed={0.06}>
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading label="The Venue" title="The Royal Palace" />
            <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="text-base leading-relaxed text-[#5A3A28]/50" style={{ fontFamily: "var(--font-cormorant)" }}>
              Nestled in the heart of Jaipur, our celebration unfolds within the majestic walls
              of a heritage palace — where every arch tells a story.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#D4AF37]/[0.08] px-6 py-2.5">
              <MapPin className="h-4 w-4 text-[#D4AF37]/60" />
              <span className="text-sm text-[#5A3A28]/50" style={{ fontFamily: "var(--font-montserrat)" }}>Palace Road, Jaipur, Rajasthan</span>
            </motion.div>
          </div>
        </ParallaxSection>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  RSVP                                                      */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <motion.section className="relative px-6 py-24" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="mx-auto max-w-lg text-center">
            <SectionHeading label="We await your presence" title="Kindly Respond" />
            <p className="text-base text-[#5A3A28]/45" style={{ fontFamily: "var(--font-cormorant)" }}>
              Your presence would make our celebration truly complete.
            </p>
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-8">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-[#D4AF37] to-[#C6A85A] px-10 text-base text-white hover:from-[#C09A2F] hover:to-[#B89848]">
                <Heart className="h-4 w-4" /> RSVP Now
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  CLOSING                                                   */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="border-t border-[#D4AF37]/10 px-6 py-12">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="maharani-shimmer-text inline-block text-2xl" style={{ fontFamily: "var(--font-great-vibes)" }}>Aarav & Priya</h3>
            <p className="mt-1 text-xs text-[#8B6040]/35" style={{ fontFamily: "var(--font-montserrat)" }}>June 15, 2026 · Jaipur, Rajasthan</p>
            <GoldDivider />
            <p className="mt-3 text-[10px] text-[#8B6040]/20" style={{ fontFamily: "var(--font-montserrat)" }}>{platform.watermarkText}</p>
          </div>
        </section>

        {/* Back button */}
        <Link href="/templates/the-maharani" className="fixed top-5 left-5 z-[101] flex items-center gap-1.5 rounded-full bg-white/70 px-4 py-2 text-xs font-medium text-[#3A1A10]/60 shadow-sm backdrop-blur-md transition-all hover:bg-white/90 hover:text-[#3A1A10]">
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </Link>
      </div>
    </>
  );
}
