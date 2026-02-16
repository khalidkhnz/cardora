"use client";

import { CreditCard, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type PaymentMethod = "stripe" | "interac";

interface PaymentMethodSelectorProps {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
  country: string;
  interacEmail?: string | null;
}

export function PaymentMethodSelector({
  value,
  onChange,
  country,
  interacEmail,
}: PaymentMethodSelectorProps) {
  const showInterac = country === "CA" && !!interacEmail;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">Payment Method</h3>
      <div className="grid gap-3">
        <button
          type="button"
          onClick={() => onChange("stripe")}
          className={cn(
            "flex items-center gap-3 rounded-lg border p-4 text-left transition-colors",
            value === "stripe"
              ? "border-primary bg-primary/5"
              : "border-border hover:bg-muted",
          )}
        >
          <CreditCard className="h-5 w-5 shrink-0" />
          <div>
            <p className="text-sm font-medium">Credit / Debit Card</p>
            <p className="text-xs text-muted-foreground">
              Secure payment via Stripe
            </p>
          </div>
        </button>

        {showInterac && (
          <button
            type="button"
            onClick={() => onChange("interac")}
            className={cn(
              "flex items-center gap-3 rounded-lg border p-4 text-left transition-colors",
              value === "interac"
                ? "border-primary bg-primary/5"
                : "border-border hover:bg-muted",
            )}
          >
            <Building2 className="h-5 w-5 shrink-0" />
            <div>
              <p className="text-sm font-medium">Interac e-Transfer</p>
              <p className="text-xs text-muted-foreground">
                Send to: {interacEmail}
              </p>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
