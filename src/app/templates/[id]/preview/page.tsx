import { notFound, redirect } from "next/navigation";
import { type Metadata } from "next";
import { getTemplateById, TEMPLATES } from "@/lib/template-data";
import { pageTitle } from "@/lib/platform";
import { MaharaniExperience } from "@/components/landing/maharani-experience";

// Only these templates have a live preview built
const LIVE_PREVIEW_IDS = ["the-maharani"];

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return LIVE_PREVIEW_IDS.map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const template = getTemplateById(id);
  if (!template) return { title: pageTitle("Preview") };
  return {
    title: pageTitle(`${template.name} Preview`),
    description: template.description,
  };
}

export default async function TemplatePreviewPage({ params }: Props) {
  const { id } = await params;
  const template = getTemplateById(id);
  if (!template) notFound();

  // Only The Maharani has a live preview — others redirect back
  if (id === "the-maharani") {
    return <MaharaniExperience />;
  }

  // Redirect other templates back to their detail page
  redirect(`/templates/${id}`);
}
