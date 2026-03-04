import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

interface UploadResult {
  url: string;
  filename: string;
  size: number;
}

interface UserImage {
  url: string;
  filename: string;
}

export const uploadKeys = {
  all: ["uploads"] as const,
  images: () => [...uploadKeys.all, "images"] as const,
};

export function useUserImages() {
  return useQuery({
    queryKey: uploadKeys.images(),
    queryFn: () => apiClient<UserImage[]>("/api/upload/image"),
  });
}

export function useUploadImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      file,
      type,
      oldUrl,
    }: {
      file: File;
      type?: string;
      oldUrl?: string;
    }) => {
      const formData = new FormData();
      formData.append("file", file);
      if (type) formData.append("type", type);
      if (oldUrl) formData.append("oldUrl", oldUrl);

      const res = await fetch("/api/upload/image", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const error = (await res.json()) as { error: string };
        throw new Error(error.error);
      }

      return res.json() as Promise<UploadResult>;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: uploadKeys.images() });
    },
  });
}

export function useUploadAudio() {
  return useMutation({
    mutationFn: async ({
      file,
      oldUrl,
    }: {
      file: File;
      oldUrl?: string;
    }) => {
      const formData = new FormData();
      formData.append("file", file);
      if (oldUrl) formData.append("oldUrl", oldUrl);

      const res = await fetch("/api/upload/audio", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const error = (await res.json()) as { error: string };
        throw new Error(error.error);
      }

      return res.json() as Promise<UploadResult>;
    },
  });
}
