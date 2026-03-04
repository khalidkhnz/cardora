"use client";

import { useCallback, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageGrid } from "@/components/shared/image-grid";
import { useUserImages } from "@/hooks/use-upload";
import { useUploadImage } from "@/hooks/use-upload";
import { toast } from "sonner";
import { ImageIcon, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImagePickerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (url: string) => void;
  currentValue?: string | null;
  type?: string;
}

export function ImagePickerDialog({
  open,
  onOpenChange,
  onSelect,
  currentValue,
  type,
}: ImagePickerDialogProps) {
  const [selected, setSelected] = useState<string | null>(currentValue ?? null);
  const [tab, setTab] = useState("browse");
  const { data: images, isLoading } = useUserImages();
  const upload = useUploadImage();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleUpload = useCallback(
    async (file: File) => {
      try {
        const result = await upload.mutateAsync({ file, type });
        setSelected(result.url);
        setTab("browse");
        toast.success("Image uploaded");
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Upload failed");
      }
    },
    [upload, type],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) void handleUpload(file);
    },
    [handleUpload],
  );

  const handleConfirm = () => {
    if (selected) {
      onSelect(selected);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Choose Image</DialogTitle>
          <DialogDescription>
            Select from your uploaded images or upload a new one.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="browse">My Images</TabsTrigger>
            <TabsTrigger value="upload">Upload New</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="mt-4">
            {isLoading ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-square rounded-lg" />
                ))}
              </div>
            ) : images && images.length > 0 ? (
              <div className="max-h-[400px] overflow-y-auto pr-1">
                <ImageGrid
                  images={images}
                  selected={selected}
                  onSelect={setSelected}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <ImageIcon className="text-muted-foreground mb-3 h-10 w-10" />
                <p className="text-muted-foreground text-sm">
                  No images uploaded yet.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => setTab("upload")}
                >
                  Upload your first image
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="upload" className="mt-4">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={cn(
                "flex h-48 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors",
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
                  <Upload className="text-muted-foreground mb-3 h-10 w-10" />
                  <p className="text-muted-foreground text-sm">
                    Drop an image or click to browse
                  </p>
                  <p className="text-muted-foreground/60 mt-1 text-xs">
                    Max 5MB (JPEG, PNG, GIF, WebP)
                  </p>
                </>
              )}
            </div>
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void handleUpload(file);
                e.target.value = "";
              }}
            />
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!selected}>
            Select Image
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
