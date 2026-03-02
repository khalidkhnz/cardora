import type { Metadata } from "next";
import Link from "next/link";
import { platform, pageTitle } from "@/lib/platform";
import { Footer } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: pageTitle("Privacy Policy"),
  description: `Privacy Policy for ${platform.name}`,
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated: {lastUpdated}
        </p>

        <div className="mt-12 space-y-10 text-sm leading-relaxed text-muted-foreground [&_h2]:mb-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_p+p]:mt-3">
          <section>
            <h2>1. Introduction</h2>
            <p>
              At {name}, we take your privacy seriously. This Privacy Policy
              describes how we collect, use, and protect your personal
              information when you use our digital business card and wedding
              invitation platform. By using {name}, you consent to the
              practices described in this policy.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when
              creating an account and using our services:
            </p>
            <ul className="mt-3 list-inside list-disc space-y-2 pl-4">
              <li>
                <strong className="text-foreground">Account Information:</strong>{" "}
                Name, email address, and password when you create an account.
              </li>
              <li>
                <strong className="text-foreground">Profile Information:</strong>{" "}
                Username, profession, company, phone number, address, and social
                media links you choose to add.
              </li>
              <li>
                <strong className="text-foreground">Payment Information:</strong>{" "}
                Payment details processed securely through Stripe. We do not
                store your full credit card information.
              </li>
              <li>
                <strong className="text-foreground">Uploaded Content:</strong>{" "}
                Images, audio files, and other media you upload for your cards
                and invitations.
              </li>
              <li>
                <strong className="text-foreground">Usage Data:</strong>{" "}
                Analytics data including page views, device type, browser
                information, and referral sources.
              </li>
            </ul>
          </section>

          <section>
            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="mt-3 list-inside list-disc space-y-2 pl-4">
              <li>Provide, maintain, and improve our services</li>
              <li>
                Process payments and send transaction-related communications
              </li>
              <li>
                Generate your digital business cards and wedding invitations
              </li>
              <li>
                Provide analytics on your card views and visitor interactions
              </li>
              <li>Send password reset emails and security notifications</li>
              <li>Respond to your requests and provide customer support</li>
            </ul>
          </section>

          <section>
            <h2>4. Payment Processing</h2>
            <p>
              All payment transactions are processed by Stripe, our third-party
              payment processor. Stripe collects and processes your payment
              information in accordance with their own privacy policy. {name}{" "}
              only receives confirmation of payment status and does not have
              access to your full payment card details.
            </p>
          </section>

          <section>
            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. Passwords are hashed using
              industry-standard algorithms, and sessions are managed securely.
              However, no method of transmission over the Internet is 100%
              secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2>6. Data Sharing</h2>
            <p>
              We do not sell your personal information to third parties. We may
              share your information only in the following circumstances:
            </p>
            <ul className="mt-3 list-inside list-disc space-y-2 pl-4">
              <li>
                <strong className="text-foreground">Public Profiles:</strong>{" "}
                Information on your business card or wedding invitation is
                publicly accessible via your unique link.
              </li>
              <li>
                <strong className="text-foreground">Payment Processing:</strong>{" "}
                Payment data is shared with Stripe to process transactions.
              </li>
              <li>
                <strong className="text-foreground">Legal Requirements:</strong>{" "}
                When required by law, regulation, or legal process.
              </li>
            </ul>
          </section>

          <section>
            <h2>7. Cookies and Tracking</h2>
            <p>
              {name} uses essential cookies for authentication and session
              management. We also use localStorage for theme preferences and
              shopping cart persistence. We do not use third-party advertising
              cookies.
            </p>
          </section>

          <section>
            <h2>8. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal
              information. You can update your profile information through your
              dashboard at any time. To request deletion of your account and
              associated data, please contact us.
            </p>
          </section>

          <section>
            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will
              be effective immediately upon posting to our website. Your
              continued use of {name} after changes constitutes acceptance of
              the updated policy.
            </p>
          </section>

          <section>
            <h2>10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data
              practices, please contact us through our website
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
