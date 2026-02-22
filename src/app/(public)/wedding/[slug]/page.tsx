import { notFound } from "next/navigation";
import { getWeddingInviteBySlug } from "@/server/db/queries/wedding";
import { PublicWeddingView } from "@/components/animated-invite/public-wedding-view";
import { platform, pageTitle } from "@/lib/platform";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const invite = await getWeddingInviteBySlug(slug);

  if (!invite) {
    return { title: pageTitle("Invite Not Found") };
  }

  const names = [invite.groomName, invite.brideName].filter(Boolean).join(" & ");

  return {
    title: names ? `${names} — Wedding Invite` : pageTitle("Wedding Invite"),
    description: invite.story
      ? invite.story.slice(0, 160)
      : "You're invited to celebrate our special day!",
  };
}

export default async function PublicWeddingPage({ params }: Props) {
  const { slug } = await params;
  const invite = await getWeddingInviteBySlug(slug);

  if (!invite) {
    notFound();
  }

  const isDemo = !invite.isPaid;

  return (
    <PublicWeddingView
      invite={{
        slug: invite.slug,
        templateId: invite.templateId,
        groomName: isDemo ? "John" : (invite.groomName ?? "Groom"),
        brideName: isDemo ? "Jane" : (invite.brideName ?? "Bride"),
        weddingDate: isDemo ? "2025-06-15" : invite.weddingDate,
        receptionDate: invite.receptionDate,
        venue: isDemo ? "Grand Ballroom" : invite.venue,
        venueAddress: isDemo ? "123 Celebration Ave" : invite.venueAddress,
        story: isDemo
          ? "We met at a coffee shop and knew it was meant to be..."
          : invite.story,
        heroImage: invite.heroImage,
        galleryImages: invite.galleryImages ?? [],
        musicUrl: invite.musicUrl,
        isPaid: invite.isPaid,
        couplePhoto: invite.couplePhoto,
        backgroundImage: invite.backgroundImage,
        weddingTime: invite.weddingTime,
        groomFatherName: invite.groomFatherName,
        groomMotherName: invite.groomMotherName,
        brideFatherName: invite.brideFatherName,
        brideMotherName: invite.brideMotherName,
        events: invite.events ?? null,
        coupleMessage: invite.coupleMessage,
        extraData: invite.extraData ?? null,
      }}
      isDemo={isDemo}
    />
  );
}
