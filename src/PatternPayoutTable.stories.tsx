import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ChevronRight, Search, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import { cn } from "@/lib/utils";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Payout Table (verbatim from F1 Fronted admin,
 * F1v6_PayoutTable + F1v6_ManualPayoutDrawer).
 * The interim payout step: supported-country workers use the calculated breakdown and are
 * marked paid inline; manual-country workers require an uploaded payslip/invoice, entered
 * through the manual payout drawer. Markup verbatim from the source (primary text uses
 * text-emphasis per the system's a11y swap).
 */
const meta: Meta = { title: "Patterns/Payout Table", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const getInitials = (name: string) => name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

type Row = { name: string; country: string; flag: string; amount: string; qty?: string; paid: boolean; manual?: boolean };
const ROWS: Row[] = [
  { name: "Wei Tan", country: "Singapore", flag: "🇸🇬", amount: "SGD 6,120", paid: true },
  { name: "Maria Santos", country: "Philippines", flag: "🇵🇭", amount: "PHP 238,000", qty: "12 h", paid: false },
  { name: "Jonas Schmidt", country: "Germany", flag: "🇩🇪", amount: "EUR 4,350", paid: false },
  { name: "Alex Hansen", country: "Norway · Manual", flag: "🇳🇴", amount: "—", paid: false, manual: true },
];

/* ── Payout row — verbatim from F1v6_PayoutTable.renderRow ── */
function PayoutRow({ r }: { r: Row }) {
  return (
    <div className={cn(
      "group relative flex cursor-pointer items-center gap-3 px-3 py-2.5 rounded-lg border border-border/30 bg-card transition-colors hover:bg-muted/30"
    )}>
      <Avatar className="h-7 w-7 flex-shrink-0">
        <AvatarFallback className="bg-muted text-[10px] font-semibold text-muted-foreground">{getInitials(r.name)}</AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <span className="block truncate text-sm font-semibold text-foreground">{r.name}</span>
        <span className="mt-0.5 block truncate text-[11px] leading-tight text-muted-foreground">{r.flag} {r.country}</span>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="text-right hidden sm:block">
          <p className={cn("text-sm tabular-nums", r.manual ? "text-muted-foreground leading-tight" : "font-semibold text-foreground")}>{r.amount}</p>
          {r.qty && <p className="text-[11px] text-muted-foreground tabular-nums">{r.qty}</p>}
        </div>

        <div className={cn(
          "flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full",
          r.paid ? "text-accent-green-text bg-accent-green/10" : "text-muted-foreground bg-muted/50"
        )}>
          {r.paid ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
          <span className="hidden sm:inline">{r.paid ? "Paid" : "In progress"}</span>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
}

/* ── Payout table container — verbatim shell from F1v6_PayoutTable ── */
function PayoutTable() {
  return (
    <div className="rounded-xl overflow-hidden border border-border/40 bg-card/20 text-card-foreground shadow-none">
      <div className="px-4 sm:px-5 pt-4 pb-3 border-b border-border/40 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs font-medium text-muted-foreground">14 employees on payroll</span>
        </div>
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:flex-1 [&>*:not(:first-child)]:sm:ml-auto">
          <div className="relative flex-1 sm:w-44 sm:flex-none">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-8 h-8 text-xs bg-background/50 border-border/30" />
          </div>
          <Button variant="outline" size="sm" className="h-8 text-xs w-full sm:w-auto">Download for vendor</Button>
        </div>
      </div>
      <div className="p-3 sm:p-4">
        <div className="mt-0 space-y-1.5">
          {ROWS.map((r) => <PayoutRow key={r.name} r={r} />)}
        </div>
      </div>
    </div>
  );
}

/* ── Manual payout drawer — verbatim header + body from F1v6_ManualPayoutDrawer ── */
function ManualPayoutDrawer() {
  return (
    <div className="w-full sm:w-[440px] rounded-lg border border-border bg-background overflow-hidden shadow-overlay flex flex-col">
      <div className="border-b border-border/50 px-5 py-4 text-left">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-muted text-[11px] font-semibold text-muted-foreground">AH</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="truncate text-base font-semibold text-foreground">Alex Hansen</div>
            <div className="text-xs text-muted-foreground">🇳🇴 Norway · Employee</div>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
        {/* Net pay entry (manual entry) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <p className="text-base font-semibold text-foreground">Net pay</p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">NOK</span>
              <Input type="text" inputMode="decimal" defaultValue="52,000" placeholder="0.00" className="h-9 w-36 text-right text-sm tabular-nums" />
            </div>
          </div>
        </div>

        <div className="border-t border-border/40" />

        {/* Document upload field — verbatim from DocumentUploadField (single, rowAction="view", helper={null}) */}
        <div className="space-y-1.5">
          {/* Attached file row — UploadedDocRow (done state) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5 transition-colors border-border/60 bg-muted/20">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">alex-hansen-payslip.pdf</p>
                <p className="mt-0.5 truncate text-[11px] text-muted-foreground">PDF</p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <button type="button" className="rounded text-[11px] font-medium text-foreground/80 transition-colors hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">View</button>
                <button type="button" className="rounded text-[11px] font-medium transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background text-muted-foreground hover:text-destructive">Remove</button>
              </div>
            </div>
          </div>
          {/* Empty upload slot — addDocClass label (shown when no document attached) */}
          <label className="flex w-full cursor-pointer items-center justify-center rounded-lg border border-dashed border-border/60 px-3 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-muted/30 hover:text-foreground focus-within:border-primary/50 focus-within:bg-muted/30 focus-within:text-foreground focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
            <span>Upload payslip</span>
          </label>
        </div>

        <Button className="w-full">Mark as paid</Button>
      </div>
    </div>
  );
}

export const PayoutTable_: Story = {
  name: "Payout Table",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        status="Stable"
        title="Payout Table"
        lead={<>The interim payout step. Supported-country workers carry a calculated amount and a Paid / In progress state, opening the breakdown drawer on click. Manual-country workers show "—" with a "· Manual" subtext and instead open the manual payout drawer to capture a net pay figure and an uploaded payslip / invoice before being marked paid. Markup verbatim from F1v6_PayoutTable + F1v6_ManualPayoutDrawer.</>}
        meta="Verbatim from F1 · Payout table + manual drawer (fronted-admin-v6-1-clone)"
      />

      <h3 style={eyebrow}>Payout table</h3>
      <PayoutTable />
      <p style={{ ...note, marginTop: 10 }}>Card rounded-xl border-border/40 bg-card/20 · toolbar (count · search · Download for vendor) border-b · rows p-3 sm:p-4 space-y-1.5 · each row rounded-lg border-border/30 bg-card with h-7 avatar, name + flag subtext, right-aligned amount (+ optional hours/days), status pill (accent-green Paid / muted In progress) and a ChevronRight.</p>

      <h3 style={eyebrow}>Manual payout drawer</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}><ManualPayoutDrawer /></div>
      <p style={{ ...note, marginTop: 10 }}>Sheet w-[440px] p-0 · header border-b with h-10 avatar + name + flag · country · type · body px-5 py-5: net-pay entry row (currency + right-aligned tabular Input), hairline, document upload field (empty slot then attached file row), and a full-width Mark as paid button (disabled until a document + valid net pay exist).</p>

      <h3 style={eyebrow}>Row states</h3>
      <DocTable head={["State", "Example", "classes"]} w0={130} rows={[
        ["Paid", <div className="w-[300px]"><PayoutRow r={{ name: "Wei Tan", country: "Singapore", flag: "🇸🇬", amount: "SGD 6,120", paid: true }} /></div>, "status pill text-accent-green-text bg-accent-green/10 + CheckCircle2"],
        ["In progress", <div className="w-[300px]"><PayoutRow r={{ name: "Jonas Schmidt", country: "Germany", flag: "🇩🇪", amount: "EUR 4,350", paid: false }} /></div>, "status pill text-muted-foreground bg-muted/50 + Clock"],
        ["With quantity", <div className="w-[300px]"><PayoutRow r={{ name: "Maria Santos", country: "Philippines", flag: "🇵🇭", amount: "PHP 238,000", qty: "12 h", paid: false }} /></div>, "amount + [11px] hours/days sub-line · tabular-nums"],
        ["Manual", <div className="w-[300px]"><PayoutRow r={{ name: "Alex Hansen", country: "Norway · Manual", flag: "🇳🇴", amount: "—", paid: false, manual: true }} /></div>, "amount “—” muted · “· Manual” subtext · opens manual drawer"],
      ]} />

      <h3 style={eyebrow}>Anatomy — manual drawer</h3>
      <DocTable head={["Part", "Detail", "classes"]} w0={150} rows={[
        ["Header", "avatar + name + flag · country · type", "border-b border-border/50 px-5 py-4 · h-10 avatar"],
        ["Net pay", "currency label + right-aligned tabular input", "flex justify-between · Input h-9 w-36 text-right tabular-nums"],
        ["Upload", "attached file row + empty upload slot", "file row border-border/60 bg-muted/20 · View/Remove text actions · dashed label border-border/60"],
        ["Confirm", "Mark as paid (disabled until doc + net pay)", "Button w-full"],
      ]} />
    </div>
  ),
};
