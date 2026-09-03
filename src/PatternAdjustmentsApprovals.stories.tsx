import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Check, X, Sparkles, Paperclip, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import { cn } from "@/lib/utils";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Adjustments & Approvals (verbatim from the LIVE F4.1 / F4.2 dashboards).
 * One shared list-row molecule used across the worker's Adjustments list, the manager's
 * Approvals table, and the contractor's Additions/Deductions. Each row shows Type · detail with
 * type-specific affordances: an expandable items list (Expense), an expandable "N included"
 * coverage list (Per diem), and an attachment-count popover trigger. Row tint carries status —
 * rejected = destructive, approved = accent-green. Captured verbatim from the live DOM.
 */
const meta: Meta = { title: "Patterns/Adjustments & Approvals", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

type RowState = "pending" | "approved" | "rejected";
const rowShell = (s: RowState) => cn(
  "group rounded-lg border transition-colors duration-200",
  s === "rejected" ? "border-destructive/20 bg-destructive/[0.03] hover:bg-destructive/[0.06]"
    : s === "approved" ? "border-accent-green/25 bg-accent-green/[0.04] hover:bg-accent-green/[0.08]"
      : "border-border/30 bg-card hover:bg-muted/30");

const sep = <span className="text-muted-foreground/40 text-xs hidden sm:inline shrink-0">·</span>;
const typeCls = "text-xs font-semibold text-foreground truncate shrink-0 max-w-[55%]";
const detailCls = "text-xs text-muted-foreground truncate hidden sm:inline min-w-0 flex-1";

function AttBtn({ n }: { n: number }) {
  return <button className="inline-flex items-center gap-0.5 rounded px-1 py-0.5 text-[11px] tabular-nums text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0" aria-label={`${n} attachment${n > 1 ? "s" : ""}`}><Paperclip className="h-2.5 w-2.5" />{n}</button>;
}
function ExpBtn({ children }: { children: React.ReactNode }) {
  return <button className="group/exp min-w-0 flex items-center gap-1.5 rounded text-left text-xs transition-colors shrink-0">{children}<ChevronDown className="h-3 w-3 text-muted-foreground/60 rotate-180" /></button>;
}
function Right({ date, state }: { date: string; state: RowState }) {
  return (
    <div className="shrink-0 self-center flex items-center gap-3 sm:gap-2">
      <span className="hidden sm:inline w-[64px] text-right text-[11px] text-muted-foreground tabular-nums whitespace-nowrap">{date}</span>
      {state === "pending"
        ? <button className="p-1 rounded transition-all shrink-0 group/x hover:bg-destructive/10" aria-label="Withdraw request"><X className="h-3.5 w-3.5 text-muted-foreground" /></button>
        : <span className={cn("shrink-0 self-center text-right text-[11px] font-medium whitespace-nowrap", state === "approved" ? "text-accent-green-text" : "text-destructive/80")}>{state === "approved" ? "Admin approved" : "Admin rejected"}</span>}
    </div>
  );
}

/* Expanded item rows */
function ExpenseItems({ items }: { items: [string, number, string][] }) {
  return (
    <div className="space-y-0 pl-3 pr-2 pb-2">
      {items.map(([cat, att, amt]) => (
        <div key={cat} className="flex items-center gap-2.5 pl-2.5 pr-2 py-0.5 rounded-md hover:bg-muted/50 transition-colors w-fit max-w-full">
          <span className="min-w-0 truncate text-xs text-muted-foreground shrink">{cat}</span>
          <AttBtn n={att} />
          <span className="shrink-0 text-xs tabular-nums font-mono text-foreground/80">{amt}</span>
        </div>
      ))}
    </div>
  );
}
function IncludedItems({ items }: { items: string[] }) {
  return (
    <div className="space-y-0 pl-3 pr-2 pb-2">
      {items.map((i) => (
        <div key={i} className="flex w-fit max-w-full items-center gap-2.5 rounded-md py-0.5 pl-2.5 pr-2 transition-colors hover:bg-muted/50"><span className="min-w-0 truncate text-xs text-muted-foreground">{i}</span></div>
      ))}
    </div>
  );
}

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-xl border border-border/40 shadow-none bg-card/20 overflow-hidden"><div className="p-4 sm:p-5">{children}</div></div>
);
function TabBar({ tabs, active }: { tabs: string[]; active: string }) {
  return (
    <div className="h-8 bg-muted/30 p-0.5 rounded-md inline-flex items-center justify-start gap-0.5">
      {tabs.map((t) => <span key={t} className={cn("text-xs h-7 px-3 inline-flex items-center rounded-sm whitespace-nowrap", t === active ? "bg-primary/[0.08] text-emphasis border border-primary/30" : "text-muted-foreground")}>{t}</span>)}
    </div>
  );
}

export const AdjustmentsApprovals: Story = {
  name: "Adjustments & Approvals",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        status="Stable"
        title="Adjustments & Approvals"
        lead={<>The shared adjustment row used across the F4.1 / F4.2 dashboards. Every row is <strong>Type · detail</strong>; some types add affordances — Expense expands to an itemised list, Per diem expands to an “N included” coverage list, and any row can carry an attachment-count popover trigger. The row tint carries status. The worker sees a withdraw action, the manager sees checkboxes + inline approve / reject, and contractors see Addition / Deduction. Captured verbatim from the live prototypes.</>}
        meta="Verbatim from live F4.1 / F4.2 · Adjustments & Approvals"
      />

      {/* ── Employee adjustments — one of each type ── */}
      <h3 style={eyebrow}>Adjustments list (employee) — every type</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
        <div className="w-[640px] max-w-full">
          <Card>
            <div className="flex items-center justify-between gap-2 mb-4">
              <TabBar tabs={["Pending (6)", "Approved (1)", "Rejected (1)"]} active="Pending (6)" />
              <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs">Request adjustment</Button>
            </div>
            <div className="space-y-1.5">

              {/* Leave */}
              <div className={rowShell("pending")}>
                <div className="flex items-center gap-3 px-3 py-2.5">
                  <div className="flex-1 min-w-0 pr-2 flex items-center gap-2">
                    <span className={typeCls}>Paid leave</span>{sep}
                    <span className={detailCls} title="Paid leave · 2 days · 22 Feb 2026 – 23 Feb 2026">Paid leave · 2 days · 22 Feb 2026 – 23 Feb 2026</span>
                    <AttBtn n={1} />
                  </div>
                  <Right date="22 Jan" state="pending" />
                </div>
              </div>

              {/* Expense — multi-item, expanded */}
              <div className={rowShell("pending")}>
                <div className="flex items-center gap-3 px-3 py-2.5">
                  <div className="flex-1 min-w-0 pr-2 flex items-center gap-2">
                    <span className={typeCls}>Expense</span>{sep}
                    <ExpBtn><span className="truncate font-medium text-foreground/80">NY trip</span><span className="shrink-0 text-muted-foreground/80">· 2 items</span></ExpBtn>
                    <AttBtn n={5} />
                  </div>
                  <Right date="2 Mar" state="pending" />
                </div>
                <ExpenseItems items={[["Travel", 3, "PHP 5,200"], ["Meals", 2, "PHP 3,300"]]} />
              </div>

              {/* Expense — single line */}
              <div className={rowShell("pending")}>
                <div className="flex items-center gap-3 px-3 py-2.5">
                  <div className="flex-1 min-w-0 pr-2 flex items-center gap-2">
                    <span className={typeCls}>Client dinner expense</span>{sep}
                    <span className={detailCls} title="Meals · PHP 6,350">Meals · PHP 6,350</span>
                    <AttBtn n={1} />
                  </div>
                  <Right date="1 Mar" state="pending" />
                </div>
              </div>

              {/* Bonus */}
              <div className={rowShell("pending")}>
                <div className="flex items-center gap-3 px-3 py-2.5">
                  <div className="flex-1 min-w-0 pr-2 flex items-center gap-2">
                    <span className={typeCls}>Bonus</span>{sep}
                    <span className={detailCls} title="Q4 performance bonus · PHP 12,000">Q4 performance bonus · PHP 12,000</span>
                    <AttBtn n={1} />
                  </div>
                  <Right date="18 Feb" state="pending" />
                </div>
              </div>

              {/* Per diem — expanded coverage */}
              <div className={rowShell("pending")}>
                <div className="flex items-center gap-3 px-3 py-2.5">
                  <div className="flex-1 min-w-0 pr-2 flex items-center gap-2">
                    <span className={typeCls}>Per diem</span>{sep}
                    <span className={detailCls} title="Manila, Philippines · 3 days · 10–12 Feb 2026">Manila, Philippines · 3 days · 10–12 Feb 2026</span>{sep}
                    <ExpBtn><span className="shrink-0 text-muted-foreground/80">4 included</span></ExpBtn>
                  </div>
                  <Right date="13 Feb" state="pending" />
                </div>
                <IncludedItems items={["Breakfast provided", "Lunch provided", "Dinner provided", "Hotel booked"]} />
              </div>

              {/* Overtime */}
              <div className={rowShell("pending")}>
                <div className="flex items-center gap-3 px-3 py-2.5">
                  <div className="flex-1 min-w-0 pr-2 flex items-center gap-2">
                    <span className={typeCls}>Overtime</span>{sep}
                    <span className={detailCls} title="Weekday OT · Client deadline · 8h · 11 Jan 2026">Weekday OT · Client deadline · 8h · 11 Jan 2026</span>
                  </div>
                  <Right date="11 Jan" state="pending" />
                </div>
              </div>

              {/* Other / Deduction */}
              <div className={rowShell("pending")}>
                <div className="flex items-center gap-3 px-3 py-2.5">
                  <div className="flex-1 min-w-0 pr-2 flex items-center gap-2">
                    <span className={typeCls}>Deduction</span>{sep}
                    <span className={detailCls} title="Personal use of company phone plan · PHP 1,800">Personal use of company phone plan · PHP 1,800</span>
                  </div>
                  <Right date="20 Feb" state="pending" />
                </div>
              </div>

              {/* rejected example with reason */}
              <div className={rowShell("rejected")}>
                <div className="flex items-center gap-3 px-3 py-2.5">
                  <div className="flex-1 min-w-0 pr-2 flex items-center gap-2">
                    <span className={typeCls}>Deduction</span>{sep}
                    <span className={detailCls} title="Uniform cost · PHP 900">Uniform cost · PHP 900</span>
                  </div>
                  <Right date="9 Feb" state="rejected" />
                </div>
                <div className="px-2.5 pb-2 pt-0.5"><p className="text-xs text-destructive/80 bg-destructive/5 rounded px-2 py-1.5 border-l-2 border-destructive/30">Not an eligible deduction for this cycle.</p></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <p style={{ ...note, marginTop: 4 }}>Row group rounded-lg border · type font-semibold max-w-[55%] · detail truncate w/ title tooltip · Expense = group/exp expander (“NY trip · 2 items”) → items pl-3 (category · attachment · font-mono amount) · Per diem = group/inc expander (“4 included”) → coverage list · attachment = popover trigger px-1 py-0.5 · right w-[64px] date + withdraw X (hover, hover:bg-destructive/10).</p>

      {/* ── Approvals table (manager) ── */}
      <h3 style={eyebrow}>Approvals table (manager)</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
        <div className="w-[640px] max-w-full">
          <Card>
            <div className="flex items-center justify-between gap-2 mb-4">
              <TabBar tabs={["Pending (7)", "Approved (4)", "Rejected (1)"]} active="Pending (7)" />
              <Button size="sm" className="h-7 px-2.5 text-xs">Approve</Button>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 rounded-lg border border-border/30 bg-muted/20 px-3 py-2 mb-1.5 hover:bg-muted/40 transition-colors">
              <Checkbox className="h-4 w-4 shrink-0 rounded-[4px] border-border [&_svg]:h-3 [&_svg]:w-3" />
              <span className="text-[11px] font-medium text-muted-foreground">Select all (7)</span>
            </div>
            <div className="space-y-1.5">
              {[["John Doe · Expense", "NY trip · 2 items", "2 Mar", 5], ["Ana Santos · Paid leave", "2 days · 22 Feb 2026 – 23 Feb 2026", "15 Jan", 0], ["Liza Reyes · Overtime", "Weekday OT · Client deadline · 8h", "18 Jan", 0]].map(([who, detail, date, att]) => (
                <div key={who as string} className={rowShell("pending") + " cursor-pointer"}>
                  <div className="flex items-center gap-3 px-3 py-2.5">
                    <Checkbox className="h-4 w-4 shrink-0 rounded-[4px] border-border [&_svg]:h-3 [&_svg]:w-3" />
                    <div className="flex-1 min-w-0 pr-2 flex items-center gap-2">
                      <span className={typeCls}>{who}</span>{sep}
                      <span className={detailCls} title={detail as string}>{detail}</span>
                      {(att as number) > 0 && <AttBtn n={att as number} />}
                    </div>
                    <div className="shrink-0 self-center flex items-center gap-2">
                      <span className="text-[11px] text-muted-foreground tabular-nums whitespace-nowrap">{date}</span>
                      <div className="flex items-center justify-end gap-1 sm:w-[72px]">
                        <button className="p-1 rounded transition-colors text-muted-foreground hover:text-foreground hover:bg-muted" aria-label="Approve"><Check className="h-3.5 w-3.5" /></button>
                        <button className="p-1 rounded transition-colors text-muted-foreground hover:text-foreground hover:bg-muted" aria-label="Reject"><X className="h-3.5 w-3.5" /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      <p style={{ ...note, marginTop: 4 }}>Same row molecule + leading Checkbox (pending) · select-all bar bg-muted/20 · bulk Approve Button h-7 · inline actions button p-1 hover:bg-muted (Check / X) · decided rows use the accent-green / destructive DecisionLabel.</p>

      {/* ── Contractor ── */}
      <h3 style={eyebrow}>Adjustments list (contractor)</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
        <div className="w-[640px] max-w-full">
          <Card>
            <div className="flex items-center justify-between gap-2 mb-4">
              <TabBar tabs={["Pending (4)", "Approved (2)", "Rejected (1)"]} active="Pending (4)" />
              <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs">Request adjustment</Button>
            </div>
            <div className="space-y-1.5">
              {[["Addition", "Client dinner at City Restaurant, Chicago · EUR 109", "2 Mar", 1], ["Addition", "Extra project milestone delivered ahead of schedule · EUR 1,500", "1 Mar", 0], ["Deduction", "Overbilled hours in December invoice · -EUR 240", "20 Feb", 1]].map(([type, detail, date, att]) => (
                <div key={detail as string} className={rowShell("pending")}>
                  <div className="flex items-center gap-3 px-3 py-2.5">
                    <div className="flex-1 min-w-0 pr-2 flex items-center gap-2">
                      <span className={typeCls}>{type}</span>{sep}
                      <span className={detailCls} title={detail as string}>{detail}</span>
                      {(att as number) > 0 && <AttBtn n={att as number} />}
                    </div>
                    <Right date={date as string} state="pending" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      <p style={{ ...note, marginTop: 4 }}>Contractor uses only Addition / Deduction — flat description · amount (deductions negative, e.g. -EUR 240), attachment popover, no leave/per-diem/expense expanders.</p>

      <h3 style={eyebrow}>Empty states</h3>
      <p style={{ ...note, marginTop: 0, marginBottom: 10 }}>Two real states: a plain <b>per-tab label</b> when a tab has no rows (this is what shows on Adjustments / Approvals), and the shared <b>MinimalEmptyState</b> (soft gradient + icon) only when the whole list is empty — reused by Payslips (“No payslips yet”) and Invoices (“No invoices yet”).</p>
      <div style={{ display: "grid", gap: 14 }}>
        <div>
          <p style={{ ...note, marginTop: 0, marginBottom: 6 }}>Per-tab empty — the tabs stay, the row area just shows a plain label (verbatim from live). Text is per-tab: “No pending requests.” / “No approved requests.” / “No rejected requests.” No Approve or select-all bar when the tab is empty.</p>
          <div className="w-[640px] max-w-full">
            <Card>
              <div className="mb-4"><TabBar tabs={["Pending (0)", "Approved (12)", "Rejected (1)"]} active="Pending (0)" /></div>
              <p className="text-sm text-muted-foreground py-6 text-center">No pending requests.</p>
            </Card>
          </div>
        </div>
        <div>
          <p style={{ ...note, marginTop: 0, marginBottom: 6 }}>Whole-list empty — MinimalEmptyState (payslips / invoices / no adjustments at all)</p>
          <div className="w-[640px] max-w-full"><Card>
            <div className="flex flex-col items-center text-center py-8 px-4 -m-4 sm:-m-5 rounded-lg bg-gradient-to-br from-primary/[0.06] via-secondary/[0.04] to-accent/[0.06]">
              <div className="w-12 h-12 rounded-full bg-background/80 border border-primary/20 flex items-center justify-center mb-4 shadow-sm"><Sparkles className="h-5 w-5 text-emphasis" /></div>
              <h2 className="text-lg font-semibold text-foreground mb-1">No adjustments</h2>
              <p className="text-sm text-muted-foreground max-w-[240px]">Expenses, overtime, or time off you request will show up here.</p>
            </div>
          </Card></div>
        </div>
      </div>

      <h3 style={eyebrow}>Type → detail display</h3>
      <DocTable head={["Type", "How the detail is shown", "notes"]} w0={150} rows={[
        ["Expense (multi)", "expander “{trip} · N items” → itemised list", "each item: category · attachment · font-mono +amount"],
        ["Expense (single)", "“Meals · PHP 6,350” + attachment", "flat detail, no expander"],
        ["Per diem", "detail + expander “N included” → coverage list", "Breakfast / Lunch / Dinner / Hotel provided"],
        ["Bonus", "“Q4 performance bonus · PHP 12,000” + attachment", "flat detail"],
        ["Paid leave", "“Paid leave · 2 days · date – date” + attachment", "flat detail"],
        ["Overtime", "“Weekday OT · Client deadline · 8h · date”", "flat detail"],
        ["Other / Deduction", "“{reason} · PHP 1,800”", "flat detail"],
        ["Contractor", "Addition / Deduction · description · amount", "deductions negative; no expanders"],
      ]} />
    </div>
  ),
};
