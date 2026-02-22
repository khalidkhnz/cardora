import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { SubmitRsvpInput } from "@/lib/validators";

interface RsvpStats {
  total: number;
  attending: number;
  declined: number;
  maybe: number;
  totalGuests: number;
}

interface DashboardRsvpData {
  rsvps: {
    id: string;
    inviteSlug: string;
    guestName: string;
    guestEmail: string | null;
    phone: string | null;
    attending: string;
    numberOfGuests: number | null;
    dietaryRestrictions: string | null;
    message: string | null;
    status: string | null;
    createdAt: string;
  }[];
  stats: {
    total: number;
    attending: number;
    declined: number;
    maybe: number;
    totalGuests: number;
  };
  total: number;
  limit: number;
  offset: number;
}

export const rsvpKeys = {
  all: ["rsvp"] as const,
  dashboard: (opts?: { limit?: number; offset?: number }) =>
    [...rsvpKeys.all, "dashboard", opts ?? {}] as const,
  public: (slug: string) => [...rsvpKeys.all, "public", slug] as const,
};

export function useSubmitRSVP() {
  return useMutation({
    mutationFn: (data: SubmitRsvpInput) =>
      apiClient("/api/rsvp/submit", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  });
}

export function useDashboardRSVPs(opts?: {
  limit?: number;
  offset?: number;
}) {
  const params = new URLSearchParams();
  if (opts?.limit) params.set("limit", String(opts.limit));
  if (opts?.offset) params.set("offset", String(opts.offset));
  const qs = params.toString();

  return useQuery({
    queryKey: rsvpKeys.dashboard(opts),
    queryFn: () =>
      apiClient<DashboardRsvpData>(
        `/api/rsvp/dashboard${qs ? `?${qs}` : ""}`,
      ),
  });
}

export function usePublicRSVPStats(inviteSlug: string) {
  return useQuery({
    queryKey: rsvpKeys.public(inviteSlug),
    queryFn: () => apiClient<RsvpStats>(`/api/rsvp/${inviteSlug}`),
    enabled: !!inviteSlug,
  });
}

export function useUpdateRSVPStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      rsvpId: string;
      status: "pending" | "confirmed" | "declined";
    }) =>
      apiClient(`/api/rsvp/update/${data.rsvpId}`, {
        method: "PUT",
        body: JSON.stringify({ status: data.status }),
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: rsvpKeys.dashboard() });
    },
  });
}

export function useDeleteRSVP() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (rsvpId: string) =>
      apiClient(`/api/rsvp/delete/${rsvpId}`, { method: "DELETE" }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: rsvpKeys.dashboard() });
    },
  });
}
