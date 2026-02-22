"use client";

import { useParams, useRouter } from "next/navigation";
import { PublicWeddingView } from "@/components/animated-invite/public-wedding-view";
import { getDemoInviteData } from "@/lib/demo-invite-data";
import { getTemplateComponent } from "@/components/animated-invite/template-registry";
import { ArrowLeft } from "lucide-react";

export default function TemplatePreviewPage() {
  const params = useParams<{ templateId: string }>();
  const router = useRouter();
  const templateId = params.templateId;

  const component = getTemplateComponent(templateId);
  if (!component) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold">Template not found</p>
          <button
            onClick={() => router.back()}
            className="mt-4 text-sm text-blue-600 underline"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const demoData = getDemoInviteData(templateId);

  return (
    <div className="relative">
      <button
        onClick={() => router.back()}
        className="fixed top-4 left-4 z-[60] flex items-center gap-2 rounded-full bg-black/70 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-black/90"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>
      <PublicWeddingView invite={demoData} isDemo={true} />
    </div>
  );
}
