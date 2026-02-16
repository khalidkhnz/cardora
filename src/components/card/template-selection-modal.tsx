"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  type BusinessCardTemplate,
  businessCardTemplates,
  businessCardCategories,
} from "@/lib/templates/business-card-templates";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface TemplateSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedId?: string | null;
  onSelect: (template: BusinessCardTemplate) => void;
}

export function TemplateSelectionModal({
  open,
  onOpenChange,
  selectedId,
  onSelect,
}: TemplateSelectionModalProps) {
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<BusinessCardTemplate | null>(
    selectedId
      ? businessCardTemplates.find((t) => t.id === selectedId) ?? null
      : null,
  );

  const filtered =
    category === "All"
      ? businessCardTemplates
      : businessCardTemplates.filter((t) => t.category === category);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose a Template</DialogTitle>
        </DialogHeader>

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
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {filtered.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => setSelected(template)}
              className={cn(
                "relative overflow-hidden rounded-xl border-2 p-3 text-left transition-all",
                selected?.id === template.id
                  ? "border-primary ring-primary/20 ring-2"
                  : "border-muted hover:border-muted-foreground/30",
              )}
            >
              <div
                className="mb-2 flex h-20 items-center justify-center rounded-lg"
                style={{
                  background: `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.secondary})`,
                }}
              >
                <span className="text-2xl">{template.preview}</span>
              </div>
              <p className="text-sm font-semibold">{template.name}</p>
              <div className="mt-1 flex gap-1">
                {Object.values(template.colors).map((color, j) => (
                  <div
                    key={j}
                    className="h-3 w-3 rounded-full border border-black/10"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              {selected?.id === template.id && (
                <div className="bg-primary text-primary-foreground absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs">
                  ✓
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Selected info + action */}
        <div className="flex items-center justify-between border-t pt-4">
          <p className="text-sm">
            {selected ? (
              <>
                Selected: <span className="font-semibold">{selected.name}</span>
              </>
            ) : (
              "No template selected"
            )}
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              disabled={!selected}
              onClick={() => {
                if (selected) {
                  onSelect(selected);
                  onOpenChange(false);
                }
              }}
            >
              Select Template
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
