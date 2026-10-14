import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ContractReviewBoard, FrostedHeader, SentToast } from "@/components/flows/contract-flow";
import { wrap, eyebrow, note, PageHeader } from "./_docTable";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Contract Review: the last step of drafting (ContractReviewBoard), the bar over the
 * contract pages (FrostedHeader) and the toast after sending.
 */
const meta: Meta = { title: "Patterns/Contract Review", parameters: { layout: "padded" }, globals: { theme: "interim" } };
export default meta;
type Story = StoryObj;

export const ReviewBoard: Story = {
  name: "Review board",
  render: () => (
    <div style={{ ...wrap, maxWidth: 1040 }}>
      <PageHeader category="Pattern" status="Stable" title="Review contracts"
        lead={<>Every drafted contract, one card each (name, flag, role · country, fee and start date), then <b>Previous</b> or <b>Send for Signature</b>. Sending moves the candidates to Waiting for Signature on the pipeline.</>}
        meta="Verbatim from contract-flow/ContractReviewBoard" />
      <ContractReviewBoard />
    </div>
  ),
};

export const FrostedHeaderStory: Story = {
  name: "Frosted Header",
  render: () => (
    <div style={{ ...wrap, maxWidth: 1040 }}>
      <PageHeader category="Pattern" status="Stable" title="Frosted header"
        lead={<>The bar over the contract pages: the Fronted logo and a close button, pinned to the top; it frosts once the page scrolls.</>}
        meta="Verbatim from shared/FrostedHeader" />
      <div style={{ position: "relative", height: 96, transform: "translateZ(0)", border: "1px solid var(--ds-color-border)", borderRadius: 12, overflow: "hidden" }}>
        <FrostedHeader />
      </div>
      <p style={{ ...note, marginTop: 16 }}>fixed top-0 inset-x-0 z-50 px-6 sm:px-8 py-4 sm:py-6 · logo h-5 sm:h-6 · close ghost icon h-8 w-8 sm:h-10 sm:w-10.</p>
    </div>
  ),
};

export const SentToastStory: Story = {
  name: "Sent toast",
  render: () => (
    <div style={{ ...wrap, maxWidth: 1040, minHeight: 320 }}>
      <PageHeader category="Pattern" status="Stable" title="Sent for signature"
        lead={<>The toast after Send for Signature: bottom-right on desktop, top on a phone.</>}
        meta="Toast · title text-sm font-semibold · description text-sm opacity-90" />
      <h3 style={eyebrow}>Toast</h3>
      {/* The toast is fixed to the viewport; a transformed frame keeps it in place here. */}
      <div style={{ position: "relative", height: 150, transform: "translateZ(0)", overflow: "hidden", border: "1px solid var(--ds-color-border)", borderRadius: 12 }}>
        <SentToast />
      </div>
    </div>
  ),
};
