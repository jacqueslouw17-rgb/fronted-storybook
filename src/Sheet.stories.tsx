import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import { Guidance } from "./guidance";
import "./tokens.css";
import "./typography.css";

/**
 * Components — Sheet / Drawer (Radix Dialog, verbatim ui/sheet).
 * The right-side drawer — the workhorse of the flows (worker detail, configure, add
 * candidate, breakdowns). Standard flow className positions the close button
 * ([&>button.absolute]:top-[19px] right-5), sets width per drawer and p-0 with a flex
 * column for a sticky header + scrolling body + footer.
 */
const meta: Meta = { title: "Components/Sheet", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const sheetCls = "[&>button.absolute]:top-[19px] [&>button.absolute]:right-5 w-full sm:w-[520px] sm:max-w-[520px] p-0 flex flex-col overflow-hidden";

export const SheetStory: Story = {
  name: "Sheet",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Components"
        status="Stable"
        title="Sheet / Drawer"
        lead={<>
        The right-side drawer — the workhorse of the flows (worker detail, configure, add candidate,
        breakdowns). Full-width on mobile, fixed width on desktop, with a sticky header and a scrolling body.
        </>}
      />

      <h3 style={eyebrow}>Live example — Configure drawer (sm:520px)</h3>
      <Sheet>
        <SheetTrigger asChild><Button variant="outline" size="sm" className="h-8 text-xs">Open drawer</Button></SheetTrigger>
        <SheetContent side="right" className={sheetCls}>
          <div className="px-5 py-4 border-b border-border/40">
            <SheetHeader className="space-y-0 text-left">
              <SheetTitle className="text-base">Configure — Anika Lindqvist</SheetTitle>
              <SheetDescription className="text-xs">Frontend Engineer · Norway · EOR</SheetDescription>
            </SheetHeader>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="s-role" className="text-xs font-medium text-foreground/75">Job title</Label>
              <Input id="s-role" defaultValue="Frontend Engineer" className="h-10" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="s-salary" className="text-xs font-medium text-foreground/75">Monthly salary</Label>
              <Input id="s-salary" defaultValue="NOK 65,000" className="h-10" />
            </div>
          </div>
          <div className="px-5 py-4 border-t border-border/40 flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 h-9 text-xs">Cancel</Button>
            <Button size="sm" className="flex-1 h-9 text-xs bg-gradient-primary">Save</Button>
          </div>
        </SheetContent>
      </Sheet>

      <h3 style={eyebrow}>Anatomy (flex column, side=right)</h3>
      <DocTable head={["Part", "Detail", "classes"]} w0={150} wLast={340} rows={[
        ["Content shell", "full-height flex column", "[&>button.absolute]:top-[19px] right-5 · p-0 flex flex-col overflow-hidden"],
        ["Sticky header", "title + description", "px-5 py-4 border-b border-border/40 · title text-base · desc text-xs"],
        ["Scrolling body", "form / sections", "flex-1 overflow-y-auto px-5 py-4 space-y-4"],
        ["Footer", "cancel + gradient save", "px-5 py-4 border-t border-border/40 flex gap-2 · buttons flex-1 h-9"],
        ["Overlay + close", "scrim + ✕", "bg-black/80 · built-in ✕ repositioned top-[19px] right-5"],
      ]} />

      <h3 style={eyebrow}>Widths (all w-full on mobile)</h3>
      <DocTable head={["Desktop width", "Class", "Use"]} w0={140} wLast={260} rows={[
        ["Compact", "sm:max-w-[420px] / sm:w-[420px]", "confirm · short forms (15×)"],
        ["Standard", "sm:w-[440px] / sm:w-[480px]", "worker detail · add candidate"],
        ["Wide", "sm:w-[520px] / sm:max-w-[520px]", "configure · data collection (12×)"],
        ["Extra-wide", "sm:max-w-xl / sm:max-w-2xl", "breakdowns · agreement viewer (11×)"],
        ["Token", "sm:max-w-md / sm:max-w-lg", "shadcn presets where used"],
      ]} />
      <p style={{ ...note, marginTop: 10 }}>Mobile is always full-width (w-full, 74×). Widen the pane to see the drawer take its desktop width.</p>
      <Guidance k="sheet" />
    </div>
  ),
};
