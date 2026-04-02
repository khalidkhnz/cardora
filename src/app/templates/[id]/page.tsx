import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { getTemplateById, TEMPLATES } from "@/lib/template-data";
import { pageTitle } from "@/lib/platform";
import { TemplateDetailContent } from "@/components/landing/template-detail";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return TEMPLATES.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const template = getTemplateById(id);
  if (!template) return { title: pageTitle("Template Not Found") };
  return {
    title: pageTitle(template.name),
    description: template.description,
  };
}

export default async function TemplateDetailPage({ params }: Props) {
  const { id } = await params;
  const template = getTemplateById(id);
  if (!template) notFound();
  return <TemplateDetailContent template={template} />;
}
