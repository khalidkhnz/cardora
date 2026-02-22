"use client";

import { useState, useEffect } from "react";
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
  animatedTemplateCategories,
} from "@/lib/templates/animated-templates";
import { getTemplateCategory } from "@/components/animated-invite/template-registry";
import { ImageUpload } from "@/components/shared/image-upload";
import { MusicUpload } from "@/components/shared/music-upload";
import { useCurrentInvite, useCreateInvite } from "@/hooks/use-wedding";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Plus, Trash2, Eye } from "lucide-react";
import Link from "next/link";

interface EventRow {
  name: string;
  date: string;
  venue: string;
  time: string;
}

export function AnimatedInviteEditor() {
  const { data: currentInvite, isLoading } = useCurrentInvite();
  const createInvite = useCreateInvite();

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
  const [weather, setWeather] = useState("");
  const [parking, setParking] = useState("");
  const [hotelInfo, setHotelInfo] = useState("");

  useEffect(() => {
    if (currentInvite) {
      setSelectedTemplateId(currentInvite.templateId);
      setSlug(currentInvite.slug);
      setGroomName(currentInvite.groomName ?? "");
      setBrideName(currentInvite.brideName ?? "");
      setWeddingDate(currentInvite.weddingDate ?? "");
      setVenue(currentInvite.venue ?? "");
      setVenueAddress(currentInvite.venueAddress ?? "");
      setStory(currentInvite.story ?? "");
      setHeroImage(currentInvite.heroImage);
      setMusicUrl(currentInvite.musicUrl);
      setWeddingTime(currentInvite.weddingTime ?? "");
      setCouplePhoto(currentInvite.couplePhoto);
      setBackgroundImage(currentInvite.backgroundImage);
      setGroomFatherName(currentInvite.groomFatherName ?? "");
      setGroomMotherName(currentInvite.groomMotherName ?? "");
      setBrideFatherName(currentInvite.brideFatherName ?? "");
      setBrideMotherName(currentInvite.brideMotherName ?? "");
      setCoupleMessage(currentInvite.coupleMessage ?? "");
      setEvents(currentInvite.events ?? []);
      const extra = currentInvite.extraData;
      if (extra) {
        setHashtag((extra.hashtag as string) ?? "");
        setWeather((extra.weather as string) ?? "");
        setParking((extra.parking as string) ?? "");
        setHotelInfo((extra.hotelInfo as string) ?? "");
      }
    }
  }, [currentInvite]);

  const templateCategory = getTemplateCategory(selectedTemplateId);
  const showMultiEventFields = templateCategory === "multi-event";
  const showCinematicFields = templateCategory === "cinematic" || templateCategory === "interactive";
  const showExtraDataFields = showMultiEventFields;

  const filtered =
    category === "All"
      ? animatedTemplates
      : animatedTemplates.filter((t) => t.category === category);

  function addEvent() {
    setEvents([...events, { name: "", date: "", venue: venue, time: weddingTime || "6 PM" }]);
  }

  function removeEvent(index: number) {
    setEvents(events.filter((_, i) => i !== index));
  }

  function updateEvent(index: number, field: keyof EventRow, value: string) {
    setEvents(events.map((e, i) => (i === index ? { ...e, [field]: value } : e)));
  }

  async function handleSave() {
    if (!slug.trim()) {
      toast.error("Please enter a unique URL slug");
      return;
    }

    const extraData: Record<string, unknown> = {};
    if (hashtag) extraData.hashtag = hashtag;
    if (weather) extraData.weather = weather;
    if (parking) extraData.parking = parking;
    if (hotelInfo) extraData.hotelInfo = hotelInfo;

    try {
      await createInvite.mutateAsync({
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
      });
      toast.success("Invite saved!");
    } catch {
      toast.error("Failed to save invite");
    }
  }

  if (isLoading) {
    return <div className="text-muted-foreground py-8 text-center">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Template Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Choose Template</CardTitle>
          <CardDescription>
            Select from {animatedTemplates.length} animated wedding invite templates
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Category filter */}
          <div className="mb-4 flex flex-wrap gap-2">
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
            {animatedTemplateCategories.map((cat) => (
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
                <Link
                  href={`/preview/${template.id}`}
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                  className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-muted/80 px-2 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Eye className="h-3 w-3" />
                  Preview Demo
                </Link>
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
              />
            </div>
            <p className="text-muted-foreground text-xs">
              Only lowercase letters, numbers, and hyphens
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
              Add multiple events (Mehendi, Haldi, Sangeet, Wedding, Reception, etc.)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {events.map((event, index) => (
              <div key={index} className="rounded-lg border p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium">Event {index + 1}</span>
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
                      onChange={(e) => updateEvent(index, "name", e.target.value)}
                      placeholder="e.g. Mehendi"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Date</Label>
                    <Input
                      value={event.date}
                      onChange={(e) => updateEvent(index, "date", e.target.value)}
                      placeholder="e.g. Friday, March 7th 2026"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Venue</Label>
                    <Input
                      value={event.venue}
                      onChange={(e) => updateEvent(index, "venue", e.target.value)}
                      placeholder="Venue name"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Time</Label>
                    <Input
                      value={event.time}
                      onChange={(e) => updateEvent(index, "time", e.target.value)}
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
              Extra details shown in the &quot;Things to Know&quot; section
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Wedding Hashtag</Label>
                <Input
                  value={hashtag}
                  onChange={(e) => setHashtag(e.target.value)}
                  placeholder="#OurWedding"
                />
              </div>
              <div className="space-y-2">
                <Label>Weather Info</Label>
                <Input
                  value={weather}
                  onChange={(e) => setWeather(e.target.value)}
                  placeholder="Expected weather at venue"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Parking Info</Label>
                <Input
                  value={parking}
                  onChange={(e) => setParking(e.target.value)}
                  placeholder="Parking arrangements"
                />
              </div>
              <div className="space-y-2">
                <Label>Hotel / Accommodation</Label>
                <Input
                  value={hotelInfo}
                  onChange={(e) => setHotelInfo(e.target.value)}
                  placeholder="Recommended hotels nearby"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Media Uploads */}
      <Card>
        <CardHeader>
          <CardTitle>Media</CardTitle>
          <CardDescription>Upload photos and music for your invite</CardDescription>
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
        disabled={createInvite.isPending}
        size="lg"
        className="w-full sm:w-auto"
      >
        {createInvite.isPending ? "Saving..." : "Save Invite"}
      </Button>

      {currentInvite && (
        <p className="text-muted-foreground text-sm">
          Preview your invite at{" "}
          <a
            href={`/wedding/${currentInvite.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            /wedding/{currentInvite.slug}
          </a>
        </p>
      )}
    </div>
  );
}
