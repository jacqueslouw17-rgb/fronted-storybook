import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Search, ChevronRight, ChevronDown, CheckCircle2, Plus, Loader2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Payroll Batch (verbatim from F1 Fronted admin, Payroll tab).
 * The batch is the object above the payroll rows: a batch selector (Monthly / Fortnightly /
 * Off-cycle) with a lifecycle status (In review → Processing → Paid), a header
 * (N employees + search + Continue to payout), and the row list. Rows reuse the payroll row
 * documented in Components → Table & List.
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
  { n: "Alex Hansen", c: "🇳🇴 Norway · Manual", a: "—", status: "pending", count: 4 },
  { n: "Diego Hernández", c: "🇲🇽 Mexico · Manual", a: "—", status: "ready" },
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
            <span className="text-xs font-medium text-accent-amber-text">Pending</span>
          </span>
        ) : (
          <span className="flex items-center gap-1 text-accent-green-text"><CheckCircle2 className="h-3.5 w-3.5" /><span className="text-xs font-medium">Ready</span></span>
        )}
        <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
      </div>
    </div>
  );
}

/** Batch status dot + label — the batch lifecycle (distinct from the row status). */
function BatchStatus({ s }: { s: "review" | "processing" | "paid" }) {
  if (s === "review") return <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent-amber-text"><span className="h-2 w-2 rounded-full bg-amber-500" />In review</span>;
  if (s === "processing") return <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emphasis"><Loader2 className="h-3 w-3 animate-spin" />Processing</span>;
  return <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent-green-text"><CheckCircle2 className="h-3 w-3" />Paid</span>;
}

/** The batch selector chip (opens the selector below). */
function BatchChip() {
  return (
    <button className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-3.5 py-1.5 text-sm font-medium text-foreground hover:bg-muted/30">
      <span className="h-2 w-2 rounded-full bg-amber-500" />Monthly · Jan 2026<ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
    </button>
  );
}

/** The batch container — header + row list, for a given status. */
function BatchCard({ status = "review" as "review" | "processing" | "paid" }) {
  const locked = status !== "review";
  return (
    <div className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-subtle">
      <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 border-b border-border/40">
        <span className="text-xs text-muted-foreground">14 employees on payroll</span>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 h-8 w-48 rounded-md border border-input bg-background px-2.5 text-xs text-muted-foreground"><Search className="h-3.5 w-3.5" />Search…</div>
          {status === "review" && <Button size="sm" className="h-8 text-xs bg-gradient-primary">Continue to payout</Button>}
          {status === "processing" && <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emphasis px-2"><Loader2 className="h-3.5 w-3.5 animate-spin" />Processing payout…</span>}
          {status === "paid" && <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent-green-text px-2"><CheckCircle2 className="h-3.5 w-3.5" />Paid 30 Jan</span>}
        </div>
      </div>
      <div className={cn("divide-y divide-border/40", locked && "opacity-60 pointer-events-none")}>
        {ROWS.slice(0, 5).map((r) => <PayrollRow key={r.n} r={r} />)}
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
        lead={<>The object above the payroll rows in the Fronted admin. A batch has a <b>type</b> (Monthly / Fortnightly / Off-cycle), a <b>lifecycle status</b> (In review → Processing → Paid), a header (employee count + search + Continue to payout), and the row list. Rows are the payroll row from Components → Table &amp; List.</>}
        meta="Verbatim from F1 · Payroll tab (fronted-admin-dashboard-v6-1)"
      />

      <h3 style={eyebrow}>Batch — in review</h3>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}><BatchChip /></div>
      <BatchCard status="review" />
      <p style={{ ...note, marginTop: 10 }}>Chip ● Monthly · Jan 2026 (amber = in review) · header 14 employees on payroll + search + gradient Continue to payout · divided rows.</p>

      <h3 style={eyebrow}>Batch selector</h3>
      <div style={{ maxWidth: 360, border: "1px solid var(--ds-color-border)", borderRadius: 14, overflow: "hidden", background: "var(--ds-color-surface)", boxShadow: "var(--shadow-overlay)" }}>
        <div className="p-1.5">
          <div className="flex items-center justify-between rounded-lg px-3 py-2.5 bg-accent-amber-fill/25 border-l-2 border-amber-500">
            <div><div className="text-sm font-medium text-foreground">Monthly · Jan 2026</div><div className="text-[11px] text-muted-foreground">Pay date · 30 Jan</div></div>
            <BatchStatus s="review" />
          </div>
          <div className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-muted/40">
            <div><div className="text-sm font-medium text-foreground">Fortnightly · Jan 15–31</div><div className="text-[11px] text-muted-foreground">Pay date · 30 Jan</div></div>
            <BatchStatus s="review" />
          </div>
          <button className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border/70 px-3 py-2 text-xs font-medium text-emphasis hover:bg-muted/30"><Plus className="h-3.5 w-3.5" /> Create Off-Cycle Batch</button>
        </div>
        <div className="border-t border-border/40 px-3 pt-2 pb-1"><span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">History</span></div>
        <div className="px-1.5 pb-1.5">
          {[["Monthly · Dec 2025"], ["Monthly · Nov 2025"]].map(([l]) => (
            <div key={l} className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-muted/40"><span className="text-sm text-foreground">{l}</span><BatchStatus s="paid" /></div>
          ))}
        </div>
      </div>
      <p style={{ ...note, marginTop: 10 }}>Active batches (In review) on top · Create Off-Cycle Batch · History = settled (Paid). Selecting a batch loads its rows.</p>

      <h3 style={eyebrow}>Batch status (lifecycle)</h3>
      <DocTable head={["Status", "Example", "Meaning"]} w0={130} rows={[
        ["In review", <BatchStatus s="review" />, "Editable · rows being reviewed · Continue to payout available"],
        ["Processing", <BatchStatus s="processing" />, "Payout kicked off · batch locked while it runs (inferred — confirm live visual)"],
        ["Paid", <BatchStatus s="paid" />, "Settled · moves to History with the pay date"],
      ]} />

      <h3 style={eyebrow}>Batch types</h3>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["Monthly", "Fortnightly", "Off-cycle"].map((t) => (
          <span key={t} className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card px-3 py-1 text-xs font-medium text-foreground"><Clock className="h-3 w-3 text-muted-foreground" />{t}</span>
        ))}
      </div>
      <p style={{ ...note, marginTop: 10 }}>Monthly &amp; Fortnightly are recurring; Off-cycle is created on demand (Create Off-Cycle Batch) for an ad-hoc run — same list pattern.</p>

      <h3 style={eyebrow}>Row variants (reused from Table &amp; List)</h3>
      <DocTable head={["Variant", "Example", "Notes"]} w0={130} rows={[
        ["Ready", <div className="w-[280px]"><PayrollRow r={{ n: "Jonas Schmidt", c: "🇩🇪 Germany", a: "EUR 4,350", status: "ready" }} /></div>, "green ✓ · amount shown · included in payout"],
        ["Pending + count", <div className="w-[280px]"><PayrollRow r={{ n: "Maria Santos", c: "🇵🇭 Philippines", a: "PHP 238,000", status: "pending", count: 8 }} /></div>, "amber pill + count badge = open adjustments to resolve"],
        ["Manual", <div className="w-[280px]"><PayrollRow r={{ n: "Alex Hansen", c: "🇳🇴 Norway · Manual", a: "—", status: "pending", count: 4 }} /></div>, "amount “—” · “· Manual” in subtext · handled outside auto-run"],
      ]} />
    </div>
  ),
};
