import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { KpiTile, KPI_ICONS, PipelineCard, StageColumn, TodoList, STAGES, WORKERS, overdue, needsOps, type Worker } from "@/components/flows/control-room";
import { Typography } from "@/components/ui/typography/typography";
import { wrap, PageHeader } from "./_docTable";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Control Room. Fronted ops' worker pipeline across every client (Control Center experiment,
 * fronted-design-system /flows/control-center): KPI tiles that filter it, one or several at once; the pipeline's
 * own stages; calm cards; To do beside it. Built from Components/Typography and Components/Icon.
 */
const meta: Meta = { title: "Patterns/Control Room", tags: ["autodocs", "dashboard", "pipeline", "kpi", "filter", "list"], parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

type Lens = "ops" | "worker" | "overdue" | "ready";
const inLens = (w: Worker, l: Lens) => l === "ops" ? needsOps(w) : l === "worker" ? !needsOps(w) && w.stage !== "CERTIFIED" : l === "overdue" ? overdue(w) : w.stage === "CERTIFIED";
const TODO = [
  { title: "Send the details form", items: [{ name: "Erik Nyström", detail: "🇸🇪 Fjord Health" }, { name: "Leah Novak", detail: "🇩🇪 Cardboard", days: 3 }] },
  { title: "Check compliance, send the contract", items: [{ name: "Oskar Lindgren", detail: "🇸🇪 Acme Corp" }, { name: "Hanna Virtanen", detail: "🇳🇴 Nordlys Studio AB", days: 3 }] },
  { title: "Start onboarding", items: [{ name: "Nora Bakke", detail: "🇳🇴 Fjord Health" }] },
];

function Tiles({ lenses, toggle }: { lenses: Lens[]; toggle: (l: Lens | null) => void }) {
  const live = WORKERS.filter((w) => w.stage !== "CERTIFIED");
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: 12 }}>
      <KpiTile label="In the pipeline" value={live.length} sub={`${live.filter((w) => w.origin === "client").length} added by clients`} icon={KPI_ICONS.pipeline} selected={!lenses.length} onToggle={() => toggle(null)} />
      <KpiTile label="Needs you" value={WORKERS.filter(needsOps).length} sub="Form, compliance, onboarding" icon={KPI_ICONS.needsYou} tone="warning" selected={lenses.includes("ops")} onToggle={() => toggle("ops")} />
      <KpiTile label="With workers" value={WORKERS.filter((w) => inLens(w, "worker")).length} sub="Details, signature, onboarding" icon={KPI_ICONS.withWorkers} selected={lenses.includes("worker")} onToggle={() => toggle("worker")} />
      <KpiTile label="Overdue" value={WORKERS.filter(overdue).length} sub="Longer than usual in a stage" icon={KPI_ICONS.overdue} tone="warning" selected={lenses.includes("overdue")} onToggle={() => toggle("overdue")} />
      <KpiTile label="Payroll ready" value={WORKERS.filter((w) => w.stage === "CERTIFIED").length} sub="This month" icon={KPI_ICONS.ready} tone="success" selected={lenses.includes("ready")} onToggle={() => toggle("ready")} />
    </div>
  );
}
const useLenses = (initial: Lens[] = []) => {
  const [lenses, set] = React.useState<Lens[]>(initial);
  return [lenses, (l: Lens | null) => set((ls) => (l === null ? [] : ls.includes(l) ? ls.filter((x) => x !== l) : [...ls, l]))] as const;
};

/** The whole room: tiles, the pipeline (scrolls sideways), To do beside it. Click tiles to filter, several at once */
export const ControlRoom: Story = {
  name: "Control room",
  render: () => {
    const [lenses, toggle] = useLenses();
    const shown = WORKERS.filter((w) => !lenses.length || lenses.some((l) => inLens(w, l)));
    return (
      <div style={{ ...wrap, maxWidth: 1240 }}>
        <PageHeader category="Pattern" status="Beta" title="Control Room" lead={<>Fronted ops&rsquo; worker pipeline across every client. The tiles filter it, one or several at once; cards carry one tag, only where ops act.</>} meta="Control Center experiment · fronted-design-system /flows/control-center" />
        <div style={{ display: "grid", gap: 20 }}>
          <Tiles lenses={lenses} toggle={toggle} />
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 300px", gap: 20 }}>
            <div className="rounded-xl border border-[color:var(--ds-color-border)] bg-[color:var(--ds-color-surface)]" style={{ overflowX: "auto", padding: 12, display: "flex", gap: 12 }}>
              {STAGES.map((s) => <StageColumn key={s.id} stage={s.id} workers={shown.filter((w) => w.stage === s.id)} />)}
            </div>
            <TodoList groups={TODO} />
          </div>
        </div>
      </div>
    );
  },
};

/** Tiles: none on (everything), one on, several on */
export const KpiTiles: Story = {
  name: "KPI tiles",
  render: () => {
    const [a, ta] = useLenses();
    const [b, tb] = useLenses(["ops"]);
    const [c, tc] = useLenses(["ops", "overdue"]);
    return (
      <div style={{ ...wrap, maxWidth: 1240, display: "grid", gap: 24 }}>
        {[["Everything", a, ta], ["One filter: Needs you", b, tb], ["Two filters: Needs you or Overdue", c, tc]].map(([t, l, fn]) => (
          <section key={t as string} style={{ display: "grid", gap: 8 }}>
            <Typography variant="overline" color="muted">{t as string}</Typography>
            <Tiles lenses={l as Lens[]} toggle={fn as (l: Lens | null) => void} />
          </section>
        ))}
      </div>
    );
  },
};

/** A card in each state it can be in: ops' own step (tag), waiting on the worker (no tag), overdue (warning edge and days), payroll ready */
export const PipelineCards: Story = {
  name: "Pipeline cards",
  render: () => (
    <div style={{ ...wrap, display: "grid", gridTemplateColumns: "repeat(4, 184px)", gap: 16 }}>
      {[
        ["Ops’ step", WORKERS.find((w) => w.id === "o3")!],
        ["With the worker", WORKERS.find((w) => w.id === "o6")!],
        ["Overdue", WORKERS.find((w) => w.id === "o4")!],
        ["Payroll ready", WORKERS.find((w) => w.id === "o8")!],
      ].map(([t, w]) => (
        <div key={t as string} style={{ display: "grid", gap: 8 }}>
          <Typography variant="overline" color="muted">{t as string}</Typography>
          <PipelineCard worker={w as Worker} />
        </div>
      ))}
    </div>
  ),
};

/** To do, with items and when nothing needs ops */
export const ToDo: Story = {
  name: "To do",
  render: () => (
    <div style={{ ...wrap, display: "grid", gridTemplateColumns: "300px 300px", gap: 24, alignItems: "start" }}>
      <TodoList groups={TODO} />
      <TodoList groups={[]} />
    </div>
  ),
};
