import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Check, X, Paperclip, ChevronDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import { cn } from "@/lib/utils";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Adjustments & Approvals (verbatim from the LIVE F4.1 / F4.2 dashboards).
 * One shared list-row molecule used across the worker's Adjustments list, the manager's
 * Approvals table, and the contractor's Additions / Deductions. Each row is a neutral,
 * click-to-expand line: Type · detail with an optional attachment-count popover and a
 * More / Less toggle that reveals a definition-list detail panel (some types add an inner
 * items / coverage list). Captured verbatim from the live DOM.
 */
const meta: Meta = { title: "Patterns/Adjustments & Approvals", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

/* ── shared class fragments (verbatim from live DOM) ── */
const shellCls = "group rounded-lg border transition-colors duration-200 border-border/30 bg-card hover:bg-muted/30";
const headCls = "flex cursor-pointer items-center gap-3 px-3 py-2.5 outline-none";
const typeCls = "text-xs font-semibold text-foreground truncate shrink-0 max-w-[55%]";
const dotCls = "text-muted-foreground/40 text-xs hidden sm:inline shrink-0";
const detailCls = "text-xs text-muted-foreground truncate hidden sm:inline min-w-0 flex-1";
const attCls = "inline-flex items-center gap-0.5 shrink-0 rounded px-1 py-0.5 text-[11px] tabular-nums text-muted-foreground hover:text-foreground hover:bg-muted transition-colors";

type Field = [string, string];
type SubItem = { label: string; att?: number; amount?: string };
type Sub = { label: string; items: SubItem[] };
type Adj = {
  type: string;
  detail: string;
  attachments?: string[];
  fields: Field[];
  sub?: Sub;
};

/* Attachment-count popover trigger */
function AttBtn({ files }: { files: string[] }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button" className={attCls} aria-label={`${files.length} attachment${files.length > 1 ? "s" : ""}`}>
          <Paperclip className="h-2.5 w-2.5" />{files.length}
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64 p-1.5">
        <p className="px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">Attachments ({files.length})</p>
        <div className="space-y-0.5">
          {files.map((f) => (
            <button key={f} type="button" className="w-full flex items-center gap-2 rounded px-2 py-1.5 text-left hover:bg-muted transition-colors">
              <span className="flex-1 min-w-0 truncate text-xs text-foreground">{f}</span>
              <Download className="h-3 w-3 text-muted-foreground shrink-0" />
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

/* Expanded definition-list detail panel */
function DetailPanel({ fields, sub }: { fields: Field[]; sub?: Sub }) {
  return (
    <div className="px-3 pb-3 pt-0.5">
      <div className="rounded-md border border-border/40 bg-muted/20 px-3 py-2">
        <dl className="space-y-1.5">
          {fields.map(([dt, dd]) => (
            <div key={dt} className="flex items-start justify-between gap-4">
              <dt className="shrink-0 text-[11px] text-muted-foreground">{dt}</dt>
              <dd className="min-w-0 text-right text-[11px] text-foreground break-words">{dd}</dd>
            </div>
          ))}
        </dl>
        {sub && (
          <div className="mt-2 border-t border-border/40 pt-2">
            <p className="mb-1 text-[11px] text-muted-foreground">{sub.label}</p>
            <div className="space-y-0">
              {sub.items.map((it) =>
                it.amount != null ? (
                  <div key={it.label} className="flex items-center gap-2.5 pl-2.5 pr-2 py-0.5 rounded-md hover:bg-muted/50 transition-colors w-fit max-w-full">
                    <span className="min-w-0 truncate text-xs text-muted-foreground shrink">{it.label}</span>
                    {it.att != null && <button type="button" className={attCls}><Paperclip className="h-2.5 w-2.5" />{it.att}</button>}
                    <span className="shrink-0 text-xs tabular-nums font-mono text-foreground/80">{it.amount}</span>
                  </div>
                ) : (
                  <div key={it.label} className="flex w-fit max-w-full items-center gap-2.5 rounded-md py-0.5 pl-2.5 pr-2 transition-colors hover:bg-muted/50">
                    <span className="min-w-0 truncate text-xs text-muted-foreground">{it.label}</span>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* The shared adjustment row: neutral, click-to-expand, More / Less */
function AdjRow({ row, mode = "worker", defaultOpen = false }: { row: Adj; mode?: "worker" | "manager"; defaultOpen?: boolean }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className={shellCls}>
      <div className={headCls} role="button" tabIndex={0} onClick={() => setOpen((o) => !o)}>
        {mode === "manager" && <Checkbox className="h-4 w-4 shrink-0 rounded-[4px] border-border [&_svg]:h-3 [&_svg]:w-3" onClick={(e) => e.stopPropagation()} />}
        <div className="flex-1 min-w-0 pr-2 flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className={typeCls}>{row.type}</span>
            <span className={dotCls}>·</span>
            <span className={detailCls} title={row.detail}>{row.detail}</span>
            {row.attachments && <span className="hidden sm:inline-flex shrink-0"><AttBtn files={row.attachments} /></span>}
            <span className="hidden sm:inline-flex shrink-0 items-center gap-0.5 p-1 text-muted-foreground transition-colors group-hover:text-foreground">
              <span className="text-[11px] font-medium">{open ? "Less" : "More"}</span>
              <ChevronDown className={cn("h-3 w-3 transition-transform", open && "rotate-180")} />
            </span>
          </div>
        </div>
        <div className="shrink-0 self-center flex items-center gap-3 sm:gap-2">
          {mode === "manager" ? (
            <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
              <button className="p-1 rounded transition-colors text-muted-foreground hover:text-foreground hover:bg-muted" aria-label="Approve"><Check className="h-3.5 w-3.5" /></button>
              <button className="p-1 rounded transition-colors text-muted-foreground hover:text-foreground hover:bg-muted" aria-label="Reject"><X className="h-3.5 w-3.5" /></button>
            </div>
          ) : (
            <button className="p-1 rounded transition-all shrink-0 flex group/x hover:bg-destructive/10" aria-label="Withdraw request" onClick={(e) => e.stopPropagation()}><X className="h-3.5 w-3.5 text-muted-foreground" /></button>
          )}
        </div>
      </div>
      {open && <DetailPanel fields={row.fields} sub={row.sub} />}
    </div>
  );
}

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-2xl text-card-foreground shadow-card border border-border/40 !shadow-none bg-card/20 overflow-hidden"><div className="p-4 sm:p-5">{children}</div></div>
);
function TabBar({ tabs, active }: { tabs: string[]; active: string }) {
  return (
    <div className="inline-flex items-center rounded-full text-muted-foreground h-8 bg-muted/30 p-0.5 justify-start overflow-x-auto scrollbar-hide">
      {tabs.map((t) => (
        <span key={t} className={cn("inline-flex items-center justify-center rounded-full text-xs font-medium h-7 px-3.5 whitespace-nowrap transition-all", t === active ? "bg-card text-foreground shadow-sm" : "text-muted-foreground")}>{t}</span>
      ))}
    </div>
  );
}

/* ── Verbatim data from live F4.1 employee dashboard ── */
const employeeRows: Adj[] = [
  {
    type: "Paid leave",
    detail: "2 days · 22 Feb 2026 - 23 Feb 2026",
    attachments: ["leave_request.pdf"],
    fields: [["Leave type", "Paid leave"], ["Dates", "22 Feb 2026 - 23 Feb 2026"], ["Days", "2 days"], ["Note", "Family wedding in Cebu - cover approved by manager."], ["Submitted", "22 Jan 2026 at 10:00"]],
  },
  {
    type: "Sick leave",
    detail: "2 days · 9 Mar 2026 - 10 Mar 2026",
    attachments: ["medical_certificate.pdf"],
    fields: [["Leave type", "Sick leave"], ["Dates", "9 Mar 2026 - 10 Mar 2026"], ["Days", "2 days"], ["Note", "Flu, certified by clinic."], ["Submitted", "11 Mar 2026 at 08:30"]],
  },
  {
    type: "Expense",
    detail: "2 items · PHP 8,500",
    attachments: ["flight_receipt.pdf", "taxi_receipt.jpg", "hotel_receipt.pdf", "dinner_receipt.png", "lunch_receipt.png"],
    fields: [["Tag", "NY trip"], ["Amount", "PHP 8,500"], ["Submitted", "2 Mar 2026 at 08:15"]],
    sub: { label: "Items", items: [{ label: "Travel", att: 3, amount: "PHP 5,200" }, { label: "Meals", att: 2, amount: "PHP 3,300" }] },
  },
  {
    type: "Expense",
    detail: "Meals · PHP 6,350",
    attachments: ["dinner_receipt.pdf"],
    fields: [["Category", "Meals"], ["Tag", "Client dinner"], ["Amount", "PHP 6,350"], ["Submitted", "1 Mar 2026 at 19:42"]],
  },
  {
    type: "Bonus",
    detail: "Q4 performance bonus · PHP 12,000",
    attachments: ["bonus_approval.pdf"],
    fields: [["Description", "Q4 performance bonus"], ["Amount", "PHP 12,000"], ["Submitted", "18 Feb 2026 at 09:20"]],
  },
  {
    type: "Per diem",
    detail: "Manila, Philippines · 3 days · 10-12 Feb 2026",
    fields: [["Dates", "10 Feb 2026 - 12 Feb 2026"], ["Days", "3 days"], ["City", "Manila"], ["Country", "Philippines"], ["Provided during trip", "Breakfast provided, Lunch provided, Dinner provided, Hotel booked"], ["Purpose", "Client onboarding workshop"], ["Submitted", "13 Feb 2026 at 07:05"]],
    sub: { label: "Provided during trip", items: [{ label: "Breakfast provided" }, { label: "Lunch provided" }, { label: "Dinner provided" }, { label: "Hotel booked" }] },
  },
  {
    type: "Other",
    detail: "Personal use of company phone plan · PHP 1,800",
    fields: [["Direction", "Deduction"], ["Amount", "PHP 1,800"], ["Description", "Personal use of company phone plan"], ["Submitted", "20 Feb 2026 at 12:30"]],
  },
];

const managerRows: Adj[] = [
  { type: "John Doe · Expense", detail: "NY trip · 2 items · PHP 8,500", attachments: ["flight_receipt.pdf", "taxi_receipt.jpg", "hotel_receipt.pdf", "dinner_receipt.png", "lunch_receipt.png"], fields: [["Worker", "John Doe"], ["Tag", "NY trip"], ["Amount", "PHP 8,500"], ["Submitted", "2 Mar 2026 at 08:15"]], sub: { label: "Items", items: [{ label: "Travel", att: 3, amount: "PHP 5,200" }, { label: "Meals", att: 2, amount: "PHP 3,300" }] } },
  { type: "Ana Santos · Paid leave", detail: "2 days · 22 Feb 2026 - 23 Feb 2026", fields: [["Worker", "Ana Santos"], ["Leave type", "Paid leave"], ["Dates", "22 Feb 2026 - 23 Feb 2026"], ["Days", "2 days"], ["Submitted", "15 Jan 2026 at 09:10"]] },
  { type: "Liza Reyes · Bonus", detail: "Q4 performance bonus · PHP 12,000", fields: [["Worker", "Liza Reyes"], ["Description", "Q4 performance bonus"], ["Amount", "PHP 12,000"], ["Submitted", "18 Jan 2026 at 14:20"]] },
];

const contractorRows: Adj[] = [
  { type: "Addition", detail: "Client dinner at City Restaurant, Chicago · EUR 109", attachments: ["dinner_receipt.pdf"], fields: [["Direction", "Addition"], ["Amount", "EUR 109"], ["Description", "Client dinner at City Restaurant, Chicago"], ["Submitted", "2 Mar 2026 at 20:15"]] },
  { type: "Addition", detail: "Extra project milestone delivered ahead of schedule · EUR 1,500", fields: [["Direction", "Addition"], ["Amount", "EUR 1,500"], ["Description", "Extra project milestone delivered ahead of schedule"], ["Submitted", "1 Mar 2026 at 11:00"]] },
  { type: "Deduction", detail: "Overbilled hours in December invoice · -EUR 240", attachments: ["credit_note.pdf"], fields: [["Direction", "Deduction"], ["Amount", "-EUR 240"], ["Description", "Overbilled hours in December invoice"], ["Submitted", "20 Feb 2026 at 16:40"]] },
];

export const AdjustmentsApprovals: Story = {
  name: "Adjustments & Approvals",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        status="Stable"
        title="Adjustments & Approvals"
        lead={<>The shared adjustment row used across the F4.1 / F4.2 dashboards. Every row is a neutral, click-to-expand line — <strong>Type · detail</strong> with an optional attachment-count popover and a <strong>More / Less</strong> toggle that reveals a definition-list detail panel. Some types add an inner list: Expense itemises its receipts, Per diem lists its trip coverage. The worker gets a withdraw action; the manager gets a leading checkbox + inline approve / reject; contractors use Addition / Deduction. Captured verbatim from the live prototypes.</>}
        meta="Verbatim from live F4.1 / F4.2 · Adjustments & Approvals"
      />

      {/* ── Employee adjustments — one of each type ── */}
      <h3 style={eyebrow}>Adjustments list (employee) — every type</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
        <div className="w-[640px] max-w-full">
          <Card>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4">
              <TabBar tabs={["Pending (7)", "Approved (1)", "Rejected (1)"]} active="Pending (7)" />
              <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs shrink-0">Request adjustment</Button>
            </div>
            <div className="space-y-1.5">
              {employeeRows.map((r, i) => <AdjRow key={r.type + i} row={r} defaultOpen={i === 2 || i === 5} />)}
            </div>
          </Card>
        </div>
      </div>
      <p style={{ ...note, marginTop: 4 }}>Row = group rounded-lg border-border/30 bg-card (neutral — no status tint) · header flex cursor-pointer px-3 py-2.5 · type font-semibold max-w-[55%] · detail truncate w/ title tooltip · attachment count → popover (w-64, filenames + download) · More / Less span (text-[11px]) + chevron rotate · right = withdraw X (hover:bg-destructive/10). Open → px-3 pb-3 panel: rounded-md bg-muted/20 dl (dt muted / dd right) + optional inner Items / coverage list.</p>

      {/* ── Approvals table (manager) ── */}
      <h3 style={eyebrow}>Approvals table (manager)</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
        <div className="w-[640px] max-w-full">
          <Card>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4">
              <TabBar tabs={["Pending (7)", "Approved (4)", "Rejected (1)"]} active="Pending (7)" />
              <Button size="sm" className="h-7 px-2.5 text-xs shrink-0">Approve</Button>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 rounded-lg border border-border/30 bg-muted/20 px-3 py-2 mb-1.5 hover:bg-muted/40 transition-colors">
              <Checkbox className="h-4 w-4 shrink-0 rounded-[4px] border-border [&_svg]:h-3 [&_svg]:w-3" />
              <span className="text-[11px] font-medium text-muted-foreground">Select all (7)</span>
            </div>
            <div className="space-y-1.5">
              {managerRows.map((r, i) => <AdjRow key={r.type + i} row={r} mode="manager" defaultOpen={i === 0} />)}
            </div>
          </Card>
        </div>
      </div>
      <p style={{ ...note, marginTop: 4 }}>Same row molecule + leading Checkbox and a select-all bar (bg-muted/20) · bulk Approve Button h-7 · the right cluster swaps the withdraw X for inline Approve / Reject (button p-1 hover:bg-muted, Check / X). The detail panel is identical.</p>

      {/* ── Contractor ── */}
      <h3 style={eyebrow}>Adjustments list (contractor)</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
        <div className="w-[640px] max-w-full">
          <Card>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4">
              <TabBar tabs={["Pending (4)", "Approved (2)", "Rejected (1)"]} active="Pending (4)" />
              <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs shrink-0">Request adjustment</Button>
            </div>
            <div className="space-y-1.5">
              {contractorRows.map((r, i) => <AdjRow key={r.type + i} row={r} defaultOpen={i === 0} />)}
            </div>
          </Card>
        </div>
      </div>
      <p style={{ ...note, marginTop: 4 }}>Contractor uses only Addition / Deduction — flat description · amount (deductions negative, e.g. -EUR 240), attachment popover, and the same More / Less detail panel; no leave / per-diem / expense inner lists.</p>

      <h3 style={eyebrow}>Empty state</h3>
      <p style={{ ...note, marginTop: 0, marginBottom: 10 }}>The tabs stay; the row area just shows a plain per-tab label (verbatim from live) — “No pending requests.” / “No approved requests.” / “No rejected requests.” No Approve or select-all bar when the tab is empty.</p>
      <div style={{ display: "flex", justifyContent: "center", padding: "4px 0" }}>
        <div className="w-[640px] max-w-full">
          <Card>
            <div className="mb-4"><TabBar tabs={["Pending (0)", "Approved (12)", "Rejected (1)"]} active="Pending (0)" /></div>
            <p className="text-sm text-muted-foreground py-6 text-center">No pending requests.</p>
          </Card>
        </div>
      </div>

      <h3 style={eyebrow}>Type → detail panel (on expand)</h3>
      <DocTable head={["Type", "Summary line", "Detail panel (dl) fields"]} w0={130} rows={[
        ["Paid leave", "“2 days · date - date” + attachment", "Leave type · Dates · Days · Note · Submitted"],
        ["Sick leave", "“2 days · date - date” + attachment", "Leave type · Dates · Days · Note · Submitted"],
        ["Expense (multi)", "“N items · PHP 8,500” + attachment", "Tag · Amount · Submitted + Items list (category · attachment · +amount)"],
        ["Expense (single)", "“Meals · PHP 6,350” + attachment", "Category · Tag · Amount · Submitted"],
        ["Bonus", "“Q4 performance bonus · PHP 12,000”", "Description · Amount · Submitted"],
        ["Per diem", "“Manila, Philippines · 3 days · dates”", "Dates · Days · City · Country · Provided during trip · Purpose · Submitted + coverage list"],
        ["Other", "“{reason} · PHP 1,800”", "Direction · Amount · Description · Submitted"],
        ["Contractor", "Addition / Deduction · description · amount", "Direction · Amount · Description · Submitted (deductions negative)"],
      ]} />
    </div>
  ),
};
