"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Sparkles, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import { platform } from "@/lib/platform";
import { StaggeredTextReveal } from "@/components/animated-invite/shared/staggered-text-reveal";
import { MagneticButton } from "@/components/animated-invite/shared/magnetic-button";
import { Footer } from "@/components/landing/footer";

const values = [
  {
    icon: Sparkles,
    title: "Craft with Care",
    description:
      "Every template is meticulously designed. We obsess over typography, spacing, and animation so you don't have to.",
    gradient: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-500",
  },
  {
    icon: Heart,
    title: "Celebrate Moments",
    description:
      "From business milestones to wedding days, we believe every moment deserves a beautiful digital presence.",
    gradient: "from-rose-500/20 to-pink-500/20",
    iconColor: "text-rose-500",
  },
  {
    icon: Shield,
    title: "Respect Privacy",
    description:
      "Your data is yours. We use secure payments, hashed passwords, and never sell your personal information.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  return (
    <>
      <main className="flex min-h-screen flex-col">
        {/* Hero */}
        <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-20">
          <div
            className="animate-gradient-shift absolute inset-0 -z-10"
            style={{
              background: `
                radial-gradient(ellipse at 30% 50%, ${platform.brand.primaryColor}10 0%, transparent 50%),
                radial-gradient(ellipse at 70% 30%, ${platform.brand.secondaryColor}10 0%, transparent 50%)
              `,
              backgroundSize: "200% 200%",
            }}
          />

          {/* Back link */}
          <div className="mx-auto w-full max-w-3xl">
            <Link
              href="/"
              className="mb-10 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              &larr; Back to {APP_NAME}
            </Link>
          </div>

          <div className="mx-auto max-w-3xl text-center">
            <StaggeredTextReveal
              text={`About ${APP_NAME}`}
              as="h1"
              splitBy="word"
              className="justify-center text-4xl font-bold tracking-tight md:text-6xl"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground"
            >
              We&apos;re building the future of digital identity - one card at a
              time.
            </motion.p>
          </div>
        </section>

        {/* Mission */}
        <section className="px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ staggerChildren: 0.15 }}
            className="mx-auto max-w-3xl"
          >
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold md:text-3xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Our Mission
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="mt-6 text-muted-foreground leading-relaxed"
            >
              {APP_NAME} was born from a simple idea: your digital identity
              should be as unique and beautiful as you are. In a world of
              generic profiles and forgettable contact exchanges, we set out to
              create something different - a platform where professionals and
              couples can craft stunning digital cards that truly represent who
              they are.
            </motion.p>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="mt-4 text-muted-foreground leading-relaxed"
            >
              Whether you&apos;re a freelancer looking to make a memorable first
              impression, a business owner wanting to stand out, or a couple
              planning the wedding of your dreams - {APP_NAME} gives you the
              tools to create, share, and track beautiful digital cards with
              ease.
            </motion.p>
          </motion.div>
        </section>

        {/* Values */}
        <section className="bg-muted/30 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mb-14 text-center">
              <StaggeredTextReveal
                text="What we believe in"
                as="h2"
                splitBy="word"
                className="justify-center text-2xl font-bold md:text-4xl"
              />
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="group relative overflow-hidden rounded-2xl border bg-card p-8 shadow-sm transition-shadow hover:shadow-xl"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                  />
                  <div className="relative z-10">
                    <div
                      className={`mb-5 inline-flex rounded-xl bg-muted p-3 ${value.iconColor}`}
                    >
                      <value.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-3 text-lg font-semibold">
                      {value.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Company info */}
        <section className="px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ staggerChildren: 0.15 }}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold md:text-3xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Built with passion
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="mt-6 text-muted-foreground leading-relaxed"
            >
              {APP_NAME} is proudly built in India, supporting users across
              India and beyond. We leverage modern web technologies - Next.js,
              React, and Razorpay - to deliver a fast, secure, and delightful
              experience. Every interaction, animation, and pixel is crafted
              with care.
            </motion.p>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden px-6 py-20">
          <div
            className="animate-gradient-shift absolute inset-0 -z-10"
            style={{
              background: platform.brand.gradient,
              backgroundSize: "200% 200%",
              opacity: 0.9,
            }}
          />
          <div className="mx-auto max-w-2xl text-center">
            <StaggeredTextReveal
              text="Ready to create something beautiful?"
              as="h2"
              splitBy="word"
              className="justify-center text-3xl font-bold text-white md:text-4xl"
            />
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-6 text-white/80"
            >
              Join {APP_NAME} today and make a lasting impression.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8"
            >
              <MagneticButton strength={0.3}>
                <Link href="/signup">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="min-w-[200px] gap-2 text-base"
                  >
                    Get Started Free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
