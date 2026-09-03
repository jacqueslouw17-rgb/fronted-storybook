import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Plus, Send, Loader2 } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import "./tokens.css";
import "./typography.css";
import { PageHeader } from "./_docTable";
import { Guidance } from "./guidance";

/**
 * Components — Button.
 * The real button from the 6 interim First-Launch flows (verbatim ui/button):
 * outline is the workhorse, the blue→purple gradient is the single primary
 * action, ghost for tertiary. Size sm is the in-card default.
 */
const meta: Meta = { title: "Components/Button", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const wrap: React.CSSProperties = { fontFamily: "var(--ds-font-body)", color: "var(--ds-color-text)", maxWidth: 940, padding: 4 };

type Variant = NonNullable<ButtonProps["variant"]>;
const VARIANTS: { key: Variant; label: string; note: string }[] = [
  { key: "default", label: "Primary", note: "gradient · one per view" },
  { key: "outline", label: "Outline", note: "supporting action" },
  { key: "secondary", label: "Secondary", note: "muted fill" },
  { key: "ghost", label: "Ghost", note: "tertiary / toolbar" },
  { key: "link", label: "Link", note: "inline navigation" },
  { key: "destructive", label: "Destructive", note: "muted → danger on hover" },
];

const COLS = ["Small", "Default", "Large", "Icon", "Icon + text", "Disabled", "Loading"] as const;

const th: React.CSSProperties = { textAlign: "left", padding: "10px 16px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", background: "var(--ds-color-surface-sunken)", borderBottom: "1px solid var(--ds-color-border)" };
const td: React.CSSProperties = { padding: "14px 16px", borderBottom: "1px solid var(--ds-color-border)", verticalAlign: "middle" };
const nameCell: React.CSSProperties = { ...td, whiteSpace: "nowrap" };

function Cell({ variant, col }: { variant: Variant; col: (typeof COLS)[number] }) {
  if (col === "Small") return <Button variant={variant} size="sm">Button</Button>;
  if (col === "Default") return <Button variant={variant}>Button</Button>;
  if (col === "Large") return <Button variant={variant} size="lg">Button</Button>;
  if (col === "Icon") return <Button variant={variant} size="icon" aria-label="Add"><Plus /></Button>;
  if (col === "Icon + text") return <Button variant={variant} size="sm"><Send /> Send Form</Button>;
  if (col === "Loading") return <Button variant={variant} disabled><Loader2 className="mr-2 h-4 w-4 animate-spin" />Button</Button>;
  return <Button variant={variant} disabled>Button</Button>;
}

export const Buttons: Story = {
  name: "Button",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Components"
        status="Stable"
        title="Button"
        lead={<>
        The interactive control from the First-Launch flows. Outline for supporting actions,
        the blue→purple gradient for the single primary action, ghost for tertiary. Size <b>sm</b> in cards.
        </>}
      />

      <div style={{ border: "1px solid var(--ds-color-border)", borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 2px 0 rgba(0,0,0,0.03)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={th}>Variant</th>
              {COLS.map((c) => <th key={c} style={th}>{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {VARIANTS.map((v, i) => (
              <tr key={v.key} style={{ background: i % 2 ? "var(--ds-color-bg)" : "var(--ds-color-surface)" }}>
                <td style={nameCell}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{v.label}</div>
                  <div style={{ fontFamily: "var(--ds-font-mono)", fontSize: 11, color: "var(--ds-color-text-muted)" }}>{v.note}</div>
                </td>
                {COLS.map((c) => <td key={c} style={td}><Cell variant={v.key} col={c} /></td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ fontFamily: "var(--ds-font-mono)", fontSize: 11, color: "var(--ds-color-text-muted)", marginTop: 12 }}>
        sm 32px · default 36px · lg 40px · icon 36² · hover lifts + shadow · focus shows the ring · disabled 50% · loading = disabled + Loader2 spinner
      </p>

      <h3 style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", margin: "28px 0 12px", fontWeight: 600 }}>Heights (in-context overrides)</h3>
      <p style={{ fontFamily: "var(--ds-font-mono)", fontSize: 11, color: "var(--ds-color-text-muted)", marginBottom: 12 }}>
        The flows mostly use size="sm" + an explicit height. h-7 is the in-card workhorse (76×); h-6 tiny inline, h-8/h-9 toolbars, h-10 drawer.
      </p>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap" }}>
        {[["h-6", "text-xs"], ["h-7", "text-xs"], ["h-8", "text-xs"], ["h-9", ""], ["h-10", ""]].map(([h, t]) => (
          <div key={h} style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
            <Button variant="outline" size="sm" className={`${h} ${t} gap-1`.trim()}><Send /> Send</Button>
            <span style={{ fontFamily: "var(--ds-font-mono)", fontSize: 10, color: "var(--ds-color-text-muted)" }}>{h}</span>
          </div>
        ))}
      </div>
      <Guidance k="button" />
    </div>
  ),
};
