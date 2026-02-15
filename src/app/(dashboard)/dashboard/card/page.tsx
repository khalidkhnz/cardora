import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "Card Editor — Cardora",
};

export default function CardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Card Editor</h1>
        <p className="text-muted-foreground">
          Design and customize your digital business card
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            The card editor with template selection and live preview is being built.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            You&apos;ll be able to choose from 10+ business card templates and 30+
            wedding invitation templates.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
