import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import "./tokens.css";
import "./typography.css";
import { PageHeader } from "./_docTable";
import { Guidance } from "./guidance";

/**
 * Components — Checkbox (Radix). h-4 w-4 · rounded-sm · border-primary · shadow-sm.
 * Checked / indeterminate fill with primary; focus shows a 1px ring; disabled 50%.
 * The box has no hover — hover lives on the selectable row.
 */
const meta: Meta = { title: "Components/Checkbox", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const wrap: React.CSSProperties = { fontFamily: "var(--ds-font-body)", color: "var(--ds-color-text)", maxWidth: 940, padding: 4 };
const eyebrow: React.CSSProperties = { fontSize: 12, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", margin: "28px 0 12px", fontWeight: 600 };
const th: React.CSSProperties = { textAlign: "left", padding: "10px 16px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", background: "var(--ds-color-surface-sunken)", borderBottom: "1px solid var(--ds-color-border)" };
const td: React.CSSProperties = { padding: "12px 16px", borderBottom: "1px solid var(--ds-color-border)", verticalAlign: "middle" };
const note: React.CSSProperties = { fontFamily: "var(--ds-font-mono)", fontSize: 11, color: "var(--ds-color-text-muted)" };

const labelCls = "text-sm text-foreground leading-snug select-none";

/** checkbox + label at the flows' spacing (gap-2). */
function Item({ id, label, ...rest }: { id: string; label: string } & React.ComponentProps<typeof Checkbox>) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id={id} {...rest} />
      <label htmlFor={id} className={labelCls}>{label}</label>
    </div>
  );
}

const ROWS: Array<{ s: string; el: React.ReactNode; n: string }> = [
  { s: "Unchecked", el: <Item id="c1" label="Email me payroll reminders" />, n: "primary border · empty" },
  { s: "Checked", el: <Item id="c2" label="Email me payroll reminders" defaultChecked />, n: "bg-primary · white check" },
  { s: "Indeterminate", el: <Item id="c3" label="Select all" checked="indeterminate" />, n: "bg-primary · minus" },
  { s: "Focus", el: <div className="flex items-center gap-2"><Checkbox id="c4" className="ring-1 ring-ring" /><label htmlFor="c4" className={labelCls}>Keyboard focus</label></div>, n: "1px focus ring" },
  { s: "Disabled", el: <Item id="c5" label="Locked by admin" disabled />, n: "opacity 50 · not-allowed" },
  { s: "Disabled + checked", el: <Item id="c6" label="Required by policy" disabled defaultChecked />, n: "non-editable, on" },
];

export const CheckboxStory: Story = {
  name: "Checkbox",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Components"
        status="Stable"
        title="Checkbox"
        lead={<>
        Radix checkbox — 16px, 4px radius, primary border. Checked / indeterminate fill with the primary
        colour; the label is text-sm at gap-2.
        </>}
      />

      <h3 style={eyebrow}>States</h3>
      <div style={{ border: "1px solid var(--ds-color-border)", borderRadius: "var(--ds-radius-card)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr><th style={{ ...th, width: 170 }}>State</th><th style={th}>Example</th><th style={{ ...th, width: 220 }}>Notes</th></tr></thead>
          <tbody>
            {ROWS.map((r, i) => (
              <tr key={r.s} style={{ background: i % 2 ? "var(--ds-color-bg)" : "var(--ds-color-surface)" }}>
                <td style={{ ...td, fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" }}>{r.s}</td>
                <td style={td}>{r.el}</td>
                <td style={{ ...td, ...note }}>{r.n}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={eyebrow}>Variants (flow overrides)</h3>
      <div style={{ border: "1px solid var(--ds-color-border)", borderRadius: "var(--ds-radius-card)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr><th style={{ ...th, width: 170 }}>Variant</th><th style={th}>Example</th><th style={{ ...th, width: 300 }}>Classes</th></tr></thead>
          <tbody>
            <tr style={{ background: "var(--ds-color-surface)" }}>
              <td style={{ ...td, fontSize: 13, fontWeight: 600 }}>Default</td>
              <td style={td}><Checkbox defaultChecked /></td>
              <td style={{ ...td, ...note }}>component cva · rounded-sm border-primary (most common)</td>
            </tr>
            <tr style={{ background: "var(--ds-color-bg)" }}>
              <td style={{ ...td, fontSize: 13, fontWeight: 600 }}>Softer (select-all)</td>
              <td style={td}><Checkbox defaultChecked className="h-4 w-4 shrink-0 rounded-[4px] border-border [&_svg]:h-3 [&_svg]:w-3" /></td>
              <td style={{ ...td, ...note }}>rounded-[4px] border-border [&_svg]:h-3 (batch header)</td>
            </tr>
            <tr style={{ background: "var(--ds-color-surface)" }}>
              <td style={{ ...td, fontSize: 13, fontWeight: 600 }}>Top-aligned</td>
              <td style={td}><div className="flex gap-2"><Checkbox defaultChecked className="mt-0.5 h-4 w-4" /><span className="text-sm text-foreground leading-snug w-[180px] max-w-full">A longer label that wraps onto a second line</span></div></td>
              <td style={{ ...td, ...note }}>mt-0.5 · aligns box to the first line</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 style={eyebrow}>In a selectable row (hover)</h3>
      <div className="max-w-[360px] rounded-[var(--ds-radius-card)] border border-border/40 overflow-hidden">
        {["Anika Lindqvist", "Yuki Tanaka", "Marcus Chen"].map((n, i) => (
          <label key={n} htmlFor={`row-${i}`} className={cn("flex items-center gap-2.5 px-3 py-2.5 cursor-pointer transition-colors hover:bg-muted/50", i > 0 && "border-t border-border/40")}>
            <Checkbox id={`row-${i}`} defaultChecked={i === 0} />
            <span className={labelCls}>{n}</span>
          </label>
        ))}
      </div>
      <p style={{ ...note, marginTop: 10 }}>hover tints the whole row (hover:bg-muted/50) · the box itself has no hover state</p>
      <Guidance k="checkbox" />
    </div>
  ),
};
