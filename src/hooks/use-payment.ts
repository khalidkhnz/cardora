import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { userKeys } from "./use-user";
import { weddingKeys } from "./use-wedding";

interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  stripeSessionId: string | null;
  status: string;
  purpose: string;
  payerEmail: string | null;
  itemData: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
}

interface CreateSessionResponse {
  url: string;
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

export function useCreateStripeSession() {
  return useMutation({
    mutationFn: (data: {
      amount: number;
      currency: string;
      purpose: string;
      inviteId?: string;
      payerEmail?: string;
    }) =>
      apiClient<CreateSessionResponse>("/api/payment/create-stripe-session", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
  });
}

export function useCreateCartSession() {
  return useMutation({
    mutationFn: (data: {
      items: { name: string; quantity: number; unitPrice: number }[];
      currency: string;
    }) =>
      apiClient<CreateSessionResponse>("/api/payment/create-cart-session", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
  });
}

export function useVerifyPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (sessionId: string) =>
      apiClient<VerifyResponse>("/api/payment/verify", {
        method: "POST",
        body: JSON.stringify({ sessionId }),
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
    mutationFn: (data: { sessionId: string; type: "card" | "invite" }) =>
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
