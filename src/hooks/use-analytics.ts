import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

interface AnalyticsSummary {
  totalViews: number;
  recentViews: number;
  paymentViews: number;
  paymentSuccesses: number;
  qrScans: number;
  nfcTaps: number;
  deviceBreakdown: { device: string; count: number }[];
}

interface VisitorEntry {
  id: string;
  type: string;
  deviceType: string | null;
  userAgent: string | null;
  ipAddress: string;
  referer: string | null;
  browser: string;
  createdAt: string;
}

interface VisitorsResponse {
  visitors: VisitorEntry[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const analyticsKeys = {
  all: ["analytics"] as const,
  summary: () => [...analyticsKeys.all, "summary"] as const,
  visitors: (page: number) => [...analyticsKeys.all, "visitors", page] as const,
};

export function useAnalyticsSummary() {
  return useQuery({
    queryKey: analyticsKeys.summary(),
    queryFn: () => apiClient<AnalyticsSummary>("/api/analytics/summary"),
  });
}

export function useVisitors(page: number) {
  return useQuery({
    queryKey: analyticsKeys.visitors(page),
    queryFn: () =>
      apiClient<VisitorsResponse>(`/api/analytics/visitors?page=${page}`),
  });
}
