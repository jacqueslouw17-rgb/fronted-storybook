import * as React from "react";
import "./tokens.css";
import "./typography.css";
import type { Meta, StoryObj } from "@storybook/react";

/**
 * Brand — a single designed canvas of Fronted's strategy, on the Fronted brand.
 * Distilled from the CEO's "This is Fronted" (Notion · Company Overview) and fronted.com.
 * Read-only mirror — the living source stays in Notion. Locked to the Fronted brand identity.
 */
const meta: Meta = { title: "Brand", parameters: { layout: "fullscreen" } };
export default meta;
type Story = StoryObj;

/* brand tokens (Fronted :root) */
const YELLOW = "var(--ds-action-primary-bg)";       // brand yellow
const YELLOW_TINT = "var(--ds-color-surface-accent)"; // yellow-50
const TEAL = "var(--ds-color-focus-ring)";           // teal accent
const INK = "var(--ds-color-heading)";
const BORDER = "var(--ds-color-border)";
const MUTED = "var(--ds-color-text-muted)";
const LOGO = "https://cdn.prod.website-files.com/683ed5bafb6d925e61d1e818/68652122561ff150f9475f5d_Asset%2031%402x.avif";

const heading = (s: React.CSSProperties = {}): React.CSSProperties => ({ fontFamily: "var(--ds-font-heading)", color: INK, ...s });
const label: React.CSSProperties = { fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: TEAL };

/* a canvas cell: label chip + content, grid lines drawn by the board */
function Cell({ span = 2, tint, children, style }: { span?: number; tint?: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ gridColumn: `span ${span}`, borderRight: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: 22, background: tint ?? "transparent", minWidth: 0, ...style }}>
      {children}
    </div>
  );
}
const cellLabel = (t: string) => <div style={{ ...label, marginBottom: 10 }}>{t}</div>;

const MODULES = [
  { stage: "Starter", name: "Recruitment", who: "First hire abroad", body: "Source and recruit talent in the country, market or timezone you need. The entry point that converts into EOR & Entity.", tint: TEAL },
  { stage: "Growth", name: "EOR + COR", who: "Build your team", body: "Hire employees or contractors with no local entity — contracts, payroll, benefits & compliance, one invoice a month.", tint: "#16a34a" },
  { stage: "Scale", name: "Entity as a Service", who: "Own your entity", body: "We set up & run your local entity across 40+ countries — bookkeeping, VAT, payroll, accounts, tax, compliance.", tint: "#7c3aed" },
];
const PILLARS: [string, string][] = [
  ["One partner, not ten vendors", "Recruitment, employment & entity in one system — no patchwork."],
  ["Compliant by design", "Nordic standards, applied globally. No surprises."],
  ["Fast execution", "Speed & flexibility are the advantage — without shortcuts."],
  ["The human touch", "When stakes are high, real people — not chatbots."],
  ["Always productising", "Every repeatable manual process becomes a product."],
];
const BEHAVIOURS = ["Be a good person", "Always be productising", "Take action, now", "Stay curious", "Be authentic"];
const VOICE_DO = ["Clear & direct — plain language", "Warm & human — a person, not an account", "Confident, not hype — proof over adjectives", "Transparent — no surprises"];
const VOICE_DONT = ["Corporate or legalistic wording", "Salesy superlatives & over-promising", "Cold, faceless “platform” tone", "Hiding cost, effort or caveats"];
const STATS: [string, string][] = [["$100M", "ARR (2031)"], ["5,000", "on EOR"], ["1,000+", "entity customers"], ["125%+", "net revenue retention"]];

export const BrandPage: Story = {
  name: "Brand",
  render: () => (
    <div data-theme="fronted" style={{ fontFamily: "var(--ds-font-body)", color: "var(--ds-color-text)", background: "var(--ds-color-surface-sunken, #fafafa)", minHeight: "100vh", padding: "40px 32px 72px" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>

        {/* Board */}
        <div style={{ border: `1px solid ${BORDER}`, borderRadius: 22, overflow: "hidden", background: "var(--ds-color-surface)", boxShadow: "0 24px 60px -30px rgba(16,24,40,0.28)" }}>

          {/* Header band */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24, flexWrap: "wrap", padding: "26px 28px", borderBottom: `1px solid ${BORDER}`, background: YELLOW_TINT }}>
            <div style={{ minWidth: 0 }}>
              <img src={LOGO} alt="Fronted" style={{ height: 30, width: "auto", display: "block", marginBottom: 12 }} />
              <div style={{ ...label, color: INK, opacity: 0.6, marginBottom: 12 }}>Brand Canvas</div>
              <h1 style={heading({ fontSize: 34, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.1, margin: 0 })}>The only partner you need to go global.</h1>
            </div>
            <div style={{ maxWidth: 300, borderLeft: `3px solid ${YELLOW}`, paddingLeft: 16 }}>
              <div style={{ ...label, marginBottom: 6 }}>Mission</div>
              <p style={heading({ fontSize: 16, fontWeight: 600, lineHeight: 1.35, margin: 0 })}>Make operating in any country as easy as operating at home.</p>
            </div>
          </div>

          {/* Canvas grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", borderTop: `1px solid ${BORDER}` }}>

            {/* Vision — full width */}
            <Cell span={6} style={{ borderRight: "none" }}>
              {cellLabel("Vision · the 2031 ambition")}
              <p style={{ fontSize: 15.5, lineHeight: 1.55, margin: 0 }}>
                <b style={{ color: INK }}>The global company operating system.</b> The one partner you need to go global — instead of five per country. The infrastructure layer that puts international operations on autopilot. <span style={{ color: MUTED }}>Not a consultancy or a point solution.</span>
              </p>
            </Cell>

            {/* Growth ladder — full width, 3 connected stages */}
            <Cell span={6} style={{ borderRight: "none" }}>
              {cellLabel("The growth ladder · one partner, from first hire to your own entity")}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginTop: 4 }}>
                {MODULES.map((m, i) => (
                  <div key={m.name} style={{ position: "relative", border: `1px solid ${BORDER}`, borderRadius: 14, padding: "16px 16px 18px", background: "var(--ds-color-surface)" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, borderTopLeftRadius: 14, borderTopRightRadius: 14, background: m.tint }} />
                    {i < 2 && <div style={{ position: "absolute", right: -12, top: "50%", transform: "translateY(-50%)", color: MUTED, fontSize: 16, zIndex: 1 }}>→</div>}
                    <div style={{ display: "inline-block", ...label, color: m.tint, border: `1px solid ${m.tint}`, borderRadius: 999, padding: "2px 8px", marginBottom: 8 }}>{m.stage}</div>
                    <div style={heading({ fontSize: 17, fontWeight: 600, margin: "0 0 1px" })}>{m.name}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: MUTED, marginBottom: 8 }}>{m.who}</div>
                    <p style={{ fontSize: 12.5, lineHeight: 1.5, color: MUTED, margin: 0 }}>{m.body}</p>
                  </div>
                ))}
              </div>
            </Cell>

            {/* Problem → Positioning → Audience */}
            <Cell span={2}>
              {cellLabel("The problem · why we exist")}
              <p style={{ fontSize: 13, lineHeight: 1.55, margin: 0, color: MUTED }}>
                Going global is slow and risky. Companies <b style={{ color: INK }}>stitch together a provider per country</b> — recruiters, lawyers, payroll, accountants, EOR — with no single system, and carry the compliance risk themselves.
              </p>
            </Cell>
            <Cell span={2}>
              {cellLabel("Positioning · what we are")}
              <p style={{ fontSize: 13, lineHeight: 1.55, margin: 0, color: MUTED }}>
                <b style={{ color: INK }}>One partner</b> for recruitment, employment and entity setup &amp; management — so growth companies go abroad fast and compliant, without the patchwork.
              </p>
            </Cell>
            <Cell span={2} style={{ borderRight: "none" }}>
              {cellLabel("Audience · who it's for")}
              <p style={{ fontSize: 13, lineHeight: 1.55, margin: 0, color: MUTED }}>
                Forward-leaning <b style={{ color: INK }}>growth companies &amp; scale-ups</b> — Nordics first, EU &amp; U.S. Founders/CEOs and People/HR leaders — and the <b style={{ color: INK }}>workers</b>: paid correctly, on time, with a human on the other end.
              </p>
            </Cell>

            {/* Pillars — full width, 5 across */}
            <Cell span={6} style={{ borderRight: "none" }}>
              {cellLabel("Brand pillars · why growth companies choose Fronted")}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginTop: 4 }}>
                {PILLARS.map(([t, d]) => (
                  <div key={t} style={{ borderTop: `2px solid ${YELLOW}`, paddingTop: 10 }}>
                    <div style={heading({ fontSize: 13.5, fontWeight: 600, marginBottom: 3, lineHeight: 1.25 })}>{t}</div>
                    <p style={{ fontSize: 12, lineHeight: 1.45, color: MUTED, margin: 0 }}>{d}</p>
                  </div>
                ))}
              </div>
            </Cell>

            {/* Behaviours + Voice */}
            <Cell span={3}>
              {cellLabel("Behaviours · how the team shows up")}
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 2 }}>
                {BEHAVIOURS.map((b, i) => (
                  <div key={b} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ width: 20, height: 20, borderRadius: 6, background: YELLOW_TINT, color: INK, display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--ds-font-heading)", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                    <span style={{ fontSize: 13.5, color: INK, fontWeight: 500 }}>{b}</span>
                  </div>
                ))}
              </div>
            </Cell>
            <Cell span={3} style={{ borderRight: "none" }}>
              {cellLabel("Voice & tone · Nordic mindset, every word")}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <div style={{ ...label, color: "#16a34a", marginBottom: 6 }}>Do</div>
                  {VOICE_DO.map((x) => <p key={x} style={{ fontSize: 11.5, lineHeight: 1.4, color: MUTED, margin: "0 0 6px" }}>{x}</p>)}
                </div>
                <div>
                  <div style={{ ...label, color: "#dc2626", marginBottom: 6 }}>Don't</div>
                  {VOICE_DONT.map((x) => <p key={x} style={{ fontSize: 11.5, lineHeight: 1.4, color: MUTED, margin: "0 0 6px" }}>{x}</p>)}
                </div>
              </div>
            </Cell>

          </div>

          {/* Footer band — stats + source */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap", padding: "20px 28px", borderTop: `1px solid ${BORDER}`, background: YELLOW_TINT }}>
            <div style={{ display: "flex", gap: 30, flexWrap: "wrap" }}>
              {STATS.map(([n, l]) => (
                <div key={l}>
                  <div style={heading({ fontSize: 22, fontWeight: 700, lineHeight: 1, letterSpacing: "-0.01em" })}>{n}</div>
                  <div style={{ fontSize: 11, color: MUTED, marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11.5, color: MUTED, maxWidth: 320, textAlign: "right" }}>
              Distilled from <a href="https://app.notion.com/p/This-is-Fronted-1cbe1940ba3881aba56cd1f62d44ddc6" target="_blank" rel="noreferrer" style={{ color: INK, fontWeight: 600 }}>“This is Fronted”</a> &amp; <a href="https://fronted.com" target="_blank" rel="noreferrer" style={{ color: INK, fontWeight: 600 }}>fronted.com</a>.
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
