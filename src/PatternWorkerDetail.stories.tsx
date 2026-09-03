import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ChevronLeft, ChevronRight, ChevronDown, Eye, Download, Lock, Info, AlertTriangle, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import { cn } from "@/lib/utils";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Worker Detail (verbatim from F1 Fronted admin).
 * The right-side worker profile drawer. Two variants: the active/editable drawer
 * (F1v6_WorkerDetailDrawer — header + exception + payslip preview card + breakdown)
 * and the "Done" read-only drawer (F1v6_DoneWorkerDetailDrawer — header + section cards
 * of label/value detail rows + documents). Markup verbatim from source (primary text uses
 * text-emphasis per the system's a11y swap).
 */
const meta: Meta = { title: "Patterns/Worker Detail", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

/* ── Static section card — represents SectionAccordion (not in the UI kit) ── */
function SectionCard({ title, badge, headerAction, defaultOpen = true, children }: { title: string; badge?: React.ReactNode; headerAction?: React.ReactNode; defaultOpen?: boolean; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/50 overflow-hidden">
      <div className="flex items-center justify-between gap-2 px-5 py-3">
        <div className="flex items-center gap-2 min-w-0">
          <h3 className="text-sm font-medium text-foreground leading-tight truncate">{title}</h3>
          {badge}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {headerAction}
          <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", defaultOpen && "rotate-180")} />
        </div>
      </div>
      {defaultOpen && <div className="px-5 pb-4">{children}</div>}
    </div>
  );
}

/* ── Read-only detail row — verbatim from DoneWorkerDetailDrawer.DetailRow (view mode) ── */
function DetailRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="group flex items-start justify-between gap-4 -mx-2 px-2 py-1.5 rounded-md hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-1.5 min-w-0">
        <span className="text-sm text-muted-foreground truncate">{label}</span>
        <button type="button" aria-label={`More info about ${label}`} className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground">
          <Info className="h-3 w-3" />
        </button>
      </div>
      <span className="text-sm font-medium text-foreground text-right">{value || "—"}</span>
    </div>
  );
}

/* ── Document status badge — verbatim from DoneWorkerDetailDrawer.StatusBadge ── */
function StatusBadge({ status }: { status: "uploaded" | "verified" | "missing" }) {
  const config = {
    uploaded: { label: "Uploaded", className: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
    verified: { label: "Verified", className: "bg-accent-green-fill/10 text-accent-green-text border-accent-green-outline/20" },
    missing: { label: "Missing", className: "bg-destructive/10 text-destructive border-destructive/20" },
  };
  const c = config[status];
  return <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0 h-4", c.className)}>{c.label}</Badge>;
}

/* ── Document row — verbatim from DoneWorkerDetailDrawer.DocumentRow ── */
function DocumentRow({ name, status, fileName }: { name: string; status: "uploaded" | "verified"; fileName: string }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg border border-border/40 bg-card/30 w-full">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground truncate">{name}</p>
          <p className="text-[11px] text-muted-foreground">{fileName}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button type="button" aria-label={`Open ${name}`} className="text-[11px] font-medium text-foreground/80 transition-colors hover:text-foreground hover:underline">View</button>
        </div>
      </div>
    </div>
  );
}

/* ── Active / editable worker drawer (F1v6_WorkerDetailDrawer, Submissions step) ── */
function ActiveWorkerDrawer() {
  return (
    <div className="w-[480px] max-w-full rounded-lg border border-border bg-background overflow-hidden shadow-overlay flex flex-col">
      {/* Header — matches payroll drawer pattern */}
      <div className="px-5 pt-4 pb-3 border-b border-border/30 shrink-0 bg-background">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-foreground leading-tight truncate">Maria Santos</span>
              <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4 shrink-0 bg-amber-500/10 text-amber-600 border-amber-500/20">Needs attention</Badge>
            </div>
            <p className="text-[11px] text-muted-foreground/60 mt-0.5">Employee · Philippines · PHP</p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><ChevronLeft className="h-4 w-4" /></Button>
            <span className="text-[10px] text-muted-foreground/60 tabular-nums">3/8</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><ChevronRight className="h-4 w-4" /></Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-5 space-y-5">
          {/* Exception */}
          <div className="p-3 rounded-xl border border-amber-500/30 bg-amber-500/5">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-medium text-amber-700">Start date mismatch</p>
                  <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4 bg-amber-500/10 text-amber-600 border-amber-500/20">Warning</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">Contract shows different date</p>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="h-6 text-xs px-2">Verify dates</Button>
                  <Button variant="ghost" size="sm" className="h-6 text-xs px-2 text-muted-foreground"><Bell className="h-3 w-3 mr-1" />Snooze</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Payslip preview card */}
          <div className="p-5 rounded-xl border border-border/40 bg-card/50">
            <div className="text-center mb-4">
              <p className="text-xs text-muted-foreground mb-1">Net Pay · This Cycle</p>
              <p className="text-3xl font-bold text-foreground tabular-nums">PHP 238,000</p>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center p-2 rounded-lg bg-muted/30">
                <p className="text-[10px] text-muted-foreground">Gross</p>
                <p className="text-sm font-medium tabular-nums">PHP 280,000</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-muted/30">
                <p className="text-[10px] text-muted-foreground">Deductions</p>
                <p className="text-sm font-medium tabular-nums text-muted-foreground">-PHP 42,000</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-muted/30">
                <p className="text-[10px] text-muted-foreground">Adjustments</p>
                <p className="text-sm font-medium tabular-nums">+PHP 0</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="default" size="sm" className="flex-1 gap-1.5"><Eye className="h-3.5 w-3.5" />Preview Payslip</Button>
              <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-3.5 w-3.5" /></Button>
            </div>
          </div>

          {/* View Full Breakdown (expanded) */}
          <div>
            <Button variant="ghost" className="w-full justify-between h-auto py-3 px-0 hover:bg-transparent">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">View Full Breakdown</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform rotate-180" />
            </Button>
            <div className="p-4 rounded-xl border border-border/40 bg-card/30 space-y-2.5">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Base salary</span><span className="font-medium tabular-nums">PHP 336,000</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Scheduled / Actual days</span><span className="font-medium tabular-nums">22 / 21</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Leave taken</span><span className="font-medium tabular-nums">1 day</span></div>
              <div className="flex justify-between text-sm border-t border-border/40 pt-2.5"><span className="text-muted-foreground">Gross pay</span><span className="font-medium tabular-nums">PHP 280,000</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Deductions (tax, SSS, etc.)</span><span className="font-medium tabular-nums text-muted-foreground">-PHP 42,000</span></div>
              <div className="flex justify-between text-sm border-t border-border/40 pt-2.5"><span className="font-medium text-foreground">Net pay</span><span className="font-semibold text-foreground tabular-nums">PHP 238,000</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Done / read-only worker drawer (F1v6_DoneWorkerDetailDrawer) ── */
function DoneWorkerDrawer() {
  return (
    <div className="w-[520px] max-w-full rounded-lg border border-border bg-background overflow-hidden shadow-overlay flex flex-col">
      {/* Header — matches payroll drawer pattern */}
      <div className="px-5 pt-4 pb-3 border-b border-border/30 shrink-0">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-foreground leading-tight truncate">Marcus Chen</span>
            <span className="text-base shrink-0">🇸🇬</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border shrink-0 bg-accent-green-fill/10 text-accent-green-text border-accent-green-outline/20">Active</span>
          </div>
          <p className="text-[11px] text-muted-foreground/60 mt-0.5">Contractor · Senior Backend Engineer</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-6 pb-6 pt-3 space-y-3">
          <div className="space-y-3">
            {/* 1) Personal Profile */}
            <SectionCard title="Personal Profile">
              <div className="space-y-0.5">
                <DetailRow label="Full name" value="Marcus Chen" />
                <DetailRow label="Email" value="marcus.chen@example.com" />
                <DetailRow label="Phone" value="+65 8123 4567" />
                <DetailRow label="Date of birth" value="Mar 15, 1992" />
                <DetailRow label="Nationality" value="Singaporean" />
                <DetailRow label="Residential address" value="123 Orchard Road, Singapore" />
                <DetailRow label="National ID" value="S1234567D" />
              </div>
            </SectionCard>

            {/* 2) Working Engagement (collapsed) */}
            <SectionCard title="Working Engagement" defaultOpen={false}>
              <div />
            </SectionCard>

            {/* 3) Payout Destination (collapsed) */}
            <SectionCard title="Payout Destination" defaultOpen={false}>
              <div />
            </SectionCard>

            {/* 4) Documents */}
            <SectionCard
              title="Documents"
              badge={<Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 bg-accent-green-fill/10 text-accent-green-text border-accent-green-outline/20">Verified</Badge>}
            >
              <div className="space-y-2">
                <DocumentRow name="Contractor agreement" status="verified" fileName="Marcus_Chen_Agreement_Signed.pdf" />
                <DocumentRow name="Identity document" status="verified" fileName="Marcus_ID_doc.pdf" />
                <DocumentRow name="Proof of address" status="verified" fileName="Marcus_Proof_of_Address.pdf" />
                <div className="flex items-center justify-between gap-4 p-3 rounded-lg border border-border/40 bg-muted/20">
                  <div className="min-w-0"><span className="text-sm text-muted-foreground truncate">Tax form</span></div>
                  <StatusBadge status="missing" />
                </div>
              </div>
            </SectionCard>

            {/* Locked section row — verbatim from LockedSectionRow */}
            <div className="rounded-xl border border-border/40 bg-card/20 px-5 py-3 opacity-60">
              <div className="flex items-center gap-2">
                <Lock className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
                <h3 className="text-sm font-medium text-muted-foreground leading-tight">Payroll Parameters</h3>
              </div>
              <p className="text-[11px] text-muted-foreground/70 mt-1 ml-[22px]">Collected during <span className="font-medium">Onboarding</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const WorkerDetail: Story = {
  name: "Worker Detail",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        status="Stable"
        title="Worker Detail"
        lead={<>The right-side worker profile drawer from the Fronted admin. An active/editable drawer shows the header (name, status badge, cycle nav), an exception alert, a payslip-preview card (net pay + Gross / Deductions / Adjustments tiles) and a full breakdown. The "Done" read-only drawer shows the same header pattern with a lifecycle status pill and collapsible section cards of label/value detail rows plus a documents list. Markup verbatim from F1v6_WorkerDetailDrawer and F1v6_DoneWorkerDetailDrawer.</>}
        meta="Verbatim from F1 · Worker detail drawer (fronted-admin-v6-1-clone)"
      />

      <h3 style={eyebrow}>Active worker drawer</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}><ActiveWorkerDrawer /></div>
      <p style={{ ...note, marginTop: 10 }}>Header px-5 pt-4 pb-3 border-b border-border/30 (name + status badge + prev/next nav) · exception p-3 rounded-xl border-amber-500/30 bg-amber-500/5 · payslip card p-5 rounded-xl border-border/40 bg-card/50 with 3-col tiles · breakdown card border-border/40 bg-card/30 label/value rows.</p>

      <h3 style={eyebrow}>Done worker drawer (read-only)</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}><DoneWorkerDrawer /></div>
      <p style={{ ...note, marginTop: 10 }}>Header adds flag + lifecycle status pill (rounded-full border) · section cards rounded-xl border-border/60 bg-card/50 · DetailRow = label (muted) / value (foreground) with hover Info · DocumentRow border-border/40 bg-card/30 + View · missing doc uses StatusBadge · fully-gated section = LockedSectionRow (opacity-60 + Lock).</p>

      <h3 style={eyebrow}>Anatomy</h3>
      <DocTable head={["Part", "Detail", "classes"]} w0={160} rows={[
        ["Header", "Name + status badge (active) or flag + lifecycle pill (done); type · country · currency", "px-5 pt-4 pb-3 border-b border-border/30 · pill rounded-full border"],
        ["Exception", "Warning / blocking issue with fix + snooze", "p-3 rounded-xl border-amber-500/30 bg-amber-500/5 · AlertTriangle"],
        ["Payslip card", "Net pay heading + Gross / Deductions / Adjustments tiles + Preview/Download", "p-5 rounded-xl border-border/40 bg-card/50 · tiles bg-muted/30"],
        ["Breakdown", "Base / days / leave / gross / deductions / net rows", "border-border/40 bg-card/30 · rows flex justify-between text-sm"],
        ["Section card", "Collapsible titled group (SectionAccordion)", "rounded-xl border-border/60 bg-card/50 · ChevronDown"],
        ["Detail row", "Label (muted) / value (foreground), hover Info", "-mx-2 px-2 py-1.5 rounded-md hover:bg-muted/50"],
        ["Document row", "Name + filename + View; StatusBadge for missing", "border-border/40 bg-card/30 · badge uploaded/verified/missing"],
        ["Locked row", "Fully-gated section placeholder", "rounded-xl border-border/40 bg-card/20 opacity-60 + Lock"],
      ]} />
    </div>
  ),
};
