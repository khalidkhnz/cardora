"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/* ================================================================== */
/*  Template data                                                     */
/* ================================================================== */

interface Template {
  id: string;
  name: string;
  category: string;
  price: string;
  priceNote?: string;
  colors: { bg: string; accent: string; text: string };
  style: "wedding" | "business" | "animated" | "dashboard" | "qr" | "global";
}

const CATEGORIES = [
  "All",
  "Wedding Invitations",
  "Business Cards",
  "Animated Invites",
  "Analytics Dashboard",
  "QR & NFC Sharing",
  "Multi-Country Support",
];

const TEMPLATES: Template[] = [
  // Wedding Invitations
  {
    id: "w1",
    name: "Royal Palace",
    category: "Wedding Invitations",
    price: "₹2,999",
    colors: { bg: "from-[#1A0E12] to-[#2A1420]", accent: "#D4AF37", text: "#F0E8D8" },
    style: "wedding",
  },
  {
    id: "w2",
    name: "Garden Romance",
    category: "Wedding Invitations",
    price: "₹1,999",
    colors: { bg: "from-[#0C1A18] to-[#142A25]", accent: "#7CB68A", text: "#E0EDE4" },
    style: "wedding",
  },
  {
    id: "w3",
    name: "Ivory Elegance",
    category: "Wedding Invitations",
    price: "₹2,499",
    colors: { bg: "from-[#E8DCC8] to-[#DDD0BC]", accent: "#8B6B4A", text: "#2A1810" },
    style: "wedding",
  },
  // Business Cards
  {
    id: "b1",
    name: "Executive Dark",
    category: "Business Cards",
    price: "₹999",
    colors: { bg: "from-[#1A1A1A] to-[#0F0F10]", accent: "#C6A85A", text: "#E8E4DC" },
    style: "business",
  },
  {
    id: "b2",
    name: "Minimal Ivory",
    category: "Business Cards",
    price: "₹799",
    colors: { bg: "from-[#EDE4D4] to-[#DDD0BC]", accent: "#3A2A1A", text: "#1A1A1A" },
    style: "business",
  },
  // Animated Invites
  {
    id: "a1",
    name: "Cinematic Gold",
    category: "Animated Invites",
    price: "₹4,999",
    priceNote: "one-time",
    colors: { bg: "from-[#1A0E1E] to-[#0F0620]", accent: "#D4AF37", text: "#F0E8D8" },
    style: "animated",
  },
  {
    id: "a2",
    name: "Sunset Parallax",
    category: "Animated Invites",
    price: "₹3,999",
    priceNote: "one-time",
    colors: { bg: "from-[#2A1005] to-[#1A0A02]", accent: "#FF8C6A", text: "#FFE0C8" },
    style: "animated",
  },
  // Analytics Dashboard
  {
    id: "d1",
    name: "Insights Pro",
    category: "Analytics Dashboard",
    price: "₹1,499",
    colors: { bg: "from-[#0D1A12] to-[#071210]", accent: "#34D399", text: "#C5E8D0" },
    style: "dashboard",
  },
  // QR & NFC
  {
    id: "q1",
    name: "Smart Card",
    category: "QR & NFC Sharing",
    price: "₹1,299",
    colors: { bg: "from-[#ECE6DC] to-[#DDD4C6]", accent: "#3A2A1A", text: "#1A1A1A" },
    style: "qr",
  },
  {
    id: "q2",
    name: "NFC Tap Pro",
    category: "QR & NFC Sharing",
    price: "₹1,999",
    colors: { bg: "from-[#1A1C20] to-[#101214]", accent: "#60A0D0", text: "#D0E0F0" },
    style: "qr",
  },
  // Multi-Country
  {
    id: "m1",
    name: "Canada Edition",
    category: "Multi-Country Support",
    price: "₹1,499",
    colors: { bg: "from-[#E8DCC8] to-[#DDD0BC]", accent: "#B03030", text: "#2A1810" },
    style: "global",
  },
  {
    id: "m2",
    name: "Global Connect",
    category: "Multi-Country Support",
    price: "₹2,499",
    colors: { bg: "from-[#162030] to-[#0E1620]", accent: "#4A90D0", text: "#D0E0F0" },
    style: "global",
  },
];

/* ================================================================== */
/*  Template card preview renderers                                   */
/* ================================================================== */

function WeddingPreview({ t }: { t: Template }) {
  return (
    <div className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-b ${t.colors.bg} p-5 text-center`}>
      <p className="text-[6px] font-medium uppercase tracking-[0.3em]" style={{ color: `${t.colors.accent}80`, fontFamily: "var(--font-cinzel)" }}>
        You are invited
      </p>
      <div className="my-2 h-px w-12 bg-gradient-to-r from-transparent" style={{ borderColor: t.colors.accent, background: `linear-gradient(to right, transparent, ${t.colors.accent}40, transparent)` }} />
      {/* Couple silhouette */}
      <svg viewBox="0 0 60 55" className="my-1 h-10 w-auto" fill="none">
        <circle cx="22" cy="12" r="6" fill={t.colors.accent} fillOpacity="0.25" />
        <path d="M14 50 L16 26 Q16 18 22 18 Q28 18 28 26 L30 50" fill={t.colors.accent} fillOpacity="0.15" />
        <circle cx="38" cy="12" r="6" fill={t.colors.accent} fillOpacity="0.25" />
        <path d="M28 50 L31 24 Q31 18 38 18 Q45 18 45 24 L50 50 Q38 44 28 50Z" fill={t.colors.accent} fillOpacity="0.15" />
      </svg>
      <h4 className="text-[14px] leading-tight" style={{ color: t.colors.text, fontFamily: "var(--font-great-vibes)" }}>
        Aarav & Priya
      </h4>
      <p className="mt-1 text-[6px]" style={{ color: `${t.colors.accent}60`, fontFamily: "var(--font-montserrat)" }}>
        June 15, 2026
      </p>
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
      <Link href="/signup" className="group block">
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
