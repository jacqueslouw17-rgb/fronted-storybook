import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "@/components/ui/label";
import { X, Tag } from "lucide-react";
import "./tokens.css";
import "./typography.css";
import { PageHeader } from "./_docTable";

/**
 * Patterns — Tag Input (verbatim from shared/TagInput).
 * Chip-based tag entry (group expenses / add context). Primary-tinted chips with an
 * X remove, an inline input with "N characters left", and a suggestion dropdown.
 */
const meta: Meta = { title: "Patterns/Tag Input", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const wrap: React.CSSProperties = { fontFamily: "var(--ds-font-body)", color: "var(--ds-color-text)", maxWidth: 940, padding: 4 };
const eyebrow: React.CSSProperties = { fontSize: 12, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", margin: "28px 0 12px", fontWeight: 600 };
const note: React.CSSProperties = { fontFamily: "var(--ds-font-mono)", fontSize: 11, color: "var(--ds-color-text-muted)", marginTop: 10 };

function Chip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 pl-2 pr-1 py-0.5 rounded-full bg-primary/10 text-emphasis text-[11px] font-medium max-w-[160px]">
      <span className="truncate">{label}</span>
      <button className="p-0.5 rounded-full hover:bg-primary/20 transition-colors shrink-0"><X className="h-2.5 w-2.5" /></button>
    </span>
  );
}

export const TagInput: Story = {
  name: "Tag Input",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        title="Tag Input"
        lead={<>
        Chip-based tag entry (group expenses, add context). Type and press Enter to add; each chip is a
        primary-tinted pill with an X. Verbatim from shared/TagInput.
        </>}
      />

      <h3 style={eyebrow}>With tags + counter</h3>
      <div className="space-y-1.5 w-[380px]">
        <Label className="text-xs">Tags</Label>
        <div className="flex flex-wrap items-center gap-1.5 min-h-[36px] px-2.5 py-1.5 rounded-md border bg-background transition-colors cursor-text border-input">
          <Chip label="NY trip" />
          <Chip label="Client dinner" />
          <input className="flex-1 min-w-[80px] bg-transparent text-xs outline-none placeholder:text-muted-foreground" placeholder="" />
        </div>
        <div className="flex items-start justify-between gap-3">
          <p className="text-[11px] text-muted-foreground">Add tags to group expenses or give context (e.g., ‘NY trip’, ‘Client dinner’).</p>
          <p className="text-[11px] tabular-nums text-muted-foreground shrink-0 ml-auto">120 characters left</p>
        </div>
      </div>

      <h3 style={eyebrow}>Empty + suggestions open</h3>
      <div className="space-y-1.5 w-[380px]">
        <div className="flex flex-wrap items-center gap-1.5 min-h-[36px] px-2.5 py-1.5 rounded-md border bg-background transition-colors cursor-text border-input">
          <input className="flex-1 min-w-[80px] bg-transparent text-xs outline-none placeholder:text-muted-foreground" placeholder="Type and press Enter" />
        </div>
        <div className="rounded-md border border-border/60 bg-popover shadow-md py-1 max-h-[140px] overflow-y-auto">
          {["NY trip", "Client dinner", "Software"].map((s) => (
            <button key={s} className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-foreground hover:bg-muted/60 transition-colors text-left">
              <Tag className="h-3 w-3 text-muted-foreground shrink-0" /> {s}
            </button>
          ))}
        </div>
      </div>
      <p style={note}>chip pl-2 pr-1 py-0.5 rounded-full bg-primary/10 text-emphasis text-[11px] · X h-2.5 · suggestions bg-popover shadow-md · counter text-[11px]</p>
    </div>
  ),
};
