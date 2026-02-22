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
import { StaggeredTextReveal } from "../../shared/staggered-text-reveal";
import { TextParallaxMarquee } from "../../shared/text-parallax-marquee";
import { ParallaxImage } from "../../shared/parallax-image";
import { MagneticButton } from "../../shared/magnetic-button";
import { CurvedDivider } from "../../shared/curved-divider";
import { useMusicPlayer } from "@/hooks/use-music-player";
import { useCountdown } from "@/hooks/use-countdown";
import { useLenis } from "@/hooks/use-lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap-setup";
import type { TemplateProps } from "../../types";

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

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
/*  Decorative SVG Components                                                  */
/* -------------------------------------------------------------------------- */

function FloralDivider({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "mx-auto my-8 h-12 w-64 text-rose-300"}
    >
      {/* Left stem */}
      <path
        d="M50 30 Q100 10 150 30 Q130 25 120 15 Q125 25 110 30"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Right stem */}
      <path
        d="M350 30 Q300 10 250 30 Q270 25 280 15 Q275 25 290 30"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Center flower */}
      <circle cx="200" cy="30" r="6" fill="currentColor" opacity="0.5" />
      <ellipse cx="200" cy="20" rx="4" ry="8" fill="currentColor" opacity="0.3" />
      <ellipse cx="200" cy="40" rx="4" ry="8" fill="currentColor" opacity="0.3" />
      <ellipse cx="190" cy="30" rx="8" ry="4" fill="currentColor" opacity="0.3" />
      <ellipse cx="210" cy="30" rx="8" ry="4" fill="currentColor" opacity="0.3" />
      {/* Left petals */}
      <ellipse cx="130" cy="28" rx="6" ry="3" fill="currentColor" opacity="0.25" transform="rotate(-20 130 28)" />
      <ellipse cx="100" cy="22" rx="5" ry="3" fill="currentColor" opacity="0.2" transform="rotate(10 100 22)" />
      {/* Right petals */}
      <ellipse cx="270" cy="28" rx="6" ry="3" fill="currentColor" opacity="0.25" transform="rotate(20 270 28)" />
      <ellipse cx="300" cy="22" rx="5" ry="3" fill="currentColor" opacity="0.2" transform="rotate(-10 300 22)" />
      {/* Leaves */}
      <path d="M80 26 Q70 20 65 28 Q72 24 80 26" fill="currentColor" opacity="0.3" />
      <path d="M320 26 Q330 20 335 28 Q328 24 320 26" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PetalCorner({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const transforms: Record<string, string> = {
    "top-left": "",
    "top-right": "scale(-1, 1)",
    "bottom-left": "scale(1, -1)",
    "bottom-right": "scale(-1, -1)",
  };

  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-24 w-24 text-rose-200"
      style={{ transform: transforms[position] }}
    >
      <path d="M10 5 Q30 0 40 15 Q30 10 15 15 Z" fill="currentColor" opacity="0.4" />
      <path d="M5 10 Q0 30 15 40 Q10 30 15 15 Z" fill="currentColor" opacity="0.4" />
      <path d="M25 8 Q45 5 55 25 Q40 15 30 20 Z" fill="currentColor" opacity="0.3" />
      <path d="M8 25 Q5 45 25 55 Q15 40 20 30 Z" fill="currentColor" opacity="0.3" />
      <circle cx="15" cy="15" r="3" fill="currentColor" opacity="0.5" />
      <path d="M40 2 Q60 0 65 20 Q55 10 45 12 Z" fill="currentColor" opacity="0.2" />
      <path d="M2 40 Q0 60 20 65 Q10 55 12 45 Z" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Floating Petal Animation                                                   */
/* -------------------------------------------------------------------------- */

function FloatingPetals() {
  const petals = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${8 + (i * 7.5) % 85}%`,
    delay: i * 0.8,
    duration: 6 + (i % 4) * 2,
    size: 8 + (i % 3) * 4,
    rotate: (i * 30) % 360,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute rounded-full bg-gradient-to-br from-rose-200 to-pink-300"
          style={{
            left: petal.left,
            top: -20,
            width: petal.size,
            height: petal.size * 1.4,
            borderRadius: "50% 50% 50% 0%",
            opacity: 0.4,
          }}
          animate={{
            y: [0, typeof window !== "undefined" ? window.innerHeight + 40 : 1200],
            x: [0, Math.sin(petal.id) * 60, Math.cos(petal.id) * 40, 0],
            rotate: [petal.rotate, petal.rotate + 360],
            opacity: [0, 0.5, 0.5, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section Animation Variants                                                 */
/* -------------------------------------------------------------------------- */

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: { staggerChildren: 0.15 },
  },
};

/* -------------------------------------------------------------------------- */
/*  Main Template Component                                                    */
/* -------------------------------------------------------------------------- */

export default function FloralEleganceTemplate({ invite, isDemo }: TemplateProps) {
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

      gsap.utils.toArray<HTMLElement>(".parallax-hero").forEach((el) => {
        gsap.to(el, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
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
        /* fall through to clipboard */
      }
    }
    await navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  }

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-gradient-to-b from-pink-50 via-rose-50 to-pink-50">
      {/* Floating petals background layer */}
      <FloatingPetals />
      <ParticleLayer type="PETAL" />

      {/* Music toggle */}
      {invite.musicUrl && (
        <MusicToggleButton
          isPlaying={isPlaying}
          onToggle={toggle}
          className="fixed top-4 right-4 z-50 rounded-full bg-rose-100/80 p-3 shadow-lg backdrop-blur-sm transition-colors hover:bg-rose-200/80"
        />
      )}

      {/* Demo banner */}
      {isDemo && (
        <div className="relative z-10 bg-yellow-500 py-2 text-center text-sm font-medium text-yellow-900">
          This is a demo preview. Complete payment to use your own details.
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-2xl px-4 py-12 sm:py-16">
        {/* ------------------------------------------------------------------ */}
        {/*  HERO SECTION                                                       */}
        {/* ------------------------------------------------------------------ */}
        <motion.section
          className="mb-16 text-center"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          {/* Corner petals */}
          <div className="pointer-events-none absolute top-0 left-0">
            <PetalCorner position="top-left" />
          </div>
          <div className="pointer-events-none absolute top-0 right-0">
            <PetalCorner position="top-right" />
          </div>

          {/* Couple photo */}
          {invite.heroImage && (
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.8 }}
              className="parallax-hero mx-auto mb-8 h-64 w-64 overflow-hidden rounded-full border-4 border-rose-200 shadow-2xl shadow-rose-200/40 sm:h-72 sm:w-72"
            >
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${invite.heroImage})` }}
              />
            </motion.div>
          )}

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="mb-3 text-sm tracking-[0.3em] font-light text-rose-400 uppercase"
          >
            Together with their families
          </motion.p>

          {/* Couple Names */}
          <motion.div variants={fadeInUp} transition={{ duration: 0.8 }}>
            <StaggeredTextReveal
              text={invite.groomName}
              splitBy="word"
              as="h1"
              trigger="inView"
              className="font-serif text-5xl font-light leading-tight text-rose-800 sm:text-6xl lg:text-7xl"
            />

            {/* Floral heart divider */}
            <div className="my-4 flex items-center justify-center gap-4">
              <motion.div
                className="h-px w-16 bg-gradient-to-r from-transparent to-rose-300 sm:w-24"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
              >
                <Heart className="h-6 w-6 fill-rose-300 text-rose-400" />
              </motion.div>
              <motion.div
                className="h-px w-16 bg-gradient-to-l from-transparent to-rose-300 sm:w-24"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
            </div>

            <StaggeredTextReveal
              text={invite.brideName}
              splitBy="word"
              as="h1"
              trigger="inView"
              className="font-serif text-5xl font-light leading-tight text-rose-800 sm:text-6xl lg:text-7xl"
            />
          </motion.div>

          {/* Invitation text */}
          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 font-serif text-lg text-rose-500 italic"
          >
            Request the pleasure of your company at their wedding celebration
          </motion.p>

          {/* Family names */}
          {(invite.groomFatherName ?? invite.brideFatherName) && (
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 space-y-1 text-sm text-rose-400"
            >
              {invite.groomFatherName && invite.groomMotherName && (
                <p>
                  Son of {invite.groomFatherName} & {invite.groomMotherName}
                </p>
              )}
              {invite.brideFatherName && invite.brideMotherName && (
                <p>
                  Daughter of {invite.brideFatherName} & {invite.brideMotherName}
                </p>
              )}
            </motion.div>
          )}
        </motion.section>

        {/* Floral divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <FloralDivider />
        </motion.div>

        {/* ------------------------------------------------------------------ */}
        {/*  COUNTDOWN SECTION                                                  */}
        {/* ------------------------------------------------------------------ */}
        {invite.weddingDate && (
          <motion.section
            className="scroll-fade mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-2xl border border-rose-100 bg-white/50 p-8 text-center shadow-lg shadow-rose-100/30 backdrop-blur-sm">
              <h2 className="mb-6 font-serif text-2xl text-rose-700">
                Counting Down to Forever
              </h2>
              <div className="grid grid-cols-4 gap-3 sm:gap-6">
                {[
                  { label: "Days", value: countdown.days },
                  { label: "Hours", value: countdown.hours },
                  { label: "Minutes", value: countdown.minutes },
                  { label: "Seconds", value: countdown.seconds },
                ].map((unit) => (
                  <motion.div
                    key={unit.label}
                    className="flex flex-col items-center"
                    whileInView={{ scale: [0.8, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="font-serif text-3xl font-semibold text-rose-600 sm:text-4xl">
                      {String(unit.value).padStart(2, "0")}
                    </span>
                    <span className="mt-1 text-xs tracking-wider text-rose-400 uppercase">
                      {unit.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* ------------------------------------------------------------------ */}
        {/*  OUR STORY SECTION                                                  */}
        {/* ------------------------------------------------------------------ */}
        {invite.story && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <FloralDivider />
            </motion.div>

            <motion.section
              className="scroll-fade mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="rounded-2xl border border-rose-100 bg-white/60 p-8 text-center shadow-lg shadow-rose-100/30 backdrop-blur-sm sm:p-10">
                <motion.h2
                  className="mb-2 font-serif text-3xl text-rose-700"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Our Love Story
                </motion.h2>
                <Heart className="mx-auto mb-6 h-5 w-5 fill-rose-200 text-rose-300" />
                <motion.p
                  className="leading-relaxed text-rose-600/80"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  {invite.story}
                </motion.p>
              </div>
            </motion.section>
          </>
        )}

        {/* Couple message */}
        {invite.coupleMessage && (
          <motion.section
            className="scroll-fade mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-2xl border border-rose-100 bg-rose-50/50 p-8 text-center backdrop-blur-sm sm:p-10">
              <p className="font-serif text-lg leading-relaxed text-rose-600 italic">
                &ldquo;{invite.coupleMessage}&rdquo;
              </p>
            </div>
          </motion.section>
        )}

        {/* Decorative parallax marquee */}
        <TextParallaxMarquee
          text="Save the Date"
          color="rgb(244 63 94)"
          className="mb-8"
        />

        {/* Curved section divider */}
        <CurvedDivider color="rgb(251 113 133)" height={60} />

        {/* ------------------------------------------------------------------ */}
        {/*  DATE & VENUE SECTION                                               */}
        {/* ------------------------------------------------------------------ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <FloralDivider />
        </motion.div>

        <motion.section
          className="scroll-fade mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="rounded-2xl border border-rose-100 bg-white/60 p-8 text-center shadow-lg shadow-rose-100/30 backdrop-blur-sm sm:p-10">
            <h2 className="mb-8 font-serif text-3xl text-rose-700">
              Wedding Details
            </h2>

            <div className="space-y-8">
              {/* Date */}
              <motion.div
                className="flex flex-col items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
                  <Calendar className="h-6 w-6 text-rose-500" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-rose-800">
                    {formatWeddingDate(invite.weddingDate)}
                  </p>
                  {invite.weddingTime && (
                    <p className="mt-1 text-sm text-rose-500">
                      at {invite.weddingTime}
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Divider dot */}
              <div className="flex items-center justify-center gap-2">
                <div className="h-px w-12 bg-rose-200" />
                <div className="h-2 w-2 rounded-full bg-rose-300" />
                <div className="h-px w-12 bg-rose-200" />
              </div>

              {/* Venue */}
              {invite.venue && (
                <motion.div
                  className="flex flex-col items-center gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
                    <MapPin className="h-6 w-6 text-rose-500" />
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-rose-800">
                      {invite.venue}
                    </p>
                    {invite.venueAddress && (
                      <p className="mt-1 text-sm text-rose-500">
                        {invite.venueAddress}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Reception */}
              {invite.receptionDate && (
                <>
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-px w-12 bg-rose-200" />
                    <div className="h-2 w-2 rounded-full bg-rose-300" />
                    <div className="h-px w-12 bg-rose-200" />
                  </div>
                  <motion.div
                    className="flex flex-col items-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <p className="text-sm font-medium tracking-wider text-rose-400 uppercase">
                      Reception
                    </p>
                    <p className="text-lg text-rose-700">
                      {formatWeddingDate(invite.receptionDate)}
                    </p>
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </motion.section>

        {/* ------------------------------------------------------------------ */}
        {/*  EVENTS SECTION                                                     */}
        {/* ------------------------------------------------------------------ */}
        {invite.events && invite.events.length > 0 && (
          <motion.section
            className="scroll-fade mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="mb-8 text-center font-serif text-3xl text-rose-700">
              Wedding Events
            </h2>
            <div className="space-y-4">
              {invite.events.map((event, index) => (
                <motion.div
                  key={index}
                  className="rounded-xl border border-rose-100 bg-white/60 p-6 text-center backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <h3 className="font-serif text-xl text-rose-700">{event.name}</h3>
                  <p className="mt-2 text-sm text-rose-500">
                    {event.date} {event.time && `at ${event.time}`}
                  </p>
                  {event.venue && (
                    <p className="mt-1 text-sm text-rose-400">{event.venue}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Curved section divider before gallery */}
        {invite.galleryImages.length > 0 && (
          <CurvedDivider color="rgb(251 113 133)" height={50} flip />
        )}

        {/* ------------------------------------------------------------------ */}
        {/*  GALLERY SECTION                                                    */}
        {/* ------------------------------------------------------------------ */}
        {invite.galleryImages.length > 0 && (
          <motion.section
            className="scroll-fade mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="mb-8 text-center font-serif text-3xl text-rose-700">
              Gallery
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {invite.galleryImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  className="aspect-square overflow-hidden rounded-xl border border-rose-100 shadow-md"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <ParallaxImage
                    src={img}
                    alt={`Gallery image ${idx + 1}`}
                    speed={15}
                    scaleRange={[1, 1.08]}
                    className="h-full w-full"
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ------------------------------------------------------------------ */}
        {/*  RSVP SECTION                                                       */}
        {/* ------------------------------------------------------------------ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <FloralDivider />
        </motion.div>

        <motion.section
          className="scroll-fade mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="mb-4 font-serif text-3xl text-rose-700">
            Will You Join Us?
          </h2>
          <p className="mb-8 text-rose-500">
            We would be honoured to have you celebrate this special day with us.
          </p>

          <div className="flex flex-col items-center gap-4">
            <MagneticButton strength={0.3} className="w-full max-w-xs">
              <Button
                size="lg"
                className="w-full bg-rose-500 text-white shadow-lg shadow-rose-200/50 hover:bg-rose-600"
                onClick={() => setRsvpOpen(true)}
              >
                <Heart className="mr-2 h-4 w-4" />
                RSVP Now
              </Button>
            </MagneticButton>

            <div className="flex w-full max-w-xs gap-3">
              <Button
                variant="outline"
                size="lg"
                className="flex-1 border-rose-200 text-rose-600 hover:bg-rose-50"
                onClick={() => void handleShare()}
              >
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-rose-200 text-rose-600 hover:bg-rose-50"
                onClick={() => {
                  void fetch("/api/download/invite", { method: "POST" }).then(
                    (r) => {
                      if (r.ok) toast.success("Invite saved to gallery");
                      else toast.error("Unlock your invite to download");
                    },
                  );
                }}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.section>

        {/* ------------------------------------------------------------------ */}
        {/*  FOOTER                                                             */}
        {/* ------------------------------------------------------------------ */}
        <motion.footer
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <FloralDivider className="mx-auto mb-4 h-10 w-48 text-rose-200" />
          <p className="font-serif text-lg text-rose-600">
            {invite.groomName} & {invite.brideName}
          </p>
          <p className="mt-1 text-sm text-rose-400">
            {formatWeddingDate(invite.weddingDate)}
          </p>

          <CardoraWatermark className="mt-12 pb-8 text-center text-xs text-rose-300" />
        </motion.footer>

        {/* Bottom corner petals */}
        <div className="pointer-events-none absolute bottom-0 left-0">
          <PetalCorner position="bottom-left" />
        </div>
        <div className="pointer-events-none absolute bottom-0 right-0">
          <PetalCorner position="bottom-right" />
        </div>
      </div>

      {/* RSVP Modal */}
      <RsvpModal open={rsvpOpen} onOpenChange={setRsvpOpen} inviteSlug={invite.slug} />
    </div>
  );
}
