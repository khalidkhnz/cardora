"use client";

import { QRCodeSVG } from "qrcode.react";
import {
  type BusinessCardTemplate,
  getBusinessCardTemplate,
  businessCardTemplates,
} from "@/lib/templates/business-card-templates";
import { getTextColor, type UserCardData } from "./business-card-preview";

interface BusinessCardBackProps {
  user: UserCardData;
  username?: string | null;
  templateId?: string | null;
  orientation?: "horizontal" | "vertical";
  size?: "standard" | "large";
  targetWidth?: number;
  targetHeight?: number;
}

const BASE_DIMENSIONS = {
  horizontal: { width: 256, height: 160 },
  vertical: { width: 160, height: 256 },
};

function BackLayout({
  template,
  user,
  username,
  textColor,
}: {
  template: BusinessCardTemplate;
  user: UserCardData;
  username?: string | null;
  textColor: string;
}) {
  const { primary, secondary, accent } = template.colors;
  const { heading: headingFont, body: bodyFont } = template.fonts;
  const profileUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/u/${username ?? ""}`
      : `/u/${username ?? ""}`;

  const subtleColor =
    textColor === "#1F2937" ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.55)";

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
        backgroundColor: secondary,
        gap: 4,
      }}
    >
      {/* Decorative accent line at top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          backgroundColor: accent,
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
          value={profileUrl}
          size={48}
          level="M"
          fgColor={primary}
          bgColor="#FFFFFF"
        />
      </div>

      {/* "Scan to connect" label */}
      <p
        style={{
          fontFamily: bodyFont,
          fontSize: 6,
          fontWeight: 500,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: accent,
          margin: 0,
        }}
      >
        Scan to connect
      </p>

      {/* Contact summary */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        {user.email && (
          <p
            style={{
              fontFamily: bodyFont,
              fontSize: 7,
              color: textColor,
              opacity: 0.7,
              margin: 0,
            }}
          >
            {user.email}
          </p>
        )}
        {user.phone && (
          <p
            style={{
              fontFamily: bodyFont,
              fontSize: 7,
              color: textColor,
              opacity: 0.7,
              margin: 0,
            }}
          >
            {user.phone}
          </p>
        )}
      </div>

      {/* Company name */}
      {user.company && (
        <p
          style={{
            fontFamily: headingFont,
            fontSize: 8,
            fontWeight: 600,
            color: textColor,
            margin: 0,
            letterSpacing: "0.04em",
          }}
        >
          {user.company}
        </p>
      )}

      {/* Watermark */}
      <p
        style={{
          position: "absolute",
          right: 4,
          bottom: 2,
          fontSize: 5,
          opacity: 0.28,
          color: subtleColor,
          margin: 0,
          fontFamily: bodyFont,
          letterSpacing: "0.06em",
        }}
      >
        cardora
      </p>

      {/* Decorative accent line at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          backgroundColor: accent,
        }}
      />
    </div>
  );
}

export function BusinessCardBack({
  user,
  username,
  templateId,
  orientation = "horizontal",
  size = "standard",
  targetWidth,
  targetHeight,
}: BusinessCardBackProps) {
  const template =
    getBusinessCardTemplate(templateId ?? "") ?? businessCardTemplates[0]!;
  const { secondary } = template.colors;
  const textColor = getTextColor(secondary);

  const targetDimensions = {
    horizontal: {
      standard: { width: 256, height: 160 },
      large: { width: 320, height: 208 },
    },
    vertical: {
      standard: { width: 160, height: 256 },
      large: { width: 208, height: 320 },
    },
  };

  const base = BASE_DIMENSIONS[orientation];
  const presetTarget = targetDimensions[orientation][size];
  const target = targetWidth && targetHeight
    ? { width: targetWidth, height: targetHeight }
    : presetTarget;
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
          backgroundColor: secondary,
        }}
      >
        <BackLayout
          template={template}
          user={user}
          username={username}
          textColor={textColor}
        />
      </div>
    </div>
  );
}
