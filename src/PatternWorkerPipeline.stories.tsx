import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Settings, Send, Eye, RotateCcw, FileEdit, Trash2, Info, Plus, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { wrap, eyebrow, note, PageHeader } from "./_docTable";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Worker Pipeline (verbatim from F1 Fronted admin, Workers kanban).
 * A column (config.color container, rounded header + body) holds worker cards. Each card:
 * optional checkbox + name + flag + hover-trash, a detail block, and a two-button footer whose pair
 * depends on the stage (Configure / Send Form, View / Resend, View / Draft Contract, …).
 * Markup lifted from F1v6_PipelineView (Card / Button / Badge / Checkbox from the vendored ui/).
 */
const meta: Meta = { title: "Patterns/Worker Pipeline", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

type Btn = { label: string; icon: LucideIcon; iconClass: string };
type Footer = { wrap: boolean; btnH: string; left: Btn; right: Btn; rightGap: string };
type Card_ = {
  name: string; flag: string; role: string;
  amountLabel: string; amount: string; country: string; type: string;
  showCheck: boolean; showTrash: boolean; footer: Footer;
};
type Column = {
  status: string; title: string; count: number; headerColor: string;
  showSelectAll: boolean; showAdd: boolean; card: Card_;
};

const COLUMNS: Column[] = [
  {
    status: "offer-accepted", title: "Offer Accepted", count: 1,
    headerColor: "bg-muted/50 border-border", showSelectAll: true, showAdd: true,
    card: {
      name: "Anika Lindqvist", flag: "🇳🇴", role: "Frontend Engineer",
      amountLabel: "Monthly Salary", amount: "NOK 65,000/mo", country: "Norway", type: "Employee (EOR)",
      showCheck: true, showTrash: true,
      footer: {
        wrap: true, btnH: "h-7",
        left: { label: "Configure", icon: Settings, iconClass: "h-3 w-3" },
        right: { label: "Send Form", icon: Send, iconClass: "h-3 w-3" }, rightGap: "gap-1",
      },
    },
  },
  {
    status: "data-pending", title: "Awaiting worker details", count: 2,
    headerColor: "bg-accent-yellow-fill/30 border-accent-yellow-outline/20", showSelectAll: false, showAdd: false,
    card: {
      name: "Yuki Tanaka", flag: "🇯🇵", role: "iOS Engineer",
      amountLabel: "Monthly Salary", amount: "JPY 850,000/mo", country: "Japan", type: "Employee (EOR)",
      showCheck: false, showTrash: false,
      footer: {
        wrap: true, btnH: "h-8",
        left: { label: "View", icon: Eye, iconClass: "h-3 w-3" },
        right: { label: "Resend", icon: RotateCcw, iconClass: "h-3.5 w-3.5" }, rightGap: "gap-1.5",
      },
    },
  },
  {
    status: "drafting", title: "Prepare Contract", count: 2,
    headerColor: "bg-accent-blue-fill/30 border-accent-blue-outline/20", showSelectAll: true, showAdd: false,
    card: {
      name: "Marcus Chen", flag: "🇸🇬", role: "Senior Backend Engineer",
      amountLabel: "Monthly Fee", amount: "SGD 12,000/mo", country: "Singapore", type: "Contractor (COR)",
      showCheck: true, showTrash: false,
      footer: {
        wrap: false, btnH: "h-7",
        left: { label: "View", icon: Eye, iconClass: "h-3 w-3" },
        right: { label: "Draft Contract", icon: FileEdit, iconClass: "h-3 w-3" }, rightGap: "gap-1",
      },
    },
  },
];

function FooterButtons({ f }: { f: Footer }) {
  const left = (
    <Button variant="outline" size="sm" className={cn("flex-1 text-xs gap-1", f.btnH)}>
      <f.left.icon className={f.left.iconClass} />
      {f.left.label}
    </Button>
  );
  const right = (
    <Button size="sm" className={cn("flex-1 text-xs bg-gradient-primary hover:opacity-90", f.btnH, f.rightGap)}>
      <f.right.icon className={f.right.iconClass} />
      {f.right.label}
    </Button>
  );
  if (f.wrap) {
    return (
      <div className="w-full space-y-2">
        <div className="flex gap-2">{left}{right}</div>
      </div>
    );
  }
  return <div className="w-full flex gap-2">{left}{right}</div>;
}

function WorkerCard({ c }: { c: Card_ }) {
  return (
    <Card className="border border-border/40 bg-card relative group/wcard transition-colors duration-150">
      <CardContent className="p-2.5 space-y-0">
        <div className="flex items-center gap-2">
          {c.showCheck && <Checkbox className="h-4 w-4" />}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-[13px] text-foreground truncate">{c.name}</span>
              <span className="text-sm">{c.flag}</span>
              {c.showTrash && (
                <Button variant="ghost" size="icon" className="h-5 w-5 ml-auto text-muted-foreground/60 hover:text-destructive hover:bg-destructive/10 relative z-10 flex-shrink-0 opacity-0 group-hover/wcard:opacity-100 transition-opacity duration-150">
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground truncate">{c.role}</p>
          </div>
        </div>
        <div className="mt-3 pt-2.5 border-t border-border/30 flex flex-col gap-1 text-[11px]">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">{c.amountLabel}</span>
            <span className="font-medium text-foreground tabular-nums">{c.amount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Country</span>
            <span className="font-medium text-foreground">{c.country}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Type</span>
            <span className="font-medium text-foreground">{c.type}</span>
          </div>
        </div>
        <div className="flex gap-2 pt-3">
          <FooterButtons f={c.footer} />
        </div>
      </CardContent>
    </Card>
  );
}

function PipelineColumn({ col }: { col: Column }) {
  return (
    <div className="w-[280px] flex-shrink-0 lg:flex-1 lg:w-auto lg:min-w-[260px] transition-all duration-300">
      <div className={cn("p-3 rounded-t-lg border-t border-x transition-all duration-300", col.headerColor)}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            {col.showSelectAll && <Checkbox className="h-4 w-4" />}
            <div className="flex min-w-0 items-center gap-1.5">
              <h3 className="font-semibold text-[15px] text-foreground whitespace-nowrap">{col.title}</h3>
              <Info className="h-3 w-3 text-muted-foreground" />
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {col.showAdd && (
              <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full text-muted-foreground hover:text-emphasis hover:bg-primary/10">
                <Plus className="h-3.5 w-3.5" />
              </Button>
            )}
            <Badge variant="outline" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {col.count}
            </Badge>
          </div>
        </div>
      </div>
      <div className={cn("sm:min-h-[400px] sm:max-h-[calc(100vh-260px)] sm:overflow-y-auto p-3 space-y-3 border-x border-b rounded-b-lg", col.headerColor)}>
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
        lead={<>The Workers kanban in the Fronted admin. Each stage is a column (config.color container, rounded header + body) holding worker cards; every card has an optional checkbox, name + flag, a hover-revealed delete, a detail block and a two-button footer whose pair changes per stage. Markup verbatim from F1v6_PipelineView.</>}
        meta="Verbatim from F1 · Workers tab (fronted-admin-dashboard-v6-1)"
      />

      <h3 style={eyebrow}>Pipeline columns</h3>
      <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 6 }}>
        {COLUMNS.map((col) => <PipelineColumn key={col.status} col={col} />)}
      </div>
      <p style={{ ...note, marginTop: 10 }}>Column w-[280px] (lg:flex-1) · header p-3 rounded-t-lg border-t border-x + per-stage config.color (bg-muted/50 · bg-accent-yellow-fill/30 · bg-accent-blue-fill/30) · body sm:min-h-[400px] p-3 space-y-3 rounded-b-lg (same config.color) · card rounded-2xl shadow-card border-border/40 bg-card. Title h3 text-[15px] + Info; count is an outline Badge pill (h-5 w-5 rounded-full).</p>

      <h3 style={eyebrow}>Worker card — anatomy</h3>
      <div style={{ maxWidth: 300 }}><WorkerCard c={COLUMNS[0].card} /></div>
      <p style={{ ...note, marginTop: 10 }}>Header: checkbox + name (font-semibold text-[13px]) + flag + hover trash (Button ghost, opacity-0 group-hover/wcard) · role subtitle · detail block (mt-3 pt-2.5 border-t, rows text-[11px]; only the amount value is tabular-nums) · footer flex gap-2 pt-3 with two buttons.</p>

      <h3 style={eyebrow}>Footer action pairs (by stage)</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
        {COLUMNS.map((col) => (
          <div key={col.status} className="rounded-xl border border-border/40 bg-card p-3">
            <div className="text-xs font-medium text-muted-foreground mb-2">{col.title}</div>
            <FooterButtons f={col.card.footer} />
          </div>
        ))}
      </div>
      <p style={{ ...note, marginTop: 10 }}>Outline (left) = Button variant="outline" (border border-border bg-background hover:bg-foreground hover:text-background) · Primary (right) = Button default (bg-gradient-primary text-primary-foreground hover:opacity-90). Pair = Configure/Send Form (h-7) · View/Resend (h-8, RotateCcw) · View/Draft Contract (h-7, FileEdit) · (Waiting for Signature → View/Track Progress).</p>
    </div>
  ),
};
