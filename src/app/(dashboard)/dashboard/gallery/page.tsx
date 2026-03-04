"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGallery } from "@/hooks/use-gallery";
import { useUserImages } from "@/hooks/use-upload";
import { ImageGrid } from "@/components/shared/image-grid";
import { Skeleton } from "@/components/ui/skeleton";
import { CreditCard, Heart, ImageIcon } from "lucide-react";

export default function GalleryPage() {
  const { data: result, isLoading: galleryLoading } = useGallery();
  const { data: images, isLoading: imagesLoading } = useUserImages();
  const items = result?.data;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gallery</h1>
        <p className="text-muted-foreground">
          View your saved cards, invitations, and uploaded images
        </p>
      </div>

      <Tabs defaultValue="designs">
        <TabsList>
          <TabsTrigger value="designs">Saved Designs</TabsTrigger>
          <TabsTrigger value="images">Uploaded Images</TabsTrigger>
        </TabsList>

        <TabsContent value="designs" className="mt-4">
          {galleryLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-48" />
              ))}
            </div>
          ) : items && items.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">
                        {item.type === "business_card" ? (
                          <span className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            Business Card
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Heart className="h-4 w-4" />
                            Wedding Invite
                          </span>
                        )}
                      </CardTitle>
                      <Badge variant="secondary">{item.templateId}</Badge>
                    </div>
                    <CardDescription className="text-xs">
                      Downloaded {new Date(item.downloadedAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {item.slug && (
                      <p className="text-muted-foreground text-sm">
                        Slug: <span className="font-mono">{item.slug}</span>
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  No saved designs yet. Download a card or invite to see it here.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="images" className="mt-4">
          {imagesLoading ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-lg" />
              ))}
            </div>
          ) : images && images.length > 0 ? (
            <ImageGrid images={images} />
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center py-12 text-center">
                <ImageIcon className="text-muted-foreground mb-3 h-10 w-10" />
                <p className="text-muted-foreground">
                  No uploaded images yet. Upload images from your profile or invite editor.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
