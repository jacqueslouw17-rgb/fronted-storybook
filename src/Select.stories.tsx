import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Check } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import "./tokens.css";
import "./typography.css";
import { PageHeader } from "./_docTable";
import { Guidance } from "./guidance";

/**
 * Components — Select (Radix, verbatim ui/select). Trigger matches the input:
 * h-10 in drawers (h-9 base, h-8 compact), muted placeholder, chevron, dark ring.
 * Invalid → border-destructive. No disabled selects in the flows.
 */
const meta: Meta = { title: "Components/Select", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const COUNTRIES = [
  { value: "NO", label: "🇳🇴 Norway" }, { value: "PH", label: "🇵🇭 Philippines" },
  { value: "IN", label: "🇮🇳 India" }, { value: "GB", label: "🇬🇧 United Kingdom" },
];

const wrap: React.CSSProperties = { fontFamily: "var(--ds-font-body)", color: "var(--ds-color-text)", maxWidth: 940, padding: 4 };
const eyebrow: React.CSSProperties = { fontSize: 12, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", margin: "28px 0 10px", fontWeight: 600 };
const th: React.CSSProperties = { textAlign: "left", padding: "10px 16px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", background: "var(--ds-color-surface-sunken)", borderBottom: "1px solid var(--ds-color-border)" };
const td: React.CSSProperties = { padding: "14px 16px", borderBottom: "1px solid var(--ds-color-border)", verticalAlign: "top" };
const note: React.CSSProperties = { fontFamily: "var(--ds-font-mono)", fontSize: 11, color: "var(--ds-color-text-muted)" };

function CountrySelect({ value, invalid, disabled, className }: { value?: string; invalid?: boolean; disabled?: boolean; className?: string }) {
  return (
    <Select defaultValue={value} disabled={disabled}>
      <SelectTrigger className={cn("w-[240px] h-10", className, invalid && "border-destructive focus:ring-destructive")}>
        <SelectValue placeholder="Select country" />
      </SelectTrigger>
      <SelectContent>
        {COUNTRIES.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}

function Table({ head, rows }: { head: [string, string, string]; rows: Array<{ a: string; b: React.ReactNode; c: string }> }) {
  return (
    <div style={{ border: "1px solid var(--ds-color-border)", borderRadius: "var(--ds-radius-card)", overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead><tr>{head.map((h, i) => <th key={i} style={{ ...th, width: i === 0 ? 150 : i === 2 ? 240 : "auto" }}>{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.a} style={{ background: i % 2 ? "var(--ds-color-bg)" : "var(--ds-color-surface)" }}>
              <td style={{ ...td, fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" }}>{r.a}</td>
              <td style={td}>{r.b}</td>
              <td style={{ ...td, ...note }}>{r.c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const menuItem = "relative flex w-full items-center rounded-sm py-1.5 pl-8 pr-2 text-sm";

export const SelectStory: Story = {
  name: "Select",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Components"
        status="Stable"
        title="Select"
        lead={<>
        The dropdown from the flows (country, reason, type…). Trigger matches the input — thin border,
        muted placeholder, chevron, dark focus ring. Click to open; items tint on hover, chosen row shows a check.
        </>}
      />

      <h3 style={eyebrow}>States</h3>
      <Table head={["State", "Example", "Notes"]} rows={[
        { a: "Default", b: <CountrySelect />, c: "placeholder in muted text + chevron" },
        { a: "Selected", b: <CountrySelect value="NO" />, c: "value shown; check in the menu" },
        { a: "Focus", b: <CountrySelect value="PH" className="ring-2 ring-ring ring-offset-2" />, c: "dark 2px ring" },
        { a: "Error", b: (<div className="space-y-1.5"><CountrySelect invalid /><p className="text-xs text-destructive">Select a country.</p></div>), c: "border-destructive + message" },
        { a: "Hover", b: <CountrySelect className="[&[data-placeholder]]:text-foreground" />, c: "placeholder darkens on hover (component); no flow uses it" },
        { a: "Disabled", b: <CountrySelect value="NO" disabled />, c: "opacity 50 · not-allowed (not used in flows)" },
      ]} />

      <h3 style={eyebrow}>Open menu</h3>
      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        <div className="w-[240px] rounded-md border bg-card text-foreground shadow-md p-1">
          <div className={menuItem}>🇵🇭 Philippines</div>
          <div className={cn(menuItem, "bg-primary/5")}>🇬🇧 United Kingdom<span className="ml-auto text-[10px] text-muted-foreground">hover</span></div>
          <div className={cn(menuItem, "bg-primary/10")}>
            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center"><Check className="h-4 w-4" /></span>
            🇳🇴 Norway<span className="ml-auto text-[10px] text-muted-foreground">selected</span>
          </div>
        </div>
        <p style={{ ...note, maxWidth: 300, paddingTop: 8 }}>card surface · items pl-8 for the check · hover = bg-primary/5 · selected = bg-primary/10</p>
      </div>

      <h3 style={eyebrow}>Sizes</h3>
      <Table head={["Size", "Example", "Notes"]} rows={[
        { a: "Drawer (h-10)", b: <CountrySelect value="NO" className="h-10 w-[220px]" />, c: "drawer default (28× in flows)" },
        { a: "Base (h-9)", b: <CountrySelect value="NO" className="h-9 w-[220px]" />, c: "component default" },
        { a: "Compact (h-8)", b: <CountrySelect value="NO" className="h-8 text-xs w-[220px]" />, c: "dense rows / toolbars" },
      ]} />
      <Guidance k="select" />
    </div>
  ),
};
