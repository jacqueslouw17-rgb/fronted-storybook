import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { cn } from "@/lib/utils";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import { Guidance } from "./guidance";
import "./tokens.css";
import "./typography.css";

/**
 * Components — Segmented Toggle.
 * The per-module access control (View / Edit / Full) from the live People access panel.
 * Verbatim from demofronted.live: a 3-column grid track (rounded-md border border-border/40
 * bg-background p-0.5); the active segment is a SOLID bg-primary fill, inactive segments are
 * muted text. Single-select.
 */
const meta: Meta = { title: "Components/Segmented Toggle", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

/** Verbatim live classes: grid grid-cols-N track, segment text-[11px] px-3 py-1 rounded. */
function Segmented({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className={cn("grid rounded-md border border-border/40 bg-background p-0.5", options.length === 2 ? "grid-cols-2" : "grid-cols-3")}>
      {options.map((o) => (
        <button key={o} onClick={() => onChange(o)} className={cn(
          "text-[11px] px-3 py-1 rounded transition-colors",
          o === value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
        )}>{o}</button>
      ))}
    </div>
  );
}

function AccessRow({ label, desc, def }: { label: string; desc: string; def: string }) {
  const [v, setV] = React.useState(def);
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3.5">
      <div className="min-w-0 flex-1"><div className="text-sm font-medium text-foreground">{label}</div><p className="text-xs text-muted-foreground mt-0.5">{desc}</p></div>
      <div className="flex items-center gap-1.5 shrink-0"><Segmented options={["View", "Edit", "Full"]} value={v} onChange={setV} /></div>
    </div>
  );
}

export const SegmentedToggleStory: Story = {
  name: "Segmented Toggle",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Components"
        status="Stable"
        title="Segmented Toggle"
        lead={<>
        The per-module access control (View / Edit / Full) from the live People access panel. A 3-column grid
        track with a border; the active segment is a <strong>solid primary fill</strong>. All classes verbatim
        from demofronted.live.
        </>}
      />

      <h3 style={eyebrow}>Segment states</h3>
      <DocTable head={["State", "Example", "classes"]} w0={120} rows={[
        ["Active", <div className="grid grid-cols-1 rounded-md border border-border/40 bg-background p-0.5 w-fit"><button className="text-[11px] px-3 py-1 rounded bg-primary text-primary-foreground">Edit</button></div>, "bg-primary text-primary-foreground (solid fill)"],
        ["Default", <div className="grid grid-cols-1 rounded-md border border-border/40 bg-background p-0.5 w-fit"><button className="text-[11px] px-3 py-1 rounded text-muted-foreground">Edit</button></div>, "text-muted-foreground"],
        ["Hover", <div className="grid grid-cols-1 rounded-md border border-border/40 bg-background p-0.5 w-fit"><button className="text-[11px] px-3 py-1 rounded text-foreground">Edit</button></div>, "hover:text-foreground"],
      ]} />

      <h3 style={eyebrow}>Variants (option counts)</h3>
      <DocTable head={["Variant", "Example", "classes"]} w0={140} rows={[
        ["3-up (access)", <Segmented options={["View", "Edit", "Full"]} value="Edit" onChange={() => {}} />, "grid grid-cols-3 · segment text-[11px] px-3 py-1 rounded"],
        ["2-up", <Segmented options={["Monthly", "Weekly"]} value="Monthly" onChange={() => {}} />, "grid grid-cols-2 · same segment classes"],
      ]} />

      <h3 style={eyebrow}>In the People access panel (live F1)</h3>
      <div className="w-full max-w-[520px]">
        <div className="mb-1"><div className="text-sm font-semibold text-foreground">Access</div><p className="text-xs text-muted-foreground">Each module inherits the role baseline. Tune access per module.</p></div>
        <div className="rounded-xl border border-border/40 bg-card overflow-hidden divide-y divide-border/40">
          <AccessRow label="Worker Management" desc="Drive the pipeline" def="Edit" />
          <AccessRow label="Contract Management" desc="The agreement lifecycle" def="Edit" />
          <AccessRow label="Payroll Management" desc="Run & approve" def="Edit" />
          <AccessRow label="Client End-user Access" desc="End-client admins & approvals" def="Edit" />
          <AccessRow label="User Management" desc="Members & roles" def="View" />
        </div>
      </div>
      <p style={{ ...note, marginTop: 12 }}>track grid grid-cols-3 rounded-md border border-border/40 bg-background p-0.5 · active bg-primary text-primary-foreground · row flex justify-between px-5 py-3.5</p>
      <Guidance k="segmented" />
    </div>
  ),
};
