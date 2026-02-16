"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DeviceBreakdownProps {
  data: { device: string; count: number }[];
}

const DEVICE_COLORS: Record<string, string> = {
  desktop: "bg-blue-500",
  mobile: "bg-green-500",
  tablet: "bg-purple-500",
  unknown: "bg-gray-400",
};

const DEVICE_LABELS: Record<string, string> = {
  desktop: "Desktop",
  mobile: "Mobile",
  tablet: "Tablet",
  unknown: "Unknown",
};

export function DeviceBreakdown({ data }: DeviceBreakdownProps) {
  const total = data.reduce((sum, d) => sum + d.count, 0);

  if (total === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Device Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            No data yet. Share your profile to start tracking visitors.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Device Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Bar chart */}
          <div className="flex h-8 overflow-hidden rounded-full">
            {data.map((d) => {
              const pct = (d.count / total) * 100;
              if (pct === 0) return null;
              return (
                <div
                  key={d.device}
                  className={`${DEVICE_COLORS[d.device] ?? "bg-gray-400"} transition-all`}
                  style={{ width: `${pct}%` }}
                  title={`${DEVICE_LABELS[d.device] ?? d.device}: ${d.count}`}
                />
              );
            })}
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {data.map((d) => (
              <div key={d.device} className="flex items-center gap-2">
                <div
                  className={`h-3 w-3 rounded-full ${DEVICE_COLORS[d.device] ?? "bg-gray-400"}`}
                />
                <div>
                  <p className="text-sm font-medium">
                    {DEVICE_LABELS[d.device] ?? d.device}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {d.count} ({Math.round((d.count / total) * 100)}%)
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
