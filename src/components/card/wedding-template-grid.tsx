"use client";

import { motion } from "framer-motion";
import {
  type WeddingCardTemplate,
  weddingCardTemplates,
  weddingCardCategories,
} from "@/lib/templates/wedding-card-templates";
import { WeddingLayoutVertical } from "./wedding-card-preview";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface WeddingTemplateGridProps {
  selectedId?: string | null;
  onSelect: (template: WeddingCardTemplate) => void;
}

const dummyWeddingData = {
  groomName: "Rahul",
  brideName: "Priya",
  weddingDate: "2026-06-15",
  venue: "Royal Palace, Jaipur",
  groomParentNames: "Mr. & Mrs. Sharma",
  brideParentNames: "Mr. & Mrs. Patel",
  deceasedElders: null,
};

export function WeddingTemplateGrid({
  selectedId,
  onSelect,
}: WeddingTemplateGridProps) {
  const [category, setCategory] = useState<string>("All");

  const filtered =
    category === "All"
      ? weddingCardTemplates
      : weddingCardTemplates.filter((t) => t.category === category);

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
        {weddingCardCategories.map((cat) => (
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
            {/* Mini wedding card preview */}
            <div
              className="relative mb-3 overflow-hidden rounded-lg"
              style={{ height: 160 }}
            >
              <WeddingLayoutVertical
                template={template}
                data={dummyWeddingData}
              />
            </div>

            {/* Template info */}
            <p className="text-sm font-semibold">{template.name}</p>
            <p className="text-muted-foreground line-clamp-1 text-xs">
              {template.category}
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
