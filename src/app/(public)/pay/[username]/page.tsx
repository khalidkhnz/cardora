"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import confetti from "canvas-confetti";
import { Loader2, DollarSign, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiClient } from "@/lib/api-client";
import { formatCurrency } from "@/lib/pricing";
import { useRazorpayCheckout } from "@/hooks/use-payment";
import { toast } from "sonner";

interface PublicProfile {
  username: string;
  name: string;
  profession: string | null;
  profileImage: string | null;
  paymentEnabled: boolean;
  paymentType: "fixed" | "flexible" | null;
  fixedAmount: number | null;
  currency: string | null;
  interacEmail: string | null;
}

interface CreateOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
}

function fireConfetti() {
  const duration = 2000;
  const end = Date.now() + duration;
  const frame = () => {
    void confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0, y: 0.6 } });
    void confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1, y: 0.6 } });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}

export default function PayPage() {
  const params = useParams<{ username: string }>();
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [payerEmail, setPayerEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [paid, setPaid] = useState(false);
  const { openCheckout } = useRazorpayCheckout();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await apiClient<PublicProfile>(
          `/api/card/${params.username}`,
        );
        if (!data.paymentEnabled) {
          setError("This user does not accept payments.");
        } else {
          setProfile(data);
          if (data.paymentType === "fixed" && data.fixedAmount) {
            setAmount(String(data.fixedAmount / 100));
          }
        }
      } catch {
        setError("User not found.");
      } finally {
        setLoading(false);
      }
    }
    void fetchProfile();
  }, [params.username]);

  const handlePay = useCallback(async () => {
    if (!profile) return;
    const amountInCents = Math.round(parseFloat(amount) * 100);
    if (isNaN(amountInCents) || amountInCents <= 0) return;

    setSubmitting(true);
    try {
      const orderData = await apiClient<CreateOrderResponse>(
        "/api/payment/create-public-order",
        {
          method: "POST",
          body: JSON.stringify({
            username: params.username,
            amount: amountInCents,
            currency: profile.currency ?? "CAD",
            payerEmail: payerEmail || undefined,
          }),
        },
      );

      await openCheckout({
        orderId: orderData.orderId,
        amount: orderData.amount,
        currency: orderData.currency,
        keyId: orderData.keyId,
        name: `Pay ${profile.name}`,
        description: "Payment",
        prefillEmail: payerEmail || undefined,
        onSuccess: (paymentData) => {
          void (async () => {
            try {
              await apiClient("/api/payment/verify-public", {
                method: "POST",
                body: JSON.stringify(paymentData),
              });
              setPaid(true);
              fireConfetti();
              toast.success("Payment successful!");
            } catch {
              toast.error("Payment verification failed. Please contact support.");
            }
            setSubmitting(false);
          })();
        },
        onDismiss: () => {
          setSubmitting(false);
        },
      });
    } catch {
      setError("Failed to create payment order.");
      setSubmitting(false);
    }
  }, [profile, amount, payerEmail, params.username, openCheckout]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error ?? !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>{error ?? "User not found"}</CardTitle>
          </CardHeader>
          <CardFooter className="justify-center">
            <Button variant="outline" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (paid) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Payment Successful!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Your payment to {profile.name} has been confirmed.
            </p>
            {amount && (
              <p className="mt-2 text-lg font-semibold">
                {formatCurrency(Math.round(parseFloat(amount) * 100), profile.currency ?? "CAD")}
              </p>
            )}
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="outline" asChild>
              <Link href="/">Go Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const currency = profile.currency ?? "CAD";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            {profile.profileImage ? (
              <Image
                src={profile.profileImage}
                alt={profile.name}
                width={64}
                height={64}
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <User className="h-8 w-8 text-primary" />
            )}
          </div>
          <CardTitle>Pay {profile.name}</CardTitle>
          {profile.profession && (
            <p className="text-sm text-muted-foreground">
              {profile.profession}
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount ({currency})</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="amount"
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-9"
                disabled={profile.paymentType === "fixed"}
              />
            </div>
            {profile.paymentType === "fixed" && profile.fixedAmount && (
              <p className="text-xs text-muted-foreground">
                Fixed amount: {formatCurrency(profile.fixedAmount, currency)}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Your Email (optional)</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={payerEmail}
              onChange={(e) => setPayerEmail(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              For receiving a payment receipt
            </p>
          </div>

          {profile.interacEmail && (
            <div className="rounded-lg bg-muted p-3">
              <p className="text-sm font-medium">Interac e-Transfer</p>
              <p className="text-sm text-muted-foreground">
                Send to: {profile.interacEmail}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            size="lg"
            onClick={() => void handlePay()}
            disabled={
              submitting ||
              !amount ||
              parseFloat(amount) <= 0
            }
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <DollarSign className="mr-2 h-4 w-4" />
                Pay{" "}
                {amount && parseFloat(amount) > 0
                  ? formatCurrency(Math.round(parseFloat(amount) * 100), currency)
                  : ""}
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
