import { notFound } from "next/navigation";
import { getUserProfileByUsername } from "@/server/db/queries/user";
import { getCardByUserAndSlug } from "@/server/db/queries/card";
import { PublicProfileView } from "@/components/public/public-profile-view";
import { platform, pageTitle } from "@/lib/platform";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ username: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username, slug } = await params;
  const userData = await getUserProfileByUsername(username);

  if (!userData?.profile) {
    return { title: pageTitle("User Not Found") };
  }

  const card = await getCardByUserAndSlug(userData.profile.userId, slug);

  return {
    title: pageTitle(card?.name ?? `${userData.name} - ${slug}`),
    description: userData.profile.profession
      ? `${userData.name} - ${userData.profile.profession}${userData.profile.company ? ` at ${userData.profile.company}` : ""}`
      : `${userData.name}'s digital card on ${platform.name}`,
  };
}

export default async function PublicCardSlugPage({ params }: Props) {
  const { username, slug } = await params;
  const userData = await getUserProfileByUsername(username);

  if (!userData?.profile) {
    notFound();
  }

  if (!userData.profile.profileEnabled) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Profile Disabled</h1>
          <p className="text-muted-foreground mt-2">
            This profile is currently not available.
          </p>
        </div>
      </div>
    );
  }

  const card = await getCardByUserAndSlug(userData.profile.userId, slug);

  if (!card) {
    notFound();
  }

  return (
    <PublicProfileView
      user={{
        name: userData.name,
        email: userData.email,
        username: userData.profile.username ?? username,
        profession: userData.profile.profession,
        company: userData.profile.company,
        phone: userData.profile.phone,
        whatsapp: userData.profile.whatsapp,
        address: userData.profile.address,
        socialLinks: userData.profile.socialLinks,
        profileImage: userData.profile.profileImage,
        cardBackgroundImage: userData.profile.cardBackgroundImage,
        paymentEnabled: userData.profile.paymentEnabled,
        country: userData.profile.country,
        currency: userData.profile.currency,
      }}
      cardSettings={{
        cardType: card.cardType ?? "business",
        selectedTemplateId: card.selectedTemplateId ?? null,
        orientation: card.orientation ?? "horizontal",
        cardSize: card.cardSize ?? "standard",
        groomName: card.groomName ?? null,
        brideName: card.brideName ?? null,
        weddingDate: card.weddingDate ?? null,
        venue: card.venue ?? null,
        groomParentNames: card.groomParentNames ?? null,
        brideParentNames: card.brideParentNames ?? null,
        deceasedElders: card.deceasedElders ?? null,
      }}
    />
  );
}
