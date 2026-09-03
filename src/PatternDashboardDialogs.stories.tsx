import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Dashboard Dialogs (verbatim from F4.1 Employee / F4.2 Contractor dashboards v8.1).
 * The confirmation AlertDialogs a worker sees when submitting or withdrawing their pay/invoice:
 * Confirm Pay (F41v81_ConfirmPayDialog), Confirm Invoice (F42v81_ConfirmInvoiceDialog),
 * Withdraw request / Withdraw submission (F41v81_WithdrawDialog / F41v81_WithdrawSubmissionDialog)
 * and Submit — no changes (F41v81_SubmitNoChangesDialog).
 * Rendered as static bordered panels (no live AlertDialog open state); title, description and
 * footer button labels/variants are verbatim from source. Primary text uses text-emphasis per
 * the system's a11y swap.
 */
const meta: Meta = { title: "Patterns/Dashboard Dialogs", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

/**
 * The shared AlertDialog shell as a static panel — mirrors AlertDialogContent
 * (sm:max-w-md, close button top-right) with Header (title + description) and Footer.
 */
function DialogShell({
  title,
  description,
  footer,
}: {
  title: React.ReactNode;
  description: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="relative w-full max-w-md rounded-lg border border-border bg-background p-6 shadow-overlay">
      <button
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="flex flex-col gap-2 text-center sm:text-left">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        {footer}
      </div>
    </div>
  );
}

/** AlertDialogCancel — vendored button, outline variant. */
function DialogCancel() {
  return (
    <Button variant="outline">Cancel</Button>
  );
}

/** Confirm Pay — F41v81_ConfirmPayDialog. */
function ConfirmPayDialog() {
  const periodLabel = "March 2026";
  return (
    <DialogShell
      title="Submit for review?"
      description={
        <>
          You're confirming your details for {periodLabel} are correct. Your company will review and
          approve before payroll is processed.
        </>
      }
      footer={
        <>
          <DialogCancel />
          <Button>Submit</Button>
        </>
      }
    />
  );
}

/** Confirm Invoice — F42v81_ConfirmInvoiceDialog. */
function ConfirmInvoiceDialog() {
  const periodLabel = "March 2026";
  return (
    <DialogShell
      title="Confirm upcoming invoice"
      description={
        <>
          You're confirming your invoice for {periodLabel}. You can still request adjustments until
          the submission window closes.
        </>
      }
      footer={
        <>
          <DialogCancel />
          <Button>Confirm</Button>
        </>
      }
    />
  );
}

/** Withdraw request — F41v81_WithdrawDialog (destructive action). */
function WithdrawDialog() {
  return (
    <DialogShell
      title="Withdraw this request?"
      description={
        <>
          This will remove your pending pay adjustment from this pay cycle. If you still need a
          change, you can submit a new request before confirmation closes.
        </>
      }
      footer={
        <>
          <DialogCancel />
          <Button className={cn("bg-destructive text-destructive-foreground hover:bg-destructive/90")}>
            Withdraw request
          </Button>
        </>
      }
    />
  );
}

/** Withdraw submission — F41v81_WithdrawSubmissionDialog (destructive action). */
function WithdrawSubmissionDialog() {
  return (
    <DialogShell
      title="Withdraw your submission?"
      description={
        <>
          This will return your pay details to draft status so you can make changes. You'll need to
          re-submit once you've made your changes.
        </>
      }
      footer={
        <>
          <DialogCancel />
          <Button className={cn("bg-destructive text-destructive-foreground hover:bg-destructive/90")}>
            Withdraw submission
          </Button>
        </>
      }
    />
  );
}

/** Submit — no changes — F41v81_SubmitNoChangesDialog. */
function SubmitNoChangesDialog() {
  const periodLabel = "March 2026";
  return (
    <DialogShell
      title="Submit with no changes?"
      description={
        <>
          You're confirming no leave, expenses, or adjustments for {periodLabel}. Your standard pay
          will be processed.
        </>
      }
      footer={
        <>
          <DialogCancel />
          <Button>Submit</Button>
        </>
      }
    />
  );
}

const center: React.CSSProperties = { display: "flex", justifyContent: "center", padding: "8px 0" };

export const DashboardDialogs: Story = {
  name: "Dashboard Dialogs",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        status="Stable"
        title="Dashboard Dialogs"
        lead={
          <>
            The confirmation dialogs a worker sees when submitting or withdrawing pay on the F4.1
            Employee and F4.2 Contractor dashboards. Every dialog shares one AlertDialog shell
            (sm:max-w-md, close button top-right, header title + muted description, footer with a
            Cancel + a primary action). Withdraw dialogs use a destructive action button. Markup
            verbatim from the F4.1/F4.2 v8.1 source.
          </>
        }
        meta="Verbatim from F4.1 employee-dashboard-v8-1 · F4.2 contractor-dashboard-v8-1"
      />

      <h3 style={eyebrow}>Confirm Pay</h3>
      <div style={center}><ConfirmPayDialog /></div>
      <p style={{ ...note, marginTop: 10 }}>F41v81_ConfirmPayDialog · title “Submit for review?” · confirming details for the period · footer Cancel (outline) + Submit (default). Resubmit variant swaps to “Resubmit for review?” / “Resubmit”.</p>

      <h3 style={eyebrow}>Confirm Invoice</h3>
      <div style={center}><ConfirmInvoiceDialog /></div>
      <p style={{ ...note, marginTop: 10 }}>F42v81_ConfirmInvoiceDialog · title “Confirm upcoming invoice” · footer Cancel (outline) + Confirm (default).</p>

      <h3 style={eyebrow}>Withdraw</h3>
      <div style={center}><WithdrawDialog /></div>
      <p style={{ ...note, marginTop: 10 }}>F41v81_WithdrawDialog · title “Withdraw this request?” · removes a pending pay adjustment / leave request · footer Cancel (outline) + Withdraw request (bg-destructive text-destructive-foreground hover:bg-destructive/90).</p>

      <h3 style={eyebrow}>Withdraw submission</h3>
      <div style={center}><WithdrawSubmissionDialog /></div>
      <p style={{ ...note, marginTop: 10 }}>F41v81_WithdrawSubmissionDialog · title “Withdraw your submission?” · returns pay details to draft · footer Cancel (outline) + Withdraw submission (destructive).</p>

      <h3 style={eyebrow}>Submit — no changes</h3>
      <div style={center}><SubmitNoChangesDialog /></div>
      <p style={{ ...note, marginTop: 10 }}>F41v81_SubmitNoChangesDialog · title “Submit with no changes?” · confirms no leave/expenses/adjustments for the period · footer Cancel (outline) + Submit (default).</p>

      <h3 style={eyebrow}>Anatomy</h3>
      <DocTable head={["Part", "Detail", "classes"]} w0={160} rows={[
        ["Shell", "AlertDialogContent — centered card with close button", "sm:max-w-md rounded-lg border bg-background p-6 shadow-overlay · close absolute right-4 top-4 opacity-70 hover:opacity-100"],
        ["Header", "AlertDialogTitle + AlertDialogDescription", "flex flex-col gap-2 · title text-lg font-semibold text-foreground · description text-sm text-muted-foreground"],
        ["Footer", "AlertDialogCancel + AlertDialogAction", "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end · Cancel = outline"],
        ["Confirm Pay", "“Submit for review?” · Cancel + Submit", "action = default variant (Resubmit variant: “Resubmit for review?” / “Resubmit”)"],
        ["Confirm Invoice", "“Confirm upcoming invoice” · Cancel + Confirm", "action = default variant"],
        ["Withdraw", "“Withdraw this request?” · Cancel + Withdraw request", "action = bg-destructive text-destructive-foreground hover:bg-destructive/90"],
        ["Withdraw submission", "“Withdraw your submission?” · Cancel + Withdraw submission", "action = bg-destructive text-destructive-foreground hover:bg-destructive/90"],
        ["Submit — no changes", "“Submit with no changes?” · Cancel + Submit", "action = default variant"],
      ]} />
    </div>
  ),
};
