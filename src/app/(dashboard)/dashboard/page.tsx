import { getSession } from "@/server/better-auth/server";
import { getUserProfile } from "@/server/db/queries/user";
import { getUserCards } from "@/server/db/queries/card";
import { getUserInvites } from "@/server/db/queries/wedding";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShareSection } from "@/components/dashboard/share-section";
import { platform, pageTitle } from "@/lib/platform";
import {
  UserCircle,
  CreditCard,
  Sparkles,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Clock,
} from "lucide-react";

export const metadata = {
  title: pageTitle("Dashboard"),
};

export default async function DashboardPage() {
  const session = await getSession();
  const profile = session?.user
    ? await getUserProfile(session.user.id)
    : null;

  const hasProfile = !!profile?.username;

  const [cards, invites] = await Promise.all([
    session?.user ? getUserCards(session.user.id) : [],
    session?.user ? getUserInvites(session.user.id) : [],
  ]);

  const cardCount = cards.length;
  const activeInvites = invites.filter((i) => i.isPaid).length;

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Welcome */}
      <div>
        <h1
          className="text-3xl font-bold text-[#1A1A1A] dark:text-[#F0E8D8]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Welcome back, {session?.user?.name?.split(" ")[0] ?? "there"}
        </h1>
        <p className="mt-1 text-[#6B6560] dark:text-[#A09888]">
          Manage your digital cards and wedding invitations
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/dashboard/profile" className="group">
          <Card className="h-full border-[#E8E4DE] bg-white transition-all hover:shadow-md dark:border-white/10 dark:bg-[#141414]">
            <CardContent className="flex items-start gap-4 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3F0EB] dark:bg-white/5">
                <UserCircle className="h-5 w-5 text-[#8B7355]" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wider text-[#8B8580] dark:text-[#706860]">Profile</p>
                <div className="mt-1 flex items-center gap-1.5">
                  {hasProfile ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-700 dark:text-emerald-500">Active</span>
                    </>
                  ) : (
                    <>
                      <Clock className="h-3.5 w-3.5 text-[#8B8580]" />
                      <span className="text-sm font-medium text-[#6B6560]">Not set up</span>
                    </>
                  )}
                </div>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-[#C8C4BE] transition-transform group-hover:translate-x-0.5 dark:text-[#504840]" />
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/card" className="group">
          <Card className="h-full border-[#E8E4DE] bg-white transition-all hover:shadow-md dark:border-white/10 dark:bg-[#141414]">
            <CardContent className="flex items-start gap-4 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3F0EB] dark:bg-white/5">
                <CreditCard className="h-5 w-5 text-[#8B7355]" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wider text-[#8B8580] dark:text-[#706860]">Cards</p>
                <p className="mt-1 text-xl font-semibold text-[#1A1A1A] dark:text-[#F0E8D8]">
                  {cardCount}
                </p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-[#C8C4BE] transition-transform group-hover:translate-x-0.5 dark:text-[#504840]" />
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/animated-invite" className="group">
          <Card className="h-full border-[#E8E4DE] bg-white transition-all hover:shadow-md dark:border-white/10 dark:bg-[#141414]">
            <CardContent className="flex items-start gap-4 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3F0EB] dark:bg-white/5">
                <Sparkles className="h-5 w-5 text-[#8B7355]" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wider text-[#8B8580] dark:text-[#706860]">Invites</p>
                <p className="mt-1 text-xl font-semibold text-[#1A1A1A] dark:text-[#F0E8D8]">
                  {activeInvites}<span className="text-sm font-normal text-[#8B8580]"> / {invites.length}</span>
                </p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-[#C8C4BE] transition-transform group-hover:translate-x-0.5 dark:text-[#504840]" />
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/analytics" className="group">
          <Card className="h-full border-[#E8E4DE] bg-white transition-all hover:shadow-md dark:border-white/10 dark:bg-[#141414]">
            <CardContent className="flex items-start gap-4 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3F0EB] dark:bg-white/5">
                <BarChart3 className="h-5 w-5 text-[#8B7355]" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wider text-[#8B8580] dark:text-[#706860]">Analytics</p>
                <p className="mt-1 text-sm font-medium text-[#1A1A1A] dark:text-[#F0E8D8]">View Stats</p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-[#C8C4BE] transition-transform group-hover:translate-x-0.5 dark:text-[#504840]" />
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Share section */}
      {hasProfile && (
        <Card className="border-[#E8E4DE] bg-white dark:border-white/10 dark:bg-[#141414]">
          <CardHeader className="pb-2">
            <h2 className="text-lg font-semibold text-[#1A1A1A] dark:text-[#F0E8D8]" style={{ fontFamily: "var(--font-playfair)" }}>
              Share Your Card
            </h2>
            <p className="text-sm text-[#6B6560] dark:text-[#A09888]">
              Share your digital card via QR code, NFC, or link
            </p>
          </CardHeader>
          <CardContent>
            <ShareSection username={profile?.username ?? ""} />
          </CardContent>
        </Card>
      )}

      {/* Getting started */}
      {!hasProfile && (
        <Card className="border-[#E8E4DE] bg-white dark:border-white/10 dark:bg-[#141414]">
          <CardHeader className="pb-2">
            <h2 className="text-lg font-semibold text-[#1A1A1A] dark:text-[#F0E8D8]" style={{ fontFamily: "var(--font-playfair)" }}>
              Get Started
            </h2>
            <p className="text-sm text-[#6B6560] dark:text-[#A09888]">
              Complete these steps to set up your {platform.name} profile
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-lg border border-[#E8E4DE] p-4 dark:border-white/10">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E8E4DE] text-sm font-medium text-[#8B7355] dark:border-white/10">1</div>
                <div>
                  <Link href="/dashboard/profile" className="text-sm font-medium text-[#1A1A1A] hover:underline dark:text-[#F0E8D8]">
                    Set up your profile
                  </Link>
                  <p className="mt-0.5 text-xs text-[#6B6560] dark:text-[#A09888]">Add your name, profession, and social links</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-lg border border-[#E8E4DE] p-4 dark:border-white/10">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E8E4DE] text-sm font-medium text-[#8B7355] dark:border-white/10">2</div>
                <div>
                  <Link href="/dashboard/card" className="text-sm font-medium text-[#1A1A1A] hover:underline dark:text-[#F0E8D8]">
                    Create your cards
                  </Link>
                  <p className="mt-0.5 text-xs text-[#6B6560] dark:text-[#A09888]">Choose templates and personalize your designs</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-lg border border-[#E8E4DE] p-4 dark:border-white/10">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E8E4DE] text-sm font-medium text-[#8B7355] dark:border-white/10">3</div>
                <div>
                  <p className="text-sm font-medium text-[#1A1A1A] dark:text-[#F0E8D8]">Share your card</p>
                  <p className="mt-0.5 text-xs text-[#6B6560] dark:text-[#A09888]">Send your unique link, QR code, or use NFC</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
