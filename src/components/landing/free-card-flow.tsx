"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas-pro";

/* ================================================================== */
/*  Types                                                              */
/* ================================================================== */

interface FreeCard {
  id: string;
  type: string;
  title: string;
  description: string;
  fields: { key: string; label: string; placeholder: string }[];
}

type FlowStep = "preview" | "form" | "result";

/* ================================================================== */
/*  Card Cover Previews — realistic mini card designs                 */
/* ================================================================== */

export function FreeCardCover({ id }: { id: string }) {
  if (id === "business") return <BusinessCover />;
  if (id === "wedding") return <WeddingCover />;
  if (id === "engagement") return <EngagementCover />;
  return <AnniversaryCover />;
}

function BusinessCover() {
  return (
    <div className="relative flex h-40 items-end overflow-hidden bg-gradient-to-br from-[#1A1A1A] via-[#222] to-[#1A1A1A] p-4">
      <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-[#D4AF37]/10 to-transparent" />
      <div className="absolute top-4 right-4 h-8 w-8 rounded-full border border-[#D4AF37]/30" />
      <div className="absolute top-6 right-6 h-4 w-4 rounded-full bg-[#D4AF37]/20" />
      <div className="relative z-10">
        <div className="h-1 w-10 rounded-full bg-[#D4AF37]/60" />
        <p className="mt-2 text-[11px] font-bold tracking-wide text-white" style={{ fontFamily: "var(--font-montserrat)" }}>JOHN DOE</p>
        <p className="text-[8px] tracking-widest text-[#D4AF37]/70">SENIOR DEVELOPER</p>
        <div className="mt-2 flex gap-3">
          <div className="h-px w-6 bg-white/20" />
          <div className="h-px w-4 bg-white/15" />
          <div className="h-px w-8 bg-white/10" />
        </div>
        <p className="mt-1 text-[7px] text-white/40">john@acme.com · +1 555-0123</p>
      </div>
    </div>
  );
}

function WeddingCover() {
  return (
    <div className="relative flex h-40 flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#FFF8F0] via-[#FAF0E6] to-[#F5E8D8]">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L35 15 L30 12 L25 15 Z' fill='%23B8860B'/%3E%3C/svg%3E\")", backgroundSize: "30px 30px" }} />
      <div className="flex items-center gap-2">
        <div className="h-px w-8 bg-[#B8860B]/30" />
        <span className="text-[8px] tracking-[0.3em] text-[#B8860B]/50">TOGETHER WITH THEIR FAMILIES</span>
        <div className="h-px w-8 bg-[#B8860B]/30" />
      </div>
      <p className="mt-2 text-lg text-[#3A2A1A]" style={{ fontFamily: "var(--font-great-vibes)" }}>James & Emily</p>
      <p className="mt-0.5 text-[7px] tracking-[0.2em] text-[#8B7355]">REQUEST THE PLEASURE OF YOUR COMPANY</p>
      <div className="mt-2 flex items-center gap-2">
        <div className="h-px w-5 bg-[#B8860B]/20" />
        <span className="text-[8px] text-[#B8860B]/50">♥</span>
        <div className="h-px w-5 bg-[#B8860B]/20" />
      </div>
      <p className="mt-1 text-[8px] text-[#6B5535]/60">September 15, 2026 · The Grand Ballroom</p>
    </div>
  );
}

function EngagementCover() {
  return (
    <div className="relative flex h-40 flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#FFF5EE] via-[#FFF0E5] to-[#FFE8D8]">
      <div className="absolute top-3 left-3 h-12 w-12 rounded-full border border-[#C09060]/15" />
      <div className="absolute right-4 bottom-4 h-8 w-8 rounded-full border border-[#C09060]/10" />
      <p className="text-[8px] tracking-[0.3em] text-[#C09060]/60">SAVE THE DATE</p>
      <p className="mt-1 text-lg text-[#5A3A20]" style={{ fontFamily: "var(--font-great-vibes)" }}>Michael & Sarah</p>
      <div className="mt-2 flex items-center gap-3">
        <div className="h-px w-10 bg-[#C09060]/25" />
        <p className="text-[9px] font-medium text-[#C09060]">03.10.2026</p>
        <div className="h-px w-10 bg-[#C09060]/25" />
      </div>
      <p className="mt-1.5 text-[7px] tracking-wider text-[#8B6840]/40">WE SAID YES!</p>
    </div>
  );
}

function AnniversaryCover() {
  return (
    <div className="relative flex h-40 flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#F5F0EA] via-[#EDE8E0] to-[#E8E2D8]">
      <div className="absolute inset-x-6 top-4 flex justify-between">
        <div className="h-px w-full bg-gradient-to-r from-[#8B7355]/20 via-[#8B7355]/10 to-transparent" />
      </div>
      <p className="text-[7px] tracking-[0.4em] text-[#8B7355]/50">CELEBRATING</p>
      <p className="mt-1 text-3xl font-light text-[#8B7355]" style={{ fontFamily: "var(--font-playfair)" }}>25</p>
      <p className="text-[7px] tracking-[0.3em] text-[#8B7355]/50">WONDERFUL YEARS</p>
      <div className="mt-2 flex items-center gap-2">
        <div className="h-px w-6 bg-[#8B7355]/20" />
        <span className="text-[8px] text-[#8B7355]/40">★</span>
        <div className="h-px w-6 bg-[#8B7355]/20" />
      </div>
      <p className="mt-1 text-[9px] text-[#5A4A35]" style={{ fontFamily: "var(--font-great-vibes)" }}>David & Maria</p>
      <div className="absolute inset-x-6 bottom-4">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#8B7355]/10 to-[#8B7355]/20" />
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Rendered Card Templates — with user data                          */
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
        <div>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-[#B8860B]/30" />
            <span className="text-[9px] tracking-[0.3em] text-[#B8860B]/60">TOGETHER WITH THEIR FAMILIES</span>
            <div className="h-px w-12 bg-[#B8860B]/30" />
          </div>
        </div>
        <div>
          <p className="text-3xl text-[#3A2A1A]" style={{ fontFamily: "var(--font-great-vibes)" }}>
            {data.partner1 ?? "Partner 1"} <span className="text-[#B8860B]">&</span> {data.partner2 ?? "Partner 2"}
          </p>
          <p className="mt-1 text-[10px] tracking-[0.2em] text-[#8B7355]">REQUEST THE PLEASURE OF YOUR COMPANY</p>
        </div>
        <div>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-[#B8860B]/25" />
            <span className="text-xs text-[#B8860B]/60">♥</span>
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
          {data.partner1 ?? "Partner 1"} <span className="text-[#C09060]">&</span> {data.partner2 ?? "Partner 2"}
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
          <span className="text-xs text-[#8B7355]/40">★</span>
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
/*  Free Card Modal — preview → form → result + download              */
/* ================================================================== */

export function FreeCardModal({ card, onClose }: { card: FreeCard; onClose: () => void }) {
  const [step, setStep] = useState<FlowStep>("preview");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const updateField = useCallback((key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        backgroundColor: null,
        useCORS: true,
      });
      const link = document.createElement("a");
      link.download = `${card.id}-card.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {
      // fallback: alert
    }
    setDownloading(false);
  }, [card.id]);

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

        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-[#6B6560] transition-colors hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10">
          <X className="h-4 w-4" />
        </button>

        <AnimatePresence mode="wait">
          {/* STEP 1: PREVIEW */}
          {step === "preview" && (
            <motion.div key="preview" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6">
              <p className="text-xs font-medium uppercase tracking-wider text-[#8B8580]">{card.type}</p>
              <h2 className="mt-1 text-xl font-bold text-[#1A1A1A] dark:text-[#F0E8D8]" style={{ fontFamily: "var(--font-playfair)" }}>
                {card.title} Template
              </h2>
              <p className="mt-1 text-sm text-[#6B6560] dark:text-[#A09888]">{card.description}</p>

              <div className="mt-6">
                <RenderedCard id={card.id} data={{}} />
              </div>

              <Button
                onClick={() => setStep("form")}
                className="mt-6 w-full gap-2 bg-gradient-to-r from-[#B8860B] to-[#D4A843] text-white hover:from-[#9A7209] hover:to-[#B8960B]"
              >
                Try It Free <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {/* STEP 2: FORM */}
          {step === "form" && (
            <motion.div key="form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6">
              <button onClick={() => setStep("preview")} className="mb-3 flex items-center gap-1 text-xs text-[#8B8580] transition-colors hover:text-[#6B6560]">
                <ArrowLeft className="h-3 w-3" /> Back
              </button>
              <h2 className="text-xl font-bold text-[#1A1A1A] dark:text-[#F0E8D8]" style={{ fontFamily: "var(--font-playfair)" }}>
                Enter Your Details
              </h2>
              <p className="mt-1 text-sm text-[#6B6560] dark:text-[#A09888]">Fill in the fields below to generate your card</p>

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

          {/* STEP 3: RESULT + DOWNLOAD */}
          {step === "result" && (
            <motion.div key="result" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6">
              <button onClick={() => setStep("form")} className="mb-3 flex items-center gap-1 text-xs text-[#8B8580] transition-colors hover:text-[#6B6560]">
                <ArrowLeft className="h-3 w-3" /> Edit Details
              </button>
              <h2 className="text-xl font-bold text-[#1A1A1A] dark:text-[#F0E8D8]" style={{ fontFamily: "var(--font-playfair)" }}>
                Your Card is Ready!
              </h2>
              <p className="mt-1 text-sm text-[#6B6560] dark:text-[#A09888]">Download your card or edit the details</p>

              <div className="mt-6" ref={cardRef}>
                <RenderedCard id={card.id} data={formData} />
              </div>

              <div className="mt-6 flex gap-3">
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
