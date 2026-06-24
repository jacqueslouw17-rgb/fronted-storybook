import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import "./tokens.css";
import "./typography.css";

/**
 * Components — Buttons.
 * Consumes the SEMANTIC token layer only (--ds-*): action colours,
 * radius roles, type scale and the 4px spacing grid.
 */
const meta: Meta = { title: "Components/Buttons", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const wrap: React.CSSProperties = { fontFamily: "var(--ds-font-body)", color: "var(--ds-color-text)", maxWidth: 1000 };
const mono: React.CSSProperties = { fontFamily: "var(--ds-font-mono)", fontSize: "var(--p-text-2xs)", color: "var(--ds-color-text-muted)" };

export const Overview: Story = {
  name: "Buttons",
  render: () => {
    const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];
    const sizeLabel: Record<string, string> = { sm: "S · 32", md: "M · 40", lg: "L · 52" };
    const rows: Array<{ label: string; v: "primary" | "secondary"; shape: "pill" | "rounded" }> = [
      { label: "Primary · pill", v: "primary", shape: "pill" },
      { label: "Primary · rounded", v: "primary", shape: "rounded" },
      { label: "Secondary · pill", v: "secondary", shape: "pill" },
      { label: "Secondary · rounded", v: "secondary", shape: "rounded" },
    ];
    const th: React.CSSProperties = { ...mono, textAlign: "center", paddingBottom: "var(--p-space-1)" };
    const cell: React.CSSProperties = { display: "flex", justifyContent: "center", padding: "var(--p-space-3) var(--p-space-2)" };
    const rowLabel: React.CSSProperties = { fontSize: "var(--p-text-sm)", fontWeight: "var(--p-weight-semibold)", color: "var(--ds-color-text-strong)", display: "flex", alignItems: "center" };

    return (
      <div style={wrap}>
        <h2 className="ds-h2" style={{ marginBottom: "var(--p-space-1)" }}>Buttons</h2>
        <p className="ds-body" style={{ marginBottom: "var(--p-space-5)" }}>
          Variant × shape × size. Shapes: <code>pill</code> (<code>--ds-radius-button</code>) and <code>rounded</code> (<code>--p-radius-lg</code>, 12px). Sizes S / M / L = 32 / 40 / 52px.
        </p>

        <div style={{ border: "1px solid var(--ds-color-border)", borderRadius: "var(--ds-radius-card)", overflow: "hidden", maxWidth: 680 }}>
          {/* header */}
          <div style={{ display: "grid", gridTemplateColumns: "150px repeat(3, 1fr)", alignItems: "end", padding: "var(--p-space-3) var(--p-space-4) 0", background: "var(--ds-color-surface-sunken)" }}>
            <div style={{ ...mono, paddingBottom: "var(--p-space-1)" }}>variant · shape</div>
            {sizes.map((s) => <div key={s} style={th}>{sizeLabel[s]}</div>)}
          </div>
          {/* rows */}
          {rows.map((r, i) => (
            <div key={r.label}
                 style={{ display: "grid", gridTemplateColumns: "150px repeat(3, 1fr)", alignItems: "center",
                          padding: "0 var(--p-space-4)", borderTop: "1px solid var(--ds-color-border)",
                          background: i % 2 ? "var(--ds-color-bg)" : "var(--ds-color-surface)" }}>
              <div style={rowLabel}>{r.label}</div>
              {sizes.map((s) => (
                <div key={s} style={cell}><Button variant={r.v} size={s} shape={r.shape}>Button</Button></div>
              ))}
            </div>
          ))}
          {/* states — same card, divided */}
          <div style={{ display: "flex", gap: "var(--p-space-3)", alignItems: "center", flexWrap: "wrap", padding: "var(--p-space-3) var(--p-space-4)", borderTop: "1px solid var(--ds-color-border)", background: "var(--ds-color-surface-sunken)" }}>
            <span style={{ fontSize: "var(--p-text-sm)", fontWeight: "var(--p-weight-semibold)" }}>States</span>
            <Button variant="primary">Default</Button>
            <Button variant="primary" disabled>Disabled</Button>
            <span style={mono}>hover lifts + darkens · active presses · focus shows ring · disabled 50%</span>
          </div>
        </div>
      </div>
    );
  },
};
