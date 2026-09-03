import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { X, Trash2, Check } from "lucide-react";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import { Guidance } from "./guidance";
import "./tokens.css";
import "./typography.css";

/**
 * Components — Alert Dialog (Radix, verbatim ui/alert-dialog).
 * Confirmation for a consequential action. Three verbatim variants from the flows:
 *   • Remove worker (F1 pipeline)  — destructive action, ghost trigger.
 *   • Approve request (F6 approvals) — primary action, no input.
 *   • Reject request (F6 approvals) — destructive action + a required reason textarea.
 * A custom ✕ close (top-4 right-4) + onOverlayClick both dismiss.
 */
const meta: Meta = { title: "Components/Alert Dialog", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const closeBtn = "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

/** F1 — Remove worker (destructive, ghost "link" trigger). */
function RemoveWorkerDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild><Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1 text-muted-foreground hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /> Remove worker</Button></AlertDialogTrigger>
      <AlertDialogContent className="bg-card border-border" onOverlayClick={() => setOpen(false)}>
        <button onClick={() => setOpen(false)} className={closeBtn}><X className="h-4 w-4" /><span className="sr-only">Close</span></button>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove worker?</AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            Are you sure you want to remove <span className="font-medium text-foreground">Anika Lindqvist</span> from the pipeline? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="h-9">Cancel</AlertDialogCancel>
          <AlertDialogAction className="h-9 bg-destructive text-destructive-foreground hover:bg-destructive/90">Remove worker</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

/** F6 — Approve request (primary action, no input). Verbatim F6v41_ApproveConfirmationDialog. */
function ApproveDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild><Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground hover:bg-muted"><Check className="h-3.5 w-3.5" /></Button></AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-md" onOverlayClick={() => setOpen(false)}>
        <button onClick={() => setOpen(false)} className={closeBtn} aria-label="Close"><X className="h-4 w-4" /></button>
        <AlertDialogHeader>
          <AlertDialogTitle>Approve this request?</AlertDialogTitle>
          <AlertDialogDescription>This will approve "Maria Santos · Overtime" and the decision will be visible to any other approvers reviewing this request.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-primary text-primary-foreground hover:bg-primary/90">Approve</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

/** F6 — Reject request (destructive action + required reason). Verbatim F6v41_RejectApprovalDialog. */
function RejectDemo() {
  const [open, setOpen] = React.useState(false);
  const [reason, setReason] = React.useState("");
  React.useEffect(() => { if (!open) setReason(""); }, [open]);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild><Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground hover:bg-muted"><X className="h-3.5 w-3.5" /></Button></AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-md" onOverlayClick={() => setOpen(false)}>
        <button onClick={() => setOpen(false)} className={closeBtn} aria-label="Close"><X className="h-4 w-4" /></button>
        <AlertDialogHeader>
          <AlertDialogTitle>Reject this request?</AlertDialogTitle>
          <AlertDialogDescription>This will reject "Maria Santos · Overtime". The worker will see your reason.</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="py-2">
          <label htmlFor="reject-reason" className="text-sm font-medium text-foreground mb-1.5 block">Reason for rejection</label>
          <textarea id="reject-reason" placeholder="Enter a reason for the rejection..." value={reason} onChange={(e) => setReason(e.target.value)}
            className="w-full min-h-[80px] resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={!reason.trim()} className="bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50 disabled:pointer-events-none">Reject</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export const AlertDialogStory: Story = {
  name: "Alert Dialog",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Components"
        status="Stable"
        title="Alert Dialog"
        lead={<>
        Confirmation for a consequential action. Three verbatim variants across the flows — a destructive remove,
        a primary approve, and a destructive reject with a required reason. The ✕ and clicking the overlay both dismiss.
        </>}
      />

      <h3 style={eyebrow}>Live examples (click to open)</h3>
      <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
        <div><RemoveWorkerDemo /></div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={note}>Approve ✓</span><ApproveDemo /></div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={note}>Reject ✕</span><RejectDemo /></div>
      </div>

      <h3 style={eyebrow}>Variants</h3>
      <DocTable head={["Variant", "Action button", "classes"]} w0={160} wLast={340} rows={[
        ["Remove (F1)", <button className="h-9 px-4 rounded-md bg-destructive text-destructive-foreground text-sm font-medium hover:bg-destructive/90">Remove worker</button>, "content bg-card border-border · Action h-9 bg-destructive text-destructive-foreground"],
        ["Approve (F6)", <button className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">Approve</button>, "content sm:max-w-md · Action bg-primary text-primary-foreground hover:bg-primary/90 · no input"],
        ["Reject (F6)", <button className="h-9 px-4 rounded-md bg-destructive text-destructive-foreground text-sm font-medium opacity-50">Reject</button>, "content sm:max-w-md · reason textarea min-h-[80px] · Action bg-destructive disabled:opacity-50 until reason"],
      ]} />

      <h3 style={eyebrow}>Parts (shared)</h3>
      <DocTable head={["Part", "Example", "classes"]} w0={150} wLast={340} rows={[
        ["Cancel", <button className="h-9 px-4 rounded-md border border-border bg-background text-sm font-medium hover:bg-foreground hover:text-background">Cancel</button>, "AlertDialogCancel = buttonVariants outline · border-border hover:bg-foreground hover:text-background"],
        ["Reason textarea", <textarea readOnly placeholder="Enter a reason for the rejection..." className="w-[260px] min-h-[64px] resize-none rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground" />, "w-full min-h-[80px] resize-none rounded-md border border-input · focus-visible:ring-2 ring-ring"],
        ["Close (✕)", <button className="text-muted-foreground opacity-70 hover:opacity-100"><X className="h-4 w-4" /></button>, "custom · absolute right-4 top-4 · onOverlayClick also closes"],
      ]} />
      <Guidance k="alertdialog" />
    </div>
  ),
};
