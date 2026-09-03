import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Check } from "lucide-react";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import { cn } from "@/lib/utils";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Data Collection Stepper (verbatim from F2 Worker Data, F2v21_Stepper).
 * The horizontal multi-step progress indicator used across the Flow 2 data-collection wizard:
 * numbered circles (completed = filled + check, current = ringed, upcoming = muted) joined by
 * connector lines. Steps: Intro · Core · Payroll · Review · Success. Markup verbatim from source
 * (current-step text uses text-emphasis per the system's a11y swap).
 */
const meta: Meta = { title: "Patterns/Data Collection Stepper", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const STEPS = ["Intro", "Core", "Payroll", "Review", "Success"];

function Stepper({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {STEPS.map((label, index) => {
        const isCompleted = index < current;
        const isCurrent = index === current;
        return (
          <React.Fragment key={label}>
            <div className="flex items-center gap-2">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                isCompleted && "bg-primary text-primary-foreground",
                isCurrent && "bg-primary/20 text-emphasis border-2 border-primary",
                !isCompleted && !isCurrent && "bg-muted text-muted-foreground")}>
                {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
              </div>
              <span className={cn("text-sm hidden sm:block", isCurrent && "text-foreground font-medium", !isCurrent && "text-muted-foreground")}>{label}</span>
            </div>
            {index < STEPS.length - 1 && <div className={cn("w-8 sm:w-12 h-0.5", index < current ? "bg-primary" : "bg-muted")} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export const DataCollectionStepper: Story = {
  name: "Data Collection Stepper",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        status="Stable"
        title="Data Collection Stepper"
        lead={<>The horizontal progress indicator for the Flow 2 worker data-collection wizard — numbered circles (completed = filled with a check, current = ringed, upcoming = muted) joined by connector lines that fill as the worker advances through Intro · Core · Payroll · Review · Success. Markup verbatim from F2v21_Stepper.</>}
        meta="Verbatim from F2 · Data collection stepper (candidate-data-v2-1)"
      />

      <h3 style={eyebrow}>Start — Intro (step 1)</h3>
      <Stepper current={0} />

      <h3 style={eyebrow}>Mid — Payroll (step 3)</h3>
      <Stepper current={2} />

      <h3 style={eyebrow}>End — Success (step 5)</h3>
      <Stepper current={4} />
      <p style={{ ...note, marginTop: 4 }}>circle w-8 h-8 rounded-full · completed bg-primary text-primary-foreground + Check · current bg-primary/20 border-2 border-primary text-emphasis · upcoming bg-muted text-muted-foreground · connector w-8 sm:w-12 h-0.5 (bg-primary once passed) · label hidden sm:block.</p>

      <h3 style={eyebrow}>Anatomy</h3>
      <DocTable head={["State", "Detail", "classes"]} w0={150} rows={[
        ["Completed", "filled circle with check + connector filled", "bg-primary text-primary-foreground · Check h-4 · connector bg-primary"],
        ["Current", "ringed circle + bold label", "bg-primary/20 border-2 border-primary text-emphasis · label text-foreground font-medium"],
        ["Upcoming", "muted circle with number", "bg-muted text-muted-foreground · connector bg-muted"],
        ["Steps", "Intro · Core · Payroll · Review · Success", "flex items-center justify-center gap-2"],
      ]} />
    </div>
  ),
};
