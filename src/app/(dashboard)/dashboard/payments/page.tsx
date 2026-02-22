"use client";

import { useState } from "react";
import { Loader2, Receipt, CheckCircle, Clock, XCircle, AlertCircle, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { usePaymentHistory, useReceivedPayments } from "@/hooks/use-payment";
import { formatCurrency } from "@/lib/pricing";

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: typeof CheckCircle }> = {
  completed: { label: "Completed", variant: "default", icon: CheckCircle },
  pending: { label: "Pending", variant: "secondary", icon: Clock },
  failed: { label: "Failed", variant: "destructive", icon: XCircle },
  refunded: { label: "Refunded", variant: "outline", icon: AlertCircle },
};

const purposeLabels: Record<string, string> = {
  card_unlock: "Business Card Unlock",
  business_card: "Business Card",
  invite_unlock: "Wedding Invite Unlock",
  animated_invite: "Animated Invite",
  cart_checkout: "Cart Purchase",
  payment: "Payment",
};

type Tab = "history" | "received";

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("history");
  const { data: historyResult, isLoading: historyLoading, isError: historyError } = usePaymentHistory();
  const { data: receivedResult, isLoading: receivedLoading, isError: receivedError } = useReceivedPayments();

  const historyPayments = historyResult?.data;
  const receivedPayments = receivedResult?.data;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payments</h1>
        <p className="text-muted-foreground">
          View your payment history and received payments
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          variant={activeTab === "history" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("history")}
        >
          <ArrowUpRight className="mr-2 h-4 w-4" />
          Payment History
        </Button>
        <Button
          variant={activeTab === "received" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("received")}
        >
          <ArrowDownLeft className="mr-2 h-4 w-4" />
          Received Payments
          {receivedPayments && receivedPayments.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {receivedResult.total}
            </Badge>
          )}
        </Button>
      </div>

      {activeTab === "history" && (
        <PaymentTable
          title="Payment History"
          icon={<ArrowUpRight className="h-5 w-5" />}
          payments={historyPayments}
          isLoading={historyLoading}
          isError={historyError}
          emptyMessage="No payments yet"
          emptyDescription="Your transaction history will appear here"
          showPayerEmail={false}
        />
      )}

      {activeTab === "received" && (
        <PaymentTable
          title="Received Payments"
          icon={<ArrowDownLeft className="h-5 w-5" />}
          payments={receivedPayments}
          isLoading={receivedLoading}
          isError={receivedError}
          emptyMessage="No received payments"
          emptyDescription="Payments from visitors will appear here"
          showPayerEmail={true}
        />
      )}
    </div>
  );
}

interface PaymentItem {
  id: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  status: string;
  purpose: string;
  payerEmail: string | null;
  createdAt: string;
}

function PaymentTable({
  title,
  icon,
  payments,
  isLoading,
  isError,
  emptyMessage,
  emptyDescription,
  showPayerEmail,
}: {
  title: string;
  icon: React.ReactNode;
  payments: PaymentItem[] | undefined;
  isLoading: boolean;
  isError: boolean;
  emptyMessage: string;
  emptyDescription: string;
  showPayerEmail: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : isError ? (
          <p className="text-center text-muted-foreground py-8">
            Failed to load payments.
          </p>
        ) : !payments?.length ? (
          <div className="text-center py-8">
            <Receipt className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <p className="mt-2 text-muted-foreground">{emptyMessage}</p>
            <p className="text-sm text-muted-foreground">{emptyDescription}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  {showPayerEmail && <TableHead>From</TableHead>}
                  <TableHead>Purpose</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((p) => {
                  const status = statusConfig[p.status] ?? statusConfig.pending!;
                  const StatusIcon = status.icon;
                  return (
                    <TableRow key={p.id}>
                      <TableCell className="text-sm">
                        {new Date(p.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </TableCell>
                      {showPayerEmail && (
                        <TableCell className="text-sm">
                          {p.payerEmail ?? "Anonymous"}
                        </TableCell>
                      )}
                      <TableCell>
                        {purposeLabels[p.purpose] ?? p.purpose}
                      </TableCell>
                      <TableCell className="capitalize">
                        {p.paymentMethod}
                      </TableCell>
                      <TableCell>
                        <Badge variant={status.variant} className="gap-1">
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(p.amount, p.currency)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
