import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import "./tokens.css";
import "./typography.css";
import { PageHeader } from "./_docTable";
import { Guidance } from "./guidance";

/**
 * Components — Radio Group (Radix, verbatim ui/radio-group).
 * Single choice from a small set — verbatim from the worker onboarding "device
 * provided?" step. Label is font-normal and clickable; selected shows a filled dot.
 */
const meta: Meta = { title: "Components/Radio Group", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const wrap: React.CSSProperties = { fontFamily: "var(--ds-font-body)", color: "var(--ds-color-text)", maxWidth: 940, padding: 4 };
const eyebrow: React.CSSProperties = { fontSize: 12, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", margin: "28px 0 12px", fontWeight: 600 };
const th: React.CSSProperties = { textAlign: "left", padding: "10px 16px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", background: "var(--ds-color-surface-sunken)", borderBottom: "1px solid var(--ds-color-border)" };
const td: React.CSSProperties = { padding: "14px 16px", borderBottom: "1px solid var(--ds-color-border)", verticalAlign: "middle" };
const note: React.CSSProperties = { fontFamily: "var(--ds-font-mono)", fontSize: 11, color: "var(--ds-color-text-muted)" };

export const RadioGroupStory: Story = {
  name: "Radio Group",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Components"
        status="Stable"
        title="Radio Group"
        lead={<>
        Single choice from a small set. Item is <code>h-4 w-4 rounded-full border-primary</code>; the label is
        <code>font-normal</code> and clickable; selected shows a centered filled dot.
        </>}
      />

      <h3 style={eyebrow}>States</h3>
      <div style={{ border: "1px solid var(--ds-color-border)", borderRadius: "var(--ds-radius-card)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr><th style={{ ...th, width: 170 }}>State</th><th style={th}>Example</th><th style={{ ...th, width: 240 }}>Notes</th></tr></thead>
          <tbody>
            {[
              { s: "Selected", el: <RadioGroup defaultValue="a" className="flex items-center space-x-2"><RadioGroupItem value="a" id="s-a" /><Label htmlFor="s-a" className="font-normal">Yes, I received a company device</Label></RadioGroup>, n: "filled dot · border-primary" },
              { s: "Unselected", el: <RadioGroup className="flex items-center space-x-2"><RadioGroupItem value="b" id="s-b" /><Label htmlFor="s-b" className="font-normal">No, I'm using my personal device</Label></RadioGroup>, n: "empty ring" },
              { s: "Disabled", el: <RadioGroup className="flex items-center space-x-2"><RadioGroupItem value="c" id="s-c" disabled /><Label htmlFor="s-c" className="font-normal opacity-60">Not applicable</Label></RadioGroup>, n: "opacity-50 · not-allowed" },
            ].map((r, i) => (
              <tr key={r.s} style={{ background: i % 2 ? "var(--ds-color-bg)" : "var(--ds-color-surface)" }}>
                <td style={{ ...td, fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" }}>{r.s}</td>
                <td style={td}>{r.el}</td>
                <td style={{ ...td, ...note }}>{r.n}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={eyebrow}>In context (worker onboarding)</h3>
      <RadioGroup defaultValue="yes" className="space-y-2">
        <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="d-y" /><Label htmlFor="d-y" className="font-normal">Yes, I received a company device</Label></div>
        <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="d-n" /><Label htmlFor="d-n" className="font-normal">No, I'm using my personal device</Label></div>
      </RadioGroup>
      <p style={{ ...note, marginTop: 10 }}>row = flex items-center space-x-2 · item h-4 w-4 rounded-full border-primary · label font-normal</p>
      <Guidance k="radio" />
    </div>
  ),
};
