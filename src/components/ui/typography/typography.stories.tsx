import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Typography, type TypographyColor, type TypographyVariant } from "./typography";

/**
 * Components — Typography.
 * Every piece of text in new UI goes through this, one role per job. Headings in Clash Display,
 * everything else in Inter; sizes and line heights from typography.css, colour from semantic tokens.
 */
const meta: Meta<typeof Typography> = {
  title: "Components/Typography",
  component: Typography,
  tags: ["autodocs", "text", "heading", "body", "label", "caption", "atom"],
  parameters: { layout: "padded" },
  argTypes: { as: { control: false } },
};
export default meta;
type Story = StoryObj<typeof Typography>;

const ROLES: { v: TypographyVariant; use: string; sample: string }[] = [
  { v: "display", use: "One per page, hero moments", sample: "Payroll, without the paperwork" },
  { v: "h1", use: "Page title", sample: "Control Center" },
  { v: "h2", use: "Section title", sample: "Worker pipeline" },
  { v: "h3", use: "Card or panel title", sample: "Sweden’s rules" },
  { v: "h4", use: "Sub-section", sample: "Compliance, before the contract" },
  { v: "h5", use: "Group heading", sample: "Personal details" },
  { v: "h6", use: "Smallest heading", sample: "Bank" },
  { v: "body-lg", use: "Lead paragraph", sample: "Each country’s rules are set once and used by every client." },
  { v: "body", use: "Default text", sample: "Oskar sent his details today. Check compliance before the contract." },
  { v: "body-sm", use: "Dense text, tables", sample: "Acme Corp · Employee · starts 1 Dec 2026" },
  { v: "label", use: "Form labels, buttons", sample: "Work email" },
  { v: "caption", use: "Help text, meta", sample: "Used only for payslips." },
  { v: "overline", use: "Small group labels", sample: "Check compliance" },
];

/** Every role, largest to smallest, with what it's for */
export const Roles: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 20, maxWidth: 880 }}>
      {ROLES.map((r) => (
        <div key={r.v} style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 16, alignItems: "baseline", borderBottom: "1px solid var(--ds-color-border)", paddingBottom: 16 }}>
          <span>
            <Typography variant="label" as="span" style={{ display: "block", fontFamily: "var(--ds-font-mono)" }}>{r.v}</Typography>
            <Typography variant="caption">{r.use}</Typography>
          </span>
          <Typography variant={r.v}>{r.sample}</Typography>
        </div>
      ))}
    </div>
  ),
};

/** The one to try: change the role, colour and element in Controls */
export const Playground: Story = {
  args: { variant: "body", color: "default", children: "Details form sent to Erik", tabular: false },
};

const COLORS: TypographyColor[] = ["default", "heading", "strong", "muted", "disabled", "success", "warning", "danger"];
/** Text colours: semantic only, never a hex */
export const Colours: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 8 }}>
      {COLORS.map((c) => <Typography key={c} color={c}>{c}: Contract sent to Oskar to sign</Typography>)}
    </div>
  ),
};

/** Figures that line up in columns: amounts, counts and dates */
export const TabularFigures: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 4, width: 220 }}>
      {["SEK 41,250.00", "SEK 9,800.50", "SEK 112,004.10"].map((x) => <Typography key={x} variant="body" tabular style={{ textAlign: "right" }}>{x}</Typography>)}
    </div>
  ),
};
