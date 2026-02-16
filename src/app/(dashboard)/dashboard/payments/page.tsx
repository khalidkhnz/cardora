"use client";

import { Loader2, Receipt, CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";
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
import { usePaymentHistory } from "@/hooks/use-payment";
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

export default function PaymentsPage() {
  const { data: payments, isLoading, isError } = usePaymentHistory();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payments</h1>
        <p className="text-muted-foreground">
          View your payment history and transaction details
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Payment History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : isError ? (
            <p className="text-center text-muted-foreground py-8">
              Failed to load payment history.
            </p>
          ) : !payments?.length ? (
            <div className="text-center py-8">
              <Receipt className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-2 text-muted-foreground">No payments yet</p>
              <p className="text-sm text-muted-foreground">
                Your transaction history will appear here
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => {
                    const status = statusConfig[payment.status] ?? statusConfig.pending!;
                    const StatusIcon = status.icon;
                    return (
                      <TableRow key={payment.id}>
                        <TableCell className="text-sm">
                          {new Date(payment.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </TableCell>
                        <TableCell>
                          {purposeLabels[payment.purpose] ?? payment.purpose}
                        </TableCell>
                        <TableCell className="capitalize">
                          {payment.paymentMethod}
                        </TableCell>
                        <TableCell>
                          <Badge variant={status.variant} className="gap-1">
                            <StatusIcon className="h-3 w-3" />
                            {status.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(payment.amount, payment.currency)}
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
    </div>
  );
}
