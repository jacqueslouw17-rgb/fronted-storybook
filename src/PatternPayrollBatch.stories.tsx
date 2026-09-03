import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Search, ChevronRight, ChevronDown, CheckCircle2, Plus, Loader2, Clock, Calendar } from "lucide-react";
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

const initials = (s: string) => s.split(" ").map((w) => w[0]).join("").slice(0, 2);

type Row = { n: string; c: string; a: string; status: "ready" | "pending"; count?: number };
const ROWS: Row[] = [
  { n: "Maria Santos", c: "🇵🇭 Philippines", a: "PHP 238,000", status: "pending", count: 8 },
  { n: "Priya Nair", c: "🇮🇳 India", a: "INR 342,000", status: "pending", count: 1 },
  { n: "Jonas Schmidt", c: "🇩🇪 Germany", a: "EUR 4,350", status: "ready" },
  { n: "Wei Tan", c: "🇸🇬 Singapore", a: "SGD 6,120", status: "ready" },
  { n: "Ana Sofía Reyes", c: "🇵🇭 Philippines", a: "PHP 168,000", status: "ready" },
];

/** Payroll row — verbatim from the live payroll list (also in Table & List). */
function PayrollRow({ r }: { r: Row }) {
  const pending = r.status === "pending";
  return (
    <div className="group flex items-center gap-3 px-4 sm:px-5 py-3 cursor-pointer hover:bg-muted/30 transition-colors">
      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-[11px] font-medium text-muted-foreground shrink-0">{initials(r.n)}</div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-foreground truncate">{r.n}</div>
        <div className="text-xs text-muted-foreground truncate">{r.c}</div>
      </div>
      <div className="flex items-center gap-2.5 shrink-0">
        <span className={cn("text-sm tabular-nums", r.a === "—" ? "text-muted-foreground" : "font-semibold text-foreground")}>{r.a}</span>
        {pending ? (
          <span className="flex items-center gap-1.5">
            {r.count ? <span className="h-4 min-w-4 px-1 rounded-full bg-amber-500 text-white text-[10px] font-semibold flex items-center justify-center tabular-nums">{r.count}</span> : null}
            <span className="text-xs font-medium text-amber-600">Pending</span>
          </span>
        ) : (
          <span className="flex items-center gap-1 text-emerald-600"><CheckCircle2 className="h-3.5 w-3.5" /><span className="text-xs font-medium">Ready</span></span>
        )}
        <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
      </div>
    </div>
  );
}

/** The batch selector trigger chip — verbatim: transparent centred button, pulsing amber dot. */
function BatchChip() {
  return (
    <button className="group flex items-center gap-2 px-2 py-1 rounded-md bg-transparent hover:bg-muted/40 transition-colors text-sm font-medium text-foreground">
      <span className="relative inline-flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-40 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
      </span>
      Monthly · Jan 2026<ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
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
    <div className="w-[360px] p-0 bg-popover/95 backdrop-blur-xl border border-border/60 rounded-xl shadow-2xl shadow-black/10 overflow-hidden">
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
        <div className="px-2 pb-2 space-y-0.5">
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

/** The batch container — header + row list. */
function BatchCard() {
  return (
    <div className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-subtle">
      <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 border-b border-border/40">
        <span className="text-xs text-muted-foreground">14 employees on payroll</span>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 h-8 w-48 rounded-md border border-input bg-background px-2.5 text-xs text-muted-foreground"><Search className="h-3.5 w-3.5" />Search…</div>
          <Button size="sm" className="h-8 text-xs bg-gradient-primary">Continue to payout</Button>
        </div>
      </div>
      <div className="divide-y divide-border/40">
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
        ["Ready", <div className="w-[280px]"><PayrollRow r={{ n: "Jonas Schmidt", c: "🇩🇪 Germany", a: "EUR 4,350", status: "ready" }} /></div>, "green ✓ · amount shown · included in payout"],
        ["Pending + count", <div className="w-[280px]"><PayrollRow r={{ n: "Maria Santos", c: "🇵🇭 Philippines", a: "PHP 238,000", status: "pending", count: 8 }} /></div>, "amber pill + count badge = open adjustments to resolve"],
        ["Manual", <div className="w-[280px]"><PayrollRow r={{ n: "Alex Hansen", c: "🇳🇴 Norway · Manual", a: "—", status: "pending", count: 4 }} /></div>, "amount “—” · “· Manual” in subtext · handled outside the auto-run"],
      ]} />
    </div>
  ),
};
