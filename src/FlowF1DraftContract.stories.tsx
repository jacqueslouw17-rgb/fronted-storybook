import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AdminDashboardShell } from "@/components/flows/admin-dashboard-shell";
import { AdminTopbar } from "@/components/flows/admin-topbar";
import { DashboardHeader, type DashboardTab } from "@/components/flows/dashboard-header";
import { ACME_WORKERS, WorkerPipeline } from "@/components/flows/worker-pipeline";
import {
  ContractDraftWorkspace, ContractFlowShell, ContractFormShell, ContractReviewBoard, FrostedHeader,
  ReviewDetailsForm, SentToast, type ImportProblem, type WorkspaceEvent, type WorkspaceState,
} from "@/components/flows/contract-flow";
import { SignatureDrawer, type SignatureEvent, type SigningStatus } from "@/components/flows/signature-drawer";
import { Toaster, toast } from "@/components/ui/sonner";
import { FlowPage, Part, useFlowAdvance, type PartInfo } from "@/components/flows/flow-page";
import "./tokens.css";
import "./typography.css";

/**
 * Flows — F1 Draft contract. A Fronted admin drafts a candidate's contract and sends it for
 * signature: from Draft Contract on the pipeline (Flows/F1 Sign in · 5) through the
 * candidate's details, the contract (read to the end), and review, back to the pipeline with
 * the candidate in Waiting for Signature. Demo (Flow 1 v6.1). Each story is one full screen,
 * composed only from this Storybook's patterns; the screen's action moves the canvas on.
 *
 * Besides the happy path (1-6), the branches the contract can take:
 *   Edit       edit the contract in the editor and save (an empty contract can't be saved)
 *   Reset      regenerate the contract from the template, discarding manual edits
 *   Upload     replace it with an uploaded file (refused files and failed imports too)
 *   Error      no document generated for the worker
 *   Signing    Track Progress after sending: admin signs, sent to worker, worker signs,
 *              and the worker moves to Onboard Worker
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

/** The contract screen in any state of its branches. `on` lists the admin's actions that move
 *  the canvas on from this screen (the first one that happens; its name is the branch taken). */
function DraftScreen({ readToEnd, initial, on = ["read", "confirm", "edit", "reset-open", "upload-open"], fails }: {
  readToEnd?: boolean; initial?: WorkspaceState; on?: WorkspaceEvent[]; fails?: ImportProblem;
}) {
  const advance = useFlowAdvance();
  return (
    <>
      <ContractFlowShell header={header}>
        <Part of={P.draft}>
          <ContractDraftWorkspace readToEnd={readToEnd} initial={initial} uploadFails={fails}
            onEvent={(e) => { if (on.includes(e)) advance(e); }} />
        </Part>
      </ContractFlowShell>
      <Toaster position="top-center" />
    </>
  );
}

/** Review Contracts. Pressing Send for Signature moves the canvas on at once (to Preparing
 *  signatures); `sending` is that screen, held while it prepares. */
function ReviewScreen({ sending }: { sending?: boolean }) {
  const advance = useFlowAdvance();
  return (
    <ContractFlowShell header={header}>
      <Part of={P.board}><ContractReviewBoard sending={sending} hold={sending} onSending={() => advance("send")} /></Part>
    </ContractFlowShell>
  );
}

/** Marcus Chen moved from Prepare Contract to Waiting for Signature, ahead of Liam O'Connor. */
const SENT = ACME_WORKERS.map((w) => (w.id === "default-1" ? { ...w, status: "awaiting-signature" as const } : w));

/** Marcus Chen signed and moved on to Onboard Worker. */
const SIGNED = ACME_WORKERS.map((w) => (w.id === "default-1" ? { ...w, status: "trigger-onboarding" as const } : w));

/** The pipeline after sending. Track Progress on Marcus Chen opens the signing drawer
 *  (`signing` starts it in that state); `on` lists the actions that move the canvas on. */
function SentScreen({ signing, hold, on = [], workers = SENT, sentToast = true, arrivalToast }: {
  signing?: SigningStatus; hold?: boolean; on?: (SignatureEvent | "track")[]; workers?: typeof SENT; sentToast?: boolean; arrivalToast?: string;
}) {
  const advance = useFlowAdvance();
  const [tab, setTab] = React.useState<DashboardTab>("tracker");
  const [drawer, setDrawer] = React.useState<SigningStatus | null>(signing ?? null);
  React.useEffect(() => { if (arrivalToast) toast.success(arrivalToast); }, []);
  const go = (e: SignatureEvent | "track") => { if (on.includes(e)) advance(e); };
  return (
    <>
      <Part of={P.shell}>
        <AdminDashboardShell
          topbar={<Part of={P.topbar}><AdminTopbar fixed /></Part>}
          header={<Part of={P.dheader}><DashboardHeader tab={tab} onTabChange={setTab} /></Part>}
        >
          <Part of={P.pipeline}>
            <WorkerPipeline workers={workers} onAction={(w, action) => {
              if (action === "Track Progress" && w.id === "default-1") { setDrawer("loading"); go("track"); }
            }} />
          </Part>
        </AdminDashboardShell>
      </Part>
      {sentToast && <Part of={P.toast}><SentToast /></Part>}
      {drawer && (
        <SignatureDrawer initial={drawer} hold={hold} onOpenChange={(o) => { if (!o) setDrawer(null); }}
          onEvent={(e) => {
            go(e);
            if (e === "worker-signed") window.setTimeout(() => toast.success("Contract signed! Moving to Onboard Worker."), 300);
          }} />
      )}
      <Toaster position="top-center" />
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

export const PreparingSignatures: Story = {
  name: "5 · Preparing signatures",
  // The moment after Send for Signature: spinner on the button, a sweep across each card.
  render: () => <FlowPage><ReviewScreen sending /></FlowPage>,
};

export const SentForSignature: Story = {
  name: "6 · Sent for signature",
  // Track Progress on Marcus Chen's card branches into signing.
  render: () => <FlowPage><SentScreen on={["track"]} /></FlowPage>,
};

/* ---- Edit: change the contract in the editor ---------------------------------------- */

export const EditEditing: Story = {
  name: "Edit · 1 Editing the contract",
  render: () => <FlowPage><DraftScreen initial={{ mode: "editing" }} on={["save", "empty"]} /></FlowPage>,
};

export const EditSaved: Story = {
  name: "Edit · 2 Changes saved",
  render: () => <FlowPage><DraftScreen initial={{ edits: [{ who: "You", doc: "Agreement", when: "Just now" }], toast: { title: "Contract changes saved" } }} on={[]} /></FlowPage>,
};

export const EditEmpty: Story = {
  name: "Edit · Empty contract can't be saved",
  render: () => <FlowPage><DraftScreen initial={{ mode: "editing", emptyEditor: true }} on={[]} /></FlowPage>,
};

/* ---- Reset: regenerate from the template --------------------------------------------- */

export const ResetConfirm: Story = {
  name: "Reset · 1 Confirm reset",
  render: () => <FlowPage><DraftScreen initial={{ dialog: "reset" }} on={["reset"]} /></FlowPage>,
};

export const ResetRegenerating: Story = {
  name: "Reset · 2 Regenerating",
  render: () => <FlowPage><DraftScreen initial={{ mode: "resetting", hold: true }} on={[]} /></FlowPage>,
};

export const ResetDone: Story = {
  name: "Reset · 3 Contract reset",
  render: () => (
    <FlowPage>
      <DraftScreen on={[]} initial={{ changedSinceReset: false, edits: [{ who: "You", when: "Just now", kind: "reset" }],
        toast: { title: "Contract reset to original", description: "The contract has been regenerated using the current worker data." } }} />
    </FlowPage>
  ),
};

/* ---- Upload: replace the contract with a file ----------------------------------------- */

const SIGNED_PDF = { name: "marcus-chen-contract-signed.pdf", size: 248_000 };

export const UploadDialogStory: Story = {
  name: "Upload · 1 Upload dialog",
  render: () => <FlowPage><DraftScreen initial={{ dialog: "upload" }} on={["upload-pick", "upload-refused"]} /></FlowPage>,
};

export const UploadChosen: Story = {
  name: "Upload · 2 File chosen",
  render: () => <FlowPage><DraftScreen initial={{ dialog: "upload", upload: { file: SIGNED_PDF } }} on={["upload-import"]} /></FlowPage>,
};

export const UploadUploading: Story = {
  name: "Upload · 3 Uploading",
  render: () => <FlowPage><DraftScreen initial={{ dialog: "upload", upload: { file: SIGNED_PDF, importing: true }, hold: true }} on={[]} /></FlowPage>,
};

export const UploadApplying: Story = {
  name: "Upload · 4 Applying the upload",
  render: () => (
    <FlowPage>
      <DraftScreen on={[]} initial={{ mode: "applying", hold: true, edits: [{ who: "You", doc: "Agreement", what: `Uploaded ${SIGNED_PDF.name}`, when: "Just now", kind: "upload" }] }} />
    </FlowPage>
  ),
};

export const UploadReplaced: Story = {
  name: "Upload · 5 Contract replaced",
  render: () => (
    <FlowPage>
      <DraftScreen on={[]} initial={{ edits: [{ who: "You", doc: "Agreement", what: `Uploaded ${SIGNED_PDF.name}`, when: "Just now", kind: "upload" }],
        toast: { title: "Contract replaced with your uploaded version", description: "Saved as the current version in edit history." } }} />
    </FlowPage>
  ),
};

export const UploadWrongFormat: Story = {
  name: "Upload · Wrong file type",
  render: () => <FlowPage><DraftScreen initial={{ dialog: "upload", upload: { error: "format" } }} on={[]} /></FlowPage>,
};

export const UploadTooLarge: Story = {
  name: "Upload · File too large",
  render: () => <FlowPage><DraftScreen initial={{ dialog: "upload", upload: { error: "size" } }} on={[]} /></FlowPage>,
};

export const UploadFailed: Story = {
  name: "Upload · Import failed",
  render: () => <FlowPage><DraftScreen fails="server" initial={{ dialog: "upload", upload: { file: SIGNED_PDF, error: "server" } }} on={[]} /></FlowPage>,
};

/* ---- Error: nothing generated ----------------------------------------------------------- */

export const NoDocuments: Story = {
  name: "Error · No documents available",
  render: () => <FlowPage><DraftScreen initial={{ mode: "no-documents" }} on={["upload-open"]} /></FlowPage>,
};

/* ---- Signing: after sending ------------------------------------------------------------- */

export const SignLoading: Story = {
  name: "Signing · 1 Loading progress",
  render: () => <FlowPage><SentScreen sentToast={false} signing="loading" hold on={[]} /></FlowPage>,
};

export const SignAwaitingAdmin: Story = {
  name: "Signing · 2 Awaiting admin signature",
  render: () => <FlowPage><SentScreen sentToast={false} signing="awaiting_admin" on={["sign"]} /></FlowPage>,
};

export const SignSentToWorker: Story = {
  name: "Signing · 3 Sent to worker",
  render: () => <FlowPage><SentScreen sentToast={false} signing="sent_to_candidate" on={["worker-signed"]} arrivalToast="Admin signed! Contract sent to Marcus Chen." /></FlowPage>,
};

export const SignWorkerSigned: Story = {
  name: "Signing · 4 Worker signed",
  render: () => <FlowPage><SentScreen sentToast={false} signing="candidate_signed" on={["close"]} arrivalToast="Marcus Chen has signed the contract." /></FlowPage>,
};

export const SignOnboard: Story = {
  name: "Signing · 5 Moved to Onboard Worker",
  render: () => <FlowPage><SentScreen sentToast={false} workers={SIGNED} arrivalToast="Contract signed! Moving to Onboard Worker." /></FlowPage>,
};
