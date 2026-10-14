import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ContractDraftWorkspace } from "@/components/flows/contract-flow";
import { wrap, eyebrow, note, PageHeader } from "./_docTable";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Contract Preview: "Reviewing [name]'s Contract" (F1 v6.1, F1v6_ContractDraftWorkspace).
 */
const meta: Meta = { title: "Patterns/Contract Preview", parameters: { layout: "padded" }, globals: { theme: "interim" } };
export default meta;
type Story = StoryObj;

export const ContractPreview: Story = {
  name: "Contract Preview",
  render: () => (
    <div style={{ ...wrap, maxWidth: 1280 }}>
      <PageHeader category="Pattern" status="Stable" title="Contract Preview"
        lead={<>The contract as the worker will see it, beside the candidate's card (Personal and Contract Details), and the Edit history. Dynamic values are highlighted. <b>Confirm &amp; Continue</b> unlocks once the contract has been scrolled to the end; Reset, Edit and Upload sit above it. On a phone the candidate card collapses above the contract.</>}
        meta="Verbatim from F1v6_ContractDraftWorkspace (fronted-admin-v6-1-clone) · known issue: the payment clause reads “EUR SGD 12,000/mo”" />
      <h3 style={eyebrow}>Not read yet</h3>
      <ContractDraftWorkspace />
      <h3 style={eyebrow}>Read to the end</h3>
      <ContractDraftWorkspace readToEnd />
      <p style={{ ...note, marginTop: 16 }}>Sidebar w-80 (lg+) · contract lg:h-[700px] rounded-lg border · toolbar bg-muted/80 · values bg-yellow-200 font-semibold · footer Back (outline) and Confirm &amp; Continue (disabled until the end) with “Scroll to end to confirm”.</p>
    </div>
  ),
};
