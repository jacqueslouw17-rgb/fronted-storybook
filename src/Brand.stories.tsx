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
const YELLOW = "var(--ds-action-primary-bg)";        // brand yellow
const YELLOW_TINT = "var(--ds-color-surface-accent)"; // yellow-50
const TEAL = "var(--ds-color-focus-ring)";            // teal accent
const INK = "var(--ds-color-heading)";
const BORDER = "var(--ds-color-border)";
const MUTED = "var(--ds-color-text-muted)";
const SURFACE = "var(--ds-color-surface)";
const LOGO = "https://cdn.prod.website-files.com/683ed5bafb6d925e61d1e818/68652122561ff150f9475f5d_Asset%2031%402x.avif";

const heading = (s: React.CSSProperties = {}): React.CSSProperties => ({ fontFamily: "var(--ds-font-heading)", color: INK, ...s });
const label: React.CSSProperties = { fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: TEAL };

/* a spacious section band */
function Section({ children, tint, last }: { children: React.ReactNode; tint?: string; last?: boolean }) {
  return <div style={{ padding: "34px 44px", borderBottom: last ? "none" : `1px solid ${BORDER}`, background: tint ?? "transparent" }}>{children}</div>;
}
const secLabel = (t: string, sub?: string) => (
  <div style={{ marginBottom: 20 }}>
    <div style={label}>{t}</div>
    {sub && <div style={{ fontSize: 13.5, color: MUTED, marginTop: 6, maxWidth: 760 }}>{sub}</div>}
  </div>
);
function Box({ children, tint, accent }: { children: React.ReactNode; tint?: string; accent?: string }) {
  return (
    <div style={{ position: "relative", border: `1px solid ${BORDER}`, borderRadius: 16, padding: "22px 24px", background: tint ?? SURFACE, overflow: "hidden", height: "100%", boxSizing: "border-box" }}>
      {accent && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: accent }} />}
      {children}
    </div>
  );
}
const boxLabel = (t: string) => <div style={{ ...label, marginBottom: 10 }}>{t}</div>;

const MODULES = [
  { stage: "Starter", name: "Recruitment", who: "First hire abroad", body: "Source and recruit key talent in the country, market or timezone you need. The entry point that converts naturally into EOR and Entity.", tint: TEAL },
  { stage: "Growth", name: "EOR + COR", who: "Build your team", body: "Hire employees or contractors with no local entity — contracts, payroll, benefits and compliance handled, one invoice a month.", tint: "#16a34a" },
  { stage: "Scale", name: "Entity as a Service", who: "Own your entity", body: "We set up and run your local entity across 40+ countries — bookkeeping, VAT, payroll, accounts, tax filings, compliance. On autopilot.", tint: "#7c3aed" },
];
const PILLARS: [string, string][] = [
  ["One partner, not ten vendors", "Recruitment, employment and entity in one system — no patchwork of providers."],
  ["Compliant by design", "Nordic standards applied globally: clear processes, transparency, trust — no surprises."],
  ["Fast execution", "Speed and flexibility are the core advantage. Move fast, without shortcuts."],
  ["The human touch", "When the stakes are high, customers reach experienced people — not chatbots."],
  ["Always productising", "A software-enabled service: every repeatable manual process becomes a product."],
];
const BEHAVIOURS = ["Be a good person", "Always be productising", "Take action, now", "Stay curious", "Be authentic"];
const VOICE_DO = ["Clear & direct — plain language, no jargon", "Warm & human — a person, not an account", "Confident, not hype — proof over adjectives", "Transparent — set expectations, no surprises"];
const VOICE_DONT = ["Corporate or legalistic wording", "Salesy superlatives & over-promising", "Cold, faceless “platform” tone", "Hiding cost, effort or caveats"];
const STATS: [string, string][] = [["$100M", "ARR ambition (2031)"], ["5,000", "employees on EOR"], ["1,000+", "entity customers"], ["125%+", "net revenue retention"]];

function Arrow() {
  return (
    <div style={{ flex: "0 0 44px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 34, height: 34, borderRadius: 999, background: YELLOW_TINT, border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", color: INK, fontSize: 17, fontWeight: 700, lineHeight: 1 }}>→</div>
    </div>
  );
}

export const BrandPage: Story = {
  name: "Brand",
  render: () => (
    <div data-theme="fronted" style={{ fontFamily: "var(--ds-font-body)", color: "var(--ds-color-text)", background: "var(--ds-color-surface-sunken, #fafafa)", minHeight: "100vh", padding: "48px 32px 80px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", border: `1px solid ${BORDER}`, borderRadius: 24, overflow: "hidden", background: SURFACE, boxShadow: "0 30px 70px -34px rgba(16,24,40,0.30)" }}>

        {/* Header */}
        <Section tint={YELLOW_TINT}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}>
            <div style={{ minWidth: 260, flex: "1 1 480px" }}>
              <img src={LOGO} alt="Fronted" style={{ height: 32, width: "auto", display: "block", marginBottom: 16 }} />
              <div style={{ ...label, color: INK, opacity: 0.55, marginBottom: 16 }}>Brand Canvas</div>
              <h1 style={heading({ fontSize: 42, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.06, margin: 0, maxWidth: 600 })}>The only partner you need to go global.</h1>
            </div>
            <div style={{ flex: "0 1 320px", borderLeft: `3px solid ${YELLOW}`, paddingLeft: 20, alignSelf: "center" }}>
              <div style={{ ...label, marginBottom: 8 }}>Mission</div>
              <p style={heading({ fontSize: 18, fontWeight: 600, lineHeight: 1.4, margin: 0 })}>Make operating in any country as easy as operating at home.</p>
            </div>
          </div>
        </Section>

        {/* Vision */}
        <Section>
          {secLabel("Vision · the 2031 ambition")}
          <p style={{ fontSize: 17, lineHeight: 1.6, margin: 0, maxWidth: 860 }}>
            <b style={{ color: INK }}>The global company operating system.</b> The one partner you need to go global — instead of five per country. The infrastructure layer that puts international operations on autopilot. <span style={{ color: MUTED }}>Not a consultancy or a point solution.</span>
          </p>
        </Section>

        {/* Growth ladder — centrepiece */}
        <Section>
          {secLabel("The growth ladder", "One partner, from first hire to your own entity. Start where you are — no vendor switching as you grow.")}
          <div style={{ display: "flex", alignItems: "stretch", gap: 0, minWidth: 0 }}>
            {MODULES.map((m, i) => (
              <React.Fragment key={m.name}>
                <div style={{ flex: "1 1 0", minWidth: 0 }}>
                  <Box accent={m.tint}>
                    <span style={{ display: "inline-block", ...label, color: m.tint, border: `1px solid ${m.tint}`, borderRadius: 999, padding: "3px 10px", marginBottom: 12 }}>{m.stage}</span>
                    <div style={heading({ fontSize: 21, fontWeight: 600, margin: "0 0 2px" })}>{m.name}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: MUTED, marginBottom: 12 }}>{m.who}</div>
                    <p style={{ fontSize: 13.5, lineHeight: 1.6, color: MUTED, margin: 0 }}>{m.body}</p>
                  </Box>
                </div>
                {i < MODULES.length - 1 && <Arrow />}
              </React.Fragment>
            ))}
          </div>
        </Section>

        {/* Problem → Positioning → Audience */}
        <Section>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            <Box>
              {boxLabel("The problem · why we exist")}
              <p style={{ fontSize: 13.5, lineHeight: 1.6, margin: 0, color: MUTED }}>Going global is slow and risky. Companies <b style={{ color: INK }}>stitch together a provider per country</b> — recruiters, lawyers, payroll, accountants, EOR — with no single system, and carry the compliance risk themselves.</p>
            </Box>
            <Box>
              {boxLabel("Positioning · what we are")}
              <p style={{ fontSize: 13.5, lineHeight: 1.6, margin: 0, color: MUTED }}><b style={{ color: INK }}>One partner</b> for recruitment, employment and entity setup &amp; management — so growth companies go abroad fast and compliant, without the patchwork.</p>
            </Box>
            <Box>
              {boxLabel("Audience · who it's for")}
              <p style={{ fontSize: 13.5, lineHeight: 1.6, margin: 0, color: MUTED }}>Forward-leaning <b style={{ color: INK }}>growth companies &amp; scale-ups</b> — Nordics first, EU &amp; U.S. Founders/CEOs and People/HR leaders — and the <b style={{ color: INK }}>workers</b>, paid correctly and on time.</p>
            </Box>
          </div>
        </Section>

        {/* Pillars */}
        <Section>
          {secLabel("Brand pillars · why growth companies choose Fronted")}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 18 }}>
            {PILLARS.map(([t, d]) => (
              <div key={t} style={{ borderTop: `2px solid ${YELLOW}`, paddingTop: 12 }}>
                <div style={heading({ fontSize: 14.5, fontWeight: 600, marginBottom: 5, lineHeight: 1.3 })}>{t}</div>
                <p style={{ fontSize: 12.5, lineHeight: 1.5, color: MUTED, margin: 0 }}>{d}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Behaviours + Voice */}
        <Section>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
            <div>
              {secLabel("Behaviours · how the team shows up")}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {BEHAVIOURS.map((b, i) => (
                  <div key={b} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ width: 24, height: 24, borderRadius: 7, background: YELLOW_TINT, color: INK, display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--ds-font-heading)", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                    <span style={{ fontSize: 14.5, color: INK, fontWeight: 500 }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              {secLabel("Voice & tone · Nordic mindset, applied to every word")}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                <div>
                  <div style={{ ...label, color: "#16a34a", marginBottom: 10 }}>Do</div>
                  {VOICE_DO.map((x) => <p key={x} style={{ fontSize: 12.5, lineHeight: 1.5, color: MUTED, margin: "0 0 10px" }}>{x}</p>)}
                </div>
                <div>
                  <div style={{ ...label, color: "#dc2626", marginBottom: 10 }}>Don't</div>
                  {VOICE_DONT.map((x) => <p key={x} style={{ fontSize: 12.5, lineHeight: 1.5, color: MUTED, margin: "0 0 10px" }}>{x}</p>)}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <Section tint={YELLOW_TINT} last>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 44, flexWrap: "wrap" }}>
              {STATS.map(([n, l]) => (
                <div key={l}>
                  <div style={heading({ fontSize: 26, fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em" })}>{n}</div>
                  <div style={{ fontSize: 12, color: MUTED, marginTop: 6 }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 12, color: MUTED, maxWidth: 320, textAlign: "right" }}>
              Distilled from <a href="https://app.notion.com/p/This-is-Fronted-1cbe1940ba3881aba56cd1f62d44ddc6" target="_blank" rel="noreferrer" style={{ color: INK, fontWeight: 600 }}>“This is Fronted”</a> &amp; <a href="https://fronted.com" target="_blank" rel="noreferrer" style={{ color: INK, fontWeight: 600 }}>fronted.com</a>.
            </div>
          </div>
        </Section>

      </div>
    </div>
  ),
};
