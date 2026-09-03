import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CheckCircle2, Clock, Circle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import { cn } from "@/lib/utils";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Signature Workflow (verbatim from F1 Fronted admin, F1v6_SignatureWorkflowDrawer).
 * The full signing drawer: header (worker + role/country), a Signing Progress bar, three
 * workflow steps (Admin Signature → Send to Worker → Worker Signed) with Sign / Resend
 * actions and timestamps, a "Simulate Worker Signed" action, and a signed-confirmation card.
 * A completed step keeps the system's settled GREY treatment (matching Signing Progress),
 * not the source's green; active uses text-emphasis per the a11y swap.
 */
const meta: Meta = { title: "Patterns/Signature Workflow", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

type State = "complete" | "active" | "pending";
function Step({ state, label, desc, timestamp, action }: { state: State; label: string; desc: string; timestamp?: string; action?: React.ReactNode }) {
  return (
    <div className={cn("flex items-center gap-3 p-3 rounded-lg border transition-all",
      state === "complete" && "bg-muted/30 border-border/50",
      state === "active" && "bg-primary/5 border-primary/15",
      state === "pending" && "bg-muted/20 border-border/40 opacity-50")}>
      <div className="flex-shrink-0">
        {state === "complete" ? <CheckCircle2 className="h-4 w-4 text-muted-foreground" /> : state === "active" ? <Clock className="h-4 w-4 text-emphasis" /> : <Circle className="h-4 w-4 text-muted-foreground/40" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn("text-sm font-medium text-foreground", state === "complete" && "line-through text-muted-foreground")}>{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
        {timestamp && <p className="text-[11px] text-muted-foreground/60 mt-0.5">{timestamp}</p>}
      </div>
      {action}
    </div>
  );
}

function Drawer({ pct, children }: { pct: number; children: React.ReactNode }) {
  return (
    <div className="w-[576px] max-w-full rounded-lg border border-border bg-background overflow-hidden shadow-overlay flex flex-col">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 border-b border-border/30 shrink-0">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-foreground leading-tight truncate">Marcus Chen</span>
            <span className="text-base shrink-0">🇸🇬</span>
          </div>
          <p className="text-[11px] text-muted-foreground/60 mt-0.5">Senior Backend Engineer · Singapore</p>
        </div>
      </div>
      <div className="px-5 py-4 space-y-5">
        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center"><span className="text-xs text-muted-foreground">Signing Progress</span><span className="text-xs font-medium text-foreground">{pct}%</span></div>
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} /></div>
        </div>
        {children}
      </div>
    </div>
  );
}

export const SignatureWorkflow: Story = {
  name: "Signature Workflow",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        status="Stable"
        title="Signature Workflow"
        lead={<>The full signing drawer from the Fronted admin — a Signing Progress bar over three workflow steps (Admin Signature → Send to Worker → Worker Signed) with Sign / Resend actions and timestamps, a “Simulate Worker Signed” action, and a signed-confirmation card. Markup verbatim from F1v6_SignatureWorkflowDrawer; the completed step keeps the settled grey treatment used in Signing Progress.</>}
        meta="Verbatim from F1 · Signature workflow drawer (fronted-admin-v6-1-clone)"
      />

      <h3 style={eyebrow}>Ready to send (0%)</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
        <Drawer pct={0}>
          <div className="space-y-1.5">
            <Step state="active" label="Admin Signature" desc="Waiting for admin to sign the contract." action={<Button size="sm" className="flex-shrink-0 h-7 text-xs px-3">Sign</Button>} />
            <Step state="pending" label="Send to Worker" desc="Cannot send until admin signs the contract." />
            <Step state="pending" label="Worker Signed" desc="Pending worker signature." />
          </div>
        </Drawer>
      </div>
      <p style={note}>step p-3 rounded-lg border · active bg-primary/5 border-primary/15 + Clock text-emphasis · pending bg-muted/20 opacity-50 + Circle · Sign button h-7 on active admin step.</p>

      <h3 style={eyebrow}>Awaiting worker signature (66%)</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
        <Drawer pct={66}>
          <div className="space-y-1.5">
            <Step state="complete" label="Admin Signature" desc="Admin has signed the contract." timestamp="Jan 28, 2026, 2:32 PM" />
            <Step state="complete" label="Send to Worker" desc="Contract automatically sent to worker." timestamp="Jan 28, 2026, 2:32 PM" action={<Button size="sm" variant="ghost" className="flex-shrink-0 h-7 text-xs px-2.5 text-muted-foreground hover:text-foreground"><RotateCcw className="h-3 w-3 mr-1" />Resend</Button>} />
            <Step state="active" label="Worker Signed" desc="Waiting for worker to sign." />
          </div>
          <Button variant="outline" size="sm" className="w-full text-xs h-8">Simulate Worker Signed</Button>
        </Drawer>
      </div>

      <h3 style={eyebrow}>Signed (100%)</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
        <Drawer pct={100}>
          <div className="space-y-1.5">
            <Step state="complete" label="Admin Signature" desc="Admin has signed the contract." timestamp="Jan 28, 2026, 2:32 PM" />
            <Step state="complete" label="Send to Worker" desc="Contract automatically sent to worker." timestamp="Jan 28, 2026, 2:32 PM" action={<Button size="sm" variant="ghost" className="flex-shrink-0 h-7 text-xs px-2.5 text-muted-foreground hover:text-foreground"><RotateCcw className="h-3 w-3 mr-1" />Resend</Button>} />
            <Step state="complete" label="Worker Signed" desc="Worker has signed the contract." timestamp="Jan 29, 2026, 9:15 AM" />
          </div>
          <div className="p-4 rounded-xl bg-accent-green-fill/10 border border-accent-green-outline/20 text-center">
            <CheckCircle2 className="h-6 w-6 text-accent-green-text mx-auto mb-1.5" />
            <p className="text-sm font-medium text-foreground">Contract Signed</p>
            <p className="text-xs text-muted-foreground mt-0.5">Moving to onboarding phase.</p>
          </div>
        </Drawer>
      </div>

      <h3 style={eyebrow}>Anatomy</h3>
      <DocTable head={["Part", "Detail", "classes"]} w0={150} rows={[
        ["Header", "worker name + flag + role · country", "px-5 pt-4 pb-3 border-b border-border/30"],
        ["Progress", "Signing Progress label + % + bar", "h-1.5 bg-muted → bg-primary fill · space-y-1.5"],
        ["Step", "icon + label/desc/timestamp + action", "p-3 rounded-lg border · complete grey + line-through · active bg-primary/5 + Clock"],
        ["Sign / Resend", "Sign (active admin) · Resend ghost (sent)", "Button h-7 · Resend RotateCcw text-muted-foreground"],
        ["Simulate", "outline full-width prompt after sending", "Button variant=outline w-full h-8"],
        ["Signed card", "confirmation once worker signs", "rounded-xl bg-accent-green-fill/10 border-accent-green-outline/20 text-center"],
      ]} />
    </div>
  ),
};
