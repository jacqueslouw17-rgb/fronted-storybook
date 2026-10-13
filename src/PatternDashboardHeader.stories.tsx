import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DashboardHeader as Header } from "@/components/flows/dashboard-header";
import { wrap, eyebrow, note, PageHeader } from "./_docTable";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Dashboard Header (verbatim from AgentHeader + the Workers | Payroll toggle in
 * F1v61_FrontedAdminDashboard).
 */
const meta: Meta = { title: "Patterns/Dashboard Header", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

function Live() {
  const [tab, setTab] = React.useState<"tracker" | "payroll">("tracker");
  return <Header tab={tab} onTabChange={setTab} />;
}

export const DashboardHeader: Story = {
  name: "Dashboard Header",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        status="Stable"
        title="Dashboard Header"
        lead={<>The top of the F1 admin dashboard: a centred welcome line naming the company, and the Workers | Payroll switch below it. Composed from Tabs.</>}
        meta="Verbatim from AgentHeader (showPulse off, showInput off) · Workers | Payroll toggle from F1v61_FrontedAdminDashboard"
      />

      <h3 style={eyebrow}>Workers selected</h3>
      <div className="py-6"><Live /></div>

      <h3 style={eyebrow}>Payroll selected</h3>
      <div className="py-6"><Header tab="payroll" /></div>

      <p style={{ ...note, marginTop: 16 }}>h1 text-xl sm:text-2xl md:text-3xl font-bold, centred · empty subtitle row kept for spacing · TabsList grid w-[280px] grid-cols-2, mt-1 pb-3. The company name uses a non-breaking space ("Acme&nbsp;Corp").</p>
    </div>
  ),
};
