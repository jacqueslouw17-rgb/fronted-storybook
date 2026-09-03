import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FileText, Clock, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Adjustment Detail (verbatim from F4.1 Employee Dashboard v8.1,
 * F41v81_AdjustmentDetailModal). A read-only dialog for a pay adjustment request:
 * title + status badge, optional rejection notice, an Amount / Hours / Category /
 * Description stack, an optional receipt, and a submitted-at footer.
 * Markup verbatim from source (status colors kept exact per the system rules).
 */
const meta: Meta = { title: "Patterns/Adjustment Detail", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

/* Status badges — verbatim from F41v81_AdjustmentDetailModal.getStatusBadge */
function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "Pending":
      return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Pending</Badge>;
    case "Admin approved":
      return <Badge className="bg-accent-green/20 text-accent-green-text border-accent-green/30">Admin approved</Badge>;
    case "Admin rejected":
      return <Badge className="bg-destructive/20 text-destructive border-destructive/30">Admin rejected</Badge>;
    case "Queued for next cycle":
      return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Queued for next cycle</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

interface Adjustment {
  type: string;
  status: string;
  amount?: number | null;
  hours?: number;
  category?: string;
  description?: string;
  receiptUrl?: string;
  rejectionReason?: string;
  submittedAt: string;
}

const formatCurrency = (amount: number, currency: string) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency,
    currencyDisplay: "code",
    minimumFractionDigits: 2,
  }).format(amount);

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

/** The adjustment detail dialog content — verbatim from F41v81_AdjustmentDetailModal. */
function AdjustmentDetailModal({ adjustment, currency }: { adjustment: Adjustment; currency: string }) {
  const isImage = adjustment.receiptUrl?.match(/\.(jpg|jpeg|png)$/i);
  const isRejected = adjustment.status === "Admin rejected";

  return (
    <div className="w-full sm:max-w-md rounded-lg border border-border bg-background overflow-hidden shadow-overlay">
      <div className="p-6 pb-0">
        <div className="flex items-center gap-3 text-lg font-semibold text-foreground">
          <span>{adjustment.type} Request</span>
          <StatusBadge status={adjustment.status} />
        </div>
      </div>

      <div className="px-6 space-y-4 py-4">
        {/* Rejection Reason Notice */}
        {isRejected && adjustment.rejectionReason && (
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-destructive/5 dark:bg-destructive/10 border border-destructive/20">
            <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="text-xs font-medium text-destructive">Rejected by admin</p>
              <p className="text-sm text-destructive/80 dark:text-destructive/90">{adjustment.rejectionReason}</p>
            </div>
          </div>
        )}

        {/* Amount */}
        {adjustment.amount != null && (
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Amount</p>
            <p className="text-lg font-semibold">{formatCurrency(adjustment.amount, currency)}</p>
          </div>
        )}

        {/* Hours (for Overtime) */}
        {adjustment.hours && (
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Hours</p>
            <p className="text-lg font-semibold">{adjustment.hours}h</p>
          </div>
        )}

        {/* Category (for Expense) */}
        {adjustment.category && (
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Category</p>
            <p className="text-foreground">{adjustment.category}</p>
          </div>
        )}

        {/* Description */}
        {adjustment.description && (
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Description</p>
            <p className="text-foreground text-sm">{adjustment.description}</p>
          </div>
        )}

        {/* Receipt */}
        {adjustment.receiptUrl && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Receipt</p>
            {isImage ? (
              <div className="rounded-lg overflow-hidden border border-border">
                <img src={adjustment.receiptUrl} alt="Receipt" className="w-full max-h-48 object-cover" />
              </div>
            ) : (
              <a
                href={adjustment.receiptUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-border hover:bg-muted transition-colors"
              >
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-foreground">View PDF receipt</span>
              </a>
            )}
          </div>
        )}

        {/* Submitted At */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t border-border">
          <Clock className="h-4 w-4" />
          <span>Submitted {formatDate(adjustment.submittedAt)}</span>
        </div>
      </div>
    </div>
  );
}

const expense: Adjustment = {
  type: "Expense",
  status: "Pending",
  amount: 4200,
  category: "Travel",
  description: "Client visit — round-trip taxi and airport transfers.",
  receiptUrl: "/receipts/expense-4200.pdf",
  submittedAt: "2026-01-14T09:32:00",
};

const rejected: Adjustment = {
  type: "Overtime",
  status: "Admin rejected",
  amount: null,
  hours: 6,
  description: "Weekend deployment support.",
  rejectionReason: "Overtime must be pre-approved by your manager before the shift.",
  submittedAt: "2026-01-11T18:05:00",
};

export const AdjustmentDetail: Story = {
  name: "Adjustment Detail",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        status="Stable"
        title="Adjustment Detail"
        lead={<>The read-only employee adjustment detail dialog from F4.1 — a title with a status badge, an optional rejection notice, an Amount / Hours / Category / Description stack, an optional receipt (image preview or PDF link) and a submitted-at footer. Markup verbatim from F41v81_AdjustmentDetailModal (status colors kept exact).</>}
        meta="Verbatim from F4.1 · Employee Dashboard (employee-dashboard-v8-1)"
      />

      <h3 style={eyebrow}>Preview — Expense (Pending)</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
        <AdjustmentDetailModal adjustment={expense} currency="PHP" />
      </div>
      <p style={{ ...note, marginTop: 10 }}>Dialog sm:max-w-md · title “{`{type}`} Request” + amber Pending badge (bg-amber-500/20 text-amber-400 border-amber-500/30) · Amount (formatted PHP code) · Category · Description · receipt PDF link (bg-muted/50 border, FileText) · Submitted footer with Clock over a border-t.</p>

      <h3 style={eyebrow}>Preview — Overtime (Admin rejected)</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
        <AdjustmentDetailModal adjustment={rejected} currency="PHP" />
      </div>
      <p style={{ ...note, marginTop: 10 }}>Rejected variant leads with a destructive notice (bg-destructive/5 border-destructive/20, AlertTriangle, “Rejected by admin” + reason). Amount is hidden when null; Hours shows “{`{hours}`}h”. Status badge bg-destructive/20 text-destructive border-destructive/30.</p>

      <h3 style={eyebrow}>Anatomy</h3>
      <DocTable head={["Part", "Detail", "classes"]} w0={160} rows={[
        ["Header", "“{type} Request” + status badge", "flex items-center gap-3 · badge colors fixed per status"],
        ["Status badge", "Pending / Admin approved / Admin rejected / Queued", "amber-500/20 · accent-green/20 · destructive/20 · blue-500/20"],
        ["Rejection notice", "Only when Admin rejected", "p-3 rounded-lg bg-destructive/5 border-destructive/20 · AlertTriangle"],
        ["Amount", "Formatted currency (code display), hidden when null", "text-lg font-semibold · label uppercase tracking-wider muted"],
        ["Hours / Category", "Overtime hours; Expense category", "label text-xs uppercase muted · value text-lg / text-foreground"],
        ["Description", "Free-text note", "label uppercase muted · value text-foreground text-sm"],
        ["Receipt", "Image preview or PDF link", "img max-h-48 object-cover · link bg-muted/50 border · FileText"],
        ["Footer", "Submitted {date} with Clock", "flex gap-2 text-sm muted pt-2 border-t border-border · Clock"],
      ]} />
    </div>
  ),
};
