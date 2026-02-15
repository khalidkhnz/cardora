import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "Animated Invite — Cardora",
};

export default function AnimatedInvitePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Animated Invite</h1>
        <p className="text-muted-foreground">
          Create beautiful animated wedding invitations
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            The animated invite editor with cinematic templates is being built.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            You&apos;ll be able to choose from 17+ animated templates with custom
            music, galleries, and RSVP integration.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
