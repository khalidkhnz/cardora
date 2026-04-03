"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, QrCode, Wifi, Share2, BarChart3, Palette, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { platform } from "@/lib/platform";

/* ================================================================== */
/*  CSS                                                               */
/* ================================================================== */

const CSS = `
@keyframes noir-float {
  0%, 100% { transform: translateY(0) rotate(var(--r, 3deg)); }
  50% { transform: translateY(-8px) rotate(var(--r, 3deg)); }
}
@keyframes noir-shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
.noir-shimmer {
  background: linear-gradient(90deg, #C6A85A 0%, #E8D088 30%, #C6A85A 50%, #E8D088 70%, #C6A85A 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: noir-shimmer 4s linear infinite;
}
`;

/* ================================================================== */
/*  Helpers                                                           */
/* ================================================================== */

function GoldLine() {
  return <div className="mx-auto h-px w-16 bg-gradient-to-r from-transparent via-[#C6A85A]/20 to-transparent" />;
}

function Watermark() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[95] overflow-hidden">
      <span className="absolute top-[25%] right-[6%] -rotate-[25deg] text-xl font-semibold tracking-[0.5em] text-[#C6A85A]/[0.02] select-none" style={{ fontFamily: "var(--font-cinzel)" }}>{platform.name}</span>
      <span className="absolute bottom-[30%] left-[8%] -rotate-[25deg] text-xl font-semibold tracking-[0.5em] text-[#C6A85A]/[0.02] select-none" style={{ fontFamily: "var(--font-cinzel)" }}>{platform.name}</span>
    </div>
  );
}

/* ================================================================== */
/*  Main experience                                                   */
/* ================================================================== */

export function NoirAtelierExperience() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="relative min-h-screen overflow-x-hidden bg-[#14161C]">
        <Watermark />

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  HERO — floating cards                                     */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E2028] via-[#1A1C24] to-[#14161C]" />
          {/* Glow */}
          <div className="absolute top-[20%] left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#C6A85A]/[0.04] blur-[80px]" />
          {/* Diagonal texture */}
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "repeating-linear-gradient(135deg,transparent,transparent 4px,rgba(255,255,255,0.3) 4px,rgba(255,255,255,0.3) 5px)" }} />

          {/* Floating cards */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} style={{ opacity: heroOpacity }} className="relative">
            {/* Back card */}
            <div className="absolute -top-4 -left-6 h-40 w-64 rounded-xl border border-[#C6A85A]/10 bg-[#252830] shadow-[0_20px_60px_rgba(0,0,0,0.3)]" style={{ transform: "rotate(-6deg)", animation: "noir-float 7s ease-in-out 0.5s infinite", ["--r" as string]: "-6deg" }}>
              <div className="h-[3px] rounded-t-xl bg-gradient-to-r from-[#C6A85A]/30 via-[#C6A85A]/15 to-transparent" />
              <div className="p-5">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#C6A85A]/15 bg-[#C6A85A]/[0.06]">
                    <span className="text-[10px] font-bold text-[#C6A85A]/50" style={{ fontFamily: "serif" }}>N</span>
                  </div>
                  <span className="text-[7px] uppercase tracking-[0.15em] text-[#C6A85A]/35" style={{ fontFamily: "var(--font-cinzel)" }}>Regent Motors</span>
                </div>
              </div>
            </div>

            {/* Front card */}
            <div className="relative h-44 w-72 rounded-xl border border-[#C6A85A]/15 bg-[#22252E] shadow-[0_30px_80px_rgba(0,0,0,0.4)]" style={{ transform: "rotate(3deg)", animation: "noir-float 6s ease-in-out infinite", ["--r" as string]: "3deg" }}>
              <div className="h-[3px] rounded-t-xl bg-gradient-to-r from-transparent via-[#C6A85A]/40 to-transparent" />
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#C6A85A]/18 bg-[#C6A85A]/[0.08]">
                    <span className="text-sm font-bold text-[#C6A85A]/60" style={{ fontFamily: "serif" }}>N</span>
                  </div>
                  <div>
                    <p className="text-[8px] uppercase tracking-[0.2em] text-[#C6A85A]/50" style={{ fontFamily: "var(--font-cinzel)" }}>Regent Motors</p>
                    <div className="mt-0.5 h-px w-10 bg-gradient-to-r from-[#C6A85A]/20 to-transparent" />
                  </div>
                </div>
                <div className="mt-5">
                  <p className="text-lg font-bold text-[#E8E4DC]/80" style={{ fontFamily: "var(--font-playfair)" }}>Aman Gupta</p>
                  <p className="mt-0.5 text-[8px] uppercase tracking-[0.18em] text-[#C6A85A]/45" style={{ fontFamily: "var(--font-montserrat)" }}>Managing Director</p>
                </div>
                <div className="mt-4 h-px bg-gradient-to-r from-[#C6A85A]/12 to-transparent" />
                <div className="mt-2 flex justify-between">
                  <p className="text-[7px] text-[#E8E4DC]/25">aman@aurelius.co</p>
                  <div className="flex h-6 w-6 items-center justify-center rounded border border-[#C6A85A]/10 bg-[#C6A85A]/[0.04]">
                    <QrCode className="h-3 w-3 text-[#C6A85A]/30" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Vintage car silhouette */}
          <motion.div className="relative z-10 mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }} style={{ opacity: heroOpacity }}>
            <svg viewBox="0 0 280 80" className="mx-auto w-[240px] md:w-[300px]" fill="none">
              <path d="M30 60 L30 42 Q30 30 55 28 L85 26 Q100 16 118 12 L200 12 Q225 16 235 26 L255 32 Q268 36 268 45 L268 60" fill="#C6A85A" fillOpacity="0.05" stroke="#C6A85A" strokeWidth="0.6" strokeOpacity="0.15" />
              <path d="M105 26 L120 8 L190 8 L210 26" fill="#1E2028" fillOpacity="0.5" stroke="#C6A85A" strokeWidth="0.3" strokeOpacity="0.10" />
              <circle cx="75" cy="62" r="12" fill="#1E2028" stroke="#C6A85A" strokeWidth="0.5" strokeOpacity="0.18" />
              <circle cx="75" cy="62" r="6" fill="#C6A85A" fillOpacity="0.05" stroke="#C6A85A" strokeWidth="0.3" strokeOpacity="0.10" />
              <circle cx="220" cy="62" r="12" fill="#1E2028" stroke="#C6A85A" strokeWidth="0.5" strokeOpacity="0.18" />
              <circle cx="220" cy="62" r="6" fill="#C6A85A" fillOpacity="0.05" stroke="#C6A85A" strokeWidth="0.3" strokeOpacity="0.10" />
              <circle cx="42" cy="38" r="2" fill="#C6A85A" fillOpacity="0.20" />
              <circle cx="35" cy="45" r="4" fill="#C6A85A" fillOpacity="0.06" />
              <line x1="45" y1="42" x2="258" y2="42" stroke="#C6A85A" strokeWidth="0.3" strokeOpacity="0.08" />
            </svg>
          </motion.div>

          {/* Hero text */}
          <motion.div className="relative z-10 mt-6 text-center" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} style={{ opacity: heroOpacity }}>
            <p className="text-[9px] uppercase tracking-[0.5em] text-[#C6A85A]/40" style={{ fontFamily: "var(--font-montserrat)" }}>Luxury Automotive Identity</p>
            <h1 className="noir-shimmer mt-3 inline-block text-4xl md:text-5xl" style={{ fontFamily: "var(--font-playfair)" }}>Noir Atelier</h1>
            <p className="mt-3 text-sm text-[#E8E4DC]/30" style={{ fontFamily: "var(--font-cormorant)" }}>Where elegance meets the open road.</p>
          </motion.div>

          {/* Scroll */}
          <motion.div className="absolute bottom-6" animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <div className="h-5 w-px bg-gradient-to-b from-[#C6A85A]/15 to-transparent" />
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  FEATURES                                                  */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="relative px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <div className="mb-14 text-center">
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#C6A85A]/35" style={{ fontFamily: "var(--font-montserrat)" }}>Features</p>
              <GoldLine />
              <h2 className="mt-3 text-2xl text-[#E8E4DC]/70 md:text-3xl" style={{ fontFamily: "var(--font-playfair)" }}>Built for Impact</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: QrCode, title: "QR Code", desc: "Scannable code embedded in your card design" },
                { icon: Wifi, title: "NFC Tap", desc: "One tap to share — no app needed" },
                { icon: Share2, title: "Link Sharing", desc: "Custom profile URL for digital networking" },
                { icon: BarChart3, title: "Analytics", desc: "Track views, scans, and engagement" },
                { icon: Palette, title: "Custom Branding", desc: "Your colors, your logo, your identity" },
                { icon: Smartphone, title: "Mobile First", desc: "Looks perfect on every screen" },
              ].map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-xl border border-[#C6A85A]/8 bg-[#1A1C22] p-5"
                >
                  <feat.icon className="mb-3 h-5 w-5 text-[#C6A85A]/40" />
                  <h3 className="text-sm font-semibold text-[#E8E4DC]/60" style={{ fontFamily: "var(--font-montserrat)" }}>{feat.title}</h3>
                  <p className="mt-1 text-xs text-[#E8E4DC]/25" style={{ fontFamily: "var(--font-cormorant)" }}>{feat.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  USE CASES                                                 */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <motion.section className="px-6 py-24" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="mx-auto max-w-3xl">
            <div className="mb-14 text-center">
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#C6A85A]/35" style={{ fontFamily: "var(--font-montserrat)" }}>Perfect For</p>
              <GoldLine />
              <h2 className="mt-3 text-2xl text-[#E8E4DC]/70 md:text-3xl" style={{ fontFamily: "var(--font-playfair)" }}>Who It&apos;s For</h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { title: "Entrepreneurs", desc: "First impressions that close deals" },
                { title: "Executives", desc: "Authority in every interaction" },
                { title: "Agencies", desc: "Team cards that match your brand" },
              ].map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} className="text-center">
                  <div className="mx-auto mb-3 h-px w-full bg-gradient-to-r from-transparent via-[#C6A85A]/10 to-transparent" />
                  <h3 className="text-base font-semibold text-[#E8E4DC]/55" style={{ fontFamily: "var(--font-playfair)" }}>{item.title}</h3>
                  <p className="mt-1 text-xs text-[#E8E4DC]/25" style={{ fontFamily: "var(--font-cormorant)" }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  CTA                                                       */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <motion.section className="px-6 py-24" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="mx-auto max-w-md text-center">
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#C6A85A]/35" style={{ fontFamily: "var(--font-montserrat)" }}>Ready?</p>
            <GoldLine />
            <h2 className="mt-3 text-2xl text-[#E8E4DC]/65 md:text-3xl" style={{ fontFamily: "var(--font-playfair)" }}>Create Your Card</h2>
            <p className="mt-4 text-sm text-[#E8E4DC]/25" style={{ fontFamily: "var(--font-cormorant)" }}>
              Join professionals who make every introduction count.
            </p>
            <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-8">
              <Button size="lg" className="gap-2 bg-[#C6A85A] px-10 text-base text-[#14161C] hover:bg-[#B89848]">
                Get Started
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  FOOTER                                                    */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="border-t border-[#C6A85A]/6 px-6 py-10">
          <div className="mx-auto max-w-md text-center">
            <p className="noir-shimmer inline-block text-lg" style={{ fontFamily: "var(--font-playfair)" }}>Noir Atelier</p>
            <p className="mt-1 text-[9px] text-[#C6A85A]/25" style={{ fontFamily: "var(--font-montserrat)" }}>Premium Business Identity by {platform.name}</p>
          </div>
        </section>

        {/* Back */}
        <Link href="/templates/noir-atelier" className="fixed top-5 left-5 z-[101] flex items-center gap-1.5 rounded-full border border-[#C6A85A]/10 bg-[#1A1C24]/70 px-4 py-2 text-xs font-medium text-[#E8E4DC]/50 backdrop-blur-md transition-all hover:bg-[#1A1C24] hover:text-[#E8E4DC]/80">
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </Link>
      </div>
    </>
  );
}
