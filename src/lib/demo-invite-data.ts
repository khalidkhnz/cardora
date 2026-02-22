import { getTemplateCategory } from "@/components/animated-invite/template-registry";
import type { InviteData } from "@/components/animated-invite/types";
import { platform } from "@/lib/platform";

const demo = platform.demoData;

export function getDemoInviteData(templateId: string): InviteData {
  const category = getTemplateCategory(templateId);

  const base: InviteData = {
    slug: "demo-preview",
    templateId,
    groomName: demo.groomName,
    brideName: demo.brideName,
    weddingDate: demo.weddingDate,
    receptionDate: demo.receptionDate,
    venue: demo.venue,
    venueAddress: demo.venueAddress,
    story: demo.story,
    heroImage: null,
    galleryImages: [],
    musicUrl: null,
    isPaid: false,
    couplePhoto: null,
    backgroundImage: null,
    weddingTime: demo.weddingTime,
    groomFatherName: demo.groomFatherName,
    groomMotherName: demo.groomMotherName,
    brideFatherName: demo.brideFatherName,
    brideMotherName: demo.brideMotherName,
    events: null,
    coupleMessage: demo.coupleMessage,
    extraData: null,
  };

  if (category === "multi-event") {
    base.events = [...demo.events];
    base.extraData = {
      hashtag: demo.hashtag,
      thingsToKnow: [...demo.thingsToKnow],
    };
  }

  return base;
}
