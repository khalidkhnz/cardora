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

  // Batch 5 — Religion-specific multi-event templates
  // Hindu
  "mandap-ceremony": lazy(() => import("./templates/multi-event/mandap-ceremony-template")),
  "devi-divine": lazy(() => import("./templates/multi-event/devi-divine-template")),
  "royal-rajput": lazy(() => import("./templates/multi-event/royal-rajput-template")),
  // Christian
  "chapel-grace": lazy(() => import("./templates/multi-event/chapel-grace-template")),
  "garden-blessing": lazy(() => import("./templates/multi-event/garden-blessing-template")),
  "cathedral-grandeur": lazy(() => import("./templates/multi-event/cathedral-grandeur-template")),
  // Muslim
  "nikkah-elegance": lazy(() => import("./templates/multi-event/nikkah-elegance-template")),
  "mughal-grandeur": lazy(() => import("./templates/multi-event/mughal-grandeur-template")),
  // Sikh
  "golden-gurdwara": lazy(() => import("./templates/multi-event/golden-gurdwara-template")),
  "punjabi-vibrance": lazy(() => import("./templates/multi-event/punjabi-vibrance-template")),
};

export function getTemplateComponent(templateId: string): LazyTemplate | null {
  return registry[templateId] ?? null;
}

export const TEMPLATE_CATEGORIES: Record<string, string[]> = {
  base: ["floral-elegance", "mountain-peak", "mediterranean-elegance", "indian-heritage", "minimal-modern", "romantic-garden", "royal-palace", "golden-night"],
  interactive: ["motion-video", "theater-luxury"],
  "multi-event": ["beach", "mountains-dark", "city", "raabta", "laavan", "mandap-ceremony", "devi-divine", "royal-rajput", "chapel-grace", "garden-blessing", "cathedral-grandeur", "nikkah-elegance", "mughal-grandeur", "golden-gurdwara", "punjabi-vibrance"],
  cinematic: ["cinematic-film", "cinematic-scroll"],
};

export function getTemplateCategory(templateId: string): string {
  for (const [category, ids] of Object.entries(TEMPLATE_CATEGORIES)) {
    if (ids.includes(templateId)) return category;
  }
  return "base";
}
