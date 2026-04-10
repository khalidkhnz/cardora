import { notFound, redirect } from "next/navigation";
import { type Metadata } from "next";
import { getTemplateById, TEMPLATES } from "@/lib/template-data";
import { pageTitle } from "@/lib/platform";
import { MaharaniExperience } from "@/components/landing/maharani-experience";
import { AzureVowsExperience } from "@/components/landing/azure-vows-experience";
import { VintageAffairExperience } from "@/components/landing/whispered-vows-experience";
import { NoirAtelierExperience } from "@/components/landing/noir-atelier-experience";
import { MaisonBlancheExperience } from "@/components/landing/maison-blanche-experience";
import { LumiereInsightsExperience } from "@/components/landing/lumiere-insights-experience";

// Only these templates have a live preview built
const LIVE_PREVIEW_IDS = ["the-maharani", "azure-vows", "whispered-vows", "noir-atelier", "maison-blanche", "lumiere-insights"];

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

  // Route to the correct experience
  if (id === "the-maharani") return <MaharaniExperience />;
  if (id === "azure-vows") return <AzureVowsExperience />;
  if (id === "whispered-vows") return <VintageAffairExperience />;
  if (id === "noir-atelier") return <NoirAtelierExperience />;
  if (id === "maison-blanche") return <MaisonBlancheExperience />;
  if (id === "lumiere-insights") return <LumiereInsightsExperience />;

  // Others redirect back to detail page
  redirect(`/templates/${id}`);
}
