import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import "./tokens.css";
import "./typography.css";
import { PageHeader } from "./_docTable";
import { Guidance } from "./guidance";

/**
 * Components — Tabs (Radix, verbatim ui/tabs).
 * Section switcher. TabsList is h-8 bg-muted/30 p-0.5 (scrollable on mobile). Two
 * active styles: neutral (bg-background) and primary-highlighted (bg-primary/[0.08]).
 */
const meta: Meta = { title: "Components/Tabs", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const wrap: React.CSSProperties = { fontFamily: "var(--ds-font-body)", color: "var(--ds-color-text)", maxWidth: 940, padding: 4 };
const th: React.CSSProperties = { textAlign: "left", padding: "10px 16px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", background: "var(--ds-color-surface-sunken)", borderBottom: "1px solid var(--ds-color-border)" };
const td: React.CSSProperties = { padding: "18px 16px", borderBottom: "1px solid var(--ds-color-border)", verticalAlign: "top" };
const note: React.CSSProperties = { fontFamily: "var(--ds-font-mono)", fontSize: 11, color: "var(--ds-color-text-muted)" };

const neutral = "text-xs h-7 px-3 data-[state=active]:bg-background";
const primary = "text-xs h-7 px-3 flex-1 sm:flex-none whitespace-nowrap hover:text-foreground data-[state=active]:bg-primary/[0.08] data-[state=active]:text-emphasis data-[state=active]:border data-[state=active]:border-primary/30 data-[state=active]:shadow-none";

export const TabsStory: Story = {
  name: "Tabs",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Components"
        status="Stable"
        title="Tabs"
        lead={<>
        Section switcher. A muted track (<code>h-8 bg-muted/30 p-0.5</code>) holds pill triggers; the active one lifts.
        </>}
      />

      <div style={{ border: "1px solid var(--ds-color-border)", borderRadius: "var(--ds-radius-card)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr><th style={{ ...th, width: 190 }}>Variant</th><th style={th}>Example</th><th style={{ ...th, width: 250 }}>Active style</th></tr></thead>
          <tbody>
            <tr style={{ background: "var(--ds-color-surface)" }}>
              <td style={{ ...td, fontSize: 13, fontWeight: 600 }}>Neutral</td>
              <td style={td}>
                <Tabs defaultValue="overview"><TabsList className="h-8 bg-muted/30 p-0.5 w-auto justify-start"><TabsTrigger value="overview" className={neutral}>Overview</TabsTrigger><TabsTrigger value="payout" className={neutral}>Payout</TabsTrigger><TabsTrigger value="subs" className={neutral}>Submissions</TabsTrigger></TabsList><TabsContent value="overview" className="mt-0 pt-2 text-sm text-muted-foreground">Overview panel.</TabsContent><TabsContent value="payout" className="mt-0 pt-2 text-sm text-muted-foreground">Payout.</TabsContent><TabsContent value="subs" className="mt-0 pt-2 text-sm text-muted-foreground">Submissions.</TabsContent></Tabs>
              </td>
              <td style={{ ...td, ...note }}>data-[state=active]:bg-background (white pill)</td>
            </tr>
            <tr style={{ background: "var(--ds-color-bg)" }}>
              <td style={{ ...td, fontSize: 13, fontWeight: 600 }}>Primary-highlighted</td>
              <td style={td}>
                <Tabs defaultValue="all"><TabsList className="h-8 bg-muted/30 p-0.5 w-auto justify-start"><TabsTrigger value="all" className={primary}>All workers</TabsTrigger><TabsTrigger value="eor" className={primary}>EOR</TabsTrigger><TabsTrigger value="contractor" className={primary}>Contractors</TabsTrigger></TabsList><TabsContent value="all" className="mt-0 pt-2 text-sm text-muted-foreground">All.</TabsContent><TabsContent value="eor" className="mt-0 pt-2 text-sm text-muted-foreground">EOR.</TabsContent><TabsContent value="contractor" className="mt-0 pt-2 text-sm text-muted-foreground">Contractors.</TabsContent></Tabs>
              </td>
              <td style={{ ...td, ...note }}>data-[state=active]:bg-primary/[0.08] text-emphasis border-primary/30</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p style={{ ...note, marginTop: 12 }}>List: h-8 bg-muted/30 p-0.5 · triggers text-xs h-7 px-3 · mobile: overflow-x-auto scrollbar-hide, flex-1 to fill.</p>
      <Guidance k="tabs" />
    </div>
  ),
};
