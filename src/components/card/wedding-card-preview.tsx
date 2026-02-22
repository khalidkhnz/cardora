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
}

function formatDate(dateStr?: string | null) {
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

export function WeddingLayoutVertical({
  template,
  data,
}: {
  template: WeddingCardTemplate;
  data: WeddingCardData;
}) {
  const { primary, secondary, accent, text } = template.colors;
  const groom = data.groomName || "Groom";
  const bride = data.brideName || "Bride";

  return (
    <div
      className="relative flex h-full flex-col items-center justify-between overflow-hidden p-5 text-center"
      style={{
        background: `linear-gradient(135deg, ${primary}, ${secondary})`,
        color: text,
      }}
    >
      {/* Overlay */}
      {template.hasOverlay && (
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, ${accent}, transparent 50%), radial-gradient(circle at 80% 20%, ${accent}, transparent 50%)`,
          }}
        />
      )}

      {/* Top decorative accent */}
      <div className="relative z-10 w-full">
        <div
          className="mx-auto mb-1 h-[1px] w-16 opacity-60"
          style={{ backgroundColor: accent }}
        />
        <p className="text-[7px] uppercase tracking-[3px] opacity-60">
          {template.hasGurbani
            ? "Ik Onkar"
            : template.hasHindu
              ? "Shubh Vivah"
              : "Together with their families"}
        </p>
      </div>

      {/* Couple names */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
        <p className="text-lg font-bold leading-tight">{groom}</p>
        <p
          className="my-0.5 text-[9px] italic opacity-70"
          style={{ color: accent }}
        >
          &amp;
        </p>
        <p className="text-lg font-bold leading-tight">{bride}</p>
      </div>

      {/* Details */}
      <div className="relative z-10 w-full space-y-1">
        <div
          className="mx-auto mb-1 h-[1px] w-12 opacity-40"
          style={{ backgroundColor: accent }}
        />
        <p className="text-[8px] font-semibold">
          {formatDate(data.weddingDate)}
        </p>
        <p className="text-[7px] opacity-70">
          {data.venue || "Venue TBD"}
        </p>
        {data.groomParentNames && (
          <p className="text-[6px] opacity-50">
            S/o {data.groomParentNames}
          </p>
        )}
        {data.brideParentNames && (
          <p className="text-[6px] opacity-50">
            D/o {data.brideParentNames}
          </p>
        )}
      </div>

      {/* Watermark */}
      <p
        className="absolute right-2 bottom-1 text-[5px] opacity-20"
        style={{ color: text }}
      >
        cardora
      </p>
    </div>
  );
}

function WeddingLayoutHorizontal({
  template,
  data,
}: {
  template: WeddingCardTemplate;
  data: WeddingCardData;
}) {
  const { primary, secondary, accent, text } = template.colors;
  const groom = data.groomName || "Groom";
  const bride = data.brideName || "Bride";

  return (
    <div
      className="relative flex h-full overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${primary}, ${secondary})`,
        color: text,
      }}
    >
      {/* Overlay */}
      {template.hasOverlay && (
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, ${accent}, transparent 50%), radial-gradient(circle at 80% 20%, ${accent}, transparent 50%)`,
          }}
        />
      )}

      {/* Left section - couple names */}
      <div className="relative z-10 flex w-1/2 flex-col items-center justify-center border-r border-white/10 p-4">
        <p className="text-[7px] uppercase tracking-[2px] opacity-60">
          {template.hasGurbani
            ? "Ik Onkar"
            : template.hasHindu
              ? "Shubh Vivah"
              : "Together with their families"}
        </p>
        <div
          className="my-1.5 h-[1px] w-10 opacity-40"
          style={{ backgroundColor: accent }}
        />
        <p className="text-base font-bold leading-tight">{groom}</p>
        <p
          className="my-0.5 text-[8px] italic opacity-70"
          style={{ color: accent }}
        >
          &amp;
        </p>
        <p className="text-base font-bold leading-tight">{bride}</p>
      </div>

      {/* Right section - details */}
      <div className="relative z-10 flex w-1/2 flex-col items-center justify-center p-4 text-center">
        <p className="text-[8px] font-semibold">
          {formatDate(data.weddingDate)}
        </p>
        <div
          className="my-1.5 h-[1px] w-8 opacity-40"
          style={{ backgroundColor: accent }}
        />
        <p className="text-[7px] opacity-70">
          {data.venue || "Venue TBD"}
        </p>
        {data.groomParentNames && (
          <p className="mt-1.5 text-[6px] opacity-50">
            S/o {data.groomParentNames}
          </p>
        )}
        {data.brideParentNames && (
          <p className="text-[6px] opacity-50">
            D/o {data.brideParentNames}
          </p>
        )}
      </div>

      {/* Watermark */}
      <p
        className="absolute right-2 bottom-1 text-[5px] opacity-20"
        style={{ color: text }}
      >
        cardora
      </p>
    </div>
  );
}

export const WeddingCardPreview = forwardRef<
  HTMLDivElement,
  WeddingCardPreviewProps
>(function WeddingCardPreview(
  { data, templateId, orientation = "vertical", size = "standard" },
  ref,
) {
  const template =
    getWeddingCardTemplate(templateId ?? "") ?? weddingCardTemplates[0]!;
  const { primary } = template.colors;

  const dimensions = {
    horizontal: {
      standard: { width: 256, height: 160 },
      large: { width: 320, height: 208 },
    },
    vertical: {
      standard: { width: 192, height: 288 },
      large: { width: 240, height: 352 },
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
        {/* Shadow card */}
        <div
          className="absolute top-2 left-2 rounded-xl opacity-30"
          style={{ backgroundColor: primary, width, height }}
        />

        {/* Main card */}
        <div
          ref={ref}
          className="relative overflow-hidden rounded-xl shadow-lg"
          style={{ width, height }}
        >
          {orientation === "horizontal" ? (
            <WeddingLayoutHorizontal template={template} data={data} />
          ) : (
            <WeddingLayoutVertical template={template} data={data} />
          )}
        </div>
      </motion.div>
    </div>
  );
});
