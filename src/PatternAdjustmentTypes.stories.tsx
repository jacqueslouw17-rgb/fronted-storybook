import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
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

type Field = { label: string; kind: "text" | "amount" | "date" | "time" | "select" | "upload"; placeholder?: string; optional?: boolean };
type AdjType = { id: string; label: string; description: string; icon: LucideIcon; opens: string; fields: Field[] };

const TYPES: AdjType[] = [
  { id: "overtime", label: "Overtime", description: "Log extra hours", icon: Clock, opens: "date + start/end time → calculated hours", fields: [
    { label: "Date", kind: "date" }, { label: "Start time", kind: "time", placeholder: "18:00" }, { label: "End time", kind: "time", placeholder: "21:00" }, { label: "Attachment", kind: "upload", optional: true },
  ] },
  { id: "per-diem", label: "Per diem", description: "Travel-day allowance — no receipt needed", icon: Plane, opens: "days + rate, no attachment", fields: [
    { label: "Number of days", kind: "text", placeholder: "2" }, { label: "Daily rate", kind: "amount", placeholder: "PHP 1,500" },
  ] },
  { id: "expense", label: "Expense Reimbursements", description: "Submit a reimbursement", icon: Receipt, opens: "category + amount + receipt upload", fields: [
    { label: "Category", kind: "select", placeholder: "Meals" }, { label: "Amount", kind: "amount", placeholder: "PHP 6,350" }, { label: "Receipt", kind: "upload" },
  ] },
  { id: "leave", label: "Leave", description: "Request paid, unpaid, or sick leave", icon: CalendarOff, opens: "leave type + date range", fields: [
    { label: "Leave type", kind: "select", placeholder: "Paid leave" }, { label: "From", kind: "date" }, { label: "To", kind: "date" },
  ] },
  { id: "bonus", label: "Bonus", description: "Request a bonus", icon: Gift, opens: "description + amount", fields: [
    { label: "Description", kind: "text", placeholder: "Q4 delivery bonus" }, { label: "Amount", kind: "amount", placeholder: "PHP 10,000" },
  ] },
  { id: "other", label: "Other", description: "Any other addition or deduction", icon: MoreHorizontal, opens: "free description + amount", fields: [
    { label: "Description", kind: "text", placeholder: "Describe the adjustment" }, { label: "Amount", kind: "amount", placeholder: "PHP 0.00" },
  ] },
];

const sheetCls = "[&>button.absolute]:top-[19px] [&>button.absolute]:right-5 w-full sm:w-[440px] sm:max-w-[440px] p-0 flex flex-col overflow-hidden";

/** Description input — single-line intent: line breaks are not accepted.
 *  Enter is ignored, and any pasted newlines are collapsed to a space.
 *  100-character cap with a live "characters left" counter. */
function DescriptionField({ placeholder }: { placeholder?: string }) {
  const MAX = 100;
  const [v, setV] = React.useState("");
  const strip = (s: string) => s.replace(/[\r\n]+/g, " ").slice(0, MAX);
  return (
    <div>
      <textarea
        rows={3}
        value={v}
        placeholder={placeholder ?? "Describe the adjustment"}
        onKeyDown={(e) => { if (e.key === "Enter") e.preventDefault(); }}
        onChange={(e) => setV(strip(e.target.value))}
        className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      />
      <div className="mt-1 text-[11px] text-muted-foreground text-right">{MAX - v.length} characters left</div>
    </div>
  );
}

function FieldRow({ f }: { f: Field }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2"><span className="text-xs font-medium text-foreground/75">{f.label}</span>{f.optional && <span className="text-[10px] px-1.5 py-0 h-4 inline-flex items-center rounded-full bg-muted text-muted-foreground">Optional</span>}</div>
      {f.kind === "upload" ? (
        <label className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-dashed border-border/60 px-3 py-2.5 text-xs font-medium text-muted-foreground hover:border-primary/40 hover:bg-muted/30"><Upload className="h-3.5 w-3.5" /> Upload receipt</label>
      ) : f.kind === "select" ? (
        <div className="h-10 rounded-md border border-input bg-background px-3 flex items-center justify-between text-sm text-muted-foreground"><span>{f.placeholder}</span><ChevronDown className="h-3.5 w-3.5 opacity-50" /></div>
      ) : f.label === "Description" ? (
        <DescriptionField placeholder={f.placeholder} />
      ) : (
        <div className="h-10 rounded-md border border-input bg-background px-3 flex items-center text-sm text-muted-foreground">{f.placeholder ?? (f.kind === "date" ? "Select date" : f.kind === "time" ? "--:--" : "")}</div>
      )}
    </div>
  );
}

/** Drawer body — picker step, then per-type form. Resets to the picker when the drawer closes. */
function RequestBody({ resetKey }: { resetKey: number }) {
  const [sel, setSel] = React.useState<AdjType | null>(null);
  React.useEffect(() => { setSel(null); }, [resetKey]);
  if (!sel) {
    return (
      <>
        <div className="px-5 py-4 border-b border-border/40">
          <div className="text-base font-semibold text-foreground">Request an adjustment</div>
          <p className="text-xs text-muted-foreground mt-0.5">What would you like to add to this pay period?</p>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          <div className="grid grid-cols-1 gap-3">
            {TYPES.map((t) => (
              <button key={t.id} onClick={() => setSel(t)} className="flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left w-full border-border/60 hover:border-primary/50 hover:bg-primary/[0.02]">
                <div className="p-2.5 rounded-lg bg-muted/50"><t.icon className="h-5 w-5 text-muted-foreground" /></div>
                <div className="flex-1 min-w-0"><p className="text-sm font-medium text-foreground">{t.label}</p><p className="text-xs text-muted-foreground">{t.description}</p></div>
              </button>
            ))}
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border/40">
        <button onClick={() => setSel(null)} className="text-muted-foreground hover:text-foreground" aria-label="Back"><ArrowLeft className="h-4 w-4" /></button>
        <div className="p-2 rounded-lg bg-muted/50"><sel.icon className="h-4 w-4 text-muted-foreground" /></div>
        <div className="flex-1 min-w-0"><div className="text-sm font-semibold text-foreground">{sel.label}</div><p className="text-[11px] text-muted-foreground">{sel.description}</p></div>
      </div>
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {sel.fields.map((f) => <FieldRow key={f.label} f={f} />)}
      </div>
      <div className="px-5 py-4 border-t border-border/40 flex gap-2">
        <button onClick={() => setSel(null)} className="flex-1 h-9 rounded-md border border-border bg-background text-sm font-medium hover:bg-foreground hover:text-background">Back</button>
        <button className="flex-1 h-9 rounded-md bg-gradient-primary text-primary-foreground text-sm font-medium">Submit request</button>
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
        <Button size="sm" className="h-9 text-xs gap-1.5 bg-gradient-primary"><Plus className="h-3.5 w-3.5" /> Request adjustment</Button>
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
      <p style={{ ...note, marginTop: 10 }}>Sheet side=right w-[440px] p-0 flex flex-col · picker grid grid-cols-1 gap-3 · card p-4 rounded-xl border-2 border-border/60 hover:border-primary/50 · detail = back arrow + type header + per-type fields + sticky footer (Back / gradient Submit)</p>

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
