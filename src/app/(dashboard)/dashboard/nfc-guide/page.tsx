"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUserProfile } from "@/hooks/use-user";
import { env } from "@/env";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Nfc,
  Smartphone,
  Download,
  Tag,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { platform } from "@/lib/platform";

const NFC_APPS = [
  {
    name: "NFC Tools",
    platform: "iOS & Android",
    description: "Most popular NFC programming app. Free with optional pro upgrade.",
  },
  {
    name: "NXP TagWriter",
    platform: "Android",
    description: "Official NXP app for writing NTAG chips. Free.",
  },
  {
    name: "TagInfo by NXP",
    platform: "iOS & Android",
    description: "Read and diagnose NFC tags. Useful for verifying your tag.",
  },
];

const RECOMMENDED_TAGS = [
  {
    type: "NTAG215",
    storage: "504 bytes",
    best: "Business cards, short URLs",
  },
  {
    type: "NTAG216",
    storage: "888 bytes",
    best: "Longer URLs, vCard data",
  },
  {
    type: "NTAG424 DNA",
    storage: "256 bytes",
    best: "Tamper-proof, secure applications",
  },
];

const STEPS = [
  {
    title: "Get an NFC tag",
    description:
      `Purchase NFC stickers or cards online. NTAG215 or NTAG216 are recommended for ${platform.name} profiles.`,
  },
  {
    title: "Install an NFC writing app",
    description:
      'Download "NFC Tools" (iOS/Android) or "NXP TagWriter" (Android) from your app store.',
  },
  {
    title: "Copy your profile URL",
    description:
      `Your public ${platform.name} profile URL will be shown below. Copy it to your clipboard.`,
  },
  {
    title: "Write the URL to your tag",
    description:
      'Open the NFC app, select "Write" > "Add a record" > "URL/URI", paste your profile URL, and tap your NFC tag.',
  },
  {
    title: "Test the tag",
    description:
      `Tap the NFC tag with any smartphone. It should open your ${platform.name} profile in the browser.`,
  },
];

export default function NfcGuidePage() {
  const { data: profile, isLoading } = useUserProfile();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="mb-2 h-9 w-48" />
          <Skeleton className="h-5 w-72" />
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  const profileUrl = profile?.username
    ? `${typeof window !== "undefined" ? window.location.origin : (env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000")}/u/${profile.username}`
    : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">NFC Tag Guide</h1>
        <p className="text-muted-foreground">
          Learn how to program NFC tags with your {platform.name} profile
        </p>
      </div>

      {/* Your Profile URL */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Nfc className="h-5 w-5" />
            Your Profile URL
          </CardTitle>
          <CardDescription>
            This is the URL you will write to your NFC tag
          </CardDescription>
        </CardHeader>
        <CardContent>
          {profileUrl ? (
            <div className="flex items-center gap-3">
              <code className="bg-muted flex-1 rounded-lg px-4 py-3 text-sm">
                {profileUrl}
              </code>
              <button
                onClick={() => {
                  void navigator.clipboard.writeText(profileUrl);
                }}
                className="bg-primary text-primary-foreground rounded-lg px-4 py-3 text-sm font-medium whitespace-nowrap"
              >
                Copy
              </button>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              Set up your username in the Profile page first to get your public URL.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Step by step */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            How to Program Your NFC Tag
          </CardTitle>
          <CardDescription>
            Follow these steps to set up tap-to-share for your business card
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="space-y-6">
            {STEPS.map((step, i) => (
              <li key={i} className="flex gap-4">
                <div className="bg-primary text-primary-foreground flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold">{step.title}</p>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Recommended Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Recommended NFC Tags
          </CardTitle>
          <CardDescription>
            These chip types work best for sharing profile URLs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            {RECOMMENDED_TAGS.map((tag) => (
              <div
                key={tag.type}
                className="bg-muted/50 rounded-lg border p-4"
              >
                <p className="font-semibold">{tag.type}</p>
                <p className="text-muted-foreground text-xs">
                  Storage: {tag.storage}
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  Best for: {tag.best}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compatible Apps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            NFC Writing Apps
          </CardTitle>
          <CardDescription>
            Use any of these apps to write your profile URL to an NFC tag
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {NFC_APPS.map((app) => (
              <div
                key={app.name}
                className="flex items-start gap-3 rounded-lg border p-4"
              >
                <ExternalLink className="text-muted-foreground mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <p className="font-semibold">
                    {app.name}{" "}
                    <span className="text-muted-foreground text-xs font-normal">
                      ({app.platform})
                    </span>
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {app.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2">
              <span className="text-primary">&#8226;</span>
              Place NFC stickers on the back of your phone case, physical business card, or desk stand.
            </li>
            <li className="flex gap-2">
              <span className="text-primary">&#8226;</span>
              Most modern smartphones (iPhone XR+, most Android phones) can read NFC tags without an app.
            </li>
            <li className="flex gap-2">
              <span className="text-primary">&#8226;</span>
              Lock your NFC tag after writing to prevent accidental overwriting.
            </li>
            <li className="flex gap-2">
              <span className="text-primary">&#8226;</span>
              NFC tags work through thin cases (up to ~5mm) but not through metal.
            </li>
            <li className="flex gap-2">
              <span className="text-primary">&#8226;</span>
              Each tap on your NFC tag is tracked in your {platform.name} Analytics dashboard as an &quot;nfc_tap&quot; event.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
