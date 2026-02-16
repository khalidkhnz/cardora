"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { useDeleteRSVP } from "@/hooks/use-rsvp";
import { toast } from "sonner";

interface RsvpEntry {
  id: string;
  inviteSlug: string;
  guestName: string;
  guestEmail: string | null;
  phone: string | null;
  attending: string;
  numberOfGuests: number | null;
  dietaryRestrictions: string | null;
  message: string | null;
  createdAt: string;
}

interface RsvpTableProps {
  rsvps: RsvpEntry[];
}

const ATTENDING_BADGE: Record<
  string,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  yes: { label: "Attending", variant: "default" },
  no: { label: "Declined", variant: "destructive" },
  maybe: { label: "Maybe", variant: "secondary" },
};

export function RsvpTable({ rsvps }: RsvpTableProps) {
  const deleteRsvp = useDeleteRSVP();

  async function handleDelete(id: string) {
    try {
      await deleteRsvp.mutateAsync(id);
      toast.success("RSVP deleted");
    } catch {
      toast.error("Failed to delete RSVP");
    }
  }

  if (rsvps.length === 0) {
    return (
      <p className="text-muted-foreground py-8 text-center text-sm">
        No RSVPs yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Guests</TableHead>
            <TableHead>Dietary</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {rsvps.map((r) => {
            const badge = ATTENDING_BADGE[r.attending] ?? {
              label: r.attending,
              variant: "outline" as const,
            };
            return (
              <TableRow key={r.id}>
                <TableCell className="font-medium">{r.guestName}</TableCell>
                <TableCell className="text-xs">{r.guestEmail ?? "-"}</TableCell>
                <TableCell>
                  <Badge variant={badge.variant}>{badge.label}</Badge>
                </TableCell>
                <TableCell>{r.numberOfGuests ?? 1}</TableCell>
                <TableCell className="max-w-[150px] truncate text-xs">
                  {r.dietaryRestrictions ?? "-"}
                </TableCell>
                <TableCell className="max-w-[200px] truncate text-xs">
                  {r.message ?? "-"}
                </TableCell>
                <TableCell className="text-xs">{r.phone ?? "-"}</TableCell>
                <TableCell className="text-xs">
                  {new Date(r.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => void handleDelete(r.id)}
                    disabled={deleteRsvp.isPending}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
