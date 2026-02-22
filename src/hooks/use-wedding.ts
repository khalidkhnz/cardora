import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { CreateWeddingInviteInput } from "@/lib/validators";

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
  current: () => [...weddingKeys.all, "current"] as const,
  bySlug: (slug: string) => [...weddingKeys.all, "slug", slug] as const,
};

export function useWeddingInvite(slug: string) {
  return useQuery({
    queryKey: weddingKeys.bySlug(slug),
    queryFn: () => apiClient<WeddingInvite>(`/api/wedding/${slug}`),
    enabled: !!slug,
  });
}

export function useCurrentInvite() {
  return useQuery({
    queryKey: weddingKeys.current(),
    queryFn: () => apiClient<WeddingInvite | null>("/api/wedding/current"),
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
    onSuccess: (data) => {
      queryClient.setQueryData(weddingKeys.current(), data);
    },
  });
}
