import { notFound } from "next/navigation";
import { getUserProfileByUsername } from "@/server/db/queries/user";
import { getCardSettings } from "@/server/db/queries/card";
import { PublicProfileView } from "@/components/public/public-profile-view";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const userData = await getUserProfileByUsername(username);

  if (!userData?.profile) {
    return { title: "User Not Found — Cardora" };
  }

  return {
    title: `${userData.name} — Cardora`,
    description: userData.profile.profession
      ? `${userData.name} - ${userData.profile.profession}${userData.profile.company ? ` at ${userData.profile.company}` : ""}`
      : `${userData.name}'s digital card on Cardora`,
  };
}

export default async function PublicProfilePage({ params }: Props) {
  const { username } = await params;
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

  const cardSettings = await getCardSettings(userData.profile.userId);

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
        cardType: cardSettings?.cardType ?? "business",
        selectedTemplateId: cardSettings?.selectedTemplateId ?? null,
        groomName: cardSettings?.groomName ?? null,
        brideName: cardSettings?.brideName ?? null,
        weddingDate: cardSettings?.weddingDate ?? null,
        venue: cardSettings?.venue ?? null,
        groomParentNames: cardSettings?.groomParentNames ?? null,
        brideParentNames: cardSettings?.brideParentNames ?? null,
        deceasedElders: cardSettings?.deceasedElders ?? null,
      }}
    />
  );
}
