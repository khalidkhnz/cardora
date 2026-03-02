"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AnimatedInviteEditor } from "@/components/animated-invite/animated-invite-editor";
import {
  useUserInvites,
  useDeleteInvite,
} from "@/hooks/use-wedding";
import { useUserProfile } from "@/hooks/use-user";
import { useCreateStripeSession } from "@/hooks/use-payment";
import { getAnimatedTemplate } from "@/lib/templates/animated-templates";
import { getUnitPrice, formatCurrency, getCurrencyForCountry } from "@/lib/pricing";
import type { CountryCode } from "@/lib/constants";
import { toast } from "sonner";
import {
  Plus,
  ArrowLeft,
  Pencil,
  Trash2,
  ExternalLink,
  AlertCircle,
  RefreshCw,
  Sparkles,
  Lock,
  Unlock,
  CreditCard,
  Loader2,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Invite List View
// ---------------------------------------------------------------------------
function InviteListView({
  onSelectInvite,
  onCreateInvite,
}: {
  onSelectInvite: (inviteId: string) => void;
  onCreateInvite: () => void;
}) {
  const { data: invites, isLoading, isError, refetch } = useUserInvites();
  const deleteInvite = useDeleteInvite();
  const { data: profile } = useUserProfile();
  const createSession = useCreateStripeSession();
  const [activatingId, setActivatingId] = useState<string | null>(null);

  const country = (profile?.country as CountryCode) ?? "CA";
  const currency = getCurrencyForCountry(country);
  const unitPrice = getUnitPrice(country, "animated_invite");

  function handleActivate(inviteId: string) {
    setActivatingId(inviteId);
    createSession.mutate(
      {
        amount: unitPrice,
        currency,
        purpose: "animated_invite",
        inviteId,
      },
      {
        onError: () => {
          toast.error("Failed to start payment. Please try again.");
          setActivatingId(null);
        },
      },
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>Failed to load invites.</span>
          <Button variant="outline" size="sm" onClick={() => void refetch()}>
            <RefreshCw className="mr-2 h-4 w-4" /> Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          {invites?.length ?? 0} invite{(invites?.length ?? 0) !== 1 ? "s" : ""}
        </p>
        <Button onClick={onCreateInvite}>
          <Plus className="mr-2 h-4 w-4" /> New Invite
        </Button>
      </div>

      {(!invites || invites.length === 0) && (
        <Card>
          <CardContent className="py-12 text-center">
            <Sparkles className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <p className="text-muted-foreground mb-4">
              No animated invites yet. Create your first one!
            </p>
            <Button onClick={onCreateInvite}>
              <Plus className="mr-2 h-4 w-4" /> Create Invite
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {invites?.map((invite) => {
          const template = getAnimatedTemplate(invite.templateId);
          return (
            <Card
              key={invite.id}
              className="cursor-pointer transition-shadow hover:shadow-md"
              onClick={() => onSelectInvite(invite.id)}
            >
              <CardContent className="p-4">
                <div className="mb-3 flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{template?.preview ?? "💍"}</span>
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold">
                          {template?.name ?? invite.templateId}
                        </h3>
                        <p className="text-muted-foreground truncate text-xs">
                          /wedding/{invite.slug}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant={invite.isPaid ? "default" : "secondary"}
                    className="shrink-0 text-[10px]"
                  >
                    {invite.isPaid ? (
                      <>
                        <Unlock className="mr-1 h-3 w-3" /> Active
                      </>
                    ) : (
                      <>
                        <Lock className="mr-1 h-3 w-3" /> Unpaid
                      </>
                    )}
                  </Badge>
                </div>

                {(invite.groomName ?? invite.brideName) && (
                  <p className="text-muted-foreground mb-2 text-xs">
                    {[invite.groomName, invite.brideName]
                      .filter(Boolean)
                      .join(" & ")}
                  </p>
                )}

                {!invite.isPaid && (
                  <Button
                    size="sm"
                    className="mb-2 w-full text-xs"
                    disabled={activatingId === invite.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleActivate(invite.id);
                    }}
                  >
                    {activatingId === invite.id ? (
                      <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                    ) : (
                      <CreditCard className="mr-1 h-3 w-3" />
                    )}
                    Activate — {formatCurrency(unitPrice, currency)}
                  </Button>
                )}

                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectInvite(invite.id);
                    }}
                  >
                    <Pencil className="mr-1 h-3 w-3" /> Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs"
                    asChild
                    onClick={(e) => e.stopPropagation()}
                  >
                    <a
                      href={`/wedding/${invite.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-1 h-3 w-3" /> View
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive h-7 px-2 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm("Delete this invite and all its RSVPs?")) {
                        void deleteInvite.mutateAsync(invite.id).then(() =>
                          toast.success("Invite deleted"),
                        );
                      }
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export default function AnimatedInvitePage() {
  const [view, setView] = useState<"list" | "create" | "edit">("list");
  const [editingInviteId, setEditingInviteId] = useState<string | null>(null);

  function handleSelectInvite(inviteId: string) {
    setEditingInviteId(inviteId);
    setView("edit");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Animated Invites</h1>
        <p className="text-muted-foreground">
          Create beautiful animated wedding invitations
        </p>
      </div>

      {view === "list" && (
        <InviteListView
          onSelectInvite={handleSelectInvite}
          onCreateInvite={() => {
            setEditingInviteId(null);
            setView("create");
          }}
        />
      )}

      {(view === "create" || view === "edit") && (
        <div className="space-y-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setView("list");
              setEditingInviteId(null);
            }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Invites
          </Button>
          <AnimatedInviteEditor
            inviteId={editingInviteId ?? undefined}
            onSaved={() => setView("list")}
          />
        </div>
      )}
    </div>
  );
}
