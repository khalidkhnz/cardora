"use client";

import { motion } from "framer-motion";
import { BusinessCardPreview } from "@/components/card/business-card-preview";
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

export function PublicProfileView({ user, cardSettings }: PublicProfileViewProps) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/20 bg-gradient-to-br from-purple-500 to-pink-500 text-2xl font-bold text-white shadow-xl">
                {getInitials(user.name)}
              </div>
            )}
          </div>

          <h1 className="text-2xl font-bold text-white">{user.name}</h1>
          {user.profession && (
            <p className="mt-1 text-purple-200">
              {user.profession}
              {user.company && (
                <span className="text-purple-300"> at {user.company}</span>
              )}
            </p>
          )}
        </motion.div>

        {/* Card Preview */}
        {cardSettings.cardType === "business" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
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
            />
          </motion.div>
        )}

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
                    <item.icon className="h-5 w-5 text-purple-300" />
                    <div>
                      <p className="text-xs text-purple-300">{item.label}</p>
                      <p className="text-sm text-white">{item.value}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                    <item.icon className="h-5 w-5 text-purple-300" />
                    <div>
                      <p className="text-xs text-purple-300">{item.label}</p>
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
                  <Icon className="h-5 w-5 text-purple-300" />
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

          {user.paymentEnabled && (
            <Button
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
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
          className="mt-8 text-center text-xs text-purple-300/50"
        >
          Powered by Cardora
        </motion.p>
      </div>
    </div>
  );
}
