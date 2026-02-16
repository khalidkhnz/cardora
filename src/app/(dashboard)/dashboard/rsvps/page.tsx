"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardRSVPs } from "@/hooks/use-rsvp";
import { RsvpStatsGrid } from "@/components/rsvp/rsvp-stats";
import { RsvpTable } from "@/components/rsvp/rsvp-table";
import { Skeleton } from "@/components/ui/skeleton";

export default function RsvpsPage() {
  const { data, isLoading } = useDashboardRSVPs();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">RSVPs</h1>
        <p className="text-muted-foreground">
          Manage guest responses for your wedding invitations
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>
          <Skeleton className="h-64" />
        </div>
      ) : data ? (
        <>
          <RsvpStatsGrid {...data.stats} />

          <Card>
            <CardHeader>
              <CardTitle>Guest Responses</CardTitle>
            </CardHeader>
            <CardContent>
              <RsvpTable rsvps={data.rsvps} />
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">
              No RSVPs yet. Create a wedding invite to start collecting responses.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
