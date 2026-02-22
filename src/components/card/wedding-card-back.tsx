"use client";

import { QRCodeSVG } from "qrcode.react";
import {
  type WeddingCardTemplate,
  getWeddingCardTemplate,
  weddingCardTemplates,
} from "@/lib/templates/wedding-card-templates";
import type { WeddingCardData } from "./wedding-card-preview";

interface WeddingCardBackProps {
  data: WeddingCardData;
  slug?: string | null;
  templateId?: string | null;
  orientation?: "horizontal" | "vertical";
  size?: "standard" | "large";
}

const WEDDING_BASE_DIMENSIONS = {
  horizontal: { width: 256, height: 160 },
  vertical: { width: 192, height: 288 },
};

function formatShortDate(dateStr?: string | null): string {
  if (!dateStr) return "Date TBD";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function WeddingBackLayout({
  template,
  data,
  slug,
}: {
  template: WeddingCardTemplate;
  data: WeddingCardData;
  slug?: string | null;
}) {
  const { primary, secondary, accent, text } = template.colors;
  const rsvpUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/rsvp/${slug ?? ""}`
      : `/rsvp/${slug ?? ""}`;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        padding: "10px 14px",
        overflow: "hidden",
        background: `linear-gradient(160deg, ${primary}, ${secondary})`,
        color: text,
        gap: 4,
      }}
    >
      {/* Top accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          backgroundColor: accent,
          opacity: 0.8,
        }}
      />

      {/* QR Code */}
      <div
        style={{
          padding: 4,
          backgroundColor: "#FFFFFF",
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <QRCodeSVG
          value={rsvpUrl}
          size={48}
          level="M"
          fgColor={typeof primary === "string" ? primary : "#000000"}
          bgColor="#FFFFFF"
        />
      </div>

      {/* RSVP label */}
      <p
        style={{
          fontFamily: template.fonts.body,
          fontSize: 6,
          fontWeight: 500,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: accent,
          margin: 0,
        }}
      >
        Scan to RSVP
      </p>

      {/* Event details summary */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <p
          style={{
            fontFamily: template.fonts.heading,
            fontSize: 8,
            fontWeight: 600,
            color: text,
            margin: 0,
          }}
        >
          {formatShortDate(data.weddingDate)}
        </p>
        {data.venue && (
          <p
            style={{
              fontFamily: template.fonts.body,
              fontSize: 6,
              color: text,
              opacity: 0.7,
              margin: 0,
              textAlign: "center",
              maxWidth: 140,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {data.venue}
          </p>
        )}
      </div>

      {/* Divider */}
      <div
        style={{
          width: 28,
          height: 0.5,
          backgroundColor: accent,
          opacity: 0.4,
        }}
      />

      {/* Closing message */}
      <p
        style={{
          fontFamily: template.fonts.script,
          fontSize: 8,
          color: accent,
          margin: 0,
          textAlign: "center",
          lineHeight: 1.4,
        }}
      >
        We look forward to
        <br />
        celebrating with you
      </p>

      {/* Watermark */}
      <p
        style={{
          position: "absolute",
          right: 4,
          bottom: 2,
          fontSize: 4,
          opacity: 0.2,
          color: text,
          margin: 0,
        }}
      >
        cardora
      </p>

      {/* Bottom accent */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          backgroundColor: accent,
          opacity: 0.8,
        }}
      />
    </div>
  );
}

export function WeddingCardBack({
  data,
  slug,
  templateId,
  orientation = "vertical",
  size = "standard",
}: WeddingCardBackProps) {
  const template =
    getWeddingCardTemplate(templateId ?? "") ?? weddingCardTemplates[0]!;

  const targetDimensions = {
    horizontal: {
      standard: { width: 256, height: 160 },
      large: { width: 320, height: 208 },
    },
    vertical: {
      standard: { width: 192, height: 288 },
      large: { width: 240, height: 352 },
    },
  };

  const base = WEDDING_BASE_DIMENSIONS[orientation];
  const target = targetDimensions[orientation][size];
  const scaleFactor = target.width / base.width;

  return (
    <div
      style={{
        width: target.width,
        height: target.height,
        overflow: "hidden",
        borderRadius: 12,
      }}
    >
      <div
        style={{
          width: base.width,
          height: base.height,
          transform: `scale(${scaleFactor})`,
          transformOrigin: "top left",
        }}
      >
        <WeddingBackLayout template={template} data={data} slug={slug} />
      </div>
    </div>
  );
}
