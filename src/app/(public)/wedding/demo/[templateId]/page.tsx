import { notFound } from "next/navigation";
import { getAnimatedTemplate } from "@/lib/templates/animated-templates";
import { getDemoInviteData } from "@/lib/demo-invite-data";
import { PublicWeddingView } from "@/components/animated-invite/public-wedding-view";
import { pageTitle } from "@/lib/platform";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ templateId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { templateId } = await params;
  const template = getAnimatedTemplate(templateId);

  if (!template) {
    return { title: pageTitle("Template Not Found") };
  }

  return {
    title: pageTitle(`${template.name} — Demo`),
    description: template.description,
  };
}

export default async function TemplateDemoPage({ params }: Props) {
  const { templateId } = await params;
  const template = getAnimatedTemplate(templateId);

  if (!template) {
    notFound();
  }

  const demoData = getDemoInviteData(templateId);

  return <PublicWeddingView invite={demoData} isDemo={true} />;
}
