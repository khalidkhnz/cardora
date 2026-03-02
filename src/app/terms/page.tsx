import type { Metadata } from "next";
import Link from "next/link";
import { platform, pageTitle } from "@/lib/platform";
import { Footer } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: pageTitle("Terms of Service"),
  description: `Terms of Service for ${platform.name}`,
};

export default function TermsPage() {
  const name = platform.name;
  const lastUpdated = "March 1, 2026";

  return (
    <>
      <main className="mx-auto max-w-3xl px-6 pt-24 pb-16">
        {/* Back to home */}
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          &larr; Back to {name}
        </Link>

        <h1
          className="text-4xl font-bold tracking-tight md:text-5xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated: {lastUpdated}
        </p>

        <div className="mt-12 space-y-10 text-sm leading-relaxed text-muted-foreground [&_h2]:mb-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_p+p]:mt-3">
          <section>
            <h2>1. Introduction</h2>
            <p>
              Welcome to {name}. These Terms of Service (&quot;Terms&quot;)
              govern your use of our website, products, and services. By
              accessing or using {name}, you agree to be bound by these Terms. If
              you do not agree to these Terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2>2. Acceptance of Terms</h2>
            <p>
              By creating an account or using any part of the {name} platform,
              you acknowledge that you have read, understood, and agree to be
              bound by these Terms and our Privacy Policy. You must be at least
              18 years old to use our services.
            </p>
          </section>

          <section>
            <h2>3. User Accounts</h2>
            <p>
              When you create an account with {name}, you are responsible for
              maintaining the confidentiality of your account credentials and for
              all activities that occur under your account. You agree to provide
              accurate, current, and complete information during registration and
              to update such information as necessary.
            </p>
            <p>
              You agree not to share your account credentials with third parties.
              {name} reserves the right to suspend or terminate accounts that
              violate these Terms.
            </p>
          </section>

          <section>
            <h2>4. Services and Products</h2>
            <p>
              {name} provides digital business card and wedding invitation
              creation services. Our products include customizable templates, QR
              code generation, NFC sharing capabilities, analytics tracking, and
              RSVP management features. We reserve the right to modify, suspend,
              or discontinue any part of our services at any time.
            </p>
          </section>

          <section>
            <h2>5. Payment Terms</h2>
            <p>
              Most features on {name} are completely free, including business
              cards and wedding invitations. Premium features such as animated
              invites require a one-time payment of ₹3,000. All payments are
              processed securely through Razorpay. Prices are displayed in INR
              and are inclusive of applicable taxes unless otherwise stated. All
              sales are final unless otherwise required by applicable law.
            </p>
            <p>
              By making a purchase, you authorize {name} and our payment
              processor to charge the payment method you provide.
            </p>
          </section>

          <section>
            <h2>6. Intellectual Property</h2>
            <p>
              All content, designs, templates, and code provided by {name} are
              the intellectual property of {name} and its licensors. You are
              granted a limited, non-exclusive, non-transferable license to use
              purchased templates for your personal or business use. You may not
              redistribute, resell, or modify our templates for commercial
              distribution.
            </p>
          </section>

          <section>
            <h2>7. User Content</h2>
            <p>
              You retain ownership of content you upload to {name}, including
              images, text, and personal information. By uploading content, you
              grant {name} a limited license to store, process, and display your
              content as necessary to provide our services.
            </p>
          </section>

          <section>
            <h2>8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, {name} and its
              affiliates shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages arising out of or
              related to your use of our services. Our total liability shall not
              exceed the amount you paid to {name} in the twelve months
              preceding the claim.
            </p>
          </section>

          <section>
            <h2>9. Changes to Terms</h2>
            <p>
              We reserve the right to update these Terms at any time. Changes
              will be effective immediately upon posting to our website. Your
              continued use of {name} after changes are posted constitutes
              acceptance of the updated Terms. We encourage you to review these
              Terms periodically.
            </p>
          </section>

          <section>
            <h2>10. Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please
              contact us through our website
              {platform.supportEmail && (
                <>
                  {" "}
                  or email us at{" "}
                  <a
                    href={`mailto:${platform.supportEmail}`}
                    className="text-foreground underline underline-offset-4"
                  >
                    {platform.supportEmail}
                  </a>
                </>
              )}
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
