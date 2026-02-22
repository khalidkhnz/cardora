import { getTemplateCategory } from "@/components/animated-invite/template-registry";
import type { InviteData } from "@/components/animated-invite/types";

export function getDemoInviteData(templateId: string): InviteData {
  const category = getTemplateCategory(templateId);

  const base: InviteData = {
    slug: "demo-preview",
    templateId,
    groomName: "James",
    brideName: "Sophia",
    weddingDate: "2026-06-15",
    receptionDate: "2026-06-16",
    venue: "The Grand Ballroom",
    venueAddress: "123 Celebration Avenue, Toronto, ON",
    story:
      "We met at a coffee shop on a rainy afternoon. What started as a conversation over lattes turned into a lifetime of love. Three years later, here we are — ready to begin our forever together.",
    heroImage: null,
    galleryImages: [],
    musicUrl: null,
    isPaid: false,
    couplePhoto: null,
    backgroundImage: null,
    weddingTime: "6:00 PM",
    groomFatherName: "Robert Anderson",
    groomMotherName: "Margaret Anderson",
    brideFatherName: "William Carter",
    brideMotherName: "Elizabeth Carter",
    events: null,
    coupleMessage:
      "We are so excited to celebrate our special day with you. Your presence means the world to us!",
    extraData: null,
  };

  if (category === "multi-event") {
    base.events = [
      { name: "Mehendi", date: "Thursday, June 11th 2026", venue: "Rose Garden Villa", time: "4:00 PM" },
      { name: "Sangeet", date: "Friday, June 12th 2026", venue: "Starlight Banquet Hall", time: "7:00 PM" },
      { name: "Wedding Ceremony", date: "Saturday, June 13th 2026", venue: "The Grand Ballroom", time: "11:00 AM" },
      { name: "Reception", date: "Saturday, June 13th 2026", venue: "The Grand Ballroom", time: "7:00 PM" },
    ];
    base.extraData = {
      hashtag: "#JamesAndSophia2026",
      thingsToKnow: [
        { label: "Weather", detail: "Expected sunny, 25\u00B0C" },
        { label: "Parking", detail: "Complimentary valet parking available" },
        { label: "Accommodation", detail: "The Ritz-Carlton, 5 min from venue" },
        { label: "Dress Code", detail: "Semi-formal / Cocktail attire" },
      ],
    };
  }

  return base;
}
