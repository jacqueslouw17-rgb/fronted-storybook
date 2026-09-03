import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import "./tokens.css";
import "./typography.css";

/**
 * Introduction — the cover page for the Fronted — First Launch design system.
 * An editorial landing: what the system is, the two themes, the numbers, and where to go next.
 */
const meta: Meta = { title: "Introduction", parameters: { layout: "fullscreen" } };
export default meta;
type Story = StoryObj;

const page: React.CSSProperties = { fontFamily: "var(--ds-font-body)", color: "var(--ds-color-text)", maxWidth: 1040, margin: "0 auto", padding: "56px 40px 88px" };
const muted: React.CSSProperties = { color: "var(--ds-color-text-muted)" };

const NAV: { title: string; desc: string; href: string }[] = [
  { title: "Design Strategy", desc: "The 12 principles behind the system — why each screen behaves the way it does.", href: "/?path=/story/design-strategy--overview" },
  { title: "Foundations", desc: "Colour, type, spacing, radii, icons — and the theme brand roles.", href: "/?path=/story/foundations--colors" },
  { title: "Components", desc: "25 primitives — buttons, inputs, overlays — verbatim from the live flows.", href: "/?path=/story/components-button--buttons" },
  { title: "Patterns", desc: "Composed screens — pay breakdown, signing, contract preview, login.", href: "/?path=/story/patterns-login--login" },
  { title: "Inventory", desc: "Every component and pattern, with usage counts across the flows.", href: "/?path=/story/inventory--page" },
  { title: "Product Flows", desc: "The 6 First-Launch flows on demofronted.live — the source of truth.", href: "/?path=/story/product-flows--product-flows" },
  { title: "Governance", desc: "How the system is run — maturity labels, the contribution bar, versioning.", href: "/?path=/story/governance--overview" },
];

const STATS: [string, string][] = [
  ["25", "Components"],
  ["8", "Patterns"],
  ["12", "Principles"],
  ["2", "Themes"],
];

function NavCard({ n }: { n: (typeof NAV)[number] }) {
  return (
    <a href={n.href} target="_top" style={{ display: "flex", flexDirection: "column", gap: 8, textDecoration: "none", color: "var(--ds-color-text)", background: "var(--ds-color-surface)", border: "1px solid var(--ds-color-border)", borderRadius: 16, padding: "22px 24px", transition: "border-color .15s, transform .15s, box-shadow .15s" }}
       onMouseEnter={(e) => { const el = e.currentTarget; el.style.transform = "translateY(-3px)"; el.style.boxShadow = "0 12px 28px -14px rgba(16,24,40,0.22)"; el.style.borderColor = "var(--ds-color-border-strong)"; }}
       onMouseLeave={(e) => { const el = e.currentTarget; el.style.transform = "none"; el.style.boxShadow = "none"; el.style.borderColor = "var(--ds-color-border)"; }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 16, fontWeight: 600, color: "var(--ds-color-heading)" }}>{n.title}</span>
        <span style={{ color: "var(--ds-color-text-muted)", fontSize: 15 }}>→</span>
      </div>
      <span style={{ fontSize: 13.5, lineHeight: 1.55, ...muted }}>{n.desc}</span>
    </a>
  );
}

export const Overview: Story = {
  name: "Introduction",
  render: () => (
    <div style={page}>
      {/* eyebrow */}
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 18 }}>
        <span style={{ width: 7, height: 7, borderRadius: 999, background: "var(--ds-color-focus-ring)" }} />
        <span style={{ fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".13em", ...muted }}>Fronted Design System</span>
      </div>

      {/* hero */}
      <h1 style={{ fontFamily: "var(--ds-font-heading)", fontSize: 58, lineHeight: 1.02, letterSpacing: "-0.03em", fontWeight: 600, color: "var(--ds-color-heading)", margin: 0, maxWidth: 820 }}>
        First Launch
      </h1>
      <p style={{ fontSize: 19, lineHeight: 1.6, opacity: 0.85, maxWidth: 660, margin: "22px 0 0" }}>
        The component and pattern library behind Fronted's first launch — every element copied
        verbatim from the six live product flows, documented once, themeable in a switch.
      </p>

      {/* stats */}
      <div style={{ display: "flex", gap: 40, flexWrap: "wrap", margin: "40px 0 8px" }}>
        {STATS.map(([n, l]) => (
          <div key={l}>
            <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: 40, fontWeight: 600, lineHeight: 1, color: "var(--ds-color-heading)", letterSpacing: "-0.02em" }}>{n}</div>
            <div style={{ fontSize: 13, marginTop: 6, ...muted }}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{ height: 1, background: "var(--ds-color-border)", margin: "40px 0" }} />

      {/* two themes */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
        {([["interim", "First Launch", "The launch look — blue primary, dark focus ring. The default."],
           ["fronted", "Fronted Brand", "The real identity — yellow primary, teal accent and ring."]] as const).map(([t, label, desc]) => (
          <div key={t} data-theme={t} className="rounded-2xl border border-border bg-background" style={{ overflow: "hidden" }}>
            <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--ds-color-border)" }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ds-color-heading)" }}>{label}</div>
              <div style={{ fontSize: 13, marginTop: 4, ...muted }}>{desc}</div>
            </div>
            <div style={{ padding: 20, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <button style={{ height: 38, padding: "0 18px", borderRadius: "var(--ds-radius-button)", background: "var(--ds-action-primary-bg)", color: "var(--ds-action-primary-fg)", fontFamily: "var(--ds-font-ui)", fontSize: 14, fontWeight: 500, border: "none" }}>Primary</button>
              <button style={{ height: 38, padding: "0 16px", borderRadius: "var(--ds-radius-button)", background: "transparent", color: "var(--ds-color-text)", border: "1px solid var(--ds-color-border-strong)", fontSize: 14, fontWeight: 500 }}>Outline</button>
              <span style={{ fontSize: 12.5, padding: "3px 11px", borderRadius: 999, background: "var(--ds-color-surface-accent)", color: "var(--ds-color-text)", border: "1px solid var(--ds-color-border)" }}>Accent chip</span>
            </div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 13, margin: "14px 0 0", ...muted }}>
        Switch <b style={{ color: "var(--ds-color-text)" }}>Theme</b> in the toolbar above to reskin every page. Components read semantic tokens only — the swap is data, not rework.
      </p>

      {/* nav */}
      <div style={{ height: 1, background: "var(--ds-color-border)", margin: "40px 0" }} />
      <div style={{ fontSize: 11.5, textTransform: "uppercase", letterSpacing: ".1em", fontWeight: 700, color: "var(--ds-color-heading)", marginBottom: 16 }}>Explore</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
        {NAV.map((n) => <NavCard key={n.title} n={n} />)}
      </div>
    </div>
  ),
};
