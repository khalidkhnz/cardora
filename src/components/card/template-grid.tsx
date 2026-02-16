"use client";

import { motion } from "framer-motion";
import {
  type BusinessCardTemplate,
  businessCardTemplates,
  businessCardCategories,
} from "@/lib/templates/business-card-templates";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface TemplateGridProps {
  selectedId?: string | null;
  onSelect: (template: BusinessCardTemplate) => void;
}

export function TemplateGrid({ selectedId, onSelect }: TemplateGridProps) {
  const [category, setCategory] = useState<string>("All");

  const filtered =
    category === "All"
      ? businessCardTemplates
      : businessCardTemplates.filter((t) => t.category === category);

  return (
    <div className="space-y-4">
      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategory("All")}
          className={cn(
            "rounded-full px-3 py-1 text-sm font-medium transition-colors",
            category === "All"
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80",
          )}
        >
          All
        </button>
        {businessCardCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={cn(
              "rounded-full px-3 py-1 text-sm font-medium transition-colors",
              category === cat
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Template grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filtered.map((template, i) => (
          <motion.button
            key={template.id}
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(template)}
            className={cn(
              "group relative overflow-hidden rounded-xl border-2 p-3 text-left transition-all",
              selectedId === template.id
                ? "border-primary ring-primary/20 ring-2"
                : "border-muted hover:border-muted-foreground/30",
            )}
          >
            {/* Color preview */}
            <div
              className="mb-3 flex h-24 items-center justify-center rounded-lg"
              style={{
                background: `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.secondary})`,
              }}
            >
              <span className="text-3xl">{template.preview}</span>
            </div>

            {/* Color swatches */}
            <div className="mb-2 flex gap-1">
              {Object.values(template.colors).map((color, j) => (
                <div
                  key={j}
                  className="h-4 w-4 rounded-full border border-black/10"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            {/* Template info */}
            <p className="text-sm font-semibold">{template.name}</p>
            <p className="text-muted-foreground line-clamp-1 text-xs">
              {template.description}
            </p>

            {/* Selection indicator */}
            {selectedId === template.id && (
              <div className="bg-primary text-primary-foreground absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs">
                ✓
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
