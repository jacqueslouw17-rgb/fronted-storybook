import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Settings, Send, Eye, RefreshCw, FileText, Trash2, Info, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { wrap, eyebrow, note, PageHeader } from "./_docTable";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Worker Pipeline (verbatim from F1 Fronted admin, Workers kanban).
 * A column (muted container, rounded header + body) holds worker cards. Each card:
 * checkbox + name + flag + hover-trash, a detail block, and a two-button footer whose pair
 * depends on the stage (Configure / Send Form, View / Resend, View / Draft Contract, …).
 * Markup lifted from the live DOM.
 */
const meta: Meta = { title: "Patterns/Worker Pipeline", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

type Btn = { label: string; icon: LucideIcon };
type Card = { name: string; flag: string; role: string; rows: [string, string][]; left: Btn; right: Btn };
type Column = { title: string; count: number; card: Card };

const COLUMNS: Column[] = [
  { title: "Offer Accepted", count: 1, card: {
    name: "Anika Lindqvist", flag: "🇳🇴", role: "Frontend Engineer",
    rows: [["Monthly salary", "NOK 65,000/mo"], ["Country", "Norway"], ["Type", "Employee (EOR)"]],
    left: { label: "Configure", icon: Settings }, right: { label: "Send Form", icon: Send } } },
  { title: "Awaiting worker details", count: 2, card: {
    name: "Yuki Tanaka", flag: "🇯🇵", role: "iOS Engineer",
    rows: [["Monthly salary", "JPY 850,000/mo"], ["Country", "Japan"], ["Type", "Employee (EOR)"]],
    left: { label: "View", icon: Eye }, right: { label: "Resend", icon: RefreshCw } } },
  { title: "Prepare Contract", count: 2, card: {
    name: "Marcus Chen", flag: "🇸🇬", role: "Senior Backend Engineer",
    rows: [["Monthly fee", "SGD 12,000/mo"], ["Country", "Singapore"], ["Type", "Contractor (COR)"]],
    left: { label: "View", icon: Eye }, right: { label: "Draft Contract", icon: FileText } } },
];

const CHECK = "peer shrink-0 rounded-sm border border-primary h-4 w-4 inline-block";
const BTN_BASE = "flex-1 inline-flex items-center justify-center gap-1.5 whitespace-nowrap font-medium rounded-md h-7 px-2.5 text-xs transition-all duration-200";

function WorkerCard({ c }: { c: Card }) {
  return (
    <div className="rounded-2xl text-card-foreground shadow-card border border-border/40 bg-card relative group/wcard transition-colors duration-150">
      <div className="p-2.5 space-y-0">
        <div className="flex items-center gap-2">
          <span className={CHECK} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-[13px] text-foreground truncate">{c.name}</span>
              <span className="text-sm">{c.flag}</span>
              <button className="h-5 w-5 ml-auto inline-flex items-center justify-center rounded-md text-muted-foreground/60 hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover/wcard:opacity-100 transition-opacity duration-150"><Trash2 className="h-3 w-3" /></button>
            </div>
            <p className="text-xs text-muted-foreground truncate">{c.role}</p>
          </div>
        </div>
        <div className="mt-3 pt-2.5 border-t border-border/30 flex flex-col gap-1 text-[11px]">
          {c.rows.map(([k, v]) => (
            <div key={k} className="flex justify-between items-center">
              <span className="text-muted-foreground">{k}</span>
              <span className="font-medium text-foreground tabular-nums">{v}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <button className={cn(BTN_BASE, "border border-border bg-background hover:bg-foreground hover:text-background")}><c.left.icon className="h-3.5 w-3.5" />{c.left.label}</button>
          <button className={cn(BTN_BASE, "bg-gradient-primary text-primary-foreground hover:shadow-lg hover:-translate-y-0.5")}><c.right.icon className="h-3.5 w-3.5" />{c.right.label}</button>
        </div>
      </div>
    </div>
  );
}

function PipelineColumn({ col }: { col: Column }) {
  return (
    <div className="w-[280px] flex-shrink-0 lg:flex-1 lg:w-auto lg:min-w-[260px]">
      <div className="p-3 rounded-t-lg border-t border-x bg-muted/50 border-border">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span className={CHECK} />
            <span className="text-sm font-semibold text-foreground truncate">{col.title}</span>
            <Info className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
          </div>
          <span className="text-xs font-medium text-muted-foreground tabular-nums">{col.count}</span>
        </div>
      </div>
      <div className="p-3 space-y-3 border-x border-b rounded-b-lg bg-muted/50 border-border sm:min-h-[320px]">
        <WorkerCard c={col.card} />
      </div>
    </div>
  );
}

export const WorkerPipeline: Story = {
  name: "Worker Pipeline",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        status="Stable"
        title="Worker Pipeline"
        lead={<>The Workers kanban in the Fronted admin. Each stage is a column (muted container, rounded header + body) holding worker cards; every card has a checkbox, name + flag, a hover-revealed delete, a detail block and a two-button footer whose pair changes per stage. Markup verbatim from the live DOM.</>}
        meta="Verbatim from F1 · Workers tab (fronted-admin-dashboard-v6-1)"
      />

      <h3 style={eyebrow}>Pipeline columns</h3>
      <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 6 }}>
        {COLUMNS.map((col) => <PipelineColumn key={col.title} col={col} />)}
      </div>
      <p style={{ ...note, marginTop: 10 }}>Column w-[280px] (lg:flex-1) · header p-3 rounded-t-lg bg-muted/50 · body p-3 space-y-3 rounded-b-lg bg-muted/50 · card rounded-2xl shadow-card border-border/40 bg-card.</p>

      <h3 style={eyebrow}>Worker card — anatomy</h3>
      <div style={{ maxWidth: 300 }}><WorkerCard c={COLUMNS[0].card} /></div>
      <p style={{ ...note, marginTop: 10 }}>Header: checkbox + name (font-semibold text-[13px]) + flag + hover trash (opacity-0 group-hover) · role subtitle · detail block (mt-3 pt-2.5 border-t, rows text-[11px] label/value) · footer two buttons.</p>

      <h3 style={eyebrow}>Footer action pairs (by stage)</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
        {COLUMNS.map((col) => (
          <div key={col.title} className="rounded-xl border border-border/40 bg-card p-3">
            <div className="text-xs font-medium text-muted-foreground mb-2">{col.title}</div>
            <div className="flex gap-2">
              <button className={cn(BTN_BASE, "border border-border bg-background hover:bg-foreground hover:text-background")}><col.card.left.icon className="h-3.5 w-3.5" />{col.card.left.label}</button>
              <button className={cn(BTN_BASE, "bg-gradient-primary text-primary-foreground hover:shadow-lg hover:-translate-y-0.5")}><col.card.right.icon className="h-3.5 w-3.5" />{col.card.right.label}</button>
            </div>
          </div>
        ))}
      </div>
      <p style={{ ...note, marginTop: 10 }}>Outline (left) = border border-border bg-background hover:bg-foreground hover:text-background · Primary (right) = bg-gradient-primary text-primary-foreground. Pair = Configure/Send Form · View/Resend · View/Draft Contract · (Waiting for Signature → View/Track Progress).</p>
    </div>
  ),
};
