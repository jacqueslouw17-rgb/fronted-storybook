import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Send, Trash2, Eye, RefreshCw, FileText, Activity, Calendar, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import { Guidance } from "./guidance";
import "./tokens.css";
import "./typography.css";

/**
 * Components — Card.
 * The surface container. In the 6 interim flows the <Card> is always FLAT — every
 * instance is shadow-none / !shadow-none (no elevation, no hover shadow). Two variants
 * carry the flows; both classNames are verbatim from the source:
 *   1. Section container  rounded-xl border-border/40 bg-card/20 !shadow-none  (~30×)
 *   2. Worker card        border-border/40 bg-card group/wcard  (pipeline column)
 */
const meta: Meta = { title: "Components/Card", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

/** V2 — Worker pipeline card (verbatim base className from F1v6_PipelineView, flat). */
function WorkerCard() {
  return (
    <Card className="w-[280px] max-w-full border border-border/40 bg-card relative group/wcard transition-colors duration-150">
      <CardContent className="p-2.5 space-y-0">
        <div className="flex items-center gap-2">
          <Checkbox className="h-4 w-4" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-[13px] text-foreground truncate">Anika Lindqvist</span>
              <span className="text-sm">🇳🇴</span>
              <Button variant="ghost" size="icon" className="h-5 w-5 ml-auto text-muted-foreground/60 hover:text-destructive hover:bg-destructive/10 relative z-10 flex-shrink-0 opacity-0 group-hover/wcard:opacity-100 transition-opacity duration-150">
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground truncate">Frontend Engineer</p>
          </div>
        </div>
        <div className="mt-3 pt-2.5 border-t border-border/30 flex flex-col gap-1 text-[11px]">
          <div className="flex justify-between items-center"><span className="text-muted-foreground">Monthly Salary</span><span className="font-medium text-foreground tabular-nums">NOK 65,000/mo</span></div>
          <div className="flex justify-between items-center"><span className="text-muted-foreground">Country</span><span className="font-medium text-foreground">Norway</span></div>
          <div className="flex justify-between items-center"><span className="text-muted-foreground">Type</span><span className="font-medium text-foreground">Employee (EOR)</span></div>
        </div>
        <div className="flex gap-2 pt-3">
          <Button variant="outline" size="sm" className="flex-1 text-xs h-7 gap-1"><Settings className="h-3 w-3" /> Configure</Button>
          <Button size="sm" className="flex-1 text-xs h-7 gap-1 bg-gradient-primary hover:opacity-90"><Send className="h-3 w-3" /> Send Form</Button>
        </div>
      </CardContent>
    </Card>
  );
}

/** V1 — Section container (verbatim: bg-card/20 !shadow-none + gradient CardHeader, flat). */
function SectionCard() {
  return (
    <Card className="rounded-xl border border-border/40 bg-card/20 !shadow-none overflow-hidden w-full max-w-[420px]">
      <CardHeader className="bg-gradient-to-r from-primary/[0.02] to-secondary/[0.02] border-b border-border/40 py-4 px-5">
        <span className="text-sm font-semibold">Payout summary</span>
      </CardHeader>
      <CardContent className="p-5 space-y-2 text-sm">
        <div className="flex justify-between"><span className="text-muted-foreground">Workers</span><span className="font-medium tabular-nums">12</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Gross total</span><span className="font-medium tabular-nums">NOK 780,000</span></div>
      </CardContent>
    </Card>
  );
}

/** Worker status badges (verbatim F1v6_PipelineView) — the roster/client card status chip. */
const WORKER_STATUS: [string, string][] = [
  ["Active", "bg-accent-green-fill/10 text-accent-green-text border-accent-green-outline/20"],
  ["Awaiting", "bg-blue-500/10 text-blue-700 border-blue-500/20"],
  ["Inactive", "bg-amber-500/10 text-amber-700 border-amber-500/20"],
  ["Ended", "bg-muted text-muted-foreground border-border"],
  ["Resigned", "bg-amber-500/10 text-amber-700 border-amber-500/20"],
  ["Terminated", "bg-destructive/10 text-destructive border-destructive/20"],
];
const statusCls = (label: string) => WORKER_STATUS.find(([l]) => l === label)?.[1] || WORKER_STATUS[0][1];

/** V3 — F6 client / roster card (read-only): status Badge + a single View button. */
function WorkerCardClient({ status = "Active" }: { status?: string }) {
  return (
    <Card className="w-[280px] max-w-full border border-border/40 bg-card group hover:border-border transition-colors">
      <CardContent className="p-2.5 space-y-0">
        <div className="flex items-center gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-[13px] text-foreground truncate">Marcus Chen</span>
              <span className="text-sm">🇸🇬</span>
              <Badge variant="outline" className={cn("text-[9px] px-1.5 py-0 h-[14px] flex-shrink-0 pointer-events-none ml-auto", statusCls(status))}>{status}</Badge>
            </div>
            <p className="text-xs text-muted-foreground truncate">Senior Backend Engineer</p>
          </div>
        </div>
        <div className="mt-3 pt-2.5 border-t border-border/30 flex flex-col gap-1 text-[11px]">
          <div className="flex justify-between items-center"><span className="text-muted-foreground">Monthly Fee</span><span className="font-medium text-foreground tabular-nums">SGD 12,000/mo</span></div>
          <div className="flex justify-between items-center"><span className="text-muted-foreground">Country</span><span className="font-medium text-foreground">Singapore</span></div>
          <div className="flex justify-between items-center"><span className="text-muted-foreground">Type</span><span className="font-medium text-foreground">Contractor (COR)</span></div>
        </div>
        <div className="flex gap-2 pt-3">
          <Button variant="outline" size="sm" className="w-full text-xs h-7 gap-1"><Eye className="h-3 w-3" /> View</Button>
        </div>
      </CardContent>
    </Card>
  );
}

/** V4 — F4.1/F4.2 dashboard hero (verbatim F41v81_PayoutHeroCard): a "last" blue tile + a "next" plain tile. */
function PayoutHero({ noun = "payout" }: { noun?: "payout" | "invoice" }) {
  const Noun = noun[0].toUpperCase() + noun.slice(1);
  return (
    <div className="rounded-xl border border-border/40 bg-card/20 overflow-hidden w-full max-w-[560px]">
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="group bg-primary/[0.06] hover:bg-primary/[0.1] rounded-xl p-4 sm:p-5 border border-primary/20 cursor-pointer transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2 text-primary/80"><FileText className="h-4 w-4" /><span className="text-sm font-medium">Last {noun}</span></div>
              <span className="flex items-center gap-1 text-sm text-primary/70 group-hover:text-primary transition-colors">Download<Download className="h-3.5 w-3.5" /></span>
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">Dec 15, 2025</h2>
              <p className="text-sm text-muted-foreground">Amount: <span className="font-medium text-foreground">PHP 42,166.67</span> net</p>
            </div>
          </div>
          <div className="bg-background rounded-xl p-4 sm:p-5 border border-border/30">
            <div className="flex items-center gap-2 text-muted-foreground mb-3"><Calendar className="h-4 w-4" /><span className="text-sm font-medium">Next {noun}</span></div>
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">Jan 15, 2026</h2>
              <p className="text-sm text-muted-foreground">Please submit adjustments before Jan 10.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const CardStory: Story = {
  name: "Card",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Components"
        status="Stable"
        title="Card"
        lead={<>
        The surface container. Across the interim flows the Card is <strong>always flat</strong> — every instance
        is <code>shadow-none</code> / <code>!shadow-none</code>. Two variants carry the flows; both are verbatim.
        </>}
      />

      <h3 style={eyebrow}>Variants</h3>
      <DocTable head={["Variant", "Example", "Where / classes"]} w0={150} wLast={260} rows={[
        ["Section container", <SectionCard />, "Payroll / approve / detail sections (~30×). rounded-xl bg-card/20 !shadow-none · gradient CardHeader border-b"],
        ["Worker card (F1 admin)", <WorkerCard />, "Pipeline column. checkbox + hover bin + 2 action buttons · bg-card group/wcard · draggable · w-[280px]"],
        ["Worker card (F6 client)", <WorkerCardClient />, "F6 Workers tab (clientMode) + roster. Read-only: status Badge (ml-auto) + single View button, no checkbox/bin"],
      ]} />

      <h3 style={eyebrow}>Worker card — actions per pipeline column (live F1)</h3>
      <DocTable head={["Pipeline column", "Actions", "classes"]} w0={200} wLast={280} rows={[
        ["Offer Accepted", <div className="flex gap-2 w-[260px] max-w-full"><Button variant="outline" size="sm" className="flex-1 text-xs h-7 gap-1"><Settings className="h-3 w-3" /> Configure</Button><Button size="sm" className="flex-1 text-xs h-7 gap-1 bg-gradient-primary hover:opacity-90"><Send className="h-3 w-3" /> Send Form</Button></div>, "outline Configure + gradient Send Form"],
        ["Awaiting worker details", <div className="flex gap-2 w-[260px] max-w-full"><Button variant="outline" size="sm" className="flex-1 text-xs h-7 gap-1"><Eye className="h-3 w-3" /> View</Button><Button size="sm" className="flex-1 text-xs h-7 gap-1 bg-gradient-primary hover:opacity-90"><RefreshCw className="h-3 w-3" /> Resend</Button></div>, "outline View + gradient Resend"],
        ["Prepare Contract", <div className="flex gap-2 w-[260px] max-w-full"><Button variant="outline" size="sm" className="flex-1 text-xs h-7 gap-1"><Eye className="h-3 w-3" /> View</Button><Button size="sm" className="flex-1 text-xs h-7 gap-1 bg-gradient-primary hover:opacity-90"><FileText className="h-3 w-3" /> Draft Contract</Button></div>, "outline View + gradient Draft Contract"],
        ["Waiting for Signature", <div className="flex gap-2 w-[260px] max-w-full"><Button variant="outline" size="sm" className="flex-1 text-xs h-7 gap-1"><Eye className="h-3 w-3" /> View</Button><Button size="sm" className="flex-1 text-xs h-7 gap-1 bg-gradient-primary hover:opacity-90"><Activity className="h-3 w-3" /> Track Progress</Button></div>, "outline View + gradient Track Progress"],
      ]} />
      <p style={{ ...note, marginTop: 10 }}>1st = outline (Configure/View) · 2nd = gradient primary, label changes per column</p>

      <h3 style={eyebrow}>Worker status badges (F6 roster / client card — verbatim F1v6_PipelineView)</h3>
      <DocTable head={["Status", "Badge", "classes"]} w0={140} wLast={340} rows={WORKER_STATUS.map(([label, badgeCls]) => [
        label,
        <Badge variant="outline" className={cn("text-[9px] px-1.5 py-0 h-[14px] pointer-events-none", badgeCls)}>{label}</Badge>,
        badgeCls,
      ]) as Array<[React.ReactNode, React.ReactNode, React.ReactNode]>} />
      <p style={{ ...note, marginTop: 10 }}>badge text-[9px] px-1.5 h-[14px] outline · active=green · awaiting=blue · inactive/resigned=amber · ended=muted · terminated=destructive</p>

      <h3 style={eyebrow}>Payout / invoice hero (F4.1 &amp; F4.2 dashboards)</h3>
      <PayoutHero noun="payout" />
      <p style={{ ...note, marginTop: 10 }}>container rounded-xl border-border/40 bg-card/20 · grid 2 tiles · Last = clickable bg-primary/[0.06] hover:bg-primary/[0.1] border-primary/20 + Download · Next = bg-background border-border/30 · date text-2xl sm:text-3xl font-semibold tracking-tight · contractor variant swaps “payout”→“invoice”</p>

      <p style={{ ...note, marginTop: 14 }}>anatomy: CardContent p-2.5 · header gap-2 (Checkbox h-4, name text-[13px], flag, hover bin) · data mt-3 pt-2.5 border-t border-border/30 gap-1 text-[11px] · buttons h-7 text-xs · no shadow</p>
      <Guidance k="card" />
    </div>
  ),
};
