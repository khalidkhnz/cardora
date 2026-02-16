"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useVerifyPayment } from "@/hooks/use-payment";
import { formatCurrency } from "@/lib/pricing";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const verify = useVerifyPayment();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (sessionId && !verified && !verify.isPending) {
      verify.mutate(sessionId, {
        onSuccess: () => setVerified(true),
      });
    }
  }, [sessionId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!sessionId) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <XCircle className="mx-auto h-12 w-12 text-destructive" />
            <CardTitle>Invalid Session</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              No payment session found. This link may be invalid.
            </p>
          </CardContent>
          <CardFooter className="justify-center">
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (verify.isPending || !verified) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
            <CardTitle>Verifying Payment...</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Please wait while we confirm your payment.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (verify.isError) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <XCircle className="mx-auto h-12 w-12 text-destructive" />
            <CardTitle>Verification Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We couldn&apos;t verify your payment. Please contact support if
              you were charged.
            </p>
          </CardContent>
          <CardFooter className="justify-center">
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const data = verify.data;

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
          <CardTitle>Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-muted-foreground">
            Your payment has been confirmed and your content has been unlocked.
          </p>
          {data?.amount && data.currency && (
            <p className="text-lg font-semibold">
              {formatCurrency(data.amount, data.currency)}
            </p>
          )}
        </CardContent>
        <CardFooter className="justify-center gap-3">
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/payments">View Payments</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
