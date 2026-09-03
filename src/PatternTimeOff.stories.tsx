import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Info, X, MapPin, Sun, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Time-off Request (verbatim from F4.1 Employee Dashboard v8.1).
 * Three pieces of the leave flow: the Leave Requests section on the dashboard
 * (F41v81_TimeOffSection), the Request time off drawer (F41v81_TimeOffRequestDrawer)
 * and the auto-advancing Time Input control (F41v81_TimeInput).
 * Markup verbatim from source (primary text uses text-emphasis per the a11y swap;
 * bg-primary / border-primary fills kept unchanged; status colors kept exact).
 */
const meta: Meta = { title: "Patterns/Time-off Request", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

/* ------------------------------------------------------------------ */
/* 1. Leave Requests section — verbatim from F41v81_TimeOffSection      */
/* ------------------------------------------------------------------ */

const balances = [
  { emoji: "🌴", label: "vacation", value: 10 },
  { emoji: "🤒", label: "sick", value: 5 },
  { emoji: "💜", label: "compassionate", value: 3 },
  { emoji: "🏝️", label: "maternity", value: 90 },
];

function PendingBadge() {
  return (
    <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20 text-[11px] px-2 py-0.5 font-medium pointer-events-none">
      Pending approval
    </Badge>
  );
}

function RejectedBadge() {
  return (
    <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 text-[11px] px-2 py-0.5 font-medium pointer-events-none">
      Rejected
    </Badge>
  );
}

function TimeOffSection() {
  return (
    <Card className="border border-border/40 shadow-none bg-card/20 overflow-hidden">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-1">Leave Requests</h2>
            <div className="flex items-center gap-1 text-sm text-muted-foreground flex-wrap">
              <span className="text-muted-foreground/70">Balance:</span>
              {balances.map((item, idx) => (
                <span key={item.label} className="flex items-center gap-1">
                  {idx > 0 && <span className="text-muted-foreground/40 mx-0.5">·</span>}
                  <span>{item.emoji}</span>
                  <span className="text-foreground/80 font-medium">{item.value}</span>
                  <span className="text-muted-foreground">{item.label}</span>
                </span>
              ))}
            </div>
          </div>

          <Button size="sm" variant="outline" className="shrink-0">
            Request leave
          </Button>
        </div>

        <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-muted/40 dark:bg-muted/20 border border-border/30 mb-4">
          <Info className="h-4 w-4 text-muted-foreground shrink-0" />
          <p className="text-sm text-muted-foreground">
            Leaves align with pay periods and get split on payslips when crossing periods.
          </p>
        </div>

        <div className="space-y-2">
          {/* Pending row */}
          <div className="group rounded-lg border transition-colors bg-amber-50/50 dark:bg-amber-500/5 border-amber-200/60 dark:border-amber-500/20">
            <div className="flex items-start gap-2 px-2.5 py-2">
              <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xs font-medium text-foreground truncate">Vacation</span>
                  <span className="text-muted-foreground/40 text-xs hidden sm:inline">·</span>
                  <span className="text-xs text-muted-foreground tabular-nums hidden sm:inline">Jan 12–16</span>
                  <span className="text-muted-foreground/40 text-xs hidden sm:inline">·</span>
                  <span className="text-xs text-muted-foreground tabular-nums hidden sm:inline">5 days</span>
                </div>
                <span className="text-[11px] text-muted-foreground tabular-nums truncate sm:hidden">
                  Jan 12–16 · 5 days
                </span>
                <div className="mt-1 sm:mt-0">
                  <PendingBadge />
                </div>
              </div>
              <button
                className={cn(
                  "p-1 rounded transition-all shrink-0",
                  "sm:opacity-0 sm:group-hover:opacity-100",
                  "hover:bg-amber-100 dark:hover:bg-amber-500/20"
                )}
                aria-label="Withdraw request"
              >
                <X className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
              </button>
            </div>
          </div>

          {/* Rejected row with reason */}
          <div className="group rounded-lg border transition-colors bg-destructive/5 dark:bg-destructive/5 border-destructive/20">
            <div className="flex items-start gap-2 px-2.5 py-2">
              <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xs font-medium text-foreground truncate">Sick</span>
                  <span className="text-muted-foreground/40 text-xs hidden sm:inline">·</span>
                  <span className="text-xs text-muted-foreground tabular-nums hidden sm:inline">Jan 22</span>
                  <span className="text-muted-foreground/40 text-xs hidden sm:inline">·</span>
                  <span className="text-xs text-muted-foreground tabular-nums hidden sm:inline">1 day</span>
                </div>
                <span className="text-[11px] text-muted-foreground tabular-nums truncate sm:hidden">
                  Jan 22 · 1 day
                </span>
                <div className="mt-1 sm:mt-0">
                  <RejectedBadge />
                </div>
              </div>
            </div>
            <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-200">
              <div className="overflow-hidden">
                <div className="px-2.5 pb-2 pt-0.5">
                  <p className="text-xs text-destructive/80 dark:text-destructive/90 bg-destructive/5 dark:bg-destructive/10 rounded px-2 py-1.5 border-l-2 border-destructive/30">
                    Please provide a medical certificate for sick leave.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Request drawer — verbatim from F41v81_TimeOffRequestDrawer        */
/* ------------------------------------------------------------------ */

const leaveTypes: { value: string; label: string; icon: string }[] = [
  { value: "Vacation", label: "Vacation", icon: "🌴" },
  { value: "Sick", label: "Sick", icon: "🤒" },
  { value: "Compassionate", label: "Compassionate", icon: "💜" },
  { value: "Maternity", label: "Maternity", icon: "🏝️" },
];

function TimeOffRequestDrawer() {
  const selected = "Vacation";
  return (
    <div className="w-full sm:max-w-2xl rounded-lg border border-border bg-background overflow-hidden shadow-overlay">
      <div className="bg-background p-6 pb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
              <Sun className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="text-lg font-semibold text-foreground">Request time off</div>
              <div className="flex items-center gap-2 mt-0.5">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Philippines rules apply</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant="outline" className="text-xs font-normal bg-background/50">
              Pay period: Jan 1 – Jan 31
            </Badge>
            <Badge variant="secondary" className="text-xs font-normal">
              Weekend: Sat, Sun
            </Badge>
            <Badge variant="secondary" className="text-xs font-normal">
              Annual allowance: 10 days
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-foreground/75">What type of leave?</Label>
          <div className="grid grid-cols-2 gap-2">
            {leaveTypes.map((type) => (
              <button
                key={type.value}
                className={cn(
                  "flex items-center gap-2.5 p-3 rounded-xl border-2 transition-all text-left",
                  selected === type.value
                    ? "border-primary bg-primary/[0.04] shadow-sm"
                    : "border-border/60 hover:border-border hover:bg-muted/30"
                )}
              >
                <span className="text-lg">{type.icon}</span>
                <span className={cn(
                  "text-sm font-medium",
                  selected === type.value ? "text-emphasis" : "text-foreground"
                )}>
                  {type.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-medium text-foreground/75">When?</Label>
            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Clear
            </button>
          </div>
          <p className="text-xs text-muted-foreground -mt-1">
            Tap a date for single day, or two dates for a range.
            <span className="text-amber-600 dark:text-amber-400"> Holidays are highlighted.</span>
          </p>

          <div className="rounded-xl border bg-card overflow-hidden transition-colors border-border/60">
            <div className="flex items-center justify-center py-6 px-2">
              <span className="text-xs text-muted-foreground">Two-month range calendar (holidays highlighted)</span>
            </div>
            <div className="flex items-center justify-center gap-4 py-2 px-4 border-t border-border/40 bg-muted/20">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-amber-100 dark:bg-amber-500/30 border border-amber-300 dark:border-amber-500/50" />
                <span className="text-xs text-muted-foreground">Public holiday</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded ring-2 ring-primary/30" />
                <span className="text-xs text-muted-foreground">Today</span>
              </div>
            </div>
          </div>
        </div>

        {/* Selection summary */}
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-muted/30 border border-border/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Selected dates</span>
              <span className="text-sm font-medium">Jan 12 – Jan 16, 2026</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Business days</span>
              <span className="text-sm font-semibold text-foreground">5 days</span>
            </div>
            <div className="pt-2 border-t border-border/40">
              <p className="text-xs text-amber-600 dark:text-amber-400 mb-1.5">
                Holidays excluded from count:
              </p>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="outline" className="text-xs bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20">
                  Rizal Day
                </Badge>
              </div>
            </div>
            <div className="flex items-start gap-2 pt-2 border-t border-border/40">
              <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                This leave spans multiple pay periods and will be split automatically on your payslips.
              </p>
            </div>
            <div className="flex items-start gap-2 pt-2 border-t border-border/40">
              <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-600 dark:text-amber-400">
                Leave request may exceed available balance
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 pt-4">
        <Button className="w-full" size="lg">
          Submit request
        </Button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Time Input — verbatim from F41v81_TimeInput                       */
/* ------------------------------------------------------------------ */

function TimeInputPreview({ hasError = false }: { hasError?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center h-10 rounded-md border bg-background px-3 text-sm ring-offset-background",
        "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        hasError ? "border-destructive" : "border-input",
        "w-28"
      )}
    >
      <input
        type="text"
        inputMode="numeric"
        placeholder="00"
        defaultValue="09"
        className="w-8 h-8 bg-transparent text-center outline-none placeholder:text-muted-foreground tabular-nums rounded focus:bg-muted/50 transition-colors"
        maxLength={2}
        aria-label="Hours"
      />
      <span className="text-muted-foreground mx-1 select-none">:</span>
      <input
        type="text"
        inputMode="numeric"
        placeholder="00"
        defaultValue="30"
        className="w-8 h-8 bg-transparent text-center outline-none placeholder:text-muted-foreground tabular-nums rounded focus:bg-muted/50 transition-colors"
        maxLength={2}
        aria-label="Minutes"
      />
    </div>
  );
}

export const TimeOffRequest: Story = {
  name: "Time-off Request",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        status="Stable"
        title="Time-off Request"
        lead={<>The employee leave flow from F4.1 — the Leave Requests dashboard section (balance display, pay-period info banner, status rows), the Request time off drawer (leave-type picker, range calendar, selection summary), and the auto-advancing Time Input control. Markup verbatim from F41v81_TimeOffSection, F41v81_TimeOffRequestDrawer and F41v81_TimeInput.</>}
        meta="Verbatim from F4.1 · Employee Dashboard (employee-dashboard-v8-1)"
      />

      <h3 style={eyebrow}>Leave Requests section</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}><TimeOffSection /></div>
      <p style={{ ...note, marginTop: 10 }}>Card border-border/40 bg-card/20 · header with emoji Balance line + outline “Request leave” · info banner bg-muted/40 border-border/30 · rows: Pending = amber-50/50 border-amber-200/60 with hover-reveal withdraw (X amber-600); Rejected = destructive/5 border-destructive/20 with an expandable reason (border-l-2 border-destructive/30).</p>

      <h3 style={eyebrow}>Request time off drawer</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}><TimeOffRequestDrawer /></div>
      <p style={{ ...note, marginTop: 10 }}>Header icon tile bg-primary/10 border-primary/20 (Sun) + “Request time off” + MapPin country rules · outline/secondary meta badges (pay period, weekend, annual allowance) · leave-type grid grid-cols-2 border-2 (selected border-primary bg-primary/[0.04] text-emphasis) · date card rounded-xl border-border/60 with holiday/today legend · selection summary bg-muted/30 (selected dates, business days, holidays-excluded amber badges, pay-period split Info, balance AlertTriangle) · full-width Submit request.</p>

      <h3 style={eyebrow}>Time Input control</h3>
      <div style={{ display: "flex", gap: 24, alignItems: "flex-start", padding: "8px 0" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <TimeInputPreview />
          <span style={{ ...note }}>Default</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <TimeInputPreview hasError />
          <span style={{ ...note }}>hasError → border-destructive</span>
        </div>
      </div>
      <p style={{ ...note, marginTop: 10 }}>h-10 rounded-md border bg-background px-3 · focus-within:ring-2 ring-ring · two numeric inputs (w-8 h-8, tabular-nums, focus:bg-muted/50) split by a muted “:” · hours auto-advance to minutes at 2 digits; ArrowLeft / Backspace step back; blur pads to two digits.</p>

      <h3 style={eyebrow}>Anatomy</h3>
      <DocTable head={["Part", "Detail", "classes"]} w0={170} rows={[
        ["Section header", "“Leave Requests” + emoji balance line + Request leave", "flex justify-between · Balance emojis with · separators · Button outline sm"],
        ["Info banner", "Pay-period split notice", "px-3 py-2.5 rounded-lg bg-muted/40 border-border/30 · Info icon"],
        ["Pending row", "type · dates · days + Pending approval + withdraw", "bg-amber-50/50 border-amber-200/60 · badge orange-50/orange-600 · X amber-600"],
        ["Rejected row", "row + expandable rejection reason", "bg-destructive/5 border-destructive/20 · reason border-l-2 border-destructive/30"],
        ["Drawer header", "Sun tile + title + country rules + meta badges", "tile bg-primary/10 border-primary/20 · outline + secondary badges"],
        ["Leave-type picker", "2×2 emoji buttons, one selected", "grid-cols-2 border-2 · selected border-primary bg-primary/[0.04] text-emphasis"],
        ["Date card", "range calendar + holiday / today legend", "rounded-xl border-border/60 bg-card · legend bg-muted/20 · amber holiday swatch"],
        ["Selection summary", "dates · business days · holidays · warnings", "bg-muted/30 border-border/40 · amber holiday badges · Info + AlertTriangle rows"],
        ["Time Input", "HH : MM auto-advancing numeric pair", "h-10 rounded-md border-input · focus-within:ring-2 · inputs w-8 tabular-nums"],
      ]} />
    </div>
  ),
};
