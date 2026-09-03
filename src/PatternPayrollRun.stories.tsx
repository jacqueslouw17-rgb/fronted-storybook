import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Payroll Run (verbatim from F1 Fronted admin, F1v6_PayrollStepper).
 * The compact stepper that drives a payroll run — Submissions → Exceptions → Approve → Track.
 * Step indicator + label + optional exceptions badge + connector, with completed / active /
 * upcoming / locked states. Classes lifted verbatim from the source component.
 */
const meta: Meta = { title: "Patterns/Payroll Run", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

type StepState = "completed" | "active" | "upcoming" | "locked";
type Step = { label: string; state: StepState; badge?: number };

/** The payroll stepper — verbatim classes from F1v6_PayrollStepper. */
function Stepper({ steps }: { steps: Step[] }) {
  return (
    <div className="flex items-center gap-1">
      {steps.map((step, index) => {
        const s = step.state;
        return (
          <React.Fragment key={step.label}>
            <button
              disabled={s === "upcoming" || s === "locked"}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all duration-150 text-xs relative",
                s === "active" && "text-foreground font-medium",
                s === "completed" && "text-muted-foreground cursor-pointer hover:text-foreground",
                s === "upcoming" && "text-muted-foreground/70 cursor-not-allowed",
                s === "locked" && "text-muted-foreground/70 cursor-not-allowed opacity-80",
              )}
            >
              <div className={cn(
                "flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-medium transition-all",
                s === "completed" && "bg-accent-green-fill/15 text-accent-green-text",
                s === "active" && "bg-foreground/10 text-foreground",
                s === "upcoming" && "bg-muted/20 text-muted-foreground/30",
                s === "locked" && "bg-muted/10 text-muted-foreground/30",
              )}>
                {s === "completed" || s === "locked" ? <Check className="h-2.5 w-2.5" /> : <span>{index + 1}</span>}
              </div>
              <span className={cn("md:inline", s === "active" ? "inline" : "hidden")}>{step.label}</span>
              {step.badge && s !== "completed" && s !== "locked" ? (
                <span className="flex items-center justify-center min-w-[14px] h-3.5 px-1 rounded-full bg-amber-500/80 text-white text-[9px] font-medium">{step.badge}</span>
              ) : null}
            </button>
            {index < steps.length - 1 && (
              <div className={cn("w-4 h-px transition-colors", s === "completed" ? "bg-accent-green-text/15" : "bg-border/5")} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

const STEPS = ["Submissions", "Exceptions", "Approve", "Track"] as const;

export const PayrollRun: Story = {
  name: "Payroll Run",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        status="Stable"
        title="Payroll Run"
        lead={<>The stepper that drives a payroll run in the Fronted admin: <b>Submissions → Exceptions → Approve → Track</b>. Each step is an indicator + label, with an optional exceptions count badge and a connector. Steps read completed, active, upcoming or locked. Stepper markup verbatim from F1v6_PayrollStepper.</>}
        meta="Verbatim from F1 · Payroll run (fronted-admin-v6-1-clone)"
      />

      <h3 style={eyebrow}>Stepper — in progress (on Exceptions, 3 to resolve)</h3>
      <div className="rounded-xl border border-border/60 bg-card px-4 py-3 inline-flex">
        <Stepper steps={[
          { label: "Submissions", state: "completed" },
          { label: "Exceptions", state: "active", badge: 3 },
          { label: "Approve", state: "upcoming" },
          { label: "Track", state: "upcoming" },
        ]} />
      </div>

      <h3 style={eyebrow}>Stepper — approved &amp; tracking (prior steps locked)</h3>
      <div className="rounded-xl border border-border/60 bg-card px-4 py-3 inline-flex">
        <Stepper steps={[
          { label: "Submissions", state: "locked" },
          { label: "Exceptions", state: "locked" },
          { label: "Approve", state: "locked" },
          { label: "Track", state: "active" },
        ]} />
      </div>
      <p style={{ ...note, marginTop: 10 }}>indicator w-4 h-4 rounded-full · completed bg-accent-green-fill/15 text-accent-green-text + Check · active bg-foreground/10 · upcoming/locked muted · exceptions badge bg-amber-500/80 text-white · connector w-4 h-px (completed = accent-green-text/15).</p>

      <h3 style={eyebrow}>Step states</h3>
      <DocTable head={["State", "Indicator", "Meaning"]} w0={130} rows={[
        ["Completed", <div className="flex items-center justify-center w-4 h-4 rounded-full bg-accent-green-fill/15 text-accent-green-text"><Check className="h-2.5 w-2.5" /></div>, "Done · muted label · clickable to revisit"],
        ["Active", <div className="flex items-center justify-center w-4 h-4 rounded-full bg-foreground/10 text-foreground text-[9px] font-medium">2</div>, "Current step · foreground label · label always shown"],
        ["Upcoming", <div className="flex items-center justify-center w-4 h-4 rounded-full bg-muted/20 text-muted-foreground/30 text-[9px] font-medium">3</div>, "Not reachable yet · not clickable"],
        ["Locked", <div className="flex items-center justify-center w-4 h-4 rounded-full bg-muted/10 text-muted-foreground/30"><Check className="h-2.5 w-2.5" /></div>, "After approval, prior steps lock (opacity-80)"],
      ]} />

      <h3 style={eyebrow}>The four steps</h3>
      <DocTable head={["Step", "Screen", "What it does"]} w0={130} rows={[
        ["Submissions", "Submissions view", "Review the worker submissions & adjustments that make up the run"],
        ["Exceptions", "Exceptions step", "Resolve blocking issues (missing data, leave/attendance) before approval — count shown as the amber badge"],
        ["Approve", "Approve / Review step", "Final review of the batch, then approve (Continue to payout)"],
        ["Track", "Track step", "Monitor the payout execution and per-worker statuses"],
      ]} />
      <p style={{ ...note, marginTop: 10 }}>The step screens (Submissions, Exceptions, Approve, Track) are full flow surfaces — documented here as the run's spine; deeper drawers (Exception Fix, Manual Payout, Payslip Preview) are separate patterns.</p>
    </div>
  ),
};
