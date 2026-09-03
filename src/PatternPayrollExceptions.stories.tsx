import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Calendar, TrendingUp, Coins, UserPlus, Eye, AlertCircle, CheckCircle,
  CreditCard, Send, Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import { cn } from "@/lib/utils";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Payroll Exceptions (verbatim from F1 Fronted admin,
 * F1v6_ExceptionsStep + F1v6_ExceptionFixDrawer).
 * The exception queue routes anomalies (end date, pay delta, currency mismatch, missing
 * from run, bank/submission blockers) to an admin. Each exception is a row/card; opening one
 * routes to a contextual fix drawer. Markup verbatim from the source (primary text uses
 * text-emphasis per the system's a11y swap).
 */
const meta: Meta = { title: "Patterns/Payroll Exceptions", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const getInitials = (name: string) => name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

/* ── Standard exception row — verbatim from F1v6_ExceptionsStep.renderExceptionRow ── */
function ExceptionRow({
  name, country, flag, icon: Icon, label, tagColor, description, isResolved = false,
}: { name: string; country: string; flag: string; icon: React.ElementType; label: string; tagColor: string; description: string; isResolved?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl border transition-all group",
        isResolved ? "bg-muted/30 border-border/40" : "bg-card border-border/60 hover:border-border hover:shadow-sm"
      )}
    >
      <Avatar className="h-9 w-9 flex-shrink-0">
        <AvatarFallback className="bg-primary/10 text-emphasis text-xs font-medium">{getInitials(name)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={cn("text-sm font-medium truncate", isResolved && "text-muted-foreground")}>{name}</span>
          <span className="text-xs text-muted-foreground">{flag} {country}</span>
          <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0 h-5", tagColor)}>
            <Icon className="h-3 w-3 mr-1" />{label}
          </Badge>
          {isResolved && (
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 bg-primary/10 text-emphasis border-primary/30">Overridden</Badge>
          )}
        </div>
        <div className={cn("text-xs truncate", isResolved ? "text-muted-foreground/60" : "text-muted-foreground")}>{description}</div>
      </div>
      {!isResolved && (
        <div className="flex items-center gap-2 flex-shrink-0 opacity-100 transition-opacity">
          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground">Skip</Button>
          <Button variant="secondary" size="sm" className="h-7 px-2 text-xs">Override</Button>
          <Button variant="outline" size="sm" className="h-7 px-2 text-xs gap-1"><Eye className="h-3 w-3" />Review</Button>
        </div>
      )}
    </div>
  );
}

/* ── Pay-delta row — verbatim from renderPayDeltaRow ── */
function PayDeltaRow() {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl border bg-card border-border/60 hover:border-border hover:shadow-sm transition-all group">
      <Avatar className="h-9 w-9 flex-shrink-0">
        <AvatarFallback className="bg-primary/10 text-emphasis text-xs font-medium">MS</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium truncate">Maria Santos</span>
          <span className="text-xs text-muted-foreground">🇵🇭 Philippines</span>
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 bg-blue-500/15 text-blue-700 border-blue-500/30">
            <TrendingUp className="h-3 w-3 mr-1" />Pay delta
          </Badge>
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 bg-green-500/15 text-green-700 border-green-500/30">
            <CheckCircle className="h-3 w-3 mr-1" />Explained
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Net pay changed vs last cycle</span>
          <span className="text-xs font-medium text-blue-600">+PHP 42,000 (+18%)</span>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0 opacity-100 transition-opacity">
        <Button variant="default" size="sm" className="h-7 px-3 text-xs gap-1.5"><CheckCircle className="h-3 w-3" />Review in Submissions</Button>
        <Button variant="outline" size="sm" className="h-7 px-2 text-xs gap-1"><Eye className="h-3 w-3" />Details</Button>
      </div>
    </div>
  );
}

/* ── Exception queue container — verbatim shell from renderContent ── */
function ExceptionQueue() {
  return (
    <div className="rounded-xl border border-border/40 bg-card/20 shadow-none overflow-visible">
      <div className="p-5">
        <div className="space-y-2">
          <ExceptionRow name="Alex Hansen" country="Norway" flag="🇳🇴" icon={Calendar} label="End date" tagColor="bg-amber-500/15 text-amber-700 border-amber-500/30" description="End date within payroll window" />
          <PayDeltaRow />
          <ExceptionRow name="Emma Wilson" country="Singapore" flag="🇸🇬" icon={Coins} label="Currency mismatch" tagColor="bg-purple-500/15 text-purple-700 border-purple-500/30" description="Salary currency ≠ expected country currency" />
          <ExceptionRow name="Liam O'Connor" country="Ireland" flag="🇮🇪" icon={UserPlus} label="Missing from run" tagColor="bg-red-500/15 text-red-700 border-red-500/30" description="Active worker missing from run" />
        </div>
      </div>
    </div>
  );
}

/* ── Fix drawer — verbatim header + body skeleton from F1v6_ExceptionFixDrawer ── */
function FixDrawer() {
  return (
    <div className="w-full sm:w-[440px] rounded-lg border border-border bg-background overflow-hidden shadow-overlay">
      <div className="px-6 pt-5 pb-4">
        <div className="pb-4">
          <h2 className="text-base font-semibold">Resolve Exception</h2>
        </div>
        <div className="space-y-5">
          {/* Worker info */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/40">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary/10 text-emphasis text-xs font-medium">JS</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-foreground">Jonas Schmidt</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1"><span>🇩🇪</span>Germany</p>
            </div>
          </div>

          <Separator />

          {/* Exception detail */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-destructive" />
                <p className="text-sm font-medium text-foreground">Missing bank details</p>
                <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4 font-medium bg-destructive/10 text-destructive border-destructive/20">Blocking</Badge>
              </div>
              <p className="text-xs text-muted-foreground">No verified bank account on file for this worker.</p>
            </div>

            {/* Why it blocks */}
            <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
              <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
              <p className="text-xs text-foreground/80">Payment cannot be processed without verified bank account details.</p>
            </div>

            {/* Suggested fix */}
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Suggested Fix</p>
              <p className="text-sm text-foreground">Request updated bank details from the worker, or add them manually.</p>
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Actions</p>
            <div className="space-y-3">
              <Button className="w-full justify-center gap-2"><Send className="h-4 w-4" />Request bank details</Button>
              <Button variant="outline" className="w-full justify-center gap-2"><Plus className="h-4 w-4" />Add bank details manually</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const PayrollExceptions: Story = {
  name: "Payroll Exceptions",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        status="Stable"
        title="Payroll Exceptions"
        lead={<>The exception queue that guards a payroll run. Each anomaly — end date within the window, pay delta vs last cycle, currency mismatch, active worker missing from the run, or a bank / submission blocker — surfaces as a row with a category tag and quick actions (Skip / Override / Review). Opening one routes to a contextual fix drawer. Markup verbatim from F1v6_ExceptionsStep + F1v6_ExceptionFixDrawer.</>}
        meta="Verbatim from F1 · Exceptions step + fix drawer (fronted-admin-v6-1-clone)"
      />

      <h3 style={eyebrow}>Exception queue</h3>
      <ExceptionQueue />
      <p style={{ ...note, marginTop: 10 }}>Container rounded-xl border-border/40 bg-card/20 p-5 · rows space-y-2 · each row rounded-xl border-border/60 bg-card with h-9 avatar, name + flag + category tag, short description, and hover actions (Skip ghost · Override secondary · Review outline). The pay-delta row swaps in an explained/needs-review pill and a Review in Submissions action.</p>

      <h3 style={eyebrow}>Fix drawer</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}><FixDrawer /></div>
      <p style={{ ...note, marginTop: 10 }}>Sheet w-[440px] · header "Resolve Exception" · worker card bg-muted/30 border-border/40 · category title + Blocking/Warning badge · blocking reason bg-destructive/5 · Suggested Fix label + copy · Actions stacked full-width buttons (primary + outline) driven by category (bank / submission / compliance / data).</p>

      <h3 style={eyebrow}>Exception categories</h3>
      <DocTable head={["Category", "Tag", "classes"]} w0={170} rows={[
        ["End date", <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 bg-amber-500/15 text-amber-700 border-amber-500/30"><Calendar className="h-3 w-3 mr-1" />End date</Badge>, "amber · Calendar · contract end date falls in the pay window"],
        ["Pay delta", <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 bg-blue-500/15 text-blue-700 border-blue-500/30"><TrendingUp className="h-3 w-3 mr-1" />Pay delta</Badge>, "blue · TrendingUp · net pay changed vs last cycle · review-only, routes to Submissions"],
        ["Currency mismatch", <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 bg-purple-500/15 text-purple-700 border-purple-500/30"><Coins className="h-3 w-3 mr-1" />Currency mismatch</Badge>, "purple · Coins · salary currency ≠ expected country currency"],
        ["Missing from run", <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 bg-red-500/15 text-red-700 border-red-500/30"><UserPlus className="h-3 w-3 mr-1" />Missing from run</Badge>, "red · UserPlus · active worker not included in the run"],
      ]} />

      <h3 style={eyebrow}>Anatomy — fix drawer</h3>
      <DocTable head={["Part", "Detail", "classes"]} w0={150} rows={[
        ["Header", "Resolve Exception title", "SheetHeader pb-4 · text-base font-semibold"],
        ["Worker info", "avatar + name + flag · country", "flex gap-3 p-3 rounded-lg bg-muted/30 border-border/40"],
        ["What's wrong", "category icon + title + Blocking/Warning badge + description", "icon text-destructive (blocking) / text-amber-600 (warning)"],
        ["Why it blocks", "reason banner (blocking only)", "flex gap-2 p-3 rounded-lg bg-destructive/5 border-destructive/20"],
        ["Suggested fix", "uppercase label + copy", "text-xs uppercase tracking-wide + text-sm"],
        ["Actions", "primary + outline, per category", "space-y-3 · Button w-full justify-center gap-2"],
      ]} />
    </div>
  ),
};
