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
}

export function getTextColor(secondaryColor: string) {
  const light = ["#FFFFFF", "#fff", "#FEF3C7", "#D1FAE5", "#F3E8FF", "#F8F6F0"];
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

  const renderProfileImage = () => {
    if (user.profileImage) {
      return (
        <div
          className="h-10 w-10 rounded-full bg-cover bg-center"
          style={{ backgroundImage: `url(${user.profileImage})` }}
        />
      );
    }
    return (
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
        style={{ backgroundColor: accent, color: "#FFFFFF" }}
      >
        {getInitials(user.name)}
      </div>
    );
  };

  const contactInfo = (
    <div className="space-y-0.5 text-[8px] opacity-80" style={{ color: textColor }}>
      {user.phone && <p>{user.phone}</p>}
      {user.email && <p>{user.email}</p>}
      {user.address && <p className="truncate">{user.address}</p>}
    </div>
  );

  switch (template.layout) {
    case "geometric":
      return (
        <div className="relative flex h-full flex-col justify-between overflow-hidden p-4">
          <div
            className="absolute -top-6 -right-6 h-20 w-20 rotate-45 rounded-lg opacity-30"
            style={{ backgroundColor: accent }}
          />
          <div className="flex items-center gap-3">
            {renderProfileImage()}
            <div>
              <p className="text-sm font-bold" style={{ color: textColor }}>
                {user.name ?? "Your Name"}
              </p>
              <p className="text-[9px] font-medium" style={{ color: accent }}>
                {user.profession ?? "Profession"}
              </p>
            </div>
          </div>
          <div>
            <p className="mb-1 text-[9px] font-semibold" style={{ color: textColor }}>
              {user.company ?? "Company Name"}
            </p>
            {contactInfo}
          </div>
        </div>
      );

    case "split":
      return (
        <div className="flex h-full">
          <div
            className="flex w-2/5 flex-col items-center justify-center p-3"
            style={{ backgroundColor: accent }}
          >
            {renderProfileImage()}
            <p className="mt-1 text-center text-[8px] font-bold text-white">
              {user.name ?? "Your Name"}
            </p>
          </div>
          <div className="flex w-3/5 flex-col justify-center p-3">
            <p className="text-[9px] font-semibold" style={{ color: textColor }}>
              {user.profession ?? "Profession"}
            </p>
            <p className="mb-2 text-[8px]" style={{ color: textColor, opacity: 0.7 }}>
              {user.company ?? "Company Name"}
            </p>
            {contactInfo}
          </div>
        </div>
      );

    case "dark":
      return (
        <div
          className="relative flex h-full flex-col justify-between overflow-hidden p-4"
          style={{
            background: `linear-gradient(135deg, ${primary}, ${primary}DD)`,
          }}
        >
          <div
            className="absolute bottom-0 right-0 h-16 w-16 rounded-tl-full opacity-20"
            style={{ backgroundColor: accent }}
          />
          <div className="flex items-center gap-3">
            {renderProfileImage()}
            <div>
              <p className="text-sm font-bold text-white">{user.name ?? "Your Name"}</p>
              <p className="text-[9px]" style={{ color: accent }}>
                {user.profession ?? "Profession"}
              </p>
            </div>
          </div>
          <div className="text-[8px] text-white/70">
            <p className="mb-0.5 font-semibold text-white/90">
              {user.company ?? "Company Name"}
            </p>
            {user.phone && <p>{user.phone}</p>}
            {user.email && <p>{user.email}</p>}
          </div>
        </div>
      );

    case "gradient":
      return (
        <div
          className="flex h-full flex-col justify-between p-4"
          style={{
            background: `linear-gradient(135deg, ${primary}, ${secondary}, ${accent})`,
          }}
        >
          <div>
            <p className="text-sm font-bold text-white">{user.name ?? "Your Name"}</p>
            <p className="text-[9px] text-white/80">
              {user.profession ?? "Profession"}
            </p>
          </div>
          <div className="text-[8px] text-white/70">
            <p className="mb-0.5 font-semibold text-white/90">
              {user.company ?? "Company Name"}
            </p>
            {user.phone && <p>{user.phone}</p>}
            {user.email && <p>{user.email}</p>}
          </div>
        </div>
      );

    case "corporate":
      return (
        <div className="flex h-full flex-col justify-between p-4">
          <div
            className="absolute inset-x-0 top-0 h-1.5"
            style={{ backgroundColor: accent }}
          />
          <div className="flex items-center gap-3 pt-1">
            {renderProfileImage()}
            <div>
              <p className="text-sm font-bold" style={{ color: textColor }}>
                {user.name ?? "Your Name"}
              </p>
              <p className="text-[9px]" style={{ color: primary }}>
                {user.profession ?? "Profession"}
              </p>
            </div>
          </div>
          <div>
            <p className="mb-1 text-[9px] font-semibold" style={{ color: primary }}>
              {user.company ?? "Company Name"}
            </p>
            {contactInfo}
          </div>
        </div>
      );

    case "artistic":
      return (
        <div
          className="relative flex h-full flex-col justify-between overflow-hidden p-4"
          style={{
            background: `radial-gradient(circle at 80% 20%, ${accent}40, transparent 60%), ${secondary}`,
          }}
        >
          <div>
            <p className="text-sm font-bold" style={{ color: primary }}>
              {user.name ?? "Your Name"}
            </p>
            <p className="text-[9px]" style={{ color: accent }}>
              {user.profession ?? "Profession"}
            </p>
            <p className="mt-0.5 text-[8px]" style={{ color: textColor, opacity: 0.7 }}>
              {user.company ?? "Company Name"}
            </p>
          </div>
          <div className="flex items-end justify-between">
            {contactInfo}
            {renderProfileImage()}
          </div>
        </div>
      );

    case "cyber":
      return (
        <div
          className="relative flex h-full flex-col justify-between overflow-hidden p-4"
          style={{ background: primary }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, ${secondary}10, ${secondary}10 1px, transparent 1px, transparent 8px)`,
            }}
          />
          <div>
            <p className="text-sm font-bold" style={{ color: secondary }}>
              {user.name ?? "Your Name"}
            </p>
            <p className="text-[9px]" style={{ color: accent }}>
              {user.profession ?? "Profession"}
            </p>
          </div>
          <div className="flex items-end justify-between">
            <div className="text-[8px]" style={{ color: secondary, opacity: 0.6 }}>
              <p>{user.company ?? "Company Name"}</p>
              {user.phone && <p>{user.phone}</p>}
              {user.email && <p>{user.email}</p>}
            </div>
            {renderProfileImage()}
          </div>
        </div>
      );

    case "organic":
      return (
        <div
          className="flex h-full flex-col justify-between p-4"
          style={{
            background: `linear-gradient(160deg, ${secondary}, ${primary}15)`,
          }}
        >
          <div className="flex items-center gap-3">
            {renderProfileImage()}
            <div>
              <p className="text-sm font-bold" style={{ color: primary }}>
                {user.name ?? "Your Name"}
              </p>
              <p className="text-[9px]" style={{ color: accent }}>
                {user.profession ?? "Profession"}
              </p>
            </div>
          </div>
          <div>
            <p className="mb-1 text-[9px] font-semibold" style={{ color: primary }}>
              {user.company ?? "Company Name"}
            </p>
            <div className="space-y-0.5 text-[8px]" style={{ color: primary, opacity: 0.7 }}>
              {user.phone && <p>{user.phone}</p>}
              {user.email && <p>{user.email}</p>}
            </div>
          </div>
        </div>
      );

    case "royal":
      return (
        <div
          className="flex h-full flex-col justify-between p-4"
          style={{
            background: `linear-gradient(135deg, ${primary}, ${primary}CC)`,
          }}
        >
          <div
            className="absolute inset-x-0 top-0 h-0.5"
            style={{ backgroundColor: accent }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-0.5"
            style={{ backgroundColor: accent }}
          />
          <div className="flex items-center gap-3">
            {renderProfileImage()}
            <div>
              <p className="text-sm font-bold text-white">{user.name ?? "Your Name"}</p>
              <p className="text-[9px]" style={{ color: accent }}>
                {user.profession ?? "Profession"}
              </p>
            </div>
          </div>
          <div className="text-[8px] text-white/70">
            <p className="mb-0.5 font-semibold text-white/90">
              {user.company ?? "Company Name"}
            </p>
            {user.phone && <p>{user.phone}</p>}
            {user.email && <p>{user.email}</p>}
          </div>
        </div>
      );

    case "monochrome":
      return (
        <div
          className="flex h-full flex-col justify-between border p-4"
          style={{ borderColor: accent }}
        >
          <div>
            <p className="text-sm font-bold" style={{ color: primary }}>
              {user.name ?? "Your Name"}
            </p>
            <p className="text-[9px]" style={{ color: accent }}>
              {user.profession ?? "Profession"} | {user.company ?? "Company Name"}
            </p>
          </div>
          <div className="flex items-end justify-between">
            {contactInfo}
            {renderProfileImage()}
          </div>
        </div>
      );

    default:
      return null;
  }
}

export const BusinessCardPreview = forwardRef<HTMLDivElement, BusinessCardPreviewProps>(
  function BusinessCardPreview({ user, templateId, orientation = "horizontal", size = "standard" }, ref) {
    const template =
      getBusinessCardTemplate(templateId ?? "") ?? businessCardTemplates[0]!;
    const { primary, secondary } = template.colors;
    const textColor = getTextColor(secondary);

    const dimensions = {
      horizontal: {
        standard: { width: 256, height: 160 },
        large: { width: 320, height: 208 },
      },
      vertical: {
        standard: { width: 160, height: 256 },
        large: { width: 208, height: 320 },
      },
    };

    const { width, height } = dimensions[orientation][size];

    return (
      <div className="flex items-center justify-center p-4">
        <motion.div
          key={`${orientation}-${size}-${template.id}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          {/* Shadow card behind */}
          <div
            className="absolute top-2 left-2 rounded-xl opacity-30"
            style={{ backgroundColor: primary, width, height }}
          />

          {/* Main card */}
          <div
            ref={ref}
            className="relative overflow-hidden rounded-xl shadow-lg"
            style={{ backgroundColor: secondary, width, height }}
          >
            <CardLayout template={template} user={user} textColor={textColor} />

            {/* Watermark */}
            <p
              className="absolute right-2 bottom-1 text-[6px] opacity-30"
              style={{ color: textColor }}
            >
              cardora
            </p>
          </div>
        </motion.div>
      </div>
    );
  },
);
