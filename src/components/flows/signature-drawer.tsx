import * as React from "react";
import { CheckCircle2, Circle, Clock, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { toast } from "@/components/ui/sonner";
import { Part } from "@/components/flows/flow-page";
import { cn } from "@/lib/utils";

/**
 * Signature Drawer — "Track Progress" on a Waiting for Signature card: the contract's signing
 * steps (Admin Signature → Send to Worker → Worker Signed) with a progress bar. Verbatim from
 * F1v6_SignatureWorkflowDrawer (fronted-admin-v6-1-clone); the loading skeleton is
 * shared/DrawerPanelSkeleton. "Simulate Worker Signed" is the demo's stand-in for the worker
 * signing on their side.
 */
export type SigningStatus = "loading" | "awaiting_admin" | "sent_to_candidate" | "candidate_signed";
export type SignatureEvent = "loaded" | "sign" | "resend" | "worker-signed" | "close";

type Item = { id: "admin_signature" | "send_to_candidate" | "candidate_signed"; label: string; description: string; status: "complete" | "active" | "pending"; timestamp?: string };

const STAMP = "14/10/2026, 07:11:55";

function itemsFor(status: SigningStatus): Item[] {
  const admin: Item = { id: "admin_signature", label: "Admin Signature", description: "Waiting for admin to sign the contract.", status: "active" };
  const send: Item = { id: "send_to_candidate", label: "Send to Worker", description: "Cannot send until admin signs the contract.", status: "pending" };
  const worker: Item = { id: "candidate_signed", label: "Worker Signed", description: "Pending worker signature.", status: "pending" };
  if (status === "awaiting_admin" || status === "loading") return [admin, send, worker];
  const signedAdmin = { ...admin, status: "complete" as const, timestamp: STAMP, description: "Admin has signed the contract." };
  const sent = { ...send, status: "complete" as const, timestamp: STAMP, description: "Contract automatically sent to worker." };
  if (status === "sent_to_candidate") return [signedAdmin, sent, { ...worker, status: "active", description: "Waiting for worker to sign." }];
  return [signedAdmin, sent, { ...worker, status: "complete", timestamp: STAMP, description: "Worker has signed the contract." }];
}

/** shared/DrawerPanelSkeleton (sections [3]). */
function PanelSkeleton({ sections = [3] }: { sections?: number[] }) {
  return (
    <div className="space-y-3" aria-busy="true" aria-live="polite">
      {sections.map((rows, i) => (
        <div key={i} className="rounded-xl border border-border/30 bg-card/20 overflow-hidden">
          <div className="p-4 space-y-3">
            <div className="h-3 w-28 rounded bg-muted animate-pulse" />
            <div className="space-y-3 pt-1">
              {Array.from({ length: rows }).map((_, j) => (
                <div key={j} className="space-y-1.5">
                  <div className="h-2.5 w-20 rounded bg-muted animate-pulse" />
                  <div className="h-9 w-full rounded-md bg-muted animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SignatureDrawer({
  open = true, onOpenChange, name = "Marcus Chen", flag = "🇸🇬", role = "Senior Backend Engineer", country = "Singapore",
  initial = "loading", onEvent, hold,
}: {
  open?: boolean; onOpenChange?: (o: boolean) => void; name?: string; flag?: string; role?: string; country?: string;
  initial?: SigningStatus; onEvent?: (e: SignatureEvent) => void;
  /** Keep the loading skeleton instead of letting it load. */
  hold?: boolean;
}) {
  const [status, setStatus] = React.useState<SigningStatus>(initial);
  React.useEffect(() => {
    if (status !== "loading" || hold) return;
    const t = window.setTimeout(() => { setStatus("awaiting_admin"); onEvent?.("loaded"); }, 900);
    return () => window.clearTimeout(t);
  }, [status]);
  const items = itemsFor(status);
  const pct = (items.filter((i) => i.status === "complete").length / items.length) * 100;
  return (
    <Sheet open={open} onOpenChange={(o) => { onOpenChange?.(o); if (!o) onEvent?.("close"); }}>
      <SheetContent side="right" className="[&>button.absolute]:top-[19px] [&>button.absolute]:right-5 w-full sm:w-full sm:max-w-xl p-0 flex flex-col overflow-hidden">
        <Part of={{ id: "patterns-signature-workflow--signature-workflow", label: "Patterns/Signature Workflow" }}>
          <SheetHeader className="px-5 pt-4 pb-3 border-b border-border/30 shrink-0">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <SheetTitle className="text-base font-semibold text-foreground leading-tight truncate">{name}</SheetTitle>
                <span className="text-base shrink-0">{flag}</span>
              </div>
              <p className="text-[11px] text-muted-foreground/60 mt-0.5">{role} · {country}</p>
            </div>
            <SheetDescription className="sr-only">Contract progress</SheetDescription>
          </SheetHeader>
          {status === "loading" ? (
            <div className="flex-1 overflow-y-auto px-5 py-4"><PanelSkeleton /></div>
          ) : (
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Signing Progress</span>
                  <span className="text-xs font-medium text-foreground">{Math.round(pct)}%</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-[width] duration-500" style={{ width: `${pct}%` }} />
                </div>
              </div>
              <div className="space-y-1.5">
                {items.map((item) => (
                  <div key={item.id} className={cn("flex items-center gap-3 p-3 rounded-lg border transition-all",
                    item.status === "complete" && "bg-success/5 border-success/15",
                    item.status === "active" && "bg-primary/5 border-primary/15",
                    item.status === "pending" && "bg-muted/20 border-border/40 opacity-50")}>
                    <div className="flex-shrink-0">
                      {item.status === "complete" ? <CheckCircle2 className="h-4 w-4 text-success" />
                        : item.status === "active" ? <Clock className="h-4 w-4 text-primary" />
                        : <Circle className="h-4 w-4 text-muted-foreground/40" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn("text-sm font-medium text-foreground", item.status === "complete" && "line-through text-muted-foreground")}>{item.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                      {item.timestamp && <p className="text-[11px] text-muted-foreground/60 mt-0.5">{item.timestamp}</p>}
                    </div>
                    {item.id === "admin_signature" && item.status === "active" && (
                      <Button size="sm" className="flex-shrink-0 h-7 text-xs px-3" onClick={() => {
                        setStatus("sent_to_candidate"); toast.success(`Admin signed! Contract sent to ${name}.`); onEvent?.("sign");
                      }}>Sign</Button>
                    )}
                    {item.id === "send_to_candidate" && item.status === "complete" && (
                      <Button size="sm" variant="ghost" className="flex-shrink-0 h-7 text-xs px-2.5 text-muted-foreground hover:text-foreground"
                        onClick={() => { toast.success(`Contract resent to ${name}.`); onEvent?.("resend"); }}>
                        <RotateCcw className="h-3 w-3 mr-1" />Resend
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              {status === "sent_to_candidate" && (
                <Button variant="outline" size="sm" className="w-full text-xs h-8" onClick={() => {
                  setStatus("candidate_signed"); toast.success(`${name} has signed the contract.`); onEvent?.("worker-signed");
                }}>Simulate Worker Signed</Button>
              )}
              {status === "candidate_signed" && (
                <div className="p-4 rounded-xl bg-success/5 border border-success/15 text-center">
                  <CheckCircle2 className="h-6 w-6 text-success mx-auto mb-1.5" />
                  <p className="text-sm font-medium text-foreground">Contract Signed</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Moving to onboarding phase.</p>
                </div>
              )}
            </div>
          )}
        </Part>
      </SheetContent>
    </Sheet>
  );
}
