import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Circle, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import "./tokens.css";
import "./typography.css";
import { PageHeader } from "./_docTable";

/**
 * Patterns — Signing Progress (verbatim F1v6_SignatureWorkflowDrawer).
 * A "Signing Progress N%" header with a bg-primary bar, then step rows. Each step:
 * complete = fully muted (bg-muted/30 border-border/50 + grey CheckCircle2 + label
 * line-through text-muted-foreground) — a settled, done state, no green; active =
 * bg-primary/5 border-primary/15 + Clock; pending = bg-muted/20 opacity-50 + Circle.
 */
const meta: Meta = { title: "Patterns/Signing Progress", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const wrap: React.CSSProperties = { fontFamily: "var(--ds-font-body)", color: "var(--ds-color-text)", maxWidth: 940, padding: 4 };
const eyebrow: React.CSSProperties = { fontSize: 12, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ds-color-text-muted)", margin: "28px 0 12px", fontWeight: 600 };
const note: React.CSSProperties = { fontFamily: "var(--ds-font-mono)", fontSize: 11, color: "var(--ds-color-text-muted)", marginTop: 10 };

type State = "complete" | "active" | "pending";
function Step({ state, label, desc, action }: { state: State; label: string; desc: string; action?: React.ReactNode }) {
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
      </div>
      {action}
    </div>
  );
}

function Drawer({ pct, steps }: { pct: number; steps: React.ReactNode }) {
  return (
    <div className="w-full max-w-[420px] rounded-xl border border-border/40 bg-card overflow-hidden">
      <div className="px-5 py-4 border-b border-border/40">
        <div className="flex items-center gap-2 font-semibold">Marcus Chen <span>🇸🇬</span></div>
        <p className="text-xs text-muted-foreground mt-0.5">Senior Backend Engineer · Singapore</p>
      </div>
      <div className="px-5 py-4">
        <div className="flex items-center justify-between mb-1.5"><span className="text-xs text-muted-foreground">Signing Progress</span><span className="text-xs font-medium text-foreground tabular-nums">{pct}%</span></div>
        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden mb-4"><div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} /></div>
        <div className="space-y-2">{steps}</div>
      </div>
    </div>
  );
}

export const SigningProgress: Story = {
  name: "Signing Progress",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        title="Signing Progress"
        lead={<>
        The signature workflow (F1v6_SignatureWorkflowDrawer): a <code>bg-primary</code> progress bar + step rows.
        A completed step is a <strong>settled grey state</strong> — muted check + struck-through label, no green.
        </>}
      />

      <h3 style={eyebrow}>Start (0%)</h3>
      <Drawer pct={0} steps={<>
        <Step state="active" label="Admin Signature" desc="Waiting for admin to sign the contract." action={<Button size="sm" className="flex-shrink-0 h-7 text-xs px-3">Sign</Button>} />
        <Step state="pending" label="Send to Worker" desc="Cannot send until admin signs the contract." />
        <Step state="pending" label="Worker Signed" desc="Pending worker signature." />
      </>} />
      <p style={note}>bar h-1.5 bg-muted → bg-primary fill · row items-center p-3 · complete bg-muted/30 + grey CheckCircle2 + label line-through text-muted-foreground · active bg-primary/5 + Clock · pending bg-muted/20 opacity-50 + Circle</p>

      <h3 style={eyebrow}>Partway (66%)</h3>
      <Drawer pct={66} steps={<>
        <Step state="complete" label="Admin Signature" desc="Signed by Joe User · 2h ago." />
        <Step state="active" label="Send to Worker" desc="Ready to send the contract to Marcus." action={<Button size="sm" className="flex-shrink-0 h-7 text-xs px-3">Send</Button>} />
        <Step state="pending" label="Worker Signed" desc="Pending worker signature." />
      </>} />

      <h3 style={eyebrow}>Complete (100%)</h3>
      <Drawer pct={100} steps={<>
        <Step state="complete" label="Admin Signature" desc="Signed by Joe User · 2h ago." />
        <Step state="complete" label="Send to Worker" desc="Sent · 1h ago." action={<Button size="sm" variant="ghost" className="flex-shrink-0 h-7 text-xs px-2.5 text-muted-foreground hover:text-foreground"><RotateCcw className="h-3 w-3 mr-1" />Resend</Button>} />
        <Step state="complete" label="Worker Signed" desc="Signed by Marcus · just now." />
      </>} />
    </div>
  ),
};
