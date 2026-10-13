import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TrackerLoading as Loading } from "@/components/flows/tracker-loading";
import { wrap, eyebrow, note, PageHeader } from "./_docTable";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Tracker Loading (verbatim from components/flows/shared/TrackerLoadingState).
 */
const meta: Meta = { title: "Patterns/Tracker Loading", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

export const TrackerLoading: Story = {
  name: "Tracker Loading",
  render: () => (
    <div style={{ ...wrap, maxWidth: 1240 }}>
      <PageHeader
        category="Pattern"
        status="Stable"
        title="Tracker Loading"
        lead={<>What the Workers tracker shows while workers load: four column placeholders, each a header bar over three card placeholders. The heading and the Workers | Payroll switch stay visible above it. Composed from Skeleton.</>}
        meta="Verbatim from components/flows/shared/TrackerLoadingState"
      />

      <h3 style={eyebrow}>Loading</h3>
      <Loading />

      <p style={{ ...note, marginTop: 16 }}>grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 · column header p-3 rounded-lg border-border/50 bg-card/50 (Skeleton h-4 w-28 + h-5 w-5 rounded-full) · card p-4 rounded-lg bg-card/40 h-28 (avatar h-8 w-8, line h-4 w-28, lines h-3 full and 2/3).</p>
    </div>
  ),
};
