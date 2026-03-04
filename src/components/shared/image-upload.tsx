"use client";

import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useUploadImage } from "@/hooks/use-upload";
import { ImagePickerDialog } from "@/components/shared/image-picker-dialog";
import { toast } from "sonner";
import { Upload, X, ImageIcon, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string | null) => void;
  type?: string;
  className?: string;
}

export function ImageUpload({ value, onChange, type, className }: ImageUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const upload = useUploadImage();

  const handleFile = useCallback(
    async (file: File) => {
      try {
        const result = await upload.mutateAsync({
          file,
          type,
          oldUrl: value ?? undefined,
        });
        onChange(result.url);
        toast.success("Image uploaded");
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Upload failed");
      }
    },
    [upload, type, value, onChange],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) void handleFile(file);
    },
    [handleFile],
  );

  return (
    <div className={cn("space-y-2", className)}>
      {value ? (
        <div className="relative inline-block">
          <button
            type="button"
            onClick={() => setPickerOpen(true)}
            className="block h-32 w-32 cursor-pointer rounded-lg border bg-cover bg-center transition-opacity hover:opacity-80"
            style={{ backgroundImage: `url(${value})` }}
            title="Click to change image"
          />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white transition-colors hover:bg-red-600"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={cn(
            "flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors",
            dragOver
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/20 hover:border-muted-foreground/40",
          )}
          onClick={() => inputRef.current?.click()}
        >
          {upload.isPending ? (
            <div className="text-muted-foreground text-sm">Uploading...</div>
          ) : (
            <>
              <ImageIcon className="text-muted-foreground mb-2 h-8 w-8" />
              <p className="text-muted-foreground text-xs">
                Drop an image or click to browse
              </p>
              <p className="text-muted-foreground/60 text-xs">
                Max 5MB (JPEG, PNG, GIF, WebP)
              </p>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
          e.target.value = "";
        }}
      />

      {!value && (
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={upload.isPending}
            onClick={() => inputRef.current?.click()}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Image
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={upload.isPending}
            onClick={() => setPickerOpen(true)}
          >
            <FolderOpen className="mr-2 h-4 w-4" />
            Browse Library
          </Button>
        </div>
      )}

      <ImagePickerDialog
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        onSelect={onChange}
        currentValue={value}
        type={type}
      />
    </div>
  );
}
