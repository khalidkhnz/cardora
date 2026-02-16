import { useQuery } from "@tanstack/react-query";
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

export const galleryKeys = {
  all: ["gallery"] as const,
  items: () => [...galleryKeys.all, "items"] as const,
};

export function useGallery() {
  return useQuery({
    queryKey: galleryKeys.items(),
    queryFn: () => apiClient<GalleryItem[]>("/api/download/gallery"),
  });
}
