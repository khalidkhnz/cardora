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
import { ImageUpload } from "@/components/shared/image-upload";
import { MusicUpload } from "@/components/shared/music-upload";
import { useCurrentInvite, useCreateInvite } from "@/hooks/use-wedding";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
    }
  }, [currentInvite]);

  const filtered =
    category === "All"
      ? animatedTemplates
      : animatedTemplates.filter((t) => t.category === category);

  async function handleSave() {
    if (!slug.trim()) {
      toast.error("Please enter a unique URL slug");
      return;
    }

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
              <motion.button
                key={template.id}
                type="button"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedTemplateId(template.id)}
                className={cn(
                  "relative rounded-xl border-2 p-4 text-left transition-all",
                  selectedTemplateId === template.id
                    ? "border-primary ring-primary/20 ring-2"
                    : "border-muted hover:border-muted-foreground/30",
                )}
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
                {selectedTemplateId === template.id && (
                  <div className="bg-primary text-primary-foreground absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs">
                    ✓
                  </div>
                )}
              </motion.button>
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
              <Label>Venue</Label>
              <Input
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="Venue name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Venue Address</Label>
            <Input
              value={venueAddress}
              onChange={(e) => setVenueAddress(e.target.value)}
              placeholder="Full address"
            />
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
