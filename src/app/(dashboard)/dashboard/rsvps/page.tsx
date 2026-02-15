import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "RSVPs — Cardora",
};

export default function RsvpsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">RSVPs</h1>
        <p className="text-muted-foreground">
          Manage guest responses for your wedding invitations
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            RSVP management with guest tracking and dietary restrictions is being
            built.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            You&apos;ll be able to view, filter, and export guest responses.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
