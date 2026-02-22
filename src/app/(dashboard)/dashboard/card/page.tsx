"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CountrySelector } from "@/components/card/country-selector";
import {
  CardTypeSelector,
  type CardType,
} from "@/components/card/card-type-selector";
import { BusinessCardPreview } from "@/components/card/business-card-preview";
import { WeddingCardPreview } from "@/components/card/wedding-card-preview";
import { TemplateGrid } from "@/components/card/template-grid";
import { WeddingTemplateGrid } from "@/components/card/wedding-template-grid";
import { TemplateSelectionModal } from "@/components/card/template-selection-modal";
import { WeddingTemplateSelectionModal } from "@/components/card/wedding-template-selection-modal";
import { CardPreviewDialog } from "@/components/card/card-preview-dialog";
import { CardConfigForm } from "@/components/card/card-config-form";
import { useUserProfile, useUpdateProfile } from "@/hooks/use-user";
import { useCardSettings, useUpdateCardSettings } from "@/hooks/use-card";
import type { CountryCode } from "@/lib/constants";
import { COUNTRIES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Download, AlertCircle, RefreshCw, Eye, Sparkles } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { BusinessCardTemplate } from "@/lib/templates/business-card-templates";
import type { WeddingCardTemplate } from "@/lib/templates/wedding-card-templates";
import { downloadCardAsPDF } from "@/lib/download-card-pdf";
import Link from "next/link";

export default function CardPage() {
  const { data: profile, isLoading: profileLoading, isError: profileError, refetch: refetchProfile } = useUserProfile();
  const { data: cardSettingsData, isLoading: cardLoading, isError: cardError, refetch: refetchCard } = useCardSettings();
  const updateProfile = useUpdateProfile();
  const updateCardSettings = useUpdateCardSettings();

  const [country, setCountry] = useState<CountryCode>("CA");
  const [cardType, setCardType] = useState<CardType>("business");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal");
  const [cardSize, setCardSize] = useState<"standard" | "large">("standard");
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const weddingCardRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = useCallback(async () => {
    const ref = cardType === "business" ? cardRef.current : weddingCardRef.current;
    if (!ref) return;
    setDownloading(true);
    try {
      const filename = cardType === "business"
        ? `business-card-${profile?.username ?? "card"}`
        : `${cardType}-card-${cardSettingsData?.groomName ?? "card"}`;
      await downloadCardAsPDF(ref, filename);
      toast.success("PDF downloaded!");
    } catch {
      toast.error("Failed to download PDF");
    } finally {
      setDownloading(false);
    }
  }, [profile?.username, cardType, cardSettingsData?.groomName]);

  // Sync from server
  useEffect(() => {
    if (profile) {
      setCountry((profile.country as CountryCode) ?? "CA");
    }
  }, [profile]);

  useEffect(() => {
    if (cardSettingsData) {
      setCardType(cardSettingsData.cardType ?? "business");
      setSelectedTemplateId(cardSettingsData.selectedTemplateId);
      setOrientation(cardSettingsData.orientation ?? "horizontal");
      setCardSize(cardSettingsData.cardSize ?? "standard");
    }
  }, [cardSettingsData]);

  function handleCountryChange(code: CountryCode) {
    setCountry(code);
    updateProfile.mutate(
      { country: code, currency: COUNTRIES[code].currency },
      { onError: () => toast.error("Failed to update country") },
    );
  }

  function handleCardTypeChange(type: CardType) {
    setCardType(type);
    setSelectedTemplateId(null);
    updateCardSettings.mutate(
      { cardType: type, selectedTemplateId: null },
      { onError: () => toast.error("Failed to update card type") },
    );
  }

  function handleBusinessTemplateSelect(template: BusinessCardTemplate) {
    setSelectedTemplateId(template.id);
    updateCardSettings.mutate(
      { selectedTemplateId: template.id },
      {
        onSuccess: () => toast.success(`Selected ${template.name}`),
        onError: () => toast.error("Failed to select template"),
      },
    );
  }

  function handleWeddingTemplateSelect(template: WeddingCardTemplate) {
    setSelectedTemplateId(template.id);
    updateCardSettings.mutate(
      { selectedTemplateId: template.id },
      {
        onSuccess: () => toast.success(`Selected ${template.name}`),
        onError: () => toast.error("Failed to select template"),
      },
    );
  }

  function handleOrientationChange(value: "horizontal" | "vertical") {
    setOrientation(value);
    updateCardSettings.mutate(
      { orientation: value },
      { onError: () => toast.error("Failed to update orientation") },
    );
  }

  function handleCardSizeChange(value: "standard" | "large") {
    setCardSize(value);
    updateCardSettings.mutate(
      { cardSize: value },
      { onError: () => toast.error("Failed to update size") },
    );
  }

  const isLoading = profileLoading || cardLoading;
  const isError = profileError || cardError;
  const isWeddingType = cardType === "wedding" || cardType === "engagement" || cardType === "anniversary";

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="mb-2 h-9 w-48" />
          <Skeleton className="h-5 w-72" />
        </div>
        <Skeleton className="h-48" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Card Editor</h1>
          <p className="text-muted-foreground">
            Design and customize your digital cards
          </p>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>Failed to load your card settings. Please try again.</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                void refetchProfile();
                void refetchCard();
              }}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const businessData = {
    name: profile?.name ?? "Your Name",
    email: profile?.email ?? "email@example.com",
    phone: profile?.phone,
    company: profile?.company,
    profession: profile?.profession,
    address: profile?.address,
    profileImage: profile?.profileImage,
  };

  const weddingData = {
    groomName: cardSettingsData?.groomName,
    brideName: cardSettingsData?.brideName,
    weddingDate: cardSettingsData?.weddingDate,
    venue: cardSettingsData?.venue,
    groomParentNames: cardSettingsData?.groomParentNames,
    brideParentNames: cardSettingsData?.brideParentNames,
    deceasedElders: cardSettingsData?.deceasedElders,
  };

  const cardTypeLabel =
    cardType === "wedding"
      ? "Wedding"
      : cardType === "engagement"
        ? "Engagement"
        : cardType === "anniversary"
          ? "Anniversary"
          : "Business";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Card Editor</h1>
        <p className="text-muted-foreground">
          Design and customize your digital cards
        </p>
      </div>

      {/* Country Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Country</CardTitle>
          <CardDescription>
            Select your country for pricing and payment options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CountrySelector value={country} onChange={handleCountryChange} />
        </CardContent>
      </Card>

      {/* Card Type Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Card Type</CardTitle>
          <CardDescription>Choose what kind of card you want to create</CardDescription>
        </CardHeader>
        <CardContent>
          <CardTypeSelector value={cardType} onChange={handleCardTypeChange} />
        </CardContent>
      </Card>

      {/* ========== BUSINESS CARD SECTION ========== */}
      {cardType === "business" && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
              <CardDescription>
                See how your card looks with the selected template
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6 lg:flex-row">
                {/* Preview */}
                <div className="flex flex-1 items-center justify-center rounded-lg border bg-gradient-to-br from-gray-50 to-gray-100 p-8 dark:from-gray-900 dark:to-gray-800">
                  <BusinessCardPreview
                    ref={cardRef}
                    user={businessData}
                    templateId={selectedTemplateId}
                    orientation={orientation}
                    size={cardSize}
                  />
                </div>

                {/* Options */}
                <div className="w-full space-y-4 lg:w-64">
                  <div>
                    <p className="mb-2 text-sm font-medium">Orientation</p>
                    <div className="flex gap-2">
                      <Button
                        variant={orientation === "horizontal" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleOrientationChange("horizontal")}
                      >
                        Horizontal
                      </Button>
                      <Button
                        variant={orientation === "vertical" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleOrientationChange("vertical")}
                      >
                        Vertical
                      </Button>
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-sm font-medium">Size</p>
                    <div className="flex gap-2">
                      <Button
                        variant={cardSize === "standard" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleCardSizeChange("standard")}
                      >
                        Standard
                      </Button>
                      <Button
                        variant={cardSize === "large" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleCardSizeChange("large")}
                      >
                        Large
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <Button
                    className="w-full"
                    onClick={() => setModalOpen(true)}
                  >
                    Change Template
                  </Button>

                  <Button
                    className="w-full"
                    variant="secondary"
                    onClick={() => setPreviewOpen(true)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>

                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={handleDownloadPDF}
                    disabled={downloading}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {downloading ? "Generating..." : "Download PDF"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Template Grid */}
          <Card>
            <CardHeader>
              <CardTitle>Business Card Templates</CardTitle>
              <CardDescription>
                Choose from our collection of professionally designed templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TemplateGrid
                selectedId={selectedTemplateId}
                onSelect={handleBusinessTemplateSelect}
              />
            </CardContent>
          </Card>
        </>
      )}

      {/* ========== WEDDING / ENGAGEMENT / ANNIVERSARY SECTION ========== */}
      {isWeddingType && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
              <CardDescription>
                See how your {cardTypeLabel.toLowerCase()} card looks with the selected template
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6 lg:flex-row">
                {/* Preview */}
                <div className="flex flex-1 items-center justify-center rounded-lg border bg-gradient-to-br from-gray-50 to-gray-100 p-8 dark:from-gray-900 dark:to-gray-800">
                  <WeddingCardPreview
                    ref={weddingCardRef}
                    data={weddingData}
                    templateId={selectedTemplateId}
                    orientation={orientation}
                    size={cardSize}
                  />
                </div>

                {/* Options */}
                <div className="w-full space-y-4 lg:w-64">
                  <div>
                    <p className="mb-2 text-sm font-medium">Orientation</p>
                    <div className="flex gap-2">
                      <Button
                        variant={orientation === "horizontal" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleOrientationChange("horizontal")}
                      >
                        Horizontal
                      </Button>
                      <Button
                        variant={orientation === "vertical" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleOrientationChange("vertical")}
                      >
                        Vertical
                      </Button>
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-sm font-medium">Size</p>
                    <div className="flex gap-2">
                      <Button
                        variant={cardSize === "standard" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleCardSizeChange("standard")}
                      >
                        Standard
                      </Button>
                      <Button
                        variant={cardSize === "large" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleCardSizeChange("large")}
                      >
                        Large
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <Button
                    className="w-full"
                    onClick={() => setModalOpen(true)}
                  >
                    Change Template
                  </Button>

                  <Button
                    className="w-full"
                    variant="secondary"
                    onClick={() => setPreviewOpen(true)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>

                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={handleDownloadPDF}
                    disabled={downloading}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {downloading ? "Generating..." : "Download PDF"}
                  </Button>

                  <Separator />

                  <Button className="w-full" variant="outline" asChild>
                    <Link href="/dashboard/animated-invite">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Animated Invite Editor
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wedding Template Grid */}
          <Card>
            <CardHeader>
              <CardTitle>{cardTypeLabel} Card Templates</CardTitle>
              <CardDescription>
                Choose from {cardTypeLabel.toLowerCase() === "wedding" ? "27" : "our"} premium {cardTypeLabel.toLowerCase()} card templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WeddingTemplateGrid
                selectedId={selectedTemplateId}
                onSelect={handleWeddingTemplateSelect}
              />
            </CardContent>
          </Card>
        </>
      )}

      <Separator />

      {/* Card Config Form */}
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            Configure your profile and card settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CardConfigForm cardType={cardType} />
        </CardContent>
      </Card>

      {/* Business Template Selection Modal */}
      {cardType === "business" && (
        <TemplateSelectionModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          selectedId={selectedTemplateId}
          onSelect={handleBusinessTemplateSelect}
        />
      )}

      {/* Wedding Template Selection Modal */}
      {isWeddingType && (
        <WeddingTemplateSelectionModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          selectedId={selectedTemplateId}
          onSelect={handleWeddingTemplateSelect}
        />
      )}

      {/* Preview Dialog */}
      <CardPreviewDialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        cardType={cardType}
        businessData={businessData}
        weddingData={weddingData}
        templateId={selectedTemplateId}
        orientation={orientation}
      />
    </div>
  );
}
