import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "@/components/ui/separator";
import "./tokens.css";
import "./typography.css";
import { PageHeader } from "./_docTable";
import { Guidance } from "./guidance";

/**
 * Components — Separator (Radix, verbatim ui/separator).
 * The thin divider. Used bare — <Separator /> — horizontal by default (1px bg-border),
 * vertical for inline separation.
 */
const meta: Meta = { title: "Components/Separator", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const wrap: React.CSSProperties = { fontFamily: "var(--ds-font-body)", color: "var(--ds-color-text)", maxWidth: 940, padding: 4 };
const eyebrow: React.CSSProperties = { fontSize: 12, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", margin: "28px 0 12px", fontWeight: 600 };
const th: React.CSSProperties = { textAlign: "left", padding: "10px 16px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", background: "var(--ds-color-surface-sunken)", borderBottom: "1px solid var(--ds-color-border)" };
const td: React.CSSProperties = { padding: "18px 16px", borderBottom: "1px solid var(--ds-color-border)", verticalAlign: "middle" };
const note: React.CSSProperties = { fontFamily: "var(--ds-font-mono)", fontSize: 11, color: "var(--ds-color-text-muted)" };

export const SeparatorStory: Story = {
  name: "Separator",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Components"
        status="Stable"
        title="Separator"
        lead={<>
        The thin divider. Horizontal between stacked sections; vertical between inline items. 1px, bg-border.
        </>}
      />

      <h3 style={eyebrow}>Orientations</h3>
      <div style={{ border: "1px solid var(--ds-color-border)", borderRadius: "var(--ds-radius-card)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr><th style={{ ...th, width: 150 }}>Orientation</th><th style={th}>Example</th><th style={{ ...th, width: 260 }}>Classes</th></tr></thead>
          <tbody>
            <tr style={{ background: "var(--ds-color-surface)" }}>
              <td style={{ ...td, fontSize: 13, fontWeight: 600 }}>Horizontal</td>
              <td style={td}><div className="w-[300px]"><div className="text-sm font-semibold">Payment details</div><Separator className="my-2" /><div className="text-xs text-muted-foreground">Bank transfer · monthly</div></div></td>
              <td style={{ ...td, ...note }}>h-[1px] w-full bg-border (default)</td>
            </tr>
            <tr style={{ background: "var(--ds-color-bg)" }}>
              <td style={{ ...td, fontSize: 13, fontWeight: 600 }}>Vertical</td>
              <td style={td}><div className="flex items-center gap-3 text-xs text-muted-foreground h-5"><span>Norway</span><Separator orientation="vertical" /><span>EOR</span><Separator orientation="vertical" /><span>Full-time</span></div></td>
              <td style={{ ...td, ...note }}>orientation="vertical" · h-full w-[1px]</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Guidance k="separator" />
    </div>
  ),
};
