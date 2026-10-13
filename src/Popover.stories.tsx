import * as React from "react";
import { useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronDown, Calendar as CalendarIcon, Plus, X, Info } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import "./tokens.css";
import "./typography.css";
import { PageHeader } from "./_docTable";
import { Guidance } from "./guidance";

/**
 * Components — Popover (Radix, verbatim ui/popover).
 * The canonical flow usage is the payroll **period dropdown** with off-cycle batch
 * support (F1v6_PeriodDropdown): a status-dot trigger opening a glass panel with
 * grouped sections — Active Runs, Off-Cycle Batches, a Create Off-Cycle Batch form,
 * and paid History. Every className below is copied verbatim from the flow source.
 */
const meta: Meta = { title: "Components/Popover", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const wrap: React.CSSProperties = { fontFamily: "var(--ds-font-body)", color: "var(--ds-color-text)", maxWidth: 960, padding: 4 };
const eyebrow: React.CSSProperties = { fontSize: 12, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", margin: "28px 0 10px", fontWeight: 600 };
const th: React.CSSProperties = { textAlign: "left", padding: "10px 16px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", background: "var(--ds-color-surface-sunken)", borderBottom: "1px solid var(--ds-color-border)" };
const td: React.CSSProperties = { padding: "12px 16px", borderBottom: "1px solid var(--ds-color-border)", verticalAlign: "middle" };
const note: React.CSSProperties = { fontFamily: "var(--ds-font-mono)", fontSize: 11, color: "var(--ds-color-text-muted)" };

function Table({ head, rows, w0 = 150 }: { head: string[]; rows: Array<[React.ReactNode, React.ReactNode, React.ReactNode]>; w0?: number }) {
  return (
    <div style={{ border: "1px solid var(--ds-color-border)", borderRadius: "var(--ds-radius-card)", overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead><tr>{head.map((h, i) => <th key={i} style={{ ...th, width: i === 0 ? w0 : i === head.length - 1 ? 340 : "auto" }}>{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ background: i % 2 ? "var(--ds-color-bg)" : "var(--ds-color-surface)" }}>
              <td style={{ ...td, fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" }}>{r[0]}</td>
              <td style={td}>{r[1]}</td>
              <td style={{ ...td, ...note }}>{r[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Verbatim from F1v6_PeriodDropdown.tsx (fronted-admin-v6-1-clone).
   ───────────────────────────────────────────────────────────────────────── */

type PayrollFrequency = "monthly" | "fortnightly" | "custom";
type PayrollRunStatus = "in-review" | "processing" | "paid";
interface PayrollPeriod {
  id: string; frequency: PayrollFrequency; periodLabel: string; payDate: string;
  status: PayrollRunStatus; isCustomBatch?: boolean; payDateISO?: string; periodStartISO?: string;
}
interface CustomBatchFormData { startDate: string; endDate: string; payDate: string; label?: string; }

const StatusDot = ({ status, size = "sm", isCustom = false }: { status: PayrollRunStatus; size?: "sm" | "md"; isCustom?: boolean }) => {
  const dotSize = size === "md" ? "h-2.5 w-2.5" : "h-2 w-2";
  const pulseSize = size === "md" ? "h-2.5 w-2.5" : "h-2 w-2";
  if (isCustom) {
    return (
      <span className="relative inline-flex">
        {status === "in-review" && <span className={cn("absolute inline-flex rounded-full opacity-40 animate-ping", pulseSize, "bg-violet-500")} />}
        <span className={cn("relative inline-flex rounded-full", dotSize, status === "paid" ? "bg-emerald-500" : "bg-violet-500")} />
      </span>
    );
  }
  return (
    <span className="relative inline-flex">
      {status === "in-review" && <span className={cn("absolute inline-flex rounded-full opacity-40 animate-ping", pulseSize, "bg-amber-500")} />}
      <span className={cn("relative inline-flex rounded-full", dotSize,
        status === "paid" && "bg-emerald-500", status === "processing" && "bg-primary", status === "in-review" && "bg-amber-500")} />
    </span>
  );
};
const statusLabel = (s: PayrollRunStatus) => (s === "paid" ? "Paid" : s === "processing" ? "Processing" : "In review");

function PeriodDropdown({ periods, selectedPeriodId, onPeriodChange, allowCustomBatch = true, onCreateCustomBatch }: {
  periods: PayrollPeriod[]; selectedPeriodId: string; onPeriodChange: (id: string) => void;
  allowCustomBatch?: boolean; onCreateCustomBatch?: (d: CustomBatchFormData) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPayDate, setNewPayDate] = useState<Date | undefined>();
  const [payDateOpen, setPayDateOpen] = useState(false);
  const selectedPeriod = periods.find((p) => p.id === selectedPeriodId);

  const { active, custom, history } = useMemo(() => {
    const active: PayrollPeriod[] = [], custom: PayrollPeriod[] = [], history: PayrollPeriod[] = [];
    periods.forEach((p) => { if (p.status === "paid") history.push(p); else if (p.isCustomBatch) custom.push(p); else active.push(p); });
    return { active, custom, history };
  }, [periods]);

  const handleSelect = (id: string) => { onPeriodChange(id); setIsOpen(false); setShowCreateForm(false); };
  const isFormValid = !!newPayDate;
  const handleCreateBatch = () => {
    if (isFormValid && onCreateCustomBatch) {
      const s = newPayDate.toISOString().split("T")[0];
      onCreateCustomBatch({ startDate: s, endDate: s, payDate: s });
      setNewPayDate(undefined); setShowCreateForm(false); setIsOpen(false);
    }
  };
  const triggerLabel = selectedPeriod
    ? selectedPeriod.isCustomBatch ? `Off-cycle · ${selectedPeriod.payDate}` : `${selectedPeriod.frequency === "monthly" ? "Monthly" : "Fortnightly"} · ${selectedPeriod.periodLabel}`
    : "Select Run";

  return (
    <Popover open={isOpen} onOpenChange={(o) => { setIsOpen(o); if (!o) setShowCreateForm(false); }}>
      <PopoverTrigger asChild>
        <button className={cn("group flex items-center gap-2 px-1 py-1 rounded-md", "bg-transparent hover:bg-muted/40", "transition-colors duration-150 ease-out", "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30")}>
          {selectedPeriod ? <StatusDot status={selectedPeriod.status} size="md" isCustom={selectedPeriod.isCustomBatch} /> : null}
          <span className="text-[15px] font-semibold text-foreground tracking-tight">{triggerLabel}</span>
          <ChevronDown className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform duration-200", isOpen && "rotate-180")} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="center" sideOffset={10} className="w-[360px] max-w-full p-0 bg-popover/95 backdrop-blur-xl border border-border/60 rounded-xl shadow-2xl shadow-black/10 overflow-hidden max-h-[420px] overflow-y-auto overscroll-contain">
        {showCreateForm && allowCustomBatch ? (
          <div className="px-4 py-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-md bg-violet-500/10 flex items-center justify-center"><Plus className="h-3.5 w-3.5 text-violet-600" /></div>
                <span className="text-[13px] font-semibold text-foreground">New Off-Cycle Batch</span>
              </div>
              <button onClick={() => { setShowCreateForm(false); setNewPayDate(undefined); }} className="text-muted-foreground hover:text-foreground transition-colors"><X className="h-3.5 w-3.5" /></button>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">Pay out adjustments outside the regular cycle. You choose which items go in on the next step.</p>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-foreground/75">Pay date</Label>
              <Popover open={payDateOpen} onOpenChange={setPayDateOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full h-9 justify-start text-left font-normal text-sm", !newPayDate && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-3.5 w-3.5" />{newPayDate ? format(newPayDate, "MMM d, yyyy") : <span>Select pay date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={newPayDate} onSelect={(d) => { setNewPayDate(d); setPayDateOpen(false); }} disabled={(d) => d < new Date()} initialFocus className={cn("p-3 pointer-events-auto")} />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex gap-2 pt-1">
              <Button size="sm" variant="outline" onClick={() => { setShowCreateForm(false); setNewPayDate(undefined); }} className="flex-1 h-8 text-xs">Cancel</Button>
              <Button size="sm" onClick={handleCreateBatch} disabled={!isFormValid} className="flex-1 h-8 text-xs bg-violet-600 hover:bg-violet-700 text-white">Next: choose adjustments</Button>
            </div>
          </div>
        ) : (
          <>
            {active.length > 0 && (
              <div>
                <div className="px-4 pt-3 pb-1.5"><span className="text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-[0.08em]">Active Runs</span></div>
                <div className="px-2 pb-2 space-y-0.5">
                  {active.map((period) => {
                    const isSelected = period.id === selectedPeriodId;
                    return (
                      <button key={period.id} onClick={() => handleSelect(period.id)} className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left", "transition-all duration-150 ease-out", "hover:bg-muted/60",
                        isSelected && period.status === "in-review" && "bg-amber-500/[0.06] ring-1 ring-amber-500/15",
                        isSelected && period.status === "processing" && "bg-primary/[0.06] ring-1 ring-primary/15")}>
                        <div className={cn("w-[3px] self-stretch rounded-full shrink-0 transition-colors", isSelected ? (period.status === "in-review" ? "bg-amber-500" : "bg-primary") : "bg-transparent")} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className={cn("text-[13px] font-semibold", isSelected ? "text-foreground" : "text-foreground/85")}>{period.frequency === "monthly" ? "Monthly" : "Fortnightly"}</span>
                            <span className="text-muted-foreground/40">·</span>
                            <span className={cn("text-[13px] font-medium", isSelected ? "text-foreground" : "text-foreground/70")}>{period.periodLabel}</span>
                          </div>
                          <div className="flex items-center gap-1 mt-0.5"><CalendarIcon className="h-3 w-3 text-muted-foreground/50" /><span className="text-[11px] text-muted-foreground/70">Pay date: {period.payDate}</span></div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <StatusDot status={period.status} />
                          <span className={cn("hidden sm:inline text-[11px] font-medium", period.status === "in-review" && "text-amber-600", period.status === "processing" && "text-primary")}>{statusLabel(period.status)}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            {custom.length > 0 && (
              <>
                <div className="mx-4 border-t border-border/40" />
                <div>
                  <div className="px-4 pt-2.5 pb-1.5"><span className="text-[10px] font-semibold text-violet-500/70 uppercase tracking-[0.08em]">Off-Cycle Batches</span></div>
                  <div className="px-2 pb-2 space-y-0.5">
                    {custom.map((period) => {
                      const isSelected = period.id === selectedPeriodId;
                      return (
                        <button key={period.id} onClick={() => handleSelect(period.id)} className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left", "transition-all duration-150 ease-out", "hover:bg-violet-50/60", isSelected && "bg-violet-500/[0.08] ring-1 ring-violet-500/20")}>
                          <div className={cn("w-[3px] self-stretch rounded-full shrink-0 transition-colors", isSelected ? "bg-violet-500" : "bg-transparent")} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className={cn("text-[13px] font-semibold", isSelected ? "text-foreground" : "text-foreground/85")}>Off-cycle</span>
                              <span className="text-muted-foreground/40">·</span>
                              <span className={cn("text-[13px] font-medium", isSelected ? "text-foreground" : "text-foreground/70")}>{period.payDate}</span>
                            </div>
                            <div className="flex items-center gap-2.5 mt-0.5"><div className="flex items-center gap-1"><CalendarIcon className="h-3 w-3 text-muted-foreground/50" /><span className="text-[11px] text-muted-foreground/70">{period.periodLabel}</span></div></div>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0"><StatusDot status={period.status} isCustom /><span className={cn("hidden sm:inline text-[11px] font-medium", period.status === "in-review" && "text-violet-600", period.status === "processing" && "text-violet-500")}>{statusLabel(period.status)}</span></div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
            {allowCustomBatch && (
              <>
                <div className="mx-4 border-t border-border/40" />
                <div className="px-3 py-2.5">
                  <button onClick={() => setShowCreateForm(true)} className={cn("w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg", "text-[13px] font-medium text-violet-600", "border border-dashed border-violet-300/50", "hover:bg-violet-50/60", "transition-all duration-150")}>
                    <Plus className="h-3.5 w-3.5" />Create Off-Cycle Batch
                  </button>
                </div>
              </>
            )}
            {history.length > 0 && <div className="mx-4 border-t border-border/40" />}
            {history.length > 0 && (
              <div>
                <div className="px-4 pt-2.5 pb-1.5"><span className="text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-[0.08em]">History</span></div>
                <div className="px-2 pb-2 space-y-0.5 max-h-[180px] overflow-y-auto overscroll-contain">
                  {history.map((period) => {
                    const isSelected = period.id === selectedPeriodId;
                    return (
                      <button key={period.id} onClick={() => handleSelect(period.id)} className={cn("w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left", "transition-all duration-150 ease-out", "hover:bg-muted/60", isSelected && "bg-primary/[0.06] ring-1 ring-primary/15")}>
                        <div className={cn("w-[3px] self-stretch rounded-full shrink-0 transition-colors", isSelected ? "bg-emerald-500" : "bg-transparent")} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className={cn("text-[13px] font-medium", isSelected ? "text-foreground" : "text-foreground/70")}>{period.isCustomBatch ? "Off-cycle" : period.frequency === "monthly" ? "Monthly" : "Fortnightly"}</span>
                            <span className="text-muted-foreground/40">·</span>
                            <span className={cn("text-[13px]", isSelected ? "text-foreground/90" : "text-muted-foreground")}>{period.isCustomBatch ? period.payDate : period.periodLabel}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0"><StatusDot status="paid" /><span className="hidden sm:inline text-[11px] font-medium text-emerald-600">Paid</span></div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}

const PERIODS: PayrollPeriod[] = [
  { id: "m-feb", frequency: "monthly", periodLabel: "February 2026", payDate: "Feb 25, 2026", status: "in-review" },
  { id: "f-feb", frequency: "fortnightly", periodLabel: "Feb 1 – Feb 14", payDate: "Feb 15, 2026", status: "processing" },
  { id: "oc-bonus", frequency: "custom", periodLabel: "Q4 delivery bonus", payDate: "Feb 20, 2026", status: "in-review", isCustomBatch: true },
  { id: "m-jan", frequency: "monthly", periodLabel: "January 2026", payDate: "Jan 25, 2026", status: "paid" },
  { id: "m-dec", frequency: "monthly", periodLabel: "December 2025", payDate: "Dec 24, 2025", status: "paid" },
];

function LiveDropdown() {
  const [sel, setSel] = useState("m-feb");
  return <PeriodDropdown periods={PERIODS} selectedPeriodId={sel} onPeriodChange={setSel} allowCustomBatch onCreateCustomBatch={() => {}} />;
}

export const PopoverStory: Story = {
  name: "Popover",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Components"
        status="Stable"
        title="Popover"
        lead={<>
        Radix popover — a floating panel anchored to a trigger. The canonical flow usage is the payroll
        <b> period dropdown with off-cycle batch support</b>. Click the trigger to open; the panel groups runs
        into Active / Off-Cycle / History and hosts an inline create-batch form.
        </>}
      />

      <h3 style={eyebrow}>Batch period dropdown (F1v6_PeriodDropdown — interactive)</h3>
      <div style={{ paddingLeft: 6, paddingTop: 2 }}>
        <LiveDropdown />
      </div>
      <p style={{ ...note, marginTop: 8 }}>trigger = plain button bg-transparent hover:bg-muted/40, text-[15px] font-semibold + StatusDot + rotating ChevronDown · panel w-[360px] p-0 bg-popover/95 backdrop-blur-xl border-border/60 rounded-xl shadow-2xl · align center sideOffset 10 · sections → Active Runs / Off-Cycle Batches / Create Off-Cycle Batch / History</p>

      <h3 style={eyebrow}>Status dot — run states</h3>
      <Table head={["State", "Dot", "classes"]} rows={[
        ["In review", <StatusDot status="in-review" />, "bg-amber-500 + absolute animate-ping ring opacity-40"],
        ["Processing", <StatusDot status="processing" />, "bg-primary (no pulse)"],
        ["Paid", <StatusDot status="paid" />, "bg-emerald-500 (no pulse)"],
        ["Off-cycle (in review)", <StatusDot status="in-review" isCustom />, "isCustom → bg-violet-500 + violet animate-ping"],
        ["Off-cycle (paid)", <StatusDot status="paid" isCustom />, "isCustom + paid → bg-emerald-500"],
        ["md (trigger)", <StatusDot status="in-review" size="md" />, "size md → h-2.5 w-2.5 (default sm = h-2 w-2)"],
      ]} w0={200} />

      <h3 style={eyebrow}>Row states (grouped list items)</h3>
      <Table head={["Group / state", "Accent + surface", "classes"]} rows={[
        ["Active · selected in-review", <span style={{ ...note }}>amber</span>, "bg-amber-500/[0.06] ring-1 ring-amber-500/15 · bar bg-amber-500"],
        ["Active · selected processing", <span style={{ ...note }}>blue</span>, "bg-primary/[0.06] ring-1 ring-primary/15 · bar bg-primary"],
        ["Off-cycle · selected", <span style={{ ...note }}>violet</span>, "bg-violet-500/[0.08] ring-1 ring-violet-500/20 · bar bg-violet-500"],
        ["History · selected", <span style={{ ...note }}>emerald bar</span>, "bg-primary/[0.06] ring-1 ring-primary/15 · bar bg-emerald-500"],
        ["Default / hover", <span style={{ ...note }}>transparent bar</span>, "hover:bg-muted/60 (violet rows: hover:bg-violet-50/60) · bar bg-transparent"],
        ["Section eyebrow", <span style={{ ...note }}>UPPERCASE</span>, "text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-[0.08em] (violet: text-violet-500/70)"],
      ]} w0={220} />

      <h3 style={eyebrow}>Base variants (ui/popover content)</h3>
      <Table head={["Variant", "Trigger", "content classes"]} rows={[
        ["Compact hint", (
          <Popover>
            <PopoverTrigger asChild><Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground"><Info className="h-3.5 w-3.5" /></Button></PopoverTrigger>
            <PopoverContent className="w-auto px-3 py-2 text-xs">Amount before tax, used to compute the payout.</PopoverContent>
          </Popover>
        ), "w-auto px-3 py-2 text-xs (auto width)"],
        ["Default panel", (
          <Popover>
            <PopoverTrigger asChild><Button variant="outline" size="sm" className="h-8 text-xs">Open panel</Button></PopoverTrigger>
            <PopoverContent className="text-sm">Base content — rounded-md border bg-popover p-4 shadow-md.</PopoverContent>
          </Popover>
        ), "z-50 w-72 rounded-md border bg-popover p-4 shadow-md (ui default)"],
      ]} w0={150} />
      <p style={{ ...note, marginTop: 14 }}>base: fade + zoom-95 on open · side-slide-2 by placement · width = auto / w-72 / trigger-var / fixed w-[360px]</p>
      <Guidance k="popover" />
    </div>
  ),
};
