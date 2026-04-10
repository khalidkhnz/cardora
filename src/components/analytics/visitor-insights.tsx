"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useVisitors } from "@/hooks/use-analytics";
import { Skeleton } from "@/components/ui/skeleton";

const EVENT_BADGES: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
  profile_view: { label: "View", variant: "default" },
  payment_view: { label: "Payment View", variant: "secondary" },
  payment_success: { label: "Payment", variant: "default" },
  qr_scan: { label: "QR Scan", variant: "outline" },
  nfc_tap: { label: "NFC Tap", variant: "outline" },
  link_click: { label: "Link Click", variant: "secondary" },
};

export function VisitorInsights() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useVisitors(page);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Visitor Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data?.visitors.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Visitor Insights</CardTitle>
          <CardDescription>
            Detailed visitor information will appear here once you start getting traffic.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visitor Insights</CardTitle>
        <CardDescription>
          {data.total} total events - Page {data.page} of {data.totalPages}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Browser</TableHead>
                <TableHead>IP</TableHead>
                <TableHead>Referrer</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.visitors.map((visitor) => {
                const badge = EVENT_BADGES[visitor.type] ?? {
                  label: visitor.type,
                  variant: "secondary" as const,
                };
                return (
                  <TableRow key={visitor.id}>
                    <TableCell>
                      <Badge variant={badge.variant}>{badge.label}</Badge>
                    </TableCell>
                    <TableCell className="capitalize">
                      {visitor.deviceType ?? "unknown"}
                    </TableCell>
                    <TableCell>{visitor.browser}</TableCell>
                    <TableCell className="font-mono text-xs">
                      {visitor.ipAddress}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate text-xs">
                      {visitor.referer ?? "Direct"}
                    </TableCell>
                    <TableCell className="text-xs">
                      {new Date(visitor.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {data.totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>
            <span className="text-muted-foreground text-sm">
              Page {page} of {data.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= data.totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
