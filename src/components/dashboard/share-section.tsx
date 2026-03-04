"use client";

import { QRCodeCard } from "@/components/shared/qr-code-card";
import { env } from "@/env";

interface ShareSectionProps {
  username: string;
}

export function ShareSection({ username }: ShareSectionProps) {
  const baseUrl = env.NEXT_PUBLIC_FE_BASE_URL ?? env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const profileUrl = `${baseUrl}/u/${username}`;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <QRCodeCard url={profileUrl} title="Profile QR Code" size={180} />
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Share Your Card</h3>
        <p className="text-sm text-muted-foreground">
          Share your digital card with anyone using the QR code, or send them
          your unique link. They can view your card, contact info, and social
          profiles.
        </p>
        <div className="rounded-lg bg-muted p-3">
          <p className="text-xs font-medium text-muted-foreground">
            Your Profile Link
          </p>
          <p className="mt-1 break-all text-sm font-mono">{profileUrl}</p>
        </div>
        <div className="rounded-lg bg-muted p-3">
          <p className="text-xs font-medium text-muted-foreground">
            NFC Sharing
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Program your NFC tag with the profile link above. Taps are tracked
            automatically in your analytics.
          </p>
        </div>
      </div>
    </div>
  );
}
