import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FileText, Download, ChevronRight, ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Contractor Invoicing (verbatim from F4.2 Contractor dashboard v8.1:
 * F42v81_InvoicesSection, F42v81_InvoiceBreakdownDrawer, F42v81_InvoiceHistoryDrawer).
 * The invoices list (bordered shell, count toolbar, divided rows with Paid badge +
 * download, TablePagination footer), the read-only invoice breakdown drawer (receipt-
 * style Amount due rows + gradient total footer) and the invoice history drawer (list
 * of past invoices with status badges). Markup verbatim from source — status colours
 * kept exactly (paid = emerald); primary text uses text-emphasis per the a11y swap.
 */
const meta: Meta = { title: "Patterns/Contractor Invoicing", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const currencyCode = "EUR";
const formatAmount = (amount: number) =>
  amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const formatCurrency = (amount: number, currency: string) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency, currencyDisplay: "code", minimumFractionDigits: 2 }).format(Math.abs(amount));

/* ---- Invoices list — verbatim from F42v81_InvoicesSection ----------------- */
type Invoice = { id: string; period: string; paidDate: string; amount: number; status: "paid" | "pending" };
const INVOICES: Invoice[] = [
  { id: "1", period: "November 2025", paidDate: "Dec 5", amount: 5250.0, status: "paid" },
  { id: "2", period: "October 2025", paidDate: "Nov 5", amount: 5100.0, status: "paid" },
  { id: "3", period: "September 2025", paidDate: "Oct 5", amount: 5250.0, status: "paid" },
  { id: "4", period: "August 2025", paidDate: "Sep 5", amount: 5250.0, status: "paid" },
  { id: "5", period: "July 2025", paidDate: "Aug 5", amount: 4980.0, status: "paid" },
  { id: "6", period: "June 2025", paidDate: "Jul 5", amount: 5250.0, status: "paid" },
  { id: "7", period: "May 2025", paidDate: "Jun 5", amount: 5250.0, status: "paid" },
  { id: "8", period: "April 2025", paidDate: "May 5", amount: 5100.0, status: "paid" },
  { id: "9", period: "March 2025", paidDate: "Apr 5", amount: 5250.0, status: "paid" },
  { id: "10", period: "February 2025", paidDate: "Mar 5", amount: 5250.0, status: "paid" },
];

function InvoicesSection() {
  return (
    <div className="rounded-xl border border-border/40 bg-card/20 overflow-hidden">
      <div className="px-4 sm:px-5 pt-4 pb-3 border-b border-border/40 flex items-center gap-2">
        <span className="text-xs text-muted-foreground shrink-0">12 invoices</span>
      </div>

      <div className="p-3 sm:p-4 space-y-1.5">
        {INVOICES.map((invoice) => (
          <div
            key={invoice.id}
            role="button"
            tabIndex={0}
            className="group flex items-center gap-2 sm:gap-3 rounded-lg border border-border/30 bg-card px-3 sm:px-4 py-3 cursor-pointer hover:bg-muted/30 transition-colors focus-visible:bg-muted/30 focus-visible:outline-none"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-md bg-primary/[0.06] border border-primary/20 flex items-center justify-center">
              <FileText className="h-4 w-4 text-emphasis/70" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{invoice.period}</p>
            </div>
            <p className="text-sm font-semibold text-foreground tabular-nums flex-shrink-0">
              {currencyCode} {formatAmount(invoice.amount)}
            </p>
            <Badge
              variant="outline"
              className="hidden sm:inline-flex bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 text-xs px-2 py-0.5 flex-shrink-0"
            >
              Paid {invoice.paidDate}
            </Badge>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                className="p-1.5 rounded-md hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Download invoice"
              >
                <Download className="h-4 w-4" />
              </button>
              <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
            </div>
          </div>
        ))}
      </div>

      {/* TablePagination footer — verbatim shell (2 pages, page 1 active) */}
      <div className="flex flex-col gap-2 border-t border-border/40 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <span className="text-center text-xs text-muted-foreground tabular-nums sm:text-left">
          Showing 1–10 of 12 invoices
        </span>
        <div className="flex items-center justify-center gap-1 sm:justify-end">
          <Button type="button" variant="ghost" size="sm" disabled className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground disabled:opacity-40" aria-label="Previous page">
            <ChevronLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline ml-1">Previous</span>
          </Button>
          <div className="flex items-center gap-1">
            <Button type="button" variant="ghost" size="sm" aria-current="page" className={cn("h-7 w-7 p-0 text-xs tabular-nums", "bg-primary/10 text-emphasis hover:bg-primary/15 hover:text-emphasis")}>1</Button>
            <Button type="button" variant="ghost" size="sm" className={cn("h-7 w-7 p-0 text-xs tabular-nums", "text-muted-foreground hover:text-foreground")}>2</Button>
          </div>
          <Button type="button" variant="ghost" size="sm" className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground disabled:opacity-40" aria-label="Next page">
            <span className="hidden sm:inline mr-1">Next</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ---- Invoice breakdown drawer — verbatim from F42v81_InvoiceBreakdownDrawer -- */
const BreakdownRow = ({ label, meta, amount, currency, isPositive = true, isTotal = false }: { label: string; meta?: string; amount: number; currency: string; isPositive?: boolean; isTotal?: boolean }) => (
  <div className="py-2 -mx-2 px-2 rounded-md">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <div className="flex flex-col min-w-0">
          <span className={cn("truncate", isTotal ? "text-sm font-medium text-foreground" : "text-sm text-muted-foreground")}>{label}</span>
          {meta && <span className="text-xs text-muted-foreground/70 truncate">{meta}</span>}
        </div>
      </div>
      <div className="relative flex items-center justify-end shrink-0 ml-4 min-w-[9rem]">
        <span className={cn("whitespace-nowrap tabular-nums text-right font-mono", isTotal ? "text-sm font-semibold" : "text-sm", isPositive ? "text-foreground" : "text-muted-foreground")}>
          {isPositive ? "+" : "−"}{formatCurrency(amount, currency)}
        </span>
      </div>
    </div>
  </div>
);

const BREAKDOWN_EARNINGS = [
  { label: "Monthly Retainer", meta: "160 hours @ EUR 25/hr", amount: 4000 },
  { label: "Expense Reimbursement", meta: "Software licenses", amount: 500 },
];

function InvoiceBreakdownDrawer() {
  const totalEarnings = BREAKDOWN_EARNINGS.reduce((sum, i) => sum + i.amount, 0);
  return (
    <div className="w-full sm:max-w-[420px] rounded-lg border border-border bg-background overflow-hidden shadow-overlay">
      <div className="px-5 pt-4 pb-3 border-b border-border/40 bg-muted/30 text-left">
        <div className="flex items-center gap-2 pr-6">
          <h2 className="text-lg font-semibold">Invoice breakdown</h2>
          <Badge variant="outline" className="text-xs font-normal">November 2025</Badge>
        </div>
      </div>

      <div className="px-6 py-5 space-y-6">
        <section>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Amount due</h3>
          <div className="space-y-0">
            {BREAKDOWN_EARNINGS.map((item, idx) => (
              <BreakdownRow key={idx} label={item.label} meta={item.meta} amount={item.amount} currency={currencyCode} isPositive />
            ))}
            <BreakdownRow label="Total due" amount={totalEarnings} currency={currencyCode} isPositive isTotal />
          </div>
        </section>
      </div>

      <div className="border-t border-border/40 bg-gradient-to-b from-muted/20 to-muted/40 px-6 py-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-foreground">Invoice total</p>
            <p className="text-xs text-muted-foreground mt-0.5">Paid on Dec 31, 2025</p>
          </div>
          <p className="text-2xl font-bold text-foreground tabular-nums font-mono tracking-tight">{formatCurrency(totalEarnings, currencyCode)}</p>
        </div>
        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground transition-colors hover:bg-muted/50">
          <Download className="h-4 w-4" />
          Download invoice
        </button>
      </div>
    </div>
  );
}

/* ---- Invoice history drawer (list view) — verbatim from F42v81_InvoiceHistoryDrawer -- */
type HistoryInvoice = { id: string; period: string; invoiceDate: string; amount: number; currency: string; status: "paid" | "processing" | "pending" };
const HISTORY_INVOICES: HistoryInvoice[] = [
  { id: "inv-001", period: "Nov 1 – Nov 30, 2025", invoiceDate: "Dec 5, 2025", amount: 4500.0, currency: "EUR", status: "paid" },
  { id: "inv-002", period: "Oct 1 – Oct 31, 2025", invoiceDate: "Nov 5, 2025", amount: 4200.0, currency: "EUR", status: "paid" },
  { id: "inv-003", period: "Sep 1 – Sep 30, 2025", invoiceDate: "Oct 5, 2025", amount: 4650.0, currency: "EUR", status: "paid" },
];

const getStatusBadge = (status: HistoryInvoice["status"]) => {
  switch (status) {
    case "paid":
      return <Badge variant="secondary" className="text-[10px] bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30">Paid</Badge>;
    case "processing":
      return <Badge variant="secondary" className="text-[10px] bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30">Processing</Badge>;
    case "pending":
      return <Badge variant="secondary" className="text-[10px] bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30">Pending</Badge>;
  }
};

function InvoiceHistoryDrawer() {
  return (
    <div className="w-full sm:max-w-md rounded-lg border border-border bg-background overflow-hidden shadow-overlay">
      <div className="px-6 pt-6">
        <div className="pb-4 border-b border-border/40 text-left">
          <h2 className="text-lg font-semibold text-foreground">Previous invoices</h2>
          <p className="text-sm text-muted-foreground">View and download your past invoices.</p>
        </div>

        <div className="py-6">
          <div className="space-y-3">
            {HISTORY_INVOICES.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="p-2 rounded-lg bg-muted/50">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{invoice.period}</p>
                    <p className="text-xs text-muted-foreground">Invoiced on {invoice.invoiceDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-2">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground tabular-nums">{formatCurrency(invoice.amount, invoice.currency)}</p>
                    {getStatusBadge(invoice.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 pb-6 border-t border-border/40">
          <p className="text-xs text-muted-foreground text-center">Invoices are available for download within 12 months.</p>
        </div>
      </div>
    </div>
  );
}

export const ContractorInvoicing: Story = {
  name: "Contractor Invoicing",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        status="Stable"
        title="Contractor Invoicing"
        lead={<>The contractor invoicing surfaces from F4.2 — the invoices list (bordered shell, count toolbar, divided rows with a Paid badge and download, and a TablePagination footer), the read-only invoice breakdown drawer (receipt-style Amount due rows and a gradient total footer), and the invoice history drawer (past invoices with status badges). Markup verbatim from F42v81_InvoicesSection, F42v81_InvoiceBreakdownDrawer and F42v81_InvoiceHistoryDrawer.</>}
        meta="Verbatim from F4.2 · Contractor invoicing (v8.1)"
      />

      <h3 style={eyebrow}>Invoices section (list)</h3>
      <InvoicesSection />
      <p style={{ ...note, marginTop: 10 }}>F42v81_InvoicesSection · outer rounded-xl border-border/40 bg-card/20 · toolbar px-4 sm:px-5 pt-4 pb-3 border-b with "{"{n}"} invoices" count · rows p-3 sm:p-4 space-y-1.5, each row group rounded-lg border-border/30 bg-card hover:bg-muted/30 with a bg-primary/[0.06] border-primary/20 FileText chip (icon text-emphasis), period, amount, emerald "Paid {"{date}"}" badge, download button + ChevronRight · TablePagination footer border-t (active page bg-primary/10 text-emphasis).</p>

      <h3 style={eyebrow}>Invoice breakdown drawer</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}><InvoiceBreakdownDrawer /></div>
      <p style={{ ...note, marginTop: 10 }}>F42v81_InvoiceBreakdownDrawer · Sheet w-full sm:max-w-[420px] p-0 · header px-5 pt-4 pb-3 border-b bg-muted/30 with "Invoice breakdown" + period Badge · "Amount due" section of BreakdownRow items (font-mono +EUR amounts, muted labels, meta sub-line) ending in a "Total due" row · footer border-t bg-gradient-to-b from-muted/20 to-muted/40 with Invoice total (text-2xl font-bold font-mono) + Download invoice button.</p>

      <h3 style={eyebrow}>Invoice history drawer</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}><InvoiceHistoryDrawer /></div>
      <p style={{ ...note, marginTop: 10 }}>F42v81_InvoiceHistoryDrawer (list view) · Sheet w-full sm:max-w-md · header "Previous invoices" + description · list space-y-3 of cards p-4 rounded-lg border-border bg-card hover:bg-muted/30 with a bg-muted/50 FileText chip, period + "Invoiced on {"{date}"}", right-aligned amount + status badge (paid = emerald, processing = blue, pending = amber) · footer border-t "available for download within 12 months". Clicking a row opens the same receipt-style breakdown detail (with back arrow).</p>

      <h3 style={eyebrow}>Empty state (no invoices)</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
        <div className="w-[520px] max-w-full rounded-xl border border-border/40 bg-card/20 p-4 sm:p-5">
          <div className="flex flex-col items-center text-center py-8 px-4 -m-4 sm:-m-5 rounded-lg bg-gradient-to-br from-primary/[0.06] via-secondary/[0.04] to-accent/[0.06]">
            <div className="w-12 h-12 rounded-full bg-background/80 border border-primary/20 flex items-center justify-center mb-4 shadow-sm"><FileText className="h-5 w-5 text-emphasis" /></div>
            <h2 className="text-lg font-semibold text-foreground mb-1">No invoices yet</h2>
            <p className="text-sm text-muted-foreground max-w-[240px]">Invoices will appear here once you have been paid.</p>
          </div>
        </div>
      </div>
      <p style={{ ...note, marginTop: 10 }}>Shared MinimalEmptyState (verbatim) — gradient from-primary/[0.06] · icon circle bg-background/80 border-primary/20 + FileText · h2 “No invoices yet” + description. Same primitive as Payslips (“No payslips yet”).</p>

      <h3 style={eyebrow}>Anatomy</h3>
      <DocTable head={["Part", "Detail", "classes"]} w0={170} rows={[
        ["List shell", "Bordered container, count toolbar, divided rows, pagination", "rounded-xl border-border/40 bg-card/20 · toolbar border-b · rows space-y-1.5"],
        ["List row", "Icon chip + period + amount + Paid badge + download / chevron", "group rounded-lg border-border/30 bg-card hover:bg-muted/30 · chip bg-primary/[0.06] border-primary/20 (icon text-emphasis/70) · badge emerald-50/700/200"],
        ["Pagination", "Range label + Prev / numbered pages / Next", "border-t px-4 py-3 · active page bg-primary/10 text-emphasis · ghost buttons h-7"],
        ["Breakdown drawer", "Amount due rows + gradient total footer", "sm:max-w-[420px] p-0 · header bg-muted/30 border-b · footer bg-gradient-to-b from-muted/20 to-muted/40"],
        ["Breakdown row", "Label (+ meta) and font-mono signed amount", "flex justify-between · amount whitespace-nowrap tabular-nums font-mono · Total row font-semibold"],
        ["History drawer", "Previous invoices list with status badges", "sm:max-w-md · card p-4 rounded-lg border-border bg-card · status badge paid=emerald / processing=blue / pending=amber"],
      ]} />
    </div>
  ),
};
