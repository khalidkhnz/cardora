import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { CreateWeddingInviteInput, UpdateWeddingInviteInput } from "@/lib/validators";

interface WeddingEvent {
  name: string;
  date: string;
  venue: string;
  time: string;
}

interface WeddingInvite {
  id: string;
  userId: string;
  slug: string;
  templateId: string;
  groomName: string | null;
  brideName: string | null;
  weddingDate: string | null;
  receptionDate: string | null;
  venue: string | null;
  venueAddress: string | null;
  story: string | null;
  heroImage: string | null;
  galleryImages: string[];
  musicUrl: string | null;
  couplePhoto: string | null;
  backgroundImage: string | null;
  weddingTime: string | null;
  groomFatherName: string | null;
  groomMotherName: string | null;
  brideFatherName: string | null;
  brideMotherName: string | null;
  coupleMessage: string | null;
  events: WeddingEvent[] | null;
  extraData: Record<string, unknown> | null;
  isPaid: boolean;
  isDemo?: boolean;
  createdAt: string;
  updatedAt: string;
}

export const weddingKeys = {
  all: ["wedding"] as const,
  list: () => [...weddingKeys.all, "list"] as const,
  current: () => [...weddingKeys.all, "current"] as const,
  bySlug: (slug: string) => [...weddingKeys.all, "slug", slug] as const,
  detail: (inviteId: string) => [...weddingKeys.all, "detail", inviteId] as const,
};

// ---------------------------------------------------------------------------
// Multi-invite hooks
// ---------------------------------------------------------------------------

export function useUserInvites() {
  return useQuery({
    queryKey: weddingKeys.list(),
    queryFn: () => apiClient<WeddingInvite[]>("/api/wedding/list"),
  });
}

export function useInvite(inviteId: string) {
  return useQuery({
    queryKey: weddingKeys.detail(inviteId),
    queryFn: () => apiClient<WeddingInvite>(`/api/wedding/invite/${inviteId}`),
    enabled: !!inviteId,
  });
}

export function useCreateInvite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateWeddingInviteInput) =>
      apiClient<WeddingInvite>("/api/wedding/create", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: weddingKeys.list() });
      void queryClient.invalidateQueries({ queryKey: weddingKeys.current() });
    },
  });
}

export function useUpdateInvite(inviteId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateWeddingInviteInput) =>
      apiClient<WeddingInvite>(`/api/wedding/invite/${inviteId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: (data) => {
      queryClient.setQueryData(weddingKeys.detail(inviteId), data);
      void queryClient.invalidateQueries({ queryKey: weddingKeys.list() });
    },
  });
}

export function useDeleteInvite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (inviteId: string) =>
      apiClient(`/api/wedding/invite/${inviteId}`, { method: "DELETE" }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: weddingKeys.list() });
      void queryClient.invalidateQueries({ queryKey: weddingKeys.current() });
    },
  });
}

// ---------------------------------------------------------------------------
// Public / slug-based hooks
// ---------------------------------------------------------------------------

export function useWeddingInvite(slug: string) {
  return useQuery({
    queryKey: weddingKeys.bySlug(slug),
    queryFn: () => apiClient<WeddingInvite>(`/api/wedding/${slug}`),
    enabled: !!slug,
  });
}

// ---------------------------------------------------------------------------
// Backward-compat hooks
// ---------------------------------------------------------------------------

export function useCurrentInvite() {
  return useQuery({
    queryKey: weddingKeys.current(),
    queryFn: () => apiClient<WeddingInvite | null>("/api/wedding/current"),
  });
}
