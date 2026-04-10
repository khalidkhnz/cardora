"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Sparkles,
  X,
  CreditCard,
  QrCode,
  Share2,
  Smartphone,
  Palette,
  BarChart3,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import { Footer } from "@/components/landing/footer";
import html2canvas from "html2canvas-pro";

/* ================================================================== */
/*  Card data                                                          */
/* ================================================================== */

const CARDS: Record<string, {
  type: string;
  title: string;
  tagline: string;
  description: string;
  color: string;
  fields: { key: string; label: string; placeholder: string }[];
}> = {
  business: {
    type: "Business Card",
    title: "Professional Business Card",
    tagline: "Make a lasting first impression",
    description: "Create a sleek, modern digital business card with your contact info, social links, and QR code — all shareable with a single tap.",
    color: "#D4AF37",
    fields: [
      { key: "name", label: "Full Name", placeholder: "John Doe" },
      { key: "title", label: "Job Title", placeholder: "Senior Developer" },
      { key: "company", label: "Company", placeholder: "Acme Inc." },
      { key: "email", label: "Email", placeholder: "john@acme.com" },
      { key: "phone", label: "Phone", placeholder: "+1 (555) 123-4567" },
    ],
  },
  wedding: {
    type: "Wedding Invitation",
    title: "Elegant Wedding Invite",
    tagline: "Announce your special day beautifully",
    description: "A stunning digital wedding invitation with RSVP tracking, event details, venue info, and easy sharing — all at no cost.",
    color: "#B8860B",
    fields: [
      { key: "partner1", label: "Partner 1 Name", placeholder: "James" },
      { key: "partner2", label: "Partner 2 Name", placeholder: "Emily" },
      { key: "date", label: "Wedding Date", placeholder: "September 15, 2026" },
      { key: "venue", label: "Venue", placeholder: "The Grand Ballroom" },
      { key: "message", label: "Message", placeholder: "We'd love you to join us!" },
    ],
  },
  engagement: {
    type: "Engagement Card",
    title: "Save the Date",
    tagline: "Share your exciting news with the world",
    description: "A beautiful digital engagement announcement with your names, date, and a personal message — share it instantly with everyone.",
    color: "#C09060",
    fields: [
      { key: "partner1", label: "Partner 1 Name", placeholder: "Michael" },
      { key: "partner2", label: "Partner 2 Name", placeholder: "Sarah" },
      { key: "date", label: "Engagement Date", placeholder: "March 10, 2026" },
      { key: "location", label: "Location", placeholder: "Paris, France" },
      { key: "message", label: "Message", placeholder: "We said YES!" },
    ],
  },
  anniversary: {
    type: "Anniversary Card",
    title: "Anniversary Celebration",
    tagline: "Celebrate your milestones together",
    description: "Mark your anniversary with a shareable digital card featuring your names, years together, and a heartfelt message.",
    color: "#8B7355",
    fields: [
      { key: "names", label: "Couple Names", placeholder: "David & Maria" },
      { key: "years", label: "Years Together", placeholder: "25" },
      { key: "date", label: "Anniversary Date", placeholder: "June 20, 2026" },
      { key: "message", label: "Message", placeholder: "Celebrating 25 wonderful years!" },
    ],
  },
};

const OFFERINGS = [
  { icon: CreditCard, title: "Digital Cards", desc: "Business cards, wedding invites, and more — all digital, all free." },
  { icon: QrCode, title: "QR Code Sharing", desc: "Generate a QR code instantly for easy sharing at events." },
  { icon: Smartphone, title: "NFC Ready", desc: "Program NFC tags for tap-to-share functionality." },
  { icon: Share2, title: "Instant Sharing", desc: "Share via link, WhatsApp, email, or social media." },
  { icon: Palette, title: "Customizable", desc: "Personalize colors, fonts, and content to match your style." },
  { icon: BarChart3, title: "Analytics", desc: "Track views, taps, and engagement on your cards." },
];

/* ================================================================== */
/*  Rendered Card Templates                                            */
/* ================================================================== */

function RenderedCard({ id, data }: { id: string; data: Record<string, string> }) {
  if (id === "business") return <BusinessCard data={data} />;
  if (id === "wedding") return <WeddingCard data={data} />;
  if (id === "engagement") return <EngagementCard data={data} />;
  return <AnniversaryCard data={data} />;
}

function BusinessCard({ data }: { data: Record<string, string> }) {
  return (
    <div className="aspect-[1.8/1] w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#1A1A1A] via-[#222] to-[#1A1A1A] p-6 shadow-xl">
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-wide text-white" style={{ fontFamily: "var(--font-montserrat)" }}>
              {data.name ?? "Your Name"}
            </h2>
            <p className="mt-0.5 text-xs tracking-widest text-[#D4AF37]">
              {(data.title ?? "Your Title").toUpperCase()}
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/40">
            <span className="text-sm text-[#D4AF37]">✦</span>
          </div>
        </div>
        <div>
          <div className="mb-3 h-px w-16 bg-gradient-to-r from-[#D4AF37]/60 to-transparent" />
          <p className="text-sm font-medium text-white/80">{data.company ?? "Company Name"}</p>
          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-[11px] text-white/50">
            <span>{data.email ?? "email@company.com"}</span>
            <span>{data.phone ?? "+1 (555) 000-0000"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function WeddingCard({ data }: { data: Record<string, string> }) {
  return (
    <div className="aspect-[1/1.3] w-full overflow-hidden rounded-xl bg-gradient-to-b from-[#FFF8F0] via-[#FAF0E6] to-[#F5E8D8] p-8 shadow-xl">
      <div className="flex h-full flex-col items-center justify-between text-center">
        <div className="flex items-center gap-3">
          <div className="h-px w-12 bg-[#B8860B]/30" />
          <span className="text-[9px] tracking-[0.3em] text-[#B8860B]/60">TOGETHER WITH THEIR FAMILIES</span>
          <div className="h-px w-12 bg-[#B8860B]/30" />
        </div>
        <div>
          <p className="text-3xl text-[#3A2A1A]" style={{ fontFamily: "var(--font-great-vibes)" }}>
            {data.partner1 ?? "Partner 1"} <span className="text-[#B8860B]">&amp;</span> {data.partner2 ?? "Partner 2"}
          </p>
          <p className="mt-1 text-[10px] tracking-[0.2em] text-[#8B7355]">REQUEST THE PLEASURE OF YOUR COMPANY</p>
        </div>
        <div>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-[#B8860B]/25" />
            <span className="text-xs text-[#B8860B]/60">&#9829;</span>
            <div className="h-px w-8 bg-[#B8860B]/25" />
          </div>
          <p className="mt-2 text-sm font-medium text-[#5A4A35]">{data.date ?? "Date"}</p>
          <p className="mt-0.5 text-xs text-[#8B7355]">{data.venue ?? "Venue"}</p>
          {data.message && <p className="mt-3 text-xs italic text-[#6B5535]/70">&ldquo;{data.message}&rdquo;</p>}
        </div>
      </div>
    </div>
  );
}

function EngagementCard({ data }: { data: Record<string, string> }) {
  return (
    <div className="aspect-[1/1.2] w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#FFF5EE] via-[#FFF0E5] to-[#FFE8D8] p-8 shadow-xl">
      <div className="flex h-full flex-col items-center justify-center text-center">
        <p className="text-[10px] tracking-[0.4em] text-[#C09060]/70">SAVE THE DATE</p>
        <div className="my-4 h-px w-16 bg-[#C09060]/25" />
        <p className="text-3xl text-[#5A3A20]" style={{ fontFamily: "var(--font-great-vibes)" }}>
          {data.partner1 ?? "Partner 1"} <span className="text-[#C09060]">&amp;</span> {data.partner2 ?? "Partner 2"}
        </p>
        <div className="mt-4 flex items-center gap-4">
          <div className="h-px w-10 bg-[#C09060]/30" />
          <p className="text-lg font-medium text-[#C09060]">{data.date ?? "Date"}</p>
          <div className="h-px w-10 bg-[#C09060]/30" />
        </div>
        {data.location && <p className="mt-2 text-xs text-[#8B6840]/50">{data.location}</p>}
        {data.message && <p className="mt-4 text-sm italic text-[#5A3A20]/60">&ldquo;{data.message}&rdquo;</p>}
      </div>
    </div>
  );
}

function AnniversaryCard({ data }: { data: Record<string, string> }) {
  return (
    <div className="aspect-[1/1.2] w-full overflow-hidden rounded-xl bg-gradient-to-b from-[#F5F0EA] via-[#EDE8E0] to-[#E8E2D8] p-8 shadow-xl">
      <div className="flex h-full flex-col items-center justify-center text-center">
        <p className="text-[9px] tracking-[0.5em] text-[#8B7355]/50">CELEBRATING</p>
        <p className="mt-2 text-5xl font-light text-[#8B7355]" style={{ fontFamily: "var(--font-playfair)" }}>
          {data.years ?? "25"}
        </p>
        <p className="mt-1 text-[9px] tracking-[0.3em] text-[#8B7355]/50">WONDERFUL YEARS</p>
        <div className="my-4 flex items-center gap-3">
          <div className="h-px w-8 bg-[#8B7355]/20" />
          <span className="text-xs text-[#8B7355]/40">&#9733;</span>
          <div className="h-px w-8 bg-[#8B7355]/20" />
        </div>
        <p className="text-2xl text-[#5A4A35]" style={{ fontFamily: "var(--font-great-vibes)" }}>
          {data.names ?? "Names"}
        </p>
        {data.date && <p className="mt-2 text-xs text-[#8B7355]/60">{data.date}</p>}
        {data.message && <p className="mt-3 text-xs italic text-[#5A4A35]/50">&ldquo;{data.message}&rdquo;</p>}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Details Modal (form → result)                                      */
/* ================================================================== */

function DetailsModal({ card, onClose }: { card: typeof CARDS[string]; cardId: string; onClose: () => void }) {
  const [step, setStep] = useState<"form" | "result">("form");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardId = Object.entries(CARDS).find(([, v]) => v === card)?.[0] ?? "business";

  const updateField = useCallback((key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, { scale: 3, backgroundColor: null, useCORS: true });
      const link = document.createElement("a");
      link.download = `${cardId}-card.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch { /* ignore */ }
    setDownloading(false);
  }, [cardId]);

  const isFormValid = card.fields.slice(0, 2).every((f) => formData[f.key]?.trim());

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative mx-4 w-full max-w-lg overflow-hidden rounded-2xl border border-[#E8E4DE] bg-white shadow-2xl dark:border-white/10 dark:bg-[#141414]"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 22 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        <button onClick={onClose} className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-[#6B6560] hover:bg-black/10 dark:bg-white/5">
          <X className="h-4 w-4" />
        </button>

        <AnimatePresence mode="wait">
          {step === "form" && (
            <motion.div key="form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6">
              <h2 className="text-xl font-bold text-[#1A1A1A] dark:text-[#F0E8D8]" style={{ fontFamily: "var(--font-playfair)" }}>
                Enter Your Details
              </h2>
              <p className="mt-1 text-sm text-[#6B6560] dark:text-[#A09888]">Fill in the fields to generate your {card.type.toLowerCase()}</p>

              <div className="mt-5 space-y-3">
                {card.fields.map((field, i) => (
                  <div key={field.key}>
                    <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#8B8580] dark:text-[#706860]">
                      {field.label} {i < 2 && <span className="text-red-400">*</span>}
                    </label>
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      value={formData[field.key] ?? ""}
                      onChange={(e) => updateField(field.key, e.target.value)}
                      className="w-full rounded-lg border border-[#E8E4DE] bg-[#FAF8F5] px-3 py-2.5 text-sm text-[#1A1A1A] outline-none transition-all placeholder:text-[#C8C4BE] focus:border-[#D4AF37]/40 focus:ring-2 focus:ring-[#D4AF37]/10 dark:border-white/10 dark:bg-white/5 dark:text-[#F0E8D8]"
                    />
                  </div>
                ))}
              </div>

              <Button
                onClick={() => setStep("result")}
                disabled={!isFormValid}
                className="mt-6 w-full gap-2 bg-gradient-to-r from-[#B8860B] to-[#D4A843] text-white hover:from-[#9A7209] hover:to-[#B8960B] disabled:opacity-50"
              >
                <Sparkles className="h-4 w-4" /> Generate Card
              </Button>
            </motion.div>
          )}

          {step === "result" && (
            <motion.div key="result" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6">
              <h2 className="text-xl font-bold text-[#1A1A1A] dark:text-[#F0E8D8]" style={{ fontFamily: "var(--font-playfair)" }}>
                Your Card is Ready!
              </h2>
              <p className="mt-1 text-sm text-[#6B6560] dark:text-[#A09888]">Download or edit your card</p>

              <div className="mt-5" ref={cardRef}>
                <RenderedCard id={cardId} data={formData} />
              </div>

              <div className="mt-5 flex gap-3">
                <Button
                  onClick={() => void handleDownload()}
                  disabled={downloading}
                  className="flex-1 gap-2 bg-gradient-to-r from-[#B8860B] to-[#D4A843] text-white hover:from-[#9A7209] hover:to-[#B8960B]"
                >
                  <Download className="h-4 w-4" />
                  {downloading ? "Downloading..." : "Download Card"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setStep("form")}
                  className="border-[#E8E4DE] text-[#6B6560] hover:bg-[#F3F0EB] dark:border-white/10"
                >
                  Edit
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/* ================================================================== */
/*  Main Page Component                                                */
/* ================================================================== */

export function FreeCardPage({ type }: { type: string }) {
  const card = CARDS[type];
  const [showModal, setShowModal] = useState(false);

  if (!card) return null;

  return (
    <main className="min-h-screen bg-[#FAF8F5] dark:bg-[#0A0A0A]">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-[#E8E4DE]/60 bg-[#FAF8F5]/80 backdrop-blur-xl dark:border-white/10 dark:bg-[#0A0A0A]/80">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/cardora-logo.png" alt="Cardora" width={28} height={28} className="h-7 w-7 object-contain" />
            <span className="text-lg font-bold tracking-wide text-[#1A1A1A] dark:text-[#F0E8D8]" style={{ fontFamily: "var(--font-playfair)" }}>
              {APP_NAME}
            </span>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1.5 text-[#6B6560] hover:text-[#1A1A1A] dark:text-[#A09888]">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#B8860B]/[0.03] via-transparent to-transparent" />
        <div className="mx-auto max-w-5xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left — info */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-block rounded-full bg-[#B8860B]/10 px-4 py-1 text-xs font-medium uppercase tracking-wider text-[#B8860B]">
                100% Free
              </span>
              <h1
                className="mt-4 text-4xl font-bold leading-tight text-[#1A1A1A] md:text-5xl dark:text-[#F0E8D8]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {card.title}
              </h1>
              <p className="mt-2 text-lg text-[#8B7355]" style={{ fontFamily: "var(--font-montserrat)" }}>
                {card.tagline}
              </p>
              <p className="mt-4 max-w-md text-[#6B6560] dark:text-[#A09888]">
                {card.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button
                  size="lg"
                  onClick={() => setShowModal(true)}
                  className="gap-2 bg-gradient-to-r from-[#B8860B] to-[#D4A843] px-8 text-white hover:from-[#9A7209] hover:to-[#B8960B]"
                >
                  Try Now <ArrowRight className="h-4 w-4" />
                </Button>
                <p className="text-xs text-[#8B8580] dark:text-[#706860]">No sign-up required</p>
              </div>

              {/* Quick features */}
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {["Free forever", "No watermark", "Instant download", "Shareable link"].map((f) => (
                  <div key={f} className="flex items-center gap-1.5 text-sm text-[#6B6560] dark:text-[#A09888]">
                    <Check className="h-3.5 w-3.5 text-[#B8860B]" />
                    {f}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — card preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="w-full max-w-sm">
                <RenderedCard id={type} data={{}} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Cardora Offers */}
      <section className="border-t border-[#E8E4DE] px-6 py-20 dark:border-white/10">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-[#1A1A1A] dark:text-[#F0E8D8]" style={{ fontFamily: "var(--font-playfair)" }}>
              What {APP_NAME} Offers
            </h2>
            <p className="mt-2 text-[#6B6560] dark:text-[#A09888]">
              Everything you need to create, share, and track your digital cards
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {OFFERINGS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="rounded-xl border border-[#E8E4DE] bg-white p-5 transition-shadow hover:shadow-md dark:border-white/10 dark:bg-[#141414]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3F0EB] dark:bg-white/5">
                  <item.icon className="h-5 w-5 text-[#8B7355]" />
                </div>
                <h3 className="mt-3 font-semibold text-[#1A1A1A] dark:text-[#F0E8D8]">{item.title}</h3>
                <p className="mt-1 text-sm text-[#6B6560] dark:text-[#A09888]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] px-8 py-14 text-center">
            <h2
              className="text-3xl font-bold text-white md:text-4xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Ready to create your card?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-white/60">
              It takes less than 2 minutes. No account needed, no credit card, completely free.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => setShowModal(true)}
                className="gap-2 bg-gradient-to-r from-[#B8860B] to-[#D4A843] px-8 text-white hover:from-[#9A7209] hover:to-[#B8960B]"
              >
                Create Your {card.type} <ArrowRight className="h-4 w-4" />
              </Button>
              <Link href="/">
                <Button size="lg" className="border border-white/20 bg-transparent text-white hover:bg-white/10">
                  Explore All Cards
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <DetailsModal card={card} cardId={type} onClose={() => setShowModal(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}
