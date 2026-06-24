import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { ConfigPanel } from "./ConfigPanel";

/**
 * M1 · Panel — generic right slide-over template.
 * Two stories: Editable (labelled inputs + footer) and Read only (rows).
 * Switch Desktop / Tablet / Mobile from the viewport toolbar.
 */

function Demo({ readOnly = false }: { readOnly?: boolean }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        display: "grid",
        placeItems: "center",
        background: "var(--ds-color-bg)",
        fontFamily: "var(--ds-font-body)",
      }}
    >
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open panel
      </Button>
      <ConfigPanel open={open} onOpenChange={setOpen} readOnly={readOnly} />
    </div>
  );
}

const meta: Meta<typeof Demo> = {
  title: "Patterns/M1 · Panel",
  component: Demo,
  parameters: { layout: "fullscreen" },
  argTypes: { readOnly: { control: "boolean", name: "Read only" } },
};
export default meta;
type Story = StoryObj<typeof Demo>;

export const Editable: Story = { args: { readOnly: false } };
export const ReadOnly: Story = { name: "Read only", args: { readOnly: true } };
