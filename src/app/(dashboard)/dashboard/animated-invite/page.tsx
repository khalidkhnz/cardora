"use client";

import { AnimatedInviteEditor } from "@/components/animated-invite/animated-invite-editor";

export default function AnimatedInvitePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Animated Invite</h1>
        <p className="text-muted-foreground">
          Create beautiful animated wedding invitations
        </p>
      </div>

      <AnimatedInviteEditor />
    </div>
  );
}
