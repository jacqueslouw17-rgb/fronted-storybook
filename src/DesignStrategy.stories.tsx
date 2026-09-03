import type { Meta, StoryObj } from "@storybook/react";
import { sWrap, PrincipleCardGrid } from "./principles";
import { PageHeader } from "./_docTable";
import "./tokens.css";
import "./typography.css";

/**
 * Design Strategy — the "why" layer above Foundations, Components and Patterns.
 * Overview = the principle cards. Each card opens a principle's tabbed anatomy.
 */
const meta: Meta = { title: "Design Strategy", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <div style={{ ...sWrap, maxWidth: 1240 }}>
      <PageHeader
        category="Design Strategy"
        title="Design Strategy"
        lead="The principles behind the system. Each states an intent and carries the same anatomy — open one to step through it."
        meta="Tier A (1–4) = how a screen behaves · Tier B (5–12) = what an EOR product must be"
      />
      <div style={{ height: 20 }} />
      <PrincipleCardGrid />
    </div>
  ),
};
