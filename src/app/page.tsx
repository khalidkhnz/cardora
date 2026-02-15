import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/server/better-auth/server";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";

export default async function Home() {
  const session = await getSession();
  if (session) redirect("/dashboard");

  return (
    <main className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b px-6 py-4">
        <span className="text-xl font-bold">{APP_NAME}</span>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost">Sign in</Button>
          </Link>
          <Link href="/signup">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Your Digital Identity,{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Beautifully Crafted
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Create stunning digital business cards and beautiful wedding
            invitations. Share via QR code, NFC, or a simple link.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/signup">
              <Button size="lg" className="min-w-[200px]">
                Create Your Card
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="min-w-[200px]">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-muted/40 px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Everything you need
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Business Cards",
                description:
                  "Choose from 10+ professionally designed templates. Customize colors, fonts, and layout.",
              },
              {
                title: "Wedding Invitations",
                description:
                  "30+ static and 17 animated templates with RSVP tracking, guest management, and more.",
              },
              {
                title: "Analytics & Sharing",
                description:
                  "Track profile views, QR scans, and NFC taps. Share your card with a unique link.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg border bg-card p-6 shadow-sm"
              >
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
      </footer>
    </main>
  );
}
