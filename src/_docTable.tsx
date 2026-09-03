import * as React from "react";

/**
 * Shared documentation primitives for the Fronted design system.
 * One page system so every story reads as one polished, consistent document:
 *   <PageHeader category="Components" title="Button" lead="…" meta="…" />
 *   <Section title="Variants" sub="…"> … </Section>
 *   <DocTable head={["Variant","Example","Classes"]} rows={[[label, example, classes], …]} />
 */

/* ---- page shell ---------------------------------------------------------- */
export const wrap: React.CSSProperties = { fontFamily: "var(--ds-font-body)", color: "var(--ds-color-text)", maxWidth: 1040, padding: "8px 8px 80px" };

/* Section eyebrow — used as <h3 style={eyebrow}> across stories. Matches <Section/>. */
export const eyebrow: React.CSSProperties = { fontSize: 11.5, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--ds-color-heading)", margin: "48px 0 16px", fontWeight: 700 };
export const note: React.CSSProperties = { fontFamily: "var(--ds-font-mono)", fontSize: 11, lineHeight: 1.6, color: "var(--ds-color-text-muted)" };
export const cluster: React.CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" };

/** Soft caption — the calmer, non-mono meta line (replaces the technical mono look). */
export const caption: React.CSSProperties = { fontSize: 12.5, lineHeight: 1.6, color: "var(--ds-color-text-muted)" };

export type Status = "Stable" | "Beta" | "Deprecated" | "Internal";

/** Maturity pill — signals whether a component is safe to build on. */
export function StatusChip({ status }: { status: Status }) {
  const map: Record<Status, { bg: string; fg: string; bd: string }> = {
    Stable:     { bg: "var(--ds-feedback-success-bg)", fg: "var(--ds-feedback-success-fg)", bd: "var(--ds-feedback-success-border)" },
    Beta:       { bg: "var(--ds-feedback-info-bg)",    fg: "var(--ds-feedback-info-fg)",    bd: "var(--ds-feedback-info-border)" },
    Deprecated: { bg: "var(--ds-feedback-danger-bg)",  fg: "var(--ds-feedback-danger-fg)",  bd: "var(--ds-feedback-danger-border)" },
    Internal:   { bg: "var(--ds-color-surface-sunken)", fg: "var(--ds-color-text-muted)",   bd: "var(--ds-color-border)" },
  };
  const c = map[status];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 10.5, fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", color: c.fg, background: c.bg, border: `1px solid ${c.bd}`, borderRadius: 999, padding: "2px 9px" }}>
      <span style={{ width: 5, height: 5, borderRadius: 999, background: c.fg }} />{status}
    </span>
  );
}

/** Page header — the consistent top-of-page chrome for every story. */
export function PageHeader({ category, title, lead, meta, status }: { category: string; title: React.ReactNode; lead?: React.ReactNode; meta?: React.ReactNode; status?: Status }) {
  return (
    <header style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--ds-color-focus-ring)" }} />
        <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "var(--ds-color-text-muted)" }}>{category}</span>
        {status && <StatusChip status={status} />}
      </div>
      <h1 style={{ fontFamily: "var(--ds-font-heading, var(--ds-font-body))", fontSize: 40, lineHeight: 1.05, letterSpacing: "-0.025em", fontWeight: 600, color: "var(--ds-color-heading)", margin: 0 }}>{title}</h1>
      {lead && <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--ds-color-text)", opacity: 0.82, maxWidth: 680, margin: "16px 0 0" }}>{lead}</p>}
      {meta && <div style={{ ...caption, marginTop: 16, display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 14, height: 1, background: "var(--ds-color-border-strong)", flex: "none" }} />{meta}</div>}
      <div style={{ height: 1, background: "var(--ds-color-border)", margin: "30px 0 0" }} />
    </header>
  );
}

/** A titled section with an optional sub-line and consistent rhythm. */
export function Section({ title, sub, children, tight }: { title: string; sub?: React.ReactNode; children: React.ReactNode; tight?: boolean }) {
  return (
    <section style={{ marginTop: tight ? 32 : 48 }}>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 11.5, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--ds-color-heading)", fontWeight: 700, margin: 0 }}>{title}</h2>
        {sub && <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ds-color-text-muted)", maxWidth: 680, margin: "8px 0 0" }}>{sub}</p>}
      </div>
      {children}
    </section>
  );
}

/* ---- doc table ----------------------------------------------------------- */
const th: React.CSSProperties = { textAlign: "left", padding: "12px 20px", fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--ds-color-text-muted)", background: "var(--ds-color-surface-sunken)", borderBottom: "1px solid var(--ds-color-border)" };
const td: React.CSSProperties = { padding: "15px 20px", verticalAlign: "middle" };

/** Injected once — row hover + last-row border removal (can't be done with inline styles). */
const DOC_CSS = `
.ds-doctable { width: 100%; border-collapse: collapse; }
.ds-doctable tbody tr { transition: background-color .12s ease; }
.ds-doctable tbody tr:hover { background: var(--ds-color-surface-sunken); }
.ds-doctable tbody tr:last-child td { border-bottom: 0; }
.ds-doctable td { border-bottom: 1px solid var(--ds-color-border); }
`;

export function DocTable({ head, rows, w0 = 160, wLast = 320 }: { head: string[]; rows: Array<[React.ReactNode, React.ReactNode, React.ReactNode]>; w0?: number; wLast?: number }) {
  return (
    <div style={{ border: "1px solid var(--ds-color-border)", borderRadius: 14, overflow: "hidden", background: "var(--ds-color-surface)", boxShadow: "0 1px 2px 0 rgba(16,24,40,0.04), 0 1px 3px 0 rgba(16,24,40,0.04)" }}>
      <style>{DOC_CSS}</style>
      <table className="ds-doctable">
        <thead><tr>{head.map((h, i) => <th key={i} style={{ ...th, width: i === 0 ? w0 : i === head.length - 1 ? wLast : "auto" }}>{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td style={{ ...td, fontSize: 13, fontWeight: 600, color: "var(--ds-color-heading)", whiteSpace: "nowrap" }}>{r[0]}</td>
              <td style={td}>{r[1]}</td>
              <td style={{ ...td, ...note, wordBreak: "break-word" }}>{r[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---- guidance: Do / Don't ------------------------------------------------ */
function GuideCard({ kind, items }: { kind: "do" | "dont"; items: React.ReactNode[] }) {
  const isDo = kind === "do";
  const accent = isDo ? "var(--ds-feedback-success-solid)" : "var(--ds-feedback-danger-solid)";
  const tint = isDo ? "var(--ds-feedback-success-bg)" : "var(--ds-feedback-danger-bg)";
  return (
    <div style={{ flex: 1, minWidth: 260, border: "1px solid var(--ds-color-border)", borderRadius: 14, overflow: "hidden", background: "var(--ds-color-surface)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 16px", background: tint, borderBottom: "1px solid var(--ds-color-border)" }}>
        <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 18, height: 18, borderRadius: 999, background: accent, color: "#fff", fontSize: 12, fontWeight: 700, lineHeight: 1 }}>{isDo ? "✓" : "✕"}</span>
        <span style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: ".02em", color: "var(--ds-color-heading)" }}>{isDo ? "Do" : "Don't"}</span>
      </div>
      <ul style={{ listStyle: "none", margin: 0, padding: "6px 0" }}>
        {items.map((it, i) => (
          <li key={i} style={{ display: "flex", gap: 10, padding: "8px 16px", fontSize: 13.5, lineHeight: 1.5, color: "var(--ds-color-text)" }}>
            <span style={{ color: accent, flex: "none", fontWeight: 700 }}>{isDo ? "✓" : "✕"}</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Do / Don't guidance — the judgment layer beside every component. */
export function Guidelines({ dos, donts }: { dos: React.ReactNode[]; donts: React.ReactNode[] }) {
  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "stretch" }}>
      <GuideCard kind="do" items={dos} />
      <GuideCard kind="dont" items={donts} />
    </div>
  );
}

/** A styled keycap. */
export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd style={{ display: "inline-block", fontFamily: "var(--ds-font-mono)", fontSize: 11, lineHeight: 1.4, padding: "2px 7px", borderRadius: 6, border: "1px solid var(--ds-color-border-strong)", background: "var(--ds-color-surface)", color: "var(--ds-color-text)", boxShadow: "0 1px 0 0 var(--ds-color-border-strong)", whiteSpace: "nowrap" }}>{children}</kbd>
  );
}

/** Keyboard-interaction table — one of the accessibility staples per component. */
export function KeyboardTable({ rows }: { rows: Array<[React.ReactNode, React.ReactNode]> }) {
  return (
    <div style={{ border: "1px solid var(--ds-color-border)", borderRadius: 14, overflow: "hidden", background: "var(--ds-color-surface)", boxShadow: "0 1px 2px 0 rgba(16,24,40,0.04)" }}>
      <style>{DOC_CSS}</style>
      <table className="ds-doctable">
        <thead><tr><th style={{ ...th, width: 200 }}>Key</th><th style={th}>Action</th></tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td style={{ ...td, whiteSpace: "nowrap" }}>{r[0]}</td>
              <td style={{ ...td, fontSize: 13.5, color: "var(--ds-color-text)" }}>{r[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
