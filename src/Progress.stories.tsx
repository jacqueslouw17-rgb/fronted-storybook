import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { cn } from "@/lib/utils";
import "./tokens.css";
import "./typography.css";
import { PageHeader } from "./_docTable";
import { Guidance } from "./guidance";

/**
 * Components — Progress.
 * The flows use a custom labelled bar (not the Radix <Progress>): a h-1.5 bg-muted/40
 * track whose fill is bg-primary in progress, bg-accent-green-text when complete.
 */
const meta: Meta = { title: "Components/Progress", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const wrap: React.CSSProperties = { fontFamily: "var(--ds-font-body)", color: "var(--ds-color-text)", maxWidth: 940, padding: 4 };
const eyebrow: React.CSSProperties = { fontSize: 12, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", margin: "28px 0 12px", fontWeight: 600 };
const th: React.CSSProperties = { textAlign: "left", padding: "10px 16px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", background: "var(--ds-color-surface-sunken)", borderBottom: "1px solid var(--ds-color-border)" };
const td: React.CSSProperties = { padding: "16px", borderBottom: "1px solid var(--ds-color-border)", verticalAlign: "middle" };
const note: React.CSSProperties = { fontFamily: "var(--ds-font-mono)", fontSize: 11, color: "var(--ds-color-text-muted)" };

function Bar({ value, complete }: { value: number; complete?: boolean }) {
  return (
    <div className="h-1.5 bg-muted/40 rounded-full overflow-hidden w-[220px] max-w-full">
      <div className={cn("h-full rounded-full transition-all duration-500", complete ? "bg-accent-green-text" : "bg-primary")} style={{ width: `${value}%` }} />
    </div>
  );
}

function Table({ head, rows }: { head: [string, string, string]; rows: Array<{ a: string; b: React.ReactNode; c: string }> }) {
  return (
    <div style={{ border: "1px solid var(--ds-color-border)", borderRadius: "var(--ds-radius-card)", overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead><tr>{head.map((h, i) => <th key={i} style={{ ...th, width: i === 0 ? 150 : i === 2 ? 300 : "auto" }}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => (
          <tr key={r.a} style={{ background: i % 2 ? "var(--ds-color-bg)" : "var(--ds-color-surface)" }}>
            <td style={{ ...td, fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" }}>{r.a}</td>
            <td style={td}>{r.b}</td>
            <td style={{ ...td, ...note }}>{r.c}</td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}

export const ProgressStory: Story = {
  name: "Progress",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Components"
        status="Stable"
        title="Progress"
        lead={<>
        A custom labelled bar — thin <code>h-1.5 bg-muted/40</code> track, fill <code>bg-primary</code> in progress →
        <code>bg-accent-green-text</code> complete. Verbatim from F1v6_PayrollVerificationDrawer.
        </>}
      />

      <h3 style={eyebrow}>States</h3>
      <Table head={["State", "Bar", "Notes"]} rows={[
        { a: "Empty", b: <Bar value={0} />, c: "0% · track only" },
        { a: "In progress", b: <Bar value={58} />, c: "bg-primary (blue) fill" },
        { a: "Full", b: <Bar value={100} />, c: "100% · bg-primary (blue) — default full" },
        { a: "Complete (verified)", b: <Bar value={100} complete />, c: "bg-accent-green-text (green) — verification only" },
      ]} />

      <h3 style={eyebrow}>With label (verification / onboarding)</h3>
      <div className="w-[300px] max-w-full">
        <div className="flex items-center justify-between mb-1.5"><span className="text-xs text-muted-foreground">Verification progress</span><span className="text-xs font-medium text-foreground tabular-nums">7/12 verified</span></div>
        <Bar value={58} />
      </div>
      <p style={{ ...note, marginTop: 10 }}>label row text-xs · track h-1.5 bg-muted/40 rounded-full · transition-all duration-500. (Radix ui/progress exists but the flows don't use it.)</p>
      <Guidance k="progress" />
    </div>
  ),
};
