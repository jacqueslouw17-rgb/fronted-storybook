import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "@/components/ui/skeleton";
import "./tokens.css";
import "./typography.css";
import { PageHeader } from "./_docTable";
import { Guidance } from "./guidance";

/**
 * Components — Skeleton (verbatim ui/skeleton).
 * Loading placeholder — animate-pulse rounded-md bg-muted. Sized to the content it
 * stands in for; compose whole layouts, not single bars.
 */
const meta: Meta = { title: "Components/Skeleton", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const wrap: React.CSSProperties = { fontFamily: "var(--ds-font-body)", color: "var(--ds-color-text)", maxWidth: 940, padding: 4 };
const eyebrow: React.CSSProperties = { fontSize: 12, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", margin: "28px 0 12px", fontWeight: 600 };
const th: React.CSSProperties = { textAlign: "left", padding: "10px 16px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", background: "var(--ds-color-surface-sunken)", borderBottom: "1px solid var(--ds-color-border)" };
const td: React.CSSProperties = { padding: "16px", borderBottom: "1px solid var(--ds-color-border)", verticalAlign: "middle" };
const note: React.CSSProperties = { fontFamily: "var(--ds-font-mono)", fontSize: 11, color: "var(--ds-color-text-muted)" };

export const SkeletonStory: Story = {
  name: "Skeleton",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Components"
        status="Stable"
        title="Skeleton"
        lead={<>
        Loading placeholder — a pulsing muted block sized to the content it replaces.
        </>}
      />

      <h3 style={eyebrow}>Shapes / sizes</h3>
      <div style={{ border: "1px solid var(--ds-color-border)", borderRadius: "var(--ds-radius-card)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr><th style={{ ...th, width: 150 }}>Use</th><th style={th}>Example</th><th style={{ ...th, width: 220 }}>Classes</th></tr></thead>
          <tbody>
            {[
              { u: "Text line", el: <Skeleton className="h-4 w-56" />, c: "h-4 w-…" },
              { u: "Heading", el: <Skeleton className="h-6 w-40" />, c: "h-6 w-…" },
              { u: "Block", el: <Skeleton className="h-12 w-64" />, c: "h-12 w-full" },
              { u: "Avatar", el: <Skeleton className="h-8 w-8 rounded-full" />, c: "h-8 w-8 rounded-full" },
            ].map((r, i) => (
              <tr key={r.u} style={{ background: i % 2 ? "var(--ds-color-bg)" : "var(--ds-color-surface)" }}>
                <td style={{ ...td, fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" }}>{r.u}</td>
                <td style={td}>{r.el}</td>
                <td style={{ ...td, ...note }}>{r.c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={eyebrow}>Composition — worker row (loading)</h3>
      <div className="flex items-center gap-3 w-full max-w-[420px] rounded-lg border border-border/30 px-3 py-3">
        <Skeleton className="h-8 w-8 rounded-full shrink-0" />
        <div className="flex-1 space-y-1.5"><Skeleton className="h-4 w-36" /><Skeleton className="h-3 w-24" /></div>
        <Skeleton className="h-4 w-20" />
      </div>
      <p style={{ ...note, marginTop: 10 }}>Base: animate-pulse rounded-md bg-muted · set h/w per placeholder (see Patterns/Attachments &amp; Loading for the table skeleton).</p>
      <Guidance k="skeleton" />
    </div>
  ),
};
