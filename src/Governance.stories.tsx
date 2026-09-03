import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader, Section, DocTable, StatusChip, note } from "./_docTable";
import "./tokens.css";
import "./typography.css";

/**
 * Governance — how the system is run: maturity labels, the contribution bar,
 * versioning, ownership and the definition of done. The "we operate a system,
 * not a folder of components" layer.
 */
const meta: Meta = { title: "Governance", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const wrap: React.CSSProperties = { fontFamily: "var(--ds-font-body)", color: "var(--ds-color-text)", maxWidth: 1040, padding: "8px 8px 80px" };

function Step({ n, title, body }: { n: number; title: string; body: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 16, padding: "16px 0", borderTop: "1px solid var(--ds-color-border)" }}>
      <div style={{ flex: "none", width: 30, height: 30, borderRadius: 999, background: "var(--ds-color-surface-sunken)", border: "1px solid var(--ds-color-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "var(--ds-color-heading)" }}>{n}</div>
      <div>
        <div style={{ fontSize: 14.5, fontWeight: 600, color: "var(--ds-color-heading)" }}>{title}</div>
        <div style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--ds-color-text-muted)", marginTop: 3 }}>{body}</div>
      </div>
    </div>
  );
}

function Check({ children }: { children: React.ReactNode }) {
  return (
    <li style={{ display: "flex", gap: 10, padding: "9px 0", borderTop: "1px solid var(--ds-color-border)", fontSize: 14, lineHeight: 1.5 }}>
      <span style={{ flex: "none", width: 18, height: 18, borderRadius: 5, background: "var(--ds-feedback-success-bg)", color: "var(--ds-feedback-success-fg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>✓</span>
      <span>{children}</span>
    </li>
  );
}

export const Overview: Story = {
  name: "Governance",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="System"
        title="Governance"
        lead={<>How the system is run — the maturity labels, the bar every component clears, how it's versioned, and who owns it. The rules that keep one library trustworthy as it grows.</>}
        meta="Single source of truth: the 6 live flows on demofronted.live"
      />

      <Section title="Maturity labels" sub="Every component and pattern carries one. It tells a builder how safe the API is to depend on.">
        <DocTable head={["Label", "Meaning", "You can…"]} w0={150} rows={[
          [<StatusChip status="Stable" />, "Shipped in a live flow, reviewed, a11y-checked. API is settled.", "Build on it freely."],
          [<StatusChip status="Beta" />, "In use, but the API or visuals may still shift.", "Use it — expect minor changes; check the changelog."],
          [<StatusChip status="Deprecated" />, "Being retired. A replacement exists.", "Migrate off it; don't add new usages."],
          [<StatusChip status="Internal" />, "A building block for other components, not for app teams.", "Compose the public component instead."],
        ]} />
        <p style={{ ...note, marginTop: 12 }}>Today every component and pattern here is <b style={{ color: "var(--ds-color-text)" }}>Stable</b> — each was extracted verbatim from a shipped flow.</p>
      </Section>

      <Section title="How to add or change a component" sub="The bar is deliberately high: this library mirrors what actually ships, so it never drifts from the product.">
        <div>
          <Step n={1} title="Prove it exists in the product" body="A component enters the system only when it's real in one of the 6 flows. No speculative components — the live UI is the source of truth." />
          <Step n={2} title="Extract verbatim" body="Copy the real classes and structure from the flow source; never re-style from memory. Consume semantic tokens only (--ds-*) so it themes." />
          <Step n={3} title="Document every state" body="Build the states/variants table, the Do / Don't guidance, and the Accessibility section (keyboard, focus, contrast). A component isn't done until it's documented." />
          <Step n={4} title="Pass the checks" body="Zero axe violations in the a11y panel, AA contrast, and a clean typecheck. Verify it renders in both themes." />
          <Step n={5} title="Review & label" body="A design-system owner reviews against the definition of done, sets the maturity label, and notes the change in the changelog." />
        </div>
      </Section>

      <Section title="Definition of done" sub="A component ships only when all of these are true.">
        <ul style={{ listStyle: "none", margin: 0, padding: 0, borderBottom: "1px solid var(--ds-color-border)" }}>
          <Check>Extracted verbatim from a live flow — no invented styling.</Check>
          <Check>Uses semantic tokens only; swaps cleanly across both themes.</Check>
          <Check>Full state &amp; variant matrix documented in a table.</Check>
          <Check>Do / Don't usage guidance and a "when to use" line.</Check>
          <Check>Accessibility section: keyboard map, focus behaviour, contrast.</Check>
          <Check>Zero axe violations; text meets WCAG AA (4.5:1, or 3:1 for large).</Check>
          <Check>A maturity label and a changelog entry.</Check>
        </ul>
      </Section>

      <Section title="Versioning" sub="Semantic versioning against the documented API and visual contract.">
        <DocTable head={["Bump", "When", "Examples"]} w0={150} rows={[
          ["Major", "A breaking change to a component's API or a token's meaning.", "Rename a variant · remove a prop · repurpose a semantic token."],
          ["Minor", "Additive, backwards-compatible.", "New variant · new component · new token."],
          ["Patch", "Fixes with no API change.", "Contrast fix · spacing tweak · docs correction."],
        ]} />
      </Section>

      <Section title="Changelog" sub="Newest first. Every entry ties to a version.">
        <DocTable head={["Version", "Change", "Type"]} w0={110} rows={[
          ["1.3.0", "Introduction cover, Governance page, live a11y checks, Do/Don't + Accessibility on every component.", "Minor"],
          ["1.2.0", "Fronted Brand theme finalised; theme switch verified Foundations → Patterns.", "Minor"],
          ["1.1.0", "Login pattern added; Adjustment Request drawer; mobile responsiveness for Contract Preview.", "Minor"],
          ["1.0.0", "First Launch baseline — 25 components + 8 patterns, verbatim from the 6 flows, two themes.", "Major"],
        ]} />
      </Section>

      <Section title="Ownership" sub="Who keeps it honest.">
        <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "var(--ds-color-text)", maxWidth: 720 }}>
          Product Design owns the system and reviews every change against the definition of done. The 6 live flows on
          demofronted.live are the source of truth — when a flow changes, the system follows, not the other way around.
          Raise a change by pointing at the flow screen it comes from; that keeps the library and the product in lockstep.
        </p>
      </Section>
    </div>
  ),
};
