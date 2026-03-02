"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
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
  ChevronDown,
  Check,
  Clock,
  Layout,
  Shield,
  Zap,
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

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const features = [
  {
    icon: CreditCard,
    title: "Business Cards",
    description:
      "10+ professionally designed templates with live preview. Customize every detail to match your brand.",
    gradient: "from-blue-500 to-cyan-400",
    bgGradient: "from-blue-500/20 to-cyan-400/20",
    iconColor: "text-blue-500",
  },
  {
    icon: Heart,
    title: "Wedding Invitations",
    description:
      "30+ stunning static templates. Beautiful designs crafted for your most special day — completely free.",
    gradient: "from-rose-500 to-pink-400",
    bgGradient: "from-rose-500/20 to-pink-400/20",
    iconColor: "text-rose-500",
  },
  {
    icon: Sparkles,
    title: "Animated Invites",
    description:
      "Cinematic invitations with music, parallax animations, and interactive RSVP — truly unforgettable.",
    gradient: "from-amber-500 to-orange-400",
    bgGradient: "from-amber-500/20 to-orange-400/20",
    iconColor: "text-amber-500",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Track profile views, QR scans, and NFC taps. Understand your audience with real-time insights.",
    gradient: "from-emerald-500 to-green-400",
    bgGradient: "from-emerald-500/20 to-green-400/20",
    iconColor: "text-emerald-500",
  },
  {
    icon: QrCode,
    title: "QR & NFC Sharing",
    description:
      "Share your card instantly via QR code, NFC tap, or a unique link. One tap is all it takes.",
    gradient: "from-violet-500 to-purple-400",
    bgGradient: "from-violet-500/20 to-purple-400/20",
    iconColor: "text-violet-500",
  },
  {
    icon: Globe,
    title: "Multi-Country Support",
    description:
      "Localized experience for India and Canada. Razorpay-powered secure payments in INR.",
    gradient: "from-cyan-500 to-teal-400",
    bgGradient: "from-cyan-500/20 to-teal-400/20",
    iconColor: "text-cyan-500",
  },
];

const pricingCards = [
  {
    title: "Business Cards & Wedding Cards",
    icon: CreditCard,
    iconColor: "text-emerald-500",
    price: "Free",
    priceSubtext: "forever",
    badge: null,
    accentColor: "emerald",
    gradient: "from-emerald-500 to-teal-400",
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
    iconColor: "text-amber-500",
    price: "₹3,000",
    priceSubtext: "one-time",
    badge: "Premium",
    accentColor: "amber",
    gradient: "from-amber-500 to-orange-400",
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
  { label: "Setup Time", value: "5", suffix: "min", icon: Clock },
  { label: "Templates", value: "50", suffix: "+", icon: Layout },
  { label: "Secure Payments", value: "100", suffix: "%", icon: Shield },
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
      className="fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-background/60 backdrop-blur-xl"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-xl font-bold text-transparent"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {APP_NAME}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </a>
          <Link
            href="/about"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
          </Link>
          <MagneticButton strength={0.2}>
            <Link href="/signup">
              <Button
                size="sm"
                className="bg-gradient-to-r from-violet-600 to-pink-500 text-white hover:from-violet-700 hover:to-pink-600"
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
/*  Hero Section                                                       */
/* ------------------------------------------------------------------ */

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const orbX1 = useTransform(smoothMouseX, (v) => v * 0.02);
  const orbY1 = useTransform(smoothMouseY, (v) => v * 0.02);
  const orbX2 = useTransform(smoothMouseX, (v) => v * -0.015);
  const orbY2 = useTransform(smoothMouseY, (v) => v * -0.015);
  const orbX3 = useTransform(smoothMouseX, (v) => v * 0.01);
  const orbY3 = useTransform(smoothMouseY, (v) => v * 0.01);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16"
    >
      {/* Vibrant animated gradient mesh background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="animate-gradient-shift absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 20% 50%, #667eea30 0%, transparent 50%),
              radial-gradient(ellipse at 80% 20%, #764ba230 0%, transparent 50%),
              radial-gradient(ellipse at 40% 80%, #f093fb20 0%, transparent 50%),
              radial-gradient(ellipse at 70% 60%, #4facfe20 0%, transparent 50%)
            `,
            backgroundSize: "200% 200%",
          }}
        />
      </div>

      {/* Colorful floating orbs */}
      <motion.div
        style={{ x: orbX1, y: orbY1 }}
        className="animate-float absolute top-1/4 left-[10%] -z-10 h-80 w-80 rounded-full opacity-40 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2 }}
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background: "radial-gradient(circle, #667eea60, transparent 70%)",
          }}
        />
      </motion.div>
      <motion.div
        style={{ x: orbX2, y: orbY2 }}
        className="animate-float absolute right-[10%] bottom-1/3 -z-10 h-72 w-72 rounded-full opacity-40 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background: "radial-gradient(circle, #f093fb60, transparent 70%)",
          }}
        />
      </motion.div>
      <motion.div
        style={{ x: orbX3, y: orbY3 }}
        className="animate-float absolute top-[60%] left-[40%] -z-10 h-64 w-64 rounded-full opacity-30 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2, delay: 1 }}
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background: "radial-gradient(circle, #4facfe50, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-600 backdrop-blur-sm dark:text-violet-400">
            <Sparkles className="h-3.5 w-3.5" />
            100% Free Business Cards & Wedding Invitations
          </span>
        </motion.div>

        <StaggeredTextReveal
          text="Your Digital Identity, Beautifully Crafted"
          as="h1"
          splitBy="word"
          className="justify-center text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl"
        >
          Create stunning digital business cards and beautiful wedding
          invitations — <strong className="text-foreground">completely free</strong>.
          Upgrade to cinematic animated invites for just{" "}
          <strong className="text-foreground">₹3,000</strong>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <MagneticButton strength={0.3}>
            <Link href="/signup">
              <Button
                size="lg"
                className="min-w-[200px] gap-2 bg-gradient-to-r from-violet-600 to-pink-500 text-base text-white hover:from-violet-700 hover:to-pink-600"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </MagneticButton>
          <MagneticButton strength={0.2}>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="min-w-[200px] border-violet-500/30 text-base hover:bg-violet-500/10"
              >
                Sign In
              </Button>
            </Link>
          </MagneticButton>
        </motion.div>

        {/* Highlight badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {[
            { icon: Zap, text: "5 Min Setup", color: "text-amber-500" },
            { icon: Shield, text: "Razorpay Secure", color: "text-emerald-500" },
            { icon: Star, text: "50+ Templates", color: "text-violet-500" },
          ].map((item) => (
            <span
              key={item.text}
              className="inline-flex items-center gap-2 rounded-full bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground"
            >
              <item.icon className={`h-3.5 w-3.5 ${item.color}`} />
              {item.text}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6 text-muted-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Features Section                                                   */
/* ------------------------------------------------------------------ */

function FeaturesSection() {
  return (
    <section id="features" className="relative scroll-mt-20 px-6 py-24">
      {/* Subtle colorful background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-violet-500/5 via-transparent to-pink-500/5" />

      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-4 inline-block rounded-full bg-emerald-500/10 px-4 py-1 text-sm font-medium text-emerald-600 dark:text-emerald-400"
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
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amber-500/5 via-rose-500/5 to-violet-500/5" />

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
            className="mb-4 inline-block rounded-full bg-rose-500/10 px-4 py-1 text-sm font-medium text-rose-600 dark:text-rose-400"
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
              { label: "Business Templates", count: 10, suffix: "+", color: "text-blue-500" },
              { label: "Wedding Templates", count: 30, suffix: "+", color: "text-rose-500" },
              { label: "Animated Invites", count: 17, suffix: "", color: "text-amber-500" },
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
            <div className="aspect-[4/3] bg-gradient-to-br from-violet-500/10 via-pink-500/10 to-amber-500/10 p-8">
              <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-violet-500/30 to-pink-500/30" />
                <div className="h-3 w-40 rounded-full bg-gradient-to-r from-violet-500/20 to-pink-500/20" />
                <div className="h-2 w-24 rounded-full bg-muted/60" />
                <div className="mt-4 grid w-full max-w-xs grid-cols-3 gap-3">
                  {[
                    "from-blue-500/20 to-cyan-400/20",
                    "from-rose-500/20 to-pink-400/20",
                    "from-amber-500/20 to-orange-400/20",
                    "from-emerald-500/20 to-green-400/20",
                    "from-violet-500/20 to-purple-400/20",
                    "from-cyan-500/20 to-teal-400/20",
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
          <div className="animate-float absolute -right-4 -bottom-4 -z-10 h-full w-full rounded-2xl bg-gradient-to-br from-violet-500/15 to-pink-500/15" />
          {/* Second decorative layer */}
          <div
            className="animate-float absolute -right-8 -bottom-8 -z-20 h-full w-full rounded-2xl bg-gradient-to-br from-amber-500/10 to-rose-500/10"
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
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-500/5 via-transparent to-amber-500/5" />

      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-4 inline-block rounded-full bg-violet-500/10 px-4 py-1 text-sm font-medium text-violet-600 dark:text-violet-400"
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
            Only animated invites require a one-time payment — no subscriptions.
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
                card.badge ? "ring-2 ring-amber-500/30" : ""
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
                  className="absolute top-4 right-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-400 px-3 py-1 text-xs font-medium text-white"
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
                      ? "bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent"
                      : "bg-gradient-to-r from-amber-500 to-orange-400 bg-clip-text text-transparent"
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
                    <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                    {feature}
                  </motion.li>
                ))}
              </ul>

              <MagneticButton strength={0.2} className="w-full">
                <Link href="/signup" className="block w-full">
                  <Button
                    className={`w-full ${
                      card.badge
                        ? "bg-gradient-to-r from-amber-500 to-orange-400 text-white hover:from-amber-600 hover:to-orange-500"
                        : "bg-gradient-to-r from-emerald-500 to-teal-400 text-white hover:from-emerald-600 hover:to-teal-500"
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
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-rose-500/5 via-transparent to-violet-500/5" />

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
            const colors = ["text-amber-500", "text-violet-500", "text-emerald-500"];
            const bgColors = ["bg-amber-500/10", "bg-violet-500/10", "bg-emerald-500/10"];
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
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-amber-500/5 via-rose-500/5 to-violet-500/5" />

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
            <div className="aspect-[4/3] bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-violet-500/10 p-8">
              <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="rounded-full bg-gradient-to-br from-amber-500/20 to-rose-500/20 p-6"
                >
                  <Music className="h-10 w-10 text-amber-500" />
                </motion.div>
                <div className="h-3 w-48 rounded-full bg-gradient-to-r from-amber-500/20 to-rose-500/20" />
                <div className="h-2 w-32 rounded-full bg-muted/40" />
                <div className="flex gap-2">
                  {["from-amber-500/20 to-orange-400/20", "from-rose-500/20 to-pink-400/20", "from-violet-500/20 to-purple-400/20"].map((g, i) => (
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
          <div className="animate-float absolute -left-4 -bottom-4 -z-10 h-full w-full rounded-2xl bg-gradient-to-br from-amber-500/15 to-rose-500/15" />
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
            className="mb-4 inline-block rounded-full bg-amber-500/10 px-4 py-1 text-sm font-medium text-amber-600 dark:text-amber-400"
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
            gorgeous scroll-triggered animations — all for just{" "}
            <strong className="text-foreground">₹3,000</strong> one-time.
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
                <Button className="gap-2 bg-gradient-to-r from-amber-500 to-orange-400 text-white hover:from-amber-600 hover:to-orange-500">
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
        className="animate-gradient-shift absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #667eea 100%)",
          backgroundSize: "400% 400%",
        }}
      />
      {/* Sparkle overlay */}
      <div className="absolute inset-0 -z-[5]">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 3,
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
          invitations. Start building yours today — it&apos;s free and takes just 5 minutes.
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
                variant="secondary"
                className="min-w-[220px] gap-2 text-base"
              >
                Create Your Card — Free
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
      <HeroSection />

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
