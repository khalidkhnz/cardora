import { useMutation } from "@tanstack/react-query";

interface UploadResult {
  url: string;
  filename: string;
  size: number;
}

export function useUploadImage() {
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
