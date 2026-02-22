import { notFound } from "next/navigation";
import { getWeddingInviteBySlug } from "@/server/db/queries/wedding";
import { PublicWeddingView } from "@/components/animated-invite/public-wedding-view";
import { platform, pageTitle } from "@/lib/platform";
import type { Metadata } from "next";

const demo = platform.demoData;

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
        groomName: isDemo ? demo.groomName : (invite.groomName ?? "Groom"),
        brideName: isDemo ? demo.brideName : (invite.brideName ?? "Bride"),
        weddingDate: isDemo ? demo.weddingDate : invite.weddingDate,
        receptionDate: invite.receptionDate,
        venue: isDemo ? demo.venue : invite.venue,
        venueAddress: isDemo ? demo.venueAddress : invite.venueAddress,
        story: isDemo ? demo.story : invite.story,
        heroImage: isDemo ? demo.heroImage : invite.heroImage,
        galleryImages: isDemo ? [...demo.galleryImages] : (invite.galleryImages ?? []),
        musicUrl: invite.musicUrl,
        isPaid: invite.isPaid,
        couplePhoto: isDemo ? demo.couplePhoto : invite.couplePhoto,
        backgroundImage: isDemo ? demo.backgroundImage : invite.backgroundImage,
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
