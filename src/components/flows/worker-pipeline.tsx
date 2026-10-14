import * as React from "react";
import { Settings, Send, Eye, RotateCcw, FileEdit, FileSignature, Pencil, Trash2, Info, Plus, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Worker Pipeline — the Workers kanban in F1 (fronted-admin-dashboard-v6-1-clone).
 * Markup verbatim from F1v6_PipelineView (default "certified" mode): column container,
 * column header + body tinted per stage, worker card with a per-stage action pair.
 */

export type PipelineStatus =
  | "offer-accepted" | "data-pending" | "drafting" | "awaiting-signature"
  | "trigger-onboarding" | "onboarding-pending" | "CERTIFIED";

export type Worker = {
  id: string; name: string; country: string; countryFlag: string; role: string;
  salary: string; status: PipelineStatus; employmentType: "employee" | "contractor";
};

export const PIPELINE_COLUMNS: ReadonlyArray<PipelineStatus> = [
  "offer-accepted", "data-pending", "drafting", "awaiting-signature",
  "trigger-onboarding", "onboarding-pending", "CERTIFIED",
];

export const STATUS_CONFIG: Record<PipelineStatus, { label: string; color: string; tooltip: string }> = {
  "offer-accepted": { label: "Offer Accepted", color: "bg-muted/50 border-border", tooltip: "Worker has accepted the offer and is ready for next steps" },
  "data-pending": { label: "Awaiting worker details", color: "bg-accent-yellow-fill/30 border-accent-yellow-outline/20", tooltip: "Waiting for worker to submit details for contract prep" },
  "drafting": { label: "Prepare Contract", color: "bg-accent-blue-fill/30 border-accent-blue-outline/20", tooltip: "Review worker details and confirm terms before generating" },
  "awaiting-signature": { label: "Waiting for Signature", color: "bg-accent-purple-fill/30 border-accent-purple-outline/20", tooltip: "Contract sent - awaiting worker review" },
  "trigger-onboarding": { label: "Onboard Worker", color: "bg-primary/10 border-primary/20", tooltip: "Start the worker onboarding process with checklist and tracking" },
  "onboarding-pending": { label: "Awaiting onboarding", color: "bg-accent-blue-fill/30 border-accent-blue-outline/20", tooltip: "Monitor completion status and send reminders" },
  "CERTIFIED": { label: "Payroll ready", color: "bg-accent-green-fill/30 border-accent-green-outline/20", tooltip: "All required details collected and verified ✅" },
};

/** Acme Corp's workers as F1 v6.1 seeds them (DEFAULT_DRAFTING_CANDIDATES). */
export const ACME_WORKERS: Worker[] = [
  { id: "offer-1", name: "Anika Lindqvist", country: "Norway", countryFlag: "🇳🇴", role: "Frontend Engineer", salary: "NOK 65,000/mo", status: "offer-accepted", employmentType: "employee" },
  { id: "data-1", name: "Yuki Tanaka", country: "Japan", countryFlag: "🇯🇵", role: "iOS Engineer", salary: "JPY 850,000/mo", status: "data-pending", employmentType: "employee" },
  { id: "data-2", name: "Sukarno", country: "Indonesia", countryFlag: "🇮🇩", role: "Growth Marketer", salary: "IDR 45,000,000/mo", status: "data-pending", employmentType: "contractor" },
  { id: "onboard-pending-1", name: "Mateusz Kowalski", country: "Poland", countryFlag: "🇵🇱", role: "Backend Engineer", salary: "PLN 22,000/mo", status: "onboarding-pending", employmentType: "employee" },
  { id: "onboard-pending-2", name: "Fatima Al-Sayed", country: "United Arab Emirates", countryFlag: "🇦🇪", role: "Finance Analyst", salary: "AED 28,000/mo", status: "onboarding-pending", employmentType: "employee" },
  { id: "onboard-pending-3", name: "Camila Duarte", country: "Portugal", countryFlag: "🇵🇹", role: "Product Manager", salary: "EUR 5,400/mo", status: "onboarding-pending", employmentType: "employee" },
  { id: "onboard-pending-4", name: "Tomás Ferreira", country: "Brazil", countryFlag: "🇧🇷", role: "QA Engineer", salary: "BRL 18,000/mo", status: "onboarding-pending", employmentType: "contractor" },
  { id: "default-1", name: "Marcus Chen", country: "Singapore", countryFlag: "🇸🇬", role: "Senior Backend Engineer", salary: "SGD 12,000/mo", status: "drafting", employmentType: "contractor" },
  { id: "default-2", name: "Sofia Rodriguez", country: "Spain", countryFlag: "🇪🇸", role: "Product Designer", salary: "EUR 6,500/mo", status: "drafting", employmentType: "contractor" },
  { id: "sig-1", name: "Liam O'Connor", country: "Ireland", countryFlag: "🇮🇪", role: "DevOps Engineer", salary: "EUR 7,200/mo", status: "awaiting-signature", employmentType: "contractor" },
  { id: "onboard-1", name: "Priya Sharma", country: "India", countryFlag: "🇮🇳", role: "Data Analyst", salary: "INR 1,20,000/mo", status: "trigger-onboarding", employmentType: "employee" },
  { id: "onboard-ph-1", name: "Rafael Cruz", country: "Philippines", countryFlag: "🇵🇭", role: "Customer Success Lead", salary: "PHP 85,000/mo", status: "trigger-onboarding", employmentType: "employee" },
  { id: "onboard-de-1", name: "Lena Müller", country: "Germany", countryFlag: "🇩🇪", role: "Compliance Officer", salary: "EUR 5,800/mo", status: "trigger-onboarding", employmentType: "employee" },
  { id: "done-de-1", name: "Jonas Weber", country: "Germany", countryFlag: "🇩🇪", role: "Solutions Architect", salary: "EUR 6,900/mo", status: "CERTIFIED", employmentType: "employee" },
  { id: "done-1", name: "Maria Santos", country: "Philippines", countryFlag: "🇵🇭", role: "Full-Stack Developer", salary: "PHP 95,000/mo", status: "CERTIFIED", employmentType: "employee" },
  { id: "done-2", name: "Liam O'Brien", country: "Ireland", countryFlag: "🇮🇪", role: "DevOps Engineer", salary: "EUR 7,200/mo", status: "CERTIFIED", employmentType: "contractor" },
  { id: "done-3", name: "Diego Hernández", country: "Mexico", countryFlag: "🇲🇽", role: "Backend Engineer", salary: "MXN 75,000/mo", status: "CERTIFIED", employmentType: "employee" },
  { id: "done-5", name: "Rafael Costa", country: "Portugal", countryFlag: "🇵🇹", role: "Mobile Developer", salary: "EUR 5,600/mo", status: "CERTIFIED", employmentType: "employee" },
];

type Action = { label: string; icon: LucideIcon; iconClass?: string; outline?: boolean; gap?: string };

/** The action pair each stage shows in the card footer. */
export const STAGE_ACTIONS: Record<PipelineStatus, [Action, Action]> = {
  "offer-accepted": [{ label: "Configure", icon: Settings, outline: true }, { label: "Send Form", icon: Send }],
  "data-pending": [{ label: "View", icon: Eye, outline: true }, { label: "Resend", icon: RotateCcw, iconClass: "h-3.5 w-3.5", gap: "gap-1.5" }],
  "drafting": [{ label: "View", icon: Eye, outline: true }, { label: "Draft Contract", icon: FileEdit }],
  "awaiting-signature": [{ label: "View", icon: Eye, outline: true }, { label: "Track Progress", icon: FileSignature }],
  "trigger-onboarding": [{ label: "Configure", icon: Settings, outline: true }, { label: "Send Form", icon: Send }],
  "onboarding-pending": [{ label: "View", icon: Eye, outline: true }, { label: "Resend", icon: RotateCcw, iconClass: "h-3.5 w-3.5", gap: "gap-1.5" }],
  "CERTIFIED": [{ label: "View", icon: Eye, outline: true }, { label: "Edit", icon: Pencil, outline: true }],
};

/** Reports a card action (worker, button label) to whoever renders the pipeline. */
const ActionContext = React.createContext<((worker: Worker, action: string) => void) | undefined>(undefined);

function ActionButton({ a, worker }: { a: Action; worker?: Worker }) {
  const onAction = React.useContext(ActionContext);
  return (
    <Button
      onClick={worker && onAction ? () => onAction(worker, a.label) : undefined}
      variant={a.outline ? "outline" : "default"}
      size="sm"
      className={cn("flex-1 text-[13px] h-8", a.gap || "gap-1", !a.outline && "bg-gradient-primary hover:opacity-90")}
    >
      <a.icon className={a.iconClass || "h-3 w-3"} />
      {a.label}
    </Button>
  );
}

/** A stage's footer action pair. Some stages wrap the pair in a stacked group. */
export function StageActions({ status, worker }: { status: PipelineStatus; worker?: Worker }) {
  const [left, right] = STAGE_ACTIONS[status];
  const wrapped = status === "offer-accepted" || status === "data-pending" || status === "trigger-onboarding" || status === "onboarding-pending";
  return wrapped
    ? <div className="w-full space-y-2"><div className="flex gap-2"><ActionButton a={left} worker={worker} /><ActionButton a={right} worker={worker} /></div></div>
    : <div className="w-full flex gap-2"><ActionButton a={left} worker={worker} /><ActionButton a={right} worker={worker} /></div>;
}

export function WorkerCard({ worker, status = worker.status }: { worker: Worker; status?: PipelineStatus }) {
  return (
    <Card className="border border-border/40 bg-card relative group/wcard transition-colors duration-150">
      <CardContent className="flex min-h-[180px] flex-col p-2.5">
        <div className="flex items-center gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-sm text-foreground truncate">{worker.name}</span>
              <span className="text-sm">{worker.countryFlag}</span>
              {status === "CERTIFIED" && (
                <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-[14px] flex-shrink-0 pointer-events-none ml-auto bg-accent-green-fill/10 text-accent-green-text border-accent-green-outline/20">
                  Active
                </Badge>
              )}
              {status === "offer-accepted" && (
                <Button variant="ghost" size="icon" className="h-5 w-5 ml-auto text-muted-foreground/60 hover:text-destructive hover:bg-destructive/10 relative z-10 flex-shrink-0 opacity-0 group-hover/wcard:opacity-100 transition-opacity duration-150">
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>
            <p className="text-[13px] text-muted-foreground truncate">{worker.role}</p>
          </div>
        </div>

        <div className="mt-2.5 pt-2 border-t border-border/30 flex flex-col gap-1 text-[13px]">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">{worker.employmentType === "employee" ? "Monthly salary" : "Monthly fee"}</span>
            <span className="font-medium text-foreground tabular-nums">{worker.salary}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Country</span>
            <span className="font-medium text-foreground">{worker.country}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Type</span>
            <span className="font-medium text-foreground">{worker.employmentType === "contractor" ? "Contractor (COR)" : "Employee (EOR)"}</span>
          </div>
        </div>

        <div className="mt-auto flex gap-2 pt-3">
          <StageActions status={status} worker={worker} />
        </div>
      </CardContent>
    </Card>
  );
}

export function PipelineColumn({ status, workers }: { status: PipelineStatus; workers: Worker[] }) {
  const config = STATUS_CONFIG[status];
  return (
    <div className="w-[304px] flex-shrink-0 lg:flex lg:h-full lg:min-h-0 lg:flex-col transition-all duration-300">
      <div className={cn("p-3 rounded-t-lg border-t border-x transition-all duration-300", config.color)}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <div className="flex min-w-0 items-center gap-1.5" title={config.tooltip}>
              <h3 className="font-semibold text-[15px] text-foreground whitespace-nowrap">{config.label}</h3>
              <Info className="h-3 w-3 text-muted-foreground" />
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {((status === "offer-accepted" && workers.length > 0) || status === "CERTIFIED") && (
              <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10">
                <Plus className="h-3.5 w-3.5" />
              </Button>
            )}
            <Badge variant="outline" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {workers.length}
            </Badge>
          </div>
        </div>
      </div>
      <div className={cn("sm:min-h-[400px] sm:max-h-[calc(100vh-260px)] sm:overflow-y-auto lg:min-h-0 lg:max-h-none lg:flex-1 lg:overscroll-y-contain p-3 space-y-3 border-x border-b rounded-b-lg", config.color)}>
        {status === "offer-accepted" && workers.length === 0 && (
          <div className="min-h-[calc(400px-1.5rem)] flex flex-col items-center justify-center px-4 text-center">
            <h3 className="text-sm font-medium text-foreground mb-1">No workers yet</h3>
            <p className="text-xs text-muted-foreground mb-4 max-w-[200px]">Add your first worker to start the contracting process</p>
            <Button size="sm">Add Worker</Button>
          </div>
        )}
        {workers.map((w) => <WorkerCard key={w.id} worker={w} status={status} />)}
      </div>
    </div>
  );
}

/** The full pipeline: every column, horizontally scrollable. */
/** `onAction(worker, label)` is called when a card's action is pressed (e.g. Draft Contract). */
export function WorkerPipeline({ workers = ACME_WORKERS, columns = PIPELINE_COLUMNS, className, onAction }: { workers?: Worker[]; columns?: ReadonlyArray<PipelineStatus>; className?: string; onAction?: (worker: Worker, action: string) => void }) {
  return (
    <ActionContext.Provider value={onAction}>
      <div className={cn("pb-4 overflow-x-auto lg:h-[min(496px,calc(100vh-320px))] lg:min-h-0 lg:overflow-y-hidden lg:overflow-x-auto lg:overscroll-y-none", className)}>
        <div className="flex gap-4 min-w-max lg:h-full lg:min-h-0">
          {columns.map((status) => (
            <PipelineColumn key={status} status={status} workers={workers.filter((w) => w.status === status)} />
          ))}
        </div>
      </div>
    </ActionContext.Provider>
  );
}
