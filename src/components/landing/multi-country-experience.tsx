"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Globe,
  MapPin,
  CreditCard,
  Languages,
  QrCode,
  Smartphone,
  DollarSign,
  Flag,
  Users,
  Check,
  Copy,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ================================================================== */
/*  Château du Nord - warm Canadian, maple-inspired                    */
/* ================================================================== */

export function ChateauDuNordExperience() {
  const [activeTab, setActiveTab] = useState<"profile" | "payments" | "sharing">("profile");
  const [lang, setLang] = useState<"en" | "fr">("en");
  const [copied, setCopied] = useState(false);

  const content = {
    en: { greeting: "Welcome", title: "Digital Business Card", location: "Toronto, Ontario, Canada", currency: "CAD", bio: "Connecting businesses across the Canadian landscape with elegance and warmth." },
    fr: { greeting: "Bienvenue", title: "Carte de Visite Numérique", location: "Toronto, Ontario, Canada", currency: "CAD", bio: "Connecter les entreprises à travers le paysage canadien avec élégance et chaleur." },
  };
  const t = content[lang];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF6F0] to-[#F0E8DA]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#D8CEB8]/60 bg-[#FAF6F0]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <Link href="/templates/chateau-du-nord">
              <Button variant="ghost" size="sm" className="gap-1.5 text-[#8B6040]"><ArrowLeft className="h-3.5 w-3.5" /> Back</Button>
            </Link>
            <div className="h-5 w-px bg-[#D8CEB8]" />
            <span className="text-sm font-semibold text-[#2A1810]" style={{ fontFamily: "var(--font-playfair)" }}>Château du Nord</span>
          </div>
          {/* Language toggle */}
          <div className="flex items-center gap-1 rounded-full border border-[#D8CEB8] bg-white p-0.5">
            {(["en", "fr"] as const).map((l) => (
              <button key={l} onClick={() => setLang(l)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${lang === l ? "bg-[#B03030] text-white" : "text-[#8B6040]"}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#B03030]/10">
            {/* Maple leaf simplified */}
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="#B03030">
              <path d="M12 2L13.5 6.5L17 5L15 8.5L19 9.5L15.5 11L18 14L14 13L12 17L10 13L6 14L8.5 11L5 9.5L9 8.5L7 5L10.5 6.5Z" />
              <rect x="11" y="16" width="2" height="5" rx="1" />
            </svg>
          </div>
          <h1 className="mt-4 text-4xl font-bold text-[#2A1810]" style={{ fontFamily: "var(--font-playfair)" }}>
            {t.greeting}
          </h1>
          <p className="mt-2 text-[#8B6040]">{t.title}</p>
        </motion.div>

        {/* Main Card */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="mx-auto mt-10 max-w-md overflow-hidden rounded-2xl border border-[#D8CEB8] bg-white shadow-lg"
        >
          {/* Profile header */}
          <div className="bg-gradient-to-br from-[#F8F0E4] to-[#F0E4D4] p-8 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#B03030] to-[#8A2020] shadow-lg shadow-[#B03030]/15">
              <span className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>MC</span>
            </div>
            <h2 className="mt-4 text-xl font-bold text-[#2A1810]" style={{ fontFamily: "var(--font-playfair)" }}>Marie Cloutier</h2>
            <p className="mt-0.5 text-sm text-[#8B6040]">Business Consultant</p>
            <div className="mt-2 flex items-center justify-center gap-1 text-xs text-[#8B6040]/60">
              <MapPin className="h-3 w-3" /> {t.location}
            </div>
            <p className="mx-auto mt-3 max-w-xs text-xs leading-relaxed text-[#8B6040]/80">{t.bio}</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#E8E0D4]">
            {([
              { id: "profile", label: lang === "fr" ? "Profil" : "Profile", icon: Users },
              { id: "payments", label: lang === "fr" ? "Paiements" : "Payments", icon: CreditCard },
              { id: "sharing", label: lang === "fr" ? "Partager" : "Share", icon: Share2 },
            ] as const).map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex flex-1 items-center justify-center gap-1.5 py-3 text-xs font-medium transition-all ${activeTab === tab.id ? "border-b-2 border-[#B03030] text-[#B03030]" : "text-[#8B6040]/60 hover:text-[#8B6040]"}`}
              >
                <tab.icon className="h-3.5 w-3.5" /> {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === "profile" && (
                <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="space-y-3">
                    {[
                      { icon: Globe, label: lang === "fr" ? "Site Web" : "Website", value: "www.mariecloutier.ca" },
                      { icon: CreditCard, label: "Email", value: "marie@cloutier.ca" },
                      { icon: Smartphone, label: lang === "fr" ? "Téléphone" : "Phone", value: "+1 (416) 555-0123" },
                      { icon: MapPin, label: lang === "fr" ? "Bureau" : "Office", value: "100 King St W, Toronto" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3 rounded-lg border border-[#E8E0D4] bg-[#FAF6F0] p-3">
                        <item.icon className="h-4 w-4 text-[#B03030]/60" />
                        <div>
                          <p className="text-[10px] text-[#8B6040]/60">{item.label}</p>
                          <p className="text-xs font-medium text-[#2A1810]">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "payments" && (
                <motion.div key="payments" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                  <div className="rounded-xl border border-[#E8E0D4] bg-[#FAF6F0] p-5">
                    <DollarSign className="mx-auto h-8 w-8 text-[#B03030]/40" />
                    <p className="mt-3 text-sm font-semibold text-[#2A1810]">{lang === "fr" ? "Paiements sécurisés" : "Secure Payments"}</p>
                    <p className="mt-1 text-xs text-[#8B6040]">{lang === "fr" ? "Propulsé par Stripe en dollars canadiens" : "Powered by Stripe in Canadian Dollars"}</p>
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <span className="rounded-full bg-[#B03030]/10 px-3 py-1 text-xs font-bold text-[#B03030]">CAD $</span>
                      <div className="flex h-6 w-10 items-center justify-center rounded bg-[#635BFF] text-[6px] font-bold text-white">STRIPE</div>
                    </div>
                    <div className="mx-auto mt-4 flex max-w-xs flex-wrap justify-center gap-2">
                      {["Visa", "Mastercard", "Amex", "Interac"].map((c) => (
                        <span key={c} className="rounded-full border border-[#E8E0D4] bg-white px-2.5 py-0.5 text-[10px] text-[#8B6040]">{c}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "sharing" && (
                <motion.div key="sharing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="mx-auto w-fit rounded-xl border border-[#E8E0D4] bg-[#FAF6F0] p-4">
                    <svg viewBox="0 0 100 100" className="mx-auto h-28 w-28">
                      {[[8, 8], [62, 8], [8, 62]].map(([x, y], i) => (
                        <g key={i}><rect x={x} y={y} width="30" height="30" rx="4" fill="#B03030" /><rect x={x! + 4} y={y! + 4} width="22" height="22" rx="2" fill="#FAF6F0" /><rect x={x! + 8} y={y! + 8} width="14" height="14" rx="2" fill="#B03030" opacity="0.8" /></g>
                      ))}
                      {[[44, 10], [48, 14], [44, 18], [10, 44], [44, 44], [48, 48], [44, 62], [62, 44], [62, 62], [66, 66], [56, 56]].map(([x, y], i) => (
                        <rect key={i} x={x} y={y} width="4" height="4" rx="0.5" fill="#B03030" opacity={0.4 + (i % 3) * 0.2} />
                      ))}
                      <circle cx="50" cy="50" r="8" fill="#B03030" /><circle cx="50" cy="50" r="5" fill="#FAF6F0" /><circle cx="50" cy="50" r="2.5" fill="#B03030" />
                    </svg>
                  </div>
                  <div className="mt-4 flex items-center gap-2 rounded-lg border border-[#E8E0D4] bg-[#FAF6F0] p-3">
                    <span className="flex-1 truncate text-xs font-mono text-[#2A1810]">cardoradigital.ca/u/mariecloutier</span>
                    <Button size="sm" variant="ghost" onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="gap-1 text-[#B03030]">
                      {copied ? <><Check className="h-3 w-3" /> Copied</> : <><Copy className="h-3 w-3" /> Copy</>}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Features */}
        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-[#2A1810]" style={{ fontFamily: "var(--font-playfair)" }}>
            {lang === "fr" ? "Conçu pour le Canada" : "Made for Canada"}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Flag, title: lang === "fr" ? "Bilingue" : "Bilingual", desc: lang === "fr" ? "Anglais et français intégrés" : "Built-in English & French support" },
              { icon: DollarSign, title: "CAD Payments", desc: "Accept payments in Canadian Dollars via Stripe" },
              { icon: Languages, title: lang === "fr" ? "Localisé" : "Localized", desc: lang === "fr" ? "Adapté au marché canadien" : "Tailored for the Canadian market" },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-[#D8CEB8] bg-white p-5 text-center"
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[#B03030]/10">
                  <item.icon className="h-5 w-5 text-[#B03030]" />
                </div>
                <h3 className="mt-3 font-semibold text-[#2A1810]">{item.title}</h3>
                <p className="mt-1 text-xs text-[#8B6040]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mx-auto mt-16 max-w-md rounded-2xl border border-[#D8CEB8] bg-white p-8 text-center"
        >
          <h2 className="text-xl font-bold text-[#2A1810]" style={{ fontFamily: "var(--font-playfair)" }}>Get Château du Nord</h2>
          <p className="mt-2 text-sm text-[#8B6040]">Your premium Canadian digital card</p>
          <Link href="/signup"><Button className="mt-5 gap-2 bg-[#B03030] text-white hover:bg-[#8A2020]">Get Started - C$14.99</Button></Link>
        </motion.div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  The Cosmopolitan - dark, global, borderless                        */
/* ================================================================== */

export function TheCosmopolitanExperience() {
  const [activeTab, setActiveTab] = useState<"profile" | "global" | "share">("profile");
  const [selectedCurrency, setSelectedCurrency] = useState("CAD");
  const [copied, setCopied] = useState(false);

  const currencies = [
    { code: "CAD", symbol: "C$", flag: "🇨🇦" },
    { code: "USD", symbol: "$", flag: "🇺🇸" },
    { code: "GBP", symbol: "£", flag: "🇬🇧" },
    { code: "EUR", symbol: "€", flag: "🇪🇺" },
    { code: "INR", symbol: "₹", flag: "🇮🇳" },
    { code: "AUD", symbol: "A$", flag: "🇦🇺" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0E18]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0A0E18]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <Link href="/templates/the-cosmopolitan">
              <Button variant="ghost" size="sm" className="gap-1.5 text-[#4A90D0]"><ArrowLeft className="h-3.5 w-3.5" /> Back</Button>
            </Link>
            <div className="h-5 w-px bg-white/10" />
            <span className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-montserrat)" }}>THE COSMOPOLITAN</span>
          </div>
          <span className="rounded-full border border-[#4A90D0]/20 bg-[#4A90D0]/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-[#4A90D0]">Preview</span>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <motion.div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#4A90D0]/20 bg-[#4A90D0]/5"
            animate={{ boxShadow: ["0 0 0px rgba(74,144,208,0)", "0 0 40px rgba(74,144,208,0.1)", "0 0 0px rgba(74,144,208,0)"] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Globe className="h-8 w-8 text-[#4A90D0]" />
          </motion.div>
          <h1 className="mt-4 text-4xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>The Cosmopolitan</h1>
          <p className="mt-2 text-[#4A90D0]/60">A borderless identity for a connected world</p>
        </motion.div>

        {/* Main Card */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="mx-auto mt-10 max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#121620] shadow-2xl"
        >
          {/* Profile */}
          <div className="relative overflow-hidden p-8 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4A90D0]/5 to-transparent" />
            {/* Globe dots background */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #4A90D0 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
            <div className="relative">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#4A90D0]/30 bg-gradient-to-br from-[#1A2238] to-[#12162 0]">
                <span className="text-2xl font-bold text-[#4A90D0]" style={{ fontFamily: "var(--font-montserrat)" }}>AK</span>
              </div>
              <h2 className="mt-4 text-xl font-bold text-white" style={{ fontFamily: "var(--font-montserrat)" }}>ALEX KUMAR</h2>
              <p className="mt-0.5 text-sm text-[#4A90D0]/70">Global Strategy Director</p>
              <p className="text-xs text-white/30">WorldBridge Consulting</p>
              <div className="mx-auto mt-3 flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                <Globe className="h-3 w-3 text-[#4A90D0]" />
                <span className="text-[10px] text-white/50">Toronto · London · Mumbai</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-t border-white/5">
            {([
              { id: "profile", label: "Profile", icon: Users },
              { id: "global", label: "Global", icon: Globe },
              { id: "share", label: "Share", icon: Share2 },
            ] as const).map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex flex-1 items-center justify-center gap-1.5 py-3 text-xs font-medium transition-all ${activeTab === tab.id ? "border-b border-[#4A90D0] text-[#4A90D0]" : "text-white/30 hover:text-white/50"}`}
              >
                <tab.icon className="h-3.5 w-3.5" /> {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === "profile" && (
                <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="space-y-3">
                    {[
                      { label: "Email", value: "alex@worldbridge.com" },
                      { label: "Phone", value: "+1 (416) 555-7890" },
                      { label: "LinkedIn", value: "linkedin.com/in/alexkumar" },
                      { label: "Website", value: "www.worldbridge.com" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between rounded-lg border border-white/5 bg-[#1A1E28] p-3">
                        <span className="text-[10px] text-white/30">{item.label}</span>
                        <span className="text-xs text-white/70">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "global" && (
                <motion.div key="global" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className="mb-3 text-xs text-white/30">Accept payments in any currency</p>
                  <div className="grid grid-cols-3 gap-2">
                    {currencies.map((c) => (
                      <button key={c.code} onClick={() => setSelectedCurrency(c.code)}
                        className={`flex flex-col items-center gap-1 rounded-lg border p-3 transition-all ${selectedCurrency === c.code ? "border-[#4A90D0]/40 bg-[#4A90D0]/10" : "border-white/5 bg-[#1A1E28] hover:border-white/10"}`}
                      >
                        <span className="text-lg">{c.flag}</span>
                        <span className={`text-xs font-medium ${selectedCurrency === c.code ? "text-[#4A90D0]" : "text-white/50"}`}>{c.code}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 rounded-lg border border-white/5 bg-[#1A1E28] p-4 text-center">
                    <p className="text-xs text-white/30">Selected Currency</p>
                    <p className="mt-1 text-2xl font-bold text-[#4A90D0]" style={{ fontFamily: "var(--font-montserrat)" }}>
                      {currencies.find((c) => c.code === selectedCurrency)?.symbol}24.99
                    </p>
                    <div className="mx-auto mt-2 flex w-fit items-center gap-1.5 rounded-full bg-[#4A90D0]/10 px-3 py-1">
                      <div className="flex h-4 w-6 items-center justify-center rounded bg-[#635BFF] text-[5px] font-bold text-white">STRIPE</div>
                      <span className="text-[10px] text-[#4A90D0]">Powered by Stripe</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "share" && (
                <motion.div key="share" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="mx-auto w-fit rounded-xl border border-white/10 bg-[#1A1E28] p-4">
                    <svg viewBox="0 0 100 100" className="mx-auto h-28 w-28">
                      {[[8, 8], [62, 8], [8, 62]].map(([x, y], i) => (
                        <g key={i}><rect x={x} y={y} width="30" height="30" rx="3" fill="#4A90D0" opacity="0.8" /><rect x={x! + 4} y={y! + 4} width="22" height="22" rx="1.5" fill="#12162 0" /><rect x={x! + 8} y={y! + 8} width="14" height="14" rx="1.5" fill="#4A90D0" opacity="0.9" /></g>
                      ))}
                      {[[44, 10], [48, 14], [44, 18], [10, 44], [44, 44], [48, 48], [44, 62], [62, 44], [62, 62], [66, 66]].map(([x, y], i) => (
                        <rect key={i} x={x} y={y} width="4" height="4" rx="0.5" fill="#4A90D0" opacity={0.3 + (i % 3) * 0.2} />
                      ))}
                      <circle cx="50" cy="50" r="8" fill="#4A90D0" opacity="0.9" /><circle cx="50" cy="50" r="5" fill="#12162 0" /><circle cx="50" cy="50" r="2.5" fill="#4A90D0" />
                    </svg>
                  </div>
                  <div className="mt-4 flex items-center gap-2 rounded-lg border border-white/10 bg-[#1A1E28] p-3">
                    <span className="flex-1 truncate text-xs font-mono text-white/60">cardoradigital.ca/u/alexkumar</span>
                    <Button size="sm" variant="ghost" onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="gap-1 text-[#4A90D0]">
                      {copied ? <><Check className="h-3 w-3" /> Copied</> : <><Copy className="h-3 w-3" /> Copy</>}
                    </Button>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {[{ icon: QrCode, label: "QR Code" }, { icon: Smartphone, label: "NFC Tap" }].map((a) => (
                      <button key={a.label} className="flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-[#1A1E28] py-2.5 text-xs text-white/60 hover:border-[#4A90D0]/30 hover:text-[#4A90D0]">
                        <a.icon className="h-3.5 w-3.5" /> {a.label}
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
          <h2 className="text-center text-2xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>Borderless by Design</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Globe, title: "Multi-Country", desc: "One card that works across borders and currencies" },
              { icon: CreditCard, title: "Multi-Currency", desc: "Accept CAD, USD, GBP, EUR, INR and more" },
              { icon: Users, title: "Global Network", desc: "Share your identity with anyone, anywhere" },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-white/5 bg-[#12162 0] p-5 text-center"
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[#4A90D0]/10">
                  <item.icon className="h-5 w-5 text-[#4A90D0]" />
                </div>
                <h3 className="mt-3 font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-xs text-white/40">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mx-auto mt-16 max-w-md rounded-2xl border border-white/10 bg-[#12162 0] p-8 text-center"
        >
          <h2 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>Go Global with Cosmopolitan</h2>
          <p className="mt-2 text-sm text-white/40">The borderless digital identity card</p>
          <Link href="/signup"><Button className="mt-5 gap-2 border border-[#4A90D0]/30 bg-[#4A90D0]/10 text-[#4A90D0] hover:bg-[#4A90D0]/20">Get Started - C$24.99</Button></Link>
        </motion.div>
      </div>
    </div>
  );
}
