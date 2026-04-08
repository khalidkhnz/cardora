"use client";

import { platform } from "@/lib/platform";

/**
 * Cardora watermark overlay for template previews.
 * Shows diagonal "Cardora" text across the template.
 * Removed after purchase.
 */
export function TemplateWatermark({ color = "currentColor" }: { color?: string }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[95] overflow-hidden select-none">
      {/* Repeating diagonal watermarks */}
      <span
        className="absolute top-[10%] left-[5%] -rotate-[30deg] whitespace-nowrap text-3xl font-bold tracking-[0.3em] opacity-[0.06]"
        style={{ fontFamily: "var(--font-cinzel)", color }}
      >
        {platform.name}
      </span>
      <span
        className="absolute top-[30%] right-[2%] -rotate-[30deg] whitespace-nowrap text-3xl font-bold tracking-[0.3em] opacity-[0.06]"
        style={{ fontFamily: "var(--font-cinzel)", color }}
      >
        {platform.name}
      </span>
      <span
        className="absolute top-[50%] left-[15%] -rotate-[30deg] whitespace-nowrap text-3xl font-bold tracking-[0.3em] opacity-[0.06]"
        style={{ fontFamily: "var(--font-cinzel)", color }}
      >
        {platform.name}
      </span>
      <span
        className="absolute top-[70%] right-[10%] -rotate-[30deg] whitespace-nowrap text-3xl font-bold tracking-[0.3em] opacity-[0.06]"
        style={{ fontFamily: "var(--font-cinzel)", color }}
      >
        {platform.name}
      </span>
      <span
        className="absolute bottom-[10%] left-[8%] -rotate-[30deg] whitespace-nowrap text-3xl font-bold tracking-[0.3em] opacity-[0.06]"
        style={{ fontFamily: "var(--font-cinzel)", color }}
      >
        {platform.name}
      </span>

      {/* Center prominent watermark */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="-rotate-[30deg] whitespace-nowrap text-5xl font-bold tracking-[0.4em] opacity-[0.04]"
          style={{ fontFamily: "var(--font-cinzel)", color }}
        >
          {platform.name}
        </span>
      </div>
    </div>
  );
}
