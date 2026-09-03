import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import "./tokens.css";
import "./typography.css";
import { PageHeader } from "./_docTable";
import { Guidance } from "./guidance";

/**
 * Components — Tooltip (Radix, verbatim ui/tooltip).
 * The hover/focus hint. Content is text-xs; longer copy caps at max-w-[220px]; a
 * darker rich variant (bg-zinc-800) is used for the more explanatory tooltips.
 */
const meta: Meta = { title: "Components/Tooltip", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const wrap: React.CSSProperties = { fontFamily: "var(--ds-font-body)", color: "var(--ds-color-text)", maxWidth: 940, padding: 4 };
const eyebrow: React.CSSProperties = { fontSize: 12, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", margin: "28px 0 12px", fontWeight: 600 };
const th: React.CSSProperties = { textAlign: "left", padding: "10px 16px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", background: "var(--ds-color-surface-sunken)", borderBottom: "1px solid var(--ds-color-border)" };
const td: React.CSSProperties = { padding: "18px 16px", borderBottom: "1px solid var(--ds-color-border)", verticalAlign: "middle" };
const note: React.CSSProperties = { fontFamily: "var(--ds-font-mono)", fontSize: 11, color: "var(--ds-color-text-muted)" };

export const TooltipStory: Story = {
  name: "Tooltip",
  render: () => (
    <TooltipProvider delayDuration={0}>
      <div style={wrap}>
        <PageHeader
          category="Components"
          status="Stable"
          title="Tooltip"
          lead={<>
          The hover/focus hint. Content is <code>text-xs</code>; longer copy caps at <code>max-w-[220px]</code>.
          Tooltips below are forced open for reference.
          </>}
        />

        <h3 style={eyebrow}>Variants</h3>
        <div style={{ border: "1px solid var(--ds-color-border)", borderRadius: "var(--ds-radius-card)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr><th style={{ ...th, width: 150 }}>Variant</th><th style={th}>Example</th><th style={{ ...th, width: 280 }}>Classes</th></tr></thead>
            <tbody>
              <tr style={{ background: "var(--ds-color-surface)" }}>
                <td style={{ ...td, fontSize: 13, fontWeight: 600 }}>Default (short)</td>
                <td style={td}><Tooltip open><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><Info className="h-4 w-4 text-muted-foreground" /></Button></TooltipTrigger><TooltipContent className="text-xs">Gross monthly salary</TooltipContent></Tooltip></td>
                <td style={{ ...td, ...note }}>text-xs</td>
              </tr>
              <tr style={{ background: "var(--ds-color-bg)" }}>
                <td style={{ ...td, fontSize: 13, fontWeight: 600 }}>Capped width</td>
                <td style={td}><Tooltip open><TooltipTrigger asChild><Button variant="outline" size="sm" className="h-7 text-xs">Salary basis</Button></TooltipTrigger><TooltipContent className="text-xs max-w-[220px]">Amount before tax and statutory deductions, used to compute the net payout.</TooltipContent></Tooltip></td>
                <td style={{ ...td, ...note }}>text-xs max-w-[220px]</td>
              </tr>
              <tr style={{ background: "var(--ds-color-surface)" }}>
                <td style={{ ...td, fontSize: 13, fontWeight: 600 }}>Rich (dark)</td>
                <td style={td}><Tooltip open><TooltipTrigger asChild><Button variant="outline" size="sm" className="h-7 text-xs">EOR vs Contractor</Button></TooltipTrigger><TooltipContent className="text-xs max-w-[280px] bg-zinc-800 border-zinc-700 text-white">An EOR employs the worker on your behalf and handles local tax, benefits and compliance. A contractor invoices you directly.</TooltipContent></Tooltip></td>
                <td style={{ ...td, ...note }}>bg-zinc-800 border-zinc-700 text-white</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ ...note, marginTop: 12 }}>Base: rounded-md border bg-popover px-3 py-1.5 shadow-md · fade/zoom on open · flows override to text-xs.</p>
        <Guidance k="tooltip" />
      </div>
    </TooltipProvider>
  ),
};
