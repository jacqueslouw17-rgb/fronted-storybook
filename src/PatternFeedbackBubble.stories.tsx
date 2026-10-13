import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FeedbackBubble as Bubble } from "@/components/flows/feedback-bubble";
import { wrap, eyebrow, note, PageHeader } from "./_docTable";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Feedback Bubble (verbatim from components/FeedbackBubble.tsx).
 */
const meta: Meta = { title: "Patterns/Feedback Bubble", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

export const FeedbackBubble: Story = {
  name: "Feedback Bubble",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        status="Stable"
        title="Feedback Bubble"
        lead={<>The floating Share feedback button, pinned bottom-right. It shows on the sign-in screen and older flows, and is hidden on the interim flow routes (F1 v6.1, F6 v4.1, F4.1 / F4.2 v8.1). Composed from Button.</>}
        meta="Verbatim from components/FeedbackBubble.tsx (default styling)"
      />

      <h3 style={eyebrow}>Default</h3>
      <Bubble fixed={false} />

      <p style={{ ...note, marginTop: 16 }}>Button ghost icon h-12 w-12 rounded-full · bg-primary/5 border-primary/20 shadow-card · MessageSquare h-4 w-4 text-primary/70 · hover scale-110 bg-primary/10 shadow-elevated · fixed bottom-8 right-8 z-[100] in the app.</p>
    </div>
  ),
};
