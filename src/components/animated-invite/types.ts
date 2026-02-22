export interface WeddingEvent {
  name: string;
  date: string;
  venue: string;
  time: string;
}

export interface InviteData {
  slug: string;
  templateId: string;
  groomName: string;
  brideName: string;
  weddingDate: string | null;
  receptionDate: string | null;
  venue: string | null;
  venueAddress: string | null;
  story: string | null;
  heroImage: string | null;
  galleryImages: string[];
  musicUrl: string | null;
  isPaid: boolean;
  couplePhoto: string | null;
  backgroundImage: string | null;
  weddingTime: string | null;
  groomFatherName: string | null;
  groomMotherName: string | null;
  brideFatherName: string | null;
  brideMotherName: string | null;
  events: WeddingEvent[] | null;
  coupleMessage: string | null;
  extraData: Record<string, unknown> | null;
}

export interface TemplateProps {
  invite: InviteData;
  isDemo: boolean;
}
