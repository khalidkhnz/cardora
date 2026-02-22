import { lazy, type ComponentType } from "react";
import type { TemplateProps } from "./types";

type LazyTemplate = React.LazyExoticComponent<ComponentType<TemplateProps>>;

const registry: Record<string, LazyTemplate> = {
  // Batch 1 — Base templates
  "floral-elegance": lazy(() => import("./templates/base/floral-elegance-template")),
  "mountain-peak": lazy(() => import("./templates/base/mountain-peak-template")),
  "mediterranean-elegance": lazy(() => import("./templates/base/mediterranean-elegance-template")),
  "indian-heritage": lazy(() => import("./templates/base/indian-heritage-template")),
  "minimal-modern": lazy(() => import("./templates/base/minimal-modern-template")),
  "romantic-garden": lazy(() => import("./templates/base/romantic-garden-template")),
  "royal-palace": lazy(() => import("./templates/base/royal-palace-template")),
  "golden-night": lazy(() => import("./templates/base/golden-night-template")),

  // Batch 2 — Interactive templates
  "motion-video": lazy(() => import("./templates/interactive/motion-video-template")),
  "theater-luxury": lazy(() => import("./templates/interactive/theater-luxury-template")),

  // Batch 3 — Multi-event templates
  "beach": lazy(() => import("./templates/multi-event/beach-template")),
  "mountains-dark": lazy(() => import("./templates/multi-event/mountains-dark-template")),
  "city": lazy(() => import("./templates/multi-event/city-template")),
  "raabta": lazy(() => import("./templates/multi-event/raabta-template")),
  "laavan": lazy(() => import("./templates/multi-event/laavan-template")),

  // Batch 4 — Cinematic templates
  "cinematic-film": lazy(() => import("./templates/cinematic/cinematic-film-template")),
  "cinematic-scroll": lazy(() => import("./templates/cinematic/cinematic-scroll-template")),
};

export function getTemplateComponent(templateId: string): LazyTemplate | null {
  return registry[templateId] ?? null;
}

export const TEMPLATE_CATEGORIES: Record<string, string[]> = {
  base: ["floral-elegance", "mountain-peak", "mediterranean-elegance", "indian-heritage", "minimal-modern", "romantic-garden", "royal-palace", "golden-night"],
  interactive: ["motion-video", "theater-luxury"],
  "multi-event": ["beach", "mountains-dark", "city", "raabta", "laavan"],
  cinematic: ["cinematic-film", "cinematic-scroll"],
};

export function getTemplateCategory(templateId: string): string {
  for (const [category, ids] of Object.entries(TEMPLATE_CATEGORIES)) {
    if (ids.includes(templateId)) return category;
  }
  return "base";
}
