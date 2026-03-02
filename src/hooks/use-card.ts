import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { UpdateCardSettingsInput, CreateCardInput } from "@/lib/validators";

interface CardSettings {
  id: string;
  userId: string;
  slug: string;
  name: string | null;
  isDefault: boolean;
  cardType: "business" | "wedding" | "engagement" | "anniversary" | null;
  collection: string | null;
  selectedTemplateId: string | null;
  orientation: "horizontal" | "vertical" | null;
  cardSize: "standard" | "large" | null;
  weddingDate: string | null;
  venue: string | null;
  brideName: string | null;
  groomName: string | null;
  brideParentNames: string | null;
  groomParentNames: string | null;
  deceasedElders: string | null;
  createdAt: string;
  updatedAt: string;
}

export const cardKeys = {
  all: ["card"] as const,
  list: () => [...cardKeys.all, "list"] as const,
  settings: () => [...cardKeys.all, "settings"] as const,
  detail: (cardId: string) => [...cardKeys.all, "detail", cardId] as const,
};

// ---------------------------------------------------------------------------
// Multi-card hooks
// ---------------------------------------------------------------------------

export function useUserCards() {
  return useQuery({
    queryKey: cardKeys.list(),
    queryFn: () => apiClient<CardSettings[]>("/api/card/list"),
  });
}

export function useCard(cardId: string) {
  return useQuery({
    queryKey: cardKeys.detail(cardId),
    queryFn: () => apiClient<CardSettings>(`/api/card/manage/${cardId}`),
    enabled: !!cardId,
  });
}

export function useCreateCard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCardInput) =>
      apiClient<CardSettings>("/api/card/create", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: cardKeys.list() });
    },
  });
}

export function useUpdateCard(cardId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateCardSettingsInput & { slug?: string; name?: string | null }) =>
      apiClient<CardSettings>(`/api/card/manage/${cardId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: (data) => {
      queryClient.setQueryData(cardKeys.detail(cardId), data);
      void queryClient.invalidateQueries({ queryKey: cardKeys.list() });
      void queryClient.invalidateQueries({ queryKey: cardKeys.settings() });
    },
  });
}

export function useDeleteCard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cardId: string) =>
      apiClient(`/api/card/manage/${cardId}`, { method: "DELETE" }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: cardKeys.list() });
      void queryClient.invalidateQueries({ queryKey: cardKeys.settings() });
    },
  });
}

export function useSetDefaultCard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cardId: string) =>
      apiClient<CardSettings>(`/api/card/manage/${cardId}/set-default`, {
        method: "POST",
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: cardKeys.list() });
      void queryClient.invalidateQueries({ queryKey: cardKeys.settings() });
    },
  });
}

// ---------------------------------------------------------------------------
// Backward-compat hooks (use default card via /api/card/settings)
// ---------------------------------------------------------------------------

export function useCardSettings() {
  return useQuery({
    queryKey: cardKeys.settings(),
    queryFn: () => apiClient<CardSettings>("/api/card/settings"),
  });
}

export function useUpdateCardSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateCardSettingsInput) =>
      apiClient<CardSettings>("/api/card/settings", {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: (data) => {
      queryClient.setQueryData(cardKeys.settings(), data);
      void queryClient.invalidateQueries({ queryKey: cardKeys.list() });
    },
  });
}
