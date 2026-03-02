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
import { BusinessCardBack } from "@/components/card/business-card-back";
import { WeddingCardBack } from "@/components/card/wedding-card-back";
import { FlippableCard } from "@/components/card/flippable-card";
import { TemplateGrid } from "@/components/card/template-grid";
import { WeddingTemplateGrid } from "@/components/card/wedding-template-grid";
import { TemplateSelectionModal } from "@/components/card/template-selection-modal";
import { WeddingTemplateSelectionModal } from "@/components/card/wedding-template-selection-modal";
import { CardPreviewDialog } from "@/components/card/card-preview-dialog";
import { CardConfigForm } from "@/components/card/card-config-form";
import { useUserProfile, useUpdateProfile } from "@/hooks/use-user";
import {
  useUserCards,
  useCard,
  useCreateCard,
  useUpdateCard,
  useDeleteCard,
  useSetDefaultCard,
} from "@/hooks/use-card";
import type { CountryCode } from "@/lib/constants";
import { COUNTRIES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  Download,
  AlertCircle,
  RefreshCw,
  Eye,
  Sparkles,
  Plus,
  ArrowLeft,
  Star,
  Trash2,
  Pencil,
  CreditCard,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { BusinessCardTemplate } from "@/lib/templates/business-card-templates";
import type { WeddingCardTemplate } from "@/lib/templates/wedding-card-templates";
import { downloadCardAsPDF } from "@/lib/download-card-pdf";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Create Card Dialog (inline)
// ---------------------------------------------------------------------------
function CreateCardForm({ onCreated }: { onCreated: (id: string) => void }) {
  const [slug, setSlug] = useState("");
  const [name, setName] = useState("");
  const createCard = useCreateCard();

  async function handleCreate() {
    if (!slug.trim()) {
      toast.error("Please enter a URL slug");
      return;
    }
    try {
      const card = await createCard.mutateAsync({
        slug: slug.trim().toLowerCase(),
        name: name.trim() || undefined,
      });
      toast.success("Card created!");
      onCreated(card.id);
    } catch {
      toast.error("Failed to create card");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Card</CardTitle>
        <CardDescription>Add a new digital card to your profile</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Card Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Business Card, Wedding Card"
          />
        </div>
        <div className="space-y-2">
          <Label>URL Slug *</Label>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">/u/username/</span>
            <Input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="my-card"
            />
          </div>
          <p className="text-muted-foreground text-xs">
            Only lowercase letters, numbers, and hyphens. Use &quot;default&quot; for your main card.
          </p>
        </div>
        <Button onClick={() => void handleCreate()} disabled={createCard.isPending}>
          {createCard.isPending ? "Creating..." : "Create Card"}
        </Button>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Card List View
// ---------------------------------------------------------------------------
function CardListView({
  onSelectCard,
  onCreateCard,
}: {
  onSelectCard: (cardId: string) => void;
  onCreateCard: () => void;
}) {
  const { data: cards, isLoading, isError, refetch } = useUserCards();
  const deleteCard = useDeleteCard();
  const setDefault = useSetDefaultCard();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>Failed to load cards.</span>
          <Button variant="outline" size="sm" onClick={() => void refetch()}>
            <RefreshCw className="mr-2 h-4 w-4" /> Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          {cards?.length ?? 0} card{(cards?.length ?? 0) !== 1 ? "s" : ""}
        </p>
        <Button onClick={onCreateCard}>
          <Plus className="mr-2 h-4 w-4" /> New Card
        </Button>
      </div>

      {(!cards || cards.length === 0) && (
        <Card>
          <CardContent className="py-12 text-center">
            <CreditCard className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <p className="text-muted-foreground mb-4">No cards yet. Create your first card!</p>
            <Button onClick={onCreateCard}>
              <Plus className="mr-2 h-4 w-4" /> Create Card
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {cards?.map((card) => (
          <Card
            key={card.id}
            className="cursor-pointer transition-shadow hover:shadow-md"
            onClick={() => onSelectCard(card.id)}
          >
            <CardContent className="flex items-center gap-4 p-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-sm font-semibold">
                    {card.name ?? card.slug}
                  </h3>
                  {card.isDefault && (
                    <Badge variant="default" className="shrink-0 text-[10px]">
                      <Star className="mr-1 h-3 w-3" /> Default
                    </Badge>
                  )}
                  <Badge variant="secondary" className="shrink-0 text-[10px]">
                    {card.cardType ?? "business"}
                  </Badge>
                </div>
                <p className="text-muted-foreground truncate text-xs">
                  /{card.slug}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                {!card.isDefault && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      void setDefault.mutateAsync(card.id).then(() =>
                        toast.success("Set as default"),
                      );
                    }}
                  >
                    <Star className="h-3.5 w-3.5" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCard(card.id);
                  }}
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                {!card.isDefault && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm("Delete this card?")) {
                        void deleteCard.mutateAsync(card.id).then(() =>
                          toast.success("Card deleted"),
                        );
                      }
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Card Editor View (editing a specific card)
// ---------------------------------------------------------------------------
function CardEditorView({
  cardId,
  onBack,
}: {
  cardId: string;
  onBack: () => void;
}) {
  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const { data: cardData, isLoading: cardLoading } = useCard(cardId);
  const updateProfile = useUpdateProfile();
  const updateCard = useUpdateCard(cardId);

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
        : `${cardType}-card-${cardData?.groomName ?? "card"}`;
      await downloadCardAsPDF(ref, filename);
      toast.success("PDF downloaded!");
    } catch {
      toast.error("Failed to download PDF");
    } finally {
      setDownloading(false);
    }
  }, [profile?.username, cardType, cardData?.groomName]);

  useEffect(() => {
    if (profile) {
      setCountry((profile.country as CountryCode) ?? "CA");
    }
  }, [profile]);

  useEffect(() => {
    if (cardData) {
      setCardType(cardData.cardType ?? "business");
      setSelectedTemplateId(cardData.selectedTemplateId);
      setOrientation(cardData.orientation ?? "horizontal");
      setCardSize(cardData.cardSize ?? "standard");
    }
  }, [cardData]);

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
    updateCard.mutate(
      { cardType: type, selectedTemplateId: null },
      { onError: () => toast.error("Failed to update card type") },
    );
  }

  function handleBusinessTemplateSelect(template: BusinessCardTemplate) {
    setSelectedTemplateId(template.id);
    updateCard.mutate(
      { selectedTemplateId: template.id },
      {
        onSuccess: () => toast.success(`Selected ${template.name}`),
        onError: () => toast.error("Failed to select template"),
      },
    );
  }

  function handleWeddingTemplateSelect(template: WeddingCardTemplate) {
    setSelectedTemplateId(template.id);
    updateCard.mutate(
      { selectedTemplateId: template.id },
      {
        onSuccess: () => toast.success(`Selected ${template.name}`),
        onError: () => toast.error("Failed to select template"),
      },
    );
  }

  function handleOrientationChange(value: "horizontal" | "vertical") {
    setOrientation(value);
    updateCard.mutate(
      { orientation: value },
      { onError: () => toast.error("Failed to update orientation") },
    );
  }

  function handleCardSizeChange(value: "standard" | "large") {
    setCardSize(value);
    updateCard.mutate(
      { cardSize: value },
      { onError: () => toast.error("Failed to update size") },
    );
  }

  const isLoading = profileLoading || cardLoading;
  const isWeddingType = cardType === "wedding" || cardType === "engagement" || cardType === "anniversary";

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-48" />
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
    groomName: cardData?.groomName,
    brideName: cardData?.brideName,
    weddingDate: cardData?.weddingDate,
    venue: cardData?.venue,
    groomParentNames: cardData?.groomParentNames,
    brideParentNames: cardData?.brideParentNames,
    deceasedElders: cardData?.deceasedElders,
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
      {/* Back + Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cards
        </Button>
        <div>
          <h2 className="text-xl font-semibold">{cardData?.name ?? cardData?.slug ?? "Edit Card"}</h2>
          {cardData?.slug && (
            <p className="text-muted-foreground text-xs">/{cardData.slug}</p>
          )}
        </div>
        {cardData?.isDefault && (
          <Badge variant="default" className="text-[10px]">
            <Star className="mr-1 h-3 w-3" /> Default
          </Badge>
        )}
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
                <div className="flex flex-1 items-center justify-center rounded-lg border bg-gradient-to-br from-gray-50 to-gray-100 p-8 dark:from-gray-900 dark:to-gray-800">
                  <FlippableCard
                    width={cardSize === "standard" ? (orientation === "horizontal" ? 256 : 160) : (orientation === "horizontal" ? 320 : 208)}
                    height={cardSize === "standard" ? (orientation === "horizontal" ? 160 : 256) : (orientation === "horizontal" ? 208 : 320)}
                    front={
                      <BusinessCardPreview
                        user={businessData}
                        templateId={selectedTemplateId}
                        orientation={orientation}
                        size={cardSize}
                        bare
                      />
                    }
                    back={
                      <BusinessCardBack
                        user={businessData}
                        username={profile?.username}
                        templateId={selectedTemplateId}
                        orientation={orientation}
                        size={cardSize}
                      />
                    }
                  />
                  <div style={{ position: "absolute", left: -9999, top: -9999 }}>
                    <BusinessCardPreview
                      ref={cardRef}
                      user={businessData}
                      templateId={selectedTemplateId}
                      orientation={orientation}
                      size={cardSize}
                    />
                  </div>
                </div>

                <div className="w-full space-y-4 lg:w-64">
                  <div>
                    <p className="mb-2 text-sm font-medium">Orientation</p>
                    <div className="flex gap-2">
                      <Button variant={orientation === "horizontal" ? "default" : "outline"} size="sm" onClick={() => handleOrientationChange("horizontal")}>Horizontal</Button>
                      <Button variant={orientation === "vertical" ? "default" : "outline"} size="sm" onClick={() => handleOrientationChange("vertical")}>Vertical</Button>
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium">Size</p>
                    <div className="flex gap-2">
                      <Button variant={cardSize === "standard" ? "default" : "outline"} size="sm" onClick={() => handleCardSizeChange("standard")}>Standard</Button>
                      <Button variant={cardSize === "large" ? "default" : "outline"} size="sm" onClick={() => handleCardSizeChange("large")}>Large</Button>
                    </div>
                  </div>
                  <Separator />
                  <Button className="w-full" onClick={() => setModalOpen(true)}>Change Template</Button>
                  <Button className="w-full" variant="secondary" onClick={() => setPreviewOpen(true)}>
                    <Eye className="mr-2 h-4 w-4" /> Preview
                  </Button>
                  <Button className="w-full" variant="outline" onClick={() => void handleDownloadPDF()} disabled={downloading}>
                    <Download className="mr-2 h-4 w-4" /> {downloading ? "Generating..." : "Download PDF"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Card Templates</CardTitle>
              <CardDescription>Choose from our collection of professionally designed templates</CardDescription>
            </CardHeader>
            <CardContent>
              <TemplateGrid selectedId={selectedTemplateId} onSelect={handleBusinessTemplateSelect} />
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
                <div className="flex flex-1 items-center justify-center rounded-lg border bg-gradient-to-br from-gray-50 to-gray-100 p-8 dark:from-gray-900 dark:to-gray-800">
                  <FlippableCard
                    width={cardSize === "standard" ? (orientation === "horizontal" ? 256 : 192) : (orientation === "horizontal" ? 320 : 240)}
                    height={cardSize === "standard" ? (orientation === "horizontal" ? 160 : 288) : (orientation === "horizontal" ? 208 : 352)}
                    front={
                      <WeddingCardPreview data={weddingData} templateId={selectedTemplateId} orientation={orientation} size={cardSize} bare />
                    }
                    back={
                      <WeddingCardBack data={weddingData} templateId={selectedTemplateId} orientation={orientation} size={cardSize} />
                    }
                  />
                  <div style={{ position: "absolute", left: -9999, top: -9999 }}>
                    <WeddingCardPreview ref={weddingCardRef} data={weddingData} templateId={selectedTemplateId} orientation={orientation} size={cardSize} />
                  </div>
                </div>

                <div className="w-full space-y-4 lg:w-64">
                  <div>
                    <p className="mb-2 text-sm font-medium">Orientation</p>
                    <div className="flex gap-2">
                      <Button variant={orientation === "horizontal" ? "default" : "outline"} size="sm" onClick={() => handleOrientationChange("horizontal")}>Horizontal</Button>
                      <Button variant={orientation === "vertical" ? "default" : "outline"} size="sm" onClick={() => handleOrientationChange("vertical")}>Vertical</Button>
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium">Size</p>
                    <div className="flex gap-2">
                      <Button variant={cardSize === "standard" ? "default" : "outline"} size="sm" onClick={() => handleCardSizeChange("standard")}>Standard</Button>
                      <Button variant={cardSize === "large" ? "default" : "outline"} size="sm" onClick={() => handleCardSizeChange("large")}>Large</Button>
                    </div>
                  </div>
                  <Separator />
                  <Button className="w-full" onClick={() => setModalOpen(true)}>Change Template</Button>
                  <Button className="w-full" variant="secondary" onClick={() => setPreviewOpen(true)}>
                    <Eye className="mr-2 h-4 w-4" /> Preview
                  </Button>
                  <Button className="w-full" variant="outline" onClick={() => void handleDownloadPDF()} disabled={downloading}>
                    <Download className="mr-2 h-4 w-4" /> {downloading ? "Generating..." : "Download PDF"}
                  </Button>
                  <Separator />
                  <Button className="w-full" variant="outline" asChild>
                    <Link href="/dashboard/animated-invite">
                      <Sparkles className="mr-2 h-4 w-4" /> Animated Invite Editor
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{cardTypeLabel} Card Templates</CardTitle>
              <CardDescription>
                Choose from {cardTypeLabel.toLowerCase() === "wedding" ? "27" : "our"} premium {cardTypeLabel.toLowerCase()} card templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WeddingTemplateGrid selectedId={selectedTemplateId} onSelect={handleWeddingTemplateSelect} />
            </CardContent>
          </Card>
        </>
      )}

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Configure your profile and card settings</CardDescription>
        </CardHeader>
        <CardContent>
          <CardConfigForm cardType={cardType} />
        </CardContent>
      </Card>

      {cardType === "business" && (
        <TemplateSelectionModal open={modalOpen} onOpenChange={setModalOpen} selectedId={selectedTemplateId} onSelect={handleBusinessTemplateSelect} />
      )}
      {isWeddingType && (
        <WeddingTemplateSelectionModal open={modalOpen} onOpenChange={setModalOpen} selectedId={selectedTemplateId} onSelect={handleWeddingTemplateSelect} />
      )}
      <CardPreviewDialog open={previewOpen} onOpenChange={setPreviewOpen} cardType={cardType} businessData={businessData} weddingData={weddingData} templateId={selectedTemplateId} orientation={orientation} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export default function CardPage() {
  const { data: cards, isLoading: cardsLoading } = useUserCards();
  const [view, setView] = useState<"list" | "create" | "edit">("list");
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const autoOpenedRef = useRef(false);

  // Auto-open editor for default card when there's only 1 card
  useEffect(() => {
    if (!autoOpenedRef.current && cards?.length === 1 && cards[0]) {
      autoOpenedRef.current = true;
      setEditingCardId(cards[0].id);
      setView("edit");
    }
  }, [cards]);

  function handleSelectCard(cardId: string) {
    setEditingCardId(cardId);
    setView("edit");
  }

  function handleCreated(cardId: string) {
    setEditingCardId(cardId);
    setView("edit");
  }

  if (cardsLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Card Editor</h1>
          <p className="text-muted-foreground">
            Design and customize your digital cards
          </p>
        </div>
        <Skeleton className="h-48" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Card Editor</h1>
        <p className="text-muted-foreground">
          Design and customize your digital cards
        </p>
      </div>

      {view === "list" && (
        <CardListView
          onSelectCard={handleSelectCard}
          onCreateCard={() => setView("create")}
        />
      )}

      {view === "create" && (
        <div className="space-y-4">
          <Button variant="ghost" size="sm" onClick={() => setView("list")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cards
          </Button>
          <CreateCardForm onCreated={handleCreated} />
        </div>
      )}

      {view === "edit" && editingCardId && (
        <CardEditorView
          cardId={editingCardId}
          onBack={() => {
            setView("list");
            setEditingCardId(null);
          }}
        />
      )}
    </div>
  );
}
