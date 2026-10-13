import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { WorkerPipeline as Pipeline, WorkerCard, PipelineColumn, ACME_WORKERS, PIPELINE_COLUMNS, STATUS_CONFIG, StageActions } from "@/components/flows/worker-pipeline";
import { wrap, eyebrow, note, PageHeader } from "./_docTable";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Worker Pipeline (verbatim from F1 Fronted admin, Workers kanban).
 * Seven stage columns (config.color container, rounded header + body) of worker cards. Each card:
 * name + flag (+ hover trash on Offer Accepted, Active badge on Payroll ready), a detail block and
 * a two-button footer whose pair depends on the stage. Components live in
 * components/flows/worker-pipeline, lifted from F1v6_PipelineView.
 */
const meta: Meta = { title: "Patterns/Worker Pipeline", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

export const WorkerPipeline: Story = {
  name: "Worker Pipeline",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        status="Stable"
        title="Worker Pipeline"
        lead={<>The Workers kanban in the Fronted admin. Seven stage columns, each a tinted container (rounded header + body) of worker cards; every card has name + flag, a detail block and a two-button footer whose pair changes per stage. Markup verbatim from F1v6_PipelineView.</>}
        meta="Verbatim from F1 · Workers tab (fronted-admin-dashboard-v6-1)"
      />

      <h3 style={eyebrow}>Pipeline</h3>
      <p style={{ ...note, marginTop: -6, marginBottom: 12 }}>All seven stages with Acme Corp's seeded workers. Scroll sideways.</p>
      <Pipeline />
      <p style={{ ...note, marginTop: 10 }}>Container pb-4 overflow-x-auto lg:h-[min(496px,calc(100vh-320px))] · row flex gap-4 min-w-max · column w-[304px] · header p-3 rounded-t-lg border-t border-x + per-stage config.color · body p-3 space-y-3 border-x border-b rounded-b-lg (same color) · title h3 font-semibold text-[15px] + Info · count outline Badge h-5 w-5 rounded-full.</p>

      <h3 style={eyebrow}>Worker card — anatomy</h3>
      <div style={{ maxWidth: 304 }}><WorkerCard worker={ACME_WORKERS[0]} /></div>
      <p style={{ ...note, marginTop: 10 }}>CardContent flex min-h-[180px] flex-col p-2.5 · name font-semibold text-sm + flag · role text-[13px] muted · data rows mt-2.5 pt-2 border-t text-[13px] (salary / fee is tabular-nums) · footer mt-auto flex gap-2 pt-3 · buttons text-[13px] h-8.</p>

      <h3 style={eyebrow}>Footer action pairs (by stage)</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
        {PIPELINE_COLUMNS.map((status) => (
          <div key={status} className="rounded-xl border border-border/40 bg-card p-3">
            <div className="text-xs font-medium text-muted-foreground mb-2">{STATUS_CONFIG[status].label}</div>
            <StageActions status={status} />
          </div>
        ))}
      </div>
      <p style={{ ...note, marginTop: 10 }}>Outline (left) = Button variant="outline" · Primary (right) = Button default + bg-gradient-primary hover:opacity-90. Payroll ready shows two outline buttons (View · Edit).</p>

      <h3 style={eyebrow}>Empty first stage</h3>
      <div style={{ maxWidth: 304 }}><PipelineColumn status="offer-accepted" workers={[]} /></div>
    </div>
  ),
};
