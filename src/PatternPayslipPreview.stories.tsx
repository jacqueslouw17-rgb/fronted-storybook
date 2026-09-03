import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Download, ChevronDown, Building2, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Payslip Preview (verbatim from F1 Fronted admin, F1v6_PayslipPreviewModal).
 * A dialog showing a worker payslip: header (Payslip badge + period + Download PDF), a worker
 * card, three summary tiles (Gross / Deductions / Net), and earnings + deductions line items.
 * Markup verbatim from the source (primary text uses text-emphasis per the system's a11y swap).
 */
const meta: Meta = { title: "Patterns/Payslip Preview", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const c = (n: number) => `SGD ${n.toLocaleString()}`;
const EARNINGS: [string, number][] = [["Base Salary", 6120], ["Housing Allowance", 1020], ["Transport Allowance", 510]];
const DEDUCTIONS: [string, number][] = [["Income Tax", 1148], ["Social Security", 255], ["Health Insurance", 127]];
const gross = 7650, ded = 1530, net = 6120;

function Row({ k, v, minus }: { k: string; v: number; minus?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{k}</span>
      <span className={cnn("tabular-nums", minus ? "text-destructive" : "text-foreground")}>{minus ? "-" : ""}{c(v)}</span>
    </div>
  );
}
function cnn(...a: (string | false | undefined)[]) { return a.filter(Boolean).join(" "); }

/** The payslip dialog content — verbatim from F1v6_PayslipPreviewModal. */
function PayslipModal() {
  return (
    <div className="max-w-lg w-full rounded-lg border border-border bg-background overflow-hidden shadow-overlay">
      <div className="p-5 pb-4 border-b border-border/40 bg-muted/30">
        <div className="flex items-start justify-between">
          <div>
            <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4 mb-2 bg-primary/10 text-emphasis border-primary/20">Payslip</Badge>
            <div className="text-lg font-semibold text-foreground">Jan 2026</div>
            <p className="text-xs text-muted-foreground mt-0.5">Pay period: Jan 1 - Jan 31, 2026</p>
          </div>
          <Button variant="outline" size="sm" className="gap-1.5 text-xs"><Download className="h-3.5 w-3.5" />Download PDF</Button>
        </div>
      </div>

      <div className="p-5 space-y-5">
        <div className="flex items-center justify-between p-4 rounded-xl border border-border/40 bg-card/50">
          <div>
            <p className="text-sm font-medium text-foreground">Wei Tan</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5"><span>🇸🇬</span>Singapore<span className="text-muted-foreground/40">•</span>Employee</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-foreground tabular-nums">{c(net)}</p>
            <p className="text-[10px] text-muted-foreground uppercase">Net Pay</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg border border-border/40 bg-card/30 text-center">
            <p className="text-[10px] text-muted-foreground mb-0.5">Gross</p>
            <p className="text-sm font-semibold tabular-nums">{c(gross)}</p>
          </div>
          <div className="p-3 rounded-lg border border-border/40 bg-card/30 text-center">
            <p className="text-[10px] text-muted-foreground mb-0.5">Deductions</p>
            <p className="text-sm font-semibold tabular-nums text-destructive">-{c(ded)}</p>
          </div>
          <div className="p-3 rounded-lg border border-primary/20 bg-primary/5 text-center">
            <p className="text-[10px] text-emphasis/70 mb-0.5">Net Pay</p>
            <p className="text-sm font-semibold text-emphasis tabular-nums">{c(net)}</p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Earnings</h4>
          {EARNINGS.map(([k, v]) => <Row key={k} k={k} v={v} />)}
        </div>
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Deductions</h4>
          {DEDUCTIONS.map(([k, v]) => <Row key={k} k={k} v={v} minus />)}
        </div>

        <div className="pt-3 border-t border-border/40 space-y-1.5">
          <button className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-muted/40 transition-colors"><span className="flex items-center gap-2 text-xs font-medium text-foreground"><Building2 className="h-3.5 w-3.5 text-muted-foreground" />Employer details</span><ChevronDown className="h-3.5 w-3.5 text-muted-foreground" /></button>
          <button className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-muted/40 transition-colors"><span className="flex items-center gap-2 text-xs font-medium text-foreground"><User className="h-3.5 w-3.5 text-muted-foreground" />Worker details</span><ChevronDown className="h-3.5 w-3.5 text-muted-foreground" /></button>
        </div>
      </div>
    </div>
  );
}

export const PayslipPreview: Story = {
  name: "Payslip Preview",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        status="Stable"
        title="Payslip Preview"
        lead={<>The payslip preview dialog from the Fronted admin — a worker's payslip with a header (Payslip badge, period, Download PDF), a worker card, three summary tiles (Gross / Deductions / Net) and earnings + deductions line items, with collapsible employer / worker detail. Markup verbatim from F1v6_PayslipPreviewModal.</>}
        meta="Verbatim from F1 · Payslip preview (fronted-admin-v6-1-clone)"
      />

      <h3 style={eyebrow}>Preview</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}><PayslipModal /></div>
      <p style={{ ...note, marginTop: 10 }}>Dialog max-w-lg p-0 · header bg-muted/30 border-b · worker card rounded-xl border-border/40 bg-card/50 · summary grid-cols-3 (Net tile bg-primary/5 border-primary/20 text-emphasis) · line items label/value · collapsible employer/worker detail.</p>

      <h3 style={eyebrow}>Anatomy</h3>
      <DocTable head={["Part", "Detail", "classes"]} w0={150} rows={[
        ["Header", "Payslip badge + month title + pay period + Download PDF", "p-5 pb-4 border-b bg-muted/30 · badge bg-primary/10 text-emphasis"],
        ["Worker card", "name + flag · country · type; net + “Net Pay”", "flex justify-between p-4 rounded-xl border-border/40 bg-card/50"],
        ["Summary tiles", "Gross · Deductions (destructive) · Net (emphasis)", "grid grid-cols-3 gap-3 · Net = bg-primary/5 border-primary/20"],
        ["Line items", "Earnings then Deductions, label / amount", "h4 uppercase tracking-wide · rows text-sm label/value tabular-nums"],
        ["Detail", "Collapsible Employer details / Worker details", "button p-2.5 rounded-lg hover:bg-muted/40 + ChevronDown"],
      ]} />
    </div>
  ),
};
