import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Paperclip, CheckCircle2, RotateCcw, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import "./tokens.css";
import "./typography.css";
import { PageHeader } from "./_docTable";

/**
 * Patterns — Pay Breakdown drawer (live F1 payroll approval).
 * Opened from a payroll row. Header shows the worker + estimated net; collapsible
 * EARNINGS / DEDUCTIONS / OVERTIME sections carry a count; line items show a small
 * PENDING badge or a green ✓ (approved), plus an attachment chip; deductions are
 * negative. Footer has two states: Reject all / Approve all → Ready for payroll · Undo.
 */
const meta: Meta = { title: "Patterns/Pay Breakdown", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const wrap: React.CSSProperties = { fontFamily: "var(--ds-font-body)", color: "var(--ds-color-text)", maxWidth: 940, padding: 4 };
const eyebrow: React.CSSProperties = { fontSize: 12, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", margin: "28px 0 12px", fontWeight: 600 };
const note: React.CSSProperties = { fontFamily: "var(--ds-font-mono)", fontSize: 11, color: "var(--ds-color-text-muted)", marginTop: 10 };

const Pending = () => <span className="inline-flex items-center h-4 px-1.5 rounded text-[9px] font-semibold uppercase tracking-wide bg-orange-100/80 text-orange-600">pending</span>;
const Attach = ({ n }: { n: number }) => <span className="inline-flex shrink-0 items-center gap-0.5 text-[10px] text-muted-foreground/70"><Paperclip className="h-2.5 w-2.5" />{n}</span>;
const SectionHead = ({ label, count, open = true }: { label: string; count: number; open?: boolean }) => (
  <div className="flex items-center gap-1.5 pt-4 pb-1">
    {open ? <ChevronDown className="h-3 w-3 text-muted-foreground" /> : <ChevronRight className="h-3 w-3 text-muted-foreground" />}
    <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">{label}</span>
    <span className="text-[10px] text-muted-foreground/60">{count}</span>
  </div>
);

/** Line item — verbatim spacing from F1v6_SubmissionsView (py-2 rows, dashed total, font-mono amounts). */
function Row({ label, amount, total, extra }: { label: React.ReactNode; amount: string; total?: boolean; extra?: React.ReactNode }) {
  return (
    <div className={cn("flex items-center justify-between py-2", total && "pt-3 mt-1 border-t border-dashed border-border/50")}>
      <span className={cn("flex items-center gap-2 truncate", total ? "text-sm font-medium text-foreground" : "text-sm text-muted-foreground")}>{label}{extra}</span>
      <span className={cn("whitespace-nowrap tabular-nums text-right font-mono shrink-0 ml-4", total ? "text-sm font-semibold text-foreground" : "text-sm text-foreground")}>{amount}</span>
    </div>
  );
}

/** The drawer body — reused for both footer states. */
function Body() {
  return (
    <>
      <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70 pt-1">Estimated net</div>
      <div className="text-2xl font-bold tabular-nums font-mono">PHP 238,000</div>

      <SectionHead label="Earnings" count={4} />
      <div>
        <Row label="Base salary" amount="PHP 280,000.00" />
        <Row label={<>NY trip <span className="text-[11px] text-muted-foreground">2 pending · 2 items</span></>} amount="+₱8,500.00" />
        <div className="pl-4"><Row label="Travel" amount="+₱5,200.00" extra={<><Pending /><Attach n={3} /></>} /></div>
        <div className="pl-4"><Row label="Meals" amount="+₱3,300.00" extra={<><Pending /><Attach n={2} /></>} /></div>
        <Row label="Q2 delivery bonus" amount="+PHP 6,500.00" extra={<><Pending /><Attach n={1} /></>} />
        <Row label="Total earnings" amount="PHP 280,000.00" total />
      </div>

      <SectionHead label="Deductions" count={2} />
      <div>
        <Row label="Income Tax" amount="−PHP 28,000.00" />
        <Row label="Social Security" amount="−PHP 14,000.00" />
        <Row label="Total deductions" amount="−PHP 42,000.00" total />
      </div>
    </>
  );
}

function Drawer({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-[380px] rounded-xl border border-border/40 bg-card overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border/40">
        <div><div className="flex items-center gap-2"><span className="font-semibold">Maria Santos</span><span>🇵🇭</span><button className="text-xs text-emphasis inline-flex items-center gap-0.5"><Plus className="h-3 w-3" />Add</button></div><p className="text-xs text-muted-foreground mt-0.5">Employee · Jan 1 – Jan 31</p></div>
        <button className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
      </div>
      <div className="px-5 pb-4 flex-1">{children}</div>
    </div>
  );
}

export const PayBreakdown: Story = {
  name: "Pay Breakdown",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        title="Pay Breakdown drawer"
        lead={<>
        The payroll approval drawer (live F1). Collapsible sections with counts, line items with a PENDING badge
        or green ✓ and an attachment chip, negative deductions, and two footer states.
        </>}
      />

      <div style={{ display: "flex", gap: 28, flexWrap: "wrap", alignItems: "flex-start" }}>
        <div>
          <h3 style={eyebrow}>Pending — Reject all / Approve all</h3>
          <Drawer>
            <Body />
            <div className="flex items-center justify-between gap-2 pt-4 mt-2 border-t border-border/40">
              <Button variant="ghost" size="sm" className="h-9 text-xs text-muted-foreground hover:text-destructive flex-1">Reject all (5)</Button>
              <Button size="sm" className="h-9 text-xs bg-gradient-primary flex-1">Approve all (5)</Button>
            </div>
          </Drawer>
        </div>

        <div>
          <h3 style={eyebrow}>Ready — items approved, Undo</h3>
          <Drawer>
            <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70 pt-1">Earnings</div>
            <div className="space-y-1.5 text-sm mt-1">
              <div className="flex items-center justify-between"><span className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-accent-green-text" />Parking · Expense</span><span className="tabular-nums">NOK 750.00</span></div>
              <div className="flex items-center justify-between"><span className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-accent-green-text" />Mixed · Overtime 12h</span><span className="tabular-nums text-muted-foreground">Jan 11</span></div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mt-4">Amounts for Norway are calculated by the local vendor. Approve the inputs here — the final amount is captured at payout.</p>
            <div className="flex flex-col items-center gap-2 pt-4 mt-2 border-t border-border/40">
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-green-text"><CheckCircle2 className="h-4 w-4" />Ready for payroll</span>
              <Button variant="outline" size="sm" className="h-8 text-xs gap-1"><RotateCcw className="h-3 w-3" />Undo</Button>
            </div>
          </Drawer>
        </div>
      </div>
      <p style={note}>rows py-2 · total pt-3 mt-1 border-t border-dashed · amounts font-mono tabular-nums · PENDING badge h-4 px-1.5 rounded bg-orange-100/80 text-orange-600 uppercase · attachment Paperclip+N · footer: Reject(ghost)/Approve(gradient) → Ready for payroll + Undo</p>
    </div>
  ),
};
