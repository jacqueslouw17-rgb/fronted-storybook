import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader } from "./_docTable";
import "./tokens.css";
import "./typography.css";

/**
 * Product Flows — the 6 First-Launch flows on demofronted.live. Every component and
 * pattern in this Storybook is copied verbatim from these live builds.
 */
const meta: Meta = { title: "Product Flows", parameters: { layout: "fullscreen" } };
export default meta;
type Story = StoryObj;

const DEMO = "https://demofronted.live";
const FLOWS: { n: string; name: string; desc: string; url: string }[] = [
  { n: "F1", name: "Fronted Admin", desc: "The internal admin — worker pipeline, contracts & signing, payroll run and approvals.", url: `${DEMO}/flows/fronted-admin-dashboard-v6-1-clone` },
  { n: "F6", name: "Company Admin", desc: "The client company view — workers grid and the approvals queue.", url: `${DEMO}/flows/company-admin-dashboard-v4-1` },
  { n: "F4.1", name: "Employee Dashboard", desc: "Pay dashboard — payout hero, payslips, adjustments and approvals.", url: `${DEMO}/flows/candidate-dashboard-employee-v8-1` },
  { n: "F4.2", name: "Contractor Dashboard", desc: "Invoice dashboard — invoice hero, history, adjustments and withdrawals.", url: `${DEMO}/flows/candidate-dashboard-contractor-v8-1` },
  { n: "F2", name: "Worker Data Collection", desc: "Sequential sectioned data form the worker completes before payroll.", url: `${DEMO}/flows/candidate-data-collection-v2-1` },
  { n: "F3", name: "Worker Onboarding", desc: "Guided onboarding — one section at a time, unlocked as you go.", url: `${DEMO}/flows/worker-onboarding-v2-1` },
];

const page: React.CSSProperties = { fontFamily: "var(--ds-font-body)", color: "var(--ds-color-text)", padding: 40, maxWidth: 1040, margin: "0 auto" };
const mono: React.CSSProperties = { fontFamily: "var(--ds-font-mono)", fontSize: 12, color: "var(--ds-color-text-muted)" };
const card: React.CSSProperties = { position: "relative", display: "flex", flexDirection: "column", gap: 8, textDecoration: "none", color: "var(--ds-color-text)", background: "var(--ds-color-surface)", border: "1px solid var(--ds-color-border)", borderRadius: 16, padding: "20px 22px", minHeight: 150, overflow: "hidden", transition: "border-color .15s, transform .15s, box-shadow .15s" };

function FlowCard({ f }: { f: (typeof FLOWS)[number] }) {
  return (
    <a href={f.url} target="_blank" rel="noreferrer" style={card}
       onMouseEnter={(e) => { const el = e.currentTarget; el.style.transform = "translateY(-3px)"; el.style.boxShadow = "0 10px 26px -12px rgba(0,0,0,0.18)"; el.style.borderColor = "var(--ds-color-border-strong)"; }}
       onMouseLeave={(e) => { const el = e.currentTarget; el.style.transform = "none"; el.style.boxShadow = "none"; el.style.borderColor = "var(--ds-color-border)"; }}>
      <span aria-hidden style={{ position: "absolute", top: 4, right: 16, fontSize: 40, fontWeight: 800, lineHeight: 1, color: "var(--ds-color-border)", letterSpacing: "-0.03em", userSelect: "none" }}>{f.n}</span>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
        <span style={{ ...mono, fontWeight: 700, letterSpacing: ".08em" }}>{f.n}</span>
      </div>
      <div className="ds-h5" style={{ margin: 0, color: "var(--ds-color-heading)", position: "relative", zIndex: 1 }}>{f.name}</div>
      <div style={{ fontSize: 13, lineHeight: 1.55, color: "var(--ds-color-text-muted)", flex: 1, position: "relative", zIndex: 1 }}>{f.desc}</div>
      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ds-color-heading)", position: "relative", zIndex: 1 }}>Open live flow ↗</span>
    </a>
  );
}

export const Overview: Story = {
  name: "Product Flows",
  render: () => (
    <div style={page}>
      <PageHeader
        category="Fronted — First Launch"
        title="Product flows"
        lead={<>The 6 First-Launch flows, running on <b>demofronted.live</b>. Every component and pattern in this Storybook is copied verbatim from these live builds — they are the source of truth.</>}
      />
      <div style={{ height: 22 }} />

      <a href={DEMO} target="_blank" rel="noreferrer"
         style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", background: "var(--ds-color-text)", color: "var(--ds-color-surface)", fontSize: 14, fontWeight: 600, borderRadius: 9999, padding: "11px 20px", marginBottom: 30 }}>
        Open the demo ↗
      </a>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, alignItems: "stretch" }}>
        {FLOWS.map((f) => <FlowCard key={f.n} f={f} />)}
      </div>

      <p style={{ ...mono, marginTop: 24 }}>Links open demofronted.live in a new tab · scope = these 6 flows only</p>
    </div>
  ),
};
