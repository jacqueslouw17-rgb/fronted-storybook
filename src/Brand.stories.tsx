import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import "./tokens.css";
import "./typography.css";

/**
 * Brand — the strategy the design system ladders up from.
 * Distilled from the CEO's "This is Fronted" (Notion · Company Overview) and fronted.com.
 * This page is a read-only mirror; the living source stays in Notion.
 */
const meta: Meta = { title: "Brand", parameters: { layout: "fullscreen" } };
export default meta;
type Story = StoryObj;

const page: React.CSSProperties = { fontFamily: "var(--ds-font-body)", color: "var(--ds-color-text)", maxWidth: 1040, margin: "0 auto", padding: "56px 40px 96px" };
const muted: React.CSSProperties = { color: "var(--ds-color-text-muted)" };
const eyebrow: React.CSSProperties = { fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".13em", color: "var(--ds-color-text-muted)" };
const h2: React.CSSProperties = { fontFamily: "var(--ds-font-heading)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--ds-color-heading)", margin: "0 0 16px" };
const card: React.CSSProperties = { border: "1px solid var(--ds-color-border)", borderRadius: 16, padding: "22px 24px", background: "var(--ds-color-surface)" };
const rule = () => <div style={{ height: 1, background: "var(--ds-color-border)", margin: "44px 0" }} />;

const MODULES: { stage: string; name: string; who: string; body: string; tint: string }[] = [
  { stage: "Starter · First hire abroad", name: "Recruitment", who: "Find the right people, wherever they are", body: "Source and recruit key talent in the country, market or timezone you need — not limited by your local pool. The entry point that converts naturally into EOR and Entity.", tint: "var(--ds-color-focus-ring)" },
  { stage: "Growth · Build your team", name: "EOR + COR", who: "Hire employees or contractors, no local entity", body: "Employer of Record and Contractor of Record: local contracts, payroll, benefits and labour law handled across countries — one invoice a month, so you stay focused on growth.", tint: "#16a34a" },
  { stage: "Scale · Own your entity", name: "Entity as a Service", who: "When you outgrow EOR", body: "We set up your local entity and keep it running across 40+ countries — bookkeeping, VAT, payroll, annual accounts, tax filings, compliance. All on autopilot.", tint: "#7c3aed" },
];

const PILLARS: [string, string][] = [
  ["One partner, not ten vendors", "Recruitment, employment and entity in one system — no patchwork of providers to stitch together."],
  ["Compliant by design", "Nordic standards applied globally: clear processes, transparency, trust — no surprises."],
  ["Fast execution", "Speed and flexibility are the core advantage. Move fast without shortcuts."],
  ["The human touch", "When the stakes are high, customers reach experienced people — not chatbots."],
  ["Always productising", "A software-enabled service: every repeatable manual process becomes a product."],
];

const BEHAVIOURS: [string, string][] = [
  ["Be a good person", "Kind, good intentions, integrity. How you treat people matters as much as what you deliver."],
  ["Always be productising", "When there's repeatability, build a system to make it better."],
  ["Take action, now", "Don't wait for perfect information — make a call, move, adjust. Bring a solution."],
  ["Stay curious", "Ask why. Question assumptions. The best insight comes from being genuinely interested."],
  ["Be authentic", "Use best practice, but bring yourself. People trust people, not processes."],
];

const VOICE_DO = ["Clear and direct — plain language, no jargon", "Warm and human — talk to a person, not an account", "Confident, not hype — proof over adjectives", "Transparent — set expectations, no surprises"];
const VOICE_DONT = ["Corporate or legalistic wording", "Over-promising or salesy superlatives", "Cold, faceless “platform” tone", "Hiding cost, effort or caveats"];

const STATS: [string, string][] = [["$100M", "ARR ambition (2031)"], ["5,000", "employees on EOR"], ["1,000+", "entity customers"], ["125%+", "net revenue retention"]];

export const BrandPage: Story = {
  name: "Brand",
  render: () => (
    <div style={page}>
      {/* Hero */}
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 18 }}>
        <span style={{ width: 7, height: 7, borderRadius: 999, background: "var(--ds-color-focus-ring)" }} />
        <span style={eyebrow}>Fronted · Brand</span>
      </div>
      <h1 style={{ fontFamily: "var(--ds-font-heading)", fontSize: 54, lineHeight: 1.03, letterSpacing: "-0.03em", fontWeight: 600, color: "var(--ds-color-heading)", margin: 0, maxWidth: 860 }}>
        The only partner you need to go global.
      </h1>
      <p style={{ fontSize: 19, lineHeight: 1.6, opacity: 0.85, maxWidth: 680, margin: "22px 0 0" }}>
        Fronted handles recruitment, employment and entity setup &amp; management — so companies go abroad fast and compliant, without the usual hassle. This page distils the brand the design system ladders up from.
      </p>

      {rule()}

      {/* Mission + Vision */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 18 }}>
        <div style={{ ...card, background: "var(--ds-color-surface-accent)" }}>
          <div style={eyebrow}>Mission</div>
          <p style={{ fontFamily: "var(--ds-font-heading)", fontSize: 22, lineHeight: 1.3, fontWeight: 600, color: "var(--ds-color-heading)", margin: "10px 0 0" }}>
            Make operating in any country as easy as operating at home.
          </p>
        </div>
        <div style={card}>
          <div style={eyebrow}>Vision · the 2031 ambition</div>
          <p style={{ fontSize: 15.5, lineHeight: 1.6, margin: "10px 0 0" }}>
            <b style={{ color: "var(--ds-color-heading)" }}>The global company operating system.</b> The one partner you need to go global — instead of five per country. The infrastructure layer that puts international operations on autopilot. Not a consultancy or a point solution.
          </p>
        </div>
      </div>

      {rule()}

      {/* The growth ladder */}
      <h2 style={h2}>The growth ladder — one partner, from first hire to your own entity</h2>
      <p style={{ ...muted, fontSize: 14, margin: "-6px 0 18px", maxWidth: 720 }}>Start where you are. Three modules deliver the “one partner” promise — no vendor switching as you grow.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        {MODULES.map((m) => (
          <div key={m.name} style={{ ...card, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: m.tint }} />
            <div style={{ ...eyebrow, color: m.tint }}>{m.stage}</div>
            <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: 20, fontWeight: 600, color: "var(--ds-color-heading)", margin: "8px 0 2px" }}>{m.name}</div>
            <div style={{ fontSize: 13, fontWeight: 600, ...muted, marginBottom: 8 }}>{m.who}</div>
            <p style={{ fontSize: 13.5, lineHeight: 1.55, ...muted, margin: 0 }}>{m.body}</p>
          </div>
        ))}
      </div>

      {rule()}

      {/* Audience */}
      <h2 style={h2}>Who it's for</h2>
      <p style={{ fontSize: 16, lineHeight: 1.6, maxWidth: 760, margin: 0 }}>
        Forward-leaning <b style={{ color: "var(--ds-color-heading)" }}>growth companies and scale-ups</b> in Europe — the Nordics first — and the U.S., going global. The buyers are founders/CEOs and People/HR leaders who want to move fast and stay compliant, without assembling a patchwork of country-by-country providers. Two audiences the product serves: <b style={{ color: "var(--ds-color-heading)" }}>the companies</b> hiring and operating abroad, and <b style={{ color: "var(--ds-color-heading)" }}>the workers</b> (employees &amp; contractors) who want to be paid correctly, on time, with a human on the other end.
      </p>

      {rule()}

      {/* Brand pillars */}
      <h2 style={h2}>Brand pillars — why growth companies choose Fronted</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 14 }}>
        {PILLARS.map(([t, d]) => (
          <div key={t} style={card}>
            <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ds-color-heading)", marginBottom: 4 }}>{t}</div>
            <p style={{ fontSize: 13.5, lineHeight: 1.55, ...muted, margin: 0 }}>{d}</p>
          </div>
        ))}
      </div>

      {rule()}

      {/* Behaviours */}
      <h2 style={h2}>Behaviours — how the team shows up</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 14 }}>
        {BEHAVIOURS.map(([t, d], i) => (
          <div key={t} style={{ ...card, display: "flex", gap: 14 }}>
            <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: 22, fontWeight: 700, color: "var(--ds-color-focus-ring)", lineHeight: 1 }}>{i + 1}</div>
            <div><div style={{ fontSize: 15, fontWeight: 600, color: "var(--ds-color-heading)", marginBottom: 3 }}>{t}</div><p style={{ fontSize: 13.5, lineHeight: 1.55, ...muted, margin: 0 }}>{d}</p></div>
          </div>
        ))}
      </div>

      {rule()}

      {/* Voice & tone */}
      <h2 style={h2}>Voice &amp; tone — Nordic mindset, applied to every word</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
        <div style={card}>
          <div style={{ ...eyebrow, color: "#16a34a" }}>Do</div>
          <ul style={{ margin: "12px 0 0", paddingLeft: 18, fontSize: 14, lineHeight: 1.7 }}>{VOICE_DO.map((x) => <li key={x} style={muted}>{x}</li>)}</ul>
        </div>
        <div style={card}>
          <div style={{ ...eyebrow, color: "var(--ds-color-danger, #dc2626)" }}>Don't</div>
          <ul style={{ margin: "12px 0 0", paddingLeft: 18, fontSize: 14, lineHeight: 1.7 }}>{VOICE_DONT.map((x) => <li key={x} style={muted}>{x}</li>)}</ul>
        </div>
      </div>
      <p style={{ ...muted, fontSize: 13, margin: "14px 0 0" }}>This is the same voice the <b style={{ color: "var(--ds-color-text)" }}>UX-copy</b> and <b style={{ color: "var(--ds-color-text)" }}>design principles</b> apply inside the product — plain, warm, and honest.</p>

      {rule()}

      {/* Ambition metrics */}
      <h2 style={h2}>The ambition, in numbers (2031)</h2>
      <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
        {STATS.map(([n, l]) => (
          <div key={l}>
            <div style={{ fontFamily: "var(--ds-font-heading)", fontSize: 34, fontWeight: 600, lineHeight: 1, color: "var(--ds-color-heading)", letterSpacing: "-0.02em" }}>{n}</div>
            <div style={{ fontSize: 12.5, marginTop: 6, ...muted }}>{l}</div>
          </div>
        ))}
      </div>

      {rule()}

      {/* Sources */}
      <div style={{ ...card, background: "var(--ds-color-surface-sunken, var(--ds-color-surface))" }}>
        <div style={eyebrow}>Sources · this page is a read-only mirror</div>
        <p style={{ fontSize: 13.5, lineHeight: 1.6, margin: "10px 0 0", ...muted }}>
          Distilled from <a href="https://app.notion.com/p/This-is-Fronted-1cbe1940ba3881aba56cd1f62d44ddc6" target="_blank" rel="noreferrer" style={{ color: "var(--ds-color-text)", fontWeight: 600 }}>“This is Fronted” (Notion · Company Overview)</a> and <a href="https://fronted.com" target="_blank" rel="noreferrer" style={{ color: "var(--ds-color-text)", fontWeight: 600 }}>fronted.com</a>. The living strategy lives in Notion — keep this page in sync with it, don't fork it here.
        </p>
      </div>
    </div>
  ),
};
