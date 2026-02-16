"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateProfile, useUserProfile } from "@/hooks/use-user";
import { useUpdateCardSettings, useCardSettings } from "@/hooks/use-card";
import { toast } from "sonner";
import type { CardType } from "./card-type-selector";

interface CardConfigFormProps {
  cardType: CardType;
}

export function CardConfigForm({ cardType }: CardConfigFormProps) {
  const { data: profile } = useUserProfile();
  const { data: cardSettingsData } = useCardSettings();
  const updateProfile = useUpdateProfile();
  const updateCardSettings = useUpdateCardSettings();

  const [profileEnabled, setProfileEnabled] = useState(true);
  const [paymentEnabled, setPaymentEnabled] = useState(false);
  const [paymentType, setPaymentType] = useState<"fixed" | "flexible">("flexible");
  const [fixedAmount, setFixedAmount] = useState("");
  const [interacEmail, setInteracEmail] = useState("");

  // Wedding fields
  const [groomName, setGroomName] = useState("");
  const [brideName, setBrideName] = useState("");
  const [weddingDate, setWeddingDate] = useState("");
  const [venue, setVenue] = useState("");
  const [brideParentNames, setBrideParentNames] = useState("");
  const [groomParentNames, setGroomParentNames] = useState("");
  const [deceasedElders, setDeceasedElders] = useState("");

  useEffect(() => {
    if (profile) {
      setProfileEnabled(profile.profileEnabled);
      setPaymentEnabled(profile.paymentEnabled);
      setPaymentType(profile.paymentType ?? "flexible");
      setFixedAmount(profile.fixedAmount?.toString() ?? "");
      setInteracEmail(profile.interacEmail ?? "");
    }
  }, [profile]);

  useEffect(() => {
    if (cardSettingsData) {
      setGroomName(cardSettingsData.groomName ?? "");
      setBrideName(cardSettingsData.brideName ?? "");
      setWeddingDate(cardSettingsData.weddingDate ?? "");
      setVenue(cardSettingsData.venue ?? "");
      setBrideParentNames(cardSettingsData.brideParentNames ?? "");
      setGroomParentNames(cardSettingsData.groomParentNames ?? "");
      setDeceasedElders(cardSettingsData.deceasedElders ?? "");
    }
  }, [cardSettingsData]);

  const isWeddingType = cardType === "wedding" || cardType === "engagement" || cardType === "anniversary";

  async function handleSave() {
    try {
      await updateProfile.mutateAsync({
        profileEnabled,
        paymentEnabled,
        paymentType,
        fixedAmount: fixedAmount ? parseInt(fixedAmount, 10) : null,
        interacEmail: interacEmail || null,
      });

      if (isWeddingType) {
        await updateCardSettings.mutateAsync({
          groomName: groomName || null,
          brideName: brideName || null,
          weddingDate: weddingDate || null,
          venue: venue || null,
          brideParentNames: brideParentNames || null,
          groomParentNames: groomParentNames || null,
          deceasedElders: deceasedElders || null,
        });
      }

      toast.success("Settings saved");
    } catch {
      toast.error("Failed to save settings");
    }
  }

  return (
    <div className="space-y-6">
      {/* Profile Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Profile Settings</h3>

        <div className="flex items-center justify-between">
          <div>
            <Label>Profile Enabled</Label>
            <p className="text-muted-foreground text-sm">
              Make your profile page visible to others
            </p>
          </div>
          <Switch checked={profileEnabled} onCheckedChange={setProfileEnabled} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Payment Enabled</Label>
            <p className="text-muted-foreground text-sm">
              Allow people to pay you through your profile
            </p>
          </div>
          <Switch checked={paymentEnabled} onCheckedChange={setPaymentEnabled} />
        </div>
      </div>

      {/* Payment Settings */}
      {paymentEnabled && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Payment Settings</h3>

          <div className="space-y-2">
            <Label>Payment Type</Label>
            <Select
              value={paymentType}
              onValueChange={(v) => setPaymentType(v as "fixed" | "flexible")}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flexible">Custom Amount</SelectItem>
                <SelectItem value="fixed">Fixed Amount</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {paymentType === "fixed" && (
            <div className="space-y-2">
              <Label>Fixed Amount</Label>
              <Input
                type="number"
                value={fixedAmount}
                onChange={(e) => setFixedAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Interac e-Transfer Email (Canada only)</Label>
            <Input
              type="email"
              value={interacEmail}
              onChange={(e) => setInteracEmail(e.target.value)}
              placeholder="your@email.com"
            />
          </div>
        </div>
      )}

      {/* Wedding Details */}
      {isWeddingType && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {cardType === "engagement"
              ? "Engagement Details"
              : cardType === "anniversary"
                ? "Anniversary Details"
                : "Wedding Details"}
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Groom Name</Label>
              <Input
                value={groomName}
                onChange={(e) => setGroomName(e.target.value)}
                placeholder="Groom's full name"
              />
            </div>
            <div className="space-y-2">
              <Label>Bride Name</Label>
              <Input
                value={brideName}
                onChange={(e) => setBrideName(e.target.value)}
                placeholder="Bride's full name"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>
                {cardType === "anniversary" ? "Anniversary Date" : "Wedding Date"}
              </Label>
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
                placeholder="Venue name & address"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Bride&apos;s Parents</Label>
              <Input
                value={brideParentNames}
                onChange={(e) => setBrideParentNames(e.target.value)}
                placeholder="Father & Mother names"
              />
            </div>
            <div className="space-y-2">
              <Label>Groom&apos;s Parents</Label>
              <Input
                value={groomParentNames}
                onChange={(e) => setGroomParentNames(e.target.value)}
                placeholder="Father & Mother names"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Deceased Elders</Label>
            <Textarea
              value={deceasedElders}
              onChange={(e) => setDeceasedElders(e.target.value)}
              placeholder="In loving memory of..."
              rows={2}
            />
          </div>
        </div>
      )}

      <Button
        onClick={handleSave}
        disabled={updateProfile.isPending || updateCardSettings.isPending}
        className="w-full sm:w-auto"
      >
        {updateProfile.isPending || updateCardSettings.isPending
          ? "Saving..."
          : "Save Settings"}
      </Button>
    </div>
  );
}
