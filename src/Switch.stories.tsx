import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import "./tokens.css";
import "./typography.css";
import { PageHeader } from "./_docTable";
import { Guidance } from "./guidance";

/**
 * Components — Switch (Radix, verbatim ui/switch).
 * Instant on/off toggle (e.g. "Enable overrides"). Used bare in the flows —
 * `<Switch checked onCheckedChange />` — usually paired with a label in a row.
 * On = bg-primary, off = bg-input; the thumb slides.
 */
const meta: Meta = { title: "Components/Switch", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const wrap: React.CSSProperties = { fontFamily: "var(--ds-font-body)", color: "var(--ds-color-text)", maxWidth: 940, padding: 4 };
const eyebrow: React.CSSProperties = { fontSize: 12, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", margin: "28px 0 12px", fontWeight: 600 };
const note: React.CSSProperties = { fontFamily: "var(--ds-font-mono)", fontSize: 11, color: "var(--ds-color-text-muted)" };
const th: React.CSSProperties = { textAlign: "left", padding: "10px 16px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", background: "var(--ds-color-surface-sunken)", borderBottom: "1px solid var(--ds-color-border)" };
const td: React.CSSProperties = { padding: "14px 16px", borderBottom: "1px solid var(--ds-color-border)", verticalAlign: "middle" };

function Row({ a, b, c }: { a: string; b: React.ReactNode; c: string }) {
  return (<tr><td style={{ ...td, fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" }}>{a}</td><td style={td}>{b}</td><td style={{ ...td, ...note }}>{c}</td></tr>);
}

export const SwitchStory: Story = {
  name: "Switch",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Components"
        status="Stable"
        title="Switch"
        lead={<>
        Instant on/off toggle — applies immediately, no save step. In the flows it toggles things like
        "Enable overrides". Pair with a label in a justified row.
        </>}
      />

      <h3 style={eyebrow}>States</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid var(--ds-color-border)", borderRadius: "var(--ds-radius-card)", overflow: "hidden" }}>
        <thead><tr><th style={{ ...th, width: 150 }}>State</th><th style={th}>Example</th><th style={{ ...th, width: 280 }}>Notes</th></tr></thead>
        <tbody>
          <Row a="Off" b={<Switch />} c="bg-input, thumb left" />
          <Row a="On" b={<Switch defaultChecked />} c="bg-primary, thumb right" />
          <Row a="Off · disabled" b={<Switch disabled />} c="opacity-50 · not-allowed" />
          <Row a="On · disabled" b={<Switch defaultChecked disabled />} c="opacity-50 · not-allowed" />
        </tbody>
      </table>

      <h3 style={eyebrow}>In a settings row</h3>
      <div className="flex items-center justify-between w-[360px] p-3 rounded-lg border border-border/40 bg-card">
        <div className="flex flex-col">
          <Label htmlFor="sw" className="text-xs font-medium text-foreground/75">Enable overrides</Label>
          <span className="text-xs text-muted-foreground">Allow per-worker salary adjustments</span>
        </div>
        <Switch id="sw" defaultChecked />
      </div>

      <p style={{ ...note, marginTop: 16 }}>Base: h-6 w-11 rounded-full · data-[state=checked]:bg-primary data-[state=unchecked]:bg-input · thumb h-5 w-5 translate.</p>
      <Guidance k="switch" />
    </div>
  ),
};
