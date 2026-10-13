import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AdminDashboardShell as Shell } from "@/components/flows/admin-dashboard-shell";
import { wrap, eyebrow, note, PageHeader } from "./_docTable";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Admin Dashboard Shell (verbatim page frame from F1v61_FrontedAdminDashboard).
 */
const meta: Meta = { title: "Patterns/Admin Dashboard Shell", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const slot = (label: string, h: number) => (
  <div className="rounded-lg border border-dashed border-border flex items-center justify-center text-xs text-muted-foreground" style={{ height: h }}>{label}</div>
);

export const AdminDashboardShell: Story = {
  name: "Admin Dashboard Shell",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        status="Stable"
        title="Admin Dashboard Shell"
        lead={<>The page frame of the F1 admin dashboard: pinned topbar, the soft gradient background, and a centred content column that holds the header above the tracker. It has no content of its own; the flow pages fill its three slots.</>}
        meta="Verbatim layout chain from F1v61_FrontedAdminDashboard (tracker tab)"
      />

      <h3 style={eyebrow}>Slots</h3>
      <div style={{ border: "1px solid var(--ds-color-border)", borderRadius: 16, overflow: "hidden", height: 520, transform: "translateZ(0)" }}>
        <Shell topbar={<div className="h-16 border-b bg-card">{slot("topbar", 63)}</div>} header={slot("header", 96)}>
          {slot("tracker body", 240)}
        </Shell>
      </div>

      <p style={{ ...note, marginTop: 16 }}>Outer min-h-screen lg:h-screen flex-col · spacer h-16 · background from-primary/[0.03] via-secondary/[0.02] to-accent/[0.03] with two blur-3xl blobs · content max-w-[2376px] lg:px-16 xl:px-32 2xl:px-40 pt-28 pb-32 · body pt-6. Shown here inside a contained frame; in the flow it fills the viewport.</p>
    </div>
  ),
};
