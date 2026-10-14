import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ResetContractDialog, UploadContractDialog } from "@/components/flows/contract-flow";
import { ContractRichTextEditor } from "@/components/flows/contract-editor";
import { wrap, eyebrow, note, PageHeader } from "./_docTable";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Contract Actions: what the admin can do to a drafted contract — edit it, reset it
 * to the template, or replace it with an upload (F1 v6.1, F1v6_ContractDraftWorkspace).
 */
const meta: Meta = { title: "Patterns/Contract Actions", parameters: { layout: "padded" }, globals: { theme: "interim" } };
export default meta;
type Story = StoryObj;

const SAMPLE = "<h2>Contractor Agreement</h2><p>This Contract is between Fronted AS, a Norwegian Company, and Marcus Chen, Singapore (the \"Contractor\").</p><h2>1. Work and payment</h2><p>The Client is contracting the services of the Contractor to do the following: Senior Backend Engineer.</p>";

export const ContractEditor: Story = {
  name: "Contract editor",
  render: function Render() {
    const [html, setHtml] = React.useState(SAMPLE);
    return (
      <div style={{ ...wrap, maxWidth: 1040 }}>
        <PageHeader category="Pattern" status="Stable" title="Contract editor"
          lead={<>Edit mode for a drafted contract: a toolbar (text style, bold, italic, underline, strike, lists, alignment, clear formatting) over the contract. The bar above says edits apply only to this worker; <b>Save Changes</b> is disabled while the contract is empty (“cannot be empty”).</>}
          meta="Verbatim from contract-flow/ContractRichTextEditor (Tiptap) · known issue: values show as {{hl}}…{{/hl}} while editing" />
        <div style={{ height: 360, border: "1px solid var(--ds-color-border)", borderRadius: 8, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <ContractRichTextEditor content={html} onChange={setHtml} className="border-0 rounded-none flex-1 min-h-0" />
        </div>
      </div>
    );
  },
};

export const ResetDialog: Story = {
  name: "Reset dialog",
  render: () => (
    <div style={{ ...wrap, maxWidth: 1040 }}>
      <PageHeader category="Pattern" status="Stable" title="Reset contract"
        lead={<>Regenerates the contract from the template with the current worker data, discarding manual edits. While it runs the contract shows a skeleton and “Regenerating contract from template…”, then “Contract reset to original”. Reset stays disabled until something changes again.</>}
        meta="AlertDialog · F1v6_ContractDraftWorkspace" />
      <ResetContractDialog open onOpenChange={() => {}} onReset={() => {}} />
    </div>
  ),
};

export const UploadDialog: Story = {
  name: "Upload dialog",
  render: () => (
    <div style={{ ...wrap, maxWidth: 1040 }}>
      <PageHeader category="Pattern" status="Stable" title="Upload contract"
        lead={<>Replaces the contract with a finalised file for this worker only (the country template stays unchanged): drop or browse a PDF, DOC or DOCX up to 10 MB, then <b>Upload contract</b>. Refused files (wrong type, too large) and failed imports show inline, with <b>Try again</b>.</>}
        meta="Verbatim from contract-flow/ContractUploadDialog" />
      <h3 style={eyebrow}>Empty</h3>
      <UploadContractDialog open onOpenChange={() => {}} workerName="Marcus Chen" countryLabel="Singapore" />
      <p style={{ ...note, marginTop: 16 }}>Messages: “Upload a PDF, DOC or DOCX file.” · “File must be 10 MB or smaller.” · “Something went wrong while importing the contract. Try again.” · “We couldn't import this contract…”</p>
    </div>
  ),
};
