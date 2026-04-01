"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
  useMotionValueEvent,
  animate,
} from "framer-motion";
import {
  CreditCard,
  Heart,
  BarChart3,
  QrCode,
  Sparkles,
  Globe,
  ArrowRight,
  Check,
  Clock,
  Layout,
  Shield,
  Star,
  Music,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { APP_NAME } from "@/lib/constants";
import { StaggeredTextReveal } from "@/components/animated-invite/shared/staggered-text-reveal";
import { MagneticButton } from "@/components/animated-invite/shared/magnetic-button";
import { TextParallaxMarquee } from "@/components/animated-invite/shared/text-parallax-marquee";
import { Footer } from "@/components/landing/footer";
import { FloatingCardsHero } from "@/components/landing/floating-cards-hero";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const features = [
  {
    icon: CreditCard,
    title: "Business Cards",
    description:
      "10+ professionally designed templates with live preview. Customize every detail to match your brand.",
    gradient: "from-[#B8860B] to-[#D4A843]",
    bgGradient: "from-[#B8860B]/10 to-[#D4A843]/10",
    iconColor: "text-[#B8860B]",
  },
  {
    icon: Heart,
    title: "Wedding Invitations",
    description:
      "30+ stunning static templates. Beautiful designs crafted for your most special day, completely free.",
    gradient: "from-[#8B7355] to-[#B8860B]",
    bgGradient: "from-[#8B7355]/10 to-[#B8860B]/10",
    iconColor: "text-[#8B7355]",
  },
  {
    icon: Sparkles,
    title: "Animated Invites",
    description:
      "Cinematic invitations with music, parallax animations, and interactive RSVP. Truly unforgettable.",
    gradient: "from-[#D4A843] to-[#C9A96E]",
    bgGradient: "from-[#D4A843]/10 to-[#C9A96E]/10",
    iconColor: "text-[#D4A843]",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Track profile views, QR scans, and NFC taps. Understand your audience with real-time insights.",
    gradient: "from-[#1A1A1A] to-[#3D3D3D]",
    bgGradient: "from-[#1A1A1A]/8 to-[#3D3D3D]/8",
    iconColor: "text-[#1A1A1A]",
  },
  {
    icon: QrCode,
    title: "QR & NFC Sharing",
    description:
      "Share your card instantly via QR code, NFC tap, or a unique link. One tap is all it takes.",
    gradient: "from-[#B8860B] to-[#8B7355]",
    bgGradient: "from-[#B8860B]/10 to-[#8B7355]/10",
    iconColor: "text-[#B8860B]",
  },
  {
    icon: Globe,
    title: "Multi-Country Support",
    description:
      "Stripe-powered secure payments in Canadian Dollars. Built for Canada.",
    gradient: "from-[#C9A96E] to-[#D4A843]",
    bgGradient: "from-[#C9A96E]/10 to-[#D4A843]/10",
    iconColor: "text-[#C9A96E]",
  },
];

const pricingCards = [
  {
    title: "Business Cards & Wedding Cards",
    icon: CreditCard,
    iconColor: "text-[#1A1A1A]",
    price: "Free",
    priceSubtext: "forever",
    badge: null,
    accentColor: "charcoal",
    gradient: "from-[#1A1A1A] to-[#3D3D3D]",
    features: [
      "10+ business card templates",
      "30+ wedding card templates",
      "QR code & NFC sharing",
      "Analytics dashboard",
      "Public profile page",
      "Downloadable PDF",
    ],
  },
  {
    title: "Animated Invites",
    icon: Sparkles,
    iconColor: "text-[#B8860B]",
    price: "C$49.99",
    priceSubtext: "one-time",
    badge: "Premium",
    accentColor: "gold",
    gradient: "from-[#B8860B] to-[#D4A843]",
    features: [
      "17 cinematic animated templates",
      "Background music & gallery",
      "Interactive RSVP system",
      "Multi-event support",
      "Parallax & scroll animations",
      "Shareable invite link",
    ],
  },
];

const stats = [
  { label: "Setup Time", value: "5", suffix: "min", icon: Clock, color: "text-[#B8860B]", bg: "bg-[#B8860B]/10" },
  { label: "Templates", value: "50", suffix: "+", icon: Layout, color: "text-[#1A1A1A]", bg: "bg-[#1A1A1A]/8" },
  { label: "Secure Payments", value: "100", suffix: "%", icon: Shield, color: "text-[#8B7355]", bg: "bg-[#8B7355]/10" },
];

/* ------------------------------------------------------------------ */
/*  Animated Counter                                                   */
/* ------------------------------------------------------------------ */

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) {
      void animate(motionVal, target, { duration: 2, ease: "easeOut" });
    }
  }, [isInView, motionVal, target]);

  useMotionValueEvent(rounded, "change", (latest) => {
    if (ref.current) ref.current.textContent = `${latest}${suffix}`;
  });

  return <span ref={ref}>0{suffix}</span>;
}

/* ------------------------------------------------------------------ */
/*  Feature Card with 3D tilt                                          */
/* ------------------------------------------------------------------ */

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const smoothY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(y * -10);
    rotateY.set(x * 10);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX: smoothX,
        rotateY: smoothY,
        transformPerspective: 800,
      }}
      className="group relative overflow-hidden rounded-2xl border bg-card p-8 shadow-sm transition-shadow hover:shadow-xl"
    >
      {/* Colorful gradient overlay on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
      />
      {/* Colorful top border accent */}
      <div
        className={`absolute top-0 right-0 left-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
      />
      <div className="relative z-10">
        <div
          className={`mb-5 inline-flex rounded-xl bg-gradient-to-br ${feature.bgGradient} p-3 ${feature.iconColor}`}
        >
          <feature.icon className="h-6 w-6" />
        </div>
        <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/* ------------------------------------------------------------------ */

function Navbar() {
  const { scrollY } = useScroll();
  const navY = useMotionValue(0);
  const prevScroll = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - prevScroll.current;
    prevScroll.current = latest;
    if (latest < 100) {
      navY.set(0);
    } else if (diff > 0) {
      navY.set(-100);
    } else {
      navY.set(0);
    }
  });

  const smoothNavY = useSpring(navY, { stiffness: 300, damping: 30 });

  return (
    <motion.header
      style={{ y: smoothNavY }}
      className="fixed top-0 right-0 left-0 z-50 border-b border-[#E8E4DE]/60 bg-[#FAF8F5]/80 backdrop-blur-xl"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2.5"
        >
          <Image
            src="/favicon.ico"
            alt="Cardora"
            width={28}
            height={28}
            className="h-7 w-7"
          />
          <span
            className="text-xl font-bold tracking-wide text-[#1A1A1A]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {APP_NAME}
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm text-[#6B6560] transition-colors hover:text-[#1A1A1A]"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-sm text-[#6B6560] transition-colors hover:text-[#1A1A1A]"
          >
            Pricing
          </a>
          <Link
            href="/about"
            className="text-sm text-[#6B6560] transition-colors hover:text-[#1A1A1A]"
          >
            About
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-[#1A1A1A] hover:bg-[#F3F0EB]">
              Sign in
            </Button>
          </Link>
          <MagneticButton strength={0.2}>
            <Link href="/signup">
              <Button
                size="sm"
                className="bg-gradient-to-r from-[#B8860B] to-[#D4A843] text-white hover:from-[#9A7209] hover:to-[#B8960B]"
              >
                Get Started
              </Button>
            </Link>
          </MagneticButton>
        </div>
      </nav>
    </motion.header>
  );
}

/* ------------------------------------------------------------------ */
/*  Features Section                                                   */
/* ------------------------------------------------------------------ */

function FeaturesSection() {
  return (
    <section id="features" className="relative scroll-mt-20 px-6 py-24">
      {/* Subtle warm background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#B8860B]/3 via-transparent to-[#D4A843]/3" />

      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-4 inline-block rounded-full bg-[#B8860B]/10 px-4 py-1 text-sm font-medium text-[#B8860B]"
          >
            Packed with Features
          </motion.span>
          <StaggeredTextReveal
            text="Everything you need"
            as="h2"
            splitBy="word"
            className="justify-center text-3xl font-bold md:text-5xl"
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mx-auto mt-4 max-w-xl text-muted-foreground"
          >
            From business cards to wedding invitations, {APP_NAME} has you
            covered with powerful features and beautiful designs.
          </motion.p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Template Showcase                                                  */
/* ------------------------------------------------------------------ */

function TemplateShowcase() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      {/* Colorful background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#B8860B]/3 via-[#D4A843]/3 to-[#C9A96E]/3" />

      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        {/* Left — text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-4 inline-block rounded-full bg-[#B8860B]/10 px-4 py-1 text-sm font-medium text-[#B8860B]"
          >
            Beautiful Templates
          </motion.span>
          <StaggeredTextReveal
            text="Templates that leave a lasting impression"
            as="h2"
            splitBy="word"
            className="text-3xl font-bold md:text-4xl lg:text-5xl"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-6 max-w-md text-muted-foreground"
          >
            Choose from dozens of professionally crafted templates. From
            minimalist business cards to cinematic wedding invitations with
            music, RSVP, and parallax animations.
          </motion.p>

          {/* Animated stat counters */}
          <div className="mt-10 grid grid-cols-3 gap-6">
            {[
              { label: "Business Templates", count: 10, suffix: "+", color: "text-[#B8860B]" },
              { label: "Wedding Templates", count: 30, suffix: "+", color: "text-[#8B7355]" },
              { label: "Animated Invites", count: 17, suffix: "", color: "text-[#D4A843]" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
              >
                <div
                  className={`text-3xl font-bold md:text-4xl ${stat.color}`}
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  <AnimatedCounter
                    target={stat.count}
                    suffix={stat.suffix}
                  />
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right — preview mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-2xl border shadow-2xl">
            {/* Colorful gradient card mockup */}
            <div className="aspect-[4/3] bg-gradient-to-br from-[#B8860B]/8 via-[#D4A843]/6 to-[#C9A96E]/8 p-8">
              <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#B8860B]/25 to-[#D4A843]/25" />
                <div className="h-3 w-40 rounded-full bg-gradient-to-r from-[#B8860B]/15 to-[#D4A843]/15" />
                <div className="h-2 w-24 rounded-full bg-muted/60" />
                <div className="mt-4 grid w-full max-w-xs grid-cols-3 gap-3">
                  {[
                    "from-[#B8860B]/15 to-[#D4A843]/15",
                    "from-[#8B7355]/15 to-[#B8860B]/15",
                    "from-[#D4A843]/15 to-[#C9A96E]/15",
                    "from-[#1A1A1A]/8 to-[#3D3D3D]/8",
                    "from-[#B8860B]/10 to-[#8B7355]/10",
                    "from-[#C9A96E]/15 to-[#D4A843]/15",
                  ].map((grad, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded-lg bg-gradient-to-br ${grad}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Decorative floating card behind */}
          <div className="animate-float absolute -right-4 -bottom-4 -z-10 h-full w-full rounded-2xl bg-gradient-to-br from-[#B8860B]/12 to-[#D4A843]/12" />
          {/* Second decorative layer */}
          <div
            className="animate-float absolute -right-8 -bottom-8 -z-20 h-full w-full rounded-2xl bg-gradient-to-br from-[#C9A96E]/8 to-[#B8860B]/8"
            style={{ animationDelay: "2s" }}
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Pricing Section                                                    */
/* ------------------------------------------------------------------ */

function PricingSection() {
  return (
    <section id="pricing" className="relative scroll-mt-20 px-6 py-24">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#B8860B]/3 via-transparent to-[#1A1A1A]/3" />

      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-4 inline-block rounded-full bg-[#B8860B]/10 px-4 py-1 text-sm font-medium text-[#B8860B]"
          >
            Pricing
          </motion.span>
          <StaggeredTextReveal
            text="Most features, completely free"
            as="h2"
            splitBy="word"
            className="justify-center text-3xl font-bold md:text-5xl"
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mx-auto mt-4 max-w-xl text-muted-foreground"
          >
            Business cards and wedding invitations are free forever.
            Only animated invites require a one-time payment. No subscriptions.
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {pricingCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -4 }}
              className={`relative overflow-hidden rounded-2xl border bg-card p-8 shadow-sm transition-shadow hover:shadow-xl ${
                card.badge ? "ring-2 ring-[#B8860B]/30" : ""
              }`}
            >
              {/* Colorful top gradient bar */}
              <div
                className={`absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r ${card.gradient}`}
              />

              {card.badge && (
                <motion.span
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute top-4 right-4 rounded-full bg-gradient-to-r from-[#B8860B] to-[#D4A843] px-3 py-1 text-xs font-medium text-white"
                >
                  {card.badge}
                </motion.span>
              )}

              <div className="mb-2 flex items-center gap-3">
                <div
                  className={`inline-flex rounded-xl bg-gradient-to-br ${card.gradient.replace("500", "500/20").replace("400", "400/20")} p-2.5 ${card.iconColor}`}
                >
                  <card.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold">{card.title}</h3>
              </div>

              <div className="mb-6 mt-4">
                <span
                  className={`text-4xl font-bold ${
                    card.price === "Free"
                      ? "text-[#1A1A1A]"
                      : "bg-gradient-to-r from-[#B8860B] to-[#D4A843] bg-clip-text text-transparent"
                  }`}
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {card.price}
                </span>
                <span className="ml-2 text-muted-foreground">
                  / {card.priceSubtext}
                </span>
              </div>

              <ul className="mb-8 space-y-3">
                {card.features.map((feature, fi) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + fi * 0.08 }}
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                  >
                    <Check className="h-4 w-4 shrink-0 text-[#B8860B]" />
                    {feature}
                  </motion.li>
                ))}
              </ul>

              <MagneticButton strength={0.2} className="w-full">
                <Link href="/signup" className="block w-full">
                  <Button
                    className={`w-full ${
                      card.badge
                        ? "bg-gradient-to-r from-[#B8860B] to-[#D4A843] text-white hover:from-[#9A7209] hover:to-[#B8960B]"
                        : "bg-[#1A1A1A] text-white hover:bg-[#2D2D2D]"
                    }`}
                  >
                    {card.price === "Free" ? "Start Free" : "Get Started"}
                  </Button>
                </Link>
              </MagneticButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  What You Get (Free vs Paid)                                        */
/* ------------------------------------------------------------------ */

function WhatsIncluded() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#D4A843]/3 via-transparent to-[#B8860B]/3" />

      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <StaggeredTextReveal
            text="Why choose us"
            as="h2"
            splitBy="word"
            className="justify-center text-3xl font-bold md:text-5xl"
          />
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {stats.map((stat, i) => {
            const colors = ["text-[#B8860B]", "text-[#1A1A1A]", "text-[#8B7355]"];
            const bgColors = ["bg-[#B8860B]/10", "bg-[#1A1A1A]/8", "bg-[#8B7355]/10"];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center"
              >
                <div
                  className={`mb-4 inline-flex rounded-2xl ${bgColors[i]} p-4 shadow-sm`}
                >
                  <stat.icon className={`h-6 w-6 ${colors[i]}`} />
                </div>
                <div
                  className={`text-5xl font-bold ${colors[i]}`}
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  <AnimatedCounter
                    target={Number(stat.value)}
                    suffix={stat.suffix}
                  />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated Invites Highlight                                         */
/* ------------------------------------------------------------------ */

function AnimatedInviteHighlight() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#B8860B]/3 via-[#D4A843]/3 to-[#C9A96E]/3" />

      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        {/* Left — visual */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-2xl border shadow-2xl">
            <div className="aspect-[4/3] bg-gradient-to-br from-[#B8860B]/8 via-[#D4A843]/6 to-[#C9A96E]/8 p-8">
              <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="rounded-full bg-gradient-to-br from-[#B8860B]/15 to-[#D4A843]/15 p-6"
                >
                  <Music className="h-10 w-10 text-[#B8860B]" />
                </motion.div>
                <div className="h-3 w-48 rounded-full bg-gradient-to-r from-[#B8860B]/15 to-[#D4A843]/15" />
                <div className="h-2 w-32 rounded-full bg-muted/40" />
                <div className="flex gap-2">
                  {["from-[#B8860B]/15 to-[#D4A843]/15", "from-[#8B7355]/15 to-[#B8860B]/15", "from-[#1A1A1A]/8 to-[#3D3D3D]/8"].map((g, i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                      className={`h-14 w-14 rounded-lg bg-gradient-to-br ${g}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="animate-float absolute -left-4 -bottom-4 -z-10 h-full w-full rounded-2xl bg-gradient-to-br from-[#B8860B]/10 to-[#D4A843]/10" />
        </motion.div>

        {/* Right — text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-4 inline-block rounded-full bg-[#B8860B]/10 px-4 py-1 text-sm font-medium text-[#B8860B]"
          >
            Premium Feature
          </motion.span>
          <StaggeredTextReveal
            text="Cinematic animated invitations"
            as="h2"
            splitBy="word"
            className="text-3xl font-bold md:text-4xl lg:text-5xl"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-6 max-w-md text-muted-foreground"
          >
            Go beyond static cards. Our animated invites feature background music,
            parallax scrolling, interactive RSVP, multi-event timelines, and
            gorgeous scroll-triggered animations, all for just{" "}
            <strong className="text-foreground">C$49.99</strong> one-time.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8"
          >
            <MagneticButton strength={0.2}>
              <Link href="/signup">
                <Button className="gap-2 bg-gradient-to-r from-[#B8860B] to-[#D4A843] text-white hover:from-[#9A7209] hover:to-[#B8960B]">
                  Explore Animated Invites
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Final CTA                                                          */
/* ------------------------------------------------------------------ */

function FinalCTA() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      {/* Vibrant gradient background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 30%, #1A1A1A 60%, #2D2D2D 100%)",
        }}
      />
      {/* Sparkle overlay — deterministic positions to avoid hydration mismatch */}
      <div className="absolute inset-0 -z-[5]">
        {[
          { l: 12, t: 8 },  { l: 45, t: 22 }, { l: 78, t: 15 }, { l: 23, t: 65 },
          { l: 56, t: 42 }, { l: 89, t: 73 }, { l: 34, t: 88 }, { l: 67, t: 55 },
          { l: 5, t: 35 },  { l: 91, t: 48 }, { l: 18, t: 92 }, { l: 72, t: 5 },
          { l: 40, t: 78 }, { l: 60, t: 30 }, { l: 85, t: 90 }, { l: 15, t: 50 },
          { l: 50, t: 12 }, { l: 30, t: 70 }, { l: 75, t: 38 }, { l: 8, t: 82 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-[#D4A843]"
            style={{
              left: `${pos.l}%`,
              top: `${pos.t}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 2 + (i % 5) * 0.4,
              delay: (i % 7) * 0.4,
            }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <StaggeredTextReveal
          text="Ready to make a lasting impression?"
          as="h2"
          splitBy="word"
          className="justify-center text-3xl font-bold text-white md:text-5xl"
        />
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mx-auto mt-6 max-w-xl text-lg text-white/80"
        >
          Join thousands of users creating beautiful digital cards and
          invitations. Start building yours today. It&apos;s free and takes just 5 minutes.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-10"
        >
          <MagneticButton strength={0.3}>
            <Link href="/signup">
              <Button
                size="lg"
                className="min-w-[220px] gap-2 bg-gradient-to-r from-[#B8860B] to-[#D4A843] text-base text-white hover:from-[#9A7209] hover:to-[#B8960B]"
              >
                Create Your Card - Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export function LandingContent() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <FloatingCardsHero />

      {/* Marquee strip */}
      <TextParallaxMarquee
        text="Digital Business Cards  &bull;  Wedding Invitations  &bull;  QR Sharing  &bull;  NFC Tap  &bull;  Analytics  &bull;  Free Forever  &bull;"
        repeat={3}
        baseVelocity={100}
        className="border-y"
      />

      <FeaturesSection />
      <TemplateShowcase />
      <AnimatedInviteHighlight />
      <PricingSection />
      <WhatsIncluded />
      <FinalCTA />
      <Footer />
    </main>
  );
}
