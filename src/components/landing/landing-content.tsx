"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CreditCard,
  Heart,
  BarChart3,
  QrCode,
  Palette,
  Globe,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { APP_NAME } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const features = [
  {
    icon: CreditCard,
    title: "Business Cards",
    description:
      "10+ professionally designed templates with live preview. Customize every detail.",
    color: "text-blue-500",
  },
  {
    icon: Heart,
    title: "Wedding Invitations",
    description:
      "30+ static and 17 animated templates. Beautiful designs for your special day.",
    color: "text-rose-500",
  },
  {
    icon: Sparkles,
    title: "Animated Invites",
    description:
      "Cinematic wedding invitations with music, animations, and interactive RSVP.",
    color: "text-amber-500",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description:
      "Track profile views, QR scans, and NFC taps. Understand your audience.",
    color: "text-emerald-500",
  },
  {
    icon: QrCode,
    title: "QR & NFC Sharing",
    description:
      "Share your card instantly via QR code, NFC tap, or a unique link.",
    color: "text-violet-500",
  },
  {
    icon: Globe,
    title: "Multi-Country",
    description:
      "Support for India and Canada with localized pricing and payment methods.",
    color: "text-cyan-500",
  },
];

const highlights = [
  {
    icon: Palette,
    title: "Beautiful Designs",
    description: "Handcrafted templates for every occasion",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Stripe-powered checkout with Interac support",
  },
  {
    icon: Zap,
    title: "Instant Setup",
    description: "Create your digital card in under 5 minutes",
  },
];

export function LandingContent() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-50 flex items-center justify-between border-b bg-background/80 px-6 py-4 backdrop-blur-md"
      >
        <span className="text-xl font-bold">{APP_NAME}</span>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/login">
            <Button variant="ghost">Sign in</Button>
          </Link>
          <Link href="/signup">
            <Button>Get Started</Button>
          </Link>
        </div>
      </motion.header>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden px-4 py-24 text-center md:py-32">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl space-y-8"
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
            <span className="inline-block rounded-full border bg-muted px-4 py-1.5 text-sm font-medium text-muted-foreground">
              Digital cards for the modern world
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Your Digital Identity,{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Beautifully Crafted
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl"
          >
            Create stunning digital business cards and beautiful wedding
            invitations. Share via QR code, NFC, or a simple link — all from one
            platform.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link href="/signup">
              <Button size="lg" className="min-w-[200px] text-base">
                Create Your Card
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="min-w-[200px] text-base"
              >
                Sign In
              </Button>
            </Link>
          </motion.div>

          {/* Highlights */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-muted-foreground"
          >
            {highlights.map((h) => (
              <div key={h.title} className="flex items-center gap-2">
                <h.icon className="h-4 w-4" />
                <span>{h.title}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="border-t bg-muted/30 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl font-bold md:text-4xl"
            >
              Everything you need
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-3 max-w-xl text-muted-foreground"
            >
              From business cards to wedding invitations, {APP_NAME} has you
              covered with powerful features and beautiful designs.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                transition={{ duration: 0.4 }}
                className="group rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div
                  className={`mb-4 inline-flex rounded-lg bg-muted p-2.5 ${feature.color}`}
                >
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl font-bold md:text-4xl"
            >
              Simple, transparent pricing
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-3 max-w-xl text-muted-foreground"
            >
              Pay only for what you use. No subscriptions, no hidden fees.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="mt-12 grid gap-6 md:grid-cols-2"
          >
            <motion.div
              variants={fadeUp}
              className="rounded-xl border bg-card p-8 shadow-sm"
            >
              <div className="mb-2 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-blue-500" />
                <h3 className="text-xl font-semibold">Business Card</h3>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold">C$4.99</span>
                <span className="text-muted-foreground"> / one-time</span>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>10+ premium templates</li>
                <li>QR code & NFC sharing</li>
                <li>Analytics dashboard</li>
                <li>Public profile page</li>
              </ul>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="rounded-xl border-2 border-primary bg-card p-8 shadow-sm"
            >
              <div className="mb-2 flex items-center gap-2">
                <Heart className="h-5 w-5 text-rose-500" />
                <h3 className="text-xl font-semibold">Wedding Invite</h3>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold">C$9.99</span>
                <span className="text-muted-foreground"> / one-time</span>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>30+ static + 17 animated templates</li>
                <li>RSVP tracking & guest management</li>
                <li>Background music & gallery</li>
                <li>Shareable invite link</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-primary px-4 py-16 text-center text-primary-foreground">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mx-auto max-w-2xl space-y-6"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-bold md:text-4xl"
          >
            Ready to get started?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-primary-foreground/80">
            Join thousands of users creating beautiful digital cards and
            invitations.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link href="/signup">
              <Button
                size="lg"
                variant="secondary"
                className="min-w-[200px] text-base"
              >
                Create Your Card — Free
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-8 text-center text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
