"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Eye,
  CreditCard,
  CheckCircle,
  QrCode,
  Smartphone,
  TrendingUp,
} from "lucide-react";

interface StatsGridProps {
  totalViews: number;
  recentViews: number;
  paymentViews: number;
  paymentSuccesses: number;
  qrScans: number;
  nfcTaps: number;
}

export function StatsGrid({
  totalViews,
  recentViews,
  paymentViews,
  paymentSuccesses,
  qrScans,
  nfcTaps,
}: StatsGridProps) {
  const stats = [
    {
      label: "Total Profile Views",
      value: totalViews,
      icon: Eye,
      color: "text-blue-500",
    },
    {
      label: "Views (Last 30 Days)",
      value: recentViews,
      icon: TrendingUp,
      color: "text-green-500",
    },
    {
      label: "Payment Views",
      value: paymentViews,
      icon: CreditCard,
      color: "text-purple-500",
    },
    {
      label: "Payment Successes",
      value: paymentSuccesses,
      icon: CheckCircle,
      color: "text-emerald-500",
    },
    {
      label: "QR Scans",
      value: qrScans,
      icon: QrCode,
      color: "text-orange-500",
    },
    {
      label: "NFC Taps",
      value: nfcTaps,
      icon: Smartphone,
      color: "text-pink-500",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              {stat.label}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
