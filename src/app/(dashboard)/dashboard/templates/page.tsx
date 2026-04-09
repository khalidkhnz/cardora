import { getSession } from "@/server/better-auth/server";
import { getPurchasedTemplates } from "@/server/db/queries/payment";
import { getTemplateById } from "@/lib/template-data";
import { pageTitle } from "@/lib/platform";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, ExternalLink, Sparkles } from "lucide-react";

export const metadata = {
  title: pageTitle("My Templates"),
};

export default async function TemplatesPage() {
  const session = await getSession();
  const purchases = session?.user
    ? await getPurchasedTemplates(session.user.id)
    : [];

  // Map purchases to template data
  const purchasedTemplates = purchases
    .map((p) => {
      const itemData = p.itemData as {
        templateId?: string;
        templateName?: string;
        templateCategory?: string;
        templatePrice?: string;
      } | null;
      const templateId = itemData?.templateId;
      const template = templateId ? getTemplateById(templateId) : null;
      return {
        payment: p,
        template,
        templateName: template?.name ?? itemData?.templateName ?? "Unknown Template",
        templateCategory: template?.category ?? itemData?.templateCategory ?? "",
        templatePrice: template?.price ?? itemData?.templatePrice ?? "",
        templateId: templateId ?? "",
        purchasedAt: p.createdAt,
      };
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Templates</h1>
        <p className="text-muted-foreground">
          Templates you&apos;ve purchased — customize and use them anytime
        </p>
      </div>

      {purchasedTemplates.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">No templates yet</h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Browse our collection of premium wedding invitations and business card templates.
            </p>
            <Link href="/#templates" className="mt-4">
              <Button className="gap-2">
                <Sparkles className="h-4 w-4" />
                Browse Templates
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {purchasedTemplates.map((item) => (
            <Card key={item.payment.id} className="overflow-hidden transition-shadow hover:shadow-md">
              {/* Color bar based on template */}
              <div
                className="h-2 w-full"
                style={{
                  background: item.template
                    ? `linear-gradient(to right, ${item.template.colors.bg}, ${item.template.colors.accent})`
                    : "linear-gradient(to right, #D4AF37, #C6A85A)",
                }}
              />
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{item.templateName}</CardTitle>
                    <CardDescription>{item.templateCategory}</CardDescription>
                  </div>
                  <Badge variant="default" className="bg-green-600 text-white">
                    Purchased
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Price paid</span>
                  <span className="font-medium text-foreground">{item.templatePrice}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Purchased on</span>
                  <span className="font-medium text-foreground">
                    {new Date(item.purchasedAt).toLocaleDateString("en-CA", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex gap-2 pt-2">
                  {item.templateId && (
                    <Link href={`/templates/${item.templateId}/preview`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full gap-1.5">
                        <ExternalLink className="h-3.5 w-3.5" />
                        Preview
                      </Button>
                    </Link>
                  )}
                  <Link href="/dashboard/card" className="flex-1">
                    <Button size="sm" className="w-full gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" />
                      Customize
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
