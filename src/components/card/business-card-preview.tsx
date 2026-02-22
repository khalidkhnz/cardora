"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import {
  type BusinessCardTemplate,
  getBusinessCardTemplate,
  businessCardTemplates,
} from "@/lib/templates/business-card-templates";

export interface UserCardData {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  company?: string | null;
  profession?: string | null;
  address?: string | null;
  profileImage?: string | null;
}

interface BusinessCardPreviewProps {
  user: UserCardData;
  templateId?: string | null;
  orientation?: "horizontal" | "vertical";
  size?: "standard" | "large";
  /** Override the rendered card width (replaces the preset size). Must be used with targetHeight. */
  targetWidth?: number;
  /** Override the rendered card height (replaces the preset size). Must be used with targetWidth. */
  targetHeight?: number;
  /** When true, renders just the card without padding, shadow, or entry animation (for use inside FlippableCard) */
  bare?: boolean;
}

export function getTextColor(secondaryColor: string) {
  const light = ["#FFFFFF", "#fff", "#FEF3C7", "#D1FAE5", "#F3E8FF", "#F8F6F0", "#FFFBEB", "#FFF1F2", "#F0FDF4", "#FAFAFA"];
  return light.some((c) => c.toLowerCase() === secondaryColor.toLowerCase())
    ? "#1F2937"
    : "#FFFFFF";
}

function getInitials(name?: string | null) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function CardLayout({
  template,
  user,
  textColor,
}: {
  template: BusinessCardTemplate;
  user: UserCardData;
  textColor: string;
}) {
  const { primary, secondary, accent } = template.colors;
  const { heading: headingFont, body: bodyFont } = template.fonts;

  const renderProfileImage = (size = 36, borderColor?: string) => {
    if (user.profileImage) {
      return (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            backgroundImage: `url(${user.profileImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: borderColor ? `1.5px solid ${borderColor}` : undefined,
            flexShrink: 0,
          }}
        />
      );
    }
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          backgroundColor: accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.3,
          fontWeight: 700,
          color: "#FFFFFF",
          fontFamily: headingFont,
          flexShrink: 0,
          border: borderColor ? `1.5px solid ${borderColor}` : undefined,
        }}
      >
        {getInitials(user.name)}
      </div>
    );
  };

  switch (template.layout) {
    // -------------------------------------------------------------------------
    // 1. GEOMETRIC — Bold geometric, Montserrat, strong grid feel
    // -------------------------------------------------------------------------
    case "geometric":
      return (
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            padding: "14px 14px 10px",
            overflow: "hidden",
            backgroundColor: secondary,
          }}
        >
          {/* Large rotated diamond — top-right */}
          <div
            style={{
              position: "absolute",
              top: -28,
              right: -28,
              width: 72,
              height: 72,
              transform: "rotate(45deg)",
              backgroundColor: accent,
              opacity: 0.18,
              borderRadius: 6,
            }}
          />
          {/* Smaller rotated square — bottom-left */}
          <div
            style={{
              position: "absolute",
              bottom: -18,
              left: -18,
              width: 48,
              height: 48,
              transform: "rotate(45deg)",
              backgroundColor: primary,
              opacity: 0.12,
              borderRadius: 4,
            }}
          />
          {/* Corner accent — top-left solid strip */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 4,
              height: "100%",
              backgroundColor: accent,
            }}
          />

          {/* Name + profession */}
          <div style={{ paddingLeft: 8 }}>
            <p
              style={{
                fontFamily: headingFont,
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: "-0.02em",
                color: primary,
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {user.name ?? "Your Name"}
            </p>
            <p
              style={{
                fontFamily: bodyFont,
                fontWeight: 600,
                fontSize: 8,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: accent,
                margin: "3px 0 0",
              }}
            >
              {user.profession ?? "Profession"}
            </p>
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              backgroundColor: primary,
              opacity: 0.15,
              margin: "0 8px",
            }}
          />

          {/* Bottom: company + contact */}
          <div style={{ paddingLeft: 8 }}>
            <p
              style={{
                fontFamily: headingFont,
                fontWeight: 600,
                fontSize: 9,
                color: primary,
                margin: "0 0 3px",
                letterSpacing: "0.04em",
              }}
            >
              {user.company ?? "Company Name"}
            </p>
            <div
              style={{
                fontFamily: bodyFont,
                fontSize: 7.5,
                color: primary,
                opacity: 0.65,
                lineHeight: 1.5,
              }}
            >
              {user.phone && <p style={{ margin: 0 }}>{user.phone}</p>}
              {user.email && <p style={{ margin: 0 }}>{user.email}</p>}
              {user.address && (
                <p
                  style={{
                    margin: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: 160,
                  }}
                >
                  {user.address}
                </p>
              )}
            </div>
          </div>
        </div>
      );

    // -------------------------------------------------------------------------
    // 2. SPLIT — Luxury two-panel, Playfair + Raleway
    // -------------------------------------------------------------------------
    case "split":
      return (
        <div
          style={{
            display: "flex",
            height: "100%",
            overflow: "hidden",
          }}
        >
          {/* Left 40% panel */}
          <div
            style={{
              width: "40%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: accent,
              padding: "10px 8px",
              gap: 6,
            }}
          >
            {renderProfileImage(38, "rgba(255,255,255,0.5)")}
            <p
              style={{
                fontFamily: headingFont,
                fontWeight: 700,
                fontSize: 8.5,
                color: "#FFFFFF",
                textAlign: "center",
                margin: 0,
                lineHeight: 1.3,
                letterSpacing: "0.01em",
              }}
            >
              {user.name ?? "Your Name"}
            </p>
          </div>

          {/* Gold vertical divider */}
          <div
            style={{
              width: 1.5,
              backgroundColor: accent,
              opacity: 0.6,
              flexShrink: 0,
            }}
          />

          {/* Right 60% panel */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "10px 12px",
              gap: 4,
              backgroundColor: secondary,
            }}
          >
            <p
              style={{
                fontFamily: headingFont,
                fontWeight: 700,
                fontStyle: "italic",
                fontSize: 10,
                color: primary,
                margin: 0,
                lineHeight: 1.3,
                letterSpacing: "0.01em",
              }}
            >
              {user.profession ?? "Profession"}
            </p>
            <p
              style={{
                fontFamily: bodyFont,
                fontWeight: 300,
                fontSize: 8.5,
                color: primary,
                opacity: 0.75,
                margin: 0,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {user.company ?? "Company"}
            </p>
            <div
              style={{
                height: 0.5,
                backgroundColor: accent,
                opacity: 0.4,
                margin: "3px 0",
              }}
            />
            <div
              style={{
                fontFamily: bodyFont,
                fontSize: 7.5,
                color: primary,
                opacity: 0.65,
                lineHeight: 1.55,
              }}
            >
              {user.phone && <p style={{ margin: 0 }}>{user.phone}</p>}
              {user.email && <p style={{ margin: 0 }}>{user.email}</p>}
              {user.address && (
                <p
                  style={{
                    margin: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.address}
                </p>
              )}
            </div>
          </div>
        </div>
      );

    // -------------------------------------------------------------------------
    // 3. DARK — Sophisticated dark, DM Serif + Raleway
    // -------------------------------------------------------------------------
    case "dark":
      return (
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            padding: "14px 14px 10px",
            overflow: "hidden",
            background: `linear-gradient(145deg, ${primary} 0%, #0a0f1e 100%)`,
          }}
        >
          {/* Subtle circular gold accent bottom-right */}
          <div
            style={{
              position: "absolute",
              bottom: -30,
              right: -30,
              width: 90,
              height: 90,
              borderRadius: "50%",
              border: `12px solid ${accent}`,
              opacity: 0.12,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -14,
              right: -14,
              width: 50,
              height: 50,
              borderRadius: "50%",
              backgroundColor: accent,
              opacity: 0.08,
            }}
          />

          {/* Top: name */}
          <div>
            <p
              style={{
                fontFamily: headingFont,
                fontWeight: 700,
                fontSize: 14,
                color: "#FFFFFF",
                margin: 0,
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
              }}
            >
              {user.name ?? "Your Name"}
            </p>
            {/* Thin accent line under name */}
            <div
              style={{
                width: 28,
                height: 1.5,
                backgroundColor: accent,
                margin: "5px 0 4px",
              }}
            />
            <p
              style={{
                fontFamily: bodyFont,
                fontWeight: 300,
                fontSize: 9,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: accent,
                margin: 0,
              }}
            >
              {user.profession ?? "Profession"}
            </p>
          </div>

          {/* Bottom: company + contact */}
          <div>
            <p
              style={{
                fontFamily: headingFont,
                fontWeight: 600,
                fontSize: 9,
                color: "rgba(255,255,255,0.85)",
                margin: "0 0 4px",
                letterSpacing: "0.04em",
              }}
            >
              {user.company ?? "Company Name"}
            </p>
            <div
              style={{
                fontFamily: bodyFont,
                fontWeight: 300,
                fontSize: 7.5,
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.55,
              }}
            >
              {user.phone && <p style={{ margin: 0 }}>{user.phone}</p>}
              {user.email && <p style={{ margin: 0 }}>{user.email}</p>}
              {user.address && (
                <p
                  style={{
                    margin: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.address}
                </p>
              )}
            </div>
          </div>
        </div>
      );

    // -------------------------------------------------------------------------
    // 4. GRADIENT — Flowing gradient, Raleway thin, ethereal & airy
    // -------------------------------------------------------------------------
    case "gradient":
      return (
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            padding: "14px 14px 10px",
            overflow: "hidden",
            background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 50%, ${accent} 100%)`,
          }}
        >
          {/* Subtle radial highlight */}
          <div
            style={{
              position: "absolute",
              top: -20,
              left: -20,
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
            }}
          />

          {/* Large thin name */}
          <div>
            <p
              style={{
                fontFamily: headingFont,
                fontWeight: 300,
                fontSize: 16,
                color: "#FFFFFF",
                margin: 0,
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              {user.name ?? "Your Name"}
            </p>
            <p
              style={{
                fontFamily: bodyFont,
                fontWeight: 400,
                fontSize: 8,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.75)",
                margin: "5px 0 0",
              }}
            >
              {user.profession ?? "Profession"}
            </p>
          </div>

          {/* Bottom contact */}
          <div>
            <p
              style={{
                fontFamily: bodyFont,
                fontWeight: 400,
                fontSize: 8.5,
                color: "rgba(255,255,255,0.9)",
                margin: "0 0 2px",
                letterSpacing: "0.04em",
              }}
            >
              {user.company ?? "Company Name"}
            </p>
            <div
              style={{
                fontFamily: bodyFont,
                fontWeight: 300,
                fontSize: 7.5,
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.55,
              }}
            >
              {user.phone && <p style={{ margin: 0 }}>{user.phone}</p>}
              {user.email && <p style={{ margin: 0 }}>{user.email}</p>}
            </div>
          </div>
        </div>
      );

    // -------------------------------------------------------------------------
    // 5. CORPORATE — Professional, Montserrat, clean grid
    // -------------------------------------------------------------------------
    case "corporate":
      return (
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            padding: "16px 14px 10px",
            overflow: "hidden",
            backgroundColor: secondary,
          }}
        >
          {/* 3px accent bar at top */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              backgroundColor: accent,
            }}
          />
          {/* 1px thin line below bar */}
          <div
            style={{
              position: "absolute",
              top: 5,
              left: 0,
              right: 0,
              height: 0.75,
              backgroundColor: primary,
              opacity: 0.1,
            }}
          />

          {/* Profile + name */}
          <div style={{ display: "flex", alignItems: "center", gap: 9, paddingTop: 2 }}>
            {renderProfileImage(34, accent)}
            <div>
              <p
                style={{
                  fontFamily: headingFont,
                  fontWeight: 600,
                  fontSize: 12,
                  color: primary,
                  margin: 0,
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                }}
              >
                {user.name ?? "Your Name"}
              </p>
              <p
                style={{
                  fontFamily: bodyFont,
                  fontWeight: 500,
                  fontSize: 8,
                  color: accent,
                  margin: "2px 0 0",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {user.profession ?? "Profession"}
              </p>
            </div>
          </div>

          {/* Bottom section */}
          <div>
            <div
              style={{
                height: 0.75,
                backgroundColor: primary,
                opacity: 0.12,
                marginBottom: 6,
              }}
            />
            <p
              style={{
                fontFamily: headingFont,
                fontWeight: 700,
                fontSize: 9,
                color: primary,
                margin: "0 0 3px",
                letterSpacing: "0.05em",
              }}
            >
              {user.company ?? "Company Name"}
            </p>
            <div
              style={{
                fontFamily: bodyFont,
                fontSize: 7.5,
                color: primary,
                opacity: 0.6,
                lineHeight: 1.55,
              }}
            >
              {user.phone && <p style={{ margin: 0 }}>{user.phone}</p>}
              {user.email && <p style={{ margin: 0 }}>{user.email}</p>}
              {user.address && (
                <p
                  style={{
                    margin: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.address}
                </p>
              )}
            </div>
          </div>
        </div>
      );

    // -------------------------------------------------------------------------
    // 6. ARTISTIC — Expressive, Lora italic + Montserrat, asymmetric
    // -------------------------------------------------------------------------
    case "artistic":
      return (
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            padding: "12px 12px 10px",
            overflow: "hidden",
            background: `radial-gradient(ellipse at 85% 15%, ${accent}55 0%, transparent 55%), ${secondary}`,
          }}
        >
          {/* Large accent arc — decorative top-right */}
          <div
            style={{
              position: "absolute",
              top: -20,
              right: -20,
              width: 70,
              height: 70,
              borderRadius: "50%",
              border: `8px solid ${accent}`,
              opacity: 0.25,
            }}
          />

          {/* Top: name + company */}
          <div>
            <p
              style={{
                fontFamily: headingFont,
                fontWeight: 700,
                fontStyle: "italic",
                fontSize: 13,
                color: primary,
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {user.name ?? "Your Name"}
            </p>
            <p
              style={{
                fontFamily: bodyFont,
                fontWeight: 400,
                fontSize: 8,
                color: accent,
                margin: "3px 0 0",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {user.company ?? "Company Name"}
            </p>
          </div>

          {/* Bottom: contact left, profile image right */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: headingFont,
                  fontStyle: "italic",
                  fontSize: 9,
                  color: primary,
                  margin: "0 0 3px",
                  opacity: 0.85,
                }}
              >
                {user.profession ?? "Profession"}
              </p>
              <div
                style={{
                  fontFamily: bodyFont,
                  fontSize: 7.5,
                  color: primary,
                  opacity: 0.6,
                  lineHeight: 1.55,
                }}
              >
                {user.phone && <p style={{ margin: 0 }}>{user.phone}</p>}
                {user.email && <p style={{ margin: 0 }}>{user.email}</p>}
              </div>
            </div>
            {renderProfileImage(34, accent)}
          </div>
        </div>
      );

    // -------------------------------------------------------------------------
    // 7. CYBER — Terminal/neon, Source Code Pro, futuristic
    // -------------------------------------------------------------------------
    case "cyber":
      return (
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            padding: "12px 12px 10px",
            overflow: "hidden",
            backgroundColor: "#0A0A0A",
          }}
        >
          {/* Horizontal scanlines */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `repeating-linear-gradient(0deg, ${accent}08, ${accent}08 1px, transparent 1px, transparent 6px)`,
              pointerEvents: "none",
            }}
          />
          {/* Dot grid corner — top-right */}
          <div
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              width: 36,
              height: 36,
              backgroundImage: `radial-gradient(circle, ${accent}55 1px, transparent 1px)`,
              backgroundSize: "6px 6px",
              opacity: 0.5,
            }}
          />

          {/* Top: name */}
          <div>
            <p
              style={{
                fontFamily: headingFont,
                fontWeight: 700,
                fontSize: 12,
                color: secondary,
                margin: 0,
                lineHeight: 1.2,
                letterSpacing: "0.05em",
                textShadow: `0 0 8px ${secondary}88`,
              }}
            >
              {user.name ?? "Your Name"}
            </p>
            <p
              style={{
                fontFamily: bodyFont,
                fontWeight: 400,
                fontSize: 8.5,
                color: accent,
                margin: "4px 0 0",
                letterSpacing: "0.04em",
              }}
            >
              <span style={{ opacity: 0.5 }}>&gt; </span>
              {user.profession ?? "Profession"}
            </p>
          </div>

          {/* Bottom: contact + profile */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                fontFamily: bodyFont,
                fontSize: 7.5,
                color: secondary,
                opacity: 0.55,
                lineHeight: 1.6,
              }}
            >
              {user.company && (
                <p style={{ margin: 0 }}>
                  <span style={{ color: accent, opacity: 0.8 }}>// </span>
                  {user.company}
                </p>
              )}
              {user.phone && (
                <p style={{ margin: 0 }}>
                  <span style={{ color: accent, opacity: 0.8 }}>// </span>
                  {user.phone}
                </p>
              )}
              {user.email && (
                <p style={{ margin: 0 }}>
                  <span style={{ color: accent, opacity: 0.8 }}>// </span>
                  {user.email}
                </p>
              )}
            </div>
            {renderProfileImage(32, accent)}
          </div>
        </div>
      );

    // -------------------------------------------------------------------------
    // 8. ORGANIC — Natural warmth, Lora, soft & warm
    // -------------------------------------------------------------------------
    case "organic":
      return (
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            padding: "12px 14px 10px",
            overflow: "hidden",
            background: `linear-gradient(155deg, ${secondary} 0%, ${secondary}cc 60%, ${accent}22 100%)`,
          }}
        >
          {/* Large teardrop/leaf watermark shape */}
          <div
            style={{
              position: "absolute",
              bottom: -20,
              right: -20,
              width: 80,
              height: 100,
              borderRadius: "50% 50% 50% 0",
              backgroundColor: accent,
              opacity: 0.08,
              transform: "rotate(-30deg)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -8,
              right: -8,
              width: 50,
              height: 64,
              borderRadius: "50% 50% 50% 0",
              border: `2px solid ${accent}`,
              opacity: 0.12,
              transform: "rotate(-30deg)",
            }}
          />

          {/* Top: profile + name */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {renderProfileImage(36, `${accent}88`)}
            <div>
              <p
                style={{
                  fontFamily: headingFont,
                  fontWeight: 700,
                  fontSize: 12,
                  color: primary,
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                {user.name ?? "Your Name"}
              </p>
              <p
                style={{
                  fontFamily: headingFont,
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: 8.5,
                  color: accent,
                  margin: "2px 0 0",
                  letterSpacing: "0.02em",
                }}
              >
                {user.profession ?? "Profession"}
              </p>
            </div>
          </div>

          {/* Curved accent divider */}
          <div
            style={{
              height: 1,
              background: `linear-gradient(to right, ${accent}88, transparent)`,
              borderRadius: 1,
            }}
          />

          {/* Bottom: company + contact */}
          <div>
            <p
              style={{
                fontFamily: headingFont,
                fontWeight: 600,
                fontSize: 9,
                color: primary,
                margin: "0 0 3px",
                opacity: 0.9,
              }}
            >
              {user.company ?? "Company Name"}
            </p>
            <div
              style={{
                fontFamily: bodyFont,
                fontSize: 7.5,
                color: primary,
                opacity: 0.6,
                lineHeight: 1.55,
              }}
            >
              {user.phone && <p style={{ margin: 0 }}>{user.phone}</p>}
              {user.email && <p style={{ margin: 0 }}>{user.email}</p>}
              {user.address && (
                <p
                  style={{
                    margin: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.address}
                </p>
              )}
            </div>
          </div>
        </div>
      );

    // -------------------------------------------------------------------------
    // 9. ROYAL — Ornate regal, Cinzel + Raleway, centered feel
    // -------------------------------------------------------------------------
    case "royal":
      return (
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            padding: "14px 16px",
            overflow: "hidden",
            background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`,
            textAlign: "center",
          }}
        >
          {/* Double lines — top */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
            }}
          >
            <div style={{ height: 3, backgroundColor: accent, opacity: 0.9 }} />
            <div style={{ height: 2 }} />
            <div style={{ height: 0.75, backgroundColor: accent, opacity: 0.4 }} />
          </div>
          {/* Double lines — bottom */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            <div style={{ height: 0.75, backgroundColor: accent, opacity: 0.4 }} />
            <div style={{ height: 2 }} />
            <div style={{ height: 3, backgroundColor: accent, opacity: 0.9 }} />
          </div>

          {/* Centered content */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            {/* Small ornament line */}
            <div
              style={{
                width: 24,
                height: 0.75,
                backgroundColor: accent,
                opacity: 0.7,
              }}
            />
            <p
              style={{
                fontFamily: headingFont,
                fontWeight: 700,
                fontSize: 11,
                color: accent,
                margin: 0,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                lineHeight: 1.3,
              }}
            >
              {user.name ?? "Your Name"}
            </p>
            <div
              style={{
                width: 24,
                height: 0.75,
                backgroundColor: accent,
                opacity: 0.7,
              }}
            />
            <p
              style={{
                fontFamily: bodyFont,
                fontWeight: 300,
                fontSize: 7.5,
                color: accent,
                opacity: 0.8,
                margin: "1px 0 0",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              {user.profession ?? "Profession"}
            </p>
            <p
              style={{
                fontFamily: bodyFont,
                fontWeight: 400,
                fontSize: 8,
                color: "rgba(255,255,255,0.7)",
                margin: "1px 0 0",
                letterSpacing: "0.06em",
              }}
            >
              {user.company ?? "Company Name"}
            </p>
            <div
              style={{
                marginTop: 4,
                fontFamily: bodyFont,
                fontWeight: 300,
                fontSize: 7,
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.6,
              }}
            >
              {user.phone && <p style={{ margin: 0 }}>{user.phone}</p>}
              {user.email && <p style={{ margin: 0 }}>{user.email}</p>}
            </div>
          </div>
        </div>
      );

    // -------------------------------------------------------------------------
    // 10. MONOCHROME — Ultra minimal, Raleway, lots of whitespace
    // -------------------------------------------------------------------------
    case "monochrome":
      return (
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            padding: "14px 14px 10px",
            overflow: "hidden",
            backgroundColor: secondary,
            border: `1px solid ${accent}`,
          }}
        >
          {/* Subtle corner accent — top-right */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 0,
              height: 0,
              borderStyle: "solid",
              borderWidth: "0 20px 20px 0",
              borderColor: `transparent ${accent} transparent transparent`,
              opacity: 0.35,
            }}
          />

          {/* Top: name + profession | company */}
          <div>
            <p
              style={{
                fontFamily: headingFont,
                fontWeight: 600,
                fontSize: 13,
                color: primary,
                margin: 0,
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
              }}
            >
              {user.name ?? "Your Name"}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                marginTop: 4,
              }}
            >
              <p
                style={{
                  fontFamily: bodyFont,
                  fontWeight: 300,
                  fontSize: 8,
                  color: primary,
                  opacity: 0.65,
                  margin: 0,
                  letterSpacing: "0.04em",
                }}
              >
                {user.profession ?? "Profession"}
              </p>
              <span style={{ color: accent, fontSize: 8, opacity: 0.6 }}>|</span>
              <p
                style={{
                  fontFamily: bodyFont,
                  fontWeight: 300,
                  fontSize: 8,
                  color: primary,
                  opacity: 0.65,
                  margin: 0,
                  letterSpacing: "0.04em",
                }}
              >
                {user.company ?? "Company Name"}
              </p>
            </div>
            {/* Single thin accent line */}
            <div
              style={{
                width: "100%",
                height: 0.75,
                backgroundColor: accent,
                opacity: 0.3,
                marginTop: 8,
              }}
            />
          </div>

          {/* Bottom: contact left, profile image right */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                fontFamily: bodyFont,
                fontWeight: 300,
                fontSize: 7.5,
                color: primary,
                opacity: 0.55,
                lineHeight: 1.6,
              }}
            >
              {user.phone && <p style={{ margin: 0 }}>{user.phone}</p>}
              {user.email && <p style={{ margin: 0 }}>{user.email}</p>}
              {user.address && (
                <p
                  style={{
                    margin: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: 130,
                  }}
                >
                  {user.address}
                </p>
              )}
            </div>
            {renderProfileImage(30, `${accent}88`)}
          </div>
        </div>
      );

    default:
      return null;
  }
}

// Base dimensions — layouts render at this fixed size (matches "standard").
// "large" scales up from this base; "standard" uses scaleFactor=1.
const BASE_DIMENSIONS = {
  horizontal: { width: 256, height: 160 },
  vertical: { width: 160, height: 256 },
};

export const BUSINESS_TARGET_DIMENSIONS = {
  horizontal: {
    standard: { width: 256, height: 160 },
    large: { width: 320, height: 208 },
  },
  vertical: {
    standard: { width: 160, height: 256 },
    large: { width: 208, height: 320 },
  },
};

export const BusinessCardPreview = forwardRef<HTMLDivElement, BusinessCardPreviewProps>(
  function BusinessCardPreview({ user, templateId, orientation = "horizontal", size = "standard", targetWidth, targetHeight, bare = false }, ref) {
    const template =
      getBusinessCardTemplate(templateId ?? "") ?? businessCardTemplates[0]!;
    const { primary, secondary } = template.colors;
    const textColor = getTextColor(secondary);

    const base = BASE_DIMENSIONS[orientation];
    const presetTarget = BUSINESS_TARGET_DIMENSIONS[orientation][size];
    const target = targetWidth && targetHeight
      ? { width: targetWidth, height: targetHeight }
      : presetTarget;
    const scaleFactor = target.width / base.width;

    const cardCore = (
      <div
        style={{
          position: "relative",
          width: target.width,
          height: target.height,
          overflow: "hidden",
          borderRadius: 12,
          boxShadow: bare ? undefined : "0 4px 24px rgba(0,0,0,0.18)",
        }}
      >
        <div
          ref={ref}
          style={{
            width: base.width,
            height: base.height,
            transform: `scale(${scaleFactor})`,
            transformOrigin: "top left",
            backgroundColor: secondary,
          }}
        >
          <CardLayout template={template} user={user} textColor={textColor} />

          {/* Watermark */}
          <p
            style={{
              position: "absolute",
              right: 6,
              bottom: 3,
              fontSize: 6,
              opacity: 0.28,
              color: textColor,
              margin: 0,
              fontFamily: template.fonts.body,
              letterSpacing: "0.06em",
            }}
          >
            cardora
          </p>
        </div>
      </div>
    );

    // Bare mode — no padding, no shadow card, no entry animation
    if (bare) return cardCore;

    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
        <motion.div
          key={`${orientation}-${size}-${template.id}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{ position: "relative" }}
        >
          {/* Shadow card behind */}
          <div
            style={{
              position: "absolute",
              top: 8,
              left: 8,
              borderRadius: 12,
              opacity: 0.25,
              backgroundColor: primary,
              width: target.width,
              height: target.height,
            }}
          />
          {cardCore}
        </motion.div>
      </div>
    );
  },
);
