"use client";

import { ShoppingCart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/providers/cart-provider";
import { useCreateCartSession } from "@/hooks/use-payment";
import { formatCurrency } from "@/lib/pricing";

export function OrderSummary() {
  const { items, getTotal, getCount, clearCart } = useCart();
  const createSession = useCreateCartSession();

  const total = getTotal();
  const count = getCount();
  const currency = items[0]?.currency ?? "CAD";

  function handleCheckout() {
    if (items.length === 0) return;

    createSession.mutate({
      items: items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
      currency,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {item.name} x{item.quantity}
            </span>
            <span>
              {formatCurrency(item.unitPrice * item.quantity, item.currency)}
            </span>
          </div>
        ))}
        {items.length > 0 && (
          <>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Total ({count} items)</span>
              <span>{formatCurrency(total, currency)}</span>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          className="w-full"
          size="lg"
          onClick={handleCheckout}
          disabled={items.length === 0 || createSession.isPending}
        >
          {createSession.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Redirecting to Stripe...
            </>
          ) : (
            `Pay ${formatCurrency(total, currency)}`
          )}
        </Button>
        {items.length > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
              >
                Clear Cart
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear cart</AlertDialogTitle>
                <AlertDialogDescription>
                  Remove all {count} item{count !== 1 ? "s" : ""} from your
                  cart? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={clearCart}>
                  Clear All
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </CardFooter>
    </Card>
  );
}
