import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FeedbackBubble } from "@/components/flows/feedback-bubble";
import { AdminDashboardShell } from "@/components/flows/admin-dashboard-shell";
import { AdminTopbar } from "@/components/flows/admin-topbar";
import { DashboardHeader, type DashboardTab } from "@/components/flows/dashboard-header";
import { ContractorPaymentsRun, PaymentsLoading as Loading, type RunEvent, type RunState } from "@/components/flows/payments-run";
import { FlowPage, Part, useFlowAdvance, type PartInfo } from "@/components/flows/flow-page";
import "./tokens.css";
import "./typography.css";

/**
 * Flows — F1 Contractor payments. A Fronted admin pays a month's contractors: from the
 * Payments tab (reached from the Workers pipeline, Flows/F1 Sign in · 5) through review,
 * approval, lock and payout to paid. Each story is one full screen, composed only from the
 * patterns in this Storybook; the run works, so each screen can be used, and on the flow
 * canvas the step's action moves the journey on.
 */
const meta: Meta = {
  title: "Flows/F1 Contractor payments",
  parameters: { layout: "fullscreen" },
  globals: { theme: "interim" },
};
export default meta;
type Story = StoryObj;

const P = {
  bubble:  { id: "patterns-feedback-bubble--feedback-bubble", label: "Patterns/Feedback Bubble" },
  shell:   { id: "patterns-admin-dashboard-shell--admin-dashboard-shell", label: "Patterns/Admin Dashboard Shell" },
  topbar:  { id: "patterns-admin-topbar--admin-topbar", label: "Patterns/Admin Topbar" },
  header:  { id: "patterns-dashboard-header--dashboard-header", label: "Patterns/Dashboard Header" },
  loading: { id: "patterns-payments-run--loading", label: "Patterns/Payments Run · Loading" },
  run:     { id: "patterns-payments-run--review-table", label: "Patterns/Payments Run · Review table" },
  payout:  { id: "patterns-payments-run--payout-table", label: "Patterns/Payments Run · Payout table" },
} satisfies Record<string, PartInfo>;

function LiveHeader() {
  const [tab, setTab] = React.useState<DashboardTab>("payments");
  return <DashboardHeader payments tab={tab} onTabChange={setTab} />;
}

function PaymentsScreen({ children, body }: { children: React.ReactNode; body: PartInfo }) {
  return (
    <FlowPage>
      <Part of={P.shell}>
        <AdminDashboardShell body="run"
          topbar={<Part of={P.topbar}><AdminTopbar fixed /></Part>}
          header={<Part of={P.header}><LiveHeader /></Part>}
        >
          <Part of={body}>{children}</Part>
        </AdminDashboardShell>
      </Part>
      <Part of={P.bubble}><FeedbackBubble /></Part>
    </FlowPage>
  );
}

/** The working run; `on` is the admin's action that moves this screen's journey on. */
function Run({ initial, on }: { initial: RunState; on?: RunEvent }) {
  const advance = useFlowAdvance();
  return <ContractorPaymentsRun initial={initial} onEvent={(e) => { if (e === on) advance(e); }} />;
}

function RunScreen({ initial, on }: { initial: RunState; on?: RunEvent }) {
  return (
    <PaymentsScreen body={initial.phase === "review" ? P.run : P.payout}>
      <Run initial={initial} on={on} />
    </PaymentsScreen>
  );
}

const review: RunState = { phase: "review", approved: [], paid: [] };
const allReady: RunState = { phase: "review", approved: ["emma", "aditi"], paid: [] };
const locked: RunState = { ...allReady, phase: "locked" };

export const PaymentsLoading: Story = {
  name: "1 · Payments loading",
  render: () => <PaymentsScreen body={P.loading}><Loading /></PaymentsScreen>,
};

export const RunInReview: Story = {
  name: "2 · Run in review",
  render: () => <RunScreen initial={review} on="open" />,
};

export const InvoicePending: Story = {
  name: "3 · Invoice, adjustment pending",
  render: () => <RunScreen initial={{ ...review, open: "emma" }} on="approve" />,
};

export const OneReady: Story = {
  name: "4 · First contractor ready",
  // Approving the next contractor's adjustments (open a Pending row, Approve all) moves on.
  render: () => <RunScreen initial={{ ...review, approved: ["emma"] }} on="approve" />,
};

export const AllReady: Story = {
  name: "5 · All ready",
  render: () => <RunScreen initial={allReady} on="continue" />,
};

export const LockAndApprove: Story = {
  name: "6 · Lock and pay out",
  render: () => <RunScreen initial={{ ...allReady, confirm: true }} on="lock" />,
};

export const Locked: Story = {
  name: "7 · Locked, in progress",
  render: () => <RunScreen initial={locked} on="open" />,
};

export const InvoiceToPay: Story = {
  name: "8 · Invoice to pay",
  render: () => <RunScreen initial={{ ...locked, open: "marcus" }} on="paid" />,
};

export const Paid: Story = {
  name: "9 · All paid",
  render: () => <RunScreen initial={{ ...locked, paid: ["marcus", "sofia", "david", "emma", "aditi"] }} />,
};
