import { getSession } from "@/server/better-auth/server";
import { getPurchasedTemplates } from "@/server/db/queries/payment";
import { getTemplateById } from "@/lib/template-data";
import { pageTitle } from "@/lib/platform";
import Link from "next/link";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ExternalLink, Sparkles, ArrowRight } from "lucide-react";

export const metadata = {
  title: pageTitle("My Templates"),
};

export default async function TemplatesPage() {
  const session = await getSession();
  const purchases = session?.user
    ? await getPurchasedTemplates(session.user.id)
    : [];

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
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1
          className="text-3xl font-bold text-[#1A1A1A] dark:text-[#F0E8D8]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          My Templates
        </h1>
        <p className="mt-1 text-[#6B6560] dark:text-[#A09888]">
          Templates you&apos;ve purchased — customize and use them anytime
        </p>
      </div>

      {purchasedTemplates.length === 0 ? (
        <Card className="border-[#E8E4DE] bg-white dark:border-white/10 dark:bg-[#141414]">
          <CardContent className="flex flex-col items-center justify-center py-20 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3F0EB] dark:bg-white/5">
              <ShoppingBag className="h-7 w-7 text-[#8B7355]" />
            </div>
            <h3
              className="mt-5 text-lg font-semibold text-[#1A1A1A] dark:text-[#F0E8D8]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              No templates yet
            </h3>
            <p className="mt-2 max-w-sm text-sm text-[#6B6560] dark:text-[#A09888]">
              Browse our collection of premium wedding invitations and business card templates.
            </p>
            <Link href="/#templates" className="mt-5">
              <Button className="gap-2 bg-[#1A1A1A] text-white hover:bg-[#2A2A2A] dark:bg-white dark:text-[#1A1A1A] dark:hover:bg-white/90">
                Browse Templates
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {purchasedTemplates.map((item) => (
            <Card key={item.payment.id} className="overflow-hidden border-[#E8E4DE] bg-white transition-all hover:shadow-md dark:border-white/10 dark:bg-[#141414]">
              {/* Subtle color bar */}
              <div
                className="h-1 w-full"
                style={{
                  background: item.template
                    ? `linear-gradient(to right, ${item.template.colors.bg}, ${item.template.colors.accent})`
                    : "linear-gradient(to right, #E8E4DE, #D4AF37)",
                }}
              />
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-[#1A1A1A] dark:text-[#F0E8D8]">{item.templateName}</h3>
                    <p className="mt-0.5 text-xs text-[#8B8580] dark:text-[#706860]">{item.templateCategory}</p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
                    Purchased
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#8B8580] dark:text-[#706860]">Price</span>
                    <span className="font-medium text-[#1A1A1A] dark:text-[#F0E8D8]">{item.templatePrice}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#8B8580] dark:text-[#706860]">Purchased</span>
                    <span className="font-medium text-[#1A1A1A] dark:text-[#F0E8D8]">
                      {new Date(item.purchasedAt).toLocaleDateString("en-CA", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex gap-2">
                  {item.templateId && (
                    <Link href={`/templates/${item.templateId}/preview`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full gap-1.5 border-[#E8E4DE] text-[#6B6560] hover:bg-[#F3F0EB] hover:text-[#1A1A1A] dark:border-white/10 dark:text-[#A09888] dark:hover:bg-white/5">
                        <ExternalLink className="h-3.5 w-3.5" />
                        Preview
                      </Button>
                    </Link>
                  )}
                  <Link href="/dashboard/card" className="flex-1">
                    <Button size="sm" className="w-full gap-1.5 bg-[#1A1A1A] text-white hover:bg-[#2A2A2A] dark:bg-white dark:text-[#1A1A1A] dark:hover:bg-white/90">
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
