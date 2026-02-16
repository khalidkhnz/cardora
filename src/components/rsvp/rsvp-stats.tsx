"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, UserX, HelpCircle } from "lucide-react";

interface RsvpStatsProps {
  total: number;
  attending: number;
  declined: number;
  maybe: number;
  totalGuests: number;
}

export function RsvpStatsGrid({ total, attending, declined, maybe, totalGuests }: RsvpStatsProps) {
  const stats = [
    { label: "Total RSVPs", value: total, icon: Users, color: "text-blue-500" },
    { label: "Attending", value: attending, icon: UserCheck, color: "text-green-500" },
    { label: "Declined", value: declined, icon: UserX, color: "text-red-500" },
    { label: "Maybe", value: maybe, icon: HelpCircle, color: "text-yellow-500" },
    { label: "Total Guests", value: totalGuests, icon: Users, color: "text-purple-500" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              {stat.label}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
