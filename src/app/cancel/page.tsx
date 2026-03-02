"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CancelPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <XCircle className="mx-auto h-12 w-12 text-amber-500" />
          <CardTitle>Payment Cancelled</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Your payment was cancelled. No charges have been made. You can try
            again whenever you&apos;re ready.
          </p>
        </CardContent>
        <CardFooter className="justify-center gap-3">
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/animated-invite">View Invites</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
