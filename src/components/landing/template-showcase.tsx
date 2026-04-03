"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { type Template, CATEGORIES, TEMPLATES } from "@/lib/template-data";

/* Data imported from @/lib/template-data */

/* ================================================================== */
/*  Template card preview renderers                                   */
/* ================================================================== */

function WeddingPreview({ t }: { t: Template }) {
  const isBeach = t.id === "azure-vows";
  const isVelvet = t.id === "velvet-heirloom";

  // THE MAHARANI — warm peach, floral arch, chandeliers
  if (t.id === "the-maharani") {
    return (
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#F8EAD8] via-[#F2DCCA] to-[#EACEBC] p-4 text-center">
        <div className="absolute top-[20%] left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-[#D4AF37]/[0.06] blur-[30px]" />
        <svg viewBox="0 0 140 130" className="relative my-1 h-[85px] w-auto" fill="none">
          <path d="M15 125 L15 55 Q15 18 70 10 Q125 18 125 55 L125 125" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.18" />
          <circle cx="70" cy="14" r="7" fill="#E88090" fillOpacity="0.30" />
          <circle cx="70" cy="14" r="4" fill="#FF9BAA" fillOpacity="0.22" />
          <circle cx="60" cy="18" r="5" fill="#FFB0A0" fillOpacity="0.25" />
          <circle cx="80" cy="18" r="5" fill="#FF8C6A" fillOpacity="0.22" />
          <path d="M48 22 Q44 18 50 16 Q51 20 48 22Z" fill="#5A8A50" fillOpacity="0.18" />
          <path d="M92 22 Q96 18 90 16 Q89 20 92 22Z" fill="#5A8A50" fillOpacity="0.18" />
          <circle cx="20" cy="50" r="4" fill="#E88090" fillOpacity="0.18" />
          <circle cx="120" cy="50" r="4" fill="#FFB0A0" fillOpacity="0.18" />
          <line x1="42" y1="22" x2="42" y2="34" stroke="#D4AF37" strokeWidth="0.3" strokeOpacity="0.15" />
          <circle cx="42" cy="35" r="1.5" fill="#D4AF37" fillOpacity="0.12" />
          <line x1="98" y1="22" x2="98" y2="34" stroke="#D4AF37" strokeWidth="0.3" strokeOpacity="0.15" />
          <circle cx="98" cy="35" r="1.5" fill="#D4AF37" fillOpacity="0.12" />
          <circle cx="58" cy="52" r="8" fill="#5A3020" fillOpacity="0.50" />
          <path d="M47 115 L50 68 Q50 58 58 58 Q66 58 66 68 L69 115" fill="#5A3020" fillOpacity="0.40" />
          <path d="M52 48 Q58 42 64 48 Q64 53 58 54 Q52 53 52 48Z" fill="#D4AF37" fillOpacity="0.30" />
          <circle cx="82" cy="52" r="8" fill="#6A2030" fillOpacity="0.45" />
          <path d="M66 115 L70 66 Q70 58 82 58 Q94 58 94 66 L102 115 Q82 108 66 115Z" fill="#8A2040" fillOpacity="0.32" />
          <path d="M82 46 Q92 44 94 62 Q90 54 82 52" fill="#E88090" fillOpacity="0.15" />
          <path d="M66 74 Q74 84 82 74" stroke="#D4AF37" strokeOpacity="0.28" strokeWidth="0.8" />
          <circle cx="69" cy="77" r="1.5" fill="#E88090" fillOpacity="0.28" />
          <circle cx="74" cy="80" r="1.8" fill="#D4AF37" fillOpacity="0.20" />
          <circle cx="79" cy="77" r="1.5" fill="#FFB0A0" fillOpacity="0.28" />
        </svg>
        <h4 className="relative text-[13px] leading-tight text-[#3A1A10]" style={{ fontFamily: "var(--font-great-vibes)" }}>Aarav <span className="text-[#D4AF37]">&</span> Priya</h4>
        <div className="relative my-1 flex items-center gap-1"><div className="h-px w-6 bg-gradient-to-r from-transparent to-[#D4AF37]/25" /><span className="text-[5px] text-[#D4AF37]/35">✦</span><div className="h-px w-6 bg-gradient-to-l from-transparent to-[#D4AF37]/25" /></div>
        <p className="relative text-[6px] text-[#8B6040]/50" style={{ fontFamily: "var(--font-montserrat)" }}>June 15, 2026</p>
      </div>
    );
  }

  // AZURE VOWS — open beach landscape, no arch, couple off-center
  if (isBeach) {
    return (
      <div className="relative flex h-full w-full flex-col justify-end overflow-hidden p-4">
        {/* Sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#B8D8F0] via-[#D0E8F8] to-[#E0EEF5]" />
        {/* Sun glow — top right */}
        <div className="absolute top-[10%] right-[15%] h-14 w-14 rounded-full bg-[#FFF0D0]/40 blur-[18px]" />
        {/* Horizon ocean line */}
        <div className="absolute bottom-[28%] left-0 right-0 h-[8%] bg-gradient-to-b from-[#6AACCC]/15 to-transparent" />
        {/* Sand */}
        <div className="absolute bottom-0 left-0 right-0 h-[28%] bg-gradient-to-t from-[#F0E4D0] via-[#EEE0CC] to-[#E8DCCA]/40" />
        {/* Waves */}
        <svg viewBox="0 0 140 10" preserveAspectRatio="none" className="absolute bottom-[26%] left-0 w-full">
          <path d="M0 5 Q15 2 30 5 Q45 8 60 5 Q75 2 90 5 Q105 8 120 5 Q135 2 140 5" stroke="#5A9CC0" strokeWidth="0.5" strokeOpacity="0.12" fill="none" />
        </svg>

        {/* Couple — right side, standing on sand */}
        <svg viewBox="0 0 50 70" className="absolute bottom-[22%] right-[18%] h-[55px]" fill="none">
          {/* Groom */}
          <circle cx="18" cy="14" r="6" fill="#2A4050" fillOpacity="0.50" />
          <path d="M10 62 L13 28 Q13 20 18 20 Q23 20 23 28 L26 62" fill="#2A4050" fillOpacity="0.40" />
          {/* Bride */}
          <circle cx="34" cy="14" r="6" fill="#7A6050" fillOpacity="0.35" />
          <path d="M25 62 L28 26 Q28 20 34 20 Q40 20 40 26 L46 62 Q34 57 25 62Z" fill="#FFFFFF" fillOpacity="0.55" />
          {/* Veil blowing */}
          <path d="M34 10 Q44 7 46 20 Q42 14 34 14" fill="#FFFFFF" fillOpacity="0.18" />
          {/* Bouquet */}
          <circle cx="28" cy="38" r="2" fill="#FFD0D0" fillOpacity="0.35" />
        </svg>

        {/* Loose flowers — left side, scattered on sand */}
        <circle cx="12%" cy="72%" r="2" className="absolute fill-white/30" />
        <circle cx="20%" cy="78%" r="1.5" className="absolute fill-[#FFE0E0]/25" />
        <circle cx="8%" cy="80%" r="1.5" className="absolute fill-white/20" />

        {/* Text — bottom left */}
        <div className="relative z-10 mb-1">
          <h4 className="text-[14px] leading-tight text-[#1A3A4A]" style={{ fontFamily: "var(--font-great-vibes)" }}>
            James <span className="text-[#5B9EC4]">&</span> Rose
          </h4>
          <div className="mt-1 flex items-center gap-1.5">
            <div className="h-px w-5 bg-[#5B9EC4]/20" />
            <p className="text-[6px] text-[#4A7A98]/50" style={{ fontFamily: "var(--font-montserrat)" }}>Oct 8, 2026</p>
          </div>
          <p className="mt-0.5 text-[5px] text-[#4A7A98]/35" style={{ fontFamily: "var(--font-montserrat)" }}>Sunset Beach · Malibu</p>
        </div>
      </div>
    );
  }

  // VELVET HEIRLOOM — deep maroon/burgundy, royal mandala, dark luxury
  if (isVelvet) return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#2A0E12] via-[#1E0A0E] to-[#140608] p-4 text-center">
      {/* Warm gold glow */}
      <div className="absolute top-[30%] left-1/2 h-28 w-28 -translate-x-1/2 rounded-full bg-[#D4AF37]/[0.06] blur-[30px]" />
      <svg viewBox="0 0 140 130" className="relative my-1 h-[85px] w-auto" fill="none">
        {/* Mandala circles */}
        <circle cx="70" cy="55" r="50" stroke="#D4AF37" strokeWidth="0.4" strokeOpacity="0.08" />
        <circle cx="70" cy="55" r="40" stroke="#D4AF37" strokeWidth="0.3" strokeOpacity="0.06" />
        {/* Top ornamental motif */}
        <path d="M60 8 Q70 2 80 8 Q80 14 70 16 Q60 14 60 8Z" fill="#D4AF37" fillOpacity="0.12" />
        <circle cx="70" cy="8" r="2" fill="#D4AF37" fillOpacity="0.18" />
        {/* Corner L-brackets */}
        <path d="M18 15 L18 25" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.12" />
        <path d="M18 15 L28 15" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.12" />
        <path d="M122 15 L122 25" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.12" />
        <path d="M122 15 L112 15" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.12" />
        <path d="M18 120 L18 110" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.12" />
        <path d="M18 120 L28 120" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.12" />
        <path d="M122 120 L122 110" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.12" />
        <path d="M122 120 L112 120" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.12" />
        {/* Couple — gold silhouettes on dark */}
        <circle cx="58" cy="48" r="8" fill="#D4AF37" fillOpacity="0.18" />
        <path d="M47 110 L50 65 Q50 55 58 55 Q66 55 66 65 L69 110" fill="#D4AF37" fillOpacity="0.12" />
        <path d="M52 43 Q58 37 64 43 Q64 49 58 50 Q52 49 52 43Z" fill="#D4AF37" fillOpacity="0.15" />
        <circle cx="82" cy="48" r="8" fill="#D4AF37" fillOpacity="0.16" />
        <path d="M66 110 L70 63 Q70 55 82 55 Q94 55 94 63 L102 110 Q82 104 66 110Z" fill="#D4AF37" fillOpacity="0.10" />
        <path d="M82 42 Q92 40 94 58 Q90 50 82 48" fill="#D4AF37" fillOpacity="0.06" />
        <circle cx="82" cy="45" r="1.2" fill="#D4AF37" fillOpacity="0.30" />
        {/* Varmala */}
        <path d="M66 70 Q74 80 82 70" stroke="#D4AF37" strokeOpacity="0.22" strokeWidth="0.8" />
        <circle cx="70" cy="74" r="1.5" fill="#D4AF37" fillOpacity="0.18" />
        <circle cx="76" cy="76" r="1.5" fill="#D4AF37" fillOpacity="0.14" />
        {/* Small diyas at bottom */}
        <path d="M30 108 Q32 104 34 108" fill="#FFB347" fillOpacity="0.15" />
        <circle cx="32" cy="104" r="1" fill="#FFD700" fillOpacity="0.15" />
        <path d="M106 108 Q108 104 110 108" fill="#FFB347" fillOpacity="0.15" />
        <circle cx="108" cy="104" r="1" fill="#FFD700" fillOpacity="0.15" />
      </svg>
      <h4 className="relative text-[13px] leading-tight text-[#F0E8D8]" style={{ fontFamily: "var(--font-great-vibes)" }}>
        Vikram <span className="text-[#D4AF37]">&</span> Ananya
      </h4>
      <div className="relative my-1 flex items-center gap-1"><div className="h-px w-6 bg-gradient-to-r from-transparent to-[#D4AF37]/20" /><span className="text-[5px] text-[#D4AF37]/35">✦</span><div className="h-px w-6 bg-gradient-to-l from-transparent to-[#D4AF37]/20" /></div>
      <p className="relative text-[6px] text-[#D4AF37]/45" style={{ fontFamily: "var(--font-montserrat)" }}>Feb 14, 2026</p>
    </div>
  );
}

function BusinessPreview({ t }: { t: Template }) {
  const isDark = t.colors.bg.includes("1A1A1A") || t.colors.bg.includes("0F0F");
  return (
    <div className={`flex h-full w-full flex-col justify-between bg-gradient-to-b ${t.colors.bg} p-5`}>
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md" style={{ background: `${t.colors.accent}20`, border: `1px solid ${t.colors.accent}25` }}>
          <span className="text-[9px] font-bold" style={{ color: t.colors.accent, fontFamily: "var(--font-cinzel)" }}>A</span>
        </div>
        <span className="text-[6px] font-semibold uppercase tracking-[0.15em]" style={{ color: `${t.colors.accent}90`, fontFamily: "var(--font-cinzel)" }}>Aurelius</span>
      </div>
      <div>
        <h4 className="text-[12px] font-bold" style={{ color: `${t.colors.text}${isDark ? "E0" : ""}`, fontFamily: "var(--font-playfair)" }}>Aman Gupta</h4>
        <p className="mt-0.5 text-[6px] uppercase tracking-[0.15em]" style={{ color: `${t.colors.accent}70`, fontFamily: "var(--font-montserrat)" }}>Director</p>
        <div className="mt-2 h-px w-full" style={{ background: `linear-gradient(to right, ${t.colors.accent}15, transparent)` }} />
        <p className="mt-1.5 text-[5px]" style={{ color: `${t.colors.text}50` }}>aman@aurelius.co</p>
      </div>
    </div>
  );
}

function AnimatedPreview({ t }: { t: Template }) {
  return (
    <div className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-b ${t.colors.bg} p-5 text-center`}>
      {/* Motion lines */}
      <svg viewBox="0 0 100 30" className="mb-2 w-[70%] opacity-30" fill="none">
        <path d="M0 15 Q25 5 50 15 Q75 25 100 15" stroke={t.colors.accent} strokeWidth="0.8" />
        <path d="M0 20 Q25 10 50 20 Q75 30 100 20" stroke={t.colors.accent} strokeWidth="0.5" strokeOpacity="0.5" />
      </svg>
      {/* Play hint */}
      <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ border: `1.5px solid ${t.colors.accent}40`, background: `${t.colors.accent}10` }}>
        <svg viewBox="0 0 16 16" className="ml-0.5 h-3 w-3" fill={t.colors.accent} fillOpacity="0.7"><path d="M4 2 L14 8 L4 14Z" /></svg>
      </div>
      <h4 className="mt-2 text-[11px] font-bold" style={{ color: t.colors.text, fontFamily: "var(--font-playfair)" }}>Cinematic Invite</h4>
      <p className="mt-0.5 text-[6px]" style={{ color: `${t.colors.accent}50`, fontFamily: "var(--font-montserrat)" }}>Music · Parallax · RSVP</p>
    </div>
  );
}

function DashboardPreview({ t }: { t: Template }) {
  return (
    <div className={`flex h-full w-full flex-col bg-gradient-to-b ${t.colors.bg} p-4`}>
      <div className="flex items-center gap-1.5">
        <div className="h-1.5 w-1.5 rounded-full" style={{ background: t.colors.accent }} />
        <span className="text-[6px] font-semibold uppercase tracking-[0.12em]" style={{ color: `${t.colors.accent}70`, fontFamily: "var(--font-montserrat)" }}>Analytics</span>
      </div>
      <p className="mt-2 text-[18px] font-bold leading-none" style={{ color: `${t.colors.text}E0`, fontFamily: "var(--font-raleway)" }}>2,847</p>
      <p className="mt-0.5 text-[6px]" style={{ color: `${t.colors.accent}80` }}>↑ 24%</p>
      {/* Mini chart */}
      <svg viewBox="0 0 100 25" className="mt-2 w-full" fill="none">
        <defs>
          <linearGradient id={`cg-${t.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={t.colors.accent} stopOpacity="0.3" />
            <stop offset="100%" stopColor={t.colors.accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 20 Q15 18 25 15 Q40 10 55 12 Q70 8 85 5 Q95 3 100 4 L100 25 L0 25Z" fill={`url(#cg-${t.id})`} />
        <path d="M0 20 Q15 18 25 15 Q40 10 55 12 Q70 8 85 5 Q95 3 100 4" stroke={t.colors.accent} strokeWidth="1" strokeOpacity="0.5" />
      </svg>
      <div className="mt-2 flex gap-1">
        {["QR", "NFC", "Link"].map((s) => (
          <span key={s} className="rounded px-1.5 py-0.5 text-[4.5px] font-medium" style={{ background: `${t.colors.accent}15`, color: `${t.colors.accent}80` }}>{s}</span>
        ))}
      </div>
    </div>
  );
}

function QrPreview({ t }: { t: Template }) {
  return (
    <div className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-b ${t.colors.bg} p-5`}>
      {/* Mini QR */}
      <svg viewBox="0 0 40 40" className="h-10 w-10">
        <rect x="2" y="2" width="10" height="10" rx="1.5" fill={t.colors.accent} fillOpacity="0.7" />
        <rect x="4" y="4" width="6" height="6" rx="0.5" fill={t.colors.bg.includes("EC") ? "#F8F4EE" : "#0A0A0A"} />
        <rect x="5.5" y="5.5" width="3" height="3" rx="0.3" fill={t.colors.accent} fillOpacity="0.7" />
        <rect x="28" y="2" width="10" height="10" rx="1.5" fill={t.colors.accent} fillOpacity="0.7" />
        <rect x="30" y="4" width="6" height="6" rx="0.5" fill={t.colors.bg.includes("EC") ? "#F8F4EE" : "#0A0A0A"} />
        <rect x="31.5" y="5.5" width="3" height="3" rx="0.3" fill={t.colors.accent} fillOpacity="0.7" />
        <rect x="2" y="28" width="10" height="10" rx="1.5" fill={t.colors.accent} fillOpacity="0.7" />
        <rect x="4" y="30" width="6" height="6" rx="0.5" fill={t.colors.bg.includes("EC") ? "#F8F4EE" : "#0A0A0A"} />
        <rect x="5.5" y="31.5" width="3" height="3" rx="0.3" fill={t.colors.accent} fillOpacity="0.7" />
        {/* Data dots */}
        {[[15,3],[18,3],[21,3],[15,6],[21,6],[3,15],[6,15],[3,18],[15,15],[18,15],[21,15],[24,15],[15,18],[21,18],[24,18],[15,21],[18,21],[28,28],[31,28],[34,28],[28,31],[34,31],[28,34]].map(([x,y],i)=>(
          <rect key={i} x={x} y={y} width="2" height="2" rx="0.3" fill={t.colors.accent} fillOpacity="0.5" />
        ))}
        <circle cx="20" cy="20" r="3.5" fill={t.colors.accent} fillOpacity="0.8" />
        <circle cx="20" cy="20" r="1.5" fill={t.colors.bg.includes("EC") ? "#F8F4EE" : "#0A0A0A"} />
      </svg>
      {/* NFC waves */}
      <div className="mt-3 flex flex-col items-center">
        <p className="text-[7px] font-semibold uppercase tracking-[0.25em]" style={{ color: `${t.colors.text}80`, fontFamily: "var(--font-montserrat)" }}>Scan · Tap</p>
      </div>
    </div>
  );
}

function GlobalPreview({ t }: { t: Template }) {
  const isDark = t.colors.bg.includes("16") || t.colors.bg.includes("0E");
  return (
    <div className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-b ${t.colors.bg} p-5 text-center`}>
      {/* Globe hint */}
      <svg viewBox="0 0 40 40" className="mb-2 h-10 w-10" fill="none" stroke={t.colors.accent} strokeWidth="0.8" strokeOpacity="0.5">
        <circle cx="20" cy="20" r="16" />
        <ellipse cx="20" cy="20" rx="8" ry="16" />
        <path d="M4 15 Q20 18 36 15" /><path d="M4 25 Q20 22 36 25" />
      </svg>
      <h4 className="text-[11px] font-bold" style={{ color: `${t.colors.text}${isDark ? "D0" : ""}`, fontFamily: "var(--font-playfair)" }}>{t.name}</h4>
      <p className="mt-0.5 text-[6px]" style={{ color: `${t.colors.accent}60`, fontFamily: "var(--font-montserrat)" }}>CAD · Stripe Payments</p>
    </div>
  );
}

function TemplatePreview({ template }: { template: Template }) {
  switch (template.style) {
    case "wedding": return <WeddingPreview t={template} />;
    case "business": return <BusinessPreview t={template} />;
    case "animated": return <AnimatedPreview t={template} />;
    case "dashboard": return <DashboardPreview t={template} />;
    case "qr": return <QrPreview t={template} />;
    case "global": return <GlobalPreview t={template} />;
  }
}

/* ================================================================== */
/*  Template card                                                     */
/* ================================================================== */

function TemplateCard({ template, index }: { template: Template; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/templates/${template.id}`} className="group block">
        <div className="overflow-hidden rounded-xl border border-[#E8E4DE]/60 bg-card shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.10)] dark:border-white/8 dark:shadow-[0_2px_12px_rgba(0,0,0,0.2)] dark:group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
          {/* Preview */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <TemplatePreview template={template} />
            {/* Category tag */}
            <span className="absolute top-2 left-2 rounded-full bg-black/40 px-2 py-0.5 text-[9px] font-medium text-white/90 backdrop-blur-sm">
              {template.category.split(" ")[0]}
            </span>
          </div>
          {/* Info */}
          <div className="flex items-center justify-between p-3.5">
            <div>
              <h3 className="text-[13px] font-semibold text-foreground" style={{ fontFamily: "var(--font-playfair)" }}>
                {template.name}
              </h3>
              <p className="mt-0.5 text-[10px] text-muted-foreground">
                {template.category}
              </p>
            </div>
            <div className="text-right">
              <span
                className="text-[13px] font-bold text-[#D4AF37]"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {template.price}
              </span>
              {template.priceNote && (
                <p className="text-[8px] text-muted-foreground">{template.priceNote}</p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ================================================================== */
/*  Main section                                                      */
/* ================================================================== */

const CARDS_PER_ROW = 4;

export function TemplateBrowseSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleRows, setVisibleRows] = useState(1);

  const filtered = activeCategory === "All"
    ? TEMPLATES
    : TEMPLATES.filter((t) => t.category === activeCategory);

  const visibleCount = visibleRows * CARDS_PER_ROW;
  const visible = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  function handleCategoryChange(cat: string) {
    setActiveCategory(cat);
    setVisibleRows(1); // reset to first row on tab change
  }

  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-4 inline-block rounded-full bg-[#D4AF37]/10 px-4 py-1 text-sm font-medium text-[#D4AF37]"
          >
            Templates
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-3xl font-bold md:text-5xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Explore Templates
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mx-auto mt-4 max-w-xl text-muted-foreground"
          >
            Browse our collection of professionally crafted templates.
            From wedding invitations to business cards — find the perfect design.
          </motion.p>
        </div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#1A1A1A] text-white shadow-sm dark:bg-[#D4AF37] dark:text-[#1A1A1A]"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Template grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {visible.map((template, i) => (
              <TemplateCard key={template.id} template={template} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* See more button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 flex justify-center"
          >
            <button
              onClick={() => setVisibleRows((r) => r + 1)}
              className="rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/[0.06] px-8 py-2.5 text-sm font-medium text-[#1A1A1A] transition-all hover:bg-[#D4AF37]/[0.12] hover:shadow-sm dark:text-[#F0E8D8]"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              See More Templates
            </button>
          </motion.div>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="py-16 text-center text-muted-foreground">
            No templates in this category yet.
          </div>
        )}
      </div>
    </section>
  );
}
