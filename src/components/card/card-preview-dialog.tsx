"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BusinessCardPreview, type UserCardData } from "./business-card-preview";
import { WeddingCardPreview, type WeddingCardData } from "./wedding-card-preview";
import { BusinessCardBack } from "./business-card-back";
import { WeddingCardBack } from "./wedding-card-back";
import { FlippableCard } from "./flippable-card";
import type { CardType } from "./card-type-selector";

interface CardPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cardType: CardType;
  businessData?: UserCardData;
  weddingData?: WeddingCardData;
  templateId?: string | null;
  orientation?: "horizontal" | "vertical";
  username?: string | null;
}

export function CardPreviewDialog({
  open,
  onOpenChange,
  cardType,
  businessData,
  weddingData,
  templateId,
  orientation,
  username,
}: CardPreviewDialogProps) {
  const orient = orientation ?? (cardType === "business" ? "horizontal" : "vertical");

  const businessDims = orient === "horizontal"
    ? { width: 320, height: 208 }
    : { width: 208, height: 320 };

  const weddingDims = orient === "horizontal"
    ? { width: 320, height: 208 }
    : { width: 240, height: 352 };

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
            <FlippableCard
              width={businessDims.width}
              height={businessDims.height}
              front={
                <BusinessCardPreview
                  user={businessData}
                  templateId={templateId}
                  orientation={orient}
                  size="large"
                  bare
                />
              }
              back={
                <BusinessCardBack
                  user={businessData}
                  username={username}
                  templateId={templateId}
                  orientation={orient}
                  size="large"
                />
              }
            />
          )}

          {cardType !== "business" && weddingData && (
            <FlippableCard
              width={weddingDims.width}
              height={weddingDims.height}
              front={
                <WeddingCardPreview
                  data={weddingData}
                  templateId={templateId}
                  orientation={orient}
                  size="large"
                  bare
                />
              }
              back={
                <WeddingCardBack
                  data={weddingData}
                  templateId={templateId}
                  orientation={orient}
                  size="large"
                />
              }
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
