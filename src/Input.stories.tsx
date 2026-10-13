import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import "./tokens.css";
import "./typography.css";
import { PageHeader } from "./_docTable";
import { Guidance } from "./guidance";

/**
 * Components — Input / Field.
 * The real ui/input from the flows. Label is text-xs / medium / foreground-75,
 * optional fields get an "Optional" marker (required is the default — never a *).
 * Drawers render the input at h-10. Read-only = disabled + bg-muted/50. Error =
 * destructive border + ring. Currency inputs pl-12 with a prefix; search pl-8 h-8.
 */
const meta: Meta = { title: "Components/Input", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const wrap: React.CSSProperties = { fontFamily: "var(--ds-font-body)", color: "var(--ds-color-text)", maxWidth: 940, padding: 4 };
const eyebrow: React.CSSProperties = { fontSize: 12, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", margin: "28px 0 10px", fontWeight: 600 };
const th: React.CSSProperties = { textAlign: "left", padding: "10px 16px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", background: "var(--ds-color-surface-sunken)", borderBottom: "1px solid var(--ds-color-border)" };
const td: React.CSSProperties = { padding: "14px 16px", borderBottom: "1px solid var(--ds-color-border)", verticalAlign: "top" };
const note: React.CSSProperties = { fontFamily: "var(--ds-font-mono)", fontSize: 11, color: "var(--ds-color-text-muted)" };

const labelCls = "text-xs font-medium text-foreground/75";
const h10 = "h-10"; // drawer default in the flows

/** Field wrapper as in the flows: label (+ Optional / *) · control · hint/error. */
function Field({ label, optional, hint, error, children }: { label: string; optional?: boolean; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5 w-[300px] max-w-full">
      <Label className={cn(labelCls, "flex items-center gap-1.5")}>
        {label}
        {optional ? <span className="text-[11px] font-normal text-muted-foreground">Optional</span> : null}
      </Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

function Table({ head, rows }: { head: [string, string, string]; rows: Array<{ a: string; b: React.ReactNode; c: string }> }) {
  return (
    <div style={{ border: "1px solid var(--ds-color-border)", borderRadius: "var(--ds-radius-card)", overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead><tr>{head.map((h, i) => <th key={i} style={{ ...th, width: i === 0 ? 150 : i === 2 ? 260 : "auto" }}>{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.a} style={{ background: i % 2 ? "var(--ds-color-bg)" : "var(--ds-color-surface)" }}>
              <td style={{ ...td, fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" }}>{r.a}</td>
              <td style={td}>{r.b}</td>
              <td style={{ ...td, ...note }}>{r.c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Textarea with a live "N characters left" counter (as in the adjustment form). */
function CountingTextarea({ max = 120 }: { max?: number }) {
  const [v, setV] = React.useState("");
  return (
    <div className="w-[300px] max-w-full">
      <Textarea maxLength={max} value={v} onChange={(e) => setV(e.target.value)} placeholder="e.g., Milestone bonus for Q4 delivery" />
      <p className="mt-1 text-right text-[11px] text-muted-foreground">{max - v.length} characters left</p>
    </div>
  );
}

export const InputStory: Story = {
  name: "Input",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Components"
        status="Stable"
        title="Input"
        lead={<>
        The form field from the flows — small label, thin-bordered control, dark focus ring, helper below.
        Required is default; optional fields are marked. Drawers render at h-10.
        </>}
      />

      <h3 style={eyebrow}>States</h3>
      <Table
        head={["State", "Example", "Notes"]}
        rows={[
          { a: "Default", b: <Field label="Full name"><Input className={h10} placeholder="e.g. Maria Santos" /></Field>, c: "empty · muted placeholder" },
          { a: "Filled", b: <Field label="Full name"><Input className={h10} defaultValue="Maria Santos" /></Field>, c: "value in foreground" },
          { a: "Focus", b: <Field label="Email"><Input className={cn(h10, "ring-2 ring-ring ring-offset-2")} defaultValue="maria@acme.com" /></Field>, c: "dark 2px ring" },
          { a: "Read-only", b: <Field label="Working country"><Input className={cn(h10, "bg-muted/50")} value="Philippines" disabled /></Field>, c: "disabled + bg-muted/50 (prefilled)" },
          { a: "Error", b: <Field label="Email" error="Enter a valid email address."><Input className={cn(h10, "border-destructive focus-visible:ring-destructive")} defaultValue="maria@" aria-invalid /></Field>, c: "border-destructive + ring" },
          { a: "Optional", b: <Field label="Address" optional hint="Used only for payroll."><Input className={h10} placeholder="Full residential address" /></Field>, c: "only optional is marked — required is the default" },
        ]}
      />

      <h3 style={eyebrow}>Field types</h3>
      <Table
        head={["Type", "Example", "Notes"]}
        rows={[
          { a: "Text", b: <Field label="Role"><Input className={h10} defaultValue="Frontend Engineer" /></Field>, c: "standard single-line" },
          { a: "Email", b: <Field label="Email"><Input className={h10} type="email" placeholder="name@company.com" /></Field>, c: "type=email" },
          { a: "Phone", b: <Field label="Phone" optional><Input className={h10} type="tel" placeholder="+63 917 123 4567" /></Field>, c: "labelled input, format placeholder" },
          { a: "Number + unit", b: (
            <Field label="Probation period" hint="Max: 180 days">
              <div className="flex items-center gap-2">
                <Input className={cn(h10, "w-24")} type="number" defaultValue={180} min={0} max={180} />
                <span className="text-sm text-muted-foreground">days</span>
              </div>
            </Field>
          ), c: "type=number · unit · Max/Min hint" },
          { a: "Textarea", b: <Field label="Description"><CountingTextarea /></Field>, c: "multi-line · live character counter" },
        ]}
      />

      <h3 style={eyebrow}>Affixes (prefix / search)</h3>
      <Table
        head={["Type", "Example", "Notes"]}
        rows={[
          { a: "Currency prefix", b: (
            <Field label="Monthly salary">
              <div className="relative w-[240px] max-w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">NOK</span>
                <Input className={cn(h10, "pl-12")} placeholder="5,000" />
              </div>
            </Field>
          ), c: "pl-12 · absolute prefix (currency)" },
          { a: "Rate + unit", b: (
            <Field label="Contractor rate">
              <div className="relative w-[240px] max-w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">NOK / hr</span>
                <Input className={cn(h10, "pl-[96px]")} placeholder="850" />
              </div>
            </Field>
          ), c: "pl-[96px] · longer unit prefix" },
          { a: "Search", b: (
            <div className="relative w-[240px] max-w-full">
              <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
              <Input placeholder="Search..." className="pl-8 h-8 text-xs bg-background/50 border-border/30" />
            </div>
          ), c: "pl-8 h-8 text-xs bg-background/50 border-border/30 (table toolbars)" },
        ]}
      />

      <p style={{ ...note, marginTop: 12 }}>
        label text-xs/medium/foreground-75 · control h-10 (drawers) · search h-8 · dark focus ring · Select &amp; Date are separate components
      </p>
      <Guidance k="input" />
    </div>
  ),
};
