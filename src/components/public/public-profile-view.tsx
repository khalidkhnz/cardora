"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BusinessCardPreview } from "@/components/card/business-card-preview";
import { WeddingCardPreview } from "@/components/card/wedding-card-preview";
import { BusinessCardBack } from "@/components/card/business-card-back";
import { WeddingCardBack } from "@/components/card/wedding-card-back";
import { FlippableCard } from "@/components/card/flippable-card";
import { getBusinessCardTemplate, businessCardTemplates } from "@/lib/templates/business-card-templates";
import { getWeddingCardTemplate, weddingCardTemplates } from "@/lib/templates/wedding-card-templates";
import { Button } from "@/components/ui/button";
import {
  Linkedin,
  Twitter,
  Instagram,
  Globe,
  Github,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Share2,
  CreditCard,
  Download,
  X,
  Maximize2,
} from "lucide-react";
import { toast } from "sonner";

interface PublicProfileData {
  name: string;
  email: string;
  username: string;
  profession: string | null;
  company: string | null;
  phone: string | null;
  whatsapp: string | null;
  address: string | null;
  socialLinks: Record<string, string> | null;
  profileImage: string | null;
  cardBackgroundImage: string | null;
  paymentEnabled: boolean;
  country: string | null;
  currency: string | null;
}

interface PublicProfileViewProps {
  user: PublicProfileData;
  cardSettings: {
    cardType: string;
    selectedTemplateId: string | null;
    orientation: "horizontal" | "vertical";
    cardSize: "standard" | "large";
    groomName: string | null;
    brideName: string | null;
    weddingDate: string | null;
    venue: string | null;
    groomParentNames: string | null;
    brideParentNames: string | null;
    deceasedElders: string | null;
  };
}

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  website: Globe,
  github: Github,
};

const SOCIAL_LABELS: Record<string, string> = {
  linkedin: "LinkedIn",
  twitter: "Twitter",
  instagram: "Instagram",
  website: "Website",
  github: "GitHub",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

async function handleShare(username: string) {
  const url = `${window.location.origin}/u/${username}`;

  if (navigator.share) {
    try {
      await navigator.share({ title: "Cardora Profile", url });
      return;
    } catch {
      // User cancelled or share failed, fall through to clipboard
    }
  }

  await navigator.clipboard.writeText(url);
  toast.success("Link copied to clipboard");
}

/** Darken a hex color by a factor (0..1, lower = darker) */
function darkenHex(hex: string, factor: number): string {
  const h = hex.replace("#", "");
  const r = Math.round(parseInt(h.substring(0, 2), 16) * factor);
  const g = Math.round(parseInt(h.substring(2, 4), 16) * factor);
  const b = Math.round(parseInt(h.substring(4, 6), 16) * factor);
  return `rgb(${r}, ${g}, ${b})`;
}

// ─── Dimension helpers ──────────────────────────────────────────────────────

function getBusinessDims(orientation: "horizontal" | "vertical", size: "standard" | "large") {
  if (size === "large") return orientation === "horizontal" ? { w: 320, h: 208 } : { w: 208, h: 320 };
  return orientation === "horizontal" ? { w: 256, h: 160 } : { w: 160, h: 256 };
}

function getWeddingDims(orientation: "horizontal" | "vertical", size: "standard" | "large") {
  if (size === "large") return orientation === "horizontal" ? { w: 320, h: 208 } : { w: 240, h: 352 };
  return orientation === "horizontal" ? { w: 256, h: 160 } : { w: 192, h: 288 };
}

// ─── Viewport-responsive scaling ─────────────────────────────────────────────

function useWindowSize() {
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    function update() {
      setSize({ w: window.innerWidth, h: window.innerHeight });
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return size;
}

/**
 * Compute responsive card dimensions that fit within available space
 * while preserving aspect ratio. Returns target width/height that can
 * be passed directly to card components (single transform, no double-scaling).
 */
function computeResponsiveDims(
  baseW: number,
  baseH: number,
  availW: number,
  availH?: number,
): { w: number; h: number } {
  if (availW <= 0) return { w: baseW, h: baseH };
  const aspect = baseW / baseH;
  let w = availW;
  let h = w / aspect;
  if (availH && availH > 0 && h > availH) {
    h = availH;
    w = h * aspect;
  }
  // Don't go below the base (standard) dimensions
  if (w < baseW) {
    w = baseW;
    h = baseH;
  }
  return { w: Math.round(w), h: Math.round(h) };
}

// ─── Fullscreen overlay ─────────────────────────────────────────────────────

function FullscreenCardOverlay({
  onClose,
  bgGradient,
  accentColor,
  user,
  cardSettings,
  viewport,
}: {
  onClose: () => void;
  bgGradient: string;
  accentColor: string;
  user: PublicProfileData;
  cardSettings: PublicProfileViewProps["cardSettings"];
  viewport: { w: number; h: number };
}) {
  const isWedding =
    cardSettings.cardType === "wedding" ||
    cardSettings.cardType === "engagement" ||
    cardSettings.cardType === "anniversary";

  // Base card dims for aspect ratio
  const baseDims = isWedding
    ? getWeddingDims(cardSettings.orientation, "standard")
    : getBusinessDims(cardSettings.orientation, "standard");

  // Compute responsive dimensions that fit the viewport (single transform, no double-scaling)
  const availW = Math.max(0, viewport.w - 80);
  const availH = Math.max(0, viewport.h - 260);
  const dims = computeResponsiveDims(baseDims.w, baseDims.h, availW, availH);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      style={{ background: bgGradient }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
    >
      {/* Close button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        onClick={onClose}
        className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
        aria-label="Close fullscreen"
      >
        <X className="h-5 w-5" />
      </motion.button>

      {/* User name + profession above card */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6 text-center"
      >
        <h2 className="text-lg font-semibold text-white">{user.name}</h2>
        {user.profession && (
          <p className="text-sm text-white/60">
            {user.profession}
            {user.company && <span> at {user.company}</span>}
          </p>
        )}
      </motion.div>

      {/* Card — responsive to viewport */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 24, delay: 0.1 }}
      >
        {!isWedding ? (
          <FlippableCard
            width={dims.w}
            height={dims.h}
            front={
              <BusinessCardPreview
                user={{
                  name: user.name,
                  email: user.email,
                  phone: user.phone,
                  company: user.company,
                  profession: user.profession,
                  address: user.address,
                  profileImage: user.profileImage,
                }}
                templateId={cardSettings.selectedTemplateId}
                orientation={cardSettings.orientation}
                targetWidth={dims.w}
                targetHeight={dims.h}
                bare
              />
            }
            back={
              <BusinessCardBack
                user={{
                  name: user.name,
                  email: user.email,
                  phone: user.phone,
                  company: user.company,
                  profession: user.profession,
                  address: user.address,
                  profileImage: user.profileImage,
                }}
                username={user.username}
                templateId={cardSettings.selectedTemplateId}
                orientation={cardSettings.orientation}
                targetWidth={dims.w}
                targetHeight={dims.h}
              />
            }
          />
        ) : (
          <FlippableCard
            width={dims.w}
            height={dims.h}
            front={
              <WeddingCardPreview
                data={{
                  groomName: cardSettings.groomName,
                  brideName: cardSettings.brideName,
                  weddingDate: cardSettings.weddingDate,
                  venue: cardSettings.venue,
                  groomParentNames: cardSettings.groomParentNames,
                  brideParentNames: cardSettings.brideParentNames,
                  deceasedElders: cardSettings.deceasedElders,
                }}
                templateId={cardSettings.selectedTemplateId}
                orientation={cardSettings.orientation}
                targetWidth={dims.w}
                targetHeight={dims.h}
                bare
              />
            }
            back={
              <WeddingCardBack
                data={{
                  groomName: cardSettings.groomName,
                  brideName: cardSettings.brideName,
                  weddingDate: cardSettings.weddingDate,
                  venue: cardSettings.venue,
                  groomParentNames: cardSettings.groomParentNames,
                  brideParentNames: cardSettings.brideParentNames,
                  deceasedElders: cardSettings.deceasedElders,
                }}
                templateId={cardSettings.selectedTemplateId}
                orientation={cardSettings.orientation}
                targetWidth={dims.w}
                targetHeight={dims.h}
              />
            }
          />
        )}
      </motion.div>

      {/* Hint text below card */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 text-xs text-white/40"
      >
        Click card to flip &middot; Hover to tilt
      </motion.p>

      {/* Dismiss prompt */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        onClick={onClose}
        className="mt-4 rounded-full border border-white/15 bg-white/5 px-6 py-2 text-sm text-white/70 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white"
      >
        View full profile
      </motion.button>
    </motion.div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────

export function PublicProfileView({ user, cardSettings }: PublicProfileViewProps) {
  const [fullscreen, setFullscreen] = useState(true);
  const viewport = useWindowSize();

  const socialEntries = Object.entries(user.socialLinks ?? {}).filter(
    ([, v]) => v && v.trim() !== "",
  );

  const contactItems = [
    { icon: Phone, label: "Phone", value: user.phone, href: `tel:${user.phone}` },
    { icon: Mail, label: "Email", value: user.email, href: `mailto:${user.email}` },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: user.whatsapp,
      href: `https://wa.me/${user.whatsapp?.replace(/\D/g, "")}`,
    },
    { icon: MapPin, label: "Address", value: user.address, href: undefined },
  ].filter((item) => item.value);

  const isWedding =
    cardSettings.cardType === "wedding" ||
    cardSettings.cardType === "engagement" ||
    cardSettings.cardType === "anniversary";

  // Derive background colors from the selected template
  const { bgGradient, accentColor } = useMemo(() => {
    if (isWedding) {
      const t = getWeddingCardTemplate(cardSettings.selectedTemplateId ?? "") ?? weddingCardTemplates[0]!;
      const from = darkenHex(t.colors.primary, 0.25);
      const via = darkenHex(t.colors.secondary, 0.3);
      const to = darkenHex(t.colors.primary, 0.15);
      return {
        bgGradient: `linear-gradient(135deg, ${from}, ${via}, ${to})`,
        accentColor: t.colors.accent,
      };
    }

    const t = getBusinessCardTemplate(cardSettings.selectedTemplateId ?? "") ?? businessCardTemplates[0]!;
    const from = darkenHex(t.colors.primary, 0.3);
    const via = darkenHex(t.colors.accent, 0.2);
    const to = darkenHex(t.colors.primary, 0.15);
    return {
      bgGradient: `linear-gradient(135deg, ${from}, ${via}, ${to})`,
      accentColor: t.colors.accent,
    };
  }, [cardSettings.cardType, cardSettings.selectedTemplateId, isWedding]);

  const openFullscreen = useCallback(() => setFullscreen(true), []);
  const closeFullscreen = useCallback(() => setFullscreen(false), []);

  // Compute responsive inline card dimensions (single transform, no double-scaling)
  const inlineBaseDims = isWedding
    ? getWeddingDims(cardSettings.orientation, "standard")
    : getBusinessDims(cardSettings.orientation, "standard");
  const inlineAvailW = Math.max(0, Math.min(viewport.w - 32, 480));
  const inlineDims = computeResponsiveDims(inlineBaseDims.w, inlineBaseDims.h, inlineAvailW);

  return (
    <div className="min-h-screen" style={{ background: bgGradient }}>
      {/* Fullscreen card overlay */}
      <AnimatePresence>
        {fullscreen && (
          <FullscreenCardOverlay
            onClose={closeFullscreen}
            bgGradient={bgGradient}
            accentColor={accentColor}
            user={user}
            cardSettings={cardSettings}
            viewport={viewport}
          />
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-lg px-4 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          {/* Profile Image */}
          <div className="mb-4 flex justify-center">
            {user.profileImage ? (
              <div
                className="h-24 w-24 rounded-full border-4 border-white/20 bg-cover bg-center shadow-xl"
                style={{ backgroundImage: `url(${user.profileImage})` }}
              />
            ) : (
              <div
                className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/20 text-2xl font-bold text-white shadow-xl"
                style={{ background: `linear-gradient(135deg, ${accentColor}, ${darkenHex(accentColor, 0.6)})` }}
              >
                {getInitials(user.name)}
              </div>
            )}
          </div>

          <h1 className="text-2xl font-bold text-white">{user.name}</h1>
          {user.profession && (
            <p className="mt-1 text-white/70">
              {user.profession}
              {user.company && (
                <span className="text-white/50"> at {user.company}</span>
              )}
            </p>
          )}
        </motion.div>

        {/* Card Preview — with "View fullscreen" button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-6 flex flex-col items-center gap-3"
        >
          {/* Inline card — responsive to container width */}
          {!isWedding ? (
            <FlippableCard
              width={inlineDims.w}
              height={inlineDims.h}
              front={
                <BusinessCardPreview
                  user={{
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    company: user.company,
                    profession: user.profession,
                    address: user.address,
                    profileImage: user.profileImage,
                  }}
                  templateId={cardSettings.selectedTemplateId}
                  orientation={cardSettings.orientation}
                  targetWidth={inlineDims.w}
                  targetHeight={inlineDims.h}
                  bare
                />
              }
              back={
                <BusinessCardBack
                  user={{
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    company: user.company,
                    profession: user.profession,
                    address: user.address,
                    profileImage: user.profileImage,
                  }}
                  username={user.username}
                  templateId={cardSettings.selectedTemplateId}
                  orientation={cardSettings.orientation}
                  targetWidth={inlineDims.w}
                  targetHeight={inlineDims.h}
                />
              }
            />
          ) : (
            <FlippableCard
              width={inlineDims.w}
              height={inlineDims.h}
              front={
                <WeddingCardPreview
                  data={{
                    groomName: cardSettings.groomName,
                    brideName: cardSettings.brideName,
                    weddingDate: cardSettings.weddingDate,
                    venue: cardSettings.venue,
                    groomParentNames: cardSettings.groomParentNames,
                    brideParentNames: cardSettings.brideParentNames,
                    deceasedElders: cardSettings.deceasedElders,
                  }}
                  templateId={cardSettings.selectedTemplateId}
                  orientation={cardSettings.orientation}
                  targetWidth={inlineDims.w}
                  targetHeight={inlineDims.h}
                  bare
                />
              }
              back={
                <WeddingCardBack
                  data={{
                    groomName: cardSettings.groomName,
                    brideName: cardSettings.brideName,
                    weddingDate: cardSettings.weddingDate,
                    venue: cardSettings.venue,
                    groomParentNames: cardSettings.groomParentNames,
                    brideParentNames: cardSettings.brideParentNames,
                    deceasedElders: cardSettings.deceasedElders,
                  }}
                  templateId={cardSettings.selectedTemplateId}
                  orientation={cardSettings.orientation}
                  targetWidth={inlineDims.w}
                  targetHeight={inlineDims.h}
                />
              }
            />
          )}

          {/* Expand button */}
          <button
            onClick={openFullscreen}
            className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs text-white/60 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white"
          >
            <Maximize2 className="h-3 w-3" />
            View fullscreen
          </button>
        </motion.div>

        {/* Contact Info */}
        {contactItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 space-y-3"
          >
            {contactItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-colors hover:bg-white/10"
                  >
                    <item.icon className="h-5 w-5" style={{ color: accentColor }} />
                    <div>
                      <p className="text-xs" style={{ color: accentColor, opacity: 0.8 }}>{item.label}</p>
                      <p className="text-sm text-white">{item.value}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                    <item.icon className="h-5 w-5" style={{ color: accentColor }} />
                    <div>
                      <p className="text-xs" style={{ color: accentColor, opacity: 0.8 }}>{item.label}</p>
                      <p className="text-sm text-white">{item.value}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Social Links */}
        {socialEntries.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 grid grid-cols-2 gap-3"
          >
            {socialEntries.map(([key, url], i) => {
              const Icon = SOCIAL_ICONS[key] ?? Globe;
              const label = SOCIAL_LABELS[key] ?? key;
              return (
                <motion.a
                  key={key}
                  href={url.startsWith("http") ? url : `https://${url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-colors hover:bg-white/10"
                >
                  <Icon className="h-5 w-5" style={{ color: accentColor }} />
                  <span className="text-sm font-medium text-white">{label}</span>
                </motion.a>
              );
            })}
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-3"
        >
          <Button
            variant="outline"
            className="flex-1 border-white/20 bg-white/5 text-white hover:bg-white/10"
            onClick={() => void handleShare(user.username)}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>

          <Button
            variant="outline"
            className="border-white/20 bg-white/5 text-white hover:bg-white/10"
            onClick={() => {
              void fetch("/api/download/card", { method: "POST" })
                .then((r) => {
                  if (r.ok) toast.success("Card saved to gallery");
                  else toast.error("Unlock your card to download");
                });
            }}
          >
            <Download className="h-4 w-4" />
          </Button>

          {user.paymentEnabled && (
            <Button
              className="flex-1 text-white"
              style={{ background: `linear-gradient(135deg, ${accentColor}, ${darkenHex(accentColor, 0.6)})` }}
              asChild
            >
              <a href={`/pay/${user.username}`}>
                <CreditCard className="mr-2 h-4 w-4" />
                Pay Now
              </a>
            </Button>
          )}
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-xs text-white/30"
        >
          Powered by Cardora
        </motion.p>
      </div>
    </div>
  );
}
