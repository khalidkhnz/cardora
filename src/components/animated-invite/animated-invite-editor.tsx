"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  animatedTemplates,
  animatedTemplateFilters,
  templateReligions,
  filterTemplates,
  getAnimatedTemplate,
} from "@/lib/templates/animated-templates";
import { getTemplateCategory } from "@/components/animated-invite/template-registry";
import { ImageUpload } from "@/components/shared/image-upload";
import { MusicUpload } from "@/components/shared/music-upload";
import { useInvite, useCreateInvite, useUpdateInvite } from "@/hooks/use-wedding";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Eye, X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

interface EventRow {
  name: string;
  date: string;
  venue: string;
  time: string;
}

interface ThingsToKnowRow {
  label: string;
  detail: string;
}

interface AnimatedInviteEditorProps {
  inviteId?: string;
  onSaved?: () => void;
}

function TemplatePreviewOverlay({
  templateId,
  filtered,
  onClose,
  onNavigate,
  onSelect,
}: {
  templateId: string;
  filtered: { id: string; name: string; preview: string }[];
  onClose: () => void;
  onNavigate: (id: string) => void;
  onSelect: (id: string) => void;
}) {
  const currentIndex = filtered.findIndex((t) => t.id === templateId);
  const template = getAnimatedTemplate(templateId);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < filtered.length - 1;

  const goPrev = useCallback(() => {
    if (hasPrev) onNavigate(filtered[currentIndex - 1]!.id);
  }, [hasPrev, currentIndex, filtered, onNavigate]);

  const goNext = useCallback(() => {
    if (hasNext) onNavigate(filtered[currentIndex + 1]!.id);
  }, [hasNext, currentIndex, filtered, onNavigate]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, goPrev, goNext]);

  return createPortal(
    <div className="fixed inset-0 z-[100] flex flex-col bg-black">
      {/* Top bar */}
      <div className="relative z-10 flex shrink-0 items-center justify-between border-b border-white/10 bg-black/80 px-4 py-2.5 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-lg">{template?.preview}</span>
            <span className="text-sm font-medium text-white">
              {template?.name}
            </span>
            <span className="text-xs text-white/50">
              {currentIndex + 1} / {filtered.length}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`/wedding/demo/${templateId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-white/20 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/10"
          >
            <ExternalLink className="h-3 w-3" />
            Visit Demo
          </a>
          <button
            onClick={() => {
              onSelect(templateId);
              onClose();
            }}
            className="rounded-lg bg-white px-4 py-1.5 text-xs font-semibold text-black transition-colors hover:bg-white/90"
          >
            Use This Template
          </button>
        </div>
      </div>

      {/* Template content — iframe preview */}
      <div className="relative min-h-0 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={templateId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            <iframe
              src={`/wedding/demo/${templateId}`}
              className="h-full w-full border-0"
              title={`Preview: ${template?.name ?? templateId}`}
              allow="autoplay"
            />
          </motion.div>
        </AnimatePresence>

        {hasPrev && (
          <button
            onClick={goPrev}
            className="absolute top-1/2 left-3 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-black/80"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        {hasNext && (
          <button
            onClick={goNext}
            className="absolute top-1/2 right-3 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-black/80"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Bottom bar — template strip */}
      <div className="relative z-10 shrink-0 border-t border-white/10 bg-black/80 backdrop-blur-sm">
        <div className="flex gap-1 overflow-x-auto px-3 py-2">
          {filtered.map((t) => (
            <button
              key={t.id}
              onClick={() => onNavigate(t.id)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                t.id === templateId
                  ? "bg-white text-black"
                  : "text-white/60 hover:bg-white/10 hover:text-white",
              )}
            >
              <span>{t.preview}</span>
              <span className="hidden sm:inline">{t.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function AnimatedInviteEditor({ inviteId, onSaved }: AnimatedInviteEditorProps) {
  const { data: existingInvite, isLoading } = useInvite(inviteId ?? "");
  const createInvite = useCreateInvite();
  const updateInviteMutation = useUpdateInvite(inviteId ?? "");

  const isEditing = !!inviteId;

  const [previewTemplateId, setPreviewTemplateId] = useState<string | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState("motion-video");
  const [category, setCategory] = useState("All");
  const [slug, setSlug] = useState("");
  const [groomName, setGroomName] = useState("");
  const [brideName, setBrideName] = useState("");
  const [weddingDate, setWeddingDate] = useState("");
  const [venue, setVenue] = useState("");
  const [venueAddress, setVenueAddress] = useState("");
  const [story, setStory] = useState("");
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [musicUrl, setMusicUrl] = useState<string | null>(null);

  // Extended fields
  const [weddingTime, setWeddingTime] = useState("");
  const [couplePhoto, setCouplePhoto] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [groomFatherName, setGroomFatherName] = useState("");
  const [groomMotherName, setGroomMotherName] = useState("");
  const [brideFatherName, setBrideFatherName] = useState("");
  const [brideMotherName, setBrideMotherName] = useState("");
  const [coupleMessage, setCoupleMessage] = useState("");
  const [events, setEvents] = useState<EventRow[]>([]);

  // Extra data fields
  const [hashtag, setHashtag] = useState("");
  const [thingsToKnow, setThingsToKnow] = useState<ThingsToKnowRow[]>([]);

  useEffect(() => {
    if (existingInvite && isEditing) {
      setSelectedTemplateId(existingInvite.templateId);
      setSlug(existingInvite.slug);
      setGroomName(existingInvite.groomName ?? "");
      setBrideName(existingInvite.brideName ?? "");
      setWeddingDate(existingInvite.weddingDate ?? "");
      setVenue(existingInvite.venue ?? "");
      setVenueAddress(existingInvite.venueAddress ?? "");
      setStory(existingInvite.story ?? "");
      setHeroImage(existingInvite.heroImage);
      setMusicUrl(existingInvite.musicUrl);
      setWeddingTime(existingInvite.weddingTime ?? "");
      setCouplePhoto(existingInvite.couplePhoto);
      setBackgroundImage(existingInvite.backgroundImage);
      setGroomFatherName(existingInvite.groomFatherName ?? "");
      setGroomMotherName(existingInvite.groomMotherName ?? "");
      setBrideFatherName(existingInvite.brideFatherName ?? "");
      setBrideMotherName(existingInvite.brideMotherName ?? "");
      setCoupleMessage(existingInvite.coupleMessage ?? "");
      setEvents(existingInvite.events ?? []);
      const extra = existingInvite.extraData;
      if (extra) {
        setHashtag((extra.hashtag as string) ?? "");
        const ttk = extra.thingsToKnow as ThingsToKnowRow[] | undefined;
        if (ttk && Array.isArray(ttk)) {
          setThingsToKnow(ttk);
        }
      }
    }
  }, [existingInvite, isEditing]);

  const templateCategory = getTemplateCategory(selectedTemplateId);
  const showMultiEventFields = templateCategory === "multi-event";
  const showCinematicFields =
    templateCategory === "cinematic" || templateCategory === "interactive";
  const showExtraDataFields = showMultiEventFields;

  const filtered = filterTemplates(category);

  function addEvent() {
    setEvents([
      ...events,
      { name: "", date: "", venue: venue, time: weddingTime || "6 PM" },
    ]);
  }

  function removeEvent(index: number) {
    setEvents(events.filter((_, i) => i !== index));
  }

  function updateEvent(index: number, field: keyof EventRow, value: string) {
    setEvents(
      events.map((e, i) => (i === index ? { ...e, [field]: value } : e)),
    );
  }

  function addThingToKnow() {
    setThingsToKnow([...thingsToKnow, { label: "", detail: "" }]);
  }

  function removeThingToKnow(index: number) {
    setThingsToKnow(thingsToKnow.filter((_, i) => i !== index));
  }

  function updateThingToKnow(
    index: number,
    field: keyof ThingsToKnowRow,
    value: string,
  ) {
    setThingsToKnow(
      thingsToKnow.map((t, i) => (i === index ? { ...t, [field]: value } : t)),
    );
  }

  async function handleSave() {
    if (!slug.trim()) {
      toast.error("Please enter a unique URL slug");
      return;
    }

    const extraData: Record<string, unknown> = {};
    if (hashtag) extraData.hashtag = hashtag;
    const filteredThingsToKnow = thingsToKnow.filter(
      (t) => t.label.trim() || t.detail.trim(),
    );
    if (filteredThingsToKnow.length > 0)
      extraData.thingsToKnow = filteredThingsToKnow;

    const payload = {
      slug: slug.trim().toLowerCase(),
      templateId: selectedTemplateId,
      groomName: groomName || undefined,
      brideName: brideName || undefined,
      weddingDate: weddingDate || undefined,
      venue: venue || undefined,
      venueAddress: venueAddress || undefined,
      story: story || undefined,
      weddingTime: weddingTime || undefined,
      couplePhoto: couplePhoto ?? undefined,
      backgroundImage: backgroundImage ?? undefined,
      groomFatherName: groomFatherName || undefined,
      groomMotherName: groomMotherName || undefined,
      brideFatherName: brideFatherName || undefined,
      brideMotherName: brideMotherName || undefined,
      coupleMessage: coupleMessage || undefined,
      events: events.length > 0 ? events : undefined,
      extraData: Object.keys(extraData).length > 0 ? extraData : undefined,
    };

    try {
      if (isEditing) {
        await updateInviteMutation.mutateAsync(payload);
        toast.success("Invite updated!");
      } else {
        await createInvite.mutateAsync(payload);
        toast.success("Invite created!");
      }
      onSaved?.();
    } catch {
      toast.error(isEditing ? "Failed to update invite" : "Failed to create invite");
    }
  }

  const isSaving = createInvite.isPending || updateInviteMutation.isPending;

  if (isLoading && isEditing) {
    return (
      <div className="text-muted-foreground py-8 text-center">Loading...</div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Fullscreen Preview Overlay */}
      {previewTemplateId && (
        <TemplatePreviewOverlay
          templateId={previewTemplateId}
          filtered={filtered}
          onClose={() => setPreviewTemplateId(null)}
          onNavigate={setPreviewTemplateId}
          onSelect={setSelectedTemplateId}
        />
      )}

      {/* Template Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Choose Template</CardTitle>
          <CardDescription>
            Select from {animatedTemplates.length} animated wedding invite
            templates
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Merged filter row: style categories + religion filters */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {animatedTemplateFilters.map((filter, idx) => {
              const isReligion = templateReligions.some((r) => r.label === filter);
              const isFirstReligion = isReligion && !templateReligions.some((r) => r.label === animatedTemplateFilters[idx - 1]);
              return (
                <div key={filter} className="flex items-center gap-2">
                  {isFirstReligion && (
                    <div className="mx-1 h-5 w-px bg-border" />
                  )}
                  <button
                    type="button"
                    onClick={() => setCategory(filter)}
                    className={cn(
                      "rounded-full px-3 py-1 text-sm font-medium transition-colors",
                      category === filter
                        ? isReligion
                          ? "bg-amber-600 text-white"
                          : "bg-primary text-primary-foreground"
                        : isReligion
                          ? "bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/50"
                          : "bg-muted hover:bg-muted/80",
                    )}
                  >
                    {filter}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Template grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((template, i) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ scale: 1.02 }}
                className={cn(
                  "relative cursor-pointer rounded-xl border-2 p-4 text-left transition-all",
                  selectedTemplateId === template.id
                    ? "border-primary ring-primary/20 ring-2"
                    : "border-muted hover:border-muted-foreground/30",
                )}
                onClick={() => setSelectedTemplateId(template.id)}
              >
                <span className="text-3xl">{template.preview}</span>
                <p className="mt-2 text-sm font-semibold">{template.name}</p>
                <p className="text-muted-foreground line-clamp-2 text-xs">
                  {template.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {template.features.slice(0, 2).map((f) => (
                    <Badge key={f} variant="secondary" className="text-[10px]">
                      {f}
                    </Badge>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewTemplateId(template.id);
                  }}
                  className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-muted/80 px-2 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Eye className="h-3 w-3" />
                  Preview Demo
                </button>
                {selectedTemplateId === template.id && (
                  <div className="bg-primary text-primary-foreground absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs">
                    ✓
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Invite Details */}
      <Card>
        <CardHeader>
          <CardTitle>Invite Details</CardTitle>
          <CardDescription>Fill in your wedding details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>URL Slug *</Label>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">/wedding/</span>
              <Input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="john-and-jane"
                disabled={isEditing}
              />
            </div>
            <p className="text-muted-foreground text-xs">
              {isEditing
                ? "Slug cannot be changed after creation"
                : "Only lowercase letters, numbers, and hyphens"}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Groom Name</Label>
              <Input
                value={groomName}
                onChange={(e) => setGroomName(e.target.value)}
                placeholder="Groom's name"
              />
            </div>
            <div className="space-y-2">
              <Label>Bride Name</Label>
              <Input
                value={brideName}
                onChange={(e) => setBrideName(e.target.value)}
                placeholder="Bride's name"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Wedding Date</Label>
              <Input
                type="date"
                value={weddingDate}
                onChange={(e) => setWeddingDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Wedding Time</Label>
              <Input
                value={weddingTime}
                onChange={(e) => setWeddingTime(e.target.value)}
                placeholder="e.g. 6:00 PM"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Venue</Label>
              <Input
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="Venue name"
              />
            </div>
            <div className="space-y-2">
              <Label>Venue Address</Label>
              <Input
                value={venueAddress}
                onChange={(e) => setVenueAddress(e.target.value)}
                placeholder="Full address"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Your Story</Label>
            <Textarea
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Tell your love story..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Parent Names — shown for multi-event & cinematic */}
      {(showMultiEventFields || showCinematicFields) && (
        <Card>
          <CardHeader>
            <CardTitle>Family Details</CardTitle>
            <CardDescription>
              Parent names for the blessings section
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Groom&apos;s Father</Label>
                <Input
                  value={groomFatherName}
                  onChange={(e) => setGroomFatherName(e.target.value)}
                  placeholder="Father's name"
                />
              </div>
              <div className="space-y-2">
                <Label>Groom&apos;s Mother</Label>
                <Input
                  value={groomMotherName}
                  onChange={(e) => setGroomMotherName(e.target.value)}
                  placeholder="Mother's name"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Bride&apos;s Father</Label>
                <Input
                  value={brideFatherName}
                  onChange={(e) => setBrideFatherName(e.target.value)}
                  placeholder="Father's name"
                />
              </div>
              <div className="space-y-2">
                <Label>Bride&apos;s Mother</Label>
                <Input
                  value={brideMotherName}
                  onChange={(e) => setBrideMotherName(e.target.value)}
                  placeholder="Mother's name"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Couple Message</Label>
              <Textarea
                value={coupleMessage}
                onChange={(e) => setCoupleMessage(e.target.value)}
                placeholder="A personal message to your guests..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Events Editor — shown for multi-event templates */}
      {showMultiEventFields && (
        <Card>
          <CardHeader>
            <CardTitle>Wedding Events</CardTitle>
            <CardDescription>
              Add multiple events (Mehendi, Haldi, Sangeet, Wedding, Reception,
              etc.)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {events.map((event, index) => (
              <div key={index} className="rounded-lg border p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Event {index + 1}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEvent(index)}
                    className="text-destructive h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Label className="text-xs">Event Name</Label>
                    <Input
                      value={event.name}
                      onChange={(e) =>
                        updateEvent(index, "name", e.target.value)
                      }
                      placeholder="e.g. Mehendi"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Date</Label>
                    <Input
                      value={event.date}
                      onChange={(e) =>
                        updateEvent(index, "date", e.target.value)
                      }
                      placeholder="e.g. Friday, March 7th 2026"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Venue</Label>
                    <Input
                      value={event.venue}
                      onChange={(e) =>
                        updateEvent(index, "venue", e.target.value)
                      }
                      placeholder="Venue name"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Time</Label>
                    <Input
                      value={event.time}
                      onChange={(e) =>
                        updateEvent(index, "time", e.target.value)
                      }
                      placeholder="e.g. 6 PM Onwards"
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={addEvent} className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Add Event
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Extra Data — shown for multi-event templates */}
      {showExtraDataFields && (
        <Card>
          <CardHeader>
            <CardTitle>Additional Info</CardTitle>
            <CardDescription>
              Hashtag and &quot;Things to Know&quot; details for your guests
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Wedding Hashtag</Label>
              <Input
                value={hashtag}
                onChange={(e) => setHashtag(e.target.value)}
                placeholder="#OurWedding"
              />
            </div>

            <div className="pt-2">
              <Label className="mb-3 block">Things to Know</Label>
              <p className="text-muted-foreground mb-3 text-xs">
                Add helpful info for guests (weather, parking, dress code,
                accommodation, etc.)
              </p>
              {thingsToKnow.map((item, index) => (
                <div key={index} className="mb-3 rounded-lg border p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Item {index + 1}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeThingToKnow(index)}
                      className="text-destructive h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                      <Label className="text-xs">Label</Label>
                      <Input
                        value={item.label}
                        onChange={(e) =>
                          updateThingToKnow(index, "label", e.target.value)
                        }
                        placeholder="e.g. Weather"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Detail</Label>
                      <Input
                        value={item.detail}
                        onChange={(e) =>
                          updateThingToKnow(index, "detail", e.target.value)
                        }
                        placeholder="e.g. Expected sunny, 25°C"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={addThingToKnow}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Item
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Media Uploads */}
      <Card>
        <CardHeader>
          <CardTitle>Media</CardTitle>
          <CardDescription>
            Upload photos and music for your invite
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Hero Image</Label>
            <ImageUpload
              value={heroImage}
              onChange={setHeroImage}
              type="couple"
            />
          </div>

          {(showCinematicFields || showMultiEventFields) && (
            <>
              <div className="space-y-2">
                <Label>Couple Photo</Label>
                <ImageUpload
                  value={couplePhoto}
                  onChange={setCouplePhoto}
                  type="couple"
                />
              </div>
              <div className="space-y-2">
                <Label>Background Image</Label>
                <ImageUpload
                  value={backgroundImage}
                  onChange={setBackgroundImage}
                  type="couple"
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label>Background Music</Label>
            <MusicUpload value={musicUrl} onChange={setMusicUrl} />
          </div>
        </CardContent>
      </Card>

      {/* Save */}
      <Button
        onClick={() => void handleSave()}
        disabled={isSaving}
        size="lg"
        className="w-full sm:w-auto"
      >
        {isSaving ? "Saving..." : isEditing ? "Update Invite" : "Create Invite"}
      </Button>

      {isEditing && existingInvite && (
        <p className="text-muted-foreground text-sm">
          Preview your invite at{" "}
          <a
            href={`/wedding/${existingInvite.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            /wedding/{existingInvite.slug}
          </a>
        </p>
      )}
    </div>
  );
}
