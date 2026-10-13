import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Info } from "lucide-react";
import "./tokens.css";
import "./typography.css";
import { PageHeader } from "./_docTable";
import { Guidance } from "./guidance";

/**
 * Components — Label (Radix, verbatim ui/label).
 * The component default is `text-sm font-medium leading-none`, but every field in
 * the 6 flows overrides to `text-xs font-medium text-foreground/75` (102 uses) —
 * that is the real field-label style. Optional fields append a muted "(optional)";
 * required is never marked. In checkbox/switch rows the label is `font-normal` and
 * clickable (htmlFor) so tapping the text toggles the control.
 */
const meta: Meta = { title: "Components/Label", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const wrap: React.CSSProperties = { fontFamily: "var(--ds-font-body)", color: "var(--ds-color-text)", maxWidth: 940, padding: 4 };
const eyebrow: React.CSSProperties = { fontSize: 12, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", margin: "28px 0 10px", fontWeight: 600 };
const th: React.CSSProperties = { textAlign: "left", padding: "10px 16px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", background: "var(--ds-color-surface-sunken)", borderBottom: "1px solid var(--ds-color-border)" };
const td: React.CSSProperties = { padding: "14px 16px", borderBottom: "1px solid var(--ds-color-border)", verticalAlign: "top" };
const note: React.CSSProperties = { fontFamily: "var(--ds-font-mono)", fontSize: 11, color: "var(--ds-color-text-muted)" };

function Table({ rows }: { rows: Array<{ a: string; b: React.ReactNode; c: string }> }) {
  return (
    <div style={{ border: "1px solid var(--ds-color-border)", borderRadius: "var(--ds-radius-card)", overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead><tr>{["Variant", "Example", "Classes"].map((h, i) => <th key={i} style={{ ...th, width: i === 0 ? 170 : i === 2 ? 300 : "auto" }}>{h}</th>)}</tr></thead>
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

export const LabelStory: Story = {
  name: "Label",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Components"
        status="Stable"
        title="Label"
        lead={<>
        Field labels across the flows use <code>text-xs font-medium text-foreground/75</code> — smaller and
        softer than the component default. Optional fields append a muted "(optional)"; required is never marked.
        </>}
      />

      <h3 style={eyebrow}>Variants</h3>
      <Table rows={[
        {
          a: "Field label",
          b: <div className="space-y-1.5"><Label htmlFor="l1" className="text-xs font-medium text-foreground/75">Job title</Label><Input id="l1" defaultValue="Frontend Engineer" className="w-[240px] max-w-full h-10" /></div>,
          c: "text-xs font-medium text-foreground/75 (102× — the real field style)",
        },
        {
          a: "With icon",
          b: <div className="space-y-1.5"><Label htmlFor="l2" className="text-xs font-medium text-foreground/75 flex items-center gap-1.5">Monthly salary <Info className="h-3 w-3 text-muted-foreground" /></Label><Input id="l2" defaultValue="NOK 65,000" className="w-[240px] max-w-full h-10" /></div>,
          c: "+ flex items-center gap-1.5 (info hint)",
        },
        {
          a: "Optional",
          b: <div className="space-y-1.5"><Label htmlFor="l3" className="text-xs font-medium text-foreground/75">Additional notes <span className="text-muted-foreground font-normal">(optional)</span></Label><Input id="l3" placeholder="Add context…" className="w-[240px] max-w-full h-10" /></div>,
          c: 'muted "(optional)" suffix · never a required *',
        },
        {
          a: "In a control row",
          b: <label htmlFor="l4" className="flex items-center gap-2 cursor-pointer"><Checkbox id="l4" className="h-4 w-4" /><span className="text-sm font-normal text-foreground select-none">I agree to the terms</span></label>,
          c: "font-normal · gap-2 · clickable (htmlFor toggles control)",
        },
        {
          a: "Component default",
          b: <Label className="text-sm font-medium">Section heading</Label>,
          c: "text-sm font-medium leading-none (cva base)",
        },
        {
          a: "Disabled (peer)",
          b: <div className="space-y-1.5"><Label htmlFor="l5" className="text-xs font-medium text-foreground/75 peer-disabled:opacity-70">Country</Label><Input id="l5" disabled defaultValue="Norway" className="peer w-[240px] max-w-full h-10" /></div>,
          c: "peer-disabled:opacity-70 (dims with its control)",
        },
      ]} />

      <p style={{ ...note, marginTop: 16 }}>
        Base cva: <code>text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70</code> · fields override size/weight/colour.
      </p>
      <Guidance k="label" />
    </div>
  ),
};
