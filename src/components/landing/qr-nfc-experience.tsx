"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  QrCode,
  Smartphone,
  Link2,
  Share2,
  Copy,
  Check,
  Download,
  Wifi,
  Globe,
  Shield,
  Zap,
  Eye,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { platform } from "@/lib/platform";

/* ================================================================== */
/*  Auric Touch — warm, golden, elegant                                */
/* ================================================================== */

export function AuricTouchExperience() {
  const [activeTab, setActiveTab] = useState<"qr" | "nfc" | "link">("qr");
  const [copied, setCopied] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [tapped, setTapped] = useState(false);

  const handleCopy = useCallback(() => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF6F0] to-[#F0EBE2]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#E0D8CC]/60 bg-[#FAF6F0]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <Link href="/templates/auric-touch">
              <Button variant="ghost" size="sm" className="gap-1.5 text-[#8B7355]">
                <ArrowLeft className="h-3.5 w-3.5" /> Back
              </Button>
            </Link>
            <div className="h-5 w-px bg-[#E0D8CC]" />
            <span className="text-sm font-semibold text-[#3A2A1A]" style={{ fontFamily: "var(--font-playfair)" }}>
              Auric Touch
            </span>
          </div>
          <span className="rounded-full bg-[#3A2A1A]/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-[#3A2A1A]">
            Preview
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-[#B8860B]/10">
            <QrCode className="h-8 w-8 text-[#B8860B]" />
          </div>
          <h1 className="mt-4 text-4xl font-bold text-[#3A2A1A]" style={{ fontFamily: "var(--font-playfair)" }}>
            Your Golden Card
          </h1>
          <p className="mt-2 text-[#8B7355]">Share your identity with a single scan or tap</p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-10 max-w-md overflow-hidden rounded-2xl border border-[#E0D8CC] bg-white shadow-lg"
        >
          {/* Profile section */}
          <div className="bg-gradient-to-br from-[#F8F2E8] to-[#F0E8DA] p-8 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] shadow-lg shadow-[#D4AF37]/20">
              <span className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>JD</span>
            </div>
            <h2 className="mt-4 text-xl font-bold text-[#3A2A1A]" style={{ fontFamily: "var(--font-playfair)" }}>John Doe</h2>
            <p className="mt-0.5 text-sm text-[#8B7355]">Senior Product Designer</p>
            <p className="text-xs text-[#8B7355]/60">Acme Technologies Inc.</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#E0D8CC]">
            {([
              { id: "qr", label: "QR Code", icon: QrCode },
              { id: "nfc", label: "NFC Tap", icon: Smartphone },
              { id: "link", label: "Share Link", icon: Link2 },
            ] as const).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-1 items-center justify-center gap-1.5 py-3 text-xs font-medium transition-all ${
                  activeTab === tab.id
                    ? "border-b-2 border-[#B8860B] text-[#B8860B]"
                    : "text-[#8B7355]/60 hover:text-[#8B7355]"
                }`}
              >
                <tab.icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === "qr" && (
                <motion.div key="qr" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                  {/* QR Code */}
                  <div className="mx-auto w-fit rounded-2xl border border-[#E0D8CC] bg-[#FAF6F0] p-4">
                    <svg viewBox="0 0 120 120" className="h-40 w-40">
                      {/* Corner squares */}
                      {[[10, 10], [80, 10], [10, 80]].map(([x, y], i) => (
                        <g key={i}>
                          <rect x={x} y={y} width="30" height="30" rx="4" fill="#3A2A1A" />
                          <rect x={x! + 4} y={y! + 4} width="22" height="22" rx="2" fill="#FAF6F0" />
                          <rect x={x! + 8} y={y! + 8} width="14" height="14" rx="2" fill="#B8860B" />
                        </g>
                      ))}
                      {/* Data pattern */}
                      {[[48, 12], [52, 16], [56, 12], [48, 20], [56, 20],
                        [12, 48], [16, 52], [12, 56], [20, 48],
                        [48, 48], [52, 52], [56, 48], [52, 56], [60, 52],
                        [48, 80], [52, 84], [56, 80], [48, 88], [56, 88],
                        [80, 48], [84, 52], [88, 48], [80, 56], [88, 56],
                        [80, 80], [84, 84], [88, 80], [84, 88], [92, 84],
                        [68, 68], [72, 72], [76, 68], [68, 76],
                      ].map(([x, y], i) => (
                        <rect key={i} x={x} y={y} width="4" height="4" rx="0.5" fill="#3A2A1A" opacity={0.7 + Math.sin(i) * 0.3} />
                      ))}
                      {/* Center logo */}
                      <circle cx="60" cy="60" r="10" fill="#B8860B" />
                      <circle cx="60" cy="60" r="6" fill="#FAF6F0" />
                      <circle cx="60" cy="60" r="3" fill="#D4AF37" />
                    </svg>
                  </div>
                  <p className="mt-4 text-xs text-[#8B7355]">Scan to view profile</p>
                  {!scanned ? (
                    <Button onClick={() => setScanned(true)} className="mt-3 gap-2 bg-[#3A2A1A] text-white hover:bg-[#2A1A0A]" size="sm">
                      <Eye className="h-3.5 w-3.5" /> Simulate Scan
                    </Button>
                  ) : (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-3 rounded-lg bg-[#B8860B]/10 p-3">
                      <p className="text-xs font-medium text-[#B8860B]">Scan detected! Redirecting to profile...</p>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {activeTab === "nfc" && (
                <motion.div key="nfc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                  <div className="mx-auto flex h-32 w-32 items-center justify-center">
                    <motion.div
                      className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF37]/10 to-[#B8860B]/5"
                      animate={tapped ? { scale: [1, 1.1, 1] } : {}}
                    >
                      {/* NFC waves */}
                      {[1, 2, 3].map((ring) => (
                        <motion.div
                          key={ring}
                          className="absolute rounded-full border border-[#D4AF37]/20"
                          style={{ width: 60 + ring * 20, height: 60 + ring * 20 }}
                          animate={{ opacity: [0.3, 0.1, 0.3], scale: [0.95, 1.05, 0.95] }}
                          transition={{ duration: 2, delay: ring * 0.3, repeat: Infinity }}
                        />
                      ))}
                      <Wifi className="h-8 w-8 text-[#B8860B]" />
                    </motion.div>
                  </div>
                  <p className="mt-2 text-sm font-medium text-[#3A2A1A]">Tap to Share</p>
                  <p className="mt-1 text-xs text-[#8B7355]">Hold your phone near an NFC-enabled device</p>
                  {!tapped ? (
                    <Button onClick={() => setTapped(true)} className="mt-4 gap-2 bg-[#3A2A1A] text-white hover:bg-[#2A1A0A]" size="sm">
                      <Smartphone className="h-3.5 w-3.5" /> Simulate Tap
                    </Button>
                  ) : (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 rounded-lg bg-[#B8860B]/10 p-3">
                      <p className="text-xs font-medium text-[#B8860B]">NFC tap registered! Card shared successfully.</p>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {activeTab === "link" && (
                <motion.div key="link" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className="text-sm text-[#8B7355]">Share your profile link directly</p>
                  <div className="mt-3 flex items-center gap-2 rounded-lg border border-[#E0D8CC] bg-[#FAF6F0] p-3">
                    <span className="flex-1 truncate text-xs font-mono text-[#3A2A1A]">cardoradigital.ca/u/johndoe</span>
                    <Button size="sm" variant="ghost" onClick={handleCopy} className="gap-1 text-[#B8860B]">
                      {copied ? <><Check className="h-3 w-3" /> Copied</> : <><Copy className="h-3 w-3" /> Copy</>}
                    </Button>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {["WhatsApp", "Email", "SMS"].map((s) => (
                      <button key={s} className="rounded-lg border border-[#E0D8CC] bg-white py-2.5 text-xs font-medium text-[#3A2A1A] transition-colors hover:bg-[#FAF6F0]">
                        {s}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Features */}
        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-[#3A2A1A]" style={{ fontFamily: "var(--font-playfair)" }}>
            How It Works
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: QrCode, title: "Scan", desc: "Anyone scans your QR code with their phone camera" },
              { icon: Smartphone, title: "Tap", desc: "Hold your NFC card near any smartphone to share" },
              { icon: Globe, title: "View", desc: "They instantly see your profile, contact info & links" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-[#E0D8CC] bg-white p-5 text-center"
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[#B8860B]/10">
                  <item.icon className="h-5 w-5 text-[#B8860B]" />
                </div>
                <h3 className="mt-3 font-semibold text-[#3A2A1A]">{item.title}</h3>
                <p className="mt-1 text-xs text-[#8B7355]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-md rounded-2xl border border-[#E0D8CC] bg-white p-8 text-center"
        >
          <h2 className="text-xl font-bold text-[#3A2A1A]" style={{ fontFamily: "var(--font-playfair)" }}>
            Get Your Auric Touch Card
          </h2>
          <p className="mt-2 text-sm text-[#8B7355]">
            Start sharing your profile with a golden touch
          </p>
          <Link href="/signup">
            <Button className="mt-5 gap-2 bg-gradient-to-r from-[#B8860B] to-[#D4A843] text-white hover:from-[#9A7209] hover:to-[#B8960B]">
              Get Started — C$12.99
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Obsidian Cipher — dark, sleek, tech-forward                        */
/* ================================================================== */

export function ObsidianCipherExperience() {
  const [activeSection, setActiveSection] = useState<"share" | "analytics" | "security">("share");
  const [copied, setCopied] = useState(false);
  const [encrypted, setEncrypted] = useState(false);

  const handleCopy = useCallback(() => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <div className="min-h-screen bg-[#0C0E12]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0C0E12]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <Link href="/templates/obsidian-cipher">
              <Button variant="ghost" size="sm" className="gap-1.5 text-[#60A0D0]">
                <ArrowLeft className="h-3.5 w-3.5" /> Back
              </Button>
            </Link>
            <div className="h-5 w-px bg-white/10" />
            <span className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-montserrat)" }}>
              OBSIDIAN CIPHER
            </span>
          </div>
          <span className="rounded-full border border-[#60A0D0]/20 bg-[#60A0D0]/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-[#60A0D0]">
            Preview
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <motion.div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#60A0D0]/20 bg-[#60A0D0]/5"
            animate={{ boxShadow: ["0 0 0px rgba(96,160,208,0)", "0 0 30px rgba(96,160,208,0.15)", "0 0 0px rgba(96,160,208,0)"] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Shield className="h-8 w-8 text-[#60A0D0]" />
          </motion.div>
          <h1 className="mt-4 text-4xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
            Obsidian Cipher
          </h1>
          <p className="mt-2 text-[#60A0D0]/60">Encrypted identity. Instant sharing. Zero friction.</p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-10 max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#14161C] shadow-2xl"
        >
          {/* Profile */}
          <div className="relative overflow-hidden p-8 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#60A0D0]/5 to-transparent" />
            <div className="relative">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#60A0D0]/30 bg-[#1A1E28]">
                <span className="text-2xl font-bold text-[#60A0D0]" style={{ fontFamily: "var(--font-montserrat)" }}>JD</span>
              </div>
              <h2 className="mt-4 text-xl font-bold text-white" style={{ fontFamily: "var(--font-montserrat)" }}>JOHN DOE</h2>
              <p className="mt-0.5 text-sm text-[#60A0D0]/70">Security Engineer</p>
              <p className="text-xs text-white/30">CyberShield Corp.</p>
              {/* Encryption badge */}
              <div className="mx-auto mt-3 flex w-fit items-center gap-1 rounded-full border border-[#60A0D0]/20 bg-[#60A0D0]/5 px-3 py-1">
                <Shield className="h-3 w-3 text-[#60A0D0]" />
                <span className="text-[10px] text-[#60A0D0]">End-to-end encrypted</span>
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="flex border-t border-white/5">
            {([
              { id: "share", label: "Share", icon: Share2 },
              { id: "analytics", label: "Analytics", icon: BarChart3 },
              { id: "security", label: "Security", icon: Shield },
            ] as const).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex flex-1 items-center justify-center gap-1.5 py-3 text-xs font-medium transition-all ${
                  activeSection === tab.id
                    ? "border-b border-[#60A0D0] text-[#60A0D0]"
                    : "text-white/30 hover:text-white/50"
                }`}
              >
                <tab.icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeSection === "share" && (
                <motion.div key="share" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {/* QR */}
                  <div className="mx-auto w-fit rounded-xl border border-white/10 bg-[#1A1E28] p-4">
                    <svg viewBox="0 0 100 100" className="h-32 w-32">
                      {[[8, 8], [62, 8], [8, 62]].map(([x, y], i) => (
                        <g key={i}>
                          <rect x={x} y={y} width="30" height="30" rx="3" fill="#60A0D0" opacity="0.8" />
                          <rect x={x! + 4} y={y! + 4} width="22" height="22" rx="1.5" fill="#14161C" />
                          <rect x={x! + 8} y={y! + 8} width="14" height="14" rx="1.5" fill="#60A0D0" opacity="0.9" />
                        </g>
                      ))}
                      {[[44, 10], [48, 14], [44, 18], [10, 44], [14, 48], [44, 44], [48, 48], [52, 44],
                        [44, 62], [48, 66], [62, 44], [66, 48], [62, 62], [66, 66], [70, 62],
                        [56, 56], [60, 60], [52, 60],
                      ].map(([x, y], i) => (
                        <rect key={i} x={x} y={y} width="4" height="4" rx="0.5" fill="#60A0D0" opacity={0.4 + Math.sin(i) * 0.3} />
                      ))}
                      <circle cx="50" cy="50" r="8" fill="#60A0D0" opacity="0.9" />
                      <circle cx="50" cy="50" r="5" fill="#14161C" />
                      <circle cx="50" cy="50" r="2.5" fill="#60A0D0" />
                    </svg>
                  </div>
                  {/* Link */}
                  <div className="mt-4 flex items-center gap-2 rounded-lg border border-white/10 bg-[#1A1E28] p-3">
                    <span className="flex-1 truncate text-xs font-mono text-white/60">cardoradigital.ca/u/johndoe</span>
                    <Button size="sm" variant="ghost" onClick={handleCopy} className="gap-1 text-[#60A0D0]">
                      {copied ? <><Check className="h-3 w-3" /> Copied</> : <><Copy className="h-3 w-3" /> Copy</>}
                    </Button>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {[{ icon: Smartphone, label: "NFC Tap" }, { icon: Download, label: "Save Card" }].map((a) => (
                      <button key={a.label} className="flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-[#1A1E28] py-2.5 text-xs text-white/60 transition-colors hover:border-[#60A0D0]/30 hover:text-[#60A0D0]">
                        <a.icon className="h-3.5 w-3.5" /> {a.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeSection === "analytics" && (
                <motion.div key="analytics" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Total Scans", value: "1,247", trend: "+18%" },
                      { label: "NFC Taps", value: "342", trend: "+24%" },
                      { label: "Profile Views", value: "3,891", trend: "+12%" },
                      { label: "Link Clicks", value: "756", trend: "+31%" },
                    ].map((s) => (
                      <div key={s.label} className="rounded-lg border border-white/5 bg-[#1A1E28] p-3">
                        <p className="text-[10px] text-white/30">{s.label}</p>
                        <p className="mt-1 text-lg font-bold text-white" style={{ fontFamily: "var(--font-montserrat)" }}>{s.value}</p>
                        <span className="text-[10px] text-[#60A0D0]">{s.trend}</span>
                      </div>
                    ))}
                  </div>
                  {/* Mini chart */}
                  <div className="mt-4 rounded-lg border border-white/5 bg-[#1A1E28] p-3">
                    <p className="text-[10px] text-white/30">Last 7 days</p>
                    <div className="mt-2 flex items-end gap-1">
                      {[45, 62, 55, 78, 68, 85, 72].map((h, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 rounded-t bg-gradient-to-t from-[#60A0D0]/20 to-[#60A0D0]/60"
                          initial={{ height: 0 }}
                          animate={{ height: h * 0.6 }}
                          transition={{ delay: 0.3 + i * 0.08 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === "security" && (
                <motion.div key="security" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="space-y-3">
                    {[
                      { icon: Shield, label: "End-to-End Encryption", desc: "Your data is encrypted at rest and in transit", active: true },
                      { icon: Zap, label: "Instant Revoke", desc: "Disable sharing with one click", active: true },
                      { icon: Eye, label: "View Tracking", desc: "See who viewed your card and when", active: true },
                    ].map((f) => (
                      <div key={f.label} className="flex items-start gap-3 rounded-lg border border-white/5 bg-[#1A1E28] p-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#60A0D0]/10">
                          <f.icon className="h-4 w-4 text-[#60A0D0]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{f.label}</p>
                          <p className="text-xs text-white/40">{f.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {!encrypted ? (
                    <Button onClick={() => setEncrypted(true)} className="mt-4 w-full gap-2 border border-[#60A0D0]/20 bg-[#60A0D0]/10 text-[#60A0D0] hover:bg-[#60A0D0]/20" size="sm">
                      <Shield className="h-3.5 w-3.5" /> Encrypt Profile
                    </Button>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 rounded-lg border border-[#60A0D0]/20 bg-[#60A0D0]/5 p-3 text-center">
                      <p className="text-xs font-medium text-[#60A0D0]">Profile encrypted with AES-256</p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Features */}
        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
            Built for the Future
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Shield, title: "Encrypted", desc: "Military-grade encryption protects your identity" },
              { icon: Zap, title: "Instant", desc: "Share in milliseconds via QR, NFC, or link" },
              { icon: BarChart3, title: "Tracked", desc: "Real-time analytics on every interaction" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-white/5 bg-[#14161C] p-5 text-center"
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[#60A0D0]/10">
                  <item.icon className="h-5 w-5 text-[#60A0D0]" />
                </div>
                <h3 className="mt-3 font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-xs text-white/40">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#14161C] p-8 text-center"
        >
          <h2 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
            Unlock Obsidian Cipher
          </h2>
          <p className="mt-2 text-sm text-white/40">
            The most secure way to share your digital identity
          </p>
          <Link href="/signup">
            <Button className="mt-5 gap-2 border border-[#60A0D0]/30 bg-[#60A0D0]/10 text-[#60A0D0] hover:bg-[#60A0D0]/20">
              Get Started — C$19.99
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
