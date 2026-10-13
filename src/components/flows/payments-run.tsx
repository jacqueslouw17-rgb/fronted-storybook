import * as React from "react";
import { CheckCircle2, ChevronDown, ChevronRight, Clock, Download, Lock, Paperclip, Plus, Search, Undo2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Part } from "@/components/flows/flow-page";

/** The pattern stories these layers are documented in (portalled, so they mark themselves). */
const PANEL = {
  review: { id: "patterns-payments-run--invoice-review", label: "Patterns/Payments Run · Invoice review" },
  payout: { id: "patterns-payments-run--invoice-payout", label: "Patterns/Payments Run · Invoice payout" },
  lock:   { id: "patterns-payments-run--lock-dialog", label: "Patterns/Payments Run · Lock dialog" },
};

/**
 * Payments Run — the F1 v6.3 Payments tab: one contractor run, from review to paid.
 * Verbatim from components/flows/fronted-admin-v6-3-clone (workerScope="contractor"):
 *   PaymentsLoading        shared/PayrollLoadingState
 *   PeriodSelector         F1v6_PeriodDropdown (trigger)
 *   ContractorReviewTable  F1v6_SubmissionsView (hideTypeFilters header + submission rows)
 *   ContractorReviewPanel  F1v6_SubmissionsView (pay breakdown sheet, contractor)
 *   LockPayoutDialog       F1v6_ApproveConfirmationModal
 *   ContractorPayoutTable  F1v6_PayoutTable (contractor scope)
 *   ContractorPayoutPanel  F1v6_WorkerDetailDrawer (track step, contractor)
 * As v6.3 has it, known issues included (listed on the flow canvas): a row's amount stays at
 * the contract fee after adjustments are approved, and "Approve all" also counts items the
 * panel doesn't show (a contractor's timesheet).
 */

export type PayLine = { label: string; amount: number; attachments?: number };
export type Contractor = {
  id: string;
  name: string;
  country: string;
  flag: string;
  /** The contract fee line, as the review panel labels it for this contractor. */
  base: PayLine;
  /** Adjustments the contractor submitted for this run, waiting for review. */
  pending: PayLine[];
  /** Submitted items the panel doesn't list but the counts include (a timesheet). */
  unlisted?: number;
  /** The contractor's own invoice: a record only, it does not change the amount due. */
  invoice?: { fileName: string; uploadedAt: string };
};

/** Acme Corp, Monthly · Jan 2026 — the v6.3 contractor run. */
export const ACME_CONTRACTORS: Contractor[] = [
  { id: "emma", name: "Emma Wilson", country: "Norway", flag: "🇳🇴",
    base: { label: "Base Contract Fee", amount: 6266.67 },
    pending: [{ label: "Equipment purchase", amount: 243.7, attachments: 1 }], unlisted: 1 },
  { id: "aditi", name: "Aditi Sharma", country: "India", flag: "🇮🇳",
    base: { label: "Base Fee", amount: 3555.56 },
    pending: [
      { label: "Client dinner", amount: 53.33, attachments: 1 },
      { label: "Q4 performance bonus", amount: 388.89, attachments: 1 },
      { label: "Coworking space", amount: 24.44, attachments: 1 },
    ] },
  { id: "marcus", name: "Marcus Chen", country: "Singapore", flag: "🇸🇬",
    base: { label: "Base Contract Fee", amount: 8222 }, pending: [],
    invoice: { fileName: "marcus-chen-january-invoice.pdf", uploadedAt: "Jan 8, 2026" } },
  { id: "sofia", name: "Sofia Rodriguez", country: "Spain", flag: "🇪🇸",
    base: { label: "Base Contract Fee", amount: 6500 }, pending: [] },
  { id: "david", name: "David Martinez", country: "Portugal", flag: "🇵🇹",
    base: { label: "Base Contract Fee", amount: 4200 }, pending: [],
    invoice: { fileName: "dmartinez-inv-0126.pdf", uploadedAt: "Jan 9, 2026" } },
];

const formatCurrency = (n: number, cur = "EUR") => `${cur} ${Math.round(n).toLocaleString("en-US")}`;
const formatAmount = (n: number, cur = "EUR") =>
  `${cur} ${Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const initials = (name: string) => name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();

/** What a contractor is owed: the fee plus the adjustments approved so far. */
export const amountDue = (c: Contractor, approved: boolean) =>
  c.base.amount + (approved ? c.pending.reduce((s, l) => s + l.amount, 0) : 0);
/** Items waiting for a decision, as the counts show them (listed or not). */
export const pendingCount = (c: Contractor) => c.pending.length + (c.unlisted || 0);

/* ---------------------------------------------------------------- loading */

/** shared/PayrollLoadingState, verbatim. */
export function PaymentsLoading({ rows = 6 }: { rows?: number }) {
  return (
    <div className="mx-auto min-h-full px-4 sm:px-8 pt-6 pb-10" aria-label="Loading payroll" aria-busy="true">
      <div className="flex items-center justify-center pt-2 pb-6">
        <Skeleton className="h-9 w-52 rounded-md" />
      </div>
      <div className="min-h-[454px] overflow-hidden rounded-lg border border-border/40 bg-card/50 shadow-sm">
        <div className="flex flex-col gap-2 border-b border-border/40 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <Skeleton className="h-4 w-24" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 flex-1 sm:w-44 sm:flex-none" />
            <Skeleton className="h-8 w-28" />
          </div>
        </div>
        <div className="space-y-1.5 p-4">
          {[...Array(rows)].map((_, i) => (
            <div key={i} className="flex h-[58px] items-center gap-3 rounded-md border border-border/30 px-3">
              <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
              <div className="min-w-0 flex-1 space-y-1.5">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="hidden h-4 w-20 sm:block" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- run frame */

export type RunStatus = "in-review" | "processing" | "paid";

/** The period dropdown's trigger: status dot + "Monthly · Jan 2026". */
export function PeriodSelector({ status = "in-review", label = "Monthly · Jan 2026" }: { status?: RunStatus; label?: string }) {
  return (
    <button type="button" className={cn(
      "group flex items-center gap-2 px-1 py-1 rounded-md",
      "bg-transparent hover:bg-muted/40",
      "transition-colors duration-150 ease-out",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
    )}>
      <span className="relative inline-flex">
        {status === "in-review" && <span className="absolute inline-flex rounded-full opacity-40 animate-ping h-2.5 w-2.5 bg-amber-500" />}
        <span className={cn("relative inline-flex rounded-full h-2.5 w-2.5",
          status === "paid" && "bg-emerald-500", status === "processing" && "bg-primary", status === "in-review" && "bg-amber-500")} />
      </span>
      <span className="text-[15px] font-semibold text-foreground tracking-tight">{label}</span>
      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground transition-transform duration-200" />
    </button>
  );
}

/** F1v6_CompanyPayrollRun's frame around a run: the period selector over the step's table. */
export function PaymentsRunFrame({ period, children }: { period: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-full px-4 sm:px-8 pt-6 pb-10">
      <div className="flex items-center justify-center gap-1.5 pt-2 min-h-[42px] pb-6">{period}</div>
      {children}
    </div>
  );
}

function SearchField() {
  return (
    <div className="relative w-full sm:w-44">
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
      <Input placeholder="Search..." className="pl-8 h-8 text-xs bg-background/50 border-border/30" />
    </div>
  );
}

function PersonCell({ c }: { c: Contractor }) {
  return (
    <>
      <Avatar className="h-7 w-7 flex-shrink-0">
        <AvatarFallback className="text-[10px] font-medium bg-muted text-muted-foreground">{initials(c.name)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold truncate text-foreground">{c.name}</span>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-muted-foreground leading-tight">{c.flag} {c.country}</span>
        </div>
      </div>
    </>
  );
}

/* ---------------------------------------------------------------- review */

/** The run in review: every contractor with what they're owed and whether anything still
 *  needs a decision. Continue to payout unlocks once every row is Ready. */
export function ContractorReviewTable({
  contractors, approved, onOpen, onContinue, adjustmentClose = "Jan 10",
}: {
  contractors: Contractor[];
  approved: string[];
  onOpen?: (id: string) => void;
  onContinue?: () => void;
  adjustmentClose?: string;
}) {
  const ready = (c: Contractor) => !c.pending.length || approved.includes(c.id);
  const canContinue = contractors.every(ready);
  return (
    <Card className="rounded-xl border border-border/40 bg-card/20 !shadow-none overflow-hidden">
      <CardContent className="p-0">
        <div className="w-full">
          <div className="px-4 sm:px-5 pt-4 pb-3 border-b border-border/40 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs font-medium text-muted-foreground">{contractors.length} contractors on payments</span>
              <span className="text-xs text-muted-foreground/70 cursor-default" title="Requests sent after this date go to the next payment.">· Adj. close {adjustmentClose}</span>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:shrink-0">
              <SearchField />
              <div className="flex w-full flex-wrap items-center justify-end gap-2 sm:w-auto sm:flex-nowrap">
                <span className="block w-full sm:w-auto" title={canContinue ? undefined : "Resolve all pending adjustments before continuing"}>
                  <Button size="sm" disabled={!canContinue} onClick={onContinue} className="h-8 text-xs w-full sm:w-auto">Continue to payout</Button>
                </span>
              </div>
            </div>
          </div>
          <div className="p-3 sm:p-4 space-y-1.5">
            <div className="mt-0 space-y-1.5">
              {contractors.map((c) => {
                const isReady = ready(c);
                return (
                  <div key={c.id} onClick={() => onOpen?.(c.id)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-card border border-border/30 transition-colors hover:bg-muted/30 cursor-pointer group">
                    <PersonCell c={c} />
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="text-right">
                        {/* v6.3: the row keeps the fee alone, even once adjustments are approved. */}
                        <p className="text-sm font-semibold text-foreground tabular-nums leading-tight">{formatCurrency(c.base.amount)}</p>
                      </div>
                      {isReady ? (
                        <div className="flex items-center gap-1.5 text-xs text-accent-green-text">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Ready</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs text-orange-600">
                          <span className="flex items-center justify-center h-4 w-4 rounded-full bg-orange-500/15 text-orange-600 text-[10px] font-semibold">{pendingCount(c)}</span>
                          <span className="hidden sm:inline">Pending</span>
                        </div>
                      )}
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SectionHeader({ title, open, pending, total, onToggle }: { title: string; open: boolean; pending: number; total: number; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle}
      className="w-full flex items-center gap-1.5 py-1 -mx-2 px-2 rounded group cursor-pointer transition-colors hover:bg-muted/70">
      <div style={{ transform: `rotate(${open ? 90 : 0}deg)`, transition: "transform .12s" }}>
        <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
      </div>
      <span className="text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-widest">{title}</span>
      {pending > 0 && <span className="text-[10px] font-semibold text-orange-600 dark:text-orange-400 ml-0.5">{pending}</span>}
      {!open && !pending && total > 0 && <span className="text-[10px] text-muted-foreground/50 ml-0.5">{total}</span>}
    </button>
  );
}

function BreakdownRow({ label, amount, isTotal = false }: { label: string; amount: number; isTotal?: boolean }) {
  return (
    <div className={cn("flex items-center justify-between py-2", isTotal && "pt-3 mt-1 border-t border-dashed border-border/50")}>
      <span className={cn("flex min-w-0 items-center gap-1.5", isTotal ? "text-sm font-medium text-foreground" : "text-sm text-muted-foreground")}>
        <span className="truncate" title={label}>{label}</span>
      </span>
      <span className={cn("whitespace-nowrap tabular-nums text-right font-mono shrink-0 ml-4", isTotal ? "text-sm font-semibold text-foreground" : "text-sm", "text-foreground")}>
        {formatAmount(amount)}
      </span>
    </div>
  );
}

function AdjustmentLine({ line, approved }: { line: PayLine; approved: boolean }) {
  if (approved) {
    return (
      <div className="flex items-start justify-between py-2 -mx-3 px-3 rounded group transition-colors hover:bg-muted">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-accent-green-text shrink-0" />
            <span className="text-sm font-semibold text-muted-foreground truncate">{line.label}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-3">
          <span className="text-sm tabular-nums font-mono text-foreground">+{formatAmount(line.amount)}</span>
        </div>
      </div>
    );
  }
  return (
    <div className="-mx-3 px-3 rounded transition-colors hover:bg-muted">
      <div className="flex items-start justify-between py-2 cursor-pointer">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground truncate">{line.label}</span>
            <span className="inline-flex items-center h-4 px-1.5 rounded text-[9px] font-semibold uppercase tracking-wide bg-orange-100/80 dark:bg-orange-500/15 text-orange-600 dark:text-orange-400">pending</span>
            {!!line.attachments && (
              <span className="inline-flex items-center gap-0.5 text-[10px] text-muted-foreground/70">
                <Paperclip className="h-2.5 w-2.5" />{line.attachments}
              </span>
            )}
          </div>
        </div>
        <span className="text-sm tabular-nums font-mono text-foreground ml-3 shrink-0">+{formatAmount(line.amount)}</span>
      </div>
    </div>
  );
}

const SHEET_CLOSE = "[&>button.absolute]:top-[19px] [&>button.absolute]:right-5";

/** A contractor's invoice while the run is in review: fee, submitted adjustments, and the
 *  decision — Approve all / Reject all (approving closes the panel; the row turns Ready), and
 *  on reopening, Ready for payroll with Undo. */
export function ContractorReviewPanel({
  contractor: c, approved, open = true, onOpenChange, onApproveAll, onUndo, inline = false,
}: {
  contractor: Contractor;
  approved: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onApproveAll?: () => void;
  onUndo?: () => void;
  /** Render in place (pattern docs) instead of as a sheet over the page. */
  inline?: boolean;
}) {
  const pending = approved ? 0 : pendingCount(c);
  const [sectionOpen, setSectionOpen] = React.useState(pending > 0);
  React.useEffect(() => { if (pending > 0) setSectionOpen(true); }, [pending]);
  const total = amountDue(c, approved);
  const body = (
    <>
      <SheetHeader className="px-5 pt-4 pb-3 border-b border-border/30">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <SheetTitle className="text-base font-semibold text-foreground leading-tight truncate">{c.name}</SheetTitle>
            <span className="text-base shrink-0">{c.flag}</span>
            {!approved && (
              <button className="flex items-center gap-1 px-2 py-0.5 text-[10px] text-muted-foreground border border-border/50 rounded-full hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors">
                <Plus className="h-2.5 w-2.5" /><span>Add</span>
              </button>
            )}
          </div>
          <p className="text-[11px] text-muted-foreground/60 mt-0.5">Contractor · Jan 1 - Jan 31</p>
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/20">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground/50 font-medium">Invoice total</p>
          <div className="text-right">
            <div className="flex items-center justify-end gap-1.5">
              <p className="text-2xl font-bold text-foreground tabular-nums tracking-tight">{formatCurrency(total)}</p>
            </div>
            {approved && c.pending.length > 0 && (
              <p className="text-[10px] text-muted-foreground/60 tabular-nums">was {formatCurrency(c.base.amount)}</p>
            )}
          </div>
        </div>
        <SheetDescription className="sr-only">Pay breakdown details</SheetDescription>
      </SheetHeader>

      <div className="px-5 py-4 space-y-0.5">
        <section>
          <SectionHeader title="Amount due" open={sectionOpen} pending={approved ? 0 : c.pending.length} total={1 + (approved ? c.pending.length : 0)} onToggle={() => setSectionOpen(!sectionOpen)} />
          {sectionOpen && (
            <div className="overflow-y-hidden overflow-x-visible">
              <div className="pl-4 pr-3 pb-2">
                <BreakdownRow label={c.base.label} amount={c.base.amount} />
                {c.pending.map((l) => <AdjustmentLine key={l.label} line={l} approved={approved} />)}
                <BreakdownRow label="Total due" amount={total} isTotal />
              </div>
            </div>
          )}
        </section>
      </div>

      {pending > 0 ? (
        <div className="border-t border-border/30 bg-gradient-to-b from-transparent to-muted/20 px-5 py-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="flex-1 h-9 text-xs text-red-600 hover:bg-red-50 hover:text-red-700">Reject all ({pending})</Button>
            <Button size="sm" className="flex-1 h-9 text-xs" onClick={onApproveAll}>Approve all ({pending})</Button>
          </div>
        </div>
      ) : (
        <div className="border-t border-border/30 bg-gradient-to-b from-transparent to-muted/20 px-5 py-4 space-y-2">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-accent-green-text" />
            <span className="text-sm font-medium text-accent-green-text">Ready for payroll</span>
          </div>
          {c.pending.length > 0 && (
            <button onClick={onUndo}
              className="mx-auto flex items-center gap-1 px-3 py-1 rounded-full border border-border/50 hover:border-border hover:bg-muted text-muted-foreground hover:text-foreground text-xs transition-colors duration-200">
              <Undo2 className="h-3 w-3" />
              Undo
            </button>
          )}
        </div>
      )}
    </>
  );
  if (inline) return <InlineSheet width={420}>{body}</InlineSheet>;
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className={cn(SHEET_CLOSE, "w-full sm:w-[420px] sm:max-w-[420px] overflow-y-auto p-0")}><Part of={PANEL.review}>{body}</Part></SheetContent>
    </Sheet>
  );
}

/** A sheet's panel drawn in place, for pattern docs (no overlay, no portal). */
function InlineSheet({ width, children }: { width: number; children: React.ReactNode }) {
  return (
    <Sheet open modal={false}>
      <div data-ds="sheet" className="relative bg-background border rounded-lg shadow-lg overflow-hidden" style={{ width, maxWidth: "100%" }}>{children}</div>
    </Sheet>
  );
}

/** "Ready to lock and pay out?" — locks the run before paying outside Fronted. */
export function LockPayoutDialog({ open = true, onOpenChange, onConfirm }: { open?: boolean; onOpenChange?: (open: boolean) => void; onConfirm?: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm p-5 sm:p-6">
        <Part of={PANEL.lock}>
        <DialogHeader className="text-center pb-2">
          <DialogTitle className="text-base sm:text-lg font-semibold">Ready to lock and pay out?</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground mt-1">
            Once locked, no further edits can be made. You'll process the payment outside of Fronted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-row gap-2 sm:gap-2 pt-2 sm:justify-end">
          <Button variant="outline" onClick={() => onOpenChange?.(false)} className="flex-1 sm:flex-initial">Go back</Button>
          <Button onClick={onConfirm} className="flex-1 sm:flex-initial">Lock &amp; approve</Button>
        </DialogFooter>
        </Part>
      </DialogContent>
    </Dialog>
  );
}

/* ---------------------------------------------------------------- payout */

/** The locked run: amounts are final; each contractor is In progress until marked Paid.
 *  A paperclip marks a contractor who attached their own invoice. */
export function ContractorPayoutTable({
  contractors, approved, paid, onOpen,
}: {
  contractors: Contractor[];
  approved: string[];
  paid: string[];
  onOpen?: (id: string) => void;
}) {
  return (
    <Card className="rounded-xl overflow-hidden border border-border/40 bg-card/20 !shadow-none">
      <CardContent className="p-0">
        <div className="w-full">
          <div className="px-4 sm:px-5 pt-4 pb-3 border-b border-border/40 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">{contractors.length} contractors on payments</span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground/70 cursor-default" title="Amounts are final for this cycle. New requests go to the next payment.">
                  <Lock className="h-3 w-3" />
                  Adjustments closed
                </span>
              </div>
            </div>
            <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:flex-1 [&>*:not(:first-child)]:sm:ml-auto">
              <div className="relative flex-1 sm:w-44 sm:flex-none">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-8 h-8 text-xs bg-background/50 border-border/30" />
              </div>
            </div>
          </div>
          <div className="p-3 sm:p-4">
            <div className="mt-0 space-y-1.5">
              {contractors.map((c) => {
                const isPaid = paid.includes(c.id);
                return (
                  <div key={c.id} onClick={() => onOpen?.(c.id)}
                    className="group relative flex cursor-pointer items-center gap-3 px-3 py-2.5 rounded-lg border border-border/30 bg-card transition-colors hover:bg-muted/30">
                    <Avatar className="h-7 w-7 flex-shrink-0">
                      <AvatarFallback className="bg-muted text-[10px] font-semibold text-muted-foreground">{initials(c.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <span className="block truncate text-sm font-semibold text-foreground">{c.name}</span>
                      <span className="mt-0.5 block truncate text-[11px] leading-tight text-muted-foreground">{c.flag} {c.country}</span>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {c.invoice && (
                        <span className="text-muted-foreground/70" aria-label="Contractor attached their own invoice" title="Contractor attached their own invoice. Record only.">
                          <Paperclip className="h-3.5 w-3.5" />
                        </span>
                      )}
                      <div className="text-right hidden sm:block">
                        <p className="text-sm tabular-nums font-semibold text-foreground">{formatCurrency(c.base.amount)}</p>
                      </div>
                      <div className={cn("flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full",
                        isPaid ? "text-accent-green-text bg-accent-green/10" : "text-muted-foreground bg-muted/50")}>
                        {isPaid ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
                        <span className="hidden sm:inline">{isPaid ? "Paid" : "In progress"}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/** A contractor's invoice in the locked run: what's due, the contractor's own invoice as a
 *  record, and Mark as paid (then Download invoice). */
export function ContractorPayoutPanel({
  contractor: c, approved, paid, open = true, onOpenChange, onMarkPaid, inline = false,
}: {
  contractor: Contractor;
  approved: boolean;
  paid: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onMarkPaid?: () => void;
  inline?: boolean;
}) {
  const total = Math.round(amountDue(c, approved));
  // The track step splits the invoice into a monthly fee and additional work (95 / 5).
  const lines = [
    { label: "Monthly fee", amount: total * 0.95 },
    { label: "Additional Work", amount: total * 0.05 },
  ];
  const body = (
    <>
      <SheetHeader className="px-5 pt-4 pb-3 border-b border-border/30 shrink-0 bg-background">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <SheetTitle className="text-base font-semibold text-foreground leading-tight truncate">{c.name}</SheetTitle>
              <span className="text-base shrink-0">{c.flag}</span>
            </div>
            <p className="text-[11px] text-muted-foreground/60 mt-0.5">Contractor · Jan 1 - Jan 31</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/20">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground/50 font-medium">Invoice total</p>
          <p className="text-sm font-semibold text-foreground tabular-nums">{formatCurrency(total)}</p>
        </div>
        <SheetDescription className="sr-only">Pay breakdown details</SheetDescription>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto">
        <div className="px-6 space-y-6 py-6">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">Amount due</p>
            <div className="space-y-1">
              {lines.map((l) => (
                <div key={l.label} className="group flex items-center justify-between gap-4 -mx-2 px-2 py-1.5 rounded-md hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-1.5 min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate cursor-default min-w-0 flex-1">{l.label}</p>
                  </div>
                  <div className="shrink-0">
                    <p className="text-sm font-medium text-foreground tabular-nums">+{formatCurrency(l.amount)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/30">
              <p className="text-sm font-semibold text-foreground">Total due</p>
              <p className="text-sm font-semibold text-foreground tabular-nums">+{formatCurrency(total)}</p>
            </div>
          </div>

          {c.invoice && (
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Attached by contractor</p>
              <button type="button"
                className="w-full flex items-center gap-2.5 rounded-lg border border-border/40 bg-muted/20 px-3 py-2.5 text-left transition-colors hover:bg-muted/40">
                <Paperclip className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm text-foreground">{c.invoice.fileName}</span>
                  <span className="block text-[11px] text-muted-foreground">Attached {c.invoice.uploadedAt}</span>
                </span>
              </button>
              <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">Record only. It does not change the amount due.</p>
            </div>
          )}

          <div className="border-t border-border/40" />

          <div className="flex items-start justify-between">
            <div>
              <p className="text-base font-semibold text-foreground">Invoice total</p>
              {paid && <p className="text-xs text-muted-foreground">Paid on Jan 25, 2026</p>}
            </div>
            <div className="flex items-center gap-1.5">
              <p className="text-2xl font-bold text-foreground tabular-nums">{formatCurrency(total)}</p>
            </div>
          </div>

          {!paid ? (
            <Button variant="default" className="w-full mt-2" onClick={onMarkPaid}>Mark as paid</Button>
          ) : (
            <Button variant="outline" className="w-full gap-2 mt-2">
              <Download className="h-4 w-4" />
              Download invoice
            </Button>
          )}
        </div>
      </div>
    </>
  );
  if (inline) return <InlineSheet width={440}>{body}</InlineSheet>;
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className={cn(SHEET_CLOSE, "w-full sm:w-[440px] sm:max-w-[440px] p-0 flex flex-col overflow-hidden")}><Part of={PANEL.payout}>{body}</Part></SheetContent>
    </Sheet>
  );
}

/* ---------------------------------------------------------------- the whole run */

export type RunState = {
  phase: "review" | "locked";
  /** Contractors whose adjustments were approved, in the order they were approved. */
  approved: string[];
  /** The contractor whose invoice panel is open. */
  open?: string | null;
  /** The lock confirmation is showing. */
  confirm?: boolean;
  paid: string[];
};

export type RunEvent = "open" | "approve" | "close" | "continue" | "lock" | "paid";

/**
 * The contractor run, working: open an invoice, approve, continue, lock, mark paid. Starts
 * from `initial`; `onEvent` reports each step the admin takes (the flow canvas uses it to move
 * on to the next screen).
 */
export function ContractorPaymentsRun({
  contractors = ACME_CONTRACTORS, initial, onEvent,
}: {
  contractors?: Contractor[];
  initial: RunState;
  onEvent?: (event: RunEvent, id?: string) => void;
}) {
  const [s, set] = React.useState<RunState>(initial);
  const byId = (id?: string | null) => contractors.find((c) => c.id === id);
  // Rows needing a decision first; then the ones ready from the start; then the ones approved
  // in this session, in the order they were approved (as in v6.3).
  const needs = contractors.filter((c) => c.pending.length && !s.approved.includes(c.id));
  const readyFromStart = contractors.filter((c) => !c.pending.length);
  const approvedRows = s.approved.map((id) => byId(id)!).filter(Boolean);
  const rows = s.phase === "review" ? [...needs, ...readyFromStart, ...approvedRows] : [...readyFromStart, ...approvedRows, ...needs];
  const status: RunStatus = s.phase === "review" ? "in-review" : s.paid.length === contractors.length ? "paid" : "processing";
  const open = byId(s.open);
  const emit = (e: RunEvent, id?: string) => onEvent?.(e, id);

  return (
    <>
      <PaymentsRunFrame period={<PeriodSelector status={status} />}>
        {s.phase === "review" ? (
          <ContractorReviewTable contractors={rows} approved={s.approved}
            onOpen={(id) => { set({ ...s, open: id }); emit("open", id); }}
            onContinue={() => { set({ ...s, confirm: true }); emit("continue"); }} />
        ) : (
          <ContractorPayoutTable contractors={rows} approved={s.approved} paid={s.paid}
            onOpen={(id) => { set({ ...s, open: id }); emit("open", id); }} />
        )}
      </PaymentsRunFrame>

      {open && s.phase === "review" && (
        <ContractorReviewPanel contractor={open} approved={!open.pending.length || s.approved.includes(open.id)}
          onOpenChange={(o) => { if (!o) { set({ ...s, open: null }); emit("close", open.id); } }}
          onApproveAll={() => { set({ ...s, approved: [...s.approved, open.id], open: null }); emit("approve", open.id); }}
          onUndo={() => set({ ...s, approved: s.approved.filter((id) => id !== open.id) })} />
      )}
      {open && s.phase === "locked" && (
        <ContractorPayoutPanel contractor={open} approved={s.approved.includes(open.id)} paid={s.paid.includes(open.id)}
          onOpenChange={(o) => { if (!o) { set({ ...s, open: null }); emit("close", open.id); } }}
          onMarkPaid={() => {
            const paid = [...s.paid, open.id];
            set({ ...s, paid, open: null });
            emit("paid", open.id);
          }} />
      )}
      {s.confirm && (
        <LockPayoutDialog
          onOpenChange={(o) => { if (!o) set({ ...s, confirm: false }); }}
          onConfirm={() => { set({ ...s, confirm: false, phase: "locked" }); emit("lock"); }} />
      )}
    </>
  );
}
