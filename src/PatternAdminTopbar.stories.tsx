import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AdminTopbar as Topbar } from "@/components/flows/admin-topbar";
import { wrap, eyebrow, note, PageHeader } from "./_docTable";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Admin Topbar (verbatim from components/dashboard/Topbar.tsx, F1 v6.1 props).
 * Back arrow, wordmark, company switcher trigger and the muted-initials profile menu.
 */
const meta: Meta = { title: "Patterns/Admin Topbar", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const frame: React.CSSProperties = { border: "1px solid var(--ds-color-border)", borderRadius: 16, overflow: "hidden" };

export const AdminTopbar: Story = {
  name: "Admin Topbar",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        status="Stable"
        title="Admin Topbar"
        lead={<>The bar across every F1 admin screen: a back arrow to the flow list, the Fronted wordmark, the company switcher, and the profile menu behind muted initials. Composed from Button, Avatar and Dropdown Menu.</>}
        meta="Verbatim from components/dashboard/Topbar.tsx · F1 v6.1 props (mutedAvatar, forceFixed, profileMenuLabel Settings)"
      />

      <h3 style={eyebrow}>Default</h3>
      <div style={frame}><Topbar /></div>

      <h3 style={eyebrow}>Profile menu open</h3>
      <div style={{ ...frame, height: 200 }}><Topbar menuOpen /></div>

      <p style={{ ...note, marginTop: 16 }}>header h-14 sm:h-16 border-b bg-card px-3 sm:px-6 · back Button ghost icon h-10 w-10 · wordmark h-6 · switcher Button outline w-[280px] h-9 text-sm bg-background · avatar h-10 w-10, fallback bg-muted font-medium text-foreground/80 · menu w-48: name label, Settings, Log out. In the flow the bar is pinned (fixed) with an h-16 spacer below.</p>
    </div>
  ),
};
