"use client";

/* ================================================================== */
/*  Card Cover Previews - realistic mini card designs                 */
/* ================================================================== */

export function FreeCardCover({ id }: { id: string }) {
  if (id === "business") return <BusinessCover />;
  if (id === "wedding") return <WeddingCover />;
  if (id === "engagement") return <EngagementCover />;
  if (id === "anniversary") return <AnniversaryCover />;
  if (id === "qr-contact") return <QRContactCover />;
  if (id === "creative") return <CreativeCover />;
  if (id === "realtor") return <RealtorCover />;
  if (id === "thankyou") return <ThankYouCover />;
  return <BusinessCover />;
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
    <div className="relative flex h-40 flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#EEF4FA] via-[#E4EEF8] to-[#DAE6F2]">
      <div className="flex items-center gap-2">
        <div className="h-px w-8 bg-[#5A8AAE]/30" />
        <span className="text-[8px] tracking-[0.3em] text-[#5A8AAE]/50">TOGETHER WITH THEIR FAMILIES</span>
        <div className="h-px w-8 bg-[#5A8AAE]/30" />
      </div>
      <p className="mt-2 text-lg text-[#2A3A4A]" style={{ fontFamily: "var(--font-great-vibes)" }}>James & Emily</p>
      <p className="mt-0.5 text-[7px] tracking-[0.2em] text-[#5A8AAE]">REQUEST THE PLEASURE OF YOUR COMPANY</p>
      <div className="mt-2 flex items-center gap-2">
        <div className="h-px w-5 bg-[#5A8AAE]/20" />
        <span className="text-[8px] text-[#5A8AAE]/50">♥</span>
        <div className="h-px w-5 bg-[#5A8AAE]/20" />
      </div>
      <p className="mt-1 text-[8px] text-[#4A6A80]/60">September 15, 2026 · The Grand Ballroom</p>
    </div>
  );
}

function EngagementCover() {
  return (
    <div className="relative flex h-40 flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#F0EAF5] via-[#E8E0F0] to-[#DDD4E8]">
      <div className="absolute top-3 left-3 h-12 w-12 rounded-full border border-[#8A6AAE]/15" />
      <div className="absolute right-4 bottom-4 h-8 w-8 rounded-full border border-[#8A6AAE]/10" />
      <p className="text-[8px] tracking-[0.3em] text-[#8A6AAE]/60">SAVE THE DATE</p>
      <p className="mt-1 text-lg text-[#3A2A4A]" style={{ fontFamily: "var(--font-great-vibes)" }}>Michael & Sarah</p>
      <div className="mt-2 flex items-center gap-3">
        <div className="h-px w-10 bg-[#8A6AAE]/25" />
        <p className="text-[9px] font-medium text-[#8A6AAE]">03.10.2026</p>
        <div className="h-px w-10 bg-[#8A6AAE]/25" />
      </div>
      <p className="mt-1.5 text-[7px] tracking-wider text-[#6A4A8A]/40">WE SAID YES!</p>
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

function QRContactCover() {
  return (
    <div className="relative flex h-40 items-center overflow-hidden bg-gradient-to-br from-[#F8F8F8] via-[#FFF] to-[#F0F0F0]">
      <div className="absolute top-0 left-0 h-full w-1 bg-[#D4AF37]" />
      <div className="flex w-full items-center justify-between px-5">
        <div>
          <p className="text-[10px] font-bold tracking-wide text-[#1A1A1A]" style={{ fontFamily: "var(--font-montserrat)" }}>SARAH CHEN</p>
          <p className="text-[7px] tracking-widest text-[#8B8580]">PRODUCT MANAGER</p>
          <div className="mt-3 space-y-1">
            <div className="h-px w-14 bg-[#E8E4DE]" />
            <div className="h-px w-10 bg-[#E8E4DE]" />
          </div>
          <p className="mt-2 text-[6px] text-[#8B8580]">sarah@company.com</p>
        </div>
        <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-[#E8E4DE] bg-white p-1">
          <div className="grid h-full w-full grid-cols-5 grid-rows-5 gap-[1px]">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className={`rounded-[1px] ${[0,1,2,4,5,6,10,12,14,18,20,21,22,24].includes(i) ? "bg-[#1A1A1A]" : "bg-transparent"}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CreativeCover() {
  return (
    <div className="relative flex h-40 flex-col justify-end overflow-hidden bg-gradient-to-br from-[#1A2A2A] via-[#0F2020] to-[#0A1818] p-4">
      <div className="absolute top-4 right-4 h-20 w-20 rounded-full bg-gradient-to-br from-[#4A9E8E]/15 to-[#2E7A6A]/10 blur-xl" />
      <div className="absolute top-8 left-6 h-12 w-12 rounded-full bg-gradient-to-br from-[#5AB89E]/10 to-[#3A8A70]/10 blur-lg" />
      <div className="relative z-10">
        <p className="text-[11px] font-bold tracking-wide text-white" style={{ fontFamily: "var(--font-montserrat)" }}>ALEX RIVERA</p>
        <p className="text-[7px] tracking-widest text-[#5AB89E]">UI/UX DESIGNER</p>
        <p className="mt-2 text-[7px] italic text-white/30">Crafting digital experiences</p>
      </div>
    </div>
  );
}

function RealtorCover() {
  return (
    <div className="relative flex h-40 items-end overflow-hidden bg-gradient-to-br from-[#2A1A1A] via-[#201518] to-[#180F10] p-4">
      <div className="absolute top-0 right-0 h-full w-2/5 bg-gradient-to-l from-[#D4AF37]/8 to-transparent" />
      <div className="absolute top-4 right-4 flex flex-col items-end gap-0.5">
        <div className="h-1 w-8 rounded-full bg-[#D4AF37]/40" />
        <div className="h-1 w-5 rounded-full bg-[#D4AF37]/25" />
        <div className="h-1 w-6 rounded-full bg-[#D4AF37]/30" />
      </div>
      <div className="relative z-10">
        <p className="text-[8px] tracking-widest text-[#D4AF37]/60">PRESTIGE REALTY</p>
        <p className="mt-1 text-[11px] font-bold tracking-wide text-white" style={{ fontFamily: "var(--font-montserrat)" }}>ROBERT WILLIAMS</p>
        <p className="text-[7px] text-white/40">Licensed Real Estate Agent</p>
        <p className="mt-1.5 text-[6px] text-white/30">RE-2024-1234 · +1 555-456-7890</p>
      </div>
    </div>
  );
}

function ThankYouCover() {
  return (
    <div className="relative flex h-40 flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#FFF8F5] via-[#FFF0EB] to-[#FFE8E0]">
      <p className="text-2xl text-[#C07050]" style={{ fontFamily: "var(--font-great-vibes)" }}>Thank You</p>
      <div className="mt-2 flex items-center gap-2">
        <div className="h-px w-10 bg-[#C07050]/20" />
        <span className="text-[8px] text-[#C07050]/40">&#10084;</span>
        <div className="h-px w-10 bg-[#C07050]/20" />
      </div>
      <p className="mt-2 text-[7px] tracking-[0.2em] text-[#C07050]/50">FROM THE JOHNSON FAMILY</p>
      <p className="mt-1 text-[8px] italic text-[#8B6050]/40">For making our day special</p>
    </div>
  );
}
