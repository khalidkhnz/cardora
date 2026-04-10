import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { pageTitle } from "@/lib/platform";
import { FreeCardPage } from "@/components/landing/free-card-page";

const VALID_TYPES = ["business", "wedding", "engagement", "anniversary", "qr-contact", "creative", "realtor", "thankyou"];

interface Props {
  params: Promise<{ type: string }>;
}

export async function generateStaticParams() {
  return VALID_TYPES.map((type) => ({ type }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  const titles: Record<string, string> = {
    business: "Free Business Card",
    wedding: "Free Wedding Invitation",
    engagement: "Free Engagement Card",
    anniversary: "Free Anniversary Card",
    "qr-contact": "Free QR Contact Card",
    creative: "Free Creative Portfolio Card",
    realtor: "Free Real Estate Card",
    thankyou: "Free Thank You Card",
  };
  return {
    title: pageTitle(titles[type] ?? "Free Card"),
    description: `Create your free ${type} card with Cardora — no credit card required.`,
  };
}

export default async function FreeCardRoute({ params }: Props) {
  const { type } = await params;
  if (!VALID_TYPES.includes(type)) notFound();
  return <FreeCardPage type={type} />;
}
