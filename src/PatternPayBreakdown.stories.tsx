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

const Pending = () => <span className="inline-flex items-center h-4 px-1.5 rounded text-[9px] font-semibold uppercase tracking-wide bg-orange-100/80 dark:bg-orange-500/15 text-orange-600 dark:text-orange-400">pending</span>;
const Attach = ({ n }: { n: number }) => <span className="inline-flex shrink-0 items-center gap-0.5 text-[10px] text-muted-foreground/70"><Paperclip className="h-2.5 w-2.5" />{n}</span>;
const SectionHead = ({ label, count, open = true }: { label: string; count: number; open?: boolean }) => (
  <div className="flex items-center gap-1.5 pt-4 pb-1">
    {open ? <ChevronDown className="h-3 w-3 text-muted-foreground/60" /> : <ChevronRight className="h-3 w-3 text-muted-foreground/60" />}
    <span className="text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-widest">{label}</span>
    <span className="text-[10px] text-muted-foreground/50 ml-0.5">{count}</span>
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
      <div className="flex items-center justify-between pt-1">
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground/50 font-medium">Estimated net</span>
        <span className="text-2xl font-bold text-foreground tabular-nums tracking-tight">PHP 238,000</span>
      </div>

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
      <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-border/30">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-foreground leading-tight truncate">Maria Santos</span>
            <span className="text-base shrink-0">🇵🇭</span>
            <button className="flex items-center gap-1 px-2 py-0.5 text-[10px] text-muted-foreground border border-border/50 rounded-full hover:border-primary/40 hover:text-emphasis hover:bg-primary/5 transition-colors"><Plus className="h-2.5 w-2.5" /><span>Add</span></button>
          </div>
          <p className="text-[11px] text-muted-foreground/60 mt-0.5">Employee · Jan 1 – Jan 31</p>
        </div>
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
            <div className="flex items-center gap-2 pt-4 mt-2 border-t border-border/30">
              <Button variant="ghost" size="sm" className="flex-1 h-9 text-xs text-red-600 hover:bg-red-50 hover:text-red-700">Reject all (5)</Button>
              <Button size="sm" className="flex-1 h-9 text-xs">Approve all (5)</Button>
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
            <p className="text-[11px] text-muted-foreground/70 leading-relaxed pt-3">Amounts for Norway are calculated by the local vendor. Approve the inputs here — the final amount is captured at payout.</p>
            <div className="flex flex-col items-center gap-2 pt-4 mt-2 border-t border-border/30">
              <span className="inline-flex items-center justify-center gap-2 text-sm font-medium text-accent-green-text"><CheckCircle2 className="h-4 w-4" />Ready for payroll</span>
              <Button variant="outline" size="sm" className="mx-auto flex h-7 rounded-full px-3 text-xs text-muted-foreground gap-1"><RotateCcw className="h-3 w-3" />Undo</Button>
            </div>
          </Drawer>
        </div>
      </div>
      <p style={note}>rows py-2 · total pt-3 mt-1 border-t border-dashed · amounts font-mono tabular-nums · PENDING badge h-4 px-1.5 rounded bg-orange-100/80 text-orange-600 uppercase · attachment Paperclip+N · footer: Reject(ghost)/Approve(gradient) → Ready for payroll + Undo</p>
    </div>
  ),
};
