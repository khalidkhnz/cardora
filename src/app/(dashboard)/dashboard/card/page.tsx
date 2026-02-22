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
import { TemplateGrid } from "@/components/card/template-grid";
import { TemplateSelectionModal } from "@/components/card/template-selection-modal";
import { CardConfigForm } from "@/components/card/card-config-form";
import { useUserProfile, useUpdateProfile } from "@/hooks/use-user";
import { useCardSettings, useUpdateCardSettings } from "@/hooks/use-card";
import type { CountryCode } from "@/lib/constants";
import { COUNTRIES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Download } from "lucide-react";
import type { BusinessCardTemplate } from "@/lib/templates/business-card-templates";
import { downloadCardAsPDF } from "@/lib/download-card-pdf";

export default function CardPage() {
  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const { data: cardSettingsData, isLoading: cardLoading } = useCardSettings();
  const updateProfile = useUpdateProfile();
  const updateCardSettings = useUpdateCardSettings();

  const [country, setCountry] = useState<CountryCode>("CA");
  const [cardType, setCardType] = useState<CardType>("business");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal");
  const [cardSize, setCardSize] = useState<"standard" | "large">("standard");
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = useCallback(async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      await downloadCardAsPDF(cardRef.current, `business-card-${profile?.username ?? "card"}`);
      toast.success("PDF downloaded!");
    } catch {
      toast.error("Failed to download PDF");
    } finally {
      setDownloading(false);
    }
  }, [profile?.username]);

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
    }
  }, [cardSettingsData]);

  function handleCountryChange(code: CountryCode) {
    setCountry(code);
    updateProfile.mutate({
      country: code,
      currency: COUNTRIES[code].currency,
    });
  }

  function handleCardTypeChange(type: CardType) {
    setCardType(type);
    updateCardSettings.mutate({ cardType: type });
  }

  function handleTemplateSelect(template: BusinessCardTemplate) {
    setSelectedTemplateId(template.id);
    updateCardSettings.mutate({ selectedTemplateId: template.id });
    toast.success(`Selected ${template.name}`);
  }

  const isLoading = profileLoading || cardLoading;

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

  const userData = {
    name: profile?.username ?? "Your Name",
    email: "email@example.com",
    phone: profile?.phone,
    company: profile?.company,
    profession: profile?.profession,
    address: profile?.address,
    profileImage: profile?.profileImage,
  };

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

      {/* Business Card Section */}
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
                    user={userData}
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
                        onClick={() => setOrientation("horizontal")}
                      >
                        Horizontal
                      </Button>
                      <Button
                        variant={orientation === "vertical" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setOrientation("vertical")}
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
                        onClick={() => setCardSize("standard")}
                      >
                        Standard
                      </Button>
                      <Button
                        variant={cardSize === "large" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCardSize("large")}
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
                onSelect={handleTemplateSelect}
              />
            </CardContent>
          </Card>
        </>
      )}

      {/* Wedding / Engagement / Anniversary placeholder message */}
      {(cardType === "wedding" || cardType === "engagement" || cardType === "anniversary") && (
        <Card>
          <CardHeader>
            <CardTitle>
              {cardType === "wedding"
                ? "Wedding Card Templates"
                : cardType === "engagement"
                  ? "Engagement Card Templates"
                  : "Anniversary Card Templates"}
            </CardTitle>
            <CardDescription>
              {cardType === "wedding"
                ? "26+ premium wedding invitation templates"
                : "Signature collection templates"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Wedding and event card templates are coming soon. Configure your details below.
            </p>
          </CardContent>
        </Card>
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

      {/* Template Selection Modal */}
      <TemplateSelectionModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        selectedId={selectedTemplateId}
        onSelect={handleTemplateSelect}
      />
    </div>
  );
}
