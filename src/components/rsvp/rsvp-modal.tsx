"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useSubmitRSVP } from "@/hooks/use-rsvp";
import { toast } from "sonner";

interface RsvpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inviteSlug: string;
}

export function RsvpModal({ open, onOpenChange, inviteSlug }: RsvpModalProps) {
  const submitRsvp = useSubmitRSVP();

  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [attending, setAttending] = useState<"yes" | "no" | "maybe">("yes");
  const [numberOfGuests, setNumberOfGuests] = useState("1");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!guestName.trim()) {
      toast.error("Please enter your name");
      return;
    }

    try {
      await submitRsvp.mutateAsync({
        inviteSlug,
        guestName: guestName.trim(),
        guestEmail: guestEmail || undefined,
        phone: phone || undefined,
        attending,
        numberOfGuests: parseInt(numberOfGuests, 10),
        dietaryRestrictions: dietaryRestrictions || undefined,
        message: message || undefined,
      });

      toast.success("RSVP submitted successfully!");
      onOpenChange(false);

      // Reset form
      setGuestName("");
      setGuestEmail("");
      setPhone("");
      setAttending("yes");
      setNumberOfGuests("1");
      setDietaryRestrictions("");
      setMessage("");
    } catch {
      toast.error("Failed to submit RSVP");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>RSVP</DialogTitle>
        </DialogHeader>

        <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
          <div className="space-y-2">
            <Label>Your Name *</Label>
            <Input
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              placeholder="your@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label>Phone</Label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 234 567 8900"
            />
          </div>

          <div className="space-y-2">
            <Label>Will you attend?</Label>
            <Select
              value={attending}
              onValueChange={(v) => setAttending(v as "yes" | "no" | "maybe")}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes, I will attend</SelectItem>
                <SelectItem value="no">Sorry, I can&apos;t make it</SelectItem>
                <SelectItem value="maybe">Maybe</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {attending !== "no" && (
            <div className="space-y-2">
              <Label>Number of Guests</Label>
              <Select
                value={numberOfGuests}
                onValueChange={setNumberOfGuests}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                    <SelectItem key={n} value={n.toString()}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label>Dietary Restrictions</Label>
            <Input
              value={dietaryRestrictions}
              onChange={(e) => setDietaryRestrictions(e.target.value)}
              placeholder="Vegetarian, allergies, etc."
            />
          </div>

          <div className="space-y-2">
            <Label>Message</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Leave a message for the couple..."
              rows={3}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={submitRsvp.isPending}
          >
            {submitRsvp.isPending ? "Submitting..." : "Submit RSVP"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
