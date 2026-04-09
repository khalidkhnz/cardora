import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import { apiClient } from "@/lib/api-client";
import { userKeys } from "./use-user";
import { weddingKeys } from "./use-wedding";

interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  razorpayOrderId: string | null;
  razorpayPaymentId: string | null;
  status: string;
  purpose: string;
  payerEmail: string | null;
  itemData: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
}

interface CreateOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
}

interface VerifyResponse {
  status: string;
  amount?: number;
  currency?: string;
}

interface PaginatedPayments {
  data: Payment[];
  total: number;
  limit: number;
  offset: number;
}

interface RazorpayPaymentData {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export const paymentKeys = {
  all: ["payment"] as const,
  history: (opts?: { limit?: number; offset?: number }) =>
    [...paymentKeys.all, "history", opts ?? {}] as const,
  received: (opts?: { limit?: number; offset?: number }) =>
    [...paymentKeys.all, "received", opts ?? {}] as const,
};

export function usePaymentHistory(opts?: { limit?: number; offset?: number }) {
  const params = new URLSearchParams();
  if (opts?.limit) params.set("limit", String(opts.limit));
  if (opts?.offset) params.set("offset", String(opts.offset));
  const qs = params.toString();

  return useQuery({
    queryKey: paymentKeys.history(opts),
    queryFn: () =>
      apiClient<PaginatedPayments>(
        `/api/payment/history${qs ? `?${qs}` : ""}`,
      ),
  });
}

export function useReceivedPayments(opts?: { limit?: number; offset?: number }) {
  const params = new URLSearchParams();
  if (opts?.limit) params.set("limit", String(opts.limit));
  if (opts?.offset) params.set("offset", String(opts.offset));
  const qs = params.toString();

  return useQuery({
    queryKey: paymentKeys.received(opts),
    queryFn: () =>
      apiClient<PaginatedPayments>(
        `/api/payment/received${qs ? `?${qs}` : ""}`,
      ),
  });
}

export function useCreateRazorpayOrder() {
  return useMutation({
    mutationFn: (data: {
      amount: number;
      currency: string;
      purpose: string;
      inviteId?: string;
      payerEmail?: string;
      itemData?: Record<string, unknown>;
    }) =>
      apiClient<CreateOrderResponse>("/api/payment/create-order", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  });
}

export function useVerifyPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RazorpayPaymentData) =>
      apiClient<VerifyResponse>("/api/payment/verify", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: paymentKeys.history() });
      void queryClient.invalidateQueries({ queryKey: userKeys.profile() });
      void queryClient.invalidateQueries({ queryKey: weddingKeys.all });
    },
  });
}

export function useVerifyAndUnlockPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RazorpayPaymentData & { type: "card" | "invite"; inviteId?: string }) =>
      apiClient<{ success: boolean; status: string }>(
        "/api/unlock/verify-payment",
        {
          method: "POST",
          body: JSON.stringify(data),
        },
      ),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: paymentKeys.history() });
      void queryClient.invalidateQueries({ queryKey: userKeys.profile() });
    },
  });
}

/**
 * Hook that dynamically loads the Razorpay checkout script and opens the payment modal.
 */
export function useRazorpayCheckout() {
  const scriptLoadedRef = useRef(false);

  const loadScript = useCallback((): Promise<void> => {
    if (scriptLoadedRef.current) return Promise.resolve();
    if (typeof document === "undefined") return Promise.reject(new Error("No document"));

    const existing = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
    );
    if (existing) {
      scriptLoadedRef.current = true;
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        scriptLoadedRef.current = true;
        resolve();
      };
      script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
      document.body.appendChild(script);
    });
  }, []);

  const openCheckout = useCallback(
    async (options: {
      orderId: string;
      amount: number;
      currency: string;
      keyId: string;
      name?: string;
      description?: string;
      prefillEmail?: string;
      prefillName?: string;
      onSuccess: (data: RazorpayPaymentData) => void;
      onDismiss?: () => void;
    }) => {
      await loadScript();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      const Razorpay = (window as any).Razorpay as new (opts: Record<string, unknown>) => {
        open: () => void;
      };

      if (!Razorpay) {
        throw new Error("Razorpay SDK not loaded");
      }

      const rzp = new Razorpay({
        key: options.keyId,
        amount: options.amount,
        currency: options.currency,
        order_id: options.orderId,
        name: options.name ?? "Cardora",
        description: options.description ?? "Payment",
        prefill: {
          email: options.prefillEmail ?? "",
          name: options.prefillName ?? "",
        },
        handler: (response: RazorpayPaymentData) => {
          options.onSuccess(response);
        },
        modal: {
          ondismiss: () => {
            options.onDismiss?.();
          },
        },
      });

      rzp.open();
    },
    [loadScript],
  );

  return { openCheckout };
}
