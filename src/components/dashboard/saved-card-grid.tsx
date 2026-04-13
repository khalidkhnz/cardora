"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Download, Trash2, Eye, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import html2canvas from "html2canvas-pro";

/* ================================================================== */
/*  Rendered Card Templates (same as free-card-page)                  */
/* ================================================================== */

function RenderedCard({ id, data }: { id: string; data: Record<string, string> }) {
  if (id === "business") return <BusinessCard data={data} />;
  if (id === "wedding") return <WeddingCard data={data} />;
  if (id === "engagement") return <EngagementCard data={data} />;
  if (id === "anniversary") return <AnniversaryCard data={data} />;
  if (id === "qr-contact") return <QRContactCard data={data} />;
  if (id === "creative") return <CreativeCard data={data} />;
  if (id === "realtor") return <RealtorCard data={data} />;
  if (id === "thankyou") return <ThankYouCard data={data} />;
  return <BusinessCard data={data} />;
}

function BusinessCard({ data }: { data: Record<string, string> }) {
  return (
    <div className="aspect-[1.8/1] w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#1A1A1A] via-[#222] to-[#1A1A1A] p-5 shadow-lg">
      <div className="flex h-full flex-col justify-between">
        <div>
          <p className="text-sm font-bold tracking-wide text-white" style={{ fontFamily: "var(--font-montserrat)" }}>{data.name ?? "Name"}</p>
          <p className="text-[10px] tracking-widest text-[#D4AF37]">{(data.title ?? "Title").toUpperCase()}</p>
        </div>
        <div>
          <div className="mb-1.5 h-px w-10 bg-[#D4AF37]/50" />
          <p className="text-[10px] text-white/70">{data.company ?? "Company"}</p>
          <p className="mt-1 text-[8px] text-white/40">{data.email ?? "email"} · {data.phone ?? "phone"}</p>
        </div>
      </div>
    </div>
  );
}

function WeddingCard({ data }: { data: Record<string, string> }) {
  return (
    <div className="aspect-[1/1] w-full overflow-hidden rounded-xl bg-gradient-to-b from-[#EEF4FA] to-[#DAE6F2] p-5 shadow-lg">
      <div className="flex h-full flex-col items-center justify-center text-center">
        <p className="text-lg text-[#2A3A4A]" style={{ fontFamily: "var(--font-great-vibes)" }}>
          {data.partner1 ?? "Partner 1"} <span className="text-[#5A8AAE]">&</span> {data.partner2 ?? "Partner 2"}
        </p>
        <p className="mt-2 text-[9px] text-[#5A8AAE]">{data.date ?? "Date"}</p>
        <p className="text-[8px] text-[#5A8AAE]/60">{data.venue ?? "Venue"}</p>
      </div>
    </div>
  );
}

function EngagementCard({ data }: { data: Record<string, string> }) {
  return (
    <div className="aspect-[1/1] w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#F0EAF5] to-[#DDD4E8] p-5 shadow-lg">
      <div className="flex h-full flex-col items-center justify-center text-center">
        <p className="text-[9px] tracking-[0.3em] text-[#8A6AAE]/60">SAVE THE DATE</p>
        <p className="mt-1 text-lg text-[#3A2A4A]" style={{ fontFamily: "var(--font-great-vibes)" }}>
          {data.partner1 ?? "Partner 1"} <span className="text-[#8A6AAE]">&</span> {data.partner2 ?? "Partner 2"}
        </p>
        <p className="mt-2 text-[10px] text-[#8A6AAE]">{data.date ?? "Date"}</p>
      </div>
    </div>
  );
}

function AnniversaryCard({ data }: { data: Record<string, string> }) {
  return (
    <div className="aspect-[1/1] w-full overflow-hidden rounded-xl bg-gradient-to-b from-[#F5F0EA] to-[#E8E2D8] p-5 shadow-lg">
      <div className="flex h-full flex-col items-center justify-center text-center">
        <p className="text-3xl font-light text-[#8B7355]" style={{ fontFamily: "var(--font-playfair)" }}>{data.years ?? "25"}</p>
        <p className="text-[8px] tracking-[0.3em] text-[#8B7355]/50">YEARS</p>
        <p className="mt-2 text-sm text-[#5A4A35]" style={{ fontFamily: "var(--font-great-vibes)" }}>{data.names ?? "Names"}</p>
      </div>
    </div>
  );
}

function QRContactCard({ data }: { data: Record<string, string> }) {
  return (
    <div className="aspect-[1.8/1] w-full overflow-hidden rounded-xl bg-white p-5 shadow-lg">
      <div className="flex h-full items-center gap-4">
        <div className="h-full w-0.5 rounded-full bg-[#D4AF37]" />
        <div>
          <p className="text-sm font-bold text-[#1A1A1A]" style={{ fontFamily: "var(--font-montserrat)" }}>{data.name ?? "Name"}</p>
          <p className="text-[9px] text-[#8B8580]">{data.title ?? "Title"}</p>
          <p className="mt-2 text-[8px] text-[#6B6560]">{data.email ?? "email"}</p>
        </div>
      </div>
    </div>
  );
}

function CreativeCard({ data }: { data: Record<string, string> }) {
  return (
    <div className="aspect-[1.8/1] w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#1A2A2A] to-[#0A1818] p-5 shadow-lg">
      <div className="flex h-full flex-col justify-end">
        <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-montserrat)" }}>{data.name ?? "Name"}</p>
        <p className="text-[9px] tracking-widest text-[#5AB89E]">{(data.role ?? "Role").toUpperCase()}</p>
        {data.tagline && <p className="mt-1 text-[8px] italic text-white/30">{data.tagline}</p>}
      </div>
    </div>
  );
}

function RealtorCard({ data }: { data: Record<string, string> }) {
  return (
    <div className="aspect-[1.8/1] w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#2A1A1A] to-[#180F10] p-5 shadow-lg">
      <div className="flex h-full flex-col justify-end">
        <p className="text-[8px] tracking-widest text-[#D4AF37]/60">{(data.agency ?? "Agency").toUpperCase()}</p>
        <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-montserrat)" }}>{data.name ?? "Name"}</p>
        <p className="mt-1 text-[8px] text-white/40">{data.phone ?? "phone"}</p>
      </div>
    </div>
  );
}

function ThankYouCard({ data }: { data: Record<string, string> }) {
  return (
    <div className="aspect-[1/1] w-full overflow-hidden rounded-xl bg-gradient-to-b from-[#FFF8F5] to-[#FFE8E0] p-5 shadow-lg">
      <div className="flex h-full flex-col items-center justify-center text-center">
        <p className="text-xl text-[#C07050]" style={{ fontFamily: "var(--font-great-vibes)" }}>Thank You</p>
        {data.from && <p className="mt-2 text-[9px] text-[#C07050]/60">{data.from}</p>}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Card type labels                                                   */
/* ================================================================== */

const CARD_LABELS: Record<string, string> = {
  business: "Business Card",
  wedding: "Wedding Invite",
  engagement: "Engagement Card",
  anniversary: "Anniversary Card",
  "qr-contact": "QR Contact Card",
  creative: "Creative Portfolio",
  realtor: "Real Estate Card",
  thankyou: "Thank You Card",
};

/* ================================================================== */
/*  Main Grid                                                          */
/* ================================================================== */

interface SavedCard {
  id: string;
  cardType: string;
  cardTitle: string;
  cardData: Record<string, string> | null;
  createdAt: Date;
}

export function SavedCardGrid({ cards }: { cards: SavedCard[] }) {
  const [previewCard, setPreviewCard] = useState<SavedCard | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  const handleDownload = useCallback(async (card: SavedCard) => {
    setDownloading(card.id);

    // Create a temporary visible container for html2canvas
    const wrapper = document.createElement("div");
    wrapper.style.cssText = "position:fixed;top:0;left:0;z-index:9999;width:600px;pointer-events:none;";
    document.body.appendChild(wrapper);

    // Create a root and render the card
    const { createRoot } = await import("react-dom/client");
    const root = createRoot(wrapper);
    root.render(<RenderedCard id={card.cardType} data={card.cardData ?? {}} />);

    // Wait for render + fonts
    await new Promise((r) => setTimeout(r, 800));
    await document.fonts.ready;

    const cardEl = wrapper.firstElementChild as HTMLElement;
    if (!cardEl) { cleanup(); return; }

    function cleanup() {
      root.unmount();
      wrapper.remove();
      setDownloading(null);
    }

    try {
      const canvas = await html2canvas(cardEl, {
        scale: 3,
        backgroundColor: null,
        useCORS: true,
        logging: false,
      });
      const link = document.createElement("a");
      link.download = `${card.cardType}-card.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast.success("Card downloaded!");
    } catch {
      toast.error("Download failed");
    }
    cleanup();
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    setDeleting(id);
    try {
      await apiClient(`/api/saved-cards/${id}`, { method: "DELETE" });
      toast.success("Card deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete card");
    }
    setDeleting(null);
  }, [router]);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.id} className="overflow-hidden border-[#E8E4DE] bg-white transition-all hover:shadow-md dark:border-white/10 dark:bg-[#141414]">
            <CardContent className="p-0">
              {/* Card preview */}
              <div className="p-4 pb-0">
                <RenderedCard id={card.cardType} data={card.cardData ?? {}} />
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-[#1A1A1A] dark:text-[#F0E8D8]">{card.cardTitle}</h3>
                    <p className="text-[11px] text-[#8B8580] dark:text-[#706860]">
                      {CARD_LABELS[card.cardType] ?? card.cardType}
                    </p>
                  </div>
                  <span className="rounded-full bg-[#B8860B]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#B8860B]">
                    Free
                  </span>
                </div>
                <p className="mt-1 text-[10px] text-[#8B8580] dark:text-[#706860]">
                  Created {new Date(card.createdAt).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" })}
                </p>

                {/* Actions */}
                <div className="mt-3 flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => void handleDownload(card)}
                    disabled={downloading === card.id}
                    className="flex-1 gap-1.5 bg-[#1A1A1A] text-white hover:bg-[#2A2A2A] dark:bg-white dark:text-[#1A1A1A] dark:hover:bg-white/90"
                  >
                    <Download className="h-3.5 w-3.5" />
                    {downloading === card.id ? "..." : "Download"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setPreviewCard(card)}
                    className="border-[#E8E4DE] text-[#6B6560] hover:bg-[#F3F0EB] dark:border-white/10"
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </Button>
                  <Link href={`/free-cards/${card.cardType}`}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#E8E4DE] text-[#6B6560] hover:bg-[#F3F0EB] dark:border-white/10"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => void handleDelete(card.id)}
                    disabled={deleting === card.id}
                    className="border-[#E8E4DE] text-red-500 hover:bg-red-50 hover:text-red-600 dark:border-white/10 dark:hover:bg-red-950/20"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>


      {/* Download overlay - covers the temp render element */}
      {downloading && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-black/80">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#E8E4DE] border-t-[#D4AF37]" />
            <p className="mt-3 text-sm font-medium text-[#6B6560]">Preparing download...</p>
          </div>
        </div>
      )}

      {/* Preview modal */}
      {previewCard && !downloading && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setPreviewCard(null)}>
          <div className="relative mx-4 w-full max-w-lg overflow-hidden rounded-2xl border border-[#E8E4DE] bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#141414]" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setPreviewCard(null)} className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-[#6B6560] hover:bg-black/10">
              <X className="h-4 w-4" />
            </button>
            <h2 className="text-lg font-bold text-[#1A1A1A] dark:text-[#F0E8D8]" style={{ fontFamily: "var(--font-playfair)" }}>
              {previewCard.cardTitle}
            </h2>
            <p className="text-sm text-[#6B6560]">{CARD_LABELS[previewCard.cardType] ?? previewCard.cardType}</p>
            <div className="mt-4">
              <RenderedCard id={previewCard.cardType} data={previewCard.cardData ?? {}} />
            </div>
            <Button
              onClick={() => void handleDownload(previewCard)}
              className="mt-4 w-full gap-2 bg-gradient-to-r from-[#B8860B] to-[#D4A843] text-white hover:from-[#9A7209] hover:to-[#B8960B]"
            >
              <Download className="h-4 w-4" /> Download Card
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
