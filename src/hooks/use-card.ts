import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { UpdateCardSettingsInput } from "@/lib/validators";

interface CardSettings {
  id: string;
  userId: string;
  cardType: "business" | "wedding" | "engagement" | "anniversary" | null;
  collection: string | null;
  selectedTemplateId: string | null;
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
  settings: () => [...cardKeys.all, "settings"] as const,
};

export function useCardSettings() {
  return useQuery({
    queryKey: cardKeys.settings(),
    queryFn: () => apiClient<CardSettings | null>("/api/card/settings"),
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
    },
  });
}
