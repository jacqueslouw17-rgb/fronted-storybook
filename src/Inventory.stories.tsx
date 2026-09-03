import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader } from "./_docTable";
import "./tokens.css";
import "./typography.css";

/** Inventory — the components & patterns built for Fronted — First Launch, audited from the 6 flows. */
const meta: Meta = { title: "Inventory", parameters: { layout: "fullscreen" } };
export default meta;
type Story = StoryObj;

const page: React.CSSProperties = { fontFamily: "var(--ds-font-body)", color: "var(--ds-color-text)", padding: 40, maxWidth: 920, margin: "0 auto" };
const h2: React.CSSProperties = { fontSize: 20, fontWeight: 700, margin: "34px 0 10px" };
const th: React.CSSProperties = { textAlign: "left", padding: "9px 14px", fontSize: 11, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", background: "var(--ds-color-surface-sunken)", borderBottom: "1px solid var(--ds-color-border)" };
const td: React.CSSProperties = { padding: "9px 14px", borderBottom: "1px solid var(--ds-color-border)", fontSize: 13 };
const mono: React.CSSProperties = { fontFamily: "var(--ds-font-mono)", fontSize: 12, color: "var(--ds-color-text-muted)" };
const Done = () => <span style={{ color: "var(--accent-green-text, #047857)", fontWeight: 700 }}>done</span>;

const stat: React.CSSProperties = { flex: 1, minWidth: 130, border: "1px solid var(--ds-color-border)", borderRadius: 14, padding: "16px 18px", background: "var(--ds-color-surface)" };
const statN: React.CSSProperties = { fontSize: 30, fontWeight: 800, lineHeight: 1, color: "var(--ds-color-heading)" };
const statL: React.CSSProperties = { fontSize: 12, color: "var(--ds-color-text-muted)", marginTop: 6 };

const COMPONENTS: [string, number][] = [
  ["Button", 91], ["Badge", 62], ["Sheet (drawer)", 47], ["Label", 39],
  ["Input", 36], ["Card", 30], ["Alert Dialog", 30], ["Tooltip", 27],
  ["Collapsible", 24], ["Select", 21], ["Avatar", 21], ["Popover", 17],
  ["Dropdown Menu", 11], ["Checkbox", 11], ["Switch", 10], ["Segmented Toggle", 9],
  ["Tabs", 8], ["Separator", 8], ["Command (search)", 8], ["Calendar (date)", 6],
  ["Dialog", 5], ["Progress", 4], ["Skeleton", 3], ["Radio Group", 1],
  ["Table & List", 0],
];

// Patterns — the composed stories under Patterns/* in Storybook (built on the primitives).
const PATTERNS: [string, string][] = [
  ["Pay Breakdown", "collapsible earnings/deductions · pending & ready footer"],
  ["Signing Progress", "progress bar + step states (complete = struck-through)"],
  ["Contract Preview", "sidebar + doc viewer + highlighted variables"],
  ["Document Upload", "dropzone + file rows (done / uploading / error)"],
  ["Tag Input", "chips + counter + suggestions"],
  ["Attachments & Loading", "attachment chips + table skeletons"],
  ["Adjustment Request", "6-type picker panel → per-type form (F4.1 / F4.2)"],
  ["Login", "logged-out auth flow — sign in, reset password, check email, set new password"],
  ["Payroll Batch", "F1 payroll — batch selector, status lifecycle, white-card rows, batch types"],
  ["Worker Pipeline", "F1 workers kanban — stage columns, worker cards, stage-based action pairs"],
];

// Composite list/table views documented inside Components/Table & List.
const COMPOSITES: [string, string][] = [
  ["Payroll table", "F1 — row avatar + amount + Ready/Pending status + pagination"],
  ["Members table", "Settings › People — status badge + role pill + kebab"],
  ["Managers table", "client select + pill filters + toggle rows"],
  ["Approvals list", "F6 — pending / approved / rejected rows + inline ✓/✕"],
  ["Empty states", "pipeline “No workers yet” + approvals “Nothing to approve”"],
];

export const Page: Story = {
  name: "Inventory",
  render: () => (
    <div style={page}>
      <PageHeader
        category="Fronted — First Launch"
        title="Component & pattern inventory"
        lead="Every component and pattern in the system, audited from the 6 First-Launch flows and built verbatim from the live UI."
        meta="F1 Fronted · F6 Company · F4.1 Employee · F4.2 Contractor · F2 Worker Data · F3 Worker Onboarding"
      />
      <div style={{ height: 20 }} />

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        <div style={stat}><div style={statN}>{COMPONENTS.length}</div><div style={statL}>Components — all verbatim from the flows</div></div>
        <div style={stat}><div style={statN}>{PATTERNS.length}</div><div style={statL}>Patterns — composed on the primitives</div></div>
        <div style={stat}><div style={statN}>2</div><div style={statL}>Themes — First Launch (default) &amp; Fronted Brand</div></div>
        <div style={stat}><div style={statN}>12</div><div style={statL}>Design-strategy principles</div></div>
      </div>

      <h2 style={h2}>Components ({COMPONENTS.length})</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead><tr><th style={th}>Component</th><th style={th}>Uses across the flows</th><th style={{ ...th, width: 90 }}>Status</th></tr></thead>
        <tbody>
          {COMPONENTS.map(([n, u]) => (
            <tr key={n}><td style={{ ...td, fontWeight: 600 }}>{n}</td><td style={{ ...td, ...mono }}>{u || "—"}</td><td style={td}><Done /></td></tr>
          ))}
        </tbody>
      </table>

      <h2 style={h2}>Patterns ({PATTERNS.length})</h2>
      <p style={{ ...mono, marginBottom: 8 }}>Composed molecules under <b>Patterns/*</b> in Storybook.</p>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead><tr><th style={th}>Pattern</th><th style={th}>What it is</th><th style={{ ...th, width: 90 }}>Status</th></tr></thead>
        <tbody>
          {PATTERNS.map(([n, note]) => (
            <tr key={n}><td style={{ ...td, fontWeight: 600 }}>{n}</td><td style={{ ...td, ...mono }}>{note}</td><td style={td}><Done /></td></tr>
          ))}
        </tbody>
      </table>

      <h2 style={h2}>Composite views ({COMPOSITES.length})</h2>
      <p style={{ ...mono, marginBottom: 8 }}>Full list/table compositions documented inside <b>Components / Table &amp; List</b>.</p>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead><tr><th style={th}>View</th><th style={th}>Where / notes</th><th style={{ ...th, width: 90 }}>Status</th></tr></thead>
        <tbody>
          {COMPOSITES.map(([n, note]) => (
            <tr key={n}><td style={{ ...td, fontWeight: 600 }}>{n}</td><td style={{ ...td, ...mono }}>{note}</td><td style={td}><Done /></td></tr>
          ))}
        </tbody>
      </table>

      <p style={{ ...mono, marginTop: 22 }}>Foundations + 12 principles complete · every class verbatim from the live flows · scope = these 6 First-Launch flows only</p>
    </div>
  ),
};
