import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import { Guidance } from "./guidance";
import "./tokens.css";
import "./typography.css";

/**
 * Components — Dialog (Radix, verbatim ui/dialog).
 * Modal for a focused confirmation. Reproduced verbatim from
 * F1v6_ApproveConfirmationModal: sm:max-w-sm p-5 sm:p-6, left-aligned header, flex-row
 * footer. DialogContent ships the ✕ close in the top-right by default.
 */
const meta: Meta = { title: "Components/Dialog", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

/** Inline replica of the dialog surface (no overlay) — same classes as the real
 *  DialogContent + F1v6_ApproveConfirmationModal, real default-size Buttons. */
function DialogPreview() {
  return (
    <div className="relative grid gap-4 w-full max-w-sm rounded-lg border bg-background p-5 sm:p-6 shadow-lg">
      <button className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100"><X className="h-4 w-4" /></button>
      <div className="flex flex-col gap-1.5 text-left pb-2">
        <div className="text-base sm:text-lg font-semibold">Ready to lock and pay out?</div>
        <div className="text-xs sm:text-sm text-muted-foreground mt-1">Once locked, no further edits can be made. You'll process the payment outside of Fronted.</div>
      </div>
      <div className="flex flex-row gap-2 pt-2 sm:justify-end">
        <Button variant="outline" className="flex-1 sm:flex-initial">Go back</Button>
        <Button className="flex-1 sm:flex-initial">Lock &amp; approve</Button>
      </div>
    </div>
  );
}

export const DialogStory: Story = {
  name: "Dialog",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Components"
        status="Stable"
        title="Dialog"
        lead={<>
        Modal for a focused confirmation — verbatim from the payroll "lock &amp; pay out" modal. Kept
        narrow (sm:max-w-sm) with a left-aligned header and a two-button footer; the ✕ close sits top-right.
        </>}
      />

      <h3 style={eyebrow}>Live example</h3>
      <Dialog>
        <DialogTrigger asChild><Button size="sm" className="h-8 text-xs">Lock &amp; approve</Button></DialogTrigger>
        <DialogContent className="sm:max-w-sm p-5 sm:p-6">
          <DialogHeader className="text-left pb-2">
            <DialogTitle className="text-base sm:text-lg font-semibold">Ready to lock and pay out?</DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-muted-foreground mt-1">
              Once locked, no further edits can be made. You'll process the payment outside of Fronted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-row gap-2 sm:gap-2 pt-2 sm:justify-end">
            <Button variant="outline" className="flex-1 sm:flex-initial">Go back</Button>
            <Button className="flex-1 sm:flex-initial">Lock &amp; approve</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <h3 style={eyebrow}>Anatomy (F1v6_ApproveConfirmationModal)</h3>
      <DocTable head={["Part", "Example", "classes"]} w0={150} wLast={340} rows={[
        ["Full surface", <DialogPreview />, "content sm:max-w-sm p-5 sm:p-6 rounded-lg border bg-background shadow-lg · left-aligned"],
        ["Overlay", <span style={note}>dim scrim</span>, "fixed inset-0 z-50 bg-black/80 · fade in/out"],
        ["Header + title", <div className="w-[300px] max-w-full text-left"><div className="text-base sm:text-lg font-semibold">Ready to lock and pay out?</div></div>, "DialogHeader text-left pb-2 · title text-base sm:text-lg font-semibold"],
        ["Description", <div className="w-[300px] max-w-full text-left text-xs text-muted-foreground">Once locked, no further edits can be made.</div>, "text-xs sm:text-sm text-muted-foreground mt-1 · left-aligned"],
        ["Footer", <div className="flex gap-2"><Button variant="outline" className="flex-1 sm:flex-initial">Go back</Button><Button className="flex-1 sm:flex-initial">Lock &amp; approve</Button></div>, "flex-row gap-2 pt-2 sm:justify-end · Go back = outline, Lock &amp; approve = default (gradient) · flex-1 sm:flex-initial"],
        ["Close (✕)", <button className="text-muted-foreground opacity-70 hover:opacity-100"><X className="h-4 w-4" /></button>, "absolute right-4 top-4 opacity-70 hover:opacity-100 (built-in)"],
      ]} />
      <Guidance k="dialog" />
    </div>
  ),
};
