import { getTemplateCategory } from "@/components/animated-invite/template-registry";
import type { InviteData, WeddingEvent } from "@/components/animated-invite/types";
import { getAnimatedTemplate } from "@/lib/templates/animated-templates";
import type { TemplateReligion } from "@/lib/templates/animated-templates";
import { platform } from "@/lib/platform";

const demo = platform.demoData;

/* -------------------------------------------------------------------------- */
/*  Religion-specific demo events                                              */
/* -------------------------------------------------------------------------- */

const hinduEvents: WeddingEvent[] = [
  { name: "Haldi", date: "Wednesday, June 10th 2026", venue: "Rose Garden Villa", time: "10:00 AM" },
  { name: "Mehendi", date: "Thursday, June 11th 2026", venue: "Rose Garden Villa", time: "4:00 PM" },
  { name: "Sangeet", date: "Friday, June 12th 2026", venue: "Starlight Banquet Hall", time: "7:00 PM" },
  { name: "Wedding Ceremony", date: "Saturday, June 13th 2026", venue: "The Grand Ballroom", time: "11:00 AM" },
  { name: "Reception", date: "Saturday, June 13th 2026", venue: "The Grand Ballroom", time: "7:00 PM" },
];

const muslimEvents: WeddingEvent[] = [
  { name: "Dholki", date: "Wednesday, June 10th 2026", venue: "Rose Garden Villa", time: "7:00 PM" },
  { name: "Mehendi", date: "Thursday, June 11th 2026", venue: "Rose Garden Villa", time: "6:00 PM" },
  { name: "Baraat", date: "Saturday, June 13th 2026", venue: "The Grand Ballroom", time: "4:00 PM" },
  { name: "Nikkah Ceremony", date: "Saturday, June 13th 2026", venue: "The Grand Ballroom", time: "6:00 PM" },
  { name: "Walima", date: "Sunday, June 14th 2026", venue: "Starlight Banquet Hall", time: "7:00 PM" },
];

const christianEvents: WeddingEvent[] = [
  { name: "Rehearsal Dinner", date: "Friday, June 12th 2026", venue: "The Ivy Restaurant", time: "7:00 PM" },
  { name: "Church Ceremony", date: "Saturday, June 13th 2026", venue: "St. Mary's Cathedral", time: "11:00 AM" },
  { name: "Cocktail Hour", date: "Saturday, June 13th 2026", venue: "The Grand Ballroom", time: "5:00 PM" },
  { name: "Reception", date: "Saturday, June 13th 2026", venue: "The Grand Ballroom", time: "7:00 PM" },
];

const sikhEvents: WeddingEvent[] = [
  { name: "Chunni Ceremony", date: "Thursday, June 11th 2026", venue: "Rose Garden Villa", time: "5:00 PM" },
  { name: "Jaggo Night", date: "Friday, June 12th 2026", venue: "Starlight Banquet Hall", time: "8:00 PM" },
  { name: "Anand Karaj", date: "Saturday, June 13th 2026", venue: "Gurdwara Sahib", time: "10:00 AM" },
  { name: "Langar", date: "Saturday, June 13th 2026", venue: "Gurdwara Sahib", time: "1:00 PM" },
  { name: "Reception", date: "Saturday, June 13th 2026", venue: "The Grand Ballroom", time: "7:00 PM" },
];

const religionEventMap: Record<TemplateReligion, WeddingEvent[]> = {
  hindu: hinduEvents,
  muslim: muslimEvents,
  christian: christianEvents,
  sikh: sikhEvents,
};

/* -------------------------------------------------------------------------- */
/*  Religion-specific demo "Things to Know"                                    */
/* -------------------------------------------------------------------------- */

const hinduThingsToKnow = [
  { label: "Dress Code", detail: "Traditional Indian attire preferred - Sarees, Lehengas, Sherwanis, or Kurtas" },
  { label: "Parking", detail: "Complimentary valet parking available at the venue" },
  { label: "Accommodation", detail: "The Ritz-Carlton, 5 min from venue - special rates for guests" },
  { label: "Ceremony", detail: "The Pheras will begin promptly at 11 AM. Please be seated by 10:45 AM" },
];

const muslimThingsToKnow = [
  { label: "Dress Code", detail: "Modest formal attire - women are welcome to wear hijab or dupatta" },
  { label: "Parking", detail: "Complimentary valet parking available at the venue" },
  { label: "Accommodation", detail: "The Ritz-Carlton, 5 min from venue - special rates for guests" },
  { label: "Nikkah Timing", detail: "The Nikkah will begin after Maghrib prayers. Please be seated early" },
];

const christianThingsToKnow = [
  { label: "Dress Code", detail: "Semi-formal / Cocktail attire - please avoid white" },
  { label: "Parking", detail: "Complimentary valet parking available at the reception venue" },
  { label: "Accommodation", detail: "The Ritz-Carlton, 5 min from venue - special rates for guests" },
  { label: "Ceremony", detail: "Church ceremony begins at 11 AM sharp. Photography during service is limited" },
];

const sikhThingsToKnow = [
  { label: "Dress Code", detail: "Traditional Punjabi attire preferred - please cover your head in the Gurdwara" },
  { label: "Parking", detail: "Complimentary valet parking available at the venue" },
  { label: "Accommodation", detail: "The Ritz-Carlton, 5 min from venue - special rates for guests" },
  { label: "Anand Karaj", detail: "The ceremony will begin at 10 AM. Head coverings will be provided at the entrance" },
];

const religionThingsToKnowMap: Record<TemplateReligion, { label: string; detail: string }[]> = {
  hindu: hinduThingsToKnow,
  muslim: muslimThingsToKnow,
  christian: christianThingsToKnow,
  sikh: sikhThingsToKnow,
};

/* -------------------------------------------------------------------------- */
/*  Religion-specific demo hashtags                                            */
/* -------------------------------------------------------------------------- */

const religionHashtagMap: Record<TemplateReligion, string> = {
  hindu: "#JamesWedsSophia2026",
  muslim: "#JamesAndSophia2026",
  christian: "#JamesAndSophiaForever",
  sikh: "#JamesWedsSophia",
};

/* -------------------------------------------------------------------------- */
/*  Main export                                                                */
/* -------------------------------------------------------------------------- */

export function getDemoInviteData(templateId: string): InviteData {
  const category = getTemplateCategory(templateId);
  const template = getAnimatedTemplate(templateId);
  const religion = template?.religion;

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
    heroImage: demo.heroImage,
    galleryImages: [...demo.galleryImages],
    musicUrl: null,
    isPaid: false,
    couplePhoto: demo.couplePhoto,
    backgroundImage: demo.backgroundImage,
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
    base.events = religion
      ? [...religionEventMap[religion]]
      : [...demo.events];
    base.extraData = {
      hashtag: religion ? religionHashtagMap[religion] : demo.hashtag,
      thingsToKnow: religion
        ? [...religionThingsToKnowMap[religion]]
        : [...demo.thingsToKnow],
    };
  }

  return base;
}
