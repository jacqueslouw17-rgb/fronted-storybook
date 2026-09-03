import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import "./tokens.css";
import "./typography.css";
import { PageHeader } from "./_docTable";
import { Guidance } from "./guidance";

/**
 * Components — Badge.
 * The real ui/badge from the 6 interim flows (57 distinct usages). A full-radius
 * pill used as a status / role / marker chip. Every className below is verbatim.
 * Canonical status colour = the Soft Accent system (light fill + subtle outline +
 * dark tinted text). Static — no hover.
 */
const meta: Meta = { title: "Components/Badge", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const wrap: React.CSSProperties = { fontFamily: "var(--ds-font-body)", color: "var(--ds-color-text)", maxWidth: 960, padding: 4 };
const eyebrow: React.CSSProperties = { fontSize: 12, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", margin: "28px 0 10px", fontWeight: 600 };
const th: React.CSSProperties = { textAlign: "left", padding: "10px 16px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", background: "var(--ds-color-surface-sunken)", borderBottom: "1px solid var(--ds-color-border)" };
const td: React.CSSProperties = { padding: "12px 16px", borderBottom: "1px solid var(--ds-color-border)", verticalAlign: "middle" };
const note: React.CSSProperties = { fontFamily: "var(--ds-font-mono)", fontSize: 11, color: "var(--ds-color-text-muted)" };
const cluster: React.CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" };

function Table({ head, rows, w0 = 150 }: { head: string[]; rows: Array<[React.ReactNode, React.ReactNode, React.ReactNode]>; w0?: number }) {
  return (
    <div style={{ border: "1px solid var(--ds-color-border)", borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 2px 0 rgba(0,0,0,0.03)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead><tr>{head.map((h, i) => <th key={i} style={{ ...th, width: i === 0 ? w0 : i === head.length - 1 ? 300 : "auto" }}>{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ background: i % 2 ? "var(--ds-color-bg)" : "var(--ds-color-surface)" }}>
              <td style={{ ...td, fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" }}>{r[0]}</td>
              <td style={td}>{r[1]}</td>
              <td style={{ ...td, ...note }}>{r[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const compact = "text-[10px] px-1.5 py-0 h-4 font-normal";

const FAMILIES = [
  { label: "Green", cls: "bg-accent-green-fill/20 text-accent-green-text border-accent-green-outline/30", use: "active · approved · paid" },
  { label: "Yellow", cls: "bg-accent-yellow-fill/20 text-accent-yellow-text border-accent-yellow-outline/30", use: "pending · awaiting" },
  { label: "Purple", cls: "bg-accent-purple-fill/20 text-accent-purple-text border-accent-purple-outline/30", use: "custom role · special" },
  { label: "Info", cls: "bg-primary/10 text-emphasis border-primary/20", use: "info · counts · queued" },
  { label: "Danger", cls: "bg-destructive/10 text-destructive border-destructive/20", use: "rejected · failed" },
  { label: "Neutral", cls: "text-muted-foreground border-border/60", use: "draft · inactive" },
];

export const Badges: Story = {
  name: "Badge",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Components"
        status="Stable"
        title="Badge"
        lead={<>
        Full-radius status / role / marker chip — 57 distinct usages across the flows. Canonical status colour
        is the Soft Accent system. Static — no hover. All classes verbatim from the source.
        </>}
      />

      <h3 style={eyebrow}>Base variants (cva prop)</h3>
      <Table head={["variant", "Example", "cva classes"]} rows={[
        ["default", <Badge>Label</Badge>, "bg-foreground/8 text-foreground/70"],
        ["secondary", <Badge variant="secondary">Label</Badge>, "bg-muted text-muted-foreground"],
        ["outline", <Badge variant="outline">Label</Badge>, "text-foreground border-border"],
        ["destructive", <Badge variant="destructive">Label</Badge>, "bg-destructive/10 text-destructive"],
        ["primary", <Badge variant="primary">Label</Badge>, "bg-primary/10 text-emphasis"],
        ["accent", <Badge variant="accent">Label</Badge>, "bg-accent/10 text-accent"],
      ]} />

      <h3 style={eyebrow}>Sizes (real overrides)</h3>
      <Table head={["Size", "Example", "classes"]} rows={[
        ["Default", <Badge variant="outline">Label</Badge>, "text-xs px-2.5 py-0.5 (cva base)"],
        ["Small", <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 font-normal">Label</Badge>, "text-[10px] px-1.5 py-0 h-4"],
        ["Micro", <Badge variant="outline" className="text-[9px] px-1 py-0 h-3.5">Label</Badge>, "text-[9px] px-1 py-0 h-3.5"],
        ["Count (circle)", <Badge variant="outline" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">3</Badge>, "h-5 w-5 rounded-full p-0 (column counts)"],
      ]} />

      <h3 style={eyebrow}>Status colours (Soft Accent)</h3>
      <div style={{ border: "1px solid var(--ds-color-border)", borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 2px 0 rgba(0,0,0,0.03)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr><th style={{ ...th, width: 140 }}>Colour</th><th style={th}>Default</th><th style={th}>Compact</th><th style={{ ...th, width: 220 }}>Typical use</th></tr></thead>
          <tbody>
            {FAMILIES.map((f, i) => (
              <tr key={f.label} style={{ background: i % 2 ? "var(--ds-color-bg)" : "var(--ds-color-surface)" }}>
                <td style={{ ...td, fontSize: 13, fontWeight: 600 }}>{f.label}</td>
                <td style={td}><Badge className={f.cls}>Label</Badge></td>
                <td style={td}><Badge className={cn(compact, f.cls)}>Label</Badge></td>
                <td style={{ ...td, ...note }}>{f.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={eyebrow}>Role &amp; markers</h3>
      <Table head={["Marker", "Example", "classes"]} rows={[
        ["Manager", <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-[14px] flex-shrink-0 pointer-events-none bg-primary/10 text-emphasis border-primary/20">Manager</Badge>, "bg-primary/10 text-emphasis border-primary/20"],
        ["Optional", <Badge variant="secondary" className="text-[9px] px-1.5 py-0 h-4 font-normal">Optional</Badge>, "secondary · the only field marker we show (10×)"],
        ["Required (legacy)", <Badge variant="outline" className="text-[9px] px-1 py-0 h-3.5 border-amber-500/30 text-amber-600 shrink-0 pointer-events-none">Required</Badge>, "amber · legacy — replaced by Optional-only principle"],
      ]} />

      <h3 style={eyebrow}>With icon / dot (gap-1.5)</h3>
      <div style={cluster}>
        <Badge variant="outline" className="text-xs gap-1.5 bg-accent-green-fill/20 text-accent-green-text border-accent-green-outline/30">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-green-text inline-block" /> Active
        </Badge>
        <Badge variant="outline" className="text-xs gap-1.5 bg-accent-purple-fill/20 text-accent-purple-text border-accent-purple-outline/30">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-purple-text inline-block" /> Custom
        </Badge>
      </div>

      <p style={{ ...note, marginTop: 14 }}>pill radius · fill/20 · outline/30 · dark tinted text · sizes h-3.5 / h-4 / default · count = h-5 w-5 circle</p>
      <Guidance k="badge" />
    </div>
  ),
};
