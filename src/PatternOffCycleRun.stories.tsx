import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Award, Clock, Receipt, Timer, FileText, Search, Plus, CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import { cn } from "@/lib/utils";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Off-cycle Run (verbatim from F1 Fronted admin,
 * F1v6_OffCycleSelectionView + F1v6_OffCycleReviewView).
 * An ad-hoc payout built by hand: step one is a selectable pool of open adjustments (one row
 * per adjustment), step two is a per-worker review summary of what made it into the batch.
 * Markup verbatim from the source (primary text uses text-emphasis per the system's a11y swap).
 */
const meta: Meta = { title: "Patterns/Off-cycle Run", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const getInitials = (name: string) => name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

/* ── Selection pool row — verbatim from F1v6_OffCycleSelectionView ── */
type PoolItem = { name: string; flag: string; icon: React.ElementType; typeLabel: string; detail: string; value: string; approved: boolean; addedByAdmin?: boolean };
function PoolRow({ item, selected }: { item: PoolItem; selected: boolean }) {
  const Icon = item.icon;
  return (
    <div className={cn(
      "group flex cursor-pointer items-center gap-2 sm:gap-3 rounded-lg border px-2.5 sm:px-3 py-2.5 transition-colors",
      selected ? "border-border/50 bg-muted/40" : "border-border/30 bg-card hover:bg-muted/30"
    )}>
      <Checkbox checked={selected} className="h-4 w-4 shrink-0 rounded-[4px] border-border [&_svg]:h-3 [&_svg]:w-3" />
      <Avatar className="hidden h-7 w-7 shrink-0 sm:flex">
        <AvatarFallback className="bg-muted text-[9px] font-semibold text-muted-foreground">{getInitials(item.name)}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="truncate text-[13px] font-semibold text-foreground">{item.name}</span>
          <span className="shrink-0 text-[11px] text-muted-foreground/70">{item.flag}</span>
        </div>
        <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <Icon className="h-3 w-3 shrink-0" />
          <span className="shrink-0">{item.typeLabel}</span>
          <span className="text-muted-foreground/40">·</span>
          <span className="truncate">{item.detail}</span>
        </div>
      </div>
      {item.addedByAdmin && (
        <Badge variant="outline" className="hidden shrink-0 text-[10px] font-medium border-primary/25 bg-primary/10 text-emphasis sm:inline-flex">Added by you</Badge>
      )}
      <span className="ml-auto shrink-0 pl-2 sm:pl-4 text-[13px] font-semibold tabular-nums text-foreground">{item.value}</span>
      <div className={cn(
        "flex w-auto shrink-0 items-center justify-end gap-1.5 text-xs sm:w-[76px]",
        item.approved ? "text-accent-green-text" : "text-orange-600"
      )}>
        {item.approved ? (<><CheckCircle2 className="h-3.5 w-3.5" /><span className="hidden sm:inline">Approved</span></>)
          : (<><Clock className="h-3.5 w-3.5" /><span className="hidden sm:inline">Pending</span></>)}
      </div>
    </div>
  );
}

const POOL: (PoolItem & { selected: boolean })[] = [
  { name: "Maria Santos", flag: "🇵🇭", icon: Award, typeLabel: "Bonus", detail: "Q4 performance bonus", value: "PHP 40,000", approved: true, addedByAdmin: true, selected: true },
  { name: "Jonas Schmidt", flag: "🇩🇪", icon: Timer, typeLabel: "Overtime", detail: "Weekend shift", value: "12 hours", approved: false, selected: true },
  { name: "Wei Tan", flag: "🇸🇬", icon: Receipt, typeLabel: "Expense", detail: "Client travel", value: "SGD 820", approved: true, selected: false },
];

/* ── Selection view container ── */
function SelectionView() {
  const selectedCount = POOL.filter((p) => p.selected).length;
  return (
    <div className="rounded-xl border border-border/40 bg-card/20 shadow-none overflow-hidden">
      {/* Toolbar */}
      <div className="px-4 sm:px-5 pt-4 pb-3 border-b border-border/40 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-medium text-foreground">Choose adjustments<span className="text-muted-foreground font-normal"> · pay date 12 Feb 2026</span></p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">{selectedCount} selected across 2 workers</p>
          <p className="mt-0.5 text-[11px] text-orange-600">1 pending will be approved on behalf of Acme Inc when you create this batch</p>
        </div>
        <div className="flex w-full shrink-0 flex-wrap items-center gap-2 sm:w-auto sm:flex-nowrap">
          <div className="relative w-full sm:w-44">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-8 h-8 text-xs bg-background/50 border-border/30" />
          </div>
          <Button variant="outline" size="sm" className="h-8 flex-1 gap-1.5 text-xs sm:flex-none"><Plus className="h-3.5 w-3.5" />Add adjustment</Button>
          <span className="flex-1 sm:flex-none"><Button size="sm" className="h-8 w-full text-xs sm:w-auto">Create batch</Button></span>
        </div>
      </div>
      {/* Select-all strip */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-border/30 bg-muted/20 px-4 sm:px-7 py-2 transition-colors duration-300">
        <Checkbox className="h-4 w-4 shrink-0 rounded-[4px] border-border [&_svg]:h-3 [&_svg]:w-3" />
        <span className="text-[11px] font-medium text-muted-foreground">Select all shown ({POOL.length})</span>
      </div>
      {/* Pool rows */}
      <div className="p-4 space-y-1.5">
        {POOL.map((item) => <PoolRow key={item.name} item={item} selected={item.selected} />)}
      </div>
    </div>
  );
}

/* ── Review worker row — verbatim from F1v6_OffCycleReviewView ── */
type ReviewWorker = { name: string; country: string; flag: string; count: number; total?: string; qty?: string };
function ReviewRow({ w }: { w: ReviewWorker }) {
  return (
    <div role="button" tabIndex={0} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-card border border-border/30 hover:bg-muted/30 cursor-pointer transition-colors">
      <Avatar className="h-7 w-7 flex-shrink-0">
        <AvatarFallback className="text-[10px] font-medium bg-muted text-muted-foreground">{getInitials(w.name)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate text-foreground">{w.name}</p>
        <p className="text-[11px] text-muted-foreground leading-tight truncate">{w.flag} {w.country} · {w.count} adjustment{w.count !== 1 ? "s" : ""}</p>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        {w.total && <p className="text-sm font-semibold text-foreground tabular-nums leading-tight">{w.total}</p>}
        {w.qty && <p className="text-sm text-muted-foreground tabular-nums leading-tight">{w.qty}</p>}
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
}

const REVIEW: ReviewWorker[] = [
  { name: "Maria Santos", country: "Philippines", flag: "🇵🇭", count: 2, total: "PHP 42,000" },
  { name: "Jonas Schmidt", country: "Germany", flag: "🇩🇪", count: 1, qty: "12 h" },
];

/* ── Review view container ── */
function ReviewView() {
  return (
    <div className="rounded-xl border border-border/40 bg-card/20 shadow-none overflow-hidden">
      <div className="px-4 sm:px-5 pt-4 pb-3 border-b border-border/40 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <p className="text-sm text-muted-foreground truncate">2 workers in this batch · 3 adjustments</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input placeholder="Search..." className="h-9 pl-8 text-xs w-full sm:w-[200px]" />
          </div>
          <Button size="sm" className="h-9 text-xs shrink-0">Continue to payout</Button>
        </div>
      </div>
      <div className="p-3 sm:p-4 space-y-1.5">
        {REVIEW.map((w) => <ReviewRow key={w.name} w={w} />)}
      </div>
    </div>
  );
}

export const OffCycleRun: Story = {
  name: "Off-cycle Run",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        status="Stable"
        title="Off-cycle Run"
        lead={<>An ad-hoc payout assembled by hand outside the regular cycle. Step one is a selectable pool of open adjustments (one row per adjustment, nothing auto-included) with a select-all strip and a per-item Approved / Pending status. Step two is a per-worker review summary of what made it into the batch, ready to continue to payout. Markup verbatim from F1v6_OffCycleSelectionView + F1v6_OffCycleReviewView.</>}
        meta="Verbatim from F1 · Off-cycle selection + review (fronted-admin-v6-1-clone)"
      />

      <h3 style={eyebrow}>Selection — choose adjustments</h3>
      <SelectionView />
      <p style={{ ...note, marginTop: 10 }}>Toolbar: "Choose adjustments · pay date …" + selected count + an orange "N pending will be approved on behalf of …" line, with search · Add adjustment · Create batch. A select-all strip (bg-muted/20) sits above the pool. Each pool row is a Checkbox + avatar + name/flag + type icon · detail, with a right-aligned amount (or quantity) and an Approved (accent-green) / Pending (orange) status. Admin-filed rows carry an "Added by you" badge.</p>

      <h3 style={eyebrow}>Review — batch summary</h3>
      <ReviewView />
      <p style={{ ...note, marginTop: 10 }}>A review surface, not a decision surface — everything here was already approved by inclusion. Header shows "N workers in this batch · M adjustments" with search + Continue to payout. Each worker row (rounded-lg border-border/30 bg-card) opens a per-worker panel; it shows the summed amount and/or quantities and a ChevronRight.</p>

      <h3 style={eyebrow}>Adjustment types</h3>
      <DocTable head={["Type", "Icon", "Notes"]} w0={150} rows={[
        ["Expense", <Receipt className="h-4 w-4 text-muted-foreground" />, "money-denominated · currency amount on the right"],
        ["Bonus", <Award className="h-4 w-4 text-muted-foreground" />, "money-denominated · currency amount"],
        ["Overtime", <Timer className="h-4 w-4 text-muted-foreground" />, "quantity-only · shows hours (priced at payout)"],
        ["Timesheet", <Clock className="h-4 w-4 text-muted-foreground" />, "quantity-only · hours / days"],
        ["Adjustment", <FileText className="h-4 w-4 text-muted-foreground" />, "generic correction · amount or quantity"],
      ]} />

      <h3 style={eyebrow}>Anatomy — pool row</h3>
      <DocTable head={["Part", "Detail", "classes"]} w0={150} rows={[
        ["Select", "checkbox toggles inclusion", "Checkbox h-4 w-4 rounded-[4px] border-border"],
        ["Identity", "avatar (sm+) + name + flag", "text-[13px] font-semibold · flag text-[11px] muted"],
        ["Meta", "type icon · type label · detail", "text-[11px] text-muted-foreground · Icon h-3 w-3"],
        ["Value", "amount or quantity, right-aligned", "ml-auto text-[13px] font-semibold tabular-nums"],
        ["Status", "Approved / Pending", "accent-green-text / orange-600 · CheckCircle2 / Clock"],
      ]} />
    </div>
  ),
};
