import { getSession } from "@/server/better-auth/server";
import { getUserProfile } from "@/server/db/queries/user";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Dashboard — Cardora",
};

export default async function DashboardPage() {
  const session = await getSession();
  const profile = session?.user
    ? await getUserProfile(session.user.id)
    : null;

  const hasProfile = !!profile?.username;
  const cardPaid = profile?.cardPaid ?? false;
  const invitePaid = profile?.invitePaid ?? false;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back, {session?.user?.name?.split(" ")[0] ?? "there"}
        </h1>
        <p className="text-muted-foreground">
          Manage your digital cards and wedding invitations
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Profile</CardDescription>
            <CardTitle className="text-lg">
              {hasProfile ? (
                <Badge variant="default">Active</Badge>
              ) : (
                <Badge variant="secondary">Not set up</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/profile">
              <Button variant="outline" size="sm" className="w-full">
                {hasProfile ? "Edit Profile" : "Set Up Profile"}
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Business Card</CardDescription>
            <CardTitle className="text-lg">
              {cardPaid ? (
                <Badge variant="default">Unlocked</Badge>
              ) : (
                <Badge variant="secondary">Free</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/card">
              <Button variant="outline" size="sm" className="w-full">
                Edit Card
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Wedding Invite</CardDescription>
            <CardTitle className="text-lg">
              {invitePaid ? (
                <Badge variant="default">Unlocked</Badge>
              ) : (
                <Badge variant="secondary">Free</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/animated-invite">
              <Button variant="outline" size="sm" className="w-full">
                Create Invite
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Analytics</CardDescription>
            <CardTitle className="text-lg">View Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/analytics">
              <Button variant="outline" size="sm" className="w-full">
                View Analytics
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Getting started */}
      {!hasProfile && (
        <Card>
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
            <CardDescription>
              Complete these steps to set up your Cardora profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/dashboard/profile"
                  className="text-primary hover:underline"
                >
                  Set up your profile
                </Link>{" "}
                — Add your name, profession, and social links
              </li>
              <li>
                <Link
                  href="/dashboard/card"
                  className="text-primary hover:underline"
                >
                  Customize your card
                </Link>{" "}
                — Choose a template and personalize your design
              </li>
              <li>
                Share your card — Send your unique link, QR code, or use NFC
              </li>
            </ol>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
