import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Clock, Plane, Receipt, CalendarOff, Gift, MoreHorizontal, Upload, type LucideIcon } from "lucide-react";
import { wrap, eyebrow, note, PageHeader } from "./_docTable";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Adjustment Request (verbatim F41v81_AdjustmentModal / F42v81_AdjustmentDrawer).
 * A right-side drawer: the worker opens it, picks one of 6 adjustment types, and the drawer
 * swaps to that type's form (a back arrow returns to the picker). Open the drawer below.
 *
 * The per-type forms reproduce the real product markup verbatim: each field group is wrapped in a
 * card (`p-4 rounded-xl border border-border/60 bg-card/50 space-y-3`), fields carry the real
 * Label / helper-text / control classes, and the a11y text-primary → text-emphasis swap is applied.
 */
const meta: Meta = { title: "Patterns/Adjustment Request", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

type AdjType = { id: string; label: string; description: string; formTitle: string; formDesc: string; icon: LucideIcon; opens: string };

// Verbatim from the live Request-adjustment drawer (demofronted.live · F4.1 employee).
const TYPES: AdjType[] = [
  { id: "overtime", label: "Overtime", description: "Log extra hours", formTitle: "Overtime request", formDesc: "Log your overtime hours", icon: Clock, opens: "date · shift type · trigger · start/end time · attachment" },
  { id: "per-diem", label: "Per diem", description: "Travel-day allowance — no receipt needed", formTitle: "Per diem request", formDesc: "Travel-day allowance — no receipt needed", icon: Plane, opens: "date range · city · country · trip type · provided · purpose" },
  { id: "expense", label: "Expense Reimbursements", description: "Submit a reimbursement", formTitle: "Expense request", formDesc: "Submit a reimbursement", icon: Receipt, opens: "category · amount · attachments · +add another · tag" },
  { id: "leave", label: "Leave", description: "Request paid, unpaid, or sick leave", formTitle: "Leave", formDesc: "Request paid, unpaid, or sick leave", icon: CalendarOff, opens: "leave type · date range · upload docs" },
  { id: "bonus", label: "Bonus", description: "Request a bonus", formTitle: "Bonus request", formDesc: "Request a bonus", icon: Gift, opens: "amount · description · attachment" },
  { id: "other", label: "Other", description: "Any other addition or deduction", formTitle: "Other adjustment", formDesc: "Any other addition or deduction", icon: MoreHorizontal, opens: "addition/deduction · amount · description · attachment" },
];

const CURRENCY = "PHP";

const OVERTIME_KINDS = ["Morning", "Mixed", "Night"];
const OVERTIME_TRIGGERS = [
  "Exceeded daily threshold",
  "Exceeded weekly threshold",
  "Worked on rest day",
  "Worked on public holiday",
  "Other",
];
const EXPENSE_CATEGORIES = ["Travel", "Meals", "Equipment", "Software", "Other"];
const PER_DIEM_COUNTRIES = [
  "Philippines", "Singapore", "Malaysia", "Indonesia", "Japan", "India",
  "United Kingdom", "Germany", "Spain", "Norway", "United States", "Mexico", "Other",
];
const LEAVE_TYPES = ["Paid leave", "Unpaid leave", "Sick leave", "Other"];
const PROVIDED_ROWS: { key: string; label: string }[] = [
  { key: "breakfast", label: "Breakfast provided" },
  { key: "lunch", label: "Lunch provided" },
  { key: "dinner", label: "Dinner provided" },
  { key: "hotel", label: "Hotel booked" },
];

// Real react-day-picker classNames from the live Leave / Per-diem calendar container.
const CAL_CLASSNAMES = {
  months: "w-full",
  month: "w-full space-y-3",
  caption: "flex justify-center pt-1 pb-2 relative items-center",
  caption_label: "text-sm font-medium",
  nav_button_previous: "absolute left-0",
  nav_button_next: "absolute right-0",
  table: "w-full border-collapse",
  head_row: "flex w-full",
  head_cell: "flex-1 text-muted-foreground font-normal text-[0.7rem] uppercase tracking-wide py-1.5",
  row: "flex w-full mt-1",
  cell: "flex-1 h-10 text-center text-sm p-0 relative focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-primary/10 first:[&:has([aria-selected])]:rounded-l-full last:[&:has([aria-selected])]:rounded-r-full [&:has(.day-range-start)]:rounded-l-full [&:has(.day-range-end)]:rounded-r-full",
  day: "h-10 w-full p-0 font-normal aria-selected:opacity-100 hover:bg-muted/60 rounded-full inline-flex items-center justify-center text-sm transition-colors",
  day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
  day_range_start: "day-range-start bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground rounded-full",
  day_range_end: "day-range-end bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground rounded-full",
  day_range_middle: "aria-selected:bg-transparent aria-selected:text-foreground rounded-none",
  day_today: "font-semibold text-foreground",
  day_outside: "text-muted-foreground/40 aria-selected:bg-primary/10 aria-selected:text-muted-foreground/60",
  day_disabled: "text-muted-foreground opacity-40",
  day_hidden: "invisible",
};


/* ---- shared field atoms (real markup, verbatim classes) ------------------ */

/** Field label — `<Label className="text-xs font-medium text-foreground/75">`. */
function FieldLabel({ children }: { children: React.ReactNode }) {
  return <Label className="text-xs font-medium text-foreground/75">{children}</Label>;
}

/** Helper caption — `<p className="text-[11px] text-muted-foreground">`. */
function Helper({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] text-muted-foreground">{children}</p>;
}

/** Segmented button group (Shift type / Trip type / Direction / Leave type).
 *  Active state uses the real fill (bg-primary/[0.06]) with the text-emphasis a11y swap. */
function Segmented({ options, cols, size = "xs", defaultActive }: { options: string[]; cols: 2 | 3; size?: "xs" | "sm"; defaultActive?: string }) {
  const [active, setActive] = React.useState<string | null>(defaultActive ?? null);
  return (
    <div className={cn("grid gap-2", cols === 2 ? "grid-cols-2" : "grid-cols-3")}>
      {options.map((o) => {
        const on = active === o;
        return (
          <button
            key={o}
            type="button"
            onClick={() => setActive(on ? null : o)}
            className={cn(
              "h-9 rounded-md border font-medium transition-colors",
              size === "sm" ? "text-sm" : "text-xs",
              on ? "border-primary bg-primary/[0.06] text-emphasis" : "border-border/60 text-foreground hover:bg-muted",
            )}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

/** Time input — verbatim container + hour/minute inputs from F41v81_TimeInput. */
function TimeInput() {
  return (
    <div className="flex items-center h-10 rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      <input type="text" inputMode="numeric" placeholder="00" aria-label="Hours" maxLength={2} className="w-8 h-8 bg-transparent text-center outline-none placeholder:text-muted-foreground tabular-nums rounded focus:bg-muted/50 transition-colors" />
      <span className="text-muted-foreground mx-1 select-none">:</span>
      <input type="text" inputMode="numeric" placeholder="00" aria-label="Minutes" maxLength={2} className="w-8 h-8 bg-transparent text-center outline-none placeholder:text-muted-foreground tabular-nums rounded focus:bg-muted/50 transition-colors" />
    </div>
  );
}

/** Upload field — label + dashed drop target (stands in for DocumentUploadField). */
function UploadField({ label }: { label: string }) {
  return (
    <div className="space-y-1.5">
      <FieldLabel>{label}</FieldLabel>
      <label className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-dashed border-border/60 px-3 py-2.5 text-xs font-medium text-muted-foreground hover:border-primary/40 hover:bg-muted/30">
        <Upload className="h-3.5 w-3.5" /> Upload document
      </label>
    </div>
  );
}

/** Range calendar container — verbatim from the Leave / Per-diem forms. */
function DateRangeCalendar() {
  const [range, setRange] = React.useState<{ from?: Date; to?: Date } | undefined>(undefined);
  return (
    <div className="rounded-xl border bg-card/50 border-border/60">
      <div className="p-3">
        <Calendar
          mode="range"
          selected={range as any}
          onSelect={setRange as any}
          numberOfMonths={1}
          modifiers={{ weekend: (date) => date.getDay() === 0 || date.getDay() === 6 }}
          modifiersClassNames={{ weekend: "text-muted-foreground/60" }}
          className="w-full pointer-events-auto p-0"
          classNames={CAL_CLASSNAMES}
        />
      </div>
    </div>
  );
}

/** Provided-during-trip list — verbatim PerDiemProvidedList (Yes/No rows). */
function ProvidedDuringTrip() {
  const [state, setState] = React.useState<Record<string, boolean>>({});
  return (
    <div className="space-y-1.5">
      <FieldLabel>Provided during trip</FieldLabel>
      <div className="rounded-lg border border-border/60 divide-y divide-border/50 overflow-hidden">
        {PROVIDED_ROWS.map((row) => (
          <div key={row.key} className="flex items-center justify-between gap-3 h-11 px-3">
            <span className="text-sm text-foreground truncate">{row.label}</span>
            <div className="grid grid-cols-2 gap-1 shrink-0 w-[104px]">
              {[false, true].map((opt) => (
                <button
                  key={String(opt)}
                  type="button"
                  onClick={() => setState((s) => ({ ...s, [row.key]: opt }))}
                  className={cn(
                    "h-7 rounded-md border text-xs font-medium transition-colors",
                    state[row.key] === opt ? "border-primary bg-primary/[0.06] text-emphasis" : "border-border/60 text-muted-foreground hover:bg-muted",
                  )}
                >
                  {opt ? "Yes" : "No"}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Description input — single-line intent: line breaks are not accepted.
 *  Enter is ignored, and any pasted newlines are collapsed to a space.
 *  100-character cap with a live "characters left" counter. */
function DescriptionField({ placeholder }: { placeholder?: string }) {
  const MAX = 100;
  const [v, setV] = React.useState("");
  const strip = (s: string) => s.replace(/[\r\n]+/g, " ").slice(0, MAX);
  const remaining = Math.max(0, MAX - v.length);
  return (
    <>
      <Textarea
        value={v}
        placeholder={placeholder ?? "Describe the adjustment"}
        maxLength={MAX}
        onKeyDown={(e) => { if (e.key === "Enter") e.preventDefault(); }}
        onChange={(e) => setV(strip(e.target.value))}
        className="min-h-[72px] resize-none"
      />
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] text-muted-foreground" />
        <p className={cn("text-[11px] tabular-nums shrink-0 ml-auto", remaining === 0 ? "text-destructive" : "text-muted-foreground")}>{remaining} characters left</p>
      </div>
    </>
  );
}

/* ---- per-type forms (verbatim from F41v81_AdjustmentModal) ---------------- */

function OvertimeForm() {
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <div className="p-4 rounded-xl border border-border/60 bg-card/50 space-y-3 relative group">
          {/* Date picker */}
          <div className="space-y-1.5">
            <FieldLabel>Date</FieldLabel>
            <Button variant="outline" className="w-full h-9 justify-start text-left font-normal text-muted-foreground">Select date</Button>
          </div>

          {/* Shift type (optional) */}
          <div className="space-y-1.5">
            <FieldLabel>Shift type (optional)</FieldLabel>
            <Segmented options={OVERTIME_KINDS} cols={3} />
            <Helper>If your work is shift-based (e.g. Mexico, Philippines). Leave blank if it doesn't apply.</Helper>
          </div>

          {/* Overtime trigger */}
          <div className="space-y-1.5">
            <FieldLabel>Overtime trigger</FieldLabel>
            <Select>
              <SelectTrigger className="h-9"><SelectValue placeholder="Select trigger" /></SelectTrigger>
              <SelectContent>
                {OVERTIME_TRIGGERS.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
            <Helper>What made this overtime?</Helper>
          </div>

          {/* Start & End time */}
          <div className="space-y-1.5">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><FieldLabel>Start time</FieldLabel><TimeInput /></div>
              <div className="space-y-1.5"><FieldLabel>End time</FieldLabel><TimeInput /></div>
            </div>
          </div>

          {/* Attachment (optional) */}
          <UploadField label="Attachment (optional)" />
        </div>
      </div>
      <Button className="w-full">Request adjustment</Button>
    </div>
  );
}

function ExpenseForm() {
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <div className="p-4 rounded-xl border border-border/60 bg-card/50 space-y-3 relative group">
          {/* Category & Amount row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <FieldLabel>Category</FieldLabel>
              <Select>
                <SelectTrigger className="h-9"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {EXPENSE_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <FieldLabel>Amount ({CURRENCY})</FieldLabel>
              <Input type="number" step="0.01" min="0.01" placeholder="0.00" className="h-9" />
            </div>
          </div>

          {/* Attachments — multi upload */}
          <UploadField label="Attachments" />
        </div>
      </div>

      {/* Add another expense */}
      <button type="button" className="w-full p-3 rounded-xl border border-dashed border-border/60 text-sm text-muted-foreground hover:border-primary/50 hover:text-emphasis hover:bg-primary/[0.02] transition-colors flex items-center justify-center gap-2">
        <span className="text-lg leading-none">+</span>
        Add another expense
      </button>

      {/* Tag (optional) */}
      <div className="space-y-1.5">
        <FieldLabel>Tag (optional)</FieldLabel>
        <div className="min-h-[36px] rounded-md border border-input bg-background px-2.5 py-1.5 flex items-center text-xs text-muted-foreground">Type and press Enter</div>
      </div>

      <Button className="w-full">Request adjustment</Button>
    </div>
  );
}

function BonusForm() {
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <div className="p-4 rounded-xl border border-border/60 bg-card/50 space-y-3 relative group">
          {/* Amount */}
          <div className="space-y-1.5">
            <FieldLabel>Amount ({CURRENCY})</FieldLabel>
            <Input type="number" step="0.01" min="0.01" placeholder="0.00" className="h-9" />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <FieldLabel>Description</FieldLabel>
            <DescriptionField placeholder="What is this bonus for?" />
          </div>

          {/* Attachment (optional) */}
          <UploadField label="Attachment (optional)" />
        </div>
      </div>
      <Button className="w-full">Request adjustment</Button>
    </div>
  );
}

function PerDiemForm() {
  return (
    <div className="space-y-5">
      {/* Travel dates */}
      <DateRangeCalendar />

      <div className="p-4 rounded-xl border border-border/60 bg-card/50 space-y-3">
        {/* City + Country */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <FieldLabel>City</FieldLabel>
            <Input type="text" placeholder="e.g., Singapore" className="h-9" />
          </div>
          <div className="space-y-1.5">
            <FieldLabel>Country</FieldLabel>
            <Select>
              <SelectTrigger className="h-9"><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {PER_DIEM_COUNTRIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Trip type */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <FieldLabel>Trip type</FieldLabel>
            <Segmented options={["Domestic", "Intl."]} cols={2} defaultActive="Domestic" />
          </div>
        </div>

        {/* Provided during trip */}
        <ProvidedDuringTrip />

        {/* Purpose (optional) */}
        <div className="space-y-1.5">
          <FieldLabel>Purpose (optional)</FieldLabel>
          <Input type="text" placeholder="e.g., Client workshop" className="h-9" />
        </div>
      </div>

      <Button className="w-full">Request adjustment</Button>
    </div>
  );
}

function LeaveForm() {
  return (
    <div className="space-y-5">
      {/* Leave type */}
      <div className="space-y-1.5">
        <FieldLabel>Leave type</FieldLabel>
        <Segmented options={LEAVE_TYPES} cols={2} />
      </div>

      {/* Date range */}
      <DateRangeCalendar />

      {/* Upload documents (optional) */}
      <UploadField label="Upload documents (optional)" />

      <Button className="w-full">Request adjustment</Button>
    </div>
  );
}

function OtherForm() {
  return (
    <div className="space-y-5">
      {/* Direction toggle */}
      <Segmented options={["Addition", "Deduction"]} cols={2} size="sm" defaultActive="Addition" />

      {/* Amount */}
      <div className="space-y-1.5">
        <FieldLabel>Amount ({CURRENCY})</FieldLabel>
        <Input type="number" step="0.01" min="0.01" placeholder="0.00" className="h-10" />
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <FieldLabel>Description</FieldLabel>
        <DescriptionField placeholder="e.g., Milestone bonus for Q4 delivery" />
      </div>

      {/* Attachment (optional) */}
      <UploadField label="Attachment (optional)" />

      <Button className="w-full">Request adjustment</Button>
    </div>
  );
}

function TypeForm({ id }: { id: string }) {
  switch (id) {
    case "overtime": return <OvertimeForm />;
    case "expense": return <ExpenseForm />;
    case "bonus": return <BonusForm />;
    case "per-diem": return <PerDiemForm />;
    case "leave": return <LeaveForm />;
    case "other": return <OtherForm />;
    default: return null;
  }
}

/* ---- static panels (laid out inline, like Worker Drawer) ----------------- */

/** The drawer chrome as a static panel: header (title + description) + body. */
function Panel({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="w-[440px] max-w-full rounded-lg border border-border bg-background shadow-overlay overflow-hidden">
      <div className="px-6 pt-5 pb-4 border-b border-border/40">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <p className="text-muted-foreground text-xs mt-0.5">{desc}</p>
      </div>
      <div className="px-6 py-6">{children}</div>
    </div>
  );
}

export const AdjustmentTypes: Story = {
  name: "Adjustment Request",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        title="Adjustment Request"
        lead={<>The right-side drawer the worker opens to request an adjustment: a <b>type picker</b>, then one of <b>6 per-type forms</b>. Each panel is laid out below exactly as it appears in the drawer. Verbatim from F41v81_AdjustmentModal (employee) / F42v81_AdjustmentDrawer (contractor).</>}
      />

      {/* Type picker */}
      <h3 style={eyebrow}>Type picker</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
        <Panel title="Request adjustments" desc="Submit an adjustment for the current pay cycle">
          <div className="grid grid-cols-1 gap-3">
            {TYPES.map((t) => (
              <button key={t.id} className="flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left border-border/60 hover:border-primary/50 hover:bg-primary/[0.02]">
                <div className="p-2.5 rounded-lg bg-muted/50"><t.icon className="h-5 w-5 text-muted-foreground" /></div>
                <div className="flex-1"><p className="text-sm font-medium text-foreground">{t.label}</p><p className="text-xs text-muted-foreground">{t.description}</p></div>
              </button>
            ))}
          </div>
        </Panel>
      </div>
      <p style={{ ...note, marginTop: 4 }}>Picker cards p-4 rounded-xl border-2 border-border/60 hover:border-primary/50. Picking a type swaps the body to that type's form (below).</p>

      {/* One panel per type — laid out, no click needed */}
      {TYPES.map((t) => (
        <React.Fragment key={t.id}>
          <h3 style={eyebrow}>{t.label}</h3>
          <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
            <Panel title={t.formTitle} desc={t.formDesc}><TypeForm id={t.id} /></Panel>
          </div>
        </React.Fragment>
      ))}

      <p style={{ ...note, marginTop: 14 }}>Each form wraps its fields in a card (p-4 rounded-xl border border-border/60 bg-card/50 space-y-3) with real Label + helper text + controls — Select, date-picker trigger, range calendar, time inputs, upload. Description (Bonus / Other) is single-line by intent: Enter is ignored, pasted newlines collapse to a space, capped at 100 characters with a live counter.</p>
    </div>
  ),
};
