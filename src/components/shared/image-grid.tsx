"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageGridProps {
  images: { url: string; filename: string }[];
  selected?: string | null;
  onSelect?: (url: string) => void;
  className?: string;
}

export function ImageGrid({ images, selected, onSelect, className }: ImageGridProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4", className)}>
      {images.map((img) => {
        const isSelected = selected === img.url;
        return (
          <button
            key={img.url}
            type="button"
            onClick={() => onSelect?.(img.url)}
            className={cn(
              "group relative aspect-square overflow-hidden rounded-lg border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              onSelect ? "cursor-pointer" : "cursor-default",
              isSelected
                ? "border-primary ring-2 ring-primary/30"
                : "border-transparent hover:border-muted-foreground/30",
            )}
          >
            <img
              src={img.url}
              alt={img.filename}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            {isSelected && (
              <div className="absolute inset-0 flex items-center justify-center bg-primary/20">
                <div className="rounded-full bg-primary p-1.5 text-primary-foreground">
                  <Check className="h-4 w-4" />
                </div>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/60 px-2 py-1 transition-transform group-hover:translate-y-0">
              <p className="truncate text-xs text-white">{img.filename}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
