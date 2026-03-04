"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUserProfile, useUpdateProfile } from "@/hooks/use-user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageUpload } from "@/components/shared/image-upload";
import { COUNTRIES, type CountryCode } from "@/lib/constants";
import { platform } from "@/lib/platform";

export function ProfileForm() {
  const { data: profile, isLoading } = useUserProfile();
  const updateProfile = useUpdateProfile();

  const [form, setForm] = useState({
    username: "",
    profession: "",
    company: "",
    phone: "",
    whatsapp: "",
    address: "",
    country: "IN" as string,
    currency: "INR" as string,
    profileEnabled: true,
    paymentEnabled: false,
    paymentType: "flexible" as "fixed" | "flexible",
    fixedAmount: null as number | null,
    interacEmail: null as string | null,
    socialLinks: {} as Record<string, string>,
    profileImage: null as string | null,
  });

  useEffect(() => {
    if (profile) {
      setForm({
        username: profile.username ?? "",
        profession: profile.profession ?? "",
        company: profile.company ?? "",
        phone: profile.phone ?? "",
        whatsapp: profile.whatsapp ?? "",
        address: profile.address ?? "",
        country: profile.country ?? "IN",
        currency: profile.currency ?? "INR",
        profileEnabled: profile.profileEnabled,
        paymentEnabled: profile.paymentEnabled,
        paymentType: profile.paymentType ?? "flexible",
        fixedAmount: profile.fixedAmount,
        interacEmail: profile.interacEmail,
        socialLinks: profile.socialLinks ?? {},
        profileImage: profile.profileImage ?? null,
      });
    }
  }, [profile]);

  function updateField<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateSocialLink(key: string, value: string) {
    setForm((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [key]: value },
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await updateProfile.mutateAsync(form);
      toast.success("Profile updated");
    } catch {
      toast.error("Failed to update profile");
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Profile Image */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Photo</CardTitle>
          <CardDescription>
            Upload a photo that will appear on your public profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            {form.profileImage ? (
              <div
                className="h-20 w-20 shrink-0 rounded-full border-2 bg-cover bg-center"
                style={{ backgroundImage: `url(${form.profileImage})` }}
              />
            ) : (
              <div className="bg-muted text-muted-foreground flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 text-xl font-bold">
                {profile?.name
                  ?.split(" ")
                  .map((w: string) => w[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2) ?? "?"}
              </div>
            )}
            <ImageUpload
              value={form.profileImage}
              onChange={(url) => updateField("profileImage", url)}
              type="profile"
              className="flex-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Your public profile information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={form.username}
                onChange={(e) => updateField("username", e.target.value)}
                placeholder="johndoe"
                pattern="^[a-zA-Z0-9_-]+$"
                minLength={3}
                maxLength={30}
              />
              <p className="text-xs text-muted-foreground">
                {platform.domain}/u/{form.username || "username"}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="profession">Profession</Label>
              <Input
                id="profession"
                value={form.profession}
                onChange={(e) => updateField("profession", e.target.value)}
                placeholder="Software Engineer"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={form.company}
                onChange={(e) => updateField("company", e.target.value)}
                placeholder="Acme Inc."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select
                value={form.country}
                onValueChange={(v) => {
                  updateField("country", v);
                  const country = COUNTRIES[v as CountryCode];
                  if (country) {
                    updateField("currency", country.currency);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(COUNTRIES).map(([code, c]) => (
                    <SelectItem key={code} value={code}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input
                id="whatsapp"
                value={form.whatsapp}
                onChange={(e) => updateField("whatsapp", e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={form.address}
              onChange={(e) => updateField("address", e.target.value)}
              placeholder="123 Main St, City, Country"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
          <CardDescription>Add links to your social profiles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {["website", "linkedin", "twitter", "instagram", "facebook", "github"].map(
            (platform) => (
              <div key={platform} className="space-y-2">
                <Label htmlFor={platform} className="capitalize">
                  {platform}
                </Label>
                <Input
                  id={platform}
                  value={form.socialLinks[platform] ?? ""}
                  onChange={(e) => updateSocialLink(platform, e.target.value)}
                  placeholder={`https://${platform}.com/username`}
                  type="url"
                />
              </div>
            ),
          )}
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Control your profile visibility and payments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label>Profile Enabled</Label>
              <p className="text-xs text-muted-foreground">
                Make your profile visible to others
              </p>
            </div>
            <Switch
              checked={form.profileEnabled}
              onCheckedChange={(v) => updateField("profileEnabled", v)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label>Accept Payments</Label>
              <p className="text-xs text-muted-foreground">
                Allow others to send you payments
              </p>
            </div>
            <Switch
              checked={form.paymentEnabled}
              onCheckedChange={(v) => updateField("paymentEnabled", v)}
            />
          </div>

          {form.paymentEnabled && (
            <div className="space-y-4 pl-4 border-l-2">
              <div className="space-y-2">
                <Label>Payment Type</Label>
                <Select
                  value={form.paymentType}
                  onValueChange={(v) =>
                    updateField("paymentType", v as "fixed" | "flexible")
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flexible">
                      Flexible (payer chooses amount)
                    </SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {form.paymentType === "fixed" && (
                <div className="space-y-2">
                  <Label htmlFor="fixedAmount">Fixed Amount ({form.currency})</Label>
                  <Input
                    id="fixedAmount"
                    type="number"
                    min={1}
                    value={form.fixedAmount ?? ""}
                    onChange={(e) =>
                      updateField(
                        "fixedAmount",
                        e.target.value ? Number(e.target.value) : null,
                      )
                    }
                  />
                </div>
              )}

              {form.country === "CA" && (
                <div className="space-y-2">
                  <Label htmlFor="interacEmail">Interac e-Transfer Email</Label>
                  <Input
                    id="interacEmail"
                    type="email"
                    value={form.interacEmail ?? ""}
                    onChange={(e) =>
                      updateField(
                        "interacEmail",
                        e.target.value || null,
                      )
                    }
                    placeholder="your-email@example.com"
                  />
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={updateProfile.isPending}>
          {updateProfile.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
