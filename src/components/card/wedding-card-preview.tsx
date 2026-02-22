"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import {
  type WeddingCardTemplate,
  getWeddingCardTemplate,
  weddingCardTemplates,
} from "@/lib/templates/wedding-card-templates";

export interface WeddingCardData {
  groomName?: string | null;
  brideName?: string | null;
  weddingDate?: string | null;
  venue?: string | null;
  brideParentNames?: string | null;
  groomParentNames?: string | null;
  deceasedElders?: string | null;
}

interface WeddingCardPreviewProps {
  data: WeddingCardData;
  templateId?: string | null;
  orientation?: "horizontal" | "vertical";
  size?: "standard" | "large";
  /** When true, renders just the card without padding, shadow, or entry animation (for use inside FlippableCard) */
  bare?: boolean;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return "Date TBD";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function culturalHeader(template: WeddingCardTemplate): string {
  if (template.hasGurbani) return "Ik Onkar Satnam";
  if (template.hasHindu) return "Shubh Vivah";
  return "Together with their families";
}

// ─── Layout: ORNATE ──────────────────────────────────────────────────────────
// Cormorant Garamond heading + Great Vibes script
// Luxury/gold feel with decorative double-border frame and ornamental details.

function OrnateVertical({
  template,
  data,
}: {
  template: WeddingCardTemplate;
  data: WeddingCardData;
}) {
  const { primary, secondary, accent, text } = template.colors;
  const groom = data.groomName ?? "Groom";
  const bride = data.brideName ?? "Bride";

  return (
    <div
      className="relative flex h-full flex-col items-center justify-between overflow-hidden"
      style={{
        background: `linear-gradient(160deg, ${primary}, ${secondary})`,
        color: text,
        padding: "12px",
      }}
    >
      {/* Outer decorative frame */}
      <div
        className="pointer-events-none absolute inset-[6px] rounded-sm"
        style={{ border: `2px solid ${accent}33` }}
      />
      {/* Inner decorative frame */}
      <div
        className="pointer-events-none absolute inset-[11px] rounded-sm"
        style={{ border: `1px solid ${accent}22` }}
      />

      {/* Diamond at top center */}
      <div className="relative z-10 flex flex-col items-center pt-2">
        <div
          className="mb-1 h-2 w-2 rotate-45"
          style={{ backgroundColor: accent, opacity: 0.7 }}
        />
        <p
          className="text-center uppercase"
          style={{
            fontFamily: template.fonts.body,
            fontSize: "6px",
            letterSpacing: "3px",
            opacity: 0.65,
          }}
        >
          {culturalHeader(template)}
        </p>
      </div>

      {/* Couple names */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-0">
        <p
          className="text-center leading-tight"
          style={{
            fontFamily: template.fonts.heading,
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          {groom}
        </p>

        {/* Ornamental lines + "&" */}
        <div className="my-1 flex w-full flex-col items-center gap-0.5">
          <div
            className="h-[1px] w-10"
            style={{ backgroundColor: accent, opacity: 0.5 }}
          />
          <p
            className="leading-none"
            style={{
              fontFamily: template.fonts.script,
              fontSize: "15px",
              color: accent,
            }}
          >
            &amp;
          </p>
          <div
            className="h-[1px] w-10"
            style={{ backgroundColor: accent, opacity: 0.5 }}
          />
        </div>

        <p
          className="text-center leading-tight"
          style={{
            fontFamily: template.fonts.heading,
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          {bride}
        </p>
      </div>

      {/* Date + venue + parents */}
      <div className="relative z-10 flex w-full flex-col items-center gap-0.5 pb-2">
        <p
          className="text-center font-semibold"
          style={{ fontFamily: template.fonts.body, fontSize: "7px" }}
        >
          {formatDate(data.weddingDate)}
        </p>
        <p
          className="text-center italic"
          style={{
            fontFamily: template.fonts.body,
            fontSize: "6px",
            opacity: 0.7,
          }}
        >
          {data.venue ?? "Venue TBD"}
        </p>
        {data.groomParentNames && (
          <p
            className="text-center"
            style={{
              fontFamily: template.fonts.body,
              fontSize: "5.5px",
              opacity: 0.5,
            }}
          >
            S/o {data.groomParentNames}
          </p>
        )}
        {data.brideParentNames && (
          <p
            className="text-center"
            style={{
              fontFamily: template.fonts.body,
              fontSize: "5.5px",
              opacity: 0.5,
            }}
          >
            D/o {data.brideParentNames}
          </p>
        )}
      </div>

      {/* Watermark */}
      <p
        className="absolute right-2 bottom-1"
        style={{ fontSize: "5px", opacity: 0.2, color: text }}
      >
        cardora
      </p>
    </div>
  );
}

function OrnateHorizontal({
  template,
  data,
}: {
  template: WeddingCardTemplate;
  data: WeddingCardData;
}) {
  const { primary, secondary, accent, text } = template.colors;
  const groom = data.groomName ?? "Groom";
  const bride = data.brideName ?? "Bride";

  return (
    <div
      className="relative flex h-full overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${primary}, ${secondary})`,
        color: text,
      }}
    >
      {/* Outer frame */}
      <div
        className="pointer-events-none absolute inset-[5px] rounded-sm"
        style={{ border: `2px solid ${accent}33` }}
      />
      <div
        className="pointer-events-none absolute inset-[9px] rounded-sm"
        style={{ border: `1px solid ${accent}22` }}
      />

      {/* Left — names */}
      <div className="relative z-10 flex w-[52%] flex-col items-center justify-center px-4">
        <div
          className="mb-1 h-2 w-2 rotate-45"
          style={{ backgroundColor: accent, opacity: 0.7 }}
        />
        <p
          className="text-center uppercase"
          style={{
            fontFamily: template.fonts.body,
            fontSize: "5px",
            letterSpacing: "2px",
            opacity: 0.65,
          }}
        >
          {culturalHeader(template)}
        </p>
        <div className="mt-1.5 flex flex-col items-center">
          <p
            className="text-center leading-tight"
            style={{
              fontFamily: template.fonts.heading,
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            {groom}
          </p>
          <div className="my-0.5 flex flex-col items-center gap-0.5">
            <div
              className="h-[1px] w-8"
              style={{ backgroundColor: accent, opacity: 0.5 }}
            />
            <p
              style={{
                fontFamily: template.fonts.script,
                fontSize: "12px",
                color: accent,
                lineHeight: 1,
              }}
            >
              &amp;
            </p>
            <div
              className="h-[1px] w-8"
              style={{ backgroundColor: accent, opacity: 0.5 }}
            />
          </div>
          <p
            className="text-center leading-tight"
            style={{
              fontFamily: template.fonts.heading,
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            {bride}
          </p>
        </div>
      </div>

      {/* Ornamental vertical divider */}
      <div className="relative z-10 flex flex-col items-center justify-center py-4">
        <div
          className="h-full w-[1px]"
          style={{ backgroundColor: accent, opacity: 0.3 }}
        />
      </div>

      {/* Right — details */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-3 text-center">
        <p
          className="font-semibold"
          style={{ fontFamily: template.fonts.body, fontSize: "7px" }}
        >
          {formatDate(data.weddingDate)}
        </p>
        <div
          className="my-1 h-[1px] w-8"
          style={{ backgroundColor: accent, opacity: 0.4 }}
        />
        <p
          className="italic"
          style={{
            fontFamily: template.fonts.body,
            fontSize: "6px",
            opacity: 0.7,
          }}
        >
          {data.venue ?? "Venue TBD"}
        </p>
        {data.groomParentNames && (
          <p
            className="mt-1"
            style={{
              fontFamily: template.fonts.body,
              fontSize: "5.5px",
              opacity: 0.5,
            }}
          >
            S/o {data.groomParentNames}
          </p>
        )}
        {data.brideParentNames && (
          <p
            style={{
              fontFamily: template.fonts.body,
              fontSize: "5.5px",
              opacity: 0.5,
            }}
          >
            D/o {data.brideParentNames}
          </p>
        )}
      </div>

      {/* Watermark */}
      <p
        className="absolute right-2 bottom-1"
        style={{ fontSize: "5px", opacity: 0.2, color: text }}
      >
        cardora
      </p>
    </div>
  );
}

// ─── Layout: CLASSIC ─────────────────────────────────────────────────────────
// Cinzel heading + Lora body
// Traditional Indian feel — single border frame, wide letter-spacing, serif details.

function ClassicVertical({
  template,
  data,
}: {
  template: WeddingCardTemplate;
  data: WeddingCardData;
}) {
  const { primary, secondary, accent, text } = template.colors;
  const groom = data.groomName ?? "Groom";
  const bride = data.brideName ?? "Bride";

  return (
    <div
      className="relative flex h-full flex-col items-center justify-between overflow-hidden"
      style={{
        background: `linear-gradient(150deg, ${primary}, ${secondary})`,
        color: text,
        padding: "14px 12px",
      }}
    >
      {/* Single border frame */}
      <div
        className="pointer-events-none absolute inset-[7px]"
        style={{ border: `1px solid ${accent}4D` }}
      />

      {/* Cultural header */}
      <div className="relative z-10 flex flex-col items-center pt-1">
        <p
          className="text-center uppercase"
          style={{
            fontFamily: template.fonts.heading,
            fontSize: "6px",
            letterSpacing: "5px",
            opacity: 0.75,
          }}
        >
          {culturalHeader(template)}
        </p>
        <div
          className="mt-1 h-[1px] w-12"
          style={{ backgroundColor: accent, opacity: 0.4 }}
        />
      </div>

      {/* Couple names */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-1">
        <p
          className="text-center uppercase leading-tight"
          style={{
            fontFamily: template.fonts.heading,
            fontSize: "16px",
            fontWeight: 700,
            letterSpacing: "1px",
          }}
        >
          {groom}
        </p>

        {/* Three-dot ornament */}
        <p
          className="text-center"
          style={{
            color: accent,
            fontSize: "10px",
            letterSpacing: "5px",
            lineHeight: 1,
          }}
        >
          ···
        </p>

        <p
          className="text-center uppercase leading-tight"
          style={{
            fontFamily: template.fonts.heading,
            fontSize: "16px",
            fontWeight: 700,
            letterSpacing: "1px",
          }}
        >
          {bride}
        </p>
      </div>

      {/* Divider + details */}
      <div className="relative z-10 flex w-full flex-col items-center gap-0.5 pb-1">
        <div
          className="mb-1 h-[1px] w-full"
          style={{ backgroundColor: accent, opacity: 0.3 }}
        />
        <p
          className="text-center"
          style={{
            fontFamily: template.fonts.body,
            fontSize: "7px",
            fontWeight: 600,
          }}
        >
          {formatDate(data.weddingDate)}
        </p>
        <p
          className="text-center"
          style={{
            fontFamily: template.fonts.body,
            fontSize: "6px",
            opacity: 0.7,
          }}
        >
          {data.venue ?? "Venue TBD"}
        </p>
        {data.groomParentNames && (
          <p
            className="text-center"
            style={{
              fontFamily: template.fonts.body,
              fontSize: "5.5px",
              opacity: 0.55,
            }}
          >
            Son of {data.groomParentNames}
          </p>
        )}
        {data.brideParentNames && (
          <p
            className="text-center"
            style={{
              fontFamily: template.fonts.body,
              fontSize: "5.5px",
              opacity: 0.55,
            }}
          >
            Daughter of {data.brideParentNames}
          </p>
        )}
      </div>

      {/* Watermark */}
      <p
        className="absolute right-2 bottom-1"
        style={{ fontSize: "5px", opacity: 0.2, color: text }}
      >
        cardora
      </p>
    </div>
  );
}

function ClassicHorizontal({
  template,
  data,
}: {
  template: WeddingCardTemplate;
  data: WeddingCardData;
}) {
  const { primary, secondary, accent, text } = template.colors;
  const groom = data.groomName ?? "Groom";
  const bride = data.brideName ?? "Bride";

  return (
    <div
      className="relative flex h-full overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${primary}, ${secondary})`,
        color: text,
      }}
    >
      {/* Single border frame */}
      <div
        className="pointer-events-none absolute inset-[6px]"
        style={{ border: `1px solid ${accent}4D` }}
      />

      {/* Left — names in frame */}
      <div className="relative z-10 flex w-[50%] flex-col items-center justify-center px-4">
        <p
          className="text-center uppercase"
          style={{
            fontFamily: template.fonts.heading,
            fontSize: "5px",
            letterSpacing: "4px",
            opacity: 0.7,
          }}
        >
          {culturalHeader(template)}
        </p>
        <div
          className="my-1 h-[1px] w-10"
          style={{ backgroundColor: accent, opacity: 0.4 }}
        />
        <p
          className="text-center uppercase leading-tight"
          style={{
            fontFamily: template.fonts.heading,
            fontSize: "13px",
            fontWeight: 700,
          }}
        >
          {groom}
        </p>
        <p
          className="text-center"
          style={{
            color: accent,
            fontSize: "9px",
            letterSpacing: "4px",
            lineHeight: 1.2,
          }}
        >
          ···
        </p>
        <p
          className="text-center uppercase leading-tight"
          style={{
            fontFamily: template.fonts.heading,
            fontSize: "13px",
            fontWeight: 700,
          }}
        >
          {bride}
        </p>
      </div>

      {/* Divider */}
      <div
        className="relative z-10 self-stretch"
        style={{
          width: "1px",
          backgroundColor: accent,
          opacity: 0.25,
          margin: "12px 0",
        }}
      />

      {/* Right — details */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-3 text-center">
        <p
          className="font-semibold"
          style={{ fontFamily: template.fonts.body, fontSize: "7px" }}
        >
          {formatDate(data.weddingDate)}
        </p>
        <div
          className="my-1 h-[1px] w-8"
          style={{ backgroundColor: accent, opacity: 0.3 }}
        />
        <p
          style={{ fontFamily: template.fonts.body, fontSize: "6px", opacity: 0.7 }}
        >
          {data.venue ?? "Venue TBD"}
        </p>
        {data.groomParentNames && (
          <p
            className="mt-1"
            style={{
              fontFamily: template.fonts.body,
              fontSize: "5.5px",
              opacity: 0.55,
            }}
          >
            Son of {data.groomParentNames}
          </p>
        )}
        {data.brideParentNames && (
          <p
            style={{
              fontFamily: template.fonts.body,
              fontSize: "5.5px",
              opacity: 0.55,
            }}
          >
            Daughter of {data.brideParentNames}
          </p>
        )}
      </div>

      {/* Watermark */}
      <p
        className="absolute right-2 bottom-1"
        style={{ fontSize: "5px", opacity: 0.2, color: text }}
      >
        cardora
      </p>
    </div>
  );
}

// ─── Layout: ROMANTIC ────────────────────────────────────────────────────────
// Playfair Display heading + Great Vibes script
// Airy, soft, no hard borders — large script "&" as hero element.

function RomanticVertical({
  template,
  data,
}: {
  template: WeddingCardTemplate;
  data: WeddingCardData;
}) {
  const { primary, secondary, accent, text } = template.colors;
  const groom = data.groomName ?? "Groom";
  const bride = data.brideName ?? "Bride";

  return (
    <div
      className="relative flex h-full flex-col items-center justify-between overflow-hidden"
      style={{
        background: `linear-gradient(170deg, ${primary}EE, ${secondary}DD)`,
        color: text,
        padding: "12px 14px",
      }}
    >
      {/* Cultural header — airy, very light */}
      <div className="relative z-10 flex flex-col items-center pt-1">
        <p
          className="text-center uppercase"
          style={{
            fontFamily: template.fonts.body,
            fontSize: "6px",
            letterSpacing: "3px",
            opacity: 0.5,
          }}
        >
          {culturalHeader(template)}
        </p>
      </div>

      {/* Hero section — names + large "&" */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
        {/* Groom name above */}
        <p
          className="text-center italic leading-tight"
          style={{
            fontFamily: template.fonts.heading,
            fontSize: "13px",
            fontStyle: "italic",
          }}
        >
          {groom}
        </p>

        {/* Thin hairline */}
        <div
          className="my-0.5 h-[0.5px] w-8"
          style={{ backgroundColor: text, opacity: 0.2 }}
        />

        {/* Large flourishing "&" — the hero element */}
        <p
          className="leading-none"
          style={{
            fontFamily: template.fonts.script,
            fontSize: "20px",
            color: accent,
            lineHeight: 1.1,
          }}
        >
          &amp;
        </p>

        {/* Thin hairline */}
        <div
          className="my-0.5 h-[0.5px] w-8"
          style={{ backgroundColor: text, opacity: 0.2 }}
        />

        {/* Bride name below */}
        <p
          className="text-center italic leading-tight"
          style={{
            fontFamily: template.fonts.heading,
            fontSize: "13px",
            fontStyle: "italic",
          }}
        >
          {bride}
        </p>
      </div>

      {/* Details — soft and light */}
      <div className="relative z-10 flex w-full flex-col items-center gap-0.5 pb-1">
        <p
          className="text-center"
          style={{
            fontFamily: template.fonts.body,
            fontSize: "7px",
            fontWeight: 300,
          }}
        >
          {formatDate(data.weddingDate)}
        </p>
        <p
          className="text-center"
          style={{
            fontFamily: template.fonts.body,
            fontSize: "6px",
            opacity: 0.65,
          }}
        >
          {data.venue ?? "Venue TBD"}
        </p>
        {data.groomParentNames && (
          <p
            className="text-center italic"
            style={{
              fontFamily: template.fonts.body,
              fontSize: "5.5px",
              opacity: 0.45,
            }}
          >
            {data.groomParentNames}
          </p>
        )}
        {data.brideParentNames && (
          <p
            className="text-center italic"
            style={{
              fontFamily: template.fonts.body,
              fontSize: "5.5px",
              opacity: 0.45,
            }}
          >
            {data.brideParentNames}
          </p>
        )}
      </div>

      {/* Watermark */}
      <p
        className="absolute right-2 bottom-1"
        style={{ fontSize: "5px", opacity: 0.2, color: text }}
      >
        cardora
      </p>
    </div>
  );
}

function RomanticHorizontal({
  template,
  data,
}: {
  template: WeddingCardTemplate;
  data: WeddingCardData;
}) {
  const { primary, secondary, accent, text } = template.colors;
  const groom = data.groomName ?? "Groom";
  const bride = data.brideName ?? "Bride";

  return (
    <div
      className="relative flex h-full overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${primary}EE, ${secondary}DD)`,
        color: text,
      }}
    >
      {/* Left — names + large "&" */}
      <div className="relative z-10 flex w-[48%] flex-col items-center justify-center px-3">
        <p
          className="text-center uppercase"
          style={{
            fontFamily: template.fonts.body,
            fontSize: "5px",
            letterSpacing: "2px",
            opacity: 0.5,
          }}
        >
          {culturalHeader(template)}
        </p>
        <div className="mt-1 flex flex-col items-center">
          <p
            className="text-center italic leading-tight"
            style={{ fontFamily: template.fonts.heading, fontSize: "12px" }}
          >
            {groom}
          </p>
          <div
            className="my-0.5 h-[0.5px] w-6"
            style={{ backgroundColor: text, opacity: 0.2 }}
          />
          <p
            style={{
              fontFamily: template.fonts.script,
              fontSize: "18px",
              color: accent,
              lineHeight: 1,
            }}
          >
            &amp;
          </p>
          <div
            className="my-0.5 h-[0.5px] w-6"
            style={{ backgroundColor: text, opacity: 0.2 }}
          />
          <p
            className="text-center italic leading-tight"
            style={{ fontFamily: template.fonts.heading, fontSize: "12px" }}
          >
            {bride}
          </p>
        </div>
      </div>

      {/* Right — flowing details */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-3 text-center">
        <p
          style={{
            fontFamily: template.fonts.body,
            fontSize: "7px",
            fontWeight: 300,
          }}
        >
          {formatDate(data.weddingDate)}
        </p>
        <div
          className="my-1 h-[0.5px] w-8"
          style={{ backgroundColor: text, opacity: 0.2 }}
        />
        <p
          style={{
            fontFamily: template.fonts.body,
            fontSize: "6px",
            opacity: 0.65,
          }}
        >
          {data.venue ?? "Venue TBD"}
        </p>
        {data.groomParentNames && (
          <p
            className="mt-1 italic"
            style={{
              fontFamily: template.fonts.body,
              fontSize: "5.5px",
              opacity: 0.45,
            }}
          >
            {data.groomParentNames}
          </p>
        )}
        {data.brideParentNames && (
          <p
            className="italic"
            style={{
              fontFamily: template.fonts.body,
              fontSize: "5.5px",
              opacity: 0.45,
            }}
          >
            {data.brideParentNames}
          </p>
        )}
      </div>

      {/* Watermark */}
      <p
        className="absolute right-2 bottom-1"
        style={{ fontSize: "5px", opacity: 0.2, color: text }}
      >
        cardora
      </p>
    </div>
  );
}

// ─── Layout: REGAL ───────────────────────────────────────────────────────────
// Cinzel heading + Cormorant body
// Formal, commanding — strong accent bars, all-caps, structured layout.

function RegalVertical({
  template,
  data,
}: {
  template: WeddingCardTemplate;
  data: WeddingCardData;
}) {
  const { primary, secondary, accent, text } = template.colors;
  const groom = data.groomName ?? "Groom";
  const bride = data.brideName ?? "Bride";

  return (
    <div
      className="relative flex h-full flex-col overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${primary}, ${secondary})`,
        color: text,
      }}
    >
      {/* Top accent bar */}
      <div style={{ height: "3px", backgroundColor: accent, width: "100%" }} />
      {/* Thin line below top bar */}
      <div
        style={{
          height: "0.5px",
          backgroundColor: accent,
          width: "100%",
          opacity: 0.4,
          marginTop: "2px",
        }}
      />

      {/* Cultural header */}
      <div className="flex flex-col items-center pt-2">
        <p
          className="text-center uppercase"
          style={{
            fontFamily: template.fonts.heading,
            fontSize: "6px",
            letterSpacing: "4px",
            opacity: 0.8,
          }}
        >
          {culturalHeader(template)}
        </p>
      </div>

      {/* Couple names */}
      <div className="flex flex-1 flex-col items-center justify-center gap-0.5 px-4">
        <p
          className="text-center uppercase leading-tight"
          style={{
            fontFamily: template.fonts.heading,
            fontSize: "17px",
            letterSpacing: "3px",
          }}
        >
          {groom}
        </p>
        <p
          className="text-center uppercase"
          style={{
            fontFamily: template.fonts.body,
            fontSize: "7px",
            letterSpacing: "4px",
            opacity: 0.6,
          }}
        >
          and
        </p>
        <p
          className="text-center uppercase leading-tight"
          style={{
            fontFamily: template.fonts.heading,
            fontSize: "17px",
            letterSpacing: "3px",
          }}
        >
          {bride}
        </p>
      </div>

      {/* Horizontal rule */}
      <div
        className="mx-auto w-3/4"
        style={{ height: "1px", backgroundColor: accent, opacity: 0.5 }}
      />

      {/* Details */}
      <div className="flex flex-col items-center gap-0.5 px-4 py-2">
        <p
          className="text-center"
          style={{
            fontFamily: template.fonts.body,
            fontSize: "7px",
            fontWeight: 600,
          }}
        >
          {formatDate(data.weddingDate)}
        </p>
        <p
          className="text-center"
          style={{
            fontFamily: template.fonts.body,
            fontSize: "6px",
            opacity: 0.7,
          }}
        >
          {data.venue ?? "Venue TBD"}
        </p>
        {data.groomParentNames && (
          <p
            className="text-center uppercase"
            style={{
              fontFamily: template.fonts.body,
              fontSize: "5px",
              letterSpacing: "1px",
              opacity: 0.5,
            }}
          >
            {data.groomParentNames}
          </p>
        )}
        {data.brideParentNames && (
          <p
            className="text-center uppercase"
            style={{
              fontFamily: template.fonts.body,
              fontSize: "5px",
              letterSpacing: "1px",
              opacity: 0.5,
            }}
          >
            {data.brideParentNames}
          </p>
        )}
      </div>

      {/* Thin line above bottom bar */}
      <div
        style={{
          height: "0.5px",
          backgroundColor: accent,
          width: "100%",
          opacity: 0.4,
          marginBottom: "2px",
        }}
      />
      {/* Bottom accent bar */}
      <div style={{ height: "3px", backgroundColor: accent, width: "100%" }} />

      {/* Watermark */}
      <p
        className="absolute right-2 bottom-2"
        style={{ fontSize: "5px", opacity: 0.2, color: text }}
      >
        cardora
      </p>
    </div>
  );
}

function RegalHorizontal({
  template,
  data,
}: {
  template: WeddingCardTemplate;
  data: WeddingCardData;
}) {
  const { primary, secondary, accent, text } = template.colors;
  const groom = data.groomName ?? "Groom";
  const bride = data.brideName ?? "Bride";

  return (
    <div
      className="relative flex h-full flex-col overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${primary}, ${secondary})`,
        color: text,
      }}
    >
      {/* Top accent bar */}
      <div style={{ height: "3px", backgroundColor: accent, width: "100%" }} />
      <div
        style={{
          height: "0.5px",
          backgroundColor: accent,
          width: "100%",
          opacity: 0.4,
          marginTop: "2px",
        }}
      />

      {/* Content */}
      <div className="flex flex-1 items-center justify-center gap-0">
        {/* Names */}
        <div className="flex flex-col items-center justify-center px-5">
          <p
            className="text-center uppercase"
            style={{
              fontFamily: template.fonts.heading,
              fontSize: "5.5px",
              letterSpacing: "3px",
              opacity: 0.75,
            }}
          >
            {culturalHeader(template)}
          </p>
          <div className="mt-1.5 flex flex-col items-center">
            <p
              className="text-center uppercase leading-tight"
              style={{
                fontFamily: template.fonts.heading,
                fontSize: "13px",
                letterSpacing: "2px",
              }}
            >
              {groom}
            </p>
            <p
              className="text-center uppercase"
              style={{
                fontFamily: template.fonts.body,
                fontSize: "6px",
                letterSpacing: "3px",
                opacity: 0.6,
              }}
            >
              and
            </p>
            <p
              className="text-center uppercase leading-tight"
              style={{
                fontFamily: template.fonts.heading,
                fontSize: "13px",
                letterSpacing: "2px",
              }}
            >
              {bride}
            </p>
          </div>
        </div>

        {/* Vertical rule */}
        <div
          className="self-stretch"
          style={{
            width: "1px",
            backgroundColor: accent,
            opacity: 0.4,
            margin: "8px 0",
          }}
        />

        {/* Details */}
        <div className="flex flex-col items-center justify-center px-5 text-center">
          <p
            style={{ fontFamily: template.fonts.body, fontSize: "7px", fontWeight: 600 }}
          >
            {formatDate(data.weddingDate)}
          </p>
          <div
            className="my-1 w-8"
            style={{ height: "1px", backgroundColor: accent, opacity: 0.4 }}
          />
          <p
            style={{
              fontFamily: template.fonts.body,
              fontSize: "6px",
              opacity: 0.7,
            }}
          >
            {data.venue ?? "Venue TBD"}
          </p>
          {data.groomParentNames && (
            <p
              className="mt-1 uppercase"
              style={{
                fontFamily: template.fonts.body,
                fontSize: "5px",
                letterSpacing: "1px",
                opacity: 0.5,
              }}
            >
              {data.groomParentNames}
            </p>
          )}
          {data.brideParentNames && (
            <p
              className="uppercase"
              style={{
                fontFamily: template.fonts.body,
                fontSize: "5px",
                letterSpacing: "1px",
                opacity: 0.5,
              }}
            >
              {data.brideParentNames}
            </p>
          )}
        </div>
      </div>

      {/* Bottom bars */}
      <div
        style={{
          height: "0.5px",
          backgroundColor: accent,
          width: "100%",
          opacity: 0.4,
          marginBottom: "2px",
        }}
      />
      <div style={{ height: "3px", backgroundColor: accent, width: "100%" }} />

      {/* Watermark */}
      <p
        className="absolute right-2 bottom-2"
        style={{ fontSize: "5px", opacity: 0.2, color: text }}
      >
        cardora
      </p>
    </div>
  );
}

// ─── Layout: MODERN ──────────────────────────────────────────────────────────
// Montserrat heading + Raleway body
// Swiss design — clean, minimal, lots of whitespace, light-weight typography.

function ModernVertical({
  template,
  data,
}: {
  template: WeddingCardTemplate;
  data: WeddingCardData;
}) {
  const { primary, secondary, accent, text } = template.colors;
  const groom = data.groomName ?? "Groom";
  const bride = data.brideName ?? "Bride";

  return (
    <div
      className="relative flex h-full flex-col items-center justify-between overflow-hidden"
      style={{
        background: `linear-gradient(160deg, ${primary}, ${secondary})`,
        color: text,
        padding: "14px 16px",
      }}
    >
      {/* Cultural header — very tiny, wide tracking */}
      <div className="relative z-10 flex flex-col items-start w-full pt-1">
        <p
          className="uppercase"
          style={{
            fontFamily: template.fonts.heading,
            fontSize: "6px",
            letterSpacing: "4px",
            opacity: 0.45,
          }}
        >
          {culturalHeader(template)}
        </p>
      </div>

      {/* Couple names — light weight, large */}
      <div className="relative z-10 flex flex-1 flex-col items-start justify-center w-full gap-0.5">
        <p
          className="leading-tight"
          style={{
            fontFamily: template.fonts.heading,
            fontSize: "18px",
            fontWeight: 300,
          }}
        >
          {groom}
        </p>

        {/* Minimal "+" connector */}
        <p
          style={{
            fontFamily: template.fonts.heading,
            fontSize: "10px",
            color: accent,
            fontWeight: 300,
            lineHeight: 1,
          }}
        >
          &amp;
        </p>

        <p
          className="leading-tight"
          style={{
            fontFamily: template.fonts.heading,
            fontSize: "18px",
            fontWeight: 300,
          }}
        >
          {bride}
        </p>

        {/* Single hairline */}
        <div
          className="mt-1 w-full"
          style={{ height: "0.5px", backgroundColor: text, opacity: 0.2 }}
        />
      </div>

      {/* Details — minimal */}
      <div className="relative z-10 flex w-full flex-col items-start gap-0.5 pb-1">
        <p
          style={{
            fontFamily: template.fonts.body,
            fontSize: "9px",
            fontWeight: 500,
          }}
        >
          {formatDate(data.weddingDate)}
        </p>
        <p
          style={{
            fontFamily: template.fonts.body,
            fontSize: "8px",
            fontWeight: 300,
            opacity: 0.65,
          }}
        >
          {data.venue ?? "Venue TBD"}
        </p>
        {data.groomParentNames && (
          <p
            style={{
              fontFamily: template.fonts.body,
              fontSize: "6px",
              fontWeight: 300,
              opacity: 0.45,
            }}
          >
            {data.groomParentNames}
          </p>
        )}
        {data.brideParentNames && (
          <p
            style={{
              fontFamily: template.fonts.body,
              fontSize: "6px",
              fontWeight: 300,
              opacity: 0.45,
            }}
          >
            {data.brideParentNames}
          </p>
        )}
      </div>

      {/* Watermark */}
      <p
        className="absolute right-2 bottom-1"
        style={{ fontSize: "5px", opacity: 0.2, color: text }}
      >
        cardora
      </p>
    </div>
  );
}

function ModernHorizontal({
  template,
  data,
}: {
  template: WeddingCardTemplate;
  data: WeddingCardData;
}) {
  const { primary, secondary, accent, text } = template.colors;
  const groom = data.groomName ?? "Groom";
  const bride = data.brideName ?? "Bride";

  return (
    <div
      className="relative flex h-full overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${primary}, ${secondary})`,
        color: text,
      }}
    >
      {/* Left — names, left-aligned */}
      <div className="relative z-10 flex w-[52%] flex-col justify-center px-5">
        <p
          className="uppercase"
          style={{
            fontFamily: template.fonts.heading,
            fontSize: "5px",
            letterSpacing: "3px",
            opacity: 0.45,
            marginBottom: "4px",
          }}
        >
          {culturalHeader(template)}
        </p>
        <p
          className="leading-tight"
          style={{
            fontFamily: template.fonts.heading,
            fontSize: "14px",
            fontWeight: 300,
          }}
        >
          {groom}
        </p>
        <p
          style={{
            fontFamily: template.fonts.heading,
            fontSize: "9px",
            color: accent,
            fontWeight: 300,
            lineHeight: 1.2,
          }}
        >
          &amp;
        </p>
        <p
          className="leading-tight"
          style={{
            fontFamily: template.fonts.heading,
            fontSize: "14px",
            fontWeight: 300,
          }}
        >
          {bride}
        </p>
      </div>

      {/* Thin vertical hairline */}
      <div
        className="self-stretch"
        style={{
          width: "0.5px",
          backgroundColor: text,
          opacity: 0.18,
          margin: "14px 0",
        }}
      />

      {/* Right — details, right-aligned */}
      <div className="relative z-10 flex flex-1 flex-col items-end justify-center px-5 text-right">
        <p
          style={{
            fontFamily: template.fonts.body,
            fontSize: "8px",
            fontWeight: 500,
          }}
        >
          {formatDate(data.weddingDate)}
        </p>
        <p
          style={{
            fontFamily: template.fonts.body,
            fontSize: "7px",
            fontWeight: 300,
            opacity: 0.65,
          }}
        >
          {data.venue ?? "Venue TBD"}
        </p>
        {data.groomParentNames && (
          <p
            className="mt-1"
            style={{
              fontFamily: template.fonts.body,
              fontSize: "5.5px",
              fontWeight: 300,
              opacity: 0.45,
            }}
          >
            {data.groomParentNames}
          </p>
        )}
        {data.brideParentNames && (
          <p
            style={{
              fontFamily: template.fonts.body,
              fontSize: "5.5px",
              fontWeight: 300,
              opacity: 0.45,
            }}
          >
            {data.brideParentNames}
          </p>
        )}
      </div>

      {/* Watermark */}
      <p
        className="absolute right-2 bottom-1"
        style={{ fontSize: "5px", opacity: 0.2, color: text }}
      >
        cardora
      </p>
    </div>
  );
}

// ─── Dispatch components ──────────────────────────────────────────────────────

export function WeddingLayoutVertical({
  template,
  data,
}: {
  template: WeddingCardTemplate;
  data: WeddingCardData;
}) {
  switch (template.layout) {
    case "ornate":
      return <OrnateVertical template={template} data={data} />;
    case "classic":
      return <ClassicVertical template={template} data={data} />;
    case "romantic":
      return <RomanticVertical template={template} data={data} />;
    case "regal":
      return <RegalVertical template={template} data={data} />;
    case "modern":
      return <ModernVertical template={template} data={data} />;
    default:
      return <OrnateVertical template={template} data={data} />;
  }
}

function WeddingLayoutHorizontal({
  template,
  data,
}: {
  template: WeddingCardTemplate;
  data: WeddingCardData;
}) {
  switch (template.layout) {
    case "ornate":
      return <OrnateHorizontal template={template} data={data} />;
    case "classic":
      return <ClassicHorizontal template={template} data={data} />;
    case "romantic":
      return <RomanticHorizontal template={template} data={data} />;
    case "regal":
      return <RegalHorizontal template={template} data={data} />;
    case "modern":
      return <ModernHorizontal template={template} data={data} />;
    default:
      return <OrnateHorizontal template={template} data={data} />;
  }
}

// ─── Main export ─────────────────────────────────────────────────────────────

// Base dimensions — layouts render at this fixed size (matches "standard").
const WEDDING_BASE_DIMENSIONS = {
  horizontal: { width: 256, height: 160 },
  vertical: { width: 192, height: 288 },
};

export const WEDDING_TARGET_DIMENSIONS = {
  horizontal: {
    standard: { width: 256, height: 160 },
    large: { width: 320, height: 208 },
  },
  vertical: {
    standard: { width: 192, height: 288 },
    large: { width: 240, height: 352 },
  },
};

export const WeddingCardPreview = forwardRef<
  HTMLDivElement,
  WeddingCardPreviewProps
>(function WeddingCardPreview(
  { data, templateId, orientation = "vertical", size = "standard", bare = false },
  ref,
) {
  const template =
    getWeddingCardTemplate(templateId ?? "") ?? weddingCardTemplates[0]!;
  const { primary } = template.colors;

  const base = WEDDING_BASE_DIMENSIONS[orientation];
  const target = WEDDING_TARGET_DIMENSIONS[orientation][size];
  const scaleFactor = target.width / base.width;

  const cardCore = (
    <div
      className={`relative overflow-hidden rounded-xl${bare ? "" : " shadow-lg"}`}
      style={{ width: target.width, height: target.height }}
    >
      <div
        ref={ref}
        style={{
          width: base.width,
          height: base.height,
          transform: `scale(${scaleFactor})`,
          transformOrigin: "top left",
        }}
      >
        {orientation === "horizontal" ? (
          <WeddingLayoutHorizontal template={template} data={data} />
        ) : (
          <WeddingLayoutVertical template={template} data={data} />
        )}
      </div>
    </div>
  );

  // Bare mode — no padding, no shadow card, no entry animation
  if (bare) return cardCore;

  return (
    <div className="flex items-center justify-center p-4">
      <motion.div
        key={`${orientation}-${size}-${template.id}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        {/* Shadow card */}
        <div
          className="absolute top-2 left-2 rounded-xl opacity-30"
          style={{ backgroundColor: primary, width: target.width, height: target.height }}
        />
        {cardCore}
      </motion.div>
    </div>
  );
});
