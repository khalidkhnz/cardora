import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { SubmitRsvpInput } from "@/lib/validators";

interface RsvpStats {
  total: number;
  attending: number;
  totalGuests: number;
  guests: { name: string; attending: string; guests: number | null }[];
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
}

export const rsvpKeys = {
  all: ["rsvp"] as const,
  dashboard: () => [...rsvpKeys.all, "dashboard"] as const,
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

export function useDashboardRSVPs() {
  return useQuery({
    queryKey: rsvpKeys.dashboard(),
    queryFn: () => apiClient<DashboardRsvpData>("/api/rsvp/dashboard"),
  });
}

export function usePublicRSVPStats(inviteSlug: string) {
  return useQuery({
    queryKey: rsvpKeys.public(inviteSlug),
    queryFn: () => apiClient<RsvpStats>(`/api/rsvp/${inviteSlug}`),
    enabled: !!inviteSlug,
  });
}

export function useDeleteRSVP() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (rsvpId: string) =>
      apiClient(`/api/rsvp/${rsvpId}/delete`, { method: "DELETE" }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: rsvpKeys.dashboard() });
    },
  });
}
