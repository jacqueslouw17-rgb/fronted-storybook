import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import "./tokens.css";
import "./typography.css";

/**
 * Foundations — token reference for the Fronted design system.
 * Source: fronted.com (Webflow). Components consume the SEMANTIC layer
 * (--ds-*); primitives (--p-*) are the raw ramps.
 */
const meta: Meta = { title: "Foundations", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const wrap: React.CSSProperties = { fontFamily: "var(--ds-font-body)", color: "var(--ds-color-text)", maxWidth: 1000 };
const grid = (min = 150): React.CSSProperties => ({ display: "grid", gridTemplateColumns: `repeat(auto-fill, minmax(${min}px, 1fr))`, gap: 14 });
const card: React.CSSProperties = { border: "1px solid var(--ds-color-border)", borderRadius: 12, overflow: "hidden", background: "#fff" };
const mono: React.CSSProperties = { fontFamily: "var(--ds-font-mono)", fontSize: 11, color: "var(--ds-color-text-muted)" };
const eyebrow: React.CSSProperties = { fontSize: 13, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", margin: "26px 0 10px" };

/* readable label colour on a swatch */
function darkOn(hex: string) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) > 150;
}

type Stop = { step: string; hex: string; anchor?: boolean };
function Ramp({ name, family, stops }: { name: string; family: string; stops: Stop[] }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6 }}>
        <strong style={{ fontSize: 13 }}>{name}</strong>
        <span style={mono}>--p-{family}-*</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${stops.length}, 1fr)`, gap: 4 }}>
        {stops.map((s) => (
          <div key={s.step} title={`--p-${family}-${s.step} · ${s.hex}`}
               style={{ height: 56, borderRadius: 6, background: s.hex, border: "1px solid rgba(0,0,0,.06)",
                        display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 6,
                        outline: s.anchor ? "2px solid var(--ds-color-heading)" : "none", outlineOffset: 1 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: darkOn(s.hex) ? "#111" : "#fff" }}>{s.step}</span>
            <span style={{ fontSize: 9, fontFamily: "var(--ds-font-mono)", color: darkOn(s.hex) ? "rgba(0,0,0,.55)" : "rgba(255,255,255,.7)" }}>{s.hex}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* anchor flag (3rd item) = shade is referenced by a semantic / action / feedback token */
const NEUTRAL: Stop[] = [["0","#FFFFFF",1],["50","#FAFAFB",1],["100","#F7F7F7",1],["200","#ECECEE"],["300","#E2E2E2",1],["400","#CACBCF",1],["500","#9A9CA3"],["600","#6B7280",1],["700","#4B4D54"],["800","#333333"],["900","#1E1E1E",1],["950","#0F1011",1]].map(([step,hex,a]) => ({ step: step as string, hex: hex as string, anchor: !!a }));
const YELLOW: Stop[] = [["50","#FFFCF2",1],["100","#FFF7E0",1],["200","#FFF2D7"],["300","#FEECA6",1],["400","#FBDE7E",1],["500","#F2C94C",1],["600","#D9A92E"],["700","#B08520"],["800","#855F18",1],["900","#5C4011"]].map(([step,hex,a]) => ({ step: step as string, hex: hex as string, anchor: !!a }));
const TEAL: Stop[] = [["50","#ECF4F4",1],["100","#CFE5E5"],["200","#A6CDCE",1],["300","#74ABAE"],["400","#45898D"],["500","#226A6E",1],["600","#134E51",1],["700","#0C3E41",1],["800","#083638"],["900","#063033"],["950","#041F21"]].map(([step,hex,a]) => ({ step: step as string, hex: hex as string, anchor: !!a }));
const GREEN: Stop[] = [["50","#ECFDF5",1],["100","#D1FAE5"],["200","#A7F3D0",1],["300","#6EE7B7"],["400","#34D399"],["500","#10B981"],["600","#059669",1],["700","#047857",1],["800","#006147"],["900","#064E3B"]].map(([step,hex,a]) => ({ step: step as string, hex: hex as string, anchor: !!a }));
const ROSE: Stop[] = [["50","#FEF2F2",1],["100","#FCE4E3"],["200","#F9CBCA",1],["300","#F3A6A4"],["400","#EA7C79"],["500","#DC5450"],["600","#C23B37",1],["700","#9B2D2A"],["800","#7A2422"],["900","#5A1B19"]].map(([step,hex,a]) => ({ step: step as string, hex: hex as string, anchor: !!a }));

function SemSwatch({ name, varName }: { name: string; varName: string }) {
  return (
    <div style={card}>
      <div style={{ height: 56, background: `var(${varName})`, borderBottom: "1px solid var(--ds-color-border)" }} />
      <div style={{ padding: "7px 10px" }}>
        <div style={{ fontSize: 12, fontWeight: 600 }}>{name}</div>
        <div style={mono}>{varName}</div>
      </div>
    </div>
  );
}

function Feedback({ kind, label }: { kind: string; label: string }) {
  return (
    <div style={{ background: `var(--ds-feedback-${kind}-bg)`, border: `1px solid var(--ds-feedback-${kind}-border)`, color: `var(--ds-feedback-${kind}-fg)`, borderRadius: 10, padding: "10px 14px", fontSize: 13, fontWeight: 500 }}>
      {label}
      <div style={{ ...mono, color: `var(--ds-feedback-${kind}-fg)`, opacity: .8 }}>--ds-feedback-{kind}-*</div>
    </div>
  );
}

export const Colors: Story = {
  render: () => (
    <div style={wrap}>
      <h2 className="ds-h2" style={{ marginBottom: 6 }}>Color</h2>
      <p className="ds-body" style={{ marginBottom: 6 }}>One ramp per hue (50→900). <b style={{ outline: "2px solid var(--ds-color-heading)", outlineOffset: 1, padding: "0 4px", borderRadius: 3 }}>Outlined</b> shades are the exact steps referenced by a token (semantic, action or feedback) — the rest are reserve.</p>

      <h3 style={{ ...eyebrow, marginTop: 10 }}>Ramps</h3>
      <Ramp name="Neutral" family="neutral" stops={NEUTRAL} />
      <Ramp name="Yellow — primary" family="yellow" stops={YELLOW} />
      <Ramp name="Teal — brand / ink" family="teal" stops={TEAL} />
      <Ramp name="Green — success" family="green" stops={GREEN} />
      <Ramp name="Rose — danger" family="rose" stops={ROSE} />

      <h3 style={eyebrow}>Semantic — text, surface &amp; border</h3>
      <p style={{ fontSize: 13, color: "var(--ds-color-text)", margin: "0 0 12px", maxWidth: 680 }}>
        Text, surface &amp; border are <b>neutral</b> — no hue. Text shades by role + WCAG: body <code>#1E1E1E</code> (AAA) · subtext <code>#6B7280</code> (AA 4.83:1) · disabled <code>#CACBCF</code> (exempt). The single exception is one <b>accent surface</b> (soft yellow wash) for accented section headers; everything else stays neutral, and brand teal appears only as the focus ring and info feedback.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "70px 1fr", gap: "10px 16px", alignItems: "center", maxWidth: 640 }}>
        <span style={mono}>Text</span>
        <div style={grid(130)}>
          <SemSwatch name="text (body)" varName="--ds-color-text" />
          <SemSwatch name="muted (subtext)" varName="--ds-color-text-muted" />
          <SemSwatch name="disabled" varName="--ds-color-text-disabled" />
        </div>
        <span style={mono}>Surface</span>
        <div style={grid(130)}>
          <SemSwatch name="bg (page)" varName="--ds-color-bg" />
          <SemSwatch name="surface" varName="--ds-color-surface" />
          <SemSwatch name="sunken" varName="--ds-color-surface-sunken" />
        </div>
        <span style={mono}>Accent</span>
        <div style={grid(130)}>
          <SemSwatch name="accent (yellow-50)" varName="--ds-color-surface-accent" />
          <SemSwatch name="accent hover" varName="--ds-color-surface-accent-hover" />
        </div>
        <span style={mono}>Border</span>
        <div style={grid(130)}>
          <SemSwatch name="border" varName="--ds-color-border" />
          <SemSwatch name="strong" varName="--ds-color-border-strong" />
        </div>
      </div>

      <h3 style={eyebrow}>Action</h3>
      <div style={grid()}>
        <SemSwatch name="primary" varName="--ds-action-primary-bg" />
        <SemSwatch name="primary hover" varName="--ds-action-primary-bg-hover" />
        <SemSwatch name="primary active" varName="--ds-action-primary-bg-active" />
        <SemSwatch name="secondary text" varName="--ds-action-secondary-fg" />
        <SemSwatch name="secondary hover fill" varName="--ds-action-secondary-bg-hover" />
      </div>

      <h3 style={eyebrow}>Feedback</h3>
      <div style={grid(190)}>
        <Feedback kind="success" label="Success" />
        <Feedback kind="warning" label="Warning" />
        <Feedback kind="danger" label="Danger" />
        <Feedback kind="info" label="Info" />
      </div>

      <h3 style={eyebrow}>Usage rules</h3>
      <ul style={{ fontSize: 13, lineHeight: 1.7, color: "var(--ds-color-text)", paddingLeft: 18, maxWidth: 720 }}>
        <li>Components reference <b>semantic</b> tokens (<code>--ds-*</code>) only; never raw ramps in component CSS.</li>
        <li>Primary (yellow) carries <b>black / teal text only</b> — never white (1.18:1 fails).</li>
        <li>Muted text needs ≥4.5:1 — keep it on white / neutral-50; on tinted bars use <code>--ds-color-text</code>.</li>
        <li>Feedback <code>fg</code> shades are pre-picked for AA on their <code>bg</code>. Decorative accents (400/500) take a dark foreground.</li>
        <li>Use ramp steps for states: 300 base → 400 hover → 500 active; 50/100 for tints; 600–900 for text.</li>
      </ul>
    </div>
  ),
};

type TypeRow = { cls: string; role: string; font: string; size: string; weight: string; track: string };
const TYPE: TypeRow[] = [
  { cls: "ds-display", role: "Display", font: "Clash", size: "60 / 64", weight: "600", track: "-2%" },
  { cls: "ds-h1", role: "H1", font: "Clash", size: "48 / 56", weight: "600", track: "-2%" },
  { cls: "ds-h2", role: "H2", font: "Clash", size: "36 / 44", weight: "600", track: "-1%" },
  { cls: "ds-h3", role: "H3", font: "Clash", size: "28 / 36", weight: "600", track: "-1%" },
  { cls: "ds-h4", role: "H4", font: "Clash", size: "24 / 32", weight: "600", track: "0" },
  { cls: "ds-h5", role: "H5", font: "Clash", size: "20 / 28", weight: "600", track: "0" },
  { cls: "ds-h6", role: "H6", font: "Clash", size: "16 / 24", weight: "600", track: "0" },
  { cls: "ds-body-lg", role: "Body L", font: "Inter", size: "18 / 28", weight: "400", track: "0" },
  { cls: "ds-body", role: "Body", font: "Inter", size: "16 / 24", weight: "400", track: "0" },
  { cls: "ds-body-sm", role: "Body S", font: "Inter", size: "14 / 20", weight: "400", track: "0" },
  { cls: "ds-label", role: "Label", font: "Inter", size: "14 / 20", weight: "500", track: "0" },
  { cls: "ds-caption", role: "Caption", font: "Inter", size: "12 / 16", weight: "400", track: "0" },
  { cls: "ds-overline", role: "Overline", font: "Inter", size: "12 / 16", weight: "600", track: "+8%" },
];

export const Typography: Story = {
  render: () => (
    <div style={wrap}>
      <h2 className="ds-h2" style={{ marginBottom: 6 }}>Typography</h2>
      <p className="ds-body" style={{ marginBottom: 8, maxWidth: 720 }}>
        Modular scale (base 16) — tightens for body, widens toward display. Two typefaces, by role: <b>Clash Display</b> for content headings only (display, H1–H6); <b>Inter</b> for all product &amp; component text — body, labels, inputs, placeholders, buttons, even component headers. Clash is expressive at large sizes; Inter stays legible at UI sizes.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 18px", margin: "0 0 12px" }}>
        {[
          ["Regular 400", "body, placeholders"],
          ["Medium 500", "labels, button text"],
          ["Semibold 600", "headings, emphasis"],
        ].map(([w, u]) => (
          <span key={w} style={{ fontSize: 13 }}>
            <b style={{ fontWeight: w.includes("400") ? 400 : w.includes("500") ? 500 : 600 }}>{w}</b>
            <span style={{ color: "var(--ds-color-text-muted)" }}> — {u}</span>
          </span>
        ))}
      </div>
      <p style={{ ...mono, marginBottom: 18 }}>Every line-height is a multiple of 4px → text sits on the same baseline grid as spacing.</p>

      {/* header */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 90px 60px 56px", gap: 14, alignItems: "end", padding: "0 0 6px", borderBottom: "1px solid var(--ds-color-border)" }}>
        <div style={mono}>sample</div>
        <div style={mono}>font</div>
        <div style={mono}>size / lh</div>
        <div style={mono}>weight</div>
        <div style={mono}>track</div>
      </div>
      {TYPE.map((t) => (
        <div key={t.cls} style={{ display: "grid", gridTemplateColumns: "1fr 80px 90px 60px 56px", gap: 14, alignItems: "center", padding: "14px 0", borderBottom: "1px solid var(--ds-color-border)" }}>
          <div style={{ minWidth: 0 }}>
            <div className={t.cls} style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {t.role === "Overline" ? "Section overline" : "Scale your company globally"}
            </div>
            <div style={mono}>.{t.cls}</div>
          </div>
          <div style={mono}>{t.font}</div>
          <div style={mono}>{t.size}</div>
          <div style={mono}>{t.weight}</div>
          <div style={mono}>{t.track}</div>
        </div>
      ))}
    </div>
  ),
};

type SpaceRow = { t: string; px: number; use?: string };
const SPACE: SpaceRow[] = [
  { t: "0", px: 0 },
  { t: "0-5", px: 2, use: "micro · hairline inset, icon nudge" },
  { t: "1", px: 4, use: "tight gap" },
  { t: "2", px: 8, use: "compact inset" },
  { t: "3", px: 12, use: "control inset" },
  { t: "4", px: 16, use: "default gap · card padding" },
  { t: "5", px: 20 },
  { t: "6", px: 24, use: "section gap" },
  { t: "7", px: 28 },
  { t: "8", px: 32, use: "block gap" },
  { t: "9", px: 36 },
  { t: "10", px: 40 },
  { t: "11", px: 44 },
  { t: "12", px: 48, use: "group gap" },
  { t: "14", px: 56 },
  { t: "16", px: 64, use: "layout gap" },
  { t: "20", px: 80 },
  { t: "24", px: 96, use: "section rhythm" },
  { t: "32", px: 128, use: "page band" },
];

type RadiusRow = { r: string; px: string; role?: string };
const RADII: RadiusRow[] = [
  { r: "none", px: "0" },
  { r: "xs", px: "2" },
  { r: "sm", px: "4" },
  { r: "md", px: "8", role: "input" },
  { r: "lg", px: "12", role: "card · rounded btn" },
  { r: "xl", px: "16", role: "sheet" },
  { r: "2xl", px: "20" },
  { r: "pill", px: "∞", role: "button · chip" },
];

export const SpacingAndRadii: Story = {
  name: "Spacing & Radii",
  render: () => {
    const srow: React.CSSProperties = { display: "grid", gridTemplateColumns: "84px 44px 1fr", gap: 14, alignItems: "center", padding: "5px 0" };
    return (
      <div style={wrap}>
        <h2 className="ds-h2" style={{ marginBottom: 6 }}>Spacing &amp; Radii</h2>
        <p className="ds-body" style={{ marginBottom: 4, maxWidth: 720 }}>
          One <b>4px base grid</b> drives every gap, inset and line-height. Token index = px ÷ 4 (the <code>0-5</code> micro step = 2px). Tight steps (0→6) handle component insets; the wider jumps (7→32) handle layout rhythm.
        </p>
        <p style={{ ...mono, marginBottom: 18 }}>Same grid as type line-heights → vertical rhythm stays consistent across the system.</p>

        <h3 style={{ ...eyebrow, marginTop: 4 }}>Spacing scale</h3>
        <div style={{ display: "grid", gridTemplateColumns: "84px 44px 1fr", gap: 14, paddingBottom: 6, borderBottom: "1px solid var(--ds-color-border)" }}>
          <div style={mono}>token</div><div style={mono}>px</div><div style={mono}>bar · usage</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {SPACE.map((s) => (
            <div key={s.t} style={{ ...srow, borderBottom: "1px solid var(--ds-color-bg)" }}>
              <span style={mono}>space-{s.t}</span>
              <span style={{ ...mono, color: "var(--ds-color-text)" }}>{s.px}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                <div style={{ width: `var(--p-space-${s.t})`, height: 14, background: "var(--p-yellow-400)", borderRadius: 2, flex: "none", outline: s.px === 0 ? "1px dashed var(--ds-color-border-strong)" : "none" }} />
                {s.use && <span style={{ ...mono, whiteSpace: "nowrap" }}>{s.use}</span>}
              </div>
            </div>
          ))}
        </div>

        <h3 style={eyebrow}>Radii</h3>
        <div style={grid(112)}>
          {RADII.map((r) => (
            <div key={r.r} style={{ textAlign: "center" }}>
              <div style={{ height: 60, background: "var(--p-yellow-300)", border: "1px solid var(--ds-color-border-strong)", borderRadius: `var(--p-radius-${r.r})` }} />
              <div style={{ fontSize: 12, fontWeight: 600, marginTop: 6 }}>{r.r} · {r.px}{r.px !== "∞" && r.px !== "0" ? "px" : ""}</div>
              <div style={{ ...mono, color: r.role ? "var(--ds-color-text-muted)" : "transparent" }}>{r.role ?? "·"}</div>
            </div>
          ))}
        </div>

        <h3 style={eyebrow}>Radius roles</h3>
        <p style={{ fontSize: 13, color: "var(--ds-color-text)", margin: "0 0 8px", maxWidth: 680 }}>
          Each component category points at <b>one</b> primitive, so radius stays consistent everywhere a category appears.
        </p>
        <ul style={{ fontSize: 13, lineHeight: 1.7, color: "var(--ds-color-text)", paddingLeft: 18 }}>
          <li><code>--ds-radius-button</code> / <code>--ds-radius-chip</code> = <b>pill</b> — buttons, CTAs, chips, tags, badges.</li>
          <li><code>--ds-radius-input</code> = <b>md (8)</b> — inputs, selects, menus.</li>
          <li><code>--ds-radius-card</code> = <b>lg (12)</b> — cards, popovers; also the <code>rounded</code> button shape.</li>
          <li><code>--ds-radius-sheet</code> = <b>xl (16)</b> — modals, dialogs.</li>
        </ul>

        <h3 style={eyebrow}>Elevation</h3>
        <div style={grid(160)}>
          {[{ s: "sm", u: "subtle raise · inputs" }, { s: "md", u: "cards · popovers" }, { s: "lg", u: "modals · hover lift" }].map(({ s, u }) => (
            <div key={s} style={{ textAlign: "center" }}>
              <div style={{ height: 60, background: "#fff", borderRadius: 12, boxShadow: `var(--p-shadow-${s})` }} />
              <div style={{ fontSize: 12, fontWeight: 600, marginTop: 8 }}>shadow-{s}</div>
              <div style={mono}>{u}</div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
