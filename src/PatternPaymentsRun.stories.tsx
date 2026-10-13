import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  ACME_CONTRACTORS, ContractorPayoutPanel, ContractorPayoutTable, ContractorReviewPanel, ContractorReviewTable,
  LockPayoutDialog, PaymentsLoading, PaymentsRunFrame, PeriodSelector,
} from "@/components/flows/payments-run";
import { wrap, eyebrow, note, PageHeader } from "./_docTable";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Payments Run: the F1 v6.3 Payments tab, one contractor run from review to paid.
 * Verbatim from components/flows/fronted-admin-v6-3-clone (workerScope="contractor").
 */
const meta: Meta = { title: "Patterns/Payments Run", parameters: { layout: "padded" }, globals: { theme: "interim" } };
export default meta;
type Story = StoryObj;

const emma = ACME_CONTRACTORS[0];
const marcus = ACME_CONTRACTORS[2];
const reviewOrder = ACME_CONTRACTORS;
const lockedOrder = [ACME_CONTRACTORS[2], ACME_CONTRACTORS[3], ACME_CONTRACTORS[4], ACME_CONTRACTORS[0], ACME_CONTRACTORS[1]];

export const Loading: Story = {
  name: "Loading",
  render: () => (
    <div style={{ ...wrap, maxWidth: 1240 }}>
      <PageHeader category="Pattern" status="Beta" title="Payments loading"
        lead={<>What the Payments tab shows while the run loads: a period placeholder over six row placeholders. Composed from Skeleton.</>}
        meta="Verbatim from components/flows/shared/PayrollLoadingState" />
      <PaymentsLoading />
    </div>
  ),
};

export const ReviewTable: Story = {
  name: "Review table",
  render: () => (
    <div style={{ ...wrap, maxWidth: 1240 }}>
      <PageHeader category="Pattern" status="Beta" title="Contractor run — review"
        lead={<>The run in review. Each contractor shows what they're owed and either the number of adjustments waiting for a decision (Pending) or Ready. <b>Continue to payout</b> unlocks once every row is Ready. As in v6.3, a row keeps the fee alone after approval (known issue).</>}
        meta="F1v6_SubmissionsView (hideTypeFilters) · F1v6_PeriodDropdown trigger" />
      <h3 style={eyebrow}>Two contractors pending</h3>
      <PaymentsRunFrame period={<PeriodSelector status="in-review" />}>
        <ContractorReviewTable contractors={reviewOrder} approved={[]} />
      </PaymentsRunFrame>
      <h3 style={eyebrow}>All ready</h3>
      <PaymentsRunFrame period={<PeriodSelector status="in-review" />}>
        <ContractorReviewTable contractors={lockedOrder} approved={["emma", "aditi"]} />
      </PaymentsRunFrame>
      <p style={{ ...note, marginTop: 16 }}>Card rounded-xl border-border/40 bg-card/20 · header "N contractors on payments · Adj. close" · rows px-3 py-2.5 rounded-lg border-border/30 · Pending: orange count bubble · Ready: CheckCircle2 accent-green-text.</p>
    </div>
  ),
};

export const InvoiceReview: Story = {
  name: "Invoice — review",
  render: () => (
    <div style={{ ...wrap, maxWidth: 1240 }}>
      <PageHeader category="Pattern" status="Beta" title="Contractor invoice — review"
        lead={<>The side panel for one contractor while the run is in review: invoice total, the contract fee and each submitted adjustment, then the decision. Approving updates the total (with “was”) and marks the contractor Ready for payroll, with Undo.</>}
        meta="F1v6_SubmissionsView pay breakdown sheet · CollapsibleSection · AdjustmentRow · BreakdownRow" />
      <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-start" }}>
        <div><h3 style={eyebrow}>Pending</h3><ContractorReviewPanel inline contractor={emma} approved={false} /></div>
        <div><h3 style={eyebrow}>Approved</h3><ContractorReviewPanel inline contractor={emma} approved /></div>
      </div>
    </div>
  ),
};

export const LockDialog: Story = {
  name: "Lock dialog",
  render: () => (
    <div style={{ ...wrap, maxWidth: 1240 }}>
      <PageHeader category="Pattern" status="Beta" title="Lock and pay out"
        lead={<>Confirms locking the run. After this the amounts are final and the payment happens outside Fronted.</>}
        meta="F1v6_ApproveConfirmationModal (regular run)" />
      <LockPayoutDialog />
    </div>
  ),
};

export const PayoutTable: Story = {
  name: "Payout table",
  render: () => (
    <div style={{ ...wrap, maxWidth: 1240 }}>
      <PageHeader category="Pattern" status="Beta" title="Contractor run — payout"
        lead={<>The locked run. Adjustments are closed; each contractor is In progress until marked Paid. A paperclip marks a contractor who attached their own invoice (a record only).</>}
        meta="F1v6_PayoutTable (workerScope contractor)" />
      <h3 style={eyebrow}>In progress</h3>
      <PaymentsRunFrame period={<PeriodSelector status="processing" />}>
        <ContractorPayoutTable contractors={lockedOrder} approved={["emma", "aditi"]} paid={[]} />
      </PaymentsRunFrame>
      <h3 style={eyebrow}>Paid</h3>
      <PaymentsRunFrame period={<PeriodSelector status="paid" />}>
        <ContractorPayoutTable contractors={lockedOrder} approved={["emma", "aditi"]} paid={lockedOrder.map((c) => c.id)} />
      </PaymentsRunFrame>
    </div>
  ),
};

export const InvoicePayout: Story = {
  name: "Invoice — payout",
  render: () => (
    <div style={{ ...wrap, maxWidth: 1240 }}>
      <PageHeader category="Pattern" status="Beta" title="Contractor invoice — payout"
        lead={<>The side panel for one contractor in the locked run: what's due, the contractor's own invoice as a record, then Mark as paid. Once paid it shows the paid date and Download invoice.</>}
        meta="F1v6_WorkerDetailDrawer (track step, contractor)" />
      <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-start" }}>
        <div><h3 style={eyebrow}>To pay</h3><ContractorPayoutPanel inline contractor={marcus} approved paid={false} /></div>
        <div><h3 style={eyebrow}>Paid</h3><ContractorPayoutPanel inline contractor={marcus} approved paid /></div>
      </div>
    </div>
  ),
};
