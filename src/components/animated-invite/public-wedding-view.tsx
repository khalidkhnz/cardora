"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RsvpModal } from "@/components/rsvp/rsvp-modal";
import { Share2, MapPin, Calendar, Heart, Volume2, VolumeX } from "lucide-react";
import { toast } from "sonner";
import { useRef, useEffect } from "react";

interface InviteData {
  slug: string;
  templateId: string;
  groomName: string;
  brideName: string;
  weddingDate: string | null;
  venue: string | null;
  venueAddress: string | null;
  story: string | null;
  heroImage: string | null;
  musicUrl: string | null;
  isPaid: boolean;
}

interface PublicWeddingViewProps {
  invite: InviteData;
  isDemo: boolean;
}

function formatWeddingDate(dateStr: string | null) {
  if (!dateStr) return "Date TBD";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function PublicWeddingView({ invite, isDemo }: PublicWeddingViewProps) {
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (invite.musicUrl && audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, [invite.musicUrl]);

  function toggleMusic() {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      void audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  async function handleShare() {
    const url = `${window.location.origin}/wedding/${invite.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${invite.groomName} & ${invite.brideName} — Wedding`,
          url,
        });
        return;
      } catch {
        // Fall through to clipboard
      }
    }
    await navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Music control */}
      {invite.musicUrl && (
        <>
          <audio ref={audioRef} src={invite.musicUrl} loop />
          <button
            onClick={toggleMusic}
            className="fixed top-4 right-4 z-50 rounded-full bg-white/80 p-3 shadow-lg backdrop-blur-sm transition-colors hover:bg-white dark:bg-gray-800/80"
          >
            {isPlaying ? (
              <Volume2 className="h-5 w-5" />
            ) : (
              <VolumeX className="h-5 w-5" />
            )}
          </button>
        </>
      )}

      {/* Demo Banner */}
      {isDemo && (
        <div className="bg-yellow-500 py-2 text-center text-sm font-medium text-yellow-900">
          This is a demo preview. Complete payment to use your own details.
        </div>
      )}

      <div className="mx-auto max-w-2xl px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          {invite.heroImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mx-auto mb-8 h-64 w-64 overflow-hidden rounded-full border-4 border-rose-200 shadow-xl"
            >
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${invite.heroImage})` }}
              />
            </motion.div>
          )}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-2 text-sm tracking-widest text-rose-400 uppercase"
          >
            Together with their families
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h1 className="font-serif text-5xl font-light text-gray-800 dark:text-gray-100 sm:text-6xl">
              {invite.groomName}
            </h1>
            <div className="my-3 flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-rose-300" />
              <Heart className="h-5 w-5 text-rose-400" />
              <div className="h-px w-16 bg-rose-300" />
            </div>
            <h1 className="font-serif text-5xl font-light text-gray-800 dark:text-gray-100 sm:text-6xl">
              {invite.brideName}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 text-lg text-rose-500"
          >
            Request the pleasure of your company
          </motion.p>
        </motion.div>

        {/* Date & Venue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-12 space-y-6"
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <Calendar className="h-6 w-6 text-rose-400" />
            <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {formatWeddingDate(invite.weddingDate)}
            </p>
          </div>

          {invite.venue && (
            <div className="flex flex-col items-center gap-2 text-center">
              <MapPin className="h-6 w-6 text-rose-400" />
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {invite.venue}
              </p>
              {invite.venueAddress && (
                <p className="text-muted-foreground text-sm">
                  {invite.venueAddress}
                </p>
              )}
            </div>
          )}
        </motion.div>

        {/* Story */}
        {invite.story && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-12 rounded-2xl border border-rose-100 bg-white/60 p-8 text-center backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/60"
          >
            <h2 className="mb-4 font-serif text-2xl text-gray-800 dark:text-gray-200">
              Our Story
            </h2>
            <p className="text-muted-foreground leading-relaxed">{invite.story}</p>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col items-center gap-4"
        >
          <Button
            size="lg"
            className="w-full max-w-xs bg-rose-500 text-white hover:bg-rose-600"
            onClick={() => setRsvpOpen(true)}
          >
            RSVP Now
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full max-w-xs"
            onClick={() => void handleShare()}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share Invite
          </Button>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-12 text-center text-xs text-gray-400"
        >
          Made with love on Cardora
        </motion.p>
      </div>

      {/* RSVP Modal */}
      <RsvpModal
        open={rsvpOpen}
        onOpenChange={setRsvpOpen}
        inviteSlug={invite.slug}
      />
    </div>
  );
}
