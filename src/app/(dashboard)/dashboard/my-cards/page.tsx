import { getSession } from "@/server/better-auth/server";
import { getUserSavedCards } from "@/server/db/queries/saved-card";
import { pageTitle } from "@/lib/platform";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layers, ArrowRight } from "lucide-react";
import { SavedCardGrid } from "@/components/dashboard/saved-card-grid";

export const metadata = {
  title: pageTitle("My Cards"),
};

export default async function MyCardsPage() {
  const session = await getSession();
  const cards = session?.user
    ? await getUserSavedCards(session.user.id)
    : [];

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1
          className="text-3xl font-bold text-[#1A1A1A] dark:text-[#F0E8D8]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          My Cards
        </h1>
        <p className="mt-1 text-[#6B6560] dark:text-[#A09888]">
          Your saved free cards, download or manage them anytime
        </p>
      </div>

      {cards.length === 0 ? (
        <Card className="border-[#E8E4DE] bg-white dark:border-white/10 dark:bg-[#141414]">
          <CardContent className="flex flex-col items-center justify-center py-20 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3F0EB] dark:bg-white/5">
              <Layers className="h-7 w-7 text-[#8B7355]" />
            </div>
            <h3
              className="mt-5 text-lg font-semibold text-[#1A1A1A] dark:text-[#F0E8D8]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              No cards yet
            </h3>
            <p className="mt-2 max-w-sm text-sm text-[#6B6560] dark:text-[#A09888]">
              Create a free digital card and it will appear here.
            </p>
            <Link href="/#free-cards" className="mt-5">
              <Button className="gap-2 bg-[#1A1A1A] text-white hover:bg-[#2A2A2A] dark:bg-white dark:text-[#1A1A1A] dark:hover:bg-white/90">
                Browse Free Cards
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <SavedCardGrid cards={cards} />
      )}
    </div>
  );
}
