import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AdminDashboardShell } from "@/components/flows/admin-dashboard-shell";
import { AdminTopbar } from "@/components/flows/admin-topbar";
import { DashboardHeader, type DashboardTab } from "@/components/flows/dashboard-header";
import { ACME_WORKERS, WorkerPipeline } from "@/components/flows/worker-pipeline";
import {
  ContractDraftWorkspace, ContractFlowShell, ContractFormShell, ContractReviewBoard, FrostedHeader,
  ReviewDetailsForm, SentToast,
} from "@/components/flows/contract-flow";
import { FlowPage, Part, useFlowAdvance, type PartInfo } from "@/components/flows/flow-page";
import "./tokens.css";
import "./typography.css";

/**
 * Flows — F1 Draft contract. A Fronted admin drafts a candidate's contract and sends it for
 * signature: from Draft Contract on the pipeline (Flows/F1 Sign in · 5) through the
 * candidate's details, the contract (read to the end), and review, back to the pipeline with
 * the candidate in Waiting for Signature. Demo (Flow 1 v6.1). Each story is one full screen,
 * composed only from this Storybook's patterns; the screen's action moves the canvas on.
 */
const meta: Meta = {
  title: "Flows/F1 Draft contract",
  parameters: { layout: "fullscreen" },
  globals: { theme: "interim" },
};
export default meta;
type Story = StoryObj;

const P = {
  header:   { id: "patterns-contract-review--frosted-header-story", label: "Patterns/Contract Review · Frosted Header" },
  details:  { id: "patterns-contract-workspace--contract-workspace", label: "Patterns/Contract Workspace" },
  draft:    { id: "patterns-contract-preview--contract-preview", label: "Patterns/Contract Preview" },
  board:    { id: "patterns-contract-review--review-board", label: "Patterns/Contract Review · Review board" },
  toast:    { id: "patterns-contract-review--sent-toast-story", label: "Patterns/Contract Review · Sent toast" },
  shell:    { id: "patterns-admin-dashboard-shell--admin-dashboard-shell", label: "Patterns/Admin Dashboard Shell" },
  topbar:   { id: "patterns-admin-topbar--admin-topbar", label: "Patterns/Admin Topbar" },
  dheader:  { id: "patterns-dashboard-header--dashboard-header", label: "Patterns/Dashboard Header" },
  pipeline: { id: "patterns-worker-pipeline--worker-pipeline", label: "Patterns/Worker Pipeline" },
} satisfies Record<string, PartInfo>;

const header = <Part of={P.header}><FrostedHeader /></Part>;

function DetailsScreen() {
  const advance = useFlowAdvance();
  return (
    <ContractFormShell header={header}>
      <Part of={P.details}><ReviewDetailsForm onReview={() => advance("review")} /></Part>
    </ContractFormShell>
  );
}

function DraftScreen({ readToEnd }: { readToEnd?: boolean }) {
  const advance = useFlowAdvance();
  return (
    <ContractFlowShell header={header}>
      <Part of={P.draft}><ContractDraftWorkspace readToEnd={readToEnd} onRead={() => advance("read")} onConfirm={() => advance("confirm")} /></Part>
    </ContractFlowShell>
  );
}

function ReviewScreen() {
  const advance = useFlowAdvance();
  return (
    <ContractFlowShell header={header}>
      <Part of={P.board}><ContractReviewBoard onSend={() => advance("send")} /></Part>
    </ContractFlowShell>
  );
}

/** Marcus Chen moved from Prepare Contract to Waiting for Signature, ahead of Liam O'Connor. */
const SENT = ACME_WORKERS.map((w) => (w.id === "default-1" ? { ...w, status: "awaiting-signature" as const } : w));

function SentScreen() {
  const [tab, setTab] = React.useState<DashboardTab>("tracker");
  return (
    <>
      <Part of={P.shell}>
        <AdminDashboardShell
          topbar={<Part of={P.topbar}><AdminTopbar fixed /></Part>}
          header={<Part of={P.dheader}><DashboardHeader tab={tab} onTabChange={setTab} /></Part>}
        >
          <Part of={P.pipeline}><WorkerPipeline workers={SENT} /></Part>
        </AdminDashboardShell>
      </Part>
      <Part of={P.toast}><SentToast /></Part>
    </>
  );
}

export const ReviewDetails: Story = {
  name: "1 · Review details",
  render: () => <FlowPage><DetailsScreen /></FlowPage>,
};

export const ContractDraft: Story = {
  name: "2 · Contract draft",
  // Scrolling the contract to its end unlocks Confirm & Continue (the next screen).
  render: () => <FlowPage><DraftScreen /></FlowPage>,
};

export const ContractRead: Story = {
  name: "3 · Contract read to the end",
  render: () => <FlowPage><DraftScreen readToEnd /></FlowPage>,
};

export const ReviewContracts: Story = {
  name: "4 · Review contracts",
  render: () => <FlowPage><ReviewScreen /></FlowPage>,
};

export const SentForSignature: Story = {
  name: "5 · Sent for signature",
  render: () => <FlowPage><SentScreen /></FlowPage>,
};
