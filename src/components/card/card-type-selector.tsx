"use client";

import { cn } from "@/lib/utils";

export type CardType = "business" | "wedding" | "engagement" | "anniversary";

interface CardTypeSelectorProps {
  value: CardType;
  onChange: (type: CardType) => void;
}

const CARD_TYPES: { type: CardType; label: string; icon: string; tag?: string }[] = [
  { type: "business", label: "Business Card", icon: "💼" },
  { type: "wedding", label: "Wedding Card", icon: "💍" },
  { type: "engagement", label: "Engagement Card", icon: "💎" },
  { type: "anniversary", label: "Anniversary Card", icon: "🎉" },
];

export function CardTypeSelector({ value, onChange }: CardTypeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {CARD_TYPES.map((item) => (
        <button
          key={item.type}
          type="button"
          onClick={() => onChange(item.type)}
          className={cn(
            "relative flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all",
            value === item.type
              ? "border-primary bg-primary/5"
              : "border-muted hover:border-muted-foreground/30",
          )}
        >
          <span className="text-2xl">{item.icon}</span>
          <span className="text-center text-sm font-medium">{item.label}</span>
          {item.tag && (
            <span className="absolute -top-2 -right-2 rounded-full bg-green-500 px-2 py-0.5 text-xs font-medium text-white">
              {item.tag}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
