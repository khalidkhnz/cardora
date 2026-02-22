"use client";

import { Suspense } from "react";
import { getTemplateComponent } from "./template-registry";
import GenericTemplate from "./templates/generic-template";
import type { InviteData } from "./types";

interface PublicWeddingViewProps {
  invite: InviteData;
  isDemo: boolean;
}

function TemplateSkeleton() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-rose-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-rose-200 border-t-rose-500" />
        <p className="text-sm text-gray-400">Loading invitation...</p>
      </div>
    </div>
  );
}

export function PublicWeddingView({ invite, isDemo }: PublicWeddingViewProps) {
  const TemplateComponent = getTemplateComponent(invite.templateId);

  if (!TemplateComponent) {
    return <GenericTemplate invite={invite} isDemo={isDemo} />;
  }

  return (
    <Suspense fallback={<TemplateSkeleton />}>
      <TemplateComponent invite={invite} isDemo={isDemo} />
    </Suspense>
  );
}
