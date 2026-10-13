import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Paperclip, ExternalLink, FileText, Image as ImageIcon } from "lucide-react";
import "./tokens.css";
import "./typography.css";
import { PageHeader } from "./_docTable";

/**
 * Patterns — Attachments & Loading (verbatim from shared/AttachmentsList and
 * shared/PayrollLoadingState). The attachment list/chip and the payroll table
 * skeleton used while data loads.
 */
const meta: Meta = { title: "Patterns/Attachments & Loading", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const wrap: React.CSSProperties = { fontFamily: "var(--ds-font-body)", color: "var(--ds-color-text)", maxWidth: 940, padding: 4 };
const eyebrow: React.CSSProperties = { fontSize: 12, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", margin: "30px 0 12px", fontWeight: 600 };
const note: React.CSSProperties = { fontFamily: "var(--ds-font-mono)", fontSize: 11, color: "var(--ds-color-text-muted)", marginTop: 10 };

function AttRow({ name, meta: m, icon: Icon }: { name: string; meta: string; icon: typeof FileText }) {
  return (
    <div className="flex items-center gap-2.5 rounded-md border border-border/30 bg-muted/20 group transition-colors cursor-pointer hover:bg-muted/70 hover:border-border/60 px-3 py-2">
      <div className="flex items-center justify-center h-7 w-7 rounded bg-primary/[0.06] border border-primary/20 shrink-0"><Icon className="h-3.5 w-3.5 text-emphasis/70" /></div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-foreground truncate">{name}</p>
        <p className="text-[10px] text-muted-foreground/70">{m}</p>
      </div>
      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"><ExternalLink className="h-3 w-3 text-muted-foreground" /></Button>
    </div>
  );
}

export const AttachmentsLoading: Story = {
  name: "Attachments & Loading",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        title="Attachments &amp; Loading"
        lead={<>
        The attachment list/chip and the payroll skeleton. Verbatim from shared/AttachmentsList and shared/PayrollLoadingState.
        </>}
      />

      <h3 style={eyebrow}>Attachments list</h3>
      <div className="space-y-1.5 w-[360px] max-w-full">
        <AttRow name="receipt-jan.pdf" meta="PDF · 240 KB" icon={FileText} />
        <AttRow name="hotel-invoice.png" meta="PNG · 1.1 MB" icon={ImageIcon} />
      </div>
      <p style={note}>row border-border/30 bg-muted/20 · icon tile h-7 w-7 bg-primary/[0.06] border-primary/20 · external-link on hover</p>

      <h3 style={eyebrow}>Empty + inline chip</h3>
      <div className="flex items-center gap-6">
        <p className="text-xs text-muted-foreground/60">No attachments provided</p>
        <span className="inline-flex items-center gap-0.5 text-[10px] text-muted-foreground/70"><Paperclip className="h-2.5 w-2.5" /> 2</span>
      </div>
      <p style={note}>empty text-xs text-muted-foreground/60 · chip Paperclip h-2.5 + count text-[10px]</p>

      <h3 style={eyebrow}>Payroll loading (skeleton table)</h3>
      <div className="min-h-[300px] overflow-hidden rounded-lg border border-border/40 bg-card/50 shadow-sm w-full max-w-[520px]">
        <div className="flex flex-col gap-2 border-b border-border/40 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <Skeleton className="h-4 w-24" />
          <div className="flex items-center gap-2"><Skeleton className="h-8 flex-1 sm:w-44 sm:flex-none" /><Skeleton className="h-8 w-28" /></div>
        </div>
        <div className="space-y-1.5 p-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex h-[58px] items-center gap-3 rounded-md border border-border/30 px-3">
              <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
              <div className="min-w-0 flex-1 space-y-1.5"><Skeleton className="h-4 w-36" /><Skeleton className="h-3 w-20" /></div>
              <Skeleton className="hidden h-4 w-20 sm:block" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          ))}
        </div>
      </div>
      <p style={note}>container border-border/40 bg-card/50 · header skeletons · rows h-[58px] with avatar circle + two lines + amount</p>
    </div>
  ),
};
