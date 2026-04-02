"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Sparkles, Share2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Template } from "@/lib/template-data";
import { APP_NAME } from "@/lib/constants";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Footer } from "@/components/landing/footer";

/* ================================================================== */
/*  Template preview (reused visual from showcase)                    */
/* ================================================================== */

function LargePreview({ template: t }: { template: Template }) {
  if (t.style === "wedding") {
    return (
      <div className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-b ${t.colors.bg} p-10 text-center`}>
        <p className="text-[9px] font-medium uppercase tracking-[0.3em]" style={{ color: `${t.colors.accent}80`, fontFamily: "var(--font-cinzel)" }}>You are invited</p>
        <div className="my-3 h-px w-20" style={{ background: `linear-gradient(to right, transparent, ${t.colors.accent}40, transparent)` }} />
        <svg viewBox="0 0 80 70" className="my-2 h-16 w-auto" fill="none">
          <circle cx="30" cy="15" r="8" fill={t.colors.accent} fillOpacity="0.25" />
          <path d="M18 65 L22 32 Q22 22 30 22 Q38 22 38 32 L42 65" fill={t.colors.accent} fillOpacity="0.15" />
          <circle cx="50" cy="15" r="8" fill={t.colors.accent} fillOpacity="0.25" />
          <path d="M38 65 L42 30 Q42 22 50 22 Q58 22 58 30 L65 65 Q50 58 38 65Z" fill={t.colors.accent} fillOpacity="0.15" />
        </svg>
        <h3 className="text-[24px] leading-tight" style={{ color: t.colors.text, fontFamily: "var(--font-great-vibes)" }}>Aarav & Priya</h3>
        <div className="my-2 flex items-center gap-2">
          <div className="h-px w-10" style={{ background: `${t.colors.accent}30` }} />
          <span className="text-[8px]" style={{ color: `${t.colors.accent}50` }}>✦</span>
          <div className="h-px w-10" style={{ background: `${t.colors.accent}30` }} />
        </div>
        <p className="text-[10px]" style={{ color: `${t.colors.accent}60`, fontFamily: "var(--font-cormorant)" }}>June 15, 2026 · Six in the Evening</p>
        <p className="mt-2 text-[8px] uppercase tracking-[0.15em]" style={{ color: `${t.colors.accent}40`, fontFamily: "var(--font-montserrat)" }}>The Rosewater Estate · Toronto</p>
      </div>
    );
  }
  if (t.style === "business") {
    const isDark = t.colors.bg.includes("1A1A1A") || t.colors.bg.includes("0F0F");
    return (
      <div className={`flex h-full w-full flex-col justify-between bg-gradient-to-b ${t.colors.bg} p-8`}>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: `${t.colors.accent}18`, border: `1px solid ${t.colors.accent}25` }}>
            <span className="text-[12px] font-bold" style={{ color: t.colors.accent, fontFamily: "var(--font-cinzel)" }}>A</span>
          </div>
          <span className="text-[9px] font-semibold uppercase tracking-[0.15em]" style={{ color: `${t.colors.accent}90`, fontFamily: "var(--font-cinzel)" }}>Aurelius & Co.</span>
        </div>
        <div>
          <h3 className="text-[18px] font-bold" style={{ color: `${t.colors.text}${isDark ? "E0" : ""}`, fontFamily: "var(--font-playfair)" }}>Aman Gupta</h3>
          <p className="mt-1 text-[8px] uppercase tracking-[0.15em]" style={{ color: `${t.colors.accent}70`, fontFamily: "var(--font-montserrat)" }}>Managing Director</p>
          <div className="mt-4 h-px w-full" style={{ background: `linear-gradient(to right, ${t.colors.accent}15, transparent)` }} />
          <p className="mt-2 text-[7px]" style={{ color: `${t.colors.text}50` }}>aman@aurelius.co · aurelius.co</p>
        </div>
      </div>
    );
  }
  if (t.style === "animated") {
    return (
      <div className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-b ${t.colors.bg} p-8 text-center`}>
        <svg viewBox="0 0 120 30" className="mb-3 w-[60%] opacity-30" fill="none">
          <path d="M0 15 Q30 5 60 15 Q90 25 120 15" stroke={t.colors.accent} strokeWidth="1" />
          <path d="M0 20 Q30 10 60 20 Q90 30 120 20" stroke={t.colors.accent} strokeWidth="0.6" strokeOpacity="0.5" />
        </svg>
        <div className="flex h-14 w-14 items-center justify-center rounded-full" style={{ border: `2px solid ${t.colors.accent}40`, background: `${t.colors.accent}10` }}>
          <svg viewBox="0 0 16 16" className="ml-0.5 h-5 w-5" fill={t.colors.accent} fillOpacity="0.7"><path d="M4 2 L14 8 L4 14Z" /></svg>
        </div>
        <h3 className="mt-3 text-[16px] font-bold" style={{ color: t.colors.text, fontFamily: "var(--font-playfair)" }}>Cinematic Invite</h3>
        <p className="mt-1 text-[9px]" style={{ color: `${t.colors.accent}50`, fontFamily: "var(--font-montserrat)" }}>Music · Parallax · RSVP</p>
      </div>
    );
  }
  if (t.style === "dashboard") {
    return (
      <div className={`flex h-full w-full flex-col bg-gradient-to-b ${t.colors.bg} p-6`}>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full" style={{ background: t.colors.accent }} />
          <span className="text-[8px] font-semibold uppercase tracking-[0.12em]" style={{ color: `${t.colors.accent}70`, fontFamily: "var(--font-montserrat)" }}>Analytics</span>
        </div>
        <p className="mt-3 text-[28px] font-bold leading-none" style={{ color: `${t.colors.text}E0`, fontFamily: "var(--font-raleway)" }}>2,847</p>
        <p className="mt-1 text-[9px]" style={{ color: `${t.colors.accent}80` }}>↑ 24% this week</p>
        <svg viewBox="0 0 120 30" className="mt-3 w-full" fill="none">
          <path d="M0 22 Q20 18 40 15 Q60 10 80 12 Q100 5 120 8 L120 30 L0 30Z" fill={t.colors.accent} fillOpacity="0.15" />
          <path d="M0 22 Q20 18 40 15 Q60 10 80 12 Q100 5 120 8" stroke={t.colors.accent} strokeWidth="1.5" strokeOpacity="0.4" />
        </svg>
      </div>
    );
  }
  // qr / global fallback
  return (
    <div className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-b ${t.colors.bg} p-8 text-center`}>
      <svg viewBox="0 0 50 50" className="h-14 w-14" fill="none">
        <rect x="3" y="3" width="14" height="14" rx="2" fill={t.colors.accent} fillOpacity="0.6" />
        <rect x="5" y="5" width="10" height="10" rx="1" fill={t.colors.bg.includes("EC") ? "#F8F4EE" : "#0A0A0A"} />
        <rect x="7" y="7" width="6" height="6" rx="0.5" fill={t.colors.accent} fillOpacity="0.6" />
        <rect x="33" y="3" width="14" height="14" rx="2" fill={t.colors.accent} fillOpacity="0.6" />
        <rect x="35" y="5" width="10" height="10" rx="1" fill={t.colors.bg.includes("EC") ? "#F8F4EE" : "#0A0A0A"} />
        <rect x="37" y="7" width="6" height="6" rx="0.5" fill={t.colors.accent} fillOpacity="0.6" />
        <rect x="3" y="33" width="14" height="14" rx="2" fill={t.colors.accent} fillOpacity="0.6" />
        <rect x="5" y="35" width="10" height="10" rx="1" fill={t.colors.bg.includes("EC") ? "#F8F4EE" : "#0A0A0A"} />
        <rect x="7" y="37" width="6" height="6" rx="0.5" fill={t.colors.accent} fillOpacity="0.6" />
        <circle cx="25" cy="25" r="5" fill={t.colors.accent} fillOpacity="0.7" />
      </svg>
      <h3 className="mt-3 text-[14px] font-bold" style={{ color: `${t.colors.text}D0`, fontFamily: "var(--font-playfair)" }}>{t.name}</h3>
      <p className="mt-1 text-[8px]" style={{ color: `${t.colors.accent}60`, fontFamily: "var(--font-montserrat)" }}>Smart Sharing</p>
    </div>
  );
}

/* ================================================================== */
/*  Main detail page                                                  */
/* ================================================================== */

export function TemplateDetailContent({ template }: { template: Template }) {
  return (
    <main className="flex min-h-screen flex-col">
      {/* ── Navbar ── */}
      <header className="fixed top-0 right-0 left-0 z-50 border-b border-[#E8E4DE]/60 bg-[#FAF8F5]/80 backdrop-blur-xl dark:border-white/10 dark:bg-[#141414]/80">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-0.5">
            <Image src="/cardora-logo.png" alt="Cardora" width={30} height={30} className="h-7 w-7 object-contain mix-blend-multiply dark:hidden" />
            <Image src="/cardora-logo.png" alt="Cardora" width={30} height={30} className="hidden h-7 w-7 object-contain drop-shadow-[0_0_1px_rgba(255,255,255,0.8)] [filter:drop-shadow(0_0_2px_rgba(255,255,255,0.4))_drop-shadow(0_0_1px_rgba(255,255,255,0.6))] dark:block" />
            <span className="text-xl font-bold tracking-wide text-[#1A1A1A] dark:text-[#F0E8D8]" style={{ fontFamily: "var(--font-playfair)" }}>{APP_NAME}</span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/#templates" className="rounded-md px-3 py-1.5 text-sm font-medium text-[#1A1A1A] transition-colors hover:bg-[#F3F0EB] dark:text-[#F5ECD7] dark:hover:bg-white/10">
              All Templates
            </Link>
          </div>
        </nav>
      </header>

      {/* ── Hero section ── */}
      <section className="mx-auto w-full max-w-6xl px-6 pt-28 pb-16">
        {/* Back link */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <Link href="/#templates" className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Templates
          </Link>
        </motion.div>

        <div className="mt-6 grid items-start gap-12 lg:grid-cols-2">
          {/* Left — large preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="overflow-hidden rounded-2xl border border-[#E8E4DE]/50 shadow-[0_12px_50px_rgba(0,0,0,0.10)] dark:border-white/8 dark:shadow-[0_12px_50px_rgba(0,0,0,0.3)]">
              <div className="aspect-[3/4]">
                <LargePreview template={template} />
              </div>
            </div>
          </motion.div>

          {/* Right — details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col"
          >
            {/* Tags */}
            <div className="mb-4 flex flex-wrap gap-2">
              {template.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#D4AF37]/10 px-3 py-0.5 text-[11px] font-medium text-[#D4AF37]"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Name */}
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl" style={{ fontFamily: "var(--font-playfair)" }}>
              {template.name}
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground" style={{ fontFamily: "var(--font-cormorant)" }}>
              {template.description}
            </p>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#D4AF37]" style={{ fontFamily: "var(--font-montserrat)" }}>
                {template.price}
              </span>
              {template.priceNote && (
                <span className="text-sm text-muted-foreground">/ {template.priceNote}</span>
              )}
            </div>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-[#D4AF37] to-[#C6A85A] text-base text-white hover:from-[#C09A2F] hover:to-[#B89848]"
              >
                <Eye className="h-4 w-4" />
                Preview Template
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-[#D4AF37]/25 text-base hover:bg-[#D4AF37]/8 dark:border-[#D4AF37]/30 dark:text-[#F0E8D8] dark:hover:bg-[#D4AF37]/15"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>

            {/* Divider */}
            <div className="my-8 h-px bg-border" />

            {/* Quick features */}
            <div className="grid grid-cols-2 gap-3">
              {template.features.slice(0, 4).map((feat) => (
                <div key={feat} className="flex items-center gap-2">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/10">
                    <Check className="h-3 w-3 text-[#D4AF37]" />
                  </div>
                  <span className="text-sm text-muted-foreground">{feat}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="border-t bg-muted/20 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <span className="mb-3 inline-block rounded-full bg-[#D4AF37]/10 px-4 py-1 text-sm font-medium text-[#D4AF37]">
              What&apos;s Included
            </span>
            <h2 className="text-2xl font-bold md:text-3xl" style={{ fontFamily: "var(--font-playfair)" }}>
              Everything you need
            </h2>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {template.includes.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-start gap-3 rounded-xl border bg-card p-5 shadow-sm"
              >
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/10">
                  <Check className="h-3.5 w-3.5 text-[#D4AF37]" />
                </div>
                <span className="text-sm leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <span className="mb-3 inline-block rounded-full bg-[#D4AF37]/10 px-4 py-1 text-sm font-medium text-[#D4AF37]">
              Features
            </span>
            <h2 className="text-2xl font-bold md:text-3xl" style={{ fontFamily: "var(--font-playfair)" }}>
              Crafted with care
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Sparkles, title: "Premium Design", desc: "Every pixel is intentionally placed for a premium, luxurious feel." },
              { icon: Eye, title: "Live Preview", desc: "See exactly how your invitation will look before you publish." },
              { icon: Share2, title: "Easy Sharing", desc: "Share instantly via QR code, NFC tap, or a direct link." },
            ].map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-xl border bg-card p-6 shadow-sm"
              >
                <div className="mb-4 inline-flex rounded-xl bg-[#D4AF37]/10 p-3">
                  <feat.icon className="h-5 w-5 text-[#D4AF37]" />
                </div>
                <h3 className="mb-2 text-base font-semibold">{feat.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold md:text-3xl" style={{ fontFamily: "var(--font-playfair)" }}>
            Ready to create your {template.style === "wedding" || template.style === "animated" ? "invitation" : "card"}?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Get started with {template.name} today.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button
              size="lg"
              className="gap-2 bg-gradient-to-r from-[#D4AF37] to-[#C6A85A] text-base text-white hover:from-[#C09A2F] hover:to-[#B89848]"
            >
              Preview Template
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
