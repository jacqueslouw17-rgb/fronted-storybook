import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ChevronRight, ChevronLeft, Search, CheckCircle2, MoreHorizontal, Check, X, Paperclip, FileText, Download } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { DocTable, PageHeader } from "./_docTable";
import { Guidance } from "./guidance";
import "./tokens.css";
import "./typography.css";

/**
 * Components — Table / List.
 * Rebuilt from the LIVE payroll table (demofronted.live F1). There is no <table>:
 * a flat card with a header row ("N employees on payroll" + search + Continue to
 * payout), then divided rows — grey initials avatar + name/country + amount +
 * (count badge) + status (Ready green ✓ / Pending amber) + chevron — and a shared
 * pagination footer. No tabs, no select-all, no batch-total on this list.
 */
const meta: Meta = { title: "Components/Table & List", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const wrap: React.CSSProperties = { fontFamily: "var(--ds-font-body)", color: "var(--ds-color-text)", maxWidth: 980, padding: 4 };
const eyebrow: React.CSSProperties = { fontSize: 12, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", margin: "30px 0 12px", fontWeight: 600 };
const note: React.CSSProperties = { fontFamily: "var(--ds-font-mono)", fontSize: 11, color: "var(--ds-color-text-muted)", marginTop: 10 };

const initials = (s: string) => s.split(" ").map((w) => w[0]).join("").slice(0, 2);

type Row = { n: string; c: string; a: string; status: "ready" | "pending"; count?: number };
const ROWS: Row[] = [
  { n: "Maria Santos", c: "🇵🇭 Philippines", a: "PHP 238,000", status: "pending", count: 5 },
  { n: "Priya Nair", c: "🇮🇳 India", a: "INR 342,000", status: "pending", count: 1 },
  { n: "Jonas Schmidt", c: "🇩🇪 Germany", a: "EUR 4,350", status: "ready" },
  { n: "Wei Tan", c: "🇸🇬 Singapore", a: "SGD 6,120", status: "ready" },
  { n: "Alex Hansen", c: "🇳🇴 Norway · Manual", a: "—", status: "pending", count: 4 },
];

/** Payroll row — verbatim structure from the live payroll table. */
function PayrollRow({ r }: { r: Row }) {
  return (
    <div className="group flex items-center gap-3 px-4 sm:px-5 py-3 cursor-pointer hover:bg-muted/30 transition-colors">
      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-[11px] font-medium text-muted-foreground shrink-0">{initials(r.n)}</div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-foreground truncate">{r.n}</div>
        <div className="text-xs text-muted-foreground truncate">{r.c}</div>
      </div>
      <div className="flex items-center gap-2.5 shrink-0">
        <span className={cn("text-sm tabular-nums", r.a === "—" ? "text-muted-foreground" : "font-semibold text-foreground")}>{r.a}</span>
        {r.status === "pending" ? (
          <span className="flex items-center gap-1.5">
            {r.count ? <span className="h-4 min-w-4 px-1 rounded-full bg-amber-500 text-white text-[10px] font-semibold flex items-center justify-center tabular-nums">{r.count}</span> : null}
            <span className="text-xs font-medium text-accent-amber-text">Pending</span>
          </span>
        ) : (
          <span className="flex items-center gap-1 text-accent-green-text"><CheckCircle2 className="h-3.5 w-3.5" /><span className="text-xs font-medium">Ready</span></span>
        )}
        <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
      </div>
    </div>
  );
}

/** F6 approval row — verbatim F6v41_ApprovalsSection (pending / approved / rejected). */
function ApprovalRow({ name, type, detail, date, status, reason }: { name: string; type: string; detail: string; date: string; status: "pending" | "approved" | "rejected"; reason?: string }) {
  const pending = status === "pending", approved = status === "approved", rejected = status === "rejected";
  return (
    <div className={cn("group rounded-lg border transition-colors duration-200",
      pending && "cursor-pointer border-border/30 bg-card hover:bg-muted/30",
      approved && "border-accent-green/25 bg-accent-green/[0.04] hover:bg-accent-green/[0.08]",
      rejected && "border-destructive/20 bg-destructive/[0.03] hover:bg-destructive/[0.06]")}>
      <div className="flex items-center gap-3 px-3 py-2.5">
        {pending && <Checkbox className="h-4 w-4 shrink-0 rounded-[4px] border-border [&_svg]:h-3 [&_svg]:w-3" />}
        <div className="flex-1 min-w-0 flex items-center gap-2">
          <span className="text-xs font-semibold text-foreground truncate">{name} · {type}</span>
          <span className="text-muted-foreground/40 text-xs">·</span>
          <span className="text-xs text-muted-foreground truncate">{detail}</span>
          <span className="inline-flex items-center gap-0.5 text-[10px] text-muted-foreground/70 shrink-0"><Paperclip className="h-2.5 w-2.5" />1</span>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <span className="text-[11px] text-muted-foreground tabular-nums whitespace-nowrap">{date}</span>
          {pending ? (
            <div className="flex items-center gap-1">
              <button className="p-1 rounded transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"><Check className="h-3.5 w-3.5" /></button>
              <button className="p-1 rounded transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"><X className="h-3.5 w-3.5" /></button>
            </div>
          ) : (
            <span className={cn("inline-flex items-center gap-1 text-[11px] font-medium", approved ? "text-accent-green-text" : "text-destructive")}>
              {approved ? <><CheckCircle2 className="h-3 w-3" />Approved</> : <><X className="h-3 w-3" />Rejected</>}
            </span>
          )}
        </div>
      </div>
      {rejected && reason && (
        <div className="px-2.5 pb-2 pt-0.5"><p className="text-xs text-destructive/80 bg-destructive/5 rounded px-2 py-1.5 border-l-2 border-destructive/30">{reason}</p></div>
      )}
    </div>
  );
}

/** F4.1/F4.2 payslip / invoice history row — verbatim F41v81_PayslipsSection. */
function PayslipRow({ period, amount, paid }: { period: string; amount: string; paid: string }) {
  return (
    <div className="group flex items-center gap-2 sm:gap-3 rounded-lg border border-border/30 bg-card px-3 sm:px-4 py-3 cursor-pointer hover:bg-muted/30 transition-colors">
      <div className="flex-shrink-0 w-8 h-8 rounded-md bg-primary/[0.06] border border-primary/20 flex items-center justify-center"><FileText className="h-4 w-4 text-primary/70" /></div>
      <p className="text-sm font-medium text-foreground truncate flex-1 min-w-0">{period}</p>
      <span className="text-sm font-medium text-foreground tabular-nums whitespace-nowrap">{amount}</span>
      <span className="hidden sm:inline-flex items-center rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200 text-xs px-2 py-0.5 flex-shrink-0">Paid {paid}</span>
      <button className="p-1.5 rounded-md hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground flex-shrink-0" aria-label="Download"><Download className="h-4 w-4" /></button>
    </div>
  );
}

export const TableListStory: Story = {
  name: "Table & List",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Components"
        status="Stable"
        title="Table & List"
        lead={<>
        Rebuilt from the live payroll table. No <code>&lt;table&gt;</code> — a flat card with a header row, divided
        rows (initials avatar + name/country + amount + status), and a pagination footer. All flat, no shadows.
        </>}
      />

      <h3 style={eyebrow}>Row &amp; cell states</h3>
      <DocTable head={["Element / state", "Example", "classes"]} w0={170} wLast={330} rows={[
        ["Row (default)", <div className="w-[220px] flex items-center gap-3 px-4 py-3 rounded-md"><div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-[11px] font-medium text-muted-foreground">MS</div><span className="text-sm font-medium">Maria Santos</span></div>, "flex items-center gap-3 px-4 sm:px-5 py-3 · divide-y divide-border/40"],
        ["Row (hover)", <div className="w-[220px] flex items-center gap-3 px-4 py-3 rounded-md bg-muted/30"><div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-[11px] font-medium text-muted-foreground">MS</div><span className="text-sm font-medium">Maria Santos</span></div>, "cursor-pointer hover:bg-muted/30 transition-colors"],
        ["Status — Ready", <span className="flex items-center gap-1 text-accent-green-text"><CheckCircle2 className="h-3.5 w-3.5" /><span className="text-xs font-medium">Ready</span></span>, "text-accent-green-text · CheckCircle2 h-3.5"],
        ["Status — Pending", <span className="flex items-center gap-1.5"><span className="h-4 min-w-4 px-1 rounded-full bg-amber-500 text-white text-[10px] font-semibold flex items-center justify-center">5</span><span className="text-xs font-medium text-accent-amber-text">Pending</span></span>, "text-accent-amber-text + count badge bg-amber-500 text-white h-4 min-w-4 rounded-full"],
        ["Amount (empty)", <span className="text-sm tabular-nums text-muted-foreground">—</span>, "text-muted-foreground (else font-semibold text-foreground) · tabular-nums"],
        ["Pagination — active", <button className="h-7 w-7 p-0 text-xs tabular-nums bg-primary/10 text-emphasis rounded-md inline-flex items-center justify-center">1</button>, "bg-primary/10 text-emphasis (yellow fill / dark ink)"],
        ["Pagination — default", <button className="h-7 w-7 p-0 text-xs tabular-nums text-muted-foreground rounded-md inline-flex items-center justify-center hover:text-foreground">2</button>, "text-muted-foreground hover:text-foreground"],
      ]} />

      <h3 style={eyebrow}>Payroll table (live F1 — verbatim structure)</h3>
      <div className="rounded-xl border border-border/40 bg-card overflow-hidden w-full max-w-[560px]">
        <div className="px-4 sm:px-5 pt-4 pb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <span className="text-xs font-medium text-muted-foreground">14 employees on payroll</span>
          <div className="flex items-center gap-2">
            <div className="relative"><Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" /><Input placeholder="Search..." className="pl-8 h-8 text-xs bg-background/50 border-border/30 w-[150px]" /></div>
            <Button size="sm" className="h-8 text-xs bg-gradient-primary">Continue to payout</Button>
          </div>
        </div>
        <div className="divide-y divide-border/40 border-t border-border/40">
          {ROWS.map((r) => <PayrollRow key={r.n} r={r} />)}
        </div>
        <div className="flex flex-col gap-2 border-t border-border/40 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <span className="text-center text-xs text-muted-foreground tabular-nums sm:text-left">Showing 1–10 of 14 workers</span>
          <div className="flex items-center justify-center gap-1 sm:justify-end">
            <Button variant="ghost" size="sm" disabled className="h-7 px-2 text-xs text-muted-foreground disabled:opacity-40"><ChevronLeft className="h-3.5 w-3.5" /><span className="hidden sm:inline ml-1">Previous</span></Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs tabular-nums bg-primary/10 text-emphasis hover:bg-primary/15 hover:text-emphasis">1</Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs tabular-nums text-muted-foreground hover:text-foreground">2</Button>
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"><span className="hidden sm:inline mr-1">Next</span><ChevronRight className="h-3.5 w-3.5" /></Button>
          </div>
        </div>
      </div>
      <p style={note}>card bg-card · header "N employees on payroll" + search + Continue to payout · rows divide-y · avatar h-8 bg-muted initials · Ready = green ✓ / Pending = amber + orange count badge · chevron · pagination</p>

      <h3 style={eyebrow}>Read-only detail list (data collection / profile / onboarding)</h3>
      <div className="w-full max-w-[460px] rounded-xl border border-border/40 bg-card/20 overflow-hidden">
        <div className="px-4 sm:px-5 pt-4 pb-3 border-b border-border/40"><span className="text-xs font-medium text-muted-foreground">Personal profile</span></div>
        <div className="px-5 py-3">
          {[["Full name", "Anika Lindqvist"], ["Date of birth", "14 Mar 1991"], ["Nationality", "🇳🇴 Norwegian"], ["Bank account", "—"]].map(([l, v], i) => (
            <div key={l as string} className={cn("flex items-start justify-between gap-4 py-1.5", i > 0 && "border-t border-border/20")}>
              <span className="text-sm text-muted-foreground truncate">{l}</span>
              <span className="text-sm font-medium text-foreground text-right">{v}</span>
            </div>
          ))}
        </div>
      </div>
      <p style={note}>ReadOnlyRow: flex justify-between gap-4 py-1.5 · label text-sm muted · value text-sm font-medium text-right · "—" when empty</p>

      <h3 style={eyebrow}>Line-item breakdown (pay drawer — divided sections)</h3>
      <div className="rounded-xl border border-border/40 bg-card/50 divide-y divide-border/40 w-full max-w-[460px]">
        <div className="flex justify-between px-4 py-2.5"><span className="text-sm text-muted-foreground">Base salary</span><span className="text-sm font-medium tabular-nums">NOK 65,000</span></div>
        <div className="flex justify-between px-4 py-2.5"><span className="text-sm text-muted-foreground">Overtime</span><span className="text-sm font-medium tabular-nums">NOK 4,200</span></div>
        <div className="flex justify-between px-4 py-2.5"><span className="text-sm text-muted-foreground">Tax withheld</span><span className="text-sm font-medium tabular-nums text-destructive">-NOK 18,300</span></div>
        <div className="flex justify-between px-4 py-2.5 bg-muted/20"><span className="text-sm font-medium">Net pay</span><span className="text-sm font-semibold tabular-nums">NOK 50,900</span></div>
      </div>
      <p style={note}>container bg-card/50 divide-y · row px-4 py-2.5 · total bg-muted/20 · deductions text-destructive "-" (see Patterns/Pay Breakdown for the full drawer)</p>

      <h3 style={eyebrow}>Members table (Settings › People / End-client Admins)</h3>
      <div className="w-full max-w-[520px] rounded-xl border border-border/40 bg-card overflow-hidden">
        <div className="px-4 sm:px-5 pt-4 pb-3 flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">4 members</span>
          <Button size="sm" className="h-8 text-xs bg-gradient-primary">Invite</Button>
        </div>
        <div className="divide-y divide-border/40 border-t border-border/40">
          {[
            { n: "Joe User", you: true, st: "Active", email: "joe@fronted.com", role: "Admin" },
            { n: "Priya Shah", st: "Active", email: "priya@fronted.com", role: "Member" },
            { n: "Ana Rossi", st: "Invited", email: "ana@fronted.com", role: "Viewer" },
          ].map((m) => (
            <div key={m.n} className="flex items-center gap-3 px-4 sm:px-5 py-3 hover:bg-muted/30 transition-colors">
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-[11px] font-medium text-muted-foreground shrink-0">{initials(m.n)}</div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2"><span className="text-sm font-medium text-foreground truncate">{m.n}</span>{m.you && <span className="text-xs text-muted-foreground">(you)</span>}
                  <span className={cn("text-[10px] px-1.5 py-0 h-4 inline-flex items-center rounded-full border", m.st === "Active" ? "bg-accent-green-fill/20 text-accent-green-text border-accent-green-outline/30" : "bg-accent-amber-fill/30 text-accent-amber-text border-accent-amber-outline/30")}>{m.st}</span>
                </div>
                <div className="text-xs text-muted-foreground truncate">{m.email}</div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full border border-border text-foreground">{m.role}</span>
              <button className="h-7 w-7 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted/50"><MoreHorizontal className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      </div>
      <p style={note}>header count + Invite · rows avatar + name (+"(you)") + status badge (Active green / Invited amber) + email · role pill (outline) + kebab. End-client Admins uses a "Resend" link instead of role+kebab.</p>

      <h3 style={eyebrow}>Managers table (client select + filter pills + toggle rows)</h3>
      <div className="w-full max-w-[520px] rounded-xl border border-border/40 bg-card overflow-hidden">
        <div className="px-4 sm:px-5 pt-4 pb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">Client <span className="inline-flex items-center gap-1 h-8 px-2.5 rounded-md border border-input bg-background text-foreground">Acme Corp <ChevronRight className="h-3 w-3 rotate-90 text-muted-foreground" /></span></div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <button className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-emphasis">All 14</button>
              <button className="px-3 py-1 rounded-full text-xs text-muted-foreground hover:text-foreground transition-colors">Managers 0</button>
            </div>
            <div className="relative"><Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" /><Input placeholder="Search" className="pl-8 h-8 text-xs bg-background/50 border-border/30 w-[130px]" /></div>
          </div>
        </div>
        <div className="divide-y divide-border/40 border-t border-border/40">
          {[["Maria Santos", "Software Engineer", "🇵🇭"], ["Liam O'Connor", "Product Designer", "🇮🇪"], ["Anna Müller", "Engineering Manager", "🇩🇪"]].map(([n, role, flag]) => (
            <div key={n as string} className="flex items-center gap-3 px-4 sm:px-5 py-3">
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-[11px] font-medium text-muted-foreground shrink-0">{initials(n as string)}</div>
              <div className="min-w-0 flex-1"><div className="text-sm font-medium text-foreground truncate">{n} <span>{flag}</span></div><div className="text-xs text-muted-foreground truncate">{role}</div></div>
              <span className="text-xs text-muted-foreground">Manager</span>
              <Switch />
            </div>
          ))}
        </div>
      </div>
      <p style={note}>header: Client select + filter pills (rounded-full; active bg-primary/10 text-emphasis, rest plain text) + search · rows: avatar + name/role + "Manager" + Switch</p>

      <h3 style={eyebrow}>Nav list-rows (Settings landing)</h3>
      <div className="w-full max-w-[520px] space-y-2">
        {[["End-client Administrators", "Manage end-client admin access to this workspace"], ["People", "Invite members, set roles, and tune per-feature access"], ["Managers", "Set managers per client and assign them to workers"]].map(([t, d]) => (
          <button key={t} className="w-full flex items-center justify-between gap-3 rounded-xl border border-border/40 bg-card px-5 py-4 text-left hover:bg-muted/30 transition-colors">
            <div><div className="text-sm font-medium text-foreground">{t}</div><div className="text-xs text-muted-foreground mt-0.5">{d}</div></div>
            <ChevronRight className="h-4 w-4 text-muted-foreground/60 shrink-0" />
          </button>
        ))}
      </div>
      <p style={note}>full-width button · rounded-xl border bg-card px-5 py-4 hover:bg-muted/30 · title text-sm + desc text-xs + chevron right</p>

      <h3 style={eyebrow}>Approvals list (F6 — pending / approved / rejected rows)</h3>
      <div className="w-full max-w-[600px] rounded-xl border border-border/40 bg-card/20 overflow-hidden p-4 sm:p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex h-8 bg-muted/30 p-0.5 rounded-md gap-0.5">
            <button className="text-xs h-7 px-3 rounded bg-primary/[0.08] text-emphasis border border-primary/30">Pending (3)</button>
            <button className="text-xs h-7 px-3 rounded text-muted-foreground hover:text-foreground">Approved (2)</button>
            <button className="text-xs h-7 px-3 rounded text-muted-foreground hover:text-foreground">Rejected (1)</button>
          </div>
          <Button size="sm" className="h-7 px-2.5 text-xs bg-gradient-primary">Approve</Button>
        </div>
        <div className="flex items-center gap-x-3 rounded-lg border border-border/30 bg-muted/20 px-3 py-2 mb-1.5">
          <Checkbox className="h-4 w-4 shrink-0 rounded-[4px] border-border [&_svg]:h-3 [&_svg]:w-3" />
          <span className="text-[11px] font-medium text-muted-foreground">Select all (3)</span>
        </div>
        <div className="space-y-1.5">
          <ApprovalRow name="Maria Santos" type="Overtime" detail="Night · 6h · 14 Jan 2026" date="15 Jan" status="pending" />
          <ApprovalRow name="Maria Santos" type="Expense" detail="Client dinner · PHP 6,350" date="1 Mar" status="approved" />
          <ApprovalRow name="Liam O'Brien" type="Per diem" detail="Dublin · Domestic · 2 days" date="18 Jan" status="rejected" reason="Outside the approved per-diem policy for domestic travel." />
        </div>
      </div>
      <p style={note}>row group rounded-lg border · pending border-border/30 bg-card + checkbox + ✓/✕ (p-1 hover:bg-muted) · approved border-accent-green/25 bg-accent-green/[0.04] · rejected border-destructive/20 + reason border-l-2 · filter = primary Tabs · select-all bar bg-muted/20</p>

      <h3 style={eyebrow}>Payslip / invoice history (F4.1 &amp; F4.2 — icon tile + paid pill + download)</h3>
      <div className="w-full max-w-[560px] rounded-xl border border-border/40 bg-card/20 overflow-hidden">
        <div className="px-4 sm:px-5 pt-4 pb-3 border-b border-border/40 flex items-center gap-2"><span className="text-xs font-medium text-muted-foreground">12 payslips</span></div>
        <div className="p-3 space-y-1.5">
          <PayslipRow period="November 2025" amount="PHP 42,166.67" paid="Dec 5" />
          <PayslipRow period="October 2025" amount="PHP 41,500.00" paid="Nov 5" />
          <PayslipRow period="September 2025" amount="PHP 42,166.67" paid="Oct 5" />
        </div>
      </div>
      <p style={note}>row group rounded-lg border-border/30 bg-card px-4 py-3 hover:bg-muted/30 · icon tile w-8 h-8 rounded-md bg-primary/[0.06] border-primary/20 + FileText text-primary/70 · amount tabular-nums · Paid pill bg-emerald-50 text-emerald-700 border-emerald-200 · Download p-1.5 hover:bg-muted/50 · contractor = invoices</p>

      <h3 style={eyebrow}>Empty state (pipeline column)</h3>
      <div className="w-[240px] rounded-xl border border-border/40 bg-muted/10 flex flex-col items-center justify-center text-center py-12 px-4">
        <p className="text-sm font-medium text-foreground">No workers yet</p>
        <p className="text-xs text-muted-foreground mt-1">Workers appear here once Fronted starts the process.</p>
      </div>
      <p style={note}>pipeline column empty · centred text-sm title + text-xs muted body</p>
      <Guidance k="table" />
    </div>
  ),
};
