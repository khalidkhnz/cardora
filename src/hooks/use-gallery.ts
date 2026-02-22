import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

interface GalleryItem {
  id: string;
  userId: string;
  type: "business_card" | "wedding_invite";
  templateId: string;
  slug: string | null;
  data: Record<string, unknown>;
  downloadedAt: string;
  createdAt: string;
}

interface PaginatedGallery {
  data: GalleryItem[];
  total: number;
  limit: number;
  offset: number;
}

export const galleryKeys = {
  all: ["gallery"] as const,
  items: (opts?: { limit?: number; offset?: number }) =>
    [...galleryKeys.all, "items", opts ?? {}] as const,
};

export function useGallery(opts?: { limit?: number; offset?: number }) {
  const params = new URLSearchParams();
  if (opts?.limit) params.set("limit", String(opts.limit));
  if (opts?.offset) params.set("offset", String(opts.offset));
  const qs = params.toString();

  return useQuery({
    queryKey: galleryKeys.items(opts),
    queryFn: () =>
      apiClient<PaginatedGallery>(
        `/api/download/gallery${qs ? `?${qs}` : ""}`,
      ),
  });
}

export function useDeleteGalleryItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (itemId: string) =>
      apiClient(`/api/download/gallery/${itemId}`, { method: "DELETE" }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: galleryKeys.items() });
    },
  });
}
