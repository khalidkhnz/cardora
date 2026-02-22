"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RsvpModal } from "@/components/rsvp/rsvp-modal";
import { Share2, MapPin, Calendar, Heart, Download } from "lucide-react";
import { toast } from "sonner";
import { MusicToggleButton } from "../../shared/music-toggle-button";
import { CardoraWatermark } from "../../shared/cardora-watermark";
import { ParticleLayer } from "../../shared/particle-layer";
import { useMusicPlayer } from "@/hooks/use-music-player";
import { useCountdown } from "@/hooks/use-countdown";
import { useLenis } from "@/hooks/use-lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap-setup";
import type { TemplateProps } from "../../types";

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

/* -------------------------------------------------------------------------- */
/*  Hairline Divider                                                          */
/* -------------------------------------------------------------------------- */

function HairlineDivider({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`mx-auto h-px w-24 origin-center bg-zinc-300 dark:bg-zinc-700 ${className ?? ""}`}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  Minimal Modern Template                                                   */
/* -------------------------------------------------------------------------- */

export default function MinimalModernTemplate({
  invite,
  isDemo,
}: TemplateProps) {
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const { isPlaying, toggle } = useMusicPlayer(invite.musicUrl);
  const countdown = useCountdown(invite.weddingDate);
  const containerRef = useRef<HTMLDivElement>(null);

  useLenis();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".scroll-fade").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

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
        /* fall through */
      }
    }
    await navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  }

  return (
    <div ref={containerRef} className="relative min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <ParticleLayer type="LIGHT" />

      {/* ---- Music Toggle ---- */}
      {invite.musicUrl && (
        <MusicToggleButton
          isPlaying={isPlaying}
          onToggle={toggle}
          className="fixed right-4 top-4 z-50 rounded-full border border-zinc-200 bg-white/90 p-3 shadow-sm backdrop-blur-sm transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/90 dark:hover:bg-zinc-800"
        />
      )}

      {/* ---- Demo Banner ---- */}
      {isDemo && (
        <div className="bg-zinc-900 py-2 text-center text-sm font-medium tracking-wide text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900">
          This is a demo preview. Complete payment to use your own details.
        </div>
      )}

      {/* ================================================================== */}
      {/*  HERO SECTION                                                      */}
      {/* ================================================================== */}
      <section className="scroll-fade flex min-h-screen flex-col items-center justify-center px-6 py-24">
        {/* Couple photo */}
        {invite.heroImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="mb-16 h-56 w-56 overflow-hidden rounded-full border border-zinc-200 shadow-sm dark:border-zinc-800 sm:h-64 sm:w-64"
          >
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${invite.heroImage})` }}
            />
          </motion.div>
        )}

        {/* "Together with their families" */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 text-xs font-light uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500"
        >
          Together with their families
        </motion.p>

        {/* Names */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center text-5xl font-light tracking-tight sm:text-7xl"
        >
          {invite.groomName}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="my-5 flex items-center gap-6"
        >
          <div className="h-px w-12 bg-zinc-300 dark:bg-zinc-700" />
          <span className="text-xs font-light uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500">
            &
          </span>
          <div className="h-px w-12 bg-zinc-300 dark:bg-zinc-700" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center text-5xl font-light tracking-tight sm:text-7xl"
        >
          {invite.brideName}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 text-sm font-light tracking-wide text-zinc-500 dark:text-zinc-400"
        >
          Request the pleasure of your company
        </motion.p>

        {/* Subtle scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-8 w-px bg-zinc-300 dark:bg-zinc-700"
          />
        </motion.div>
      </section>

      <HairlineDivider className="my-0" />

      {/* ================================================================== */}
      {/*  FAMILIES SECTION                                                  */}
      {/* ================================================================== */}
      {(invite.groomFatherName ??
        invite.groomMotherName ??
        invite.brideFatherName ??
        invite.brideMotherName) && (
        <section className="scroll-fade px-6 py-24">
          <div className="mx-auto max-w-xl">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12 text-center text-xs font-light uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500"
            >
              The Families
            </motion.p>

            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
              {/* Groom's family */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <p className="mb-2 text-sm font-light tracking-wide text-zinc-500 dark:text-zinc-400">
                  Groom&apos;s Parents
                </p>
                {invite.groomFatherName && (
                  <p className="text-lg font-light tracking-tight">
                    {invite.groomFatherName}
                  </p>
                )}
                {invite.groomMotherName && (
                  <p className="text-lg font-light tracking-tight">
                    {invite.groomMotherName}
                  </p>
                )}
              </motion.div>

              {/* Bride's family */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-center"
              >
                <p className="mb-2 text-sm font-light tracking-wide text-zinc-500 dark:text-zinc-400">
                  Bride&apos;s Parents
                </p>
                {invite.brideFatherName && (
                  <p className="text-lg font-light tracking-tight">
                    {invite.brideFatherName}
                  </p>
                )}
                {invite.brideMotherName && (
                  <p className="text-lg font-light tracking-tight">
                    {invite.brideMotherName}
                  </p>
                )}
              </motion.div>
            </div>
          </div>

          <HairlineDivider className="mt-24" />
        </section>
      )}

      {/* ================================================================== */}
      {/*  STORY SECTION                                                     */}
      {/* ================================================================== */}
      {invite.story && (
        <section className="scroll-fade px-6 py-24">
          <div className="mx-auto max-w-lg text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-8 text-xs font-light uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500"
            >
              Our Story
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-base font-light leading-relaxed text-zinc-600 dark:text-zinc-400"
            >
              {invite.story}
            </motion.p>

            {invite.coupleMessage && (
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-8 text-sm italic font-light text-zinc-500 dark:text-zinc-500"
              >
                &ldquo;{invite.coupleMessage}&rdquo;
              </motion.p>
            )}
          </div>

          <HairlineDivider className="mt-24" />
        </section>
      )}

      {/* ================================================================== */}
      {/*  DATE & VENUE SECTION                                              */}
      {/* ================================================================== */}
      <section className="scroll-fade px-6 py-24">
        <div className="mx-auto max-w-xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center text-xs font-light uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500"
          >
            When & Where
          </motion.p>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
            {/* Date */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <Calendar className="mx-auto mb-4 h-5 w-5 text-zinc-400 dark:text-zinc-500" />
              <p className="text-lg font-light tracking-tight">
                {formatWeddingDate(invite.weddingDate)}
              </p>
              {invite.weddingTime && (
                <p className="mt-1 text-sm font-light text-zinc-500 dark:text-zinc-400">
                  {invite.weddingTime}
                </p>
              )}
            </motion.div>

            {/* Venue */}
            {invite.venue && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-center"
              >
                <MapPin className="mx-auto mb-4 h-5 w-5 text-zinc-400 dark:text-zinc-500" />
                <p className="text-lg font-light tracking-tight">
                  {invite.venue}
                </p>
                {invite.venueAddress && (
                  <p className="mt-1 text-sm font-light text-zinc-500 dark:text-zinc-400">
                    {invite.venueAddress}
                  </p>
                )}
              </motion.div>
            )}
          </div>

          {/* Reception */}
          {invite.receptionDate && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-12 text-center"
            >
              <p className="mb-2 text-xs font-light uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
                Reception
              </p>
              <p className="text-base font-light text-zinc-600 dark:text-zinc-400">
                {formatWeddingDate(invite.receptionDate)}
              </p>
            </motion.div>
          )}

          {/* Countdown */}
          {invite.weddingDate && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-20"
            >
              <p className="mb-8 text-center text-xs font-light uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">
                Counting Down
              </p>
              <div className="grid grid-cols-4 gap-4 text-center">
                {(
                  [
                    { label: "Days", value: countdown.days },
                    { label: "Hours", value: countdown.hours },
                    { label: "Minutes", value: countdown.minutes },
                    { label: "Seconds", value: countdown.seconds },
                  ] as const
                ).map((item) => (
                  <div key={item.label}>
                    <p className="text-3xl font-light tracking-tight sm:text-4xl">
                      {String(item.value).padStart(2, "0")}
                    </p>
                    <p className="mt-1 text-[10px] font-light uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        <HairlineDivider className="mt-24" />
      </section>

      {/* ================================================================== */}
      {/*  EVENTS SECTION                                                    */}
      {/* ================================================================== */}
      {invite.events && invite.events.length > 0 && (
        <section className="scroll-fade px-6 py-24">
          <div className="mx-auto max-w-xl">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16 text-center text-xs font-light uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500"
            >
              Schedule of Events
            </motion.p>

            <div className="space-y-10">
              {invite.events.map((event, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="border-l border-zinc-200 pl-6 dark:border-zinc-800"
                >
                  <p className="text-lg font-light tracking-tight">
                    {event.name}
                  </p>
                  <p className="mt-1 text-sm font-light text-zinc-500 dark:text-zinc-400">
                    {event.date} {event.time && `at ${event.time}`}
                  </p>
                  {event.venue && (
                    <p className="mt-0.5 text-sm font-light text-zinc-400 dark:text-zinc-500">
                      {event.venue}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <HairlineDivider className="mt-24" />
        </section>
      )}

      {/* ================================================================== */}
      {/*  GALLERY SECTION                                                   */}
      {/* ================================================================== */}
      {invite.galleryImages.length > 0 && (
        <section className="scroll-fade px-6 py-24">
          <div className="mx-auto max-w-2xl">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16 text-center text-xs font-light uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500"
            >
              Gallery
            </motion.p>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {invite.galleryImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  className="aspect-square overflow-hidden"
                >
                  <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
                    style={{ backgroundImage: `url(${img})` }}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <HairlineDivider className="mt-24" />
        </section>
      )}

      {/* ================================================================== */}
      {/*  RSVP SECTION                                                      */}
      {/* ================================================================== */}
      <section className="scroll-fade px-6 py-24">
        <div className="mx-auto max-w-sm text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-4 text-xs font-light uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500"
          >
            Will you join us?
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-10 text-sm font-light text-zinc-500 dark:text-zinc-400"
          >
            We would be honored by your presence on our special day.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center gap-3"
          >
            <Button
              size="lg"
              onClick={() => setRsvpOpen(true)}
              className="w-full rounded-none border border-zinc-900 bg-zinc-900 px-10 py-6 text-xs font-light uppercase tracking-[0.2em] text-white transition-colors hover:bg-zinc-800 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Respond
            </Button>

            <div className="flex w-full gap-2">
              <Button
                variant="outline"
                size="lg"
                onClick={() => void handleShare()}
                className="flex-1 rounded-none border-zinc-300 py-6 text-xs font-light uppercase tracking-[0.15em] text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-900"
              >
                <Share2 className="mr-2 h-3.5 w-3.5" />
                Share
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  void fetch("/api/download/invite", { method: "POST" }).then(
                    (r) => {
                      if (r.ok) toast.success("Invite saved to gallery");
                      else toast.error("Unlock your invite to download");
                    },
                  );
                }}
                className="rounded-none border-zinc-300 px-4 py-6 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-900"
              >
                <Download className="h-3.5 w-3.5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  FOOTER                                                            */}
      {/* ================================================================== */}
      <footer className="px-6 pb-12 pt-8">
        <div className="mx-auto max-w-sm text-center">
          <HairlineDivider className="mb-10" />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Heart className="mx-auto mb-4 h-4 w-4 text-zinc-300 dark:text-zinc-700" />
            <p className="text-sm font-light tracking-tight text-zinc-400 dark:text-zinc-600">
              {invite.groomName} & {invite.brideName}
            </p>
            {invite.weddingDate && (
              <p className="mt-1 text-xs font-light text-zinc-300 dark:text-zinc-700">
                {formatWeddingDate(invite.weddingDate)}
              </p>
            )}
          </motion.div>

          <CardoraWatermark className="mt-10 pb-4 text-center text-[10px] font-light tracking-wide text-zinc-300 dark:text-zinc-700" />
        </div>
      </footer>

      {/* ---- RSVP Modal ---- */}
      <RsvpModal
        open={rsvpOpen}
        onOpenChange={setRsvpOpen}
        inviteSlug={invite.slug}
      />
    </div>
  );
}
