"use client";

import { useAnalyticsSummary } from "@/hooks/use-analytics";
import { StatsGrid } from "@/components/analytics/stats-grid";
import { DeviceBreakdown } from "@/components/analytics/device-breakdown";
import { VisitorInsights } from "@/components/analytics/visitor-insights";
import { Skeleton } from "@/components/ui/skeleton";

export default function AnalyticsPage() {
  const { data: summary, isLoading } = useAnalyticsSummary();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Track your profile views, payments, and visitor insights
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>
          <Skeleton className="h-48" />
        </div>
      ) : summary ? (
        <>
          <StatsGrid
            totalViews={summary.totalViews}
            recentViews={summary.recentViews}
            paymentViews={summary.paymentViews}
            paymentSuccesses={summary.paymentSuccesses}
            qrScans={summary.qrScans}
            nfcTaps={summary.nfcTaps}
          />

          <DeviceBreakdown data={summary.deviceBreakdown} />
        </>
      ) : null}

      <VisitorInsights />
    </div>
  );
}
