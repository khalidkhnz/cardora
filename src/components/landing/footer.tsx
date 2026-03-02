"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { platform } from "@/lib/platform";

const footerLinks = {
  product: [
    { label: "Business Cards", href: "/signup" },
    { label: "Wedding Invitations", href: "/signup" },
    { label: "Animated Invites", href: "/signup" },
    { label: "Pricing", href: "/#pricing" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Footer() {
  return (
    <footer className="relative border-t bg-muted/30">
      {/* Curved top edge */}
      <div className="absolute -top-px left-0 right-0 overflow-hidden">
        <svg
          viewBox="0 0 1440 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 40V20C240 0 480 0 720 20C960 40 1200 40 1440 20V40H0Z"
            className="fill-muted/30"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-6xl px-6 pt-16 pb-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.1 }}
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* Brand */}
          <motion.div variants={fadeIn} transition={{ duration: 0.5 }}>
            <h3
              className="text-2xl font-bold"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {APP_NAME}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {platform.tagline}. Create stunning digital cards and share them
              instantly with the world.
            </p>
          </motion.div>

          {/* Product */}
          <motion.div variants={fadeIn} transition={{ duration: 0.5 }}>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Product
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={fadeIn} transition={{ duration: 0.5 }}>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div variants={fadeIn} transition={{ duration: 0.5 }}>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Connect
            </h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Have questions? We&apos;d love to hear from you. Reach out and
              let&apos;s create something beautiful together.
            </p>
            {platform.supportEmail && (
              <a
                href={`mailto:${platform.supportEmail}`}
                className="mt-3 inline-block text-sm text-foreground underline underline-offset-4"
              >
                {platform.supportEmail}
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm text-muted-foreground sm:flex-row"
        >
          <p>
            &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Made with <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" /> by the {APP_NAME} team
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
