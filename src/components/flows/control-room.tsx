import * as React from "react";
import { ChevronRight, CircleAlert, Clock, FileSignature, ShieldCheck, Users, type LucideIcon } from "lucide-react";
import { Typography } from "@/components/ui/typography/typography";
import { Icon } from "@/components/ui/icon/icon";
import { cn } from "@/lib/utils";

/**
 * Control Room: Fronted ops' view of the worker pipeline across clients (the Control Center experiment in
 * fronted-design-system, /flows/control-center). KPI tiles that filter the pipeline, one or several at once;
 * the pipeline's own stages; calm cards with one tag only where ops act; a To do list beside it.
 * Built from Typography and Icon on the semantic tokens.
 */

export type Stage = "offer-accepted" | "data-pending" | "drafting" | "awaiting-signature" | "trigger-onboarding" | "onboarding-pending" | "CERTIFIED";
export const STAGES: { id: Stage; label: string; who: string; ops: boolean; usual: number; action?: string }[] = [
  { id: "offer-accepted", label: "Negotiations done", who: "Fronted sends the form", ops: true, usual: 2, action: "Send form" },
  { id: "data-pending", label: "Awaiting worker details", who: "With the worker", ops: false, usual: 3 },
  { id: "drafting", label: "Prepare Contract", who: "Fronted: compliance, contract", ops: true, usual: 2, action: "Check compliance" },
  { id: "awaiting-signature", label: "Waiting for Signature", who: "With the worker", ops: false, usual: 3 },
  { id: "trigger-onboarding", label: "Onboard Worker", who: "Fronted starts onboarding", ops: true, usual: 1, action: "Start onboarding" },
  { id: "onboarding-pending", label: "Awaiting onboarding", who: "With the worker", ops: false, usual: 3 },
  { id: "CERTIFIED", label: "Payroll Ready", who: "Done", ops: false, usual: 0 },
];
const STAGE = Object.fromEntries(STAGES.map((s) => [s.id, s])) as Record<Stage, (typeof STAGES)[number]>;

export interface Worker { id: string; name: string; client: string; flag: string; stage: Stage; days: number; origin?: "client" | "fronted" }
export const overdue = (w: Worker) => w.stage !== "CERTIFIED" && w.days > STAGE[w.stage].usual;
export const needsOps = (w: Worker) => STAGE[w.stage].ops;

export const WORKERS: Worker[] = [
  { id: "o1", name: "Erik Nyström", client: "Fjord Health", flag: "🇸🇪", stage: "offer-accepted", days: 1 },
  { id: "o10", name: "Leah Novak", client: "Cardboard", flag: "🇩🇪", stage: "offer-accepted", days: 3 },
  { id: "o2", name: "Astrid Johansson", client: "Nordlys Studio AB", flag: "🇸🇪", stage: "data-pending", days: 1, origin: "client" },
  { id: "o11", name: "Jonas Pedersen", client: "Acme Corp", flag: "🇩🇰", stage: "data-pending", days: 4, origin: "client" },
  { id: "o3", name: "Oskar Lindgren", client: "Acme Corp", flag: "🇸🇪", stage: "drafting", days: 0, origin: "client" },
  { id: "o4", name: "Hanna Virtanen", client: "Nordlys Studio AB", flag: "🇳🇴", stage: "drafting", days: 3, origin: "client" },
  { id: "o6", name: "Mei Lin Tan", client: "Acme Corp", flag: "🇸🇬", stage: "awaiting-signature", days: 2 },
  { id: "o7", name: "Sofie de Vries", client: "Cardboard", flag: "🇳🇱", stage: "awaiting-signature", days: 5 },
  { id: "o12", name: "Nora Bakke", client: "Fjord Health", flag: "🇳🇴", stage: "trigger-onboarding", days: 0, origin: "client" },
  { id: "o13", name: "Pieter Smit", client: "Acme Corp", flag: "🇳🇱", stage: "onboarding-pending", days: 2 },
  { id: "o8", name: "Diego Hernández", client: "Acme Corp", flag: "🇲🇽", stage: "CERTIFIED", days: 0 },
];

const SURFACE = "rounded-xl border border-[color:var(--ds-color-border)] bg-[color:var(--ds-color-surface)]";
const TAG_WARNING = "inline-flex items-center rounded-full px-2 py-0.5 bg-[color:var(--ds-feedback-warning-bg)] text-[color:var(--ds-feedback-warning-fg)]";

/* ─── KPI tile: a lens on the pipeline; on, it lights up (primary border, soft ring, filled icon, underlined label) ─── */
export type KpiTone = "default" | "warning" | "success";
export interface KpiTileProps { label: string; value: number; sub: string; icon: LucideIcon; tone?: KpiTone; selected?: boolean; onToggle?: () => void }
export function KpiTile({ label, value, sub, icon, tone = "default", selected, onToggle }: KpiTileProps) {
  return (
    <button type="button" aria-pressed={!!selected} onClick={onToggle}
      className={cn(SURFACE, "flex w-full flex-col items-start p-4 text-left transition-[border-color,box-shadow] duration-200",
        selected && "border-[color:var(--ds-color-focus-ring)] shadow-[0_0_0_3px_color-mix(in_srgb,var(--ds-color-focus-ring)_15%,transparent)]")}>
      <span className="flex w-full items-center justify-between">
        <Typography variant="caption" color={selected ? "strong" : "muted"} className={cn(selected && "underline decoration-2 underline-offset-[6px]")}>{label}</Typography>
        <span className={cn("flex h-6 w-6 items-center justify-center rounded-full transition-colors", selected && "bg-[color:var(--ds-color-primary)] text-[color:var(--ds-color-primary-fg)]")}>
          <Icon icon={icon} size={selected ? "sm" : "md"} tone={selected ? "inherit" : tone === "warning" ? "warning" : tone === "success" ? "success" : "muted"} />
        </span>
      </span>
      <Typography variant="h4" tabular className="mt-2">{value}</Typography>
      <Typography variant="caption" className="mt-0.5">{sub}</Typography>
    </button>
  );
}
export const KPI_ICONS = { pipeline: Users, needsYou: CircleAlert, withWorkers: FileSignature, overdue: Clock, ready: ShieldCheck };

/* ─── Pipeline card: name and days, the client; one tag only for ops' own step ─── */
export interface PipelineCardProps { worker: Worker; onOpen?: () => void }
export function PipelineCard({ worker: w, onOpen }: PipelineCardProps) {
  const st = STAGE[w.stage];
  return (
    <button type="button" onClick={onOpen}
      className={cn("block w-full rounded-lg border bg-[color:var(--ds-color-surface)] p-2.5 text-left", overdue(w) ? "border-[color:var(--ds-feedback-warning-border)]" : "border-[color:var(--ds-color-border)]")}>
      <span className="flex items-start justify-between gap-2">
        <Typography variant="label" as="span" color="heading" className="min-w-0 truncate">{w.name}</Typography>
        {w.stage !== "CERTIFIED" && <Typography variant="caption" tabular color={overdue(w) ? "warning" : "muted"}>{w.days === 0 ? "today" : `${w.days}d`}</Typography>}
      </span>
      <Typography variant="caption" as="span" className="mt-0.5 block truncate">{w.flag} {w.client}</Typography>
      {st.ops && <Typography variant="caption" as="span" color="inherit" className={cn(TAG_WARNING, "mt-2 font-medium")}>{st.action}</Typography>}
    </button>
  );
}

/* ─── A stage column: its label, whose move it is, its cards ─── */
export function StageColumn({ stage, workers, width = 184 }: { stage: Stage; workers: Worker[]; width?: number }) {
  const st = STAGE[stage];
  return (
    <div className="shrink-0 rounded-lg bg-[color:var(--ds-color-surface-sunken)] p-2" style={{ width }}>
      <div className="mb-2 px-1">
        <span className="flex items-center justify-between">
          <Typography variant="caption" color="heading" className="font-medium">{st.label}</Typography>
          <Typography variant="caption" tabular>{workers.length}</Typography>
        </span>
        <Typography variant="caption" color={st.ops ? "warning" : "muted"} className="block">{st.who}</Typography>
      </div>
      <div className="space-y-2">
        {workers.map((w) => <PipelineCard key={w.id} worker={w} />)}
        {!workers.length && <Typography variant="caption" className="block px-1 py-3 text-center">Nothing here</Typography>}
      </div>
    </div>
  );
}

/* ─── To do: what ops must act on, by step; text and a chevron, overdue days in the warning tone ─── */
export interface TodoGroup { title: string; items: { name: string; detail: string; days?: number }[] }
export function TodoList({ groups }: { groups: TodoGroup[] }) {
  const n = groups.reduce((a, g) => a + g.items.length, 0);
  return (
    <aside className={cn(SURFACE, "w-full")}>
      <div className="border-b border-[color:var(--ds-color-border)] px-4 py-3">
        <Typography variant="label" color="heading">To do </Typography><Typography variant="caption" tabular>{n}</Typography>
      </div>
      {!n && <Typography variant="body-sm" color="muted" className="px-4 py-6 text-center">Nothing needs you right now.</Typography>}
      {groups.filter((g) => g.items.length).map((g) => (
        <div key={g.title} className="border-b border-[color:var(--ds-color-border)] last:border-0">
          <Typography variant="overline" as="p" className="px-4 pb-1 pt-3">{g.title} · {g.items.length}</Typography>
          {g.items.map((it) => (
            <button key={it.name} type="button" className="flex w-full items-center gap-3 px-4 py-2.5 text-left">
              <span className="min-w-0 flex-1">
                <Typography variant="label" as="span" color="heading" className="block">{it.name}</Typography>
                <Typography variant="caption" as="span" className="block">{it.detail}{it.days ? <Typography variant="caption" as="span" color="warning" className="font-medium"> · {it.days} days</Typography> : null}</Typography>
              </span>
              <Icon icon={ChevronRight} tone="muted" />
            </button>
          ))}
        </div>
      ))}
    </aside>
  );
}
export { STAGE };
