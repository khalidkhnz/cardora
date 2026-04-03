"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, QrCode, Wifi, Share2, BarChart3, Camera, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { platform } from "@/lib/platform";

const CSS = `
@keyframes mb-float {
  0%, 100% { transform: translateY(0) rotate(var(--r, 2deg)); }
  50% { transform: translateY(-6px) rotate(var(--r, 2deg)); }
}
`;

function GLine() {
  return <div className="mx-auto h-px w-14 bg-gradient-to-r from-transparent via-[#2A2828]/10 to-transparent" />;
}

export function MaisonBlancheExperience() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="relative min-h-screen overflow-x-hidden bg-[#E8E5E0]">
        {/* Watermark */}
        <div className="pointer-events-none fixed inset-0 z-[95] overflow-hidden">
          <span className="absolute top-[25%] right-[5%] -rotate-[25deg] text-xl font-semibold tracking-[0.5em] text-[#2A2828]/[0.02] select-none" style={{ fontFamily: "var(--font-cinzel)" }}>{platform.name}</span>
          <span className="absolute bottom-[30%] left-[8%] -rotate-[25deg] text-xl font-semibold tracking-[0.5em] text-[#2A2828]/[0.02] select-none" style={{ fontFamily: "var(--font-cinzel)" }}>{platform.name}</span>
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  HERO                                                      */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
          <div className="absolute inset-0 bg-gradient-to-b from-[#E0DDD8] via-[#D8D4D0] to-[#D0CCC8]" />
          {/* Studio lights */}
          <div className="absolute top-[10%] right-[15%] h-32 w-32 rounded-full bg-white/20 blur-[40px]" />
          <div className="absolute top-[15%] left-[20%] h-24 w-24 rounded-full bg-white/10 blur-[30px]" />

          {/* Camera background */}
          <svg viewBox="0 0 300 200" className="absolute top-[15%] left-1/2 w-[70%] max-w-[400px] -translate-x-1/2 opacity-[0.04]" fill="#2A2828">
            <rect x="50" y="60" width="200" height="120" rx="16" />
            <rect x="110" y="35" width="80" height="28" rx="6" />
            <circle cx="150" cy="120" r="45" fill="none" stroke="#2A2828" strokeWidth="6" />
            <circle cx="150" cy="120" r="30" />
            <circle cx="150" cy="120" r="16" fill="#D0CCC8" />
            <rect x="210" y="50" width="25" height="14" rx="4" />
          </svg>

          {/* Floating cards */}
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} style={{ opacity: heroOpacity }} className="relative z-10">
            {/* Back card */}
            <div className="absolute -top-3 -left-4 h-36 w-56 rounded-lg border border-[#2A2828]/8 bg-[#F0EEEA] shadow-[0_15px_40px_rgba(0,0,0,0.08)]" style={{ transform: "rotate(-5deg)", animation: "mb-float 7s ease-in-out 0.5s infinite", ["--r" as string]: "-5deg" }}>
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <Camera className="h-4 w-4 text-[#2A2828]/20" />
                  <span className="text-[7px] uppercase tracking-[0.15em] text-[#2A2828]/25" style={{ fontFamily: "var(--font-montserrat)" }}>Maison Blanche</span>
                </div>
              </div>
            </div>

            {/* Front card */}
            <div className="relative h-40 w-64 rounded-lg border border-[#2A2828]/12 bg-[#FAFAF8] shadow-[0_20px_60px_rgba(0,0,0,0.12)]" style={{ transform: "rotate(2deg)", animation: "mb-float 6s ease-in-out infinite", ["--r" as string]: "2deg" }}>
              <div className="absolute top-0 left-0 h-full w-[5px] rounded-l-lg bg-[#2A2828]/60" />
              <div className="p-5 pl-6">
                <p className="text-lg font-bold text-[#1A1818]/80" style={{ fontFamily: "var(--font-playfair)" }}>Elena Rossi</p>
                <p className="mt-0.5 text-[8px] uppercase tracking-[0.2em] text-[#2A2828]/35" style={{ fontFamily: "var(--font-montserrat)" }}>Photographer</p>
                <div className="mt-4 h-px w-16 bg-[#2A2828]/8" />
                <div className="mt-3 space-y-1">
                  <p className="text-[7px] text-[#2A2828]/25">elena@rossi.studio</p>
                  <p className="text-[7px] text-[#2A2828]/20">rossi.studio</p>
                </div>
              </div>
              <div className="absolute right-4 bottom-4">
                <Camera className="h-5 w-5 text-[#2A2828]/10" />
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div className="relative z-10 mt-10 text-center" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} style={{ opacity: heroOpacity }}>
            <p className="text-[9px] uppercase tracking-[0.5em] text-[#2A2828]/30" style={{ fontFamily: "var(--font-montserrat)" }}>Photography Identity</p>
            <GLine />
            <h1 className="mt-3 text-4xl font-bold text-[#1A1818]/80 md:text-5xl" style={{ fontFamily: "var(--font-playfair)" }}>Maison Blanche</h1>
            <p className="mt-3 text-sm text-[#2A2828]/30" style={{ fontFamily: "var(--font-cormorant)" }}>Your art deserves an identity as refined as your lens.</p>
          </motion.div>

          <motion.div className="absolute bottom-6" animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <div className="h-5 w-px bg-gradient-to-b from-[#2A2828]/12 to-transparent" />
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  CARD GALLERY — front + back                               */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <motion.section className="px-6 py-24" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="mx-auto max-w-3xl">
            <div className="mb-14 text-center">
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#2A2828]/30" style={{ fontFamily: "var(--font-montserrat)" }}>Card Design</p>
              <GLine />
              <h2 className="mt-3 text-2xl text-[#1A1818]/70 md:text-3xl" style={{ fontFamily: "var(--font-playfair)" }}>Front & Back</h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Front */}
              <motion.div initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <div className="rounded-xl border border-[#2A2828]/6 bg-[#FAFAF8] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                  <div className="h-1 w-full rounded-t bg-[#2A2828]/50" />
                  <div className="mt-6">
                    <p className="text-xl font-bold text-[#1A1818]/75" style={{ fontFamily: "var(--font-playfair)" }}>Elena Rossi</p>
                    <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-[#2A2828]/30" style={{ fontFamily: "var(--font-montserrat)" }}>Photographer</p>
                    <div className="mt-4 h-px w-20 bg-[#2A2828]/8" />
                    <p className="mt-3 text-xs text-[#2A2828]/25">elena@rossi.studio</p>
                    <p className="mt-1 text-xs text-[#2A2828]/20">+1 (416) 555-0198</p>
                  </div>
                  <div className="mt-4 text-right">
                    <Camera className="ml-auto h-5 w-5 text-[#2A2828]/10" />
                  </div>
                </div>
                <p className="mt-3 text-center text-[9px] text-[#2A2828]/25" style={{ fontFamily: "var(--font-montserrat)" }}>Front</p>
              </motion.div>

              {/* Back */}
              <motion.div initial={{ opacity: 0, x: 15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                <div className="rounded-xl border border-[#2A2828]/6 bg-[#2A2828] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.10)]">
                  <div className="flex items-center gap-3">
                    <Camera className="h-6 w-6 text-[#E8E5E0]/30" />
                    <p className="text-sm uppercase tracking-[0.2em] text-[#E8E5E0]/40" style={{ fontFamily: "var(--font-cinzel)" }}>Maison Blanche</p>
                  </div>
                  <div className="mt-10 flex justify-between">
                    <p className="text-xs text-[#E8E5E0]/20">rossi.studio</p>
                    <div className="flex h-10 w-10 items-center justify-center rounded border border-[#E8E5E0]/10 bg-[#E8E5E0]/[0.04]">
                      <QrCode className="h-5 w-5 text-[#E8E5E0]/15" />
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-center text-[9px] text-[#2A2828]/25" style={{ fontFamily: "var(--font-montserrat)" }}>Back</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  FEATURES                                                  */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-14 text-center">
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#2A2828]/30" style={{ fontFamily: "var(--font-montserrat)" }}>Features</p>
              <GLine />
              <h2 className="mt-3 text-2xl text-[#1A1818]/70 md:text-3xl" style={{ fontFamily: "var(--font-playfair)" }}>Everything Included</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Camera, title: "Photography Brand", desc: "Designed for visual artists and studios" },
                { icon: QrCode, title: "QR Code", desc: "Link to your portfolio instantly" },
                { icon: Wifi, title: "NFC Tap", desc: "Share with a single touch" },
                { icon: BarChart3, title: "Analytics", desc: "Track engagement and views" },
                { icon: Share2, title: "Easy Sharing", desc: "Custom link for every card" },
                { icon: Smartphone, title: "Mobile First", desc: "Looks perfect on any screen" },
              ].map((f, i) => (
                <motion.div key={f.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="rounded-xl border border-[#2A2828]/5 bg-[#F0EEEA] p-5">
                  <f.icon className="mb-3 h-5 w-5 text-[#2A2828]/25" />
                  <h3 className="text-sm font-semibold text-[#1A1818]/55" style={{ fontFamily: "var(--font-montserrat)" }}>{f.title}</h3>
                  <p className="mt-1 text-xs text-[#2A2828]/25" style={{ fontFamily: "var(--font-cormorant)" }}>{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  CTA                                                       */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <motion.section className="px-6 py-24" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="mx-auto max-w-md text-center">
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#2A2828]/30" style={{ fontFamily: "var(--font-montserrat)" }}>Ready?</p>
            <GLine />
            <h2 className="mt-3 text-2xl text-[#1A1818]/65 md:text-3xl" style={{ fontFamily: "var(--font-playfair)" }}>Create Your Card</h2>
            <p className="mt-4 text-sm text-[#2A2828]/30" style={{ fontFamily: "var(--font-cormorant)" }}>
              Let your card speak as eloquently as your photographs.
            </p>
            <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-8">
              <Button size="lg" className="gap-2 bg-[#2A2828] px-10 text-base text-[#F0EEEA] hover:bg-[#3A3838]">
                Get Started
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {/* Footer */}
        <section className="border-t border-[#2A2828]/5 px-6 py-10">
          <div className="mx-auto max-w-md text-center">
            <p className="text-lg font-bold text-[#1A1818]/50" style={{ fontFamily: "var(--font-playfair)" }}>Maison Blanche</p>
            <p className="mt-1 text-[9px] text-[#2A2828]/20" style={{ fontFamily: "var(--font-montserrat)" }}>Photography Identity by {platform.name}</p>
          </div>
        </section>

        {/* Back */}
        <Link href="/templates/maison-blanche" className="fixed top-5 left-5 z-[101] flex items-center gap-1.5 rounded-full border border-[#2A2828]/8 bg-[#E8E5E0]/80 px-4 py-2 text-xs font-medium text-[#2A2828]/50 backdrop-blur-md transition-all hover:bg-[#E8E5E0] hover:text-[#1A1818]">
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </Link>
      </div>
    </>
  );
}
