"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useUploadAudio } from "@/hooks/use-upload";
import { toast } from "sonner";
import { Music, Upload, X } from "lucide-react";

interface MusicUploadProps {
  value?: string | null;
  onChange: (url: string | null) => void;
}

export function MusicUpload({ value, onChange }: MusicUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const upload = useUploadAudio();

  async function handleFile(file: File) {
    try {
      const result = await upload.mutateAsync({
        file,
        oldUrl: value ?? undefined,
      });
      onChange(result.url);
      toast.success("Audio uploaded");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    }
  }

  return (
    <div className="space-y-2">
      {value ? (
        <div className="flex items-center gap-3 rounded-lg border p-3">
          <Music className="text-muted-foreground h-5 w-5" />
          <audio controls src={value} className="h-8 flex-1" />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="rounded-full bg-red-500 p-1 text-white transition-colors hover:bg-red-600"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={upload.isPending}
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="mr-2 h-4 w-4" />
          {upload.isPending ? "Uploading..." : "Upload Audio"}
        </Button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="audio/mpeg,audio/mp3,audio/wav,audio/ogg,audio/m4a,audio/aac"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
          e.target.value = "";
        }}
      />

      {!value && (
        <p className="text-muted-foreground/60 text-xs">
          Max 10MB (MP3, WAV, OGG, M4A, AAC)
        </p>
      )}
    </div>
  );
}
