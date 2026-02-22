"use client";

import { Trash2, Minus, Plus } from "lucide-react";
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
import { useCart, type CartItem } from "@/providers/cart-provider";
import { formatCurrency } from "@/lib/pricing";

function CartItemRow({ item }: { item: CartItem }) {
  const { removeFromCart, updateQuantity } = useCart();

  const typeLabels: Record<string, string> = {
    business_card: "Business Card",
    wedding_card: "Wedding Card",
    animated_invite: "Animated Invite",
  };

  return (
    <div className="flex items-center gap-4 rounded-lg border p-4">
      <div className="flex-1 min-w-0">
        <h3 className="font-medium truncate">{item.name}</h3>
        <p className="text-sm text-muted-foreground">
          {typeLabels[item.type] ?? item.type}
          {item.size ? ` - ${item.size}` : ""}
          {item.orientation ? ` - ${item.orientation}` : ""}
        </p>
        <p className="text-sm text-muted-foreground">
          {formatCurrency(item.unitPrice, item.currency)} each
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-8 text-center text-sm font-medium">
          {item.quantity}
        </span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      <div className="text-right min-w-[80px]">
        <p className="font-medium">
          {formatCurrency(item.unitPrice * item.quantity, item.currency)}
        </p>
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove item</AlertDialogTitle>
            <AlertDialogDescription>
              Remove <strong>{item.name}</strong> from your cart?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => removeFromCart(item.id)}>
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export function CartItemList() {
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <p className="text-muted-foreground">Your cart is empty</p>
        <p className="text-sm text-muted-foreground mt-1">
          Add items from the Card editor to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <CartItemRow key={item.id} item={item} />
      ))}
    </div>
  );
}
