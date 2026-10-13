import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { cn } from "@/lib/utils";
import { DocTable, PageHeader } from "./_docTable";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Document Upload (verbatim from shared/DocumentUpload).
 * The file-upload field used across onboarding & payroll: a dashed "add" dropzone
 * plus uploaded-file rows with done / uploading / error states and inline actions.
 */
const meta: Meta = { title: "Patterns/Document Upload", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const wrap: React.CSSProperties = { fontFamily: "var(--ds-font-body)", color: "var(--ds-color-text)", maxWidth: 940, padding: 4 };
const eyebrow: React.CSSProperties = { fontSize: 12, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", margin: "28px 0 12px", fontWeight: 600 };
const note: React.CSSProperties = { fontFamily: "var(--ds-font-mono)", fontSize: 11, color: "var(--ds-color-text-muted)", marginTop: 10 };

const addDocClass = "flex w-full cursor-pointer items-center justify-center rounded-lg border border-dashed border-border/60 px-3 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-muted/30 hover:text-foreground focus-within:border-primary/50 focus-within:bg-muted/30 focus-within:text-foreground focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const actionClass = "rounded text-[11px] font-medium text-foreground/80 transition-colors hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function DocRow({ name, meta: m, status = "done", error }: { name: string; meta?: string; status?: "done" | "uploading" | "error"; error?: string }) {
  const isError = status === "error", isUploading = status === "uploading";
  return (
    <div className={cn("flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5 transition-colors", isError ? "border-destructive/50 bg-destructive/5" : "border-border/60 bg-muted/20", isUploading && "opacity-80")}>
      <div className="min-w-0 flex-1">
        <p className={cn("truncate text-sm font-medium", isError ? "text-destructive" : "text-foreground", isUploading && "text-foreground/70")}>{name}</p>
        <p className={cn("mt-0.5 truncate text-[11px]", isError ? "text-destructive/90" : "text-muted-foreground")}>{isError ? error || "Upload failed." : isUploading ? "Uploading…" : m || "Document"}</p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        {!isError && !isUploading && <><button className={actionClass}>View</button><button className={actionClass}>Replace</button></>}
        {isError && <button className={cn(actionClass, "text-foreground")}>Retry</button>}
        {!isUploading && <button className={cn(actionClass, isError ? "text-destructive hover:text-destructive" : "text-muted-foreground hover:text-destructive")}>Remove</button>}
      </div>
    </div>
  );
}

export const DocumentUpload: Story = {
  name: "Document Upload",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        title="Document Upload"
        lead={<>
        The file-upload field from onboarding & payroll. A dashed dropzone to add, then a row per file with
        done / uploading / error states and inline View · Replace · Remove actions. Verbatim from shared/DocumentUpload.
        </>}
      />

      <h3 style={eyebrow}>Add dropzone</h3>
      <div className="w-full max-w-[420px]"><label className={addDocClass}><span>Upload document</span></label></div>
      <p style={note}>border border-dashed border-border/60 px-3 py-2.5 text-xs · hover:border-primary/40 hover:bg-muted/30 · focus ring</p>

      <h3 style={eyebrow}>Uploaded row states</h3>
      <DocTable head={["State", "Example", "classes"]} w0={130} wLast={300} rows={[
        ["Done", <div className="w-[360px] max-w-full"><DocRow name="passport.pdf" meta="PDF · 1.2 MB" status="done" /></div>, "border-border/60 bg-muted/20 · actions View · Replace · Remove"],
        ["Uploading", <div className="w-[360px] max-w-full"><DocRow name="proof-of-address.png" status="uploading" /></div>, "opacity-80 · text-foreground/70 · 'Uploading…' · no actions"],
        ["Error", <div className="w-[360px] max-w-full"><DocRow name="contract-scan.pdf" status="error" error="File is larger than 10 MB." /></div>, "border-destructive/50 bg-destructive/5 · text-destructive · Retry · Remove"],
      ]} />
      <p style={note}>row rounded-lg border px-3 py-2.5 · actions text-[11px] font-medium hover:underline</p>
    </div>
  ),
};
