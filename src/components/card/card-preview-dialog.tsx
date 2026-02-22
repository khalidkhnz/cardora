"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BusinessCardPreview, type UserCardData } from "./business-card-preview";
import { WeddingCardPreview, type WeddingCardData } from "./wedding-card-preview";
import type { CardType } from "./card-type-selector";

interface CardPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cardType: CardType;
  businessData?: UserCardData;
  weddingData?: WeddingCardData;
  templateId?: string | null;
  orientation?: "horizontal" | "vertical";
}

export function CardPreviewDialog({
  open,
  onOpenChange,
  cardType,
  businessData,
  weddingData,
  templateId,
  orientation,
}: CardPreviewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {cardType === "business"
              ? "Business Card Preview"
              : cardType === "wedding"
                ? "Wedding Card Preview"
                : cardType === "engagement"
                  ? "Engagement Card Preview"
                  : "Anniversary Card Preview"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-center py-8">
          {cardType === "business" && businessData && (
            <BusinessCardPreview
              user={businessData}
              templateId={templateId}
              orientation={orientation ?? "horizontal"}
              size="large"
            />
          )}

          {cardType !== "business" && weddingData && (
            <WeddingCardPreview
              data={weddingData}
              templateId={templateId}
              orientation={orientation ?? "vertical"}
              size="large"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
