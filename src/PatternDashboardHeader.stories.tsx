import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DashboardHeader as Header, type DashboardTab } from "@/components/flows/dashboard-header";
import { wrap, eyebrow, note, PageHeader } from "./_docTable";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Dashboard Header (verbatim from AgentHeader + the Workers | Payroll toggle in
 * F1v61_FrontedAdminDashboard, or Workers | Payroll | Payments in F1v63).
 */
const meta: Meta = { title: "Patterns/Dashboard Header", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

function Live({ payments = false }: { payments?: boolean }) {
  const [tab, setTab] = React.useState<DashboardTab>("tracker");
  return <Header payments={payments} tab={tab} onTabChange={setTab} />;
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

      <h3 style={eyebrow}>With Payments (contractors paid apart from employees)</h3>
      <div className="py-6"><Live payments /></div>

      <p style={{ ...note, marginTop: 16 }}>h1 text-xl sm:text-2xl md:text-3xl font-bold, centred · empty subtitle row kept for spacing · TabsList grid w-[280px] grid-cols-2 (w-[380px] grid-cols-3 with Payments), mt-1 pb-3. The company name uses a non-breaking space ("Acme&nbsp;Corp").</p>
    </div>
  ),
};
