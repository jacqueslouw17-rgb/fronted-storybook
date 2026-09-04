import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Clock, Plane, Receipt, CalendarOff, Gift, MoreHorizontal, ArrowLeft, Upload, ChevronDown, Plus, type LucideIcon } from "lucide-react";
import { wrap, eyebrow, note, PageHeader } from "./_docTable";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Adjustment Request (verbatim F41v81_AdjustmentModal / F42v81_AdjustmentDrawer).
 * A right-side drawer: the worker opens it, picks one of 6 adjustment types, and the drawer
 * swaps to that type's form (a back arrow returns to the picker). Open the drawer below.
 */
const meta: Meta = { title: "Patterns/Adjustment Request", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

type Kind = "text" | "amount" | "date" | "daterange" | "time" | "select" | "upload" | "segmented" | "chips" | "tag" | "description";
type Field = { label: string; kind: Kind; placeholder?: string; optional?: boolean; options?: string[]; addLabel?: string };
type AdjType = { id: string; label: string; description: string; formTitle: string; formDesc: string; icon: LucideIcon; opens: string; fields: Field[] };

// Verbatim from the live Request-adjustment drawer (demofronted.live · F4.1 employee).
const TYPES: AdjType[] = [
  { id: "overtime", label: "Overtime", description: "Log extra hours", formTitle: "Overtime request", formDesc: "Log your overtime hours", icon: Clock, opens: "date · shift type · trigger · start/end time · attachment", fields: [
    { label: "Date", kind: "date" },
    { label: "Shift type", kind: "segmented", optional: true, options: ["Morning", "Mixed", "Night"] },
    { label: "Overtime trigger", kind: "select", placeholder: "Select trigger" },
    { label: "Start time", kind: "time" }, { label: "End time", kind: "time" },
    { label: "Attachment", kind: "upload", optional: true },
  ] },
  { id: "per-diem", label: "Per diem", description: "Travel-day allowance — no receipt needed", formTitle: "Per diem request", formDesc: "Travel-day allowance — no receipt needed", icon: Plane, opens: "city · country · trip type · dates · provided · purpose", fields: [
    { label: "City", kind: "text", placeholder: "e.g., Singapore" },
    { label: "Country", kind: "select", placeholder: "Select country" },
    { label: "Trip type", kind: "select", placeholder: "Select trip type" },
    { label: "Dates", kind: "daterange" },
    { label: "Provided during trip", kind: "chips", options: ["Breakfast", "Lunch", "Dinner", "Hotel"] },
    { label: "Purpose", kind: "text", optional: true, placeholder: "e.g., Client workshop" },
  ] },
  { id: "expense", label: "Expense Reimbursements", description: "Submit a reimbursement", formTitle: "Expense request", formDesc: "Submit a reimbursement", icon: Receipt, opens: "category · amount · attachments · tag · +add another", fields: [
    { label: "Category", kind: "select", placeholder: "Select" },
    { label: "Amount (PHP)", kind: "amount", placeholder: "0.00" },
    { label: "Attachments", kind: "upload" },
    { label: "Tag", kind: "tag", optional: true, placeholder: "Type and press Enter" },
    { label: "", kind: "text", addLabel: "Add another expense" },
  ] },
  { id: "leave", label: "Leave", description: "Request paid, unpaid, or sick leave", formTitle: "Leave", formDesc: "Request paid, unpaid, or sick leave", icon: CalendarOff, opens: "leave type · date range · upload docs", fields: [
    { label: "Leave type", kind: "segmented", options: ["Paid leave", "Unpaid leave", "Sick leave", "Other"] },
    { label: "Dates", kind: "daterange" },
    { label: "Upload documents", kind: "upload", optional: true },
  ] },
  { id: "bonus", label: "Bonus", description: "Request a bonus", formTitle: "Bonus request", formDesc: "Request a bonus", icon: Gift, opens: "amount · description · attachment", fields: [
    { label: "Amount (PHP)", kind: "amount", placeholder: "0.00" },
    { label: "Description", kind: "description", placeholder: "What is this bonus for?" },
    { label: "Attachment", kind: "upload", optional: true },
  ] },
  { id: "other", label: "Other", description: "Any other addition or deduction", formTitle: "Other adjustment", formDesc: "Any other addition or deduction", icon: MoreHorizontal, opens: "addition/deduction · amount · description · attachment", fields: [
    { label: "Type", kind: "segmented", options: ["Addition", "Deduction"] },
    { label: "Amount (PHP)", kind: "amount", placeholder: "0.00" },
    { label: "Description", kind: "description", placeholder: "e.g., Milestone bonus for Q4 delivery" },
    { label: "Attachment", kind: "upload", optional: true },
  ] },
];

const sheetCls = "[&>button.absolute]:top-[19px] [&>button.absolute]:right-5 w-full sm:w-full sm:max-w-md overflow-y-auto";

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

function FieldRow({ f }: { f: Field }) {
  // "+ Add another …" repeat control (no label)
  if (f.addLabel) {
    return <button className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border/60 px-3 py-2.5 text-xs font-medium text-muted-foreground hover:border-primary/40 hover:bg-muted/30"><Plus className="h-3.5 w-3.5" />{f.addLabel}</button>;
  }
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2"><span className="text-xs font-medium text-foreground/75">{f.label}</span>{f.optional && <span className="text-[10px] px-1.5 py-0 h-4 inline-flex items-center rounded-full bg-muted text-muted-foreground">Optional</span>}</div>
      {f.kind === "upload" ? (
        <label className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-dashed border-border/60 px-3 py-2.5 text-xs font-medium text-muted-foreground hover:border-primary/40 hover:bg-muted/30"><Upload className="h-3.5 w-3.5" /> Upload document</label>
      ) : f.kind === "segmented" ? (
        <div className="flex flex-wrap gap-2">{f.options?.map((o, i) => (
          <span key={o} className={cn("inline-flex items-center h-9 px-3 rounded-md border text-sm cursor-pointer", i === 0 ? "border-primary bg-primary/[0.06] text-emphasis" : "border-input bg-background text-muted-foreground")}>{o}</span>
        ))}</div>
      ) : f.kind === "chips" ? (
        <div className="flex flex-wrap gap-2">{f.options?.map((o) => (
          <span key={o} className="inline-flex items-center h-8 px-3 rounded-full border border-input bg-background text-xs text-muted-foreground cursor-pointer">{o}</span>
        ))}</div>
      ) : f.kind === "daterange" ? (
        <div className="rounded-md border border-input bg-background px-3 py-6 text-center text-xs text-muted-foreground">Date range calendar</div>
      ) : f.kind === "tag" ? (
        <div className="min-h-[36px] rounded-md border border-input bg-background px-2.5 py-1.5 flex items-center text-xs text-muted-foreground">{f.placeholder}</div>
      ) : f.kind === "select" ? (
        <div className="h-10 rounded-md border border-input bg-background px-3 flex items-center justify-between text-sm text-muted-foreground"><span>{f.placeholder}</span><ChevronDown className="h-3.5 w-3.5 opacity-50" /></div>
      ) : f.kind === "description" ? (
        <DescriptionField placeholder={f.placeholder} />
      ) : f.kind === "time" ? (
        <div className="h-10 w-full rounded-md border border-input bg-background px-3 flex items-center gap-1 text-sm text-muted-foreground tabular-nums"><span>00</span><span className="opacity-50">:</span><span>00</span></div>
      ) : (
        <div className="h-10 rounded-md border border-input bg-background px-3 flex items-center text-sm text-muted-foreground">{f.placeholder ?? (f.kind === "date" ? "Select date" : "")}</div>
      )}
    </div>
  );
}

/** Drawer body — picker step, then per-type form. Resets to the picker when the drawer closes. */
function RequestBody({ resetKey }: { resetKey: number }) {
  const [sel, setSel] = React.useState<AdjType | null>(null);
  React.useEffect(() => { setSel(null); }, [resetKey]);
  return (
    <>
      <SheetHeader className="pb-4 border-b border-border/40 text-left">
        <div className="flex items-center gap-2">
          {sel && (
            <Button variant="ghost" size="icon" className="h-8 w-8 -ml-2" onClick={() => setSel(null)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div>
            <SheetTitle>{sel ? sel.formTitle : "Request adjustments"}</SheetTitle>
            <SheetDescription className="text-xs mt-0.5">{sel ? sel.formDesc : "Submit an adjustment for the current pay cycle"}</SheetDescription>
          </div>
        </div>
      </SheetHeader>

      <div className="py-6 space-y-6">
        {!sel ? (
          <div className="grid grid-cols-1 gap-3">
            {TYPES.map((t) => (
              <button key={t.id} onClick={() => setSel(t)} className="flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left border-border/60 hover:border-primary/50 hover:bg-primary/[0.02]">
                <div className="p-2.5 rounded-lg bg-muted/50"><t.icon className="h-5 w-5 text-muted-foreground" /></div>
                <div className="flex-1"><p className="text-sm font-medium text-foreground">{t.label}</p><p className="text-xs text-muted-foreground">{t.description}</p></div>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-5">
            {sel.fields.map((f) => <FieldRow key={f.label} f={f} />)}
            <Button variant="secondary" className="w-full">Request adjustment</Button>
          </div>
        )}
      </div>
    </>
  );
}

function RequestDrawer() {
  const [open, setOpen] = React.useState(false);
  const [resetKey, setResetKey] = React.useState(0);
  return (
    <Sheet open={open} onOpenChange={(o) => { setOpen(o); if (!o) setResetKey((k) => k + 1); }}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 text-xs gap-1.5"><Plus className="h-3.5 w-3.5" /> Request adjustment</Button>
      </SheetTrigger>
      <SheetContent side="right" className={sheetCls}><RequestBody resetKey={resetKey} /></SheetContent>
    </Sheet>
  );
}

export const AdjustmentTypes: Story = {
  name: "Adjustment Request",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        title="Adjustment Request"
        lead={<>
        A right-side <b>drawer</b>: the worker opens it, picks one of <b>6 adjustment types</b>, and the drawer
        swaps to that type's form (the back arrow returns to the picker). Verbatim from F41v81_AdjustmentModal
        (employee) / F42v81_AdjustmentDrawer (contractor).
        </>}
      />

      <h3 style={eyebrow}>Live drawer (open it)</h3>
      <RequestDrawer />
      <p style={{ ...note, marginTop: 10 }}>Description is single-line by intent — it does not accept line breaks. Enter is ignored and pasted newlines collapse to a space; capped at 100 characters with a live counter. Try it in the drawer.</p>
      <p style={{ ...note, marginTop: 10 }}>Sheet side=right sm:max-w-md overflow-y-auto · SheetHeader border-b · picker grid grid-cols-1 gap-3 · card p-4 rounded-xl border-2 border-border/60 hover:border-primary/50 · detail = back arrow + per-type title/description + fields + full-width Request adjustment</p>

      <h3 style={eyebrow}>The 6 types &amp; the form each opens</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 12 }}>
        {TYPES.map((t) => (
          <div key={t.id} className="rounded-xl border border-border/40 bg-card/20 p-4 flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-muted/50 shrink-0"><t.icon className="h-5 w-5 text-muted-foreground" /></div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">{t.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{t.description}</p>
              <p style={{ ...note, marginTop: 6 }}>→ {t.opens}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
