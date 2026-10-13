import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Search, ChevronRight, ChevronDown, CheckCircle2, Plus, Loader2, Clock, Calendar, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Payroll Batch (verbatim from F1 Fronted admin, Payroll tab).
 * The batch is the object above the payroll rows: a batch selector (Active Runs → Off-cycle →
 * History) with a lifecycle status (In review → Processing → Paid), a header (N employees +
 * search + Continue to payout), and the row list. Markup lifted from the live DOM.
 */
const meta: Meta = { title: "Patterns/Payroll Batch", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const initials = (s: string) => s.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

type Row = { n: string; c: string; a: string; status: "ready" | "pending"; count?: number };
const ROWS: Row[] = [
  { n: "Maria Santos", c: "🇵🇭 Philippines", a: "PHP 238,000", status: "pending", count: 8 },
  { n: "Priya Nair", c: "🇮🇳 India", a: "INR 342,000", status: "pending", count: 1 },
  { n: "Jonas Schmidt", c: "🇩🇪 Germany", a: "EUR 4,350", status: "ready" },
  { n: "Wei Tan", c: "🇸🇬 Singapore", a: "SGD 6,120", status: "ready" },
  { n: "Ana Sofía Reyes", c: "🇵🇭 Philippines", a: "PHP 168,000", status: "ready" },
];

/** Payroll row — verbatim from the live payroll list DOM (white card, h-7 avatar,
 *  orange pending, accent-green Ready). Shared with Components → Table & List. */
function PayrollRow({ r }: { r: Row }) {
  const pending = r.status === "pending";
  const manual = r.a === "—";
  return (
    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-card border border-border/30 transition-colors hover:bg-muted/30 cursor-pointer group">
      <span className="relative flex shrink-0 overflow-hidden rounded-full h-7 w-7 flex-shrink-0">
        <span className="flex h-full w-full items-center justify-center rounded-full text-[10px] font-medium bg-muted text-muted-foreground">{initials(r.n)}</span>
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2"><span className="text-sm font-semibold truncate text-foreground">{r.n}</span></div>
        <div className="flex items-center gap-1.5 flex-wrap"><span className="text-[11px] text-muted-foreground leading-tight">{r.c}</span></div>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        {manual
          ? <p className="text-sm text-muted-foreground tabular-nums leading-tight text-right">—</p>
          : <div className="text-right"><p className="text-sm font-semibold text-foreground tabular-nums leading-tight">{r.a}</p></div>}
        {pending ? (
          <div className="flex items-center gap-1.5 text-xs text-orange-600">
            {r.count ? <span className="flex items-center justify-center h-4 w-4 rounded-full bg-orange-500/15 text-orange-600 text-[10px] font-semibold">{r.count}</span> : null}
            <span className="hidden sm:inline">Pending</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-xs text-accent-green-text"><CheckCircle2 className="h-3.5 w-3.5" /><span className="hidden sm:inline">Ready</span></div>
        )}
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
}

/** The batch selector trigger chip — verbatim: transparent centred button, pulsing amber dot. */
function BatchChip() {
  return (
    <button className="group flex items-center gap-2 px-1 py-1 rounded-md bg-transparent hover:bg-muted/40 transition-colors duration-150 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30">
      <span className="relative inline-flex">
        <span className="absolute inline-flex rounded-full opacity-40 animate-ping h-2.5 w-2.5 bg-amber-500" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
      </span>
      <span className="text-[15px] font-semibold text-foreground tracking-tight">Monthly · Jan 2026</span>
      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground transition-transform duration-200" />
    </button>
  );
}

/** A run row inside the selector — verbatim from the live dropdown markup. */
type Run = { type: string; date: string; pay?: string; status: "review" | "paid"; active?: boolean; history?: boolean };
function RunRow({ r }: { r: Run }) {
  return (
    <button className={cn("w-full flex items-center gap-3 rounded-lg text-left transition-all duration-150 ease-out hover:bg-muted/60",
      r.history ? "px-3 py-2" : "px-3 py-2.5", r.active && "bg-amber-500/[0.06] ring-1 ring-amber-500/15")}>
      <div className={cn("w-[3px] self-stretch rounded-full shrink-0 transition-colors", r.active ? "bg-amber-500" : "bg-transparent")} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className={cn("text-[13px]", r.active ? "font-semibold text-foreground" : r.history ? "font-medium text-foreground/70" : "font-semibold text-foreground/85")}>{r.type}</span>
          <span className="text-muted-foreground/40">·</span>
          <span className={cn("text-[13px]", r.active ? "font-medium text-foreground" : r.history ? "text-muted-foreground" : "font-medium text-foreground/70")}>{r.date}</span>
        </div>
        {!r.history && (
          <div className="flex items-center gap-1 mt-0.5">
            <Calendar className="h-3 w-3 text-muted-foreground/50" />
            <span className="text-[11px] text-muted-foreground/70">Pay date: {r.pay}</span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        {r.status === "review" ? (
          <>
            <span className="relative inline-flex">
              <span className="absolute inline-flex rounded-full opacity-40 animate-ping h-2 w-2 bg-amber-500" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <span className="text-[11px] font-medium text-amber-600">In review</span>
          </>
        ) : (
          <>
            <span className="relative inline-flex"><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" /></span>
            <span className="text-[11px] font-medium text-emerald-600">Paid</span>
          </>
        )}
      </div>
    </button>
  );
}

/** The batch selector dropdown — verbatim from the live DOM. */
function BatchSelectorPanel() {
  const label = "text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-[0.08em]";
  return (
    <div className="w-[360px] max-w-full p-0 bg-popover/95 backdrop-blur-xl border border-border/60 rounded-xl shadow-2xl shadow-black/10 overflow-hidden max-h-[420px] overflow-y-auto overscroll-contain">
      <div>
        <div className="px-4 pt-3 pb-1.5"><span className={label}>Active Runs</span></div>
        <div className="px-2 pb-2 space-y-0.5">
          <RunRow r={{ type: "Fortnightly", date: "Jan 1–14", pay: "15 Jan", status: "review" }} />
          <RunRow r={{ type: "Monthly", date: "Jan 2026", pay: "30 Jan", status: "review", active: true }} />
          <RunRow r={{ type: "Fortnightly", date: "Jan 15–31", pay: "30 Jan", status: "review" }} />
        </div>
      </div>
      <div className="mx-4 border-t border-border/40" />
      <div className="px-3 py-2.5">
        <button className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-[13px] font-medium text-violet-600 border border-dashed border-violet-300/50 hover:bg-violet-50/60 transition-all duration-150"><Plus className="h-3.5 w-3.5" />Create Off-Cycle Batch</button>
      </div>
      <div className="mx-4 border-t border-border/40" />
      <div>
        <div className="px-4 pt-2.5 pb-1.5"><span className={label}>History</span></div>
        <div className="px-2 pb-2 space-y-0.5 max-h-[180px] overflow-y-auto overscroll-contain">
          <RunRow r={{ type: "Monthly", date: "Dec 2025", status: "paid", history: true }} />
          <RunRow r={{ type: "Monthly", date: "Nov 2025", status: "paid", history: true }} />
        </div>
      </div>
    </div>
  );
}

/** Batch status dot + label — the batch lifecycle (raw amber/emerald, as live). */
function BatchStatus({ s }: { s: "review" | "processing" | "paid" }) {
  if (s === "review") return <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-amber-600"><span className="h-2 w-2 rounded-full bg-amber-500" />In review</span>;
  if (s === "processing") return <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emphasis"><Loader2 className="h-3 w-3 animate-spin" />Processing</span>;
  return <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600"><span className="h-2 w-2 rounded-full bg-emerald-500" />Paid</span>;
}

/** The batch container — header (count + search + Continue) then the spaced white-card rows.
 *  Container padding + spacing verbatim from live: p-3 sm:p-4 space-y-1.5. */
function BatchCard() {
  return (
    <div className="w-full rounded-xl border border-border/40 bg-card/20 !shadow-none overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 sm:px-5 pt-4 pb-3 border-b border-border/40">
        <div className="flex items-center gap-2 min-w-0"><span className="text-xs font-medium text-muted-foreground">14 employees on payroll</span></div>
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-44">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input placeholder="Search…" className="flex w-full rounded-md border pl-8 pr-3 h-8 text-xs bg-background/50 border-border/30 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
          </div>
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium rounded-md px-2.5 h-8 text-xs w-full sm:w-auto bg-gradient-primary text-primary-foreground hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 transition-all">Continue to payout</button>
        </div>
      </div>
      <div className="p-3 sm:p-4 space-y-1.5">
        {ROWS.map((r) => <PayrollRow key={r.n} r={r} />)}
      </div>
    </div>
  );
}

export const PayrollBatch: Story = {
  name: "Payroll Batch",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        status="Stable"
        title="Payroll Batch"
        lead={<>The object above the payroll rows in the Fronted admin. A batch has a <b>type</b> (Monthly / Fortnightly / Off-cycle), a <b>lifecycle status</b> (In review → Processing → Paid), a header (employee count + search + Continue to payout) and the row list. Markup lifted verbatim from the live payroll DOM.</>}
        meta="Verbatim from F1 · Payroll tab (fronted-admin-dashboard-v6-1)"
      />

      <h3 style={eyebrow}>Batch — in review</h3>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}><BatchChip /></div>
      <BatchCard />
      <p style={{ ...note, marginTop: 10 }}>Trigger is a plain centred chip (pulsing amber dot = in review) · header 14 employees on payroll + search + gradient Continue to payout · divided rows.</p>

      <h3 style={eyebrow}>Batch selector (dropdown)</h3>
      <BatchSelectorPanel />
      <p style={{ ...note, marginTop: 10 }}>Active Runs (In review — active run gets an amber left line + amber/6% fill + amber ring) · Create Off-Cycle Batch (violet, dashed) · History (Paid, emerald). Hairline dividers between groups.</p>

      <h3 style={eyebrow}>Batch status (lifecycle)</h3>
      <DocTable head={["Status", "Example", "Meaning"]} w0={130} rows={[
        ["In review", <BatchStatus s="review" />, "Editable · rows being reviewed · Continue to payout available · amber"],
        ["Processing", <BatchStatus s="processing" />, "Payout kicked off · batch locked while it runs (inferred — confirm live visual)"],
        ["Paid", <BatchStatus s="paid" />, "Settled · moves to History with the pay date · emerald"],
      ]} />

      <h3 style={eyebrow}>Batch types</h3>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[{ t: "Monthly" }, { t: "Fortnightly" }, { t: "Off-cycle", purple: true }].map(({ t, purple }) => (
          <span key={t} className={cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
            purple ? "border-violet-300/50 bg-violet-50/60 text-violet-600" : "border-border/60 bg-card text-foreground")}>
            <Clock className={cn("h-3 w-3", purple ? "text-violet-600" : "text-muted-foreground")} />{t}
          </span>
        ))}
      </div>
      <p style={{ ...note, marginTop: 10 }}>Monthly &amp; Fortnightly are recurring; <b>Off-cycle is created on demand and carries the violet treatment</b> — same list pattern, ad-hoc run.</p>

      <h3 style={eyebrow}>Row variants (reused from Table &amp; List)</h3>
      <DocTable head={["Variant", "Example", "Notes"]} w0={130} rows={[
        ["Ready", <div className="w-[280px] max-w-full"><PayrollRow r={{ n: "Jonas Schmidt", c: "🇩🇪 Germany", a: "EUR 4,350", status: "ready" }} /></div>, "green ✓ · amount shown · included in payout"],
        ["Pending + count", <div className="w-[280px] max-w-full"><PayrollRow r={{ n: "Maria Santos", c: "🇵🇭 Philippines", a: "PHP 238,000", status: "pending", count: 8 }} /></div>, "amber pill + count badge = open adjustments to resolve"],
        ["Manual", <div className="w-[280px] max-w-full"><PayrollRow r={{ n: "Alex Hansen", c: "🇳🇴 Norway · Manual", a: "—", status: "pending", count: 4 }} /></div>, "amount “—” · “· Manual” in subtext · handled outside the auto-run"],
      ]} />

      <h3 style={eyebrow}>Adjustments in payroll (admin review)</h3>
      <p style={{ ...note, marginTop: 0, marginBottom: 12 }}>Opening a worker with a count badge shows their pay-breakdown drawer, where submitted adjustments appear as Earnings / Deductions line items — the <b>same expandable display</b> as the worker dashboard (an Expense expands to its items), each carrying a <b>pending</b> badge and a signed <code>font-mono</code> amount, with Approve-all / Reject-all at the foot.</p>
      <div style={{ display: "flex", justifyContent: "center", padding: "4px 0" }}>
        <div className="w-[440px] max-w-full rounded-lg border border-border bg-background shadow-overlay overflow-hidden">
          <div className="px-5 pt-4 pb-3 border-b border-border/30">
            <div className="flex items-center gap-2"><span className="text-base font-semibold text-foreground">Maria Santos</span><span>🇵🇭</span></div>
            <p className="text-[11px] text-muted-foreground/60 mt-0.5">Employee · Jan 1 – Jan 31</p>
          </div>
          <div className="p-5 space-y-4">
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground/70">Estimated net</p>
              <p className="text-2xl font-bold text-foreground tabular-nums">PHP 238,000</p>
            </div>

            {/* Earnings */}
            <div>
              <div className="flex items-center justify-between mb-2"><span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Earnings</span><span className="text-[10px] text-muted-foreground/60 tabular-nums">4</span></div>
              <div className="space-y-1.5">
                {/* Expense — expandable */}
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 min-w-0">
                      <span className="text-sm font-semibold text-foreground truncate">NY trip</span>
                      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/60 rotate-180" />
                      <div className="flex items-center gap-1.5 ml-1">
                        <span className="text-[10px] font-medium text-orange-500 dark:text-orange-400">2 pending</span>
                        <span className="text-[10px] text-muted-foreground/50">2 items</span>
                      </div>
                    </div>
                    <span className="text-sm tabular-nums font-mono text-foreground shrink-0">+₱8,500.00</span>
                  </div>
                  <div className="mt-1 space-y-0.5">
                    {([["Travel", 3, "+₱5,200.00"], ["Meals", 2, "+₱3,300.00"]] as [string, number, string][]).map(([cat, att, amt]) => (
                      <div key={cat} className="rounded-md hover:bg-muted border border-transparent">
                        <div className="flex items-center gap-2.5 pl-2.5 pr-2 py-1">
                          <div className="flex-1 min-w-0"><div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-foreground">{cat}</span>
                            <span className="inline-flex items-center h-4 px-1.5 rounded text-[9px] font-semibold uppercase tracking-wide bg-orange-100/80 dark:bg-orange-500/15 text-orange-600 dark:text-orange-400">pending</span>
                            <span className="text-[10px] text-muted-foreground/50 flex items-center gap-0.5"><Paperclip className="h-2.5 w-2.5" /> {att}</span>
                          </div></div>
                          <span className="text-xs tabular-nums font-mono font-medium text-foreground shrink-0">{amt}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Bonus — flat */}
                <div className="flex items-center justify-between px-0.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-sm font-medium text-foreground truncate">Q2 delivery bonus</span>
                    <span className="inline-flex items-center h-4 px-1.5 rounded text-[9px] font-semibold uppercase tracking-wide bg-orange-100/80 dark:bg-orange-500/15 text-orange-600 dark:text-orange-400">pending</span>
                  </div>
                  <span className="text-sm tabular-nums font-mono text-foreground shrink-0">+PHP 6,500.00</span>
                </div>
              </div>
            </div>

            {/* Deductions */}
            <div>
              <div className="flex items-center justify-between mb-2"><span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Deductions</span><span className="text-[10px] text-muted-foreground/60 tabular-nums">2</span></div>
              <div className="flex items-center justify-between px-0.5">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm font-medium text-foreground truncate">Overtime</span>
                  <span className="inline-flex items-center h-4 px-1.5 rounded text-[9px] font-semibold uppercase tracking-wide bg-orange-100/80 dark:bg-orange-500/15 text-orange-600 dark:text-orange-400">pending</span>
                  <span className="text-[11px] text-muted-foreground/70 truncate hidden sm:inline">Mixed · Exceeded daily threshold · 12h</span>
                </div>
                <span className="text-sm tabular-nums font-mono text-foreground shrink-0">+PHP 0.00</span>
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-border/40">
              <Button variant="outline" size="sm" className="flex-1 h-8 text-xs">Reject all (11)</Button>
              <Button size="sm" className="flex-1 h-8 text-xs">Approve all (11)</Button>
            </div>
          </div>
        </div>
      </div>
      <p style={{ ...note, marginTop: 10 }}>Line item name text-sm font-semibold + ChevronDown · “N pending” text-orange-500 + “N items” text-muted-foreground/50 · signed amount font-mono · sub-item pending badge bg-orange-100/80 text-orange-600 h-4 px-1.5 + Paperclip count · footer Reject all / Approve all.</p>
    </div>
  ),
};
