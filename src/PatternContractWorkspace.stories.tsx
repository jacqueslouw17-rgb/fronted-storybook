import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ReviewDetailsForm } from "@/components/flows/contract-flow";
import { wrap, eyebrow, note, PageHeader } from "./_docTable";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Contract Workspace: "Review [name]'s Details", the first step of drafting a
 * contract (F1 v6.1, F1v6_ContractCreationScreen as rendered on /flows/contract-creation).
 */
const meta: Meta = { title: "Patterns/Contract Workspace", parameters: { layout: "padded" }, globals: { theme: "interim" } };
export default meta;
type Story = StoryObj;

export const ContractWorkspace: Story = {
  name: "Contract Workspace",
  render: () => (
    <div style={{ ...wrap, maxWidth: 1040 }}>
      <PageHeader category="Pattern" status="Stable" title="Contract Workspace — review details"
        lead={<>What Fronted knows about the candidate, to confirm before the contract is generated: <b>Personal Information</b> (open) and <b>Working Engagement</b> (role, country, type, start date, monthly fee with an EUR / USD toggle, work location), then <b>Review Agreement</b>. Composed from Input, Label, Badge, Checkbox, Select, Collapsible and Button.</>}
        meta="Verbatim from F1v6_ContractCreationScreen (fronted-admin-v6-1-clone)" />
      <h3 style={eyebrow}>Personal Information open</h3>
      <ReviewDetailsForm />
      <h3 style={eyebrow}>Working Engagement open</h3>
      <ReviewDetailsForm engagementOpen />
      <p style={{ ...note, marginTop: 16 }}>Sections rounded-xl border-border/30 bg-card/20 · header px-4 py-3 text-sm font-medium · fields space-y-1.5, label text-xs font-medium text-foreground/75, inputs h-10 · country pickers are outline buttons (combobox) · Review Agreement Button lg.</p>
    </div>
  ),
};
