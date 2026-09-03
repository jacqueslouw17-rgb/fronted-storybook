import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Check, X, ShieldCheck, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import { cn } from "@/lib/utils";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Adjustments & Approvals (verbatim from F4.1 employee dashboard,
 * F41v81_AdjustmentsSection + F41v81_ApprovalsSection). One shared list-row molecule used two
 * ways: the worker's own Adjustments list (with a withdraw action) and the manager's Approvals
 * table (with per-row checkboxes, a select-all bar, bulk Approve, and inline approve/reject).
 * Row tint carries the status — rejected = destructive, approved = accent-green. Markup verbatim
 * from source (active-tab text uses text-emphasis per the a11y swap).
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

/* Static tab bar — TabsList / TabsTrigger classes verbatim (active = Pending) */
function TabBar({ tabs, active }: { tabs: string[]; active: string }) {
  return (
    <div className="h-8 bg-muted/30 p-0.5 rounded-md inline-flex items-center justify-start gap-0.5">
      {tabs.map((t) => (
        <span key={t} className={cn("text-xs h-7 px-3 inline-flex items-center rounded-sm whitespace-nowrap",
          t === active ? "bg-primary/[0.08] text-emphasis border border-primary/30" : "text-muted-foreground")}>{t}</span>
      ))}
    </div>
  );
}

function Att({ n }: { n: number }) {
  return <span className="inline-flex items-center gap-0.5 text-[11px] text-muted-foreground/70"><Paperclip className="h-2.5 w-2.5" />{n}</span>;
}
function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl border border-border/40 shadow-none bg-card/20 overflow-hidden"><div className="p-4 sm:p-5">{children}</div></div>;
}

export const AdjustmentsApprovals: Story = {
  name: "Adjustments & Approvals",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        status="Stable"
        title="Adjustments & Approvals"
        lead={<>One shared list-row molecule used two ways in the F4.1 dashboard: the worker's own <strong>Adjustments</strong> list (Pending / Approved / Rejected, with a withdraw action) and the manager's <strong>Approvals</strong> table (per-row checkboxes, a select-all bar, bulk Approve, inline approve / reject). The row tint carries the status — rejected is destructive-tinted, approved is accent-green. Markup verbatim from F41v81_AdjustmentsSection + F41v81_ApprovalsSection.</>}
        meta="Verbatim from F4.1 · Adjustments & Approvals (employee-dashboard-v8-1)"
      />

      {/* ── Adjustments list (worker) ── */}
      <h3 style={eyebrow}>Adjustments list (worker)</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
        <div className="w-[620px] max-w-full">
          <Card>
            <div className="flex items-center justify-between gap-2 mb-4">
              <TabBar tabs={["Pending (6)", "Approved (1)", "Rejected (1)"]} active="Pending (6)" />
              <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs">Request adjustment</Button>
            </div>
            <div className="space-y-1.5">
              <div className={rowShell("pending")}>
                <div className="flex items-center gap-3 px-3 py-2.5">
                  <div className="flex-1 min-w-0 flex items-center gap-2">
                    <span className="text-xs font-semibold text-foreground truncate">Bonus</span>
                    <span className="text-muted-foreground/40 text-xs">·</span>
                    <span className="text-xs text-muted-foreground truncate">Q4 performance bonus · PHP 12,000</span>
                    <Att n={1} />
                  </div>
                  <div className="shrink-0 self-center flex items-center gap-2">
                    <span className="text-[11px] text-muted-foreground tabular-nums whitespace-nowrap">18 Feb</span>
                    <button className="p-1 rounded transition-colors hover:bg-muted" aria-label="Withdraw request"><X className="h-3.5 w-3.5 text-muted-foreground" /></button>
                  </div>
                </div>
              </div>
              <div className={rowShell("approved")}>
                <div className="flex items-center gap-3 px-3 py-2.5">
                  <div className="flex-1 min-w-0 flex items-center gap-2">
                    <span className="text-xs font-semibold text-foreground truncate">Per diem</span>
                    <span className="text-muted-foreground/40 text-xs">·</span>
                    <span className="text-xs text-muted-foreground truncate">Manila · Domestic · 3 days</span>
                  </div>
                  <div className="shrink-0 self-center flex items-center gap-2">
                    <span className="text-[11px] text-muted-foreground tabular-nums whitespace-nowrap">13 Feb</span>
                    <span className="shrink-0 self-center text-right text-[11px] font-medium whitespace-nowrap text-accent-green-text">Admin approved</span>
                  </div>
                </div>
              </div>
              <div className={rowShell("rejected")}>
                <div className="flex items-center gap-3 px-3 py-2.5">
                  <div className="flex-1 min-w-0 flex items-center gap-2">
                    <span className="text-xs font-semibold text-foreground truncate">Other</span>
                    <span className="text-muted-foreground/40 text-xs">·</span>
                    <span className="text-xs text-muted-foreground truncate">Deduction · Personal use of company phone plan · PHP 1,800</span>
                  </div>
                  <div className="shrink-0 self-center flex items-center gap-2">
                    <span className="text-[11px] text-muted-foreground tabular-nums whitespace-nowrap">20 Feb</span>
                    <span className="shrink-0 self-center text-right text-[11px] font-medium whitespace-nowrap text-destructive/80">Admin rejected</span>
                  </div>
                </div>
                <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-200">
                  <div className="overflow-hidden"><div className="px-2.5 pb-2 pt-0.5">
                    <p className="text-xs text-destructive/80 bg-destructive/5 rounded px-2 py-1.5 border-l-2 border-destructive/30">Not an eligible deduction for this cycle.</p>
                  </div></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <p style={{ ...note, marginTop: 4 }}>Card border-border/40 !shadow-none bg-card/20 · tabs h-8 bg-muted/30 (active bg-primary/[0.08] text-emphasis border-primary/30) · row group rounded-lg border · pending border-border/30 bg-card + withdraw X · approved accent-green tint + “Admin approved” · rejected destructive tint + reason border-l-2.</p>

      {/* ── Approvals table (manager) ── */}
      <h3 style={eyebrow}>Approvals table (manager)</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
        <div className="w-[620px] max-w-full">
          <Card>
            <div className="flex items-center justify-between gap-2 mb-4">
              <TabBar tabs={["Pending (7)", "Approved (4)", "Rejected (1)"]} active="Pending (7)" />
              <Button size="sm" className="h-7 px-2.5 text-xs">Approve</Button>
            </div>
            {/* select-all bar */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-border/30 bg-muted/20 px-3 py-2 mb-1.5 hover:bg-muted/40 transition-colors">
              <Checkbox className="h-4 w-4 shrink-0 rounded-[4px] border-border [&_svg]:h-3 [&_svg]:w-3" />
              <span className="text-[11px] font-medium text-muted-foreground">Select all (7)</span>
            </div>
            <div className="space-y-1.5">
              {[["John Doe · Expense", "NY trip · 2 items", "2 Mar", 5], ["Ana Santos · Paid leave", "2 days · 22 Feb 2026 – 23 Feb 2026", "15 Jan", 0], ["Liza Reyes · Overtime", "Weekday OT · Client deadline · 8h", "18 Jan", 0]].map(([who, detail, date, att]) => (
                <div key={who as string} className={rowShell("pending") + " cursor-pointer"}>
                  <div className="flex items-center gap-3 px-3 py-2.5">
                    <Checkbox className="h-4 w-4 shrink-0 rounded-[4px] border-border [&_svg]:h-3 [&_svg]:w-3" />
                    <div className="flex-1 min-w-0 flex items-center gap-2">
                      <span className="text-xs font-semibold text-foreground truncate">{who}</span>
                      <span className="text-muted-foreground/40 text-xs">·</span>
                      <span className="text-xs text-muted-foreground truncate">{detail}</span>
                      {(att as number) > 0 && <Att n={att as number} />}
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
              {/* an already-approved row */}
              <div className={rowShell("approved")}>
                <div className="flex items-center gap-3 px-3 py-2.5">
                  <div className="flex-1 min-w-0 flex items-center gap-2">
                    <span className="text-xs font-semibold text-foreground truncate">Ana Santos · Bonus</span>
                    <span className="text-muted-foreground/40 text-xs">·</span>
                    <span className="text-xs text-muted-foreground truncate">Q4 performance bonus · PHP 12,000</span>
                  </div>
                  <div className="shrink-0 self-center flex items-center gap-2">
                    <span className="text-[11px] text-muted-foreground tabular-nums whitespace-nowrap">18 Feb</span>
                    <span className="shrink-0 self-center text-right text-[11px] font-medium whitespace-nowrap text-accent-green-text">Approved by You</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <p style={{ ...note, marginTop: 4 }}>Same row molecule + per-row Checkbox (pending) · select-all bar rounded-lg border-border/30 bg-muted/20 · bulk Approve Button size=sm h-7 · inline actions button p-1 hover:bg-muted (Check / X) · decided rows use DecisionLabel text-accent-green-text / text-destructive/80.</p>

      <h3 style={eyebrow}>Empty state (Approvals)</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
        <div className="w-[620px] max-w-full">
          <Card>
            <div className="flex flex-col items-center text-center py-8 px-4 rounded-lg bg-gradient-to-br from-primary/[0.06] via-secondary/[0.04] to-accent/[0.06]">
              <div className="w-12 h-12 rounded-full bg-background/80 border border-primary/20 flex items-center justify-center mb-4 shadow-sm"><ShieldCheck className="h-5 w-5 text-emphasis" /></div>
              <h2 className="text-lg font-semibold text-foreground mb-1">Nothing to approve</h2>
              <p className="text-sm text-muted-foreground max-w-[240px]">Requests from your team will show up here.</p>
            </div>
          </Card>
        </div>
      </div>

      <h3 style={eyebrow}>Anatomy</h3>
      <DocTable head={["Part", "Detail", "classes"]} w0={150} rows={[
        ["Card", "section container for either list", "rounded-xl border-border/40 !shadow-none bg-card/20 · p-4 sm:p-5"],
        ["Tabs", "Pending / Approved / Rejected with counts", "h-8 bg-muted/30 · active bg-primary/[0.08] text-emphasis border-primary/30"],
        ["Row", "shared molecule — tint carries status", "group rounded-lg border · pending bg-card · approved accent-green · rejected destructive"],
        ["Worker action", "withdraw (pending) / DecisionLabel (decided)", "button p-1 hover:bg-muted + X · label text-accent-green-text / text-destructive/80"],
        ["Manager action", "checkbox + select-all + bulk Approve + inline ✓/✕", "Checkbox rounded-[4px] · select-all bar bg-muted/20 · Approve Button h-7"],
        ["Empty", "Nothing to approve", "gradient from-primary/[0.06] · ShieldCheck + heading + hint"],
      ]} />
    </div>
  ),
};
